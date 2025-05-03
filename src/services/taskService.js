const Task = require("../models/Task");
const AppError = require("../utils/appError");
const taskPolicy = require("../policies/taskPolicy");

const getTasks = async (user) => {
  return Task.find({ user: user._id }).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, user) => {
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new AppError("Görev bulunamadı", 404);
  }

  if (!taskPolicy.canView(user, task)) {
    throw new AppError("Bu görevi görüntüleme izniniz yok", 403);
  }

  return task;
};

const createTask = async (user, data) => {
  const task = new Task({
    title: data.title,
    description: data.description,
    user: user._id,
  });
  await task.save();
  return task;
};

const updateTask = async (taskId, user, data) => {
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new AppError("Görev bulunamadı", 404);
  }

  if (!taskPolicy.canEdit(user, task)) {
    throw new AppError("Bu görevi güncelleme izniniz yok", 403);
  }

  Object.assign(task, data);
  await task.save();
  return task;
};

const deleteTask = async (taskId, user) => {
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    throw new AppError("Görev bulunamadı", 404);
  }

  if (!taskPolicy.canDelete(user, task)) {
    throw new AppError("Bu görevi silme izniniz yok", 403);
  }
  return task;
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
};
