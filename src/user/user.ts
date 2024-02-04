import { v4 as uuidv4 } from 'uuid';

import { mockUsers } from './mockUsers';

export class User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor(username: string, age: number, hobbies: string[]) {
    this.id = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  update(newUser: Partial<User>): void {
    if (newUser.username) this.username = newUser.username;
    if (newUser.age) this.age = newUser.age;
    if (newUser.hobbies) this.hobbies = newUser.hobbies;
  }
}

export class Users {
  static users: User[] = [];
  static init(mockUsers: any[]): void {
    for (const mockUser of mockUsers) {
      const user = new User(mockUser.username, mockUser.age, mockUser.hobbies);
      user.id = mockUser.id;
      this.users.push(user);
    }
  }
  static create(username: string, age: number, hobbies: string[]): User {
    const user = new User(username, age, hobbies);
    this.users.push(user);
    return user;
  }

  static read(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  static update(id: string, user: Partial<User>): User | undefined {
    const targetUser = this.read(id);

    if (!targetUser) {
      return undefined;
    }

    targetUser.update(user);
    return targetUser;
  }

  static delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }
}

Users.init(mockUsers);
