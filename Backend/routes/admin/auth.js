import express from 'express';
import {
  adminLogin,
  adminRegister,
  getAdminProfile,
  updateAdminDetails
} from '../../controllers/admin/adminAuthController.js';
import { protect, authorize } from '../../middleware/auth.js';
import { requireAdmin, requireSuperAdmin } from '../../middleware/adminAuth.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/login', adminLogin);

// Protected routes
authRouter.use(protect);
authRouter.use(authorize('admin', 'superadmin'));
authRouter.use(requireAdmin);

authRouter.get('/me', getAdminProfile);
authRouter.put('/updatedetails', updateAdminDetails);

// Superadmin only routes
authRouter.post('/register', requireSuperAdmin, adminRegister);

export default authRouter;