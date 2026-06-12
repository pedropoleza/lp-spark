"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Ticket, ArrowRight } from "lucide-react";
import { useSpark } from "./spark-context";
import { COMPANIES, findCompanyBySlug, type Company, type PlanFilter } from "@/content/coupons";
import { PLAN_PRICES, type PlanId } from "@/lib/plans";
import { PLAN_CONTENT } from "@/content/pt-br";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const PLAN_ORDER: PlanFilter[] = ["starter", "growth", "agency"];

/**
 * Página de cupom (destino do QR): o cliente digita o nome da empresa, vê o
 * cupom que possui e, ao escolher o plano, o checkout abre com o cupom já
 * carregado (sem precisar digitar no campo do iframe do GoHighLevel).
 */
export function CupomFinder() {
  const { openCheckout } = useSpark();
  const [query, setQuery] = useState("");

  // Pré-preenche pela empresa do QR (?empresa=slug), mas segue editável.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("empresa");
    if (slug) {
      const c = findCompanyBySlug(slug);
      if (c) setQuery(c.name);
    }
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COMPANIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 20);
  }, [query]);

  function choose(company: Company, plan: PlanFilter, code: string) {
    // copia no gesto do clique (fallback caso o auto-apply via URL não pegue)
    navigator.clipboard?.writeText(code).catch(() => {});
    trackEvent("plan_selected", { plan, coupon: code, source: "cupom_page", company: company.slug });
    openCheckout(plan as PlanId, code);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <div className="text-center">
        <span className="label-mono inline-flex items-center gap-1.5">
          <Ticket className="h-3.5 w-3.5 text-accent" /> Cupom de indicação
        </span>
        <h1 className="mt-3 font-display font-bold leading-[1.05]" style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
          Qual é a sua <span className="gradient-text">empresa?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted md:text-base">
          Digite o nome da sua empresa, veja o cupom que você possui e escolha o plano — o desconto já
          entra <strong className="text-cream">aplicado</strong> no checkout.
        </p>
      </div>

      <div className="relative mx-auto mt-7 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nome da sua empresa..."
          className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-4 text-base outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
          aria-label="Nome da empresa"
        />
      </div>

      <div className="mx-auto mt-5 max-w-md space-y-4">
        {results.map((company) => (
          <div key={company.slug} className="rounded-card-lg border border-white/10 bg-white/[0.02] p-4">
            <p className="mb-3 truncate font-display text-base font-bold text-cream">{company.name}</p>
            <div className="flex flex-col gap-2">
              {PLAN_ORDER.map((plan) => {
                const code = company.coupons[plan];
                if (!code) return null;
                const content = PLAN_CONTENT.find((p) => p.id === plan);
                return (
                  <button
                    key={plan}
                    onClick={() => choose(company, plan, code)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-accent/50 hover:bg-white/[0.05]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-cream">{content?.name ?? plan}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-accent">{code}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-right">
                        <span className="font-display text-base font-bold">US$ {PLAN_PRICES[plan as PlanId]}</span>
                        <span className="block text-[10px] text-muted">/mês</span>
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-ink transition group-hover:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {query.trim() && results.length === 0 && (
          <p className={cn("rounded-card-lg border border-white/10 bg-white/[0.02] p-4 text-center text-sm text-muted")}>
            Nenhuma empresa encontrada para “{query}”. Confira a grafia ou fale com quem te indicou.
          </p>
        )}
      </div>
    </div>
  );
}
