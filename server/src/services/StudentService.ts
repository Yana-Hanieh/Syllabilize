import { Student } from "../models/Student";

export class StudentService{

    async create(studentName: string, age: number, classroomId: number, courseIds?: number[]): Promise<Student>{
        const newStudent = await Student.create( {studentName:studentName, studentAge:age, classroomId:classroomId}) //create and insert the new student record into the database
        if (courseIds?.length){ //if an array of courseIds was provided and contains elements, sync the junction table
            await (newStudent as any).setCourses(courseIds); //.setCourses() is a sequelize generated method that syncs the junction table by overwriting the existing associations
        }
        return newStudent;
    }

    async getAll(): Promise<Student[]>{
        return await Student.findAll(); //fetches all students and performs a Join
    }

    async getOne(id:number){
        return await Student.findByPk(id); //fetches the student with the same id using the pk
    }

    async update(stdId:number, newName: string, newAge: number, newClassroomId: number): Promise<Student | null>{
        const foundStudent = await Student.findByPk(stdId) //takes and stores the student where the student id matches
        if(!foundStudent){ //if no student was found
            return null
        }
        foundStudent.studentName= newName //changes the name of the found student directly on the object
        foundStudent.studentAge= newAge //changes the age of the found student on the object
        foundStudent.classroomId = newClassroomId //changes the classroom id of the found student on the object
        await foundStudent.save() //save the changes done to the DB
        return foundStudent;
    }

    async delete(id:number): Promise<boolean>{
        const foundStudent = await Student.findByPk(id) //find the student based on matched id and save it in var
        if(!foundStudent){ //if no student matched the id return false
            return false
        }
        await foundStudent.destroy(); //delete the student record from the database
        return true;
    }
}