var express = require("express");
var router = express.Router();
var db = require("../DB/db");
const bcrypt = require("bcrypt");

router.post("/make", function (req, res) {
  let { user_id, title, pw, people } = req.body;

  let query = `insert into room(title, pw, people) value('${title}', '${pw}', '${people}')`;
  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    if (result.insert !== 0) {
      let query2 = `insert into intoroom(room_id, user_id) value('${result[0].insertId}', '${user_id}')`;
      db.query(query2, function (err, result) {
        if (err) {
          return res.status(400).send(400);
        }
        res.status(200).send({ res: true, msg: "success" });
      });
    }
  });
});
module.exports = router;
