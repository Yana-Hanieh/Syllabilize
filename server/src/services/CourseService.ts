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
        const newCourse : Course= {courseId: this.nextCourseId++, courseName: name, studentsId: stdId ?? []} //if stdId is undefined/null, default to empty array
        this.courses.push(newCourse)
        return newCourse
    }

    getAll(): Course[]{
        return [...this.courses]
    }

    getOne(id:number): Course | null{
        const foundCourse = this.courses.find(c => c.courseId === id)
        if (!foundCourse){
            return null
        }
        return foundCourse
    }

    update(cId:number, newName:string, newStudentId: number[]): Course | null{
       const foundCourse = this.courses.find(c => c.courseId === cId) //finding course based on matched id
       if (!foundCourse){
            return null
       }
       foundCourse.courseName = newName; //change the name of the course directly on the foundcourse object

       const oldStudentsId = foundCourse.studentsId //saves the current list of students before overwriting it
       const removedStudents = oldStudentsId.filter(sid=> !newStudentId.includes(sid)) //saves the list of students where the oldStudentId doesnt matche the newStudentId => removed students
       const addedStudents = newStudentId.filter(sid => !oldStudentsId?.includes(sid)) //saves the list of students where the newstudentId doesnt match the oldStudentId => added students

       removedStudents.forEach(studentId => { //loops around the removed student array and checks each std id
        const student = this.studentService.getOne(studentId); //looks up the whole student object for the id and saves it
        if (student){ //safety guard in case student id doesnt match a real student
            student.courseList = student.courseList.filter(c => c !==cId); //removes the course's id from the student courseList
        }
       });

       addedStudents.forEach(studentId => { //loops around the added student array and checks each std id
        const student = this.studentService.getOne(studentId); //saves each student into a student array
        if(student){
            student.courseList.push(cId); //if there is an added student, then add it to the course list
        }        
       });

       foundCourse.studentsId = newStudentId; //replaces the course's studentsId with a new list
       return foundCourse; 
    }

    delete(id:number): boolean {
        const index = this.courses.findIndex(c => c.courseId === id)
        if (index === -1){
            return false
        }
        const foundCourse = this.courses[index]

        foundCourse.studentsId.forEach(studentsId => {
            const student = this.studentService.getOne(studentsId);
            if (student){
                student.courseList = student.courseList.filter(c => c !==id)
            }
        });
        this.courses.splice(index,1);
        return true;
    }

}