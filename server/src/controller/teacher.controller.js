import teacherModel from "../model/teacher.model.js";

const getTeacherList = async (req, res) => {
  const { page = 1, limit = 10, subject, search = "" } = req.query;
  const skip = (page - 1) * limit;
//   query to get teachers list
  const teachers = await teacherModel
    .find({
      name: { $regex: search, $options: "i" },
      subject: { $regex: subject, $options: "i" },
    })
    .skip(skip)
    .limit(limit);

  const total = await teacherModel.countDocuments({
    name: { $regex: search, $options: "i" },
    subject: { $regex: subject, $options: "i" },
  });

  const totalPages = Math.ceil(total / limit);

  return res
    .status(200)
    .json({
      success: true,
      message: "Teachers list",
      data: teachers,
      total: total,
      totalPages: totalPages,
    });
};

export { getTeacherList };
