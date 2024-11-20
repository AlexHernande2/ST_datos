const express = require('express');
const mongoose = require('mongoose');
//
const emailHelper = require("./helper/emailHelper");
//
const cors = require('cors');
// Si tu servidor está en una carpeta superior a `backend`



// Importa el modelo
const Item = require('./models/item');

// Configuración de Express y MongoDB
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());



///mongodb://atlas-sql-672c31178045b92a036c3b24-5opkn.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin
//mongodb+srv://edalhernandez:3144782100@sistemasdistr.5opkn.mongodb.net/?retryWrites=true&w=majority

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

//ruta para obtener los datos de mono 
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

// correo
// Middleware
app.use(express.json());

// Routes
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    let info = await emailHelper(to, subject, text);
    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});