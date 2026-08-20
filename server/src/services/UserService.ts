import { User } from "../models/Users";
import bcrypt from 'bcrypt';

export class UserService{

    async create(userName: string, userEmail: string, userPassword:string, studentAge: number, classroomId: number, courseIds?: number[]): Promise<User>{
        const hashedPassword = await bcrypt.hash(userPassword,10);
        const newStudent = await User.create( {userName, userEmail, userPassword:hashedPassword,studentAge,classroomId, userRole:'student'}); //the password has to be hashed before saving
        //create and insert the new student record into the database
        if (courseIds?.length){ //if an array of courseIdsawas provided and contains elements, sync the junction table
            await (newStudent as any).setCourses(courseIds); //.setCourses() is a sequelize generated method that syncs the junction table by overwriting the existing associations
        }
        return newStudent;
    }

    async getAll(page:number = 1, limit: number = 3){
        const offset = (page-1) * limit;
        const {count, rows} = await User.findAndCountAll({limit, offset});
        return {
            totalItems: count, 
            totalPages:Math.ceil(count / limit),
            currentPage: page, 
            students: rows
        };
    }

    async getOne(id:string): Promise<User | null>{
        return await User.findByPk(id); //fetches the student with the same id using the pk
    }

    async update(userId:string, newName: string, newAge: number, newClassroomId: number): Promise<User | null>{
        const foundUser = await User.findByPk(userId) //takes and stores the student where the student id matches
        if(!foundUser){ //if no student was found
            return null
        }
        
        if(newName){
            foundUser.userName= newName //changes the name of the found student directly on the object
            await foundUser.save() //save the changes done to the DB
        }
         if(newAge !== undefined){
            foundUser.studentAge= newAge //changes the studentAge of the found user on the object
            await foundUser.save() //save the changes done to the DB
        }
         if(newClassroomId !== undefined){
            foundUser.classroomId = newClassroomId //changes the classroom id of the found student on the object
            await foundUser.save() //save the changes done to the DB
        }

     return foundUser;
    }

    async delete(userId:string): Promise<boolean>{
        const foundUser = await User.findByPk(userId) //find the student based on matched id and save it in var
        if(!foundUser){ //if no student matched the id return false
            return false
        }
        await foundUser.destroy(); //delete the student record from the database
        return true;
    }

    //enroll in class
}