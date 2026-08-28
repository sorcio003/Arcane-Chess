# Arcane Chess 7x7

**Arcane Chess 7x7** è un gioco da browser che mescola la profondità tattica degli scacchi con le
meccaniche di un card game. Su una griglia 7x7 le tue mosse non sono libere: sono dettate dalle
carte che hai in mano. Gioca contro il Bot oppure sfida un amico online condividendo un codice partita.

Interfaccia bilingue (IT / EN), tema scuro in stile client di scacchi online, completamente responsive
(desktop, tablet e mobile).

## 🎮 Come si gioca

* Ogni turno hai **1 azione**. Un contatore sempre visibile mostra quante te ne restano.
* Il flusso è sempre lo stesso: **scegli una carta → scegli una pedina → scegli la casella**.
  La scacchiera evidenzia le pedine utilizzabili e le destinazioni valide.
* Le **carte gratuite** non consumano l'azione (vedi sotto).
* A fine turno tieni al massimo **3 carte** in mano e ne peschi 1.
* **Vinci catturando il Re avversario.**

## ♟️ Trasformazioni

Le pedine possono evolvere lungo una scala di potenza:

```
Pedone  →  Cavallo  →  Torre  →  Alfiere  →  Regina
```

* Una pedina **già trasformata può evolvere ancora**, ma solo verso un grado **più alto**
  (una Torre può diventare Alfiere o Regina, mai tornare Cavallo).
* Il **Re è l'unica pedina che non può mai trasformarsi**.
* Un **pedone che raggiunge l'ultima traversa diventa Regina**, esattamente come negli scacchi veri.

## 🃏 Le carte (mazzo da 19)

### Azioni

| Carta | Copie | Effetto |
| --- | --- | --- |
| **Movimento** | 3 | Muovi una pedina secondo il suo schema. |
| **Attacco** | 3 | Cattura una pedina nemica. |
| **Mossa & Attacco** | 3 | Muovi oppure cattura. |
| **Muovi, Trasforma e Mangia** ⭐ | 1 | Muovi o cattura, **poi la pedina sale di un grado**. La carta epica del mazzo. |

### Magie

| Carta | Copie | Effetto |
| --- | --- | --- |
| **Evoca Torre** | 1 | Pedina ferma da 3 turni → diventa Torre. |
| **Evoca Regina** | 1 | Pedina con 3 uccisioni → diventa Regina. |
| **Evoca Alfiere** | 1 | Muovi in diagonale e diventa Alfiere. |
| **Evoca Cavallo** | 1 | Muovi a L e diventa Cavallo. |
| **Azione Extra** 🆓 | 2 | **+1 azione** questo turno: ne giochi due. Non consuma l'azione. |
| **Pesca una carta** 🆓 | 2 | Peschi **subito** 1 carta e puoi usarla nello stesso turno. Non consuma l'azione. |
| **Trappola** | 1 | Piazza una trappola su una tua pedina: se muore, peschi 1 carta. Sulla scacchiera compare una **goccia di sangue rossa sopra l'icona di una carta**. |

🆓 = carta gratuita, non spende il punto azione.

### La passiva del Re (Negromanzia)

Se al Re non resta più nessun soldato e cattura un pedone nemico, lo **resuscita** come pedone
del proprio colore.

## 🌐 Modalità di gioco

* **Contro il Bot** — partita locale, nessuna connessione richiesta. Il bot gioca il proprio mazzo,
  sfrutta le carte gratuite e privilegia le catture.
* **Online con un amico** — nessun login: basta un **nickname**.
  * Chi crea la partita ottiene un **codice univoco** da condividere (es. `8VUC8`).
  * L'amico entra dalla schermata *"Entra con un codice"*.
  * La connessione è **diretta browser-a-browser** (WebRTC via PeerJS), senza server di gioco.
    Chi ospita la partita fa da arbitro: valida ogni mossa dell'avversario e sincronizza lo stato.
  * Chi ospita gioca il Bianco, chi entra gioca il Nero con la scacchiera ruotata dal suo lato.

## 🚀 Avvio

Il gioco è interamente client-side.

1. Clona o scarica il repository.
2. Apri `index.html` in un browser moderno (Chrome, Firefox, Safari, Edge).

Per la modalità online serve una connessione a Internet (per il broker di segnalazione WebRTC);
la partita contro il Bot funziona anche offline. Se preferisci servire i file via HTTP:

```bash
python -m http.server 8777
```

## 🛠️ Tecnologie

* **HTML5** — struttura a schermate (home, lobby, join, partita).
* **CSS3** — tema scuro custom, layout responsive, nessun framework.
* **JavaScript vanilla** — motore di gioco, regole, rendering, bot e networking.
* **PeerJS (WebRTC)** — connessione P2P per le partite online.
* **Font Awesome / Google Fonts** — icone e tipografia.

## 📁 Struttura

```
index.html    schermate: home, lobby, join, partita, modali
style.css     tema, scacchiera, carte, layout responsive
script.js     i18n, regole, motore, bot, rete P2P, rendering
favicon.svg   icona (Re + carta + goccia di sangue)
```

## 🤝 Contribuire

Fork e pull request sono benvenute: nuove carte, scacchiera più grande, un bot più intelligente.

---
*Esperimento ibrido scacchi / card game.*
