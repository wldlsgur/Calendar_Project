const db = require("../DB/db");

module.exports = {
  insert_image_url: function (id, file_url) {
    let query = `UPDATE user SET photo_path='${file_url}' WHERE id='${id}'`;
    console.log(id, file_url, query);
    db.query(query, function (err, result) {
      if (err) {
        return false;
      }
      return true;
    });
  },
};
