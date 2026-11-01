# ILLIQUID contracts — how the Lemonn app handles them

> For developers and their AI agents. This spans two flows (`fno`, `search`) plus one shared component. Each flow's file
> (`flows/fno.md`, `flows/search.md`) carries the full source; this page is the map: the rule, the data, the UI
> patterns and every place they appear. Last updated 2026-10-29.

## 1. What it is

An **illiquid contract** barely trades: very few buyers and sellers, and the best buy and sell prices sit far apart, so
an order may not fill or may fill far from the shown price (slippage). Lemonn **blocks orders** in illiquid contracts to
protect the user.

- **Commodities only** (MCX: gold, silver, crude oil …). Equity and index contracts (NIFTY, BANKNIFTY, stocks) are never
  marked illiquid.
- A contract can be illiquid on one side of a strike only (the CE, the PE, or both are marked independently).
- The flag comes from the backend per contract — the app never works it out.

## 2. Product rules (from the product team) and where each stands

| # | Rule | Status | Where |
|---|---|---|---|
| 1.1 | In the option chain, an illiquid CE / PE (either or both) carries an illiquid indicator | ✅ | Option chain (§5.1) |
| 1.2 | Tapping an illiquid contract never opens the next screen | ✅ — shows a tooltip (design decision, replaces the toast the brief described) | Option chain (§5.1) |
| 2 | Buy / Sell bottom sheet: ILLIQUID tag, Buy / Sell greyed out; only the asset page (contract name ›) or tapping outside work — from any entry point | ✅ | Buy / Sell sheet (§5.3) |
| 3 | Asset page: ILLIQUID tag, Buy / Sell greyed out — from any entry point | ✅ (+ ScalpPro greyed out too) | Asset page (§5.2) |
| 4 | ScalpPro opened from an illiquid asset page: ILLIQUID tag, Buy / Sell greyed out; switching strikes opens the chain with the indicator | ⏳ Not built — ScalpPro is disabled on the illiquid asset page, so it can't be opened from there yet | — |
| 5 | No illiquid contract in the Home discovery sections (Smart Options / Futures, Popular commodities, Heatmap) | ⏳ Not built — rule for the backend / list filter; sample data has none | F&O home |
| — | Order pad: an illiquid contract should never reach it, but if one slips through (edge case), show the ILLIQUID tag and disable Buy / Sell | ✅ | Order pad (§5.7) |
| 6 | No active Zing signals on illiquid contracts | ⏳ Not built — rule for the backend; no signals list in the prototype | — |

## 3. Data contract

```ts
// Any contract shown in a list, chain, sheet or page gets:
illiquid?: boolean   // true → orders blocked; show the ILLIQUID indicator everywhere it appears
```

Where it lives in the prototype (types = the API contract):

| Type | File | Notes |
|---|---|---|
| `OptionQuote.illiquid` (+ `volume`, `spread`) | `src/flows/fno/option-chain/data.ts` | per side of a strike row (call / put) |
| `AssetPage.illiquid` | `src/flows/fno/commodities/data.ts` | `illiquidAsset` is the sample illiquid page |
| `LotOption.illiquid` | `src/flows/fno/commodities/data.ts` | Gold Summary options list; sample `GOLD 24000 CE` |
| `SearchResult.illiquid` (+ `image`) | `src/flows/search/data.ts` | “Gold” search results; samples `GOLD 135000 PE`, `GOLD 150000 CE` |

## 4. UI patterns (one look everywhere)

| Pattern | Spec | Used in |
|---|---|---|
| **Block icon** | Material Symbols `block` (circle with a slash), 14 in lists / 12 in tags, `content/tertiary` beside a price | option chain price cells |
| **ILLIQUID tag** | L3 `Tag` · `color="error"` · `variant="secondary"` · `size="sm"` · `iconLeft` = block icon (12) · text **ILLIQUID** in capitals (a capital “I” reads like “l”). **Tappable** → explainer sheet | asset page, Buy / Sell sheet, Gold Summary card, Search result, order pad header |
| **Illiquid tooltip** | L3 `Tooltip`, two lines: **ILLIQUID contract** (label 12, inverted) / *Can’t be traded* (description 12, inverted-secondary) + ⓘ (8 from the edge). Arrow starts at the block icon; flips above / below to fit. Opens **on tap only** (never hover / focus); closes on a second tap, tap-away, after **5 s**, or when another contract is tapped. Grows in from its arrow (fade + scale 0.9 + 4 px, `motion-duration-medium`, off with reduced motion). ⓘ → explainer sheet | option chain illiquid cells; disabled ScalpPro on the asset page |
| **Blocked note (toast strip)** | Full-width strip **inside the button dock**, above Buy / Sell: `surface/accent/error/light`, radius 8, text *Trading is not allowed as this contract is ILLIQUID* + ⓘ in `content/accent/error`. The whole strip is one tap target → explainer sheet | asset page, Buy / Sell sheet, order pad |
| **Disabled actions** | L3 `Button disabled` — Buy, Sell, ScalpPro | asset page, Buy / Sell sheet, order pad |
| **Explainer sheet** | “What does illiquidity mean?” — small `BottomSheetHeader` (title + “{contract} is ILLIQUID right now”), a Card with three icon + one-line points (few traders · prices far apart → slippage · Lemonn blocks orders to protect you), **Got it**. Shared component | everywhere above |

