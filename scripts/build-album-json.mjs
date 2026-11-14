#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const LP_DIR = path.join(ROOT, 'lps', 'gravetos_escuro');
const AUDIO_ORIG_DIR = path.join(LP_DIR, 'audio_original');
const RAW_DIR = path.join(LP_DIR, 'raw');
const WEB_DIR = path.join(LP_DIR, 'web');
const VIDEO_DIR = path.join(LP_DIR, 'video');
const PUBLIC_LP_DIR = path.join(ROOT, 'public', 'lps', 'gravetos-no-escuro');
const PUBLIC_AUDIO_DIR = path.join(PUBLIC_LP_DIR, 'audio');

fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(WEB_DIR, { recursive: true });
fs.mkdirSync(VIDEO_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_AUDIO_DIR, { recursive: true });

// Load existing durations as fallback for CI environments without ffprobe/afinfo
let cachedDurations = {};
const existingAlbumJsonPath = path.join(LP_DIR, 'album.json');
if (fs.existsSync(existingAlbumJsonPath)) {
  try {
    const prev = JSON.parse(fs.readFileSync(existingAlbumJsonPath, 'utf8'));
    for (const t of prev.tracks || []) {
      if (t.slug && t.durationSeconds) {
        cachedDurations[t.slug] = t.durationSeconds;
      }
    }
  } catch {
    // ignore
  }
}

