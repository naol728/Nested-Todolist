const express = require("express");
const {
  registerUser,
  loginUser,
  currentuser,
} = require("./../controller/UserController");
const authMiddleware = require("./../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth", authMiddleware.protect, currentuser);
module.exports = router;
