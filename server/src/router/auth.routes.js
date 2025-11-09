import { Router } from "express";
import validate from "../middleware/validator.js";
import {
  studentLoginSchema,
  studentSignupSchema,
} from "../schema/student/auth.schema.js";

import {
  getProfile,
  studentLogin,
  studentLogout,
  studentSignup,
  teacherLogin,
  teacherLogout,
  teacherSignup,
} from "../controller/auth.controller.js";
import {
  teacherLoginSchema,
  teacherSignupSchema,
} from "../schema/teacher/auth.teacher.js";



const authRouter = Router();

// common auth profile

authRouter
  .route("/me")
  .get(getProfile);

// student auth route
authRouter
  .route("/student/signup")
  .post(validate(studentSignupSchema), studentSignup);

authRouter
  .route("/student/login")
  .post(validate(studentLoginSchema), studentLogin);

authRouter
  .route("/student/logout")
  .post(studentLogout);


// teacher auth route
authRouter
  .route("/teacher/login")
  .post(validate(teacherLoginSchema), teacherLogin);

authRouter
  .route("/teacher/signup")
  .post(validate(teacherSignupSchema), teacherSignup);

authRouter
  .route("/teacher/logout")
  .post(teacherLogout);

export default authRouter;
