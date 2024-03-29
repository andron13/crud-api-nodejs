import { IncomingMessage, ServerResponse } from 'http';
import process from 'process';
import * as url from 'url';

import { getFront } from './front';
import { deleteHandler, getHandler, postHandler, putHandler } from '../user/routes';
import { MESSAGES, HttpStatus, customSendResponse, HttpMethod } from '../utils';
import { extractUserID, isBrokenUserLink } from '../utils/userPath';

const fourHundred = (response: ServerResponse): void => {
  customSendResponse(response, HttpStatus.BAD_REQUEST, { message: MESSAGES.PAGE_NOT_FOUND });
};

export const router = (request: IncomingMessage, response: ServerResponse): void => {
  const { method } = request;
  const parsedUrl = url.parse(request.url as string, true);
  const pathName = parsedUrl.pathname;
  const { splitPathname } = extractUserID(pathName);

  if (pathName === '/' && method === HttpMethod.GET) {
    getFront(request, response).catch(() => {
      console.log('Production mode');
      // console.error(`Failed to get front: ${err.message}`);
      // customSendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {
      //   error: MESSAGES.INTERNAL_SERVER_ERROR,
      // });
    });
  }

  if (pathName.startsWith('/api/users') && isBrokenUserLink(splitPathname[2])) {
    customSendResponse(response, HttpStatus.BAD_REQUEST, {
      error: MESSAGES.PAGE_NOT_FOUND_POSSIBLY_BROKEN_LINK,
    });
    return;
  }

  if (pathName.startsWith('/api/users')) {
    handleApiRequest(request, response, method);
  }
};

const handleApiRequest = (request: IncomingMessage, response: ServerResponse, method: string) => {
  switch (method) {
    case HttpMethod.GET:
      getHandler(request, response);
      process.send({ method: 'get' });
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
};
