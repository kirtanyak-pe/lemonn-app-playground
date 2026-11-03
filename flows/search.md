# Flow: Search (`search`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `4afbde2` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Search stocks, US stocks, F&O contracts, mutual funds and IPOs; Smart Options & Futures lists; add to watchlist.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/search · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/search.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `search-01` | Stocks · before typing | [4912:13308](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13308) | `stocks-01`, `search-18` | From the search field on Stocks home. Recent (last 5) and popular searches as chips, max 200 wide. Type to search; the tabs switch in place. |
| `search-24` | Stocks · before typing (from Market) | [4912:13308](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13308) | `market-01`, `search-18` | Opened from the Search action on the Market tab: the same screen as search-01, but back returns to Market. |
| `search-02` | Stocks · results | [4912:13483](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13483) | `stocks-01`, `search-18` | "Bank": 2 matching watchlists, then 8 stocks. A bookmark opens Add to watchlist; ✕ clears. |
| `search-03` | Stocks · only a watchlist matches | [4912:13671](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13671) | `stocks-01` | "Penny": the watchlist, and "Stocks (0)" with nothing under it. |
| `search-04` | Stocks · no matching watchlist | [4912:13587](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13587) | `stocks-01`, `search-18` | Same results without the watchlist group. |
| `search-05` | Stocks · nothing found | [4912:13703](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13703) | `stocks-01` | L3 empty state with the L3 default illustration (Figma still has the old magnifier). Clear Search empties the field. |
| `search-29` | US · before typing | [5796:89230](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5796-89230) | `stocks-01` | From the search field on Stocks home’s US tab, or Search on the US Portfolio. Recent and popular US stocks as chips (a chip searches for that company), then US collections as tiles. Back returns to where Search was opened. |
| `search-30` | US · results | — | `stocks-01` | "N": US stocks by name or ticker, with $ prices. A row opens that stock’s US stock page. |
| `search-31` | US · nothing found | — | `stocks-01` | No US stock matches: L3 empty state with Clear search. |
| `search-25` | F&O · search from home | [4912:13728](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13728) | `fno-01`, `search-26` | From F&O home; Back returns there. |
| `search-28` | F&O · “Gold” results (illiquid) | — | `fno-01`, `search-26` | Typing “Gold” on the F&O tab (live app reference, 2026-10-29): MCX gold options with the gold artwork. Illiquid contracts (GOLD 135000 Put, GOLD 150000 Call) carry the ILLIQUID tag after the name; tapping the tag opens “What does illiquidity mean?”. Tapping a row opens the contract’s asset page (fno-21); an illiquid one opens the ILLIQUID asset page (fno-22). |
| `search-26` | F&O home · all Smart Options | [4912:13925](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13925) | `fno-01` |  |
| `search-27` | F&O home · all Smart Futures | [4912:14019](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14019) | `fno-01` | Uses the existing combined Smart Options & Futures stock list. |
| `search-06` | F&O · before typing | [4912:13728](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13728) | `stocks-01`, `search-09` | Recent and popular contracts, then the Smart Options & Futures lists as tiles (a long name wraps; its row grows). |
| `search-07` | F&O · results | [4912:14199](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14199) | `stocks-01` | "Bank": watchlists (no count on this tab), then the contracts. |
| `search-08` | F&O · nothing found | [4912:13902](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13902) | `stocks-01` |  |
| `search-09` | Smart Options & Futures · indices | [4912:13925](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13925) | `search-06` | The ↕ pill switches Indices / Stocks; pills pick the list; Price ↕ switches the sort to Volume. |
| `search-10` | Smart Options & Futures · stocks | [4912:14019](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14019) | `search-06` |  |
| `search-11` | Smart Options & Futures · by volume | [4912:14113](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14113) | `search-06` | Sorted by volume: each row shows its volume instead of price + change. |
| `search-12` | MF · before typing | [4912:13035](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13035) | `stocks-01` | Recent and popular funds, then collections as tiles. |
| `search-13` | MF · results | [4912:12952](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-12952) | `stocks-01` | "Bank": watchlists, then funds with 3Y returns; the 3Y Returns ↕ switcher changes the period. |
| `search-14` | MF · no fund matches | [4912:13010](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13010) | `stocks-01` | Other tabs have results ("Energy"), this one has none: the empty state on this tab only. |
| `search-15` | IPO · before typing | [4912:13116](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13116) | `stocks-01` | Recent and popular IPOs, then Most Subscribed and Upcoming IPOs (View All each). |
| `search-16` | IPO · results | [4912:13240](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13240) | `stocks-01` | "Energy": 2 IPOs with their price bands. |
| `search-17` | IPO · nothing found | [4912:13274](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-13274) | `stocks-01` |  |
| `search-18` | Add to watchlist | [4912:14274](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14274) | `stocks-01`, `search-18`, `search-20`, `search-22`, `search-02` | From HDFC Bank’s bookmark. Nothing ticked yet: Save is off. The keyboard goes down while the sheet is open. |
| `search-19` | Add to watchlist · 2 ticked | [4912:14811](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14811) | `stocks-01`, `search-18`, `search-20`, `search-22`, `search-02` |  |
| `search-20` | Added · toast | [4912:15015](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-15015) | `stocks-01`, `search-18`, `search-21` | Floating L3 toast with OK; it leaves on its own (L3 timing: 6 s with an action — Figma says 2 s). |
| `search-21` | Added · bookmark filled | [4912:15123](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-15123) | `stocks-01`, `search-18` | HDFC Bank’s bookmark is now filled with a tick. |
| `search-22` | Create watchlist | [4912:14650](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14650) | `stocks-01`, `search-18`, `search-20` | From "+ Create" (or the first time, when there’s no watchlist yet). The keyboard sits under the dock. |
| `search-23` | Add to watchlist · few lists | [4912:14477](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-14477) | `stocks-01`, `search-18`, `search-20`, `search-22`, `search-02` | Someone with 4 watchlists: the sheet is only as tall as its rows. |

## Spec (README.md)


> **ILLIQUID contracts** span this flow and others — read [`docs/ILLIQUID.md`](https://kirtanyak-pe.github.io/lemonn-app-prototype/ILLIQUID.md) (rule, data flag, UI patterns, every place) before building any of it.

F&O home entry points (2026-10-26): `search-25` opens F&O search, `search-26` opens the existing combined Smart Options & Futures index list, and `search-27` opens its stock list. Back returns to `fno-01` for these entry points.

> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the Figma links and the screens in this folder — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/search · one screen: `#/search-01`
- **Figma:** [Search → 🌙 Dark](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=4912-12950) (dev
  handoff file) — **final layouts** in the old D2 system. This flow keeps every layout as it is and swaps the parts for
  L3 components, tokens and text styles. Figma frames are dark; the code works in every L3 theme.
- **Status:** ✅ · last updated 2026-11-01
- **Entry:** the search field on Stocks home (`stocks-01`; on the US tab → `search-29`), the Search action on Market
  (`market-01` → `search-24`), or Search on the US Portfolio (`us-stocks-05`) ·
  **Exit:** back → where it was opened from (Stocks home or Market); a result opens its page
  (stock / contract / fund / IPO page — not in this flow)

### Screens

| Id | Screen | Figma | What it shows / when |
|---|---|---|---|
| `search-01` | Stocks · before typing | 4912:13308 | Recent searches (last 5) and popular searches as chips; keyboard up, field focused |
| `search-24` | Stocks · before typing (from Market) | 4912:13308 | Same as `search-01`, opened from Market's Search action; back returns to Market |
| `search-02` | Stocks · results | 4912:13483 | "Bank": Your watchlist (2), then Stocks (8) with price, change and a bookmark each |
| `search-03` | Stocks · only a watchlist matches | 4912:13671 | "Penny": one watchlist, "Stocks (0)" |
| `search-04` | Stocks · no matching watchlist | 4912:13587 | "Bank" without the watchlist group |
| `search-05` | Stocks · nothing found | 4912:13703 | Empty state + Clear Search |
| `search-29` | US · before typing | 5796:89230 | Recent / popular US stocks as chips (a chip searches for it), then US collections as tiles; back → where Search was opened |
| `search-30` | US · results | — | "N": US stocks by name or ticker, $ price and change; a row opens the US stock page (`us-stocks-13`) |
| `search-31` | US · nothing found | — | Empty state + Clear Search |
| `search-06` | F&O · before typing | 4912:13728 | Recent / popular contracts, Smart Options & Futures tiles (View All) |
| `search-07` | F&O · results | 4912:14199 | "Bank": watchlists (no count), Contracts (4) |
| `search-08` | F&O · nothing found | 4912:13902 | Empty state |
| `search-09` | Smart Options & Futures · indices | 4912:13925 | ↕ Indices pill, list pills, Filter + Price ↕, contracts with price + change |
| `search-10` | Smart Options & Futures · stocks | 4912:14019 | Same, for stock contracts |
| `search-11` | Smart Options & Futures · by volume | 4912:14113 | Sorted by Volume: rows show the volume |
| `search-12` | MF · before typing | 4912:13035 | Recent / popular funds, Collections tiles (View All) |
| `search-13` | MF · results | 4912:12952 | "Bank": watchlists, Funds (2) with 3Y returns, 3Y Returns ↕ |
| `search-14` | MF · no fund matches | 4912:13010 | Other tabs have results, MF has none → empty state on this tab |
| `search-15` | IPO · before typing | 4912:13116 | Recent / popular IPOs, Most Subscribed, Upcoming IPOs (View All each) |
| `search-16` | IPO · results | 4912:13240 | "Energy": IPOs (2) with price bands |
| `search-17` | IPO · nothing found | 4912:13274 | Empty state |
| `search-18` | Add to watchlist | 4912:14274 | Sheet: every watchlist as a checkbox row, + Create, Save off until one is ticked |
| `search-19` | Add to watchlist · 2 ticked | 4912:14811 | Save on |
| `search-20` | Added · toast | 4912:15015 | "Stock added to watchlist successfully" + OK |
| `search-21` | Added · bookmark filled | 4912:15123 | The toast has gone; the bookmark shows the tick |
| `search-22` | Create watchlist | 4912:14650 | Sheet: Watchlist Name + Create, keyboard under the dock |
| `search-23` | Add to watchlist · few lists | 4912:14477 | 4 watchlists: a short sheet |

(4912:15232 "Stock → Search results" in the watchlist section is the same screen as `search-02`.)

### Navigation

```
market Search action ─▶ search-24 (= search-01; back ─▶ market-01)
stocks-01 search field ─▶ search-01 (US tab on Home ─▶ search-29; US Portfolio Search ─▶ search-29)
search-29/30 US row ─▶ us-stocks-13 (that stock) ─back─▶ search
stocks-01 search field ─▶ search-01 ─type─▶ results in place (search-02 …) · tabs switch in place · ✕ / Clear Search ─▶ before typing
search-06 tile / View All ─▶ search-09 ─back─▶ search-06        (↕ pill, list pills and Price ↕ change the list in place)
search-02 bookmark ─▶ search-18 ─tick─▶ search-19 ─Save─▶ search-20 (toast) ─OK / auto─▶ search-21
                      search-18 + Create ─▶ search-22 ─Create─▶ search-20 · no watchlist yet: bookmark ─▶ search-22
any screen ─back─▶ where Search was opened from (stocks-01 / market-01)
```

### Data

`data.ts` (types = the API contract, values = examples from Figma):
- `search(query)` → `SearchResults` `{ query, counts: {stocks, us, fno, mf, ipo}, tabs: { [tab]: { watchlists, listTitle, items } } }`.
  A tab with no entry shows the empty state. Real app: one search call per (debounced) query.
- `WatchlistMatch` `{ id, name, initials, count? }` — `count` ("2 stocks") on the Stocks tab only.
- `SearchResult` `{ id, name, detail, initials?, logoUrl?, price?, changePct?, returnsLabel?, priceBand?, volume?, saved?, currency? }`
  — stocks: logo + price + change; US stocks: `currency: 'usd'`, `id` = ticker, detail "NASDAQ • NVDA", $ price; contracts: no logo; funds: no logo, "3Y" + returns; IPOs: logo + price band.
- Before typing: `recent[tab]` (max 5), `popular[tab]` (1–2 rows), `signalCategories`, `collections`, `usCollections`, `ipoLists`.
- US tab: chips and results come from the shared US catalogue (`src/shared/data/usStocks.ts`: name, exchange, $ price,
  change, logo); `usStocks(q)` matches the ticker or any word of the name onward.
- Signals: `signalScopes` (Indices / Stocks, each with its lists), `indexSignals`, `stockSignals`, sort `price | volume`.
- Watchlists: `allWatchlists` (the sheet), `fewWatchlists`.
- API: search(query) · add item to watchlists(ids) · create watchlist(name) · signals list(scope, list, sort, filters).

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar ("L3: Actionbar", Base content Search / Searched) | `onBack`, `search={{ value, onChange, placeholder }}`, ✕ = `ActionbarAction variant="ghost"` (`close`) once typed |
| Tabs under the bar | Tabs ("L3: Tabs group", Flat, isSmall) | `size="sm"`, labels "Stocks (8)" once there's a query; fill the row |
| Group labels | — (text) | Label/12, `content/tertiary`, 16 tall, 16 from the edges; 24 between groups |
| View All | Button ("L3: Button" Ghost Small) | `variant="ghost" size="sm"`, chevron right |
| Recent / popular chip | Card (clickable) + Avatar | `padding="none"`, radius 8, no shadow (1px `border/light` only); inside: 8 / 12 / 8 / 8 padding, Avatar 24 rounded (initials), Label/12 `content/tertiary`; max 200 wide; rows scroll sideways |
| Watchlist match | ListCell ("L3: list cell", card, tappable, small) | `variant="card" size="sm" as="button"`, Avatar 32 rounded, label + "n stocks", chevron; 12 apart |
| Result row | ListCell (plain, small, breathable) + Avatar + PriceChange | `size="sm" density="breathable" as="button"` (70 tall); right: price (Label/12) over `PriceChange size="sm"` (sign, no arrow); 1px `border/light` line under each row, 16 in |
| Bookmark | Button (Ghost, icon only) + L3 custom icons | `variant="ghost"` (lg, 24 icon): `watchlist_add` (outline bookmark with +) / `watchlist_added` (filled, ✓ cut out) when saved — Icons library → Custom icons; 16 from the edge |
| F&O / MF tiles | Card (clickable) | radius 8, no shadow (1px `border/light` only); 2 columns, 12 apart; label Label/12 (MF: `content/tertiary`), 10 / 12 padding |
| Sort | Select ("L3: Select switcher") | `size="sm" icon="swap"`: Price ↕ / Volume, 3Y Returns ↕ |
| Filter | Button | `variant="ghost" size="sm"`, `filter_list` on the right |
| Indices / Stocks pill | Tab (action pill) | `action appearance="pill"`, ↕ icon right — switches the underlyings |
| Signals lists | Tabs (pill) | `appearance="pill"` (md), in the top bar's bottom slot, 12 above and below |
| Nothing found | EmptyState ("L3 → Empty state") | default illustration; "No search results found" / "Make sure you’ve spelled it correctly."; Clear Search = Button (primary, `sm`, `delete_forever`) — the empty state's action is Small |
| Add to watchlist | BottomSheet + BottomSheetHeader + ListCell + Checkbox + ButtonGroup | header `trailing` = Tertiary Small "+ Create"; rows `as="label"`, Checkbox in `iconLeft`; Save (primary lg) off until one is ticked |
| Create watchlist | BottomSheet + TextField + ButtonGroup | "Watchlist Name" (typing), Create (primary lg) |
| Added | Aerobar (floating, primary) | `check` icon, heading, action OK |
| Keyboard | — | the phone's own keyboard (drawn in the prototype: `src/shared/ui/TextKeyboard`) |
| Layout | Section · Stack · Inset · Grid (Figma auto-layout frames) | Body: Section `paddingBlock="16" gap="24"`; groups Stack `as="section" gap="12"`; group header Inset `paddingInline="16"` → Stack `direction="horizontal" align="center" justify="between" gap="08"`; chip rows Stack `gap="12"` of horizontal Stacks `gap="12"`; tiles Inset 16 → Grid `columns={2} gap="12"`; watchlist rows Section `paddingInline="16" gap="12"`; results Stack `as="ul"` of horizontal Stack rows. Signals: pill row horizontal Stack `gap="08"`, header horizontal Stack `justify="between"` |

### Rules & behaviour

- The field is focused on open and the keyboard is up; results update as you type. ✕ (or Clear Search) empties the
  field and brings back recent / popular searches. Tabs keep the query; each shows its own count.
- On a tab with no match: the empty state, even when other tabs have results.
- Recent searches: the last 5, newest first; a chip is at most 200 wide (the name ends in "…").
- Bookmark: opens Add to watchlist (or Create watchlist when the user has none). Filled with a tick = in at least one
  watchlist; tapping it again opens the sheet to change the lists.
- Add to watchlist: tick any number; Save adds the item to all ticked lists → toast → bookmark filled.
- Signals: the ↕ pill switches Indices / Stocks (each has its own lists); Price ↕ switches the sort to Volume (rows then
  show the volume). Filter opens filters (not designed yet).

### Differences from Figma

- **Components only, same layout.** Every part is now L3: result rows are L3 list cells (Figma had a local "search
  stock listing" component), watchlist matches are card list cells, chips and tiles are clickable cards, the trend
  arrow is PriceChange, D2 icons are Material Symbols (the bookmark: L3 custom icons watchlist_add / watchlist_added), the bottom sheet is the current L3 sheet (Figma used the
  discontinued version).
- **Colours:** Figma's `content/secondary` at 60% opacity (labels, chip names) is `content/tertiary` (the same 36%).
  Chips and tiles are L3 clickable cards but, by the designer's call, **without the shadow** — only the 1px
  `border/light` outline — and with Figma's **8 radius** (L3 cards are 12). Watchlist rows keep L3's clickable look
  (`surface/primary` + `border/light` + `elevation-low`).
- **Empty state:** the L3 default illustration (a document with ✕) instead of the old magnifier. Clear Search stays
  Small, as in Figma (the empty state's action is the one exception to the app's Large-buttons rule).
- **Watchlist row gap:** L3's small list cell keeps 12 between the logo and the text (Figma result rows have 16).
- **Toast timing:** L3 keeps a toast with an action for 6 s (Figma's flow says 2 s).
- **Content:** obvious typos fixed (ICICIBANK, KOTAKBANK, AXISBANK, OI Gainers), and the repeated placeholder prices /
  changes replaced with varied sample values. Tab counts are the real number of results.
- Group labels stay Figma's small Label/12 labels (an L3 SectionHeader would be a bigger Heading/14 title and change
  the layout).

### L3 gaps

- **Chip** (recent / popular search): L3 has no chip component — a clickable Card with an Avatar stands in; its 200
  max width is a local token (`--app-size-search-chip-max`).
- **Divider:** no L3 divider — the 1px `border/light` line under result rows is drawn by the row.
- **Group label** (small Label/12 list label above a group): not an L3 component (SectionHeader is a bigger title).
- **Search field keyboard:** the Actionbar search input can't be told not to open the phone's own keyboard (the
  prototype draws one), so on a phone both may show.

### ILLIQUID contracts (2026-10-29)

- **search-28** — typing “Gold” on the F&O tab (live app reference): MCX gold options, each with the gold artwork (32, kept at its size in the small row via `data-avatar`). Commodity results that are illiquid (`SearchResult.illiquid`; GOLD 135000 Put, GOLD 150000 Call) carry the **ILLIQUID** tag after the name (L3 Tag error · secondary · sm, block icon) — ListCell `labelSuffix`.
- Tapping the tag (its own tap target inside the row) opens **“What does illiquidity mean?”** — the shared `src/shared/ui/IlliquidSheet` with this flow's words (`illiquid.*` in copy.json): small header, three icon points, Got it. Same sheet as the F&O flow.
- Tapping a commodity result row (any Search screen) opens its asset page in F&O (`fno-21`); an illiquid one opens the ILLIQUID asset page (`fno-22`: tag, Buy / Sell and ScalpPro greyed out). Other results have no page yet.
- Product rule: illiquid applies to commodity contracts only; equity / index contracts never carry the tag.

### Changelog

- 2026-11-01 — **US tab** (Stocks · US · F&O · MF · IPO): `search-29`–`31`. Replaces US Stocks' own search screen
  (`us-stocks-03`, Figma 5796:89230) — one Search for the whole app. Opened from Home's US tab and the US Portfolio;
  back returns to where it was opened; a result opens the US stock page.
- 2026-10-21 — layout moved from CSS-module classes to the L3 layout blocks (Section, Stack, Inset, Grid); nothing moved (measured at 392).
- 2026-10-19 — opened from Market too (`search-24`, back returns to Market).
- 2026-10-19 — Clear Search back to Small (empty-state action).
- 2026-10-19 — tiles: 8 radius, like the chips.
- 2026-10-19 — bookmark uses the design's icons: L3 custom icons watchlist_add / watchlist_added (Icons 1.4.0).
- 2026-10-19 — chips: 8 radius, no shadow; tiles: no shadow; the focused search field no longer shows a line under the
  bar (L3 Actionbar 1.5.1).
- 2026-10-19 — first version (23 screens) from the final Figma layouts.


## Source — this flow

### `src/flows/search/assets/gold.png`

```tsx
�PNG

   IHDR   `   `   �w8  ciCCPkCGColorSpaceDisplayP3  (�}��K�PƿV��u2�C��
�8�DqU�ꔾ����G�"7�����
�n�::8�������y/��"z��~|��8 9npn��;�[\�+��-%��� �񜮯J��?��>��N�Y�������1����]H�����%����qK���r��g�X �&VXͨ�������`�r���l��9�X�<p�0Є�?�����]r7�R��|�ɑ"'���p�0�XC�R�w��w�O���'`�#�����p6G'k���<02\�����G��V��S`���P϶W�j���<0�(��$�:�-!>���S�p�|�b��[   cICP n��   8eXIfMM *    �i            �       `�       `    ��}t  YiTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:xmp="http://ns.adobe.com/xap/1.0/">
         <xmp:CreatorTool>Figma</xmp:CreatorTool>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
�\�  .ZIDATx���W���u�A��eٖ,K�	d��6ql������k����̞e���{v��x&l�#㄃�le�rK��V�V�^��W��q�e�Asu��{oݺu���n����������Q+_���S7?�䌟���SۂW��D�M�hMd�_�jK�_Y���k�ϯ���*)�+��?2R��m�OV>������ٞ�ڟ���_����=;��-*���&5���Q���|���"�[p���[h���}��4�ػs�}��=�� =QAϵ�Dv@��?m8cqޗ��+[��6l����e|�@�N�,/J��"�)�g۴��l��t�����};��ܣ���`�O��	�{n�K��nwϛg7���m�FF�|���NH�*�#(�룬��f�|��O�m�c������E��5���[#�1]'�P��u6w�i��N�;j�����lxX�� �O����3&� ��<)𪮸$���lu��`������g�n���ٟu?r��v�D��	ါϴ�kϷ�.�gwΛmo��3��΀�y�@��6ў	�L>����A��-O�u3l��δTI�uwtno۳��[�5<p��홖oݧ���uo��?��N���fڥ,%=����XE�sa(i�.'d YW ?��3Bu��b��V���2�:w�U�<�F�m�v�b��߾�+�+%��l�2뭡��[|�T�R]�}���
�:3KK~,72�#�#̈́�K6О���u�Hk��*Ծ2u�\�����z�P{���[�7?��<��ہ����7�w}�j��gf��gk�l&?4���X�"�Y���X�Iӊ�(�Q��j���!�a��<G��)�l�Iˬ�z�u�6ٻ�g{6m���/�ڐ#S��A����I�q�4�����a�j 0<��X�  #�c	��_�Dvl��w�����1�x�v�;�`y׬(�4dy�����Gz�7=�R��|�w��W�v�7�d�O�p��>�ƾTSm*)�B6YN7 ��x�*Ϛ�;�B��Y@��q � :B9�)�M[ؾ�$:Bw�U����ج�n���?ˆ�k��u������R�D�����E���7��I�R[a��*��WUڌ�-7C��G�,���9嘨c���->ewb�(����ܬ#`B��3��"�C�fFIy���Yh���5[��;�v�l�u?����D4������2��3�Q����
;gT�>@��'x��	��\@���
,N��Y��"��}�'!�R3���!�ԓ�b��u.ʜ��mʜ�V5���j�Ӵ���5������?��:��5]����O��i5vWy�}���
��M>��`� �Fʱ#"�)i�� H@�>c���z�NR.w��B����#��Q6A����SefgŴV3�l�/�������}�����5�E�WKa��m�{���6���>WQi���Yj�"O�� �OY2>@B9�����I2��[r(�F?��^��d>2:�����@���T�1\��L-������Xa�B��>Ա��W:=}k�]�=�1SN7���w���
n9�n�/�/��R�="�h�.£\=��R)� ��q	 wN�gа���� S�:b���K�� �z�����낯v��G=�*�Y�f�Vq��ֶeu��G��?y�^s��19iX����);��ܾZ�g7��z����2h�TUf�I��Tu!�*'�5�Œ3@�Q��@�;@	�:%:C�K�	�ȃ��1����b��/	�]w"��)R72<fM����jg�.k������>�M��n���^���j�ϵ;ug�=k��F
�x<�q��䠌ђ�5_e�s�hyZz��|6$y���^�1� = �2u�� ��?���Dw�yQY=�*]	�iv��1�b��g�ڸ�֭�^ܤǐ���Jk�Mw�̞����^��n�w�;�������2��|��n ���*��8_2��N!�%��j�}Ʌ.�8��4Q�}��aOR���y_N�׿�C|-�^'f�Cu8�C=z���oX'���f�[��kY���$�7d=��\��b�h?�1���S��s/?���SS����p_�!��b2�1�/�q3�Q�x24��H.�����A��-ҁ(�<)�~U0'!7M��-�x�GT��~_7�Q‐��=�֦����-C�>E�n,�՚]yY�-<��~���ʍ����: L����런��Uw���\EQ�+�jy#>N��0}��  �0��g��L_'�i !�$�80�%yt�lB,��]?:Ћb�t^�S����2>��Sg�56
��f��`Zr��-\d��u�Uή�uM�u�h����=�ƴ;�2�\�p���U����|�����l�՞t�͜6j�y��s��K� L�0��0��<��
rPUp��4fO�q�DrL"��8u!��*}�^䘉^vA�� ^�������6m4ۺ��^����Į���6u��6޳������>��CM��Ƿ��W�cr�;O��F����]���笲��Ԝk����=�<�>e��X�Xv`��D;�y���^�&e?v�G;@|s���D2�gy|H&�����!�q�OFBў"6�N�xؾWѾFKN�~-9r���f׿w��w�VXQb�-����o�Cz�]Pd}����G7L�nR���3��Wd벚�<;�w�voj���g�����.��Yٌy�V[�m�^EI�AgΔ�A%�~� �����#�%KIs)��}� �	E{"di{�`&d�!K�У<�d6k�]�AN8�@Q�Ņ��[�����-o챎m�Y�����l��#����m����[��Z���H�����r�ɖ���˯�c��'ٖU;m��l��_�Ⳟ�yg]l����o?Ϧ��[�ص�Z���#�GmT����`�ِ�x>`��#�`�h����ϑE��}.��N�B7���S�|�@
[2���]:�p�٩��u��+�5��v��^�\=���_eM���d91X^�@:(�&��ی��\M�U4l����![t�B[���{�l��۷s������˛��J�\h3O��i��V�?`c�Ze���#Yxx �7s ���q�a��������'�rp���'Ō$��	�Y�%--f/���/���Sv�-�l������z��k7ZCÈ���ņ�����>̀_�5͛W�I���V72n�Ѵ*m��=�{m���*ͳ�-�9����׶o�#��V>�U��:WYqݙz�[k5��f�Ng��Ȇ�� H*� x����"�m��U��l��BΏ����Iwȡ��r��|����i�Y��?��vN��{n���o|���Xd��u�Jk�?�#��i/�sA���?���<��8���6�����zV�� ҫ�����z�ﳩS����셳����vo���V��f����+�=�j�J���ˆ��lH�ǈ]�(7�D$�̄��-49�dT��4���,�%9<'�1�J�R֦�z��~Q/�.</e��z�͹�:�ɳ�����ͻl��ak�{l��NE��%���5C�5���z�-�+Ӥ3��.���A�]S�$�o,}:	t��69b�[p�e6mv��{ض�;`]��[�5ZI�K՞oe3�T9��d��{-��́D�lt`�q�r"��ƁV2D/�0:|�P=*z;����(�!�-��z�p@N ꯾��.��22t�쬷�]O؎u���qܺ�䠃w#
$�g�!�Kd8A�Xψ}�h��x��6M��RX�� G��s�gm���ΖC6ܺ[�hgقη�)����m~q���U��L8��]e�s��Q�VY.K��l|T����;���YH�L���^ǌ�W��Б��}Be���M��ɥ���6�^T��l����<�������JmJmxߣv`s�կ��Z�y�Ag,�\��;n�~)�P23 _���]w3��Xmg��.�Jy�Q�k��$��Ay�p눵�6t�Q�4�c�^|����hl�]Z/��ڨ�Zuq��My���:ͦ�.���.Ռ �����J���(�����.,����!�y��#�-V8���YcS�^X=n-�im���(�������i���֥�o�Ю�V����RI��Y��D{v��V�J���u�}�n<�=��w��RND��m���u��1J��H;��gc]m�i:1]p�U������v`G��[����V˫^��<+�>ݦL�W8���?���Q�2`�}�*!��J�/��0T
%|��_YS�%"�6m��ZNz��ͮ�i�-��
�/�����ֺ}�5l���bcf�b͇ԝ��ر�)�C��U���������[���wwh�0���Ė�1�� iDF�uY{�Ku��ŋl���弔��~�Z�l��)9�GN8��kϳ���6´
���[ޘ��0}�C_�������K��(P"@h_R�o��2RG[�֯����R�+�Qb��x�U�r��{Y���M��f�Tiy`.��@˦8j��G ��P����`�}l�q,A|�f@�}J�JY��:t@�3`@�T�s�R ����~�mi���>�;�T��L�6>4�{s[j���<oee�W{�q�q�UVXj��Ɔ�}s���:�@��[(���90J��N-�TQ��[�m��a;�'�O�F��v��-�r�����r˳�c˰�Z��i0@]�p c�}��.ߌY�-��v�p\���V����+�38]1��ր/0E����Ŭ��k*Z��>���d��N�}�9��Ku�鷦�����z+�h��r���,���Ӭ�jH����/M�^]}�җ��a���L�+us���@�V=�mk��<�/�(ߖ��v�^r�Nd������.ܸ{�:��@�A�Ǻ� ]/����~� �^��h��3��<Q?��J{T�W�I�WʠR��)#ayT�'Pvc�Y7�.�ɂ}��虝�h��{��K}�^d'�7b{׭���v��-�������uq��V,����ڌ���޸�:w�w����E��2;�������Ҫ�ֲ눭]�k:�ټY�^r���P˳vd�;�o�:�M8_�Y� }(e\��X�B��d��4!�v)9�P�����Z��Bx���<��G�:"���#*���:�I7N|�s�HV���;�y�:㬷�f.����#�c�AkkXce�M�>����J+�z�UΨ�ѵO�C��ɛ 3�>���M�=E V��u�l��?^^tn�]s�96���dL��l���^��v�J��? ���-e �z�����<���+�x}`�A�E;-�Cze�'�N�W:�:��K����>%��F�� �a�;@� �%)�k '2[0��<�s�`j��+���u晩�'�Y_{�5m8d��h��Y�{g��r��.��ZECq��{���ᆪV߁��Qg����Um��aLw�f�\[gg^�^+�}���b������G��E6�\���eG@�'���!�ӏx LE ��7_���u�fှ������4�K�&S���z�u	ؤ_��'�X~h���4�1�r����_L���d3�,�3nx��<d{W��͏���F�s�YV>o����XY��g�֒��F�;4�SVT:E@ۦmÆ!��ca�T-�n�U�~��9��!;�Po͍f��zn��[�1kÒ�+�W6S��.ڱ3#|	]���q��ĝ�&�
�D����un��U���Cx� Q�%� 1��ž��j�
���A��lƂ=6���l���	j�5���^x�y�6k����s�\�ñ9��#V<�]�����m��!���אּe�_��?[�]�4��Z��׉ڟ�H��/��{4'vb?v{`)e|0d�\�u�GeFU���x �>:T����n����>0@�#��6/h\��,Ao�p���7�_�ط���ZWX� �������[m�=�]�Q�x�杶�\�^+�s�:��ԽFϤ�ٺ���nZ�.�e�՞~��Ȟ'���M�Ԙ��Ti��HP���v�؍�����T��DvR�u�ڑ�Y����4���g��fB�t�=��}#���b�b,@sÄ�ܙ� �\^�(c<z�-z�ƁP
�C�-�lh��-[ݼ:���";ﶳ�{�=��jMO~O�a�����ִf�m����"{��o�3�l�{�l}��7���O�b9�u] �|���;ӵ��m�Gf:��f.ʪ`L��Ty��<�t�*P�j���&u�o�脙 �n�@r U�e'"����B�3�ў:��z_ { ���Y���d2��uz�f�El��WY���l��k|�!۸~�mn�E�g����97Xz�
���S۷kПnv�q��ʬ��ɛ+@�YǸT��ǩ���I�'����AK� "�{��SCz21���;Z�N�Y'>�0�t�1B��`��4�W?�� %ﺐ�<��a4�uJɣ����q`g����6�w��̹�N���=Td��KNz�+�jw]gk�����E�H��G��s�)�*a\؈��1>r"l@;X��6�Sf<��d�^�ҙ��Ҥ3��VHI�\?��7QK� �Ð!e�`k���e�~DU�(w��}CV}a�;�6bqG=~d̆�=b3��N?�̗}G�T/T�ZV)�m;���~=��׬��Щ4Nd4v�lȈ{���ڏ��{d�����3�|�B�,ˏN#���\	 I����%FtN�aPD�b8��K&����ĝF!�<� ׫���8�n~�҇��s.�g��wْ����u��m�^%�d���3��;tTv	T��{�����i��w��'��|��'���9�~及�d�-=Ñ�~�IT��H9:'��G��Y׽Y��0w��ʚ
�	Z�<�hH\�AR>�<:h��%O���q�^VHNǙ�~���s��u ��g���r�v1���)��� �GJ}�x�#ߍ��G}Y�ջ�<����ߧI0� ]���P��=c@��"*T�˔��HRnV ��Rճ��i7��L��,w������z_��{�;>>�[ ��Q����ހ���G�v �=���,}8����Ot�$�{?j�"}�Nx�(�������]�OD�:�?3��%�#=Jq@�y��ME# :�B�h���l��s��e!х�e`��2�v��)k�xZ/q�<�cs�e
��S�>_��qVR9�)�+=��I(fr؂M���(�Yx��n��4e_�&u�XJ�LˎdD�tD�2C!ep�!�I�f~�:�0r}�3�Ȼ�dGGBl�>`1L�7̀q! �D[���%���qRe����L|5��������z�S�
�Qv���ّV_'�I0< �����; J#���<�� � �����Ȼi�a� |�H��E����1�$D���X`�M�7R� l�:gHr ���ם 6��A�����̒ e��Rv���}E*)�>=:v�H���p �$N`��0����KU�- p�4m�M>2|�B�qm�L.���q>� �.�,���F�*�1�!_~���U�mrd�:$G^�\����(4�������4�h�Ay�+��� ���d;h���$� ���|��N䜒Ax�nL�&ᓠ�"u�s�ľ�G�/���u�g�B}R����s~�QF�Kc��<���q6���&u�~Z�'�2?C���nl�)5��]�<�SE��Yƃ���` ��q�	h�	�#r��6��e��
=��L�'d�u�r��mK�e(��)�.�SN"�ӝ����9]�/w���ؤ��)OF�y�摪4�S�P��x����p�q�����v*#�h���M?{7Lu���]$�A �}����a�f��}ҍ݀����BY�)�9��N��'�̰Y�" X�r�����f���(4�z�I(��O=�	�x>���+Ũ č�u�61�.H��<%������=��
�hڏi�u�|P�"WD�.>���1�R��?չ�3]�3C�+i�~�(�:)�\��&�I�w�B/�
����+&���D&������AR� 2b C=�^�Dꐡ^Y'xN�	S��g�J�|�ê�$E7`�,��&���<3�I~�L#���:�#G?�i���#�;�7b5R�1hT�,�^0")b��=�V,��)8&��''~� ��U��9_o����D��X6X� 
�7�Ͷ�)��6��|!�6%)P��j�R���s�r�tЖ�H7}�F4|�޹R�F���ߤVفN��D�6>8�Ĥ=K�� ���6f���<.E耫��XٍWe8-t�l�$e���}��Y������>�۩�Ε\8�t�����j�k���|J��jӜ���:�L�#��/�,�#|v��m 9��pܜ�5�\ȹ#�� @� *���.� D)�py.WC]"�(e�iw̔]P	���Z-���&u -R2���Pt��I�߀	���8r0��/PQ���.�|�N�	y<��c�����$~�ţ��=��<t��T F�6�feT��Q|�-�P��\!��fB:&hZ�b���3x��#R���%��[�h��L���C�a���G<1�AUJ�o�TǠ=�5�#3*��l i@SB�8�" �Ԟ: $��')y.�q�D�<�QG�؃2D�mZ�,��&u��o`��Q���j��:�p HA�W[�7L<f��%���~��Ֆ~�q���h�dO���d�F�1��ER�S�0:\���r�QށV�IWY��l��I�hCcuyD��A�&�I�?C�q�910�`:���a6�S��iHel��Hۤ�����sՖ'��TP���n�SGY��߹�;qEI�؆Nʾ<�U�Tc[6�U�	�!�	�(�l���'3�yt��)7�M1����&u��a���֙P �w'H?��r1��X<�T�Ȋ�� ��>+Tt�>h˦�N[e�   �2�Io��/��!瀠Oe�!xX�EY����D.���"�կ�ԇ>��)~��SG �0�J�ܣ��t ��1���գFF��Qe��4F�Pv�����:N�x)���S��J]��� |����1<o/!�g#�+ԇ�ΧO.�Od�!T��/�	]2�:��ݑOR%�B�;u�AF�ğ�:��R�����D���'���I|u`!����(�G��XJ��ʫ>�P��L�Ѵ����$�M�%�~��#����E��r*f�������a�/�G����m�)�T�/��:�� k�S^�=��R�X��tFbHR'`gЬ��H �D����� ���`%�Lf	�W����T�<�c�\�MV'���C=W�9��Sv�e�����L<�1�W�/�f��(d�����~S�Wm��ͷ0�θ�y�,r�r�;"dD`�2�uG�A �^���:w@�31�!�!꣍7���$��8q�(a����QP��!2����Ix�!�S�%G��#O�oz�1|��s�J���`����v��c锁�D^L��B���f��-D;(fE�s���'�p'P��$E���-�/��ڤ��Gm�I{��+fBn��ٙ�P�D��Ccv�ov؃��1~����Z���]s��>�Ǥ|q��J�wP�}���yʺL�|�	hq��"e�>�w�%��)M��3�� �� JbN��vI�(�m�';U���#��U��oUu�Q�ﭰ�lx�?���@翪�ճ
쏴�ޡ�4lf6` ���ԀH��2@��hp�L	 G9dHy� u�Nry꤇ �܈�$O{N)�O��"�w{�� �}���R�t�'�=�@�`\���M����N�G��S�CR{��������~�޾�{�+�/�ӾV�i��?� b9�G @	�rR�`�#���A>X��v�ِ&�Y��З��mNuH�^�.�8/q4ˍO%��+���?6��9?�=���!�v�.{"1�5%���N?z���S�]`���ٗ�{�z����4Tv渖� �9>�@�r�	aXB;���Ʃ��! �I��y���ʶ~�1���Km�ч�%���G��3�<}�B3g�u�3;���F}���ڵ��E{�z�n�/F}|�^�ڨ?��ץx{� TlʤD3�10��,8�Hw���2��E|����6�Y�#@'�?�@���V;_r��:�����D��;_m����̮}j�}�%i:x���8��Y�~�����+w�i:������ �h�ʹ`�s ^�2� >p�!Q�Q��R��.3���^��8�p'��9�*SG��~�c�3Ovs����<���m��y�踖�W2���_����η�����ܦ_�-��zia�|�n����8 �˼	�8����E=:2��T��CF�@���C� �.�� �F�(cy**�I�r��-�"ڼ���6^nԃ���{��Gt�pk�[۲_��狾�bЀ� ��=�|լ:/ї���� ��Ǭ��|�.R�A�w��6�i7���j��l���o����9 ��}+��]�vU[����k��d�8B#�h&�%�ye2w��P�(���I��\0��Q�y҃|��4i�u���w,=�f�W6��m�l���[��cy�C��Jo�0�G���{����_�R7p�U���W�)�[]  "� ?����s ����Prk9 +ɂ�p��E
��h���خ_����*x?����]e{Xe_���PW44g�%�d"��`� &�m�SY._8Ͻ�>�q�8*f���(Hړ��gA2c4C�Cv�_���_���~S�Mu@����۪�S�&��'��Z��jY���FH� "�Sf N�L��S�Kf9�ޝ$ �[w���K
�".�p���c�UMw���+�U�5�G����^h���-�~�l����w��ݖ�т��Q8�#���;f��C`�>>sN���`�ؓO����Ԣ��+�zL!'�( v�M���,���}��5�"��lzKf@� �e����U���;�A�hK���W/} J� ��'�3Q���z�ssځ�{DD�t����H]���Ń���h-��-�x�c��*۸d�}p`�n�s�V�?�[�<��w��
X_����
<��S�o�R�;�*�<����Z�{�Ck�k��!Z�}��	� r����K��*U���h��n�?qU=���RE:���a�B?���&��/��f�Qf����)Yھ�W�7�t�='ѷ�^�;��cD�>ez�a��K�a���;�9ӭdV��g6i�٬�c�7%E�4	t ��fc���qkַ����idjO�Ϸl>��k�>�q��l�t{N?�4K/�N�2��_��(3�9}�Z�Gl���#�J=�=�s3�o��R�"�o~h�=y,���2'��-��i��aO�ڻl�~/b�/9Z@��l��qkԣ����}��Bq�F����U؟?�r�o(Dof�L�7����냗�l=}�K-E�W�Z?��� ���Њ�Z�v����������m�o��G/��uC�Y����<C� ���˱��p*G|�����xvN���u@��3l�P��dS�����婆��?^������? �z"���5�=e$|    IEND�B`�
```

### `src/flows/search/components/GroupHeader.module.css`

```css
/* Figma "header": 16 tall, 16 from both screen edges (the Inset), 8 between the label and its control (the Stack). */
.row {
  min-height: var(--l3-size-16);
}

