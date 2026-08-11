import { Student } from "../interfaces/Student";
import { ClassroomService } from "./ClassroomService";

export class StudentService{
    private students: Student[] = [];
    private nextStudentId=1;
    private classroomService: ClassroomService;

    constructor(classroomService: ClassroomService){ //special method that runs automatically when new studentservice runs git 
        this.classroomService= classroomService
    }

    create(studentName: string, age: number, classroomId: number, courseList: number[]): Student | null{
        const newStudent: Student = {studentId:this.nextStudentId++, studentName:studentName, age:age, classroomId:classroomId, courseList:courseList}
        this.students.push(newStudent)
        return newStudent
    }

    getAll(): Student[]{
        return [...this.students]
    }

    getOne(id:number){
        const foundStudent = this.students.find(c => c.studentId === id)
        if (!foundStudent){
            return null;
        }
        return foundStudent;
    }
}