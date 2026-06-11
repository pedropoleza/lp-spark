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
import {
  SocialProof,
  Problem,
  HowItWorks,
  BeforeAfter,
  ChooseByMoment,
  ProfileTabs,
  AfterPayment,
  Objections,
  SpreadsheetVsSpark,
  Security,
  FinalCta,
} from "./sections/Story";
import {
  ExplodedView,
  LeadJourney,
  Templates,
  SparkBotSection,
  LeadScore,
  Retention,
  Recruitment,
  FieldTraining,
  Calendars,
  Dashboards,
  Gallery,
} from "./sections/Product";
import { MicroDemo, LossCalculator } from "./sections/Interactive";

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
        <SocialProof />
        <Problem />
        <HowItWorks />
        <BeforeAfter />
        <Plans />
        <ChooseByMoment />
        <ProfileTabs />
        <MicroDemo />
        <ExplodedView />
        <Templates />
        <SparkBotSection />
        <LeadScore />
        <LeadJourney />
        <Retention />
        <Recruitment />
        <FieldTraining />
        <Calendars />
        <Dashboards />
        <Gallery />
        <ComparisonTable />
        <LossCalculator />
        <AfterPayment />
        <SpreadsheetVsSpark />
        <Objections />
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
