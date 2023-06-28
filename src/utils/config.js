const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT
};
