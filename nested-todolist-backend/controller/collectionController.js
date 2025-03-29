const Collection = require("./../model/Collection");
const Task = require("./../model/Task");
exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({
      userId: req.user._id,
    }).populate("tasks");
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
    console.log(req.params);
    const collection = await Collection.findOne({
      _id: id,
      userId,
    }).populate("tasks");

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json(collection);
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
