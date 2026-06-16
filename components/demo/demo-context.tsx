"use client";

import { createContext, useContext, useReducer, useState, useCallback, useMemo, type ReactNode } from "react";
import type { PlanId } from "@/lib/plans";
import { INITIAL_OPPS, INITIAL_AGENDA, type Opp, type AgendaEvent, type BotAction } from "@/content/demo/data";
import type { PainKey } from "@/content/demo/quiz";

export type DemoMode = "zoom" | "solo";

type Store = { opps: Opp[]; agenda: AgendaEvent[] };

type StoreAction = BotAction | { type: "reset" };

function storeReducer(state: Store, action: StoreAction): Store {
  switch (action.type) {
    case "agenda.add":
      if (state.agenda.some((e) => e.id === action.event.id)) return state;
      return { ...state, agenda: [...state.agenda, action.event] };
    case "opp.add":
      if (state.opps.some((o) => o.id === action.opp.id)) return state;
      return { ...state, opps: [action.opp, ...state.opps] };
    case "opp.move":
      return { ...state, opps: state.opps.map((o) => (o.id === action.id ? { ...o, stageId: action.toStage, ageDays: 0 } : o)) };
    case "reset":
      return { opps: INITIAL_OPPS, agenda: INITIAL_AGENDA };
    default:
      return state;
  }
}

type DemoCtx = {
  mode: DemoMode;
  setMode: (m: DemoMode) => void;
  total: number;
  scene: number;
  setScene: (i: number) => void;
  next: () => void;
  prev: () => void;
  // quiz
  plan: PlanId | null;
  pain: PainKey | null;
  setDiagnosis: (plan: PlanId, pain: PainKey) => void;
  // plano ativo na apresentação (começa no recomendado; o apresentador troca)
  activePlan: PlanId;
  setActivePlan: (p: PlanId) => void;
  // app do showcase em tela cheia
  appFullscreen: boolean;
  toggleAppFullscreen: () => void;
  // store compartilhado (o SparkBot e o funil mutam isto)
  store: Store;
  dispatch: (a: StoreAction) => void;
  resetDemo: () => void;
  // apresentação
  blackout: boolean;
  toggleBlackout: () => void;
};

const Ctx = createContext<DemoCtx | null>(null);

export function DemoProvider({ total, children }: { total: number; children: ReactNode }) {
  const [mode, setMode] = useState<DemoMode>("zoom");
  const [scene, setSceneRaw] = useState(0);
  const [plan, setPlan] = useState<PlanId | null>(null);
  const [pain, setPain] = useState<PainKey | null>(null);
  const [activePlan, setActivePlan] = useState<PlanId>("growth");
  const [appFullscreen, setAppFullscreen] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [store, dispatch] = useReducer(storeReducer, { opps: INITIAL_OPPS, agenda: INITIAL_AGENDA });

  const setScene = useCallback((i: number) => setSceneRaw(Math.max(0, Math.min(total - 1, i))), [total]);
  const next = useCallback(() => setSceneRaw((s) => Math.min(total - 1, s + 1)), [total]);
  const prev = useCallback(() => setSceneRaw((s) => Math.max(0, s - 1)), []);
  const setDiagnosis = useCallback((p: PlanId, k: PainKey) => { setPlan(p); setPain(k); setActivePlan(p); }, []);
  const toggleBlackout = useCallback(() => setBlackout((b) => !b), []);
  const toggleAppFullscreen = useCallback(() => setAppFullscreen((v) => !v), []);
  const resetDemo = useCallback(() => {
    dispatch({ type: "reset" });
    setPlan(null);
    setPain(null);
    setActivePlan("growth");
    setAppFullscreen(false);
    setBlackout(false);
    setSceneRaw(0);
  }, []);

  const value = useMemo<DemoCtx>(
    () => ({ mode, setMode, total, scene, setScene, next, prev, plan, pain, setDiagnosis, activePlan, setActivePlan, appFullscreen, toggleAppFullscreen, store, dispatch, resetDemo, blackout, toggleBlackout }),
    [mode, total, scene, setScene, next, prev, plan, pain, setDiagnosis, activePlan, appFullscreen, toggleAppFullscreen, store, resetDemo, blackout, toggleBlackout],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemo deve estar dentro de <DemoProvider>");
  return ctx;
}
