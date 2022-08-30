const Page = require("../model/page");

const pageController = {
  mainPage: async (req, res, next) => {
    await Page.DeleteSession(req).catch((err) => {
      console.log(err);
      res.status(400).sned(err);
    });
    res.status(200).render("index.ejs");
  },

  signUpPage: (req, res, next) => {
    res.status(200).render("signup.ejs");
  },

  roomPage: async (req, res, next) => {
    let result = await Page.GetUserInfo(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });

    res.status(200).render("room.ejs", {
      user_id: result[0].user_id,
      id: result[0].id,
      name: result[0].name,
      photo_path: result[0].photo_path,
    });
  },

  calanderPage: async (req, res, next) => {
    let roomId = req.session.room_id;
    let result = await Page.GetUserInfo(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.render("calander.ejs", {
      user_id: result[0].user_id,
      id: result[0].id,
      name: result[0].name,
      photo_path: result[0].photo_path,
      room_id: roomId,
    });
  },
};

module.exports = pageController;
