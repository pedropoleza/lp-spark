"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "./ui/Modal";
import { useSpark } from "./spark-context";

/** Exit intent apenas no desktop, uma vez por sessão. */
export function ExitIntent() {
  const { openQuiz, quizOpen, checkoutPlan } = useSpark();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (sessionStorage.getItem("spark_exit_shown")) return;

    function onLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !quizOpen && !checkoutPlan) {
        setOpen(true);
        sessionStorage.setItem("spark_exit_shown", "1");
        document.removeEventListener("mouseout", onLeave);
      }
    }
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [quizOpen, checkoutPlan]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} labelledBy="exit-title">
      <div className="p-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-spark/15">
          <Sparkles className="h-6 w-6 text-spark" />
        </div>
        <h2 id="exit-title" className="font-display text-2xl font-bold">
          Ainda em dúvida sobre o plano ideal?
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
          Responda 3 perguntas rápidas e veja qual plano combina melhor com o seu momento.
        </p>
        <button
          onClick={() => {
            setOpen(false);
            setTimeout(openQuiz, 200);
          }}
          className="btn-primary mt-6"
        >
          Fazer quiz agora
        </button>
      </div>
    </Modal>
  );
}
