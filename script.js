/* =====================================================================
   ARCANE CHESS 7x7
   Scacchi tattici guidati da un mazzo di carte.
   Modalita': vs Bot (locale) | Online 1v1 P2P (WebRTC/PeerJS, codice partita)
   ===================================================================== */

/* ============================== i18n ============================== */
const i18n = {
    it: {
        tagline: "Scacchi tattici guidati dalle carte · 7x7",
        common: { back: "Indietro", copy: "Copia", copied: "Codice copiato!", vs: "vs" },
        home: {
            nickLabel: "Il tuo nickname",
            nickPh: "Es. Magnus",
            playBot: "Gioca contro il Bot",
            playBotSub: "Partita rapida in locale",
            create: "Crea partita online",
            createSub: "Ottieni un codice da condividere",
            join: "Entra con un codice",
            joinSub: "Sfida un amico",
            rules: "Regole e carte",
            needNick: "Scrivi prima un nickname!"
        },
        lobby: {
            title: "Partita creata",
            sub: "Condividi questo codice con il tuo amico. La partita parte appena si collega.",
            copy: "Copia il codice",
            waiting: "In attesa dell'avversario...",
            connecting: "Creazione stanza in corso...",
            joined: "Avversario collegato!"
        },
        join: {
            title: "Entra in partita",
            sub: "Inserisci il codice che ti ha dato il tuo amico.",
            action: "Entra nella partita",
            connecting: "Connessione in corso...",
            badCode: "Inserisci un codice valido.",
            notFound: "Nessuna partita trovata con questo codice.",
            failed: "Connessione fallita. Riprova."
        },
        net: {
            unavailable: "Modalita' online non disponibile: libreria di rete non caricata (serve una connessione a Internet). Puoi comunque giocare contro il Bot.",
            note: "Il gioco funziona anche offline contro il Bot. La modalita' online usa una connessione diretta tra i due browser.",
            error: "Errore di rete. Torno alla home.",
            oppLeft: "L'avversario ha lasciato la partita.",
            youLeft: "Hai lasciato la partita."
        },
        game: {
            you: "Tu", bot: "Bot", opponent: "Avversario",
            white: "Bianco", black: "Nero",
            deck: "Mazzo", hand: "Mano", discard: "Scarti",
            actions: "Azioni disponibili",
            endTurn: "Termina turno",
            yourHand: "La tua mano",
            log: "Cronologia",
            leave: "Abbandona",
            yourTurn: "E' il tuo turno",
            oppTurn: "Turno dell'avversario",
            thinking: "Sta pensando...",
            waiting: "In attesa",
            playing: "Sta giocando",
            hintPickCard: "Scegli una carta per iniziare l'azione.",
            hintPickPiece: "Ora scegli una pedina evidenziata.",
            hintPickTarget: "Scegli la casella di destinazione.",
            hintNotYourTurn: "Aspetta il tuo turno.",
            hintNoAp: "Azioni finite: termina il turno.",
            gameOver: "Partita finita"
        },
        msg: {
            gameStarted: "Partita iniziata!",
            selectCard: "Seleziona prima una carta.",
            invalidMove: "Mossa non valida.",
            notYourTurn: "Non e' il tuo turno.",
            noAp: "Non hai piu' azioni: termina il turno.",
            shuffled: "Mazzo rimescolato dagli scarti.",
            botPass: "L'avversario passa il turno.",
            trapSprung: "Trappola scattata! Pescata 1 carta.",
            trapSet: "Trappola piazzata su {p}.",
            resurrect: "Il Re resuscita un soldato caduto!",
            capture: "{a} cattura {b}!",
            promoted: "Pedone promosso a Regina!",
            transformed: "{a} si trasforma in {b}!",
            drew: "Pesca extra: +1 carta (azione gratuita).",
            extra: "Azione extra: +1 punto azione!",
            cannotUpgrade: "Questa pedina non puo' trasformarsi cosi'.",
            kingNoTransform: "Il Re non puo' trasformarsi.",
            endTurn: "Fine turno."
        },
        result: {
            win: "Vittoria!", lose: "Sconfitta", winSub: "Hai catturato il Re nemico.",
            loseSub: "Il tuo Re e' caduto.", rematch: "Rivincita", home: "Torna alla home",
            oppLeftTitle: "Avversario uscito", oppLeftSub: "Il tuo avversario ha lasciato la partita."
        },
        rules: {
            title: "Regole e carte",
            howto: "Come si gioca",
            h1: "Ogni turno hai 1 azione: scegli una carta, poi una pedina, poi la mossa.",
            h2: "Le carte gratuite (Pesca / Azione Extra) non consumano l'azione.",
            h3: "A fine turno tieni al massimo 3 carte in mano e ne peschi 1.",
            h4: "Vinci catturando il Re avversario.",
            transform: "Trasformazioni",
            t1: "Scala di potenza: Pedone -> Cavallo -> Torre -> Alfiere -> Regina.",
            t2: "Una pedina gia' trasformata puo' evolvere ancora, ma solo verso un grado piu' alto.",
            t3: "Il Re e' l'unica pedina che non puo' mai trasformarsi.",
            t4: "Un pedone che raggiunge l'ultima traversa diventa Regina, come negli scacchi veri.",
            cardsTitle: "Le carte"
        },
        cards: {
            mov: { n: "Movimento", d: "Muovi una pedina secondo il suo schema." },
            atk: { n: "Attacco", d: "Cattura una pedina nemica." },
            mov_atk: { n: "Mossa & Attacco", d: "Muovi oppure cattura." },
            omni: { n: "Muovi, Trasforma e Mangia", d: "Muovi o cattura, poi la pedina sale di grado." },
            sp_tower: { n: "Evoca Torre", d: "Ferma da 3 turni? Diventa Torre." },
            sp_queen: { n: "Evoca Regina", d: "Con 3 uccisioni? Diventa Regina." },
            sp_bishop: { n: "Evoca Alfiere", d: "Muovi in diagonale e diventa Alfiere." },
            sp_knight: { n: "Evoca Cavallo", d: "Muovi a L e diventa Cavallo." },
            sp_extra: { n: "Azione Extra", d: "+1 azione questo turno. Non consuma l'azione." },
            sp_draw: { n: "Pesca una carta", d: "Peschi subito 1 carta e puoi usarla. Non consuma l'azione." },
            sp_trap: { n: "Trappola", d: "Se la pedina muore, peschi 1 carta." }
        },
        pieces: { P: "Pedone", R: "Torre", N: "Cavallo", B: "Alfiere", Q: "Regina", K: "Re" }
    },

    en: {
        tagline: "Card-driven tactical chess · 7x7",
        common: { back: "Back", copy: "Copy", copied: "Code copied!", vs: "vs" },
        home: {
            nickLabel: "Your nickname",
            nickPh: "E.g. Magnus",
            playBot: "Play against the Bot",
            playBotSub: "Quick local match",
            create: "Create online game",
            createSub: "Get a code to share",
            join: "Join with a code",
            joinSub: "Challenge a friend",
            rules: "Rules & cards",
            needNick: "Type a nickname first!"
        },
        lobby: {
            title: "Game created",
            sub: "Share this code with your friend. The match starts as soon as they join.",
            copy: "Copy the code",
            waiting: "Waiting for opponent...",
            connecting: "Creating room...",
            joined: "Opponent connected!"
        },
        join: {
            title: "Join a game",
            sub: "Enter the code your friend gave you.",
            action: "Join the game",
            connecting: "Connecting...",
            badCode: "Enter a valid code.",
            notFound: "No game found with this code.",
            failed: "Connection failed. Try again."
        },
        net: {
            unavailable: "Online mode unavailable: networking library not loaded (an internet connection is required). You can still play against the Bot.",
            note: "The game works offline against the Bot. Online mode uses a direct browser-to-browser connection.",
            error: "Network error. Returning home.",
            oppLeft: "Your opponent left the game.",
            youLeft: "You left the game."
        },
        game: {
            you: "You", bot: "Bot", opponent: "Opponent",
            white: "White", black: "Black",
            deck: "Deck", hand: "Hand", discard: "Discard",
            actions: "Available actions",
            endTurn: "End turn",
            yourHand: "Your hand",
            log: "History",
            leave: "Leave",
            yourTurn: "It's your turn",
            oppTurn: "Opponent's turn",
            thinking: "Thinking...",
            waiting: "Waiting",
            playing: "Playing",
            hintPickCard: "Pick a card to start your action.",
            hintPickPiece: "Now pick a highlighted piece.",
            hintPickTarget: "Pick the destination square.",
            hintNotYourTurn: "Wait for your turn.",
            hintNoAp: "No actions left: end your turn.",
            gameOver: "Game over"
        },
        msg: {
            gameStarted: "Game started!",
            selectCard: "Select a card first.",
            invalidMove: "Invalid move.",
            notYourTurn: "It's not your turn.",
            noAp: "No actions left: end your turn.",
            shuffled: "Deck reshuffled from discard.",
            botPass: "Opponent skips the turn.",
            trapSprung: "Trap sprung! Drew 1 card.",
            trapSet: "Trap placed on {p}.",
            resurrect: "The King resurrects a fallen soldier!",
            capture: "{a} captures {b}!",
            promoted: "Pawn promoted to Queen!",
            transformed: "{a} transforms into {b}!",
            drew: "Extra draw: +1 card (free action).",
            extra: "Extra action: +1 action point!",
            cannotUpgrade: "This piece cannot transform that way.",
            kingNoTransform: "The King cannot transform.",
            endTurn: "Turn ended."
        },
        result: {
            win: "Victory!", lose: "Defeat", winSub: "You captured the enemy King.",
            loseSub: "Your King has fallen.", rematch: "Rematch", home: "Back home",
            oppLeftTitle: "Opponent left", oppLeftSub: "Your opponent left the game."
        },
        rules: {
            title: "Rules & cards",
            howto: "How to play",
            h1: "Each turn you get 1 action: pick a card, then a piece, then the move.",
            h2: "Free cards (Draw / Extra Action) do not consume your action.",
            h3: "At the end of a turn you keep at most 3 cards and draw 1.",
            h4: "You win by capturing the enemy King.",
            transform: "Transformations",
            t1: "Power ladder: Pawn -> Knight -> Rook -> Bishop -> Queen.",
            t2: "An already transformed piece can evolve again, but only to a higher rank.",
            t3: "The King is the only piece that can never transform.",
            t4: "A pawn reaching the far rank becomes a Queen, just like in real chess.",
            cardsTitle: "The cards"
        },
        cards: {
            mov: { n: "Movement", d: "Move a piece along its pattern." },
            atk: { n: "Attack", d: "Capture an enemy piece." },
            mov_atk: { n: "Move & Attack", d: "Move or capture." },
            omni: { n: "Move, Transform & Eat", d: "Move or capture, then the piece ranks up." },
            sp_tower: { n: "Summon Rook", d: "Still for 3 turns? Becomes a Rook." },
            sp_queen: { n: "Summon Queen", d: "With 3 kills? Becomes a Queen." },
            sp_bishop: { n: "Summon Bishop", d: "Move diagonally and become a Bishop." },
            sp_knight: { n: "Summon Knight", d: "Move in an L and become a Knight." },
            sp_extra: { n: "Extra Action", d: "+1 action this turn. Does not use your action." },
            sp_draw: { n: "Draw a card", d: "Draw 1 card now and play it. Does not use your action." },
            sp_trap: { n: "Trap", d: "If this piece dies, you draw 1 card." }
        },
        pieces: { P: "Pawn", R: "Rook", N: "Knight", B: "Bishop", Q: "Queen", K: "King" }
    }
};

