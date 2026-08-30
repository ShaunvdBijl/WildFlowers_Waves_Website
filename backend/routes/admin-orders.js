// Intended path: /backend/routes/adminOrders.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const Order = require('../models/Order');

// @route   GET /api/admin/orders
// @desc    Fetch all orders, with client name/email populated, for admin review
// @access  Private (admin only)
router.get('/orders', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// @route   PATCH /api/admin/orders/:id/status
// @desc    Accept, decline, or complete a client's order
// @access  Private (admin only)
router.patch('/orders/:id/status', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'accepted', 'declined', 'completed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${allowedStatuses.join(', ')}` });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(
      'userId',
      'name email'
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
});

module.exports = router;
