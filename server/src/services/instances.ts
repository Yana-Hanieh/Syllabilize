//this file contains all the instances that are used accross the project, to ensure no duplicates occur
import { ClassroomService } from "./ClassroomService";
import { CourseService } from "./CourseService";
import { StudentService } from "./StudentService";

export const classroomService = new ClassroomService(); //creating a classroomService instance which will be used in the classroom and the student controller files
export const studentService = new StudentService(classroomService);
export const courseService = new CourseService();

studentService.setCourseService(courseService);
courseService.setStudentService(studentService);
