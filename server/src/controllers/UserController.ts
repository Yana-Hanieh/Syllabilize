import { Request, Response } from "express";
import { userService } from "../services/instances";

export class UserController{
    async create(req:Request, res:Response){
        const {userName,userEmail, userPassword,studentAge,classroomId,courseIds} = req.body; //takes data from the request body section
        const result = await userService.create(userName,userEmail, userPassword,studentAge,classroomId,courseIds)//saves the data in a result variable 
        return res.status(201).json(result) //returns "201" which is the standard "created" status code along with a parsed result data into json
    }
    
    async getAll(req:Request, res:Response){
        
        const page = Math.max(1,Number(req.query.page)||1);
        const limit = Math.max(1,Number(req.query.limit) ||3);
        const name = typeof req.query.name === 'string' ? req.query.name : undefined
        const result = await userService.getAll(page, limit, name);
        
        if(!result){
            return res.status(500).json({message:'Internal server error'});
        }
       return res.status(200).json(result);
    }

    async getOne(req:Request<{id:string}>, res:Response){
        const id= req.params.id;
        const result = await userService.getOne(id);
        if(!result){
            return res.status(404).json({message:'User not found'})
        }
        return res.status(200).json(result);
    }

    async update(req:Request<{id:string}>, res:Response){
        const targetId=req.params.id;
        const requester = (req as any).user; //{userId, userRole} from the token
        if (requester. userRole !== 'admin' && requester.userId !== targetId){
            return res.status(403).json({message:'You can only update your own profile'})
        }
        const {userName,studentAge,classroomId} = req.body;
        const result = await userService.update(targetId,userName,studentAge,classroomId);
         if(!result){
            return res.status(404).json({message:'Student not found'})
        }
        return res.status(200).json(result);
    }

    async delete(req:Request<{id:string}>, res:Response){
        const id =req.params.id;
        const result = await userService.delete(id);
          if (!result)
            return res.status(404).json({message:'student not found'});
        return res.status(200).json({message:'student deleted successfully'});
    }
}