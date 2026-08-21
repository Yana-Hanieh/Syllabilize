import { Request, Response } from "express";
import { courseService } from "../services/instances";

export class CourseController{
    async create(req:Request, res:Response){
        const {courseName, studentId} = req.body;
        const result = await courseService.create(courseName, studentId)
        return res.status(201).json(result) //returns "201" which is the standard "created" status code along with a parsed result data into json
    }

    async getAll(req:Request, res:Response){
        
        const page = Math.max (1, Number(req.query.page) || 1);
        const limit = Math.max (1, Number(req.query.limit) || 3);
        const result = await courseService.getAll(page,limit); 
      
        if(!result){
            return res.status(500).json({message:'Internal server error'});
        }
        return res.status(200).json(result);

    }

    async getOne(req:Request, res:Response){
        const id = Number(req.params.id);
        const result = await courseService.getOne(id);
        if (!result){
            return res.status(404).json({message: 'Course not found'})
        }
        return res.status(200).json(result)
    }

    async update(req:Request, res:Response){
        const id = Number(req.params.id);
        const {newCourseName, newStudentId} = req.body
        const result = await courseService.update(id,newCourseName, newStudentId);
        if (!result){
            return res.status(404).json({message: 'Course not found'})
        }
        return res.status(200).json(result)
    }

    async delete(req:Request, res:Response){
        const id = Number(req.params.id);
        const result = await courseService.delete(id);
        if (!result)
            return res.status(404).json({message:'course not found'});
        return res.status(200).json({message:'course deleted successfully'});
    }
}