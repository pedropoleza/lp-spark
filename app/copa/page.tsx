import type { Metadata } from "next";
import { CopaExperience } from "@/components/copa/CopaExperience";

export const metadata: Metadata = {
  title: "Grande Liga Spark — Bolão da Copa do Mundo de Clubes",
  description: "Faça seus palpites na Copa do Mundo de Clubes e concorra a descontos na mensalidade.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CopaExperience />;
}
