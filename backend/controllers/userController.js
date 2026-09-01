// Intended path: /backend/controllers/userController.js
const User = require('../models/User');

// @desc    Create or update the MongoDB user profile from the Firebase-authenticated caller.
//          Called by the frontend right after Firebase sign-up/sign-in.
// @route   POST /api/users/sync
// @access  Private (valid Firebase token required, no role required yet - this is how a role gets created)
exports.syncUser = async (req, res) => {
  try {
    const { firebaseUid, email, name } = req.firebaseUser;

    // Allow the client to pass a display name override (e.g. from a sign-up form field)
    const displayName = req.body.name || name;

    // Role is never trusted from the client for existing users - only used as a
    // default the very first time a profile is created. Promote to admin manually
    // in the database (or via a separate protected admin-only endpoint).
    const requestedRole = req.body.role === 'admin' ? 'admin' : 'client';

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        $set: { name: displayName, email },
        $setOnInsert: { role: requestedRole },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing user profile', error: error.message });
  }
};

// @desc    Return the currently authenticated user's synced Mongo profile
// @route   GET /api/users/me
exports.getMe = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'No profile synced yet. Call POST /api/users/sync first.' });
  }
  res.json(req.user);
};
