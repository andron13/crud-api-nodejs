import { IncomingMessage, ServerResponse } from 'http';

import { User } from '../user/user';
import { ErrorMessage, HttpStatus } from '../utils';

// Function to send 400 status
const fourHundred = (response: ServerResponse): void => {
  response.writeHead(HttpStatus.BAD_REQUEST, {
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify({ message: ErrorMessage.PAGE_NOT_FOUND }));
};

export const router = (request: IncomingMessage, response: ServerResponse, arr: User[]) => {
  const { method, url } = request;

  console.log('Server request');

  if (method === 'GET' && url === '/') {
    response.writeHead(HttpStatus.OK, {
      'Content-Type': 'text/plain',
    });
    response.end('Hello, World!');
    return;
  }

  switch (method) {
    case 'GET':
      // Handle GET request
      break;
    case 'POST':
      // Handle POST request
      break;
    case 'PUT':
      // Handle PUT request
      break;
    case 'DELETE':
      // Handle DELETE request
      break;
    default:
      fourHundred(response);
  }
};
