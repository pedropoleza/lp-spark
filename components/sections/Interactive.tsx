"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Send, Calculator } from "lucide-react";
import { Container, Section, SectionHeading, Reveal } from "../ui/primitives";
import { useSpark } from "../spark-context";
import { formatCurrency } from "@/lib/utils";

const STAGES = ["Novo Lead", "Primeiro Contato", "Reunião", "Fechamento"];

/** Seção 19 — microdemo interativa do pipeline. */
export function MicroDemo() {
  const [stage, setStage] = useState(0);
  const [sent, setSent] = useState(false);
  const hot = stage >= 2;

  function simulate() {
    if (stage < STAGES.length - 1) {
      setSent(true);
      setTimeout(() => {
        setStage((s) => Math.min(s + 1, STAGES.length - 1));
        setSent(false);
      }, 900);
    }
  }

  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="VEJA NA PRÁTICA"
          title="Veja como um lead se move dentro da Spark."
          description="Clique em “Simular follow-up” e acompanhe o lead avançando no pipeline com mensagem automática."
          className="mb-12"
        />
        <Reveal className="mx-auto max-w-3xl card-spark p-6 sm:p-8">
          <div className="mb-6 grid grid-cols-4 gap-2">
            {STAGES.map((s, i) => (
              <div key={s} className="text-center">
                <div
                  className={`mx-auto mb-2 h-1.5 rounded-full transition-all ${
                    i <= stage ? "bg-spark" : "bg-white/10"
                  }`}
                />
                <span className={`text-[10px] sm:text-xs ${i <= stage ? "text-cream" : "text-muted"}`}>
                  {s}
                </span>
              </div>
            ))}
          </div>

          <div className="relative min-h-[160px] rounded-card border border-white/10 bg-white/[0.02] p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-electric/20 font-semibold text-electric">
                    MS
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Maria S.</p>
                    <p className="text-xs text-muted">Interessada em seguro de vida</p>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    hot ? "bg-spark/15 text-spark" : "bg-white/5 text-muted"
                  }`}
                >
                  {hot && <Flame className="h-3 w-3" />}
                  {hot ? "Lead aquecido" : STAGES[stage]}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-xs text-lime"
                >
                  <Send className="h-3.5 w-3.5" /> Mensagem automática enviada para Maria...
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={simulate}
            disabled={stage >= STAGES.length - 1}
            className="btn-primary mt-6 w-full disabled:opacity-50"
          >
            {stage >= STAGES.length - 1 ? "Lead fechado 🎉" : "Simular follow-up"}
            {stage < STAGES.length - 1 && <ArrowRight className="h-4 w-4" />}
          </button>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Seção 20 — simulador de perda de oportunidades. */
export function LossCalculator() {
  const { openQuiz } = useSpark();
  const [leads, setLeads] = useState(60);
  const [lost, setLost] = useState(12);
  const [ticket, setTicket] = useState(900);

  const result = useMemo(() => Math.max(0, lost) * Math.max(0, ticket), [lost, ticket]);

  return (
    <Section>
      <Container>
        <div className="card-spark mx-auto max-w-4xl overflow-hidden p-6 sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-spark/15 text-spark">
              <Calculator className="h-5 w-5" />
            </div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Quanto custa perder leads por falta de follow-up?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <NumberField label="Leads que você recebe por mês" value={leads} onChange={setLeads} max={1000} />
            <NumberField label="Quantos você acha que perde por demora" value={lost} onChange={setLost} max={leads} />
            <NumberField label="Valor médio de uma venda (US$)" value={ticket} onChange={setTicket} max={100000} step={50} />
          </div>

          <div className="mt-8 rounded-card border border-spark/30 bg-gradient-to-br from-spark/[0.08] to-electric/[0.05] p-6 text-center">
            <p className="text-sm text-muted">
              Se apenas <span className="font-semibold text-cream">{lost}</span> leads forem perdidos
              por mês, sua operação pode estar deixando aproximadamente
            </p>
            <p className="my-2 font-display text-4xl font-bold gradient-text sm:text-5xl">
              {formatCurrency(result)}
            </p>
            <p className="text-sm text-muted">em oportunidades na mesa, todo mês.</p>
          </div>

          <p className="mt-4 text-center text-[11px] text-muted">
            Estimativa ilustrativa. Os resultados reais variam conforme operação, oferta e taxa de
            conversão.
          </p>

          <div className="mt-6 text-center">
            <button onClick={openQuiz} className="btn-primary">
              Organizar meus leads agora
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs text-muted">{label}</label>
      <input
        type="number"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-lg font-semibold outline-none transition focus:border-spark/50 focus:ring-2 focus:ring-spark/30"
      />
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-spark"
        aria-label={label}
      />
    </div>
  );
}
