# Spark Leads — Guia de Identidade Visual & UI

Guia prático extraído do código real (`tailwind.config.ts`, `app/globals.css`,
componentes). Use isto pra construir qualquer ferramenta nova com a MESMA cara do
Spark. Todos os valores são os de produção.

Stack de referência: **Next.js + Tailwind CSS + framer-motion + lucide-react**.
Fontes: Google Fonts. Ícones: lucide-react.

---

## 1. Essência

- **Dark-first, premium, "tech brutalista suave".** Fundo quase preto, um único
  acento teal vibrante, vidro fosco (glass), grid técnico e micro-animações que
  dão "vida" sem distrair.
- **Mono-acento.** Uma cor de marca (teal `#00A4CD`) e seus derivados. Nada de
  paleta colorida. Cor = significado (acento = ação/destaque).
- **Tipografia com contraste:** display geométrica nos títulos, sans limpa no
  corpo, mono em micro-rótulos.
- **Voz:** direta, calorosa, em português, frases curtas. **Sem travessões (—)**
  na copy de tela; use vírgula, ponto ou dois-pontos.

---

## 2. Cores (tokens exatos)

### Base
| Token | Hex | Uso |
|---|---|---|
| `ink` / `graphite` | `#0D0D0D` | Fundo base (quase preto) |
| `ink-deep` | `#060606` | Vinheta / profundidade |
| `card` | `#141416` | Superfície elevada (painéis, app) |
| `cream` | `#FCFCFC` | Texto principal / "branco" |
| `muted` | `#8B9499` | Texto secundário |

### Acento (teal) — a família monocromática
| Token | Hex | Uso |
|---|---|---|
| `accent` / `spark` | `#00A4CD` | Cor de marca. Botões, links, destaques, ícones ativos |
| `electric` | `#2FD2EE` | Cyan claro (realces, gradiente, glitch) |
| `lime` | `#38E5CE` | Teal-verde = positivo/sucesso, status "online", checks |
| `glow` | `#00788F` | Teal escuro = ênfase/profundidade |

`--accent-rgb: 0, 164, 205` (para rgba em sombras, spotlight, seleção).

### Regras
- Texto sobre `ink`: use `cream` (principal) e `muted` (secundário). Acento só
  pra destaque, nunca pra blocos longos de texto.
- Seleção de texto: `rgba(0,164,205,0.35)`.
- Verde-WhatsApp (bolhas de mensagem): fundo `#0f2e23`, check duplo em `lime`.
- Estados: positivo = `lime`; atenção = `amber-300/400` (único uso fora da
  família, p/ alertas); erro = `rose-400`.
- **Contraste:** manter ≥ 4.5:1 (texto) e ≥ 3:1 (texto grande). `cream` sobre
  `ink` e `ink` sobre `accent` passam folgado.

---

## 3. Tipografia

| Papel | Família | Uso |
|---|---|---|
| Display | **Space Grotesk** (`font-display`) | Títulos, números grandes, preços |
| Corpo | **Plus Jakarta Sans** (`font-sans`) | Texto, parágrafos, UI |
| Mono | **JetBrains Mono** (`font-mono`) | Micro-rótulos, números tabulares, "código" |

- **Título de cena:** `clamp(2rem, 5vw, 3.4rem)`, `font-display`, `font-bold`,
  `leading-[1.04–1.12]`.
- **Subtítulo:** `text-lg text-muted`.
- **Micro-rótulo (`.label-mono`):** `font-mono`, `11px`, `UPPERCASE`,
  `letter-spacing: 0.28em`, `text-muted`. É a assinatura tipográfica da marca.
- **Números:** `tabular-nums` sempre (preços, KPIs, contadores).

---

## 4. Forma, profundidade, superfícies

- **Raios:** `card` = 16px, `card-lg` = 20px. Botões e chips = `rounded-full`.
  Avatares = círculo.
- **Bordas:** padrão sutil `border-white/10`. Destaque = `border-accent/30`.
- **Sombras:**
  - `soft`: `0 10px 40px -12px rgba(0,0,0,.7)`
  - `plan`: `0 30px 90px -30px rgba(0,0,0,.9)` (modais, painéis flutuantes)
  - `glow`: `0 0 60px -12px rgba(0,164,198,.45)` (hover de CTA)
  - `hard`: `4px 4px 0 0 rgba(0,164,198,.9)` (brutalista, opcional)
- **Glass (vidro fosco):**
  - `.glass`: `bg rgba(20,20,22,.55)` + `backdrop-blur(18px) saturate(120%)` + borda `cream/10`.
  - `.glass-card`: gradiente sutil 160° de `cream/6 → cream/2 → ink/20` + blur 16px.
  - **Mobile:** sem blur (custo de paint) — painéis ficam sólidos. Já tratado no CSS.
- **Painéis translúcidos:** `.panel-dark` `rgba(13,13,13,.74)` + blur 14px.

---

## 5. Fundos (o "canvas Spark OS")

