import express  from "express";
import InstituteController from "../../controller/institute/instituteController";
import Middleware from "../../middleware/middleware";
import errorHandler from "../../services/errorHandler";

const router = express();

router.route("/").post(errorHandler(Middleware.isLoggedIn),errorHandler(InstituteController.createInstitute) , errorHandler(InstituteController.createTeacher) , errorHandler(InstituteController.createStudent), errorHandler(InstituteController.createCourse));

export default router