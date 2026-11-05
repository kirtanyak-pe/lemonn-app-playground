# Flow: Overtrading nudges (playground) (`nudges`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `6de43c8` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Journey-aware P&L limit and TP/SL prompts: silent help on the order pad, and one nudge sheet when the revenge flag and the journey engine agree.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/nudges · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/nudges.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `nudges-01` | Order pad · silent help | [8671:18433]() | — | The default — no interruption. The F&O commodity order pad (fno-25) as it is, plus silent help: “Set TPSL” becomes a TP/SL row, pre-filled and on (Target +20% · Stop-loss −10%); “Set a loss limit for today” is the first line of the dock. Buy fires the nudge picked in the settings (Case, Data state), once: the shared cap is 1 per session. |
| `nudges-02` | Nudge · from settings | — | — | The one nudge sheet, filled by the case and data state picked in the settings. Try all 17 cases × A / B / C and the draft’s two guardrail buttons. |
| `nudges-03` | Nudge · generic | — | — | Fires on Positions with the revenge flag when no single behaviour stands out, or the trader is too new to compare (state D). No bars; the group line. Dismiss says just “Not now” (no order in hand). |
| `nudges-04` | Nudge · size-up · A (own loss) | — | — | Bars: this order vs the trade he lost (2X). Enough history and his last size-up lost: the line is his own loss, on a red strip. |
| `nudges-05` | Nudge · orders today · B | — | — | Bars: his usual day vs today (3X). Last time didn’t lose: the line is the group (7 in 10 lost more). |
| `nudges-06` | Nudge · orders today · C (thin history) | — | — | Too few past sessions for “your usual”: the headline becomes today’s raw fact (“14 orders today”), no bars. |
| `nudges-07` | Nudge · averaging down (TP/SL first) | — | — | A case whose main button is TP/SL and whose fact isn’t a multiple: no bars: headline + the group line. |
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

Each screen is the order pad in one state; within a screen, sheets swap over the same page. Screens 03–09 open with
their own case; changing Case or Data state in the settings switches the open sheet to the pick on any screen.

| Id | Screen | What it shows / when |
|---|---|---|
| `nudges-01` | Order pad · silent help | Default. TP/SL on and pre-filled, "Set a loss limit for today" in the dock. Buy fires the nudge from the settings, once. |
| `nudges-02` | Nudge · from settings | The nudge sheet for any case (17) × data state (A / B / C) and the button variant. |
| `nudges-03` | Nudge · generic | Fires on Positions: nothing stands out, or the behaviour can't be scored (state D). No bars. |
| `nudges-04` | Nudge · size-up · A | Bars: the trade he lost vs this order; line = his own last loss (red strip). |
| `nudges-05` | Nudge · orders today · B | Bars: his usual day vs today; line = the group (7 in 10 lost more). |
| `nudges-06` | Nudge · orders today · C | No "usual" yet: headline = today's raw fact, no bars. |
| `nudges-07` | Nudge · averaging down | A TP/SL-first case whose fact isn't a multiple: no bars. |
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
           (prototype setting "Show on every Buy", on by default: the nudge fires on every Buy / Sell, to demo it; off = the real cap)
```

### The nudge sheet (one template, every case)

It opens on a trader who is mid-order, stressed and moving fast, so it reads top to bottom in one glance: ✋ stop →
"Overtrading Detected" (what this is) → the fact, number first (why now) → two bars, his usual vs now (the picture of "too
much") → one consequence line (what it costs) → the guardrail, or Not now. One number, one picture, one consequence.

| Slot | L3 | Content |
|---|---|---|
| Header | `BottomSheetHeader size="lg"` · 64 icon (front hand, error circle, pulses twice) · `Tag md error` "Overtrading Detected" | Heading = the fact with its number: "3X more orders than usual today" |
| Bars | `Card` with two 12px bars on one scale | Usual (grey, 1/ratio wide) vs now (red, full width, grows in), labels per case ("Your usual day" / "Today"), 1X / 3X at the right. Only when the fact is a multiple (12 of 17 cases) and not state C |
| Consequence | a tinted strip, icon + one line | A: "Last time you did this, you lost ₹2,900" on the error tint · B / C: "7 in 10 traders who did this lost more by the end of the day" on grey · none when not measured |
| Dock | `ButtonGroup` vertical | `primary` = the case's guardrail · `secondary` "Not now, place order" (on Positions: "Not now"). Setting "Both guardrails": primary · secondary (other guardrail) · ghost Not now |

**Layouts** (prototype setting "Layout", to compare; same content and dock in each):

| Layout | What changes |
|---|---|
| 1 · Centred + bars | The table above. Header (setting "Layout 1 header"): **Chip** (default) — no circle; one big light-red pill (pill-tab shape: full radius, 40 high, error-light fill and border) with ✋ on the left of "Overtrading Detected", then the fact · **Icon + tag** — ✋ in a 64 circle, the tag under it. |
| 2 · Big number | No centred header: ✋ + tag on one line, then the multiple as a giant red number (`heading-36`, "3X") with its words under it (`case.<id>.unit`, "more orders than usual today"), then the consequence. Cases without a multiple, and state C, show the headline instead. |
| 3 · Compact alert | One red-tinted card (40 ✋ circle centred, tag, the headline in `heading-18`) and the consequence under it. The shortest sheet: most of the order pad stays visible. |
| 4 · Risk meter | The picture first, for a stressed trader: a **risk meter** — a thick half ring in three zones (success · warning · error accents, no numbers or ticks, so it reads as a risk scale, not a speedometer), "Safe" / "Danger" under its ends and a green **Usual** notch in the safe zone. The pointer starts on Usual (green) and swings into the red (turning red), overshoots a little and settles; then the danger zone pulses twice. In the middle: the multiple (`heading-36`, "2X") over "vs your usual" — "High risk" when there's no multiple. Under it only one heading, the fact (`heading-20`), and the "Overtrading Detected" tag below it. No not-safe line and no consequence strip (cut to keep the sheet to three things). `sheets/RiskVisuals.tsx` |
| 5 · Risk bar (default) | Always the size-up case; State doesn't apply (the switcher hides it), and the **Case pill picks Layout 5's version** instead — no setting of its own: **5a · High risk** (case `sizeUp`, the default) **5b · Everyone vs you**, **5c · Why first** and **5d · Story** (stored as cases `everyone`, `explain`, `story`, which aren't cases of the other layouts; they show size-up for them). 5a: The same scale laid flat, straight on the sheet (no card): a 12-high bar in the three zones, "Low risk zone" / "High risk zone" under its ends, and a red dot that slides from the usual spot (22 %) into the high-risk zone. A floating tooltip sits above the dot in its own space: dark bubble (radius 12), one line hugging its text, "High chance of losing money", Heading/16. Its arrow is 24 in from its right end, on the dot, so the bubble reaches left over the bar; it grows out of the dot once the dot settles, and the dot then glows on loop. Under the bar, left-aligned: one heading, "Overtrading, you just entered the high risk zone". No tag, no usual marker. Experiment: the tooltip is drawn in the flow, not the L3 Tooltip (L3 gap: a tooltip that follows a moving target, bigger text).. 5b: a green dot for "Everyone" at the usual spot and the red "You" dot, each with a centred tooltip; the Everyone tooltip emerges from the green dot first, then the red dot slides to the danger zone and the You tooltip emerges from it. Under the ends: "Safe zone / trading to plan" and "Danger zone / chasing losses" (zone Heading/14, note Label/14 secondary). Same heading. 5c answers "why did this open?" first: L3's lg BottomSheetHeader, centred — "You're overtrading" over "Your chances of losing money are high" (generic, fits any trigger) — then the 5b bar in the content slot with just "Safe zone" · "Danger zone" under the ends (no notes). 5d is 5c played once like a short feature video (≈ 7 s), and it can't be dismissed (no backdrop tap, drag or Esc: one of the buttons has to be tapped): "You're overtrading" stamps in (0.25 s, from 1.6× with a small snap) in the middle of the sheet, a little bigger; the risk line fades in under it in primary; both rise to the header's place in 0.4 s, settle to size and the line turns secondary; then the bar wipes in from the left, "Safe zone" then "Danger zone" dissolve in, the green dot grows from nothing, Everyone, the red dot grows out of it and slides, You; the buttons come in last — "Place an order with an SL limit" · "Place without limit". Reduced motion: all at rest. |

**Floating switcher (prototype only):** on the order pad and over the open nudge, a small pill floats: grip · Layout · Case ·
State. Each is a dropdown pill that opens its own menu (full names, the picked one ticked); a long value is cut with an
ellipsis in the pill so the bar always fits the screen. The sheet changes in place. Drag it by the grip (it remembers where,
per browser). `components/SheetSwitcher.tsx`, options in `options.ts`. Not part of the design: don't build it.

**Vibration:** two short pulses (70 · 60 · 70 ms) when the sheet opens, not when it changes; setting "Vibrate when
it opens" (on). In the Lemonn Android app the page calls `window.LemonnApp.vibrate` (works without a tap); in a
browser, `navigator.vibrate` (Android Chrome, right after a tap; iPhone has none). Real app: a native warning haptic.

Motion plays once on open (icon ring, bars growing, the big number popping in) and is off with reduced motion. No disclaimer line for now —
compliance to confirm whether one is needed.

Data states: A = own history and last time lost (own loss line) · B = own history, no loss (group line) · C = thin
history (raw fact, no bars) · D = can't score → the generic sheet. Cases: `data.ts`; words: `copy.json` `case.<id>.*`
(headline, raw, base / now bar labels, unit for the big number).

**Risk scale (layouts 4 and 5):** Safe 0–45 %, Caution 45–65 %, Danger 65–100 % of the scale. Usual (1X) sits at 22 %;
now at 72 % + 23 % × (multiple − 1) / 9, capped at the end (2X → 75 %, 10X → 95 %); no multiple → 80 %. The positions
are a picture, not a measure: the real engine only says "in danger". Single state for now (A / B / C only change the
words and the consequence).

### Data

`data.ts`: `nudgeCases` (id, kind, `where` order | positions, primary guardrail `pnl` | `tpsl`, `ratio`,
`othersLostMore` %, `lastLoss` ₹, `othersVs`), values from the product team's compare file (2026-11-01); the sample
order (`orderContract`, `funds`), pre-filled TP/SL (20% / 10%), loss-limit presets and sample loss. The API must
provide, per nudge: case id, data state, the headline numbers, ratio, own last loss (A), group share.

### Rules & behaviour

- Silent help first: the sheet only appears when the revenge flag and the journey engine agree; capped 1 per session,
  2 per day, shared across all nudges.
- Every sheet is skippable in one tap; it never blocks the order, never asks for a deposit, never gives advice.
- Box 2 describes what happens to people, never "because you…". Never promise a green day. Never use "only 2 in 100
  stop" as copy.

### Differences from the draft

- **One consequence, not two:** the draft shows "Others who did this 67% lost more" and "What it cost them ₹2,500
  more" (or "Loss grew 1.8X"). The sheet keeps one line; the cost stat is dropped. Percentages read as "7 in 10".
- **"Overtrading Detected" is a tag** over the fact, not the headline: the tag says what this is, the fact says why.
- **Behaviour box → bars:** "3X more orders than usual" is drawn as his usual vs today, so the size is seen, not read.
- **Buttons:** one guardrail + Not now by default (one clear choice); the draft's two guardrails are the "Buttons"
  setting. Main button L3 `primary`, not lime (lime is Buy, right under this sheet).
- **"Not now" says what it does:** "Not now, place order"; on Positions just "Not now".
- **Not measured → left out:** cases the draft marks "Not measured" show no group line instead of the words.
- **Positions:** generic, expiry and giving-back fire on Positions in the draft; the prototype shows them over the
  order pad (no Positions page here yet), with the Positions dismiss label.

### L3 gaps

- No illustration for "slow down" / caution moments (the draft wants the Lemonn character).
- BottomSheet has no non-dismissible mode: without `onClose` a backdrop tap does nothing, but the sheet still follows a drag (5d pins it with a flow CSS rule on the dialog). A `dismissible={false}` prop would cover it.
- No static (non-tappable) pill: Layout 1’s Chip header is drawn in the flow (NudgeSheet .chip) in the pill-tab shape with error-light tokens. A Tag with `radius-full` and a larger size would cover it.

### Changelog

- 2026-10-30 · first build on the `playground` branch.
- 2026-10-30 · nudge sheet revamp: one card (big number + proof, 10 people filling in), pulsing icon, primary + secondary dock; tags, bars, explainer and disclaimer removed to cut text.
- 2026-11-01 · nudge sheet redesigned from the product team's 17 use cases for a one-glance read: ✋ + "Overtrading" tag, the fact as the heading, usual-vs-now bars, one consequence line; case values from their compare file; "Sheet title" setting removed.
- 2026-11-01 · settings: "Show on every Buy" toggle (fires the nudge on every Buy / Sell); data state is a dropdown.
- 2026-11-01 · "Layout" setting: 1 · Centred + bars, 2 · Big number, 3 · Compact alert.
- 2026-11-01 · tag reads "Overtrading Detected" (md), in every layout and case; Compact icon centred.
- 2026-11-01 · the Case / Data state settings now change the sheet on every nudge screen, not only 01–02.
- 2026-11-01 · the phone vibrates when the nudge opens (setting "Vibrate when it opens").
- 2026-11-01 · "Show on every Buy" is on by default.
- 2026-11-01 · floating Layout · Case · State switcher over the open nudge (prototype only, draggable).
- 2026-11-01 · the floating switcher shows on the order pad too, before the nudge fires.
- 2026-11-02 · multipliers are written with a capital X (2X, 3X) in every layout, so the sign sits level with the number.
- 2026-11-02 · every sheet in this flow has 24 above its content as well as below (L3 has 16 on top); a difference from L3.
- 2026-11-02 · Layout 1 header: Chip (✋ + label in one light-red pill, no circle; default) or Icon + tag — setting and floating switcher.
- 2026-11-02 · Chip header: 24 above and below it; on open it pops in as ✋ alone, then opens to show "Overtrading Detected" (while the bars grow).
- 2026-11-02 · a nudge with no bars and no consequence (giving back) keeps 24 under the headline, above the dock.
- 2026-11-02 · Size-up after a loss is the default case and heads the case list. Floating switcher: every control is a dropdown pill with its own designed menu (no system picker); the case pill truncates so the bar never runs off the screen.
- 2026-11-04 · Layouts 4 · Risk meter and 5 · Risk bar: where the trader is on a safe → danger scale, his usual vs now, animated once.
- 2026-11-04 · Layouts 4 and 5 trimmed: the meter / bar at the top, one heading, the tag under it; the not-safe line, the consequence and the bar's card removed.
- 2026-11-05 · Layout 5 is the default and has one version (size-up); the switcher hides Case and State on it.
- 2026-11-05 · Layout 5: zones renamed Low / High risk zone; the Usual and You now pills, the green usual dot and the tag removed; one floating tooltip ("High chance of losing money", two lines) centred on the red dot, sliding with it; heading "Overtrading, you just entered the high risk zone".
- 2026-11-05 · Layout 5: the tooltip grows out of the red dot once it settles (no longer rides along), with 12 of room above so its overshoot isn't clipped; the red dot then glows on loop like a live indicator (a soft red ring swells and fades). Reduced motion: all still.
- 2026-11-05 · Layout 5: the tooltip is one line, with its arrow near its right end (on the dot), so it covers the empty part of the bar on the left; it still grows out of the arrow.
- 2026-11-05 · Layout 5: the tooltip emerges from the red dot: a small red blob leaves the dot, rises to the arrow spot and opens into the dark bubble (0.7 s), text last.
- 2026-11-05 · Layout 5b · Everyone vs you, picked in the Case pill: Everyone and You tooltips in turn, Safe zone / trading to plan · Danger zone / chasing losses.
- 2026-11-05 · Layout 5c · Why first: L3 lg header "You're overtrading" · "Your chances of losing money are high", then the Everyone vs You bar without the zone notes.
- 2026-11-05 · Layout 5d · Story: 5c played as a short feature video (heading stamps in centred, the risk line, both rise, the bar builds step by step, buttons last); can't be dismissed; buttons "Place an order with an SL limit" · "Place without limit".


## Source — this flow

### `src/flows/nudges/components/SheetSwitcher.module.css`

```css
/* PROTOTYPE ONLY: the floating Layout · Case · State pill over the open nudge sheet. Tokens only. */

