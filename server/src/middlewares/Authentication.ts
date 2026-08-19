import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authentication(req:Request, res:Response, next:NextFunction){ //the middleware function which gets called directly on every request
    const authHeader = req.headers.authorization; //saves the header 'Bearer oifhv' or undefined. Bearer prefix is used to indicate that whoever holds/bears this token is authenticated
    //req.headers is an obj containing http headers .authorization accesses the authorization property if it was added by the client
    if (!authHeader || !authHeader.startsWith('Bearer ')) { //checks if the header doesnt start with Bearer, .startsWith returns a boolean value only (true or false) 
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1]; //splits the string into ["Bearer", "oidjcn"], grab index 1
    //we split them since jwt.verify would fail if we keep Bearer in the header
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = verified //attach decoded {userID, userRole} to the request
        next() //pass control to the actual route handler, no response is sent here
    }
    catch(error) {
       return res.status(401).json({message:'Authentication failed'})  
    }
}