"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, Check, Sparkles } from "lucide-react";
import { Modal } from "./ui/Modal";
import { BotVideo } from "./ui/BotVideo";
import { SparkLoader } from "./ui/vector";
import { useSpark } from "./spark-context";
import { QUIZ_QUESTIONS, recomendarPlano, QUIZ_REASONS } from "@/lib/quiz";
import { PLAN_CONTENT } from "@/content/pt-br";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Phase = "questions" | "loading" | "result";

export function QuizModal() {
  const { quizOpen, closeQuiz, setQuizResult, setPrefillEmail } = useSpark();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("questions");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<ReturnType<typeof recomendarPlano>>("starter");

  function reset() {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setPhase("questions");
    setEmail("");
  }
  function handleClose() {
    closeQuiz();
    setTimeout(reset, 300);
  }

  function pick(optIndex: number, points: number) {
    if (selected !== null) return;
    setSelected(optIndex);
    if (step === 0 && answers.length === 0) trackEvent("quiz_started");

    const next = [...answers];
    next[step] = points;
    setAnswers(next);

    // micro-feedback de seleção antes de avançar
    setTimeout(() => {
      setSelected(null);
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
        }, 1000);
      }
    }, reduce ? 80 : 340);
  }

  const planContent = PLAN_CONTENT.find((p) => p.id === plan)!;

  function followRecommendation() {
    if (email) setPrefillEmail(email);
    setQuizResult({ plan, score: answers.reduce((a, b) => a + b, 0) });
    handleClose();
    router.push(`/checkout/${plan}`);
  }
  function compareAll() {
    if (email) setPrefillEmail(email);
    handleClose();
    setTimeout(
      () => document.getElementById("comparar")?.scrollIntoView({ behavior: "smooth" }),
      350,
    );
  }

  const q = QUIZ_QUESTIONS[step];

  return (
    <Modal open={quizOpen} onClose={handleClose} labelledBy="quiz-title" variant="page" topLabel="Plano ideal">
      <div className="mx-auto w-full max-w-6xl">
        {/* pré-carrega o clipe do resultado assim que o usuário entra no quiz */}
        {phase !== "result" && (
          <video
            aria-hidden
            muted
            playsInline
            preload="auto"
            className="pointer-events-none absolute h-px w-px opacity-0"
          >
            <source src="/bot/bot-pick.webm" type="video/webm" />
            <source src="/bot/bot-pick.mp4" type="video/mp4" />
          </video>
        )}

        {/* progresso segmentado, minimalista */}
        <div className="mx-auto mb-12 flex max-w-xs items-center gap-2">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-cream/10">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{
                  width:
                    phase !== "questions" || i < step ? "100%" : i === step ? "40%" : "0%",
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {phase === "questions" && (
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -28, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-center text-sm text-muted">
                {step + 1} de {QUIZ_QUESTIONS.length}
              </p>
              <h2
                id="quiz-title"
                className="mx-auto mt-3 max-w-3xl text-center font-display font-bold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.3rem)" }}
              >
                {q.question}
              </h2>

              <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt.label}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={reduce ? undefined : { y: -3 }}
                    onClick={() => pick(i, opt.points)}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      selected === i
                        ? "border-accent bg-accent/10"
                        : "border-cream/10 bg-cream/[0.04] hover:border-accent/50 hover:bg-cream/[0.07]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors",
                        selected === i
                          ? "border-accent bg-accent text-ink"
                          : "border-cream/15 text-muted group-hover:border-accent/50 group-hover:text-accent",
                      )}
                    >
                      {selected === i ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-base leading-snug text-cream sm:text-lg">{opt.label}</span>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-accent opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.button>
                ))}
              </div>

              {step > 0 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-sm text-muted underline-offset-4 hover:text-cream hover:underline"
                  >
                    ← Voltar
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[45vh] flex-col items-center justify-center text-center"
            >
              <SparkLoader />
              <p className="mt-6 text-muted">Cruzando suas respostas com os planos...</p>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-12 lg:grid-cols-2 lg:items-center"
            >
              <div className="text-center lg:text-left">
                {/* mascote comemorando — clipe inteiro, sem corte */}
                <motion.div
                  initial={reduce ? false : { scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.15 }}
                  className="relative mx-auto w-full max-w-[320px] lg:mx-0"
                >
                  {/* glow atrás */}
                  <div className="absolute -inset-5 rounded-[2rem] bg-accent/25 blur-3xl" />

                  {/* faíscas em volta */}
                  {!reduce &&
                    ["-left-2 top-4", "-right-2 top-10", "bottom-6 -left-1", "-right-1 bottom-12"].map(
                      (p, i) => (
                        <motion.span
                          key={p}
                          className={`absolute ${p} z-20 text-accent`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1, 0.6], opacity: [0, 1, 0.5] }}
                          transition={{
                            delay: 0.5 + i * 0.18,
                            duration: 1.4,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                          }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.span>
                      ),
                    )}

                  {/* frame na proporção do vídeo: o robô aparece inteiro */}
                  <div className="relative aspect-[1048/588] w-full overflow-hidden rounded-2xl border border-accent/40 shadow-glow">
                    <BotVideo src="/bot/bot-pick" fit="cover" />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-cream/10" />
                  </div>

                  {/* balão de fala do bot */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.55 }}
                    className="absolute -right-2 -top-3 z-20 rounded-2xl rounded-br-sm border border-accent/40 bg-ink/85 px-3 py-1.5 text-xs font-medium text-cream shadow-soft backdrop-blur-sm sm:-right-6"
                  >
                    Achei o seu! 🎯
                  </motion.div>
                </motion.div>

                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                  <Sparkles className="h-3 w-3" /> Recomendado pelo SparkBot
                </div>
                <p className="mt-4 text-sm text-muted">Seu plano ideal é</p>
                <h2
                  id="quiz-title"
                  className="mt-1 font-display font-bold leading-none tracking-tight"
                  style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
                >
                  <span className="gradient-text">{planContent.name}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted lg:mx-0">
                  {QUIZ_REASONS[plan]}
                </p>
                <div className="mt-6 flex items-end justify-center gap-2 lg:justify-start">
                  <span className="font-display text-4xl font-bold">US$ {planContent.price}</span>
                  <span className="mb-1 text-muted">/mês</span>
                </div>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-card-lg p-6 sm:p-8"
              >
                <p className="mb-4 font-display text-lg font-bold">O que você leva:</p>
                <ul className="mb-6 grid gap-2.5">
                  {planContent.features
                    .filter((f) => !f.endsWith(":"))
                    .slice(0, 5)
                    .map((f, i) => (
                      <motion.li
                        key={f}
                        initial={reduce ? false : { opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                      </motion.li>
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
                    <RotateCcw className="h-3 w-3" /> Refazer teste
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