/* Starts top-left, under the floating settings button and above the sheet; once dragged, left / top come from the
   component. */
.pill {
  position: absolute;
  z-index: var(--app-layer-fab);
  left: var(--l3-spacing-12);
  top: var(--l3-size-64);
  width: max-content;
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-04);
  max-width: calc(100% - var(--l3-spacing-24));
  padding: var(--l3-spacing-04);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-primary);
  box-shadow: var(--l3-shadow-elevation-high);
  touch-action: none;
}

.grip {
  flex: none;
  display: grid;
  place-items: center;
  width: var(--l3-size-32);
  height: var(--l3-size-32);
  padding: 0;
  border: 0;
  border-radius: var(--l3-radius-full);
  background: none;
  color: var(--l3-content-secondary);
  cursor: grab;
  touch-action: none;
}
.grip:active { cursor: grabbing; }

.chip {
  flex: 0 1 auto;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: var(--l3-spacing-02);
  height: var(--l3-size-32);
  padding: 0 var(--l3-spacing-04) 0 var(--l3-spacing-08);
  border: 0;
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-secondary);
  color: var(--l3-content-primary);
  font: var(--l3-text-label-12);
  white-space: nowrap;
  cursor: pointer;
}
.chip > svg { flex: none; transition: transform var(--l3-motion-duration-short) var(--l3-motion-easing-standard); }
.chip[data-open] { box-shadow: inset 0 0 0 1px var(--l3-border-dark); }
.chip[data-open] > svg { transform: rotate(180deg); }
/* The short pills keep their size; the case (the long one) gives way so the bar never runs past the screen. */
.value { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.chip:not([data-wide]) { flex: none; }
.chip[data-wide] { min-width: var(--l3-size-64); }

/* The dropdown: a floating card with the full names. */
.menu {
  position: absolute;
  z-index: var(--app-layer-fab);
  box-sizing: border-box;
  min-width: calc(var(--l3-size-96) * 2);
  max-width: calc(100% - var(--l3-spacing-16));
  overflow-y: auto;
  padding: var(--l3-spacing-04);
  border-radius: var(--l3-radius-16);
  background: var(--l3-surface-primary);
  box-shadow: var(--l3-shadow-elevation-high), inset 0 0 0 1px var(--l3-border-light);
  animation: drop var(--l3-motion-duration-short) var(--l3-motion-easing-decelerate) both;
}
.menuTitle {
  padding: var(--l3-spacing-08) var(--l3-spacing-12) var(--l3-spacing-04);
  color: var(--l3-content-secondary);
  font: var(--l3-text-label-12);
}
.item {
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-08);
  width: 100%;
  min-height: var(--l3-size-40);
  padding: 0 var(--l3-spacing-12);
  border: 0;
  border-radius: var(--l3-radius-12);
  background: none;
  color: var(--l3-content-primary);
  font: var(--l3-text-label-14);
  text-align: left;
  cursor: pointer;
}
.item:hover { background: var(--l3-surface-secondary); }
.item[data-picked] { background: var(--l3-surface-secondary); }
.itemLabel { flex: 1; }
.item > svg { flex: none; color: var(--l3-content-accent-success-default); }

@keyframes drop { from { opacity: 0; transform: translateY(calc(var(--l3-spacing-04) * -1)); } }
@media (prefers-reduced-motion: reduce) { .menu, .chip > svg { animation: none; transition: none; } }
```

### `src/flows/nudges/components/SheetSwitcher.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@l3/components/Icon'
import { msCheck, msDragIndicator, msKeyboardArrowDown } from '@l3/icons/material'
import { setFlowOption, useFlowOption, usePreview } from '../../../shared/prototype'
import { t } from '../copy'
import { badgeOption, caseOption, layoutOption, stateOption, zoneCaseOption } from '../options'
import styles from './SheetSwitcher.module.css'

type Option = typeof caseOption | typeof zoneCaseOption | typeof stateOption | typeof layoutOption | typeof badgeOption
type Spot = { x: number; y: number }

const SPOT_KEY = 'nudges-switcher-spot'
const readSpot = (): Spot | null => {
  try { return JSON.parse(localStorage.getItem(SPOT_KEY) ?? 'null') } catch { return null }
}

/**
 * PROTOTYPE ONLY — not part of the design. A small floating pill over the order pad and the open nudge sheet: Layout ·
 * (Layout 1: Chip / Icon + tag) · Case · State,
 * each a dropdown pill (its own menu, with the full names), so versions can be compared on a phone without opening the
 * settings. A value that doesn't fit its pill is cut with an ellipsis; the menu shows it whole. Drag it by the grip; it remembers where it was left (this browser).
 *
 * The sheet makes everything inside the screen inert, so the pill is drawn just outside the screen (in the layer
 * that holds it), over the sheet.
 */
/** `open`: show it (on a pad that has a nudge to fire). */
export function SheetSwitcher({ open }: { open: boolean }) {
  const { interactive } = usePreview()
  const anchor = useRef<HTMLSpanElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => {
    const screen = anchor.current?.closest('[data-part="page"]')?.parentElement
    setHost(screen?.parentElement ?? null)
  }, [])

  return <>
    <span ref={anchor} hidden />
    {interactive && open && host && createPortal(<Pill host={host} />, host)}
  </>
}

