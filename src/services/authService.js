const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const register = async ({ data }) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError("Bu e-posta zaten kullanılıyor.");
  }

  const user = await User.create(data);
  const token = generateToken(user);

  return { user, token };
};

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user || !(await user.comparePassword(data.password))) {
    throw new AppError("Geçersiz e-posta veya şifre", 401);
  }

  const token = generateToken(user);
  return { user, token };
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Başarıyla çıkış yapıldı" }); // Frontend token'ı sildiği sürece logout olur.
};

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

module.exports = { register, login, logout };
