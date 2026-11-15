#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { SONGBOOK_TRACKS } from './songbook-data.mjs';

const ROOT = process.cwd();
const LP_DIR = path.join(ROOT, 'lps', 'gravetos_escuro');
const BOOKLET_DIR = path.join(LP_DIR, 'booklet');
const PUBLIC_DIR = path.join(ROOT, 'public', 'lps', 'gravetos-no-escuro');

// Primeiro atualiza o album.json
execFileSync('node', ['scripts/build-album-json.mjs'], { stdio: 'inherit' });

const album = JSON.parse(fs.readFileSync(path.join(LP_DIR, 'album.json'), 'utf8'));

function escapeLatex(str) {
  return String(str)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([#$%&_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/→/g, '$\\rightarrow$')
    .replace(/↔/g, '$\\leftrightarrow$');
}

const trackPagesTex = album.tracks
  .map((track) => {
    const sb = SONGBOOK_TRACKS[track.numberStr];
    if (!sb) return '';

    const chordsListStr = sb.chordsUsed.map((c) => `\\texttt{\\textbf{${escapeLatex(c)}}}`).join(' \\quad ');

    // Format chordSheet lines: lines with chords vs lyrics vs section headers
    const sheetLines = sb.chordSheet
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return '\\vspace{0.16cm}';
        if (trimmed.startsWith('[')) {
          return `\\vspace{0.12cm}\\noindent{\\texttt{\\footnotesize\\bfseries\\color{vinylrust} ${escapeLatex(trimmed)}}}`;
        }
        // Detect if line is primarily chords
        const tokens = trimmed.split(/\s+/);
        const chordRegex = /^[A-G][#b]?(m|M|maj|dim|aug|sus|[0-9]|\(|b|#|-|\/|\))*$/;
        const isChordLine =
          tokens.length > 0 &&
          tokens.every(
            (tok) =>
              chordRegex.test(tok) ||
              tok === '(Breque!)' ||
              tok === '(Para' ||
              tok === 'tudo!)' ||
              tok === '(deixar' ||
              tok === 'soar)' ||
              tok === '->'
          );

        if (isChordLine) {
          // Preserve spaces using ~
          const preserved = escapeLatex(line).replace(/ /g, '~');
          return `\\noindent{\\texttt{\\footnotesize\\bfseries\\color{vinylrust}${preserved}}}`;
        }
        return `\\noindent{\\rmfamily\\small\\color{vinylink}${escapeLatex(line)}}`;
      })
      .join('\n\n');

    return `
% ============================================================================
% FAIXA ${track.numberStr}: ${escapeLatex(track.title.toUpperCase())}
% ============================================================================
\\pageheader{SONGBOOK OFICIAL $\\cdot$ FAIXA ${track.numberStr} (LADO ${track.side})}

\\noindent{\\color{vinylrust}\\rule{\\textwidth}{1.5pt}}\\par\\vspace{0.1cm}
\\noindent{\\LARGE\\bfseries\\color{vinylink} ${track.numberStr}. ${escapeLatex(track.fullTitle)}}\\hfill{\\texttt{\\small\\color{vinylrust} TOM: ${escapeLatex(sb.key)} $\\cdot$ ${track.bpm} BPM $\\cdot$ ${escapeLatex(sb.timeSignature)}}}\\par
\\vspace{0.06cm}
\\noindent{\\texttt{\\footnotesize\\color{vinylmuted} ESTILO: ${escapeLatex(track.style)} \\quad|\\quad DICA VIOLÃO: ${escapeLatex(sb.capoHint)}}}\\par
\\vspace{0.1cm}
\\noindent{\\color{vinylochre}\\rule{\\textwidth}{0.5pt}}\\par
\\vspace{0.15cm}

\\noindent{\\texttt{\\scriptsize\\color{vinylrust} POR TRÁS DA CORTINA (HARMONIA \\& ARRANJO):}}\\par
\\noindent{\\itshape\\footnotesize\\color{vinylink} ${escapeLatex(sb.behindTheCurtain)}}\\par
\\vspace{0.12cm}
\\noindent{\\texttt{\\scriptsize\\color{vinylmuted} LEVADA / GROOVE:}} {\\footnotesize\\color{vinylink} ${escapeLatex(sb.feel)}}\\par
\\vspace{0.08cm}
\\noindent{\\texttt{\\scriptsize\\color{vinylmuted} VOICINGS PRINCIPAIS:}} ${chordsListStr}\\par
\\vspace{0.15cm}
\\noindent{\\color{vinylochre}\\rule{\\textwidth}{0.5pt}}

\\begin{multicols}{2}
\\setlength{\\parskip}{1pt}
${sheetLines}
\\end{multicols}
\\newpage
`;
  })
  .join('\n');

const fullTex = `\\documentclass[10pt]{article}
\\usepackage[a4paper, top=1.4cm, bottom=1.4cm, left=1.5cm, right=1.5cm]{geometry}
\\usepackage{fontspec}
\\usepackage{xcolor}
\\usepackage{graphicx}
\\usepackage{multicol}

\\definecolor{vinylpaper}{HTML}{F6EFE2}
\\definecolor{vinylink}{HTML}{1C140E}
\\definecolor{vinylrust}{HTML}{8C3B2B}
\\definecolor{vinylochre}{HTML}{B57B3A}
\\definecolor{vinylmuted}{HTML}{5E4D3B}
\\definecolor{vinyldark}{HTML}{140F0B}

\\setmainfont{Baskerville}[Ligatures=TeX, Scale=0.98]
\\setsansfont{Helvetica Neue}[Scale=0.92]
\\setmonofont{Courier New Bold}[Scale=0.86]

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{3pt}
\\setlength{\\columnsep}{0.9cm}
\\pagestyle{empty}

\\newcommand{\\pageheader}[1]{%
  \\noindent{\\texttt{\\scriptsize\\color{vinylmuted} GRAVETOS NO ESCURO — SONGBOOK DE CIFRAS \\& HARMONIA}\\hfill\\texttt{\\scriptsize\\color{vinylmuted} #1}}\\par
  \\vspace{-0.15cm}
  \\noindent{\\color{vinylochre}\\rule{\\textwidth}{0.5pt}}\\par
  \\vspace{0.15cm}
}

\\begin{document}

% ============================================================================
% CAPA DO SONGBOOK
% ============================================================================
\\pagecolor{vinyldark}
\\color{vinylpaper}
\\begin{center}
  \\vspace*{0.6cm}
  {\\texttt{\\small\\color{vinylochre} CADERNO DE CIFRAS, HARMONIA, LEVADAS \\& BASTIDORES MUSICAIS}}\\par
  \\vspace{0.3cm}
  {\\Huge\\bfseries\\color{vinylpaper} SONGBOOK}\\par
  \\vspace{0.15cm}
  {\\LARGE\\color{vinylochre} GRAVETOS NO ESCURO}\\par
  \\vspace{0.5cm}
  \\setlength{\\fboxsep}{2pt}
  \\setlength{\\fboxrule}{1.2pt}
  \\fcolorbox{vinylochre}{vinyldark}{\\includegraphics[width=14.8cm, height=14.8cm]{cover-3000x3000.jpg}}\\par
  \\vspace{0.55cm}
  {\\texttt{\\footnotesize\\color{vinylpaper} 9 FAIXAS CIFRADAS (MPB / SAMBA-CANÇÃO / SAMBA-ROCK-GROOVE)}}\\par
  \\vspace{0.15cm}
  {\\itshape\\small\\color{vinylochre} “Para quem quiser olhar por trás da cortina: os tons, os acordes e o compasso da travessia.”}\\par
  \\vspace{0.4cm}
  {\\texttt{\\scriptsize\\color{vinylmuted} EDIÇÃO JUKEBOX $\\cdot$ LICENÇA CC BY-SA 4.0}}
\\end{center}
\\newpage

% ============================================================================
% PÁGINA 2: ÍNDICE HARMÔNICO E MAPA DE TONALIDADES DO LP
% ============================================================================
\\pagecolor{vinylpaper}
\\color{vinylink}
\\pageheader{MAPA HARMÔNICO DO ÁLBUM}

\\begin{center}
  {\\LARGE\\bfseries\\color{vinylrust} POR TRÁS DA CORTINA — ARQUITETURA MUSICAL DO LP}\\par
  \\vspace{0.1cm}
  {\\color{vinylrust}\\rule{\\textwidth}{1.2pt}}
\\end{center}

\\vspace{0.2cm}
O arco dramático de \\textbf{Gravetos no Escuro} foi desenhado não apenas nas letras, mas também no caminho das tonalidades e dos andamentos ao longo dos dois lados do vinil:

\\begin{itemize}
  \\item \\textbf{O Ciclo Menor do Lado A (G\\#m $\\rightarrow$ C\\#m $\\rightarrow$ D\\#m):} O disco abre em \\texttt{G\\#m} (68 BPM) no violão de nylon em \\textit{Herança de Sal}, acelera para o modo Dórico em 115 BPM em \\textit{A Máscara Racha}, passa pela ironia de dominantes secundários em \\texttt{C\\#m} em \\textit{O Intruso de Terno}, e mergulha no registro grave de \\texttt{D\\#m} (80 BPM) em \\textit{Partiu Sem Sair do Lugar}, encerrando o Lado A com 3.5 segundos de silêncio dramático.
  \\item \\textbf{A Abertura Solar do Lado B (C\\#m / E7M $\\rightarrow$ Bbm / Db7M $\\rightarrow$ G\\#m / E7M):} Ao virar o disco, \\textit{Âncora no Olhar} inicia em \\texttt{C\\#m7} mas abre seu refrão no relativo maior luminoso \\texttt{E7M}, preparando o terreno para o Samba-Rock Soul solar de \\textit{A Ponte Que Não Quebra}. Na faixa 08 (\\textit{O Nosso Altar}), a batuqueira sobe para \\texttt{Bbm7 / Db7M}, e o álbum fecha o círculo em \\textit{Isso é um Túnel} (65 BPM), reconciliando \\texttt{G\\#m7} e \\texttt{E7M}.
\\end{itemize}

\\vspace{0.3cm}
\\noindent{\\large\\bfseries\\color{vinylrust} QUADRO GERAL DAS 9 FAIXAS (TOM ORIGINAL vs. VIOLÃO COM CAPO)}\\par
\\vspace{0.15cm}
\\noindent{\\color{vinylochre}\\rule{\\textwidth}{0.8pt}}\\par
\\vspace{0.15cm}

\\noindent\\texttt{\\footnotesize\\bfseries\\color{vinylrust} FAIXA \\hfill TOM ORIGINAL \\hfill COMPASSO / BPM \\hfill SUGESTÃO VIOLÃO / CAPO}\\par
\\vspace{0.08cm}
\\noindent{\\color{vinylochre}\\rule{\\textwidth}{0.4pt}}\\par

\\noindent\\textbf{01. Herança de Sal} \\dotfill \\texttt{G\\#m} \\dotfill \\texttt{2/4 (68 BPM)} \\dotfill \\textit{Capo 4ª casa (Em) ou +1 st (Am)}\\par\\vspace{0.12cm}
\\noindent\\textbf{02. A Máscara Racha} \\dotfill \\texttt{G\\#m Dórico} \\dotfill \\texttt{4/4 (115 BPM)} \\dotfill \\textit{Transpor +1 st (Am7 / D7(9))}\\par\\vspace{0.12cm}
\\noindent\\textbf{03. O Intruso de Terno} \\dotfill \\texttt{C\\#m} \\dotfill \\texttt{2/4 (100 BPM)} \\dotfill \\textit{Capo 4ª casa (Am)}\\par\\vspace{0.12cm}
\\noindent\\textbf{04. O Saldo Não Dá} \\dotfill \\texttt{G\\#m / B7M} \\dotfill \\texttt{4/4 (90 BPM)} \\dotfill \\textit{Capo 4ª casa (Em / G7M)}\\par\\vspace{0.12cm}
\\noindent\\textbf{05. Partiu Sem Sair do Lugar} \\dotfill \\texttt{D\\#m} \\dotfill \\texttt{4/4 (80 BPM)} \\dotfill \\textit{Transpor -1 st (Dm) ou +1 st (Em)}\\par\\vspace{0.12cm}
\\noindent\\textbf{06. Âncora no Olhar} \\dotfill \\texttt{C\\#m / E7M} \\dotfill \\texttt{2/4 (75 BPM)} \\dotfill \\textit{Capo 4ª casa (Am / C7M)}\\par\\vspace{0.12cm}
\\noindent\\textbf{07. A Ponte Que Não Quebra} \\dotfill \\texttt{E7M / C\\#m7} \\dotfill \\texttt{4/4 (100 BPM)} \\dotfill \\textit{Posição original (E7M aberto)}\\par\\vspace{0.12cm}
\\noindent\\textbf{08. O Nosso Altar} \\dotfill \\texttt{Bbm7 / Db7M} \\dotfill \\texttt{4/4 (102 BPM)} \\dotfill \\textit{Capo 1ª casa (Am7 / C7M)}\\par\\vspace{0.12cm}
\\noindent\\textbf{09. Isso é um Túnel} \\dotfill \\texttt{G\\#m7 / E7M} \\dotfill \\texttt{4/4 (65 BPM)} \\dotfill \\textit{Capo 4ª casa (Em7 / C7M)}\\par

\\vfill
\\begin{center}
  {\\color{vinylochre}\\rule{\\textwidth}{0.6pt}}\\par\\vspace{0.1cm}
  {\\itshape\\footnotesize\\color{vinylmuted} Na Jukebox Web (https://raffaine.github.io/jukebox/), use os botões de Transposição (-1 / +1 semitom) para ajustar qualquer cifra em tempo real.}
\\end{center}
\\newpage

${trackPagesTex}

\\end{document}
`;

const texPath = path.join(BOOKLET_DIR, 'songbook.tex');
fs.writeFileSync(texPath, fullTex, 'utf8');

console.log('==> Compilando Songbook PDF via XeLaTeX...');
execFileSync(
  '/Library/TeX/texbin/xelatex',
  ['-interaction=nonstopmode', '-jobname=songbook-gravetos-no-escuro', 'songbook.tex'],
  { cwd: BOOKLET_DIR, stdio: 'ignore' }
);

// Clean aux/log
try {
  fs.unlinkSync(path.join(BOOKLET_DIR, 'songbook-gravetos-no-escuro.aux'));
  fs.unlinkSync(path.join(BOOKLET_DIR, 'songbook-gravetos-no-escuro.log'));
} catch {
  // ignore
}

const pdfSrc = path.join(BOOKLET_DIR, 'songbook-gravetos-no-escuro.pdf');
const pdfDest = path.join(PUBLIC_DIR, 'songbook-gravetos-no-escuro.pdf');
fs.copyFileSync(pdfSrc, pdfDest);

console.log('==> Songbook PDF gerado com sucesso:');
console.log(`    - ${pdfSrc}`);
console.log(`    - ${pdfDest}`);
