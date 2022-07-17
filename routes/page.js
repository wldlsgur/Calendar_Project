var express = require("express");
var router = express.Router();
var db = require("../DB/db");
var cookie = require("cookie");

/* GET home page. */
router.get("/signup", function (req, res, next) {
  res.render("signup.ejs");
});

router.get("/room", function (req, res, next) {
  let userId = req.cookies.id;
  console.log(userId);
  let query = `select * from user where id='${userId}'`;

  db.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.render("room.ejs", {
      id: result[0].id,
      name: result[0].name,
      photo_path: result[0].photo_path,
    });
  });
});

module.exports = router;
