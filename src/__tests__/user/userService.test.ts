import { User, users } from '../../user';

jest.mock('uuid', () => ({
  v4: () => 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
}));

describe('UserService', () => {
  const user = new User('username', 20, ['hobby1', 'hobby2']);

  it('should create user correctly', () => {
    const result = users.create(user);
    expect(result).toEqual({
      id: 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
      username: 'username',
      age: 20,
      hobbies: ['hobby1', 'hobby2'],
    });
    expect(users.getAll()).toEqual([result]);
  });

  it('should find user correctly', () => {
    const result = users.findOne('ad065f6d-99bc-4525-bc9f-f0f4e084cb63');
    expect(result).toEqual({
      id: 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
      username: 'username',
      age: 20,
      hobbies: ['hobby1', 'hobby2'],
    });
  });

  it('should update user correctly', () => {
    const result = users.update('ad065f6d-99bc-4525-bc9f-f0f4e084cb63', { username: 'new name' });
    expect(result).toEqual({
      id: 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
      username: 'new name',
      age: 20,
      hobbies: ['hobby1', 'hobby2'],
    });
  });

  it('should delete user correctly', () => {
    const result = users.delete('ad065f6d-99bc-4525-bc9f-f0f4e084cb63');
    expect(result).toBe(true);
    expect(users.getAll()).toEqual([]);
  });
});
