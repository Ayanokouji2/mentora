import jwt from "jsonwebtoken";
import { ADMIN_SECRET_KEY, JWT_SECRET_KEY } from "../constant/config.js";
import { ApiError } from "../utils/error.js";
import { asyncHandler } from "./error.js";
import _ from "lodash";

const studentProtectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ApiError(401, "Access token is required");
  }

  const decoded = await jwt.verify(token, JWT_SECRET_KEY);
  if (!decoded) {
    throw new ApiError(401, "Unauthorized");
  }
  req.user = decoded.id;
  next();
});

const teacherProtectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.teacher_token;
  if (!token) {
    throw new ApiError(401, "Access token is required");
  }
  const decoded = await jwt.verify(token, JWT_SECRET_KEY);
  if (!decoded) {
    throw new ApiError(401, "Unauthorized");
  }
  req.user = decoded.id;
  next();
});

const adminProtectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) {
    throw new ApiError(401, "Access token is required");
  }
  const payload = await jwt.verify(token, JWT_SECRET_KEY);
  if (!payload) {
    throw new ApiError(401, "Unauthorized");
  }

  const KEY = payload.key;

  if (!_.includes([ADMIN_SECRET_KEY, "admin"], KEY)) {
    throw new ApiError(401, "Unauthorized");
  }
  next();
});
export { studentProtectRoute, teacherProtectRoute, adminProtectRoute };
