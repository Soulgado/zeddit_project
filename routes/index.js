var express = require("express");
var router = express.Router();

/* check if backend API is working */
router.get("/api/main", function (req, res, next) {
  res.status(200).send("Server is working");
});

module.exports = router;
