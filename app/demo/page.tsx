import type { Metadata } from "next";
import { DemoExperience } from "@/components/demo/DemoExperience";

export const metadata: Metadata = {
  title: "Spark Leads — Demonstração",
  description: "Demonstração interativa do Spark Leads.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DemoExperience />;
}
