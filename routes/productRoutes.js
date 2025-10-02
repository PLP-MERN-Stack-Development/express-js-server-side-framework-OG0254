const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { products } = require('../models/productModel');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();

// @desc Get all products (with optional category filter, pagination, search)
router.get('/', (req, res) => {
  let { category, search, page = 1, limit = 5 } = req.query;
  let results = [...products];

  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    results = results.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = results.slice(start, end);

  res.json({
    total: results.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginated,
  });
});

// @desc Get product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// @desc Create product
router.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// @desc Update product
router.put('/:id', auth, validateProduct, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// @desc Delete product
router.delete('/:id', auth, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
});

module.exports = router;
