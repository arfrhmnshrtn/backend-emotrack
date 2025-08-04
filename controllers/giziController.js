const Gizi = require("../models/giziModel");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY_GEMINI,
});

const systemPrompt = `
Kamu adalah ahli gizi untuk ibu hamil.

Tugasmu:
1. Berikan informasi kapan user input waktu makan.
2. Hitung total kalori, protein, lemak, dan karbohidrat dari makanan berikut.
3. Berikan saran makanan atau minuman tambahan dalam bentuk list.

Jawaban hanya berupa jumlah gizi dan list saran. Tidak perlu penjelasan.
`;
exports.SaveGizi = async (req, res) => {
  const { user_id, tanggal, berat_badan, waktu, jumlah, satuan, makanan } =
    req.body;

  if (
    !user_id ||
    !tanggal ||
    !berat_badan ||
    !waktu ||
    !jumlah ||
    !satuan ||
    !makanan
  ) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  const fullPrompt = `
${systemPrompt}

Berikut data dari pengguna:
- Berat badan: ${berat_badan} kg
- Waktu makan: ${waktu}
- Jumlah: ${jumlah} ${satuan}
- Makanan: ${makanan}

Berikan analisis gizi secara singkat dan saran praktis.`;
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

    Gizi.saveGizi(
      user_id,
      tanggal,
      berat_badan,
      waktu,
      jumlah,
      satuan,
      makanan,
      aiResponse,
      (err, result) => {
        if (err) {
          console.error("Error saving gizi:", err);
          return res
            .status(500)
            .json({ error: "Gagal menyimpan gizi ke database" });
        }

        return res.json({ response: response.text });
      }
    );
  } catch (error) {
    console.error("Error saving gizi:", error);
    return res.status(500).json({ error: "Gagal menyimpan gizi ke database" });
  }
};

exports.getGiziByUser = (req, res) => {
  const user_id = req.params.user_id;

  Gizi.getGiziByUser(user_id, (err, results) => {
    if (err) {
      console.error("Error fetching gizi:", err);
      return res.status(500).json({ error: "Gagal mengambil data gizi" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Data gizi tidak ditemukan" });
    }

    return res.json({ gizis: results });
  });
};

exports.getGiziById = (req, res) => {
  const id = req.params.id;

  Gizi.getGiziById(id, (err, result) => {
    if (err) {
      console.error("Error fetching gizi by ID:", err);
      return res.status(500).json({ error: "Gagal mengambil data gizi" });
    }

    if (!result) {
      return res.status(404).json({ message: "Data gizi tidak ditemukan" });
    }

    return res.json({ gizi: result });
  });
};
