// Importa o knex
const knex = require('knex');

// importa o arquivo de configuração do knex
const configuration = require('../../knexfile');

const config =
  process.env.NODE_ENV === 'test'
    ? configuration.test
    : configuration.development;

// Cria uma conexão para o ambiente definido
const connection = knex(config);

// Exporta a constante
module.exports = connection;