function Pill({ host }: { host: HTMLElement }) {
  const pill = useRef<HTMLDivElement>(null)
  const [spot, setSpot] = useState<Spot | null>(readSpot)
  const layout = useFlowOption('nudges', layoutOption.id, layoutOption.default)
  const [menu, setMenu] = useState<{ option: Option; chip: HTMLElement } | null>(null)
  const grab = useRef<{ id: number; dx: number; dy: number } | null>(null)

  // Keep it inside the screen (a phone turned, or a spot saved on a bigger screen).
  const clamp = (x: number, y: number): Spot => {
    const box = pill.current?.getBoundingClientRect()
    const w = box?.width ?? 0
    const h = box?.height ?? 0
    return { x: Math.min(Math.max(0, x), host.clientWidth - w), y: Math.min(Math.max(0, y), host.clientHeight - h) }
  }

  const down = (e: PointerEvent<HTMLButtonElement>) => {
    const box = pill.current!.getBoundingClientRect()
    setMenu(null)
    grab.current = { id: e.pointerId, dx: e.clientX - box.left, dy: e.clientY - box.top }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* the pointer is already gone */ }
  }
  const move = (e: PointerEvent<HTMLButtonElement>) => {
    const g = grab.current
    if (!g || g.id !== e.pointerId) return
    const origin = host.getBoundingClientRect()
    // The preview may scale the phone: convert screen pixels to the host's own.
    const scale = origin.width / host.clientWidth || 1
    setSpot(clamp((e.clientX - origin.left - g.dx) / scale, (e.clientY - origin.top - g.dy) / scale))
  }
  const up = (e: PointerEvent<HTMLButtonElement>) => {
    if (grab.current?.id !== e.pointerId) return
    grab.current = null
    try { if (spot) localStorage.setItem(SPOT_KEY, JSON.stringify(spot)) } catch { /* storage off */ }
  }

  return <div ref={pill} className={styles.pill} role="group" aria-label={t('switcher.label')}
    style={spot ? { left: spot.x, top: spot.y } : undefined}>
    <button type="button" className={styles.grip} aria-label={t('switcher.drag')}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      <Icon icon={msDragIndicator} size={20} />
    </button>
    <Pick option={layoutOption} menu={menu} setMenu={setMenu} short={(v) => t('switcher.layout', { n: layoutOption.values.findIndex((o) => o.value === v) + 1 })} />
    {layout === 'bars' && <Pick option={badgeOption} menu={menu} setMenu={setMenu} short={(v) => t(v === 'chip' ? 'switcher.badgeChip' : 'switcher.badgeTag')} />}
    {/* Layout 5: the Case pill picks between its two versions; no state to pick. */}
    <Pick option={layout === 'zone' ? zoneCaseOption : caseOption} menu={menu} setMenu={setMenu} short={(_, label) => label} wide />
    {layout !== 'zone' && <Pick option={stateOption} menu={menu} setMenu={setMenu} short={(v) => t('switcher.state', { state: v })} />}
    {menu && <Menu option={menu.option} chip={menu.chip} host={host} onClose={() => setMenu(null)} />}
  </div>
}

type MenuState = { option: Option; chip: HTMLElement } | null

/** A dropdown pill: the short value (cut with an ellipsis when it doesn't fit) and a chevron; a tap opens the menu. */
function Pick({ option, short, wide, menu, setMenu }: {
  option: Option; short: (value: string, label: string) => string; wide?: boolean
  menu: MenuState; setMenu: (menu: MenuState) => void
}) {
  const value = useFlowOption('nudges', option.id, option.default)
  const label = option.values.find((o) => o.value === value)?.label ?? value
  const open = menu?.option.id === option.id
  return <button type="button" className={styles.chip} data-wide={wide ? '' : undefined} data-open={open ? '' : undefined}
    aria-haspopup="listbox" aria-expanded={open} aria-label={`${option.label}: ${label}`}
    onClick={(e) => setMenu(open ? null : { option, chip: e.currentTarget })}>
    <span className={styles.value}>{short(value, label)}</span>
    <Icon icon={msKeyboardArrowDown} size={16} />
  </button>
}

/** The open dropdown: every value by its full name, the picked one ticked. Under its pill (above it when there's no
 *  room), kept inside the screen; a tap outside or Escape closes it. */
function Menu({ option, chip, host, onClose }: { option: Option; chip: HTMLElement; host: HTMLElement; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null)
  const value = useFlowOption('nudges', option.id, option.default)
  const [spot, setSpot] = useState<{ left: number; top: number; maxHeight: number } | null>(null)

  useLayoutEffect(() => {
    const origin = host.getBoundingClientRect()
    const scale = origin.width / host.clientWidth || 1
    const at = chip.getBoundingClientRect()
    const gap = 8
    const width = box.current?.offsetWidth ?? 0
    const left = Math.min(Math.max(gap, (at.left - origin.left) / scale), host.clientWidth - width - gap)
    const below = (at.bottom - origin.top) / scale + gap
    const above = (at.top - origin.top) / scale - gap
    const roomBelow = host.clientHeight - below - gap
    const height = box.current?.scrollHeight ?? 0
    setSpot(height <= roomBelow || roomBelow >= above
      ? { left, top: below, maxHeight: roomBelow }
      : { left, top: Math.max(gap, above - height), maxHeight: above - gap })
  }, [chip, host])

  useEffect(() => {
    const away = (e: Event) => {
      const target = e.target as Node
      if (!box.current?.contains(target) && !chip.contains(target)) onClose()
    }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('pointerdown', away)
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', key) }
  }, [chip, onClose])

  return createPortal(<div ref={box} className={styles.menu} role="listbox" aria-label={option.label}
    style={spot ?? { visibility: 'hidden' }}>
    <div className={styles.menuTitle}>{option.label}</div>
    {option.values.map((o) => {
      const picked = o.value === value
      return <button key={o.value} type="button" role="option" aria-selected={picked} className={styles.item}
        data-picked={picked ? '' : undefined}
        onClick={() => { setFlowOption('nudges', option.id, option.default, o.value); onClose() }}>
        <span className={styles.itemLabel}>{o.label}</span>
        {picked && <Icon icon={msCheck} size={16} />}
      </button>
    })}
  </div>, host)
}
```

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
  "nudge.setPnl": "Set a loss limit for today",
  "nudge.storyPrimary": "Place an order with an SL limit",
  "nudge.storyNotNow": "Place without limit",
  "nudge.setTpsl": "Add TP/SL to this order",
  "nudge.notNow": "Not now, place order",
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
  "option.case": "Case",
  "option.state": "Data state",
  "option.stateA": "A · own loss",
  "option.stateB": "B · own, no loss",
  "option.stateC": "C · thin history",
  "option.everyBuy": "Show on every Buy",
  "option.everyBuyOff": "Off",
  "option.everyBuyOn": "On",
  "option.vibrate": "Vibrate when it opens",
  "switcher.label": "Prototype: switch the nudge",
  "switcher.drag": "Drag to move",
  "switcher.layout": "Layout {n}",
  "switcher.state": "State {state}",
  "option.actions": "Buttons",
  "option.actionsTwo": "Both guardrails",
  "option.actionsOne": "One guardrail",
  "nudge.tag": "Overtrading Detected",
  "nudge.lastLoss": "Last time you did this, you lost {amount}",
  "nudge.others": "{count} in 10 traders who did this lost more by the end of the day",
  "nudge.othersOtherDays": "{count} in 10 traders who did this lost more than on other days",
  "nudge.notNowPositions": "Not now",
  "nudge.barsLabel": "{now}: {ratio}× {base}",
  "nudge.usual": "Usual",
    "nudge.vsUsual": "vs your usual",
  "nudge.highRisk": "High risk",
  "nudge.zoneSafe": "Safe",
  "nudge.zoneDanger": "Danger",
  "nudge.zoneLow": "Low risk zone",
  "nudge.zoneHigh": "High risk zone",
  "nudge.zoneHeadline": "Overtrading, you just entered the high risk zone",
  "nudge.overtrading": "You're overtrading",
  "nudge.overtradingRisk": "Your chances of losing money are high",
  "nudge.everyone": "Everyone",
  "nudge.you": "You",
  "nudge.safeZone": "Safe zone",
  "nudge.dangerZone": "Danger zone",
  "nudge.safeZoneNote": "trading to plan",
  "nudge.dangerZoneNote": "chasing losses",
  "nudge.lossChance": "High chance of losing money",
  "nudge.meterLabel": "Risk meter: you are in the danger zone",
  "nudge.meterLabelRatio": "Risk meter: you are in the danger zone, {ratio}X your usual",
  "case.generic.name": "Generic",
  "case.generic.headline": "Down ₹2,500 today and still trading",
  "case.sizeUp.name": "1 · Size-up after a loss",
  "case.sizeUp.headline": "This order is 2X the one you just lost",
  "case.sizeUp.base": "Trade you lost",
  "case.sizeUp.now": "This order",
  "case.sizeUp.unit": "bigger than the trade you just lost",
  "case.orders.name": "2 · Orders in the session",
  "case.orders.headline": "3X more orders than usual today",
  "case.orders.raw": "14 orders today",
  "case.orders.base": "Your usual day",
  "case.orders.now": "Today",
  "case.orders.unit": "more orders than usual today",
  "case.flips.name": "3 · CE ↔ PE flips",
  "case.flips.headline": "Switched calls ↔ puts 3X more than usual",
  "case.flips.raw": "Switched calls ↔ puts 6 times today",
  "case.flips.base": "Your usual day",
  "case.flips.now": "Today",
  "case.flips.unit": "more call ↔ put switches than usual",
  "case.burst.name": "4 · Orders in 15 min",
  "case.burst.headline": "4X more orders than usual in 15 min",
  "case.burst.raw": "9 orders in the last 15 min",
  "case.burst.base": "Usual 15 min",
  "case.burst.now": "Last 15 min",
  "case.burst.unit": "more orders than usual in 15 min",
  "case.money15.name": "5 · Money in 15 min",
  "case.money15.headline": "3X more money than usual in 15 min",
  "case.money15.raw": "₹48,000 put in, in 15 min",
  "case.money15.base": "Usual 15 min",
  "case.money15.now": "Last 15 min",
  "case.money15.unit": "more money than usual in 15 min",
  "case.bigOrder.name": "6 · Big order vs money",
  "case.bigOrder.headline": "This order is 4X your usual size",
  "case.bigOrder.raw": "This order uses 60% of your money",
  "case.bigOrder.base": "Your usual order",
  "case.bigOrder.now": "This order",
  "case.bigOrder.unit": "your usual order size",
  "case.pace.name": "7 · Time between orders",
  "case.pace.headline": "Ordering 6X faster than usual",
  "case.pace.raw": "40 seconds between orders",
  "case.pace.base": "Your usual pace",
  "case.pace.now": "Now",
  "case.pace.unit": "faster than your usual pace",
  "case.strike.name": "8 · Far strike",
  "case.strike.headline": "Strike 10X farther than usual",
  "case.strike.raw": "Strike 1,200 points from NIFTY",
  "case.strike.base": "Your usual strike",
  "case.strike.now": "This strike",
  "case.strike.unit": "farther than your usual strike",
  "case.avgDown.name": "9 · Averaging down",
  "case.avgDown.headline": "Bought more 3 times while it fell",
  "case.rareSession.name": "10 · Unusual time",
  "case.rareSession.headline": "Trading at a time you rarely trade",
  "case.expiry.name": "Moment · Expiry, recovering",
  "case.expiry.headline": "3X more trades than usual, on expiry",
  "case.expiry.raw": "12 trades today, on expiry",
  "case.expiry.base": "Your usual day",
  "case.expiry.now": "Today",
  "case.expiry.unit": "more trades than usual, on expiry",
  "case.deposit.name": "Moment · Bigger deposit",
  "case.deposit.headline": "Added 5X more money than usual",
  "case.deposit.raw": "Added ₹20,000 today",
  "case.deposit.base": "Your usual top-up",
  "case.deposit.now": "Today",
  "case.deposit.unit": "more money added than usual",
  "case.givingBack.name": "Moment · Giving back profit",
  "case.givingBack.headline": "Gave back 79% of today's profit",
  "case.fomo.name": "Moment · Missed entry",
  "case.fomo.headline": "Buying after it already rose 38%",
  "case.returnBreak.name": "Moment · Back after a break",
  "case.returnBreak.headline": "3X your usual size, after a break",
  "case.returnBreak.raw": "First trade in 23 days, and a big one",
  "case.returnBreak.base": "Your usual order",
  "case.returnBreak.now": "This order",
  "case.returnBreak.unit": "your usual size, after a break",
  "case.afterWin.name": "Moment · After a winning day",
  "case.afterWin.headline": "2X your usual size, after a win",
  "case.afterWin.raw": "Big order the day after a ₹6,200 win",
  "case.afterWin.base": "Your usual order",
  "case.afterWin.now": "This order",
  "case.afterWin.unit": "your usual size, after a win",
  "option.layout": "Layout",
  "option.layoutBars": "1 · Centred + bars",
  "option.layoutNumber": "2 · Big number",
  "option.layoutCompact": "3 · Compact alert",
  "option.layoutGauge": "4 · Risk meter",
  "option.zoneRisk": "5a · High risk",
  "option.zoneEveryone": "5b · Everyone vs you",
  "option.zoneExplain": "5c · Why first",
  "option.zoneStory": "5d · Story",
  "option.layoutZone": "5 · Risk bar",
  "option.badge": "Layout 1 header",
  "option.badgeChip": "Chip (✋ in the tag)",
  "option.badgeTag": "Icon + tag",
  "switcher.badgeChip": "Chip",
  "switcher.badgeTag": "Tag"
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
 * - A: enough history, and the last time he did this he lost → the consequence is his own loss.
 * - B: enough history, the last time didn't lose → the consequence is what happened to other traders.
 * - C: thin history (no "usual" yet) → the headline is today's raw fact, no bars; the consequence as in B.
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
  /** Where it fires: on the order pad (as he taps Buy / Sell) or on Positions (no order in hand). */
  where: 'order' | 'positions'
  /** The guardrail on the main button. */
  primary: Guardrail
  /** Today vs his usual (or vs the trade he lost), drawn as two bars. None = the fact isn't a multiple. */
  ratio?: number
  /** Traders who did this and lost more by the end of the day (%). None = not measured → no group line. */
  othersLostMore?: number
  /** State A: what he lost the last time he did this (₹). None = the case has no own-history version. */
  lastLoss?: number
  /** The group line compares with the same traders' other days, not the end of the day. */
  othersVs?: 'otherDays'
}

/** The 17 cases, values from the product team's compare file (2026-11-01). */
export const nudgeCases: NudgeCase[] = [
  { id: 'generic', kind: 'generic', where: 'positions', primary: 'pnl', othersLostMore: 67 },
  { id: 'sizeUp', kind: 'revenge', where: 'order', primary: 'pnl', ratio: 2, othersLostMore: 69, lastLoss: 2900 },
  { id: 'orders', kind: 'revenge', where: 'order', primary: 'pnl', ratio: 3, othersLostMore: 68, lastLoss: 3600 },
  { id: 'flips', kind: 'revenge', where: 'order', primary: 'pnl', ratio: 3, othersLostMore: 69, lastLoss: 3400 },
  { id: 'burst', kind: 'revenge', where: 'order', primary: 'pnl', ratio: 4, othersLostMore: 68, lastLoss: 4800 },
  { id: 'money15', kind: 'revenge', where: 'order', primary: 'pnl', ratio: 3, othersLostMore: 68, lastLoss: 6100 },
  { id: 'bigOrder', kind: 'revenge', where: 'order', primary: 'tpsl', ratio: 4, othersLostMore: 66, lastLoss: 5200 },
  { id: 'pace', kind: 'revenge', where: 'order', primary: 'pnl', ratio: 6, othersLostMore: 70, lastLoss: 2500 },
  { id: 'strike', kind: 'revenge', where: 'order', primary: 'tpsl', ratio: 10, othersLostMore: 72, lastLoss: 1700 },
  { id: 'avgDown', kind: 'revenge', where: 'order', primary: 'tpsl', othersLostMore: 66, lastLoss: 3900 },
  { id: 'rareSession', kind: 'revenge', where: 'order', primary: 'pnl', othersLostMore: 67, lastLoss: 2200 },
  { id: 'expiry', kind: 'moment', where: 'positions', primary: 'pnl', ratio: 3, othersLostMore: 66, lastLoss: 6800 },
  { id: 'deposit', kind: 'moment', where: 'order', primary: 'pnl', ratio: 5, lastLoss: 4100 },
  { id: 'givingBack', kind: 'moment', where: 'positions', primary: 'pnl', lastLoss: 2300 },
  { id: 'fomo', kind: 'moment', where: 'order', primary: 'tpsl', lastLoss: 1800 },
  { id: 'returnBreak', kind: 'moment', where: 'order', primary: 'pnl', ratio: 3, lastLoss: 9800 },
  { id: 'afterWin', kind: 'moment', where: 'order', primary: 'tpsl', ratio: 2, othersLostMore: 60, lastLoss: 2700, othersVs: 'otherDays' },
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
import { lossNearLimit } from './data'
import { nudgeOptions } from './options'
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
  options: nudgeOptions,
  screens: [
    { id: 'nudges-01', name: 'Order pad · silent help', figma: '8671:18433', note: 'The default — no interruption. The F&O commodity order pad (fno-25) as it is, plus silent help: “Set TPSL” becomes a TP/SL row, pre-filled and on (Target +20% · Stop-loss −10%); “Set a loss limit for today” is the first line of the dock. Buy fires the nudge picked in the settings (Case, Data state), once: the shared cap is 1 per session.', render: (go) => <OrderPad nudge="options" onBack={back(go)} /> },
    { id: 'nudges-02', name: 'Nudge · from settings', figma: '', note: 'The one nudge sheet, filled by the case and data state picked in the settings. Try all 17 cases × A / B / C and the draft’s two guardrail buttons.', render: (go) => <OrderPad nudge="options" initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-03', name: 'Nudge · generic', figma: '', note: 'Fires on Positions with the revenge flag when no single behaviour stands out, or the trader is too new to compare (state D). No bars; the group line. Dismiss says just “Not now” (no order in hand).', render: (go) => <OrderPad nudge={{ caseId: 'generic', state: 'B' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-04', name: 'Nudge · size-up · A (own loss)', figma: '', note: 'Bars: this order vs the trade he lost (2X). Enough history and his last size-up lost: the line is his own loss, on a red strip.', render: (go) => <OrderPad nudge={{ caseId: 'sizeUp', state: 'A' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-05', name: 'Nudge · orders today · B', figma: '', note: 'Bars: his usual day vs today (3X). Last time didn’t lose: the line is the group (7 in 10 lost more).', render: (go) => <OrderPad nudge={{ caseId: 'orders', state: 'B' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-06', name: 'Nudge · orders today · C (thin history)', figma: '', note: 'Too few past sessions for “your usual”: the headline becomes today’s raw fact (“14 orders today”), no bars.', render: (go) => <OrderPad nudge={{ caseId: 'orders', state: 'C' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-07', name: 'Nudge · averaging down (TP/SL first)', figma: '', note: 'A case whose main button is TP/SL and whose fact isn’t a multiple: no bars: headline + the group line.', render: (go) => <OrderPad nudge={{ caseId: 'avgDown', state: 'B' }} initialSheet="nudge" onBack={back(go)} /> },
    { id: 'nudges-08', name: 'Set today’s loss limit', figma: '', note: 'From the nudge’s “Set a loss limit for today” or the order pad dock. Pre-filled ₹25,000, quick amounts as pill tabs. Set limit → back to the pad with the limit shown.', render: (go) => <OrderPad nudge={{ caseId: 'sizeUp', state: 'A' }} initialSheet="pnl" onBack={back(go)} /> },
    { id: 'nudges-09', name: 'TP/SL for this order', figma: '', note: 'From the nudge’s “Add TP/SL to this order” or the TP/SL row. Target and stop-loss in %, the exit price under each.', render: (go) => <OrderPad nudge={{ caseId: 'avgDown', state: 'B' }} initialSheet="tpsl" onBack={back(go)} /> },
    { id: 'nudges-10', name: 'Order pad · limit set', figma: '', note: 'Silent help once a limit exists: “₹25,000 left of today’s loss limit” with a bar in the dock (tap to change it).', render: (go) => <OrderPad limit={25000} onBack={back(go)} /> },
    { id: 'nudges-11', name: 'Order pad · close to the limit', figma: '', note: '₹21,000 of ₹25,000 used: the bar and the line turn warning. Still no interruption.', render: (go) => <OrderPad limit={25000} loss={lossNearLimit} onBack={back(go)} /> },
  ],
}
```

