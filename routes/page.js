var express = require("express");
var router = express.Router();
var db = require("../DB/db");
var cookie = require("cookie");

/* GET home page. */
router.get("/signup", function (req, res, next) {
  res.render("signup.ejs");
});

router.get("/room", function (req, res, next) {
  if (!req.session.login) {
    alert("로그인 후 이용해주세요");
    return res.status(200).redirect("/");
  }
  let userId = req.session.user_id;
  let query = `select * from user where user_id='${userId}'`;

  db.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    if (req.session.room_id) {
      req.session.room_id = null;
    }
    res.render("room.ejs", {
      user_id: result[0].user_id,
      id: result[0].id,
      name: result[0].name,
      photo_path: result[0].photo_path,
    });
  });
});

router.get("/calander", function (req, res) {
  if (!req.session.login) {
    alert("로그인 후 이용해주세요");
    return res.status(200).redirect("/");
  }
  let userId = req.session.user_id;
  let roomId = req.cookies.room_id;
  let query = `select * from user where user_id='${userId}'`;

  db.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.render("calander.ejs", {
      user_id: result[0].user_id,
      id: result[0].id,
      name: result[0].name,
      photo_path: result[0].photo_path,
      room_id: roomId,
    });
  });
});
module.exports = router;
