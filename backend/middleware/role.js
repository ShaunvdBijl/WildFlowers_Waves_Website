// Intended path: /backend/middleware/role.js
//
// Usage: router.get('/admin/orders', requireAuth, requireRole('admin'), handler)
// Must run AFTER requireAuth, since it relies on req.user being populated.

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: 'No synced user profile found. Call /api/users/sync first.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }

    next();
  };
}

module.exports = requireRole;
