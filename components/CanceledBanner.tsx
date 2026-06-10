"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";
import { useSpark } from "./spark-context";

/** Seção 48 — banner discreto quando o usuário volta de /planos?canceled=1. */
export function CanceledBanner() {
  const { openQuiz } = useSpark();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled") === "1") setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="container-spark pt-4">
      <div className="flex items-center gap-3 rounded-card border border-white/10 bg-white/[0.04] p-4 text-sm">
        <Info className="h-4 w-4 shrink-0 text-electric" />
        <span className="flex-1 text-muted">
          Checkout cancelado. Você pode revisar os planos e continuar quando quiser.
        </span>
        <a href="#planos" className="btn-secondary !py-1.5 !px-3 text-xs">
          Escolher plano
        </a>
        <button onClick={openQuiz} className="btn-primary !py-1.5 !px-3 text-xs">
          Fazer quiz
        </button>
        <button
          aria-label="Fechar aviso"
          onClick={() => setShow(false)}
          className="grid h-7 w-7 place-items-center rounded-full text-muted hover:text-cream"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
