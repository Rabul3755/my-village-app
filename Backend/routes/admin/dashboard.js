import express from "express";
import {
  getDashboardStats,
  getRecentActivity,
  getSystemHealth
} from '../../controllers/admin/adminController.js';
import { protect, authorize } from '../../middleware/auth.js';
import { requireAdmin } from '../../middleware/adminAuth.js';

const dashboardRouter = express.Router();

dashboardRouter.use(protect);
dashboardRouter.use(authorize('admin', 'superadmin'));
dashboardRouter.use(requireAdmin);

dashboardRouter.get('/stats', getDashboardStats);
dashboardRouter.get('/recent-activity', getRecentActivity);
dashboardRouter.get('/system-health', getSystemHealth);

export default dashboardRouter;