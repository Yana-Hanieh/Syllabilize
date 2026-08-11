import { Router } from "express";
import { StudentController } from "../controllers/StudentControllers";

const router = Router();
const studentController = new StudentController();

router.post('/', studentController.create);
router.get('/', studentController.getAll);
router.get('/:id', studentController.getOne);


export default router 