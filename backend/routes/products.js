// Intended path: /backend/routes/products.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:idOrSlug', getProductByIdOrSlug);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
