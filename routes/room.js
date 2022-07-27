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
    let room_ai = String(result.insertId);
    let query2 = `insert into intoroom(room_id, user_id, chief) value('${room_ai}', '${user_id}', true)`;
    db.query(query2, function (err, result) {
      if (err) {
        return res.status(400).send(400);
      }
      res.status(200).send({ res: true, msg: "success" });
    });
  });
});
module.exports = router;

// router.post() //방 join 참여
// 전체 방 목록 보여주기
// 내 방 목록 보여주기
