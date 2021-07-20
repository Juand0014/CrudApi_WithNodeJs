'use strict'

const express = require('express');

const app = express();

// cargar archivos rutas
const project_routes = require('./routes/project');

// middlewares
app.use(express.urlencoded({limit: '25mb', extended: true, parameterLimit: 100000}));
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api',project_routes)

// exportar
module.exports = app;