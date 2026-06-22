# Estudo + Plano: Checkout fluido & Wizard de boas-vindas (Spark)

Objetivo: checkout próprio, deep-linkável por plano, mobile-first, sem dupla
digitação, e um wizard de pós-venda que a gente controla (agendar onboarding →
boas-vindas/instruções → atalhos). Base: pesquisa de checkout (Baymard) + docs
oficiais do GHL + o código atual.

---

## 1. Diagnóstico do que existe hoje
- Checkout ao vivo = **payment-link do GHL num iframe**, aberto como **modal**
  (`CheckoutModal`) na mesma rota → **sem deep-link por plano**.
- **Pede e-mail/telefone 2x** e **não tem business name**: é config do **order
  form do GHL**, não do nosso site.
- Existe um caminho **Stripe** pronto mas **desligado** (`/api/create-checkout-session`)
  — coleta business name, redireciona pra `/obrigado`.
- `/obrigado` é estático e o fluxo GHL não passa por ele. WhatsApp = placeholder.

## 2. O que a pesquisa confirmou (decisivo)
**GHL payment-link (docs oficiais):**
- Prefill por URL: `firstName`, `lastName`, `email`, `phone`.
- **`redirectUrl` + `redirectIn`** → manda o cliente pra QUALQUER URL após pagar.
  ⇒ podemos jogar pro nosso wizard de boas-vindas **sem trocar pro Stripe**.
- Order form tem campo nativo **Company name** (Hidden/Optional/Required) ⇒
  business name resolve no próprio GHL.
- Apple/Google Pay: exigem **Stripe Connect no GHL + domínio registrado no
  Stripe + arquivo `.well-known`**. É o maior ganho de conversão no mobile.

**Checkout mobile (Baymard):** ~70% de abandono (76%+ no mobile); os maiores
vilões: custos inesperados, conta obrigatória, formulário longo, falta de
confiança. Alavancas: wallets (Apple/Google Pay), guest checkout, ~7-8 campos,
total verdadeiro na frente, 1 CTA, selo de segurança.

**Pós-venda (ativação):** agendar o onboarding **imediatamente** após a compra
reduz no-show e acelera time-to-value; tela de boas-vindas reduz arrependimento;
wizard curto (2-3 passos) no mobile converte melhor que página única longa.

## 3. Recomendação de arquitetura (sem reescrever pro Stripe)
**Mantemos o GHL** (preserva cupons e automações que já existem) e o
**envelopamos** com telas nossas:

1. **Entrada de checkout própria e deep-linkável** (nosso site, mobile-first):
   - `/checkout/starter`, `/checkout/growth`, `/checkout/agency` (+ `/checkout` = escolher plano).
   - Cada rota: resumo do pedido (plano, **de/por** ancorado, o que inclui, cupom
     já aplicado, selos de confiança) + **1 CTA** → abre o payment-link do GHL.
   - Coleta de contato **uma vez só** (decisão abaixo): ou a gente não coleta
     nada e o GHL coleta uma vez (mais simples e robusto), ou a gente coleta no
     nosso form bonito e manda **prefilled** pro GHL.
2. **GHL redireciona pro nosso wizard** após o pagamento (`redirectUrl` →
   `/bem-vindo?plan=...`).
3. **Wizard de boas-vindas** (nosso site, mobile-first, 3 passos):
   - **Passo 1 — Boas-vindas:** celebração, "o que vem agora", expectativa.
   - **Passo 2 — Agendar onboarding:** iframe da nossa agenda (ação principal).
   - **Passo 3 — Instruções:** "instruções chegam no WhatsApp e no e-mail",
     "acesse pelo e-mail", "você começa a usar no dia do onboarding", e-mail de
     boas-vindas de info@sparkleads.pro; **atalhos**: suporte / WhatsApp / login.
4. **Ajustes no order form do GHL** (mata a dupla digitação + business name).

Isso resolve: deep-link ✔ · dupla digitação ✔ · business name ✔ · controle do
pós-venda ✔ · mobile ✔ — sem quebrar cupons/automação do GHL.

*(Alternativa: assumir o checkout no Stripe — controle total e wallets nativos,
mas recria cupons e exige webhook de provisionamento. Só se você quiser. Não recomendo agora.)*

---

## 4. O QUE PRECISO DE VOCÊ (lista completa)

### A) Decisões
- [ ] **A1. Motor de checkout:** manter **GHL + envelope** (recomendado) ou migrar pro **Stripe**?
- [ ] **A2. Coleta de contato:** (a) só no GHL, uma vez (recomendado) ou (b) no nosso form e mandar prefilled pro GHL?
- [ ] **A3. Acesso à conta:** o cliente só usa **no dia do onboarding** (confirmar) — a tela de instruções vai deixar isso claro.

### B) Links / dados (só você tem)
- [ ] **B1. Link da agenda de ONBOARDING** (widget de booking embedável). Reuso o de demo (`…/widget/bookings/demo-sparkleads`) ou tem um específico de onboarding?
- [ ] **B2. Os 3 payment-links oficiais** (Starter/Growth/Agency) que devo usar nas rotas. Confirmar se já têm o preço/desconto certo.
- [ ] **B3. WhatsApp de suporte** (número real → vira `wa.me/...`).
- [ ] **B4. URL de login/acesso** que o cliente usa pra entrar na conta (pra mostrar nas instruções).
- [ ] **B5. Cupons** que valem nessas rotas (se houver desconto padrão), além dos BOSS.

### C) Mudanças no GHL (só você consegue fazer)
- [ ] **C1. Redirect pós-pagamento:** em cada payment-link, setar **Redirect URL** → nosso wizard, ex.: `https://internal.sparkleads.pro/brazilionaires/bem-vindo?plan=growth` (+ `redirectIn` curto). Confirmar domínio de produção do nosso site.
- [ ] **C2. Order form — business name:** ativar o campo nativo **Company name** (deixar **Required**).
- [ ] **C3. Order form — dupla digitação:** ajustar o form pra **não pedir e-mail/telefone 2x** (usar 1 passo / corrigir o two-step).
- [ ] **C4. Prefill (se A2 = b):** confirmar que o link aceita `firstName/lastName/email/phone` na URL e **testar `?` vs `/`** como separador.
- [ ] **C5. Apple/Google Pay (opcional, alto impacto mobile):** ativar Stripe Connect no GHL, **registrar o domínio do funil no Stripe** e hospedar o arquivo `.well-known/apple-developer-merchantid-domain-association`.
- [ ] **C6. E-mail de boas-vindas:** workflow no GHL disparado na compra, **de info@sparkleads.pro**, com as instruções/login. Confirmar que existe ou criar.
- [ ] **C7. Instruções no WhatsApp:** confirmar a automação que manda as instruções no WhatsApp.

### D) Conteúdo
- [ ] **D1.** Texto/oferta da tela de boas-vindas (tom) — posso propor e você ajusta.
- [ ] **D2. Taxa de ativação:** ainda vale o "US$ 80 isento"? Mostrar ou não no checkout/boas-vindas?
- [ ] **D3.** Confirmar marca/identidade (uso a nossa UI; se a tela for "Spark" puro, ok).

---

## 5. Ordem de execução (quando você devolver a lista)
1. Rotas `/checkout/[plano]` (deep-link, resumo, cupom, handoff GHL) — mobile-first.
2. Wizard `/bem-vindo` (3 passos: boas-vindas → agendar onboarding → instruções/atalhos).
3. Fios finais: redirect do GHL, prefill (se A2=b), WhatsApp real, login.
4. (Opcional) Apple/Google Pay no GHL.
