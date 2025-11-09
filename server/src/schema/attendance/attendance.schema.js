import Joi from "joi";

const rollCallSchema = Joi.object({
  class_name: Joi.string().required(),
  section: Joi.string().required().allow("A", "B", "C", "D", "E"),
  sub_teacher: Joi.string().hex().length(24),
  period: Joi.string().required(),
  attendance_stats: Joi.array().items(Joi.object()).required(),
  date: Joi.date().optional(),
  subject:Joi.string().required()
});
const generateAttendanceSheetSchema = Joi.object({
  class_name: Joi.string().required(),
  section: Joi.string().required().allow("A", "B", "C", "D", "E"),
  period: Joi.string().required(),
  date: Joi.date().required(),
});
export { rollCallSchema,generateAttendanceSheetSchema };
