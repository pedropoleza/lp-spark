/**
 * Spark Leads — configuração de planos.
 *
 * IMPORTANTE — Product ID vs Price ID:
 * - `productId` (prod_...) identifica o PRODUTO no Stripe. É apenas referência.
 * - `priceId` (price_...) é o que DEVE ser usado em `line_items` do Checkout Session.
 *   Nunca passe um Product ID em `line_items`.
 *
 * Os Price IDs reais devem ser definidos por variável de ambiente
 * (STRIPE_PRICE_STARTER / STRIPE_PRICE_GROWTH / STRIPE_PRICE_AGENCY).
 * Os valores `price_xxx_*` são apenas placeholders — substitua no .env.
 */

export type PlanId = "starter" | "growth" | "agency";

export const PLANS = {
  starter: {
    name: "Starter",
    price: 79,
    productId: "prod_UXzOUwJ7hVRqNI",
    // TROCAR pelo Price ID real via env STRIPE_PRICE_STARTER
    priceId: process.env.STRIPE_PRICE_STARTER || "price_xxx_starter",
  },
  growth: {
    name: "Growth",
    price: 119,
    productId: "prod_UXzTvmFOXqbhPW",
    // TROCAR pelo Price ID real via env STRIPE_PRICE_GROWTH
    priceId: process.env.STRIPE_PRICE_GROWTH || "price_xxx_growth",
  },
  agency: {
    name: "Agency",
    price: 249,
    productId: "prod_UXzVvD1ci47Aup",
    // TROCAR pelo Price ID real via env STRIPE_PRICE_AGENCY
    priceId: process.env.STRIPE_PRICE_AGENCY || "price_xxx_agency",
  },
} as const;

export function isValidPlan(plan: unknown): plan is PlanId {
  return plan === "starter" || plan === "growth" || plan === "agency";
}

/** Preços expostos ao client (sem segredos). */
export const PLAN_PRICES: Record<PlanId, number> = {
  starter: PLANS.starter.price,
  growth: PLANS.growth.price,
  agency: PLANS.agency.price,
};
