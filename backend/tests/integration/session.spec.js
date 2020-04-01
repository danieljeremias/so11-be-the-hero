const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('SESSION', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new Session', async () => {
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

    const response = await request(app)
      .post('/sessions')
      .send({
        id: createOng.body.id
      });

    expect(response.body.name).toBe(ong.name);
  });
});
