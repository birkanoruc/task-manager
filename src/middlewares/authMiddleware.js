const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Yetkilendirme bilgisi eksik", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("Kullanıcı bulunamadı", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError("Geçersiz veya süresi dolmuş token", 401));
  }
};

module.exports = authMiddleware;
