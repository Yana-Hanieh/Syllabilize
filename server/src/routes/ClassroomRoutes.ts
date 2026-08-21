import { Router } from "express";
import { ClassroomController } from "../controllers/ClassroomController";
import { authentication } from "../middlewares/Authentication";
import { authorization } from "../middlewares/Authorization";

const router = Router();
const classroomController = new ClassroomController();

router.use(authentication) //use this since we're using authentication in every route 

router.post('/', authorization(['admin']), classroomController.create); //calls the create function from the classroom controller
router.get('/', classroomController.getAll); //calls the getAll function from the classroom controller
router.get('/:id', classroomController.getOne); //calls the getOne function from the classroom controller to display one classroom based on the selected id
router.put('/:id', authorization(['admin']), classroomController.update); //calls the update function from the classroom controller to update the data of one classroom based on the selected id
router.delete('/:id', authorization(['admin']), classroomController.delete); //calls the delete function from the classroom controller to delete the data of one classroom based on the selected id

export default router;