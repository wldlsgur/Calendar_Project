var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../DB/db");

router.post("/insert", function (req, res, next) {
  console.log(req.body);
  let { id, pw, name } = req.body;

  if (!id || !pw || !name) {
    return res.send("plz send require elements");
  }
  const hash_pw = bcrypt.hashSync(pw, 10); //암호화
  let query = `INSERT INTO user(id, pw, name, photo_path) VALUES('${id}', '${hash_pw}', '${name}', 'default')`;
  db.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).send({ res: true, msg: "success" });
  });
});

module.exports = router;
