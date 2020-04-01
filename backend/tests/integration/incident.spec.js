const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new Incident', async () => {
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

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', createOng.body.id)
      .send(incident);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to delete a specific Incident', async () => {
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

    const createdIncident = await request(app)
      .post('/incidents')
      .set('Authorization', createOng.body.id)
      .send(incident);

    const response = await request(app)
      .delete('/incidents/' + createdIncident.body.id)
      .set('Authorization', createOng.body.id)
      .send();

    expect(response.statusCode).toBe(204);
  });

  it('should be able to list all incidents', async () => {
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

    const createdIncident = await request(app)
      .post('/incidents')
      .set('Authorization', createOng.body.id)
      .send(incident);

    const response = await request(app)
      .get('/incidents')
      .send();

    const [body] = response.body;

    expect(body).toHaveProperty('id');
    expect(body.title).toBe(incident.title);
  });
});
