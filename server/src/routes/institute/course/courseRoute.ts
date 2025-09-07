import express from "express"
import errorHandler from "../../../services/errorHandler";
import Middleware from "../../../middleware/middleware";
import CourseController from "../../../controller/institute/course/courseController";
import {multer , storage} from "../../../middleware/multerMiddleware"

const router = express.Router();

const upload = multer({storage : storage})

router.route('/').post(errorHandler(Middleware.isLoggedIn) ,upload.single('courseImage'), errorHandler( CourseController.createCourse));

export default router;
