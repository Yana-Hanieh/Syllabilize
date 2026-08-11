export interface Classroom{
    classroomId: number;
    classroomName: string;
    studentList: number[]; //an array of student IDs instead of storing full student objects
}