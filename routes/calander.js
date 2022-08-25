var express = require("express");
var router = express.Router();
var db = require("../DB/db");
var cookie = require("cookie");

/* GET home page. */
router.post("/", function (req, res, next) {
  const { date, content } = req.body;
  const user_id = req.session.user_id;
  const room_id = req.session.room_id;
  let query = `insert into content(room_id,user_id,date,content) value('${room_id}', '${user_id}', '${date}', '${content}')`;
  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send({ res: true, msg: "success" });
  });
});

router.delete("/", function (req, res) {
  const { contentId } = req.body;
  let query = `delete from content where content_id = '${contentId}'`;

  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send({ res: true, msg: "success" });
  });
});

router.get("/content", function (req, res) {
  const date = req.query.date;
  const room_id = req.session.room_id;
  let query = `select c.content_id, c.user_id, c.date, c.content, u.name, u.photo_path
  from content as c
  inner join user as u on c.user_id = u.id
  where c.room_id = ${room_id} AND c.date like '%${date}%'
  `;
  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result);
  });
});

router.get("/personnel", function (req, res) {
  const { roomId } = req.query;
  let query = `SELECT i.user_id, i.chief, u.name, u.photo_path
  FROM intoroom as i
  inner join user as u on i.user_id = u.user_id
  where i.room_id = '${roomId}'`;

  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result);
  });
});
module.exports = router;
