const Collection = require("./../model/Collection");
const Task = require("./../model/Task");
const mongoose = require("mongoose");

exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.aggregate([
      {
        $match: { userId: req.user._id },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
      {
        $addFields: {
          totalTasks: { $size: "$tasks" },
          completedTasks: {
            $size: {
              $filter: {
                input: "$tasks",
                as: "task",
                cond: { $eq: ["$$task.completed", true] }, // Count only completed tasks
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postCollection = async (req, res) => {
  try {
    const { name, icon, favorite } = req.body;

    const collection = new Collection({
      name,
      icon,
      favorite,
      userId: req.user._id,
    });
    await collection.save();
    res.status(201).json({ status: "saved succesfullly", data: collection });
  } catch (err) {
    res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
};
exports.getCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // const collections = await Collection.aggregate([
    //   {
    //     $match: { userId: req.user._id, _id: id },
    //   },
    //   {
    //     $lookup: {
    //       from: "tasks",
    //       localField: "tasks",
    //       foreignField: "_id",
    //       as: "tasks",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       totalTasks: { $size: "$tasks" },
    //       completedTasks: {
    //         $size: {
    //           $filter: {
    //             input: "$tasks",
    //             as: "task",
    //             cond: { $eq: ["$$task.completed", true] }, // Count only completed tasks
    //           },
    //         },
    //       },
    //     },
    //   },
    // ]);

    // const collection = await Collection.findOne({
    //   _id: id,
    //   userId,
    // }).populate("tasks");
    const collection = await Collection.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id), userId }, // Match the collection by ID and user
      },
      {
        $lookup: {
          from: "tasks", // The name of the Task collection
          localField: "tasks", // The tasks field in the Collection schema
          foreignField: "_id", // The _id field in the Task schema
          as: "tasks", // Output the tasks into this field
        },
      },
      {
        $unwind: {
          path: "$tasks",
          preserveNullAndEmptyArrays: true, // Handle collections with no tasks
        },
      },
      {
        $graphLookup: {
          from: "tasks", // The Task collection
          startWith: "$tasks._id", // Start with the task IDs in the collection
          connectFromField: "_id", // Connect from the task's ID
          connectToField: "subtasks", // Connect to the subtasks field
          as: "allTasks", // Output all tasks (including subtasks) into this field
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          icon: { $first: "$icon" },
          favorite: { $first: "$favorite" },
          userId: { $first: "$userId" },
          tasks: { $push: "$tasks" },
          allTasks: { $push: "$allTasks" },
        },
      },
      {
        $addFields: {
          totalTasks: { $size: { $arrayElemAt: ["$allTasks", 0] } }, // Count all tasks (including subtasks)
          completedTasks: {
            $size: {
              $filter: {
                input: { $arrayElemAt: ["$allTasks", 0] },
                as: "task",
                cond: { $eq: ["$$task.completed", true] }, // Count only completed tasks
              },
            },
          },
        },
      },
    ]);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json(collection[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { name, icon, favorite } = req.body;

    // Find and update the collection
    const collection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      { name, icon, favorite },
      { new: true, runValidators: true }
    );

    if (!collection) {
      return res
        .status(404)
        .json({ error: "Collection not found or unauthorized" });
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteColection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const collection = await Collection.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!collection) {
      return res
        .status(404)
        .json({ error: "Collection not found or unauthorized" });
    }

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
