/* ============================================================================
   Arcane Chess 7x7 - relay WebSocket
   ---------------------------------------------------------------------------
   Inoltra e basta: mette in comunicazione due browser che stanno nella stessa
   stanza. Non conosce le regole del gioco, non tiene stato di partita, non
   valida mosse: l'arbitro resta l'host, esattamente come prima.

   Zero dipendenze: il protocollo WebSocket (RFC 6455) e' implementato qui
   sotto, cosi' gira con il solo Node installato.

       node server/relay.js            (porta 8790)
       node server/relay.js 9000       (porta a scelta)

   Il client si collega a  ws://host:porta/r/CODICE?role=host|guest
============================================================================ */

const http = require('http');
const crypto = require('crypto');

const PORT = Number(process.argv[2]) || Number(process.env.PORT) || 8790;
const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const ROOM_PATH = /^\/r\/([A-Za-z0-9]{4,12})$/;

/* Una stanza vive solo finche' c'e' qualcuno dentro. */
const rooms = new Map();

/* ============================== FRAME WEBSOCKET ============================== */

function encodeFrame(text) {
    const payload = Buffer.from(text, 'utf8');
    const len = payload.length;
    let header;

    if (len < 126) {
        header = Buffer.alloc(2);
        header[1] = len;
    } else if (len < 65536) {
        header = Buffer.alloc(4);
        header[1] = 126;
        header.writeUInt16BE(len, 2);
    } else {
        header = Buffer.alloc(10);
        header[1] = 127;
        header.writeUInt32BE(0, 2);
        header.writeUInt32BE(len, 6);
    }
    header[0] = 0x81;                       /* FIN + opcode text */
    return Buffer.concat([header, payload]);
}

function encodeClose(code) {
    const body = Buffer.alloc(2);
    body.writeUInt16BE(code || 1000, 0);
    return Buffer.concat([Buffer.from([0x88, body.length]), body]);
}

/* Estrae i frame completi dal buffer; quello che avanza resta per il giro dopo. */
function decodeFrames(state) {
    const out = [];

    for (;;) {
        const buf = state.buf;
        if (buf.length < 2) break;

        const fin = (buf[0] & 0x80) !== 0;
        const opcode = buf[0] & 0x0f;
        const masked = (buf[1] & 0x80) !== 0;
        let len = buf[1] & 0x7f;
        let offset = 2;

        if (len === 126) {
            if (buf.length < offset + 2) break;
            len = buf.readUInt16BE(offset);
            offset += 2;
        } else if (len === 127) {
            if (buf.length < offset + 8) break;
            /* i messaggi del gioco sono minuscoli: i 32 bit alti sono sempre 0 */
            len = buf.readUInt32BE(offset + 4);
            offset += 8;
        }

        let mask = null;
        if (masked) {
            if (buf.length < offset + 4) break;
            mask = buf.slice(offset, offset + 4);
            offset += 4;
        }

        if (buf.length < offset + len) break;

        const payload = buf.slice(offset, offset + len);
        if (mask) {
            for (let i = 0; i < payload.length; i++) payload[i] ^= mask[i & 3];
        }
        state.buf = buf.slice(offset + len);

        if (opcode === 0x8) { out.push({ type: 'close' }); break; }
        if (opcode === 0x9) { out.push({ type: 'ping', payload }); continue; }
        if (opcode === 0xa) continue;                       /* pong: ignorato */

        if (opcode === 0x1 || opcode === 0x0) {
            state.chunks.push(payload);
            if (fin) {
                out.push({ type: 'text', text: Buffer.concat(state.chunks).toString('utf8') });
                state.chunks = [];
            }
            continue;
        }
        /* opcode binario o sconosciuto: il gioco non lo usa */
        state.chunks = [];
    }
    return out;
}

/* ============================== SOCKET ============================== */

