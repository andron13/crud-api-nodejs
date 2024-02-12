# NodeJS CRUD API

Этот проект - выполнение заданий по [NodeJS](https://nodejs.org/ru/), в частности в категории [CRUD API](https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/crud-api).

## Описание

Требуется создать приложение на Express с следующим функционалом:

- Маршрутизация и обработка HTTP-запросов.
- Тесты
- Балансировщик нагрузки (алгоритм Round-robin)


## Установка и настройка

1. Клонировать репозиторий

```
git clone git@github.com:andron13/crud-api-nodejs.git
```

2. Перейти в каталог `crud-api`

```
cd crud-api-nodejs
```

3. Установить зависимости

```
npm install
```

4. Запустить сервер

```
npm run start:prod
```

## ДОПОЛНИТЕЛЬНО: Запустите сервер с nodemon (для разработки)

```
npm run start:dev
```

## ДОПОЛНИТЕЛЬНО: балансировщик нагрузки (алгоритм Round-robin)

```
npm run start:multi
```

## API

Подробное описание запросов API можно найти [здесь](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

### API Endpoints

Приложение включает в себя следующие конечные точки по адресу `api/users`:

#### GET api/users

- Получить все записи пользователей.
- Сервер отвечает с кодом статуса `200` и всеми записями пользователей.

#### GET api/users/{userId}

- Получить определенного пользователя по `userId`.
- Сервер отвечает с кодом статуса `200` и записью пользователя с соответствующим `userId`.
- Сервер отвечает с кодом статуса `400` и соответствующим сообщением, если `userId` недействителен (не UUID).
- Сервер отвечает с кодом статуса `404` и соответствующим сообщением, если запись с `userId` не существует.

#### POST api/users

- Создает новую запись пользователя.
- Сервер отвечает с кодом статуса `201` и новой записью.
- Сервер отвечает с кодом статуса `400` и соответствующим сообщением, если тело запроса не содержит необходимых полей.

#### PUT api/users/{userId}

- Обновляет существующую запись пользователя.
- Сервер отвечает с кодом статуса `200` и обновленной записью.
- Сервер отвечает с кодом статуса `400` и соответствующим сообщением, если `userId` недействителен (не UUID).
- Сервер отвечает с кодом статуса `404` и соответствующим сообщением, если запись с `userId` не существует.

#### DELETE api/users/{userId}

- Удаляет существующую запись пользователя.
- Сервер отвечает с кодом статуса `204`, если запись найдена и успешно удалена.
- Сервер отвечает с кодом статуса `400` и соответствующим сообщением, если `userId` недействителен (не UUID).
- Сервер отвечает с кодом статуса `404` и соответствующим сообщением, если запись с `userId` не существует.

## Зависимости

- [Node.js](https://nodejs.org/ru/) версии >=20.0.0
- [uuid](https://www.npmjs.com/package/uuid) версии ^9.0.0

## Зависимости для разработки

- [@types/dotenv-webpack](https://www.npmjs.com/package/@types/dotenv-webpack) версия ^7.0.7
- [@types/glob](https://www.npmjs.com/package/@types/glob) версия ^8.1.0
- [@types/jest](https://www.npmjs.com/package/@types/jest) версия ^29.5.2
- [@types/node](https://www.npmjs.com/package/@types/node) версия ^20.3.2
- [@types/supertest](https://www.npmjs.com/package/@types/supertest) версия ^6.0.2
- [@types/uuid](https://www.npmjs.com/package/@types/uuid) версия ^9.0.2
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) версия ^6.18.1
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) версия ^6.0.0
- [cross-env](https://www.npmjs.com/package/cross-env) версия ^7.0.3
- [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) версия ^8.0.1
- [eslint](https://www.npmjs.com/package/eslint) версия ^8
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) версия ^9.1.0
- [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript) версия ^3.6.1
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) версия ^2.29.1
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) версия ^5.1.3
- [eslint-plugin-simple-import-sort](https://www.npmjs.com/package/eslint-plugin-simple-import-sort) версия ^10.0.0
- [jest](https://www.npmjs.com/package/jest) версия ^29.7.0
- [nodemon](https://www.npmjs.com/package/nodemon) версия ^3.0.3
- [prettier](https://www.npmjs.com/package/prettier) версия ^3.2.2
- [supertest](https://www.npmjs.com/package/supertest) версия ^6.3.4
- [ts-jest](https://www.npmjs.com/package/ts-jest) версия ^29.1.2
- [ts-loader](https://www.npmjs.com/package/ts-loader) версия ^9.5.1
- [ts-node](https://www.npmjs.com/package/ts-node) версия ^10.9.1
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) версия ^2.0.0
- [typescript](https://www.npmjs.com/package/typescript) версия ^5.3.3
- [webpack](https://www.npmjs.com/package/webpack) версия ^5.90.1
- [webpack-cli](https://www.npmjs.com/package/webpack-cli) версия ^5.1.4
