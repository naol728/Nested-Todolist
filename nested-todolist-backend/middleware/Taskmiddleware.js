const Task = require("./../model/Task");

exports.checkTaskOwnership = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    req.task = task; 
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
