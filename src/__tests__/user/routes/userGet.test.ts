import request from 'supertest';

import { v4 as uuidv4 } from 'uuid';

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

  // GET api/users/:id - non-existent user
  test('GET /api/users/:id - user does not exist', async () => {
    const nonExistentId = uuidv4();
    const response = await request(server).get(`/api/users/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(`NOT_FOUND id === ${nonExistentId} doesn't exist`);
  });

  // GET api/users/:id - invalid user id
  test('GET /api/users/:id - id is not a valid uuid', async () => {
    const invalidUUID = 'abcd';
    const response = await request(server).get(`/api/users/${invalidUUID}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(`Invalid user ID: ${invalidUUID}`);
  });

  test('POST /api/users - create a user, then GET /api/users/:id - the user exists', async () => {
    const user = {
      username: 'John Doe',
      age: 28,
      hobbies: ['hobby1', 'hobby2'],
    };

    let response = await request(server).post('/api/users').send(user);
    const createdUserId = await response.body.user.id;
    response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toEqual({ ...user, id: createdUserId });
  });
});
