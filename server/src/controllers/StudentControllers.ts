import { Request, Response } from "express";
import { studentService } from '../services/instances';

export class StudentController{
    async create(req:Request, res:Response){
        const {studentName,age,classroomId,courseList} = req.body; //takes data from the request body section
        const result = await studentService.create(studentName,age,classroomId,courseList)//saves the data in a result variable 
        return res.status(201).json(result) //returns "201" which is the standard "created" status code along with a parsed result data into json
    }
    
    async getAll(req:Request, res:Response){
        const result = await studentService.getAll();
        return res.status(200).json(result);
    }

    async getOne(req:Request, res:Response){
        const id= Number(req.params.id);
        const result = await studentService.getOne(id);
        if(!result){
            return res.status(404).json({message:'Student not found'})
        }
        return res.status(200).json(result);
    }

    async update(req:Request, res:Response){
        const id= Number(req.params.id);
        const {studentName,age,classroomId} = req.body;
        const result = await studentService.update(id,studentName,age,classroomId);
         if(!result){
            return res.status(404).json({message:'Student not found'})
        }
        return res.status(200).json(result);
    }

    async delete(req:Request, res:Response){
        const id = Number(req.params.id);
        const result = await studentService.delete(id);
          if (!result)
            return res.status(404).json({message:'student not found'});
        return res.status(200).json({message:'student deleted successfully'});
    }
}