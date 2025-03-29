const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send("root get request");
  })
  .post((req, res) => {
    res.send("root post request");
  });
router
  .route("/id")
  .get((req, res) => {
    res.send("id get request");
  })
  .patch((req, res) => {
    res.send("id patch request");
  })
  .delete((req, res) => {
    res.send("id delete request");
  });
module.exports=router