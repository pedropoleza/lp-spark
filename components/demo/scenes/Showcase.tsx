"use client";

import { useState } from "react";
import { SceneFrame } from "../SceneFrame";
import { AppShell, type ScreenId } from "../app/AppShell";
import { SparkBotPanel } from "../app/SparkBotPanel";
import { Funnel } from "../app/Funnel";

/** A estrela: o Spark funcionando. O SparkBot opera o CRM e as telas reagem de verdade. */
export function Showcase() {
  const [active, setActive] = useState<ScreenId>("ai");
  return (
    <SceneFrame wide label="O Spark, funcionando" hint="Toque nas sugestões do SparkBot — e depois abra o funil pra ver o que mudou.">
      <div className="h-[70vh] min-h-[520px]">
        <AppShell active={active} onNavigate={setActive}>
          {active === "ai" ? (
            <div className="mx-auto h-full max-w-md">
              <SparkBotPanel />
            </div>
          ) : (
            <Funnel />
          )}
        </AppShell>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
        Quando o SparkBot agenda ou reativa um lead, a <span className="text-cream">agenda</span> e o{" "}
        <span className="text-cream">funil</span> mudam na hora. Alterne entre{" "}
        <span className="text-accent">AI Hub</span> e <span className="text-accent">Opportunities</span> na lateral.
      </p>
    </SceneFrame>
  );
}