let lang = localStorage.getItem('ac_lang') || 'it';

function t(path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : null, i18n[lang]) || path;
}
function fmt(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined) ? vars[k] : '');
}

/* ============================== COSTANTI ============================== */
const BOARD_SIZE = 7;
const HAND_LIMIT = 3;
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

/* Glifi "pieni" per entrambi i colori: resi bianchi/neri via CSS (come sui siti veri) */
const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };

/* Scala di potenza per le trasformazioni: si sale solo verso l'alto. Il Re e' escluso. */
const UPGRADE_LADDER = ['P', 'N', 'R', 'B', 'Q'];
const RANK_OF = { P: 0, N: 1, R: 2, B: 3, Q: 4 };

const FREE_CARDS = ['sp_draw', 'sp_extra'];          /* non consumano l'azione */
const IN_PLACE_CARDS = ['sp_tower', 'sp_queen', 'sp_trap']; /* si lanciano su una tua pedina */

const TRAP_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="3.2" y="2.6" width="13.6" height="18.4" rx="2.4" fill="#f3f7fc" stroke="#0d1117" stroke-width="1.3"/>' +
    '<rect x="5.6" y="5" width="8.8" height="13.6" rx="1.2" fill="#3f6a9e" opacity=".45"/>' +
    '<path class="drop" d="M15.9 8.2c2.9 3.4 4.5 5.6 4.5 7.5a4.5 4.5 0 0 1-9 0c0-1.9 1.6-4.1 4.5-7.5z" fill="#d81f2a" stroke="#57080e" stroke-width="1.15"/>' +
    '<ellipse cx="14.2" cy="15.4" rx=".95" ry="1.5" fill="#ff9a9a" opacity=".75"/>' +
    '</svg>';

