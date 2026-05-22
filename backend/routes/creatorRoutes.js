import express from 'express';
import * as creatorController from '../controllers/creatorController.js';
import * as adminController from '../controllers/adminController.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Creator routes
router.post('/submit-request', authenticate, creatorController.submitCreatorRequest);
router.get('/my-request', authenticate, creatorController.getMyRequest);

// Admin routes
router.get('/requests/pending', authenticate, requireRole(['admin']), creatorController.getPendingRequests);
router.get('/requests/all', authenticate, requireRole(['admin']), creatorController.getAllRequests);
router.post('/requests/:id/approve', authenticate, requireRole(['admin']), creatorController.approveRequest);
router.post('/requests/:id/reject', authenticate, requireRole(['admin']), creatorController.rejectRequest);

// User management routes (Admin only)
router.get('/admin/users', authenticate, requireRole(['admin']), adminController.getAllUsers);
router.get('/admin/users/:id', authenticate, requireRole(['admin']), adminController.getUserById);

export default router;
