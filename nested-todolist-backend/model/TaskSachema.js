import mongoose from "mongoose";

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Recursive Reference
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Recursion for nesting
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: "📁" },
  favorite: { type: Boolean, default: false },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const Collection = mongoose.model("Collection", CollectionSchema);
const Task = mongoose.model("Task", TaskSchema);

export { Collection, Task };
