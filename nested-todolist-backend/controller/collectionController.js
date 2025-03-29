exports.getAllCollections = (req, res) => {
  res.send("fetching all collections..");
};
exports.postCollection = (req, res) => {
  res.send("creating a collection..");
};
exports.getCollection = (req, res) => {
  res.send("fetching a single collection..");
};
exports.updateCollection = (req, res) => {
  res.send("fupdating a single collection..");
};
exports.deleteColection = (req, res) => {
  res.send("deleting a single collection..");
};
exports.addTaskToCollection = (req, res) => {
  res.send("adding a task to collection..");
};
exports.removeTaskFromCollection = (req, res) => {
  res.send("removing a task from collection..");
};
