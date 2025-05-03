const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const refreshTokenMiddleware = require("../middlewares/refreshTokenMiddleware");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../validations/authValidation");

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/logout", authMiddleware, authController.logout);

router.post("/me", authMiddleware, authController.me);

router.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  authController.changePassword
);

router.post("/refresh", refreshTokenMiddleware, authController.refreshToken);

module.exports = router;
