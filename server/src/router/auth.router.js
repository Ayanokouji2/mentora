import express from "express";
import validate from "../middleware/validator.js";
import {
  studentLoginSchema,
  studentSignupSchema,
} from "../schema/student/auth.schema.js";

import {
  studentSignup,
  studentLogin,
  teacherLogin,
  studentLogout,
  teacherSignup,
  teacherLogout,
} from "../controller/auth.controller.js";
import { asyncHandler } from "../middleware/error.js";
import {
  teacherLoginSchema,
  teacherSignupSchema,
} from "../schema/teacher/auth.teacher.js";



const authRouter = express.Router();
// student auth route
authRouter
  .route("/student/signup")
  .post(validate(studentSignupSchema), asyncHandler(studentSignup));

authRouter
  .route("/student/login")
  .post(validate(studentLoginSchema), asyncHandler(studentLogin));

authRouter.route("/student/logout").post(asyncHandler(studentLogout));


// teacher auth route
authRouter
  .route("/teacher/login")
  .post(validate(teacherLoginSchema), asyncHandler(teacherLogin));

authRouter
  .route("/teacher/signup")
  .post(validate(teacherSignupSchema), asyncHandler(teacherSignup));

authRouter.route("/teacher/logout").post(asyncHandler(teacherLogout));

export default authRouter;