Colour rule: everything illiquid uses the **error** tokens (`*-accent-error-*`), never the price-down indicator red.

## 5. Every place in the repo

### 5.1 Option chain — `src/flows/fno/option-chain/` (screens `fno-17` … `fno-20`)
- `screens/OptionChain.tsx`:
  - `cell()` adds the block icon beside an illiquid price (strike side) and renders it as an `IlliquidCell`, which never selects.
  - `IlliquidCell` (same file) is the tap-only tooltip anchored on the icon; it measures the icon, then mounts the Tooltip.
  - The `tip` state + 5 s timer live in `OptionChain`; `tap()` clears the tip when another contract is tapped.
- `screens/OptionChain.module.css` — `.blocked`, `.illiquidCell`, `.tipTarget`, `.tip*`, `chain-tip-in` animation.
- `fno-20` opens with the tooltip up on the 25,700 Put.

### 5.2 Commodity asset page — `src/flows/fno/commodities/screens/AssetPage.tsx` (`fno-21` normal, `fno-22` illiquid)
- ILLIQUID tag next to the name (tap → sheet); Buy / Sell disabled with the blocked note in the dock (tap → sheet);
  ScalpPro disabled with a tap layer that shows the illiquid tooltip (`.scalpWrap`, `.scalpTap`, 5 s timer).

### 5.3 Buy / Sell sheet — `src/flows/fno/commodities/sheets/ContractSheet.tsx` (`fno-23` normal, `fno-24` illiquid)
- ILLIQUID tag beside the expiry (tap → `onIlliquid` → sheet); blocked note + disabled Buy / Sell in the dock; the
  contract name › still opens the (illiquid) asset page.

### 5.4 Gold Summary — `src/flows/fno/commodities/screens/LotSummary.tsx` (`fno-12` …)
- An illiquid option card carries the ILLIQUID tag **up front** (edge case: illiquid contracts shouldn't be listed, but
  the state is built); the tag is its own tap target inside the card (`.tagTap`). The card opens the illiquid Buy / Sell
  sheet.

### 5.5 Search — `src/flows/search/` (`search-28`)
- `components/ResultList.tsx`: ILLIQUID tag as the row's `labelSuffix` (tap → sheet, `.tagTap`); commodity artwork via
  `data-avatar` so it keeps 32 in a small row.
- `screens/Search.tsx` holds the sheet state; `index.tsx` `openResult` — a commodity row opens `fno-21`, an illiquid one
  `fno-22`.

### 5.7 Commodity order pad — `src/flows/fno/order-pad/screens/OrderPad.tsx` (`fno-32` Buy, `fno-33` Sell)
- Edge case only (every entry point already blocks illiquid contracts): `illiquid` prop → ILLIQUID tag in the Actionbar
  beside the exchange (tap → sheet), the blocked note in the dock above the action (tap → sheet), Buy / Sell disabled.
  Inputs (quantity, prices, TPSL) stay usable.

### 5.6 Shared explainer sheet — `src/shared/ui/IlliquidSheet.tsx` (+ `.module.css`)
- One layout for the whole app; each flow passes its own words (`IlliquidSheetCopy`).
  - `src/flows/fno/sheets/IlliquidSheet.tsx` is the F&O wrapper.
  - Search builds the copy inline in `Search.tsx`.

## 6. Copy keys

- **F&O** (`src/flows/fno/copy.json`):
  - `chain.illiquid`, `chain.illiquidSub`, `chain.illiquidMore`, `chain.illiquidLabel` (screen-reader label, lowercase)
  - `asset.illiquid`, `asset.illiquidNote`
  - `illiquid.title`, `illiquid.forContract`, `illiquid.general`, `illiquid.point1…3`, `illiquid.ok`, `illiquid.open`
- **Search** (`src/flows/search/copy.json`): `result.illiquid`, `illiquid.*` (same text).

## 7. Accessibility

- Screen-reader labels say “illiquid” in lowercase: some readers spell out all-caps words.
- Illiquid cells are buttons with `aria-expanded`; the tooltip's ⓘ is a 16 icon with a larger touch area.
- Tags and the blocked note are real buttons / tap targets with “What does illiquidity mean?” as their name.

## 8. Open items

- Rules 4–6 above (ScalpPro illiquid state, discovery filter, Zing signals).
- The asset page always shows the sample contract (not the strike tapped); the real app passes the contract id.
- No real data: the illiquid flag and volume / spread are sample values.
