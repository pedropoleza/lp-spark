"use client";

import { SparkProvider } from "./spark-context";
import { Curtain } from "./Curtain";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Hero } from "./Hero";
import dynamic from "next/dynamic";

// Overlays: code-split (não entram no JS inicial — melhor carregamento no 3G)
const QuizModal = dynamic(() => import("./QuizModal").then((m) => m.QuizModal), { ssr: false });
const CheckoutModal = dynamic(() => import("./CheckoutModal").then((m) => m.CheckoutModal), {
  ssr: false,
});
const StickyCTA = dynamic(() => import("./StickyCTA").then((m) => m.StickyCTA), { ssr: false });
const ExitIntent = dynamic(() => import("./ExitIntent").then((m) => m.ExitIntent), { ssr: false });
import { CanceledBanner } from "./CanceledBanner";
import { ScrollProgress, Grain } from "./ui/effects";
import { SparkBackdrop } from "./ui/SparkBackdrop";
import { SmoothScroll } from "./ui/SmoothScroll";
import { Seam } from "./ui/Seam";
import { BrandMarquee } from "./ui/motion2d";

// Seções abaixo da dobra: code-split (SSR mantido p/ SEO; JS sai do bundle inicial)
const SparkBotSection = dynamic(() => import("./sections/Product").then((m) => m.SparkBotSection));
const CrmShowcase = dynamic(() => import("./sections/CrmShowcase").then((m) => m.CrmShowcase));
const Statement = dynamic(() => import("./sections/Statement").then((m) => m.Statement));
const Plans = dynamic(() => import("./Plans").then((m) => m.Plans));
const ComparisonTable = dynamic(() => import("./ComparisonTable").then((m) => m.ComparisonTable));
const FAQAccordion = dynamic(() => import("./FAQAccordion").then((m) => m.FAQAccordion));
const Footer = dynamic(() => import("./Footer").then((m) => m.Footer));

/**
 * Landing enxuta, conduzida pelo SparkBot:
 * Hero → marca → SparkBot em ação → Planos → Matriz → FAQ.
 * As demais seções continuam disponíveis em ./sections caso se queira reativar.
 */
export function Landing() {
  return (
    <SparkProvider>
      <SmoothScroll />
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
        <SparkBotSection />
        <Seam />
        <CrmShowcase />
        <Statement />
        <Plans />
        <Seam />
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
