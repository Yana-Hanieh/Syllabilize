import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const router = Router();
const courseController = new CourseController();

router.post('/', courseController.create);
router.get('/', courseController.getAll);


export default router