function getAudioDuration(filePath, slug) {
  // 1. Try ffprobe
  try {
    const out = execFileSync(
      'ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', filePath],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    const val = parseFloat(out);
    if (!Number.isNaN(val) && val > 0) return val;
  } catch {
    // Fallback to macOS native afinfo
  }

  // 2. Try macOS afinfo
  try {
    const out = execFileSync('afinfo', [filePath], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const match = out.match(/estimated duration:\s*([0-9.]+)\s*sec/i);
    if (match) {
      return parseFloat(match[1]);
    }
  } catch {
    // Fallback to cached duration in album.json
  }

  if (cachedDurations[slug]) {
    return cachedDurations[slug];
  }
  return 180;
}

function formatDuration(sec) {
  const totalSeconds = Math.round(sec);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const origFiles = fs.readdirSync(AUDIO_ORIG_DIR).filter((f) => f.endsWith('.mp3'));

function findOriginalAudio(trackNumStr) {
  const found = origFiles.find((f) => f.startsWith(`${trackNumStr}.`));
  if (!found) {
    throw new Error(`Arquivo de áudio não encontrado para a faixa ${trackNumStr} em ${AUDIO_ORIG_DIR}`);
  }
  return path.join(AUDIO_ORIG_DIR, found);
}

const tracksMeta = [
  {
    number: 1,
    numberStr: '01',
    slug: '01-heranca-de-sal',
    title: 'Herança de Sal',
    subtitle: null,
    side: 'A',
    style: 'MPB / Samba-Canção',
    bpm: 68,
    linerNote:
      'O ponto zero. Violão de nylon, contrabaixo e a constatação nua de que certas ausências vêm antes mesmo do próprio nome.',
    pauseAfterSec: 0,
  },
  {
    number: 2,
    numberStr: '02',
    slug: '02-a-mascara-racha',
    title: 'A Máscara Racha',
    subtitle: 'Máscara no Asfalto',
    side: 'A',
    style: 'Funk Brasileiro & Samba-Rock',
    bpm: 115,
    linerNote:
      'A febre dos 115 BPM. Guitarra wah-wah e metais cortando a noite da juventude, onde o personagem rebelde tentava anestesiar o medo de ficar só.',
    pauseAfterSec: 0,
  },
  {
    number: 3,
    numberStr: '03',
    slug: '03-o-intruso-de-terno',
    title: 'O Intruso de Terno',
    subtitle: null,
    side: 'A',
    style: 'Samba de Breque',
    bpm: 100,
    linerNote:
      'Samba de breque de sorriso torto. Quando a porta fecha na cara, o jeito é pular a janela e rir do anfitrião.',
    pauseAfterSec: 0,
  },
  {
    number: 4,
    numberStr: '04',
    slug: '04-o-saldo-nao-da',
    title: 'O Saldo Não Dá',
    subtitle: null,
    side: 'A',
    style: 'Samba-Rock Melancólico',
    bpm: 90,
    linerNote:
      'Crônica de calçada em compasso menor. A vitrine acesa da cidade vendendo uma paz que banco nenhum financia.',
    pauseAfterSec: 0,
  },
  {
    number: 5,
    numberStr: '05',
    slug: '05-partiu-sem-sair-do-lugar',
    title: 'Partiu Sem Sair do Lugar',
    subtitle: null,
    side: 'A',
    style: 'Dark Samba-Rock',
    bpm: 80,
    linerNote:
      'O fundo do porão. O samba-rock desacelera e pesa como chumbo diante do luto invisível dentro da própria casa.',
    pauseAfterSec: 3.5,
  },
  {
    number: 6,
    numberStr: '06',
    slug: '06-ancora-no-olhar',
    title: 'Âncora no Olhar',
    subtitle: null,
    side: 'B',
    style: 'Samba Acústico / MPB',
    bpm: 75,
    linerNote:
      'A agulha pousa no respiro. O compasso manso de quem descobre nos filhos o motivo diário para não naufragar.',
    pauseAfterSec: 0,
  },
  {
    number: 7,
    numberStr: '07',
    slug: '07-a-ponte-que-nao-quebra',
    title: 'A Ponte Que Não Quebra',
    subtitle: null,
    side: 'B',
    style: 'Samba-Rock Soul',
    bpm: 100,
    linerNote:
      'O sol atravessa a vidraça. Os metais voltam quentes para celebrar a única estrutura que o vazio não conseguiu corroer.',
    pauseAfterSec: 0,
  },
  {
    number: 8,
    numberStr: '08',
    slug: '08-o-nosso-altar',
    title: 'O Nosso Altar',
    subtitle: null,
    side: 'B',
    style: 'Samba-Rock-Groove-Batuqueira',
    bpm: 102,
    linerNote:
      'Batuqueira de alma lavada. Do alojamento estudantil ao propósito de futuro: a certeza de que a autonomia só faz sentido quando há pão e canto divididos.',
    pauseAfterSec: 0,
  },
  {
    number: 9,
    numberStr: '09',
    slug: '09-isso-e-um-tunel',
    title: 'Isso é um Túnel',
    subtitle: null,
    side: 'B',
    style: 'Samba-Canção de Câmara',
    bpm: 65,
    linerNote:
      'Violoncelo, piano e guarda firme na madrugada. Sem esconderijo e sem desespero — apenas o passo constante de quem atravessa.',
    pauseAfterSec: 0,
  },
];

const docMestre = fs.readFileSync(path.join(LP_DIR, 'doc_mestre.md'), 'utf8');

function extractLyricsForTrack(trackNumberStr) {
  const regex = new RegExp(`## ${trackNumberStr}\\.[\\s\\S]*?### Letra\\n+([\\s\\S]*?)(?=\\n---\\n)`, 'm');
  const match = docMestre.match(regex);
  if (!match) {
    throw new Error(`Letra não encontrada no doc_mestre.md para a faixa ${trackNumberStr}`);
  }
  const rawLyrics = match[1].trim();
  const stanzas = rawLyrics
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return { rawLyrics, stanzas };
}

function buildTimedStanzas(stanzas, durationSec) {
  const introOffset = Math.min(12, durationSec * 0.065);
  const outroMargin = Math.min(14, durationSec * 0.08);
  const activeSpan = Math.max(durationSec - introOffset - outroMargin, durationSec * 0.8);

  const weights = stanzas.map((stanza) => {
    const lines = stanza.split('\n').length;
    return Math.max(lines, 2);
  });
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let cursor = introOffset;
  return stanzas.map((text, idx) => {
    const span = (weights[idx] / totalWeight) * activeSpan;
    const startSec = Number(cursor.toFixed(1));
    cursor += span;
    const endSec = Number(cursor.toFixed(1));
    return {
      index: idx,
      startTime: startSec,
      endTime: endSec,
      lines: text.split('\n').map((l) => l.trim()),
      text,
    };
  });
}

let totalAlbumSeconds = 0;
let cumulativeVideoSec = 0;
const youtubeChapters = [];

const tracks = tracksMeta.map((meta) => {
  const srcAudio = findOriginalAudio(meta.numberStr);
  const normalizedFileName = `${meta.slug}.mp3`;
  const rawAudioPath = path.join(RAW_DIR, normalizedFileName);
  const publicAudioPath = path.join(PUBLIC_AUDIO_DIR, normalizedFileName);

  fs.copyFileSync(srcAudio, rawAudioPath);
  fs.copyFileSync(srcAudio, publicAudioPath);

  const durationSec = Number(getAudioDuration(rawAudioPath, meta.slug).toFixed(3));
  const durationFormatted = formatDuration(durationSec);
  const { rawLyrics, stanzas } = extractLyricsForTrack(meta.numberStr);
  const timedStanzas = buildTimedStanzas(stanzas, durationSec);

  const startTimestampFormatted = formatDuration(cumulativeVideoSec);
  youtubeChapters.push({
    trackNumber: meta.numberStr,
    title: meta.title,
    side: meta.side,
    startSeconds: Number(cumulativeVideoSec.toFixed(2)),
    timestamp: startTimestampFormatted,
    line: `${startTimestampFormatted} ${meta.numberStr}. ${meta.title}`,
  });

  totalAlbumSeconds += durationSec;
  cumulativeVideoSec += durationSec + (meta.pauseAfterSec || 0);

  return {
    number: meta.number,
    numberStr: meta.numberStr,
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    fullTitle: meta.subtitle ? `${meta.title} (${meta.subtitle})` : meta.title,
    side: meta.side,
    style: meta.style,
    bpm: meta.bpm,
    durationSeconds: durationSec,
    durationFormatted,
    pauseAfterSeconds: meta.pauseAfterSec,
    linerNote: meta.linerNote,
    audioUrl: `/lps/gravetos-no-escuro/audio/${normalizedFileName}`,
    rawFile: `raw/${normalizedFileName}`,
    masterWavFile: `master/${meta.slug}.wav`,
    masterFlacFile: `master/${meta.slug}.flac`,
    lyrics: rawLyrics,
    stanzas: timedStanzas,
  };
});

const sideASeconds = tracks.filter((t) => t.side === 'A').reduce((acc, t) => acc + t.durationSeconds, 0);
const sideBSeconds = tracks.filter((t) => t.side === 'B').reduce((acc, t) => acc + t.durationSeconds, 0);

const albumData = {
  id: 'gravetos-no-escuro',
  slug: 'gravetos-no-escuro',
  title: 'Gravetos no Escuro',
  subtitle: 'LP Conceitual — 9 Faixas',
  artist: 'Sintropia',
  year: 2026,
  genre: 'MPB / Samba-Canção / Samba-Rock-Groove',
  format: 'LP Conceitual (Vinil 12" & Edição Digital)',
  license: 'CC BY-SA 4.0',
  coverUrl: '/lps/gravetos-no-escuro/cover.jpg',
  storeCoverFile: 'booklet/cover-3000x3000.jpg',
  bookletPdfUrl: '/lps/gravetos-no-escuro/encarte-gravetos-no-escuro.pdf',
  palette: {
    bgPrimary: '#110d0a',
    bgSecondary: '#1c1510',
    accent: '#d99b52',
    accentWarm: '#e6b87d',
    textMain: '#f2e6d5',
    textMuted: '#a8947e',
    labelSideA: '#8c3b2b',
    labelSideB: '#2d5a4c',
  },
  epigraph:
    '“Não pedi licença para entrar na sala, nem recibo pelo que perdi no caminho. Juntei o que deu: três gravetos, duas âncoras no olhar e um bando na memória. Enquanto houver lenha e compasso, o escuro é só parte da estrada.”',
  backCoverText: [
    'Há solidões que visitam; há outras que fundam a casa. Este disco nasceu no escuro de um quarto onde o relógio pesa mais que o ar, feito por quem aprendeu cedo a erguer abrigo com o que sobrou no chão.',
    'No Lado A, o ferro frio: a infância rala, a armadura cínica da rua, o salão onde não fomos chamados, a vitrine impagável e o silêncio brutal de ver quem se ama partir sem sair do lugar. Aqui não há enfeite — o ritmo bate seco porque a dor também tem compasso.',
    'Mas ninguém junta gravetos por vocação ao frio; junta-se porque a madeira seca ainda guarda fogo. Quando o disco vira para o Lado B, entram o passo pequeno na sala, a memória viva da mesa dividida e o suor da cozinha batucando contra o isolamento. Não é promessa de cura mágica nem final de vitrine. É o relato de quem segue de sentinela, sabendo distinguir o peso de uma tumba da travessia de um túnel.',
  ],
  credits: {
    production: 'Produzido na fronteira entre o silêncio do quarto e o barulho da cozinha.',
    dedication:
      'Dedicado às âncoras que iluminam a sala, à memória das mesas compartilhadas e a quem ainda dorme longe, esperando o caminho de volta.',
    masteringSpec: 'loudnorm=I=-14:TP=-1.5:LRA=11 (WAV 24-bit/44.1kHz + FLAC + MP3 320kbps)',
  },
  sides: {
    A: {
      id: 'A',
      title: 'O Peso e a Máscara',
      subtitle: 'Faixas 01 a 05',
      description:
        'O ferro frio: a infância rala, a armadura cínica da rua, o salão onde não fomos chamados, a vitrine impagável e o silêncio brutal de ver quem se ama partir sem sair do lugar.',
      durationSeconds: Number(sideASeconds.toFixed(2)),
      durationFormatted: formatDuration(sideASeconds),
      trackNumbers: [1, 2, 3, 4, 5],
      turnPauseSeconds: 3.5,
    },
    B: {
      id: 'B',
      title: 'A Fagulha e a Travessia',
      subtitle: 'Faixas 06 a 09',
      description:
        'A madeira seca ainda guarda fogo: o passo pequeno na sala, a memória viva da mesa dividida e o suor da cozinha batucando contra o isolamento.',
      durationSeconds: Number(sideBSeconds.toFixed(2)),
      durationFormatted: formatDuration(sideBSeconds),
      trackNumbers: [6, 7, 8, 9],
      turnPauseSeconds: 0,
    },
  },
  totalDurationSeconds: Number(totalAlbumSeconds.toFixed(2)),
  totalDurationFormatted: formatDuration(totalAlbumSeconds),
  tracks,
  youtubeChapters,
};

const jsonString = JSON.stringify(albumData, null, 2);
fs.writeFileSync(path.join(LP_DIR, 'album.json'), jsonString);
fs.writeFileSync(path.join(WEB_DIR, 'album.json'), jsonString);
fs.writeFileSync(path.join(PUBLIC_LP_DIR, 'album.json'), jsonString);

const catalogData = {
  jukeboxTitle: 'Jukebox — Sala de Audição',
  jukeboxSubtitle: 'Acervo de LPs Autorais & Encartes Interativos',
  albums: [albumData],
};
fs.writeFileSync(path.join(ROOT, 'lps', 'catalog.json'), JSON.stringify(catalogData, null, 2));

const chaptersText = [
  '=== CAPÍTULOS DO YOUTUBE — GRAVETOS NO ESCURO (LP COMPLETO) ===',
  '',
  ...youtubeChapters.map((c) => c.line),
  '',
  `Duração Total das Faixas: ${formatDuration(totalAlbumSeconds)}`,
  `Duração Total do Vídeo (com pausa de 3.5s na virada do Lado A -> B): ${formatDuration(cumulativeVideoSec)}`,
].join('\n');

fs.writeFileSync(path.join(VIDEO_DIR, 'youtube_chapters.txt'), chaptersText + '\n');

console.log('==> album.json consolidado com sucesso!');
console.log(`==> Total de faixas: ${tracks.length} | Duração total: ${formatDuration(totalAlbumSeconds)}`);
