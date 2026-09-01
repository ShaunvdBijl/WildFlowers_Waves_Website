// Intended path: /backend/routes/admin-gallery.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const {
  createGalleryItem,
  getGalleryItems,
  deleteGalleryItem,
} = require('../controllers/adminGalleryController');

router.post('/gallery', requireAuth, requireRole('admin'), createGalleryItem);
router.get('/gallery', requireAuth, requireRole('admin'), getGalleryItems);
router.delete('/gallery/:id', requireAuth, requireRole('admin'), deleteGalleryItem);

module.exports = router;
