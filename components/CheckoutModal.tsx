"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Copy, Check, Lock, ShieldCheck, ExternalLink, Ticket, ChevronDown } from "lucide-react";
import { Modal } from "./ui/Modal";
import { useSpark } from "./spark-context";
import { PAYMENT_LINKS, PLAN_PRICES } from "@/lib/plans";
import { PLAN_CONTENT } from "@/content/pt-br";
import { searchCoupons } from "@/content/coupons";
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
  const { checkoutPlan, closeCheckout } = useSpark();
  const open = checkoutPlan !== null;
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [couponOpen, setCouponOpen] = useState(false);

  useEffect(() => {
    if (open) {
      trackEvent("checkout_form_opened", { plan: checkoutPlan });
      setQuery("");
      setApplied(null);
      setCouponOpen(false);
    }
  }, [open, checkoutPlan]);

  const results = useMemo(() => searchCoupons(query, checkoutPlan ?? undefined), [query, checkoutPlan]);

  async function applyCoupon(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard indisponível */
    }
    setApplied(code);
    setCouponOpen(false);
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
  const price = PLAN_PRICES[checkoutPlan];
  const paymentLink = PAYMENT_LINKS[checkoutPlan];
  const iframeSrc = linkWithCoupon(paymentLink, applied);

  /* —— painel de busca de cupom (compartilhado mobile/desktop) —— */
  const couponPanel = (
    <div className="rounded-card-lg border border-white/10 bg-white/[0.02] p-4 md:p-5">
      <div className="hidden items-center gap-2 md:flex">
        <Ticket className="h-4 w-4 text-accent" />
        <h3 className="font-display text-base font-bold">Procure o seu cupom</h3>
      </div>
      <p className="hidden text-xs leading-relaxed text-muted md:mt-1.5 md:block">
        Digite o nome da sua empresa e clique no cupom — ele é copiado e aplicado no checkout ao lado.
      </p>

      <div className="relative md:mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nome da sua empresa..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          aria-label="Procurar cupom pela empresa"
        />
      </div>

      <div className="mt-3 max-h-[38vh] space-y-2 overflow-y-auto md:max-h-none">
        {results.map((c) => {
          const active = applied === c.code;
          return (
            <button
              key={c.code}
              onClick={() => applyCoupon(c.code)}
              className={cn(
                "flex w-full flex-col items-start gap-2 rounded-xl border p-3 text-left transition md:flex-row md:items-center md:justify-between md:gap-3",
                active ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/[0.03] hover:border-accent/40",
              )}
            >
              <div className="w-full min-w-0">
                <p className="truncate text-sm font-medium text-cream">{c.company}</p>
                {c.note && <p className="truncate text-[11px] text-muted">{c.note}</p>}
              </div>
              <span
                className={cn(
                  "inline-flex w-full shrink-0 items-center justify-between gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs font-semibold md:w-auto md:justify-start",
                  active ? "border-accent bg-accent text-ink" : "border-accent/40 bg-accent/10 text-accent",
                )}
              >
                <span className="break-all">{c.code}</span>
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
    </div>
  );

  return (
    <Modal open={open} onClose={closeCheckout} labelledBy="checkout-title" variant="page" topLabel={`Checkout · ${plan.name}`} className="!p-0">
      <div className="flex h-full flex-col overflow-x-hidden md:grid md:grid-cols-[minmax(280px,0.85fr)_1.7fr] md:gap-6 md:p-6">
        {/* —— Coluna/topo: plano + buscador de cupom —— */}
        <aside className="shrink-0 px-4 pt-4 md:h-full md:min-h-0 md:overflow-y-auto md:px-0 md:pt-0">
          {/* header compacto (mobile) */}
          <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
            <div className="flex items-baseline gap-2">
              <span className="label-mono">Plano</span>
              <span className="font-display text-lg font-bold">
                <span className="gradient-text">{plan.name}</span>
              </span>
            </div>
            <div className="shrink-0 text-sm">
              <span className="font-display font-bold">US$ {price}</span>
              <span className="text-muted">/mês</span>
            </div>
          </div>

          {/* header completo (desktop) */}
          <div className="hidden md:block">
            <span className="label-mono">Seu plano</span>
            <h2 id="checkout-title" className="mt-2 font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(1.9rem, 6vw, 3.4rem)" }}>
              <span className="gradient-text">{plan.name}</span>
            </h2>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-3xl font-bold">US$ {price}</span>
              <span className="mb-1 text-sm text-muted">/mês</span>
            </div>
          </div>

          {/* botão sanfona do cupom (mobile) */}
          <button
            onClick={() => setCouponOpen((v) => !v)}
            className="mb-3 flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium transition hover:border-accent/40 md:hidden"
            aria-expanded={couponOpen}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Ticket className="h-4 w-4 shrink-0 text-accent" />
              <span className="truncate">
                {applied ? <>Cupom <span className="font-mono text-accent">{applied}</span></> : "Tem um cupom? Procurar"}
              </span>
            </span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition", couponOpen && "rotate-180")} />
          </button>

          {/* painel: sanfona no mobile, sempre visível no desktop */}
          <div className={cn("mt-1 md:mt-7 md:!block", couponOpen ? "block" : "hidden")}>{couponPanel}</div>

          {/* selos de confiança (desktop) */}
          <div className="mt-5 hidden flex-col gap-2 text-xs text-muted md:flex">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3 w-3 text-accent" /> Pagamento seguro via Stripe
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-accent" /> Cancele quando quiser · sem fidelidade
            </span>
          </div>
        </aside>

        {/* —— Coluna: checkout embedado (preenche a tela, full-bleed no mobile) —— */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* aviso de cupom aplicado/copiado */}
          {applied && (
            <div className="mx-4 mb-2 flex shrink-0 items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm text-cream md:mx-0 md:mb-3">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              <span>
                Cupom <span className="font-mono font-semibold text-accent">{applied}</span> copiado.
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
            className="inline-flex shrink-0 items-center gap-1.5 px-4 py-2 text-xs text-muted underline-offset-4 hover:text-cream hover:underline md:px-0"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Não carregou? Abrir o checkout em uma nova aba
          </a>
        </div>
      </div>
    </Modal>
  );
}

