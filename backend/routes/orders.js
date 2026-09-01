// Intended path: /backend/routes/orders.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { getMyOrders, createOrder } = require('../controllers/orderController');

router.get('/me', requireAuth, getMyOrders);
router.post('/', requireAuth, createOrder);

module.exports = router;
