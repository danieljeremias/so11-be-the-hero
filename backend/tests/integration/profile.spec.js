const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('PROFILE', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const ong = {
      name: 'APAE',
      email: 'apae@mail.com.br',
      whatsapp: '47988380027',
      city: 'Blumenau',
      uf: 'SC'
    };

    const createOng = await request(app)
      .post('/ongs')
      .send(ong);

    const incident = {
      title: 'Caso teste do Daniel',
      description: 'Detalhes do caso 2',
      value: 250.0
    };

    await request(app)
      .post('/incidents')
      .set('Authorization', createOng.body.id)
      .send(incident);

    const response = await request(app)
      .get('/profile')
      .set('Authorization', createOng.body.id)
      .send();

    const [body] = response.body;

    expect(body).toHaveProperty('ong_id');
    expect(body.title).toBe(incident.title);
  });
});
