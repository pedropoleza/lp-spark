import type { Metadata } from "next";
import { TalkExperience } from "@/components/talk/TalkExperience";

export const metadata: Metadata = {
  title: "Spark Leads — Palestra",
  description: "Palestra: o dinheiro está no follow-up.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkExperience />;
}
