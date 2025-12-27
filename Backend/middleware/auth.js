import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if it's an admin token or user token based on the token type
      if (decoded.type === 'admin') {
        // Admin authentication
        req.admin = await Admin.findById(decoded.id).select('-password');
        if (!req.admin) {
          return res.status(401).json({
            success: false,
            message: 'Admin not found'
          });
        }
      } else {
        // User authentication
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
          return res.status(401).json({
            success: false,
            message: 'User not found'
          });
        }
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error in authentication',
      error: error.message
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check for admin authorization
    if (req.admin) {
      if (!roles.includes(req.admin.role)) {
        return res.status(403).json({
          success: false,
          message: `Admin role ${req.admin.role} is not authorized to access this route`
        });
      }
      return next();
    }

    // Check for user authorization (if needed)
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role ${req.user.role} is not authorized to access this route`
        });
      }
    }

    next();
  };
};

export { protect, authorize };