////define como sera la estructura de los datos

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    asunto: { type: String, required: true },
    estado: { type: String, default: 'Generado' }
});

module.exports = mongoose.model('Item', itemSchema);
