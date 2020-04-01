// Utilizada para gerar um texto aleatório
const crypto = require('crypto');

module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
};
