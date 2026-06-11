import { GHL_COUPONS } from "./coupons.generated";

/**
 * Cupons por empresa — usados no buscador "Procure o seu cupom" do checkout.
 * A lista real vem de content/coupons.generated.ts (gerada por
 * scripts/create-ghl-coupons.mjs a partir dos sub-accounts da agency no GHL).
 */
export type Coupon = {
  /** Nome da empresa (o cliente pesquisa por aqui). */
  company: string;
  /** Código a copiar e colar no checkout. */
  code: string;
  /** Descrição curta do benefício (opcional). */
  note?: string;
};

export const COUPONS: Coupon[] = GHL_COUPONS;

type PlanFilter = "starter" | "growth" | "agency";

/**
 * Busca cupons por empresa (contém, case-insensitive).
 * Se `plan` for informado, retorna só os cupons daquele plano — o código sempre
 * termina no nome do plano (ex.: "...starter" / "...growth" / "...agency").
 */
export function searchCoupons(query: string, plan?: PlanFilter, limit = 12): Coupon[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return COUPONS.filter(
    (c) => c.company.toLowerCase().includes(q) && (!plan || c.code.toLowerCase().endsWith(plan)),
  ).slice(0, limit);
}
