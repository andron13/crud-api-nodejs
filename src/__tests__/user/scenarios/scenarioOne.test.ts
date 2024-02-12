import request from 'supertest';

import { v4 as uuidv4 } from 'uuid';

import { createHttpServer } from '../../../server';

describe('Test scenario', () => {
  let server;
  let port = 4800;
  let truhId;
  const user = { username: 'NewUser', age: 27, hobbies: ['best hobby', 'wursthobby'] };

  beforeAll(async () => {
    server = createHttpServer();
    server.listen(port++);
  });

  afterAll(async () => {
    server.close();
  });

  // 1. Get all records with a GET api/users request (an empty array is expected)
  test('GET /api/users - success', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.data.users).toBeInstanceOf(Array);
  });

  // 2. A new object is created by a POST api/users request (a response containing newly created record is expected)
  test('POST /api/users - success', async () => {
    const response = await request(server).post('/api/users').send(user);
    truhId = response.body.user.id;
    expect(response.status).toBe(201);
    expect(response.body.user).toEqual({
      id: expect.any(String),
      username: 'NewUser',
      age: 27,
      hobbies: ['best hobby', 'wursthobby'],
    });
  });

  // 3. With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)
  test('GET api/users/:id - expeted', async () => {
    const response = await request(server).get(`/api/users/${truhId}`);
    expect(response.status).toBe(200);
    expect(response.body.data.user).toEqual({
      id: truhId,
      username: 'NewUser',
      age: 27,
      hobbies: ['best hobby', 'wursthobby'],
    });
  });

  // 4. We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)
  test('PUT /api/users/:id - success', async () => {
    const updatedUser = { ...user, age: 29 };
    const response = await request(server)
      .put(`/api/users/${truhId}`)
      .set('Content-Type', 'application/json')
      .send(updatedUser);
    expect(response.status).toBe(201);
    expect(response.body.data.user).toMatchObject(updatedUser);
  });

  // 5. With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)
  test('DELETE /api/users/:id - success', async () => {
    const response = await request(server).delete(`/api/users/${truhId}`);
    expect(response.status).toBe(204);
  });
  // 6. With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)
  test('GET /api/users/:id - user does not exist', async () => {
    const nonExistentId = uuidv4();
    const response = await request(server).get(`/api/users/${nonExistentId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(`NOT_FOUND id === ${nonExistentId} doesn't exist`);
  });
});
