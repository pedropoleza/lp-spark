/**
 * Cupons por empresa — usados no buscador "Procure o seu cupom" do checkout.
 *
 * ⚠️ SUBSTITUIR pelos cupons reais. Pode crescer livremente; o ideal futuro é
 * plugar numa API/planilha, mas este arquivo já funciona como fonte estática.
 */
export type Coupon = {
  /** Nome da empresa (o cliente pesquisa por aqui). */
  company: string;
  /** Código a copiar e colar no checkout. */
  code: string;
  /** Descrição curta do benefício (opcional). */
  note?: string;
};

export const COUPONS: Coupon[] = [
  { company: "Five Rings Financial", code: "FIVERINGS", note: "Parceria oficial Five Rings" },
  { company: "Spark Leads", code: "SPARK10", note: "10% no primeiro mês" },
  // ... adicione os cupons reais aqui
];

/** Busca cupons por empresa (contém, case-insensitive). */
export function searchCoupons(query: string, limit = 8): Coupon[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return COUPONS.filter((c) => c.company.toLowerCase().includes(q)).slice(0, limit);
}
