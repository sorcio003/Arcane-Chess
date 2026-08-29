/* ============================================================================
   Arcane Chess 7x7 - relay WebSocket su Cloudflare Workers
   ---------------------------------------------------------------------------
   Stessa logica di server/relay.js, ma serverless: una Durable Object per
   stanza, cosi' i due giocatori finiscono sempre nella stessa istanza anche
   con i data center sparsi per il mondo.

   Deploy:  cd server && npx wrangler deploy
   Client:  wss://<nome>.<subdominio>.workers.dev
============================================================================ */

const ROOM_PATH = /^\/r\/([A-Za-z0-9]{4,12})$/;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const match = ROOM_PATH.exec(url.pathname);

        if (!match) {
            return new Response('Arcane Chess relay\n', {
                headers: { 'content-type': 'text/plain; charset=utf-8' }
            });
        }
        if (request.headers.get('Upgrade') !== 'websocket') {
            return new Response('expected websocket', { status: 426 });
        }

        /* Il codice partita e' il nome della Durable Object: stesso codice,
           stessa istanza, ovunque si trovino i due giocatori. */
        const id = env.ROOMS.idFromName(match[1].toUpperCase());
        return env.ROOMS.get(id).fetch(request);
    }
};

export class Room {
    constructor(state) {
        this.state = state;
        this.host = null;
        this.guest = null;
    }

    async fetch(request) {
        const url = new URL(request.url);
        const role = url.searchParams.get('role') === 'host' ? 'host' : 'guest';

        const pair = new WebSocketPair();
        const client = pair[0];
        const server = pair[1];

        server.accept();
        this.attach(server, role);

        return new Response(null, { status: 101, webSocket: client });
    }

    attach(ws, role) {
        /* Chi crea la partita apre la stanza; chi entra la deve trovare aperta. */
        if (role === 'host') {
            if (this.host) return this.reject(ws, 'full', 4001);
            this.host = ws;
        } else {
            if (!this.host) return this.reject(ws, 'no-room', 4004);
            if (this.guest) return this.reject(ws, 'full', 4001);
            this.guest = ws;
        }

        send(ws, { _r: 'joined', role });
        if (role === 'guest') send(this.host, { _r: 'peer-joined' });

        /* Messaggio di gioco: inoltrato tale e quale, senza interpretarlo. */
        ws.addEventListener('message', ev => {
            const mate = ws === this.host ? this.guest : this.host;
            if (mate) { try { mate.send(ev.data); } catch (e) { /* ignore */ } }
        });
        ws.addEventListener('close', () => this.drop(ws));
        ws.addEventListener('error', () => this.drop(ws));
    }

    reject(ws, reason, code) {
        send(ws, { _r: reason });
        try { ws.close(code, reason); } catch (e) { /* ignore */ }
    }

    drop(ws) {
        const mate = ws === this.host ? this.guest : this.host;
        if (ws === this.host) this.host = null;
        if (ws === this.guest) this.guest = null;
        if (mate) send(mate, { _r: 'peer-left' });
    }
}

function send(ws, obj) {
    try { ws.send(JSON.stringify(obj)); } catch (e) { /* ignore */ }
}
