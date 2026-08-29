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
            link: "Copia il link d'invito",
            linkCopied: "Link d'invito copiato!",
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
            youLeft: "Hai lasciato la partita.",
            blocked: "La tua rete blocca la connessione diretta. Per giocare tra reti diverse serve un server TURN: aprilo da \"Rete\" e incolla le credenziali.",
            settings: "Rete"
        },
        netcfg: {
            title: "Impostazioni di rete",
            sub: "Sulla stessa rete Wi-Fi i due browser si vedono da soli. Tra reti diverse (casa / mobile / ufficio) serve quasi sempre un server TURN che faccia da ponte.",
            turnLabel: "Server TURN",
            turnHint: "Una riga per server: url|utente|password. Puoi anche incollare direttamente il JSON che ti da' il provider.",
            ph: "turn:turn.esempio.com:3478|utente|password",
            save: "Salva",
            clear: "Rimuovi",
            saved: "Configurazione di rete salvata.",
            cleared: "Configurazione di rete rimossa.",
            invalid: "Formato non valido. Usa url|utente|password oppure il JSON del provider.",
            test: "Prova la connessione",
            testing: "Test in corso...",
            stunOk: "STUN raggiungibile (connessione diretta possibile)",
            stunKo: "STUN non raggiungibile",
            turnOk: "TURN raggiungibile (ponte attivo)",
            turnKo: "TURN configurato ma non raggiungibile: controlla url e credenziali",
            turnNone: "Nessun server TURN configurato",
            verdictGood: "Tutto ok: puoi giocare anche tra reti diverse.",
            verdictSame: "Funziona solo sulla stessa rete Wi-Fi. Aggiungi un server TURN per giocare ovunque.",
            verdictBad: "Nessuna connessione di rete rilevata.",
            help: "Come ottenere un TURN gratis: crea un account su metered.ca (piano free) oppure usa un tuo server coturn. Basta che uno dei due lo abbia: chi crea la partita puo' usare il link d'invito, che porta il TURN con se'.",
            imported: "Server TURN dell'invito importato."
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
            link: "Copy the invite link",
            linkCopied: "Invite link copied!",
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
            youLeft: "You left the game.",
            blocked: "Your network blocks the direct connection. Playing across different networks needs a TURN server: open \"Network\" and paste your credentials.",
            settings: "Network"
        },
        netcfg: {
            title: "Network settings",
            sub: "On the same Wi-Fi the two browsers find each other on their own. Across different networks (home / mobile / office) you almost always need a TURN server to bridge them.",
            turnLabel: "TURN server",
            turnHint: "One server per line: url|username|password. You can also paste the JSON your provider gives you.",
            ph: "turn:turn.example.com:3478|username|password",
            save: "Save",
            clear: "Remove",
            saved: "Network settings saved.",
            cleared: "Network settings removed.",
            invalid: "Invalid format. Use url|username|password or your provider's JSON.",
            test: "Test the connection",
            testing: "Testing...",
            stunOk: "STUN reachable (direct connection possible)",
            stunKo: "STUN unreachable",
            turnOk: "TURN reachable (relay active)",
            turnKo: "TURN configured but unreachable: check url and credentials",
            turnNone: "No TURN server configured",
            verdictGood: "All good: you can play across different networks.",
            verdictSame: "Same Wi-Fi only. Add a TURN server to play from anywhere.",
            verdictBad: "No network connectivity detected.",
            help: "Free TURN credentials: sign up at metered.ca (free plan) or run your own coturn. Only one of the two needs it: whoever creates the game can share the invite link, which carries the TURN along.",
            imported: "TURN server imported from the invite."
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

/* Figura della pedina evocata, in filigrana dietro le carte di trasformazione */
const WATERMARK = {
    sp_tower: '♜',
    sp_queen: '♛',
    sp_bishop: '♝',
    sp_knight: '♞'
};

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
let logSeq = 0;              /* id progressivo delle righe di cronologia */
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
        logSeq = 0;          /* riparte da capo: la cronologia a schermo si ricostruisce */
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

/* ============================== RENDER ==============================
   Rendering incrementale: la scacchiera e le carte vengono costruite UNA
   volta sola, poi si aggiorna solo cio' che e' davvero cambiato. Cosi' i
   glifi e le icone non "sfarfallano" ad ogni mossa e le animazioni
   partono solo sul pezzo che si muove o che si trasforma. */

let cellEls = [];            /* riferimenti alle caselle, indicizzati [r][c] */
let gridFlipped = null;      /* orientamento con cui e' stata costruita la griglia */
let renderedMoveKey = '';    /* ultima mossa gia' animata */
let lastLogId = -1;          /* ultima riga di cronologia gia' scritta a schermo */

function setText(el, value) { if (el && el.textContent !== value) el.textContent = value; }
function setHtml(el, value) { if (el && el.innerHTML !== value) el.innerHTML = value; }
function setClass(el, name, on) { if (el) el.classList.toggle(name, !!on); }

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

/* ---------- Scacchiera ---------- */
function buildBoardGrid() {
    const bd = $('board');
    bd.innerHTML = '';
    cellEls = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const r = flipped ? BOARD_SIZE - 1 - i : i;
            const c = flipped ? BOARD_SIZE - 1 - j : j;

            const cell = document.createElement('div');
            cell.className = 'cell ' + ((r + c) % 2 === 0 ? 'light' : 'dark');
            cell.dataset.r = r;
            cell.dataset.c = c;
            cell.dataset.sig = '';

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

            cell.addEventListener('click', () => handleCellClick(r, c));
            cellEls[r][c] = cell;
            bd.appendChild(cell);
        }
    }
    gridFlipped = flipped;
}

