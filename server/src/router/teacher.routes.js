import express from "express";
import { getTeacherList } from "../controller/teacher.controller.js";

const teacherRouter = express.Router();

teacherRouter.route("/").get(getTeacherList);

export default teacherRouter;