### `src/flows/nudges/options.ts`

```ts
import { t } from './copy'
import { nudgeCases } from './data'

type Key = Parameters<typeof t>[0]
const onOff = [{ value: 'off', label: t('option.everyBuyOff') }, { value: 'on', label: t('option.everyBuyOn') }]

/**
 * PROTOTYPE ONLY: the flow's settings (preview panel / phone settings sheet) and, for the three that change the sheet,
 * the floating switcher over the open nudge (components/SheetSwitcher). A real app ships one version.
 */
// Size-up after a loss is the default and heads the list.
export const caseOption = { id: 'case', group: 'Nudge', label: t('option.case'), picker: 'dropdown' as const, values: [...nudgeCases].sort((a, b) => Number(b.id === 'sizeUp') - Number(a.id === 'sizeUp')).map((c) => ({ value: c.id, label: t(`case.${c.id}.name` as Key) })), default: 'sizeUp' }
export const stateOption = { id: 'state', group: 'Nudge', label: t('option.state'), picker: 'dropdown' as const, values: [{ value: 'A', label: t('option.stateA') }, { value: 'B', label: t('option.stateB') }, { value: 'C', label: t('option.stateC') }], default: 'A' }
export const layoutOption = { id: 'layout', group: 'Nudge', label: t('option.layout'), picker: 'dropdown' as const, values: [{ value: 'bars', label: t('option.layoutBars') }, { value: 'number', label: t('option.layoutNumber') }, { value: 'compact', label: t('option.layoutCompact') }, { value: 'gauge', label: t('option.layoutGauge') }, { value: 'zone', label: t('option.layoutZone') }], default: 'zone' }

/**
 * Layout 5 only: its versions, picked with the same Case setting (no setting of its own). 'sizeUp' (the default case)
 * is the High risk bar; 'everyone', 'explain' and 'story' (not cases of the other layouts) are the Everyone vs You bar, that
 * bar under a centred "You're overtrading" header (5c), and 5c played as a short story (5d). The Case pill shows these
 * on Layout 5.
 */
export type ZoneVersion = 'risk' | 'everyone' | 'explain' | 'story'
export const zoneCaseOption = { ...caseOption, values: [{ value: 'sizeUp', label: t('option.zoneRisk') }, { value: 'everyone', label: t('option.zoneEveryone') }, { value: 'explain', label: t('option.zoneExplain') }, { value: 'story', label: t('option.zoneStory') }] }
export const zoneVersion = (caseValue: string): ZoneVersion => caseValue === 'everyone' || caseValue === 'explain' || caseValue === 'story' ? caseValue : 'risk'

/** Layout 1 only: the ✋ circle with the tag under it, or one chip (✋ inside the tag). */
export const badgeOption = { id: 'badge', group: 'Nudge', label: t('option.badge'), picker: 'dropdown' as const, values: [{ value: 'chip', label: t('option.badgeChip') }, { value: 'tag', label: t('option.badgeTag') }], default: 'chip' }

export const nudgeOptions = [
  caseOption,
  stateOption,
  layoutOption,
  badgeOption,
  { id: 'everyBuy', group: 'Nudge', label: t('option.everyBuy'), picker: 'toggle' as const, values: onOff, default: 'on' },
  { id: 'vibrate', group: 'Nudge', label: t('option.vibrate'), picker: 'toggle' as const, values: onOff, default: 'on' },
  { id: 'actions', group: 'Nudge', label: t('option.actions'), values: [{ value: 'one', label: t('option.actionsOne') }, { value: 'two', label: t('option.actionsTwo') }], default: 'one' },
]
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
import { layoutOption, zoneVersion } from '../options'
import { defaultLimit, funds, intradayCloseTime, lossToday, orderContract, prefilledTpsl, sellMargin, validities, type DataState, type NudgeCaseId, type OrderProduct, type OrderSide, type OrderType } from '../data'
import { LossLimitSheet, TpslSheet } from '../sheets/GuardrailSheets'
import { NudgeSheet, type NudgeBadge, type NudgeLayout } from '../sheets/NudgeSheet'
import { SheetSwitcher } from '../components/SheetSwitcher'
import styles from './OrderPad.module.css'

/** Layout 5's one version: size-up after a loss ("This order is 2X the one you just lost"). */
const ZONE_NUDGE: { caseId: NudgeCaseId; state: DataState } = { caseId: 'sizeUp', state: 'A' }

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
  const caseValue = useFlowOption('nudges', 'case', 'sizeUp')
  // 'everyone' and 'explain' are Layout 5 versions, not cases: the other layouts show the default case for them.
  const optionCase = (zoneVersion(caseValue) !== 'risk' ? 'sizeUp' : caseValue) as NudgeCaseId
  const optionState = useFlowOption('nudges', 'state', 'A') as DataState
  const actions = useFlowOption('nudges', 'actions', 'one') as 'one' | 'two'
  // Prototype setting: fire the nudge on every Buy / Sell instead of once (the real cap is 1 per session).
  const layout = useFlowOption('nudges', layoutOption.id, layoutOption.default) as NudgeLayout
  const badge = useFlowOption('nudges', 'badge', 'chip') as NudgeBadge
  const everyBuy = useFlowOption('nudges', 'everyBuy', 'on') === 'on'
  const vibrate = useFlowOption('nudges', 'vibrate', 'on') === 'on'
  // A screen with a fixed case (03–09) shows it until the case or data state is changed in the settings; from then on
  // it follows the settings too, so the dropdown always changes the sheet that's open.
  const [opened] = useState(`${optionCase}.${optionState}`)
  const changed = `${optionCase}.${optionState}` !== opened
  const picked = nudge === undefined ? undefined
    : nudge === 'options' || changed ? { caseId: optionCase, state: optionState } : nudge
  // Layout 5 is always the size-up case (the other cases were copy tries); the Case pill picks its version instead.
  const fired = picked && layout === 'zone' ? ZONE_NUDGE : picked

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
  const submit = () => { if (fired && (!nudged || everyBuy)) { setNudged(true); setModal({ kind: 'nudge' }) } else place() }

  const sheet = modal?.kind === 'nudge' && fired
    ? <NudgeSheet caseId={fired.caseId} state={fired.state} layout={layout} zoneVersion={zoneVersion(caseValue)} badge={badge} vibrate={vibrate} actions={actions} onGuardrail={(g) => setModal({ kind: g })} onNotNow={place} />
    : modal?.kind === 'pnl'
      ? <LossLimitSheet initial={limit ?? defaultLimit} onClose={() => setModal(null)} onSave={(amount) => { setLimit(amount); setModal(null); setToast(t('pnl.saved', { amount: inr(amount, 0) })) }} />
      : modal?.kind === 'tpsl'
        ? <TpslSheet onClose={() => setModal(null)} onSave={(v) => { setTpsl(v); setTpslOn(true); setModal(null); setToast(t('tpsl.saved')) }} />
        : undefined

  const top = <Actionbar onBack={onBack} backLabel={t('order.back')}
    title={<span className={styles.contract}>
      <span className={styles.contractName}>{c.name}<Icon icon={lmSwitchArrowVertical} size={16} /><span className={styles.expiry}>{c.contract}</span></span>
      <span className={styles.contractPrice}>{inr(c.ltp, 2)}<PriceChange value={c.change} unit="percent" size="sm" /></span>
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
    <SheetSwitcher open={fired !== undefined} />
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

/* 24 above the content, as below it (L3's sheet has 16 on top). Same in NudgeSheet. */
.sheet [data-sheet-content] { padding-top: var(--l3-spacing-24); }
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
  return <Sheet labelledBy={id} onClose={onClose} className={styles.sheet}
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
  return <Sheet labelledBy={id} onClose={onClose} className={styles.sheet}
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

/* Header icon: ✋ in a 64 error circle with a soft ring that pulses twice — the one thing that says "stop, look". */
.icon { position: relative; display: grid; place-items: center; width: var(--l3-size-64); height: var(--l3-size-64); border-radius: var(--l3-radius-full); background: var(--l3-surface-accent-error-light); color: var(--l3-content-accent-error-default); }
.icon::after { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 2px solid currentColor; opacity: 0; animation: pulse calc(var(--l3-motion-duration-long) * 3) var(--l3-motion-easing-decelerate) 2 both; }
@keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.5); opacity: 0; } }

/* Usual vs now: two bars on one scale. Usual is neutral, now is red and grows past it. */
.bars { display: flex; flex-direction: column; gap: var(--l3-spacing-12); margin: 0; }
.row { display: grid; grid-template-columns: var(--l3-size-96) 1fr auto; align-items: center; gap: var(--l3-spacing-12); }
.barLabel { font: var(--l3-text-label-12); color: var(--l3-content-secondary); }
.barValue { min-width: var(--l3-size-32); font: var(--l3-text-heading-14); color: var(--l3-content-secondary); text-align: right; }
.track { display: block; height: var(--l3-size-12); }
.bar { display: block; width: var(--w); height: 100%; border-radius: var(--l3-radius-full); background: var(--l3-content-disabled); animation: grow var(--l3-motion-duration-long) var(--l3-motion-easing-decelerate) both; }
.row[data-now] .barLabel { color: var(--l3-content-primary); }
.row[data-now] .barValue { color: var(--l3-content-accent-error-default); font: var(--l3-text-heading-16); }
.row[data-now] .bar { background: var(--l3-content-accent-error-default); animation-duration: calc(var(--l3-motion-duration-long) * 2); animation-delay: var(--l3-motion-duration-medium); }
@keyframes grow { from { width: 0; } to { width: var(--w); } }

/* The consequence: one line, icon + text, on a tinted strip. His own loss in error, the group line neutral. */
.consequence { display: flex; align-items: center; gap: var(--l3-spacing-12); margin: 0; padding: var(--l3-spacing-12) var(--l3-spacing-16); border-radius: var(--l3-radius-12); background: var(--l3-surface-secondary); font: var(--l3-text-label-14); color: var(--l3-content-primary); }
.consequence > :first-child { flex: none; color: var(--l3-content-secondary); }
.consequence[data-tone='own'] { background: var(--l3-surface-accent-error-light); }
.consequence[data-tone='own'] > :first-child { color: var(--l3-content-accent-error-default); }

/* 2 · Big number: left-aligned, the multiple as the biggest thing on the sheet. */
.number { padding-top: var(--l3-spacing-08); }
.numberTag { display: inline-flex; align-items: center; gap: var(--l3-spacing-08); color: var(--l3-content-accent-error-default); }
.hero { display: flex; flex-direction: column; gap: var(--l3-spacing-04); margin: 0; }
.heroValue { font: var(--l3-text-heading-36); color: var(--l3-content-accent-error-default); animation: pop var(--l3-motion-duration-long) var(--l3-motion-easing-decelerate) both; transform-origin: left center; }
.heroUnit { font: var(--l3-text-heading-20); color: var(--l3-content-primary); }
.heroText { margin: 0; font: var(--l3-text-heading-24); color: var(--l3-content-primary); }
@keyframes pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }

/* 3 · Compact alert: one red-tinted card — icon, tag, the fact — the shortest sheet. */
.compact { padding-top: var(--l3-spacing-08); }
.alert { display: flex; align-items: center; gap: var(--l3-spacing-12); padding: var(--l3-spacing-16); border: 1px solid var(--l3-content-accent-error-default); border-radius: var(--l3-radius-12); background: var(--l3-surface-accent-error-light); }
.alertIcon { position: relative; flex: none; display: grid; place-items: center; width: var(--l3-size-40); height: var(--l3-size-40); border-radius: var(--l3-radius-full); background: var(--l3-surface-primary); color: var(--l3-content-accent-error-default); }
.alertIcon::after { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 2px solid var(--l3-content-accent-error-default); opacity: 0; animation: pulse calc(var(--l3-motion-duration-long) * 3) var(--l3-motion-easing-decelerate) 2 both; }
.alertText { margin: 0; font: var(--l3-text-heading-18); color: var(--l3-content-primary); }

/* 4 · Risk meter and 5 · Risk bar (the visuals are in RiskVisuals): the fact. */
.riskText { text-align: center; }
.riskHeading { margin: 0; font: var(--l3-text-heading-20); color: var(--l3-content-primary); }

@media (prefers-reduced-motion: reduce) {
  .icon::after, .bar, .heroValue, .alertIcon::after, .chip, .chipLabel { animation: none; }
}

/* 24 above the content, as below it (L3's sheet has 16 on top). Same in GuardrailSheets. */
.sheet [data-sheet-content] { padding-top: var(--l3-spacing-24); }
/* Layouts 4 and 5: the meter / bar starts 16 below the sheet's top edge — L3's own 16 top space, no extra padding
   (the picture leads, no header above it). */
.riskSheet [data-sheet-content] { padding-top: 0; }

/* Layout 1 · Chip header: ✋ + "Overtrading Detected" in one big light-red pill, shaped like an L3 pill tab (full radius,
   40 high). Not tappable, so not a Tab; L3 has no static pill (L3 gap).
   On open it pops in as a ✋ circle (40 × 40), then opens to reveal the label — while the bars grow — so it gets noticed.
   The 1px edge is an inset shadow so the closed chip is a true circle. The header's own gap to the heading is 8: the
   16 margin makes it 24 (as the header's 24 above it). */
.chip { display: inline-flex; align-items: center; box-sizing: border-box; height: var(--l3-size-40); min-width: var(--l3-size-40); margin-bottom: var(--l3-spacing-16); padding: 0 var(--l3-spacing-08); border-radius: var(--l3-radius-full); background: var(--l3-surface-accent-error-light); box-shadow: inset 0 0 0 1px var(--l3-border-accent-error-light); color: var(--l3-content-accent-error-default); font: var(--l3-text-label-14); animation: pop var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) both; }
.chipLabel { display: block; overflow: hidden; max-width: calc(var(--l3-size-96) * 2); padding: 0 var(--l3-spacing-08); white-space: nowrap; animation: reveal var(--l3-motion-duration-long) var(--l3-motion-easing-standard) calc(var(--l3-motion-duration-long) + var(--l3-motion-duration-short)) both; }
@keyframes reveal { from { max-width: 0; padding: 0; opacity: 0; } to { opacity: 1; } }

/* A sheet with only a header (no bars, no consequence): L3's lg header has 0 below it, so add the 24 the content
   would have given. */
.bare header[data-size='lg'] { padding-bottom: var(--l3-spacing-24); }

/* 5d · Story: the sheet plays once like a short feature video (≈ 6 s), then waits for a button.
   1 "You're overtrading" stamps in (0.25 s) in the middle of the sheet, a little bigger · 2 "Your chances of losing money are
   high" under it · 3 both rise quickly to the header's place and settle to size (the line from primary to secondary) · 4 the bar plays (the track, Safe zone, Danger zone,
   the green dot, Everyone, the red dot slides, You) · 5 the buttons come in. The beats are shared with RiskBar through --bar-start. */
.storySheet {
  --story-line: calc(var(--l3-motion-duration-long) * 3);
  --story-rise: calc(var(--l3-motion-duration-long) * 6);
  --bar-start: calc(var(--l3-motion-duration-long) * 8);
  --story-dock: calc(var(--l3-motion-duration-long) * 17.5);
}
/* The rise is quick (0.4 s): the beats before it hold the words on screen. */
.storySheet { --story-rise-time: var(--l3-motion-duration-long); }
.storyHeader { animation: storyRise var(--story-rise-time) var(--l3-motion-easing-standard) var(--story-rise) both; }
.storyHeader h2 {
  animation:
    storySlam var(--l3-motion-duration-medium) var(--l3-motion-easing-accelerate) var(--l3-motion-duration-medium) both,
    storySettle var(--story-rise-time) var(--l3-motion-easing-standard) var(--story-rise) both;
}
/* The risk line reads in primary while it's in the middle, and quiets to the header's secondary as it rises. */
.storyHeader p {
  animation:
    storyIn calc(var(--l3-motion-duration-long) * 1.5) var(--l3-motion-easing-decelerate) var(--story-line) both,
    storyQuiet var(--story-rise-time) var(--l3-motion-easing-standard) var(--story-rise) both;
}
/* The dock (the footer after the sheet's bottom space): hidden and untappable until the story ends. */
.storySheet > [data-sheet-space='bottom'] + * { animation: storyIn calc(var(--l3-motion-duration-long) * 1.5) var(--l3-motion-easing-decelerate) var(--story-dock) both; }
/* No drag to dismiss either: L3's BottomSheet still follows the finger when it has nowhere to close to (L3 gap). */
:global([role='dialog']):has(> * > .storySheet), :global([role='dialog']):has(> .storySheet) { transform: none !important; }
@keyframes storyRise { from { transform: translateY(var(--story-drop, 0px)); } }
@keyframes storyIn { from { opacity: 0; visibility: hidden; transform: translateY(var(--l3-spacing-16)); } }
/* "You're overtrading" lands like a stamp, not a fade: it drops in big and fast, hits a touch under size, and snaps. */
@keyframes storySlam {
  0% { opacity: 0; transform: scale(1.6); }
  70% { opacity: 1; transform: scale(0.96); }
  100% { opacity: 1; transform: none; }
}
@keyframes storySettle { from { scale: 1.2; } }
@keyframes storyQuiet { from { color: var(--l3-content-primary); } }
@media (prefers-reduced-motion: reduce) {
  .storyHeader, .storyHeader h2, .storyHeader p, .storySheet > [data-sheet-space='bottom'] + * { animation: none; }
}
```

