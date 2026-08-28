# Arcane Chess 

Welcome to **Arcane Chess 7x7**, a unique browser-based strategy game that blends the tactical depth of traditional chess with the dynamic mechanics of a deck-building card game. Engage in fast-paced skirmishes against an AI opponent on a custom 7x7 grid!

## 🎮 Gameplay Overview

Unlike traditional chess, your moves are dictated by the cards in your hand. You and your opponent (the Bot) both start with a 15-card deck.

Each turn, you receive **1 Action Point** to spend. You must select a card from your hand to dictate how you interact with your pieces on the board. Once you run out of action points, your turn ends, and you discard down to a maximum of 3 cards before redrawing.

### 🎯 Objective
**Defeat the enemy King** to win the game!

## ✨ Key Features

* **Card-Driven Combat:** Use *Action Cards* (Move, Attack, Move & Attack) to maneuver across the board, or use *Spell Cards* to turn the tide of battle.
* **Dynamic Piece Promotion:** Pawns can evolve into powerful advanced pieces using specific spell cards:
  * **Rook (Tower):** Achieved if a pawn stays still for 3 turns.
  * **Queen:** Achieved if a pawn secures 3 kills.
  * **Bishop & Knight:** Instant transformations accompanied by special movement patterns.
* **Integrated PvE Bot:** Play against a built-in AI (Black) that uses its own deck, randomly shuffles cards, and prioritizes attacks.
* **Tactical Traps:** Place traps on your pieces. If a trapped piece is captured, you get to draw an extra card.
* **The King's Passive (Necromancy):** If the King has no pawns left in his army and successfully kills an enemy pawn, he resurrects that fallen piece as a pawn for his own side!

## 🃏 Card System

The game features a deck containing various cards:
* **Actions (Blue):** Standard Move, Standard Attack, or flexible Move/Attack combos.
* **Spells (Purple):** 
  * Draw extra cards.
  * Gain immediate extra action points.
  * Trigger piece evolutions (Tower, Queen, Bishop, Knight).
  * Place traps on specific pieces.

## 🚀 Installation & Setup

This game is completely client-side and requires no server or dependencies.

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
3. Start playing immediately!

## 🛠️ Technologies Used

* **HTML5:** Semantic game structure.
* **CSS3 & Bootstrap 5:** Responsive grid layout, flexbox card styling, and modern UI components.
* **Vanilla JavaScript:** Game logic, board rendering, card deck management, rules engine, and AI behavior.

## 🤝 Contributing
Feel free to fork this project and submit pull requests. You can add new cards, expand the board, or improve the Bot's AI logic!

---
*Created as a hybrid Chess/Card Game experiment.*
