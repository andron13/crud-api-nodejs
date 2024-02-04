import { v4 as uuidv4, validate } from 'uuid';

import { IUser } from '../types/user';

export class User implements IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor({ username, age, hobbies }: { username: string; age: number; hobbies: string[] }) {
    this.id = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = [...hobbies];
  }

  updateUser({
    id,
    username,
    age,
    hobbies,
  }: {
    id?: string;
    username?: string;
    age?: number;
    hobbies?: string[];
  }): void {
    if (id && validate(id)) this.id = id;
    if (username) this.username = username;
    if (age) this.age = age;
    if (hobbies) this.hobbies = [...hobbies];
  }
}

export const Users: User[] = [];
