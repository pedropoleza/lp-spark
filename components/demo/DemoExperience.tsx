"use client";

import { useEffect, useState, type FC } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, Zap, RotateCcw, StickyNote, X } from "lucide-react";
import { SparkProvider } from "@/components/spark-context";
import { SparkBackdrop } from "@/components/ui/SparkBackdrop";
import { FullscreenToggle } from "@/components/ui/FullscreenToggle";
import { DemoProvider, useDemo } from "./demo-context";
import { ProgressLadder } from "./ProgressLadder";
import { cn } from "@/lib/utils";

import { ColdOpen } from "./scenes/ColdOpen";
import { WhoWeAre } from "./scenes/WhoWeAre";
import { Quiz } from "./scenes/Quiz";
import { Diagnosis } from "./scenes/Diagnosis";
import { RecommendedPlan } from "./scenes/RecommendedPlan";
import { Showcase } from "./scenes/Showcase";
import { Journey } from "./scenes/Journey";
import { Trust } from "./scenes/Trust";
import { Onboarding } from "./scenes/Onboarding";
import { Close } from "./scenes/Close";
import { PlanSwitcher } from "./PlanSwitcher";
import { NOTES } from "@/content/demo/notes";

const CheckoutModal = dynamic(() => import("@/components/CheckoutModal").then((m) => m.CheckoutModal), { ssr: false });

const SCENES: { id: string; label: string; Comp: FC }[] = [
  { id: "abertura", label: "Abertura", Comp: ColdOpen },
  { id: "quem-somos", label: "Quem somos", Comp: WhoWeAre },
  { id: "quiz", label: "Diagnóstico", Comp: Quiz },
  { id: "diagnostico", label: "Sua dor", Comp: Diagnosis },
  { id: "plano", label: "Seu plano", Comp: RecommendedPlan },
  { id: "showcase", label: "Funcionando", Comp: Showcase },
  { id: "jornada", label: "Jornada", Comp: Journey },
  { id: "confianca", label: "Confiança", Comp: Trust },
  { id: "onboarding", label: "Implementação", Comp: Onboarding },
  { id: "fechamento", label: "Começar", Comp: Close },
];
const LABELS = SCENES.map((s) => s.label);

export function DemoExperience() {
  return (
    <SparkProvider>
      <DemoProvider total={SCENES.length}>
        <DemoInner />
        <CheckoutModal />
      </DemoProvider>
    </SparkProvider>
  );
}

function DemoInner() {
  const { scene, setScene, next, prev, mode, setMode, resetDemo, blackout, toggleBlackout } = useDemo();
  const Current = SCENES[scene].Comp;
  const [notesOn, setNotesOn] = useState(false);

  // entrada por URL: ?modo=solo e #cena=N
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("modo") === "solo") setMode("solo");
    const h = window.location.hash.match(/cena=(\d+)/);
    if (h) setScene(Number(h[1]));
  }, [setMode, setScene]);

  // navegação por teclado (apresentador)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      // não navega cenas com o checkout aberto
      if (document.querySelector('[role="dialog"]')) {
        if (e.key === "b" || e.key === "B") toggleBlackout();
        return;
      }
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "b" || e.key === "B") toggleBlackout();
      else if (e.key === "r" || e.key === "R") resetDemo();
      else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      } else if ((e.key === "n" || e.key === "N") && mode === "zoom") setNotesOn((v) => !v);
      else if (/^[1-9]$/.test(e.key)) setScene(Number(e.key) - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, resetDemo, toggleBlackout, setScene, mode]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-ink text-cream">
      <SparkBackdrop />

      {/* topo */}
      <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink">
            <Zap className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-bold">Spark Live Demo</span>
        </span>
        <div className="flex items-center gap-3">
          <PlanSwitcher className="hidden sm:flex" />
          <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px] font-medium">
            {(["zoom", "solo"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn("rounded-full px-2.5 py-1 capitalize transition", mode === m ? "bg-accent text-ink" : "text-muted hover:text-cream")}
              >
                {m}
              </button>
            ))}
          </div>
          <button onClick={resetDemo} title="Reiniciar (R)" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition hover:text-cream">
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          {mode === "zoom" && (
            <button
              onClick={() => setNotesOn((v) => !v)}
              title="Suas notas (N)"
              className={cn("grid h-8 w-8 place-items-center rounded-full border transition", notesOn ? "border-accent bg-accent/15 text-accent" : "border-white/10 text-muted hover:text-cream")}
            >
              <StickyNote className="h-3.5 w-3.5" />
            </button>
          )}
          <FullscreenToggle className="!h-8 !w-8" />
          <span className="font-mono text-[11px] tabular-nums text-muted">
            {scene + 1}/{SCENES.length}
          </span>
        </div>
      </header>

      {/* cena */}
      <main className="relative z-10 flex flex-1 items-center justify-center py-4">
        <div key={scene} className="w-full">
          <Current />
        </div>
      </main>

      {/* rodapé / navegação */}
      <footer className="relative z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <button
          onClick={prev}
          disabled={scene === 0}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition enabled:hover:border-accent/50 enabled:hover:text-cream disabled:opacity-30"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <ProgressLadder labels={LABELS} />
          <span className="text-[10px] uppercase tracking-wider text-muted">{SCENES[scene].label}</span>
        </div>
        <button
          onClick={next}
          disabled={scene === SCENES.length - 1}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition enabled:hover:border-accent/50 enabled:hover:text-cream disabled:opacity-30"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>

      {/* notas do apresentador (N) — só no Zoom, é a sua cola */}
      {mode === "zoom" && notesOn && (
        <div className="fixed bottom-24 left-4 z-[55] w-72 rounded-xl border border-accent/30 bg-ink/95 p-3 shadow-plan backdrop-blur">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="label-mono text-accent">Suas notas · N</span>
            <button onClick={() => setNotesOn(false)} aria-label="Fechar" className="text-muted hover:text-cream">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul className="space-y-1.5">
            {(NOTES[SCENES[scene].id] ?? []).map((n) => (
              <li key={n} className="flex gap-1.5 text-[12px] leading-snug text-cream/90">
                <span className="text-accent">•</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* blackout (B) — foco total no apresentador */}
      {blackout && (
        <button
          onClick={toggleBlackout}
          className="fixed inset-0 z-50 grid place-items-center bg-ink"
          aria-label="Sair do blackout"
        >
          <span className="flex items-center gap-2 text-sm text-muted">
            <Zap className="h-4 w-4 text-accent" /> Pressione B para voltar
          </span>
        </button>
      )}
    </div>
  );
}
