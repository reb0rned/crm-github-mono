import { Router } from 'express';
import {
  addProject, 
  getProjects,
  deleteProject, 
  updateProject
} from '../controllers/projectController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/projects', authMiddleware, getProjects);
router.post('/projects', authMiddleware, addProject);
router.patch('/projects/:id', authMiddleware, updateProject);
router.delete('/projects/:id', authMiddleware, deleteProject);

export default router;