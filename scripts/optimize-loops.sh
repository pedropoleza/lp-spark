#!/usr/bin/env bash
#
# optimize-loops.sh — converte MP4s de loops de fundo em ativos web otimizados.
#
# Para cada arquivo <nome>.mp4 na pasta de entrada, gera na pasta de saída:
#   <nome>.webm  → VP9, leve, formato principal
#   <nome>.mp4   → H.264, fallback para Safari/iOS antigos
#   <nome>.jpg   → poster (primeiro frame), evita flash em branco e serve no reduced-motion
#
# Loops de fundo não têm áudio (-an) e são limitados a 1280px de largura.
#
# Uso:
#   ./scripts/optimize-loops.sh [pasta_entrada] [pasta_saida]
#   (padrão: ./raw-loops  →  ./public/loops)
#
# Requer ffmpeg instalado:
#   macOS:  brew install ffmpeg
#   Ubuntu: sudo apt-get install ffmpeg

set -euo pipefail

IN_DIR="${1:-./raw-loops}"
OUT_DIR="${2:-./public/loops}"
MAX_WIDTH=1280

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "❌ ffmpeg não encontrado. Instale: brew install ffmpeg  (ou)  sudo apt-get install ffmpeg"
  exit 1
fi

if [ ! -d "$IN_DIR" ]; then
  echo "❌ Pasta de entrada não existe: $IN_DIR"
  echo "   Crie a pasta e coloque seus .mp4 nela, ou passe outra: ./scripts/optimize-loops.sh ./minha-pasta"
  exit 1
fi

mkdir -p "$OUT_DIR"

# escala para no máximo MAX_WIDTH mantendo proporção e dimensões pares
SCALE="scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos"

shopt -s nullglob nocaseglob
files=("$IN_DIR"/*.mp4 "$IN_DIR"/*.mov)
shopt -u nocaseglob

if [ ${#files[@]} -eq 0 ]; then
  echo "⚠️  Nenhum .mp4/.mov encontrado em $IN_DIR"
  exit 0
fi

echo "🎬 Otimizando ${#files[@]} arquivo(s) → $OUT_DIR"

for src in "${files[@]}"; do
  base="$(basename "$src")"
  name="${base%.*}"
  # slug: minúsculas, espaços→hífen
  slug="$(echo "$name" | tr '[:upper:] ' '[:lower:]-' | tr -cd '[:alnum:]-_')"
  echo "──────────────────────────────────────────"
  echo "▶ $base → $slug.{webm,mp4,jpg}"

  # WebM (VP9) — principal
  ffmpeg -y -loglevel error -i "$src" \
    -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -an \
    -pix_fmt yuv420p -vf "$SCALE" \
    "$OUT_DIR/$slug.webm"

  # MP4 (H.264) — fallback
  ffmpeg -y -loglevel error -i "$src" \
    -c:v libx264 -crf 28 -preset slow -an \
    -pix_fmt yuv420p -vf "$SCALE" -movflags +faststart \
    "$OUT_DIR/$slug.mp4"

  # Poster (primeiro frame)
  ffmpeg -y -loglevel error -i "$src" \
    -frames:v 1 -q:v 4 -vf "$SCALE" \
    "$OUT_DIR/$slug.jpg"

  webm_size=$(du -h "$OUT_DIR/$slug.webm" | cut -f1)
  mp4_size=$(du -h "$OUT_DIR/$slug.mp4" | cut -f1)
  echo "  ✓ webm $webm_size · mp4 $mp4_size · + poster"
done

echo "──────────────────────────────────────────"
echo "✅ Pronto. Arquivos em $OUT_DIR"
echo "   Use no código: <BackgroundLoop src=\"/loops/$slug\" />"
