# Flow: Market (`market`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `6de43c8` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

The Market tab — Indian and US stock lists (all, gainers, losers, under 100 / 500) and Filters.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/market · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/market.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `market-01` | Market · All | — | `search-24`, `us-stocks-13` | The filter bar shows "Apply filters" until something is applied. |
| `market-02` | Market · Top gainers | — | `search-24`, `us-stocks-13` | Same layout — only the list changes. |
| `market-03` | Market · Top losers | — | `search-24`, `us-stocks-13` |  |
| `market-04` | Market · Under ₹100 | — | `search-24`, `us-stocks-13` |  |
| `market-05` | Filters | — | `search-24`, `us-stocks-13` | Side tabs on the left (grey rail, the open one connected to the pane); only the open group on the right. Opens on Sort by. |
| `market-06` | Filters · indices | — | `search-24`, `us-stocks-13` | Indices open — Nifty 500 picked (one choice); its side tab shows 1. Each option says how many stocks it gives. |
| `market-07` | Filters · sectors (several) | — | `search-24`, `us-stocks-13` | Sectors open — Banking and IT picked (any number); sort and index picked too. Sectors with no stocks in Nifty 500 are off. |
| `market-08` | Market · filters applied | — | `search-24`, `us-stocks-13` | One removable chip per pick; the filter button gets a dot. |
| `market-09` | Market · US stocks | — | `search-24`, `us-stocks-13` | The picker left of the tabs is on US: $ prices, US logos; tapping a stock opens its US stock page (us-stocks-13, which follows the user status). |
| `market-10` | Market · US · S&P 500 filter | — | `search-24`, `us-stocks-13` | US list with the S&P 500 index applied (the US Stocks flow\ |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the screens in this folder and the live app — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/market · one screen: `#/market-01`, US: `#/market-09`
- **Source:** screenshots of the live app's Market tab and its filters (dark theme), shared 2026-10-17 — no Figma yet.
  Rebuilt in L3; the filter sheet is redesigned.
- **Status:** 🟨 lists + filters done · 2026-10-17
- **Entry:** the Market tab of the main navbar. **Exit:** an Indian stock opens its page (not built yet); a US stock opens `us-stocks-31`; the navbar.

### Screens

| Id | Screen | What it shows / when |
|---|---|---|
| `market-01` | Market · All | Title, Search + Wallet, list tabs; "Apply filters" + filter button; stock cards |
| `market-02` | Market · Top gainers | Same layout — only the list (biggest risers first) |
| `market-03` | Market · Top losers | Same layout — biggest fallers first |
| `market-04` | Market · Under ₹100 | Same layout — stocks under ₹100 (Under ₹500 is the fifth tab) |
| `market-05` | Filters | The sheet: side tabs (grey rail) + only the open group (Sort by); Clear all · Show n stocks |
| `market-06` | Filters · indices | Indices open, Nifty 500 picked (one choice); its side tab shows 1; stock counts per option |
| `market-07` | Filters · sectors (several) | Sectors open, Banking + IT picked (any number); sectors with no stocks are off |
| `market-08` | Market · filters applied | One removable chip per pick; the filter button has a dot |
| `market-09` | Market · US stocks | The picker left of the tabs is on US: $ prices, US logos, Top gainers; a stock opens its US stock page |
| `market-10` | Market · US · S&P 500 filter | US list with the S&P 500 index applied (the US Stocks flow's Market tab; Home's "View all" opens it on a tab + filters via `src/shared/data/marketHandoff`) |

### US stocks

A picker at the left of the list tabs (one L3 pill tab, `Tabs appearance="pill" size="sm"`: label "IN" / "US" with the ↕ switch icon `lmSwitchArrowVertical` on the right, a 1px
`border/light` divider after it) switches the page between Indian and US stocks. Tapping it toggles; the tab stays,
the filters are cleared (their options differ). US: prices in $ (`usd()`), US company logos (Avatar `src`), tabs
"Under $100" / "Under $500"; filter options that apply to US only — Indices S&P 500 / Nasdaq 100 / Dow 30, Market cap
Mega (> $200B) / Large ($10–200B) / Mid ($2–10B) / Small (< $2B), Quick filters S&P 500 / Tech stocks / Mega cap,
US sectors; Sort by is shared. Indian-only options (Nifty indices, ₹ cap tiers, India quick filters / sectors) hide
on US. A US row calls `onOpenUs(symbol)` → the US Stocks flow's stock page (`us-stocks-31`, via the shared
`viewUsStock`). US stocks are `usUniverse` in `data.ts`, built from `src/shared/data/usStocks.ts` (market caps, sectors
and indices are samples).

### Navigation

```
market-0x ─filter button─▶ Filters (sheet) ─Show n stocks─▶ the list, filtered (chips + dot)
                              └Cancel / backdrop / drag down─▶ unchanged
chip ✕ ─▶ that filter removed · list tab ─▶ same screen, another list (filters stay)
navbar Stocks / Market ─▶ the other tab (instant — a tab switch, no push)
Search (top bar) ─▶ search-24 (Search flow: Stocks tab, keyboard up) ─back─▶ market-01
```

### Data

`data.ts` — Indian stocks come from the real catalogue (`src/shared/data/companies.ts`: 56 listed NSE companies, each with a
design-system logo and a Yahoo Finance snapshot for price and day change; `indiaUniverse()` builds the list on each call
because the snapshot refreshes in place, and the screen calls `useMarketSnapshot()`). The snapshot has no market cap, index
membership or this page's sector names, so those are samples kept in `data.ts` by symbol. US stocks are `usUniverse`. Each
stock has symbol, name, price, day change, sector, cap (small < ₹5,000 Cr,
mid ₹5,000–20,000 Cr, large > ₹20,000 Cr), market cap and the indices it's in. Every list comes from it:
- Tabs (`listFor`): All · Top gainers (rising, biggest first) · Top losers (falling, biggest first) · Under ₹100 ·
  Under ₹500.
- Filters (`filterGroups`): Sort by · Quick filters · Indices · Market cap · Sectors. Sort and Indices take one choice
  (`select: 'one'`); Quick filters, Market cap and Sectors take any number (`select: 'any'` — a stock matches the group
  if it matches any choice). Groups combine (all must match); sort orders the result (`applyFilters`). `Filters` holds
  one id (sort, index) or a list (quick, cap, sector); `pickedIn`, `withPicks`, `picks` read and change it. Prices
  and day change are the snapshot's; rows tick every 2 s (see Live prices).
- API: the list for a tab + filter params (sort, index, quick[], cap[], sector[]) → stocks + a count per option (the
  facet counts the sheet shows); live prices on the list.

### Live prices

Every row (IND and US) calls `useLiveQuote(symbol, price, changePct)` (`src/shared/data/live.ts`): the price and the day's %
move a little (within ±0.6 %) around the snapshot every 2 s. Simulated wiggle around a real level; a real build replaces it
with the live feed. No up/down flash.

### Cards

The stock cards are the shared `StockListCard` (`src/shared/ui/`): ListCell card, Avatar 40, flat (1px `border/light` edge, no shadow —
an L3 gap until ListCell has a flat option), symbol and price in Label 14, name in Description 12, cards 12 apart. The same
card is used by every stock list in the app.

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar | `title="Market"` (L1, Heading/18), actions Search + Wallet, list tabs in `bottom` (sticky) |
| Market picker | Tabs (one pill) | `appearance="pill"` `size="sm"`, one item: label IN / US + `iconRight` ↕ (`lmSwitchArrowVertical`); one tap switches; then a 1px vertical divider (`border/light`, `size/24`) |
| List tabs | Tabs | `underline` — hug + scroll (5 tabs); sit right of the picker in the same `bottom` row |
| "Apply filters" | text, Heading/16 | replaced by the applied filters' chips |
| Applied filter chip | Button | `secondary`, icon right ✕ — one per pick, removes just that pick (L3 has no removable chip: see gaps) |
| Filter button | Button + Badge | `tertiary` `sm` icon-only (`filter_alt`, 32 × 32), Badge `dot` when filters are applied |
| Stock card | ListCell | `variant="card"`, `as="button"`; Avatar 40 left; symbol, company; price + PriceChange right |
| No results | EmptyState | "No stocks match" |
| Filters sheet | BottomSheet + BottomSheetHeader | heading "Filters" (no trailing action) |
| Side tabs | local `SideTabs` (L3 gap) + Badge | grey rail (`surface/secondary`); open tab `surface/primary` + the L3 tab indicator (`surface/inverted`) on its left edge; Label/14 (same weight selected or not); Badge `count` `neutral` = picks in that group; ↑ ↓ Home End |
| "Pick one" / "Pick any" | text, Description/12 | top of the pane: says radio or checkbox |
| Options | ListCell + Radio / Checkbox | `as="label"`, `size="sm"`, `multiline`; description = range (market cap) · "n stocks" (what it gives); a 0-stock option's control is `disabled` |
| Sheet buttons | ButtonGroup | horizontal: Clear all (secondary, off when nothing is picked) · "Show n stocks" (primary — never the brand colour) |
| Main navbar | BottomNavbar (`MainNav`) | `value="market"` |
| Layout | Stack · Inset · Section (Figma auto-layout frames) | Page: Stack `gap="16"` (16 above, 24 below); filter bar: Inset `paddingInline="16"` → Stack `direction="horizontal" align="center" gap="12"`, applied chips a horizontal Stack `gap="08"` that scrolls; list: Section `as="ul" paddingInline="16" gap="16"`. The Filters sheet's 2 : 3 split and side tabs stay CSS |

### Rules & behaviour

- All list tabs share one layout; switching a tab keeps the filters and the filter bar.
- Filters: Sort by and Indices — one choice (radio; the picked one stays until Clear all or its chip ✕); Quick
  filters, Market cap, Sectors — any number (checkbox).
- **The sheet:** opens on the first group with picks (else Sort by). A side tab shows only its group on the right (its
  own scroll; the sheet's height never changes). Each side tab shows how many picks it has.
- Every option says how many stocks it would give with the other groups as they are; an option that would give none
  reads "No stocks" and can't be picked (no dead ends) — unless it's already picked.
- "Show n stocks" counts the whole choice, live; with 0 it reads "No stocks" and is off. Clear all empties the draft
  (the sheet stays open).
- A backdrop tap or a drag down closes the sheet without applying.
- One chip per pick on the page; its ✕ removes just that pick. The dot on the filter button goes when nothing is applied.

### Differences from the live app

- **Filter sheet redesigned (2026-10-19, after Zomato / Blinkit / Swiggy):** split sheet with a grey side-tab rail
  and only the open group on the right; counts of picks on the side tabs; several sectors / caps / quick filters at
  once; stock counts on every option and no 0-result options; Clear all next to "Show n stocks" in the dock (Cancel
  removed — the backdrop and drag close it); Sort by first. The live sheet had no header, a repeated "Filter" title,
  lime brand buttons and outlined option cards; the 2026-10-17 version had every group in one scroll.
- **Applied chip** is an L3 secondary button with ✕; the filter button's dot is an L3 Badge.
- Market cap options show their ranges as descriptions; sort options read "Price: low to high".

### L3 gaps

- **Vertical side tabs** (a tab list down the side of a sheet, connected to the pane) — local `components/SideTabs`
  (L3 tokens, Badge for the count).
- **Removable filter chip** — an L3 secondary Button with ✕ stands in.
- **Split sheet body** (two columns, fixed height, the right one scrolling) — local `--app-size-filter-body`.

### Changelog

- 2026-11-04 — Stock list cards (shared `StockListCard`) all wear L3's soft shadow now (`elevation-soft`), instead of flat border-only: tappable ones are raised L3 ListCells; static ones get it locally (L3 gap: a static ListCell card has no shadow).
- 2026-11-03 — Stock cards are the shared `StockListCard` (flat, Label 14, 12 apart, same look app-wide); `.flatCards` override and `StockRow.module.css` removed.
- 2026-11-02 — Market picker: small pill (`sm`) with a bigger tap area — the whole block around it (16 each side, the tab row's full height) switches the market.
- 2026-11-02 — Market picker is one pill (IN / US + ↕ icon) instead of a Select; one tap switches the market.

- 2026-11-02 — Indian list is the real 56-company catalogue with logos (was made-up small caps); sectors adjusted to fit (Agriculture out; Metals and mining, Power, Telecom in); live-ticking prices; flat cards (no shadow).
- 2026-10-30 — US stocks: IND / US picker beside the tabs, US list + filter options, `market-09` / `market-10`.
- 2026-10-21 — layout moved from CSS-module classes to the L3 layout blocks (Stack, Inset, Section); nothing moved (measured at 392).
- 2026-10-19 — Filters sheet redesigned: side tabs show one group at a time (grey rail, pick counts), multi-select
  for quick filters / market cap / sectors, stock counts per option (0 = off), Clear all · Show n stocks in the dock.
- 2026-10-19 — the filter button is Small (32 × 32).
- 2026-10-19 — the Search action opens the Search flow (`search-24`); back returns to Market.
- 2026-10-17 — first version: lists (5 tabs, one layout) and the redesigned Filters sheet.


## Source — this flow

### `src/flows/market/components/SideTabs.module.css`

```css
/* The rail: a grey column the full height of the sheet body (an intentional grey area — it's what makes the selected
   tab read as part of the pane). */
.rail {
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding-block: var(--l3-spacing-08);
  overflow-y: auto;
  background: var(--l3-surface-secondary);
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--l3-spacing-08);
  min-height: var(--l3-size-48);
  padding: var(--l3-spacing-12) var(--l3-spacing-12) var(--l3-spacing-12) var(--l3-spacing-16);
  border: 0;
  background: transparent;
  color: var(--l3-content-secondary);
  font: var(--l3-text-label-14); /* L3/Label/14 — same weight selected or not (L3: never bolder on selection) */
  text-align: left;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.label {
  min-width: 0;
  overflow-wrap: anywhere;
}

/* Selected: the pane's surface (connected to it) + the L3 tab indicator, vertical, on the left edge. */
.tab[aria-selected='true'] {
  background: var(--l3-surface-primary);
  color: var(--l3-content-primary);
}

.tab[aria-selected='true']::before {
  content: '';
  position: absolute;
  inset: var(--l3-spacing-08) auto var(--l3-spacing-08) 0;
  width: var(--l3-spacing-04);
  border-radius: 0 var(--l3-radius-full) var(--l3-radius-full) 0;
  background: var(--l3-surface-inverted);
}

@media (hover: hover) {
  .tab[aria-selected='false']:hover {
    background-image: linear-gradient(var(--l3-state-layer-dark-hover), var(--l3-state-layer-dark-hover));
  }
}

.tab:active {
  background-image: linear-gradient(var(--l3-state-layer-dark-pressed), var(--l3-state-layer-dark-pressed));
}

.tab:focus-visible {
  outline: var(--l3-spacing-02) solid var(--l3-border-dark);
  outline-offset: calc(-1 * var(--l3-spacing-02));
}
```

### `src/flows/market/components/SideTabs.tsx`

```tsx
import { useRef, type KeyboardEvent } from 'react'
import { Badge } from '@l3/components/Badge'
import { t as copy } from '../copy'
import styles from './SideTabs.module.css'

type SideTab<V extends string> = { value: V; label: string; /** How many choices are picked in it (0 = none). */ count?: number }

type SideTabsProps<V extends string> = {
  items: SideTab<V>[]
  value: V
  onChange: (value: V) => void
  'aria-label': string
  /** Id prefix: tab `${idBase}-tab-${value}` controls panel `${idBase}-panel`. */
  idBase: string
}

/**
 * Vertical tabs down the left of a split sheet (Zomato / Blinkit / Swiggy filters). The rail is grey; the selected tab
 * takes the pane's surface so it reads as connected to it, with the L3 tab indicator (surface/inverted) on its left
 * edge. A tab with picks shows their count (L3 Badge). Not in L3 yet (L3 Tabs are horizontal) — an L3 gap.
 * Keyboard: ↑ ↓ Home End move between tabs.
 */
export function SideTabs<V extends string>({ items, value, onChange, idBase, ...rest }: SideTabsProps<V>) {
  const list = useRef<HTMLDivElement>(null)
  const onKeyDown = (e: KeyboardEvent) => {
    const i = items.findIndex((t) => t.value === value)
    const next = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    const target = items[(next + items.length) % items.length]
    onChange(target.value)
    list.current?.querySelector<HTMLElement>(`#${CSS.escape(`${idBase}-tab-${target.value}`)}`)?.focus()
  }
  return (
    <div ref={list} className={styles.rail} role="tablist" aria-orientation="vertical" aria-label={rest['aria-label']} onKeyDown={onKeyDown}>
      {items.map((t) => {
        const selected = t.value === value
        return (
          <button
            key={t.value}
            id={`${idBase}-tab-${t.value}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idBase}-panel`}
            tabIndex={selected ? 0 : -1}
            className={styles.tab}
            onClick={() => onChange(t.value)}
          >
            <span className={styles.label}>{t.label}</span>
            {t.count ? <Badge count={t.count} color="neutral" label={copy('sheet.picked')} /> : null}
          </button>
        )
      })}
    </div>
  )
}
```

### `src/flows/market/components/StockRow.tsx`

```tsx
import { StockListCard } from '../../../shared/ui/StockListCard'
import { useLiveQuote } from '../../../shared/data/live'
import { inr } from '../../../shared/data/format'
import { Usd } from '../../../shared/money'
import type { MarketStock } from '../data'

/** One stock in a Market list: the shared StockListCard (flat card), fed by a live quote that ticks every 2 s. US stocks show $ via <Usd>. Opens the stock page. */
export function StockRow({ stock, onOpen }: { stock: MarketStock; onOpen?: (symbol: string) => void }) {
  const live = useLiveQuote(stock.symbol, stock.price, stock.changePct)
  return (
    <StockListCard
      symbol={stock.symbol}
      name={stock.name}
      logoUrl={stock.logoUrl}
      initials={stock.initials}
      price={stock.market === 'us' ? <Usd value={live.price} layout="inline" /> : inr(live.price)}
      changePct={live.changePct}
      onOpen={() => onOpen?.(stock.symbol)}
    />
  )
}
```

### `src/flows/market/copy.json`

```json
{
  "title": "Market",
  "action.search": "Search",
  "action.wallet": "Wallet",
  "tabs.label": "Market lists",
  "picker.in": "IN",
  "picker.us": "US",
  "picker.label": "Market: {market}. Switch to {other}",
  "tab.all": "All",
  "tab.gainers": "Top gainers",
  "tab.losers": "Top losers",
  "tab.under-100": "Under {currency}100",
  "tab.under-500": "Under {currency}500",
  "filterBar.hint": "Apply filters",
  "filterBar.appliedLabel": "Applied filters",
  "filterBar.remove": "Remove {name}",
  "filterBar.button": "Filters",
  "filterBar.appliedCount": "{count} applied",
  "empty.title": "No stocks match",
  "empty.description": "Try removing a filter, or pick another list.",
  "sheet.title": "Filters",
  "sheet.groupsLabel": "Filter groups",
  "group.sort": "Sort by",
  "group.quick": "Quick filters",
  "group.index": "Indices",
  "group.cap": "Market cap",
  "group.sector": "Sectors",
  "sheet.pickOne": "Pick one",
  "sheet.pickAny": "Pick any",
  "sheet.picked": "picked",
  "sheet.clearAll": "Clear all",
  "sheet.noStocks": "No stocks",
  "sheet.oneStock": "1 stock",
  "sheet.stocks": "{count} stocks",
  "sheet.showOne": "Show 1 stock",
  "sheet.show": "Show {count} stocks"
}
```

### `src/flows/market/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of Market is in copy.json: t('empty.title'), t('sheet.show', { count }). */
export const t = makeCopy('market', copy)
```

### `src/flows/market/data.ts`

```ts
import type { Stock } from '../../shared/data/market'
import { companies } from '../../shared/data/companies'
import { catalogue, usLogo } from '../../shared/data/usStocks'

/**
 * Market — every list on the tab comes from one set of stocks, so the tabs, filters and sort stay consistent.
 * Indian stocks are the real catalogue (companies.ts: NSE symbols, logos, snapshot prices); index / sector / cap tags are samples.
 * Two markets: Indian stocks (₹) and US stocks ($, from the shared US catalogue). The tabs, filters and sort work the
 * same on both; only the list and the filter options that make sense for the market change.
 */

/** The picker at the top: Indian stocks or US stocks. */
export type Market = 'in' | 'us'
export const markets: Market[] = ['in', 'us']

/** India: small / mid / large. US: mega (> $200B) / large / mid / small — mega is US only. */
export type Cap = 'small' | 'mid' | 'large' | 'mega'
export type MarketStock = Stock & {
  market: Market
  sector: SectorId
  cap: Cap
  /** ₹ crore for Indian stocks, $ billion for US stocks. Only compared within a market. */
  marketCap: number
  indices: IndexId[]
}

export type IndexId = 'sp-500' | 'nasdaq-100' | 'dow-30' | 'nifty-50' | 'nifty-500' | 'nifty-midcap-100' | 'nifty-auto' | 'nifty-pvt-bank' | 'nifty-fin-25-50' | 'nifty100-lowvol30' | 'finnifty' | 'nifty-growsect-15'
export type SectorId = 'oil-gas' | 'metals' | 'power' | 'telecom' | 'pharma' | 'auto' | 'infra' | 'building-materials' | 'engineering' | 'it' | 'banking' | 'fmcg' | 'finance' | 'consumer'
  | 'technology' | 'semiconductors' | 'communication' | 'consumer-disc' | 'consumer-staples' | 'financials' | 'industrials'

/**
 * Indian stocks: the real catalogue (`src/shared/data/companies.ts` — 56 listed NSE companies, design-system logos, a
 * Yahoo Finance snapshot for price and day change). The snapshot has no market cap, index membership or this page's
 * sector names, so those three are samples kept here, by symbol (₹ crore, rounded; indices and sectors approximate).
 */
const sampleMeta: Record<string, [SectorId, number]> = {
  ADANIENT: ['infra', 290000], ADANIGREEN: ['power', 190000], ADANIPORTS: ['infra', 380000], ADANIPOWER: ['power', 71000],
  ASIANPAINT: ['consumer', 219000], AXISBANK: ['banking', 375000], 'BAJAJ-AUTO': ['auto', 283000], BAJAJFINSV: ['finance', 267000],
  BAJFINANCE: ['finance', 586000], BEL: ['engineering', 266000], BHARTIARTL: ['telecom', 1080000], COALINDIA: ['metals', 248000],
  DIVISLAB: ['pharma', 243000], DMART: ['consumer', 206000], EICHERMOT: ['auto', 194000], ETERNAL: ['consumer', 294000],
  GRASIM: ['building-materials', 190000], HAL: ['engineering', 326000], HCLTECH: ['it', 386000], HDFCBANK: ['banking', 1065000],
  HINDALCO: ['metals', 199000], HINDUNILVR: ['fmcg', 430000], HINDZINC: ['metals', 219000], ICICIBANK: ['banking', 998000],
  IDEA: ['telecom', 125000], INDIGO: ['infra', 177000], INFY: ['it', 478000], IOC: ['oil-gas', 185000], IRFC: ['finance', 100000],
  ITC: ['fmcg', 324000], JSWSTEEL: ['metals', 298000], KOTAKBANK: ['banking', 869000], LICI: ['finance', 245000],
  LT: ['engineering', 500000], 'M&M': ['auto', 356000], MARUTI: ['auto', 351000], NESTLEIND: ['fmcg', 229000], NHPC: ['power', 72700],
  NTPC: ['power', 293000], ONGC: ['oil-gas', 283000], POWERGRID: ['power', 231000], RELIANCE: ['oil-gas', 1603000],
  SBIN: ['banking', 866000], SHRIRAMFIN: ['finance', 169000], SOLARINDS: ['engineering', 172000], SOUTHBANK: ['banking', 14600],
  SUNPHARMA: ['pharma', 421000], SUZLON: ['engineering', 53000], TATASTEEL: ['metals', 215000], TCS: ['it', 907000],
  TITAN: ['consumer', 386000], TORNTPHARM: ['pharma', 156000], TVSMOTOR: ['auto', 189000], ULTRACEMCO: ['building-materials', 316000],
  WIPRO: ['it', 199000], YESBANK: ['banking', 50300],
}
const NIFTY_50 = new Set('ADANIENT ADANIPORTS ASIANPAINT AXISBANK BAJAJ-AUTO BAJFINANCE BAJAJFINSV BEL BHARTIARTL COALINDIA EICHERMOT ETERNAL GRASIM HCLTECH HDFCBANK HINDALCO HINDUNILVR ICICIBANK INDIGO INFY ITC JSWSTEEL KOTAKBANK LT M&M MARUTI NESTLEIND NTPC ONGC POWERGRID RELIANCE SBIN SHRIRAMFIN SUNPHARMA TATASTEEL TCS TITAN ULTRACEMCO WIPRO'.split(' '))
const PVT_BANK = new Set(['HDFCBANK', 'ICICIBANK', 'KOTAKBANK', 'AXISBANK', 'YESBANK', 'SOUTHBANK'])
const FIN_SERVICES = new Set(['HDFCBANK', 'ICICIBANK', 'KOTAKBANK', 'AXISBANK', 'SBIN', 'BAJFINANCE', 'BAJAJFINSV', 'SHRIRAMFIN'])
const LOW_VOL = new Set(['HINDUNILVR', 'ITC', 'NESTLEIND', 'SUNPHARMA', 'DIVISLAB', 'TCS', 'POWERGRID'])
const GROW_SECT = new Set(['TCS', 'INFY', 'HCLTECH', 'BAJFINANCE', 'MARUTI', 'TITAN'])
const MIDCAP_100 = new Set(['IDEA', 'NHPC', 'SUZLON', 'HINDZINC', 'SOLARINDS', 'SOUTHBANK', 'IRFC', 'TORNTPHARM'])

function indexesOf(symbol: string, sector: SectorId): IndexId[] {
  const out: IndexId[] = ['nifty-500']
  if (NIFTY_50.has(symbol)) out.push('nifty-50')
  if (sector === 'auto') out.push('nifty-auto')
  if (PVT_BANK.has(symbol)) out.push('nifty-pvt-bank')
  if (FIN_SERVICES.has(symbol)) out.push('nifty-fin-25-50', 'finnifty')
  if (LOW_VOL.has(symbol)) out.push('nifty100-lowvol30')
  if (GROW_SECT.has(symbol)) out.push('nifty-growsect-15')
  if (MIDCAP_100.has(symbol)) out.push('nifty-midcap-100')
  return out
}

/**
 * The Indian list, built from the catalogue each time it's asked (the snapshot refreshes in place, so the numbers
 * are current — screens call `useMarketSnapshot()` to re-render when it does).
 */
export function indiaUniverse(): MarketStock[] {
  return Object.values(companies).flatMap((c) => {
    const meta = sampleMeta[c.symbol]
    if (!c.market || !meta) return []
    const [sector, marketCap] = meta
    return [{
      symbol: c.symbol, name: c.name, price: c.market.price, changePct: c.market.changePct, sector, marketCap,
      indices: indexesOf(c.symbol, sector),
      market: 'in' as const,
      cap: marketCap < 5000 ? 'small' as const : marketCap <= 20000 ? 'mid' as const : 'large' as const,
      initials: c.initials,
      logoUrl: c.logoUrl,
    }]
  })
}

/** A US stock: price, name and day change from the shared US catalogue; market cap in $ billion. */
const us = (symbol: string, sector: SectorId, marketCap: number, indices: IndexId[] = []): MarketStock => {
  const c = catalogue[symbol]
  return {
    symbol, name: c.name, price: c.price, changePct: c.change, sector, marketCap, indices,
    market: 'us',
    cap: marketCap > 200 ? 'mega' : marketCap >= 10 ? 'large' : marketCap >= 2 ? 'mid' : 'small',
    initials: symbol.slice(0, 2),
    logoUrl: usLogo(symbol),
  }
}

export const usUniverse: MarketStock[] = [
  us('NVDA', 'semiconductors', 4600, ['sp-500', 'nasdaq-100', 'dow-30']),
  us('AAPL', 'technology', 3900, ['sp-500', 'nasdaq-100', 'dow-30']),
  us('MSFT', 'technology', 3900, ['sp-500', 'nasdaq-100', 'dow-30']),
  us('GOOGL', 'communication', 3000, ['sp-500', 'nasdaq-100']),
  us('AMZN', 'consumer-disc', 2400, ['sp-500', 'nasdaq-100', 'dow-30']),
  us('AVGO', 'semiconductors', 1600, ['sp-500', 'nasdaq-100']),
  us('META', 'communication', 1850, ['sp-500', 'nasdaq-100']),
  us('TSLA', 'consumer-disc', 1400, ['sp-500', 'nasdaq-100']),
  us('JPM', 'financials', 820, ['sp-500', 'dow-30']),
  us('V', 'financials', 660, ['sp-500', 'dow-30']),
  us('NFLX', 'communication', 500, ['sp-500', 'nasdaq-100']),
  us('AMD', 'semiconductors', 350, ['sp-500', 'nasdaq-100']),
  us('KO', 'consumer-staples', 300, ['sp-500', 'dow-30']),
  us('MCD', 'consumer-disc', 215, ['sp-500', 'dow-30']),
  us('UBER', 'industrials', 198, ['sp-500']),
  us('SBUX', 'consumer-disc', 96, ['sp-500', 'nasdaq-100']),
  us('NKE', 'consumer-disc', 95, ['sp-500', 'dow-30']),
  us('LYFT', 'industrials', 9),
  us('ETSY', 'consumer-disc', 6.4),
  us('SONO', 'consumer-disc', 1.8),
]

/** The Market tabs: same layout, a different list (and, for the movers, a different order). */
export type MarketTab = 'all' | 'gainers' | 'losers' | 'under-100' | 'under-500'
/** In order. Their names are in copy.json (tab.<id>); the price tabs take the market's currency symbol. */
export const tabs: MarketTab[] = ['all', 'gainers', 'losers', 'under-100', 'under-500']

/** The currency symbol the price tabs and prices use. */
export const currencyOf = (market: Market) => (market === 'us' ? '$' : '₹')

export const listFor = (tab: MarketTab, market: Market = 'in'): MarketStock[] => {
  const all = market === 'us' ? usUniverse : indiaUniverse()
  switch (tab) {
    case 'gainers': return [...all].filter((x) => x.changePct > 0).sort((a, b) => b.changePct - a.changePct)
    case 'losers': return [...all].filter((x) => x.changePct < 0).sort((a, b) => a.changePct - b.changePct)
    case 'under-100': return all.filter((x) => x.price < 100)
    case 'under-500': return all.filter((x) => x.price < 500)
    default: return all
  }
}

/**
 * Filters: five groups. Sort and Indices take one choice (radio); Quick filters, Market cap and Sectors take any number
 * (checkbox) — a stock matches a group if it matches any choice in it. Groups combine (all must match); sort orders the
 * result.
 */
export type FilterGroupId = 'sort' | 'quick' | 'index' | 'cap' | 'sector'
/** `markets`: where the option applies (left out = both). Option ids are unique across markets. */
export type FilterOption = { id: string; label: string; description?: string; markets?: Market[]; test?: (x: MarketStock) => boolean }
/** A group's name is in copy.json (group.<id>). */
export type FilterGroup = { id: FilterGroupId; select: 'one' | 'any'; options: FilterOption[] }

const inIndex = (id: IndexId) => (x: MarketStock) => x.indices.includes(id)
const IN: Market[] = ['in']
const US: Market[] = ['us']
const inSector = (id: SectorId) => (x: MarketStock) => x.sector === id

export const filterGroups: FilterGroup[] = [
  {
    id: 'sort', select: 'one', options: [
      { id: 'mcap-asc', label: 'Market cap: low to high' },
      { id: 'mcap-desc', label: 'Market cap: high to low' },
      { id: 'price-asc', label: 'Price: low to high' },
      { id: 'price-desc', label: 'Price: high to low' },
    ],
  },
  {
    id: 'quick', select: 'any', options: [
      { id: 'nifty-midcap-100', label: 'NIFTY Midcap 100', markets: IN, test: inIndex('nifty-midcap-100') },
      { id: 'banking', label: 'Banking stocks', markets: IN, test: inSector('banking') },
      { id: 'fmcg', label: 'FMCG stocks', markets: IN, test: inSector('fmcg') },
      { id: 'it', label: 'IT stocks', markets: IN, test: inSector('it') },
      { id: 'us-sp-500', label: 'S&P 500', markets: US, test: inIndex('sp-500') },
      { id: 'us-tech', label: 'Tech stocks', markets: US, test: (x) => x.sector === 'technology' || x.sector === 'semiconductors' },
      { id: 'us-mega-cap', label: 'Mega cap', markets: US, test: (x) => x.cap === 'mega' },
    ],
  },
  {
    id: 'index', select: 'one', options: [
      { id: 'nifty-50', label: 'Nifty 50', markets: IN, test: inIndex('nifty-50') },
      { id: 'nifty-500', label: 'Nifty 500', markets: IN, test: inIndex('nifty-500') },
      { id: 'nifty-auto', label: 'Nifty Auto', markets: IN, test: inIndex('nifty-auto') },
      { id: 'nifty-pvt-bank', label: 'Nifty Pvt Bank', markets: IN, test: inIndex('nifty-pvt-bank') },
      { id: 'nifty-fin-25-50', label: 'Nifty Fin Services 25/50', markets: IN, test: inIndex('nifty-fin-25-50') },
      { id: 'nifty100-lowvol30', label: 'NIFTY100 LowVol30', markets: IN, test: inIndex('nifty100-lowvol30') },
      { id: 'finnifty', label: 'FINNIFTY', markets: IN, test: inIndex('finnifty') },
      { id: 'nifty-growsect-15', label: 'Nifty GrowSect 15', markets: IN, test: inIndex('nifty-growsect-15') },
      { id: 'sp-500', label: 'S&P 500', markets: US, test: inIndex('sp-500') },
      { id: 'nasdaq-100', label: 'Nasdaq 100', markets: US, test: inIndex('nasdaq-100') },
      { id: 'dow-30', label: 'Dow 30', markets: US, test: inIndex('dow-30') },
    ],
  },
  {
    id: 'cap', select: 'any', options: [
      { id: 'small', label: 'Small cap', description: 'Less than ₹5,000 Cr', markets: IN, test: (x) => x.cap === 'small' },
      { id: 'mid', label: 'Mid cap', description: '₹5,000 Cr to ₹20,000 Cr', markets: IN, test: (x) => x.cap === 'mid' },
      { id: 'large', label: 'Large cap', description: 'More than ₹20,000 Cr', markets: IN, test: (x) => x.cap === 'large' },
      { id: 'us-mega', label: 'Mega cap', description: 'More than $200B', markets: US, test: (x) => x.cap === 'mega' },
      { id: 'us-large', label: 'Large cap', description: '$10B to $200B', markets: US, test: (x) => x.cap === 'large' },
      { id: 'us-mid', label: 'Mid cap', description: '$2B to $10B', markets: US, test: (x) => x.cap === 'mid' },
      { id: 'us-small', label: 'Small cap', description: 'Less than $2B', markets: US, test: (x) => x.cap === 'small' },
    ],
  },
  {
    id: 'sector', select: 'any', options: [
      { id: 'oil-gas', label: 'Oil and gas', markets: IN, test: inSector('oil-gas') },
      { id: 'metals', label: 'Metals and mining', markets: IN, test: inSector('metals') },
      { id: 'power', label: 'Power', markets: IN, test: inSector('power') },
      { id: 'telecom', label: 'Telecom', markets: IN, test: inSector('telecom') },
      { id: 'pharma', label: 'Pharma', markets: IN, test: inSector('pharma') },
      { id: 'auto', label: 'Auto', markets: IN, test: inSector('auto') },
      { id: 'infra', label: 'Infra', markets: IN, test: inSector('infra') },
      { id: 'building-materials', label: 'Building materials', markets: IN, test: inSector('building-materials') },
      { id: 'engineering', label: 'Engineering', markets: IN, test: inSector('engineering') },
      { id: 'it', label: 'IT', markets: IN, test: inSector('it') },
      { id: 'banking', label: 'Banking', markets: IN, test: inSector('banking') },
      { id: 'finance', label: 'Finance', markets: IN, test: inSector('finance') },
      { id: 'technology', label: 'Technology', markets: US, test: inSector('technology') },
      { id: 'semiconductors', label: 'Semiconductors', markets: US, test: inSector('semiconductors') },
      { id: 'communication', label: 'Communication', markets: US, test: inSector('communication') },
      { id: 'consumer-disc', label: 'Consumer discretionary', markets: US, test: inSector('consumer-disc') },
      { id: 'consumer-staples', label: 'Consumer staples', markets: US, test: inSector('consumer-staples') },
      { id: 'financials', label: 'Financials', markets: US, test: inSector('financials') },
      { id: 'industrials', label: 'Industrials', markets: US, test: inSector('industrials') },
    ],
  },
]

/** The filter groups as one market shows them: only the options that apply to it (ids never repeat across markets). */
export const groupsFor = (market: Market): FilterGroup[] =>
  filterGroups.map((g) => ({ ...g, options: g.options.filter((o) => !o.markets || o.markets.includes(market)) }))

/** What's picked: one id for Sort and Indices, a list for the others. A group with nothing picked isn't applied. */
export type Filters = Partial<{ sort: string; index: string; quick: string[]; cap: string[]; sector: string[] }>

export const groupOf = (id: FilterGroupId) => filterGroups.find((g) => g.id === id)!
export const optionOf = (group: FilterGroupId, id: string | undefined) => groupOf(group).options.find((o) => o.id === id)

/** The picked ids of one group, always as a list. */
export function pickedIn(filters: Filters, group: FilterGroupId): string[] {
  const v = filters[group]
  return v === undefined ? [] : Array.isArray(v) ? v : [v]
}

/** The filters with one group's picks replaced (an empty list removes the group). */
export function withPicks(filters: Filters, group: FilterGroupId, ids: string[]): Filters {
  const { [group]: _old, ...rest } = filters
  if (!ids.length) return rest
  return { ...rest, [group]: groupOf(group).select === 'one' ? ids[0] : ids }
}

/** Every pick as { group, option } — in group order (the Market page shows one removable chip each). */
export const picks = (filters: Filters) =>
  filterGroups.flatMap((g) => pickedIn(filters, g.id).map((id) => ({ group: g.id, option: optionOf(g.id, id)! }))).filter((p) => p.option)

/** The tab's list with the filters applied and the sort order — using only the options of the list's market. */
export function applyFilters(list: MarketStock[], filters: Filters, market: Market = 'in'): MarketStock[] {
  const groups = groupsFor(market).filter((g) => g.id !== 'sort' && pickedIn(filters, g.id).some((id) => g.options.some((o) => o.id === id)))
  const result = list.filter((x) => groups.every((g) => pickedIn(filters, g.id).some((id) => g.options.find((o) => o.id === id)?.test?.(x))))
  const by: Record<string, (a: MarketStock, b: MarketStock) => number> = {
    'mcap-asc': (a, b) => a.marketCap - b.marketCap,
    'mcap-desc': (a, b) => b.marketCap - a.marketCap,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
  }
  return filters.sort ? [...result].sort(by[filters.sort]) : result
}
```

### `src/flows/market/index.tsx`

```tsx
import { viewUsStock } from '../../shared/data/usStocks'
import { goToTab } from '../../shared/ui/MainNav'
import type { Flow } from '../types'
import { Market } from './screens/Market'

/**
 * Market — the Market tab: lists of Indian or US stocks (IN / US picker; All, Top gainers, Top losers, Under ₹100 / $100, Under ₹500 / $500), all with the same
 * layout, and Filters (quick filters, indices, market cap, sectors, sort). Built from the live app's screenshots
 * (shared 2026-10-17; no Figma yet), with the filter sheet redesigned in L3.
 */
export const market: Flow = {
  id: 'market',
  title: 'Market',
  description: 'The Market tab — Indian and US stock lists (all, gainers, losers, under 100 / 500) and Filters.',
  figmaFile: '',
  sections: [
    { id: 'lists', title: 'Lists' },
    { id: 'filters', title: 'Filters' },
  ],
  screens: [
    { id: 'market-01', section: 'lists', name: 'Market · All', figma: '', note: 'The filter bar shows "Apply filters" until something is applied.', tab: true, render: (go) => <Market onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-02', section: 'lists', name: 'Market · Top gainers', figma: '', note: 'Same layout — only the list changes.', tab: true, render: (go) => <Market tab="gainers" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-03', section: 'lists', name: 'Market · Top losers', figma: '', tab: true, render: (go) => <Market tab="losers" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-04', section: 'lists', name: 'Market · Under ₹100', figma: '', tab: true, render: (go) => <Market tab="under-100" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-05', section: 'filters', name: 'Filters', figma: '', note: 'Side tabs on the left (grey rail, the open one connected to the pane); only the open group on the right. Opens on Sort by.', tab: true, render: (go) => <Market sheet onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-06', section: 'filters', name: 'Filters · indices', figma: '', note: 'Indices open — Nifty 500 picked (one choice); its side tab shows 1. Each option says how many stocks it gives.', tab: true, render: (go) => <Market sheet sheetSection="index" filters={{ index: 'nifty-500' }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-07', section: 'filters', name: 'Filters · sectors (several)', figma: '', note: 'Sectors open — Banking and IT picked (any number); sort and index picked too. Sectors with no stocks in Nifty 500 are off.', tab: true, render: (go) => <Market sheet sheetSection="sector" filters={{ sort: 'price-desc', index: 'nifty-500', sector: ['banking', 'it'] }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-08', section: 'filters', name: 'Market · filters applied', figma: '', note: 'One removable chip per pick; the filter button gets a dot.', tab: true, render: (go) => <Market filters={{ sort: 'price-desc', index: 'nifty-500', sector: ['banking', 'it'] }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-09', section: 'lists', name: 'Market · US stocks', figma: '', note: 'The picker left of the tabs is on US: $ prices, US logos; tapping a stock opens its US stock page (us-stocks-13, which follows the user status).', tab: true, render: (go) => <Market market="us" tab="gainers" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
    { id: 'market-10', section: 'lists', name: 'Market · US · S&P 500 filter', figma: '', note: 'US list with the S&P 500 index applied (the US Stocks flow\'s E3 entry point). Filter options are the US ones.', tab: true, render: (go) => <Market market="us" filters={{ index: 'sp-500' }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} onOpenUs={(sym) => { viewUsStock(sym); go('us-stocks-13') }} /> },
  ],
}
```

### `src/flows/market/screens/Market.module.css`

```css
/*
 * Market — the filter bar over a list of stock cards (16 apart, inside the 16 page margin). Layout is L3 Stack /
 * Inset / Section; only text styles and what those blocks don't cover live here.
 */

/* 16 above the filter bar but 24 below the list: Section's paddingBlock is the same top and bottom. */
.page {
  padding-block: var(--l3-spacing-16) var(--l3-spacing-24);
}

.filterHint {
  flex: 1;
  margin: 0;
  font: var(--l3-text-heading-16);
}

/* Applied filters: the row takes the space left of the filter button and scrolls sideways if the chips don't fit. */
.applied {
  position: relative; /* keeps absolutely placed bits inside the scrolling row */
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}

.applied::-webkit-scrollbar {
  display: none;
}

.applied > * {
  flex: none;
}

.filterButton {
  display: inline-flex;
  flex: none;
}

/* Market picker: the tap area is the whole block around the pill, the row's full height (the pill itself stays small). */
.picker {
  display: flex;
  flex: none;
  align-self: stretch;
  align-items: center;
  cursor: pointer;
}

/* Market picker | tabs: a 1px vertical divider between the picker and the list tabs; the tabs take the rest of the row. */
.divider {
  flex: none;
  align-self: center;
  width: 1px; /* 1px hairline */
  height: var(--l3-size-24);
  background: var(--l3-border-light);
}

.tabs {
  flex: 1;
  min-width: 0; /* lets the tab row scroll sideways instead of widening the page */
}
```

### `src/flows/market/screens/Market.tsx`

```tsx
import { useState } from 'react'
import { Actionbar, ActionbarAction } from '@l3/components/Actionbar'
import { Badge } from '@l3/components/Badge'
import { Button } from '@l3/components/Button'
import { EmptyState } from '@l3/components/EmptyState'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { Tabs } from '@l3/components/Tabs'
import { msAccountBalanceWallet, msClose, msFilterAlt, msSearch } from '@l3/icons/material'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { MainNav, type Section as NavSection } from '../../../shared/ui/MainNav'
import { Screen } from '../../../shared/ui/Screen'
import { useMarketSnapshot } from '../../../shared/data/companies'
import { takeMarketHandoff } from '../../../shared/data/marketHandoff'
import { StockRow } from '../components/StockRow'
import { applyFilters, currencyOf, listFor, pickedIn, picks, tabs, withPicks, type FilterGroupId, type Filters, type Market as MarketId, type MarketTab } from '../data'
import { FilterSheet } from '../sheets/FilterSheet'
import { t } from '../copy'
import styles from './Market.module.css'

type Props = {
  /** Which stocks the page lists: Indian (default) or US. The picker next to the tabs switches it. */
  market?: MarketId
  tab?: MarketTab
  filters?: Filters
  /** Open with the Filters sheet up, scrolled to a group (board frames). */
  sheet?: boolean
  sheetSection?: FilterGroupId
  onTab?: (section: NavSection) => void
  /** The Search action in the top bar: opens the Search screen (search-24 — its back returns here). */
  onSearch?: () => void
  /** A US stock row was tapped: open its stock page (the US Stocks flow). */
  onOpenUs?: (symbol: string) => void
}

/**
 * market-01 … 10 · Market — an L1 tab. A picker (IN / US) at the left of the list tabs switches between Indian and US
 * stocks: the list, the filter options and the prices follow it; filters are cleared, the tab stays. Every list tab (All, Top gainers, Top losers, Under ₹100, Under ₹500) has the
 * same layout; only the stocks change. Above the list: the applied filters as removable chips (or "Apply filters")
 * and the filter button, with a dot when something is applied.
 */
export function Market({ market: initialMarket = 'in', tab: initialTab = 'all', filters: initialFilters = {}, sheet = false, sheetSection, onTab, onSearch, onOpenUs }: Props) {
  // Opened from another screen with a market / tab / filters to start on (Home's "View all")? Read once.
  const [handoff] = useState(takeMarketHandoff)
  const [market, setMarket] = useState<MarketId>(handoff?.market ?? initialMarket)
  const [tab, setTab] = useState<MarketTab>(handoff?.tab && (tabs as string[]).includes(handoff.tab) ? (handoff.tab as MarketTab) : initialTab)
  const [filters, setFilters] = useState<Filters>(handoff ? (handoff.filters ?? {}) : initialFilters)
  const [open, setOpen] = useState(sheet)
  useMarketSnapshot() // re-render when fresher Indian prices arrive
  const base = listFor(tab, market)
  const list = applyFilters(base, filters, market)
  const currency = currencyOf(market)
  const applied = picks(filters)

  /** Switching market clears the filters (their options differ) and keeps the tab. */
  const other: MarketId = market === 'in' ? 'us' : 'in'
  const switchMarket = () => { setMarket(other); setFilters({}) }

  /** A chip's ✕ removes just that pick (other picks in the same group stay). */
  const remove = (group: FilterGroupId, id: string) => setFilters((f) => withPicks(f, group, pickedIn(f, group).filter((x) => x !== id)))

  return (
    <Screen
      top={
        <Actionbar
          title={t('title')}
          actions={
            <>
              <ActionbarAction icon={msSearch} label={t('action.search')} onClick={() => onSearch?.()} />
              <ActionbarAction icon={msAccountBalanceWallet} label={t('action.wallet')} onClick={() => {}} />
            </>
          }
          bottom={
            <Stack direction="horizontal" align="center">
              {/*
                * One pill, one tap: shows the market on screen with the ↕ switch icon and flips IN ⇄ US. The whole
                * block around it (16 each side, the row's full height) takes the tap, so the small pill is easy to hit;
                * the pill's own tap bubbles up to it.
                */}
              <div className={styles.picker} onClick={switchMarket}>
                <Inset paddingInline="16" paddingBlock="00">
                  <Tabs
                    appearance="pill"
                    size="sm"
                    aria-label={t('picker.label', { market: t(`picker.${market}`), other: t(`picker.${other}`) })}
                    items={[{ value: market, label: t(`picker.${market}`), iconRight: <Icon icon={lmSwitchArrowVertical} size={16} /> }]}
                    value={market}
                    onChange={() => {}}
                  />
                </Inset>
              </div>
              <span className={styles.divider} aria-hidden="true" />
              <div className={styles.tabs}>
                <Tabs aria-label={t('tabs.label')} items={tabs.map((id) => ({ value: id, label: t(`tab.${id}`, { currency }) }))} value={tab} onChange={(v) => setTab(v as MarketTab)} />
              </div>
            </Stack>
          }
        />
      }
      bottom={<MainNav value="market" onChange={onTab} />}
      sheet={open ? (
        <FilterSheet
          initial={filters}
          section={sheetSection}
          market={market}
          resultCount={(f) => applyFilters(base, f, market).length}
          onApply={(f) => { setFilters(f); setOpen(false) }}
          onClose={() => setOpen(false)}
        />
      ) : undefined}
    >
      <Stack gap="16" className={styles.page}>
        <Inset paddingInline="16" paddingBlock="00">
          <Stack direction="horizontal" align="center" gap="12">
            {applied.length ? (
              <Stack direction="horizontal" gap="08" className={styles.applied} role="group" aria-label={t('filterBar.appliedLabel')}>
                {applied.map(({ group, option }) => (
                  <Button size="sm" key={`${group}-${option.id}`} variant="secondary" iconRight={<Icon icon={msClose} />} aria-label={t('filterBar.remove', { name: option.label })} onClick={() => remove(group, option.id)}>
                    {option.label}
                  </Button>
                ))}
              </Stack>
            ) : (
              <p className={styles.filterHint}>{t('filterBar.hint')}</p>
            )}
            <span className={styles.filterButton}>
              <Badge dot={applied.length > 0} label={t('filterBar.appliedCount', { count: applied.length })}>
                <Button variant="tertiary" size="sm" iconLeft={<Icon icon={msFilterAlt} />} aria-label={t('filterBar.button')} onClick={() => setOpen(true)} />
              </Badge>
            </span>
          </Stack>
        </Inset>

        {list.length ? (
          <Section as="ul" paddingInline="16" gap="12" aria-label={t(`tab.${tab}`, { currency })}>
            {list.map((stock) => <li key={stock.symbol}><StockRow stock={stock} onOpen={stock.market === 'us' ? onOpenUs : undefined} /></li>)}
          </Section>
        ) : (
          <EmptyState title={t('empty.title')} description={t('empty.description')} />
        )}
      </Stack>
    </Screen>
  )
}
```

### `src/flows/market/sheets/FilterSheet.module.css`

```css
/*
 * Filters body: side tabs (left, grey rail) and the open group's options (right, scrolls on its own), edge to edge in
 * the sheet — it steps out of the sheet content's padding (16 sides and top, 24 below) so the two columns meet the
 * sheet edges and the dock. A fixed height, so switching groups never makes the sheet jump.
 */
.split {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  height: var(--app-size-filter-body);
  margin: calc(-1 * var(--l3-spacing-16)) calc(-1 * var(--l3-spacing-16)) calc(-1 * var(--l3-spacing-24));
}

.pane {
  min-height: 0;
  padding-block: var(--l3-spacing-08) var(--l3-spacing-16);
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* "Pick one" / "Pick any": says radio or checkbox before the first tap. */
.hint {
  margin: 0;
  padding: var(--l3-spacing-08) var(--l3-spacing-16) var(--l3-spacing-04);
  font: var(--l3-text-description-12); /* L3/Description/12 */
  color: var(--l3-content-secondary);
}
```

### `src/flows/market/sheets/FilterSheet.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Checkbox, Radio } from '@l3/components/Checkbox'
import { ListCell } from '@l3/components/ListCell'
import { Sheet } from '../../../shared/ui/Sheet'
import { SideTabs } from '../components/SideTabs'
import { groupsFor, pickedIn, picks, withPicks, type FilterGroupId, type FilterOption, type Filters, type Market } from '../data'
import { t } from '../copy'
import styles from './FilterSheet.module.css'

type Props = {
  /** Which market's options the sheet lists (Indian or US). */
  market?: Market
  /** The filters applied now (the sheet edits a copy until "Show n stocks"). */
  initial: Filters
  /** Open on this group (board frames); otherwise the first group with picks, else Sort by. */
  section?: FilterGroupId
  /** How many stocks a set of filters would show — the dock button and every option's count say it. */
  resultCount: (filters: Filters) => number
  onApply: (filters: Filters) => void
  onClose: () => void
}

/**
 * market-05 … 07 · Filters — the split sheet food and grocery apps use for long filter lists (Zomato, Blinkit,
 * Swiggy): side tabs for the groups on the left (grey rail, the open one connected to the pane, a count of picks on
 * each), and on the right ONLY the open group, scrolling on its own. Sort by and Indices take one choice (radio);
 * Quick filters, Market cap and Sectors take any number (checkbox). Every option says how many stocks it would give;
 * one that would give none is off, so there are no dead ends. Dock: Clear all · "Show n stocks" (applies). Close by
 * backdrop or dragging down (L3 sheets).
 */
export function FilterSheet({ market = 'in', initial, section, resultCount, onApply, onClose }: Props) {
  const filterGroups = groupsFor(market)
  const headingId = useId()
  const idBase = useId().replace(/:/g, '')
  const [draft, setDraft] = useState<Filters>(initial)
  const [active, setActive] = useState<FilterGroupId>(section ?? filterGroups.find((g) => pickedIn(initial, g.id).length)?.id ?? filterGroups[0].id)
  const group = filterGroups.find((g) => g.id === active)!
  const picked = pickedIn(draft, active)
  const total = resultCount(draft)
  const nothingPicked = picks(draft).length === 0

  const toggle = (id: string) => {
    if (group.select === 'one') return setDraft((d) => withPicks(d, active, [id]))
    setDraft((d) => {
      const now = pickedIn(d, active)
      return withPicks(d, active, now.includes(id) ? now.filter((x) => x !== id) : [...now, id])
    })
  }

  // What this option alone would give, with the other groups as they are (facet count). Sort options don't filter.
  const countFor = (o: FilterOption) => (active === 'sort' ? undefined : resultCount(withPicks(draft, active, [o.id])))

  return (
    <Sheet
      labelledBy={headingId}
      onClose={onClose}
      header={<BottomSheetHeader headingId={headingId} heading={t('sheet.title')} />}
      footer={
        <ButtonGroup aria-label={t('sheet.title')} direction="horizontal">
          <Button variant="secondary" disabled={nothingPicked} onClick={() => setDraft({})}>{t('sheet.clearAll')}</Button>
          <Button disabled={total === 0} onClick={() => onApply(draft)}>{total === 0 ? t('sheet.noStocks') : total === 1 ? t('sheet.showOne') : t('sheet.show', { count: total })}</Button>
        </ButtonGroup>
      }
    >
      <div className={styles.split}>
        <SideTabs
          aria-label={t('sheet.groupsLabel')}
          idBase={idBase}
          items={filterGroups.map((g) => ({ value: g.id, label: t(`group.${g.id}`), count: pickedIn(draft, g.id).length }))}
          value={active}
          onChange={setActive}
        />
        <div key={active} id={`${idBase}-panel`} className={styles.pane} role="tabpanel" aria-labelledby={`${idBase}-tab-${active}`}>
          <p className={styles.hint}>{group.select === 'one' ? t('sheet.pickOne') : t('sheet.pickAny')}</p>
          <div role={group.select === 'one' ? 'radiogroup' : 'group'} aria-label={t(`group.${group.id}`)}>
            {group.options.map((o) => {
              const on = picked.includes(o.id)
              const n = countFor(o)
              const off = n === 0 && !on
              const description = [o.description, n === undefined ? undefined : n === 0 ? t('sheet.noStocks') : n === 1 ? t('sheet.oneStock') : t('sheet.stocks', { count: n })].filter(Boolean).join(' · ')
              const control = group.select === 'one'
                ? <Radio name={`${idBase}-${active}`} checked={on} disabled={off} onChange={() => toggle(o.id)} />
                : <Checkbox checked={on} disabled={off} onChange={() => toggle(o.id)} />
              return <ListCell key={o.id} as="label" size="sm" multiline label={o.label} description={description || undefined} trailing={control} />
            })}
          </div>
        </div>
      </div>
    </Sheet>
  )
}
```

## Source — shared app parts it uses

### `src/shared/assets/logos/asahiindia.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>150</exif:PixelXDimension>
         <exif:PixelYDimension>150</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
��Q�  -�IDATx�}xTU��;��7�t��b{Aݵ7�UW]q-*ؕDqſ��Ȣ>�Ů����K(!!$��L����]L���	���t��̽�{���rT999a���]��❅�a�+"
)��w��J��K�V��K��_��	���^�GFF�v튼�<dee!99�&�IA� �����t*���
����������w�p�V�F� �HD���%F[�����c�9#F�@������� R�*/��A����\.�v;�n7l6��ك�k�b�ƍ(((@ 8tz��}q�~P	2X(T� �$2g�}6F��P�Pfm��z��ҭV+֯_�O?�6l@YYjjj�yE�<V׌�8�5��b�^/RRR�0` �=�\�3���\�V�����b�
,[�LA��ݻ����r�V�K�
b��^x�8��Wjjj�o���	����o�����Y��h�6�6��Vy�֭n���q��ӧ�a�X�!L�P��o���n��:R#�p�"�|5��իn��F�j;u���z������W_��_ĦM��\��#ݡ�F�l�~�p�5���Cff�a���NL���ŋ���BX��o4M�����C���Ν;�n��W_���:�5�>����������ؾ}{B��p�%��s���	0r��#։�ڧL��`�|����%�9ސ0��v,N�[o�7�|� �F�S��_��s΄�ޮD�p.�Ϗ<�v��w/���G�}�B��`qJ̚5W^y�bJ�������i�� �7�VQ���Ac2F;4.߉S�o߾8餓P^^�x����5��2y���)S�����8+:
�t?�%�h��� |[v�婁����R�O$Ѓ���;O�h�7oV����`�\q+N�6��v�����u�寶��J�j�bB*�*��ax�Q�yZF���L"AL'��jժ� 9n���SO=�h�:
|"�>=X�i�8L�p��	CUTA��7�ca`b�0����_���=�Xlٲ���W��X��1G��Z��JtgΜ9�7*V���0-�;D'JՒ�}���.�����3�1u2�����|${���؅@��0��Ay�x7c�.]p�'b׮]߶�Y,�-��1�)�ॗ^����[����V����>�ҫ*�Ӫ��/ȹg"R��apU�`X�zj�����-���J'ϙg���.��We]ڋ�"Xd�h����S܎q�\���b�^x���A��;�ȝ��N-�-}�U��"\\���-��u�K��-�Jl�صW��w�ء�$��"s�;�8̟?_Qb{ۭ��7_�1cR�� ���F"��{a�߯�`���{t�w�f��*���ñ����p��bu,,,Ķm��Ůc�`���Ν;�59t�E����zr.,�vB�S�>h 2g<�$*Q\�C�F>�tF�[�7n���*[5l���&ss"�%�](YF�_���m����B�=z�P"'�e��`_��OF֮}��C�dL��̇�r��Q��̗���Z��Ȭ��'$;k`�]��-�a:�x+��안�%�-vr�,2W&����H�\I��(�3�6A����-)�NB��-���j ���M0�TC]i���C���evLI$��믿n���f��,OԤI�p�M7�D�o��ܸ	�OA�r-�����Ӕ��}�X�Zh��5jX�>j�������*�����'@g2�g�m>Wb�*���n���fk�袋��C%4�m�|4��|�/V�P�i1Cw�mȼ��[邔��ث7�U��w�F��};��IÇB�`oW�~�d|��+�����OV�T�du$���p`�,X>���՝,�M�Y��V"7r�D��c�滇)�).?[�����D�M���DdN�.�.q�H�HK=���`qd�y�̙>|x��'����es�C��ǰ��P��0L���\��}~o�p}��a��s�o����������6�~kY\��M}@����-R�Z�`Q�$c���b��~��@�[K~�5�\Ԑ���^��;�]Jl�/5d�������|�]5��܍pv6��qb}[͎'Q(Q�>��3%��n��z%����O+T��l�t@�vw��/��֛H��D@e���K�s�0�d���Z.�q`�Ż�ݻ�H�·9�,VO��!�����+ޮ�L�V!X���ٳq��);B� �_~���#�f�S����D�C��LLmF:L�[���iP9}���~RS����ª%i`���J�fST�b���K.�w��b�;)g�� �9�Ze�������Ⱦ2��㛴��J
��=tc�+K`�9��UD�f�;�%����N�i~���&��"kmyƌ�޽{��֢���/�EGFI	<*=B'��y
R�&ƃf��鷶m�3mc������ˁI�%�2Y��|F�!K�iQZ�$�_u�UJ�W����l,��Κs�~��A���G�������2���q�D�3,�]ЭZ��E� �7~R�~�FI^l�Ep$3cܸqJ�^c��{:��q���`��Y�Lg�Mb�+�(zs��g�8m:��]���<�0��j/��2�v�i��+�e�b�;�_}��>���NO�a���Ǎ�	�"��S;l>�`��A�K<�㮄���ͤ�]�Ɵ�����&��D���x��sK��e���	s�����xGC�9���S��0�ґ y\�_~�;�D���$�:��@�LZ�dA:���25�ѐ�)�ޒ(� 	+F���D�LP"E�wI)
_}��և�ȕ�?������^{;�pt{�:4�����x���Q�f&~Oy2	>jU��u�*[�Bo"/߾k��Y�}�8a/,@���@2L�l!ܶ>4�`qlH��>{J^z��!�iE��p�.H���}�C�5+W�XQ�L���^F��/L ��J,��!*������՘]{��|�����!"��(���vG�F��\�#$̘s�8Ԝ1���%�yl�?�8!� �N�P�MGE�P��V�)I<��4��䨁]����kҝ�'�/었�׾�������אA�B0��k�<�Z���U���|��`���1!2bT;X���D(��]91V�"���,�{�sH)���R#x�X��;�6�vָ���������Lh��S<�Fǉ�Ϫ"BǤ���*�l�S�{�P\ΪV@�X�`44]�c`Bӹ<��P���`s���%)=����x�h��Z�t�xA��
y˓ n��p�'&Ot��?���H�� �1�=br&N�o����P(�זo��"+o� �_�?�L����B��Z��f��VI�B���ɘ|��H6�����*���v|�SA�נs#Y�郳q���1�/��x�R�8!m��#�� �~E��3�{�I$�;�hc����={*��޽{$7�`�;��,Q�xV�� �~���姐���
�Q�"c�$���ǽ��x�k����l(q`]����=���!��_��~��o�|pU���\X�e]�l.Lu%^���ψJ��d�����ȉu[J���Eϼ4"Y����w�@R2�~��eERq9���a>q$�q�|I38ɥ��qz4x�閪@qd��r+?��C+
|a5\��Gփ�)��mA���F�ZPIo�֌j.��)<�U�<t?���I��x4F��z�XN*�>��'���&����drzL�6�QC���0����J퇆��A��#���������1~�5J{��=�Ni�wB��JѦ X�.dOp��q��&���Dg��kdN�3�#�%U�D�RP2/��/�����3,��F�),V$�󜃇�.���QX�e?��p@��`�5P����0��G��~R�����!WH��0�x3��0�Cj?\��^��fa<@*�G-����?�j�nCգ�`޺z^�ѳ����\sͦxU⋥7�\A4��0
Kz�ƅx��J�(��yW������RU^I�cT��U5���xq�p�)}��ٲ<i�����e���I�b�[�r��
8/���X8� ���%�lI/+���s2����`o��`��ܳIp����ZX� 9Td�A�Gsر�#��Qct�B}���_���u���oe�҆e ��`ܨ<�q��y����^�k�]8�_.��:��.=�� �Y���ɢt����Ⱥ�F��)M�ުߤ�r6#]�W�2���x��r�b��}����]a��z��=7&��~���vB�F���/'�������	�&��B����~�nVD��X
�>�_;я\z���з��,;�Ҩ\����;�ޘ����댔�&��t���{0V�''�*����}����s͏����Rk,� ���k�UOσj�0�?�Ò�� �!�XU
TոP�$�R�NMѡ�I��U^x��JگuA�U�� Yle�(���� l��� �d�)ץ��}:�g�T��-����6df��w��@�?~��?�?�u�p��~9Vk/,I�r�u �ޫ m����}#V��+/B�+����X���S�],j���A�N�� �[��N�! ~~,<\@V���h	�-+ܝ�J�S%�1�x\��H�H�E����G�!x��z�`#r�U��;���a�3n�`Iǌ����wx�m�^8)CW_�N���lP��(�[=psj�N���<#90���Q�&%��S� ��O�ρ�H�ĬUQ&#l@�K�v��>}�}�dT��o؇���Ϟ��u�br=�eHzm�*k�O%����y�vTӿ����ȥ�a����=����`�AXR��Z5
����e*�IDc����j�_����uU4c�!�E*�ے����ڗ����Ð:c�G��h�Z�U�v9����!
`�A|Q,���Z�(��˯-�����y�9��wc\y�kA��TJ@Cn��L
����*:@�l�C�����IX̤Ι)��H�g������~�ޒ�ث���>�&O@5�n5��y�`���f�1�x���m���g���/#��
�V癧�˴�0��ɚ���K��R�j���T�:R���:�J&�Gb2�7�?�1V4p��٢��e;ݸy�����=�+�����KY�Tz�&���4�^X6�@��g�.�׶Ay��$�ЀEY�*�����#�`ĉ�c�"�)H�?{�ՍB�j�zt��B��,�Xh$���a���Le	��9!$Q3�7� ��������6�<�d#��:��F�����"9���`��pwI���|�+Q�`>{��|�ZG
��i��h�[��k�#�~�ܷ������?}���'"���`f�t<����.R#CF:j�wC5]�8"�D���r���.�52THǈ�XC���'w����ﴩU/�+KU�{�F<��O6�n˽2�̛n�v�$�e�`�.�_�>�=�(�{
Z=� 7*��˶���@%U}sA1�~���A�=S��~��J;�<�)-�'wJ;�B��i�0RD��������C ���+)�T.�X�~�`�.pH/*47Ǣ���hW	��sb��`wP��1H�f�E��x��U�c�*�+R�@���(�-��9�M��I/!���e�SN]��õ�r:9\!a��]5|����y�
�*�	�����q�5��l`P�N���H��J}*`D.OR��t�ބ�WU⻍���?t�@��Txi�5:�X��SAl$,��uc��,F��w�����:z
��*P��s�67�v�F���{}N)F���8�W]�\)��r����5:����ѻA�p�?��[��L����k�8Q����yPEN���"8Y+KP�[>[��;�2F�b�w�qȸ���6ݨ�#q��N\E'F���<}2k��x��W��2�� t�@�mJi	+UQffѳ��|03�o.��2TX��������K�UX��S��ـ�W�9���4nZ�b�������Ւ��QȤ�XB񢥰=>Il���9�z�td�z)lZ�\6@��c��Y�;�*`��d$��B1�W��4�)�������Wj��R��.RI��8��v���%$Ow@�
nG@�/���F$�!�\�����cl���>L�	ѕv�͖J��Ĩ=B�>;V����H�[D��0'k�R&�3���('*�e����(
9��q!��Ν�L���(�/!PS��О�~n��MԘ�!5�*��l�|�����5�)V�dS���e�P2��.z%�������O���S����,T��01`�-�g�ST���j���:s�iZi;{�B��l�%�����f�Q��ҽ��m�uDr֍ף4������pJ���P����믃�r:V�6R�
B�J&Ky��̋i���~)OH��N�n�1.,�`"g�Y�2��#֢NI��蕃{��a�5	Z��PKzOD��zr������y0��L����- y�HӾ�V�B,X��0��م�t�����A�dM>�2J�?����b�����uW��)�B���ղ��N�}��
�f���t5��rc�H�7�Y�t�H4����Ņ�t���1�T&��}�6���� <�8��.���AY�N0M���?��b�A$����&x�����(npF�г:"s�M�I�
��F����o�IJ�} �õ;
�2�󿰸���J��@\S:�b�_bg�b�b�=�E̊�Ѣ����c�t���'Dfsl��mG�.�͙�ԕ?AOn`�JFʤېu��D����qh�4ٲ'*�%�6��g)E�S�=�t�4��A�t���Q����/j3	��̢T�
Q�ʀ9tH��^ͤf��lH�|��
������$v2j"I�J�;$&�n$	5���x`�/�}Nk0j�z���P�f�>h�'"�+�z���'��7��*/� �z���9
��6+~�Y���;���$���JY0c��Wa���N�F�#Y3�KC�f�o�̇֜F�)�ʫ��A9D�0/R`���Xqj�}{Q��p�p�����}V&��؛v1y=r3(������4+-���`���0��x,�/���}5�
PPP�Ppˮ�ҵ%�0'��i��B� �5?㨝��zx&�t�vjSsm���j7vU��"�u`���q�G+�.2V�?�c��(5�HQ��=X�K*�8a���a>�Է��cG��헲��w��L�@��n,�N�,	9�z :�TEakt��~s�ʒg�C�Hzऽ���:�����N��_i�� 'K�K��d{i6kHgSn�=*T<lCp��H�W�ʆ!H{9��[}9��M=�TN䥩j�!d���ztJ1��$"u̹��4��Jh�H���*ƿWoًU%A~QĽ}����HeD�O9��'۱��J�L8��,���Ӻe�F[DS1��"v�spL7g�����z�O����A8j@�b?�V��@��A�}�Y����J
�������������i�}�d ��_�c�Iř��(kba�]�l���8Rpa5ӈ���(�K����R��b�n�(�'�abL���vV���r��fˤ�G�Fg*F-r�ǟ���B�ژ�� �����;�n�� !�Y�,	|u�h�`A����[4��r���~#<}zBǅ�n����\�	[%�S���HebA^zC���a�l�?���\�7��A%ߐ����h�D�6��I�tn�����Xǲ���XS�A5m쐎���h�ʃ�Gv��m�C�_�w+XB�<��]�>>��lVn�Sy�l�QQQ����·E��q��x��i4��_����ӥ�>�&�O+b���7�ǅWS�&S�J�a��bԡw.��`�b�#�Vz����_����l�$AUM�afT�L�k�D�*H��	f��u��d�1�zW���u�J��+�f�>�G��a�|�a$�O�K����a!�:,S�\���b��i�)��[3�O�?n�=9	p�ۀr&��[�vr��{���w�r;�L���΍���lM��<�32�Y����)�&\:����IwN�b���	�Iu�P�5��p�.IG���}��
�0'1+��^�Χ�"�	>��9t ���`+�f�m��eee��_��;���]�-Xe+ٞ.��6���q������7����`6F��g5�|x<~�򑾽���J��z���r0�_g�|��uK�5�uC�^=Yy�&�Zrq��J<���!�����i�e�ɫ2��gz�C��駝�FY<vDw\u�Q8��D˚;�Ȋ�O"s-w�v{q��ɼ��1��>�����+��#� X�Z�{�s/��b%y���l�t[4d^w�!��H�h�-z���rם���O!;�z�(���1�L��H�S�aP�,�Z���l�4J�o�!Mv��s���P������℡]`c��M
�9��t��Td��h����y)k�(��*��)�ݪ��m������.��^ѣ��L j�;A�0-�A���~���K�h\���0��~��7\Ͻ}őqd��@9J�͆��a�P�eB�}��q�EH,�J�&�(E�t���5��rA�q����6�ʹ�v)�kHa�Lñ���];5�v_'@���y�aZ���P��f-eʝJx��+��m�ćA�|�����M�K�@�d�t3g�V
�Lǜ Kn^�.���u�ʺ#��y)���.C�U�r�(�A���p���_��j��@G~��xوI|ӲgO��D��L�����z��0df$�����(��/��~�ݬ-���n��/-��x������7h�R�i�"J�9�S��6w�Aژ�a`$�H-�&s��ќN���ꫯ��O?U(Xp�FY� ���I,��`hhg�p�+�M���� Zk���'�	���QA���F�L�Y�O����N�d�������Pc�F��H��}�����|������Y6����j+W��E���d�J�r;$1��Y�O�c���p��/�%�Y��s8��Z6�)�~���x[rZ̏�,�O>��ѝI�D��F�-��>�裘O�5z�<w���A���P��3���5׮�}�Z��b��B$3͵�/��������~�K�,��'O��.rf� ��X��cF ��{ags�4:�����xl&����OU�W�kҷ�$���? ��e�8�N�h��t:!ʕ$i4�ۣI-:2��5Eђ��x�Њ\/ڻ�|0�-���w��U0�=�v�N`�w2�;ں�h�k5��{_!J�?��_�1��bRa�#�*������|DtΟ?���9�q-B��(O� N;�4�S�����dj��b�(#C�w!�Zc��Uv+RN��=���]X��O ��լ6d�Av:4�o@���(�ƺ�h�i�w��{�(�&a�5��c��2��:e��/��ɧ��b�Y�ASF���l���6��:�V;�7���%{�`��O��l�mض�m���&"����r����?��OE���9�>�����+V=lذ��$����F��Yf綯Ԧ3Y��ܼ��Xd���� [V�~�C��y_7\��[o����R<Fb�`)3jL�F��j�Z.I��{.RSc�Ood2�y�2�h<�lp뙃d���)dYظ�zC{��xq՛o¿�%��/Iץc��X���#@���?�lJ)}���V!X� �>�x���rs�����t6� c��-���`ݴδ�q��@�n��7߆�߯�Ȏ��KUXu��V�&vs�(���_V�Д�̯��e`a�+��+ߒE.�w�ʶ�aj�5[�a(�����8h�����G�6�-DV\��=�,����d*����=�n3pT,o�Uc����Ń>Ȕ^O��92p�,�k�U\���ٳgd�y��Sm�^�wKW���{�!�����<	-�����pϞ���Vv�e�婣���t�գ������l�<e�EjN��}�6!X�.�m	0�3F��T{�D~���r����֐�Z����Ll���H���Pɜ0��'��M4�֬8�t~��=z@k���^�E�I
��ɓ��N�֊�6#Xf&�Y����SB����բ�m� e����r2�\�+46�%U�OHu�A������e*|�;�C`_箝���Hb��tH�v[���[
Q�V��rA�B�;�r�D���B�Xah`uD�����&R�z�^X��C7l(�Y����B�j&7�^ä��z��fA��z�<��r��Jnܼy�R�M��Zh��b�`yI5�LB�,�.��oon���+�7��|h��K�4���D�
�f�T<� R׬�&��r����8��C���_{�5<��J�Xk�n��o7�e�ې�&	/�5�C�,�1���*&��^���O�z�U�����ʹ�B�g�3�ދ��T��*�Kd�j/X">Ku�+���3f(s[�+s�	�e��b�]�VIil?[96 �aK�~T��9���HaHh�nجհ�:��TT���9�?��*�ӓ`������_���n��� 9�D�ڃ\�~�,�	�En���Oʓw�q�*����J��u��8�m#,�n�#��?ɪ�w�@�gš���u�1�����ga��?�<z�!��՘�]+��D|�Bɢ]��M":
$�h����R;Ns��-�M(��o``}�S���ˑ�N��(2:s�s���x�g q�X W�sˠB�"G�F�����&Z����1�Ў}�P4� [�A���]hg곛�9��=H�o���x��ו�C�˖k�1.�Dd�]��z�"��Ծ��>k�V5��*Vl���DvX#���� �M���Kq�=OI�z��G��{�)_G8`�c��9n�I	�e�b��[aC��(3J��2�!�a/)���:�4�<�~֬F����wߍU�V)kk��=���Ey"�6�|۰a����Ĕ;�١��V���ƗD�'$C�dQ�$2���yD�.�ǅdL�ˢe������[uGĔC��~���Fm�̥�(з�~�9s�@�Py�#�,^k�PGnB�,O����?^aۑ��W�ŝ�럥$�·+VZrs��!�I	5�-���3��ĉ�]Ǜ����䰉v�x�b���<�񐵍�K�!82!�_�FNR�|�7*��4"�J��ʐ�t)�)`J�����Y�H�P�UW]�K.�����E�̩-&�/���F6"g�-k��a���#�[��;���q��+�`d����:%/��R'$�`�fō��a���DE-Z��*~mA��ѣ�MXb�I�1y�w+��[������
�9-Zg2�Ĳ�񩧞�.�@Q���mf2|����%���{|���J�$:��G��Gp��.�[^�����GB���}�K�����U�#�a�+/q�
�J*�@G����{?�\�f��ʅ��]ع��={*l=��I�%�P(LX�|��9r�P_�]D����B;���
B�X9_^m}h��=Q���H�����\ط���"��p�g9V^r��o�_�b�w��;b=�v�'�՘�#H��.��>Ҩ�5K� D�>�1W�    IEND�B`�
```

### `src/shared/assets/logos/crisil.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>150</exif:PixelXDimension>
         <exif:PixelYDimension>150</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
��Q�  UIDATx�]�U��;�LO$� "YĀ$QP�'*OV�5|�O�İ���'���5,뺆ր�UA�]3��9� �09vz���S]�=�i�i�;_MUW�x�{�=��S�L]�t��0>������V�1�L&��٬~��o�C������o`}��P�h���x���v���fCff&rss������,��v����l�ohh@}}=jjjPYY�^3?�Ţ�3�O�����9G"G%�a�=ꨣ0h� 2G}4�����:uB���
h6�y0}]]jkkQ^^���R���(���ʰe����OX�v����s*���`��G�q���'�N@׮]A0e�	�Z�pgv�#??ݻwo���ÁPTT�U�Vaٲeذa��Z��:�M�}��.�<x0.��B�u�Y(((P��-�K�^UU�]�v��?ƢE��m�6p��p
h��hL;��v0	�y��j����4i�L��޽{kmi7g���^{+V�����q��A5�
��=��W	,�/�0a�5�=��WWW+�?��#�����s�'��*�[�55�#�ꫯ�\��]�Z���·�~����c޼yJx�hn����c)<���]t�O��^�z�y,Yh�u��������9OS�nM��n �T�g�}6��Δ��t
dO=��/_�T2����`M���z�7��NS=�5ܞ���d�<��j��ĝl�m��t:g�%(Sݹ�{����V	S�ɲڲm-�EKռq��)�Jaa���%�@^��3-d}�`
Q�'�x"y�\z�J�m�(��sUƏ��oT�h=#0� �p�W9j�{/���������Ƥ2���W\�9s�(z�F�&��v��f�iqz衇K�u:4R�j�9眣̞T�r"��8�[`�@\x��KN}#�����ѣՂ�ʕ+��'^��`ε�֨Y�f)3cې*uK�D}�)��gϞ��oԼπ0��9��R�5j�~�i��.�۶��&(�pP��C:&�
�6rǎ�ٳgc�С���Lϕ2Z���B&��T�) p�>��c�&R�#=�1c�:٧O5��K��Lv��裏�&�x	O:D�}�6�HN
��_�~x�ᇕ�L<�I�	O��gΜ�|�(���=�cǎx���{����-S�,w�q����KH`F��n�	��~z,���@�>�^{-.����h�H`
U\Ý1cFB֗h*z�ǡ��w߭"��OqL3
Uw�uWJ������{�r�� �K��?����r8/U�0b���w�SN}�,N�0�]�_=N=��T��aSO�ǚ�p� L�0|�pL�6�U}�DZ�!\j���ەKqK �4�9r�CE7�F�p�(@�	:(&`fv��+q蚖.Y��5�\���hN��zs��ݟn�!͚5
�3}ۮ��:e�4���j�UW]�c�=�7+]��t� �'\�
`� ��I�*�E�p��%���h�#_8[uT �=sBO��䀒�\�DKSq86�"�4js�1���H�_N6 ���&�!���4�U�0+����Sb��w�yj��V�X�{�N��^L�S�^�i��\F6�"�|Ղ^����)�Wn馬��h`6����4���Gn;wP�!H��3]F�!5(��H��:i!"��t�b�H�ԡ }�.���`�#L�y:]r�!u(Э[7�|���
���'�T�##غ#���
Qi�����vM�uO��!%)T��L�&�ӯz�$�!�n0�3=�Җ�:��&{U`�����vy+kа{7ܕU0���ѽ,9��ZɼnL4��/RH�O2��mS����V@0�l�`iҷC����µ���R��iٹ#l�:�$�悾w�5�[��H��=o.�x�������֬݀���n�O�큼	�H�ւ�0�=y�F�9���"��>����'��uܙ����?
�1��6t ��Bƀ��$��+z�5x��^�[`3G��R�o�ƺ�n،�/�F�'�aٳކz�Y����s�D�����5�N��۷��6ΒJԚ�A��+�3t����j�x�d�����K�q����ָ���n�z]n�
��{	�͛଩��-�׃A��
Q��h�u::L8C��i�����O��~+�f+$-cf����� ��EY(����'��U��ڹS��>�J����އ���L;  �W����?B��saߴeb���}����c�Z�[W��ϖ����x�M���[��e�.^���l�=Y�D:���}���9��R��#C�H��& sA�#8����Q<�-��<����A.T[eԞxl�;�n�ԭ݄�R8֔�|�ch��Bש�����f�������_~GD���TWKY%2k�`�W��M;P,#�������R� @6�V��--׬�1��U�3��p���G!��Ap���S��f`�d�J[�Y���*t�dʛZP�b���,���C����z���I��]�C�$�G�dQ\[L{�X�\s^G��b4�,��{�?��G�s�<d�V�f�(�Elߍ�m[P9{.�ǜ�y���ӫ��1jB��b=2�^ @m[��>}e{�P9o�~؀L�z��>��l|_J�HaN�|��\�%�y�-8���jG݈�ȟ1ك��%�]XE�ν�\�5����*a�_�D�[�y���g�V*s��S�s���
��h�h�s�,������'TYk�����i�҈r1w��u
&��9 �8� N!�T�߃�;Pߏ�Q��7ȸ�09�"����y`r<r�7��U�'#�6�?���a�� {I1j�}��1#a���mf�ݫ�+�y�Z�L6�w,p�E�����l;����¾�{���1r�eU����˧�ޥC0n�L�/3��Ǎ�j���p]1QGͮ"���B��4㌑�p�Ap����6�9�8V#s��C>|��X��s>aw®��&�y��e�X��|2͚P��zx�K0�#�������wO1L���ly��=mD ^��ޥ3r����G�3�Tx��V�m ����K��M�n��X47 I$�w�m�^�,�����I"����ޱ���+xw�$Lp���i=��#��_7��酨2=�����e��}!}"8��e��Y#��ǐ������d7����Jx�6w�hd��r���*��C,�G�$�M��%�D�Z�q�4��m"{D�q���a����0����k�
�2G
��kW�����偣k'�����&e��m}{�ܵ ��
XE`+{���������[s�0e��&�aG�HN4�ս��M � ��
R]UTx��s�[���V�LQ�#F���2?m	�z.�����/���erυ:Q����M�A�H��k�ϔ�U*�u킏�U'D���u�Q��H�D�2u���p,�� d����`F�����`�Ϧ����U�YP�ޓ>��V���*�6�<km�i~l�5{a����Q�u��xm�R]��ԋ-2��09�9��u�{v�p���Ik��*���(˕oM!l2�Z��1�!�9��I�5G���DE��ȼ���8�Qhd+�(B��+��ji�:78QpYj 6a�f�X��x�2SRU��S!|k���l��,���D��Lש��s�td��+�t?�\��c����ep�]�����݇��jXj�@���� *R5�JP�}'���/�Ҙ���-��R�3���	��g�K)V�xe��D5&ޠ"�p������P��e{}b�a�"�̻���Ppׯ���I�F:7��s���!��[8��� <�੮��`9�;v�����vlu������WP'f�YdWAu�@f���* �2�J=r�6���B������A.-B�zaŘ:	9S�Q��$y�N\�����5�]�8�qB:X,A��Ybm˒u�^��py�s��_|؏�w���o��%�.�&�^��+����IeuU��K}��	�zB�]��yE81�p�ՠ~�Nd70lv>�O�W�����SGt�tfc\E%a�bX��9��6>�i�f�T��dYe^KV������Z\�r+ľl���jC�_���4�A��6`���4�"���k~@����M��jW���T{���&z��_m<���o��~[��l+E:��.���䑿����P~�#�c�>P�p��<k3��"�l��%G,[u�{�P'��}�Q:�}�׍c�K�%�_F͝���?b�3/EH�m��"U@��Hl��G�E�0�2�4[V2��jL$d���)Ce^��!v\�g+Q����h���'�v�⥰�X��2�j��|�ƨ�Q���!����8w��p�8�/���7�~7l�Y֐��JG̮(�I:X��O���̀&���|W�&dr1Ad��>��#�$���)�½������sm�IMw~��/2�̲"�;m*ʗ�la��%�(��pm� ��0eg)�Q���0��ȩ�S��;f(�F�,�0pI��2��if�9睍��´�1����X֗u�t�'�1'���`��$���P���p�ST��'��e%���9�*�Nz�
5k�G�K�"G:C�����{�i��T΍ * U���2���P�`!»hJ��
�v�S�P��ɽ'�.ǩ4�����e��݋>}���
�>��\��Y�#o_1��l��E4�s����dm�W\
�*׍�G�ÍW�.6i}0����AQ�D5j�pT�,q�=a(�D�1�ѣ��Uh�e)�p��$'[�S�c�2�Ɛ}�q��l�Z�ʬ:�Q�<�Be�\4�gH�&�����D:� ��Eu��(�~:��r*1�?����b��SE�lB�����Y������}һ��7�,��/?��,&�E��fE�_^��N�|�M���
��ZY�)���d�!TyN>�5�]!K����.���UKsk�pջ`�<�n��߃���P��ȕ�[.;��jR�K��G��������V+:5=E���#ͬ��W�@�|Կ�����c;�v��k���.nуk�eL��/�D��3B���b�83��P'B�S�7} 7���s���|}��5LjI���"�R\Y~`_�8$BF0���Ν;Ȳ1�Yց.��Yu�Z�oԯ����� @yū�!,0o��Ȓ5���=�ul�.��w��
۴Jǳ�8�	�Z��sdUj�t�d��d�zsE���a��K�C�iG�<��ˍ�,���;��"Y>U_�ύU�ݱW��ę�b��X��	�v2���_W�:f�-���4��+�!�Q��2�)���ʳ�o`' �r�,���>2�ʖ���M>/K����?������#�?����rY��*�xg�
�`��H(}�TcL�X"l/3CF��#7U��F��J�Tө��D��R�$e�Y���N' oy��Q�����b)ȇU�������:�8�8��7�C�J��sr���ْ��!]\n����1���� &VcB�z~DQM��e��o����C���7�`m&�4JB�)��C�S<b�6ѕ#�$����׈�6��BvF)�߱O�ԧ@��t�o�o߾=�[�n��B���o߾4�!TI�MF0�~b�#X���n��5o0IB��/��R��4�R�M�h�+V`��GԵkט[X\\�8���h�빃_5��!�B ��_�������DU�-���vC�bU)-�`���W�.����ۦ����-�D^0+�o��z'�|r̕�g�����Z��QF� 4bab� �u�K��Ĵ*} ���)xE@��7OY,�Y��Y��t�%S�R��k���|f���W�5�O��*�ĉq�}�5�"��88�`>�w�~��{�뤱n#���Q"�7L_y��V?(�m

c�7�
�ץ\��SH��0�#�s���~h������K�z��s֞����b	����"����_`���8����Q��͓N:)\&�Wޘ�����{*M  =���H$����'������K9�)������h`l�1_-^�>r���o��."��AizѢE1�J�Z�`��qS�x����!��J�Z����{�: h��ϭK��%K����70��k�.5�n�ҹ'�����>��	�A��x��ѝ������zR>V��:}�d
p�`޼yM�ff�5k����'�J��I���_j�(��0�%��,\�0��ɬd:��(@���[o���Z�E�t��;���u���W�t�V��g�}��k׆�8*�9��n݊ٳgG��G+�;�e��.�o��4*����Ο?�V��Ҧ���6.[�L�r��5�l��Y�f)H;h�_��O?�����F�� �D�e�7�|SK�>B
<��3ظq���G�FL ��p��'�|۶m��g�~P��>P�	�Q#\�1�(pmذ�?��r��i�^�R�F��\-�Fb�Zb�Rmz�嗱`�-����(�%Ĺs�*�W�Z
1��(p=��(,,l����$R`�ҥ�{r��4zYl\ 3!���m�݆��"�J�V� ��w�}��,��ф�f�d�_�5���?)�h
Lǉ��̙3�pk�JI`fB6��o��W_��L��L��{������?oV%
Wl� s>�'���>�ŋ�+#}/
Љ�W^W�(`E3��K`fFՉV�[o����!9�_����{�D�λ�қ���Gl����;�CE=��s[J�~�8Z_x�<�������>)#X�'A�H���ەIS��>�F��9s���P��x�e�I�j s$�駼�1P����#7�`�%`N����]w�b�Б��*���o~��
��Xd�D���t�L4�p�Y���J|��Wjc���eG�(��p����pO���{n�/�){uuu�BҬ� V���,�!�bȐ!	��u��L���k��F᪥���`8�s��p�Z�r|_�[n�w�}g�rD��myƌ�+��Ī�D�ę|K%�sV��2��׭[��ӧ�n���"��*
��\W��f�H.7�6�UY��r�W�HO�z"��=�:uJz�5�۞~s�W�^ˏ8��G�*�rKm1��6����BU�#�c�#�rF�]�J����-}�~��߫E�"��6	9��+��QʦG �����5��6U:�X��l �p8�}�p����j��`�*�m�y�Wb���I�ّ�К������P@M��fk͵���d+�H[�>O!O>4��)q6��E�T�������K�:*R�h�k�ː)�9ѫ�V��`����ypt��O�M�6#G�D�~��(��La��!|��'ʭ��n`5��{����̹����2e�����w{	ܙ��=��R)_�Jx�d	#��tn	$�5��ID�on)čI�9f�$��Ŗ����-[�@�M�U�J6��{bݰ&\�ɼ��Xts����^����T+JޣF�g���8�l
2$6;G���*����N��ձիW���Q2&��K[ͯѴ�8�S
`}��Z�s7n<x��{���W��,ٷ� �mjg-�6P��5��h���t�'������	ɣ����H��(�A�x6��"΍d�z�G(D8b������Π��#���o8~��C|���0�gM�9B�A���R��ap$@�Q��#�;���?�v!�1    IEND�B`�
```

### `src/shared/assets/logos/hoec.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>190</exif:PixelXDimension>
         <exif:PixelYDimension>190</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
�I�  2IDATx�]	�Tՙ�k��h����!��a3,a���qf����(�0NZ�YN �G���$�8��9J9g� �i0��qd���Y�����ﻯ^������W�.T��������������¢	~�؄�U��<����\{�dK����J~~�L�<Yn��&�>}����X���@uu�l۶M6m�$~���:uJrs�R�w˥��]l6h����v�$�f���y���u �J|��R\<P:u�T�0a�8�T���/8 �������RUY)>G����֛�RB?O�0��0&���U-N�G\N�̜5KJKKe��	H���9"k֬�-�ߑ�_j�  ���^#��S`59F��N�J���ү� y���e v�\mA���$9��� �7o�+���ӧD\��d�F��U�0Zc���̓���P�[)%%Ce�ڵ2q�D�9&��,��:t����=r�┸�6��e�5F�L��2�5hy�W�� ���(p��fŲ�	���I�dݺu
3bW�c�R�v�v��i�,���_~\��u�� V�l0Z][}��;�!��v��ng��mUҫWoy��'Q�iQ,�bq��=���ҷ�s�`g��UC[���K���99�.uѢEP��z �%�*�3g�̙3�Y2�� ��3a��ݮ=�^/���#�XC� ��{��,�����h�=b����[n�E����[*�����WY��!��{���s�M�!1�Sr���3f`� O��ƍ�!C��� ѱ9p���ʔ)S�~���ǎe=1-�s����x�֔�iq�K8�m0g�i��1����2U��z���� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�� N�"sG� 67~	�w&������d�=R	��ǌ�_}_"u2�ꫥ{�iN}�gZ�+Ξ�?��m�.��N�d=|W�y�Yٺe�x���r�}��5#G�>'������V6 �������Gr�{vv6<���*�9|X��Ӓ2x����;�w�%�;��S��gϜ��=$�}TCjs����vclh1�u#++K�x�t�����rϝw�g�~��r�zd�r�����O�8!/X ݸQ(��$���ҽ������Ν;[L��20���*%�;��$''�6ʱ	?}��<��_��/�0F-�5���|���ղ�o�l4�-	�(|L-�.��/�$+ӤM{��o�*�_{M)QA�"-`o@�`�.yڶ�'�CZk�.\�U+W�i�ğ2ؿ�s�Fga���!^�����?@�w��w3�CZ\SS#��)��M����2}7��������t���1�Qj������2=�5�tE�lŊ����˦�ߖR��T2Hn����1��TX��w�?ip"P8���9rM�3O?��kJ�����Ж�Tu�`j�u�n��vy���V.������Ɲ�עu�iњs$�l�٣��
2f�?g�N|��2[�V+d�Ԝ�=5�@k�Z	`*9���6�t:�d@4f��P�a
��d�p���P/՗.��#u�1��Po���߹��z�����>�uO��٨g�M�����J1�~]+��B�=�c�����N��� ����Z�`�ԟ�\���Od�o~#��N�3���� �~�,]�XNc�hРA�򷿕.]���
�S�U�HCf��?*�ˢB0�Is�L3�F9��s9y�8\MESy0Q ���ˇ!ր�GȠ�c�u�s�_SKGMՆ^����d%5j�<�d�|�{�,��@������z߉�����W�^�4���h��M\����K��O>�H��\�X�.~8�S~���Cb(	]���)s��J���w��@���@p��/�a�Ii��7@����(裡���lX1���o��r�YSh�iB�&�z�T����M��}8 -���GM�U��Y���` =.H/��N3%�e�/�:o"Z�X/I��&Φ 3f�
�,@Q޹�l��?Q�&�#8"�{Y4�z��D�Ǧ9�k79	3j|�{��8�_5�̃���G��t����,�0P��:�	Ơ۸��x�|9T��?�7�6��'�n��r�It(;�W���`��OT�"�2$Gp��}��
�8x��R|ͨ ��HOǧ���qAi
*W �@]U\,����y�䱢0N��\�G����R\e��W���u��-��IU�����K�T]8�4�ES�7��&�k�~����	Vc�e�XqFYOƈ�D{��={�ͳ^��S���/ϰ�W�-W��A��|�SOI�~�),�y�x3`a�Z|�r�Qu���9ԑYuX���>&��|�<�`>9�1S��P���p��|�J��.ڻ��p��ϒEH�	j2ک�>�@��ٙ�~��\m�:c��0�	�Ǚ�t2��`#w�qN	Ɇ��5/���Q�KL$ˍ����)?�eoo�kF�h�}�áV���V�Z��!O��9�f;^���j�П��U�)���Ϣ���$���/��o�F��X�&���Fd�f7�`'�r�S+��g��� ����.'���|�*��?���al���U��矊��&"��g�>F�����Zy��Xf���-*��C^a�ڞŃ`�k�ò�w^>�F��x��)�=i����|RW�?�����r'�Ϙw��X�N��ms3� �f���A3 w"�A����.�V��l§͛߬|���X�G͔�A��V�	�)//�����[��C������5�o~-v�[Rx?��1�F�b؎K�Ğ��t��|�m�x����6J|���xA�@[Źsr멍�F����Ʀ�Hm����4�}�/V��U2�� 2���_�����+k���,FŤ�;R���]
�t�n:�}e��*��҄yq��̴����e��h�YSBq�֭!Æ�s/�W�o����Z`)�Ƣ���gE#Fʜ_- ��@�g���h 3�ƈ?� l㑳Y|���f�n�/C��N���|H�V�tʺ;�.Z`7����{�`����Ѭj�	%;�$����R���Il�zh��Us�3�����4���nZ$`�Y�T�����~85�8�r�z���X����yd̦W^��_մZC~��N_�F{�7�DFL�&'�]}C*����Z���`��/��~C���g0D��%"��'TК��t�r#� J�Y��?��<�}@T��}0��`�cX�m�ЈISe�+���r¼����������X�s���z�6v��u��y����T�C**�s�y!҄��I\��,x�)�U�(���r�j^�5����~hӉ�Uzh@*�l,���M\)�tY9y2��n�JHk�^�2S�N�q����#��菈Ԏ7R�L��4M���s��84b���:���J����$�&���*f���8f��~��6���ƫ����j�R�(I��@1(+�؀Ъx��z<�5�m��\�8`CV�$ɟ	M>U��l7�#�H�^��=�/��O-Wf�x�AO��cY����(}�$�̄1��dx5��{e��n�3ǎ�1m2i��)s�re���r�9'�G�Hq*m�$�y���Q`������{���T^{�1�Ƽ�j��2���r���C'Qk�GN�^Fc�m�`7��t�N�)�>�-,�؛~�U߃�I1A������'!W �f�<���?lxR�\h/��>"��Ko�8�a��ˀc��J��[)lݓ�ؠ���!@�L�k��z�9ٳs;��ğ"4$;Ů	LC2/Z�r
:�=�T�4.y�	�dǋa�8�1��V���.�jk��?_���0��%%%��ڵ1g��w��z��)"ï��r�1g�r��r���eX��VÛ�x����Y�1)qゅ2��ISq����D��#��Kf�J�x��">�Z�};�f�߳h�<�ҟ些v4%΄?��rшk�W^/ߟ���b'ͩlR���td΢��5^�Yץ�Y�\a��K0�Ǹ��(�t=n2�s�t���8I6�i���+C0��.n>��d3ʱta�^2�~&�x�QT�G�{�i�E��\�D��?<�~�ǔ��N����+ �������,�++[���h�7��?�A��خ0ϥ��f^����΢Ywߏ��7�$�;M�~����g!
��{8��_V|I/^�}���t}�~�L�~�J����*l��g����\��#FDh�����)�����3��ԡӕ�f�0��47 :1���hZR�WFd���+vB�e����eߗ_jJS���.&��6O�Kk2�Sp2/���W�j�rv�7Y g8���΁/�%��΁/�%��΁/�%��΁/�%��΁/�%��΁/�%��΁/�%��΁/�%��0=�[!39@l���	t+d&����7�lr(���찥z�wľc����;,2�����"����#[�f��>SK���E,ׯ_/���e{����>q�DcC��رc�a���1{M�]�b��U���80�V�g�a���J���6{e-}>:e��-�e��[�� �[�l�8�\��{�q����e%v���cV0'�}�]Y�|��Ju� !�쐫ᚷ��D?\.?��>|؜%��T�e˖)�֞�x�2cǫ�t _��	�{"����_��V0�1;r�xm�R,����]Tץ܉�×I�)��]r�|�����2p�@)**2G);(��R,X G ����_��`�-�W�07$C����/��N�p�,@�%}��Q@7�_T�u����M����T8,�ٲ�\&A��VX��D������/ˇ]��9s�,\�0��b۴t�e��i����l����:�b5]KPj�%��F��~J/�(�@���*7[ 2\�C��}�[o�Un��6��X�m9@�K������2e����[��<u��"������v�#�}f �S~1����8�턶/n�{���c���ٳe����Z¸Vhpʏ�FN
��G���}G~уaPU\D�� 	A�JHE�9>:    IEND�B`�
```

### `src/shared/assets/logos/igil.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>150</exif:PixelXDimension>
         <exif:PixelYDimension>150</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
��Q�   �IDATx�pT���B]�����`��q����`'��Ğd<)N�t�9�L
i�괙8��0�q�ĸ�16��B����z		՜��'����V��Yv���}����~�}YYYCr	��А
����[���0_EFF
�����NĿ�'b�G� ����k``@���$..NRRR$))I���%66V&M�$��n�s������WΞ=+���r��i���6�����k"҅��`�H ܴ�4�;w�̙3G�O�.������t�2e��'O�l@��`{zz�ܹs���!mmm���l�noo���jٷo�>|XN�:e$�����0dED�Ep�̙3��o�,^�Xrss%33Ӽ 1P�jll4�744Ȟ={��_�����c�u��Pzi�
���EEEr�m�`�M�&�����`,�A���/���<���l�o��`�Û�C`=��5k�\y�����߈`onn,������k�����?#���ꌾ������h�)��vчr���M7�$K�,������2�#iv��)/���<�䓆�1����I!���`��w�!���3�c��9b���5k���޴3^@�+��b,�U�V��?�q#�'*����a�������?R[[k|�v��`D1��ҥK�3���1��t)}����(�֭3~6F���>�`�1�
������|��&�����7m�$�<���ʵS�[�_��< �=�c~}���\~�a!�lk{L �k�������/~Q����v�G7D.�x ������޽{M��e�E��:����py~��<ֆF0�ϗ��%%%�b�
imm�cǎ�xx0@*3SA��G�K_����2 ��9������7�񍠈�q0��P�W��U���?=!��1��f,0����ۍ�HN
�X�Ċ�����}��wY�[O'��ٳe����k�.����p�7//O~��_�ʕ+����t C�8�
�c���'O$-�@)Q)�����d���<�!�7����>*�^{�1N�c���q0�rqq���-[�O�.�s�BY�h�q�(4�G'���\��~����.{�1 H����2o�<��M�9�%�G������V�HYY���曦�ė��_�~ p����;�����Y��� CX��$���0�_��'l�����Q���-[���M&�g����塇2Պ�q��5�S�����]�2U��ܷO .���_���d���c}�pD1�ozJ^�QE��k_��q�=�P�8�G������=����X{0��zd�*ot���n�@-R��ܑW �@�:u��a=�i�G��W\q�G��W 3c��~Y�p���Y���#���O~�&�ꎋ=Ê��?����?��`QS�TuEL#�����>&��ɮ��6F#��F�H�{0f9��DU�:#@��vWn�[�q�X�u�=��KnB[�b��B����x&Ct�UW9;?��8� �1|G�.�$t�{���p��89�����E���Y2�-�,��G���]�Jg�`�3�x���u,���#@D��;�t��
0�R<w���{~���6������G�g��/��#@�����`f����ė2���K����"z;;�`|*�N@y��T������9,BW��	��#��ť�[�Nf`o��F���>9�, ��k���mr��Y���=�7H��N�8�W*�8_�rst�&b{�鱙�A���0���%:H�L������}���7o���L�E���.=]�R{�Bڛ�OW�WW������ǥ��Lr�K�7I�[�Χ n-�qKK���v ��$N3Y iHۭ:zP��z%fR��ٲQ�Sӌ������3g$5#KS��О�TW#�I��ٻS��J��Z�q�3fKzf�K �{�ۢ��k��'�x��Q ���ǁ� &L[K� péj9~`��gO���$��ҡ��$22"R�RT'�H�r�`��*G�gf+g7H�����(31�m�Ň�K�GO�`C���=��9�`Dƕ��`���\�Y�����so��	��v���+�)YS�I��F�
�s��4�ާ�ޣ�U�<z@Ψ8OM˔�#�e�ӏɍw�+E3��gR�[�tL.��O���s.� ��
7���ZΞnU@���ѿs�I^�tIV��ItL��q���d���ѓ%N�Js�)��~�im��ړҫ::A��i]��!�D��L׶Ƨ��q�0e�����,������RM�k��*#;;[�u�)����K��zd��urV����(IJN��
l^a�LV�TOV#����=Z����m�=��Y)iY2��;%3K2r�ҫ����I��zSٳu���2o�52m�,���~�+��k���S4%J`'E�=!&$K<��l��Ͳc���K{t����ɖ��Zp�ƉY5���)�\�.#�E��r�-� ���k���,�+����Ҥ`uH����ZIRcjւ+T��J�T���u'+e��V:Z��cx�gM�H��C=��y�74)צ*������	�*I��,u�'̹��&��)�;9��?�������^�RUKת�	�gt���������RQQ!�j�vuuɀ�n�(�^�N˲�?������=������k��.�Ө"��ɹ ӈ?���77�����ʡ�ƀ*����+4"˙���@���.)�1G���?*J�.�ۥ� V'۠>)�.u���#��ɚV(�{�����:5�N����iť��n�w�K{{���]w�e@�+�Y��VH � �cx�i�o�aR����g�z)�:a�t�j(V?ۃ��i���5��`���BD��� ���\4�F�q΢���V3����*���.�2��D�m����-}�E�z,�����<E��:å�u��4����v�ڵŜ�5���y�]��>��-\�I䎶m�f��({0�Օx���Lv�a�¦���c����{�I��S��mO�6��i�`֥�BX�5'���E��4X�%��X�S:M����]J��1��2��GD��<0��3E�W��M��<#����$�����e�M�R�ޭ����VJf�u���KҫzL�g���|E^}���s�M��n0\�F,�_���و���^3�M�!&�SO=e<�իWms�3f���x��o}`Y�/D�*F�X�Edf��X. �W�ܯ@�I��@��*C�q�*�-:?����'��L�\5�p��4��5N?���KJZ�{�׍��-(�`I�դW�v�����e����뇿&V�}H>��əZCo����gOi���� �6���Ý�}��#�����ܦ�S��Et,����9����퓃��I������ n{�E3	�Kf��V�V�	r*/G����������p�����T�����u����vO�����[��m*�j��� �T�k�t
�Y�N1��G�����7�����Y����7�[���������Bđ�m{��ǜ�"���(�Sԇ�����Qn�R�k����͚�HZ�7ǩUL2*�M�|��{�ա���pD�.=��l�1ت+�J�rr���0�7�G�O}t��f���y���81�F�}�2[p�>��|�Ϟ�	�GK�������LBԅc$xK��)�*��T�K��X��b��HP���O.Yr�Mrx�vI��T�&Jj��x�z�Ƙh��z������y�>k�y�n�����VC���s��
��AÚjХi�����}���+���~cs6v�8g��<%KZxz���,����譸 �z�S+�4��pJ�L)�ŉP=ګܥD��SGK�&I{k������1�f(0���s%M_�
n��#\)7����)i���P��>g����֬V|���,����>�ƽ��G�<��3����U�����4��� �-Y�`_���Qf�
"�i�p�(����z���Y(G��Pp���QEV��bUާ��~��A��=�:w�b��ܩ<d��W�y��[�p�\=?�rӊg� ��x�<�@��VW�[�����؏'��s,�JF�5��/�p������̔\�����i��s�F�v��mi�7�P��\�d�-���~�z�5֬|)'+K��q|d���j���E�vv���G�U׫�-0�TBR��.���g&F�Z�@s�/<b�=�A<�G�X���j�1��~L����{��Ř,ѩ�]�rn\|�1~YZ�c	�-�f��n��7�T��=��.�����7� jb�iP��Fo��-bv�non2��C��i�ƅ":���ш �+��q�q����~�<��&�6�xE�Z�B��@0�`_�;������! p�`�4��΍�����N¿��&��������B��*�j4J}��8�h�r�g]��[75�h9I�J0�erq���2WD �юi뭃,@\��o���f�.8j�a�P��o~��a>��Wg�yK���͕�;�l�x:v�`t11��NX��/3\�y���T���q3��ZE6�v�Kl��<���L=��W"�֚zߞ�����F�%J��"�9�@�^<�� zB���L��"�\WU!X�j�"&)�����Rg�AU���l��Zk&�T��"5�fͿBk�.����
�>3D�
�@$��h�V7`�yB#���e��q[�Q9D�\�R�Ğ��"0M���H�K���y�7��psqf�7�X���-(�j�.�P�hi����]i2�KJ0I�#C��.��TnXu�l}���+e�rm���KݚqJR�]�	g����^�?��@KrZ�����t�;镘�9��������\�M����o}I�;����v;PH&��������/���������&1K�!n�3���D,ww�1q�T�G��u���3�����A�/�"�f,�F��֟�6)Br�#	P��;�0�bTߓ6$c��E{S4�4]ۢ?�(��\"��[o�B���Q)�P?Ī���z�]MM����Č��4���v �ͨ��'` ��EZ�V�p7��u�4S����g���cG���Z���_T"�'OHs]����Y��>l?�|���6e<�\*D�t���rlcm�	a�*.Zs��;���0���҂���b��������î�}�{�[��%��W�<��>: Lb�����ko�d���Nj�Ck��TTf�&��ok'��ڭ:�c�޼I
JgK��uf�>��*գB�D4���1!'�~�p �m��2כ��}�U��8ܚ��?�m�qZnӚ5k�o��E.����o}�[&}hK�	�ݑ/ c+�W�Q`��B�j�෶��T����G�t�R����EİI$PV�X[mB��ؠ�	`ףt����z��	
B�D��Zꪹ�$�d�"�]rG�����?K3�/_>��`��G?2���N>`uCo�t�,��>�9)..vr��_�8q� |��E�Do���J�9�|?�E��2�
F��;�Q&�����G��O����&:U0��|�"�o��rp�Vy텧4��.�\k,@'�a���b��k|^�/��"E�%1l�p.�$�wwd���B�O$(���c�n���7R�̸a�R����wҍ[�n5F�"(۹뮻���>�V4������J ,(��ٟy��L�N��M�'�Kь2�U�%^u%@���-7��kn��TKRN%��E��Y��L#T	���8���R'�j)����:9��&'r4(R���Z�Yh�5�I�����~�+���f���`�.���D����5� ̤`L-�w
H�D(�=��:C	�� 39��x�$�i|�(%�p&Vn^��jJDj���h�CQ��a�N��c��lڅ���D��������7��%KE!��#*��Q�����g������e���?�_�����cX4/wDN�T#[�����7O%��҅g$").�������|��j1/_�n�Sv���i��QWnT�	]��nT��S_h{H�ۚLy-�M]4I
��ʯ4>.�Ѐˍ��m�񺜪<fٚ�X�^��P{C����q:њL��`�0�&"�*��Ǐnr��x�Q��^�䅉�Yj��=��o`�� � |=�sVgd52�;�&M���d	1fjП��F�SX�����DsT�Ʊ�#I�8�D�#��z�YA���F�N�GW1��n7�m�5&��~P}#S�]r������w�c���2��V���A�m��fd����>��mz����(Fl��?wΜ9B)�+)a�6��%�A��z�� ?��?�gb��1� *}%�ݚ���^P��U���>3�Hr�yť�y�G�:���EMF��(-�UWQi�d¡��4՝��-[�z<�p��u�Fr���o� 0f<*��IN��$\���}��i��	���|:�d�	:C8w��Y���F�F��a������r#�����7�B���Ĝ/1�3��3@S��q]�n��:v>!�~5wd�R�25�;S�|q�����#���#
Y0��ʃ�m8��׾�D��'�a��a" T�Zܗ�G��yp���6��EߧU�ej8�\O�ѧ��j�F�4�c}�(���(ܜ��c��)�!��D)Ԁȼ%�$Y����ո�eOp<>7~���F`�7��������Y)GOՄ���ʌy�&OL��W�fVv�;4�b�Z+�9Q+4�����r���%�^����a�0x@/����-���K�U��Y��>k��@D�X�۠��h-�-)[���#�h��j�Ҳ����^��O�u1��7���q��YI�`�TV߱lў��~��я��pH���X�p"�MR������LT
��:k�Rb�P���<���7��#G9X�֩�s|C�4����7bE���Op{/��^�]�/X��h�R��>YG�������i��q���]�v�/���d�Uu�5�Y�0���5���ch�Q�b����E�9����+�D��+�9��[�)tG`����(��f��.9�1������uR�=tF�Xub,*wV��`n��H�>���{�o�>��-o�`����?���6�C:#@đMd*++�r/=u0��w�Z��wa�`�
����y0'���h���� ���~�3��r��&:B)�o~�W����_�j�;���]�`Nd�-��0���Ї��=��{G��+�i�T��?l�TF6�;�# �VG�հ���+�9�L	ev�Yao8�98#@蘱�-yU���y1����4v#��D+,w���� s"��ڟ|Pwk�k�~�0��Rc��Ӂ�.��4����^�z����.���@�����f�j>L�1)�a��0g�򗿘-��Y�ή��\���ֺt��w�;�=���rUO���QZ��������(�'S�Np��4o�{9O��<`�S��Yys�~��,�Y����a��A�ɱ���Ť}�f02�6˶8�����P��R �.W�4�DZ�l�b��`=N���6�C=d�yk1;�R@���#���f5��Jg��ܿ�ӟ�d�rEEE@J�πL���&��:U/Jp��|Pm�;f� b���\�JA����-�vax��ٸ��K��b����#��hi4�w�����c�?�d�� �}��,0�@Ө+}!��eپ 1��&t���	��G}Ԕ%�*����c0Ed��<�����eg��4�}*ѵD�<��tBLg�IlB�&`����{!>�&�������[q<�1�`;
 �Nl�Ql+�j�* �s)|�7m�d�]�n]�t�hc5n [B7c9�Q	�C��{L����D}GJ����B��TL];�8�;�tnF�� ��\��+W���G�x�~�S��F�g Xı7I�@�[H l�@[:C��ـ%%%��X�
�;�֐�g�B��`�M���i/� �w����sv`�{@�����ne�8�.85��
��x�9d�n��	uIii�����#hB䉍�H籚��1{d�_C	Xk�B`�������ȓ}�/^l ��<+��Dx���`Ra ����}�� �ݣ�<%@Fʺo�'���t��;�����2ݞp�y���1 ��v.C: ���>�]v�A�� �>�S(�V{\}�� �vC X� ���9���D��Mt=�9����P�������%��������(d���>;��R�1�=X�Y���.�����؜���    IEND�B`�
```

### `src/shared/assets/logos/jindrill.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>190</exif:PixelXDimension>
         <exif:PixelYDimension>190</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
�I�  IDATx�]il\U��ޫ}�]޷8��=dq� �4fi �4�z4B�B�H��?�j`����i5���%q ��8����^�ګ�;��N=C���8����{�w�r�}u�V0eEZ��S��ne�=����W"�f�a��ذa֯_����QY�����4�����G᫯�Bkk+�N'4݁�Db);tI��OAJdX�kZM�Y�2�=�-$FPTT�U�Va�ڵX�r%���e��XI���[�l��ﾋ�����BL�!�t#MU5���&���eN�
Ђ17^}�G*�y���_�ҥK���X�c=�'$��ߏ��{����c`pI[�	�it��P4�G �5���.��r᷿�7<���(,,���Y�o�:��^{{������d�#A�mh��]0i�Օ��G�J\����
\��su1�xH���˗/G˹shmi��	��$S6�]Zp�L]5��a����o�����aU��$PSS���zk׭G,2��0$v���6����*m���o���nl}7~$ �����b�u	�N���I:E��	��$�lD�aǳ�>�իW���[5�E�^�k���;�X���y�8C{��r�>�O>��q���d�7mڄ�I�p�CХ���#��AL�1O?�t�O|��fU7+��S�⩧�b��kZ
�R��q<��3֨�I��ƍ�o�>�n[�DXd������L�b�[��kx�'��Gs`�㢡�v;"���5kr_X;摀��]�x1d`�"�I@O$X�p!UY�/-2�t�@�5k������J@���(..�bR	��{-�M�.�R\PP`^'8g��h���0m3�M6���	Θ������%`r�,� 6�LΞ���&���ٳ4���09{�[ �\&g��``�K���Yllr	��=K�-�M.��gi���%`r�,� 6�LΞ���&���ٳ4���09{�[ �\&go���?�L_ۍ�� ��&0��
w�X�03�}x�&��O!N�n�~�[~�T2��@\�a��%�\X�����\>��ĚYw�2P���>�:�i{
6)��~�Tf��Tbv�Lx]?N�:<��#_1's�i�Ӽ�f����Z,�>/�<R��8��C]В��&aŴ�L�-9�o�����q�y?�K�O&��uk��떃8�qu�2�t*��X���^��Brn'��D�xd�? �a��/�-q�������Zn=��Ϡ���	�R����4�)|}x
���o�}X0y�h�5g;[���23&ٵ�6��p�j�����m����^T���u��u.�AUQ���q��h��ek0wrF+�{�V����7��ܾ3�&�'ԋS�7#���ߏ;j���������F�ӇEշ`��53�ױ֣����ƿ���(�]���g��`��F�mN̬��������5���W�{���j��w���3se��,��@o�v;��J7��M���5ĒI%��H<A+�3��� Q&(��&ɟ�1u���QU����<���3l���9QU�DG�e0�xI�h�fT��÷=�O�~�z����~8ࢩ��*�%�c��D��:Eٸ`��`����0?�_��%7 Id�Q���M`\��
qͫ�E�~��a0�[*�b�Fⱨ���m�e���voƖ=[�y��moQ��,�Ĝi�p��qu�E�"?�Լ.�$�/8�c�wR���hG���zJ�J�)�Tb}�َ̍��,�|J�l��].BB���Ia˪v�҄:�>t��+���awbf-H�%��x!�Ù�,=F�/�%3�`zy->��c9�uA�-��P�H�xQ>�as �J�_�]C=�;�Í0k��PDlG'JH1P�G�)4���`�ז��聲nD��`�La	I�E7�s�_&���T�F$��Z�Ξ.L9m:�R�lj�T�Tc��yxp�|�|��{Oת��'��	p�zv�Vd(9��`�:�0�Χ?��+�ƙ�n9vҵ���M�ȍ�7 �\cY3D�Y;$���r��̲́�lc�.�pxHɮ��}����I����2u_�B�r!�*�VG@]�d����g��kB��2A+��eת"P�J��XX=#�au,u���9���>]B�hantI�2� &�YM�i^�ʇQ�3+�[�t���O�2J3��]`��wQcS4��{2>U��T\E��tq2�rif]��17^�X�{�>p0���B�'�
]�F���]9��v:��F!�`c�R���ɤ����1�G ��Q>���]��d�$$�i� ��@�f�9rm���i�Q�?Y��iʍ@G\@�I�?�W�a���)n���DC4�v��
�B����G��J�F�{� �����	�<�d/uB��q0Ț]C��W@F�
9'I�#��� �?u5
qPC��pZv���eG�>Ո�%�}�A�h���	?-$8+r�s�^�N�Si���VC�J�E-�6���4��a�j��k���q�Ҫl���=�H�I_�0��w�*Mӳ�E|k����ƸJ�� GHj����
��+͔��O�K �y�s��̲�p>�3�������q���y3�%>�ZD�9���{��ʺ�h7#Y���V�n���I�hV��)�G��))�������ׁ����RD̴P��7�6�����<N��ųjt����*�������v��G�zh�:Z�uơ�:�F���e��3���7��D(}��8��S��~�hJ��0I�*]%!1�N��jf���t�n��헑2#e������l� �z<�v#*��EGϟ�����He%ƍ���~z ��n$̮����8�����`Q��SZ�d�����y�����f�.S�3F�h<݄�� e�֫�#�t��	�PU~^�����r������;8�����3���x���0�� Ȕ��X6g������d$]Ĭ���c��>a�C�x�5X��
�;�a��r�,I-N��?����>ׇ���y�]����X���r���;M�md�0����8���&��R+��Ԉ5��FraN����e >B����P_Y����<��(;I�`G���D����'�\� ++$>{�h�48�%j�z���vs�`,X��eu���K�����*ib��\< =���3�)�����cy�x�0����&/*/,��vb(��i���NJ��
��!4݉��)~�@6��v���m���st��:Zq��<��Tk���9������|�S����T��죅�1)p�l�
�����?�]'�ȗs��p��U�{^��1x��M�dK�` 4�.�M�0���T�K���;q��~d����g"��G}�t��_�g� IL���i����T�L*91�f�z�,N��x��T!��A	*��&��.S'*Y� ٠�"P���)�n�d�b֭�k�YU�8x�<���O�P_V��Tޕ/ �u��8�����1�j*�_��А�V9��*�u��v� �k�^Z��5s��߃��L��`�1G�2�X�23#\�)�=s�1��wͻ=�o�HØ[7�8�b[ř"��K���b���~�hY^	��]s����T�g�fw�jK��\��e�%8}�E��9bn\r]�c���Tfv����t�	�������f�10AC]f�\u��0ߏ}�|����ʷ����������3�����h_�i�qˑm(��E*�Ajx0�9�g���0����������ULP�K1'���@=�n%*���Ò�+k#RFL���ҟ�'���p�E�4�����AZ������׃���P��}H1�6�E�+ѿ� ��p�� ���d.��?w��u!�Ӌ�Kpr݊P�yx���d 嫯C����:��gQ��f��%D��j9{��i�(��v��C@5�y�p��݄�sל���IÔ J�J����ص�Vf\�km�`?vK�K�ѧ�I�6�cN�I�u~�	��'�vvE� <!�d1/#����p��"�Lt�hD`�BO�D����R9p��v�U�Acd,�;
�z�tmߡ ���P�8���K�d_�~B=�h�nN�:�������n��a���XѢEj�|9���"ܞwm3�RS2J�ce\�km�`�0�d�q����� �[��%Pz�*,�WW�&�m��h]�z�2��b��x�08��%	|ZLc_�z�h���f���+����ah�N�)�����!I��ގ@>��N�୯E�Z-&U����sf�9�1t�"��HAs�8���2�ͯ����I��Oc������b�T:5�OL��i��E��jHPވ����o�C<D�o�%`	D;�lm�ps���=���ZL����8����~���]�iwy���PK+5�(�ѱu
dޢL��X����ի$�c�҈�5�h����K�������8�M�7ж��H=��/�ap��\�7��or��'��[�Jc��s#*�+2��B|��OpqD�.�9�$VS�a�<�?�9g%|�W���a8�*���Y4E����ҩn���L�x�v/����΢�2���I�GA>�}�1��O���={Q��V�nmUZ�3Bg��[H�� B-,N.��7{&���A>�� �B��:h��J|���[Z��5�G�G�QMr�Mc��)�&��d�%*�`כ�6�?���������M�T�8�ʍ�-.�Êߑ���]x���%�%��R�l��Wj��c���^썙H�eV��y�ј�E�7��>�&G����09{�[ �\&g��``�K���Yllr	��=K�-�M.��gi���%`r�,� 6�LΞ���&���ٳ4���09{�[ �\&g��`�������ec
���<c�?�Ȝ�%�c����Ȝ�s�?��Ȝ�{zzp��9srgq����N��DaR	���v<xP%1)��-�ɜ���G{{���Y��\ĩ���7o6+��/}0�b���b���#q�z����i;ZZ�b߾}��n�s"�����+�%��H�k0��믿n�b�4�>� G�er���ƹ�sX57���o�mE�79�-����;�(.����0�L��1ע �e˖��ŉ[}������,�Q&S犸���I�(I���ZV�|�嗱s�Ή+���s	�_}�U8�����2y��[�I�u�&3s ���1���sLfZ�3fܤ�N�jˌ���?�m���̶L��\l�� +C��>�Q�%���k�.������abI�&�v��Z��>�Np�\����t̒o���nR�� 3�5�.Y�W�_�����&{�.Т�%�C�ᥗ^TF�p�Yp����xj&���n.�q�\�\�Jb��x��|����4�ՉU� �J�����C48�9�TKRnQU��XjޒiL���"�`�E�����e׸���j�u�����m�];����s+}�={��c��cǎ�K�u�̲��
��Õ�����#����a���h�9��<\;�y����*~y�ڵX�~=*+�Z����,����	[�nŶm��͌�N�̎�4��x��ɝ�
j`�?��1�9��    IEND�B`�
```

### `src/shared/assets/logos/jublingrea.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>150</exif:PixelXDimension>
         <exif:PixelYDimension>150</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
��Q�  '@IDATx�]�]U�]��N�&��Lz�S(RԈ�4�{��}��S�P�"OA0�@HBڤO�L������w�̝�L�S`v��{��s���_���>�%""���cC�������諺)��͝���$���̧��U7��c.�XWWW����ֹ�:n�~l ����ŀ��닰�0���#**�lk�>���/�^__���ZTWW���������AYY����\�?�ڄ��F�����2e
�̙��퀀 �l6����>>>���0�<�[@�SWWg������Ʈ]�������B#��,η���.E[�)�����qc�ܹ�����wPP��L�:���r.�裏��ob���fh2hl�x��:x�,�jnn6bV\j��|�rxzz�$��꫼�7n�o����L9rUUU���$�X�	��B�.Z�����q��b�����s���u+++�u�V�y��Wq��!3α��q�ġ�%R��_��Ԥ����:��iR=z�����?���ӝָ�i4ڸX��[e�Ξ=��z+V�Ze�� �3�!��_���|�I�8q���Ft;�q�劈c���z|���5֯3�>}�0�ӟ���{��i�g�\�j�
`�����[n��]w����u�c��S�����駟F^^�1Ɯ1�� �Q,��:S�ҳ�6ŭ��{/.������1��bٲeX�d�q��?n|����d��U�ߨ,`i�:u*x��k###G��cz-Y�qqq���K��:x�q����3���\�_��W��Kq,����t�Ry���6�Q�g$@�	�x�ҵ			����m���6�%Xù��+0c�ci?������p��y��E�����W]uU������$�����¯�y744��{r���#�m%�.\������袋>I��^Ǿ������-��Ts
�WQ+~���b���#5ޏm?2�V�^�G}���3�Ztnq�5(}n��&<��c�6m�p���:_���_
ъI��l��v�Z���?DHH�'
���Y������r-��F`�u������XG��C�����C=d�.���#��eR��sBCCz�ǝ������Ɂ��J�uqEg�
EGGe���C�!��׿6��P8y� �s�� ����sr�p(�����}��kt` ���뮻Lw871y�)�l�7��MS�5�������|�\s͙G7��) ?�k_���#���*�)�<�F��x���M�F�H�һ�f��w�a�lr��cF�V�&88�B�����U����o�̙3�����N����+��r@Q�A��م^h
Ν0��.@e��`)))g��A,{�wN�� ��C�
e����:R����m�)�Z�5k֘uU��f� K4k�|��_���LU��|��f���`�g��~����"�xۧP�������T�%�K���W_=�+���[��\���J4�֢���ߍ`���?W7x���͇ox{��ݯ�{ﶯ��쳑���՟�M�J�p����7�ݸ�L�.��(�bq�ot��t���b����fmsO�|V��[�PYxx�Cף��D@+�އ��Ro�Jb�����?'ACsj���~������I��K�-��ړȫ>h@�r���#^���W/�%8M�n6Ns��HTB�Ά�N�w^x�^�t�m���;�>}:T8��u"$���#IpO��,���O��c�/�Zȕͭ��S���Uu�f8��%�"����C�o����|wW���DP��5�yؗ����?��C�_���`���b�1o�����ۨ����Y�:-݌���v�h���֊rd�-�b��a��LP�AAn�#՚[���Ɯ*}ȖV�9nk@t�,xy�@x�K�j��'���(��J����g�#W�IӦ�pv��W�#�O%>��~�!o�k��M���˰R�͍7�8��t��n(�9bt`��+�\�؆ږv{� ���Q�U�\�Ɂ�$D���v�{{6 ����#�ϩ���Ո	�ͱ�4�����_up�6m8��V�+�<��>+�/p3U�{�M�WI}K�*���\�M�?·�~��v���ǯ'��(�ｏ��jƫaW���ډƦ@�|�4� ��h�BMS)B|�t�v��R����\����u��>��n3�:q,�C|��7�EL_��Vwl*nBVu.��#�h*,�gK+�	��H?�?7s�Cd��}�|�R�fԕn��O4<B��A�'�n�=\�f��|'�E������I7��#9�`s2�z,���5�����kM��:�_�%�������m�4y�p�l;�B��wdն�0�*�" 1��^�kjFNv�/Gz���aقx����Z����������|&݄��l�y�lz~Q[w'�K�,am��� �7�VU����,�㐱%]��-:W�w��Ľ
�9s�r����F�V�nV�VL]�_w4��N�V���!�q����)Q�K��Gl
�����a��4#5�������D~�'����v��Ex��l����}��%���,J.`��X5�H:�#tAq�Q�Ĕ���F�9�NKa�4w'c���ke��X�r�Y�َ���v��t�I�n,F������͟���ɨ�-Aю�t������@�L��׼4<�v6^{��p�ۀ%S�a�H�(DE�������9�V�{��s2鳊�x�$/7���ʫ�@�w,��t�A�~�������9J��R���ɝ��_�0��H�R;�iT��{!b&97!;��do�X���*?!�1pI��So�#�X�A�������ذo6�W�c������B�Plߒ���98g�R��]n|n�]s�
��l����8�"Q�vZ�}���t�+��� G��T���ԇ�h�1���5M(�[�����t_�
�`���מ����q�2��Z���$T����]
�E�����݀�K�1=�bR
d�[eC�l	���v��o޹��X�Y�����"���MjBY]6���
t����`��Q�W���j�̕�1*Hb�G��x����8����K
���C	�1�v?EsU��_�3�3�5���T0��n;��}���\���pb�o��î.�X�k�mX�"�s������ٍ�SŴ��Ҫ���PZ��E���zӨ�m�u�o�&���_���TW��_ލ{��PY�K�;��g�_� ��6����ܢf��b����λ87�7��c��h�'�����u�bŨ��i�tGy��*�a��FE{C��8v(�(�g�9���z̊���s���������`,:�����G/��8V�h<�_Gb�$0�SI����� ��>�d��`��F� 8-����K��M����U�/���v7%�;�LG��,̙[�91�a��ʎT���RYeu'0���r�x���nF���O��4���e�:�Y�І��h��G�|4�T3
%�LQ���fvQ�Jaj���I���>+�FU%�$~�b����a����M�Jja��^ +�;�y߁1>xJj�HV.�\��s��'�.�߸P�|p M�u��Vs+|�C1�¥Խ�سg*��X�{��bq��%Zە�p�\�@���̔�O�~���^=�l��_�����*�[�!�C�X�ؘ Ĭ�?o�䗳4�-���ګV���؛�����qβJ,N��#��	�r̵���9Xc�߽b�X*�͝� F���h ��yv��5y�_�j�s��rE(unR��31/�[��0k�2�aI�zF�.5E }�s}m���������`q�ҥ�L�&�R)��]��?�ŝ���Dz�";���1�`sA���I��5�/�.\��Y1W0i�䌜�-�d�{M�'�uX��hk"UNz��Xѻ���;#L4�����4Y��Y��f>���J�� ).+��*R�#X�eL1N�sl-,��E��س�X����2G��)�>q���©�m�����z��rA��F�1�Y�V�kŦ���?|1+$]YY�z��Kv������*��o)�[�Y>���Dm� V�z,߅0XBz��!5r�罌��������*��� }=C���L�)�#�J=�r˕@�3C
Ѷ����H�+����|<�}�_��	�c�V�g��T�0n=Kw�MxQiP���@̳��j�K96ڈm{�ޅ}�J���O�'޽�@��^?9��kbN�7����n~�X�S�8��6N�h\é70��{q� ��C�Z��H1*X���WX��
��0}j��e[RV���3�<0cJ���yl�+���b~dL�z�#����h�d�..�ÉS�hd�2-)�a~\[ێ�%(��G\T �b)����$�o%<O�{zr���k,G�_ss���X�蘇G��=\�܂*�l���ܙQl������.L\�"mJ������Nz�l�h���j����|D����w.8�U��z��%���\�,�]d���<�BY���]�2 ���(yf;Ν��� �� ����/.�����lx�8~������}�|�����s��L���'�_��8{u�u�yy+,�s����k.;�+ ����M�/�浼q��\�y�]��c��2cIM
��s+q�x	�X�0��.�'����N�k�uܕf�P��ff0߅��8�_�Y)��a�Q[�qHx��(��j뛑_��al6o7#�3����mX}a
�����/,�2��}9�����WT���z��W�H\�U��զ%u:��Cȥt�`q"���b8��+���IQ_߂�H�̯�G{��;��ceu�B��8�\��}�b,����f�S"�~�����kg�����HowQ��gq�^�8Z-�������wvp�@T��t�~q��
�_1夸@��x���{"*ܟ�E ��1$������VӤ-�����B1d&�������D��߷�R�������pN4>�z����)��M
�؛D~'��Χ*��+�F~�}�;Y���`F�#��KQ�j��"��_s�4� ��l� V�]qq��w�ť��ˤ'-�jll1z�ƕ
��v��1��%�"I05��:���E�����w&Ea)�y!�]`�)��k�)����!�ΕA'��ɉ��]4�gsJ9!��X�ĉs$��V�Xmϡ"rc(VP,_�GK���,�s^q�8C��)W���^���S������͢��}��5>��"�ĳ^�6����9�����Zlߛ��AP`ׂ�:��-{NC&9�ȇ�P�x>�||�xa7*�0gz�1�t��ҷ�!6r�}��s"!W����T����ۿ�3�J7 ��ȅY�+�N�qR	��b&B��+V����8ĉQo&G2�L S�j_������r�Hn3a�AN�����{;v�I���mIY=�	��i����Pv�R�I�Y�� e�T"�F�\�c5]��՗���u_%�~���(����6d���
KkPB�K��u��5�\����e��ґϼ��*�E�#ى?QT�N�"��R��I�7��p�y2�f�S��3r̸RC�z�۰E���/�߆���Ik:s�������GY�Fn[8+��O�kEu#��f���b��2��6c���@��o�������x��C���Fl�t�sawa�,��
e<vNjd��t�⽬�S�D��[��!]{��w�P����-��L�዗�(��(#+�Ckҝ�0�������>}��N]�ŉ�ST��`��6�֍�-}���Q���6�z�2���"j��v4q�{�N��>�%��U�l+)��حE �xt���uܾ��8v�)�$�=��t%��	�k�Ѷ;����i���荜0�&�|j:�[g�]�ۼ�(���@;F�e7H�\��0�\�B]ȉPLC��S"�7I�j.�YH���˵4Z/�ũ���Ιk��,h�h�C}����9�6���X���S���NauݧΟb�A7(G�-�g_�4Vsqi5v�+@"_�j���\���:ݓiА �ASC�k��<��7�8A{��۩W�i�7Q�* qW]�f	Qt�T9����%'���`�&A�Z<����4d���L8i�d�e�3L��̐�Ӭӝ��`�ZVV���"�>�[�4�~���b:t��2����__�7?��|���ћ�^71�D�L�,=+ns��C��'K�ƫ�=%�%6��Z��5�ҟ��Љ2�f��#9�k��6Jq�"R�@���/[Bt ��E&��ɑB�Yb]Ɩc�l�T��#�eP��1Z6���&���L�����;���^�x��E��<�y��3.�>������D����:����)�i�#Hp�7a����Ҩ�R���qa�OjE:����`��0aAs �SpDǴ�7�c��zZ��(��n6:N�y���C��s$救j6�����US�d�#?\M��^KcP?>�*����;^﫺F/����[�U+Ɲ�䎔r��W��j|�&�)@�_S�U0-ҁ4�Ў��Hd}�$	|)i����4��&�&�X�^wi�V8��S���J�+�_Cwc�R=�Ȯ�Ĺ&Ojh��d:��u���F���ϔ��Ἡԓ��X��.��=��=��i	O�kQf�ߝ\ы�Օ��w��m"Z�XA�+��+W�aB���}��lc��J���j(�?�d�Tq2�:����.�h0�S����Ϭ�\0�kOw>o����M4����|��^��]`�Br�j����D��������2�$lt�51�u�D�������y�q�/����X���c��ۑ4
N�.Ǜ7��ڕ)��Y�u�ҿA�~�C�B�f��i�43F�
���}te�cZB��*���	>c��wr�
�|t���F�+|����P��c�A�`]{�L��!-��>B�!�<,��k��q��������wsr�����e����>��hݫr���b����(Քꊼ��zj�ǟQ���꠻Ӿ�V�y������Ub��_����3��!k�%�&e��TwJ�+�ԝ�I��M����zi/C���
HT1p W��Q�'_܃��"F��R�a�,.<3�\[�c6g���C�R����ſ߷�d��[��K`����f���M�O�d_r�2Q��Jiuw�k�ӌ?3��ɨ0�;[��vd�f �&��������|��O{��������{ｷ�
]#��eߐ?�W�:t��/��S+�&�i�g8RrNQ(����M.�-��cx�
�8e.~�ۊ$3p������a��`*��8�>�/�6\{y������:TQ�X��G���������۫�걈��x��J9.`ZoZb��iɡ(cŉb�jGi�`4k5�Mr��R*5���s���"Ǹ���3��Qv4ZFF�m�Z��/�����l��V�б_��J���:��L:��Y����=j�i9��\,� ^�
����L�R>�Kn��c�r�)�}̤�x޺'��2�h�fY��l���8��6���!�7�a5�)�>Tڣ�?�*8���R�S��ɗ�h���j��ߐɉ� K��z��������/S�u�tgX�.�tvS��xN9�.o9��2�Wڐ���E��c�yÎ���媨ؾ/Ϥ -0eD)���{�Qn�6�V��Xv9�{bEj�)�Qu�B�J$�ck��8�}i9�cI�qpX������l\rh0�`nؗ��1��]��U�pSe�-]�������Y�zİ���n //�>��u�Ӿ3B�YfĘ
q��}i�ɉA���l��.6�6Һ���*�[��1�m�3m��3Y�4;5����(�9�������}G���dܰn6n�r6.]>�X��V�,+~Ӯ���CF�G��
��~Vў�u#g�s�B��Ȗ'*�U����SO�W�;^� ��_�urK��y#�- �x���7��j������^+%��r���FH�,�]:/�\R��|C\Y����S�kU0P̜sul,����2�֍�O1�`�J*0P�V%���2��jLE�p ��a��oА�y���t�!��*X�}|D�/�{�a�|�j��P��x�YM�Ƿ�z���i�n�� dl�ݻ[�n5Fs�m���sq��U]���a*vk5�-�̉g^7�ā��V`�<��{n'�@���P3?��\]$UQ��{˾�ܹ����[T�,��K���T�Z�,��ճ:�,��Ru$W��i�lW�GJ�1ݩA�qM����;Vx*'�Jt�_�|y�?����3


�ڐ��Z�d����|��n�?�������`Oǣ��-��q�
�T�SYӀR�|epu�W�.�ӟ�2���F��S�Br��w�t�6�5KDʅ�qNݪ�£�L!�fJ ��R�}*r�=�$�п�&���s���oV�C ��j��T��nLB�\jٹ,<�0�D7l01p�� �+--5/�ڿ�Y������@�l����d��U�p��CF�O>�$������I�; �]`�3*�T]]�'�xbTKj���n
�����)аB�?�\����n�����̧߃&u
(ڨĐ�����%��ߠ��2��O~�233��?��[`��H�D��]�����g��Q��ʛ�ӟ�8EO��q(�X%=�?�<�3�Ǳ���Q�����7����ư:ӥ�:R�3''gRT���N�M��T�֐�eX9^~� �d�L����;��v>$��q���1��ߕ��f����τ1��|r��R@4��*����	`u,�.kZ�^��ds>�{�=<��C��L���H��:Q�֑#G��d2 �HU'l+x��w�E	��@۰ �E$*�3~��X��2��N7
腓?�я��(�Z�`�c���~#>�'&��Q@j��?�16l�`��٬�W6��P\,�N�A��I�{�yh+/�y�駇��:" �#d�c���Փm������ܨ>q�`E�u�Xj���O�lC��j��]�6X��x�X�«��·��-<�裓��H�l+-{�=����78�n:��唝GaC�����T��H7/^�� ?��>Q�hM��w�i�����p$R��dΫ�?�l]L�,p~�a|��߅�J&[��j�o|���?�a��Pun�+8����h6ɢ޷o OII1�$�~���S@�e��;��G���5���L�祗^2�=Փ&��r�~�_�K_��I�&B5P:���AhVi�Z!�ٚ��m^~��o�<���$}ky����=<��sf%�H-����������V7'q���/Θ��5��wEE�Y�y���wMŘ���`J�������E�aa]�R�o�}����x�G�+���Ȉ�ZO�T=bW�ё09�III����.����q�������&���Laa�)�i`-*�_Ǻ�1��ĶtPrr2֯_o��(�O���j�Tڤ��z�^����%�"�b�V�Z���R�+VL���Y k�*G�zeƉc�Fʯ�������q���={6֮]���;K�,q�#��=�m�;w.�S	zծ9K�7Ξ �4����_�]��#$T�+,==݄<���
,X`�.=�.ŭ|�^{�5��=�Y�[��q��:�ǅ>�=I��ZD�3�5k��W��e��~����RxZi��T�%+~���(�:Z��?����	�u3�����_�آE��|�r�����ͻ��EM��4�����Q]��͛7^�ZMm1l]���	p_7$����h[�\F���			l�K���d��[Ǌr�$ju��ťT�6++��R�]��:O��	О4�����}�H׶>j�$`kr��X�Y���3�=�'�����9���-p���_��9~[@N$C���0���6w[    IEND�B`�
```

### `src/shared/assets/logos/oil.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>190</exif:PixelXDimension>
         <exif:PixelYDimension>190</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
�I�  �IDATx�]itTǕ��H�ւ�7��c��`���,���8�&^&q�2`�L<�c��s���L��}��đY=��9��a� ,b5�a �]�}�e��ZO4�$Z�^�k�
������Uݯ�[�n�r�wt�C�_�`�'?��9p-�U!��b�U����Ȍ3d���ҩS����S�����#7n����ZN�>-����p&�_�T��$HL~
R � ��B���R�{��JR\%"�Riݺ��7N&N�(<���hѢ�^�#Z�r劬_�^�{�=9���3I*)R��H�j �3�_n**�y]��u������dɒ%2|�pq:�Ѫ���z(p��uy������@n�ߕ&�>���Np�M<C|x��d�Tw�$I�$%%ɏ~�c�;w��jժ��ٗcE�����b�rٙ�-��T��R��U�\��]��q�H
����#o��K���5n�?-D��;�ȑ#�Է���S'$91�>9AA$�C p�e5�pOq�*p����2}�tU�.J]HOO�	&�ɓ����#��$Rtdg`�dr�R���o���Ґ��оf=
�+?~<����7ś(R�O�-\��%�U$		nY�`�<���֫�]�)�Q͊+d��q�p6-�40��+�,��̙��g�i0#�G�R� /[�L2�dHB�D�A�i���n����W�{1�u�a��!
���K�}�Y}E�G@��
�WUɋ/�h[��\�6k�,ٽ{�8=�J	�ʔ!�����h�$�=�Jt��?�mzl���b����vK�t��Y��j~�O��U�{�"4lة�Q����dРA`ew\�����2A�z�����KqI�TTTHYi���8?� /L��\S�R%ٛ�1B͈��p��%7'���g�z�3g�HaA���tم����
P��TT�KII��KQfW|��U�� �.�ܒ �#95-MRRS$%9�d7<m۶�;HZj*�i�$M:b�;##ò��]�ܩ�L�6mnw_T~`(����k�RX@�M�e�W_I�WTT*� ��L 9� ��h��su�����н���g\�u��n�&{�k׮��=.�B�HE#h+ih ���n��V 8w_�lܰA.]�(�bf�*8��\	�$�XƧf1��x�����U\��޽�=
��}�ʄI�,�݊�9�t`�ؾCv�en��8q�����.3����F��o��;��5����gϪ	uN�l�g����/�F��3X�wh_W�1��_U�O>�j!�[�|)Y�P>��2���"ᄍj��2��]�'����:�y���)]�u�Y!E]u޻g����Ⱦ�{��DP������@W@��)�ȑ#Ҧmp�hy6=z��9�Q�D܆�Y/�W��Ç)�DK��IemH�B(�7nܐ3���7G���L&O��33��P�Q�������~'��+��&oc��[8W�ݽG�;��^��"i���� �ڹSV���|M�W勛�E8p�=W\�r`P"�o8�_��1qZ4�K�.��?fɶm۠!�+����w?u�6a�ǉ�y��Qצ ���%��巿y[&��H�����3�KJ��{Q������=�OVx�t�����H��fpZ��i�x�ǲf�j	�[ጛL��
0�G0�%���b��2��0��fKZ�~�n�Zx>�o�^�?j���-��Rk����E*2~���7D#�G�a�F�~>CcE�ir��ɂn���&awl�.���0�S�b Cה�=zJf�ޒ�2]Ҡ�P���8�E����R�/��!��7T����X������M��gt'�[Q��xO������C�+�&?m ���-�B�Ӕ6"&���8 F�nҩs'�Q�{�U�"�h����Ζ�}�T�B;���'0�X2Cl݉��)B�Z�t�Z����i8//O-g$�Q����3_�wG�%O?��܏�ɜ���dt-1>e�TuP�\�ϗsg���ի�DBQQ1��N�P�3l�4�:xPIJ 3��ɽkV��������Z���3o�<�ݺw�O�Ӧ<�t�"#��룬,��Fw"���p�[A˖-ugK~ZdP1Dڶ�[�QQRc���-M�Bp�t�"?[�P���|s��U>N�?:��e�Ke����D	w��-[T��z�_� L���24��x�$��X�����NC��W��o��5��:�R�ʱ�w��ȳ�<� \
_(z_��ȹ�)�2k��������%�z/��>2u���Y&��43>�����yJa`�ԕX�N;��O<��_ol�M�&��Zl��4��X��d�	DΎp�+��W�k��rj,�����)�U���fW�� S�����['��\i�����M��Ѱ�5`�ٗ�L��8V����VHlh:'NXǲ�2eQ3�~M������ZU��YD$R:�Pf�Πd����n.#!ٷ���I�U+��*��s��P(�̡�Ek2��ѱCGSZ��?��+��1:�D�L]�R/)�#.��롚0�2C�3e�x��U���� T`/_����61�U��0�ifj2�,\O؉9ãs�NB^�"3z'�604��;1���g��0ש��]+- sV���jVv���F]�M�����r���6�Y�7S,oڰQ�A��P��7�{YN- '&&(��͵{zH@Υ���%r��9=�6"�J��?��͟���F<��d
�����k��*i��ܦNqJ1M�o��19~�Ӣ�����7��OY��k����
�2����B%�̤e>��r�v��mr�
:'��!SΎl��/��ɓd��ҷ__�t��_w��c��U�<�w�n.#�����L}�F��0�s�t��U���cP.�Cߖ/�����*�]�v��g#��|��#I��q����o\�'�Y9v�\[��q�;5��{u�˲Q�q�?ᙵ��I�i�LK'6�Z�M�0>|X���~'���P-��aR�n<C�wt��Ԅg)�P߫�r`�~�EXy���U���ϑ�.�RHeZ���2V� �8J�}��`e<�iVa���]�p8!�x���l	�H���]q3g{�����A=��~V@L�|�6Z0Oց������ ���y����� ff;�������*Άn.�;�T�.�a���:���Y�^\����2���XGܶ���^֢EE�e��G�˘1c�&�ol�g�'�c�"x<�y��ap�Ye�]���O?}�۴��`�����j0&��bks����YF͜�~.����`�3B#��k`�\u��Lp����/���~��j7S f?GG�_��W�1� IZ�Ե+a��b\J3t��̙�*�u�A��U���3e��T �uk��8摫�{"�<(��u�"��x$���Ʀ�tB���+������r�Fέ�Z�a��HFwD�4d��D`�I��/V�t�Y1.���S2���d+��W~�RN�"ű���Ɗ :�KPɭ�m�`��O>)c0�u��� l��͛?_�a{<�Tb�ym�I�x��(�
����aX	A#Ƙ�cժG�ޱ��*�FE�����r����[�N��)���_��;BY���i+n��zp��"���k�c�G��G�2�`T�2�1	e^{r ��:uJ`��.��َ����`i���#�����������:KX;F�a���[Z�l�����*�1�������
�����ЄE�pwͫW�"��aۂ��/�1������=�7 T��V^�J� ��I��H��}O��c���8��3V�Q��/���%%QõN��R�
���9ʻ����1"�\���yYy�E#�8?��7_��F�G#'%8�H���4���������dʴ��d�:�6}b�f��Y���#'�vʱ万�+ )�} �3D��
F��'�kR 3?r%#�S��.��;N�ycn��Լ�"'��6�8��Уv����� ��	�� �A�F�����!A�q!����kx��BԖ�����!�e�v���)�6mAl8��a�;��WFgqbC�HN "=p�;�L�`i6��'5v����I,��mݻp�����@��fai�ɹ���/��Tp>�+��	}�Ã��=�⺧�����8��:��?�����#�l%AD$ `���I�8+�,K�ȸ���5G�t��p^t���6k�J$��
05&@$>�-XX�4����R���н�F��M��Vk�кU~l,F����a�k�w���}�&I[ 5$��)by�.��D��m-��k�{"�e�JN�'��"�n���|���8.S���� ��&J��8���!d�UD[`F���7�9(J�Z�k�p�Ŷ��6��R*N��S�"-�p$�j�0-���x�p��WY`+X�X��>��: ����N�\G��K�S�8rZ���8��?+��l*�q� `+���p �ĵB�m�����e�6��V��� Ǳ��v��j���6ȷ�T��[���l�;�������6���x�� Gp�Nj� Gp�rp$�"�A��-n9�a��N͓Nƶ���q͓ı�����)^墅����q�b�;5O
����ѣ2b����1�Xy,.Ah���EbT �QrXU�݆&�t�}���ܹsc�9�*e�/$�=������݄ ��տO�YE�ם��{������-��h|��c_�8.��t����e���q\���Q�YPRU�nݪ����F�z�Q�]���琪��^O����W��uQ��_y�qA)�tJiY�����/���Z|Q ++K<�xq��T��Rpɉ��w޹kwH�/�/-co�����
..B�7�+Q�����������hh���*�~���	@�����⒊І�/���l��v�/
p���˗�޽��/	�_WBr�e�� Ud'��*��/��nݻK�>}⫖wii9#��3m޴I܉^�^�C`��X����� y۶m��=nb�[;Y��m��~����G�a�������:��`po��EU0�Sg�R��=y	>9�Q��d-
����ҥK������U��",�#�M&,4�V;��� {��҂q�~�� Y�p��9Rm�j�j�}��F�Ԕ?���_�ߑ 7J��"d�2������ �ŶT �R c�P�Krc+�Ww�Y�%�&M�ٳg��ѣ�>�Z���fgg�&���n"�>��"�s�G^5�t$�%#�kpr��ЏIO��u`W�r����'�d��ǭS�d�E���Ȇd�����G�[L%�A�eA�,��E��j���?��\��    IEND�B`�
```

### `src/shared/assets/logos/sagility.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>150</exif:PixelXDimension>
         <exif:PixelYDimension>150</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
��Q�  -IDATx�]xTU�~S!=!$��^��#M)��X׺�������꯲�Zֵ!(EQ����Dz� R�����=�&�:�L
��3�3��{�����sϵ���k�e)`+���������ס}�kcc~lmm����Ny�VI�`G �������mڴA�֭ѲeK���������� ;;[}������h$''#33Sϲ;�
`c.$�5k�]�vŠA�н{wx{{�iӦpww�����&M�(�9�����yyy
Ԍ����Odd$N�>�S�N��y�0i�ox�!~�i�:�����p:t��ɓ1l�0���*@ɝ�6s���|���*pCBB�m�6=z��� ��:봷o�|�`��%ɍ�;G��q��)�kN M)��=88�~�-N�8�˗/+�N=���XFJ�R�%�68�ɩ�~~~�2e
������ߖ @m�$�gϞ�ɓ'����c�޽J�P%4��` &���SgϞ�9s�K�.prrj(���qqq8~�8֮]�}��)#�\]�y�L#������ܹsq��*ܐ��Rd�.�2����q���pc��mU[��z�Kۮ];�W/^��W��Fv���駟�j�*;vLMK��S� L���JQ����[�nu��:�����]�Ghͯ���)�4�8�	��/���Ƣck�իW�z�j��t��ʏ�3�ɵ�c��~<����-���t���˗/Ǟ={Ȗ��v...�,I(r-�T�=�t�R<��S
hK��P˦�E�o���*rv��%�Zd���d��w�}�n����vQ-M�0A�X/\��"c��b \��{�1�o[�jU�Dl�Qw��	���S���dYD3v̠�s�=�|�է��A�%K�`ǎ�J�rs%�s0�)����o��y��՛�o.�E94>G����T$��3W̬ �J�ܹ3�{�=�c�8�Jb삓)��`l���9@6��}��x뭷�h�U_�����l�C�����, S,�` ������S��4A�.8 ���ZLpiP��_�¨Q�j�3�z
��8p q���2#}��
`\��k�aڴi&Tk�Z����k׮�
�Z��O<�f͚UU{��k@.|���1v�X5�V�"P#�ɹ�u��`KEajҡ[��6��׿�eKT����h��4�(���ɲ`\��
��߯���d�9�v�����|^�v�Z�F�^�z)�����&]&�h�f�Jx衇ЧO�n�(@˚ꐆ�)��$��qF�󹦈�:��o��-Z��^P�`�@�I������?��O`X͚��-Z�檪VT`��g�y��~{UeZ�[�gr��o߾�પ�j�Տ���Zek�
p��#�<����d�,U	0�1��`��z}d��N���ٸX��T������ȑ#++�z��)@�{����UVu� ��9Mq@�`M��?�>}z�a�*��3g6��Y[�(@.����C��Jf)Խ��ȅ��Q��s�ԩrq� sDp��ĉ�W�5W�P�*���9��B��=����򪗆[+�>��*-/�U.�	�Ą��9�pV��֜�P�L�2� �~q� �	{�=�YYS� �b���S�9�P}Ȑ!j����I�.�9M�L9Ό��XS� Uiy�l���S��XS� �n/�*0}^��q�����fk�g7�㼽�J��&ǌ�]��n���q͜�� L��+뭩�Q�n��)}5c����W�Mf�!$7�r�&�R����E�� ̨��Svq!�/��]=���lso-π�p�G��m`MRZ�M�_�~\����q��D��������@���La!�+.Vb���K������֓�KH�7�P���0]_���p�:--l��&Up�TUBa�$��pfz�x��С��l�-'��==�9������tD_�f��)�ۤ6X2s��$��bn���&���Hl��~����7�oKOY�Z��|�Q1IX��%�TY�Կtq��`�h޼����� �k��Ex;�<^�9�M)W�Ϙ<y�]�\���!�����l��<���-��؂�{1�Q��ï$b�W�q�t�"��w	}�����e�rs���3X��!�ť�w�UȒ�S=S)s�^N"W7%券�B�p���̒BlM�ŉ���J��@p�7�TY�M����8�}M��T\������¡��b���g�����)��p@;o���� ����M��]����[��gf���m��hm�AA�GdT�$��JܱcG�6L)��/\�e+��n���%H��\8�Xv2�錁n�7H�~ꈢC�:2dp|��	����ݡN	Q���[{��������T�7�qc��
�s���89�$3+�ځ����9�\ O����J�_M�`�&��Ӭ=��`�ת�: �	'���L�r���|ZϒA��wC\�{Nq>�y�*�ʇ�F#":���ѭ��l V;{[Y���ss
p^�]K͔<�Ѿm%F32r(���ݝ�m�Ւp-g/^Umܯ#�ݜ�%�������md�(~�hgo�o� S��H����4���E��v&Rҳ����4�3�A�/'峲���u�f��&�.{$&e���A��6E`Ǡ\~��9.`��Ò?hb��H����h���ڤp���h{�.\GZqf&`�w;D��tTDw�p�j,�l��A���?33����u�b���8aX�NB��	���C� ���H|�~7.��Hy6pwn��fF��~x�������m[�/��e|�� 6�8�d��wj�Y�pE�?������r�1kr�.s�:ǃ�f�?.>_���i�o�e����]�X�a?�2���/�p%2I�C�CF�xoj瀥Kf����Y�O���A ������������kh(�O}�lSe��3�UJ�GMVN�9���6�D7����3=�|n��Avl�g�u����H��|q4��N��d�I��Wmn�}���g�@45=�������������qx��/������p9,�m9��\���1s� ����|�~��b+��&�����C'�����Ȓv��¢�����I)��x�/�"ẞuȳg�N�Ч=V�w/£�U*R::�W;\��E_/\"y�2�� O���;�4q��нK����1�P��o���O���N/��V�1�{�*0s�"�K��w�/���5��_�N=�}�G��4�z9{�mkW�U�.�X΄��#&���3N�e��v�Zb��*�D�ܱ��]�������<��r�3�������Ŏ���A]�=����Z��:g� ����w>ق��n�KOOC+O�61���rO�m��\p�H�Ν|��?�s��}�:n����;'Cð�`�p�-��2�6�<�A��㉅�U��ED��u&�*�$�CM���9?/<�p��4�>�·�Z���VD�&Mt�W�_�,�S;Y��es����X��k;Ǣ��ќV�ZxOꒇ�f5k�C�UǑX�q�Ъ�m�ڢT����<�d���}{w�ǯ?����װX�o�I<<oF��F>�4qt���]0��`L�i�3Vo�;��%�&w5S�A����4��c�҃�.���:�#}���Z�s�� �����~��\��>iEzS������sG )!G���R����"0npwth�#���16R��~[Sѕ���Vz��{MѿZ㌏M�"n����[�`�g+1�m-����W��¾)z:y�_D��-;T6�=�F�Fhx�^���݃C�/!7� }D��y#B8"M�-�u���~�Oצ�� =��~-��5�^]��t���iG�B:<�m_u��|�P�}2<�2I{�6}��02ĕb
��1�fL�ō"juа,�mjU��f_G'̓�V�D��ǅླྀP��� �@'F��(RA����H���[���/w*nl�����)cz��(��c_� qNr."�K�L�-[��N��8�(͚��ڛ9�R)6�[�����t�di����/�"�w ��9':�nC��ɬ gʤB���^�n�Jwѻw��:1\@��C���Čf�pK�����'��#{ *6g�E�ؙp�e���e�E���E�����"5�[����'Q�_��.�X��7��?Su,��I�=;��GKow���$P��j�7����nZ#u�0j�v��c�(�ɑ�&Q,N"�����½�%&��j��5�� ���>'��=	��y Fx�D����Î_B���v�ݣ���kSR���X��<��$�?퐑U~��R�5dJ(��HT_)�����&n��_i�=+;���*��l�K����9Ao����E=l�h5O�_m>$�HQ=\"e���5��\Js�lMÒ�z
_&�㻔�X{OG���W���TXu@"^�E���GǛ��R�b���77��/~�7�-Ԯ���͇�os4�rþc��(=�E�w�3�����Y����6$$��u$����#8"V��E��^1zn��D�4�� ���r8}^Z�ƉRdδ�������w��m��ҩ�q�Z�f\�I����w����dCJ�D�2�V�锄w���|N:v	�z�_VLSV���P� �8��,30Y�;�c�oW�w�ָ�De":)�E1��롸0"*	���G�6B_,�>�����R�s:!1+���|]^����JM�°�]��1X�q��\�pq��y���=�h"����8-M�Q>�5)�Q(����T���%(�1ɑ��-;ѥ��戔(�2:���,g'�H�	�A�HZմ�iq3��/ �%n}<$
�G��vC�\�?>m�Z�6J\�ŗ=�:�!z���P��
��j�뎼�ɄP	W:���쓢���V� O&"�p8+�Ģ���קY2�7�pc�}8|<?��qѿk7���#�]4Z��**:[��ž��ر;���p]�b���x)Qb���}{�������/\AX�5|Xt�h�*~�aqxp�p\��7�E��K?�؉�R�þ#���ظT���E"_ǃ� E����dK�m�n2����p(��6�m���i���O�X,ƒ�&�0i�U�rVV�z�Ʀ�`�/���[���C�� 7ȵ%v��	x�}6�vq�<ѻ���X*n�֔hlN�FZ���j0�t>�<ay�x/�<F����ŗ=$n��%�0@,�Xថ�12$J�O�y�� &F��x��8�H�n�s;��`@�@�i���w�\tZ��(+�A�?>>Yf[���$'���D�x,�+���X٢�[4���;�c�Y�&\a�8:��8�~�b�^�|qa�pf+�zf�D����1�J
0(����T���Մa���Zm��X� S=��PXX�bmS �N���^&��pT,d��$��|o"�X�V)a� �P塌k7�q3�5�[��"#ꚋ��{�R��a*˧�L��0Q/OL3.���� �5b��>�W��mZ7�����.^A��.1r���Q�;J��s�ڠե;�~�7�)O�I�J�gئ��C��U�9�oW�]����3I� f�QQQ��M����'�j$�������pҁ�]�@~ҹ*�4������xEO'�3���bxL�lo;��U^��8�!�k�jP��{`��|_���揆�L^H넛sD�����g�P��~}y��D�Q����3,C����R����{��d�E{y?q�LT�o���]�`�O��D�ʕ+���S�q����(��an>jE�a�f��tI������e:���$�x|.�S���n�����+X�W��Cv�wV~�g/DIH�QY��bD���	�W�(�H��m��\�6BhL���M���6���M���{�/))I�+��:� m�����/MMtZ	�>ؼ��(^������|V��tSE�:8�	����E���u�h�o���W;?-�G�Q���Т�)U]d��O��r�����v�&d$��I(���sX�<���Z�3Cm��2��{��Y��h;uvr�[���ֲ�2	��RL'J=Ƥ����(F�4a�~�[B��T[�7Nؿ��!�=!�Qz�+�U |��9�2 �|�om���#F����3N�&��ok[���wW�����)����ܹs|��)�V(�J�&β4ւ�2k�wa��ŋz�KQ�:"!!����Y{�(K{�_�c�j��	nNN���/0)�p%�AoM��4��2j�8F)���D������w��u��N3�H�R ���˗/����55
?~\E�ȨZ*0�'�|�55.
|��7zݫ�������G��#j��ǆK����r�������]��]���A�~�A�UC�̖�0�0�h�њ>8�O�4t��V��vq͚5*>���&�K~�[�^!���X��ab�o�^�ܹS�L�%��?��3���'g���M�6U��Q�̮Pa�ٳ�O7<25���ٲe�apð7�L�)99���z���F���� ��~�i��nT
0�@.�[/�\\���`�ʕj���kd��J����aZ�~}���Vh�n
Ѕ���o�\,P%�l&޸q�u��<�Ժ�n�������{YQ� ����u�Ԏj��㏪� ̒�s)�'�|bu�j�O��f���?V���^�«���M-�W�V��v�z�;
p��G}�Teu7�5	`�j.�~���ՌS�u�Z)@Ѽv��
��QI��Yy�;G.�y�&���pyHy����C���>��r��h�M5� 3��m][�ʬ�jF>g�d�5�g*CU(��#�q��˗�		�K֯f� �^�bv��]#iY#��Zp���x���S�f�ذa>����V��G���2#*O=�h�[�y)���_+���(w��:������������"S����r�!g���է g�^|�E�I��f��SZ���`!�xV��C���p��3�<#����H��\k���(�CBB�^��dY��iG���/(���{��h6�Y(�5�'>3|�p�g�ae��S`���X�x1���M
fTV�Y��&'��T~z���QY��d?-YW���c�ҥjj����լ �PM'sC�cǎ��@X_t�������}��W�c'�2ʖX���֊���B����=z��rrZ���r�Q�����?�]��j�
UF/��J	2''�o߮��>}�X��h�&Էt�(�H+K$��S'S�p�C�ɦ_�Ѷm[�u�D2g��+s�ܲe��V�`K%�̆k�366۶mS�w���7���|����3���y3K~��6�eR��o�{w���mՏ>�(ƌc�S��Y�F��U��AnnC����9�ZchT��M� u�
h�ڭrd��|n��J�ڄkB�z���~���)S�(��ҥ�ٜ����p#P>���~����ZK�ڊ�]� k��#���3f`����ݻw���t{>�u�֩yr��\[�j�m k�!�4><==1s�L�=Z����wCMlspp�z��.7A�Q\}�Z#9򩣹�f@@�z�1�A���e��#C��3��g��N�.auW;�U�$�Z��ܠ�"�⛜=x�`L�0AAA�j8w%�IXK&J�UZ���ٺu+.\��vt�~e�um<U��`�Nl~�ė/җ��0(�8����:�4`��0�o|,�G���,�&� ���>��F�ʎ�`�N���\���С��<p�Ihr���IPh�s�v?9��q�F�8�=��q��1nKC��h6&*��.��sG3z41�Lp���yy��3��t)���q����@D�v<����\��n�����>�ꑣ    IEND�B`�
```

### `src/shared/assets/logos/ttml.png`

```tsx
�PNG

   IHDR   x   x   9d6�   gAMA  ���a    cHRM  z&  ��  �   ��  u0  �`  :�  p��Q<   DeXIfMM *    �i            �       �       x�       x    �U�  �iTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:exif="http://ns.adobe.com/exif/1.0/">
         <exif:ColorSpace>1</exif:ColorSpace>
         <exif:PixelXDimension>150</exif:PixelXDimension>
         <exif:PixelYDimension>150</exif:PixelYDimension>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
��Q�  bIDATx�y����/�B�������81踠�w�(�xN0�	�瘃�0IԘ9'�$�9�x��$L�}\X�Mh�ek�����e������_���^�z�uC_-�uU���}����U�4�YF������ ���kv���\�ܽ{w�l��vֿ;kŭz`]]�9����唔�ٳ�dffJzz�$''K�=$11� �C<{��������)++3Gee���<�a�o�ٙΝ`�� ǎ+S�N��#GJ�>}$##C���k~gee	�����"}uu�9***���D�������R^^.����������3$%%IBBBs'�@w�"��4("t���r�UW�̙3eȐ!���l�W�N� �q��Iٱc����;�y�f��V9]�wX�-.�c�ҡC��W\!�\s�>܈_Do,	�F��U�d�֭�� �H�e}���� �s����F����;On����K�xt�R�z�ĉ�v�Zy뭷��/����:ƺ�z�0
c��W_-��͓�.�H������"��>�5k�G�pě�0�8F�3g��~��FaB9�TPP 6l��{Nv���lv1Vǃ�0�b�`� �y��6m�:�u�(g������69��k���,�k�ĉ�h�"��댭뗏Ey��?��r�J9~��1�b��1�q�����s�J���c��q/c˖-��/��ի����3���gϖ����2}���7z�+������]~����ݻ[y֢U���x�ԡ"?�я���3�n�^�3����_�B>��C�`F�����e�p��Ǐ�+V�w�aƠh��Y���C��>�|��(��Q�禛n2"	M��ZZ �p֬YƏ�s�N9r�HT@���XL����~�3�+ny��_�-�����۷{nJy����x�cP��s�(t0Q��ɷ�~+���ov��N�쮧 3�����ŋ������7:{����2�v<a{��5/ᅽ���e*�|�r���;g+ǹ�H��/�\:شi�'��	�p.�>���r�-�Ĺ�:w�(_^x��۷��ʼM$�1��K��-[f̠H*ӹ����͘1C���cĵ��_�����;����^3��ˆ���W������KpK���x�t�Ҩ�pn_�lI���/���o��!� 3#�B�ƌY�E�i�q���c�=f&e`�p�����_�Z����-���0[�6��?��s�g(��-��	�	&�Yծ�ݶ ��HL�+
`K��?��n���g#k��x�	�4i���s�[X ��`f��z���(�-��Eۧ��Q��t� ý�gK�,��:ɻ�(� �HP���c�ɐ�?�ϻ(~-�S�{���\G�#����x���5��ף����5�\C2u6bA �1��^�ۍ�$��Ȉ#:l[(nRQS'GOUˉ�Z9]]'��r��^�h�z�!�Sa���N����]�{$H��$�LI�T��+%I��I��ɒ��x����?��	�'�>���.�׬�c�W��ګ�W��:�+����5rD-,��o���w'���t�T�������k�3�ʽ���*n@�;b:)�CA�s��dث���M��~�2�O�dg�H��d���$�e�bBQH��^�e���/^��yX�^X&;���#r⴮�>#յ�Ry�&�����V�����v;"x�LMNP.O��i�ٽSd�О2-?KFH��	2�^<��k���^zI>��ӠVMȐ̢1cƘV�XJRPT!�
�çe�����X����E�ʑf,U0!hGz���7���]$A��Pq���`���3�djN/#C��֭[gB�p@���v=�wc	n��z�{�\���H6|["{��K���J�RK�� e�6Q�]"4h����Jt��^�h���q;GE�Լ^r��~rш>�������/sǗ]v���ƌ���Lc2����o���	���B�ͭNɛ[�Ȧ��d��
)WE���ġ�����$DL�D�u��}��rդ�2X�m8>�������r0�m�E{iI�j���ʛ���;_�P��Jjt<5B1���I�ۅH�*v(zGU_����rL�L(���'cexR^�LXf���o��=�f�e��믿>����p���n;X&/}rP���H��V�q�����q���(z�*�?�u�����e��rd��A�O9�k���3Q�0Ø}h8]��0��;��r�j����w�pO�X��3�i'�Z' Y�\[ר]m:s��J��U嬻�b��pJYeSπ̍K/�Tz���OOi��2�/�IY�o������K8̌�
Gc�S����òq�I�u�P�wV��J��Khy��[LYVI�nc����A���$�PP��򕼶�U��D�Y±����N�`�
yn�>yf�.���"�a�؟� �=�.6DlxE�W��+?y�l�[�vl���s���S���_����nͤ��W��d�^�m##���j�|����>�R��}>`o^	M�P��)a��-ŭ�U�_$�����I�DM?�����<�gtl~g��(�(eWN�2��d([,�Bm[̋Z��-����R���*�譀�=����~��v�62��x��L�	zQ�x���o}�5�<�Q�?�Ӱ\���|Д�5��}>l4~5,�5��9�w�W�.�����4٪&��v��̑}�$�QW^y�� ��&( �\pA�L�ިQ'����T��`��`������L���8M}�iɉ������}w�I��L��'�葤~�n��iz$&��":-c�+
e��4,D��]���O�u�C�D`�d��g¢B;F�r�����w��U����j�|�����5c�0�J�>�}��)���#���������ɛ��duw�%�/��%R+��8''Gz������t/k�>��>�n�e�� ����$u�,��ډ46�vc���`��OK�4�Sv%�='&±>�j5*2����<p~�4Y�:@��h�D�k�^4T�^;��m�]�35գ�p/��(g�5�Q�l���3F*�W1%Y��X5:UY#�tf����������v�i���ⴃ���7e�ߞby��]��wL��}݇!���${n"�� �W$Rڡ����e*����F_�e�����!����)��3��=UL�V �*����d�p�&sO��}ń2L����t.�ָ~���37�5�ێj�ߵ7WkȳJ9�ɐ��3rRA/.���.���:���Cŕ��x��<Ǆ	��q�S>�yB��^�,�3Jz黻!<�X@l��&�H�	�����]^�4���X#*���(�ʙp$32�ʍ��}㨛�r�����T��pL���n^��'*e�R�� <l�p�b��X1����Ҁ}P�?���dy��u�a��*g���ԕ�P ��S� K	V�M���߮+#L�#�4b"Eف��`�q$�:I���C1��?v8�$�g28D�޻�v��!vZn��ϱ4N�vaq�|��1c;�=zG��8�����
Φdq��tE���Ly�Ʊ��/�;����Js�vc���Ό���}3{����`��J�8E��E��Q�����{��u�a���R �<��A8����0��"t~^o�{�o��:�[b�l+^��V L���lD��$i�t����V����j��(Ph��:n��fJ���z�2��*�Ec��i�gTfn ��435Y�ɔ�.&���X�P�>e�D�k6���3�S���%�����t�����3'��zb���z��Ct@LOQ�^%d�>L����8"! �Qٽ���g�T�N�F����d*!��R��2c@�+��:>6܊�A:ܛڶF�d{�,��-dt��9��@^����uێ�S�)EZ��U8�V=�s"\͐��n���
f��Rd��y�f?�w��S�Y$�����O�a,!��n0>h��B�����e5��NMD\��
9��KU��nD�2���H�c7��(��h��b�}���a�|� ��MQ@�}�RK.����ֻn�Q�$¡m*⟠�o޿A;4u�����Έ�	F��M'@�+�puZP:�LS��	�K2~��ă�KD��Y:t��n�����_��;(b���:V*r�7lQړ�Lf�F���/ct�J�@D=,2�i�Ӻl�
��JSWd���bM}��-��:-�H5�c��"�21��&�7��SG��T_p�8���c��p*�0�n3����vK�*V�Hx--g��-���n�#]K��D�{�x"�S��[iݞ[����;t
�_�:#��j���C�e�Cd�Fp�C�s�i�~�v!7�c,��Ms���1�U[!IEAVZ�	�h3���ßC{)����g�F�6�7̀r�mQ��r����6h��K��*��vUo�M�:
�&l7��ʆu�gK��`���tC��`.XSL�fX�c
���?����ը��nfnbZNm�W�R3Z�'�$�'Ȋ�Q>��sC�� �ɤ#��[���Ȁ��u٨	�V 6�֧� �{�`���"΄X��e�1��X�m�?�!,G�'S;ާ��R�P3*����'�c�g��F?����=��>fp`/����.��q(��H��x�v��|�� 3;]5�_ ����Ԡ�����owRN(�[ �;�qh����W|�~0θ!��'T˶����-���@��niB�9�KX�|s�+�����0y�J���E�#�(|n��x��l%F��Smn����fF'^��!�Y�`�2ʋ��uF`78����u�&Q���kf��-F��P+Ͷ�ͺ��:�9E�����X����\)��I���Xu�2�	�K�}:����w�ɡ��R3�Ԋ��A����=q��>s��*�G�����R����m�G������b���h�zƗ���2�v��,��t�w��Q9u��k4s0"��"�������d.�`,�Ҙ��9�i��Z1iBU�o�k|����:�3�I?�QsC|��
�k0�p�IS&�|/�x�B5��J�J�R�f�F��"kn~&xDnӹZk�nN�tB�x�Yų���wӭD4�׹�"������-�ff:e�j��2Cѵ�,��������(��4v:6���B�[B<�Ƭ�d���GB�{�E��o�f�3�����D�T��
E8�-�o��u���<�	�mI������2�������:۪�*�) k^�YD[9~���O���j�?p�p�boT��J���%GCrqt��z�$���F���k��o^�J���.�r���FQ�do.��W_}��ӦEؓ8RBTS�{��+Y�+�yi�Aң^:DE[{�HcZԞk���tV�[I=;�9j-�S���kF�V��
;vL�-(c��H	���&��Ю�F��==��y�m�Q�)e_�c+`R"D�!t���^D�P�j}<�KhX()<x�(X����{��w#-Ǥǳ��쑲x�H�-`4�5�=��"��t�&��|�
�}��u����<��;�OǙw�`Y~�DS���Ać��+���Z�h��?�8H�_F�-��'�`���^����/b���Фћ�4q��~��7�W�G���1Ǘ�3�6_M��tH�8nǙ6=��˚${dl�V�U�>p�W���ݗ���['��Q}�}�Ȧ�pj�z�΅����luv��+#%:	A���R呹��ˬz���%c0�jQ�ao��Ỷ^��e���S7��[f1���$�A���F����DSjF��è�1��{�=j�s�ԳU
r��0 ��z�1�	Kn� I¾�����M�6�[�/|��}��YL�&E�~cB��'��+?>$�i�:+L$�����-���Gh��J�vp:V{c0y�o�Du4��e��B�u!��̻p�.cM5KZ}w�����،����� ���ޓ�o�9*���~��郄��ۏ˪�
e�.��D�S�Q�rU��Ε��p��!�ݩ���� �l[�F���~�7�	Q�W��\=y��t��7놥�ڙv����v�L}��>��#cOE����.����B����P>�]lH�+�Y��2�X��r��2M�s{Ƕ|+.�K��A����X���}���r��ih�S�ĺQ���2�7�8��Wћ֮]k�&��E�� �P��x��r������h�������_.�u[��;��.]DV�k�@��mXՇ�tB>��I^j#�[#4ܯ�D,l�FDK^�T3m9���f��P�HW�X�&�pn�� � \����}���`��nzFo���8���QX*����S|��-ѭ�Ϙ�������� ��S�Z�ŉ�DZ:��A�f�	�M��
�"e�7���:9q�.3��HbG�����v2(�p1v�ʕ+�g��E=M(5l��^i�@)�m6�έ�ƞ��E��E����l	�p�&�	��h�_�p��й )�gwL36�90� 
�t �����X��5k�hG\nP��$��|�M���H�v��uu�i0�i�kTQ9��zԕ����=g���N��p��o8hñŧ����b���(Sr�Lp=�� ��"^��7n4���!d��bf'�򗿘Ϫ� ��
k[��9�f2�tu�6v� �@�b�,��9���������Kݚ	c-��&��6���.�����kr�]w��7��%��c*�ȉidO˦gK�e>��"�7���zG"�l�c�-����裏
_�E�(�-PPP`��SXXt����Gf��#�-�6m���g<Z �����m���<�����V?ģ1��2�n�jLX��x0��]�F͠�E�k������~gf�B)WVq��0v#\�m�6�R�9�-���/�F����*a�$r���W@�D�5g-�߳�>k�r{���1,�I�󃙦U�V�mz�����m���(�@0��*P~V'Ѓ�5z�1�	�V�=\V=Υ3f�ҥK�hv2���&l&1�0�/[��Y�3���}�^��8��P�pJp0�=ٻw�q�D��8�ʞ��2����O��h��*lm%䌸f6n�5kVH��=]�og-����p߾}��6b�1��l�b.>u�/�쵺��h�E����H�4"��\́�(>	I���\'���'?1Q�n�1���p2� yƌ] ��Ĥ/^��X)N����`d�p2f ��҇��p���G/���<���df:6l�`B8�M�&|����o��z�0�W�R�� �!�<@��|���2e��i�uQ�`F��%K���%���9�d
��p3_S㋦]Ժ�.�yݧ�zʄFEC9�
�� s0������G�n^���UϽ���x��'�^0��/��V��V�T��[֭�ڵ����>ӹJX̫3��׺�P9m?G1YN3�c/���/>��Y���x���p���òb�
���x��[�Y��3��@��x�7o�Y5����r:ҙ�oX�\.R��bQǘl�S`��.�9s�E̺w6�����W_5�N�b�����f]p�رc��[o����oߞ ��'�?��(����[��ǁ�-� S!�e�f<Ɣ������o�A�EU���^C��u��5�׍��줾qت$@s������/7b<�/�ZeD��� x���3��l���0 �+	Ќ�|dq���r��S�)<�Mj�O޼y��v��m�w��?�v��w��z1��q�oL,&1�l\��}6��M�|-�, Ö�h�Zmء�*	g0N8��Cd�EL,"I&O�,���fg,�ľF�cʓ�����8��T�O֎���8֝�j��N��e ���=@��B#���/p�Yx� ���d�,�-�0�H���ت��# ��Q�V{�B��t { ��0~s�Ɂ�b7U .E!h� ��䈦1�{x}��8T� �?�����9T��^���������Ī�#�����"ƭc��    IEND�B`�
```

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

### `src/shared/data/companies.ts`

```ts
// The company catalogue — every Indian listed stock the prototype shows, with what a card, a list row or the stock
// (asset) page needs: identity, logo, profile and a real market snapshot.
//
// - Logos come from the design system (@l3/assets/company-logos).
// - Profiles (founded, headquarters, website, one line about the business) are written here — public facts.
// - Market data (price, day / 52-week range, volume, 3 months of daily closes, sector, industry) comes from
//   market-snapshot.json, refreshed from Yahoo Finance by `npm run market:snapshot` (see scripts/market-snapshot.mjs).
//   Near-live, not live: the bundled copy is used at first, then the app re-reads ./market-snapshot.json (published
//   next to the page; refreshed every 15 minutes in market hours by the site's GitHub Action) on load and every
//   5 minutes. `companies` / `getCompany()` then return the newer numbers; call `useMarketSnapshot()` in a screen
//   that shows prices so it re-renders when they change.
import { useSyncExternalStore } from 'react'
import { companyLogo } from '@l3/assets/company-logos'
import bundled from './market-snapshot.json'

export type Exchange = 'NSE' | 'BSE'

export type CompanyProfile = {
  /** NSE trading symbol — the key everywhere (RELIANCE). */
  symbol: string
  /** How the app writes it (Reliance Industries). */
  name: string
  /** Two letters for the Avatar when there's no logo. */
  initials: string
  exchanges: Exchange[]
  founded: number
  headquarters: string
  website: string
  /** One sentence on the business. */
  about: string
}

export type DailyClose = { date: string; close: number }

export type MarketData = {
  /** Last traded price, ₹. */
  price: number
  prevClose: number
  /** Day change, ₹ and %. */
  change: number
  changePct: number
  dayHigh: number
  dayLow: number
  high52: number
  low52: number
  volume: number | null
  sector: string | null
  industry: string | null
  /** Daily closes, oldest first (about 3 months) — for sparklines and the stock page chart. */
  closes: DailyClose[]
}

export type Company = CompanyProfile & {
  /** Logo image URL from the design system, or undefined (show `initials`). */
  logoUrl?: string
  /** The snapshot's market data, or undefined if the symbol wasn't fetched. */
  market?: MarketData
}

const both: Exchange[] = ['NSE', 'BSE']
const company = (symbol: string, name: string, initials: string, founded: number, headquarters: string, website: string, about: string): CompanyProfile => ({
  symbol, name, initials, exchanges: both, founded, headquarters, website, about,
})

/** Profiles, by NSE symbol (one line each — scripts/market-snapshot.mjs reads the symbols from here). */
export const profiles = {
  ADANIENT: company('ADANIENT', 'Adani Enterprises', 'AE', 1988, 'Ahmedabad', 'adanienterprises.com', 'The Adani Group’s incubator — airports, roads, data centres, mining and new energy.'),
  ADANIGREEN: company('ADANIGREEN', 'Adani Green Energy', 'AG', 2015, 'Ahmedabad', 'adanigreenenergy.com', 'One of India’s largest renewable power producers — solar, wind and hybrid plants.'),
  ADANIPORTS: company('ADANIPORTS', 'Adani Ports and SEZ', 'AP', 1998, 'Ahmedabad', 'adaniports.com', 'India’s largest private port operator, with logistics and special economic zones.'),
  ADANIPOWER: company('ADANIPOWER', 'Adani Power', 'AP', 1996, 'Ahmedabad', 'adanipower.com', 'India’s largest private thermal power producer.'),
  ASIANPAINT: company('ASIANPAINT', 'Asian Paints', 'AP', 1942, 'Mumbai', 'asianpaints.com', 'India’s largest paint company — decorative and industrial coatings, home décor.'),
  AXISBANK: company('AXISBANK', 'Axis Bank', 'AX', 1993, 'Mumbai', 'axisbank.com', 'A large private-sector bank — retail, corporate and SME banking.'),
  'BAJAJ-AUTO': company('BAJAJ-AUTO', 'Bajaj Auto', 'BA', 1945, 'Pune', 'bajajauto.com', 'Makes motorcycles, scooters and three-wheelers, and exports them worldwide.'),
  BAJAJFINSV: company('BAJAJFINSV', 'Bajaj Finserv', 'BF', 2007, 'Pune', 'bajajfinserv.in', 'Holding company for Bajaj’s lending, insurance and payments businesses.'),
  BAJFINANCE: company('BAJFINANCE', 'Bajaj Finance', 'BF', 1987, 'Pune', 'bajajfinserv.in', 'A large non-bank lender — consumer, SME and mortgage loans.'),
  BEL: company('BEL', 'Bharat Electronics', 'BE', 1954, 'Bengaluru', 'bel-india.in', 'State-owned maker of defence electronics — radars, communication and avionics.'),
  BHARTIARTL: company('BHARTIARTL', 'Bharti Airtel', 'BA', 1995, 'New Delhi', 'airtel.in', 'Telecom operator — mobile, broadband and DTH in India and Africa.'),
  COALINDIA: company('COALINDIA', 'Coal India', 'CI', 1975, 'Kolkata', 'coalindia.in', 'State-owned miner — the world’s largest coal producer.'),
  DIVISLAB: company('DIVISLAB', 'Divi’s Laboratories', 'DL', 1990, 'Hyderabad', 'divislabs.com', 'Makes active pharmaceutical ingredients and intermediates for drug makers worldwide.'),
  DMART: company('DMART', 'Avenue Supermarts (DMart)', 'DM', 2000, 'Mumbai', 'dmartindia.com', 'Runs the DMart chain of value supermarkets.'),
  EICHERMOT: company('EICHERMOT', 'Eicher Motors', 'EM', 1948, 'New Delhi', 'eicher.in', 'Owner of Royal Enfield motorcycles and a partner in VE Commercial Vehicles.'),
  ETERNAL: company('ETERNAL', 'Eternal (Zomato)', 'ET', 2008, 'Gurugram', 'eternal.com', 'Parent of Zomato, Blinkit, District and Hyperpure — food delivery and quick commerce.'),
  GRASIM: company('GRASIM', 'Grasim Industries', 'GI', 1947, 'Mumbai', 'grasim.com', 'Aditya Birla Group company — cellulose fibre, chemicals, paints and cement (via UltraTech).'),
  HAL: company('HAL', 'Hindustan Aeronautics', 'HA', 1940, 'Bengaluru', 'hal-india.co.in', 'State-owned maker of military aircraft, helicopters and aero engines.'),
  HCLTECH: company('HCLTECH', 'HCL Technologies', 'HC', 1976, 'Noida', 'hcltech.com', 'IT services and software company — engineering, digital and cloud services.'),
  HDFCBANK: company('HDFCBANK', 'HDFC Bank', 'HB', 1994, 'Mumbai', 'hdfcbank.com', 'India’s largest private-sector bank by assets.'),
  HINDALCO: company('HINDALCO', 'Hindalco Industries', 'HI', 1958, 'Mumbai', 'hindalco.com', 'Aditya Birla Group’s aluminium and copper maker; owns Novelis.'),
  HINDUNILVR: company('HINDUNILVR', 'Hindustan Unilever', 'HU', 1933, 'Mumbai', 'hul.co.in', 'India’s largest consumer goods company — Surf, Dove, Lux, Brooke Bond and more.'),
  HINDZINC: company('HINDZINC', 'Hindustan Zinc', 'HZ', 1966, 'Udaipur', 'hzlindia.com', 'Vedanta Group’s integrated zinc, lead and silver producer.'),
  ICICIBANK: company('ICICIBANK', 'ICICI Bank', 'IB', 1994, 'Mumbai', 'icicibank.com', 'A large private-sector bank — retail, corporate and digital banking.'),
  IDEA: company('IDEA', 'Vodafone Idea', 'VI', 1995, 'Mumbai', 'myvi.in', 'Telecom operator Vi — mobile and broadband, formed by the merger of Vodafone India and Idea Cellular.'),
  INDIGO: company('INDIGO', 'InterGlobe Aviation (IndiGo)', 'IG', 2006, 'Gurugram', 'goindigo.in', 'Runs IndiGo, India’s largest airline by passengers.'),
  INFY: company('INFY', 'Infosys', 'IN', 1981, 'Bengaluru', 'infosys.com', 'IT services and consulting company — digital, cloud and AI services.'),
  IOC: company('IOC', 'Indian Oil Corporation', 'IO', 1959, 'New Delhi', 'iocl.com', 'State-owned oil refiner and fuel retailer — India’s largest.'),
  IRFC: company('IRFC', 'Indian Railway Finance Corporation', 'IR', 1986, 'New Delhi', 'irfc.co.in', 'State-owned lender that funds Indian Railways’ trains, wagons and track.'),
  ITC: company('ITC', 'ITC', 'IT', 1910, 'Kolkata', 'itcportal.com', 'Cigarettes, packaged foods (Aashirvaad, Sunfeast), paperboards and agri-business.'),
  JSWSTEEL: company('JSWSTEEL', 'JSW Steel', 'JS', 1982, 'Mumbai', 'jsw.in', 'One of India’s largest steel makers.'),
  KOTAKBANK: company('KOTAKBANK', 'Kotak Mahindra Bank', 'KB', 1985, 'Mumbai', 'kotak.com', 'Private-sector bank with broking, insurance and asset management.'),
  LICI: company('LICI', 'Life Insurance Corporation of India', 'LI', 1956, 'Mumbai', 'licindia.in', 'State-owned life insurer — India’s largest.'),
  LT: company('LT', 'Larsen & Toubro', 'LT', 1938, 'Mumbai', 'larsentoubro.com', 'Engineering and construction conglomerate — infrastructure, defence, IT services.'),
  'M&M': company('M&M', 'Mahindra & Mahindra', 'MM', 1945, 'Mumbai', 'mahindra.com', 'SUVs, tractors and commercial vehicles; India’s largest tractor maker.'),
  MARUTI: company('MARUTI', 'Maruti Suzuki India', 'MS', 1981, 'New Delhi', 'marutisuzuki.com', 'India’s largest car maker, majority-owned by Suzuki.'),
  NESTLEIND: company('NESTLEIND', 'Nestlé India', 'NI', 1959, 'Gurugram', 'nestle.in', 'Maggi, Nescafé, KitKat and baby food — the Indian arm of Nestlé.'),
  NHPC: company('NHPC', 'NHPC', 'NH', 1975, 'Faridabad', 'nhpcindia.com', 'State-owned hydroelectric power producer — India’s largest.'),
  NTPC: company('NTPC', 'NTPC', 'NT', 1975, 'New Delhi', 'ntpc.co.in', 'State-owned power producer — India’s largest, thermal and renewables.'),
  ONGC: company('ONGC', 'Oil and Natural Gas Corporation', 'ON', 1956, 'New Delhi', 'ongcindia.com', 'State-owned explorer and producer of crude oil and natural gas — India’s largest.'),
  POWERGRID: company('POWERGRID', 'Power Grid Corporation of India', 'PG', 1989, 'Gurugram', 'powergrid.in', 'State-owned operator of India’s inter-state power transmission network.'),
  RELIANCE: company('RELIANCE', 'Reliance Industries', 'RI', 1966, 'Mumbai', 'ril.com', 'Oil-to-chemicals, Jio telecom and Reliance Retail — India’s largest company by revenue.'),
  SBIN: company('SBIN', 'State Bank of India', 'SB', 1955, 'Mumbai', 'sbi.co.in', 'State-owned bank — India’s largest by assets and customers.'),
  SHRIRAMFIN: company('SHRIRAMFIN', 'Shriram Finance', 'SF', 1979, 'Chennai', 'shriramfinance.in', 'Non-bank lender — commercial vehicle, MSME and gold loans.'),
  SOLARINDS: company('SOLARINDS', 'Solar Industries India', 'SI', 1995, 'Nagpur', 'solargroup.com', 'Industrial explosives and defence ammunition maker.'),
  SOUTHBANK: company('SOUTHBANK', 'South Indian Bank', 'SB', 1929, 'Thrissur', 'southindianbank.com', 'Private-sector bank rooted in Kerala — retail, SME and NRI banking.'),
  SUNPHARMA: company('SUNPHARMA', 'Sun Pharmaceutical Industries', 'SP', 1983, 'Mumbai', 'sunpharma.com', 'India’s largest drug maker — specialty and generic medicines.'),
  SUZLON: company('SUZLON', 'Suzlon Energy', 'SE', 1995, 'Pune', 'suzlon.com', 'India’s largest wind turbine maker — builds and services wind farms.'),
  TATASTEEL: company('TATASTEEL', 'Tata Steel', 'TS', 1907, 'Mumbai', 'tatasteel.com', 'Tata Group’s steel maker, with plants in India, the Netherlands and the UK.'),
  TCS: company('TCS', 'Tata Consultancy Services', 'TC', 1968, 'Mumbai', 'tcs.com', 'India’s largest IT services company, part of the Tata Group.'),
  TITAN: company('TITAN', 'Titan Company', 'TI', 1984, 'Bengaluru', 'titancompany.in', 'Tanishq jewellery, Titan watches and eyewear — Tata Group.'),
  TORNTPHARM: company('TORNTPHARM', 'Torrent Pharmaceuticals', 'TP', 1959, 'Ahmedabad', 'torrentpharma.com', 'Branded generic medicines in India and abroad.'),
  TVSMOTOR: company('TVSMOTOR', 'TVS Motor Company', 'TV', 1978, 'Chennai', 'tvsmotor.com', 'Motorcycles, scooters (incl. electric) and three-wheelers.'),
  ULTRACEMCO: company('ULTRACEMCO', 'UltraTech Cement', 'UC', 1983, 'Mumbai', 'ultratechcement.com', 'India’s largest cement maker — Aditya Birla Group.'),
  WIPRO: company('WIPRO', 'Wipro', 'WI', 1945, 'Bengaluru', 'wipro.com', 'IT services and consulting company.'),
  YESBANK: company('YESBANK', 'Yes Bank', 'YB', 2004, 'Mumbai', 'yesbank.in', 'Private-sector bank — retail, MSME and corporate banking; rebuilt by an SBI-led rescue in 2020.'),
} satisfies Record<string, CompanyProfile>

export type CompanySymbol = keyof typeof profiles

type Snapshot = { source: string; fetchedAt: string; quotes: Record<string, Partial<MarketData> & { closes?: DailyClose[] }> }

/** When the market data shown now was fetched (ISO date-time) and from where. Updated in place by the runtime refresh. */
export const marketSnapshot = { fetchedAt: bundled.fetchedAt, source: bundled.source }

function toCompany(p: CompanyProfile, snapshot: Snapshot, fallback?: MarketData): Company {
  const q = snapshot.quotes[p.symbol]
  return { ...p, logoUrl: companyLogo(p.symbol), market: q?.price != null ? (q as MarketData) : fallback }
}

/** Every company with logo and market data, by NSE symbol. */
export const companies = Object.fromEntries(Object.values(profiles).map((p) => [p.symbol, toCompany(p, bundled as Snapshot)])) as Record<CompanySymbol, Company>

// ── Runtime refresh ──────────────────────────────────────────────────────────────────────────────────────────────
const listeners = new Set<() => void>()

function apply(snapshot: Snapshot) {
  if (!(snapshot.fetchedAt > marketSnapshot.fetchedAt)) return // ISO strings sort by time; never go back to older data
  // A symbol the published file doesn't have yet (added to the catalogue after the site's copy) keeps the numbers we have.
  for (const p of Object.values(profiles)) companies[p.symbol as CompanySymbol] = toCompany(p, snapshot, companies[p.symbol as CompanySymbol]?.market)
  Object.assign(marketSnapshot, { fetchedAt: snapshot.fetchedAt, source: snapshot.source })
  listeners.forEach((l) => l())
}

/** Re-read the published snapshot (same origin — no API call). Fails quietly: the numbers we have stay. */
export async function refreshMarket() {
  try {
    const res = await fetch('market-snapshot.json', { cache: 'no-cache' })
    if (res.ok) apply(await res.json())
  } catch { /* offline, or the file isn't there — keep what we have */ }
}

const REFRESH_MS = 5 * 60 * 1000
if (typeof window !== 'undefined') {
  refreshMarket()
  setInterval(() => { if (document.visibilityState === 'visible') refreshMarket() }, REFRESH_MS)
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refreshMarket() })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

/** Re-renders the calling component when fresher market data arrives; returns its `fetchedAt`. */
export function useMarketSnapshot(): string {
  return useSyncExternalStore(subscribe, () => marketSnapshot.fetchedAt)
}

/** One company by NSE symbol (undefined if it isn't in the catalogue). */
export function getCompany(symbol: string): Company | undefined {
  return (companies as Record<string, Company | undefined>)[symbol]
}

/** All companies, sorted by today's change — for "top gainers / losers" style lists. */
export function companiesByChange(direction: 'gainers' | 'losers'): Company[] {
  const list = Object.values(companies).filter((c) => c.market)
  return list.sort((a, b) => (direction === 'gainers' ? b.market!.changePct - a.market!.changePct : a.market!.changePct - b.market!.changePct))
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

### `src/shared/data/market-snapshot.json`

```json
{
 "source": "Yahoo Finance (public chart + search endpoints)",
 "fetchedAt": "2026-10-22T20:21:36.864Z",
 "symbols": [
  "ADANIENT",
  "ADANIGREEN",
  "ADANIPORTS",
  "ADANIPOWER",
  "ASIANPAINT",
  "AXISBANK",
  "BAJAJ-AUTO",
  "BAJAJFINSV",
  "BAJFINANCE",
  "BEL",
  "BHARTIARTL",
  "COALINDIA",
  "DIVISLAB",
  "DMART",
  "EICHERMOT",
  "ETERNAL",
  "GRASIM",
  "HAL",
  "HCLTECH",
  "HDFCBANK",
  "HINDALCO",
  "HINDUNILVR",
  "HINDZINC",
  "ICICIBANK",
  "IDEA",
  "INDIGO",
  "INFY",
  "IOC",
  "IRFC",
  "ITC",
  "JSWSTEEL",
  "KOTAKBANK",
  "LICI",
  "LT",
  "M&M",
  "MARUTI",
  "NESTLEIND",
  "NHPC",
  "NTPC",
  "ONGC",
  "POWERGRID",
  "RELIANCE",
  "SBIN",
  "SHRIRAMFIN",
  "SOLARINDS",
  "SOUTHBANK",
  "SUNPHARMA",
  "SUZLON",
  "TATASTEEL",
  "TCS",
  "TITAN",
  "TORNTPHARM",
  "TVSMOTOR",
  "ULTRACEMCO",
  "WIPRO",
  "YESBANK"
 ],
 "quotes": {
  "ADANIENT": {
   "price": 2550,
   "prevClose": 2657.5,
   "change": -107.5,
   "changePct": -4.05,
   "dayHigh": 2592.2,
   "dayLow": 2531.5,
   "high52": 3245,
   "low52": 1753,
   "volume": 1011595,
   "longName": "Adani Enterprises Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 3147.7
    },
    {
     "date": "2026-07-23",
     "close": 3010
    },
    {
     "date": "2026-07-24",
     "close": 3026.4
    },
    {
     "date": "2026-07-27",
     "close": 3036.6
    },
    {
     "date": "2026-07-28",
     "close": 3002.3
    },
    {
     "date": "2026-07-29",
     "close": 3024.5
    },
    {
     "date": "2026-07-30",
     "close": 3049.1
    },
    {
     "date": "2026-07-31",
     "close": 3009.5
    },
    {
     "date": "2026-08-03",
     "close": 3068
    },
    {
     "date": "2026-08-04",
     "close": 3050
    },
    {
     "date": "2026-08-05",
     "close": 3050
    },
    {
     "date": "2026-08-06",
     "close": 3026
    },
    {
     "date": "2026-08-07",
     "close": 3020
    },
    {
     "date": "2026-08-10",
     "close": 3010
    },
    {
     "date": "2026-08-11",
     "close": 2995.5
    },
    {
     "date": "2026-08-12",
     "close": 2985.7
    },
    {
     "date": "2026-08-13",
     "close": 2964.9
    },
    {
     "date": "2026-08-14",
     "close": 3035.1
    },
    {
     "date": "2026-08-17",
     "close": 3007.3
    },
    {
     "date": "2026-08-18",
     "close": 3002.5
    },
    {
     "date": "2026-08-19",
     "close": 2990.3
    },
    {
     "date": "2026-08-20",
     "close": 2994.9
    },
    {
     "date": "2026-08-21",
     "close": 2997
    },
    {
     "date": "2026-08-24",
     "close": 2998.6
    },
    {
     "date": "2026-08-25",
     "close": 3110
    },
    {
     "date": "2026-08-26",
     "close": 3112
    },
    {
     "date": "2026-08-27",
     "close": 3169
    },
    {
     "date": "2026-08-28",
     "close": 3168.5
    },
    {
     "date": "2026-08-31",
     "close": 2859.1
    },
    {
     "date": "2026-09-01",
     "close": 2863.9
    },
    {
     "date": "2026-09-02",
     "close": 2891.8
    },
    {
     "date": "2026-09-03",
     "close": 2901
    },
    {
     "date": "2026-09-04",
     "close": 2938
    },
    {
     "date": "2026-09-07",
     "close": 2950
    },
    {
     "date": "2026-09-08",
     "close": 2953.1
    },
    {
     "date": "2026-09-09",
     "close": 3104.7
    },
    {
     "date": "2026-09-10",
     "close": 3077.2
    },
    {
     "date": "2026-09-11",
     "close": 3060
    },
    {
     "date": "2026-09-15",
     "close": 2928.6
    },
    {
     "date": "2026-09-16",
     "close": 2920
    },
    {
     "date": "2026-09-17",
     "close": 2923.2
    },
    {
     "date": "2026-09-18",
     "close": 3020
    },
    {
     "date": "2026-09-21",
     "close": 2975
    },
    {
     "date": "2026-09-22",
     "close": 2997
    },
    {
     "date": "2026-09-23",
     "close": 2993.2
    },
    {
     "date": "2026-09-24",
     "close": 2900
    },
    {
     "date": "2026-09-25",
     "close": 2916.5
    },
    {
     "date": "2026-09-28",
     "close": 2831.1
    },
    {
     "date": "2026-09-29",
     "close": 2972.9
    },
    {
     "date": "2026-09-30",
     "close": 2903.4
    },
    {
     "date": "2026-10-01",
     "close": 2816.8
    },
    {
     "date": "2026-10-05",
     "close": 2864
    },
    {
     "date": "2026-10-06",
     "close": 2849.9
    },
    {
     "date": "2026-10-07",
     "close": 2743
    },
    {
     "date": "2026-10-08",
     "close": 2596
    },
    {
     "date": "2026-10-09",
     "close": 2634.4
    },
    {
     "date": "2026-10-12",
     "close": 2630
    },
    {
     "date": "2026-10-13",
     "close": 2695
    },
    {
     "date": "2026-10-14",
     "close": 2722.6
    },
    {
     "date": "2026-10-15",
     "close": 2700
    },
    {
     "date": "2026-10-16",
     "close": 2692
    },
    {
     "date": "2026-10-19",
     "close": 2657.5
    },
    {
     "date": "2026-10-21",
     "close": 2594.5
    }
   ],
   "sector": "Energy",
   "industry": "Thermal Coal"
  },
  "ADANIGREEN": {
   "price": 1250,
   "prevClose": 1295.2,
   "change": -45.2,
   "changePct": -3.49,
   "dayHigh": 1263.4,
   "dayLow": 1210.7,
   "high52": 1631.5,
   "low52": 765,
   "volume": 1689322,
   "longName": "Adani Green Energy Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1472.3
    },
    {
     "date": "2026-07-23",
     "close": 1379.9
    },
    {
     "date": "2026-07-24",
     "close": 1395.1
    },
    {
     "date": "2026-07-27",
     "close": 1399.7
    },
    {
     "date": "2026-07-28",
     "close": 1377.8
    },
    {
     "date": "2026-07-29",
     "close": 1373.1
    },
    {
     "date": "2026-07-30",
     "close": 1358.7
    },
    {
     "date": "2026-07-31",
     "close": 1383
    },
    {
     "date": "2026-08-03",
     "close": 1395
    },
    {
     "date": "2026-08-04",
     "close": 1384
    },
    {
     "date": "2026-08-05",
     "close": 1380
    },
    {
     "date": "2026-08-06",
     "close": 1371.5
    },
    {
     "date": "2026-08-07",
     "close": 1372.4
    },
    {
     "date": "2026-08-10",
     "close": 1369
    },
    {
     "date": "2026-08-11",
     "close": 1366
    },
    {
     "date": "2026-08-12",
     "close": 1332.3
    },
    {
     "date": "2026-08-13",
     "close": 1319
    },
    {
     "date": "2026-08-14",
     "close": 1348
    },
    {
     "date": "2026-08-17",
     "close": 1327.6
    },
    {
     "date": "2026-08-18",
     "close": 1308
    },
    {
     "date": "2026-08-19",
     "close": 1293
    },
    {
     "date": "2026-08-20",
     "close": 1301.8
    },
    {
     "date": "2026-08-21",
     "close": 1320
    },
    {
     "date": "2026-08-24",
     "close": 1308
    },
    {
     "date": "2026-08-25",
     "close": 1330
    },
    {
     "date": "2026-08-26",
     "close": 1303.2
    },
    {
     "date": "2026-08-27",
     "close": 1328.5
    },
    {
     "date": "2026-08-28",
     "close": 1311
    },
    {
     "date": "2026-08-31",
     "close": 1214.9
    },
    {
     "date": "2026-09-01",
     "close": 1265
    },
    {
     "date": "2026-09-02",
     "close": 1296
    },
    {
     "date": "2026-09-03",
     "close": 1283.4
    },
    {
     "date": "2026-09-04",
     "close": 1301.3
    },
    {
     "date": "2026-09-07",
     "close": 1288
    },
    {
     "date": "2026-09-08",
     "close": 1292
    },
    {
     "date": "2026-09-09",
     "close": 1315
    },
    {
     "date": "2026-09-10",
     "close": 1299.1
    },
    {
     "date": "2026-09-11",
     "close": 1281.3
    },
    {
     "date": "2026-09-15",
     "close": 1255
    },
    {
     "date": "2026-09-16",
     "close": 1270.2
    },
    {
     "date": "2026-09-17",
     "close": 1274.2
    },
    {
     "date": "2026-09-18",
     "close": 1334.5
    },
    {
     "date": "2026-09-21",
     "close": 1303.6
    },
    {
     "date": "2026-09-22",
     "close": 1304
    },
    {
     "date": "2026-09-23",
     "close": 1300.9
    },
    {
     "date": "2026-09-24",
     "close": 1280.1
    },
    {
     "date": "2026-09-25",
     "close": 1296.6
    },
    {
     "date": "2026-09-28",
     "close": 1235
    },
    {
     "date": "2026-09-29",
     "close": 1260
    },
    {
     "date": "2026-09-30",
     "close": 1278
    },
    {
     "date": "2026-10-01",
     "close": 1276.1
    },
    {
     "date": "2026-10-05",
     "close": 1284
    },
    {
     "date": "2026-10-06",
     "close": 1313
    },
    {
     "date": "2026-10-07",
     "close": 1341.4
    },
    {
     "date": "2026-10-08",
     "close": 1235.7
    },
    {
     "date": "2026-10-09",
     "close": 1255.8
    },
    {
     "date": "2026-10-12",
     "close": 1274
    },
    {
     "date": "2026-10-13",
     "close": 1287
    },
    {
     "date": "2026-10-14",
     "close": 1318.4
    },
    {
     "date": "2026-10-15",
     "close": 1307.1
    },
    {
     "date": "2026-10-16",
     "close": 1302
    },
    {
     "date": "2026-10-19",
     "close": 1295.2
    },
    {
     "date": "2026-10-21",
     "close": 1258.5
    }
   ],
   "sector": "Utilities",
   "industry": "Utilities—Renewable"
  },
  "ADANIPORTS": {
   "price": 1750,
   "prevClose": 1766,
   "change": -16,
   "changePct": -0.91,
   "dayHigh": 1750,
   "dayLow": 1715.3,
   "high52": 1891.1,
   "low52": 1292,
   "volume": 1634176,
   "longName": "Adani Ports and Special Economic Zone Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1819.4
    },
    {
     "date": "2026-07-23",
     "close": 1778.5
    },
    {
     "date": "2026-07-24",
     "close": 1768.3
    },
    {
     "date": "2026-07-27",
     "close": 1770.4
    },
    {
     "date": "2026-07-28",
     "close": 1774.7
    },
    {
     "date": "2026-07-29",
     "close": 1719.7
    },
    {
     "date": "2026-07-30",
     "close": 1664.1
    },
    {
     "date": "2026-07-31",
     "close": 1696.5
    },
    {
     "date": "2026-08-03",
     "close": 1701
    },
    {
     "date": "2026-08-04",
     "close": 1706.7
    },
    {
     "date": "2026-08-05",
     "close": 1700
    },
    {
     "date": "2026-08-06",
     "close": 1695
    },
    {
     "date": "2026-08-07",
     "close": 1693.5
    },
    {
     "date": "2026-08-10",
     "close": 1681
    },
    {
     "date": "2026-08-11",
     "close": 1668.2
    },
    {
     "date": "2026-08-12",
     "close": 1665
    },
    {
     "date": "2026-08-13",
     "close": 1658
    },
    {
     "date": "2026-08-14",
     "close": 1700
    },
    {
     "date": "2026-08-17",
     "close": 1691
    },
    {
     "date": "2026-08-18",
     "close": 1682.4
    },
    {
     "date": "2026-08-19",
     "close": 1681.9
    },
    {
     "date": "2026-08-20",
     "close": 1696
    },
    {
     "date": "2026-08-21",
     "close": 1700
    },
    {
     "date": "2026-08-24",
     "close": 1672.1
    },
    {
     "date": "2026-08-25",
     "close": 1702.7
    },
    {
     "date": "2026-08-26",
     "close": 1691.5
    },
    {
     "date": "2026-08-27",
     "close": 1714
    },
    {
     "date": "2026-08-28",
     "close": 1707.5
    },
    {
     "date": "2026-08-31",
     "close": 1593.1
    },
    {
     "date": "2026-09-01",
     "close": 1647.5
    },
    {
     "date": "2026-09-02",
     "close": 1672.7
    },
    {
     "date": "2026-09-03",
     "close": 1706.5
    },
    {
     "date": "2026-09-04",
     "close": 1707.3
    },
    {
     "date": "2026-09-07",
     "close": 1694.3
    },
    {
     "date": "2026-09-08",
     "close": 1710
    },
    {
     "date": "2026-09-09",
     "close": 1775
    },
    {
     "date": "2026-09-10",
     "close": 1768
    },
    {
     "date": "2026-09-11",
     "close": 1764.6
    },
    {
     "date": "2026-09-15",
     "close": 1713.8
    },
    {
     "date": "2026-09-16",
     "close": 1723.8
    },
    {
     "date": "2026-09-17",
     "close": 1738.3
    },
    {
     "date": "2026-09-18",
     "close": 1824
    },
    {
     "date": "2026-09-21",
     "close": 1787.1
    },
    {
     "date": "2026-09-22",
     "close": 1795
    },
    {
     "date": "2026-09-23",
     "close": 1807.3
    },
    {
     "date": "2026-09-24",
     "close": 1785.3
    },
    {
     "date": "2026-09-25",
     "close": 1788
    },
    {
     "date": "2026-09-28",
     "close": 1743.7
    },
    {
     "date": "2026-09-29",
     "close": 1822
    },
    {
     "date": "2026-09-30",
     "close": 1798.3
    },
    {
     "date": "2026-10-01",
     "close": 1737.8
    },
    {
     "date": "2026-10-05",
     "close": 1774
    },
    {
     "date": "2026-10-06",
     "close": 1783.4
    },
    {
     "date": "2026-10-07",
     "close": 1750.1
    },
    {
     "date": "2026-10-08",
     "close": 1708
    },
    {
     "date": "2026-10-09",
     "close": 1761
    },
    {
     "date": "2026-10-12",
     "close": 1754
    },
    {
     "date": "2026-10-13",
     "close": 1763
    },
    {
     "date": "2026-10-14",
     "close": 1748.7
    },
    {
     "date": "2026-10-15",
     "close": 1743.2
    },
    {
     "date": "2026-10-16",
     "close": 1750.8
    },
    {
     "date": "2026-10-19",
     "close": 1766
    },
    {
     "date": "2026-10-21",
     "close": 1748.8
    }
   ],
   "sector": "Industrials",
   "industry": "Marine Shipping"
  },
  "ADANIPOWER": {
   "price": 185.27,
   "prevClose": 194.08,
   "change": -8.81,
   "changePct": -4.54,
   "dayHigh": 188.06,
   "dayLow": 183,
   "high52": 254.2,
   "low52": 128.1,
   "volume": 13368643,
   "longName": "Adani Power Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 216.95
    },
    {
     "date": "2026-07-23",
     "close": 212.23
    },
    {
     "date": "2026-07-24",
     "close": 213.66
    },
    {
     "date": "2026-07-27",
     "close": 213.96
    },
    {
     "date": "2026-07-28",
     "close": 208.25
    },
    {
     "date": "2026-07-29",
     "close": 209.52
    },
    {
     "date": "2026-07-30",
     "close": 208.97
    },
    {
     "date": "2026-07-31",
     "close": 211.31
    },
    {
     "date": "2026-08-03",
     "close": 213.65
    },
    {
     "date": "2026-08-04",
     "close": 209.95
    },
    {
     "date": "2026-08-05",
     "close": 208.99
    },
    {
     "date": "2026-08-06",
     "close": 208.12
    },
    {
     "date": "2026-08-07",
     "close": 209
    },
    {
     "date": "2026-08-10",
     "close": 210.65
    },
    {
     "date": "2026-08-11",
     "close": 209
    },
    {
     "date": "2026-08-12",
     "close": 206.99
    },
    {
     "date": "2026-08-13",
     "close": 206.1
    },
    {
     "date": "2026-08-14",
     "close": 205.25
    },
    {
     "date": "2026-08-17",
     "close": 203.56
    },
    {
     "date": "2026-08-18",
     "close": 205.58
    },
    {
     "date": "2026-08-19",
     "close": 204.02
    },
    {
     "date": "2026-08-20",
     "close": 204
    },
    {
     "date": "2026-08-21",
     "close": 205.5
    },
    {
     "date": "2026-08-24",
     "close": 203.7
    },
    {
     "date": "2026-08-25",
     "close": 206.33
    },
    {
     "date": "2026-08-26",
     "close": 207.2
    },
    {
     "date": "2026-08-27",
     "close": 215
    },
    {
     "date": "2026-08-28",
     "close": 212.63
    },
    {
     "date": "2026-08-31",
     "close": 198
    },
    {
     "date": "2026-09-01",
     "close": 204.36
    },
    {
     "date": "2026-09-02",
     "close": 207.7
    },
    {
     "date": "2026-09-03",
     "close": 208.29
    },
    {
     "date": "2026-09-04",
     "close": 207.2
    },
    {
     "date": "2026-09-07",
     "close": 204.49
    },
    {
     "date": "2026-09-08",
     "close": 208.4
    },
    {
     "date": "2026-09-09",
     "close": 214.9
    },
    {
     "date": "2026-09-10",
     "close": 213.5
    },
    {
     "date": "2026-09-11",
     "close": 209.97
    },
    {
     "date": "2026-09-15",
     "close": 202
    },
    {
     "date": "2026-09-16",
     "close": 202.34
    },
    {
     "date": "2026-09-17",
     "close": 205.92
    },
    {
     "date": "2026-09-18",
     "close": 206.6
    },
    {
     "date": "2026-09-21",
     "close": 206.55
    },
    {
     "date": "2026-09-22",
     "close": 206.96
    },
    {
     "date": "2026-09-23",
     "close": 204.8
    },
    {
     "date": "2026-09-24",
     "close": 199.48
    },
    {
     "date": "2026-09-25",
     "close": 202.75
    },
    {
     "date": "2026-09-28",
     "close": 196.14
    },
    {
     "date": "2026-09-29",
     "close": 196.3
    },
    {
     "date": "2026-09-30",
     "close": 204
    },
    {
     "date": "2026-10-01",
     "close": 196.21
    },
    {
     "date": "2026-10-05",
     "close": 201
    },
    {
     "date": "2026-10-06",
     "close": 202.4
    },
    {
     "date": "2026-10-07",
     "close": 196.94
    },
    {
     "date": "2026-10-08",
     "close": 188
    },
    {
     "date": "2026-10-09",
     "close": 189
    },
    {
     "date": "2026-10-12",
     "close": 185.9
    },
    {
     "date": "2026-10-13",
     "close": 185.96
    },
    {
     "date": "2026-10-14",
     "close": 195.15
    },
    {
     "date": "2026-10-15",
     "close": 196.5
    },
    {
     "date": "2026-10-16",
     "close": 195.85
    },
    {
     "date": "2026-10-19",
     "close": 194.08
    },
    {
     "date": "2026-10-21",
     "close": 187.09
    }
   ],
   "sector": "Utilities",
   "industry": "Utilities—Independent Power Producers"
  },
  "ASIANPAINT": {
   "price": 2284.8,
   "prevClose": 2330.7,
   "change": -45.9,
   "changePct": -1.97,
   "dayHigh": 2309.9,
   "dayLow": 2270,
   "high52": 2985.7,
   "low52": 2115,
   "volume": 435972,
   "longName": "Asian Paints Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 2692.8
    },
    {
     "date": "2026-07-23",
     "close": 2668.8
    },
    {
     "date": "2026-07-24",
     "close": 2637.9
    },
    {
     "date": "2026-07-27",
     "close": 2710.2
    },
    {
     "date": "2026-07-28",
     "close": 2736.2
    },
    {
     "date": "2026-07-29",
     "close": 2758.4
    },
    {
     "date": "2026-07-30",
     "close": 2746.2
    },
    {
     "date": "2026-07-31",
     "close": 2747.3
    },
    {
     "date": "2026-08-03",
     "close": 2810
    },
    {
     "date": "2026-08-04",
     "close": 2775
    },
    {
     "date": "2026-08-05",
     "close": 2760
    },
    {
     "date": "2026-08-06",
     "close": 2755
    },
    {
     "date": "2026-08-07",
     "close": 2735
    },
    {
     "date": "2026-08-10",
     "close": 2750
    },
    {
     "date": "2026-08-11",
     "close": 2735.5
    },
    {
     "date": "2026-08-12",
     "close": 2740
    },
    {
     "date": "2026-08-13",
     "close": 2755.5
    },
    {
     "date": "2026-08-14",
     "close": 2696.3
    },
    {
     "date": "2026-08-17",
     "close": 2687.5
    },
    {
     "date": "2026-08-18",
     "close": 2628.4
    },
    {
     "date": "2026-08-19",
     "close": 2630.8
    },
    {
     "date": "2026-08-20",
     "close": 2625.2
    },
    {
     "date": "2026-08-21",
     "close": 2640
    },
    {
     "date": "2026-08-24",
     "close": 2640.8
    },
    {
     "date": "2026-08-25",
     "close": 2639.8
    },
    {
     "date": "2026-08-26",
     "close": 2626.5
    },
    {
     "date": "2026-08-27",
     "close": 2631
    },
    {
     "date": "2026-08-28",
     "close": 2608.7
    },
    {
     "date": "2026-08-31",
     "close": 2653.6
    },
    {
     "date": "2026-09-01",
     "close": 2575.5
    },
    {
     "date": "2026-09-02",
     "close": 2527.5
    },
    {
     "date": "2026-09-03",
     "close": 2541.6
    },
    {
     "date": "2026-09-04",
     "close": 2527.3
    },
    {
     "date": "2026-09-07",
     "close": 2500.9
    },
    {
     "date": "2026-09-08",
     "close": 2481.6
    },
    {
     "date": "2026-09-09",
     "close": 2489
    },
    {
     "date": "2026-09-10",
     "close": 2498.1
    },
    {
     "date": "2026-09-11",
     "close": 2472.5
    },
    {
     "date": "2026-09-15",
     "close": 2402.8
    },
    {
     "date": "2026-09-16",
     "close": 2416.6
    },
    {
     "date": "2026-09-17",
     "close": 2454
    },
    {
     "date": "2026-09-18",
     "close": 2451.3
    },
    {
     "date": "2026-09-21",
     "close": 2440.3
    },
    {
     "date": "2026-09-22",
     "close": 2448.5
    },
    {
     "date": "2026-09-23",
     "close": 2455
    },
    {
     "date": "2026-09-24",
     "close": 2392.7
    },
    {
     "date": "2026-09-25",
     "close": 2444
    },
    {
     "date": "2026-09-28",
     "close": 2420
    },
    {
     "date": "2026-09-29",
     "close": 2415
    },
    {
     "date": "2026-09-30",
     "close": 2402.6
    },
    {
     "date": "2026-10-01",
     "close": 2407
    },
    {
     "date": "2026-10-05",
     "close": 2366
    },
    {
     "date": "2026-10-06",
     "close": 2424.2
    },
    {
     "date": "2026-10-07",
     "close": 2372.1
    },
    {
     "date": "2026-10-08",
     "close": 2311.6
    },
    {
     "date": "2026-10-09",
     "close": 2339.1
    },
    {
     "date": "2026-10-12",
     "close": 2331
    },
    {
     "date": "2026-10-13",
     "close": 2376
    },
    {
     "date": "2026-10-14",
     "close": 2344.7
    },
    {
     "date": "2026-10-15",
     "close": 2350
    },
    {
     "date": "2026-10-16",
     "close": 2331.9
    },
    {
     "date": "2026-10-19",
     "close": 2330.7
    },
    {
     "date": "2026-10-21",
     "close": 2319.4
    }
   ],
   "sector": "Basic Materials",
   "industry": "Specialty Chemicals"
  },
  "AXISBANK": {
   "price": 1212,
   "prevClose": 1236,
   "change": -24,
   "changePct": -1.94,
   "dayHigh": 1216.1,
   "dayLow": 1200.3,
   "high52": 1418.3,
   "low52": 1150.3,
   "volume": 10014652,
   "longName": "Axis Bank Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1238.4
    },
    {
     "date": "2026-07-23",
     "close": 1223
    },
    {
     "date": "2026-07-24",
     "close": 1227.3
    },
    {
     "date": "2026-07-27",
     "close": 1227.5
    },
    {
     "date": "2026-07-28",
     "close": 1223.5
    },
    {
     "date": "2026-07-29",
     "close": 1235.4
    },
    {
     "date": "2026-07-30",
     "close": 1228.9
    },
    {
     "date": "2026-07-31",
     "close": 1229.5
    },
    {
     "date": "2026-08-03",
     "close": 1272
    },
    {
     "date": "2026-08-04",
     "close": 1261.8
    },
    {
     "date": "2026-08-05",
     "close": 1253.9
    },
    {
     "date": "2026-08-06",
     "close": 1256
    },
    {
     "date": "2026-08-07",
     "close": 1238
    },
    {
     "date": "2026-08-10",
     "close": 1247.3
    },
    {
     "date": "2026-08-11",
     "close": 1229.8
    },
    {
     "date": "2026-08-12",
     "close": 1230
    },
    {
     "date": "2026-08-13",
     "close": 1221.8
    },
    {
     "date": "2026-08-14",
     "close": 1217.4
    },
    {
     "date": "2026-08-17",
     "close": 1227.3
    },
    {
     "date": "2026-08-18",
     "close": 1243
    },
    {
     "date": "2026-08-19",
     "close": 1235
    },
    {
     "date": "2026-08-20",
     "close": 1251
    },
    {
     "date": "2026-08-21",
     "close": 1245.8
    },
    {
     "date": "2026-08-24",
     "close": 1236
    },
    {
     "date": "2026-08-25",
     "close": 1235
    },
    {
     "date": "2026-08-26",
     "close": 1255
    },
    {
     "date": "2026-08-27",
     "close": 1256
    },
    {
     "date": "2026-08-28",
     "close": 1265
    },
    {
     "date": "2026-08-31",
     "close": 1300
    },
    {
     "date": "2026-09-01",
     "close": 1258
    },
    {
     "date": "2026-09-02",
     "close": 1253.9
    },
    {
     "date": "2026-09-03",
     "close": 1267
    },
    {
     "date": "2026-09-04",
     "close": 1273
    },
    {
     "date": "2026-09-07",
     "close": 1266
    },
    {
     "date": "2026-09-08",
     "close": 1244.9
    },
    {
     "date": "2026-09-09",
     "close": 1238.5
    },
    {
     "date": "2026-09-10",
     "close": 1246
    },
    {
     "date": "2026-09-11",
     "close": 1246
    },
    {
     "date": "2026-09-15",
     "close": 1222.9
    },
    {
     "date": "2026-09-16",
     "close": 1241
    },
    {
     "date": "2026-09-17",
     "close": 1240
    },
    {
     "date": "2026-09-18",
     "close": 1257
    },
    {
     "date": "2026-09-21",
     "close": 1250
    },
    {
     "date": "2026-09-22",
     "close": 1242.7
    },
    {
     "date": "2026-09-23",
     "close": 1243.2
    },
    {
     "date": "2026-09-24",
     "close": 1186.5
    },
    {
     "date": "2026-09-25",
     "close": 1222.4
    },
    {
     "date": "2026-09-28",
     "close": 1209.9
    },
    {
     "date": "2026-09-29",
     "close": 1212.1
    },
    {
     "date": "2026-09-30",
     "close": 1226
    },
    {
     "date": "2026-10-01",
     "close": 1217.1
    },
    {
     "date": "2026-10-05",
     "close": 1222.2
    },
    {
     "date": "2026-10-06",
     "close": 1248
    },
    {
     "date": "2026-10-07",
     "close": 1242.5
    },
    {
     "date": "2026-10-08",
     "close": 1245
    },
    {
     "date": "2026-10-09",
     "close": 1259.1
    },
    {
     "date": "2026-10-12",
     "close": 1253
    },
    {
     "date": "2026-10-13",
     "close": 1268.4
    },
    {
     "date": "2026-10-14",
     "close": 1264.6
    },
    {
     "date": "2026-10-15",
     "close": 1288
    },
    {
     "date": "2026-10-16",
     "close": 1290
    },
    {
     "date": "2026-10-19",
     "close": 1236
    },
    {
     "date": "2026-10-21",
     "close": 1210
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  },
  "BAJAJ-AUTO": {
   "price": 10155,
   "prevClose": 10287,
   "change": -132,
   "changePct": -1.28,
   "dayHigh": 10271,
   "dayLow": 9906,
   "high52": 12470,
   "low52": 8605,
   "volume": 229879,
   "longName": "Bajaj Auto Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 10998.5
    },
    {
     "date": "2026-07-23",
     "close": 11283.5
    },
    {
     "date": "2026-07-24",
     "close": 11130
    },
    {
     "date": "2026-07-27",
     "close": 11183.5
    },
    {
     "date": "2026-07-28",
     "close": 11374
    },
    {
     "date": "2026-07-29",
     "close": 11338
    },
    {
     "date": "2026-07-30",
     "close": 11432
    },
    {
     "date": "2026-07-31",
     "close": 11520.5
    },
    {
     "date": "2026-08-03",
     "close": 11856
    },
    {
     "date": "2026-08-04",
     "close": 11600
    },
    {
     "date": "2026-08-05",
     "close": 11800
    },
    {
     "date": "2026-08-06",
     "close": 11620
    },
    {
     "date": "2026-08-07",
     "close": 11662
    },
    {
     "date": "2026-08-10",
     "close": 11677
    },
    {
     "date": "2026-08-11",
     "close": 11717
    },
    {
     "date": "2026-08-12",
     "close": 11700
    },
    {
     "date": "2026-08-13",
     "close": 11661
    },
    {
     "date": "2026-08-14",
     "close": 11700
    },
    {
     "date": "2026-08-17",
     "close": 11663
    },
    {
     "date": "2026-08-18",
     "close": 11607
    },
    {
     "date": "2026-08-19",
     "close": 11645
    },
    {
     "date": "2026-08-20",
     "close": 11793
    },
    {
     "date": "2026-08-21",
     "close": 11700
    },
    {
     "date": "2026-08-24",
     "close": 11800
    },
    {
     "date": "2026-08-25",
     "close": 11927
    },
    {
     "date": "2026-08-26",
     "close": 11724
    },
    {
     "date": "2026-08-27",
     "close": 11720
    },
    {
     "date": "2026-08-28",
     "close": 11910
    },
    {
     "date": "2026-08-31",
     "close": 12130
    },
    {
     "date": "2026-09-01",
     "close": 12361
    },
    {
     "date": "2026-09-02",
     "close": 12130
    },
    {
     "date": "2026-09-03",
     "close": 11920
    },
    {
     "date": "2026-09-04",
     "close": 11919
    },
    {
     "date": "2026-09-07",
     "close": 11800
    },
    {
     "date": "2026-09-08",
     "close": 11880
    },
    {
     "date": "2026-09-09",
     "close": 11790
    },
    {
     "date": "2026-09-10",
     "close": 11768
    },
    {
     "date": "2026-09-11",
     "close": 11678
    },
    {
     "date": "2026-09-15",
     "close": 11424
    },
    {
     "date": "2026-09-16",
     "close": 11593
    },
    {
     "date": "2026-09-17",
     "close": 11500
    },
    {
     "date": "2026-09-18",
     "close": 11414
    },
    {
     "date": "2026-09-21",
     "close": 11460
    },
    {
     "date": "2026-09-22",
     "close": 11363
    },
    {
     "date": "2026-09-23",
     "close": 11400
    },
    {
     "date": "2026-09-24",
     "close": 11208
    },
    {
     "date": "2026-09-25",
     "close": 11281
    },
    {
     "date": "2026-09-28",
     "close": 11024
    },
    {
     "date": "2026-09-29",
     "close": 10811
    },
    {
     "date": "2026-09-30",
     "close": 10874
    },
    {
     "date": "2026-10-01",
     "close": 10045
    },
    {
     "date": "2026-10-05",
     "close": 10024
    },
    {
     "date": "2026-10-06",
     "close": 10017
    },
    {
     "date": "2026-10-07",
     "close": 9884
    },
    {
     "date": "2026-10-08",
     "close": 9637
    },
    {
     "date": "2026-10-09",
     "close": 9778
    },
    {
     "date": "2026-10-12",
     "close": 10034
    },
    {
     "date": "2026-10-13",
     "close": 10318
    },
    {
     "date": "2026-10-14",
     "close": 10250
    },
    {
     "date": "2026-10-15",
     "close": 10385
    },
    {
     "date": "2026-10-16",
     "close": 10405
    },
    {
     "date": "2026-10-19",
     "close": 10287
    },
    {
     "date": "2026-10-21",
     "close": 10072
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Auto Manufacturers"
  },
  "BAJAJFINSV": {
   "price": 1678,
   "prevClose": 1700,
   "change": -22,
   "changePct": -1.29,
   "dayHigh": 1692.9,
   "dayLow": 1651.9,
   "high52": 2195,
   "low52": 1597,
   "volume": 1255539,
   "longName": "Bajaj Finserv Ltd.",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1876.4
    },
    {
     "date": "2026-07-23",
     "close": 1889.4
    },
    {
     "date": "2026-07-24",
     "close": 1876.7
    },
    {
     "date": "2026-07-27",
     "close": 1913
    },
    {
     "date": "2026-07-28",
     "close": 1927.9
    },
    {
     "date": "2026-07-29",
     "close": 1924.4
    },
    {
     "date": "2026-07-30",
     "close": 1909.4
    },
    {
     "date": "2026-07-31",
     "close": 2029.1
    },
    {
     "date": "2026-08-03",
     "close": 2096
    },
    {
     "date": "2026-08-04",
     "close": 2105
    },
    {
     "date": "2026-08-05",
     "close": 2086
    },
    {
     "date": "2026-08-06",
     "close": 2086
    },
    {
     "date": "2026-08-07",
     "close": 2008.9
    },
    {
     "date": "2026-08-10",
     "close": 2021.3
    },
    {
     "date": "2026-08-11",
     "close": 2032
    },
    {
     "date": "2026-08-12",
     "close": 2020.5
    },
    {
     "date": "2026-08-13",
     "close": 2025
    },
    {
     "date": "2026-08-14",
     "close": 2008.3
    },
    {
     "date": "2026-08-17",
     "close": 2005
    },
    {
     "date": "2026-08-18",
     "close": 2011.2
    },
    {
     "date": "2026-08-19",
     "close": 2012
    },
    {
     "date": "2026-08-20",
     "close": 2016
    },
    {
     "date": "2026-08-21",
     "close": 2032.5
    },
    {
     "date": "2026-08-24",
     "close": 2001.7
    },
    {
     "date": "2026-08-25",
     "close": 2004
    },
    {
     "date": "2026-08-26",
     "close": 2010
    },
    {
     "date": "2026-08-27",
     "close": 2011
    },
    {
     "date": "2026-08-28",
     "close": 2002
    },
    {
     "date": "2026-08-31",
     "close": 2021
    },
    {
     "date": "2026-09-01",
     "close": 1972
    },
    {
     "date": "2026-09-02",
     "close": 1990
    },
    {
     "date": "2026-09-03",
     "close": 1992.1
    },
    {
     "date": "2026-09-04",
     "close": 1970
    },
    {
     "date": "2026-09-07",
     "close": 1938.6
    },
    {
     "date": "2026-09-08",
     "close": 1938.1
    },
    {
     "date": "2026-09-09",
     "close": 1927
    },
    {
     "date": "2026-09-10",
     "close": 1940.5
    },
    {
     "date": "2026-09-11",
     "close": 1913.5
    },
    {
     "date": "2026-09-15",
     "close": 1855.5
    },
    {
     "date": "2026-09-16",
     "close": 1837
    },
    {
     "date": "2026-09-17",
     "close": 1859.2
    },
    {
     "date": "2026-09-18",
     "close": 1852.5
    },
    {
     "date": "2026-09-21",
     "close": 1849.8
    },
    {
     "date": "2026-09-22",
     "close": 1823.4
    },
    {
     "date": "2026-09-23",
     "close": 1846.5
    },
    {
     "date": "2026-09-24",
     "close": 1762.3
    },
    {
     "date": "2026-09-25",
     "close": 1771
    },
    {
     "date": "2026-09-28",
     "close": 1752
    },
    {
     "date": "2026-09-29",
     "close": 1742.4
    },
    {
     "date": "2026-09-30",
     "close": 1731
    },
    {
     "date": "2026-10-01",
     "close": 1732.6
    },
    {
     "date": "2026-10-05",
     "close": 1751.4
    },
    {
     "date": "2026-10-06",
     "close": 1752.4
    },
    {
     "date": "2026-10-07",
     "close": 1743.3
    },
    {
     "date": "2026-10-08",
     "close": 1708
    },
    {
     "date": "2026-10-09",
     "close": 1734.7
    },
    {
     "date": "2026-10-12",
     "close": 1719.9
    },
    {
     "date": "2026-10-13",
     "close": 1755.7
    },
    {
     "date": "2026-10-14",
     "close": 1721.7
    },
    {
     "date": "2026-10-15",
     "close": 1732
    },
    {
     "date": "2026-10-16",
     "close": 1729
    },
    {
     "date": "2026-10-19",
     "close": 1700
    },
    {
     "date": "2026-10-21",
     "close": 1690
    }
   ],
   "sector": "Financial Services",
   "industry": "Financial Conglomerates"
  },
  "BAJFINANCE": {
   "price": 942.1,
   "prevClose": 957.35,
   "change": -15.25,
   "changePct": -1.59,
   "dayHigh": 942.1,
   "dayLow": 907.4,
   "high52": 1176.4,
   "low52": 787.9,
   "volume": 10621157,
   "longName": "Bajaj Finance Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1060.3
    },
    {
     "date": "2026-07-23",
     "close": 1039.8
    },
    {
     "date": "2026-07-24",
     "close": 1012.8
    },
    {
     "date": "2026-07-27",
     "close": 1048.3
    },
    {
     "date": "2026-07-28",
     "close": 1048.4
    },
    {
     "date": "2026-07-29",
     "close": 1054.4
    },
    {
     "date": "2026-07-30",
     "close": 1053.5
    },
    {
     "date": "2026-07-31",
     "close": 1141.2
    },
    {
     "date": "2026-08-03",
     "close": 1153
    },
    {
     "date": "2026-08-04",
     "close": 1149
    },
    {
     "date": "2026-08-05",
     "close": 1158.8
    },
    {
     "date": "2026-08-06",
     "close": 1144.8
    },
    {
     "date": "2026-08-07",
     "close": 1078
    },
    {
     "date": "2026-08-10",
     "close": 1102.2
    },
    {
     "date": "2026-08-11",
     "close": 1093.3
    },
    {
     "date": "2026-08-12",
     "close": 1094.2
    },
    {
     "date": "2026-08-13",
     "close": 1090.8
    },
    {
     "date": "2026-08-14",
     "close": 1087
    },
    {
     "date": "2026-08-17",
     "close": 1089.3
    },
    {
     "date": "2026-08-18",
     "close": 1094.3
    },
    {
     "date": "2026-08-19",
     "close": 1080.2
    },
    {
     "date": "2026-08-20",
     "close": 1095
    },
    {
     "date": "2026-08-21",
     "close": 1095
    },
    {
     "date": "2026-08-24",
     "close": 1077
    },
    {
     "date": "2026-08-25",
     "close": 1087.4
    },
    {
     "date": "2026-08-26",
     "close": 1085
    },
    {
     "date": "2026-08-27",
     "close": 1083
    },
    {
     "date": "2026-08-28",
     "close": 1079.9
    },
    {
     "date": "2026-08-31",
     "close": 1057
    },
    {
     "date": "2026-09-01",
     "close": 1053.9
    },
    {
     "date": "2026-09-02",
     "close": 1055.9
    },
    {
     "date": "2026-09-03",
     "close": 1049
    },
    {
     "date": "2026-09-04",
     "close": 1060.5
    },
    {
     "date": "2026-09-07",
     "close": 1060
    },
    {
     "date": "2026-09-08",
     "close": 1054.1
    },
    {
     "date": "2026-09-09",
     "close": 1039.3
    },
    {
     "date": "2026-09-10",
     "close": 1043.5
    },
    {
     "date": "2026-09-11",
     "close": 1034.5
    },
    {
     "date": "2026-09-15",
     "close": 1009.2
    },
    {
     "date": "2026-09-16",
     "close": 1006.2
    },
    {
     "date": "2026-09-17",
     "close": 1015
    },
    {
     "date": "2026-09-18",
     "close": 1040.3
    },
    {
     "date": "2026-09-21",
     "close": 1021.3
    },
    {
     "date": "2026-09-22",
     "close": 1008.8
    },
    {
     "date": "2026-09-23",
     "close": 1043.2
    },
    {
     "date": "2026-09-24",
     "close": 982
    },
    {
     "date": "2026-09-25",
     "close": 996.9
    },
    {
     "date": "2026-09-28",
     "close": 985
    },
    {
     "date": "2026-09-29",
     "close": 973.8
    },
    {
     "date": "2026-09-30",
     "close": 959.4
    },
    {
     "date": "2026-10-01",
     "close": 948.3
    },
    {
     "date": "2026-10-05",
     "close": 970
    },
    {
     "date": "2026-10-06",
     "close": 963.1
    },
    {
     "date": "2026-10-07",
     "close": 963.85
    },
    {
     "date": "2026-10-08",
     "close": 955.95
    },
    {
     "date": "2026-10-09",
     "close": 960
    },
    {
     "date": "2026-10-12",
     "close": 957.25
    },
    {
     "date": "2026-10-13",
     "close": 982.75
    },
    {
     "date": "2026-10-14",
     "close": 957
    },
    {
     "date": "2026-10-15",
     "close": 965.25
    },
    {
     "date": "2026-10-16",
     "close": 982.1
    },
    {
     "date": "2026-10-19",
     "close": 957.35
    },
    {
     "date": "2026-10-21",
     "close": 926
    }
   ],
   "sector": "Financial Services",
   "industry": "Credit Services"
  },
  "BEL": {
   "price": 364.5,
   "prevClose": 377.2,
   "change": -12.7,
   "changePct": -3.37,
   "dayHigh": 369.55,
   "dayLow": 361.7,
   "high52": 473.45,
   "low52": 360.5,
   "volume": 8169838,
   "longName": "Bharat Electronics Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 406.75
    },
    {
     "date": "2026-07-23",
     "close": 405.35
    },
    {
     "date": "2026-07-24",
     "close": 405
    },
    {
     "date": "2026-07-27",
     "close": 407.15
    },
    {
     "date": "2026-07-28",
     "close": 389
    },
    {
     "date": "2026-07-29",
     "close": 387.55
    },
    {
     "date": "2026-07-30",
     "close": 384.9
    },
    {
     "date": "2026-07-31",
     "close": 387.85
    },
    {
     "date": "2026-08-03",
     "close": 392.15
    },
    {
     "date": "2026-08-04",
     "close": 391.5
    },
    {
     "date": "2026-08-05",
     "close": 390
    },
    {
     "date": "2026-08-06",
     "close": 399.2
    },
    {
     "date": "2026-08-07",
     "close": 401
    },
    {
     "date": "2026-08-10",
     "close": 404.35
    },
    {
     "date": "2026-08-11",
     "close": 405.85
    },
    {
     "date": "2026-08-12",
     "close": 405.7
    },
    {
     "date": "2026-08-13",
     "close": 410.5
    },
    {
     "date": "2026-08-14",
     "close": 410.8
    },
    {
     "date": "2026-08-17",
     "close": 412.45
    },
    {
     "date": "2026-08-18",
     "close": 412
    },
    {
     "date": "2026-08-19",
     "close": 409.2
    },
    {
     "date": "2026-08-20",
     "close": 409.4
    },
    {
     "date": "2026-08-21",
     "close": 414
    },
    {
     "date": "2026-08-24",
     "close": 409
    },
    {
     "date": "2026-08-25",
     "close": 413.25
    },
    {
     "date": "2026-08-26",
     "close": 406.9
    },
    {
     "date": "2026-08-27",
     "close": 411
    },
    {
     "date": "2026-08-28",
     "close": 411.9
    },
    {
     "date": "2026-08-31",
     "close": 414.45
    },
    {
     "date": "2026-09-01",
     "close": 411.2
    },
    {
     "date": "2026-09-02",
     "close": 405.75
    },
    {
     "date": "2026-09-03",
     "close": 408.6
    },
    {
     "date": "2026-09-04",
     "close": 405.35
    },
    {
     "date": "2026-09-07",
     "close": 404
    },
    {
     "date": "2026-09-08",
     "close": 410.55
    },
    {
     "date": "2026-09-09",
     "close": 406
    },
    {
     "date": "2026-09-10",
     "close": 405
    },
    {
     "date": "2026-09-11",
     "close": 404.35
    },
    {
     "date": "2026-09-15",
     "close": 382.9
    },
    {
     "date": "2026-09-16",
     "close": 385.75
    },
    {
     "date": "2026-09-17",
     "close": 395.45
    },
    {
     "date": "2026-09-18",
     "close": 393.3
    },
    {
     "date": "2026-09-21",
     "close": 398.5
    },
    {
     "date": "2026-09-22",
     "close": 397.9
    },
    {
     "date": "2026-09-23",
     "close": 396.05
    },
    {
     "date": "2026-09-24",
     "close": 392
    },
    {
     "date": "2026-09-25",
     "close": 393.55
    },
    {
     "date": "2026-09-28",
     "close": 385.5
    },
    {
     "date": "2026-09-29",
     "close": 387.75
    },
    {
     "date": "2026-09-30",
     "close": 388.3
    },
    {
     "date": "2026-10-01",
     "close": 383.1
    },
    {
     "date": "2026-10-05",
     "close": 384.85
    },
    {
     "date": "2026-10-06",
     "close": 387.4
    },
    {
     "date": "2026-10-07",
     "close": 378.3
    },
    {
     "date": "2026-10-08",
     "close": 367.3
    },
    {
     "date": "2026-10-09",
     "close": 368.15
    },
    {
     "date": "2026-10-12",
     "close": 373.9
    },
    {
     "date": "2026-10-13",
     "close": 380
    },
    {
     "date": "2026-10-14",
     "close": 382.35
    },
    {
     "date": "2026-10-15",
     "close": 380.4
    },
    {
     "date": "2026-10-16",
     "close": 376.85
    },
    {
     "date": "2026-10-19",
     "close": 377.2
    },
    {
     "date": "2026-10-21",
     "close": 371.2
    }
   ],
   "sector": "Industrials",
   "industry": "Aerospace & Defense"
  },
  "BHARTIARTL": {
   "price": 1895,
   "prevClose": 1875.2,
   "change": 19.8,
   "changePct": 1.06,
   "dayHigh": 1920.3,
   "dayLow": 1874.1,
   "high52": 2174.5,
   "low52": 1726.3,
   "volume": 12595786,
   "longName": "Bharti Airtel Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1949
    },
    {
     "date": "2026-07-23",
     "close": 1931
    },
    {
     "date": "2026-07-24",
     "close": 1898.2
    },
    {
     "date": "2026-07-27",
     "close": 1905.3
    },
    {
     "date": "2026-07-28",
     "close": 1901.8
    },
    {
     "date": "2026-07-29",
     "close": 1950.2
    },
    {
     "date": "2026-07-30",
     "close": 1956.8
    },
    {
     "date": "2026-07-31",
     "close": 1972
    },
    {
     "date": "2026-08-03",
     "close": 1970.5
    },
    {
     "date": "2026-08-04",
     "close": 1970.1
    },
    {
     "date": "2026-08-05",
     "close": 1978
    },
    {
     "date": "2026-08-06",
     "close": 1948
    },
    {
     "date": "2026-08-07",
     "close": 1959.9
    },
    {
     "date": "2026-08-10",
     "close": 1943
    },
    {
     "date": "2026-08-11",
     "close": 1915.2
    },
    {
     "date": "2026-08-12",
     "close": 1945
    },
    {
     "date": "2026-08-13",
     "close": 1939.1
    },
    {
     "date": "2026-08-14",
     "close": 1992.1
    },
    {
     "date": "2026-08-17",
     "close": 1969.3
    },
    {
     "date": "2026-08-18",
     "close": 1934.2
    },
    {
     "date": "2026-08-19",
     "close": 1922
    },
    {
     "date": "2026-08-20",
     "close": 1941.7
    },
    {
     "date": "2026-08-21",
     "close": 1946
    },
    {
     "date": "2026-08-24",
     "close": 1935
    },
    {
     "date": "2026-08-25",
     "close": 1947
    },
    {
     "date": "2026-08-26",
     "close": 1902.1
    },
    {
     "date": "2026-08-27",
     "close": 1878.3
    },
    {
     "date": "2026-08-28",
     "close": 1882.4
    },
    {
     "date": "2026-08-31",
     "close": 1811.9
    },
    {
     "date": "2026-09-01",
     "close": 1877.2
    },
    {
     "date": "2026-09-02",
     "close": 1862.8
    },
    {
     "date": "2026-09-03",
     "close": 1869
    },
    {
     "date": "2026-09-04",
     "close": 1840
    },
    {
     "date": "2026-09-07",
     "close": 1854
    },
    {
     "date": "2026-09-08",
     "close": 1844
    },
    {
     "date": "2026-09-09",
     "close": 1814.7
    },
    {
     "date": "2026-09-10",
     "close": 1839
    },
    {
     "date": "2026-09-11",
     "close": 1831.1
    },
    {
     "date": "2026-09-15",
     "close": 1830.4
    },
    {
     "date": "2026-09-16",
     "close": 1835
    },
    {
     "date": "2026-09-17",
     "close": 1836
    },
    {
     "date": "2026-09-18",
     "close": 1893.3
    },
    {
     "date": "2026-09-21",
     "close": 1830.2
    },
    {
     "date": "2026-09-22",
     "close": 1817.2
    },
    {
     "date": "2026-09-23",
     "close": 1833.2
    },
    {
     "date": "2026-09-24",
     "close": 1795.8
    },
    {
     "date": "2026-09-25",
     "close": 1785.4
    },
    {
     "date": "2026-09-28",
     "close": 1771.4
    },
    {
     "date": "2026-09-29",
     "close": 1771.2
    },
    {
     "date": "2026-09-30",
     "close": 1757
    },
    {
     "date": "2026-10-01",
     "close": 1741.1
    },
    {
     "date": "2026-10-05",
     "close": 1779.9
    },
    {
     "date": "2026-10-06",
     "close": 1810.5
    },
    {
     "date": "2026-10-07",
     "close": 1833.9
    },
    {
     "date": "2026-10-08",
     "close": 1804.6
    },
    {
     "date": "2026-10-09",
     "close": 1805.1
    },
    {
     "date": "2026-10-12",
     "close": 1778.7
    },
    {
     "date": "2026-10-13",
     "close": 1806.5
    },
    {
     "date": "2026-10-14",
     "close": 1794.6
    },
    {
     "date": "2026-10-15",
     "close": 1854
    },
    {
     "date": "2026-10-16",
     "close": 1905
    },
    {
     "date": "2026-10-19",
     "close": 1875.2
    },
    {
     "date": "2026-10-21",
     "close": 1891.7
    }
   ],
   "sector": "Communication Services",
   "industry": "Telecom Services"
  },
  "COALINDIA": {
   "price": 402.55,
   "prevClose": 411.7,
   "change": -9.15,
   "changePct": -2.22,
   "dayHigh": 404.7,
   "dayLow": 395.65,
   "high52": 491.25,
   "low52": 369.6,
   "volume": 6753782,
   "longName": "Coal India Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 428.4
    },
    {
     "date": "2026-07-23",
     "close": 427.05
    },
    {
     "date": "2026-07-24",
     "close": 427.4
    },
    {
     "date": "2026-07-27",
     "close": 427.5
    },
    {
     "date": "2026-07-28",
     "close": 410.15
    },
    {
     "date": "2026-07-29",
     "close": 410.05
    },
    {
     "date": "2026-07-30",
     "close": 417.2
    },
    {
     "date": "2026-07-31",
     "close": 414.15
    },
    {
     "date": "2026-08-03",
     "close": 416
    },
    {
     "date": "2026-08-04",
     "close": 417.6
    },
    {
     "date": "2026-08-05",
     "close": 415.5
    },
    {
     "date": "2026-08-06",
     "close": 415.6
    },
    {
     "date": "2026-08-07",
     "close": 415.25
    },
    {
     "date": "2026-08-10",
     "close": 411
    },
    {
     "date": "2026-08-11",
     "close": 412.6
    },
    {
     "date": "2026-08-12",
     "close": 409.3
    },
    {
     "date": "2026-08-13",
     "close": 410.5
    },
    {
     "date": "2026-08-14",
     "close": 407.1
    },
    {
     "date": "2026-08-17",
     "close": 408.45
    },
    {
     "date": "2026-08-18",
     "close": 406.9
    },
    {
     "date": "2026-08-19",
     "close": 400
    },
    {
     "date": "2026-08-20",
     "close": 402.5
    },
    {
     "date": "2026-08-21",
     "close": 405.2
    },
    {
     "date": "2026-08-24",
     "close": 406.9
    },
    {
     "date": "2026-08-25",
     "close": 404
    },
    {
     "date": "2026-08-26",
     "close": 403.5
    },
    {
     "date": "2026-08-27",
     "close": 400
    },
    {
     "date": "2026-08-28",
     "close": 401
    },
    {
     "date": "2026-08-31",
     "close": 401.75
    },
    {
     "date": "2026-09-01",
     "close": 401.6
    },
    {
     "date": "2026-09-02",
     "close": 417.85
    },
    {
     "date": "2026-09-03",
     "close": 420.05
    },
    {
     "date": "2026-09-04",
     "close": 415.35
    },
    {
     "date": "2026-09-07",
     "close": 418.85
    },
    {
     "date": "2026-09-08",
     "close": 420.25
    },
    {
     "date": "2026-09-09",
     "close": 431
    },
    {
     "date": "2026-09-10",
     "close": 432
    },
    {
     "date": "2026-09-11",
     "close": 426.4
    },
    {
     "date": "2026-09-15",
     "close": 419.25
    },
    {
     "date": "2026-09-16",
     "close": 422.25
    },
    {
     "date": "2026-09-17",
     "close": 418
    },
    {
     "date": "2026-09-18",
     "close": 409.9
    },
    {
     "date": "2026-09-21",
     "close": 414.7
    },
    {
     "date": "2026-09-22",
     "close": 428
    },
    {
     "date": "2026-09-23",
     "close": 424.55
    },
    {
     "date": "2026-09-24",
     "close": 422
    },
    {
     "date": "2026-09-25",
     "close": 426.1
    },
    {
     "date": "2026-09-28",
     "close": 422.5
    },
    {
     "date": "2026-09-29",
     "close": 425
    },
    {
     "date": "2026-09-30",
     "close": 425
    },
    {
     "date": "2026-10-01",
     "close": 420.4
    },
    {
     "date": "2026-10-05",
     "close": 425.1
    },
    {
     "date": "2026-10-06",
     "close": 411.65
    },
    {
     "date": "2026-10-07",
     "close": 414.5
    },
    {
     "date": "2026-10-08",
     "close": 409.35
    },
    {
     "date": "2026-10-09",
     "close": 411.55
    },
    {
     "date": "2026-10-12",
     "close": 404.8
    },
    {
     "date": "2026-10-13",
     "close": 408.5
    },
    {
     "date": "2026-10-14",
     "close": 417
    },
    {
     "date": "2026-10-15",
     "close": 418
    },
    {
     "date": "2026-10-16",
     "close": 417.2
    },
    {
     "date": "2026-10-19",
     "close": 411.7
    },
    {
     "date": "2026-10-21",
     "close": 407.5
    }
   ],
   "sector": "Energy",
   "industry": "Thermal Coal"
  },
  "DIVISLAB": {
   "price": 9162,
   "prevClose": 9087,
   "change": 75,
   "changePct": 0.83,
   "dayHigh": 9190,
   "dayLow": 9006.5,
   "high52": 9740,
   "low52": 5647.5,
   "volume": 1040584,
   "longName": "Divi's Laboratories Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 7386.5
    },
    {
     "date": "2026-07-23",
     "close": 7305
    },
    {
     "date": "2026-07-24",
     "close": 7248.5
    },
    {
     "date": "2026-07-27",
     "close": 7414
    },
    {
     "date": "2026-07-28",
     "close": 7425
    },
    {
     "date": "2026-07-29",
     "close": 7784.5
    },
    {
     "date": "2026-07-30",
     "close": 7835
    },
    {
     "date": "2026-07-31",
     "close": 8056
    },
    {
     "date": "2026-08-03",
     "close": 8585
    },
    {
     "date": "2026-08-04",
     "close": 8378
    },
    {
     "date": "2026-08-05",
     "close": 8388
    },
    {
     "date": "2026-08-06",
     "close": 8349
    },
    {
     "date": "2026-08-07",
     "close": 8275
    },
    {
     "date": "2026-08-10",
     "close": 8300
    },
    {
     "date": "2026-08-11",
     "close": 8578.5
    },
    {
     "date": "2026-08-12",
     "close": 8600
    },
    {
     "date": "2026-08-13",
     "close": 8500
    },
    {
     "date": "2026-08-14",
     "close": 8477
    },
    {
     "date": "2026-08-17",
     "close": 8481.5
    },
    {
     "date": "2026-08-18",
     "close": 8588
    },
    {
     "date": "2026-08-19",
     "close": 8560
    },
    {
     "date": "2026-08-20",
     "close": 8570
    },
    {
     "date": "2026-08-21",
     "close": 8597
    },
    {
     "date": "2026-08-24",
     "close": 8496
    },
    {
     "date": "2026-08-25",
     "close": 8744.5
    },
    {
     "date": "2026-08-26",
     "close": 9025
    },
    {
     "date": "2026-08-27",
     "close": 9060
    },
    {
     "date": "2026-08-28",
     "close": 9239
    },
    {
     "date": "2026-08-31",
     "close": 9467
    },
    {
     "date": "2026-09-01",
     "close": 9165
    },
    {
     "date": "2026-09-02",
     "close": 9220
    },
    {
     "date": "2026-09-03",
     "close": 9250
    },
    {
     "date": "2026-09-04",
     "close": 9100
    },
    {
     "date": "2026-09-07",
     "close": 9315
    },
    {
     "date": "2026-09-08",
     "close": 9575
    },
    {
     "date": "2026-09-09",
     "close": 9488
    },
    {
     "date": "2026-09-10",
     "close": 9438.5
    },
    {
     "date": "2026-09-11",
     "close": 9322
    },
    {
     "date": "2026-09-15",
     "close": 9198
    },
    {
     "date": "2026-09-16",
     "close": 9158
    },
    {
     "date": "2026-09-17",
     "close": 9323
    },
    {
     "date": "2026-09-18",
     "close": 9375
    },
    {
     "date": "2026-09-21",
     "close": 9410.5
    },
    {
     "date": "2026-09-22",
     "close": 9352
    },
    {
     "date": "2026-09-23",
     "close": 9624
    },
    {
     "date": "2026-09-24",
     "close": 9602
    },
    {
     "date": "2026-09-25",
     "close": 9619.5
    },
    {
     "date": "2026-09-28",
     "close": 9550
    },
    {
     "date": "2026-09-29",
     "close": 9431
    },
    {
     "date": "2026-09-30",
     "close": 9291.5
    },
    {
     "date": "2026-10-01",
     "close": 9249
    },
    {
     "date": "2026-10-05",
     "close": 9196
    },
    {
     "date": "2026-10-06",
     "close": 9550
    },
    {
     "date": "2026-10-07",
     "close": 9588
    },
    {
     "date": "2026-10-08",
     "close": 9361
    },
    {
     "date": "2026-10-09",
     "close": 9340
    },
    {
     "date": "2026-10-12",
     "close": 9426
    },
    {
     "date": "2026-10-13",
     "close": 9285
    },
    {
     "date": "2026-10-14",
     "close": 9023
    },
    {
     "date": "2026-10-15",
     "close": 9030
    },
    {
     "date": "2026-10-16",
     "close": 9144.5
    },
    {
     "date": "2026-10-19",
     "close": 9087
    },
    {
     "date": "2026-10-21",
     "close": 9190
    }
   ],
   "sector": "Healthcare",
   "industry": "Drug Manufacturers—Specialty & Generic"
  },
  "DMART": {
   "price": 3166,
   "prevClose": 3304,
   "change": -138,
   "changePct": -4.18,
   "dayHigh": 3231.2,
   "dayLow": 3149.4,
   "high52": 4644,
   "low52": 3149.4,
   "volume": 1329050,
   "longName": "Avenue Supermarts Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 4000.5
    },
    {
     "date": "2026-07-23",
     "close": 4035
    },
    {
     "date": "2026-07-24",
     "close": 4018.8
    },
    {
     "date": "2026-07-27",
     "close": 4027.7
    },
    {
     "date": "2026-07-28",
     "close": 3846.6
    },
    {
     "date": "2026-07-29",
     "close": 3848.1
    },
    {
     "date": "2026-07-30",
     "close": 3874
    },
    {
     "date": "2026-07-31",
     "close": 3921
    },
    {
     "date": "2026-08-03",
     "close": 4015
    },
    {
     "date": "2026-08-04",
     "close": 4023
    },
    {
     "date": "2026-08-05",
     "close": 3946
    },
    {
     "date": "2026-08-06",
     "close": 3931.2
    },
    {
     "date": "2026-08-07",
     "close": 3900
    },
    {
     "date": "2026-08-10",
     "close": 4054
    },
    {
     "date": "2026-08-11",
     "close": 4054.9
    },
    {
     "date": "2026-08-12",
     "close": 4040
    },
    {
     "date": "2026-08-13",
     "close": 4070
    },
    {
     "date": "2026-08-14",
     "close": 4060
    },
    {
     "date": "2026-08-17",
     "close": 3995
    },
    {
     "date": "2026-08-18",
     "close": 3981
    },
    {
     "date": "2026-08-19",
     "close": 3965
    },
    {
     "date": "2026-08-20",
     "close": 3960
    },
    {
     "date": "2026-08-21",
     "close": 3906
    },
    {
     "date": "2026-08-24",
     "close": 3940
    },
    {
     "date": "2026-08-25",
     "close": 3909.6
    },
    {
     "date": "2026-08-26",
     "close": 3826.9
    },
    {
     "date": "2026-08-27",
     "close": 3847.4
    },
    {
     "date": "2026-08-28",
     "close": 3830.6
    },
    {
     "date": "2026-08-31",
     "close": 3900
    },
    {
     "date": "2026-09-01",
     "close": 3824
    },
    {
     "date": "2026-09-02",
     "close": 3813.4
    },
    {
     "date": "2026-09-03",
     "close": 3763
    },
    {
     "date": "2026-09-04",
     "close": 3770
    },
    {
     "date": "2026-09-07",
     "close": 3710
    },
    {
     "date": "2026-09-08",
     "close": 3720.2
    },
    {
     "date": "2026-09-09",
     "close": 3735
    },
    {
     "date": "2026-09-10",
     "close": 3690
    },
    {
     "date": "2026-09-11",
     "close": 3688
    },
    {
     "date": "2026-09-15",
     "close": 3680
    },
    {
     "date": "2026-09-16",
     "close": 3720
    },
    {
     "date": "2026-09-17",
     "close": 3711.2
    },
    {
     "date": "2026-09-18",
     "close": 3749.9
    },
    {
     "date": "2026-09-21",
     "close": 3800.4
    },
    {
     "date": "2026-09-22",
     "close": 3777
    },
    {
     "date": "2026-09-23",
     "close": 3834.8
    },
    {
     "date": "2026-09-24",
     "close": 3787.5
    },
    {
     "date": "2026-09-25",
     "close": 3834.2
    },
    {
     "date": "2026-09-28",
     "close": 3803.5
    },
    {
     "date": "2026-09-29",
     "close": 3750
    },
    {
     "date": "2026-09-30",
     "close": 3801.4
    },
    {
     "date": "2026-10-01",
     "close": 3813
    },
    {
     "date": "2026-10-05",
     "close": 3567
    },
    {
     "date": "2026-10-06",
     "close": 3581.9
    },
    {
     "date": "2026-10-07",
     "close": 3636
    },
    {
     "date": "2026-10-08",
     "close": 3585
    },
    {
     "date": "2026-10-09",
     "close": 3516.8
    },
    {
     "date": "2026-10-12",
     "close": 3364.9
    },
    {
     "date": "2026-10-13",
     "close": 3383
    },
    {
     "date": "2026-10-14",
     "close": 3415
    },
    {
     "date": "2026-10-15",
     "close": 3378.4
    },
    {
     "date": "2026-10-16",
     "close": 3342
    },
    {
     "date": "2026-10-19",
     "close": 3304
    },
    {
     "date": "2026-10-21",
     "close": 3250.9
    }
   ],
   "sector": "Consumer Defensive",
   "industry": "Discount Stores"
  },
  "EICHERMOT": {
   "price": 7084.5,
   "prevClose": 7349,
   "change": -264.5,
   "changePct": -3.6,
   "dayHigh": 7230,
   "dayLow": 7022,
   "high52": 8230,
   "low52": 6442,
   "volume": 406736,
   "longName": "Eicher Motors Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 7632
    },
    {
     "date": "2026-07-23",
     "close": 7721.5
    },
    {
     "date": "2026-07-24",
     "close": 7628
    },
    {
     "date": "2026-07-27",
     "close": 7769.5
    },
    {
     "date": "2026-07-28",
     "close": 7836
    },
    {
     "date": "2026-07-29",
     "close": 7779
    },
    {
     "date": "2026-07-30",
     "close": 7912.5
    },
    {
     "date": "2026-07-31",
     "close": 7833.5
    },
    {
     "date": "2026-08-03",
     "close": 8050
    },
    {
     "date": "2026-08-04",
     "close": 7935
    },
    {
     "date": "2026-08-05",
     "close": 7986.5
    },
    {
     "date": "2026-08-06",
     "close": 7967.5
    },
    {
     "date": "2026-08-07",
     "close": 8020
    },
    {
     "date": "2026-08-10",
     "close": 7975
    },
    {
     "date": "2026-08-11",
     "close": 8000
    },
    {
     "date": "2026-08-12",
     "close": 8049
    },
    {
     "date": "2026-08-13",
     "close": 8100
    },
    {
     "date": "2026-08-14",
     "close": 8066.5
    },
    {
     "date": "2026-08-17",
     "close": 8050
    },
    {
     "date": "2026-08-18",
     "close": 8018.5
    },
    {
     "date": "2026-08-19",
     "close": 7990.5
    },
    {
     "date": "2026-08-20",
     "close": 8042
    },
    {
     "date": "2026-08-21",
     "close": 8010
    },
    {
     "date": "2026-08-24",
     "close": 8047
    },
    {
     "date": "2026-08-25",
     "close": 8055
    },
    {
     "date": "2026-08-26",
     "close": 8035
    },
    {
     "date": "2026-08-27",
     "close": 8100
    },
    {
     "date": "2026-08-28",
     "close": 8059
    },
    {
     "date": "2026-08-31",
     "close": 7953.5
    },
    {
     "date": "2026-09-01",
     "close": 7970
    },
    {
     "date": "2026-09-02",
     "close": 7711.5
    },
    {
     "date": "2026-09-03",
     "close": 7690
    },
    {
     "date": "2026-09-04",
     "close": 7630.5
    },
    {
     "date": "2026-09-07",
     "close": 7672
    },
    {
     "date": "2026-09-08",
     "close": 7747.5
    },
    {
     "date": "2026-09-09",
     "close": 7734.5
    },
    {
     "date": "2026-09-10",
     "close": 7697
    },
    {
     "date": "2026-09-11",
     "close": 7530
    },
    {
     "date": "2026-09-15",
     "close": 7452.5
    },
    {
     "date": "2026-09-16",
     "close": 7500
    },
    {
     "date": "2026-09-17",
     "close": 7493.5
    },
    {
     "date": "2026-09-18",
     "close": 7516
    },
    {
     "date": "2026-09-21",
     "close": 7512.5
    },
    {
     "date": "2026-09-22",
     "close": 7427
    },
    {
     "date": "2026-09-23",
     "close": 7470
    },
    {
     "date": "2026-09-24",
     "close": 7338.5
    },
    {
     "date": "2026-09-25",
     "close": 7360
    },
    {
     "date": "2026-09-28",
     "close": 7213.5
    },
    {
     "date": "2026-09-29",
     "close": 7179
    },
    {
     "date": "2026-09-30",
     "close": 7150
    },
    {
     "date": "2026-10-01",
     "close": 6920
    },
    {
     "date": "2026-10-05",
     "close": 7021.5
    },
    {
     "date": "2026-10-06",
     "close": 7051
    },
    {
     "date": "2026-10-07",
     "close": 6960
    },
    {
     "date": "2026-10-08",
     "close": 6767.5
    },
    {
     "date": "2026-10-09",
     "close": 7050
    },
    {
     "date": "2026-10-12",
     "close": 7119
    },
    {
     "date": "2026-10-13",
     "close": 7163
    },
    {
     "date": "2026-10-14",
     "close": 7082.5
    },
    {
     "date": "2026-10-15",
     "close": 7225
    },
    {
     "date": "2026-10-16",
     "close": 7284.5
    },
    {
     "date": "2026-10-19",
     "close": 7349
    },
    {
     "date": "2026-10-21",
     "close": 7170.5
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Auto Manufacturers"
  },
  "ETERNAL": {
   "price": 304.45,
   "prevClose": 320.2,
   "change": -15.75,
   "changePct": -4.92,
   "dayHigh": 319,
   "dayLow": 303.6,
   "high52": 344.4,
   "low52": 212.6,
   "volume": 85453094,
   "longName": "Eternal Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 284.4
    },
    {
     "date": "2026-07-23",
     "close": 287.1
    },
    {
     "date": "2026-07-24",
     "close": 280
    },
    {
     "date": "2026-07-27",
     "close": 295.85
    },
    {
     "date": "2026-07-28",
     "close": 308.35
    },
    {
     "date": "2026-07-29",
     "close": 311.8
    },
    {
     "date": "2026-07-30",
     "close": 310.65
    },
    {
     "date": "2026-07-31",
     "close": 302.45
    },
    {
     "date": "2026-08-03",
     "close": 310.5
    },
    {
     "date": "2026-08-04",
     "close": 312.4
    },
    {
     "date": "2026-08-05",
     "close": 310.35
    },
    {
     "date": "2026-08-06",
     "close": 316.25
    },
    {
     "date": "2026-08-07",
     "close": 315
    },
    {
     "date": "2026-08-10",
     "close": 310.25
    },
    {
     "date": "2026-08-11",
     "close": 318
    },
    {
     "date": "2026-08-12",
     "close": 314.05
    },
    {
     "date": "2026-08-13",
     "close": 318
    },
    {
     "date": "2026-08-14",
     "close": 318.5
    },
    {
     "date": "2026-08-17",
     "close": 318
    },
    {
     "date": "2026-08-18",
     "close": 315.9
    },
    {
     "date": "2026-08-19",
     "close": 320
    },
    {
     "date": "2026-08-20",
     "close": 327.95
    },
    {
     "date": "2026-08-21",
     "close": 328
    },
    {
     "date": "2026-08-24",
     "close": 327.15
    },
    {
     "date": "2026-08-25",
     "close": 331
    },
    {
     "date": "2026-08-26",
     "close": 327
    },
    {
     "date": "2026-08-27",
     "close": 328.5
    },
    {
     "date": "2026-08-28",
     "close": 328
    },
    {
     "date": "2026-08-31",
     "close": 328.1
    },
    {
     "date": "2026-09-01",
     "close": 327.75
    },
    {
     "date": "2026-09-02",
     "close": 327.3
    },
    {
     "date": "2026-09-03",
     "close": 324.8
    },
    {
     "date": "2026-09-04",
     "close": 322.75
    },
    {
     "date": "2026-09-07",
     "close": 320.8
    },
    {
     "date": "2026-09-08",
     "close": 321.6
    },
    {
     "date": "2026-09-09",
     "close": 320.6
    },
    {
     "date": "2026-09-10",
     "close": 322.1
    },
    {
     "date": "2026-09-11",
     "close": 323.5
    },
    {
     "date": "2026-09-15",
     "close": 315.25
    },
    {
     "date": "2026-09-16",
     "close": 317
    },
    {
     "date": "2026-09-17",
     "close": 322.35
    },
    {
     "date": "2026-09-18",
     "close": 326.85
    },
    {
     "date": "2026-09-21",
     "close": 335.9
    },
    {
     "date": "2026-09-22",
     "close": 342
    },
    {
     "date": "2026-09-23",
     "close": 342.65
    },
    {
     "date": "2026-09-24",
     "close": 335.5
    },
    {
     "date": "2026-09-25",
     "close": 335
    },
    {
     "date": "2026-09-28",
     "close": 330.95
    },
    {
     "date": "2026-09-29",
     "close": 327.85
    },
    {
     "date": "2026-09-30",
     "close": 320
    },
    {
     "date": "2026-10-01",
     "close": 313.9
    },
    {
     "date": "2026-10-05",
     "close": 320.8
    },
    {
     "date": "2026-10-06",
     "close": 329
    },
    {
     "date": "2026-10-07",
     "close": 328
    },
    {
     "date": "2026-10-08",
     "close": 319.05
    },
    {
     "date": "2026-10-09",
     "close": 323.45
    },
    {
     "date": "2026-10-12",
     "close": 323
    },
    {
     "date": "2026-10-13",
     "close": 320.45
    },
    {
     "date": "2026-10-14",
     "close": 316
    },
    {
     "date": "2026-10-15",
     "close": 323
    },
    {
     "date": "2026-10-16",
     "close": 325.3
    },
    {
     "date": "2026-10-19",
     "close": 320.2
    },
    {
     "date": "2026-10-21",
     "close": 312.35
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Internet Retail"
  },
  "GRASIM": {
   "price": 2894.4,
   "prevClose": 2879,
   "change": 15.4,
   "changePct": 0.53,
   "dayHigh": 2894.4,
   "dayLow": 2828.2,
   "high52": 3411.1,
   "low52": 2502.5,
   "volume": 214524,
   "longName": "Grasim Industries Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 3166.3
    },
    {
     "date": "2026-07-23",
     "close": 3113
    },
    {
     "date": "2026-07-24",
     "close": 3089.4
    },
    {
     "date": "2026-07-27",
     "close": 3112.4
    },
    {
     "date": "2026-07-28",
     "close": 3116.2
    },
    {
     "date": "2026-07-29",
     "close": 3113
    },
    {
     "date": "2026-07-30",
     "close": 3104.8
    },
    {
     "date": "2026-07-31",
     "close": 3100.8
    },
    {
     "date": "2026-08-03",
     "close": 3260
    },
    {
     "date": "2026-08-04",
     "close": 3138
    },
    {
     "date": "2026-08-05",
     "close": 3224
    },
    {
     "date": "2026-08-06",
     "close": 3220
    },
    {
     "date": "2026-08-07",
     "close": 3323
    },
    {
     "date": "2026-08-10",
     "close": 3380.5
    },
    {
     "date": "2026-08-11",
     "close": 3322.2
    },
    {
     "date": "2026-08-12",
     "close": 3307.8
    },
    {
     "date": "2026-08-13",
     "close": 3257
    },
    {
     "date": "2026-08-14",
     "close": 3248.7
    },
    {
     "date": "2026-08-17",
     "close": 3250.5
    },
    {
     "date": "2026-08-18",
     "close": 3278.7
    },
    {
     "date": "2026-08-19",
     "close": 3270
    },
    {
     "date": "2026-08-20",
     "close": 3300
    },
    {
     "date": "2026-08-21",
     "close": 3308
    },
    {
     "date": "2026-08-24",
     "close": 3288
    },
    {
     "date": "2026-08-25",
     "close": 3289.6
    },
    {
     "date": "2026-08-26",
     "close": 3299.9
    },
    {
     "date": "2026-08-27",
     "close": 3258
    },
    {
     "date": "2026-08-28",
     "close": 3290
    },
    {
     "date": "2026-08-31",
     "close": 3371
    },
    {
     "date": "2026-09-01",
     "close": 3305
    },
    {
     "date": "2026-09-02",
     "close": 3294.9
    },
    {
     "date": "2026-09-03",
     "close": 3310
    },
    {
     "date": "2026-09-04",
     "close": 3322
    },
    {
     "date": "2026-09-07",
     "close": 3302.4
    },
    {
     "date": "2026-09-08",
     "close": 3306.8
    },
    {
     "date": "2026-09-09",
     "close": 3300
    },
    {
     "date": "2026-09-10",
     "close": 3319
    },
    {
     "date": "2026-09-11",
     "close": 3281.9
    },
    {
     "date": "2026-09-15",
     "close": 3171
    },
    {
     "date": "2026-09-16",
     "close": 3187
    },
    {
     "date": "2026-09-17",
     "close": 3173.1
    },
    {
     "date": "2026-09-18",
     "close": 3209.2
    },
    {
     "date": "2026-09-21",
     "close": 3166
    },
    {
     "date": "2026-09-22",
     "close": 3128.2
    },
    {
     "date": "2026-09-23",
     "close": 3188.5
    },
    {
     "date": "2026-09-24",
     "close": 3166.5
    },
    {
     "date": "2026-09-25",
     "close": 3191
    },
    {
     "date": "2026-09-28",
     "close": 3150
    },
    {
     "date": "2026-09-29",
     "close": 3100
    },
    {
     "date": "2026-09-30",
     "close": 3061.9
    },
    {
     "date": "2026-10-01",
     "close": 2962
    },
    {
     "date": "2026-10-05",
     "close": 2972
    },
    {
     "date": "2026-10-06",
     "close": 2969
    },
    {
     "date": "2026-10-07",
     "close": 2921.1
    },
    {
     "date": "2026-10-08",
     "close": 2856.8
    },
    {
     "date": "2026-10-09",
     "close": 2890
    },
    {
     "date": "2026-10-12",
     "close": 2858
    },
    {
     "date": "2026-10-13",
     "close": 2912
    },
    {
     "date": "2026-10-14",
     "close": 2873
    },
    {
     "date": "2026-10-15",
     "close": 2885.9
    },
    {
     "date": "2026-10-16",
     "close": 2920
    },
    {
     "date": "2026-10-19",
     "close": 2879
    },
    {
     "date": "2026-10-21",
     "close": 2889.1
    }
   ],
   "sector": "Basic Materials",
   "industry": "Building Materials"
  },
  "HAL": {
   "price": 4875,
   "prevClose": 4959,
   "change": -84,
   "changePct": -1.69,
   "dayHigh": 4901.9,
   "dayLow": 4765.2,
   "high52": 5149.9,
   "low52": 3479.1,
   "volume": 907063,
   "longName": "Hindustan Aeronautics Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 4574.8
    },
    {
     "date": "2026-07-23",
     "close": 4592.5
    },
    {
     "date": "2026-07-24",
     "close": 4573.4
    },
    {
     "date": "2026-07-27",
     "close": 4619
    },
    {
     "date": "2026-07-28",
     "close": 4600.1
    },
    {
     "date": "2026-07-29",
     "close": 4592
    },
    {
     "date": "2026-07-30",
     "close": 4581.4
    },
    {
     "date": "2026-07-31",
     "close": 4646.5
    },
    {
     "date": "2026-08-03",
     "close": 4690
    },
    {
     "date": "2026-08-04",
     "close": 4635
    },
    {
     "date": "2026-08-05",
     "close": 4645
    },
    {
     "date": "2026-08-06",
     "close": 4920
    },
    {
     "date": "2026-08-07",
     "close": 4910
    },
    {
     "date": "2026-08-10",
     "close": 4928
    },
    {
     "date": "2026-08-11",
     "close": 4909
    },
    {
     "date": "2026-08-12",
     "close": 4995
    },
    {
     "date": "2026-08-13",
     "close": 4945
    },
    {
     "date": "2026-08-14",
     "close": 5029.9
    },
    {
     "date": "2026-08-17",
     "close": 5059
    },
    {
     "date": "2026-08-18",
     "close": 5099
    },
    {
     "date": "2026-08-19",
     "close": 5017
    },
    {
     "date": "2026-08-20",
     "close": 4998
    },
    {
     "date": "2026-08-21",
     "close": 5000
    },
    {
     "date": "2026-08-24",
     "close": 4906
    },
    {
     "date": "2026-08-25",
     "close": 4900
    },
    {
     "date": "2026-08-26",
     "close": 4865.5
    },
    {
     "date": "2026-08-27",
     "close": 4899
    },
    {
     "date": "2026-08-28",
     "close": 4861.1
    },
    {
     "date": "2026-08-31",
     "close": 4801.6
    },
    {
     "date": "2026-09-01",
     "close": 4807.6
    },
    {
     "date": "2026-09-02",
     "close": 4780
    },
    {
     "date": "2026-09-03",
     "close": 4765.6
    },
    {
     "date": "2026-09-04",
     "close": 4856
    },
    {
     "date": "2026-09-07",
     "close": 4855.2
    },
    {
     "date": "2026-09-08",
     "close": 5031.1
    },
    {
     "date": "2026-09-09",
     "close": 5000.5
    },
    {
     "date": "2026-09-10",
     "close": 4950
    },
    {
     "date": "2026-09-11",
     "close": 4905
    },
    {
     "date": "2026-09-15",
     "close": 4695
    },
    {
     "date": "2026-09-16",
     "close": 4695.6
    },
    {
     "date": "2026-09-17",
     "close": 4788
    },
    {
     "date": "2026-09-18",
     "close": 4800.3
    },
    {
     "date": "2026-09-21",
     "close": 4826
    },
    {
     "date": "2026-09-22",
     "close": 4800
    },
    {
     "date": "2026-09-23",
     "close": 4836
    },
    {
     "date": "2026-09-24",
     "close": 4774.2
    },
    {
     "date": "2026-09-25",
     "close": 4800
    },
    {
     "date": "2026-09-28",
     "close": 4738
    },
    {
     "date": "2026-09-29",
     "close": 4549.3
    },
    {
     "date": "2026-09-30",
     "close": 4668
    },
    {
     "date": "2026-10-01",
     "close": 4601
    },
    {
     "date": "2026-10-05",
     "close": 4680
    },
    {
     "date": "2026-10-06",
     "close": 4816
    },
    {
     "date": "2026-10-07",
     "close": 4746.3
    },
    {
     "date": "2026-10-08",
     "close": 4647.4
    },
    {
     "date": "2026-10-09",
     "close": 4655.6
    },
    {
     "date": "2026-10-12",
     "close": 4760
    },
    {
     "date": "2026-10-13",
     "close": 4869
    },
    {
     "date": "2026-10-14",
     "close": 4933
    },
    {
     "date": "2026-10-15",
     "close": 4910
    },
    {
     "date": "2026-10-16",
     "close": 4989
    },
    {
     "date": "2026-10-19",
     "close": 4959
    },
    {
     "date": "2026-10-21",
     "close": 4854.4
    }
   ],
   "sector": "Industrials",
   "industry": "Aerospace & Defense"
  },
  "HCLTECH": {
   "price": 1421.7,
   "prevClose": 1379.9,
   "change": 41.8,
   "changePct": 3.03,
   "dayHigh": 1427.9,
   "dayLow": 1395.3,
   "high52": 1780.1,
   "low52": 1030,
   "volume": 3570431,
   "longName": "HCL Technologies Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1237.3
    },
    {
     "date": "2026-07-23",
     "close": 1244.7
    },
    {
     "date": "2026-07-24",
     "close": 1271
    },
    {
     "date": "2026-07-27",
     "close": 1295.9
    },
    {
     "date": "2026-07-28",
     "close": 1318.6
    },
    {
     "date": "2026-07-29",
     "close": 1344.3
    },
    {
     "date": "2026-07-30",
     "close": 1352.7
    },
    {
     "date": "2026-07-31",
     "close": 1346.9
    },
    {
     "date": "2026-08-03",
     "close": 1377
    },
    {
     "date": "2026-08-04",
     "close": 1369.9
    },
    {
     "date": "2026-08-05",
     "close": 1350
    },
    {
     "date": "2026-08-06",
     "close": 1335
    },
    {
     "date": "2026-08-07",
     "close": 1356.6
    },
    {
     "date": "2026-08-10",
     "close": 1357.2
    },
    {
     "date": "2026-08-11",
     "close": 1365.4
    },
    {
     "date": "2026-08-12",
     "close": 1365.4
    },
    {
     "date": "2026-08-13",
     "close": 1370
    },
    {
     "date": "2026-08-14",
     "close": 1360
    },
    {
     "date": "2026-08-17",
     "close": 1325
    },
    {
     "date": "2026-08-18",
     "close": 1298
    },
    {
     "date": "2026-08-19",
     "close": 1324.8
    },
    {
     "date": "2026-08-20",
     "close": 1318.4
    },
    {
     "date": "2026-08-21",
     "close": 1302.5
    },
    {
     "date": "2026-08-24",
     "close": 1322
    },
    {
     "date": "2026-08-25",
     "close": 1315.8
    },
    {
     "date": "2026-08-26",
     "close": 1298.5
    },
    {
     "date": "2026-08-27",
     "close": 1282
    },
    {
     "date": "2026-08-28",
     "close": 1316.1
    },
    {
     "date": "2026-08-31",
     "close": 1312.2
    },
    {
     "date": "2026-09-01",
     "close": 1351.4
    },
    {
     "date": "2026-09-02",
     "close": 1331.5
    },
    {
     "date": "2026-09-03",
     "close": 1319
    },
    {
     "date": "2026-09-04",
     "close": 1293.4
    },
    {
     "date": "2026-09-07",
     "close": 1282.8
    },
    {
     "date": "2026-09-08",
     "close": 1277
    },
    {
     "date": "2026-09-09",
     "close": 1229.8
    },
    {
     "date": "2026-09-10",
     "close": 1207
    },
    {
     "date": "2026-09-11",
     "close": 1206.1
    },
    {
     "date": "2026-09-15",
     "close": 1253.7
    },
    {
     "date": "2026-09-16",
     "close": 1253
    },
    {
     "date": "2026-09-17",
     "close": 1258.3
    },
    {
     "date": "2026-09-18",
     "close": 1249.3
    },
    {
     "date": "2026-09-21",
     "close": 1281
    },
    {
     "date": "2026-09-22",
     "close": 1270.4
    },
    {
     "date": "2026-09-23",
     "close": 1256.7
    },
    {
     "date": "2026-09-24",
     "close": 1243.6
    },
    {
     "date": "2026-09-25",
     "close": 1258
    },
    {
     "date": "2026-09-28",
     "close": 1252.6
    },
    {
     "date": "2026-09-29",
     "close": 1222
    },
    {
     "date": "2026-09-30",
     "close": 1230
    },
    {
     "date": "2026-10-01",
     "close": 1243.1
    },
    {
     "date": "2026-10-05",
     "close": 1201.9
    },
    {
     "date": "2026-10-06",
     "close": 1204.4
    },
    {
     "date": "2026-10-07",
     "close": 1185
    },
    {
     "date": "2026-10-08",
     "close": 1176.9
    },
    {
     "date": "2026-10-09",
     "close": 1216.7
    },
    {
     "date": "2026-10-12",
     "close": 1223
    },
    {
     "date": "2026-10-13",
     "close": 1326
    },
    {
     "date": "2026-10-14",
     "close": 1327
    },
    {
     "date": "2026-10-15",
     "close": 1360
    },
    {
     "date": "2026-10-16",
     "close": 1380
    },
    {
     "date": "2026-10-19",
     "close": 1379.9
    },
    {
     "date": "2026-10-21",
     "close": 1424.2
    }
   ],
   "sector": "Technology",
   "industry": "Information Technology Services"
  },
  "HDFCBANK": {
   "price": 694.05,
   "prevClose": 712,
   "change": -17.95,
   "changePct": -2.52,
   "dayHigh": 703.35,
   "dayLow": 689.1,
   "high52": 1020.5,
   "low52": 681.9,
   "volume": 60255284,
   "longName": "HDFC Bank Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 753.15
    },
    {
     "date": "2026-07-23",
     "close": 747.25
    },
    {
     "date": "2026-07-24",
     "close": 742.8
    },
    {
     "date": "2026-07-27",
     "close": 739.55
    },
    {
     "date": "2026-07-28",
     "close": 735.4
    },
    {
     "date": "2026-07-29",
     "close": 748.2
    },
    {
     "date": "2026-07-30",
     "close": 753.95
    },
    {
     "date": "2026-07-31",
     "close": 748.15
    },
    {
     "date": "2026-08-03",
     "close": 753
    },
    {
     "date": "2026-08-04",
     "close": 742
    },
    {
     "date": "2026-08-05",
     "close": 735
    },
    {
     "date": "2026-08-06",
     "close": 734.3
    },
    {
     "date": "2026-08-07",
     "close": 731
    },
    {
     "date": "2026-08-10",
     "close": 731
    },
    {
     "date": "2026-08-11",
     "close": 729
    },
    {
     "date": "2026-08-12",
     "close": 729
    },
    {
     "date": "2026-08-13",
     "close": 725
    },
    {
     "date": "2026-08-14",
     "close": 727
    },
    {
     "date": "2026-08-17",
     "close": 729
    },
    {
     "date": "2026-08-18",
     "close": 723
    },
    {
     "date": "2026-08-19",
     "close": 720
    },
    {
     "date": "2026-08-20",
     "close": 725.05
    },
    {
     "date": "2026-08-21",
     "close": 726.95
    },
    {
     "date": "2026-08-24",
     "close": 729
    },
    {
     "date": "2026-08-25",
     "close": 727.5
    },
    {
     "date": "2026-08-26",
     "close": 727.2
    },
    {
     "date": "2026-08-27",
     "close": 711
    },
    {
     "date": "2026-08-28",
     "close": 720.3
    },
    {
     "date": "2026-08-31",
     "close": 709
    },
    {
     "date": "2026-09-01",
     "close": 711.9
    },
    {
     "date": "2026-09-02",
     "close": 700.8
    },
    {
     "date": "2026-09-03",
     "close": 706.65
    },
    {
     "date": "2026-09-04",
     "close": 712.1
    },
    {
     "date": "2026-09-07",
     "close": 710.5
    },
    {
     "date": "2026-09-08",
     "close": 703
    },
    {
     "date": "2026-09-09",
     "close": 687.1
    },
    {
     "date": "2026-09-10",
     "close": 693.8
    },
    {
     "date": "2026-09-11",
     "close": 708.25
    },
    {
     "date": "2026-09-15",
     "close": 716.55
    },
    {
     "date": "2026-09-16",
     "close": 721.5
    },
    {
     "date": "2026-09-17",
     "close": 713
    },
    {
     "date": "2026-09-18",
     "close": 731
    },
    {
     "date": "2026-09-21",
     "close": 739.5
    },
    {
     "date": "2026-09-22",
     "close": 738.6
    },
    {
     "date": "2026-09-23",
     "close": 737.25
    },
    {
     "date": "2026-09-24",
     "close": 728.9
    },
    {
     "date": "2026-09-25",
     "close": 735.6
    },
    {
     "date": "2026-09-28",
     "close": 719.05
    },
    {
     "date": "2026-09-29",
     "close": 722.7
    },
    {
     "date": "2026-09-30",
     "close": 708.7
    },
    {
     "date": "2026-10-01",
     "close": 721.2
    },
    {
     "date": "2026-10-05",
     "close": 704.8
    },
    {
     "date": "2026-10-06",
     "close": 711.45
    },
    {
     "date": "2026-10-07",
     "close": 702.75
    },
    {
     "date": "2026-10-08",
     "close": 692.25
    },
    {
     "date": "2026-10-09",
     "close": 707.25
    },
    {
     "date": "2026-10-12",
     "close": 704.9
    },
    {
     "date": "2026-10-13",
     "close": 714
    },
    {
     "date": "2026-10-14",
     "close": 710.7
    },
    {
     "date": "2026-10-15",
     "close": 726.85
    },
    {
     "date": "2026-10-16",
     "close": 728.85
    },
    {
     "date": "2026-10-19",
     "close": 712
    },
    {
     "date": "2026-10-21",
     "close": 706.95
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  },
  "HINDALCO": {
   "price": 885.6,
   "prevClose": 900.45,
   "change": -14.85,
   "changePct": -1.65,
   "dayHigh": 892.05,
   "dayLow": 870,
   "high52": 1176,
   "low52": 770.15,
   "volume": 3615195,
   "longName": "Hindalco Industries Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 950
    },
    {
     "date": "2026-07-23",
     "close": 955.65
    },
    {
     "date": "2026-07-24",
     "close": 942.8
    },
    {
     "date": "2026-07-27",
     "close": 945.25
    },
    {
     "date": "2026-07-28",
     "close": 936.4
    },
    {
     "date": "2026-07-29",
     "close": 962.45
    },
    {
     "date": "2026-07-30",
     "close": 970.4
    },
    {
     "date": "2026-07-31",
     "close": 974.45
    },
    {
     "date": "2026-08-03",
     "close": 994.9
    },
    {
     "date": "2026-08-04",
     "close": 1020
    },
    {
     "date": "2026-08-05",
     "close": 1040
    },
    {
     "date": "2026-08-06",
     "close": 1027
    },
    {
     "date": "2026-08-07",
     "close": 1059.6
    },
    {
     "date": "2026-08-10",
     "close": 1054.05
    },
    {
     "date": "2026-08-11",
     "close": 1049.1
    },
    {
     "date": "2026-08-12",
     "close": 1078.5
    },
    {
     "date": "2026-08-13",
     "close": 1046.25
    },
    {
     "date": "2026-08-14",
     "close": 1029.5
    },
    {
     "date": "2026-08-17",
     "close": 1049.9
    },
    {
     "date": "2026-08-18",
     "close": 1041.6
    },
    {
     "date": "2026-08-19",
     "close": 1038.95
    },
    {
     "date": "2026-08-20",
     "close": 1029.85
    },
    {
     "date": "2026-08-21",
     "close": 1034
    },
    {
     "date": "2026-08-24",
     "close": 1058.5
    },
    {
     "date": "2026-08-25",
     "close": 1051.05
    },
    {
     "date": "2026-08-26",
     "close": 1053
    },
    {
     "date": "2026-08-27",
     "close": 1024
    },
    {
     "date": "2026-08-28",
     "close": 1037.4
    },
    {
     "date": "2026-08-31",
     "close": 1015.45
    },
    {
     "date": "2026-09-01",
     "close": 1014.4
    },
    {
     "date": "2026-09-02",
     "close": 1009.7
    },
    {
     "date": "2026-09-03",
     "close": 1010
    },
    {
     "date": "2026-09-04",
     "close": 1011
    },
    {
     "date": "2026-09-07",
     "close": 1006
    },
    {
     "date": "2026-09-08",
     "close": 1009
    },
    {
     "date": "2026-09-09",
     "close": 1026.9
    },
    {
     "date": "2026-09-10",
     "close": 1014
    },
    {
     "date": "2026-09-11",
     "close": 981.5
    },
    {
     "date": "2026-09-15",
     "close": 958.7
    },
    {
     "date": "2026-09-16",
     "close": 972.7
    },
    {
     "date": "2026-09-17",
     "close": 980.5
    },
    {
     "date": "2026-09-18",
     "close": 986.5
    },
    {
     "date": "2026-09-21",
     "close": 981.2
    },
    {
     "date": "2026-09-22",
     "close": 973
    },
    {
     "date": "2026-09-23",
     "close": 1003.8
    },
    {
     "date": "2026-09-24",
     "close": 982
    },
    {
     "date": "2026-09-25",
     "close": 977
    },
    {
     "date": "2026-09-28",
     "close": 955.9
    },
    {
     "date": "2026-09-29",
     "close": 955.2
    },
    {
     "date": "2026-09-30",
     "close": 941.8
    },
    {
     "date": "2026-10-01",
     "close": 941.85
    },
    {
     "date": "2026-10-05",
     "close": 938.4
    },
    {
     "date": "2026-10-06",
     "close": 940.5
    },
    {
     "date": "2026-10-07",
     "close": 910.85
    },
    {
     "date": "2026-10-08",
     "close": 890.15
    },
    {
     "date": "2026-10-09",
     "close": 900.35
    },
    {
     "date": "2026-10-12",
     "close": 882.5
    },
    {
     "date": "2026-10-13",
     "close": 902.25
    },
    {
     "date": "2026-10-14",
     "close": 882.5
    },
    {
     "date": "2026-10-15",
     "close": 893.85
    },
    {
     "date": "2026-10-16",
     "close": 908
    },
    {
     "date": "2026-10-19",
     "close": 900.45
    },
    {
     "date": "2026-10-21",
     "close": 892.85
    }
   ],
   "sector": "Basic Materials",
   "industry": "Aluminum"
  },
  "HINDUNILVR": {
   "price": 1828.3,
   "prevClose": 1853.2,
   "change": -24.9,
   "changePct": -1.34,
   "dayHigh": 1844.9,
   "dayLow": 1810.6,
   "high52": 2667.2,
   "low52": 1810.6,
   "volume": 1012054,
   "longName": "Hindustan Unilever Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 2154.6
    },
    {
     "date": "2026-07-23",
     "close": 2161.8
    },
    {
     "date": "2026-07-24",
     "close": 2145
    },
    {
     "date": "2026-07-27",
     "close": 2174.6
    },
    {
     "date": "2026-07-28",
     "close": 2022.7
    },
    {
     "date": "2026-07-29",
     "close": 2117.8
    },
    {
     "date": "2026-07-30",
     "close": 2107.9
    },
    {
     "date": "2026-07-31",
     "close": 2101.3
    },
    {
     "date": "2026-08-03",
     "close": 2138
    },
    {
     "date": "2026-08-04",
     "close": 2096.5
    },
    {
     "date": "2026-08-05",
     "close": 2085.3
    },
    {
     "date": "2026-08-06",
     "close": 2079.5
    },
    {
     "date": "2026-08-07",
     "close": 2096
    },
    {
     "date": "2026-08-10",
     "close": 2087.2
    },
    {
     "date": "2026-08-11",
     "close": 2064.9
    },
    {
     "date": "2026-08-12",
     "close": 2063
    },
    {
     "date": "2026-08-13",
     "close": 2092
    },
    {
     "date": "2026-08-14",
     "close": 2077
    },
    {
     "date": "2026-08-17",
     "close": 2055
    },
    {
     "date": "2026-08-18",
     "close": 2035
    },
    {
     "date": "2026-08-19",
     "close": 2020.7
    },
    {
     "date": "2026-08-20",
     "close": 2028
    },
    {
     "date": "2026-08-21",
     "close": 2015
    },
    {
     "date": "2026-08-24",
     "close": 2030
    },
    {
     "date": "2026-08-25",
     "close": 2024.2
    },
    {
     "date": "2026-08-26",
     "close": 2021
    },
    {
     "date": "2026-08-27",
     "close": 2009
    },
    {
     "date": "2026-08-28",
     "close": 2010.4
    },
    {
     "date": "2026-08-31",
     "close": 1967.4
    },
    {
     "date": "2026-09-01",
     "close": 1994.8
    },
    {
     "date": "2026-09-02",
     "close": 1975
    },
    {
     "date": "2026-09-03",
     "close": 1962
    },
    {
     "date": "2026-09-04",
     "close": 1973.4
    },
    {
     "date": "2026-09-07",
     "close": 1960
    },
    {
     "date": "2026-09-08",
     "close": 1980
    },
    {
     "date": "2026-09-09",
     "close": 1945
    },
    {
     "date": "2026-09-10",
     "close": 1942.3
    },
    {
     "date": "2026-09-11",
     "close": 1927
    },
    {
     "date": "2026-09-15",
     "close": 1938.1
    },
    {
     "date": "2026-09-16",
     "close": 1962
    },
    {
     "date": "2026-09-17",
     "close": 1942.2
    },
    {
     "date": "2026-09-18",
     "close": 1932
    },
    {
     "date": "2026-09-21",
     "close": 1947
    },
    {
     "date": "2026-09-22",
     "close": 1933.8
    },
    {
     "date": "2026-09-23",
     "close": 1950
    },
    {
     "date": "2026-09-24",
     "close": 1933.5
    },
    {
     "date": "2026-09-25",
     "close": 1942.9
    },
    {
     "date": "2026-09-28",
     "close": 1896
    },
    {
     "date": "2026-09-29",
     "close": 1863.8
    },
    {
     "date": "2026-09-30",
     "close": 1879.1
    },
    {
     "date": "2026-10-01",
     "close": 1836
    },
    {
     "date": "2026-10-05",
     "close": 1838.4
    },
    {
     "date": "2026-10-06",
     "close": 1895.2
    },
    {
     "date": "2026-10-07",
     "close": 1865.4
    },
    {
     "date": "2026-10-08",
     "close": 1844.5
    },
    {
     "date": "2026-10-09",
     "close": 1856.7
    },
    {
     "date": "2026-10-12",
     "close": 1820.7
    },
    {
     "date": "2026-10-13",
     "close": 1875.5
    },
    {
     "date": "2026-10-14",
     "close": 1895.5
    },
    {
     "date": "2026-10-15",
     "close": 1897.1
    },
    {
     "date": "2026-10-16",
     "close": 1893.8
    },
    {
     "date": "2026-10-19",
     "close": 1853.2
    },
    {
     "date": "2026-10-21",
     "close": 1850.2
    }
   ],
   "sector": "Consumer Defensive",
   "industry": "Household & Personal Products"
  },
  "HINDZINC": {
   "price": 518,
   "prevClose": 538.4,
   "change": -20.4,
   "changePct": -3.79,
   "dayHigh": 518,
   "dayLow": 507.4,
   "high52": 733,
   "low52": 453.5,
   "volume": 7450277,
   "longName": "Hindustan Zinc Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 535.4
    },
    {
     "date": "2026-07-23",
     "close": 531.15
    },
    {
     "date": "2026-07-24",
     "close": 531.95
    },
    {
     "date": "2026-07-27",
     "close": 529.65
    },
    {
     "date": "2026-07-28",
     "close": 526.9
    },
    {
     "date": "2026-07-29",
     "close": 536.7
    },
    {
     "date": "2026-07-30",
     "close": 535.9
    },
    {
     "date": "2026-07-31",
     "close": 539.2
    },
    {
     "date": "2026-08-03",
     "close": 547
    },
    {
     "date": "2026-08-04",
     "close": 562.9
    },
    {
     "date": "2026-08-05",
     "close": 596.95
    },
    {
     "date": "2026-08-06",
     "close": 590
    },
    {
     "date": "2026-08-07",
     "close": 603
    },
    {
     "date": "2026-08-10",
     "close": 595.15
    },
    {
     "date": "2026-08-11",
     "close": 586.65
    },
    {
     "date": "2026-08-12",
     "close": 584.6
    },
    {
     "date": "2026-08-13",
     "close": 578.35
    },
    {
     "date": "2026-08-14",
     "close": 561.9
    },
    {
     "date": "2026-08-17",
     "close": 567.5
    },
    {
     "date": "2026-08-18",
     "close": 558
    },
    {
     "date": "2026-08-19",
     "close": 557
    },
    {
     "date": "2026-08-20",
     "close": 573.9
    },
    {
     "date": "2026-08-21",
     "close": 594.9
    },
    {
     "date": "2026-08-24",
     "close": 604
    },
    {
     "date": "2026-08-25",
     "close": 592.6
    },
    {
     "date": "2026-08-26",
     "close": 626.5
    },
    {
     "date": "2026-08-27",
     "close": 610.1
    },
    {
     "date": "2026-08-28",
     "close": 622
    },
    {
     "date": "2026-08-31",
     "close": 595.45
    },
    {
     "date": "2026-09-01",
     "close": 597
    },
    {
     "date": "2026-09-02",
     "close": 588.4
    },
    {
     "date": "2026-09-03",
     "close": 587.95
    },
    {
     "date": "2026-09-04",
     "close": 601
    },
    {
     "date": "2026-09-07",
     "close": 589.15
    },
    {
     "date": "2026-09-08",
     "close": 595.5
    },
    {
     "date": "2026-09-09",
     "close": 605.4
    },
    {
     "date": "2026-09-10",
     "close": 593.6
    },
    {
     "date": "2026-09-11",
     "close": 576.45
    },
    {
     "date": "2026-09-15",
     "close": 560.9
    },
    {
     "date": "2026-09-16",
     "close": 567.5
    },
    {
     "date": "2026-09-17",
     "close": 572.3
    },
    {
     "date": "2026-09-18",
     "close": 596
    },
    {
     "date": "2026-09-21",
     "close": 591.8
    },
    {
     "date": "2026-09-22",
     "close": 590.5
    },
    {
     "date": "2026-09-23",
     "close": 595.45
    },
    {
     "date": "2026-09-24",
     "close": 587.15
    },
    {
     "date": "2026-09-25",
     "close": 588.95
    },
    {
     "date": "2026-09-28",
     "close": 573
    },
    {
     "date": "2026-09-29",
     "close": 563.3
    },
    {
     "date": "2026-09-30",
     "close": 566
    },
    {
     "date": "2026-10-01",
     "close": 555.05
    },
    {
     "date": "2026-10-05",
     "close": 560.95
    },
    {
     "date": "2026-10-06",
     "close": 557.65
    },
    {
     "date": "2026-10-07",
     "close": 551
    },
    {
     "date": "2026-10-08",
     "close": 531.75
    },
    {
     "date": "2026-10-09",
     "close": 543.5
    },
    {
     "date": "2026-10-12",
     "close": 546.9
    },
    {
     "date": "2026-10-13",
     "close": 549.6
    },
    {
     "date": "2026-10-14",
     "close": 540
    },
    {
     "date": "2026-10-15",
     "close": 531
    },
    {
     "date": "2026-10-16",
     "close": 540
    },
    {
     "date": "2026-10-19",
     "close": 538.4
    },
    {
     "date": "2026-10-21",
     "close": 525
    }
   ],
   "sector": "Basic Materials",
   "industry": "Other Industrial Metals & Mining"
  },
  "ICICIBANK": {
   "price": 1398.5,
   "prevClose": 1381,
   "change": 17.5,
   "changePct": 1.27,
   "dayHigh": 1400,
   "dayLow": 1375.1,
   "high52": 1480,
   "low52": 1187.6,
   "volume": 16079390,
   "longName": "ICICI Bank Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1440.7
    },
    {
     "date": "2026-07-23",
     "close": 1434.6
    },
    {
     "date": "2026-07-24",
     "close": 1432.9
    },
    {
     "date": "2026-07-27",
     "close": 1445.7
    },
    {
     "date": "2026-07-28",
     "close": 1430.8
    },
    {
     "date": "2026-07-29",
     "close": 1437.9
    },
    {
     "date": "2026-07-30",
     "close": 1433.9
    },
    {
     "date": "2026-07-31",
     "close": 1435.4
    },
    {
     "date": "2026-08-03",
     "close": 1460
    },
    {
     "date": "2026-08-04",
     "close": 1454.6
    },
    {
     "date": "2026-08-05",
     "close": 1450.1
    },
    {
     "date": "2026-08-06",
     "close": 1457.5
    },
    {
     "date": "2026-08-07",
     "close": 1421
    },
    {
     "date": "2026-08-10",
     "close": 1431.8
    },
    {
     "date": "2026-08-11",
     "close": 1429.6
    },
    {
     "date": "2026-08-12",
     "close": 1431.7
    },
    {
     "date": "2026-08-13",
     "close": 1406.8
    },
    {
     "date": "2026-08-14",
     "close": 1417
    },
    {
     "date": "2026-08-17",
     "close": 1415.3
    },
    {
     "date": "2026-08-18",
     "close": 1412
    },
    {
     "date": "2026-08-19",
     "close": 1402
    },
    {
     "date": "2026-08-20",
     "close": 1411.9
    },
    {
     "date": "2026-08-21",
     "close": 1420
    },
    {
     "date": "2026-08-24",
     "close": 1415
    },
    {
     "date": "2026-08-25",
     "close": 1422.7
    },
    {
     "date": "2026-08-26",
     "close": 1430
    },
    {
     "date": "2026-08-27",
     "close": 1443
    },
    {
     "date": "2026-08-28",
     "close": 1422.8
    },
    {
     "date": "2026-08-31",
     "close": 1454
    },
    {
     "date": "2026-09-01",
     "close": 1438
    },
    {
     "date": "2026-09-02",
     "close": 1426.5
    },
    {
     "date": "2026-09-03",
     "close": 1430
    },
    {
     "date": "2026-09-04",
     "close": 1423.2
    },
    {
     "date": "2026-09-07",
     "close": 1427.5
    },
    {
     "date": "2026-09-08",
     "close": 1399.4
    },
    {
     "date": "2026-09-09",
     "close": 1389.1
    },
    {
     "date": "2026-09-10",
     "close": 1384.5
    },
    {
     "date": "2026-09-11",
     "close": 1379.3
    },
    {
     "date": "2026-09-15",
     "close": 1350.4
    },
    {
     "date": "2026-09-16",
     "close": 1358.8
    },
    {
     "date": "2026-09-17",
     "close": 1347.6
    },
    {
     "date": "2026-09-18",
     "close": 1338.9
    },
    {
     "date": "2026-09-21",
     "close": 1345
    },
    {
     "date": "2026-09-22",
     "close": 1339.6
    },
    {
     "date": "2026-09-23",
     "close": 1340
    },
    {
     "date": "2026-09-24",
     "close": 1334.5
    },
    {
     "date": "2026-09-25",
     "close": 1326.8
    },
    {
     "date": "2026-09-28",
     "close": 1302
    },
    {
     "date": "2026-09-29",
     "close": 1292.2
    },
    {
     "date": "2026-09-30",
     "close": 1321.7
    },
    {
     "date": "2026-10-01",
     "close": 1310.6
    },
    {
     "date": "2026-10-05",
     "close": 1332
    },
    {
     "date": "2026-10-06",
     "close": 1342.8
    },
    {
     "date": "2026-10-07",
     "close": 1357.5
    },
    {
     "date": "2026-10-08",
     "close": 1349
    },
    {
     "date": "2026-10-09",
     "close": 1355
    },
    {
     "date": "2026-10-12",
     "close": 1340
    },
    {
     "date": "2026-10-13",
     "close": 1360.2
    },
    {
     "date": "2026-10-14",
     "close": 1338.6
    },
    {
     "date": "2026-10-15",
     "close": 1389.4
    },
    {
     "date": "2026-10-16",
     "close": 1397
    },
    {
     "date": "2026-10-19",
     "close": 1381
    },
    {
     "date": "2026-10-21",
     "close": 1385
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  },
  "IDEA": {
   "price": 11.53,
   "prevClose": 12.28,
   "change": -0.75,
   "changePct": -6.11,
   "dayHigh": 11.79,
   "dayLow": 11.23,
   "high52": 15.79,
   "low52": 8.13,
   "volume": 502560506,
   "longName": "Vodafone Idea Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 13.54
    },
    {
     "date": "2026-07-23",
     "close": 13.2
    },
    {
     "date": "2026-07-24",
     "close": 13.13
    },
    {
     "date": "2026-07-27",
     "close": 13.06
    },
    {
     "date": "2026-07-28",
     "close": 12.95
    },
    {
     "date": "2026-07-29",
     "close": 13.05
    },
    {
     "date": "2026-07-30",
     "close": 12.87
    },
    {
     "date": "2026-07-31",
     "close": 13.01
    },
    {
     "date": "2026-08-03",
     "close": 12.86
    },
    {
     "date": "2026-08-04",
     "close": 12.9
    },
    {
     "date": "2026-08-05",
     "close": 12.8
    },
    {
     "date": "2026-08-06",
     "close": 12.63
    },
    {
     "date": "2026-08-07",
     "close": 12.73
    },
    {
     "date": "2026-08-10",
     "close": 12.92
    },
    {
     "date": "2026-08-11",
     "close": 12.89
    },
    {
     "date": "2026-08-12",
     "close": 13.5
    },
    {
     "date": "2026-08-13",
     "close": 13.51
    },
    {
     "date": "2026-08-14",
     "close": 14.11
    },
    {
     "date": "2026-08-17",
     "close": 13.71
    },
    {
     "date": "2026-08-18",
     "close": 14.12
    },
    {
     "date": "2026-08-19",
     "close": 14.07
    },
    {
     "date": "2026-08-20",
     "close": 14.03
    },
    {
     "date": "2026-08-21",
     "close": 13.94
    },
    {
     "date": "2026-08-24",
     "close": 14.07
    },
    {
     "date": "2026-08-25",
     "close": 15.19
    },
    {
     "date": "2026-08-26",
     "close": 15.06
    },
    {
     "date": "2026-08-27",
     "close": 14.97
    },
    {
     "date": "2026-08-28",
     "close": 14.68
    },
    {
     "date": "2026-08-31",
     "close": 14.33
    },
    {
     "date": "2026-09-01",
     "close": 14.06
    },
    {
     "date": "2026-09-02",
     "close": 14.53
    },
    {
     "date": "2026-09-03",
     "close": 14.48
    },
    {
     "date": "2026-09-04",
     "close": 15.02
    },
    {
     "date": "2026-09-07",
     "close": 15.6
    },
    {
     "date": "2026-09-08",
     "close": 15.42
    },
    {
     "date": "2026-09-09",
     "close": 15.52
    },
    {
     "date": "2026-09-10",
     "close": 14.9
    },
    {
     "date": "2026-09-11",
     "close": 14.97
    },
    {
     "date": "2026-09-15",
     "close": 14.45
    },
    {
     "date": "2026-09-16",
     "close": 14.26
    },
    {
     "date": "2026-09-17",
     "close": 14.22
    },
    {
     "date": "2026-09-18",
     "close": 13.92
    },
    {
     "date": "2026-09-21",
     "close": 13.84
    },
    {
     "date": "2026-09-22",
     "close": 14.27
    },
    {
     "date": "2026-09-23",
     "close": 14.52
    },
    {
     "date": "2026-09-24",
     "close": 14.12
    },
    {
     "date": "2026-09-25",
     "close": 14.26
    },
    {
     "date": "2026-09-28",
     "close": 13.47
    },
    {
     "date": "2026-09-29",
     "close": 13.56
    },
    {
     "date": "2026-09-30",
     "close": 12.95
    },
    {
     "date": "2026-10-01",
     "close": 12.64
    },
    {
     "date": "2026-10-05",
     "close": 12.74
    },
    {
     "date": "2026-10-06",
     "close": 13.21
    },
    {
     "date": "2026-10-07",
     "close": 13.18
    },
    {
     "date": "2026-10-08",
     "close": 12.8
    },
    {
     "date": "2026-10-09",
     "close": 13
    },
    {
     "date": "2026-10-12",
     "close": 12.67
    },
    {
     "date": "2026-10-13",
     "close": 12.8
    },
    {
     "date": "2026-10-14",
     "close": 12.67
    },
    {
     "date": "2026-10-15",
     "close": 12.52
    },
    {
     "date": "2026-10-16",
     "close": 12.59
    },
    {
     "date": "2026-10-19",
     "close": 12.28
    },
    {
     "date": "2026-10-21",
     "close": 11.64
    }
   ],
   "sector": "Communication Services",
   "industry": "Telecom Services"
  },
  "INDIGO": {
   "price": 4600,
   "prevClose": 4700,
   "change": -100,
   "changePct": -2.13,
   "dayHigh": 4670,
   "dayLow": 4546.6,
   "high52": 5970,
   "low52": 3895.2,
   "volume": 491477,
   "longName": "InterGlobe Aviation Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 5117
    },
    {
     "date": "2026-07-23",
     "close": 5023.5
    },
    {
     "date": "2026-07-24",
     "close": 4985
    },
    {
     "date": "2026-07-27",
     "close": 5230
    },
    {
     "date": "2026-07-28",
     "close": 5270.5
    },
    {
     "date": "2026-07-29",
     "close": 5276.5
    },
    {
     "date": "2026-07-30",
     "close": 5230.5
    },
    {
     "date": "2026-07-31",
     "close": 5171
    },
    {
     "date": "2026-08-03",
     "close": 5400
    },
    {
     "date": "2026-08-04",
     "close": 5358
    },
    {
     "date": "2026-08-05",
     "close": 5400
    },
    {
     "date": "2026-08-06",
     "close": 5318.5
    },
    {
     "date": "2026-08-07",
     "close": 5333
    },
    {
     "date": "2026-08-10",
     "close": 5333.5
    },
    {
     "date": "2026-08-11",
     "close": 5284
    },
    {
     "date": "2026-08-12",
     "close": 5333
    },
    {
     "date": "2026-08-13",
     "close": 5370
    },
    {
     "date": "2026-08-14",
     "close": 5310
    },
    {
     "date": "2026-08-17",
     "close": 5275.5
    },
    {
     "date": "2026-08-18",
     "close": 5220
    },
    {
     "date": "2026-08-19",
     "close": 5193
    },
    {
     "date": "2026-08-20",
     "close": 5165
    },
    {
     "date": "2026-08-21",
     "close": 5110
    },
    {
     "date": "2026-08-24",
     "close": 5115
    },
    {
     "date": "2026-08-25",
     "close": 5218
    },
    {
     "date": "2026-08-26",
     "close": 5250.5
    },
    {
     "date": "2026-08-27",
     "close": 5189
    },
    {
     "date": "2026-08-28",
     "close": 5166
    },
    {
     "date": "2026-08-31",
     "close": 5234
    },
    {
     "date": "2026-09-01",
     "close": 5052
    },
    {
     "date": "2026-09-02",
     "close": 5020
    },
    {
     "date": "2026-09-03",
     "close": 4980
    },
    {
     "date": "2026-09-04",
     "close": 4977
    },
    {
     "date": "2026-09-07",
     "close": 5001
    },
    {
     "date": "2026-09-08",
     "close": 5000
    },
    {
     "date": "2026-09-09",
     "close": 4975
    },
    {
     "date": "2026-09-10",
     "close": 4945
    },
    {
     "date": "2026-09-11",
     "close": 4973
    },
    {
     "date": "2026-09-15",
     "close": 4776
    },
    {
     "date": "2026-09-16",
     "close": 4733.5
    },
    {
     "date": "2026-09-17",
     "close": 4845
    },
    {
     "date": "2026-09-18",
     "close": 4920
    },
    {
     "date": "2026-09-21",
     "close": 4941
    },
    {
     "date": "2026-09-22",
     "close": 5030
    },
    {
     "date": "2026-09-23",
     "close": 5028.5
    },
    {
     "date": "2026-09-24",
     "close": 4890
    },
    {
     "date": "2026-09-25",
     "close": 4940
    },
    {
     "date": "2026-09-28",
     "close": 4874.5
    },
    {
     "date": "2026-09-29",
     "close": 4872
    },
    {
     "date": "2026-09-30",
     "close": 4984
    },
    {
     "date": "2026-10-01",
     "close": 4929.9
    },
    {
     "date": "2026-10-05",
     "close": 4935
    },
    {
     "date": "2026-10-06",
     "close": 5050.5
    },
    {
     "date": "2026-10-07",
     "close": 4990
    },
    {
     "date": "2026-10-08",
     "close": 4813.1
    },
    {
     "date": "2026-10-09",
     "close": 4833
    },
    {
     "date": "2026-10-12",
     "close": 4795
    },
    {
     "date": "2026-10-13",
     "close": 4800.4
    },
    {
     "date": "2026-10-14",
     "close": 4718.5
    },
    {
     "date": "2026-10-15",
     "close": 4778.3
    },
    {
     "date": "2026-10-16",
     "close": 4686.9
    },
    {
     "date": "2026-10-19",
     "close": 4700
    },
    {
     "date": "2026-10-21",
     "close": 4641.5
    }
   ],
   "sector": "Industrials",
   "industry": "Airlines"
  },
  "INFY": {
   "price": 1153.35,
   "prevClose": 1130.7,
   "change": 22.65,
   "changePct": 2,
   "dayHigh": 1174.5,
   "dayLow": 1144.05,
   "high52": 1728,
   "low52": 980.4,
   "volume": 17003258,
   "longName": "Infosys Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1052.1
    },
    {
     "date": "2026-07-23",
     "close": 1047.4
    },
    {
     "date": "2026-07-24",
     "close": 1040.9
    },
    {
     "date": "2026-07-27",
     "close": 1079.2
    },
    {
     "date": "2026-07-28",
     "close": 1105.7
    },
    {
     "date": "2026-07-29",
     "close": 1155.6
    },
    {
     "date": "2026-07-30",
     "close": 1155.1
    },
    {
     "date": "2026-07-31",
     "close": 1130.1
    },
    {
     "date": "2026-08-03",
     "close": 1180
    },
    {
     "date": "2026-08-04",
     "close": 1167.5
    },
    {
     "date": "2026-08-05",
     "close": 1174
    },
    {
     "date": "2026-08-06",
     "close": 1165
    },
    {
     "date": "2026-08-07",
     "close": 1175.1
    },
    {
     "date": "2026-08-10",
     "close": 1183
    },
    {
     "date": "2026-08-11",
     "close": 1190.7
    },
    {
     "date": "2026-08-12",
     "close": 1176.1
    },
    {
     "date": "2026-08-13",
     "close": 1175
    },
    {
     "date": "2026-08-14",
     "close": 1169.2
    },
    {
     "date": "2026-08-17",
     "close": 1139.9
    },
    {
     "date": "2026-08-18",
     "close": 1115
    },
    {
     "date": "2026-08-19",
     "close": 1119.8
    },
    {
     "date": "2026-08-20",
     "close": 1130
    },
    {
     "date": "2026-08-21",
     "close": 1121
    },
    {
     "date": "2026-08-24",
     "close": 1130
    },
    {
     "date": "2026-08-25",
     "close": 1144
    },
    {
     "date": "2026-08-26",
     "close": 1120
    },
    {
     "date": "2026-08-27",
     "close": 1110.8
    },
    {
     "date": "2026-08-28",
     "close": 1144
    },
    {
     "date": "2026-08-31",
     "close": 1133.8
    },
    {
     "date": "2026-09-01",
     "close": 1156
    },
    {
     "date": "2026-09-02",
     "close": 1140
    },
    {
     "date": "2026-09-03",
     "close": 1130.3
    },
    {
     "date": "2026-09-04",
     "close": 1130
    },
    {
     "date": "2026-09-07",
     "close": 1087.5
    },
    {
     "date": "2026-09-08",
     "close": 1082
    },
    {
     "date": "2026-09-09",
     "close": 1035
    },
    {
     "date": "2026-09-10",
     "close": 1036.5
    },
    {
     "date": "2026-09-11",
     "close": 1037.7
    },
    {
     "date": "2026-09-15",
     "close": 1077
    },
    {
     "date": "2026-09-16",
     "close": 1060
    },
    {
     "date": "2026-09-17",
     "close": 1058.6
    },
    {
     "date": "2026-09-18",
     "close": 1051.4
    },
    {
     "date": "2026-09-21",
     "close": 1038.5
    },
    {
     "date": "2026-09-22",
     "close": 1029.4
    },
    {
     "date": "2026-09-23",
     "close": 1020.5
    },
    {
     "date": "2026-09-24",
     "close": 1014.5
    },
    {
     "date": "2026-09-25",
     "close": 1000.2
    },
    {
     "date": "2026-09-28",
     "close": 1003.2
    },
    {
     "date": "2026-09-29",
     "close": 1015.4
    },
    {
     "date": "2026-09-30",
     "close": 994.1
    },
    {
     "date": "2026-10-01",
     "close": 1035
    },
    {
     "date": "2026-10-05",
     "close": 1020.5
    },
    {
     "date": "2026-10-06",
     "close": 1013.85
    },
    {
     "date": "2026-10-07",
     "close": 992
    },
    {
     "date": "2026-10-08",
     "close": 997
    },
    {
     "date": "2026-10-09",
     "close": 1023.4
    },
    {
     "date": "2026-10-12",
     "close": 1020
    },
    {
     "date": "2026-10-13",
     "close": 1062.1
    },
    {
     "date": "2026-10-14",
     "close": 1088
    },
    {
     "date": "2026-10-15",
     "close": 1110
    },
    {
     "date": "2026-10-16",
     "close": 1161.2
    },
    {
     "date": "2026-10-19",
     "close": 1130.7
    },
    {
     "date": "2026-10-21",
     "close": 1168
    }
   ],
   "sector": "Technology",
   "industry": "Information Technology Services"
  },
  "IOC": {
   "price": 130.98,
   "prevClose": 130.25,
   "change": 0.73,
   "changePct": 0.56,
   "dayHigh": 130.98,
   "dayLow": 127.75,
   "high52": 188.96,
   "low52": 124.92,
   "volume": 6613678,
   "longName": "Indian Oil Corporation Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 142.03
    },
    {
     "date": "2026-07-23",
     "close": 139.92
    },
    {
     "date": "2026-07-24",
     "close": 138.47
    },
    {
     "date": "2026-07-27",
     "close": 141.52
    },
    {
     "date": "2026-07-28",
     "close": 141.28
    },
    {
     "date": "2026-07-29",
     "close": 140.11
    },
    {
     "date": "2026-07-30",
     "close": 139.94
    },
    {
     "date": "2026-07-31",
     "close": 140.17
    },
    {
     "date": "2026-08-03",
     "close": 143.7
    },
    {
     "date": "2026-08-04",
     "close": 141.6
    },
    {
     "date": "2026-08-05",
     "close": 144
    },
    {
     "date": "2026-08-06",
     "close": 142.66
    },
    {
     "date": "2026-08-07",
     "close": 143.38
    },
    {
     "date": "2026-08-10",
     "close": 142
    },
    {
     "date": "2026-08-11",
     "close": 140
    },
    {
     "date": "2026-08-12",
     "close": 140.6
    },
    {
     "date": "2026-08-13",
     "close": 141.5
    },
    {
     "date": "2026-08-14",
     "close": 139.4
    },
    {
     "date": "2026-08-17",
     "close": 138.61
    },
    {
     "date": "2026-08-18",
     "close": 137.8
    },
    {
     "date": "2026-08-19",
     "close": 136.3
    },
    {
     "date": "2026-08-20",
     "close": 135.9
    },
    {
     "date": "2026-08-21",
     "close": 135.9
    },
    {
     "date": "2026-08-24",
     "close": 138.5
    },
    {
     "date": "2026-08-25",
     "close": 139
    },
    {
     "date": "2026-08-26",
     "close": 139.48
    },
    {
     "date": "2026-08-27",
     "close": 137.57
    },
    {
     "date": "2026-08-28",
     "close": 137.1
    },
    {
     "date": "2026-08-31",
     "close": 139.13
    },
    {
     "date": "2026-09-01",
     "close": 136.53
    },
    {
     "date": "2026-09-02",
     "close": 137
    },
    {
     "date": "2026-09-03",
     "close": 137.8
    },
    {
     "date": "2026-09-04",
     "close": 137.6
    },
    {
     "date": "2026-09-07",
     "close": 135.15
    },
    {
     "date": "2026-09-08",
     "close": 134.35
    },
    {
     "date": "2026-09-09",
     "close": 135.6
    },
    {
     "date": "2026-09-10",
     "close": 134.94
    },
    {
     "date": "2026-09-11",
     "close": 135.11
    },
    {
     "date": "2026-09-15",
     "close": 132.03
    },
    {
     "date": "2026-09-16",
     "close": 134.75
    },
    {
     "date": "2026-09-17",
     "close": 134.27
    },
    {
     "date": "2026-09-18",
     "close": 137
    },
    {
     "date": "2026-09-21",
     "close": 136.53
    },
    {
     "date": "2026-09-22",
     "close": 137.8
    },
    {
     "date": "2026-09-23",
     "close": 138.15
    },
    {
     "date": "2026-09-24",
     "close": 136.27
    },
    {
     "date": "2026-09-25",
     "close": 135.7
    },
    {
     "date": "2026-09-28",
     "close": 133.32
    },
    {
     "date": "2026-09-29",
     "close": 131.33
    },
    {
     "date": "2026-09-30",
     "close": 134.93
    },
    {
     "date": "2026-10-01",
     "close": 131.34
    },
    {
     "date": "2026-10-05",
     "close": 130.5
    },
    {
     "date": "2026-10-06",
     "close": 131.6
    },
    {
     "date": "2026-10-07",
     "close": 130
    },
    {
     "date": "2026-10-08",
     "close": 126.25
    },
    {
     "date": "2026-10-09",
     "close": 126.35
    },
    {
     "date": "2026-10-12",
     "close": 125.35
    },
    {
     "date": "2026-10-13",
     "close": 126.14
    },
    {
     "date": "2026-10-14",
     "close": 127.8
    },
    {
     "date": "2026-10-15",
     "close": 128.83
    },
    {
     "date": "2026-10-16",
     "close": 130.38
    },
    {
     "date": "2026-10-19",
     "close": 130.25
    },
    {
     "date": "2026-10-21",
     "close": 129.61
    }
   ],
   "sector": "Energy",
   "industry": "Oil & Gas Refining & Marketing"
  },
  "IRFC": {
   "price": 77,
   "prevClose": 78.44,
   "change": -1.44,
   "changePct": -1.84,
   "dayHigh": 77.73,
   "dayLow": 75.6,
   "high52": 137.17,
   "low52": 74.06,
   "volume": 8917328,
   "longName": "Indian Railway Finance Corporation Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 87.39
    },
    {
     "date": "2026-07-23",
     "close": 87.03
    },
    {
     "date": "2026-07-24",
     "close": 87.62
    },
    {
     "date": "2026-07-27",
     "close": 88.13
    },
    {
     "date": "2026-07-28",
     "close": 87.15
    },
    {
     "date": "2026-07-29",
     "close": 89.13
    },
    {
     "date": "2026-07-30",
     "close": 88.92
    },
    {
     "date": "2026-07-31",
     "close": 89.15
    },
    {
     "date": "2026-08-03",
     "close": 90.25
    },
    {
     "date": "2026-08-04",
     "close": 89.6
    },
    {
     "date": "2026-08-05",
     "close": 88.9
    },
    {
     "date": "2026-08-06",
     "close": 89.29
    },
    {
     "date": "2026-08-07",
     "close": 88.75
    },
    {
     "date": "2026-08-10",
     "close": 88.5
    },
    {
     "date": "2026-08-11",
     "close": 87.91
    },
    {
     "date": "2026-08-12",
     "close": 88.26
    },
    {
     "date": "2026-08-13",
     "close": 88.35
    },
    {
     "date": "2026-08-14",
     "close": 87.57
    },
    {
     "date": "2026-08-17",
     "close": 87.05
    },
    {
     "date": "2026-08-18",
     "close": 86.11
    },
    {
     "date": "2026-08-19",
     "close": 85.18
    },
    {
     "date": "2026-08-20",
     "close": 86.47
    },
    {
     "date": "2026-08-21",
     "close": 86.4
    },
    {
     "date": "2026-08-24",
     "close": 85.99
    },
    {
     "date": "2026-08-25",
     "close": 85.45
    },
    {
     "date": "2026-08-26",
     "close": 85.7
    },
    {
     "date": "2026-08-27",
     "close": 84.65
    },
    {
     "date": "2026-08-28",
     "close": 83.9
    },
    {
     "date": "2026-08-31",
     "close": 83.34
    },
    {
     "date": "2026-09-01",
     "close": 82.5
    },
    {
     "date": "2026-09-02",
     "close": 82.48
    },
    {
     "date": "2026-09-03",
     "close": 82.65
    },
    {
     "date": "2026-09-04",
     "close": 83.4
    },
    {
     "date": "2026-09-07",
     "close": 83
    },
    {
     "date": "2026-09-08",
     "close": 82
    },
    {
     "date": "2026-09-09",
     "close": 81.39
    },
    {
     "date": "2026-09-10",
     "close": 81.08
    },
    {
     "date": "2026-09-11",
     "close": 81.09
    },
    {
     "date": "2026-09-15",
     "close": 79.15
    },
    {
     "date": "2026-09-16",
     "close": 78.95
    },
    {
     "date": "2026-09-17",
     "close": 79.31
    },
    {
     "date": "2026-09-18",
     "close": 81.5
    },
    {
     "date": "2026-09-21",
     "close": 80.22
    },
    {
     "date": "2026-09-22",
     "close": 80
    },
    {
     "date": "2026-09-23",
     "close": 81
    },
    {
     "date": "2026-09-24",
     "close": 79.86
    },
    {
     "date": "2026-09-25",
     "close": 79.95
    },
    {
     "date": "2026-09-28",
     "close": 78.55
    },
    {
     "date": "2026-09-29",
     "close": 80.26
    },
    {
     "date": "2026-09-30",
     "close": 79.28
    },
    {
     "date": "2026-10-01",
     "close": 77.06
    },
    {
     "date": "2026-10-05",
     "close": 76.5
    },
    {
     "date": "2026-10-06",
     "close": 77.1
    },
    {
     "date": "2026-10-07",
     "close": 76.15
    },
    {
     "date": "2026-10-08",
     "close": 74.3
    },
    {
     "date": "2026-10-09",
     "close": 74.7
    },
    {
     "date": "2026-10-12",
     "close": 77.5
    },
    {
     "date": "2026-10-13",
     "close": 79.62
    },
    {
     "date": "2026-10-14",
     "close": 79.75
    },
    {
     "date": "2026-10-15",
     "close": 78.9
    },
    {
     "date": "2026-10-16",
     "close": 80.25
    },
    {
     "date": "2026-10-19",
     "close": 78.44
    },
    {
     "date": "2026-10-21",
     "close": 76.8
    }
   ],
   "sector": "Financial Services",
   "industry": "Credit Services"
  },
  "ITC": {
   "price": 258.9,
   "prevClose": 260.8,
   "change": -1.9,
   "changePct": -0.73,
   "dayHigh": 261,
   "dayLow": 256.35,
   "high52": 426.4,
   "low52": 253.15,
   "volume": 15277449,
   "longName": "ITC Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 280.8
    },
    {
     "date": "2026-07-23",
     "close": 281.3
    },
    {
     "date": "2026-07-24",
     "close": 283.45
    },
    {
     "date": "2026-07-27",
     "close": 285.85
    },
    {
     "date": "2026-07-28",
     "close": 284.65
    },
    {
     "date": "2026-07-29",
     "close": 286.25
    },
    {
     "date": "2026-07-30",
     "close": 285.05
    },
    {
     "date": "2026-07-31",
     "close": 281
    },
    {
     "date": "2026-08-03",
     "close": 287
    },
    {
     "date": "2026-08-04",
     "close": 289
    },
    {
     "date": "2026-08-05",
     "close": 286.95
    },
    {
     "date": "2026-08-06",
     "close": 285.9
    },
    {
     "date": "2026-08-07",
     "close": 286.1
    },
    {
     "date": "2026-08-10",
     "close": 282.65
    },
    {
     "date": "2026-08-11",
     "close": 279
    },
    {
     "date": "2026-08-12",
     "close": 276.15
    },
    {
     "date": "2026-08-13",
     "close": 278.5
    },
    {
     "date": "2026-08-14",
     "close": 278.2
    },
    {
     "date": "2026-08-17",
     "close": 273.05
    },
    {
     "date": "2026-08-18",
     "close": 270
    },
    {
     "date": "2026-08-19",
     "close": 267.05
    },
    {
     "date": "2026-08-20",
     "close": 271.65
    },
    {
     "date": "2026-08-21",
     "close": 269.4
    },
    {
     "date": "2026-08-24",
     "close": 269.7
    },
    {
     "date": "2026-08-25",
     "close": 271.4
    },
    {
     "date": "2026-08-26",
     "close": 270.25
    },
    {
     "date": "2026-08-27",
     "close": 269
    },
    {
     "date": "2026-08-28",
     "close": 266
    },
    {
     "date": "2026-08-31",
     "close": 255.5
    },
    {
     "date": "2026-09-01",
     "close": 266.6
    },
    {
     "date": "2026-09-02",
     "close": 266.3
    },
    {
     "date": "2026-09-03",
     "close": 263
    },
    {
     "date": "2026-09-04",
     "close": 264.1
    },
    {
     "date": "2026-09-07",
     "close": 263.5
    },
    {
     "date": "2026-09-08",
     "close": 263.5
    },
    {
     "date": "2026-09-09",
     "close": 260.8
    },
    {
     "date": "2026-09-10",
     "close": 259.3
    },
    {
     "date": "2026-09-11",
     "close": 259.85
    },
    {
     "date": "2026-09-15",
     "close": 258
    },
    {
     "date": "2026-09-16",
     "close": 264.15
    },
    {
     "date": "2026-09-17",
     "close": 266.2
    },
    {
     "date": "2026-09-18",
     "close": 262.3
    },
    {
     "date": "2026-09-21",
     "close": 267
    },
    {
     "date": "2026-09-22",
     "close": 265.8
    },
    {
     "date": "2026-09-23",
     "close": 270.15
    },
    {
     "date": "2026-09-24",
     "close": 268
    },
    {
     "date": "2026-09-25",
     "close": 269
    },
    {
     "date": "2026-09-28",
     "close": 265.2
    },
    {
     "date": "2026-09-29",
     "close": 265.1
    },
    {
     "date": "2026-09-30",
     "close": 262.75
    },
    {
     "date": "2026-10-01",
     "close": 255.9
    },
    {
     "date": "2026-10-05",
     "close": 268.9
    },
    {
     "date": "2026-10-06",
     "close": 266.7
    },
    {
     "date": "2026-10-07",
     "close": 265.7
    },
    {
     "date": "2026-10-08",
     "close": 255
    },
    {
     "date": "2026-10-09",
     "close": 266
    },
    {
     "date": "2026-10-12",
     "close": 257.9
    },
    {
     "date": "2026-10-13",
     "close": 261
    },
    {
     "date": "2026-10-14",
     "close": 261.5
    },
    {
     "date": "2026-10-15",
     "close": 263.9
    },
    {
     "date": "2026-10-16",
     "close": 263.5
    },
    {
     "date": "2026-10-19",
     "close": 260.8
    },
    {
     "date": "2026-10-21",
     "close": 262
    }
   ],
   "sector": null,
   "industry": null
  },
  "JSWSTEEL": {
   "price": 1220,
   "prevClose": 1241.3,
   "change": -21.3,
   "changePct": -1.72,
   "dayHigh": 1227.8,
   "dayLow": 1200.3,
   "high52": 1351,
   "low52": 1073.2,
   "volume": 1333154,
   "longName": "JSW Steel Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1266.9
    },
    {
     "date": "2026-07-23",
     "close": 1246.8
    },
    {
     "date": "2026-07-24",
     "close": 1240.8
    },
    {
     "date": "2026-07-27",
     "close": 1244.6
    },
    {
     "date": "2026-07-28",
     "close": 1246.9
    },
    {
     "date": "2026-07-29",
     "close": 1276.6
    },
    {
     "date": "2026-07-30",
     "close": 1270.8
    },
    {
     "date": "2026-07-31",
     "close": 1270
    },
    {
     "date": "2026-08-03",
     "close": 1292.3
    },
    {
     "date": "2026-08-04",
     "close": 1300
    },
    {
     "date": "2026-08-05",
     "close": 1330
    },
    {
     "date": "2026-08-06",
     "close": 1307.9
    },
    {
     "date": "2026-08-07",
     "close": 1299.5
    },
    {
     "date": "2026-08-10",
     "close": 1302
    },
    {
     "date": "2026-08-11",
     "close": 1283.4
    },
    {
     "date": "2026-08-12",
     "close": 1269.1
    },
    {
     "date": "2026-08-13",
     "close": 1275
    },
    {
     "date": "2026-08-14",
     "close": 1270
    },
    {
     "date": "2026-08-17",
     "close": 1277.8
    },
    {
     "date": "2026-08-18",
     "close": 1267.6
    },
    {
     "date": "2026-08-19",
     "close": 1285.8
    },
    {
     "date": "2026-08-20",
     "close": 1299.7
    },
    {
     "date": "2026-08-21",
     "close": 1293.7
    },
    {
     "date": "2026-08-24",
     "close": 1327
    },
    {
     "date": "2026-08-25",
     "close": 1320.3
    },
    {
     "date": "2026-08-26",
     "close": 1341
    },
    {
     "date": "2026-08-27",
     "close": 1337.5
    },
    {
     "date": "2026-08-28",
     "close": 1334.9
    },
    {
     "date": "2026-08-31",
     "close": 1307.7
    },
    {
     "date": "2026-09-01",
     "close": 1313.5
    },
    {
     "date": "2026-09-02",
     "close": 1306
    },
    {
     "date": "2026-09-03",
     "close": 1308
    },
    {
     "date": "2026-09-04",
     "close": 1325
    },
    {
     "date": "2026-09-07",
     "close": 1302
    },
    {
     "date": "2026-09-08",
     "close": 1297.3
    },
    {
     "date": "2026-09-09",
     "close": 1310
    },
    {
     "date": "2026-09-10",
     "close": 1304
    },
    {
     "date": "2026-09-11",
     "close": 1265
    },
    {
     "date": "2026-09-15",
     "close": 1229.2
    },
    {
     "date": "2026-09-16",
     "close": 1248.9
    },
    {
     "date": "2026-09-17",
     "close": 1253.4
    },
    {
     "date": "2026-09-18",
     "close": 1275.6
    },
    {
     "date": "2026-09-21",
     "close": 1268.6
    },
    {
     "date": "2026-09-22",
     "close": 1267
    },
    {
     "date": "2026-09-23",
     "close": 1297.8
    },
    {
     "date": "2026-09-24",
     "close": 1273.2
    },
    {
     "date": "2026-09-25",
     "close": 1277
    },
    {
     "date": "2026-09-28",
     "close": 1264.1
    },
    {
     "date": "2026-09-29",
     "close": 1272.4
    },
    {
     "date": "2026-09-30",
     "close": 1253.4
    },
    {
     "date": "2026-10-01",
     "close": 1233
    },
    {
     "date": "2026-10-05",
     "close": 1235.3
    },
    {
     "date": "2026-10-06",
     "close": 1259.6
    },
    {
     "date": "2026-10-07",
     "close": 1230
    },
    {
     "date": "2026-10-08",
     "close": 1175.2
    },
    {
     "date": "2026-10-09",
     "close": 1168
    },
    {
     "date": "2026-10-12",
     "close": 1173
    },
    {
     "date": "2026-10-13",
     "close": 1176.6
    },
    {
     "date": "2026-10-14",
     "close": 1176.2
    },
    {
     "date": "2026-10-15",
     "close": 1200.4
    },
    {
     "date": "2026-10-16",
     "close": 1216.3
    },
    {
     "date": "2026-10-19",
     "close": 1241.3
    },
    {
     "date": "2026-10-21",
     "close": 1222.9
    }
   ],
   "sector": "Basic Materials",
   "industry": "Steel"
  },
  "KOTAKBANK": {
   "price": 437,
   "prevClose": 442.3,
   "change": -5.3,
   "changePct": -1.2,
   "dayHigh": 442.5,
   "dayLow": 433.75,
   "high52": 453.1,
   "low52": 345.5,
   "volume": 16698413,
   "longName": "Kotak Mahindra Bank Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 381.15
    },
    {
     "date": "2026-07-23",
     "close": 383.35
    },
    {
     "date": "2026-07-24",
     "close": 384.75
    },
    {
     "date": "2026-07-27",
     "close": 384.65
    },
    {
     "date": "2026-07-28",
     "close": 385.3
    },
    {
     "date": "2026-07-29",
     "close": 390.2
    },
    {
     "date": "2026-07-30",
     "close": 389.4
    },
    {
     "date": "2026-07-31",
     "close": 390.3
    },
    {
     "date": "2026-08-03",
     "close": 397.5
    },
    {
     "date": "2026-08-04",
     "close": 398
    },
    {
     "date": "2026-08-05",
     "close": 400
    },
    {
     "date": "2026-08-06",
     "close": 394
    },
    {
     "date": "2026-08-07",
     "close": 390.75
    },
    {
     "date": "2026-08-10",
     "close": 393.5
    },
    {
     "date": "2026-08-11",
     "close": 392.9
    },
    {
     "date": "2026-08-12",
     "close": 390.5
    },
    {
     "date": "2026-08-13",
     "close": 392.4
    },
    {
     "date": "2026-08-14",
     "close": 391.15
    },
    {
     "date": "2026-08-17",
     "close": 392.7
    },
    {
     "date": "2026-08-18",
     "close": 387.65
    },
    {
     "date": "2026-08-19",
     "close": 390.25
    },
    {
     "date": "2026-08-20",
     "close": 397.35
    },
    {
     "date": "2026-08-21",
     "close": 402.8
    },
    {
     "date": "2026-08-24",
     "close": 401.45
    },
    {
     "date": "2026-08-25",
     "close": 401.6
    },
    {
     "date": "2026-08-26",
     "close": 416.7
    },
    {
     "date": "2026-08-27",
     "close": 424.2
    },
    {
     "date": "2026-08-28",
     "close": 423.7
    },
    {
     "date": "2026-08-31",
     "close": 419.4
    },
    {
     "date": "2026-09-01",
     "close": 425
    },
    {
     "date": "2026-09-02",
     "close": 423.5
    },
    {
     "date": "2026-09-03",
     "close": 421.15
    },
    {
     "date": "2026-09-04",
     "close": 424.5
    },
    {
     "date": "2026-09-07",
     "close": 422.1
    },
    {
     "date": "2026-09-08",
     "close": 419.25
    },
    {
     "date": "2026-09-09",
     "close": 414
    },
    {
     "date": "2026-09-10",
     "close": 416.55
    },
    {
     "date": "2026-09-11",
     "close": 419
    },
    {
     "date": "2026-09-15",
     "close": 409.8
    },
    {
     "date": "2026-09-16",
     "close": 415
    },
    {
     "date": "2026-09-17",
     "close": 416.5
    },
    {
     "date": "2026-09-18",
     "close": 412.5
    },
    {
     "date": "2026-09-21",
     "close": 414.8
    },
    {
     "date": "2026-09-22",
     "close": 412.65
    },
    {
     "date": "2026-09-23",
     "close": 413.25
    },
    {
     "date": "2026-09-24",
     "close": 405
    },
    {
     "date": "2026-09-25",
     "close": 404
    },
    {
     "date": "2026-09-28",
     "close": 401.55
    },
    {
     "date": "2026-09-29",
     "close": 406
    },
    {
     "date": "2026-09-30",
     "close": 417
    },
    {
     "date": "2026-10-01",
     "close": 418.35
    },
    {
     "date": "2026-10-05",
     "close": 416
    },
    {
     "date": "2026-10-06",
     "close": 431.9
    },
    {
     "date": "2026-10-07",
     "close": 440
    },
    {
     "date": "2026-10-08",
     "close": 435
    },
    {
     "date": "2026-10-09",
     "close": 441
    },
    {
     "date": "2026-10-12",
     "close": 443.4
    },
    {
     "date": "2026-10-13",
     "close": 439
    },
    {
     "date": "2026-10-14",
     "close": 438.05
    },
    {
     "date": "2026-10-15",
     "close": 447.95
    },
    {
     "date": "2026-10-16",
     "close": 447.4
    },
    {
     "date": "2026-10-19",
     "close": 442.3
    },
    {
     "date": "2026-10-21",
     "close": 437.8
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  },
  "LICI": {
   "price": 387.5,
   "prevClose": 393.35,
   "change": -5.85,
   "changePct": -1.49,
   "dayHigh": 391,
   "dayLow": 384.2,
   "high52": 468.48,
   "low52": 360.75,
   "volume": 10469640,
   "longName": "Life Insurance Corporation of India",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 423.3
    },
    {
     "date": "2026-07-23",
     "close": 421.4
    },
    {
     "date": "2026-07-24",
     "close": 421.3
    },
    {
     "date": "2026-07-27",
     "close": 424.35
    },
    {
     "date": "2026-07-28",
     "close": 427.15
    },
    {
     "date": "2026-07-29",
     "close": 423.9
    },
    {
     "date": "2026-07-30",
     "close": 422.85
    },
    {
     "date": "2026-07-31",
     "close": 424.7
    },
    {
     "date": "2026-08-03",
     "close": 428.5
    },
    {
     "date": "2026-08-04",
     "close": 391.3
    },
    {
     "date": "2026-08-05",
     "close": 393
    },
    {
     "date": "2026-08-06",
     "close": 387.55
    },
    {
     "date": "2026-08-07",
     "close": 394
    },
    {
     "date": "2026-08-10",
     "close": 393
    },
    {
     "date": "2026-08-11",
     "close": 406
    },
    {
     "date": "2026-08-12",
     "close": 417
    },
    {
     "date": "2026-08-13",
     "close": 412.15
    },
    {
     "date": "2026-08-14",
     "close": 413.5
    },
    {
     "date": "2026-08-17",
     "close": 410
    },
    {
     "date": "2026-08-18",
     "close": 410
    },
    {
     "date": "2026-08-19",
     "close": 413.1
    },
    {
     "date": "2026-08-20",
     "close": 419
    },
    {
     "date": "2026-08-21",
     "close": 422.25
    },
    {
     "date": "2026-08-24",
     "close": 421.85
    },
    {
     "date": "2026-08-25",
     "close": 424
    },
    {
     "date": "2026-08-26",
     "close": 415.3
    },
    {
     "date": "2026-08-27",
     "close": 413.95
    },
    {
     "date": "2026-08-28",
     "close": 422
    },
    {
     "date": "2026-08-31",
     "close": 418
    },
    {
     "date": "2026-09-01",
     "close": 412.15
    },
    {
     "date": "2026-09-02",
     "close": 408.25
    },
    {
     "date": "2026-09-03",
     "close": 416.9
    },
    {
     "date": "2026-09-04",
     "close": 415.35
    },
    {
     "date": "2026-09-07",
     "close": 411.5
    },
    {
     "date": "2026-09-08",
     "close": 410.75
    },
    {
     "date": "2026-09-09",
     "close": 407.5
    },
    {
     "date": "2026-09-10",
     "close": 405.6
    },
    {
     "date": "2026-09-11",
     "close": 404.1
    },
    {
     "date": "2026-09-15",
     "close": 391.5
    },
    {
     "date": "2026-09-16",
     "close": 395.5
    },
    {
     "date": "2026-09-17",
     "close": 400
    },
    {
     "date": "2026-09-18",
     "close": 407.7
    },
    {
     "date": "2026-09-21",
     "close": 400
    },
    {
     "date": "2026-09-22",
     "close": 404.55
    },
    {
     "date": "2026-09-23",
     "close": 407.5
    },
    {
     "date": "2026-09-24",
     "close": 406
    },
    {
     "date": "2026-09-25",
     "close": 409.05
    },
    {
     "date": "2026-09-28",
     "close": 400.65
    },
    {
     "date": "2026-09-29",
     "close": 390
    },
    {
     "date": "2026-09-30",
     "close": 395.2
    },
    {
     "date": "2026-10-01",
     "close": 391.85
    },
    {
     "date": "2026-10-05",
     "close": 388.7
    },
    {
     "date": "2026-10-06",
     "close": 390
    },
    {
     "date": "2026-10-07",
     "close": 386.3
    },
    {
     "date": "2026-10-08",
     "close": 379.25
    },
    {
     "date": "2026-10-09",
     "close": 394.25
    },
    {
     "date": "2026-10-12",
     "close": 391.5
    },
    {
     "date": "2026-10-13",
     "close": 394.05
    },
    {
     "date": "2026-10-14",
     "close": 394
    },
    {
     "date": "2026-10-15",
     "close": 394
    },
    {
     "date": "2026-10-16",
     "close": 397.75
    },
    {
     "date": "2026-10-19",
     "close": 393.35
    },
    {
     "date": "2026-10-21",
     "close": 392.05
    }
   ],
   "sector": "Financial Services",
   "industry": "Insurance—Life"
  },
  "LT": {
   "price": 3638.3,
   "prevClose": 3661.9,
   "change": -23.6,
   "changePct": -0.64,
   "dayHigh": 3689.9,
   "dayLow": 3595,
   "high52": 4440,
   "low52": 3288.1,
   "volume": 2631262,
   "longName": "Larsen & Toubro Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 3817.4
    },
    {
     "date": "2026-07-23",
     "close": 3792.4
    },
    {
     "date": "2026-07-24",
     "close": 3785.6
    },
    {
     "date": "2026-07-27",
     "close": 3806
    },
    {
     "date": "2026-07-28",
     "close": 3832
    },
    {
     "date": "2026-07-29",
     "close": 3931.4
    },
    {
     "date": "2026-07-30",
     "close": 3937.7
    },
    {
     "date": "2026-07-31",
     "close": 3938.9
    },
    {
     "date": "2026-08-03",
     "close": 4025
    },
    {
     "date": "2026-08-04",
     "close": 3990
    },
    {
     "date": "2026-08-05",
     "close": 4057
    },
    {
     "date": "2026-08-06",
     "close": 4061.8
    },
    {
     "date": "2026-08-07",
     "close": 4056
    },
    {
     "date": "2026-08-10",
     "close": 4080
    },
    {
     "date": "2026-08-11",
     "close": 4037.4
    },
    {
     "date": "2026-08-12",
     "close": 4020
    },
    {
     "date": "2026-08-13",
     "close": 4070.7
    },
    {
     "date": "2026-08-14",
     "close": 4057
    },
    {
     "date": "2026-08-17",
     "close": 4086.7
    },
    {
     "date": "2026-08-18",
     "close": 4064.3
    },
    {
     "date": "2026-08-19",
     "close": 4041.3
    },
    {
     "date": "2026-08-20",
     "close": 4081
    },
    {
     "date": "2026-08-21",
     "close": 4093
    },
    {
     "date": "2026-08-24",
     "close": 4090
    },
    {
     "date": "2026-08-25",
     "close": 4119
    },
    {
     "date": "2026-08-26",
     "close": 4038.1
    },
    {
     "date": "2026-08-27",
     "close": 4027
    },
    {
     "date": "2026-08-28",
     "close": 4045.8
    },
    {
     "date": "2026-08-31",
     "close": 4044.9
    },
    {
     "date": "2026-09-01",
     "close": 3980.1
    },
    {
     "date": "2026-09-02",
     "close": 3981
    },
    {
     "date": "2026-09-03",
     "close": 3975
    },
    {
     "date": "2026-09-04",
     "close": 3964.1
    },
    {
     "date": "2026-09-07",
     "close": 3999
    },
    {
     "date": "2026-09-08",
     "close": 3946.1
    },
    {
     "date": "2026-09-09",
     "close": 3922.6
    },
    {
     "date": "2026-09-10",
     "close": 3955
    },
    {
     "date": "2026-09-11",
     "close": 3930.7
    },
    {
     "date": "2026-09-15",
     "close": 3850.7
    },
    {
     "date": "2026-09-16",
     "close": 3807.7
    },
    {
     "date": "2026-09-17",
     "close": 3836.2
    },
    {
     "date": "2026-09-18",
     "close": 3885
    },
    {
     "date": "2026-09-21",
     "close": 3904.8
    },
    {
     "date": "2026-09-22",
     "close": 3866.4
    },
    {
     "date": "2026-09-23",
     "close": 3929.9
    },
    {
     "date": "2026-09-24",
     "close": 3858.4
    },
    {
     "date": "2026-09-25",
     "close": 3876.2
    },
    {
     "date": "2026-09-28",
     "close": 3766.4
    },
    {
     "date": "2026-09-29",
     "close": 3749.1
    },
    {
     "date": "2026-09-30",
     "close": 3760
    },
    {
     "date": "2026-10-01",
     "close": 3693.4
    },
    {
     "date": "2026-10-05",
     "close": 3750
    },
    {
     "date": "2026-10-06",
     "close": 3770
    },
    {
     "date": "2026-10-07",
     "close": 3701.5
    },
    {
     "date": "2026-10-08",
     "close": 3625.1
    },
    {
     "date": "2026-10-09",
     "close": 3703.3
    },
    {
     "date": "2026-10-12",
     "close": 3627.5
    },
    {
     "date": "2026-10-13",
     "close": 3675
    },
    {
     "date": "2026-10-14",
     "close": 3642
    },
    {
     "date": "2026-10-15",
     "close": 3632
    },
    {
     "date": "2026-10-16",
     "close": 3627.1
    },
    {
     "date": "2026-10-19",
     "close": 3661.9
    },
    {
     "date": "2026-10-21",
     "close": 3636
    }
   ],
   "sector": "Industrials",
   "industry": "Engineering & Construction"
  },
  "M&M": {
   "price": 2864.1,
   "prevClose": 2907,
   "change": -42.9,
   "changePct": -1.48,
   "dayHigh": 2873,
   "dayLow": 2818.2,
   "high52": 3839.9,
   "low52": 2744.3,
   "volume": 1756091,
   "longName": "Mahindra & Mahindra Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 3175.3
    },
    {
     "date": "2026-07-23",
     "close": 3229.7
    },
    {
     "date": "2026-07-24",
     "close": 3161.4
    },
    {
     "date": "2026-07-27",
     "close": 3238.6
    },
    {
     "date": "2026-07-28",
     "close": 3271.2
    },
    {
     "date": "2026-07-29",
     "close": 3221.8
    },
    {
     "date": "2026-07-30",
     "close": 3283.7
    },
    {
     "date": "2026-07-31",
     "close": 3398.5
    },
    {
     "date": "2026-08-03",
     "close": 3428.6
    },
    {
     "date": "2026-08-04",
     "close": 3433
    },
    {
     "date": "2026-08-05",
     "close": 3455.4
    },
    {
     "date": "2026-08-06",
     "close": 3406
    },
    {
     "date": "2026-08-07",
     "close": 3502
    },
    {
     "date": "2026-08-10",
     "close": 3517
    },
    {
     "date": "2026-08-11",
     "close": 3460.1
    },
    {
     "date": "2026-08-12",
     "close": 3403.6
    },
    {
     "date": "2026-08-13",
     "close": 3428.2
    },
    {
     "date": "2026-08-14",
     "close": 3428.3
    },
    {
     "date": "2026-08-17",
     "close": 3390.4
    },
    {
     "date": "2026-08-18",
     "close": 3421.5
    },
    {
     "date": "2026-08-19",
     "close": 3415
    },
    {
     "date": "2026-08-20",
     "close": 3424.8
    },
    {
     "date": "2026-08-21",
     "close": 3412.2
    },
    {
     "date": "2026-08-24",
     "close": 3414.1
    },
    {
     "date": "2026-08-25",
     "close": 3443
    },
    {
     "date": "2026-08-26",
     "close": 3398.2
    },
    {
     "date": "2026-08-27",
     "close": 3330
    },
    {
     "date": "2026-08-28",
     "close": 3334
    },
    {
     "date": "2026-08-31",
     "close": 3282
    },
    {
     "date": "2026-09-01",
     "close": 3259
    },
    {
     "date": "2026-09-02",
     "close": 3190
    },
    {
     "date": "2026-09-03",
     "close": 3150
    },
    {
     "date": "2026-09-04",
     "close": 3170
    },
    {
     "date": "2026-09-07",
     "close": 3160
    },
    {
     "date": "2026-09-08",
     "close": 3160
    },
    {
     "date": "2026-09-09",
     "close": 3150
    },
    {
     "date": "2026-09-10",
     "close": 3123.8
    },
    {
     "date": "2026-09-11",
     "close": 3107
    },
    {
     "date": "2026-09-15",
     "close": 3029.5
    },
    {
     "date": "2026-09-16",
     "close": 3070
    },
    {
     "date": "2026-09-17",
     "close": 3076.5
    },
    {
     "date": "2026-09-18",
     "close": 3052
    },
    {
     "date": "2026-09-21",
     "close": 3055.3
    },
    {
     "date": "2026-09-22",
     "close": 3044.5
    },
    {
     "date": "2026-09-23",
     "close": 3035
    },
    {
     "date": "2026-09-24",
     "close": 2982.7
    },
    {
     "date": "2026-09-25",
     "close": 3035
    },
    {
     "date": "2026-09-28",
     "close": 2995
    },
    {
     "date": "2026-09-29",
     "close": 2947.8
    },
    {
     "date": "2026-09-30",
     "close": 2950
    },
    {
     "date": "2026-10-01",
     "close": 2860
    },
    {
     "date": "2026-10-05",
     "close": 2857.6
    },
    {
     "date": "2026-10-06",
     "close": 2855
    },
    {
     "date": "2026-10-07",
     "close": 2800
    },
    {
     "date": "2026-10-08",
     "close": 2751.2
    },
    {
     "date": "2026-10-09",
     "close": 2796.2
    },
    {
     "date": "2026-10-12",
     "close": 2813
    },
    {
     "date": "2026-10-13",
     "close": 2864.4
    },
    {
     "date": "2026-10-14",
     "close": 2793.7
    },
    {
     "date": "2026-10-15",
     "close": 2861.7
    },
    {
     "date": "2026-10-16",
     "close": 2920.9
    },
    {
     "date": "2026-10-19",
     "close": 2907
    },
    {
     "date": "2026-10-21",
     "close": 2889
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Auto Manufacturers"
  },
  "MARUTI": {
   "price": 11170,
   "prevClose": 11475,
   "change": -305,
   "changePct": -2.66,
   "dayHigh": 11208,
   "dayLow": 10985,
   "high52": 17370,
   "low52": 10985,
   "volume": 407458,
   "longName": "Maruti Suzuki India Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 13545
    },
    {
     "date": "2026-07-23",
     "close": 13403
    },
    {
     "date": "2026-07-24",
     "close": 13442
    },
    {
     "date": "2026-07-27",
     "close": 13730
    },
    {
     "date": "2026-07-28",
     "close": 13802
    },
    {
     "date": "2026-07-29",
     "close": 13948
    },
    {
     "date": "2026-07-30",
     "close": 14188
    },
    {
     "date": "2026-07-31",
     "close": 14234
    },
    {
     "date": "2026-08-03",
     "close": 14150
    },
    {
     "date": "2026-08-04",
     "close": 14168
    },
    {
     "date": "2026-08-05",
     "close": 14190
    },
    {
     "date": "2026-08-06",
     "close": 14080
    },
    {
     "date": "2026-08-07",
     "close": 14037
    },
    {
     "date": "2026-08-10",
     "close": 14097
    },
    {
     "date": "2026-08-11",
     "close": 13990
    },
    {
     "date": "2026-08-12",
     "close": 13875
    },
    {
     "date": "2026-08-13",
     "close": 13905
    },
    {
     "date": "2026-08-14",
     "close": 13834
    },
    {
     "date": "2026-08-17",
     "close": 13760
    },
    {
     "date": "2026-08-18",
     "close": 13691
    },
    {
     "date": "2026-08-19",
     "close": 13690
    },
    {
     "date": "2026-08-20",
     "close": 13809
    },
    {
     "date": "2026-08-21",
     "close": 13565
    },
    {
     "date": "2026-08-24",
     "close": 13620
    },
    {
     "date": "2026-08-25",
     "close": 13678
    },
    {
     "date": "2026-08-26",
     "close": 13520
    },
    {
     "date": "2026-08-27",
     "close": 13440
    },
    {
     "date": "2026-08-28",
     "close": 13376
    },
    {
     "date": "2026-08-31",
     "close": 13547
    },
    {
     "date": "2026-09-01",
     "close": 12950
    },
    {
     "date": "2026-09-02",
     "close": 12849
    },
    {
     "date": "2026-09-03",
     "close": 12857
    },
    {
     "date": "2026-09-04",
     "close": 12694
    },
    {
     "date": "2026-09-07",
     "close": 12760
    },
    {
     "date": "2026-09-08",
     "close": 12641
    },
    {
     "date": "2026-09-09",
     "close": 12618
    },
    {
     "date": "2026-09-10",
     "close": 12590
    },
    {
     "date": "2026-09-11",
     "close": 12400
    },
    {
     "date": "2026-09-15",
     "close": 12231
    },
    {
     "date": "2026-09-16",
     "close": 12166
    },
    {
     "date": "2026-09-17",
     "close": 12338
    },
    {
     "date": "2026-09-18",
     "close": 12103
    },
    {
     "date": "2026-09-21",
     "close": 12153
    },
    {
     "date": "2026-09-22",
     "close": 12190
    },
    {
     "date": "2026-09-23",
     "close": 12230
    },
    {
     "date": "2026-09-24",
     "close": 11990
    },
    {
     "date": "2026-09-25",
     "close": 12065
    },
    {
     "date": "2026-09-28",
     "close": 12008
    },
    {
     "date": "2026-09-29",
     "close": 11877
    },
    {
     "date": "2026-09-30",
     "close": 11967
    },
    {
     "date": "2026-10-01",
     "close": 11386
    },
    {
     "date": "2026-10-05",
     "close": 11532
    },
    {
     "date": "2026-10-06",
     "close": 11625
    },
    {
     "date": "2026-10-07",
     "close": 11450
    },
    {
     "date": "2026-10-08",
     "close": 11228
    },
    {
     "date": "2026-10-09",
     "close": 11420
    },
    {
     "date": "2026-10-12",
     "close": 11315
    },
    {
     "date": "2026-10-13",
     "close": 11245
    },
    {
     "date": "2026-10-14",
     "close": 11178
    },
    {
     "date": "2026-10-15",
     "close": 11445
    },
    {
     "date": "2026-10-16",
     "close": 11489
    },
    {
     "date": "2026-10-19",
     "close": 11475
    },
    {
     "date": "2026-10-21",
     "close": 11200
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Auto Manufacturers"
  },
  "NESTLEIND": {
   "price": 1189.9,
   "prevClose": 1242.7,
   "change": -52.8,
   "changePct": -4.25,
   "dayHigh": 1210,
   "dayLow": 1181.3,
   "high52": 1553,
   "low52": 1159.4,
   "volume": 1993076,
   "longName": "Nestlé India Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1493.6
    },
    {
     "date": "2026-07-23",
     "close": 1447.9
    },
    {
     "date": "2026-07-24",
     "close": 1443.5
    },
    {
     "date": "2026-07-27",
     "close": 1446.1
    },
    {
     "date": "2026-07-28",
     "close": 1491.8
    },
    {
     "date": "2026-07-29",
     "close": 1503.3
    },
    {
     "date": "2026-07-30",
     "close": 1520.7
    },
    {
     "date": "2026-07-31",
     "close": 1509.6
    },
    {
     "date": "2026-08-03",
     "close": 1530
    },
    {
     "date": "2026-08-04",
     "close": 1520
    },
    {
     "date": "2026-08-05",
     "close": 1520
    },
    {
     "date": "2026-08-06",
     "close": 1535
    },
    {
     "date": "2026-08-07",
     "close": 1540
    },
    {
     "date": "2026-08-10",
     "close": 1528.6
    },
    {
     "date": "2026-08-11",
     "close": 1493.2
    },
    {
     "date": "2026-08-12",
     "close": 1507
    },
    {
     "date": "2026-08-13",
     "close": 1506.9
    },
    {
     "date": "2026-08-14",
     "close": 1499.1
    },
    {
     "date": "2026-08-17",
     "close": 1470
    },
    {
     "date": "2026-08-18",
     "close": 1462.5
    },
    {
     "date": "2026-08-19",
     "close": 1465
    },
    {
     "date": "2026-08-20",
     "close": 1458
    },
    {
     "date": "2026-08-21",
     "close": 1477.1
    },
    {
     "date": "2026-08-24",
     "close": 1471.3
    },
    {
     "date": "2026-08-25",
     "close": 1479
    },
    {
     "date": "2026-08-26",
     "close": 1451.5
    },
    {
     "date": "2026-08-27",
     "close": 1450
    },
    {
     "date": "2026-08-28",
     "close": 1454.6
    },
    {
     "date": "2026-08-31",
     "close": 1496.5
    },
    {
     "date": "2026-09-01",
     "close": 1438.2
    },
    {
     "date": "2026-09-02",
     "close": 1425
    },
    {
     "date": "2026-09-03",
     "close": 1416
    },
    {
     "date": "2026-09-04",
     "close": 1410.5
    },
    {
     "date": "2026-09-07",
     "close": 1398
    },
    {
     "date": "2026-09-08",
     "close": 1400.5
    },
    {
     "date": "2026-09-09",
     "close": 1393
    },
    {
     "date": "2026-09-10",
     "close": 1386.2
    },
    {
     "date": "2026-09-11",
     "close": 1383.3
    },
    {
     "date": "2026-09-15",
     "close": 1362
    },
    {
     "date": "2026-09-16",
     "close": 1384.5
    },
    {
     "date": "2026-09-17",
     "close": 1370.6
    },
    {
     "date": "2026-09-18",
     "close": 1372.4
    },
    {
     "date": "2026-09-21",
     "close": 1385
    },
    {
     "date": "2026-09-22",
     "close": 1363.9
    },
    {
     "date": "2026-09-23",
     "close": 1387.2
    },
    {
     "date": "2026-09-24",
     "close": 1351
    },
    {
     "date": "2026-09-25",
     "close": 1362.6
    },
    {
     "date": "2026-09-28",
     "close": 1346
    },
    {
     "date": "2026-09-29",
     "close": 1345.7
    },
    {
     "date": "2026-09-30",
     "close": 1310
    },
    {
     "date": "2026-10-01",
     "close": 1307.7
    },
    {
     "date": "2026-10-05",
     "close": 1297.1
    },
    {
     "date": "2026-10-06",
     "close": 1341.4
    },
    {
     "date": "2026-10-07",
     "close": 1324
    },
    {
     "date": "2026-10-08",
     "close": 1319
    },
    {
     "date": "2026-10-09",
     "close": 1333
    },
    {
     "date": "2026-10-12",
     "close": 1324.7
    },
    {
     "date": "2026-10-13",
     "close": 1334
    },
    {
     "date": "2026-10-14",
     "close": 1383.2
    },
    {
     "date": "2026-10-15",
     "close": 1275.8
    },
    {
     "date": "2026-10-16",
     "close": 1265.5
    },
    {
     "date": "2026-10-19",
     "close": 1242.7
    },
    {
     "date": "2026-10-21",
     "close": 1223.9
    }
   ],
   "sector": "Consumer Defensive",
   "industry": "Packaged Foods"
  },
  "NHPC": {
   "price": 72.38,
   "prevClose": 70.7,
   "change": 1.68,
   "changePct": 2.38,
   "dayHigh": 72.74,
   "dayLow": 71.7,
   "high52": 87.29,
   "low52": 70.25,
   "volume": 7046188,
   "longName": "NHPC Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 80.28
    },
    {
     "date": "2026-07-23",
     "close": 80.25
    },
    {
     "date": "2026-07-24",
     "close": 79.39
    },
    {
     "date": "2026-07-27",
     "close": 79.72
    },
    {
     "date": "2026-07-28",
     "close": 78.28
    },
    {
     "date": "2026-07-29",
     "close": 77.9
    },
    {
     "date": "2026-07-30",
     "close": 78.07
    },
    {
     "date": "2026-07-31",
     "close": 78.73
    },
    {
     "date": "2026-08-03",
     "close": 79.25
    },
    {
     "date": "2026-08-04",
     "close": 80.5
    },
    {
     "date": "2026-08-05",
     "close": 78.6
    },
    {
     "date": "2026-08-06",
     "close": 77.5
    },
    {
     "date": "2026-08-07",
     "close": 76.92
    },
    {
     "date": "2026-08-10",
     "close": 77.2
    },
    {
     "date": "2026-08-11",
     "close": 76.95
    },
    {
     "date": "2026-08-12",
     "close": 76.85
    },
    {
     "date": "2026-08-13",
     "close": 77.5
    },
    {
     "date": "2026-08-14",
     "close": 76.9
    },
    {
     "date": "2026-08-17",
     "close": 76.6
    },
    {
     "date": "2026-08-18",
     "close": 76.73
    },
    {
     "date": "2026-08-19",
     "close": 76.17
    },
    {
     "date": "2026-08-20",
     "close": 76.35
    },
    {
     "date": "2026-08-21",
     "close": 76.15
    },
    {
     "date": "2026-08-24",
     "close": 76.65
    },
    {
     "date": "2026-08-25",
     "close": 76.62
    },
    {
     "date": "2026-08-26",
     "close": 76.24
    },
    {
     "date": "2026-08-27",
     "close": 76.55
    },
    {
     "date": "2026-08-28",
     "close": 74.82
    },
    {
     "date": "2026-08-31",
     "close": 76.72
    },
    {
     "date": "2026-09-01",
     "close": 76.3
    },
    {
     "date": "2026-09-02",
     "close": 75.65
    },
    {
     "date": "2026-09-03",
     "close": 76.45
    },
    {
     "date": "2026-09-04",
     "close": 76.25
    },
    {
     "date": "2026-09-07",
     "close": 76
    },
    {
     "date": "2026-09-08",
     "close": 75.9
    },
    {
     "date": "2026-09-09",
     "close": 76.69
    },
    {
     "date": "2026-09-10",
     "close": 76.35
    },
    {
     "date": "2026-09-11",
     "close": 76.38
    },
    {
     "date": "2026-09-15",
     "close": 76.04
    },
    {
     "date": "2026-09-16",
     "close": 75.41
    },
    {
     "date": "2026-09-17",
     "close": 75.2
    },
    {
     "date": "2026-09-18",
     "close": 76.95
    },
    {
     "date": "2026-09-21",
     "close": 75.8
    },
    {
     "date": "2026-09-22",
     "close": 76.01
    },
    {
     "date": "2026-09-23",
     "close": 76.74
    },
    {
     "date": "2026-09-24",
     "close": 76.25
    },
    {
     "date": "2026-09-25",
     "close": 76
    },
    {
     "date": "2026-09-28",
     "close": 74.5
    },
    {
     "date": "2026-09-29",
     "close": 73.32
    },
    {
     "date": "2026-09-30",
     "close": 72.81
    },
    {
     "date": "2026-10-01",
     "close": 71.75
    },
    {
     "date": "2026-10-05",
     "close": 72
    },
    {
     "date": "2026-10-06",
     "close": 73.11
    },
    {
     "date": "2026-10-07",
     "close": 72.5
    },
    {
     "date": "2026-10-08",
     "close": 71.65
    },
    {
     "date": "2026-10-09",
     "close": 72.99
    },
    {
     "date": "2026-10-12",
     "close": 73.4
    },
    {
     "date": "2026-10-13",
     "close": 73.49
    },
    {
     "date": "2026-10-14",
     "close": 73.72
    },
    {
     "date": "2026-10-15",
     "close": 72.7
    },
    {
     "date": "2026-10-16",
     "close": 71.44
    },
    {
     "date": "2026-10-19",
     "close": 70.7
    },
    {
     "date": "2026-10-21",
     "close": 72.65
    }
   ],
   "sector": "Utilities",
   "industry": "Utilities—Renewable"
  },
  "NTPC": {
   "price": 302.6,
   "prevClose": 309,
   "change": -6.4,
   "changePct": -2.07,
   "dayHigh": 302.8,
   "dayLow": 297.55,
   "high52": 414.4,
   "low52": 297.55,
   "volume": 7540012,
   "longName": "NTPC Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 350.5
    },
    {
     "date": "2026-07-23",
     "close": 348.6
    },
    {
     "date": "2026-07-24",
     "close": 347.2
    },
    {
     "date": "2026-07-27",
     "close": 350.8
    },
    {
     "date": "2026-07-28",
     "close": 343.75
    },
    {
     "date": "2026-07-29",
     "close": 343.5
    },
    {
     "date": "2026-07-30",
     "close": 344.85
    },
    {
     "date": "2026-07-31",
     "close": 347.25
    },
    {
     "date": "2026-08-03",
     "close": 350.9
    },
    {
     "date": "2026-08-04",
     "close": 343.65
    },
    {
     "date": "2026-08-05",
     "close": 349.9
    },
    {
     "date": "2026-08-06",
     "close": 345
    },
    {
     "date": "2026-08-07",
     "close": 342.5
    },
    {
     "date": "2026-08-10",
     "close": 340.45
    },
    {
     "date": "2026-08-11",
     "close": 338.45
    },
    {
     "date": "2026-08-12",
     "close": 339.45
    },
    {
     "date": "2026-08-13",
     "close": 344.25
    },
    {
     "date": "2026-08-14",
     "close": 340
    },
    {
     "date": "2026-08-17",
     "close": 337
    },
    {
     "date": "2026-08-18",
     "close": 337.1
    },
    {
     "date": "2026-08-19",
     "close": 336.55
    },
    {
     "date": "2026-08-20",
     "close": 337.5
    },
    {
     "date": "2026-08-21",
     "close": 340
    },
    {
     "date": "2026-08-24",
     "close": 339.5
    },
    {
     "date": "2026-08-25",
     "close": 339.85
    },
    {
     "date": "2026-08-26",
     "close": 334.6
    },
    {
     "date": "2026-08-27",
     "close": 330.9
    },
    {
     "date": "2026-08-28",
     "close": 330.05
    },
    {
     "date": "2026-08-31",
     "close": 327.4
    },
    {
     "date": "2026-09-01",
     "close": 327.5
    },
    {
     "date": "2026-09-02",
     "close": 330
    },
    {
     "date": "2026-09-03",
     "close": 330.9
    },
    {
     "date": "2026-09-04",
     "close": 332.5
    },
    {
     "date": "2026-09-07",
     "close": 332
    },
    {
     "date": "2026-09-08",
     "close": 330.8
    },
    {
     "date": "2026-09-09",
     "close": 334.5
    },
    {
     "date": "2026-09-10",
     "close": 335
    },
    {
     "date": "2026-09-11",
     "close": 333.4
    },
    {
     "date": "2026-09-15",
     "close": 329.5
    },
    {
     "date": "2026-09-16",
     "close": 327
    },
    {
     "date": "2026-09-17",
     "close": 329.6
    },
    {
     "date": "2026-09-18",
     "close": 323.65
    },
    {
     "date": "2026-09-21",
     "close": 326.4
    },
    {
     "date": "2026-09-22",
     "close": 327.8
    },
    {
     "date": "2026-09-23",
     "close": 326
    },
    {
     "date": "2026-09-24",
     "close": 326.6
    },
    {
     "date": "2026-09-25",
     "close": 326.6
    },
    {
     "date": "2026-09-28",
     "close": 321.1
    },
    {
     "date": "2026-09-29",
     "close": 323.5
    },
    {
     "date": "2026-09-30",
     "close": 322.75
    },
    {
     "date": "2026-10-01",
     "close": 315.1
    },
    {
     "date": "2026-10-05",
     "close": 321.8
    },
    {
     "date": "2026-10-06",
     "close": 321.45
    },
    {
     "date": "2026-10-07",
     "close": 316.75
    },
    {
     "date": "2026-10-08",
     "close": 309.7
    },
    {
     "date": "2026-10-09",
     "close": 312
    },
    {
     "date": "2026-10-12",
     "close": 310
    },
    {
     "date": "2026-10-13",
     "close": 311
    },
    {
     "date": "2026-10-14",
     "close": 313.7
    },
    {
     "date": "2026-10-15",
     "close": 314.65
    },
    {
     "date": "2026-10-16",
     "close": 315.15
    },
    {
     "date": "2026-10-19",
     "close": 309
    },
    {
     "date": "2026-10-21",
     "close": 303
    }
   ],
   "sector": "Utilities",
   "industry": "Utilities—Regulated Electric"
  },
  "ONGC": {
   "price": 225,
   "prevClose": 225,
   "change": 0,
   "changePct": 0,
   "dayHigh": 226.2,
   "dayLow": 224,
   "high52": 307.5,
   "low52": 218.53,
   "volume": 9713001,
   "longName": "Oil and Natural Gas Corporation Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 251.9
    },
    {
     "date": "2026-07-23",
     "close": 252.37
    },
    {
     "date": "2026-07-24",
     "close": 248.76
    },
    {
     "date": "2026-07-27",
     "close": 238.56
    },
    {
     "date": "2026-07-28",
     "close": 238.91
    },
    {
     "date": "2026-07-29",
     "close": 238.31
    },
    {
     "date": "2026-07-30",
     "close": 241.59
    },
    {
     "date": "2026-07-31",
     "close": 242.53
    },
    {
     "date": "2026-08-03",
     "close": 242
    },
    {
     "date": "2026-08-04",
     "close": 242
    },
    {
     "date": "2026-08-05",
     "close": 240.2
    },
    {
     "date": "2026-08-06",
     "close": 237.8
    },
    {
     "date": "2026-08-07",
     "close": 238.85
    },
    {
     "date": "2026-08-10",
     "close": 239.84
    },
    {
     "date": "2026-08-11",
     "close": 239.45
    },
    {
     "date": "2026-08-12",
     "close": 239.05
    },
    {
     "date": "2026-08-13",
     "close": 239.9
    },
    {
     "date": "2026-08-14",
     "close": 236.4
    },
    {
     "date": "2026-08-17",
     "close": 238.49
    },
    {
     "date": "2026-08-18",
     "close": 239.5
    },
    {
     "date": "2026-08-19",
     "close": 238
    },
    {
     "date": "2026-08-20",
     "close": 238.5
    },
    {
     "date": "2026-08-21",
     "close": 236.4
    },
    {
     "date": "2026-08-24",
     "close": 236.55
    },
    {
     "date": "2026-08-25",
     "close": 234
    },
    {
     "date": "2026-08-26",
     "close": 232.21
    },
    {
     "date": "2026-08-27",
     "close": 232
    },
    {
     "date": "2026-08-28",
     "close": 232.25
    },
    {
     "date": "2026-08-31",
     "close": 231.8
    },
    {
     "date": "2026-09-01",
     "close": 236.45
    },
    {
     "date": "2026-09-02",
     "close": 237.5
    },
    {
     "date": "2026-09-03",
     "close": 236
    },
    {
     "date": "2026-09-04",
     "close": 234.65
    },
    {
     "date": "2026-09-07",
     "close": 233.7
    },
    {
     "date": "2026-09-08",
     "close": 236
    },
    {
     "date": "2026-09-09",
     "close": 234.02
    },
    {
     "date": "2026-09-10",
     "close": 237.27
    },
    {
     "date": "2026-09-11",
     "close": 232.5
    },
    {
     "date": "2026-09-15",
     "close": 235.95
    },
    {
     "date": "2026-09-16",
     "close": 236.8
    },
    {
     "date": "2026-09-17",
     "close": 232.43
    },
    {
     "date": "2026-09-18",
     "close": 232.8
    },
    {
     "date": "2026-09-21",
     "close": 235.63
    },
    {
     "date": "2026-09-22",
     "close": 236.13
    },
    {
     "date": "2026-09-23",
     "close": 236.9
    },
    {
     "date": "2026-09-24",
     "close": 239
    },
    {
     "date": "2026-09-25",
     "close": 235.86
    },
    {
     "date": "2026-09-28",
     "close": 230
    },
    {
     "date": "2026-09-29",
     "close": 230
    },
    {
     "date": "2026-09-30",
     "close": 225.8
    },
    {
     "date": "2026-10-01",
     "close": 222.37
    },
    {
     "date": "2026-10-05",
     "close": 224.9
    },
    {
     "date": "2026-10-06",
     "close": 224.2
    },
    {
     "date": "2026-10-07",
     "close": 221.88
    },
    {
     "date": "2026-10-08",
     "close": 219.8
    },
    {
     "date": "2026-10-09",
     "close": 221.27
    },
    {
     "date": "2026-10-12",
     "close": 220
    },
    {
     "date": "2026-10-13",
     "close": 222.65
    },
    {
     "date": "2026-10-14",
     "close": 225.5
    },
    {
     "date": "2026-10-15",
     "close": 224.64
    },
    {
     "date": "2026-10-16",
     "close": 222
    },
    {
     "date": "2026-10-19",
     "close": 225
    },
    {
     "date": "2026-10-21",
     "close": 225.62
    }
   ],
   "sector": "Energy",
   "industry": "Oil & Gas Integrated"
  },
  "POWERGRID": {
   "price": 248.4,
   "prevClose": 250.35,
   "change": -1.95,
   "changePct": -0.78,
   "dayHigh": 249.35,
   "dayLow": 244.65,
   "high52": 324.95,
   "low52": 244.65,
   "volume": 7028569,
   "longName": "Power Grid Corporation of India Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 289.3
    },
    {
     "date": "2026-07-23",
     "close": 289.8
    },
    {
     "date": "2026-07-24",
     "close": 288.2
    },
    {
     "date": "2026-07-27",
     "close": 288.85
    },
    {
     "date": "2026-07-28",
     "close": 285.3
    },
    {
     "date": "2026-07-29",
     "close": 282.85
    },
    {
     "date": "2026-07-30",
     "close": 285.7
    },
    {
     "date": "2026-07-31",
     "close": 284.25
    },
    {
     "date": "2026-08-03",
     "close": 287
    },
    {
     "date": "2026-08-04",
     "close": 283.4
    },
    {
     "date": "2026-08-05",
     "close": 281.75
    },
    {
     "date": "2026-08-06",
     "close": 270.75
    },
    {
     "date": "2026-08-07",
     "close": 271.6
    },
    {
     "date": "2026-08-10",
     "close": 270.1
    },
    {
     "date": "2026-08-11",
     "close": 267.95
    },
    {
     "date": "2026-08-12",
     "close": 269.45
    },
    {
     "date": "2026-08-13",
     "close": 266.6
    },
    {
     "date": "2026-08-14",
     "close": 266.05
    },
    {
     "date": "2026-08-17",
     "close": 266.15
    },
    {
     "date": "2026-08-18",
     "close": 268
    },
    {
     "date": "2026-08-19",
     "close": 263.5
    },
    {
     "date": "2026-08-20",
     "close": 264.8
    },
    {
     "date": "2026-08-21",
     "close": 272.4
    },
    {
     "date": "2026-08-24",
     "close": 271.4
    },
    {
     "date": "2026-08-25",
     "close": 271
    },
    {
     "date": "2026-08-26",
     "close": 265.2
    },
    {
     "date": "2026-08-27",
     "close": 264.9
    },
    {
     "date": "2026-08-28",
     "close": 266.05
    },
    {
     "date": "2026-08-31",
     "close": 263.55
    },
    {
     "date": "2026-09-01",
     "close": 264.55
    },
    {
     "date": "2026-09-02",
     "close": 266.8
    },
    {
     "date": "2026-09-03",
     "close": 265.6
    },
    {
     "date": "2026-09-04",
     "close": 266
    },
    {
     "date": "2026-09-07",
     "close": 266.45
    },
    {
     "date": "2026-09-08",
     "close": 265.75
    },
    {
     "date": "2026-09-09",
     "close": 265.85
    },
    {
     "date": "2026-09-10",
     "close": 271.75
    },
    {
     "date": "2026-09-11",
     "close": 269.1
    },
    {
     "date": "2026-09-15",
     "close": 262.8
    },
    {
     "date": "2026-09-16",
     "close": 262.8
    },
    {
     "date": "2026-09-17",
     "close": 263.75
    },
    {
     "date": "2026-09-18",
     "close": 270.3
    },
    {
     "date": "2026-09-21",
     "close": 266.1
    },
    {
     "date": "2026-09-22",
     "close": 265.95
    },
    {
     "date": "2026-09-23",
     "close": 270.2
    },
    {
     "date": "2026-09-24",
     "close": 266.4
    },
    {
     "date": "2026-09-25",
     "close": 269.5
    },
    {
     "date": "2026-09-28",
     "close": 261.85
    },
    {
     "date": "2026-09-29",
     "close": 261.5
    },
    {
     "date": "2026-09-30",
     "close": 260.5
    },
    {
     "date": "2026-10-01",
     "close": 254.55
    },
    {
     "date": "2026-10-05",
     "close": 257
    },
    {
     "date": "2026-10-06",
     "close": 257.2
    },
    {
     "date": "2026-10-07",
     "close": 253.05
    },
    {
     "date": "2026-10-08",
     "close": 244.65
    },
    {
     "date": "2026-10-09",
     "close": 249.15
    },
    {
     "date": "2026-10-12",
     "close": 249
    },
    {
     "date": "2026-10-13",
     "close": 250.5
    },
    {
     "date": "2026-10-14",
     "close": 248.95
    },
    {
     "date": "2026-10-15",
     "close": 249.85
    },
    {
     "date": "2026-10-16",
     "close": 250.45
    },
    {
     "date": "2026-10-19",
     "close": 250.35
    },
    {
     "date": "2026-10-21",
     "close": 252.15
    }
   ],
   "sector": "Utilities",
   "industry": "Utilities—Regulated Electric"
  },
  "RELIANCE": {
   "price": 1184.5,
   "prevClose": 1202,
   "change": -17.5,
   "changePct": -1.46,
   "dayHigh": 1208,
   "dayLow": 1184.5,
   "high52": 1611.8,
   "low52": 1152.2,
   "volume": 14931109,
   "longName": "Reliance Industries Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1288.6
    },
    {
     "date": "2026-07-23",
     "close": 1272.2
    },
    {
     "date": "2026-07-24",
     "close": 1278
    },
    {
     "date": "2026-07-27",
     "close": 1280
    },
    {
     "date": "2026-07-28",
     "close": 1267.7
    },
    {
     "date": "2026-07-29",
     "close": 1275.9
    },
    {
     "date": "2026-07-30",
     "close": 1292.9
    },
    {
     "date": "2026-07-31",
     "close": 1307.8
    },
    {
     "date": "2026-08-03",
     "close": 1319
    },
    {
     "date": "2026-08-04",
     "close": 1290.9
    },
    {
     "date": "2026-08-05",
     "close": 1280
    },
    {
     "date": "2026-08-06",
     "close": 1325
    },
    {
     "date": "2026-08-07",
     "close": 1334.8
    },
    {
     "date": "2026-08-10",
     "close": 1327.3
    },
    {
     "date": "2026-08-11",
     "close": 1323.9
    },
    {
     "date": "2026-08-12",
     "close": 1329
    },
    {
     "date": "2026-08-13",
     "close": 1317
    },
    {
     "date": "2026-08-14",
     "close": 1310
    },
    {
     "date": "2026-08-17",
     "close": 1316
    },
    {
     "date": "2026-08-18",
     "close": 1322
    },
    {
     "date": "2026-08-19",
     "close": 1311
    },
    {
     "date": "2026-08-20",
     "close": 1313.2
    },
    {
     "date": "2026-08-21",
     "close": 1316
    },
    {
     "date": "2026-08-24",
     "close": 1309.8
    },
    {
     "date": "2026-08-25",
     "close": 1317
    },
    {
     "date": "2026-08-26",
     "close": 1298
    },
    {
     "date": "2026-08-27",
     "close": 1282.2
    },
    {
     "date": "2026-08-28",
     "close": 1287
    },
    {
     "date": "2026-08-31",
     "close": 1277
    },
    {
     "date": "2026-09-01",
     "close": 1309
    },
    {
     "date": "2026-09-02",
     "close": 1313.1
    },
    {
     "date": "2026-09-03",
     "close": 1302.5
    },
    {
     "date": "2026-09-04",
     "close": 1322
    },
    {
     "date": "2026-09-07",
     "close": 1309.5
    },
    {
     "date": "2026-09-08",
     "close": 1294.9
    },
    {
     "date": "2026-09-09",
     "close": 1279
    },
    {
     "date": "2026-09-10",
     "close": 1274
    },
    {
     "date": "2026-09-11",
     "close": 1257.5
    },
    {
     "date": "2026-09-15",
     "close": 1235.3
    },
    {
     "date": "2026-09-16",
     "close": 1240
    },
    {
     "date": "2026-09-17",
     "close": 1243.9
    },
    {
     "date": "2026-09-18",
     "close": 1226.4
    },
    {
     "date": "2026-09-21",
     "close": 1247.4
    },
    {
     "date": "2026-09-22",
     "close": 1240.4
    },
    {
     "date": "2026-09-23",
     "close": 1248
    },
    {
     "date": "2026-09-24",
     "close": 1219.2
    },
    {
     "date": "2026-09-25",
     "close": 1226
    },
    {
     "date": "2026-09-28",
     "close": 1197.6
    },
    {
     "date": "2026-09-29",
     "close": 1182
    },
    {
     "date": "2026-09-30",
     "close": 1187
    },
    {
     "date": "2026-10-01",
     "close": 1167.7
    },
    {
     "date": "2026-10-05",
     "close": 1186.4
    },
    {
     "date": "2026-10-06",
     "close": 1218
    },
    {
     "date": "2026-10-07",
     "close": 1207.7
    },
    {
     "date": "2026-10-08",
     "close": 1178
    },
    {
     "date": "2026-10-09",
     "close": 1170.3
    },
    {
     "date": "2026-10-12",
     "close": 1158.9
    },
    {
     "date": "2026-10-13",
     "close": 1166.7
    },
    {
     "date": "2026-10-14",
     "close": 1174.6
    },
    {
     "date": "2026-10-15",
     "close": 1215
    },
    {
     "date": "2026-10-16",
     "close": 1211.2
    },
    {
     "date": "2026-10-19",
     "close": 1202
    },
    {
     "date": "2026-10-21",
     "close": 1209
    }
   ],
   "sector": "Energy",
   "industry": "Oil & Gas Refining & Marketing"
  },
  "SBIN": {
   "price": 970,
   "prevClose": 973.7,
   "change": -3.7,
   "changePct": -0.38,
   "dayHigh": 970.9,
   "dayLow": 950.05,
   "high52": 1234.7,
   "low52": 900.95,
   "volume": 5755456,
   "longName": "State Bank of India",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1025
    },
    {
     "date": "2026-07-23",
     "close": 1012.6
    },
    {
     "date": "2026-07-24",
     "close": 1015
    },
    {
     "date": "2026-07-27",
     "close": 1020.6
    },
    {
     "date": "2026-07-28",
     "close": 1013.2
    },
    {
     "date": "2026-07-29",
     "close": 1013.7
    },
    {
     "date": "2026-07-30",
     "close": 1025.3
    },
    {
     "date": "2026-07-31",
     "close": 1027.4
    },
    {
     "date": "2026-08-03",
     "close": 1045
    },
    {
     "date": "2026-08-04",
     "close": 1042.7
    },
    {
     "date": "2026-08-05",
     "close": 1055
    },
    {
     "date": "2026-08-06",
     "close": 1085
    },
    {
     "date": "2026-08-07",
     "close": 1097.2
    },
    {
     "date": "2026-08-10",
     "close": 1071
    },
    {
     "date": "2026-08-11",
     "close": 1066
    },
    {
     "date": "2026-08-12",
     "close": 1082
    },
    {
     "date": "2026-08-13",
     "close": 1083
    },
    {
     "date": "2026-08-14",
     "close": 1067.7
    },
    {
     "date": "2026-08-17",
     "close": 1061.2
    },
    {
     "date": "2026-08-18",
     "close": 1053
    },
    {
     "date": "2026-08-19",
     "close": 1048.6
    },
    {
     "date": "2026-08-20",
     "close": 1048
    },
    {
     "date": "2026-08-21",
     "close": 1048.7
    },
    {
     "date": "2026-08-24",
     "close": 1039.5
    },
    {
     "date": "2026-08-25",
     "close": 1048
    },
    {
     "date": "2026-08-26",
     "close": 1052
    },
    {
     "date": "2026-08-27",
     "close": 1042.9
    },
    {
     "date": "2026-08-28",
     "close": 1047.5
    },
    {
     "date": "2026-08-31",
     "close": 1060
    },
    {
     "date": "2026-09-01",
     "close": 1034.5
    },
    {
     "date": "2026-09-02",
     "close": 1020.9
    },
    {
     "date": "2026-09-03",
     "close": 1023.4
    },
    {
     "date": "2026-09-04",
     "close": 1016.1
    },
    {
     "date": "2026-09-07",
     "close": 1005.9
    },
    {
     "date": "2026-09-08",
     "close": 1008
    },
    {
     "date": "2026-09-09",
     "close": 1000.5
    },
    {
     "date": "2026-09-10",
     "close": 1009.7
    },
    {
     "date": "2026-09-11",
     "close": 995.7
    },
    {
     "date": "2026-09-15",
     "close": 968
    },
    {
     "date": "2026-09-16",
     "close": 991.4
    },
    {
     "date": "2026-09-17",
     "close": 988.7
    },
    {
     "date": "2026-09-18",
     "close": 996.2
    },
    {
     "date": "2026-09-21",
     "close": 996
    },
    {
     "date": "2026-09-22",
     "close": 987
    },
    {
     "date": "2026-09-23",
     "close": 994.1
    },
    {
     "date": "2026-09-24",
     "close": 978.5
    },
    {
     "date": "2026-09-25",
     "close": 983
    },
    {
     "date": "2026-09-28",
     "close": 962
    },
    {
     "date": "2026-09-29",
     "close": 964.7
    },
    {
     "date": "2026-09-30",
     "close": 959.5
    },
    {
     "date": "2026-10-01",
     "close": 954.1
    },
    {
     "date": "2026-10-05",
     "close": 958
    },
    {
     "date": "2026-10-06",
     "close": 958.75
    },
    {
     "date": "2026-10-07",
     "close": 954
    },
    {
     "date": "2026-10-08",
     "close": 940
    },
    {
     "date": "2026-10-09",
     "close": 959.1
    },
    {
     "date": "2026-10-12",
     "close": 941
    },
    {
     "date": "2026-10-13",
     "close": 957
    },
    {
     "date": "2026-10-14",
     "close": 954.9
    },
    {
     "date": "2026-10-15",
     "close": 960
    },
    {
     "date": "2026-10-16",
     "close": 962.6
    },
    {
     "date": "2026-10-19",
     "close": 973.7
    },
    {
     "date": "2026-10-21",
     "close": 963
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  },
  "SHRIRAMFIN": {
   "price": 900.9,
   "prevClose": 926.5,
   "change": -25.6,
   "changePct": -2.76,
   "dayHigh": 905.6,
   "dayLow": 885,
   "high52": 1153.7,
   "low52": 695.25,
   "volume": 4312212,
   "longName": "Shriram Finance Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1058.8
    },
    {
     "date": "2026-07-23",
     "close": 1025.8
    },
    {
     "date": "2026-07-24",
     "close": 1005.1
    },
    {
     "date": "2026-07-27",
     "close": 1038.2
    },
    {
     "date": "2026-07-28",
     "close": 1040.9
    },
    {
     "date": "2026-07-29",
     "close": 1044.7
    },
    {
     "date": "2026-07-30",
     "close": 1027.2
    },
    {
     "date": "2026-07-31",
     "close": 1046.7
    },
    {
     "date": "2026-08-03",
     "close": 1090.2
    },
    {
     "date": "2026-08-04",
     "close": 1087.3
    },
    {
     "date": "2026-08-05",
     "close": 1122.4
    },
    {
     "date": "2026-08-06",
     "close": 1141
    },
    {
     "date": "2026-08-07",
     "close": 1115
    },
    {
     "date": "2026-08-10",
     "close": 1137.8
    },
    {
     "date": "2026-08-11",
     "close": 1129.9
    },
    {
     "date": "2026-08-12",
     "close": 1117.2
    },
    {
     "date": "2026-08-13",
     "close": 1132.3
    },
    {
     "date": "2026-08-14",
     "close": 1122
    },
    {
     "date": "2026-08-17",
     "close": 1122
    },
    {
     "date": "2026-08-18",
     "close": 1108.4
    },
    {
     "date": "2026-08-19",
     "close": 1106
    },
    {
     "date": "2026-08-20",
     "close": 1128.2
    },
    {
     "date": "2026-08-21",
     "close": 1130
    },
    {
     "date": "2026-08-24",
     "close": 1119
    },
    {
     "date": "2026-08-25",
     "close": 1138.5
    },
    {
     "date": "2026-08-26",
     "close": 1117.5
    },
    {
     "date": "2026-08-27",
     "close": 1101
    },
    {
     "date": "2026-08-28",
     "close": 1086.9
    },
    {
     "date": "2026-08-31",
     "close": 1109.9
    },
    {
     "date": "2026-09-01",
     "close": 1059.1
    },
    {
     "date": "2026-09-02",
     "close": 1047
    },
    {
     "date": "2026-09-03",
     "close": 1044.2
    },
    {
     "date": "2026-09-04",
     "close": 1041
    },
    {
     "date": "2026-09-07",
     "close": 1037
    },
    {
     "date": "2026-09-08",
     "close": 1029
    },
    {
     "date": "2026-09-09",
     "close": 1029
    },
    {
     "date": "2026-09-10",
     "close": 1038
    },
    {
     "date": "2026-09-11",
     "close": 1028.6
    },
    {
     "date": "2026-09-15",
     "close": 979.8
    },
    {
     "date": "2026-09-16",
     "close": 979
    },
    {
     "date": "2026-09-17",
     "close": 995
    },
    {
     "date": "2026-09-18",
     "close": 1010
    },
    {
     "date": "2026-09-21",
     "close": 1011.8
    },
    {
     "date": "2026-09-22",
     "close": 1006
    },
    {
     "date": "2026-09-23",
     "close": 1010.8
    },
    {
     "date": "2026-09-24",
     "close": 990
    },
    {
     "date": "2026-09-25",
     "close": 994.1
    },
    {
     "date": "2026-09-28",
     "close": 976.3
    },
    {
     "date": "2026-09-29",
     "close": 971.5
    },
    {
     "date": "2026-09-30",
     "close": 982.7
    },
    {
     "date": "2026-10-01",
     "close": 945
    },
    {
     "date": "2026-10-05",
     "close": 971.4
    },
    {
     "date": "2026-10-06",
     "close": 965.05
    },
    {
     "date": "2026-10-07",
     "close": 948
    },
    {
     "date": "2026-10-08",
     "close": 917.25
    },
    {
     "date": "2026-10-09",
     "close": 940.45
    },
    {
     "date": "2026-10-12",
     "close": 929.4
    },
    {
     "date": "2026-10-13",
     "close": 988
    },
    {
     "date": "2026-10-14",
     "close": 950
    },
    {
     "date": "2026-10-15",
     "close": 943.8
    },
    {
     "date": "2026-10-16",
     "close": 939.95
    },
    {
     "date": "2026-10-19",
     "close": 926.5
    },
    {
     "date": "2026-10-21",
     "close": 904.95
    }
   ],
   "sector": "Financial Services",
   "industry": "Credit Services"
  },
  "SOLARINDS": {
   "price": 19010,
   "prevClose": 19803,
   "change": -793,
   "changePct": -4,
   "dayHigh": 19130,
   "dayLow": 18569,
   "high52": 22700,
   "low52": 11646,
   "volume": 136643,
   "longName": "Solar Industries India Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 18856
    },
    {
     "date": "2026-07-23",
     "close": 18621
    },
    {
     "date": "2026-07-24",
     "close": 18494
    },
    {
     "date": "2026-07-27",
     "close": 18628
    },
    {
     "date": "2026-07-28",
     "close": 18244
    },
    {
     "date": "2026-07-29",
     "close": 18080
    },
    {
     "date": "2026-07-30",
     "close": 18053
    },
    {
     "date": "2026-07-31",
     "close": 18391
    },
    {
     "date": "2026-08-03",
     "close": 18659
    },
    {
     "date": "2026-08-04",
     "close": 18700
    },
    {
     "date": "2026-08-05",
     "close": 18400
    },
    {
     "date": "2026-08-06",
     "close": 18496
    },
    {
     "date": "2026-08-07",
     "close": 18650
    },
    {
     "date": "2026-08-10",
     "close": 18820
    },
    {
     "date": "2026-08-11",
     "close": 18770
    },
    {
     "date": "2026-08-12",
     "close": 18730
    },
    {
     "date": "2026-08-13",
     "close": 20324
    },
    {
     "date": "2026-08-14",
     "close": 19969
    },
    {
     "date": "2026-08-17",
     "close": 20000
    },
    {
     "date": "2026-08-18",
     "close": 20280
    },
    {
     "date": "2026-08-19",
     "close": 19721
    },
    {
     "date": "2026-08-20",
     "close": 19760
    },
    {
     "date": "2026-08-21",
     "close": 19900
    },
    {
     "date": "2026-08-24",
     "close": 19925
    },
    {
     "date": "2026-08-25",
     "close": 19800
    },
    {
     "date": "2026-08-26",
     "close": 20097
    },
    {
     "date": "2026-08-27",
     "close": 20580
    },
    {
     "date": "2026-08-28",
     "close": 20400
    },
    {
     "date": "2026-08-31",
     "close": 20108
    },
    {
     "date": "2026-09-01",
     "close": 20060
    },
    {
     "date": "2026-09-02",
     "close": 20600
    },
    {
     "date": "2026-09-03",
     "close": 21500
    },
    {
     "date": "2026-09-04",
     "close": 21445
    },
    {
     "date": "2026-09-07",
     "close": 21950
    },
    {
     "date": "2026-09-08",
     "close": 22455
    },
    {
     "date": "2026-09-09",
     "close": 22355
    },
    {
     "date": "2026-09-10",
     "close": 22370
    },
    {
     "date": "2026-09-11",
     "close": 22290
    },
    {
     "date": "2026-09-15",
     "close": 19250
    },
    {
     "date": "2026-09-16",
     "close": 18900
    },
    {
     "date": "2026-09-17",
     "close": 18815
    },
    {
     "date": "2026-09-18",
     "close": 18555
    },
    {
     "date": "2026-09-21",
     "close": 19265
    },
    {
     "date": "2026-09-22",
     "close": 19890
    },
    {
     "date": "2026-09-23",
     "close": 19730
    },
    {
     "date": "2026-09-24",
     "close": 19480
    },
    {
     "date": "2026-09-25",
     "close": 19745
    },
    {
     "date": "2026-09-28",
     "close": 19150
    },
    {
     "date": "2026-09-29",
     "close": 18650
    },
    {
     "date": "2026-09-30",
     "close": 19700
    },
    {
     "date": "2026-10-01",
     "close": 19400
    },
    {
     "date": "2026-10-05",
     "close": 19540
    },
    {
     "date": "2026-10-06",
     "close": 20071
    },
    {
     "date": "2026-10-07",
     "close": 20050
    },
    {
     "date": "2026-10-08",
     "close": 19870
    },
    {
     "date": "2026-10-09",
     "close": 20000
    },
    {
     "date": "2026-10-12",
     "close": 20334
    },
    {
     "date": "2026-10-13",
     "close": 20087
    },
    {
     "date": "2026-10-14",
     "close": 20170
    },
    {
     "date": "2026-10-15",
     "close": 19866
    },
    {
     "date": "2026-10-16",
     "close": 20011
    },
    {
     "date": "2026-10-19",
     "close": 19803
    },
    {
     "date": "2026-10-21",
     "close": 19259
    }
   ],
   "sector": "Basic Materials",
   "industry": "Specialty Chemicals"
  },
  "SOUTHBANK": {
   "price": 55.75,
   "prevClose": 54.26,
   "change": 1.49,
   "changePct": 2.75,
   "dayHigh": 56.23,
   "dayLow": 54.02,
   "high52": 56.25,
   "low52": 33.38,
   "volume": 25751133,
   "longName": "The South Indian Bank Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 48
    },
    {
     "date": "2026-07-23",
     "close": 47.5
    },
    {
     "date": "2026-07-24",
     "close": 46.52
    },
    {
     "date": "2026-07-27",
     "close": 47.9
    },
    {
     "date": "2026-07-28",
     "close": 47.13
    },
    {
     "date": "2026-07-29",
     "close": 46.49
    },
    {
     "date": "2026-07-30",
     "close": 46.89
    },
    {
     "date": "2026-07-31",
     "close": 46.7
    },
    {
     "date": "2026-08-03",
     "close": 47.07
    },
    {
     "date": "2026-08-04",
     "close": 46.86
    },
    {
     "date": "2026-08-05",
     "close": 46.92
    },
    {
     "date": "2026-08-06",
     "close": 47.43
    },
    {
     "date": "2026-08-07",
     "close": 47.17
    },
    {
     "date": "2026-08-10",
     "close": 46
    },
    {
     "date": "2026-08-11",
     "close": 45.81
    },
    {
     "date": "2026-08-12",
     "close": 46.22
    },
    {
     "date": "2026-08-13",
     "close": 45.66
    },
    {
     "date": "2026-08-14",
     "close": 45.74
    },
    {
     "date": "2026-08-17",
     "close": 45.22
    },
    {
     "date": "2026-08-18",
     "close": 45.09
    },
    {
     "date": "2026-08-19",
     "close": 45
    },
    {
     "date": "2026-08-20",
     "close": 45.16
    },
    {
     "date": "2026-08-21",
     "close": 44.97
    },
    {
     "date": "2026-08-24",
     "close": 45.16
    },
    {
     "date": "2026-08-25",
     "close": 45.35
    },
    {
     "date": "2026-08-26",
     "close": 46.32
    },
    {
     "date": "2026-08-27",
     "close": 45.73
    },
    {
     "date": "2026-08-28",
     "close": 45.37
    },
    {
     "date": "2026-08-31",
     "close": 45.66
    },
    {
     "date": "2026-09-01",
     "close": 45.91
    },
    {
     "date": "2026-09-02",
     "close": 45.74
    },
    {
     "date": "2026-09-03",
     "close": 47.7
    },
    {
     "date": "2026-09-04",
     "close": 47.29
    },
    {
     "date": "2026-09-07",
     "close": 46.54
    },
    {
     "date": "2026-09-08",
     "close": 46.82
    },
    {
     "date": "2026-09-09",
     "close": 46.41
    },
    {
     "date": "2026-09-10",
     "close": 46.08
    },
    {
     "date": "2026-09-11",
     "close": 46.18
    },
    {
     "date": "2026-09-15",
     "close": 45
    },
    {
     "date": "2026-09-16",
     "close": 45.19
    },
    {
     "date": "2026-09-17",
     "close": 45.88
    },
    {
     "date": "2026-09-18",
     "close": 46.07
    },
    {
     "date": "2026-09-21",
     "close": 45.52
    },
    {
     "date": "2026-09-22",
     "close": 45.23
    },
    {
     "date": "2026-09-23",
     "close": 47.08
    },
    {
     "date": "2026-09-24",
     "close": 49.9
    },
    {
     "date": "2026-09-25",
     "close": 49.95
    },
    {
     "date": "2026-09-28",
     "close": 48.64
    },
    {
     "date": "2026-09-29",
     "close": 48.71
    },
    {
     "date": "2026-09-30",
     "close": 48.24
    },
    {
     "date": "2026-10-01",
     "close": 47.44
    },
    {
     "date": "2026-10-05",
     "close": 48.54
    },
    {
     "date": "2026-10-06",
     "close": 47.23
    },
    {
     "date": "2026-10-07",
     "close": 47.47
    },
    {
     "date": "2026-10-08",
     "close": 46.39
    },
    {
     "date": "2026-10-09",
     "close": 47.91
    },
    {
     "date": "2026-10-12",
     "close": 49.01
    },
    {
     "date": "2026-10-13",
     "close": 49.13
    },
    {
     "date": "2026-10-14",
     "close": 49.64
    },
    {
     "date": "2026-10-15",
     "close": 51.48
    },
    {
     "date": "2026-10-16",
     "close": 51.45
    },
    {
     "date": "2026-10-19",
     "close": 54.26
    },
    {
     "date": "2026-10-21",
     "close": 54.97
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  },
  "SUNPHARMA": {
   "price": 1758,
   "prevClose": 1743,
   "change": 15,
   "changePct": 0.86,
   "dayHigh": 1758,
   "dayLow": 1719.1,
   "high52": 2046.9,
   "low52": 1583.7,
   "volume": 1778495,
   "longName": "Sun Pharmaceutical Industries Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 1943
    },
    {
     "date": "2026-07-23",
     "close": 1954
    },
    {
     "date": "2026-07-24",
     "close": 1941.1
    },
    {
     "date": "2026-07-27",
     "close": 1973.7
    },
    {
     "date": "2026-07-28",
     "close": 1976.7
    },
    {
     "date": "2026-07-29",
     "close": 1989.9
    },
    {
     "date": "2026-07-30",
     "close": 2001.1
    },
    {
     "date": "2026-07-31",
     "close": 1990.5
    },
    {
     "date": "2026-08-03",
     "close": 1963.5
    },
    {
     "date": "2026-08-04",
     "close": 1964
    },
    {
     "date": "2026-08-05",
     "close": 1940
    },
    {
     "date": "2026-08-06",
     "close": 1951
    },
    {
     "date": "2026-08-07",
     "close": 1945
    },
    {
     "date": "2026-08-10",
     "close": 1944.4
    },
    {
     "date": "2026-08-11",
     "close": 1942
    },
    {
     "date": "2026-08-12",
     "close": 1944
    },
    {
     "date": "2026-08-13",
     "close": 1932
    },
    {
     "date": "2026-08-14",
     "close": 1930
    },
    {
     "date": "2026-08-17",
     "close": 1882
    },
    {
     "date": "2026-08-18",
     "close": 1875.1
    },
    {
     "date": "2026-08-19",
     "close": 1900
    },
    {
     "date": "2026-08-20",
     "close": 1904
    },
    {
     "date": "2026-08-21",
     "close": 1902.4
    },
    {
     "date": "2026-08-24",
     "close": 1910
    },
    {
     "date": "2026-08-25",
     "close": 1922
    },
    {
     "date": "2026-08-26",
     "close": 1899.5
    },
    {
     "date": "2026-08-27",
     "close": 1913.3
    },
    {
     "date": "2026-08-28",
     "close": 1920
    },
    {
     "date": "2026-08-31",
     "close": 1984.8
    },
    {
     "date": "2026-09-01",
     "close": 1929
    },
    {
     "date": "2026-09-02",
     "close": 1931.7
    },
    {
     "date": "2026-09-03",
     "close": 1916
    },
    {
     "date": "2026-09-04",
     "close": 1899
    },
    {
     "date": "2026-09-07",
     "close": 1895
    },
    {
     "date": "2026-09-08",
     "close": 1885.9
    },
    {
     "date": "2026-09-09",
     "close": 1864.9
    },
    {
     "date": "2026-09-10",
     "close": 1861
    },
    {
     "date": "2026-09-11",
     "close": 1840
    },
    {
     "date": "2026-09-15",
     "close": 1835
    },
    {
     "date": "2026-09-16",
     "close": 1853.5
    },
    {
     "date": "2026-09-17",
     "close": 1867.3
    },
    {
     "date": "2026-09-18",
     "close": 1837.3
    },
    {
     "date": "2026-09-21",
     "close": 1868.9
    },
    {
     "date": "2026-09-22",
     "close": 1846.4
    },
    {
     "date": "2026-09-23",
     "close": 1865
    },
    {
     "date": "2026-09-24",
     "close": 1849.9
    },
    {
     "date": "2026-09-25",
     "close": 1852.2
    },
    {
     "date": "2026-09-28",
     "close": 1838
    },
    {
     "date": "2026-09-29",
     "close": 1865
    },
    {
     "date": "2026-09-30",
     "close": 1816.6
    },
    {
     "date": "2026-10-01",
     "close": 1801
    },
    {
     "date": "2026-10-05",
     "close": 1779.7
    },
    {
     "date": "2026-10-06",
     "close": 1804.1
    },
    {
     "date": "2026-10-07",
     "close": 1781
    },
    {
     "date": "2026-10-08",
     "close": 1759.8
    },
    {
     "date": "2026-10-09",
     "close": 1760
    },
    {
     "date": "2026-10-12",
     "close": 1760
    },
    {
     "date": "2026-10-13",
     "close": 1770.7
    },
    {
     "date": "2026-10-14",
     "close": 1746.4
    },
    {
     "date": "2026-10-15",
     "close": 1764
    },
    {
     "date": "2026-10-16",
     "close": 1758.8
    },
    {
     "date": "2026-10-19",
     "close": 1743
    },
    {
     "date": "2026-10-21",
     "close": 1745.1
    }
   ],
   "sector": "Healthcare",
   "industry": "Drug Manufacturers—Specialty & Generic"
  },
  "SUZLON": {
   "price": 38.57,
   "prevClose": 40.38,
   "change": -1.81,
   "changePct": -4.48,
   "dayHigh": 39.23,
   "dayLow": 38.26,
   "high52": 61.5,
   "low52": 36.31,
   "volume": 51295632,
   "longName": "Suzlon Energy Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 53.01
    },
    {
     "date": "2026-07-23",
     "close": 52.39
    },
    {
     "date": "2026-07-24",
     "close": 52.28
    },
    {
     "date": "2026-07-27",
     "close": 53.15
    },
    {
     "date": "2026-07-28",
     "close": 48.02
    },
    {
     "date": "2026-07-29",
     "close": 47.45
    },
    {
     "date": "2026-07-30",
     "close": 47.4
    },
    {
     "date": "2026-07-31",
     "close": 48.01
    },
    {
     "date": "2026-08-03",
     "close": 48.1
    },
    {
     "date": "2026-08-04",
     "close": 48.01
    },
    {
     "date": "2026-08-05",
     "close": 48.15
    },
    {
     "date": "2026-08-06",
     "close": 48.1
    },
    {
     "date": "2026-08-07",
     "close": 48.15
    },
    {
     "date": "2026-08-10",
     "close": 47.5
    },
    {
     "date": "2026-08-11",
     "close": 47.5
    },
    {
     "date": "2026-08-12",
     "close": 47.35
    },
    {
     "date": "2026-08-13",
     "close": 47.61
    },
    {
     "date": "2026-08-14",
     "close": 47.1
    },
    {
     "date": "2026-08-17",
     "close": 49
    },
    {
     "date": "2026-08-18",
     "close": 47.78
    },
    {
     "date": "2026-08-19",
     "close": 46.77
    },
    {
     "date": "2026-08-20",
     "close": 47
    },
    {
     "date": "2026-08-21",
     "close": 46.71
    },
    {
     "date": "2026-08-24",
     "close": 47.05
    },
    {
     "date": "2026-08-25",
     "close": 46.75
    },
    {
     "date": "2026-08-26",
     "close": 46.94
    },
    {
     "date": "2026-08-27",
     "close": 46.81
    },
    {
     "date": "2026-08-28",
     "close": 46.79
    },
    {
     "date": "2026-08-31",
     "close": 47.52
    },
    {
     "date": "2026-09-01",
     "close": 46.5
    },
    {
     "date": "2026-09-02",
     "close": 45.46
    },
    {
     "date": "2026-09-03",
     "close": 46.03
    },
    {
     "date": "2026-09-04",
     "close": 45.35
    },
    {
     "date": "2026-09-07",
     "close": 45.55
    },
    {
     "date": "2026-09-08",
     "close": 45.5
    },
    {
     "date": "2026-09-09",
     "close": 45.45
    },
    {
     "date": "2026-09-10",
     "close": 44.22
    },
    {
     "date": "2026-09-11",
     "close": 44.12
    },
    {
     "date": "2026-09-15",
     "close": 42.9
    },
    {
     "date": "2026-09-16",
     "close": 42.15
    },
    {
     "date": "2026-09-17",
     "close": 42.54
    },
    {
     "date": "2026-09-18",
     "close": 43.14
    },
    {
     "date": "2026-09-21",
     "close": 43.34
    },
    {
     "date": "2026-09-22",
     "close": 43
    },
    {
     "date": "2026-09-23",
     "close": 42.39
    },
    {
     "date": "2026-09-24",
     "close": 40.74
    },
    {
     "date": "2026-09-25",
     "close": 40.8
    },
    {
     "date": "2026-09-28",
     "close": 39.66
    },
    {
     "date": "2026-09-29",
     "close": 39.5
    },
    {
     "date": "2026-09-30",
     "close": 39.49
    },
    {
     "date": "2026-10-01",
     "close": 38.91
    },
    {
     "date": "2026-10-05",
     "close": 38.92
    },
    {
     "date": "2026-10-06",
     "close": 39.16
    },
    {
     "date": "2026-10-07",
     "close": 38.34
    },
    {
     "date": "2026-10-08",
     "close": 36.43
    },
    {
     "date": "2026-10-09",
     "close": 37.6
    },
    {
     "date": "2026-10-12",
     "close": 39.57
    },
    {
     "date": "2026-10-13",
     "close": 40.19
    },
    {
     "date": "2026-10-14",
     "close": 40.8
    },
    {
     "date": "2026-10-15",
     "close": 40.95
    },
    {
     "date": "2026-10-16",
     "close": 42
    },
    {
     "date": "2026-10-19",
     "close": 40.38
    },
    {
     "date": "2026-10-21",
     "close": 39.4
    }
   ],
   "sector": "Industrials",
   "industry": "Specialty Industrial Machinery"
  },
  "TATASTEEL": {
   "price": 172.33,
   "prevClose": 174.04,
   "change": -1.71,
   "changePct": -0.98,
   "dayHigh": 172.33,
   "dayLow": 168.1,
   "high52": 224.4,
   "low52": 160.06,
   "volume": 16692588,
   "longName": "Tata Steel Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 186.53
    },
    {
     "date": "2026-07-23",
     "close": 184.23
    },
    {
     "date": "2026-07-24",
     "close": 182.67
    },
    {
     "date": "2026-07-27",
     "close": 184.25
    },
    {
     "date": "2026-07-28",
     "close": 182.63
    },
    {
     "date": "2026-07-29",
     "close": 187.27
    },
    {
     "date": "2026-07-30",
     "close": 186.92
    },
    {
     "date": "2026-07-31",
     "close": 189.69
    },
    {
     "date": "2026-08-03",
     "close": 191
    },
    {
     "date": "2026-08-04",
     "close": 190.95
    },
    {
     "date": "2026-08-05",
     "close": 192.99
    },
    {
     "date": "2026-08-06",
     "close": 189.3
    },
    {
     "date": "2026-08-07",
     "close": 187.55
    },
    {
     "date": "2026-08-10",
     "close": 190.24
    },
    {
     "date": "2026-08-11",
     "close": 188.25
    },
    {
     "date": "2026-08-12",
     "close": 186.2
    },
    {
     "date": "2026-08-13",
     "close": 184.85
    },
    {
     "date": "2026-08-14",
     "close": 183.5
    },
    {
     "date": "2026-08-17",
     "close": 186
    },
    {
     "date": "2026-08-18",
     "close": 185.5
    },
    {
     "date": "2026-08-19",
     "close": 184
    },
    {
     "date": "2026-08-20",
     "close": 183.5
    },
    {
     "date": "2026-08-21",
     "close": 183
    },
    {
     "date": "2026-08-24",
     "close": 186.3
    },
    {
     "date": "2026-08-25",
     "close": 186.94
    },
    {
     "date": "2026-08-26",
     "close": 188.01
    },
    {
     "date": "2026-08-27",
     "close": 186.8
    },
    {
     "date": "2026-08-28",
     "close": 186.5
    },
    {
     "date": "2026-08-31",
     "close": 184.35
    },
    {
     "date": "2026-09-01",
     "close": 184.07
    },
    {
     "date": "2026-09-02",
     "close": 183.85
    },
    {
     "date": "2026-09-03",
     "close": 184.2
    },
    {
     "date": "2026-09-04",
     "close": 188.79
    },
    {
     "date": "2026-09-07",
     "close": 185.61
    },
    {
     "date": "2026-09-08",
     "close": 184.15
    },
    {
     "date": "2026-09-09",
     "close": 188.75
    },
    {
     "date": "2026-09-10",
     "close": 186.78
    },
    {
     "date": "2026-09-11",
     "close": 183
    },
    {
     "date": "2026-09-15",
     "close": 183.65
    },
    {
     "date": "2026-09-16",
     "close": 183
    },
    {
     "date": "2026-09-17",
     "close": 187.29
    },
    {
     "date": "2026-09-18",
     "close": 185.54
    },
    {
     "date": "2026-09-21",
     "close": 183.4
    },
    {
     "date": "2026-09-22",
     "close": 184.97
    },
    {
     "date": "2026-09-23",
     "close": 190.82
    },
    {
     "date": "2026-09-24",
     "close": 188.02
    },
    {
     "date": "2026-09-25",
     "close": 187.97
    },
    {
     "date": "2026-09-28",
     "close": 186.3
    },
    {
     "date": "2026-09-29",
     "close": 188
    },
    {
     "date": "2026-09-30",
     "close": 184.3
    },
    {
     "date": "2026-10-01",
     "close": 178
    },
    {
     "date": "2026-10-05",
     "close": 178.14
    },
    {
     "date": "2026-10-06",
     "close": 178.69
    },
    {
     "date": "2026-10-07",
     "close": 175.64
    },
    {
     "date": "2026-10-08",
     "close": 171.96
    },
    {
     "date": "2026-10-09",
     "close": 173.8
    },
    {
     "date": "2026-10-12",
     "close": 172.24
    },
    {
     "date": "2026-10-13",
     "close": 175
    },
    {
     "date": "2026-10-14",
     "close": 174.49
    },
    {
     "date": "2026-10-15",
     "close": 176.4
    },
    {
     "date": "2026-10-16",
     "close": 175.5
    },
    {
     "date": "2026-10-19",
     "close": 174.04
    },
    {
     "date": "2026-10-21",
     "close": 172.45
    }
   ],
   "sector": "Basic Materials",
   "industry": "Steel"
  },
  "TCS": {
   "price": 2506.9,
   "prevClose": 2460.9,
   "change": 46,
   "changePct": 1.87,
   "dayHigh": 2533,
   "dayLow": 2479,
   "high52": 3350,
   "low52": 1976.8,
   "volume": 4174647,
   "longName": "Tata Consultancy Services Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 2208.3
    },
    {
     "date": "2026-07-23",
     "close": 2242.9
    },
    {
     "date": "2026-07-24",
     "close": 2254.3
    },
    {
     "date": "2026-07-27",
     "close": 2295.6
    },
    {
     "date": "2026-07-28",
     "close": 2398
    },
    {
     "date": "2026-07-29",
     "close": 2446.6
    },
    {
     "date": "2026-07-30",
     "close": 2431.8
    },
    {
     "date": "2026-07-31",
     "close": 2365.6
    },
    {
     "date": "2026-08-03",
     "close": 2473.7
    },
    {
     "date": "2026-08-04",
     "close": 2460
    },
    {
     "date": "2026-08-05",
     "close": 2413
    },
    {
     "date": "2026-08-06",
     "close": 2373
    },
    {
     "date": "2026-08-07",
     "close": 2452.7
    },
    {
     "date": "2026-08-10",
     "close": 2425.7
    },
    {
     "date": "2026-08-11",
     "close": 2445.7
    },
    {
     "date": "2026-08-12",
     "close": 2349.7
    },
    {
     "date": "2026-08-13",
     "close": 2375
    },
    {
     "date": "2026-08-14",
     "close": 2361
    },
    {
     "date": "2026-08-17",
     "close": 2313.2
    },
    {
     "date": "2026-08-18",
     "close": 2280
    },
    {
     "date": "2026-08-19",
     "close": 2289
    },
    {
     "date": "2026-08-20",
     "close": 2298
    },
    {
     "date": "2026-08-21",
     "close": 2302
    },
    {
     "date": "2026-08-24",
     "close": 2284.1
    },
    {
     "date": "2026-08-25",
     "close": 2296.2
    },
    {
     "date": "2026-08-26",
     "close": 2270
    },
    {
     "date": "2026-08-27",
     "close": 2248.4
    },
    {
     "date": "2026-08-28",
     "close": 2342
    },
    {
     "date": "2026-08-31",
     "close": 2399.3
    },
    {
     "date": "2026-09-01",
     "close": 2369
    },
    {
     "date": "2026-09-02",
     "close": 2348
    },
    {
     "date": "2026-09-03",
     "close": 2320.1
    },
    {
     "date": "2026-09-04",
     "close": 2304
    },
    {
     "date": "2026-09-07",
     "close": 2270
    },
    {
     "date": "2026-09-08",
     "close": 2255.5
    },
    {
     "date": "2026-09-09",
     "close": 2208
    },
    {
     "date": "2026-09-10",
     "close": 2204.1
    },
    {
     "date": "2026-09-11",
     "close": 2200.8
    },
    {
     "date": "2026-09-15",
     "close": 2251
    },
    {
     "date": "2026-09-16",
     "close": 2188.8
    },
    {
     "date": "2026-09-17",
     "close": 2190
    },
    {
     "date": "2026-09-18",
     "close": 2105
    },
    {
     "date": "2026-09-21",
     "close": 2128.7
    },
    {
     "date": "2026-09-22",
     "close": 2105
    },
    {
     "date": "2026-09-23",
     "close": 2089.6
    },
    {
     "date": "2026-09-24",
     "close": 2087
    },
    {
     "date": "2026-09-25",
     "close": 2082
    },
    {
     "date": "2026-09-28",
     "close": 2070.7
    },
    {
     "date": "2026-09-29",
     "close": 2032.4
    },
    {
     "date": "2026-09-30",
     "close": 2050.6
    },
    {
     "date": "2026-10-01",
     "close": 2075
    },
    {
     "date": "2026-10-05",
     "close": 2114.4
    },
    {
     "date": "2026-10-06",
     "close": 2100
    },
    {
     "date": "2026-10-07",
     "close": 2080.3
    },
    {
     "date": "2026-10-08",
     "close": 2076
    },
    {
     "date": "2026-10-09",
     "close": 2156
    },
    {
     "date": "2026-10-12",
     "close": 2125
    },
    {
     "date": "2026-10-13",
     "close": 2269.3
    },
    {
     "date": "2026-10-14",
     "close": 2304.9
    },
    {
     "date": "2026-10-15",
     "close": 2350
    },
    {
     "date": "2026-10-16",
     "close": 2465
    },
    {
     "date": "2026-10-19",
     "close": 2460.9
    },
    {
     "date": "2026-10-21",
     "close": 2529
    }
   ],
   "sector": "Technology",
   "industry": "Information Technology Services"
  },
  "TITAN": {
   "price": 4350,
   "prevClose": 4424.2,
   "change": -74.2,
   "changePct": -1.68,
   "dayHigh": 4373.7,
   "dayLow": 4300.1,
   "high52": 5186.7,
   "low52": 3667.3,
   "volume": 426229,
   "longName": "Titan Company Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 4711.6
    },
    {
     "date": "2026-07-23",
     "close": 4697.3
    },
    {
     "date": "2026-07-24",
     "close": 4677
    },
    {
     "date": "2026-07-27",
     "close": 4740.1
    },
    {
     "date": "2026-07-28",
     "close": 4849.7
    },
    {
     "date": "2026-07-29",
     "close": 4850.2
    },
    {
     "date": "2026-07-30",
     "close": 4850
    },
    {
     "date": "2026-07-31",
     "close": 4875.2
    },
    {
     "date": "2026-08-03",
     "close": 5000
    },
    {
     "date": "2026-08-04",
     "close": 4935
    },
    {
     "date": "2026-08-05",
     "close": 4912.4
    },
    {
     "date": "2026-08-06",
     "close": 4998
    },
    {
     "date": "2026-08-07",
     "close": 4941
    },
    {
     "date": "2026-08-10",
     "close": 5090
    },
    {
     "date": "2026-08-11",
     "close": 5128
    },
    {
     "date": "2026-08-12",
     "close": 5099
    },
    {
     "date": "2026-08-13",
     "close": 5063.7
    },
    {
     "date": "2026-08-14",
     "close": 5056.2
    },
    {
     "date": "2026-08-17",
     "close": 5068.5
    },
    {
     "date": "2026-08-18",
     "close": 5048.6
    },
    {
     "date": "2026-08-19",
     "close": 5068
    },
    {
     "date": "2026-08-20",
     "close": 5068
    },
    {
     "date": "2026-08-21",
     "close": 5086.1
    },
    {
     "date": "2026-08-24",
     "close": 5079
    },
    {
     "date": "2026-08-25",
     "close": 5124.8
    },
    {
     "date": "2026-08-26",
     "close": 5100
    },
    {
     "date": "2026-08-27",
     "close": 5139.3
    },
    {
     "date": "2026-08-28",
     "close": 5169.2
    },
    {
     "date": "2026-08-31",
     "close": 5102.4
    },
    {
     "date": "2026-09-01",
     "close": 5050
    },
    {
     "date": "2026-09-02",
     "close": 5074
    },
    {
     "date": "2026-09-03",
     "close": 5027
    },
    {
     "date": "2026-09-04",
     "close": 5020
    },
    {
     "date": "2026-09-07",
     "close": 4995
    },
    {
     "date": "2026-09-08",
     "close": 4987
    },
    {
     "date": "2026-09-09",
     "close": 5005
    },
    {
     "date": "2026-09-10",
     "close": 5021
    },
    {
     "date": "2026-09-11",
     "close": 5009.5
    },
    {
     "date": "2026-09-15",
     "close": 4856
    },
    {
     "date": "2026-09-16",
     "close": 4908.5
    },
    {
     "date": "2026-09-17",
     "close": 4841
    },
    {
     "date": "2026-09-18",
     "close": 4798.5
    },
    {
     "date": "2026-09-21",
     "close": 4875
    },
    {
     "date": "2026-09-22",
     "close": 4928.5
    },
    {
     "date": "2026-09-23",
     "close": 4880
    },
    {
     "date": "2026-09-24",
     "close": 4832.5
    },
    {
     "date": "2026-09-25",
     "close": 4884
    },
    {
     "date": "2026-09-28",
     "close": 4819.5
    },
    {
     "date": "2026-09-29",
     "close": 4675
    },
    {
     "date": "2026-09-30",
     "close": 4587
    },
    {
     "date": "2026-10-01",
     "close": 4515.7
    },
    {
     "date": "2026-10-05",
     "close": 4580
    },
    {
     "date": "2026-10-06",
     "close": 4550
    },
    {
     "date": "2026-10-07",
     "close": 4377
    },
    {
     "date": "2026-10-08",
     "close": 4359.5
    },
    {
     "date": "2026-10-09",
     "close": 4410
    },
    {
     "date": "2026-10-12",
     "close": 4400
    },
    {
     "date": "2026-10-13",
     "close": 4487
    },
    {
     "date": "2026-10-14",
     "close": 4444
    },
    {
     "date": "2026-10-15",
     "close": 4455.8
    },
    {
     "date": "2026-10-16",
     "close": 4444.8
    },
    {
     "date": "2026-10-19",
     "close": 4424.2
    },
    {
     "date": "2026-10-21",
     "close": 4380.9
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Luxury Goods"
  },
  "TORNTPHARM": {
   "price": 4615.3,
   "prevClose": 4558.7,
   "change": 56.6,
   "changePct": 1.24,
   "dayHigh": 4649.6,
   "dayLow": 4500.3,
   "high52": 5250,
   "low52": 3532.6,
   "volume": 207982,
   "longName": "Torrent Pharmaceuticals Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 5033.4
    },
    {
     "date": "2026-07-23",
     "close": 5065.2
    },
    {
     "date": "2026-07-24",
     "close": 4961.5
    },
    {
     "date": "2026-07-27",
     "close": 5019.5
    },
    {
     "date": "2026-07-28",
     "close": 4898.3
    },
    {
     "date": "2026-07-29",
     "close": 4878.5
    },
    {
     "date": "2026-07-30",
     "close": 4872.1
    },
    {
     "date": "2026-07-31",
     "close": 5122.8
    },
    {
     "date": "2026-08-03",
     "close": 5050
    },
    {
     "date": "2026-08-04",
     "close": 5030
    },
    {
     "date": "2026-08-05",
     "close": 5000
    },
    {
     "date": "2026-08-06",
     "close": 4956
    },
    {
     "date": "2026-08-07",
     "close": 4924
    },
    {
     "date": "2026-08-10",
     "close": 4924
    },
    {
     "date": "2026-08-11",
     "close": 4886
    },
    {
     "date": "2026-08-12",
     "close": 4893
    },
    {
     "date": "2026-08-13",
     "close": 4914.5
    },
    {
     "date": "2026-08-14",
     "close": 4833
    },
    {
     "date": "2026-08-17",
     "close": 4900
    },
    {
     "date": "2026-08-18",
     "close": 4971
    },
    {
     "date": "2026-08-19",
     "close": 5013
    },
    {
     "date": "2026-08-20",
     "close": 5005
    },
    {
     "date": "2026-08-21",
     "close": 4896.5
    },
    {
     "date": "2026-08-24",
     "close": 4886.5
    },
    {
     "date": "2026-08-25",
     "close": 4932
    },
    {
     "date": "2026-08-26",
     "close": 4890
    },
    {
     "date": "2026-08-27",
     "close": 4999
    },
    {
     "date": "2026-08-28",
     "close": 5050
    },
    {
     "date": "2026-08-31",
     "close": 5066
    },
    {
     "date": "2026-09-01",
     "close": 4965.5
    },
    {
     "date": "2026-09-02",
     "close": 5012
    },
    {
     "date": "2026-09-03",
     "close": 4905.5
    },
    {
     "date": "2026-09-04",
     "close": 4857
    },
    {
     "date": "2026-09-07",
     "close": 4914
    },
    {
     "date": "2026-09-08",
     "close": 4960
    },
    {
     "date": "2026-09-09",
     "close": 4930
    },
    {
     "date": "2026-09-10",
     "close": 4930
    },
    {
     "date": "2026-09-11",
     "close": 4965.5
    },
    {
     "date": "2026-09-15",
     "close": 4850
    },
    {
     "date": "2026-09-16",
     "close": 4812.5
    },
    {
     "date": "2026-09-17",
     "close": 4875
    },
    {
     "date": "2026-09-18",
     "close": 4840
    },
    {
     "date": "2026-09-21",
     "close": 4970
    },
    {
     "date": "2026-09-22",
     "close": 4935
    },
    {
     "date": "2026-09-23",
     "close": 4985
    },
    {
     "date": "2026-09-24",
     "close": 4928.5
    },
    {
     "date": "2026-09-25",
     "close": 4988.5
    },
    {
     "date": "2026-09-28",
     "close": 4869
    },
    {
     "date": "2026-09-29",
     "close": 4894
    },
    {
     "date": "2026-09-30",
     "close": 4800
    },
    {
     "date": "2026-10-01",
     "close": 4767.3
    },
    {
     "date": "2026-10-05",
     "close": 4772
    },
    {
     "date": "2026-10-06",
     "close": 4772
    },
    {
     "date": "2026-10-07",
     "close": 4716.2
    },
    {
     "date": "2026-10-08",
     "close": 4617.1
    },
    {
     "date": "2026-10-09",
     "close": 4656.9
    },
    {
     "date": "2026-10-12",
     "close": 4682
    },
    {
     "date": "2026-10-13",
     "close": 4642.9
    },
    {
     "date": "2026-10-14",
     "close": 4580
    },
    {
     "date": "2026-10-15",
     "close": 4584.1
    },
    {
     "date": "2026-10-16",
     "close": 4558.9
    },
    {
     "date": "2026-10-19",
     "close": 4558.7
    },
    {
     "date": "2026-10-21",
     "close": 4553.8
    }
   ],
   "sector": "Healthcare",
   "industry": "Drug Manufacturers—Specialty & Generic"
  },
  "TVSMOTOR": {
   "price": 3974,
   "prevClose": 4074,
   "change": -100,
   "changePct": -2.45,
   "dayHigh": 4006.6,
   "dayLow": 3915,
   "high52": 4484.5,
   "low52": 3228,
   "volume": 610895,
   "longName": "TVS Motor Company Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 3907.6
    },
    {
     "date": "2026-07-23",
     "close": 3919.8
    },
    {
     "date": "2026-07-24",
     "close": 3870.2
    },
    {
     "date": "2026-07-27",
     "close": 3876.4
    },
    {
     "date": "2026-07-28",
     "close": 3993.5
    },
    {
     "date": "2026-07-29",
     "close": 4075.6
    },
    {
     "date": "2026-07-30",
     "close": 4208.4
    },
    {
     "date": "2026-07-31",
     "close": 4313.1
    },
    {
     "date": "2026-08-03",
     "close": 4389
    },
    {
     "date": "2026-08-04",
     "close": 4360
    },
    {
     "date": "2026-08-05",
     "close": 4455.2
    },
    {
     "date": "2026-08-06",
     "close": 4375
    },
    {
     "date": "2026-08-07",
     "close": 4440.9
    },
    {
     "date": "2026-08-10",
     "close": 4466.2
    },
    {
     "date": "2026-08-11",
     "close": 4400
    },
    {
     "date": "2026-08-12",
     "close": 4375
    },
    {
     "date": "2026-08-13",
     "close": 4342.2
    },
    {
     "date": "2026-08-14",
     "close": 4307
    },
    {
     "date": "2026-08-17",
     "close": 4385.9
    },
    {
     "date": "2026-08-18",
     "close": 4356.8
    },
    {
     "date": "2026-08-19",
     "close": 4361.1
    },
    {
     "date": "2026-08-20",
     "close": 4390
    },
    {
     "date": "2026-08-21",
     "close": 4390
    },
    {
     "date": "2026-08-24",
     "close": 4363.5
    },
    {
     "date": "2026-08-25",
     "close": 4420
    },
    {
     "date": "2026-08-26",
     "close": 4464
    },
    {
     "date": "2026-08-27",
     "close": 4409.8
    },
    {
     "date": "2026-08-28",
     "close": 4304.2
    },
    {
     "date": "2026-08-31",
     "close": 4341.3
    },
    {
     "date": "2026-09-01",
     "close": 4203
    },
    {
     "date": "2026-09-02",
     "close": 4200
    },
    {
     "date": "2026-09-03",
     "close": 4200
    },
    {
     "date": "2026-09-04",
     "close": 4133.1
    },
    {
     "date": "2026-09-07",
     "close": 4132
    },
    {
     "date": "2026-09-08",
     "close": 4133.2
    },
    {
     "date": "2026-09-09",
     "close": 4151.1
    },
    {
     "date": "2026-09-10",
     "close": 4121.5
    },
    {
     "date": "2026-09-11",
     "close": 4125
    },
    {
     "date": "2026-09-15",
     "close": 4050
    },
    {
     "date": "2026-09-16",
     "close": 4033
    },
    {
     "date": "2026-09-17",
     "close": 4101.7
    },
    {
     "date": "2026-09-18",
     "close": 4171.3
    },
    {
     "date": "2026-09-21",
     "close": 4155
    },
    {
     "date": "2026-09-22",
     "close": 4140
    },
    {
     "date": "2026-09-23",
     "close": 4135
    },
    {
     "date": "2026-09-24",
     "close": 4091
    },
    {
     "date": "2026-09-25",
     "close": 4157.3
    },
    {
     "date": "2026-09-28",
     "close": 4095
    },
    {
     "date": "2026-09-29",
     "close": 4091.1
    },
    {
     "date": "2026-09-30",
     "close": 4106
    },
    {
     "date": "2026-10-01",
     "close": 4021
    },
    {
     "date": "2026-10-05",
     "close": 4031
    },
    {
     "date": "2026-10-06",
     "close": 3981
    },
    {
     "date": "2026-10-07",
     "close": 3926
    },
    {
     "date": "2026-10-08",
     "close": 3839.4
    },
    {
     "date": "2026-10-09",
     "close": 3866.8
    },
    {
     "date": "2026-10-12",
     "close": 3940.3
    },
    {
     "date": "2026-10-13",
     "close": 4011.5
    },
    {
     "date": "2026-10-14",
     "close": 3969.7
    },
    {
     "date": "2026-10-15",
     "close": 4020
    },
    {
     "date": "2026-10-16",
     "close": 4095.1
    },
    {
     "date": "2026-10-19",
     "close": 4074
    },
    {
     "date": "2026-10-21",
     "close": 3992.6
    }
   ],
   "sector": "Consumer Cyclical",
   "industry": "Auto Manufacturers"
  },
  "ULTRACEMCO": {
   "price": 10958,
   "prevClose": 10650,
   "change": 308,
   "changePct": 2.89,
   "dayHigh": 10976,
   "dayLow": 10651,
   "high52": 13110,
   "low52": 10325,
   "volume": 172207,
   "longName": "UltraTech Cement Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 11893
    },
    {
     "date": "2026-07-23",
     "close": 11908
    },
    {
     "date": "2026-07-24",
     "close": 11846
    },
    {
     "date": "2026-07-27",
     "close": 11881
    },
    {
     "date": "2026-07-28",
     "close": 11956
    },
    {
     "date": "2026-07-29",
     "close": 11998
    },
    {
     "date": "2026-07-30",
     "close": 11847
    },
    {
     "date": "2026-07-31",
     "close": 11903
    },
    {
     "date": "2026-08-03",
     "close": 12054
    },
    {
     "date": "2026-08-04",
     "close": 12050
    },
    {
     "date": "2026-08-05",
     "close": 12190
    },
    {
     "date": "2026-08-06",
     "close": 12075
    },
    {
     "date": "2026-08-07",
     "close": 12105
    },
    {
     "date": "2026-08-10",
     "close": 12038
    },
    {
     "date": "2026-08-11",
     "close": 11780
    },
    {
     "date": "2026-08-12",
     "close": 11891
    },
    {
     "date": "2026-08-13",
     "close": 11706
    },
    {
     "date": "2026-08-14",
     "close": 11619
    },
    {
     "date": "2026-08-17",
     "close": 11681
    },
    {
     "date": "2026-08-18",
     "close": 11499
    },
    {
     "date": "2026-08-19",
     "close": 11450
    },
    {
     "date": "2026-08-20",
     "close": 11575
    },
    {
     "date": "2026-08-21",
     "close": 11570
    },
    {
     "date": "2026-08-24",
     "close": 11504
    },
    {
     "date": "2026-08-25",
     "close": 11540
    },
    {
     "date": "2026-08-26",
     "close": 11717
    },
    {
     "date": "2026-08-27",
     "close": 11717
    },
    {
     "date": "2026-08-28",
     "close": 11589
    },
    {
     "date": "2026-08-31",
     "close": 11450
    },
    {
     "date": "2026-09-01",
     "close": 11400
    },
    {
     "date": "2026-09-02",
     "close": 11393
    },
    {
     "date": "2026-09-03",
     "close": 11275
    },
    {
     "date": "2026-09-04",
     "close": 11408
    },
    {
     "date": "2026-09-07",
     "close": 11175
    },
    {
     "date": "2026-09-08",
     "close": 11009
    },
    {
     "date": "2026-09-09",
     "close": 10900
    },
    {
     "date": "2026-09-10",
     "close": 10979
    },
    {
     "date": "2026-09-11",
     "close": 11000
    },
    {
     "date": "2026-09-15",
     "close": 10697
    },
    {
     "date": "2026-09-16",
     "close": 10700
    },
    {
     "date": "2026-09-17",
     "close": 10764
    },
    {
     "date": "2026-09-18",
     "close": 11014
    },
    {
     "date": "2026-09-21",
     "close": 11100
    },
    {
     "date": "2026-09-22",
     "close": 11000
    },
    {
     "date": "2026-09-23",
     "close": 11155
    },
    {
     "date": "2026-09-24",
     "close": 11056
    },
    {
     "date": "2026-09-25",
     "close": 11155
    },
    {
     "date": "2026-09-28",
     "close": 11025
    },
    {
     "date": "2026-09-29",
     "close": 10829
    },
    {
     "date": "2026-09-30",
     "close": 10956
    },
    {
     "date": "2026-10-01",
     "close": 10710
    },
    {
     "date": "2026-10-05",
     "close": 10850
    },
    {
     "date": "2026-10-06",
     "close": 10750
    },
    {
     "date": "2026-10-07",
     "close": 10658
    },
    {
     "date": "2026-10-08",
     "close": 10426
    },
    {
     "date": "2026-10-09",
     "close": 10675
    },
    {
     "date": "2026-10-12",
     "close": 10520
    },
    {
     "date": "2026-10-13",
     "close": 10750
    },
    {
     "date": "2026-10-14",
     "close": 10795
    },
    {
     "date": "2026-10-15",
     "close": 10862
    },
    {
     "date": "2026-10-16",
     "close": 10907
    },
    {
     "date": "2026-10-19",
     "close": 10650
    },
    {
     "date": "2026-10-21",
     "close": 10849
    }
   ],
   "sector": "Basic Materials",
   "industry": "Building Materials"
  },
  "WIPRO": {
   "price": 190.41,
   "prevClose": 182.14,
   "change": 8.27,
   "changePct": 4.54,
   "dayHigh": 192.88,
   "dayLow": 188.97,
   "high52": 273.1,
   "low52": 156.79,
   "volume": 45942579,
   "longName": "Wipro Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 174.44
    },
    {
     "date": "2026-07-23",
     "close": 174.82
    },
    {
     "date": "2026-07-24",
     "close": 177.12
    },
    {
     "date": "2026-07-27",
     "close": 178.53
    },
    {
     "date": "2026-07-28",
     "close": 181.12
    },
    {
     "date": "2026-07-29",
     "close": 183.61
    },
    {
     "date": "2026-07-30",
     "close": 186.33
    },
    {
     "date": "2026-07-31",
     "close": 183.65
    },
    {
     "date": "2026-08-03",
     "close": 188.66
    },
    {
     "date": "2026-08-04",
     "close": 186.3
    },
    {
     "date": "2026-08-05",
     "close": 186.99
    },
    {
     "date": "2026-08-06",
     "close": 186.12
    },
    {
     "date": "2026-08-07",
     "close": 187.53
    },
    {
     "date": "2026-08-10",
     "close": 185.5
    },
    {
     "date": "2026-08-11",
     "close": 184.6
    },
    {
     "date": "2026-08-12",
     "close": 183.94
    },
    {
     "date": "2026-08-13",
     "close": 183.1
    },
    {
     "date": "2026-08-14",
     "close": 184
    },
    {
     "date": "2026-08-17",
     "close": 181.9
    },
    {
     "date": "2026-08-18",
     "close": 178.06
    },
    {
     "date": "2026-08-19",
     "close": 179.55
    },
    {
     "date": "2026-08-20",
     "close": 181
    },
    {
     "date": "2026-08-21",
     "close": 180.79
    },
    {
     "date": "2026-08-24",
     "close": 181.31
    },
    {
     "date": "2026-08-25",
     "close": 180.09
    },
    {
     "date": "2026-08-26",
     "close": 177.35
    },
    {
     "date": "2026-08-27",
     "close": 176.4
    },
    {
     "date": "2026-08-28",
     "close": 180.95
    },
    {
     "date": "2026-08-31",
     "close": 184.5
    },
    {
     "date": "2026-09-01",
     "close": 181.7
    },
    {
     "date": "2026-09-02",
     "close": 177.09
    },
    {
     "date": "2026-09-03",
     "close": 175.72
    },
    {
     "date": "2026-09-04",
     "close": 176.4
    },
    {
     "date": "2026-09-07",
     "close": 172.8
    },
    {
     "date": "2026-09-08",
     "close": 171.5
    },
    {
     "date": "2026-09-09",
     "close": 167
    },
    {
     "date": "2026-09-10",
     "close": 166.3
    },
    {
     "date": "2026-09-11",
     "close": 167.4
    },
    {
     "date": "2026-09-15",
     "close": 170
    },
    {
     "date": "2026-09-16",
     "close": 166.89
    },
    {
     "date": "2026-09-17",
     "close": 166.4
    },
    {
     "date": "2026-09-18",
     "close": 166.83
    },
    {
     "date": "2026-09-21",
     "close": 164.55
    },
    {
     "date": "2026-09-22",
     "close": 166
    },
    {
     "date": "2026-09-23",
     "close": 164.9
    },
    {
     "date": "2026-09-24",
     "close": 163.64
    },
    {
     "date": "2026-09-25",
     "close": 164.02
    },
    {
     "date": "2026-09-28",
     "close": 161.56
    },
    {
     "date": "2026-09-29",
     "close": 156.79
    },
    {
     "date": "2026-09-30",
     "close": 158.5
    },
    {
     "date": "2026-10-01",
     "close": 159.35
    },
    {
     "date": "2026-10-05",
     "close": 162.14
    },
    {
     "date": "2026-10-06",
     "close": 161.84
    },
    {
     "date": "2026-10-07",
     "close": 159.6
    },
    {
     "date": "2026-10-08",
     "close": 158.38
    },
    {
     "date": "2026-10-09",
     "close": 162.57
    },
    {
     "date": "2026-10-12",
     "close": 161.8
    },
    {
     "date": "2026-10-13",
     "close": 169
    },
    {
     "date": "2026-10-14",
     "close": 170.92
    },
    {
     "date": "2026-10-15",
     "close": 174.05
    },
    {
     "date": "2026-10-16",
     "close": 184.4
    },
    {
     "date": "2026-10-19",
     "close": 182.14
    },
    {
     "date": "2026-10-21",
     "close": 189.17
    }
   ],
   "sector": "Technology",
   "industry": "Information Technology Services"
  },
  "YESBANK": {
   "price": 16.05,
   "prevClose": 16.88,
   "change": -0.83,
   "changePct": -4.92,
   "dayHigh": 16.52,
   "dayLow": 16.05,
   "high52": 25.78,
   "low52": 16.02,
   "volume": 133611660,
   "longName": "Yes Bank Limited",
   "closes": [
    {
     "date": "2026-07-22",
     "close": 23.24
    },
    {
     "date": "2026-07-23",
     "close": 22.93
    },
    {
     "date": "2026-07-24",
     "close": 22.95
    },
    {
     "date": "2026-07-27",
     "close": 22.94
    },
    {
     "date": "2026-07-28",
     "close": 22.81
    },
    {
     "date": "2026-07-29",
     "close": 22.84
    },
    {
     "date": "2026-07-30",
     "close": 22.54
    },
    {
     "date": "2026-07-31",
     "close": 22.77
    },
    {
     "date": "2026-08-03",
     "close": 23
    },
    {
     "date": "2026-08-04",
     "close": 23
    },
    {
     "date": "2026-08-05",
     "close": 22.97
    },
    {
     "date": "2026-08-06",
     "close": 22.68
    },
    {
     "date": "2026-08-07",
     "close": 22.69
    },
    {
     "date": "2026-08-10",
     "close": 22.75
    },
    {
     "date": "2026-08-11",
     "close": 22.75
    },
    {
     "date": "2026-08-12",
     "close": 22.98
    },
    {
     "date": "2026-08-13",
     "close": 22.98
    },
    {
     "date": "2026-08-14",
     "close": 22.67
    },
    {
     "date": "2026-08-17",
     "close": 22.92
    },
    {
     "date": "2026-08-18",
     "close": 22.46
    },
    {
     "date": "2026-08-19",
     "close": 22.74
    },
    {
     "date": "2026-08-20",
     "close": 22.74
    },
    {
     "date": "2026-08-21",
     "close": 22.8
    },
    {
     "date": "2026-08-24",
     "close": 22.6
    },
    {
     "date": "2026-08-25",
     "close": 22.5
    },
    {
     "date": "2026-08-26",
     "close": 22.38
    },
    {
     "date": "2026-08-27",
     "close": 22.26
    },
    {
     "date": "2026-08-28",
     "close": 22.1
    },
    {
     "date": "2026-08-31",
     "close": 22.83
    },
    {
     "date": "2026-09-01",
     "close": 22.1
    },
    {
     "date": "2026-09-02",
     "close": 22.15
    },
    {
     "date": "2026-09-03",
     "close": 22.54
    },
    {
     "date": "2026-09-04",
     "close": 22.5
    },
    {
     "date": "2026-09-07",
     "close": 22.42
    },
    {
     "date": "2026-09-08",
     "close": 22.52
    },
    {
     "date": "2026-09-09",
     "close": 22.42
    },
    {
     "date": "2026-09-10",
     "close": 22.3
    },
    {
     "date": "2026-09-11",
     "close": 23.48
    },
    {
     "date": "2026-09-15",
     "close": 23.07
    },
    {
     "date": "2026-09-16",
     "close": 23.4
    },
    {
     "date": "2026-09-17",
     "close": 23.13
    },
    {
     "date": "2026-09-18",
     "close": 22.72
    },
    {
     "date": "2026-09-21",
     "close": 23.17
    },
    {
     "date": "2026-09-22",
     "close": 23.2
    },
    {
     "date": "2026-09-23",
     "close": 23.24
    },
    {
     "date": "2026-09-24",
     "close": 22.44
    },
    {
     "date": "2026-09-25",
     "close": 22.5
    },
    {
     "date": "2026-09-28",
     "close": 21.18
    },
    {
     "date": "2026-09-29",
     "close": 20.71
    },
    {
     "date": "2026-09-30",
     "close": 20.95
    },
    {
     "date": "2026-10-01",
     "close": 20.75
    },
    {
     "date": "2026-10-05",
     "close": 21.06
    },
    {
     "date": "2026-10-06",
     "close": 20.86
    },
    {
     "date": "2026-10-07",
     "close": 20.79
    },
    {
     "date": "2026-10-08",
     "close": 20.45
    },
    {
     "date": "2026-10-09",
     "close": 20.5
    },
    {
     "date": "2026-10-12",
     "close": 20.44
    },
    {
     "date": "2026-10-13",
     "close": 20.85
    },
    {
     "date": "2026-10-14",
     "close": 21.2
    },
    {
     "date": "2026-10-15",
     "close": 18.12
    },
    {
     "date": "2026-10-16",
     "close": 17.5
    },
    {
     "date": "2026-10-19",
     "close": 16.88
    },
    {
     "date": "2026-10-21",
     "close": 16.41
    }
   ],
   "sector": "Financial Services",
   "industry": "Banks—Regional"
  }
 }
}
```

### `src/shared/data/market.ts`

```ts
// Market data more than one flow uses (Stocks home, Market, F&O). Sample values, from the live app on 2026-10-17
// (indices and today's top gainers updated from the live app on 2026-10-22).
import { companyLogo } from '@l3/assets/company-logos'
import asahiindiaLogo from '../assets/logos/asahiindia.png'
import crisilLogo from '../assets/logos/crisil.png'
import hoecLogo from '../assets/logos/hoec.png'
import igilLogo from '../assets/logos/igil.png'
import jindrillLogo from '../assets/logos/jindrill.png'
import jublingreaLogo from '../assets/logos/jublingrea.png'
import oilLogo from '../assets/logos/oil.png'
import sagilityLogo from '../assets/logos/sagility.png'
import ttmlLogo from '../assets/logos/ttml.png'

export type MarketIndex = { id: string; name: string; value: number; changePct: number }

export const indices: MarketIndex[] = [
  { id: 'nifty-50', name: 'NIFTY 50', value: 22687.65, changePct: -0.54 },
  { id: 'sensex', name: 'SENSEX', value: 73249.39, changePct: -0.62 },
  { id: 'nifty-bank', name: 'NIFTY BANK', value: 49812.4, changePct: -0.21 },
]

/**
 * A stock as lists show it. `logoUrl` comes from the API (the company logo); until it loads — and in this prototype —
 * the L3 Avatar shows `initials`. Every stock with a logo in the design system (@l3/assets/company-logos — 50 large
 * caps) gets it automatically; a few others use logos cut from the live app's screens (src/shared/assets/logos).
 */
export type Stock = { symbol: string; name: string; price: number; changePct: number; initials: string; logoUrl?: string }

const stock = (symbol: string, name: string, price: number, changePct: number, initials: string, logoUrl?: string): Stock => ({ symbol, name, price, changePct, initials, logoUrl: logoUrl ?? companyLogo(symbol) })

export const stocks = {
  HBLENGINE: stock('HBLENGINE', 'HBL Engineering', 833.15, 17.27, 'HB'),
  SHRIPISTON: stock('SHRIPISTON', 'Shriram Pistons & Rings', 4629.9, 6.85, 'SP'),
  THANGAMAYL: stock('THANGAMAYL', 'Thangamayil Jewellery', 5098.05, 6.41, 'TJ'),
  VAML: stock('VAML', 'Vedanta Aluminium', 371.85, 3.42, 'VA'),
  WELCORP: stock('WELCORP', 'Welspun Corp', 2571.5, 3.4, 'WC'),
  LINDEINDIA: stock('LINDEINDIA', 'Linde India', 6184.55, 3.11, 'LI'),
  IEX: stock('IEX', 'Indian Energy Exchange', 139.42, -6.12, 'IE'),
  ZOMATO: stock('ZOMATO', 'Zomato', 218.6, -4.85, 'ZO'),
  PAYTM: stock('PAYTM', 'One 97 Communications', 712.3, -4.2, 'PT'),
  DELHIVERY: stock('DELHIVERY', 'Delhivery', 341.75, -3.64, 'DL'),
  NYKAA: stock('NYKAA', 'FSN E-Commerce (Nykaa)', 164.1, -3.08, 'NY'),
  POLICYBZR: stock('POLICYBZR', 'PB Fintech', 1532.4, -2.71, 'PB'),
  YESBANK: stock('YESBANK', 'Yes Bank', 18.42, 1.21, 'YB'),
  IDEA: stock('IDEA', 'Vodafone Idea', 8.12, -0.98, 'VI'),
  SUZLON: stock('SUZLON', 'Suzlon Energy', 54.2, 2.35, 'SZ'),
  IRFC: stock('IRFC', 'Indian Railway Finance', 128.65, 0.84, 'IR'),
  NHPC: stock('NHPC', 'NHPC', 78.9, 1.12, 'NH'),
  SOUTHBANK: stock('SOUTHBANK', 'South Indian Bank', 24.35, -0.41, 'SB'),
  NTPC: stock('NTPC', 'NTPC', 331.2, 0.62, 'NT'),
  COALINDIA: stock('COALINDIA', 'Coal India', 381.45, 0.45, 'CI'),
  HAL: stock('HAL', 'Hindustan Aeronautics', 4120.3, 1.08, 'HA'),
  ONGC: stock('ONGC', 'ONGC', 236.9, -0.33, 'ON'),
  SBIN: stock('SBIN', 'State Bank of India', 742.15, 0.27, 'SB'),
  JINDALSTEL: stock('JINDALSTEL', 'Jindal Steel & Power', 862.4, 1.46, 'JS'),
  COHANCE: stock('COHANCE', 'Cohance Lifesciences', 1084.6, 4.97, 'CL'),
  OIL: stock('OIL', 'Oil India', 412.75, 0.88, 'OI', oilLogo),
  IOC: stock('IOC', 'Indian Oil', 128.3, 0.36, 'IO'),
  BPCL: stock('BPCL', 'Bharat Petroleum', 279.55, -0.52, 'BP'),
  // Top gainers on the live app, 2026-10-22
  TTML: stock('TTML', 'Tata Teleservices (Maharashtra)', 38.01, 18.56, 'TT', ttmlLogo),
  IGIL: stock('IGIL', 'International Gemmological Institute', 353.2, 10.0, 'IG', igilLogo),
  CRISIL: stock('CRISIL', 'CRISIL', 4777.2, 4.16, 'CR', crisilLogo),
  SAGILITY: stock('SAGILITY', 'Sagility India', 45.39, 2.21, 'SA', sagilityLogo),
  ASAHIINDIA: stock('ASAHIINDIA', 'Asahi India Glass', 913.55, 2.18, 'AI', asahiindiaLogo),
  JUBLINGREA: stock('JUBLINGREA', 'Jubilant Ingrevia', 609.45, 2.09, 'JI', jublingreaLogo),
  // "Oil Price Dependents" basket
  JINDRILL: stock('JINDRILL', 'Jindal Drilling & Industries', 642.3, 1.12, 'JD', jindrillLogo),
  HINDOILEXP: stock('HINDOILEXP', 'Hindustan Oil Exploration', 171.85, -0.64, 'HO', hoecLogo),
  RELIANCE: stock('RELIANCE', 'Reliance Industries', 1302.4, 0.21, 'RE'),
  TVTODAY: stock('TVTODAY', 'TV Today Network', 168.9, 0.48, 'TV'),
} satisfies Record<string, Stock>
```

### `src/shared/data/marketHandoff.ts`

```ts
/**
 * What another screen asks the Market page to open on — e.g. Home's "View all" on Top Movers opens Market on the US
 * list, Top gainers, with the cap picked on Home. The caller sets it right before going to Market; Market reads it once
 * when it opens (and clears it), so going back to Market later shows its defaults again. In a real app this is the
 * navigation argument of the Market route.
 */
export type MarketHandoff = {
  market: 'in' | 'us'
  /** A Market list tab id ('all', 'gainers', 'losers', 'under-100', 'under-500'). */
  tab?: string
  /** Market filters, by group: 'sort' and 'index' take one id, the others a list (see src/flows/market/data.ts). */
  filters?: Partial<{ sort: string; index: string; quick: string[]; cap: string[]; sector: string[] }>
}

let pending: MarketHandoff | null = null

/** Ask the Market page to open on this market / tab / filters (call it right before going to Market). */
export function handToMarket(handoff: MarketHandoff) {
  pending = handoff
}

/** The Market page: what was handed to it, once (then it's cleared). */
export function takeMarketHandoff(): MarketHandoff | null {
  const handoff = pending
  pending = null
  return handoff
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
// (Lockheed Martin, Northrop Grumman, Samsung) sit on black.
const PLATED_WHITE = new Set('ABB ADI AMAT ASML ASTS BABA BIDU COP GE GRMN HXSCL ISRG KLAC LRCX MRVL MUFG NVO NXPI PDD RKLB RTX SAP SONY TM TSM TXN'.split(' '))
const PLATED_BLACK = new Set(['LMT', 'NOC', 'SSNLF'])
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

### `src/shared/data/user.ts`

```ts
// The sample user every flow uses. FICTIONAL — the live screenshots contain a real customer's details; never copy them.
export type User = {
  name: string
  fatherName: string
  mobile: string
  email: string
  pan: string
  dob: string
  occupation: string
  maritalStatus: string
}

export const user: User = {
  name: 'Rohan Mehta',
  fatherName: 'Suresh Mehta',
  mobile: '9876543210',
  email: 'rohan.mehta@gmail.com',
  pan: 'ABCPM1234K',
  dob: '14 Aug 1996',
  occupation: 'Private sector',
  maritalStatus: 'Single',
}

export type BankAccount = { bank: string; accountNumber: string; ifsc: string; type: 'Savings' | 'Current'; branch: string }

export const bankAccount: BankAccount = {
  bank: 'HDFC Bank',
  accountNumber: '50100234567821',
  ifsc: 'HDFC0001234',
  type: 'Savings',
  branch: 'Andheri West, Mumbai',
}

/** A linked bank account as the money screens show it: the bank's logo symbol (companies.ts) and the last 4 digits. */
export type LinkedBank = BankAccount & { id: string; logoSymbol: string; last4: string; primary?: boolean }

/** The user's linked bank accounts, primary first. "User status → Bank accounts" picks how many the prototype shows. */
export const linkedBanks: LinkedBank[] = [
  { ...bankAccount, id: 'hdfc', logoSymbol: 'HDFCBANK', last4: '7821', primary: true },
  { id: 'icici', bank: 'ICICI Bank', accountNumber: '002101554410', ifsc: 'ICIC0000021', type: 'Savings', branch: 'Powai, Mumbai', logoSymbol: 'ICICIBANK', last4: '4410' },
]

/**
 * A linked account at a bank that can't send money abroad for US Stocks (not an LRS partner) — "User status → Bank
 * accounts: Three" and "SBI only" add it, to show the US Stocks bank step with an account it can't use.
 */
export const otherBank: LinkedBank = { id: 'sbi', bank: 'State Bank of India', accountNumber: '38201945520', ifsc: 'SBIN0000300', type: 'Savings', branch: 'Fort, Mumbai', logoSymbol: 'SBIN', last4: '5520' }
```

### `src/shared/money.module.css`

```css
/* <Usd> with "₹ below": the $ value in the parent's type style, the ≈ ₹ line small and secondary under it. */
.stack {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}
.stack[data-align='end'] {
  align-items: flex-end;
}
.stack[data-align='center'] {
  align-items: center;
}

.inr {
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
  white-space: nowrap;
}
```

### `src/shared/money.tsx`

```tsx
// US Stocks money — every value inside US Stocks is in US dollars (the news, prices and filings users read are in $),
// with its rupee equivalent at the live USD → INR rate available everywhere. How the ₹ shows is a prototype setting
// ("₹ equivalent" in the User status panel), so the same screens try each idea:
//   off    — $ only (the default; the stock and ETF pages still show ≈ ₹ under the price)
//   below  — $ with a small "≈ ₹1,23,456" line under it — only in the order pad since 3 Nov (`layout="stack"`)
//   switch — a $ / ₹ switch (<CurrencySwitch />); picking ₹ turns every US value into rupees, across every screen
// Screens never format a US amount themselves: <Usd value={188.42} /> (or useUsd() where only a string fits).
// The rate is real: USDINR=X in us-market-snapshot.json (`npm run us:snapshot`), ticking around it like the prices
// (live.ts). FLAG: it's a snapshot + simulated movement, not a live FX feed — the real app reads its partner's rate.
import { useSyncExternalStore, type ReactNode } from 'react'
import { Tabs } from '@l3/components/Tabs'
import type { FlowOption } from '../flows/types'
import { usdInrSnapshot } from './data/usStocks'
import { liveDrift, useLiveTick } from './data/live'
import { useFlowOption } from './prototype'
import { USER_STATUS } from './userStatus'
import styles from './money.module.css'

// ── The rate ────────────────────────────────────────────────────────────────────────────────────────────────────────

/** ₹ per $ in the snapshot (the fallback is the 2 Nov 2026 close, should the snapshot lose it). Re-read with the prices. */
const usdInrNow = (): number => usdInrSnapshot() ?? 94.87

/** The USD → INR rate right now: the snapshot's, moving a little every 2 s like a live quote. */
export function useUsdInrRate(): number {
  const at = useLiveTick()
  return Math.round(usdInrNow() * (1 + liveDrift('USDINR', at) / 4) * 100) / 100
}

// ── Formatting ──────────────────────────────────────────────────────────────────────────────────────────────────────

export type MoneyFormat = {
  /** Digits after the point (default 2). */
  decimals?: number
  /** '+' on positive values (gains and changes). Negative values always get '-'. */
  sign?: boolean
  /** Short big numbers: $4.59T / $812.40B / $12.3M, and ₹4.35 L Cr / ₹12.40 Cr / ₹3.20 L. */
  compact?: boolean
}

const fixed = (n: number, locale: string, decimals: number) =>
  n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
const signOf = (n: number, sign?: boolean) => (n < 0 ? '-' : sign && n > 0 ? '+' : '')

/** $1,234.50 · +$12.30 · $4.59T */
export function formatUsd(n: number, { decimals = 2, sign, compact }: MoneyFormat = {}): string {
  const a = Math.abs(n)
  if (compact) {
    const unit = a >= 1e12 ? ['T', 1e12] : a >= 1e9 ? ['B', 1e9] : a >= 1e6 ? ['M', 1e6] : undefined
    if (unit) return `${signOf(n, sign)}$${fixed(a / (unit[1] as number), 'en-US', 2)}${unit[0]}`
  }
  return `${signOf(n, sign)}$${fixed(a, 'en-US', decimals)}`
}

/** ₹1,23,456.78 · +₹1,064 · ₹4.35 L Cr (Indian grouping and units) */
export function formatInr(n: number, { decimals = 2, sign, compact }: MoneyFormat = {}): string {
  const a = Math.abs(n)
  if (compact) {
    const unit = a >= 1e12 ? [' L Cr', 1e12] : a >= 1e7 ? [' Cr', 1e7] : a >= 1e5 ? [' L', 1e5] : undefined
    if (unit) return `${signOf(n, sign)}₹${fixed(a / (unit[1] as number), 'en-IN', 2)}${unit[0]}`
  }
  return `${signOf(n, sign)}₹${fixed(a, 'en-IN', decimals)}`
}

/**
 * A $ amount written as text → the number and how it was written, so sample strings can go through <Usd text="…" />:
 * '$188.42' → 188.42 · '+$12.30' → 12.3 · '-$5' → -5 · '$4.59T' → 4.59e12. Not a $ amount → undefined.
 */
export function parseUsd(text: string): { value: number; format: MoneyFormat } | undefined {
  const m = /^\s*([+-−])?\s*\$\s*([\d,]+(?:\.\d+)?)\s*([KMBT])?\s*$/.exec(text)
  if (!m) return undefined
  const digits = m[2].replace(/,/g, '')
  const scale = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[m[3] as 'K' | 'M' | 'B' | 'T'] ?? 1
  const value = Number(digits) * scale * (m[1] === '-' || m[1] === '−' ? -1 : 1)
  return { value, format: { decimals: digits.split('.')[1]?.length ?? 0, sign: m[1] === '+', compact: scale >= 1e6 } }
}

// ── The setting and the switch ──────────────────────────────────────────────────────────────────────────────────────

export type InrDisplay = 'off' | 'below' | 'switch'
export type UsCurrency = 'usd' | 'inr'

/** The app-level setting (shown in the User status panel, beside the phone on the US screens that show most money). */
export const moneyOptions: FlowOption[] = [
  {
    id: 'inrDisplay',
    group: 'US Stocks money',
    label: '₹ equivalent',
    values: [{ value: 'off', label: '$ only' }, { value: 'below', label: '₹ below' }, { value: 'switch', label: '$ / ₹ switch' }],
    // $ only by default (3 Nov): the ₹ shows when picked here. The stock and ETF pages are the exception — their price
    // always has its ≈ ₹ under it.
    default: 'off',
    // The Home and its US tab screens (the US tab's fixed states show $ amounts too), a US stock page, the wallet's US tab.
    floatOn: ['stocks-01', 'stocks-09', 'stocks-10', 'stocks-13', 'stocks-14', 'stocks-15', 'stocks-16', 'stocks-17', 'stocks-19', 'stocks-20', 'stocks-21', 'us-stocks-13', 'us-stocks-54'],
  },
]

const useInrDisplay = () => useFlowOption(USER_STATUS, 'inrDisplay', moneyOptions[0].default) as InrDisplay

// The currency picked on the switch: one for the whole app, remembered on this device (like a real app's preference).
const CURRENCY_KEY = 'us-currency'
let currency: UsCurrency = (() => {
  try {
    return localStorage.getItem(CURRENCY_KEY) === 'inr' ? 'inr' : 'usd'
  } catch {
    return 'usd'
  }
})()
const currencyListeners = new Set<() => void>()
const subscribeCurrency = (l: () => void) => (currencyListeners.add(l), () => void currencyListeners.delete(l))

export function setUsCurrency(next: UsCurrency) {
  currency = next
  try {
    localStorage.setItem(CURRENCY_KEY, next)
  } catch {
    /* private window: just this session */
  }
  currencyListeners.forEach((l) => l())
}

export type MoneyDisplay = {
  /** How the ₹ shows (the setting). */
  inr: InrDisplay
  /** The currency values are in right now: ₹ only when the switch is on and set to ₹. */
  currency: UsCurrency
  /** ₹ per $ right now. */
  rate: number
}

export function useMoneyDisplay(): MoneyDisplay {
  const inr = useInrDisplay()
  const picked = useSyncExternalStore(subscribeCurrency, () => currency, () => 'usd' as UsCurrency)
  return { inr, currency: inr === 'switch' ? picked : 'usd', rate: useUsdInrRate() }
}

/**
 * A US amount as text, in the currency showing: `const usd = useUsd(); usd(188.42)` → "$188.42" (or "₹17,875.40" with
 * the switch on ₹). For places that only take a string (a button label, a sentence, a chart axis). No "≈ ₹" line.
 */
export function useUsd() {
  const { currency, rate } = useMoneyDisplay()
  return (usd: number, format: MoneyFormat = {}) =>
    currency === 'inr' ? formatInr(usd * rate, { ...format, decimals: format.compact ? 2 : format.decimals ?? 2 }) : formatUsd(usd, format)
}

/** The rupee line on its own ("≈ ₹17,875"), only with the "₹ below" setting. For a ₹ line that sits apart from its $. */
export function useInrEquivalent() {
  const { inr, rate } = useMoneyDisplay()
  return (usd: number, format: MoneyFormat = {}) => (inr === 'below' ? `≈ ${formatInr(usd * rate, { decimals: 0, ...format })}` : undefined)
}

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────────────

export type UsdProps = MoneyFormat & {
  /** The amount in $ … */
  value?: number
  /** … or a $ amount written as text ('$188.42', '+$12.30', '$4.59T'); anything else shows as it is. */
  text?: string
  /**
   * `inline` (default): no ₹ line — the switch still turns it into ₹. `stack`: the ≈ ₹ line goes under the value, with
   * the "₹ below" setting. Since 3 Nov only the order pad asks for it (its Fee breakdown); listing cards, pages and
   * sheets show $ only.
   */
  layout?: 'stack' | 'inline'
  /** Text-align of the stack (a right-aligned column → 'end'). */
  align?: 'start' | 'end' | 'center'
  className?: string
}

/**
 * A US amount. Shows $ (or ₹ with the switch on ₹) in the parent's own type style, and with "₹ below" a small
 * secondary "≈ ₹…" line under it. `<Usd value={1234.5} />` · `<Usd text="+$12.30" />` · `<Usd value={4.59e12} compact />`
 */
export function Usd({ value, text, layout = 'inline', align = 'start', className, ...format }: UsdProps) {
  const usd = useUsd()
  const below = useInrEquivalent()
  const parsed = value === undefined && text !== undefined ? parseUsd(text) : undefined
  if (value === undefined && !parsed) return <span className={className}>{text}</span>
  const amount = value ?? parsed!.value
  const f: MoneyFormat = parsed ? { ...parsed.format, ...format } : format
  const main = usd(amount, f)
  const line = layout === 'stack' ? below(amount, { sign: f.sign, compact: f.compact }) : undefined
  if (!line) return <span className={className}>{main}</span>
  return (
    <span className={[styles.stack, className].filter(Boolean).join(' ')} data-align={align}>
      <span>{main}</span>
      <span className={styles.inr}>{line}</span>
    </span>
  )
}

/** Just the "≈ ₹…" line, for a layout that puts it apart from the $ (under a big balance, say). Nothing unless "₹ below". */
export function InrEquivalent({ usd, className, ...format }: MoneyFormat & { usd: number; className?: string }): ReactNode {
  const line = useInrEquivalent()(usd, format)
  return line ? <span className={[styles.inr, className].filter(Boolean).join(' ')}>{line}</span> : null
}

/**
 * The $ / ₹ switch (L3 pill group, small). Shows only with the "$ / ₹ switch" setting; the pick applies to every US
 * value in the app. Put it where the money is: the wallet's balance, the portfolio's value, a stock page's price.
 */
export function CurrencySwitch({ className }: { className?: string }) {
  const { inr, currency } = useMoneyDisplay()
  if (inr !== 'switch') return null
  return (
    <Tabs
      className={className}
      appearance="pill-group"
      size="sm"
      aria-label="Show values in"
      items={[{ value: 'usd', label: '$ USD' }, { value: 'inr', label: '₹ INR' }]}
      value={currency}
      onChange={(v) => setUsCurrency(v as UsCurrency)}
    />
  )
}
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
  /** An `over` screen (a sheet over the screen the user is on): the screen under it — closing the sheet goes there. */
  under?: string
}

export const PreviewContext = createContext<Preview>({ interactive: false, go: () => {} })
export const usePreview = () => useContext(PreviewContext)

// ---- Which way the next move goes ------------------------------------------------------------------------------------
// The preview guesses a move's direction (a screen visited before, or one earlier in the same flow, is "back"). A tap can
// say it instead: Deposit opens Add money (listed earlier in the flow) as a page going forward; a back button's fallback
// (nothing in the history) is back, and replaces the page instead of adding to the history.
let intent: { id: string; direction: 'forward' | 'back' } | null = null

/** Say the move to screen `id` that is about to happen is forward (a page opening) or back. */
export const markMove = (id: string, direction: 'forward' | 'back') => {
  intent = { id, direction }
}

/** The preview: the direction said for a move to `id`, if any. */
export const moveIntent = (id: string) => (intent?.id === id ? intent.direction : undefined)

/** The preview: the move happened. */
export const clearMoveIntent = () => {
  intent = null
}

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

### `src/shared/ui/MainNav.tsx`

```tsx
import { BottomNavbar } from '@l3/components/BottomNavbar'
import { NavIcon } from '@l3/components/BottomNavbar/NavIcon'

export type Section = 'stocks' | 'market' | 'portfolio' | 'mutualFund' | 'fno'

const items: { value: Section; label: string }[] = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'market', label: 'Market' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'mutualFund', label: 'Mutual Fund' },
  { value: 'fno', label: 'F&O' },
]

/** The Lemonn app's main bottom navbar (L3: Bottom Navbar). Every L1 screen uses this — never a lookalike. */
export function MainNav({ value, onChange }: { value: Section; onChange?: (value: Section) => void }) {
  return (
    <BottomNavbar
      aria-label="Main"
      value={value}
      onChange={(v) => onChange?.(v as Section)}
      items={items.map((i) => ({ ...i, icon: <NavIcon name={i.value} />, selectedIcon: <NavIcon name={i.value} selected /> }))}
    />
  )
}

/** The first screen of each tab that's built so far (prototype navigation). Tabs not built yet stay where they are. */
// Portfolio and Mutual Fund have no flow of their own yet: their tabs open the US Stocks prototype's pages (imported
// from the teammate's file, branch jojo).
const tabScreens: Partial<Record<Section, string>> = { stocks: 'stocks-01', market: 'market-01', portfolio: 'us-stocks-05', mutualFund: 'us-stocks-07', fno: 'fno-01' }

// The navbar is the app's parent: the Stocks tab returns to the Stocks home as it was left — the same screen and the
// same IND / US tab inside it (a real app keeps the tab's page alive).
let lastStocks: { screen: string; market: 'in' | 'us' } | null = null
let restoring: { screen: string; market: 'in' | 'us' } | null = null

/** The Stocks home reports where it is (its screen and its IND / US tab) whenever that changes. */
export function rememberStocksHome(screen: string, market: 'in' | 'us') {
  lastStocks = { screen, market }
}

/**
 * The Stocks home, when it opens: the IND / US tab to come back to — if the navbar brought the user back to it, or a
 * back move did (back from a stock page, Market, the wallet … returns to the tab it was opened from).
 */
export function takeStocksTab(screen: string, cameBack = false): 'in' | 'us' | undefined {
  const back = restoring ?? (cameBack ? lastStocks : null)
  restoring = null
  return back && back.screen === screen ? back.market : undefined
}

/** The navbar's onChange in a flow: `onTab={(t) => goToTab(go, t)}`. */
export const goToTab = (go: (id: string) => void, section: Section) => {
  if (section === 'stocks' && lastStocks) {
    restoring = lastStocks
    go(lastStocks.screen)
    return
  }
  const id = tabScreens[section]
  if (id) go(id)
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

### `src/shared/ui/StockListCard.module.css`

```css
/* Price (Label 14, matching the symbol) over the day's change, right-aligned (numbers are Label, never Description). */
.price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--l3-spacing-02);
  white-space: nowrap;
}

.value {
  font: var(--l3-text-label-14);
}

/* FLAG: L3 gap — a static ListCell card has no shadow; the app gives every stock card L3's soft one (as Portfolio's holdings). */
.static[data-variant='card'] {
  box-shadow: inset 0 0 0 1px var(--l3-border-light), var(--l3-shadow-elevation-soft); /* 1px: Figma stroke weight has no variable */
}
```

### `src/shared/ui/StockListCard.tsx`

```tsx
import type { ReactNode } from 'react'
import { Avatar } from '@l3/components/Avatar'
import { ListCell } from '@l3/components/ListCell'
import { PriceChange } from '@l3/components/PriceChange'
import styles from './StockListCard.module.css'

type StockListCardProps = {
  /** Ticker, e.g. "RELIANCE" or "QQQ" (L3 Label 14, one line). */
  symbol: string
  /** Company or fund name (L3 Description 12, one line with "…"). */
  name: string
  /** Logo image URL (a square image; ETFs pass their issuer logo on its plate). Without one the Avatar shows `initials`. Always the L3 Avatar at 40, so every list looks the same. */
  logoUrl?: string
  initials?: string
  /**
   * The logo itself, for a list that marks it (e.g. a Boosted ETF's "3x" pill on the logo's foot). Build it around the
   * same L3 Avatar at 40; without it the card draws that Avatar from `logoUrl` / `initials`.
   */
  logo?: ReactNode
  /** A small Tag after the symbol, e.g. "3x Long" (an L3 Tag, keeping its own colour; ListCell's label suffix). */
  tag?: ReactNode
  /** The price, already formatted by the caller: `<Usd value>` for US, `inr()` for India. */
  price: ReactNode
  /**
   * The day's change in %, shown with its sign in green / red — never an arrow too (the user's rule, 3 Nov). Leave it
   * out when the right side is one number that isn't a price, e.g. a holding's weight in an ETF's Top holdings.
   */
  changePct?: number
  /** Opens the stock / ETF page. Without it the card is static (no fill, no press). */
  onOpen?: () => void
  'aria-label'?: string
}

/**
 * The one stock row of the app, as a card — the Market list's style, used wherever stocks or ETFs are listed:
 * logo · symbol over name · price over the day's change. Every card wears L3's soft shadow (`elevation-soft`, the user's
 * call on 4 Nov): tappable ones get it from ListCell (raised, the default); static ones (no `onOpen`) from `.static`.
 *
 * Symbol in Label 14 = `labelSize="14"` (list-cell 1.9.0).
 */
export function StockListCard({ symbol, name, logoUrl, initials, logo, tag, price, changePct, onOpen, ...rest }: StockListCardProps) {
  return (
    <ListCell
      variant="card"
      as={onOpen ? 'button' : undefined}
      className={onOpen ? undefined : styles.static}
      iconLeft={logo ?? <Avatar initials={initials ?? symbol.slice(0, 2)} src={logoUrl} size={40} label={name} />}
      labelSuffix={tag || undefined}
      labelSuffixTone="neutral"
      labelSize="14"
      label={symbol}
      description={name}
      trailing={
        <span className={styles.price}>
          <span className={styles.value}>{price}</span>
          {changePct !== undefined && <PriceChange value={changePct} size="sm" />}
        </span>
      }
      onClick={onOpen}
      aria-label={rest['aria-label']}
    />
  )
}
```

### `src/shared/userStatus.ts`

```ts
// Where the user is in the app — the prototype's app-level settings ("User status" in the preview panel, the phone's
// settings sheet and a floating card beside the phone). Every screen that depends on it reads it here, so they all stay
// in sync: pick "US Stocks: activated · money on the way" once and the Home's US tab, a US stock page and the wallet all
// show that state. Picking never moves on by itself; taps in the prototype don't change it.
// In a real app these come from the user's account (KYC status, US Stocks activation, wallet, holdings).
import type { FlowOption } from '../flows/types'
import { setFlowOption, useFlowOption } from './prototype'
import { linkedBanks, otherBank, type LinkedBank } from './data/user'

/** The settings' owner in the preview (as a flow id: where the picks are remembered). */
export const USER_STATUS = 'app'

export type KycStatus = 'done' | 'pending'
export type UsActivation = 'kyc' | 'off' | 'review' | 'support' | 'failed' | 'active'
export type UsWallet = 'empty' | 'onTheWay' | 'funded'
export type UsHoldings = 'none' | 'some'
export type BankLinks = 'none' | 'one' | 'two' | 'three' | 'sbi'

/**
 * Screens that change with the user status: the settings float beside the phone on these (desktop preview). The Home,
 * its US tab screens (each one sets the status to its own state on arrival, then follows a pick), a US stock page and
 * the wallet's US tab.
 */
/** The add-money screens and the wallet: the bank row and its sheet change with the user's linked banks. */
const BANK_SCREENS = ['deposit-01', 'deposit-06', 'deposit-07', 'deposit-08', 'deposit-09', 'us-stocks-21', 'us-stocks-22', 'us-stocks-23', 'us-stocks-24', 'us-stocks-53', 'us-stocks-54', 'us-stocks-95']

const STATUS_SCREENS = ['stocks-01', 'stocks-09', 'stocks-10', 'stocks-13', 'stocks-14', 'stocks-15', 'stocks-16', 'stocks-17', 'stocks-19', 'stocks-20', 'stocks-21', 'us-stocks-13', 'us-stocks-54']

/** The settings, parent first: each one below only matters (and shows) while the one above has the listed values. */
export const userStatusOptions: FlowOption[] = [
  {
    // One list for the whole way in, in order, named by where US Stocks are: not active while the Lemonn KYC is pending
    // (US Stocks can't be activated until it's done), not active, then the activation steps.
    id: 'us',
    group: 'User status',
    label: 'US Stocks',
    picker: 'dropdown',
    values: [
      { value: 'kyc', label: 'Not active · KYC pending' },
      { value: 'off', label: 'Not active' },
      { value: 'review', label: 'Under review' },
      { value: 'support', label: 'Under review · contact support' },
      { value: 'failed', label: 'Activation failed' },
      { value: 'active', label: 'Active' },
    ],
    // The prototype opens on a user who's all set: activated, money in the wallet, holding US stocks.
    default: 'active',
    floatOn: STATUS_SCREENS,
  },
  {
    id: 'usWallet',
    group: 'User status',
    label: 'USD wallet',
    values: [{ value: 'empty', label: '$0' }, { value: 'onTheWay', label: 'Money on the way' }, { value: 'funded', label: 'Has money' }],
    default: 'funded',
    showIf: { us: ['active'] },
    floatOn: STATUS_SCREENS,
  },
  {
    id: 'usHoldings',
    group: 'User status',
    label: 'US holdings',
    picker: 'toggle',
    values: [{ value: 'none', label: 'None' }, { value: 'some', label: 'Holds NVDA' }],
    default: 'some',
    showIf: { usWallet: ['funded'] },
    floatOn: STATUS_SCREENS,
  },
  {
    // Bank accounts linked to Lemonn (KYC adds the first). None = the add-money screens ask for one first.
    id: 'banks',
    group: 'User status',
    label: 'Bank accounts',
    // Three / SBI only: with an account at a bank US Stocks money can't go from (State Bank of India).
    values: [{ value: 'none', label: 'None' }, { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'three', label: 'Three (+ SBI)' }, { value: 'sbi', label: 'SBI only' }],
    default: 'three',
    floatOn: BANK_SCREENS,
  },
]

const option = (id: string) => userStatusOptions.find((o) => o.id === id)!
const useStatus = (id: string) => useFlowOption(USER_STATUS, id, option(id).default)

export type UserStatus = { kyc: KycStatus; us: UsActivation; usWallet: UsWallet; usHoldings: UsHoldings; banks: BankLinks }

/** The user status as picked (settings under one that's off keep their last pick). KYC comes from the activation list. */
export function useUserStatus(): UserStatus {
  const us = useStatus('us') as UsActivation
  return {
    kyc: us === 'kyc' ? 'pending' : 'done',
    us,
    usWallet: useStatus('usWallet') as UsWallet,
    usHoldings: useStatus('usHoldings') as UsHoldings,
    banks: useStatus('banks') as BankLinks,
  }
}

/**
 * The bank accounts the user has linked, as picked in "User status → Bank accounts" (primary first). Money in the USD
 * wallet (on the way or landed) came from a bank, so then "None" counts as one — as in the real app, a user with money
 * moving always has a bank.
 */
export function useLinkedBanks(): LinkedBank[] {
  const picked = useStatus('banks') as BankLinks
  const us = useStatus('us') as UsActivation
  const usWallet = useStatus('usWallet') as UsWallet
  const moneyMoved = us === 'active' && usWallet !== 'empty'
  const banks = picked === 'none' && moneyMoved ? 'one' : picked
  const linked = { none: [], one: linkedBanks.slice(0, 1), two: linkedBanks, three: [...linkedBanks, otherBank], sbi: [{ ...otherBank, primary: true }] }[banks]
  return addedBank ? [...linked, addedBank] : linked
}

// A bank account added in the prototype ("Add bank account" → verified). Kept in memory, so a reload starts without it.
let addedBank: LinkedBank | undefined
let addBankOpener: string | undefined

/** An add-money screen (₹ or US) opens "Add bank account": remember which, so the verified account comes back to it. */
export const startAddBank = (fromScreen?: string) => { addBankOpener = fromScreen }
/** The add-money screen that opened "Add bank account" (undefined when it was opened straight from the screen list). */
export const addBankReturnScreen = () => addBankOpener
/** The ₹1 check passed: the account joins the linked banks, and the add-money screens pick it. */
export const linkBank = (bank: LinkedBank) => { addedBank = bank }
/** The account added in this session, if any. */
export const newlyLinkedBank = () => addedBank

/**
 * Where the user is with US Stocks, as one step: KYC pending → 'kyc'; not activated → 'activate'; under review /
 * contact support / failed; activated → $0 'activated', 'onTheWay', or with money 'ready' / 'holding'.
 * (The Stocks flow's UsState uses the same names.)
 */
export type UsJourney = 'kyc' | 'activate' | 'review' | 'support' | 'failed' | 'activated' | 'onTheWay' | 'ready' | 'holding'

export function usJourney({ kyc, us, usWallet, usHoldings }: UserStatus): UsJourney {
  if (kyc === 'pending' || us === 'kyc') return 'kyc'
  if (us === 'off') return 'activate'
  if (us !== 'active') return us
  if (usWallet === 'empty') return 'activated'
  if (usWallet === 'onTheWay') return 'onTheWay'
  return usHoldings === 'some' ? 'holding' : 'ready'
}

export const useUsJourney = () => usJourney(useUserStatus())

/** Sets the user status to one US Stocks step (a US tab screen showing its own state sets it on arrival). */
export function setUsJourney(step: UsJourney) {
  const us: UsActivation = step === 'activate' ? 'off' : ['kyc', 'review', 'support', 'failed'].includes(step) ? (step as UsActivation) : 'active'
  const set = (id: string, value: string) => setFlowOption(USER_STATUS, id, option(id).default, value)
  set('us', us)
  if (us !== 'active') return
  set('usWallet', step === 'activated' ? 'empty' : step === 'onTheWay' ? 'onTheWay' : 'funded')
  if (step === 'ready' || step === 'holding') set('usHoldings', step === 'holding' ? 'some' : 'none')
}
```