const CARD_META = {
    mov:       { kind: 'action', art: '<i class="fas fa-arrows-up-down-left-right"></i>' },
    atk:       { kind: 'action', art: '<i class="fas fa-crosshairs"></i>' },
    mov_atk:   { kind: 'action', art: '<i class="fas fa-bolt"></i>' },
    omni:      { kind: 'legend', art: '<i class="fas fa-wand-magic-sparkles"></i>' },
    sp_tower:  { kind: 'spell',  art: '<span class="glyph">♜</span>' },
    sp_queen:  { kind: 'spell',  art: '<span class="glyph">♛</span>' },
    sp_bishop: { kind: 'spell',  art: '<span class="glyph">♝</span>' },
    sp_knight: { kind: 'spell',  art: '<span class="glyph">♞</span>' },
    sp_extra:  { kind: 'spell',  art: '<i class="fas fa-hourglass-half"></i>' },
    sp_draw:   { kind: 'spell',  art: '<i class="fas fa-clone"></i>' },
    sp_trap:   { kind: 'spell',  art: TRAP_SVG }
};

const DECK_TEMPLATE = [
    { id: 'mov', copies: 3 },
    { id: 'atk', copies: 3 },
    { id: 'mov_atk', copies: 3 },
    { id: 'omni', copies: 1 },
    { id: 'sp_tower', copies: 1 },
    { id: 'sp_queen', copies: 1 },
    { id: 'sp_bishop', copies: 1 },
    { id: 'sp_knight', copies: 1 },
    { id: 'sp_extra', copies: 2 },
    { id: 'sp_draw', copies: 2 },
    { id: 'sp_trap', copies: 1 }
];

/* ============================== STATO ============================== */
let mode = 'bot';            /* 'bot' | 'host' | 'guest' */
let myColor = 'white';
let flipped = false;

let board = [];
let players = {
    white: { deck: [], hand: [], discard: [] },
    black: { deck: [], hand: [], discard: [] }
};
let turn = 'white';
let actionPoints = 1;
let maxActionPoints = 1;

let selectedCard = null;     /* indice nella mano */
let selectedCell = null;     /* {r,c} */
let lastMove = null;
let gameOver = false;
let winner = null;
let logs = [];
let names = { white: '', black: '' };
let counts = { myDeck: 0, myDiscard: 0, myHand: 0, oppDeck: 0, oppHand: 0 };
let botGuard = 0;

/* Rete */
let peer = null;
let conn = null;
let roomCode = null;

const $ = (id) => document.getElementById(id);
const opposite = (c) => c === 'white' ? 'black' : 'white';
const isMyTurn = () => turn === myColor && !gameOver;

/* ============================== TRADUZIONE UI ============================== */
function applyStaticI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
}

function setLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('ac_lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    applyStaticI18n();
    $('net-note').textContent = window.Peer ? t('net.note') : t('net.unavailable');
    if ($('screen-game').classList.contains('active')) renderAll();
}

/* ============================== SCHERMATE ============================== */
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
    window.scrollTo(0, 0);
}

function toast(text, kind) {
    const host = $('toast-host');
    const el = document.createElement('div');
    el.className = 'toast' + (kind ? ' ' + kind : '');
    el.textContent = text;
    host.appendChild(el);
    setTimeout(() => el.remove(), 2800);
}

function getNickname() {
    const v = $('nickname').value.trim();
    return v || null;
}

