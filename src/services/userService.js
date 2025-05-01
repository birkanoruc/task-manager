const User = require("../models/User");
const AppError = require("../utils/appError");

const changePassword = async (userId, data) => {
  const user = await User.findById(userId).select("+password");
  if (!user || !(await user.comparePassword(data.oldPassword))) {
    throw new AppError("Geçersiz eski şifre", 401);
  }

  user.password = data.newPassword;
  await user.save();

  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError("Kullanıcı bulunamadı", 404);
  }
  return user;
};

module.exports = {
  changePassword,
  getUserById,
};
