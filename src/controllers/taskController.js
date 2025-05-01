const taskService = require("../services/taskService");

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.user._id);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
};
