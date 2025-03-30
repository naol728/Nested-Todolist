const jwt = require("jsonwebtoken");
const User = require("./../model/User");
const dotenv = require("dotenv");
const { verifyToken } = require("./../utils/jwtUtils");
dotenv.config();

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = verifyToken(token);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
