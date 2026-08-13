//this file is used to declare the associations between different classes 
//this file run once at startup and its effict is permanent for the life of the process
import { Classroom } from "./Classroom";
import { Student } from "./Student";

//a one-to-one relationship needs 2 declarations one from each side
Classroom.hasMany(Student,{foreignKey:'classroomId'})
Student.belongsTo(Classroom,{foreignKey:'classroomId'})