function makePeer(socket, room, role) {
    const peer = {
        socket, room, role,
        alive: true,
        send(obj) {
            if (!this.alive) return;
            try { socket.write(encodeFrame(JSON.stringify(obj))); } catch (e) { /* ignore */ }
        },
        raw(text) {
            if (!this.alive) return;
            try { socket.write(encodeFrame(text)); } catch (e) { /* ignore */ }
        },
        close(code) {
            if (!this.alive) return;
            this.alive = false;
            try { socket.write(encodeClose(code)); } catch (e) { /* ignore */ }
            try { socket.end(); } catch (e) { /* ignore */ }
        }
    };
    return peer;
}

function other(room, peer) {
    return peer.role === 'host' ? room.guest : room.host;
}

function dropPeer(peer) {
    const room = rooms.get(peer.room);
    if (!room) return;

    const mate = other(room, peer);
    if (room.host === peer) room.host = null;
    if (room.guest === peer) room.guest = null;
    peer.alive = false;

    if (mate) mate.send({ _r: 'peer-left' });
    if (!room.host && !room.guest) rooms.delete(peer.room);

    log(peer.room, peer.role + ' uscito');
}

function log() {
    const stamp = new Date().toISOString().slice(11, 19);
    console.log('[' + stamp + ']', Array.prototype.join.call(arguments, ' '));
}

/* ============================== SERVER ============================== */

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Arcane Chess relay - stanze attive: ' + rooms.size + '\n');
});

server.on('upgrade', (req, socket) => {
    const url = new URL(req.url, 'http://localhost');
    const match = ROOM_PATH.exec(url.pathname);
    const key = req.headers['sec-websocket-key'];

    if (!match || !key) {
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.destroy();
        return;
    }

    const accept = crypto.createHash('sha1').update(key + GUID).digest('base64');
    socket.write(
        'HTTP/1.1 101 Switching Protocols\r\n' +
        'Upgrade: websocket\r\n' +
        'Connection: Upgrade\r\n' +
        'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n'
    );
    socket.setNoDelay(true);

    const code = match[1].toUpperCase();
    const role = url.searchParams.get('role') === 'host' ? 'host' : 'guest';
    const peer = makePeer(socket, code, role);
    let room = rooms.get(code);

    /* Chi crea la partita apre la stanza; chi entra la deve trovare gia' aperta. */
    if (role === 'host') {
        if (room && room.host) { peer.send({ _r: 'full' }); peer.close(4001); return; }
        if (!room) { room = { host: null, guest: null }; rooms.set(code, room); }
        room.host = peer;
    } else {
        if (!room || !room.host) { peer.send({ _r: 'no-room' }); peer.close(4004); return; }
        if (room.guest) { peer.send({ _r: 'full' }); peer.close(4001); return; }
        room.guest = peer;
    }

    log(code, role + ' entrato');
    peer.send({ _r: 'joined', role });
    if (role === 'guest') room.host.send({ _r: 'peer-joined' });

    const state = { buf: Buffer.alloc(0), chunks: [] };

    socket.on('data', chunk => {
        state.buf = Buffer.concat([state.buf, chunk]);

        let frames;
        try { frames = decodeFrames(state); } catch (e) { dropPeer(peer); socket.destroy(); return; }

        for (const frame of frames) {
            if (frame.type === 'close') { dropPeer(peer); peer.close(1000); return; }
            if (frame.type === 'ping') {
                try { socket.write(Buffer.concat([Buffer.from([0x8a, frame.payload.length]), frame.payload])); }
                catch (e) { /* ignore */ }
                continue;
            }
            /* Messaggio di gioco: inoltrato tale e quale all'altro giocatore. */
            const mate = other(rooms.get(code) || {}, peer);
            if (mate) mate.raw(frame.text);
        }
    });

    socket.on('close', () => dropPeer(peer));
    socket.on('error', () => dropPeer(peer));
});

server.listen(PORT, () => {
    log('relay in ascolto sulla porta ' + PORT);
    log('client -> ws://localhost:' + PORT + '/r/CODICE?role=host');
});
