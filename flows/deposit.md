# Flow: First deposit (`deposit`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Add money over UPI after account setup: amount, UPI app, confirmation, receipt or failure.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/deposit · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/deposit.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `deposit-01` | Add money | [5436:7952](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7952) | `kyc-20`, `deposit-02` | The "+" chips add to the amount. Perks only on the first deposit. |
| `deposit-02` | Approve in UPI app (external) | [5436:7954](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7954) | `deposit-05` | Handoff placeholder: the UPI app’s own payment sheet is not built by Lemonn. |
| `deposit-03` | Confirming payment | [5436:7953](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7953) | — |  |
| `deposit-04` | Money added | [5436:7955](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7955) | `stocks-01` | Start investing → the Stocks home. |
| `deposit-05` | Payment failed | — | `deposit-02`, `deposit-01` | Not in the live screenshots — the failure state the flow needs. |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the Figma links and the screens in this folder — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/deposit · one screen:
  `#/deposit-01`
- **Figma:** [User flow – auth, account setup](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=2103-86)
  (screenshots of the live app, old design system — this flow redesigns them in L3)
- **Status:** ✅ · last updated 2026-10-16
- **Entry:** Account setup → "You're all set" → Add money (`kyc-20`). The same screens are the app's "Add money"
  later, without the first-deposit perks.
- **Exit:** "Start investing" → the app (Stocks)

### Screens

| Id | Screen | Figma | What it shows / when |
|---|---|---|---|
| `deposit-01` | Add money | 5436:7952 | First-deposit perks, amount (₹1,000 default) with "+" chips, the UPI app it's paid from, "Add ₹1,000". |
| `deposit-02` | Approve in UPI app (external) | 5436:7954 | **Handoff placeholder** while the UPI app's own payment sheet is open. Cancel payment. |
| `deposit-03` | Confirming payment | 5436:7953 | Loader while the payment is confirmed with the bank. Moves on by itself. |
| `deposit-04` | Money added | 5436:7955 | "₹1,000 added" + receipt (paid with, reference no. with copy, time). Start investing. |
| `deposit-05` | Payment failed | — | Not in the live screenshots: what happens to the money, Try again / Change payment method. |

### Navigation

```
deposit-01 ─Add ₹X─▶ deposit-02 (UPI app) ─paid─▶ deposit-03 ─auto─▶ deposit-04 ─Start investing─▶ the app
                       └Cancel payment / declined / timed out─▶ deposit-05 ─Try again─▶ deposit-02
                                                                            └Change payment method─▶ deposit-01
deposit-01 ─back─▶ kyc-20
```

### Data

From `src/shared/data/user.ts` (fictional sample user) and `data.ts`:
- `MIN_DEPOSIT` ₹100, `MAX_DEPOSIT` ₹50,00,000 per deposit, `UPI_LIMIT` ₹5,00,000 a day.
- `quickAmounts` [500, 1000, 5000, 10000] — each chip **adds** to the amount; `defaultAmount` ₹1,000.
- `firstDepositPerks[]` — shown only on the first deposit.
- `upiApp` `{ id, name, detail }` — the UPI app and the verified bank it pays from (`HDFC Bank ••7821`).
- `receipt` `{ reference, time }`.
- API: create payment intent (amount, method) → open the UPI app (intent / collect) → poll or webhook for the
  status (success / failed / pending) → receipt.

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar | "Add money" + `onBack` (no back while the UPI app is open) |
| First-deposit perks | Aerobar | `floating`, `placement="inline"`, `type="success"`, celebration icon, heading + paragraph |
| Amount | TextField | numeric, `₹1,000` formatted, `status="error"` + helper below min / above max |
| "+" amounts | Button | `variant="tertiary"`, Large, `fullWidth`, in a 2 × 2 grid |
| Pay with | SectionHeader + ListCell | `variant="card"`, `as="button"`, UPI icon left, chevron right |
| Pay button | ButtonGroup + Button | primary, label repeats the amount ("Add ₹1,000"); off when the amount is invalid |
| Waiting / confirming | Loader + `Intro` (src/shared/ui) | `size="lg"`, centred Heading/24 + description |
| UPI app handoff | `External` (src/shared/ui) | filled Card + "External" Tag + the steps in the UPI app |
| Result art | **Illustration slot** (`Spot`, src/shared/ui) | lg 96 + halo: success / error tone |
| Receipt | KeyValueList + KeyValueRow | `variant="card"`, reference row `copy` |
| Failed buttons | ButtonGroup | vertical: Try again (primary) over Change payment method (secondary) |
| Layout | Section · Stack · Grid (Figma auto-layout frames) | Add money: Section `paddingBlock="24" paddingInline="16" gap="24"` → Stack `gap="12"` per block; "+" amounts Grid `columns={2} gap="08"`. Status screens: Stack `justify="center"` filling the body → Section 24 / 16, `gap="24"` |

