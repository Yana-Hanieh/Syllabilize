import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";
import { classroomService } from '../services/instances';

const studentService = new StudentService(classroomService);

export class StudentController{
    create(req:Request, res:Response){
        const {studentName,age,classroomId,courseList} = req.body;
        const result = studentService.create(studentName,age,classroomId,courseList)
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
            res.status(404).json({message:'Student not found'})
        }
        res.status(200).json(result);
    }

    update(req:Request, res:Response){
        const id= Number(req.params.id);
        const {studentId,studentName,age,classroomId} = req.body;
        const result = studentService.update(studentId,studentName,age,classroomId);
         if(!result){
            res.status(404).json({message:'Student not found'})
        }
        res.status(200).json(result);
    }
}