const Task = require("../models/Task");
const AppError = require("../utils/appError");

const getTasks = async (userId) => {
  return Task.find({ user: userId }).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new AppError("Görev bulunamadı veya erişim izniniz yok", 404);
  }
  return task;
};

const createTask = async (userId, data) => {
  const task = new Task({
    title: data.title,
    description: data.description,
    user: userId,
  });
  await task.save();
  return task;
};

const updateTask = async (taskId, userId, data) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new AppError("Görev bulunamadı veya erişim izniniz yok", 404);
  }

  Object.assign(task, data);
  await task.save();
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    throw new Error("Görev bulunamadı veya erişim izniniz yok.");
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