/* ============================== SETUP PARTITA ============================== */
function makeDeck() {
    const deck = [];
    DECK_TEMPLATE.forEach(c => {
        for (let i = 0; i < c.copies; i++) {
            deck.push({ id: c.id, kind: CARD_META[c.id].kind, uid: Math.random().toString(36).slice(2, 11) });
        }
    });
    return shuffle(deck);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function newPiece(type, color) {
    return { type, color, kills: 0, turnsUnmoved: 0, hasTrap: false };
}

function setupBoard() {
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    board[0][3] = newPiece('K', 'black');
    board[1][2] = newPiece('P', 'black');
    board[1][3] = newPiece('P', 'black');
    board[1][4] = newPiece('P', 'black');
    board[6][3] = newPiece('K', 'white');
    board[5][2] = newPiece('P', 'white');
    board[5][3] = newPiece('P', 'white');
    board[5][4] = newPiece('P', 'white');
}

/* Avvia una nuova partita. In 'guest' lo stato arriva dall'host. */
function startGame(newMode, myName, oppName) {
    mode = newMode;
    myColor = (mode === 'guest') ? 'black' : 'white';
    flipped = (myColor === 'black');

    names.white = (mode === 'guest') ? oppName : myName;
    names.black = (mode === 'guest') ? myName : oppName;

    if (mode !== 'guest') {
        setupBoard();
        players.white = { deck: makeDeck(), hand: [], discard: [] };
        players.black = { deck: makeDeck(), hand: [], discard: [] };
        drawCards('white', HAND_LIMIT);
        drawCards('black', HAND_LIMIT);
        turn = 'white';
        actionPoints = 1;
        maxActionPoints = 1;
        logs = [];
        lastMove = null;
        gameOver = false;
        winner = null;
        botGuard = 0;
    }

    selectedCard = null;
    selectedCell = null;
    closeModal('modal-result');
    showScreen('screen-game');

    $('room-tag').hidden = !roomCode;
    if (roomCode) $('room-code').textContent = roomCode;

    if (mode !== 'guest') {
        log(t('msg.gameStarted'), 'good');
        renderAll();
    }
}

function drawCards(color, amount) {
    for (let i = 0; i < amount; i++) {
        const p = players[color];
        if (p.deck.length === 0) {
            if (p.discard.length === 0) break;
            p.deck = shuffle(p.discard);
            p.discard = [];
            log(t('msg.shuffled'));
        }
        if (p.deck.length > 0) p.hand.push(p.deck.pop());
    }
}

/* ============================== REGOLE ============================== */
function canUpgradeTo(piece, toType) {
    if (!piece) return false;
    if (piece.type === 'K') return false;                 /* il Re non si trasforma mai */
    if (RANK_OF[toType] === undefined) return false;
    if (RANK_OF[piece.type] === undefined) return false;
    return RANK_OF[toType] > RANK_OF[piece.type];         /* solo verso un grado piu' alto */
}

function nextRank(piece) {
    if (!piece || piece.type === 'K') return null;
    const i = UPGRADE_LADDER.indexOf(piece.type);
    if (i < 0 || i >= UPGRADE_LADDER.length - 1) return null;
    return UPGRADE_LADDER[i + 1];
}

function promotionRow(color) { return color === 'white' ? 0 : BOARD_SIZE - 1; }

/* Bersaglio valido per le carte che si lanciano sulla propria pedina */
function canCastOn(piece, cardId) {
    if (!piece) return false;
    switch (cardId) {
        case 'sp_trap': return !piece.hasTrap;
        case 'sp_tower': return canUpgradeTo(piece, 'R') && piece.turnsUnmoved >= 3;
        case 'sp_queen': return canUpgradeTo(piece, 'Q') && piece.kills >= 3;
        default: return false;
    }
}

function isValidMove(piece, sr, sc, dr, dc, cardId, target) {
    if (!piece) return false;
    const sameSquare = (sr === dr && sc === dc);

    /* Carte lanciate sulla propria pedina (nessuno spostamento) */
    if (IN_PLACE_CARDS.indexOf(cardId) !== -1) return sameSquare && canCastOn(piece, cardId);
    if (sameSquare) return false;
    if (target && target.color === piece.color) return false;

    const dRow = dr - sr;
    const dCol = Math.abs(dc - sc);
    const fwd = piece.color === 'white' ? -1 : 1;

    /* Muovi + trasforma */
    if (cardId === 'sp_bishop') {
        return !target && canUpgradeTo(piece, 'B') && Math.abs(dRow) === 1 && dCol === 1;
    }
    if (cardId === 'sp_knight') {
        return !target && canUpgradeTo(piece, 'N') &&
            ((Math.abs(dRow) === 2 && dCol === 1) || (Math.abs(dRow) === 1 && dCol === 2));
    }

    const isAttack = !!target;
    if (cardId === 'mov' && isAttack) return false;
    if (cardId === 'atk' && !isAttack) return false;
    if (['mov', 'atk', 'mov_atk', 'omni'].indexOf(cardId) === -1) return false;

    switch (piece.type) {
        case 'P': return (!isAttack && dCol === 0 && dRow === fwd) || (isAttack && dCol === 1 && dRow === fwd);
        case 'R': return (dRow === 0 || dCol === 0) && clearPath(sr, sc, dr, dc);
        case 'B': return (Math.abs(dRow) === dCol) && clearPath(sr, sc, dr, dc);
        case 'Q': return (dRow === 0 || dCol === 0 || Math.abs(dRow) === dCol) && clearPath(sr, sc, dr, dc);
        case 'N': return (Math.abs(dRow) === 2 && dCol === 1) || (Math.abs(dRow) === 1 && dCol === 2);
        case 'K': return Math.abs(dRow) <= 1 && dCol <= 1;
    }
    return false;
}

function clearPath(sr, sc, dr, dc) {
    const rStep = Math.sign(dr - sr), cStep = Math.sign(dc - sc);
    let r = sr + rStep, c = sc + cStep;
    while (r !== dr || c !== dc) {
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;
        if (board[r][c] !== null) return false;
        r += rStep; c += cStep;
    }
    return true;
}

function countPieces(color) {
    let n = 0;
    board.forEach(row => row.forEach(cell => { if (cell && cell.color === color) n++; }));
    return n;
}

function pieceName(type) { return t('pieces.' + type); }

/* ============================== ESECUZIONE MOSSE ============================== */
function executeMove(sr, sc, dr, dc, card, color) {
    const piece = board[sr][sc];
    if (!piece) return;
    const target = board[dr][dc];
    const sameSquare = (sr === dr && sc === dc);
    let kingCaptured = false;

    /* --- Cattura --- */
    if (target && !sameSquare) {
        piece.kills += 1;
        log(fmt(t('msg.capture'), { a: pieceName(piece.type), b: pieceName(target.type) }), 'kill');
        if (target.hasTrap) {
            log(t('msg.trapSprung'), 'good');
            drawCards(target.color, 1);
        }
        if (target.type === 'K') kingCaptured = true;

        /* Passiva del Re: senza soldati, il Re rianima il pedone nemico caduto */
        if (!kingCaptured && piece.type === 'K' && countPieces(color) === 1 && target.type === 'P') {
            log(t('msg.resurrect'), 'magic');
            board[dr][dc] = newPiece('P', color);
            board[sr][sc] = null;
            lastMove = { sr, sc, dr, dc };
            finalizeAction(card, color, false);
            return;
        }
    }

    /* --- Carte lanciate sul posto --- */
    if (card.id === 'sp_trap') {
        piece.hasTrap = true;
        log(fmt(t('msg.trapSet'), { p: pieceName(piece.type) }), 'magic');
    } else if (card.id === 'sp_tower') {
        log(fmt(t('msg.transformed'), { a: pieceName(piece.type), b: pieceName('R') }), 'magic');
        piece.type = 'R';
    } else if (card.id === 'sp_queen') {
        log(fmt(t('msg.transformed'), { a: pieceName(piece.type), b: pieceName('Q') }), 'magic');
        piece.type = 'Q';
    }

    /* --- Spostamento --- */
    if (!sameSquare) {
        board[dr][dc] = piece;
        board[sr][sc] = null;
        piece.turnsUnmoved = 0;
        lastMove = { sr, sc, dr, dc };

        if (card.id === 'sp_bishop') {
            log(fmt(t('msg.transformed'), { a: pieceName(piece.type), b: pieceName('B') }), 'magic');
            piece.type = 'B';
        } else if (card.id === 'sp_knight') {
            log(fmt(t('msg.transformed'), { a: pieceName(piece.type), b: pieceName('N') }), 'magic');
            piece.type = 'N';
        }

        /* Promozione classica: il pedone tocca l'ultima traversa -> Regina */
        if (piece.type === 'P' && dr === promotionRow(color)) {
            piece.type = 'Q';
            log(t('msg.promoted'), 'magic');
        } else if (card.id === 'omni') {
            const up = nextRank(piece);
            if (up) {
                log(fmt(t('msg.transformed'), { a: pieceName(piece.type), b: pieceName(up) }), 'magic');
                piece.type = up;
            }
        }
    }

    if (kingCaptured) {
        discardCard(card, color);
        selectedCard = null; selectedCell = null;
        finishGame(color);
        return;
    }
    finalizeAction(card, color, false);
}

function playInstantSpell(card, color) {
    if (card.id === 'sp_draw') {
        drawCards(color, 1);
        log(t('msg.drew'), 'good');
    } else if (card.id === 'sp_extra') {
        actionPoints += 1;
        maxActionPoints += 1;
        log(t('msg.extra'), 'good');
    }
    finalizeAction(card, color, true);   /* gratuita: non consuma l'azione */
}

function discardCard(card, color) {
    const p = players[color];
    const i = p.hand.findIndex(c => c.uid === card.uid);
    if (i > -1) p.discard.push(p.hand.splice(i, 1)[0]);
}

function finalizeAction(card, color, free) {
    discardCard(card, color);
    selectedCard = null;
    selectedCell = null;
    if (!free) actionPoints = Math.max(0, actionPoints - 1);
    renderAll();
    if (!free && !gameOver && actionPoints <= 0 && turn === color) {
        setTimeout(() => { if (!gameOver && turn === color && actionPoints <= 0) endTurn(); }, 260);
    }
}

function endTurn() {
    if (gameOver) return;
    board.forEach(row => row.forEach(cell => { if (cell && cell.color === turn) cell.turnsUnmoved += 1; }));
    while (players[turn].hand.length > HAND_LIMIT) {
        players[turn].discard.push(players[turn].hand.pop());
    }

    turn = opposite(turn);
    actionPoints = 1;
    maxActionPoints = 1;
    botGuard = 0;
    selectedCard = null;
    selectedCell = null;
    drawCards(turn, 1);
    renderAll();

    if (mode === 'bot' && turn === 'black') setTimeout(playBotTurn, 750);
}

function finishGame(winnerColor) {
    gameOver = true;
    winner = winnerColor;
    renderAll();
    showResult(winnerColor);
}

/* ============================== AZIONI DEL GIOCATORE ============================== */
/* In 'guest' non muto lo stato: mando l'intenzione all'host che valida e risincronizza. */
function send(msg) { if (conn && conn.open) conn.send(msg); }

function requestMove(sr, sc, dr, dc, card) {
    if (mode === 'guest') {
        send({ t: 'act', kind: 'move', uid: card.uid, sr, sc, dr, dc });
        selectedCard = null; selectedCell = null; renderAll();
    } else {
        executeMove(sr, sc, dr, dc, card, myColor);
    }
}

function requestInstant(card) {
    if (mode === 'guest') {
        send({ t: 'act', kind: 'instant', uid: card.uid });
        selectedCard = null; selectedCell = null; renderAll();
    } else {
        playInstantSpell(card, myColor);
    }
}

function requestEndTurn() {
    if (!isMyTurn()) return;
    if (mode === 'guest') {
        send({ t: 'act', kind: 'endturn' });
        selectedCard = null; selectedCell = null; renderAll();
    } else {
        log(t('msg.endTurn'));
        endTurn();
    }
}

function handleCardClick(index) {
    if (gameOver) return;
    if (!isMyTurn()) { toast(t('msg.notYourTurn'), 'warn'); return; }
    const card = players[myColor].hand[index];
    if (!card) return;

    /* Carte gratuite: effetto immediato, non consumano l'azione */
    if (FREE_CARDS.indexOf(card.id) !== -1) { requestInstant(card); return; }

    if (actionPoints <= 0) { toast(t('msg.noAp'), 'warn'); return; }

    selectedCard = (selectedCard === index) ? null : index;
    selectedCell = null;
    renderAll();
}

function handleCellClick(r, c) {
    if (gameOver) return;
    if (!isMyTurn()) { toast(t('msg.notYourTurn'), 'warn'); return; }

    const card = selectedCard !== null ? players[myColor].hand[selectedCard] : null;
    const clicked = board[r][c];

    if (!card) {
        if (clicked && clicked.color === myColor) toast(t('msg.selectCard'), 'warn');
        return;
    }

    /* Carte da lanciare su una propria pedina (trappola / evoluzioni sul posto) */
    if (IN_PLACE_CARDS.indexOf(card.id) !== -1) {
        if (!clicked || clicked.color !== myColor) { toast(t('msg.invalidMove'), 'warn'); return; }
        if (!canCastOn(clicked, card.id)) {
            toast(clicked.type === 'K' && card.id !== 'sp_trap' ? t('msg.kingNoTransform') : t('msg.cannotUpgrade'), 'warn');
            return;
        }
        requestMove(r, c, r, c, card);
        return;
    }

    /* Selezione della pedina */
    if (clicked && clicked.color === myColor) {
        selectedCell = (selectedCell && selectedCell.r === r && selectedCell.c === c) ? null : { r, c };
        renderAll();
        return;
    }

    /* Destinazione */
    if (selectedCell) {
        const src = board[selectedCell.r][selectedCell.c];
        if (src && isValidMove(src, selectedCell.r, selectedCell.c, r, c, card.id, clicked)) {
            requestMove(selectedCell.r, selectedCell.c, r, c, card);
        } else {
            toast(t('msg.invalidMove'), 'warn');
        }
    } else {
        toast(t('game.hintPickPiece'), 'warn');
    }
}

/* ============================== BOT ============================== */
function enumerateMoves(card, color) {
    const moves = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const p = board[r][c];
            if (!p || p.color !== color) continue;
            for (let tr = 0; tr < BOARD_SIZE; tr++) {
                for (let tc = 0; tc < BOARD_SIZE; tc++) {
                    if (isValidMove(p, r, c, tr, tc, card.id, board[tr][tc])) {
                        moves.push({ sr: r, sc: c, dr: tr, dc: tc, card });
                    }
                }
            }
        }
    }
    return moves;
}

