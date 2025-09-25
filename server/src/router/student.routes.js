import { Router } from "express/router";
import { studentProfile } from "../controller/auth.controller";

const studentRouter = Router();


studentRouter
    .route("/profile")
    .get(studentProfile)


export default studentRouter;