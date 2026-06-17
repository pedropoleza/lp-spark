import type { Metadata } from "next";
import { TalkExperience } from "@/components/talk/TalkExperience";

export const metadata: Metadata = {
  title: "Spark Leads — Palestra: Organização",
  description: "Palestra: de agente a empresa — organização, eficiência e CRM.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TalkExperience variant="organizacao" />;
}
