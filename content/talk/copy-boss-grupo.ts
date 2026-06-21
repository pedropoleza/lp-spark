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

/* ————————————————————————————————————————————————————————————
 * Camada de valor / persuasão (informada pela pesquisa de webinar de grupo).
 * ———————————————————————————————————————————————————————————— */

/* 1. Capa */
export const COVER_GRUPO = {
  eyebrow: "Feito para o time da",
  title: "As vendas que você já tem.",
  sub: "Nos próximos 30 minutos: a ferramenta que organiza, responde e fecha por você. E uma condição que é só de vocês, hoje.",
};

/* 2. Endosso da Natália (autoridade + unidade — o ativo mais forte da sala).
 * [Natália: ideal é você falar isto ao vivo na câmera. A frase é editável.] */
export const NATALIA_GRUPO = {
  eyebrow: "Por que vocês estão aqui",
  name: "Natália",
  role: "Liderança · BO$$",
  quote: "Eu vi o Spark, entendi o que ele faz pela operação, e quis trazer pro time inteiro conhecer.",
  body: "Quando a liderança aposta numa ferramenta, vale prestar atenção. Hoje é a sua vez de ver e decidir.",
};

/* 4. Gancho de valor + ativação do chat (primeiros 60s) */
export const HOOK_GRUPO = {
  question: "Quanto a sua semana deixou na mesa, sem você ver?",
  sub: "Não é falta de lead. É o follow-up que não saiu, o cliente que sumiu no WhatsApp, a renovação que passou.",
  chat: "Manda no chat: quantos leads você perdeu de vista esse mês?",
};

/* 7. SparkBot (o destaque) */
export const SPARKBOT_GRUPO = {
  eyebrow: "O seu novo melhor funcionário",
  title: "O SparkBot trabalha o seu WhatsApp por você.",
  points: [
    "Responde na hora, qualifica o lead e marca a reunião.",
    "Puxa a apólice, resume a conversa, dispara o follow-up.",
    "Você dorme. Ele continua atendendo.",
  ],
  punch: "É um assistente que nunca esquece e nunca dorme, dentro do WhatsApp que você já usa.",
};

/* 9. Intro da oferta (transição valor → pitch + stack + âncora) */
export const OFFER_INTRO_GRUPO = {
  eyebrow: "Condição exclusiva do time BO$$",
  title: "E pra vocês, só nesta chamada, o Spark sai por menos.",
  stack: [
    "O CRM completo, com follow-up automático.",
    "O SparkBot atendendo no seu WhatsApp.",
    "Migração e setup feitos com você.",
  ],
  note: "Os mesmos planos de sempre, com um desconto que vale só hoje, pra quem está aqui.",
};
