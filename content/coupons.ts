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

/** Código público "amigável" da empresa: nome compacto + "off" (ex.: jonathanduqueoff). */
export function offCodeFor(name: string): string {
  const compact = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
  return `${compact || "empresa"}off`;
}

export type Company = {
  slug: string;
  name: string;
  /** Código público exibido ao cliente (nome+off). É só rótulo de busca. */
  offCode: string;
  /** Códigos REAIS do GHL por plano (ex.: { starter: "FIVERINGSSTARTER", ... }). */
  coupons: Partial<Record<PlanFilter, string>>;
};

/** Empresas agrupadas (1 entrada por empresa, com os 3 códigos reais de plano). */
export const COMPANIES: Company[] = (() => {
  const byName = new Map<string, Company>();
  for (const c of COUPONS) {
    const plan = planOf(c.code);
    if (!plan) continue;
    let entry = byName.get(c.company);
    if (!entry) {
      entry = { slug: "", name: c.company, offCode: offCodeFor(c.company), coupons: {} };
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

/** code REAL (uppercase) → offCode público, para exibir o rótulo no checkout. */
const CODE_TO_OFF = new Map<string, string>();
for (const c of COMPANIES) {
  for (const p of PLAN_KEYS) {
    const real = c.coupons[p];
    if (real) CODE_TO_OFF.set(real.toUpperCase(), c.offCode);
  }
}
/** Rótulo público (nome+off) a partir do código real do GHL. */
export function labelForCode(code: string): string {
  return CODE_TO_OFF.get(code.toUpperCase()) ?? code;
}

/** Busca empresa pelo slug (QR ?empresa=slug). */
export function findCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((c) => c.slug === slug.toLowerCase());
}

/** Resultado de busca exibido ao cliente: rótulo público + código real aplicado. */
export type CouponHit = {
  company: string;
  /** Rótulo público mostrado/buscado (nome+off). */
  label: string;
  /** Código REAL do GHL que é de fato aplicado no checkout. */
  code: string;
};

/**
 * Busca por empresa OU pelo código público (nome+off) — 1 resultado por empresa.
 * `label` é o cupom público (ex.: fiveringsoff); `code` é o cupom real do GHL
 * correspondente ao `plan` (ex.: FIVERINGSSTARTER), que é o aplicado no checkout.
 */
export function searchCoupons(query: string, plan?: PlanFilter, limit = 12): CouponHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: CouponHit[] = [];
  for (const c of COMPANIES) {
    if (!c.name.toLowerCase().includes(q) && !c.offCode.includes(q)) continue;
    const code = plan ? c.coupons[plan] : c.coupons.starter ?? c.coupons.growth ?? c.coupons.agency;
    if (!code) continue;
    hits.push({ company: c.name, label: c.offCode, code });
    if (hits.length >= limit) break;
  }
  return hits;
}
