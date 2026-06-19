/**
 * Personalização da demo principal para a agência BOSS.
 * Apenas preços com desconto + links de checkout. Tudo o mais é a demo padrão.
 *
 * IMPORTANTE — paymentLink: os links abaixo apontam, por padrão, para os
 * payment-links atuais (preço de tabela). Para cobrar o valor COM desconto,
 * troque por links/Stripe que cobrem 59 / 99 / 149. [definir links BOSS]
 */
import type { PlanId } from "@/lib/plans";
import { PAYMENT_LINKS } from "@/lib/plans";

export const BOSS_AGENCY = "BOSS";

export type PlanPricing = { price: number; originalPrice?: number; paymentLink?: string };
export type PricingOverride = Partial<Record<PlanId, PlanPricing>>;

export const BOSS_PRICING: PricingOverride = {
  starter: { price: 59, originalPrice: 79, paymentLink: PAYMENT_LINKS.starter },
  growth: { price: 99, originalPrice: 119, paymentLink: PAYMENT_LINKS.growth },
  agency: { price: 149, originalPrice: 249, paymentLink: PAYMENT_LINKS.agency },
};
