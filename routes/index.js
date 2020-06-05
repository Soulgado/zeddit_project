var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/api/main", function (req, res, next) {
  res.status(200).send("Server is working");
});

module.exports = router;
