import fsPromises from 'fs/promises';
import { join } from 'path';

/**
 * Read file from specified folder.
 * If the file name is not specified, index.html will be read by default.
 *
 * @param {string} folder - The folder path where the file is located.
 * @param {string} [file='index.html'] - The name of file to read.
 * Default is 'index.html'.
 *
 * @returns {Promise<string>} A promise that resolves to the contents of the file.
 *
 * @throws Will throw an error if the file cannot be accessed or other errors occur during file reading.
 */
export const read = async (folder: string, file: string = 'index.html'): Promise<string> => {
  const filePath: string = join(__dirname, folder, file);
  try {
    await fsPromises.access(filePath, fsPromises.constants.F_OK);
    return await fsPromises.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(String(err));
  }
};
