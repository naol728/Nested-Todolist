const Collection = require("./../model/Collection");
const mongoose = require("mongoose");

exports.checkCollectionOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid collection ID" });
    }
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    if (collection.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to access this collection" });
    }

    req.collection = collection;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
