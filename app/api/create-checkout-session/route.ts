import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PLANS, isValidPlan } from "@/lib/plans";
import { createSessionSchema } from "@/lib/validation";

/**
 * POST /api/create-checkout-session
 *
 * Cria uma Stripe Checkout Session em modo `subscription` e devolve `{ url }`
 * para o frontend redirecionar ao Stripe Checkout hospedado.
 *
 * A STRIPE_SECRET_KEY vive somente no servidor — nunca é exposta ao client.
 */

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe não configurado. Defina STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = createSessionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (!isValidPlan(data.plan)) {
    return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
  }

  const plan = PLANS[data.plan];

  // Guard-rail: nunca use Product ID em line_items. Exigimos um Price ID válido.
  if (!plan.priceId || !plan.priceId.startsWith("price_") || plan.priceId.includes("xxx")) {
    return NextResponse.json(
      {
        error:
          "Price ID do plano não configurado. Defina STRIPE_PRICE_" +
          data.plan.toUpperCase() +
          " com um ID 'price_...' real.",
      },
      { status: 500 },
    );
  }

  // Usa a apiVersion default fixada pelo SDK instalado.
  const stripe = new Stripe(secretKey);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Desmembra nome completo em first/last para metadata.
  const nameParts = data.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const metadata: Record<string, string> = {
    plan: data.plan,
    firstName,
    lastName,
    email: data.email,
    phone: data.phone,
    businessName: data.businessName,
    country: data.country ?? "",
    state: data.state ?? "",
    city: data.city ?? "",
    postalCode: data.postalCode ?? "",
    quizScore: data.quizScore != null ? String(data.quizScore) : "",
    source: "spark-landing-checkout",
    sparkVersion: "v1",
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: plan.priceId, quantity: 1 }],
      customer_email: data.email,
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      allow_promotion_codes: true,
      metadata,
      subscription_data: { metadata },
      success_url: `${baseUrl}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/planos?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe não retornou uma URL de checkout." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao criar a sessão de checkout.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
