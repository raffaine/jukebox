#!/usr/bin/env bash
set -euo pipefail

BOOKLET_DIR="lps/gravetos_escuro/booklet"
PUBLIC_DIR="public/lps/gravetos-no-escuro"

mkdir -p "$BOOKLET_DIR" "$PUBLIC_DIR"

if [ ! -f "$BOOKLET_DIR/cover-3000x3000.jpg" ]; then
  ./scripts/prepare-cover.sh
fi

echo "==> Compilando encarte de vinil (XeLaTeX)..."
cd "$BOOKLET_DIR"
/Library/TeX/texbin/xelatex -interaction=nonstopmode -jobname="encarte-gravetos-no-escuro" encarte.tex >/dev/null
rm -f encarte-gravetos-no-escuro.aux encarte-gravetos-no-escuro.log
cd - >/dev/null

cp "$BOOKLET_DIR/encarte-gravetos-no-escuro.pdf" "$PUBLIC_DIR/encarte-gravetos-no-escuro.pdf"
echo "==> Encarte PDF gerado com sucesso:"
echo "    - $BOOKLET_DIR/encarte-gravetos-no-escuro.pdf"
echo "    - $PUBLIC_DIR/encarte-gravetos-no-escuro.pdf"
