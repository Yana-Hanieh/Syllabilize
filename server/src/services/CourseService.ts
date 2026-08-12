import { Course } from "../interfaces/Course";
import { StudentService } from "./StudentService";

export class CourseService{
    private courses: Course[] = [];
    private nextCourseId = 1;
    private studentService!: StudentService; //the definite assignemnt assertion (!) operator is used to ensure typscript that it will be assigned a value later as it only declares it

    setStudentService(studentService: StudentService){
        this.studentService = studentService;
    }

    create ( name: string, stdId: number[]): Course{
        const newCourse : Course= {courseId: this.nextCourseId++, courseName: name, studentsId: stdId}
        this.courses.push(newCourse)
        return newCourse
    }

    getAll(): Course[]{
        return [...this.courses]
    }

    


}