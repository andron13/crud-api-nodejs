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

/**
 * An object of message templates for various types of responses
 *
 * @property {function} INVALID_USER_ID - Function that takes userID as string and returns a custom error message string.
 *
 * @property {function} NOT_FOUND - Function that takes userID as string and returns a custom not-found message string.
 *
 * @property {string} REQUIRED_FIELDS_MISSING - Message to indicate that required fields are missing.
 *
 * @property {string} SERVER_ERROR - Message to indicate that server error occurred.
 *
 * @property {string} PAGE_NOT_FOUND - Message to indicate that the requested page was not found.
 */
export const MESSAGES = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  INVALID_JSON_FORMAT: 'Invalid JSON format',
  INVALID_USER_ID: (userID: string) => `Invalid user ID: ${userID}`,
  NOT_FOUND: (userID: string) => `NOT_FOUND id === ${userID} doesn't exist`,
  NUM_CPUS: 'Current system has %numCPUs% CPU cores available.',
  PAGE_NOT_FOUND: 'status code 404 and corresponding human-friendly message',
  PAGE_NOT_FOUND_POSSIBLY_BROKEN_LINK: 'Status code: 404 - Possibly a broken link',
  PRIMARY_RUNNING: 'Primary %pid% is running',
  REQUIRED_FIELDS_MISSING: 'Required fields are missing',
  REQUEST_BODY_IS_MISSING: 'Request body is missing',
  SERVER_CLOSE_FAIL: 'Failed to close server:',
  SERVER_ERROR: 'Server error',
  SIGINT_RECEIVED: 'Received SIGINT. Shutting down gracefully...',
  WORKER_DIED: 'Worker %pid% died with code %code% and signal %signal%',
  WORKER_STARTED: 'Worker %pid% started. Server running at http://localhost:%port%/',
};

/**
 * Enumeration for HTTP methods
 *
 * @readonly
 * @enum {string}
 */
export const enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
