export interface Course{
    courseId: number;
    courseName: string;
    studentsId: number[]; //foreign key from the student interface
}