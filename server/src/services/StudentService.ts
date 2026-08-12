import { Student } from "../interfaces/Student";
import { ClassroomService } from "./ClassroomService";

export class StudentService{
    private students: Student[] = [];
    private nextStudentId = 1;
    private classroomService: ClassroomService; //stores the injected ClassroomService instance so this class can use it.

    //since studentService is dependant on classroomService (student useses data from classroom) we use a constructor
    constructor(classroomService: ClassroomService){ //special method that runs automatically when new StudentService() is called
        this.classroomService= classroomService //assigned the dependency here
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

    update(stdId:number, newName: string, newAge: number, newClassroomId: number): Student | null{
        const foundStudent = this.students.find(s=> s.studentId === stdId ) //takes the student where the id matches
        if(!foundStudent){ //if no student was found
            return null
        }
        foundStudent.studentName= newName //changes the name of the found student directly on the object
        foundStudent.age= newAge // changes the age of the found student on the object
        const oldClassroomId = foundStudent.classroomId //saves the classid of the student before it gets overwritten

        if(oldClassroomId !== newClassroomId){ //checks if the old classid is the same as the new one (if the id was changed or not)
            const oldClassroom =  this.classroomService.getOne(oldClassroomId) //the actual classroom object, it gets the classroom id from the classroom service, getOne is called since we want to only view one classroom
            if (oldClassroom){ //safety guard, in case the old classroom doesnt match any real classroom 
               oldClassroom.studentList = oldClassroom.studentList.filter(id => id !== stdId) //removes the studentList of the student id from the oldclassroom where the id matches the student id
            }
            const newClassroom = this.classroomService.getOne(newClassroomId) //the new classroom object, it gets the new classroom id 
            if (newClassroom){ //safety guard, in case the old classroom doesnt match any real classroom
                newClassroom.studentList.push(stdId) //push the studentid into the student list of the classroom (rebuilds studentList excluding the student's id)
            }     
            foundStudent.classroomId = newClassroomId //change the roomId of the found student directly on the object
        }
        return foundStudent;
    }

    delete(id:number): boolean{
        const index = this.students.findIndex(s => s.studentId === id)
        if(index === -1){
            return false
        }
        const foundStudent = this.students[index]
        const classroomId = foundStudent.classroomId
        const oldClassroom = this.classroomService.getOne(classroomId)
        if (oldClassroom){
            oldClassroom.studentList = oldClassroom.studentList.filter(studentId => studentId !== id)
        }
        this.students.splice(index,1);
        return true;
    }
}