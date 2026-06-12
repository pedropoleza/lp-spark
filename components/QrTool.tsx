"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Search, Download, Copy, Check, QrCode as QrIcon } from "lucide-react";
import { COMPANIES, type Company } from "@/content/coupons";
import { cn } from "@/lib/utils";

const QR_OPTS = {
  width: 640,
  margin: 2,
  errorCorrectionLevel: "M" as const,
  color: { dark: "#0B0B0F", light: "#FFFFFF" },
};

function useQr(url: string) {
  const [dataUrl, setDataUrl] = useState("");
  useEffect(() => {
    if (!url) return setDataUrl("");
    QRCode.toDataURL(url, QR_OPTS).then(setDataUrl).catch(() => setDataUrl(""));
  }, [url]);
  return dataUrl;
}

function QrCard({ title, subtitle, url, file }: { title: string; subtitle: string; url: string; file: string }) {
  const dataUrl = useQr(url);
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-card-lg border border-white/10 bg-white/[0.02] p-6">
      <p className="truncate font-display text-lg font-bold">{title}</p>
      <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
      <div className="mt-4 grid place-items-center rounded-xl bg-white p-4">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`QR ${title}`} className="h-56 w-56" />
        ) : (
          <div className="h-56 w-56 animate-pulse rounded bg-black/10" />
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">{url}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          className="shrink-0 text-accent"
          aria-label="Copiar link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <a
        href={dataUrl || "#"}
        download={file}
        className={cn("btn-primary mt-3 w-full justify-center", !dataUrl && "pointer-events-none opacity-50")}
      >
        <Download className="h-4 w-4" /> Baixar PNG
      </a>
    </div>
  );
}

/**
 * Ferramenta interna (rota /qr, não indexada). Gera o QR geral (totem) que leva
 * a /cupom, e QRs por empresa (/cupom?empresa=slug) que já pré-preenchem o nome.
 */
export function QrTool() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Company | null>(null);
  const [origin, setOrigin] = useState("");
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => setOrigin(window.location.origin), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COMPANIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 40);
  }, [query]);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
      {/* —— Coluna esquerda: QR geral + busca —— */}
      <div>
        <span className="label-mono flex items-center gap-1.5">
          <QrIcon className="h-3.5 w-3.5 text-accent" /> Gerador de QR · uso interno
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight">
          QR codes <span className="gradient-text">dos cupons</span>
        </h1>
        <p className="mt-2 text-sm text-muted">
          Ao escanear, o cliente cai em <span className="font-mono text-accent">/cupom</span>, digita a
          empresa e vê o cupom de indicação.
        </p>

        {origin && (
          <div className="mt-6">
            <QrCard
              title="QR geral (totem)"
              subtitle="Para totem/divulgação ampla — qualquer empresa digita o nome."
              url={`${origin}${base}/cupom`}
              file="qr-spark-cupom-geral.png"
            />
          </div>
        )}

        <div className="relative mt-8">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="QR de uma empresa específica..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-base outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
            aria-label="Buscar empresa"
          />
        </div>
        <p className="mt-2 text-[11px] text-muted">{COMPANIES.length} empresas disponíveis</p>

        <div className="mt-3 max-h-[40vh] space-y-2 overflow-y-auto pr-1">
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
              {c.name} · <span className="font-mono text-accent">{c.offCode}</span>
            </button>
          ))}
          {query.trim() && results.length === 0 && (
            <p className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-muted">
              Nenhuma empresa encontrada para “{query}”.
            </p>
          )}
        </div>
      </div>

      {/* —— Coluna direita: QR da empresa selecionada —— */}
      <div className="md:sticky md:top-10 md:self-start">
        {selected && origin ? (
          <QrCard
            title={selected.name}
            subtitle={`Cupom ${selected.offCode} · pré-preenche o nome em /cupom`}
            url={`${origin}${base}/cupom?empresa=${selected.slug}`}
            file={`qr-${selected.slug}.png`}
          />
        ) : (
          <div className="grid h-80 place-items-center rounded-card-lg border border-white/10 bg-white/[0.02] text-center text-sm text-muted">
            <span>
              <QrIcon className="mx-auto mb-2 h-8 w-8 text-muted/50" />
              Selecione uma empresa para o QR individual.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
