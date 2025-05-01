const AppError = require("../utils/appError");

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      return next(new AppError(`Geçersiz veri: ${messages}`, 400));
    }
    next();
  };
};

module.exports = validate;
