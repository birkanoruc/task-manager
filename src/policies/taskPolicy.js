const canView = (user, task) => {
  return user.id === String(task.user);
};

const canEdit = (user, task) => {
  return user.id === String(task.user);
};

const canDelete = (user, task) => {
  return user.id === String(task.user);
};

module.exports = {
  canView,
  canEdit,
  canDelete,
};
