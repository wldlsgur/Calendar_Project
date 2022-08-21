var express = require("express");
var router = express.Router();
var db = require("../DB/db");
var cookie = require("cookie");

/* GET home page. */
router.post("/", function (req, res, next) {
  const { date, content } = req.body;
  const user_id = res.cookies.id;
  const room_id = res.cookies.room_id;
  let query = `insert into content(room_id,user_id,date,content) value('${room_id}', '${user_id}', '${date}', '${content}')`;
  console.log(query);
  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send({ res: true, msg: "success" });
  });
});
module.exports = router;
