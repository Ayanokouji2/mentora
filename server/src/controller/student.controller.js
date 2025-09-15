import classModel from "../model/class.model.js";
import studentModel from "../model/student.model.js";
import { ApiError } from "../utils/error.js";
import _ from "lodash";

const geStudentsList = async (req, res) => {
  const { class_name, section } = req.body;

  const isClassExists = await classModel.find({ class_name, section });

  if (_.isEmpty(isClassExists)) {
    throw new ApiError(400, "Class not found");
  }
  const students = await studentModel.find({
    class_name,
    section,
  });

  return res
    .status(200)
    .json({ success: true, message: "Students list", data: students });
};



export { geStudentsList };
