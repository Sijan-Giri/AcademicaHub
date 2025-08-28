import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/middleware";


class StudentController{
    static async createStudent(req:IExtendedRequest , res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const {studentName , studentPhoneNumber , studentAddress , enrolledDate} = req.body;
        if(!studentName || !studentPhoneNumber || !studentAddress || !enrolledDate) {
            
        }
    }
}

export default StudentController