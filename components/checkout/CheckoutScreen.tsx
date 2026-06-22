"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Check, Copy, Lock, ShieldCheck, Ticket, ArrowLeft, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import type { PlanId } from "@/lib/plans";
import { planSummary, checkoutLink, ACTIVATION_FEE } from "@/content/checkout";
import { searchCoupons, labelForCode } from "@/content/coupons";
import { cn } from "@/lib/utils";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function CheckoutScreen({ plan }: { plan: PlanId }) {
  const p = planSummary(plan);
  const fee = ACTIVATION_FEE[plan];
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);

  // redirect absoluto pro wizard (funciona em qualquer domínio onde o app esteja)
  useEffect(() => {
    setRedirectUrl(`${window.location.origin}${BASE_PATH}/bem-vindo?plan=${plan}`);
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("cupom") || sp.get("coupon");
    if (c) setApplied(c.toUpperCase());
  }, [plan]);

  const results = useMemo(() => searchCoupons(query, plan), [query, plan]);
  const payHref = checkoutLink(plan, { coupon: applied, redirectUrl });
  const appliedLabel = applied ? labelForCode(applied) : null;

  async function apply(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* ignore */
    }
    setApplied(code);
  }

  return (
    <div className="min-h-dvh bg-ink text-cream">
      <header className="flex items-center justify-between px-5 py-4">
        <Link href="/planos" className="flex items-center gap-1.5 text-sm text-muted hover:text-cream">
          <ArrowLeft className="h-4 w-4" /> Planos
        </Link>
        <span className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink">
            <Zap className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-bold">Spark Leads</span>
        </span>
      </header>

      <main className="mx-auto w-full max-w-md px-5 pb-16">
        <span className="label-mono">Seu plano</span>
        <h1 className="mt-2 font-display text-4xl font-bold leading-none">
          <span className="gradient-text">{p.name}</span>
        </h1>
        <p className="mt-2 text-sm text-muted">{p.tagline}</p>

        <div className="mt-4 flex items-end gap-2">
          <span className="font-display text-4xl font-bold">US$ {p.price}</span>
          <span className="mb-1 text-sm text-muted">/mês</span>
        </div>

        {/* alavanca: taxa de ativação isenta */}
        <div className="mt-4 flex items-center gap-2 rounded-card-lg border border-lime/25 bg-lime/[0.06] px-4 py-3 text-sm">
          <Check className="h-4 w-4 shrink-0 text-lime" />
          <span className="text-cream/90">
            Taxa de ativação <span className="font-semibold text-muted line-through">US$ {fee}</span>{" "}
            <span className="font-semibold text-lime">isenta</span> com o seu cupom.
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {p.features.slice(0, 5).map((f) => (
            <li key={f} className="flex gap-2.5 text-[14px] leading-snug text-cream/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* cupom (engine de referral) */}
        <div className="mt-6 rounded-card-lg border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-accent" />
            <h2 className="font-display text-sm font-bold">Tem um cupom?</h2>
          </div>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nome da sua empresa..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-3 text-base outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
              aria-label="Procurar cupom pela empresa"
            />
          </div>
          <div className="mt-2 space-y-2">
            {results.map((c) => {
              const active = applied === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => apply(c.code)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl border p-3 text-left text-sm transition active:scale-[0.99]",
                    active ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/[0.03] hover:border-accent/40",
                  )}
                >
                  <span className="min-w-0 truncate text-cream">{c.company}</span>
                  <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold", active ? "border-accent bg-accent text-ink" : "border-accent/40 bg-accent/10 text-accent")}>
                    {c.label} {active ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5 opacity-70" />}
                  </span>
                </button>
              );
            })}
            {query.trim() && results.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted">
                Nenhum cupom pra “{query}”. Siga sem cupom, é opcional.
              </p>
            )}
          </div>
          {applied && (
            <p className="mt-2 rounded-lg border border-accent/30 bg-accent/10 p-2.5 text-[11px] text-cream">
              Cupom <span className="font-mono font-semibold text-accent">{appliedLabel}</span> aplicado.
            </p>
          )}
        </div>

        {/* CTA: vai pro checkout do GHL em navegação normal (sem iframe) */}
        <a
          href={payHref}
          className="btn-primary mt-6 w-full justify-center py-4 text-base"
          aria-disabled={!redirectUrl}
        >
          Ir para o pagamento seguro <ArrowRight className="h-5 w-5" />
        </a>
        <p className="mt-3 text-center text-xs text-muted">
          Você vai para o pagamento seguro. Ao concluir, voltamos pras suas boas-vindas.
        </p>

        <div className="mt-5 flex flex-col items-center gap-1.5 text-xs text-muted">
          <span className="flex items-center gap-1.5"><Lock className="h-3 w-3 text-accent" /> Pagamento seguro via Stripe</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-accent" /> Cancele quando quiser · sem fidelidade</span>
        </div>
      </main>
    </div>
  );
}
