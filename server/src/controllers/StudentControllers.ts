import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";
import { classroomService } from '../services/instances';

const studentService = new StudentService(classroomService);

export class StudentController{
    create(req:Request, res:Response){
        const {studentName,studentAge,classroomId,courseList} = req.body;
        const result = studentService.create(studentName,studentAge,classroomId,courseList)
        return res.status(201).json(result) //returns "201" which is the standard "created" status code along with a parsed result data into json
    }
    
    getAll(req:Request, res:Response){
        const result = studentService.getAll();
        return res.status(200).json(result);
    }

    getOne(req:Request, res:Response){
        const id= Number(req.params.id);
        const result = studentService.getOne(id);
        if(!result){
            return res.status(404).json({message:'Student not found'})
        }
        return res.status(200).json(result);
    }

    update(req:Request, res:Response){
        const id= Number(req.params.id);
        const {studentName,studentAge,classroomId} = req.body;
        const result = studentService.update(id,studentName,studentAge,classroomId);
         if(!result){
            return res.status(404).json({message:'Student not found'})
        }
        return res.status(200).json(result);
    }

    delete(req:Request, res:Response){
        const id = Number(req.params.id);
        const result = studentService.delete(id);
          if (!result)
            return res.status(404).json({message:'student not found'});
        return res.status(200).json({message:'student deleted successfully'});
    }
}