# NodeJS CRUD API 🚀

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

<p align="center">A simple CRUD API implementation using an in-memory database.</p>

This is a [student project](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) developed in NodeJS.
It was created as part of the curriculum for the [RS School](https://rs.school/).

## Description

You are required to create an Express Application with the following functionalities:

- Routing and handling HTTP requests.
- Tests
- Load balancer (Round-robin algorithm)

## Setup & Installation

1. Clone the repository

```
git clone git@github.com:andron13/crud-api-nodejs.git
```

2. Navigate to the `crud-api` directory

```
cd crud-api-nodejs
```

3. Install the dependencies

```
npm install
```

4. Start the server

```
npm run start:prod
```

## OPTIONAL: Start the server with nodemon (for development)

```
npm run start:dev
```

## OPTIONAL: load balancer (Round-robin algorithm)

```
npm run start:multi
```

## API

Detailed descriptions of API requests can be found [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

### API Endpoints

This application includes the following endpoints under `api/users`:

#### GET api/users

- Retrieves all user records.
- Server responds with status code `200` and all user records.

#### GET api/users/{userId}

- Retrieves a specific user by `userId`.
- Server responds with status code ✅ `200` and the user record with the corresponding `userId`.
- Server responds with status code ❌`400` and a corresponding message if `userId` is invalid (not a UUID).
- Server responds with status code ❌`404` and a corresponding message if a record with `userId` doesn't exist.

#### POST api/users

- Creates a new user record.
- Server responds with status code ✅`201` and the newly created record.
- Server responds with status code ❌`400` and a corresponding message if the request body does not contain required fields.

#### PUT api/users/{userId}

- Updates an existing user record.
- Server responds with status code ✅`200` and the updated record.
- Server responds with status code ❌`400` and a corresponding message if `userId` is invalid (not a UUID).
- Server responds with status code ❌`404` and a corresponding message if a record with `userId` doesn't exist.

#### DELETE api/users/{userId}

- Deletes an existing user record.
- Server responds with status code ✅`204` if the record is found and successfully deleted.
- Server responds with status code ❌`400` and a corresponding message if `userId` is invalid (not a UUID).
- Server responds with status code ❌`404` and a corresponding message if a record with `userId` doesn't exist.

## Dependencies

- [Node.js](https://nodejs.org/) version >=20.0.0
- [uuid](https://www.npmjs.com/package/uuid) version ^9.0.0

## Dev Dependencies

- [@types/dotenv-webpack](https://www.npmjs.com/package/@types/dotenv-webpack) version ^7.0.7
- [@types/glob](https://www.npmjs.com/package/@types/glob) version ^8.1.0
- [@types/jest](https://www.npmjs.com/package/@types/jest) version ^29.5.2
- [@types/node](https://www.npmjs.com/package/@types/node) version ^20.3.2
- [@types/supertest](https://www.npmjs.com/package/@types/supertest) version ^6.0.2
- [@types/uuid](https://www.npmjs.com/package/@types/uuid) version ^9.0.2
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) version ^6.18.1
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) version ^6.0.0
- [cross-env](https://www.npmjs.com/package/cross-env) version ^7.0.3
- [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) version ^8.0.1
- [eslint](https://www.npmjs.com/package/eslint) version ^8
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) version ^9.1.0
- [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript) version ^3.6.1
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) version ^2.29.1
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) version ^5.1.3
- [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort) version ^10.0.0
- [jest](https://www.npmjs.com/package/jest) version ^29.7.0
- [nodemon](https://www.npmjs.com/package/nodemon) version ^3.0.3
- [prettier](https://www.npmjs.com/package/prettier) version ^3.2.2
- [supertest](https://www.npmjs.com/package/supertest) version ^6.3.4
- [ts-jest](https://www.npmjs.com/package/ts-jest) version ^29.1.2
- [ts-loader](https://www.npmjs.com/package/ts-loader) version ^9.5.1
- [ts-node](https://www.npmjs.com/package/ts-node) version ^10.9.1
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) version ^2.0.0
- [typescript](https://www.npmjs.com/package/typescript) version ^5.3.3
- [webpack](https://www.npmjs.com/package/webpack) version ^5.90.1
- [webpack-cli](https://www.npmjs.com/package/webpack-cli) version ^5.1.4
