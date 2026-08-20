import { Router } from "express";
import { authentication } from '../middlewares/Authentication';
import { authorization } from '../middlewares/Authorization';
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post('/', authentication, authorization(['admin']), userController.create); //registering students, admin access only
router.get('/', authentication, authorization(['admin']), userController.getAll);
router.get('/:id', authentication, userController.getOne);
router.put('/:id', authentication, userController.update);
router.delete('/:id', authentication, authorization(['admin']), userController.delete);

export default router 