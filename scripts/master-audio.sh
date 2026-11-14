#!/usr/bin/env bash
set -euo pipefail

LP_DIR="lps/gravetos_escuro"
RAW_DIR="$LP_DIR/raw"
MASTER_DIR="$LP_DIR/master"

mkdir -p "$MASTER_DIR/wav24" "$MASTER_DIR/flac" "$MASTER_DIR/mp3_320"

echo "================================================================="
echo " FASE 2: NIVELAMENTO E MASTERIZAÇÃO DE ÁUDIO (GRAVETOS NO ESCURO)"
echo " Target: loudnorm=I=-14:TP=-1.5:LRA=11 | WAV 24-bit/44.1kHz"
echo " Respiro dramático: +3.5s de silêncio após a Faixa 05 (Lado A)"
echo "================================================================="

if command -v ffmpeg >/dev/null 2>&1; then
  for src in "$RAW_DIR"/*.mp3; do
    base="$(basename "$src" .mp3)"
    echo "==> Masterizando $base com ffmpeg (loudnorm -14 LUFS)..."

    # Se for a faixa 05, adiciona 3.5 segundos de silêncio dramático no final (virada do Lado A)
    if [[ "$base" == 05-* ]]; then
      AF_FILTER="loudnorm=I=-14:TP=-1.5:LRA=11,apad=pad_dur=3.5"
    else
      AF_FILTER="loudnorm=I=-14:TP=-1.5:LRA=11"
    fi

    # 1. WAV 24-bit / 44.1kHz
    ffmpeg -y -hide_banner -loglevel error -i "$src" \
      -af "$AF_FILTER" \
      -c:a pcm_s24le -ar 44100 \
      "$MASTER_DIR/wav24/${base}.wav"

    # 2. FLAC (Lossless)
    ffmpeg -y -hide_banner -loglevel error -i "$MASTER_DIR/wav24/${base}.wav" \
      -c:a flac -compression_level 8 \
      "$MASTER_DIR/flac/${base}.flac"

    # 3. MP3 320kbps (Streaming)
    ffmpeg -y -hide_banner -loglevel error -i "$MASTER_DIR/wav24/${base}.wav" \
      -c:a libmp3lame -b:a 320k \
      "$MASTER_DIR/mp3_320/${base}.mp3"
  done

  echo "==> Masterização concluída com sucesso em $MASTER_DIR!"
else
  echo "[AVISO] 'ffmpeg' não encontrado no PATH para aplicar o filtro loudnorm."
  echo "        Para instalar: brew install ffmpeg"
  echo ""
  echo "==> Executando conversão nativa do macOS (afconvert) para gerar WAV 24-bit/44.1kHz e FLAC em $MASTER_DIR..."
  for src in "$RAW_DIR"/*.mp3; do
    base="$(basename "$src" .mp3)"
    echo "    -> Convertendo $base para WAV 24-bit/44.1kHz e FLAC..."
    /usr/bin/afconvert -f WAVE -d LEI24@44100 "$src" "$MASTER_DIR/wav24/${base}.wav"
    /usr/bin/afconvert -f flac -d flac "$MASTER_DIR/wav24/${base}.wav" "$MASTER_DIR/flac/${base}.flac"
    cp "$src" "$MASTER_DIR/mp3_320/${base}.mp3"
  done
  echo "==> Arquivos WAV 24-bit e FLAC gerados em $MASTER_DIR! (Instale o ffmpeg e rode novamente para aplicar o loudnorm + pausa de 3.5s)."
fi
