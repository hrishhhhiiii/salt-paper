# Salt Pepper Ops — Implementation Plan

**Audience:** an AI coding agent (Gemini) executing this end to end.
**Repo:** this directory. Currently a static marketing site (`index.html`, `styles.css`, `app.js`, `menu-data.js`, `assets/`).
**Target:** `https://www.saltpepper.co.in` (domain live on Cloudflare, valid SSL, currently serving 404 — nothing deployed).

Read this whole file before writing code. Execute phases **in order**. Do not start a phase until the previous phase's *Definition of done* passes.

---

## 0. Rules you must not break

These come from a real audit of the existing site. Violating them has already cost this project once.

1. **Never invent facts.** No ratings, no review counts, no awards, no testimonials, no menu items, no prices, no opening hours. If a value is unknown, use the literal placeholder `[SET]` (UI) or `NULL` (database) and surface it in the admin as "needs setting".
2. **Never write a fake success state.** A form that says "confirmed" must have actually written to the database or dispatched a message. No `showToast('Confirmed')` without a persisted effect.
3. **Never attribute a quote to a person** unless the name came from a real, cited source. The only verified review quotes are in `menu-data.js` under `REVIEWS_DATA`, attributed to "Google review" with no name. Keep it that way.
4. **Known-true facts** (use these, do not re-derive):
   - Name: Salt & Pepper
   - Address: 24/1 Feeder Road, Belghoria, Kolkata, West Bengal 700056
   - Phone / WhatsApp: `+91 89617 27684` → `+918961727684`
   - Closes 22:45 daily. Takeaway counter closes 22:30.
   - Price band: ₹200–400 per person
   - Services: dine-in, takeaway, delivery, live music, vegan options
