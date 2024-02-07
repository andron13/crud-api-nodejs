/**
 * Checks if a data object is not empty, and if all required properties are present and not empty.
 *
 * @param {object} data - The object to check.
 * @returns {boolean} True if an object is not empty and all properties are present and not empty, false otherwise.
 */
export const isUserDataValid = (data) => {
  if (Object.keys(data).length === 0) return false;

  const requiredFields = ['username', 'age', 'hobbies'];

  for (const field of requiredFields) {
    if (!data[field]) return false;
  }

  return true;
};

export const isOneUserFieldValid = (data) => {
  if (Object.keys(data).length === 0) return false;

  const requiredFields = ['username', 'age', 'hobbies'];

  return requiredFields.some((field) => Object.keys(data).includes(field) && Boolean(data[field]));
};
