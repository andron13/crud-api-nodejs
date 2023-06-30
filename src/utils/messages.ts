export const enum HttpStatus {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const enum ErrorMessage {
  INVALID_USER_ID = 'Invalid user ID',
  NOT_FOUND = "NOT_FOUND id === userId doesn't exist",
  REQUIRED_FIELDS_MISSING = 'Required fields are missing',
  SERVER_ERROR = 'SERVER_ERROR human-friendly message',
  PAGE_NOT_FOUND = 'status code 404 and corresponding human-friendly message',
}

export const enum HttpMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
