"use client";

import { useState, type ReactNode } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
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
import { TOUR } from "@/content/demo/tour";

export function Showcase() {
  const { activePlan, appFullscreen, toggleAppFullscreen } = useDemo();
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

  const shell = (
    <AppShell active={active} onNavigate={setActive}>
      {screens[active]}
    </AppShell>
  );

  const tourSteps = TOUR[active];
  const tourEl =
    !skipped && tourSteps && !completed.has(active) ? (
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
        <div className="h-full">{shell}</div>
        {tourEl}
      </div>
    );
  }

  return (
    <>
    <SceneFrame wide label="O Spark, funcionando" hint="Toque nas sugestões do SparkBot e abra o funil pra ver o que mudou. Use a lateral pra explorar.">
      <div className="relative h-[72vh] min-h-[540px]">
        <button
          onClick={toggleAppFullscreen}
          className="absolute -top-8 right-0 flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted transition hover:text-cream"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Tela cheia
        </button>
        {shell}
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
        Quando o SparkBot agenda ou reativa um lead, a <span className="text-cream">agenda</span> e o{" "}
        <span className="text-cream">funil</span> mudam na hora. Toque em <span className="text-accent">O que faz</span> pra explicar cada módulo.
      </p>
    </SceneFrame>
    {tourEl}
    </>
  );
}
