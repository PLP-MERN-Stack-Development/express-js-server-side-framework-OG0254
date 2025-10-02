const { ValidationError } = require('../utils/errors');

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return next(new ValidationError('All product fields are required'));
  }
  if (typeof price !== 'number' || price < 0) {
    return next(new ValidationError('Price must be a valid non-negative number'));
  }
  if (typeof inStock !== 'boolean') {
    return next(new ValidationError('inStock must be a boolean'));
  }
  next();
};

module.exports = validateProduct;
