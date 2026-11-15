// Dados musicais completos do Songbook de "Gravetos no Escuro"
// Extraídos via análise espectral (Goertzel/Chromagram) dos áudios originais e estruturados na estética de Songbook MPB.

export const CHORD_SHAPES = {
  // Acordes em G#m / B / E / C#m / D#m / Bbm e equivalentes de transposição
  'G#m7': { frets: [4, 'x', 4, 4, 4, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'G#m7' },
  'C#m7': { frets: ['x', 4, 6, 4, 5, 4], fingers: ['', '1', '3', '1', '2', '1'], baseFret: 1, label: 'C#m7' },
  'F#7(13)': { frets: [2, 'x', 2, 3, 4, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'F#7(13)' },
  'B7M': { frets: ['x', 2, 4, 3, 4, 'x'], fingers: ['', '1', '3', '2', '4', ''], baseFret: 1, label: 'B7M' },
  'E7M': { frets: ['x', 7, 9, 8, 9, 'x'], fingers: ['', '1', '3', '2', '4', ''], baseFret: 1, label: 'E7M' },
  'A#m7(b5)': { frets: ['x', 1, 2, 1, 2, 'x'], fingers: ['', '1', '3', '2', '4', ''], baseFret: 1, label: 'A#m7(b5)' },
  'D#7(b9)': { frets: ['x', 6, 5, 6, 5, 'x'], fingers: ['', '2', '1', '3', '1', ''], baseFret: 1, label: 'D#7(b9)' },
  'D#7(#9)': { frets: ['x', 6, 5, 6, 7, 'x'], fingers: ['', '2', '1', '3', '4', ''], baseFret: 1, label: 'D#7(#9)' },
  'C#7(9)': { frets: ['x', 4, 3, 4, 4, 'x'], fingers: ['', '2', '1', '3', '4', ''], baseFret: 1, label: 'C#7(9)' },
  'G#7(b13)': { frets: [4, 'x', 4, 5, 5, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'G#7(b13)' },
  'F#m7': { frets: [2, 'x', 2, 2, 2, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'F#m7' },
  'B7(9)': { frets: ['x', 2, 1, 2, 2, 'x'], fingers: ['', '2', '1', '3', '4', ''], baseFret: 1, label: 'B7(9)' },
  'B7(13)': { frets: ['x', 2, 'x', 2, 4, 4], fingers: ['', '1', '', '2', '3', '4'], baseFret: 1, label: 'B7(13)' },
  'A7M': { frets: [5, 'x', 6, 6, 5, 'x'], fingers: ['1', '', '3', '4', '2', ''], baseFret: 1, label: 'A7M' },
  'D#m7': { frets: ['x', 6, 8, 6, 7, 6], fingers: ['', '1', '3', '1', '2', '1'], baseFret: 1, label: 'D#m7' },
  'A#7(b9)': { frets: [6, 'x', 6, 7, 6, 'x'], fingers: ['1', '', '2', '4', '3', ''], baseFret: 1, label: 'A#7(b9)' },
  'Bbm7': { frets: [6, 'x', 6, 6, 6, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'Bbm7' },
  'Ebm7': { frets: ['x', 6, 8, 6, 7, 6], fingers: ['', '1', '3', '1', '2', '1'], baseFret: 1, label: 'Ebm7' },
  'Ab7(13)': { frets: [4, 'x', 4, 5, 6, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'Ab7(13)' },
  'Db7M': { frets: ['x', 4, 6, 5, 6, 'x'], fingers: ['', '1', '3', '2', '4', ''], baseFret: 1, label: 'Db7M' },
  'F7(#9)': { frets: ['x', 8, 7, 8, 9, 'x'], fingers: ['', '2', '1', '3', '4', ''], baseFret: 1, label: 'F7(#9)' },
  'Cm7(b5)': { frets: ['x', 3, 4, 3, 4, 'x'], fingers: ['', '1', '3', '2', '4', ''], baseFret: 1, label: 'Cm7(b5)' },
  // Voicings abertos (Am / Dm / Em) para quando o usuário acionar o Capotraste / Violão Fácil
  'Am7': { frets: ['x', 0, 2, 0, 1, 0], fingers: ['', '', '2', '', '1', ''], baseFret: 1, label: 'Am7' },
  'Dm7': { frets: ['x', 'x', 0, 2, 1, 1], fingers: ['', '', '', '2', '1', '1'], baseFret: 1, label: 'Dm7' },
  'G7(13)': { frets: [3, 'x', 3, 4, 5, 'x'], fingers: ['1', '', '2', '3', '4', ''], baseFret: 1, label: 'G7(13)' },
  'C7M': { frets: ['x', 3, 2, 0, 0, 0], fingers: ['', '3', '2', '', '', ''], baseFret: 1, label: 'C7M' },
  'F7M': { frets: [1, 'x', 2, 2, 1, 'x'], fingers: ['1', '', '3', '4', '2', ''], baseFret: 1, label: 'F7M' },
  'Bm7(b5)': { frets: ['x', 2, 3, 2, 3, 'x'], fingers: ['', '1', '3', '2', '4', ''], baseFret: 1, label: 'Bm7(b5)' },
  'E7(b9)': { frets: [0, 2, 0, 1, 0, 1], fingers: ['', '2', '', '1', '', '1'], baseFret: 1, label: 'E7(b9)' },
  'Em7': { frets: [0, 2, 2, 0, 3, 0], fingers: ['', '1', '2', '', '3', ''], baseFret: 1, label: 'Em7' },
};

export const SONGBOOK_TRACKS = {
  '01': {
    key: 'G#m',
    capoHint: 'Capo na 4ª casa (tocar em Em) ou afinação 1/2 tom abaixo (Am)',
    easyTransposeSemitones: 1, // +1 semitom transforma G#m -> Am!
    timeSignature: '2/4 (Samba-Canção Lento)',
    feel: 'Rubato intimista no violão de 7 cordas / nylon, com baixarias descendentes em semicolcheias.',
    groovePattern: {
      label: 'Levada de Samba-Canção (2/4 — 68 BPM)',
      subdivisions: ['1', 'e', '&', 'a', '2', 'e', '&', 'a'],
      voices: [
        { name: 'Polegar (Baixo)', hits: [1, 0, 0, 1, 1, 0, 0, 0] },
        { name: 'Puxada (Acorde)', hits: [0, 1, 0, 1, 0, 0, 1, 0] },
      ],
    },
    behindTheCurtain:
      'A faixa abre o disco em Sol Sustenido Menor (G#m), uma tonalidade historicamente associada ao lamento contido no violão brasileiro. O ciclo de quartas (G#m7 → C#m7 → F#7 → B7M) cria uma sensação de tentativa de saída para o relativo maior (Si Maior), mas a harmonia sempre é puxada de volta ao chão pelo II–V menor (A#m7(b5) → D#7(b9)), espelhando a letra onde "nenhum afeto consegue secar" o rio de sombra.',
    chordsUsed: ['G#m7', 'C#m7', 'F#7(13)', 'B7M', 'E7M', 'A#m7(b5)', 'D#7(b9)'],
    chordSheet: `[Intro] G#m7  C#m7  A#m7(b5)  D#7(b9)  G#m7

[Primeira Parte]
G#m7                        C#m7
Nasci sozinho na beira da estrada
D#7(b9)                     G#m7
Sem muita história nem fado pra rir
G#m7                        C#m7
A infância escassa me deu quase nada
F#7(13)                     B7M
E a dor foi a mestra pra me conduzir
E7M                         A#m7(b5)
Fiquei sem meu mundo perdi meu norte
D#7(b9)                     G#m7
Canto baixinho o que a vida calou
E7M                         A#m7(b5)
Catando gravetos driblando a sorte
D#7(b9)                     G#m7
Sou a exceção que o tempo esqueceu

[Refrão]
            C#m7                F#7(13)
A solidão é herança sem fim
            B7M                 E7M
Mora no fundo e não sai de mim
            A#m7(b5)            D#7(b9)
Um rio de sombra que quer me afogar
            G#m7                G#7(b13)
E nenhum afeto consegue secar
            C#m7                D#7(b9)
A canção do vazio que vem me cobrar
            A#m7(b5)  D#7(b9)   G#m7
O preço de nunca poder descansar

[Segunda Parte]
G#m7                        C#m7
O mundo sorriu e me deu um lugar
F#7(13)                     B7M
Um novo carinho uma outra mãe
E7M                         A#m7(b5)
Mas logo o destino voltou a roubar
D#7(b9)                     G#m7
A ponte que eu fiz para não naufragar
G#m7                        C#m7
E agora de novo a mesma canção
F#7(13)                     B7M
Deitar com o medo no escuro sem fim
E7M                         A#m7(b5)
O cansaço é o mastro dessa embarcação
D#7(b9)                     G#m7
E a lágrima o único sal para mim

[Terceira Parte / Desfecho]
G#m7                        C#m7
Uma família sorri no meu lar
F#7(13)                     B7M
A mesa está posta o beijo me acolhe
E7M                         A#m7(b5)
Mas ela se esconde no canto a espiar
D#7(b9)                     G#m7
Esperando a hora em que a força me encolhe
E7M                         C#m7
Não é desamor não é falta de fé
A#m7(b5)                    D#7(b9)
É só que o vazio tem fome de mim
C#m7                        D#7(b9)
Destrói minhas pontes me deixa sem pé
A#m7(b5)        D#7(b9)     G#m7
E escreve em silêncio o meu próprio fim`,
  },

  '02': {
    key: 'G#m (Dórico)',
    capoHint: 'Transpor +1 semitom para tocar em Am7 / D7(9) no violão',
    easyTransposeSemitones: 1,
    timeSignature: '4/4 (Funk Brasileiro & Samba-Rock)',
    feel: 'Groove sincopado em 115 BPM com guitarra wah-wah no contratempo e ataque de metais no acorde D#7(#9).',
    groovePattern: {
      label: 'Groove Samba-Rock / Funk (4/4 — 115 BPM)',
      subdivisions: ['1', '&', '2', '&', '3', '&', '4', '&'],
      voices: [
        { name: 'Guitarra Wah', hits: [0, 1, 1, 0, 0, 1, 1, 0] },
        { name: 'Caixa / Aro', hits: [0, 0, 1, 0, 0, 1, 0, 1] },
        { name: 'Baixo Groove', hits: [1, 0, 0, 1, 1, 0, 1, 0] },
      ],
    },
    behindTheCurtain:
      'Depois da introspecção da Faixa 01, a harmonia permanece em G#m, mas muda do modo Eólio para o modo Dórico (G#m7 ↔ C#7(9)). Esse vamp de dois acordes — marca registrada de Jorge Ben e Tim Maia nos anos 70 — injeta adrenalina imediata. No refrão, a queda cromática E7M → D#7(#9) (o famoso "acorde Hendrix" de dominante com nona aumentada) traduz a tensão da máscara rachando na madrugada.',
    chordsUsed: ['G#m7', 'C#7(9)', 'E7M', 'D#7(#9)', 'B7M'],
    chordSheet: `[Intro / Riff Metais] G#m7  C#7(9)  G#m7  D#7(#9)

[Primeira Parte]
G#m7                              C#7(9)
Cheguei na cena feito estranho no ninho
G#m7                              C#7(9)
Com a rejeição batendo forte no peito
G#m7                              C#7(9)
Vesti a capa de quem anda sozinho
E7M                               D#7(#9)
Um outsider com defeito no jeito
G#m7                              C#7(9)
Era a armadura pra esconder a ferida
G#m7                              C#7(9)
A bofetada que a vida me deu
E7M                               C#m7
Criei um personagem pra lida
D#7(#9)                           G#m7
E o verdadeiro 'eu' se escondeu

[Refrão]
G#m7                              C#7(9)
Mas a máscara racha quando a noite vem cobrando
E7M                               D#7(#9)
A solidão não dorme, ela fica só espreitando
G#m7                              C#7(9)
Mudei o rumo, encontrei o meu lugar
E7M               D#7(#9)         G#m7
Nesse bonde que me ensina a caminhar

[Segunda Parte]
G#m7                              C#7(9)
Fui queimar a juventude no fogo do escape
G#m7                              C#7(9)
Buscando anestesia pra não ver o estrago
G#m7                              C#7(9)
Abraçando o perigo, jogando no blefe
E7M                               D#7(#9)
Ouvindo discursos que me punham de lado
C#m7                              G#m7
Olhava pra vitrine e o preço era alto demais
C#m7                              G#m7
Amizades rasas, amores de plástico, sem paz
E7M                               C#m7
Errei por imaturo, perdi conexões no caminho
D#7(#9)
Mas era só o medo de morrer sozinho

[Coda / Batuque Final]
G#m7                              C#7(9)
O cansaço é real, mas o cansaço não me para não
E7M                               D#7(#9)
A solidão tá aqui, mas agora eu tenho o meu bando
G#m7                              C#7(9)
Samba-rock pesado pra espantar a escuridão
E7M               D#7(#9)         G#m7
E o monstro do vazio tá de longe só olhando`,
  },

  '03': {
    key: 'C#m',
    capoHint: 'Capo na 4ª casa (tocar em Am) ou +1 semitom (Dm)',
    easyTransposeSemitones: -4,
    timeSignature: '2/4 (Samba de Breque)',
    feel: 'Samba malandro em 100 BPM com paradas secas (breques) no G#7(b13) antes das frases faladas.',
    groovePattern: {
      label: 'Levada Samba de Breque (2/4 — 100 BPM)',
      subdivisions: ['1', 'e', '&', 'a', '2', 'e', '&', 'a'],
      voices: [
        { name: 'Tamborim / Breque', hits: [1, 0, 1, 1, 0, 1, 0, 0] },
        { name: 'Violão Sincopado', hits: [0, 1, 0, 1, 0, 1, 1, 0] },
        { name: 'Surdo Marcação', hits: [1, 0, 0, 0, 1, 0, 0, 0] },
      ],
    },
    behindTheCurtain:
      'Construída em Dó Sustenido Menor (C#m), esta faixa usa dominantes secundários em cadeia (C#7 → F#m7 → B7(9) → E7M → A7M → D#7(9) → G#7(b13)) para dar o ar teatral e irônico do Samba de Breque clássico de Moreira da Silva. Na última frase ("Cadeira tá vaga? Pois é, agora eu ocupo"), a banda inteira faz um breque seco no G#7(b13) e só resolve no C#m6/9 depois da fala.',
    chordsUsed: ['C#m7', 'G#7(b13)', 'F#m7', 'B7(9)', 'E7M', 'A7M', 'D#7(b9)'],
    chordSheet: `[Intro] C#m7  D#7(b9)  G#7(b13)  C#m7  (Breque!)

[Primeira Parte]
C#m7                              G#7(b13)
Entrei sem bater a porta tava encostada
C#m7                              F#m7
A mesa cheia de gente a alma bem guardada
F#m7                              B7(9)
Comentei do vinho dei risada do azar
E7M                               G#7(b13)
Notei que ninguém nota quem não quer se ajustar
C#m7                              G#7(b13)
O garçom me olha o anfitrião não conhece
F#m7                              B7(9)
Mas esse é o meu charme é assim que a vida floresce
A7M                               G#7(b13)
Fingem que não veem mas eu tô no salão
C#m7              G#7(b13)        C#m7
O intruso de terno o dono da situação

[Segunda Parte]
C#m7                              G#7(b13)
Aponto o dedo pro destino ele me olha com raiva
C#m7                              F#m7
Eu sou o erro do sistema a peça que se lava
B7(9)                             E7M
Mas não sai a mancha eu sou o risco no cristal
A7M                               G#7(b13)
Quem nasceu pra exceção não se sente mal no carnaval
F#m7                              C#m7
Sorrio o sorriso que todo mundo prefere
D#7(b9)                           G#7(b13)
Enquanto o meu cínico interior se diverte
F#m7                              C#m7
Vendo a vida de vocês com esse medo de cair
A7M                               G#7(b13)   (Breque!)
Eu já tô no chão meu amigo não tenho pra onde fugir

[Refrão]
C#m7                              F#m7
É o dedo do meio pro que o mundo desenhou!
B7(9)                             E7M
Eu sou o convidado que o dono não chamou!
A7M                               F#m7
Pode fechar a porta eu entro pela janela!
D#7(b9)                           G#7(b13)
A vida é esse circo e eu sou a atração dela!
C#m7                              F#m7
Eu sou a intriga a piada o caos!
G#7(b13)                          C#m7
Dançando com o diabo sem pedir pros ancestrais!

[Final — Breque Falado]
G#7(b13) (Para tudo!)
"Cadeira tá vaga? Pois é, agora eu ocupo." -> C#m7`,
  },

  '04': {
    key: 'G#m / B',
    capoHint: 'Capo na 4ª casa (Em / G) ou transpor +1 semitom (Am / C)',
    easyTransposeSemitones: 1,
    timeSignature: '4/4 (Samba-Rock Melancólico)',
    feel: 'Andamento médio-lento (90 BPM), guitarra limpa com chorus leve e piano elétrico Fender Rhodes.',
    groovePattern: {
      label: 'Samba-Rock de Calçada (4/4 — 90 BPM)',
      subdivisions: ['1', '&', '2', '&', '3', '&', '4', '&'],
      voices: [
        { name: 'Rhodes / Violão', hits: [1, 0, 0, 1, 0, 1, 1, 0] },
        { name: 'Chimbal / Aro', hits: [1, 1, 1, 1, 1, 1, 1, 1] },
        { name: 'Baixo Melódico', hits: [1, 0, 0, 1, 1, 0, 0, 0] },
      ],
    },
    behindTheCurtain:
      'Uma crônica urbana construída sobre a ambiguidade entre G#m7 e B7M. Nos versos, a harmonia caminha sobre o escuro da calçada (G#m7 → C#m7); quando o refrão menciona "comprar esse azul", a progressão abre momentaneamente para o brilho artificial da vitrine em B7M e E7M, mas logo esbarra no acorde meio-diminuto A#m7(b5) ("o preço é alto, o banco não aprova").',
    chordsUsed: ['G#m7', 'C#m7', 'F#7(13)', 'B7M', 'E7M', 'A#m7(b5)', 'D#7(b9)'],
    chordSheet: `[Intro] G#m7  C#m7  F#7(13)  B7M  D#7(b9)

[Primeira Parte]
G#m7                        C#m7
Vitrine acesa na avenida principal
F#7(13)                     B7M
Felicidade exposta em preço irreal
E7M                         A#m7(b5)
Todo mundo sorri no manequim de gesso
D#7(b9)                     G#m7
Eu passo na calçada e não sei o endereço
G#m7                        C#m7
Máscaras coladas com a pressa do dia
F#7(13)                     B7M
Vendendo a alma por pura fantasia
E7M                         A#m7(b5)
Olho no espelho e o reflexo é de vidro
D#7(b9)                     G#m7
Um figurante tentando algum sentido

[Refrão]
            C#m7                F#7(13)
E o saldo não dá pra comprar esse azul
            B7M                 E7M
O brilho da vitrine é um norte pro sul
            C#m7                D#7(b9)
A felicidade é produto de prateleira
            G#m7                G#7(b13)
E eu sou só o resto daquela fileira
            C#m7                A#m7(b5)
O preço é alto o banco não aprova
            D#7(b9)             G#m7
Viver desse jeito é uma eterna prova

[Coda — Fade Out]
C#m7                  G#m7
Ninguém tem o preço, ninguém tem o saldo
E7M                   D#7(b9)       G#m7
Só a gente na rua sem o brilho... a luz apaga.`,
  },

  '05': {
    key: 'D#m (Ebm)',
    capoHint: 'Transpor +1 semitom para tocar em Em ou -1 semitom para Dm',
    easyTransposeSemitones: -1,
    timeSignature: '4/4 (Dark Samba-Rock / Lamento)',
    feel: 'Pulso implacável de 80 BPM marcando os segundos como um relógio na parede; termina em 3.5s de silêncio absoluto.',
    groovePattern: {
      label: 'Pulso "Relógio na Parede" (4/4 — 80 BPM)',
      subdivisions: ['1', '&', '2', '&', '3', '&', '4', '&'],
      voices: [
        { name: 'Aro (Relógio)', hits: [1, 0, 1, 0, 1, 0, 1, 0] },
        { name: 'Guitarra Grave', hits: [1, 0, 0, 1, 0, 0, 1, 0] },
        { name: 'Bumbo / Baixo', hits: [1, 0, 0, 0, 1, 1, 0, 0] },
      ],
    },
    behindTheCurtain:
      'O clímax dramático do Lado A desce uma quarta justa para Ré Sustenido Menor (D#m / Ebm), a tonalidade mais densa do disco. A progressão D#m7 → B7M → G#m7 → A#7(b9) funciona como uma engrenagem que gira sem sair do lugar. Após o último acorde seco de D#m7, os 3.5 segundos de silêncio absoluto não são apenas uma pausa técnica: fazem o ouvinte sentir o peso do quarto antes de levantar para virar o disco.',
    chordsUsed: ['D#m7', 'B7M', 'G#m7', 'A#7(b9)', 'C#7(9)'],
    chordSheet: `[Intro — Pulso do Relógio] D#m7  B7M  G#m7  A#7(b9)

[Primeira Parte]
D#m7                              B7M
O relógio na parede bate como um martelo
G#m7                              A#7(b9)
Nesse quarto frio o silêncio é meu castelo
D#m7                              B7M
Tudo que eu toco parece que se desfaz
G#m7                              A#7(b9)
Minha mãe se foi e o meu pai já não faz paz
D#m7                              B7M
Agora você deitada tão perto de mim
G#m7                              A#7(b9)
Mas o teu olhar tá longe num abismo sem fim
B7M                               G#m7
Teu corpo tá aqui mas tua alma evaporou
A#7(b9)                           D#m7
E o vazio que eu tanto temia me alcançou

[Refrão]
D#m7                              B7M
(Essa solidão!) que me puxa pro fundo!
G#m7                              A#7(b9)
(Tudo que eu amo!) eu destruo no mundo!
D#m7                              B7M
A minha esposa partiu sem sair do lugar!
G#m7              A#7(b9)         D#m7
E esse vazio maldito veio me devorar!

[Final — Desacelerando no Escuro]
D#m7                        B7M
E assim eu sigo... no escuro do meu ser...
G#m7                        A#7(b9)
Cansado de lutar e cansado de sofrer...
B7M                         G#m7
A solidão venceu... não há mais o que falar...
A#7(b9)                     D#m7
Só resta esse vazio... pra me devorar.
[3.5 SEGUNDOS DE SILÊNCIO DRAMÁTICO — FIM DO LADO A]`,
  },

  '06': {
    key: 'C#m / E Maior',
    capoHint: 'Capo na 4ª casa (tocar em Am / C) — sonoridade doce de violão acústico',
    easyTransposeSemitones: -4,
    timeSignature: '2/4 (Samba Acústico / MPB)',
    feel: 'Toque macio de dedos no violão de nylon (75 BPM), abrindo claridade harmônica na virada para o Lado B.',
    groovePattern: {
      label: 'Dedilhado Samba Acústico (2/4 — 75 BPM)',
      subdivisions: ['1', 'e', '&', 'a', '2', 'e', '&', 'a'],
      voices: [
        { name: 'Violão (Dedos)', hits: [1, 0, 1, 1, 0, 1, 1, 0] },
        { name: 'Baixo Cantabile', hits: [1, 0, 0, 0, 1, 0, 0, 1] },
      ],
    },
    behindTheCurtain:
      'Quando a agulha pousa no Lado B, o violão começa em C#m7 ("A solidão que eu carreguei na bagagem"), mas já no terceiro compasso prepara o B7(9) para desaguar num luminoso Mi Maior com Sétima Maior (E7M) quando entram os filhos na letra. É a primeira vez no LP em que o refrão repousa estavelmente num acorde Maior (A7M → B7(9) → E7M), representando o abrigo encontrado no olhar.',
    chordsUsed: ['C#m7', 'F#m7', 'B7(9)', 'E7M', 'A7M', 'G#7(b13)'],
    chordSheet: `[Intro — Agulha no Sulco do Lado B] C#m7  F#m7  B7(9)  E7M  G#7(b13)

[Primeira Parte]
C#m7                        F#m7
A solidão que eu carreguei na bagagem
B7(9)                       E7M
Hoje descansa ao ver vocês crescerem
A7M                         F#m7
O tempo corre e muda a paisagem
G#7(b13)                    C#m7   B7(9)
Mas o amor não deixa a esperança morrer

[Refrão — Abertura em Mi Maior]
E7M                         A7M
E se o futuro for sopro e incerteza
F#m7                        B7(9)
Eu faço abrigo na força do olhar
E7M                         A7M
Meus filhos são a cura da tristeza
F#m7            G#7(b13)    C#m7
O porto seguro onde eu vou ancorar

[Segunda Parte]
C#m7                        F#m7
Tropeço e erro tentando ser ponte
B7(9)                       E7M
O medo às vezes me rouba a canção
A7M                         F#m7
Mas vejo o sol que renasce no horizonte
G#7(b13)                    C#m7   B7(9)
E encontro a paz no bater do coração

[Coda]
A7M                         E7M
Meus filhos... o meu melhor amanhã
F#m7            B7(9)       E7M
A cura que a vida me deu`,
  },

  '07': {
    key: 'E Maior / C#m',
    capoHint: 'Tocar na posição original (E7M / C#m7) com corda Mi solta ressoando',
    easyTransposeSemitones: 0,
    timeSignature: '4/4 (Samba-Rock Soul Solar)',
    feel: 'Balanço aberto em 100 BPM com metais quentes, baixo soul caminhando pelas terças e sextas.',
    groovePattern: {
      label: 'Samba-Rock Soul Solar (4/4 — 100 BPM)',
      subdivisions: ['1', '&', '2', '&', '3', '&', '4', '&'],
      voices: [
        { name: 'Metais / Violão', hits: [1, 0, 0, 1, 0, 1, 0, 0] },
        { name: 'Caixa / Pandeiro', hits: [0, 1, 1, 0, 0, 1, 1, 0] },
        { name: 'Baixo Soul', hits: [1, 0, 0, 1, 1, 0, 1, 0] },
      ],
    },
    behindTheCurtain:
      'A faixa mais solar do disco assume de vez a tonalidade de Mi Maior (E7M) em diálogo com C#m7. A progressão E7M → C#m7 → F#m7 → B7(13) traz a tradição do Samba-Soul carioca (Banda Black Rio, Cassiano). O acorde B7(13) com décima-terceira no topo cria aquele "sorriso harmônico" que sustenta o refrão ("Luz do meu dia, cura essa dor").',
    chordsUsed: ['E7M', 'C#m7', 'F#m7', 'B7(13)', 'A7M', 'G#7(b13)'],
    chordSheet: `[Intro — Falada sobre o Groove]
E7M  C#m7  F#m7  B7(13)
"Nesse balanço eu sigo cultivando o amanhã.
Olha esses sorrisos bicho, é onde mora a minha cura."

[Primeira Parte]
E7M                         C#m7
O sol bate na vidraça da sala
F#m7                        B7(13)
Varrendo a poeira de tanto esperar
E7M                         C#m7
Passos pequenos que quebram o silêncio
F#m7                        B7(13)
Trazendo o barulho que me faz cansar
A7M                         G#m7   C#m7
Cultivo esse afeto no peito todo dia
F#m7                        B7(13)
Mesmo sabendo que a dor não vai sarar

[Pré-Refrão]
C#m7                        F#m7
Tem tropeço no caminho eu sei bem
B7(13)                      E7M
O medo do amanhã às vezes me consome
A7M                         F#m7
Mas quando o abraço me aperta no fim
G#7(b13)                    B7(13)
A solidão recua e até esquece o nome

[Refrão]
E7M                         C#m7
Luz do meu dia cura essa dor
F#m7                        B7(13)
Sopro de esperança no meu caminhar
E7M                         C#m7
Eles são o rumo o meu novo calor
F#m7            B7(13)      E7M
A única ponte que não vai quebrar`,
  },

  '08': {
    key: 'Bbm / Db Maior',
    capoHint: 'Capo na 1ª casa (tocar em Am / C) — ótimo para puxar na roda de violão',
    easyTransposeSemitones: -1,
    timeSignature: '4/4 (Samba-Rock-Groove-Batuqueira)',
    feel: 'Cozinha percussiva pesada em 102 BPM; coro coletivo respondendo junto com os metais.',
    groovePattern: {
      label: 'Batuqueira de Cozinha (4/4 — 102 BPM)',
      subdivisions: ['1', '&', '2', '&', '3', '&', '4', '&'],
      voices: [
        { name: 'Repique / Palmas', hits: [1, 0, 1, 1, 0, 1, 1, 0] },
        { name: 'Violão Percussivo', hits: [1, 1, 0, 1, 0, 1, 1, 0] },
        { name: 'Surdo / Baixo', hits: [1, 0, 0, 1, 1, 0, 0, 1] },
      ],
    },
    behindTheCurtain:
      'O tom de Si Bemol Menor (Bbm7) com abertura para Ré Bemol Maior (Db7M) favorece os instrumentos de sopro (sax tenor e trompete). A harmonia usa o giro clássico Bbm7 → Ebm7 → Ab7(13) → Db7M → F7(#9): quando entra o refrão ("O Coletivo abrandava o meu monstro!"), o baixo sobe para o Db7M enquanto o F7(#9) prepara a volta com força de roda de samba universitária.',
    chordsUsed: ['Bbm7', 'Ebm7', 'Ab7(13)', 'Db7M', 'F7(#9)', 'Cm7(b5)'],
    chordSheet: `[Intro — Cozinha Pesada] Bbm7  Ebm7  Ab7(13)  Db7M  F7(#9)

[Primeira Parte]
Bbm7                        Ebm7
Vivi a autonomia que o mundo me deu
Ab7(13)                     Db7M
Fora de casa o destino se ergueu
Cm7(b5)                     F7(#9)
Cuidando da vida sem ter onde fiar
Bbm7                        F7(#9)
Mas nunca sozinho pra me amedrontar
Bbm7                        Ebm7
O alojamento era o nosso altar
Ab7(13)                     Db7M
Gente de todo e qualquer lugar
Cm7(b5)                     F7(#9)
Dividindo o pão a canção e a dor
Bbm7                        F7(#9)
Um caos perfeito que me deu calor

[Refrão — Coro Coletivo]
Bbm7                        Ebm7
O Coletivo abrandava o meu monstro!
Ab7(13)                     Db7M
A solidão não tinha onde sentar!
Cm7(b5)                     F7(#9)
Eu merecia sim esse encontro!
Bbm7                        F7(#9)
Nesse abraço eu pude descansar!
Bbm7                        Ebm7
O Coletivo me deu o futuro!
F7(#9)                      Bbm7
A chama acesa no meio do escuro!

[Segunda Parte]
Bbm7                        Ebm7
Mas a realidade é rainha e senhora
Ab7(13)                     Db7M
O tempo do abrigo me botou pra fora
Cm7(b5)                     F7(#9)
E o hiper-isolamento me pôs no porão
Bbm7                        F7(#9)
Acorrentado nessa solidão
Ebm7                        Bbm7
De volta ao monstro que me quer tragar
Cm7(b5)                     F7(#9)
Tentando as pontes que construí quebrar
Ebm7                        Bbm7
Mas eu me lembro do que a gente quis
Cm7(b5)         F7(#9)      Bbm7
Daquele propósito que me fez feliz`,
  },

  '09': {
    key: 'G#m / E7M (Câmara)',
    capoHint: 'Capo na 4ª casa (Em / C7M) ou transpor +1 semitom (Am / F7M)',
    easyTransposeSemitones: 1,
    timeSignature: '4/4 (Samba-Canção de Câmara — 65 BPM)',
    feel: 'Andamento de marcha lenta e firme na madrugada; piano, violoncelo em nota pedal e violão de nylon.',
    groovePattern: {
      label: 'Passo de Sentinela (4/4 Câmara — 65 BPM)',
      subdivisions: ['1', '&', '2', '&', '3', '&', '4', '&'],
      voices: [
        { name: 'Piano / Violão', hits: [1, 0, 0, 1, 0, 0, 1, 0] },
        { name: 'Violoncelo (Arco)', hits: [1, 0, 0, 0, 1, 0, 0, 0] },
      ],
    },
    behindTheCurtain:
      'Para encerrar o LP, a música retorna ao território de G#m / C#m da Faixa 01, fechando o arco cíclico do álbum. Porém, em vez de resolver no desespero do acorde menor fechado, a progressão final caminha por acordes com sétima maior e nona (E7M → A7M → F#m7 → G#m7), terminando num acorde suspenso e sereno. O túnel não apaga a estrada, mas deixa a porta aberta.',
    chordsUsed: ['G#m7', 'E7M', 'C#m7', 'A7M', 'F#m7', 'D#7(b9)', 'B7M'],
    chordSheet: `[Intro — Violoncelo & Piano] G#m7  E7M  C#m7  D#7(b9)

[Primeira Parte]
G#m7                              E7M
A tumba é o fim que o medo desenhou
C#m7                              D#7(b9)
O túnel é o caminho que a gente ainda não completou
G#m7                              E7M
Olho pra trás e vejo o rebelde cansado
C#m7                              F#7(13)
Que buscava no abismo um lugar pra ser olhado
B7M                               E7M
Hoje o prumo é outro, a marcha é mais lenta
C#m7              D#7(b9)         G#m7
A dor que era incêndio hoje é só essa cinza lenta

[Refrão]
            E7M                   B7M
Isso é um túnel, não é minha tumba
            C#m7                  G#m7
A luz lá na frente não me faz perguntas
            E7M                   B7M
Eu sigo caminhando, o passo é firme e lento
            C#m7                  D#7(b9)
Carregando o amor que sopra contra o vento
            E7M                   C#m7
Isso é um túnel, estou de passagem
            D#7(b9)               G#m7
A travessia é a minha coragem

[Segunda Parte]
G#m7                              E7M
A esposa dorme, a mente num lugar distante
C#m7                              D#7(b9)
Eu fico de guarda, sentinela nesse instante
G#m7                              E7M
Não sou mais o estranho, não sou mais o outsider
C#m7                              F#7(13)
A vida é o agora, o resto é só o slider
B7M                               E7M
De um filme que eu não dirijo, mas escrevo o final
C#m7              D#7(b9)         G#m7
Aprendendo que o afeto é o meu único porto real

[Coda — Guarda Firme]
E7M                               B7M
Não tem mais máscara, não tem mais esconderijo
C#m7                              G#m7
Apenas o homem que encara o próprio sortilégio
E7M                               C#m7
Com os pés no chão, o coração no que importa
D#7(b9)                           E7M
Deixando o escuro pra trás, abrindo a porta
C#m7              D#7(b9)         B7M    E7M
A tumba ficou pra trás... O túnel eu atravessei...
G#m7 (deixar soar)
Estou aqui. Continuo aqui.`,
  },
};
