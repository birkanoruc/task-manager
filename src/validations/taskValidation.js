const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("", null),
  status: Joi.string()
    .valid("pending", "in_progress", "done")
    .default("pending"),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow("", null),
  status: Joi.string().valid("pending", "in_progress", "done"),
}).min(1); // en az bir alan gönderilmelidir

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
