import { Request,Response } from "express";
import { authService } from '../services/instances';

export class AuthController{
    async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const token = await authService.login(email,password)
            
            res.cookie('token',token,{
                httpOnly:true, //js on the frontend can never read this cookie 
                secure:process.env.NODE_ENV === 'production', //only requires https when in production/development environment
                //if secure: true then sends the cookie to an encrypted https connection not a plain http, this prevents the cookie from being visible to anyone on an unencrypted connection
                sameSite: 'strict', //cookie only sent for rewuests originating from our own site only
                maxAge: 24 * 60 * 60 * 1000, //1hr that matches the JWT expired in (always in millisec)
            });

            return res.status(200).json({token:token})
        }
        catch(error:any){
                return res.status(401).json({message: error.message})        
        }
    }
}