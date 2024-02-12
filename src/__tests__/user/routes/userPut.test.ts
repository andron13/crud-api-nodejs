import request from 'supertest';

import { createHttpServer } from '../../../server';
import { MESSAGES } from '../../../utils';

describe('User PUT API tests', () => {
  let server;
  let port = 4500;
  let testUser;

  beforeAll(async () => {
    server = createHttpServer();
    server.listen(port++);
    // Create a new user and store its details
    const userResponse = await request(server)
      .post('/api/users')
      .send({ username: 'Test User', age: 28, hobbies: ['hobby1', 'hobby2'] });
    testUser = userResponse.body.user;
  });

  afterAll(() => {
    server.close();
  });

  // PUT api/users/:id - success
  test('PUT /api/users/:id - success', async () => {
    const updatedUser = { ...testUser, age: 29 };
    const response = await request(server).put(`/api/users/${testUser.id}`).send(updatedUser);
    expect(response.status).toBe(201);
    expect(response.body.data.user).toMatchObject(updatedUser);
  });

  // Attempting to update an user with invalid ID should fail
  test('PUT /api/users/:id - fail - invalid id', async () => {
    const updatedUser = { ...testUser, id: 'invalid-id' };
    const response = await request(server).put(`/api/users/invalid-id`).send(updatedUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(MESSAGES.INVALID_USER_ID('invalid-id'));
  });

  // Attempting to update a non-existent user should fail
  test('PUT /api/users/:id - fail - user not found', async () => {
    const nonExistentUserId = '0929477d-b287-45e3-bc63-5184b04460e3';
    const updatedUser = { ...testUser, id: nonExistentUserId };
    const response = await request(server).put(`/api/users/${nonExistentUserId}`).send(updatedUser);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(`NOT_FOUND id === ${nonExistentUserId} doesn't exist`);
  });

  // Attempting to update an user with invalid JSON body should fail
  test('PUT /api/users/:id - fail - invalid json', async () => {
    const response = await request(server)
      .put(`/api/users/${testUser.id}`)
      .set('Content-type', 'application/json')
      .send('invalid json');
    expect(response.status).toBe(400);
    expect(response.body.errorMessage).toBe(MESSAGES.INVALID_JSON_FORMAT);
  });
});
