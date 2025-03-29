const express = require("express");
const router = express.Router();
const Taskcontroller = require("../controller/TaskController");
router.route("/").get(Taskcontroller.getallTasks).post(Taskcontroller.postTask);
router
  .route("/:id")
  .get(Taskcontroller.getTask)
  .patch(Taskcontroller.updateTask)
  .delete(Taskcontroller.deleteTak);

module.exports = router;
