// Importa a coneção com o banco de dados
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res.status(404).json({
        error: 'Operation not permited! ONG is not logged.'
      });
    }

    const incidents = await connection('incidents')
      .select('*')
      .where('ong_id', ong_id);

    return res.json(incidents);
  }
};