/* A header that starts a list straight under the top bar (IPO results, signals): 16 above it. */
.header[data-inset] {
  padding-top: var(--l3-spacing-16);
}

.title {
  margin: 0;
  font: var(--l3-text-label-12); /* L3/Label/12 */
  color: var(--l3-content-tertiary); /* Figma content/secondary at 60% = 36%, i.e. content/tertiary */
}
```

### `src/flows/search/components/GroupHeader.tsx`

```tsx
import type { ReactNode } from 'react'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { Stack } from '@l3/components/Stack'
import { msChevronRight } from '@l3/icons/material'
import { t } from '../copy'
import styles from './GroupHeader.module.css'

/**
 * The small label over each group on the search screens — "Recent Searches", "Your watchlist (2)", "Stocks (8)" —
 * with an optional control on the right (View All, a sort switcher). Figma: Label/12 in content/tertiary, 16 tall,
 * 16 from the screen edges. Kept as the Figma label (not an L3 SectionHeader, which is a bigger Heading/14 title).
 */
export function GroupHeader({ title, action, inset = false }: { title: string; action?: ReactNode; inset?: boolean }) {
  return (
    <Inset paddingInline="16" paddingBlock="00" className={styles.header} data-inset={inset || undefined}>
      <Stack direction="horizontal" align="center" justify="between" gap="08" className={styles.row}>
        <h2 className={styles.title}>{title}</h2>
        {action}
      </Stack>
    </Inset>
  )
}

/** "View All ›" on a group header: an L3 Ghost Small button with a chevron. */
export function ViewAll({ onClick, label }: { onClick?: () => void; label: string }) {
  return (
    <Button variant="ghost" size="sm" iconRight={<Icon icon={msChevronRight} />} aria-label={t('group.viewAllLabel', { name: label })} onClick={onClick}>
      {t('group.viewAll')}
    </Button>
  )
}
```

### `src/flows/search/components/ResultList.module.css`

```css
/* Figma "search stock listing": the row (Info) and, on the right, the 56 wide bookmark column (16 · 24 · 16). The
   row is a horizontal Stack; it stays positioned for its separator line. */
.row {
  position: relative;
}

/* Figma "sepe": a 1px border/light line under each row, 16 in from both edges. */
.row::after {
  content: '';
  position: absolute;
  inset: auto var(--l3-spacing-16) 0;
  height: 1px; /* hairline */
  background: var(--l3-border-light);
  pointer-events: none;
}

.cell {
  flex: 1 1 0;
  min-width: 0;
}

/* The row's own 16 right padding, the 24 icon, then 16 to the screen edge = Figma's 56 CTA column. */
.bookmark {
  flex: none;
  margin-inline-end: var(--l3-spacing-16);
}

/* Price over its detail, right-aligned. 2 apart: the layout blocks' spacing steps start at 4. */
.stack {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--l3-spacing-02);
}

.value {
  font: var(--l3-text-label-12); /* L3/Label/12 */
  color: var(--l3-content-primary);
  white-space: nowrap;
}

/* Commodity contracts: the commodity's artwork (32). */
.art { display: grid; place-items: center; flex: none; width: var(--l3-size-32); height: var(--l3-size-32); }
.art img { display: block; width: var(--l3-size-32); height: var(--l3-size-32); object-fit: contain; }
/* ILLIQUID tag: its own tap target inside the row's button (explains illiquidity). */
.tagTap { position: relative; display: inline-flex; cursor: pointer; }
.tagTap::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-12)) calc(-1 * var(--l3-spacing-04)); }
```

### `src/flows/search/components/ResultList.tsx`

```tsx
import { Avatar } from '@l3/components/Avatar'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { PriceChange } from '@l3/components/PriceChange'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msBlock } from '@l3/icons/material'
import { lmWatchlistAdd, lmWatchlistAdded } from '@l3/icons/lemonnade'
import { inr, usd } from '../../../shared/data/format'
import type { SearchResult } from '../data'
import { t } from '../copy'
import styles from './ResultList.module.css'

type ResultListProps = {
  items: SearchResult[]
  /** Accessible name of the list ("Stocks", "Contracts" …). */
  label: string
  /** Show the volume instead of price + change (a signals list sorted by volume). */
  showVolume?: boolean
  /** Bookmark on each row (search results). Signals lists have none. */
  bookmarks?: boolean
  /** Ids saved to a watchlist (filled bookmark) — overrides `item.saved`. */
  saved?: string[]
  onOpen?: (item: SearchResult) => void
  onBookmark?: (item: SearchResult) => void
  /** The ILLIQUID tag on a row: explains illiquidity. */
  onIlliquid?: (item: SearchResult) => void
}

/**
 * Search results: flat L3 list rows (ListCell plain, small, breathable — 70 tall, the asset-list density) with a
 * hairline between them, 16 in from the edges. Left: the logo (stocks, IPOs) as a 32 Avatar; then name + detail; on
 * the right the price over its change (L3 PriceChange), 3Y returns, an IPO price band or the volume; then the
 * bookmark (an L3 Ghost icon button with the L3 custom icons watchlist_add — outline + — and watchlist_added — filled,
 * ✓ cut out — once the item is in a watchlist).
 */