### Rules & behaviour

- **Amount:** whole rupees; min ₹100, max ₹50,00,000 per deposit. Outside that → the field's error ("Add at least
  ₹100" / "You can add up to ₹50,00,000 at a time") and the button turns off. Indian grouping (₹1,00,000).
- **"+" chips** add to what's typed (₹1,000 + ₹500 = ₹1,500); they don't replace it.
- **UPI** pays from the verified bank account only (the payment is rejected from any other account). Over ₹5,00,000
  a day → point to net banking (method picker not drawn in this flow).
- **While the UPI app is open** keep the screen alive and poll; coming back without paying → deposit-05 after the
  timeout; "Cancel payment" → deposit-05 straight away.
- **Pending** (bank hasn't confirmed after ~2 min) → treat as processing and notify on completion (not drawn).
- **Failed:** say that nothing was added and that any debited money comes back in 3–5 working days.
- **Money added:** the balance updates at once; the reference number can be copied.

### Differences from Figma

- **Perks** moved from a large banner into an L3 inline success message above the amount.
- **Quick amounts** are "+" chips that add, under the field, instead of fixed amounts.
- **The pay button repeats the amount** ("Add ₹1,000"), so the last thing tapped confirms what's paid.
- **UPI app** (third party) is a handoff placeholder (deposit-02), not a redraw of PhonePe.
- **Payment failed** (deposit-05) is new — the live screenshots had no failure state.
- **Receipt** on the success screen (paid with, reference no., time) instead of a bare "success".
- All customer data in the screenshots was replaced with the fictional sample user.

### L3 gaps

- **Illustrations:** L3 has none for payment results; `Spot` slots stand in (marked `data-illustration-slot`).
- **UPI app logos:** L3 BrandLogo has no UPI apps (PhonePe, Google Pay, Paytm); a generic UPI icon stands in.

### Changelog

- 2026-10-16 — first version (5 screens).
- 2026-10-21 — layout moved from CSS-module classes to the L3 layout blocks (Section, Stack, Grid); nothing moved (measured at 392).


## Source — this flow

### `src/flows/deposit/copy.json`

```json
{
  "addMoney.title": "Add money",
  "addMoney.payLabel": "Pay",
  "addMoney.cta": "Add {amount}",
  "addMoney.perksHeading": "Your first-deposit perks",
  "addMoney.amountLabel": "Amount",
  "addMoney.tooLow": "Add at least {min}",
  "addMoney.tooHigh": "You can add up to {max} at a time",
  "addMoney.range": "Min {min} · Max {max}",
  "addMoney.quickLabel": "Add to amount",
  "addMoney.payWith": "Pay with",
  "addMoney.upi": "UPI · {app}",
  "addMoney.upiLimit": "UPI works up to {limit} a day. For more, choose net banking.",
  "handoff.title": "Add money",
  "handoff.groupLabel": "Payment",
  "handoff.cancel": "Cancel payment",
  "handoff.heading": "Approve {amount} in {app}",
  "handoff.description": "Keep this screen open — we’ll update as soon as you pay",
  "handoff.provider": "{app} · UPI app",
  "handoff.step1": "Pick the bank account (it must be your verified one)",
  "handoff.step2": "Enter your UPI PIN to approve",
  "processing.title": "Confirming your payment",
  "processing.description": "This takes a few seconds",
  "success.groupLabel": "Next",
  "success.cta": "Start investing",
  "success.title": "{amount} added",
  "success.description": "It’s in your Lemonn balance, ready to invest",
  "success.receiptLabel": "Payment receipt",
  "success.paidWith": "Paid with",
  "success.reference": "Reference no.",
  "success.time": "Time",
  "failed.groupLabel": "Try again",
  "failed.retry": "Try again",
  "failed.change": "Change payment method",
  "failed.title": "Payment didn’t go through",
  "failed.description": "If money left your bank, it comes back in 3–5 working days. Nothing was added to Lemonn."
}
```

### `src/flows/deposit/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of Deposit is in copy.json: t('addMoney.title'), t('addMoney.cta', { amount }). */
export const t = makeCopy('deposit', copy)
```

### `src/flows/deposit/data.ts`

```ts
/** First deposit (and any "Add money"). */
export const MIN_DEPOSIT = 100
export const MAX_DEPOSIT = 50_00_000
export const UPI_LIMIT = 5_00_000
export const quickAmounts = [500, 1000, 5000, 10000]
export const defaultAmount = 1000

/** Welcome offer shown on the first deposit (live app copy, reworded). */
export const firstDepositPerks = ['No account maintenance charges for a year', 'Lifetime free demat AMC on your first deposit']

export type PaymentMethod = { id: string; name: string; detail: string }
export const upiApp: PaymentMethod = { id: 'phonepe', name: 'PhonePe', detail: 'HDFC Bank ••7821' }

export const receipt = { reference: 'LMN2410161146', time: '16 Oct 2026, 11:46 AM' }
```

### `src/flows/deposit/index.tsx`

```tsx
import type { Flow } from '../types'
import { AddMoney } from './screens/AddMoney'
import { Failed, Processing, Success, UpiHandoff } from './screens/Payment'

/** First deposit — after Account setup: add money over UPI, confirm, receipt → the app. Also the "Add money" flow. */
export const deposit: Flow = {
  id: 'deposit',
  title: 'First deposit',
  description: 'Add money over UPI after account setup: amount, UPI app, confirmation, receipt or failure.',
  figmaFile: 'sG24GPizTdwbMBxLm0IpTA',
  screens: [
    { id: 'deposit-01', name: 'Add money', figma: '5436:7952', note: 'The "+" chips add to the amount. Perks only on the first deposit.', render: (go) => <AddMoney onBack={() => go('kyc-20')} onPay={() => go('deposit-02')} /> },
    { id: 'deposit-02', name: 'Approve in UPI app (external)', figma: '5436:7954', note: 'Handoff placeholder: the UPI app’s own payment sheet is not built by Lemonn.', render: (go) => <UpiHandoff next="deposit-03" onCancel={() => go('deposit-05')} /> },
    { id: 'deposit-03', name: 'Confirming payment', figma: '5436:7953', render: () => <Processing next="deposit-04" /> },
    { id: 'deposit-04', name: 'Money added', figma: '5436:7955', note: 'Start investing → the Stocks home.', render: (go) => <Success onStart={() => go('stocks-01')} /> },
    { id: 'deposit-05', name: 'Payment failed', figma: '', note: 'Not in the live screenshots — the failure state the flow needs.', render: (go) => <Failed onRetry={() => go('deposit-02')} onChange={() => go('deposit-01')} /> },
  ],
}
```

### `src/flows/deposit/screens/AddMoney.tsx`

```tsx
import { useState } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Aerobar } from '@l3/components/Aerobar'
import { Button } from '@l3/components/Button'
import { Grid } from '@l3/components/Grid'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { Section } from '@l3/components/Section'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { TextField } from '@l3/components/TextField'
import { msCelebration, msChevronRight, msUpiPay } from '@l3/icons/material'
import { inr } from '../../../shared/data/format'
import { Screen } from '../../../shared/ui/Screen'
import { defaultAmount, firstDepositPerks, MAX_DEPOSIT, MIN_DEPOSIT, quickAmounts, UPI_LIMIT, upiApp } from '../data'
import { t } from '../copy'
import styles from './Deposit.module.css'

