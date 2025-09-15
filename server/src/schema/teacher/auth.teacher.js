import Joi from "joi";

const teacherSignupSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    gender:Joi.string().required(),
    subject:Joi.array().items(Joi.string()).required(),
    phone:Joi.string().required(),
    address:Joi.string().required(),
});


const teacherLoginSchema = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required(),
})

export { teacherSignupSchema, teacherLoginSchema };
