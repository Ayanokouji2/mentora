import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, options } from "../constant/config.js";

const generateRandomRegistrationNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendToken = async (res, data, statusCode, message,name="token") => {
  const token = await jwt.sign({ id: data._id }, JWT_SECRET_KEY);
  res.cookie(name, token, options);
  return res.status(statusCode).json({ success: true, message, token ,data});
};

export { generateRandomRegistrationNumber, sendToken };
