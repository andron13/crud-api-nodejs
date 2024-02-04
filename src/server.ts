// src/server.ts
import { createServer, IncomingMessage, ServerResponse } from 'http';

import router from './routes';

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  router(request, response);
});

export const startServer = (): void => {
  const port = Number(process.env.PORT);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};
