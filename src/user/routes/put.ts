import { IncomingMessage, ServerResponse } from 'http';

import { validate } from 'uuid';

import { customSendResponse, HttpStatus, MESSAGES } from '../../utils';
import { users } from '../index';

/**
 * HTTP PUT handler.
 *
 * Takes in requests for updating user details.
 * The user lookup is based on the id present in the request route.
 * The updated user details should be provided in the request body in JSON format.
 *
 * @param  { IncomingMessage } request - The incoming HTTP request.
 * @param  { ServerResponse } response - The outgoing HTTP response.
 *
 * Usage:
 * PUT /api/users/:id
 * where :id is a UUID representing the user.
 *
 * The request body should be a JSON object representing the updated user.
 * Example:
 * {
 *    "username": "John Doe",
 *    "age": 28,
 *    "hobbies": ['hobby1', 'hobby2']
 * }
 *
 * This method sends responses with different HTTP status codes based on the result:
 * 400: If the request does not contain a valid user id or the request body is not a valid JSON or does not contain the required information.
 * 404: If a user with the given id is not found in the 'users' data repository.
 * 201: If the user details were updated successfully.
 */
export const putHandler = (request: IncomingMessage, response: ServerResponse): void => {
  let body = '';
  const userId = request.url.split('/').slice(-1)[0];

  if (!userId || !validate(userId)) {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.INVALID_USER_ID(userId),
    });
    return;
  }

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
      if (users.findOne(userId)) {
        const user = users.update(userId, reqUser);
        customSendResponse(response, HttpStatus.CREATED, {
          data: { user },
          error: null,
        });
      } else {
        customSendResponse(response, HttpStatus.NOT_FOUND, {
          error: MESSAGES.NOT_FOUND(userId),
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
