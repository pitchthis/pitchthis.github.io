# Pitch This: security and privacy

Pitch This is a party game that runs in the browser. This page lays out what it does with your device and your data, and how to check those claims yourself.

## The short version

- **No accounts and no sign-in.** You type a display name. Nothing else is asked.
- **Nothing to install, and no permissions.** No camera, mic, location, notifications, clipboard or file access.
- **No cookies, analytics, ads or tracking scripts.**
- **Only two places are contacted:** this site (GitHub Pages) and the game's own Supabase project. The browser enforces this with a Content Security Policy.
- **Games are deleted automatically** 24 hours after their last change.
- **All of the code is in this repo.** No build step and no hidden code.

## What the game stores

### On the game server (Supabase, Postgres)

Each room is one row in `public.games`. It holds:

| Data | Example |
|---|---|
| Room code | `KWHJ` |
| Display names you typed, plus a role and a color | `Maya`, Founder |
| Random player IDs (8 characters, made in the browser) | `n7o0d9j2` |
| The fake companies dealt each round | `Cryptid Cab` |
| Questions players send during a pitch | "What is your moat?" |
| How each player split their pretend $1M, and the results | 50% / 30% |

A cron job deletes every room left untouched for 24 hours (`supabase/schema.sql`).

The host's secret key for a room sits in a separate table, `public.game_hosts`, which no client can read.

Emoji reactions, slide taps and in-progress bets travel over Supabase Realtime presence and are **not** stored.

### In your browser

| Key | Where | Why |
|---|---|---|
| `pt-pid` | sessionStorage | Your random player ID, so reloading keeps your seat |
| `pt-name`, `pt-role` | localStorage | Pre-fills the join form next time |
| `pt-host-<CODE>` | localStorage (host only) | The host's key for that room |
| `pt-seen-cos` | localStorage (host only) | Fake companies already dealt, so they don't repeat |

To clear all of this, clear the site's data in your browser.

### Logs we don't control

GitHub Pages and Supabase keep standard request logs, which include IP addresses, under their own retention policies. The game doesn't log anything itself.

## What talks to what

```
phone / laptop ──HTTPS──▶ pitchthis.github.io        (the page, app.js, fonts, libraries)
              ──HTTPS──▶ knvaszzjraveyjwnxlhs.supabase.co   (load and save a game)
              ──WSS────▶ knvaszzjraveyjwnxlhs.supabase.co   (live updates for the room)
```

There are no other origins. Fonts and both JavaScript libraries are served from this repo, not from a CDN.

The page sets this Content Security Policy (see `index.html`):

```
default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline';
font-src 'self'; img-src 'self' data:;
connect-src https://knvaszzjraveyjwnxlhs.supabase.co wss://knvaszzjraveyjwnxlhs.supabase.co;
base-uri 'none'; form-action 'none'
```

`'unsafe-inline'` covers styles only, which the game uses for per-company colors. No inline scripts are allowed.

## Who can do what

- **The Supabase key in `app.js` is the public "publishable" key.** It's meant to ship in web pages. It can only do what the database rules below allow.
- **Reading a game:** anyone who knows a room code can read that room, including names and questions. Don't type anything sensitive.
- **Changing a game:** only through `save_game()`, and only with the host key created when the room was opened. Direct inserts, updates and deletes from clients are blocked by row-level security.
- **Size limit:** a saved game can't exceed 200 KB.

## Known limits

This is built for a friendly room, not adversarial play:

- **Room codes are 4 letters** (about 330,000 combinations), so they can be guessed. Anyone with a code can join or watch that room.
- **Players aren't authenticated.** A technical player could send actions in their own room while posing as another player, for example placing someone else's bet. The TV checks every bet against the rules, but it can't prove who sent it. No real money or personal data is involved.
- **Anyone can open new rooms.** Rooms are small and deleted after 24 hours.
- **Fake company names are visible in the game data** before they're revealed on screen. A player reading the raw data could peek. That's a fairness issue, not a security one.

## Check it yourself

1. **Network:** open DevTools → Network while playing. You should only see `pitchthis.github.io` and `knvaszzjraveyjwnxlhs.supabase.co`.
2. **Code:** all game logic is in `app.js`. The page is `index.html`. The server setup is `supabase/schema.sql`.
3. **Libraries:** `vendor/` holds unmodified files from the official npm packages, and `index.html` pins each one by SHA-384 hash, so the browser refuses a changed file. To compare them with npm:

   ```bash
   npm pack @supabase/supabase-js@2.45.4 qrcode-generator@1.4.4
   tar xzf supabase-supabase-js-2.45.4.tgz && cmp package/dist/umd/supabase.js vendor/supabase.js
   tar xzf qrcode-generator-1.4.4.tgz && cmp package/qrcode.js vendor/qrcode.js
   ```

4. **Fonts:** `fonts/` holds Bricolage Grotesque, Figtree and DM Mono from Google Fonts, all under the SIL Open Font License.

## Reporting a problem

Open an issue on this repo, or tell the person who invited you to the game.
