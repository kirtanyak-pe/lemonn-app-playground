# Flow: Market (`market`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

The Market tab — stock lists (all, gainers, losers, under ₹100 / ₹500) and Filters.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/market · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/market.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `market-01` | Market · All | — | `search-24` | The filter bar shows "Apply filters" until something is applied. |
| `market-02` | Market · Top gainers | — | `search-24` | Same layout — only the list changes. |
| `market-03` | Market · Top losers | — | `search-24` |  |
| `market-04` | Market · Under ₹100 | — | `search-24` |  |
| `market-05` | Filters | — | `search-24` | Side tabs on the left (grey rail, the open one connected to the pane); only the open group on the right. Opens on Sort by. |
| `market-06` | Filters · indices | — | `search-24` | Indices open — Nifty 500 picked (one choice); its side tab shows 1. Each option says how many stocks it gives. |
| `market-07` | Filters · sectors (several) | — | `search-24` | Sectors open — Banking and IT picked (any number); sort and index picked too. Sectors with no stocks in Nifty 500 are off. |
| `market-08` | Market · filters applied | — | `search-24` | One removable chip per pick; the filter button gets a dot. |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the screens in this folder and the live app — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/market · one screen: `#/market-01`
- **Source:** screenshots of the live app's Market tab and its filters (dark theme), shared 2026-10-17 — no Figma yet.
  Rebuilt in L3; the filter sheet is redesigned.
- **Status:** 🟨 lists + filters done · 2026-10-17
- **Entry:** the Market tab of the main navbar. **Exit:** a stock opens its page (not built yet); the navbar.

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

### Navigation

```
market-0x ─filter button─▶ Filters (sheet) ─Show n stocks─▶ the list, filtered (chips + dot)
                              └Cancel / backdrop / drag down─▶ unchanged
chip ✕ ─▶ that filter removed · list tab ─▶ same screen, another list (filters stay)
navbar Stocks / Market ─▶ the other tab (instant — a tab switch, no push)
Search (top bar) ─▶ search-24 (Search flow: Stocks tab, keyboard up) ─back─▶ market-01
```

### Data

`data.ts` — one set of stocks (`universe`), each with symbol, name, price, day change, sector, cap (small < ₹5,000 Cr,
mid ₹5,000–20,000 Cr, large > ₹20,000 Cr), market cap and the indices it's in. Every list comes from it:
- Tabs (`listFor`): All · Top gainers (rising, biggest first) · Top losers (falling, biggest first) · Under ₹100 ·
  Under ₹500.
- Filters (`filterGroups`): Sort by · Quick filters · Indices · Market cap · Sectors. Sort and Indices take one choice
  (`select: 'one'`); Quick filters, Market cap and Sectors take any number (`select: 'any'` — a stock matches the group
  if it matches any choice). Groups combine (all must match); sort orders the result (`applyFilters`). `Filters` holds
  one id (sort, index) or a list (quick, cap, sector); `pickedIn`, `withPicks`, `picks` read and change it. Tickers and
  prices are samples from the live app.
- API: the list for a tab + filter params (sort, index, quick[], cap[], sector[]) → stocks + a count per option (the
  facet counts the sheet shows); live prices on the list.

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar | `title="Market"` (L1, Heading/18), actions Search + Wallet, list tabs in `bottom` (sticky) |
| List tabs | Tabs | `underline` — hug + scroll (5 tabs) |
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

### `src/flows/market/components/StockRow.module.css`

```css
/* Price over the day's change, right-aligned (numbers are Label, never Description). */
.price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--l3-spacing-02);
  white-space: nowrap;
}

.value {
  font: var(--l3-text-label-16);
}
```

### `src/flows/market/components/StockRow.tsx`

