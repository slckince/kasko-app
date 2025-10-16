import { getMockQuotes } from "./quotes.js";

export default {
  functions: {
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
  }
};