function cellEl(r, c) { return cellEls[r] ? cellEls[r][c] : null; }

/* Allinea una casella allo stato del pezzo. Ritorna il tipo di cambiamento. */
function syncCell(r, c) {
    const el = cellEls[r][c];
    const p = board[r] && board[r][c];
    const sig = p ? p.type + '|' + p.color + (p.hasTrap ? '|T' : '') : '';
    const prev = el.dataset.sig;
    if (prev === sig) return 'same';
    el.dataset.sig = sig;

    let pieceEl = el.querySelector('.piece');
    let marker = el.querySelector('.trap-marker');

    if (!p) {
        if (pieceEl) pieceEl.remove();
        if (marker) marker.remove();
        return 'clear';
    }

    if (!pieceEl) {
        pieceEl = document.createElement('span');
        el.appendChild(pieceEl);
    }
    const cls = 'piece ' + p.color;
    if (pieceEl.className !== cls) pieceEl.className = cls;
    setText(pieceEl, GLYPH[p.type]);

    if (p.hasTrap && !marker) {
        marker = document.createElement('span');
        marker.className = 'trap-marker';
        marker.title = t('cards.sp_trap.d');
        marker.innerHTML = TRAP_SVG;
        el.appendChild(marker);
    } else if (!p.hasTrap && marker) {
        marker.remove();
    }

    if (!prev) return 'add';
    return prev.split('|')[1] === p.color ? 'morph' : 'add';
}

function renderBoard() {
    if (!cellEls.length || gridFlipped !== flipped) buildBoardGrid();

    const mv = lastMove;
    const moveKey = mv ? [mv.sr, mv.sc, mv.dr, mv.dc].join(':') : '';
    const isNewMove = !!moveKey && moveKey !== renderedMoveKey;
    const sliding = isNewMove && mv && (mv.sr !== mv.dr || mv.sc !== mv.dc);

    /* firme precedenti: servono per capire se la casella d'arrivo era occupata */
    const destWasEnemy = sliding && (() => {
        const prev = cellEls[mv.dr][mv.dc].dataset.sig;
        const mover = board[mv.dr] && board[mv.dr][mv.dc];
        return !!prev && !!mover && prev.split('|')[1] !== mover.color;
    })();

    const pops = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const change = syncCell(r, c);
            if (change === 'same' || change === 'clear') continue;
            if (sliding && r === mv.dr && c === mv.dc) continue;   /* lo anima lo scivolamento */
            pops.push({ el: cellEls[r][c], kind: change });
        }
    }

    if (sliding) {
        animateSlide(mv);
        if (destWasEnemy) flashCapture(cellEls[mv.dr][mv.dc]);
    }
    pops.forEach(p => pulse(p.el.querySelector('.piece'), p.kind === 'morph' ? 'fx-morph' : 'fx-appear'));

    renderedMoveKey = moveKey;
    paintHighlights();
}

