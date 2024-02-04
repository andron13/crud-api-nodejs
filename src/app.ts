import cluster from 'cluster';
import { cpus } from 'os';

import { startServer } from './server/server';
import { mockUsers } from './user/mockUsers';

const basePort: number = 4000;
const numCores = cpus().length;

// Exception handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

// User records
const users = mockUsers;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCores; i++) {
    cluster.fork({ PORT: (basePort + i).toString() });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`worker ${worker.process.pid} died`);
    cluster.fork(); // if you want to restart worker on its death
  });
} else {
  startServer();
  console.log(`Worker ${process.pid} started`);
}
