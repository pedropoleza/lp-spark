"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Search, Download, Copy, Check, QrCode as QrIcon } from "lucide-react";
import { COMPANIES, type Company } from "@/content/coupons";
import { cn } from "@/lib/utils";

/**
 * Ferramenta interna (rota /qr, não indexada): busca a empresa e gera um QR
 * code que aponta para /?empresa=<slug>. Ao escanear, o cliente cai no seletor
 * de plano com o cupom já aplicado no checkout.
 */
export function QrTool() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Company | null>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COMPANIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 40);
  }, [query]);

  const link = selected && origin ? `${origin}/cupom?empresa=${selected.slug}` : "";

  useEffect(() => {
    if (!link) {
      setDataUrl("");
      return;
    }
    QRCode.toDataURL(link, {
      width: 640,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#0B0B0F", light: "#FFFFFF" },
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(""));
  }, [link]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
      {/* —— Busca —— */}
      <div>
        <span className="label-mono flex items-center gap-1.5">
          <QrIcon className="h-3.5 w-3.5 text-accent" /> Gerador de QR · uso interno
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight">
          QR code <span className="gradient-text">por empresa</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          Busque a empresa e baixe o QR. Ao escanear, o cliente cai no seletor de plano com o
          <strong className="text-cream"> cupom já aplicado</strong> no checkout.
        </p>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome da empresa..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-base outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
            aria-label="Buscar empresa"
          />
        </div>

        <p className="mt-2 text-[11px] text-muted">{COMPANIES.length} empresas disponíveis</p>

        <div className="mt-3 max-h-[46vh] space-y-2 overflow-y-auto pr-1">
          {results.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelected(c)}
              className={cn(
                "block w-full truncate rounded-xl border p-3 text-left text-sm transition",
                selected?.slug === c.slug
                  ? "border-accent/60 bg-accent/10 text-cream"
                  : "border-white/10 bg-white/[0.03] hover:border-accent/40",
              )}
            >
              {c.name}
            </button>
          ))}
          {query.trim() && results.length === 0 && (
            <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted">
              Nenhuma empresa encontrada para “{query}”.
            </p>
          )}
        </div>
      </div>

      {/* —— Preview do QR —— */}
      <div className="md:sticky md:top-10 md:self-start">
        <div className="rounded-card-lg border border-white/10 bg-white/[0.02] p-6">
          {selected ? (
            <>
              <p className="truncate font-display text-lg font-bold">{selected.name}</p>
              <div className="mt-4 grid place-items-center rounded-xl bg-white p-4">
                {dataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={dataUrl} alt={`QR ${selected.name}`} className="h-56 w-56" />
                ) : (
                  <div className="h-56 w-56 animate-pulse rounded bg-black/10" />
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">{link}</span>
                <button onClick={copyLink} className="shrink-0 text-accent" aria-label="Copiar link">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <a
                href={dataUrl || "#"}
                download={`qr-${selected.slug}.png`}
                className={cn(
                  "btn-primary mt-3 w-full justify-center",
                  !dataUrl && "pointer-events-none opacity-50",
                )}
              >
                <Download className="h-4 w-4" /> Baixar PNG
              </a>

              <div className="mt-4 text-[11px] text-muted">
                Cupons:{" "}
                {(["starter", "growth", "agency"] as const)
                  .map((p) => selected.coupons[p])
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </>
          ) : (
            <div className="grid h-80 place-items-center text-center text-sm text-muted">
              <span>
                <QrIcon className="mx-auto mb-2 h-8 w-8 text-muted/50" />
                Selecione uma empresa para gerar o QR.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
