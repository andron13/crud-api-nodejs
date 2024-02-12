import request from 'supertest';

import { createHttpServer } from '../../../server';

describe('New user test scenario', () => {
  let server;
  let port = 4900;
  let newUserId;
  const newUser = { username: 'James Bond', age: 35, hobbies: ['Skydiving', 'Car racing'] };

  beforeAll(async () => {
    server = createHttpServer();
    server.listen(port++);
  });

  afterAll(async () => {
    server.close();
  });

  test('POST /api/users - success', async () => {
    const response = await request(server).post('/api/users').send(newUser);
    newUserId = response.body.user.id;
    expect(response.status).toBe(201);
    expect(response.body.user).toEqual({
      id: expect.any(String),
      username: 'James Bond',
      age: 35,
      hobbies: ['Skydiving', 'Car racing'],
    });
  });

  test('GET api/users/:id - expeted', async () => {
    const response = await request(server).get(`/api/users/${newUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toEqual({
      id: newUserId,
      username: 'James Bond',
      age: 35,
      hobbies: ['Skydiving', 'Car racing'],
    });
  });

  test('PUT /api/users/:id - success', async () => {
    const updatedUser = { ...newUser, age: 37 };
    const response = await request(server)
      .put(`/api/users/${newUserId}`)
      .set('Content-Type', 'application/json')
      .send(updatedUser);
    expect(response.status).toBe(201);
    expect(response.body.data.user).toMatchObject(updatedUser);
  });

  test('DELETE /api/users/:id - success', async () => {
    const response = await request(server).delete(`/api/users/${newUserId}`);
    expect(response.status).toBe(204);
  });

  test('GET /api/users/:id - user does not exist', async () => {
    const response = await request(server).get(`/api/users/${newUserId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(`NOT_FOUND id === ${newUserId} doesn't exist`);
  });
});
