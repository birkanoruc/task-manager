const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
const { changePasswordSchema } = require("../validations/userValidation");

router.get("/me", auth, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.patch(
  "/change-password",
  auth,
  validate(changePasswordSchema),
  userController.changePassword
);

module.exports = router;
