'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proyectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    lengs: String,
    image: String
});

module.exports = mongoose.model('Project', proyectSchema);
// projects --> guarda los documentos en esa coleccion 