Camadas que dão o clima técnico (todas opcionais, empilháveis):
- **Grid técnico** (`.grid-bg`): linhas `cream/4`, célula 56px.
- **Blueprint** (`.blueprint-grid`): grid duplo, linhas teal `accent/5.5%` (130px)
  + neutras (26px). É o fundo "engenharia".
- **Dots** (`.backdrop-dots`): pontinhos `cream/5`, 26px; com `.dots-drift` rolam devagar.
- **Aurora blobs** (`.ambient-blob` / `.aurora-a/b/c`): manchas teal borradas
  (blur 80px) que flutuam (18–30s). Dão vida ao fundo.
- **Scan beam** (`.scan-beam`): feixe diagonal teal varrendo (9s).
- **Vinheta** (`.backdrop-vignette`) escurece as bordas.
- **Grão** (`.grain-overlay`): textura fractal a 4% — premium, fixa, sem cliques.

Combinação recomendada: `ink` + blueprint-grid (bem sutil) + 2–3 aurora blobs +
vinheta + grão. (É o componente `SparkBackdrop`.)

---

## 6. Componentes-chave

### Botões (com varredura de inversão no hover)
- **`.btn-primary`:** pill, `bg-accent`, texto `ink`, `font-semibold`. No hover:
  uma camada `ink` varre da esquerda (`scaleX 0→1`, 0.42s cubic-bezier(.16,1,.3,1))
  e o texto vira teal + `shadow-glow` + sobe 2px. Active: `scale .96`.
- **`.btn-secondary`:** outline `accent/40`, texto `cream`; hover preenche de teal.
- **`.btn-ghost`:** menor, borda `cream/15`, texto `muted`.
- Foco visível sempre: `ring-2 ring-accent ring-offset-2 ring-offset-ink`.

### Cartões
- Base: `rounded-card-lg border border-white/10 bg-white/[0.02] p-5/6`.
- Destaque/"featured": `border-accent/50 bg-accent/[0.06]` (+ selo).
- Borda viva (cards premium): `.glow-border` = cônica girando (`--angle`, 9s).

### Selos / badges
- Pill `rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs
  font-semibold text-accent`. Para "destaque do plano": fundo sólido `bg-accent`
  texto `ink`, posicionado `-top-3` centralizado.

### Inputs
- `rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-base`
  (≥16px evita zoom no iOS), foco `border-accent/50 ring-2 ring-accent/30`.
- Slider: `accent-accent`, trilho `bg-white/10`, `h-2 rounded-full`.

### Chrome do app (AppShell)
- Layout em grid: sidebar (nav com itens, ativos em teal) + topbar (pill de
  usuário, badge "Ask AI", sino). Tema escuro, cartões glass, acento teal.
- KPI card: número grande `font-display` + rótulo `label-mono` + delta em `lime`.
- Funil/Kanban: colunas por estágio (tons lime/electric/spark/amber/glow),
  cards com avatar (iniciais em círculo teal) + selo "Five Rings" quando sincronizado.

### QR (telas de checkout)
- QR sempre **preto sobre branco**, dentro de `rounded-2xl bg-white p-2/3`.
  Nunca invertido/colorido (falha de leitura). Quiet zone generosa.
- Gere via `qrcode` (`QRCode.toDataURL`, `color:{dark:"#0B0B0F",light:"#FFFFFF"}`).
- Regra de tamanho: 1 de largura do código para cada 10 de distância de leitura.

---

## 7. SparkBot — identidade

O SparkBot é representado de forma **minimalista e geométrica**, não como mascote.

- **Logo Spark:** raio/relâmpago (`Zap`, lucide) em quadrado `bg-accent`
  arredondado (`rounded-lg`), ícone na cor `ink`. É a marca.
- **Avatar do SparkBot:** ícone `Bot` (lucide) em círculo `bg-accent/15`,
  ícone `text-accent`, 36px. Ao lado do nome "SparkBot" + `Sparkles` teal.
- **Status:** pontinho `lime` + "online · opera o Spark por você" em `muted`.
- **Bolhas de chat:**
  - Usuário: `bg-accent text-ink`, `rounded-2xl rounded-br-sm`.
  - Bot: `bg-white/[0.04] border border-white/10 text-cream`, `rounded-2xl rounded-bl-sm`.
  - Áudio: ícone `Play` + mini-waveform (barrinhas `bg-current opacity-70`) + duração.
- **"Digitando":** 3 pontos (`.typing-dot`) subindo em sequência (1.4s, delays
  0/0.2/0.4s). Bolha do bot vazia com os 3 pontos.
- **Chips de sugestão:** pills `border-accent/40 bg-accent/10 text-accent`,
  hover `bg-accent/20`.
- **Composer:** clipe (`Paperclip`) + campo "Escreva ou fale com o SparkBot…" +
  botão de microfone (`Mic`) em círculo `bg-accent text-ink`.
- **Assinatura viva do mark:** `.ring-pulse` — um anel teal que pulsa 1x a cada 8s.

**Se for criar artwork do SparkBot** (ilustração/3D): mantenha geométrico,
monocromático teal sobre escuro, com o motivo do raio/spark e o "anel de pulso".
Sem olhos fofos / mascote cartunesco — o tom é "assistente competente", não brinquedo.

