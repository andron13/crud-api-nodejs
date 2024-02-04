/**
 * Enum for HTTP status codes.
 * @enum {number}
 */
export const enum HttpStatus {
  /** 200 Indicates that the request has succeeded. */
  OK = 200,

  /** 201 Indicates that the request has succeeded and a new resource was created as a result. */
  CREATED = 201,

  /** 204 Indicates that the request has been processed and the resource has been removed. */
  DELETED = 204,

  /** 400 Indicates that the server could not understand the request due to invalid syntax. */
  BAD_REQUEST = 400,

  /** 401 Indicates authentication is required to access to the resource. */
  UNAUTHORIZED = 401,

  /** 404 Indicates that the server could not find the requested resource. */
  NOT_FOUND = 404,

  /** 500 Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. */
  INTERNAL_SERVER_ERROR = 500,
}

export const MESSAGES = {
  INVALID_USER_ID: (userID: string) => `Invalid user ID: ${userID}`,
  NOT_FOUND: (userID: string) => `NOT_FOUND id === ${userID} doesn't exist`,
  REQUIRED_FIELDS_MISSING: 'Required fields are missing',
  SERVER_ERROR: 'SERVER_ERROR human-friendly message',
  PAGE_NOT_FOUND: 'status code 404 and corresponding human-friendly message',
};

export const enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
