// utils/ApiError.js – Custom error classes

class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = {
  BaseError,
  NotFoundError,
  ValidationError,
};
