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


