import { Router } from "express";
import { studentProfile } from "../controller/auth.controller.js";

const studentRouter = Router();

studentRouter
    .route("/profile")
    .get(studentProfile)


export default studentRouter;