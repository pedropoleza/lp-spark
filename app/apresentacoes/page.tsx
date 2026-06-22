import type { Metadata } from "next";
import { PresentationsHub } from "@/components/hub/PresentationsHub";

export const metadata: Metadata = {
  title: "Spark Leads — Apresentações",
  description: "Hub de apresentações: escolha um deck para apresentar.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PresentationsHub />;
}
