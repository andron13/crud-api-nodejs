import { createServer, IncomingMessage, ServerResponse } from 'http';

import { router } from './router';
import { users } from '../types/user';
import { config } from '../utils/config';

const port: string | number = config.port || 4000;
const userDB: users = [];

export const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  router(request, response, userDB);
});

const startServer = (): void => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
