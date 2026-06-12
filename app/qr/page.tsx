import type { Metadata } from "next";
import { QrTool } from "@/components/QrTool";

export const metadata: Metadata = {
  title: "Gerador de QR — Spark Leads (interno)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-ink">
      <QrTool />
    </main>
  );
}
