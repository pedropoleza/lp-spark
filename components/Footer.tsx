"use client";

import { Zap } from "lucide-react";
import { useSpark } from "./spark-context";

export function Footer() {
  const { openQuiz } = useSpark();

  const columns = [
    {
      title: "Produto",
      links: [
        { label: "Planos", href: "#planos" },
        { label: "Quiz", onClick: openQuiz },
        { label: "Comparativo", href: "#comparar" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { label: "Planos", href: "#planos" },
        { label: "SparkBot", href: "#sparkbot" },
        { label: "Comparar", href: "#comparar" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Termos", href: "#" },
        { label: "Privacidade", href: "#" },
        { label: "Cancelamento", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-ink pt-16">
      <div className="halo left-1/2 top-0 h-48 w-96 -translate-x-1/2 bg-spark/15" />
      <div className="container-spark relative z-10 grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-spark/15 text-spark">
              <Zap className="h-4 w-4" />
            </span>
            Spark Leads
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            CRM, automações e IA para agentes de seguros venderem mais, recrutarem melhor e perderem
            menos oportunidades.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="label-mono mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"onClick" in l && l.onClick ? (
                    <button onClick={l.onClick} className="text-sm text-muted transition hover:text-cream">
                      {l.label}
                    </button>
                  ) : (
                    <a href={l.href} className="text-sm text-muted transition hover:text-cream">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-spark text-center text-xs text-muted">
          © 2026 Spark Leads. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
