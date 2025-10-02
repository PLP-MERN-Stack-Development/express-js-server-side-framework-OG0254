// middleware/validateProduct.js – Validates product data

const ApiError = require('../utils/ApiError');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (
    !name ||
    !description ||
    typeof price !== 'number' ||
    !category ||
    typeof inStock !== 'boolean'
  ) {
    return next(new ApiError.ValidationError('Invalid product data'));
  }
  next();
};
