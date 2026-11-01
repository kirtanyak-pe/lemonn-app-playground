# Flow: Overtrading nudges (playground) (`nudges`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Journey-aware P&L limit and TP/SL prompts: silent help on the order pad, and one nudge sheet when the revenge flag and the journey engine agree.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/nudges · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/nudges.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `nudges-01` | Order pad · silent help | [8671:18433]() | — | The default — no interruption. The F&O commodity order pad (fno-25) as it is, plus silent help: “Set TPSL” becomes a TP/SL row, pre-filled and on (Target +20% · Stop-loss −10%); “Set a loss limit for today” is the first line of the dock. Buy fires the nudge picked in the settings (Case, Data state), once: the shared cap is 1 per session. |
| `nudges-02` | Nudge · from settings | — | — | The one nudge sheet, filled by the case and data state picked in the settings. Try all 17 cases × A / B / C, the draft title (“Overtrading detected”) and the draft’s two guardrail buttons. |
| `nudges-03` | Nudge · generic | — | — | Fires with the revenge flag when no single behaviour stands out, or the trader is too new to compare (state D of any case). Box 1 “Down today” is always known. |
| `nudges-04` | Nudge · size-up · A (own loss) | — | — | Enough history and his last size-up lost: Box 2 is his own loss, tagged “Your past trades”, in loss red. |
| `nudges-05` | Nudge · orders today · B | — | — | Enough history, last time didn’t lose: Box 1 is his own ratio (“3× your usual”), Box 2 the measured group line, tagged “Lemonn traders”. |
| `nudges-06` | Nudge · orders today · C (thin history) | — | — | Too few past sessions for “your usual”: Box 1 becomes today’s raw fact (“14 orders”). |
| `nudges-07` | Nudge · averaging down (TP/SL first) | — | — | A case whose main button is TP/SL. Averaging down is one of the three states measured as harmful (−5.11% per buy). |
| `nudges-08` | Set today’s loss limit | — | — | From the nudge’s “Set a loss limit for today” or the order pad dock. Pre-filled ₹25,000, quick amounts as pill tabs. Set limit → back to the pad with the limit shown. |
| `nudges-09` | TP/SL for this order | — | — | From the nudge’s “Add TP/SL to this order” or the TP/SL row. Target and stop-loss in %, the exit price under each. |
| `nudges-10` | Order pad · limit set | — | — | Silent help once a limit exists: “₹25,000 left of today’s loss limit” with a bar in the dock (tap to change it). |
| `nudges-11` | Order pad · close to the limit | — | — | ₹21,000 of ₹25,000 used: the bar and the line turn warning. Still no interruption. |

## Spec (README.md)


> PLAYGROUND, not a shipped flow. The product team's draft (2026-10-30, `playground/overtrading-nudges/README.md`),
> redesigned in L3 so the idea can be shown and tested. No Figma yet. Every number in the copy is an example; the real
> values are computed per trader.

- **Prototype:** `#/nudges` · single screen: `#/nudges-02` (the nudge, driven by the settings)
- **Status:** 🟨 exploration · last updated 2026-10-30
- **Entry:** the F&O commodity options order pad (`fno-25`, copied into this flow) · **Exit:** back to wherever the order pad came from

### The idea in one line

When an F&O trader starts chasing a loss, the app shows one short sheet at the moment of the order, with one fact
about today and one reason, and offers a loss limit for the day or a TP/SL on this order. He can always skip it.

### Screens

Each screen is the order pad in one state; within a screen, sheets swap over the same page.

| Id | Screen | What it shows / when |
|---|---|---|
| `nudges-01` | Order pad · silent help | Default. TP/SL on and pre-filled, "Set a loss limit for today" in the dock. Buy fires the nudge from the settings, once. |
| `nudges-02` | Nudge · from settings | The nudge sheet for any case (17) × data state (A / B / C), title and button variants. |
| `nudges-03` | Nudge · generic | Nothing stands out, or the behaviour can't be scored (state D). |
| `nudges-04` | Nudge · size-up · A | Box 2 = his own last loss. |
| `nudges-05` | Nudge · orders today · B | Box 1 = his own ratio, Box 2 = group line. |
| `nudges-06` | Nudge · orders today · C | Box 1 = today's raw fact. |
| `nudges-07` | Nudge · averaging down | A TP/SL-first case. |
| `nudges-08` | Set today's loss limit | Amount field + quick amounts. |
| `nudges-09` | TP/SL for this order | Target / stop-loss % with exit prices. |
| `nudges-10` | Order pad · limit set | "₹25,000 left of today's loss limit" + bar. |
| `nudges-11` | Order pad · close to the limit | Bar and line in warning. |

### Navigation

```
nudges-01 ──Buy (1st time)──▶ nudge sheet ──Not now, place order──▶ order placed (toast)
                                 ├──Set a loss limit──▶ nudges-08 ──Set limit──▶ nudges-10
                                 └──Add TP/SL──────────▶ nudges-09 ──Save──────▶ pad, TP/SL on
nudges-01 ──Buy (again)──▶ order placed (cap: 1 nudge per session, 2 per day, shared by every nudge)
```

### The nudge sheet (one template, every case)

It interrupts an order, so it says one thing: one message, one number, one picture, two buttons.

| Slot | L3 | Content |
|---|---|---|
| Header | `BottomSheetHeader size="lg"` + 64 icon (warning, speed, pulses twice) | Heading = the behaviour in plain words ("Bigger bet right after a loss") |
| Card | `Card` | Box 1: the number big (heading-28) + its label · hairline · Box 2: state A = "Lost ₹2,900" in loss red + "Last time you did this"; else the group line, with 10 people filling in red when it's a share of traders |
| Dock | `ButtonGroup` vertical | `primary` = the case's guardrail · `secondary` "Not now, place order". Setting "Both guardrails": primary · secondary (other guardrail) · ghost Not now |

Motion plays once on open and is off with reduced motion. No disclaimer line for now — compliance to confirm
whether one is needed.

Data states: A = own history and last time lost (Box 2 is his own loss) · B = own history, no loss (Box 2 group line)
· C = thin history (Box 1 raw fact) · D = can't score → the generic sheet. Cases and their guardrail: `data.ts`;
words: `copy.json` `case.<id>.*`.

### Data

