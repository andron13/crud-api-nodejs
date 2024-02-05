import { IncomingMessage, ServerResponse } from 'http';

import { UserService } from '../../services/user';
import { isUserDataValid } from '../../utils/validate';

const users = UserService.getInstance();

export const postHandler = (request: IncomingMessage, response: ServerResponse): void => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    const reqData = JSON.parse(body);
    if (isUserDataValid(reqData)) {
      console.log('valid', reqData);
    } else {
      console.log('not valid', reqData);
    }
  });
};