### `src/flows/nudges/sheets/NudgeSheet.tsx`

```tsx
import { useEffect, useId, useLayoutEffect, type CSSProperties, type ReactNode } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msFrontHandFill, msGroupFill, msTrendingDown } from '@l3/icons/material'
import { inr } from '../../../shared/data/format'
import { Sheet } from '../../../shared/ui/Sheet'
import copy from '../copy.json'
import { t } from '../copy'
import { caseById, type DataState, type Guardrail, type NudgeCaseId } from '../data'
import styles from './NudgeSheet.module.css'
import { RiskBar, RiskMeter } from './RiskVisuals'
import type { ZoneVersion } from '../options'

/**
 * Three layouts of the same content, to compare (prototype setting "Layout"):
 * - bars: centred header (✋ 64, tag, the fact) + usual-vs-now bars + the consequence strip.
 * - number: left-aligned; the multiple as a giant red number ("3X") with its words under it, then the strip.
 * - compact: one red-tinted alert card (✋ 40 + tag + the fact) and the consequence under it — the shortest sheet,
 *   so most of the order pad stays visible.
 * - gauge: a risk meter (half ring safe → danger) whose pointer swings from his usual into the red, then the fact and
 *   the tag. No consequence line: the meter is the message.
 * - zone: the same scale as a flat bar, "Usual" and "You now" pins on it, then the fact and the tag.
 */
export type NudgeLayout = 'bars' | 'number' | 'compact' | 'gauge' | 'zone'
/** Layout 1's header: `tag` = ✋ in a 64 circle with the tag under it · `chip` = no circle, one light-red pill with ✋ on
 *  the left of the label, inside it. */
export type NudgeBadge = 'tag' | 'chip'

export type NudgeSheetProps = {
  caseId: NudgeCaseId
  state: DataState
  layout?: NudgeLayout
  /** Layout 5 only: the High risk bar, the Everyone vs You bar, or that bar under a centred why (5c). */
  zoneVersion?: ZoneVersion
  badge?: NudgeBadge
  /** Buzz the phone once when the sheet opens (two short pulses: "stop, look"). */
  vibrate?: boolean
  /** 'one' (default): the case's guardrail (primary) + Not now (secondary) · 'two': both guardrails + Not now (ghost). */
  actions?: 'one' | 'two'
  onGuardrail: (g: Guardrail) => void
  /** Not now: the order goes ahead (on Positions: just closes). Also a scrim tap, drag down or Esc. */
  onNotNow: () => void
}

type Key = Parameters<typeof t>[0]

/**
 * The overtrading nudge — ONE sheet for every case; a case only fills the slots. It opens on a trader who is mid-order
 * and stressed, so it reads in one glance: ✋ stop → "Overtrading" (what this is) → the fact, number first (why now)
 * → one consequence line (what it costs) → the guardrail, or Not now. One number, one consequence.
 * Motion plays once on open and is off with reduced motion.
 */
export function NudgeSheet({ caseId, state, layout = 'bars', zoneVersion = 'risk', badge = 'chip', vibrate = true, actions = 'one', onGuardrail, onNotNow }: NudgeSheetProps) {
  const id = useId()
  // On open only (switching case or layout keeps the sheet open, so it doesn't buzz again).
  useEffect(() => { if (vibrate) buzz() }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const nudge = caseById.get(caseId)!
  const key = (slot: string) => `case.${caseId}.${slot}` as Key
  const has = (slot: string) => key(slot) in copy

  // C (thin history): no "usual" to compare with → today's raw fact, no multiple.
  const thin = state === 'C' && has('raw')
  const headline = t(key(thin ? 'raw' : 'headline'))
  const ratio = thin ? undefined : nudge.ratio

  // A: his own last loss · otherwise the group line (if measured).
  const own = state === 'A' && nudge.lastLoss !== undefined
  const others = nudge.othersLostMore
  const consequence = own
    ? <Consequence tone="own" icon={msTrendingDown} text={t('nudge.lastLoss', { amount: inr(nudge.lastLoss!, 0) })} />
    : others !== undefined
      ? <Consequence tone="others" icon={msGroupFill} text={t(nudge.othersVs === 'otherDays' ? 'nudge.othersOtherDays' : 'nudge.others', { count: Math.round(others / 10) })} />
      : null

  const other: Guardrail = nudge.primary === 'pnl' ? 'tpsl' : 'pnl'
  const label = (g: Guardrail) => t(g === 'pnl' ? 'nudge.setPnl' : 'nudge.setTpsl')
  const notNow = t(nudge.where === 'positions' ? 'nudge.notNowPositions' : 'nudge.notNow')
  const tag = <Tag size="md" color="error">{t('nudge.tag')}</Tag>

  // 5d · Story: the main action places this order with an SL limit; the other places it without one.
  const story = layout === 'zone' && zoneVersion === 'story'
  const footer = <ButtonGroup aria-label={headline} direction="vertical">
    <Button size="lg" onClick={() => onGuardrail(nudge.primary)}>{story ? t('nudge.storyPrimary') : label(nudge.primary)}</Button>
    {actions === 'two' && <Button size="lg" variant="secondary" onClick={() => onGuardrail(other)}>{label(other)}</Button>}
    <Button size="lg" variant={actions === 'two' ? 'ghost' : 'secondary'} onClick={onNotNow}>{story ? t('nudge.storyNotNow') : notNow}</Button>
  </ButtonGroup>

  let header: ReactNode
  let body: ReactNode
  if (layout === 'number') {
    // 2 · Big number: the multiple is the biggest thing on the sheet; its words sit under it.
    body = <Stack gap="24" className={styles.number}>
      <Stack gap="12">
        <span className={styles.numberTag}><Icon icon={msFrontHandFill} size={20} />{tag}</span>
        {ratio !== undefined && has('unit')
          ? <h2 id={id} className={styles.hero}><span className={styles.heroValue}>{ratio}X</span><span className={styles.heroUnit}>{t(key('unit'))}</span></h2>
          : <h2 id={id} className={styles.heroText}>{headline}</h2>}
      </Stack>
      {consequence}
    </Stack>
  } else if (layout === 'compact') {
    // 3 · Compact alert: one red-tinted card, then the consequence — the shortest sheet.
    body = <Stack gap="12" className={styles.compact}>
      <div className={styles.alert}>
        <span className={styles.alertIcon}><Icon icon={msFrontHandFill} size={20} /></span>
        <Stack gap="04">
          <span>{tag}</span>
          <h2 id={id} className={styles.alertText}>{headline}</h2>
        </Stack>
      </div>
      {consequence}
    </Stack>
  } else if (layout === 'gauge') {
    // 4 · Risk meter: the picture says it first; then one heading (the fact) and the tag under it. Nothing else.
    body = <Stack gap="16" align="center">
      <RiskMeter ratio={ratio} />
      <Stack gap="12" align="center" className={styles.riskText}>
        <h2 id={id} className={styles.riskHeading}>{headline}</h2>
        <Tag size="md" color="error">{t('nudge.tag')}</Tag>
      </Stack>
    </Stack>
  } else if (layout === 'zone' && zoneVersion === 'story') {
    // 5d: the 5c sheet played like a short feature video (see StoryBar): "You're overtrading" in the middle of the
    // sheet, then the risk line, then both rise to the header, the bar plays, and the buttons come last.
    header = <BottomSheetHeader size="lg" headingId={id} heading={t('nudge.overtrading')} description={t('nudge.overtradingRisk')} className={styles.storyHeader} />
    body = <StoryBar headingId={id} ratio={ratio} />
  } else if (layout === 'zone' && zoneVersion === 'explain') {
    // 5c: why it fired, first: L3's big header ("You're overtrading" · "Your chances of losing money are high", generic so
    // it fits any trigger), then the bar in the content slot shows it.
    header = <BottomSheetHeader size="lg" headingId={id} heading={t('nudge.overtrading')} description={t('nudge.overtradingRisk')} />
    body = <RiskBar ratio={ratio} version="explain" />
  } else if (layout === 'zone') {
    // 5a / 5b · Risk bar: the bar, then one heading. Nothing else.
    body = <Stack gap="24">
      <RiskBar ratio={ratio} version={zoneVersion} />
      <h2 id={id} className={styles.riskHeading}>{t('nudge.zoneHeadline')}</h2>
    </Stack>
  } else {
    // 1 · Centred + bars: ✋ circle over the tag, or one chip with ✋ inside it (opens from ✋ alone to show the label).
    header = badge === 'chip'
      ? <BottomSheetHeader size="lg" headingId={id} heading={headline}
        tag={<span className={styles.chip}><Icon icon={msFrontHandFill} size={24} /><span className={styles.chipLabel}>{t('nudge.tag')}</span></span>} />
      : <BottomSheetHeader size="lg" headingId={id} heading={headline} tag={tag}
        icon={<span className={styles.icon}><Icon icon={msFrontHandFill} size={24} /></span>} />
    body = (ratio !== undefined || consequence) && <Stack gap="12">
      {ratio !== undefined && <Bars ratio={ratio} base={t(key('base'))} now={t(key('now'))} />}
      {consequence}
    </Stack>
  }

  // No bars and no consequence (e.g. giving back): the header ends the sheet, so it brings the 24 above the dock itself.
  const bare = !body
  // 5d can't be dismissed: no backdrop tap, drag or Esc — one of the buttons has to be tapped.
  return <Sheet labelledBy={id} onClose={story ? undefined : onNotNow} className={[styles.sheet, bare && styles.bare, (layout === 'gauge' || layout === 'zone') && !header && styles.riskSheet, story && styles.storySheet].filter(Boolean).join(' ')} header={header} footer={footer}>{body}</Sheet>
}

/**
 * 5d's bar. It also sets where the header starts: --story-drop moves the header down to the middle of the sheet (the
 * bar and buttons are still hidden), so "You're overtrading" opens centred and then rises to its place. Layout offsets
 * (not screen rects), so neither the sheet's slide, the header's own move nor the preview's scale gets in; kept up to
 * date while the sheet settles its size.
 */
function StoryBar({ headingId, ratio }: { headingId: string; ratio?: number }) {
  useLayoutEffect(() => {
    const header = document.getElementById(headingId)?.closest('header')
    const surface = header?.parentElement
    if (!header || !surface) return
    const place = () => {
      const top = header.offsetTop - (header.offsetParent === surface ? 0 : surface.offsetTop)
      const drop = surface.offsetHeight / 2 - (top + header.offsetHeight / 2)
      header.style.setProperty('--story-drop', `${Math.max(0, drop)}px`)
    }
    place()
    const watch = new ResizeObserver(place)
    watch.observe(surface)
    return () => watch.disconnect()
  }, [headingId])
  return <RiskBar ratio={ratio} version="story" />
}

/** Two short pulses. In the Lemonn Android app the page calls its native bridge (works without a tap, and uses the
 *  phone's haptics); in a browser, the Vibration API (Android Chrome only, and only right after a tap; iPhone: none). */
const BUZZ = [70, 60, 70]
function buzz() {
  const app = (window as { LemonnApp?: { vibrate?: (pattern: string) => void } }).LemonnApp
  try {
    if (app?.vibrate) app.vibrate(BUZZ.join(','))
    else navigator.vibrate?.(BUZZ)
  } catch { /* no vibration here */ }
}

function Consequence({ tone, icon, text }: { tone: 'own' | 'others'; icon: typeof msGroupFill; text: string }) {
  return <p className={styles.consequence} data-tone={tone}>
    <Icon icon={icon} size={20} />
    <span>{text}</span>
  </p>
}

/** His usual vs now as two bars on one scale: the now bar runs the full width, usual is 1/ratio of it. */
function Bars({ ratio, base, now }: { ratio: number; base: string; now: string }) {
  return <Card className={styles.bars} aria-label={t('nudge.barsLabel', { now, ratio, base })}>
    <div className={styles.row}>
      <span className={styles.barLabel}>{base}</span>
      <span className={styles.track}><span className={styles.bar} style={{ '--w': `${100 / ratio}%` } as CSSProperties} /></span>
      <span className={styles.barValue}>1X</span>
    </div>
    <div className={styles.row} data-now>
      <span className={styles.barLabel}>{now}</span>
      <span className={styles.track}><span className={styles.bar} style={{ '--w': '100%' } as CSSProperties} /></span>
      <span className={styles.barValue}>{ratio}X</span>
    </div>
  </Card>
}
```

