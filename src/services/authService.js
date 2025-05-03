const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError("Bu e-posta zaten kullanılıyor.", 400);
  }
  const user = await User.create(data);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.updateRefreshToken(refreshToken);
  return { user, accessToken, refreshToken };
};

const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user || !(await user.comparePassword(data.password))) {
    throw new AppError("Geçersiz e-posta veya şifre", 401);
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.updateRefreshToken(refreshToken);
  return { user, accessToken, refreshToken };
};

const logout = async (user) => {
  user.updateRefreshToken();
  return true;
};

const changePassword = async (user, data) => {
  if (!(await user.comparePassword(data.old_password))) {
    throw new AppError("Geçersiz eski şifre", 400);
  }
  user.updatePassword(data.new_password);
  return user;
};

const me = async (user) => {
  return user;
};

const refresh = async (user) => {
  const accessToken = generateAccessToken(user);
  return accessToken;
};

module.exports = { register, login, logout, changePassword, me, refresh };
