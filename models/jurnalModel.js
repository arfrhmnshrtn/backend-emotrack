const db = require("../db");

exports.saveJurnal = (user_id, tanggal, keluhan, response, callback) => {
  db.query(
    "INSERT INTO jurnal_harian (user_id, tanggal, keluhan, response) VALUES (?, ?, ?, ?)",
    [user_id, tanggal, keluhan, response],
    callback
  );
};

exports.getJurnals = (user_id, callback) => {
  db.query(
    "SELECT * FROM jurnal_harian WHERE user_id = ? ORDER BY tanggal DESC",
    [user_id],
    callback
  );
};