function scoreMove(m) {
    const target = board[m.dr][m.dc];
    let s = Math.random();
    if (target && target.color !== board[m.sr][m.sc].color) {
        s += 10 + (target.type === 'K' ? 100 : RANK_OF[target.type] || 0);
    }
    if (['sp_bishop', 'sp_knight', 'sp_tower', 'sp_queen', 'omni'].indexOf(m.card.id) !== -1) s += 3;
    return s;
}

function playBotTurn() {
    if (mode !== 'bot' || turn !== 'black' || gameOver) return;

    botGuard += 1;
    if (botGuard > 14) { endTurn(); return; }

    const hand = players.black.hand;
    if (hand.length === 0) { log(t('msg.botPass')); endTurn(); return; }

    /* 1) Le carte gratuite si giocano sempre: sono guadagno secco */
    const freeCard = hand.find(c => FREE_CARDS.indexOf(c.id) !== -1);
    if (freeCard) {
        playInstantSpell(freeCard, 'black');
        if (turn === 'black' && !gameOver) setTimeout(playBotTurn, 550);
        return;
    }

    /* 2) Miglior mossa fra tutte le carte in mano */
    let best = null, bestScore = -Infinity;
    shuffle([...hand]).forEach(card => {
        enumerateMoves(card, 'black').forEach(m => {
            const s = scoreMove(m);
            if (s > bestScore) { bestScore = s; best = m; }
        });
    });

    if (!best) { log(t('msg.botPass')); endTurn(); return; }

    executeMove(best.sr, best.sc, best.dr, best.dc, best.card, 'black');
    if (turn === 'black' && actionPoints > 0 && !gameOver) setTimeout(playBotTurn, 700);
}

/* ============================== RENDER ============================== */
function refreshCounts() {
    if (mode === 'guest') return;             /* i conteggi arrivano dall'host */
    const opp = opposite(myColor);
    counts = {
        myDeck: players[myColor].deck.length,
        myDiscard: players[myColor].discard.length,
        myHand: players[myColor].hand.length,
        oppDeck: players[opp].deck.length,
        oppHand: players[opp].hand.length
    };
}

function renderAll() {
    refreshCounts();
    renderBoard();
    renderHand();
    renderHUD();
    renderLog();
    if (mode === 'host') syncToGuest();
}

