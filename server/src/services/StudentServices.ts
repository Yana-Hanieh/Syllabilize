import { Student } from "../interfaces/Student";
import { ClassroomService } from "./ClassroomService";

export class StudentServices{
    private students: Student[] = [];
    private nextStudentId=1;
    private classroomService: ClassroomService;

    constructor(classroomService: ClassroomService){ //special method that runs automatically when new studentservice runsgit 
        this.classroomService= classroomService
    }

    create(studentId: number, studentName: string, age: number, classroomId: number, courseList: number[]){

    }
}