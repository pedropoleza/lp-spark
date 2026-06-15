"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { SCORED_QUESTIONS, PAIN_QUESTION, recomendarPlano, type PainKey } from "@/content/demo/quiz";

const TOTAL = 4;

function Opt({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-[15px] text-cream transition hover:border-accent/50 hover:bg-accent/[0.06]"
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100" />
    </button>
  );
}

export function Quiz() {
  const { setDiagnosis, next } = useDemo();
  const [step, setStep] = useState(0);
  const [pts, setPts] = useState<number[]>([0, 0, 0]);

  function pickScored(points: number) {
    const np = [...pts];
    np[step] = points;
    setPts(np);
    setStep((s) => s + 1);
  }
  function pickPain(key: PainKey) {
    const plan = recomendarPlano(pts[0], pts[1], pts[2]);
    setDiagnosis(plan, key);
    next();
  }

  const isPain = step === 3;

  return (
    <SceneFrame label={`Onde você está · ${Math.min(step + 1, TOTAL)} de ${TOTAL}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
            {isPain ? PAIN_QUESTION.question : SCORED_QUESTIONS[step].question}
          </h2>
          <div className="mx-auto mt-7 max-w-xl space-y-3">
            {isPain
              ? PAIN_QUESTION.options.map((o) => (
                  <Opt key={o.key} onClick={() => pickPain(o.key)}>
                    {o.label}
                  </Opt>
                ))
              : SCORED_QUESTIONS[step].options.map((o, i) => (
                  <Opt key={i} onClick={() => pickScored(o.points)}>
                    {o.label}
                  </Opt>
                ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto mt-9 flex max-w-xl gap-1.5">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-white/10"}`} />
        ))}
      </div>
    </SceneFrame>
  );
}
