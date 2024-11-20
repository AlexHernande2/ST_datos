const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Configurar express y el middleware
const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos (CSS, JS, HTML)

// Crear un transportador de Nodemailer (usar un servicio como Gmail o SendGrid)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usando Gmail
  auth: {
    user: 'edalhernandez@uniboyaca.edu.co',  // Tu correo
    pass: 'Polo1002'         // Tu contraseña de correo o contraseña de aplicación
  }
});

// Ruta para recibir la solicitud de verificación de correo
app.post('/send-code', (req, res) => {
  const { email } = req.body;

  // Leer el archivo JSON con los usuarios
  const usersFilePath = path.join(__dirname, 'js', 'datos.json');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo de usuarios' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ error: 'Correo no registrado' });
    }

    // Generar un código aleatorio
    const code = Math.floor(100000 + Math.random() * 900000);

    // Actualizar el código en el archivo JSON
    user.code = code;

    // Guardar el archivo JSON actualizado
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar el código' });
      }

      // Enviar el correo con el código de verificación
      const mailOptions = {
        from: 'edalhernandez@uniboyaca.edu.co',
        to: email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${code}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: 'Error al enviar el correo' });
        }

        res.json({ message: 'Código enviado con éxito' });
      });
    });
  });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
