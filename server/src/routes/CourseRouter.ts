import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const router = Router();
const courseController = new CourseController();

router.post('/', courseController.create);
router.get('/', courseController.getAll);
router.get('/:id', courseController.getOne);


export default router