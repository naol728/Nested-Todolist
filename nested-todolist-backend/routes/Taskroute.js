const express = require("express");
const router = express.Router();
const Taskcontroller = require("../controller/Taskcontroller");
const taskMiddleware = require("./../middleware/Taskmiddleware");
const authMiddleware = require("./../middleware/authMiddleware");

router
  .route("/:collectionId")
  .get(authMiddleware.protect, Taskcontroller.getallTasks)
  .post(authMiddleware.protect, Taskcontroller.postTask);
router
  .route("/single/:taskId")
  .get(
    authMiddleware.protect,
    taskMiddleware.checkTaskOwnership,
    Taskcontroller.getTask
  )
  .post(authMiddleware.protect, Taskcontroller.addSubtask)
  .put(
    authMiddleware.protect,
    taskMiddleware.checkTaskOwnership,
    Taskcontroller.updateTask
  )
  .delete(
    authMiddleware.protect,
    taskMiddleware.checkTaskOwnership,
    Taskcontroller.deleteTask
  );

module.exports = router;
