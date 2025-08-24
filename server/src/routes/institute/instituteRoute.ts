import express  from "express";
import InstituteController from "../../controller/institute/instituteController";
import Middleware from "../../middleware/middleware";

const router = express();

router.route("/").post(Middleware.isLoggedIn,InstituteController.createInstitute , InstituteController.createTeacher , InstituteController.createStudent, InstituteController.createCourse);

export default router