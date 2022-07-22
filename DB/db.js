const mysql = require("mysql2");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "alone_project",
  multipleStatements: true, // 다중쿼리용 설정
});
db.connect();

module.exports = db;
