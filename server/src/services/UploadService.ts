import cloudinary from '../config/cloudinary';
import { User } from '../models/Users';

export class UploadService{ 
    async uploadProfilePic(userId:string, file: Express.Multer.File){
        const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
       
        const result = await cloudinary.uploader.upload(fileBase64,{folder:'profile_pictures'}); //upload the picture to cloudinary
        await User.update({profilePicUrl:result.secure_url},{where:{userId}});
        return result.secure_url;
       
    }   
}