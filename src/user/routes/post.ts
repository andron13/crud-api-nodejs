import { IncomingMessage, ServerResponse } from 'http';

import { customSendResponse, HttpStatus, MESSAGES } from '../../utils';
import { isUserDataValid } from '../../utils/userFiledsvalidate';
import { User, users } from '../index';

export const postHandler = (request: IncomingMessage, response: ServerResponse): void => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    try {
      const reqUser = JSON.parse(body);
      if (!reqUser) {
        customSendResponse(response, HttpStatus.BAD_REQUEST, {
          error: MESSAGES.REQUEST_BODY_IS_MISSING,
        });
        return;
      }

      let user: User;

      if (isUserDataValid(reqUser)) {
        user = users.create(reqUser);
        customSendResponse(response, HttpStatus.CREATED, {
          user,
          error: null,
        });
      } else {
        customSendResponse(response, HttpStatus.BAD_REQUEST, {
          error: MESSAGES.REQUIRED_FIELDS_MISSING,
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
