import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface CourseAttribute{
    courseId: number; 
    courseName: string;
}

interface CourseCreationAttributes extends Optional<CourseAttribute, 'courseId'> {}

export class Course extends Model <CourseAttribute, CourseCreationAttributes> implements CourseAttribute{
    public courseId!: number;
    public courseName!: string;
}

Course.init(
    {
        courseId:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        courseName:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize, 
        tableName:'Courses',
    }
)