### `src/flows/nudges/sheets/RiskVisuals.module.css`

```css
/* Layouts 4 and 5: the risk scale (safe → caution → danger) on L3's success / warning / error accents.
   --risk-at is the marker's place on the scale (0 → 1): it animates from --risk-from (usual) to --risk-to (now),
   overshoots a little into danger and settles. Registered so it can animate; without the animation it rests at
   --risk-to. */
@property --risk-at { syntax: '<number>'; inherits: true; initial-value: 0; }

.meter, .dot { --risk-at: var(--risk-to); }
.meter, .dot[data-tone='now'] {
  animation: travel calc(var(--l3-motion-duration-long) * 3) var(--l3-motion-easing-standard) var(--l3-motion-duration-medium) both;
}
@keyframes travel {
  0% { --risk-at: var(--risk-from); }
  70% { --risk-at: calc(var(--risk-to) + 0.04); }
  85% { --risk-at: calc(var(--risk-to) - 0.01); }
  100% { --risk-at: var(--risk-to); }
}

/* The danger zone pulses twice once the marker has landed: "this is where you are". */
.zone[data-tone='danger'], .segment[data-tone='danger'] {
  animation: alarm calc(var(--l3-motion-duration-long) * 2) var(--l3-motion-easing-standard) calc(var(--l3-motion-duration-long) * 3 + var(--l3-motion-duration-medium) + var(--bar-start, 0ms) + var(--bar-intro, 0ms)) 2 both;
}
@keyframes alarm { 50% { opacity: 0.45; } }

/* ---------- Layout 4 · Risk meter ---------- */
.meter { margin: 0; }
.meterSvg { display: block; width: 100%; height: auto; overflow: visible; }
.zone { fill: none; stroke-linecap: butt; }
.zone[data-tone='safe'] { stroke: var(--l3-surface-accent-success-default); }
.zone[data-tone='caution'] { stroke: var(--l3-surface-accent-warning-default); }
.zone[data-tone='danger'] { stroke: var(--l3-surface-accent-error-default); }

.usualTick { stroke: var(--l3-content-accent-success-default); stroke-width: 3; stroke-linecap: round; }
.usualText { font: var(--l3-text-label-12); fill: var(--l3-content-accent-success-default); }

/* The pointer turns about the ring's centre; it is green on usual and turns red on its way into danger. */
.pointer {
  transform-box: view-box;
  transform-origin: 160px 150px;
  transform: rotate(calc((var(--risk-at) - 0.5) * 180deg));
  fill: var(--l3-content-accent-error-default);
  animation: redden calc(var(--l3-motion-duration-long) * 2) var(--l3-motion-easing-standard) var(--l3-motion-duration-medium) both;
}
.pointer circle { stroke: var(--l3-surface-primary); stroke-width: 3; }
@keyframes redden { from { fill: var(--l3-content-accent-success-default); } }

.meterValue { font: var(--l3-text-heading-36); fill: var(--l3-content-accent-error-default); }
.meterValueText { font: var(--l3-text-heading-24); fill: var(--l3-content-accent-error-default); }
.meterSub { font: var(--l3-text-label-14); fill: var(--l3-content-secondary); }
.endText { font: var(--l3-text-label-12); }
.endText[data-tone='safe'] { fill: var(--l3-content-accent-success-default); }
.endText[data-tone='danger'] { fill: var(--l3-content-accent-error-default); }

/* ---------- Layout 5 · Risk bar ---------- */
.bar { display: flex; flex-direction: column; gap: var(--l3-spacing-08); margin: 0; }

/* A floating tooltip sits above where its dot lands, in its own lane: one line, Heading/16, hugging its text. High risk:
   its arrow is near its right end (24 in), on the dot, so the bubble reaches left over the empty part of the bar.
   Everyone / You: centred on the dot.
   Experiment, not the L3 Tooltip. It waits for the dot to land, then emerges from it (see emerge). */
/* Room above it too: the sheet's content clips, and the tooltip's overshoot (it grows up past full size) and shadow
   reach above its resting box. */
/* --bar-start (set by a sheet that plays the bar later, e.g. 5d's story) holds every beat back. --bar-intro is the
   story's quick lead-in before the usual beats (1 s, a beat every 0.25 s): the track wipes in from the left, "Safe
   zone" then "Danger zone" dissolve in, the green dot grows out of nothing; then Everyone, and the red dot grows out of
   the green one just before it slides. */
.bar { --travel-delay: calc(var(--l3-motion-duration-medium) + var(--bar-start, 0ms) + var(--bar-intro, 0ms)); }
.bar[data-version='story'] { --bar-intro: calc(var(--l3-motion-duration-medium) * 4); }
/* backwards only: once in, nothing clips the dots or the red dot's glow. */
.bar[data-version='story'] .track { animation: trackIn var(--l3-motion-duration-medium) var(--l3-motion-easing-standard) var(--bar-start, 0ms) backwards; }
.bar[data-version='story'] .legend > * { animation: dissolve var(--l3-motion-duration-long) var(--l3-motion-easing-standard) calc(var(--bar-start, 0ms) + var(--l3-motion-duration-medium)) both; }
.bar[data-version='story'] .legend > [data-tone='danger'] { animation-delay: calc(var(--bar-start, 0ms) + var(--l3-motion-duration-medium) * 2); }
.bar[data-version='story'] .dot[data-tone='usual'] { animation: dotIn var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) calc(var(--bar-start, 0ms) + var(--l3-motion-duration-medium) * 3) both; }
.bar[data-version='story'] .dot[data-tone='now'] {
  animation:
    travel calc(var(--l3-motion-duration-long) * 3) var(--l3-motion-easing-standard) var(--travel-delay) both,
    glow calc(var(--l3-motion-duration-long) * 4) var(--l3-motion-easing-decelerate) calc(var(--l3-motion-duration-long) * 3 + var(--travel-delay)) infinite,
    dotIn var(--l3-motion-duration-medium) var(--l3-motion-easing-decelerate) calc(var(--travel-delay) - var(--l3-motion-duration-medium)) both;
}
@keyframes trackIn { from { clip-path: inset(0 100% 0 0); } }
@keyframes dissolve { from { opacity: 0; } }
@keyframes dotIn { from { scale: 0; } }
/* Everyone vs You (5b, 5c): the Everyone tooltip comes first; the red dot sets off as it finishes opening. */
.bar:not([data-version='risk']) { --travel-delay: calc(var(--l3-motion-duration-medium) + var(--l3-motion-duration-long) * 1.5 + var(--bar-start, 0ms) + var(--bar-intro, 0ms)); }

/* The tooltips share one grid cell, so the lane is as tall as one of them. */
.lane { display: grid; align-items: end; justify-items: start; position: relative; padding-top: var(--l3-spacing-12); padding-bottom: calc(var(--l3-spacing-08) + var(--l3-spacing-04)); }
.tip {
  grid-area: 1 / 1;
  position: relative;
  left: calc(var(--risk-to) * 100%);
  --tip-arrow: var(--l3-spacing-24); /* arrow centre, from the bubble's right edge */
  --tip-from: var(--l3-content-accent-error-default); /* the colour of the dot it emerges from */
  --tip-delay: calc(var(--travel-delay) + var(--l3-motion-duration-long) * 2.6); /* as the red dot settles */
  --tip-shift: translateX(calc(-100% + var(--tip-arrow)));
  transform: var(--tip-shift);
  transform-origin: calc(100% - var(--tip-arrow)) calc(100% + var(--l3-size-12) / 2);
  animation: emerge calc(var(--l3-motion-duration-long) * 1.75) var(--l3-motion-easing-standard) var(--tip-delay) both;
  white-space: nowrap;
  padding: var(--l3-spacing-08) var(--l3-spacing-12);
  border-radius: var(--l3-radius-12);
  background: var(--l3-surface-inverted);
  box-shadow: var(--l3-shadow-elevation-medium);
  color: var(--l3-content-inverted);
  font: var(--l3-text-heading-16);
}
.tip[data-align='center'] { --tip-arrow: 50%; }
/* Everyone's tooltip comes out of the green dot, first. */
.tip[data-tone='usual'] { --tip-from: var(--l3-content-accent-success-default); --tip-delay: calc(var(--l3-motion-duration-medium) + var(--bar-start, 0ms) + var(--bar-intro, 0ms)); }
.tip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: calc(100% - var(--tip-arrow));
  width: var(--l3-size-12);
  height: calc(var(--l3-size-12) / 2);
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform: translateX(-50%);
}

/* Emerge from the dot: a small blob in the dot's colour leaves the dot (26 below the arrow's tip: lane bottom 12 + bar gap 8 + half
   the track 6), rises to the arrow spot, then opens into the dark bubble, overshooting a little; the text fades in
   last. Scaled about the arrow's tip (after the bubble's shift onto the dot), so it all comes from one point. */
@keyframes emerge {
  0% { opacity: 0; transform: var(--tip-shift) translateY(calc(var(--l3-spacing-24) + var(--l3-spacing-02))) scale(0.08); background: var(--tip-from); color: transparent; }
  12% { opacity: 1; }
  35% { transform: var(--tip-shift) scale(0.14); background: var(--tip-from); color: transparent; }
  75% { transform: var(--tip-shift) scale(1.04, 1); background: var(--l3-surface-inverted); color: transparent; }
  100% { opacity: 1; transform: var(--tip-shift); background: var(--l3-surface-inverted); color: var(--l3-content-inverted); }
}

/* The track: three zones in one rounded bar; a ringed dot marks each position on it. */
.track { position: relative; display: flex; gap: 2px; height: var(--l3-size-12); }
.segment { display: block; flex-basis: 0; }
.segment:first-of-type { border-radius: var(--l3-radius-full) 0 0 var(--l3-radius-full); }
.segment[data-tone='danger'] { border-radius: 0 var(--l3-radius-full) var(--l3-radius-full) 0; }
.segment[data-tone='safe'] { background: var(--l3-surface-accent-success-default); }
.segment[data-tone='caution'] { background: var(--l3-surface-accent-warning-default); }
.segment[data-tone='danger'] { background: var(--l3-surface-accent-error-default); }
.dot {
  position: absolute;
  top: 50%;
  left: calc(var(--risk-at) * 100%);
  width: var(--l3-size-20);
  height: var(--l3-size-20);
  box-sizing: border-box;
  border: 3px solid var(--l3-surface-primary);
  border-radius: var(--l3-radius-full);
  transform: translate(-50%, -50%);
}
.dot[data-tone='usual'] { background: var(--l3-content-accent-success-default); }
.dot[data-tone='now'] { background: var(--l3-content-accent-error-default); width: var(--l3-size-24); height: var(--l3-size-24); }
/* Once it lands, the red dot keeps glowing like a live indicator: a soft red ring swells out of it and fades, on loop.
   Its own rule so it plays after the slide (travel), not instead of it. */
.dot[data-tone='now'] {
  animation:
    travel calc(var(--l3-motion-duration-long) * 3) var(--l3-motion-easing-standard) var(--travel-delay) both,
    glow calc(var(--l3-motion-duration-long) * 4) var(--l3-motion-easing-decelerate) calc(var(--l3-motion-duration-long) * 3 + var(--travel-delay)) infinite;
}
@keyframes glow {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--l3-content-accent-error-default) 55%, transparent); }
  100% { box-shadow: 0 0 0 var(--l3-spacing-12) color-mix(in srgb, var(--l3-content-accent-error-default) 0%, transparent); }
}

.legend { display: flex; justify-content: space-between; font: var(--l3-text-label-12); }
.legend [data-tone='safe'] { color: var(--l3-content-accent-success-default); }
.legend [data-tone='danger'] { color: var(--l3-content-accent-error-default); }
/* Everyone vs You: each end's zone over what it means. */
.bar:not([data-version='risk']) .legend > span { display: flex; flex-direction: column; gap: var(--l3-spacing-02); }
.bar:not([data-version='risk']) .legend > [data-tone='danger'] { align-items: flex-end; }
.zoneName { font: var(--l3-text-heading-14); }
.zoneNote { font: var(--l3-text-label-14); color: var(--l3-content-secondary); }

@media (prefers-reduced-motion: reduce) {
  .meter, .track, .dot, .dot[data-tone='now'], .tip, .pointer, .zone, .segment { animation: none; }
  .bar[data-version='story'] :is(.legend > *, .track, .dot) { animation: none; }
}
```

