import Joi from "joi";

const verifyAdmin = Joi.object({
  key: Joi.string().required(),
});

export default verifyAdmin;
