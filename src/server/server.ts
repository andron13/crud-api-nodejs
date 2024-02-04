import { createServer, IncomingMessage, ServerResponse } from 'http';

import { router } from './router';
import { users } from '../types/user';

const port: number = parseInt(process.env.PORT as string);
const userDB: users = [];

export const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  router(request, response, userDB);
});

export const startServer = (): void => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
