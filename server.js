/**
 * server.js
 * ---------
 * Entry point. Serves the existing client files (index.html, cp.html,
 * b.js, sm.js, appraad2.js) as static assets and runs the Socket.IO
 * server implementing the protocol documented in src/protocol.js and
 * src/handlers.js.
 *
 * Run:
 *   npm install
 *   npm start
 * Then open http://localhost:3000/
 */

const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { attach } = require('./src/handlers');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }, // tighten this for production
});

const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// All your existing client files (index.html, cp.html, appraad2.js, sm.js, b.js)
// live in /public - copy them there if they aren't already.

io.on('connection', (socket) => {
  console.log('connected:', socket.id);
  attach(io, socket);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`X3 chat server listening on http://localhost:${PORT}`);
});
