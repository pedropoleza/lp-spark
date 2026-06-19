"use client";

import { useEffect, useState, type FC } from "react";
import { ChevronLeft, ChevronRight, Zap, RotateCcw, StickyNote, X } from "lucide-react";
import { SparkProvider } from "@/components/spark-context";
import { SparkBackdrop } from "@/components/ui/SparkBackdrop";
import { FullscreenToggle } from "@/components/ui/FullscreenToggle";
import { DemoProvider } from "@/components/demo/demo-context";
import { TalkProvider, useTalk } from "./talk-context";
import { TALK_NOTES } from "@/content/talk/notes";
import { ORG_NOTES } from "@/content/talk/notes-org";
import { BOSS_NOTES } from "@/content/talk/notes-boss";
import { cn } from "@/lib/utils";

import { Cover } from "./scenes/Cover";
import { Hook } from "./scenes/Hook";
import { Founder } from "./scenes/Founder";
import { AgentDay } from "./scenes/AgentDay";
import { Poll } from "./scenes/Poll";
import { Gap } from "./scenes/Gap";
import { WhySystem } from "./scenes/WhySystem";
import { Calculator } from "./scenes/Calculator";
import { Cadence } from "./scenes/Cadence";
import { Scripts } from "./scenes/Scripts";
import { GoldMine } from "./scenes/GoldMine";
import { BeforeAfter } from "./scenes/BeforeAfter";
import { Bridge } from "./scenes/Bridge";
import { SparkWorking } from "./scenes/SparkWorking";
import { Reasons } from "./scenes/Reasons";
import { Close } from "./scenes/Close";

import { CoverOrg } from "./scenes-org/CoverOrg";
import { HookOrg } from "./scenes-org/HookOrg";
import { AmateurPro } from "./scenes-org/AmateurPro";
import { ChaosDay } from "./scenes-org/ChaosDay";
import { ChaosCalc } from "./scenes-org/ChaosCalc";
import { FallingBehind } from "./scenes-org/FallingBehind";
import { WhatIsCrm } from "./scenes-org/WhatIsCrm";
import { AlreadyHaveCrm } from "./scenes-org/AlreadyHaveCrm";
import { StartSimple } from "./scenes-org/StartSimple";
import { SpreadsheetBreaks } from "./scenes-org/SpreadsheetBreaks";
import { ReasonsOrg } from "./scenes-org/ReasonsOrg";
import { OfferOrg } from "./scenes-org/OfferOrg";
import { CloseOrg } from "./scenes-org/CloseOrg";

import { CoverBoss } from "./scenes-boss/CoverBoss";
import { MomentBoss } from "./scenes-boss/MomentBoss";
import { AgendaBoss } from "./scenes-boss/AgendaBoss";
import { ParityBoss } from "./scenes-boss/ParityBoss";
import { ProductBoss } from "./scenes-boss/ProductBoss";
import { MigrationBoss } from "./scenes-boss/MigrationBoss";
import { ArchitectBoss } from "./scenes-boss/ArchitectBoss";
import { SnapshotsBoss } from "./scenes-boss/SnapshotsBoss";
import { FiveRingsBoss } from "./scenes-boss/FiveRingsBoss";
import { SecurityBoss } from "./scenes-boss/SecurityBoss";
import { RecapBoss } from "./scenes-boss/RecapBoss";
import { CloseBoss } from "./scenes-boss/CloseBoss";

type SceneDef = { id: string; label: string; Comp: FC };
type Deck = { scenes: SceneDef[]; notes: Record<string, string[]>; brand: string };

const FOLLOWUP_SCENES: SceneDef[] = [
  { id: "capa", label: "Capa", Comp: Cover },
  { id: "gancho", label: "O gancho", Comp: Hook },
  { id: "pedro", label: "Quem sou eu", Comp: Founder },
  { id: "rotina", label: "Seu dia", Comp: AgentDay },
  { id: "enquete", label: "Enquete", Comp: Poll },
  { id: "lacuna", label: "A lacuna", Comp: Gap },
  { id: "sistema", label: "Falta sistema", Comp: WhySystem },
  { id: "calculadora", label: "Calculadora", Comp: Calculator },
  { id: "cadencia", label: "A cadência", Comp: Cadence },
  { id: "roteiro", label: "O que dizer", Comp: Scripts },
  { id: "mina", label: "Mina de ouro", Comp: GoldMine },
  { id: "antes-depois", label: "Antes × depois", Comp: BeforeAfter },
  { id: "ponte", label: "A virada", Comp: Bridge },
  { id: "spark", label: "Funcionando", Comp: SparkWorking },
  { id: "motivos", label: "3 motivos", Comp: Reasons },
  { id: "fechamento", label: "Começar", Comp: Close },
];

const ORG_SCENES: SceneDef[] = [
  { id: "capa", label: "Capa", Comp: CoverOrg },
  { id: "gancho", label: "O gancho", Comp: HookOrg },
  { id: "pedro", label: "Quem sou eu", Comp: Founder },
  { id: "amador-pro", label: "Amador × Pro", Comp: AmateurPro },
  { id: "caos", label: "Seu dia", Comp: ChaosDay },
  { id: "calculadora", label: "Custo do caos", Comp: ChaosCalc },
  { id: "ficar-atras", label: "Ficar pra trás", Comp: FallingBehind },
  { id: "crm", label: "O que é CRM", Comp: WhatIsCrm },
  { id: "ja-tem", label: "Você já tem", Comp: AlreadyHaveCrm },
  { id: "comece-simples", label: "Comece simples", Comp: StartSimple },
  { id: "planilha-quebra", label: "A virada", Comp: SpreadsheetBreaks },
  { id: "spark", label: "Funcionando", Comp: SparkWorking },
  { id: "motivos", label: "3 motivos", Comp: ReasonsOrg },
  { id: "oferta", label: "A oferta", Comp: OfferOrg },
  { id: "fechamento", label: "Agendar demo", Comp: CloseOrg },
];

