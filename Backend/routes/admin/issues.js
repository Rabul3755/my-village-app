import express from "express"
import { getAdminIssues,
  bulkUpdateIssueStatus,
  bulkDeleteIssues} from "../../controllers/admin/issueManagement.js"
import { protect, authorize } from "../../middleware/auth.js"
import { requireAdmin, logAdminAction } from "../../middleware/adminAuth.js"

const adminRouter = express.Router();

// Protect all routes
adminRouter.use(protect);
adminRouter.use(authorize('admin', 'superadmin'));
adminRouter.use(requireAdmin);

adminRouter.get('/', logAdminAction('View issues'), getAdminIssues);
adminRouter.patch('/bulk-status', logAdminAction('Bulk update issue status'), bulkUpdateIssueStatus);
adminRouter.delete('/bulk-delete', logAdminAction('Bulk delete issues'), bulkDeleteIssues);

export default adminRouter;