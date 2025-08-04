const db = require("../db");

exports.saveGizi = (
  user_id,
  tanggal,
  berat_badan,
  waktu,
  jumlah,
  satuan,
  makanan,
  response, // response dari AI
  callback
) => {
  db.query(
    "INSERT INTO gizi_harian (user_id, tanggal, berat_badan, waktu, jumlah, satuan, makanan, response) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, tanggal, berat_badan, waktu, jumlah, satuan, makanan, response],
    callback
  );
};

exports.getGiziByUser = (user_id, callback) => {
  db.query(
    "SELECT * FROM gizi_harian WHERE user_id = ? ORDER BY tanggal DESC",
    [user_id],
    callback
  );
};

exports.getGiziById = (id, callback) => {
  db.query("SELECT * FROM gizi_harian WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // bisa null kalau tidak ditemukan
  });
};
