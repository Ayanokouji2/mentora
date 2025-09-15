import express from "express";
import {
  adminLogin,
  createClass,
  logout,
} from "../controller/admin.controller.js";
import { asyncHandler } from "../middleware/error.js";
import verifyAdmin from "../schema/admin/auth.schema.js";
import { adminProtectRoute } from "../middleware/auth.js";
import validate from "../middleware/validator.js";
import { createClassSchema } from "../schema/calss/class.schema.js";

const adminRouter = express.Router();

adminRouter
  .route("/verify")
  .post(validate(verifyAdmin), asyncHandler(adminLogin));

adminRouter.route("/logout").post(asyncHandler(logout));

adminRouter.use(adminProtectRoute);
adminRouter
  .use("/class")
  .post(validate(createClassSchema), asyncHandler(createClass));

export default adminRouter;
