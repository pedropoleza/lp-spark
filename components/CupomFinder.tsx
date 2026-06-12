"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, Ticket, Copy, Check, ArrowRight } from "lucide-react";
import { COMPANIES, findCompanyBySlug, type Company } from "@/content/coupons";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Página de cupom (destino do QR): o cliente digita o nome da empresa e vê o
 * cupom de indicação que possui (nome+off). Copia e usa lá no checkout do plano
 * que escolher — o buscador do checkout aplica o cupom real correspondente.
 */
export function CupomFinder() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

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
    return COMPANIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.offCode.includes(q),
    ).slice(0, 20);
  }, [query]);

  async function copy(company: Company) {
    try {
      await navigator.clipboard.writeText(company.offCode);
      setCopied(company.slug);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
    trackEvent("checkout_form_submitted", { coupon: company.offCode, source: "cupom_page" });
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12 md:py-16">
      <div className="text-center">
        <span className="label-mono inline-flex items-center gap-1.5">
          <Ticket className="h-3.5 w-3.5 text-accent" /> Cupom de indicação
        </span>
        <h1 className="mt-3 font-display font-bold leading-[1.05]" style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
          Qual é a sua <span className="gradient-text">empresa?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted md:text-base">
          Digite o nome da sua empresa e veja o seu cupom. Use ele no checkout do plano que
          escolher — o desconto entra automaticamente.
        </p>
      </div>

      <div className="relative mt-7">
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

      <div className="mt-5 space-y-3">
        {results.map((company) => {
          const isCopied = copied === company.slug;
          return (
            <div key={company.slug} className="rounded-card-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="truncate font-display text-base font-bold text-cream">{company.name}</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => copy(company)}
                  className={cn(
                    "flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border px-4 py-3 font-mono text-sm font-semibold transition",
                    isCopied
                      ? "border-accent bg-accent text-ink"
                      : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20",
                  )}
                  aria-label={`Copiar cupom ${company.offCode}`}
                >
                  <span className="truncate">{company.offCode}</span>
                  {isCopied ? <Check className="h-4 w-4 shrink-0" /> : <Copy className="h-4 w-4 shrink-0 opacity-80" />}
                </button>
              </div>
              <Link
                href="/planos"
                className="btn-primary mt-3 w-full justify-center"
                onClick={() => trackEvent("plan_selected", { source: "cupom_page", company: company.slug })}
              >
                Escolher plano <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-center text-[11px] text-muted">
                {isCopied ? "Cupom copiado! " : ""}No checkout, busque a sua empresa em “Procure o seu cupom”.
              </p>
            </div>
          );
        })}

        {query.trim() && results.length === 0 && (
          <p className="rounded-card-lg border border-white/10 bg-white/[0.02] p-4 text-center text-sm text-muted">
            Nenhuma empresa encontrada para “{query}”. Confira a grafia ou fale com quem te indicou.
          </p>
        )}
      </div>
    </div>
  );
}
