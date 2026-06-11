#!/usr/bin/env node
/**
 * Cria cupons no GHL (payments) — 1 por plano para cada sub-account da agency.
 * Idempotente: pula códigos que já existem. Código <= 25 chars (limite do GHL).
 *
 * Env: GHL_AGENCY_TOKEN, GHL_SUB_TOKEN, GHL_LOCATION
 * Uso:
 *   node scripts/create-ghl-coupons.mjs           # DRY-RUN
 *   node scripts/create-ghl-coupons.mjs --live     # cria (pula existentes)
 *   node scripts/create-ghl-coupons.mjs --emit     # gera content/coupons.generated.ts
 */
import { writeFileSync } from "node:fs";

const V = "2021-07-28";
const BASE = "https://services.leadconnectorhq.com";
const AGENCY = process.env.GHL_AGENCY_TOKEN;
const SUB = process.env.GHL_SUB_TOKEN;
const LOC = process.env.GHL_LOCATION;
const LIVE = process.argv.includes("--live");
const EMIT = process.argv.includes("--emit");

const PLANS = {
  starter: { product: "6a0cbb5dd9543eecdf1cb42d", value: 20, future: true, futureConfig: { type: "fixed", duration: 3, durationType: "months" } },
  growth: { product: "6a0cbc6f9f3f186fa16ba653", value: 50, future: false },
  agency: { product: "6a0cbce993431a895fbde019", value: 50, future: false },
};
const PLAN_KEYS = Object.keys(PLANS);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const h = (t) => ({ Authorization: `Bearer ${t}`, Version: V, "Content-Type": "application/json", Accept: "application/json" });
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const hash3 = (s) => { let x = 5381; for (const c of s) x = ((x << 5) + x + c.charCodeAt(0)) >>> 0; return x.toString(36).slice(0, 3); };

/** Código <= 25 chars: se passar, trunca o slug e injeta hash (mantém unicidade). */
function codeFor(s, plan) {
  const full = s + plan;
  if (full.length <= 25) return full;
  const keep = 25 - plan.length - 3;
  return s.slice(0, keep) + hash3(s) + plan;
}

async function listLocations() {
  const r = await fetch(`${BASE}/locations/search?limit=500`, { headers: h(AGENCY) });
  return (await r.json()).locations || [];
}

async function existingCodes() {
  const set = new Set();
  for (let offset = 0; ; offset += 100) {
    const r = await fetch(`${BASE}/payments/coupon/list?altId=${LOC}&altType=location&limit=100&offset=${offset}`, { headers: h(SUB) });
    const j = await r.json();
    const data = j.data || [];
    for (const c of data) if (c.code) set.add(String(c.code).toLowerCase());
    if (data.length < 100) break;
  }
  return set;
}

async function createCoupon({ name, code, plan }) {
  const p = PLANS[plan];
  const body = {
    altId: LOC, altType: "location", name, code,
    discountType: "amount", discountValue: p.value,
    startDate: "2026-06-11T00:00:00.000Z", productIds: [p.product],
    applyToFuturePayments: p.future,
    ...(p.future ? { applyToFuturePaymentsConfig: p.futureConfig } : {}),
  };
  let r = await fetch(`${BASE}/payments/coupon`, { method: "POST", headers: h(SUB), body: JSON.stringify(body) });
  if (r.status === 429) { await new Promise((x) => setTimeout(x, 2500)); r = await fetch(`${BASE}/payments/coupon`, { method: "POST", headers: h(SUB), body: JSON.stringify(body) }); }
  return { status: r.status, json: await r.json() };
}

async function main() {
  if (!AGENCY || !SUB || !LOC) { console.error("Faltam env GHL_*"); process.exit(1); }
  const locs = await listLocations();
  const bySlug = new Map();
  for (const l of locs) {
    const name = (l.name || l.business?.name || "").trim();
    const s = slug(name);
    if (name && s && !bySlug.has(s)) bySlug.set(s, name);
  }
  const companies = [...bySlug.entries()].map(([s, name]) => ({ slug: s, name }));
  console.log(`sub-accounts: ${locs.length} | empresas únicas: ${companies.length} | cupons-alvo: ${companies.length * 3}`);

  const all = companies.flatMap((c) => PLAN_KEYS.map((plan) => ({ company: c.name, plan, code: codeFor(c.slug, plan) })));

  if (!LIVE && !EMIT) {
    console.log("[DRY-RUN] amostra:");
    all.slice(0, 6).forEach((i) => console.log(" ", i.code, "←", i.company, i.plan));
    return;
  }

  if (LIVE) {
    const existing = await existingCodes();
    console.log(`já existentes no location: ${existing.size}`);
    let ok = 0, skip = 0, err = 0;
    for (const it of all) {
      if (existing.has(it.code.toLowerCase())) { skip++; continue; }
      const r = await createCoupon({ name: `${it.company} ${cap(it.plan)}`, code: it.code, plan: it.plan });
      if (r.status === 200 || r.status === 201) ok++;
      else { err++; console.error("ERRO", it.code, r.status, JSON.stringify(r.json).slice(0, 140)); }
      await new Promise((x) => setTimeout(x, 140));
    }
    console.log(`\nCriados agora: ${ok} | já existiam: ${skip} | erros: ${err}`);
  }

  if (EMIT) {
    const body = all.map((i) => `  { company: ${JSON.stringify(i.company)}, code: ${JSON.stringify(i.code)}, note: ${JSON.stringify("Plano " + cap(i.plan))} },`).join("\n");
    writeFileSync(new URL("../content/coupons.generated.ts", import.meta.url),
      `// GERADO por scripts/create-ghl-coupons.mjs — não editar à mão.\nimport type { Coupon } from "./coupons";\n\nexport const GHL_COUPONS: Coupon[] = [\n${body}\n];\n`);
    console.log(`coupons.generated.ts: ${all.length} cupons`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
