/**
 * protocol.js
 * -----------
 * This file ports the exact wire-format logic found in appraad2.js so the
 * server speaks the same dialect as the existing (unmodified) client.
 *
 * IMPORTANT FINDING from reverse engineering the client:
 * Every socket.io event is multiplexed through a single event name: "msg".
 * The actual envelope looks like:   { cmd: <xorCmd-encoded string>, data: <payload> }
 *
 * The "cmd" field is NOT plain text on the wire - the client runs it through
 * a small XOR-based scrambler before sending, and decodes incoming cmd values
 * the same way. It is symmetric (XOR with the same key twice = identity),
 * so the exact same function is used to encode AND decode.
 *
 * This was extracted verbatim (logic-for-logic) from the minified client's
 * function `_0x37cfff`. Do not "simplify" the loop - the odd combination of
 * the for-loop's own i++ AND the in-body i+= is intentional and changes
 * which character positions get flipped for longer strings.
 */

function xorCmd(str) {
  str = str || '';
  const out = str.split('');
  const len = out.length;
  for (let i = 0; i < len; i++) {
    out[i] = String.fromCharCode(str.charCodeAt(i) ^ 0x2);
    i += i < 0x14 ? 0x1 : i < 0xc8 ? 0x4 : 0x10;
  }
  return out.join('');
}

/**
 * Send a server -> client message using the same envelope/codec the client expects.
 * @param {import('socket.io').Socket} socket
 * @param {string} cmd - plain-text command name, e.g. "ok", "online", "bc"
 * @param {*} data - JSON-serializable payload
 */
function sendMsg(socket, cmd, data) {
  socket.emit('msg', { cmd: xorCmd(cmd), data: data });
}

/**
 * Same as sendMsg but broadcasts to every socket in a room (excluding none by default).
 */
function broadcastMsg(io, room, cmd, data) {
  io.to(room).emit('msg', { cmd: xorCmd(cmd), data: data });
}

/**
 * Decode an incoming envelope's cmd field back to plain text.
 */
function decodeCmd(raw) {
  return xorCmd(raw);
}

module.exports = { xorCmd, sendMsg, broadcastMsg, decodeCmd };
