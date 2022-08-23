var express = require("express");
var router = express.Router();
var db = require("../DB/db");
const bcrypt = require("bcrypt");

router.get("/sameid/:id", function (req, res, next) {
  let user_id = req.params.id;

  let query = `SELECT id FROM user WHERE id='${user_id}'`;
  db.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    if (!result[0]) {
      res.status(200).send({ res: true, msg: "success" });
    } else {
      res.status(200).send({ res: false, msg: "failed" });
    }
  });
});

router.post("/login", function (req, res) {
  let { user_id, user_pw } = req.body;
  let query = `SELECT * FROM user WHERE id='${user_id}'`;
  db.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    if (!result[0]) {
      res.status(200).send({ res: false, msg: "not found" });
      return;
    }
    bcrypt.compare(user_pw, result[0].pw, (err, same) => {
      if (same) {
        if (!req.session.user_id) {
          req.session.user_id = result[0].user_id;
          req.session.login = true;
        }
        res.status(200).send({ res: true, msg: "success" });
      } else {
        res.status(200).send({ res: false, msg: "failed" });
      }
    });
  });
});
module.exports = router;
