// // server.js - Starter Express server for Week 2 assignment

// // Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware setup
// app.use(bodyParser.json());

// // Sample in-memory products database
// let products = [
//   {
//     id: '1',
//     name: 'Laptop',
//     description: 'High-performance laptop with 16GB RAM',
//     price: 1200,
//     category: 'electronics',
//     inStock: true
//   },
//   {
//     id: '2',
//     name: 'Smartphone',
//     description: 'Latest model with 128GB storage',
//     price: 800,
//     category: 'electronics',
//     inStock: true
//   },
//   {
//     id: '3',
//     name: 'Coffee Maker',
//     description: 'Programmable coffee maker with timer',
//     price: 50,
//     category: 'kitchen',
//     inStock: false
//   }
// ];

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Product API! Go to /api/products to see all products.');
// });

// // TODO: Implement the following routes:
// // GET /api/products - Get all products
// // GET /api/products/:id - Get a specific product
// // POST /api/products - Create a new product
// // PUT /api/products/:id - Update a product
// // DELETE /api/products/:id - Delete a product

// // Example route implementation for GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// // TODO: Implement custom middleware for:
// // - Request logging
// // - Authentication
// // - Error handling

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Export the app for testing purposes
// module.exports = app;

// server.js
// Main entry point - wires middleware, routes, and the global error handler.

// server.js – Main entry point

// server.js
// Main entry point for the Product API project

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/products', productRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
