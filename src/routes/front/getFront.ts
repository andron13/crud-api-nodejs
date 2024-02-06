import { IncomingMessage, ServerResponse } from 'http';

import { read } from '../../utils';

export const getFront = async (req: IncomingMessage, res: ServerResponse) => {
  const folder: string = '../../../static';
  const file: string = 'index.html';
  try {
    const content: string = await read(folder, file);
    res.setHeader('Content-Type', 'text/html');
    res.write(content);
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.write(`Failed to read file: ${error.message}`);
    res.end();
  }
};
