const mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "express.js",
});
db.connect();

module.exports = db;
