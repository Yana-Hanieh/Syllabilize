import { Request, Response } from 'express';
import { uploadService } from '../services/instances';

export class UploadController {
  async uploadProfilePic(req: Request, res: Response) {
    if (!req.file) { //ensures that MUlter successfully parsed and attached a file to the request
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    const requester = (req as any).user; //extract user details attached auth middleware
    try {
      const imageUrl = await uploadService.uploadProfilePic(requester.userId, req.file); //pass the user ID and file 
      return res.status(200).json({ message: 'Upload successful', imageUrl });
    }catch (error) {
  console.error('Cloudinary upload error:', error); // temporary - shows the real cause in your terminal
  return res.status(500).json({ message: 'Cloudinary upload failed' });
}
  }
}