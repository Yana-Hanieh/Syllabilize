import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { authentication } from "../middlewares/Authentication";
import { authorization } from "../middlewares/Authorization";

const router = Router();
const courseController = new CourseController();

router.use(authentication) //use this since we're using authentication in every route 

router.post('/', authorization(['admin']), courseController.create);
router.get('/', courseController.getAll);
router.get('/:id', courseController.getOne);
router.put('/:id', authorization(['admin']), courseController.update);
router.delete('/:id', authorization(['admin']), courseController.delete);

export default router