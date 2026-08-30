# Arcane Chess 7x7

**Arcane Chess 7x7** is a browser game that blends the tactical depth of chess with card game
mechanics. On a 7x7 grid your moves are not free: they are dictated by the cards in your hand.
Play against the Bot, or challenge a friend online by sharing a game code.

Bilingual interface (IT / EN), dark theme inspired by online chess clients, fully responsive
(desktop, tablet and mobile).

## 🎮 How to play

* Each turn you get **1 action**. An always-visible counter shows how many you have left.
* The flow is always the same: **pick a card → pick a piece → pick the square**.
  The board highlights the usable pieces and the valid destinations.
* **Free cards** do not consume your action (see below).
* At the end of a turn you keep at most **3 cards** in hand and draw 1.
* A **turn counter** next to the action points tracks how many turns have been played
  (it advances every time the turn passes, so White's opening turn is 1 and Black's reply is 2).
* **You win by capturing the enemy King.**

## ♟️ Transformations

Pieces can evolve along a power ladder:

```
Pawn  →  Knight  →  Rook  →  Bishop  →  Queen
```

* An **already transformed piece can evolve again**, but only into a **higher** rank
  (a Rook can become a Bishop or a Queen, never back to a Knight).
* The **King is the only piece that can never transform**.
* A **pawn reaching the far rank becomes a Queen**, exactly like in real chess.

## 🃏 The cards (19-card deck + 1 unlockable)

### Actions

| Card | Copies | Effect |
| --- | --- | --- |
| **Movement** | 3 | Move a piece along its own pattern. |
| **Attack** | 3 | Capture an enemy piece. |
| **Move & Attack** | 3 | Move or capture. |
| **Move, Transform & Eat** ⭐ | 1 | Move or capture, **then the piece ranks up**. The epic card of the deck. |

### Spells

| Card | Copies | Effect |
| --- | --- | --- |
| **Summon Rook** | 1 | Piece that has not moved for 3 turns → becomes a Rook. |
| **Summon Queen** | 1 | Piece with 3 kills → becomes a Queen. |
| **Summon Bishop** | 1 | Move diagonally and become a Bishop. |
| **Summon Knight** | 1 | Move in an L and become a Knight. |
| **Extra Action** 🆓 | 2 | **+1 action** this turn: you play two. Does not consume your action. |
| **Draw a card** 🆓 | 2 | Draw 1 card **immediately** and play it on the same turn. Does not consume your action. |
| **Trap** | 1 | Place a trap on one of your pieces: if it dies, you draw 1 card. On the board it shows as a **red blood drop over a card icon**. |

🆓 = free card, does not spend the action point.

### The King's passive (Necromancy)

If the King has no soldiers left and captures an enemy pawn, he **resurrects** it as a pawn
of his own color.

### Last stand (only the King left)

When a player is reduced to their **King alone**, transformation spells become dead cards — the
King never transforms — so the deck changes shape:

* Spells still in hand are **discarded and replaced**, and from then on you only draw
  **Movement**, **Attack** and **Move & Attack**.
* One extra card unlocks, and it exists **only** in this situation:

| Card | Effect |
| --- | --- |
| **Long-Range Attack** 🎯 | Capture an enemy **up to 2 squares away without moving**. The King strikes and stays put — no need to walk into danger. |

The state is checked continuously, not once: if Necromancy gives the King a pawn back, the
player is no longer alone and goes straight back to drawing from their normal deck.

The two mechanics combine — a lone King can strike a pawn two squares away and resurrect it
right there, on the target square, without ever leaving his own.

## 🌐 Game modes

* **Against the Bot** — local match, no connection required. The bot plays its own deck,
  exploits free cards and prioritizes captures.
* **Online with a friend** — no login: just a **nickname**.
  * Whoever creates the game gets a **unique code** to share (e.g. `8VUC8`), or a
    **ready-made invite link** that opens the game with everything already filled in.
  * The friend joins from the *"Join with a code"* screen, or by opening the link.
  * Both browsers connect to a **meeting point** that forwards the messages. The host stays the
    referee: it validates every move from the opponent and syncs the state.
  * The host plays White; the joiner plays Black with the board flipped to their side.

## 📡 Playing across different networks

Two browsers behind home routers cannot open a direct connection to each other — and on many
lines (mobile, CGNAT, symmetric NAT) they never will, however clever the NAT traversal. So the
two players meet at a **third point** that both of them reach with an **outbound** connection,
which passes through any network. No ports to forward, no STUN, no TURN.

