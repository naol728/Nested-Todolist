const Task = require("./../model/Task");
const Collection = require("./../model/Collection");
const mongoose = require("mongoose");
exports.getallTasks = async (req, res) => {
  try {
    const { collectionId } = req.params;

    const collection = await Collection.findOne({
      _id: collectionId,
      userId: req.user._id,
    });

    if (!collection) {
      return res
        .status(404)
        .json({ error: "Collection not found or unauthorized" });
    }

    const tasks = await Task.find({ parentId: collectionId }).populate({
      path: "subtasks",
      populate: {
        path: "subtasks",
        populate: {
          path: "subtasks",
          populate: {
            path: "subtasks", // Continue populating recursively as needed
          },
          populate: {
            path: "subtasks", // Continue populating recursively as needed
          },
        },
      },
    });

    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.postTask = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { title, description, priority, completed, dueDate, subtasks } =
      req.body;

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
      parentId: collectionId,
      completed,
      dueDate,
      subtasks, // Associate task with collection
    });

    await task.save();

    // Add task reference to collection
    collection.tasks.push(task._id);
    await collection.save();

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(taskId) } }, // Find the main task
      {
        $graphLookup: {
          from: "tasks",
          startWith: "$subtasks",
          connectFromField: "subtasks",
          connectToField: "_id",
          as: "allSubtasks",
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "subtasks",
          foreignField: "_id",
          as: "subtasks",
        },
      },
    ]);

    if (!task.length) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task[0]);
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
exports.deleteTask = async (req, res) => {
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
exports.addSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority, completed, dueDate } = req.body;

    // Find the parent task
    const parentTask = await Task.findById(taskId);
    if (!parentTask) {
      return res.status(404).json({ error: "Parent task not found" });
    }

    // Create the new subtask
    const subtask = new Task({
      title,
      description,
      priority,
      completed,
      parentId: taskId,
      dueDate,
    });

    // Save the subtask
    await subtask.save();

    // Add subtask ID to the parent task's `subtasks` array
    parentTask.subtasks.push(subtask._id);
    await parentTask.save();

    res.status(201).json(subtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
