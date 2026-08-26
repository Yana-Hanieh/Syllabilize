import {Router} from 'express';
import { authentication } from '../middlewares/Authentication';
import { authorization } from '../middlewares/Authorization';
import { uploadSingleImage } from '../middlewares/upload';
import { UploadController } from '../controllers/UploadController';

const router = Router();
const uploadController = new UploadController();

router.post('/upload-profile-pic', authentication, authorization(['admin','student']),uploadSingleImage, uploadController.uploadProfilePic);

export default router;