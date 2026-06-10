/**
 * Camada de instrumentação de analytics.
 *
 * Hoje apenas registra no console em dev e empurra para `window.dataLayer`
 * quando existir. Está preparada para futura integração com GA4 / Meta Pixel
 * sem espalhar chamadas pelo código — basta plugar o provider aqui.
 *
 * NÃO inserir pixels reais sem as chaves configuradas.
 */

export type AnalyticsEvent =
  | "hero_cta_clicked"
  | "quiz_started"
  | "quiz_completed"
  | "plan_recommended"
  | "plan_selected"
  | "checkout_form_opened"
  | "checkout_form_submitted"
  | "checkout_session_created"
  | "checkout_redirected"
  | "checkout_error"
  | "faq_opened";

type Payload = Record<string, unknown>;

export function trackEvent(name: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  const event = { event: name, ...payload, ts: Date.now() };

  // GA4 / GTM dataLayer (no-op se não existir).
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(event);
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, payload);
  }
}
