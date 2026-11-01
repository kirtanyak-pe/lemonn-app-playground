# Flow: F&O (`fno`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Equity F&O home: P&L, indices, chart metrics, watchlists, Smart Options, Futures Heatmap and Smart Futures.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/fno · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/fno.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `fno-01` | Equity home | [11569:41100](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11569-41100) | — | From the main F&O tab. Home returns to Stocks; DASH, Search, Profile and Wallet open their existing flows. Selectors, chart metrics, filters, sorting and watchlist creation work locally. Destinations outside this frame open an explanatory sheet. |
| `fno-02` | Home · watchlists & Smart Options | [11569:41100](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11569-41100) | — | The same long screen, scrolled to watchlists. |
| `fno-03` | Home · Futures Heatmap | [11569:41100](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11569-41100) | — |  |
| `fno-04` | Home · Smart Futures | [11569:41100](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11569-41100) | — |  |
| `fno-05` | Scalper | — | `fno-01`, `dash-20` | From ScalpPro on F&O home or the Scalper bottom-nav tab. The chart-tools sheet groups personal DASH AI indicators separately from Lemon indicators. |
| `fno-06` | Scalper · DASH indicator | — | `fno-01`, `dash-20` | From DASH AI’s View indicator. Opens the chart-tools sheet directly on Indicators, the saved DASH AI indicator under Your indicators with a focus guide. Tap rows to add / remove indicators (several at once); search filters the list. |
| `fno-07` | Scalper · indicator applied | — | `fno-01`, `dash-20` | With the saved DASH AI indicator on the chart: “1 ▾” at the chart’s top-left and illustrative EMA 9 / 21 lines on the NIFTY 50 candles. |
| `fno-08` | Commodities home | [6754:63637](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-63637) | — | The Commodities product tab. Gold / Silver / Crude Oil / Natural Gas shortcuts open the Lot summary (Gold Summary). The chart’s instrument selector (“Gold”) opens the contract picker. Popular commodities: Options ⇕ Futures switch; Futures Heatmap: Bullion / Energy / Metals. |
| `fno-09` | Commodities · heatmap & Smart Futures | [6754:63637](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-63637) | — | The same long screen, scrolled to the Futures Heatmap. |
| `fno-10` | Contract picker · Commodities | [6754:65111](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-65111) | — | From the chart’s “Gold ⇕”. Equity / Commodities tabs in the sheet header’s bottom slot, commodity chips (All, Gold, Silver …) under them; contracts grouped by commodity as radio rows (Gold Mini tagged “Lowest Margin”). Picking one updates the chart and closes the sheet. |
| `fno-11` | Contract picker · Equity | [6754:65054](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-65054) | — | The same sheet on its Equity tab: the 8 index contracts. |
| `fno-12` | Gold Summary · by price | [6754:65113](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-65113) | `fno-08`, `fno-17` | From a commodity shortcut on fno-08. Gold lot tabs (Gold, Gold Mini, Gold Guinea, Gold Ten, Gold Petal) in the Actionbar’s bottom slot; Futures (View all) and Options (View option chain, expiry month, category pills, Filter, sort). The sort opens a sheet: By Price · By Volume · Margin per lot. |
| `fno-13` | Gold Summary · by volume | [6754:65288](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-65288) | `fno-08`, `fno-17` | Sorted by volume: each option shows its traded volume, no change. |
| `fno-14` | Gold Summary · margin per lot | [6754:65444](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-65444) | `fno-08`, `fno-17` | Sorted by margin per lot: each option shows the margin for one lot, no change. |
| `fno-15` | Strategies · Equity | [6754:64178](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-64178) | — | The Strategies product tab with Equity selected in the pill group: shortcuts, Zing Trades, Smart Invest, Pre-build Strategies (Nifty 50 ⇕, Bullish / Bearish / Neutral / Volatile), Quick Trade. Card footer buttons stay Small (32) as in Figma. |
| `fno-16` | Strategies · Commodities | [6754:64607](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-64607) | — | The same tab with Commodities selected: commodity Smart Invest baskets, GOLD as the underlying. |
| `fno-17` | Option chain | [11630:16785](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11630-16785) | `fno-01`, `fno-21` | From Option chain on the F&O chart (any product tab) or the Option Chain bottom-nav tab; Back → F&O home. Opens scrolled to the spot pill. BankNifty ▾ and Expiry ▾ open sheets; Σ shows delta instead of the day change; the basket and Zing tile open the explanatory sheet. Column heads: Call / Put metric (LTP, OI, OI Chg, IV) and the strike range (All, ±5, ±10). Tap a price to Buy, tap it again to Sell, a third time to clear. |
| `fno-18` | Option chain · Buy selected | [11630:16184](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11630-16184) | `fno-01`, `fno-21` | A put price tapped once: B badge, green wash, the order dock with the contract, Balance / Req, quantity in lots and Buy (brand). Buy places a sample order (toast) and clears the selection. |
| `fno-19` | Option chain · Sell selected | [11695:26269](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11695-26269) | `fno-01`, `fno-21` | The same put tapped again: S badge, red wash, Sell (secondary) in the dock; Req becomes the margin per lot. |
| `fno-20` | Option chain · illiquid contract | — | `fno-01`, `fno-21` | Illiquid contracts (deep in-the-money calls, far out-of-the-money puts) carry a block icon beside the price, like Groww. Unlike Groww, a tap never selects them: a tooltip opens just above — “ILLIQUID contract” / “Can’t be traded” ⓘ; tapping away closes it, ⓘ opens a sheet with why it’s blocked, its traded lots and buy–sell gap, and a tip. Opens on the 25,700 put with the tooltip up. |
| `fno-21` | Asset page · Gold MINI | [6754:61613](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-61613) | `fno-17`, `fno-05` | A commodity contract page. Entry (one of several): the contract name in the option chain order dock (“25,400 Put ›”). Back returns where it came from; Option chain → fno-17; Buy / Sell open the sample sheet. Equity contracts get their own (similar) page later. |
| `fno-22` | Asset page · illiquid | [6754:61613](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-61613) | `fno-17`, `fno-05` | Product rule (commodities only): an illiquid contract’s page shows the ILLIQUID tag next to its name and Buy / Sell greyed out, with “Trading is not allowed as this contract is illiquid” above them — whatever screen it was opened from. |
| `fno-23` | Gold Summary · Buy / Sell sheet | — | `fno-08`, `fno-17` | Tapping any futures or option card opens the Buy / Sell sheet (live app, 2026-10-29): name › (asset page fno-21) · price, expiry · change, Buy (brand) / Sell (secondary). |
| `fno-24` | Gold Summary · illiquid sheet | — | `fno-08`, `fno-17` | Product rule (commodities): an illiquid contract carries the ILLIQUID tag on its card (edge case — illiquid contracts shouldn’t be listed, but the state is built) and in the sheet; Buy / Sell are greyed out with “Trading is not allowed as this contract is illiquid”. Only the name › (asset page fno-22) or tapping outside works. |
| `fno-25` | Order pad · Buy · Market | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — | Commodity option chain order pad (other order pads differ a little). From Buy on the commodity asset page or the Gold Summary Buy / Sell sheet. Delivery / Intraday tabs, Market / Limit / SL pills, Quantity (⇕ lots) in steps of one lot, Set TPSL, Avail. · Req, Buy. Placing shows a sample toast; no order is sent. |
| `fno-26` | Order pad · Buy · Limit | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — | Limit adds the validity (Day ⇕ → Day / IOC) and a limit price row with a % stepper from the market price. |
| `fno-27` | Order pad · Buy · SL | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — | SL adds a trigger price row above the limit row. |
| `fno-28` | Order pad · Buy · Intraday | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — | Intraday: “This position will auto close by 11:30 PM” above the dock. |
| `fno-29` | Order pad · Sell · Market | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — | Sell adds Margin · Leverage (grey strip) above the quantity; the action is Sell (red). |
| `fno-30` | Order pad · Sell · SL | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — |  |
| `fno-31` | Order pad · Sell · Intraday | [8671:18433](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433) | — |  |
| `fno-32` | Order pad · Buy · ILLIQUID (edge case) | [8671:18433 + product rule](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433 + product rule) | — | Should never be reached — every entry point blocks illiquid contracts — but if one slips through: ILLIQUID tag in the header (tap → “What does illiquidity mean?”), the blocked note in the dock (tap → same sheet) and Buy disabled. Inputs stay usable. |
| `fno-33` | Order pad · Sell · ILLIQUID (edge case) | [8671:18433 + product rule](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=8671-18433 + product rule) | — | The same edge case on the Sell side: Sell disabled. |

## Spec (README.md)


> **ILLIQUID contracts** span this flow and others — read [`docs/ILLIQUID.md`](https://kirtanyak-pe.github.io/lemonn-app-prototype/ILLIQUID.md) (rule, data flag, UI patterns, every place) before building any of it.

The F&O tab, implemented with Lemonnade V3 components from Figma [F&O Home → Equity](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=11569-41100) and the [F&O Home section](https://www.figma.com/design/nLs24dTJdPz9A5pu3AWMbe/?node-id=6754-63073) (Commodities, asset selection, lot selection, Strategies — drawn in the old D2 system, rebuilt in L3 with the same look).

- **Local prototype:** `http://127.0.0.1:5202/#/fno-01`; board: `#/fno`
- **Status:** implemented · 2026-10-26
- **Entry:** F&O in the main bottom navigation. **Exit:** Home → Stocks.

### Screens

| Id | What it shows | Figma |
|---|---|---|
| fno-01 | Equity home, top | 11569:41100 |
| fno-02 | The same page, at Watchlists / Smart Options | 11569:41100 |
| fno-03 | The same page, at Futures Heatmap | 11569:41100 |
| fno-04 | The same page, at Smart Futures | 11569:41100 |
| fno-05 | Scalper | Screenshot supplied 2026-10-26 |
| fno-06 | Scalper, with DASH indicator sheet open | — |
| fno-07 | Scalper, with the saved indicator applied | — |
| fno-08 | Commodities home | 6754:63637 |
| fno-09 | Commodities home, at Futures Heatmap | 6754:63637 |
| fno-10 | Contract picker sheet, Commodities tab | 6754:65111 |
| fno-11 | Contract picker sheet, Equity tab | 6754:65054 |
| fno-12 | Gold Summary (lot selection), by price | 6754:65113 |
| fno-13 | Gold Summary, by volume | 6754:65288 |
| fno-14 | Gold Summary, margin per lot | 6754:65444 |
| fno-15 | Strategies · Equity | 6754:64178 |
| fno-16 | Strategies · Commodities | 6754:64607 |
| fno-17 | Option chain | 11630:16785 |
| fno-18 | Option chain · Buy selected | 11630:16184 |
| fno-19 | Option chain · Sell selected | 11695:26269 (Sell frame) |
| fno-20 | Option chain · illiquid contract tooltip | — (Groww reference, 2026-10-29) |
| fno-21 | Asset page · Gold MINI (commodity) | 6754:61613 |
| fno-22 | Asset page · illiquid commodity | 6754:61613 + product rule |
| fno-23 | Gold Summary · Buy / Sell sheet | live app screenshot 2026-10-29 |
| fno-24 | Gold Summary · illiquid Buy / Sell sheet | live app + product rule |
| fno-25 … 28 | Order pad · Buy (Market, Limit, SL, Intraday) | 8671:18433 |
| fno-29 … 31 | Order pad · Sell (Market, SL, Intraday) | 8671:18433 |
| fno-32, 33 | Order pad · ILLIQUID edge case (Buy, Sell) | 8671:18433 + product rule |

### Structure

- `screens/Home.tsx`: page composition, scrolling, modal state, local watchlists.
- `components`: F&O sub-navigation, the Stocks-home-matching header, P&L and indices, chart, discovery, contracts, heatmap.
- `sheets/HomeSheets.tsx`: single-choice sheet, create watchlist, contract details and unavailable-destination sheet.
- `data.ts`: typed snapshot contracts, indices, watchlists, chart series and heatmap cells.
- `copy.json` / `copy.ts`: translatable UI copy. Market names and values live in data.
- `commodities/` — the Commodities product tab and its pages: `components/CommoditiesFeed` (the tab's sections in order), `CommodityShortcuts`, `PopularCommodities`, `CommodityHeatmap`; `sheets/ContractPickerSheet` (“Choose options contract”); `screens/LotSummary` (Gold Summary); `data.ts` (commodities, contracts, heatmap groups, picker groups, gold lots — the API contract for this tab); `assets/` (commodity artwork exported from Figma, resized to 2× / 3×).
- `option-chain/` — the Option chain: `screens/OptionChain` (top bar, selectors, stats, column heads, strike rows, spot pill), `components/OrderDock` (the order panel), `data.ts` (underlyings, expiries, chain quotes — the API contract).
- `strategies/` — the Strategies product tab: `components/StrategiesFeed` (pill group, Zing Trades, Smart Invest, Pre-build Strategies, Quick Trade cards); `data.ts`.
- `screens/Home.tsx` renders the shared header, P&L, indices and product tabs once, and the selected tab's feed under them (`product` prop). Equity, Commodities and Strategies reuse the same sections where Figma does (watchlists, chart, contract cards, sheets).
- `assets`: exported Figma artwork for Zing, product tabs, shortcuts and chart actions. Monochrome paths use L3 MaskIcon; detailed shortcut artwork keeps its original SVG with inversion in dark mode.

### Navigation and behaviour

Main F&O → fno-01. Home → stocks-01. Search → search-25 (F&O selected, Back → fno-01). ScalpPro and the Scalper tab → fno-05; Back → fno-01.
Profile → profile-01; Wallet → deposit-01; DASH → dash-02. These shared flows retain their existing return behaviour.
The other F&O navbar items open a sheet explaining that those destinations are outside this prototype; they do not switch the selected Equity tab.

- Total / Day P&L switches the displayed example.
- Index selector uses a sheet of Radio rows. Chart metric tabs update the example series.
- Watchlist shortcut scrolls to the section. Add watchlist validates a nonblank name (40 characters max), adds a local empty list and shows a success toast. Changes last while the home is mounted.
- Contract cards open details. Instrument scope changes Index / Stock. Category pills select example orderings; By Price / By Volume changes the displayed value and sorts volume descending. Calls / Puts filters include an empty result when the sample has no puts.
- View all on Smart Options / Smart Futures opens the existing combined signals list (index / stock scope respectively); these are shared prototype lists, rather than newly designed destinations.
- Heatmap filters show subsets of the example snapshot. Stock / Index changes labels. Tiles open details.
- Sheets use shared Sheet hosting and L3 focus management, Escape and backdrop dismissal.
- **Scalper (fno-05)** is rebuilt from the live app's screenshot (2026-10-26, dark), measured to it at 392 wide:
  - top: back · strategy tabs (L3 ribbon "All", recoloured with the Tabs' own variables so it runs into the tool row)
    · Add more strategies (Zing-edged ring); the tool row (36, surface/primary, dashed line under it): Positions ·
    Orders · Option chain, then the Active chip (Zing tint, count 14 on its icon) running off the right edge — the row
    scrolls sideways;
  - two chart panels on surface/primary, a 16 band with a drag handle between them: instrument (name ⇅ underlined,
    Spot ⇅, link-charts), price · change · ▲ (percent) in the up colour; the spot panel's buttons are chart type
    (US-stock blue tint) and chart tools, the option panel has chart tools only;
  - each chart (`components/TradingPane`): candles, a 50-wide price axis with round steps and the last price tagged in
    the up colour (dashed line to it), the session high / low marked with value · dot · line, zoom in / out against the
    axis, a time axis every 50 minutes (12:15 … 15:25 / 12:25 … 15:35) and "5m ▾" in the corner;
  - order dock: Market / Limit-Trigger (L3 pill group, outlined), Buy at Mkt (brand) · quantity in lots (L3 Stepper
    Large, steps of one lot = 65) · Sell at Mkt (secondary), the margin each needs and the funds under the stepper.
  Values and candles are illustrative (`data.ts`, traced from the screenshot, high / low pinned to its markers); no
  order is submitted.
- **Chart tools sheet** (`sheets/ChartToolsSheet`, from either panel's tools button; fno-06 opens with it up): a 96
  **Side nav** column (L3 `SideNav`, discover tone, Zing flag: Range · Zing NEW · Indicators · Drawings · Templates · Settings) and the
  chosen group beside it. Indicators: **Your indicators** (made with DASH AI, Create indicator, or "No indicators
  created yet.") and **Lemonn indicators**, each a starred 32-tall row. DASH's View indicator opens it with the saved
  indicator listed. Picking one closes the sheet and applies it (fno-07): its name under the spot quote and two
  illustrative moving-average lines (EMA 9 / 21 of the sample candles) on the spot chart.

#### Commodities (fno-08 … 14)

- Product tabs: Equity → fno-01, Commodities → fno-08, Strategies → fno-15. The header and tabs don't move; only the content below slides (forward = from the right, back = from the left).
- **Shortcuts** Gold · Silver · Crude Oil · Natural Gas (artwork, name, day change in up / down colour) → Gold Summary (fno-12).
- **Chart**: same as Equity, the instrument selector reads “Gold ⇕” and opens the contract picker (fno-10). Picking a contract renames the chart and closes the sheet.
- **Contract picker** (`ContractPickerSheet`): header “Choose options contract”, underline tabs Equity (8) / Commodities (7) in its bottom slot; on Commodities, pill chips All / Gold / Silver / Crude Oil / Natural Gas / Copper / Aluminium / Zinc filter the groups. Rows: ListCell Small with artwork, name, price + change, a “Lowest Margin” discover Tag where it applies, Radio. The selected row is highlighted (ListCell `selected`).
- **Watchlist** — same as Equity.
- **Popular commodities**: Options ⇕ Futures switch (secondary pill), divider, pills Top traded / Top gainers / Top Losers / Advanced declined, Filter (sheet) and By Price ⇕ By Volume. Option card: name + type | expiry left, price + change right. Future card: price and change on one line, “Margin / lot : …” under it. Options shows the frame's own rows (three calls and one future).
- **Futures Heatmap**: Bullion / Energy / Metals pills, 3-column tiles in profit / loss surfaces; a tile opens its details.
- **Smart Futures**: the Equity section with commodity contracts.
- **Gold Summary** (`LotSummary`): Actionbar back (→ fno-08) + “Gold Summary”; lot tabs with artwork (Gold, Gold Mini, Gold Guinea, Gold Ten, Gold Petal) in the bottom slot, scrolling sideways. Futures (View all) — two future cards. Options (View option chain → the F&O options list) — expiry month pill (October ⌄ → month sheet), divider, Top traded / Most active / OI gainers / Top gainers, Filter, sort. Sort opens a sheet: **By Price** (price + change), **By Volume** (traded volume only), **Margin per lot** (₹ per lot only) — fno-12 / 13 / 14 open on each. Filter Puts shows the empty state (the sample has calls only).

#### Strategies (fno-15, 16)

- Shortcuts (as Equity), then a full-width **pill group Equity / Commodities** (fno-15 / fno-16).
- **Zing Trades** (Explore): rail of cards — trader avatar, strategy name, “Built with DASH Ai”, today's return; divider; Last week (M T W T F dots: green = profit, grey = no trade, red = loss), Avg. trades, Win rate (trending icon); grey footer: ☆ save · Learn in 30 Secs (play ▶ ›) · Apply (primary).
- **Smart Invest** (View all): rail of cards — logo, basket name, By lemonn, min. deposit; 7 Days P&L ⇕ 30 Days (switcher) with an eye to hide it, AUM, Slots left (🔥 80/100); grey footer: Monthly charges ₹0 ~~₹300~~, Invest now (primary). The card itself isn't tappable (it holds buttons).
- **Pre-build Strategies** (Explore): underlying pill (Nifty 50 / GOLD ⇕ → sheet), divider, Bullish / Bearish / Neutral / Volatile; rail of cards — Probability of profit, strategy name, Funds Req, Max Profit (Unlimited or ₹) / Max Loss, payoff sketch (loss area left, profit area right).
- **Quick Trade**: ⚡ Quick Trade · Beginner friendly; “Which way will GOLD ⌄ move?” (underlying → sheet); Up • Bullish (green outline) and Down • Bearish (red outline).
- Destinations outside this prototype (Explore, Apply, Invest now, Learn, Up / Down) open the explanatory sheet.

#### “What does illiquidity mean?” sheet (shared)

`sheets/IlliquidSheet` — one explainer for every illiquid entry point in F&O: the ⓘ in the option-chain tooltip, and a tap on any ILLIQUID tag (asset page, Buy / Sell sheet, Gold Summary card). Same pattern as DASH's Pine Script sheet: small header (“What does illiquidity mean?” + “{contract} is illiquid right now”, or a general line from a tag), a card with three icon + one-line points (very few people trade it · buy and sell prices are far apart, which increases chances of slippage · Lemonn doesn't allow orders, to protect you), Got it.

#### Commodity options order pad (fno-25 … 31)

`order-pad/screens/OrderPad` (Figma 8671:18433) — **commodity option chain only**; other order pads (equity, futures) differ a little and get their own. Opened from Buy / Sell on the commodity asset page and in the Gold Summary Buy / Sell sheet; Back returns there.
- Actionbar: back · “Gold ⇕ 5 OCT Fut” over price + change (contract switch) · MCX; **Delivery / Intraday** tabs in its bottom slot.
- **Market / Limit / SL** pills; Limit and SL add the validity pill (**Day ⇕** → Day / IOC).
- **Sell** only: Margin · Leverage grey strip.
- **Quantity ⇕** (switches to Lots) · “(100 = 1 Lot)” · compact stepper in steps of one lot (grey −, blue +, as in Figma).
- **Limit**: a limit price row (price + % stepper from the market price); **SL**: a Trigger Price row above it.
- **Set TPSL ⊕** (right). **Intraday**: “This position will auto close by 11:30 PM” above the dock.
- Dock: Avail. ₹ · <u>Req</u> ₹ (Req opens its breakdown), then **Buy** (brand) or **Sell** (L3 sell, red). Placing shows a sample toast; no order is sent.
- Steppers are the L3 Stepper Small as the design system draws it (dark + / − on the grey track), not Figma's grey / blue.
- **ILLIQUID edge case** (`fno-32` Buy, `fno-33` Sell): should never be reached, but if an illiquid contract slips through — ILLIQUID tag in the header, the blocked note in the dock, Buy / Sell disabled (see docs/ILLIQUID.md).
- Data: `order-pad/data.ts` (contract, lot size, margin / leverage, funds, auto-close time, validities).

#### Buy / Sell sheet (fno-23, 24)

`commodities/sheets/ContractSheet` (live app, 2026-10-29): any futures or option card on Gold Summary opens it. Name › (asset page) · price; expiry · type · change; Buy (brand) / Sell (secondary) docked. **Illiquid** (commodities, product rule — same from any entry point): ILLIQUID tag in the sheet, Buy / Sell greyed out with “Trading is not allowed as this contract is illiquid”; only the name › (→ the illiquid asset page) or tapping outside work. The card itself also carries the ILLIQUID tag — an edge case kept in development (illiquid contracts aren't meant to be listed in discovery, but can still reach a list). Sample: GOLD 24000 CE.

#### Commodity asset page (fno-21, 22)

`commodities/screens/AssetPage` (Figma 6754:61613), data `AssetPage` in `commodities/data.ts`:
- Actionbar: back · ☆ (watchlist, toggles). Head: name + contract (“Gold MINI 5 OCT Fut”), price + change, commodity art.
- Chart (the Scalper's trading pane: candles, price axis with last-price tag, high / low, zoom, time axis, 5m) and the tool row Range · 5m Interval · Indicators · Drawings · Settings; Option chain (→ fno-17) and ScalpPro (→ Scalper fno-05) side by side (Figma 6754:62688: two Secondary, 40 tall, light outline). ScalpPro is disabled for an illiquid contract; tapping it shows the illiquid tooltip (as in the option chain: tap only, 5 s, ⓘ → the illiquidity sheet).
- Contract Info (key–value rows with dashed separators: days to expiry, margin, leverage, price unit; the tender-margin notice with ⓘ); {NAME} Futures rail; Performance (24H low / high bar with the last traded price, Prev. Close / Open / circuits / tick size / price unit); Trading details; Market Depth (bids | asks, totals). Buy (brand) / Sell (secondary) docked.
- **Illiquid (commodities only, product rule):** ILLIQUID tag (error, secondary) next to the name, Buy / Sell disabled, and “Trading is not allowed as this contract is illiquid” above them — whatever the entry point.
- Entry so far: the contract name in the option-chain order dock (“25,400 Put ›”). More entry points (Gold Summary cards, search, watchlists) to come. Equity contracts get their own, similar page.

#### Option chain (fno-17 … 19)

How option chains behave (Sensibull, Dhan, Zerodha, the live Lemonn app) and how this one does it:
- **Layout:** strikes ascending down the page in a grey middle column; calls on the left, puts on the right. Each side shows the chosen metric (LTP by default) with the day change under it.
- **Spot:** a black pill (“25300.40 +5.56%”) on a thin band between the two strikes the spot falls between; the chain opens scrolled so the pill is in the middle (at the money). Calls above it / puts below it are in the money.
- **OI bars:** a 2px line on each row's bottom edge — call OI in red running left from the middle, put OI in green running right, scaled to the largest OI in the chain.
- **Strike tags:** OI Support (the strike below spot with the most put OI, green), OI Resistance (above spot with the most call OI, red), Max Pain (blue, the stats row's value).
- **Selecting:** tap a call or put price → selected to **Buy** (green B badge on the strike side, green wash from the outer edge) and the order dock rises. Tap it again → **Sell** (red S badge, red wash, Sell button). A third tap clears it. Tapping another price moves the selection there (as Buy).
- **Order dock:** B / S + “25,400 Put ›” (contract details) · “Set Limit • TP/SL ›”; Balance and Req (buy = premium × quantity, sell = margin per lot); quantity in lots (L3 Stepper, steps of one lot, “1 lot”); Buy (brand lime) or Sell (secondary). Placing shows a success toast and clears the selection — no order is sent.
- **Top:** back (→ F&O home) · ribbon “Option chain” · Add more strategies (+); BankNifty ▾ (underlying sheet) | Expiry: 09 Oct ▾ (expiry sheet), Zing signals tile with count; Σ (Greeks: shows Δ instead of the day change) · basket · PCR • Max Pain • ATM IV; column heads: “Call LTP” / “Put LTP” (metric sheet: LTP, OI, OI Chg, IV), “All” (strike range: all, ±5, ±10 around the spot). Changing underlying or expiry clears the selection.
- **Illiquid contracts** (`quote.illiquid`; here deep in-the-money calls 24,700–24,900 and far out-of-the-money puts 25,700–25,900): a block icon (Material `block`, content/tertiary) beside the price on the strike side, as in Groww. Unlike Groww, a tap never selects them: an L3 Tooltip grows out of the block icon (fade + scale from its arrow), above or below to fit — two lines: “Illiquid contract” (label) over “Can’t be traded” (secondary), then ⓘ — on a tap only (never hover or focus). It closes by itself after 5 s, when another contract is tapped, on tap-away or Esc. ⓘ opens the shared `sheets/IlliquidSheet` (see “What does illiquid mean?” below).
- **Entry:** Option chain on the F&O home chart (all product tabs), the Option Chain bottom-nav tab, and View option chain on Gold Summary.

Differences: lot size 35 (BankNifty) so the stepper starts at 35 / 1 lot (Figma's “10000 · 91 lots” is placeholder); quotes are computed sample values (Figma repeats 292.15 / 25100); the stepper is L3 Stepper Large (Figma draws a bordered box with round ± buttons); Max Pain 25,400 so its tag sits where Figma draws it. L3 gaps: an option-chain row / table (strike column 107, row 54, dock header 44 → local tokens `--app-size-chain-*`), B / S order badges, OI bars.

### L3 components

Scalper: Screen, Button (ghost, tertiary, brand, secondary), Tabs (ribbon, pill group), Stepper, BottomSheet,
ListCell (card, Small), SideNav, Icon, Stack. New here, from L3 tokens only:
- **Side nav** — now L3 `SideNav` 1.0.0 (added to the design system from this sheet; was a flow copy).
- **Trading pane** (`components/TradingPane`) — L3 gap: L3 Chart is a fixed 360 × 200 picture without high / low
  markers, zoom, a timeframe control or a real-size price axis.

Screen and Rail are shared app composition helpers. The F&O header matches Stocks home in its profile, search, DASH and wallet controls; other controls use BottomNavbar / NavIcon, Button, Card, Tabs (including the explicitly requested Ribbon), Select, Chart, PriceChange, Tag, SectionHeader, BottomSheetHeader, Radio, TextField, EmptyState and Aerobar. Layout uses Stack and Inset. CSS uses semantic L3 tokens, including profit/loss heatmap surfaces.

### Differences and prototype limits

Scalper vs the live screenshot: L3 sizes win where they differ — the order buttons are L3 Medium (40, the live app's
are 35) with radius 16; the sheet's top corners are L3's 24; type is Manrope (L3), a little wider than the live app's,
so the tool row reaches the Active chip slightly later. The Zing glyph on Active and the Zing tile is Material
swap_horiz (L3 has no Zing mark icon). Colours map to the nearest L3 tokens (panels surface/primary #161616 vs the
live #1d1d1d).

The source uses old D2 controls alongside L3; their code equivalents are L3 components rather than hand-built lookalikes, including L3 shortcut buttons. The header matches Stocks home, including its search pill, DASH entry and wallet. The profile uses the app's fictional Rohan Mehta instead of AG. The misspelled watchlist name “Specail 25” is corrected to “Special 25”. Chart candles are representative data rendered by L3 Chart; chart metrics and data are illustrative, with no market/API or order execution integration. Repeated Figma quotes, historical expiry text and the red/green JSWSTEEL pattern are preserved, including the source's inconsistent negative percentages in green cells. The product tabs match Figma exactly (approved exception to L3 Ribbon): grey row, green baseline (local token `--app-fno-tabs-baseline`, green 300), Label/12, and the selected tab's success-green outline over a green-50 → white wash. The Zing signals card matches Figma too: flush with the left edge, open on the left, honey outline (border/accent/zing) and a honey-50 → white wash, content left-aligned.

#### Commodities & Strategies vs Figma (6754:63073)

- D2 parts → L3: section titles → SectionHeader (View all / Explore), D2 pills → Tabs pill / Tab action, the asset list cards → ListCell Small inside a bordered group, D2 tabs → Tabs underline (sheet header bottom slot, Actionbar bottom slot), card buttons → Button, D2 tags → Tag, card shells → Card (footer / footerFilled for the grey strips).
- Commodity shortcut buttons match Figma exactly: 52 white circles with a light outline and faint glow, 32 art (L3 Tertiary button overridden; local tokens `--app-size-commodity-shortcut`, `--app-commodity-shortcut-glow`).
- Card footer buttons (Zing Trades, Smart Invest) and Quick Trade stay Small / Medium as in Figma, not the app's Large default — the user asked for the same UI as the frames.
- Price changes show their sign (“+0.10%”, L3 PriceChange); Figma shows “0.10%”.
- Figma's “Gold Gunia” tab → Gold Guinea; “1,65,4500.23” margin → 1,65,450.23; western “₹186,456” → ₹1,86,456; “ViewAll” → View all.
- The Zing trader photo is replaced by initials (fictional trader); the Smart Invest logo by the basket's initials.
- Equity (8) in the picker lists 8 indices (Figma draws 6). Copper, Aluminium and Zinc have no artwork yet, so their chips and rows show the name only.

#### L3 gaps (Commodities & Strategies)

- Commodity artwork (L3/Image/Commodities/… in Figma) isn't in the code package — exported PNGs live in `commodities/assets`; Copper / Aluminium / Zinc missing.
- Outlined Buy / Sell buttons (Quick Trade): L3 Button has filled Buy / Sell only; the flow tints Secondary with the up / down tokens.
- Payoff sketch on strategy cards: no L3 mini payoff chart; drawn as a small SVG on L3 tokens.
- Weekday result dots (Zing Trades): no L3 component; 16 circles on the up / down light surfaces.

### Changelog

- 2026-10-29 — Commodity options order pad (fno-25 … 31) from Figma 8671:18433; asset page and Gold Summary Buy / Sell open it.
- 2026-10-29 — Illiquid explainer simplified (small header, three icon points like the Pine Script sheet) and shared: opens from the chain's ⓘ and from every ILLIQUID tag.
- 2026-10-29 — Buy / Sell sheet from Gold Summary cards (fno-23) with the illiquid state (fno-24: tag on the card and in the sheet, Buy / Sell disabled).
- 2026-10-29 — Commodity asset page (fno-21) with the illiquid state (fno-22); opened from the option-chain order dock's contract name.
- 2026-10-29 — Illiquid contracts in the option chain: block icon, tooltip instead of selecting, ⓘ details sheet (fno-20).
- 2026-10-29 — Option chain (fno-17 … 19) from Figma 11695:26269: chain with spot pill, OI bars and strike tags, Buy → Sell → clear selection, order dock; opened from the chart's Option chain button and the bottom nav.
- 2026-10-29 — Product tab switch: every home tab screen is one page (group `home`), so the header, P&L, indices and tabs stay put and only the content under the tabs slides in from the chosen tab's side (scrolls back to the tabs if they were scrolled away). Product tabs and the Zing card rebuilt exactly as in Figma.
- 2026-10-29 — Commodities tab (shortcuts, Gold chart, Popular commodities, Bullion / Energy / Metals heatmap, Smart Futures), contract picker sheet (Equity / Commodities), Gold Summary lot page (by price / by volume / margin per lot) and the Strategies tab (Equity / Commodities: Zing Trades, Smart Invest, Pre-build Strategies, Quick Trade) from Figma 6754:63073; product tabs now switch between the three.

- 2026-10-27 — Chart-tools sheet states from the live app: nothing on the chart (“Indicators” · search); some on the chart (“Indicators (N)” · bin · fx with the count · search, each one a blue row with ✕, several at once — tapping toggles, the sheet stays open); search (field in the title's place, results wrap, full height). Focus guide from DASH: dimmed sheet, Your indicators lit, one-line tooltip with ✕. Scalper top as the live light screenshot: grey header band, Zing ring on Add, tools spread with Active cut at the edge, one tools button per chart, “N ▾” at the chart's top-left, reset on the option chart; light mode greys (surface/secondary) the header, the band between the charts and the order dock (dark keeps black).
- 2026-10-27 — Chart-tools sheet uses L3 SideNav 1.0.0 (design system moved to 571a418); the flow's own copy is removed.
- 2026-10-27 — Scalper rebuilt from the live app's screenshot: measured layout, trading chart panes (price axis, last-price tag, high / low markers, zoom, time axis, timeframe), the tool row with the Active chip, the order dock, and the chart-tools sheet with a new Side nav.
- 2026-10-26 — Added Equity home and board positions, connected the F&O tab and existing flows, added local selectors, filters, watchlist creation and details sheets.
- 2026-10-26 — Reused the Stocks home header on F&O, including its scrolled surface and all four actions.
- 2026-10-26 — Added Scalper: an L3 workspace from the ScalpPro shortcut, with two intraday charts and order controls.
- 2026-10-26 — Added the Scalper chart-tools bottom sheet and Indicators list from the supplied reference.
- 2026-10-26 — Grouped the chart-tools list into Your indicators and Lemon indicators; linked DASH AI's View indicator
  action to the saved custom indicator in the open sheet.


## Source — this flow

### `src/flows/fno/assets/commodities.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="commodities">
<path id="Vector" d="M7.99977 2.00024C9.24085 2.00024 10.382 2.12556 11.2276 2.33693C11.6464 2.44163 12.022 2.57458 12.3051 2.74191C12.5537 2.88887 12.9028 3.16594 12.9029 3.61133C12.9029 4.02792 12.5971 4.29675 12.3541 4.45022V6.95002C12.66 7.21206 12.9029 7.56141 12.9029 8.00024C12.9028 8.42724 12.6699 8.77266 12.3847 9.02556C12.3749 9.03423 12.3641 9.0419 12.3541 9.05047V10.7901C12.6599 11.0521 12.9029 11.4016 12.9029 11.8403C12.9027 12.2672 12.6698 12.6128 12.3847 12.8657C12.0988 13.119 11.7144 13.3237 11.2838 13.4852C10.4184 13.8097 9.2568 14.0002 7.99977 14.0002C6.74284 14.0002 5.58187 13.8096 4.71652 13.4852C4.28591 13.3237 3.90154 13.119 3.61568 12.8657C3.33049 12.6128 3.0976 12.2672 3.0974 11.8403C3.0974 11.4015 3.34038 11.0522 3.64621 10.7901V9.05047C3.63619 9.0419 3.62547 9.03423 3.61568 9.02556C3.33042 8.77266 3.09749 8.42724 3.0974 8.00024C3.0974 7.56134 3.34031 7.21207 3.64621 6.95002V4.45022C3.40325 4.29675 3.0974 4.02792 3.0974 3.61133C3.09754 3.16594 3.44659 2.88887 3.69523 2.74191C3.97825 2.57468 4.35335 2.4416 4.77196 2.33693C5.61752 2.12554 6.75867 2.00026 7.99977 2.00024ZM11.2838 9.64508C10.4184 9.9696 9.25684 10.1601 7.99977 10.1601C6.74279 10.1601 5.58189 9.96957 4.71652 9.64508C4.70234 9.63976 4.68882 9.63282 4.67474 9.6274V11.0432C4.67457 11.2139 4.58951 11.3736 4.44814 11.4691C4.15334 11.6681 4.12592 11.8057 4.12592 11.8403C4.1261 11.8683 4.14013 11.956 4.29788 12.0959C4.45612 12.2361 4.71424 12.3864 5.07731 12.5225C5.80014 12.7936 6.83353 12.9717 7.99977 12.9717C9.16595 12.9717 10.1994 12.7935 10.9222 12.5225C11.2855 12.3863 11.5442 12.2361 11.7025 12.0959C11.8602 11.956 11.8742 11.8683 11.8744 11.8403C11.8744 11.8057 11.847 11.6681 11.5522 11.4691C11.4107 11.3736 11.3258 11.2139 11.3256 11.0432V9.6274C11.3115 9.63282 11.298 9.63976 11.2838 9.64508ZM11.2276 4.88654C10.382 5.0979 9.24082 5.22323 7.99977 5.22323C6.75867 5.22321 5.61752 5.09793 4.77196 4.88654C4.73909 4.87832 4.70705 4.8678 4.67474 4.85922V7.20314C4.67467 7.37387 4.5896 7.53342 4.44814 7.62901C4.15321 7.8281 4.12592 7.96556 4.12592 8.00024C4.12601 8.02789 4.13955 8.1154 4.29788 8.25577C4.45611 8.39601 4.71413 8.54625 5.07731 8.68245C5.50233 8.84182 6.03495 8.96704 6.63858 9.04484C6.65612 9.06394 6.6724 9.08427 6.69081 9.10269C7.03793 9.44982 7.50887 9.645 7.99977 9.64508C8.49076 9.64507 8.96154 9.44988 9.30873 9.10269C9.32701 9.0844 9.34271 9.0638 9.36015 9.04484C9.96408 8.96704 10.497 8.84186 10.9222 8.68245C11.2856 8.5462 11.5442 8.39606 11.7025 8.25577C11.8607 8.11543 11.8743 8.02789 11.8744 8.00024C11.8744 7.96556 11.8471 7.8281 11.5522 7.62901C11.4106 7.53343 11.3257 7.37394 11.3256 7.20314V4.85922C11.293 4.86786 11.2607 4.87826 11.2276 4.88654ZM7.99977 3.02877C6.8175 3.02879 5.76446 3.14928 5.02186 3.33492C4.66856 3.42324 4.41136 3.52087 4.24806 3.61133C4.41135 3.70183 4.6684 3.80019 5.02186 3.88855C5.76446 4.07418 6.81753 4.19468 7.99977 4.1947C9.1822 4.1947 10.2358 4.07422 10.9785 3.88855C11.3316 3.80027 11.5882 3.70176 11.7515 3.61133C11.5882 3.52095 11.3314 3.42316 10.9785 3.33492C10.2358 3.14925 9.1822 3.02877 7.99977 3.02877Z" fill-rule="evenodd" clip-rule="evenodd" fill="#161616" fill-opacity="0.6" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:0.6;"/>
<path id="Vector_2" d="M8.72732 8.5215C8.53444 8.71439 8.27283 8.82275 8.00006 8.82275C7.72728 8.82275 7.46568 8.71439 7.2728 8.5215C7.07992 8.32862 6.97156 8.06702 6.97156 7.79425C6.97156 7.10858 8.00006 6.08008 8.00006 6.08008C8.00006 6.08008 9.02856 7.10858 9.02856 7.79425C9.02856 8.06702 8.9202 8.32862 8.72732 8.5215Z" fill="#161616" fill-opacity="0.6" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:0.6;"/>
</g>
</svg>
```

### `src/flows/fno/assets/downtrend.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="keyboard_double_arrow_down_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24 7">
<path id="Vector" d="M10.0004 13.477L13.2504 10.2478C13.4032 10.095 13.5942 10.0152 13.8233 10.0082C14.0525 10.0013 14.2504 10.0811 14.4171 10.2478C14.5699 10.4006 14.6462 10.595 14.6462 10.8311C14.6462 11.0673 14.5699 11.2617 14.4171 11.4145L10.5838 15.2478C10.5004 15.3311 10.4101 15.3902 10.3129 15.4249C10.2157 15.4596 10.1115 15.477 10.0004 15.477C9.88931 15.477 9.78514 15.4596 9.68792 15.4249C9.59069 15.3902 9.50042 15.3311 9.41708 15.2478L5.58375 11.4145C5.43097 11.2617 5.35111 11.0707 5.34417 10.8416C5.33722 10.6124 5.41708 10.4145 5.58375 10.2478C5.73653 10.095 5.93097 10.0186 6.16708 10.0186C6.40319 10.0186 6.59764 10.095 6.75042 10.2478L10.0004 13.477ZM10.0004 8.47698L13.2504 5.24781C13.4032 5.09503 13.5942 5.01517 13.8233 5.00823C14.0525 5.00128 14.2504 5.08115 14.4171 5.24781C14.5699 5.40059 14.6462 5.59503 14.6462 5.83115C14.6462 6.06726 14.5699 6.2617 14.4171 6.41448L10.5838 10.2478C10.5004 10.3311 10.4101 10.3902 10.3129 10.4249C10.2157 10.4596 10.1115 10.477 10.0004 10.477C9.88931 10.477 9.78514 10.4596 9.68792 10.4249C9.59069 10.3902 9.50042 10.3311 9.41708 10.2478L5.58375 6.41448C5.43097 6.2617 5.35111 6.07073 5.34417 5.84156C5.33722 5.6124 5.41708 5.41448 5.58375 5.24781C5.73653 5.09503 5.93097 5.01865 6.16708 5.01865C6.40319 5.01865 6.59764 5.09503 6.75042 5.24781L10.0004 8.47698Z" fill="#E5505F" style="fill:#E5505F;fill:color(display-p3 0.8980 0.3137 0.3725);fill-opacity:1;"/>
</g>
</svg>
```

### `src/flows/fno/assets/equity.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="candle icon">
<rect id="Rectangle 240662752" x="9.60156" y="5.60156" width="3.2" height="4" fill="#DEF4EA" style="fill:#DEF4EA;fill:color(display-p3 0.8706 0.9569 0.9176);fill-opacity:1;"/>
<path id="Vector" d="M10.5582 13.7616V10.2989H9.62276C9.40431 10.2989 9.22113 10.2251 9.07322 10.0773C8.92545 9.92938 8.85156 9.7462 8.85156 9.52775V5.70418C8.85156 5.48558 8.92545 5.3024 9.07322 5.15463C9.22113 5.00686 9.40431 4.93298 9.62276 4.93298H10.5582V2.24156C10.5582 2.06023 10.6196 1.90826 10.7423 1.78567C10.8651 1.66293 11.0171 1.60156 11.1984 1.60156C11.3799 1.60156 11.5319 1.66293 11.6543 1.78567C11.7769 1.90826 11.8382 2.06023 11.8382 2.24156V4.93298H12.7735C12.9921 4.93298 13.1753 5.00686 13.323 5.15463C13.4709 5.3024 13.5449 5.48558 13.5449 5.70418V9.52775C13.5449 9.7462 13.4709 9.92938 13.323 10.0773C13.1753 10.2251 12.9921 10.2989 12.7735 10.2989H11.8382V13.7616C11.8382 13.9429 11.7769 14.0949 11.6541 14.2175C11.5314 14.3402 11.3793 14.4016 11.198 14.4016C11.0165 14.4016 10.8646 14.3402 10.7421 14.2175C10.6195 14.0949 10.5582 13.9429 10.5582 13.7616ZM10.1316 9.01895H12.2649V6.21276H10.1316V9.01895Z" fill="#0F9958" style="fill:#0F9958;fill:color(display-p3 0.0588 0.6000 0.3451);fill-opacity:1;"/>
<rect id="Rectangle 240662751" x="3.19922" y="4" width="3.2" height="8" fill="#DEF4EA" style="fill:#DEF4EA;fill:color(display-p3 0.8706 0.9569 0.9176);fill-opacity:1;"/>
<path id="Subtract" d="M4.7998 1.59766C4.98128 1.59766 5.13341 1.65949 5.25586 1.78223C5.37823 1.90471 5.43937 2.05623 5.43945 2.2373V3.30469H6.375C6.59345 3.30469 6.77689 3.37846 6.9248 3.52637C7.07251 3.67412 7.14648 3.85762 7.14648 4.07617V11.916C7.14648 12.1381 7.07242 12.3227 6.9248 12.4697C6.77689 12.6169 6.59345 12.6914 6.375 12.6914H5.43945V13.7578C5.43942 13.9391 5.37856 14.0913 5.25586 14.2139C5.13319 14.3365 4.981 14.3974 4.7998 14.3975C4.61842 14.3975 4.46617 14.3365 4.34375 14.2139C4.22119 14.0913 4.16019 13.9391 4.16016 13.7578V12.6914H3.22461C3.00601 12.6914 2.82257 12.6167 2.6748 12.4688C2.52716 12.3211 2.4532 12.1382 2.45312 11.9199V4.0791C2.45312 3.85706 2.52705 3.67241 2.6748 3.52539C2.82257 3.37819 3.00601 3.30469 3.22461 3.30469H4.16016V2.2373C4.16024 2.05628 4.2213 1.90469 4.34375 1.78223C4.46644 1.65953 4.61856 1.5977 4.7998 1.59766ZM3.73438 4.58594V11.4131H5.86816V4.58594H3.73438Z" fill="#0F9958" style="fill:#0F9958;fill:color(display-p3 0.0588 0.6000 0.3451);fill-opacity:1;"/>
</g>
</svg>
```

### `src/flows/fno/assets/option-chain.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="link (1) 1">
<g id="Union">
<path d="M8.23225 6.05078C9.41705 6.05087 10.5534 6.52186 11.3914 7.35938C11.8205 7.78957 12.1587 8.30273 12.3836 8.86719C12.6085 9.43169 12.7157 10.0371 12.7 10.6445C12.6938 10.8632 12.6012 11.0704 12.4422 11.2207C12.2832 11.3709 12.071 11.4524 11.8524 11.4463C11.6336 11.4401 11.4255 11.3465 11.2752 11.1875C11.1251 11.0285 11.0445 10.8162 11.0506 10.5977L11.0487 10.3857C11.0264 9.89431 10.8758 9.41598 10.6102 8.99902C10.3065 8.52244 9.86656 8.14818 9.34749 7.9248C8.82838 7.70147 8.2539 7.6389 7.69905 7.74609C7.14438 7.8533 6.63463 8.12494 6.23616 8.52539L3.52522 11.2412C3.13154 11.6352 2.8634 12.1373 2.75471 12.6836C2.64611 13.2298 2.7019 13.7959 2.91487 14.3105C3.12784 14.8251 3.48818 15.2654 3.951 15.5752C4.414 15.8849 4.95939 16.0503 5.51643 16.0508C5.88756 16.0522 6.25553 15.9798 6.59846 15.8379C6.94129 15.696 7.25295 15.4878 7.51448 15.2246L8.37483 14.3643L8.38069 14.3574L8.3885 14.3516C8.54735 14.2201 8.74996 14.1528 8.95588 14.1631C9.16183 14.1734 9.35686 14.2605 9.50178 14.4072C9.64669 14.554 9.73131 14.75 9.73909 14.9561C9.74685 15.1622 9.67729 15.3642 9.54378 15.5215L8.67268 16.3926C8.25864 16.8086 7.76579 17.1387 7.22346 17.3633C6.74888 17.5597 6.24423 17.6724 5.73225 17.6963L5.51253 17.7012C4.62938 17.7002 3.76598 17.4375 3.03206 16.9463C2.29817 16.455 1.72598 15.7566 1.3885 14.9404C1.0512 14.1244 0.962966 13.2263 1.13557 12.3604C1.30824 11.4943 1.73462 10.6986 2.35921 10.0742L5.0721 7.35938L5.23323 7.20703C6.05298 6.46514 7.12139 6.05082 8.23225 6.05078ZM8.51546 14.5059C8.5455 14.481 8.57845 14.4591 8.61213 14.4404L8.51546 14.5059ZM9.53889 14.9639L9.5301 14.877C9.52903 14.871 9.52646 14.8653 9.52522 14.8594C9.53238 14.8936 9.53756 14.9285 9.53889 14.9639ZM11.7352 11.2305L11.8573 11.2461C11.7787 11.2438 11.7026 11.2254 11.6317 11.1953C11.6652 11.2095 11.6995 11.2223 11.7352 11.2305ZM11.2498 10.6035L11.2586 10.7266C11.2647 10.7623 11.2748 10.7971 11.2869 10.8311C11.2611 10.7587 11.2476 10.6817 11.2498 10.6035ZM6.43538 8.08887C6.39246 8.1207 6.35163 8.1553 6.31038 8.18945C6.35811 8.14995 6.40622 8.11097 6.45588 8.07422L6.43538 8.08887Z" fill-rule="evenodd" clip-rule="evenodd" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
<path d="M14.4803 2.2998C15.0673 2.2998 15.649 2.41599 16.1912 2.64062C16.7334 2.86527 17.2265 3.19435 17.6414 3.60938C18.0712 4.04026 18.4097 4.5546 18.6346 5.12012C18.8595 5.68562 18.9665 6.29106 18.95 6.89941C18.9172 8.03859 18.449 9.12258 17.6414 9.92676L17.6405 9.92578L14.9276 12.6416C14.5135 13.0579 14.0208 13.3886 13.4783 13.6133C12.9361 13.8379 12.3543 13.9518 11.7674 13.9502L11.7635 13.9512C11.1667 13.9507 10.5759 13.8302 10.0262 13.5977C9.47645 13.3651 8.97833 13.0248 8.56233 12.5967C8.14641 12.1686 7.82006 11.6616 7.60335 11.1055C7.38669 10.5494 7.28396 9.955 7.30061 9.3584C7.30676 9.13966 7.39943 8.9316 7.55842 8.78125C7.71738 8.63104 7.92966 8.55059 8.14827 8.55664C8.36701 8.56279 8.57507 8.65545 8.72542 8.81445C8.87556 8.97347 8.95617 9.18568 8.95003 9.4043C8.9394 9.78056 9.00486 10.1551 9.14143 10.5059C9.27805 10.8567 9.48361 11.1772 9.74592 11.4473C10.0082 11.7171 10.3222 11.9315 10.6688 12.0781C11.0155 12.2248 11.3881 12.3005 11.7645 12.3008C12.1343 12.3017 12.5009 12.2293 12.8426 12.0879C13.1842 11.9464 13.4948 11.7386 13.7557 11.4766L16.4715 8.76074C16.9937 8.23133 17.2853 7.51709 17.283 6.77344C17.2807 6.02912 16.9841 5.31537 16.4578 4.78906C15.9316 4.263 15.2185 3.96624 14.4744 3.96387C13.7302 3.96158 13.0147 4.25438 12.4852 4.77734L11.6268 5.63574L11.6229 5.63867C11.467 5.78672 11.2597 5.86887 11.0448 5.86621C10.8297 5.86341 10.6236 5.77612 10.4715 5.62402C10.3196 5.47199 10.2331 5.26666 10.2303 5.05176C10.2275 4.83667 10.3087 4.62862 10.4569 4.47266L11.3201 3.60938C11.7351 3.19437 12.2282 2.86528 12.7703 2.64062C13.3125 2.41605 13.8935 2.29989 14.4803 2.2998ZM16.494 3.00488C16.5477 3.03363 16.6007 3.06373 16.6532 3.09473C16.5408 3.02826 16.4257 2.96612 16.3074 2.91016L16.494 3.00488Z" fill-rule="evenodd" clip-rule="evenodd" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
</g>
</g>
</svg>
```

### `src/flows/fno/assets/referral.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Gift-2--Streamline-Core" clip-path="url(#clip0_0_8)">
<g id="gift-2--reward-box-social-present-gift-media-rating-bow">
<path id="Vector" d="M17.5384 17.1422V9.8457H2.46484V17.1422C2.46484 17.9312 3.10444 18.5708 3.89342 18.5708H16.1098C16.8988 18.5708 17.5384 17.9312 17.5384 17.1422Z" fill="#E8E8E8" style="fill:#E8E8E8;fill:color(display-p3 0.9098 0.9098 0.9098);fill-opacity:1;"/>
<path id="Vector_2" d="M18.5725 6.84459V8.41716C18.5725 9.20614 17.933 9.84573 17.144 9.84573H2.85826C2.06929 9.84573 1.42969 9.20614 1.42969 8.41716V6.84459C1.42969 6.0556 2.06929 5.41602 2.85826 5.41602H17.144C17.933 5.41602 18.5725 6.0556 18.5725 6.84459Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
<path id="Union" d="M17.5342 9.14355C17.9208 9.14355 18.2344 9.45715 18.2344 9.84375V17.1406C18.2342 18.316 17.2809 19.2686 16.1055 19.2686H10.0283C10.0189 19.2689 10.0095 19.2715 10 19.2715C9.99048 19.2715 9.9811 19.2689 9.97168 19.2686H3.88965C2.71422 19.2686 1.76095 18.3161 1.76074 17.1406V9.84375C1.76074 9.45715 2.07434 9.14355 2.46094 9.14355H17.5342ZM10.7002 17.8691H16.1055C16.5077 17.8691 16.8348 17.5428 16.835 17.1406V10.5439H10.7002V17.8691ZM3.16113 17.1406C3.16134 17.5428 3.4874 17.8691 3.88965 17.8691H9.2998V10.5439H3.16113V17.1406Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
</g>
<path id="Vector_5" d="M9.99868 5.41583C9.99868 4.21941 8.60285 1.42773 6.50909 1.42773C3.10288 1.42773 4.34368 5.41583 5.97399 5.41583" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" stroke="#161616" style="stroke:#161616;stroke:color(display-p3 0.0863 0.0863 0.0863);stroke-opacity:1;"/>
<path id="Vector_6" d="M10 5.41583C10 4.21941 11.3958 1.42773 13.4896 1.42773C16.8959 1.42773 15.655 5.41583 14.0247 5.41583" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" stroke="#161616" style="stroke:#161616;stroke:color(display-p3 0.0863 0.0863 0.0863);stroke-opacity:1;"/>
<path id="Vector_4" d="M18.5725 6.84459V8.41716C18.5725 9.20614 17.933 9.84573 17.144 9.84573H2.85826C2.06929 9.84573 1.42969 9.20614 1.42969 8.41716V6.84459C1.42969 6.0556 2.06929 5.41602 2.85826 5.41602H17.144C17.933 5.41602 18.5725 6.0556 18.5725 6.84459Z" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" stroke="#161616" style="stroke:#161616;stroke:color(display-p3 0.0863 0.0863 0.0863);stroke-opacity:1;"/>
</g>
<defs>
<clipPath id="clip0_0_8">
<rect width="20" height="20" fill="white" style="fill:white;fill-opacity:1;"/>
</clipPath>
</defs>
</svg>
```

### `src/flows/fno/assets/scalppro.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="score_24dp_E3E3E3_FILL0_wght300_GRAD0_opsz24">
<path id="Vector" d="M4.09507 17.5C3.64934 17.5 3.27206 17.3456 2.96324 17.0368C2.65441 16.7279 2.5 16.3507 2.5 15.9049V4.09507C2.5 3.64934 2.65441 3.27206 2.96324 2.96324C3.27206 2.65441 3.64934 2.5 4.09507 2.5H15.9049C16.3507 2.5 16.7279 2.65441 17.0368 2.96324C17.3456 3.27206 17.5 3.64934 17.5 4.09507V15.9049C17.5 16.3507 17.3456 16.7279 17.0368 17.0368C16.7279 17.3456 16.3507 17.5 15.9049 17.5H4.09507ZM10.8824 14.3101L16.1765 9.01596V4.09507C16.1765 4.02713 16.1482 3.96493 16.0915 3.90846C16.0351 3.85184 15.9729 3.82353 15.9049 3.82353H4.09507C4.02713 3.82353 3.96493 3.85184 3.90846 3.90846C3.85184 3.96493 3.82353 4.02713 3.82353 4.09507V14.3101L6.79463 11.3387C6.95419 11.1793 7.14029 11.0996 7.35294 11.0996C7.56559 11.0996 7.75169 11.1793 7.91125 11.3387L10.8824 14.3101ZM7.35294 12.4774L3.82353 16.0068C3.82912 16.0351 3.85596 16.0704 3.90404 16.1129C3.95213 16.1553 4.01581 16.1765 4.09507 16.1765H15.9049C15.9729 16.1765 16.0351 16.1482 16.0915 16.0915C16.1482 16.0351 16.1765 15.9729 16.1765 15.9049V10.7127L11.4407 15.4485C11.2811 15.6081 11.095 15.6879 10.8824 15.6879C10.6697 15.6879 10.4836 15.6081 10.324 15.4485L7.35294 12.4774ZM3.82353 15.9049V16.1765V3.82353V15.9049Z" fill="white" style="fill:white;fill-opacity:1;"/>
<path id="Vector_2" d="M9.03272 8.62368L7.79858 8.56247C7.66228 8.55572 7.56538 8.49097 7.50789 8.36825C7.45033 8.24559 7.46385 8.13082 7.54845 8.02394L10.3947 4.35662C10.4531 4.28357 10.5253 4.2352 10.6115 4.21154C10.6976 4.18794 10.7856 4.19466 10.8756 4.23169C10.9655 4.26865 11.0297 4.32747 11.0682 4.40816C11.1067 4.48884 11.1182 4.57426 11.1028 4.66443L10.6766 7.09345L12.19 7.1685C12.3346 7.17567 12.4333 7.2449 12.4863 7.3762C12.5392 7.50743 12.5159 7.62611 12.4163 7.73225L9.30455 11.0741C9.24237 11.1403 9.16839 11.1814 9.08259 11.1976C8.9968 11.2137 8.91452 11.2014 8.83574 11.1609C8.75696 11.1203 8.69719 11.0613 8.65643 10.9839C8.61568 10.9064 8.60302 10.8226 8.61848 10.7325L9.03272 8.62368Z" fill="white" style="fill:white;fill-opacity:1;"/>
</g>
</svg>
```

### `src/flows/fno/assets/smart-invest.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="mountain_flag_24dp_E3E3E3_FILL0_wght300_GRAD0_opsz24 1">
<path id="Vector 6276" d="M7.71493 13.2857L9.42921 10.2857H14.5721L16.2864 13.7143L14.1435 15L12.0006 14.1428L9.85779 15L7.71493 13.2857Z" fill="#E8E8E8" style="fill:#E8E8E8;fill:color(display-p3 0.9098 0.9098 0.9098);fill-opacity:1;stroke:black;stroke-opacity:1;" stroke-width="0.857143" stroke="black"/>
<path id="Vector 6275" d="M3.85547 20.5714L7.71261 13.7143L9.85547 15L11.9983 14.1428L13.7126 15L16.284 13.2857L19.7126 20.5714H3.85547Z" fill="#E8E8E8" style="fill:#E8E8E8;fill:color(display-p3 0.9098 0.9098 0.9098);fill-opacity:1;stroke:black;stroke-opacity:1;" stroke-width="0.857143" stroke="black"/>
<path id="Vector" d="M8.5936 13.1557L10.0551 14.1384L11.5878 13.3597C11.7083 13.289 11.8439 13.2537 11.9946 13.2537C12.1453 13.2537 12.2808 13.289 12.4013 13.3597L13.9436 14.1384L15.3743 13.1864L14.3648 11.1729C14.3392 11.1217 14.3007 11.0801 14.2493 11.0479C14.198 11.0159 14.1435 10.9999 14.0858 10.9999H9.8416C9.78393 10.9999 9.7311 11.0159 9.6831 11.0479C9.63493 11.0801 9.59801 11.1217 9.57235 11.1729L8.5936 13.1557ZM5.22435 19.9999H18.7493L16.0436 14.5442L14.4821 15.5902C14.3449 15.6838 14.1984 15.7348 14.0426 15.7432C13.8868 15.7515 13.7319 15.7172 13.5781 15.6402L11.9993 14.8462L10.4206 15.6307C10.2668 15.7077 10.1119 15.7394 9.9561 15.7259C9.80026 15.7124 9.65376 15.6588 9.5166 15.5652L7.91485 14.5192L5.22435 19.9999ZM4.25335 21.4999C3.90835 21.4999 3.6481 21.3576 3.4726 21.0729C3.29693 20.7882 3.28601 20.4953 3.43985 20.1942L8.21485 10.5097C8.36868 10.2083 8.59201 9.96474 8.88485 9.7789C9.17785 9.5929 9.49676 9.4999 9.8416 9.4999H11.2493V3.4039C11.2493 3.14607 11.3356 2.93098 11.5081 2.75865C11.6804 2.58615 11.8954 2.4999 12.1531 2.4999H16.8723C17.0365 2.4999 17.1638 2.57107 17.2541 2.7134C17.3444 2.85574 17.3512 3.00382 17.2743 3.15765L16.8108 4.04415C16.7775 4.11465 16.7608 4.18324 16.7608 4.2499C16.7608 4.31657 16.7775 4.38515 16.8108 4.45565L17.2743 5.34215C17.3512 5.49599 17.3444 5.64407 17.2541 5.7864C17.1638 5.92874 17.0365 5.9999 16.8723 5.9999H12.7493V9.4999H14.0666C14.4114 9.4999 14.7262 9.59032 15.0108 9.77115C15.2955 9.95182 15.5198 10.1928 15.6838 10.4942L20.5338 20.1942C20.6877 20.4953 20.6768 20.7882 20.5011 21.0729C20.3256 21.3576 20.0653 21.4999 19.7203 21.4999H4.25335Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
</g>
</svg>
```

### `src/flows/fno/assets/strategies.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="icon">
<path id="vectro" d="M13.3938 2.72266C13.692 2.72267 13.9336 2.9643 13.9336 3.2625C13.9335 3.56068 13.6919 3.80233 13.3938 3.80234H10.2812C10.0788 3.80243 9.90025 3.93516 9.84141 4.12891L8.90234 7.22422L12.1945 7.225C12.4926 7.22512 12.7342 7.46681 12.7344 7.76484C12.7343 8.06294 12.4926 8.30535 12.1945 8.30547L8.59453 8.30469L7.42031 12.1844C7.22345 12.8335 6.62447 13.2773 5.94609 13.2773H2.60625C2.30806 13.2773 2.06648 13.0357 2.06641 12.7375C2.06641 12.4393 2.30802 12.1977 2.60625 12.1977H5.94609C6.14866 12.1976 6.32787 12.0649 6.38672 11.8711L7.46641 8.30391H3.80625C3.50814 8.30379 3.26646 8.06217 3.26641 7.76406C3.26644 7.4659 3.50811 7.2243 3.80625 7.22422H7.77422L8.80781 3.81563C9.00467 3.16653 9.60295 2.72274 10.2812 2.72266H13.3938Z" fill="#161616" fill-opacity="0.6" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:0.6;"/>
</g>
</svg>
```

### `src/flows/fno/assets/trade-calls.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="19.8232" height="19.8213" viewBox="0 0 19.8232 19.8213" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ai-smart-assistant-square--ai-smart-assistant-square-intelligence-helper">
<path id="Subtract" d="M9.11455 3.48215C8.78711 3.94149 8.60115 4.50039 8.60115 5.08929C8.60115 6.14051 9.19581 7.09465 10.1246 7.56139L10.3143 7.64789L12.0847 8.37612C12.1507 8.40339 12.2061 8.45009 12.2451 8.50865L12.2786 8.57004L13.0068 10.3404C13.4337 11.3771 14.3789 11.5773 15.5001 11.5773C16.0892 11.5773 16.1249 11.5773 16.3392 11.5773V17.7679C16.3392 18.5569 15.6997 19.1964 14.9107 19.1964H2.05353C1.26455 19.1964 0.624959 18.5569 0.624959 17.7679V4.91072C0.624959 4.12175 1.26455 3.48215 2.05353 3.48215H9.11455Z" fill="#E8E8E8" style="fill:#E8E8E8;fill:color(display-p3 0.9098 0.9098 0.9098);fill-opacity:1;"/>
<g id="Vector 6273">
<path id="Vector 6269_3" d="M13.7585 2.55993L14.4872 0.790156C14.5284 0.690243 14.6258 0.625035 14.7338 0.625035C14.8418 0.625035 14.9392 0.690243 14.9804 0.790156L15.7091 2.55993C15.9992 3.26446 16.5587 3.82392 17.2632 4.11402L19.033 4.84276C19.133 4.88389 19.1981 4.98126 19.1981 5.08932C19.1981 5.19738 19.133 5.29475 19.033 5.33588L17.2632 6.06462C16.5587 6.35472 15.9992 6.91418 15.7091 7.61871L14.9804 9.38849C14.9392 9.48839 14.8418 9.55361 14.7338 9.55361C14.6258 9.55361 14.5284 9.48839 14.4872 9.38849L13.7585 7.61871C13.4684 6.91418 12.909 6.35472 12.2044 6.06462L10.4346 5.33588C10.3347 5.29475 10.2695 5.19738 10.2695 5.08932C10.2695 4.98126 10.3347 4.88389 10.4346 4.84276L12.2044 4.11402C12.909 3.82392 13.4684 3.26446 13.7585 2.55993Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
</g>
<g id="Vector 6270">
<path id="Union" d="M8.66113 2.85742C9.0061 2.85767 9.28613 3.1374 9.28613 3.48242C9.28597 3.82731 9.006 4.10718 8.66113 4.10742H2.05371C1.60991 4.10742 1.25 4.46733 1.25 4.91113V13.8389L3.38965 11.6699L3.39062 11.6689C3.63629 11.4233 3.94319 11.3009 4.2998 11.3008C4.65658 11.3008 4.9642 11.4232 5.20996 11.6689L6.52344 12.9951L9.00684 10.5361H8.52246C8.32324 10.5361 8.14801 10.4672 8.00879 10.3281C7.86965 10.189 7.79994 10.0136 7.7998 9.81445C7.7998 9.61521 7.8697 9.44002 8.00879 9.30078C8.14806 9.16151 8.32309 9.0918 8.52246 9.0918H10.7451C10.9443 9.09191 11.1196 9.16162 11.2588 9.30078C11.3977 9.43997 11.4668 9.61533 11.4668 9.81445V12.0361C11.4667 12.2351 11.3976 12.4107 11.2588 12.5498C11.1197 12.6888 10.9442 12.7587 10.7451 12.7588C10.5459 12.7588 10.3697 12.6889 10.2305 12.5498C10.0916 12.4107 10.0226 12.2351 10.0225 12.0361V11.5498L7.43164 14.1406C7.18597 14.3861 6.87901 14.5088 6.52246 14.5088C6.16592 14.5088 5.85896 14.3861 5.61328 14.1406L4.2998 12.8271L1.47363 15.6543C1.4076 15.7203 1.33204 15.7683 1.25 15.8018V17.7686C1.25039 18.212 1.61015 18.5713 2.05371 18.5713H14.9111C15.3545 18.571 15.7135 18.2119 15.7139 17.7686V11.9941C15.7139 11.6492 15.9939 11.3694 16.3389 11.3691C16.684 11.3692 16.9638 11.649 16.9639 11.9941V17.7686C16.9635 18.9022 16.0449 19.821 14.9111 19.8213H2.05371C0.919802 19.8213 0.000391633 18.9024 0 17.7686V4.91113C0 3.77697 0.919556 2.85742 2.05371 2.85742H8.66113ZM5.80176 14.0889C5.80384 14.0906 5.80653 14.092 5.80859 14.0938C5.78203 14.0716 5.75561 14.0476 5.73047 14.0225L5.80176 14.0889ZM14.7334 0C15.0494 0 15.3386 0.167004 15.498 0.432617L15.5586 0.551758L16.2871 2.32227C16.5138 2.8725 16.9507 3.30952 17.501 3.53613L19.2705 4.26465C19.605 4.4022 19.8231 4.72791 19.8232 5.08887C19.8232 5.44999 19.6051 5.77645 19.2705 5.91406L17.501 6.64258C16.9507 6.86921 16.5138 7.30617 16.2871 7.85645L15.5586 9.62598C15.421 9.9601 15.0946 10.1787 14.7334 10.1787C14.3724 10.1785 14.0467 9.95997 13.9092 9.62598L13.1807 7.85645C12.954 7.3062 12.517 6.86924 11.9668 6.64258L10.1963 5.91406C9.86231 5.77644 9.64453 5.45008 9.64453 5.08887C9.6447 4.72784 9.86246 4.40223 10.1963 4.26465L11.9668 3.53613C12.517 3.3095 12.954 2.87247 13.1807 2.32227L13.9092 0.551758L13.9697 0.432617C14.1291 0.167157 14.4175 0.000147311 14.7334 0ZM7.99707 10.0068C7.99903 10.0123 8.0018 10.018 8.00391 10.0234C7.99219 9.99298 7.98269 9.96086 7.97656 9.92773L7.99707 10.0068ZM11.2998 9.81445L11.2939 9.72852C11.2933 9.72404 11.2918 9.71926 11.291 9.71484C11.2961 9.74672 11.2998 9.78016 11.2998 9.81445ZM8.01758 9.57227C8.01514 9.57757 8.01302 9.58349 8.01074 9.58887C8.02339 9.5591 8.03849 9.53006 8.05664 9.50293L8.01758 9.57227ZM11.1406 9.41895L11.0781 9.36426C11.0733 9.36063 11.0675 9.35791 11.0625 9.35449C11.0895 9.37328 11.1163 9.39457 11.1406 9.41895ZM10.9521 9.2959C10.9221 9.28435 10.891 9.27459 10.8584 9.26855C10.8571 9.26832 10.8558 9.26781 10.8545 9.26758C10.8885 9.27382 10.921 9.28401 10.9521 9.2959ZM14.3369 2.79785C13.9834 3.65649 13.301 4.33882 12.4424 4.69238L11.4775 5.08887L12.4424 5.48633C13.301 5.83989 13.9834 6.52222 14.3369 7.38086L14.7334 8.34473L15.1309 7.38086C15.4845 6.52225 16.1667 5.83989 17.0254 5.48633L17.9893 5.08887L17.0254 4.69238C16.1667 4.33882 15.4845 3.65646 15.1309 2.79785L14.7334 1.83301L14.3369 2.79785Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
</g>
</g>
</svg>
```

### `src/flows/fno/assets/watchlist.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="19.8223" height="19.8213" viewBox="0 0 19.8223 19.8213" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="task-list-edit--task-list-edit-work">
<path id="Subtract" d="M16.3392 6.93546C15.7591 6.98869 15.213 7.24336 14.7981 7.65912L8.08379 14.3877C7.70114 14.7711 7.45342 15.2685 7.37786 15.805L6.94929 18.8478C6.9329 18.9641 6.92485 19.0805 6.92483 19.1964H2.05353C1.67465 19.1964 1.31129 19.0458 1.04338 18.778C0.775469 18.5101 0.624959 18.1467 0.624959 17.7678V2.05353C0.624959 1.67465 0.775469 1.31129 1.04338 1.04338C1.31129 0.775469 1.67465 0.624959 2.05353 0.624959H11.3392L16.3392 5.62496V6.93546Z" fill-rule="evenodd" clip-rule="evenodd" fill="#E8E8E8" style="fill:#E8E8E8;fill:color(display-p3 0.9098 0.9098 0.9098);fill-opacity:1;"/>
<path id="Vector" d="M19.1972 12.0534L12.4686 18.7819L9.42578 19.1962L9.85435 16.1534L16.5686 9.4248L19.1972 12.0534Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
<g id="Union">
<path d="M11.3389 0C11.5045 1.07367e-05 11.6641 0.0655475 11.7812 0.182617L16.7812 5.18262C16.8984 5.29982 16.9639 5.45926 16.9639 5.625V6.33887C16.9638 6.68401 16.684 6.96385 16.3389 6.96387C15.9939 6.96364 15.7139 6.68389 15.7139 6.33887V5.88379L11.0801 1.25H2.05371C1.84059 1.25 1.63605 1.33465 1.48535 1.48535C1.33465 1.63605 1.25 1.84059 1.25 2.05371V17.7676C1.25001 17.9807 1.33474 18.1853 1.48535 18.3359C1.63611 18.4866 1.84067 18.5713 2.05371 18.5713H6.33887C6.68398 18.5713 6.96379 18.8512 6.96387 19.1963C6.96385 19.5414 6.68401 19.8213 6.33887 19.8213H2.05371C1.50902 19.8213 0.986615 19.6047 0.601562 19.2197C0.216455 18.8346 1.07878e-05 18.3121 0 17.7676V2.05371C0 1.50906 0.216446 0.986681 0.601562 0.601562C0.986681 0.216446 1.50906 0 2.05371 0H11.3389Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
<path d="M16.5684 8.7998C16.7341 8.79973 16.8935 8.86523 17.0107 8.98242L19.6387 11.6113C19.7559 11.7285 19.8223 11.888 19.8223 12.0537C19.8222 12.2194 19.7558 12.378 19.6387 12.4951L12.9102 19.2236C12.8135 19.3202 12.6881 19.3829 12.5527 19.4014L9.50977 19.8154C9.31588 19.8417 9.12047 19.7754 8.98242 19.6367C8.84467 19.4981 8.77949 19.3029 8.80664 19.1094L9.23535 16.0664L9.25781 15.9678C9.28769 15.8718 9.34038 15.7838 9.41211 15.7119L16.126 8.9834C16.2431 8.86598 16.4025 8.79989 16.5684 8.7998Z" fill-rule="evenodd" clip-rule="evenodd" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
<path d="M6.90234 9.38965C7.10293 9.10883 7.49355 9.04367 7.77441 9.24414C8.05529 9.44477 8.12053 9.83533 7.91992 10.1162L5.58984 13.3779C5.48306 13.5274 5.31586 13.6225 5.13281 13.6377C4.94993 13.6528 4.76948 13.5867 4.63965 13.457L3.24121 12.0586C2.99748 11.8146 2.99743 11.4188 3.24121 11.1748C3.48529 10.9307 3.8819 10.9307 4.12598 11.1748L5.00195 12.0508L6.90234 9.38965Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
<path d="M6.90234 3.58594C7.10294 3.30529 7.49361 3.2401 7.77441 3.44043C8.05523 3.64102 8.12039 4.03163 7.91992 4.3125L5.58984 7.57422C5.48306 7.72365 5.31585 7.81883 5.13281 7.83398C4.94993 7.84905 4.76948 7.78299 4.63965 7.65332L3.24121 6.25488C2.99761 6.01084 2.99747 5.61505 3.24121 5.37109C3.48526 5.12718 3.88193 5.12718 4.12598 5.37109L5.00195 6.24707L6.90234 3.58594Z" fill="#161616" style="fill:#161616;fill:color(display-p3 0.0863 0.0863 0.0863);fill-opacity:1;"/>
</g>
</g>
</svg>
```

### `src/flows/fno/assets/zing.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="36.6667" height="20" viewBox="0 0 36.6667 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="D2 &#226;&#134;&#146; Zing logo">
<g id="Vector">
<path d="M4.89843 7.79386L6.65944 9.55487L10.8824 5.33407L6.65944 1.11111L4.89843 2.87212L6.11427 4.08795H0.677636V6.57803H6.11427L4.89843 7.79386Z" fill="url(#paint0_linear_0_304)"/>
<path d="M30.3744 5.56579C31.5771 5.56579 32.473 6.02232 33.0333 6.76859H33.068V5.73669H35.5556V14.4379C35.5556 17.0794 33.6756 18.7217 30.8654 18.7217C28.2932 18.7217 26.6514 17.2826 26.448 15.2685V15.2663H29.0891C29.2254 16.1641 29.8509 16.7572 30.9348 16.7572C32.17 16.7572 33.068 15.961 33.068 14.5225V13.1678H33.0333C32.3908 13.8947 31.3739 14.2002 30.2404 14.2002C27.7525 14.2002 26.2446 12.439 26.2446 9.9511C26.2447 7.46332 27.9709 5.56582 30.3744 5.56579ZM31.0021 7.69904C29.7171 7.69904 28.7843 8.62948 28.7842 9.98365C28.7843 11.3379 29.6303 12.2856 30.9348 12.2856C32.2393 12.2856 33.2042 11.3205 33.2042 9.94893L33.2021 9.9511C33.202 8.63164 32.2869 7.69917 31.0021 7.69904Z" fill-rule="evenodd" clip-rule="evenodd" fill="url(#paint1_linear_0_304)"/>
<path d="M23.9442 15.5647C24.5757 15.5648 24.9955 16.0084 24.987 16.7588H23.4722C23.5177 17.053 23.6929 17.215 23.9654 17.2151C24.1644 17.2151 24.3163 17.1223 24.4374 16.9297L24.885 17.207C24.6925 17.4924 24.4134 17.6719 23.9399 17.6719V17.6697C23.2844 17.6697 22.8733 17.2695 22.8733 16.6313C22.8734 15.9933 23.3126 15.5647 23.9442 15.5647ZM23.9507 15.9846C23.7064 15.9846 23.5481 16.1099 23.4853 16.3541H24.3745C24.3462 16.123 24.1755 15.9847 23.9507 15.9846Z" fill-rule="evenodd" clip-rule="evenodd" fill="url(#paint2_linear_0_304)"/>
<path d="M21.8631 17.6269H21.2636V17.3914H21.2549C21.097 17.5752 20.8568 17.6681 20.5952 17.6681C19.9916 17.6681 19.6088 17.2484 19.6088 16.6123L19.611 16.6145C19.6111 16.0154 20.0306 15.5631 20.5756 15.5631C20.8567 15.5631 21.097 15.6691 21.2549 15.8593H21.2636V14.2458H21.8631V17.6269ZM20.753 16.0649C20.4395 16.065 20.2188 16.3053 20.2187 16.6145C20.2187 16.9455 20.4264 17.1684 20.7444 17.1684C21.0775 17.1684 21.2896 16.952 21.2896 16.6102H21.2918C21.2917 16.2923 21.0667 16.0649 20.753 16.0649Z" fill-rule="evenodd" clip-rule="evenodd" fill="url(#paint3_linear_0_304)"/>
<path d="M17.3465 15.5625C17.619 15.5626 17.8807 15.6771 18.0149 15.8588H18.0192V15.6011H18.6231V17.6263H18.0192V17.3903H18.0149C17.8634 17.5699 17.619 17.667 17.3421 17.667C16.8006 17.667 16.4227 17.2946 16.3775 16.7312L16.3726 16.6178C16.3729 16.0144 16.7928 15.5625 17.3465 15.5625ZM17.5174 16.0644C17.2059 16.0644 16.9831 16.2896 16.983 16.614C16.9831 16.9383 17.1907 17.1674 17.5 17.1674C17.8331 17.1674 18.0538 16.9362 18.0539 16.6053H18.0561C18.056 16.2744 17.8288 16.0644 17.5174 16.0644Z" fill-rule="evenodd" clip-rule="evenodd" fill="url(#paint4_linear_0_304)"/>
<path d="M15.4921 15.5647C15.5461 15.5647 15.5812 15.5691 15.6136 15.5777V16.2049L15.6006 16.2092C15.5271 16.1595 15.4489 16.136 15.3603 16.136C15.1116 16.1361 14.9128 16.3112 14.9127 16.5597V17.6307H14.3132V15.6059L14.3153 15.6038H14.9018V15.9304H14.9148C15.0489 15.7142 15.3104 15.5649 15.4921 15.5647Z" fill="url(#paint5_linear_0_304)"/>
<path d="M12.9915 15.6054H13.3919V16.0986H12.9915V17.6301H12.3926V16.0986H12.1392V15.6054H12.3926V15.0146H12.9915V15.6054Z" fill="url(#paint6_linear_0_304)"/>
<path d="M5.75522 10.4616L4.5394 11.6774H10.7568V14.1699H0.677636V12.0171L3.99415 8.7011L5.75522 10.4616Z" fill="url(#paint7_linear_0_304)"/>
<path d="M14.6468 14.1682H12.1588V5.73724H14.6468V14.1682Z" fill="url(#paint8_linear_0_304)"/>
<path d="M21.8425 5.56796C23.7223 5.56801 24.9229 6.70225 24.923 8.51501V14.1525H22.4349V9.27619C22.4348 8.17523 21.8594 7.59976 20.8773 7.59976C19.8953 7.59984 19.201 8.29451 19.2009 9.37819V14.1525H16.7128V5.73724H19.2009V6.78595H19.2356C19.8781 5.99005 20.7934 5.56796 21.8425 5.56796Z" fill="url(#paint9_linear_0_304)"/>
<path d="M13.4033 1.3503C14.1953 1.35042 14.8372 1.99221 14.8373 2.78422C14.8373 3.57631 14.1954 4.21856 13.4033 4.21868C12.6112 4.21868 11.9689 3.57638 11.9689 2.78422C11.969 1.99214 12.6112 1.3503 13.4033 1.3503Z" fill="url(#paint10_linear_0_304)"/>
</g>
</g>
<defs>
<linearGradient id="paint0_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint1_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint2_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint3_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint4_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint5_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint6_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint7_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint8_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint9_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint10_linear_0_304" x1="5.9078" y1="6.2375" x2="6.73041" y2="11.9135" gradientUnits="userSpaceOnUse">
<stop stop-color="#F6BC2F" style="stop-color:#F6BC2F;stop-color:color(display-p3 0.9647 0.7373 0.1843);stop-opacity:1;"/>
<stop offset="1" stop-color="#D79900" style="stop-color:#D79900;stop-color:color(display-p3 0.8431 0.6000 0.0000);stop-opacity:1;"/>
</linearGradient>
</defs>
</svg>
```

### `src/flows/fno/commodities/assets/crude-oil.png`

```tsx
�PNG

   IHDR   �   �   �>a�  ciCCPkCGColorSpaceDisplayP3  (�}��K�PƿV��u2�C��
�8�DqU�ꔾ����G�"7�����
�n�::8�������y/��"z��~|��8 9npn��;�[\�+��-%��� �񜮯J��?��>��N�Y�������1����]H�����%����qK���r��g�X �&VXͨ�������`�r���l��9�X�<p�0Є�?�����]r7�R��|�ɑ"'���p�0�XC�R�w��w�O���'`�#�����p6G'k���<02\�����G��V��S`���P϶W�j���<0�(��$�:�-!>���S�p�|�b��[   cICP n��   8eXIfMM *    �i            �       ��       �    kF&M  YiTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:xmp="http://ns.adobe.com/xap/1.0/">
         <xmp:CreatorTool>Figma</xmp:CreatorTool>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
�\�  #IDATx�{�U�y����)7E>����Ԃ�btƙ�j�N�δ��?�d2�m��M�h����N�2�v��mJ��6MM���V��zC��E.��o�����9|h�9�нf���˻�^�}�����^�|YV���*T�,PY��@e���*T�,PY��@e���*T�,PY��@e���*T�,PY�l�@�,�@��Y�*P�;`���C��W�x@�
t:�2�����o�~�&*S�����G!�۷�1�~��Nb���z������9rd�u��V��[rt,n���sw���w{��������G�f8��9眓�)D�T�$�(�="�V�a�گ>|��={��ܸq�f�b��Y:� <��M[�n}�����b6z���������7r�D!FB�FWD8�e�M� b=#B�h���k���b?gC�c	p�=�\y饗.]�l�P������ٱc�z"y�uD��'��	�J� ��"�~�UX�{�lق�x7)�:� �}�;��'7�x�Z�m۶%`-���FRDO���2P��A�������� ���{�}����Z�����<�X�z��ǎ����ۇ_y���kvfr�	�f$�; <�QR��L{	��	x�D� ������;v�ӫ����Tv'��ӧ��z�P'M����.��W����l���fb6y����u���g�)yʊ����ߟ�{���x�L���y�l߾}	|�Z�1@-��C�5j��#G~Nd��y�7Fu���;��ę�%��iӾt�%�L>|xv�Wd�#Ȗ,Y�]xᅙ�� �n�> t3B�	.����k��D�L3;��O3@$�!�3$�	�%�ڃ\�=ɬ�.��7F�1U�m��x��ا�u$fΜ9\;�Gƌsk����^x!{��׳�'f��iV�7v��&�/����A�]��ӧg�ND�H<D� �q]�6�\C�G}ذaƏ?U��uy��u�;w����Mv$�/˸���2#k<   �0aB�<��3�"@<�E�IC$A��a����MX���ͩ?�9PO�O�!���@��2����L���5�i�~���V�P��t$��ꪇ4ۧk�՘���Ǖ�,l޼9-���ݝ@c��F�D0	 Ǹq�2+��x@�;O�� 0��y�@ �@�1�45�UVW]"�U��5拴���]O&K:� S�N.���f�0fl��X 	�z�x@�z����_NB�9c3g�LH³����+�d+W��6lؐ��T��Z��˵�+�O<�<��|]��kߨ�+"�.���J�G ��g�l0<���C �kg�� o� 厁vx@Tf.��x\=�:��|��7S9@(�Х���|	��
y]�6�D�4�&��7�p�d���5kִ��R�@���d�뙭�-lmxV{f�,x{�q��yڰ�8�;�|��3���3�O�1L:���cy�4,*���di�x&k�x�dm�~e���j�Q�Z:D��Q���X �؄|�% I�Pt �%��>Fܻ%'����]����� )�k@�?�a`�b�G4�;�D�a� h|���3g��[n�e�E�Z�����7��f͚5[ �P��]  ����	l|�H�᪙���e��pʔ)iɬծ=���ˌPH�k�e�1�I<�D�H�A�A��%I�ܲ~O���������( ࿠s�3#��v�2������cF3�!d`�� !��� �@D���e���������6���;��?�|�I��$t��rۏj��d�����" ��� ��<i"`p���C,�  �EO���d��|O}F���׍cq9��]u=}�G�����eGC�_�8A��_�`�1����[���*?��e�)�
��&�@9�GЩ��� �&$�XH�2�Q/{2��uq�x�|tc����k"���s}�fR���7p�p��u���L��!��?'�����I��I|�cG��rID��`C^4�~�[:� �e��hQ!�u�1h�@�I����Y�D���Ҳ�C��c�}QF��n��2X��y�� �B�K��LN�هD�9ܲ����~�;�	�;@��=z&yB�_��l�q9�#ݺ�W�-��C�ZJO�Gy�Þ�:]<���΁4�FL��� @6Дx�#��G� �!��h G���7!���c1�J��L�&���������f����Ó�?�LX$�'�w��ɣ�<��G4Ȕɻ�io�L���� ��9�i)�.��آt�6�
�c����e�ie8u����gx-m��b �X\1`:D`�\��r�3���H @7��51У/���HB�����i�5�j�/u�Vɓ�l�?�utO�����>�Y��~i�2(ր $� ���M$e.70�:��[����<"���͛���'�� ��|饗��z�@V� b���t#�݇	ἥ�D�4:˙�:06��}�y���Z)KO ��M�>`�N��q�~*���v����6(�ˑ>HG�]giP��4���c���tԉit����3/��V�KO ��ۺ��yyR{����n�MD x	P��.� ����}E���q�F$h~,W�:^M������A�-�Sj��o?������5�!/^�8݋C {o�|ۅ� ����I��@�s�e3�O�[|Tk"�>=_x�t�>κR@��2�U ��}0�p��tt�ð��H�r��c������y�[�z_�t 1��u)���U�V��V�R@�q��@Iv����BHz]���{.���0�D )�-�lH`"AE���M1M��B#��6�<��o)�{G�]�#֗� ��s�j��S4�P��4O?�t�bŊ�Tc����s�K���'�F�	�;]��͛�1��$	����GE�V�K�:xƌ���z
80�q����|��p��ܞ�x��c��L�$�|ˢ�&�<��i�^F���|ڃ]L��e��s(�ո�z8�����5{Gg�j�d�]3� �!��9�����s��!ҁ�����# D ��7薀�(�o�����k����iC�>��ۗD��Q����i��{�����f�f-@�6	0(��] �x[ǻ{�@���@��$�L!KHC ��7!m�-M����f��u=c��
�p�]�.YJtww���}=��:��� �hcy�1�P}BY@�uxy0��4ހ��@*H�%"�>d�\����������\_�ky��������)�)����$G� �� �i\��÷}9��R�.z�K@�Y���7`C{{�S�����e�9��+Yۨcf_Q�a��.YJh��M�)� \&�|f*�  Lt��=�M@dI�@��^{-��v\�)XNh�g�;�G�`��|m��eH�#�q),�x�hw(#���M��Y
���-==S�3� ��L�9���1۬#XD�����k <d�- � ������]��5�����Ĵ����Y�'�[�5m���~�v�/i]���-`�``�w���	.s�:�t@�2��]�� <Dpf>K�=  �C{��=�91̞�}pm��@�����2�o>U^��jk(݉ ͺ�a8`ؐ��R�4�& ��
��Ǽ�('M[f0�>�ź��jX P�e� 0�Y&�l�,�]/C��Vy��"��H�� �+d�Obl�A�`	X$�`L� ���e�39�#җw�xf5" ��C�\��/��bD�@��#�O	5�؏����_��%���k7�"�����f��M �O��<``d�L���G�=��?�c�'�'����'P��w�}8:oi=���>��m����~������TЌ�V�����amH�#PF$D��9ݨ�2���\��@�gY�5�=6�	ɵ����2�_���v�"�f�l��]6(Ĉ��:��q]��h�So\��(sI;\	����]����������4ue	e" ���)��s�q)'x�K������L�[�κ&����G'_�2������В�{�q�|ip�]w�կ� c"#��r�P^1m�]^�s����}��(wp��EI=Q��p�R�ow�Ĵj�(�Ν{�~�e� �c�-��5H��ַ��P�t����>���Td1�.��Dn˩�8�F�{���{�\�h>X�$�'3Pi��"x��.w�8�r�w�Q���k;��Xc��ԉ ���Z�}?_�Ld�=�v��8���/n�z~������yC�$Ak�v_֍�Fe�Q,��d<1�:�iO���K?9��ue�m' ��Κ�QK?����4�z׹̒��h���wy3i}$с�6
9�;���?.��c,,S����٭z�������6��51�Dg����cۨ�}M�V�ct�%���V��Y��M�� �-�'���g�<����N��@4Y
#�Ŵ��-֑w<h��6��h�?��)-�������N �/x?�;{�İ^�D�3�u�Ժ��u�9m�f��X#��|^��?��_�ݿ?W�	p�}�q�w:y?ϋd�=2�)��<�" �ܠAw����؏�]���$�e���j�/�pK[O�6���N �����X��oȤ��%ͫZ~��7u���1Xř�rK�8�Sc�,�m�(㌏�y��Z�N����%J�� zp�bf=�c�Qg<����"�H0�����D�t��9���dҽtD���k�w�z���N dV>[2~���K�.�6��d��J��9��&�@A�(3p1]�mc��Y��T�E28�r,�1������o]�0:�����}] ���LǱ8��q-�s�6�!R���f��r��k��H�z�A����`�$����ߗG[w&���i+��܇d�>���s �g�p,I������A
<Dh|L�]����z{�p��NG )�G��^kYެ��?�n+��y��w<� �4g� ��	8��Q-�Aܤ"�"� hb�r�"��|����6	�v�{���_����<]l_�|[	�[����~��p@f�s���Ưur\�C"�dA@�ip���L�׋`;urp�@c��lm��eM�� �g�- �!��[�4�1�I��H��sK@�f/� "�Y$� 	$����gY��;���
�[���L�G��)�>i��B��?U�S7����i�����|G���ɨ����� xȀpt�<I���x��>� [z�G>FHa@�!�iʬO�ƱI�����B�����j�n�a)���,gsș~<wx�<4b�觉<C���%� ���X�t]�� ��u]�oc}��m!������#�O��������l\Kt �� $0!�+� 	� �<;���(A�׈d�g��a\���e��k����̷�Jq��co&O~�f?�r��ϵ���#�p�\c�^�F.^��Xbt�d��2� p�ľ�>��,����6|}���	�[J�Av��c@:㐬+�	��6�_-�����@/~�k�� ���V	���00�G��G ��X� ��/�w{�	��`oi���K���k ��E )s̯�n�t��4�OJ����� ��3�j��?�{~�)�tpJ9�& `��,�H=uDH�m$u����:�hÃ&$^��
t�S��@0_�6�H�}N�]�b�+t�|��@F�E;�>2�n�0,FƠH���O�#��:n�x �׼���x�ܤ �>����!|=��uȼ������e�uRh)d�n�z��]c<B�1]�#orDR��,u�g��xH � I9:D{_/���2>_��0j�DK�wh�i�����(�;l����L �d�YI�c�s���=�ɳ�'�E�(w?��m�%U\g��]����G�CK	�Y�����8�5�-���@�h.'O= 8��� Y�6��"��\ǵ�C�C1�>��~^�>f�����4��� zX�f�m�jܛ�x6ٰ���w>�f@b��܏����2@�ֱ���6�QW������u�&[J ���i~��XF������ #�t�7�:� @� J�E��O���X�i�?	ԋ�Z>+��G�	6h<����ؤ�X�y�9o�8���5�1!����٧��E��x���Ȗ@�<���Mr���Q����W �N���(��1�a�����)�!^3��B���U��t�	���f�f�^qK _c=fg�S<�sh`�S�����g�)�(��o�e�-]f�.!�Nz�q��<�OSE��i��H�D����v��x4�3|��'����=�~N��D�7�Q����uq�5j���`G���P�6`�|볺�*#��ӻ~Z�"?��l�AҠ�t>�kt�lTN����w>���}@.�:��*>��1I����� �J�O_�K���&_8?��6�o� �<dK 1(��֋�:�f�d��znG_@��5��F�Y?�P�v`$���(�׌!"L�]BD�9KK�@��-c�t�'m}���ty��K4�Q�ӥ  ��nz���'���E�d�q��x���|&Y� Gi�h4"���U�P(ݏ>��[�4�@�Re��w�Z�0'�����v ��@�h��ҠSn�-i�Y%�1�>��O_O� �F�NL�� ��io�r�ڵ��Z�b�����8�IPi�3H��`Б&�_$ˏơd1_�����3��t�J �����B_����
-#�X�1��8����	H#	���	��E:&�������g?8&�GE�7�~'��N �������Ϭ���E�(.����)ph#�0�pb��P��r�E��g~� ��O5�G�.�W��gj�>1]Ք�L��G�e�mZ"�h��	�9t�B�6j#Y�]E�J�\@�˃.Jf;�<ms]~��^]�_Kn�3^� ~:y��$ܨ'�w�����/(��: ��<aj&��7�v�QZ��)}Tu_���wr�� @�Q�k�FK��� ΐ��8R.0`>D�K��E�@�ɯ�_W�R��O��f�F��y���,^"\�8I��%c��+2�V �Q�'���(}@�;7)�\�Y�}�b��7v~6��v��!Z&�	�A"�9�c��;vP�n����'����z��*T�,PY��@e���*T�,PY��@e���*T�,PY��@e���*T�,PY��@e���*T�,PY��@9,���sS��    IEND�B`�
```

### `src/flows/fno/commodities/assets/gold-default.png`

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

### `src/flows/fno/commodities/assets/gold-guinea.png`

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
�\�  >IDATx�	�\Wy�WKWW��"��ݲe[�7���a38$l�mrrI<	�����fH9$3���xÖ%˖���ޒZ������k�7���.�s&��Ar�k�~�޻��[�w�{2{5���������{E��7:p�^������ϩx���/"z����o����4g2�V��͡P���2Z]V�W�?_�t8�O���r9?���T>���s�x<9��&'#e���luϹ���/|��ةS��E��ϝ ��ws�=�qy*Z��԰��2wU�[��+��\}$���ɰ��n�)�|�|��|��9~�|��%���[м`0�k�9�~:������N�M�I?7�><��p�Gv���	�s!�������m�K����n��xׄ�?3VQ����,��\*	�A@���|�3�Y>��<��ȣ�t�S�<��X0�@8l\j�PU�E'���S�Һ�FF����:O��#Gf~���`��߿����U����:��Ħ�B�����2s 	7=�������u>n~�@=�AВ _��.7����(�2pEj-R���@�T�˟L�r���~��?y�̧����(�,8����4T�W[�S���z=���" 'uug��f���_��� 7v�AQ�v��� @s"�~s���𬐏s� "���;G��
�,PZc^y���V=9��o<��C{?�5#�+�^Q<��G�^���#eၷF��~��A�[�=+� ��:G�ΰy��],��@�g�v�����,6��d�8��%�g%h�hY��˲VX0\	���Fd��M��48���W��o5��4�<��*j�u��Py���9��'o;�O�\�LzEp����i[�����ԯ���.�L�t#��4���8=�^_��L�XD�$mt�lv��y���@[-�%�[g��Ĭ�ܬ�Ҭ����K�VU��-op��3����tb�湷 	R��\<t����*�K*�� �-����<v� �e%�C_�;r�׽��r��BٮM��Y�2	�� ���h
�ÃAA�0���̓j"��驠M��l~��yi���r �PMaAH �8p��CjF�-�p�>����U[���"�M�D-9;h��~�$�Q[�6��TP��Sݒ���Z+m\�}�ة����=��zt��k�rT����V6���DI��݁��K�	�U`4��B�3ٜ��'P'�6=���a����T���k9W��Up�C �P"�/�pr4 �t��.<�I��&u�k�`%HJ8Ze���6S&`s���9'M�V@� gڢڰW�Ԑ���}?��|v٭�W�ˑ.F�|��h�O�n��.X��c����x?P�.Λ������Ȩ%�΍�±u��Z�y�g!N�
�!T�0����+aǱ��`9p���Y4������j	��$�@d�y�VʄQs�6?9`���������@��Ԫ��8�E[~o�M{wq��N���Jc�뾊����Ϭ�C~ PE�# SB�9�� ηD2��1�Ɂq���[�R��ڀ�ʐX4�F�\�d#�)/HF6������T,���$�Ҽ����@D�"�Ԓ��Ը$"q8�!���~��"�,���?��)dU���*��y9�W�U4T|r~��t�'&��#�y�����/�O4���5�� �V
'7X�Y���E���A��Ycּ#W[��W��r7��	$�p��C/�Yo�d%5Wx��T�Xi��?m��n��(H��An&�b� ��T�b��ui(E��T~���Z:~�rsݎ�e�EX�)w�]Z3߼���N?���;?�G����OL�D������UĘJi�s��u�J�F8?_g�=)�?1jMuy[�1dM��-mb`J�`u(� {��0�峒�qr�%V��M�\��ϑ}Q�b�����}�z9uоS?@�p�T�Ȫg"�;2ݧI����Tet���2�E�zL�4Q���TeD��%�D�Қ?h~r诼O��/?!�/?M���7G#�_Ύ=����ډfAyh���6�h���O�T���^�ۆ��o+J{�d���g`�\n
��� fRsv�=�M�e=�Z}��<���w��W���[XES�M���h�UW����^*�l@U5п^��/ԏh\E)r��1�eQ���T"h���p�����u�������L6l�̍޵5�����/I�f/��D������|&3��9hQ߂�I����X,f��j{nwa�Y�tm�6nm����� �y�aV\��D���"�,Z��Yi5`�,=?f�	���ɰm[8q��$�y����@$G²��p�6߸ު��l($B��:K��Ȍ�Z%���bX�$Dpj)8j���լڈ��g��h�� �T�T��M��k"�g��l�^�s|��C����\���7E+�+77��U�y�+�|)H'�A�c'��\K6ډCH�ږ�"�i{��C��:��8��&�HZ�ɖZE�N+oق* ��G/��a����іm{����}�~b��pmK/@�)dSbVV�d�l�����<� mi+��m�����I�S��C���&�^s�h4n3]��Bv��v�Gy���Y�@��Ǻg�EKK>��PK�%���Q�%�������Ͼ=3q��9 5_܋hS�B�P��?�g��q�>�ک �<�.�8N*��p�+���i�K6㕀�T�~b���Ԩys,��`��{-�-m�'NY��.�m����OY6>l�٤��r=y���a�H����#�n���"�8N7�����*��4��!�Mb�շ]Ž硺<<�|/��9r(��uE�=��B�K&@����a�?f�OT�٬���kAgggP%� ���t���m�� �6j�-�Y�q���c'�w�����3g�vt�Y�O��y��A�C��U^���<g�n�T:`���ȣ��!���Ow�����`�Q�s?OlIse���/y�irϩ�W�����f���U��x��OZ�����M���*�$����z�c3�Tr�C��"�^���Rݲe��ّə�"�����C�n�	h�!@��=�V��Q`hY��nT�)\E8�<d+8K�ځ�vYc�1,Kyu^R��C��?85�-3u�]jg������:�?7j}=�6��ڎ��Jyb!�^��d�B̸��w�����,���-������"D
���bō6SR�:%2��jB���?5�P�$�J|�'��.� _�H����َr�V��n��)�������I{�۪!�4B�2xQ��zp����XP��;۬�����&o�ۃp�Ԥ�źȓ��kKD)�r�t���Д-[�F6��o��%���V��<�:�J�B�@4��D������p�V��PG��9]rL�1�YD6�5���<KL�Y%�Qf���;,��:��H����:�w����o��Z4]ʯZ�*�ssV���(����r��2�0d5�ki�u�w��Z�>&Q��{M�IL[�(e��_���"胚rˌ
�;˨�+����	���`��A20ֵHH=K9#�ֺj������]��[������J�ͼg�ƙuO ��*e��r��ֲ
�ya�`�L	���5&%<U�!t��5Tf�*��`�L�'��i���\"tUiep+O*�t�D �*��e��Ĵ�g��&�C ����P�֭c���Tz/��'�H��X���ouV�x�[`��!x��v�I�c`C&nk7�
��\��t����O�x�������Zz67�n���66<��c`�p��*[��̥/lee
y ��0r���Y˜!k�gF������0��mp��=�zK����VS+LD�P>��cS��r3�/>�ie2�7�2i�:i�G�� -�r��-�v[��_ѡ�<#�y	��YW�c�&����@��M����4�>�'�{
@ �p��Ӈ�
��}���J�Vofr����,>6jݱ���Dp�-Y[F~"RėN��+�ɑ�
u��x6��Oؙ�f7l�X���F.���C�5�S�[�	��`��D�߼l�����S�k��
����k�-�K�7z�$���v-ј8�Ϊ�����Y�R�B�в쀘���Yo�sv��j���b��6
�N����#�W.��Fk!.]F�a����ÜM�����yGUE0�Ӏ\�Yf8k���VְD<��,���j<��[��3G�%i���-��)}����� kb�#"P�"�� �[��"�nZ\ sI�dG�ln��bۇ��k&�hZ� �� �2���	ĂP�Au��0���K�A�~��3��f�-���D�oOgƭ��,�����۷��,�(��Qp�2�K����6Ȭ���Vc;�klvb��%x��� �,3O\ t#��&�O�IYy#q�;#�>�Q�YӜ�ő�I�"P��dN�8[�V��َ���F�PC:���,)��8KM���ɆY@"�~@[�t<�&�hE�d�n%B΁���V�,�9��+�Jp�:��y������f㱐��ޝ���L`���B!�S/H����aTf��.�ֶr���a1j��Ԩ��o�K�Z�������"���d��Yޜ���)���x.v=��N?��\R��r,����_���#��a@]�}uO�"�#ZOHϧB@E����x�K#�t�,�:-a�>��p=��c\�)|�@����U�bA����/r�zIhy��S���qXVnA�,��>���5
1Bw�9y̞~|��\��^s�2+����!x_�+jy�nYi鉓VZ�$���Ntڊ+oD�m$P�hx-u1���1�>}���uW�p���8r�tƭ�� �uD�Y�5�;���6P���g:������ �ԶxZ� ��cST�PB �4 ���(J'�V͒��`�r���q�:�A��چI&ڰl5`+�p��{얀�:N�'w���7�����t��#GqA����(,�������
�^�f='�XU�jkjی��1a&��
!7y5J�<X��T2�kGNƭ�H��7�OƢ��q�R bI�+��Q����T#y]f�	}�K곾������%$��x�ߩ8��"ZG-4&p�x8�1���!S��C��Q\Bސ�4�5h��lZ��3�6�w��V��2C}���?$��f�w�����I��w[�|2�aT��̫a��yf�4���[Z-5w��<i}.�Q5/RN�z+�^c���-T�� a�w��k���ԭ$"(� ����5%61�F�e��f\�rAE����Ͱ� ςy��.�wQ*�-����ɵVg���
dՏ�V�����M�B(����^7^�:)n�N�aa�  g8"pr����SOřD�m��QL%-?
5��(��;��1��WB����<��.�a^�c�p[�D[�,�~�C�HIڪ��/�|$���PT��u���tS��[i����&$���`<�*���6����ٷ�0�K"��P��ڳ�^�,���3X��Z�au�u������Z�%D����6<����:�߬�.��B|g����fsqf��G��3�n���%�"����!|1�n�h7�y�I�ɝ�s�;<'��2v��"k+ֆ�[<��J�c?��p��)bFq�h������f�υ�9+�C�jj}�_�̎�b�i����
�?��cH�z���UK����{	�A�-�% ��O��;�-m�V�k��RO��"���ܲ%m����Ul��q�;1UWTF��F밫Ws ���q���72Ў{�G��b��8���(�Lq�%�7l����ٴ��n;�N>>"Ä*�\�7��h/��Z���V�����!�9�;�a�:��yS���x4���P�i��50�{�v�~-�Q;� 	��X׶|f-B��,�0^#LHGaW��	�oi5`�Xc}��'&]/\��T��	�5���A;r(h�o����I���렳��޺լo���T�Z��jX\�|�ŔSq��M 9���;�_�:h�L`Г��.�^(��9j5�� &�0G��g�X�:8��������G\���Ņ�a�
"�+�n���6�޷�����Q^y4G����)Z��z�췁�b?K����E�ԛn���Y{g:�W��%l���e�t	$Á���iqE��tS�o��I�� ���Œ	8�0 �Q��h����W"��H��A�]j�ӑ�\b�u�z�,O�>aӳ�]蘱�i��-k0�s�}�-��=�0[XXv,�3�����͌�Yo�R��efK �&��Vy:N��L��h�j��l�M����*���y�vlO`� ��(�ꤘ�C�pJ˺klj��Ο���X�`a�5<z�Γ����.���>̈���gmɪV��Zf��2�4�B��q1Z�ԇ0��Y�={ޞz(i���V�ٱ�x
L����<v��9輥,@�A�	�XY��� ��!�d6�&v.[jk
���<���Z�x>Lx���fg \a��E�8^׍��He����"����f�Jk�r�=����?x��#���C:E$�'%Asƪ��l~6k�X���a�PE��/�W]�h���gy���4��p�u��@���iZ���_R�(�!]�����;�̀�k�YA��T�������
�#���� '�g��-�K��@�؍��Hy�F�֯2��/��$�m��jg��
";OJ�����}��s�l��<&q��>8�nw��rNE�gpU@e�CYC���V��t�x>k}�� ��e`���=i��biQ	 T�a�Y�&�Y|�=?>e��m�M퇻�L�`:���7�*q���oī�u�N�c�+m��!̬M��dO�x�M�[eTV�&.����c�>�� y&�2�����R۶8]��U*Gz�EO�k�V�mT[��kX���v��y;w�m�ʤ�zw���u]�+"��������U؋)7���b��3�"��d�(� ���a_�L�� �{Q/�~���?n��,N����#� Հɮɗ:��:<��n;���ն^a뮹ٚ��9c��Ag;4�VDR�SY���eԚ�*^/0���*I�.NWL��TN.�S3B�$���c"�U�˛�[�o�gػ�q�[�l�^wu ������D�MO��4D�>SU缾AV��<3kL����A�,n���iQ,�dK��F\AI3��s3�����Xl`7�T�l�#h1�(aa���I"�e�֌����h�J[��Zk�p-�=� 6��ȋpD���Q�: "P�R$�{"�~;�E5���p�p���њf��/a�`��m߮.�=��-o���v�� d�r�=��O]�s�[޺�JkP����G�ĳ��5\q�$Pa3�R7M������]�es�Ni��u�Ӊ#'1hq�q�/�����O����W�Z�$(��$Թ��Nkn���x��?�a�Su�&�l٪��z�� n�0.$k�lKV*%�
aX�WvGu�[��%�Ū�H5!�j�T���4X�]�u��bQ�%�{l�r��h��z���R5b%O�$@X�ba����{��Z;�B���SJR�'tQ[Zik��[�/�%@eUmlR)V� ���tJ2���e{��wv��s�-3�(�x�8o6
0��ICQ"���ؾ8=i�ۅt��*+Ŋ��VZcC�#xG��
g3����^�+��s䈤��
���b�kb�f:s63z��\�V^�bf�o��d{d
���/�:(���-��	�Wb�j�C��ι]��V[��ǚ�c9��h��@m�ӈ�v�(j�ýU��SC�YzN^��L:U����T̞��7�;�hm�������-�bhY͢wr/E�U\��i���*ty4eA&�����~#�܅}/��9 E��J�����!�%�RuB@��j��c!�׼�Ŧ��"휀��xWDK�m2�Dep⼅�T����!I����9ܘ��f�HU�s�$�9w��e֪�z�G&�(c�}D���������� �����?�O�vG���cp3-8cFc2F/��h{Ǚ����h�m��NG�Zrt7v��m~X%�xKi�2�������l�e���� �b=S�ٵ�v�hbŖ����D�i�NeY3��ŧ��n��Y��}:WZ���jZ�vw�W���?z��cO��\퀗��8DHBI[�k����w.�wQ���v&�+V��Ա�ϋpnQ>��Ľ
`�!�z"��aK����#ΰ��{-�OXtl7K���硇癴L�N��R\n��r�� o�N����IHa�L5K]�Cc�Z/�0!&#����}���R1�ϝJ����0NAiYR�N*���d���$/����\�ZEK苈��k��Ɋ�k%���KH�`���r���֍��ف�i�T�g�	�Ӊj!��$N��I����#6=x�Vo�͚W���<C��[���3�����^P��Z`K���,���N[Nm�1���).`�t[DT?��yC��g��� 0��vìW�/Z��n�(\���4:>����u��Τm^G~XZm��
|Ͱ%by���	�����A�~,��}�㢉�O��(�Η6Mdm��2;�L�V.�3�A묞)��F���3�����
D���[mݖ׳>�����'X�t�u�8�1ϫ�Ȳ��R4�rIgjKg�ж�V��Vq��s�MIP����
|�R�yk�E��Ey^I�9;�GU��'����L!u%I�tcT;�g���,
;X~_�6bkV�w��TYI��X<-J �^�#c���V���2�li3�f� �f�E=^�:�8B����s��|�ښ����NW���b'�)��ΛǦ�d�	��#��AS�c�S��,+:ϋ �$�/��H 7��R,�ЎvC�e�R��g�/�K��TL���d�M��R�1�O���#f欭���0�&|�"��T�Ԭ��{�2�ϩ3�lʶ���&�-LlIVhѴ(o'aЬ������}�����%;<��B��8O�Q�q�Q�ah�I��%u�&O�f��kk6[Ų60�����mۭoBxe���x��+�vT	����$n��f9��B/��M�F�(�N�]\v��egꜽ ��6M�'��=���(�˫m꿒�F�ͅ24y7x�����{rG͕����3;�A`��è&͘M��7u\�
߾�]����K���7@f�V�].N� �!ݨ��T���R�"�J����!^x�{H�Ӡ�Z�΋wm��cSV ��L����B��
��VaJ�gp���*��!�>g�h�	u0�Zp� '���N�h���K����"����Aߋ*O&Kc�*<Ү(k�vޜ���>(Ċ-RBm��E	�а��&�؄�{_�ݶ��bF`�6q�B�"��:/�F��Y^xq�-�l!��J�A�aܼ�v�8������3sy���fw��[ǹi�˖/!B��C Gݒ@��ڥ��c��A��&Y,=k��(;�@�,&Q(\�U)J��{���yQ���x��)�E��s	�] ���!�.u?/�gQ b�����G�;wmz{��ݟ�[X=juX�I���x.wU�r�����~	<���l��R�����r&�6CH��	�RA�~����s�,��\�j)qs��_�h�"!)X�Km:u�}1�>��{:�0jO^��<J2ʚ�>�4������o{���9vKP���
�ɥ���x�OcӦ��Ε���0�"u��>�޵�<���q��a�x�W`tI�vHՀ����_g���d�:I��s5�t����H�Ȭ8���P$�JjDaqx�}A��;ޯ��"���������@�ѡq�����MY�8�í��W�Xg���E���8�K�8���/��fCj?"c#�t�T�~�vź�}���H$jO(��B�b���H�Ѡ����蹤�M�<���}��ʑϕ���p����pq��:�l�Dɀ�cp��W]/N�x��E�S|F.��(q~{c�m������/U[��Y;~� 1�Q)�$��KHT�j{\��47���
�p=��3��9n��wڪ���,.݉3�:őmq��T�(?]�Y��D�"��(<V.�E	�/V��qn
$G� i�!"(9)�L�p��x���bHU�Y��ڢ�����l�����o��7�zl��c�y������*2^P=;7V�s�$Oe�6���2�p�=�7���:�(�=oW�g�w�����������7o7\kv��$�,`�z\��.]k'�@`.#��YjK�����ѵ�.�-.VNDW��3��(����t�Vy)'����L���9T��;J���j	~�՗�m�Z,��+gW�{�`�*�0���*,�%�@�7����N�����N���É4�9��$C�v����g?p����ig;̮���*�F� ��8��v,�w�
���/ptU��\������s�O�[� f%��#V�&�$ٍ���#w���ꓷ��l?�ϱ�у�x�oGЎ<=d�'��䈯��s�.Ơus��c�@l�(��K~��K�K�hD΀	"� ��4��>��[|{���fw�3i���������/rn`V�Rb3��&1��:��4�jC�	@�/���#�(����O�:tA��K"�\N�8a_�/ɪ����:�� v�5b:KZ���e��wTYeS��ƄM������ȄN-S����5�6��>\h���E	p��vu{�v�q���5�G�a4�
8Շ $`=�����a�m�������w�������!��=o��fWn�__�@WP�P]R5Q��[�wэ�����T�KU��8PH��By�C7�.eeT�L2�G;�rs����f}�1�a{�	���ڌ���(�R��#5�zܙ{n!D�L^���>�eƱ}����o�q+o�4�b�q<:/�s@��4}qR3��u��2��	;\mw���v��Cv��E���}ON��#��*��A�xФI��4HZ��"��*�hE@D<�A$5*���	$q�ڐGė�lQܪ��y�dg�ݺ�o.L����{A*͆�k�"��9���A���~��b��z���G�v�k�#�K��&��xb>b29t0Ş�R{���EQ%j�u����� ᖀ҅&=,P�ii�Ɠ���x�����{��7����N;���;r�z�^8�|�ח�����@9�B�9�+�K��}���z�y��>�#��	:c�������n��Pm��jF�a��-�c`�cBA�����c�r�R�@���QW;�G��8y&��5lv�=�7�o���.�% �#�O�|ַ�Rܶ���?s+VꜸKp+P�'�ŁJR�e���0�WyQ��[V��cj���7��&��Ww��w�e��-v�oG���cl�8կI�X�C	�ym̩!�"�9")�� �ĝ
K�<�~�2pRBD�vS��y��/oD"� >����L�x�]:�T��-��	�!�p�9��.d�rQlUע��z2���s���kn-e�4�0۸@8��Q����(uV�������4���&����r;�^bO�8i��
{�}�m���q���ؠM��S�Ib�q��pf��6XJp��M�k�r��6�^��TXk����g�n�N�J���I��!�:PU���p�k�I;}Wy�9w� g�?I���z�d��P�����x��O���w��Q����� p/W�\�R��T.7�� 0�<'�^d4]X�3���H2�k�p� �G�q�p���R����G�����.���-xQӸ���jB��z۽�������f9��$�I�.�A>�[k�F*N�R*���}(
�g��q�ΪVg�#��n2�s0��n���D�O1v�#�Z���(�Բx�0�@�+�"u �>u�F=h��kߎ��ێ����kf(�����T}qP�ED�KV�\I}iÖ�(%�����X���|Ӂ��������"=*b�a��\��>RhK*�%β����F&
FW�Ϻ�m�M��&���̋!��t- �y�ټ�w�$����u��{��.ȻR�"�.�����B�
�E �wz�]�VΏ��~[�C��H��)��`
������f�X�A���{��5��T��rX@K���5ծi�V�5h�1' ŹM*GFZ �P̆�]G|1�#*�ݼ���A�"w���Z�uq~�>��o=WRM�T��ϝ5���ǘ?�(�E<��)�)r ��,�%�~hsxAh ��dyZ�;�w�>�[�vͶr���´]�F�� tAR97�b0/r+���'.�Ҟpω=�D$]��V9E)ݼ�k1���\�b�h���SցL}�_t��T������Y �P���$_�^�\O�l��c����j���/���/IM[7��&��hU�B�8��t��� ������w�u��\�����zxQ���F|k�u�H~�X �8P�9b�[��@E�wP��X�V�K���@dv�T�B;΀�R�R0������	,C�	Β0��%a�Ю!^*���Pg�`ؐ'�+�P"2'�Kj������c�UY4�ܢ��ʺ���I��������lM���� K��}���<�:^�
zx)�
(�[$� q�	w�Iݓ*A��p��A����O@P��ӱ�~�@�EG �T����Վ�^�	�Ҥ����������Y<J � ����#�x?"}��Q��&�/�Z�������DQ�}�@��pd?Pe���~n���KyY!`��Ō�΋=�~���B���u�MU����-���͆��H z]K:��c��QV��U�j[D��DN�s�ؔ��#�r{P7';�C�9}�sfo|#�@;�������^��h�o�=W�m�T�x��6��;���pc�� -�h�J/#�w`з����lox�V{�Gg���3�,l��?�,�a�#��*R�/��"PX�x�Vg��!ݫ<V���ө1~�N��M^���va� r�E=M*UI��'�	]Ro�+o3{�{P?�������+��ԅ��f��&�����%%1�%��7�8��Z��>*��F\(���4����q��˯��w_o���N�[�7�\3g^�w9ׅ��efzE }RR�)}��z?lӪ�_/ה��|@�G�h���$�*����z��
��$F�A�-p|��{��!� 1�\NxZ}V��H��;�@}q�|}(~�L�>u��ᥥK&���~�u3�;K-^����	|uL�}�����H�����)�W��/�7���l���XNپ��$:�^UQ;�nWo*�2�J�[�l��m�*�-��: #��R����h�&IB�3'&�}&�.&��O����j���m���3����<ҠY��^�<@v�<@�s��� �c�a>�{�u�R]��������f��9_��VԂπ<�!��� �['%�~�y �����d�>��{����m���N�X��Z�_~�xL�Ń*J��7��Ӧ'_m���'��l��kQ@�I?OBT�(9 Ri	:�.s��� T=u�J����טw�M��`����1�)���Q��U$Vm�M�D�G��ҷ��ԍ��\�_N���;��	+|n�o���jܽl�MO���[$�z�q8������Zਰ���h�U� d��y�;y�ώ�Y__���������$K�d�B��D�{Z�['�g8��� ��<I�!|�@2Z�۲ެ�������;	�:|b��$����a���7��(u�CTiO?}�pR�,D���;˚쏾���oER�_��%Œ������m!�e��������]h�f��@�߳�6��8h7�����|������#�?��_��O�U{=݃֍�d�##l�#�F��3�B!@_�W��ԋ��w\�}6`��|�3��Ĩ��LĲ�X}��A��+���ꔼ��0������;�Ҏ��˒����[S�빊:�=��+��r�?>�M�������8�(���Q��ɣ@G�'�Y�bq��Q��$D�5��L�Ǟ~��}��u�xm����m�*l��!h>K#�yd_�_���Փ|
�7Q|�!Ŧp9��4�>��,��ҫ��}�1���$�!�rT@o��[׿Q#թy�Ʊ@L�G\/WV̤3�k�@�h�	���|�Z<�L�Z���6�;��o��o�\P>�{✢�&DT�}?II�5�rߤjd��)�4��̹v���΃��y��w̼_y��������ͪ������ٺ$�c��/�[Rc�>�͚!� nŵԧ$4O�-��T���3�>��'�o�w�y>y$�)~~�>a��<�DPl�/v���n��]�d�|A���W/Мa�w��;��Z��z�@�r����}�� �6���	�5djV_�����b<��ZR��z�<�ݖ�y�hw��F�7���3޴�I��tѠ����"$g�s�sI��{��T���?���?�K"�O���ǒ���}��ƼU�_�B�I�l��w��Z��8�� p�svtF�QJ�Ie	<'I �h�������%[�P�,����>�����&��o�Nj�.m��n�@R�}M�\���s���k��|��._��g��A>.����}�F4z��T�FLr���'i(A�m��H�C�N�D�Wh�+��ʗ�\���vX�[�#.�qx�6��J���J�4Z�)��l��?���ϻεۧ��1C�.O��˗>��P�|�-�C�ˇ��of�V�ɐf���,!D���BQz�"�q���� ��q���ǋ���X(�$y� Az1�ʫ!���We�n���UV�D<Tb/o�<�7j_����4���J�b�>�={����Я��w�bf�<�əS Hg;}+ �-���#/@�v@Ke9`��k�t�Ʃp�Iy!t��@-���K�))�K%T��2�2�؟f�����ǽrJ�˟^��{�X��G�}�=���v�0��V�g�f�N��]/�!�+q�vpv��N�sűE %n1Dy�."��3�\Ya�C�%q"�#4g1��򞝋���
�?�͏�陣+�W&�b(v�K�M��{�=y���O5��[�w��l`ɱL�ʸ*�-"U��"���8�.r��:��5Ԣ�˿P@e�Ay&Е���q��^�it�3|{�������]z4�5�S�y�	P��?�p������_��,o�m�M�:�Q���'6�p@<������@bLǝ��3�\�h"���@I� �="�V~=q���j#�ئY��<��䃐O=L��=�����c���%���Ч��	�k��qp�n��l=��%`_�:
��#���"�R�y3WD��b|��ˏ�	�-��h��r�o{�#�p�Yl;{����w�8	U��Ks�¤͛��Fv'��
��Mx1k0��؆�����7.����嵩2&jA�N��G�h�c9q���	��Q�v?R����7⤿8�� �,�! U��柍�Ώr�`;(��5�:�(S��R8[�.o<����]|g��ޫ�^E�U^E�����p�	#��    IEND�B`�
```

### `src/flows/fno/commodities/assets/gold-mini.png`

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
�\�  *TIDATx�}	��U��w�yLU�*�Te�HH!2dR�Dl^�.��v�_7��v���'*OE�D#�y2��J*����R�<������?7�2��|uμ����g���o̆Yf�E`�Yf�E��G|KB��D��K.�M�9e��{�䕭��{�Ўm@��*�ߌ
7d�B?����?�ǧͅ?.0��ѻ��Pï��ߡ���F��M
�+ټr�o�Ζ�s{��>	)ј�x1�	9����VSu��'��|�q4�_�W�P�GN�kﹷ�@�`��6:�I� *&iV 6%���5���;�j�}_�e�">�
��hssY�]�%�C�c���_�j�	�	�*$5{12Vb`0��\��|UQ�on�/�F���X���򮊚;Z���|���������P��Q^ʈR�Y�v|�2r�<o��c'[��v7�W�j۟�[���wS	H�8�����QQ��������	t�-������$�%��WY\J���`05��M���>��Q�n(���P(��)8������k�6�� yhI	*7Kg�f��#��EW�61�aeh�D��At����������P��J
����](|'�Q@(�)�����5�k�5���M�@M��^�K6��u@y����S�fPTt,gO
|щ$/�T(����y��������wBd���*NK�=4x{����o���ȵ �O�;��,��X���r�~��W�R��a�d�J��Bhl����:9.!uަ�;�?��Ӱ��|��4Zd��B5�f�&��Sw]_� -��
0>nq50)����@�N3A���*������=!�~�O��KdE4&��1>��-����	�h����l�tyCS�C�{�.�F��݆|��Ղ* ���m&|�,�-ϴ˻2Sۅ�c}�%�Ow�������/��W�Ĺe~8��4X���*?���@�]��ƇGO 	�Y��Z�
|��%��3W�<;�0��;E(=V����8è����,C���q�'!c~4d�����S�83$��.�T^|^SEݯ�ʗ`b�P�В[�f{z�R���4kw KA�f;�Q�f���XkI��C *�u�|z��碫� �|	ǝ�1�A�Tj;�yQ~��/�y�����
]�g|������}��L�O޷l���U@��Y� ��rh���&\��f��Itn�||�Q�bY��� ��}	k�;�k� 
��bx��-��0�/��Y�6S�}������G}a�]��ՙ>ߔ�+P�g�j̪	�Y2�-�)7��ج���"Ey������A��0z+�q�����S��ơݕ�&Vg�����3�萍�>�x��9x�7��no�lI���B����;�6�����)��Ŗ����F`�r�Spd�.&�̏��"Ͼ���lBzP���vQq�#���C���86��6̝)�(�{B�+�%��V�������@,w:V �������t�c {
��+��ژ������vL�8ϲ@l
��?�ޚ�(z�U�:g��(ϫ�&5󘠁�ǚ�Qah+�$�4V?���{����M	��u�V���0���!��z%�Y��*(-$�GV��~����6�Lm-�����̀���W���yX�y&G;Q���S���	��%0fFLB>��(���7��謴Pm�Κ=%74w�⼫��%��F��<�f��P;l����nIRI!�tN1���S\.�E�>�>�)'��ۃC�6c�V>A�y Ɣg��>�%M��n�|;2g��D��s�����Sw�P� b�������-EhG�2\k�>L�wB�W��[+�)�+W[4�N��h�;�牝Xz�zL��|OB�km\?�R�f����&&�4'�gB"������5ֵ�[�_�(�`�7;0l�e.B@
�j'w`�0�f�����)M@�����f��<Z-Yi�Rt��@��8����5�i�1hP#��r�&���}]:>ΪG]�ۍ5���N_�R��hɫ��|�r� ����'���E�ڰL�Y��ࣴ=^���MTb�����]��l!V���`'�
[m|�A��b�i�g���K��kW��	����YuLAc�+a�|�����-e��N��F��@�Mp�n�"��j�/e9p�t���qu�c��X
�N����Ϣ�v;�_8����p'�Z�k�h���ueZ��z�M	J���e_����9��1�á��0X~慭�-T�/���m3ͧ������  L`��jf� W����ޞuR��	G����/���r�p�F����T�vu��DOJ���j�-���*W0z�G�G��\�q^����KR�l�/ZqI���;�[3CϽ,1+�&Xd񥀲Z+��f�̛_W��P`��K�nGվ�t��\�ުm��֝*��R�vk�x�s`�BDC��'�MFa�S9��c��~G�V����?�+�L��������* �xm)e��@`{m
a��v�=�L���b�"�}�_��gK���S19Ј��&[p��42����*�2c��8j;I���ɼCm�%�c
h��ת��ok<��w����f�M���q�,%��MrF�g_�9���̑e���H]�|��k�W��;�u���47��|�����[?Ʋzs=�4����_/ͤ��ë��;�qo�������xm�[n��c��o��m�����u������rD�Y5�,f�� T���Sx��~l�vM�[;��)D@���}UO�������t�Mh9�l�ù:����g �S�� �5p��v�rVr���O;{q�'o�+�c~��޽�^���v5�k[u�?���[ �a��V/����6��)�Y+w/��R���w�G��.��������Y�X���=��7���q���BKz��\ёU�Nc[P��y�_>'yI���n�wo����Ì)�y낄���慨���IId��I@	f��<3�h2v�!n���v)L@+�fԂ���sg�@}��^p���c��X͗)S��|����1H2r���|�[��sÄ/�#KzO����y�?�6�ٌD3�����Ӈ�}w��R�ٶ�^�'x�
j@y�:�#p͒����R���(�g^���b�V��0
�eZmq��۹�>�E�=[Ƌ�oGkES����/#�����оޔ ka;թ��6����%Ƣt�<�&�ɪ�ӱPlٷ"s|8pgy^�%�����]>A��δ܍��L1tIr4�V�)Ƌ��ܕ��L�Ci�!����}5�	��EX��x�y�m��N�N}̅QZ��k\bo���7f�����_�t����)_�#ǂ�_�K1�~:�qAg��]%��?��:b�;K�fݷ:R��vo.��|��¦ɘe��RO�K�6;��
�gy�oC�E��l����m� ��ܝs}�q5�D^�3k�f�N�>����I|���$��#�m+���U���w��՝9�Dbrd	���@�#�e�ف�r�%�k+��Na��-x����g0P�,�^.Ɗ�6��������RIƔ&��S�����d���;_� Z�����o�E��;�Ƿ��7�����rg�����p�)�L@R�ׇ,�^�Hh,7� ��kF�9�ewAj��4E������2�}����z�+�:>��wV4���"��^�����:�:�5#�x3]׈�9x��@�t�7Pn1�����4�ʓ�5Uw?P��q��Ș]�Ф$p��ɯ��������������Hi6����	�2t�>�}/V`�y�yMٍ�ʎp;����lL�ɿ+-���W,��1�2�S��W����F3������?�����@V�|�-=nS}y�C��ׯ�ݬ�A��13�$UݿgeJ+8˧P�1�Ug�Ό�._��e�m�B�r;x�P�[�
�9g��}h-�0��.��V,'������S��c�y(m ����Ѽ���X��~ܱ.=�_X!f2x���$�����P�m���!rl�����Ւ�m	I�E��Y��䣴��v�l��,V�|�Y�GW4m�8�r�����<���*��z�\�Q�ڙ#g��2��L�����yf�[<¥V����bD$T�q�"����@��g"H�7���_�X9t՞��1Q����Z��x�)-W"Pe���$��d�&ۨ�)���,>�j�܎�4~���<ᾊ|~����5����@kx�$a/�d���JOrWc����O!p���D�nZ<y�S���=->���$����m%<�c =��^��ڒ�_V�mɎ��o��<S)i�)���͍x�T&a����j��iC�iS���(�pb�0P��������i�h,h���� �4��r�1�����rQsҀg����D�N�`wElc.��σ�y�L���i��ؔ$|;wI�)+s&������v�������ǯh�j�uM~y�,߹u��KP������"[D)�Y��KQ�3v��K�@�o�C�$��,�2��_ž��p��Ѿ���5E����z�%W����}Df��ΎD�S=A��[�G^S9�	��֥� �s�>�tK���muǵ���ei�.;{q��~jm�ۻ��
(y4������W�������H�e�����):�����,rئ ��/ �0����m,�K��	�{���]X���T�*_�� m`t�m�sL� ��,_�@��L��O�~�Hغ3�@�CK�N?��[*�6�,Qw�n�҇c�8SҐ������qѺ��O�,y|�[�h�u�k��f��S���7c�SB�A�����b,T.����,�>5dY�ʝ����s_��D�,�ϯ߇܁�� >n�/7�ݍ��f��V�)I��+b:�ng���?p�>�ʘK��|�|`y�,��l0�ɿEr�ۥΐԹшO����8!���_�<'��W�LmǾJNF��7�^W�|_NI��vr��N8��8��po�	,`cJ���wJΥ�Y)I@�R����:�5{�Δ :qI�6`�C;��x6oV�p`[{���Y��u����3��gZ�"R�N����NA�"�~A_��
�7��vu-��!�w�$�Ob��9���e����ܹ���.:~��)'�.}�<Q�q`����Ƶs��G[I�!�O���8_�?�X	\
i;2'�۵�y������:�(���%�����+���Xu�̙3�����|��襈^��)M �2�˒{�yM���x̠�xd;��s�ߴ�f��_��V�H����r�6�uk�^.�1���)wVDߗ�;����HL�_v޲�C�)���@��|�9�xi"�1k��,?�?թC���t-i�5�1�9`n���Rȏ�u�<-m d��3�e�2��|��c�u?v>�lX��,?�<]�1.w3F��H6�8�\��$��Z����h�eT#����������XFW���/b�~�n��)���*6c�k|?作�PjP�$-���2�ƪN�ښ� �&�x��}$ʇs$d�JGjg2��U���K����3�~�'вw�$���e�!%��U��P��dQdZe�@�<��bZJ���&���d��/`��y�=���ټ�Ƕ-M�CMZV��2��J��������,6���E�|� ��^���_� ��8����ذ�~���.�O�4gHZ7�7^�r�Ҹ�t�q��q	��fA�L�9�c����(C�����1����ʕW��������HG�8	[�����֝z ��~��$t�BG�Ə���}�U�-��l�.a��(/�U����Y��k0�V�]����"�+O6�G�aw« ��x� ̈́�Aڒ]�L��@eإ,��=@��������Y"�(�8���v�EǼ
���޵���l	D���\����CL
&}�ģU��Œ��Wu=5p?k�Q�׆��Grw	J���`�w����n,۴��kAOɋ�M����r1�^��`�	#`e�n�a�S����*U�8�{<�p�]�xᾧ�I�ȉ���j0�)���Lh�"](�'���Yy7�b��M	;ya��XJ�/�_�!��(-%�Q�z��f��$��ȿ�W���n-��~���s��I��K� 7*��
�hm"e^>z��z��w���ߤH=��=F����ϙEM=�ѶKV�/D���Q��{�J$��5`�0�;�;{j�D�	����j::��Dޖ�1m�����yc������Ղ^#j�r�a��j�N�2 쫢[�X��O-�]�!���CwUA(�����A;9��2/:��r=���m�~IIM�8����3��P
�:*�ۼ=mAħ-��f����ny�;�	,]�ud��=F�u~d��#�88�����B�2����hn�@WM�ʑ��4$���B���o�H�_���QJ�)NA�c}����X%�^�ɱ�y�$/\���R��+�R`�����_��g�4d��۱�3��b�����<��4���a���5aaZ�}����C�Ĵ�Ph�5���o��V/������������Vx~k:�C�-h.y-U5�F�Z����2�D]y/ǜ� g#E^�I��7�}�}��tN	�	&K�h�B(a�`��;��0�Y��� �p_��b�/I�Q��Yܖ�I�uF�_���@���?܍��E��4	/m)ǥ���Y�v@���"�b,�w��')C?��Ee��5��+TZ���YO�V��vz�Q�K}��N�B�ebjr�O�7qe�n�w�Y���$� ���U?ZJw���x�S��Z����^�¡��>d{O�H�S�����ѻ��p��8�/_$����ˊ̢��i�x��k��wR�-FҪ�r���W�{H܀��%!_�����������c2؃�'�EL�"�L��G��P�$P63��X�F�O���S�X�R����,�����$�A��_��k�x�����A���R�_�B��]��'������4��O^�I�z�JPVX���8d-Y�v�8�����I�����m !Oݹ��?��!�<x,Q u�	�b��c^�������7<��k����b�/8}�^@�c̗��"�f�螴��(~�nDs/��n^�U��h�\�[pő�+!H��d��U�2�˯k�4�?�Dq]g�f����F|�W=Z�ہ{�
�����)N��C�٧����F�v�&Ƃ>ы�8�I=���ݵh�n�P0�Wapp eTD����ݔ��?nL�/^C�)�psϩ��p�h�s��P_Y�܁$<+XowCI���MtK��X�t/�l\���?ß��`��%��0Ez�E���ŪS���^FO���4�Ϭ-��N^6"���@��x�4��j��?�KA�f��ۉ]Vͱtb�}���hk�E�/�M�ӯg���߈��F*���O`���m�~O 1s!}�$J�բ�}�x�N����A�+�q�l�֮Ŭ=*�{$�r����E��ղ,� k������PY�K8��80�с��}H�Z���H�ŎG�@Y���l���Ye��+�N��vtkR�� ]A��k ��q������b���_����t(��qT���Oyͬں1Zv;V򄖔����2�d��@���.��u�Z<��d��o��o��Ф�<ǟ��e�;*� yT'�y�<q~�T��n������r�i���kL[+f�g�MiMg�8��FyY^� ph� ���N��/�j�n	�r�6�W���"�I3o�y��ī�,�b.���_0�8���Ѭ�tXe; 1*��~�qU����zFՆ���w��21w������(-����_���.�(D#/���'㔕�Hpk&I��Ż�OZ�_����p���"n��X��Y1�,N�d�oV����[D��4/W�wO#.�E�3��Ŷ�pо@H`G	�EUqF�|�Uf�_5y�ޗ��^���R��ė�U;���������P��S�o��U�Y���Tl	�|S�_�A_����Ќ)�a��)sZ^2�:��ܽeq�X��#`|{M�хq��e�c���6xVoh>֖�3�Ti^ �Q�9s��$7Lc��I�Eq���t ���� F�C��������y7�/fXJ� ��{i+:�P���Rd@��vPz�gy�8��x{Bw}%�Ɠ�[Vv����}��hg�N�g.�1eN�\c4��s�.���<�����Ί4���0�0v'R��Odl��A����.�V���l��HD{cѲ-�� c�i�@�jLtX4'	�����
O>�w�����j�&�:{�}"��6�0�z�@G��M�u���o�s;6$���o�ȋf��2�~�U{�K}�h��_W i�$�;�X]�U�s�2���p"&�����f���A��Ot�'}��
����qjc
 -sAУQ0�#)2'���7�u������΀O��%~J�Q��X�ţD�D��x�<|�6�b���៥R)v�c}���{�����=>�IM���ql���hY��X
���U��`?>?D��yDH�m 	䥕7���Hf��*��/2�x<�d�-g	��Û����Q�0���q�^&���[�߁�¥���Z�b��+�}H�e�vuhS,�]�o�����G��X��nR&h�����8�A���ڱ@m\,C���N��>���@ю��;����M�����$AӀ� #�h�|��*��P������|l���*���j'�L��1�����w/�w�[���Jt���\�Le�4��:D���Y�x�XZ��\�&�o����D�q�Gb=`'�+S���B4���|�]�h��p`�뇛�G�W~�Zqy� v���8@��nX�:'�$� P<<0��d_�3M+��L���@�	3%?����D����|�V�I�&�0�q��a���D��#P*��(�V�<�G}-HV�2��b��v�c2�[�1cY{?
��'�)�pА5���x:�.n����#��~iU�E 'C�ge�)A�zF�!$&Lٷ7�w;!�y$'�8�J�
���6'w��pӕ�?� nq���'�V��	��<�sh_-���3-tIhu��(E��JL��'+�N���K^a!��^��$�<���������o� 5��������5M���q1,�zl�s Y�sAJR;I4F'5e�'<�,��FA�܎G֨�Ѳ��ؒ,��?���e����~>�ul�}� +�C~��7)_Ai��
]"���'Y�T뀷Y��b��(N|ɥqT�7���|��~�=kzP�7�� ��!>�Շ���Y����4�FEL�c�	7��⑞�I��:��0����My���Y���$�z���H����Q������ɫ��!Ȧ*Y MW���Ǒ"`{�e �BA��#%::��B7��ҩkmǿ�7��<y�E�Ȱ�[�?�����#��k#�(1k㑓0fd�YB����u]eݔ\�Y��R�N�Z ���⤄��_���P���{M��v��O����ε,�&k�Z�+g�f��{��QQ�ŵc���7l@�b�����5�d�x��܉�W��kwl�cE���~��o/��{���?��:<?77��}� S*u���8���(ZȄ���g���,Ќ��Fή�.�6*�gG��g��O|���CA��O�� ���xlR }�!��v$��Y�����z��v�W���.���[x+|�}����7
�vl��}���G3���w'p��(N���Ӣb�e1���og�w��}m�ͫ)����%��/B�����vl\�~�5�w�";�I>M	���we�O>=�zh�Іc����`�� �u�10��N���7��E�^؈�p�7���{�"������v|�'�g����J81�Ð>)q[c����ԪzYOz
&��]��x��9��~�����R�v�?a)ק�Y�m�H���m��X3[���-�N��۞����+�훍�yL��h�K��9���{����T�\��bڏ�h.q|k�c�F���,*�g��~Z�#|oۑ2O'?c��t�����1��,=AnH���#N�p*J��?�*�����M��UeZ�Zڱ���~� ���!d�t]�i^gT��勺�Ů5���<w�Y˅/J��=`jz<����F(�
���c�%��/��j�MK��cЗ��SC���9���h�\N;;e�|	�OO�!���R�։����n~n�Z��ï��ۛeg���v]��a�(������$ƒ&QU9���¾�.W4��C���n�--�����N�E5���/qÉ����ͷz!��E7����n�4���r��"�Rϯ[f�Oͼw<�x.r���x3zwq�-@+�Oh�����Ex�g��~3��/dn]�g������~���R�bo������Y��}��wE�����f^G_��P&��R�B�Gͮ����\�/Óp9?Q?��m4ק��xd[�m��k�fǟE`�Yf�E`�Yf�E`�Yf�E`�Yf�E`�cA��f$8&��6    IEND�B`�
```

### `src/flows/fno/commodities/assets/gold-petal.png`

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
�\�  'UIDATx�	�eYu�׹ÛǪ�j���kl�ih�q��"�`�@�l� 14�&�J9Nl'���8rp"�1 �b�-'6M a���������U�y���|�z��(R��^(�U�{ϰ���Z�_k��ϭ���&7���Mn"p���D�&7������G�C/��ܳmǡ�����E�Ѩ-]��r���?������'b��o?p���ū���zEs�m/ر�Ec�c�je�������G.^8��_=�����%>�ַ���,�|��c�����:o���zx�{��K�U��KS�Y\�Zώ��r[�x�����&f�O,�o��#1y�
�B ���qwW3������ۢܵ��zW�O��v'ZK3�E�n�[�����?�P{����/~�s ~�o���(�ƍب�M:}Sg�u��Z<�Ռ�%ʑ��K�@ �c�":e�M_���V{�h��N�z���������7��KU�7Ҿ~#5�m�Wo��K��Ok�x��]ͮh߲-���F�a�P����ۢѳ5�ň�ًqe�g�D�?ێ�ɨ]�������{z��{����}�z�3n��7���;cO����o�G�k��0���#6���cϊ�ێ淢�>�'bia1�q����Б�TF����M������pC��~�q{_'~m�p�ĎQkԢ�ځEl۳/z6�ѿ;P}�>KS����), b���̹�+av���x�]�b`d����'O��?����n$u����������������6����W����k��{8�!���¹h-�	�A� |q,�jg���>/Dq��Ų{xc__o��C�c��_�r��?��xAm)~m�H�覱(�\��D�o���;�7݅��B,o���`6:�P�K�wN�����8w1����������+���Qn|�=�B�K�::/���g� w�زsst�~�V�Aep[KW"&QyA��^r��I��\�l�xf�Vv�;#۷����!��\w|��q��B�RO����OF1o"��֏ý�7|?@�lg��ekY�ۄ���`���1^�n��&���̥�TqGlm�薁x�^7�ﻮ��{cWk!~q�7^:�95�63�F(~��z�n��j~��ľ��]p�;�6V O����~���n�0jl�S8��)�;ch��������}A<uc��	&����a ^�g��0�D��߲���n���@�z|�t�s碽8K��	A�v�#,gǍ��S�S_c��qhWY+�r��S��zL�}q|�����-��57�8�a0~���O�DAYl��s;�o�������_�_��q&�7�����
�hIE����5HM0T<��B�}��7<Z6�k=��x�w]_藟~�-�#Gbd��������E"�'� |���]��r ���"z�A���kK� �Ӛ���9����j���EF��c��&7�h�h_��{7"�V������F��>������W��|���K����߶�`�	�G`���[#���ÛvFc��|.������|�Ks�8� :P�2肬���-���Dz�[�
�y��8��c����Z٨T񺃛�Ǹ��%���� j#�Z+ޱes��%�_H8�ش9bd|$zV4��IԐ���)���)���	����'�pJ*2���K+�K��ňo�����(Ʒt�X�H����#��!_3|�g⮥�x/�����E��cQ;�c+���dc#z�wA;�~Ӑ�XR�lv�3�Eb}4�tp� ��fw�|@^B �����C�~��<�p}��G:]���׻{	hg��$T��!��+���k"�O���Z����=x[�!4,��2@#�����O�M�oJ94��ȧ� p��b+gB�T�WS��.2T㘠@
�Aet���� ;��QL�'����*�u�w^��W] 9=����f��w8����x��QL�e?,3����$e�"4)y���-,�=agg�bF>����2�ÄX����#�ru="G�&h|� ;Ƶ%m��ԕ���}���y��T������xyO�ܺ��ٶ�7�>�)Α�o ���n�p�oӲ����-ׄ[��� �IR�g�x@��1>�R Ҍ���HA��h�!4�U�K��o�Οc��\yl_љ��ۆ���{׵OS\U��?��]����;��z�@9=U�SG�!��~����A�Y��X�j@V��δ�r��N�>x.����g&]����ea�e����ԣ?P@ާ��/��&�)&g�l��Ƕ�{����]�r��o	9��V4������Fq����E�� }�F ݽ�htD<5���_.ٴ <m�5t���������ɷ?Z�N���}7��Y�H]������<^��$M��[~�9���j�P�_)W�AL~���oٰ������S3q�$=0�߀�Uݽ�Q']�0��6l�%j�%���(̀�S�P ؙ/U	���������{�@�b�-7i�q������ }��}�:��_A�*~�*���.���h��݇;eY/�?Δ!xJj��������U�t��Z�����/-�g$�N��Q�NF9�*��~ ���/��(��������h�B�ɟŨ]��3^��4�/|�mq�U����] ��T�����E[w�:c��j�?Σ�h���[/�7��k�:<��L�����^ _"�6�.հB�i�W����5�
E�~K^�p��
 �O!�v8nڂ�� L��<�4�|��-��g�/�r���� ⡸yS_ѷ���rfr�8q�c����.��9 �� ��\�,��u�fH9\fc ���t�}��|:�k�����s������MO-��~�����s�	!���u��9��QiUֵ�����8�;��.G{jg���y��n�" )H�ov����C�DQ�+���f�o�2�?�7N� Mt�j��V�cS���c/����ˀ<qe��Q��u�0�'��c�����@O����Ƌ��j�u��F���{��������/N��,xvz������]��R����D����%��:��8�I��V��� 	�[����r�ZC�R�5�>�-��i��s���4t��ڶ��+�/�k�&��b��}��xϧ�[����u�������;w+{�ǋs'&R���W�u�F-��ĥ�e����$�_r������ �R�����d[j��wS�j���ǹ��UI�#��R�Q�#h�Q{w3� ��e�������x�����׿>0��/�&��z<o�+^52�,��?�W��2���y�`�
��FZ4S�:[S͋���Z������)�E�/t�'5���UܞcYl���V��W��S��_���S��7���5b�N�@[���_@P�9P���/Y���^퇎D�g��-[l�����±SqQ�s:�6�̢@1;��h�x2�D%�.�(�$�d%\)��I1|O��K/�������|f�8�"�LMtq��9�ƨ�Ğ�m�q�@�n����]�3!��,�;?�L^6f�Ф���^�������fsî�Ȋ�3'�S���R�#RSR�2|��\&sf�@�����}�R�EZP��\��4�
��{R�
�+0?+�LI�\c;�Q�j��3h�μo�;v7��!��%�-N����e7T�sS�8�*�u+k��#Q(�Gi�C㽝F��b��ɸ���4�����  
�V�Ǒf.�XC�(��?�f����f�tW���*xϫ�B� �k=�qm��_A8�f��{�گ/�6�M.jp�-��֮��v&�����(���'LF7���|`}vk���֏����e?�r1.?��͚�>����g�]�_�o �n�[��TTBA�������f��@	�*mw�hG-�*,
F���LQx��dY��{�>Ƚ�f6c�C����|Ԉ�������8�%�8X@<qO�w�|�J�kޭ�"���u8���E����܅ch?�M�S�0w����W4��@e��o:W���|똆�`	�RR{�U$���� 
��I7j==R`��*.�
�����ǹ�g舉�	wYmQ���{;�����{�(��gs �K�^�����<��$���C�?ԬŶ�Mc��Y�]9�d�`�:[�V!�O�c6�NΧ4w R��:.AY:(Q�R�Q���+�I��j�/���`dd�����G��½�T8
K���(.�Bj{�"Tt��FchO�o�Ca3T$E=Œ$r���g��5�5	��O�Ρ�x���<�Y�<��/���si�t^*2����覃�z������\Y��J������ET�-y^0}N���B�2*-Wֶ����R �K���(.�[`��in����r�������f�<c�=�	r�k/4a��T���z�P��ށ�̅�b�;U���a�2b߀�:�i4o p�
��	Z��� x�h3�?Z����Y�-K��W0
��j�B���]��ֱG��
���ר��x���V� ����C[wľ}�+�� �8�0�����La�Z ��4�Ytx�g��,j���Ź4gt�������\j~�k�zȎvCGZoa�Vj� s$�-�"u�jvZ
;�T ҎT��k�hG������ �<�|�_���z�F���Ē��'��t�����3��I*���(�-,2x!5��جU���B�Øc�k����*'/������v\ln�&��ن`�	'�+��d`M6h��84X�N�^`��3?;��y��"���J(���e �s
�I��$���\K"��o�L�獣�F��س���&���8)c�q��?6RÚʪ0Ј:�[m�b����l1�$%P� �Q��ha���R����D��O� $-t�X�s�u�vܯ�vj���Gh5_�M�X��Y�T�t��=.����ZF�<�RhwPv�}�i��t{�4�E���ؾ�7����Z�Ϟ�)�w�qG>dh��
/K�~n�9��,fY]�D���A3�F@
��k�ݬrn�����^9��CA���g-´� Ѩ�j���$�H'�9lZ����9_Y���g��ZWE=��~O+X�W��f��Csg9Ax5�3�7o�];"ƙJ��K�:�ul��<��U��}�p���!��+˯
) �w3������ ��\�bh=��@0ר�Z�ʌ�13q� �i+�s����t�ȹ����!h�/����W�*_U	�gg����=�9�2�Y���^����`R���&��H�O�(� 8Bv�|����j� ���P�&��k�	=�i�*J����Pp�c�Y?�{��bA�%�Ky�(eyc�k��S��"\�Ui���+$zЅ�V>��s����9�a�Lrp��b3�N�@�`��|V�f�W�����t��ٴ�&3m��c���Z�`�V@;��.����Nr}��X�}�H��!�Z�:�
j%�M�y�y�=���v�d�����+Ѝ������!
2D}s���Q�Be(�$,��jn����q�D�H@ǋ��d��ՕU�|L�Mo�\Ab��ς������&�R��~;9��$<=�2�����
 +�^�/�˴���)3���9)��
���V�,��=��>�3?�l�֤ �-�Y�0��<�<N�mt���`���^��9���j0�^2k� �6�8 h���.�ٞ*���_T^E1P��kE/4� ����j���}�Q�Ҕ�g��Gi�϶#�{�x�~�{��g��Z���+ �S��YDH9����v�+�Fz�A��q
�a"�����Z he��+d��RM�W��ў�3䪝���S�F ���L�E :i^�(x��X��#�\���������,R���*�3sP<N��� $����nڐV��QORuim�����#��ptl Cz*&.���
�8X/��X��`!.�6� ���L�$v��*��eN��V��s����4!�d��;����N�Yqӑ��u�rb�d�'DI�$�Qi��$�k}
��r2��Q����P�F�H�*�u�L:f�0�y-ܚ@i�x��X�_��FW���\�*�����2M���Ɉ[�S�fs�0)�@���7�j�#Oj����X@71޵��3�&r �<}���&\۩U����uoTQNFC\�4�����ye�_M�0�tՆJ��he����|1��Q�����{��;���׉�fb6���e�Lf	����:�шHK���~�9�&�]*?茽�LdA8Rk������x^+3�0�n-A-Oǫ xvFET��j���'�+�H�dk��y�%��.SD�Ap���<���8��CA0�Z�u��/���w���BsVWX5>K[��#L���t�ѤM��b,m
F��$q5�M�I���=Fo���b�6�9.(yGL�8���:����n�ɢK��@��A?Z�	,'�����S����c��<�׸xK�g0�(yIķ����S
^��&;���j��N�^���β��A-�a�4b��F�hT�!�(QUN9���S"K��B$�����w2+�
�C�(%@
�cr��\v2���f ��H@���ɢ�f�,cu3� :��
��3�ZqV��3Z��GI�].S,�a����iL����H��\uY� X:��?���o���~:l"��E���[�U��&�z/���%�\^�J�_5*�PJ6ԫ���6��+;����4]��-��u�
���	�����f�O�\T�Tx��$Ug䨚��2����i��}����!e�d<yt*�<�s8�����v�,c�EVU�<�+�EW�ex����Np�E R� �,�̄Knh[��̜3mυXv���i�+$��SJT[ޯ��9j�i�x]���.�͕D�R����A��	�c0�w+ y�з���:"�u�*F0 ���>�>��z�Xy���DZ���̪˪�Y��=:y�Ϊ��qN����h��X���gϠ�l,;�$�c,��Z���.T��l.��1����0�@��D|ٯ@�ڢT�3S�l��}�~	s�� }E ��ᦎ&���\郖�Qf�,]��1{�x�sq�A�
`�[�����@��)HD����s���Նj�K�{	���z���Ǹ�dt����o��r�4�!�2.�|#�&v9�`sJ!HC�H��������ZCS�&iP_j0�*���x4�w���P�&��*��bQ�SA\a���(��"�zo�_DX�G�#Y	W���I ���1�ŗД���a��7�j���좣TR;i��b:��'q���0G~%3�"�t�5\�^8��l�^a�	v��L�ARr3���}����Q�^ �@�~�Q�̾��Z�`���uu��%�w&�cª`�[y�J��M����c����ʚ�Y-��x ���v=���b� ��H%�=�bh�h�X��[���U��Z�gh�;�c�/���
B���*u��9)CAX��P��jw�Eu�6G���ܙ����D?3����9�S�9���Q���س�~P���T�&���q��ʚ0s!����}]��nl�S�_�G!�(��@ �~b���C�O2 :���m�o�L-��	�um�_тZot�P��}\}��>��<})�_Vvr1]mx��=����)��	�2.�e@?z<��0�5�����	��*v��7�||�?��f�������x-���iX�a}���U��j�����K%o���+%��U@j�Q�S��Ҫ�F���TR���Z���s��x�VaK��/:��!�ͅ9�s<���%V�Yz�U�3q�T�߉��c M ��Y�A�K���SB'/1K�4�X}��Q���t��5 ������,?�z gܰ:e�B�tn ��G��+��i g�t�jpF}�g�5
+�dP@����d�T X�B�F|�NCb5�X�ď�0�N��:W��gyY�G�x�Q��7��7��q.�\*�%��8��sW�����]����Z˺��_����">�x%��@��I�%j��@��sBE�
���,L^�0�X�G�7����<�I=����HK�d��J6KJRxrw��h1�b�C_r-?�֟>�,0��mi�d��19��S���,Q�s���|�l�g��o;pY{Y،������0T�o ��� �>��gv΢�4<�HЃ ��.��U�)0@��!#��TN�%���@�FK�KM|�V����wW�9`���F�d}Z��Ti|KF%���8Ϋ�Z��3���3Ca�O�Q�S�{2:/�O1@9��� Щ~�p�}�́���� T�ݛ���k�#�����L�{_�֤����p���	�[�,%I�b��.t�Z+Ӻ���y�r�X	'��lJ�®/�{s��w�p�ηB}�`��xL?go�F��A�6�� ʳ�Y�����
��I��)���9Q��)$7>�
��*��%).��H9����7��~�+
�g��C��&�|p�"��t���|��q?�[����U_"�z�-1�ڿ�/�˝w������(�v����k���)��.�ؕP�G��~��Y`aI%��K9UԔ�# �k}*��ku��}X��c	��������Nd�n��u����M��zA<���{>&�@d �B��=-�<�l.c� ��������b��,P:�J�l�ٺs�͍ґ��ޢv�*�JZC

D�S���b�OB�>�q�7׌��/����j ������!"Z���d?���@"� `.�U.�M���
C�V�A��9�J�\Y� ;�(�j��Ko�ҧm崥AϬ*Z� *��~7^�.Y#�ѱ"�)����/�}ԛ��?<��o<��<;��ˎ������~:���T������#NW)V��� @4�.�� K5��+����{�>���}#!���Μ�c�Ǣ��	DJX���̪��}����+���3�����H,����:��㟻��()��!&��	��瀌��v�Nr^�b��{�UAXYВ�����y{�`�GG�����q��j���}-������g?���s��j�
�VKG�8|v_<�H�0<�5;0h��V��XU���w����r��^���-�&+'����=�y׎�e�	��5��I3VA�Yr��,�ar=�+������]����@�~����>���#�en�&�[H��i�7՜��F-U{M�uSx�� �}�����>�W�K;՚O��I#7<p����u��#���F��g�O���]T�kZ����Y�7�ށO8�3%*	�
��\�S��GAU{ͬ�O �NU
1�L�X��l��h�9�����}��W����`����~�_{��O3�z�@���ct�x���NF��~l��L���؍@
s9����R�W,ᙚ.�'���p� �r�����,��
ǳ �O�Ƿ��g�����`��3���u@տ�-�_y$���P_p��|�o��l�X�Ά2C'o�e� ����{�M�$�KW|^�}_E�� m[����/,���翽>�M��.�U Ukğ~;��L_	o��~6B�sِ�H
B��0���6��~�����ב����,�	OcI���g�:���Α#�Ë�-�zOn�����~'�/d��n@>@7A��_����.���W0�Y�x�s�\�`O ��w��<��8�|�s��s���~��_��.�-8�=h�^��=຅σPH��E��Y��,b�61C�.bE������c����O��n�rC���:��h|�t�p�S�DB5ި�>�ۮ�i�u�K��e$������&7���Mn"p���D������b1q��6�    IEND�B`�
```

### `src/flows/fno/commodities/assets/gold-ten.png`

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
�\�  . IDATx�	���U��}�ݷξhV�b�$k-�4�%Y���`!c��*RHU*5!aI%�JƆ;l�H ؈�Jٖ0�v;��fy�{3o���ν�4I����g���u�>��?�O/_ߋ��.!p	�K\B�����%.!�#Py�K|�+?Mq�u�ë���-l�5q��ol���dk�d�hu�����h�L�[�Z��斈��j��F8�������Rmj�T��jS[��T�u��*s�B���R���5U��45��W�ZZ�+�����n��^͙M��
��G�aμ%�mm���e���M�Q	��J��V�l�M�Wk��Zm��Q�&�kSM-��ZsԢ�F�+���
y�*���@6M�VЪT�W���+͕�昚��SƓ�MM�M������Zuˡm�~�?|i��/9&g���{"���T̛7/>����Z|�[Ee,b�8��F��1E8A~���}�`"��\k4AZ3Bg�2L9p������q�'!��~g:����9sc����mO��ԋ����$��kZ������V����l����l��E{����1��q@�{]3 ��Ĕ!@�� IG�T����5�&�+��k)Hd� �5��-ȍPz�HL�z�t_�v�n�6O�56q������'(Ӌ�^Wl�M��b��T<Tm�FUF�z��R�����O� ����](��_���y��\ׁ���^����C�W�g5�J�I� k���S��,���Gcւy�i��ᗦN_qo<���Y��*�#���t�ae���E�������z�G�G{5�/�K���XV0ӈf|�^�S�p	��`���z�$�Ԛ4Y��f�i�rO�i�R��Xq�[���w�%�g�3�l���~���\�$�86�ÒԚ���E(]��e��Ɯ���
`��Gerp 6�U��^ �����I��"�/�8��NqE�JO�P>�)��J���<2����8���Ю�����ػ�m|I�3�^7����1�_��bz����I��� Y]���"�^6?f���2&�GOͶ���k�2N( �Ҕ0԰�SS#�h����b�A��nWq@��Wfá:�5Q0�k������14x:��>���]C�~�7��Rgʩ6���Gbz�s�Qm��>-�i�}t�s�x����1<��I��hi���[ź���=wН���`Ήa�`L��c��b�|l�B[�1���8�#��/���xBz��O�gb|����O�[&��5�-�΋��X���=��on��L���:7�MwЖ3���J�-(�~���+c��?�_x4,]
p���]1:2c�L���@��WLM6��s?�dG��@ɑ`cL41��a��/e�X>�ET�_qS'��O���ޓQ��������_l����mf
3�.�	���ceg{|e����oG�4PP�����O�@�!:�N��_B�>3���:����(s�MB絖+� �ȧ�OߠSX�/��)0�;�.D�X-�����ι�p����e΄��=`���Is�VC�[5�4�6�|ƙ�+��j������5+�{�K��Z�b��N/P��4&|�5J���5%�9���qc�s�Kz^�2�Q�(Bt��*��U���uv!l�?�%�����F���{7�s훫<�@��v���/���/ō4�+���1~V��jf}Wưw��G����M���-��c�̶�'���m*�;H1�jϐ�^mh]Zہ�5!�	��
Fi����^���e]H�5�*����"����Ǟp�;W�5�����,d���q=Dۛ�g��+�\ �-u�ǖ3�ekWc���T��l�0X��ŷ7G�����͵AH'�IQ"�&�� �YH彦��Ɣq U�/���b���LO�4��`���;~�,�/�ص?b�#N2Yؽ�g��^���~��݌��.� �>/�F�>�Uk[G��Q9�ѸΎJ����qx�Shy-��9'�hpws�䇪�����T̈�X�q����	u:n�y,_�~��R.�<	�v�)�"�z_u�i���o���_��;?�kg=����̻������@��bWr���ƺ	�R��\y�z"���!LJS��xꥈ�n����0[BlC4j�ZLU�WW��Mo�w��k�t���>��e��^F
�и�߸6Z��u���Y�̡W16��1�f��E�S/�Ѽc��Oſ���<�T���ܸρ����������MO�<_C'��a6D��r���Z���z�$8j�����9��fE�R˹W(�ܣn�l=�j�.f� � �~VzT
�L�-d&�O/�b��ط��rzh�G6��[�Ir!n������h?ˀ�)���D�]�Aсq�7ĩ!V��ǘ���Sc����w�;+Nc��hf�`
PM_�/t����Q(Ӡ7��r���@��Q�=T��hi�ڿs/+w�S#��o����T��弃���x�6�t�[��&PDj�
vͮ�eW��>�͍��3��beS��Nu9em W@2@C5���X"�+�� �g(�x.J^C�Wd���x�p���^p���,�O��Bq����������Q|��c��S�V�u\i��b�l��k6��2A�������xaG���}'��]G����}���������v"�Lf:$n��@/]IK��t�4�H3F��GeP���8���W�o�>���ͤ *�:�۫�SS��{�[T^g�;�"��'v?<�8|(v�EÖw��ŧ�b���p{B�0��l�>`��P��N"n���β3K�Gz/�é�.t��,K�f0��i�n�N�~���Z�H��͘ ��b=���O{o��j����˯�3�����<=G3��Ŧ�w�����dD� a�O5j��j��HM$T�u�������.�K9$�^�e@w"1�U23W�Ǐ��О�7�~�{��s.��Q�s��2��{��-��Rѥ��ڟ�V�1�͖�e7��]_�V����M�ʪ���1#��W��4a .R��'��7������0�H\:�{����-v����|3�>�W�8���x�c'HG��M}�G��~�6�a~���]��rC�m�PI������8}�������Ў���s����T?^�[���yV�<2��Y�V0tb%���x¼�����}�Г�{Iy��)���(c�I��HK�gF\�c(mc�3;{�S�cG'��S����Wm���c.�}��ԧ5~��0D5Ak�A�d����h~t.�*Fz�2BWc�DO�׮�:'r�Y�L�i� �_Sz� dZ���zA�x��t�K�y�t�t�\Z͌N��5���I�Ky^�~pJꌨ�5K3���P;���<6�~�]:����`���r�e �j�i����+׿;�l��G��}10��l�w�uV�̵�f���a� �� ͆[�`D�=���|�)�b�r"�P�崉J��OA�G>)pB�tC��p�����74wAT�=�~��D�Muʳ�� ��/�l*�q4uTS��F�m����K�uq�o?����ƶ���:7���@N%X)0xL��'(�M�m3N/ �&
Z��rSzu�
x
�������%B�e�m!��"�\E#���^�t[�{�������!��Y� �	?B%��Т��( ^[q���{y�����pQ۹%���[�7u� �~��FXs]́�H�ѥɀ��
(�S�$�ǰ�˫�3o�B"ײ䡗��f&��#���&C/��v`��I�c�0��������?���7��u�����s�Ů����-�v�
����Qم+VES���v����8�3�wF�x�N��#x&k#ɓ�lc � fψ/��'XЧ3�8�<4#�?E�Kz���Ac^]T֍t�<�	K3  �Z&Fk��ţ��-�}Ȭ��,~�[  �c����v�C�B�������{�{�s��y<f�'Y�w����7����ᬩ�s�-���d��^�P�'�`k?
8���җkm����J�+&��"��y�oZ���m�mt��2���L��֡8���g��u�:�sw���X���89��X��4Ƚi�\���jj�)��;���S���n�uN�������myi�=�nn#xӀ��a�$�ea�<H�|��P��P�A��s�9������=ua�V��Y[
���X�4:ye	���Iʠ݃C���҉+���^�������UxH�S~�� ���QI���\2�lA���>�b{۱)w����n�f*�I���l?�Ϙ���ܙI�<y��m�#��_�,���|��}h���H���IG�+���r�|u]q|dYfb���t�(��f���v�Ӯ�3N�vW�^?�������]q����_58g�����T�G���Y��><��veڕ ^~��qz��ɾ�N�Ʒ��#N��<j�����(��4T`IJ�
�l��N��=H!�g�hI�{�D������k,Ҍ�%�� ��>Y�t��j����3L�8
x�|#�m�S�Y�g��>�b���a����W��^�`�����M��?���_�	�Y��0�T�dX�����f��ؠ�K#Z��p[�������=z$��9mq�J��O����4!�BԾbβ�SX'3�=�y�" u���:�nQ{Jb�U�9&����c�D�O�g��-�Zn{����t�מ���	�e�FW�.��L���q�r��fF�sKo��8��g���ՙ�5~�I +��}�s�u"��z%2�":�x�572���<䓮��Z<�-�ow�5��lZOm"�]j)�q��q����"��8���zh~\��A�<��<���GO;,Y�׮�7^�K �c-����C�u�PfQ������^����������[����(���� ��YT�c<K�t��Άj���=�-.��-qb��<x�Gc�~4lMW,�Y�`��_���6��9k�x���Y�y��t)O:�Rxb� �S6��E�8�I�'�h�<�s�]�b�[/�vzg3��#�7���@K(���[Zᗕl�e]U.n���z� 8M���sE{��WN�����𽺳ܳr�^L�; �i����h� l蚛��'O3`�G��c��؋�sW�Ѓ��t9�ڥu6B��Ayt-�&a��:�	8��:��抓e+�\��{/�_v-�3���fa
�㱯�-���pܐ���!�]���$%��"�1�4Y
�����|�,J�"X��%��0�C��޼la���Uپ����bn��~(;P�<\e�`����s����NV�_��t?�������c^�i�11=�P����~�k&l�����h�8�b�Ra�~���D�Q.Q9�
��/���������=�����L�ꇼRp��8 O����T(��x�Pt
A!+�,�P�1!�m���!T�_�پi�ulx�_a���+�������tɷX^�z�T�o��Ͱ_u���ľm��9�rf^�yOSܱa	��i'�*.���S��9���	�ǟ�`��w�r�sc�P,Zm-��u0w����)�'���l�cG�GT��H�м ��2� ji�aٻ=)!��Df۽'_6����κ<�w�H]�G�����ɛߴa�>��J��^���O�b�f~�6���zw��	^VF-Z� 欸)�w�-�$�:p4��f1�jA,���pN��m�6F`���'5��p|��8݆���5��8��+���-�=ӽ�9�����5�����@���a�����E�U"���g��KM�nɝҼ�6sa�y��3��sY�.��͙���Ow�4��UX|gH1��8��.���b�J�����{���7�-z����[�D��h�{3!m�y�l�1��7��@��P������>:���s��!.��	�T��w���e%�Ga����/�V�M�.��@�'ao�Ij�,4i,��yLw�inW�.]�uL�����zEG�Ww�n^�"�v�4�baj��߆:[X�v)��=����1�Ö�wb6���f������[`深gx�$��e�*�r��뾵yj�{��\c�f��\�`^F�89�������G�]�W��ո3�
!�u1�&禎�h��k�ӕ��K���:�`��.kWq|==�xW�S��~�ʮ!�WN|�}���$6�gXh�a���������ݿ��*�ls����8��`�Of*�;�������v\kCS��/�Ɯ]��N��Z�hN�铘�^^L�6/�k] �ᚆfR�-.N�eK'��0������H2ȴ���6V9-�ĂEm1�֮ZÃ�R������ (���y��,�VDl��ȾA0H�����D�«�Į?�`U5���fh6�:;:�����]7��^���iC����c8�?'�M`�A"�}�����Ɂ�
��S��i�0�:�t��|ց�D�i
���@+O�4�αD��<u$*DiHN!yo�pL����Ǧ���
�9l�T�#f{%g�Wu����>��>	 ܾ���wp>f%�z�Ӽշ���lT9�<pxo�����_�[���!+�7���@$�4,���a#�bg�^����ը��4�zן'@�Ndr@E��S�K I��M�z�4�sm�I2.�6��｡��ېi�n��a�w��',�I��|��U�+���G����o��g_�����Y-~}�[�8��
4-�A��8�ң�9w�z���,|�jgQ�����~*h7u /�{ﵡ��	8uL�hT�fzN�{� Zf`
���7�F�4�.m4хV��K�a<	�9���*�fU;�u!:�H�O
�!��G"���.Llg�ŴE��K���%�^��zE��cbh<�~�/&���%:�g��
��%���佮����Ϲt/�͵W���6Q���oC��6L�O�xoÊ�2ܦ���PS�r���t6�+�ءS�]hɄ�41�W���r�����!T ��͘t�o�[��*���@Iw�pǽ;�+r����8P�z�_��]�x�%�t��>$<��W�_q������s��=�/;���� h�TJ��Ѹ�VވF�R�l8�"eZ�{�q�i��M!IC�s�X�N��;:�Sϕ�ʐc�2���4����|L4��NT�B�t�W�f��L3����cb�.�0m,J��L��X�Z��v�~,ј/ eǷ�6�6?�3⯾�9�?�w���Ѩb�Ls�w��Tn���n'�4�vؘRadD�A6F��Τ���ƛM�^�4#n�	�/��� ��X'@iʈO!�����'Y(�u��x���褐�^�Tz���4���6��M�������̻~)��\���"�;W�Kh�&l5TVO�����#ݼ�^c����t(++w*W�'�/�K"7�#3Ҳ�3���+`'M�~�<��K�s]�t���aR�Ng(/����Q`���BsDXS�F����=����������o��;��鬆���״���;+|�뱟�vM�0�M+5�u�a�^6�Ʈ�hj���������V^_4�ym��
�!��k�3�AW��J��Gf�3��8y���,�`�\�e;�[/�#�x���f>ߤ����� _]��*��ey	0�
���,�eg9����龭��k���#>��_8��n�� ,���a�Cp�5�O=_o�/bО�|P�ZH��L'���'�����-(�t#�<�4�'�v����fY�.�|�ՂN�[�<�� 6��U!i&5�;v#$̖6�U(�e�g	��i^��S@���ٱD
ۿ��H�&���V��򷺇�O_�~�+{�Y�͇���U���I��%�>��d�sRM��:�J��E͂4V6g<��r0�Z�żܟ�+L��n?��^���m����e9`����X��,e'�b����:�a���g]yF�~��:/"�F��-.����Hh��_����d��<����z|���na���FVOgq�G��6(�%�S?����g�L*$`�ׅP4:Z�b��E��Z�L�ْX��2��֙��3�Di�1��S�j$�}����e�Lɺ�]�15l��R0
�i��<���)��G7�s#N�Y�)=�6��9���x�E˗�3t�?���ݯ�9k�'O�6��@�vZ9.�o��F����C|��8#����J���65S������*�q-m�tk����jw˳`Cg=��@�erd28��C�X�(�!�{�r{�J4ψ{�k��E����3���e�I�gd= e��H����qD�5����gg���� ���ϳz8mS��;ix��Y�" +��3V�����۠��ԓ�k��݈S(j��Ӷ;��xr�U 
D�,�-ǀ9������nb2OU�Y�������9�����Mϲ�G~��� �B �P�m��
���G��y��÷y���m�Ξ���شuC�9�Q+��T.A�r��7�܅�bz�U��zO�Oz"��S������L�?4�L��:�˱�Ϻ�@`���W�5;���5�P��uМ���4Vب��늽�{��-L�y��,H�0�Ne�yM=�6]���)֭s߮��[|����s�~y�� 6Ү���s�� �,M�����e/�u��>�x����e`�_v]}6�
�F�-3���@��=teO�K�׭D���C#��6���I��(��s��#J�����.ǉa�7y��VҪ�M���zʴ.�%ZƎ3����T��+�7�ˆs���ѥ%�_���u��1k��ۊ���ᠡV;���c'0�'ǅ4�Jo���r]4�{���Y��𖬀���Չ�,L0j�N~:�F���5%t�UV��옣�|�����
��ǎ���Կ���a�G9��+��������T������i.��F���lTN�w�q� {�v(��զ�#;�]od��	J9MY�0C� ꬤ;�=L1���{�su�k��z�
!�SC+P�n*����
�k}
�PZA���k|N μ�8�xl�ڛ��������'�OƟ�)����`1����T�Q+�3�6`�Q @�x��=�����yR��u ������35����N�:�ʭn˶\Cp��#�8� ��)[�Ag&�fY��gZ ֍=��g�儴m�.z��8�Y�O�����q?�- z�i
�=e�85q/6_��<�=��F/Z\_�����ks��OPҌ�Pg���� 3�x��X��{�u��ײi��0�W���$?��v�<������'k�Ǫ�R�۝� ,���>������X�0�����K��;�U���(�^F�r� k�hi�L��W����r�^�,�t]�묐8���3�!^^��5��zX7�����&&�GX9/�1fd��ূQ���	���1Jk~��+���>@/pf��4΋��)��G	i�,u 
D��ih�s/Xe�P�<��n����P�O�)˔��!I�O򕟌�#M:�ס�/=�e��Yݣ���o�� wA���x{��Ʂ'��	��
���u��2ϐ
��)y�"�4��m���u��Q��@��&���O�/�3��x�V\
��xX����Ǽ�QZ�����}8*<�>=�s��o�wA���'�< �ؠ�us,�~���Gu��^x?#7�/��g�u� kDZ����4���ڒFD�m�!	M��t���[L��ϸ�E=�W�����!j��~����l�p�����x�cW�P[-6P�u�F�@8�|�^g3ug4�g�s#�EZ�T����f���+".��&��I�\xQ�1�|�3�_LS!/1�ij��+��R�-�E�w$N��O>���U�ra��,�ѧs���L8�,��uĩ'���O�#<?����~4����H�@g���0���g|0i�.�W�&��*Aݗ2�:�9"�ԋ�k������{y�կ�7
�)ff�6���<K��]i�2�lΗ��P�slܔ�6�S47��D�O�h����� J����/�fZ��4����%�
��,���1߀������D �c����L���.�͘ ��q���ah�Rsl�B�fе�>5�q]��잊��f`�I!q�^-�smDd	uڤ'���#o�������4�+>剗�
�b˺�B �~�-l?=������)G3�ئ�_aGi���me�����̜�#Ҧ:&�O$�	�U�3�$�Х�* ���'��O��,C7�Թ��[�^�.e�Q^~��5,�Em3ʓ��9��O���3�(z�ܟ={����hQ��k�х�Y���8l)(w(����~��$�0�.�G�����y�B1��"��*��?�>��zűH�� ���KV����y�l�?�����~롛QȐ���	=�d5�.���� õAuQ�^ΒE�☖�/��� �+���Q��A����t��O1cF��F�tɗ��b��r�It������zO`g��w(>���<� �s�aF�W��CX�?`��o!$j���[�8���Q5̯�Ea��{�O�ht�h�'�7{��:�i�Ȩ']�5�����ƭ�q�a�f���)63faz�{?_�?���,�5~h�̻���^4�n�]U�B�-�+h���Ƨ\>`��]�	yv�*�	!l��%��� ̚dq���>�_��ωy��8�^e�3��M�oXW�R����8E�䃭�yL����ObO)g&Ct`�ݓ���]Wį���~�XCS+n��Ղ|��ʠ�jE�4�i�<�"@��v��n#���YD)\M�@��٣���t1���]�E��"��U0}*��`[�S�;�F!\(��KO��SsQ�M�h��+�CL��V[��B�o^˲�J4��R�)�	�1L�'�r
m�g�5�v�h���=�8ptgN�f50���ע��9���|�	_�V��C\�}v�#y*Tǀ<ŁPx����x�����Y�f��Ƕ]Tw�Aǎ���_l�'nX�	���`��K�i�Z>@��g��05��5���W�f�j�y���!`�Z���5�ߝeԜ�f^��t������7$��S��U��I�'y�Y�b��1��'��_��	��⸋. ����kt8>����0�\͇S�����Qy#��E�끥�!楻��9\wq�n����ځ9��3>���������͌��E�F���$f%��L9p�yR�^�B����Q��qҏ�R�^��t�/�fc����b�� J�1I���_���#�vzA�d���Q��k��lI%��!�K�`#���c��I4m�=�ޢs������hF���/`�k|�`�6��L���������M�I�fRp�����{���:���U ���u�H�!�2ߚ��p���5+��j�j�6?AlMG�v���"NA��\-V�	�ni���E�G�َT���v�W��~kg�||S`���p�� J��{],�;�z����]�-�1�S̞\����/� ��;� ���G��]\���Jetcںy'���5���C_~�pi����3�
?�!�bF>��?�O�p��OM������f��g�ǰH���c ����΋���2-�z��� JC�},92]��S1'F���D�K�/�����%.!p	�K�3C��Ɲ�Ud`�h    IEND�B`�
```

### `src/flows/fno/commodities/assets/gold.png`

```tsx
�PNG

   IHDR   @   @   �iq�   	pHYs  %  %IR$�  iiCCPDisplay P3  x�u��K�P�O�R�:�2�C��
vqh+E0T�S�~	m|$)RqW)�X�Yp��TpqpDݜ:)�hxޗT�"����8�s�\�P+�(閑LĤ�Ժ�{���S�f���,
��������O�YM�v�O\��.�v�S�]՟ɚ���A�����m�	�%1h)���ǂ�.�;��d���X�
j��I,�;�|��e����ޟ�W���Q�a&�PQ���ӎ?�-rW`P.�,�DI���Сa2qAꐸs�~���mm��mp�/��B8������x n�L5TG���r��	0���(�a��!w{�{��c�v��#�����+�)j�1)O>   tEXtSoftware Figma���c  �IDATx�[i�\�u���{Ϣ�5�l�f������*��؎	q0$�D�!@��@UJN*.�m�)#H������Ih!!��ьF3�;/={O�������kYBh$��[��_��~��|���\�ƥ�2�uP7n��/q(��	�cǼ)��9\�hgc�[�������� �}���x��z����+N��\ӕ�?1���qt��7�G&���p�x�J�m�o�UIL(�B�Н�J���<S�e��f��}��M6/_�8.��� 8�q�4=���YYu��AQ5�x6!�^UB�I@�\t�SMo�"����~d,�x���w����+ \{MY����w�w�P2^!�5�n�ϙ�n�M��I1�-��xAkg���[:��\�=�������}m���iN(n/��Dhџw��:�.���w��bT_�94lNT�oZho���_�*����ɟ-��:�9Td>��� �@�}v�1�Y��b���J��9� &����1_���9щW�Y�c|) �27Xw���5�;�5��y����>I��<��{~��04/T��Q��C��^�ܓ�U8�� вs�U�~616�q���n+�9�����24�>Tn4݄}��0�н32�P�eJ�Z�:�\y�r;�:����>\���_Z+~f������[�.�L4�I��3��߱j��Ϙ��>�|>y�5;�F�♨ٳ�0��\\��/�G����0T�����^�TKE�ό𸢋̮�$�)�Z����6��{]��F3������(��mGk���&Ɛ3�7`��������s��+�cBq������MƩ������p.�Kء{�ӗ�di>��"28;��0�p��$+�E/��;��08�jW��r]�+Na�Ld�x��v�+⚪�3�@�C�ꝅ�c��lGNi6�?iF$b)cӴ�7hb�M��H��:������[X�#��$���2֙�̃Y�0���,T�4Ĵ��ܺ�9h:�J1O�δ���� C��3p�d�|� w�X�P��~w}�22J�%NzٙT�D�w����A�,���]
�+KxJ)*>܊��h>܈X$��'�b�bH��p��T|o2��T�@�eU۫_h�-v��eVRYIN�����H��@c�詥�k�ھ��f�ġF�	4&�L������e|���L��ǲ�� ���w.s�`*��ľ�7ͽ��(,yI:�cZ�>!l��T�y��o>%�T�bƂ\�Ե1z�pa1o�9)I�2��rz�� #M��s��1���Y�<������p:%,夀�����e��e���BGh ]�_�L�3�7�F��|tV���Z�r�rd4�ߴ��40��ARΌ����\m8o �e�U�Q�N©L�1A�붞�1�J#%d�Sm�ˤ���(�������dI�+ꐈY�+(�����b>�a����_���jǤC������~�����C��.��r	��6��g�����Pt�8R��so!bj!jw���+栯����?U���٠X9 ��#N�,{�OƞI� ְ�j����my�G<DG���v�;�vcC��f%�-g��xW����E���q����r�o��g�%���H~,�<���A�w-�'|8���93`�*hWd��eUy˿M�E�,�x�-)�@��.�=7�%4��)��o�i���.G���(��M�o�F�$��v�t�Qx�p��0��hMO��ea����)���]]����ֵF$b�;��I�K\�I��OA)u��c��jwlF��訬���T-����cB,Ɓo���F�s|. O<��9�^<�q�.Rw��b�uI�Dq���k��2�O�:F{_!z)�ʷ N�k�9�\��A�1�g��c��E31�g݄��	����V)f���I�)�7�-vXrb��eb����!���,m_�e
.��@}3��\'�O�)3�;���� ͇�X��3�%W�b׮ɇ�gpp#�"��7ګ�E�Sd�F�ƫv<ꢣ+�.i�nyT�9R
`�����md�t�׷�RǦ���s�#^A{�鵶(����	��J��N50������$��@��%�ݵ�o�����](���pgR6ׄgeB�2X��mAY�+��<j�w�pA6z�6������.T�9/���Y�<�&P�L�#k
��O�@j�y=0���5��Ɵ`��sc�i��FN��mխWi:�����Y���JP8�E#�)�[R��q�l_H3\���m�6�=U�G-�2��Y��������*�,c3i�$+Ƞל�I�q�)>/��-�[U���(�:�m/���)x���]�pΖ�}u��	��,�]���e0d�:+����i'<�]?%<��8�އ��$���3�$gگ2��`���t��KƦ������ ��}^�,zN*1bz�ZBg'NW��;��m?�����S��R����^3c�e<�I�Ұj���#Iʺ�r�!��ɝ[E�;F{��q�}�^�?��q�{��7L��C C��5�����i��R`v��N�w��6~
�)9Nx�X�Y�ʝ25=#�Ίw�)�|-�Ѧ]H� ��n�c�W^5;48�dL�Gf���>�M�S��I-,���!��Wj!�rmނ��٨�ۍ?�ބ�i��X��U�P��<��v`�����tL�H����E,�tN��t��\��H������W�p���3�?}}��''�� �U?m:ڜ�9m
2���"���&G4H�W�	�CdwE��>��U�J#��\����FάlT���Ȉ�`��=L�z`�6KiI=�?y5�0K##7� ��\;Xy%0��<L����`�r�����v�d8e*��f�cyUCT�.�>������%�ۏ���~2l���O�18�\���ą��߀x$��c��R1�QA7Y�����X��N��Δ\��7���oa�l�ӎ�11JI�#�'B�u�k2�H�n���0�Н��j	��m�i/�L)�	�w�L�U�"�4+��6���jtv��`|�1}d�u'�E��G�Mg�0uwE0�����Ĵ+��P�1L�ZHOFl�	�~�2eJM����IM����/#�$�(�C�5a!a�������H�^ކ�6jgR�s)���8��Fd��`�Zk8�gB�,(l�A��xɤ���M�P[%��3��R
�Giu �8�t|�azoZ�)F%h�^���,Z:��K1�z�ܥ���9j-ZX���p�N��u;*��0}A��ct$��.aݗ�JC��X"��}�۬����䨉:�M�i��K�8�V~��ں��e!���t��:��m#H͟���.Zc4s���ӊQF��;-�}3J��MH&e>iv����N�s��s�'f��k�"��QSW�����q�m{SJ�p���b>jeua$���A+ޣ���� ��-�JY=D���P:{\Iu�Jj�U���8c]$��	g�Z�z�POM�`4�����=M����ǬE�ZZ�}�{gb@.1�ڠ+2�\�ɶ4E���

f�b�eK)1�hs"W�/7�t���g�9k.�wWc�;'�l�*ml"q��+�2
7tY�5&@�eu� {���}� �f�(����(�fd���J́N��H4����&e"A��DU'"a�?OZC��� f�LU`���}����u�Ĵ��^���� ��L�i��]MԬVv�����G-i�[B�ꆨ��+F��?�@e����+���W��̀{����MQ��J�"��IS�s�#�k�ij��@�5:����2�����}�g������4 �{����y�"j1��rjsCz�%<��.(�J�sJ��su$SG������$�E��|$n��2�l���{�������`a Ο�`�j�����a�/L��5��a�'Ը�+RL�IuI�R�>��-����O��@4����w\T������ ��,���ڪ���Q*i���4�sԴ���,<�dȮыϏ6ZϿC^�G��
��c
�Ɇ�&�g���)���!���z�ɍf�3��b�K9߄�^��K;QL�ǁ��X0��TF��V�M���b��*a�d�%*��'���w4.�Y�y�K��Q2I�SM� E���#x$���o�e�_IZƱ�3 ��Z�s(�K���Qc�7lƩ���Ά=C��G��gc���$ �ZZBx���*Q��]�0Nݓc�ˀ��G��w�NC�%�D��f^�����kף��!��9��[n%uM0��4E��� �'?g1��s�:"a���&�����R&`2	=�m`�i �ބ�_�
?�	�4�F�v8jy��ǰu��D1fX��]��2 �S'wm���&CBi8ۏ���D��\�}�'���#�����,,�N���2W<��VL�h��2E҅��[xB���wڡJW�-׬�Ɩ.\=�����.7$��g��F\���	�����f�&�;=8����O��a�i@SP�Mt��d�E�Re�V��CT��0X��/a�$;J&b"�@�� 9ۀ�<����&C�nBԔ�h܎k�|�4mf�HF���g-l�^/�E���ڧ�����U���oq��/�
��^�C�N.���(��/���p�4>a$��c&�=��{q���.�g����4>
w��P�Gct#�KZ�ζ]zh
-șc��e�����8-����Kߞ*�]x,Ň��=�=Fцc�'���0�r�
Y�u��*�c��{���׷�)y����eZ&Q7깵؜���i�s+eyEa�A'��Ԝ�m��<�*۹�u�k�T�=����	>��z4�x��_$c�.�ĺX��O��Ix�0:Ħ�a�����|&����}O�y�M��.��|2�E?._c!��54&GN�~�1҇�;�8?[��F+�~�ț�a��A^5��"��4L�6���Vوe?�?�M�žs��ի���)lhn�$����8�|(�9�\����!��G���_�����������#!l"��L6�	]�G�gfL�s�N���G;�R_��_܋c�v�@�G^B'm�Uӌ�٩&F�*)���`5XM��a��1�n���D�S7)�%x�׬b�:K���-�"�xqv'7=�6\�x�[�����T*j�!?�m�/�?9����X5�D}����a��x�	��X;ighҡv� �q�J�O�c.y�ئ����n��Z�г��S�oӦ3w|/�K�Ҹ4.�K�Ҹ4�6� '�n,äq�    IEND�B`�
```

### `src/flows/fno/commodities/assets/natural-gas.png`

```tsx
�PNG

   IHDR   �   �   �>a�  ciCCPkCGColorSpaceDisplayP3  (�}��K�PƿV��u2�C��
�8�DqU�ꔾ����G�"7�����
�n�::8�������y/��"z��~|��8 9npn��;�[\�+��-%��� �񜮯J��?��>��N�Y�������1����]H�����%����qK���r��g�X �&VXͨ�������`�r���l��9�X�<p�0Є�?�����]r7�R��|�ɑ"'���p�0�XC�R�w��w�O���'`�#�����p6G'k���<02\�����G��V��S`���P϶W�j���<0�(��$�:�-!>���S�p�|�b��[   cICP n��   8eXIfMM *    �i            �       ��       �    kF&M  YiTXtXML:com.adobe.xmp     <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 6.0.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:xmp="http://ns.adobe.com/xap/1.0/">
         <xmp:CreatorTool>Figma</xmp:CreatorTool>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
�\�  'YIDATx�	�%u}�u��ݷ���i�YE�Md:G�3����=F=br|'�F9F�$*�	$�G�FD�������]�ֽU��֣93#B��^Wu׻[�{���������,�"
D�(Q �@D��"
D�(Q �@D��"
D�(Q �@D��"
D�(Q �@D��"
D�(Q`�P�Y$����[��~�۾�w_s�)���}�o���^��G� ���$�G'~p\o�mo8{���X����ş���?{�sRk��yR�y�XD�5[席�k՚Ŗ�����B����������֭�E�S_�O9� ��,�9N&�Θ��\��
=el�/����=��r�	�Q% �j�8�Z�L����c��U��s,=:���7n�q�O�}��<��:���o�?��0�ٴ�ܜ��ͤ�V��~�C_��ڛ� �x��~�Q% N�sJƗ�ͼ�9�X,fN`O����c����W�ޟ� �-�����S�*&c�	i���ϬR1wb¼f�:m��V�ⱸ��,79����.]�}ޟp�@ҳu�vg8A�[�7��� +�n�֬լQ�ZCn�-�������~����?���yoH��d2�0��Z<�l.k�B�
���x-��[*��A'�_b���|�u����<��F `��b~���,��Ms̿���b�})1?�$.�[:���N���{��9)��_<*�ƫ�Z�qۯoכ�d�q������;���7�jioY��6�����M���>��s8���`u��Ɏ�dK׬1'�s��2߂����� ��~��#;�6���/��b�� ����L�����-Yn��댎��.�k�N`�-�װ�D6��|�z��_��C�R���^ r��og;5�V�=�,��	k�N�f�'�3t��� ��o@\`��'m �6��~r�u+0����� �<2���*�H�ڶ�U6p���oŠ�p�@��k����w�4?p"��O����Ϯ�����.jpj���ؙA�ik^�9~EЯkn�n�����c #��Q,
��b�r~�8�����ƍ϶h��?���l��8��_�t���>Ƽ��[m\��P�����?-|~f���%��}C�LA�Ả[��(�k㢊� �Z�������=���,8�ߪ;wZh+��~^�x��p	-����G��b!�D| �J[�zA��+voܸt�؀E) ���gߐlC�Q���8�
˖Zs�v�LN�W���0ܓ��8�𾘭L@��q<����D��0?KA�^��Ϸ,�:�� ���߾.�y�r&g��>���Zc�������`f�v�������W(�*�?���.��Gp&w��/[������-:���ǜS�ي�y����c�Y��6�?�}�O���O�^�\F�C���i��1GH@bOml��/}u��g�Yb1��#��_��{����=6eǝ~��s9ko�b��1��{hy@@��d	H���x<�u0��� �K6��
J�}Dn �@<��\���ع�b���#߽Po���g�9'��_*s���m��ך�أVݷ�Z�|B�bT��02�H��m���V?��B:<�X:������du��8B�}�H r���Ean��WVe�o'덞����� |j0��aҽ&~^��|�/3��0S�������T���,B�*> XlsL� ��@��ة���ȏPZZ�2��%�G�ܘ/4�o�-86E���o��䔵�m��G�'<�a��6ͮH_ ���"�
A<V��&��PXa�'ˀ tp��#��ĩ���w������:�mFFFb����9�E�\�N��B��sָ�^��̂���2T
��h�|�~<V�/&c�% 2m�c��ѣ���� e�)��,٬N{��g��	���ON�,�?Z �.?]r�+�����կ�����?��yd ��	ڈ��\�q�;��i`��e|��R�,��!xr�C=���7� � 4��xρM��0kNi�ʎ���~r݆�[`�'^�����.C�j��P����|v�6w�.�&g�E�֖O�H����O�&����U�~x,�W�ߖ�ct<a>BZ��GӴ�Kp�A�hj�0K��󩷽��s�ֽ��ZH$]�1�m�\sr����5�Y�{�%o1���֎�V=|��|j��U���U�V��%>�)A�-Ɗ�	��"H`-TN��4]�Ֆ{ ��@�*/(�����%��m2\R�'���o��ϮyՑC��������l'�fα������/�����ۭyh����߯������t.��I�xNy~��`�|m�b�P@^	_SA��8B��2�u�$X��<*���ŢU+u�۹sx��G��q%\p1@Ο�b.�Xߦ��n��V2w㝔j�[#�GZs���a��B�RA1r��K�w���1@ ���=����;���@Y���C\ xB��k������e�0Y45M�I�y�m���ȯ�w�������/~7���ׄ�+�-�%g�m�;M����z�V��y?�P����[�V�7t��]nA�]�Ǫ�p�m�+>��u�ך�~�0G�Q��Y��M�a��l�L��#��Ɏ���.�d_��.��`�f|k�U�&����\x��>�§���66���̇��.S/?A���K�e�C\����Sb M��s���,�d� Y	�|�:�P��X����e�9+9ܽ�
��L�;pp聿���a�����D�|?ߩ]��������O��͟�Ԛ��	�Oe��Ч���*���S?U����s��P�U@  �r�� ��f�e���Fj
��	����}M��l���9�A*s�
&B(�G@�m~�=~��]?Y� ശ�v�m���,ߒ��w�)�޼�&����U�dÓD���G������6�,��!����Y�y&�����i���:X��@"����4B������l���lf���'�����1�o�gw��.�t� ��Ypڭ?S��_}�yf�c�>��D���Y�&�2�-7��]S)�`~�7Tk��6c�ԅ;L�m*^��j�P. ��`<*�PZ�Mc�cCA �azhnӣ6��`�\�T�WC����>���o���{�>�����v�;W�u��n&{�w�c.��Z��< 7?R�SE�%\��,K��>S���~<��9����!�Dp�v?�b��u��7�+���V�e�Pه��rX�~��:M<T���;�|��+��� �_uUO��~���h[�*�����>>0�2c��3�:�B�|��|^�]�[��U1��APASg�u�r��D2��z�H`KHp`���4!�*5]�`��Sk���MRs�s�#t�2)��AHbvm}�rZ�G�έ�-@���Eyw���g��Do�:?d��I�$����k�F�hi}X�	5x^k�r���.����KFPGBA̰���23~�|& �0	� �܊�b�D�D�@h�Q�RC��g�ST�����`�ľ����/���n�F�Z@�H������K_s:�}����oN3�%�܂a��1��	���{�l��4�]�������a�'���o�}n�vLOٚ�+��Qqi��B	R(LpXnA. �-��$�1������i���a��N("r���L�&{�l���.]v�k����ih��i�ЪU�EKm�.si�����N����F����0@`�����%4x�����f��]�����l2��Y�Y�w��UA.����t��
�P iq  �	@��-������������H(y�����}���,��A��^�Z�14q��f�Z�w���Q�n��h\��
�T��%h���0F�k\r�&��a�
?�tg^��d&����N�i�U����
y��Ttr���H�R�O�o��?Έ�4^k	��>G�����AQ��7�G�,�q1����o���_��l�v���H�[��y�7y�/z׬�;L7�8�^Ŧ��mbb
���C�>���0Z���a �_�q��k h�4q�Ϭ����f<���N�R��=s�9�%KpI�J��@!��Oŉ�
�E�;�"*h鳸������YC��ғ8�o��/W�/�J���X��O��V�P�up��>܁�|C��	�W��|>�f��14���i��T�9F�O�*�	��3���G�~�� O��V�b��H:��i,��1^�E��S��h��w(c5��da1�r@�YnS�@�vx���>�.u�֕��[g$'ݢ�WdI74�c�_8��$Z���*�6&	�dn�ʭ 0��9V�`��0����鳁���a��]9N{���?Z2d_Gk���e�,q+�����dS�p(�|����J�#�H	e�D�Ydļ:9u��m��t���'��_�A��nAK�a�+��[�U�45pj��m(�Gݑ��TL�ҷY@�*��O��F�6��$?�����{A߭����E��c�����O�h���0Yw}�v5���$%X �/ܰ�Ct��V�>���V�ZW�v% �z���8ZT$��z��jZ��Ì�=f�}i�l��a�|��v��)-s203<��S,[3�����L��Ѱ�4��R�qy��	��̇1�4�ϑ+��i:(,7�8$ɕ��}I���G�b��ih�Վܽw9�{�l�kN���Ko�{~{X��aa� �M�����q[htX�Cи0gG�C�q���aa�~�TO��,G�`~��ÍKz���d����n'�sYN���g�s��.�s_��L~�����
t����1Le�
J�X�>1�u�`�Y�33d�J"�#��(�^":�V�$G����+]t%��T�h�<R6���C�`.��5U�J}�f�ُ�y�J�ي�9��RNfe��+T��"��ʸJ�0�)Ɔ��^����d�6�q�s�> k��K0�n�����W�O��XZ듟+��xv+�J_f@�P�h?�7vXL�`��GL��w���9�7�5�^}�Ov=�������8���M(�w�ne������w��B������h�Xi��=9�OA)� {!���?�n?��:��u�(~2��)/n	 ��U+�$�mM'>`"��O�h�<�̧Ր���F��σ$wlE����޿��{���g��gy��Q��S(��vW���K�@��s�*��4�JI,�vs��v���ZuT��  B)	4bt��uY̽����\���n��a.���t�v5٥����������i֦���}�Ep�rA����˝z�g�_��s���X�Ih�\��
߄M�WP�s�^��r.�
z���'[�/�	 z ���F))6�g�
�	p�T*A�Pwm]' ��\�Jgsy4Qk���H�ɝY�v�ԪV��U�}Y��1���v��4�@6eŁ���ll���u���ݳRh�&�ˤ����zj0��y�I���A ��#\\K$�W���	�g �7HQ��1�k5�D:k=KW|�x��:-���\� f,�80>ia�6i:'�i�v"��b��!p���ǮXa�Tj�C�߾+<����;���E"D/�HƘ*����R�j��ܖ6-^�Ú�a[V*[/�D�n�$���'�f�I
3�"�~u)���R�|���c�>�)���u� 䲛 �9 r-2 �_�\��r�`f
s����-4���"O�0�{ʸ+�;5z�s���~tM2�OF�;�;�j"U�wd��S��;����\��vSd*��[?A.H:�LB
�q,A�����- ��c��^�R�r���s?���u.��k�) ���ک����&�@����; 1{�@�|�_�9v W�1��V���0�3�??�eݢ�zkWjo��na����mt�N��ÉԆ�>x�GN8�5w��O��haa
|n�o�V�0����ф������$�j\��0��'���g��ҕ��Ģ���7j�>	b���!F��y����{7Eo��D�x���7p��U�����>)K�\1�
Y���#�����vֽs~����ɞ���'z˽��=��+���%��TO��G�������ku���,]����;�W����s/���[����&U�~=��"r��zTS��/�[����w�|���G�/���ʕ�<�m�o�~�C�_��/>��O<����FF.j���D
aT�(E7Q/��î��I�Z	<ҹ��(>Q>���2���u�3���p�#�q��;��S���:e�"V`~��=�V���@���u�����X<�f;��G>�n_���);�����U*M�D��t���4�z ��U�T��(���돖���q*��m�s>���ꫧ��;^�׺��\y�������w��yD]�-��L��1�&���y�/�H�R��N$���3Z�R�۬Vs��z3���׹?�;д�K��2E�4P�(��W/�0�%��%n'���K=�����V �r��d���~���Je�e�RL㯓�6"�V�,1��G ԕ�	⁙=����������A	�O��B��s��kT�i�P�5��	V��V�Xn��ƒC�?8�k_���b�K�ܮ ��z��;�έi{� �(��  �@+��l	�.���ͯQ�p��n4� �/�F��ۖ���=��`���ƚ�
 �r���$mc�A(;���r�_��zK��N�7�� �����Oy��Dg��qi�iXy`�z!tILn,�%��AS�F=�zp�oA��Z�S%�	����ľ�|a&�����%;(���b!��W!+Y5���GF����]- b���|�v2�	0�Q�DWP�NP(d(	�?O!H���������U/��|B�}�P�� (�N6ff(Ecu�8
�����"S����+��$3w�/���r���z�o_����X�4���?� /�-,� h�Rr-g��|�)�U�5w��J��]~��|�ޞ!>�s�? #A����_$��q�|��X�^��j����7x��GFhb��mA�H؜���Y��ޚ56
<,̿����t�r��4���w'��׿ް�����c}�T����Sl�%�j4���D�h� � =+��UK��`_�Ugf2���ܑ�w��o~�޹`�u��7�<���|w?��=��1����O�-PFH�3�/��Sc�{��%��}��甒��q+'�u��0��Y�����|p�p��H,�C0��&w5�����}���r�o���r������7�vڭ,�{���3Y#�V  ��Y���sԳ7�k�t������M�~���6��?����!�S/y�=~ӷmǮ��H�²�����ҨV�=�xr���=���]/��"o#jZ���~����蟞�Ζ_}�1�`>�F�����M�"����:v�}K�t�?b�S,_�=7��4�$	���塷'k���w�ٜk�շ9ӳ�%�5�}���;7�����d�G�T���_k�!��S��ᖩ�g:�
U� �t_����O������J~b|����ي%��:@c3v�ѱ���\�Ug�i���1�B��A�v��(τ��F��at�_�H�Ⱃ�{�՞x���_m���,�	��i`0(=�d^�溓��/��ɋ����|���p�m���gf�����d�$��~8�e�	��OO�6?�@j��Gm�6���K�"eZ�FYSh�(˷�_{�Mb�5X�Ei�HM&*ڔA����;�U�o�����j~mW�w�`���ԓ��\b+W�0�����Id�)��v�s�- ���Z�����+ǟ�	���]) 7n��LM]J@��N��Zwnn9cZ���H�Ԭ��bB4�f��}�m���w�zP��V,�A����x�(���n](j�+��C�
��r3O��e�`��\t�ܶ�vl�b{y��iw����z����^ni�C�+F�O�E�	3���z����<����Y��;]tQ��d��}w�	��n�q����^1��P�o� K��·�8�^^@'/?x��l�i���g������0Ku����:��w�ΤQ_X��|&�!z�
O>��my��q;��ʿ5>k��PY��NY���h4MS����6����h,P!� ����Iz	�d�>��O���rpfz����^8]��B#�J�������~*qm��e�f�E�+��Z�����R��%���N����4:�q��>�i�Jz���K���	�&j��*$g�=Ύ%��UG��������G�Yȡݬ��ș3H���rY4��a�8��p!)�a	0+� �t��9�Dֺj	ٮ��e�ʵ��m׽�qǭ����\�����չ���*�Dt�
h�b���%�Ba���kH��j�\���ʖ��׊����b<��e�͋��,���@ѩ��
A��v�S��9���^��z/��Z9,���`y
�e,Eyh��L+�k.W�}63�J>�u�������X:l�	�3�kw8�Q(��(-F����-��rpLѠ��].A�֥a3B
��C�$eZ1-<�"Hڨu���1P�F�&�P�z��@�In��|���i ���@�ejM7Y���gR'P�=:��V����}�H���u.�����e��iY�f.��<�����ϢQy�l����+����&�lC�+�V\�Q�(�-w�Ҳ0�¡���ɦ��a<!8Ws��ǚ�D���*}�3���o�%�X�Ci_+^�f��\��!�M��Z�$\9��Rk��K���{r I1J��`��#t��u@��©�{`���D�@��_�h]�	ؓ���nh���ˡ�А���
.$<n��{ܒ��kh�X�%M�ε�,e�߰�1B���x���&�8$&l��_De��k��J��a
Z�"Me0&�D��d>��~��G�j�:H
s>�?
�4��h]��*㿵s��\�1����Ö1.
4��L[ͧ�+\A̅�n��R��*�bTJn�n�����5]6{�E��X?�o���>8bA��ԙ��H�
���-��Q��&����d�jqIb�	@l�����ὙtfU�ʴJ4�7?��5����0�>
�<:�<�����O�5=������v}�Ƽ�Z*mk�P�%|�
��1M_�vejH��"�����wCJ����S�+!�=�N��N'��u�&:t�vқ߼��/��;���N�w�ǂ�i����y��*�t���ys�}�h�48kf84�h'lC�y	��fJ���`�ފ�s�ܟ2Y�������+�ޯ�q�� �eꓚM��T���ʁF6��=Ss{��O���z��^{�N}U7m׮�~|��=���k�Ι�f��D�?>�I��eS��]��t�7.<-0M�0�y�� joָV ~_���WP'�����^i�F���P(|T( (Z<�l��iF@���$������`�O��V\+��N{ަ[�x��=���Awn]- �D2����}��Ԛ\o��Y�aU*�2��$���g���^��*rM��}�l l�g��XO'Nw/��tX�f���r���]�|�i�%�x"H��U��(�k �ē�I"�1�s���`��C���-cOM~{���/�w?�����y�[ߚ:�<�ϧ{��T�A?c�<�<v���}�\��=����NR�?�5�ڀM�X���dw��h����G��=�I���BtTD��"
D�(Q �@D��"
D�(Q �@D��"
D�(Q �@D��"
D�(Q �@D��"
D�(Q �@D��"
D�(Q�7O���0�8�3W�    IEND�B`�
```

### `src/flows/fno/commodities/assets/silver.png`

```tsx
�PNG

   IHDR   �   �   �>a�   sRGB ���   xeXIfMM *           >       F(       �i       N      ,     ,    �       �       ��       �    �@k   	pHYs  .#  .#x�?v  &�IDATx�{�eW}��~��=�޹����93�k cb��&�Md7�!J@��Dn%D�J�J��J�?�)Q��:�RPU���Tr�R��`��̐�<���y��w?��Zk�s���{�t��{��o��[��o��c�}ƹ�544444444444444444444444444444444444444444444444444444444444444444444444��H^t�#C~�ޡ����X�ʍi���?��W������_*����nN�gUz������]U����)���-�$���$I��GKW>�����;���ci�����.����A}p�:V8w2M�۫�z�s�K]�n�^j�2��,+/�@Q!�4qW����EQM(p�r�,�}��+�G�~b8i�����e���t\���ܝDl����z4��AG8��Vj���A�(�LP܋L�"�Q���L/�RdP�_N+7���.�p&���{��c#O���G��w/��)7��x��C�_<='2�ŨC�.Nқo/}���F�f��գ�(/d�6�&� �
/��K"2d�҂�d�*7�U��@�Rn	Გ�Ȧygq��x���ҡG67.���w��gb}�����7����O�ݾ��ﻩ��O�Uv{�L_
�/�S0L�Nt� |o�N4}�Ilݣ競�(���:l���g@��ۓ����!�4k�����΂kw�U�ꈧ�,v\1Xw���z�\y���������^|�~�����c��c�����~y4�:n-�)����x�?���Ԭ��d��� �Na?�{����0=O�]D��!BҬ�Vϵ:}���v%��C7����%7X��v6W�pK��?U5u��pzn0�_�ޏ����c�)���s���_�̻ߕ���I���t�.��K��*K7���b��2l��p����ЕŘ��T���}����4��sq���z�dL��l/�܄�G�]3�e9vz���7@�C	{{�ɘ���2�:�	&�H���*wc�U��q�/�R����C�������?�t��rLh��.%�����;��\J�K�.��R��qT�b�,�t2 p&�R
$(�kB7�L$`sQ14fh��M�^؋���˲�:�hӍ�.#����V�h{����Gcz��9������M?x�|=R�V�I�`~�K�{>�����w.�)s��7�\��l�!���Xtg9����`n�K(Ċ�L)]���K�e��/F3�@`�R�
��sAS����K�.ʅo���ѝ�M%��n��h'�l/l	��=���L�^�QǢ�RE,B���kF}��D4=ܧۋF�i��,� �%��cz2�A�n�IV�[J�j#�����ޒk/� D��dw��-ϔBCE:�G�+�~���(=wLO�Yu;���\6s��b�2�G4&=��л%tuk�\
úyu�Xk|L����dR���}U q���O������r�i��R83����Ȇ�2� ?�g9W�e�0	����8tx�X���#�P�zwɘ����WM�c�=t0��6�6�O�����'�|t~-xIߛ� r�y�5�OܤH.�����蟝�/!�(,@9��b'����B���?Kkgs5|M���e!R��¥O�$�`�&��B`%:޼����n���n����d�[=�%7�ѫ���9GЬ0��Kd�Da[&X/M����v����T8�MPJ�m͢趒��d�s��׾8�k���������#����jz��aś	�j��L	0c��A�6c�+#_
�f9��v�n~��^��Z�;�ȟ����	[����mb���{���>nB�UюO��ĭ0|��طz��,K%�ҦQ�>�y���~���b�s��G����Nƣ�[Yu=�>�y ��!jq��zJW����O7��0>k�`Z0v�b��X%0�x�G=~�@1�*�hZ0�Ug�R ��9E1�����G,�������Ѡ�����X:3��Ye{�WЎ[��j��d�5��+A�_I�
a�K-��fY��LO��|�&na��&�,��5?���3�^رn_�TB�p��4�PBVn�Q΄�3����u�~�/��{�������nX_�[YR�
���Bv���-,lK3��d�?+ka�hH�,ݯ�ex�˰��%����CM�A����\�t���x�����!�"!=z��h��J��~��ꄯ}o��� eZ}  R8B���--��]���d�}�¦H$p+kD��5��@s	�O3�^?�r�G\��	�,T?q/8�׹aJb�>?Љ"��Ǡ�>��J�*~��p�� ��w�z{R�o���k3 ��XB1 �@L�Ľh$X�X϶�L�*g�*KPuqirgJPHxʠ%�H}��`"VB�)Ɋi%��R��4T�,mt�6��}�y�b��
�=�q��zF���}S�*�7�JN�HD=S������4s>n4!nDʙ�|ᐥ<�SS �� � r�֞��O�Z�λ��|6e�(�[�[j $�T������?:����|�c?~`Z��5	��T@@���L�>L�^B�)��фMP��A�*K\�/�Úx�� Va(��]�R~�j�S�X@~̥�+��%��pT��Ȭ��D�����W�{��E���ϴ�ꄖ~^�&:��ѕ���*�l��@g�j~HSU
���̴h�n6�(��sʫ���bINux�����O�F1Մ�+&?ę��7��_{����/tx���_�����_�\9@�rތ+) �^M<�F���`�l(LB��:��ꁞ%��a�@� �����o,��X(
���y�>��L����(L���w�+(d�ς�=��G�=W���^�T�M&S�bN�Hxa �K��]^n>�p���1,�@l���Pb7`�ǈ�j�5��c�HS��g�'� �R�1��**g4��8i�g��N�ɴz�o���xq�7n�����%��8	C`D����~�dX�	��E,��6�6��H�^�����=
ZM���*�� V�����BHWR]�"r�������dB�I^��b�������NqtA利�������o��j����ci������h�>X���7<�.�Cզ:|�P5���!�+ �8oT��-1ܔjN�G=��.2�&l#��粚�7W�\ŠG���h��)�*OJ��e�o������_]����=U����w����!8��&\B/o(�X)!��2��B7ˠޫ�B8]`Fa(ж1�ʒI	K5��y�Ҷ��������TotR�(�]��<K��Tˌ=�.�F7"�k���Ί��+\�U�\�J��q������t�C�Td���T��Γ���G�7��LҊ�\�I,{H�F��敯ِ�����X�ҼBH�ߔF=��"@/�,���Y)�����Ȓ|Y�����9�D(�'3~���p)����
��]'�V5,�Ѹ�nO�L׫��Wɟ�;�g�r��^�O.���w/�j͞�'?~��������8<����l�a�v�RƐ:̂Y��������ڔ@ʣ?�����?|mg�y9v�6lN�������	G���K�.O�J�e��D*��e���˧.�Q+-\7E��9Y4�.����&�R�.������?��W~��o�uL>M�G���=�@�����X�:��i1x[2-~&�L�-6C��Kf9k%�I_Q�&G�������BH���i��~�0�K��l ��u���xW�2�|��/p��G�Gߗ��M5L�Q�N?c i�m��k-N
���monu�r7;n�Xv�֊������V�n�z�4i��v��n�g�<{���/���CB���9������_��_�<����th)�_W�Ս��<�$�8A�f�>�W;��BU�9'�� �mn���7ٸ���Z��$+˥[Z�\g��{Um7�`-�#�B�����B���>�S�kx9r�	28H}���C�� M�k7؋��x��t�Y��9K��N'��.� �����=3r���s��3�Yt]�5�:��~�-�R��>s�n�c�y��owZI���C��T���2Iw8�|�}����X6?:]|�o��G����kV��z ����.c��h�}j2��k���Xf��'ڮa��6�Y����"\���c7L��p���G��ޙ�;����''7��Ύ;~�t7���c�"�Aյ��@���)�X"l}�iJ ˡ<��C7�ȑ��)��G��	��({�,�+L�2H��ؤ�q�U�\�Q����[�0t�>;r_?S��W*���r�ܺ�[Dq;n�#h�(�9��1����8��Ł�$mqL��>0��i^�H�� ����*Nݘ�Oq��n��P1���M����Yp���� ��{I���O�v�>�°"n�_o�y��X�=f����������,a �=}�_rzw��������k:v�ϻ����S��p���PG�o�n�G8����^ϕ 9a�5Ūh�Q�&���Љb���d���y�+nk}�zv0 e����+׌��Z&�m�u�_�+�ncu�67+�3�J�����^�u�����M�0�+��r3�q����aLx��ZeH�����|~1�S^L-t�eJ_�",�V[k���s���O���j���=)���ox�B?�/)g���]O��t鴮���l?����v���H�W7�R9�t��EB�Ý��\q��n����]~�{�K��O݀ё��S�����m�=�s����,�Q�.���Sǁ#S����"=��)��o��M\�з���Ό��x�n�Ҷ�ra�\����a��U0E�a�2y'q+�u�����-���[osG�ǎ�]��&�|�D7��� P�R���-ԓ�0��R�<�L�(���<֕.'��A�w���/^��i����M`Pу�Zbder�/���	VZ\�ym���E�7u�V��-]w�-_�ykX$���[���̐2B�EKff߃�	���yΪK�]�m�a�-�;�|�'�@�
��x���36����k���-w�/v��#�ve⶷�X"��9���{$�H�Ő�f�����d��Ԇ�c�۾d�#蛄�Ջ�q	T�Q.�6 ���1	Xq����qe�&�
���p��^r~�Z�x�
�鏼�6��1$����"��fb,3���[�A��QI� ��𶮷r#�MV:G�%EI�0F���3����-��n�f"�̌?g"ɘ|�뺇1��N����ķ��S�nsu�6��n{k�.�W��(X8A�:Qb��dE���&��*yr�N�ͳP�]�x���	_�O=]��, �U�K��(hUI\���Ek�32)�������W������k�)�kV W��n�nq��������- ag�%y�"��^�sz���i�c��X���~���I\�ϼ�|��ż�Y��b���"���	�s��ɟ�'�gHHJx�^�P��[�=���/~�x�0	�st��ՕK�ɸ�_Ѓ�9�3,I�$��GS 1 e���E�N�XXzs��2�/�B��bޤ��,=B��,���8�-HoZ*�������]�|�7�3�8��:Ј)��/AG-����C�.�-n�0X�0���'c��z'�@��O�?��{�Lr�:1�Ƀ�s3�����qޤd�j�����
����;L�/3�0o#�ؗSLq�.˳�}��@U�l��z>B�"O�pE���z	_���n�YU>�'�<=w�.�'RF����F��j�5)@�����������C����AA�S$Y|�Hf�7�!U���ղC�_�ޔO��D��z��`׭FS�R�g�S�&�$Hq�'G<�B���&b��&�,E/`�`�Zh䢧�_��N�)��H�0���J���ټ�V;� 	wv	 o��au�F���ȃ�V��C�	Q������v�K����?�bW�M���,1_r�&@�H7q��P���,B�&�=59����N�q�>��~��I"�����aƞ�&[��u��;� $.��Jd���sL`��RU��h���ui�y[��z����_~P��%�U'�W;,,�����.rv�|����b����Z�T���z1a/��S+t7k�UлO���c���	�̿��\Y��$��f���>�R���͒�KÀL�� ))�̱G��g�\a""?��-�.m��b�/v������wH�;s�����6-;��VX.M��H%xP���(�^bً,�+����r~�G{L�T��\�V��-5ެ�"A�uQ��v�&K�{>q����rWm����`3)6@DB4�r{�'~�I�q5���Pe�4�<)��h�\�v�E���W:��3�Yf�U�u;�5
�JMb%���"�z(�������?)�����u�pǝ9�\`���\���l3��k��(����ˇH9���a�O��c�E �@Ũc`NV!X���Q�F}�,��X�y���l<��#$�qH~^�U)��ӧ18��]��z��d�y��0+F���o�pAq�) Z���7�s%��	
��AX��1YK�:P"���\@��^=�z��i���@� ��<#��^�R6)���W��X:����m��g���6���;/�/0%`/�+�a ���<0fXɛ��X��eC�£1!�ʇ*<���	�v�uGa�	�Jh��ww��~b�!f��M,Y�����	Ba��-4A~L���JS��ŕ'+`y%
�2�$��%�0��K�؜�~������ �t��s�E��Z��+g��a�����؀�sVy���?�D>�T�%sR�#k ����E�^P��z�l�@}�j
jBW%^�5>�bpY�����kI���Rt4$%V�~��z�u���*P�/0w&�ؕ��[s?�)r-3to�D�����X�A�b��Q%]��7a�N=B`f]�.��z�����,uբ�zk���گ~�s��SH)�2kD�)LBm[�GQ�Ņ�[������ �����6��t�B��VpN\�S%��ȒY,�(qџיJ�	ݣ�YL��EG���
)U���al�ۡ�w��sz��$���������_x�%.���X͞1��~���y+��X���AR -�L��v7�� z�&����UФPq���d��Ö�2��̌^��`���a��9&\if��/��cl���@�|@���𹺺�(�,����Ӑ%�= ��  ij_t
�uUH��(��y�N��u! �'�N�>y�����Y��m67ݏ��m�kqe�RQ �������\@A��;h-N	�Etb��� ���[q��oK�A�6㇢��J��%[�i$s�L��Y}�!%p�n���"��3	�;�6<X�Q�~����7��W��$b�h�����uQ���H��:q(�V�0��¿q�X(pjqQD�x�[��v��X9Ȁ��I�ڝ�{�N?o�q{����n#�g�Q��]�<ߘ]�{b_��u��|L���l @��y�&h� zè�fbmn W2�!�vE�Sδ05,輀�����^�h��g����uG[��A�Mi�d���PW@�m�@KC���,�ߵT۴	$�B����C��3�A���W��l��\�(&/7�_��>G�y)�����Ƽ�D���6m|�&'k l�/p��I�e�J�2F�����}\J@ ?���I��U�d��?/x{�Ns���|.�L)�?�)���τ�Ձ/e0�@�
x��n�E/tT�?t���2��q࣭�	e�&�~��󑯞M�6��c��sW��IT��3"a L�T_�\t�`�mg�'���?�N(<�{^
P�F���
���W3��L*���Ê�d�{ᲀ3RO�4_F�Vf� ����@K?�+s���-��=��_�L�W:ż�e�@��>�}cNp
�2������}ߕ� ��R�)�P�3Y�¤���$(QN>�<q*i�oC��z�{�kW.�P��S�l�M���!�
p��󲚾S��Tn�?�KO��~�+��f6ʲ�2c0�-Ku�y�/�ӵD�)!9�~3�HQo%`S���R&���7��.���Q	��B� ���\�r�aρ�g~��-,p��d�[�7�CG�r����2����5�!E�;��Y�N����"�0�����4�w��y~c��
���� �������2�� �.%�L��6�{��bxΏ���E(�EZ	��g\5��Hp/(!�L�*XB��<�1����!��U�@Ҕ��69o;��O[�߹EN!u0��_`�_�����̺~�**��=sϕ���ߢ`�Mг����&̥����[�r���,A��>��[}�3�i�s�b�Όo��T�8	& Y�"ó4�+�s��Xө�5�&D#�,@����CpH�謾PE���j�o��#xYP�{Rߋ�B#���-'r���/й�KL�P ��m���Ca~�XO��m�D�}�eD��<-�jTT`B���,���	���J����U>q��7������2�v��;�ࡺH�I���!"�@�5�[X�GH�փ��>M���2z��K�?i�Ϥ�C�3Dgϧ�a.b� 
,�S��6��j���:W`ix�'�-�d��&��C�}�X����Nʉ2iρ��@�?q�$� ��!F��RS����U���WR�F@޳D������]0�̎���n��������Vx�ӂ3K@ܷ ��VI)�f�ĺ|���$�ǱZ�څK��������=������_Tg�'z�;��qQ���a��=��N�l(���b�6���k���2�M��9��ae֧�i������sv֯�q:p[W.���9 ܘ6�,��س���ĊH�%"�-���s��L጖|��Q�Ln%�1�x�۳*�ʑ���J���V�<�Ѵռ�\L�>�V��(}ɹ�u�6.s�\�p��в����*�Z:�2c\aTE�Q]�?)��z���#8�9�]N���%wy��z+�W�9J�Z5,u��2?`��xV�7Ϡ�b�v8�N�a���\(���Q��a{k4��(���Y�u�Y \����7�
v���e��� �=J��:HXG2���vƓ��hZfV�r*kok-��^wYQ벤P�nzB���HӋ�� >:$�h!��	���]K�$��*��@��M�&w�!��.2	\c�EE�v�>���5�tX����v;[�[�fʓ.��e���o���Z:����R���aa�أ��!ƙB��*+ٚB���4ܸS�@�T
sl��-�""	d ί��n������'�O�gt�s:�#E>�_���d{4M:�2�f��=�?I[�2�'�4�'���:�� �Ov�|���g9����y�2i%-���|@#�/�,�>?�/����s&��׶����gh�}g�[)���4k4��x������S,�,��F̈́Y�7K�I� ��A
�)_+���+M;`�oV�t�+�x��<Pw��������G'-���2u�٤�*�����ȍF<��P�)�؜ȗ�:��?�ȇ/��L��3���i9��mx�h�*�Jq&�U���Pʍ���M��vVM�Y��N�������OzP��j"�� �HS�5o:�    IEND�B`�
```

### `src/flows/fno/commodities/components/Commodities.module.css`

```css
/* Commodities tab, contract picker and Lot summary — flow-only pieces on L3 tokens. */
/* Commodity shortcut (Figma 6754:63662): a 52 white circle, light outline, faint glow, 32 art — overrides the L3 Tertiary
   button's size, shape and icon slot on purpose (same exception as the F&O ribbon tabs). */
.shortcut.shortcut { width: var(--app-size-commodity-shortcut); height: var(--app-size-commodity-shortcut); min-width: var(--app-size-commodity-shortcut); padding: 0; --btn-radius: var(--l3-radius-full); --btn-surface: var(--l3-surface-primary); --btn-border: var(--l3-border-light); filter: drop-shadow(0 0 var(--l3-spacing-16) var(--app-commodity-shortcut-glow)); }
.shortcut.shortcut > span { width: var(--l3-size-32); height: var(--l3-size-32); }
.shortcutArt { display: block; width: var(--l3-size-32); height: var(--l3-size-32); object-fit: contain; }
.change { font: var(--l3-text-label-10); }
.meta { font: var(--l3-text-label-12); color: var(--l3-content-tertiary); white-space: nowrap; }
.pillDivider { flex: none; align-self: stretch; width: 1px; background: var(--l3-border-light); }

/* Contract picker */
.chipArt { display: block; width: var(--l3-size-16); height: var(--l3-size-16); object-fit: contain; }
.rowArt { display: block; width: var(--l3-size-20); height: var(--l3-size-20); object-fit: contain; }
.groupLabel { font: var(--l3-text-heading-12); }
.group { overflow: hidden; border: 1px solid var(--l3-border-light); border-radius: var(--l3-radius-12); }
.chips { padding: var(--l3-spacing-16); }
/* The chips row already brings 16 above the list. */
.pickerBody { padding: 0 var(--l3-spacing-16) var(--l3-spacing-16); }
.pickerBody.equity { padding-top: var(--l3-spacing-16); }

/* Lot summary */
.tabArt { display: block; width: var(--l3-size-16); height: var(--l3-size-16); object-fit: contain; }
.lotBody { padding-block: var(--l3-spacing-24) var(--l3-spacing-32); }
/* ILLIQUID tag on a card: its own tap target (explains illiquid) inside the card's button. */
.tagTap { position: relative; display: inline-flex; cursor: pointer; }
.tagTap::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-12)) calc(-1 * var(--l3-spacing-04)); }
```

### `src/flows/fno/commodities/components/CommoditiesFeed.tsx`

```tsx
import { Stack } from '@l3/components/Stack'
import { ContractSection, type Choose } from '../../components/ContractSection'
import { Watchlists } from '../../components/Discovery'
import { TradingChart } from '../../components/TradingChart'
import type { Contract, Watchlist } from '../../data'
import { t } from '../../copy'
import { smartFutures, type Commodity } from '../data'
import { CommodityHeatmap } from './CommodityHeatmap'
import { CommodityShortcuts } from './CommodityShortcuts'
import { PopularCommodities } from './PopularCommodities'
import parts from '../../components/HomeParts.module.css'

type Props = {
  /** The contract the chart shows ("Gold"); its selector opens the contract picker. */
  instrument: string
  lists: Watchlist[]
  onCommodity: (commodity: Commodity) => void
  onPicker: () => void
  onChoose: Choose
  onContract: (contract: Contract) => void
  onDestination: (name: string) => void
  onAddWatchlist: () => void
  onChain: () => void
  onScalper: () => void
}

/** The Commodities tab of F&O home (Figma 6754:63637), under the shared header, P&L, indices and product tabs. */
export function CommoditiesFeed({ instrument, lists, onCommodity, onPicker, onChoose, onContract, onDestination, onAddWatchlist, onChain, onScalper }: Props) {
  return <Stack gap="32" className={parts.feed}>
    <CommodityShortcuts onOpen={onCommodity} />
    <TradingChart instrument={instrument} onInstrument={onPicker} onChoose={onChoose} onDestination={onDestination} onChain={onChain} onScalper={onScalper} />
    <div className={parts.divider} />
    <div data-fno="watchlists"><Watchlists lists={lists} onAdd={onAddWatchlist} onOpen={onDestination} /></div>
    <div data-fno="options"><PopularCommodities onChoose={onChoose} onContract={onContract} onViewAll={() => onDestination(t('commodities.popular'))} /></div>
    <div data-fno="heatmap"><CommodityHeatmap onOpen={onDestination} onViewAll={() => onDestination(t('heatmap.title'))} /></div>
    <div data-fno="futures"><ContractSection kind="futures" contracts={smartFutures} onChoose={onChoose} onContract={onContract} onViewAll={() => onDestination(t('futures.title'))} /></div>
  </Stack>
}
```

### `src/flows/fno/commodities/components/CommodityHeatmap.tsx`

```tsx
import { useState } from 'react'
import { Card } from '@l3/components/Card'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Tabs } from '@l3/components/Tabs'
import { t } from '../../copy'
import { heatmapGroups } from '../data'
import parts from '../../components/HomeParts.module.css'

type Group = keyof typeof heatmapGroups

/** Futures Heatmap on the Commodities tab: Bullion / Energy / Metals pills (no Stock ⇕ Index switch) over the 3-column tiles. */
export function CommodityHeatmap({ onOpen, onViewAll }: { onOpen: (name: string) => void; onViewAll: () => void }) {
  const [group, setGroup] = useState<Group>('bullion')
  return <section className={parts.heatmapSection} aria-label={t('heatmap.title')}>
    <div className={parts.inset}><SectionHeader title={t('heatmap.title')} action={{ type: 'view-all', label: t('viewAll'), onClick: onViewAll }} /></div>
    <div className={parts.heatmapRow}><Tabs appearance="pill" size="sm" aria-label={t('heatmap.title')} value={group} onChange={setGroup} items={(['bullion', 'energy', 'metals'] as const).map((value) => ({ value, label: t(`heatmap.${value}`) }))} /></div>
    <div className={parts.heatmap}>{heatmapGroups[group].map((cell) => <Card variant="flat" key={cell.id} className={[parts.heatCell, cell.tone === 'up' ? parts.heatUp : parts.heatDown].join(' ')} onClick={() => onOpen(cell.name)}>
      <span className={parts.heatName}>{cell.name}</span><span><strong>{cell.change.toFixed(2)}%</strong><span className={parts.heatPrice}>{cell.price}</span></span>
    </Card>)}</div>
  </section>
}
```

### `src/flows/fno/commodities/components/CommodityShortcuts.tsx`

```tsx
import { Button } from '@l3/components/Button'
import { Stack } from '@l3/components/Stack'
import { t } from '../../copy'
import { commodities, type Commodity } from '../data'
import parts from '../../components/HomeParts.module.css'
import styles from './Commodities.module.css'

/** Gold · Silver · Crude Oil · Natural Gas: artwork in a round Tertiary button, the name and the day's change under it. */
export function CommodityShortcuts({ onOpen }: { onOpen: (commodity: Commodity) => void }) {
  return <div className={parts.shortcuts} role="list" aria-label={t('commodities.shortcuts')}>{commodities.map((commodity) => <Stack key={commodity.id} gap="08" align="center" role="listitem">
    <Button variant="tertiary" size="lg" className={styles.shortcut} aria-label={commodity.name} iconLeft={<img className={styles.shortcutArt} src={commodity.image} alt="" />} onClick={() => onOpen(commodity)} />
    <Stack gap="04" align="center">
      <span className={parts.secondaryLabel}>{commodity.name}</span>
      <span className={[styles.change, commodity.change < 0 ? parts.down : parts.up].join(' ')}>{commodity.change > 0 ? '+' : ''}{commodity.change.toFixed(2)}%</span>
    </Stack>
  </Stack>)}</div>
}
```

### `src/flows/fno/commodities/components/PopularCommodities.tsx`

```tsx
import { useState } from 'react'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tab, Tabs } from '@l3/components/Tabs'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { msFilterList } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import type { Choose } from '../../components/ContractSection'
import { t } from '../../copy'
import { popularFutures, popularOptions, type CommodityContract } from '../data'
import parts from '../../components/HomeParts.module.css'
import styles from './Commodities.module.css'

/**
 * Popular commodities: Options ⇕ Futures switch, category pills, Filter + sort, contract cards. A future's card shows
 * price and change on one line with its margin per lot under it.
 */
export function PopularCommodities({ onChoose, onContract, onViewAll }: { onChoose: Choose; onContract: (contract: CommodityContract) => void; onViewAll: () => void }) {
  const [futures, setFutures] = useState(false)
  const [category, setCategory] = useState('top')
  const [volume, setVolume] = useState(false)
  const [filter, setFilter] = useState(t('filter.all'))
  const categories = (['top', 'gainers', 'losers', 'advanced'] as const).map((value) => ({ value, label: t(`commodities.${value}`) }))
  const source = futures ? popularFutures : popularOptions
  const filterChoices = [t('filter.all'), t('filter.gainers'), t('filter.losers')]
  const matching = source.filter((c) => filter === t('filter.gainers') ? c.change > 0 : filter === t('filter.losers') ? c.change < 0 : true)
  const offset = categories.findIndex((c) => c.value === category)
  const ordered = category === 'top' ? matching : [...matching.slice(offset), ...matching.slice(0, offset)]
  const rows = volume ? [...ordered].sort((a, b) => b.volume - a.volume) : ordered
  return <section className={parts.contractSection} aria-label={t('commodities.popular')}>
    <SectionHeader title={t('commodities.popular')} action={{ type: 'view-all', label: t('viewAll'), onClick: onViewAll }} />
    <Stack direction="horizontal" gap="08" align="center" className={parts.filterRow}>
      <Tab appearance="pill" size="sm" emphasis="secondary" action iconRight={<Icon icon={lmSwitchArrowVertical} size={12} />} onClick={() => setFutures(!futures)} aria-label={t('commodities.segment')}>{t(futures ? 'commodities.futures' : 'commodities.options')}</Tab>
      <span className={styles.pillDivider} aria-hidden />
      <Tabs aria-label={t('commodities.popular')} appearance="pill" size="sm" items={categories} value={category} onChange={setCategory} />
    </Stack>
    <Stack direction="horizontal" align="center" justify="between">
      <Button variant="ghost" size="sm" iconLeft={<Icon icon={msFilterList} size={12} />} onClick={() => onChoose(t('filter'), filterChoices, filter, setFilter)}>{filter === t('filter.all') ? t('filter') : filter}</Button>
      <Select size="sm" aria-label={t('sort.label')} onClick={() => setVolume(!volume)}>{t(volume ? 'sort.volume' : 'sort.price')}</Select>
    </Stack>
    <Stack gap="12">{rows.map((contract) => <Card key={contract.id} onClick={() => onContract(contract)}>
      <Stack direction="horizontal" gap="08" justify="between" align="center">
        <Stack gap="04" className={parts.grow}><p className={parts.heading}>{contract.name}</p><p className={parts.description}>{contract.description}</p></Stack>
        {contract.margin
          ? <Stack gap="04" align="end"><Stack direction="horizontal" gap="04" align="center"><p className={parts.heading}>{volume ? contract.volume.toLocaleString('en-IN') : inr(contract.price, 2)}</p><PriceChange value={contract.change} unit="percent" size="md" arrow /></Stack><p className={styles.meta}>{t('commodities.margin', { margin: contract.margin })}</p></Stack>
          : <Stack gap="04" align="end"><p className={parts.heading}>{volume ? contract.volume.toLocaleString('en-IN') : inr(contract.price, 2)}</p><PriceChange value={contract.change} unit="percent" size="sm" arrow /></Stack>}
      </Stack>
    </Card>)}</Stack>
  </section>
}
```

### `src/flows/fno/commodities/data.ts`

```ts
import type { Contract } from '../data'
import gold from './assets/gold.png'
import silver from './assets/silver.png'
import crudeOil from './assets/crude-oil.png'
import naturalGas from './assets/natural-gas.png'
import goldMini from './assets/gold-mini.png'
import goldDefault from './assets/gold-default.png'
import goldGuinea from './assets/gold-guinea.png'
import goldPetal from './assets/gold-petal.png'
import goldTen from './assets/gold-ten.png'

/** Snapshot examples from Figma 6754:63073 (F&O Home → Commodities); these are not live quotes. */

/** The four commodity shortcuts under the product tabs. `change` is the day's percent change. */
export type Commodity = { id: string; name: string; change: number; image: string }
export const commodities: Commodity[] = [
  { id: 'gold', name: 'Gold', change: -5.17, image: gold },
  { id: 'silver', name: 'Silver', change: 1.58, image: silver },
  { id: 'crude', name: 'Crude Oil', change: 4.12, image: crudeOil },
  { id: 'gas', name: 'Natural Gas', change: 2.43, image: naturalGas },
]

/** Popular commodities. Options shows the Figma frame's rows as drawn (one future among the calls); `margin` is the margin per lot. */
export type CommodityContract = Contract & { margin?: string }
export const popularOptions: CommodityContract[] = [
  { id: 'pop-0', name: 'GOLD 19400 CE', description: 'Call | 14 Jan 26', price: 417, change: 0.1, volume: 23843233, side: 'call' },
  { id: 'pop-1', name: 'GOLD FUT', description: 'Future | 14 Jan 26', price: 417, change: 0.1, volume: 21102400, margin: '1,65,450.23' },
  { id: 'pop-2', name: 'GOLD 19400 CE', description: 'Call | 14 Jan 26', price: 417, change: 0.1, volume: 19640000, side: 'call' },
  { id: 'pop-3', name: 'GOLD 19400 CE', description: 'Call | 14 Jan 26', price: 417, change: 0.1, volume: 17220500, side: 'call' },
]
export const popularFutures: CommodityContract[] = ['GOLD FUT', 'SILVER FUT', 'CRUDEOIL FUT', 'NATURALGAS FUT'].map((name, i) => ({ id: `popf-${i}`, name, description: 'Future | 14 Jan 26', price: 417, change: 0.1, volume: 21102400 - i * 1800000, margin: '1,65,450.23' }))

/** Smart Futures on the Commodities tab. */
export const smartFutures: Contract[] = Array.from({ length: 4 }, (_, i) => ({ id: `cfut-${i}`, name: 'GOLD 19400 CE', description: 'Call | 14 Jan 26', price: 417, change: 0.1, volume: 15400 + i * 1900, side: 'call' }))

/** Futures Heatmap tiles per group. Up / down colour follows each tile's tone, as in the frame. */
export type HeatTile = { id: string; name: string; change: number; price: string; tone: 'up' | 'down' }
const tile = (name: string, i: number): HeatTile => ({ id: `${name}-${i}`, name, change: -0.27, price: '2,817.40', tone: i % 2 ? 'up' : 'down' })
export const heatmapGroups: Record<'bullion' | 'energy' | 'metals', HeatTile[]> = {
  bullion: ['GOLD MINI', 'GOLD MICRO', 'GOLD', 'SILVER MINI', 'ZINC', 'SILVER MICRO', 'SILVER', 'ZINC MACRO', 'ZINC LARGE'].map(tile),
  energy: ['CRUDEOIL', 'CRUDEOIL MINI', 'NATURALGAS', 'NATGAS MINI', 'CRUDEOIL', 'NATURALGAS'].map(tile),
  metals: ['COPPER', 'ALUMINIUM', 'ZINC', 'LEAD', 'NICKEL', 'ALUMINI'].map(tile),
}

/** The contract picker ("Choose options contract"): Equity indices, and Commodities grouped by commodity. */
export type PickerContract = { id: string; name: string; price: string; change: number; image?: string; tag?: string }
export const equityContracts: PickerContract[] = ['NIFTY 50', 'BSE Sensex', 'Nifty Bank', 'Nifty Financial Services', 'Nifty Midcap Select', 'BSE BANKEX', 'Nifty Next 50', 'BSE Sensex 50'].map((name) => ({ id: name, name, price: '₹1,42,557.00', change: -0.68 }))
export type CommodityGroup = { id: string; name: string; image?: string; contracts: PickerContract[] }
const contract = (name: string, image?: string, tag?: string): PickerContract => ({ id: name, name, price: '₹1,42,557.00', change: 0.68, image, tag })
export const commodityGroups: CommodityGroup[] = [
  { id: 'gold', name: 'Gold', image: gold, contracts: [contract('Gold Mini', goldMini, 'Lowest Margin'), contract('Gold', goldDefault), contract('Gold Guinea', goldGuinea), contract('Gold Petal', goldPetal), contract('Gold Ten', goldTen)] },
  { id: 'silver', name: 'Silver', image: silver, contracts: ['SILVER', 'SILVER100', 'SILVERM', 'SILVERMIC'].map((n) => contract(n, silver)) },
  { id: 'crude', name: 'Crude Oil', image: crudeOil, contracts: ['CRUDEOIL', 'CRUDEOILM'].map((n) => contract(n, crudeOil)) },
  { id: 'gas', name: 'Natural Gas', image: naturalGas, contracts: ['NATURALGAS', 'NATGASMINI'].map((n) => contract(n, naturalGas)) },
  { id: 'copper', name: 'Copper', contracts: [contract('COPPER')] },
  { id: 'aluminium', name: 'Aluminium', contracts: [contract('ALUMINIUM'), contract('ALUMINI')] },
  { id: 'zinc', name: 'Zinc', contracts: [contract('ZINC'), contract('ZINCMINI')] },
]

/** Lot summary (Gold Summary): one tab per gold lot, its futures and its option contracts. */
export const goldLots = [
  { id: 'gold', name: 'Gold', image: goldDefault },
  { id: 'mini', name: 'Gold Mini', image: goldMini },
  { id: 'guinea', name: 'Gold Guinea', image: goldGuinea },
  { id: 'ten', name: 'Gold Ten', image: goldTen },
  { id: 'petal', name: 'Gold Petal', image: goldPetal },
]
export const lotFutures: Contract[] = [
  { id: 'lf-0', name: 'Gold', description: 'Fut | 5 Oct', price: 417, change: 0.1, volume: 0 },
  { id: 'lf-1', name: 'Gold', description: 'Fut | 5 Dec', price: 417, change: 0.1, volume: 0 },
]
export type LotOption = Contract & { marginPerLot: number; /** Too few trades: Buy / Sell are blocked (commodities only). */ illiquid?: boolean }
export const lotOptions: LotOption[] = [
  ...Array.from({ length: 5 }, (_, i): LotOption => ({ id: `lo-${i}`, name: 'GOLD 19400 CE', description: 'Call | 5 Oct 26', price: 417, change: 0.1, volume: 23843233, marginPerLot: 23345, side: 'call' })),
  // A far out-of-the-money strike nobody trades: illiquid.
  { id: 'lo-5', name: 'GOLD 24000 CE', description: 'Call | 5 Oct 26', price: 3, change: -25, volume: 4, marginPerLot: 300, side: 'call', illiquid: true },
]
export const expiryMonths = ['October', 'November', 'December']
export type LotSort = 'price' | 'volume' | 'margin'

/**
 * A commodity contract's asset page (Figma 6754:61613, Gold MINI 5 OCT Fut). Prices in ₹. `illiquid` (commodities
 * only): the page shows the ILLIQUID tag and Buy / Sell are disabled.
 */
export type AssetPage = {
  name: string
  /** Expiry + type, e.g. "5 OCT Fut". */
  contract: string
  image?: string
  price: number
  change: number
  illiquid?: boolean
  daysToExpiry: number
  margin: string
  leverage: string
  priceUnit: string
  notice: string
  futures: { id: string; name: string; date: string; price: number; change: number }[]
  low: number
  high: number
  prevClose: number
  open: number
  upperCircuit: number
  lowerCircuit: number
  tickSize: string
  unit: string
  lotSize: number
  minLot: number
  lastQty: number
  lastTime: string
  expiryDate: string
  lastTradingDate: string
  bids: { price: string; qty: number }[]
  asks: { price: string; qty: number }[]
  bidTotal: number
  askTotal: number
}
export const goldMiniAsset: AssetPage = {
  name: 'Gold MINI', contract: '5 OCT Fut', image: gold, price: 159000, change: -0.22,
  daysToExpiry: 41, margin: '10.84% / 10.84%', leverage: '9.22X / 9.22X', priceUnit: 'Per 10 gram', notice: 'Tender margin period starts 30 Sept',
  futures: [
    { id: 'dec', name: 'Gold 5 DEC Fut', date: '05 Dec 2026', price: 153580, change: 2.16 },
    { id: 'feb', name: 'GOLD 5 FEB FUT', date: '05 Feb 2027', price: 156580, change: -0.12 },
  ],
  low: 157000, high: 160000, prevClose: 158000, open: 157000, upperCircuit: 162000, lowerCircuit: 152000, tickSize: '0.05', unit: '10 grams',
  lotSize: 100, minLot: 1, lastQty: 1, lastTime: '2026-10-29 12:16:42', expiryDate: '2026-10-05', lastTradingDate: '2026-10-05',
  bids: [{ price: '1,58,000', qty: 1 }, { price: '1,57,000', qty: 2 }, { price: '1,56,000', qty: 3 }, { price: '1,55,000', qty: 3 }, { price: '1,54,500', qty: 900 }],
  asks: [{ price: '1,59,000', qty: 1 }, { price: '1,60,000', qty: 2 }, { price: '1,61,000', qty: 3 }, { price: '1,62,000', qty: 4 }, { price: '1,62,500', qty: 15007 }],
  bidTotal: 11003, askTotal: 36367,
}
/** The same page for an illiquid commodity contract (Gold Petal, far month): few trades, wide spread. */
export const illiquidAsset: AssetPage = {
  ...goldMiniAsset, name: 'Gold PETAL', contract: '5 FEB Fut', image: goldPetal, price: 15880, change: 0, illiquid: true,
  low: 15880, high: 15880, prevClose: 15880, open: 15880, lastQty: 1, lastTime: '2026-10-27 15:02:11',
  bids: [{ price: '15,420', qty: 1 }], asks: [{ price: '16,390', qty: 1 }], bidTotal: 1, askTotal: 1,
}

/** Gold MINI intraday 5-minute candles for the asset page chart (illustrative). */
const assetCloses = [159600, 159420, 159510, 159380, 159450, 159300, 159200, 158400, 157900, 157600, 157750, 157500, 157400, 157650, 157900, 157800, 157700, 158000, 157600, 157300, 157900, 158300, 158100, 158200, 157900, 157700, 157600, 157500]
export const assetCandles = assetCloses.map((close, i) => {
  const open = i ? assetCloses[i - 1] : close + 120
  return { open, close, high: Math.max(open, close) + 90 + (i % 3) * 40, low: Math.min(open, close) - 80 - (i % 4) * 30, volume: 20 + ((i * 37) % 60) }
})
```

### `src/flows/fno/commodities/screens/AssetPage.module.css`

```css
/* No line under the Actionbar until the page scrolls (then L3's elevated state brings line + shadow). */
.bar:not([data-elevated]) { box-shadow: none; }

/* Commodity asset page (Figma 6754:61613) — flow-only layout on L3 tokens. Panels are the design's grey info boxes. */
.page { padding-block: var(--l3-spacing-08) var(--l3-spacing-32); }
.inset { padding-inline: var(--l3-spacing-16); }
.grow { flex: 1; min-width: 0; }
.head { display: flex; align-items: center; gap: var(--l3-spacing-12); padding-inline: var(--l3-spacing-16); }
.name { margin: 0; font: var(--l3-text-heading-16); }
.contract { font: var(--l3-text-label-14); color: var(--l3-content-tertiary); white-space: nowrap; }
.price { font: var(--l3-text-heading-24); white-space: nowrap; }
.art { flex: none; width: var(--l3-size-48); height: var(--l3-size-48); object-fit: contain; }
.chart { display: flex; flex-direction: column; height: var(--app-size-asset-chart); }
.chart > * { flex: 1; min-height: 0; }

/* Chart tools: icon over label, five across. */
.tools { display: grid; grid-template-columns: repeat(5, 1fr); padding-inline: var(--l3-spacing-08); }
.tool { display: flex; flex-direction: column; align-items: center; gap: var(--l3-spacing-04); min-height: var(--l3-size-48); padding: var(--l3-spacing-04) 0; border: 0; background: none; color: var(--l3-content-primary); font: var(--l3-text-label-10); cursor: pointer; }
.tool span:last-child { color: var(--l3-content-secondary); }
.interval { font: var(--l3-text-heading-14); line-height: var(--l3-size-20); }

/* Option chain · ScalpPro (Figma 6754:62688): two equal Secondary buttons, 40 tall, light outline. ScalpPro is disabled for an illiquid contract. */
.chartActions { display: grid; grid-template-columns: 1fr 1fr; gap: var(--l3-spacing-12); padding-inline: var(--l3-spacing-16); }
.chartAction.chartAction:not(:disabled) { --btn-border: var(--l3-border-light); }
/* Disabled ScalpPro (illiquid): an invisible tap layer over it opens the illiquid tooltip (same as the option chain's). */
.scalpWrap { position: relative; display: grid; }
.scalpTip.scalpTip { position: absolute; inset: 0; display: block; }
.scalpTap { display: block; width: 100%; height: 100%; padding: 0; border: 0; background: none; cursor: pointer; }
.tip { display: inline-flex; align-items: center; gap: var(--l3-spacing-12); white-space: nowrap; }
.tipText { display: flex; flex-direction: column; gap: var(--l3-spacing-02); text-align: left; }
.tipTitle { font: var(--l3-text-label-12); color: var(--l3-content-inverted); }
.tipSub { font: var(--l3-text-description-12); color: var(--l3-content-inverted-secondary); }
.tipInfo { position: relative; margin-right: calc(-1 * var(--l3-spacing-04)); display: inline-grid; place-items: center; width: var(--l3-size-16); height: var(--l3-size-16); padding: 0; border: 0; background: none; color: inherit; cursor: pointer; }
.tipInfo::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-08)); }
.scalpTip [role='tooltip'][data-ready] { animation: asset-tip-in var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) both; transform-origin: var(--tt-arrow) 100%; }
@keyframes asset-tip-in { from { opacity: 0; scale: 0.9; translate: 0 var(--l3-spacing-04); } }
@media (prefers-reduced-motion: reduce) { .scalpTip [role='tooltip'][data-ready] { animation: none; } }
.scalpIcon { display: inline-flex; width: var(--l3-size-20); height: var(--l3-size-20); }

.section { display: flex; flex-direction: column; gap: var(--l3-spacing-16); padding-inline: var(--l3-spacing-16); }
.sectionRail { display: flex; flex-direction: column; gap: var(--l3-spacing-16); }
.panel { display: flex; flex-direction: column; gap: var(--l3-spacing-12); padding: var(--l3-spacing-16) var(--l3-spacing-12); border-radius: var(--l3-radius-16); background: var(--l3-surface-secondary); }
/* Contract Info rows: dashed separators, as in Figma. */
.dashed > * + * { border-top: 1px dashed var(--l3-border-light); padding-top: var(--l3-spacing-12); }
.notice { display: flex; align-items: center; justify-content: space-between; gap: var(--l3-spacing-08); padding: var(--l3-spacing-10) var(--l3-spacing-12); border: 0; border-radius: var(--l3-radius-08); background: var(--l3-surface-primary); color: var(--l3-content-primary); font: var(--l3-text-label-12); text-align: left; cursor: pointer; }
.notice svg, .notice :last-child { color: var(--l3-content-secondary); }

.futureTop { display: flex; flex-direction: column; gap: var(--l3-spacing-04); padding: var(--l3-spacing-12); border-bottom: 1px solid var(--l3-border-light); }
.futureBottom { display: flex; justify-content: space-between; align-items: center; gap: var(--l3-spacing-08); padding: var(--l3-spacing-12); }
.futureName { font: var(--l3-text-label-12); white-space: nowrap; }

.statValue { font: var(--l3-text-heading-12); white-space: nowrap; }
.statLabel { font: var(--l3-text-label-12); color: var(--l3-content-tertiary); white-space: nowrap; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--l3-spacing-16) var(--l3-spacing-12); }

/* 24H range: purple → blue bar with a bolt at the last traded price. */
.range { position: relative; height: var(--l3-size-08); margin-block: var(--l3-spacing-06); border-radius: var(--l3-radius-full); background: linear-gradient(90deg, var(--l3-surface-accent-purple-default), var(--l3-surface-accent-discover-default)); }
.marker { position: absolute; top: 50%; translate: -50% -50%; display: inline-flex; color: var(--l3-content-accent-discover-default); }
.ltp { display: flex; align-items: center; gap: var(--l3-spacing-04); font: var(--l3-text-label-12); color: var(--l3-content-tertiary); }
.ltp strong { font: var(--l3-text-heading-12); color: var(--l3-content-primary); }

/* Market depth: bids | asks, a divider between, totals under a rule. */
.depth { display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: var(--l3-spacing-12) 0; }
.depthSide { width: 100%; border-collapse: collapse; font: var(--l3-text-heading-12); }
.depthSide + .depthSide { border-left: 1px solid var(--l3-border-light); }
.depthSide th { font: var(--l3-text-label-12); color: var(--l3-content-secondary); text-align: left; padding: 0 var(--l3-spacing-12) var(--l3-spacing-08); }
.depthSide td { padding: var(--l3-spacing-08) var(--l3-spacing-12); }
.depthSide th:last-child, .depthSide td:last-child { text-align: right; }
.depthSide tfoot td { border-top: 1px solid var(--l3-border-light); padding-top: var(--l3-spacing-16); font: var(--l3-text-label-12); }
.up { color: var(--l3-content-accent-indicator-up-default); }
.down { color: var(--l3-content-accent-indicator-down-default); }

/* The note + ⓘ: a light-error toast strip, one tap target (opens “What does illiquidity mean?”). */
.illiquidNote { display: flex; align-items: center; justify-content: center; gap: var(--l3-spacing-04); width: 100%; min-height: var(--l3-size-40); padding: var(--l3-spacing-08) var(--l3-spacing-12); border: 0; border-radius: var(--l3-radius-08); background: var(--l3-surface-accent-error-light); font: var(--l3-text-label-12); color: var(--l3-content-accent-error-default); cursor: pointer; }
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: var(--l3-spacing-12); }

/* ILLIQUID tag: tapping it explains illiquid (48 touch area around the small tag). */
.tagButton { position: relative; display: inline-flex; padding: 0; border: 0; background: none; cursor: pointer; }
.tagButton::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-16)) calc(-1 * var(--l3-spacing-04)); }
```

### `src/flows/fno/commodities/screens/AssetPage.tsx`

```tsx
import { useEffect, useRef, useState } from 'react'
import { Tooltip } from '@l3/components/Tooltip'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { MaskIcon } from '@l3/components/MaskIcon'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { PriceChange } from '@l3/components/PriceChange'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msArrowRange, msBoltFill, msDraw, msFunction, msInfo, msLink, msSettings, msStar, msStarFill, msBlock } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import { Rail } from '../../../../shared/ui/Rail'
import { Screen } from '../../../../shared/ui/Screen'
import { TradingPane } from '../../components/TradingPane'
import { DetailSheet } from '../../sheets/HomeSheets'
import { IlliquidSheet } from '../../sheets/IlliquidSheet'
import { t } from '../../copy'
import { assetCandles, type AssetPage as Asset } from '../data'
import scalppro from '../../assets/scalppro.svg'
import styles from './AssetPage.module.css'

type Props = { asset: Asset; onBack: () => void; onChain: () => void; /** ScalpPro (Scalper) — disabled for an illiquid contract. */ onScalper: () => void; /** Buy / Sell open the commodity order pad. */ onOrder: (side: 'buy' | 'sell') => void }

/**
 * A commodity contract's asset page (Figma 6754:61613): name + contract and price with the commodity art; the chart and
 * its tools; Option chain; Contract Info; the other futures; Performance (24H range + key prices); Trading details;
 * Market Depth; Buy / Sell docked. An illiquid contract (commodities only) shows the ILLIQUID tag and greyed-out Buy /
 * Sell, whatever screen it was opened from.
 */
export function AssetPage({ asset, onBack, onChain, onScalper, onOrder }: Props) {
  const [saved, setSaved] = useState(false)
  const [detail, setDetail] = useState<string | null>(null)
  const [explain, setExplain] = useState(false)
  // Illiquid: ScalpPro is disabled; a tap on it shows the illiquid tooltip (tap only — no hover / focus), gone after 5 s.
  const [scalpTip, setScalpTip] = useState(false)
  const scalpWasOpen = useRef(false)
  useEffect(() => {
    if (!scalpTip) return
    const timer = window.setTimeout(() => setScalpTip(false), 5000)
    return () => window.clearTimeout(timer)
  }, [scalpTip])
  // The Actionbar's bottom line shows only once the page has scrolled under it.
  const pageRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const body = pageRef.current?.parentElement
    if (!body) return
    const onScroll = () => setScrolled(body.scrollTop > 0)
    onScroll()
    body.addEventListener('scroll', onScroll, { passive: true })
    return () => body.removeEventListener('scroll', onScroll)
  }, [])
  // The sample candles are Gold MINI's; scale them to this contract's price.
  const scale = asset.price / assetCandles[assetCandles.length - 1].close
  const candles = assetCandles.map((c) => ({ ...c, open: c.open * scale, close: c.close * scale, high: c.high * scale, low: c.low * scale }))
  const position = ((asset.price - asset.low) / Math.max(1, asset.high - asset.low)) * 100
  const tools = [
    { key: 'range', icon: msArrowRange, value: t('asset.range') },
    { key: 'interval', icon: null, value: t('asset.interval') },
    { key: 'indicators', icon: msFunction, value: t('asset.indicators') },
    { key: 'drawings', icon: msDraw, value: t('asset.drawings') },
    { key: 'settings', icon: msSettings, value: t('asset.settings') },
  ]
  const stat = (value: string, label: string) => <Stack gap="04"><p className={styles.statValue}>{value}</p><p className={styles.statLabel}>{label}</p></Stack>
  // The illiquid note sits inside the button dock, right above Buy / Sell.
  const dock = <ButtonGroup aria-label={`${asset.name} ${asset.contract}`} direction={asset.illiquid ? 'vertical' : 'horizontal'}>
    {asset.illiquid && <button type="button" className={styles.illiquidNote} onClick={() => setExplain(true)}>{t('asset.illiquidNote')}<Icon icon={msInfo} size={16} /></button>}
    {asset.illiquid
      ? <div className={styles.pair}><Button variant="brand" disabled>{t('asset.buy')}</Button><Button variant="secondary" disabled>{t('asset.sell')}</Button></div>
      : <><Button variant="brand" onClick={() => onOrder('buy')}>{t('asset.buy')}</Button><Button variant="secondary" onClick={() => onOrder('sell')}>{t('asset.sell')}</Button></>}
  </ButtonGroup>

  return <Screen
    top={<Actionbar className={styles.bar} elevated={scrolled} onBack={onBack} backLabel={t('asset.back')} actions={<Button variant="tertiary" size="sm" aria-label={t('asset.watchlist')} aria-pressed={saved} iconLeft={<Icon icon={saved ? msStarFill : msStar} size={20} />} onClick={() => setSaved(!saved)} />} />}
    bottom={dock}
    sheet={explain ? <IlliquidSheet contract={`${asset.name} ${asset.contract}`} onClose={() => setExplain(false)} /> : detail ? <DetailSheet title={detail} onClose={() => setDetail(null)} /> : undefined}>
    <Stack ref={pageRef} gap="32" className={styles.page}>
      <Stack gap="16">
        <div className={styles.head}>
          <Stack gap="04" className={styles.grow}>
            <Stack direction="horizontal" gap="08" align="center"><h1 className={styles.name}>{asset.name}</h1><span className={styles.contract}>{asset.contract}</span>{asset.illiquid && <button type="button" className={styles.tagButton} aria-label={t('illiquid.open')} onClick={() => setExplain(true)}><Tag color="error" variant="secondary" size="sm" iconLeft={<Icon icon={msBlock} size={12} />}>{t('asset.illiquid')}</Tag></button>}</Stack>
            <Stack direction="horizontal" gap="04" align="center"><p className={styles.price}>{inr(asset.price, 2)}</p><PriceChange value={asset.change} unit="percent" size="sm" arrow /></Stack>
          </Stack>
          {asset.image && <img className={styles.art} src={asset.image} alt="" />}
        </div>
        <div className={styles.chart}><TradingPane candles={candles} start="09:15" minutes={15} label={t('asset.chart', { name: asset.name, contract: asset.contract })} /></div>
        <div className={styles.tools} role="toolbar" aria-label={t('asset.tools')}>{tools.map((tool) => <button key={tool.key} type="button" className={styles.tool} onClick={() => setDetail(tool.value)}>
          {tool.icon ? <Icon icon={tool.icon} size={20} /> : <span className={styles.interval}>{t('asset.intervalValue')}</span>}<span>{tool.value}</span>
        </button>)}</div>
        <div className={styles.chartActions}>
          <Button variant="secondary" size="md" fullWidth className={styles.chartAction} iconLeft={<Icon icon={msLink} size={20} />} onClick={onChain}>{t('asset.chain')}</Button>
          <div className={styles.scalpWrap}>
            <Button variant="secondary" size="md" fullWidth className={styles.chartAction} disabled={asset.illiquid} iconLeft={<span className={styles.scalpIcon}><MaskIcon src={scalppro} /></span>} onClick={onScalper}>{t('chart.scalper')}</Button>
            {asset.illiquid && <Tooltip className={styles.scalpTip} placement="top" open={scalpTip} onOpenChange={(open) => { if (!open) setScalpTip(false) }}
              content={<span className={styles.tip}><span className={styles.tipText}><span className={styles.tipTitle}>{t('chain.illiquid')}</span><span className={styles.tipSub}>{t('chain.illiquidSub')}</span></span><button type="button" className={styles.tipInfo} aria-label={t('chain.illiquidMore')} onClick={() => { setScalpTip(false); setExplain(true) }}><Icon icon={msInfo} size={16} /></button></span>}>
              <button type="button" className={styles.scalpTap} aria-label={`${t('chart.scalper')}: ${t('chain.illiquid')}, ${t('chain.illiquidSub')}`} aria-expanded={scalpTip}
                onPointerDown={() => { scalpWasOpen.current = scalpTip }} onClick={() => setScalpTip(!scalpWasOpen.current)} />
            </Tooltip>}
          </div>
        </div>
      </Stack>

      <section className={styles.section} aria-label={t('asset.info')}>
        <SectionHeader title={t('asset.info')} />
        <div className={styles.panel}>
          <KeyValueList aria-label={t('asset.info')} className={styles.dashed}>
            <KeyValueRow label={t('asset.daysToExpiry')} value={t('asset.days', { count: asset.daysToExpiry })} />
            <KeyValueRow label={t('asset.margin')} value={asset.margin} />
            <KeyValueRow label={t('asset.leverage')} value={asset.leverage} />
            <KeyValueRow label={t('asset.priceUnit')} value={asset.priceUnit} />
          </KeyValueList>
          <button type="button" className={styles.notice} onClick={() => setDetail(asset.notice)}><span>{asset.notice}</span><Icon icon={msInfo} size={16} /></button>
        </div>
      </section>

      <section className={styles.sectionRail} aria-label={t('asset.futures', { name: asset.name.toUpperCase() })}>
        <div className={styles.inset}><SectionHeader title={t('asset.futures', { name: asset.name.toUpperCase() })} /></div>
        <Rail label={t('asset.futures', { name: asset.name.toUpperCase() })} visible={1.9}>{asset.futures.map((f) => <Card key={f.id} surface="secondary" padding="none" onClick={() => setDetail(f.name)}>
          <div className={styles.futureTop}><p className={styles.futureName}>{f.name}</p><p className={styles.statLabel}>{f.date}</p></div>
          <div className={styles.futureBottom}><p className={styles.statValue}>{inr(f.price, 2)}</p><PriceChange value={f.change} unit="percent" size="sm" /></div>
        </Card>)}</Rail>
      </section>

      <section className={styles.section} aria-label={t('asset.performance')}>
        <SectionHeader title={t('asset.performance')} />
        <div className={styles.panel}>
          <Stack direction="horizontal" justify="between"><Stack gap="04"><p className={styles.statLabel}>{t('asset.low')}</p><p className={styles.statValue}>{inr(asset.low, 2)}</p></Stack><Stack gap="04" align="end"><p className={styles.statLabel}>{t('asset.high')}</p><p className={styles.statValue}>{inr(asset.high, 2)}</p></Stack></Stack>
          <div className={styles.range}><span className={styles.marker} style={{ left: `${position}%` }}><Icon icon={msBoltFill} size={20} /></span></div>
          <p className={styles.ltp}><Icon icon={msBoltFill} size={12} /> {t('asset.ltp')} <strong>{inr(asset.price, 2)}</strong></p>
        </div>
        <div className={[styles.panel, styles.grid].join(' ')}>
          {stat(inr(asset.prevClose, 2), t('asset.prevClose'))}{stat(inr(asset.open, 2), t('asset.open'))}
          {stat(inr(asset.upperCircuit, 2), t('asset.upperCircuit'))}{stat(inr(asset.lowerCircuit, 2), t('asset.lowerCircuit'))}
          {stat(asset.tickSize, t('asset.tickSize'))}{stat(asset.unit, t('asset.unit'))}
        </div>
      </section>

      <section className={styles.section} aria-label={t('asset.trading')}>
        <SectionHeader title={t('asset.trading')} />
        <div className={[styles.panel, styles.grid].join(' ')}>
          {stat(String(asset.lotSize), t('asset.lotSize'))}{stat(String(asset.minLot), t('asset.minLot'))}
          {stat(String(asset.lastQty), t('asset.lastQty'))}{stat(asset.lastTime, t('asset.lastTime'))}
          {stat(asset.expiryDate, t('asset.expiry'))}{stat(asset.lastTradingDate, t('asset.lastTradingDate'))}
        </div>
      </section>

      <section className={styles.section} aria-label={t('asset.depth')}>
        <SectionHeader title={t('asset.depth')} />
        <div className={[styles.panel, styles.depth].join(' ')}>
          {([['bid', asset.bids, asset.bidTotal, styles.up], ['ask', asset.asks, asset.askTotal, styles.down]] as const).map(([side, rows, total, tone]) => <table key={side} className={styles.depthSide}>
            <thead><tr><th>{t(side === 'bid' ? 'asset.bid' : 'asset.ask')}</th><th>{t('asset.qty')}</th></tr></thead>
            <tbody>{rows.map((r, i) => <tr key={i}><td>{r.price}</td><td className={tone}>{r.qty.toLocaleString('en-IN')}</td></tr>)}</tbody>
            <tfoot><tr><td>{t('asset.total')}</td><td>{total.toLocaleString('en-IN')}</td></tr></tfoot>
          </table>)}
        </div>
      </section>
    </Stack>
  </Screen>
}
```

### `src/flows/fno/commodities/screens/LotSummary.tsx`

```tsx
import { useState } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { EmptyState } from '@l3/components/EmptyState'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tab, Tabs } from '@l3/components/Tabs'
import { msFilterList, msKeyboardArrowDown, msBlock } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import { Screen } from '../../../../shared/ui/Screen'
import { ChoiceSheet, DetailSheet } from '../../sheets/HomeSheets'
import { ContractSheet } from '../sheets/ContractSheet'
import { IlliquidSheet } from '../../sheets/IlliquidSheet'
import { Tag } from '@l3/components/Tag'
import type { Contract } from '../../data'
import { t } from '../../copy'
import { expiryMonths, goldLots, lotFutures, lotOptions, type LotOption, type LotSort } from '../data'
import parts from '../../components/HomeParts.module.css'
import styles from '../components/Commodities.module.css'

type Modal = { kind: 'detail'; title: string; contract?: Contract } | { kind: 'contract'; contract: Contract & { illiquid?: boolean } } | { kind: 'illiquid'; contract: string } | { kind: 'choice'; title: string; values: string[]; value: string; onPick: (v: string) => void }

/**
 * Gold Summary (Figma 6754:65113 by price, 6754:65288 by volume, 6754:65444 margin per lot): the lot tabs sit in the
 * Actionbar's bottom slot; Futures, then Options with expiry month, category pills, Filter and the sort choice.
 */
type Props = {
  sort?: LotSort
  /** Open with the Buy / Sell sheet up on this option (fno-23 a liquid one, fno-24 the illiquid one). */
  initialSheet?: string
  onBack: () => void
  onChain: () => void
  /** The sheet's contract name › opens the asset page (illiquid = the ILLIQUID page). */
  onAsset: (illiquid: boolean) => void
  /** The Buy / Sell sheet's buttons open the commodity order pad. */
  onOrder: (side: 'buy' | 'sell') => void
}

export function LotSummary({ sort: initialSort = 'price', initialSheet, onBack, onChain, onAsset, onOrder }: Props) {
  const [lot, setLot] = useState(goldLots[0].id)
  const [month, setMonth] = useState(expiryMonths[0])
  const [category, setCategory] = useState('top')
  const [sort, setSort] = useState<LotSort>(initialSort)
  const [filter, setFilter] = useState(t('filter.all'))
  const [modal, setModal] = useState<Modal | null>(() => { const c = lotOptions.find((o) => o.id === initialSheet); return c ? { kind: 'contract', contract: c } : null })
  const close = () => setModal(null)
  const choose = (title: string, values: string[], value: string, onPick: (v: string) => void) => setModal({ kind: 'choice', title, values, value, onPick })
  const sorts: LotSort[] = ['price', 'volume', 'margin']
  const sortLabel = (s: LotSort) => t(`sort.${s}`)
  const value = (option: LotOption) => sort === 'volume' ? option.volume.toLocaleString('en-IN') : sort === 'margin' ? inr(option.marginPerLot, 0) : inr(option.price, 2)
  // A card opens the Buy / Sell sheet (live app); an illiquid contract's sheet has Buy / Sell greyed out.
  const open = (contract: Contract & { illiquid?: boolean }) => setModal({ kind: 'contract', contract })
  const options = lotOptions.filter((o) => filter === t('filter.puts') ? o.side === 'put' : true)
  const lotName = goldLots.find((l) => l.id === lot)!.name
  const sheet = modal?.kind === 'illiquid' ? <IlliquidSheet contract={modal.contract} onClose={close} /> : modal?.kind === 'contract' ? <ContractSheet contract={modal.contract} onClose={close} onIlliquid={() => setModal({ kind: 'illiquid', contract: modal.contract.name })} onAsset={() => { close(); onAsset(!!modal.contract.illiquid) }} onBuy={() => { close(); onOrder('buy') }} onSell={() => { close(); onOrder('sell') }} /> : modal?.kind === 'detail' ? <DetailSheet title={modal.title} contract={modal.contract} onClose={close} /> : modal?.kind === 'choice' ? <ChoiceSheet {...modal} onClose={close} /> : undefined
  return <Screen sheet={sheet} top={<Actionbar title={t('lot.title', { name: goldLots[0].name })} onBack={onBack} backLabel={t('lot.back')}
    bottom={<Tabs aria-label={t('lot.lots')} value={lot} onChange={setLot} width="hug" items={goldLots.map((l) => ({ value: l.id, label: l.name, iconLeft: <img className={styles.tabArt} src={l.image} alt="" /> }))} />} />}>
    <Stack gap="32" className={styles.lotBody}>
      <section className={parts.contractSection} aria-label={t('lot.futures')}>
        <SectionHeader title={t('lot.futures')} action={{ type: 'view-all', label: t('viewAll'), onClick: () => setModal({ kind: 'detail', title: `${lotName} ${t('lot.futures')}` }) }} />
        <Stack gap="12">{lotFutures.map((future) => <Card key={future.id} onClick={() => open(future)}>
          <Stack direction="horizontal" gap="08" justify="between" align="center"><Stack gap="04" className={parts.grow}><p className={parts.heading}>{future.name}</p><p className={parts.description}>{future.description}</p></Stack><Stack gap="04" align="end"><p className={parts.heading}>{inr(future.price, 2)}</p><PriceChange value={future.change} unit="percent" size="sm" arrow /></Stack></Stack>
        </Card>)}</Stack>
      </section>
      <section className={parts.contractSection} aria-label={t('lot.options')}>
        <SectionHeader title={t('lot.options')} action={{ type: 'view-all', label: t('lot.chain'), onClick: onChain }} />
        <Stack direction="horizontal" gap="08" align="center" className={parts.filterRow}>
          <Tab appearance="pill" size="sm" emphasis="secondary" action iconRight={<Icon icon={msKeyboardArrowDown} size={16} />} aria-label={t('lot.expiry')} onClick={() => choose(t('lot.expiry'), expiryMonths, month, setMonth)}>{month}</Tab>
          <span className={styles.pillDivider} aria-hidden />
          <Tabs aria-label={t('lot.options')} appearance="pill" size="sm" value={category} onChange={setCategory} items={[{ value: 'top', label: t('commodities.top') }, { value: 'active', label: t('lot.active') }, { value: 'oi', label: t('lot.oi') }, { value: 'gainers', label: t('lot.gainers') }]} />
        </Stack>
        <Stack direction="horizontal" align="center" justify="between">
          <Button variant="ghost" size="sm" iconLeft={<Icon icon={msFilterList} size={12} />} onClick={() => choose(t('filter'), [t('filter.all'), t('filter.calls'), t('filter.puts')], filter, setFilter)}>{filter === t('filter.all') ? t('filter') : filter}</Button>
          <Select size="sm" aria-label={t('sort.label')} onClick={() => choose(t('sort.title'), sorts.map(sortLabel), sortLabel(sort), (label) => setSort(sorts.find((s) => sortLabel(s) === label)!))}>{sortLabel(sort)}</Select>
        </Stack>
        <Stack gap="12">{options.length === 0 && <EmptyState title={t('empty')} description={t('empty.description')} />}{options.map((option) => <Card key={option.id} onClick={() => open(option)}>
          <Stack direction="horizontal" gap="08" justify="between" align="center"><Stack gap="04" className={parts.grow}><Stack direction="horizontal" gap="08" align="center"><p className={parts.heading}>{option.name}</p>{/* The card is a button, so the tag is a tappable span inside it (stops the card's own tap). */}{option.illiquid && <span className={styles.tagTap} onClick={(e) => { e.stopPropagation(); setModal({ kind: 'illiquid', contract: option.name }) }}><Tag color="error" variant="secondary" size="sm" iconLeft={<Icon icon={msBlock} size={12} />}>{t('asset.illiquid')}</Tag></span>}</Stack><p className={parts.description}>{option.description}</p></Stack>
            {sort === 'price' ? <Stack gap="04" align="end"><p className={parts.heading}>{value(option)}</p><PriceChange value={option.change} unit="percent" size="sm" arrow /></Stack> : <p className={parts.heading}>{value(option)}</p>}</Stack>
        </Card>)}</Stack>
      </section>
    </Stack>
  </Screen>
}
```

### `src/flows/fno/commodities/sheets/ContractPickerSheet.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Radio } from '@l3/components/Checkbox'
import { ListCell } from '@l3/components/ListCell'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { Tabs } from '@l3/components/Tabs'
import { Sheet } from '../../../../shared/ui/Sheet'
import { t } from '../../copy'
import { commodityGroups, equityContracts, type PickerContract } from '../data'
import parts from '../../components/HomeParts.module.css'
import styles from '../components/Commodities.module.css'

type Segment = 'equity' | 'commodities'

/**
 * "Choose options contract" (Figma 6754:65111 Commodities, 6754:65054 Equity): Equity / Commodities tabs in the header's
 * bottom slot (Commodities also gets a row of commodity chips under them), then the contracts as radio rows. Picking
 * one selects it and closes the sheet.
 */
export function ContractPickerSheet({ segment: initialSegment = 'commodities', value, onPick, onClose }: { segment?: Segment; value: string; onPick: (name: string) => void; onClose: () => void }) {
  const id = useId()
  const [segment, setSegment] = useState<Segment>(initialSegment)
  const [commodity, setCommodity] = useState('all')
  const commodityCount = commodityGroups.length
  const tabs = <Tabs aria-label={t('picker.title')} value={segment} onChange={setSegment} items={[{ value: 'equity', label: t('picker.equity', { count: equityContracts.length }) }, { value: 'commodities', label: t('picker.commodities', { count: commodityCount }) }]} />
  const chips = <div className={styles.chips}><Tabs aria-label={t('picker.filter')} appearance="pill" size="sm" value={commodity} onChange={setCommodity} items={[{ value: 'all', label: t('picker.all') }, ...commodityGroups.map((g) => ({ value: g.id, label: g.name, iconLeft: g.image ? <img className={styles.chipArt} src={g.image} alt="" /> : undefined }))]} /></div>
  const row = (c: PickerContract) => <ListCell key={c.id} as="label" size="sm" selected={c.name === value}
    iconLeft={c.image ? <img className={styles.rowArt} src={c.image} alt="" /> : undefined}
    label={c.name}
    description={<span className={parts.label}>{c.price} <span className={c.change < 0 ? parts.down : parts.up}>{c.change > 0 ? '+' : ''}{c.change.toFixed(2)}%</span></span>}
    trailing={<Stack direction="horizontal" gap="08" align="center">{c.tag && <Tag color="discover" variant="secondary" size="sm">{c.tag}</Tag>}<Radio name={id} checked={c.name === value} onChange={() => { onPick(c.name); onClose() }} /></Stack>} />
  const groups = commodityGroups.filter((g) => commodity === 'all' || g.id === commodity)
  return <Sheet labelledBy={id} onClose={onClose} header={<BottomSheetHeader heading={t('picker.title')} headingId={id} bottom={<>{tabs}{segment === 'commodities' && chips}</>} />}>
    <div className={[styles.pickerBody, segment === 'equity' && styles.equity].filter(Boolean).join(' ')}>
      {segment === 'equity'
        ? <div className={styles.group}>{equityContracts.map(row)}</div>
        : <Stack gap="24">{groups.map((g) => <Stack key={g.id} gap="12"><p className={styles.groupLabel}>{g.name}</p><div className={styles.group}>{g.contracts.map(row)}</div></Stack>)}</Stack>}
    </div>
  </Sheet>
}
```

### `src/flows/fno/commodities/sheets/ContractSheet.module.css`

```css
/* Buy / Sell contract sheet (live app reference, 2026-10-29) on L3 tokens. */
.body { display: flex; flex-direction: column; gap: var(--l3-spacing-12); }
.row { display: flex; align-items: center; justify-content: space-between; gap: var(--l3-spacing-12); }
.name { display: inline-flex; align-items: center; gap: var(--l3-spacing-04); min-height: var(--l3-size-48); margin-block: calc(-1 * var(--l3-spacing-12)); padding: 0; border: 0; background: none; color: var(--l3-content-primary); font: var(--l3-text-heading-18); text-align: left; cursor: pointer; }
.price { font: var(--l3-text-heading-18); white-space: nowrap; }
.expiry { display: inline-flex; align-items: center; gap: var(--l3-spacing-08); font: var(--l3-text-heading-16); }
/* The note + ⓘ: a light-error toast strip, one tap target (opens “What does illiquidity mean?”). */
.note { display: flex; align-items: center; justify-content: center; gap: var(--l3-spacing-04); width: 100%; min-height: var(--l3-size-40); padding: var(--l3-spacing-08) var(--l3-spacing-12); border: 0; border-radius: var(--l3-radius-08); background: var(--l3-surface-accent-error-light); font: var(--l3-text-label-12); color: var(--l3-content-accent-error-default); cursor: pointer; }
/* Buy / Sell side by side under the note (the dock is vertical then; same 12 gap as a horizontal dock). */
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: var(--l3-spacing-12); }
.tagButton { position: relative; display: inline-flex; padding: 0; border: 0; background: none; cursor: pointer; }
.tagButton::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-16)) calc(-1 * var(--l3-spacing-04)); }
```

### `src/flows/fno/commodities/sheets/ContractSheet.tsx`

```tsx
import { useId } from 'react'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { Tag } from '@l3/components/Tag'
import { msChevronRight, msInfo, msBlock } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import { Sheet } from '../../../../shared/ui/Sheet'
import { t } from '../../copy'
import type { Contract } from '../../data'
import styles from './ContractSheet.module.css'

type Props = { contract: Contract & { illiquid?: boolean }; onAsset: () => void; /** The ILLIQUID tag explains illiquid. */ onIlliquid: () => void; onBuy: () => void; onSell: () => void; onClose: () => void }

/**
 * Buy / Sell sheet from a contract card (live app, Gold Summary): name › (asset page) · price, expiry + type · change,
 * Buy (brand) / Sell (secondary). Illiquid (commodities, product rule): ILLIQUID tag and Buy / Sell greyed out — the
 * user can only open the asset page or tap outside to close. Same sheet from any entry point.
 */
export function ContractSheet({ contract, onAsset, onIlliquid, onBuy, onSell, onClose }: Props) {
  const id = useId()
  return <Sheet labelledBy={id} onClose={onClose}
    // The illiquid note sits inside the button dock, right above Buy / Sell.
    footer={<ButtonGroup aria-label={t('contractSheet.label', { name: contract.name })} direction={contract.illiquid ? 'vertical' : 'horizontal'}>
      {contract.illiquid && <button type="button" className={styles.note} onClick={onIlliquid}>{t('asset.illiquidNote')}<Icon icon={msInfo} size={16} /></button>}
      {contract.illiquid
        ? <div className={styles.pair}><Button variant="brand" disabled onClick={onBuy}>{t('asset.buy')}</Button><Button variant="secondary" disabled onClick={onSell}>{t('asset.sell')}</Button></div>
        : <><Button variant="brand" onClick={onBuy}>{t('asset.buy')}</Button><Button variant="secondary" onClick={onSell}>{t('asset.sell')}</Button></>}
    </ButtonGroup>}>
    <div className={styles.body}>
      <div className={styles.row}>
        <button type="button" className={styles.name} id={id} onClick={onAsset} aria-label={t('contractSheet.open', { name: contract.name })}>
          {contract.name}<Icon icon={msChevronRight} size={20} />
        </button>
        <span className={styles.price}>{inr(contract.price, 2)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.expiry}>{contract.description.replace('|', '·')}{contract.illiquid && <button type="button" className={styles.tagButton} aria-label={t('illiquid.open')} onClick={onIlliquid}><Tag color="error" variant="secondary" size="sm" iconLeft={<Icon icon={msBlock} size={12} />}>{t('asset.illiquid')}</Tag></button>}</span>
        <PriceChange value={contract.change} unit="percent" size="md" arrow />
      </div>
    </div>
  </Sheet>
}
```

### `src/flows/fno/components/ContractSection.tsx`

```tsx
import { useState } from 'react'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { EmptyState } from '@l3/components/EmptyState'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tab, Tabs } from '@l3/components/Tabs'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { msFilterList } from '@l3/icons/material'
import { inr } from '../../../shared/data/format'
import { futures, options, stockOptions, type Contract } from '../data'
import { t } from '../copy'
import styles from './HomeParts.module.css'

export type Choose = (title: string, values: string[], value: string, onPick: (value: string) => void) => void

/** `contracts` replaces the Equity sample (the Commodities tab passes its own Smart Futures). */
export function ContractSection({ kind, contracts, onChoose, onContract, onViewAll }: { kind: 'options' | 'futures'; contracts?: Contract[]; onChoose: Choose; onContract: (contract: Contract) => void; onViewAll: () => void }) {
  const [category, setCategory] = useState(kind === 'options' ? 'top' : 'long')
  const [stock, setStock] = useState(false)
  const [volume, setVolume] = useState(false)
  const [filter, setFilter] = useState(t('filter.all'))
  const categories = kind === 'options' ? [
    { value: 'top', label: t('options.top') }, { value: 'active', label: t('options.active') }, { value: 'oi', label: t('options.oi') }, { value: 'advanced', label: t('options.advanced') },
  ] : [
    { value: 'long', label: t('futures.long') }, { value: 'covering', label: t('futures.covering') }, { value: 'short', label: t('futures.short') }, { value: 'unwind', label: t('futures.unwind') },
  ]
  const keys = categories.map((c) => c.value)
  const source = contracts ?? (kind === 'futures' ? futures : stock ? stockOptions : options)
  const filterChoices = kind === 'options' ? [t('filter.all'), t('filter.calls'), t('filter.puts')] : [t('filter.all'), t('filter.gainers'), t('filter.losers')]
  const matching = source.filter((c) => filter === t('filter.puts') ? c.side === 'put' : filter === t('filter.calls') ? c.side === 'call' : filter === t('filter.gainers') ? c.change > 0 : filter === t('filter.losers') ? c.change < 0 : true)
  // Categories select distinct orderings of this small snapshot; volume sort is descending.
  const offset = keys.indexOf(category)
  const ordered = [...matching.slice(offset), ...matching.slice(0, offset)]
  const rows = volume ? ordered.sort((a, b) => b.volume - a.volume) : ordered
  return <section className={styles.contractSection} aria-label={t(`${kind}.title`)}>
    <SectionHeader title={t(`${kind}.title`)} action={{ type: 'view-all', label: t('viewAll'), onClick: onViewAll }} />
    <Stack direction="horizontal" gap="08" align="center" className={styles.filterRow}>
      {kind === 'options' && <Tab appearance="pill" size="sm" action iconRight={<Icon icon={lmSwitchArrowVertical} size={12} />} onClick={() => setStock(!stock)} aria-label={t('scope.label')}>{t(stock ? 'scope.stock' : 'scope.index')}</Tab>}
      <Tabs aria-label={t(`${kind}.title`)} appearance="pill" size="sm" items={categories} value={category} onChange={setCategory} />
    </Stack>
    <Stack direction="horizontal" align="center" justify="between">
      <Button variant="ghost" size="sm" iconLeft={<Icon icon={msFilterList} size={12} />} onClick={() => onChoose(t('filter'), filterChoices, filter, setFilter)}>{filter === t('filter.all') ? t('filter') : filter}</Button>
      <Select size="sm" aria-label={t('sort.label')} onClick={() => setVolume(!volume)}>{t(volume ? 'sort.volume' : 'sort.price')}</Select>
    </Stack>
    <Stack gap="12">{rows.map((contract) => <Card key={contract.id} onClick={() => onContract(contract)}>
      <Stack direction="horizontal" gap="08" justify="between" align="center"><Stack gap="04" className={styles.grow}><p className={styles.heading}>{contract.name}</p><p className={styles.description}>{contract.description}</p></Stack><Stack gap="04" align="end"><p className={styles.heading}>{volume ? contract.volume.toLocaleString('en-IN') : inr(contract.price, 2)}</p><PriceChange value={contract.change} unit="percent" size="sm" arrow /></Stack></Stack>
    </Card>)}{rows.length === 0 && <EmptyState title={t('empty')} description={t('empty.description')} />}</Stack>
  </section>
}
```

### `src/flows/fno/components/Discovery.tsx`

```tsx
import { Avatar } from '@l3/components/Avatar'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { msAdd, msChevronRight } from '@l3/icons/material'
import { Rail } from '../../../shared/ui/Rail'
import { t } from '../copy'
import type { Watchlist } from '../data'
import calls from '../assets/trade-calls.svg'
import watchlist from '../assets/watchlist.svg'
import invest from '../assets/smart-invest.svg'
import referral from '../assets/referral.svg'
import styles from './HomeParts.module.css'

export function Shortcuts({ onWatchlist, onDestination }: { onWatchlist: () => void; onDestination: (label: string) => void }) {
  const items = [{ key: 'calls', asset: calls }, { key: 'watchlist', asset: watchlist }, { key: 'invest', asset: invest }, { key: 'referral', asset: referral }] as const
  return <div className={styles.shortcuts}>{items.map(({ key, asset }) => <Stack key={key} gap="08" align="center">
    <Button variant="tertiary" size="md" aria-label={t(`shortcut.${key}`)} iconLeft={<span className={key === 'invest' ? styles.shortcutLarge : styles.actionIcon}><img className={styles.asset} src={asset} alt="" /></span>} onClick={key === 'watchlist' ? onWatchlist : () => onDestination(t(`shortcut.${key}`))} />
    <span className={styles.secondaryLabel}>{t(`shortcut.${key}`)}</span>
  </Stack>)}</div>
}

export function Watchlists({ lists, onAdd, onOpen }: { lists: Watchlist[]; onAdd: () => void; onOpen: (name: string) => void }) {
  return <section className={styles.watchlists} aria-label={t('shortcut.watchlist')}>
    <Stack direction="horizontal" align="center" justify="between" className={styles.inset}><SectionHeader title={t('watchlists.title', { count: lists.length })} /><Button variant="ghost" size="sm" iconLeft={<Icon icon={msAdd} size={12} />} onClick={onAdd}>{t('watchlists.add')}</Button></Stack>
    <Rail label={t('shortcut.watchlist')} visible={1.4}>{lists.map((list) => <Card key={list.id} onClick={() => onOpen(list.name)}>
      <Stack direction="horizontal" gap="12" align="center"><Avatar initials={list.name[0]} size={40} /><Stack gap="04" className={styles.grow}><p className={styles.heading}>{list.name}</p><p className={styles.description}>{t('watchlists.count', { count: list.count })}</p></Stack><Icon icon={msChevronRight} size={20} /></Stack>
    </Card>)}</Rail>
  </section>
}
```

### `src/flows/fno/components/FnoNav.tsx`

```tsx
import { BottomNavbar } from '@l3/components/BottomNavbar'
import { NavIcon } from '@l3/components/BottomNavbar/NavIcon'
import { t } from '../copy'

export function FnoNav({ onHome, onDestination, onChain, onScalper }: { onHome: () => void; onDestination: (label: string) => void; onChain: () => void; onScalper: () => void }) {
  const items = [
    { value: 'fno', label: t('title'), name: 'fno' },
    { value: 'chain', label: t('nav.chain'), name: 'fnoOptionChain' },
    { value: 'positions', label: t('nav.positions'), name: 'fnoPositions' },
    { value: 'scalper', label: t('nav.scalper'), name: 'fnoScalper' },
  ] as const
  return <BottomNavbar aria-label="F&O" home={{ label: t('nav.home'), onClick: onHome }} value="fno" onChange={(v) => { const item = items.find((i) => i.value === v); if (v === 'scalper') onScalper(); else if (v === 'chain') onChain(); else if (item && v !== 'fno') onDestination(item.label) }} items={items.map(({ value, label, name }) => ({ value, label, icon: <NavIcon name={name} />, selectedIcon: <NavIcon name={name} selected /> }))} />
}
```

### `src/flows/fno/components/Header.module.css`

```css
.bar { display: flex; align-items: center; gap: var(--l3-spacing-12); height: 64px; padding-inline: var(--l3-spacing-16); background: var(--l3-surface-secondary); transition: background-color var(--l3-motion-duration-short) var(--l3-motion-easing-standard); }
.bar[data-scrolled] { background: var(--l3-surface-primary); }
.bar > :is(.profile, .search, .wallet) { display: inline-flex; flex: none; align-items: center; justify-content: center; height: var(--app-stocks-topbar-control); padding: 0; border: 0; color: var(--l3-content-primary); cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform var(--l3-motion-duration-short) var(--l3-motion-easing-standard); }
.bar > :is(.profile, .search, .wallet):active { transform: scale(var(--l3-motion-scale-press-default)); }
.bar > :is(.profile, .search, .wallet):focus-visible { outline: 2px solid var(--l3-content-primary); outline-offset: 2px; }
.bar .profile { width: var(--app-stocks-topbar-avatar); height: var(--app-stocks-topbar-avatar); border-radius: var(--l3-radius-full); background: var(--l3-surface-accent-indigo-light); box-shadow: inset 0 0 0 1px var(--l3-border-accent-indigo-default); color: var(--l3-content-accent-indigo-default); font: var(--l3-text-label-14); }
.bar .search { flex: 1; min-width: 0; justify-content: flex-start; gap: var(--l3-spacing-08); padding-inline: var(--l3-spacing-12); border-radius: var(--l3-radius-full); background: var(--l3-surface-default); box-shadow: inset 0 0 0 1px var(--l3-border-light); }
.placeholder { overflow: hidden; color: var(--l3-content-secondary); font: var(--l3-text-label-14); text-overflow: ellipsis; white-space: nowrap; }
.wallet { width: var(--app-stocks-topbar-control); border-radius: var(--l3-radius-full); background: var(--l3-surface-default); box-shadow: inset 0 0 0 1px var(--l3-border-light); }
```

### `src/flows/fno/components/Header.tsx`

```tsx
import { Icon } from '@l3/components/Icon'
import { msAccountBalanceWallet, msSearch } from '@l3/icons/material'
import { DashEntry } from '../../../shared/ui/dash/DashEntry'
import { t } from '../copy'
import styles from './Header.module.css'

type HeaderProps = {
  initials: string
  scrolled?: boolean
  onProfile: () => void
  onSearch: () => void
  onWallet: () => void
  onDash: () => void
}

/** F&O's local instance of the Stocks home header: profile, search, DASH and wallet. */
export function Header({ initials, scrolled = false, onProfile, onSearch, onWallet, onDash }: HeaderProps) {
  return <header className={styles.bar} data-scrolled={scrolled || undefined}>
    <button type="button" className={styles.profile} aria-label={t('top.profile')} onClick={onProfile}>{initials}</button>
    <button type="button" className={styles.search} onClick={onSearch}><Icon icon={msSearch} size={20} /><span className={styles.placeholder}>{t('top.search')}</span></button>
    <DashEntry label={t('top.dash')} ariaLabel={t('top.dash')} onClick={onDash} />
    <button type="button" className={styles.wallet} aria-label={t('top.wallet')} onClick={onWallet}><Icon icon={msAccountBalanceWallet} size={20} /></button>
  </header>
}
```

### `src/flows/fno/components/Heatmap.tsx`

```tsx
import { useState } from 'react'
import { Icon } from '@l3/components/Icon'
import { Card } from '@l3/components/Card'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { Tab, Tabs } from '@l3/components/Tabs'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { heatmap } from '../data'
import { t } from '../copy'
import styles from './HomeParts.module.css'

export function Heatmap({ onOpen, onViewAll }: { onOpen: (name: string) => void; onViewAll: () => void }) {
  const [category, setCategory] = useState('auto')
  const [stock, setStock] = useState(true)
  const cells = category === 'auto' ? heatmap : heatmap.slice(category === 'financial' ? 0 : 3, category === 'financial' ? 6 : 9)
  return <section className={styles.heatmapSection} aria-label={t('heatmap.title')}>
    <div className={styles.inset}><SectionHeader title={t('heatmap.title')} action={{ type: 'view-all', label: t('viewAll'), onClick: onViewAll }} /></div>
    <Stack direction="horizontal" gap="08" className={styles.heatmapRow}>
      <Tab appearance="pill" size="sm" action iconRight={<Icon icon={lmSwitchArrowVertical} size={12} />} aria-label={t('scope.label')} onClick={() => setStock(!stock)}>{t(stock ? 'scope.stock' : 'scope.index')}</Tab>
      <Tabs appearance="pill" size="sm" aria-label={t('heatmap.title')} value={category} onChange={setCategory} items={(['auto', 'financial', 'fmcg'] as const).map((value) => ({ value, label: t(`heatmap.${value}`) }))} />
    </Stack>
    <div className={styles.heatmap}>{cells.map((cell, i) => <Card variant="flat" key={cell.id} className={[styles.heatCell, cell.tone === 'up' ? styles.heatUp : styles.heatDown].join(' ')} onClick={() => onOpen(stock ? cell.name : ['NIFTY 50', 'BANK NIFTY', 'SENSEX'][i % 3])}>
      <span className={styles.heatName}>{stock ? cell.name : ['NIFTY 50', 'BANK NIFTY', 'SENSEX'][i % 3]}</span><span><strong>{cell.change.toFixed(2)}%</strong><span className={styles.heatPrice}>{cell.price}</span></span>
    </Card>)}</div>
  </section>
}
```

### `src/flows/fno/components/HomeParts.module.css`

```css
/* F&O home composition and custom heatmap. */
.overview { padding: 0 0 var(--l3-spacing-24); background: var(--l3-surface-secondary); }
.inset { padding-inline: var(--l3-spacing-16); }
.amount { font: var(--l3-text-heading-24); white-space: nowrap; }
.indices { display: flex; gap: var(--l3-spacing-16); overflow: hidden; }
/* Zing signals card (Figma "Logo Container"): flush with the screen's left edge, open on the left, rounded on the right,
   a zing-honey outline and a honey → white wash from the top. Overrides L3 Card's border, radius and padding on purpose. */
.zing.zing { flex: none; width: max-content; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: var(--l3-spacing-06); padding: var(--l3-spacing-10) var(--l3-spacing-08) var(--l3-spacing-12); border: 1px solid var(--l3-border-accent-zing-default); border-left: 0; border-radius: 0 var(--l3-radius-12) var(--l3-radius-12) 0; background: linear-gradient(179deg, var(--l3-surface-accent-zing-light) 1%, var(--l3-surface-primary) 50%); box-shadow: var(--l3-shadow-elevation-low); }
.zing img { display: block; }
.indexRail { display: flex; min-width: 0; flex: 1; gap: var(--l3-spacing-12); overflow-x: auto; padding-right: var(--l3-spacing-16); scrollbar-width: none; }
.indexCard { flex: none; width: max-content; }
.label, .secondaryLabel, .up, .down { font: var(--l3-text-label-12); white-space: nowrap; }
.secondaryLabel { color: var(--l3-content-secondary); }
.up { color: var(--l3-content-accent-indicator-up-default); }
.down { color: var(--l3-content-accent-indicator-down-default); }
.caption { font: var(--l3-text-description-10); color: var(--l3-content-secondary); }
.heading { font: var(--l3-text-heading-14); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.description { font: var(--l3-text-description-12); color: var(--l3-content-secondary); white-space: nowrap; }
.grow { flex: 1; min-width: 0; }
.feed { padding-block: var(--l3-spacing-24) var(--l3-spacing-32); }
.ribbonIcon { display: inline-flex; width: var(--l3-size-16); height: var(--l3-size-16); }
.shortcuts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--l3-spacing-08); padding: var(--l3-spacing-08) var(--l3-spacing-16) 0; }
.shortcuts .secondaryLabel { white-space: normal; text-align: center; }
.actionIcon { display: inline-flex; align-items: center; justify-content: center; width: var(--l3-size-20); height: var(--l3-size-20); }
.shortcutLarge { display: inline-flex; align-items: center; justify-content: center; width: var(--l3-size-24); height: var(--l3-size-24); }
.asset { display: block; flex: none; }
:global([data-mode='dark']) .asset { filter: invert(1); }
.chartSection { display: flex; flex-direction: column; gap: var(--l3-spacing-16); padding-inline: var(--l3-spacing-16); }
.trendIcon { display: inline-flex; width: var(--l3-size-20); height: var(--l3-size-20); color: var(--l3-content-accent-indicator-down-default); }
.chart { width: 100%; display: block; }
.divider { border-top: 1px solid var(--l3-border-light); }
.watchlists, .heatmapSection { display: flex; flex-direction: column; gap: var(--l3-spacing-16); }
.contractSection { display: flex; flex-direction: column; gap: var(--l3-spacing-16); padding-inline: var(--l3-spacing-16); }
.filterRow { overflow: hidden; }
.filterRow > :first-child { flex: none; }
.filterRow > [role='tablist'] { min-width: 0; }
.heatmapRow { padding-inline: var(--l3-spacing-16); overflow: hidden; }
.heatmapRow > :first-child { flex: none; }
.heatmapRow > [role='tablist'] { min-width: 0; }
.heatmap { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; }
.heatCell { display: flex; flex-direction: column; justify-content: space-between; gap: var(--l3-spacing-24); min-width: 0; aspect-ratio: 1; padding: var(--l3-spacing-16) var(--l3-spacing-12); border: 0; color: var(--l3-content-inverted); text-align: center; cursor: pointer; }
.heatCell.heatCell.heatUp { background: var(--l3-surface-accent-indicator-up-default); }
.heatCell.heatCell.heatDown { background: var(--l3-surface-accent-indicator-down-default); }
.heatName { font: var(--l3-text-heading-12); }
.heatCell strong { display: block; font: var(--l3-text-heading-16); }
.heatPrice { display: block; margin-top: var(--l3-spacing-04); font: var(--l3-text-label-14); opacity: var(--l3-opacity-60, 0.6); }

/*
 * F&O product tabs — the approved exception to L3 Ribbon (Figma 6754:63641): grey row on surface/secondary with a green
 * baseline; Label/12; the selected tab has a success-green outline and a green-50 → white wash from the top.
 */
.productTabs.productTabs { background: var(--l3-surface-secondary); box-shadow: inset 0 -1px 0 var(--app-fno-tabs-baseline); }
.productTabs.productTabs [role='tab'] { --tab-font: var(--l3-text-label-12); }
.productTabs.productTabs [role='tab'][aria-selected='true'] { --tab-border: var(--l3-border-accent-success-default); --tab-surface: var(--l3-surface-default); background-image: linear-gradient(180deg, var(--l3-surface-accent-success-light) 3%, var(--l3-surface-default)); }

/* A product tab switch: only the content under the tabs slides in, from the chosen tab's side. */
.productContent { overflow-x: clip; }
.productContent[data-slide='from-end'] > * { animation: fno-in-from-end var(--l3-motion-duration-long) var(--l3-motion-easing-standard) both; }
.productContent[data-slide='from-start'] > * { animation: fno-in-from-start var(--l3-motion-duration-long) var(--l3-motion-easing-standard) both; }
@keyframes fno-in-from-end { from { transform: translateX(100%); } to { transform: none; } }
@keyframes fno-in-from-start { from { transform: translateX(-100%); } to { transform: none; } }
@media (prefers-reduced-motion: reduce) { .productContent > * { animation: none !important; } }
```

### `src/flows/fno/components/Overview.tsx`

```tsx
import { useState } from 'react'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msArrowForward } from '@l3/icons/material'
import zing from '../assets/zing.svg'
import { indices } from '../data'
import { t } from '../copy'
import styles from './HomeParts.module.css'

export function Overview({ onDestination }: { onDestination: (name: string) => void }) {
  const [day, setDay] = useState(false)
  return <Stack gap="24" className={styles.overview}>
    <Stack direction="horizontal" align="center" justify="between" className={styles.inset}>
      <Stack gap="08">
        <Select size="sm" onClick={() => setDay(!day)}>{t(day ? 'pnl.day' : 'pnl.total')}</Select>
        <Stack direction="horizontal" gap="08" align="center"><p className={styles.amount}>{day ? '₹520.75' : '₹1,500.25'}</p><PriceChange value={day ? 4.2 : 12.4} unit="percent" size="md" arrow decimals={1} /></Stack>
      </Stack>
      <Button variant="tertiary" size="sm" aria-label={t('pnl.open')} iconLeft={<Icon icon={msArrowForward} size={20} />} onClick={() => onDestination(t('nav.positions'))} />
    </Stack>
    <div className={styles.indices}>
      <Card onClick={() => onDestination(t('signals'))} className={styles.zing}><img src={zing} alt="Zing" /><Tag color="zing" variant="secondary" size="sm">{t('signals')}</Tag></Card>
      <div className={styles.indexRail}>
        {indices.map((index) => <Card key={index.name} onClick={() => onDestination(index.name)} className={styles.indexCard}>
          <Stack direction="horizontal" gap="04" align="center" justify="between"><p className={styles.secondaryLabel}>{index.name}</p><Tag color="discover" variant="secondary" size="sm">{index.expiry}</Tag></Stack>
          <Stack direction="horizontal" gap="04" align="center"><span className={styles.label}>{index.price}</span><PriceChange value={index.change} unit="number" size="sm" arrow={false} /><span className={styles.up}>({index.percent})</span></Stack>
        </Card>)}
      </div>
    </div>
  </Stack>
}
```

### `src/flows/fno/components/TradingChart.tsx`

```tsx
import { useState } from 'react'
import { Button } from '@l3/components/Button'
import { Chart } from '@l3/components/Chart'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tabs } from '@l3/components/Tabs'
import { MaskIcon } from '@l3/components/MaskIcon'
import { chartSeries } from '../data'
import { t } from '../copy'
import chain from '../assets/option-chain.svg'
import scalper from '../assets/scalppro.svg'
import downtrend from '../assets/downtrend.svg'
import styles from './HomeParts.module.css'

/** `instrument` + `onInstrument`: the Commodities tab shows its own instrument and opens the contract picker instead of the index sheet. */
export function TradingChart({ instrument, onInstrument, onChoose, onDestination, onChain, onScalper }: { instrument?: string; onInstrument?: () => void; onChain: () => void; onChoose: (title: string, values: string[], value: string, onPick: (v: string) => void) => void; onDestination: (name: string) => void; onScalper: () => void }) {
  const [chosenIndex, setIndex] = useState('NIFTY 50')
  const index = instrument ?? chosenIndex
  const [metric, setMetric] = useState('price')
  const items = (['price', 'oi', 'change', 'pcr', 'advance'] as const).map((value) => ({ value, label: t(`chart.${value}`) }))
  return <section className={styles.chartSection} aria-label={t('chart.label', { index, metric })}>
    <Stack direction="horizontal" justify="between" align="center">
      <Stack direction="horizontal" gap="08" align="center"><Select size="lg" aria-label={t('chart.index')} onClick={onInstrument ?? (() => onChoose(t('chart.index'), ['NIFTY 50', 'BANK NIFTY', 'SENSEX'], index, setIndex))}>{index}</Select><span className={styles.down}>5.17%</span></Stack>
      <Stack direction="horizontal" gap="04" align="center"><Stack gap="04" align="end"><span className={styles.down}>{t('chart.trend')}</span><span className={styles.caption}>{t('chart.since')}</span></Stack><span className={styles.trendIcon}><MaskIcon src={downtrend} /></span></Stack>
    </Stack>
    <Tabs aria-label="Chart metric" appearance="pill" size="sm" items={items} value={metric} onChange={setMetric} />
    <Chart data={chartSeries(metric, index)} label={t('chart.label', { index, metric: items.find((i) => i.value === metric)!.label })} type={metric === 'price' ? 'candle' : 'line'} showLastPrice={false} showVolume={metric === 'price'} className={styles.chart} />
    <Stack direction="horizontal" gap="12"><Button variant="secondary" size="md" fullWidth iconLeft={<span className={styles.actionIcon}><img className={styles.asset} src={chain} alt="" /></span>} onClick={onChain}>{t('chart.chain')}</Button><Button variant="primary" size="md" fullWidth iconLeft={<span className={styles.actionIcon}><MaskIcon src={scalper} /></span>} onClick={onScalper}>{t('chart.scalper')}</Button></Stack>
  </section>
}
```

### `src/flows/fno/components/TradingPane.module.css`

```css
/* Trading chart pane (Scalper). SVG geometry is in CSS px (TradingPane.tsx); colours and type are L3 tokens. */
.pane {
  position: relative;
  min-height: 0;
  flex: 1;
}

.svg {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.axisLine {
  stroke: var(--l3-border-intense);
  stroke-width: 1;
}

.tick,
.time {
  fill: var(--l3-content-secondary);
  font: var(--l3-text-label-12);
}

/* Candles: up green, down red (L3 indicator colours); 1px wicks. */
.up {
  fill: var(--l3-content-accent-indicator-up-default);
  stroke: var(--l3-content-accent-indicator-up-default);
}

.down {
  fill: var(--l3-content-accent-indicator-down-default);
  stroke: var(--l3-content-accent-indicator-down-default);
}

.up line,
.down line {
  stroke-width: 1;
}

.up rect,
.down rect {
  stroke: none;
}

/* Last price: a dashed line in the up colour to the axis, and the green tag with white text. */
.lastLine {
  stroke: var(--l3-content-accent-indicator-up-default);
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
}

.lastTag {
  fill: var(--l3-surface-accent-indicator-up-default);
}

.lastText {
  fill: var(--l3-static-white);
  font: var(--l3-text-label-12);
}

/* Session high / low: the value in primary text, a dot and a line in secondary. */
.marker line {
  stroke: var(--l3-content-secondary);
  stroke-width: 1;
}

.marker circle {
  fill: var(--l3-content-secondary);
}

.marker text {
  fill: var(--l3-content-primary);
  font: var(--l3-text-label-12);
}

/* An applied indicator's two lines. */
.fast,
.slow {
  fill: none;
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.fast {
  stroke: var(--l3-content-accent-us-stock-default);
}

.slow {
  stroke: var(--l3-content-accent-zing-default);
}

/* Zoom in at the top of the plot, zoom out at the bottom, against the price axis. */
.zoom {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: var(--l3-spacing-04) var(--l3-spacing-08);
  box-sizing: border-box;
  pointer-events: none;
}

.zoomButton.zoomButton {
  --btn-content: var(--l3-content-secondary);
  pointer-events: auto;
}

/* "5m ▾" in the corner under the price axis. */
.timeframe.timeframe {
  position: absolute;
  right: 0;
  bottom: 0;
  justify-content: center;
  font: var(--l3-text-label-14);
}
```

### `src/flows/fno/components/TradingPane.tsx`

```tsx
import { useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@l3/components/Button'
import type { ChartCandle } from '@l3/components/Chart'
import { Icon } from '@l3/components/Icon'
import { msArrowDropDown, msZoomIn, msZoomOut } from '@l3/icons/material'
import { t } from '../copy'
import styles from './TradingPane.module.css'

/** A line drawn over the candles (an applied indicator), one value per candle. */
export type PaneLine = { values: number[]; tone: 'fast' | 'slow' }

type TradingPaneProps = {
  candles: ChartCandle[]
  /** The first candle's time ("11:30") and the candle length in minutes: the time axis is worked out from them. */
  start: string
  minutes: number
  /** Accessible name, e.g. "NIFTY 50, today, 5-minute candles". */
  label: string
  lines?: PaneLine[]
}

// Geometry in CSS px, measured on the live app's screenshot (392 wide).
const AXIS = 50 // the price axis on the right, past its separator line
const TIME = 30 // the time axis under the plot
const PAD_TOP = 26 // the session high sits this far under the top
const PAD_BOTTOM = 34 // …and the low this far above the time axis
const EMPTY_SLOTS = 3 // room after the last candle
const TIME_EVERY = 10 // a time label every 10 candles (50 minutes)
const MARKER = 18 // the high / low marker's line length

/**
 * A trading chart pane (Scalper): candles, a price axis on the right with the last price tagged, the session's high
 * and low marked with their values, zoom in / out, a time axis under it and the candle length (5m) in the corner.
 * Drawn at the pane's real size (it fills its parent), so the text never stretches. Colours are L3 tokens.
 * L3's Chart is a fixed 360 × 200 picture without high / low markers, zoom or a timeframe — listed as an L3 gap.
 */
export function TradingPane({ candles, start, minutes, label, lines = [] }: TradingPaneProps) {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const plotW = Math.max(0, size.w - AXIS)
  const plotH = Math.max(0, size.h - TIME)
  const highs = candles.map((c) => c.high)
  const lows = candles.map((c) => c.low)
  const hi = Math.max(...highs)
  const lo = Math.min(...lows)
  const slot = plotW / (candles.length + EMPTY_SLOTS)
  const x = (i: number) => slot * (i + 0.5)
  const y = (v: number) => PAD_TOP + ((hi - v) / (hi - lo || 1)) * (plotH - PAD_TOP - PAD_BOTTOM)
  const last = candles[candles.length - 1]
  const ticks = niceTicks(lo, hi).filter((v) => y(v) > 8 && y(v) < plotH - 8 && Math.abs(y(v) - y(last.close)) > 14)
  const hiIndex = highs.indexOf(hi)
  const loIndex = lows.indexOf(lo)
  const fmt = (v: number) => v.toFixed(2)
  const times = candles.map((_, i) => i).filter((i) => (i + 1) % TIME_EVERY === 0 || i === candles.length - 1)

  return (
    <div className={styles.pane} ref={box}>
      {size.w > 0 && (
        <svg className={styles.svg} width={size.w} height={size.h} role="img" aria-label={label}>
          {/* separators: the price axis and the time axis */}
          <line className={styles.axisLine} x1={plotW + 0.5} y1={0} x2={plotW + 0.5} y2={plotH} />
          <line className={styles.axisLine} x1={0} y1={plotH + 0.5} x2={size.w} y2={plotH + 0.5} />

          {ticks.map((v) => (
            <text key={v} className={styles.tick} x={plotW + 4} y={y(v)} dominantBaseline="central">{Math.round(v * 100) / 100}</text>
          ))}

          {candles.map((c, i) => {
            const up = c.close >= c.open
            const top = y(Math.max(c.open, c.close))
            const body = Math.max(1, y(Math.min(c.open, c.close)) - top)
            return (
              <g key={i} className={up ? styles.up : styles.down}>
                <line x1={x(i)} x2={x(i)} y1={y(c.high)} y2={y(c.low)} />
                <rect x={x(i) - slot * 0.32} y={top} width={slot * 0.64} height={body} />
              </g>
            )
          })}

          {lines.map((l) => (
            <path key={l.tone} className={styles[l.tone]} d={l.values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('')} />
          ))}

          {/* last price: a dashed line to the axis, then the tag */}
          <line className={styles.lastLine} x1={x(candles.length - 1) + slot * 0.5} y1={y(last.close)} x2={plotW} y2={y(last.close)} />
          <rect className={styles.lastTag} x={plotW + 1} y={y(last.close) - 8} width={AXIS} height={16} rx={2} />
          <text className={styles.lastText} x={plotW + 3} y={y(last.close)} dominantBaseline="central">{fmt(last.close)}</text>

          <Marker x={x(hiIndex)} y={y(hi)} value={fmt(hi)} towardRight={hiIndex < candles.length / 2} />
          <Marker x={x(loIndex)} y={y(lo)} value={fmt(lo)} towardRight={loIndex < candles.length / 2} />

          {times.map((i) => (
            <g key={i}>
              <line className={styles.axisLine} x1={x(i)} x2={x(i)} y1={plotH} y2={plotH + 5} />
              <text className={styles.time} x={x(i)} y={plotH + 18} textAnchor="middle" dominantBaseline="central">{clock(start, minutes * i)}</text>
            </g>
          ))}
        </svg>
      )}
      <div className={styles.zoom} style={{ right: AXIS + 2, height: plotH }}>
        <Button variant="ghost" size="sm" iconLeft={<Icon icon={msZoomIn} />} aria-label={t('scalper.zoomIn')} className={styles.zoomButton} />
        <Button variant="ghost" size="sm" iconLeft={<Icon icon={msZoomOut} />} aria-label={t('scalper.zoomOut')} className={styles.zoomButton} />
      </div>
      <Button
        variant="ghost"
        size="sm"
        iconRight={<Icon icon={msArrowDropDown} />}
        aria-label={t('scalper.timeframeLabel')}
        className={styles.timeframe}
        style={{ width: AXIS, height: TIME }}
      >
        {t('scalper.timeframe')}
      </Button>
    </div>
  )
}

/** The session's high / low: its value, a dot and a short line to the candle (to the right when the candle is on the left). */
function Marker({ x, y, value, towardRight }: { x: number; y: number; value: string; towardRight: boolean }) {
  const end = towardRight ? x + MARKER : x - MARKER
  return (
    <g className={styles.marker}>
      <line x1={x} y1={y} x2={end} y2={y} />
      <circle cx={end} cy={y} r={1.5} />
      <text x={towardRight ? end + 5 : end - 5} y={y} textAnchor={towardRight ? 'start' : 'end'} dominantBaseline="central">{value}</text>
    </g>
  )
}

/** Round price-axis steps (1, 2, 5 × 10ⁿ) for about six labels. */
function niceTicks(lo: number, hi: number) {
  const raw = (hi - lo) / 6
  const pow = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 4, 5, 10].map((m) => m * pow).find((s) => s >= raw) ?? raw
  const first = Math.ceil(lo / step) * step
  return Array.from({ length: Math.floor((hi - first) / step) + 1 }, (_, k) => first + k * step)
}

/** "11:30" + 45 minutes → "12:15". */
function clock(start: string, add: number) {
  const [h, m] = start.split(':').map(Number)
  const total = h * 60 + m + add
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}
```

### `src/flows/fno/copy.json`

```json
{
  "top.search": "Search stocks",
  "top.profile": "Profile and settings",
  "top.wallet": "Wallet",
  "top.dash": "DASH",
  "title": "F&O",
  "nav.home": "Home",
  "nav.chain": "Option Chain",
  "nav.positions": "Positions",
  "nav.scalper": "Scalper",
  "pnl.total": "Total P&L",
  "pnl.day": "Day P&L",
  "pnl.open": "View positions",
  "signals": "2 Signals",
  "equity": "Equity",
  "commodities": "Commodities",
  "strategies": "Strategies",
  "shortcut.calls": "Trade Calls",
  "shortcut.watchlist": "Watchlist",
  "shortcut.invest": "Smart Invest",
  "shortcut.referral": "Referral",
  "chart.index": "Choose index",
  "chart.trend": "Strong Downtrend",
  "chart.since": "Since 12:46 PM",
  "chart.price": "Price",
  "chart.oi": "OI",
  "chart.change": "Change in OI",
  "chart.pcr": "PCR",
  "chart.advance": "Advanced declined",
  "chart.label": "{index} · {metric}",
  "chart.chain": "Option chain",
  "chart.scalper": "ScalpPro",
  "watchlists.title": "Watchlist ({count})",
  "watchlists.add": "Add watchlist",
  "watchlists.count": "{count} stocks",
  "watchlists.create": "Create watchlist",
  "watchlists.name": "Watchlist name",
  "watchlists.created": "Watchlist created",
  "options.title": "Smart Options",
  "options.top": "Top traded",
  "options.active": "Most active",
  "options.oi": "OI gainers",
  "options.advanced": "Advanced",
  "heatmap.title": "Futures Heatmap",
  "heatmap.auto": "Auto",
  "heatmap.financial": "Financial services",
  "heatmap.fmcg": "FMCG",
  "futures.title": "Smart Futures",
  "futures.long": "Long Build",
  "futures.covering": "Short Covering",
  "futures.short": "Short Buildup",
  "futures.unwind": "Long Windup",
  "scope.index": "Index",
  "scope.stock": "Stock",
  "scope.label": "Instrument type",
  "filter": "Filter",
  "filter.all": "All contracts",
  "filter.calls": "Calls",
  "filter.puts": "Puts",
  "filter.gainers": "Gainers",
  "filter.losers": "Losers",
  "sort.price": "By Price",
  "sort.volume": "By Volume",
  "sort.label": "Sort contracts",
  "viewAll": "View all",
  "close": "Okay",
  "cancel": "Cancel",
  "prototype.description": "This destination is not included in the current prototype. This screen uses sample market data.",
  "contract.price": "Price",
  "contract.volume": "Volume",
  "contract.change": "Change",
  "empty": "No contracts match",
  "empty.description": "Choose another filter to see contracts.",
  "scalper.back": "Back to F&O",
  "scalper.strategies": "Strategies",
  "scalper.all": "All",
  "scalper.addStrategies": "Add more strategies",
  "scalper.tools": "Scalper tools",
  "scalper.positions": "Positions",
  "scalper.orders": "Orders",
  "scalper.chain": "Option chain",
  "scalper.active": "Active",
  "scalper.activeCount": "{count} active",
  "scalper.pickInstrument": "Change instrument",
  "scalper.pickSegment": "Change segment",
  "scalper.link": "Link both charts",
  "scalper.chartType": "Chart type",
  "scalper.chartTools": "Chart tools",
  "scalper.zoomIn": "Zoom in",
  "scalper.zoomOut": "Zoom out",
  "scalper.timeframe": "5m",
  "scalper.timeframeLabel": "Candle length",
  "scalper.chartLabel": "{name}, today, 5-minute candles",
  "scalper.resize": "Resize the charts",
  "scalper.orderType": "Order type",
  "scalper.market": "Market",
  "scalper.limit": "Limit/Trigger",
  "scalper.buy": "Buy at Mkt",
  "scalper.sell": "Sell at Mkt",
  "scalper.quantity": "Quantity",
  "scalper.lots": "{count} lot",
  "scalper.required": "Req: {amount}",
  "scalper.funds": "Funds: {amount}",
  "tools.range": "Range",
  "tools.zing": "Zing",
  "tools.indicators": "Indicators",
  "tools.drawings": "Drawings",
  "tools.templates": "Templates",
  "tools.settings": "Settings",
  "tools.new": "NEW",
  "tools.search": "Search {section}",
  "tools.yours": "Your indicators",
  "tools.create": "Create",
  "tools.none": "No indicators created yet.",
  "tools.byDash": "Made with DASH Ai",
  "tools.longPressHint": "Long press for more options",
  "tools.showOnChart": "Show on chart",
  "tools.isOnChart": "It’s on this chart",
  "tools.notOnChart": "Not on this chart",
  "tools.openInDash": "Open in DASH",
  "tools.detailsDone": "Done",
  "tools.lemonn": "Lemonn indicators",
  "tools.favourite": "Add {name} to favourites",
  "tools.soon": "Pick Indicators to add one to the chart.",
  "tools.guideTip": "Indicators you created with DASH",
  "tools.indicatorsCount": "Indicators ({count})",
  "tools.clearAll": "Remove all indicators from the chart",
  "tools.onChart": "on the chart",
  "tools.onChartList": "{count} indicators on the chart",
  "tools.add": "Add {name} to the chart",
  "tools.remove": "Remove {name} from the chart",
  "tools.searchPlaceholder": "Search indicators",
  "tools.closeSearch": "Close search",
  "tools.noResults": "No indicators match “{query}”.",
  "scalper.indicatorCount": "{count} indicators on the chart",
  "scalper.refresh": "Reset the chart",
  "tools.createLabel": "Create an indicator with DASH",
  "commodities.popular": "Popular commodities",
  "commodities.options": "Options",
  "commodities.futures": "Futures",
  "commodities.segment": "Contract type",
  "commodities.top": "Top traded",
  "commodities.gainers": "Top gainers",
  "commodities.losers": "Top Losers",
  "commodities.advanced": "Advanced declined",
  "commodities.margin": "Margin / lot : {margin}",
  "commodities.shortcuts": "Commodities",
  "heatmap.bullion": "Bullion",
  "heatmap.energy": "Energy",
  "heatmap.metals": "Metals",
  "picker.title": "Choose options contract",
  "picker.equity": "Equity ({count})",
  "picker.commodities": "Commodities ({count})",
  "picker.all": "All",
  "picker.filter": "Commodity",
  "lot.title": "{name} Summary",
  "lot.back": "Back to F&O",
  "lot.lots": "Gold lots",
  "lot.futures": "Futures",
  "lot.options": "Options",
  "lot.chain": "View option chain",
  "lot.expiry": "Expiry month",
  "lot.active": "Most active",
  "lot.oi": "OI gainers",
  "lot.gainers": "Top gainers",
  "sort.margin": "Margin per lot",
  "sort.title": "Sort by",
  "strategies.segment": "Strategies for",
  "strategies.zing": "Zing Trades",
  "strategies.explore": "Explore",
  "strategies.builtWith": "Built with DASH Ai",
  "strategies.todayReturns": "Today’s Returns",
  "strategies.lastWeek": "Last week",
  "strategies.avgTrades": "Avg. trades",
  "strategies.perDay": "{count} per day",
  "strategies.winRate": "Win rate",
  "strategies.favourite": "Save {name}",
  "strategies.learn": "Learn in 30 Secs",
  "strategies.apply": "Apply",
  "strategies.dayWin": "{day}: profit",
  "strategies.dayLoss": "{day}: loss",
  "strategies.dayFlat": "{day}: no trade",
  "strategies.smartInvest": "Smart Invest",
  "strategies.by": "By {name}",
  "strategies.minDeposit": "Min. deposit",
  "strategies.pnl7": "7 Days P&L",
  "strategies.pnl30": "30 Days P&L",
  "strategies.showPnl": "Show or hide P&L",
  "strategies.aum": "AUM",
  "strategies.slots": "Slots left",
  "strategies.charges": "Monthly charges",
  "strategies.invest": "Invest now",
  "strategies.prebuilt": "Pre-build Strategies",
  "strategies.underlying": "Underlying",
  "strategies.bullish": "Bullish",
  "strategies.bearish": "Bearish",
  "strategies.neutral": "Neutral",
  "strategies.volatile": "Volatile",
  "strategies.pop": "Probability of profit",
  "strategies.funds": "Funds Req: {amount}",
  "strategies.maxProfit": "Max Profit:",
  "strategies.maxLoss": "Max Loss:",
  "strategies.unlimited": "Unlimited",
  "strategies.payoff": "Payoff: loss below the breakeven, profit above it",
  "strategies.quick": "Quick Trade",
  "strategies.beginner": "Beginner friendly",
  "strategies.which": "Which way will",
  "strategies.move": "move?",
  "strategies.up": "Up • Bullish",
  "strategies.down": "Down • Bearish",
  "strategies.pickUnderlying": "Choose underlying",
  "chain.title": "Option chain",
  "chain.back": "Back to F&O",
  "chain.tabs": "Option chain and strategies",
  "chain.addStrategies": "Add more strategies",
  "chain.underlying": "Choose underlying",
  "chain.expiry": "Expiry:",
  "chain.expiryTitle": "Choose expiry",
  "chain.signals": "Zing signals: {count}",
  "chain.greeks": "Greeks",
  "chain.basket": "Basket orders",
  "chain.pcr": "PCR:",
  "chain.maxPain": "Max Pain:",
  "chain.atmIv": "ATM IV:",
  "chain.call": "Call",
  "chain.put": "Put",
  "chain.metric.ltp": "LTP",
  "chain.metric.oi": "OI",
  "chain.metric.oiChange": "OI Chg",
  "chain.metric.iv": "IV",
  "chain.metricTitle": "Show in the price columns",
  "chain.range.0": "All",
  "chain.range.5": "±5",
  "chain.range.10": "±10",
  "chain.rangeTitle": "Strikes to show",
  "chain.rangeOption.0": "All strikes",
  "chain.rangeOption.5": "5 strikes around the spot",
  "chain.rangeOption.10": "10 strikes around the spot",
  "chain.tag.support": "OI Support",
  "chain.tag.resistance": "OI Resistance",
  "chain.tag.maxPain": "Max Pain",
  "chain.spot": "Spot price",
  "chain.select": "{action} {strike} {side} at {price}",
  "chain.buyBadge": "B",
  "chain.sellBadge": "S",
  "chain.contract": "{strike} {side}",
  "chain.orderOptions": "Set Limit",
  "chain.tpsl": "TP/SL",
  "chain.balance": "Balance :",
  "chain.req": "Req :",
  "chain.quantity": "Quantity",
  "chain.lots": "{count} lots",
  "chain.lot": "1 lot",
  "chain.buy": "Buy",
  "chain.sell": "Sell",
  "chain.placed": "{action} order placed · {contract}",
  "chain.oiLegend": "Call OI {call} · Put OI {put}",
  "chain.illiquid": "ILLIQUID contract",
  "chain.illiquidIcon": "ILLIQUID",
  "chain.illiquidMore": "Why can’t I trade this?",
  "chain.illiquidLabel": "{strike} {side}, illiquid: can’t be traded",
  "asset.back": "Back",
  "asset.watchlist": "Add to watchlist",
  "asset.illiquid": "ILLIQUID",
  "asset.chart": "{name} {contract}, today, 5-minute candles",
  "asset.tools": "Chart tools",
  "asset.range": "Range",
  "asset.interval": "Interval",
  "asset.intervalValue": "5m",
  "asset.indicators": "Indicators",
  "asset.drawings": "Drawings",
  "asset.settings": "Settings",
  "asset.chain": "Option chain",
  "asset.info": "Contract Info",
  "asset.daysToExpiry": "Days to Expiry",
  "asset.days": "{count} Days",
  "asset.margin": "Margin (Buy/Sell)",
  "asset.leverage": "Leverage (Buy/Sell)",
  "asset.priceUnit": "Price unit",
  "asset.futures": "{name} Futures",
  "asset.performance": "Performance",
  "asset.low": "24H Low",
  "asset.high": "24H High",
  "asset.ltp": "Last Traded Price :",
  "asset.prevClose": "Prev. Close",
  "asset.open": "Open",
  "asset.upperCircuit": "Upper Circuit",
  "asset.lowerCircuit": "Lower Circuit",
  "asset.tickSize": "Tick Size",
  "asset.unit": "Price Unit",
  "asset.trading": "Trading details",
  "asset.lotSize": "Lot Size",
  "asset.minLot": "Minimum Lot",
  "asset.lastQty": "Last Traded Qty",
  "asset.lastTime": "Last Traded Time",
  "asset.expiry": "Original Expiry date",
  "asset.lastTradingDate": "Last Trading Date",
  "asset.depth": "Market Depth",
  "asset.bid": "Bid Price",
  "asset.ask": "Ask Price",
  "asset.qty": "Quantity",
  "asset.total": "Total",
  "asset.buy": "Buy",
  "asset.sell": "Sell",
  "asset.illiquidNote": "Trading is not allowed as this contract is ILLIQUID",
  "contractSheet.label": "{name}: buy or sell",
  "contractSheet.open": "Open {name}",
  "contractSheet.expiry": "{date}",
  "illiquid.title": "What does illiquidity mean?",
  "illiquid.forContract": "{contract} is ILLIQUID right now",
  "illiquid.general": "Some contracts barely trade",
  "illiquid.point1": "Very few people are buying or selling it",
  "illiquid.point2": "Buy and sell prices are far apart, which increases chances of slippage",
  "illiquid.point3": "To protect you, Lemonn doesn’t allow orders in it",
  "illiquid.ok": "Got it",
  "illiquid.open": "What does illiquidity mean?",
  "chain.illiquidSub": "Can’t be traded",
  "order.back": "Back",
  "order.switch": "Change contract",
  "order.product": "Product",
  "order.delivery": "Delivery",
  "order.intraday": "Intraday",
  "order.type": "Order type",
  "order.market": "Market",
  "order.limit": "Limit",
  "order.sl": "SL",
  "order.validity": "Validity",
  "order.quantity": "Quantity",
  "order.lots": "Lots",
  "order.unitSwitch": "Switch between quantity and lots",
  "order.lotHint": "({lot} = 1 Lot)",
  "order.limitPrice": "Limit",
  "order.trigger": "Trigger Price",
  "order.offset": "Distance from the market price",
  "order.tpsl": "Set TPSL",
  "order.margin": "Margin:",
  "order.leverage": "Leverage:",
  "order.autoClose": "This position will auto close by {time}",
  "order.available": "Avail.",
  "order.required": "Req",
  "order.buy": "Buy",
  "order.sell": "Sell",
  "order.placed": "{side} order placed · {name} {contract}"
}
```

### `src/flows/fno/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

export const t = makeCopy('fno', copy)
```

### `src/flows/fno/data.ts`

```ts
import type { ChartCandle } from '@l3/components/Chart'

/** Snapshot examples from Figma 11569:41100; these are not live quotes. */
export const indices = [
  { name: 'NIFTY 50', expiry: 'Expires Tue', price: '51,663.15', change: 252.89, percent: '0.05%' },
  { name: 'SENSEX', expiry: 'Expires 25 Aug', price: '51,663.15', change: 252.89, percent: '0.05%' },
  { name: 'GOLD MINI', expiry: 'Expires 25 Aug', price: '51,663.15', change: 252.89, percent: '0.05%' },
]

export type Contract = { id: string; name: string; description: string; price: number; change: number; volume: number; side?: 'call' | 'put' }
export const options: Contract[] = Array.from({ length: 4 }, (_, i) => ({ id: `option-${i}`, name: 'NIFTY 19400 CE', description: 'Call | 14 Jan 26', price: 417, change: 0.1, volume: 12400 + i * 1200, side: 'call' }))
export const futures: Contract[] = ['POWERINDIA', 'PYTM', 'MCX', 'TITAN'].map((name, i) => ({ id: `future-${i}`, name, description: 'Fut | 14 Jan 26', price: 417, change: 0.1, volume: 18600 + i * 2300 }))
export const stockOptions: Contract[] = futures.map((c) => ({ ...c, id: `${c.id}-call`, name: `${c.name} 400 CE`, description: 'Call | 14 Jan 26', side: 'call' }))
export type Watchlist = { id: string; name: string; count: number }
export const watchlists: Watchlist[] = [
  { id: 'special', name: 'Special 25', count: 5 },
  { id: 'banking', name: 'Banking watchlist', count: 4 },
  { id: 'favourites', name: 'Favourites', count: 6 },
]
/** The source deliberately repeats JSWSTEEL; up/down colour follows each tile's surface. */
export const heatmap = Array.from({ length: 9 }, (_, i) => ({ id: `heat-${i}`, name: 'JSWSTEEL', change: -0.27, price: '2,817.40', tone: (i % 3 === 1 ? 'up' : 'down') as 'up' | 'down' }))

const closes = [24980,24970,24994,24982,25000,24988,24976,24991,24997,24989,25002,25020,25012,25028,25035,25026,25050,25066,25054,25075,25088,25110,25130,25118,25142,25132,25155,25140,25162,25150,25133,25144,25124,25116,25100,25090,25103,25084,25110,25120]
export const priceCandles: ChartCandle[] = closes.map((close, i) => {
  const open = i ? closes[i - 1] : close - 12
  return { open, close, high: Math.max(open, close) + 11, low: Math.min(open, close) - 10, volume: 24 + (i * 37) % 75 }
})
/** Other metric series are illustrative prototype states, not analytics. */
export function chartSeries(metric: string, index: string): ChartCandle[] {
  const factor = index === 'SENSEX' ? 3 : index === 'BANK NIFTY' ? 2 : 1
  return priceCandles.map((c, i) => {
    const base = metric === 'price' ? c.close * factor : metric === 'pcr' ? 0.7 + i / 100 : metric === 'oi' ? 12000 + i * 80 : 100 + Math.sin(i / 5) * 40
    const delta = metric === 'price' ? (c.close - c.open) * factor : base * 0.01
    return { open: base - delta, close: base, high: base + Math.abs(delta) + (metric === 'price' ? 10 : base * 0.01), low: base - Math.abs(delta) - (metric === 'price' ? 10 : base * 0.01), volume: c.volume }
  })
}

/**
 * Scalper: two linked intraday panes (5-minute candles, 11:30 → 15:25) traced from the live app's screenshot —
 * NIFTY 50 spot and the NIFTY 27 OCT 22750 call. Illustrative prototype data, not live quotes. Each candle opens at
 * the previous close; the wick sizes vary a little so the panes read like a real session. The session's high and low
 * are pinned to the screenshot's markers (22,753.20 / 22,541.55 and 123.25 / 52.35).
 */
export type ScalperInstrument = {
  /** The contract's name, e.g. "NIFTY 50". */
  name: string
  /** What the first pane shows (Spot / Futures); the option pane has none. */
  segment?: string
  /** Call / Put, for an option. */
  side?: string
  price: number
  change: number
  percent: number
  candles: ChartCandle[]
  /** The first candle's time and the candle length, for the time axis. */
  start: string
  minutes: number
}

const spotCloses = [22556, 22545, 22562, 22584, 22596, 22606, 22598, 22589, 22576, 22593, 22608, 22622, 22634, 22617, 22598, 22582, 22574, 22590, 22606, 22620, 22652, 22641, 22655, 22646, 22662, 22653, 22646, 22658, 22650, 22704, 22690, 22673, 22668, 22684, 22679, 22694, 22706, 22712, 22691, 22708, 22714, 22719, 22716, 22723, 22725, 22721, 22728, 22753.2]
const optionCloses = [56, 61, 59, 66, 64, 58, 61, 66, 59, 67, 73, 69, 62, 58, 55, 59, 63, 68, 74, 70, 79, 83, 78, 86, 82, 90, 84, 79, 121, 111, 96, 91, 95, 92, 102, 99, 104, 96, 88, 100, 103, 101, 104, 106, 104, 107, 106, 108.2]

function sessionCandles(closes: number[], wick: number, pins: { high: [number, number]; low: [number, number] }): ChartCandle[] {
  return closes.map((close, i) => {
    const open = i ? closes[i - 1] : close + wick
    const reach = wick * (1 + ((i * 7) % 5) / 4)
    const last = i === closes.length - 1
    let high = last ? Math.max(open, close) : Math.max(open, close) + reach
    let low = Math.min(open, close) - reach
    // The session's high and low are the screenshot's: no other wick goes past them.
    high = i === pins.high[0] ? pins.high[1] : Math.min(high, pins.high[1] - wick / 2)
    low = i === pins.low[0] ? pins.low[1] : Math.max(low, pins.low[1] + wick / 2)
    return { open, close, high, low }
  })
}

export const scalperSpot: ScalperInstrument = {
  name: 'NIFTY 50', segment: 'Spot', price: 22753.2, change: 153.2, percent: 0.68,
  candles: sessionCandles(spotCloses, 6, { high: [47, 22753.2], low: [1, 22541.55] }),
  start: '11:30', minutes: 5,
}

export const scalperOption: ScalperInstrument = {
  name: 'NIFTY 27OCT 22750', side: 'Call', price: 108.2, change: 41.75, percent: 62.83,
  candles: sessionCandles(optionCloses, 2, { high: [28, 123.25], low: [14, 52.35] }),
  start: '11:40', minutes: 5,
}

/** The Lemonn indicators in the chart-tools sheet (the live app's list, alphabetical). */
export const lemonnIndicators = ['5 EMA Sell - Power Of Stocks', '5/20 EMA by AbhishekX Trades', 'ADX', 'ALMA', 'ASP by TradersPath Academy', 'ATR', 'Bollinger Band Width', 'Bollinger Bands', 'CPR', 'DEMA', 'EMA', 'Ichimoku Cloud', 'MACD', 'Nifty 5-Star Indicator by Dr. Gokul Chhabra', 'Opening Range Breakout (ORB)', 'RSI', 'Supertrend', 'VWAP']
```

### `src/flows/fno/index.tsx`

```tsx
import type { Flow, Go } from '../types'
import { Home, type HomePart, type Product } from './screens/Home'
import { LotSummary } from './commodities/screens/LotSummary'
import { AssetPage } from './commodities/screens/AssetPage'
import { goldMiniAsset, illiquidAsset } from './commodities/data'
import { OptionChain } from './option-chain/screens/OptionChain'
import { OrderPad } from './order-pad/screens/OrderPad'
import type { Segment } from './strategies/data'
import { Scalper } from './screens/Scalper'

/**
 * Each product tab is its own screen, all in group 'home': one page in different states, so a tab switch keeps the
 * header and the product tabs in place and only the content under the tabs slides (Home animates it).
 */
/** Back to wherever the asset page was opened from (option chain, Gold Summary, Search…); `fallback` when opened directly. */
const backOr = (go: Go, fallback: string) => { if (window.history.length > 1) window.history.back(); else go(fallback) }

const tabScreen = (product: Product, segment?: Segment) => product === 'equity' ? 'fno-01' : product === 'commodities' ? 'fno-08' : segment === 'commodities' ? 'fno-16' : 'fno-15'
type HomeOptions = { scrollTo?: HomePart; product?: Product; segment?: Segment; picker?: 'equity' | 'commodities' }
const home = (go: Go, scrollTo?: HomePart, options: HomeOptions = {}) => <Home scrollTo={scrollTo} product={options.product} segment={options.segment} picker={options.picker} onProduct={(product, segment) => go(tabScreen(product, segment))} onCommodity={() => go('fno-12')} onHome={() => go('stocks-01')} onSearch={() => go('search-25')} onProfile={() => go('profile-01')} onWallet={() => go('deposit-01')} onDash={() => go('dash-02')} onOptions={() => go('search-26')} onFutures={() => go('search-27')} onChain={() => go('fno-17')} onScalper={() => go('fno-05')} />

export const fno: Flow = {
  id: 'fno', title: 'F&O',
  description: 'Equity F&O home: P&L, indices, chart metrics, watchlists, Smart Options, Futures Heatmap and Smart Futures.',
  figmaFile: 'nLs24dTJdPz9A5pu3AWMbe',
  screens: [
    { id: 'fno-01', group: 'home', name: 'Equity home', figma: '11569:41100', tab: true, note: 'From the main F&O tab. Home returns to Stocks; DASH, Search, Profile and Wallet open their existing flows. Selectors, chart metrics, filters, sorting and watchlist creation work locally. Destinations outside this frame open an explanatory sheet.', render: (go) => home(go) },
    { id: 'fno-02', group: 'home', name: 'Home · watchlists & Smart Options', figma: '11569:41100', tab: true, note: 'The same long screen, scrolled to watchlists.', render: (go) => home(go, 'watchlists') },
    { id: 'fno-03', group: 'home', name: 'Home · Futures Heatmap', figma: '11569:41100', tab: true, render: (go) => home(go, 'heatmap') },
    { id: 'fno-04', group: 'home', name: 'Home · Smart Futures', figma: '11569:41100', tab: true, render: (go) => home(go, 'futures') },
    { id: 'fno-05', name: 'Scalper', figma: '', note: 'From ScalpPro on F&O home or the Scalper bottom-nav tab. The chart-tools sheet groups personal DASH AI indicators separately from Lemon indicators.', render: (go) => <Scalper onBack={() => go('fno-01')} onCreateIndicator={() => go('dash-20')} /> },
    { id: 'fno-06', group: 'scalper', name: 'Scalper · DASH indicator', figma: '', note: 'From DASH AI’s View indicator. Opens the chart-tools sheet directly on Indicators, the saved DASH AI indicator under Your indicators with a focus guide. Tap rows to add / remove indicators (several at once); search filters the list.', render: (go) => <Scalper onBack={() => go('fno-01')} createdIndicator="Supertrend (10, 3) with EMA 20" onCreateIndicator={() => go('dash-20')} /> },
    { id: 'fno-07', group: 'scalper', name: 'Scalper · indicator applied', figma: '', note: 'With the saved DASH AI indicator on the chart: “1 ▾” at the chart’s top-left and illustrative EMA 9 / 21 lines on the NIFTY 50 candles.', render: (go) => <Scalper onBack={() => go('fno-01')} createdIndicator="Supertrend (10, 3) with EMA 20" openIndicators={false} initialIndicator="Supertrend (10, 3) with EMA 20" onCreateIndicator={() => go('dash-20')} /> },
    { id: 'fno-08', group: 'home', name: 'Commodities home', figma: '6754:63637', tab: true, note: 'The Commodities product tab. Gold / Silver / Crude Oil / Natural Gas shortcuts open the Lot summary (Gold Summary). The chart’s instrument selector (“Gold”) opens the contract picker. Popular commodities: Options ⇕ Futures switch; Futures Heatmap: Bullion / Energy / Metals.', render: (go) => home(go, undefined, { product: 'commodities' }) },
    { id: 'fno-09', group: 'home', name: 'Commodities · heatmap & Smart Futures', figma: '6754:63637', tab: true, note: 'The same long screen, scrolled to the Futures Heatmap.', render: (go) => home(go, 'heatmap', { product: 'commodities' }) },
    { id: 'fno-10', group: 'home', name: 'Contract picker · Commodities', figma: '6754:65111', tab: true, note: 'From the chart’s “Gold ⇕”. Equity / Commodities tabs in the sheet header’s bottom slot, commodity chips (All, Gold, Silver …) under them; contracts grouped by commodity as radio rows (Gold Mini tagged “Lowest Margin”). Picking one updates the chart and closes the sheet.', render: (go) => home(go, undefined, { product: 'commodities', picker: 'commodities' }) },
    { id: 'fno-11', group: 'home', name: 'Contract picker · Equity', figma: '6754:65054', tab: true, note: 'The same sheet on its Equity tab: the 8 index contracts.', render: (go) => home(go, undefined, { product: 'commodities', picker: 'equity' }) },
    { id: 'fno-12', group: 'lot', name: 'Gold Summary · by price', figma: '6754:65113', note: 'From a commodity shortcut on fno-08. Gold lot tabs (Gold, Gold Mini, Gold Guinea, Gold Ten, Gold Petal) in the Actionbar’s bottom slot; Futures (View all) and Options (View option chain, expiry month, category pills, Filter, sort). The sort opens a sheet: By Price · By Volume · Margin per lot.', render: (go) => <LotSummary onBack={() => go('fno-08')} onChain={() => go('fno-17')} onAsset={(illiquid) => go(illiquid ? 'fno-22' : 'fno-21')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-13', group: 'lot', name: 'Gold Summary · by volume', figma: '6754:65288', note: 'Sorted by volume: each option shows its traded volume, no change.', render: (go) => <LotSummary sort="volume" onBack={() => go('fno-08')} onChain={() => go('fno-17')} onAsset={(illiquid) => go(illiquid ? 'fno-22' : 'fno-21')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-14', group: 'lot', name: 'Gold Summary · margin per lot', figma: '6754:65444', note: 'Sorted by margin per lot: each option shows the margin for one lot, no change.', render: (go) => <LotSummary sort="margin" onBack={() => go('fno-08')} onChain={() => go('fno-17')} onAsset={(illiquid) => go(illiquid ? 'fno-22' : 'fno-21')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-15', group: 'home', name: 'Strategies · Equity', figma: '6754:64178', tab: true, note: 'The Strategies product tab with Equity selected in the pill group: shortcuts, Zing Trades, Smart Invest, Pre-build Strategies (Nifty 50 ⇕, Bullish / Bearish / Neutral / Volatile), Quick Trade. Card footer buttons stay Small (32) as in Figma.', render: (go) => home(go, undefined, { product: 'strategies', segment: 'equity' }) },
    { id: 'fno-16', group: 'home', name: 'Strategies · Commodities', figma: '6754:64607', tab: true, note: 'The same tab with Commodities selected: commodity Smart Invest baskets, GOLD as the underlying.', render: (go) => home(go, undefined, { product: 'strategies', segment: 'commodities' }) },
    { id: 'fno-17', group: 'chain', name: 'Option chain', figma: '11630:16785', note: 'From Option chain on the F&O chart (any product tab) or the Option Chain bottom-nav tab; Back → F&O home. Opens scrolled to the spot pill. BankNifty ▾ and Expiry ▾ open sheets; Σ shows delta instead of the day change; the basket and Zing tile open the explanatory sheet. Column heads: Call / Put metric (LTP, OI, OI Chg, IV) and the strike range (All, ±5, ±10). Tap a price to Buy, tap it again to Sell, a third time to clear.', render: (go) => <OptionChain onBack={() => go('fno-01')} onAsset={() => go('fno-21')} /> },
    { id: 'fno-18', group: 'chain', name: 'Option chain · Buy selected', figma: '11630:16184', note: 'A put price tapped once: B badge, green wash, the order dock with the contract, Balance / Req, quantity in lots and Buy (brand). Buy places a sample order (toast) and clears the selection.', render: (go) => <OptionChain initialSelection={{ strike: 25400, side: 'put', action: 'buy', ltp: 160.54 }} onBack={() => go('fno-01')} onAsset={() => go('fno-21')} /> },
    { id: 'fno-19', group: 'chain', name: 'Option chain · Sell selected', figma: '11695:26269', note: 'The same put tapped again: S badge, red wash, Sell (secondary) in the dock; Req becomes the margin per lot.', render: (go) => <OptionChain initialSelection={{ strike: 25400, side: 'put', action: 'sell', ltp: 160.54 }} onBack={() => go('fno-01')} onAsset={() => go('fno-21')} /> },
    { id: 'fno-20', group: 'chain', name: 'Option chain · illiquid contract', figma: '', note: 'Illiquid contracts (deep in-the-money calls, far out-of-the-money puts) carry a block icon beside the price, like Groww. Unlike Groww, a tap never selects them: a tooltip opens just above — “ILLIQUID contract” / “Can’t be traded” ⓘ; tapping away closes it, ⓘ opens a sheet with why it’s blocked, its traded lots and buy–sell gap, and a tip. Opens on the 25,700 put with the tooltip up.', render: (go) => <OptionChain initialIlliquid={{ strike: 25700, side: 'put' }} onBack={() => go('fno-01')} onAsset={() => go('fno-21')} /> },
    { id: 'fno-21', group: 'asset', name: 'Asset page · Gold MINI', figma: '6754:61613', note: 'A commodity contract page. Entry (one of several): the contract name in the option chain order dock (“25,400 Put ›”). Back returns where it came from; Option chain → fno-17; Buy / Sell open the sample sheet. Equity contracts get their own (similar) page later.', render: (go) => <AssetPage asset={goldMiniAsset} onBack={() => backOr(go, 'fno-18')} onChain={() => go('fno-17')} onScalper={() => go('fno-05')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-22', group: 'asset', name: 'Asset page · illiquid', figma: '6754:61613', note: 'Product rule (commodities only): an illiquid contract’s page shows the ILLIQUID tag next to its name and Buy / Sell greyed out, with “Trading is not allowed as this contract is illiquid” above them — whatever screen it was opened from.', render: (go) => <AssetPage asset={illiquidAsset} onBack={() => backOr(go, 'fno-17')} onChain={() => go('fno-17')} onScalper={() => go('fno-05')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-23', group: 'lot', name: 'Gold Summary · Buy / Sell sheet', figma: '', note: 'Tapping any futures or option card opens the Buy / Sell sheet (live app, 2026-10-29): name › (asset page fno-21) · price, expiry · change, Buy (brand) / Sell (secondary).', render: (go) => <LotSummary initialSheet="lo-0" onBack={() => go('fno-08')} onChain={() => go('fno-17')} onAsset={(illiquid) => go(illiquid ? 'fno-22' : 'fno-21')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-24', group: 'lot', name: 'Gold Summary · illiquid sheet', figma: '', note: 'Product rule (commodities): an illiquid contract carries the ILLIQUID tag on its card (edge case — illiquid contracts shouldn’t be listed, but the state is built) and in the sheet; Buy / Sell are greyed out with “Trading is not allowed as this contract is illiquid”. Only the name › (asset page fno-22) or tapping outside works.', render: (go) => <LotSummary initialSheet="lo-5" onBack={() => go('fno-08')} onChain={() => go('fno-17')} onAsset={(illiquid) => go(illiquid ? 'fno-22' : 'fno-21')} onOrder={(side) => go(side === 'buy' ? 'fno-25' : 'fno-29')} /> },
    { id: 'fno-25', group: 'order', name: 'Order pad · Buy · Market', figma: '8671:18433', note: 'Commodity option chain order pad (other order pads differ a little). From Buy on the commodity asset page or the Gold Summary Buy / Sell sheet. Delivery / Intraday tabs, Market / Limit / SL pills, Quantity (⇕ lots) in steps of one lot, Set TPSL, Avail. · Req, Buy. Placing shows a sample toast; no order is sent.', render: (go) => <OrderPad side="buy" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-26', group: 'order', name: 'Order pad · Buy · Limit', figma: '8671:18433', note: 'Limit adds the validity (Day ⇕ → Day / IOC) and a limit price row with a % stepper from the market price.', render: (go) => <OrderPad side="buy" type="limit" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-27', group: 'order', name: 'Order pad · Buy · SL', figma: '8671:18433', note: 'SL adds a trigger price row above the limit row.', render: (go) => <OrderPad side="buy" type="sl" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-28', group: 'order', name: 'Order pad · Buy · Intraday', figma: '8671:18433', note: 'Intraday: “This position will auto close by 11:30 PM” above the dock.', render: (go) => <OrderPad side="buy" product="intraday" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-29', group: 'order', name: 'Order pad · Sell · Market', figma: '8671:18433', note: 'Sell adds Margin · Leverage (grey strip) above the quantity; the action is Sell (red).', render: (go) => <OrderPad side="sell" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-30', group: 'order', name: 'Order pad · Sell · SL', figma: '8671:18433', render: (go) => <OrderPad side="sell" type="sl" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-31', group: 'order', name: 'Order pad · Sell · Intraday', figma: '8671:18433', render: (go) => <OrderPad side="sell" product="intraday" onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-32', group: 'order', name: 'Order pad · Buy · ILLIQUID (edge case)', figma: '8671:18433 + product rule', note: 'Should never be reached — every entry point blocks illiquid contracts — but if one slips through: ILLIQUID tag in the header (tap → “What does illiquidity mean?”), the blocked note in the dock (tap → same sheet) and Buy disabled. Inputs stay usable.', render: (go) => <OrderPad side="buy" illiquid onBack={() => backOr(go, 'fno-21')} /> },
    { id: 'fno-33', group: 'order', name: 'Order pad · Sell · ILLIQUID (edge case)', figma: '8671:18433 + product rule', note: 'The same edge case on the Sell side: Sell disabled.', render: (go) => <OrderPad side="sell" illiquid onBack={() => backOr(go, 'fno-21')} /> },
  ],
}
```

### `src/flows/fno/option-chain/components/OrderDock.module.css`

```css
/* Option chain order dock (Figma 11630:16715) on L3 tokens. */
.dock { background: var(--l3-surface-primary); box-shadow: var(--l3-shadow-elevation-high); }
.header { display: flex; align-items: center; gap: var(--l3-spacing-04); height: var(--app-size-chain-dock-header); padding-inline: var(--l3-spacing-16) var(--l3-spacing-08); border-bottom: 1px solid var(--l3-border-light); }
/* A wash of the action's colour from the left edge (Figma: green-50 → white by 30%). */
.header[data-action='buy'] { background: linear-gradient(90deg, var(--l3-surface-accent-indicator-up-light), var(--l3-surface-primary) 30%); }
.header[data-action='sell'] { background: linear-gradient(90deg, var(--l3-surface-accent-indicator-down-light), var(--l3-surface-primary) 30%); }
.badge { display: inline-grid; place-items: center; flex: none; min-width: var(--l3-size-16); height: var(--l3-size-16); padding-inline: var(--l3-spacing-04); border-radius: var(--l3-radius-04); font: var(--l3-text-heading-10); color: var(--l3-content-inverted); }
.badge[data-action='buy'] { background: var(--l3-surface-accent-indicator-up-default); }
.badge[data-action='sell'] { background: var(--l3-surface-accent-indicator-down-default); }
.contract.contract { font: var(--l3-text-heading-14); margin-right: auto; }
.options.options { font: var(--l3-text-label-12); }
.bullet { color: var(--l3-content-tertiary); }
.body { display: flex; flex-direction: column; gap: var(--l3-spacing-16); padding: var(--l3-spacing-12) var(--l3-spacing-16) var(--l3-spacing-16); }
.funds { display: flex; justify-content: space-between; font: var(--l3-text-label-12); }
.funds strong { font: var(--l3-text-heading-12); }
.muted { color: var(--l3-content-tertiary); }
.underline { text-decoration: underline; }
.actions { display: grid; grid-template-columns: 1fr 1fr; gap: var(--l3-spacing-16); align-items: center; }
/* The quantity sits in a 48-tall bordered box (Figma 11630:16746): − and + at the ends (28 circles), value + lots between. */
.stepperBox { display: flex; align-items: center; height: var(--l3-size-48); padding: var(--l3-spacing-06) var(--l3-spacing-08); border: 1px solid var(--l3-border-light); border-radius: var(--l3-radius-12); }
.stepperBox > * { flex: 1; justify-content: space-between; }
.stepperBox button { width: var(--l3-size-28); height: var(--l3-size-28); }
```

### `src/flows/fno/option-chain/components/OrderDock.tsx`

```tsx
import { useState } from 'react'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { Stepper } from '@l3/components/Stepper'
import { msChevronRight } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import { t } from '../../copy'
import { balance, sellMarginPerLot, type Action, type Side } from '../data'
import styles from './OrderDock.module.css'

/** The contract picked in the chain and whether it's a buy or a sell. */
export type Selection = { strike: number; side: Side; action: Action; ltp: number }

type Props = { selection: Selection; lotSize: number; onContract: () => void; onOptions: () => void; onPlace: (action: Action) => void }

/**
 * Order dock (Figma 11630:16715): B / S badge + contract (opens its details) · Set Limit • TP/SL; Balance and the funds
 * this order needs (buy = premium × quantity, sell = margin per lot); quantity in lots (L3 Stepper) and Buy (brand) or
 * Sell (secondary). The header carries a wash of the action's colour from the left.
 */
export function OrderDock({ selection, lotSize, onContract, onOptions, onPlace }: Props) {
  const [quantity, setQuantity] = useState(lotSize)
  const lots = quantity / lotSize
  const required = selection.action === 'buy' ? selection.ltp * quantity : sellMarginPerLot * lots
  const contract = t('chain.contract', { strike: selection.strike.toLocaleString('en-IN'), side: t(`chain.${selection.side}`) })
  return <div className={styles.dock} data-surface="primary">
    <div className={styles.header} data-action={selection.action}>
      <span className={styles.badge} data-action={selection.action} aria-hidden>{t(selection.action === 'buy' ? 'chain.buyBadge' : 'chain.sellBadge')}</span>
      <Button variant="ghost" size="sm" iconRight={<Icon icon={msChevronRight} size={16} />} onClick={onContract} className={styles.contract}>{contract}</Button>
      <Button variant="ghost" size="sm" iconRight={<Icon icon={msChevronRight} size={16} />} onClick={onOptions} className={styles.options}>{t('chain.orderOptions')} <span className={styles.bullet} aria-hidden>•</span> {t('chain.tpsl')}</Button>
    </div>
    <div className={styles.body}>
      <div className={styles.funds}>
        <span><span className={styles.muted}>{t('chain.balance')}</span> <strong>{inr(balance, 0)}</strong></span>
        <span><span className={[styles.muted, styles.underline].join(' ')}>{t('chain.req')}</span> <strong>{inr(required, 0)}</strong></span>
      </div>
      <div className={styles.actions}>
        <div className={styles.stepperBox}><Stepper label={t('chain.quantity')} value={quantity} onChange={setQuantity} min={lotSize} step={lotSize} size="lg" fullWidth sublabel={lots === 1 ? t('chain.lot') : t('chain.lots', { count: lots })} /></div>
        <Button variant={selection.action === 'buy' ? 'brand' : 'secondary'} size="lg" fullWidth onClick={() => onPlace(selection.action)}>{t(selection.action === 'buy' ? 'chain.buy' : 'chain.sell')}</Button>
      </div>
    </div>
  </div>
}
```

### `src/flows/fno/option-chain/data.ts`

```ts
/**
 * Option chain sample (Figma 11695:26269). Illustrative prototype data, not live quotes: strikes 100 apart around the
 * spot, call premiums falling and put premiums rising with the strike, open interest peaking near the support /
 * resistance strikes.
 */

export type Side = 'call' | 'put'
export type Action = 'buy' | 'sell'
/** What the LTP columns show (the column header switch). */
export type Metric = 'ltp' | 'oi' | 'oiChange' | 'iv'

export type OptionQuote = {
  /** Last traded price, ₹. */
  ltp: number
  /** Day change, percent. */
  change: number
  /** Open interest, contracts. */
  oi: number
  /** Change in open interest today, percent. */
  oiChange: number
  /** Implied volatility, percent. */
  iv: number
  /**
   * Too few trades to deal in safely — the app blocks orders in it (Groww shows a ⃠ icon and lets you pick it; Lemonn
   * shows the icon and a tooltip instead of selecting it). Deep in-the-money calls and far out-of-the-money puts here.
   */
  illiquid?: boolean
  /** Lots traded today. */
  volume: number
  /** Gap between the best buy and sell price, as a percent of the price. */
  spread: number
}
export type StrikeRow = { strike: number; call: OptionQuote; put: OptionQuote }

export type Underlying = { id: string; name: string; spot: number; change: number; lotSize: number; maxPain: number; pcr: number; atmIv: number }
export const underlyings: Underlying[] = [
  { id: 'banknifty', name: 'BankNifty', spot: 25300.4, change: 5.56, lotSize: 35, maxPain: 25400, pcr: 0.68, atmIv: 26.1 },
  { id: 'nifty', name: 'Nifty 50', spot: 25300.4, change: 0.42, lotSize: 75, maxPain: 25300, pcr: 0.92, atmIv: 12.4 },
  { id: 'finnifty', name: 'FinNifty', spot: 25300.4, change: -0.31, lotSize: 65, maxPain: 25200, pcr: 1.08, atmIv: 14.8 },
  { id: 'sensex', name: 'Sensex', spot: 25300.4, change: 0.35, lotSize: 20, maxPain: 25400, pcr: 0.81, atmIv: 13.2 },
]
export const expiries = ['09 Oct', '16 Oct', '23 Oct', '30 Oct', '27 Nov']
/** The strike-range choice (column header "All"): every strike, or N strikes either side of the spot. */
export const ranges = [0, 5, 10] as const
export type Range = (typeof ranges)[number]

/** Call OI peaks at the resistance strike above the spot; put OI at the support strike below it (lakh contracts). */
const callOi = [8, 9, 11, 14, 18, 26, 31, 35, 58, 24, 19, 12, 9]
const putOi = [14, 21, 28, 33, 54, 38, 22, 16, 11, 8, 6, 5, 4]

export function chainFor(underlying: Underlying): StrikeRow[] {
  return Array.from({ length: 13 }, (_, i) => {
    const strike = 24700 + i * 100
    const callIntrinsic = Math.max(underlying.spot - strike, 0)
    const putIntrinsic = Math.max(strike - underlying.spot, 0)
    const time = 160 * Math.exp(-Math.abs(strike - underlying.spot) / 420)
    return {
      strike,
      call: { ltp: round(callIntrinsic + time), change: round(19 - i * 2.6), oi: callOi[i] * 100000, oiChange: round(4 + (i % 4) * 3.1), iv: round(underlying.atmIv + Math.abs(i - 6) * 0.6), illiquid: i < 3, volume: i < 3 ? 4 + i * 3 : 1800 + i * 240, spread: i < 3 ? round(9.4 - i * 1.7) : round(0.4 + Math.abs(i - 6) * 0.08) },
      put: { ltp: round(putIntrinsic + time * 0.9), change: round(-45.68 + i * 4.2), oi: putOi[i] * 100000, oiChange: round(-2 + (i % 3) * 2.4), iv: round(underlying.atmIv + Math.abs(i - 6) * 0.7), illiquid: i > 9, volume: i > 9 ? 3 + (12 - i) * 4 : 2100 - i * 90, spread: i > 9 ? round(7.8 + (i - 10) * 1.9) : round(0.5 + Math.abs(i - 6) * 0.09) },
    }
  })
}

const round = (n: number) => Math.round(n * 100) / 100

/** Funds shown in the order panel (sample account). */
export const balance = 10000
/** Margin to sell one lot (sample) — selling an option blocks margin, buying pays the premium. */
export const sellMarginPerLot = 1250
```

### `src/flows/fno/option-chain/screens/OptionChain.module.css`

```css
/* Option chain (Figma 11695:26269) — flow-only layout on L3 tokens. */

/* ---- Top: back · ribbon "Option chain" · Add more strategies; selectors; stats; column heads ---- */
.top { flex: none; background: var(--l3-surface-secondary); }
/* The ribbon's baseline runs the full width under the header; the selected tab's fill covers it under itself. */
.header { display: flex; align-items: flex-end; height: var(--l3-size-48); padding-left: var(--l3-spacing-06); box-shadow: inset 0 -1px 0 var(--l3-border-intense); }
.back.back { align-self: center; margin-top: var(--l3-spacing-04); }
.ribbon.ribbon { flex: none; padding-inline: var(--l3-spacing-12) var(--l3-spacing-16); background: transparent; box-shadow: none; }
/* Figma: the selected tab is white with a light outline, no flares, so it opens into the white selector row. */
.ribbon.ribbon [role='tab'][aria-selected='true'] { --tab-surface: var(--l3-surface-default); --tab-border: var(--l3-border-light); --tab-font: var(--l3-text-label-12); }
.ribbon.ribbon [role='tab'][aria-selected='true']::before { display: none; }
.addStrategies { display: inline-flex; align-items: center; gap: var(--l3-spacing-06); align-self: center; margin-top: var(--l3-spacing-04); padding: 0; border: 0; background: none; color: var(--l3-content-secondary); font: var(--l3-text-label-12); cursor: pointer; }
.addRing { display: grid; place-items: center; width: var(--l3-size-16); height: var(--l3-size-16); border-radius: var(--l3-radius-full); box-shadow: inset 0 0 0 1px var(--l3-border-dark); color: var(--l3-content-primary); }

.selectors { display: flex; align-items: center; gap: var(--l3-spacing-12); height: var(--l3-size-48); padding-left: var(--l3-spacing-12); background: var(--l3-surface-default); border-bottom: 1px dashed var(--l3-border-light); }
.vDivider { flex: none; align-self: center; width: 1px; height: var(--l3-size-20); background: var(--l3-border-light); }
.muted { color: var(--l3-content-tertiary); }
/* Zing signals: honey tile at the right edge, open on the right, with the signal count. */
.zing { position: relative; display: grid; place-items: center; margin-left: auto; width: var(--l3-spacing-36); height: var(--l3-size-32); padding: 0; border: 1px solid var(--l3-border-accent-zing-default); border-right: 0; border-radius: var(--l3-radius-08) 0 0 var(--l3-radius-08); background: var(--l3-surface-accent-zing-light); color: var(--l3-content-accent-zing-default); cursor: pointer; }
.zingCount { position: absolute; top: calc(-1 * var(--l3-spacing-04)); right: var(--l3-spacing-04); }

.stats { display: flex; align-items: center; gap: var(--l3-spacing-12); height: var(--l3-size-40); padding-inline: var(--l3-spacing-12); background: var(--l3-surface-default); border-bottom: 1px solid var(--l3-border-intense); overflow-x: auto; scrollbar-width: none; white-space: nowrap; }
/* Σ and basket (Figma 28 × 28, radius 9 → L3 08, border #dbdbdb = border/intense). */
.statButton.statButton { flex: none; width: var(--l3-size-28); height: var(--l3-size-28); min-width: var(--l3-size-28); min-height: var(--l3-size-28); padding: 0; --btn-radius: var(--l3-radius-08); --btn-border: var(--l3-border-intense); --btn-surface: var(--l3-surface-primary); }
.statOn.statOn { --btn-surface: var(--l3-surface-inverted); --btn-content: var(--l3-content-inverted); }
.stat { flex: none; font: var(--l3-text-label-10); }
.stat strong { font: var(--l3-text-heading-10); }
.dot { flex: none; width: var(--l3-size-04); height: var(--l3-size-04); border-radius: var(--l3-radius-full); background: var(--l3-content-disabled); }

.columns, .row { display: grid; grid-template-columns: 1fr var(--app-size-chain-strike) 1fr; }
.columns { height: var(--l3-size-40); background: var(--l3-surface-default); border-bottom: 1px solid var(--l3-border-light); }
.columnHead { padding: 0 var(--l3-spacing-16); border: 0; background: none; color: var(--l3-content-secondary); font: var(--l3-text-label-12); text-align: left; cursor: pointer; }
.strikeHead { text-align: center; background: var(--l3-surface-secondary); }
.putHead { text-align: right; }

/* ---- Rows ---- */
.row { position: relative; height: var(--app-size-chain-row); border-bottom: 1px solid var(--l3-border-light); }
.strike { background: var(--l3-surface-secondary); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--l3-spacing-02); }
.strikeValue { font: var(--l3-text-heading-12); }

.cell { position: relative; display: flex; align-items: center; gap: var(--l3-spacing-08); padding: 0 var(--l3-spacing-16); border: 0; background: none; color: var(--l3-content-primary); text-align: left; cursor: pointer; }
.cell[data-side='put'] { justify-content: flex-end; text-align: right; }
.cell[data-side='call'] { flex-direction: row-reverse; justify-content: flex-end; }
.values { display: flex; flex-direction: column; gap: var(--l3-spacing-02); }
.ltp { font: var(--l3-text-label-12); }
.sub { font: var(--l3-text-label-10); }
.up { color: var(--l3-content-accent-indicator-up-default); }
.down { color: var(--l3-content-accent-indicator-down-default); }
.subNeutral { color: var(--l3-content-tertiary); }

/* Selected: a B / S badge on the strike side and a wash of the action's colour from the outer edge. */
.badge { position: absolute; top: 50%; translate: 0 -50%; display: grid; place-items: center; min-width: var(--l3-size-16); height: var(--l3-size-16); border-radius: var(--l3-radius-04); font: var(--l3-text-heading-10); color: var(--l3-content-inverted); }
.cell[data-side='put'] .badge { left: 0; }
.cell[data-side='call'] .badge { right: 0; }
.badge[data-action='buy'] { background: var(--l3-surface-accent-indicator-up-default); }
.badge[data-action='sell'] { background: var(--l3-surface-accent-indicator-down-default); }
.cell[data-side='put'][data-selected='buy'] { background: linear-gradient(90deg, transparent, var(--l3-surface-accent-indicator-up-light)); }
.cell[data-side='put'][data-selected='sell'] { background: linear-gradient(90deg, transparent, var(--l3-surface-accent-indicator-down-light)); }
.cell[data-side='call'][data-selected='buy'] { background: linear-gradient(270deg, transparent, var(--l3-surface-accent-indicator-up-light)); }
.cell[data-side='call'][data-selected='sell'] { background: linear-gradient(270deg, transparent, var(--l3-surface-accent-indicator-down-light)); }

/* OI bars on the row's bottom edge: call OI (red) runs left from the middle, put OI (green) right. */
.oi { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; pointer-events: none; }
.oiCall, .oiPut { position: absolute; bottom: 0; height: 100%; }
/* Each bar fades out toward the middle (Figma). */
.oiCall { right: 50%; background: linear-gradient(90deg, var(--l3-surface-accent-indicator-down-default) 60%, transparent); }
.oiPut { left: 50%; background: linear-gradient(90deg, transparent, var(--l3-surface-accent-indicator-up-default) 40%); }

/* Spot: a thin band between the two strikes the price falls between, with the price pill in the middle. */
.spotRow { position: relative; display: grid; place-items: center; height: var(--l3-size-32); border-bottom: 1px solid var(--l3-border-light); background: var(--l3-surface-default); }
.spot { padding: var(--l3-spacing-06) var(--l3-spacing-12); border-radius: var(--l3-radius-08); background: var(--l3-surface-inverted); color: var(--l3-content-inverted); font: var(--l3-text-label-12); white-space: nowrap; box-shadow: var(--l3-shadow-elevation-high); }
.spotUp { color: var(--l3-content-accent-indicator-up-default); }
.spotDown { color: var(--l3-content-accent-indicator-down-default); }

/* Illiquid contracts: a block icon beside the price (strike side); a tap shows the tooltip above instead of selecting. */
.illiquidCell { position: relative; display: grid; }
/* An invisible box over the ⃠ icon: the tooltip's anchor, so its arrow points at the icon. */
.tipTarget { position: absolute; display: block; pointer-events: none; }
.tipTarget > * { display: block; width: 100%; height: 100%; pointer-events: auto; }
.tipDot { display: block; width: 100%; height: 100%; }
.blocked { display: inline-flex; vertical-align: -2px; margin-inline: var(--l3-spacing-04); color: var(--l3-content-tertiary); }
.cell[data-illiquid] .ltp { color: var(--l3-content-secondary); }
.tip { display: inline-flex; align-items: center; gap: var(--l3-spacing-12); white-space: nowrap; }
/* Two lines: the label, then a secondary line under it. */
.tipText { display: flex; flex-direction: column; gap: var(--l3-spacing-02); }
.tipTitle { font: var(--l3-text-label-12); color: var(--l3-content-inverted); }
.tipSub { font: var(--l3-text-description-12); color: var(--l3-content-inverted-secondary); }
.tipInfo { position: relative; margin-right: calc(-1 * var(--l3-spacing-04)); display: inline-grid; place-items: center; width: var(--l3-size-16); height: var(--l3-size-16); padding: 0; border: 0; background: none; color: inherit; cursor: pointer; }
/* The icon sits 8 from the bubble edge (like L3 Tooltip ✕: it steps out of the text's 4 inline padding); its touch area stays larger than the 16 icon. */
.tipInfo::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-08)); }

/* The illiquid tooltip grows out of its arrow (at the icon): fade + scale + a 4 px slide away from the icon, once placed. */
.tipTarget [role='tooltip'][data-ready] { animation: chain-tip-in var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) both; }
.tipTarget [role='tooltip'][data-side='top'] { transform-origin: var(--tt-arrow) 100%; --tip-from: var(--l3-spacing-04); }
.tipTarget [role='tooltip'][data-side='bottom'] { transform-origin: var(--tt-arrow) 0; --tip-from: calc(-1 * var(--l3-spacing-04)); }
@keyframes chain-tip-in { from { opacity: 0; scale: 0.9; translate: 0 var(--tip-from); } }
@media (prefers-reduced-motion: reduce) { .tipTarget [role='tooltip'][data-ready] { animation: none; } }
```

### `src/flows/fno/option-chain/screens/OptionChain.tsx`

```tsx
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Aerobar } from '@l3/components/Aerobar'
import { Badge } from '@l3/components/Badge'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { Select } from '@l3/components/Select'
import { Tabs } from '@l3/components/Tabs'
import { Tag } from '@l3/components/Tag'
import { Tooltip } from '@l3/components/Tooltip'
import { msAdd, msArrowBack, msBlock, msBoltFill, msFunctions, msInfo, msShoppingBasket } from '@l3/icons/material'
import { Screen } from '../../../../shared/ui/Screen'
import { ChoiceSheet, DetailSheet } from '../../sheets/HomeSheets'
import { t } from '../../copy'
import { chainFor, expiries, ranges, underlyings, type Action, type Metric, type OptionQuote, type Range, type Side } from '../data'
import { OrderDock, type Selection } from '../components/OrderDock'
import { IlliquidSheet } from '../../sheets/IlliquidSheet'
import styles from './OptionChain.module.css'

type Modal = { kind: 'choice'; title: string; values: string[]; value: string; onPick: (v: string) => void } | { kind: 'detail'; title: string } | { kind: 'illiquid'; contract: string; quote: OptionQuote }

type Props = {
  /** Open with a contract already selected (fno-18 Buy, fno-19 Sell). */
  initialSelection?: Selection
  /** Open with the illiquid tooltip up on this contract (fno-20). */
  initialIlliquid?: { strike: number; side: Side }
  onBack: () => void
  /** The contract name in the order dock opens its asset page. */
  onAsset: () => void
}

/** How long the illiquid tooltip stays up. */
const TIP_MS = 5000
const metrics: Metric[] = ['ltp', 'oi', 'oiChange', 'iv']
const lakh = (n: number) => `${(n / 100000).toFixed(1)}L`

/**
 * Option chain (Figma 11695:26269 — 11630:16785 default, 11630:16184 Buy; Sell is the same frame with S). Strikes run
 * low → high down the page, calls left, puts right; the spot pill sits between the two strikes it falls between and the
 * chain opens scrolled to it. A price tap selects that contract to Buy, a second tap on it switches to Sell, a third
 * clears it; the order dock rises while a contract is selected.
 */
export function OptionChain({ initialSelection, initialIlliquid, onBack, onAsset }: Props) {
  const [underlyingId, setUnderlyingId] = useState(underlyings[0].id)
  const [expiry, setExpiry] = useState(expiries[0])
  const [metric, setMetric] = useState<Metric>('ltp')
  const [range, setRange] = useState<Range>(0)
  const [greeks, setGreeks] = useState(false)
  const [selection, setSelection] = useState<Selection | null>(initialSelection ?? null)
  // The illiquid contract whose tooltip is up ("25,700 put"); an illiquid tap shows it instead of selecting.
  const [tip, setTip] = useState<string | null>(initialIlliquid ? `${initialIlliquid.strike}-${initialIlliquid.side}` : null)
  // The tooltip goes away by itself after 5 s (or when another contract is tapped).
  useEffect(() => {
    if (!tip) return
    const timer = window.setTimeout(() => setTip(null), TIP_MS)
    return () => window.clearTimeout(timer)
  }, [tip])
  const [modal, setModal] = useState<Modal | null>(null)
  const [placed, setPlaced] = useState<string | null>(null)
  const underlying = underlyings.find((u) => u.id === underlyingId)!
  const allRows = useMemo(() => chainFor(underlying), [underlying])
  const spotIndex = allRows.findIndex((row) => row.strike > underlying.spot)
  const rows = range === 0 ? allRows : allRows.slice(Math.max(0, spotIndex - range), spotIndex + range)
  const maxOi = Math.max(...allRows.flatMap((r) => [r.call.oi, r.put.oi]))
  const below = allRows.filter((r) => r.strike < underlying.spot)
  const above = allRows.filter((r) => r.strike > underlying.spot)
  const support = below.reduce((a, b) => (b.put.oi > a.put.oi ? b : a)).strike
  const resistance = above.reduce((a, b) => (b.call.oi > a.call.oi ? b : a)).strike

  // Open at the money: the spot pill in the middle of the list.
  const spotRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const spot = spotRef.current
    const body = spot?.closest('[data-chain]')?.parentElement
    if (spot && body) body.scrollTop += spot.getBoundingClientRect().top - body.getBoundingClientRect().top - body.clientHeight / 2
  }, [underlyingId, range])

  const choose = (title: string, values: string[], value: string, onPick: (v: string) => void) => setModal({ kind: 'choice', title, values, value, onPick })
  const tap = (strike: number, side: Side, quote: OptionQuote) => { setTip(null); setSelection((current) => {
    const same = current?.strike === strike && current.side === side
    if (!same) return { strike, side, action: 'buy', ltp: quote.ltp }
    return current.action === 'buy' ? { ...current, action: 'sell' } : null
  }) }
  const value = (quote: OptionQuote) => metric === 'ltp' ? quote.ltp.toFixed(2) : metric === 'oi' ? lakh(quote.oi) : metric === 'oiChange' ? `${quote.oiChange}%` : quote.iv.toFixed(2)
  const sub = (quote: OptionQuote, side: Side, strike: number) => {
    if (greeks) {
      const delta = side === 'call' ? Math.max(0.02, Math.min(0.98, 0.5 + (underlying.spot - strike) / 1200)) : -Math.max(0.02, Math.min(0.98, 0.5 - (underlying.spot - strike) / 1200))
      return { text: `Δ ${delta.toFixed(2)}`, tone: styles.subNeutral }
    }
    return { text: `${quote.change}%`, tone: quote.change < 0 ? styles.down : styles.up }
  }
  const tagFor = (strike: number) => strike === support ? <Tag color="profit" variant="primary" size="sm">{t('chain.tag.support')}</Tag> : strike === resistance ? <Tag color="loss" variant="primary" size="sm">{t('chain.tag.resistance')}</Tag> : strike === underlying.maxPain ? <Tag color="discover" variant="primary" size="sm">{t('chain.tag.maxPain')}</Tag> : null

  const cell = (strike: number, side: Side, quote: OptionQuote) => {
    const selected = selection?.strike === strike && selection.side === side ? selection.action : undefined
    const s = sub(quote, side, strike)
    const contract = t('chain.contract', { strike: strike.toLocaleString('en-IN'), side: t(`chain.${side}`) })
    // Illiquid: the block icon sits beside the price on the strike side; the price never selects.
    const blocked = quote.illiquid ? <span className={styles.blocked} data-blocked aria-hidden><Icon icon={msBlock} size={14} /></span> : null
    const price = <span className={styles.ltp}>{side === 'put' && blocked}{value(quote)}{side === 'call' && blocked}</span>
    const content = <span className={styles.values}>{price}<span className={[styles.sub, s.tone].join(' ')}>{s.text}</span></span>
    if (quote.illiquid) {
      const key = `${strike}-${side}`
      return <IlliquidCell open={tip === key} onToggle={(open) => setTip(open ? key : null)}
        label={t('chain.illiquidLabel', { strike: strike.toLocaleString('en-IN'), side: t(`chain.${side}`) })} side={side}
        onMore={() => { setTip(null); setModal({ kind: 'illiquid', contract, quote }) }}>{content}</IlliquidCell>
    }
    return <button type="button" className={styles.cell} data-side={side} data-selected={selected} aria-pressed={!!selected}
      aria-label={t('chain.select', { action: t(selected === 'buy' ? 'chain.sell' : 'chain.buy'), strike: strike.toLocaleString('en-IN'), side: t(`chain.${side}`), price: quote.ltp.toFixed(2) })}
      onClick={() => tap(strike, side, quote)}>
      {selected && <span className={styles.badge} data-action={selected} aria-hidden>{t(selected === 'buy' ? 'chain.buyBadge' : 'chain.sellBadge')}</span>}
      {content}
    </button>
  }

  const sheet = modal?.kind === 'choice' ? <ChoiceSheet {...modal} onClose={() => setModal(null)} /> : modal?.kind === 'detail' ? <DetailSheet title={modal.title} onClose={() => setModal(null)} /> : modal?.kind === 'illiquid' ? <IlliquidSheet contract={modal.contract} onClose={() => setModal(null)} /> : undefined
  const top = <div className={styles.top}>
    <div className={styles.header}>
      <Button variant="ghost" size="sm" iconLeft={<Icon icon={msArrowBack} />} aria-label={t('chain.back')} onClick={onBack} className={styles.back} />
      <Tabs aria-label={t('chain.tabs')} appearance="ribbon" size="sm" value="chain" onChange={() => {}} items={[{ value: 'chain', label: t('chain.title') }]} className={styles.ribbon} />
      <button type="button" className={styles.addStrategies} onClick={() => setModal({ kind: 'detail', title: t('chain.addStrategies') })}>
        {t('chain.addStrategies')}<span className={styles.addRing} aria-hidden><Icon icon={msAdd} size={12} /></span>
      </button>
    </div>
    <div className={styles.selectors}>
      <Select size="sm" icon="chevron" aria-label={t('chain.underlying')} onClick={() => choose(t('chain.underlying'), underlyings.map((u) => u.name), underlying.name, (name) => { setUnderlyingId(underlyings.find((u) => u.name === name)!.id); setSelection(null) })}>{underlying.name}</Select>
      <span className={styles.vDivider} aria-hidden />
      <Select size="sm" icon="chevron" aria-label={t('chain.expiryTitle')} onClick={() => choose(t('chain.expiryTitle'), expiries, expiry, (e) => { setExpiry(e); setSelection(null) })}><span className={styles.muted}>{t('chain.expiry')}</span> {expiry}</Select>
      <button type="button" className={styles.zing} aria-label={t('chain.signals', { count: 2 })} onClick={() => setModal({ kind: 'detail', title: t('signals') })}>
        <Icon icon={msBoltFill} size={20} /><Badge count={2} size="sm" className={styles.zingCount} />
      </button>
    </div>
    <div className={styles.stats}>
      <Button variant="secondary" size="sm" aria-label={t('chain.greeks')} aria-pressed={greeks} iconLeft={<Icon icon={msFunctions} size={16} />} onClick={() => setGreeks(!greeks)} className={[styles.statButton, greeks && styles.statOn].filter(Boolean).join(' ')} />
      <Button variant="secondary" size="sm" aria-label={t('chain.basket')} iconLeft={<Icon icon={msShoppingBasket} size={16} />} onClick={() => setModal({ kind: 'detail', title: t('chain.basket') })} className={styles.statButton} />
      <span className={styles.vDivider} aria-hidden />
      <span className={styles.stat}><span className={styles.muted}>{t('chain.pcr')}</span> <strong>{underlying.pcr}</strong></span><span className={styles.dot} aria-hidden />
      <span className={styles.stat}><span className={styles.muted}>{t('chain.maxPain')}</span> <strong>{underlying.maxPain.toLocaleString('en-IN')}</strong></span><span className={styles.dot} aria-hidden />
      <span className={styles.stat}><span className={styles.muted}>{t('chain.atmIv')}</span> <strong>{underlying.atmIv.toFixed(2)}</strong></span>
    </div>
    <div className={styles.columns}>
      <button type="button" className={styles.columnHead} onClick={() => choose(t('chain.metricTitle'), metrics.map((m) => t(`chain.metric.${m}`)), t(`chain.metric.${metric}`), (label) => setMetric(metrics.find((m) => t(`chain.metric.${m}`) === label)!))}>{t('chain.call')} {t(`chain.metric.${metric}`)}</button>
      <button type="button" className={[styles.columnHead, styles.strikeHead].join(' ')} onClick={() => choose(t('chain.rangeTitle'), ranges.map((r) => t(`chain.rangeOption.${r}`)), t(`chain.rangeOption.${range}`), (label) => setRange(ranges.find((r) => t(`chain.rangeOption.${r}`) === label)!))}>{t(`chain.range.${range}`)}</button>
      <button type="button" className={[styles.columnHead, styles.putHead].join(' ')} onClick={() => choose(t('chain.metricTitle'), metrics.map((m) => t(`chain.metric.${m}`)), t(`chain.metric.${metric}`), (label) => setMetric(metrics.find((m) => t(`chain.metric.${m}`) === label)!))}>{t('chain.put')} {t(`chain.metric.${metric}`)}</button>
    </div>
  </div>

  return <Screen top={top} sheet={sheet}
    bottom={selection ? <OrderDock key={`${selection.strike}-${selection.side}`} selection={selection} lotSize={underlying.lotSize} onContract={onAsset} onOptions={() => setModal({ kind: 'detail', title: `${t('chain.orderOptions')} · ${t('chain.tpsl')}` })} onPlace={(action: Action) => { setPlaced(t('chain.placed', { action: t(action === 'buy' ? 'chain.buy' : 'chain.sell'), contract: t('chain.contract', { strike: selection.strike.toLocaleString('en-IN'), side: t(`chain.${selection.side}`) }) })); setSelection(null) }} /> : undefined}
    toast={placed ? <Aerobar floating type="success" heading={placed} onDismiss={() => setPlaced(null)} /> : undefined}>
    <div className={styles.chain} data-chain role="list" aria-label={t('chain.title')}>
      {rows.map((row, i) => {
        const spotHere = rows[i - 1] && rows[i - 1].strike < underlying.spot && row.strike > underlying.spot
        const tag = tagFor(row.strike)
        return <Fragment key={row.strike}>
          {spotHere && <div ref={spotRef} className={styles.spotRow} role="listitem" aria-label={t('chain.spot')}><span className={styles.spot}>{underlying.spot.toFixed(2)} <span className={underlying.change < 0 ? styles.spotDown : styles.spotUp}>{underlying.change > 0 ? '+' : ''}{underlying.change}%</span></span></div>}
          <div className={styles.row} role="listitem" data-itm={row.strike < underlying.spot ? 'call' : 'put'}>
            {cell(row.strike, 'call', row.call)}
            <div className={styles.strike}><span className={styles.strikeValue}>{row.strike}</span>{tag}</div>
            {cell(row.strike, 'put', row.put)}
            <span className={styles.oi} aria-label={t('chain.oiLegend', { call: lakh(row.call.oi), put: lakh(row.put.oi) })}>
              <span className={styles.oiCall} style={{ width: `${(row.call.oi / maxOi) * 50}%` }} />
              <span className={styles.oiPut} style={{ width: `${(row.put.oi / maxOi) * 50}%` }} />
            </span>
          </div>
        </Fragment>
      })}
    </div>
  </Screen>
}

/**
 * An illiquid price cell: the whole cell is the tap target, but the tooltip points at the ⃠ icon so the icon reads as
 * “illiquid”. The L3 Tooltip anchors on an invisible box laid over the icon (outside the cell's button, so the ⓘ button
 * in the tooltip isn't nested in another button). Mobile: it opens only on a tap — never hover or focus — and closes on
 * a second tap, tap-away, after 5 s, or when another contract is tapped (the screen's timer).
 */
function IlliquidCell({ open, onToggle, onMore, label, side, children }: { open: boolean; onToggle: (open: boolean) => void; onMore: () => void; label: string; side: Side; children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  const [target, setTarget] = useState<CSSProperties | null>(null)
  // Measure the icon first, then mount the tooltip on the box over it — the L3 Tooltip places itself when it opens,
  // so its anchor must already sit on the icon (it then flips above / below to fit and aims its arrow at the icon).
  useLayoutEffect(() => {
    const icon = wrap.current?.querySelector('[data-blocked]')
    if (!open) { setTarget(null); return }
    if (!icon || !wrap.current) return
    const w = wrap.current.getBoundingClientRect(), r = icon.getBoundingClientRect()
    setTarget({ left: r.left - w.left, top: r.top - w.top, width: r.width, height: r.height })
  }, [open])
  return <div ref={wrap} className={styles.illiquidCell}>
    <button type="button" className={styles.cell} data-side={side} data-illiquid="" aria-label={label} aria-expanded={open}
      onPointerDown={() => { wasOpen.current = open }} onClick={() => onToggle(!wasOpen.current)}>{children}</button>
    {open && target && <span className={styles.tipTarget} style={target}>
      <Tooltip placement="top" open onOpenChange={(next) => { if (!next) onToggle(false) }}
        content={<span className={styles.tip}><span className={styles.tipText}><span className={styles.tipTitle}>{t('chain.illiquid')}</span><span className={styles.tipSub}>{t('chain.illiquidSub')}</span></span><button type="button" className={styles.tipInfo} aria-label={t('chain.illiquidMore')} onClick={onMore}><Icon icon={msInfo} size={16} /></button></span>}>
        <span className={styles.tipDot} />
      </Tooltip>
    </span>}
  </div>
}
```

### `src/flows/fno/order-pad/data.ts`

```ts
/**
 * Commodity options order pad (Figma 8671:18433). Sample contract and account values, not live data. Prices in ₹.
 */
export type OrderSide = 'buy' | 'sell'
export type OrderProduct = 'delivery' | 'intraday'
export type OrderType = 'market' | 'limit' | 'sl'

export const orderContract = {
  name: 'Gold',
  contract: '5 OCT Fut',
  exchange: 'MCX',
  ltp: 153580,
  change: 2.62,
  /** Units per lot: the quantity steps by one lot. */
  lotSize: 100,
}
/** Selling (writing) shows the margin and leverage the exchange asks for. */
export const sellMargin = { margin: '7.00%', leverage: '14.3X' }
export const funds = { available: 1105002, required: 1075060 }
/** Intraday positions are squared off automatically at this time (MCX evening session). */
export const intradayCloseTime = '11:30 PM'
export const validities = ['Day', 'IOC']
```

### `src/flows/fno/order-pad/screens/OrderPad.module.css`

```css
/* Commodity options order pad (Figma 8671:18433) on L3 tokens. */
.contract { display: flex; flex-direction: column; align-items: flex-start; gap: var(--l3-spacing-02); padding: 0; border: 0; background: none; color: var(--l3-content-primary); text-align: left; cursor: pointer; }
.contractName { display: inline-flex; align-items: center; gap: var(--l3-spacing-04); font: var(--l3-text-heading-14); }
.expiry { margin-left: var(--l3-spacing-04); font: var(--l3-text-label-12); color: var(--l3-content-tertiary); }
.contractPrice { display: inline-flex; align-items: center; gap: var(--l3-spacing-08); font: var(--l3-text-label-12); }
.exchange { font: var(--l3-text-label-12); color: var(--l3-content-primary); }

.body { padding: var(--l3-spacing-16); }
.validity.validity { min-height: var(--l3-size-32); border: 1px solid var(--l3-border-dark); border-radius: var(--l3-radius-full); padding-inline: var(--l3-spacing-12); }

/* Margin · Leverage (Sell): a grey strip. */
.margin { display: flex; justify-content: space-between; padding: var(--l3-spacing-12); border-radius: var(--l3-radius-12); background: var(--l3-surface-secondary); font: var(--l3-text-label-12); }
.margin strong, .funds strong { font: var(--l3-text-heading-12); color: var(--l3-content-primary); }
.muted { color: var(--l3-content-tertiary); }

/* A field row: label, value / hint, compact stepper at the right — bordered, 12 radius. */
.field { display: flex; align-items: center; gap: var(--l3-spacing-08); min-height: var(--l3-size-40); padding: var(--l3-spacing-04) var(--l3-spacing-04) var(--l3-spacing-04) var(--l3-spacing-12); border: 1px solid var(--l3-border-light); border-radius: var(--l3-radius-08); }
.fieldLabel { flex: 1; font: var(--l3-text-label-12); color: var(--l3-content-secondary); }
.fieldValue { font: var(--l3-text-heading-12); }
.unit { display: inline-flex; align-items: center; gap: var(--l3-spacing-02); padding: 0; border: 0; background: none; color: var(--l3-content-primary); font: var(--l3-text-label-12); cursor: pointer; }
.hint { flex: 1; font: var(--l3-text-label-12); color: var(--l3-content-tertiary); }
/* Steppers are the L3 Stepper Small as it is (dark + / −) — the design system's style wins over Figma's grey / blue. */

.tpsl { display: inline-flex; align-items: center; gap: var(--l3-spacing-04); min-height: var(--l3-size-32); padding: 0; border: 0; background: none; color: var(--l3-content-primary); font: var(--l3-text-label-12); cursor: pointer; }

/* Dock: optional auto-close note (intraday), then Avail. · Req and the action. */
.dock { background: var(--l3-surface-primary); }
.autoClose { margin: 0; padding: var(--l3-spacing-12) var(--l3-spacing-16); font: var(--l3-text-label-12); color: var(--l3-content-tertiary); text-align: center; }
.dockBody { display: flex; flex-direction: column; gap: var(--l3-spacing-12); padding: var(--l3-spacing-12) var(--l3-spacing-16) var(--l3-spacing-16); border-top: 1px solid var(--l3-border-light); }
.funds { display: flex; justify-content: space-between; font: var(--l3-text-label-12); }
.req { padding: 0; border: 0; background: none; color: var(--l3-content-accent-discover-default); font: var(--l3-text-label-12); text-decoration: underline; cursor: pointer; }

/* ILLIQUID edge case: tag in the header (tap → explainer), the blocked note above the disabled action. */
.headEnd { display: inline-flex; align-items: center; gap: var(--l3-spacing-08); }
.tagButton { position: relative; display: inline-flex; padding: 0; border: 0; background: none; cursor: pointer; }
.tagButton::before { content: ''; position: absolute; inset: calc(-1 * var(--l3-spacing-16)) calc(-1 * var(--l3-spacing-04)); }
.illiquidNote { display: flex; align-items: center; justify-content: center; gap: var(--l3-spacing-04); width: 100%; min-height: var(--l3-size-40); padding: var(--l3-spacing-08) var(--l3-spacing-12); border: 0; border-radius: var(--l3-radius-08); background: var(--l3-surface-accent-error-light); font: var(--l3-text-label-12); color: var(--l3-content-accent-error-default); cursor: pointer; }
```

### `src/flows/fno/order-pad/screens/OrderPad.tsx`

```tsx
import { useState } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Aerobar } from '@l3/components/Aerobar'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Stepper } from '@l3/components/Stepper'
import { Tabs } from '@l3/components/Tabs'
import { Tag } from '@l3/components/Tag'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { msAddCircleFill, msBlock, msInfo } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import { Screen } from '../../../../shared/ui/Screen'
import { ChoiceSheet, DetailSheet } from '../../sheets/HomeSheets'
import { IlliquidSheet } from '../../sheets/IlliquidSheet'
import { t } from '../../copy'
import { funds, intradayCloseTime, orderContract, sellMargin, validities, type OrderProduct, type OrderSide, type OrderType } from '../data'
import styles from './OrderPad.module.css'

type Props = {
  side: OrderSide
  product?: OrderProduct
  type?: OrderType
  /**
   * Edge case: an ILLIQUID contract should never reach the order pad (every entry point blocks it), but if one does,
   * the pad shows the ILLIQUID tag, the blocked note in the dock and a disabled Buy / Sell.
   */
  illiquid?: boolean
  onBack: () => void
}

type Modal = { kind: 'choice'; title: string; values: string[]; value: string; onPick: (v: string) => void } | { kind: 'detail'; title: string } | { kind: 'illiquid' }

/**
 * Commodity options order pad (Figma 8671:18433) — commodity option chain only; other order pads differ a little.
 * Actionbar: back · contract ⇕ (name, expiry, price + change) · exchange, Delivery / Intraday tabs in its bottom slot.
 * Body: Market / Limit / SL pills (+ validity “Day ⇕” for Limit / SL); Sell shows Margin · Leverage; Quantity (⇕ lots,
 * lot hint, stepper of one lot); Limit adds a limit price row, SL a trigger price row and a limit row (each with a %
 * stepper from the market price); Set TPSL. Intraday: the auto-close note above the dock. Dock: Avail. · Req, then
 * Buy (brand) or Sell (sell).
 */
export function OrderPad({ side, product: initialProduct = 'delivery', type: initialType = 'market', illiquid = false, onBack }: Props) {
  const c = orderContract
  const [product, setProduct] = useState<OrderProduct>(initialProduct)
  const [type, setType] = useState<OrderType>(initialType)
  const [validity, setValidity] = useState(validities[0])
  const [lots, setLots] = useState(false)
  const [quantity, setQuantity] = useState(c.lotSize)
  const [limitPct, setLimitPct] = useState(20.3)
  const [triggerPct, setTriggerPct] = useState(20.3)
  const [modal, setModal] = useState<Modal | null>(null)
  const [placed, setPlaced] = useState(false)
  const buy = side === 'buy'
  const priceAt = (pct: number) => inr(Math.round(c.ltp * (buy ? 1 - pct / 1000 : 1 + pct / 1000)), 0)
  const priceRow = (label: string, pct: number, setPct: (n: number) => void) => <div className={styles.field}>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={styles.fieldValue}>{priceAt(pct)}</span>
    <Stepper size="sm" className={styles.stepper} label={t('order.offset')} value={pct} onChange={setPct} min={0} step={0.1} format={(n) => `${n.toFixed(1)}%`} />
  </div>

  const sheet = modal?.kind === 'illiquid' ? <IlliquidSheet contract={`${c.name} ${c.contract}`} onClose={() => setModal(null)} /> : modal?.kind === 'choice' ? <ChoiceSheet {...modal} onClose={() => setModal(null)} /> : modal?.kind === 'detail' ? <DetailSheet title={modal.title} onClose={() => setModal(null)} /> : undefined
  const top = <Actionbar onBack={onBack} backLabel={t('order.back')}
    title={<button type="button" className={styles.contract} aria-label={t('order.switch')} onClick={() => setModal({ kind: 'detail', title: t('order.switch') })}>
      <span className={styles.contractName}>{c.name}<Icon icon={lmSwitchArrowVertical} size={16} /><span className={styles.expiry}>{c.contract}</span></span>
      <span className={styles.contractPrice}>{inr(c.ltp, 2)}<PriceChange value={c.change} unit="percent" size="sm" arrow /></span>
    </button>}
    actions={<span className={styles.headEnd}>{illiquid && <button type="button" className={styles.tagButton} aria-label={t('illiquid.open')} onClick={() => setModal({ kind: 'illiquid' })}><Tag color="error" variant="secondary" size="sm" iconLeft={<Icon icon={msBlock} size={12} />}>{t('asset.illiquid')}</Tag></button>}<span className={styles.exchange}>{c.exchange}</span></span>}
    bottom={<Tabs aria-label={t('order.product')} value={product} onChange={setProduct} items={[{ value: 'delivery', label: t('order.delivery') }, { value: 'intraday', label: t('order.intraday') }]} />} />

  const dock = <div className={styles.dock} data-surface="primary">
    {product === 'intraday' && <p className={styles.autoClose}>{t('order.autoClose', { time: intradayCloseTime })}</p>}
    <div className={styles.dockBody}>
      <div className={styles.funds}>
        <span><span className={styles.muted}>{t('order.available')}</span> <strong>{inr(funds.available, 0)}</strong></span>
        <span><button type="button" className={styles.req} onClick={() => setModal({ kind: 'detail', title: t('order.required') })}>{t('order.required')}</button> <strong>{inr(funds.required, 0)}</strong></span>
      </div>
      {illiquid && <button type="button" className={styles.illiquidNote} onClick={() => setModal({ kind: 'illiquid' })}>{t('asset.illiquidNote')}<Icon icon={msInfo} size={16} /></button>}
      <Button variant={buy ? 'brand' : 'sell'} size="lg" fullWidth disabled={illiquid} onClick={() => setPlaced(true)}>{t(buy ? 'order.buy' : 'order.sell')}</Button>
    </div>
  </div>

  return <Screen top={top} bottom={dock} sheet={sheet}
    toast={placed ? <Aerobar floating type="success" heading={t('order.placed', { side: t(buy ? 'order.buy' : 'order.sell'), name: c.name, contract: c.contract })} onDismiss={() => setPlaced(false)} /> : undefined}>
    <Stack gap="16" className={styles.body}>
      <Stack direction="horizontal" align="center" justify="between">
        <Tabs aria-label={t('order.type')} appearance="pill" size="sm" value={type} onChange={setType} items={(['market', 'limit', 'sl'] as const).map((value) => ({ value, label: t(`order.${value}`) }))} />
        {type !== 'market' && <Select size="sm" aria-label={t('order.validity')} className={styles.validity} onClick={() => setModal({ kind: 'choice', title: t('order.validity'), values: validities, value: validity, onPick: setValidity })}>{validity}</Select>}
      </Stack>
      {!buy && <div className={styles.margin}><span><span className={styles.muted}>{t('order.margin')}</span> <strong>{sellMargin.margin}</strong></span><span><span className={styles.muted}>{t('order.leverage')}</span> <strong>{sellMargin.leverage}</strong></span></div>}
      <div className={styles.field}>
        <button type="button" className={styles.unit} aria-label={t('order.unitSwitch')} onClick={() => setLots(!lots)}>{t(lots ? 'order.lots' : 'order.quantity')}<Icon icon={lmSwitchArrowVertical} size={12} /></button>
        <span className={styles.hint}>{t('order.lotHint', { lot: c.lotSize })}</span>
        <Stepper size="sm" className={styles.stepper} label={t(lots ? 'order.lots' : 'order.quantity')} value={lots ? quantity / c.lotSize : quantity} onChange={(n) => setQuantity(lots ? n * c.lotSize : n)} min={lots ? 1 : c.lotSize} step={lots ? 1 : c.lotSize} />
      </div>
      {type === 'sl' && priceRow(t('order.trigger'), triggerPct, setTriggerPct)}
      {type !== 'market' && priceRow(t('order.limitPrice'), limitPct, setLimitPct)}
      <Stack direction="horizontal" justify="end">
        <button type="button" className={styles.tpsl} onClick={() => setModal({ kind: 'detail', title: t('order.tpsl') })}>{t('order.tpsl')}<Icon icon={msAddCircleFill} size={16} /></button>
      </Stack>
    </Stack>
  </Screen>
}
```

### `src/flows/fno/screens/Home.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Aerobar } from '@l3/components/Aerobar'
import { MaskIcon } from '@l3/components/MaskIcon'
import { Stack } from '@l3/components/Stack'
import { Tabs } from '@l3/components/Tabs'
import { Screen } from '../../../shared/ui/Screen'
import { user } from '../../../shared/data/user'
import { ContractSection, type Choose } from '../components/ContractSection'
import { Shortcuts, Watchlists } from '../components/Discovery'
import { FnoNav } from '../components/FnoNav'
import { Header } from '../components/Header'
import { Heatmap } from '../components/Heatmap'
import { Overview } from '../components/Overview'
import { TradingChart } from '../components/TradingChart'
import { ChoiceSheet, CreateWatchlistSheet, DetailSheet } from '../sheets/HomeSheets'
import { CommoditiesFeed } from '../commodities/components/CommoditiesFeed'
import { ContractPickerSheet } from '../commodities/sheets/ContractPickerSheet'
import type { Commodity } from '../commodities/data'
import { StrategiesFeed } from '../strategies/components/StrategiesFeed'
import type { Segment } from '../strategies/data'
import { watchlists, type Contract } from '../data'
import { t } from '../copy'
import equity from '../assets/equity.svg'
import commodities from '../assets/commodities.svg'
import strategies from '../assets/strategies.svg'
import styles from '../components/HomeParts.module.css'

export type HomePart = 'top' | 'watchlists' | 'options' | 'heatmap' | 'futures'
/** The product tab: Equity (fno-01…04), Commodities (fno-08…11), Strategies (fno-15, 16). */
export type Product = 'equity' | 'commodities' | 'strategies'
type Props = {
  product?: Product
  /** Strategies tab: Equity or Commodities strategies. */
  segment?: Segment
  /** Commodities tab: open with the contract picker up, on this tab of it. */
  picker?: 'equity' | 'commodities'
  onProduct: (product: Product, segment?: Segment) => void
  onCommodity: (commodity: Commodity) => void
  scrollTo?: HomePart; onHome: () => void; onSearch: () => void; onProfile: () => void; onWallet: () => void; onDash: () => void; onOptions: () => void; onFutures: () => void; onChain: () => void; onScalper: () => void }
type Modal = { kind: 'detail'; title: string; contract?: Contract } | { kind: 'create' } | { kind: 'choice'; title: string; values: string[]; value: string; onPick: (v: string) => void } | { kind: 'picker'; segment: 'equity' | 'commodities' }

/** fno-01 … 04 · one scrollable Equity home, with board frames for the lower sections. */
export function Home({ product = 'equity', segment = 'equity', picker, onProduct, onCommodity, scrollTo = 'top', onHome, onSearch, onProfile, onWallet, onDash, onOptions, onFutures, onChain, onScalper }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState<Modal | null>(picker ? { kind: 'picker', segment: picker } : null)
  const [instrument, setInstrument] = useState('Gold')
  const [lists, setLists] = useState(watchlists)
  const [created, setCreated] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const body = root.current?.parentElement
    if (!body) return
    const onScroll = () => setScrolled(body.scrollTop > 0)
    onScroll()
    body.addEventListener('scroll', onScroll, { passive: true })
    return () => body.removeEventListener('scroll', onScroll)
  }, [])
  const close = () => setModal(null)
  const open = (title: string) => setModal({ kind: 'detail', title })
  const choose: Choose = (title, values, value, onPick) => setModal({ kind: 'choice', title, values, value, onPick })
  const scroll = (part: HomePart) => {
    const body = root.current?.parentElement
    const target = root.current?.querySelector(`[data-fno="${part}"]`)
    if (body && target) body.scrollTo({ top: body.scrollTop + target.getBoundingClientRect().top - body.getBoundingClientRect().top, behavior: 'smooth' })
  }
  // A product tab switch slides only the content under the tabs, toward the chosen tab's side. If the page was
  // scrolled past the tabs, it stops with the tabs at the top so the new content starts in view.
  const order: Product[] = ['equity', 'commodities', 'strategies']
  const shownProduct = useRef(product)
  const [slide, setSlide] = useState<'from-end' | 'from-start' | null>(null)
  if (shownProduct.current !== product) {
    setSlide(order.indexOf(product) > order.indexOf(shownProduct.current) ? 'from-end' : 'from-start')
    shownProduct.current = product
  }
  useLayoutEffect(() => {
    const body = root.current?.parentElement
    const tabs = root.current?.querySelector('[data-fno="tabs"]')
    if (!slide || !body || !tabs) return
    const offset = tabs.getBoundingClientRect().top - body.getBoundingClientRect().top
    if (offset < 0) body.scrollTop += offset
  }, [product])
  useEffect(() => { if (picker) setModal({ kind: 'picker', segment: picker }) }, [picker])
  useLayoutEffect(() => {
    const body = root.current?.parentElement
    const target = root.current?.querySelector(`[data-fno="${scrollTo}"]`)
    if (body && target && scrollTo !== 'top') body.scrollTop += target.getBoundingClientRect().top - body.getBoundingClientRect().top
  }, [scrollTo])
  const sheet = modal?.kind === 'detail' ? <DetailSheet title={modal.title} contract={modal.contract} onClose={close} /> : modal?.kind === 'choice' ? <ChoiceSheet {...modal} onClose={close} /> : modal?.kind === 'picker' ? <ContractPickerSheet segment={modal.segment} value={instrument} onPick={setInstrument} onClose={close} /> : modal?.kind === 'create' ? <CreateWatchlistSheet onClose={close} onCreate={(name) => { setLists((ls) => [...ls, { id: `custom-${ls.length}`, name, count: 0 }]); close(); setCreated(true) }} /> : undefined
  return <Screen top={<Header scrolled={scrolled} initials={user.name.split(' ').map((name) => name[0]).join('')} onSearch={onSearch} onProfile={onProfile} onWallet={onWallet} onDash={onDash} />} bottom={<FnoNav onHome={onHome} onDestination={open} onChain={onChain} onScalper={onScalper} />} sheet={sheet} toast={created ? <Aerobar floating type="success" heading={t('watchlists.created')} onDismiss={() => setCreated(false)} /> : undefined}>
    <Stack ref={root}>
      <div data-fno="top"><Overview onDestination={open} /></div>
      <div data-fno="tabs"><Tabs aria-label="F&O products" appearance="ribbon" size="md" className={styles.productTabs} value={product} onChange={(v) => onProduct(v)} items={[{ value: 'equity', label: t('equity'), iconLeft: <span className={styles.ribbonIcon}><MaskIcon src={equity} /></span> }, { value: 'commodities', label: t('commodities'), iconLeft: <span className={styles.ribbonIcon}><MaskIcon src={commodities} /></span> }, { value: 'strategies', label: t('strategies'), iconLeft: <span className={styles.ribbonIcon}><MaskIcon src={strategies} /></span> }]} /></div>
      <div key={product} className={styles.productContent} data-slide={slide ?? undefined}>
      {product === 'equity' && <Stack gap="32" className={styles.feed}>
        <Shortcuts onWatchlist={() => scroll('watchlists')} onDestination={open} />
        <TradingChart onChoose={choose} onDestination={open} onChain={onChain} onScalper={onScalper} />
        <div className={styles.divider} />
        <div data-fno="watchlists"><Watchlists lists={lists} onAdd={() => setModal({ kind: 'create' })} onOpen={open} /></div>
        <div data-fno="options"><ContractSection kind="options" onChoose={choose} onContract={(contract) => setModal({ kind: 'detail', title: contract.name, contract })} onViewAll={onOptions} /></div>
        <div data-fno="heatmap"><Heatmap onOpen={open} onViewAll={() => open(t('heatmap.title'))} /></div>
        <div data-fno="futures"><ContractSection kind="futures" onChoose={choose} onContract={(contract) => setModal({ kind: 'detail', title: contract.name, contract })} onViewAll={onFutures} /></div>
      </Stack>}
      {product === 'commodities' && <CommoditiesFeed instrument={instrument} lists={lists} onCommodity={onCommodity} onPicker={() => setModal({ kind: 'picker', segment: 'commodities' })} onChoose={choose} onContract={(contract) => setModal({ kind: 'detail', title: contract.name, contract })} onDestination={open} onAddWatchlist={() => setModal({ kind: 'create' })} onChain={onChain} onScalper={onScalper} />}
      {product === 'strategies' && <StrategiesFeed segment={segment} onSegment={(next) => onProduct('strategies', next)} onChoose={choose} onDestination={open} onWatchlist={() => open(t('shortcut.watchlist'))} />}
      </div>
    </Stack>
  </Screen>
}
```

### `src/flows/fno/screens/Scalper.module.css`

```css
/*
 * Scalper — measured on the live app's screenshot (392 wide, dark). Every colour is an L3 token: the page is
 * surface/default, the panels surface/primary; Active and its count use the Zing accent, the chart-type button the
 * US-stock blue (the live app's blue tint), Buy the brand lime.
 */

/* Chrome around the charts (header band, the band between the charts, the order dock): surface/secondary in light (the
   live app's grey separators), surface/default (black) in dark. */
.screen {
  --scalper-chrome: var(--l3-surface-default);
}

:global(html[data-mode='light']) .screen {
  --scalper-chrome: var(--l3-surface-secondary);
}

/* ---- Top: header (back · strategy tabs · add) and the tool row ---- */
.top {
  flex: none;
  background: var(--scalper-chrome);
}

.header {
  display: flex;
  align-items: flex-end;
  height: var(--l3-size-48);
  padding-left: var(--l3-spacing-06);
}

.back.back {
  align-self: center;
  margin-top: var(--l3-spacing-08);
}

/* L3 ribbon tabs: the selected tab takes the tool row's surface and a light edge, so it runs into the row below. */
.strategies.strategies {
  flex: none;
  padding-inline: var(--l3-spacing-16) var(--l3-spacing-20);
  background: transparent;
  box-shadow: none;
}

.strategies [aria-selected='true'] {
  --tab-surface: var(--l3-surface-primary);
  --tab-border: var(--l3-border-light);
}

.addStrategies {
  display: inline-flex;
  align-items: center;
  gap: var(--l3-spacing-08);
  align-self: center;
  margin-top: var(--l3-spacing-08);
  padding: 0;
  border: 0;
  background: none;
  color: var(--l3-content-secondary);
  font: var(--l3-text-label-14);
  cursor: pointer;
}

.addRing {
  display: grid;
  place-items: center;
  width: var(--l3-size-24);
  height: var(--l3-size-24);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-accent-zing-light);
  box-shadow: inset 0 0 0 1px var(--l3-border-accent-zing-default); /* 1px: Figma stroke weight has no variable */
  color: var(--l3-content-primary);
}

/* Tool row: 36 tall on surface/primary, a dashed line under it; scrolls sideways (Active runs off the edge). */
.tools {
  display: flex;
  align-items: center;
  height: var(--l3-spacing-36);
  padding-left: var(--l3-spacing-20);
  overflow-x: auto;
  background: var(--l3-surface-primary);
  border-bottom: 1px dashed var(--l3-border-intense);
}

.tool.tool {
  flex: none;
  --btn-content: var(--l3-content-primary);
  font: var(--l3-text-label-14);
}

.divider {
  flex: none;
  width: 1px;
  height: var(--l3-size-20);
  margin-inline: var(--l3-spacing-16);
  background: var(--l3-border-light);
}

/* Active strategies: Zing tint, rounded on the left, running off the right edge; the count sits on the icon. */
.active {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: var(--l3-spacing-08);
  height: var(--l3-size-32);
  margin-left: var(--l3-spacing-16);
  padding: 0 var(--l3-spacing-24) 0 var(--l3-spacing-12);
  border: 1px solid var(--l3-border-accent-zing-light);
  border-right: 0;
  border-radius: var(--l3-radius-08) 0 0 var(--l3-radius-08);
  background: var(--l3-surface-accent-zing-light);
  color: var(--l3-content-accent-zing-default);
  font: var(--l3-text-label-14);
  cursor: pointer;
}

.activeIcon {
  position: relative;
  display: grid;
  place-items: center;
}

.count {
  position: absolute;
  top: calc(-1 * var(--l3-spacing-08));
  right: calc(-1 * var(--l3-spacing-08));
  display: grid;
  place-items: center;
  min-width: var(--l3-size-16);
  height: var(--l3-size-16);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-accent-zing-default);
  color: var(--l3-static-black);
  font: var(--l3-text-heading-10);
}

/* ---- Chart panels ---- */
.panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  background: var(--l3-surface-primary);
}

.panelHead {
  display: flex;
  flex: none;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--l3-spacing-12);
  padding: var(--l3-spacing-12) var(--l3-spacing-16) var(--l3-spacing-04);
}

.instrument {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.nameRow,
.priceRow {
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-06);
  height: var(--l3-size-20);
}

.picker {
  display: inline-flex;
  align-items: center;
  gap: var(--l3-spacing-02);
  padding: 0;
  border: 0;
  background: none;
  color: var(--l3-content-secondary);
  cursor: pointer;
}

.name {
  color: var(--l3-content-primary);
  font: var(--l3-text-heading-14);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: var(--l3-spacing-04);
}

.segment {
  margin-left: var(--l3-spacing-04);
  color: var(--l3-content-primary);
  font: var(--l3-text-label-14);
}

.link.link {
  --btn-content: var(--l3-content-primary);
  margin-left: var(--l3-spacing-04);
}

.price {
  color: var(--l3-content-primary);
  font: var(--l3-text-label-14);
}

.up {
  display: inline-flex;
  align-items: center;
  color: var(--l3-content-accent-indicator-up-default);
  font: var(--l3-text-label-14);
}


/* The pane's tools button: 32 (L3 Small) on surface/secondary. */

.paneButton.paneButton {
  --btn-surface: var(--l3-surface-secondary);
  --btn-content: var(--l3-content-primary);
  --btn-border: var(--l3-border-intense);
  margin-top: var(--l3-spacing-04);
}

/* The chart fills the panel; "N ▾" (indicators on it) sits at its top-left, the reset button at its bottom centre. */
.chart {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
}

.indicatorCount.indicatorCount {
  position: absolute;
  top: var(--l3-spacing-04);
  left: var(--l3-spacing-16);
  --btn-content: var(--l3-content-primary);
  font: var(--l3-text-label-14);
}

.refresh.refresh {
  position: absolute;
  bottom: var(--l3-spacing-40);
  left: 50%;
  --btn-content: var(--l3-content-accent-discover-default);
  --btn-radius: var(--l3-radius-full);
  transform: translateX(-50%);
}

/* Between the panes: a 16 band on the page colour with a drag handle. */
.split {
  display: grid;
  flex: none;
  place-items: center;
  height: var(--l3-size-16);
  background: var(--scalper-chrome);
}

.handle {
  width: var(--l3-size-40);
  height: var(--l3-size-04);
  padding: 0;
  border: 0;
  border-radius: var(--l3-radius-full);
  background: var(--l3-content-secondary);
  cursor: row-resize;
}

/* ---- Order dock ---- */
.dock {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  gap: var(--l3-spacing-04);
  padding: var(--l3-spacing-12) var(--l3-spacing-04) var(--l3-spacing-08);
  background: var(--scalper-chrome);
}

.orderType.orderType {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--l3-border-intense); /* 1px: Figma stroke weight has no variable */
}

.order {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: start;
  gap: var(--l3-spacing-08);
  width: 100%;
}

.side,
.qty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--l3-spacing-04);
}

.buy.buy,
.sell.sell {
  --btn-radius: var(--l3-radius-16);
}

.req {
  color: var(--l3-content-secondary);
  font: var(--l3-text-label-12);
}

.funds {
  color: var(--l3-content-secondary);
  font: var(--l3-text-label-10);
}

/* The chart-tools sheet brings its own layout: no content padding. No top hairline either (L3 draws one above every
   sheet; over the dimmed screen it read as a stray line) — the sheet keeps its shadow. */
.sheet [data-sheet-content] {
  padding: 0;
}

.sheet.sheet.sheet {
  box-shadow: var(--l3-shadow-elevation-high);
}
```

### `src/flows/fno/screens/Scalper.tsx`

```tsx
import { useMemo, useState } from 'react'
import { Button } from '@l3/components/Button'
import type { ChartCandle } from '@l3/components/Chart'
import { Icon } from '@l3/components/Icon'
import { Stack } from '@l3/components/Stack'
import { Stepper } from '@l3/components/Stepper'
import { Tabs } from '@l3/components/Tabs'
import { msAdd, msArrowBack, msArrowDropUp, msJoin, msLink, msMonitoring, msPlaylistAdd, msReceiptLong, msKeyboardArrowDown, msRefresh, msSwapHoriz, msUnfoldMore } from '@l3/icons/material'
import { Screen } from '../../../shared/ui/Screen'
import { Sheet } from '../../../shared/ui/Sheet'
import { TradingPane, type PaneLine } from '../components/TradingPane'
import { t } from '../copy'
import { scalperOption, scalperSpot, type ScalperInstrument } from '../data'
import { ChartToolsSheet } from '../sheets/ChartToolsSheet'
import styles from './Scalper.module.css'

type ScalperProps = {
  onBack: () => void
  /** An indicator made with DASH AI: listed under Your indicators. */
  createdIndicator?: string
  /** Open with the chart-tools sheet up on Indicators. Default: open when a DASH indicator is passed (View indicator). */
  openIndicators?: boolean
  /** An indicator already applied to the NIFTY 50 pane. */
  initialIndicator?: string
  onCreateIndicator?: () => void
  onApplyIndicator?: (name: string) => void
}

const LOT = 65

/**
 * Scalper (ScalpPro on F&O home) — the live app's trading workspace, rebuilt in L3:
 * - top: back · the strategy tabs (L3 ribbon: "All") · Add more strategies; under it the tool row (Positions · Orders ·
 *   Option chain · the Active strategies chip with its count);
 * - two linked chart panes: NIFTY 50 spot above, the option contract below, a handle between them;
 * - the order dock: Market / Limit-Trigger, Buy at Mkt · quantity in lots · Sell at Mkt, the margin each needs.
 * The spot pane's "add" button opens the chart-tools sheet (indicators). Prices are sample data.
 */
export function Scalper({ onBack, createdIndicator, openIndicators, initialIndicator, onCreateIndicator, onApplyIndicator }: ScalperProps) {
  const [sheetOpen, setSheetOpen] = useState(openIndicators ?? Boolean(createdIndicator))
  /** Indicators on the NIFTY 50 chart (the sheet adds and removes them, several at once). */
  // An indicator saved with DASH is applied straight away (and a favourite in the sheet), so it's already on the chart.
  const [applied, setApplied] = useState<string[]>(() => [...new Set([initialIndicator, createdIndicator].filter((n): n is string => Boolean(n)))])
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [quantity, setQuantity] = useState(LOT)
  const overlay = useMemo<PaneLine[]>(() => (applied.length ? [{ values: ema(scalperSpot.candles, 9), tone: 'fast' }, { values: ema(scalperSpot.candles, 21), tone: 'slow' }] : []), [applied.length])

  return (
    <Screen
      className={styles.screen}
      top={
        <div className={styles.top}>
          <div className={styles.header}>
            <Button variant="ghost" size="sm" iconLeft={<Icon icon={msArrowBack} />} aria-label={t('scalper.back')} onClick={onBack} className={styles.back} />
            <Tabs aria-label={t('scalper.strategies')} appearance="ribbon" size="md" value="all" onChange={() => {}} items={[{ value: 'all', label: t('scalper.all') }]} className={styles.strategies} />
            <button type="button" className={styles.addStrategies}>
              {t('scalper.addStrategies')}
              <span className={styles.addRing} aria-hidden="true"><Icon icon={msAdd} size={16} /></span>
            </button>
          </div>
          <nav className={styles.tools} aria-label={t('scalper.tools')}>
            <Button variant="ghost" size="sm" iconLeft={<Icon icon={msMonitoring} />} className={styles.tool}>{t('scalper.positions')}</Button>
            <span className={styles.divider} aria-hidden="true" />
            <Button variant="ghost" size="sm" iconLeft={<Icon icon={msReceiptLong} />} className={styles.tool}>{t('scalper.orders')}</Button>
            <span className={styles.divider} aria-hidden="true" />
            <Button variant="ghost" size="sm" iconLeft={<Icon icon={msLink} />} className={styles.tool}>{t('scalper.chain')}</Button>
            <button type="button" className={styles.active} aria-label={t('scalper.activeCount', { count: 14 })}>
              <span className={styles.activeIcon} aria-hidden="true">
                <Icon icon={msSwapHoriz} />
                <span className={styles.count}>14</span>
              </span>
              {t('scalper.active')}
            </button>
          </nav>
        </div>
      }
      bottom={
        <div className={styles.dock} data-surface="default">
          <Tabs
            aria-label={t('scalper.orderType')}
            appearance="pill-group"
            size="sm"
            value={orderType}
            onChange={setOrderType}
            items={[{ value: 'market', label: t('scalper.market') }, { value: 'limit', label: t('scalper.limit') }]}
            className={styles.orderType}
          />
          <div className={styles.order}>
            <div className={styles.side}>
              <Button variant="brand" size="md" fullWidth className={styles.buy}>{t('scalper.buy')}</Button>
              <span className={styles.req}>{t('scalper.required', { amount: '₹7,059.75' })}</span>
            </div>
            <div className={styles.qty}>
              <Stepper label={t('scalper.quantity')} value={quantity} onChange={setQuantity} min={LOT} step={LOT} size="lg" sublabel={t('scalper.lots', { count: quantity / LOT })} />
              <span className={styles.funds}>{t('scalper.funds', { amount: '₹-39.96' })}</span>
            </div>
            <div className={styles.side}>
              <Button variant="secondary" size="md" fullWidth className={styles.sell}>{t('scalper.sell')}</Button>
              <span className={styles.req}>{t('scalper.required', { amount: '₹1,57,436.49' })}</span>
            </div>
          </div>
        </div>
      }
      sheet={
        sheetOpen && (
          <Sheet label={t('scalper.chartTools')} onClose={() => setSheetOpen(false)} className={styles.sheet}>
            <ChartToolsSheet
              yourIndicators={createdIndicator ? [createdIndicator] : []}
              applied={applied}
              guide={Boolean(createdIndicator) && openIndicators !== false}
              onCreateIndicator={onCreateIndicator}
              onToggle={(name) => {
                const on = applied.includes(name)
                setApplied((a) => (on ? a.filter((n) => n !== name) : [...a, name]))
                if (!on) onApplyIndicator?.(name)
              }}
              onClearAll={() => setApplied([])}
            />
          </Sheet>
        )
      }
    >
      <ChartPanel instrument={scalperSpot} lines={overlay} applied={applied.length} onTools={() => setSheetOpen(true)} />
      <div className={styles.split}>
        <button type="button" className={styles.handle} aria-label={t('scalper.resize')} />
      </div>
      <ChartPanel instrument={scalperOption} refresh onTools={() => setSheetOpen(true)} />
    </Screen>
  )
}

/** One chart pane: the instrument (name ⇅, segment ⇅, link), its price and change, the pane's buttons, the chart. */
function ChartPanel({ instrument, lines, applied = 0, refresh, onTools }: { instrument: ScalperInstrument; lines?: PaneLine[]; /** Indicators on this chart: "N ▾" at its top-left (opens the sheet). */ applied?: number; /** The live app's reset button, bottom centre of the option chart. */ refresh?: boolean; onTools: () => void }) {
  const { name, segment, side, price, change, percent } = instrument
  return (
    <section className={styles.panel} aria-label={name}>
      <div className={styles.panelHead}>
        <div className={styles.instrument}>
          <div className={styles.nameRow}>
            <button type="button" className={styles.picker} aria-label={t('scalper.pickInstrument')}>
              <span className={styles.name}>{name}</span>
              {side && <span className={styles.segment}>{side}</span>}
              <Icon icon={msUnfoldMore} size={16} />
            </button>
            {segment && (
              <button type="button" className={styles.picker} aria-label={t('scalper.pickSegment')}>
                <span className={styles.segment}>{segment}</span>
                <Icon icon={msUnfoldMore} size={16} />
              </button>
            )}
            <Button variant="ghost" size="sm" iconLeft={<Icon icon={msJoin} />} aria-label={t('scalper.link')} className={styles.link} />
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{inr(price)}</span>
            <span className={styles.up}>{inr(change)}</span>
            <span className={styles.up}>
              <Icon icon={msArrowDropUp} size={16} />({percent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <Stack direction="horizontal" gap="08">
          <Button variant="tertiary" size="sm" iconLeft={<Icon icon={msPlaylistAdd} />} aria-label={t('scalper.chartTools')} onClick={onTools} className={styles.paneButton} />
        </Stack>
      </div>
      <div className={styles.chart}>
        <TradingPane candles={instrument.candles} start={instrument.start} minutes={instrument.minutes} lines={lines} label={t('scalper.chartLabel', { name })} />
        {applied > 0 && (
          <Button variant="ghost" size="sm" iconRight={<Icon icon={msKeyboardArrowDown} />} aria-label={t('scalper.indicatorCount', { count: applied })} onClick={onTools} className={styles.indicatorCount}>
            {applied}
          </Button>
        )}
        {refresh && <Button variant="tertiary" size="sm" iconLeft={<Icon icon={msRefresh} />} aria-label={t('scalper.refresh')} className={styles.refresh} />}
      </div>
    </section>
  )
}

const inr = (v: number) => v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** Exponential moving average of the closes — the applied indicator's illustrative lines. */
function ema(candles: ChartCandle[], period: number) {
  const k = 2 / (period + 1)
  return candles.reduce<number[]>((out, c, i) => [...out, i ? c.close * k + out[i - 1] * (1 - k) : c.close], [])
}
```

### `src/flows/fno/sheets/ChartToolsSheet.module.css`

```css
/*
 * Chart tools sheet (live app): a 96 side-nav column with a hairline on its right, the panel beside it scrolls.
 * About two thirds of the screen tall (live app: 571 of 872).
 */
.body {
  position: relative;
  display: grid;
  grid-template-columns: var(--l3-size-96) minmax(0, 1fr);
  height: calc(var(--l3-size-128) * 4.5); /* 576 — the live sheet's height; L3 has no size this large */
  max-height: 100%;
  transition: height var(--l3-motion-duration-medium) var(--l3-motion-easing-standard);
}

/* Search: the sheet opens to its full height (the sheet caps it under the status bar). */
.body[data-search] {
  height: 100vh;
}

/* NEW on the Zing yellow: content/inverted (white in light, black in dark). Beats L3's [data-flag-tone='zing']. */
.nav.nav[data-flag-tone] {
  --side-nav-flag-content: var(--l3-content-inverted);
}

.nav {
  padding: var(--l3-spacing-16) var(--l3-spacing-08);
  overflow-y: auto;
  box-shadow: inset -1px 0 0 var(--l3-border-light); /* 1px: Figma stroke weight has no variable */
}

.panel {
  min-height: 0;
  overflow-x: clip; /* scrolls up and down only (the lit guide box reaches 8 past the rows) */
  overflow-y: auto;
  padding: 0 var(--l3-spacing-16) var(--l3-spacing-24);
}

/* The panel's header (title + actions, or the search field) stays put while the lists scroll under it: the panel's
   full width, a 1px border-light line under it, the content 16 below. */
.header {
  position: sticky;
  top: 0;
  z-index: 3;
  margin: 0 calc(-1 * var(--l3-spacing-16)) var(--l3-spacing-16);
  padding: var(--l3-spacing-12) var(--l3-spacing-16);
  background: var(--l3-surface-primary);
  box-shadow: inset 0 -1px 0 var(--l3-border-light); /* 1px: Figma stroke weight has no variable */
}

.titleRow {
  min-height: var(--l3-size-40);
}

/* Your indicators' heading row: as tall as its Create button (40), centred with it. */
.sectionHead {
  min-height: var(--l3-size-40);
}

/* Header icons (search, clear all): 20 — 4 up from the Small button's 16 (designer's call). */
.headerIcon.headerIcon {
  --btn-icon-size: var(--l3-icon-size-20);
}

.title {
  margin: 0;
  font: var(--l3-text-heading-16); /* the sheet's heading: Heading/16 (was Label/16) */
  color: var(--l3-content-primary);
}

.subTitle {
  margin: 0;
  font: var(--l3-text-heading-14);
  color: var(--l3-content-primary);
}

.subDescription {
  margin: 0;
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}

.empty {
  margin: 0;
  font: var(--l3-text-description-14);
  color: var(--l3-content-tertiary);
}

/* Indicator rows: 48 tall — L3 card cell (Small), radius 8 (designer's call, 2026-10-27). */
.row.row.row {
  --cell-icon: var(--l3-icon-size-20); /* the star (and the applied ✕): 20, up from the Small cell's 16 */
  min-height: var(--l3-size-48);
  padding-block: var(--l3-spacing-06);
  border-radius: var(--l3-radius-08);
}

/* Flat rows: the light edge only, no drop shadow (designer's call, 2026-10-27; L3's clickable cell has elevation/low). */
.panel .row.row.row {
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px: Figma stroke weight has no variable */
}

.star {
  color: var(--l3-content-accent-discover-default);
}

/* On the chart (live app): the row turns blue — discover tint, edge and text, ✕ to take it off. */
.panel .row.row.row[data-selected] {
  background: var(--l3-surface-accent-discover-light);
  box-shadow: inset 0 0 0 1px var(--l3-border-accent-discover-default); /* 1px: Figma stroke weight has no variable */
  color: var(--l3-content-accent-discover-default);
}

.panel .row.row.row[data-selected] :is(span, p, svg) {
  color: var(--l3-content-accent-discover-default);
}

/* fx with the count: the discover edge and glyph. */
.fx.fx {
  --btn-border: var(--l3-border-accent-discover-default);
  --btn-content: var(--l3-content-accent-discover-default);
  --btn-surface: var(--l3-surface-accent-discover-light);
}


/* The coach mark's anchor hugs its content (inline): here it takes the panel's width, like Lemonn indicators below. */
.yours > * {
  display: flex;
  width: 100%;
}

.yours > * > section {
  flex: 1;
  min-width: 0;
}

/* Focus guide: the sheet dims (surface/overlay); Your indicators stays lit above it on the sheet's own surface. */
.dim {
  position: absolute;
  inset: 0;
  z-index: 4; /* over the sticky header (3) too: only Your indicators stays lit */
  background: var(--l3-surface-overlay);
  animation: guide-in var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) both;
}

/* The lit box is the tooltip's anchor itself, so the tooltip measures from the highlight's edge (its tip touches it). */
.yours[data-lit] {
  position: relative;
  z-index: 5;
}

/* The guide's tooltip: white with black text in both themes (static colours), lifted with the high elevation. Its
   arrow follows --tt-surface. */
.yours [role='tooltip'] {
  --tt-surface: var(--l3-static-white);
  color: var(--l3-static-black);
  box-shadow: var(--l3-shadow-elevation-high);
}

.yours [role='tooltip'] :is(button, svg, span) {
  color: inherit;
}

.yours[data-lit] > * {
  box-sizing: border-box;
  width: auto;
  max-width: none;
  margin: calc(-1 * var(--l3-spacing-08));
  padding: var(--l3-spacing-08);
  border-radius: var(--l3-radius-12);
  background: var(--l3-surface-primary);
}

@keyframes guide-in {
  from {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dim {
    animation: none;
  }
}

/* Your indicators' rows: a long press opens the details (no text selection / callout while holding). */
.pressable {
  -webkit-touch-callout: none;
  user-select: none;
}

/* The line under Your indicators: each hint slides up into place as it changes. */
.hint {
  display: inline-block;
  animation: tools-hint var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) both;
}

@keyframes tools-hint {
  from {
    opacity: 0;
    transform: translateY(var(--l3-spacing-06));
  }
}

/* The details sheet's header icon: a ★ on a light discover tile (the colour Your indicators use). */
.detailsIcon {
  display: grid;
  place-items: center;
  width: var(--l3-size-64);
  height: var(--l3-size-64);
  border-radius: var(--l3-radius-16);
  background: var(--l3-surface-accent-discover-light);
  color: var(--l3-content-accent-discover-default);
}

@media (prefers-reduced-motion: reduce) {
  .hint {
    animation: none;
  }
}
```

### `src/flows/fno/sheets/ChartToolsSheet.tsx`

```tsx
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@l3/components/Badge'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { SideNav } from '@l3/components/SideNav'
import { Stack } from '@l3/components/Stack'
import { TextField } from '@l3/components/TextField'
import { Tooltip } from '@l3/components/Tooltip'
import { msAdd, msBookmarkFill, msClose, msDelete, msDraw, msFunction, msSearch, msSettings, msSpaceBar, msStar, msStarFill, msSwapHoriz } from '@l3/icons/material'
import { t } from '../copy'
import { lemonnIndicators } from '../data'
import { IndicatorDetailsSheet } from './IndicatorDetailsSheet'
import styles from './ChartToolsSheet.module.css'

type Section = 'range' | 'zing' | 'indicators' | 'drawings' | 'templates' | 'settings'

type ChartToolsSheetProps = {
  /** Indicators the user made with DASH AI (Your indicators). */
  yourIndicators: string[]
  /** Indicators on the chart now, in the order they were added. */
  applied: string[]
  /** A row tapped: on the chart → off, off → on. The sheet stays open. */
  onToggle: (name: string) => void
  /** The bin in the header: take every indicator off the chart. */
  onClearAll: () => void
  onCreateIndicator?: () => void
  /**
   * Focus guide (arriving from DASH's View indicator): the rest of the sheet dims, Your indicators stays lit with a
   * one-line tooltip above it and a ✕. ✕ (or picking one) ends it. Shown once only.
   */
  guide?: boolean
}

/**
 * Chart tools (the chart's "add" button): a Side nav of tool groups on the left, the chosen group on the right. Only
 * Indicators is built, in the live app's states:
 * - nothing on the chart: "Indicators" · search;
 * - some on the chart: "Indicators (2)" · bin (take all off) · fx with the count · search; each one on the chart is a
 *   blue row with ✕ — tapping a row adds or removes it, several at once;
 * - search: a search field takes the title's place, the list filters as you type, the sheet opens to full height.
 * Your indicators ("Made with DASH AI" under the heading; or "No indicators created yet.") and Create indicator sit above
 * Lemonn indicators. An indicator made with DASH is a favourite from the start (filled star).
 */
export function ChartToolsSheet({ yourIndicators, applied, onToggle, onClearAll, onCreateIndicator, guide = false }: ChartToolsSheetProps) {
  const [section, setSection] = useState<Section>('indicators')
  const [guiding, setGuiding] = useState(() => guide && !guideSeen())
  // Shown once: as soon as it's up, it's remembered (prototype: in this browser).
  useEffect(() => { if (guiding) markGuideSeen() }, [guiding])
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const title = t(`tools.${section}`)
  const count = applied.length
  const toggle = (name: string) => {
    setGuiding(false)
    onToggle(name)
  }

  // Your indicators: a long press (½ s) opens its details sheet instead of adding / removing it.
  const [details, setDetails] = useState<string | null>(null)
  const pressTimer = useRef<number | undefined>(undefined)
  const longPressed = useRef(false)
  const root = useRef<HTMLDivElement>(null)
  const longPress = (name: string) => ({
    onPointerDown: () => {
      longPressed.current = false
      window.clearTimeout(pressTimer.current)
      pressTimer.current = window.setTimeout(() => {
        longPressed.current = true
        setDetails(name)
      }, LONG_PRESS_MS)
    },
    onPointerUp: () => window.clearTimeout(pressTimer.current),
    onPointerLeave: () => window.clearTimeout(pressTimer.current),
    onPointerCancel: () => window.clearTimeout(pressTimer.current),
    onContextMenu: (e: { preventDefault: () => void }) => e.preventDefault(),
    // the click that ends a long press doesn't also toggle the row
    onClickCapture: (e: { stopPropagation: () => void; preventDefault: () => void }) => {
      if (!longPressed.current) return
      longPressed.current = false
      e.stopPropagation()
      e.preventDefault()
    },
  })

  // "Made with DASH AI" ⇄ "Long press for more options" under Your indicators, every 3 s.
  const hints = [t('tools.byDash'), t('tools.longPressHint')]
  const [hint, setHint] = useState(0)
  useEffect(() => {
    if (!yourIndicators.length) return
    const id = window.setInterval(() => setHint((h) => (h + 1) % hints.length), HINT_MS)
    return () => window.clearInterval(id)
  }, [yourIndicators.length, hints.length])

  const row = (name: string, description?: string, wrap = false) => {
    const on = applied.includes(name)
    const mine = yourIndicators.includes(name)
    const cell = (
      <ListCell
        key={name}
        variant="card"
        size="sm"
        multiline={wrap}
        label={name}
        description={description}
        iconLeft={<Icon icon={yourIndicators.includes(name) ? msStarFill : msStar} className={styles.star} />}
        iconRight={on ? <Icon icon={msClose} /> : undefined}
        selected={on}
        onClick={() => toggle(name)}
        className={styles.row}
      />
    )
    return mine ? <div key={name} className={styles.pressable} {...longPress(name)}>{cell}</div> : cell
  }

  const q = query.trim().toLowerCase()
  const results = [...yourIndicators, ...lemonnIndicators].filter((name) => name.toLowerCase().includes(q))

  return (
    <div ref={root} className={styles.body} data-search={searching || undefined}>
      {guiding && <div className={styles.dim} aria-hidden="true" />}
      <SideNav<Section>
        selectedTone="discover"
        aria-label={t('scalper.chartTools')}
        aria-controls="chart-tools-panel"
        value={section}
        onChange={setSection}
        flagTone="zing"
        className={styles.nav}
        items={[
          { value: 'range', label: t('tools.range'), icon: <Icon icon={msSpaceBar} /> },
          { value: 'zing', label: t('tools.zing'), icon: <Icon icon={msSwapHoriz} />, flag: t('tools.new') },
          { value: 'indicators', label: t('tools.indicators'), icon: <Icon icon={msFunction} /> },
          { value: 'drawings', label: t('tools.drawings'), icon: <Icon icon={msDraw} /> },
          { value: 'templates', label: t('tools.templates'), icon: <Icon icon={msBookmarkFill} /> },
          { value: 'settings', label: t('tools.settings'), icon: <Icon icon={msSettings} /> },
        ]}
      />
      <section id="chart-tools-panel" className={styles.panel} role="tabpanel" aria-label={title}>
        <div className={styles.header}>
        {section === 'indicators' && searching ? (
          <TextField
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('tools.searchPlaceholder')}
            aria-label={t('tools.search', { section: title })}
            iconLeft={<Icon icon={msSearch} />}
            iconRight={<Button variant="ghost" size="sm" iconLeft={<Icon icon={msClose} />} aria-label={t('tools.closeSearch')} onClick={() => { setSearching(false); setQuery('') }} />}
            className={styles.search}
          />
        ) : (
          <Stack direction="horizontal" align="center" justify="between" gap="12" className={styles.titleRow}>
            <h2 className={styles.title}>{section === 'indicators' && count ? t('tools.indicatorsCount', { count }) : title}</h2>
            <Stack direction="horizontal" align="center" gap="16">
              {section === 'indicators' && count > 0 && (
                <>
                  <Button variant="ghost" size="sm" iconLeft={<Icon icon={msDelete} />} aria-label={t('tools.clearAll')} onClick={onClearAll} className={styles.headerIcon} />
                  <Badge count={count} color="discover" label={t('tools.onChart')}>
                    <Button variant="tertiary" size="sm" iconLeft={<Icon icon={msFunction} />} aria-label={t('tools.onChartList', { count })} className={styles.fx} />
                  </Badge>
                </>
              )}
              <Button variant="ghost" size="sm" iconLeft={<Icon icon={msSearch} />} aria-label={t('tools.search', { section: title })} onClick={() => section === 'indicators' && setSearching(true)} className={styles.headerIcon} />
            </Stack>
          </Stack>
        )}
        </div>

        {section !== 'indicators' ? (
          <p className={styles.empty}>{t('tools.soon')}</p>
        ) : searching ? (
          results.length ? <Stack gap="12">{results.map((name) => row(name, undefined, true))}</Stack> : <p className={styles.empty}>{t('tools.noResults', { query })}</p>
        ) : (
          <Stack gap="24">
            <div className={styles.yours} data-lit={guiding || undefined}>
              <Tooltip open={guiding} content={t('tools.guideTip')} placement="bottom" onClose={() => setGuiding(false)}>
                <Stack as="section" gap="12" aria-label={t('tools.yours')}>
                  <Stack direction="horizontal" align="center" justify="between" className={styles.sectionHead}>
                    <Stack gap="00">
                      <h3 className={styles.subTitle}>{t('tools.yours')}</h3>
                      <p className={styles.subDescription} aria-live="polite">
                        <span key={hint} className={styles.hint}>{yourIndicators.length ? hints[hint] : t('tools.byDash')}</span>
                      </p>
                    </Stack>
                    <Button variant="tertiary" size="sm" iconLeft={<Icon icon={msAdd} />} aria-label={t('tools.createLabel')} onClick={onCreateIndicator}>{t('tools.create')}</Button>
                  </Stack>
                  {yourIndicators.length ? <Stack gap="12">{yourIndicators.map((name) => row(name))}</Stack> : <p className={styles.empty}>{t('tools.none')}</p>}
                </Stack>
              </Tooltip>
            </div>
            <Stack as="section" gap="12" aria-label={t('tools.lemonn')}>
              <h3 className={styles.subTitle}>{t('tools.lemonn')}</h3>
              <Stack gap="12">{lemonnIndicators.map((name) => row(name))}</Stack>
            </Stack>
          </Stack>
        )}
      </section>
      {details && (
        <IndicatorDetailsSheet
          name={details}
          onChart={applied.includes(details)}
          onToggle={() => onToggle(details)}
          onOpenInDash={() => {
            setDetails(null)
            onCreateIndicator?.()
          }}
          onClose={() => setDetails(null)}
          // Inside the Chart tools sheet's own layer, so it opens on top of it (over the same phone screen).
          container={root.current?.closest<HTMLElement>('[role="dialog"]')?.parentElement ?? undefined}
        />
      )}
    </div>
  )
}

/** Long press to open an indicator's details; how often the hint under Your indicators changes. */
const LONG_PRESS_MS = 500
const HINT_MS = 3000

/** The Your indicators guide shows once per person (here: once per browser). */
const GUIDE_KEY = 'fno.yourIndicatorsGuideSeen'
function guideSeen() {
  try { return localStorage.getItem(GUIDE_KEY) === '1' } catch { return false }
}
function markGuideSeen() {
  try { localStorage.setItem(GUIDE_KEY, '1') } catch { /* storage off: it may show again next visit */ }
}
```

### `src/flows/fno/sheets/HomeSheets.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Inset } from '@l3/components/Inset'
import { ListCell } from '@l3/components/ListCell'
import { PriceChange } from '@l3/components/PriceChange'
import { Radio } from '@l3/components/Checkbox'
import { Stack } from '@l3/components/Stack'
import { TextField } from '@l3/components/TextField'
import { inr } from '../../../shared/data/format'
import { Sheet } from '../../../shared/ui/Sheet'
import { t } from '../copy'
import type { Contract } from '../data'

export function ChoiceSheet({ title, values, value, onPick, onClose }: { title: string; values: string[]; value: string; onPick: (v: string) => void; onClose: () => void }) {
  const id = useId()
  return <Sheet labelledBy={id} onClose={onClose} header={<BottomSheetHeader heading={title} headingId={id} />}><Inset paddingInline="16" paddingBlock="16"><Stack>{values.map((v) => <ListCell key={v} as="label" label={v} trailing={<Radio name={id} checked={v === value} onChange={() => { onPick(v); onClose() }} />} />)}</Stack></Inset></Sheet>
}

export function CreateWatchlistSheet({ onCreate, onClose }: { onCreate: (name: string) => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const id = useId()
  return <Sheet labelledBy={id} onClose={onClose} header={<BottomSheetHeader heading={t('watchlists.create')} headingId={id} />} footer={<ButtonGroup aria-label={t('watchlists.create')}><Button disabled={!name.trim()} onClick={() => onCreate(name.trim())}>{t('watchlists.create')}</Button></ButtonGroup>}><Inset paddingInline="16" paddingBlock="24"><TextField label={t('watchlists.name')} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} /></Inset></Sheet>
}

export function DetailSheet({ title, contract, onClose }: { title: string; contract?: Contract; onClose: () => void }) {
  const id = useId()
  return <Sheet labelledBy={id} onClose={onClose} header={<BottomSheetHeader heading={title} description={contract?.description ?? t('prototype.description')} headingId={id} />} footer={<ButtonGroup aria-label={title}><Button onClick={onClose}>{t('close')}</Button></ButtonGroup>}>
    {contract && <Inset paddingInline="16" paddingBlock="16"><Stack><ListCell label={t('contract.price')} trailing={inr(contract.price, 2)} /><ListCell label={t('contract.change')} trailing={<PriceChange value={contract.change} unit="percent" size="sm" />} /><ListCell label={t('contract.volume')} trailing={contract.volume.toLocaleString('en-IN')} /></Stack></Inset>}
  </Sheet>
}
```

### `src/flows/fno/sheets/IlliquidSheet.tsx`

```tsx
import { IlliquidSheet as SharedIlliquidSheet } from '../../../shared/ui/IlliquidSheet'
import { t } from '../copy'

/** F&O's “What does illiquidity mean?” sheet: the shared sheet with this flow's words. */
export function IlliquidSheet({ contract, onClose }: { contract?: string; onClose: () => void }) {
  return <SharedIlliquidSheet onClose={onClose} copy={{
    title: t('illiquid.title'),
    description: contract ? t('illiquid.forContract', { contract }) : t('illiquid.general'),
    points: [t('illiquid.point1'), t('illiquid.point2'), t('illiquid.point3')],
    ok: t('illiquid.ok'),
  }} />
}
```

### `src/flows/fno/sheets/IndicatorDetailsSheet.tsx`

```tsx
import { useId } from 'react'
import { BottomSheet, BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { Switch } from '@l3/components/Switch'
import { msStarFill } from '@l3/icons/material'
import { t } from '../copy'
import styles from './ChartToolsSheet.module.css'

/**
 * Your indicator's details, from a long press on it in Chart tools: the large header (★ on a tile, its name, "Made
 * with DASH AI"), one switch card — Show on chart (adds / removes it, like a tap on its row) — and Open in DASH (to
 * change it) / Done. Opens over the Chart tools sheet, inside the phone.
 */
export function IndicatorDetailsSheet({ name, onChart, onToggle, onOpenInDash, onClose, container }: {
  name: string
  onChart: boolean
  onToggle: () => void
  onOpenInDash?: () => void
  onClose: () => void
  container?: HTMLElement | null
}) {
  const id = useId()
  return (
    <BottomSheet
      open
      onClose={onClose}
      container={container}
      aria-labelledby={id}
      header={<BottomSheetHeader size="lg" headingId={id} heading={name} description={t('tools.byDash')} icon={<span className={styles.detailsIcon}><Icon icon={msStarFill} size={24} /></span>} />}
      footer={
        <ButtonGroup aria-label={name} direction="horizontal">
          <Button variant="secondary" onClick={onClose}>{t('tools.detailsDone')}</Button>
          <Button onClick={onOpenInDash}>{t('tools.openInDash')}</Button>
        </ButtonGroup>
      }
    >
      <ListCell
        variant="card"
        as="label"
        label={t('tools.showOnChart')}
        description={onChart ? t('tools.isOnChart') : t('tools.notOnChart')}
        trailing={<Switch checked={onChart} onChange={onToggle} aria-label={t('tools.showOnChart')} />}
      />
    </BottomSheet>
  )
}
```

### `src/flows/fno/strategies/components/Strategies.module.css`

```css
/* Strategies tab — flow-only pieces on L3 tokens. */
.section { display: flex; flex-direction: column; gap: var(--l3-spacing-16); }
.pillDivider { flex: none; align-self: stretch; width: 1px; background: var(--l3-border-light); }
.caption { font: var(--l3-text-label-10); color: var(--l3-content-tertiary); white-space: nowrap; }
.statLabel { font: var(--l3-text-label-12); color: var(--l3-content-tertiary); white-space: nowrap; }
.statValue { font: var(--l3-text-heading-12); white-space: nowrap; }
.title16 { font: var(--l3-text-heading-16); white-space: nowrap; }
.fill { width: 100%; }
.ellipsis { overflow: hidden; text-overflow: ellipsis; }
.muted { color: var(--l3-content-tertiary); }
.strike { font: var(--l3-text-label-10); color: var(--l3-content-tertiary); }
.apply { flex: none; min-width: var(--l3-size-80); }
.invest { flex: none; }
.play { display: inline-flex; color: var(--l3-content-accent-error-default); }
.fire { display: inline-flex; color: var(--l3-content-accent-warning-default); }

/* Last week: one 16 circle per weekday, tinted by result. */
.day { display: inline-flex; align-items: center; justify-content: center; width: var(--l3-size-16); height: var(--l3-size-16); border-radius: var(--l3-radius-full); font: var(--l3-text-heading-10); }
.win { background: var(--l3-surface-accent-indicator-up-light); color: var(--l3-content-accent-indicator-up-default); }
.loss { background: var(--l3-surface-accent-indicator-down-light); color: var(--l3-content-accent-indicator-down-default); }
.none { background: var(--l3-surface-secondary); color: var(--l3-content-disabled); }

/* Payoff sketch: loss area left of the breakeven, profit area right of it. */
.payoff { flex: none; width: var(--l3-size-40); height: var(--l3-size-28); }
.lossArea { fill: var(--l3-surface-accent-indicator-down-light); }
.profitArea { fill: var(--l3-surface-accent-indicator-up-light); }
.lossLine, .profitLine { fill: none; stroke-width: 1.5; }
.lossLine { stroke: var(--l3-content-accent-indicator-down-default); }
.profitLine { stroke: var(--l3-content-accent-indicator-up-default); }

/* Quick Trade: outlined up / down buttons (L3 has filled Buy / Sell only — see L3 gaps). */
.upButton.upButton[data-variant] { --btn-content: var(--l3-content-accent-indicator-up-default); --btn-border: var(--l3-border-accent-indicator-up-default); }
.downButton.downButton[data-variant] { --btn-content: var(--l3-content-accent-indicator-down-default); --btn-border: var(--l3-border-accent-indicator-down-default); }
```

### `src/flows/fno/strategies/components/StrategiesFeed.tsx`

```tsx
import { useState } from 'react'
import { Avatar } from '@l3/components/Avatar'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tab, Tabs } from '@l3/components/Tabs'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { msBoltFill, msChevronRight, msLocalFireDepartmentFill, msPlayCircleFill, msStar, msTrendingDown, msTrendingUp, msVisibility, msVisibilityOff } from '@l3/icons/material'
import { inr } from '../../../../shared/data/format'
import { Rail } from '../../../../shared/ui/Rail'
import { Shortcuts } from '../../components/Discovery'
import type { Choose } from '../../components/ContractSection'
import { t } from '../../copy'
import { prebuilt, smartInvests, underlyings, zingTrades, type Prebuilt, type Segment, type SmartInvest, type View, type ZingTrade } from '../data'
import parts from '../../components/HomeParts.module.css'
import styles from './Strategies.module.css'

type Props = {
  /** Equity or Commodities (the pill group under the shortcuts). */
  segment: Segment
  onSegment: (segment: Segment) => void
  onChoose: Choose
  onDestination: (name: string) => void
  onWatchlist: () => void
}

/** The Strategies tab of F&O home (Figma 6754:64178 Equity, 6754:64607 Commodities). */
export function StrategiesFeed({ segment, onSegment, onChoose, onDestination, onWatchlist }: Props) {
  const [underlying, setUnderlying] = useState(underlyings[segment][0])
  const [quick, setQuick] = useState(underlyings[segment][0])
  const [view, setView] = useState<View>('bullish')
  const switchSegment = (next: Segment) => { onSegment(next); setUnderlying(underlyings[next][0]); setQuick(underlyings[next][0]) }
  const views = (['bullish', 'bearish', 'neutral', 'volatile'] as const).map((value) => ({ value, label: t(`strategies.${value}`) }))
  return <Stack gap="32" className={parts.feed}>
    <Shortcuts onWatchlist={onWatchlist} onDestination={onDestination} />
    <div className={parts.inset}><Tabs aria-label={t('strategies.segment')} appearance="pill-group" width="fill" value={segment} onChange={switchSegment} items={[{ value: 'equity', label: t('equity') }, { value: 'commodities', label: t('commodities') }]} /></div>

    <section className={styles.section} aria-label={t('strategies.zing')}>
      <div className={parts.inset}><SectionHeader title={t('strategies.zing')} action={{ type: 'view-all', label: t('strategies.explore'), onClick: () => onDestination(t('strategies.zing')) }} /></div>
      <Rail label={t('strategies.zing')} visible={1.08}>{zingTrades.map((trade) => <ZingTradeCard key={trade.id} trade={trade} onOpen={onDestination} />)}</Rail>
    </section>

    <section className={styles.section} aria-label={t('strategies.smartInvest')}>
      <div className={parts.inset}><SectionHeader title={t('strategies.smartInvest')} action={{ type: 'view-all', label: t('viewAll'), onClick: () => onDestination(t('strategies.smartInvest')) }} /></div>
      <Rail label={t('strategies.smartInvest')} visible={1.08}>{smartInvests[segment].map((invest) => <SmartInvestCard key={invest.id} invest={invest} onOpen={onDestination} />)}</Rail>
    </section>

    <section className={styles.section} aria-label={t('strategies.prebuilt')}>
      <div className={parts.inset}><SectionHeader title={t('strategies.prebuilt')} action={{ type: 'view-all', label: t('strategies.explore'), onClick: () => onDestination(t('strategies.prebuilt')) }} /></div>
      <Stack direction="horizontal" gap="08" align="center" className={[parts.filterRow, parts.inset].join(' ')}>
        <Tab appearance="pill" size="sm" emphasis="secondary" action iconRight={<Icon icon={lmSwitchArrowVertical} size={12} />} aria-label={t('strategies.underlying')} onClick={() => onChoose(t('strategies.pickUnderlying'), underlyings[segment], underlying, setUnderlying)}>{underlying}</Tab>
        <span className={styles.pillDivider} aria-hidden />
        <Tabs aria-label={t('strategies.prebuilt')} appearance="pill" size="sm" value={view} onChange={setView} items={views} />
      </Stack>
      <Rail label={t('strategies.prebuilt')} visible={1.08}>{prebuilt[view].map((strategy) => <PrebuiltCard key={strategy.id} strategy={strategy} onOpen={onDestination} />)}</Rail>
    </section>

    <div className={parts.inset}><QuickTrade underlying={quick} onUnderlying={() => onChoose(t('strategies.pickUnderlying'), underlyings[segment], quick, setQuick)} onTrade={onDestination} /></div>
  </Stack>
}

/** Zing Trades: trader, today's return, last week's Mon–Fri results, average trades and win rate; ☆ · Learn · Apply. */
function ZingTradeCard({ trade, onOpen }: { trade: ZingTrade; onOpen: (name: string) => void }) {
  const days = ['M', 'T', 'W', 'T', 'F']
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  return <Card onClick={() => onOpen(trade.name)} footerFilled footer={<Stack direction="horizontal" gap="08" align="center" className={styles.fill}>
    <Button variant="secondary" size="sm" aria-label={t('strategies.favourite', { name: trade.name })} iconLeft={<Icon icon={msStar} size={16} />} onClick={() => onOpen(t('strategies.favourite', { name: trade.name }))} />
    <Button variant="secondary" size="sm" fullWidth iconLeft={<span className={styles.play}><Icon icon={msPlayCircleFill} size={16} /></span>} iconRight={<Icon icon={msChevronRight} size={16} />} onClick={() => onOpen(t('strategies.learn'))}>{t('strategies.learn')}</Button>
    <Button variant="primary" size="sm" className={styles.apply} onClick={() => onOpen(`${t('strategies.apply')} ${trade.name}`)}>{t('strategies.apply')}</Button>
  </Stack>}>
    <Stack gap="12">
      <Stack direction="horizontal" gap="08" align="center" justify="between">
        <Stack direction="horizontal" gap="08" align="center"><Avatar initials={trade.trader.split(' ').map((n) => n[0]).join('')} size={32} label={trade.trader} /><Stack gap="04"><p className={parts.heading}>{trade.name}</p><p className={styles.caption}>{t('strategies.builtWith')}</p></Stack></Stack>
        <Stack gap="04" align="end"><p className={[parts.heading, parts.up].join(' ')}>{trade.todayReturn}%</p><p className={styles.caption}>{t('strategies.todayReturns')}</p></Stack>
      </Stack>
      <div className={parts.divider} />
      <Stack direction="horizontal" align="center" justify="between">
        <Stack gap="04"><p className={styles.statLabel}>{t('strategies.lastWeek')}</p><Stack direction="horizontal" gap="04">{trade.week.map((result, i) => <span key={i} className={[styles.day, styles[result]].join(' ')} aria-label={t(result === 'win' ? 'strategies.dayWin' : result === 'loss' ? 'strategies.dayLoss' : 'strategies.dayFlat', { day: dayNames[i] })}>{days[i]}</span>)}</Stack></Stack>
        <Stack gap="04" align="center"><p className={styles.statLabel}>{t('strategies.avgTrades')}</p><p className={styles.statValue}>{t('strategies.perDay', { count: trade.tradesPerDay })}</p></Stack>
        <Stack gap="04" align="end"><p className={styles.statLabel}>{t('strategies.winRate')}</p><Stack direction="horizontal" gap="04" align="center" className={parts.up}><Icon icon={msTrendingUp} size={16} /><p className={styles.statValue}>{trade.winRate}%</p></Stack></Stack>
      </Stack>
    </Stack>
  </Card>
}

/** Smart Invest: basket, min. deposit, 7 / 30 day P&L (switcher + hide), AUM, slots left; monthly charges + Invest now. */
function SmartInvestCard({ invest, onOpen }: { invest: SmartInvest; onOpen: (name: string) => void }) {
  const [days30, setDays30] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pnl = days30 ? invest.pnl30 : invest.pnl7
  // Not a clickable card: its body holds the P&L switcher and the hide button (no buttons inside a button).
  return <Card footerFilled footer={<Stack direction="horizontal" align="center" justify="between" className={styles.fill}>
    <Stack gap="04"><p className={styles.statLabel}>{t('strategies.charges')}</p><p className={styles.statValue}>{inr(invest.charges, 0)} <s className={styles.strike}>{inr(invest.chargesBefore, 0)}</s></p></Stack>
    <Button variant="primary" size="sm" className={styles.invest} onClick={() => onOpen(`${t('strategies.invest')} · ${invest.name}`)}>{t('strategies.invest')}</Button>
  </Stack>}>
    <Stack gap="12">
      <Stack direction="horizontal" gap="08" align="center" justify="between">
        <Stack direction="horizontal" gap="08" align="center" className={parts.grow}><Avatar initials={invest.name.slice(0, 2)} size={40} /><Stack gap="04" className={parts.grow}><p className={[styles.title16, styles.ellipsis].join(' ')}>{invest.name}</p><p className={styles.statLabel}>{t('strategies.by', { name: invest.by })}</p></Stack></Stack>
        <Stack gap="04" align="end"><p className={styles.title16}>{inr(invest.minDeposit, 0)}</p><p className={styles.statLabel}>{t('strategies.minDeposit')}</p></Stack>
      </Stack>
      <div className={parts.divider} />
      <Stack direction="horizontal" align="center" justify="between">
        <Stack gap="04"><Select size="sm" onClick={() => setDays30(!days30)}>{t(days30 ? 'strategies.pnl30' : 'strategies.pnl7')}</Select><Stack direction="horizontal" gap="04" align="center"><p className={[styles.statValue, parts.up].join(' ')}>{hidden ? '••••' : `${pnl}%`}</p><Button variant="ghost" size="sm" aria-label={t('strategies.showPnl')} iconLeft={<Icon icon={hidden ? msVisibilityOff : msVisibility} size={16} />} onClick={() => setHidden(!hidden)} /></Stack></Stack>
        <Stack gap="04" align="center"><p className={styles.statLabel}>{t('strategies.aum')}</p><p className={styles.statValue}>{invest.aum}</p></Stack>
        <Stack gap="04" align="end"><p className={styles.statLabel}>{t('strategies.slots')}</p><Stack direction="horizontal" gap="04" align="center"><span className={styles.fire}><Icon icon={msLocalFireDepartmentFill} size={16} /></span><p className={styles.statValue}>{invest.slotsLeft}<span className={styles.muted}>/{invest.slots}</span></p></Stack></Stack>
      </Stack>
    </Stack>
  </Card>
}

/** A pre-build strategy: probability of profit, name, funds required, max profit / loss and a payoff sketch. */
function PrebuiltCard({ strategy, onOpen }: { strategy: Prebuilt; onOpen: (name: string) => void }) {
  return <Card onClick={() => onOpen(strategy.name)}>
    <Stack gap="12">
      <Stack direction="horizontal" align="center" justify="between"><p className={styles.title16}>{t('strategies.pop')}</p><p className={[styles.title16, parts.up].join(' ')}>+{strategy.probability}%</p></Stack>
      <Stack direction="horizontal" align="center" justify="between"><p className={styles.statLabel}>{strategy.name}</p><p className={styles.statLabel}>{t('strategies.funds', { amount: inr(strategy.funds, 0) })}</p></Stack>
      <div className={parts.divider} />
      <Stack direction="horizontal" align="center" justify="between">
        <Stack gap="04">
          <p className={styles.statLabel}>{t('strategies.maxProfit')} <span className={parts.up}>{strategy.maxProfit === null ? t('strategies.unlimited') : inr(strategy.maxProfit, 0)}</span></p>
          <p className={styles.statLabel}>{t('strategies.maxLoss')} <span className={parts.down}>{inr(strategy.maxLoss, 0)}</span></p>
        </Stack>
        <svg className={styles.payoff} viewBox="0 0 40 28" role="img" aria-label={t('strategies.payoff')}>
          <rect className={styles.lossArea} x="0" y="14" width="18" height="10" />
          <rect className={styles.profitArea} x="22" y="4" width="18" height="10" />
          <polyline className={styles.lossLine} points="0,24 16,24 20,14" />
          <polyline className={styles.profitLine} points="20,14 24,4 40,4" />
        </svg>
      </Stack>
    </Stack>
  </Card>
}

/** Quick Trade: "Which way will GOLD ⌄ move?" and an Up / Down choice. */
function QuickTrade({ underlying, onUnderlying, onTrade }: { underlying: string; onUnderlying: () => void; onTrade: (name: string) => void }) {
  return <Card>
    <Stack gap="12">
      <Stack direction="horizontal" align="center" justify="between"><Stack direction="horizontal" gap="04" align="center"><Icon icon={msBoltFill} size={16} /><p className={styles.statValue}>{t('strategies.quick')}</p></Stack><p className={styles.statLabel}>{t('strategies.beginner')}</p></Stack>
      <div className={parts.divider} />
      <Stack direction="horizontal" gap="04" align="center"><p className={styles.title16}>{t('strategies.which')}</p><Select size="lg" icon="chevron" aria-label={t('strategies.pickUnderlying')} onClick={onUnderlying}>{underlying}</Select><p className={styles.title16}>{t('strategies.move')}</p></Stack>
      <Stack direction="horizontal" gap="12">
        <Button variant="secondary" size="md" fullWidth className={styles.upButton} iconLeft={<Icon icon={msTrendingUp} size={16} />} onClick={() => onTrade(`${underlying} · ${t('strategies.up')}`)}>{t('strategies.up')}</Button>
        <Button variant="secondary" size="md" fullWidth className={styles.downButton} iconLeft={<Icon icon={msTrendingDown} size={16} />} onClick={() => onTrade(`${underlying} · ${t('strategies.down')}`)}>{t('strategies.down')}</Button>
      </Stack>
    </Stack>
  </Card>
}
```

### `src/flows/fno/strategies/data.ts`

```ts
/** Snapshot examples from Figma 6754:64178 (Strategies → Equity) and 6754:64607 (Strategies → Commodities); not live data. */

export type Segment = 'equity' | 'commodities'

/** A Zing Trades card: a strategy built with DASH Ai. `week` is Mon–Fri: won, lost, or no trade. */
export type ZingTrade = { id: string; name: string; trader: string; todayReturn: number; week: ('win' | 'loss' | 'none')[]; tradesPerDay: number; winRate: number }
const zing = (id: string, name: string, trader: string): ZingTrade => ({ id, name, trader, todayReturn: 78, week: ['win', 'win', 'none', 'win', 'loss'], tradesPerDay: 2, winRate: 58 })
export const zingTrades: ZingTrade[] = [zing('ema-9', 'EMA Cross 9', 'Arjun Mehta'), zing('rsi-rev', 'RSI Reversal', 'Neha Iyer'), zing('vwap', 'VWAP Bounce', 'Rahul Verma')]

/** A Smart Invest card: a managed basket. Amounts in rupees; `pnl7` is the 7-day P&L in percent. */
export type SmartInvest = { id: string; name: string; by: string; minDeposit: number; pnl7: number; pnl30: number; aum: string; slotsLeft: number; slots: number; charges: number; chargesBefore: number }
export const smartInvests: Record<Segment, SmartInvest[]> = {
  equity: [
    { id: 'osa', name: 'OptionsSensexAlpha', by: 'lemonn', minDeposit: 50000, pnl7: 64.4, pnl30: 81.2, aum: '10L', slotsLeft: 80, slots: 100, charges: 0, chargesBefore: 300 },
    { id: 'nifty-theta', name: 'NiftyThetaPlus', by: 'lemonn', minDeposit: 75000, pnl7: 22.1, pnl30: 40.5, aum: '25L', slotsLeft: 12, slots: 100, charges: 0, chargesBefore: 300 },
  ],
  commodities: [
    { id: 'osa', name: 'OptionsSensexAlpha', by: 'lemonn', minDeposit: 50000, pnl7: 64.4, pnl30: 81.2, aum: '10L', slotsLeft: 80, slots: 100, charges: 0, chargesBefore: 300 },
    { id: 'gold-carry', name: 'GoldCarryPro', by: 'lemonn', minDeposit: 60000, pnl7: 18.6, pnl30: 33.9, aum: '8L', slotsLeft: 41, slots: 100, charges: 0, chargesBefore: 300 },
  ],
}

/** Pre-build strategies per view. `funds` = funds required, `maxLoss` in rupees; `maxProfit` null = unlimited. */
export type View = 'bullish' | 'bearish' | 'neutral' | 'volatile'
export type Prebuilt = { id: string; name: string; probability: number; funds: number; maxProfit: number | null; maxLoss: number }
export const prebuilt: Record<View, Prebuilt[]> = {
  bullish: [
    { id: 'bcs', name: 'Bull call spread', probability: 59.8, funds: 186456, maxProfit: null, maxLoss: 99999 },
    { id: 'bps', name: 'Bull put spread', probability: 64.2, funds: 142300, maxProfit: 42500, maxLoss: 57500 },
  ],
  bearish: [
    { id: 'bpsd', name: 'Bear put spread', probability: 41.5, funds: 120800, maxProfit: 64000, maxLoss: 36000 },
    { id: 'bccs', name: 'Bear call spread', probability: 62.7, funds: 138900, maxProfit: 38200, maxLoss: 61800 },
  ],
  neutral: [
    { id: 'ic', name: 'Iron condor', probability: 71.3, funds: 165000, maxProfit: 28400, maxLoss: 71600 },
    { id: 'ss', name: 'Short strangle', probability: 68.9, funds: 245000, maxProfit: 31200, maxLoss: 99999 },
  ],
  volatile: [
    { id: 'ls', name: 'Long straddle', probability: 38.4, funds: 52300, maxProfit: null, maxLoss: 52300 },
    { id: 'lsg', name: 'Long strangle', probability: 33.1, funds: 31800, maxProfit: null, maxLoss: 31800 },
  ],
}

/** The underlying the Pre-build and Quick Trade cards are for, per view. */
export const underlyings: Record<Segment, string[]> = {
  equity: ['Nifty 50', 'Bank Nifty', 'Sensex'],
  commodities: ['GOLD', 'SILVER', 'CRUDEOIL'],
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

### `src/shared/ui/Rail.module.css`

```css
/*
 * Sideways rail. Item width = the row (inside its 16 insets) shared by `--rail-visible` items with 12 between them, so
 * the same rail reads well from 360 to 412. --rail-visible is a count (set inline), not a size.
 */
.rail {
  /* Positioned, so absolutely placed bits inside (e.g. PriceChange's screen-reader text) are clipped by the rail
     instead of hanging off a far-away ancestor and making the whole page scroll sideways. */
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - (var(--rail-visible) - 1) * var(--l3-spacing-12)) / var(--rail-visible));
  gap: var(--l3-spacing-12);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding-inline: var(--l3-spacing-16);
  scroll-padding-inline: var(--l3-spacing-16);
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.rail::-webkit-scrollbar {
  display: none;
}

.rail > * {
  scroll-snap-align: start;
  min-width: 0;
}

.rail[data-snap='center'] > * {
  scroll-snap-align: center;
}

/* Two rows that scroll together. */
.rail[data-rows='2'] {
  grid-auto-flow: column;
  grid-template-rows: repeat(2, auto);
}
```

### `src/shared/ui/Rail.tsx`

```tsx
import type { CSSProperties, ReactNode } from 'react'
import styles from './Rail.module.css'

type RailProps = {
  children: ReactNode
  /** What the row holds, for screen readers ("Top gainers"). */
  label: string
  /** How many items show across the screen — a fraction (2.3) lets the next one peek in, so it reads as scrollable. */
  visible: number
  /** Two rows that scroll together (a grid of cards). */
  rows?: 1 | 2
  /** Snap each item to the start (lists) or the centre (one featured card at a time, neighbours peeking). */
  snap?: 'start' | 'center'
  /** Extra room inside the row (e.g. above the cards, for a tag sitting on a card's top edge). */
  className?: string
}

/**
 * A row that scrolls sideways — cards, baskets, ideas. Its first item lines up with the 16 page margin, items are
 * 12 apart and snap into place, and there's no scrollbar. Not L3 yet (a "carousel / rail" is missing there).
 */
export function Rail({ children, label, visible, rows = 1, snap = 'start', className }: RailProps) {
  return (
    <div className={[styles.rail, className].filter(Boolean).join(' ')} role="region" aria-label={label} data-rows={rows} data-snap={snap} style={{ '--rail-visible': visible } as CSSProperties}>
      {children}
    </div>
  )
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

### `src/shared/ui/dash/DashEntry.module.css`

```css
/*
 * DASH pill — Figma "Dash entry point" (DASH AI main flow, 11492:7740), copied as drawn: hugs its content (4 / 8
 * padding, 2 between the orb and the word), full radius, a 1px green-300 edge, a 176° fill from surface/primary
 * (37.5%) into the brand-light lime (93.4%), the orb at 21.8 without its halo, "DASH" in Heading/10, success green.
 */
.entry {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: var(--l3-spacing-02);
  padding: var(--l3-spacing-04) var(--l3-spacing-08);
  border: 1px solid var(--l3-base-hue-green-300); /* 1px: Figma stroke */
  border-radius: var(--l3-radius-full);
  background: linear-gradient(176deg, var(--l3-surface-primary) 37.508%, var(--l3-surface-accent-brand-light) 93.358%);
  color: var(--l3-content-accent-success-default);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--l3-motion-duration-short) var(--l3-motion-easing-standard);
}

.entry:active {
  transform: scale(var(--l3-motion-scale-press-default));
}

.entry:focus-visible {
  outline: 2px solid var(--l3-content-primary);
  outline-offset: 2px;
}

/* Figma "logo": 21.818 (local token — no L3 size). */
.entry > span:first-child {
  --orb-box: var(--app-dash-orb-pill);
}

.label {
  font: var(--l3-text-heading-10);
  text-align: center;
  white-space: nowrap;
}
```

### `src/shared/ui/dash/DashEntry.tsx`

```tsx
import { DashOrb } from './DashOrb'
import styles from './DashEntry.module.css'

type DashEntryProps = {
  /** The visible word ("DASH"), from the caller's copy file. */
  label: string
  /** What a screen reader says ("Open DASH AI"). */
  ariaLabel: string
  onClick?: () => void
}

/**
 * The way into DASH AI — a pill in the Stocks home top bar (Figma "Dash entry point", DASH AI main flow 11492:7740):
 * the orb and "DASH" on a white-into-lime fill with a thin green edge. It hugs its content (≈ 32 tall).
 */
export function DashEntry({ label, ariaLabel, onClick }: DashEntryProps) {
  return (
    <button type="button" className={styles.entry} onClick={onClick} aria-label={ariaLabel}>
      <DashOrb size="sm" halo={false} />
      <span className={styles.label} aria-hidden="true">{label}</span>
    </button>
  )
}
```

### `src/shared/ui/dash/DashOrb.module.css`

```css
/*
 * The orb artwork is the Figma vector component: every part keeps the exact Figma box (px inside a 100 × 100 frame —
 * artwork geometry, not layout), and the whole thing scales to the slot. Sizes come from L3 size tokens.
 */
.orb {
  --orb-box: var(--l3-size-96);
  position: relative;
  display: inline-block;
  flex: none;
  width: var(--orb-box);
  height: var(--orb-box);
}

.orb[data-size='lg'] { --orb-box: var(--l3-size-96); }
.orb[data-size='md'] { --orb-box: var(--l3-size-64); }
.orb[data-size='compact'] { --orb-box: var(--l3-size-40); }
.orb[data-size='sm'] { --orb-box: var(--l3-size-32); }

/* The art is drawn at 100 and scaled to the box. */
.scale {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  transform: scale(calc(var(--orb-box) / 100px));
  transform-origin: 0 0;
}

.art {
  position: absolute;
  inset: 0;
}

/* Figma: the halo copy sits 8 right / 10 down, layer blur 23.35. */
.halo {
  transform: translate(8px, 10px);
  filter: blur(var(--app-dash-orb-halo-blur));
}

.art img {
  display: block;
  max-width: none;
}

/* "Group 1000006113" (back leaf, blurred glow): box 55.5 × 57.8, bottom 49.7, centre +17.2. */
.leafBackBox,
.leafFrontBox {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
}

.leafBackBox {
  bottom: 49.71px;
  left: calc(50% + 17.24px);
  width: 55.526px;
  height: 57.791px;
}

.leafBack,
.leafFront {
  position: relative;
  flex: none;
  /* Figma's order: rotate, then skew, then the vertical flip (Tailwind -scale-y-100 rotate-[-108.93deg] skew-x-1) */
  transform: rotate(-108.93deg) skewX(1deg) scaleY(-1);
}

.leafBack {
  width: 45.469px;
  height: 43.372px;
}

.leafBackImg {
  position: absolute;
  inset: -14.91% -14.25% -14.71% -13.92%;
  width: auto;
  height: auto;
}

/* "Group 1000006112" (front leaves). */
.leafFrontBox {
  bottom: 50.97px;
  left: calc(50% + 17.61px);
  width: 50.159px;
  height: 51.373px;
}

.leafFront {
  width: 40.069px;
  height: 39.526px;
}

.leafFront img {
  width: 100%;
  height: 100%;
}

/* "Ellipse 8": the ring's soft inner fill. */
.fill {
  position: absolute;
  top: 30.85px;
  left: 10.38px;
  width: 57.662px;
  height: 59.282px;
}

/* "circleGroup": the angular-gradient ring. */
.ringBox {
  position: absolute;
  top: 27.88px;
  left: 7.5px;
  width: 62.852px;
  height: 64.618px;
}

.ring {
  position: absolute;
  inset: -7.11% -7.31%;
  width: auto;
  height: auto;
}

/*
 * Idle motion (live app, 2026-10-23): the ring's yellow highlight goes round clockwise once a second, at a steady
 * speed — the ring and its soft fill turn on their own centres; the leaves stay still. Off for reduced motion.
 */
.ringBox,
.fill {
  animation: dash-orb-spin var(--app-dash-orb-spin) linear infinite;
}

@keyframes dash-orb-spin {
  to {
    transform: rotate(1turn);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ringBox,
  .fill {
    animation: none;
  }
}
```

### `src/shared/ui/dash/DashOrb.tsx`

```tsx
import leafBack from './assets/leaf-back.svg'
import leafFront from './assets/leaf-front.svg'
import orbFill from './assets/orb-fill.svg'
import orbRing from './assets/orb-ring.svg'
import styles from './DashOrb.module.css'

export type DashOrbSize = 'sm' | 'compact' | 'md' | 'lg' // 32 · 40 · 64 · 96

/**
 * DASH's mascot — the lime ring with two leaves (Figma "Logo" / "BotIcon", the 100 × 100 vector component), drawn from
 * its own vector parts in the Figma positions, with the soft halo behind it (a blurred copy).
 * Sizes: lg 96 (landing pages), md 64 (sheet headers, on a soft disc), sm 32 (the rule card's icon). The DASH pill sets its own
 * box (21.8). Shared: DASH flows and the home's entry pill use the same artwork.
 * Decorative: screen readers skip it — the text next to it says what it is.
 */
export function DashOrb({ size = 'lg', halo = true }: { size?: DashOrbSize; halo?: boolean }) {
  return (
    <span className={styles.orb} data-size={size} aria-hidden="true">
      <span className={styles.scale}>
        {halo && <OrbArt className={styles.halo} />}
        <OrbArt />
      </span>
    </span>
  )
}

/** The artwork at its Figma size (100 × 100); the parent scales it. */
function OrbArt({ className }: { className?: string }) {
  return (
    <span className={[styles.art, className].filter(Boolean).join(' ')}>
      <span className={styles.leafBackBox}>
        <span className={styles.leafBack}>
          <img src={leafBack} alt="" className={styles.leafBackImg} />
        </span>
      </span>
      <span className={styles.leafFrontBox}>
        <span className={styles.leafFront}>
          <img src={leafFront} alt="" />
        </span>
      </span>
      <img src={orbFill} alt="" className={styles.fill} />
      <span className={styles.ringBox}>
        <img src={orbRing} alt="" className={styles.ring} />
      </span>
    </span>
  )
}
```

### `src/shared/ui/dash/assets/leaf-back.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="58.2771" height="56.2179" viewBox="0 0 58.2771 56.2179" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 1000006113" filter="url(#filter0_f_0_282)">
<path id="Big_leaf_00000052817416241482779350000003325489541389591972_" d="M11.1805 6.4948L10.2325 8.23984C7.21698 13.7241 6.07176 19.8031 6.63218 25.5588C7.5941 35.2352 13.3302 44.2732 22.6694 49.2476L23.6172 47.5025C27.4934 40.6061 28.2232 32.8573 26.4785 25.7606C24.3978 17.9116 19.1614 10.7108 11.1805 6.4948Z" fill="#8EF087" style="fill:#8EF087;fill:color(display-p3 0.5578 0.9428 0.5275);fill-opacity:1;"/>
<path id="Small_leaf_00000086657169406454258550000009755690847739837326_" d="M51.7823 38.3919C48.9397 43.4603 44.4029 47.018 39.1965 48.6543C33.6484 50.4553 27.3477 50.0009 21.8287 47.1335C24.6713 42.065 29.2933 38.5078 34.4997 36.8715C39.9626 35.07 46.2638 35.4411 51.7823 38.3919Z" fill="#8EF087" style="fill:#8EF087;fill:color(display-p3 0.5578 0.9428 0.5275);fill-opacity:1;"/>
</g>
<defs>
<filter id="filter0_f_0_282" x="-7.45058e-08" y="2.2538e-07" width="58.2771" height="56.2179" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="3.2474" result="effect1_foregroundBlur_0_282"/>
</filter>
</defs>
</svg>
```

### `src/shared/ui/dash/assets/leaf-front.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="40.0692" height="39.5257" viewBox="0 0 40.0692 39.5257" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Group 1000006112">
<path id="Small_leaf_00000086657169406454258550000009755690847739837326_" d="M40.0554 29.6165C37.5947 34.0042 33.6673 37.084 29.1603 38.5005C24.3574 40.0595 18.9031 39.6661 14.1254 37.1839C16.5862 32.7963 20.5873 29.7169 25.0943 28.3004C29.8234 26.7409 35.2782 27.0621 40.0554 29.6165Z" fill="url(#paint0_linear_0_409)"/>
<path id="Big_leaf_00000052817416241482779350000003325489541389591972_" d="M4.19434 0.0243672L3.37396 1.5349C0.764101 6.28215 -0.226587 11.5445 0.259219 16.5271C1.09303 24.9038 6.05968 32.7283 14.1449 37.0356L14.9652 35.525C18.3199 29.5554 18.9507 22.8476 17.4396 16.704C15.6376 9.90912 11.1037 3.67494 4.19434 0.0243672Z" fill="url(#paint1_linear_0_409)"/>
</g>
<defs>
<linearGradient id="paint0_linear_0_409" x1="21.3968" y1="29.3938" x2="22.0238" y2="39.1604" gradientUnits="userSpaceOnUse">
<stop stop-color="#7CE883" style="stop-color:#7CE883;stop-color:color(display-p3 0.4863 0.9098 0.5137);stop-opacity:1;"/>
<stop offset="1" stop-color="#3EBF47" style="stop-color:#3EBF47;stop-color:color(display-p3 0.2433 0.7503 0.2802);stop-opacity:1;"/>
</linearGradient>
<linearGradient id="paint1_linear_0_409" x1="5.24577" y1="6.42552" x2="13.4379" y2="33.8372" gradientUnits="userSpaceOnUse">
<stop stop-color="#7CE883" style="stop-color:#7CE883;stop-color:color(display-p3 0.4863 0.9098 0.5137);stop-opacity:1;"/>
<stop offset="1" stop-color="#3EBF47" style="stop-color:#3EBF47;stop-color:color(display-p3 0.2433 0.7503 0.2802);stop-opacity:1;"/>
</linearGradient>
</defs>
</svg>
```

### `src/shared/ui/dash/assets/orb-fill.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="57.6624" height="59.2824" viewBox="0 0 57.6624 59.2824" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="stroke0_0_416" fill="white">
<path d="M57.6624 29.6412C57.6624 46.0116 44.7543 59.2824 28.8312 59.2824C12.9082 59.2824 0 46.0116 0 29.6412C0 13.2708 12.9082 0 28.8312 0C44.7543 0 57.6624 13.2708 57.6624 29.6412Z"/>
</mask>
<path id="Ellipse 8" d="M57.6624 29.6412C57.6624 46.0116 44.7543 59.2824 28.8312 59.2824C12.9082 59.2824 0 46.0116 0 29.6412C0 13.2708 12.9082 0 28.8312 0C44.7543 0 57.6624 13.2708 57.6624 29.6412Z" stroke-width="16.8671" stroke="url(#paint0_linear_0_416)" mask="url(#stroke0_0_416)"/>
<defs>
<linearGradient id="paint0_linear_0_416" x1="17.0104" y1="56.2094" x2="43.5226" y2="4.92706" gradientUnits="userSpaceOnUse">
<stop stop-color="#72E780" style="stop-color:#72E780;stop-color:color(display-p3 0.4476 0.9047 0.5009);stop-opacity:1;"/>
<stop offset="1" stop-color="#FDFFB5" style="stop-color:#FDFFB5;stop-color:color(display-p3 0.9903 1.0000 0.7091);stop-opacity:1;"/>
</linearGradient>
</defs>
</svg>
```

### `src/shared/ui/dash/assets/orb-ring.svg`

```tsx
<svg preserveAspectRatio="none" overflow="visible" style="display: block;" width="72.0446" height="73.8103" viewBox="0 0 72.0446 73.8103" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="circleGroup">
<g id="Ellipse 9" filter="url(#filter0_f_0_407)">
<mask id="stroke0_0_407" fill="white">
<path d="M67.4483 36.9052C67.4483 54.7489 53.3784 69.2141 36.0223 69.2141C18.6662 69.2141 4.59628 54.7489 4.59628 36.9052C4.59628 19.0615 18.6662 4.59628 36.0223 4.59628C53.3784 4.59628 67.4483 19.0615 67.4483 36.9052Z"/>
</mask>
<mask id="stroke1_0_407">
<path d="M67.4483 36.9052C67.4483 54.7489 53.3784 69.2141 36.0223 69.2141C18.6662 69.2141 4.59628 54.7489 4.59628 36.9052C4.59628 19.0615 18.6662 4.59628 36.0223 4.59628C53.3784 4.59628 67.4483 19.0615 67.4483 36.9052Z" stroke-width="18.3851" stroke="white" mask="url(#stroke0_0_407)"/>
</mask>
<g clip-path="url(#paint0_angular_0_407_clip_path)" data-figma-skip-parse="true" mask="url(#stroke1_0_407)"><g transform="matrix(0.01625 -0.02375 0.0230642 0.0166474 37.0963 36.713)"><foreignObject x="-3827.82" y="-3827.82" width="7655.64" height="7655.64"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(121, 234, 105, 1) 0deg,rgba(246, 253, 38, 1) 124.615deg,rgba(52, 177, 33, 1) 238.846deg,rgba(122, 235, 105, 1) 360deg);height:100%;width:100%;opacity:1"></div></foreignObject></g></g><path d="M67.4483 36.9052C67.4483 54.7489 53.3784 69.2141 36.0223 69.2141C18.6662 69.2141 4.59628 54.7489 4.59628 36.9052C4.59628 19.0615 18.6662 4.59628 36.0223 4.59628C53.3784 4.59628 67.4483 19.0615 67.4483 36.9052Z" stroke-width="18.3851" stroke="black" stroke-opacity="0" data-figma-gradient-stroke="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.47711750864982605,&#34;g&#34;:0.92151820659637451,&#34;b&#34;:0.41342675685882568,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.96524602174758911,&#34;g&#34;:0.99325793981552124,&#34;b&#34;:0.15290218591690063,&#34;a&#34;:1.0},&#34;position&#34;:0.34615385532379150},{&#34;color&#34;:{&#34;r&#34;:0.20681096613407135,&#34;g&#34;:0.69540637731552124,&#34;b&#34;:0.13164243102073669,&#34;a&#34;:1.0},&#34;position&#34;:0.66346156597137451},{&#34;color&#34;:{&#34;r&#34;:0.47843137383460999,&#34;g&#34;:0.92156863212585449,&#34;b&#34;:0.41176471114158630,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;transform&#34;:{&#34;m00&#34;:32.500003814697266,&#34;m01&#34;:46.128456115722656,&#34;m02&#34;:-2.2179441452026367,&#34;m10&#34;:-47.500007629394531,&#34;m11&#34;:33.294700622558594,&#34;m12&#34;:43.815639495849609},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.47711750864982605,&#34;g&#34;:0.92151820659637451,&#34;b&#34;:0.41342675685882568,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:0.96524602174758911,&#34;g&#34;:0.99325793981552124,&#34;b&#34;:0.15290218591690063,&#34;a&#34;:1.0},&#34;position&#34;:0.34615385532379150},{&#34;color&#34;:{&#34;r&#34;:0.20681096613407135,&#34;g&#34;:0.69540637731552124,&#34;b&#34;:0.13164243102073669,&#34;a&#34;:1.0},&#34;position&#34;:0.66346156597137451},{&#34;color&#34;:{&#34;r&#34;:0.47843137383460999,&#34;g&#34;:0.92156863212585449,&#34;b&#34;:0.41176471114158630,&#34;a&#34;:1.0},&#34;position&#34;:1.0}],&#34;visible&#34;:true}" mask="url(#stroke0_0_407)"/>
</g>
</g>
<defs>
<filter id="filter0_f_0_407" x="0" y="0" width="72.0446" height="73.8103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2.29814" result="effect1_foregroundBlur_0_407"/>
</filter>
<clipPath id="paint0_angular_0_407_clip_path"><rect x="-41.3666" y="-41.3666" width="154.778" height="156.543"/></clipPath></defs>
</svg>
```
