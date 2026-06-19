"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Copy, Check, Lock, ShieldCheck, ExternalLink, Ticket, X } from "lucide-react";
import { Modal } from "./ui/Modal";
import { useSpark } from "./spark-context";
import { useDemoOptional } from "./demo/demo-context";
import { PAYMENT_LINKS, PLAN_PRICES } from "@/lib/plans";
import { PLAN_CONTENT } from "@/content/pt-br";
import { searchCoupons, labelForCode } from "@/content/coupons";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Monta a URL do payment-link com o cupom via QUERY STRING (não quebra a rota
 * do GHL — path-style dá 404). Best-effort: se o GHL não ler esse parâmetro, o
 * cupom segue copiado para colar manualmente no campo de cupom.
 */
function linkWithCoupon(base: string, code: string | null) {
  if (!code) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}couponCode=${encodeURIComponent(code)}`;
}

export function CheckoutModal() {
  const { checkoutPlan, checkoutCoupon, closeCheckout } = useSpark();
  const demo = useDemoOptional();
  const open = checkoutPlan !== null;
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (open) {
      trackEvent("checkout_form_opened", { plan: checkoutPlan, coupon: checkoutCoupon });
      setQuery("");
      setApplied(checkoutCoupon ?? null); // cupom vindo de QR/deep-link já entra aplicado
      setSheetOpen(false);
    }
  }, [open, checkoutPlan, checkoutCoupon]);

  // Trava o auto-zoom do iOS (input <16px e campos do iframe) enquanto o
  // checkout está aberto; restaura o viewport original ao fechar.
  useEffect(() => {
    if (!open) return;
    const vp = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!vp) return;
    const prev = vp.getAttribute("content");
    vp.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
    return () => {
      if (prev) vp.setAttribute("content", prev);
    };
  }, [open]);

  const results = useMemo(() => searchCoupons(query, checkoutPlan ?? undefined), [query, checkoutPlan]);

  async function applyCoupon(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard indisponível */
    }
    setApplied(code);
    setSheetOpen(false);
    trackEvent("checkout_session_created", { coupon: code, action: "apply" });
  }

  if (!checkoutPlan) {
    return (
      <Modal open={false} onClose={closeCheckout} variant="page">
        {null}
      </Modal>
    );
  }

  const plan = PLAN_CONTENT.find((p) => p.id === checkoutPlan)!;
  const over = demo?.pricing?.[checkoutPlan];
  const price = over?.price ?? PLAN_PRICES[checkoutPlan];
  const original = over?.originalPrice;
  const paymentLink = over?.paymentLink ?? PAYMENT_LINKS[checkoutPlan];
  const iframeSrc = linkWithCoupon(paymentLink, applied);
  const appliedLabel = applied ? labelForCode(applied) : null;

  /* —— campo de busca + resultados (reutilizado no desktop e no bottom sheet) —— */
  const couponSearch = (
    <>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nome da sua empresa..."
          /* text-base (16px) evita o auto-zoom do iOS ao focar */
          className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-3 text-base outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30 md:text-sm"
          aria-label="Procurar cupom pela empresa"
        />
      </div>

      <div className="mt-3 space-y-2">
        {results.map((c) => {
          const active = applied === c.code;
          return (
            <button
              key={c.code}
              onClick={() => applyCoupon(c.code)}
              className={cn(
                "flex w-full flex-col items-start gap-2 rounded-xl border p-3 text-left transition active:scale-[0.99] md:flex-row md:items-center md:justify-between md:gap-3",
                active ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/[0.03] hover:border-accent/40",
              )}
            >
              <div className="w-full min-w-0">
                <p className="truncate text-sm font-medium text-cream">{c.company}</p>
                <p className="truncate text-[11px] text-muted">Cupom de indicação</p>
              </div>
              <span
                className={cn(
                  "inline-flex w-full shrink-0 items-center justify-between gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs font-semibold md:w-auto md:justify-start",
                  active ? "border-accent bg-accent text-ink" : "border-accent/40 bg-accent/10 text-accent",
                )}
              >
                <span className="break-all">{c.label}</span>
                {active ? <Check className="h-3.5 w-3.5 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0 opacity-70" />}
              </span>
            </button>
          );
        })}

        {query.trim() && results.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted">
            Nenhum cupom encontrado para “{query}”. Confira a grafia ou siga sem cupom — é opcional.
          </p>
        )}
        {!query.trim() && (
          <p className="px-1 text-[11px] text-muted">Sem cupom? Tudo bem, ele é opcional no checkout.</p>
        )}
      </div>
    </>
  );

  return (
    <Modal open={open} onClose={closeCheckout} labelledBy="checkout-title" variant="page" topLabel={`Checkout · ${plan.name}`} className="!p-0">
      <div className="flex h-full flex-col overflow-x-hidden md:grid md:grid-cols-[minmax(280px,0.85fr)_1.7fr] md:gap-6 md:p-6">
        {/* —— Sidebar de cupom (somente desktop/tablet) —— */}
        <aside className="hidden md:block md:h-full md:min-h-0 md:overflow-y-auto">
          <span className="label-mono">Seu plano</span>
          <h2 id="checkout-title" className="mt-2 font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(1.9rem, 6vw, 3.4rem)" }}>
            <span className="gradient-text">{plan.name}</span>
          </h2>
          <div className="mt-2 flex items-end gap-2">
            {original && <span className="mb-0.5 text-lg font-semibold text-muted line-through">US$ {original}</span>}
            <span className="font-display text-3xl font-bold">US$ {price}</span>
            <span className="mb-1 text-sm text-muted">/mês</span>
          </div>

          <div className="mt-7 rounded-card-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-accent" />
              <h3 className="font-display text-base font-bold">Procure o seu cupom</h3>
            </div>
            <p className="mb-4 mt-1.5 text-xs leading-relaxed text-muted">
              Digite o nome da sua empresa e clique no cupom — ele é copiado e aplicado no checkout ao lado.
            </p>
            {couponSearch}
          </div>

          <div className="mt-5 flex flex-col gap-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-accent" /> Pagamento seguro via Stripe
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-accent" /> Cancele quando quiser · sem fidelidade
            </span>
          </div>
        </aside>

        {/* —— Coluna do checkout (tela cheia no mobile) —— */}
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          {/* barra de cupom fina (mobile) */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5 text-left text-sm md:hidden"
          >
            <span className="flex min-w-0 items-center gap-2">
              <Ticket className="h-4 w-4 shrink-0 text-accent" />
              <span className="truncate">
                {applied ? (
                  <>Cupom <span className="font-mono font-semibold text-accent">{appliedLabel}</span> aplicado</>
                ) : (
                  "Tem um cupom? Toque para buscar"
                )}
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-accent">{applied ? "trocar" : "buscar"}</span>
          </button>

          {/* aviso de cupom (desktop) */}
          {applied && (
            <div className="mb-3 hidden shrink-0 items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm text-cream md:flex">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              <span>
                Cupom <span className="font-mono font-semibold text-accent">{appliedLabel}</span> copiado.
                Se não aparecer aplicado, cole no campo <strong>Cupom</strong> do checkout.
              </span>
            </div>
          )}

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-white/10 bg-graphite md:rounded-card-lg md:border md:shadow-plan">
            {/* chrome (desktop) */}
            <div className="hidden shrink-0 items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 md:flex">
              <span className="flex gap-2">
                <i className="h-3 w-3 rounded-full bg-[#ED5656]" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
              </span>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
                <Lock className="h-3 w-3 text-accent" /> Checkout seguro
              </div>
            </div>

            <iframe
              key={applied ?? "no-coupon"}
              src={iframeSrc}
              title={`Checkout Spark Leads ${plan.name}`}
              allow="payment *"
              className="w-full flex-1 bg-white"
            />
          </div>

          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 py-2 text-xs text-muted underline-offset-4 hover:text-cream hover:underline md:inline-flex"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Não carregou? Abrir o checkout em uma nova aba
          </a>

          {/* —— Bottom sheet de cupom (mobile) —— */}
          <div className={cn("absolute inset-0 z-30 md:hidden", sheetOpen ? "pointer-events-auto" : "pointer-events-none")}>
            <div
              onClick={() => setSheetOpen(false)}
              className={cn("absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300", sheetOpen ? "opacity-100" : "opacity-0")}
              aria-hidden="true"
            />
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 max-h-[85%] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-graphite px-4 pb-6 pt-3 shadow-plan transition-transform duration-300 ease-out",
                sheetOpen ? "translate-y-0" : "translate-y-full",
              )}
            >
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/20" />
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-display text-base font-bold">
                  <Ticket className="h-4 w-4 text-accent" /> Procure o seu cupom
                </h3>
                <button
                  onClick={() => setSheetOpen(false)}
                  aria-label="Fechar busca de cupom"
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {couponSearch}
              {applied && (
                <p className="mt-3 rounded-lg border border-accent/30 bg-accent/10 p-2.5 text-[11px] text-cream">
                  Cupom <span className="font-mono font-semibold text-accent">{appliedLabel}</span> copiado. Se não
                  aplicar sozinho, cole no campo <strong>Cupom</strong> do checkout.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
