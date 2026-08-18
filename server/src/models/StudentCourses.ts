import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export class StudentCourses extends Model {}

StudentCourses.init(
    {
        studentId:{
            type: DataTypes.INTEGER,
            primaryKey:true,
        },
        courseId:{
            type:DataTypes.INTEGER, 
            primaryKey:true, 
        },
    }, 

    {
        sequelize, 
        tableName:'StudentCourses',
        timestamps:true, //since the migration tables included date created we have to set the timestamps to true, otherwise we set them to false
    }
)
