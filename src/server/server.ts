import { createServer, IncomingMessage, ServerResponse } from 'http';
import { users } from '../types/user';
import { config } from '../utils/config';
import { router } from './router';

const port: string | number = config.port || 4000;
let userDB: users = [];

export const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    router(request, response, userDB);
  },
);

const startServer = (): void => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