```tsx
import { Avatar } from '@l3/components/Avatar'
import { ListCell } from '@l3/components/ListCell'
import { PriceChange } from '@l3/components/PriceChange'
import { inr } from '../../../shared/data/format'
import type { MarketStock } from '../data'
import styles from './StockRow.module.css'

/** One stock in a Market list: logo, symbol, company, price and the day's change. Opens the stock page. */
export function StockRow({ stock, onOpen }: { stock: MarketStock; onOpen?: (symbol: string) => void }) {
  return (
    <ListCell
      variant="card"
      as="button"
      iconLeft={<Avatar initials={stock.initials} src={stock.logoUrl} size={40} label={stock.name} />}
      label={stock.symbol}
      description={stock.name}
      trailing={
        <span className={styles.price}>
          <span className={styles.value}>{inr(stock.price)}</span>
          <PriceChange value={stock.changePct} size="sm" arrow />
        </span>
      }
      onClick={() => onOpen?.(stock.symbol)}
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
  "tab.all": "All",
  "tab.gainers": "Top gainers",
  "tab.losers": "Top losers",
  "tab.under-100": "Under ₹100",
  "tab.under-500": "Under ₹500",
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

/**
 * Market — every list on the tab comes from one set of stocks, so the tabs, filters and sort stay consistent.
 * Sample market data (tickers and prices from the live app, 2026-10-17; index / sector / cap tags are samples).
 */

export type Cap = 'small' | 'mid' | 'large'
export type MarketStock = Stock & { sector: SectorId; cap: Cap; marketCapCr: number; indices: IndexId[] }

export type IndexId = 'nifty-50' | 'nifty-500' | 'nifty-midcap-100' | 'nifty-auto' | 'nifty-pvt-bank' | 'nifty-fin-25-50' | 'nifty100-lowvol30' | 'finnifty' | 'nifty-growsect-15'
export type SectorId = 'oil-gas' | 'agriculture' | 'pharma' | 'auto' | 'infra' | 'building-materials' | 'engineering' | 'it' | 'banking' | 'fmcg' | 'finance' | 'consumer'

const s = (symbol: string, name: string, price: number, changePct: number, sector: SectorId, marketCapCr: number, indices: IndexId[] = []): MarketStock => ({
  symbol, name, price, changePct, sector, marketCapCr, indices,
  cap: marketCapCr < 5000 ? 'small' : marketCapCr <= 20000 ? 'mid' : 'large',
  initials: symbol.slice(0, 2),
})

export const universe: MarketStock[] = [
  s('TRICOMFRU', 'Tricom Fruit Products', 1.7, 4.94, 'agriculture', 4),
  s('IWP', 'Indian Wood Products', 35.62, -0.67, 'building-materials', 228),
  s('SAPPHIRE', 'Sapphire Foods India', 197.15, 0.41, 'consumer', 6335),
  s('RSSOFTWARE', 'R. S. Software (India)', 29.48, 1.66, 'it', 76),
  s('AGARWALEYE', 'Dr. Agarwal’s Health Care', 465.8, -2.38, 'pharma', 14720),
  s('WITS', 'Wherrelz IT Solutions', 135, 0, 'it', 17),
  s('CKKRETAIL', 'C K K Retail Mart', 258.65, 20, 'consumer', 412),
  s('DATAKOSA', 'Datakosa', 16.38, 20, 'it', 35),
  s('ONWARDTEC', 'Onward Technologies', 427.4, 19.99, 'it', 968),
  s('INFRAX', 'Infrax Renewable', 175.65, 19.98, 'infra', 288),
  s('COMFINTE', 'Comfort Intech', 7.74, 19.81, 'finance', 248),
  s('PECOS', 'Pecos Hotels and Pubs', 193.95, 19.72, 'consumer', 25),
  s('SBICARD', 'SBI Cards and Payment Services', 564.2, -1.57, 'finance', 53680, ['nifty-500', 'nifty-fin-25-50', 'finnifty']),
  s('WELSPUNLIV', 'Welspun Living', 219.3, 1.15, 'consumer', 21310, ['nifty-500']),
  s('DIVISLAB', 'Divi’s Laboratories', 9144.5, 1.27, 'pharma', 242760, ['nifty-50', 'nifty-500', 'nifty100-lowvol30']),
  s('ENRIN', 'Siemens Energy India', 2889, -2.3, 'engineering', 102880, ['nifty-500']),
  s('TMPV', 'Tata Motors Passenger Vehicles', 286.85, -0.07, 'auto', 105620, ['nifty-50', 'nifty-500', 'nifty-auto']),
  s('IOB', 'Indian Overseas Bank', 30.99, 0.81, 'banking', 59680, ['nifty-500']),
  s('ICICIBANK', 'ICICI Bank', 1342.6, 0.92, 'banking', 957300, ['nifty-50', 'nifty-500', 'nifty-pvt-bank', 'nifty-fin-25-50', 'finnifty', 'nifty100-lowvol30']),
  s('ITC', 'ITC', 412.35, 0.38, 'fmcg', 516200, ['nifty-50', 'nifty-500', 'nifty100-lowvol30', 'nifty-growsect-15']),
  s('INFY', 'Infosys', 1508.9, -1.12, 'it', 626400, ['nifty-50', 'nifty-500', 'nifty-growsect-15']),
  s('IEX', 'Indian Energy Exchange', 139.42, -6.12, 'infra', 12430, ['nifty-500', 'nifty-midcap-100']),
  s('ZOMATO', 'Eternal (Zomato)', 218.6, -4.85, 'consumer', 210800, ['nifty-50', 'nifty-500']),
  s('PAYTM', 'One 97 Communications', 712.3, -4.2, 'finance', 45300, ['nifty-500', 'nifty-midcap-100']),
  s('DELHIVERY', 'Delhivery', 341.75, -3.64, 'consumer', 25260, ['nifty-500', 'nifty-midcap-100']),
  s('YESBANK', 'Yes Bank', 18.42, 1.21, 'banking', 57800, ['nifty-500', 'nifty-midcap-100']),
  s('ONGC', 'Oil and Natural Gas Corporation', 236.9, -0.33, 'oil-gas', 298000, ['nifty-50', 'nifty-500']),
  s('MARUTI', 'Maruti Suzuki', 12480.5, 0.54, 'auto', 392400, ['nifty-50', 'nifty-500', 'nifty-auto']),
]

/** The Market tabs: same layout, a different list (and, for the movers, a different order). */
export type MarketTab = 'all' | 'gainers' | 'losers' | 'under-100' | 'under-500'
/** In order. Their names are in copy.json (tab.<id>). */
export const tabs: MarketTab[] = ['all', 'gainers', 'losers', 'under-100', 'under-500']

export const listFor = (tab: MarketTab): MarketStock[] => {
  switch (tab) {
    case 'gainers': return [...universe].filter((x) => x.changePct > 0).sort((a, b) => b.changePct - a.changePct)
    case 'losers': return [...universe].filter((x) => x.changePct < 0).sort((a, b) => a.changePct - b.changePct)
    case 'under-100': return universe.filter((x) => x.price < 100)
    case 'under-500': return universe.filter((x) => x.price < 500)
    default: return universe
  }
}

/**
 * Filters: five groups. Sort and Indices take one choice (radio); Quick filters, Market cap and Sectors take any number
 * (checkbox) — a stock matches a group if it matches any choice in it. Groups combine (all must match); sort orders the
 * result.
 */
export type FilterGroupId = 'sort' | 'quick' | 'index' | 'cap' | 'sector'
export type FilterOption = { id: string; label: string; description?: string; test?: (x: MarketStock) => boolean }
/** A group's name is in copy.json (group.<id>). */
export type FilterGroup = { id: FilterGroupId; select: 'one' | 'any'; options: FilterOption[] }

const inIndex = (id: IndexId) => (x: MarketStock) => x.indices.includes(id)
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
      { id: 'nifty-midcap-100', label: 'NIFTY Midcap 100', test: inIndex('nifty-midcap-100') },
      { id: 'banking', label: 'Banking stocks', test: inSector('banking') },
      { id: 'fmcg', label: 'FMCG stocks', test: inSector('fmcg') },
      { id: 'it', label: 'IT stocks', test: inSector('it') },
    ],
  },
  {
    id: 'index', select: 'one', options: [
      { id: 'nifty-50', label: 'Nifty 50', test: inIndex('nifty-50') },
      { id: 'nifty-500', label: 'Nifty 500', test: inIndex('nifty-500') },
      { id: 'nifty-auto', label: 'Nifty Auto', test: inIndex('nifty-auto') },
      { id: 'nifty-pvt-bank', label: 'Nifty Pvt Bank', test: inIndex('nifty-pvt-bank') },
      { id: 'nifty-fin-25-50', label: 'Nifty Fin Services 25/50', test: inIndex('nifty-fin-25-50') },
      { id: 'nifty100-lowvol30', label: 'NIFTY100 LowVol30', test: inIndex('nifty100-lowvol30') },
      { id: 'finnifty', label: 'FINNIFTY', test: inIndex('finnifty') },
      { id: 'nifty-growsect-15', label: 'Nifty GrowSect 15', test: inIndex('nifty-growsect-15') },
    ],
  },
  {
    id: 'cap', select: 'any', options: [
      { id: 'small', label: 'Small cap', description: 'Less than ₹5,000 Cr', test: (x) => x.cap === 'small' },
      { id: 'mid', label: 'Mid cap', description: '₹5,000 Cr to ₹20,000 Cr', test: (x) => x.cap === 'mid' },
      { id: 'large', label: 'Large cap', description: 'More than ₹20,000 Cr', test: (x) => x.cap === 'large' },
    ],
  },
  {
    id: 'sector', select: 'any', options: [
      { id: 'oil-gas', label: 'Oil and gas', test: inSector('oil-gas') },
      { id: 'agriculture', label: 'Agriculture', test: inSector('agriculture') },
      { id: 'pharma', label: 'Pharma', test: inSector('pharma') },
      { id: 'auto', label: 'Auto', test: inSector('auto') },
      { id: 'infra', label: 'Infra', test: inSector('infra') },
      { id: 'building-materials', label: 'Building materials', test: inSector('building-materials') },
      { id: 'engineering', label: 'Engineering', test: inSector('engineering') },
      { id: 'it', label: 'IT', test: inSector('it') },
      { id: 'banking', label: 'Banking', test: inSector('banking') },
      { id: 'finance', label: 'Finance', test: inSector('finance') },
    ],
  },
]

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

/** The tab's list with the filters applied and the sort order. */
export function applyFilters(list: MarketStock[], filters: Filters): MarketStock[] {
  const groups = filterGroups.filter((g) => g.id !== 'sort' && pickedIn(filters, g.id).length)
  const result = list.filter((x) => groups.every((g) => pickedIn(filters, g.id).some((id) => optionOf(g.id, id)?.test?.(x))))
  const by: Record<string, (a: MarketStock, b: MarketStock) => number> = {
    'mcap-asc': (a, b) => a.marketCapCr - b.marketCapCr,
    'mcap-desc': (a, b) => b.marketCapCr - a.marketCapCr,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
  }
  return filters.sort ? [...result].sort(by[filters.sort]) : result
}
```

