import Joi from "joi";

const teacherSignupSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  subject: Joi.array().items(Joi.string().trim()).default([]),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  address: Joi.string().trim().required(),
  image: Joi.object().optional(), 
  isClassTeacher: Joi.boolean().default(false),
  userRole: Joi.string().valid("teacher").default("teacher"),
  teacherId: Joi.forbidden(), 
  dateJoined: Joi.date().optional()
});


const teacherLoginSchema = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required(),
})

export { teacherSignupSchema, teacherLoginSchema };
