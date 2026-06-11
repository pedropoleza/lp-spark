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
import { SparkBackdrop } from "./ui/SparkBackdrop";
import { Seam } from "./ui/Seam";
import { BrandMarquee } from "./ui/motion2d";
import { Problem } from "./sections/Story";
import { SparkBotSection } from "./sections/Product";
import { CompareStrip, DiagnoseTerminal } from "./sections/Brutalist";

/**
 * Landing enxuta e focada em conversão:
 * Hero → dor → planos → SparkBot → comparar → segurança → FAQ → CTA.
 * As demais seções continuam disponíveis em ./sections caso se queira reativar.
 */
export function Landing() {
  return (
    <SparkProvider>
      <SparkBackdrop />
      <Grain />
      <ScrollProgress />
      <Curtain />
      <AnnouncementBar />
      <Header />
      <CanceledBanner />

      <main>
        <Hero />
        <BrandMarquee
          items={[
            "CRM PRONTO",
            "AUTOMAÇÕES",
            "SPARKBOT IA",
            "TEMPLATES PT/EN",
            "DASHBOARDS",
            "FOLLOW-UP",
            "RECRUTAMENTO",
          ]}
        />
        <Problem />
        <Seam />
        <DiagnoseTerminal />
        <SparkBotSection />
        <Seam />
        <Plans />
        <CompareStrip />
        <ComparisonTable />
        <Seam />
        <FAQAccordion />
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
