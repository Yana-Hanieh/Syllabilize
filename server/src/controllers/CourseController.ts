import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";
import { courseService } from "../services/instances";

export class CourseController{
    create(req:Request, res:Response){
        const {courseName,studentsId} = req.body;
        const result = courseService.create(courseName,studentsId)
        return res.status(201).json(result) //returns "201" which is the standard "created" status code along with a parsed result data into json
    }

    getAll(req:Request, res:Response){
        const result = courseService.getAll();
        return res.status(200).json(result);
    }

    getOne(req:Request, res:Response){
        const id = Number(req.params.id);
        const result = courseService.getOne(id);
        if (!result){
            return res.status(404).json({message: 'Course not found'})
        }
        return res.status(200).json(result)
    }

    update(req:Request, res:Response){
        const id = Number(req.params.id);
        const {courseName, studentsId} = req.body
        const result = courseService.update(id,courseName, studentsId);
        if (!result){
            return res.status(404).json({message: 'Course not found'})
        }
        return res.status(200).json(result)
    }

    delete(req:Request, res:Response){
        const id = Number(req.params.id);
        const result = courseService.delete(id);
        if (!result)
            return res.status(404).json({message:'course not found'});
        return res.status(200).json({message:'course deleted successfully'});
    }
}