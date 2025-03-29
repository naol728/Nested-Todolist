const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: "📁" },
  favorite: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
