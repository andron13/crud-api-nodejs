import fsPromises from 'fs/promises';
import { join } from 'path';

export const read = async (folder: string) => {
  const file = 'index.html';
  const filePath = join(__dirname, folder, file);
  console.log(filePath);
  try {
    await fsPromises.access(filePath, fsPromises.constants.F_OK);
    return await fsPromises.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(err);
  }
};
