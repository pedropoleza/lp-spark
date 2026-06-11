"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, CornerDownLeft, CalendarCheck, Flame, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Step =
  | { k: "agent" | "bot"; t: string }
  | { k: "system"; icon: "sent" | "reply"; t: string }
  | { k: "schedule" };

/** Roteiro: o agente pede ajuda → SparkBot orienta, contata o lead e agenda. */
const STEPS: Step[] = [
  { k: "agent", t: "Me ajuda a responder um lead que pediu desconto?" },
  {
    k: "bot",
    t: "Claro! Sugiro reforçar valor antes de preço: “Entendo! Antes de falar de valores, posso te mostrar o que está incluso? Assim você compara melhor.”",
  },
  { k: "bot", t: "Quer que eu já envie pra Maria e proponha um horário?" },
  { k: "agent", t: "Pode mandar 👍" },
  { k: "system", icon: "sent", t: "Mensagem enviada para Maria S." },
  { k: "system", icon: "reply", t: "Maria: “Pode ser! Tenho interesse no seguro de vida.”" },
  { k: "bot", t: "Ela topou 🎉 Agendando a reunião…" },
  { k: "schedule" },
];

const isBotStep = (s: Step) => s.k === "bot" || s.k === "schedule";

export function SparkBotChat() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  // Driver da sequência (auto-play quando entra na tela; reseta ao sair).
  useEffect(() => {
    if (!inView) {
      setVisible(0);
      setTyping(false);
      return;
    }
    if (reduce) {
      setVisible(STEPS.length);
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;

    const run = () => {
      if (cancelled || i >= STEPS.length) return;
      const step = STEPS[i];
      if (isBotStep(step)) {
        setTyping(true);
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(false);
            setVisible((v) => v + 1);
            i += 1;
            timers.push(setTimeout(run, 750));
          }, 1050),
        );
      } else {
        timers.push(
          setTimeout(
            () => {
              if (cancelled) return;
              setVisible((v) => v + 1);
              i += 1;
              timers.push(setTimeout(run, 650));
            },
            step.k === "agent" ? 520 : 820,
          ),
        );
      }
    };

    timers.push(setTimeout(run, 450));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  // Auto-scroll para a última mensagem.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [visible, typing, reduce]);

  return (
    <div ref={rootRef} className="card-spark relative z-0 p-5 pt-12">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="font-semibold">SparkBot</span>
        <span className="flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" /> online
        </span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-spark flex h-[340px] flex-col gap-3 overflow-y-auto pr-1"
      >
        {STEPS.slice(0, visible).map((s, idx) => (
          <Bubble key={idx} step={s} reduce={!!reduce} />
        ))}
        {typing && <Typing />}
      </div>
    </div>
  );
}

function inAnim(reduce: boolean) {
  return reduce
    ? {}
    : {
        initial: { opacity: 0, y: 10, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
      };
}

function Bubble({ step, reduce }: { step: Step; reduce: boolean }) {
  if (step.k === "agent") {
    return (
      <motion.div {...inAnim(reduce)} className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-accent/15 p-3 text-sm text-cream">
        {step.t}
      </motion.div>
    );
  }
  if (step.k === "bot") {
    return (
      <motion.div {...inAnim(reduce)} className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/[0.06] p-3 text-sm text-cream/90">
        {step.t}
      </motion.div>
    );
  }
  if (step.k === "system") {
    const Icon = step.icon === "sent" ? Check : CornerDownLeft;
    return (
      <motion.div
        {...inAnim(reduce)}
        className="mx-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-muted"
      >
        <Icon className="h-3 w-3 text-accent" />
        {step.t}
      </motion.div>
    );
  }
  // schedule
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 14 }}
      className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/[0.12] to-accent/[0.04] p-4"
    >
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/20 text-accent">
          <CalendarCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-cream">Reunião confirmada</p>
          <p className="text-xs text-muted">Maria S. · amanhã, 15:00</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted">
          Convidar <ArrowRight className="h-3 w-3" /> Reunião
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] text-accent">
          <Flame className="h-3 w-3" /> Lead Score: Hot
        </span>
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm bg-white/[0.06] px-3 py-2.5"
    >
      <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
      <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
      <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
    </motion.div>
  );
}
