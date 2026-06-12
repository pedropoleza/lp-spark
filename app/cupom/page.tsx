import type { Metadata } from "next";
import { CupomPage } from "@/components/CupomPage";

export const metadata: Metadata = {
  title: "Encontre o seu cupom — Spark Leads",
  description: "Digite o nome da sua empresa e use o seu cupom de indicação.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CupomPage />;
}