export function ResultList({ items, label, showVolume, bookmarks = true, saved, onOpen, onBookmark, onIlliquid }: ResultListProps) {
  return (
    <Stack as="ul" aria-label={label}>
      {items.map((item) => {
        const isSaved = saved ? saved.includes(item.id) : Boolean(item.saved)
        return (
          <Stack as="li" key={item.id} direction="horizontal" align="center" className={styles.row}>
            <ListCell
              className={styles.cell}
              size="sm"
              density="breathable"
              as="button"
              iconLeft={item.image ? <span data-avatar="" className={styles.art}><img src={item.image} alt="" /></span> : item.initials ? <Avatar initials={item.initials} src={item.logoUrl} size={32} /> : undefined}
              label={item.name}
              // ILLIQUID tag after the name; it sits inside the row's button, so it's a tappable span that stops the row's tap.
              labelSuffix={item.illiquid ? <span className={styles.tagTap} onClick={(e) => { e.stopPropagation(); onIlliquid?.(item) }}><Tag color="error" variant="secondary" size="sm" iconLeft={<Icon icon={msBlock} size={12} />}>{t('result.illiquid')}</Tag></span> : undefined}
              description={item.detail}
              trailing={<Trailing item={item} showVolume={showVolume} />}
              onClick={() => onOpen?.(item)}
            />
            {bookmarks && (
              <Button
                className={styles.bookmark}
                variant="ghost"
                iconLeft={<Icon icon={isSaved ? lmWatchlistAdded : lmWatchlistAdd} />}
                aria-label={t(isSaved ? 'result.inWatchlist' : 'result.addToWatchlist', { name: item.name })}
                aria-pressed={isSaved}
                onClick={() => onBookmark?.(item)}
              />
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}

/** Right side of a row: one value, or a value over the change. */
function Trailing({ item, showVolume }: { item: SearchResult; showVolume?: boolean }) {
  if (showVolume && item.volume !== undefined) return <span className={styles.value}>{item.volume.toLocaleString('en-IN')}</span>
  if (item.priceBand) return <span className={styles.value}>{item.priceBand}</span>
  const top = item.returnsLabel ?? (item.price !== undefined ? (item.currency === 'usd' ? usd(item.price) : inr(item.price)) : undefined)
  if (top === undefined) return null
  return (
    <span className={styles.stack}>
      <span className={styles.value}>{top}</span>
      {item.changePct !== undefined && <PriceChange value={item.changePct} size="sm" />}
    </span>
  )
}
```

### `src/flows/search/components/SearchChips.module.css`

```css
/*
 * Figma "Section 1 - Past search" / "Sec 2 - Popular search": label, 12, chip rows (12 apart) — L3 Stacks. Only what
 * they don't cover lives here.
 */

/* Rows scroll sideways together; the first chip lines up with the 16 page margin (padding inside the scroller). */
.scroll {
  position: relative; /* keeps absolutely placed bits inside the scrolling area */
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding-inline: var(--l3-spacing-16);
  scroll-padding-inline: var(--l3-spacing-16);
  scrollbar-width: none;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.row {
  width: max-content;
}

/* Figma "history card": hugs its content up to 200 wide. */
.chip {
  flex: none;
  width: max-content; /* a Card fills its container by default; a chip hugs its name */
  max-width: var(--app-size-search-chip-max);
}

/* Designer's call (2026-10-19), as in Figma's "history card": 8 radius and no shadow — only the 1px border/light
   outline, not L3's clickable-card lift. Doubled class so it wins over the Card's own [data-interactive] rule. */
.chip.chip {
  border-radius: var(--l3-radius-08);
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px: Figma stroke weight has no variable */
}

/* The chip's inside: a span (it's inside a button), so not a layout block; 8 / 12 / 8 / 8 padding. */
.body {
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-08);
  min-width: 0;
  padding: var(--l3-spacing-08) var(--l3-spacing-12) var(--l3-spacing-08) var(--l3-spacing-08);
}

.label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: var(--l3-text-label-12); /* L3/Label/12 */
  color: var(--l3-content-tertiary); /* Figma content/secondary at 60% */
}
```

### `src/flows/search/components/SearchChips.tsx`

```tsx
import { Avatar } from '@l3/components/Avatar'
import { Card } from '@l3/components/Card'
import { Stack } from '@l3/components/Stack'
import type { SearchChip } from '../data'
import { GroupHeader } from './GroupHeader'
import { t } from '../copy'
import styles from './SearchChips.module.css'

/**
 * Recent or popular searches: a label, then one or two rows of chips that scroll sideways together. A chip is an L3
 * clickable Card (one action: search for it) holding a 24 Avatar and the name — at most 200 wide, the name ends in
 * "…". Recent keeps the last 5 searches (Figma dev note).
 */
export function SearchChips({ title, rows, onPick }: { title: string; rows: SearchChip[][]; onPick?: (chip: SearchChip) => void }) {
  return (
    <Stack as="section" gap="12" aria-label={title}>
      <GroupHeader title={title} />
      <Stack gap="12" className={styles.scroll}>
        {rows.map((row, i) => (
          <Stack key={i} direction="horizontal" gap="12" className={styles.row}>
            {row.map((chip) => (
              <Card key={chip.label} padding="none" className={styles.chip} aria-label={t('chip.label', { name: chip.label })} onClick={() => onPick?.(chip)}>
                <span className={styles.body}>
                  <Avatar initials={chip.initials} src={chip.logoUrl} size={24} shape="rounded" />
                  <span className={styles.label}>{chip.label}</span>
                </span>
              </Card>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
```

### `src/flows/search/components/Tiles.module.css`

```css
/* Figma "Container": 2 columns, 12 apart both ways, inside the 16 page margin — an L3 Inset around a Grid. Each cell is
   a horizontal Stack so the tile fills its height. */
.tile {
  flex: 1;
}

/* Designer's call (2026-10-19), as in Figma's "option" tiles: 8 radius and no shadow — only the 1px border/light
   outline, not L3's clickable-card lift. Doubled class so it wins over the Card's own [data-interactive] rule. */
.tile.tile {
  border-radius: var(--l3-radius-08);
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px: Figma stroke weight has no variable */
}

/* Figma "option": 10 above and below, 12 at the sides — 36 tall with one line. */
.label {
  display: block;
  padding: var(--l3-spacing-10) var(--l3-spacing-12);
  font: var(--l3-text-label-12); /* L3/Label/12 */
  color: var(--l3-content-primary);
  text-align: left;
}

.label[data-muted] {
  color: var(--l3-content-tertiary); /* Figma content/secondary at 60% */
}
```

### `src/flows/search/components/Tiles.tsx`

```tsx
import { Card } from '@l3/components/Card'
import { Grid } from '@l3/components/Grid'
import { Inset } from '@l3/components/Inset'
import { Stack } from '@l3/components/Stack'
import styles from './Tiles.module.css'

/**
 * A grid of shortcut tiles, 2 per row, 12 apart (F&O: Smart Options & Futures lists; MF: collections). Each tile is an
 * L3 clickable Card with one label; a long label wraps to two lines and its row grows with it. `muted` = the MF
 * collections' quieter label (content/tertiary).
 */
export function Tiles({ items, label, muted, onPick }: { items: string[]; label: string; muted?: boolean; onPick?: (item: string) => void }) {
  return (
    <Inset paddingInline="16" paddingBlock="00">
      <Grid columns={2} gap="12" role="list" aria-label={label}>
        {items.map((item) => (
          <Stack key={item} direction="horizontal" role="listitem">
            <Card padding="none" className={styles.tile} onClick={() => onPick?.(item)}>
              <span className={styles.label} data-muted={muted || undefined}>{item}</span>
            </Card>
          </Stack>
        ))}
      </Grid>
    </Inset>
  )
}
```

### `src/flows/search/components/WatchlistMatches.tsx`

```tsx
import { Avatar } from '@l3/components/Avatar'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { msChevronRight } from '@l3/icons/material'
import type { WatchlistMatch } from '../data'
import { GroupHeader } from './GroupHeader'
import { t } from '../copy'

/**
 * "Your watchlist (n)": the user's watchlists that match the query, above the results. Each is a tappable L3 card row
 * (ListCell card, small): a 32 initials Avatar, the name, how many stocks (Stocks tab only) and a chevron; it opens the
 * watchlist.
 */
export function WatchlistMatches({ watchlists, onOpen }: { watchlists: WatchlistMatch[]; onOpen?: (id: string) => void }) {
  return (
    <Stack as="section" gap="12" aria-label={t('watchlists.label')}>
      <GroupHeader title={t('watchlists.title', { count: watchlists.length })} />
      <Section paddingInline="16" gap="12">
        {watchlists.map((w) => (
          <ListCell
            key={w.id}
            variant="card"
            size="sm"
            as="button"
            iconLeft={<Avatar initials={w.initials} size={32} shape="rounded" />}
            label={w.name}
            description={w.count === undefined ? undefined : t('watchlists.stockCount', { count: w.count })}
            iconRight={<Icon icon={msChevronRight} />}
            onClick={() => onOpen?.(w.id)}
          />
        ))}
      </Section>
    </Stack>
  )
}
```

### `src/flows/search/copy.json`

```json
{
  "tab.stocks": "Stocks",
  "tab.us": "US",
  "tab.fno": "F&O",
  "tab.mf": "MF",
  "tab.ipo": "IPO",
  "tab.withCount": "{tab} ({count})",
  "tabs.label": "Search in",
  "field.stocks": "Search stocks",
  "field.us": "Search US stocks",
  "field.fno": "Search contracts",
  "field.mf": "Search mutual funds",
  "field.ipo": "Search IPOs",
  "field.clear": "Clear search",
  "recent.title": "Recent Searches",
  "popular.title": "Popular Searches",
  "chip.label": "Search {name}",
  "signals.title": "Smart Options & Futures",
  "signals.tilesLabel": "Smart Options & Futures lists",
  "collections.title": "Collections",
  "collections.tilesLabel": "Fund collections",
  "usCollections.tilesLabel": "US stock collections",
  "group.viewAll": "View All",
  "group.viewAllLabel": "View all {name}",
  "results.title": "{list} ({count})",
  "results.returnsPeriod": "Returns period",
  "results.returns3y": "3Y Returns",
  "result.inWatchlist": "{name} is in a watchlist — change",
  "result.addToWatchlist": "Add {name} to a watchlist",
  "watchlists.label": "Your watchlists",
  "watchlists.title": "Your watchlist ({count})",
  "watchlists.stockCount": "{count} stocks",
  "empty.title": "No search results found",
  "empty.description": "Make sure you’ve spelled it correctly.",
  "empty.clear": "Clear Search",
  "signalsList.switchScope": "Showing {scope}. Switch to {other}",
  "signalsList.listsLabel": "Signals lists",
  "signalsList.filter": "Filter",
  "signalsList.sortPrice": "Price",
  "signalsList.sortVolume": "Volume",
  "signalsList.sortLabel": "Sort by {sort}. Switch",
  "addSheet.title": "Add to watchlist",
  "addSheet.create": "Create",
  "addSheet.listsLabel": "Watchlists",
  "addSheet.save": "Save",
  "createSheet.title": "Create watchlist",
  "createSheet.field": "Watchlist Name",
  "createSheet.placeholder": "e.g. Banking",
  "createSheet.create": "Create",
  "toast.added": "Stock added to watchlist successfully",
  "toast.ok": "OK",
  "result.illiquid": "ILLIQUID",
  "result.illiquidOpen": "What does illiquidity mean?",
  "illiquid.title": "What does illiquidity mean?",
  "illiquid.forContract": "{contract} is ILLIQUID right now",
  "illiquid.point1": "Very few people are buying or selling it",
  "illiquid.point2": "Buy and sell prices are far apart, which increases chances of slippage",
  "illiquid.point3": "To protect you, Lemonn doesn’t allow orders in it",
  "illiquid.ok": "Got it"
}
```

### `src/flows/search/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of Search is in copy.json: t('empty.title'), t('results.title', { list, count }). */
export const t = makeCopy('search', copy)
```

### `src/flows/search/data.ts`

```ts
// Sample data for Search — the shapes are the API contract; the values are examples (from the Figma frames).

/** The four search tabs, in order. */
import goldArt from './assets/gold.png'
import { catalogue, usLogo } from '../../shared/data/usStocks'

export type SearchTab = 'stocks' | 'us' | 'fno' | 'mf' | 'ipo'

/** A recent or popular search, shown as a chip (max 200 wide; at most 5 recent ones are kept). */
export type SearchChip = { label: string; initials: string; logoUrl?: string }

/** One of the user's watchlists that matches the query. `count` is shown on the Stocks tab only. */
export type WatchlistMatch = { id: string; name: string; initials: string; count?: number }

/**
 * One search result row. `price` / `changePct` for stocks and contracts, `returnsLabel` + `changePct` for funds
 * (e.g. 3Y returns), `priceBand` for IPOs, `volume` when a signals list is sorted by volume.
 */
export type SearchResult = {
  id: string
  name: string
  /** Second line: "Small Cap • BANKBARODA", "Stock • Fut • 30JUN2026", "Sectoral • Banking", "Opens 3 Jun". */
  detail: string
  /** Stocks and IPOs have a logo (initials until the logo loads); contracts and funds don't. */
  initials?: string
  logoUrl?: string
  price?: number
  changePct?: number
  returnsLabel?: string
  priceBand?: string
  volume?: number
  /** Already in one of the user's watchlists (filled bookmark). */
  saved?: boolean
  /** US stocks: the price is in dollars, and `id` is the ticker (a row opens that US stock's page). */
  currency?: 'usd'
  /** Commodity contracts: the commodity's artwork instead of a logo. */
  image?: string
  /**
   * Too few trades — orders are blocked (commodities only, product rule). The row carries the ILLIQUID tag; tapping
   * the tag explains illiquidity.
   */
  illiquid?: boolean
}

/** What one tab shows for a query. */
export type TabResults = {
  watchlists: WatchlistMatch[]
  /** The list's heading, e.g. "Stocks", "Contracts", "Funds", "IPOs" — shown with the count. */
  listTitle: string
  items: SearchResult[]
}

/** The result of a search: per tab, and the counts the tabs show. */
export type SearchResults = { query: string; counts: Record<SearchTab, number>; tabs: Partial<Record<SearchTab, TabResults>> }

// ---- Before typing ---------------------------------------------------------------------------------------------

/** US chips: the company's name and logo from the shared US catalogue (src/shared/data/usStocks.ts). */
function usChips(symbols: string[]): SearchChip[] {
  return symbols.map((sym) => ({ label: catalogue[sym].name, initials: sym[0], logoUrl: usLogo(sym) }))
}

export const recent: Record<SearchTab, SearchChip[]> = {
  stocks: [
    { label: 'Bharat Coking Coal Ltd.', initials: 'B' },
    { label: 'Saregama India Ltd.', initials: 'S' },
    { label: 'NIFTY 50', initials: 'N' },
    { label: 'Reliance Industries Ltd', initials: 'R' },
    { label: 'Tata Motors Passenger Vehicles Ltd.', initials: 'T' },
  ],
  us: usChips(['NVDA', 'AAPL', 'TSLA', 'MSFT', 'AMZN']),
  fno: [
    { label: 'Reliance Fut Finnifty 23500 CE', initials: 'R' },
    { label: 'Nifty 24500 CE', initials: 'N' },
    { label: 'Banknifty 52000 PE', initials: 'B' },
  ],
  mf: [
    { label: 'Nippon India Small Cap Fund', initials: 'N' },
    { label: 'HDFC Balanced Advantage Fund', initials: 'H' },
    { label: 'ICICI Prudential Bluechip Fund', initials: 'I' },
  ],
  ipo: [
    { label: 'HDB Financial IPO', initials: 'H' },
    { label: 'OYO IPO', initials: 'O' },
    { label: 'NSDL IPO', initials: 'N' },
  ],
}

/** Popular searches: one or two rows of chips that scroll sideways together. */
export const popular: Record<SearchTab, SearchChip[][]> = {
  stocks: [
    [
      { label: 'NIFTY 50', initials: 'N' },
      { label: 'Nippon India Silver ETF', initials: 'N' },
      { label: 'Bharat Coking Coal Ltd.', initials: 'B' },
    ],
    [
      { label: 'Reliance Industries Ltd', initials: 'R' },
      { label: 'Tata Motors Passenger Vehicles Ltd.', initials: 'T' },
      { label: 'Saregama India Ltd.', initials: 'S' },
    ],
  ],
  us: [usChips(['GOOGL', 'META', 'NFLX']), usChips(['AVGO', 'AMD', 'UBER'])],
  fno: [
    [
      { label: 'Nifty 24500 CE', initials: 'N' },
      { label: 'Banknifty 52000 PE', initials: 'B' },
      { label: 'Reliance Fut Finnifty 23500 CE', initials: 'R' },
    ],
  ],
  mf: [
    [
      { label: 'Parag Parikh Flexi Cap Fund', initials: 'P' },
      { label: 'Motilal Oswal Midcap Fund', initials: 'M' },
      { label: 'SBI Small Cap Fund', initials: 'S' },
    ],
    [
      { label: 'HDFC Balanced Advantage Fund', initials: 'H' },
      { label: 'ICICI Prudential Bluechip Fund', initials: 'I' },
      { label: 'Nippon India Small Cap Fund', initials: 'N' },
    ],
  ],
  ipo: [
    [
      { label: 'boAt IPO', initials: 'B' },
      { label: 'Tata Capital IPO', initials: 'T' },
      { label: 'Ather Energy IPO', initials: 'A' },
    ],
  ],
}

/** US: themed lists, as tiles (2 columns). */
export const usCollections = ['AI Leaders', 'Trillion Dollar Club', 'Warren Buffett’s Portfolio', 'Dividend Kings']

/** F&O: the Smart Options & Futures lists, as tiles (2 columns). Each opens its signals list. */
export const signalCategories = [
  'Top Traded', 'Most Active',
  'OI Gainers', 'OI Losers',
  'Top Gainers', 'Top Losers',
  'Top Picks', 'Long Buildup',
  'Volume Surge Highlights', 'Long Windup',
  'Short Covering', 'Short Buildup',
  'Momentum Breakouts',
]

/** MF: fund collections, as tiles (2 columns). */
export const collections = ['High Returns', 'Tax Savings', 'Low Risk', 'Large Cap']

/** IPO: lists shown before typing (each with View all). */
export const ipoLists: { title: string; items: SearchResult[] }[] = [
  {
    title: 'Most Subscribed',
    items: [
      { id: 'qline', name: 'Q-line biotech limited', detail: 'Subscribed 42X • Closing Tomorrow', initials: 'Q' },
      { id: 'ather', name: 'Ather Energy IPO', detail: 'Subscribed 17X • Closing Today', initials: 'A' },
      { id: 'nsdl', name: 'NSDL IPO', detail: 'Subscribed 19X • Closing 12 June', initials: 'N' },
    ],
  },
  {
    title: 'Upcoming IPOs',
    items: [
      { id: 'hdb', name: 'HDB Financial IPO', detail: 'To be announced', initials: 'H' },
      { id: 'ather-up', name: 'Ather Energy IPO', detail: 'To be announced', initials: 'A' },
      { id: 'rentomojo', name: 'Rentomojo IPO', detail: 'Opens 3 Jun', initials: 'R' },
    ],
  },
]

// ---- After typing ----------------------------------------------------------------------------------------------

const bankWatchlists: WatchlistMatch[] = [
  { id: 'banking', name: 'Banking stocks', initials: 'B', count: 2 },
  { id: 'large-cap-banking', name: 'large cap banking', initials: 'L', count: 2 },
]

const bankStocks: SearchResult[] = [
  { id: 'BANKBARODA', name: 'Bank of Baroda', detail: 'Small Cap • BANKBARODA', initials: 'BB', price: 248.35, changePct: -2.03, saved: true },
  { id: 'HDFCBANK', name: 'HDFC Bank', detail: 'Large Cap • HDFCBANK', initials: 'HB', price: 1964.56, changePct: -0.42 },
  { id: 'ICICIBANK', name: 'ICICI Bank', detail: 'Large Cap • ICICIBANK', initials: 'IB', price: 1428.9, changePct: 0.86 },
  { id: 'AXISBANK', name: 'Axis Bank', detail: 'Large Cap • AXISBANK', initials: 'AB', price: 1182.4, changePct: -1.12 },
  { id: 'KOTAKBANK', name: 'Kotak Mahindra Bank', detail: 'Large Cap • KOTAKBANK', initials: 'KM', price: 2104.75, changePct: 1.35 },
  { id: 'PNB', name: 'Punjab National Bank', detail: 'Mid Cap • PNB', initials: 'PN', price: 112.48, changePct: -2.03 },
  { id: 'AUBANK', name: 'AU Small Finance Bank', detail: 'Mid Cap • AUBANK', initials: 'AU', price: 742.1, changePct: 0.54 },
  { id: 'FEDERALBNK', name: 'Federal Bank', detail: 'Mid Cap • FEDERALBNK', initials: 'FB', price: 208.62, changePct: -0.77 },
]

const bankContracts: SearchResult[] = [
  { id: 'hdfc-fut', name: 'HDFC Bank', detail: 'Stock • Fut • 30JUN2026', saved: true },
  { id: 'hdfc-call', name: 'HDFC Bank', detail: 'Stock • Call • 30JUN2026' },
  { id: 'bn-call', name: 'BANKNIFTY 52000', detail: 'Index • Call • 30JUN2026' },
  { id: 'bn-put', name: 'BANKNIFTY 52000', detail: 'Index • Put • 30JUN2026' },
]

const bankFunds: SearchResult[] = [
  { id: 'hdfc-banking', name: 'HDFC Banking and Financial Services Fund', detail: 'Sectoral • Banking', returnsLabel: '3Y', changePct: 14.62, saved: true },
  { id: 'axis-banking', name: 'Axis Banking Fund', detail: 'Sectoral • Banking', returnsLabel: '3Y', changePct: 11.08 },
]

const noWatchlistCounts = (w: WatchlistMatch[]) => w.map(({ count: _count, ...rest }) => rest)

/** "Bank": results on the Stocks, F&O and MF tabs (no IPO matches). */
export const bank: SearchResults = {
  query: 'Bank',
  counts: { stocks: bankStocks.length, us: 0, fno: bankContracts.length, mf: bankFunds.length, ipo: 0 },
  tabs: {
    stocks: { watchlists: bankWatchlists, listTitle: 'Stocks', items: bankStocks },
    fno: { watchlists: noWatchlistCounts(bankWatchlists), listTitle: 'Contracts', items: bankContracts },
    mf: { watchlists: noWatchlistCounts(bankWatchlists), listTitle: 'Funds', items: bankFunds },
  },
}

/** "Bank" for someone with no matching watchlist: only the stocks. */
export const bankNoWatchlist: SearchResults = { ...bank, tabs: { ...bank.tabs, stocks: { watchlists: [], listTitle: 'Stocks', items: bankStocks } } }

/** "Penny": a watchlist matches, no stock does. */
export const penny: SearchResults = {
  query: 'Penny',
  counts: { stocks: 1, us: 0, fno: 0, mf: 0, ipo: 0 },
  tabs: { stocks: { watchlists: [{ id: 'penny', name: 'Penny stocks', initials: 'P', count: 7 }], listTitle: 'Stocks', items: [] } },
}

/** "Energy": two IPOs. */
export const energy: SearchResults = {
  query: 'Energy',
  counts: { stocks: 3, us: 0, fno: 1, mf: 0, ipo: 2 },
  tabs: {
    ipo: {
      watchlists: [],
      listTitle: 'IPOs',
      items: [
        { id: 'nsdl-energy', name: 'NSDL Energy IPO', detail: 'Opens 3 Jun', initials: 'N', priceBand: '₹760–₹800', saved: true },
        { id: 'ather-energy', name: 'Ather Energy IPO', detail: 'To be announced', initials: 'A', priceBand: '₹304–₹321' },
      ],
    },
  },
}

/** "Gold": MCX gold options (live app reference, 2026-10-29). Two far-from-the-money strikes are illiquid. */
const goldContracts: SearchResult[] = [
  { id: 'gold-140000-pe', name: 'GOLD 140000', detail: 'MCX • Put • 30OCT2026', image: goldArt, price: 142.5, changePct: -43.68 },
  { id: 'gold-145000-ce', name: 'GOLD 145000', detail: 'MCX • Call • 30OCT2026', image: goldArt, price: 291.5, changePct: -53.77 },
  { id: 'gold-146000-ce', name: 'GOLD 146000', detail: 'MCX • Call • 30OCT2026', image: goldArt, price: 130.5, changePct: -62.34 },
  { id: 'gold-142000-pe', name: 'GOLD 142000', detail: 'MCX • Put • 30OCT2026', image: goldArt, price: 455, changePct: -23.59 },
  { id: 'gold-144000-ce', name: 'GOLD 144000', detail: 'MCX • Call • 30OCT2026', image: goldArt, price: 612, changePct: -42.64 },
  { id: 'gold-135000-pe', name: 'GOLD 135000', detail: 'MCX • Put • 30OCT2026', image: goldArt, price: 16.5, changePct: -40, illiquid: true },
  { id: 'gold-147000-ce', name: 'GOLD 147000', detail: 'MCX • Call • 30OCT2026', image: goldArt, price: 63, changePct: -67.1 },
  { id: 'gold-150000-ce', name: 'GOLD 150000', detail: 'MCX • Call • 30OCT2026', image: goldArt, price: 11, changePct: -71.43, illiquid: true },
  { id: 'gold-141000-pe', name: 'GOLD 141000', detail: 'MCX • Put • 30OCT2026', image: goldArt, price: 256, changePct: -34.19 },
  { id: 'gold-143000-pe', name: 'GOLD 143000', detail: 'MCX • Put • 30OCT2026', image: goldArt, price: 765.5, changePct: -16.38 },
]

/** "Gold": only F&O contracts in this sample. */
export const gold: SearchResults = {
  query: 'Gold',
  counts: { stocks: 0, us: 0, fno: goldContracts.length, mf: 0, ipo: 0 },
  tabs: { fno: { watchlists: [], listTitle: 'Contracts', items: goldContracts } },
}

/** A query nothing matches ("Vanf", "Adsf"): the empty state on every tab. */
export const nothing = (query: string): SearchResults => ({ query, counts: { stocks: 0, us: 0, fno: 0, mf: 0, ipo: 0 }, tabs: {} })

/**
 * Prototype search: the sample result sets above, matched as you type ("Ba" → Bank). Anything else finds nothing.
 * Real app: a search API call per query (debounced), returning SearchResults. An empty query = nothing typed yet.
 */
export function search(query: string): SearchResults | undefined {
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  const sample = [bank, penny, energy, gold].find((s) => s.query.toLowerCase().startsWith(q))
  const found = sample ? { ...sample, query } : nothing(query)
  // The US tab searches the US catalogue by name or ticker, whatever the query.
  const us = usStocks(q)
  return us.length ? { ...found, counts: { ...found.counts, us: us.length }, tabs: { ...found.tabs, us: { watchlists: [], listTitle: 'US Stocks', items: us } } } : found
}

/** US stocks whose ticker, or any word of the name onward, starts with the query ("nv", "nvidia corp", "corp"). Prices in $. */
export function usStocks(q: string): SearchResult[] {
  return Object.entries(catalogue)
    .filter(([sym, s]) => sym.toLowerCase().startsWith(q) || ` ${s.name.toLowerCase()}`.includes(` ${q}`))
    .map(([sym, s]) => ({ id: sym, name: s.name, detail: `${s.exchange} • ${sym}`, initials: sym[0], logoUrl: usLogo(sym), price: s.price, changePct: s.change, currency: 'usd' as const }))
}

// ---- Smart Options & Futures (signals) ---------------------------------------------------------------------------

/** Which underlyings a signals list shows — the ↕ pill in the bar switches between them. */
export type SignalScope = 'indices' | 'stocks'

export const signalScopes: Record<SignalScope, { label: string; categories: string[] }> = {
  indices: { label: 'Indices', categories: ['Top Traded', 'Most Active', 'OI Gainers', 'OI Losers', 'Top Gainers', 'Top Losers'] },
  stocks: { label: 'Stocks', categories: ['Top Traded', 'OI Gainers', 'OI Losers', 'Top Gainers', 'Top Losers'] },
}

/** How a signals list is sorted — the ↕ switcher on the right of the list header. */
export type SignalSort = 'price' | 'volume'

export const indexSignals: SearchResult[] = [
  { id: 's1', name: 'SENSEX 61000', detail: 'Stock • Fut • 30JUN2026', price: 85.35, changePct: -2.03 },
  { id: 's2', name: 'NIFTY 18250', detail: 'Stock • Call • 30JUN2026', price: 66.4, changePct: 4.12 },
  { id: 's3', name: 'NIFTY 18250', detail: 'Stock • Put • 30JUN2026', price: 23.3, changePct: -6.4 },
  { id: 's4', name: 'SENSEX 61000', detail: 'Index • Call • 30JUN2026', price: 784.15, changePct: 1.86 },
  { id: 's5', name: 'NIFTY 18250', detail: 'Stock • Put • 30JUN2026', price: 766.5, changePct: -2.03 },
  { id: 's6', name: 'SENSEX 61000', detail: 'Index • Call • 30JUN2026', price: 29.6, changePct: 3.25 },
  { id: 's7', name: 'NIFTY 18250', detail: 'Stock • Put • 30JUN2026', price: 15.7, changePct: -8.14 },
  { id: 's8', name: 'SENSEX 61000', detail: 'Stock • Put • 30JUN2026', price: 49, changePct: -1.52 },
  { id: 's9', name: 'SENSEX 61000', detail: 'Stock • Put • 30JUN2026', price: 23.3, changePct: 0.43 },
]

export const stockSignals: SearchResult[] = [
  { id: 't1', name: 'VBL 525', detail: 'Stock • Fut • 30JUN2026', price: 85.35, changePct: -2.03, volume: 407925 },
  { id: 't2', name: 'COLPAL 2160', detail: 'Stock • Call • 30JUN2026', price: 66.4, changePct: 2.41, volume: 473250 },
  { id: 't3', name: 'MAXHEALTH 1090', detail: 'Stock • Put • 30JUN2026', price: 23.3, changePct: -3.6, volume: 374850 },
  { id: 't4', name: 'ASIANPAINT 2620', detail: 'Index • Call • 30JUN2026', price: 784.15, changePct: 1.08, volume: 336375 },
  { id: 't5', name: 'PAYTM 1150', detail: 'Stock • Put • 30JUN2026', price: 766.5, changePct: -2.03, volume: 1813225 },
  { id: 't6', name: 'ITC 302.5', detail: 'Index • Call • 30JUN2026', price: 29.6, changePct: 5.72, volume: 204750 },
  { id: 't7', name: 'ICICIPRULI 530', detail: 'Stock • Put • 30JUN2026', price: 15.7, changePct: -4.9, volume: 1821550 },
  { id: 't8', name: 'AUROPHARMA 1480', detail: 'Stock • Put • 30JUN2026', price: 49, changePct: 0.82, volume: 971500 },
]

// ---- Watchlists (Add to watchlist sheet) -------------------------------------------------------------------------

/** All of the user's watchlists, in the order they made them (the sheet lists them all). */
export const allWatchlists = [
  'Momentum Plays', 'Banking Giants', 'Long Term Bets', 'Buy the Dip', 'AI & Tech', 'Crypto Watch', 'Breakout Setup',
  'Emerging Stocks', 'High Risk High Reward', 'Research Pending', 'Growth Opportunities', 'Market Trends',
  'Investment Strategies', 'Portfolio Management',
]

/** Someone with only a few watchlists. */
export const fewWatchlists = allWatchlists.slice(0, 4)
```

### `src/flows/search/index.tsx`

```tsx
import { Aerobar } from '@l3/components/Aerobar'
import { Icon } from '@l3/components/Icon'
import { msCheck } from '@l3/icons/material'
import { viewUsStock } from '../../shared/data/usStocks'
import type { Flow, Go } from '../types'
import { t } from './copy'
import { allWatchlists, bank, bankNoWatchlist, energy, fewWatchlists, nothing, penny, type SearchResult } from './data'
import { Search } from './screens/Search'
import { Signals } from './screens/Signals'
import { AddToWatchlistSheet, CreateWatchlistSheet } from './sheets/WatchlistSheets'

/** HDFC Bank after it's been added to a watchlist (plus Bank of Baroda, already in one). */
const savedAfter = ['BANKBARODA', 'HDFCBANK']

/**
 * Search — the search screen for Stocks, US stocks, F&O, MF and IPO (one screen, five tabs), F&O's Smart Options & Futures lists,
 * and adding a result to a watchlist. Figma: "Search → 🌙 Dark" (4912:12950) in the dev handoff file — final D2
 * layouts, rebuilt with L3 components and tokens without changing the layout.
 */
/**
 * Tapping a result: commodity contracts (they carry artwork) open their asset page in F&O — fno-21, or the ILLIQUID
 * asset page fno-22; US stocks open their US stock page (us-stocks-13) for that ticker. Other results have no page in
 * this prototype yet.
 */
const openResult = (go: Go) => (item: SearchResult) => {
  if (item.currency === 'usd') { viewUsStock(item.id); go('us-stocks-13'); return }
  if (item.image) go(item.illiquid ? 'fno-22' : 'fno-21')
}

export const search: Flow = {
  id: 'search',
  title: 'Search',
  description: 'Search stocks, US stocks, F&O contracts, mutual funds and IPOs; Smart Options & Futures lists; add to watchlist.',
  figmaFile: 'sG24GPizTdwbMBxLm0IpTA',
  sections: [
    { id: 'stocks', title: 'Stocks' },
    { id: 'us', title: 'US stocks' },
    { id: 'fno', title: 'F&O' },
    { id: 'mf', title: 'Mutual funds' },
    { id: 'ipo', title: 'IPO' },
    { id: 'watchlist', title: 'Add to watchlist' },
  ],
  screens: [
    // ---- Stocks
    { id: 'search-01', section: 'stocks', name: 'Stocks · before typing', figma: '4912:13308', note: 'From the search field on Stocks home. Recent (last 5) and popular searches as chips, max 200 wide. Type to search; the tabs switch in place.', render: (go) => <Search onOpen={openResult(go)} tab="stocks" onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} /> },
    { id: 'search-24', section: 'stocks', name: 'Stocks · before typing (from Market)', figma: '4912:13308', note: 'Opened from the Search action on the Market tab: the same screen as search-01, but back returns to Market.', render: (go) => <Search onOpen={openResult(go)} tab="stocks" onBack={() => go('market-01')} onBookmark={() => go('search-18')} /> },
    { id: 'search-02', section: 'stocks', name: 'Stocks · results', figma: '4912:13483', note: '"Bank": 2 matching watchlists, then 8 stocks. A bookmark opens Add to watchlist; ✕ clears.', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} /> },
    { id: 'search-03', section: 'stocks', name: 'Stocks · only a watchlist matches', figma: '4912:13671', note: '"Penny": the watchlist, and "Stocks (0)" with nothing under it.', render: (go) => <Search onOpen={openResult(go)} results={penny} onBack={() => go('stocks-01')} /> },
    { id: 'search-04', section: 'stocks', name: 'Stocks · no matching watchlist', figma: '4912:13587', note: 'Same results without the watchlist group.', render: (go) => <Search onOpen={openResult(go)} results={bankNoWatchlist} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} /> },
    { id: 'search-05', section: 'stocks', name: 'Stocks · nothing found', figma: '4912:13703', note: 'L3 empty state with the L3 default illustration (Figma still has the old magnifier). Clear Search empties the field.', render: (go) => <Search onOpen={openResult(go)} results={nothing('Vanf')} onBack={() => go('stocks-01')} /> },
    // ---- US stocks (was US Stocks' own search screen, us-stocks-03 / Figma 5796:89230 — merged here)
    { id: 'search-29', section: 'us', badge: 'new', badgeNote: 'US tab added to Search (replaces US Stocks’ own search screen)', name: 'US · before typing', figma: '5796:89230', note: 'From the search field on Stocks home’s US tab, or Search on the US Portfolio. Recent and popular US stocks as chips (a chip searches for that company), then US collections as tiles. Back returns to where Search was opened.', render: (go) => <Search onOpen={openResult(go)} tab="us" backToPrevious onBack={() => go('stocks-01')} /> },
    { id: 'search-30', section: 'us', badge: 'new', name: 'US · results', figma: '', note: '"N": US stocks by name or ticker, with $ prices. A row opens that stock’s US stock page.', render: (go) => <Search onOpen={openResult(go)} tab="us" query="N" backToPrevious onBack={() => go('stocks-01')} /> },
    { id: 'search-31', section: 'us', badge: 'new', name: 'US · nothing found', figma: '', note: 'No US stock matches: L3 empty state with Clear search.', render: (go) => <Search onOpen={openResult(go)} tab="us" results={nothing('Vanf')} backToPrevious onBack={() => go('stocks-01')} /> },

    // ---- F&O
    { id: 'search-25', section: 'fno', name: 'F&O · search from home', figma: '4912:13728', note: 'From F&O home; Back returns there.', render: (go) => <Search onOpen={openResult(go)} tab="fno" onBack={() => go('fno-01')} onSignals={() => go('search-26')} /> },
    { id: 'search-28', section: 'fno', name: 'F&O · “Gold” results (illiquid)', figma: '', note: 'Typing “Gold” on the F&O tab (live app reference, 2026-10-29): MCX gold options with the gold artwork. Illiquid contracts (GOLD 135000 Put, GOLD 150000 Call) carry the ILLIQUID tag after the name; tapping the tag opens “What does illiquidity mean?”. Tapping a row opens the contract’s asset page (fno-21); an illiquid one opens the ILLIQUID asset page (fno-22).', render: (go) => <Search onOpen={openResult(go)} tab="fno" query="Gold" keyboard={false} onBack={() => go('fno-01')} onSignals={() => go('search-26')} /> },
    { id: 'search-26', section: 'fno', name: 'F&O home · all Smart Options', figma: '4912:13925', render: (go) => <Signals scope="indices" onBack={() => go('fno-01')} /> },
    { id: 'search-27', section: 'fno', name: 'F&O home · all Smart Futures', figma: '4912:14019', note: 'Uses the existing combined Smart Options & Futures stock list.', render: (go) => <Signals scope="stocks" onBack={() => go('fno-01')} /> },
    { id: 'search-06', section: 'fno', name: 'F&O · before typing', figma: '4912:13728', note: 'Recent and popular contracts, then the Smart Options & Futures lists as tiles (a long name wraps; its row grows).', render: (go) => <Search onOpen={openResult(go)} tab="fno" onBack={() => go('stocks-01')} onSignals={() => go('search-09')} /> },
    { id: 'search-07', section: 'fno', name: 'F&O · results', figma: '4912:14199', note: '"Bank": watchlists (no count on this tab), then the contracts.', render: (go) => <Search onOpen={openResult(go)} tab="fno" results={bank} onBack={() => go('stocks-01')} /> },
    { id: 'search-08', section: 'fno', name: 'F&O · nothing found', figma: '4912:13902', render: (go) => <Search onOpen={openResult(go)} tab="fno" results={nothing('Vanf')} onBack={() => go('stocks-01')} /> },
    { id: 'search-09', section: 'fno', name: 'Smart Options & Futures · indices', figma: '4912:13925', note: 'The ↕ pill switches Indices / Stocks; pills pick the list; Price ↕ switches the sort to Volume.', render: (go) => <Signals scope="indices" onBack={() => go('search-06')} /> },
    { id: 'search-10', section: 'fno', name: 'Smart Options & Futures · stocks', figma: '4912:14019', render: (go) => <Signals scope="stocks" onBack={() => go('search-06')} /> },
    { id: 'search-11', section: 'fno', name: 'Smart Options & Futures · by volume', figma: '4912:14113', note: 'Sorted by volume: each row shows its volume instead of price + change.', render: (go) => <Signals scope="stocks" sort="volume" onBack={() => go('search-06')} /> },
    // ---- Mutual funds
    { id: 'search-12', section: 'mf', name: 'MF · before typing', figma: '4912:13035', note: 'Recent and popular funds, then collections as tiles.', render: (go) => <Search onOpen={openResult(go)} tab="mf" onBack={() => go('stocks-01')} /> },
    { id: 'search-13', section: 'mf', name: 'MF · results', figma: '4912:12952', note: '"Bank": watchlists, then funds with 3Y returns; the 3Y Returns ↕ switcher changes the period.', render: (go) => <Search onOpen={openResult(go)} tab="mf" results={bank} onBack={() => go('stocks-01')} /> },
    { id: 'search-14', section: 'mf', name: 'MF · no fund matches', figma: '4912:13010', note: 'Other tabs have results ("Energy"), this one has none: the empty state on this tab only.', render: (go) => <Search onOpen={openResult(go)} tab="mf" results={energy} onBack={() => go('stocks-01')} /> },
    // ---- IPO
    { id: 'search-15', section: 'ipo', name: 'IPO · before typing', figma: '4912:13116', note: 'Recent and popular IPOs, then Most Subscribed and Upcoming IPOs (View All each).', render: (go) => <Search onOpen={openResult(go)} tab="ipo" onBack={() => go('stocks-01')} /> },
    { id: 'search-16', section: 'ipo', name: 'IPO · results', figma: '4912:13240', note: '"Energy": 2 IPOs with their price bands.', render: (go) => <Search onOpen={openResult(go)} tab="ipo" results={energy} onBack={() => go('stocks-01')} /> },
    { id: 'search-17', section: 'ipo', name: 'IPO · nothing found', figma: '4912:13274', render: (go) => <Search onOpen={openResult(go)} tab="ipo" results={nothing('Adsf')} onBack={() => go('stocks-01')} /> },
    // ---- Add to watchlist (from a result's bookmark on search-02)
    { id: 'search-18', section: 'watchlist', name: 'Add to watchlist', figma: '4912:14274', note: 'From HDFC Bank’s bookmark. Nothing ticked yet: Save is off. The keyboard goes down while the sheet is open.', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} keyboard={false} sheet={<AddToWatchlistSheet lists={allWatchlists} onSave={() => go('search-20')} onCreate={() => go('search-22')} onClose={() => go('search-02')} />} /> },
    { id: 'search-19', section: 'watchlist', name: 'Add to watchlist · 2 ticked', figma: '4912:14811', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} keyboard={false} sheet={<AddToWatchlistSheet lists={allWatchlists} checked={['Momentum Plays', 'Banking Giants']} onSave={() => go('search-20')} onCreate={() => go('search-22')} onClose={() => go('search-02')} />} /> },
    { id: 'search-20', section: 'watchlist', name: 'Added · toast', figma: '4912:15015', note: 'Floating L3 toast with OK; it leaves on its own (L3 timing: 6 s with an action — Figma says 2 s).', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} saved={savedAfter} toast={<Aerobar floating emphasis="primary" icon={<Icon icon={msCheck} />} heading={t('toast.added')} action={{ label: t('toast.ok'), onClick: () => go('search-21') }} onDismiss={() => go('search-21')} />} /> },
    { id: 'search-21', section: 'watchlist', name: 'Added · bookmark filled', figma: '4912:15123', note: 'HDFC Bank’s bookmark is now filled with a tick.', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} saved={savedAfter} /> },
    { id: 'search-22', section: 'watchlist', name: 'Create watchlist', figma: '4912:14650', note: 'From "+ Create" (or the first time, when there’s no watchlist yet). The keyboard sits under the dock.', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} keyboard={false} sheet={<CreateWatchlistSheet name="Banking" onCreate={() => go('search-20')} onClose={() => go('search-18')} />} /> },
    { id: 'search-23', section: 'watchlist', name: 'Add to watchlist · few lists', figma: '4912:14477', note: 'Someone with 4 watchlists: the sheet is only as tall as its rows.', render: (go) => <Search onOpen={openResult(go)} results={bank} onBack={() => go('stocks-01')} onBookmark={() => go('search-18')} keyboard={false} sheet={<AddToWatchlistSheet lists={fewWatchlists} onSave={() => go('search-20')} onCreate={() => go('search-22')} onClose={() => go('search-02')} />} /> },
  ],
}
```

### `src/flows/search/screens/Search.module.css`

```css
/*
 * Figma "Body" / "resut": groups 24 apart, 16 above the first and below the last. Layout is L3 Section / Stack; only
 * what those blocks don't cover lives here.
 */

/* IPO lists (Most Subscribed, Upcoming IPOs): 8 more above, a bigger break than the chip groups (24 + 8 = 32). The
   blocks pad both sides of an axis alike, so the extra 8 on top only stays a class. */
.ipoList {
  padding-top: var(--l3-spacing-08);
}

/* No match: the L3 empty state fills the space above the keyboard and centres itself. */
.fill {
  flex: 1;
}
```

### `src/flows/search/screens/Search.tsx`

```tsx
import { useState, type ReactNode } from 'react'
import { Actionbar, ActionbarAction } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { EmptyState } from '@l3/components/EmptyState'
import { Icon } from '@l3/components/Icon'
import { Section } from '@l3/components/Section'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tabs } from '@l3/components/Tabs'
import { msClose, msDeleteForever } from '@l3/icons/material'
import { usePreview } from '../../../shared/prototype'
import { Screen } from '../../../shared/ui/Screen'
import { IlliquidSheet } from '../../../shared/ui/IlliquidSheet'
import { TextKeyboard, typeText } from '../../../shared/ui/TextKeyboard'
import { GroupHeader, ViewAll } from '../components/GroupHeader'
import { ResultList } from '../components/ResultList'
import { SearchChips } from '../components/SearchChips'
import { Tiles } from '../components/Tiles'
import { WatchlistMatches } from '../components/WatchlistMatches'
import {
  collections, ipoLists, popular, recent, search, signalCategories, usCollections,
  type SearchChip, type SearchResult, type SearchResults, type SearchTab,
} from '../data'
import { t } from '../copy'
import styles from './Search.module.css'

const TABS: SearchTab[] = ['stocks', 'us', 'fno', 'mf', 'ipo']

type SearchProps = {
  /** The tab it opens on. */
  tab?: SearchTab
  /** What's typed when it opens ('' = before typing: recent + popular searches). */
  query?: string
  /** Results to show for `query` instead of the sample search (e.g. "no matching watchlist"). */
  results?: SearchResults
  /** Ids in a watchlist (filled bookmarks) — the sample data's `saved` otherwise. */
  saved?: string[]
  /** The phone's keyboard is up (it is while searching; it goes down when a sheet opens). */
  keyboard?: boolean
  sheet?: ReactNode
  toast?: ReactNode
  onBack?: () => void
  /** A result's bookmark: open "Add to watchlist". */
  onBookmark?: (item: SearchResult) => void
  /** F&O: a Smart Options & Futures tile (or View All) opens its signals list. */
  onSignals?: (category: string) => void
  /** A result row opens its page (commodity contracts → the asset page; illiquid → the ILLIQUID asset page; US stocks → the US stock page). */
  onOpen?: (item: SearchResult) => void
  /** Back goes to the screen shown before (wherever Search was opened from), `onBack` when there's none. */
  backToPrevious?: boolean
}

/**
 * Search — one screen for Stocks, US, F&O, MF and IPO. The top bar is the search field (back · field · ✕ once something is
 * typed) with the five tabs in its bottom slot; each tab shows its result count once there's a query.
 * Before typing: recent and popular searches (chips), plus US collections, F&O's Smart Options & Futures, MF's
 * collections or the IPO lists. A US chip types its name into the field. After typing: the matching watchlists, then the results (with a bookmark each). No match on a tab: the L3
 * empty state with "Clear Search". The phone keyboard stays up while searching.
 */
export function Search({ tab: initialTab = 'stocks', query: initialQuery, results, saved, keyboard = true, sheet, toast, onBack, onBookmark, onSignals, onOpen, backToPrevious }: SearchProps) {
  const { interactive, back } = usePreview()
  const goBack = () => { if (!(backToPrevious && back?.())) onBack?.() }
  const startQuery = initialQuery ?? results?.query ?? ''
  const [tab, setTab] = useState<SearchTab>(initialTab)
  const [query, setQuery] = useState(startQuery)
  const shown = results && query === startQuery ? results : search(query)

  const tabItems = TABS.map((id) => ({ value: id, label: shown ? t('tab.withCount', { tab: t(`tab.${id}`), count: shown.counts[id] }) : t(`tab.${id}`) }))
  const clear = () => setQuery('')
  // An ILLIQUID tag on a result explains illiquidity (the shared sheet, this flow's words).
  const [illiquid, setIlliquid] = useState<SearchResult | null>(null)
  const illiquidSheet = illiquid ? <IlliquidSheet onClose={() => setIlliquid(null)} copy={{ title: t('illiquid.title'), description: t('illiquid.forContract', { contract: illiquid.name }), points: [t('illiquid.point1'), t('illiquid.point2'), t('illiquid.point3')], ok: t('illiquid.ok') }} /> : undefined

  return (
    <Screen
      top={
        <Actionbar
          onBack={onBack || backToPrevious ? goBack : undefined}
          search={{ value: query, onChange: setQuery, placeholder: t(`field.${tab}`), label: t(`field.${tab}`), autoFocus: interactive && keyboard }}
          actions={query ? <ActionbarAction variant="ghost" icon={msClose} label={t('field.clear')} onClick={clear} /> : undefined}
          bottom={<Tabs size="sm" aria-label={t('tabs.label')} items={tabItems} value={tab} onChange={(v) => setTab(v as SearchTab)} />}
        />
      }
      bottom={keyboard ? <TextKeyboard onKey={(k) => setQuery((q) => typeText(q, k))} /> : undefined}
      toast={toast}
      sheet={sheet ?? illiquidSheet}
    >
      {!shown ? (
        <BeforeTyping tab={tab} onSignals={onSignals} onPick={(chip) => setQuery(chip.label)} />
      ) : shown.tabs[tab] ? (
        <Results tab={tab} results={shown} saved={saved} onBookmark={onBookmark} onIlliquid={setIlliquid} onOpen={onOpen} />
      ) : (
        <Stack direction="horizontal" className={styles.fill}>
          <EmptyState
            title={t('empty.title')}
            description={t('empty.description')}
            action={<Button size="sm" iconLeft={<Icon icon={msDeleteForever} />} onClick={clear}>{t('empty.clear')}</Button>}
          />
        </Stack>
      )}
    </Screen>
  )
}

/** Nothing typed yet. */
function BeforeTyping({ tab, onSignals, onPick }: { tab: SearchTab; onSignals?: (category: string) => void; onPick?: (chip: SearchChip) => void }) {
  // US chips search for that company (the other tabs' chips are not wired in this prototype).
  const pick = tab === 'us' ? onPick : undefined
  return (
    <Section paddingBlock="16" gap="24">
      <SearchChips title={t('recent.title')} rows={[recent[tab]]} onPick={pick} />
      <SearchChips title={t('popular.title')} rows={popular[tab]} onPick={pick} />
      {tab === 'us' && (
        <Stack as="section" gap="12" aria-label={t('collections.title')}>
          <GroupHeader title={t('collections.title')} />
          <Tiles items={usCollections} label={t('usCollections.tilesLabel')} muted />
        </Stack>
      )}
      {tab === 'fno' && (
        <Stack as="section" gap="12" aria-label={t('signals.title')}>
          <GroupHeader title={t('signals.title')} action={<ViewAll label={t('signals.title')} onClick={() => onSignals?.(signalCategories[0])} />} />
          <Tiles items={signalCategories} label={t('signals.tilesLabel')} onPick={onSignals} />
        </Stack>
      )}
      {tab === 'mf' && (
        <Stack as="section" gap="12" aria-label={t('collections.title')}>
          <GroupHeader title={t('collections.title')} action={<ViewAll label={t('collections.title')} />} />
          <Tiles items={collections} label={t('collections.tilesLabel')} muted />
        </Stack>
      )}
      {tab === 'ipo' &&
        ipoLists.map((list) => (
          <Stack as="section" key={list.title} className={styles.ipoList} aria-label={list.title}>
            <GroupHeader title={list.title} action={<ViewAll label={list.title} />} />
            <ResultList items={list.items} label={list.title} />
          </Stack>
        ))}
    </Section>
  )
}

/** Something typed and this tab has matches (watchlists, items, or both). */
function Results({ tab, results, saved, onBookmark, onIlliquid, onOpen }: { tab: SearchTab; results: SearchResults; saved?: string[]; onBookmark?: (item: SearchResult) => void; onIlliquid?: (item: SearchResult) => void; onOpen?: (item: SearchResult) => void }) {
  const { watchlists, listTitle, items } = results.tabs[tab]!
  return (
    <Section paddingBlock="16" gap="24">
      {watchlists.length > 0 && <WatchlistMatches watchlists={watchlists} />}
      <Stack as="section" aria-label={listTitle}>
        <GroupHeader
          title={t('results.title', { list: listTitle, count: items.length })}
          action={tab === 'mf' && items.length > 0 ? <Select size="sm" icon="swap" aria-label={t('results.returnsPeriod')} onClick={() => {}}>{t('results.returns3y')}</Select> : undefined}
        />
        <ResultList items={items} label={listTitle} saved={saved} onBookmark={onBookmark} onIlliquid={onIlliquid} onOpen={onOpen} />
      </Stack>
    </Section>
  )
}
```

### `src/flows/search/screens/Signals.module.css`

```css
/* Signals list. Layout is L3 Stack; only what it doesn't cover lives here. */

/* Pill row in the top bar's bottom slot: 12 above and below, the first pill at the 16 page margin, 8 apart; scrolls
   sideways when the lists don't fit (L3: pill rows at the top of a screen). The padding stays here: it has to be
   inside the scrolling row, and a Stack has none. */
.pills {
  position: relative;
  padding: var(--l3-spacing-12) var(--l3-spacing-16);
  overflow-x: auto;
  scrollbar-width: none;
}

.pills::-webkit-scrollbar {
  display: none;
}

.pills > * {
  flex: none;
}

/* Figma "header": 16 above, 16 from both edges (none below), Filter left and the sort right. */
.header {
  min-height: var(--l3-size-16);
  padding: var(--l3-spacing-16) var(--l3-spacing-16) 0;
}
```

### `src/flows/search/screens/Signals.tsx`

```tsx
import { useState } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tab, Tabs } from '@l3/components/Tabs'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { msFilterList } from '@l3/icons/material'
import { Screen } from '../../../shared/ui/Screen'
import { ResultList } from '../components/ResultList'
import { indexSignals, signalScopes, stockSignals, type SignalScope, type SignalSort } from '../data'
import { t } from '../copy'
import styles from './Signals.module.css'

type SignalsProps = {
  scope?: SignalScope
  category?: string
  sort?: SignalSort
  onBack?: () => void
}

/**
 * Smart Options & Futures — a signals list (Top Traded, OI Gainers …), opened from a tile on F&O search.
 * Top bar: back + title; in its bottom slot an L3 action pill (↕ Indices / Stocks — switches the underlyings) and the
 * lists as pill tabs. Then the list header — Filter (Ghost Small) on the left, the sort (L3 Select ↕: Price / Volume)
 * on the right — and the contracts (no bookmarks here). Sorted by volume, each row shows its volume instead of price +
 * change.
 */
export function Signals({ scope: initialScope = 'indices', category = 'Top Traded', sort: initialSort = 'price', onBack }: SignalsProps) {
  const [scope, setScope] = useState<SignalScope>(initialScope)
  const [list, setList] = useState(category)
  const [sort, setSort] = useState<SignalSort>(initialSort)
  const other: SignalScope = scope === 'indices' ? 'stocks' : 'indices'
  const { label, categories } = signalScopes[scope]
  const rows = scope === 'indices' ? indexSignals : stockSignals
  const sortLabel = sort === 'price' ? t('signalsList.sortPrice') : t('signalsList.sortVolume')
  const sorted = sort === 'volume' ? [...rows].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0)) : rows

  return (
    <Screen
      top={
        <Actionbar
          title={t('signals.title')}
          onBack={onBack}
          bottom={
            <Stack direction="horizontal" align="center" gap="08" className={styles.pills}>
              <Tab
                action
                appearance="pill"
                iconRight={<Icon icon={lmSwitchArrowVertical} />}
                aria-label={t('signalsList.switchScope', { scope: label, other: signalScopes[other].label })}
                onClick={() => setScope(other)}
              >
                {label}
              </Tab>
              <Tabs
                appearance="pill"
                aria-label={t('signalsList.listsLabel')}
                items={categories.map((c) => ({ value: c, label: c }))}
                value={categories.includes(list) ? list : categories[0]}
                onChange={setList}
              />
            </Stack>
          }
        />
      }
    >
      <Stack>
        <Stack direction="horizontal" align="center" justify="between" className={styles.header}>
          <Button variant="ghost" size="sm" iconRight={<Icon icon={msFilterList} />} onClick={() => {}}>
            {t('signalsList.filter')}
          </Button>
          <Select size="sm" icon="swap" aria-label={t('signalsList.sortLabel', { sort: sortLabel })} onClick={() => setSort(sort === 'price' ? 'volume' : 'price')}>
            {sortLabel}
          </Select>
        </Stack>
        <ResultList items={sorted} label={list} bookmarks={false} showVolume={sort === 'volume'} />
      </Stack>
    </Screen>
  )
}
```

### `src/flows/search/sheets/WatchlistSheets.module.css`

```css
/* Figma "content slot": 16 under the header (top space), 24 above the dock (bottom space); rows run edge to edge.
   A Stack with this padding: the blocks pad top and bottom alike. */
.lists {
  padding: var(--l3-spacing-16) 0 var(--l3-spacing-24);
}

/* The field inside the 16 page margin (16 / 24 above and below, so not an Inset). */
.form {
  padding: var(--l3-spacing-16) var(--l3-spacing-16) var(--l3-spacing-24);
}
```

### `src/flows/search/sheets/WatchlistSheets.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Checkbox } from '@l3/components/Checkbox'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { Stack } from '@l3/components/Stack'
import { TextField } from '@l3/components/TextField'
import { msAdd } from '@l3/icons/material'
import { usePreview } from '../../../shared/prototype'
import { Sheet } from '../../../shared/ui/Sheet'
import { TextKeyboard, typeText } from '../../../shared/ui/TextKeyboard'
import { t } from '../copy'
import styles from './WatchlistSheets.module.css'

type AddProps = {
  /** Every watchlist the user has, by name. */
  lists: string[]
  /** Already ticked (the lists the item is in, or a prototype state). */
  checked?: string[]
  onSave?: (lists: string[]) => void
  onCreate?: () => void
  onClose?: () => void
}

/**
 * Add to watchlist — from a result's bookmark. Header with "+ Create" (Tertiary Small) on the right; one row per
 * watchlist (L3 list cell, the checkbox on the left; tap anywhere on the row); Save in the dock, off until at least one
 * list is ticked. Long lists scroll inside the sheet.
 */
export function AddToWatchlistSheet({ lists, checked: initial = [], onSave, onCreate, onClose }: AddProps) {
  const id = useId()
  const [checked, setChecked] = useState<string[]>(initial)
  const toggle = (name: string) => setChecked((c) => (c.includes(name) ? c.filter((n) => n !== name) : [...c, name]))
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={
        <BottomSheetHeader
          headingId={id}
          heading={t('addSheet.title')}
          trailing={<Button variant="tertiary" size="sm" iconLeft={<Icon icon={msAdd} />} onClick={onCreate}>{t('addSheet.create')}</Button>}
        />
      }
      footer={
        <ButtonGroup aria-label={t('addSheet.title')}>
          <Button disabled={checked.length === 0} onClick={() => onSave?.(checked)}>{t('addSheet.save')}</Button>
        </ButtonGroup>
      }
    >
      <Stack className={styles.lists} role="group" aria-label={t('addSheet.listsLabel')}>
        {lists.map((name) => (
          <ListCell
            key={name}
            as="label"
            iconLeft={<Checkbox checked={checked.includes(name)} onChange={() => toggle(name)} />}
            label={name}
          />
        ))}
      </Stack>
    </Sheet>
  )
}

