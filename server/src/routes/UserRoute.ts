import { Router } from "express";
import { authentication } from '../middlewares/Authentication';
import { authorization } from '../middlewares/Authorization';
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post('/', authentication, authorization(['admin']), userController.create); //registering students, admin access only
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router 