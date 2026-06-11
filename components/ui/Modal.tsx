"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "center" | "page";

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
  className,
  variant = "center",
  topLabel,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
  className?: string;
  /** "center" = card centralizado · "page" = experiência de tela cheia (brutalista). */
  variant?: Variant;
  /** Rótulo mono exibido no topo da variante "page". */
  topLabel?: string;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (variant === "page") {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            data-lenis-prevent
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* fundo decorativo suave */}
            <div className="halo left-[-5%] top-[-5%] h-[30rem] w-[30rem] bg-accent/20" />
            <div className="halo right-[-5%] bottom-[-5%] h-[28rem] w-[28rem] bg-accent/10" />

            {/* header limpo com close no canto superior direito */}
            <header className="sticky top-0 z-20 bg-ink/60 backdrop-blur-md">
              <div className="container-spark flex h-16 items-center justify-between">
                <span className="text-xs font-medium tracking-wide text-muted">
                  {topLabel ?? "Spark Leads"}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/10 bg-cream/5 text-muted transition hover:rotate-90 hover:border-accent/50 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className={cn("container-spark relative z-10 flex-1 py-10 sm:py-16", className)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // —— variante centralizada ——
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            data-lenis-prevent
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "glass-card relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-card-lg shadow-plan",
              "h-full max-h-full rounded-none sm:h-auto sm:max-h-[90vh] sm:rounded-card-lg",
              className,
            )}
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-cream/10 bg-cream/5 text-muted transition hover:bg-cream/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
