import { IncomingMessage, ServerResponse } from 'http';

import { read } from '../../utils/fsCrud/read';

export const getFront = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const content = await read('../../../static');
    res.write(content);
  } catch (error) {
    res.write('Error');
  } finally {
    res.end();
  }
};
