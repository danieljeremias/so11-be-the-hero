// Importa a lib do express
const express = require('express');

// Importa os validadores da aplicação
const SessionValidator = require('./validators/SessionValidator');
const OngValidator = require('./validators/OngValidator');
const ProfileValidator = require('./validators/ProfileValidator');
const {
  IncidentValidatorGet,
  IncidentValidatorDelete,
  IncidentValidatorPost
} = require('./validators/IncidentValidator');

// Importa os controllers da aplicação
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Definição dos recursos da rota
routes.post('/sessions', SessionValidator, SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidator, OngController.create);

routes.get('/profile', ProfileValidator, ProfileController.index);

routes.get('/incidents', IncidentValidatorGet, IncidentController.index);
routes.post('/incidents', IncidentValidatorPost, IncidentController.create);
routes.delete(
  '/incidents/:id',
  IncidentValidatorDelete,
  IncidentController.delete
);

module.exports = routes;
