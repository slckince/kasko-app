// package.json içinde "type": "module" olduğundan emin ol
export const config = {
  runtime: "nodejs"
};

// --- SDK fonksiyon tanımı ---
const functions = {
  getKaskoTeklifi: {
    description: "Araç bilgilerine göre kasko tekliflerini döner.",
    parameters: {
      type: "object",
      properties: {
        marka: { type: "string" },
        model: { type: "string" },
        yil: { type: "integer" },
        sehir: { type: "string" }
      },
      required: ["marka", "model", "yil"]
    },
    async handler({ marka, model, yil, sehir }) {
      const teklifler = [
        { sirket: "Allianz", fiyat: 8200 },
        { sirket: "Axa", fiyat: 8450 },
        { sirket: "Mapfre", fiyat: 8750 }
      ];
      return {
        baslik: `${yil} ${marka} ${model} için kasko teklifleri`,
        teklifler,
        sehir: sehir || "Belirtilmedi"
      };
    }
  }
};

// --- Vercel endpoint ---
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return res.status(200).json({
        status: "ok",
        message: "Kasko API aktif. POST ile test edebilirsin."
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { marka, model, yil, sehir } = req.body || {};
    if (!marka || !model || !yil) {
      return res.status(400).json({ error: "Eksik parametre: marka, model, yil gerekli." });
    }

    const result = await functions.getKaskoTeklifi.handler({ marka, model, yil, sehir });
    return res.status(200).json(result);

  } catch (err) {
    console.error("Hata:", err);
    return res.status(500).json({ error: err.message });
  }
}
