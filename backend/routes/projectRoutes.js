import express from 'express';
import * as projectController from '../controllers/projectController.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/creator/my-projects', authenticate, projectController.getCreatorProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', authenticate, requireRole(['creator']), projectController.uploadProject);
router.post('/:id/upvote', authenticate, projectController.upvoteProject);
router.put('/:id', authenticate, projectController.updateProject);
router.delete('/:id', authenticate, projectController.deleteProject);

export default router;
