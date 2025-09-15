import Joi from "joi";

const studentSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
  roll: Joi.string().required(),
  class_name: Joi.string().required(),
  section: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  reg_no: Joi.string().required(),
});

const studentLoginSchema = Joi.object({
  email: Joi.string().email(),
  reg_no: Joi.string(),
  password: Joi.string().required(),
}).or("email", "reg_no");


export { studentSignupSchema, studentLoginSchema };
