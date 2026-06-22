/**
 * Checkout dedicado (deep-linkável) + wizard de boas-vindas.
 * Motor: GHL payment-links (envelopados pelo nosso site). Contato é coletado
 * uma vez SÓ no GHL. Redirect pós-pagamento via param `redirectUrl` no link
 * (sem precisar configurar no painel do GHL).
 */
import type { PlanId } from "@/lib/plans";
import { PAYMENT_LINKS } from "@/lib/plans";
import { getPlanContent } from "@/content/pt-br";

export const SUPPORT_WHATSAPP = "https://wa.me/17866276787";
export const APP_LOGIN_URL = "https://app.sparkleads.pro/";

/** Agenda de onboarding por plano (widgets de booking do GHL). */
export const ONBOARDING_CALENDARS: Record<PlanId, string> = {
  starter: "https://internal.sparkleads.pro/widget/booking/vqLd8v3bKHe0DcuKMQHC",
  growth: "https://internal.sparkleads.pro/widget/booking/ntvREOQo0X7IUHUWWvR7",
  agency: "https://internal.sparkleads.pro/widget/booking/FCgAouxCpJY8R28UGNbT",
};

/** Taxa de ativação (alavanca de cupom — isenta com cupom). [ajustar se mudar] */
export const ACTIVATION_FEE: Record<PlanId, number> = { starter: 80, growth: 80, agency: 100 };

export function planSummary(id: PlanId) {
  const c = getPlanContent(id);
  return { id, name: c.name, price: c.price, tagline: c.tagline, features: c.features };
}

/**
 * Monta a URL do payment-link do GHL com cupom + redirect pós-pagamento.
 * `redirectUrl` deve ser absoluto (montado no client com origin + basePath).
 */
export function checkoutLink(id: PlanId, opts: { coupon?: string | null; redirectUrl?: string } = {}) {
  const base = PAYMENT_LINKS[id];
  const params = new URLSearchParams();
  if (opts.coupon) params.set("couponCode", opts.coupon);
  if (opts.redirectUrl) {
    params.set("redirectUrl", opts.redirectUrl);
    params.set("redirectIn", "2");
  }
  const qs = params.toString();
  return qs ? `${base}${base.includes("?") ? "&" : "?"}${qs}` : base;
}

/** Copy do wizard de boas-vindas (editável). */
export const WELCOME = {
  title: "Você entrou. Bem-vindo ao Spark!",
  sub: "Falta um passo rápido: marque a sua sessão de onboarding. A gente configura tudo com você, em uns 30 minutos.",
  selfServeNote: "Prefere começar agora, por conta própria? Você também pode, e o onboarding guiado te acompanha.",
  next: [
    { t: "Antes da sessão", d: "Você não precisa preparar nada." },
    { t: "Na sessão", d: "Um especialista configura a sua conta junto com você." },
    { t: "Depois", d: "Você acessa pelo seu e-mail e começa a usar." },
  ],
  instructions:
    "As instruções de acesso chegam no seu WhatsApp e no seu e-mail. Você acessa o Spark pelo e-mail: crie a sua senha pelo link que enviamos antes de entrar.",
};
