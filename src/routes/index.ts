import { IncomingMessage, ServerResponse } from 'http';

import * as url from 'url';

import { deleteHandler, getHandler, postHandler, putHandler } from './user';
import { ErrorMessage, HttpStatus, customSendResponse } from '../utils';

const fourHundred = (response: ServerResponse): void => {
  customSendResponse(response, HttpStatus.BAD_REQUEST, { message: ErrorMessage.PAGE_NOT_FOUND });
};

const router = (request: IncomingMessage, response: ServerResponse): void => {
  const { method } = request;
  const parsedUrl = url.parse(request.url as string, true);
  const pathName = parsedUrl.pathname;

  if (pathName.startsWith('/api/users')) {
    switch (method) {
      case 'GET':
        getHandler(request, response);
        break;
      case 'POST':
        postHandler(request, response);
        break;
      case 'PUT':
        putHandler(request, response);
        break;
      case 'DELETE':
        deleteHandler(request, response);
        break;
      default:
        fourHundred(response);
    }
  }
};

export default router;
