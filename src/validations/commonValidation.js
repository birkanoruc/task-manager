const Joi = require("./customJoi");

const objectIdParamSchema = Joi.object({
  id: Joi.objectId().required().messages({
    "string.pattern.name": `"id" geçerli bir MongoDB ObjectId olmalıdır`,
  }),
});

module.exports = {
  objectIdParamSchema,
};
