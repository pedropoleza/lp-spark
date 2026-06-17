"use client";

import { useState, type ReactNode } from "react";
import { Maximize2, Minimize2, Check } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { AppShell, type ScreenId } from "../app/AppShell";
import { SparkBotPanel } from "../app/SparkBotPanel";
import { Funnel } from "../app/Funnel";
import { Conversations } from "../app/screens/Conversations";
import { Contacts } from "../app/screens/Contacts";
import { Calendars } from "../app/screens/Calendars";
import { Automation } from "../app/screens/Automation";
import { Dashboard } from "../app/screens/Dashboard";
import { LockedModule } from "../app/LockedModule";
import { useDemo } from "../demo-context";
import { PLAN_HAS, FEATURE_MINPLAN } from "@/content/demo/plans-features";
import { Tour } from "../Tour";
import { TOUR, BENEFITS } from "@/content/demo/tour";

/** Painel-guia do apresentador (Zoom): vantagens de cada módulo, em bullets. */
function BenefitsPanel({ active }: { active: ScreenId }) {
  const b = BENEFITS[active];
  if (!b) return null;
  return (
    <aside className="hidden w-60 shrink-0 flex-col overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:flex">
      <p className="label-mono">Pra que serve</p>
      <p className="mt-1 font-display text-base font-bold text-cream">{b.title}</p>
      <ul className="mt-3 space-y-2.5">
        {b.points.map((p) => (
          <li key={p} className="flex gap-2 text-[13px] leading-snug text-cream/85">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            {p}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function Showcase() {
  const { activePlan, appFullscreen, toggleAppFullscreen, mode } = useDemo();
  const [active, setActive] = useState<ScreenId>("ai");
  const [completed, setCompleted] = useState<Set<ScreenId>>(new Set());
  const [skipped, setSkipped] = useState(false);

  const screens: Record<ScreenId, ReactNode> = {
    ai: PLAN_HAS[activePlan].sparkbot ? (
      <div className="mx-auto h-full max-w-md">
        <SparkBotPanel />
      </div>
    ) : (
      <LockedModule title="SparkBot" minPlan={FEATURE_MINPLAN.sparkbot} />
    ),
    funil: <Funnel />,
    conversations: <Conversations />,
    contacts: <Contacts />,
    calendars: <Calendars />,
    automation: <Automation />,
    dashboard: <Dashboard />,
  };

  const body = (
    <div className="flex h-full gap-3">
      <div className="min-w-0 flex-1">
        <AppShell active={active} onNavigate={setActive}>
          {screens[active]}
        </AppShell>
      </div>
      {mode === "zoom" && <BenefitsPanel active={active} />}
    </div>
  );

  // Tour interativo (spotlight) só no modo solo (usuário final). No Zoom, o
  // apresentador se guia pelo painel de benefícios à direita.
  const tourSteps = TOUR[active];
  const tourEl =
    mode === "solo" && !skipped && tourSteps && !completed.has(active) ? (
      <Tour
        key={active}
        steps={tourSteps}
        onComplete={() => setCompleted((s) => new Set(s).add(active))}
        onSkip={() => setSkipped(true)}
      />
    ) : null;

  if (appFullscreen) {
    return (
      <div className="fixed inset-0 z-40 bg-ink p-3">
        <button
          onClick={toggleAppFullscreen}
          className="absolute right-5 top-5 z-50 flex items-center gap-1.5 rounded-full border border-white/15 bg-ink/80 px-3 py-1.5 text-xs text-cream backdrop-blur"
        >
          <Minimize2 className="h-3.5 w-3.5" /> Reduzir
        </button>
        <div className="h-full">{body}</div>
        {tourEl}
      </div>
    );
  }

  return (
    <>
      <SceneFrame wide label="O Spark, funcionando" hint="Navegue pelas telas na lateral. O painel à direita resume o valor de cada uma.">
        <div className="relative h-[72vh] min-h-[540px]">
          <button
            onClick={toggleAppFullscreen}
            className="absolute -top-8 right-0 flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted transition hover:text-cream"
          >
            <Maximize2 className="h-3.5 w-3.5" /> Tela cheia
          </button>
          {body}
        </div>
      </SceneFrame>
      {tourEl}
    </>
  );
}
