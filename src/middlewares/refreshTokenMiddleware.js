const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");

const refreshTokenMiddleware = async (req, res, next) => {
  const token = req.cookies?.refresh_token;

  if (!token) {
    return next(new AppError("Refresh token bulunamadı", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refresh_token !== token) {
      return next(new AppError("Geçersiz refresh token", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError("Refresh token süresi dolmuş veya geçersiz", 401));
  }
};

module.exports = refreshTokenMiddleware;
