var express = require("express");
var router = express.Router();
const pageController = require("../controller/pageController");

router.get("/", pageController.mainPage);
router.get("/signup", pageController.signUpPage);
router.get("/room", pageController.roomPage);

router.get("/calander", function (req, res) {
  let userId = req.session.user_id;
  let roomId = req.session.room_id;
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
