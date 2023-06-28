const http = require('http');

const {port, hostname} = require('./utils/config');

/*const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT;*/

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
