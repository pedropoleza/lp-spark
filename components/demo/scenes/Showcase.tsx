"use client";

import { useState, type ReactNode } from "react";
import { SceneFrame } from "../SceneFrame";
import { AppShell, type ScreenId } from "../app/AppShell";
import { SparkBotPanel } from "../app/SparkBotPanel";
import { Funnel } from "../app/Funnel";
import { Conversations } from "../app/screens/Conversations";
import { Contacts } from "../app/screens/Contacts";
import { Calendars } from "../app/screens/Calendars";
import { Automation } from "../app/screens/Automation";
import { Dashboard } from "../app/screens/Dashboard";

/** A estrela: o Spark funcionando. SparkBot opera o CRM e as telas reagem de verdade. */
export function Showcase() {
  const [active, setActive] = useState<ScreenId>("ai");

  const screens: Record<ScreenId, ReactNode> = {
    ai: (
      <div className="mx-auto h-full max-w-md">
        <SparkBotPanel />
      </div>
    ),
    funil: <Funnel />,
    conversations: <Conversations />,
    contacts: <Contacts />,
    calendars: <Calendars />,
    automation: <Automation />,
    dashboard: <Dashboard />,
  };

  return (
    <SceneFrame wide label="O Spark, funcionando" hint="Toque nas sugestões do SparkBot — e abra o funil pra ver o que mudou. Clique na lateral pra explorar.">
      <div className="h-[72vh] min-h-[540px]">
        <AppShell active={active} onNavigate={setActive}>
          {screens[active]}
        </AppShell>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
        Quando o SparkBot agenda ou reativa um lead, a <span className="text-cream">agenda</span> e o{" "}
        <span className="text-cream">funil</span> mudam na hora. Explore as telas na lateral — tudo é clicável.
      </p>
    </SceneFrame>
  );
}