/**
 * deposit-01 · Add money: amount (quick "+" chips add to it), the first-deposit perks, the UPI app it's paid from.
 * The button repeats the amount. Below ₹100 or above the limit → the field's error and the button turns off.
 */
export function AddMoney({ first = true, onBack, onPay, onMethod }: { first?: boolean; onBack?: () => void; onPay?: () => void; onMethod?: () => void }) {
  const [amount, setAmount] = useState(defaultAmount)
  const tooLow = amount < MIN_DEPOSIT
  const tooHigh = amount > MAX_DEPOSIT
  return (
    <Screen
      top={<Actionbar title={t('addMoney.title')} onBack={onBack} />}
      bottom={<ButtonGroup aria-label={t('addMoney.payLabel')}><Button disabled={tooLow || tooHigh} onClick={onPay}>{t('addMoney.cta', { amount: inr(amount, 0) })}</Button></ButtonGroup>}
    >
      <Section paddingBlock="24" paddingInline="16" gap="24">
        {first && (
          <Aerobar floating placement="inline" type="success" icon={<Icon icon={msCelebration} />} heading={t('addMoney.perksHeading')} paragraph={firstDepositPerks.join(' · ')} />
        )}
        <Stack as="section" gap="12">
          <TextField
            label={t('addMoney.amountLabel')}
            inputMode="numeric"
            value={inr(amount, 0)}
            onChange={(e) => setAmount(Number(e.target.value.replace(/[^\d]/g, '')) || 0)}
            status={tooLow || tooHigh ? 'error' : undefined}
            helperText={tooLow ? t('addMoney.tooLow', { min: inr(MIN_DEPOSIT, 0) }) : tooHigh ? t('addMoney.tooHigh', { max: inr(MAX_DEPOSIT, 0) }) : t('addMoney.range', { min: inr(MIN_DEPOSIT, 0), max: inr(MAX_DEPOSIT, 0) })}
          />
          <Grid columns={2} gap="08" role="group" aria-label={t('addMoney.quickLabel')}>
            {quickAmounts.map((q) => (
              <Button key={q} variant="tertiary" fullWidth onClick={() => setAmount((a) => a + q)}>+{inr(q, 0)}</Button>
            ))}
          </Grid>
        </Stack>
        <Stack as="section" gap="12">
          <SectionHeader title={t('addMoney.payWith')} />
          <ListCell variant="card" as="button" iconLeft={<Icon icon={msUpiPay} />} label={t('addMoney.upi', { app: upiApp.name })} description={upiApp.detail} iconRight={<Icon icon={msChevronRight} />} onClick={onMethod} />
          <p className={styles.fine}>{t('addMoney.upiLimit', { limit: inr(UPI_LIMIT, 0) })}</p>
        </Stack>
      </Section>
    </Screen>
  )
}
```

### `src/flows/deposit/screens/Deposit.module.css`

```css
/* Deposit screens: layout is L3 Stack / Section / Grid; only what those blocks don't cover lives here. */

