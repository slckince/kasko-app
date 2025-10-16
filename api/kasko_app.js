import { getMockQuotes } from "./quotes.js";

/**
 * ChatGPT SDK + HTTP dual mod handler
 * Bu dosya hem ChatGPT Apps SDK fonksiyon formatını hem de
 * normal REST endpoint yapısını destekler.
 */

export const functions = {
  getKaskoTeklifi: {
    description: "Araç bilgilerine göre kasko tekliflerini döner.",
    parameters: {
      type: "object",
      properties: {
        marka: { type: "string", description: "Araç markası, örn: Toyota" },
        model: { type: "string", description: "Araç modeli, örn: Corolla" },
        yil: { type: "integer", description: "Araç üretim yılı, örn: 2020" },
        sehir: { type: "string", description: "Araç bulunduğu şehir (opsiyonel)" }
      },
      required: ["marka", "model", "yil"]
    },
    async handler({ marka, model, yil, sehir }) {
      if (!marka || !model || !yil) {
        throw new Error("Gerekli parametreler eksik: marka, model, yil");
      }

      const result = getMockQuotes({ marka, model, yil });
      return {
        baslik: result.baslik,
        teklifler: result.teklifler,
        sehir: sehir || "Belirtilmedi"
      };
    }
  }
};

// 🧩 Vercel endpoint (Postman için)
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { marka, model, yil, sehir } = req.body;

      if (!marka || !model || !yil) {
        return res.status(400).json({ error: "Eksik parametre: marka, model, yil gerekli." });
      }

      const result = await functions.getKaskoTeklifi.handler({ marka, model, yil, sehir });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "GET") {
    // Sağlık kontrolü (Health Check)
    return res.status(200).json({
      status: "ok",
      message: "Kasko App API aktif. POST isteğiyle test edebilirsin."
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
