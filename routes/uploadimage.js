var express = require("express");
var router = express.Router();

router.post("/uploadimage/:id", function (req, res, next) {
  res.status(200).send({ res: true, msg: "success" });
});

module.exports = router;
