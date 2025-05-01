const JoiBase = require("joi");
const JoiObjectId = require("joi-objectid");

const Joi = JoiObjectId(JoiBase); // Artık Joi.objectId() kullanılabilir

module.exports = Joi;