`data.ts`: `nudgeCases` (id, kind generic / revenge / moment, primary guardrail `pnl` | `tpsl`, `noHistory`), the
sample order (`orderContract`, `funds`), pre-filled TP/SL (20% / 10%), loss-limit presets and sample loss. The API
must provide, per nudge: case id, data state, Box 1 value, Box 2 value (own loss in A).

### Rules & behaviour

- Silent help first: the sheet only appears when the revenge flag and the journey engine agree; capped 1 per session,
  2 per day, shared across all nudges.
- Every sheet is skippable in one tap; it never blocks the order, never asks for a deposit, never gives advice.
- Box 2 describes what happens to people, never "because you…". Never promise a green day. Never use "only 2 in 100
  stop" as copy.

### Differences from the draft

- **Heading:** the behaviour, not "Overtrading detected" (reads as an accusation; compliance open item). The draft
  title is the "Sheet title" setting.
- **Buttons:** one guardrail + Not now by default (one clear choice); the draft's two guardrails are the "Buttons"
  setting.
- **Main button colour:** L3 `primary`, not lime. In L3 lime (`brand` / `buy`) is for buying, and Buy is the button
  right under this sheet.
- **Illustration:** an L3 icon in a 64 circle instead of the (non-existent) Lemonn character with a placard.
- **Box 2 tag:** says whose number it is (his own vs Lemonn traders).
- "Not now" says what it does: "Not now, place order".

### L3 gaps

- No illustration for "slow down" / caution moments (the draft wants the Lemonn character).

### Changelog

- 2026-10-30 · first build on the `playground` branch.
- 2026-10-30 · nudge sheet revamp: one card (big number + proof, 10 people filling in), pulsing icon, primary + secondary dock; tags, bars, explainer and disclaimer removed to cut text.


## Source — this flow

### `src/flows/nudges/copy.json`

```json
{
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
  "order.placed": "{side} order placed · {name} {contract}",
  "silent.tpsl": "TP/SL",
  "silent.tpslOn": "Target +{target}% · Stop-loss −{stop}%",
  "silent.tpslOff": "Off",
  "silent.tpslEdit": "Edit TP/SL",
  "silent.tpslToggle": "TP/SL on this order",
  "silent.prefilled": "Pre-filled",
  "silent.limitLeft": "{left} left of today's loss limit",
  "silent.limitAdd": "Set a loss limit for today",
  "silent.limitBar": "Loss used today",
  "silent.limitNear": "Close to today's loss limit",
  "nudge.titleBrief": "Overtrading detected",
  "nudge.setPnl": "Set a loss limit for today",
  "nudge.setTpsl": "Add TP/SL to this order",
  "nudge.notNow": "Not now, place order",
  "nudge.lastTime": "Last time you did this",
  "pnl.title": "Today's loss limit",
  "pnl.description": "When today's loss reaches this amount, new F&O orders pause until tomorrow. Open positions stay as they are.",
  "pnl.field": "Limit for today",
  "pnl.presets": "Quick amounts",
  "pnl.helper": "You can change or remove it any time today.",
  "pnl.save": "Set limit",
  "pnl.saved": "Loss limit set · {amount} for today",
  "tpsl.title": "TP/SL for this order",
  "tpsl.description": "Exits on its own when the price reaches your target or your stop-loss.",
  "tpsl.target": "Target profit",
  "tpsl.stop": "Stop-loss",
  "tpsl.atPrice": "at {price}",
  "tpsl.save": "Save TP/SL",
  "tpsl.saved": "TP/SL added to this order",
  "case.generic.name": "Generic",
  "case.generic.heading": "A tough day so far",
  "case.generic.box1Label": "Down today",
  "case.generic.box1Own": "₹3,400",
  "case.generic.box1Raw": "₹3,400",
  "case.generic.box2Label": "Out of 100 who kept trading",
  "case.generic.box2Value": "67 lost more",
  "case.sizeUp.name": "1 · Size-up after a loss",
  "case.sizeUp.heading": "Bigger bet right after a loss",
  "case.sizeUp.box1Label": "This order vs the trade you lost",
  "case.sizeUp.box1Own": "2× bigger",
  "case.sizeUp.box1Raw": "2× bigger",
  "case.sizeUp.box2Label": "Out of 100 who kept trading",
  "case.sizeUp.box2Value": "69 lost more",
  "case.orders.name": "2 · Orders in the session",
  "case.orders.heading": "More orders than usual today",
  "case.orders.box1Label": "Orders today",
  "case.orders.box1Own": "3× your usual",
  "case.orders.box1Raw": "14 orders",
  "case.orders.box2Label": "Out of 100 who kept trading",
  "case.orders.box2Value": "68 lost more",
  "case.flips.name": "3 · CE ↔ PE flips",
  "case.flips.heading": "Switching between calls and puts",
  "case.flips.box1Label": "Switched sides today",
  "case.flips.box1Own": "3 times",
  "case.flips.box1Raw": "3 times",
  "case.flips.box2Label": "Out of 100 who kept trading",
  "case.flips.box2Value": "69 lost more",
  "case.burst.name": "4 · Orders in 15 min",
  "case.burst.heading": "Lots of orders in a short time",
  "case.burst.box1Label": "Orders in the last 15 min",
  "case.burst.box1Own": "4× your usual",
  "case.burst.box1Raw": "9 orders",
  "case.burst.box2Label": "Out of 100 who kept trading",
  "case.burst.box2Value": "68 lost more",
  "case.money15.name": "5 · Money in 15 min",
  "case.money15.heading": "A lot of money in, in a short time",
  "case.money15.box1Label": "Money put in, last 15 min",
  "case.money15.box1Own": "3× your usual",
  "case.money15.box1Raw": "₹48,000",
  "case.money15.box2Label": "Out of 100 who kept trading",
  "case.money15.box2Value": "68 lost more",
  "case.bigOrder.name": "6 · Big order vs money",
  "case.bigOrder.heading": "A big part of your money in one order",
  "case.bigOrder.box1Label": "This order uses, of your money",
  "case.bigOrder.box1Own": "60%",
  "case.bigOrder.box1Raw": "60%",
  "case.bigOrder.box2Label": "Out of 100 who kept trading",
  "case.bigOrder.box2Value": "66 lost more",
  "case.pace.name": "7 · Time between orders",
  "case.pace.heading": "Orders coming in fast",
  "case.pace.box1Label": "Since your last order",
  "case.pace.box1Own": "40 seconds",
  "case.pace.box1Raw": "40 seconds",
  "case.pace.box2Label": "Out of 100 who kept trading",
  "case.pace.box2Value": "70 lost more",
  "case.strike.name": "8 · Far strike",
  "case.strike.heading": "Strike far from the index",
  "case.strike.box1Label": "Strike distance from NIFTY",
  "case.strike.box1Own": "10× your usual",
  "case.strike.box1Raw": "1,200 points",
  "case.strike.box2Label": "Out of 100 who kept trading",
  "case.strike.box2Value": "72 lost more",
  "case.avgDown.name": "9 · Averaging down",
  "case.avgDown.heading": "Buying more as it falls",
  "case.avgDown.box1Label": "Added to a falling position",
  "case.avgDown.box1Own": "3rd time today",
  "case.avgDown.box1Raw": "3rd time today",
  "case.avgDown.box2Label": "Traders who averaged down",
  "case.avgDown.box2Value": "Lost ₹5 per ₹100",
  "case.rareSession.name": "10 · Unusual time",
  "case.rareSession.heading": "Trading at an unusual time for you",
  "case.rareSession.box1Label": "You trade after 2:30 pm",
  "case.rareSession.box1Own": "1 in 20 days",
  "case.rareSession.box1Raw": "Rare for 9 in 10 traders",
  "case.rareSession.box2Label": "Out of 100 who kept trading",
  "case.rareSession.box2Value": "67 lost more",
  "case.expiry.name": "Moment · Expiry, recovering",
  "case.expiry.heading": "Expiry day, trying to win back a loss",
  "case.expiry.box1Label": "Down today",
  "case.expiry.box1Own": "₹3,400",
  "case.expiry.box1Raw": "₹3,400",
  "case.expiry.box2Label": "Kept trading and lost even more",
  "case.expiry.box2Value": "2 in 3 traders",
  "case.deposit.name": "Moment · Bigger deposit",
  "case.deposit.heading": "Adding more money than usual",
  "case.deposit.box1Label": "Added today",
  "case.deposit.box1Own": "2× your usual",
  "case.deposit.box1Raw": "₹20,000",
  "case.deposit.box2Label": "Trades without a stop-loss",
  "case.deposit.box2Value": "8 in 100 lost 30% or more",
  "case.givingBack.name": "Moment · Giving back profit",
  "case.givingBack.heading": "Giving back today's profit",
  "case.givingBack.box1Label": "Profit given back today",
  "case.givingBack.box1Own": "₹1,800 of ₹2,600",
  "case.givingBack.box1Raw": "₹1,800 of ₹2,600",
  "case.givingBack.box2Label": "Trades without a stop-loss",
  "case.givingBack.box2Value": "8 in 100 lost 30% or more",
  "case.fomo.name": "Moment · Missed entry",
  "case.fomo.heading": "Chasing a move that already happened",
  "case.fomo.box1Label": "Price since you last looked",
  "case.fomo.box1Own": "Up 18% in 10 min",
  "case.fomo.box1Raw": "Up 18% in 10 min",
  "case.fomo.box2Label": "Trades without a stop-loss",
  "case.fomo.box2Value": "8 in 100 lost 30% or more",
  "case.returnBreak.name": "Moment · Back after a break",
  "case.returnBreak.heading": "First trade after a break",
  "case.returnBreak.box1Label": "Your last trade",
  "case.returnBreak.box1Own": "23 days ago",
  "case.returnBreak.box1Raw": "23 days ago",
  "case.returnBreak.box2Label": "Trades without a stop-loss",
  "case.returnBreak.box2Value": "8 in 100 lost 30% or more",
  "case.afterWin.name": "Moment · After a winning day",
  "case.afterWin.heading": "Trading the day after a big win",
  "case.afterWin.box1Label": "Yesterday",
  "case.afterWin.box1Own": "+₹6,200",
  "case.afterWin.box1Raw": "+₹6,200",
  "case.afterWin.box2Label": "Lost more than usual the next day",
  "case.afterWin.box2Value": "6 in 10 traders",
  "case.lossA": "Lost ₹2,900",
  "option.case": "Case",
  "option.state": "Data state",
  "option.stateA": "A · own loss",
  "option.stateB": "B · own, no loss",
  "option.stateC": "C · thin history",
  "option.title": "Sheet title",
  "option.titleBehaviour": "The behaviour",
  "option.titleBrief": "Overtrading detected",
  "option.actions": "Buttons",
  "option.actionsTwo": "Both guardrails",
  "option.actionsOne": "One guardrail",
  "nudge.people": "{count} in 10 traders"
}
```

