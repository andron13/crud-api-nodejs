// src/user/services/userService.ts

import * as process from 'process';

import { User } from '../model/user';

class UserService {
  private static instance: UserService;
  private users: User[] = [];

  private constructor() {}

  static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  create(user: User): User {
    const newUser = new User(user.username, user.age, user.hobbies);
    this.users.push(newUser);
    process.send({ method: 'create', params: newUser });
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
    process.send({ method: 'update', params: targetUser });
    return targetUser;
  }

  delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    process.send({ method: 'delete', params: id });
    return this.users.length < initialLength;
  }

  getAll(): User[] {
    return this.users;
  }
}

export const users = UserService.getInstance();
