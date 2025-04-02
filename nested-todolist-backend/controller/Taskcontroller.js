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

    // Fetch all tasks linked to this collection
    const tasks = await Task.aggregate([
      {
        $match: { parentId: new mongoose.Types.ObjectId(collectionId) }, // Match tasks under the collection
      },
      {
        $graphLookup: {
          from: "tasks", // The Task collection
          startWith: "$_id", // Start with the tasks in the collection
          connectFromField: "_id", // Connect from the task's ID
          connectToField: "subtasks", // Connect to the subtasks field
          as: "allSubtasks", // Output all tasks (including subtasks) into this field
        },
      },
      {
        $lookup: {
          from: "tasks", // Populate the subtasks field
          localField: "subtasks",
          foreignField: "_id",
          as: "subtasks",
        },
      },
    ]);
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
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
    const { title, description, priority, completed } = req.body;

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
      parentId: taskId, // Associate with parent
      // collectionId: parentTask.parentId, // Maintain the same collectionId
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
