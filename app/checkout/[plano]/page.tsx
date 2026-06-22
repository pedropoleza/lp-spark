import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidPlan } from "@/lib/plans";
import { getPlanContent } from "@/content/pt-br";
import { CheckoutScreen } from "@/components/checkout/CheckoutScreen";

export const metadata: Metadata = {
  title: "Checkout — Spark Leads",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ plano: "starter" }, { plano: "growth" }, { plano: "agency" }];
}

export default function Page({ params }: { params: { plano: string } }) {
  if (!isValidPlan(params.plano)) notFound();
  // valida que o plano existe no conteúdo
  getPlanContent(params.plano);
  return <CheckoutScreen plan={params.plano} />;
}