/**
 * Create watchlist — from "+ Create", or straight away when the user has no watchlist yet. One field (Watchlist Name,
 * typing) and Create; the phone keyboard sits under the dock while typing.
 */
export function CreateWatchlistSheet({ name: initialName = '', onCreate, onClose }: { name?: string; onCreate?: (name: string) => void; onClose?: () => void }) {
  const id = useId()
  const { interactive } = usePreview()
  const [name, setName] = useState(initialName)
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={<BottomSheetHeader headingId={id} heading={t('createSheet.title')} />}
      footer={
        <>
          <ButtonGroup aria-label={t('createSheet.title')}>
            <Button disabled={!name.trim()} onClick={() => onCreate?.(name.trim())}>{t('createSheet.create')}</Button>
          </ButtonGroup>
          <TextKeyboard onKey={(k) => setName((n) => typeText(n, k))} />
        </>
      }
    >
      <div className={styles.form}>
        <TextField label={t('createSheet.field')} value={name} placeholder={t('createSheet.placeholder')} autoFocus={interactive} onChange={(e) => setName(e.target.value)} />
      </div>
    </Sheet>
  )
}
```

## Source — shared app parts it uses

### `src/shared/copy.ts`

```ts
/**
 * UI copy. Every user-facing string of a flow lives in ONE file, `src/flows/<flow-id>/copy.json` — flat keys
 * ("empty.title") → the text. Screens read it through the flow's `t`:
 *
 *   t('empty.title')                       → "No search results found"
 *   t('group.results', { list, count })    → "Stocks (8)"   ({name} placeholders are filled in)
 *
 * Sample data (stock names, prices, watchlists) stays in the flow's data.ts — copy.json is only the words the app
 * itself says: titles, labels, buttons, empty states, accessible names. Porting a flow: this file is the string
 * table (Flutter ARB / iOS Localizable.strings).
 */
export type CopyVars = Record<string, string | number>

export function makeCopy<Copy extends Record<string, string>>(flow: string, copy: Copy) {
  return function t(key: keyof Copy & string, vars?: CopyVars): string {
    const template = copy[key] ?? key
    return vars ? template.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m)) : template
  }
}
```

### `src/shared/data/format.ts`

```ts
/** ₹ with Indian grouping: inr(123456.5) → "₹1,23,456.50"; inr(1000, 0) → "₹1,000". */
export const inr = (n: number, decimals = 2) =>
  '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/** $ with US grouping: usd(1234.5) → "$1,234.50"; usd(1000, 0) → "$1,000". */
export const usd = (n: number, decimals = 2) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/** "9876543210" → "98765 43210" (how Indian mobile numbers are read out). */
export const phone = (digits: string) => (digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits)

/** Keep the last `visible` characters: mask('ABCPM1234K', 1, 5) → "ABCPM****K". */
export const mask = (s: string, keepStart: number, keepEnd: number) =>
  s.slice(0, keepStart) + '•'.repeat(Math.max(0, s.length - keepStart - keepEnd)) + s.slice(s.length - keepEnd)
```

### `src/shared/data/live.ts`

```ts
// Live-looking prices for the prototype. Every price on screen moves a little around its real value (the market
// snapshots: market-snapshot.json for Indian stocks, us-market-snapshot.json for US), ticking every 2 s.
// FLAG: simulated movement — there is no free live feed a browser page can call (Yahoo sends no CORS header; Finnhub
// and the like need a key). The level is real (the snapshot); only the wiggle around it is made up. Each symbol moves
// on its own smooth path (a few slow sine waves), never more than ±0.6 % from the snapshot, the same on every device.
import { useSyncExternalStore } from 'react'

const TICK_MS = 2000