### `src/flows/market/index.tsx`

```tsx
import { goToTab } from '../../shared/ui/MainNav'
import type { Flow } from '../types'
import { Market } from './screens/Market'

/**
 * Market — the Market tab: lists of stocks (All, Top gainers, Top losers, Under ₹100, Under ₹500), all with the same
 * layout, and Filters (quick filters, indices, market cap, sectors, sort). Built from the live app's screenshots
 * (shared 2026-10-17; no Figma yet), with the filter sheet redesigned in L3.
 */
export const market: Flow = {
  id: 'market',
  title: 'Market',
  description: 'The Market tab — stock lists (all, gainers, losers, under ₹100 / ₹500) and Filters.',
  figmaFile: '',
  sections: [
    { id: 'lists', title: 'Lists' },
    { id: 'filters', title: 'Filters' },
  ],
  screens: [
    { id: 'market-01', section: 'lists', name: 'Market · All', figma: '', note: 'The filter bar shows "Apply filters" until something is applied.', tab: true, render: (go) => <Market onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-02', section: 'lists', name: 'Market · Top gainers', figma: '', note: 'Same layout — only the list changes.', tab: true, render: (go) => <Market tab="gainers" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-03', section: 'lists', name: 'Market · Top losers', figma: '', tab: true, render: (go) => <Market tab="losers" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-04', section: 'lists', name: 'Market · Under ₹100', figma: '', tab: true, render: (go) => <Market tab="under-100" onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-05', section: 'filters', name: 'Filters', figma: '', note: 'Side tabs on the left (grey rail, the open one connected to the pane); only the open group on the right. Opens on Sort by.', tab: true, render: (go) => <Market sheet onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-06', section: 'filters', name: 'Filters · indices', figma: '', note: 'Indices open — Nifty 500 picked (one choice); its side tab shows 1. Each option says how many stocks it gives.', tab: true, render: (go) => <Market sheet sheetSection="index" filters={{ index: 'nifty-500' }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-07', section: 'filters', name: 'Filters · sectors (several)', figma: '', note: 'Sectors open — Banking and IT picked (any number); sort and index picked too. Sectors with no stocks in Nifty 500 are off.', tab: true, render: (go) => <Market sheet sheetSection="sector" filters={{ sort: 'price-desc', index: 'nifty-500', sector: ['banking', 'it'] }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
    { id: 'market-08', section: 'filters', name: 'Market · filters applied', figma: '', note: 'One removable chip per pick; the filter button gets a dot.', tab: true, render: (go) => <Market filters={{ sort: 'price-desc', index: 'nifty-500', sector: ['banking', 'it'] }} onTab={(t) => goToTab(go, t)} onSearch={() => go('search-24')} /> },
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
import { MainNav, type Section as NavSection } from '../../../shared/ui/MainNav'
import { Screen } from '../../../shared/ui/Screen'
import { StockRow } from '../components/StockRow'
import { applyFilters, listFor, pickedIn, picks, tabs, withPicks, type FilterGroupId, type Filters, type MarketTab } from '../data'
import { FilterSheet } from '../sheets/FilterSheet'
import { t } from '../copy'
import styles from './Market.module.css'

type Props = {
  tab?: MarketTab
  filters?: Filters
  /** Open with the Filters sheet up, scrolled to a group (board frames). */
  sheet?: boolean
  sheetSection?: FilterGroupId
  onTab?: (section: NavSection) => void
  /** The Search action in the top bar: opens the Search screen (search-24 — its back returns here). */
  onSearch?: () => void
}

/**
 * market-01 … 08 · Market — an L1 tab. Every list tab (All, Top gainers, Top losers, Under ₹100, Under ₹500) has the
 * same layout; only the stocks change. Above the list: the applied filters as removable chips (or "Apply filters")
 * and the filter button, with a dot when something is applied.
 */
export function Market({ tab: initialTab = 'all', filters: initialFilters = {}, sheet = false, sheetSection, onTab, onSearch }: Props) {
  const [tab, setTab] = useState<MarketTab>(initialTab)
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [open, setOpen] = useState(sheet)
  const base = listFor(tab)
  const list = applyFilters(base, filters)
  const applied = picks(filters)

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
          bottom={<Tabs aria-label={t('tabs.label')} items={tabs.map((id) => ({ value: id, label: t(`tab.${id}`) }))} value={tab} onChange={(v) => setTab(v as MarketTab)} />}
        />
      }
      bottom={<MainNav value="market" onChange={onTab} />}
      sheet={open ? (
        <FilterSheet
          initial={filters}
          section={sheetSection}
          resultCount={(f) => applyFilters(base, f).length}
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
          <Section as="ul" paddingInline="16" gap="16" aria-label={t(`tab.${tab}`)}>
            {list.map((stock) => <li key={stock.symbol}><StockRow stock={stock} /></li>)}
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
import { filterGroups, groupOf, pickedIn, picks, withPicks, type FilterGroupId, type FilterOption, type Filters } from '../data'
import { t } from '../copy'
import styles from './FilterSheet.module.css'

type Props = {
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
export function FilterSheet({ initial, section, resultCount, onApply, onClose }: Props) {
  const headingId = useId()
  const idBase = useId().replace(/:/g, '')
  const [draft, setDraft] = useState<Filters>(initial)
  const [active, setActive] = useState<FilterGroupId>(section ?? filterGroups.find((g) => pickedIn(initial, g.id).length)?.id ?? filterGroups[0].id)
  const group = groupOf(active)
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
const tabScreens: Partial<Record<Section, string>> = { stocks: 'stocks-01', market: 'market-01', fno: 'fno-01' }

/** The navbar's onChange in a flow: `onTab={(t) => goToTab(go, t)}`. */
export const goToTab = (go: (id: string) => void, section: Section) => {
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
