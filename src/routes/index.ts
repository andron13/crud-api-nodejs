import { IncomingMessage, ServerResponse } from 'http';
import * as url from 'url';

import { getFront } from './front';
import { deleteHandler, getHandler, postHandler, putHandler } from './user';
import { MESSAGES, HttpStatus, customSendResponse, HttpMethod } from '../utils';
import { extractUserID, isBrokenUserLink } from '../utils/userPath';

const fourHundred = (response: ServerResponse): void => {
  customSendResponse(response, HttpStatus.BAD_REQUEST, { message: MESSAGES.PAGE_NOT_FOUND });
};

const router = (request: IncomingMessage, response: ServerResponse): void => {
  const { method } = request;
  const parsedUrl = url.parse(request.url as string, true);
  const pathName = parsedUrl.pathname;
  const { userID, isUUID, splitPathname } = extractUserID(pathName);

  if (pathName === '/' && method === HttpMethod.GET) {
    getFront(request, response).then(() => {
      console.log('getFront has finished');
    });
  }

  if (pathName.startsWith('/api/users') && isBrokenUserLink(splitPathname[2])) {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.PAGE_NOT_FOUND_POSSIBLY_BROKEN_LINK,
    });
    return;
  }

  if (pathName.startsWith('/api/users')) {
    switch (method) {
      case HttpMethod.GET:
        getHandler(request, response);
        break;
      case HttpMethod.POST:
        postHandler(request, response);
        break;
      case HttpMethod.PUT:
        putHandler(request, response);
        break;
      case HttpMethod.DELETE:
        deleteHandler(request, response);
        break;
      default:
        fourHundred(response);
    }
  }
};

export default router;
