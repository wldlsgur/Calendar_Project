const db = require("../DB/db");

module.exports = {
  insert_image_url: function (id, file_url) {
    let query = `UPDATE user SET image_url='${file_url}' WHERE id='${id}'`;
    db.query(query, function (err, result) {
      if (err) {
        return false;
      }
      return true;
    });
  },
};
