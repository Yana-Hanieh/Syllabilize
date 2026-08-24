import {Router} from 'express';
import { AuthController } from '../controllers/AuthController';
import { authentication } from '../middlewares/Authentication';

const router = Router();
const authController = new AuthController();

router.post('/login',authController.login);
router.post('/logout', authController.logout);
router.get('/me', authentication, authController.me);

export default router;