import multer from 'multer';
const storage = multer.memoryStorage(); //use memory storage so files arent saved to local disk, but stored temporarily in RAM
export const uploadSingleImage = multer({ //export the middleware configured for single file uploads
    storage,
    limits: { fileSize: 5 * 1024 * 1024}, //limit the pic size to 5MB
}).single('image'); //the 'image' is the field name expected in FormData