### `src/flows/nudges/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of this flow is in copy.json: t('screen.title'), t('key', { count }). */
export const t = makeCopy('nudges', copy)
```

### `src/flows/nudges/data.ts`

```ts
/**
 * Overtrading nudges (product team draft, 2026-10-30 — playground, nothing built in the real app).
 *
 * Every nudge is ONE sheet; a case only fills its slots. The words live in copy.json under `case.<id>.*`; this file
 * says which cases exist, which guardrail each one leads with, and the sample account values. Every number in the
 * copy is an example: the real values are computed per trader (open item 1 in the brief).
 */

/** The two guardrails a nudge can offer. */
export type Guardrail = 'pnl' | 'tpsl'

/**
 * How much of the trader's own history we can use for this case:
 * - A: enough history, and the last time he did this he lost → Box 2 is his own loss.
 * - B: enough history, but the last time didn't lose → Box 2 is the group line.
 * - C: thin history → Box 1 is today's raw fact, Box 2 the group line.
 * (D — the behaviour can't be scored — never shows its own sheet: the generic sheet fires instead.)
 */
export type DataState = 'A' | 'B' | 'C'

export type NudgeCaseId =
  | 'generic'
  | 'sizeUp' | 'orders' | 'flips' | 'burst' | 'money15' | 'bigOrder' | 'pace' | 'strike' | 'avgDown' | 'rareSession'
  | 'expiry' | 'deposit' | 'givingBack' | 'fomo' | 'returnBreak' | 'afterWin'

export type NudgeCase = {
  id: NudgeCaseId
  /** generic: fires with the revenge flag when nothing stands out · revenge: one of the 10 inputs of the v2.5 score ·
   *  moment: a journey moment that fires without the revenge flag. */
  kind: 'generic' | 'revenge' | 'moment'
  /** The guardrail on the main button. */
  primary: Guardrail
  /** Box 1 needs no history (the same in A, B and C) — the six most robust cases. */
  noHistory?: boolean
  /** Box 2 visual: the group line as a share of traders, drawn as 10 people (≥ 0.1 only). */
  groupShare?: number
}

