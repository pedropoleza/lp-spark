"use client";

import { useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Toggle de tela cheia (experiência "app", estilo F11) — minimalista.
 * Só aparece onde o Fullscreen API é confiável (tablet/desktop); some no mobile.
 */
export function FullscreenToggle({ className }: { className?: string }) {
  const [fs, setFs] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof document !== "undefined" && !!document.fullscreenEnabled);
    const onChange = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!supported) return null;

  const toggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={fs ? "Sair da tela cheia" : "Tela cheia"}
      title={fs ? "Sair da tela cheia (Esc)" : "Modo tela cheia"}
      className={cn(
        "hidden h-9 w-9 place-items-center rounded-full border border-cream/15 text-muted transition-colors duration-200 hover:border-accent/50 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:grid",
        className,
      )}
    >
      {fs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
    </button>
  );
}
