"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, RotateCcw, Sparkles, Check } from "lucide-react";
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
    setTimeout(reset, 300);
  }

  function pick(points: number) {
    const next = [...answers];
    next[step] = points;
    setAnswers(next);
    if (step === 0 && answers.length === 0) trackEvent("quiz_started");

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
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
    setTimeout(() => openCheckout(plan), 350);
  }
  function compareAll() {
    if (email) setPrefillEmail(email);
    handleClose();
    setTimeout(() => document.getElementById("comparar")?.scrollIntoView({ behavior: "smooth" }), 350);
  }

  return (
    <Modal open={quizOpen} onClose={handleClose} labelledBy="quiz-title" variant="page" topLabel="QUIZ · PLANO IDEAL">
      <div className="mx-auto max-w-5xl">
        {/* progresso brutalista */}
        <div className="mb-10 flex items-center gap-4">
          <Sparkles className="h-5 w-5 text-accent" />
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-lime"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="label-mono shrink-0">
            {phase === "result" ? "100%" : `${String(step + 1).padStart(2, "0")}/${String(QUIZ_QUESTIONS.length).padStart(2, "0")}`}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {phase === "questions" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
            >
              <div>
                <span className="label-mono">Pergunta {step + 1}</span>
                <h2
                  id="quiz-title"
                  className="mt-4 font-display font-bold leading-[1.05]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                >
                  {QUIZ_QUESTIONS[step].question}
                </h2>
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 text-sm text-muted underline-offset-4 hover:text-cream hover:underline"
                  >
                    ← Voltar
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {QUIZ_QUESTIONS[step].options.map((opt, i) => (
                  <motion.button
                    key={opt.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => pick(opt.points)}
                    className="group glass-card flex min-h-[120px] flex-col justify-between rounded-card p-5 text-left transition hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    <span className="text-base font-medium leading-snug text-cream">{opt.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[40vh] flex-col items-center justify-center text-center"
            >
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <p className="mt-5 text-muted">Calculando seu plano ideal...</p>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-10 lg:grid-cols-2 lg:items-center"
            >
              <div>
                <span className="label-mono">Recomendação</span>
                <h2 id="quiz-title" className="mt-4 font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                  <span className="gradient-text">{planContent.name}</span>
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{QUIZ_REASONS[plan]}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-4xl font-bold">US$ {planContent.price}</span>
                  <span className="mb-1 text-muted">/mês</span>
                </div>
              </div>

              <div className="glass-card rounded-card-lg p-6 sm:p-8">
                <p className="mb-4 font-display text-lg font-bold">O que você leva:</p>
                <ul className="mb-6 grid gap-2.5">
                  {planContent.features.filter((f) => !f.endsWith(":")).slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                    </li>
                  ))}
                </ul>

                <label htmlFor="quiz-email" className="mb-1.5 block text-xs text-muted">
                  Melhor email para enviarmos sua recomendação? (opcional)
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="mb-5 w-full rounded-xl border border-cream/10 bg-cream/[0.03] px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
                />

                <button onClick={followRecommendation} className="btn-primary w-full">
                  Adquirir {planContent.name} <ArrowRight className="h-4 w-4" />
                </button>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <button onClick={compareAll} className="text-muted underline-offset-4 hover:text-cream hover:underline">
                    Comparar todos os planos
                  </button>
                  <button onClick={reset} className="inline-flex items-center gap-1 text-muted underline-offset-4 hover:text-cream hover:underline">
                    <RotateCcw className="h-3 w-3" /> Refazer quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
