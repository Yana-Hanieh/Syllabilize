import { off } from "process";
import { Course } from "../models/Course";
import { Student } from "../models/Student";

export class CourseService{

    async create ( name: string, studentIds?: number[]): Promise<Course>{
        const newCourse = await Course.create({courseName:name}); //create and insert a new course record into the DB
       if (studentIds?.length){ //if an array of studentIds was provided and contains elements, sync the junction table
        await (newCourse as any).setStudents(studentIds); //.setStudents() is a sequelize generated method that syncs the junction table by overwriting the existing associations
       }
        return newCourse;
    }

    async getAll(page:number = 1, limit: number = 3){
        const offset = (page-1) * limit;
        const {count, rows} = await Course.findAndCountAll({
            limit: limit, 
            offset: offset,
        });
        return {
            totalItems: count, 
            totalPages:Math.ceil(count / limit),
            currentPage: page, 
            courses: rows
        }; //fetches all courses and performs a Join to include related student records
    }

    async getOne(id:number): Promise<Course | null>{ 
        return await Course.findByPk(id,{include:Student}) //searches for a course by its pk and joins the asssociated student data
    }

    async update(cId:number, newName:string, newStudentId: number[]): Promise<Course | null>{
       const foundCourse = await Course.findByPk(cId) //finding course based on matched id (which is the pk)
       if (!foundCourse){ //if no course matching the id was found return null
            return null
       }
       foundCourse.courseName = newName; //change the name of the course directly (locally) on the foundcourse object

       await foundCourse.save(); //save the changes done to the DB
       await (foundCourse as any).setStudents(newStudentId) //sync the junction table to show the new set of associated student Ids
       return foundCourse; 
    }

    async delete(id:number): Promise<boolean> {
        const foundCourse =await Course.findByPk(id) //searches for the course based on matching pk (id)
        if (!foundCourse) //if no course is matched return false 
            return false 
        await foundCourse.destroy() //(cascade: from our migration files ) delete the course record from the DB. //Note: CASCADE constraint on foreign keys will automatically clean up junction table entries 
           return true;
    }

}