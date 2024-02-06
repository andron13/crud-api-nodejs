// src/server.ts
import cluster from 'cluster';
import { createServer, IncomingMessage, ServerResponse } from 'http';

import { router } from './routes';
import { config, numCPUs } from './utils';

const port: number = config.port;

const createHttpServer = () => {
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    router(request, response);
  });

  server.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
  });

  return server;
};

export const startServer = (isMulti: boolean): void => {
  const server = createHttpServer();
  let isServerRunning = false;

  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    if (isMulti) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork({ PORT: (port + i).toString() });
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        cluster.fork({ PORT: port + Object.keys(cluster.workers).length });
      });
    } else {
      cluster.fork({ port: port });
    }
  } else {
    const workerPort = process.env.PORT || port;

    server.listen(workerPort, () => {
      console.log(`Worker ${process.pid} started. Server running at http://localhost:${workerPort}/`);
      isServerRunning = true;
    });
  }
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    if (isServerRunning) {
      server.close((err) => {
        if (err) {
          console.error('Failed to close server:', err);
          process.exit(1);
        }
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
};
