// Intended path: /backend/routes/admin-orders.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const { getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');

router.get('/orders', requireAuth, requireRole('admin'), getAllOrders);
router.patch('/orders/:id/status', requireAuth, requireRole('admin'), updateOrderStatus);

module.exports = router;
