"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { TALK_NOTES } from "@/content/talk/notes";
import { ORG_NOTES } from "@/content/talk/notes-org";
import { FOLLOWUP_SCENE_META, ORG_SCENE_META, type SceneMeta } from "@/content/talk/decks-meta";

type Variant = "followup" | "organizacao";

const DECKS: Record<Variant, { meta: SceneMeta[]; notes: Record<string, string[]>; brand: string }> = {
  followup: { meta: FOLLOWUP_SCENE_META, notes: TALK_NOTES, brand: "Follow-up" },
  organizacao: { meta: ORG_SCENE_META, notes: ORG_NOTES, brand: "Organização" },
};

export function TalkNotes({ variant = "followup" }: { variant?: Variant }) {
  const { meta, notes, brand } = DECKS[variant] ?? DECKS.followup;
  const total = meta.length;
  const storeKey = `spark-notes-${variant}`;
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  // restaura a posição (caso recarregue no meio da palestra)
  useEffect(() => {
    const s = Number(localStorage.getItem(storeKey));
    if (Number.isInteger(s) && s >= 0 && s < total) setI(s);
  }, [storeKey, total]);

  useEffect(() => {
    try {
      localStorage.setItem(storeKey, String(i));
    } catch {
      /* ignore */
    }
  }, [i, storeKey]);

  const go = (n: number) => setI((c) => Math.max(0, Math.min(total - 1, n ?? c)));
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const scene = meta[i];
  const bullets = notes[scene.id] ?? [];

  return (
    <div
      className="flex min-h-dvh flex-col bg-ink text-cream"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx < -50) next();
        else if (dx > 50) prev();
        touchX.current = null;
      }}
    >
      {/* topo */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-ink/95 px-4 py-3 backdrop-blur">
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-ink">
            <Zap className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-bold">Roteiro · {brand}</span>
        </span>
        <select
          value={i}
          onChange={(e) => go(Number(e.target.value))}
          className="max-w-[55%] rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1.5 text-sm text-cream outline-none"
          aria-label="Ir para a cena"
        >
          {meta.map((m, idx) => (
            <option key={m.id} value={idx} className="bg-ink text-cream">
              {idx + 1}. {m.label}
            </option>
          ))}
        </select>
      </header>

      {/* conteúdo */}
      <main className="flex-1 px-5 py-6">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Cena {i + 1} de {total}
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-cream">{scene.label}</h1>

        <ul className="mt-6 space-y-5">
          {bullets.map((b) => {
            const stage = b.trim().startsWith("[");
            return (
              <li key={b} className="flex gap-3">
                {stage ? (
                  <span className="text-lg leading-relaxed text-muted/80 italic">{b}</span>
                ) : (
                  <>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span className="text-[1.35rem] font-medium leading-relaxed text-cream">{b}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </main>

      {/* navegação inferior (polegar) */}
      <footer className="sticky bottom-0 z-10 flex items-center gap-3 border-t border-white/10 bg-ink/95 px-4 py-3 backdrop-blur">
        <button
          onClick={prev}
          disabled={i === 0}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 text-muted transition enabled:active:scale-95 enabled:hover:text-cream disabled:opacity-30"
          aria-label="Cena anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="min-w-[3.5rem] text-center font-mono text-sm tabular-nums text-muted">
          {i + 1}/{total}
        </span>
        <button
          onClick={next}
          disabled={i === total - 1}
          className="flex h-14 flex-[2] items-center justify-center gap-2 rounded-xl bg-accent font-semibold text-ink transition enabled:active:scale-95 disabled:opacity-30"
          aria-label="Próxima cena"
        >
          Próxima <ChevronRight className="h-6 w-6" />
        </button>
      </footer>
    </div>
  );
}
