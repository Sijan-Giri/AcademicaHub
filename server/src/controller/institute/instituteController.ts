import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";
import { IExtendedRequest } from "../../middleware/middleware";
import User from "../../database/models/user.model";

class InstituteController {
  static async createInstitute(req: IExtendedRequest, res: Response , next : NextFunction) {
    const userData = req.user && req.user.userId;
    const {
      instituteName,
      instituteEmail,
      institutePhoneNum,
      instituteAddress,
    } = req.body;
    const institutePanNum = req.body.institutePanNum || null;
    const instituteVatNum = req.body.instituteVatNum || null;
    if (
      !instituteName ||
      !instituteAddress ||
      !instituteEmail ||
      !institutePhoneNum
    ) {
      res.status(400).json({
        message:
          "Please provide instituteName , instituteEmail , institutePhoneNum , instituteAddress",
      });
      return;
    }

    const instituteNumber = generateRandomNumber();

    await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            instituteName VARCHAR(255) NOT NULL UNIQUE,
            instituteEmail VARCHAR(255) NOT NULL UNIQUE,
            instituteAddress VARCHAR(255) NOT NULL,
            institutePhoneNum VARCHAR(255) NOT NULL UNIQUE,
            institutePanNum VARCHAR(255) UNIQUE,
            instituteVatNum VARCHAR(255) UNIQUE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);

    await sequelize.query(
      `INSERT INTO institute_${instituteNumber}(instituteName , instituteEmail , instituteAddress , institutePhoneNum , institutePanNum , instituteVatNum) VALUES (?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          instituteAddress,
          institutePhoneNum,
          institutePanNum,
          instituteVatNum,
        ],
      }
    );

    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      userId VARCHAR(255) REFERENCES users(id),
      instituteNumber INT UNIQUE
      )`)
    if(req.user) {

      await sequelize.query(`INSERT INTO user_institute(userid , instituteNumber) VALUES(?,?)`,{
        replacements : [req.user.userId , instituteNumber]
      })

      await User.update({
        currentInstituteNumber : instituteNumber,
        role : "institute"
      },{
        where : {
          userId : userData
        }
      }); 
    }
    req.instituteNumber = instituteNumber
    next()
  }

  static async createTeacher(req:IExtendedRequest,res: Response , next : NextFunction) {
    const instituteNumber = req.instituteNumber
    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      teacherName VARCHAR(255) NOT NULL,
      teacherEmail VARCHAR(255) NOT NULL UNIQUE,
      teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      teacherExpertise VARCHAR(255) NOT NULL,
      salary VARCHAR(255) NOT NULL,
      joinedDate DATE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) `)
       next()
  }

  static async createStudent(req:IExtendedRequest,res:Response,next:NextFunction) {
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      studentName VARCHAR(255) NOT NULL,
      studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      studentAddress VARCHAR(255) NOT NULL,
      enrolledDate DATE,
      studentImage VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
      next()
  }

  static async createCourse(req:IExtendedRequest,res:Response) {
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      courseName VARCHAR(255) NOT NULL,
      coursePrice VARCHAR(255) NOT NULL,
      courseThumbnail VARCHAR(200),
      courseDescription TEXT NOT NULL,
      courseDuration VARCHAR(100) NOT NULL,
      courseLevel ENUM('beginner' , 'intermediate' , 'advance'),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
      
    res.status(200).json({
      message: "Institute created successfully !!",
    });
  }
}

export default InstituteController;
