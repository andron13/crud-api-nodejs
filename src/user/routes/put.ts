import { IncomingMessage, ServerResponse } from 'http';

import { validate } from 'uuid';

import { customSendResponse, HttpStatus, MESSAGES } from '../../utils';
import { users } from '../index';

export const putHandler = (request: IncomingMessage, response: ServerResponse): void => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    try {
      const reqUser = JSON.parse(body);
      if (!reqUser || !reqUser.id) {
        customSendResponse(response, HttpStatus.BAD_REQUEST, {
          error: MESSAGES.REQUEST_BODY_IS_MISSING,
        });
        return;
      }
      if (!validate(reqUser.id)) {
        customSendResponse(response, HttpStatus.BAD_REQUEST, {
          error: MESSAGES.INVALID_USER_ID(reqUser.id),
        });
        return;
      }
      if (users.findOne(reqUser.id)) {
        const user = users.update(reqUser.id, reqUser);
        customSendResponse(response, HttpStatus.CREATED, {
          data: { user },
          error: null,
        });
      } else {
        customSendResponse(response, HttpStatus.NOT_FOUND, {
          error: MESSAGES.NOT_FOUND(reqUser.id),
        });
      }
    } catch (error) {
      customSendResponse(response, HttpStatus.BAD_REQUEST, {
        error,
        errorMessage: MESSAGES.INVALID_JSON_FORMAT,
      });
    }
  });
};
