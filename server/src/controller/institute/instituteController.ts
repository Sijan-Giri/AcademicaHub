import { Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";
import { IExtendedRequest } from "../../middleware/middleware";

class InstituteController {
  static async createInstitute(req: IExtendedRequest, res: Response) {
    console.log(req.user)
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
    res.status(200).json({
      message: "Institute created successfully !!",
    });
  }
}

export default InstituteController;
