"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Modal } from "./ui/Modal";
import { useSpark } from "./spark-context";
import { checkoutFormSchema, type CheckoutFormValues, BR_STATES, US_STATES } from "@/lib/validation";
import { PLAN_PRICES } from "@/lib/plans";
import { PLAN_CONTENT } from "@/content/pt-br";
import { trackEvent } from "@/lib/analytics";

export function CheckoutModal() {
  const { checkoutPlan, closeCheckout, prefillEmail, quizResult, openCheckout } = useSpark();
  const open = checkoutPlan !== null;
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: { country: "Brasil", email: prefillEmail },
  });

  const country = watch("country");

  useEffect(() => {
    if (open) {
      trackEvent("checkout_form_opened", { plan: checkoutPlan });
      setServerError(null);
      if (prefillEmail) setValue("email", prefillEmail);
    }
  }, [open, checkoutPlan, prefillEmail, setValue]);

  if (!checkoutPlan) return <Modal open={false} onClose={closeCheckout}>{null}</Modal>;

  const plan = PLAN_CONTENT.find((p) => p.id === checkoutPlan)!;
  const price = PLAN_PRICES[checkoutPlan];

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitting(true);
    setServerError(null);
    trackEvent("checkout_form_submitted", { plan: checkoutPlan });

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          plan: checkoutPlan,
          quizScore: quizResult?.score,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Não foi possível iniciar o checkout.");
      }

      trackEvent("checkout_session_created", { plan: checkoutPlan });
      trackEvent("checkout_redirected", { plan: checkoutPlan });
      window.location.href = data.url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado.";
      setServerError(msg);
      trackEvent("checkout_error", { plan: checkoutPlan, message: msg });
      setSubmitting(false);
    }
  }

  const states = country === "Brasil" ? BR_STATES : country === "EUA" ? US_STATES : null;

  function handleClose() {
    closeCheckout();
    setTimeout(() => reset(), 250);
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="checkout-title" fullscreenMobile>
      <div className="p-6 sm:p-8">
        <span className="label-mono">Quase lá</span>
        <h2 id="checkout-title" className="mt-2 font-display text-2xl font-bold">
          Seus dados para o plano {plan.name}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Preencha os campos abaixo. O pagamento acontece em seguida, no Stripe.
        </p>

        {serverError && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-medium">Não conseguimos iniciar o checkout.</p>
              <p className="text-red-200/80">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4" noValidate>
          <Field label="Nome completo" error={errors.fullName?.message} htmlFor="fullName">
            <input id="fullName" {...register("fullName")} className="input-spark" autoComplete="name" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" error={errors.email?.message} htmlFor="email">
              <input id="email" type="email" {...register("email")} className="input-spark" autoComplete="email" />
            </Field>
            <Field
              label="Telefone"
              error={errors.phone?.message}
              htmlFor="phone"
              hint="Formato internacional, ex: +5511999998888"
            >
              <input id="phone" {...register("phone")} placeholder="+5511999998888" className="input-spark" autoComplete="tel" />
            </Field>
          </div>

          <Field label="Nome do negócio" error={errors.businessName?.message} htmlFor="businessName">
            <input id="businessName" {...register("businessName")} className="input-spark" autoComplete="organization" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="País" htmlFor="country">
              <select id="country" {...register("country")} className="input-spark">
                <option value="Brasil">Brasil</option>
                <option value="EUA">EUA</option>
                <option value="Outro">Outro</option>
              </select>
            </Field>
            <Field label="Estado" htmlFor="state">
              {states ? (
                <select id="state" {...register("state")} className="input-spark">
                  <option value="">Selecione</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <input id="state" {...register("state")} className="input-spark" />
              )}
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cidade" htmlFor="city">
              <input id="city" {...register("city")} className="input-spark" autoComplete="address-level2" />
            </Field>
            <Field label="CEP / ZIP" htmlFor="postalCode">
              <input id="postalCode" {...register("postalCode")} className="input-spark" autoComplete="postal-code" />
            </Field>
          </div>

          <p className="text-[11px] leading-relaxed text-muted">
            Usamos seus dados apenas para criar sua assinatura, preparar sua conta e enviar
            instruções de acesso. Não pedimos senha nem cartão aqui — o cartão é informado apenas no
            Stripe Checkout.
          </p>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparando checkout seguro...
              </>
            ) : (
              <>Continuar para pagamento → US$ {price}/mês</>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
            <Lock className="h-3 w-3" /> Pagamento seguro via Stripe • Cancele quando quiser • Sem
            fidelidade
          </p>
          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted">
            <ShieldCheck className="h-3 w-3 text-lime" /> Você será redirecionado para o Stripe
            Checkout
          </p>

          <button
            type="button"
            onClick={() => {
              const order: ("starter" | "growth" | "agency")[] = ["starter", "growth", "agency"];
              handleClose();
              setTimeout(() => {
                document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
              }, 300);
              void order;
            }}
            className="text-center text-xs text-muted underline-offset-4 hover:text-cream hover:underline"
          >
            Voltar e escolher outro plano
          </button>
        </form>
      </div>

      <style jsx global>{`
        .input-spark {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #f7f4ec;
          outline: none;
          transition: all 0.2s;
        }
        .input-spark:focus {
          border-color: rgba(255, 122, 26, 0.5);
          box-shadow: 0 0 0 2px rgba(255, 122, 26, 0.25);
        }
        .input-spark::placeholder {
          color: rgba(167, 173, 184, 0.6);
        }
      `}</style>
    </Modal>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-cream">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-red-300">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}
