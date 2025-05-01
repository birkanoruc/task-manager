const userService = require("../services/userService");

const changePassword = async (req, res, next) => {
  try {
    const result = await userService.changePassword(req.user._id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { me, changePassword };
