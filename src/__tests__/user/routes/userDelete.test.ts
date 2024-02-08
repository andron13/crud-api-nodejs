import request from 'supertest';

import { createHttpServer } from '../../../server';
import { MESSAGES } from '../../../utils';

describe('User DELETE API tests', () => {
  let server;
  let port = 4100;
  let testUser;

  beforeAll(async () => {
    server = createHttpServer();
    server.listen(port++);

    const userResponse = await request(server)
      .post('/api/users')
      .send({ username: 'Test User', age: 28, hobbies: ['hobby1', 'hobby2'] });
    testUser = userResponse.body.user;
  });

  afterAll(() => {
    server.close();
  });

  // DELETE api/users/:id - success
  test('DELETE /api/users/:id - success', async () => {
    const response = await request(server).delete(`/api/users/${testUser.id}`);
    expect(response.status).toBe(204);
  });

  // Try to delete the same user again, should return with error - user not found
  test('DELETE /api/users/:id - fail - user not found', async () => {
    const response = await request(server).delete(`/api/users/${testUser.id}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(MESSAGES.NOT_FOUND(testUser.id));
  });
});