function renderBoard() {
    const bd = $('board');
    bd.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const r = flipped ? BOARD_SIZE - 1 - i : i;
            const c = flipped ? BOARD_SIZE - 1 - j : j;

            const cell = document.createElement('div');
            cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light' : 'dark');
            cell.dataset.r = r;
            cell.dataset.c = c;

            if (j === 0) {
                const rk = document.createElement('span');
                rk.className = 'coord rank';
                rk.textContent = BOARD_SIZE - r;
                cell.appendChild(rk);
            }
            if (i === BOARD_SIZE - 1) {
                const fl = document.createElement('span');
                fl.className = 'coord file';
                fl.textContent = FILES[c];
                cell.appendChild(fl);
            }

            if (lastMove && ((lastMove.sr === r && lastMove.sc === c) || (lastMove.dr === r && lastMove.dc === c))) {
                cell.classList.add('last-move');
            }

            const piece = board[r] && board[r][c];
            if (piece) {
                const span = document.createElement('span');
                span.className = 'piece ' + piece.color;
                span.textContent = GLYPH[piece.type];
                cell.appendChild(span);
                if (piece.hasTrap) {
                    const marker = document.createElement('span');
                    marker.className = 'trap-marker';
                    marker.title = t('cards.sp_trap.d');
                    marker.innerHTML = TRAP_SVG;
                    cell.appendChild(marker);
                }
            }

            cell.addEventListener('click', () => handleCellClick(r, c));
            bd.appendChild(cell);
        }
    }
    applyHighlights();
}

function cellEl(r, c) { return document.querySelector(".cell[data-r='" + r + "'][data-c='" + c + "']"); }

function applyHighlights() {
    if (!isMyTurn() || selectedCard === null) return;
    const card = players[myColor].hand[selectedCard];
    if (!card) return;

    /* Carte da lanciare: evidenzio le mie pedine bersagliabili */
    if (IN_PLACE_CARDS.indexOf(card.id) !== -1) {
        for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) {
            const p = board[r][c];
            if (p && p.color === myColor && canCastOn(p, card.id)) {
                const el = cellEl(r, c); if (el) el.classList.add('hl-cast');
            }
        }
        return;
    }

    if (selectedCell) {
        const src = board[selectedCell.r][selectedCell.c];
        const selEl = cellEl(selectedCell.r, selectedCell.c);
        if (selEl) selEl.classList.add('selected');
        if (!src) return;
        for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) {
            const target = board[r][c];
            if (isValidMove(src, selectedCell.r, selectedCell.c, r, c, card.id, target)) {
                const el = cellEl(r, c);
                if (el) el.classList.add(target ? 'hl-capture' : 'hl-move');
            }
        }
        return;
    }

    /* Nessuna pedina scelta: evidenzio quelle che hanno almeno una mossa con questa carta */
    for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) {
        const p = board[r][c];
        if (!p || p.color !== myColor) continue;
        let can = false;
        for (let tr = 0; tr < BOARD_SIZE && !can; tr++) {
            for (let tc = 0; tc < BOARD_SIZE && !can; tc++) {
                if (isValidMove(p, r, c, tr, tc, card.id, board[tr][tc])) can = true;
            }
        }
        if (can) { const el = cellEl(r, c); if (el) el.classList.add('movable'); }
    }
}

function renderHand() {
    const handDiv = $('player-hand');
    handDiv.innerHTML = '';
    const hand = players[myColor].hand;

    if (!hand.length) {
        const empty = document.createElement('div');
        empty.className = 'empty-hand';
        empty.textContent = '—';
        handDiv.appendChild(empty);
        return;
    }

    hand.forEach((card, index) => {
        const meta = CARD_META[card.id] || { kind: 'action', art: '' };
        const text = t('cards.' + card.id);
        const free = FREE_CARDS.indexOf(card.id) !== -1;
        const el = document.createElement('div');
        el.className = 'game-card kind-' + meta.kind;
        if (selectedCard === index) el.classList.add('selected');
        if (!isMyTurn() || (!free && actionPoints <= 0)) el.classList.add('disabled');

        el.innerHTML =
            (free ? '<span class="card-badge free">FREE</span>' : (meta.kind === 'legend' ? '<span class="card-badge">EPIC</span>' : '')) +
            '<div class="card-art">' + meta.art + '</div>' +
            '<div class="card-name">' + text.n + '</div>' +
            '<div class="card-text">' + text.d + '</div>';

        el.addEventListener('click', () => handleCardClick(index));
        handDiv.appendChild(el);
    });
}

function renderHUD() {
    const opp = opposite(myColor);
    const myName = names[myColor] || t('game.you');
    const oppName = names[opp] || (mode === 'bot' ? t('game.bot') : t('game.opponent'));

    $('me-name').textContent = myName;
    $('opp-name').textContent = oppName;
    $('me-avatar').innerHTML = mode === 'bot' ? '<i class="fas fa-user"></i>' : escapeHtml(myName.charAt(0).toUpperCase());
    $('opp-avatar').innerHTML = mode === 'bot' ? '<i class="fas fa-robot"></i>' : escapeHtml(oppName.charAt(0).toUpperCase());

    $('me-side').textContent = t('game.' + myColor);
    $('me-side').className = 'side-chip ' + myColor;
    $('opp-side').textContent = t('game.' + opp);
    $('opp-side').className = 'side-chip ' + opp;

    $('me-deck').textContent = counts.myDeck;
    $('me-discard').textContent = counts.myDiscard;
    $('opp-deck').textContent = counts.oppDeck;
    $('opp-hand').textContent = counts.oppHand;

    const myTurn = isMyTurn();
    $('bar-me').classList.toggle('active-turn', myTurn);
    $('bar-opp').classList.toggle('active-turn', !myTurn && !gameOver);
    $('opp-thinking').classList.toggle('on', !myTurn && !gameOver);
    $('me-status').textContent = gameOver ? '' : (myTurn ? t('game.playing') : t('game.waiting'));
    $('opp-status').textContent = gameOver ? '' : (myTurn ? t('game.waiting') : (mode === 'bot' ? t('game.thinking') : t('game.playing')));

    /* Punti azione */
    const pips = $('ap-pips');
    pips.innerHTML = '';
    const total = Math.max(maxActionPoints, actionPoints, 1);
    for (let i = 0; i < total; i++) {
        const pip = document.createElement('span');
        pip.className = 'ap-pip' + (i < actionPoints ? ' on' : '');
        pips.appendChild(pip);
    }
    $('ap-now').textContent = myTurn ? actionPoints : 0;
    $('ap-max').textContent = myTurn ? total : 1;
    $('ap-box').classList.toggle('charged', myTurn && actionPoints > 1);
    $('ap-box').classList.toggle('spent', !myTurn || actionPoints === 0);

    /* Banner turno */
    const banner = $('turn-banner');
    banner.className = 'turn-banner' + (gameOver ? ' over' : (myTurn ? ' mine' : ''));
    $('turn-banner-txt').textContent = gameOver
        ? t('game.gameOver')
        : (myTurn ? t('game.yourTurn') : t('game.oppTurn'));
    banner.querySelector('i').className = gameOver ? 'fas fa-flag' : (myTurn ? 'fas fa-play' : 'fas fa-hourglass-half');

    /* Hint */
    let hint;
    if (gameOver) hint = t('game.gameOver');
    else if (!myTurn) hint = t('game.hintNotYourTurn');
    else if (selectedCard === null) hint = actionPoints > 0 ? t('game.hintPickCard') : t('game.hintNoAp');
    else if (selectedCell === null) hint = t('game.hintPickPiece');
    else hint = t('game.hintPickTarget');
    $('hand-hint').textContent = hint;

    $('end-turn-btn').disabled = !myTurn;
}

