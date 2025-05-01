const Joi = require("joi");

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
}).required();

module.exports = {
  changePasswordSchema,
};
