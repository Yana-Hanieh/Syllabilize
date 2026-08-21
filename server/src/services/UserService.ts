import { User } from "../models/Users";
import bcrypt from 'bcrypt';
import { Op } from "sequelize"; //import the "operators" toolkit from sequelize thats used for building comparison conditions in queries (greater than, less than, between) used for rnages

export class UserService{

    private async generateStudentId(): Promise<number>{
        const currentYear = new Date().getFullYear();
        console.log(`${currentYear}`);
        const yearPrefix = currentYear.toString(); //converts the current year to a string for concatenation

        const lastStudent = await User.findOne({ //finds user whose stdId is between year(0000 and 9999)
            where: {
                studentId:{
                    [Op.gte]: Number(`${yearPrefix}0000`), //checks if the user has greater than or equal year0000
                    [Op.lte]: Number(`${yearPrefix}9999`), //checks if the user has less than or equal year9999
                }
            },
            order: [['studentId', 'DESC']],
        });

        let nextSequence = 1; //initialize sequence to 1 in case there is no student in the year
        if(lastStudent && lastStudent.studentId){ //checks if there is a user in that year
            const lastSequence = Number(lastStudent.studentId.toString().slice(4)); //removes the first 4 numbers of the id which are reserved for the year
            nextSequence = lastSequence + 1; //increements the lastSequence so the next student gets a different id
        }
        const paddedSequecne = nextSequence.toString().padStart(4,'0'); //padStart ensures the sequence is always exactly 4 digits (4 digits built-in year + added sequence)
        return Number (`${yearPrefix}${paddedSequecne}`); //returns the full studentId as a number
    }

    async create(userName: string, userEmail: string, userPassword:string, studentAge: number, classroomId: number, courseIds?: number[]): Promise<User>{
        const hashedPassword = await bcrypt.hash(userPassword,10);
        const studentId= await this.generateStudentId(); //invokes the generateStudentId function to generate a new id
        const newStudent = await User.create( {userName, userEmail, userPassword:hashedPassword,studentAge,classroomId, userRole:'student', studentId}); //the password has to be hashed before saving
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