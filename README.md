# Jukebox — Sala de Audição de LPs & Pipeline de Distribuição

Webapp em **Astro** projetado como uma **Sala de Audição (Listening Room)** para LPs conceituais em vinil, estreando com o LP **"Gravetos no Escuro"** (9 faixas, Lado A e Lado B) e pronto para receber novas obras na pasta `lps/`.

---

## Como Rodar a Jukebox Localmente

```bash
# Iniciar servidor de desenvolvimento (http://localhost:4321)
npm run dev

# Gerar build estático de produção em dist/
npm run build
```

---

## Comandos do Pipeline (Fases 1 a 5)

| Fase | Comando | O que faz |
| :--- | :--- | :--- |
| **Fase 1 & 3** | `npm run album:json` | Lê `doc_mestre.md` e os áudios, extrai durações exatas (`ffprobe` / `afinfo`), sincroniza estrofes e gera `album.json` + capítulos do YouTube. |
| **Fase 2** | `npm run album:master` | Roda nivelamento `loudnorm=I=-14:TP=-1.5:LRA=11` (com pausa dramática de 3.5s após a faixa 05) e exporta WAV 24-bit/44.1kHz, FLAC e MP3 320kbps em `lps/gravetos_escuro/master/`. |
| **Fase 3 (Capa)** | `npm run album:cover` | Fecha a capa em `3000x3000px` (`booklet/cover-3000x3000.jpg` para lojas/distribuidoras) e otimiza a capa web (`1400x1400px`). |
| **Fase 3 (PDF)** | `npm run album:booklet` | Compila o encarte de letras e crônicas via **XeLaTeX** com estética de vinil anos 70 (`booklet/encarte-gravetos-no-escuro.pdf`). |
| **Fase 5 (Vídeo)** | `npm run album:video` | Imprime os capítulos do YouTube e concatena as 9 faixas sobre a capa em vídeo 4K (`video/gravetos-no-escuro-full-album-4k.mp4`). |

---

## Como Adicionar um Novo LP na Jukebox

A Jukebox descobre automaticamente qualquer pasta dentro de `lps/` que possua um arquivo `album.json`:

1. Crie uma pasta `lps/nome_do_novo_lp/`.
2. Coloque o `album.json` seguindo a mesma estrutura de `lps/gravetos_escuro/album.json` e os arquivos públicos em `public/lps/nome-do-novo-lp/`.
3. Ao rodar `npm run dev` ou `npm run build`, o novo disco aparecerá automaticamente na **Estante de LPs** no topo da Jukebox e ganhará sua rota dedicada `/lp/nome-do-novo-lp`.
