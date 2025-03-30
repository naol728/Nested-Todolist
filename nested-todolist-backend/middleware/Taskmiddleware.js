const Task = require("./../model/Task");

// Middleware to check if task exists and belongs to the user
exports.checkTaskOwnership = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    req.task = task; // Attach task to request for next middleware or controller
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
