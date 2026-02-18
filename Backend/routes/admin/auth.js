import express from 'express';
import {
  adminLogin,
  adminRegister,
  getAdminProfile,
  updateAdminDetails
} from '../../controllers/admin/adminAuthController.js';
import { protect, authorize } from '../../middleware/auth.js';
import { requireAdmin, requireSuperAdmin } from '../../middleware/adminAuth.js';

const adminAuthRouter = express.Router();

// Public routes
adminAuthRouter.post('/login', adminLogin);

// Protected routes
adminAuthRouter.use(protect);
adminAuthRouter.use(authorize('admin', 'superadmin'));
adminAuthRouter.use(requireAdmin);

adminAuthRouter.get('/me', getAdminProfile);
adminAuthRouter.put('/updatedetails', updateAdminDetails);

// Superadmin only routes
adminAuthRouter.post('/register', requireSuperAdmin, adminRegister);

export default adminAuthRouter;