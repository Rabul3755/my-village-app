import express from 'express';
import {
  getAdminLeaders,
  createLeader,
  updateLeader,
  deleteLeader,
  toggleLeaderActive,
  bulkDeleteLeaders
} from'../../controllers/admin/leaderManagement.js';
import { protect, authorize } from '../../middleware/auth.js';
import { requireAdmin, logAdminAction }from '../../middleware/adminAuth.js';

const adminLeaderRouter = express.Router();

// Protect all routes
 adminLeaderRouter.use(protect);
 adminLeaderRouter.use(authorize('admin', 'superadmin'));
 adminLeaderRouter.use(requireAdmin);

 adminLeaderRouter.get('/', logAdminAction('View leaders'), getAdminLeaders);
 adminLeaderRouter.post('/', logAdminAction('Create leader'), createLeader);
 adminLeaderRouter.put('/:id', logAdminAction('Update leader'), updateLeader);
 adminLeaderRouter.delete('/:id', logAdminAction('Delete leader'), deleteLeader);
 adminLeaderRouter.patch('/:id/toggle-active', logAdminAction('Toggle leader active'), toggleLeaderActive);
 adminLeaderRouter.delete('/bulk/delete', logAdminAction('Bulk delete leaders'), bulkDeleteLeaders);

export default  adminLeaderRouter;