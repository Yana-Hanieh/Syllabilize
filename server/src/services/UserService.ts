import { User } from "../models/Users";
import bcrypt from 'bcrypt';
import { Op } from "sequelize";

export class UserService {

    private async generateStudentId(): Promise<number> {
        const currentYear = new Date().getFullYear();
        const yearPrefix = currentYear.toString();

        const lastStudent = await User.findOne({
            where: {
                studentId: {
                    [Op.gte]: Number(`${yearPrefix}0000`),
                    [Op.lte]: Number(`${yearPrefix}9999`),
                }
            },
            order: [['studentId', 'DESC']],
        });

        let nextSequence = 1;
        if (lastStudent && lastStudent.studentId) {
            const lastSequence = Number(lastStudent.studentId.toString().slice(4));
            nextSequence = lastSequence + 1;
        }
        const paddedSequecne = nextSequence.toString().padStart(4, '0');
        return Number(`${yearPrefix}${paddedSequecne}`);
    }

    async create(userName: string, userEmail: string, userPassword: string, studentAge: number, classroomId: number, courseIds?: number[]): Promise<User> {
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const studentId = await this.generateStudentId();
        const newStudent = await User.create({ userName, userEmail, userPassword: hashedPassword, studentAge, classroomId, userRole: 'student', studentId });
        
        if (courseIds?.length) {
            await (newStudent as any).setCourses(courseIds);
        }
        return newStudent;
    }

    async getAll(page: number = 1, limit: number = 3, name?: string) {
        const offset = (page - 1) * limit;
        
        // FIX 1: Changed 'name' to 'userName' to match the database model schema
        const whereCondition =  { 
            userRole: 'student', //ensures that only student accounts are returned (always required)
            ...(name ? {userName: {[Op.like]: `%${name}%`}} : {}) //conditional search, unpack the value of the object (spread op) if a name query is provided (if the userName contains the same name)
            // Spread operator (...): If 'name' exists, unpacks { userName: LIKE %name% } which returns a sequalize query object, and is stored into whereCondition.
            // If 'name' is true, it returns the userName (sequelize object) and if false empty/undefined, spreads an empty object {} which adds no extra filters.
        };

        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
        });

        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            students: rows
        };
    }

    async getOne(id: string): Promise<User | null> {
        return await User.findByPk(id);
    }

    async update(userId: string, newName: string, newAge: number, newClassroomId: number): Promise<User | null> {
        const foundUser = await User.findByPk(userId);
        if (!foundUser) return null;

        if (newName) foundUser.userName = newName;
        if (newAge !== undefined) foundUser.studentAge = newAge;
        if (newClassroomId !== undefined) foundUser.classroomId = newClassroomId;

        await foundUser.save();
        return foundUser;
    }

    async delete(userId: string): Promise<boolean> {
        const foundUser = await User.findByPk(userId);
        if (!foundUser) return false;
        await foundUser.destroy();
        return true;
    }
}