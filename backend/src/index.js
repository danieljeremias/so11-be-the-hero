// Importa a lib do express
const express = require('express');

// Importa a lib de cors
const cors = require('cors');

// Importa as rotas da aplicação (utilizado ./ para identificar um arquivo e não um pacote)
const routes = require('./routes');

// Cria a aplicação
const app = express();

// Habilita cors
app.use(cors());

// Define que o corpo das requisições será no formato JSON
app.use(express.json());

// Essa instrução deve estar abaixo da instrução app.use(express.json()) - MUITO IMPORTANTE
app.use(routes);

// Define a porta em que a aplicação estará executando
app.listen(3333);

// Configuração do banco de dados com Query Builder KNEX
// Instala o Query Builder
//npm install knex

// Instala o driver do SQLITE3
//npm install sqlite3

// Cria o arquivo de inicialização do KNEX
//npx knex init

// Cria uma migration
//npx knex migrate:make create_ongs

// Executa as migrations
//npx knex migrate:latest

// Lista todos os comandos do knex
//npx knex

// Desfaz as últimas migrations
// npx knex migrate:rollback
