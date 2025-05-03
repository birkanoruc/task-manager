const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(
      req.body
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // JavaScript tarafından erişilemez
      secure: process.env.NODE_ENV === "production", // true = Sadece HTTPS üzerinden gönder,
      sameSite: "Strict", // CSRF koruması için
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün boyunca geçerli
    });

    res.status(201).json({ user, access_token: accessToken });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // JavaScript tarafından erişilemez
      secure: process.env.NODE_ENV === "production", // true = Sadece HTTPS üzerinden gönder,
      sameSite: "Strict", // CSRF koruması için
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün boyunca geçerli
    });

    res.status(200).json({ user, access_token: accessToken });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user);

    res.clearCookie("refresh_token", {
      httpOnly: true, // JavaScript tarafından erişilemez
      secure: process.env.NODE_ENV === "production", // true = Sadece HTTPS üzerinden gönder,
      sameSite: "Strict", // CSRF koruması için
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await authService.me(req.user);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const user = await authService.changePassword(req.user, req.body);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const accessToken = await authService.refresh(req.user);
    res.status(200).json({ access_token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, me, changePassword, refreshToken };
