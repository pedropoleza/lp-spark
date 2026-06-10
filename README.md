# Spark Leads — Landing de Planos

Landing page premium para a **Spark Leads** (CRM, automações, templates bilíngues,
dashboards e SparkBot para agentes de seguros), com foco na venda dos planos
**Starter**, **Growth** e **Agency** e checkout hospedado pelo **Stripe**.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system próprio em `tailwind.config.ts` + `app/globals.css`)
- **Framer Motion** (curtain, parallax, scroll reveal, tilt 3D, microinterações)
- **Lucide React** (ícones)
- **React Hook Form + Zod** (validação do formulário)
- **Stripe Node SDK** (criação da Checkout Session no backend)
- **Vitest** (testes de lógica)

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` e `/planos` | Landing principal (mesma experiência) |
| `/obrigado?session_id={CHECKOUT_SESSION_ID}` | Página pós-pagamento (não expõe dados sensíveis) |
| `/api/create-checkout-session` | Cria a Stripe Checkout Session (`subscription`) |
| `/og` | Imagem Open Graph 1200×630 gerada dinamicamente |

`/planos?canceled=1` exibe um banner discreto de retorno (checkout cancelado).

## Configuração

1. Copie `.env.example` para `.env.local` e preencha:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=https://checkout.sparkleads.pro
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_GROWTH=price_...
STRIPE_PRICE_AGENCY=price_...
```

2. `npm install`
3. `npm run dev` → http://localhost:3000

## ⚠️ Product ID × Price ID

Os IDs recebidos são **Product IDs** (`prod_...`) e servem apenas de referência:

| Plano | Product ID |
|-------|-----------|
| Starter | `prod_UXzOUwJ7hVRqNI` |
| Growth | `prod_UXzTvmFOXqbhPW` |
| Agency | `prod_UXzVvD1ci47Aup` |

O **Checkout Session usa o Price ID** (`price_...`) em `line_items`, **nunca o Product ID**.
Crie os preços no dashboard do Stripe e configure-os via variáveis de ambiente
(`STRIPE_PRICE_STARTER` / `_GROWTH` / `_AGENCY`). Veja `lib/plans.ts` — os valores
`price_xxx_*` são placeholders e a API recusa criar sessão enquanto não forem reais.

## Checkout (resumo da API)

`POST /api/create-checkout-session` recebe os dados do formulário + `plan` + `quizScore`,
valida com Zod e cria a sessão Stripe em modo `subscription` com:

- `line_items` usando o **Price ID** do plano
- `customer_email`, `phone_number_collection`, `billing_address_collection: "required"`
- `allow_promotion_codes: true`
- `metadata` na session **e** em `subscription_data` (plan, nome, email, telefone,
  negócio, país/estado/cidade/CEP, quizScore, `source`, `sparkVersion`)
- `success_url` com `{CHECKOUT_SESSION_ID}` → `/obrigado`
- `cancel_url` → `/planos?canceled=1`

A `STRIPE_SECRET_KEY` vive **apenas no servidor**. Não há webhook neste projeto
(o webhook é externo).

## Estrutura

```
app/            # rotas (landing, planos, obrigado, api, og)
components/      # Header, Hero, Plans, modais e overlays
  ui/            # primitivos (Section, Container, Modal, badges, reveal)
  sections/      # Story.tsx, Product.tsx, Interactive.tsx
content/pt-br.ts # textos centralizados (i18n-ready → criar en-us.ts)
lib/             # plans, quiz, validation, analytics, utils
tests/           # vitest (quiz + validação)
```

## Scripts

```bash
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # servidor de produção
npm test         # vitest (lógica de quiz e validação)
```

## Acessibilidade & performance

- Foco preso e fechamento por `Esc` nos modais, `aria-label` em botões de ícone
- `prefers-reduced-motion` respeitado (curtain, parallax e animações)
- Animações só com `transform`/`opacity`; mobile-first e responsivo
- Tabela comparativa vira accordion no mobile; CTA sticky inferior no mobile
- JSON-LD (`SoftwareApplication`, `Product` por plano, `FAQPage`) no `app/layout.tsx`
