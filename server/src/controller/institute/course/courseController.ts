import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/middleware";
import sequelize from "../../../database/connection";


class CourseController{
    static async createCourse(req:IExtendedRequest , res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const {courseName , coursePrice , courseDescription , courseDuration , courseLevel} = req.body;
        if(!courseName || !coursePrice || !courseDescription || !courseDuration || !courseLevel) {
            res.status(400).json({
                message : "Please provide courseName , coursePrice , courseDescription , courseDuration , courseLevel"
            })
            return
        }
        await sequelize.query(`INSERT INTO course_${instituteNumber}(courseName , coursePrice , courseDescription , courseDuration , courseLevel) VALUES (?,?,?,?,?)`,{
            replacements : [courseName , coursePrice , courseDescription , courseDuration , courseLevel]
        })
        res.status(200).json({
            message : "Course created successfully !!"
        })
    }

    static async deleteCourse(req:IExtendedRequest , res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id !!"
            })
            return
        }
        const courseData = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`,{
            replacements : [id]
        })
        if(courseData) {
            res.status(404).json({
                message : "No course with that id !!"
            })
            return
        }
        await sequelize.query(`DELETE course_${instituteNumber} WHERE id = ${id}`);
        res.status(200).json({
            message : "Course deleted successfully !!"
        })
    }

    static async getAllCourse(req:IExtendedRequest , res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;

        const [courseData] = await sequelize.query(`SELECT * FROM course_${instituteNumber}`);
        if(courseData.length == 0) {
            res.status(404).json({
                message : "Course doesn't found  !!"
            })
        }
        res.status(200).json({
            message : "Courses fetched successfully !!"
        })
    }

    static async getSingleCourse(req:IExtendedRequest , res:Response) {
        const instituteNumber = req.user?.currentInstituteNumber;
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide an id !!"
            })
            return 
        }
        const courseData = await sequelize.query(`SELECT * FROM course_${instituteNumber} WHERE id = ?`,{
            replacements : [id]
        })
        res.status(200).json({
            message : "Course fetched successfully !!"
        })
    }
}

export default CourseController