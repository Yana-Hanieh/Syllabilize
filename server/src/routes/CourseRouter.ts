import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { authentication } from "../middlewares/Authentication";
import { authorization } from "../middlewares/Authorization";

const router = Router();
const courseController = new CourseController();

router.post('/', authentication, authorization(['admin']), courseController.create);
router.get('/', authentication, courseController.getAll);
router.get('/:id', authentication, courseController.getOne);
router.put('/:id', authentication, authorization(['admin']), courseController.update);
router.delete('/:id', authentication, authorization(['admin']), courseController.delete);

export default router