import type { Metadata } from "next";
import { WelcomeWizard } from "@/components/checkout/WelcomeWizard";

export const metadata: Metadata = {
  title: "Bem-vindo ao Spark Leads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WelcomeWizard />;
}
