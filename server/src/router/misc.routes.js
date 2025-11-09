import express from "express";
import { generateStudents } from "../controller/misc.controller.js";
const miscRouter = express.Router();

miscRouter.route("/generate/students").get(generateStudents);

export default miscRouter;
