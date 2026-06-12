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

export type PlanFilter = "starter" | "growth" | "agency";
const PLAN_KEYS: PlanFilter[] = ["starter", "growth", "agency"];

const planOf = (code: string): PlanFilter | undefined =>
  PLAN_KEYS.find((p) => code.toLowerCase().endsWith(p));

/** URL-safe slug a partir do nome da empresa (usado nos QR codes: ?empresa=slug). */
export function slugifyCompany(name: string): string {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "empresa"
  );
}

export type Company = {
  slug: string;
  name: string;
  /** Código de cupom por plano (ex.: { starter: "FIVERINGSSTARTER", ... }). */
  coupons: Partial<Record<PlanFilter, string>>;
};

/** Empresas agrupadas (1 entrada por empresa, com os 3 códigos de plano). */
export const COMPANIES: Company[] = (() => {
  const byName = new Map<string, Company>();
  for (const c of COUPONS) {
    const plan = planOf(c.code);
    if (!plan) continue;
    let entry = byName.get(c.company);
    if (!entry) {
      entry = { slug: "", name: c.company, coupons: {} };
      byName.set(c.company, entry);
    }
    entry.coupons[plan] = c.code;
  }
  const list = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "pt"));
  const used = new Set<string>();
  for (const e of list) {
    const base = slugifyCompany(e.name);
    let slug = base;
    let i = 2;
    while (used.has(slug)) slug = `${base}-${i++}`;
    used.add(slug);
    e.slug = slug;
  }
  return list;
})();

/** Busca empresa pelo slug (QR ?empresa=slug). */
export function findCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((c) => c.slug === slug.toLowerCase());
}

/** Resolve um código de cupom (QR ?cupom=CODE) → { code exato, plano }. */
export function findCoupon(code: string): { code: string; plan: PlanFilter } | undefined {
  const lc = code.trim().toLowerCase();
  const found = COUPONS.find((c) => c.code.toLowerCase() === lc);
  const plan = planOf(lc);
  return found && plan ? { code: found.code, plan } : undefined;
}

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
