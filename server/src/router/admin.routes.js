import express from "express";
import { adminLogin, logout } from "../controller/admin.controller.js";
import { createClass } from "../controller/class.controller.js";
import { adminProtectRoute } from "../middleware/auth.js";
import validate from "../middleware/validator.js";
import verifyAdmin from "../schema/admin/auth.schema.js";
import { createClassSchema } from "../schema/calss/class.schema.js";

const adminRouter = express.Router();

adminRouter
  .route("/verify")
  .post(validate(verifyAdmin),adminLogin);

adminRouter.route("/logout").post(logout);

adminRouter.use(adminProtectRoute);
adminRouter.route("/class").post(validate(createClassSchema), createClass);

export default adminRouter;
