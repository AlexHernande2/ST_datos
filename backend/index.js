const express = require('express');
const mongoose = require('mongoose');
const emailHelper = require("./helper/emailHelper");
const cors = require('cors');
//
//const fs = require('fs');


// Importa el modelo
const Item = require('./models/item');

// Configuración de Express y MongoDB
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


//

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(cors({ origin: 'http://127.0.0.1:5501' }));

//
// Conexión a la base de datos y puesta en marcha del servidor
mongoose.connect('mongodb+srv://edalhernandez:3144782100@sistemasdistr.5opkn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a MongoDB exitosa');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));

// Ruta para agregar un nuevo item
app.post('/items', async (req, res) => {
    const { id, asunto } = req.body;
    try {
        const newItem = new Item({ id, asunto });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el item' });
    }
});

// Ruta para obtener todos los items
app.get('/items', async (req, res) => {
  try {
      const items = await Item.find(); // Obtiene todos los items
      res.status(200).json(items); // Responde con los items en formato JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los items' });
  }
});

/*
// Ruta para enviar un correo
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let info = await emailHelper(to, subject, text);
    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});
*/
// Ruta para validar el correo
const fs = require('fs').promises; // Usa promesas nativas de fs para evitar callbacks

app.post('/validate-email', async (req, res) => {
  const { email } = req.body;

  try {
    // Lee el archivo JSON
    const data = await fs.readFile('../js/datos.json', 'utf8');
    const users = JSON.parse(data);

    // Busca el usuario
    const user = users.find(u => u.email === email);
    if (!user) {
      //
      console.log({ message: 'Correo no encontrado', email });
      //
      return res.status(404).json({ message: 'Correo no encontrado' });
    }

    // Genera el código y actualiza al usuario
    const code = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
    user.code = code;

    // Escribe los cambios en el archivo JSON
    await fs.writeFile('../js/datos.json', JSON.stringify(users, null, 2));

    // Envía el correo
    await emailHelper(email, 'Código de verificación', `Tu código es: ${code}`);

    console.log({ message: 'Código enviado al correo', email, code });

    // Responde al cliente
    res.status(200).json({ message: 'Código enviado al correo', email, code });
  } catch (error) {
    console.error("Error en validate-email:", error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});



// Ruta para verificar el código ingresado por el usuario
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  // Lee el archivo JSON que contiene los usuarios
  fs.readFile('../js/datos.json', 'utf8', (err, data) => {
      if (err) {
          return res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
      }

      const datos = JSON.parse(data);

      // Busca al usuario por el correo
      const user = datos.find(u => u.email === email);

      if (user) {
          // Verifica si el código ingresado es correcto
          if (user.code === parseInt(code)) {
              res.status(200).json({ message: 'Código verificado con éxito' });
          } else {
              res.status(400).json({ message: 'Código incorrecto' });
          }
      } else {
          res.status(404).json({ message: 'Correo no encontrado' });
      }
  });
});
