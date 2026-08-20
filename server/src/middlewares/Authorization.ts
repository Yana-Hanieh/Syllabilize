import { Response, Request, NextFunction } from "express";

export function authorization(allowedRoles: string[]){ //a function which is called only once with our specific configuration (role when its an "admin")
    return (req:Request, res:Response, next:NextFunction) =>{ //we use an arrow function here since it produces a middleware
        const user = (req as any).user; //saves the request.user in a user variable

        if(!user){ //if no user is available return a 401 status error
            return res.status(401).json({message: 'No token provided'})
        }

        if(!allowedRoles.includes(user.userRole)){ //if the userRole is not an admin return 403 status error
            return res.status(403).json({message:'Forbidden: you are not authorized for this action'})
        }
        
            next();
    }
}