/* Il pezzo parte dalla casella d'origine e scivola in quella d'arrivo */
function animateSlide(mv) {
    const from = cellEls[mv.sr] && cellEls[mv.sr][mv.sc];
    const to = cellEls[mv.dr] && cellEls[mv.dr][mv.dc];
    if (!from || !to) return;
    const piece = to.querySelector('.piece');
    if (!piece) return;

    const dx = from.offsetLeft - to.offsetLeft;
    const dy = from.offsetTop - to.offsetTop;
    if (!dx && !dy) return;

    piece.classList.add('sliding');
    piece.style.transition = 'none';
    piece.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';

    requestAnimationFrame(() => {
        piece.style.transition = 'transform .28s cubic-bezier(.22,.75,.25,1)';
        piece.style.transform = 'translate(0,0)';
    });
    setTimeout(() => {
        piece.classList.remove('sliding');
        piece.style.transition = '';
        piece.style.transform = '';
    }, 340);
}

function flashCapture(el) {
    if (!el) return;
    el.classList.remove('fx-capture');
    void el.offsetWidth;
    el.classList.add('fx-capture');
    setTimeout(() => el.classList.remove('fx-capture'), 460);
}

function pulse(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;                 /* forza il riavvio dell'animazione */
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 520);
}

/* ---------- Evidenziazioni ---------- */
/* Calcola una mappa "r,c" -> classe, poi la applica senza ricostruire nulla:
   le caselle immutate non perdono ne' riacquistano classi, quindi le
   animazioni in corso non ripartono. */
function computeHighlights() {
    const marks = {};
    if (!isMyTurn() || selectedCard === null) return marks;
    const card = players[myColor].hand[selectedCard];
    if (!card) return marks;

    /* Carte da lanciare: evidenzio le mie pedine bersagliabili */
    if (IN_PLACE_CARDS.indexOf(card.id) !== -1) {
        for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) {
            const p = board[r][c];
            if (p && p.color === myColor && canCastOn(p, card.id)) marks[r + ',' + c] = 'hl-cast';
        }
        return marks;
    }

    if (selectedCell) {
        const src = board[selectedCell.r][selectedCell.c];
        marks[selectedCell.r + ',' + selectedCell.c] = 'selected';
        if (!src) return marks;
        for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) {
            const target = board[r][c];
            if (isValidMove(src, selectedCell.r, selectedCell.c, r, c, card.id, target)) {
                marks[r + ',' + c] = target ? 'hl-capture' : 'hl-move';
            }
        }
        return marks;
    }

    /* Nessuna pedina scelta: evidenzio quelle che hanno almeno una mossa */
    for (let r = 0; r < BOARD_SIZE; r++) for (let c = 0; c < BOARD_SIZE; c++) {
        const p = board[r][c];
        if (!p || p.color !== myColor) continue;
        let can = false;
        for (let tr = 0; tr < BOARD_SIZE && !can; tr++) {
            for (let tc = 0; tc < BOARD_SIZE && !can; tc++) {
                if (isValidMove(p, r, c, tr, tc, card.id, board[tr][tc])) can = true;
            }
        }
        if (can) marks[r + ',' + c] = 'movable';
    }
    return marks;
}

function paintHighlights() {
    const marks = computeHighlights();
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const el = cellEls[r][c];
            const k = marks[r + ',' + c] || '';
            setClass(el, 'selected', k === 'selected');
            setClass(el, 'hl-move', k === 'hl-move');
            setClass(el, 'hl-capture', k === 'hl-capture');
            setClass(el, 'hl-cast', k === 'hl-cast');
            setClass(el, 'movable', k === 'movable');
            setClass(el, 'last-move', !!lastMove &&
                ((lastMove.sr === r && lastMove.sc === c) || (lastMove.dr === r && lastMove.dc === c)));
        }
    }
}

