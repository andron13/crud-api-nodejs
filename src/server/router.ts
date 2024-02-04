import { IncomingMessage, ServerResponse } from 'http';

import { users } from '../types/user';
import { ErrorMessage, HttpStatus } from '../utils/messages';

const fourHundred = (response: ServerResponse): void => {
  response.writeHead(HttpStatus.BAD_REQUEST, {
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify({ message: ErrorMessage.PAGE_NOT_FOUND }));
};

export const router = (request: IncomingMessage, response: ServerResponse, arr: users) => {
  const { method, url } = request;

  console.log('Server request');
  fourHundred(response);
};
