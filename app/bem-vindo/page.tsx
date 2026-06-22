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
        Se esta página abriu DENTRO do iframe do checkout (o GHL redirecionou pra
        cá após o pagamento), saímos do iframe de duas formas:
        1) postMessage pro checkout pai — funciona MESMO cross-origin; o pai então
           navega pra sua própria /bem-vindo (mesma marca/domínio do checkout).
        2) break-out direto — funciona quando é a mesma origem.
        Roda antes do React, sem depender de nada carregar.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(window.top&&window.top!==window.self){try{window.parent.postMessage('spark:welcome','*');}catch(e){}try{window.top.location.replace(window.location.href);}catch(e){}}}catch(e){}",
        }}
      />
      <WelcomeWizard />
    </>
  );
}
