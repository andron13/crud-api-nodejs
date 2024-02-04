import { ServerResponse } from 'http';

export const customSendResponse = (
  response: ServerResponse,
  statusCode: number,
  data: Record<string, unknown>,
): void => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
};
