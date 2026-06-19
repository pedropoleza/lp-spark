"use client";

import { useState, type ReactNode } from "react";
import { TalkSceneFrame } from "../bits";
import { AppShell, type ScreenId } from "@/components/demo/app/AppShell";
import { SparkBotPanel } from "@/components/demo/app/SparkBotPanel";
import { Funnel } from "@/components/demo/app/Funnel";
import { Conversations } from "@/components/demo/app/screens/Conversations";
import { Contacts } from "@/components/demo/app/screens/Contacts";
import { Calendars } from "@/components/demo/app/screens/Calendars";
import { Automation } from "@/components/demo/app/screens/Automation";
import { Dashboard } from "@/components/demo/app/screens/Dashboard";

export function ProductBoss() {
  const [active, setActive] = useState<ScreenId>("funil");

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
    <TalkSceneFrame wide label="O Spark, funcionando" hint="Troque as telas pela lateral: Funil (selo Five Rings), Conversas, Automação.">
      <div className="h-[68vh] min-h-[500px]">
        <AppShell active={active} onNavigate={setActive}>
          {screens[active]}
        </AppShell>
      </div>
    </TalkSceneFrame>
  );
}
