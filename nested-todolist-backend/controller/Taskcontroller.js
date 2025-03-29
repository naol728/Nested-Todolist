exports.getallTasks = (req, res) => {
  res.send("fetching all tasks..");
};
exports.postTask = (req, res) => {
  res.send("creating a task..");
};
exports.getTask = (req, res) => {
  res.send("fetching a single task..");
};
exports.updateTask = (req, res) => {
  res.send("updating a task..");
};
exports.deleteTak = (req, res) => {
  res.send("delete a single task...");
};
