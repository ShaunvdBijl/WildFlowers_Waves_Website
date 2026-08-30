// Intended path: /backend/middleware/auth.js
//
// Expects: Authorization: Bearer <Firebase ID token>
// On success, attaches { firebaseUid, email, name } to req.firebaseUser, and the
// matching MongoDB user document (if one exists yet) to req.user.

const admin = require('../config/firebase');
const User = require('../models/User');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Missing or malformed Authorization header.' });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    req.firebaseUser = {
      firebaseUid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email,
    };

    // Attach the synced Mongo profile, if it already exists (it may not yet,
    // e.g. on the very first call right after sign-up before /users/sync runs)
    req.user = await User.findOne({ firebaseUid: decoded.uid });

    next();
  } catch (error) {
    console.error('Auth verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
}

module.exports = requireAuth;