/* ---------- Mano ---------- */
function buildCardEl(card) {
    const meta = CARD_META[card.id] || { kind: 'action', art: '' };
    const text = t('cards.' + card.id);
    const free = FREE_CARDS.indexOf(card.id) !== -1;
    const wm = WATERMARK[card.id];

    const el = document.createElement('div');
    el.className = 'game-card kind-' + meta.kind;
    el.dataset.uid = card.uid;
    el.dataset.lang = lang;
    el.innerHTML =
        (wm ? '<span class="card-watermark">' + wm + '</span>' : '') +
        (free ? '<span class="card-badge free">FREE</span>'
              : (meta.kind === 'legend' ? '<span class="card-badge">EPIC</span>' : '')) +
        '<div class="card-art">' + meta.art + '</div>' +
        '<div class="card-name">' + text.n + '</div>' +
        '<div class="card-text">' + text.d + '</div>';
    return el;
}

function renderHand() {
    const handDiv = $('player-hand');
    const hand = players[myColor].hand;

    if (!hand.length) {
        if (!handDiv.querySelector('.empty-hand')) handDiv.innerHTML = '<div class="empty-hand">&mdash;</div>';
        return;
    }
    const placeholder = handDiv.querySelector('.empty-hand');
    if (placeholder) placeholder.remove();

    /* via le carte non piu' in mano */
    const alive = {};
    hand.forEach(c => { alive[c.uid] = true; });
    Array.prototype.slice.call(handDiv.children).forEach(el => {
        if (!alive[el.dataset.uid]) el.remove();
    });

    hand.forEach((card, index) => {
        let el = handDiv.querySelector('.game-card[data-uid="' + card.uid + '"]');
        if (!el) {
            el = buildCardEl(card);
            el.classList.add('card-enter');
            setTimeout(() => el.classList.remove('card-enter'), 460);
        } else if (el.dataset.lang !== lang) {
            el.innerHTML = buildCardEl(card).innerHTML;   /* solo al cambio lingua */
            el.dataset.lang = lang;
        }
        if (handDiv.children[index] !== el) handDiv.insertBefore(el, handDiv.children[index] || null);

        const free = FREE_CARDS.indexOf(card.id) !== -1;
        setClass(el, 'selected', selectedCard === index);
        setClass(el, 'disabled', !isMyTurn() || (!free && actionPoints <= 0));
        el.onclick = () => handleCardClick(index);
    });
}

/* ---------- HUD ---------- */
function renderHUD() {
    const opp = opposite(myColor);
    const myName = names[myColor] || t('game.you');
    const oppName = names[opp] || (mode === 'bot' ? t('game.bot') : t('game.opponent'));

    setText($('me-name'), myName);
    setText($('opp-name'), oppName);
    setHtml($('me-avatar'), mode === 'bot' ? '<i class="fas fa-user"></i>' : escapeHtml(myName.charAt(0).toUpperCase()));
    setHtml($('opp-avatar'), mode === 'bot' ? '<i class="fas fa-robot"></i>' : escapeHtml(oppName.charAt(0).toUpperCase()));

    setText($('me-side'), t('game.' + myColor));
    $('me-side').className = 'side-chip ' + myColor;
    setText($('opp-side'), t('game.' + opp));
    $('opp-side').className = 'side-chip ' + opp;

    setText($('me-deck'), String(counts.myDeck));
    setText($('me-discard'), String(counts.myDiscard));
    setText($('opp-deck'), String(counts.oppDeck));
    setText($('opp-hand'), String(counts.oppHand));

    const myTurn = isMyTurn();
    setClass($('bar-me'), 'active-turn', myTurn);
    setClass($('bar-opp'), 'active-turn', !myTurn && !gameOver);
    setClass($('opp-thinking'), 'on', !myTurn && !gameOver);
    setText($('me-status'), gameOver ? '' : (myTurn ? t('game.playing') : t('game.waiting')));
    setText($('opp-status'), gameOver ? '' : (myTurn ? t('game.waiting') : (mode === 'bot' ? t('game.thinking') : t('game.playing'))));

    /* Punti azione: aggiungo/tolgo solo i pip necessari */
    const pips = $('ap-pips');
    const total = Math.max(maxActionPoints, actionPoints, 1);
    while (pips.childElementCount > total) pips.removeChild(pips.lastChild);
    while (pips.childElementCount < total) {
        const pip = document.createElement('span');
        pip.className = 'ap-pip';
        pips.appendChild(pip);
    }
    Array.prototype.forEach.call(pips.children, (pip, i) => setClass(pip, 'on', i < actionPoints));

    setText($('ap-now'), String(myTurn ? actionPoints : 0));
    setText($('ap-max'), String(myTurn ? total : 1));
    setClass($('ap-box'), 'charged', myTurn && actionPoints > 1);
    setClass($('ap-box'), 'spent', !myTurn || actionPoints === 0);

    /* Banner turno */
    const banner = $('turn-banner');
    const bannerCls = 'turn-banner' + (gameOver ? ' over' : (myTurn ? ' mine' : ''));
    if (banner.className !== bannerCls) banner.className = bannerCls;
    setText($('turn-banner-txt'), gameOver ? t('game.gameOver') : (myTurn ? t('game.yourTurn') : t('game.oppTurn')));
    const bIcon = banner.querySelector('i');
    const bIconCls = gameOver ? 'fas fa-flag' : (myTurn ? 'fas fa-play' : 'fas fa-hourglass-half');
    if (bIcon.className !== bIconCls) bIcon.className = bIconCls;

    /* Suggerimento */
    let hint;
    if (gameOver) hint = t('game.gameOver');
    else if (!myTurn) hint = t('game.hintNotYourTurn');
    else if (selectedCard === null) hint = actionPoints > 0 ? t('game.hintPickCard') : t('game.hintNoAp');
    else if (selectedCell === null) hint = t('game.hintPickPiece');
    else hint = t('game.hintPickTarget');
    setText($('hand-hint'), hint);

    $('end-turn-btn').disabled = !myTurn;
}

