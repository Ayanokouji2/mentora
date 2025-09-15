import Joi from "joi";

const createClassSchema = Joi.object({
  class_name: Joi.string().required(),
  section: Joi.string().required().allow("A", "B", "C", "D", "E"),
});

export { createClassSchema };
