"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Copy, Check, Lock, ShieldCheck, ExternalLink, Ticket } from "lucide-react";
import { Modal } from "./ui/Modal";
import { useSpark } from "./spark-context";
import { PAYMENT_LINKS, PLAN_PRICES } from "@/lib/plans";
import { PLAN_CONTENT } from "@/content/pt-br";
import { searchCoupons } from "@/content/coupons";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard indisponível — o usuário ainda vê o código */
    }
    setCopied(true);
    trackEvent("checkout_form_submitted", { coupon: code, action: "copy" });
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button
      onClick={copy}
      className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-sm font-semibold text-accent transition hover:bg-accent/20"
    >
      {code}
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
      )}
    </button>
  );
}

export function CheckoutModal() {
  const { checkoutPlan, closeCheckout } = useSpark();
  const open = checkoutPlan !== null;
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      trackEvent("checkout_form_opened", { plan: checkoutPlan });
      setQuery("");
    }
  }, [open, checkoutPlan]);

  const results = useMemo(() => searchCoupons(query), [query]);

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

  return (
    <Modal open={open} onClose={closeCheckout} labelledBy="checkout-title" variant="page" topLabel={`Checkout · ${plan.name}`}>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.5fr]">
        {/* —— Coluna: plano + buscador de cupom —— */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <span className="label-mono">Seu plano</span>
          <h2
            id="checkout-title"
            className="mt-2 font-display font-bold leading-[1.02]"
            style={{ fontSize: "clamp(1.9rem, 6vw, 3.4rem)" }}
          >
            <span className="gradient-text">{plan.name}</span>
          </h2>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-3xl font-bold">US$ {price}</span>
            <span className="mb-1 text-sm text-muted">/mês</span>
          </div>

          {/* Buscador de cupom */}
          <div className="mt-7 rounded-card-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-accent" />
              <h3 className="font-display text-base font-bold">Procure o seu cupom</h3>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              Digite o nome da sua empresa, copie o código e cole no campo de cupom do checkout ao
              lado.
            </p>

            <div className="relative mt-4">
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

            <div className="mt-3 space-y-2">
              {results.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-cream">{c.company}</p>
                    {c.note && <p className="truncate text-[11px] text-muted">{c.note}</p>}
                  </div>
                  <CopyCode code={c.code} />
                </div>
              ))}

              {query.trim() && results.length === 0 && (
                <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted">
                  Nenhum cupom encontrado para “{query}”. Confira a grafia ou siga sem cupom — é
                  opcional.
                </p>
              )}
              {!query.trim() && (
                <p className="px-1 text-[11px] text-muted">
                  Sem cupom? Tudo bem, ele é opcional no checkout.
                </p>
              )}
            </div>
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

        {/* —— Coluna: checkout embedado —— */}
        <div>
          <div className="overflow-hidden rounded-card-lg border border-white/10 bg-graphite shadow-plan">
            {/* chrome */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="flex gap-2">
                <i className="h-3 w-3 rounded-full bg-[#ED5656]" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
              </span>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
                <Lock className="h-3 w-3 text-accent" /> Checkout seguro
              </div>
            </div>

            {/* iframe do payment-link */}
            <iframe
              src={paymentLink}
              title={`Checkout Spark Leads ${plan.name}`}
              allow="payment *"
              className="h-[72vh] min-h-[540px] w-full bg-white"
            />
          </div>

          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted underline-offset-4 hover:text-cream hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Não carregou? Abrir o checkout em uma nova aba
          </a>
        </div>
      </div>
    </Modal>
  );
}
