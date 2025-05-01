const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/taskValidation");

const authorizeOwner = require("../middlewares/authorizeMiddleware");
const Task = require("../models/Task");

router.use(auth); // Tüm route'lara auth middleware'ini uygula

router.get("/", taskController.getTasks);

router.post("/", validate(createTaskSchema), taskController.createTask);

router.get("/:id", authorizeOwner(Task), taskController.getTaskById);

router.patch(
  "/:id",
  authorizeOwner(Task),
  validate(updateTaskSchema),
  taskController.updateTask
);

router.delete("/:id", authorizeOwner(Task), taskController.deleteTask);

module.exports = router;
