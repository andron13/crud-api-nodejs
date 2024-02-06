// src/app.ts

import { startServer } from './server';
import { isMulti } from './utils';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

startServer(isMulti);
