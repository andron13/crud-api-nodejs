export const config = {
  hostname: process.env.HOST,
  port: Number(process.env.PORT) || 4000,
  workerPort: process.env.WORKER_PORT,
  isMulti: process.argv.includes('--isMulti=true'),
};
