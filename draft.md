PORT=4000 node ./src/app.js
PORT=4000 NODE_ENV=development node ./src/app.js

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT;