const BOSS_SCENES: SceneDef[] = [
  { id: "capa", label: "Abertura", Comp: CoverBoss },
  { id: "momento", label: "O momento", Comp: MomentBoss },
  { id: "agenda", label: "Agenda", Comp: AgendaBoss },
  { id: "paridade", label: "Tudo num lugar", Comp: ParityBoss },
  { id: "produto", label: "Funcionando", Comp: ProductBoss },
  { id: "migracao", label: "Sair do Como", Comp: MigrationBoss },
  { id: "arquiteta", label: "De usuária a arquiteta", Comp: ArchitectBoss },
  { id: "snapshots", label: "Snapshots", Comp: SnapshotsBoss },
  { id: "fiverings", label: "Five Rings", Comp: FiveRingsBoss },
  { id: "seguranca", label: "Segurança", Comp: SecurityBoss },
  { id: "recap", label: "A estrutura", Comp: RecapBoss },
  { id: "fechamento", label: "Próximo passo", Comp: CloseBoss },
];

const DECKS: Record<string, Deck> = {
  followup: { scenes: FOLLOWUP_SCENES, notes: TALK_NOTES, brand: "Spark · Palestra" },
  organizacao: { scenes: ORG_SCENES, notes: ORG_NOTES, brand: "Spark · Organização" },
  boss: { scenes: BOSS_SCENES, notes: BOSS_NOTES, brand: "Spark · BO$$" },
};

export type TalkVariant = keyof typeof DECKS;

export function TalkExperience({ variant = "followup" }: { variant?: TalkVariant }) {
  const deck = DECKS[variant] ?? DECKS.followup;
  return (
    <SparkProvider>
      <DemoProvider total={1}>
        <TalkProvider total={deck.scenes.length}>
          <TalkInner deck={deck} />
        </TalkProvider>
      </DemoProvider>
    </SparkProvider>
  );
}

function TalkProgress({ labels }: { labels: string[] }) {
  const { scene, setScene } = useTalk();
  return (
    <div className="flex items-center gap-1.5">
      {labels.map((l, i) => (
        <button key={i} onClick={() => setScene(i)} title={l} aria-label={l} className="py-2">
          <span
            className={cn(
              "block h-1.5 rounded-full transition-all duration-300",
              i === scene ? "w-7 bg-accent" : i < scene ? "w-1.5 bg-accent/50" : "w-1.5 bg-white/15 hover:bg-white/30",
            )}
          />
        </button>
      ))}
    </div>
  );
}

function TalkInner({ deck }: { deck: Deck }) {
  const { scenes, notes, brand } = deck;
  const labels = scenes.map((s) => s.label);
  const { scene, setScene, next, prev, mode, setMode, resetTalk, blackout, toggleBlackout } = useTalk();
  const Current = scenes[scene].Comp;
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
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "b" || e.key === "B") toggleBlackout();
      else if (e.key === "r" || e.key === "R") resetTalk();
      else if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      } else if ((e.key === "n" || e.key === "N") && mode === "zoom") setNotesOn((v) => !v);
      else if (/^[1-9]$/.test(e.key)) setScene(Number(e.key) - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, resetTalk, toggleBlackout, setScene, mode]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-ink text-cream">
      <SparkBackdrop />

      {/* topo */}
      <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink">
            <Zap className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-bold">{brand}</span>
        </span>
        <div className="flex items-center gap-3">
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
          <button onClick={resetTalk} title="Reiniciar (R)" className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition hover:text-cream">
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
            {scene + 1}/{scenes.length}
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
          <TalkProgress labels={labels} />
          <span className="text-[10px] uppercase tracking-wider text-muted">{scenes[scene].label}</span>
        </div>
        <button
          onClick={next}
          disabled={scene === scenes.length - 1}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition enabled:hover:border-accent/50 enabled:hover:text-cream disabled:opacity-30"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>

      {/* roteiro do apresentador (N), só no Zoom */}
      {mode === "zoom" && notesOn && (
        <div className="fixed bottom-24 left-4 z-[55] max-h-[64vh] w-[23rem] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-accent/30 bg-ink/95 p-4 shadow-plan backdrop-blur">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="label-mono text-accent">
              Roteiro · {scene + 1}/{scenes.length} · {scenes[scene].label}
            </span>
            <button onClick={() => setNotesOn(false)} aria-label="Fechar" className="text-muted hover:text-cream">
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-2.5">
            {(notes[scenes[scene].id] ?? []).map((n) => (
              <li key={n} className="flex gap-2 text-[14.5px] leading-relaxed text-cream">
                <span className="mt-[3px] text-accent">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* blackout (B) */}
      {blackout && (
        <button onClick={toggleBlackout} className="fixed inset-0 z-50 grid place-items-center bg-ink" aria-label="Sair do blackout">
          <span className="flex items-center gap-2 text-sm text-muted">
            <Zap className="h-4 w-4 text-accent" /> Pressione B para voltar
          </span>
        </button>
      )}
    </div>
  );
}
