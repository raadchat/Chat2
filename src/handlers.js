/**
 * handlers.js
 * -----------
 * Implements every command the client (appraad2.js) is observed to send,
 * and emits every command name the client is observed to listen for.
 * This version was corrected after reading the *full* incoming dispatcher
 * (~1370 lines, function `_0x25b5a7`) line-by-line, not just call sites -
 * several command shapes changed from the first draft. Notable corrections:
 *
 *   - Login/Register results are NOT separate top-level commands. They all
 *     arrive as  cmd:"login", data:{ msg: "ok"|"noname"|"badname"|"usedname"
 *     |"badpass"|"wrong"|"reg", id, ttoken }.
 *   - Top-level cmd "ok"/"nok" is a *connection* handshake (issues the `k`
 *     session key used later for silent reconnects), separate from the
 *     per-user login result above.
 *   - Reconnects use a "rc" (begin buffering) / "rcd" (batched replay)
 *     pattern, not individual events - see sendReconnectBatch() below.
 *   - Room changes for an *already known* user go through "ur": [userId,
 *     newRoomId] - not "u+"/"u-". "u+"/"u-" are for a user appearing on or
 *     disappearing from the whole site (login/full disconnect). "u^" is a
 *     partial field merge (rename, profile edit, rep change, etc).
 *   - User-facing field names are `topic` (display name), `ucol` (name
 *     color), `bg` (name-tag background) - not nick/color.
 *
 * Two confidence levels, marked throughout:
 *   [WIRE]   - event name / field names taken directly from the client
 *              source (re-verified against the full dispatcher body).
 *   [DESIGN] - the business logic behind that event is this server's own
 *              implementation (the original server isn't recoverable from
 *              the client alone). Treat as a solid starting point, adjust
 *              freely against your real client's behaviour.
 *
 * Deliberately NOT implemented: the client also listens for a command
 * "ev" whose handler is a literal `eval(data.data)` - i.e. the original
 * server could push arbitrary JS to run in every connected browser. That
 * is a remote-code-execution channel by design, and nothing here will
 * trigger it. If you genuinely need a live "push a script to everyone"
 * admin feature, it deserves its own careful security review rather than
 * being wired up by default.
 */

const { sendMsg, broadcastMsg, decodeCmd } = require('./protocol');
const {
  db,
  createUser,
  findUserByName,
  createRoom,
  publicRoomList,
  publicRoomFull,
  publicUser,
  addBan,
  isBanned,
  logLogin,
  logFp,
  logAction,
  nowId,
} = require('./store');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

