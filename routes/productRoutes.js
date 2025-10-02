// routes/productRoutes.js – Product endpoints

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getStats,
} = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');

// CRUD routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

// Advanced features
router.get('/search/name', searchProducts);
router.get('/stats/category', getStats);

module.exports = router;