---

## 8. Movimento (a alma da UI)

### Padrão de entrada (framer-motion) — use em quase tudo
```tsx
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
```
- **Easing-assinatura:** `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo suave).
  É o "feel" do Spark — use em entradas, varreduras e hovers.
- **Stagger:** itens de lista entram com `delay: base + i * 0.08..0.2`
  (e `x: -10` ou `y: 12`).
- **Contador (CountUp):** número anima até o alvo em ~900ms, easeOutCubic,
  `tabular-nums`. Use em preços, KPIs, "dinheiro na mesa".

### Animações de marca (CSS, já no `globals.css`)
| Classe | O que faz | Duração |
|---|---|---|
| `.gradient-text` | Shimmer teal que passa **uma vez** no reveal e assenta | 2.6s, delay .35s, 1x |
| `.aurora-a/b/c` | Blobs do fundo flutuando | 18 / 24 / 30s loop |
| `.dots-drift` | Malha de pontos rolando devagar | 26s loop |
| `.scan-beam` | Feixe diagonal varrendo | 9s loop |
| `.twinkle` | Nós da "constelação" cintilando | 4s loop |
| `.ring-pulse` | Anel do mark pulsa 1x | a cada 8s |
| `.glow-border` | Borda cônica girando (cards) | 9s loop |
| `.blueprint-scan` | Linha de scanner descendo | 14s loop |
| `animate-float` | Flutua ±10px | 6s |
| `animate-pulse-soft` | Opacidade 0.5↔1 | 3s |
| `animate-shimmer` | Posição de gradiente (skeletons) | 3s |
| `animate-marquee` | Faixa horizontal infinita | 28s |
| `.blink` | Cursor piscando | 1s |
| `.glitch` (RGB-split) | Split teal/cyan brutalista | 3s |

### Princípios de motion
- Movimento **serve à compreensão** (revelar em sequência, guiar o olho), nunca
  decorar à toa.
- Loops do fundo são **lentos e sutis** (presença, não distração).
- **Sempre** respeite `prefers-reduced-motion` (já tratado: durações ~0, sem grão).

---

## 9. Layout & espaçamento

- Container máx.: **1440px** (`.container-spark`, padding 20/32px).
- Larguras de "cena/slide": `max-w-3xl` (texto), `max-w-4xl`/`6xl` (grids).
- Respiro generoso: títulos com `mt-4`, blocos com `mt-6/7`, listas `space-y-2.5/3`.
- Mobile-first; em telas grandes, centralizar e limitar largura (legibilidade).
- **Para apresentações/telas grandes (Zoom):** uma ideia por tela, tipo grande,
  alto contraste, texto mínimo (a fala carrega o detalhe).

---

## 10. Iconografia

- **lucide-react**, traço fino consistente, tamanhos `h-4/5/6 w-*`.
- Ícones de ação/ativos em `accent`; neutros em `muted`. Em círculo/quadrado
  arredondado com fundo `bg-accent/10–15` para destaque.
- Ícones recorrentes: `Zap` (marca), `Bot`/`Sparkles` (IA), `Check` (positivo),
  `MessageCircle`/`Phone`/`Calendar`/`GitBranch` (módulos).

---

## 11. Kit de bootstrap (copiar para um projeto novo)

**`tailwind.config` (cores + raios + sombras):**
```ts
colors: {
  ink: "#0D0D0D", graphite: "#0D0D0D", card: "#141416",
  cream: "#FCFCFC", muted: "#8B9499",
  accent: "#00A4CD", spark: "#00A4CD",
  electric: "#2FD2EE", glow: "#00788F", lime: "#38E5CE",
},
borderRadius: { card: "16px", "card-lg": "20px" },
boxShadow: {
  soft: "0 10px 40px -12px rgba(0,0,0,0.7)",
  glow: "0 0 60px -12px rgba(0,164,198,0.45)",
  plan: "0 30px 90px -30px rgba(0,0,0,0.9)",
},
```
**Fontes (`:root`):** `--font-sans: "Plus Jakarta Sans"`, `--font-display:
"Space Grotesk"`, `--font-mono: "JetBrains Mono"`.

**Classes essenciais a portar:** `.label-mono`, `.glass` / `.glass-card`,
`.gradient-text` (+ keyframe), `.btn-primary/secondary/ghost` (+ `::before` de
varredura), `.grid-bg` / `.blueprint-grid`, `.typing-dot`, `.ring-pulse`,
`.aurora-*`, `prefers-reduced-motion`. (Todas estão no nosso `globals.css` — é
só copiar o bloco.)

---

## 12. Faça / Não faça

**Faça:** mono-acento teal; dark-first; vidro + grid; tipografia em camadas
(display/sans/mono); movimento lento e proposital; números `tabular-nums`;
respeitar contraste e reduced-motion.

**Não faça:** segunda cor de marca; gradientes arco-íris; sombras coloridas fora
do teal; texto longo em acento; animação gratuita; QR colorido/invertido;
travessões na copy; ícones de bibliotecas diferentes (só lucide).