function attach(io, socket) {
  const session = { user: null };

  // -----------------------------------------------------------------
  // Connection-level handshake. [WIRE] confirmed: the client's top-level
  // "msg" listener treats cmd "ok" as "this connection is authenticated,
  // remember data.k for later reconnects" and "nok" as "forget it, you're
  // not authenticated". This happens BEFORE any per-user login.
  // -----------------------------------------------------------------
  const handshakeKey = uuid();
  db.handshakeKeys.set(socket.id, handshakeKey);
  sendMsg(socket, 'ok', { k: handshakeKey });

  // ---------------------------------------------------------------
  // rc2 - silent reconnect using a previously issued reconnect token.
  // [WIRE] sent as a *raw* socket.io event (NOT wrapped in "msg").
  //   client sends: { token: <ttoken from login>, n: <last known k> }
  // ---------------------------------------------------------------
  socket.on('rc2', ({ token, n } = {}) => {
    const user = findUserById(token);
    const expectedK = db.reconnectKeys.get(token);
    if (!user || !expectedK || expectedK !== n) {
      sendMsg(socket, 'nok', {});
      return;
    }
    bindSession(user);
    sendReconnectBatch();
  });

  socket.on('disconnect', () => {
    db.handshakeKeys.delete(socket.id);
    handleLogout();
  });

  // ---------------------------------------------------------------
  // Single multiplexed channel for everything else.
  // ---------------------------------------------------------------
  socket.on('msg', (envelope) => {
    if (!envelope || typeof envelope.cmd !== 'string') return;
    const cmd = decodeCmd(envelope.cmd);
    const data = envelope.data;
    const handler = handlers[cmd];
    if (!handler) {
      console.warn('[unhandled cmd]', cmd, data);
      return;
    }
    try {
      handler(data);
    } catch (err) {
      console.error('[handler error]', cmd, err);
    }
  });

  // ---------------- session / helpers -------------------------------

  function bindSession(user) {
    session.user = user;
    user.online = true;
    user.lastseen = Date.now();
    db.sessions.set(socket.id, { userId: user.id });
    socket.join('user:' + user.id);
    socket.join('lobby');
  }

  function requireLogin() {
    return !!session.user;
  }

  function currentRoom() {
    if (!session.user || !session.user.roomId) return null;
    return db.rooms.get(session.user.roomId);
  }

  function findUserById(id) {
    return Array.from(db.users.values()).find((u) => u.id === id);
  }

  function findSocketForUserId(userId) {
    const room = io.sockets.adapter.rooms.get('user:' + userId);
    if (!room) return null;
    const sid = Array.from(room)[0];
    return io.sockets.sockets.get(sid) || null;
  }

  function issueReconnectToken(user) {
    db.reconnectKeys.set(user.id, db.handshakeKeys.get(socket.id));
    return user.id; // [DESIGN] "ttoken" - the client just echoes this back in rc2
  }

  // Sends the full "you are logged in" sequence after login/register/guest/
  // reconnect. [DESIGN] grouping/order of these events is a best guess -
  // watch devtools on first run and reorder if the UI looks half-built.
  function sendLoginSuccess(user) {
    const ttoken = issueReconnectToken(user);
    sendMsg(socket, 'login', { msg: 'ok', id: user.id, ttoken });
    sendMsg(socket, 'power', db.powers.get(user.power) || {});
    sendMsg(socket, 'rlist', publicRoomList());
    sendMsg(socket, 'ulist', Array.from(db.users.values())
      .filter((u) => u.online)
      .map(publicUser));
    sendMsg(socket, 'settings', { calls: db.site.calls });
  }

  // [WIRE] reconnect replay pattern: "rc" tells the client to start
  // buffering any further dispatched commands, then "rcd" delivers a
  // batch of [cmd, data] tuples to replay in order (state-restore first).
  function sendReconnectBatch() {
    const user = session.user;
    const ttoken = issueReconnectToken(user);
    const batch = [
      ['login', { msg: 'ok', id: user.id, ttoken }],
      ['power', db.powers.get(user.power) || {}],
      ['rlist', publicRoomList()],
      ['ulist', Array.from(db.users.values()).filter((u) => u.online).map(publicUser)],
      ['settings', { calls: db.site.calls }],
    ];
    if (user.roomId) {
      batch.push(['ur', [user.id, user.roomId]]);
    }
    sendMsg(socket, 'rc', {});
    sendMsg(socket, 'rcd', batch);
  }

  function handleLogout() {
    const user = session.user;
    if (!user) return;
    user.online = false;
    const room = currentRoom();
    if (room) {
      room.members.delete(user.lid);
      room.m = room.m.filter((id) => id !== user.id);
      broadcastMsg(io, 'lobby', 'ur', [user.id, null]);
    }
    broadcastMsg(io, 'lobby', 'u-', user.id);
    db.sessions.delete(socket.id);
    session.user = null;
  }

  function broadcastUserUpdate(fields, user) {
    user = user || session.user;
    if (!user) return;
    Object.assign(user, fields);
    const payload = Object.assign({ id: user.id }, fields);
    broadcastMsg(io, 'lobby', 'u^', payload);
  }

  // Heart/like-pop animation, distinct from the persisted rep count.
  // [DESIGN] best-effort split between "bc^" (wall post likes, keyed by
  // .bid) and "mi+" (everything else, keyed by user/message id) - both
  // confirmed client-side render paths, exact trigger boundary unverified.
  function bumpHeart(room, targetId, isWallPost) {
    if (!room) return;
    broadcastMsg(io, 'room:' + room.id, isWallPost ? 'bc^' : 'mi+', isWallPost ? { bid: targetId } : targetId);
  }

  // ---------------- command handlers ------------------------------
  const handlers = {
    // === Entry / auth ==========================================
    // [WIRE] payload: { username, fp, refr, r }
    g(data) {
      const username = (data.username || '').trim() || 'زائر' + Math.floor(Math.random() * 9999);
      logFp({ username, isreg: false, fp: data.fp, refr: data.refr, r: data.r });
      if (isBanned(username) || isBanned(data.fp)) {
        sendMsg(socket, 'login', { msg: 'wrong' });
        return;
      }
      if (findUserByName(username)) {
        sendMsg(socket, 'login', { msg: 'usedname' });
        return;
      }
      const user = createUser({ username, guest: true });
      user.fp = data.fp;
      bindSession(user);
      sendLoginSuccess(user);
      logLogin(user);
      broadcastMsg(io, 'lobby', 'u+', publicUser(user));
    },

    // [WIRE] payload: { username, stealth, password, fp, refr, r }
    login(data) {
      logFp({ username: data.username, isreg: false, fp: data.fp, refr: data.refr, r: data.r });
      if (isBanned(data.username) || isBanned(data.fp)) {
        sendMsg(socket, 'login', { msg: 'wrong' });
        return;
      }
      const user = findUserByName(data.username);
      if (!user) {
        sendMsg(socket, 'login', { msg: 'noname' });
        return;
      }
      if (!user.passwordHash || !bcrypt.compareSync(data.password || '', user.passwordHash)) {
        sendMsg(socket, 'login', { msg: 'badpass' });
        return;
      }
      bindSession(user);
      sendLoginSuccess(user);
      logLogin(user);
      if (!data.stealth) {
        broadcastMsg(io, 'lobby', 'u+', publicUser(user));
      }
    },

    // [WIRE] payload: { username, password, fp, refr, r }
    // [WIRE] confirmed: success replies with cmd:"login", msg:"reg" - the
    // client then auto-submits an actual login with the same credentials.
    // It does NOT log the user in directly on register.
    reg(data) {
      const username = (data.username || '').trim();
      logFp({ username, isreg: true, fp: data.fp, refr: data.refr, r: data.r });
      if (!username) { sendMsg(socket, 'login', { msg: 'badname' }); return; }
      if (isBanned(username) || isBanned(data.fp)) { sendMsg(socket, 'login', { msg: 'wrong' }); return; }
      if (findUserByName(username)) { sendMsg(socket, 'login', { msg: 'usedname' }); return; }
      createUser({ username, password: data.password });
      sendMsg(socket, 'login', { msg: 'reg' });
    },

    // [WIRE] payload: {} - sent before login to request lobby state
    online() {
      sendMsg(socket, 'rlist', publicRoomList());
      sendMsg(socket, 'online', { count: Array.from(db.users.values()).filter((u) => u.online).length });
    },

    // [WIRE] payload: {}
    logout() {
      handleLogout();
    },

    // === Rooms ===================================================
    // [WIRE] payload: { id, pwd }
    rjoin(data) {
      if (!requireLogin()) return;
      const room = db.rooms.get(data.id);
      if (!room) return;
      if (room.needpass && room.pass !== data.pwd) {
        sendMsg(socket, 'wrong', { id: room.id });
        return;
      }
      const prevRoom = currentRoom();
      if (prevRoom) {
        prevRoom.members.delete(session.user.lid);
        prevRoom.m = prevRoom.m.filter((id) => id !== session.user.id);
        socket.leave('room:' + prevRoom.id);
      }
      room.members.add(session.user.lid);
      session.user.roomId = room.id;
      socket.join('room:' + room.id);
      // [WIRE] "ur": [userId, newRoomId] - tells every client (including
      // this one) that this user is now in this room.
      broadcastMsg(io, 'lobby', 'ur', [session.user.id, room.id]);
      sendMsg(socket, 'r^', publicRoomFull(room)); // full state for the joiner's own UI
    },

    // [WIRE] payload: { topic, about, welcome, pass, max, c }
    'r+'(data) {
      if (!requireLogin()) return;
      const room = createRoom({ owner: session.user, ...data });
      room.ownerName = session.user.topic;
      broadcastMsg(io, 'lobby', 'r+', publicRoomFull(room));
    },

    // [WIRE] payload: { id }
    'r-'(data) {
      if (!requireLogin()) return;
      if (!db.rooms.has(data.id)) return;
      db.rooms.delete(data.id);
      broadcastMsg(io, 'lobby', 'r-', { id: data.id });
    },

    // [WIRE] payload: { id, v } - toggle voice/mic enabled for a room
    v(data) {
      const room = db.rooms.get(data.id);
      if (!room) return;
      room.v = !!data.v;
      broadcastMsg(io, 'room:' + room.id, 'r^', publicRoomFull(room));
    },

    // [WIRE] payload: { id (target user), rid (room id), pwd }
    rinvite(data) {
      const target = findSocketForUserId(data.id);
      if (target) sendMsg(target, 'rops', { rid: data.rid, pwd: data.pwd, from: session.user && session.user.id });
    },

    // === Messaging ===============================================
    // [WIRE] payload: { msg, link, bid? } - room wall/broadcast message
    bc(data) {
      const room = currentRoom();
      if (!room || !session.user) return;
      broadcastMsg(io, 'room:' + room.id, 'bc', {
        id: session.user.id,
        msg: data.msg,
        link: data.link,
        bid: data.bid || nowId(),
        t: Date.now(),
      });
    },

    // [WIRE] payload: { msg, id } - private message to user id
    pm(data) {
      if (!session.user) return;
      const target = findUserById(data.id);
      if (target && target.pmOffFrom.has(session.user.id)) return;
      const targetSocket = findSocketForUserId(data.id);
      const payload = { id: session.user.id, pm: session.user.id, msg: data.msg, t: Date.now() };
      if (targetSocket) sendMsg(targetSocket, 'pm', Object.assign({}, payload, { pm: data.id }));
      sendMsg(socket, 'pm', payload);
    },

    // [WIRE] payload: { msg } - post to your own profile wall
    pmsg(data) {
      if (!session.user) return;
      broadcastMsg(io, 'lobby', 'pmsg', { id: session.user.id, msg: data.msg, t: Date.now() });
    },

    // [WIRE] payload: { msg } - "public profile message" (requires ppmsg power flag)
    ppmsg(data) {
      if (!session.user) return;
      broadcastMsg(io, 'lobby', 'ppmsg', { id: session.user.id, msg: data.msg, t: Date.now() });
    },

    // [WIRE] payload: [userId, 0|1] - typing indicator
    ty(data) {
      if (!session.user || !Array.isArray(data)) return;
      const [targetId, isTyping] = data;
      const target = findSocketForUserId(targetId);
      if (target) sendMsg(target, 'ty', [session.user.id, isTyping]);
    },

    // [WIRE] payload: { pm, link } - shared file/image link
    file(data) {
      if (!session.user) return;
      if (data.pm) {
        const target = findSocketForUserId(data.pm);
        if (target) sendMsg(target, 'pm', { id: session.user.id, pm: data.pm, link: data.link, t: Date.now() });
      } else {
        const room = currentRoom();
        if (room) broadcastMsg(io, 'room:' + room.id, 'bc', { id: session.user.id, link: data.link, bid: nowId(), t: Date.now() });
      }
    },

    // === Profile ===================================================
    // [WIRE] payload: { color (-> ucol), bg }
    setprofile(data) {
      if (!session.user) return;
      broadcastUserUpdate({ ucol: data.color, bg: data.bg });
    },

    // [WIRE] payload: { pic } - data URL or uploaded file URL
    setpic(data) {
      if (!session.user) return;
      broadcastUserUpdate({ pic: data.pic });
    },

    // [WIRE] payload: { id, likes } - admin/mod adjusting someone's likes
    setLikes(data) {
      const target = findUserById(data.id);
      if (!target) return;
      broadcastUserUpdate({ rep: data.likes }, target);
    },

    // [WIRE] payload: { id, nick } - rename another user (mod action)
    unick(data) {
      const target = findUserById(data.id);
      if (!target) return;
      broadcastUserUpdate({ topic: data.nick }, target);
    },

    // === Friend-list style actions (uma/uml/umm) ====================
    // [WIRE] payload: bare user id string (not an object)
    uma(userId) {
      if (!session.user) return;
      session.user.friends.add(userId);
    },
    uml(userId) {
      if (!session.user) return;
      session.user.friends.delete(userId);
    },
    umm(userId) {
      // [DESIGN] mute marker - purely client-rendered, nothing to persist server-side
    },

    // [WIRE] payload: bare user id - "كشف النكات" (show this user's alt accounts)
    // [WIRE] response shape confirmed: array of { u, t, _ip, c, _fp }
    uh(userId) {
      const target = findUserById(userId);
      if (!target || !target.fp) { sendMsg(socket, 'uh', []); return; }
      const alts = db.loginLog.filter((l) => l.fp === target.fp && l.id !== userId);
      sendMsg(socket, 'uh', alts.map((l) => ({ u: l.u, t: l.t, _ip: l.ip, c: l.regdate, _fp: l.fp })));
    },

    // === Mic / voice queue ==========================================
    mic(data) {
      const room = currentRoom();
      if (!room || !session.user) return;
      if (!room.m.includes(session.user.id)) room.m.push(session.user.id);
      broadcastMsg(io, 'room:' + room.id, 'r^', publicRoomFull(room));
    },

    // [WIRE] payload: { i, v } - i=target id, v=enabled/disabled. Client
    // reads this as live mic-level updates via "mv": [userId, level 0..1];
    // 'i'/'v' here are the request to lock/unlock someone's mic, not the
    // level broadcast itself.
    micstat(data) {
      const target = findUserById(data.i);
      if (!target || !target.roomId) return;
      if (!data.v) {
        const room = db.rooms.get(target.roomId);
        if (room) {
          room.m = room.m.filter((id) => id !== data.i);
          broadcastMsg(io, 'room:' + room.id, 'r^', publicRoomFull(room));
        }
      }
    },

    // === Moderation ==================================================
    // [WIRE] payload: { lid } - promote to room operator
    'op+'(data) {
      const room = currentRoom();
      if (!room) return;
      if (!room.ops.includes(data.lid)) room.ops.push(data.lid);
      broadcastMsg(io, 'room:' + room.id, 'ops', room.ops.map((lid) => {
        const u = Array.from(db.users.values()).find((x) => x.lid === lid);
        return u ? publicUser(u) : { lid };
      }));
    },
    // [WIRE] payload: { roomid }
    ops(data) {
      const room = db.rooms.get(data.roomid);
      if (!room) return;
      sendMsg(socket, 'ops', room.ops.map((lid) => {
        const u = Array.from(db.users.values()).find((x) => x.lid === lid);
        return u ? publicUser(u) : { lid };
      }));
    },

    // [WIRE] payload: { cmd: like|report|kick|delpic|roomkick|ban|not|gift, id, msg?, gift? }
    action(data) {
      const target = findUserById(data.id);
      const room = currentRoom();
      switch (data.cmd) {
        case 'like':
          if (target) {
            broadcastUserUpdate({ rep: (target.rep || 0) + 1 }, target);
            bumpHeart(room, data.id, false);
          }
          break;
        case 'gift': {
          // [DESIGN] no dedicated wire event for gifts was found in the
          // client; delivering through the confirmed "pm" channel with an
          // extra `gift` field is the least-surprising fallback.
          const t = findSocketForUserId(data.id);
          if (t) sendMsg(t, 'pm', { id: session.user && session.user.id, pm: data.id, gift: data.gift, t: Date.now() });
          break;
        }
        case 'report':
          logAction({ type: 'report', u1: session.user && session.user.topic, u2: target && target.topic, room: room && room.topic });
          break;
        case 'kick': {
          const t = findSocketForUserId(data.id);
          logAction({ type: 'kick', u1: session.user && session.user.topic, u2: target && target.topic });
          if (t) { sendMsg(t, 'close', {}); t.disconnect(true); }
          break;
        }
        case 'roomkick': {
          if (room && target) {
            room.members.delete(target.lid);
            room.m = room.m.filter((id) => id !== target.id);
            target.roomId = null;
            broadcastMsg(io, 'lobby', 'ur', [target.id, null]);
            logAction({ type: 'roomkick', u1: session.user && session.user.topic, u2: target.topic, room: room.topic });
          }
          break;
        }
        case 'ban':
          addBan({ value: data.id, type: 'user', byUser: session.user });
          logAction({ type: 'ban', u1: session.user && session.user.topic, u2: target && target.topic });
          broadcastMsg(io, 'lobby', 'cp_bans', Array.from(db.bans.values()));
          break;
        case 'delpic':
          if (target) broadcastUserUpdate({ pic: 'pic.png' }, target);
          break;
        case 'not': {
          const t = findSocketForUserId(data.id);
          if (t) sendMsg(t, 'not', { user: session.user && session.user.id, msg: data.msg });
          break;
        }
        default:
          console.warn('[unhandled action.cmd]', data.cmd);
      }
    },

    // === Banners ======================================================
    // [WIRE] payload: { u2, bnr }
    bnr(data) {
      const target = findUserById(data.u2);
      if (target) broadcastUserUpdate({ banner: data.bnr }, target);
    },
    'bnr-'(data) {
      const target = findUserById(data.u2);
      if (target) broadcastUserUpdate({ banner: null }, target);
    },
    // [WIRE] payload: { id } - mute notifications from a specific user
    nonot(data) { if (session.user) session.user.notifyOffFrom.add(data.id); },
    // [WIRE] payload: { id } - block PMs from a specific user
    nopm(data) { if (session.user) session.user.pmOffFrom.add(data.id); },

    // === WebRTC signaling relay (pure passthrough, [WIRE] high confidence) ===
    p2(data) {
      const target = findSocketForUserId(data.id);
      if (!target || !session.user) return;
      sendMsg(target, 'p2', Object.assign({}, data, { id: session.user.id }));
    },
    call(data) {
      const target = findSocketForUserId(data.id);
      if (!target || !session.user) return;
      sendMsg(target, 'call', Object.assign({}, data, { id: session.user.id }));
    },

    // === Admin control panel (cp.html) ===============================
    // [WIRE] payload always: { cmd: <admin-subcommand>, ...fields }
    cp(data) {
      if (!session.user) return; // TODO: also gate on the `cp`/`owner` power flags
      switch (data.cmd) {
        // --- bans -------------------------------------------------
        case 'ban':
          addBan({ value: data.type, type: data.type, byUser: session.user });
          sendMsg(socket, 'cp_bans', Array.from(db.bans.values()));
          break;
        case 'aban':
        case 'unban':
          db.bans.delete(data.type || data.id);
          sendMsg(socket, 'cp_bans', Array.from(db.bans.values()));
          break;

        // --- per-user power/likes/password/delete ------------------
        case 'likes': {
          const t = findUserById(data.id);
          if (t) broadcastUserUpdate({ rep: data.likes }, t);
          break;
        }
        case 'pwd': {
          const t = findUserById(data.id);
          if (t) t.passwordHash = bcrypt.hashSync(data.pwd, 8);
          break;
        }
        case 'delu':
          for (const [k, u] of db.users) if (u.id === data.id) db.users.delete(k);
          break;
        case 'setpower': {
          const t = findUserById(data.id);
          if (t) {
            t.power = data.power || null;
            t.powerExpires = data.days ? Date.now() + data.days * 86400000 : 0;
            broadcastUserUpdate({}, t);
          }
          break;
        }

        // --- virtual/"bot" users -------------------------------------
        case 'bot': {
          let t = findUserById(data.id);
          if (!t) { t = createUser({ username: 'bot_' + nowId().slice(0, 6) }); t.id = data.id || t.id; }
          Object.assign(t, data);
          sendMsg(socket, 'cp_bots', Array.from(db.bots.values()));
          break;
        }

        // --- site settings -------------------------------------------
        case 'domainsave':
          db.domains.set(data.data && data.data.domain, data.data);
          sendMsg(socket, 'cp_domains', Object.fromEntries(db.domains));
          break;
        case 'sitesave':
          Object.assign(db.site, data.data);
          sendMsg(socket, 'cp_owner', { site: db.site, sico: db.sico, dro3: db.dro3, emo: db.emo });
          break;

        // --- word filter -----------------------------------------------
        case 'fltrit': {
          const id = nowId();
          db.filters.set(id, { id, type: data.path, v: data.v, path: data.path });
          sendMsg(socket, 'cp_fltr', { a: Array.from(db.filters.values()), b: db.filterLog });
          break;
        }
        case 'fltrdel':
          db.filters.delete(data.id);
          sendMsg(socket, 'cp_fltr', { a: Array.from(db.filters.values()), b: db.filterLog });
          break;
        case 'fltrdelx':
          db.filterLog = db.filterLog.filter((f) => f.id !== data.id);
          sendMsg(socket, 'cp_fltr', { a: Array.from(db.filters.values()), b: db.filterLog });
          break;

        // --- icon pools (sico/dro3/emo) --------------------------------
        case 'addico': {
          const pool = db[data.tar] || (db[data.tar] = []);
          pool.push(data.pid);
          sendMsg(socket, 'ico+', data.tar + '/' + data.pid);
          break;
        }
        case 'delico': {
          const parts = (data.pid || '').split('/');
          const pool = db[parts[0]];
          if (pool) {
            const idx = pool.indexOf(parts.slice(1).join('/'));
            if (idx !== -1) pool.splice(idx, 1);
          }
          sendMsg(socket, 'ico-', data.pid);
          break;
        }
        case 'emo_order':
          db.emo = data.d || db.emo;
          break;

        // --- canned messages -------------------------------------------
        case 'msgsdel':
          db.cannedMessages.delete(data.id);
          sendMsg(socket, 'cp_msgs', Array.from(db.cannedMessages.values()));
          break;

        // --- shortcuts -------------------------------------------------
        case 'shrtdel':
          db.shortcuts.delete(data.name);
          sendMsg(socket, 'cp_shrt', Array.from(db.shortcuts.values()));
          break;

        // --- power groups (powers_save/powers_del) ---------------------
        case 'powers_save':
          db.powers.set(data.power.name, data.power);
          sendMsg(socket, 'powers', Array.from(db.powers.values()));
          break;
        case 'powers_del':
          db.powers.delete(data.name);
          sendMsg(socket, 'powers', Array.from(db.powers.values()));
          break;

        // --- paginated logs (logins/fps/actions) ------------------------
        case 'logins': {
          const PAGE = 100;
          const rows = db.loginLog.filter((r) => !data.q || r.u.includes(data.q));
          const page = rows.slice(data.i || 0, (data.i || 0) + PAGE);
          page.push({ d: Date.now(), i: data.i || 0 });
          sendMsg(socket, 'cp_logins', page);
          break;
        }
        case 'fps': {
          const PAGE = 200;
          const rows = db.fpLog.filter((r) => !data.q || r.fp.includes(data.q) || r.username.includes(data.q));
          const page = rows.slice(data.i || 0, (data.i || 0) + PAGE);
          page.push({ d: Date.now(), i: data.i || 0 });
          sendMsg(socket, 'cp_fps', page);
          break;
        }
        case 'actions': {
          const PAGE = 200;
          const rows = db.actionLog.filter((r) => !data.q || (r.u1 || '').includes(data.q) || (r.u2 || '').includes(data.q));
          const page = rows.slice(data.i || 0, (data.i || 0) + PAGE);
          page.push({ d: Date.now(), i: data.i || 0 });
          sendMsg(socket, 'cp_actions', page);
          break;
        }

        // --- per-user subscriptions (who currently holds which power) --
        case 'subs': {
          const rows = Array.from(db.users.values())
            .filter((u) => u.power)
            .map((u) => ({
              id: u.id,
              user: u.username,
              topic: u.topic,
              power: u.power,
              rank: (db.powers.get(u.power) || {}).rank || 0,
              days: u.powerExpires ? Math.ceil((u.powerExpires - Date.now()) / 86400000) : 0,
              end: u.powerExpires || 0,
              ls: u.lastseen,
            }));
          sendMsg(socket, 'cp_subs', rows);
          break;
        }

        // --- full panel snapshot --------------------------------------
        // [DESIGN] no confirmed trigger event for "open control panel and
        // populate every tab" was found in the client source - this is a
        // reasonable guess (`cp:{cmd:'init'}`). If your real cp.html fires
        // something else on load, watch the network tab and rename this.
        case 'init':
          sendMsg(socket, 'cp_owner', { site: db.site, sico: db.sico, dro3: db.dro3, emo: db.emo });
          sendMsg(socket, 'cp_bans', Array.from(db.bans.values()));
          sendMsg(socket, 'cp_rooms', publicRoomList());
          sendMsg(socket, 'cp_msgs', Array.from(db.cannedMessages.values()));
          sendMsg(socket, 'cp_shrt', Array.from(db.shortcuts.values()));
          sendMsg(socket, 'cp_fltr', { a: Array.from(db.filters.values()), b: db.filterLog });
          sendMsg(socket, 'cp_bots', Object.assign({}, db.bots_settings));
          sendMsg(socket, 'cp_sico', db.sico);
          sendMsg(socket, 'cp_domains', Object.fromEntries(db.domains));
          sendMsg(socket, 'powers', Array.from(db.powers.values()));
          handlers.cp({ cmd: 'subs' });
          break;

        default:
          console.warn('[unhandled cp.cmd]', data.cmd);
      }
    },

    // [WIRE] payload: [cpiIndex, innerEnvelope] - routes a message to/from a
    // detached control-panel popup window via postMessage. Pure browser-side
    // relay; the server never needs to interpret it directly.
    cpi() {},
  };

}

module.exports = { attach };
