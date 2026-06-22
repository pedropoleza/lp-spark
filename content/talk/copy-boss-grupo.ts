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

/* ————————————————————————————————————————————————————————————
 * Revamp: valor pro agente, analogia do "sócio", e o SparkBot proativo
 * com cara de WhatsApp (o coração da apresentação).
 * ———————————————————————————————————————————————————————————— */

/* Ponte/analogia que prepara o SparkBot. */
export const SOCIO_GRUPO = {
  eyebrow: "Imagina por um segundo...",
  title: "E se você tivesse um sócio que nunca dorme?",
  lines: [
    "Que acorda antes de você, com o dia já pronto.",
    "Que cobra os leads que você esqueceu.",
    "Que faz o follow-up enquanto você está em reunião.",
    "Que nunca tira férias e nunca pede comissão.",
  ],
  punch: "Esse sócio existe. Ele mora no seu WhatsApp e se chama SparkBot.",
};

/* SparkBot — proatividade (os momentos do dia). */
export const SPARKBOT_HERO = {
  eyebrow: "O seu sócio no WhatsApp",
  title: "O SparkBot não espera. Ele te procura.",
  moments: [
    { when: "De manhã", what: "Te entrega o dia pronto: reuniões, leads quentes e renovações." },
    { when: "Durante o dia", what: "Responde e qualifica os leads na hora, no WhatsApp que você já usa." },
    { when: "Depois da reunião", what: "Registra, dispara o follow-up e marca o próximo passo sozinho." },
    { when: "Fim do dia", what: "Resume o que rolou e já deixa o amanhã preparado." },
  ],
  punch: "Não é um chatbot que espera você perguntar. É um sócio que age sozinho.",
};

/* A conversa proativa do SparkBot (um dia), renderizada com a cara do WhatsApp. */
export type ChatMsg = { from: "bot" | "me"; time: string; text: string };
export const SPARKBOT_CHAT: ChatMsg[] = [
  { from: "bot", time: "07:32", text: "Bom dia! ☀️ Hoje você tem 3 reuniões, 2 leads quentes esperando retorno e a renovação da Família Silva vence amanhã." },
  { from: "bot", time: "07:32", text: "Confirmo as reuniões e mando um lembrete pros leads?" },
  { from: "me", time: "07:33", text: "Bora 👍" },
  { from: "bot", time: "07:33", text: "Feito ✅ Reuniões confirmadas e lembretes enviados pro João e pra Ana." },
  { from: "bot", time: "14:10", text: "Como foi a reunião com a Maria? Quer que eu já dispare a simulação no follow-up?" },
  { from: "me", time: "14:11", text: "Foi ótima! Manda 🙌" },
  { from: "bot", time: "14:11", text: "Enviado 📨 Marquei a Maria como “proposta enviada” e agendei o retorno pra sexta." },
  { from: "bot", time: "18:30", text: "Resumo do dia: 9 leads atendidos, 2 reuniões marcadas. O Pedro respondeu, ele quer fechar 🔥" },
  { from: "bot", time: "18:30", text: "Amanhã 9h: renovação da Família Silva. Já deixei o resumo da apólice pronto pra você." },
];

/* O valor que o agente leva (3 pilares). */
export const VALUE_GRUPO = {
  eyebrow: "O que isso vira pra você",
  title: "Mais comissão. Menos correria.",
  pillars: [
    { title: "Mais vendas", body: "Nenhum lead esfria. O follow-up sai sempre, na hora certa. Você fecha o que hoje escapa." },
    { title: "Mais tempo", body: "O SparkBot faz a parte chata. As horas que somem em admin voltam pra você vender, ou viver." },
    { title: "Menos cabeça", body: "Tudo num lugar só. Você para de carregar a operação na memória e dorme tranquilo." },
  ],
  punch: "É isso que o Spark te devolve: o seu tempo e o seu dinheiro.",
};
