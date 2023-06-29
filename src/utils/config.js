const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  hostname: process.env.HOST || '127.0.0.1',
  port: process.env.PORT,
};