/* The centred status screens: the Stack fills the body so justify="center" centres the Section vertically. */
.fill {
  flex: 1;
}

.fine {
  margin: 0;
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}
```

### `src/flows/deposit/screens/Payment.tsx`

```tsx
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { Loader } from '@l3/components/Loader'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { msCheckCircle, msError } from '@l3/icons/material'
import { useAutoAdvance } from '../../../shared/prototype'
import { inr } from '../../../shared/data/format'
import { External } from '../../../shared/ui/External'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { Spot } from '../../../shared/ui/Spot'
import { defaultAmount, receipt, upiApp } from '../data'
import { t } from '../copy'
import styles from './Deposit.module.css'

/** deposit-02 · HANDOFF: the payment is approved in the UPI app (not built by Lemonn). */
export function UpiHandoff({ next, onCancel }: { next?: string; onCancel?: () => void }) {
  useAutoAdvance(next, 2800)
  return (
    <Screen
      top={<Actionbar title={t('handoff.title')} />}
      bottom={<ButtonGroup aria-label={t('handoff.groupLabel')}><Button variant="secondary" onClick={onCancel}>{t('handoff.cancel')}</Button></ButtonGroup>}
    >
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Loader size="lg" label={null} />} title={t('handoff.heading', { amount: inr(defaultAmount, 0), app: upiApp.name })} description={t('handoff.description')} />
          <External provider={t('handoff.provider', { app: upiApp.name })} steps={[t('handoff.step1'), t('handoff.step2')]} />
        </Section>
      </Stack>
    </Screen>
  )
}

