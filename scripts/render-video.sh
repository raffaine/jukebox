#!/usr/bin/env bash
set -euo pipefail

LP_DIR="lps/gravetos_escuro"
MASTER_WAV_DIR="$LP_DIR/master/wav24"
RAW_DIR="$LP_DIR/raw"
VIDEO_DIR="$LP_DIR/video"
COVER_IMG="$LP_DIR/booklet/cover-3000x3000.jpg"
CONCAT_FILE="$VIDEO_DIR/ffconcat.txt"
OUTPUT_MP4="$VIDEO_DIR/gravetos-no-escuro-full-album-4k.mp4"

mkdir -p "$VIDEO_DIR"

# Atualiza chapters e album.json
node scripts/build-album-json.mjs

echo ""
echo "================================================================="
echo " FASE 5: RENDER DE VÍDEO 4K (YOUTUBE FULL ALBUM) + TIMESTAMPS"
echo "================================================================="

# Prepara lista de concatenação (usa WAVs masterizados se existirem, senão usa raw MP3)
> "$CONCAT_FILE"
if compgen -G "$MASTER_WAV_DIR/*.wav" >/dev/null 2>&1; then
  AUDIO_SOURCE_DIR="$MASTER_WAV_DIR"
  EXT="wav"
else
  AUDIO_SOURCE_DIR="$RAW_DIR"
  EXT="mp3"
fi

for f in "$AUDIO_SOURCE_DIR"/*."$EXT"; do
  abs_path="$(cd "$(dirname "$f")" && pwd)/$(basename "$f")"
  echo "file '$abs_path'" >> "$CONCAT_FILE"
done

echo "==> Lista de concatenação gerada em: $CONCAT_FILE"
echo "==> Capítulos do YouTube salvos em: $VIDEO_DIR/youtube_chapters.txt"
echo ""

if command -v ffmpeg >/dev/null 2>&1; then
  echo "==> Renderizando vídeo 4K (3840x2160) via ffmpeg..."
  ffmpeg -y -hide_banner \
    -loop 1 -framerate 2 -i "$COVER_IMG" \
    -f concat -safe 0 -i "$CONCAT_FILE" \
    -vf "scale=2160:2160:force_original_aspect_ratio=decrease,pad=3840:2160:(ow-iw)/2:(oh-ih)/2:color=#110d0a,format=yuv420p" \
    -c:v libx264 -preset medium -tune stillimage -crf 18 \
    -c:a aac -b:a 320k -ar 44100 \
    -shortest -movflags +faststart \
    "$OUTPUT_MP4"
  echo "==> Vídeo 4K finalizado em: $OUTPUT_MP4"
else
  echo "==> Renderizando vídeo 4K (3840x2160) via Apple AVFoundation/VideoToolbox nativo..."
  swift -module-cache-path /tmp/swift-module-cache scripts/render-video-native.swift
fi
