import express from "express"
import errorHandler from "../../../services/errorHandler";
import Middleware from "../../../middleware/middleware";
import CourseController from "../../../controller/institute/course/courseController";

const router = express.Router();

router.route('/').post(errorHandler(Middleware.isLoggedIn) , errorHandler(CourseController.createCourse));

export default router;
