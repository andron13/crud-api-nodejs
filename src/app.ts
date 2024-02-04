// src/app.ts
import cluster from 'cluster';

import { startServer } from './server';
import { config, numCPUs } from './utils';

const basePort: number = config.port;
const numCores = numCPUs;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCores; i++) {
    cluster.fork({ PORT: (basePort + i).toString() });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    cluster.fork();
  });
} else {
  startServer();
  console.log(`Worker ${process.pid} started`);
}
