"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { Modal } from "./ui/Modal";
import { useSpark } from "./spark-context";
import { QUIZ_QUESTIONS, recomendarPlano, QUIZ_REASONS } from "@/lib/quiz";
import { PLAN_CONTENT } from "@/content/pt-br";
import { trackEvent } from "@/lib/analytics";

type Phase = "questions" | "loading" | "result";

export function QuizModal() {
  const { quizOpen, closeQuiz, setQuizResult, setPrefillEmail, openCheckout } = useSpark();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("questions");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<ReturnType<typeof recomendarPlano>>("starter");

  function reset() {
    setStep(0);
    setAnswers([]);
    setPhase("questions");
    setEmail("");
  }

  function handleClose() {
    closeQuiz();
    // pequeno atraso para não piscar durante a animação de saída
    setTimeout(reset, 250);
  }

  function pick(points: number) {
    const next = [...answers];
    next[step] = points;
    setAnswers(next);

    if (step === 0 && answers.length === 0) trackEvent("quiz_started");

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // calcula
      setPhase("loading");
      const [p1, p2, p3] = next;
      const recommended = recomendarPlano(p1, p2, p3);
      const score = p1 + p2 + p3;
      setTimeout(() => {
        setPlan(recommended);
        setPhase("result");
        setQuizResult({ plan: recommended, score });
        trackEvent("quiz_completed", { score });
        trackEvent("plan_recommended", { plan: recommended, score });
      }, 900);
    }
  }

  const progress = phase === "result" ? 100 : (step / QUIZ_QUESTIONS.length) * 100;
  const planContent = PLAN_CONTENT.find((p) => p.id === plan)!;

  function followRecommendation() {
    if (email) setPrefillEmail(email);
    setQuizResult({ plan, score: answers.reduce((a, b) => a + b, 0) });
    handleClose();
    setTimeout(() => openCheckout(plan), 300);
  }

  function compareAll() {
    if (email) setPrefillEmail(email);
    handleClose();
    setTimeout(
      () => document.getElementById("comparar")?.scrollIntoView({ behavior: "smooth" }),
      300,
    );
  }

  return (
    <Modal open={quizOpen} onClose={handleClose} labelledBy="quiz-title" fullscreenMobile>
      <div className="p-6 sm:p-8">
        <div className="mb-1 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-spark" />
          <span className="label-mono">Descobrir meu plano ideal</span>
        </div>

        {/* barra de progresso */}
        <div className="mb-6 mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-electric via-spark to-lime"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {phase === "questions" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <h2 id="quiz-title" className="font-display text-xl font-bold sm:text-2xl">
                {QUIZ_QUESTIONS[step].question}
              </h2>
              <p className="mt-1 text-xs text-muted">
                Pergunta {step + 1} de {QUIZ_QUESTIONS.length}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {QUIZ_QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => pick(opt.points)}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm transition hover:border-spark/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-spark" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-5 text-xs text-muted underline-offset-4 hover:text-cream hover:underline"
                >
                  ← Voltar
                </button>
              )}
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-spark" />
              <p className="mt-4 text-sm text-muted">Calculando seu plano ideal...</p>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="label-mono">Recomendação</span>
              <h2 id="quiz-title" className="mt-2 font-display text-2xl font-bold">
                Seu plano ideal é o{" "}
                <span className="gradient-text">Spark Leads {planContent.name}</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{QUIZ_REASONS[plan]}</p>

              <div className="mt-5 rounded-card border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold">{planContent.name}</span>
                  <span className="font-display text-2xl font-bold">
                    US$ {planContent.price}
                    <span className="text-sm font-normal text-muted">/mês</span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">{planContent.tagline}</p>
              </div>

              <div className="mt-5">
                <label htmlFor="quiz-email" className="mb-1.5 block text-xs text-muted">
                  Qual o melhor email para enviarmos sua recomendação? (opcional)
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-spark/50 focus:ring-2 focus:ring-spark/30"
                />
              </div>

              <button onClick={followRecommendation} className="btn-primary mt-5 w-full">
                Seguir com {planContent.name} <ArrowRight className="h-4 w-4" />
              </button>
              <div className="mt-3 flex items-center justify-between text-xs">
                <button
                  onClick={compareAll}
                  className="text-muted underline-offset-4 hover:text-cream hover:underline"
                >
                  Comparar todos os planos
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-muted underline-offset-4 hover:text-cream hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Refazer quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
