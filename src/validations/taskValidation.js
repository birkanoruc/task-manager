const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("", null),
  dueDate: Joi.date().iso().greater("now").required(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow("", null),
  dueDate: Joi.date().iso().greater("now"),
  isCompleted: Joi.boolean(),
}).min(1); // en az bir alan gönderilmelidir

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
