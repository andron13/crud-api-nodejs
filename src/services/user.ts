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

class UserService {
  private static instance: UserService;
  private users: User[] = [];

  private constructor(mockUsers: any[]) {
    for (const mockUser of mockUsers) {
      const user = new User(mockUser.username, mockUser.age, mockUser.hobbies);
      this.users.push(user);
    }
  }

  static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService(mockUsers);
    }
    return this.instance;
  }

  create(user: User): User {
    const newUser = new User(user.username, user.age, user.hobbies);
    this.users.push(newUser);
    return newUser;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, user: Partial<User>): User | undefined {
    const targetUser = this.findOne(id);
    if (!targetUser) {
      return undefined;
    }
    targetUser.update(user);
    return targetUser;
  }

  delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }

  getAll(): User[] {
    return this.users;
  }
}

export const users = UserService.getInstance();
