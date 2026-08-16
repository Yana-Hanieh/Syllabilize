import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface StudentCoursesAttributes{
    studentCourseId:number;
    studentId: number;
    classroomId:number;
}

interface StudentCoursesCreationAttributes extends Optional<StudentCoursesAttributes, 'studentCourseId'>{}

export class StudentCourses extends Model <StudentCoursesAttributes, StudentCoursesCreationAttributes> implements StudentCoursesAttributes{
    public studentCourseId!:number;
    public studentId!: number;
    public classroomId!:number;
}

StudentCourses.init(
    {
        studentCourseId:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        studentId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        classroomId:{
                type:DataTypes.INTEGER, 
                allowNull:false, 
        },
    }, 
    {
        sequelize, 
        tableName:'Students'
    }
)
