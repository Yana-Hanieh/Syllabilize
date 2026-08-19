import { Request,Response } from "express";
import { authService } from '../services/instances';

export class AuthController{
    async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const result = await authService.login(email,password)
            return res.status(200).json({token:result})
        }
        catch(error){
                return res.status(401).json({message:'Invalid credentials'})        
        }
    }
}