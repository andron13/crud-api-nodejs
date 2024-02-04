import cluster from 'cluster';
import * as http from 'http';

import { mockUsers } from './user/mockUsers';
import { isMulti, numCPUs, config } from './utils/export';

const hostname: string = config.hostname || '127.0.0.1';
const port: string | undefined = config.port;
cluster.isPrimary;
console.log('#### cluster.isPrimary####', cluster.isPrimary);
console.log(port);
console.log(hostname);

console.log('###### isMulti  ######', isMulti);

// User records
const users = mockUsers;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world\n');
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