/* ---------- Cronologia ---------- */
function renderLog() {
    const box = $('log');

    if (!logs.length) {
        if (box.childElementCount) box.innerHTML = '';
        lastLogId = -1;
        return;
    }
    /* partita nuova (id ripartiti da capo): ricostruisco */
    if (logs[logs.length - 1].id < lastLogId) {
        box.innerHTML = '';
        lastLogId = -1;
    }

    let added = false;
    logs.forEach(l => {
        if (l.id <= lastLogId) return;
        const entry = document.createElement('div');
        entry.className = 'entry' + (l.kind ? ' evt-' + l.kind : '');
        entry.innerHTML = '<i class="fas fa-circle"></i><span>' + escapeHtml(l.text) + '</span>';
        box.appendChild(entry);
        lastLogId = l.id;
        added = true;
    });

    while (box.childElementCount > 80) box.removeChild(box.firstChild);
    if (added) box.scrollTop = box.scrollHeight;
}

function log(text, kind) {
    logs.push({ id: ++logSeq, text, kind: kind || '' });
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

/* ---------------------------------------------------------------------------
   ICE: STUN + TURN
   PeerJS di default usa uno STUN di Google e due TURN (eu-0/us-0.turn.peerjs.com)
   che non esistono piu'. Senza un relay funzionante la connessione riesce solo
   quando i due browser sono sulla stessa LAN: da reti diverse i candidati
   "srflx" non bastano (NAT simmetrico, CGNAT mobile, firewall aziendali).
   Qui la lista e' esplicita e il TURN e' configurabile dall'utente.
--------------------------------------------------------------------------- */
const STUN_SERVERS = [
    { urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302'
    ] },
    { urls: 'stun:stun.cloudflare.com:3478' },
    { urls: 'stun:global.stun.twilio.com:3478' }
];

const TURN_KEY = 'ac_turn';

/* Accetta due formati: una riga per server ("url|utente|password") oppure il
   JSON dei provider (array di iceServers o { iceServers: [...] }).
   Torna [] se il testo e' vuoto, null se non e' interpretabile. */
