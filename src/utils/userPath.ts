import { validate as uuidValidate } from 'uuid';

export const extractUserID = (pathname) => {
  const splitPathname = pathname?.split('/') || [];
  let userID, isUUID;

  if (splitPathname.length >= 3) {
    userID = splitPathname[3];
    isUUID = uuidValidate(userID);
  }

  return { userID, isUUID, splitPathname };
};

export const isBrokenUserLink = (secondPath: string) => {
  return secondPath.startsWith('users') && secondPath[6] !== '/' && secondPath.length > 5;
};
