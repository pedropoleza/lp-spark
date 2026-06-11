import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Archivo_Black } from "next/font/google";
import { PLAN_CONTENT } from "@/content/pt-br";
import { content } from "@/content/pt-br";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
// Display pesada para as seções brutalistas
const heavy = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heavy",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Spark Leads Plans — CRM, Automations & AI for Insurance Agents",
  description:
    "Escolha o plano ideal da Spark Leads: CRM, automações, templates bilíngues, dashboards e SparkBot para agentes de seguros venderem mais e recrutarem melhor.",
  keywords: [
    "CRM for insurance agents",
    "insurance agent automation",
    "lead follow-up system",
    "Spark Leads",
    "SparkBot",
  ],
  openGraph: {
    title: "Spark Leads Plans — CRM, Automations & AI for Insurance Agents",
    description:
      "CRM, automations and AI for insurance agents. Escolha entre Starter, Growth e Agency.",
    url: baseUrl,
    siteName: "Spark Leads",
    images: [{ url: "/og", width: 1200, height: 630, alt: "Spark Leads Plans" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark Leads Plans — CRM, Automations & AI for Insurance Agents",
    description:
      "CRM, automations and AI for insurance agents. Escolha entre Starter, Growth e Agency.",
    images: ["/og"],
  },
};

function JsonLd() {
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Spark Leads",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "CRM, automações, templates bilíngues, dashboards e SparkBot para agentes de seguros.",
    offers: PLAN_CONTENT.map((p) => ({
      "@type": "Offer",
      name: `Spark Leads ${p.name}`,
      price: p.price,
      priceCurrency: "USD",
      category: "subscription",
    })),
  };

  const products = PLAN_CONTENT.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Spark Leads ${p.name}`,
    description: p.tagline,
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/planos`,
    },
  }));

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const blocks = [softwareApplication, ...products, faqPage];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${heavy.variable}`}
    >
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
