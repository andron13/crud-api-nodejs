import request from 'supertest';

import { createHttpServer } from '../../server';

describe('User API tests', () => {
  let server;
  let port = 4000;

  beforeEach(async () => {
    server = createHttpServer();
    server.listen(port++);
  });

  afterEach(async () => {
    server.close();
  });

  // GET api/users empty users.array
  test('GET /api/users - success', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.data.users).toBeInstanceOf(Array);
  });

  // POST api/users request created
  test('POST /api/users - success', async () => {
    const user = { username: 'Test User', age: 28, hobbies: ['hobby1', 'hobby2'] };
    const response = await request(server).post('/api/users').send(user);
    expect(response.status).toBe(201);
    expect(response.body.user).toEqual({
      id: expect.any(String),
      username: 'Test User',
      age: 28,
      hobbies: ['hobby1', 'hobby2'],
    });
  });
});
