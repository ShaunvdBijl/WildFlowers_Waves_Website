// Intended path: /backend/controllers/adminOrderController.js
const Order = require('../models/Order');

const ALLOWED_STATUSES = ['pending', 'accepted', 'declined', 'completed'];

// @desc    Fetch all orders, with client name/email populated, for admin review
// @route   GET /api/admin/orders
// @access  Private (admin only)
exports.getAllOrders = async (req, res) => {
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
};

// @desc    Accept, decline, or complete a client's order
// @route   PATCH /api/admin/orders/:id/status
// @access  Private (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` });
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
};
