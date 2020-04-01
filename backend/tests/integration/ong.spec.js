const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  const ong = {
    name: 'APAE',
    email: 'apae@mail.com.br',
    whatsapp: '47988380027',
    city: 'Blumenau',
    uf: 'SC'
  };

  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send(ong);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should be able to list all ONGs', async () => {
    await request(app)
      .post('/ongs')
      .send(ong);

    const response = await request(app)
      .get('/ongs')
      .send();

    const [body] = response.body;

    expect(body).toHaveProperty('id');
    expect(body.id).toHaveLength(8);
    expect(body.name).toBe(ong.name);
  });
});
