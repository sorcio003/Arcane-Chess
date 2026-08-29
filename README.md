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

## 🃏 The cards (19-card deck)

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

## 🌐 Game modes

* **Against the Bot** — local match, no connection required. The bot plays its own deck,
  exploits free cards and prioritizes captures.
* **Online with a friend** — no login: just a **nickname**.
  * Whoever creates the game gets a **unique code** to share (e.g. `8VUC8`), or a
    **ready-made invite link** that opens the game with the code already filled in.
  * The friend joins from the *"Join with a code"* screen, or by opening the link.
  * The connection is **direct browser-to-browser** (WebRTC via PeerJS), with no game server.
    The host acts as referee: it validates every move from the opponent and syncs the state.
  * The host plays White; the joiner plays Black with the board flipped to their side.

## 📡 Playing across different networks

A direct browser-to-browser connection has to punch through both players' routers. Two servers
are involved, and they do different jobs:

| | What it does | When it is enough |
| --- | --- | --- |
| **STUN** | Tells a browser its own public address. | Same Wi-Fi, or two "friendly" home routers. |
| **TURN** | Relays the traffic when a direct path cannot be opened. | Everything else: mobile/CGNAT, corporate firewalls, symmetric NAT. |

The game ships with a list of public STUN servers, so **same-network games work out of the
box**. Across different networks a **TURN server is usually required** — and there is no
reliable free public one, so you have to point the game at your own.

Open **Rete / Network** (home screen footer) and paste your TURN server:

```
turn:turn.example.com:3478|username|password
```

One server per line. You can also paste the JSON block that providers hand you
(`[{"urls": "...", "username": "...", "credential": "..."}]`) — it is accepted as is. The
settings live in your browser's `localStorage`; nothing is sent anywhere.

Where to get one:

* **[metered.ca](https://www.metered.ca/tools/openrelay/)** — free plan, enough for a
  turn-based game (it only carries a few KB per move).
* **[coturn](https://github.com/coturn/coturn)** — self-hosted, if you have a VPS.
* Cloudflare Calls, Twilio, ExpressTurn and similar also work.

**Only one of the two players needs it.** Whoever configures it should share the game with
*"Copy the invite link"*: the link carries the TURN configuration along, so the other player
has nothing to set up.

**Test button** — *Rete → Test the connection* checks what actually works on your network and
says so in plain language: STUN reachable, TURN reachable, and whether you can currently play
across different networks or only on the same Wi-Fi.

> Note: PeerJS ships default TURN servers (`eu-0/us-0.turn.peerjs.com`) that no longer resolve.
> That is why cross-network games used to fail silently while same-Wi-Fi games worked. The game
> now sets its own ICE configuration instead of relying on that default.

## 🚀 Getting started

The game is entirely client-side.

1. Clone or download the repository.
2. Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge).

Online mode needs an internet connection (for the WebRTC signaling broker); playing against the
Bot works offline too. To play with someone on a different network, see
[Playing across different networks](#-playing-across-different-networks). If you prefer serving
the files over HTTP:

```bash
python -m http.server 8777
```

## 🛠️ Built with

* **HTML5** — screen-based structure (home, lobby, join, match).
* **CSS3** — custom dark theme, responsive layout, no framework.
* **Vanilla JavaScript** — game engine, rules, rendering, bot and networking.
* **PeerJS (WebRTC)** — P2P connection for online matches.
* **Font Awesome / Google Fonts** — icons and typography.

Rendering is **incremental**: the board and the hand are built once, and only what actually
changed is updated. Animations therefore fire only on the piece that moves, transforms or gets
captured — nothing flickers or restarts on every action.

## 📁 Structure

```
index.html    screens: home, lobby, join, match, modals
style.css     theme, board, cards, responsive layout
script.js     i18n, rules, engine, bot, P2P networking (STUN/TURN), rendering
favicon.svg   icon (King + card + blood drop)
```

## 🤝 Contributing

Forks and pull requests are welcome: new cards, a bigger board, a smarter bot.

---
*A hybrid chess / card game experiment.*
