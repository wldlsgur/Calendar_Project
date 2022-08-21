var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.clearCookie("id");
  res.render("index.ejs");
});

module.exports = router;
