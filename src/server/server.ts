import { createServer, IncomingMessage, ServerResponse } from 'http';

import { router } from './router';
import { Users } from '../user/user';

export const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  router(request, response, Users.users);
});

export const startServer = (): void => {
  const port = Number(process.env.PORT);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};
