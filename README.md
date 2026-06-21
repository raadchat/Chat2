# X3 Chat - Rebuilt Server

A from-scratch Node.js/Socket.IO backend that speaks the same wire protocol
as your existing client files (`index.html`, `cp.html`, `appraad2.js`,
`sm.js`, `b.js`), recovered by reading the *entire* obfuscated client
source - both every outgoing call site and the full ~1370-line incoming
dispatcher, line by line. This is **not** the original server code (that's
impossible to recover from a client bundle alone) - it's a clean-room
implementation of the *contract* the client expects, with reasonable
business logic filled in wherever the client doesn't reveal what the
server used to do.

## Run it

```bash
npm install
npm start
# open http://localhost:3000/         (lobby / login)
# open http://localhost:3000/cp.html  (control panel)
```

Your original client files are already in `public/`, with two small fixes:

1. Added `<script src="/socket.io/socket.io.js"></script>` before
   `appraad2.js` in both pages - the client calls the global `io()`
   function but never loaded the library itself in your saved copies.
2. Removed a stray `<script src="moz-extension://...eruda.js">` tag from
   `cp.html` - a leftover from a browser debugging extension when the
   page was saved, not part of the real app.

## The protocol, as recovered

Every socket.io event is multiplexed through one event name, `"msg"`:
`{ cmd: "<scrambled>", data: {...} }`. The `cmd` field is XOR-scrambled
(symmetric, same function encodes/decodes) - see `src/protocol.js`. This
part is mechanically confirmed correct (round-tripped `login`, `pm`, `cp`,
`p2`, etc. in testing).

### Login / register - the part most likely to surprise you

Login and registration results are **not** separate top-level commands.
Everything comes back as:

```js
{ cmd: "login", data: { msg: "ok" | "noname" | "badname" | "usedname" | "badpass" | "wrong" | "reg", id, ttoken } }
```

A successful **register** replies with `msg:"reg"` only - the client then
automatically re-submits a real login with the same credentials. It does
not log the user in directly.

Separately, the top-level `ok` / `nok` commands are a *connection-level*
handshake, unrelated to the per-user login above: right after the socket
connects, the server sends `{cmd:"ok", data:{k}}`, and the client caches
`k` for silent reconnects (see below). This already happens automatically
in `server.js` - you don't need to do anything for it to work.

### Reconnects (`rc2` / `rc` / `rcd`)

On page refresh, the client emits a **raw** socket.io event (not wrapped
in `"msg"`): `rc2: { token, n }`. If valid, the server is expected to:

1. Send `{cmd:"rc"}` - this tells the client to start *buffering* any
   further dispatched commands instead of acting on them.
2. Send `{cmd:"rcd", data: [[cmd1,data1], [cmd2,data2], ...]}` - a full
   batch of state-restoring events (login confirmation, power, room list,
   user list, current room, etc.), replayed in order, followed by
   anything that was buffered during the gap.

This avoids UI flicker/races during reconnect. Implemented in
`sendReconnectBatch()` in `src/handlers.js`.

### Field names that differ from "obvious" guesses

- A user's display name is `topic`, not `nick`.
- Username color is `ucol`, not `color` (though the *incoming* `setprofile`
  command from the client does send a field literally called `color` -
  the server just stores it as `ucol` internally).
- A room's voice flag is `v`, its live mic-queue array is `m` (not
  `voiceEnabled`/`mic`).
- Moving an *already-known* user between rooms uses `ur: [userId, roomId]`
  - not `u+`/`u-`. Those two are reserved for a user appearing on / fully
  disappearing from the whole site (login / full disconnect). `u^` is a
  partial field merge (rename, profile edit, rep change, etc).

### Full command map

**Client -> Server**, via the `msg` envelope:
`login, reg, g, online, logout, rjoin, r+, r-, v, rinvite, bc, pm, pmsg,
ppmsg, ty, file, setprofile, setpic, setLikes, unick, uma, uml, umm, uh,
mic, micstat, op+, ops, action (cmd: like/gift/report/kick/roomkick/ban/
delpic/not), bnr, bnr-, nonot, nopm, p2, call, cp (many sub-cmds - see
below), cpi`

Plus `rc2` sent as a raw event outside the envelope.

**`cp` sub-commands** (`{cmd:'cp', data:{cmd:<sub>, ...}}`), each with a
confirmed response event: `ban/aban/unban -> cp_bans`, `likes/pwd/delu`
(no confirmed response), `setpower -> u^`, `bot -> cp_bots`,
`domainsave -> cp_domains`, `sitesave -> cp_owner`, `fltrit/fltrdel/
fltrdelx -> cp_fltr`, `addico -> ico+`, `delico -> ico-`, `emo_order`,
`msgsdel -> cp_msgs`, `shrtdel -> cp_shrt`, `powers_save/powers_del ->
powers`, paginated logs `logins -> cp_logins`, `fps -> cp_fps`,
`actions -> cp_actions`. There is **no confirmed "open the panel and load
everything" event** in the client source - `cp:{cmd:'init'}` in this
server is a guess; watch your browser's network tab when opening
`cp.html` for real and rename it if the client sends something else.

**Server -> Client**: `ok, nok, login (msg:...), online, online+, online-,
ulist, rlist, u+, u-, u^, u++, ur, r+, r-, r^, bc, bc^, bclist, delbc, pm,
pmsg, ppmsg, msg, dmsg, power, powers, ops, rops, rc, rcd, close, mi+, mv,
emos, sico, ico+, ico-, settings, server, ur, uh, not, ty, p2, call,
cp_actions, cp_bans, cp_bots, cp_domains, cp_fltr, cp_fps, cp_logins,
cp_msgs, cp_owner, cp_rooms, cp_shrt, cp_sico, cp_subs`

### Deliberately not implemented: `ev`

The client also listens for a command `ev` whose entire handler is
`eval(data.data)` - i.e. the original server could push arbitrary
JavaScript to run in every connected browser. That's a remote-code-
execution channel by design. Nothing in this server sends it, and no admin
button triggers it. If you genuinely need a "push a live script to
everyone" feature, it deserves a dedicated security review, not a default
wire-up.

## Confidence levels, throughout `src/handlers.js`

- **[WIRE]** - event name and field names taken straight from the client
  source. High confidence.
- **[DESIGN]** - the business logic *behind* that event (exact extra
  fields, when exactly something fires) is this server's own
  implementation, since that only ever lived on the original server.
  Solid starting point, not gospel.

Known soft spots, in roughly the order you'll hit them testing:
- Gift delivery has no confirmed dedicated wire event - delivered via the
  confirmed `pm` channel with an extra `gift` field as a fallback.
- `cp_bots` (fake/virtual users) - settings shape is confirmed, but the
  bot-spawning *behavior* (auto join/leave on a timer) isn't implemented,
  only the data plumbing.
- `cp_domains` (multi-site hosting) - basic CRUD only.
- Permission gating on `cp`/admin commands is close to absent (`TODO`
  marked in code) - add a real check against `power` flags before
  exposing this to untrusted users.

## Suggested next step

Run the server, open `index.html`, open devtools, and walk through:
register -> log in -> create a room -> join it -> send a message -> try a
voice call -> open the control panel. Fix whichever handler complains
first, repeat - much faster than trying to perfect everything from static
analysis alone.

## Project layout

```
server.js        entry point (Express static files + Socket.IO)
src/protocol.js  the cmd XOR codec + send helpers
src/store.js     in-memory data (users/rooms/bans/logs/...) - swap for a real DB
src/handlers.js  one handler per recovered command
public/          your original client files (lightly patched, see above)
```
