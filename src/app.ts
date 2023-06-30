import * as http from 'http';
import { config } from './utils/config';
import { isMulti } from './utils/export';

const hostname: string = config.hostname || '127.0.0.1';
const port: string | undefined = config.port;
console.log(port);
console.log(hostname);
console.log('###### isMulti  ######', isMulti);

/*if (cluster.isMaster) {
  // Создание рабочих процессов
  for (let i = -1; i < numCPUs - 2; i++) {
    cluster.fork(port + i); // Передача порта в качестве переменной окружения
  }
} else {
  // Запуск сервера для каждого рабочего процесса
  require('./app.js');
}*/

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write('Hello World!');
  response.write('text2');
  response.write('text3');
  response.end();
});

server.listen(port, () => {
  console.log(`Server starts on http://${hostname}:${port}/`);
});
