"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "./ui/Logo";
import { useSpark } from "./spark-context";
import { content } from "@/content/pt-br";

export function Footer() {
  const { openQuiz } = useSpark();

  const columns = [
    {
      title: "Produto",
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
    <footer className="relative overflow-hidden bg-ink">
      {/* hairline em gradiente no topo */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="halo left-1/2 top-0 h-48 w-96 -translate-x-1/2 bg-accent/15" />

      <div className="container-spark relative z-10 grid gap-12 pb-12 pt-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo variant="mark" className="h-9 w-9 drop-shadow-[0_0_18px_rgba(0,164,205,0.45)]" />
            <Logo variant="wordmark" onDark className="h-5" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            O copiloto comercial dos agentes de seguros: CRM pronto, follow-up automático e o
            SparkBot agendando por você.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="label-mono mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted transition hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* mini-CTA conduzido pelo bot */}
        <div className="glass-card flex flex-col gap-3 rounded-card p-5">
          <p className="text-sm font-semibold text-cream">Ainda na dúvida?</p>
          <p className="text-xs leading-relaxed text-muted">
            3 perguntas e o SparkBot indica o plano certo pro seu momento.
          </p>
          <button onClick={openQuiz} className="btn-primary !py-2 text-xs">
            Descobrir meu plano <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <a
            href={content.thankYou.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted underline-offset-4 hover:text-cream hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Falar com a equipe
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-spark flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <span>© 2026 Spark Leads. All rights reserved.</span>
          <span className="label-mono !text-[10px]">CRM • Automations • AI • Growth</span>
        </div>
      </div>
    </footer>
  );
}
