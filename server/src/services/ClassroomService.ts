import { Op } from "sequelize";
import { Classroom } from "../models/Classroom"; //importing the classroom sequelize model 
export class ClassroomService{
    //the classroom model itself reads/writes to the database directly, no need for private attributes (spearate in-memory copy to maintain)

    async create(name:string): Promise<Classroom>{ //async since talking to a real databse takes time, returning a Promise that resolves to the created classroom
        return await Classroom.create({classroomName:name}); //sequelize handles id generation and inserting the row into mysql in one call
    }

    //the view function has 2 methods, the getAll to view all the classrooms, and getOne to view only one classroom
    async getAll(page:number = 1, limit: number = 3, name?: string){//shows a table/list of every classroom (names and student counts)
        const offset = (page-1) * limit;
        const where = name ? { name: {[Op.like]: `%${name}%`}}: {};

        const {count, rows} = await Classroom.findAndCountAll({//a sequelize function .findAll whıch queries and returns every row in the classroom 
            where,
            limit: limit,
            offset:offset,
        });

        return {
            totalItems: count, 
            totalPages:Math.ceil(count / limit),
            currentPage: page, 
            classrooms: rows
        }
    }

    async getOne(id:number): Promise<Classroom | null>{//shows full details for one specific classroom (name, studentcount and actual list of students)
        return await Classroom.findByPk(id); //returns a classroom where the primary key is matched by the id or null ıf not found
    }

    async update(id: number, newName: string): Promise<Classroom | null>{
        const foundClassroom = await Classroom.findByPk(id);
        if (!foundClassroom){  //if .findByPK() returns undefined/null exit early and return null
            return null;
        }
        foundClassroom.classroomName = newName; //mutate the found row's property directlly, same as before, but this only changes it in memory (changing the classroom name only)
        await foundClassroom.save() //writes the mutated property back to the actual db row, without this the change wouldnt be saved/present
        return foundClassroom; //returns the altered foundClassroom
    }

    async delete(id:number): Promise<boolean>{ //deletes the classroom, and returns a boolean value
        const foundClassroom = await Classroom.findByPk(id); //looks up the row by primary key
        if (!foundClassroom){ //guard clause in case no classroom matches this id
            return false
        }
        await foundClassroom.destroy() //.destroy() a sequelize method which deletes the found classroom (the row) from the database table  
        return true;
    }
}