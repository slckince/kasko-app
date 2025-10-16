export function getMockQuotes({ marka, model, yil }) {
  const teklifler = [
    { sirket: "Allianz", fiyat: 8200, coverage: "Tam kapsam" },
    { sirket: "Axa", fiyat: 8450, coverage: "Mini onarım + yol yardımı" },
    { sirket: "Mapfre", fiyat: 8750, coverage: "Hasarsızlık indirimi uygulanmış" }
  ].map(t => ({ ...t, fiyat: t.fiyat + Math.floor(Math.random() * 500) }));

  return {
    baslik: `${yil} ${marka} ${model} için kasko teklifleri`,
    teklifler
  };
}
