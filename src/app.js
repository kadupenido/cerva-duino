const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Instância do app
const app = express();

// Habilita o log
app.use(morgan('dev'));

// Habilita cors
app.use(cors({ origin: '*' }));

// Configura o body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Carrega as rotas
const mainRoute = require('./app-router');

app.use('/', mainRoute);

module.exports = app;
