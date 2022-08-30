const Room = require("../model/room");

module.exports = {
  doInsertRoomInfo: async (req, res, next) => {
    let result = await Room.InsertRoomInfo(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doJoinRoom: async (req, res, next) => {
    let result = await Room.JoinRoom(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doShowAllRoomInfo: async (req, res, next) => {
    let result = await Room.ShowAllRoomInfo().catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    console.log(result);
    res.status(200).send(result);
  },
  doShowAllMyRoomInfo: async (req, res, next) => {
    let result = await Room.ShowAllMyRoomInfo.catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doDeleteMyroom: async (req, res, next) => {
    let result = await Room.DeleteMyRoom(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
  doCheckRoomInfo: async (req, res, next) => {
    let result = await Room.CheckRoomInfo(req).catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
    res.status(200).send(result);
  },
};
