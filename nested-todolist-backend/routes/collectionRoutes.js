const express = require("express");
const CollectionController = require("../controller/collectionController");

const router = express.Router();
router
  .route("/")
  .get(CollectionController.getAllCollections)
  .post(CollectionController.postCollection);
router
  .route("/:id")
  .get(CollectionController.getCollection)
  .patch(CollectionController.updateCollection)
  .delete(CollectionController.deleteColection);

module.exports = router;
