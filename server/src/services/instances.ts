//this file contains all the instances that are used accross the project, to ensure no duplicates occur
import { ClassroomService } from "./ClassroomService";
import { CourseService } from "./CourseService";
import { UserService } from "./UserService";
import { AuthService } from "./AuthService";
import { UploadService } from "./uploadService";

export const classroomService = new ClassroomService(); //creating a classroomService instance which will be used in the classroom and the student controller files
export const courseService = new CourseService();
export const userService = new UserService();
export const authService = new AuthService();
export const uploadService = new UploadService();

