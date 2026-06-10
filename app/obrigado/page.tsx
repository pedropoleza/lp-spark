import Link from "next/link";
import { CheckCircle2, Cog, Mail, ArrowLeft, MessageCircle } from "lucide-react";
import { content } from "@/content/pt-br";

export const metadata = {
  title: "Pagamento confirmado — Spark Leads",
  robots: { index: false, follow: false },
};

const cardIcons = [CheckCircle2, Cog, Mail];

/**
 * Página pós-pagamento. Lê apenas a presença de session_id para confirmar
 * o retorno do Stripe — NÃO exibimos nenhum dado sensível da sessão.
 * Funciona normalmente mesmo se acessada diretamente, sem session_id.
 */
export default function ObrigadoPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const hasSession = Boolean(searchParams?.session_id);
  const t = content.thankYou;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      <div className="halo left-1/4 top-0 h-72 w-72 bg-spark/25" />
      <div className="halo right-1/4 bottom-0 h-72 w-72 bg-electric/20" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-lime/30 bg-lime/10">
          <CheckCircle2 className="h-8 w-8 text-lime" />
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">{t.text}</p>

        {!hasSession && (
          <p className="mx-auto mt-3 max-w-md text-xs text-muted/80">
            Se você chegou aqui sem concluir um pagamento, tudo bem — esta página confirma o status
            assim que o Stripe finaliza o checkout.
          </p>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {t.cards.map((card, i) => {
            const Icon = cardIcons[i];
            return (
              <div key={card} className="card-spark p-5 text-center">
                <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-xl bg-spark/10 text-spark">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-cream/90">{card}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" /> {t.backHome}
          </Link>
          <a
            href={t.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle className="h-4 w-4" /> Falar com suporte
          </a>
        </div>

        <p className="mt-6 text-xs text-muted">{t.spamNote}</p>
      </div>
    </main>
  );
}
