# Flow: Search (`search`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Search stocks, F&O contracts, mutual funds and IPOs; Smart Options & Futures lists; add to watchlist.

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
- **Status:** ✅ · last updated 2026-10-19
- **Entry:** the search field on Stocks home (`stocks-01`), or the Search action on Market (`market-01` → `search-24`) ·
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
stocks-01 search field ─▶ search-01 ─type─▶ results in place (search-02 …) · tabs switch in place · ✕ / Clear Search ─▶ before typing
search-06 tile / View All ─▶ search-09 ─back─▶ search-06        (↕ pill, list pills and Price ↕ change the list in place)
search-02 bookmark ─▶ search-18 ─tick─▶ search-19 ─Save─▶ search-20 (toast) ─OK / auto─▶ search-21
                      search-18 + Create ─▶ search-22 ─Create─▶ search-20 · no watchlist yet: bookmark ─▶ search-22
any screen ─back─▶ where Search was opened from (stocks-01 / market-01)
```

### Data

`data.ts` (types = the API contract, values = examples from Figma):
- `search(query)` → `SearchResults` `{ query, counts: {stocks, fno, mf, ipo}, tabs: { [tab]: { watchlists, listTitle, items } } }`.
  A tab with no entry shows the empty state. Real app: one search call per (debounced) query.
- `WatchlistMatch` `{ id, name, initials, count? }` — `count` ("2 stocks") on the Stocks tab only.
- `SearchResult` `{ id, name, detail, initials?, logoUrl?, price?, changePct?, returnsLabel?, priceBand?, volume?, saved? }`
  — stocks: logo + price + change; contracts: no logo; funds: no logo, "3Y" + returns; IPOs: logo + price band.
- Before typing: `recent[tab]` (max 5), `popular[tab]` (1–2 rows), `signalCategories`, `collections`, `ipoLists`.
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
| Result row | ListCell (plain, small, breathable) + Avatar + PriceChange | `size="sm" density="breathable" as="button"` (70 tall); right: price (Label/12) over `PriceChange size="sm" arrow`; 1px `border/light` line under each row, 16 in |
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
import { inr } from '../../../shared/data/format'
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
  const top = item.returnsLabel ?? (item.price !== undefined ? inr(item.price) : undefined)
  if (top === undefined) return null
  return (
    <span className={styles.stack}>
      <span className={styles.value}>{top}</span>
      {item.changePct !== undefined && <PriceChange value={item.changePct} size="sm" arrow />}
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
  "tab.fno": "F&O",
  "tab.mf": "MF",
  "tab.ipo": "IPO",
  "tab.withCount": "{tab} ({count})",
  "tabs.label": "Search in",
  "field.stocks": "Search stocks",
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

export type SearchTab = 'stocks' | 'fno' | 'mf' | 'ipo'

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

export const recent: Record<SearchTab, SearchChip[]> = {
  stocks: [
    { label: 'Bharat Coking Coal Ltd.', initials: 'B' },
    { label: 'Saregama India Ltd.', initials: 'S' },
    { label: 'NIFTY 50', initials: 'N' },
    { label: 'Reliance Industries Ltd', initials: 'R' },
    { label: 'Tata Motors Passenger Vehicles Ltd.', initials: 'T' },
  ],
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
  counts: { stocks: bankStocks.length, fno: bankContracts.length, mf: bankFunds.length, ipo: 0 },
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
  counts: { stocks: 1, fno: 0, mf: 0, ipo: 0 },
  tabs: { stocks: { watchlists: [{ id: 'penny', name: 'Penny stocks', initials: 'P', count: 7 }], listTitle: 'Stocks', items: [] } },
}

/** "Energy": two IPOs. */
export const energy: SearchResults = {
  query: 'Energy',
  counts: { stocks: 3, fno: 1, mf: 0, ipo: 2 },
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
  counts: { stocks: 0, fno: goldContracts.length, mf: 0, ipo: 0 },
  tabs: { fno: { watchlists: [], listTitle: 'Contracts', items: goldContracts } },
}

/** A query nothing matches ("Vanf", "Adsf"): the empty state on every tab. */
export const nothing = (query: string): SearchResults => ({ query, counts: { stocks: 0, fno: 0, mf: 0, ipo: 0 }, tabs: {} })

/**
 * Prototype search: the sample result sets above, matched as you type ("Ba" → Bank). Anything else finds nothing.
 * Real app: a search API call per query (debounced), returning SearchResults. An empty query = nothing typed yet.
 */
export function search(query: string): SearchResults | undefined {
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  const sample = [bank, penny, energy, gold].find((s) => s.query.toLowerCase().startsWith(q))
  return sample ? { ...sample, query } : nothing(query)
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
import type { Flow, Go } from '../types'
import { t } from './copy'
import { allWatchlists, bank, bankNoWatchlist, energy, fewWatchlists, nothing, penny, type SearchResult } from './data'
import { Search } from './screens/Search'
import { Signals } from './screens/Signals'
import { AddToWatchlistSheet, CreateWatchlistSheet } from './sheets/WatchlistSheets'

/** HDFC Bank after it's been added to a watchlist (plus Bank of Baroda, already in one). */
const savedAfter = ['BANKBARODA', 'HDFCBANK']

/**
 * Search — the search screen for Stocks, F&O, MF and IPO (one screen, four tabs), F&O's Smart Options & Futures lists,
 * and adding a result to a watchlist. Figma: "Search → 🌙 Dark" (4912:12950) in the dev handoff file — final D2
 * layouts, rebuilt with L3 components and tokens without changing the layout.
 */
/**
 * Tapping a result: commodity contracts (they carry artwork) open their asset page in F&O — fno-21, or the ILLIQUID
 * asset page fno-22. Other results have no page in this prototype yet.
 */
const openResult = (go: Go) => (item: SearchResult) => { if (item.image) go(item.illiquid ? 'fno-22' : 'fno-21') }

export const search: Flow = {
  id: 'search',
  title: 'Search',
  description: 'Search stocks, F&O contracts, mutual funds and IPOs; Smart Options & Futures lists; add to watchlist.',
  figmaFile: 'sG24GPizTdwbMBxLm0IpTA',
  sections: [
    { id: 'stocks', title: 'Stocks' },
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
  collections, ipoLists, popular, recent, search, signalCategories,
  type SearchResult, type SearchResults, type SearchTab,
} from '../data'
import { t } from '../copy'
import styles from './Search.module.css'

const TABS: SearchTab[] = ['stocks', 'fno', 'mf', 'ipo']

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
  /** A result row opens its page (commodity contracts → the asset page; illiquid → the ILLIQUID asset page). */
  onOpen?: (item: SearchResult) => void
}

/**
 * Search — one screen for Stocks, F&O, MF and IPO. The top bar is the search field (back · field · ✕ once something is
 * typed) with the four tabs in its bottom slot; each tab shows its result count once there's a query.
 * Before typing: recent and popular searches (chips), plus F&O's Smart Options & Futures, MF's collections or the IPO
 * lists. After typing: the matching watchlists, then the results (with a bookmark each). No match on a tab: the L3
 * empty state with "Clear Search". The phone keyboard stays up while searching.
 */
export function Search({ tab: initialTab = 'stocks', query: initialQuery, results, saved, keyboard = true, sheet, toast, onBack, onBookmark, onSignals, onOpen }: SearchProps) {
  const { interactive } = usePreview()
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
          onBack={onBack}
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
        <BeforeTyping tab={tab} onSignals={onSignals} />
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
function BeforeTyping({ tab, onSignals }: { tab: SearchTab; onSignals?: (category: string) => void }) {
  return (
    <Section paddingBlock="16" gap="24">
      <SearchChips title={t('recent.title')} rows={[recent[tab]]} />
      <SearchChips title={t('popular.title')} rows={popular[tab]} />
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

/** "9876543210" → "98765 43210" (how Indian mobile numbers are read out). */
export const phone = (digits: string) => (digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits)

/** Keep the last `visible` characters: mask('ABCPM1234K', 1, 5) → "ABCPM****K". */
export const mask = (s: string, keepStart: number, keepEnd: number) =>
  s.slice(0, keepStart) + '•'.repeat(Math.max(0, s.length - keepStart - keepEnd)) + s.slice(s.length - keepEnd)
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
  const { header, children, footer, labelledBy, label, className } = props
  return (
    <>
      <Overlay open className={styles.scrim} />
      <div className={styles.dock} role="dialog" aria-labelledby={labelledBy} aria-label={label}>
        <BottomSheetSurface header={header} footer={footer} className={className}>{children}</BottomSheetSurface>
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
