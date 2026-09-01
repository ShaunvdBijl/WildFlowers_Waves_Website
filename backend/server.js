// Intended path: /backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const productRoutes = require('./routes/products');
const contactRoutes = require('./routes/contact');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const adminOrderRoutes = require('./routes/adminOrders');
const adminGalleryRoutes = require('./routes/adminGallery');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// Both admin route files are mounted under /api/admin - each file defines its
// own sub-paths (e.g. /orders, /gallery), and both apply requireRole('admin') internally.
app.use('/api/admin', adminOrderRoutes);
app.use('/api/admin', adminGalleryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'wildflowers-waves-backend' });
});

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Wildflowers & Waves backend running on port ${PORT}`);
});
