import { DataTypes,Model,Optional } from "sequelize";
import sequelize from '../config/database';

interface ClassroomAttributes{ //interface 1, describes the full shape of a classroom (used when reading a classroom that already exists)
    classroomId: number;
    classroomName: string;
    //the StudentList was dropped since it relys on the associations between students and classrooms
}

//interface 2, classroom Id is an optional attribute(you dont have to type the Id when creating a classroom, only when viewing) that gets generated automatically (when creating a new classroom, since the classroom id isnt supplied by us)
interface ClassroomCreationAttributes extends Optional<ClassroomAttributes, 'classroomId'> {}

export class Classroom //creates a classroom class that uses classrom attributes and classroom creation attributes
             extends Model //model is a base class provided by sequelize, extending it allows the class to inherit all sequelize built-in methods. 
             <ClassroomAttributes, ClassroomCreationAttributes> //when reading a classroom expect ClassroomAttribute, when creating one expect ClassroomCreationAttribute
             implements ClassroomAttributes { //safety check, the class must have every property listen in classAttributes. A compilation error is thrown if one of the properties was not declared
    public classroomId!: number;
    public classroomName!: string;
}

Classroom.init(
    {
        classroomId:{
            type:DataTypes.INTEGER, 
            autoIncrement:true, //allows to generate automatic classroom id, autoIncrement is used for numeric columns
            primaryKey:true, //set it to primary key
        },
        classroomName:{
            type: DataTypes.STRING,
            allowNull:false
        },
    },
    {   sequelize, //initialises sequilize
        tableName:'Classrooms' //sets the table name 
    }
);