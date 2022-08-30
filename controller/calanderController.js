const calander = require("../model/calander");

module.exports = {
  doInsertCalanderInfo: async (req, res, next) => {
    let result = await calander.InsertCalanderInfo(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doDeleteCalanderInfo: async (req, res, next) => {
    let result = await calander.DeleteCalanderInfo(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doGetCalanderContent: async (req, res, next) => {
    let result = await calander.GetCalanderContent(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doGetCalanderPersonnel: async (req, res, next) => {
    let result = await calander.GetCalanderPersonnel(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
};
