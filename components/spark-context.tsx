"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { PlanId } from "@/lib/plans";

type QuizResult = {
  plan: PlanId;
  score: number;
};

type SparkContextValue = {
  // Quiz
  quizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  quizResult: QuizResult | null;
  setQuizResult: (r: QuizResult | null) => void;

  // Email pré-preenchido (vindo do quiz)
  prefillEmail: string;
  setPrefillEmail: (e: string) => void;

  // Checkout
  checkoutPlan: PlanId | null;
  openCheckout: (plan: PlanId) => void;
  closeCheckout: () => void;
};

const SparkContext = createContext<SparkContextValue | null>(null);

export function SparkProvider({ children }: { children: ReactNode }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [prefillEmail, setPrefillEmail] = useState("");
  const [checkoutPlan, setCheckoutPlan] = useState<PlanId | null>(null);

  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => setQuizOpen(false), []);
  const openCheckout = useCallback((plan: PlanId) => setCheckoutPlan(plan), []);
  const closeCheckout = useCallback(() => setCheckoutPlan(null), []);

  return (
    <SparkContext.Provider
      value={{
        quizOpen,
        openQuiz,
        closeQuiz,
        quizResult,
        setQuizResult,
        prefillEmail,
        setPrefillEmail,
        checkoutPlan,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </SparkContext.Provider>
  );
}

export function useSpark() {
  const ctx = useContext(SparkContext);
  if (!ctx) throw new Error("useSpark deve ser usado dentro de SparkProvider");
  return ctx;
}
