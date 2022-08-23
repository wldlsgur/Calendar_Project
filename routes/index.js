var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {});
  }
  // delete req.session.user_id;
  // delete req.session.login;
  // delete req.session.room_id;
  res.render("index.ejs");
});

module.exports = router;
