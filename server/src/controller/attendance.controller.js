import classModel from "../model/class.model.js";
import teacherModel from "../model/teacher.model.js";
import studentModel from "../model/student.model.js";
import attendanceModel from "../model/attendance.model.js";
import { ApiError } from "../utils/error.js";
import _ from "lodash";

const createAttendance = async (req, res) => {
  const { class_name, section, period, attendance_stats, sub_teacher, date } =
    req.body;

  const isClassExists = await classModel.findOne({ class_name, section });
  if (!isClassExists) {
    throw new ApiError(400, "Class not found");
  }
  const isSubTeacherExists = await teacherModel.findOne({ _id: sub_teacher });
  if (!isSubTeacherExists) {
    throw new ApiError(400, "Sub teacher not found");
  }

  const validAttendanceStats = await Promise.all(
    attendance_stats.map(async (student) => {
      const isStudentExists = await studentModel.findOne({
        _id: student.student,
      });
      if (!isStudentExists) {
        throw new ApiError(400, "Student not found");
      }
      return student;
    })
  );

  const newAttendance = await attendanceModel.create({
    class: isClassExists._id,
    period,
    attendance_stats: validAttendanceStats,
    sub_teacher: isSubTeacherExists._id,
    date,
  });

  return res
    .status(201)
    .json({ message: "Attendance created successfully", data: newAttendance });
};

// const getAttendance = async (req, res) => {
//   const { class_name, section, date,period } = req.query;

//   const isClassExists = await classModel.findOne({ class_name, section });

//   if (!isClassExists) {
//     throw new ApiError(400, "Class not found");
//   }

//   const attendance = await attendanceModel.find({
//     class: isClassExists._id,
//     date,
//   });

//   return res
//     .status(200)
//     .json({ message: "Attendance fetched successfully", data: attendance });
// };

const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { class_name, section, period, attendance_stats, sub_teacher, date } =
    req.body;
  const isClassExists = await classModel.findOne({ class_name, section });
  if (!isClassExists) {
    throw new ApiError(400, "Class not found");
  }
  const isSubTeacherExists = await teacherModel.findOne({ _id: sub_teacher });
  if (!isSubTeacherExists) {
    throw new ApiError(400, "Sub teacher not found");
  }
  const newAttendance = await attendanceModel.findByIdAndUpdate(id, {
    class: isClassExists._id,
    section,
    period,
    attendance_stats,
    sub_teacher: isSubTeacherExists._id,
    date,
  });
  if (!newAttendance) {
    throw new ApiError(400, "Attendance not found");
  }
  return res
    .status(200)
    .json({ message: "Attendance updated successfully", data: newAttendance });
};

const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  const attendance = await attendanceModel.findByIdAndDelete(id);
  if (!attendance) {
    throw new ApiError(400, "Attendance not found");
  }
  return res
    .status(200)
    .json({ message: "Attendance deleted successfully", data: attendance });
};



export { createAttendance, updateAttendance, deleteAttendance, };
