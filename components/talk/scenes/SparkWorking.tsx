"use client";

import { useState, type ReactNode } from "react";
import { Play, Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";
import { useDemo } from "@/components/demo/demo-context";
import { AppShell, type ScreenId } from "@/components/demo/app/AppShell";
import { SparkBotPanel } from "@/components/demo/app/SparkBotPanel";
import { Funnel } from "@/components/demo/app/Funnel";
import { Conversations } from "@/components/demo/app/screens/Conversations";
import { Contacts } from "@/components/demo/app/screens/Contacts";
import { Calendars } from "@/components/demo/app/screens/Calendars";
import { Automation } from "@/components/demo/app/screens/Automation";
import { Dashboard } from "@/components/demo/app/screens/Dashboard";

export function SparkWorking() {
  const { mode } = useTalk();
  const { dispatch } = useDemo();
  const [active, setActive] = useState<ScreenId>("funil");
  const [played, setPlayed] = useState(false);

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

  function play() {
    // a esteira de follow-up "acorda" um lead parado e o faz avançar sozinho
    setActive("funil");
    dispatch({ type: "opp.move", id: "o3", toStage: "apresentacao" });
    setPlayed(true);
  }

  return (
    <TalkSceneFrame wide label="O Spark, funcionando" hint="Clique nas telas na lateral. Comece pela Automação, a esteira de follow-up.">
      <div className="mb-3 flex items-center justify-center gap-3">
        <p className="text-center text-sm text-muted">
          Cada lead entra numa esteira. <span className="text-cream">O sistema lembra e age por você.</span>
        </p>
        <button
          onClick={play}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            played ? "border-lime/40 bg-lime/10 text-lime" : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
          }`}
        >
          {played ? <Check className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {played ? "Lead avançou sozinho" : "Ver a esteira agir"}
        </button>
      </div>

      <div className="h-[66vh] min-h-[500px]">
        <AppShell active={active} onNavigate={setActive}>
          {screens[active]}
        </AppShell>
      </div>
    </TalkSceneFrame>
  );
}
