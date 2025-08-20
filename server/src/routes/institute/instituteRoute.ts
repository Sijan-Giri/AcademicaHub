import express  from "express";
import InstituteController from "../../controller/institute/instituteController";
import Middleware from "../../middleware/middleware";

const router = express();

router.route("/").post(Middleware.isLoggedIn,InstituteController.createInstitute);

export default router