// middleware/errorHandler.js – Global error handler

const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ApiError.BaseError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
