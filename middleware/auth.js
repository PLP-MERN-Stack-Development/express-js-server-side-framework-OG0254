const { UnauthorizedError } = require('../utils/errors');

const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return next(new UnauthorizedError('Invalid or missing API key'));
  }
  next();
};

module.exports = auth;