function renderLog() {
    const box = $('log');
    box.innerHTML = logs.map(l =>
        '<div class="entry ' + (l.kind ? 'evt-' + l.kind : '') + '"><i class="fas fa-circle"></i><span>' + escapeHtml(l.text) + '</span></div>'
    ).join('');
    box.scrollTop = box.scrollHeight;
}

function log(text, kind) {
    logs.push({ text, kind: kind || '' });
    if (logs.length > 80) logs.shift();
    if ($('screen-game').classList.contains('active')) renderLog();
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

/* ============================== MODALI ============================== */
function openModal(id) { $(id).classList.add('open'); }
function closeModal(id) { $(id).classList.remove('open'); }

function showResult(winnerColor, customTitle, customSub) {
    const won = winnerColor === myColor;
    $('result-icon').className = 'result-icon' + (won ? '' : ' lose');
    $('result-icon').innerHTML = won ? '<i class="fas fa-crown"></i>' : '<i class="fas fa-chess-king"></i>';
    $('result-title').textContent = customTitle || (won ? t('result.win') : t('result.lose'));
    $('result-sub').textContent = customSub || (won ? t('result.winSub') : t('result.loseSub'));
    $('btn-rematch').style.display = (mode === 'bot') ? '' : 'none';
    openModal('modal-result');
}

function buildRulesModal() {
    const r = i18n[lang].rules;
    const cards = i18n[lang].cards;
    let html = '';
    html += '<h3>' + r.howto + '</h3><ul><li>' + [r.h1, r.h2, r.h3, r.h4].join('</li><li>') + '</li></ul>';
    html += '<h3>' + r.transform + '</h3><ul><li>' + [r.t1, r.t2, r.t3, r.t4].join('</li><li>') + '</li></ul>';
    html += '<h3>' + r.cardsTitle + '</h3><div class="rule-cards">';
    DECK_TEMPLATE.forEach(entry => {
        const meta = CARD_META[entry.id];
        const c = cards[entry.id];
        html += '<div class="rule-card ' + meta.kind + '">' +
            '<span class="rc-icon">' + meta.art + '</span>' +
            '<span><b>' + c.n + ' <small style="opacity:.5">x' + entry.copies + '</small></b><span>' + c.d + '</span></span>' +
            '</div>';
    });
    html += '</div>';
    $('rules-body').innerHTML = html;
}

/* ============================== RETE (P2P) ============================== */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const PEER_PREFIX = 'arcanechess7x7-';

function makeCode(len) {
    let s = '';
    for (let i = 0; i < (len || 5); i++) s += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    return s;
}

function netAvailable() { return typeof window.Peer === 'function'; }

function destroyPeer() {
    try { if (conn) conn.close(); } catch (e) { /* ignore */ }
    try { if (peer) peer.destroy(); } catch (e) { /* ignore */ }
    conn = null; peer = null;
}

/* ---- HOST ---- */
function hostGame() {
    const nick = getNickname();
    if (!nick) { toast(t('home.needNick'), 'warn'); $('nickname').focus(); return; }
    if (!netAvailable()) { toast(t('net.unavailable'), 'err'); return; }

    destroyPeer();
    roomCode = makeCode(5);
    mode = 'host';
    showScreen('screen-lobby');
    $('game-code').textContent = roomCode;
    $('lobby-status').textContent = t('lobby.connecting');
    $('lobby-spinner').style.display = '';

    let attempts = 0;
    const open = () => {
        peer = new Peer(PEER_PREFIX + roomCode, { debug: 0 });

        peer.on('open', () => { $('lobby-status').textContent = t('lobby.waiting'); });

        peer.on('connection', c => {
            if (conn && conn.open) { c.close(); return; }   /* stanza per due */
            conn = c;
            wireHostConn(nick);
        });

        peer.on('error', err => {
            if (err && err.type === 'unavailable-id' && attempts < 4) {
                attempts++;
                roomCode = makeCode(5);
                $('game-code').textContent = roomCode;
                try { peer.destroy(); } catch (e) { /* ignore */ }
                open();
                return;
            }
            $('lobby-status').textContent = t('join.failed');
            $('lobby-spinner').style.display = 'none';
        });
    };
    open();
}

function wireHostConn(myNick) {
    conn.on('open', () => {
        $('lobby-status').textContent = t('lobby.joined');
        conn.send({ t: 'hello-host', name: myNick });
    });
    conn.on('data', data => handleHostData(data, myNick));
    conn.on('close', () => onOpponentLeft());
    conn.on('error', () => onOpponentLeft());
}

function handleHostData(m, myNick) {
    if (!m || typeof m !== 'object') return;

    if (m.t === 'hello') {
        /* Il guest si e' presentato: avvio la partita e sincronizzo */
        startGame('host', myNick, String(m.name || t('game.opponent')).slice(0, 14));
        conn.send({ t: 'start', color: 'black', names, code: roomCode });
        syncToGuest();
        return;
    }
    if (m.t === 'act') { applyGuestAction(m); return; }
    if (m.t === 'bye') { onOpponentLeft(); return; }
}

/* L'host e' arbitro: valida tutto quello che chiede il guest */
function applyGuestAction(m) {
    if (gameOver || mode !== 'host') return;
    if (turn !== 'black') return;

    if (m.kind === 'endturn') { log(t('msg.endTurn')); endTurn(); return; }

    const card = players.black.hand.find(c => c.uid === m.uid);
    if (!card) return;

    if (m.kind === 'instant') {
        if (FREE_CARDS.indexOf(card.id) === -1) return;
        playInstantSpell(card, 'black');
        return;
    }

    if (m.kind === 'move') {
        if (actionPoints <= 0) return;
        const inRange = v => Number.isInteger(v) && v >= 0 && v < BOARD_SIZE;
        if (![m.sr, m.sc, m.dr, m.dc].every(inRange)) return;
        const piece = board[m.sr][m.sc];
        if (!piece || piece.color !== 'black') return;
        if (!isValidMove(piece, m.sr, m.sc, m.dr, m.dc, card.id, board[m.dr][m.dc])) return;
        executeMove(m.sr, m.sc, m.dr, m.dc, card, 'black');
    }
}

function syncToGuest() {
    if (mode !== 'host' || !conn || !conn.open) return;
    conn.send({
        t: 'sync',
        board,
        turn,
        ap: actionPoints,
        maxAp: maxActionPoints,
        hand: players.black.hand,
        counts: {
            myDeck: players.black.deck.length,
            myDiscard: players.black.discard.length,
            myHand: players.black.hand.length,
            oppDeck: players.white.deck.length,
            oppHand: players.white.hand.length
        },
        logs,
        lastMove,
        names,
        over: gameOver ? winner : null
    });
}

/* ---- GUEST ---- */
function joinGame() {
    const nick = getNickname();
    if (!nick) { toast(t('home.needNick'), 'warn'); showScreen('screen-home'); $('nickname').focus(); return; }
    if (!netAvailable()) { $('join-status').textContent = t('net.unavailable'); return; }

    const code = $('join-code').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length < 4) { $('join-status').textContent = t('join.badCode'); return; }

    destroyPeer();
    roomCode = code;
    mode = 'guest';
    $('join-status').textContent = t('join.connecting');
    $('btn-do-join').disabled = true;

    peer = new Peer({ debug: 0 });
    let settled = false;

    peer.on('open', () => {
        conn = peer.connect(PEER_PREFIX + code, { reliable: true });

        conn.on('open', () => {
            settled = true;
            conn.send({ t: 'hello', name: nick });
        });
        conn.on('data', data => handleGuestData(data, nick));
        conn.on('close', () => { if (settled) onOpponentLeft(); });
        conn.on('error', () => {
            $('btn-do-join').disabled = false;
            $('join-status').textContent = t('join.notFound');
        });
    });

    peer.on('error', err => {
        $('btn-do-join').disabled = false;
        $('join-status').textContent =
            (err && (err.type === 'peer-unavailable')) ? t('join.notFound') : t('join.failed');
    });

    setTimeout(() => {
        if (!settled && mode === 'guest' && !$('screen-game').classList.contains('active')) {
            $('btn-do-join').disabled = false;
            if ($('join-status').textContent === t('join.connecting')) $('join-status').textContent = t('join.notFound');
        }
    }, 12000);
}

