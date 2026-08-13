import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface StudentAttributes{
    studentId: number;
    studentName: string; 
    studentAge: number;
    classroomId:number;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'studentId'>{}

export class Student extends Model <StudentAttributes, StudentCreationAttributes> implements StudentAttributes{
    public studentId!: number;
    public studentName!: string;
    public studentAge!: number;
    public classroomId!:number;
}

Student.init(
    {
        studentId:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },

        studentName:{
                type:DataTypes.STRING, 
                allowNull:false,
        },
            
        studentAge:{
                type:DataTypes.INTEGER, 
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
