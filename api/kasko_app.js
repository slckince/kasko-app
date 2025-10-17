import { getMockQuotes } from "./quotes.js";


export const functions = {
  getKaskoTeklifi: {
    description: "Araç bilgilerine göre kasko tekliflerini döner.",
    parameters: {
      type: "object",
      properties: {
        marka: { type: "string", description: "Araç markası" },
        model: { type: "string", description: "Araç modeli" },
        yil: { type: "integer", description: "Araç yılı" },
        sehir: { type: "string", description: "Şehir (opsiyonel)" }
      },
      required: ["marka", "model", "yil"]
    },
    async handler({ marka, model, yil, sehir }) {
      const result = getMockQuotes({ marka, model, yil });
      return {
        baslik: result.baslik,
        teklifler: result.teklifler,
        sehir: sehir || "Belirtilmedi"
      };
    }
  }
};

