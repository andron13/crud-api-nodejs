import { IncomingMessage, ServerResponse } from 'http';

import { read } from '../../utils';

export const getFront = async (req: IncomingMessage, res: ServerResponse) => {
  const folder: string = '../../../static';
  const file: string = 'index.html';
  try {
    const content: string = await read(folder, file);
    res.write(content);
  } catch (error) {
    res.write('Error', error);
  } finally {
    res.end();
  }
};