That meeting point never understands the game: it forwards messages and nothing else. It does
not know the rules, keeps no game state, validates nothing. **The host is still the referee.**

There are two ways to get one, switchable under **Rete / Network**.

### Public MQTT broker — the default, nothing to set up

Out of the box the game talks to a **public MQTT broker** over WebSocket. Nothing to deploy,
no account, no key: it just works, which makes it a good fit for **GitHub Pages**, where you can
only publish static files. The two players subscribe to a channel named after the game code and
trade moves there.

The client is written from scratch in `script.js` — about a hundred lines of MQTT 3.1.1 over
WebSocket — so the game still ships with **zero runtime dependencies**.

Preconfigured broker, with two alternates if it ever misbehaves:

```
wss://broker.emqx.io:8084/mqtt          (default)
wss://test.mosquitto.org:8081/mqtt
wss://broker.hivemq.com:8884/mqtt
```

> ⚠️ **These are public test brokers.** No uptime guarantee, and — more importantly — **the
> messages are not encrypted**: anyone who knew your game code could read along or interfere.
> The code is 5 characters out of a 32-letter alphabet (~33 million combinations), so stumbling
> onto yours is unlikely, but this is a door without a lock on a quiet street. Fine for a game
> with friends; not for anything you would mind being seen.

Since MQTT has no notion of a private recipient, the game addresses its own messages: every
message carries a sender, replies meant for one player carry a recipient, and the host only
accepts moves from the opponent it actually admitted. A third player knocking on a busy room
gets turned away without disturbing the match in progress.

### Your own relay — private and more reliable

If you would rather not depend on a public service, deploy the relay in [`server/`](server/)
once — Cloudflare Workers, free plan, then never touch it again:

```bash
cd server && npx wrangler deploy
```

Paste the address it prints under **Rete → Server tuo**. Note this does **not** conflict with
GitHub Pages: Pages hosts the game, Cloudflare hosts the relay, they are two different
addresses. And a Worker is not a server you start — nothing runs on your machine, which can be
off while you play from your phone. (`node server/relay.js` is the same relay for local testing
or a VPS.)

To make it the default for everyone instead of a per-browser setting:

```js
// script.js
const DEFAULT_TRANSPORT = 'relay';
const DEFAULT_RELAY = 'wss://arcane-chess-relay.yourname.workers.dev';
```

### Either way

**Both players must use the same meeting point**, or they simply will not see each other. The
**invite link carries the address along**, so whoever opens it has nothing to configure — that
is the recommended way to invite someone.

**Test button** — *Rete → Test the connection* really opens a throwaway channel, sends a message
and waits for it to come back, then says plainly whether it worked.

> Note: this used to be a direct browser-to-browser connection over WebRTC (PeerJS). It only
> worked when both players were on the same Wi-Fi, because PeerJS's default TURN servers
> (`eu-0/us-0.turn.peerjs.com`) no longer resolve, leaving no relay to fall back on.

## 🚀 Getting started

The game is entirely client-side.

1. Clone or download the repository.
2. Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge).

Playing against the Bot works offline. Online mode works out of the box — see
[Playing across different networks](#-playing-across-different-networks). If you prefer serving
the files over HTTP:

```bash
python -m http.server 8777
```

## 🛠️ Built with

* **HTML5** — screen-based structure (home, lobby, join, match).
* **CSS3** — custom dark theme, responsive layout, no framework.
* **Vanilla JavaScript** — game engine, rules, rendering, bot and networking. No frameworks, no
  runtime dependencies: the online transport is a plain WebSocket.
* **MQTT over WebSocket** — hand-rolled client (~100 lines) for the default public meeting point.
* **Cloudflare Workers / Node** — optional private relay for online matches (see the `server/` folder).
* **Font Awesome / Google Fonts** — icons and typography.

Rendering is **incremental**: the board and the hand are built once, and only what actually
changed is updated. Animations therefore fire only on the piece that moves, transforms or gets
captured — nothing flickers or restarts on every action.

## 📁 Structure

```
index.html    screens: home, lobby, join, match, modals
style.css     theme, board, cards, responsive layout
script.js     i18n, rules, engine, bot, networking (MQTT + relay), rendering
favicon.svg   icon (King + card + blood drop)
server/       the relay: worker.js (Cloudflare) and relay.js (Node)
```

## 🤝 Contributing

Forks and pull requests are welcome: new cards, a bigger board, a smarter bot.

---
*A hybrid chess / card game experiment.*
