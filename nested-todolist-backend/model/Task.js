const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  completed: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