let tick = 0
let timer: ReturnType<typeof setInterval> | undefined
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  if (!timer) {
    timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return
      tick += 1
      listeners.forEach((l) => l())
    }, TICK_MS)
  }
  return () => {
    listeners.delete(onChange)
    if (!listeners.size && timer) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

/** Re-render every ticking price now (fresher snapshot data arrived), one tick early. */
export function nudgeLive() {
  tick += 1
  listeners.forEach((l) => l())
}

/** The live clock: a number that goes up by one every 2 s while anything on screen listens. */
export function useLiveTick(): number {
  return useSyncExternalStore(subscribe, () => tick, () => 0)
}

/** A stable number in [0, 1) for a symbol (its path's phase and speed). */
function hash(key: string, salt: number) {
  let n = 2166136261 ^ salt
  for (const c of key) n = Math.imul(n ^ c.charCodeAt(0), 16777619)
  return ((n >>> 0) % 10000) / 10000
}

/** How far a symbol has moved from its snapshot price at a tick: a fraction, within ±0.006. */
export function liveDrift(key: string, at: number): number {
  const a = hash(key, 1), b = hash(key, 2), c = hash(key, 3)
  return 0.0035 * Math.sin(at * (0.21 + a * 0.2) + a * 6.28) + 0.0018 * Math.sin(at * (0.73 + b * 0.4) + b * 6.28) + 0.0007 * Math.sin(at * (1.9 + c) + c * 6.28)
}

export type LiveQuote = {
  price: number
  /** Day change, % (against yesterday's close, so it moves with the price). */
  changePct: number
  /** Day change in the price's currency. */
  change: number
  /** Which way the last tick went: for a brief up / down flash. */
  moved: 'up' | 'down' | 'none'
}

/** A price and its day change % as they are at a tick (yesterday's close is worked back from the snapshot's %). */
export function liveQuote(key: string, price: number, changePct: number, at: number): LiveQuote {
  const prevClose = price / (1 + changePct / 100)
  const now = price * (1 + liveDrift(key, at))
  const before = price * (1 + liveDrift(key, at - 1))
  const round = (n: number) => Math.round(n * 100) / 100
  const p = round(now)
  return {
    price: p,
    change: round(p - prevClose),
    changePct: round(((p - prevClose) / prevClose) * 100),
    moved: at === 0 || round(before) === p ? 'none' : p > round(before) ? 'up' : 'down',
  }
}

/** A price that ticks: `useLiveQuote('NVDA', 204.64, -4.22)`. */
export function useLiveQuote(key: string, price: number, changePct: number): LiveQuote {
  return liveQuote(key, price, changePct, useLiveTick())
}
```

### `src/shared/data/us-market-snapshot.json`

```json
{
 "source": "Yahoo Finance (public chart endpoint)",
 "fetchedAt": "2026-11-03T10:12:30.415Z",
 "symbols": [
  "AAL",
  "AAPL",
  "ABBV",
  "ABNB",
  "ADBE",
  "AEO",
  "AMC",
  "AMD",
  "AMZN",
  "ANF",
  "AVGO",
  "BA",
  "BAC",
  "BB",
  "BBWI",
  "BIRK",
  "BLNK",
  "BOOT",
  "BOTZ",
  "BROS",
  "BYND",
  "CAKE",
  "CAR",
  "CAVA",
  "CHPT",
  "CHWY",
  "CLOV",
  "CMG",
  "COIN",
  "COLM",
  "COST",
  "CPRI",
  "CQQQ",
  "CRM",
  "CROX",
  "CRWD",
  "CSCO",
  "CVX",
  "CZR",
  "DAL",
  "DASH",
  "DDOG",
  "DELL",
  "DIS",
  "DXJ",
  "EB",
  "EBAY",
  "ELF",
  "EPI",
  "ETSY",
  "EWJ",
  "EWY",
  "EZU",
  "F",
  "FEZ",
  "FIVE",
  "FLKR",
  "FUBO",
  "FXI",
  "GAP",
  "GE",
  "GM",
  "GOOG",
  "GOOGL",
  "GPRO",
  "HAS",
  "HD",
  "HEWJ",
  "HOG",
  "HOOD",
  "IBM",
  "IEUR",
  "INDA",
  "INTC",
  "IRBT",
  "ITA",
  "JBLU",
  "JNJ",
  "JPM",
  "KO",
  "KWEB",
  "LAZR",
  "LCID",
  "LEVI",
  "LLY",
  "LULU",
  "LYFT",
  "M",
  "MA",
  "MAR",
  "MAT",
  "MCD",
  "MCHI",
  "META",
  "MRK",
  "MSFT",
  "MU",
  "NET",
  "NFLX",
  "NIO",
  "NKE",
  "NVD",
  "NVDA",
  "NVDL",
  "OPEN",
  "ORCL",
  "PENN",
  "PEP",
  "PFE",
  "PG",
  "PLAY",
  "PLNT",
  "PLTR",
  "PLUG",
  "PTON",
  "PYPL",
  "QCOM",
  "QQQ",
  "QS",
  "RBLX",
  "RH",
  "RIG",
  "RIVN",
  "SBUX",
  "SCJ",
  "SHAK",
  "SHOP",
  "SIRI",
  "SLB",
  "SMH",
  "SNAP",
  "SNBR",
  "SNOW",
  "SONO",
  "SOUN",
  "SOXL",
  "SOXS",
  "SPCE",
  "SPOT",
  "SPXL",
  "SPXS",
  "SPY",
  "SQQQ",
  "TGT",
  "TLRY",
  "TMUS",
  "TQQQ",
  "TRIP",
  "TSLA",
  "TTD",
  "U",
  "UAL",
  "UBER",
  "UFO",
  "UNH",
  "URBN",
  "V",
  "VFC",
  "VGK",
  "VTI",
  "WEN",
  "WFC",
  "WING",
  "WMT",
  "WOOF",
  "XLE",
  "XLF",
  "XLV",
  "XOM",
  "YETI",
  "ZM"
 ],
 "quotes": {
  "AAL": {
   "name": "American Airlines Group Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 13.08,
   "open": 13.09,
   "prevClose": 12.6,
   "change": 0.48,
   "changePct": 3.81,
   "dayHigh": 13.4,
   "dayLow": 12.96,
   "high52": 18.79,
   "low52": 10.09,
   "volume": 84185003,
   "closes": [
    12.83,
    13,
    12.85,
    12.8,
    12.76,
    12.62,
    12.5,
    11.79,
    12.28,
    11.88,
    11.68,
    12.11,
    12.24,
    12.6,
    12.11,
    12.2,
    12.61,
    12.58,
    12.78,
    12.6,
    13.08
   ]
  },
  "AAPL": {
   "name": "Apple Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 338.32,
   "open": 342.67,
   "prevClose": 344.63,
   "change": -6.31,
   "changePct": -1.83,
   "dayHigh": 343.78,
   "dayLow": 335.84,
   "high52": 351.73,
   "low52": 243.42,
   "volume": 64689155,
   "closes": [
    332.89,
    333.63,
    336.67,
    340.42,
    336.64,
    340.97,
    341.27,
    342.96,
    342,
    343.46,
    342.94,
    339.5,
    343.99,
    348.22,
    347.73,
    343.91,
    347.1,
    343.83,
    348.91,
    344.63,
    338.32
   ]
  },
  "ABBV": {
   "name": "AbbVie Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 288.84,
   "open": 290.38,
   "prevClose": 294.89,
   "change": -6.05,
   "changePct": -2.05,
   "dayHigh": 294.86,
   "dayLow": 286.14,
   "high52": 298.74,
   "low52": 190.75,
   "volume": 8850080,
   "closes": [
    265.76,
    266.69,
    271.36,
    272.42,
    276.47,
    281.12,
    274.36,
    283.48,
    283.4,
    285.42,
    282.68,
    289.08,
    284.8,
    285.19,
    285.64,
    286.74,
    286.39,
    285.99,
    290.79,
    294.89,
    288.84
   ]
  },
  "ABNB": {
   "name": "Airbnb, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 171.11,
   "open": 167.6,
   "prevClose": 164.39,
   "change": 6.72,
   "changePct": 4.09,
   "dayHigh": 173.05,
   "dayLow": 166.51,
   "high52": 193.45,
   "low52": 110.81,
   "volume": 5960555,
   "closes": [
    164.07,
    160.39,
    160.63,
    163.23,
    165.87,
    163.5,
    165.58,
    167.06,
    174.28,
    173.7,
    175.46,
    176.94,
    173.69,
    175.76,
    172.01,
    171.05,
    168.82,
    166.04,
    166.45,
    164.39,
    171.11
   ]
  },
  "ADBE": {
   "name": "Adobe Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 251.47,
   "open": 249.96,
   "prevClose": 250.23,
   "change": 1.24,
   "changePct": 0.5,
   "dayHigh": 255.43,
   "dayLow": 248.62,
   "high52": 362.71,
   "low52": 190.12,
   "volume": 3882346,
   "closes": [
    238.79,
    238.12,
    232.77,
    241.05,
    242.27,
    238.14,
    236.28,
    240.68,
    251.67,
    245.2,
    247.09,
    256.73,
    255.06,
    270.55,
    263.82,
    258.62,
    248.36,
    249.76,
    248.12,
    250.23,
    251.47
   ]
  },
  "AEO": {
   "name": "American Eagle Outfitters, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 19.75,
   "open": 19.62,
   "prevClose": 19.61,
   "change": 0.14,
   "changePct": 0.71,
   "dayHigh": 20.27,
   "dayLow": 19.62,
   "high52": 28.46,
   "low52": 14.1,
   "volume": 5660365,
   "closes": [
    18.11,
    17.89,
    17.66,
    17.97,
    18.17,
    18.07,
    17.78,
    17.6,
    18.05,
    17.98,
    17.93,
    17.81,
    17.38,
    17.89,
    17.91,
    18.81,
    19.42,
    19.46,
    20.12,
    19.61,
    19.75
   ]
  },
  "AMC": {
   "name": "AMC Entertainment Holdings, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 3.19,
   "open": 3.1,
   "prevClose": 3.06,
   "change": 0.13,
   "changePct": 4.25,
   "dayHigh": 3.26,
   "dayLow": 3.04,
   "high52": 3.4,
   "low52": 0.93,
   "volume": 29144200,
   "closes": [
    2.79,
    2.95,
    2.88,
    2.88,
    2.98,
    3,
    3.06,
    2.89,
    3.02,
    2.91,
    2.98,
    3.08,
    3.04,
    2.93,
    2.9,
    2.89,
    2.99,
    2.99,
    3.08,
    3.06,
    3.19
   ]
  },
  "AMD": {
   "name": "Advanced Micro Devices, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 466.84,
   "open": 510.71,
   "prevClose": 504.8,
   "change": -37.96,
   "changePct": -7.52,
   "dayHigh": 512.82,
   "dayLow": 466.07,
   "high52": 658.52,
   "low52": 188.22,
   "volume": 32129533,
   "closes": [
    631.75,
    649.42,
    645.86,
    620.68,
    608.1,
    594.24,
    605.53,
    570.82,
    562.23,
    528.75,
    538.05,
    534.74,
    552.72,
    507.93,
    516.79,
    531.28,
    560.26,
    578.44,
    566.42,
    504.8,
    466.84
   ]
  },
  "AMZN": {
   "name": "Amazon.com, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 245.63,
   "open": 243.01,
   "prevClose": 240.35,
   "change": 5.28,
   "changePct": 2.2,
   "dayHigh": 253.81,
   "dayLow": 242.28,
   "high52": 287.2,
   "low52": 196,
   "volume": 58327853,
   "closes": [
    251.4,
    256.29,
    259.92,
    254.06,
    262.43,
    259.53,
    258.58,
    254.08,
    254.76,
    250,
    262.45,
    262.63,
    262.37,
    250.38,
    248,
    249.09,
    253.1,
    254.6,
    243.79,
    240.35,
    245.63
   ]
  },
  "ANF": {
   "name": "Abercrombie & Fitch Co.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 164.17,
   "open": 165.28,
   "prevClose": 164.44,
   "change": -0.27,
   "changePct": -0.16,
   "dayHigh": 169.24,
   "dayLow": 163.88,
   "high52": 169.24,
   "low52": 65.45,
   "volume": 1134181,
   "closes": [
    141.4,
    141.39,
    139.44,
    141.41,
    142.58,
    145.91,
    150.88,
    149.74,
    151.99,
    153.26,
    162.01,
    161.73,
    159.64,
    161.49,
    155.82,
    164.73,
    165.38,
    161.24,
    165.77,
    164.44,
    164.17
   ]
  },
  "AVGO": {
   "name": "Broadcom Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 322.23,
   "open": 328.37,
   "prevClose": 326.08,
   "change": -3.85,
   "changePct": -1.18,
   "dayHigh": 333.56,
   "dayLow": 321.87,
   "high52": 495,
   "low52": 289.96,
   "volume": 20318871,
   "closes": [
    362.51,
    375.81,
    376.51,
    360.14,
    361.54,
    354.73,
    357.31,
    346.25,
    344.33,
    328.75,
    334.59,
    334.37,
    337.8,
    323.24,
    321.68,
    329.17,
    342.33,
    351.81,
    345,
    326.08,
    322.23
   ]
  },
  "BA": {
   "name": "The Boeing Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 175.4,
   "open": 173.21,
   "prevClose": 171.55,
   "change": 3.85,
   "changePct": 2.24,
   "dayHigh": 177.37,
   "dayLow": 172.8,
   "high52": 254.35,
   "low52": 165.01,
   "volume": 9439858,
   "closes": [
    192.72,
    189.82,
    188.32,
    187.75,
    190.37,
    189.5,
    186.49,
    184.66,
    188.73,
    190.21,
    191.42,
    190.47,
    192.28,
    187.55,
    188.35,
    188.31,
    168.18,
    167.14,
    172.65,
    171.55,
    175.4
   ]
  },
  "BAC": {
   "name": "Bank of America Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 49.57,
   "open": 50.45,
   "prevClose": 50.01,
   "change": -0.44,
   "changePct": -0.88,
   "dayHigh": 50.47,
   "dayLow": 49.45,
   "high52": 65.23,
   "low52": 46.12,
   "volume": 48512490,
   "closes": [
    54,
    54.09,
    53.52,
    53.61,
    54.32,
    54.58,
    53.96,
    51.39,
    51.7,
    51.23,
    50.39,
    50.64,
    50.78,
    51.08,
    50.56,
    50.52,
    50.68,
    50.85,
    51.14,
    50.01,
    49.57
   ]
  },
  "BB": {
   "name": "BlackBerry Limited",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 8.02,
   "open": 8.45,
   "prevClose": 8.42,
   "change": -0.4,
   "changePct": -4.75,
   "dayHigh": 8.45,
   "dayLow": 8.01,
   "high52": 13.59,
   "low52": 3.12,
   "volume": 12253892,
   "closes": [
    9.08,
    9.58,
    8.77,
    8.63,
    8.91,
    8.45,
    8.47,
    8.23,
    8.7,
    8.06,
    8.16,
    8.87,
    9.41,
    8.59,
    8.92,
    9.19,
    9.55,
    9.4,
    9.19,
    8.42,
    8.02
   ]
  },
  "BBWI": {
   "name": "Bath & Body Works, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 23.19,
   "open": 23.3,
   "prevClose": 22.77,
   "change": 0.42,
   "changePct": 1.84,
   "dayHigh": 23.66,
   "dayLow": 22.94,
   "high52": 25.21,
   "low52": 14.28,
   "volume": 7247716,
   "closes": [
    17.46,
    17.93,
    17.81,
    17.71,
    17.34,
    17.41,
    18,
    18.95,
    20.44,
    20.14,
    19.84,
    20.55,
    20.42,
    21.6,
    20.95,
    21.38,
    21.95,
    21.64,
    22.78,
    22.77,
    23.19
   ]
  },
  "BIRK": {
   "name": "Birkenstock Holding plc",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 35.54,
   "open": 33.81,
   "prevClose": 33.43,
   "change": 2.11,
   "changePct": 6.31,
   "dayHigh": 35.77,
   "dayLow": 33.71,
   "high52": 50.73,
   "low52": 29.93,
   "volume": 2590203,
   "closes": [
    33.77,
    34,
    33.17,
    33.12,
    33.65,
    33.85,
    34.18,
    33.92,
    35.89,
    33.85,
    32.71,
    32.78,
    32.32,
    33.68,
    32.57,
    32.61,
    32.26,
    31.59,
    33.39,
    33.43,
    35.54
   ]
  },
  "BLNK": {
   "name": "Blink Charging Co.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 0.43,
   "open": 0.41,
   "prevClose": 0.4,
   "change": 0.03,
   "changePct": 7.5,
   "dayHigh": 0.44,
   "dayLow": 0.4,
   "high52": 1.7,
   "low52": 0.38,
   "volume": 2278953,
   "closes": [
    0.55,
    0.51,
    0.51,
    0.48,
    0.47,
    0.48,
    0.48,
    0.45,
    0.44,
    0.42,
    0.42,
    0.42,
    0.42,
    0.4,
    0.38,
    0.38,
    0.38,
    0.41,
    0.41,
    0.4,
    0.43
   ]
  },
  "BOOT": {
   "name": "Boot Barn Holdings, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 137.32,
   "open": 134,
   "prevClose": 132.24,
   "change": 5.08,
   "changePct": 3.84,
   "dayHigh": 139.48,
   "dayLow": 133.23,
   "high52": 210.25,
   "low52": 110.53,
   "volume": 1310033,
   "closes": [
    122.88,
    124.32,
    122.34,
    121.6,
    119.96,
    119.97,
    117.57,
    112.86,
    120.62,
    121.72,
    119.36,
    115.35,
    116.09,
    119.76,
    115.18,
    114.18,
    111.69,
    113.3,
    130.48,
    132.24,
    137.32
   ]
  },
  "BOTZ": {
   "name": "Global X Robotics & Artificial Intelligence ETF",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 32.27,
   "open": 32.58,
   "prevClose": 32.22,
   "change": 0.05,
   "changePct": 0.16,
   "dayHigh": 32.91,
   "dayLow": 32.2,
   "high52": 41.71,
   "low52": 31.88,
   "volume": 766492,
   "closes": [
    36.2,
    36.17,
    35.67,
    34.83,
    35.48,
    34.9,
    34.96,
    34.11,
    33.74,
    33.02,
    33.35,
    33.59,
    33.59,
    32.68,
    33.02,
    33.14,
    33.48,
    34.03,
    33.42,
    32.22,
    32.27
   ]
  },
  "BROS": {
   "name": "Dutch Bros Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 43.87,
   "open": 42.6,
   "prevClose": 42.87,
   "change": 1,
   "changePct": 2.33,
   "dayHigh": 45.1,
   "dayLow": 42.6,
   "high52": 74.02,
   "low52": 36.51,
   "volume": 5833257,
   "closes": [
    38.23,
    39.06,
    38.18,
    39.78,
    38.05,
    37.28,
    37.98,
    39.17,
    41.1,
    41.16,
    42.86,
    43.82,
    42.26,
    41.75,
    41.49,
    42.02,
    41.64,
    42.93,
    43.98,
    42.87,
    43.87
   ]
  },
  "BYND": {
   "name": "Beyond Meat, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 7.05,
   "open": 7.01,
   "prevClose": 6.91,
   "change": 0.14,
   "changePct": 2.03,
   "dayHigh": 7.7,
   "dayLow": 7.01,
   "high52": 46.8,
   "low52": 6.49,
   "volume": 883178,
   "closes": [
    8.06,
    7.99,
    7.66,
    7.73,
    7.7,
    7.31,
    7.21,
    6.78,
    7.17,
    6.85,
    6.57,
    6.81,
    6.82,
    7.27,
    7.15,
    6.86,
    7,
    7.13,
    7.38,
    6.91,
    7.05
   ]
  },
  "CAKE": {
   "name": "The Cheesecake Factory Incorporated",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 112.96,
   "open": 113.69,
   "prevClose": 112.64,
   "change": 0.32,
   "changePct": 0.28,
   "dayHigh": 117.96,
   "dayLow": 112.87,
   "high52": 118.63,
   "low52": 43.07,
   "volume": 1478759,
   "closes": [
    109.03,
    108.23,
    106.99,
    106.91,
    108.45,
    109,
    112.37,
    112.85,
    116.59,
    114.92,
    116.18,
    116.43,
    114.39,
    112.44,
    108.37,
    110.13,
    108.47,
    105.73,
    113.12,
    112.64,
    112.96
   ]
  },
  "CAR": {
   "name": "Avis Budget Group, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 111.52,
   "open": 109.61,
   "prevClose": 107.99,
   "change": 3.53,
   "changePct": 3.27,
   "dayHigh": 114.36,
   "dayLow": 108.23,
   "high52": 847.7,
   "low52": 85.96,
   "volume": 713639,
   "closes": [
    107.98,
    112.65,
    110.22,
    110,
    105.98,
    105.1,
    107.6,
    106.72,
    109.77,
    102.83,
    102.38,
    102.45,
    98.39,
    101.55,
    101.34,
    101.86,
    102.21,
    101.74,
    108.16,
    107.99,
    111.52
   ]
  },
  "CAVA": {
   "name": "CAVA Group, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 62.05,
   "open": 59.53,
   "prevClose": 58.74,
   "change": 3.31,
   "changePct": 5.64,
   "dayHigh": 62.95,
   "dayLow": 59,
   "high52": 98.79,
   "low52": 43.41,
   "volume": 3904409,
   "closes": [
    54.1,
    52.64,
    52.07,
    54.31,
    53.64,
    52.56,
    52.98,
    51.59,
    55.4,
    57.25,
    57.9,
    57.45,
    55,
    54.68,
    53.48,
    51.53,
    51.86,
    54.25,
    59.21,
    58.74,
    62.05
   ]
  },
  "CHPT": {
   "name": "ChargePoint Holdings, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 9.88,
   "open": 9.77,
   "prevClose": 9.54,
   "change": 0.34,
   "changePct": 3.56,
   "dayHigh": 10.73,
   "dayLow": 9.73,
   "high52": 11.26,
   "low52": 4.44,
   "volume": 1377462,
   "closes": [
    8.93,
    8.67,
    8.22,
    8.13,
    7.92,
    7.22,
    7.22,
    6.65,
    7.23,
    6.91,
    7.15,
    7.83,
    8.39,
    8.21,
    8.35,
    8.24,
    8.73,
    9.22,
    9.27,
    9.54,
    9.88
   ]
  },
  "CHWY": {
   "name": "Chewy, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 22.27,
   "open": 21.4,
   "prevClose": 21.29,
   "change": 0.98,
   "changePct": 4.6,
   "dayHigh": 22.57,
   "dayLow": 21.15,
   "high52": 37.34,
   "low52": 17.4,
   "volume": 6610503,
   "closes": [
    18.22,
    18.14,
    18.22,
    18.91,
    18.95,
    19.5,
    19.71,
    20.83,
    21.31,
    20.97,
    20.53,
    21.53,
    21.33,
    22.33,
    21.93,
    21.9,
    21.52,
    20.64,
    20.83,
    21.29,
    22.27
   ]
  },
  "CLOV": {
   "name": "Clover Health Investments, Corp.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 4.31,
   "open": 4.53,
   "prevClose": 4.46,
   "change": -0.15,
   "changePct": -3.36,
   "dayHigh": 4.53,
   "dayLow": 4.27,
   "high52": 5.59,
   "low52": 1.58,
   "volume": 5005122,
   "closes": [
    4.68,
    4.6,
    4.56,
    4.58,
    4.79,
    4.78,
    4.81,
    4.79,
    4.68,
    4.48,
    4.44,
    4.8,
    4.78,
    4.73,
    4.6,
    4.56,
    4.63,
    4.79,
    4.58,
    4.46,
    4.31
   ]
  },
  "CMG": {
   "name": "Chipotle Mexican Grill, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 32.91,
   "open": 31.9,
   "prevClose": 31.89,
   "change": 1.02,
   "changePct": 3.2,
   "dayHigh": 33.35,
   "dayLow": 31.9,
   "high52": 41.42,
   "low52": 27.31,
   "volume": 19854563,
   "closes": [
    30.85,
    30.9,
    30.77,
    32.68,
    31.59,
    30.4,
    30.35,
    30.52,
    30.58,
    29.89,
    29.85,
    29.65,
    28.12,
    28.14,
    27.52,
    28.41,
    27.98,
    28.73,
    31.28,
    31.89,
    32.91
   ]
  },
  "COIN": {
   "name": "Coinbase Global, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 137.83,
   "open": 140.36,
   "prevClose": 143.54,
   "change": -5.71,
   "changePct": -3.98,
   "dayHigh": 143.77,
   "dayLow": 135.47,
   "high52": 342.8,
   "low52": 135.47,
   "volume": 10634242,
   "closes": [
    188.22,
    185.74,
    178.45,
    172,
    179.39,
    180.39,
    181.79,
    172.89,
    183.81,
    173.16,
    168.45,
    170.85,
    177.08,
    169.09,
    164.45,
    159.6,
    161.09,
    162.32,
    160.59,
    143.54,
    137.83
   ]
  },
  "COLM": {
   "name": "Columbia Sportswear Company",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 71.12,
   "open": 67.49,
   "prevClose": 67.54,
   "change": 3.58,
   "changePct": 5.3,
   "dayHigh": 71.17,
   "dayLow": 66.97,
   "high52": 71.17,
   "low52": 48.16,
   "volume": 1358777,
   "closes": [
    56.93,
    57.45,
    56.53,
    56.76,
    57.04,
    56.34,
    57.06,
    57.7,
    60.82,
    60.16,
    59.98,
    61.1,
    59.51,
    62.07,
    61.35,
    60.82,
    61.17,
    60.9,
    63.69,
    67.54,
    71.12
   ]
  },
  "COST": {
   "name": "Costco Wholesale Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 1040.55,
   "open": 1015.87,
   "prevClose": 1012.28,
   "change": 28.27,
   "changePct": 2.79,
   "dayHigh": 1042.57,
   "dayLow": 1014.34,
   "high52": 1096.5,
   "low52": 844.06,
   "volume": 3114312,
   "closes": [
    923.52,
    935.68,
    942.25,
    947.92,
    946.92,
    959.44,
    954.63,
    982,
    978.01,
    989.11,
    995.53,
    994.61,
    998.31,
    1018.21,
    1003.32,
    1005.16,
    992.13,
    982.73,
    996.08,
    1012.28,
    1040.55
   ]
  },
  "CPRI": {
   "name": "Capri Holdings Limited",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 20.05,
   "open": 18.94,
   "prevClose": 18.68,
   "change": 1.37,
   "changePct": 7.33,
   "dayHigh": 20.57,
   "dayLow": 19.19,
   "high52": 28.27,
   "low52": 12.4,
   "volume": 7449406,
   "closes": [
    14.49,
    14.67,
    14.44,
    14.68,
    14.95,
    15.09,
    15.16,
    15.02,
    15.85,
    15.95,
    16.15,
    16.51,
    15.7,
    16.36,
    15.87,
    15.57,
    15.42,
    15.29,
    16.06,
    18.68,
    20.05
   ]
  },
  "CQQQ": {
   "name": "Invesco China Technology ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 38.5,
   "open": 38.57,
   "prevClose": 37.78,
   "change": 0.72,
   "changePct": 1.91,
   "dayHigh": 39.06,
   "dayLow": 38.5,
   "high52": 58.92,
   "low52": 37.58,
   "volume": 1193652,
   "closes": [
    45.05,
    45.03,
    44.44,
    43.07,
    43.88,
    42.98,
    43.09,
    42,
    41.98,
    41.09,
    40.99,
    41.53,
    41.11,
    39.93,
    40.26,
    40.03,
    39.49,
    39.79,
    38.74,
    37.78,
    38.5
   ]
  },
  "CRM": {
   "name": "Salesforce, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 226.18,
   "open": 229.75,
   "prevClose": 229.17,
   "change": -2.99,
   "changePct": -1.3,
   "dayHigh": 232.95,
   "dayLow": 225.15,
   "high52": 269.11,
   "low52": 146.32,
   "volume": 6621619,
   "closes": [
    229.79,
    224.99,
    224.56,
    227.8,
    229.13,
    233.92,
    238.01,
    235.95,
    246.74,
    240.7,
    242.45,
    242.43,
    241.78,
    250.29,
    248.57,
    247.61,
    240.89,
    242.11,
    230.9,
    229.17,
    226.18
   ]
  },
  "CROX": {
   "name": "Crocs, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 153.13,
   "open": 151.63,
   "prevClose": 150.52,
   "change": 2.61,
   "changePct": 1.73,
   "dayHigh": 156.71,
   "dayLow": 150.26,
   "high52": 156.71,
   "low52": 73.21,
   "volume": 1497442,
   "closes": [
    118.19,
    120.22,
    115.2,
    116.84,
    114.98,
    116.9,
    117.53,
    117.54,
    124.77,
    123.14,
    120.18,
    121.37,
    118.49,
    120.99,
    119.23,
    118.85,
    119.5,
    119.69,
    150.26,
    150.52,
    153.13
   ]
  },
  "CRWD": {
   "name": "CrowdStrike Holdings, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 241.81,
   "open": 253,
   "prevClose": 250.43,
   "change": -8.62,
   "changePct": -3.44,
   "dayHigh": 253.61,
   "dayLow": 240.17,
   "high52": 286.99,
   "low52": 85.68,
   "volume": 9274782,
   "closes": [
    272.67,
    278.86,
    265.44,
    263.01,
    275.04,
    263.01,
    261.21,
    249.29,
    244.57,
    227.39,
    228.1,
    227.37,
    239.34,
    237.94,
    257.57,
    261.83,
    268.02,
    266.66,
    261.15,
    250.43,
    241.81
   ]
  },
  "CSCO": {
   "name": "Cisco Systems, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 101.61,
   "open": 105.42,
   "prevClose": 104.51,
   "change": -2.9,
   "changePct": -2.77,
   "dayHigh": 105.42,
   "dayLow": 101.41,
   "high52": 130.37,
   "low52": 70.54,
   "volume": 26009032,
   "closes": [
    112.82,
    117.94,
    117.39,
    114.89,
    118.39,
    115.34,
    115.07,
    113.64,
    109.85,
    107.39,
    106.5,
    106.71,
    107.26,
    104.89,
    106.5,
    110.24,
    111.38,
    110.29,
    108.59,
    104.51,
    101.61
   ]
  },
  "CVX": {
   "name": "Chevron Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 227.77,
   "open": 232.5,
   "prevClose": 235.52,
   "change": -7.75,
   "changePct": -3.29,
   "dayHigh": 233.25,
   "dayLow": 227.42,
   "high52": 236.48,
   "low52": 146.49,
   "volume": 9170787,
   "closes": [
    206.47,
    207.58,
    205.15,
    211.55,
    211.98,
    215,
    217.73,
    222.04,
    219.32,
    224.99,
    224.37,
    225.71,
    226.78,
    226.68,
    233.21,
    232.01,
    228.23,
    229.2,
    231.46,
    235.52,
    227.77
   ]
  },
  "CZR": {
   "name": "Caesars Entertainment, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 28.99,
   "open": 29.05,
   "prevClose": 29.09,
   "change": -0.1,
   "changePct": -0.34,
   "dayHigh": 29.11,
   "dayLow": 28.96,
   "high52": 30.88,
   "low52": 17.86,
   "volume": 7102887,
   "closes": [
    29.65,
    29.65,
    29.49,
    29.52,
    29.5,
    29.58,
    29.47,
    29.3,
    29.25,
    28.8,
    29.04,
    29.09,
    28.9,
    29.07,
    28.8,
    28.99,
    28.85,
    28.57,
    29.13,
    29.09,
    28.99
   ]
  },
  "DAL": {
   "name": "Delta Air Lines, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 83.42,
   "open": 83.04,
   "prevClose": 80.15,
   "change": 3.27,
   "changePct": 4.08,
   "dayHigh": 84.07,
   "dayLow": 82.24,
   "high52": 95.68,
   "low52": 55.03,
   "volume": 7588384,
   "closes": [
    83.08,
    83.66,
    82.97,
    82.14,
    82.17,
    80.11,
    79.57,
    76.65,
    78.08,
    75.37,
    74.63,
    76.66,
    77.67,
    79.26,
    76.78,
    79.16,
    81.45,
    80.35,
    81.64,
    80.15,
    83.42
   ]
  },
  "DASH": {
   "name": "DoorDash, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 190.07,
   "open": 181.17,
   "prevClose": 178.99,
   "change": 11.08,
   "changePct": 6.19,
   "dayHigh": 191.02,
   "dayLow": 177,
   "high52": 258,
   "low52": 143.3,
   "volume": 6211986,
   "closes": [
    191.77,
    193.62,
    191.24,
    191.71,
    196.5,
    194.24,
    193.09,
    184.01,
    193.05,
    189.15,
    193.53,
    191.67,
    184.45,
    185.94,
    179.38,
    168.44,
    170.56,
    169.49,
    179,
    178.99,
    190.07
   ]
  },
  "DDOG": {
   "name": "Datadog, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 216.1,
   "open": 235.51,
   "prevClose": 235.27,
   "change": -19.17,
   "changePct": -8.15,
   "dayHigh": 236.39,
   "dayLow": 215.73,
   "high52": 300.68,
   "low52": 98.01,
   "volume": 4651321,
   "closes": [
    276.42,
    278.24,
    271.34,
    273.8,
    293.26,
    287.29,
    283.34,
    269.33,
    266.25,
    247.11,
    260.36,
    256.43,
    273.09,
    257.75,
    269.65,
    280.24,
    280.82,
    278.41,
    265.84,
    235.27,
    216.1
   ]
  },
  "DELL": {
   "name": "Dell Technologies Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 392.78,
   "open": 423,
   "prevClose": 424.3,
   "change": -31.52,
   "changePct": -7.43,
   "dayHigh": 424.13,
   "dayLow": 391.29,
   "high52": 595.51,
   "low52": 110.22,
   "volume": 6608456,
   "closes": [
    552.29,
    574,
    578.96,
    574.55,
    586.06,
    576.76,
    572.47,
    507.93,
    473.39,
    451.71,
    455.44,
    461.56,
    485.88,
    452.95,
    456.44,
    467.09,
    501.96,
    493.79,
    475.51,
    424.3,
    392.78
   ]
  },
  "DIS": {
   "name": "The Walt Disney Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 113.11,
   "open": 111.78,
   "prevClose": 110.94,
   "change": 2.17,
   "changePct": 1.96,
   "dayHigh": 113.79,
   "dayLow": 111.81,
   "high52": 117.09,
   "low52": 92.19,
   "volume": 7437480,
   "closes": [
    103.61,
    104.03,
    104.75,
    107.02,
    108.05,
    108.49,
    108.58,
    108.99,
    110.68,
    110.59,
    109.59,
    111.67,
    111.83,
    113.13,
    112.52,
    110.4,
    110.23,
    109.04,
    110.91,
    110.94,
    113.11
   ]
  },
  "DXJ": {
   "name": "WisdomTree Japan Hedged Equity Fund",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 58.89,
   "open": 58.76,
   "prevClose": 58.39,
   "change": 0.5,
   "changePct": 0.86,
   "dayHigh": 59.38,
   "dayLow": 58.73,
   "high52": 61.55,
   "low52": 44.75,
   "volume": 510806,
   "closes": [
    61.16,
    61.29,
    60.67,
    60.22,
    60.71,
    60.67,
    60.6,
    60.09,
    59.83,
    59.8,
    59.86,
    60.01,
    60,
    59.02,
    58.64,
    59.17,
    59.89,
    59.46,
    59.59,
    58.39,
    58.89
   ]
  },
  "EB": {
   "name": null,
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": null,
   "open": null,
   "prevClose": null,
   "change": null,
   "changePct": null,
   "dayHigh": null,
   "dayLow": null,
   "high52": null,
   "low52": null,
   "volume": null,
   "closes": []
  },
  "EBAY": {
   "name": "eBay Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 120.93,
   "open": 121.63,
   "prevClose": 121.64,
   "change": -0.71,
   "changePct": -0.58,
   "dayHigh": 123.92,
   "dayLow": 120.31,
   "high52": 124.59,
   "low52": 78.03,
   "volume": 4027217,
   "closes": [
    107.14,
    107.06,
    107.6,
    111.98,
    112.19,
    114.65,
    116.41,
    116.88,
    122.91,
    120.28,
    120.47,
    121.19,
    122.9,
    122.04,
    121.41,
    118.62,
    117.83,
    118.02,
    121.19,
    121.64,
    120.93
   ]
  },
  "ELF": {
   "name": "e.l.f. Beauty, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 110.68,
   "open": 114.37,
   "prevClose": 111.69,
   "change": -1.01,
   "changePct": -0.9,
   "dayHigh": 115,
   "dayLow": 109.77,
   "high52": 123.07,
   "low52": 48.82,
   "volume": 1265602,
   "closes": [
    103.75,
    102.79,
    105.03,
    105.96,
    109.23,
    109.94,
    108.16,
    108.13,
    116.11,
    113.54,
    113.48,
    114.74,
    113.78,
    114.99,
    114.24,
    112.94,
    113.17,
    115.41,
    112.95,
    111.69,
    110.68
   ]
  },
  "EPI": {
   "name": "WisdomTree India Earnings Fund",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 41.69,
   "open": 41.52,
   "prevClose": 40.97,
   "change": 0.72,
   "changePct": 1.76,
   "dayHigh": 41.83,
   "dayLow": 41.53,
   "high52": 46.83,
   "low52": 39.36,
   "volume": 888517,
   "closes": [
    40.51,
    40.57,
    40.09,
    39.56,
    39.89,
    40.16,
    40.83,
    40.8,
    41.46,
    41.31,
    41.1,
    41.46,
    40.99,
    41.03,
    40.14,
    40.31,
    40.32,
    40.33,
    40.78,
    40.97,
    41.69
   ]
  },
  "ETSY": {
   "name": "Etsy, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 92.45,
   "open": 90.53,
   "prevClose": 88.96,
   "change": 3.49,
   "changePct": 3.92,
   "dayHigh": 95.49,
   "dayLow": 90.02,
   "high52": 95.49,
   "low52": 44,
   "volume": 5003048,
   "closes": [
    70.89,
    71.39,
    71.49,
    75.14,
    76.71,
    76.93,
    79.28,
    82.93,
    89.18,
    85.14,
    85.26,
    87.41,
    87.23,
    90.82,
    86.93,
    85.43,
    87.66,
    92.35,
    91.59,
    88.96,
    92.45
   ]
  },
  "EWJ": {
   "name": "iShares MSCI Japan ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 92.84,
   "open": 92.91,
   "prevClose": 92.91,
   "change": -0.07,
   "changePct": -0.08,
   "dayHigh": 93.88,
   "dayLow": 92.75,
   "high52": 99.98,
   "low52": 79.48,
   "volume": 3908370,
   "closes": [
    99.3,
    99.32,
    98.32,
    97.32,
    97.86,
    97.32,
    97.32,
    95.84,
    95.43,
    94.88,
    94.99,
    95.43,
    95.72,
    94.6,
    94.1,
    94.28,
    95.25,
    94.99,
    94.94,
    92.91,
    92.84
   ]
  },
  "EWY": {
   "name": "iShares MSCI South Korea ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 151.62,
   "open": 158.37,
   "prevClose": 152.89,
   "change": -1.27,
   "changePct": -0.83,
   "dayHigh": 158.91,
   "dayLow": 151.48,
   "high52": 220.89,
   "low52": 86.9,
   "volume": 15065157,
   "closes": [
    191.46,
    186.4,
    183.69,
    176.29,
    177.24,
    170.11,
    166.56,
    159.83,
    156.22,
    150.44,
    156.58,
    153.99,
    156.88,
    149.06,
    151.26,
    152.72,
    157.46,
    165.91,
    161.83,
    152.89,
    151.62
   ]
  },
  "EZU": {
   "name": "iShares MSCI Eurozone ETF",
   "exchange": "Cboe US",
   "type": "ETF",
   "price": 65.71,
   "open": 65.45,
   "prevClose": 65.16,
   "change": 0.55,
   "changePct": 0.84,
   "dayHigh": 66.26,
   "dayLow": 65.45,
   "high52": 72.2,
   "low52": 59.92,
   "volume": 1588642,
   "closes": [
    66.79,
    67,
    65.9,
    65.63,
    65.88,
    65.61,
    65.88,
    65.33,
    66.02,
    65.82,
    65.13,
    65.62,
    66.08,
    65.04,
    64.63,
    64.93,
    65.59,
    65.72,
    66.23,
    65.16,
    65.71
   ]
  },
  "F": {
   "name": "Ford Motor Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 12.6,
   "open": 12.4,
   "prevClose": 12.25,
   "change": 0.35,
   "changePct": 2.86,
   "dayHigh": 12.65,
   "dayLow": 12.38,
   "high52": 17.78,
   "low52": 11.11,
   "volume": 53362018,
   "closes": [
    12.15,
    12.28,
    12.12,
    12.25,
    12.17,
    12,
    12.1,
    12.05,
    12.31,
    12.43,
    12.18,
    12.15,
    11.9,
    11.94,
    11.6,
    11.58,
    11.71,
    11.95,
    12.36,
    12.25,
    12.6
   ]
  },
  "FEZ": {
   "name": "State Street SPDR EURO STOXX 50 ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 65.39,
   "open": 65.54,
   "prevClose": 65.03,
   "change": 0.36,
   "changePct": 0.55,
   "dayHigh": 65.94,
   "dayLow": 65.34,
   "high52": 72.36,
   "low52": 59.57,
   "volume": 1431505,
   "closes": [
    66.74,
    66.79,
    65.8,
    65.57,
    65.92,
    65.59,
    65.77,
    65.37,
    66.05,
    65.85,
    65.11,
    65.61,
    66.12,
    65.06,
    64.56,
    64.76,
    65.37,
    65.5,
    66.05,
    65.03,
    65.39
   ]
  },
  "FIVE": {
   "name": "Five Below, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 238.97,
   "open": 241.42,
   "prevClose": 240.96,
   "change": -1.99,
   "changePct": -0.83,
   "dayHigh": 245.61,
   "dayLow": 238.77,
   "high52": 263.88,
   "low52": 143.02,
   "volume": 892351,
   "closes": [
    215.93,
    209.92,
    204.24,
    209.73,
    214.73,
    213.58,
    213.35,
    218.95,
    223.23,
    222.72,
    225.61,
    223.8,
    224.1,
    225.87,
    223.24,
    230,
    231.25,
    234.47,
    245.5,
    240.96,
    238.97
   ]
  },
  "FLKR": {
   "name": "Franklin FTSE South Korea ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 49.99,
   "open": 52.15,
   "prevClose": 50.42,
   "change": -0.43,
   "changePct": -0.85,
   "dayHigh": 52.27,
   "dayLow": 49.99,
   "high52": 72.49,
   "low52": 29.06,
   "volume": 644083,
   "closes": [
    62.68,
    61.26,
    60.37,
    57.99,
    58.36,
    56.03,
    54.89,
    52.81,
    51.61,
    49.94,
    51.94,
    51.16,
    51.77,
    49.45,
    50.15,
    50.45,
    51.86,
    54.59,
    53.18,
    50.42,
    49.99
   ]
  },
  "FUBO": {
   "name": "FuboTV Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 7.61,
   "open": 7.67,
   "prevClose": 7.62,
   "change": -0.01,
   "changePct": -0.13,
   "dayHigh": 7.92,
   "dayLow": 7.55,
   "high52": 50.4,
   "low52": 7.48,
   "volume": 766984,
   "closes": [
    8.62,
    8.83,
    9.25,
    9.35,
    8.84,
    8.74,
    8.19,
    8.26,
    8.42,
    8,
    8.05,
    8.22,
    8.12,
    8.16,
    7.93,
    7.79,
    7.8,
    7.98,
    7.96,
    7.62,
    7.61
   ]
  },
  "FXI": {
   "name": "iShares China Large-Cap ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 33.21,
   "open": 33.1,
   "prevClose": 33.08,
   "change": 0.13,
   "changePct": 0.39,
   "dayHigh": 33.42,
   "dayLow": 33.09,
   "high52": 41.22,
   "low52": 31.19,
   "volume": 20630515,
   "closes": [
    33.85,
    33.77,
    33.42,
    33.45,
    34.24,
    34.14,
    34.17,
    33.86,
    34.26,
    33.84,
    33.53,
    33.51,
    32.94,
    32.45,
    32.31,
    32.51,
    32.5,
    32.46,
    32.69,
    33.08,
    33.21
   ]
  },
  "GAP": {
   "name": "The Gap, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 22.22,
   "open": 22.5,
   "prevClose": 22.32,
   "change": -0.1,
   "changePct": -0.45,
   "dayHigh": 22.74,
   "dayLow": 22.05,
   "high52": 29.36,
   "low52": 18.11,
   "volume": 6257925,
   "closes": [
    23.3,
    23.79,
    23.61,
    23.36,
    23.23,
    22.78,
    22.83,
    22.67,
    23.46,
    23.12,
    23.54,
    23.47,
    22.69,
    22.91,
    22.32,
    22.26,
    21.7,
    22,
    22.89,
    22.32,
    22.22
   ]
  },
  "GE": {
   "name": "GE Aerospace",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 315.78,
   "open": 309.2,
   "prevClose": 301.8,
   "change": 13.98,
   "changePct": 4.63,
   "dayHigh": 316.79,
   "dayLow": 308.17,
   "high52": 388.84,
   "low52": 268.91,
   "volume": 4829940,
   "closes": [
    306.34,
    309.39,
    303.62,
    305.62,
    308.2,
    308.64,
    307.63,
    307.02,
    312,
    313.83,
    311.28,
    299.87,
    295.88,
    293.54,
    285.64,
    288.43,
    297.66,
    301.13,
    313.05,
    301.8,
    315.78
   ]
  },
  "GM": {
   "name": "General Motors Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 89.94,
   "open": 88.5,
   "prevClose": 87.4,
   "change": 2.54,
   "changePct": 2.91,
   "dayHigh": 90.03,
   "dayLow": 87.92,
   "high52": 91.85,
   "low52": 66.75,
   "volume": 8429526,
   "closes": [
    80.23,
    82.01,
    80.99,
    82.25,
    82.73,
    82.37,
    84,
    83.05,
    83.66,
    83.96,
    82.75,
    77.09,
    76.11,
    77.21,
    75.92,
    76.31,
    80.54,
    82.48,
    85.72,
    87.4,
    89.94
   ]
  },
  "GOOG": {
   "name": "Alphabet Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 278.04,
   "open": 280.58,
   "prevClose": 278.22,
   "change": -0.18,
   "changePct": -0.06,
   "dayHigh": 285.21,
   "dayLow": 277.78,
   "high52": 404.47,
   "low52": 271.41,
   "volume": 29219125,
   "closes": [
    343.83,
    344.59,
    347.37,
    344.86,
    347.86,
    348.97,
    349.52,
    343.65,
    344.91,
    336.91,
    340.16,
    336.4,
    330.95,
    320.76,
    317.28,
    314.19,
    316.83,
    321.89,
    282.32,
    278.22,
    278.04
   ]
  },
  "GOOGL": {
   "name": "Alphabet Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 278.99,
   "open": 282.46,
   "prevClose": 279.84,
   "change": -0.85,
   "changePct": -0.3,
   "dayHigh": 287,
   "dayLow": 278.87,
   "high52": 408.61,
   "low52": 270.7,
   "volume": 48504345,
   "closes": [
    346.47,
    347.68,
    350.5,
    348.29,
    351.66,
    352.72,
    353.78,
    347.64,
    349.22,
    340.59,
    344.18,
    340.28,
    334.76,
    324.22,
    320.21,
    316.8,
    320.58,
    324.89,
    283.82,
    279.84,
    278.99
   ]
  },
  "GPRO": {
   "name": "GoPro, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 0.96,
   "open": 0.95,
   "prevClose": 0.93,
   "change": 0.03,
   "changePct": 3.23,
   "dayHigh": 0.98,
   "dayLow": 0.93,
   "high52": 2.05,
   "low52": 0.57,
   "volume": 9811781,
   "closes": [
    1.36,
    1.32,
    1.22,
    1.18,
    1.19,
    1.19,
    1.18,
    1.16,
    1.15,
    1.05,
    1.04,
    1.1,
    1.07,
    1.02,
    1.01,
    1.03,
    1.02,
    1.03,
    1,
    0.93,
    0.95
   ]
  },
  "HAS": {
   "name": "Hasbro, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 118.36,
   "open": 119.4,
   "prevClose": 119.09,
   "change": -0.73,
   "changePct": -0.61,
   "dayHigh": 120.15,
   "dayLow": 118.18,
   "high52": 121.04,
   "low52": 74.78,
   "volume": 1967698,
   "closes": [
    92.38,
    91.03,
    90.75,
    92.5,
    93.32,
    94.73,
    95.94,
    95.46,
    98.41,
    98.76,
    98.49,
    109.52,
    114,
    117.23,
    117.44,
    117.96,
    118.33,
    118.68,
    119.57,
    119.09,
    118.36
   ]
  },
  "HD": {
   "name": "The Home Depot, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 341.15,
   "open": 334.08,
   "prevClose": 329.2,
   "change": 11.95,
   "changePct": 3.63,
   "dayHigh": 341.54,
   "dayLow": 333,
   "high52": 397.63,
   "low52": 277.15,
   "volume": 4778206,
   "closes": [
    281.15,
    286.69,
    285.77,
    295.47,
    290.74,
    290.62,
    293.92,
    295.51,
    308.24,
    309.63,
    309.88,
    315.11,
    314.14,
    327.73,
    319.83,
    319.38,
    318.5,
    317.56,
    328.98,
    329.2,
    341.15
   ]
  },
  "HEWJ": {
   "name": "iShares Currency Hedged MSCI Japan ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 62.54,
   "open": 62.68,
   "prevClose": 62.44,
   "change": 0.1,
   "changePct": 0.16,
   "dayHigh": 63.16,
   "dayLow": 62.54,
   "high52": 67.27,
   "low52": 51.98,
   "volume": 66242,
   "closes": [
    66.78,
    66.82,
    66.15,
    65.58,
    66.09,
    65.87,
    65.59,
    64.61,
    64.35,
    63.91,
    64.27,
    64.42,
    64.61,
    63.2,
    62.87,
    63.38,
    63.73,
    64.01,
    63.98,
    62.44,
    62.54
   ]
  },
  "HOG": {
   "name": "Harley-Davidson, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 33.07,
   "open": 31.6,
   "prevClose": 31.22,
   "change": 1.85,
   "changePct": 5.93,
   "dayHigh": 33.38,
   "dayLow": 31.6,
   "high52": 33.38,
   "low52": 17.09,
   "volume": 4682265,
   "closes": [
    26.19,
    26.94,
    26.95,
    26.75,
    26.9,
    27.37,
    27.47,
    26.96,
    27.59,
    26.76,
    26.73,
    27.19,
    27.34,
    29.11,
    28.96,
    28.85,
    29.44,
    29.52,
    30.33,
    31.22,
    33.07
   ]
  },
  "HOOD": {
   "name": "Robinhood Markets, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 83.84,
   "open": 85.56,
   "prevClose": 84.99,
   "change": -1.15,
   "changePct": -1.35,
   "dayHigh": 87.37,
   "dayLow": 83.35,
   "high52": 149.41,
   "low52": 63.52,
   "volume": 19525136,
   "closes": [
    114.11,
    112,
    109.51,
    107.01,
    109.02,
    109.22,
    110.52,
    101.08,
    103.99,
    98.87,
    96.52,
    98.21,
    101.93,
    96.58,
    95.07,
    92.84,
    94.56,
    91.43,
    91.59,
    84.99,
    83.84
   ]
  },
  "IBM": {
   "name": "International Business Machines Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 252.51,
   "open": 258.12,
   "prevClose": 257.81,
   "change": -5.3,
   "changePct": -2.06,
   "dayHigh": 259.87,
   "dayLow": 252.36,
   "high52": 332.46,
   "low52": 199.19,
   "volume": 5592757,
   "closes": [
    221.58,
    221.29,
    220.51,
    226.61,
    227.13,
    227.02,
    230.78,
    227.88,
    234.12,
    232.14,
    236.39,
    241.92,
    251.46,
    252.11,
    253.56,
    253.44,
    250.25,
    253.22,
    258.28,
    257.81,
    252.51
   ]
  },
  "IEUR": {
   "name": "iShares Core MSCI Europe ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 74.79,
   "open": 74.71,
   "prevClose": 74.4,
   "change": 0.39,
   "changePct": 0.52,
   "dayHigh": 75.16,
   "dayLow": 74.72,
   "high52": 78.9,
   "low52": 66.45,
   "volume": 772780,
   "closes": [
    73.31,
    73.58,
    72.7,
    72.58,
    73.1,
    72.84,
    73.3,
    73.05,
    74.05,
    74.09,
    73.36,
    74.01,
    74.3,
    73.71,
    73.3,
    73.49,
    73.91,
    74.1,
    74.85,
    74.4,
    74.79
   ]
  },
  "INDA": {
   "name": "iShares MSCI India ETF",
   "exchange": "Cboe US",
   "type": "ETF",
   "price": 48.45,
   "open": 48.24,
   "prevClose": 47.72,
   "change": 0.73,
   "changePct": 1.53,
   "dayHigh": 48.54,
   "dayLow": 48.16,
   "high52": 55.1,
   "low52": 45.21,
   "volume": 9860116,
   "closes": [
    46.57,
    46.73,
    46.11,
    45.56,
    46.03,
    46.36,
    47.24,
    47.04,
    47.95,
    47.66,
    47.4,
    47.78,
    47.27,
    47.36,
    46.46,
    46.59,
    46.74,
    46.79,
    47.41,
    47.72,
    48.45
   ]
  },
  "INTC": {
   "name": "Intel Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 59.97,
   "open": 65.4,
   "prevClose": 65.76,
   "change": -5.79,
   "changePct": -8.8,
   "dayHigh": 65.72,
   "dayLow": 59.4,
   "high52": 142.35,
   "low52": 32.89,
   "volume": 230485372,
   "closes": [
    116.19,
    112.5,
    113.12,
    107.08,
    104.7,
    101.35,
    102.81,
    98.12,
    95.37,
    89.85,
    92.03,
    91.69,
    92.96,
    85.49,
    86.96,
    90.47,
    93.74,
    95.53,
    92.07,
    65.76,
    59.97
   ]
  },
  "IRBT": {
   "name": null,
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": null,
   "open": null,
   "prevClose": null,
   "change": null,
   "changePct": null,
   "dayHigh": null,
   "dayLow": null,
   "high52": null,
   "low52": null,
   "volume": null,
   "closes": []
  },
  "ITA": {
   "name": "iShares U.S. Aerospace & Defense ETF",
   "exchange": "Cboe US",
   "type": "ETF",
   "price": 214.68,
   "open": 212.07,
   "prevClose": 209.74,
   "change": 4.94,
   "changePct": 2.36,
   "dayHigh": 215.69,
   "dayLow": 211.87,
   "high52": 256.6,
   "low52": 195.71,
   "volume": 1072347,
   "closes": [
    206.98,
    208.26,
    203.6,
    204.88,
    206.65,
    206.03,
    204,
    204.24,
    206.92,
    209.07,
    207.76,
    206.15,
    205.79,
    204.48,
    202.23,
    207.16,
    206.22,
    207.74,
    214.3,
    209.74,
    214.68
   ]
  },
  "JBLU": {
   "name": "JetBlue Airways Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 3.17,
   "open": 2.99,
   "prevClose": 2.85,
   "change": 0.32,
   "changePct": 11.23,
   "dayHigh": 3.23,
   "dayLow": 2.97,
   "high52": 6.62,
   "low52": 2.16,
   "volume": 32585866,
   "closes": [
    4.06,
    4.03,
    3.97,
    3.92,
    3.84,
    3.62,
    3.35,
    3.01,
    3.15,
    2.93,
    2.91,
    2.91,
    2.93,
    2.65,
    2.63,
    2.37,
    2.82,
    2.85,
    3.05,
    2.85,
    3.17
   ]
  },
  "JNJ": {
   "name": "Johnson & Johnson",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 270.56,
   "open": 272.06,
   "prevClose": 273.2,
   "change": -2.64,
   "changePct": -0.97,
   "dayHigh": 273.01,
   "dayLow": 267.44,
   "high52": 282.02,
   "low52": 185.12,
   "volume": 8262644,
   "closes": [
    252.93,
    254.78,
    258.45,
    256.48,
    261.44,
    263.73,
    248.61,
    253.91,
    253.28,
    255.56,
    253.79,
    259.36,
    257.78,
    267.61,
    263.81,
    266.3,
    268.73,
    271.04,
    275.2,
    273.2,
    270.56
   ]
  },
  "JPM": {
   "name": "JPMorgan Chase & Co.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 340.58,
   "open": 340.94,
   "prevClose": 337.04,
   "change": 3.54,
   "changePct": 1.05,
   "dayHigh": 342.4,
   "dayLow": 339.92,
   "high52": 366.5,
   "low52": 279.1,
   "volume": 6014579,
   "closes": [
    332.38,
    331.28,
    329.58,
    331.42,
    332.99,
    334.3,
    331.43,
    335.28,
    335.53,
    339.72,
    333.53,
    335.26,
    335.19,
    336.54,
    331.58,
    334.04,
    335.79,
    339.3,
    343.58,
    337.04,
    340.58
   ]
  },
  "KO": {
   "name": "The Coca-Cola Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 95.83,
   "open": 94.28,
   "prevClose": 94.08,
   "change": 1.75,
   "changePct": 1.86,
   "dayHigh": 96.26,
   "dayLow": 94.28,
   "high52": 96.26,
   "low52": 67.27,
   "volume": 22706151,
   "closes": [
    86.51,
    86.17,
    85.82,
    87.77,
    88.05,
    89.79,
    90.11,
    91.78,
    92,
    93.9,
    93.42,
    93.49,
    92.68,
    95.34,
    92.71,
    92.7,
    91.18,
    91.73,
    92.82,
    94.08,
    95.83
   ]
  },
  "KWEB": {
   "name": "KraneShares CSI China Internet ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 23.35,
   "open": 23.19,
   "prevClose": 22.74,
   "change": 0.61,
   "changePct": 2.68,
   "dayHigh": 23.65,
   "dayLow": 23.18,
   "high52": 40.1,
   "low52": 22.54,
   "volume": 30354294,
   "closes": [
    24.56,
    24.54,
    24.33,
    24.02,
    24.93,
    24.75,
    24.72,
    24.51,
    24.61,
    24.41,
    24.28,
    24.35,
    23.74,
    23.21,
    23.14,
    23.2,
    23.13,
    22.99,
    22.79,
    22.74,
    23.35
   ]
  },
  "LAZR": {
   "name": "Tema Photonics & Optical ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 32.02,
   "open": 34.58,
   "prevClose": 34.09,
   "change": -2.07,
   "changePct": -6.07,
   "dayHigh": 34.15,
   "dayLow": 31.96,
   "high52": 50.82,
   "low52": 31.96,
   "volume": 176470,
   "closes": [
    48.35,
    48.63,
    47.78,
    44.5,
    45.02,
    42.31,
    42.11,
    39.62,
    37.99,
    36.41,
    37.17,
    36.76,
    37.54,
    33.44,
    33.65,
    34.96,
    36.33,
    37.91,
    37.1,
    34.09,
    32.02
   ]
  },
  "LCID": {
   "name": "Lucid Group, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 3,
   "open": 3.09,
   "prevClose": 3.02,
   "change": -0.02,
   "changePct": -0.66,
   "dayHigh": 3.3,
   "dayLow": 2.99,
   "high52": 18.1,
   "low52": 2.37,
   "volume": 12709565,
   "closes": [
    4.17,
    4.16,
    3.89,
    3.82,
    3.79,
    3.43,
    3.36,
    3.29,
    3.5,
    3.13,
    3.1,
    3.27,
    3.21,
    3.46,
    3.52,
    3.4,
    3.31,
    3.41,
    3.2,
    3.02,
    3
   ]
  },
  "LEVI": {
   "name": "Levi Strauss & Co.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 23.03,
   "open": 22.72,
   "prevClose": 22.5,
   "change": 0.53,
   "changePct": 2.36,
   "dayHigh": 23.19,
   "dayLow": 22.72,
   "high52": 25.7,
   "low52": 17.72,
   "volume": 2963945,
   "closes": [
    20.27,
    20.53,
    19.51,
    19.05,
    18.7,
    19.24,
    19.48,
    19.57,
    20.65,
    20.44,
    20.63,
    20.85,
    20.93,
    21.36,
    21.13,
    21.84,
    21.78,
    21.63,
    22.61,
    22.5,
    23.03
   ]
  },
  "LLY": {
   "name": "Eli Lilly and Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 1410.99,
   "open": 1393.15,
   "prevClose": 1417.54,
   "change": -6.55,
   "changePct": -0.46,
   "dayHigh": 1421.99,
   "dayLow": 1387.1,
   "high52": 1449.68,
   "low52": 850.51,
   "volume": 3737111,
   "closes": [
    1143.12,
    1157.49,
    1188.72,
    1169.6,
    1179.27,
    1182.62,
    1166.51,
    1208.74,
    1251.61,
    1257.03,
    1240.34,
    1283.66,
    1270.75,
    1306.69,
    1273.46,
    1279.14,
    1281.91,
    1288.3,
    1373.7,
    1417.54,
    1410.99
   ]
  },
  "LULU": {
   "name": "lululemon athletica inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 107.83,
   "open": 107.48,
   "prevClose": 107.24,
   "change": 0.59,
   "changePct": 0.55,
   "dayHigh": 110.19,
   "dayLow": 107.27,
   "high52": 225.98,
   "low52": 90.38,
   "volume": 2621947,
   "closes": [
    93.14,
    93.61,
    91.88,
    92.68,
    94.5,
    94.66,
    94.34,
    94.09,
    99.09,
    97.1,
    97.76,
    99.94,
    96.53,
    104.06,
    99.01,
    102.91,
    104.59,
    105.22,
    109.82,
    107.24,
    107.83
   ]
  },
  "LYFT": {
   "name": "Lyft, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 16.62,
   "open": 16.35,
   "prevClose": 16.16,
   "change": 0.46,
   "changePct": 2.85,
   "dayHigh": 16.99,
   "dayLow": 16.23,
   "high52": 25.54,
   "low52": 12.46,
   "volume": 10646286,
   "closes": [
    15.73,
    15.76,
    15.6,
    16.13,
    16.22,
    16.11,
    16.38,
    16.48,
    17.16,
    16.82,
    16.99,
    17.25,
    16.79,
    17.43,
    16.94,
    17.06,
    16.79,
    16.34,
    16.41,
    16.16,
    16.62
   ]
  },
  "M": {
   "name": "Macy's, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 24.33,
   "open": 24.48,
   "prevClose": 24.11,
   "change": 0.22,
   "changePct": 0.91,
   "dayHigh": 24.69,
   "dayLow": 24.02,
   "high52": 26.59,
   "low52": 16.69,
   "volume": 5731290,
   "closes": [
    22.51,
    22.46,
    22.79,
    22.79,
    22.67,
    22.99,
    22.74,
    22.68,
    24.22,
    24,
    23.6,
    23.41,
    23.43,
    24.17,
    24.1,
    23.59,
    23.86,
    23.74,
    24.72,
    24.11,
    24.33
   ]
  },
  "MA": {
   "name": "Mastercard Incorporated",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 658.1,
   "open": 638.32,
   "prevClose": 638.01,
   "change": 20.09,
   "changePct": 3.15,
   "dayHigh": 661.34,
   "dayLow": 638.25,
   "high52": 661.34,
   "low52": 464.52,
   "volume": 3977345,
   "closes": [
    564.59,
    566.58,
    570.06,
    574.76,
    589.14,
    595.09,
    604.8,
    603.24,
    616.32,
    617.42,
    616.4,
    620.42,
    622.62,
    633.21,
    623.6,
    613.5,
    609.85,
    610.31,
    635.7,
    638.01,
    658.1
   ]
  },
  "MAR": {
   "name": "Marriott International, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 416.3,
   "open": 425,
   "prevClose": 399.3,
   "change": 17,
   "changePct": 4.26,
   "dayHigh": 433.3,
   "dayLow": 411.8,
   "high52": 433.3,
   "low52": 258.99,
   "volume": 2590311,
   "closes": [
    355.89,
    361.28,
    356.5,
    361.08,
    365.88,
    369.3,
    371.5,
    371.82,
    385.71,
    388.05,
    390.7,
    397.31,
    404,
    396.8,
    390.71,
    394.75,
    390.23,
    394.4,
    399.65,
    399.3,
    416.3
   ]
  },
  "MAT": {
   "name": "Mattel, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 15.53,
   "open": 15.51,
   "prevClose": 15.42,
   "change": 0.11,
   "changePct": 0.71,
   "dayHigh": 15.85,
   "dayLow": 15.45,
   "high52": 22.48,
   "low52": 12.4,
   "volume": 4511429,
   "closes": [
    16.05,
    15.93,
    16.37,
    16.58,
    16.69,
    16.76,
    16.8,
    16.65,
    17.32,
    17.2,
    16.88,
    16.99,
    16.95,
    16.94,
    16.41,
    15.82,
    15.43,
    15.28,
    15.48,
    15.42,
    15.53
   ]
  },
  "MCD": {
   "name": "McDonald's Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 265.64,
   "open": 260.02,
   "prevClose": 258.12,
   "change": 7.52,
   "changePct": 2.91,
   "dayHigh": 265.64,
   "dayLow": 259.75,
   "high52": 341.75,
   "low52": 229.2,
   "volume": 6480042,
   "closes": [
    233.04,
    232.45,
    230.88,
    236.9,
    235.23,
    235.65,
    235.81,
    238.31,
    242.5,
    242.97,
    242.67,
    246.52,
    246.25,
    252.63,
    248.46,
    250.83,
    249.47,
    250.5,
    257.38,
    258.12,
    265.64
   ]
  },
  "MCHI": {
   "name": "iShares MSCI China ETF",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 49.59,
   "open": 49.45,
   "prevClose": 49.07,
   "change": 0.52,
   "changePct": 1.06,
   "dayHigh": 49.95,
   "dayLow": 49.45,
   "high52": 65.37,
   "low52": 48.65,
   "volume": 2188252,
   "closes": [
    52.28,
    52.22,
    51.64,
    51.36,
    52.55,
    52.15,
    52.14,
    51.44,
    51.69,
    51.2,
    50.87,
    50.96,
    50.05,
    49.02,
    49,
    49.12,
    49.08,
    49.04,
    48.96,
    49.07,
    49.59
   ]
  },
  "META": {
   "name": "Meta Platforms, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 606.73,
   "open": 614.44,
   "prevClose": 614.99,
   "change": -8.26,
   "changePct": -1.34,
   "dayHigh": 621.69,
   "dayLow": 606.41,
   "high52": 779.82,
   "low52": 520.26,
   "volume": 19494137,
   "closes": [
    741.9,
    738.88,
    721.31,
    720.89,
    718.67,
    742.96,
    762.5,
    737.54,
    736.72,
    709.33,
    705.44,
    694.25,
    697.52,
    648.85,
    642.62,
    630.56,
    620.19,
    612.49,
    624.52,
    614.99,
    606.73
   ]
  },
  "MRK": {
   "name": "Merck & Co., Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 148.36,
   "open": 148.82,
   "prevClose": 149.52,
   "change": -1.16,
   "changePct": -0.78,
   "dayHigh": 150.25,
   "dayLow": 147.12,
   "high52": 156.92,
   "low52": 82.01,
   "volume": 9095330,
   "closes": [
    139.54,
    141.94,
    142.79,
    142.38,
    145.6,
    145.45,
    141.98,
    147.37,
    145.19,
    145.95,
    143.63,
    148.3,
    149.88,
    147.24,
    145.27,
    140.61,
    141.82,
    140.93,
    146.33,
    149.52,
    148.36
   ]
  },
  "MSFT": {
   "name": "Microsoft Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 507.12,
   "open": 524.02,
   "prevClose": 521.91,
   "change": -14.79,
   "changePct": -2.83,
   "dayHigh": 529.63,
   "dayLow": 504.96,
   "high52": 551.15,
   "low52": 349.2,
   "volume": 34738903,
   "closes": [
    525.18,
    529.3,
    529.76,
    522.61,
    535.07,
    541.15,
    543.45,
    533.69,
    539.44,
    529.05,
    533.52,
    531.87,
    532.95,
    521.08,
    524.51,
    532.6,
    531.33,
    531.01,
    530.14,
    521.91,
    507.12
   ]
  },
  "MU": {
   "name": "Micron Technology, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 833.59,
   "open": 890.54,
   "prevClose": 884.74,
   "change": -51.15,
   "changePct": -5.78,
   "dayHigh": 892.08,
   "dayLow": 829.24,
   "high52": 1255,
   "low52": 192.59,
   "volume": 29868539,
   "closes": [
    1063.96,
    1045.56,
    1088,
    1035.84,
    1029,
    989.04,
    953.19,
    914.13,
    931.24,
    878.84,
    904.9,
    896.07,
    913.67,
    856.49,
    877.55,
    903.7,
    928.76,
    983.23,
    934.27,
    884.74,
    833.59
   ]
  },
  "NET": {
   "name": "Cloudflare, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 265.17,
   "open": 282.27,
   "prevClose": 280.7,
   "change": -15.53,
   "changePct": -5.53,
   "dayHigh": 282,
   "dayLow": 263.86,
   "high52": 370.35,
   "low52": 158.83,
   "volume": 4126436,
   "closes": [
    359.49,
    355.01,
    342.97,
    341.89,
    360.93,
    350.87,
    347.7,
    324.33,
    316.32,
    296.3,
    297.58,
    291.69,
    307.22,
    303.61,
    325.73,
    331.86,
    327.8,
    318.72,
    310.3,
    280.7,
    265.17
   ]
  },
  "NFLX": {
   "name": "Netflix, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 62.34,
   "open": 62.2,
   "prevClose": 62.08,
   "change": 0.26,
   "changePct": 0.42,
   "dayHigh": 62.89,
   "dayLow": 61.72,
   "high52": 116.73,
   "low52": 61.39,
   "volume": 40911045,
   "closes": [
    67.5,
    68.69,
    69.7,
    71.57,
    70.3,
    70.61,
    70.46,
    70.57,
    72.61,
    70.53,
    69.85,
    68.69,
    65.04,
    67.05,
    65.85,
    63.9,
    62.52,
    61.99,
    62.05,
    62.08,
    62.34
   ]
  },
  "NIO": {
   "name": "NIO Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 3.19,
   "open": 3.23,
   "prevClose": 3.21,
   "change": -0.02,
   "changePct": -0.62,
   "dayHigh": 3.28,
   "dayLow": 3.18,
   "high52": 7.54,
   "low52": 3.16,
   "volume": 31405621,
   "closes": [
    3.42,
    3.48,
    3.54,
    3.41,
    3.58,
    3.47,
    3.56,
    3.41,
    3.5,
    3.43,
    3.39,
    3.43,
    3.36,
    3.31,
    3.29,
    3.26,
    3.29,
    3.32,
    3.32,
    3.21,
    3.19
   ]
  },
  "NKE": {
   "name": "NIKE, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 39.12,
   "open": 39,
   "prevClose": 38.67,
   "change": 0.45,
   "changePct": 1.16,
   "dayHigh": 39.57,
   "dayLow": 38.95,
   "high52": 69.14,
   "low52": 31.97,
   "volume": 22959016,
   "closes": [
    33.96,
    34.61,
    34.36,
    34.74,
    34.71,
    35.35,
    35.33,
    35.3,
    37.14,
    37.13,
    37.21,
    37.88,
    37.53,
    38.32,
    37.3,
    37.91,
    37.56,
    37.15,
    38.42,
    38.67,
    39.12
   ]
  },
  "NVD": {
   "name": "Graniteshares 2x Short NVDA Daily ETF",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 4.54,
   "open": 4.3,
   "prevClose": 4.43,
   "change": 0.11,
   "changePct": 2.48,
   "dayHigh": 4.56,
   "dayLow": 4.2,
   "high52": 9.76,
   "low52": 3.19,
   "volume": 190470563,
   "closes": [
    3.31,
    3.3,
    3.35,
    3.55,
    3.58,
    3.67,
    3.61,
    3.83,
    3.98,
    4.11,
    3.98,
    4.02,
    3.82,
    4.15,
    4.19,
    3.99,
    3.93,
    4.01,
    4.09,
    4.43,
    4.54
   ]
  },
  "NVDA": {
   "name": "NVIDIA Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 202.06,
   "open": 207.53,
   "prevClose": 204.64,
   "change": -2.58,
   "changePct": -1.26,
   "dayHigh": 209.98,
   "dayLow": 201.66,
   "high52": 243.37,
   "low52": 164.27,
   "volume": 119222246,
   "closes": [
    238.9,
    239.24,
    237.47,
    230.48,
    229.28,
    226.32,
    228.52,
    221.3,
    217.23,
    214.13,
    217.09,
    216.47,
    221.97,
    212.21,
    210.96,
    216,
    217.94,
    215.38,
    213.66,
    204.64,
    202.06
   ]
  },
  "NVDL": {
   "name": "GraniteShares 2x Long NVDA Daily ETF",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 28.24,
   "open": 29.75,
   "prevClose": 28.97,
   "change": -0.73,
   "changePct": -2.52,
   "dayHigh": 30.43,
   "dayLow": 28.09,
   "high52": 43.27,
   "low52": 21.54,
   "volume": 7509179,
   "closes": [
    40.17,
    40.17,
    39.57,
    37.28,
    36.86,
    35.93,
    36.58,
    34.32,
    32.98,
    31.98,
    32.87,
    32.66,
    34.3,
    31.32,
    30.91,
    32.37,
    32.92,
    32.15,
    31.6,
    28.97,
    28.24
   ]
  },
  "OPEN": {
   "name": "Opendoor Technologies Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 1.8,
   "open": 1.85,
   "prevClose": 1.8,
   "change": 0,
   "changePct": 0,
   "dayHigh": 1.95,
   "dayLow": 1.79,
   "high52": 9.46,
   "low52": 1.76,
   "volume": 31498544,
   "closes": [
    2.31,
    2.27,
    2.27,
    2.29,
    2.22,
    2.09,
    2.11,
    1.99,
    2.32,
    2.12,
    2.05,
    2.06,
    1.95,
    2.02,
    1.98,
    1.93,
    1.91,
    1.91,
    1.9,
    1.8,
    1.8
   ]
  },
  "ORCL": {
   "name": "Oracle Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 119.22,
   "open": 125.88,
   "prevClose": 130.67,
   "change": -11.45,
   "changePct": -8.76,
   "dayHigh": 126.5,
   "dayLow": 118.43,
   "high52": 265.62,
   "low52": 114.5,
   "volume": 58710047,
   "closes": [
    142.48,
    144.77,
    143.56,
    135.69,
    141.4,
    137.39,
    143.2,
    130.55,
    134.47,
    128.23,
    129.59,
    131.14,
    129.13,
    125.54,
    126.16,
    126.06,
    130.53,
    144.54,
    139.56,
    130.67,
    119.22
   ]
  },
  "PENN": {
   "name": "PENN Entertainment, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 17.02,
   "open": 16.05,
   "prevClose": 15.89,
   "change": 1.13,
   "changePct": 7.11,
   "dayHigh": 17.45,
   "dayLow": 16,
   "high52": 22.36,
   "low52": 11.65,
   "volume": 4108359,
   "closes": [
    15.1,
    15.91,
    15.72,
    15.76,
    15.48,
    15.4,
    15.37,
    14.52,
    15.21,
    14.94,
    14.71,
    14.96,
    14.89,
    15.46,
    14.5,
    14.9,
    14.83,
    14.72,
    15.33,
    15.89,
    17.02
   ]
  },
  "PEP": {
   "name": "PepsiCo, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 140.42,
   "open": 138.28,
   "prevClose": 137.34,
   "change": 3.08,
   "changePct": 2.24,
   "dayHigh": 140.65,
   "dayLow": 137.92,
   "high52": 171.48,
   "low52": 123.47,
   "volume": 9351020,
   "closes": [
    125.65,
    125.71,
    123.73,
    128.34,
    125.97,
    126.68,
    127.3,
    129.27,
    128.38,
    131.49,
    133.57,
    134.02,
    134.7,
    138.83,
    135.77,
    135.46,
    133.5,
    132.63,
    133.79,
    137.34,
    140.42
   ]
  },
  "PFE": {
   "name": "Pfizer Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 30.67,
   "open": 30.45,
   "prevClose": 30.52,
   "change": 0.15,
   "changePct": 0.49,
   "dayHigh": 31.04,
   "dayLow": 30.2,
   "high52": 31.04,
   "low52": 23.62,
   "volume": 50815555,
   "closes": [
    27.41,
    27.5,
    28,
    27.82,
    28.28,
    28.4,
    28.37,
    29.21,
    29.44,
    29.58,
    29.44,
    30.11,
    29.85,
    30.42,
    30.03,
    29.79,
    29.8,
    29.45,
    29.95,
    30.52,
    30.67
   ]
  },
  "PG": {
   "name": "The Procter & Gamble Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 163.56,
   "open": 162.24,
   "prevClose": 161.57,
   "change": 1.99,
   "changePct": 1.23,
   "dayHigh": 164.34,
   "dayLow": 162.24,
   "high52": 167.25,
   "low52": 137.62,
   "volume": 9724324,
   "closes": [
    145.94,
    148.41,
    147.82,
    150.59,
    151.23,
    153.2,
    153.04,
    156.53,
    157.08,
    159.35,
    157.69,
    159.32,
    156.84,
    165.59,
    161.02,
    159.92,
    159.23,
    158.26,
    160.59,
    161.57,
    163.56
   ]
  },
  "PLAY": {
   "name": "Dave & Buster's Entertainment, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 8.51,
   "open": 7.9,
   "prevClose": 7.83,
   "change": 0.68,
   "changePct": 8.68,
   "dayHigh": 8.7,
   "dayLow": 7.9,
   "high52": 22.1,
   "low52": 6.26,
   "volume": 2228239,
   "closes": [
    6.76,
    6.86,
    6.56,
    6.97,
    6.9,
    7.09,
    7.39,
    7.15,
    7.96,
    7.6,
    7.71,
    7.79,
    7.23,
    7.46,
    6.96,
    7.07,
    7.58,
    7.71,
    8.13,
    7.83,
    8.51
   ]
  },
  "PLNT": {
   "name": "Planet Fitness, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 55.65,
   "open": 54.83,
   "prevClose": 53.58,
   "change": 2.07,
   "changePct": 3.86,
   "dayHigh": 55.89,
   "dayLow": 54.46,
   "high52": 114.26,
   "low52": 37.03,
   "volume": 1473886,
   "closes": [
    42.07,
    42.25,
    43.09,
    44.03,
    47.98,
    47.89,
    47.45,
    46.95,
    49.41,
    50.92,
    52.89,
    52.96,
    51.69,
    53.27,
    52.52,
    52.44,
    52.26,
    52.63,
    53.72,
    53.58,
    55.65
   ]
  },
  "PLTR": {
   "name": "Palantir Technologies Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 178.34,
   "open": 186.52,
   "prevClose": 184.11,
   "change": -5.77,
   "changePct": -3.13,
   "dayHigh": 187.55,
   "dayLow": 178.13,
   "high52": 212.94,
   "low52": 106.37,
   "volume": 37089804,
   "closes": [
    189.4,
    192.07,
    194.12,
    198.78,
    209.05,
    209,
    208.67,
    200.97,
    200.5,
    186.03,
    194.15,
    192.6,
    201.72,
    196.19,
    196.75,
    198.84,
    198.73,
    196.81,
    196.42,
    184.11,
    178.34
   ]
  },
  "PLUG": {
   "name": "Plug Power Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 1.31,
   "open": 1.39,
   "prevClose": 1.37,
   "change": -0.06,
   "changePct": -4.38,
   "dayHigh": 1.42,
   "dayLow": 1.3,
   "high52": 4.33,
   "low52": 1.3,
   "volume": 44037337,
   "closes": [
    1.89,
    1.86,
    1.78,
    1.73,
    1.68,
    1.62,
    1.56,
    1.45,
    1.49,
    1.38,
    1.37,
    1.4,
    1.41,
    1.38,
    1.38,
    1.37,
    1.4,
    1.42,
    1.42,
    1.37,
    1.31
   ]
  },
  "PTON": {
   "name": "Peloton Interactive, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 5.3,
   "open": 5.14,
   "prevClose": 5.12,
   "change": 0.18,
   "changePct": 3.52,
   "dayHigh": 5.36,
   "dayLow": 5.11,
   "high52": 7.92,
   "low52": 3.65,
   "volume": 7639138,
   "closes": [
    5.01,
    4.87,
    4.85,
    4.92,
    5.12,
    5.14,
    5.22,
    5.06,
    5.33,
    5.22,
    5.23,
    5.45,
    5.24,
    5.46,
    5.37,
    5.25,
    5.3,
    5.27,
    5.28,
    5.12,
    5.3
   ]
  },
  "PYPL": {
   "name": "PayPal Holdings, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 58.78,
   "open": 57.68,
   "prevClose": 57.01,
   "change": 1.77,
   "changePct": 3.1,
   "dayHigh": 59.03,
   "dayLow": 57.27,
   "high52": 70.35,
   "low52": 38.46,
   "volume": 14896219,
   "closes": [
    54.41,
    54.61,
    54.95,
    55.02,
    55.53,
    56.05,
    56.17,
    56.1,
    57.16,
    56.7,
    56.51,
    57.14,
    57.2,
    57.53,
    57.02,
    54.99,
    56.09,
    56.55,
    56.95,
    57.01,
    58.78
   ]
  },
  "QCOM": {
   "name": "QUALCOMM Incorporated",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 162.08,
   "open": 166.44,
   "prevClose": 164.79,
   "change": -2.71,
   "changePct": -1.64,
   "dayHigh": 169.52,
   "dayLow": 161.46,
   "high52": 259.92,
   "low52": 121.99,
   "volume": 11019565,
   "closes": [
    180.79,
    181.03,
    177.12,
    176.01,
    175.5,
    174.43,
    176.86,
    172.62,
    178.4,
    172.11,
    173.53,
    175.71,
    177.96,
    172.83,
    175.91,
    179.6,
    184.17,
    182.97,
    185.41,
    164.79,
    162.08
   ]
  },
  "QQQ": {
   "name": "Invesco QQQ Trust",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 681.09,
   "open": 695.32,
   "prevClose": 690.49,
   "change": -9.4,
   "changePct": -1.36,
   "dayHigh": 699.43,
   "dayLow": 680.33,
   "high52": 762.86,
   "low52": 555.6,
   "volume": 54716423,
   "closes": [
    756.2,
    759.66,
    757.73,
    747.58,
    751.27,
    746.04,
    743.57,
    728.95,
    728,
    709.8,
    718.36,
    717.63,
    725.2,
    704.47,
    704.4,
    712.2,
    721.25,
    725.61,
    715.34,
    690.49,
    681.09
   ]
  },
  "QS": {
   "name": "QuantumScape Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 4.02,
   "open": 4.15,
   "prevClose": 4.06,
   "change": -0.04,
   "changePct": -0.99,
   "dayHigh": 4.22,
   "dayLow": 3.99,
   "high52": 17.86,
   "low52": 3.8,
   "volume": 13263774,
   "closes": [
    4.62,
    4.65,
    4.52,
    4.58,
    4.58,
    4.27,
    4.12,
    3.93,
    4.23,
    4.01,
    3.89,
    3.98,
    3.98,
    4.15,
    4.03,
    3.9,
    4.18,
    4.24,
    4.2,
    4.06,
    4.02
   ]
  },
  "RBLX": {
   "name": "Roblox Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 42.88,
   "open": 42.9,
   "prevClose": 42.99,
   "change": -0.11,
   "changePct": -0.26,
   "dayHigh": 44.79,
   "dayLow": 41.78,
   "high52": 113.6,
   "low52": 33.88,
   "volume": 14261200,
   "closes": [
    44.58,
    45.56,
    46.41,
    45.52,
    48.09,
    49.58,
    49.51,
    47.54,
    51.13,
    49.55,
    50.75,
    52.35,
    52.55,
    53.96,
    52.89,
    54.37,
    54.47,
    53.28,
    52.46,
    42.99,
    42.88
   ]
  },
  "RH": {
   "name": "RH",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 146.52,
   "open": 148.55,
   "prevClose": 146.66,
   "change": -0.14,
   "changePct": -0.1,
   "dayHigh": 155,
   "dayLow": 145.29,
   "high52": 239.4,
   "low52": 106.3,
   "volume": 775541,
   "closes": [
    117.45,
    117.16,
    115.19,
    113.67,
    116.99,
    116.76,
    115.88,
    110.99,
    117.87,
    112.99,
    114.03,
    119.74,
    128.01,
    140.15,
    137.43,
    135.72,
    140.76,
    145.06,
    150.79,
    146.66,
    146.52
   ]
  },
  "RIG": {
   "name": "Transocean Ltd.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 6.23,
   "open": 6.65,
   "prevClose": 6.94,
   "change": -0.71,
   "changePct": -10.23,
   "dayHigh": 6.77,
   "dayLow": 6.21,
   "high52": 7.66,
   "low52": 3.68,
   "volume": 45683885,
   "closes": [
    5.51,
    5.4,
    5.39,
    5.54,
    5.51,
    5.6,
    5.65,
    5.58,
    5.51,
    5.62,
    5.89,
    5.82,
    6.04,
    6.08,
    6.41,
    6.53,
    6.46,
    6.71,
    6.69,
    6.94,
    6.23
   ]
  },
  "RIVN": {
   "name": "Rivian Automotive, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 13.19,
   "open": 12.75,
   "prevClose": 12.16,
   "change": 1.03,
   "changePct": 8.47,
   "dayHigh": 13.7,
   "dayLow": 12.65,
   "high52": 22.69,
   "low52": 11.38,
   "volume": 65299674,
   "closes": [
    14.6,
    14.51,
    14.34,
    14.33,
    13.96,
    13.54,
    13.37,
    12.95,
    13.02,
    12.42,
    12.34,
    12.43,
    12.46,
    12.06,
    11.83,
    11.43,
    11.82,
    11.67,
    11.45,
    12.16,
    13.19
   ]
  },
  "SBUX": {
   "name": "Starbucks Corporation",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 104.4,
   "open": 104.41,
   "prevClose": 103.67,
   "change": 0.73,
   "changePct": 0.7,
   "dayHigh": 105.06,
   "dayLow": 102.29,
   "high52": 110.51,
   "low52": 77.99,
   "volume": 9915772,
   "closes": [
    94.43,
    96.11,
    93.58,
    93.21,
    90.75,
    92.29,
    92,
    93.25,
    96.88,
    97.52,
    97.87,
    99.37,
    99.08,
    101.91,
    100.8,
    102.69,
    103.04,
    103.2,
    105.51,
    103.67,
    104.4
   ]
  },
  "SCJ": {
   "name": "iShares MSCI Japan Small-Cap ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 105.98,
   "open": 105.9,
   "prevClose": 105.3,
   "change": 0.68,
   "changePct": 0.65,
   "dayHigh": 106.49,
   "dayLow": 105.98,
   "high52": 111.44,
   "low52": 88.54,
   "volume": 7552,
   "closes": [
    110.65,
    110.89,
    110.19,
    109.26,
    110.03,
    109.72,
    110.02,
    108.56,
    108.07,
    108.32,
    107.75,
    107.43,
    107.55,
    106.89,
    106.25,
    106.77,
    107.76,
    106.79,
    106.78,
    105.3,
    105.98
   ]
  },
  "SHAK": {
   "name": "Shake Shack Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 72.46,
   "open": 70.43,
   "prevClose": 70.48,
   "change": 1.98,
   "changePct": 2.81,
   "dayHigh": 73.08,
   "dayLow": 69.57,
   "high52": 107.46,
   "low52": 51.6,
   "volume": 1796365,
   "closes": [
    62.4,
    64.61,
    64.17,
    67.31,
    66.9,
    69.34,
    71.06,
    68.77,
    70.61,
    69.99,
    71.87,
    69.74,
    67.84,
    67.88,
    65.16,
    64.89,
    64.54,
    67.22,
    70.51,
    70.48,
    72.46
   ]
  },
  "SHOP": {
   "name": "Shopify Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 156.22,
   "open": 158.29,
   "prevClose": 157.49,
   "change": -1.27,
   "changePct": -0.81,
   "dayHigh": 160.88,
   "dayLow": 153.33,
   "high52": 180.88,
   "low52": 94,
   "volume": 13919506,
   "closes": [
    160.11,
    164.44,
    166.03,
    164.56,
    170.85,
    179.22,
    176.52,
    172.5,
    178.14,
    169.52,
    171.06,
    173.48,
    174.29,
    168.81,
    168.68,
    168.18,
    165.81,
    168.22,
    166.89,
    157.49,
    156.22
   ]
  },
  "SIRI": {
   "name": "Sirius XM Holdings Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 29.57,
   "open": 29.2,
   "prevClose": 29.01,
   "change": 0.56,
   "changePct": 1.93,
   "dayHigh": 29.73,
   "dayLow": 29.05,
   "high52": 32.66,
   "low52": 19.77,
   "volume": 4793874,
   "closes": [
    26.31,
    26.36,
    25.95,
    26.33,
    26.51,
    26.61,
    26.57,
    26.51,
    27.15,
    26.97,
    26.84,
    27.16,
    26.96,
    27.54,
    27.63,
    27.42,
    27.25,
    27.32,
    28.67,
    29.01,
    29.57
   ]
  },
  "SLB": {
   "name": "SLB N.V.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 52.31,
   "open": 52.3,
   "prevClose": 53.74,
   "change": -1.43,
   "changePct": -2.66,
   "dayHigh": 53.83,
   "dayLow": 52.23,
   "high52": 60.46,
   "low52": 34.65,
   "volume": 11945165,
   "closes": [
    50.28,
    50,
    47.96,
    48.98,
    48.95,
    48.77,
    48.77,
    48.51,
    48.37,
    49.5,
    49.09,
    49.98,
    51.1,
    49.55,
    53.06,
    53.08,
    54.08,
    53.75,
    53.81,
    53.74,
    52.31
   ]
  },
  "SMH": {
   "name": "VanEck Semiconductor ETF",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 508.31,
   "open": 529.05,
   "prevClose": 522.49,
   "change": -14.18,
   "changePct": -2.71,
   "dayHigh": 532.76,
   "dayLow": 506.45,
   "high52": 671.83,
   "low52": 315.05,
   "volume": 8863693,
   "closes": [
    633.9,
    632.5,
    625.03,
    607.27,
    603.33,
    590.99,
    588.12,
    564.74,
    558.84,
    539.79,
    548.46,
    546.36,
    556.7,
    523.35,
    527.2,
    541.62,
    557.98,
    567.67,
    561.67,
    522.49,
    508.31
   ]
  },
  "SNAP": {
   "name": "Snap Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 5.45,
   "open": 5.38,
   "prevClose": 5.34,
   "change": 0.11,
   "changePct": 2.06,
   "dayHigh": 5.65,
   "dayLow": 5.33,
   "high52": 9.13,
   "low52": 3.81,
   "volume": 39403564,
   "closes": [
    5.61,
    5.78,
    5.81,
    5.86,
    6.23,
    6.53,
    6.49,
    6.1,
    6.44,
    6.13,
    6.27,
    6.38,
    6.35,
    6.35,
    6.34,
    6.34,
    6.08,
    5.96,
    5.68,
    5.34,
    5.45
   ]
  },
  "SNBR": {
   "name": null,
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": null,
   "open": null,
   "prevClose": null,
   "change": null,
   "changePct": null,
   "dayHigh": null,
   "dayLow": null,
   "high52": null,
   "low52": null,
   "volume": null,
   "closes": []
  },
  "SNOW": {
   "name": "Snowflake Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 290.68,
   "open": 306,
   "prevClose": 306.08,
   "change": -15.4,
   "changePct": -5.03,
   "dayHigh": 306.96,
   "dayLow": 287.93,
   "high52": 384.56,
   "low52": 118.3,
   "volume": 6437324,
   "closes": [
    338.99,
    335.95,
    332.85,
    343.4,
    368.89,
    360.37,
    357.76,
    335.08,
    335.07,
    306.84,
    315.35,
    319.61,
    322.73,
    313.96,
    325.43,
    334.95,
    337.42,
    339.91,
    330.27,
    306.08,
    290.68
   ]
  },
  "SONO": {
   "name": "Sonos, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 15.73,
   "open": 16.39,
   "prevClose": 16.17,
   "change": -0.44,
   "changePct": -2.72,
   "dayHigh": 16.67,
   "dayLow": 15.69,
   "high52": 19.82,
   "low52": 12.44,
   "volume": 1630590,
   "closes": [
    17.94,
    17.43,
    16.98,
    16.95,
    17.26,
    17.34,
    17.72,
    17.6,
    17.69,
    17.34,
    16.93,
    17.37,
    17.47,
    17.71,
    17.54,
    17.59,
    17.87,
    17.75,
    17.46,
    16.17,
    15.73
   ]
  },
  "SOUN": {
   "name": "SoundHound AI, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 4.09,
   "open": 4.28,
   "prevClose": 4.22,
   "change": -0.13,
   "changePct": -3.08,
   "dayHigh": 4.42,
   "dayLow": 4.09,
   "high52": 17.85,
   "low52": 4.04,
   "volume": 17247939,
   "closes": [
    5.88,
    5.72,
    5.63,
    5.52,
    5.39,
    4.97,
    4.88,
    4.53,
    4.89,
    4.72,
    4.65,
    4.7,
    4.61,
    4.5,
    4.43,
    4.24,
    4.37,
    4.44,
    4.36,
    4.22,
    4.09
   ]
  },
  "SOXL": {
   "name": "Direxion Daily Semiconductor Bull 3X Shares",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 68.17,
   "open": 79.45,
   "prevClose": 77.05,
   "change": -8.88,
   "changePct": -11.52,
   "dayHigh": 81.07,
   "dayLow": 67.5,
   "high52": 302,
   "low52": 28.12,
   "volume": 159025645,
   "closes": [
    164.27,
    164.26,
    158.91,
    142.52,
    139.76,
    128.4,
    127.57,
    110.54,
    107.35,
    93.67,
    98.65,
    97.55,
    103.24,
    82.11,
    83.56,
    90.5,
    101.08,
    107.35,
    102.39,
    77.05,
    68.17
   ]
  },
  "SOXS": {
   "name": "Direxion Daily Semiconductor Bear 3X Shares",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 58.09,
   "open": 50.38,
   "prevClose": 52.08,
   "change": 6.01,
   "changePct": 11.54,
   "dayHigh": 58.52,
   "dayLow": 49.31,
   "high52": 1030,
   "low52": 28.46,
   "volume": 77017172,
   "closes": [
    29.62,
    29.63,
    30.65,
    33.79,
    34.39,
    37.19,
    37.42,
    42.52,
    43.64,
    49.23,
    46.63,
    47.13,
    44.29,
    53.45,
    52.46,
    47.98,
    42.5,
    39.78,
    41.68,
    52.08,
    58.09
   ]
  },
  "SPCE": {
   "name": "Virgin Galactic Holdings, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 2.47,
   "open": 2.62,
   "prevClose": 2.58,
   "change": -0.11,
   "changePct": -4.26,
   "dayHigh": 2.63,
   "dayLow": 2.45,
   "high52": 8.9,
   "low52": 2.13,
   "volume": 5087555,
   "closes": [
    3.05,
    3.07,
    3.01,
    2.94,
    2.84,
    2.67,
    2.63,
    2.55,
    2.58,
    2.43,
    2.34,
    2.37,
    2.44,
    2.42,
    2.46,
    2.56,
    2.69,
    2.66,
    2.73,
    2.58,
    2.47
   ]
  },
  "SPOT": {
   "name": "Spotify Technology S.A.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 594.04,
   "open": 588.8,
   "prevClose": 593.44,
   "change": 0.6,
   "changePct": 0.1,
   "dayHigh": 600.18,
   "dayLow": 581.28,
   "high52": 668.5,
   "low52": 405,
   "volume": 1753645,
   "closes": [
    483.05,
    488.13,
    512.92,
    526.42,
    529.14,
    528.8,
    527.45,
    523.96,
    533.37,
    530.46,
    518.76,
    526.08,
    525.34,
    583.66,
    584.22,
    572.36,
    555.45,
    538.4,
    557.24,
    593.44,
    594.04
   ]
  },
  "SPXL": {
   "name": "Direxion Daily S&P500 Bull 3X Shares",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 266.32,
   "open": 274.14,
   "prevClose": 270.35,
   "change": -4.03,
   "changePct": -1.49,
   "dayHigh": 278.82,
   "dayLow": 265.77,
   "high52": 303.18,
   "low52": 168.04,
   "volume": 2269902,
   "closes": [
    294.56,
    299.21,
    296.91,
    293.05,
    297.97,
    297.37,
    297.42,
    287.63,
    290,
    280.17,
    283.62,
    286.27,
    290.87,
    280.41,
    275.63,
    281.52,
    286.21,
    288.95,
    285.67,
    270.35,
    266.32
   ]
  },
  "SPXS": {
   "name": "Direxion Daily S&P 500 Bear 3X Shares",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 26.01,
   "open": 25.27,
   "prevClose": 25.63,
   "change": 0.38,
   "changePct": 1.48,
   "dayHigh": 26.05,
   "dayLow": 24.81,
   "high52": 44.83,
   "low52": 23.04,
   "volume": 10554277,
   "closes": [
    23.64,
    23.26,
    23.45,
    23.77,
    23.37,
    23.41,
    23.42,
    24.19,
    24,
    24.82,
    24.5,
    24.27,
    23.91,
    24.78,
    25.2,
    24.67,
    24.27,
    24.01,
    24.3,
    25.63,
    26.01
   ]
  },
  "SPY": {
   "name": "State Street SPDR S&P 500 ETF Trust",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 752.1,
   "open": 759.45,
   "prevClose": 755.72,
   "change": -3.62,
   "changePct": -0.48,
   "dayHigh": 763.86,
   "dayLow": 751.6,
   "high52": 781.62,
   "low52": 629.28,
   "volume": 50778592,
   "closes": [
    774.83,
    779.09,
    777.22,
    773.93,
    778.57,
    778.1,
    778.01,
    769.6,
    771.79,
    763.25,
    766.48,
    769.05,
    773.09,
    763.96,
    759.97,
    765.37,
    769.66,
    772.31,
    769.36,
    755.72,
    752.1
   ]
  },
  "SQQQ": {
   "name": "ProShares UltraPro Short QQQ",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 43.55,
   "open": 40.99,
   "prevClose": 41.83,
   "change": 1.72,
   "changePct": 4.11,
   "dayHigh": 43.7,
   "dayLow": 40.24,
   "high52": 90.72,
   "low52": 31.42,
   "volume": 53112899,
   "closes": [
    32.25,
    31.83,
    32.07,
    33.37,
    32.95,
    33.63,
    33.99,
    36,
    36.14,
    38.9,
    37.52,
    37.68,
    36.48,
    39.6,
    39.68,
    38.38,
    36.93,
    36.28,
    37.83,
    41.83,
    43.55
   ]
  },
  "TGT": {
   "name": "Target Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 158.38,
   "open": 155.13,
   "prevClose": 154.38,
   "change": 4,
   "changePct": 2.59,
   "dayHigh": 159.29,
   "dayLow": 155,
   "high52": 170.75,
   "low52": 83.44,
   "volume": 4279508,
   "closes": [
    152.99,
    154.33,
    150.92,
    154.76,
    153.64,
    153.62,
    151.99,
    155.31,
    156.63,
    154.26,
    153.29,
    154,
    152.38,
    158.11,
    152.76,
    148.53,
    148.01,
    148.96,
    151.82,
    154.38,
    158.38
   ]
  },
  "TLRY": {
   "name": "Tilray Brands, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 2.55,
   "open": 2.58,
   "prevClose": 2.53,
   "change": 0.02,
   "changePct": 0.79,
   "dayHigh": 2.66,
   "dayLow": 2.52,
   "high52": 15.7,
   "low52": 2.49,
   "volume": 4611682,
   "closes": [
    3.72,
    3.78,
    3.72,
    3.59,
    3.54,
    3.36,
    3.27,
    3.14,
    3.21,
    3.04,
    3.03,
    3.03,
    2.92,
    2.93,
    2.81,
    2.72,
    2.77,
    2.69,
    2.64,
    2.53,
    2.55
   ]
  },
  "TMUS": {
   "name": "T-Mobile US, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 160.15,
   "open": 153.66,
   "prevClose": 156.44,
   "change": 3.71,
   "changePct": 2.37,
   "dayHigh": 160.48,
   "dayLow": 154,
   "high52": 224.75,
   "low52": 143.75,
   "volume": 7259759,
   "closes": [
    164.64,
    165.93,
    167.65,
    171.31,
    148.58,
    151.87,
    153.73,
    157.79,
    157.03,
    159.1,
    156.09,
    157.75,
    153.75,
    158.79,
    146.54,
    146.93,
    146.83,
    148.08,
    147.29,
    156.44,
    160.15
   ]
  },
  "TQQQ": {
   "name": "ProShares UltraPro QQQ",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 59.46,
   "open": 63.25,
   "prevClose": 62.01,
   "change": -2.55,
   "changePct": -4.11,
   "dayHigh": 64.35,
   "dayLow": 59.22,
   "high52": 88.09,
   "low52": 37.32,
   "volume": 73778531,
   "closes": [
    83.12,
    84.25,
    83.62,
    80.23,
    81.28,
    79.61,
    78.81,
    74.12,
    73.82,
    68.21,
    70.64,
    70.41,
    72.61,
    66.42,
    66.29,
    68.43,
    71.04,
    72.36,
    69.26,
    62.01,
    59.46
   ]
  },
  "TRIP": {
   "name": "Tripadvisor, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 9.44,
   "open": 9.32,
   "prevClose": 9.22,
   "change": 0.22,
   "changePct": 2.39,
   "dayHigh": 9.65,
   "dayLow": 9.26,
   "high52": 17.53,
   "low52": 8.02,
   "volume": 4001151,
   "closes": [
    8.79,
    8.52,
    8.63,
    8.96,
    8.68,
    8.72,
    8.74,
    8.93,
    9.39,
    9.32,
    9.27,
    9.51,
    9.44,
    9.67,
    9.41,
    9.24,
    8.98,
    8.94,
    9.22,
    9.22,
    9.44
   ]
  },
  "TSLA": {
   "name": "Tesla, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 403.82,
   "open": 404.66,
   "prevClose": 399.81,
   "change": 4.01,
   "changePct": 1,
   "dayHigh": 414.23,
   "dayLow": 397.61,
   "high52": 498.83,
   "low52": 297.38,
   "volume": 43129424,
   "closes": [
    378.73,
    380.68,
    377.81,
    375,
    382.7,
    378.03,
    375.23,
    367.16,
    362.44,
    354.72,
    368.06,
    373.71,
    386.47,
    374.58,
    372.22,
    391.62,
    407.46,
    404.22,
    403.3,
    399.81,
    403.82
   ]
  },
  "TTD": {
   "name": "The Trade Desk, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 12.55,
   "open": 12.38,
   "prevClose": 12.29,
   "change": 0.26,
   "changePct": 2.12,
   "dayHigh": 12.84,
   "dayLow": 12.38,
   "high52": 50.06,
   "low52": 11.62,
   "volume": 11576523,
   "closes": [
    11.98,
    11.92,
    12.09,
    12.34,
    12.08,
    11.94,
    12.17,
    12.18,
    13.13,
    12.23,
    12.26,
    12.65,
    12.59,
    13.16,
    13,
    12.77,
    12.7,
    12.76,
    13.06,
    12.29,
    12.55
   ]
  },
  "U": {
   "name": "Unity Software Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 38.87,
   "open": 38.37,
   "prevClose": 37.7,
   "change": 1.17,
   "changePct": 3.1,
   "dayHigh": 40.76,
   "dayLow": 38.32,
   "high52": 52.15,
   "low52": 16.78,
   "volume": 12147609,
   "closes": [
    45.68,
    44.95,
    45.44,
    45.89,
    46.88,
    46.68,
    46.63,
    41.4,
    43.34,
    40.4,
    40.58,
    40.16,
    41.21,
    40.27,
    40.79,
    40.33,
    40.1,
    39.5,
    39.27,
    37.7,
    38.87
   ]
  },
  "UAL": {
   "name": "United Airlines Holdings, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 109.24,
   "open": 108.96,
   "prevClose": 104.24,
   "change": 5,
   "changePct": 4.8,
   "dayHigh": 112.01,
   "dayLow": 108.12,
   "high52": 138.77,
   "low52": 84.64,
   "volume": 6632130,
   "closes": [
    110,
    111.87,
    110.17,
    107.44,
    107.46,
    104.44,
    103.23,
    98.96,
    101.31,
    96.1,
    95.6,
    97.77,
    101.67,
    102,
    97.93,
    100.69,
    104.71,
    103.43,
    105.21,
    104.24,
    109.24
   ]
  },
  "UBER": {
   "name": "Uber Technologies, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 66.71,
   "open": 66.12,
   "prevClose": 65.25,
   "change": 1.46,
   "changePct": 2.24,
   "dayHigh": 67.47,
   "dayLow": 65.55,
   "high52": 100.35,
   "low52": 64.04,
   "volume": 17740543,
   "closes": [
    69.48,
    69.08,
    68.45,
    70.24,
    71.51,
    71.5,
    71.32,
    69.29,
    71.27,
    70.35,
    69.96,
    68.94,
    67.62,
    69.07,
    66.7,
    66.13,
    65.78,
    65.27,
    65.74,
    65.25,
    66.71
   ]
  },
  "UFO": {
   "name": "Procure Space ETF",
   "exchange": "NASDAQ",
   "type": "ETF",
   "price": 39.89,
   "open": 40.63,
   "prevClose": 40.24,
   "change": -0.35,
   "changePct": -0.87,
   "dayHigh": 40.95,
   "dayLow": 39.76,
   "high52": 68.21,
   "low52": 30.89,
   "volume": 289149,
   "closes": [
    43.56,
    44.33,
    43.04,
    42.01,
    41.98,
    41.51,
    40.74,
    39.73,
    40.01,
    39.28,
    39.45,
    39.44,
    40.64,
    39.42,
    39.86,
    40.42,
    41.13,
    41.28,
    41.72,
    40.24,
    39.89
   ]
  },
  "UNH": {
   "name": "UnitedHealth Group Incorporated",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 400.44,
   "open": 406,
   "prevClose": 406.97,
   "change": -6.53,
   "changePct": -1.6,
   "dayHigh": 408.88,
   "dayLow": 394.11,
   "high52": 461.62,
   "low52": 255.97,
   "volume": 5899348,
   "closes": [
    378.58,
    376.32,
    375.98,
    370.95,
    379.3,
    378.52,
    377.76,
    395.62,
    406.67,
    401.43,
    406.88,
    419.26,
    417,
    424.98,
    418.09,
    410.7,
    410.39,
    407.1,
    410.91,
    406.97,
    400.44
   ]
  },
  "URBN": {
   "name": "Urban Outfitters, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 88.94,
   "open": 91.16,
   "prevClose": 90.72,
   "change": -1.78,
   "changePct": -1.96,
   "dayHigh": 92.35,
   "dayLow": 88.8,
   "high52": 93.64,
   "low52": 59.54,
   "volume": 1251455,
   "closes": [
    81.6,
    80.25,
    79.75,
    80.96,
    82.18,
    82.69,
    84.85,
    84.68,
    87.4,
    86.57,
    86.83,
    87.32,
    86.96,
    88.29,
    86.55,
    90.59,
    90.73,
    89.35,
    92.19,
    90.72,
    88.94
   ]
  },
  "V": {
   "name": "Visa Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 425.51,
   "open": 415.51,
   "prevClose": 413.59,
   "change": 11.92,
   "changePct": 2.88,
   "dayHigh": 426.78,
   "dayLow": 414.37,
   "high52": 426.78,
   "low52": 293.89,
   "volume": 7425819,
   "closes": [
    369.71,
    370.64,
    372.1,
    375.1,
    385.45,
    389.27,
    396.06,
    391.43,
    399.75,
    402.61,
    402.92,
    406.57,
    407.85,
    414.34,
    407.92,
    404.16,
    401.86,
    400.6,
    410.54,
    413.59,
    425.51
   ]
  },
  "VFC": {
   "name": "V.F. Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 19.39,
   "open": 18.58,
   "prevClose": 18.3,
   "change": 1.09,
   "changePct": 5.96,
   "dayHigh": 19.48,
   "dayLow": 18.47,
   "high52": 22.27,
   "low52": 12.46,
   "volume": 11541162,
   "closes": [
    14.27,
    14.45,
    14.38,
    14.53,
    15,
    15.79,
    16.07,
    16.48,
    17,
    16.85,
    17.14,
    17.46,
    17.15,
    17.48,
    17.26,
    16.95,
    17.03,
    17.23,
    18.33,
    18.3,
    19.39
   ]
  },
  "VGK": {
   "name": "Vanguard FTSE Europe ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 88.06,
   "open": 87.93,
   "prevClose": 87.54,
   "change": 0.52,
   "changePct": 0.59,
   "dayHigh": 88.49,
   "dayLow": 87.77,
   "high52": 93.29,
   "low52": 77.87,
   "volume": 2006619,
   "closes": [
    86.28,
    86.58,
    85.56,
    85.43,
    86.03,
    85.82,
    86.31,
    85.99,
    87.21,
    87.29,
    86.43,
    87.18,
    87.58,
    86.8,
    86.25,
    86.55,
    87.04,
    87.31,
    88.14,
    87.54,
    88.06
   ]
  },
  "VTI": {
   "name": "Vanguard Morningstar Total Stock Market ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 370,
   "open": 373.52,
   "prevClose": 371.57,
   "change": -1.57,
   "changePct": -0.42,
   "dayHigh": 375.64,
   "dayLow": 369.75,
   "high52": 385.12,
   "low52": 310.4,
   "volume": 6578469,
   "closes": [
    380.6,
    382.54,
    381.03,
    379.56,
    381.94,
    381.57,
    381.32,
    376.88,
    378.42,
    374.07,
    375.54,
    377.09,
    379.15,
    374.9,
    373.01,
    375.59,
    377.92,
    379.17,
    378.24,
    371.57,
    370
   ]
  },
  "WEN": {
   "name": "The Wendy's Company",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 7.26,
   "open": 7.22,
   "prevClose": 7.21,
   "change": 0.05,
   "changePct": 0.69,
   "dayHigh": 7.35,
   "dayLow": 7.17,
   "high52": 10.12,
   "low52": 5.94,
   "volume": 6008759,
   "closes": [
    6.1,
    6.16,
    6.11,
    6.22,
    6.23,
    6.31,
    6.35,
    6.44,
    6.7,
    6.7,
    6.68,
    6.52,
    6.28,
    6.57,
    6.22,
    6.19,
    6.14,
    7.07,
    7.17,
    7.21,
    7.26
   ]
  },
  "WFC": {
   "name": "Wells Fargo & Company",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 85.89,
   "open": 84.4,
   "prevClose": 83.4,
   "change": 2.49,
   "changePct": 2.99,
   "dayHigh": 86.03,
   "dayLow": 84.1,
   "high52": 97.76,
   "low52": 72.78,
   "volume": 18923647,
   "closes": [
    81.44,
    81.51,
    80.26,
    82.03,
    83.55,
    83.32,
    80.74,
    80.9,
    82.75,
    83.87,
    81.8,
    82.2,
    82.42,
    83.01,
    82.39,
    82.65,
    82.66,
    83.67,
    84.81,
    83.4,
    85.89
   ]
  },
  "WING": {
   "name": "Wingstop Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 163.04,
   "open": 153.46,
   "prevClose": 149.73,
   "change": 13.31,
   "changePct": 8.89,
   "dayHigh": 170.37,
   "dayLow": 152.89,
   "high52": 302.8,
   "low52": 95.82,
   "volume": 2973137,
   "closes": [
    106.84,
    112.2,
    116.68,
    118.5,
    122.26,
    126.02,
    125.76,
    122.9,
    131.03,
    131.72,
    132.75,
    130.31,
    119.95,
    120.87,
    119.54,
    122.88,
    123.52,
    138.57,
    145.39,
    149.73,
    163.04
   ]
  },
  "WMT": {
   "name": "Walmart Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 127.69,
   "open": 124.1,
   "prevClose": 123.51,
   "change": 4.18,
   "changePct": 3.38,
   "dayHigh": 127.94,
   "dayLow": 124.12,
   "high52": 135.16,
   "low52": 98.88,
   "volume": 27680627,
   "closes": [
    105.07,
    107.2,
    108.16,
    110.56,
    111.35,
    113.08,
    112.28,
    116.16,
    117.87,
    118.81,
    118.7,
    117.85,
    117.8,
    121.12,
    119.89,
    120.29,
    119.32,
    118.77,
    121.25,
    123.51,
    127.69
   ]
  },
  "WOOF": {
   "name": "Petco Health and Wellness Company, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 2.74,
   "open": 2.63,
   "prevClose": 2.61,
   "change": 0.13,
   "changePct": 4.98,
   "dayHigh": 2.77,
   "dayLow": 2.62,
   "high52": 3.78,
   "low52": 2.14,
   "volume": 4727059,
   "closes": [
    2.18,
    2.22,
    2.22,
    2.24,
    2.23,
    2.33,
    2.41,
    2.37,
    2.38,
    2.33,
    2.34,
    2.33,
    2.31,
    2.53,
    2.45,
    2.49,
    2.48,
    2.51,
    2.59,
    2.61,
    2.74
   ]
  },
  "XLE": {
   "name": "State Street Energy Select Sector SPDR ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 67.25,
   "open": 68.85,
   "prevClose": 70.02,
   "change": -2.77,
   "changePct": -3.96,
   "dayHigh": 69.14,
   "dayLow": 67.23,
   "high52": 70.15,
   "low52": 43.19,
   "volume": 50873640,
   "closes": [
    63.45,
    63.75,
    63.36,
    65.24,
    65.08,
    66.01,
    67.2,
    67.63,
    66.56,
    68.24,
    67.8,
    67.97,
    68.16,
    67.57,
    69.33,
    69.64,
    68.21,
    68.45,
    68.71,
    70.02,
    67.25
   ]
  },
  "XLF": {
   "name": "State Street Financial Select Sector SPDR ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 57.56,
   "open": 56.96,
   "prevClose": 56.51,
   "change": 1.05,
   "changePct": 1.86,
   "dayHigh": 57.7,
   "dayLow": 56.88,
   "high52": 58.6,
   "low52": 47.67,
   "volume": 41200451,
   "closes": [
    53.88,
    54.01,
    53.75,
    54.23,
    54.73,
    55.05,
    54.82,
    54.52,
    55.27,
    55.52,
    55.06,
    55.72,
    56.04,
    56.65,
    55.9,
    56.02,
    55.88,
    56.13,
    56.94,
    56.51,
    57.56
   ]
  },
  "XLV": {
   "name": "State Street Health Care Select Sector SPDR ETF",
   "exchange": "NYSE ARCA",
   "type": "ETF",
   "price": 184.6,
   "open": 184.69,
   "prevClose": 184.87,
   "change": -0.27,
   "changePct": -0.15,
   "dayHigh": 185.54,
   "dayLow": 183.38,
   "high52": 187.99,
   "low52": 141.97,
   "volume": 14062650,
   "closes": [
    167.37,
    167.09,
    168.81,
    168.16,
    170.81,
    171.99,
    169.66,
    173.96,
    177.19,
    176.71,
    175.65,
    179.82,
    178.94,
    181.3,
    179.28,
    179.28,
    179.18,
    179.72,
    184.04,
    184.87,
    184.6
   ]
  },
  "XOM": {
   "name": "ExxonMobil Holdings Corporation",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 179.67,
   "open": 183.98,
   "prevClose": 187.25,
   "change": -7.58,
   "changePct": -4.05,
   "dayHigh": 184.59,
   "dayLow": 179.67,
   "high52": 188.5,
   "low52": 112.51,
   "volume": 16459189,
   "closes": [
    164,
    164.48,
    164.05,
    168.5,
    168.94,
    172.15,
    174.08,
    177.01,
    174.68,
    178.98,
    178.28,
    177.86,
    178.09,
    178.23,
    183.21,
    184.54,
    179.91,
    182.02,
    183.29,
    187.25,
    179.67
   ]
  },
  "YETI": {
   "name": "YETI Holdings, Inc.",
   "exchange": "NYSE",
   "type": "EQUITY",
   "price": 45.42,
   "open": 44.87,
   "prevClose": 43.66,
   "change": 1.76,
   "changePct": 4.03,
   "dayHigh": 45.77,
   "dayLow": 44.65,
   "high52": 53.99,
   "low52": 32.26,
   "volume": 1322526,
   "closes": [
    40.52,
    40.25,
    39.47,
    39.6,
    39.79,
    39.01,
    39.34,
    40.51,
    42.02,
    43.07,
    42.12,
    42.55,
    42.77,
    44.03,
    42.79,
    43.57,
    42.25,
    42.91,
    44.19,
    43.66,
    45.42
   ]
  },
  "ZM": {
   "name": "Zoom Communications, Inc.",
   "exchange": "NASDAQ",
   "type": "EQUITY",
   "price": 91.98,
   "open": 95.69,
   "prevClose": 95.5,
   "change": -3.52,
   "changePct": -3.69,
   "dayHigh": 95.85,
   "dayLow": 91.39,
   "high52": 114.74,
   "low52": 70.7,
   "volume": 2525733,
   "closes": [
    93.62,
    94.2,
    94.77,
    94.67,
    97.74,
    97.94,
    98.16,
    94.47,
    98.51,
    94.19,
    97.59,
    97.46,
    99.44,
    96.2,
    95.77,
    98.04,
    97.4,
    100.26,
    97.66,
    95.5,
    91.98
   ]
  }
 },
 "indices": {
  "sp-500": {
   "symbol": "^GSPC",
   "price": 7541.4,
   "open": 7610.83,
   "prevClose": 7580.07,
   "change": -38.67,
   "changePct": -0.51,
   "dayHigh": 7662.23,
   "dayLow": 7539.38,
   "high52": 7844.52,
   "low52": 6316.91
  },
  "nasdaq": {
   "symbol": "^IXIC",
   "price": 25164.36,
   "open": 25600.17,
   "prevClose": 25437,
   "change": -272.64,
   "changePct": -1.07,
   "dayHigh": 25799.46,
   "dayLow": 25145.95,
   "high52": 27722.75,
   "low52": 20690.25
  },
  "dow-jones": {
   "symbol": "^DJI",
   "price": 51983.98,
   "open": 52008.23,
   "prevClose": 51770.31,
   "change": 213.67,
   "changePct": 0.41,
   "dayHigh": 52424.91,
   "dayLow": 51981.66,
   "high52": 54744.33,
   "low52": 45057.28
  }
 },
 "fx": {
  "usdInr": {
   "symbol": "USDINR=X",
   "price": 94.74,
   "open": 94.89,
   "prevClose": 94.9,
   "change": -0.16,
   "changePct": -0.17,
   "dayHigh": 94.89,
   "dayLow": 94.6,
   "high52": 97.05,
   "low52": 85.86
  }
 }
}
```

### `src/shared/data/usStocks.ts`

```ts
// US stocks — data more than one flow uses (the US Stocks flow, the Stocks home's US tab, the Market tab's US list).
// Prices are real: us-market-snapshot.json, from Yahoo Finance by `npm run us:snapshot` (scripts/us-market-snapshot.mjs),
// overrides the catalogue's numbers below and adds every other stock / ETF the app shows. `live.ts` makes them tick.
// Near-live, not live: the bundled copy is used at first, then the app re-reads ./us-market-snapshot.json (published by
// the build, refreshed every 15 minutes in US market hours by the site repo's Action, scripts/site-workflow-us.yml) on
// load and every 5 minutes, and updates the numbers below in place.
// Logos are in src/shared/assets/us-logos: full-colour SVGs (scripts/us-logos.mjs), PNGs for the few without one (L3 has company logos for Indian stocks only).
import { useSyncExternalStore } from 'react'
import bundled from './us-market-snapshot.json'
import { nudgeLive } from './live'

export type UsStock = {
  sym: string
  name: string
  price: number
  /** Day change, %. */
  change: number
  exchange: string
  /** Logo path (asset()) — overrides the catalogue logo. */
  logo?: string
  /** Logo plate colour behind a transparent logo. */
  plate?: string
}

export const catalogue: Record<string, Omit<UsStock, 'sym'>> = {
  NVDA: { name: 'NVIDIA Corp', price: 188.42, change: 1.24, exchange: 'NASDAQ' },
  AAPL: { name: 'Apple Inc', price: 262.82, change: 0.89, exchange: 'NASDAQ' },
  MSFT: { name: 'Microsoft Corp', price: 523.61, change: -0.42, exchange: 'NASDAQ' },
  GOOGL: { name: 'Alphabet Inc', price: 251.46, change: 0.92, exchange: 'NASDAQ' },
  GOOG: { name: 'Alphabet Inc', price: 252.03, change: 0.9, exchange: 'NASDAQ' },
  TSLA: { name: 'Tesla Inc', price: 433.72, change: 2.15, exchange: 'NASDAQ' },
  AMZN: { name: 'Amazon.com Inc', price: 224.21, change: -0.37, exchange: 'NASDAQ' },
  META: { name: 'Meta Platforms', price: 734, change: 0.64, exchange: 'NASDAQ' },
  NFLX: { name: 'Netflix Inc', price: 1187, change: -1.12, exchange: 'NASDAQ' },
  NKE: { name: 'Nike Inc', price: 64.3, change: 0.48, exchange: 'NYSE' },
  MCD: { name: 'McDonald’s Corp', price: 301.55, change: -0.21, exchange: 'NYSE' },
  KO: { name: 'Coca-Cola Co', price: 69.42, change: 0.18, exchange: 'NYSE' },
  SBUX: { name: 'Starbucks Corp', price: 84.1, change: -0.66, exchange: 'NASDAQ' },
  V: { name: 'Visa Inc', price: 344.7, change: 0.37, exchange: 'NYSE' },
  UBER: { name: 'Uber Technologies', price: 96.2, change: 1.05, exchange: 'NYSE' },
  AMD: { name: 'Advanced Micro Devices', price: 214.9, change: 3.12, exchange: 'NASDAQ' },
  AVGO: { name: 'Broadcom Inc', price: 342.37, change: 2.87, exchange: 'NASDAQ' },
  MU: { name: 'Micron Technology', price: 192.4, change: 1.4, exchange: 'NASDAQ' },
  LULU: { name: 'Lululemon Athletica', price: 168.3, change: -1.6, exchange: 'NASDAQ' },
  JPM: { name: 'JPMorgan Chase', price: 296.2, change: 0.31, exchange: 'NYSE' },
  // Mid and small caps — so the Market tab's cap filters have stocks in every tier.
  LYFT: { name: 'Lyft Inc', price: 22.4, change: 1.8, exchange: 'NASDAQ' },
  ETSY: { name: 'Etsy Inc', price: 61.2, change: -0.9, exchange: 'NASDAQ' },
  SONO: { name: 'Sonos Inc', price: 14.1, change: -1.3, exchange: 'NASDAQ' },
}

type SnapshotQuote = { name: string | null; exchange: string | null; price: number; changePct: number; open?: number | null; prevClose: number; dayHigh: number | null; dayLow: number | null; high52: number | null; low52: number | null; volume: number | null; closes: number[] }
type IndexQuote = { price: number; changePct: number }
type Snapshot = { source: string; fetchedAt: string; quotes: Record<string, SnapshotQuote>; indices: Record<string, IndexQuote>; fx?: { usdInr?: { price: number } } }

// The numbers in use now — the bundled snapshot's, replaced in place when a fresher one is read (see the runtime refresh).
const quotes: Record<string, SnapshotQuote> = { ...(bundled.quotes as unknown as Record<string, SnapshotQuote>) }
const indices: Record<string, IndexQuote> = { ...(bundled.indices as Record<string, IndexQuote>) }
const current = { fetchedAt: bundled.fetchedAt, source: bundled.source, usdInr: (bundled as unknown as Snapshot).fx?.usdInr?.price }

/** "Apple Inc." → "Apple Inc", "Airbnb, Inc." → "Airbnb Inc": the snapshot's legal names, as the app writes them. */
const tidyName = (name: string) => name.replace(/,? (Inc|Corp|Corporation|Co|Ltd|Plc|N\.V|S\.A)\.?$/i, (m) => ' ' + m.replace(/[,.]/g, '').trim()).replace(/\s+/g, ' ').trim()

// The snapshot's real price, day change and exchange for every symbol in it; the catalogue's own names stay.
function applyQuotes() {
  for (const [sym, q] of Object.entries(quotes)) {
    if (q.price == null) continue
    const known = catalogue[sym]
    catalogue[sym] = { name: known?.name ?? tidyName(q.name ?? sym), price: q.price, change: q.changePct, exchange: q.exchange ?? known?.exchange ?? 'NASDAQ' }
  }
}
applyQuotes()

/** When the US prices were taken (ISO time). */
export const usSnapshotAt = (): string => current.fetchedAt

/** The snapshot's full quote of a symbol (day range, 52-week range, volume, a month of closes), if it has one. */
export const usQuote = (symbol: string): SnapshotQuote | undefined => quotes[symbol]

/** Today's value of a US index (`sp-500`, `nasdaq`, `dow-jones`) from the snapshot. */
export const usIndexQuote = (id: string): IndexQuote | undefined => indices[id]

/** ₹ per $ in the snapshot (USDINR=X), or undefined if it has none. */
export const usdInrSnapshot = (): number | undefined => current.usdInr

// ── Runtime refresh ──────────────────────────────────────────────────────────────────────────────────────────────
const listeners = new Set<() => void>()

function apply(next: Snapshot) {
  if (!(next.fetchedAt > current.fetchedAt)) return // ISO strings sort by time; never go back to older data
  // A symbol the published file doesn't have yet (added to the app after the site's copy) keeps the numbers we have.
  Object.assign(quotes, next.quotes)
  Object.assign(indices, next.indices)
  Object.assign(current, { fetchedAt: next.fetchedAt, source: next.source, usdInr: next.fx?.usdInr?.price ?? current.usdInr })
  applyQuotes()
  listeners.forEach((l) => l())
  nudgeLive() // every ticking price re-renders now, not at the next tick
}

/** Re-read the published US snapshot (same origin — no API call). Fails quietly: the numbers we have stay. */
export async function refreshUsMarket() {
  try {
    const res = await fetch('us-market-snapshot.json', { cache: 'no-cache' })
    if (res.ok) apply(await res.json())
  } catch { /* offline, or the file isn't there — keep what we have */ }
}

const REFRESH_MS = 5 * 60 * 1000
if (typeof window !== 'undefined') {
  refreshUsMarket()
  setInterval(() => { if (document.visibilityState === 'visible') refreshUsMarket() }, REFRESH_MS)
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refreshUsMarket() })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

