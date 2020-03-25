// Utilizada para gerar um texto aleatório
const crypto = require('crypto');

// Importa a coneção com o banco de dados
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async create(req, res) {
    // Request Body - Usando desestruturação
    const { name, email, whatsapp, city, uf } = req.body;

    // Gerando um ID hexadecimal de 4 posições
    const id = crypto.randomBytes(4).toString('HEX');

    // Faz o insert da ONG na base de dados
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};
