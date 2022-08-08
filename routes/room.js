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

router.get("/show/all", function (req, res) {
  let query = `select room_id, title, people from room`;

  db.query(query, async function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    for (let i = 0; i < result.length; i++) {
      let query2 = `select count(*) as nowpeople from intoroom where room_id=${result[i].room_id}`;
      await new Promise((resolve, reject) => {
        db.query(query2, function (err, result2) {
          if (err) {
            reject(err);
          }
          resolve(result2);
        });
      })
        .then((result2) => {
          result[i].nowpeople = String(result2[0].nowpeople);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    }
    res.status(200).send(result);
  });
});

router.get("/show/my", function (req, res) {
  let user_id = req.cookies.id;
  let query = `select i.room_id, i.chief, r.title, r.people from intoroom as i inner join room as r on i.room_id = r.room_id where i.user_id = '${user_id}'`;
  db.query(query, async function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    for (let i = 0; i < result.length; i++) {
      let query2 = `select count(*) as nowpeople from intoroom where room_id=${result[i].room_id}`;
      await new Promise((resolve, reject) => {
        db.query(query2, function (err, result2) {
          if (err) {
            reject(err);
          }
          resolve(result2);
        });
      })
        .then((result2) => {
          result[i].nowpeople = String(result2[0].nowpeople);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    }
    res.status(200).send(result);
  });
});

router.delete("/myroom", function (req, res) {
  const key = req.query.key;
  const query = `delete from room where room_id = ${key}`;
  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send({ res: true, msg: "success" });
  });
});

router.post("/check", function (req, res) {
  const { room_id, pw } = req.body;
  const query = `select * from room where room_id='${room_id}' AND pw='${pw}'`;
  console.log(query);

  db.query(query, function (err, result) {
    if (err) {
      return res.status(400).send(err);
    }
    if (!result[0]) {
      return res.status(200).send({ res: false, msg: "failed" });
    }
    res.status(200).send({ res: true, msg: "success" });
  });
});
// router.post() //방 join 참여