/** deposit-03 · Confirming the payment with the bank. Moves on by itself. */
export function Processing({ next }: { next?: string }) {
  useAutoAdvance(next, 2000)
  return (
    <Screen>
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Loader size="lg" label={null} />} title={t('processing.title')} description={t('processing.description')} />
        </Section>
      </Stack>
    </Screen>
  )
}

/** deposit-04 · Money added: the receipt, then into the app. */
export function Success({ onStart }: { onStart?: () => void }) {
  return (
    <Screen bottom={<ButtonGroup aria-label={t('success.groupLabel')}><Button onClick={onStart}>{t('success.cta')}</Button></ButtonGroup>}>
      <Stack justify="center" className={styles.fill}>
        <Section style={{ width: '100%' }} paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Spot icon={msCheckCircle} tone="success" />} title={t('success.title', { amount: inr(defaultAmount, 0) })} description={t('success.description')} />
          <KeyValueList variant="card" aria-label={t('success.receiptLabel')}>
            <KeyValueRow label={t('success.paidWith')} value={`${upiApp.name} · ${upiApp.detail}`} />
            <KeyValueRow label={t('success.reference')} value={receipt.reference} copy />
            <KeyValueRow label={t('success.time')} value={receipt.time} />
          </KeyValueList>
        </Section>
      </Stack>
    </Screen>
  )
}

