import express from 'express';
import {
  getPlatformAnalytics,
  getEngagementAnalytics,
  exportAnalyticsData
} from '../../controllers/admin/analyticsController.js';
import { protect, authorize } from'../../middleware/auth.js';
import { requireAdmin, logAdminAction } from '../../middleware/adminAuth.js';

const adminAnalyticsRouter = express.Router();

adminAnalyticsRouter.use(protect);
adminAnalyticsRouter.use(authorize('admin', 'superadmin'));
adminAnalyticsRouter.use(requireAdmin);

adminAnalyticsRouter.get('/overview', logAdminAction('View platform analytics'), getPlatformAnalytics);
adminAnalyticsRouter.get('/engagement', logAdminAction('View engagement analytics'), getEngagementAnalytics);
adminAnalyticsRouter.get('/export', logAdminAction('Export analytics data'), exportAnalyticsData);

export default adminAnalyticsRouter;