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
  dueDate: { type: Date },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});
taskSchema.virtual("populatedSubtasks", {
  ref: "Task",
  localField: "subtasks",
  foreignField: "_id",
  justOne: false,
});

taskSchema.methods.populateSubtasksRecursively = async function () {
  return await this.populate({
    path: "subtasks",
    populate: {
      path: "subtasks",
      populate: {
        path: "subtasks",
        populate: {
          path: "subtasks", // Continue as deeply as needed
        },
      },
    },
  }).execPopulate();
};
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
