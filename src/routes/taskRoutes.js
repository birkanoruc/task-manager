const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/taskValidation");

const Task = require("../models/Task");

router.use(authMiddleware); // Tüm route'lara auth middleware'ini uygula

router.get("/", taskController.getTasks);

router.post("/", validate(createTaskSchema), taskController.createTask);

router.get("/:id", taskController.getTaskById);

router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;
