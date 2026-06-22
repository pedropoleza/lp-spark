"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Check, Copy, Lock, ShieldCheck, Ticket, ArrowLeft, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import type { PlanId } from "@/lib/plans";
import { planSummary, checkoutLink, ACTIVATION_FEE } from "@/content/checkout";
import { searchCoupons, labelForCode } from "@/content/coupons";
import { attachGhlAutoResize } from "@/lib/ghl-embed";
import { cn } from "@/lib/utils";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function CheckoutScreen({ plan }: { plan: PlanId }) {
  const p = planSummary(plan);
  const fee = ACTIVATION_FEE[plan];
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const welcomeUrl = `${BASE_PATH}/bem-vindo?plan=${plan}`;

  useEffect(() => {
    setRedirectUrl(`${window.location.origin}${welcomeUrl}`);
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("cupom") || sp.get("coupon");
    if (c) setApplied(c.toUpperCase());
  }, [welcomeUrl]);

  // O iframe (após o pagamento) avisa que caiu na /bem-vindo. Aqui, como donos
  // da janela, levamos a página inteira pra NOSSA /bem-vindo (mesmo domínio do
  // checkout). Funciona mesmo se o GHL redirecionar pra outro domínio.
  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data === "spark:welcome") window.location.assign(welcomeUrl);
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [welcomeUrl]);

  // Detecção de conclusão: quando o GHL redireciona o iframe pra uma página
  // NOSSA (/bem-vindo), conseguimos ler a URL (mesma origem) e levamos a janela
  // inteira pro wizard. Enquanto está no GHL (outra origem), a leitura lança
  // erro e a gente ignora — é o comportamento esperado.
  function onIframeLoad() {
    attachGhlAutoResize(iframeRef.current);
    try {
      const path = iframeRef.current?.contentWindow?.location?.pathname ?? "";
      if (path.includes("/bem-vindo")) window.location.replace(welcomeUrl);
    } catch {
      /* ainda no checkout do GHL (cross-origin) */
    }
  }

  const results = useMemo(() => searchCoupons(query, plan), [query, plan]);
  const payHref = checkoutLink(plan, { coupon: applied, redirectUrl });

  // o checkout do GHL se auto-redimensiona pra altura total do formulário,
  // então ele aparece inteiro sem scroll dentro do iframe (a página rola).
  // Re-liga quando o link muda (troca de cupom remonta o iframe).
  useEffect(() => {
    if (redirectUrl) attachGhlAutoResize(iframeRef.current);
  }, [payHref, redirectUrl]);

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
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
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

      <main className="mx-auto grid max-w-5xl gap-6 px-5 pb-12 sm:px-8 md:grid-cols-[minmax(280px,0.85fr)_1.6fr]">
        {/* resumo + cupom */}
        <aside className="space-y-5">
          <div>
            <span className="label-mono">Seu plano</span>
            <h1 className="mt-2 font-display text-4xl font-bold leading-none">
              <span className="gradient-text">{p.name}</span>
            </h1>
            <p className="mt-2 text-sm text-muted">{p.tagline}</p>
          </div>

          <div className="flex items-end gap-2">
            <span className="font-display text-3xl font-bold">US$ {p.price}</span>
            <span className="mb-1 text-sm text-muted">/mês</span>
          </div>

          <div className="flex items-center gap-2 rounded-card-lg border border-lime/25 bg-lime/[0.06] px-4 py-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-lime" />
            <span className="text-cream/90">
              Taxa de ativação <span className="font-semibold text-muted line-through">US$ {fee}</span>{" "}
              <span className="font-semibold text-lime">isenta</span> com o seu cupom.
            </span>
          </div>

          <ul className="space-y-2">
            {p.features.slice(0, 5).map((f) => (
              <li key={f} className="flex gap-2.5 text-[13.5px] leading-snug text-cream/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-card-lg border border-white/10 bg-white/[0.02] p-4">
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3 pl-10 pr-3 text-base outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/30 md:text-sm"
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
                Cupom <span className="font-mono font-semibold text-accent">{appliedLabel}</span> copiado. Se não
                aplicar sozinho, cole no campo <strong>Cupom</strong> do checkout.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Lock className="h-3 w-3 text-accent" /> Pagamento seguro via Stripe</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-accent" /> Cancele quando quiser · sem fidelidade</span>
          </div>
        </aside>

        {/* checkout do GHL no iframe + detecção de conclusão */}
        <section className="flex flex-col overflow-hidden rounded-card-lg border border-white/10 bg-graphite shadow-plan">
          <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex gap-2">
              <i className="h-3 w-3 rounded-full bg-[#ED5656]" />
              <i className="h-3 w-3 rounded-full bg-white/20" />
              <i className="h-3 w-3 rounded-full bg-white/20" />
            </span>
            <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
              <Lock className="h-3 w-3 text-accent" /> Checkout seguro
            </div>
          </div>
          {redirectUrl ? (
            <iframe
              key={applied ?? "no-coupon"}
              ref={iframeRef}
              src={payHref}
              title={`Checkout Spark ${p.name}`}
              allow="payment"
              scrolling="no"
              onLoad={onIframeLoad}
              style={{ minHeight: 760 }}
              className="block w-full bg-white"
            />
          ) : (
            <div className="min-h-[760px] animate-pulse bg-white/5" />
          )}
          <a href={payHref} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1.5 px-4 py-2 text-xs text-muted hover:text-cream">
            <ExternalLink className="h-3.5 w-3.5" /> Não carregou? Abrir o checkout em nova aba
          </a>
        </section>
      </main>
    </div>
  );
}
