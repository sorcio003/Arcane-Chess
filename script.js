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
            needNick: "Scrivi prima un nickname!",
            skinLabel: "Set di pezzi",
            skinHint: "Scegli prima di iniziare: vale per tutte le tue partite."
        },
        skins: {
            "default": "Classico",
            sealion: "Otarie",
            tucano: "Tucani",
            gardevoir: "Gardevoir",
            gallade: "Gallade"
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
            busy: "Questa partita e' gia' al completo.",
            failed: "Connessione fallita. Riprova."
        },
        net: {
            unavailable: "Modalita' online non disponibile: questo browser non supporta i WebSocket. Puoi comunque giocare contro il Bot.",
            note: "Il gioco funziona anche offline contro il Bot. Le partite online passano da un punto d'incontro pubblico: si gioca da qualsiasi rete, senza configurare niente.",
            error: "Errore di rete. Torno alla home.",
            oppLeft: "L'avversario ha lasciato la partita.",
            youLeft: "Hai lasciato la partita.",
            noaddr: "Nessun indirizzo configurato: apri \"Rete\" e scegli come collegarti.",
            unreachable: "Non riesco a collegarmi. Controlla l'indirizzo in \"Rete\".",
            settings: "Rete"
        },
        netcfg: {
            title: "Impostazioni di rete",
            sub: "Le partite online passano da un punto d'incontro: entrambi i browser si collegano li' e si scambiano le mosse. Non serve stare sulla stessa rete ne' aprire porte sul router.",
            modeMqtt: "Broker pubblico",
            modeRelay: "Server tuo",
            brokerLabel: "Broker MQTT",
            brokerPh: "wss://broker.emqx.io:8084/mqtt",
            brokerHint: "Pronto all'uso, senza registrarsi: funziona anche su GitHub Pages. Alternative: wss://test.mosquitto.org:8081/mqtt, wss://broker.hivemq.com:8884/mqtt. Attenzione: e' un servizio pubblico, i messaggi non sono cifrati e chi conoscesse il codice partita potrebbe leggerli.",
            relayLabel: "Indirizzo del relay",
            relayPh: "wss://il-tuo-relay.workers.dev",
            relayHint: "Il codice sta in server/: \"npx wrangler deploy\" lo mette su Cloudflare una volta sola, gratis. Privato e piu' affidabile del broker pubblico.",
            save: "Salva",
            reset: "Ripristina",
            saved: "Impostazioni salvate.",
            resetDone: "Impostazioni ripristinate.",
            invalid: "Indirizzo non valido.",
            test: "Prova la connessione",
            testing: "Test in corso...",
            ok: "Collegamento riuscito",
            ko: "Collegamento fallito",
            none: "Nessun indirizzo configurato",
            verdictGood: "Tutto ok: puoi giocare con chiunque, su qualsiasi rete.",
            verdictBad: "Nessuna risposta: prova un altro indirizzo.",
            verdictNone: "Scegli un indirizzo per giocare online.",
            help: "I due giocatori devono usare lo stesso punto d'incontro. Il link d'invito se lo porta dietro, quindi chi lo apre non deve configurare niente.",
            imported: "Impostazioni di rete dell'invito applicate."
        },
        game: {
            you: "Tu", bot: "Bot", opponent: "Avversario",
            white: "Bianco", black: "Nero",
            deck: "Mazzo", hand: "Mano", discard: "Scarti",
            turnNo: "Turno",
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
            sniped: "{a} colpisce {b} a distanza!",
            lastStand: "Ultima difesa di {p}: al Re restano solo carte da combattimento!",
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
            cardsTitle: "Le carte",
            loneTitle: "Quando resti col solo Re",
            l1: "Le magie di trasformazione spariscono: il Re non si trasforma, sarebbero carta straccia.",
            l2: "Peschi soltanto Movimento, Attacco e Mossa & Attacco.",
            l3: "Si sblocca l'Attacco a Lungo Raggio, che esiste solo in questa situazione."
        },
        cards: {
            mov: { n: "Movimento", d: "Muovi una pedina secondo il suo schema." },
            atk: { n: "Attacco", d: "Cattura una pedina nemica." },
            mov_atk: { n: "Mossa & Attacco", d: "Muovi oppure cattura." },
            atk_far: { n: "Attacco a Lungo Raggio", d: "Colpisci un nemico entro 2 caselle restando fermo." },
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
            needNick: "Type a nickname first!",
            skinLabel: "Piece set",
            skinHint: "Pick one before you start: it applies to all your games."
        },
        skins: {
            "default": "Classic",
            sealion: "Sea Lions",
            tucano: "Toucans",
            gardevoir: "Gardevoir",
            gallade: "Gallade"
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
            busy: "This game is already full.",
            failed: "Connection failed. Try again."
        },
        net: {
            unavailable: "Online mode unavailable: this browser has no WebSocket support. You can still play against the Bot.",
            note: "The game works offline against the Bot. Online matches go through a public meeting point, so any network works with no setup.",
            error: "Network error. Returning home.",
            oppLeft: "Your opponent left the game.",
            youLeft: "You left the game.",
            noaddr: "No address configured: open \"Network\" and pick how to connect.",
            unreachable: "Cannot connect. Check the address under \"Network\".",
            settings: "Network"
        },
        netcfg: {
            title: "Network settings",
            sub: "Online matches go through a meeting point: both browsers connect to it and exchange the moves there. No need to be on the same network, and no ports to forward.",
            modeMqtt: "Public broker",
            modeRelay: "Your own server",
            brokerLabel: "MQTT broker",
            brokerPh: "wss://broker.emqx.io:8084/mqtt",
            brokerHint: "Ready to use, no signup: works on GitHub Pages too. Alternatives: wss://test.mosquitto.org:8081/mqtt, wss://broker.hivemq.com:8884/mqtt. Careful: it is a public service, messages are not encrypted and anyone knowing the game code could read them.",
            relayLabel: "Relay address",
            relayPh: "wss://your-relay.workers.dev",
            relayHint: "The code is in server/: \"npx wrangler deploy\" puts it on Cloudflare once, for free. Private and more reliable than the public broker.",
            save: "Save",
            reset: "Reset",
            saved: "Settings saved.",
            resetDone: "Settings restored.",
            invalid: "Invalid address.",
            test: "Test the connection",
            testing: "Testing...",
            ok: "Connected",
            ko: "Connection failed",
            none: "No address configured",
            verdictGood: "All good: you can play with anyone, on any network.",
            verdictBad: "No answer: try another address.",
            verdictNone: "Pick an address to play online.",
            help: "Both players must use the same meeting point. The invite link carries it along, so whoever opens it has nothing to configure.",
            imported: "Network settings applied from the invite."
        },
        game: {
            you: "You", bot: "Bot", opponent: "Opponent",
            white: "White", black: "Black",
            deck: "Deck", hand: "Hand", discard: "Discard",
            turnNo: "Turn",
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
            sniped: "{a} strikes {b} from afar!",
            lastStand: "{p} makes a last stand: the King is left with combat cards only!",
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
            cardsTitle: "The cards",
            loneTitle: "When only your King is left",
            l1: "Transformation spells disappear: the King never transforms, they would be dead cards.",
            l2: "You only draw Movement, Attack and Move & Attack.",
            l3: "The Long-Range Attack unlocks - it exists only in this situation."
        },
        cards: {
            mov: { n: "Movement", d: "Move a piece along its pattern." },
            atk: { n: "Attack", d: "Capture an enemy piece." },
            mov_atk: { n: "Move & Attack", d: "Move or capture." },
            atk_far: { n: "Long-Range Attack", d: "Hit an enemy within 2 squares without moving." },
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

/* Glifi "pieni" per entrambi i colori: fanno da testo alternativo alle immagini */
const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
const PIECE_CODES = ['P', 'R', 'N', 'B', 'Q', 'K'];

/* Set di pezzi disponibili: ognuno e' una cartella skin/<nome>/ con dodici
   immagini (wP.png ... bK.png) piu' la striscia preview.png del selettore. */
const SKINS = ['default', 'sealion', 'tucano', 'gardevoir', 'gallade'];
const DEFAULT_SKIN = 'default';

/* Scala di potenza per le trasformazioni: si sale solo verso l'alto. Il Re e' escluso. */
const UPGRADE_LADDER = ['P', 'N', 'R', 'B', 'Q'];
const RANK_OF = { P: 0, N: 1, R: 2, B: 3, Q: 4 };

const FREE_CARDS = ['sp_draw', 'sp_extra'];          /* non consumano l'azione */
const IN_PLACE_CARDS = ['sp_tower', 'sp_queen', 'sp_trap']; /* si lanciano su una tua pedina */
const RANGED_CARDS = ['atk_far'];                    /* colpiscono senza spostare la pedina */
const FAR_RANGE = 2;                                 /* gittata dell'attacco a lungo raggio */

/* Col solo Re in campo le magie sono carta straccia: il Re non si trasforma mai.
   Restano le carte da combattimento, piu' l'attacco a lungo raggio che esiste
   soltanto in questa situazione. */
const LONE_KING_CARDS = ['mov', 'atk', 'mov_atk', 'atk_far'];
const LONE_KING_POOL = ['mov', 'mov', 'atk', 'atk', 'mov_atk', 'mov_atk', 'atk_far', 'atk_far'];

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
    atk_far:   { kind: 'legend', art: '<i class="fas fa-bullseye"></i>' },
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

/* Non fa parte del mazzo: si genera solo quando un giocatore resta col solo Re. */
const LONE_KING_TEMPLATE = [{ id: 'atk_far' }];

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
let turnCount = 1;           /* turni giocati, uno per ogni cambio di mano */
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
let roomCode = null;

const $ = (id) => document.getElementById(id);
const opposite = (c) => c === 'white' ? 'black' : 'white';
const isMyTurn = () => turn === myColor && !gameOver;

/* ============================== SET DI PEZZI ==============================
   La scelta resta sul dispositivo del giocatore: in una partita online ognuno
   vede la scacchiera col set che preferisce, le mosse non cambiano. */
let skin = SKINS.indexOf(stored('ac_skin')) !== -1 ? stored('ac_skin') : DEFAULT_SKIN;

function pieceSrc(color, type) {
    return 'skin/' + skin + '/' + (color === 'white' ? 'w' : 'b') + type + '.png';
}

/* Scarica in anticipo i dodici pezzi: la scacchiera si apre gia' completa. */
function preloadSkin(id) {
    PIECE_CODES.forEach(type => ['w', 'b'].forEach(c => {
        const img = new Image();
        img.src = 'skin/' + id + '/' + c + type + '.png';
    }));
}

function setSkin(id) {
    if (SKINS.indexOf(id) === -1) id = DEFAULT_SKIN;
    skin = store('ac_skin', id);
    preloadSkin(id);
    renderSkinPicker();
    repaintPieces();
}

/* Cambio set a partita aperta: si sostituisce solo l'immagine, lo stato resta. */
function repaintPieces() {
    document.querySelectorAll('#board .piece > img').forEach(img => {
        const src = pieceSrc(img.dataset.color, img.dataset.type);
        if (img.getAttribute('src') !== src) img.setAttribute('src', src);
    });
}

/* Selettore in home: una scheda per set, costruita una volta sola. */
function renderSkinPicker() {
    const box = $('skin-picker');
    if (!box) return;
    if (!box.children.length) {
        SKINS.forEach(id => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'skin-card';
            b.dataset.skin = id;
            b.innerHTML =
                '<span class="skin-shot"><img src="skin/' + id + '/preview.png" alt="" loading="lazy"></span>' +
                '<span class="skin-name"></span>' +
                '<i class="fas fa-circle-check skin-tick"></i>';
            b.addEventListener('click', () => setSkin(id));
            box.appendChild(b);
        });
    }
    Array.prototype.forEach.call(box.children, b => {
        const on = b.dataset.skin === skin;
        setClass(b, 'active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        setText(b.querySelector('.skin-name'), t('skins.' + b.dataset.skin));
        /* la scheda scelta si porta in vista da sola: la fila scorre in orizzontale */
        if (on) box.scrollLeft = b.offsetLeft - (box.clientWidth - b.clientWidth) / 2;
    });
}

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
    renderSkinPicker();
    $('net-note').textContent = t('net.note');
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
function makeCard(id) {
    return { id, kind: CARD_META[id].kind, uid: Math.random().toString(36).slice(2, 11) };
}

function makeDeck() {
    const deck = [];
    DECK_TEMPLATE.forEach(c => {
        for (let i = 0; i < c.copies; i++) {
            deck.push(makeCard(c.id));
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
        turnCount = 1;
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

        /* Ultima difesa: al Re solo arrivano soltanto carte da combattimento,
           generate al momento - il suo mazzo resta li' se dovesse riprendersi. */
        if (isLoneKing(color)) {
            p.hand.push(makeCard(LONE_KING_POOL[Math.floor(Math.random() * LONE_KING_POOL.length)]));
            continue;
        }

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
/* Una sola pedina in campo puo' essere solo il Re: se cadesse, la partita
   sarebbe gia' finita. */
function isLoneKing(color) { return countPieces(color) === 1; }

/* Chi resta col solo Re butta le magie inutili e le rimpiazza con carte da
   combattimento. Se piu' avanti recupera un pedone (passiva del Re), lo stato
   si annulla e torna a pescare dal suo mazzo. */
function checkLastStand(color) {
    const p = players[color];
    if (!isLoneKing(color)) { p.lastStand = false; return; }
    if (p.lastStand || gameOver) return;

    p.lastStand = true;
    const dead = p.hand.filter(c => LONE_KING_CARDS.indexOf(c.id) === -1);
    dead.forEach(c => discardCard(c, color));
    drawCards(color, dead.length);
    log(fmt(t('msg.lastStand'), { p: names[color] || t('game.' + color) }), 'magic');
}

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

    /* Attacco a lungo raggio: colpisce un nemico entro 2 caselle e resta fermo. */
    if (cardId === 'atk_far') {
        return !!target && Math.max(Math.abs(dRow), dCol) <= FAR_RANGE;
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
    const ranged = RANGED_CARDS.indexOf(card.id) !== -1;
    let kingCaptured = false;

    /* --- Cattura --- */
    if (target && !sameSquare) {
        piece.kills += 1;
        log(fmt(t(ranged ? 'msg.sniped' : 'msg.capture'),
            { a: pieceName(piece.type), b: pieceName(target.type) }), 'kill');
        if (target.hasTrap) {
            log(t('msg.trapSprung'), 'good');
            drawCards(target.color, 1);
        }
        if (target.type === 'K') kingCaptured = true;

        /* Passiva del Re: senza soldati, il Re rianima il pedone nemico caduto */
        if (!kingCaptured && piece.type === 'K' && countPieces(color) === 1 && target.type === 'P') {
            log(t('msg.resurrect'), 'magic');
            board[dr][dc] = newPiece('P', color);
            if (!ranged) board[sr][sc] = null;
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

    /* --- Spostamento (l'attacco a lungo raggio colpisce e resta fermo) --- */
    if (ranged) {
        board[dr][dc] = null;
        lastMove = { sr, sc, dr, dc };
    } else if (!sameSquare) {
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
    checkLastStand('white');
    checkLastStand('black');
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
    turnCount += 1;
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
    setPieceArt(pieceEl, p.color, p.type);

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

/* Immagine del pezzo nel set scelto. Il glifo resta come testo alternativo:
   se il file non arriva, la casella si legge lo stesso. */
function setPieceArt(el, color, type) {
    let img = el.firstElementChild;
    if (!img) {
        img = document.createElement('img');
        img.draggable = false;
        el.appendChild(img);
    }
    if (img.dataset.color !== color || img.dataset.type !== type) {
        img.dataset.color = color;
        img.dataset.type = type;
        img.alt = GLYPH[type];
        img.setAttribute('src', pieceSrc(color, type));
    }
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

    setText($('turn-no'), String(turnCount));
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

    /* Carte che esistono solo quando un giocatore resta col solo Re */
    html += '<h3>' + r.loneTitle + '</h3><ul><li>' + [r.l1, r.l2, r.l3].join('</li><li>') + '</li></ul>';
    html += '<div class="rule-cards">';
    LONE_KING_TEMPLATE.forEach(entry => {
        const meta = CARD_META[entry.id];
        const c = cards[entry.id];
        html += '<div class="rule-card ' + meta.kind + '">' +
            '<span class="rc-icon">' + meta.art + '</span>' +
            '<span><b>' + c.n + '</b><span>' + c.d + '</span></span>' +
            '</div>';
    });
    html += '</div>';

    $('rules-body').innerHTML = html;
}

/* ============================== RETE ==============================
   Due trasporti, stessa interfaccia (openRoom -> link con send/close):

   - MQTT su broker pubblico (default): zero account, zero deploy. I due
     browser si iscrivono a un canale intitolato al codice partita. Va bene
     per GitHub Pages, dove non c'e' nessun backend da mettere.
   - Relay proprio (server/): WebSocket dedicato, privato e affidabile.

   In entrambi i casi il relay/broker non conosce le regole: inoltra e basta,
   l'arbitro resta l'host. */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/* Broker MQTT pubblici raggiungibili in WSS (quindi anche da pagine https). */
const DEFAULT_BROKER = 'wss://broker.emqx.io:8084/mqtt';
const MQTT_ROOT = 'arcanechess7x7';
const MQTT_KEEPALIVE = 30;          /* secondi: il will parte entro ~45s dal crollo */

/* Dopo il deploy incolla qui il tuo relay (es. 'wss://arcane-chess-relay.tuonome.workers.dev')
   e metti DEFAULT_TRANSPORT su 'relay' per usarlo di default. */
const DEFAULT_RELAY = '';
const DEFAULT_TRANSPORT = 'mqtt';   /* 'mqtt' | 'relay' */

const TRANSPORT_KEY = 'ac_transport';
const BROKER_KEY = 'ac_broker';
const RELAY_KEY = 'ac_relay';

let link = null;                    /* trasporto attivo: { send, close } */
let peerBound = false;              /* un avversario e' gia' entrato nella stanza */
let boundPeer = null;               /* chi e' il mio avversario, per nome di battesimo */

/* Su MQTT il canale e' una piazza: chi pubblica parla a tutti gli iscritti.
   Ogni messaggio porta il mittente, e chi ha un destinatario preciso viaggia
   con "to": cosi' un terzo che bussa non fa danni a chi sta gia' giocando. */
const myPeerId = Math.random().toString(36).slice(2, 10);

function makeCode(len) {
    let s = '';
    for (let i = 0; i < (len || 5); i++) s += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    return s;
}

/* ---- Configurazione ---- */
function store(key, value) {
    try {
        if (value) localStorage.setItem(key, value);
        else localStorage.removeItem(key);
    } catch (e) { /* ignore */ }
    return value;
}

function stored(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

/* Accetta wss://, https:// o il solo host: normalizza tutto in ws/wss. */
function normalizeWs(value) {
    let v = String(value || '').trim().replace(/\/+$/, '');
    if (!v) return '';
    if (/^https:\/\//i.test(v)) return 'wss://' + v.slice(8);
    if (/^http:\/\//i.test(v)) return 'ws://' + v.slice(7);
    if (/^wss?:\/\//i.test(v)) return v;
    return (location.protocol === 'https:' ? 'wss://' : 'ws://') + v;
}

function transport() {
    return stored(TRANSPORT_KEY) === 'relay' ? 'relay'
         : stored(TRANSPORT_KEY) === 'mqtt' ? 'mqtt'
         : DEFAULT_TRANSPORT;
}
function setTransport(kind) { store(TRANSPORT_KEY, kind === 'relay' ? 'relay' : 'mqtt'); }

function brokerUrl() { return normalizeWs(stored(BROKER_KEY) || DEFAULT_BROKER); }
function saveBroker(v) { const u = normalizeWs(v); store(BROKER_KEY, u); return u; }

function relayUrl() { return normalizeWs(stored(RELAY_KEY) || DEFAULT_RELAY); }
function saveRelay(v) { const u = normalizeWs(v); store(RELAY_KEY, u); return u; }

/* Indirizzo del trasporto attualmente scelto. */
function netAddress() { return transport() === 'relay' ? relayUrl() : brokerUrl(); }
function netAvailable() { return typeof WebSocket === 'function' && !!netAddress(); }

/* ============================== MQTT 3.1.1 (QoS 0) ==============================
   Solo quel che serve: CONNECT, SUBSCRIBE, PUBLISH, PING, DISCONNECT.
   Bastano un centinaio di righe e il gioco resta senza dipendenze esterne. */

function mqttLen(n) {
    const out = [];
    do {
        let b = n % 128;
        n = Math.floor(n / 128);
        if (n > 0) b |= 0x80;
        out.push(b);
    } while (n > 0);
    return out;
}

/* Stringa MQTT: 2 byte di lunghezza + UTF-8. Vale anche per il will. */
function mqttStr(s) {
    const bytes = new TextEncoder().encode(s);
    return [bytes.length >> 8, bytes.length & 255].concat(Array.from(bytes));
}

function mqttPacket(header, body) {
    return new Uint8Array([header].concat(mqttLen(body.length), body));
}

function mqttConnect(clientId, willTopic, willMsg) {
    let body = mqttStr('MQTT').concat([
        4,                                          /* livello 3.1.1 */
        0x06,                                       /* clean session + will */
        MQTT_KEEPALIVE >> 8, MQTT_KEEPALIVE & 255
    ]);
    body = body.concat(mqttStr(clientId), mqttStr(willTopic), mqttStr(willMsg));
    return mqttPacket(0x10, body);
}

function mqttSubscribe(id, topic) {
    return mqttPacket(0x82, [id >> 8, id & 255].concat(mqttStr(topic), [0]));
}

function mqttPublish(topic, payload) {
    return mqttPacket(0x30, mqttStr(topic).concat(Array.from(new TextEncoder().encode(payload))));
}

const MQTT_PING = new Uint8Array([0xc0, 0x00]);
const MQTT_BYE = new Uint8Array([0xe0, 0x00]);

function bytesConcat(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0);
    out.set(b, a.length);
    return out;
}

/* Estrae i pacchetti completi; quello che avanza resta per il giro dopo. */
function mqttDecode(state) {
    const out = [];
    for (;;) {
        const buf = state.buf;
        if (buf.length < 2) break;

        let len = 0, mult = 1, i = 1, complete = false;
        while (i < buf.length && i <= 4) {
            const b = buf[i++];
            len += (b & 127) * mult;
            mult *= 128;
            if ((b & 128) === 0) { complete = true; break; }
        }
        if (!complete || buf.length < i + len) break;

        out.push({ type: buf[0] >> 4, body: buf.subarray(i, i + len) });
        state.buf = buf.subarray(i + len);
    }
    return out;
}

function mqttReadPublish(body) {
    const tlen = (body[0] << 8) | body[1];
    const dec = new TextDecoder();
    return {
        topic: dec.decode(body.subarray(2, 2 + tlen)),
        payload: dec.decode(body.subarray(2 + tlen))
    };
}

/* ---- Stanza su broker MQTT ---- */
function openMqttRoom(code, role, handlers) {
    const base = brokerUrl();
    if (!base) { handlers.fail(); return null; }

    const mine = MQTT_ROOT + '/' + code + '/' + (role === 'host' ? 'h' : 'g');
    const theirs = MQTT_ROOT + '/' + code + '/' + (role === 'host' ? 'g' : 'h');

    let ws;
    try { ws = new WebSocket(base, 'mqtt'); }
    catch (e) { handlers.fail(); return null; }
    ws.binaryType = 'arraybuffer';

    const state = { buf: new Uint8Array(0) };
    let ping = 0;
    let lonely = 0;              /* il guest aspetta una risposta dall'host */
    let ready = false;
    let closed = false;

    const stop = () => {
        if (ping) { clearInterval(ping); ping = 0; }
        if (lonely) { clearTimeout(lonely); lonely = 0; }
    };

    const api = {
        send(obj) {
            if (!ready || ws.readyState !== WebSocket.OPEN) return;
            try { ws.send(mqttPublish(mine, JSON.stringify(obj))); } catch (e) { /* ignore */ }
        },
        close() {
            closed = true;
            stop();
            ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
            /* Uscita pulita: cosi' il broker non spara il will. */
            try { if (ws.readyState === WebSocket.OPEN) ws.send(MQTT_BYE); } catch (e) { /* ignore */ }
            try { ws.close(); } catch (e) { /* ignore */ }
        }
    };

    ws.onopen = () => {
        const id = 'ac' + Math.random().toString(36).slice(2, 12);
        /* Will: se cado di colpo, il broker avvisa l'altro al posto mio. */
        ws.send(mqttConnect(id, mine, JSON.stringify({ _r: 'peer-left', from: myPeerId })));
    };

    ws.onmessage = ev => {
        if (closed) return;
        state.buf = bytesConcat(state.buf, new Uint8Array(ev.data));

        mqttDecode(state).forEach(pkt => {
            if (pkt.type === 2) {                                  /* CONNACK */
                if (pkt.body[1] !== 0) { handlers.fail(); api.close(); return; }
                ws.send(mqttSubscribe(1, theirs));
                return;
            }
            if (pkt.type === 9) {                                  /* SUBACK */
                ready = true;
                ping = setInterval(() => {
                    try { ws.send(MQTT_PING); } catch (e) { /* ignore */ }
                }, (MQTT_KEEPALIVE / 2) * 1000);

                /* Nessun server tiene le stanze: se l'host non risponde,
                   il codice non esiste (o non e' piu' collegato). */
                if (role === 'guest') {
                    lonely = setTimeout(() => { if (!closed) handlers.control('no-room'); }, 9000);
                }
                handlers.control('joined');
                return;
            }
            if (pkt.type !== 3) return;                            /* solo PUBLISH */

            const msg = mqttReadPublish(pkt.body);
            if (msg.topic !== theirs) return;

            let m;
            try { m = JSON.parse(msg.payload); } catch (e) { return; }
            if (!m || typeof m !== 'object') return;
            if (m.from === myPeerId) return;              /* eco di me stesso */
            if (m.to && m.to !== myPeerId) return;        /* parlano con un altro */

            if (lonely) { clearTimeout(lonely); lonely = 0; }
            if (m._r) handlers.control(m._r, m);
            else handlers.game(m);
        });
    };

    ws.onerror = () => { if (!ready) handlers.fail(); };
    ws.onclose = () => { stop(); if (ready) handlers.gone(); else handlers.fail(); };

    return api;
}

/* ---- Stanza sul relay dedicato ---- */
function openRelayRoom(code, role, handlers) {
    const base = relayUrl();
    if (!base) { handlers.fail(); return null; }

    let ws;
    try { ws = new WebSocket(base + '/r/' + encodeURIComponent(code) + '?role=' + role); }
    catch (e) { handlers.fail(); return null; }

    let opened = false;
    let ping = 0;

    const api = {
        send(obj) {
            if (ws.readyState !== WebSocket.OPEN) return;
            try { ws.send(JSON.stringify(obj)); } catch (e) { /* ignore */ }
        },
        close() {
            if (ping) { clearInterval(ping); ping = 0; }
            ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
            try { ws.close(); } catch (e) { /* ignore */ }
        }
    };

    ws.onopen = () => {
        opened = true;
        /* Tiene sveglia la connessione: i messaggi sconosciuti vengono ignorati. */
        ping = setInterval(() => api.send({ t: 'ka' }), 25000);
    };

    ws.onmessage = ev => {
        let m;
        try { m = JSON.parse(ev.data); } catch (e) { return; }
        if (!m || typeof m !== 'object') return;
        if (m.to && m.to !== myPeerId) return;
        if (m._r) handlers.control(m._r, m);
        else handlers.game(m);
    };

    ws.onerror = () => { if (!opened) handlers.fail(); };
    ws.onclose = () => {
        if (ping) { clearInterval(ping); ping = 0; }
        if (opened) handlers.gone(); else handlers.fail();
    };

    return api;
}

/* handlers.control -> 'joined' | 'peer-joined' | 'peer-left' | 'no-room' | 'full'
   handlers.game    -> messaggi dell'avversario
   handlers.fail    -> non si e' riusciti ad agganciare il trasporto
   handlers.gone    -> connessione caduta dopo essere stata aperta */
function openRoom(code, role, handlers) {
    return transport() === 'relay'
        ? openRelayRoom(code, role, handlers)
        : openMqttRoom(code, role, handlers);
}

function destroyPeer() {
    if (link) { try { link.close(); } catch (e) { /* ignore */ } }
    link = null;
}

function send(msg) { if (link) link.send(Object.assign({ from: myPeerId }, msg)); }

/* ---- HOST ---- */
function setLobbyError(msg) {
    $('lobby-status').textContent = msg;
    $('lobby-status').parentElement.classList.add('error');
    $('lobby-spinner').style.display = 'none';
}

function hostGame() {
    const nick = getNickname();
    if (!nick) { toast(t('home.needNick'), 'warn'); $('nickname').focus(); return; }
    if (!netAvailable()) { toast(t('net.noaddr'), 'err'); openNetPanel(); return; }

    destroyPeer();
    mode = 'host';
    peerBound = false;
    boundPeer = null;
    showScreen('screen-lobby');

    let attempts = 0;
    let started = false;

    const open = () => {
        roomCode = makeCode(5);
        $('game-code').textContent = roomCode;
        $('lobby-status').textContent = t('lobby.connecting');
        $('lobby-status').parentElement.classList.remove('error');
        $('lobby-spinner').style.display = '';

        link = openRoom(roomCode, 'host', {
            control: (kind, m) => {
                if (kind === 'joined') { $('lobby-status').textContent = t('lobby.waiting'); return; }
                if (kind === 'peer-joined') { $('lobby-status').textContent = t('lobby.joined'); return; }
                if (kind === 'peer-left') {
                    /* Se cade un curioso che aveva bussato, non e' affar mio. */
                    if (boundPeer && m && m.from && m.from !== boundPeer) return;
                    if (started) onOpponentLeft();
                    else $('lobby-status').textContent = t('lobby.waiting');
                    return;
                }
                if (kind === 'full') {
                    /* codice gia' occupato: ne provo un altro */
                    if (attempts++ < 4) { destroyPeer(); open(); return; }
                    setLobbyError(t('join.failed'));
                }
            },
            game: m => { started = true; handleHostData(m, nick); },
            fail: () => setLobbyError(t('net.unreachable')),
            gone: () => { if (started) onOpponentLeft(); else setLobbyError(t('net.unreachable')); }
        });
    };
    open();
}

function handleHostData(m, myNick) {
    if (!m || typeof m !== 'object') return;

    if (m.t === 'hello') {
        /* Senza un server a fare da buttafuori, la stanza me la chiudo da solo:
           il rifiuto va indirizzato, o lo incasserebbe anche chi sta giocando. */
        if (peerBound && m.from !== boundPeer) { send({ _r: 'full', to: m.from }); return; }
        if (peerBound) return;

        peerBound = true;
        boundPeer = m.from || null;

        startGame('host', myNick, String(m.name || t('game.opponent')).slice(0, 14));
        send({ t: 'start', to: m.from, color: 'black', names, code: roomCode });
        syncToGuest();
        return;
    }

    /* Le mosse le accetto solo dal mio avversario, non da chi passava di li'. */
    if (boundPeer && m.from !== boundPeer) return;
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
    if (mode !== 'host') return;
    send({
        t: 'sync',
        board,
        turn,
        turnNo: turnCount,
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
    $('btn-do-join').disabled = false;
}

function clearJoinError() {
    $('join-status').textContent = '';
    $('join-status').parentElement.classList.remove('error');
    $('btn-join-net').hidden = true;
}

function joinGame() {
    const nick = getNickname();
    if (!nick) { toast(t('home.needNick'), 'warn'); showScreen('screen-home'); $('nickname').focus(); return; }
    if (!netAvailable()) { setJoinError(t('net.noaddr')); return; }

    const code = $('join-code').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length < 4) { setJoinError(t('join.badCode')); return; }

    destroyPeer();
    roomCode = code;
    mode = 'guest';
    clearJoinError();
    $('join-status').textContent = t('join.connecting');
    $('btn-do-join').disabled = true;

    let settled = false;      /* la stanza ci ha accettati */
    let handled = false;      /* errore gia' mostrato: la chiusura non lo sovrascrive */

    const fail = msg => {
        if (handled) return;
        handled = true;
        setJoinError(msg);
        destroyPeer();
        mode = 'bot';          /* tentativo chiuso: torno pronto per un altro invito */
    };

    link = openRoom(code, 'guest', {
        control: (kind, m) => {
            if (kind === 'joined') { settled = true; send({ t: 'hello', name: nick }); return; }
            if (kind === 'no-room') { fail(t('join.notFound')); return; }
            if (kind === 'full') { fail(t('join.busy')); return; }
            if (kind === 'peer-left') { onOpponentLeft(); return; }
        },
        game: m => handleGuestData(m, nick),
        fail: () => fail(t('net.unreachable')),
        gone: () => { if (settled && !handled) onOpponentLeft(); else fail(t('net.unreachable')); }
    });
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
    turnCount = s.turnNo || 1;
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

function paintNetMode() {
    const kind = transport();
    setClass($('seg-mqtt'), 'on', kind === 'mqtt');
    setClass($('seg-relay'), 'on', kind === 'relay');
    $('net-mqtt').hidden = kind !== 'mqtt';
    $('net-relay').hidden = kind === 'mqtt';
}

function openNetPanel() {
    $('broker-input').value = brokerUrl();
    $('relay-input').value = relayUrl();
    paintNetMode();
    $('net-report').hidden = true;
    $('net-report').innerHTML = '';
    openModal('modal-net');
}

function pickTransport(kind) {
    setTransport(kind);
    paintNetMode();
    $('net-report').hidden = true;
}

function saveNetConfig() {
    const relay = transport() === 'relay';
    const input = $(relay ? 'relay-input' : 'broker-input');
    const raw = input.value.trim();
    const url = relay ? saveRelay(raw) : saveBroker(raw);

    if (raw && !url) { toast(t('netcfg.invalid'), 'err'); return; }
    input.value = relay ? url : brokerUrl();
    toast(t('netcfg.saved'));
}

function resetNetConfig() {
    if (transport() === 'relay') { saveRelay(''); $('relay-input').value = ''; }
    else { saveBroker(''); $('broker-input').value = brokerUrl(); }
    $('net-report').hidden = true;
    toast(t('netcfg.resetDone'));
}

function reportRow(cls, icon, text) {
    return '<li class="' + cls + '"><i class="fas ' + icon + '"></i><span>' + escapeHtml(text) + '</span></li>';
}

/* Apre una stanza usa-e-getta sul relay: se risponde "joined" e' vivo. */
function probeRelay(url, ms) {
    return new Promise(resolve => {
        let ws;
        let done = false;
        const finish = ok => {
            if (done) return;
            done = true;
            if (ws) { ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null; try { ws.close(); } catch (e) { /* ignore */ } }
            resolve(ok);
        };

        try { ws = new WebSocket(url + '/r/TEST' + makeCode(4) + '?role=host'); }
        catch (e) { resolve(false); return; }

        ws.onmessage = ev => {
            let m;
            try { m = JSON.parse(ev.data); } catch (e) { return; }
            finish(!!(m && m._r === 'joined'));
        };
        ws.onerror = () => finish(false);
        ws.onclose = () => finish(false);
        setTimeout(() => finish(false), ms);
    });
}

/* Giro completo sul broker: connetti, iscriviti a un canale usa-e-getta,
   pubblica, e verifica che il messaggio torni indietro. */
function probeMqtt(url, ms) {
    return new Promise(resolve => {
        let ws;
        let done = false;
        const topic = MQTT_ROOT + '/probe/' + makeCode(8);
        const finish = ok => {
            if (done) return;
            done = true;
            if (ws) { ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null; try { ws.close(); } catch (e) { /* ignore */ } }
            resolve(ok);
        };

        try { ws = new WebSocket(url, 'mqtt'); }
        catch (e) { resolve(false); return; }
        ws.binaryType = 'arraybuffer';

        const state = { buf: new Uint8Array(0) };

        ws.onopen = () => ws.send(mqttConnect('ac' + Math.random().toString(36).slice(2, 12), topic, 'x'));
        ws.onmessage = ev => {
            state.buf = bytesConcat(state.buf, new Uint8Array(ev.data));
            mqttDecode(state).forEach(pkt => {
                if (pkt.type === 2) {
                    if (pkt.body[1] !== 0) { finish(false); return; }
                    ws.send(mqttSubscribe(1, topic));
                } else if (pkt.type === 9) {
                    ws.send(mqttPublish(topic, 'ping'));
                } else if (pkt.type === 3) {
                    finish(mqttReadPublish(pkt.body).payload === 'ping');
                }
            });
        };
        ws.onerror = () => finish(false);
        ws.onclose = () => finish(false);
        setTimeout(() => finish(false), ms);
    });
}

function runNetTest() {
    const btn = $('btn-net-test');
    const box = $('net-report');
    const url = netAddress();

    box.hidden = false;

    if (!url) {
        box.innerHTML = reportRow('ko', 'fa-circle-xmark', t('netcfg.none')) +
            '<li class="verdict">' + escapeHtml(t('netcfg.verdictNone')) + '</li>';
        return;
    }

    btn.disabled = true;
    box.innerHTML = reportRow('warn', 'fa-hourglass-half', t('netcfg.testing'));

    const probe = transport() === 'relay' ? probeRelay(url, 8000) : probeMqtt(url, 10000);
    probe.then(ok => {
        box.innerHTML =
            (ok ? reportRow('ok', 'fa-circle-check', t('netcfg.ok') + ' - ' + url)
                : reportRow('ko', 'fa-circle-xmark', t('netcfg.ko') + ' - ' + url)) +
            '<li class="verdict">' + escapeHtml(ok ? t('netcfg.verdictGood') : t('netcfg.verdictBad')) + '</li>';
        btn.disabled = false;
    });
}

/* ---- Link d'invito: codice partita + impostazioni di rete ---- */
/* L'indirizzo viaggia sempre nel link: i due giocatori devono trovarsi sullo
   stesso punto d'incontro, altrimenti non si vedono. */
function inviteLink(code) {
    const base = location.href.split('#')[0];
    let hash = '#g=' + encodeURIComponent(code);

    if (transport() === 'relay') {
        const url = relayUrl();
        if (url) hash += '&s=' + encodeURIComponent(url);
    } else {
        const url = brokerUrl();
        if (url) hash += '&m=' + encodeURIComponent(url);
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
    if (params.s) out.relay = normalizeWs(decodeURIComponent(params.s));
    if (params.m) out.broker = normalizeWs(decodeURIComponent(params.m));
    return out.code ? out : null;
}

/* Le impostazioni dell'invito hanno la precedenza sulle mie: se non uso lo
   stesso punto d'incontro dell'host, la partita non parte proprio. */
function applyInvite() {
    const invite = readInvite();
    if (!invite) return;

    try { history.replaceState(null, '', location.href.split('#')[0]); } catch (e) { /* ignore */ }

    if (invite.relay && (invite.relay !== relayUrl() || transport() !== 'relay')) {
        saveRelay(invite.relay);
        setTransport('relay');
        toast(t('netcfg.imported'));
    } else if (invite.broker && (invite.broker !== brokerUrl() || transport() !== 'mqtt')) {
        saveBroker(invite.broker);
        setTransport('mqtt');
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
    $('seg-mqtt').addEventListener('click', () => pickTransport('mqtt'));
    $('seg-relay').addEventListener('click', () => pickTransport('relay'));
    $('btn-net-save').addEventListener('click', saveNetConfig);
    $('btn-net-reset').addEventListener('click', resetNetConfig);
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
    window.addEventListener('hashchange', () => {
        if (!$('screen-game').classList.contains('active')) applyInvite();
    });
}

/* ============================== AVVIO ============================== */
function boot() {
    bindEvents();
    $('nickname').value = localStorage.getItem('ac_nick') || '';
    preloadSkin(skin);
    setLanguage(lang);
    showScreen('screen-home');
    applyInvite();
}

boot();
