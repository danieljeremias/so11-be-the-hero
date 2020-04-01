// Importa a coneção com o banco de dados
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const incidents = await connection('incidents')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5);

    const [count] = await connection('incidents').count();

    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
  },

  async create(req, res) {
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res.status(404).json({
        error: 'Operation not permited! ONG is not logged.'
      });
    }

    // Request Body - Usando desestruturação
    const { title, description, value } = req.body;

    // Faz o insert da ONG na base de dados
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res.status(404).json({
        error: 'Operation not permited! ONG is not logged.'
      });
    }

    const { id } = req.params;

    const incident = await connection('incidents')
      .select('*')
      .where('id', id)
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(404).json({ error: 'Operation not permited.' });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  }
};
