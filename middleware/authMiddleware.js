// middleware/authMiddleware.js
const { createCustomError } = require('../utils/customError');

const isAdmin = (req, res, next) => {
  const user = req.user; // Assuming you attach the user object to the request during authentication
  if (user.role !== 'Admin') {
    return next(createCustomError('Unauthorized: Admin access required', 403));
  }
  next();
};

module.exports = { isAdmin };
