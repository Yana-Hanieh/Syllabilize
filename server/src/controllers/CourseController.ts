import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";
import { courseService } from "../services/instances";

export class CourseController{
    create(req:Request, res:Response){
        const {courseName,studentsId} = req.body;
        const result = courseService.create(courseName,studentsId)
        return res.status(201).json(result) //returns "201" which is the standard "created" status code along with a parsed result data into json
    }
}