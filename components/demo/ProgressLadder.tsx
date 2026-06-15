"use client";

import { useDemo } from "./demo-context";
import { cn } from "@/lib/utils";

/** Indicador de progresso (dots). A cena atual vira um traço de accent. */
export function ProgressLadder({ labels }: { labels: string[] }) {
  const { scene, setScene } = useDemo();
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