function parseTurnInput(text) {
    const raw = String(text || '').trim();
    if (!raw) return [];

    if (raw[0] === '[' || raw[0] === '{') {
        let data;
        try { data = JSON.parse(raw); } catch (e) { return null; }
        const list = Array.isArray(data) ? data : (data && data.iceServers);
        if (!Array.isArray(list)) return null;
        const out = [];
        list.forEach(srv => {
            if (!srv || !srv.urls) return;
            const entry = { urls: srv.urls };
            if (srv.username) entry.username = String(srv.username);
            if (srv.credential) entry.credential = String(srv.credential);
            out.push(entry);
        });
        return out.length ? out : null;
    }

    const out = [];
    const lines = raw.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split('|').map(p => p.trim());
        if (!/^(stun|stuns|turn|turns):\S+/i.test(parts[0])) return null;
        const entry = { urls: parts[0] };
        if (parts[1]) entry.username = parts[1];
        if (parts[2]) entry.credential = parts[2];
        out.push(entry);
    }
    return out.length ? out : null;
}

/* Un TURN dichiarato solo in UDP viene provato anche in TCP: parecchie reti
   mobili e aziendali lasciano passare solo il TCP. */
function expandTurn(list) {
    const out = [];
    list.forEach(srv => {
        out.push(srv);
        const urls = Array.isArray(srv.urls) ? srv.urls : [srv.urls];
        urls.forEach(u => {
            if (/^turn:/i.test(u) && u.indexOf('transport=') === -1) {
                out.push(Object.assign({}, srv, { urls: u + '?transport=tcp' }));
            }
        });
    });
    return out;
}

function loadTurnServers() {
    let raw;
    try { raw = localStorage.getItem(TURN_KEY); } catch (e) { return []; }
    if (!raw) return [];
    try {
        const list = JSON.parse(raw);
        return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
}

function saveTurnServers(list) {
    try {
        if (list && list.length) localStorage.setItem(TURN_KEY, JSON.stringify(list));
        else localStorage.removeItem(TURN_KEY);
    } catch (e) { /* ignore */ }
}

function hasTurn() { return loadTurnServers().length > 0; }

/* Testo mostrato nel pannello: una riga per server. */
function turnServersText() {
    return loadTurnServers().map(srv => {
        const url = Array.isArray(srv.urls) ? srv.urls[0] : srv.urls;
        return [url, srv.username || '', srv.credential || ''].join('|').replace(/\|+$/, '');
    }).join('\n');
}

function iceConfig() {
    return {
        iceServers: STUN_SERVERS.concat(expandTurn(loadTurnServers())),
        iceCandidatePoolSize: 4,
        sdpSemantics: 'unified-plan'
    };
}

/* Opzioni comuni a host e guest: senza "config" PeerJS userebbe i suoi TURN morti. */
function peerOptions() {
    return { debug: 0, config: iceConfig() };
}

/* Raccoglie i candidati ICE per capire cosa funziona davvero su questa rete. */
function probeIce(servers, policy, ms) {
    return new Promise(resolve => {
        let pc;
        try {
            pc = new RTCPeerConnection({ iceServers: servers, iceTransportPolicy: policy });
        } catch (e) { resolve([]); return; }

        const types = {};
        pc.onicecandidate = e => {
            if (!e.candidate || !e.candidate.candidate) return;
            const m = /typ (\w+)/.exec(e.candidate.candidate);
            if (m) types[m[1]] = true;
        };
        try { pc.createDataChannel('probe'); } catch (e) { /* ignore */ }
        pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => { /* ignore */ });

        setTimeout(() => {
            try { pc.close(); } catch (e) { /* ignore */ }
            resolve(Object.keys(types));
        }, ms);
    });
}

/* PeerJS non espone il fallimento della negoziazione ICE: lo guardo sulla
   RTCPeerConnection sottostante, con un tentativo di restart prima di mollare. */
function watchIce(c, onFail) {
    let tries = 0;
    const attach = () => {
        if (!c || c !== conn) return;
        const pc = c.peerConnection;
        if (!pc) { if (tries++ < 80) setTimeout(attach, 250); return; }
        pc.addEventListener('iceconnectionstatechange', () => {
            if (pc.iceConnectionState !== 'failed') return;
            if (!pc.acRestarted && typeof pc.restartIce === 'function') {
                pc.acRestarted = true;
                try { pc.restartIce(); } catch (e) { /* ignore */ }
                return;
            }
            onFail();
        });
    };
    attach();
}

