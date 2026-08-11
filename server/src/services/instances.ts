//this file contains all the instances that are used accross the project, to ensure no duplicates occur
import { ClassroomService } from "./ClassroomService";

export const classroomService = new ClassroomService(); //creating a classroomService instance which will be used in the classroom and the student controller files
