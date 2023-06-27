export interface User {
  id: string; // id — unique identifier (string, uuid) generated on server side
  username: string;
  age: number;
  hobbies: Array<string> | [];
}
