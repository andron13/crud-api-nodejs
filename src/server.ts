// src/server.ts

import cluster from 'cluster';
import { createServer, IncomingMessage, ServerResponse } from 'http';

import { router } from './routes';
import { config, MESSAGES, numCPUs } from './utils';
import { whatDoesWorkerSay } from './workers/cluster';

const port: number = config.port;

export const createHttpServer = () => {
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    router(request, response);
  });

  server.on('error', (err) => {
    console.error(MESSAGES.SERVER_ERROR, err);
  });

  return server;
};

export const startServer = (isMulti: boolean): void => {
  const server = createHttpServer();
  let isServerRunning = false;

  if (cluster.isPrimary) {
    console.log(MESSAGES.PRIMARY_RUNNING.replace('%pid%', process.pid.toString()));

    if (isMulti) {
      console.log(MESSAGES.NUM_CPUS.replace('%numCPUs%', numCPUs.toString()));

      for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork({ PORT: (port + i).toString() });
        worker.on('message', (msg) => {
          whatDoesWorkerSay(msg);
        });
      }

      cluster.on('exit', (oldWorker, code, signal) => {
        console.log(
          MESSAGES.WORKER_DIED.replace('%pid%', oldWorker.process.pid.toString())
            .replace('%code%', code.toString())
            .replace('%signal%', signal.toString()),
        );
        const newWorker = cluster.fork({ PORT: port + Object.keys(cluster.workers).length });
        newWorker.on('message', (msg) => {
          whatDoesWorkerSay(msg);
        });
      });
    } else {
      const worker = cluster.fork({ PORT: port + Object.keys(cluster.workers).length });
      worker.on('message', (msg) => {
        whatDoesWorkerSay(msg);
      });
    }
  } else {
    const workerPort = process.env.PORT || port;

    server.listen(workerPort, () => {
      console.log(
        MESSAGES.WORKER_STARTED.replace('%pid%', process.pid.toString()).replace('%port%', workerPort.toString()),
      );
      // TODO
      process.send({ method: 'methodB', params: 'Hello Master' });
      isServerRunning = true;
    });
  }
  process.on('SIGINT', () => {
    console.log(MESSAGES.SIGINT_RECEIVED);
    if (isServerRunning) {
      server.close((err) => {
        if (err) {
          console.error(MESSAGES.SERVER_CLOSE_FAIL, err);
          process.exit(1);
        }
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
};
