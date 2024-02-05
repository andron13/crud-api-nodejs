import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

import { UserService } from '../../services/user';
import { customSendResponse, HttpStatus, MESSAGES } from '../../utils';
import { extractUserID } from '../../utils/userPath';

const users = UserService.getInstance();

export const deleteHandler = (request: IncomingMessage, response: ServerResponse): void => {
  const { pathname } = parse(request.url || '', true);
  const { userID, isUUID } = extractUserID(pathname);
  const user = users.findOne(userID);

  if (isUUID && user) {
    users.delete(userID);
    customSendResponse(response, HttpStatus.DELETED, {
      data: { success: true },
      error: null,
    });
  } else if (isUUID && !user) {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.NOT_FOUND(userID),
    });
  } else {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.INVALID_USER_ID(userID),
    });
  }
};
