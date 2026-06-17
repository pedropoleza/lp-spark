"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Bot, ArrowRight } from "lucide-react";
import type { TourStep } from "@/content/demo/tour";

/**
 * Tour guiado narrado pelo SparkBot: destaca o elemento (data-tour) com um
 * spotlight e mostra um balão. Não bloqueia a interação (o usuário pode mexer
 * no app enquanto o tour roda). Pulável.
 */
export function Tour({ steps, onComplete, onSkip }: { steps: TourStep[]; onComplete: () => void; onSkip: () => void }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const step = steps[i];

  useEffect(() => {
    setI(0);
  }, [steps]);

  useEffect(() => {
    let raf = 0;
    function measure() {
      const t = steps[i]?.target;
      if (!t) return setRect(null);
      const el = document.querySelector<HTMLElement>(`[data-tour="${t}"]`);
      setRect(el ? el.getBoundingClientRect() : null);
    }
    raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [i, steps]);

  if (!step) return null;
  const last = i >= steps.length - 1;
  const next = () => (last ? onComplete() : setI(i + 1));

  const bubble: CSSProperties = rect
    ? (() => {
        const below = rect.bottom + 170 < window.innerHeight;
        const left = Math.min(Math.max(rect.left, 12), Math.max(12, window.innerWidth - 332));
        return below ? { top: rect.bottom + 12, left } : { top: rect.top - 12, left, transform: "translateY(-100%)" };
      })()
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {rect ? (
        <div
          className="fixed rounded-xl border-2 border-accent transition-all duration-300"
          style={{ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12, boxShadow: "0 0 0 9999px rgba(8,8,12,0.72)" }}
        />
      ) : (
        <div className="fixed inset-0 bg-ink/70" />
      )}

      <div className="pointer-events-auto fixed w-[320px] max-w-[calc(100vw-24px)] rounded-2xl border border-accent/30 bg-card p-4 shadow-plan" style={bubble}>
        <div className="mb-2 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-accent">
            <Bot className="h-4 w-4" />
          </span>
          <span className="text-[13px] font-semibold text-cream">SparkBot</span>
          <span className="ml-auto text-[10px] text-muted">
            {i + 1}/{steps.length}
          </span>
        </div>
        <p className="text-[13px] leading-snug text-cream/90">{step.text}</p>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={onSkip} className="text-[11px] text-muted underline-offset-2 hover:text-cream hover:underline">
            Pular tutorial
          </button>
          <button onClick={next} className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[12px] font-semibold text-ink">
            {last ? "Entendi" : "Próximo"} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
