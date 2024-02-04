import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

import { UserService } from '../../services/user';
import { customSendResponse, HttpStatus, MESSAGES } from '../../utils';
import { extractUserID, isBrokenUserLink } from '../../utils/userPath';

const users = UserService.getInstance();

export const deleteHandler = (request: IncomingMessage, response: ServerResponse): void => {
  const { pathname } = parse(request.url || '', true);
  const { userID, isUUID, splitPathname } = extractUserID(pathname);
  const user = users.findOne(userID);

  if (isBrokenUserLink(splitPathname[2])) {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.PAGE_NOT_FOUND,
    });
    return;
  }

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

export default deleteHandler;
