const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");
const validate = require("../middlewares/validateMiddleware");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../validations/authValidation");

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/logout", auth, authController.logout);

router.get("/me", auth, authController.me);

router.patch(
  "/change-password",
  auth,
  validate(changePasswordSchema),
  authController.changePassword
);

module.exports = router;
