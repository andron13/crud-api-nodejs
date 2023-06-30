<h1 align="center">CRUD API 🚀</h1>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

<p align="center">A simple CRUD API implementation using an in-memory database.</p>

This is a [student project](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) developed in NodeJS. It was created as part of the curriculum for the [RS School](https://rs.school/).


## Technical Requirements

- The implementation can be done in JavaScript or TypeScript.
- Only the following dependencies are allowed: `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*`, and any testing libraries.
- Use Node.js version 18 LTS.
- Prefer an asynchronous approach where possible.

## Implementation Details

1. Implement the `api/users` endpoint:
   - **GET** `api/users` is used to retrieve all users.
     - The server should respond with ✅ **200** status and all user records.
   - **GET** `api/users/{userId}` 
     - The server should respond with ✅ **200** status and the record with `id === userId` if it exists.
     - The server should respond with ❌ **400** status and an appropriate message if `userId` is invalid (not a `uuid`).
     - The server should respond with ❌ **404** status and an appropriate message if the record with `id === userId` does not exist.
   - **POST** `api/users` is used to create a new user and save it to the database.
     - The server should respond with ✅ **201** status and the created record.
     - The server should respond with ❌ **400** status and an appropriate message if the request `body` does not contain **mandatory** fields.
   - **PUT** `api/users/{userId}` is used to update an existing user.
     - The server should respond with ✅ **200** status and the updated record.
     - The server should respond with ❌ **400** status and an appropriate message if `userId` is invalid (not a `uuid`).
     - The server should respond with ❌ **404** status and an appropriate message if the record with `id === userId` does not exist.
   - **DELETE** `api/users/{userId}` is used to delete an existing user from the database.
     - The server should respond with ✅ **204** status if the record is found and deleted.
     - The server should respond with ❌ **404** status and an appropriate message if the record with `id === userId` does not exist.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


