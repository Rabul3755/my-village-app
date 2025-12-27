import Admin from "../models/Admin.js";

// @desc    Advanced admin authorization
// @route   All admin routes
// @access  Private
const requireAdmin = async (req, res, next) => {
  try {
    // Check if admin exists and is active
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found'
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Admin account is deactivated'
      });
    }

    // Attach full admin object to request
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized as admin'
    });
  }
};

// @desc    Check admin permissions for sensitive operations
// @route   Sensitive admin routes
// @access  Private
const requireSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Superadmin access required for this operation'
    });
  }
  next();
};

// @desc    Log admin actions for audit
// @route   All admin routes
// @access  Private
const logAdminAction = (action) => {
  return (req, res, next) => {
    console.log(`Admin Action: ${req.admin.name} (${req.admin.role}) - ${action} - ${new Date().toISOString()}`);
    next();
  };
};

export { logAdminAction, requireAdmin, requireSuperAdmin };