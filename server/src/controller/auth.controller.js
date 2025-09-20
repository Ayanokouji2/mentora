import { options } from "../constant/config.js";
import classModel from "../model/class.model.js";
import studentModel from "../model/student.model.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/error.js";
import {
  generateRandomRegistrationNumber,
  sendToken,
} from "../utils/utility.js";
import teacherModel from "../model/teacher.model.js";

const studentSignup = async (req, res) => {
  const {
    name,
    email,
    age,
    gender,
    roll,
    class_name,
    section,
    address,
    phone,
    password,
    reg_no,
    image,
  } = req.body;

  const student = await studentModel.findOne({ email });
  if (student) {
    throw new ApiError(400, "Student already exists");
  }
  const Class = await classModel.findOne({
    className: class_name,
    section: section,
  });

  // if (!Class) {
  //   throw new ApiError(400, "Invalid class or section");
  // }

  const isRegNoExists = await studentModel.findOne({ reg_no });

  if (isRegNoExists) {
    throw new ApiError(400, "Registration number already exists");
  }

  //TODO: upload photo on multer and save it to db

  const newStudent = await studentModel.create({
    name,
    email,
    age,
    gender,
    roll,
    class_name,
    section,
    address,
    phone,
    password,
    reg_no,
  });

  await sendToken(res, newStudent, 201, `Welcome ${newStudent?.name}`);

  // return res
  //   .status(201)
  //   .json({ message: "Student created successfully", data: newStudent });
};

const studentLogin = async (req, res) => {
  const { email, reg_no, password } = req.body;

  const student = await studentModel.findOne({ email }).select("+password");

  if (!student) {
    throw new ApiError(400, "Student not found");
  }
  const isMatch = await bcrypt.compare(password, student?.password);

  if (!isMatch) {
    throw new ApiError(400, "Incorrect password");
  }

  await sendToken(res, student, 200, `Welcome ${student?.name}`);

  return res
    .status(200)
    .json({ message: "Student login successfully", data: student });
};

const studentLogout = async (req, res) => {
  res.cookie("token", "", { ...options, maxAge: 0 });
  return res.status(200).json({ message: "Student logged out successfully" });
};

const studentProfile = async (req, res) => {
  const student = await studentModel.findById(req.user).select("-password");
  return res.status(200).json({ message: "Student profile", data: student });
};

const teacherProfile = async (req, res) => {
  const teacher = await teacherModel.findById(req.user).select("-password");
  return res.status(200).json({ message: "Teacher profile", data: teacher });
};

const teacherSignup = async (req, res) => {
  const { name, email, password, gender, subject, phone, address } = req.body;

  const isTeacherExists = await teacherModel.findOne({ email });
  if (isTeacherExists) {
    throw new ApiError(400, "Teacher already exists");
  }

  const teacher = await teacherModel.create({
    name,
    email,
    password,
    gender,
    subject,
    phone,
    address,
  });
  await sendToken(
    res,
    teacher,
    201,
    "Teacher created successfully",
    "teacher_token"
  );
};

const teacherLogin = async (req, res) => {
  const { email, password } = req.body;
  const teacher = await teacherModel.findOne({ email }).select("+password");
  if (!teacher) {
    throw new ApiError(400, "Teacher not found");
  }
  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) {
    throw new ApiError(400, "Incorrect password");
  }
  await sendToken(
    res,
    teacher,
    200,
    "Teacher login successfully",
    "teacher_token"
  );
};

const teacherLogout = async (req, res) => {
  res.cookie("teacher_token", "", { ...options, maxAge: 0 });
  return res.status(200).json({ message: "Teacher logged out successfully" });
};


export {
  studentSignup,
  studentLogin,
  studentLogout,
  studentProfile,
  teacherSignup,
  teacherLogin,
  teacherLogout,
  teacherProfile,
};
