import classModel from "../model/class.model.js";
import { ApiError } from "../utils/error.js";

const createClass = async (req, res) => {
  const { class_name, section } = req.body;
  const isClassExists = await classModel.findOne({ class_name, section });
  if (isClassExists) {
    throw new ApiError(400, "Class already exists");
  }
  const newClass = await classModel.create({ class_name, section });
  return res
    .status(201)
    .json({ message: "Class created successfully", data: newClass });
};

export {createClass}