/**
 * store.js
 * --------
 * In-memory data layer. This is NOT what the original developer used
 * internally (that part is impossible to recover from the client alone) -
 * it's a clean-room implementation that satisfies the wire contract the
 * client expects. Swap this out for SQLite/MySQL/Mongo for production use;
 * everything here is namespaced so that's a contained change.
 */

const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

const db = {
  // username(lowercased) -> user record
  users: new Map(),
  // roomId -> room record
  rooms: new Map(),
  // socket.id -> live session info (userId, roomId, etc.)
  sessions: new Map(),
  // userId -> reconnect session key ("n" in the protocol)
  reconnectKeys: new Map(),
  // per-connection handshake key, keyed by socket.id (separate from reconnectKeys!)
  handshakeKeys: new Map(),
  // ban list, keyed by the banned value (username/fp/ip/etc per "depth")
  // value -> { id, user, type, date, co, lc }
  bans: new Map(),
  // power groups (admin permission presets), keyed by name
  powers: new Map(),
  // cp_fltr "a" list: word-filter rules. id -> { id, type, v, path }
  filters: new Map(),
  // cp_fltr "b" list: filter trigger log (most recent first)
  filterLog: [],
  // cp_shrt: quick-reply shortcuts. name -> { name, value }
  shortcuts: new Map(),
  // cp_msgs: canned messages / welcome message. id -> { id, type, t, m }
  cannedMessages: new Map(),
  // cp_bots: fake/virtual users used to make a room look active. id -> bot record
  bots: new Map(),
  bots_settings: {
    bots_minStay: 5, bots_maxStay: 30, bots_minLeave: 1, bots_maxLeave: 5,
    bots_active: false, max: 10, used: 0,
  },
  // login history (one row per real login), most recent last
  loginLog: [],
  // fingerprint/session log (one row per connection attempt), most recent last
  fpLog: [],
  // moderation action log (kick/ban/report/etc), most recent last
  actionLog: [],
  // multi-domain support. domainKey -> { domain, name, title, description, keywords, script, bg, background, buttons, status }
  domains: new Map(),
  // site-wide settings shown in cp_owner
  site: {
    name: 'X3 Chat', title: 'X3 Chat', description: '', keywords: '', script: '',
    wall_likes: 0, wall_minutes: 0, pmlikes: 0, msgst: 0, notlikes: 0,
    fileslikes: 0, proflikes: 0, piclikes: 0, maxIP: 2, maxshrt: 1, stay: 1,
    allowg: true, allowreg: true, rc: true, bclikes: true, mlikes: true,
    bcreply: true, mreply: true, calls: true, callsLike: 0,
    bg: '#39536E', background: '#fafafa', buttons: '#2B3E52',
  },
  // icon pools referenced by cp_owner (sico = status icons, dro3 = decorations, emo = emojis)
  sico: [],
  dro3: [],
  emo: [],
};

function nowId() {
  return uuid();
}

function makeDefaultPowers() {
  // "power" object the client Object.freeze()s and reads flags off of, e.g.
  // _0x3e8a07(power).cmic, _0x41c3fc.roomowner, _0x41c3fc.setpower, _0x41c3fc.ppmsg, _0x41c3fc.rinvite, _0x41c3fc.setLikes
  // These flag names were recovered from the client's permission checks.
  db.powers.set('عضو', {
    name: 'عضو',
    rank: 1,
    cmic: false,
    roomowner: false,
    setpower: false,
    ppmsg: false,
    rinvite: false,
    setLikes: false,
    ico: 'member.png',
  });
  db.powers.set('مشرف', {
    name: 'مشرف',
    rank: 5,
    cmic: true,
    roomowner: true,
    setpower: false,
    ppmsg: true,
    rinvite: true,
    setLikes: true,
    ico: 'mod.png',
  });
  db.powers.set('مالك', {
    name: 'مالك',
    rank: 10,
    cmic: true,
    roomowner: true,
    setpower: true,
    ppmsg: true,
    rinvite: true,
    setLikes: true,
    ico: 'owner.png',
  });
}
makeDefaultPowers();

