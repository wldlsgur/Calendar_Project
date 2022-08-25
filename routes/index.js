var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  req.session.destroy(function (err) {
    res.render("index.ejs");
  });
  // delete req.session.user_id;
  // delete req.session.login;
  // delete req.session.room_id;
});

module.exports = router;
