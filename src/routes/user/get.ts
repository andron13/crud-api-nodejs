import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

import { validate as uuidValidate } from 'uuid';

import { UserService } from '../../services/user';
import { HttpStatus, customSendResponse, ErrorMessage } from '../../utils';

const users = UserService.getInstance();
export const getHandler = (request: IncomingMessage, response: ServerResponse): void => {
  const { pathname } = parse(request.url || '', true);

  const splitPathname = pathname?.split('/') || [];
  const isUserId = splitPathname.length >= 3 && uuidValidate(splitPathname[3]); // Check UUID at the third position

  if (pathname === '/api/users' || pathname === '/api/users/') {
    const allUsers = users.getAll();
    customSendResponse(response, HttpStatus.OK, {
      data: { users: allUsers },
      error: null,
    });
  } else if (isUserId) {
    const user = users.findOne(splitPathname[3]);
    if (user) {
      customSendResponse(response, HttpStatus.OK, {
        data: { user },
        error: null,
      });
    }
  } else {
    customSendResponse(response, HttpStatus.NOT_FOUND, {
      error: ErrorMessage.NOT_FOUND,
    });
  }
};

export default getHandler;
