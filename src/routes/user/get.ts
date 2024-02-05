import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

import { UserService } from '../../services/user';
import { HttpStatus, customSendResponse, MESSAGES } from '../../utils';
import { extractUserID } from '../../utils/userPath';

const users = UserService.getInstance();
export const getHandler = (request: IncomingMessage, response: ServerResponse): void => {
  const { pathname } = parse(request.url || '', true);
  const { userID, isUUID } = extractUserID(pathname);

  if (pathname === '/api/users' || pathname === '/api/users/') {
    const allUsers = users.getAll();
    customSendResponse(response, HttpStatus.OK, {
      data: { users: allUsers },
      error: null,
    });
  } else if (isUUID) {
    const user = users.findOne(userID);
    if (user) {
      customSendResponse(response, HttpStatus.OK, {
        data: { user },
        error: null,
      });
    } else {
      customSendResponse(response, HttpStatus.BAD_REQUEST, {
        error: MESSAGES.NOT_FOUND(userID),
      });
    }
  } else {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.INVALID_USER_ID(userID),
    });
  }
};

export default getHandler;
