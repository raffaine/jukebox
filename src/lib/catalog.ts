import fs from 'node:fs';
import path from 'node:path';

export interface TimedStanza {
  index: number;
  startTime: number;
  endTime: number;
  lines: string[];
  text: string;
}

export interface Track {
  number: number;
  numberStr: string;
  slug: string;
  title: string;
  subtitle: string | null;
  fullTitle: string;
  side: 'A' | 'B';
  style: string;
  bpm: number;
  durationSeconds: number;
  durationFormatted: string;
  pauseAfterSeconds: number;
  linerNote: string;
  audioUrl: string;
  rawFile: string;
  masterWavFile: string;
  masterFlacFile: string;
  lyrics: string;
  stanzas: TimedStanza[];
}

export interface SideInfo {
  id: 'A' | 'B';
  title: string;
  subtitle: string;
  description: string;
  durationSeconds: number;
  durationFormatted: string;
  trackNumbers: number[];
  turnPauseSeconds: number;
}

export interface YoutubeChapter {
  trackNumber: string;
  title: string;
  side: 'A' | 'B';
  startSeconds: number;
  timestamp: string;
  line: string;
}

export interface Album {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  artist: string;
  year: number;
  genre: string;
  format: string;
  license: string;
  coverUrl: string;
  storeCoverFile: string;
  bookletPdfUrl: string;
  palette: {
    bgPrimary: string;
    bgSecondary: string;
    accent: string;
    accentWarm: string;
    textMain: string;
    textMuted: string;
    labelSideA: string;
    labelSideB: string;
  };
  epigraph: string;
  backCoverText: string[];
  credits: {
    production: string;
    dedication: string;
    masteringSpec: string;
  };
  sides: {
    A: SideInfo;
    B: SideInfo;
  };
  totalDurationSeconds: number;
  totalDurationFormatted: string;
  tracks: Track[];
  youtubeChapters: YoutubeChapter[];
}

export function getAllAlbums(): Album[] {
  const lpsDir = path.join(process.cwd(), 'lps');
  if (!fs.existsSync(lpsDir)) return [];

  const entries = fs.readdirSync(lpsDir, { withFileTypes: true });
  const albums: Album[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const albumJsonPath = path.join(lpsDir, entry.name, 'album.json');
      if (fs.existsSync(albumJsonPath)) {
        try {
          const raw = fs.readFileSync(albumJsonPath, 'utf8');
          const parsed = JSON.parse(raw) as Album;
          albums.push(parsed);
        } catch (err) {
          console.error(`Erro ao carregar ${albumJsonPath}:`, err);
        }
      }
    }
  }

  return albums;
}

export function getAlbumBySlug(slug: string): Album | undefined {
  const albums = getAllAlbums();
  return albums.find((a) => a.slug === slug || a.id === slug);
}