/** deposit-05 · Payment failed or cancelled: what happens to the money, retry or change method. */
export function Failed({ onRetry, onChange }: { onRetry?: () => void; onChange?: () => void }) {
  return (
    <Screen
      bottom={
        <ButtonGroup aria-label={t('failed.groupLabel')}>
          <Button onClick={onRetry}>{t('failed.retry')}</Button>
          <Button variant="secondary" onClick={onChange}>{t('failed.change')}</Button>
        </ButtonGroup>
      }
    >
      <Stack justify="center" className={styles.fill}>
        <Section style={{ width: '100%' }} paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Spot icon={msError} tone="error" />} title={t('failed.title')} description={t('failed.description')} />
        </Section>
      </Stack>
    </Screen>
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

### `src/shared/ui/External.module.css`

```css
/* A step that happens outside Lemonn (account aggregator, UPI app): one labelled card, not a rebuilt page. */
.external {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-08);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--l3-spacing-08);
}

.title {
  font: var(--l3-text-label-14);
}

.list {
  margin: 0;
  padding-left: var(--l3-spacing-16);
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}

.list li + li {
  margin-top: var(--l3-spacing-04);
}
```

### `src/shared/ui/External.tsx`

```tsx
import { Card } from '@l3/components/Card'
import { Tag } from '@l3/components/Tag'
import styles from './External.module.css'

/**
 * HANDOFF PLACEHOLDER — marks a step that runs outside Lemonn (CAMSfinserv's account-aggregator pages, the UPI app).
 * Developers link out to the provider; they don't build these pages. Lists what the user does there.
 */
export function External({ provider, steps }: { provider: string; steps: string[] }) {
  return (
    <Card variant="filled" className={styles.external}>
      <div className={styles.head}>
        <span className={styles.title}>{provider}</span>
        <Tag color="neutral">External</Tag>
      </div>
      <ol className={styles.list}>
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
    </Card>
  )
}
```

### `src/shared/ui/Intro.module.css`

```css
/* A page's opening: optional illustration, headline (Heading/24), supporting line. Left-aligned for forms, centred
 * for moments (welcome, results, loaders). */
.intro {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-08);
  padding: var(--l3-spacing-24) var(--l3-spacing-16) 0;
}

.intro[data-align='center'] {
  align-items: center;
  text-align: center;
}

.art {
  margin-bottom: var(--l3-spacing-24);
}

.title {
  margin: 0;
  font: var(--l3-text-heading-24);
}

.description {
  margin: 0;
  font: var(--l3-text-description-14);
  color: var(--l3-content-secondary);
}
```

### `src/shared/ui/Intro.tsx`

```tsx
import type { ReactNode } from 'react'
import styles from './Intro.module.css'

/**
 * The top of an onboarding / result page: an optional illustration (<Spot>), the page's headline (Heading/24 — the
 * screen's h1, the Actionbar has no title on these pages) and a supporting line. `children` go right under it.
 */
export function Intro({ title, description, art, align = 'start', children }: {
  title: ReactNode
  description?: ReactNode
  art?: ReactNode
  align?: 'start' | 'center'
  children?: ReactNode
}) {
  return (
    <header className={styles.intro} data-align={align}>
      {art && <div className={styles.art}>{art}</div>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </header>
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

### `src/shared/ui/Spot.module.css`

```css
/*
 * Illustration slot: a large icon on a soft accent disc with a faint outer ring. Stands in for artwork L3 doesn't have
 * yet (lemon mascot, PAN card, bank, coin …) — swap the whole <Spot> for the illustration when it exists.
 */
.spot {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: var(--l3-radius-full);
  background: var(--spot-surface);
  color: var(--spot-content);
}

.spot[data-size='md'] {
  width: var(--l3-size-64);
  height: var(--l3-size-64);
}

.spot[data-size='lg'] {
  width: var(--l3-size-96);
  height: var(--l3-size-96);
}

/* The halo: one hairline ring 12 outside the disc, in the same accent (lg only — the hero moments). */
.spot[data-size='lg']::after {
  content: '';
  position: absolute;
  inset: calc(-1 * var(--l3-spacing-12));
  border: 1px solid var(--spot-surface);
  border-radius: var(--l3-radius-full);
}

.glyph {
  width: var(--l3-size-32);
  height: var(--l3-size-32);
}

.spot[data-size='lg'] .glyph {
  width: var(--l3-size-48);
  height: var(--l3-size-48);
}

.spot[data-tone='brand'] { --spot-surface: var(--l3-surface-accent-brand-light); --spot-content: var(--l3-content-primary); }
.spot[data-tone='discover'] { --spot-surface: var(--l3-surface-accent-discover-light); --spot-content: var(--l3-content-accent-discover-default); }
.spot[data-tone='success'] { --spot-surface: var(--l3-surface-accent-success-light); --spot-content: var(--l3-content-accent-success-default); }
.spot[data-tone='warning'] { --spot-surface: var(--l3-surface-accent-warning-light); --spot-content: var(--l3-content-accent-warning-default); }
.spot[data-tone='error'] { --spot-surface: var(--l3-surface-accent-error-light); --spot-content: var(--l3-content-accent-error-default); }
.spot[data-tone='plain'] { --spot-surface: var(--l3-surface-default); --spot-content: var(--l3-content-primary); }
.spot[data-tone='neutral'] { --spot-surface: var(--l3-surface-secondary); --spot-content: var(--l3-content-primary); }
```

### `src/shared/ui/Spot.tsx`

```tsx
import { Icon } from '@l3/components/Icon'
import styles from './Spot.module.css'

export type SpotTone = 'brand' | 'discover' | 'success' | 'warning' | 'error' | 'neutral' | 'plain'

/**
 * ILLUSTRATION SLOT — a large icon on a soft accent disc (md 64 / lg 96 with a halo). Used where the app has artwork
 * (mascot, PAN card, bank, coin) until L3 has an illustration set; replace the <Spot> with the artwork 1:1.
 * Tone by meaning: brand = welcome moments, plain = on a brand panel, discover = info / in progress, success / warning / error = outcomes.
 */
export function Spot({ icon, tone = 'brand', size = 'lg' }: { icon: string; tone?: SpotTone; size?: 'md' | 'lg' }) {
  return (
    <span className={styles.spot} data-tone={tone} data-size={size} aria-hidden="true" data-illustration-slot="">
      <Icon icon={icon} className={styles.glyph} />
    </span>
  )
}
```
