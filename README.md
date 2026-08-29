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
  * Both browsers connect to a small **relay** that forwards the messages. The host stays the
    referee: it validates every move from the opponent and syncs the state.
  * The host plays White; the joiner plays Black with the board flipped to their side.

## 📡 The relay (playing across different networks)

Two browsers sitting behind home routers cannot open a direct connection to each other — and on
many lines (mobile, CGNAT, symmetric NAT) they never will, no matter how clever the NAT
traversal gets. So online matches go through a **relay**: both players open an **outbound**
connection to it, which passes through any network. No ports to forward, no STUN, no TURN.

The relay is deliberately dumb — it forwards messages and nothing else. It does not know the
rules, does not keep game state, does not validate moves. **The host is still the referee.**

It has to be deployed once. The code is in [`server/`](server/), in two interchangeable flavours:

* **Cloudflare Workers** (recommended) — serverless, free plan, WSS included, one Durable Object
  per room:

  ```bash
  cd server && npx wrangler deploy
  ```

* **Node** — zero dependencies, the WebSocket protocol is implemented in the file itself:

  ```bash
  node server/relay.js 8790
  ```

Then paste the address into the game under **Rete / Network** — `https://` is accepted and
converted to `wss://` automatically. To avoid doing it in every browser, put it straight into the
source instead:

```js
// script.js
const DEFAULT_RELAY = 'wss://arcane-chess-relay.yourname.workers.dev';
```

**The invite link carries the address along**, so whoever creates the game can just share the
link and the other player has nothing to configure.

**Test button** — *Rete → Test the connection* opens a throwaway room on the relay and tells you
whether it answered.

See [`server/README.md`](server/README.md) for the deploy details and the wire protocol.

> Note: this used to be a direct browser-to-browser connection over WebRTC (PeerJS). It only
> worked when both players were on the same Wi-Fi, because PeerJS's default TURN servers
> (`eu-0/us-0.turn.peerjs.com`) no longer resolve, leaving no relay to fall back on. The relay
> replaces that whole layer — and removes the last external dependency at runtime.

## 🚀 Getting started

The game is entirely client-side.

1. Clone or download the repository.
2. Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge).

Playing against the Bot works offline. Online mode needs a relay — see
[The relay](#-the-relay-playing-across-different-networks). If you prefer serving the files over
HTTP:

```bash
python -m http.server 8777
```

## 🛠️ Built with

* **HTML5** — screen-based structure (home, lobby, join, match).
* **CSS3** — custom dark theme, responsive layout, no framework.
* **Vanilla JavaScript** — game engine, rules, rendering, bot and networking. No frameworks, no
  runtime dependencies: the online transport is a plain WebSocket.
* **Cloudflare Workers / Node** — the relay for online matches (see the `server/` folder).
* **Font Awesome / Google Fonts** — icons and typography.

Rendering is **incremental**: the board and the hand are built once, and only what actually
changed is updated. Animations therefore fire only on the piece that moves, transforms or gets
captured — nothing flickers or restarts on every action.

## 📁 Structure

```
index.html    screens: home, lobby, join, match, modals
style.css     theme, board, cards, responsive layout
script.js     i18n, rules, engine, bot, relay networking, rendering
favicon.svg   icon (King + card + blood drop)
server/       the relay: worker.js (Cloudflare) and relay.js (Node)
```

## 🤝 Contributing

Forks and pull requests are welcome: new cards, a bigger board, a smarter bot.

---
*A hybrid chess / card game experiment.*