5. **Unknowns that a human must supply — do not guess:**
   - `OPENING_TIME` (only the closing time is known)
   - The full real menu with real prices (only ~5 items are currently verified)
   - Whether a Zomato/District listing exists (the old link 404'd and was removed)

---

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15**, App Router, TypeScript | Vercel-native, server actions remove most API boilerplate |
| Database | **Supabase** (Postgres) | Free tier is sufficient at this volume |
| Realtime | **Supabase Realtime** (Postgres changes) | The kitchen display must update without polling — this is the hard requirement that picks the stack |
| Auth | **Supabase Auth**, email + password | Staff only. No public accounts in any phase. |
| Styling | **Tailwind CSS v4**, tokens from §3 | |
| Hosting | **Vercel** | Repo already has commits targeting Vercel |
| Messaging | **WhatsApp Cloud API** (Meta) | Phase 4 |
| Payments | **Razorpay** (UPI intent + cards) | Phase 3. Until then: cash on delivery / pay at counter only. |

Do **not** add: a state management library (server components + URL state are enough), an ORM (use `supabase-js`), a component library (the spec in §3 is the component library), or any analytics SDK.

---

## 2. Repository layout

Create a Next.js app **in place**. Preserve the optimised images in `assets/` — they were compressed from 7.5MB to 812KB and must not be regenerated.

```
salt-pepper/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # marketing home (port of index.html)
│   │   ├── menu/page.tsx             # QR digital menu
│   │   ├── order/page.tsx            # online ordering
│   │   ├── reserve/page.tsx          # reservations
│   │   ├── layout.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── (ops)/
│   │   ├── layout.tsx                # auth gate + sidebar
│   │   ├── orders/page.tsx
│   │   ├── kitchen/page.tsx          # KDS, fullscreen, no sidebar
│   │   ├── pos/page.tsx
│   │   ├── menu/page.tsx             # menu management
│   │   └── inventory/page.tsx
│   ├── api/
│   │   ├── whatsapp/route.ts         # Meta webhook (GET verify + POST receive)
│   │   └── razorpay/webhook/route.ts
│   ├── login/page.tsx
│   └── globals.css
├── components/
│   ├── ui/                           # Button, Input, Chip, StatusPill, StatTile, Toast
│   └── ops/                          # TicketCard, OrderRow, MenuItemRow, QtyStepper
├── lib/
│   ├── supabase/{client,server,middleware}.ts
│   ├── orders.ts                     # createOrder, advanceStatus, subscribeToOrders
│   ├── menu.ts
│   ├── whatsapp.ts
│   └── format.ts                     # inr(), duration(), tabular helpers
├── supabase/migrations/              # numbered .sql files
├── public/assets/                    # MOVE existing assets/ here unchanged
├── middleware.ts                     # protects /orders /kitchen /pos /menu /inventory
├── IMPLEMENTATION_PLAN.md
└── Salt_and_Pepper_Belghoria_Research.md   # keep
```

Delete after porting: `index.html`, `styles.css`, `app.js`, `server.js`, `.claude/launch.json`.
Keep `menu-data.js` **until Phase 1 seeding is done**, then delete it.

---

## 3. Design tokens

Source of truth. Put in `app/globals.css` as CSS variables and mirror in `tailwind.config.ts`.

```css
:root {
  --sp-app:        #16110F;  /* page background */
  --sp-surface:    #1E1917;  /* cards, bars */
  --sp-raised:     #2A2320;  /* inputs, tiles on surface */
  --sp-border:     #3A322D;
  --sp-text:       #F5EFE6;
  --sp-muted:      #9E9187;  /* passes 4.5:1 on --sp-surface */
  --sp-chilli:     #C8452F;  /* primary action, late, modifiers */
  --sp-chilli-lt:  #E0715C;  /* chilli text on dark — the solid fails contrast */
  --sp-brass:      #C79A55;  /* accent, firing */
  --sp-blue:       #5B8CA8;  /* new */
  --sp-veg:        #4B8F5E;
}
```

**Typography** — `next/font/google`:
- `Fraunces` — display only (marketing headings, empty states). Never in dense UI.
- `Archivo` — all interface text.
- `IBM Plex Mono` — order numbers, timers, money. Always `font-variant-numeric: tabular-nums`.

**Scale:** 11 / 13 / 16 / 20 / 24 / 32 / 44. **Spacing:** 4 8 12 16 24 32 48. **Radius:** 2 chip, 4 card, 8 modal, 999 pill.

### Non-negotiable UI rules

- Touch targets: **72px minimum inside `/kitchen`**, 44px everywhere else.
- **Status is never colour alone** — always render the word beside it. The four states differ in lightness as well as hue; never substitute a red/green pair.
- Money and timers: mono, tabular, right-aligned.
- Every interactive element is a real `<button>` / `<a href>` / `<input>` + `<label>`. Never `onClick` on a `div`.
- `prefers-reduced-motion` honoured globally.

---

## 4. Database

`supabase/migrations/0001_init.sql`:

```sql
create type order_channel as enum ('dine_in','takeaway','delivery','whatsapp','web');
create type order_status  as enum ('new','firing','ready','served','cancelled');
create type staff_role    as enum ('owner','manager','kitchen','counter');

create table profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text not null,
  role        staff_role not null default 'counter',
  created_at  timestamptz not null default now()
);

create table categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  sort_order int  not null default 0
);

create table menu_items (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid references categories on delete set null,
  name         text not null,
  description  text,
  price_paise  int,                         -- NULL = price not set; item hidden from ordering
  is_veg       boolean not null default false,
  is_available boolean not null default true,
  is_published boolean not null default false,
  image_path   text,
  sort_order   int not null default 0,
  updated_at   timestamptz not null default now()
);

create table orders (
  id            uuid primary key default gen_random_uuid(),
  short_code    int generated always as identity (start with 3400),  -- the #3418 on tickets
  channel       order_channel not null,
  status        order_status  not null default 'new',
  table_label   text,
  customer_name text,
  customer_phone text,
  note          text,
  subtotal_paise int not null default 0,
  tax_paise      int not null default 0,
  total_paise    int not null default 0,
  placed_at     timestamptz not null default now(),
  started_at    timestamptz,
  ready_at      timestamptz,
  closed_at     timestamptz
);
create index orders_open_idx on orders (status, placed_at)
  where status in ('new','firing','ready');

create table order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders on delete cascade,
  menu_item_id  uuid references menu_items on delete set null,
  name_snapshot text not null,               -- never join for display; price/name can change
  unit_paise    int  not null,
  qty           int  not null check (qty > 0),
  modifiers     text                         -- free text, e.g. "extra spicy, no onion"
);

create table reservations (
  id            uuid primary key default gen_random_uuid(),
  guest_name    text not null,
  guest_phone   text not null,
  party_size    int  not null check (party_size between 1 and 30),
  requested_at  timestamptz not null,
  status        text not null default 'requested'
                check (status in ('requested','confirmed','seated','no_show','cancelled')),
  note          text,
  created_at    timestamptz not null default now()
);

-- Phase 6 only
create table inventory_items (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  unit          text not null,               -- kg, L, pc
  on_hand       numeric(10,2) not null default 0,
  par_level     numeric(10,2) not null default 0
);
create table recipe_lines (
  menu_item_id      uuid not null references menu_items on delete cascade,
  inventory_item_id uuid not null references inventory_items on delete cascade,
  qty_per_serving   numeric(10,3) not null,
  primary key (menu_item_id, inventory_item_id)
);
```

`0002_rls.sql`:

```sql
alter table profiles, categories, menu_items, orders, order_items,
      reservations, inventory_items, recipe_lines enable row level security;

-- Public may read only published, priced menu
create policy menu_public_read on menu_items for select
  using (is_published = true and price_paise is not null);
create policy cat_public_read on categories for select using (true);

-- Public may create orders and reservations, never read them back
create policy orders_public_insert     on orders       for insert with check (true);
create policy order_items_public_insert on order_items for insert with check (true);
create policy res_public_insert        on reservations for insert with check (true);

-- Staff: full access
create policy staff_all_orders on orders for all
  using (auth.uid() in (select id from profiles));
-- repeat the staff_all pattern for order_items, menu_items, categories,
-- reservations, inventory_items, recipe_lines
```

`0003_realtime.sql`:

```sql
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table order_items;
```

**Money is `int` paise everywhere.** Never float. `lib/format.ts` exposes `inr(paise)` → `₹1,194`.

---

## 5. Phases

### Phase 0 — Ship the marketing site on the real stack
Port `index.html` into `app/(public)/page.tsx` as components. Carry over verbatim: the JSON-LD `Restaurant` schema, OG tags, canonical, `robots`/`sitemap`, the sticky mobile call bar, the `tel:` links, the three real Google quotes. Move `assets/` to `public/assets/` **without re-encoding**.

*Definition of done:* `https://www.saltpepper.co.in` returns 200 and renders the site. Lighthouse mobile performance ≥ 90. `curl -sI` shows 200, not 404. Rich Results Test validates the Restaurant schema.

> This is the highest-value phase in the document. Today every customer who taps "Website" on the Google listing hits a 404.

---

### Phase 1 — Menu management + digital menu
Build `/menu` (ops) and `/menu` (public QR).

- Ops: list by category, inline edit name/price/veg, **one-tap availability toggle** (must work one-handed on a phone, mid-service — this single feature decides whether the system gets used), publish/draft state.
- Items with `price_paise IS NULL` render as `₹[SET]` in ops and are **excluded** from the public menu by RLS.
- Public: category chips, veg filter, sold-out items shown greyed with "Finished for today" rather than hidden — guests ask otherwise.
- Seed from `menu-data.js`, but **mark every unverified item `is_published = false`**. Only the ~5 items confirmed against the Google listing start published. A human publishes the rest after checking prices.
- Generate a QR pointing at `/menu?table=<n>`.

*Definition of done:* toggling availability in ops changes the public menu within 2s without a deploy. No unverified price is publicly visible.

---

### Phase 2 — Unified orders + kitchen display
The core. `/orders` and `/kitchen`.

- `lib/orders.ts` exposes `subscribeToOrders()` using Supabase Realtime on `orders` + `order_items`.
- `/kitchen`: 1920×1080 wall layout, ticket grid + "ready for pickup" rail. Tickets carry `#short_code`, channel, table, a live `mm:ss` since `placed_at`, items with qty, and **modifiers in chilli** — the single most-missed thing in a kitchen.
- Status transitions are the only interaction: `new → firing` (START), `firing → ready` (READY). Buttons are 72px. Ready tickets auto-clear from the rail 3 minutes after `ready_at`.
- Late = `now() - placed_at > 15 min` and not ready. Render the LATE word, not just the colour.
- `/orders`: all channels in one table, filter chips by channel, stat tiles (open, avg prep, late, today's total).

*Definition of done:* create an order in one browser tab; it appears on `/kitchen` in another tab in under 2 seconds with no refresh. Timers tick. Marking ready moves it to the rail and clears it after 3 minutes.

---

### Phase 3 — Online ordering + reservations
Public `/order` and `/reserve`, both writing real rows.

- `/order`: cart, qty steppers, kitchen note, phone, delivery/takeaway toggle, totals with 5% GST. Submit → `orders` + `order_items` via a server action → appears on `/kitchen` immediately.
- `/reserve`: party size, day, time slot, name, phone. Writes a `reservations` row with status `requested`. The UI must say **"request"**, never "confirmed" — a member of staff confirms by phone. (The old site claimed "Reservation confirmed" and sent the booking nowhere. Do not reintroduce this.)
- Slots are derived from `OPENING_TIME` (see §0 unknowns) to 22:45. **If `OPENING_TIME` is unset, render the slot grid disabled with "Hours not configured" rather than guessing.**
- Razorpay UPI intent; cash on delivery always available as a fallback.

*Definition of done:* an order placed from a phone browser reaches the kitchen screen. A reservation request appears in ops. Neither path ever tells the guest something is confirmed when no row was written.

---

### Phase 4 — WhatsApp
`app/api/whatsapp/route.ts` — `GET` for Meta's webhook verify challenge, `POST` for inbound messages.

- Parse free text into a draft order against `menu_items`. Reply with a **confirmation summary + interactive buttons** (Delivery / Takeaway / See menu). Only create the order after explicit confirmation.
- **If parsing is ambiguous, hand off to a human immediately.** Never guess an order. Post the raw message into `/orders` as an unparsed item for staff to handle.
- Sold-out items are never offered — read `is_available` live.
- The resulting order is an ordinary `orders` row with `channel = 'whatsapp'`. It is not a side door: it renders on the KDS identically to every other ticket.

*Definition of done:* a real WhatsApp message to `+918961727684` produces a ticket on `/kitchen` tagged WhatsApp.

---

### Phase 5 — POS
`/pos`, 1280×800 landscape tablet. Category tabs, dish grid, running bill, GST, split bill, hold, Cash/Card/UPI, SEND TO KITCHEN. Sold-out dishes render disabled, not hidden.

*Requires hardware.* Do not start until a tablet exists.

---

### Phase 6 — Inventory
`/inventory`, plus `recipe_lines` mapping dishes to ingredients. Selling a dish decrements stock. Crossing below `par_level` raises an alert and **auto-sets `is_available = false`** on affected dishes.

*Blocked on real kitchen work:* someone must write the recipe map. Roughly a week. Do not attempt with invented quantities — that is worse than no inventory system. Ship Phases 1–2 first and let the menu data prove itself.

---

## 6. Environment

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # server only, never NEXT_PUBLIC_
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_SITE_URL=https://www.saltpepper.co.in
RESTAURANT_PHONE=+918961727684
OPENING_TIME=                        # UNSET — a human must fill this
```

Never expose the service role key to the client. Never commit `.env.local`.

---

## 7. Commands

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
npm i @supabase/supabase-js @supabase/ssr
npx supabase init && npx supabase link --project-ref <ref>
npx supabase db push
npm run dev
npx vercel --prod
```

---

## 8. Definition of done — whole project

- [ ] `saltpepper.co.in` returns 200 on `/`, `/menu`, `/order`, `/reserve`
- [ ] Ops routes return 302 to `/login` when signed out
- [ ] An order from any of the five channels appears on `/kitchen` in under 2 seconds
- [ ] Toggling a dish sold-out removes it from the public menu and the WhatsApp bot without a deploy
- [ ] No page displays a rating, review count, award, or testimonial that is not traceable to a cited source
- [ ] No form reports success without a persisted row or dispatched message
- [ ] Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility on every public route
- [ ] `grep -rn "\[SET\]"` returns only intentional placeholders, and each is listed in the admin as needing a value

---

## 9. Hand back to a human

Stop and ask rather than guessing:
1. `OPENING_TIME`
2. The real menu with real prices (photograph the physical menu card)
3. Confirmation that `+918961727684` is the right WhatsApp number for order traffic
4. Whether a Zomato/District listing exists, and its real URL
5. Real photographs of the actual dishes — current images are generic stock and do not depict this kitchen's food
