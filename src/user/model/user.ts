import { v4 as uuidv4 } from 'uuid';

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
