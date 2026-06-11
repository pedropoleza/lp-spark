# Loops de fundo (vídeo otimizado)

Esta pasta guarda os **loops abstratos de fundo** já otimizados para a web.
Cada loop é um trio de arquivos com o mesmo nome (slug):

```
meu-loop.webm   ← formato principal (VP9, leve)
meu-loop.mp4    ← fallback (H.264, Safari/iOS antigos)
meu-loop.jpg    ← poster / frame estático (reduced-motion e anti-flash)
```

## Como gerar a partir dos seus MP4s

1. Crie uma pasta `raw-loops/` na raiz do projeto e jogue os `.mp4` lá.
2. Rode (precisa de `ffmpeg` instalado):

   ```bash
   npm run optimize:loops
   ```

   Isso lê `./raw-loops` e escreve os `.webm/.mp4/.jpg` aqui em `./public/loops`.

3. Marque o loop como disponível em `lib/loops.ts` (mude para `true`).
4. Commit + push → o Vercel redeploya.

> `raw-loops/` é ignorado pelo git (não sobe os MP4s brutos, só os otimizados).

## Como usar no código

```tsx
import { BackgroundLoop } from "@/components/ui/BackgroundLoop";

<div className="relative">
  <BackgroundLoop src="/loops/meu-loop" opacity={45} blend="screen" />
  {/* conteúdo por cima */}
</div>
```

O componente já é lazy (só toca no viewport), respeita `prefers-reduced-motion`
e é puramente decorativo (`aria-hidden`).
