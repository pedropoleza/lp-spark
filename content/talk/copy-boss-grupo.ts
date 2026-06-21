/**
 * Webinar em grupo para o time da BO$$ (100+ agentes, Zoom).
 * Objetivo: o agente perceber valor e FECHAR um plano (QR de checkout) ou
 * agendar uma demo. Desconto exclusivo do evento via cupons por plano.
 *
 * Checkout: usa os payment-links atuais + cupom por plano (couponCode na URL,
 * best-effort; se o GHL não aplicar sozinho, o agente cola o código).
 */
import { PAYMENT_LINKS, type PlanId } from "@/lib/plans";
import { getPlanContent } from "@/content/pt-br";

export const GRUPO = {
  agency: "BO$$",
  demoUrl: "https://internal.sparkleads.pro/widget/bookings/demo-sparkleads",
};

export type GrupoPlan = {
  id: PlanId;
  name: string;
  price: number;
  original: number;
  coupon: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const META: Record<PlanId, { price: number; original: number; coupon: string; featured?: boolean }> = {
  starter: { price: 59, original: 79, coupon: "BOSSSTARTER" },
  growth: { price: 99, original: 119, coupon: "BOSSGROWTH", featured: true },
  agency: { price: 149, original: 249, coupon: "BOSSAGENCY" },
};

export const GRUPO_PLANS: GrupoPlan[] = (["starter", "growth", "agency"] as PlanId[]).map((id) => {
  const c = getPlanContent(id);
  return { id, name: c.name, tagline: c.tagline, features: c.features.slice(0, 4), ...META[id] };
});

/** URL de checkout do plano com o cupom do evento pré-aplicado (para o QR). */
export function checkoutUrl(plan: { id: PlanId; coupon: string }) {
  const base = PAYMENT_LINKS[plan.id];
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}couponCode=${encodeURIComponent(plan.coupon)}`;
}
