// Importa o knex
const knex = require('knex');

// importa o arquivo de configuração do knex
const configuration = require('../../knexfile');

// Cria uma conexão para o ambiente definido
const connection = knex(configuration.development);

// Exporta a constante
module.exports = connection;
