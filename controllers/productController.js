// controllers/productController.js – Business logic

const { v4: uuidv4 } = require('uuid');
let products = require('../models/productModel');
const ApiError = require('../utils/errors');

// GET all with optional filtering + pagination
exports.getProducts = (req, res) => {
  let { category, page = 1, limit = 5 } = req.query;
  let data = products;

  if (category) {
    data = data.filter((p) => p.category === category);
  }

  // Pagination
  page = parseInt(page);
  limit = parseInt(limit);
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  res.json({ total: data.length, page, limit, products: paginated });
};

// GET one by id
exports.getProductById = (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new ApiError.NotFoundError('Product not found'));
  res.json(product);
};

// POST create
exports.createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT update
exports.updateProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new ApiError.NotFoundError('Product not found'));

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

// DELETE
exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new ApiError.NotFoundError('Product not found'));

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
};

// SEARCH by name
exports.searchProducts = (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  const results = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  res.json(results);
};

// STATS count by category
exports.getStats = (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
};
