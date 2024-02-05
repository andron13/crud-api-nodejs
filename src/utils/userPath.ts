import { validate as uuidValidate } from 'uuid';

/**
 * Extract the 4th segment of a URL pathname and verifies if it is a UUID.
 *
 * @param {string} pathname - The URL pathname from which to extract user ID.
 *
 * @returns {object} An object with three properties:
 *
 * `userID` (string) - The fourth segment of the URL. Undefined if the URL pathname has less than four segments.
 *
 * `isUUID` (boolean) - True if the userID is a valid UUID; false otherwise. Undefined if the URL pathname has less than four segments.
 *
 * `splitPathname` (string[]) - An array obtained from splitting the input pathname by '/'.
 *
 */
export const extractUserID = (pathname: string): { userID: string; isUUID: boolean; splitPathname: string[] } => {
  /**
   * @type {string[]} Array obtained from splitting the input pathname by '/'. Undefined if pathname is not defined.
   */
  const splitPathname: string[] = pathname?.split('/') || [];

  /**
   * @type {string} The fourth segment of the URL / input pathname. Undefined if the URL pathname has less than four segments.
   */
  let userID: string;

  /**
   * @type {boolean} True if the userID is a valid UUID; false otherwise. Undefined if the URL pathname has less than four segments.
   */
  let isUUID: boolean;

  if (splitPathname.length >= 3) {
    userID = splitPathname[3];
    isUUID = uuidValidate(userID);
  }

  return { userID, isUUID, splitPathname };
};

/**
 * Checks if the second part of split URL is 'users' and is malformed.
 *
 * @param {string} secondPath - The second segment of a URL
 *
 * @returns {boolean} True if 'secondPath' begins with 'users',
 * does not have / as the seventh character and has a length greater than 5; False otherwise.
 */
export const isBrokenUserLink = (secondPath: string): boolean => {
  return secondPath.startsWith('users') && secondPath[6] !== '/' && secondPath.length > 5;
};