/** Re-renders the calling component when fresher US data arrives; returns its `fetchedAt`. */
export function useUsMarketSnapshot(): string {
  return useSyncExternalStore(subscribe, () => current.fetchedAt)
}

// A full-colour SVG (the mark on its brand colour, edge to edge — scripts/us-logos.mjs) wins over the older PNG (a mark on
// transparent, which shows on the L3 Avatar's grey); the PNG stays for the few symbols that have no SVG.
const logoFiles = import.meta.glob('../assets/us-logos/*.{png,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const symbolOf = (path: string) => path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
const logoBySymbol = new Map(
  Object.entries(logoFiles)
    .sort(([a], [b]) => Number(a.endsWith('.svg')) - Number(b.endsWith('.svg')))
    .map(([path, url]) => [symbolOf(path), url]),
)

/** Symbols that have a logo file in src/shared/assets/us-logos. */
export const usLogoSymbols: string[] = [...logoBySymbol.keys()].sort()

/** The logo of a US company (SVG or PNG URL), or undefined (show initials). */
export const usLogo = (symbol: string): string | undefined => logoBySymbol.get(symbol)

// Logos from financialmodelingprep.com (2 Nov, ETF holdings) are transparent marks drawn for a white page: they sit on
// a static white plate so dark marks (Intuitive Surgical, Rocket Lab, Sony) show in dark mode too; the white marks
// (Northrop Grumman, Samsung) sit on black.
const PLATED_WHITE = new Set('ABB ADI AMAT ASML ASTS BABA BIDU COP GE GRMN HXSCL ISRG KLAC LMT LRCX MRVL MUFG NVO NXPI PDD RKLB RTX SAP SONY TM TSM TXN'.split(' '))
const PLATED_BLACK = new Set(['NOC', 'SSNLF'])
/** The plate a US logo needs inside an Avatar ('white' / 'black'), or undefined when the file brings its own. */
export const usLogoPlate = (symbol: string): 'white' | 'black' | undefined =>
  PLATED_BLACK.has(symbol) ? 'black' : PLATED_WHITE.has(symbol) ? 'white' : undefined

// The stock being looked at: a list (Market tab, Search …) sets it, the stock page reads it.
let viewed: string | undefined

/** Remember which US stock the stock page should open. */
export const viewUsStock = (symbol: string) => { viewed = symbol }

/** The symbol set by the last `viewUsStock`, or undefined if none yet. */
export const viewedUsStock = () => viewed
```

### `src/shared/prototype.ts`

```ts
// Prototype behaviour the flows use — the ONLY way a flow touches the preview (src/preview). In a real app: interactive
// is always true, `go` is the app's navigation, and useAutoAdvance is "when the server answers, go on" (a loader /
// polling step).
import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

export type Preview = {
  /**
   * Prototype (true): real modal L3 BottomSheets, taps move to the next screen, loaders advance on their own.
   * Board (false): every screen frozen as in the Figma board — sheets are drawn as static surfaces.
   */
  interactive: boolean
  /** Go to another screen of the flow (by id). Does nothing on the board. */
  go: (id: string) => void
  /** The screen being shown — a new id gives the sheet a fresh mount while the page behind it stays put. */
  screenId?: string
  /** Back to the screen shown before this one in the prototype (any flow); false when there's none to go back to. */
  back?: () => boolean
  /** The screen was reached by going back (a back button, or a screen earlier in the app) — a page can come back as it was left. */
  cameBack?: boolean
}

export const PreviewContext = createContext<Preview>({ interactive: false, go: () => {} })
export const usePreview = () => useContext(PreviewContext)

/** Prototype only: after `ms`, go to `next` (loaders, "Verifying…"). */
export function useAutoAdvance(next: string | undefined, ms: number) {
  const { interactive, go } = usePreview()
  useEffect(() => {
    if (!interactive || !next) return
    const t = window.setTimeout(() => go(next), ms)
    return () => window.clearTimeout(t)
  }, [interactive, next, ms, go])
}

/** How long a loader or "Verifying…" state stays up in the prototype. */
export const LOADING_MS = 1600

// ---- Flow options (prototype settings such as a design version) ----------------------------------------------------
// Picked in the preview (desktop panel, or the settings sheet on a phone), remembered per browser. A real app has no
// such switch: it ships one version.

// The key carries the option's default: when a flow changes its default (e.g. to a new version), earlier picks reset.
const optionKey = (flow: string, option: string, fallback: string) => `prototype-option:${flow}.${option}@${fallback}`
const optionListeners = new Set<() => void>()

function readOption(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

/** The preview sets an option (and every screen reading it re-renders). */
export function setFlowOption(flow: string, option: string, fallback: string, value: string) {
  const key = optionKey(flow, option, fallback)
  try { localStorage.setItem(key, value) } catch { /* storage off: this visit only */ }
  memory.set(key, value)
  optionListeners.forEach((l) => l())
}

const memory = new Map<string, string>()

/** A flow's prototype option: the picked value, or `fallback` (the option's default) when none is picked. */
export function useFlowOption(flow: string, option: string, fallback: string) {
  return useSyncExternalStore(
    (onChange) => { optionListeners.add(onChange); return () => { optionListeners.delete(onChange) } },
    () => memory.get(optionKey(flow, option, fallback)) ?? readOption(optionKey(flow, option, fallback)) ?? fallback,
  )
}

type OptionLike = { id: string; default: string; showIf?: Record<string, string[]> }

/** Every option of a flow as it's set now (the settings panel's show / hide and nesting). */
export function useFlowOptionValues(flow: { id: string; options?: OptionLike[] }): Record<string, string> {
  const snap = useSyncExternalStore(
    (onChange) => { optionListeners.add(onChange); return () => { optionListeners.delete(onChange) } },
    () => JSON.stringify(Object.fromEntries((flow.options ?? []).map((o) => {
      const key = optionKey(flow.id, o.id, o.default)
      return [o.id, memory.get(key) ?? readOption(key) ?? o.default]
    }))),
  )
  return JSON.parse(snap)
}

/** Whether an option matters right now (every option it depends on has one of the listed values, all the way up). */
export function optionShown(options: OptionLike[], option: OptionLike, values: Record<string, string>): boolean {
  return Object.entries(option.showIf ?? {}).every(([id, allowed]) => {
    const parent = options.find((o) => o.id === id)
    return allowed.includes(values[id]) && (!parent || optionShown(options, parent, values))
  })
}

/** How deep an option sits under the ones it depends on (0 = top level) — the panel indents it that much. */
export function optionDepth(options: OptionLike[], option: OptionLike): number {
  const parents = Object.keys(option.showIf ?? {}).map((id) => options.find((o) => o.id === id)).filter(Boolean) as OptionLike[]
  return parents.length ? 1 + Math.max(...parents.map((p) => optionDepth(options, p))) : 0
}

/** How many of a flow's options are off their default (the settings panel's badge). */
export function useFlowOptionsChanged(flow: { id: string; options?: { id: string; default: string }[] }) {
  return useSyncExternalStore(
    (onChange) => { optionListeners.add(onChange); return () => { optionListeners.delete(onChange) } },
    () => (flow.options ?? []).filter((o) => {
      const key = optionKey(flow.id, o.id, o.default)
      return (memory.get(key) ?? readOption(key) ?? o.default) !== o.default
    }).length,
  )
}

/**
 * Typing on a phone uses the phone's own keyboard (a touch screen, `pointer: coarse`) — the prototype's drawn keyboard
 * stays hidden. On a laptop the drawn keyboard shows (for the look) and the laptop's keys type into the focused field.
 */
export function useSystemKeyboard() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
}
```

### `src/shared/ui/IlliquidSheet.module.css`

```css
/* “What does illiquidity mean?” sheet — the DASH Pine Script sheet's points pattern, on L3 tokens. */
/* No padding of its own: the sheet's content area already frames it. */
.body { padding: 0; }
.points { display: flex; flex-direction: column; gap: var(--l3-spacing-12); margin: 0; padding: 0; list-style: none; }
.point { display: flex; align-items: center; gap: var(--l3-spacing-12); min-height: var(--l3-size-32); font: var(--l3-text-description-14); color: var(--l3-content-primary); }
.pointIcon { display: grid; flex: none; place-items: center; width: var(--l3-size-32); height: var(--l3-size-32); border-radius: var(--l3-radius-08); background: var(--l3-surface-secondary); color: var(--l3-content-secondary); }
```

### `src/shared/ui/IlliquidSheet.tsx`

```tsx
import { useId } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { msCompareArrows, msGroup, msShieldFill } from '@l3/icons/material'
import { Sheet } from './Sheet'
import styles from './IlliquidSheet.module.css'

export type IlliquidSheetCopy = {
  /** “What does illiquidity mean?” */
  title: string
  /** “{contract} is ILLIQUID right now”, or a general line. */
  description: string
  /** The three points: few traders · prices far apart (slippage) · Lemonn blocks orders. */
  points: [string, string, string]
  /** “Got it”. */
  ok: string
}

/**
 * “What does illiquidity mean?” — one sheet for every illiquid entry point in the app (F&O option chain, asset page,
 * Buy / Sell sheet, Gold Summary, Search). Small header, three icon + one-line points in a card (the DASH Pine Script
 * sheet's pattern), Got it. Each flow passes its own words (its copy.json).
 */
export function IlliquidSheet({ copy, onClose }: { copy: IlliquidSheetCopy; onClose: () => void }) {
  const id = useId()
  const icons = [msGroup, msCompareArrows, msShieldFill]
  return <Sheet labelledBy={id} onClose={onClose}
    header={<BottomSheetHeader headingId={id} heading={copy.title} description={copy.description} />}
    footer={<ButtonGroup aria-label={copy.title}><Button onClick={onClose}>{copy.ok}</Button></ButtonGroup>}>
    <div className={styles.body}>
      <Card as="section" aria-label={copy.title}>
        <ul className={styles.points}>{copy.points.map((text, i) => <li key={text} className={styles.point}>
          <span className={styles.pointIcon}><Icon icon={icons[i]} size={16} /></span>{text}
        </li>)}</ul>
      </Card>
    </div>
  </Sheet>
}
```

### `src/shared/ui/Screen.module.css`

```css
/*
 * One phone screen: the OS status bar, then the page — top bar, a body that scrolls and fills the space, the bottom
 * bar / button dock — with an optional toast just above the bottom and a sheet over everything.
 */
.screen {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: clip; /* clip, not hidden: a sheet taking focus while it slides in can't scroll the screen */
  background: var(--l3-surface-default);
  color: var(--l3-content-primary);
  /* An app, not a page: swiping and long-pressing never select text (fields still do — see below). */
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.screen :is(input, textarea, [contenteditable='true']) {
  user-select: text;
  -webkit-user-select: text;
}

.page {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.middle {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
}

/* Like a phone: no scrollbar that stays on screen — the page, rails and open sheets still scroll (touch, wheel, keys). */
.screen,
.screen * {
  scrollbar-width: none;
}

.screen ::-webkit-scrollbar {
  display: none;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-x: hidden; /* a screen never scrolls sideways — only rails inside it do */
  overflow-y: auto;
}

/* Floating toast: sits on the bottom edge of the body, above the dock / navbar (L3 Aerobar rule). */
.toast {
  position: absolute;
  inset: auto 0 0;
}

/* The prototype's modal L3 sheet is portalled into this screen — lift it above the bottom bars. */
.screen.screen > [data-contained] {
  z-index: var(--app-layer-sheet);
}
```

### `src/shared/ui/Screen.tsx`

```tsx
import { Fragment, useState, type ReactNode } from 'react'
import { usePreview } from '../prototype'
import { SheetHost } from './Sheet'
import styles from './Screen.module.css'

type ScreenProps = {
  /** Actionbar (or nothing on full-bleed screens like the welcome screen). */
  top?: ReactNode
  /** Bottom navbar, button dock (ButtonGroup) or the keypad. */
  bottom?: ReactNode
  /** A floating Aerobar toast — shown just above `bottom`. */
  toast?: ReactNode
  /** A Sheet over the screen. */
  sheet?: ReactNode
  /** Screen content: scrolls when taller than the space between `top` and `bottom`. */
  children?: ReactNode
  /** A flow's own styling hook on the screen root (e.g. an experiment scoped to one flow). */
  className?: string
}

/**
 * The frame of every screen: top · body · bottom, a toast above the bottom, and a sheet over it all. It fills the
 * space between the OS status bar and the OS navigation bar (the preview draws those — real apps get them from the
 * OS, edge-to-edge insets), so nothing sits under the gesture handle. The screen is the sheet's container, so sheets
 * and their scrim stay in the app; its SheetHost keeps one sheet open while the screen's sheet changes (no scrim flash
 * between two sheets). Mark a bottom part with data-surface="primary" | "secondary" if the navigation bar should take
 * its colour (the button dock and the bottom navbar are recognised already).
 */
export function Screen({ top, bottom, toast, sheet, children, className }: ScreenProps) {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const { screenId } = usePreview()
  return (
    <div ref={setEl} className={[styles.screen, className].filter(Boolean).join(' ')}>
      <SheetHost container={el}>
        <div className={styles.page} data-part="page">
          {top}
          <div className={styles.middle}>
            <div className={styles.body}>{children}</div>
            {toast && <div className={styles.toast}>{toast}</div>}
          </div>
          {bottom}
        </div>
        <Fragment key={screenId}>{sheet}</Fragment>
      </SheetHost>
    </div>
  )
}
```

### `src/shared/ui/Sheet.module.css`

```css
/* Board only: the static sheet sits on the bottom edge of the screen, over the L3 Overlay — shown at rest, no fade-in. */
.scrim {
  z-index: var(--app-layer-scrim);
  transition: none;
}

.dock {
  position: absolute;
  inset: auto 0 0;
  z-index: var(--app-layer-sheet);
  display: flex;
  flex-direction: column;
  max-height: calc(100% - var(--l3-size-48));
}

/* A top sheet (placement="top") hangs from the top edge instead. */
.dock[data-placement='top'] {
  inset: 0 0 auto;
}
```

### `src/shared/ui/Sheet.tsx`

```tsx
import { createContext, useCallback, useContext, useId, useLayoutEffect, useState, type ReactNode } from 'react'
import { BottomSheet, BottomSheetSurface } from '@l3/components/BottomSheet'
import { Overlay } from '@l3/components/Overlay'
import { usePreview } from '../prototype'
import styles from './Sheet.module.css'

/** Lets the L3 sheet play its exit before the next screen replaces it (≈ motion/duration-medium). */
const SHEET_EXIT_MS = 240

type SheetProps = {
  header?: ReactNode
  children?: ReactNode
  /** The button dock — a <ButtonGroup>. */
  footer?: ReactNode
  /** Id of the header's heading (BottomSheetHeader `headingId`). */
  labelledBy?: string
  /** Accessible name when there's no header (loaders). */
  label?: string
  /** Prototype: where a backdrop tap, drag down or Esc goes. Leave out for sheets that can't be dismissed (loaders). */
  onClose?: () => void
  /** A screen's own styling hook on the sheet surface (e.g. a sheet that brings its own layout and no padding). */
  className?: string
  /** 'top' (L3 isBottom=False): drops from the top of the screen, for menus tied to the top (a market or sort picker). */
  placement?: 'bottom' | 'top'
}

type Publish = (id: string, sheet: SheetProps | null) => void
const SheetHostContext = createContext<Publish | null>(null)

/**
 * An L3 bottom sheet over the screen.
 * Prototype: the real modal <BottomSheet> (focus trap, drag to close, scrim tap), drawn by the screen's SheetHost —
 * so when one sheet leads to another over the same page, the scrim stays and only the sheet's content changes.
 * Board: the same surface drawn statically with the L3 Overlay — dozens of open modals on one page would fight
 * over focus, so the board shows <BottomSheetSurface>, which is what the modal renders inside.
 */
export function Sheet(props: SheetProps) {
  const { interactive } = usePreview()
  const publish = useContext(SheetHostContext)
  const id = useId()
  const hosted = interactive && publish !== null

  // Hand the latest content to the host on every render; take it back when this sheet goes away.
  useLayoutEffect(() => { if (hosted) publish(id, props) })
  useLayoutEffect(() => (hosted ? () => publish(id, null) : undefined), [hosted, publish, id])

  if (hosted) return null
  const { header, children, footer, labelledBy, label, className, placement = 'bottom' } = props
  return (
    <>
      <Overlay open className={styles.scrim} />
      <div className={styles.dock} data-placement={placement} role="dialog" aria-labelledby={labelledBy} aria-label={label}>
        <BottomSheetSurface header={header} footer={footer} className={className} placement={placement}>{children}</BottomSheetSurface>
      </div>
    </>
  )
}

/**
 * Prototype: one modal L3 BottomSheet per screen, kept open while the screen's sheet changes (sheet → sheet swaps
 * the content in place, no scrim flash or slide). It closes with its exit animation when the screen has no sheet.
 */
export function SheetHost({ container, children }: { container: HTMLElement | null; children: ReactNode }) {
  const [shown, setShown] = useState<{ id: string; sheet: SheetProps; open: boolean } | null>(null)
  const publish = useCallback<Publish>((id, sheet) => {
    setShown((s) => (sheet ? { id, sheet, open: true } : s && s.id === id ? { ...s, open: false } : s))
  }, [])

  const close = () => {
    const onClose = shown?.sheet.onClose
    if (!onClose) return
    setShown((s) => s && { ...s, open: false })
    window.setTimeout(onClose, SHEET_EXIT_MS)
  }

  return (
    <SheetHostContext.Provider value={publish}>
      {children}
      {container && shown && (
        <BottomSheet
          open={shown.open}
          onClose={close}
          container={container}
          header={shown.sheet.header}
          footer={shown.sheet.footer}
          aria-labelledby={shown.sheet.labelledBy}
          aria-label={shown.sheet.label}
          className={shown.sheet.className}
          placement={shown.sheet.placement}
        >
          {shown.sheet.children}
        </BottomSheet>
      )}
    </SheetHostContext.Provider>
  )
}
```

### `src/shared/ui/TextKeyboard.module.css`

```css
/* OS text keyboard mock (Figma "L3: System keyboard", 260 tall at 360): 5 rows of 40 tall keys on a grey tray. */
.keyboard {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-08);
  padding: var(--l3-spacing-12) var(--l3-spacing-06) var(--l3-spacing-16);
  /* On a real phone, clear the home indicator (like the L3 button dock does). */
  padding-bottom: calc(var(--l3-spacing-16) + env(safe-area-inset-bottom, var(--l3-spacing-00)));
  background: var(--l3-surface-secondary);
}

.row {
  display: flex;
  gap: var(--l3-spacing-04);
}

/* The A–L row is inset by about half a key, like a phone keyboard. */
.row[data-row='2'] {
  padding-inline: var(--l3-spacing-16);
}

.key {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: var(--l3-size-40);
  padding: 0;
  border: 0;
  border-radius: var(--l3-radius-08);
  background: var(--l3-surface-primary);
  color: var(--l3-content-primary);
  font: var(--l3-text-description-18);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.key[data-wide] {
  flex-grow: 1.5;
}

.key[data-kind='space'] {
  flex-grow: 5;
  font: var(--l3-text-label-12);
}

.key[data-kind='fn'] {
  background: var(--l3-surface-tertiary);
  font: var(--l3-text-label-14);
}

/* The keyboard's action key (Search) — the phone's own accent, not an app colour. */
.key[data-kind='go'] {
  background: var(--l3-surface-accent-discover-default);
  color: var(--l3-content-inverted);
}

.key :is(svg, span):not(.popup) {
  width: var(--l3-icon-size-20);
  height: var(--l3-icon-size-20);
}

/* Function keys (Shift, Delete, ?123, Space, Enter): pressed, they darken and give a little. */
.key:not([data-kind='letter'])[data-held] {
  background-image: linear-gradient(var(--l3-state-layer-dark-pressed), var(--l3-state-layer-dark-pressed));
  transform: scale(var(--l3-motion-scale-press-default));
}

/*
 * Letter keys: while held, a magnified bubble of the key pops up above it (Gboard / iPhone): the key's width plus a
 * little, two keys tall, the character large near its top; it grows out of the key (120 ms). The key itself dims under
 * it. Keys at a row's ends keep the bubble inside the keyboard's edge.
 */
.key {
  position: relative;
}

.key[data-kind='letter'][data-held] {
  background: var(--l3-surface-tertiary);
}

.popup {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: calc(100% + var(--l3-spacing-12));
  height: calc(var(--l3-size-40) * 2 + var(--l3-spacing-08));
  padding-top: var(--l3-spacing-06);
  border-radius: var(--l3-radius-12);
  background: var(--l3-surface-primary);
  box-shadow: var(--l3-shadow-elevation-high);
  color: var(--l3-content-primary);
  font: var(--l3-text-heading-28);
  pointer-events: none;
  transform: translateX(-50%);
  transform-origin: 50% 100%;
  animation: key-pop var(--l3-motion-duration-short) var(--l3-motion-easing-decelerate) both;
}

.key[data-edge='start'] .popup {
  left: 0;
  transform: none;
  transform-origin: 0 100%;
}

.key[data-edge='end'] .popup {
  right: 0;
  left: auto;
  transform: none;
  transform-origin: 100% 100%;
}

@keyframes key-pop {
  from {
    opacity: 0;
    scale: 0.6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .key:not([data-kind='letter'])[data-held] {
    transform: none;
  }

  .popup {
    animation: none;
  }
}
```

### `src/shared/ui/TextKeyboard.tsx`

```tsx
import { useState, type PointerEvent } from 'react'
import { Icon } from '@l3/components/Icon'
import { msArrowUpward, msBackspace, msKeyboardTab } from '@l3/icons/material'
import styles from './TextKeyboard.module.css'

type Key = { key: string; label?: string; kind?: 'letter' | 'fn' | 'space' | 'go'; wide?: boolean }

const ROWS: Key[][] = [
  '1234567890'.split('').map((k) => ({ key: k })),
  'QWERTYUIOP'.split('').map((k) => ({ key: k })),
  'ASDFGHJKL'.split('').map((k) => ({ key: k })),
  [{ key: 'Shift', kind: 'fn', wide: true }, ...'ZXCVBNM'.split('').map((k) => ({ key: k })), { key: 'Backspace', kind: 'fn', wide: true }],
  [{ key: '?123', kind: 'fn', wide: true }, { key: ',' }, { key: ' ', label: 'EN • LV', kind: 'space' }, { key: '.' }, { key: 'Enter', kind: 'go', wide: true }],
]

/**
 * The phone's own text keyboard (OS chrome, NOT part of the app or L3 — Figma "L3: System keyboard", isNumeric =
 * False). Drawn so search screens read like the phone; in the prototype the keys type into the screen. Real apps get the
 * system keyboard by focusing the text field (search: `enterKeyHint="search"`). `data-surface` tells the OS navigation
 * bar below it to take the keyboard's grey.
 */
export function TextKeyboard({ onKey }: { onKey?: (key: string) => void }) {
  // The key being held: a letter / digit / punctuation key shows its pop-up (a magnified bubble above it, like Gboard and
  // the iPhone keyboard) until the finger lifts; function keys just darken.
  const [held, setHeld] = useState<string | null>(null)
  const release = () => setHeld(null)
  return (
    <div className={styles.keyboard} role="group" aria-label="Keyboard" data-surface="secondary">
      {ROWS.map((row, i) => (
        <div key={i} className={styles.row} data-row={i}>
          {row.map((k, j) => (
            <button
              key={k.key}
              type="button"
              className={styles.key}
              data-kind={k.kind ?? 'letter'}
              data-wide={k.wide || undefined}
              data-held={held === k.key || undefined}
              data-edge={j === 0 ? 'start' : j === row.length - 1 ? 'end' : undefined}
              aria-label={label(k)}
              onPointerDown={(e) => {
                keepFocus(e)
                setHeld(k.key)
              }}
              onPointerUp={release}
              onPointerLeave={release}
              onPointerCancel={release}
              onClick={() => onKey?.(k.key)}
            >
              {k.key === 'Shift' ? <Icon icon={msArrowUpward} /> : k.key === 'Backspace' ? <Icon icon={msBackspace} /> : k.key === 'Enter' ? <Icon icon={msKeyboardTab} /> : (k.label ?? k.key)}
              {(k.kind ?? 'letter') === 'letter' && held === k.key && (
                <span className={styles.popup} aria-hidden="true">{k.label ?? k.key}</span>
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

const label = (k: Key) =>
  ({ Shift: 'Shift', Backspace: 'Delete', Enter: 'Search', ' ': 'Space', '?123': 'Numbers and symbols' } as Record<string, string>)[k.key]

/** Like the OS keyboard, a key press doesn't take focus: the field being typed into keeps its Typing state. */
const keepFocus = (e: PointerEvent) => e.preventDefault()

/** Apply a keyboard key to a text value: letters, digits, space, comma, full stop and delete (Shift / ?123 do nothing here). */
export const typeText = (value: string, key: string) => {
  if (key === 'Backspace') return value.slice(0, -1)
  if (key.length !== 1) return value
  // Like a phone keyboard: the first letter is a capital, the rest lower case.
  return value + (value === '' ? key.toUpperCase() : key.toLowerCase())
}
```