export const nudgeCases: NudgeCase[] = [
  { id: 'generic', kind: 'generic', primary: 'pnl', noHistory: true, groupShare: 0.67 },
  { id: 'sizeUp', kind: 'revenge', primary: 'pnl', noHistory: true, groupShare: 0.69 },
  { id: 'orders', kind: 'revenge', primary: 'pnl', groupShare: 0.68 },
  { id: 'flips', kind: 'revenge', primary: 'pnl', noHistory: true, groupShare: 0.69 },
  { id: 'burst', kind: 'revenge', primary: 'pnl', groupShare: 0.68 },
  { id: 'money15', kind: 'revenge', primary: 'pnl', groupShare: 0.68 },
  { id: 'bigOrder', kind: 'revenge', primary: 'tpsl', groupShare: 0.66 },
  { id: 'pace', kind: 'revenge', primary: 'pnl', noHistory: true, groupShare: 0.7 },
  { id: 'strike', kind: 'revenge', primary: 'tpsl', groupShare: 0.72 },
  { id: 'avgDown', kind: 'revenge', primary: 'tpsl', noHistory: true },
  { id: 'rareSession', kind: 'revenge', primary: 'pnl', groupShare: 0.67 },
  { id: 'expiry', kind: 'moment', primary: 'pnl', groupShare: 0.67 },
  { id: 'deposit', kind: 'moment', primary: 'tpsl' },
  { id: 'givingBack', kind: 'moment', primary: 'tpsl', noHistory: true },
  { id: 'fomo', kind: 'moment', primary: 'tpsl', noHistory: true },
  { id: 'returnBreak', kind: 'moment', primary: 'tpsl' },
  { id: 'afterWin', kind: 'moment', primary: 'pnl', groupShare: 0.6 },
]

export const caseById = new Map(nudgeCases.map((c) => [c.id, c]))

/** The order being placed when the nudge shows — the F&O commodity options order pad's sample (fno/order-pad/data.ts). */
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
export const sellMargin = { margin: '7.00%', leverage: '14.3X' }
export const funds = { available: 1105002, required: 1075060 }
/** Intraday positions are squared off automatically at this time (MCX evening session). */
export const intradayCloseTime = '11:30 PM'
export const validities = ['Day', 'IOC']

/** Silent help: the TP/SL the order pad pre-fills (% of the entry price). */
export const prefilledTpsl = { targetPct: 20, stopPct: 10 }

/** P&L limit: quick amounts and the sample day (lost so far today). */
export const limitPresets = [10000, 25000, 50000]
export const defaultLimit = 25000
export const lossToday = 0
/** "Near the limit" sample: ₹21,000 of the ₹25,000 limit used. */
export const lossNearLimit = 21000
```

### `src/flows/nudges/index.tsx`

```tsx
import type { Flow, Go } from '../types'
import { t } from './copy'
import { lossNearLimit, nudgeCases } from './data'
import { OrderPad } from './screens/OrderPad'

/** Back to wherever the order pad was opened from; the Gold MINI asset page (fno-21) when opened directly. */
const back = (go: Go) => () => { if (window.history.length > 1) window.history.back(); else go('fno-21') }

/**
 * PLAYGROUND — overtrading nudges (product team draft, 2026-10-30). Not a Figma flow: built from the brief in
 * playground/overtrading-nudges/README.md. Each screen is the order pad in one state; within a
 * screen, sheet → sheet changes swap over the same page.
 */
