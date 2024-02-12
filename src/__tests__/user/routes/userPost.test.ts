import request from 'supertest';

import { createHttpServer } from '../../../server';

describe('User POST tests', () => {
  let server;
  let port = 4300;
  beforeAll(async () => {
    server = createHttpServer();
    await server.listen(port++);
  });

  afterAll(async () => {
    await server.close();
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