/* ---- Link d'invito: codice partita (+ TURN) dentro l'hash ---- */
function b64urlEncode(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str) {
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(bin, ch => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

/* Il link porta con se' anche il TURN dell'host, cosi' l'amico non deve
   configurare niente per giocare da un'altra rete. */
function inviteLink(code) {
    const base = location.href.split('#')[0];
    let hash = '#g=' + encodeURIComponent(code);
    const turn = loadTurnServers();
    if (turn.length) {
        try { hash += '&t=' + b64urlEncode(JSON.stringify(turn)); } catch (e) { /* ignore */ }
    }
    return base + hash;
}

function readInvite() {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return null;
    const params = {};
    hash.split('&').forEach(pair => {
        const i = pair.indexOf('=');
        if (i > 0) params[pair.slice(0, i)] = pair.slice(i + 1);
    });
    if (!params.g) return null;
    const out = { code: decodeURIComponent(params.g).toUpperCase().replace(/[^A-Z0-9]/g, '') };
    if (params.t) {
        try {
            const list = JSON.parse(b64urlDecode(params.t));
            if (Array.isArray(list) && list.length) out.turn = list.filter(s => s && s.urls);
        } catch (e) { /* ignore */ }
    }
    return out.code ? out : null;
}

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
        peer = new Peer(PEER_PREFIX + roomCode, peerOptions());

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
    watchIce(conn, () => onOpponentLeft());
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
function setJoinError(msg) {
    $('join-status').textContent = msg;
    $('join-status').parentElement.classList.add('error');
    $('btn-join-net').hidden = false;
}

function clearJoinError() {
    $('join-status').textContent = '';
    $('join-status').parentElement.classList.remove('error');
    $('btn-join-net').hidden = true;
}

function joinGame() {
    const nick = getNickname();
    if (!nick) { toast(t('home.needNick'), 'warn'); showScreen('screen-home'); $('nickname').focus(); return; }
    if (!netAvailable()) { setJoinError(t('net.unavailable')); return; }

    const code = $('join-code').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length < 4) { setJoinError(t('join.badCode')); return; }

    destroyPeer();
    roomCode = code;
    mode = 'guest';
    clearJoinError();
    $('join-status').textContent = t('join.connecting');
    $('btn-do-join').disabled = true;

    peer = new Peer(peerOptions());
    let settled = false;
    let missing = false;          /* il broker dice che il codice non esiste */

    /* Distingue il codice sbagliato dalla rete che blocca il collegamento:
       se la stanza esiste ma il canale dati non si apre, e' un problema di NAT. */
    const giveUp = () => {
        if (settled || mode !== 'guest') return;
        $('btn-do-join').disabled = false;
        setJoinError(missing ? t('join.notFound') : t('net.blocked'));
        destroyPeer();
    };

    peer.on('open', () => {
        conn = peer.connect(PEER_PREFIX + code, { reliable: true });

        conn.on('open', () => {
            settled = true;
            conn.send({ t: 'hello', name: nick });
        });
        conn.on('data', data => handleGuestData(data, nick));
        conn.on('close', () => { if (settled) onOpponentLeft(); });
        conn.on('error', () => giveUp());
        watchIce(conn, () => { if (settled) onOpponentLeft(); else giveUp(); });
    });

    peer.on('error', err => {
        if (err && err.type === 'peer-unavailable') missing = true;
        giveUp();
    });

    /* Un TURN in TCP puo' essere lento: meglio lasciargli tempo. */
    setTimeout(giveUp, 20000);
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

/* ============================== PANNELLO RETE ============================== */
function copyText(text, msg) {
    const done = () => toast(msg);
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
        return;
    }
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    ta.remove(); done();
}

function openNetPanel() {
    $('turn-input').value = turnServersText();
    $('net-report').hidden = true;
    $('net-report').innerHTML = '';
    openModal('modal-net');
}

function saveTurnFromInput() {
    const list = parseTurnInput($('turn-input').value);
    if (list === null) { toast(t('netcfg.invalid'), 'err'); return; }
    saveTurnServers(list);
    $('turn-input').value = turnServersText();
    toast(list.length ? t('netcfg.saved') : t('netcfg.cleared'));
}

function clearTurnConfig() {
    saveTurnServers([]);
    $('turn-input').value = '';
    $('net-report').hidden = true;
    toast(t('netcfg.cleared'));
}

function reportRow(cls, icon, text) {
    return '<li class="' + cls + '"><i class="fas ' + icon + '"></i><span>' + escapeHtml(text) + '</span></li>';
}

/* Diagnostica: raccoglie i candidati ICE e dice in chiaro cosa funziona
   davvero su questa rete, invece di lasciare l'utente con un errore generico. */
function runNetTest() {
    const btn = $('btn-net-test');
    const box = $('net-report');
    btn.disabled = true;
    box.hidden = false;
    box.innerHTML = reportRow('warn', 'fa-hourglass-half', t('netcfg.testing'));

    const turn = expandTurn(loadTurnServers());

    Promise.all([
        probeIce(STUN_SERVERS, 'all', 5000),
        turn.length ? probeIce(turn, 'relay', 7000) : Promise.resolve([])
    ]).then(res => {
        const stunOk = res[0].indexOf('srflx') !== -1;
        const turnOk = res[1].indexOf('relay') !== -1;

        let html = stunOk
            ? reportRow('ok', 'fa-circle-check', t('netcfg.stunOk'))
            : reportRow('ko', 'fa-circle-xmark', t('netcfg.stunKo'));

        if (!turn.length) html += reportRow('warn', 'fa-triangle-exclamation', t('netcfg.turnNone'));
        else if (turnOk) html += reportRow('ok', 'fa-circle-check', t('netcfg.turnOk'));
        else html += reportRow('ko', 'fa-circle-xmark', t('netcfg.turnKo'));

        let verdict = t('netcfg.verdictBad');
        if (turnOk) verdict = t('netcfg.verdictGood');
        else if (stunOk) verdict = t('netcfg.verdictSame');

        box.innerHTML = html + '<li class="verdict">' + escapeHtml(verdict) + '</li>';
        btn.disabled = false;
    });
}

/* Il link d'invito porta il codice partita e, se l'host ne ha uno, il TURN:
   cosi' l'amico non deve configurare nulla per giocare da un'altra rete. */
function applyInvite() {
    const invite = readInvite();
    if (!invite) return;

    try { history.replaceState(null, '', location.href.split('#')[0]); } catch (e) { /* ignore */ }

    if (invite.turn && !hasTurn()) {
        saveTurnServers(invite.turn);
        toast(t('netcfg.imported'));
    }

    $('join-code').value = invite.code;
    if (getNickname()) {
        clearJoinError();
        $('btn-do-join').disabled = false;
        showScreen('screen-join');
    } else {
        toast(t('home.needNick'), 'warn');
        setTimeout(() => $('nickname').focus(), 120);
    }
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
        clearJoinError();
        if (!netAvailable()) setJoinError(t('net.unavailable'));
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
        copyText($('game-code').textContent, t('common.copied'));
    });
    $('btn-invite').addEventListener('click', () => {
        copyText(inviteLink($('game-code').textContent), t('lobby.linkCopied'));
    });

    /* Impostazioni di rete: raggiungibili da home, lobby e schermata di ingresso. */
    [$('btn-net'), $('btn-lobby-net'), $('btn-join-net')].forEach(b => {
        b.addEventListener('click', openNetPanel);
    });
    $('btn-net-close').addEventListener('click', () => closeModal('modal-net'));
    $('btn-turn-save').addEventListener('click', saveTurnFromInput);
    $('btn-turn-clear').addEventListener('click', clearTurnConfig);
    $('btn-net-test').addEventListener('click', runNetTest);

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
            closeModal('modal-net');
            if (isMyTurn() && (selectedCard !== null || selectedCell !== null)) {
                selectedCard = null; selectedCell = null; renderAll();
            }
        }
    });

    window.addEventListener('beforeunload', () => { if (mode !== 'bot') send({ t: 'bye' }); });

    /* Link d'invito aperto a pagina gia' caricata: cambia solo l'hash, niente reload. */
    window.addEventListener('hashchange', () => { if (mode === 'bot') applyInvite(); });
}

/* ============================== AVVIO ============================== */
function boot() {
    bindEvents();
    $('nickname').value = localStorage.getItem('ac_nick') || '';
    setLanguage(lang);
    showScreen('screen-home');
    applyInvite();
}

boot();