### `src/flows/nudges/sheets/RiskVisuals.tsx`

```tsx
import type { CSSProperties } from 'react'
import { t } from '../copy'
import type { ZoneVersion } from '../options'
import styles from './RiskVisuals.module.css'

/**
 * Layouts 4 and 5 show the same scale: risk from safe (left) to danger (right), in three zones.
 * Positions are fractions of the scale (0 → 1). "Usual" (1X) always sits in the middle of the safe zone; "now" lands in
 * the danger zone, further right the bigger the multiple (2X → 0.75, 10X and over → the far end).
 * Both play once on open: the marker starts at usual and moves into danger, overshoots a little and settles; then the
 * danger zone pulses twice. Reduced motion: everything rests at its end.
 */
const SAFE_END = 0.45
const CAUTION_END = 0.65
const USUAL_AT = 0.22
/** Where "now" lands. No multiple (thin history, or a fact that isn't one): well inside danger. */
export function nowAt(ratio?: number) {
  if (ratio === undefined) return 0.8
  return 0.72 + 0.23 * Math.min(1, (ratio - 1) / 9)
}

const zones = [
  { from: 0, to: SAFE_END, tone: 'safe' },
  { from: SAFE_END, to: CAUTION_END, tone: 'caution' },
  { from: CAUTION_END, to: 1, tone: 'danger' },
] as const

const at = (from: number, to: number) => ({ '--risk-from': from, '--risk-to': to } as CSSProperties)

/* ---------- Layout 4 · Risk meter ---------- */

// The meter's drawing, in SVG units: a half ring centred at (CX, CY).
const CX = 160
const CY = 150
const R = 116
const RING = 20
/** Gap between zones, in fractions of the scale. */
const GAP = 0.008

/** The point on a circle of radius r at fraction f of the half ring (0 = left end, 1 = right end). */
function point(f: number, r: number) {
  const a = Math.PI * (1 - f)
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)] as const
}
function arc(from: number, to: number, r = R) {
  const [x1, y1] = point(from, r)
  const [x2, y2] = point(to, r)
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
}

/**
 * A risk meter, not a speedometer: a thick half ring in three zones with no numbers or ticks, so it reads as "where am
 * I" in one glance. The pointer starts on "Usual" (green) and swings into the red, turning red as it goes; the multiple
 * sits in the middle ("3X vs your usual"), or "High risk" when there's no multiple. The ends are labelled Safe · Danger.
 */
export function RiskMeter({ ratio }: { ratio?: number }) {
  const now = nowAt(ratio)
  const usual = point(USUAL_AT, R + RING / 2 + 10)
  const usualLabel = point(USUAL_AT, R + RING / 2 + 18)
  const label = ratio !== undefined ? t('nudge.meterLabelRatio', { ratio }) : t('nudge.meterLabel')
  return <figure className={styles.meter} role="img" aria-label={label} style={at(USUAL_AT, now)}>
    <svg viewBox="0 22 320 174" className={styles.meterSvg} aria-hidden>
      {zones.map((z) => <path key={z.tone} d={arc(z.from + (z.from ? GAP : 0), z.to - (z.to < 1 ? GAP : 0))}
        className={styles.zone} data-tone={z.tone} strokeWidth={RING} />)}
      {/* His usual: a small green notch outside the ring, labelled. */}
      <line x1={point(USUAL_AT, R + RING / 2 + 2)[0]} y1={point(USUAL_AT, R + RING / 2 + 2)[1]} x2={usual[0]} y2={usual[1]} className={styles.usualTick} />
      <text x={usualLabel[0]} y={usualLabel[1]} className={styles.usualText} textAnchor="end">{t('nudge.usual')}</text>
      {/* The pointer: drawn pointing straight up, turned to --risk-at by CSS. */}
      <g className={styles.pointer}>
        <path d={`M ${CX - 8} ${CY - 60} L ${CX} ${CY - R + RING / 2 + 2} L ${CX + 8} ${CY - 60} Z`} />
        <circle cx={CX} cy={CY - 60} r={8} />
      </g>
      <text x={CX} y={CY - 4} className={ratio !== undefined ? styles.meterValue : styles.meterValueText} textAnchor="middle">
        {ratio !== undefined ? `${ratio}X` : t('nudge.highRisk')}
      </text>
      {ratio !== undefined && <text x={CX} y={CY + 18} className={styles.meterSub} textAnchor="middle">{t('nudge.vsUsual')}</text>}
      <text x={CX - R} y={CY + 30} className={styles.endText} data-tone="safe" textAnchor="middle">{t('nudge.zoneSafe')}</text>
      <text x={CX + R} y={CY + 30} className={styles.endText} data-tone="danger" textAnchor="middle">{t('nudge.zoneDanger')}</text>
    </svg>
  </figure>
}

/* ---------- Layout 5 · Risk bar ---------- */

/**
 * The same scale laid flat, straight on the sheet (no card): one track in three zones, labelled under its ends. A red
 * dot slides from the usual spot into the high-risk zone and keeps glowing; floating tooltips sit above the dots in
 * their own space and emerge from them. Two versions (the Case pill on Layout 5):
 * - risk: "High chance of losing money" on the red dot, its arrow near its right end so it reaches left over the bar;
 *   "Low risk zone" · "High risk zone" under the ends.
 * - everyone: a green dot for "Everyone" (its tooltip first), then the red dot slides to "You" (its tooltip next);
 *   "Safe zone / trading to plan" · "Danger zone / chasing losses" under the ends.
 * - explain (5c) / story (5d): the everyone bar with just "Safe zone" · "Danger zone" under the ends; story fades in
 *   and plays at the sheet's --bar-start.
 * Experiment: the tooltips are drawn here, not the L3 Tooltip (which can't follow a moving target or take bigger text).
 */
export function RiskBar({ ratio, version = 'risk' }: { ratio?: number; version?: ZoneVersion }) {
  const now = nowAt(ratio)
  const everyone = version !== 'risk'
  const notes = version === 'everyone'
  const label = ratio !== undefined ? t('nudge.meterLabelRatio', { ratio }) : t('nudge.meterLabel')
  return <div className={styles.bar} data-version={version} role="img" aria-label={label}>
    <div className={styles.lane} aria-hidden>
      {everyone
        ? <>
          <span className={styles.tip} data-tone="usual" data-align="center" style={{ '--risk-to': USUAL_AT } as CSSProperties}>{t('nudge.everyone')}</span>
          <span className={styles.tip} data-tone="now" data-align="center" style={{ '--risk-to': now } as CSSProperties}>{t('nudge.you')}</span>
        </>
        : <span className={styles.tip} data-tone="now" style={{ '--risk-to': now } as CSSProperties}>{t('nudge.lossChance')}</span>}
    </div>
    <div className={styles.track} aria-hidden>
      {zones.map((z) => <span key={z.tone} className={styles.segment} data-tone={z.tone} style={{ flexGrow: z.to - z.from }} />)}
      {everyone && <span className={styles.dot} data-tone="usual" style={{ '--risk-to': USUAL_AT } as CSSProperties} />}
      <span className={styles.dot} data-tone="now" style={at(USUAL_AT, now)} />
    </div>
    <div className={styles.legend} aria-hidden>
      {everyone
        ? <>
          <span data-tone="safe"><span className={styles.zoneName}>{t('nudge.safeZone')}</span>{notes && <span className={styles.zoneNote}>{t('nudge.safeZoneNote')}</span>}</span>
          <span data-tone="danger"><span className={styles.zoneName}>{t('nudge.dangerZone')}</span>{notes && <span className={styles.zoneNote}>{t('nudge.dangerZoneNote')}</span>}</span>
        </>
        : <>
          <span data-tone="safe">{t('nudge.zoneLow')}</span>
          <span data-tone="danger">{t('nudge.zoneHigh')}</span>
        </>}
    </div>
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

/** $ with US grouping: usd(1234.5) → "$1,234.50"; usd(1000, 0) → "$1,000". */
export const usd = (n: number, decimals = 2) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

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
