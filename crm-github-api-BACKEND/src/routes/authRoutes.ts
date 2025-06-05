import { signin, signup } from '../controllers/authController';
import { Router } from 'express';

const router = Router()

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);

export default router;