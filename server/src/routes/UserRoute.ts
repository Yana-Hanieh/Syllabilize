import { Router } from "express";
import { authentication } from '../middlewares/Authentication';
import { authorization } from '../middlewares/Authorization';
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.use(authentication) //use this since we're using authentication in every route 

router.post('/', authorization(['admin']), userController.create); //registering students, admin access only
router.get('/', authorization(['admin']), userController.getAll);
router.get('/:id', userController.getOne);
router.put('/:id',userController.update);
router.delete('/:id', authorization(['admin']), userController.delete);

export default router 