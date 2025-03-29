const express = require("express");
const CollectionController = require("./../controller/collectionController");
const authMiddleware = require("./../middleware/authMiddleware");
const collectionMiddleware = require("./../middleware/collectionMiddleware");
const router = express.Router();
router
  .route("/")
  .get(authMiddleware.protect, CollectionController.getAllCollections)
  .post(authMiddleware.protect, CollectionController.postCollection);
router
  .route("/:id")
  .get(
    authMiddleware.protect,
    collectionMiddleware.checkCollectionOwnership,
    CollectionController.getCollection
  )
  .put(
    authMiddleware.protect,
    collectionMiddleware.checkCollectionOwnership,
    CollectionController.updateCollection
  )
  .delete(
    authMiddleware.protect,
    collectionMiddleware.checkCollectionOwnership,
    CollectionController.deleteColection
  );

module.exports = router;
