import * as http from 'http';
import { port, hostname } from './utils/config';
import * as os from 'os';
import cluster from 'cluster';

const numCPUs = os.cpus().length;

const isMulti = process?.argv.filter((element) => element.startsWith('--isMulti'))[0]?.split('=')[1] === 'true';

console.log('###### isMulti  ######', isMulti);

/*
if (cluster.isMaster) {
  // Создание рабочих процессов
  for (let i = -1; i < numCPUs - 2; i++) {
    cluster.fork(port + i); // Передача порта в качестве переменной окружения
  }
} else {
  // Запуск сервера для каждого рабочего процесса
  require('./app.js');
}
*/

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write('Hello World!');
  response.write('text2');
  response.write('text3');
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server starts on http://${hostname}:${port}/`);
});
