// middleware/auth.js – Simple API key authentication

module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const expected = process.env.API_KEY || '12345';

  if (apiKey !== expected) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
};
