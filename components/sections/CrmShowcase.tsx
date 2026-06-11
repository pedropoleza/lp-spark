"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GitBranch, Bot, BarChart3, CheckCircle2 } from "lucide-react";
import { Container, Section } from "../ui/primitives";
import { cn } from "@/lib/utils";

const TABS = [
  {
    key: "pipeline",
    label: "Pipeline",
    icon: GitBranch,
    title: "Pipeline de vendas",
    desc: "Cada lead com um estágio e um próximo passo claro — nada esfria esquecido.",
  },
  {
    key: "sparkbot",
    label: "SparkBot",
    icon: Bot,
    title: "SparkBot integrado",
    desc: "A IA responde, faz follow-up e agenda reuniões direto dentro do CRM.",
  },
  {
    key: "dashboards",
    label: "Dashboards",
    icon: BarChart3,
    title: "Dashboards de operação",
    desc: "Captação, retenção e recrutamento num painel — decisão com visão, não achismo.",
  },
];

export function CrmShowcase() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTab((v) => (v + 1) % TABS.length), 6000);
    return () => clearInterval(t);
  }, [reduce]);

  const active = TABS[tab];

  return (
    <Section id="crm" spacing="loose">
      <Container>
        {/* título editorial com linhas em gradiente */}
        <div className="mb-4 flex items-center justify-center gap-4">
          <span className="h-px w-24 bg-gradient-to-l from-accent to-transparent sm:w-40" />
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-accent">CRM</span>
          <span className="h-px w-24 bg-gradient-to-r from-accent to-transparent sm:w-40" />
        </div>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            className="font-display font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}
          >
            Sua operação inteira <span className="gradient-text">numa tela só.</span>
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            O CRM da Spark com pipeline, SparkBot e dashboards — pronto pra usar.
          </p>
        </div>

        {/* janela do produto */}
        <div className="relative mx-auto max-w-5xl">
          {/* glow atrás da janela */}
          <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-accent/10 blur-3xl" />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-plan"
          >
            {/* chrome da janela */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="flex gap-2">
                <i className="h-3 w-3 rounded-full bg-[#ED5656]" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
              </span>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> app.sparkleads.pro/crm
              </div>
            </div>

            {/* área da tela — TROCAR pelo asset real (ver nota no fim do arquivo) */}
            <div className="relative aspect-[16/10] w-full bg-ink">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={reduce ? false : { opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <CrmMock view={active.key} />
                </motion.div>
              </AnimatePresence>

              {/* badge da vista atual */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-accent/40 bg-ink/70 px-2.5 py-1 text-[11px] text-accent backdrop-blur">
                <active.icon className="h-3 w-3" /> {active.label}
              </div>

              {/* callout flutuante do SparkBot */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-accent/30 bg-ink/85 px-3 py-2 text-xs text-cream shadow-soft backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-accent" /> SparkBot agendou uma reunião
              </motion.div>
            </div>
          </motion.div>

          {/* abas / paginação + descrição */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setTab(i)}
                className={cn(
                  "group relative overflow-hidden rounded-card border p-4 text-left transition-colors",
                  i === tab
                    ? "border-accent/50 bg-accent/[0.06]"
                    : "border-white/10 bg-white/[0.02] hover:border-accent/30",
                )}
              >
                <div className="flex items-center gap-2">
                  <t.icon className={cn("h-4 w-4", i === tab ? "text-accent" : "text-muted")} />
                  <span className="text-sm font-semibold">{t.title}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{t.desc}</p>
                {/* barra de progresso da aba ativa */}
                {i === tab && !reduce && (
                  <motion.span
                    key={tab}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Placeholder visual do CRM (CSS). Quando você me mandar o asset real,
   troco este <CrmMock /> por <video>/<Image> dentro da mesma área da janela. */
function CrmMock({ view }: { view: string }) {
  if (view === "dashboards") {
    return (
      <div className="flex h-full">
        <MockSidebar />
        <div className="flex-1 p-4">
          <div className="mb-3 grid grid-cols-3 gap-3">
            {[
              { k: "Conversão", v: "32%" },
              { k: "Leads quentes", v: "48" },
              { k: "Reuniões", v: "21" },
            ].map((m) => (
              <div key={m.k} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[10px] text-muted">{m.k}</div>
                <div className="font-display text-xl font-bold text-accent">{m.v}</div>
              </div>
            ))}
          </div>
          <div className="flex h-[58%] items-end gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-4">
            {[40, 62, 50, 78, 58, 90, 70, 84].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "sparkbot") {
    return (
      <div className="flex h-full">
        <MockSidebar />
        <div className="flex flex-1 flex-col justify-end gap-2 p-5">
          <div className="max-w-[60%] rounded-2xl rounded-tl-sm bg-white/[0.06] p-3 text-xs text-cream/90">
            Oi! Vi seu interesse em seguro de vida 👋
          </div>
          <div className="ml-auto max-w-[55%] rounded-2xl rounded-tr-sm bg-accent/15 p-3 text-xs text-cream">
            Pode ser amanhã às 15h?
          </div>
          <div className="max-w-[60%] rounded-2xl rounded-tl-sm bg-white/[0.06] p-3 text-xs text-cream/90">
            Agendado ✅ reunião confirmada
          </div>
          <div className="mt-2 flex items-center gap-1.5 px-1">
            <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
            <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
            <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  // pipeline (default)
  const cols = [
    { t: "Novo Lead", n: 4 },
    { t: "Contato", n: 3 },
    { t: "Reunião", n: 2 },
    { t: "Fechado", n: 3 },
  ];
  return (
    <div className="flex h-full">
      <MockSidebar />
      <div className="grid flex-1 grid-cols-4 gap-2 p-4">
        {cols.map((c, ci) => (
          <div key={c.t} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] text-muted">
              <span>{c.t}</span>
              <span className="rounded bg-white/10 px-1">{c.n}</span>
            </div>
            {Array.from({ length: c.n }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-2",
                  ci === 3 ? "border-accent/30 bg-accent/[0.06]" : "border-white/10 bg-white/[0.03]",
                )}
              >
                <div className="mb-1.5 h-1.5 w-2/3 rounded bg-white/15" />
                <div className="flex items-center gap-1">
                  <span className="h-4 w-4 rounded-full bg-accent/30" />
                  <div className="h-1 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MockSidebar() {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-white/10 bg-white/[0.02] py-4 sm:flex">
      <span className="h-7 w-7 rounded-lg bg-accent/20" />
      {[GitBranch, Bot, BarChart3].map((Icon, i) => (
        <span
          key={i}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-lg",
            i === 0 ? "bg-white/10 text-cream" : "text-muted",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      ))}
    </div>
  );
}
