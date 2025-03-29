const Task = require("./../model/Task");
const Collection = require("./../model/Collection");
exports.getallTasks = async (req, res) => {
  try {
    const { collectionId } = req.params;

    // Check if collection exists and belongs to the user
    const collection = await Collection.findOne({
      _id: collectionId,
      userId: req.user._id,
    });

    if (!collection) {
      return res
        .status(404)
        .json({ error: "Collection not found or unauthorized" });
    }

    // Fetch all tasks linked to this collection
    const tasks = await Task.find({ collectionId }).populate("subtasks");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.postTask = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { title, description, priority, completed } = req.body;

    // Check if the collection exists and belongs to the user
    const collection = await Collection.findOne({
      _id: collectionId,
      userId: req.user._id,
    });

    if (!collection) {
      return res
        .status(404)
        .json({ error: "Collection not found or unauthorized" });
    }

    // Create the new task
    const task = new Task({
      title,
      description,
      priority,
      completed,
      collectionId, // Associate task with collection
    });

    await task.save();

    // Add task reference to collection
    collection.tasks.push(task._id);
    await collection.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task and ensure it belongs to the authenticated user
    const task = await Task.findById(taskId).populate("subtasks");

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority, completed } = req.body;

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, priority, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteTak = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove the task reference from the collection (if applicable)
    await Collection.updateMany(
      { tasks: taskId },
      { $pull: { tasks: taskId } }
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
