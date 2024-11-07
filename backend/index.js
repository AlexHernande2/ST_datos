const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importa el modelo
const Item = require('./models/item');

// Configuración de Express y MongoDB
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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
