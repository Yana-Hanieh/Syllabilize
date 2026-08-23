import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authentication(req:Request, res:Response, next:NextFunction){ //the middleware function which gets called directly on every request
    const token = req.cookies?.token; //read the token from the cookie instead on an authentication header
    if (!token) { //checks if theres a token (valid cookie) 
        return res.status(401).json({message: 'No token provided'});
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = verified //attach decoded {userID, userRole} to the request
        next() //pass control to the actual route handler, no response is sent here
    }
    catch(error) {
       return res.status(401).json({message:'Authentication failed'})  
    }
}