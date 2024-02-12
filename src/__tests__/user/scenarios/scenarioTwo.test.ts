import request from 'supertest';

import { createHttpServer } from '../../../server';

describe('Tony Stark user test scenario', () => {
  let server;
  let port = 4950;
  let tonyStarkId;
  const tonyStark = { username: 'Tony Stark', age: 40, hobbies: ['Inventing', 'Driving sports cars'] };

  beforeAll(async () => {
    server = createHttpServer();
    server.listen(port++);
  });

  afterAll(async () => {
    server.close();
  });

  test('POST /api/users - success', async () => {
    const response = await request(server).post('/api/users').send(tonyStark);
    tonyStarkId = response.body.user.id;
    expect(response.status).toBe(201);
    expect(response.body.user).toEqual({
      id: expect.any(String),
      username: 'Tony Stark',
      age: 40,
      hobbies: ['Inventing', 'Driving sports cars'],
    });
  });

  test('GET api/users/:id - expeted', async () => {
    const response = await request(server).get(`/api/users/${tonyStarkId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toEqual({
      id: tonyStarkId,
      username: 'Tony Stark',
      age: 40,
      hobbies: ['Inventing', 'Driving sports cars'],
    });
  });

  test('PUT /api/users/:id - success', async () => {
    const updatedUser = { ...tonyStark, age: 42 };
    const response = await request(server)
      .put(`/api/users/${tonyStarkId}`)
      .set('Content-Type', 'application/json')
      .send(updatedUser);
    expect(response.status).toBe(201);
    expect(response.body.data.user).toMatchObject(updatedUser);
  });

  test('DELETE /api/users/:id - success', async () => {
    const response = await request(server).delete(`/api/users/${tonyStarkId}`);
    expect(response.status).toBe(204);
  });

  test('GET /api/users/:id - user does not exist', async () => {
    const response = await request(server).get(`/api/users/${tonyStarkId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(`NOT_FOUND id === ${tonyStarkId} doesn't exist`);
  });
});
