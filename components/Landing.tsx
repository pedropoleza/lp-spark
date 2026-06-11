"use client";

import { SparkProvider } from "./spark-context";
import { Curtain } from "./Curtain";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Plans } from "./Plans";
import { ComparisonTable } from "./ComparisonTable";
import { FAQAccordion } from "./FAQAccordion";
import { Footer } from "./Footer";
import { QuizModal } from "./QuizModal";
import { CheckoutModal } from "./CheckoutModal";
import { StickyCTA } from "./StickyCTA";
import { ExitIntent } from "./ExitIntent";
import { CanceledBanner } from "./CanceledBanner";
import { ScrollProgress, Grain } from "./ui/effects";
import { Problem, Security, FinalCta } from "./sections/Story";
import { SparkBotSection } from "./sections/Product";

/**
 * Landing enxuta e focada em conversão:
 * Hero → dor → planos → SparkBot → comparar → segurança → FAQ → CTA.
 * As demais seções continuam disponíveis em ./sections caso se queira reativar.
 */
export function Landing() {
  return (
    <SparkProvider>
      <Grain />
      <ScrollProgress />
      <Curtain />
      <AnnouncementBar />
      <Header />
      <CanceledBanner />

      <main>
        <Hero />
        <Problem />
        <SparkBotSection />
        <Plans />
        <ComparisonTable />
        <Security />
        <FAQAccordion />
        <FinalCta />
      </main>

      <Footer />

      {/* Overlays / interações globais */}
      <QuizModal />
      <CheckoutModal />
      <StickyCTA />
      <ExitIntent />
    </SparkProvider>
  );
}
