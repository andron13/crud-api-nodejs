import request from 'supertest';

import { createHttpServer } from '../../../server';

describe('User GET API tests', () => {
  let server;
  let port = 4200;

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
});
