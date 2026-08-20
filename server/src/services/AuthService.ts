import { User } from "../models/Users"; //import User to use the email, password and userId 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService{
    async login(email:string, password:string): Promise<string>{
        const user = await User.findOne({where:{userEmail:email}}) //lets you search by any column, not only the primary key
        if (!user){ //if no matching user record is found, abort the authentication
            throw new Error('Invalid credentails')
        }
        const passwordMatched = await bcrypt.compare(password, user.userPassword) //compares between the hashed password (saved in the db) and the entered password

        if(!passwordMatched){ //if the password comparison fails reject authentication
            throw new Error('Invalid credentails')
        }
     
        const token = jwt.sign( //generate a signed JWT (json web token) containing essential user details
            {userId: user.userId, userRole:user.userRole}, //payload claims attached to the token
            process.env.JWT_SECRET as string, //secret key thats loaded from .env
            {expiresIn:'24h'} //set token expiration to 1 hr
        );

        return token;
    }

    //there will be no logout endpoint, since the logout happens in the frontend 
    //in other endpoints we used .destroy(), we cant use it here since that would cause the user to be deleted not just logged out
}