function createUser({ username, password, guest = false }) {
  const id = nowId();
  const lid = id.slice(0, 8); // short "live id" used in many payloads as `lid`
  const rec = {
    id,
    lid,
    username,
    passwordHash: password ? bcrypt.hashSync(password, 8) : null,
    guest,
    pic: 'pic.png',
    topic: username, // [WIRE] this is the field name the client actually reads as display name
    ucol: '#000000', // [WIRE] username text color
    bg: '#ffffff', // [WIRE] name-tag background color
    rep: 0, // likes/إعجابات
    power: guest ? null : 'عضو',
    powerExpires: 0, // 0 = permanent
    co: 'SA',
    fp: null, // browser fingerprint from last login (g/login/reg payload)
    ip: null,
    banner: null,
    online: false,
    roomId: null,
    notifyOffFrom: new Set(), // [WIRE] nonot payload is {id} - per-sender mute, not global
    pmOffFrom: new Set(), // [WIRE] nopm payload is {id} - per-sender PM block, not global
    friends: new Set(), // uma
    createdAt: Date.now(),
    lastseen: Date.now(),
  };
  db.users.set(username.toLowerCase(), rec);
  return rec;
}

function findUserByName(username) {
  return db.users.get((username || '').toLowerCase());
}

function createRoom({ owner, topic, about, welcome, pass, max, color }) {
  const id = nowId().slice(0, 8);
  const room = {
    id,
    owner: owner.lid,
    ops: [],
    topic: topic || 'غرفة جديدة',
    about: about || '',
    welcome: welcome || '',
    pass: pass || '',
    max: max || 20,
    c: color || '#000000',
    pic: 'room.png',
    needpass: !!pass,
    v: false, // [WIRE] voice/mic enabled flag
    m: [], // [WIRE] mic queue array of user ids, field name confirmed via r^ handler
    members: new Set(),
  };
  db.rooms.set(id, room);
  return room;
}

function publicRoomList() {
  return Array.from(db.rooms.values()).map(publicRoomFull);
}

// Full room snapshot, used for r^ / r+ / rlist entries.
function publicRoomFull(r) {
  return {
    id: r.id,
    owner: r.owner,
    topic: r.topic,
    about: r.about,
    welcome: r.welcome,
    pic: r.pic,
    c: r.c,
    needpass: r.needpass,
    max: r.max,
    v: r.v,
    m: r.m,
    uco: r.members.size, // [WIRE] "user count" field read in several places as `.uco`
    user: r.ownerName || '', // [WIRE] cp_rooms shows the owner's name under `.user`
  };
}

function publicUser(u) {
  // [WIRE] shape mirrors fields the client reads off `_0x123150[id]`
  return {
    id: u.id,
    lid: u.lid,
    topic: u.topic,
    pic: u.pic,
    power: u.power,
    rep: u.rep,
    co: u.co,
    ucol: u.ucol,
    bg: u.bg,
    roomid: u.roomId,
    s: null, // null = a normal user row; bots/system rows use a non-null marker
    h: '', // small badge text shown next to the name (purpose not fully confirmed)
  };
}

// --- bans -----------------------------------------------------------
function addBan({ value, type, byUser }) {
  db.bans.set(value, {
    id: nowId(),
    user: byUser ? byUser.topic : '',
    type,
    date: new Date().toISOString(),
    co: 1, // "occurrences" counter shown in cp_bans
    lc: new Date().toISOString(), // last-hit date
  });
}

function isBanned(value) {
  return db.bans.has(value);
}

// --- logs -------------------------------------------------------------
function logLogin(user) {
  db.loginLog.push({
    id: user.id,
    u: user.username,
    t: user.topic,
    ip: user.ip || '',
    fp: user.fp || '',
    power: user.power,
    rep: user.rep,
    lastseen: user.lastseen,
    regdate: user.createdAt,
  });
}

function logFp({ username, isreg, ip, co, fp, refr, r, topic }) {
  db.fpLog.push({
    isreg: isreg ? 'تسجيل' : 'دخول',
    username,
    topic: topic || username,
    ip: ip || '',
    co: co || '',
    fp: fp || '',
    refr: refr || '',
    r: r || '',
    created: Date.now(),
  });
}

function logAction({ type, u1, u2, room, ip }) {
  db.actionLog.push({ type, u1, u2: u2 || '', room: room || '', ip: ip || '', created: Date.now() });
}

module.exports = {
  db,
  nowId,
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
};
