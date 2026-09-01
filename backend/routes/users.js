// Intended path: /backend/routes/users.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { syncUser, getMe } = require('../controllers/userController');

router.post('/sync', requireAuth, syncUser);
router.get('/me', requireAuth, getMe);

module.exports = router;
