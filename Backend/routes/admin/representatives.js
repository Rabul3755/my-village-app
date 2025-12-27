import express from 'express';
import {
  getAdminRepresentatives,
  createRepresentative,
  updateRepresentative,
  deleteRepresentative,
  toggleRepresentativeActive,
  getRepresentativeStats
} from '../../controllers/admin/representativeManagement.js';
import { protect, authorize }from '../../middleware/auth.js';
import { requireAdmin, logAdminAction } from '../../middleware/adminAuth.js';

const AdminRepresentativesouter = express.Router();

// Protect all routes
AdminRepresentativesouter.use(protect);
AdminRepresentativesouter.use(authorize('admin', 'superadmin'));
AdminRepresentativesouter.use(requireAdmin);

AdminRepresentativesouter.get('/', logAdminAction('View representatives'), getAdminRepresentatives);
AdminRepresentativesouter.get('/stats', logAdminAction('View representative stats'), getRepresentativeStats);
AdminRepresentativesouter.post('/', logAdminAction('Create representative'), createRepresentative);
AdminRepresentativesouter.put('/:id', logAdminAction('Update representative'), updateRepresentative);
AdminRepresentativesouter.delete('/:id', logAdminAction('Delete representative'), deleteRepresentative);
AdminRepresentativesouter.patch('/:id/toggle-active', logAdminAction('Toggle representative active'), toggleRepresentativeActive);

export default AdminRepresentativesouter;