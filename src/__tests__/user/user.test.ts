import { User } from '../../user';

jest.mock('uuid', () => ({
  v4: () => 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
}));

describe('User', () => {
  test('should initialize correctly', () => {
    const user = new User('username', 20, ['hobby1', 'hobby2']);
    expect(user).toEqual({
      id: 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
      username: 'username',
      age: 20,
      hobbies: ['hobby1', 'hobby2'],
    });
  });

  test('should update user correctly', () => {
    const user = new User('username', 20, ['hobby1', 'hobby2']);
    user.update({
      username: 'newname',
      age: 25,
      hobbies: ['newhobby1', 'newhobby2'],
    });
    expect(user).toEqual({
      id: 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
      username: 'newname',
      age: 25,
      hobbies: ['newhobby1', 'newhobby2'],
    });
  });

  test('should not update user when no props given', () => {
    const user = new User('username', 20, ['hobby1', 'hobby2']);
    user.update({});
    expect(user).toEqual({
      id: 'ad065f6d-99bc-4525-bc9f-f0f4e084cb63',
      username: 'username',
      age: 20,
      hobbies: ['hobby1', 'hobby2'],
    });
  });
});
