import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  hostname: process.env.HOST,
  port: process.env.PORT,
  workerPort: process.env.WORKER_PORT,
};
