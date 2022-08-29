const User = require("../model/user");

const userController = {
  doSignUp: async (req, res, next) => {
    let result = await User.SignUp(req.body).catch((err) => {
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doSameIdCheck: async (req, res, next) => {
    let result = await User.SameIdCheck(req.params.id).catch((err) => {
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doLoginCheck: async (req, res, next) => {
    let result = await User.LoginCheck(req).catch((err) => {
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
};

module.exports = userController;
