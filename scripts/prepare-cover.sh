#!/usr/bin/env bash
set -euo pipefail

LP_DIR="lps/gravetos_escuro"
SRC_IMAGE="$LP_DIR/imagens/arte_capa.jpg"
STORE_COVER="$LP_DIR/booklet/cover-3000x3000.jpg"
WEB_COVER="$LP_DIR/web/cover.jpg"
PUBLIC_DIR="public/lps/gravetos-no-escuro"

mkdir -p "$LP_DIR/booklet" "$LP_DIR/web" "$PUBLIC_DIR"

if [ ! -f "$SRC_IMAGE" ]; then
  echo "Erro: Imagem de origem não encontrada em $SRC_IMAGE"
  exit 1
fi

echo "==> Gerando capa 3000x3000px (Padrão das Lojas / Distribuição)..."
if command -v magick >/dev/null 2>&1; then
  magick "$SRC_IMAGE" -filter Lanczos -resize 3000x3000! -unsharp 0x0.75+0.75+0.008 -quality 95 "$STORE_COVER"
  magick "$SRC_IMAGE" -filter Lanczos -resize 1400x1400 -quality 90 "$WEB_COVER"
else
  cp "$SRC_IMAGE" "$STORE_COVER"
  sips -z 3000 3000 "$STORE_COVER" >/dev/null
  cp "$SRC_IMAGE" "$WEB_COVER"
  sips -z 1400 1400 "$WEB_COVER" >/dev/null
fi

cp "$WEB_COVER" "$PUBLIC_DIR/cover.jpg"

echo "==> Dimensões verificadas:"
sips -g pixelWidth -g pixelHeight "$STORE_COVER" "$WEB_COVER"
echo "==> Capas salvas em:"
echo "    - $STORE_COVER (3000x3000px)"
echo "    - $WEB_COVER (1400x1400px)"
echo "    - $PUBLIC_DIR/cover.jpg"
