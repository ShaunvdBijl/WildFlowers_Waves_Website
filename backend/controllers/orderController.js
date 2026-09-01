// Intended path: /backend/controllers/orderController.js
const Order = require('../models/Order');

// @desc    Fetch the logged-in client's orders, split into active vs history
// @route   GET /api/orders/me
// @access  Private (any authenticated + synced user)
exports.getMyOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: 'No profile synced yet. Call POST /api/users/sync first.' });
    }

    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

    const active = orders.filter((o) => ['pending', 'accepted'].includes(o.status));
    const history = orders.filter((o) => ['completed', 'declined'].includes(o.status));

    res.json({ active, history });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// @desc    Create a new order for the logged-in client (e.g. from a cart / enquiry)
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: 'No profile synced yet. Call POST /api/users/sync first.' });
    }

    const { items, totalAmount } = req.body;
    const order = await Order.create({ userId: req.user._id, items, totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};
