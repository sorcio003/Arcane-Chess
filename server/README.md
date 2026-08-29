# Arcane Chess relay

Il relay mette in comunicazione i due browser di una partita online. È deliberatamente stupido:
**inoltra i messaggi e basta**. Non conosce le regole, non tiene lo stato della partita, non
valida le mosse — l'arbitro resta l'host, esattamente come prima.

Serve perché due browser dietro NAT non possono parlarsi direttamente. Con il relay non c'è
niente da configurare sui router: entrambi i giocatori aprono una connessione **in uscita**, che
passa ovunque.

Ci sono due implementazioni della stessa identica logica. Scegline una.

---

## Opzione A — Cloudflare Workers (consigliata)

Serverless, piano gratuito, HTTPS/WSS incluso, niente macchina da tenere accesa. Una
[Durable Object](https://developers.cloudflare.com/durable-objects/) per stanza garantisce che i
due giocatori finiscano nella stessa istanza anche partendo da continenti diversi.

```bash
cd server
npx wrangler login
npx wrangler deploy
```

Al termine `wrangler` stampa l'indirizzo, tipo:

```
https://arcane-chess-relay.tuonome.workers.dev
```

Incollalo nel gioco sotto **Rete** (lo accetta anche in forma `https://`, lo converte in `wss://`
da solo). In alternativa, per non doverlo fare a ogni browser, mettilo direttamente nel codice:

```js
// script.js
const DEFAULT_RELAY = 'wss://arcane-chess-relay.tuonome.workers.dev';
```

## Opzione B — Node

Zero dipendenze: il protocollo WebSocket è implementato dentro `relay.js`, quindi basta Node.

```bash
node server/relay.js 8790
```

Va bene per provare in locale (`ws://localhost:8790`) o su una VPS. Se la pagina del gioco è
servita in **https**, il relay deve essere in **wss** — quindi su una VPS mettici davanti un
reverse proxy con TLS (Caddy, nginx), altrimenti il browser rifiuta la connessione mista.

---

## Protocollo

Il client si collega a:

```
wss://<relay>/r/<CODICE>?role=host|guest
```

Il relay parla solo con messaggi di servizio, riconoscibili dal campo `_r`:

| Messaggio | Quando |
| --- | --- |
| `{"_r":"joined"}` | sei dentro la stanza |
| `{"_r":"peer-joined"}` | l'altro giocatore è arrivato (solo all'host) |
| `{"_r":"peer-left"}` | l'altro giocatore se n'è andato |
| `{"_r":"no-room"}` | codice inesistente: nessun host ha aperto quella stanza |
| `{"_r":"full"}` | stanza già occupata da due giocatori |

Tutto il resto è roba di gioco (`hello`, `start`, `sync`, `act`, `bye`) e viene inoltrato
all'altro giocatore così com'è, senza essere interpretato.

Chi crea la partita entra come `host` e apre la stanza; chi entra come `guest` la deve trovare
già aperta. Quando escono entrambi, la stanza sparisce.

## Costi e traffico

Una partita a scacchi è minuscola: qualche KB a mossa. Il piano gratuito di Cloudflare
(100.000 richieste al giorno) copre largamente l'uso tra amici.