function handleGuestData(m, myNick) {
    if (!m || typeof m !== 'object') return;

    if (m.t === 'start') {
        roomCode = m.code || roomCode;
        startGame('guest', myNick, (m.names && m.names.white) || t('game.opponent'));
        return;
    }
    if (m.t === 'sync') { applySnapshot(m); return; }
    if (m.t === 'bye') { onOpponentLeft(); return; }
}

function applySnapshot(s) {
    board = s.board;
    turn = s.turn;
    actionPoints = s.ap;
    maxActionPoints = s.maxAp;
    players.black.hand = s.hand || [];
    counts = s.counts || counts;
    logs = s.logs || [];
    lastMove = s.lastMove;
    names = s.names || names;
    selectedCard = null;
    selectedCell = null;

    const wasOver = gameOver;
    gameOver = !!s.over;
    winner = s.over;

    if (!$('screen-game').classList.contains('active')) showScreen('screen-game');
    renderBoard(); renderHand(); renderHUD(); renderLog();

    if (gameOver && !wasOver) showResult(winner);
}

function onOpponentLeft() {
    if (mode === 'bot') return;
    destroyPeer();
    if ($('screen-game').classList.contains('active')) {
        gameOver = true;
        renderHUD();
        showResult(myColor, t('result.oppLeftTitle'), t('result.oppLeftSub'));
    } else {
        toast(t('net.oppLeft'), 'err');
        showScreen('screen-home');
    }
}

function leaveGame() {
    if (mode !== 'bot') { send({ t: 'bye' }); destroyPeer(); }
    roomCode = null;
    mode = 'bot';
    gameOver = true;
    closeModal('modal-result');
    showScreen('screen-home');
}

/* ============================== EVENTI UI ============================== */
function bindEvents() {
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.addEventListener('click', () => setLanguage(b.dataset.lang));
    });

    $('nickname').addEventListener('input', () => {
        localStorage.setItem('ac_nick', $('nickname').value.trim());
    });

    $('btn-play-bot').addEventListener('click', () => {
        const nick = getNickname();
        if (!nick) { toast(t('home.needNick'), 'warn'); $('nickname').focus(); return; }
        destroyPeer();
        roomCode = null;
        startGame('bot', nick, t('game.bot'));
    });

    $('btn-create').addEventListener('click', hostGame);
    $('btn-join').addEventListener('click', () => {
        const nick = getNickname();
        if (!nick) { toast(t('home.needNick'), 'warn'); $('nickname').focus(); return; }
        $('join-status').textContent = netAvailable() ? '' : t('net.unavailable');
        $('btn-do-join').disabled = false;
        showScreen('screen-join');
        setTimeout(() => $('join-code').focus(), 120);
    });

    $('btn-do-join').addEventListener('click', joinGame);
    $('join-code').addEventListener('keydown', e => { if (e.key === 'Enter') joinGame(); });
    $('join-code').addEventListener('input', e => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });

    $('btn-join-back').addEventListener('click', () => { destroyPeer(); showScreen('screen-home'); });
    $('btn-lobby-back').addEventListener('click', () => { destroyPeer(); roomCode = null; showScreen('screen-home'); });

    $('btn-copy').addEventListener('click', () => {
        const code = $('game-code').textContent;
        const done = () => toast(t('common.copied'));
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(done).catch(done);
        } else {
            const ta = document.createElement('textarea');
            ta.value = code; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); } catch (e) { /* ignore */ }
            ta.remove(); done();
        }
    });

    $('end-turn-btn').addEventListener('click', requestEndTurn);
    $('btn-exit').addEventListener('click', leaveGame);
    $('btn-to-home').addEventListener('click', leaveGame);

    $('btn-rematch').addEventListener('click', () => {
        closeModal('modal-result');
        if (mode === 'bot') startGame('bot', names[myColor] || getNickname() || t('game.you'), t('game.bot'));
    });

    [$('btn-rules'), $('btn-rules-2')].forEach(b => b.addEventListener('click', () => {
        buildRulesModal();
        openModal('modal-rules');
    }));
    $('btn-rules-close').addEventListener('click', () => closeModal('modal-rules'));

    document.querySelectorAll('.modal-back').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal('modal-rules');
            if (isMyTurn() && (selectedCard !== null || selectedCell !== null)) {
                selectedCard = null; selectedCell = null; renderAll();
            }
        }
    });

    window.addEventListener('beforeunload', () => { if (mode !== 'bot') send({ t: 'bye' }); });
}

/* ============================== AVVIO ============================== */
function boot() {
    bindEvents();
    $('nickname').value = localStorage.getItem('ac_nick') || '';
    setLanguage(lang);
    showScreen('screen-home');
}

boot();
