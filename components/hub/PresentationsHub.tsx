"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Mic,
  Presentation,
  MonitorPlay,
  Users,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

type Deck = {
  title: string;
  brand: string;
  audience: string;
  desc: string;
  href: string;
  notes?: string;
  icon: typeof Mic;
};

const GROUPS: { label: string; tag: string; decks: Deck[] }[] = [
  {
    label: "Palestras",
    tag: "Para plateia",
    decks: [
      {
        title: "O dinheiro está no follow-up",
        brand: "Spark · Palestra",
        audience: "Palestra aberta · corretores",
        desc: "A grande palestra de cadência: por que o lead esfria, a calculadora do que se perde e a virada com a Spark.",
        href: "/palestra",
        notes: "/palestra/notas",
        icon: Mic,
      },
      {
        title: "Organização & CRM",
        brand: "Spark · Organização",
        audience: "Palestra aberta · times de venda",
        desc: "Amador × profissional: do caos da planilha ao pipeline com próximo passo claro. Termina agendando demo.",
        href: "/palestra/organizacao",
        notes: "/palestra/organizacao/notas",
        icon: Presentation,
      },
    ],
  },
  {
    label: "BO$$",
    tag: "Conta enterprise",
    decks: [
      {
        title: "Demo BO$$ — reunião 1:1",
        brand: "Spark · BO$$",
        audience: "Apresentação fechada · diretoria",
        desc: "Tudo num lugar só, migração do Kommo, snapshots, Five Rings e segurança. De usuária a arquiteta da operação.",
        href: "/apresentacao/boss",
        notes: "/apresentacao/boss/notas",
        icon: Sparkles,
      },
      {
        title: "Webinar BO$$ — para o time",
        brand: "Spark · BO$$ (time)",
        audience: "Webinar · equipe BO$$",
        desc: "O SparkBot como sócio proativo: chama de manhã, faz follow-up depois da reunião. Valor, planos e fechamento.",
        href: "/apresentacao/boss-equipe",
        notes: "/apresentacao/boss-equipe/notas",
        icon: Users,
      },
    ],
  },
  {
    label: "Demos interativas",
    tag: "Produto ao vivo",
    decks: [
      {
        title: "Demo interativa",
        brand: "Spark · Demo",
        audience: "Walkthrough do produto",
        desc: "Passeio interativo pelo Spark Leads — pipeline, SparkBot e dashboards funcionando de verdade.",
        href: "/demo",
        icon: MonitorPlay,
      },
      {
        title: "Demo BO$$ — com oferta",
        brand: "Spark · Demo BO$$",
        audience: "Demo + oferta com desconto",
        desc: "A mesma demo interativa, personalizada para a BO$$, já com a precificação especial aplicada.",
        href: "/demo/boss",
        icon: MonitorPlay,
      },
    ],
  },
];

export function PresentationsHub() {
  const reduce = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-cream">
      {/* fundo: auroras teal sutis */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute -right-24 bottom-[-15%] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/* cabeçalho */}
        <header className="mb-12 sm:mb-16">
          <Logo variant="mark" className="h-11 w-11" />
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Hub de apresentações
            </span>
          </div>
          <h1
            className="mt-4 max-w-3xl font-display font-bold leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          >
            Todas as suas <span className="gradient-text">apresentações</span> num lugar só.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            Escolha um deck para apresentar. Cada um abre em tela cheia; quando houver,
            o roteiro fica no link de notas para abrir no celular.
          </p>
        </header>

        {/* grupos */}
        <div className="space-y-14">
          {GROUPS.map((group, gi) => (
            <section key={group.label}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {group.label}
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {group.tag}
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {group.decks.map((deck, i) => (
                  <motion.div
                    key={deck.href}
                    initial={reduce ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: (gi * 2 + i) * 0.04,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.04]"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/10" />

                    <Link
                      href={deck.href}
                      className="flex items-start gap-4"
                      aria-label={`Abrir ${deck.title}`}
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                        <deck.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                          {deck.brand}
                        </span>
                        <span className="mt-1 flex items-center gap-2">
                          <span className="font-display text-xl font-semibold leading-tight tracking-tight">
                            {deck.title}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">{deck.audience}</span>
                      </span>
                    </Link>

                    <p className="mt-4 text-sm leading-relaxed text-cream/70">{deck.desc}</p>

                    <div className="mt-5 flex items-center gap-2">
                      <Link
                        href={deck.href}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.03]"
                      >
                        Abrir deck
                      </Link>
                      {deck.notes && (
                        <Link
                          href={deck.notes}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-cream/80 transition-colors duration-200 hover:border-accent/40 hover:text-cream"
                        >
                          <FileText className="h-3.5 w-3.5" /> Roteiro
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-muted">
            Atalhos: <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">←</kbd>{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">→</kbd> navegam os slides ·{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">N</kbd> mostra as notas.
          </p>
        </footer>
      </div>
    </main>
  );
}
