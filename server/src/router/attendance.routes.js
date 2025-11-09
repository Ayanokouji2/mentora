import express from "express";
import { teacherProtectRoute } from "../middleware/auth.js";
import { createAttendance, generateAttendanceSheet } from "../controller/attendance.controller.js";
import validate from "../middleware/validator.js";
import { rollCallSchema,generateAttendanceSheetSchema } from "../schema/attendance/attendance.schema.js";

const attendanceRouter = express.Router();

attendanceRouter.use(teacherProtectRoute);

attendanceRouter
  .route("/rollcall")
  .post(validate(rollCallSchema), createAttendance);

attendanceRouter
  .route("/generate")
  .post(validate(generateAttendanceSheetSchema), generateAttendanceSheet);

export default attendanceRouter;
