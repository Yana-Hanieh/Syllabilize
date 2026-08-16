//the interfaces that contains all the data variables and their types that will be used when writing the data in the db 
export interface Student{
    studentId: number;
    studentName: string;
    studentAge: number;
    classroomId: number; //foreign key from classroom interface 
    courseList: number[];
}
