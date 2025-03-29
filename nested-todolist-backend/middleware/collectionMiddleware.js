const Collection = require("./../model/Collection");


exports.checkCollectionOwnership = async (req, res, next) => {
  try {
    const { collectionId } = req.params;
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    if (collection.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to access this collection" });
    }

    req.collection = collection; // Attach collection to request
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
