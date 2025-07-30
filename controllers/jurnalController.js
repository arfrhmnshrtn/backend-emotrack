const { GoogleGenAI } = require("@google/genai");
const Jurnal = require("../models/jurnalModel");

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI,
});

const systemPrompt = `
Anggap kamu adalah seorang konselor ahli di bidang kehamilan yang sabar, ramah, dan sangat memahami kebutuhan emosional serta fisik ibu hamil.

Tugas utamamu adalah memberikan saran dan dukungan yang informatif dan penuh empati berdasarkan keluhan harian ibu hamil.

Kamu juga harus menjadi tempat curhat yang aman, mendengarkan dengan empati, dan membalas dengan hangat serta sopan.

Gunakan **bahasa Indonesia yang lembut, hangat, dan mudah dipahami**, serta hindari penggunaan bahasa Inggris kecuali diminta secara eksplisit oleh pengguna.
`;

exports.jurnal = async (req, res) => {
  const { tanggal, keluhan, user_id } = req.body;

  if (!keluhan || !user_id || !tanggal) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  const fullPrompt = `${systemPrompt}\n\nTanggal: ${tanggal}\nKeluhan: ${keluhan}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const aiResponse =
      response.candidates[0]?.content?.parts[0]?.text ||
      "Tidak ada respons dari AI.";

    Jurnal.saveJurnal(user_id, tanggal, keluhan, aiResponse, (err, result) => {
      if (err) {
        console.error("Gagal menyimpan jurnal:", err);
        return res
          .status(500)
          .json({ error: "Gagal menyimpan jurnal ke database" });
      }

      return res
        .status(201)
        .json({ message: "Jurnal berhasil disimpan", response: aiResponse });
    });
  } catch (error) {
    console.error("Error dari Gemini API:", error);
    return res.status(500).json({ error: "Gagal memproses permintaan AI" });
  }
};

exports.getJurnals = async (req, res) => {
  const { user_id } = req.params;

  Jurnal.getJurnals(user_id, (err, result) => {
    if (err) {
      console.error("Gagal mengambil jurnal:", err);
      return res
        .status(500)
        .json({ error: "Gagal mengambil jurnal dari database" });
    }

    return res.json({ jurnals: result });
  });
};
