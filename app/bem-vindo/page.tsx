import type { Metadata } from "next";
import { WelcomeWizard } from "@/components/checkout/WelcomeWizard";

export const metadata: Metadata = {
  title: "Bem-vindo ao Spark Leads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      {/*
        Break-out do iframe ANTES do React: se esta página abriu dentro do iframe
        do checkout (o GHL redirecionou pra cá após o pagamento), levamos a janela
        inteira pra cá. Roda assim que o HTML é lido, sem depender do React.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(window.top&&window.top!==window.self){window.top.location.replace(window.location.href);}}catch(e){}",
        }}
      />
      <WelcomeWizard />
    </>
  );
}
