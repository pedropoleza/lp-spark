import type { Metadata } from "next";
import { DemoExperience } from "@/components/demo/DemoExperience";
import { BOSS_AGENCY, BOSS_PRICING } from "@/content/demo/boss";

export const metadata: Metadata = {
  title: "Spark Leads — Demonstração BOSS",
  description: "Demonstração personalizada do Spark Leads para a BOSS.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DemoExperience agency={BOSS_AGENCY} pricing={BOSS_PRICING} />;
}