export const nudges: Flow = {
  id: 'nudges', title: 'Overtrading nudges (playground)',
  description: 'Journey-aware P&L limit and TP/SL prompts: silent help on the order pad, and one nudge sheet when the revenge flag and the journey engine agree.',
  figmaFile: '',
  options: [
    { id: 'case', group: 'Nudge', label: t('option.case'), picker: 'dropdown', values: nudgeCases.map((c) => ({ value: c.id, label: t(`case.${c.id}.name` as Parameters<typeof t>[0]) })), default: 'sizeUp' },
    { id: 'state', group: 'Nudge', label: t('option.state'), values: [{ value: 'A', label: t('option.stateA') }, { value: 'B', label: t('option.stateB') }, { value: 'C', label: t('option.stateC') }], default: 'A' },
    { id: 'title', group: 'Nudge', label: t('option.title'), values: [{ value: 'behaviour', label: t('option.titleBehaviour') }, { value: 'brief', label: t('option.titleBrief') }], default: 'behaviour' },
    { id: 'actions', group: 'Nudge', label: t('option.actions'), values: [{ value: 'one', label: t('option.actionsOne') }, { value: 'two', label: t('option.actionsTwo') }], default: 'one' },
  ],
  screens: [
    { id: 'nudges-01', name: 'Order pad · silent help', figma: '8671:18433', note: 'The default — no interruption. The F&O commodity order pad (fno-25) as it is, plus silent help: “Set TPSL” becomes a TP/SL row, pre-filled and on (Target +20% · Stop-loss −10%); “Set a loss limit for today” is the first line of the dock. Buy fires the nudge picked in the settings (Case, Data state), once: the shared cap is 1 per session.', render: (go) => <OrderPad nudge="options" onBack={back(go)} /> },
    { id: 'nudges-02', name: 'Nudge · from settings', figma: '', note: 'The one nudge sheet, filled by the case and data state picked in the settings. Try all 17 cases × A / B / C, the draft title (“Overtrading detected”) and the draft’s two guardrail buttons.', render: (go) => <OrderPad nudge="options" initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-03', name: 'Nudge · generic', figma: '', note: 'Fires with the revenge flag when no single behaviour stands out, or the trader is too new to compare (state D of any case). Box 1 “Down today” is always known.', render: (go) => <OrderPad nudge={{ caseId: 'generic', state: 'B' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-04', name: 'Nudge · size-up · A (own loss)', figma: '', note: 'Enough history and his last size-up lost: Box 2 is his own loss, tagged “Your past trades”, in loss red.', render: (go) => <OrderPad nudge={{ caseId: 'sizeUp', state: 'A' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-05', name: 'Nudge · orders today · B', figma: '', note: 'Enough history, last time didn’t lose: Box 1 is his own ratio (“3× your usual”), Box 2 the measured group line, tagged “Lemonn traders”.', render: (go) => <OrderPad nudge={{ caseId: 'orders', state: 'B' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-06', name: 'Nudge · orders today · C (thin history)', figma: '', note: 'Too few past sessions for “your usual”: Box 1 becomes today’s raw fact (“14 orders”).', render: (go) => <OrderPad nudge={{ caseId: 'orders', state: 'C' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-07', name: 'Nudge · averaging down (TP/SL first)', figma: '', note: 'A case whose main button is TP/SL. Averaging down is one of the three states measured as harmful (−5.11% per buy).', render: (go) => <OrderPad nudge={{ caseId: 'avgDown', state: 'B' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-08', name: 'Set today’s loss limit', figma: '', note: 'From the nudge’s “Set a loss limit for today” or the order pad dock. Pre-filled ₹25,000, quick amounts as pill tabs. Set limit → back to the pad with the limit shown.', render: (go) => <OrderPad nudge={{ caseId: 'sizeUp', state: 'A' }} initialSheet="pnl" onBack={back(go)} /> },
    { id: 'nudges-09', name: 'TP/SL for this order', figma: '', note: 'From the nudge’s “Add TP/SL to this order” or the TP/SL row. Target and stop-loss in %, the exit price under each.', render: (go) => <OrderPad nudge={{ caseId: 'avgDown', state: 'B' }} initialSheet="tpsl" onBack={back(go)} /> },
    { id: 'nudges-10', name: 'Order pad · limit set', figma: '', note: 'Silent help once a limit exists: “₹25,000 left of today’s loss limit” with a bar in the dock (tap to change it).', render: (go) => <OrderPad limit={25000} onBack={back(go)} /> },
    { id: 'nudges-11', name: 'Order pad · close to the limit', figma: '', note: '₹21,000 of ₹25,000 used: the bar and the line turn warning. Still no interruption.', render: (go) => <OrderPad limit={25000} loss={lossNearLimit} onBack={back(go)} /> },
  ],
}
```

### `src/flows/nudges/screens/OrderPad.module.css`

```css
/* The F&O commodity options order pad (fno/order-pad, Figma 8671:18433) + the nudge's silent help, on L3 tokens. */
.contract { display: flex; flex-direction: column; align-items: flex-start; gap: var(--l3-spacing-02); color: var(--l3-content-primary); }
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

.tpslRow { display: flex; align-items: center; gap: var(--l3-spacing-12); padding: var(--l3-spacing-12); border: 1px solid var(--l3-border-light); border-radius: var(--l3-radius-08); }
.tpslText { flex: 1; display: flex; flex-direction: column; align-items: flex-start; gap: var(--l3-spacing-04); padding: 0; border: 0; background: none; color: var(--l3-content-primary); text-align: left; cursor: pointer; }
.tpslHead { display: inline-flex; align-items: center; gap: var(--l3-spacing-08); font: var(--l3-text-heading-12); }
.tpslValue { font: var(--l3-text-label-12); color: var(--l3-content-secondary); }

/* Dock: optional auto-close note (intraday), then Avail. · Req and the action. */
.dock { background: var(--l3-surface-primary); }
.autoClose { margin: 0; padding: var(--l3-spacing-12) var(--l3-spacing-16); font: var(--l3-text-label-12); color: var(--l3-content-tertiary); text-align: center; }
.dockBody { display: flex; flex-direction: column; gap: var(--l3-spacing-12); padding: var(--l3-spacing-12) var(--l3-spacing-16) var(--l3-spacing-16); border-top: 1px solid var(--l3-border-light); }
.funds { display: flex; justify-content: space-between; font: var(--l3-text-label-12); }


/* Silent help · loss limit, first in the dock: what's left of today's limit (bar), or the link to set one. */
.limit, .limitAdd { display: flex; width: 100%; padding: 0; border: 0; background: none; cursor: pointer; text-align: left; }
.limit { flex-direction: column; gap: var(--l3-spacing-08); }
.limitText, .limitAdd { display: inline-flex; align-items: center; gap: var(--l3-spacing-04); font: var(--l3-text-label-12); color: var(--l3-content-secondary); }
.limitText[data-tone='warning'] { color: var(--l3-content-accent-warning-default); }
.limitAdd { min-height: var(--l3-size-32); color: var(--l3-content-accent-discover-default); }
```

### `src/flows/nudges/screens/OrderPad.tsx`

```tsx
import { useState } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Aerobar } from '@l3/components/Aerobar'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { ProgressBar } from '@l3/components/ProgressBar'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Stepper } from '@l3/components/Stepper'
import { Switch } from '@l3/components/Switch'
import { Tabs } from '@l3/components/Tabs'
import { Tag } from '@l3/components/Tag'
import { lmSwitchArrowVertical } from '@l3/icons/lemonnade'
import { msChevronRight, msShield } from '@l3/icons/material'
import { inr } from '../../../shared/data/format'
import { useFlowOption } from '../../../shared/prototype'
import { Screen } from '../../../shared/ui/Screen'
import { t } from '../copy'
import { defaultLimit, funds, intradayCloseTime, lossToday, orderContract, prefilledTpsl, sellMargin, validities, type DataState, type NudgeCaseId, type OrderProduct, type OrderSide, type OrderType } from '../data'
import { LossLimitSheet, TpslSheet } from '../sheets/GuardrailSheets'
import { NudgeSheet } from '../sheets/NudgeSheet'
import styles from './OrderPad.module.css'

type Modal = { kind: 'nudge' } | { kind: 'pnl' } | { kind: 'tpsl' }

type Props = {
  side?: OrderSide
  product?: OrderProduct
  type?: OrderType
  /** The nudge that fires on Buy / Sell (once — the shared cap is 1 per session). `'options'`: the case and state
   *  picked in the prototype settings. Leave out for an order with no nudge. */
  nudge?: { caseId: NudgeCaseId; state: DataState } | 'options'
  /** Opens with this sheet up (a direct link). */
  initialSheet?: 'nudge' | 'pnl' | 'tpsl'
  /** Today's loss limit, if one is set (null: none yet). */
  limit?: number | null
  /** Lost so far today, against the limit. */
  loss?: number
  onBack: () => void
}

/**
 * The F&O commodity options order pad (fno/order-pad, Figma 8671:18433) — the same screen, copied because flows
 * can't import each other — with the nudge's two layers added:
 * - Silent help (always there): "Set TPSL" becomes a TP/SL row that is pre-filled and switched on; the dock shows how
 *   much of today's loss limit is left (or a link to set one) above Avail. · Req.
 * - The nudge sheet (only when both engines agree): fires on Buy / Sell, once. Not now places the order; a guardrail
 *   opens its sheet in place (sheet → sheet), and saving returns to the pad.
 */
export function OrderPad({ side = 'buy', product: initialProduct = 'delivery', type: initialType = 'market', nudge, initialSheet, limit: initialLimit = null, loss = lossToday, onBack }: Props) {
  const c = orderContract
  const optionCase = useFlowOption('nudges', 'case', 'sizeUp') as NudgeCaseId
  const optionState = useFlowOption('nudges', 'state', 'A') as DataState
  const title = useFlowOption('nudges', 'title', 'behaviour') as 'behaviour' | 'brief'
  const actions = useFlowOption('nudges', 'actions', 'one') as 'one' | 'two'
  const fired = nudge === 'options' ? { caseId: optionCase, state: optionState } : nudge

  const [product, setProduct] = useState<OrderProduct>(initialProduct)
  const [type, setType] = useState<OrderType>(initialType)
  const [validity, setValidity] = useState(validities[0])
  const [lots, setLots] = useState(false)
  const [quantity, setQuantity] = useState(c.lotSize)
  const [limitPct, setLimitPct] = useState(20.3)
  const [triggerPct, setTriggerPct] = useState(20.3)
  const [tpslOn, setTpslOn] = useState(true)
  const [tpsl, setTpsl] = useState(prefilledTpsl)
  const [limit, setLimit] = useState<number | null>(initialLimit)
  const [modal, setModal] = useState<Modal | null>(initialSheet ? { kind: initialSheet } : null)
  const [nudged, setNudged] = useState(initialSheet !== undefined)
  const [toast, setToast] = useState<string | null>(null)
  const buy = side === 'buy'
  const priceAt = (pct: number) => inr(Math.round(c.ltp * (buy ? 1 - pct / 1000 : 1 + pct / 1000)), 0)
  const priceRow = (label: string, pct: number, setPct: (n: number) => void) => <div className={styles.field}>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={styles.fieldValue}>{priceAt(pct)}</span>
    <Stepper size="sm" className={styles.stepper} label={t('order.offset')} value={pct} onChange={setPct} min={0} step={0.1} format={(n) => `${n.toFixed(1)}%`} />
  </div>

  const place = () => { setModal(null); setToast(t('order.placed', { side: t(buy ? 'order.buy' : 'order.sell'), name: c.name, contract: c.contract })) }
  const submit = () => { if (fired && !nudged) { setNudged(true); setModal({ kind: 'nudge' }) } else place() }

  const sheet = modal?.kind === 'nudge' && fired
    ? <NudgeSheet caseId={fired.caseId} state={fired.state} title={title} actions={actions} onGuardrail={(g) => setModal({ kind: g })} onNotNow={place} />
    : modal?.kind === 'pnl'
      ? <LossLimitSheet initial={limit ?? defaultLimit} onClose={() => setModal(null)} onSave={(amount) => { setLimit(amount); setModal(null); setToast(t('pnl.saved', { amount: inr(amount, 0) })) }} />
      : modal?.kind === 'tpsl'
        ? <TpslSheet onClose={() => setModal(null)} onSave={(v) => { setTpsl(v); setTpslOn(true); setModal(null); setToast(t('tpsl.saved')) }} />
        : undefined

  const top = <Actionbar onBack={onBack} backLabel={t('order.back')}
    title={<span className={styles.contract}>
      <span className={styles.contractName}>{c.name}<Icon icon={lmSwitchArrowVertical} size={16} /><span className={styles.expiry}>{c.contract}</span></span>
      <span className={styles.contractPrice}>{inr(c.ltp, 2)}<PriceChange value={c.change} unit="percent" size="sm" arrow /></span>
    </span>}
    actions={<span className={styles.exchange}>{c.exchange}</span>}
    bottom={<Tabs aria-label={t('order.product')} value={product} onChange={setProduct} items={[{ value: 'delivery', label: t('order.delivery') }, { value: 'intraday', label: t('order.intraday') }]} />} />

  // Silent help in the dock: what's left of today's loss limit, or a link to set one.
  const left = limit !== null ? Math.max(limit - loss, 0) : 0
  const near = limit !== null && left <= limit * 0.2
  const lossLimit = limit !== null
    ? <button type="button" className={styles.limit} onClick={() => setModal({ kind: 'pnl' })}>
      <ProgressBar size="sm" value={(loss / limit) * 100} status={near ? 'warning' : 'default'} label={t('silent.limitBar')} />
      <span className={styles.limitText} data-tone={near ? 'warning' : undefined}><Icon icon={msShield} size={16} />{t('silent.limitLeft', { left: inr(left, 0) })}</span>
    </button>
    : <button type="button" className={styles.limitAdd} onClick={() => setModal({ kind: 'pnl' })}>
      <Icon icon={msShield} size={16} />{t('silent.limitAdd')}<Icon icon={msChevronRight} size={16} />
    </button>

  const dock = <div className={styles.dock} data-surface="primary">
    {product === 'intraday' && <p className={styles.autoClose}>{t('order.autoClose', { time: intradayCloseTime })}</p>}
    <div className={styles.dockBody}>
      {lossLimit}
      <div className={styles.funds}>
        <span><span className={styles.muted}>{t('order.available')}</span> <strong>{inr(funds.available, 0)}</strong></span>
        <span><span className={styles.muted}>{t('order.required')}</span> <strong>{inr(funds.required, 0)}</strong></span>
      </div>
      <Button variant={buy ? 'brand' : 'sell'} size="lg" fullWidth onClick={submit}>{t(buy ? 'order.buy' : 'order.sell')}</Button>
    </div>
  </div>

  return <Screen top={top} bottom={dock} sheet={sheet}
    toast={toast ? <Aerobar floating type="success" heading={toast} onDismiss={() => setToast(null)} /> : undefined}>
    <Stack gap="16" className={styles.body}>
      <Stack direction="horizontal" align="center" justify="between">
        <Tabs aria-label={t('order.type')} appearance="pill" size="md" value={type} onChange={setType} items={(['market', 'limit', 'sl'] as const).map((value) => ({ value, label: t(`order.${value}`) }))} />
        {type !== 'market' && <Select size="sm" aria-label={t('order.validity')} className={styles.validity} onClick={() => setValidity(validities[(validities.indexOf(validity) + 1) % validities.length])}>{validity}</Select>}
      </Stack>
      {!buy && <div className={styles.margin}><span><span className={styles.muted}>{t('order.margin')}</span> <strong>{sellMargin.margin}</strong></span><span><span className={styles.muted}>{t('order.leverage')}</span> <strong>{sellMargin.leverage}</strong></span></div>}
      <div className={styles.field}>
        <button type="button" className={styles.unit} aria-label={t('order.unitSwitch')} onClick={() => setLots(!lots)}>{t(lots ? 'order.lots' : 'order.quantity')}<Icon icon={lmSwitchArrowVertical} size={12} /></button>
        <span className={styles.hint}>{t('order.lotHint', { lot: c.lotSize })}</span>
        <Stepper size="sm" className={styles.stepper} label={t(lots ? 'order.lots' : 'order.quantity')} value={lots ? quantity / c.lotSize : quantity} onChange={(n) => setQuantity(lots ? n * c.lotSize : n)} min={lots ? 1 : c.lotSize} step={lots ? 1 : c.lotSize} />
      </div>
      {type === 'sl' && priceRow(t('order.trigger'), triggerPct, setTriggerPct)}
      {type !== 'market' && priceRow(t('order.limitPrice'), limitPct, setLimitPct)}
      {/* Silent help: the draft's "Set TPSL" link becomes a TP/SL that is already on and pre-filled. */}
      <div className={styles.tpslRow}>
        <button type="button" className={styles.tpslText} aria-label={t('silent.tpslEdit')} onClick={() => setModal({ kind: 'tpsl' })}>
          <span className={styles.tpslHead}>{t('silent.tpsl')}{tpslOn && <Tag size="sm" variant="secondary" color="success">{t('silent.prefilled')}</Tag>}</span>
          <span className={styles.tpslValue}>{tpslOn ? t('silent.tpslOn', { target: tpsl.targetPct, stop: tpsl.stopPct }) : t('silent.tpslOff')}</span>
        </button>
        <Switch aria-label={t('silent.tpslToggle')} checked={tpslOn} onChange={(e) => setTpslOn(e.target.checked)} />
      </div>
    </Stack>
  </Screen>
}
```

### `src/flows/nudges/sheets/GuardrailSheets.module.css`

```css
/* Loss limit and TP/SL sheets. */
.body { padding: 0; }
```

### `src/flows/nudges/sheets/GuardrailSheets.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { Stack } from '@l3/components/Stack'
import { Stepper } from '@l3/components/Stepper'
import { Tabs } from '@l3/components/Tabs'
import { TextField } from '@l3/components/TextField'
import { inr } from '../../../shared/data/format'
import { Sheet } from '../../../shared/ui/Sheet'
import { t } from '../copy'
import { limitPresets, orderContract, prefilledTpsl } from '../data'
import styles from './GuardrailSheets.module.css'

/**
 * "Today's loss limit" (PnL Protect, set from the nudge or the order pad). Amount field (focused, as with the keypad
 * up) with quick amounts as pill tabs under it; the dock saves it. Pre-filled with a sample amount so one tap sets it.
 */
export function LossLimitSheet({ initial, onSave, onClose }: { initial: number; onSave: (amount: number) => void; onClose: () => void }) {
  const id = useId()
  const [amount, setAmount] = useState(initial)
  const preset = limitPresets.includes(amount) ? String(amount) : ''
  return <Sheet labelledBy={id} onClose={onClose}
    header={<BottomSheetHeader headingId={id} heading={t('pnl.title')} description={t('pnl.description')} />}
    footer={<ButtonGroup aria-label={t('pnl.title')}><Button size="lg" disabled={amount <= 0} onClick={() => onSave(amount)}>{t('pnl.save')}</Button></ButtonGroup>}>
    <Stack gap="16" className={styles.body}>
      <TextField label={t('pnl.field')} inputMode="numeric" autoFocus value={amount ? inr(amount, 0) : ''}
        onChange={(e) => setAmount(Number(e.target.value.replace(/[^\d]/g, '')) || 0)} helperText={t('pnl.helper')} helperIcon={false} />
      <Tabs aria-label={t('pnl.presets')} appearance="pill" value={preset} onChange={(v) => setAmount(Number(v))}
        items={limitPresets.map((n) => ({ value: String(n), label: inr(n, 0) }))} />
    </Stack>
  </Sheet>
}

/**
 * "TP/SL for this order": target profit and stop-loss as % of the entry price (steppers), the price each one exits
 * at beside it. Opens with the order pad's pre-filled values.
 */
export function TpslSheet({ onSave, onClose }: { onSave: (tpsl: { targetPct: number; stopPct: number }) => void; onClose: () => void }) {
  const id = useId()
  const [targetPct, setTarget] = useState(prefilledTpsl.targetPct)
  const [stopPct, setStop] = useState(prefilledTpsl.stopPct)
  const at = (pct: number) => t('tpsl.atPrice', { price: inr(orderContract.ltp * (1 + pct / 100)) })
  const pct = (n: number) => `${n}%`
  return <Sheet labelledBy={id} onClose={onClose}
    header={<BottomSheetHeader headingId={id} heading={t('tpsl.title')} description={t('tpsl.description')} />}
    footer={<ButtonGroup aria-label={t('tpsl.title')}><Button size="lg" onClick={() => onSave({ targetPct, stopPct })}>{t('tpsl.save')}</Button></ButtonGroup>}>
    <div className={styles.body}>
      <KeyValueList>
        <KeyValueRow label={t('tpsl.target')} caption={at(targetPct)} value={<Stepper size="sm" label={t('tpsl.target')} value={targetPct} onChange={setTarget} min={1} step={1} format={pct} />} />
        <KeyValueRow label={t('tpsl.stop')} caption={at(-stopPct)} value={<Stepper size="sm" label={t('tpsl.stop')} value={stopPct} onChange={setStop} min={1} max={99} step={1} format={pct} />} />
      </KeyValueList>
    </div>
  </Sheet>
}
```

### `src/flows/nudges/sheets/NudgeSheet.module.css`

```css
/* The overtrading nudge sheet, on L3 tokens. Motion plays once on open; none with reduced motion. */

/* Header icon: 64 warning circle with a soft ring that pulses twice — the one thing that says "look here". */
.icon { position: relative; display: grid; place-items: center; width: var(--l3-size-64); height: var(--l3-size-64); border-radius: var(--l3-radius-full); background: var(--l3-surface-accent-warning-light); color: var(--l3-content-accent-warning-default); }
.icon[data-tone='error'] { background: var(--l3-surface-accent-error-light); color: var(--l3-content-accent-error-default); }
.icon::after { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 2px solid currentColor; opacity: 0; animation: pulse calc(var(--l3-motion-duration-long) * 3) var(--l3-motion-easing-decelerate) 2 both; }
@keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }

/* Box 1: the fact about today, big. Box 2: why it matters. */
.hero { font: var(--l3-text-heading-28); color: var(--l3-content-primary); }
.proof { font: var(--l3-text-heading-16); color: var(--l3-content-primary); }
.proof[data-tone='loss'] { color: var(--l3-content-accent-error-default); }
.label { font: var(--l3-text-label-12); color: var(--l3-content-secondary); }
.rule { margin: 0; border: 0; border-top: 1px solid var(--l3-border-light); }

/* 10 people: the share who lost more fill in red, one by one. */
.people { display: flex; justify-content: space-between; }
.person { display: inline-flex; color: var(--l3-content-disabled); }
.person[data-lost] { animation: fill var(--l3-motion-duration-short) var(--l3-motion-easing-standard) both; animation-delay: calc(var(--i) * var(--l3-motion-duration-short) + var(--l3-motion-duration-long)); }
@keyframes fill { from { color: var(--l3-content-disabled); transform: scale(0.8); } to { color: var(--l3-content-accent-error-default); transform: scale(1); } }

@media (prefers-reduced-motion: reduce) {
  .icon::after, .person[data-lost] { animation: none; }
  .person[data-lost] { color: var(--l3-content-accent-error-default); }
}
```

### `src/flows/nudges/sheets/NudgeSheet.tsx`

```tsx
import { useId, type CSSProperties } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { Stack } from '@l3/components/Stack'
import { msPersonFill, msSpeed } from '@l3/icons/material'
import { Sheet } from '../../../shared/ui/Sheet'
import { t } from '../copy'
import { caseById, type DataState, type Guardrail, type NudgeCaseId } from '../data'
import styles from './NudgeSheet.module.css'

export type NudgeSheetProps = {
  caseId: NudgeCaseId
  state: DataState
  /** 'behaviour' (playground default): the plain-words behaviour is the heading · 'brief': "Overtrading detected" as
   *  the heading and the behaviour under it (the product team's draft). */
  title?: 'behaviour' | 'brief'
  /** 'one' (default): the case's guardrail (primary) + Not now (secondary) · 'two': both guardrails + Not now (ghost). */
  actions?: 'one' | 'two'
  onGuardrail: (g: Guardrail) => void
  /** Not now: the order goes ahead. Also a scrim tap, drag down or Esc. */
  onNotNow: () => void
}

type Key = Parameters<typeof t>[0]

/**
 * The overtrading nudge — ONE sheet for every case; a case only fills the slots. It interrupts an order, so it says
 * one thing: the header (pulsing icon + the behaviour in plain words), one card — the fact about today as a big
 * number (Box 1), a hairline, then why it matters (Box 2): his own last loss in red (state A) or the group line with
 * 10 people filling in — and two buttons: the guardrail (primary) and Not now (secondary).
 * Motion plays once on open and is off with reduced motion.
 */
export function NudgeSheet({ caseId, state, title = 'behaviour', actions = 'one', onGuardrail, onNotNow }: NudgeSheetProps) {
  const id = useId()
  const nudge = caseById.get(caseId)!
  const key = (slot: string) => `case.${caseId}.${slot}` as Key
  const behaviour = t(key('heading'))
  const own = state === 'A'
  const raw = state === 'C' && !nudge.noHistory
  const other: Guardrail = nudge.primary === 'pnl' ? 'tpsl' : 'pnl'
  const label = (g: Guardrail) => t(g === 'pnl' ? 'nudge.setPnl' : 'nudge.setTpsl')
  const heading = title === 'brief' ? t('nudge.titleBrief') : behaviour
  const people = !own && nudge.groupShare !== undefined && nudge.groupShare >= 0.1

  return <Sheet labelledBy={id} onClose={onNotNow}
    header={<BottomSheetHeader size="lg" headingId={id} heading={heading} description={title === 'brief' ? behaviour : undefined}
      icon={<span className={styles.icon} data-tone={title === 'brief' ? 'error' : 'warning'}><Icon icon={msSpeed} size={24} /></span>} />}
    footer={<ButtonGroup aria-label={heading} direction="vertical">
      <Button size="lg" onClick={() => onGuardrail(nudge.primary)}>{label(nudge.primary)}</Button>
      {actions === 'two' && <Button size="lg" variant="secondary" onClick={() => onGuardrail(other)}>{label(other)}</Button>}
      <Button size="lg" variant={actions === 'two' ? 'ghost' : 'secondary'} onClick={onNotNow}>{t('nudge.notNow')}</Button>
    </ButtonGroup>}>
    <Card as="section" aria-label={behaviour}>
      <Stack gap="16">
        <Stack gap="04">
          <span className={styles.hero}>{t(key(raw ? 'box1Raw' : 'box1Own'))}</span>
          <span className={styles.label}>{t(key('box1Label'))}</span>
        </Stack>
        <hr className={styles.rule} />
        <Stack gap="12">
          {people && <People share={nudge.groupShare!} />}
          <Stack gap="04">
            <span className={styles.proof} data-tone={own ? 'loss' : undefined}>{own ? t('case.lossA') : t(key('box2Value'))}</span>
            <span className={styles.label}>{own ? t('nudge.lastTime') : t(key('box2Label'))}</span>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  </Sheet>
}

/** The group line as 10 people: the share who lost more fill in red, one after another. */
function People({ share }: { share: number }) {
  const count = Math.round(share * 10)
  return <div className={styles.people} role="img" aria-label={t('nudge.people', { count })}>
    {Array.from({ length: 10 }, (_, i) => <span key={i} className={styles.person} data-lost={i < count || undefined} style={{ '--i': i } as CSSProperties}>
      <Icon icon={msPersonFill} size={20} />
    </span>)}
  </div>
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
