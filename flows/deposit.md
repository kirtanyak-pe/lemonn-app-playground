# Flow: First deposit (`deposit`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `4afbde2` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Add money over UPI after account setup: amount, UPI app, confirmation, receipt or failure.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/deposit · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/deposit.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `deposit-01` | Add money | [5436:7952](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7952) | — | First deposit, ₹1,000 typed. One big amount on the app keypad (L3 has none, drawn locally); "+" chips add to it. Perks only on the first deposit. Groww-style layout, not the busy live screen. |
| `deposit-06` | Add money · empty | — | — | Nothing typed: amount in grey, limits under it, the button is off. |
| `deposit-07` | Add money · below minimum | — | — | ₹50: the line under the amount turns red ("Minimum ₹100"), the button is off. |
| `deposit-08` | Add money · above maximum | — | — | ₹6,00,000: red "Maximum ₹5,00,000 via UPI. Use net banking for more", the button is off. |
| `deposit-09` | Add money · from the wallet | — | — | Opened by Deposit on the INR wallet: no first-deposit perks, ₹1,100.00 available; after the receipt, Done goes back to the wallet. |
| `deposit-10` | Add money · no bank account | — | — | No bank linked (User status → Bank accounts: None): the bank row and the button ask to add one first → Add bank account. |
| `deposit-11` | Add money · change bank | — | — | The bank row (chevron) opens "Pay from": the linked banks as radio rows, picking one closes it; "Add another bank account" → Add bank account. |
| `deposit-12` | Add bank account | — | `deposit-09` | From the bank row or "Pay from" — the ₹ and the US add money both come here. Verify (₹1 name check) goes back to the add money it came from. |
| `deposit-02` | Approve in UPI app (external) | [5436:7954](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7954) | `deposit-05` | Handoff placeholder: the UPI app’s own payment sheet is not built by Lemonn. |
| `deposit-03` | Confirming payment | [5436:7953](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7953) | — |  |
| `deposit-04` | Money added | [5436:7955](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7955) | — | First deposit: Start investing → the Stocks home. Opened from the wallet: Done → the wallet. (The prototype remembers the entry; a screen opened straight from the list assumes the first deposit.) |
| `deposit-05` | Payment failed | — | `deposit-02` | Not in the live screenshots — the failure state the flow needs. Change payment method returns to the Add money screen it came from. |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the Figma links and the screens in this folder — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/deposit · one screen:
  `#/deposit-01`
- **Figma:** [User flow – auth, account setup](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=2103-86)
  (screenshots of the live app, old design system — this flow redesigns them in L3)
- **Status:** ✅ · last updated 2026-11-03
- **Entry:** Account setup → "You're all set" → Add money (`kyc-20`). Or **Deposit** on the INR wallet
  (`us-stocks-53`) → `deposit-09`, the same screen without the first-deposit perks.
- **Exit:** first deposit: "Start investing" → the app (Stocks). From the wallet: "Done" → the wallet.

### Screens

| Id | Screen | Figma | What it shows / when |
|---|---|---|---|
| `deposit-01` | Add money | 5436:7952 | First deposit, ₹1,000 typed. Top bar "Add money" + "₹0.00 available"; big centred amount; limits line; "+" chips; first-deposit perk; UPI app row (Change); keypad; "Add ₹1,000". |
| `deposit-06` | Add money · empty | — | Nothing typed: grey ₹0, limits line, button off. |
| `deposit-07` | Add money · below minimum | — | ₹50: red "Minimum ₹100", button off. |
| `deposit-08` | Add money · above maximum | — | ₹6,00,000: red "Maximum ₹5,00,000 via UPI. Use net banking for more", button off. |
| `deposit-09` | Add money · from the wallet | — | As deposit-01 without the perk, "₹1,100.00 available"; back and Done return to the wallet. |
| `deposit-10` | Add money · no bank account | — | User status → Bank accounts: None. The bank row reads “Add a bank account”; the button is “Add bank account” → deposit-12. |
| `deposit-11` | Add money · change bank | — | The bank row (chevron) opened “Pay from”: linked banks as radio rows (picking one closes it), “Add another bank account” → deposit-12. |
| `deposit-12` | Add bank account | — | Account number ×2 and IFSC (bank + branch found), “we send ₹1 to check it”, Verify account → back to where it came from. |
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
deposit-09 (from the INR wallet, us-stocks-53) ─back─▶ wallet; same payment screens; deposit-04 Done ─▶ wallet
deposit-06 / 07 / 08 are states of deposit-01 (same screen, other amount).
bank row ─tap─▶ Pay from sheet (deposit-11) ─Add another─▶ deposit-12 ─Verify─▶ back
deposit-10 (no bank) ─Add bank account─▶ deposit-12 ─Verify─▶ back
```

### Data

From `src/shared/data/user.ts` (fictional sample user) and `data.ts`:
- `MIN_DEPOSIT` ₹100; `UPI_LIMIT` ₹5,00,000 per deposit (the Max shown with UPI); `MAX_DEPOSIT` ₹50,00,000 (net banking, not drawn).
- `firstBalance` ₹0, `walletBalance` ₹1,100 — the "available" in the top bar.
- `quickAmounts` [500, 1000, 5000, 10000] — each chip **adds** to the amount; `defaultAmount` ₹1,000.
- `firstDepositPerks[]` — shown only on the first deposit.
- `upiApp` `{ id, name, detail }` — the UPI app and the verified bank it pays from (`HDFC Bank ••7821`).
- `receipt` `{ reference, time }`.
- API: create payment intent (amount, method) → open the UPI app (intent / collect) → poll or webhook for the
  status (success / failed / pending) → receipt.

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar | title "Add money" + `description` "₹X available" (left-aligned) + `onBack` (no back while the UPI app is open) |
| Amount + keypad + dock | `AmountEntry`, `AmountDock` (src/shared/ui, shared with US Stocks) | `currency="₹"`, `decimal={false}`; `typeAmount` (whole rupees, max 7 digits) |
| "+" amounts | Button | `variant="tertiary"`, `size="sm"`, `fullWidth`, 4 across in a Grid `columns={4} gap="08"` |
| Pay with | ListCell | plain, `as="button"`, UPI icon left, "Change" as `trailing` |
| Pay button | Button | primary, `fullWidth`, label repeats the amount ("Add ₹1,000"), "Add money" while empty/invalid; off then |
| Perk | Aerobar | `floating`, `placement="inline"`, `type="success"`, heading only |
| Waiting / confirming | Loader + `Intro` (src/shared/ui) | `size="lg"`, centred Heading/24 + description |
| UPI app handoff | `External` (src/shared/ui) | filled Card + "External" Tag + the steps in the UPI app |
| Result art | **Illustration slot** (`Spot`, src/shared/ui) | lg 96 + halo: success / error tone |
| Receipt | KeyValueList + KeyValueRow | `variant="card"`, reference row `copy` |
| Failed buttons | ButtonGroup | vertical: Try again (primary) over Change payment method (secondary) |
| Layout | Section · Stack · Grid (Figma auto-layout frames) | Add money: Section `paddingBlock="24" paddingInline="16" gap="24"` → Stack `gap="12"` per block; "+" amounts Grid `columns={2} gap="08"`. Status screens: Stack `justify="center"` filling the body → Section 24 / 16, `gap="24"` |

### Rules & behaviour

- **Amount:** typed on the app's keypad (no OS keyboard), whole rupees, max 7 digits, Indian grouping (₹1,00,000). Min ₹100;
  max ₹5,00,000 per deposit over UPI. The line under it reads "Min ₹100 · Max ₹5,00,000 via UPI"; below the minimum it turns
  red ("Minimum ₹100"); above the maximum it turns red ("Maximum ₹5,00,000 via UPI. Use net banking for more"). Empty or
  outside the limits → the button is off.
- **"+" chips** (₹500 / ₹1,000 / ₹5,000 / ₹10,000) add to what's typed (₹1,000 + ₹500 = ₹1,500); they don't replace it.
- **UPI** pays from the verified bank account only (the payment is rejected from any other account). Over ₹5,00,000
  → point to net banking (method picker not drawn in this flow).
- **While the UPI app is open** keep the screen alive and poll; coming back without paying → deposit-05 after the
  timeout; "Cancel payment" → deposit-05 straight away.
- **Pending** (bank hasn't confirmed after ~2 min) → treat as processing and notify on completion (not drawn).
- **Failed:** say that nothing was added and that any debited money comes back in 3–5 working days.
- **Money added:** the balance updates at once; the reference number can be copied.

### Differences from Figma

- **One clean add-money screen** (layout of Groww's add-money keypad screen) replaces the live app's busy deposit screen (`references/2026-11-03/wallet/2-deposit-inr.png`): no field box, no UPI/NetBanking limit paragraphs; the limits are one line under the amount. The available balance is the Actionbar description, left-aligned, instead of Groww's centred one.
- **Perks** reduced to one inline success line.
- **Quick amounts** are four small "+" chips that add, under the amount.
- **Max** shown is the UPI limit (₹5,00,000); the net-banking limit is only named in the error.
- The same screen serves the first deposit and the INR wallet's Deposit.
- **The pay button repeats the amount** ("Add ₹1,000"), so the last thing tapped confirms what's paid.
- **UPI app** (third party) is a handoff placeholder (deposit-02), not a redraw of PhonePe.
- **Payment failed** (deposit-05) is new — the live screenshots had no failure state.
- **Receipt** on the success screen (paid with, reference no., time) instead of a bare "success".
- All customer data in the screenshots was replaced with the fictional sample user.

### L3 gaps

- **Illustrations:** L3 has none for payment results; `Spot` slots stand in (marked `data-illustration-slot`).
- **UPI app logos:** L3 BrandLogo has no UPI apps (PhonePe, Google Pay, Paytm); a generic UPI icon stands in.

- **Amount input and number keypad:** L3 has neither; `AmountEntry` / `AmountKeypad` (src/shared/ui) draw them on L3 tokens (flagged there). Needs a design-system component.
- **Plain ListCell in the dock** adds its own 16 side padding inside the dock's 16: a little indented against the hairlines.

- **Bank picker:** `BankRow` / `BankSheet` (src/shared/ui/BankPicker.tsx) are L3 ListCell, Avatar, Radio and the shared Sheet — bank logos come from the company logos (HDFC Bank, ICICI Bank).

### Changelog

- 2026-10-16 — first version (5 screens).
- 2026-10-21 — layout moved from CSS-module classes to the L3 layout blocks (Section, Stack, Grid); nothing moved (measured at 392).
- 2026-11-03 — Add money rebuilt on the shared AmountEntry (Groww-clean, in-app keypad, "+" chips, limits line); states deposit-06 / 07 / 08; deposit-09 opened from the INR wallet, receipt returns there.
- 2026-11-03 — Bank accounts: the bank row shows the bank (logo, ••last 4) with a chevron that opens “Pay from” (change bank, add another); no bank linked → deposit-10; Add bank account (deposit-12). Linked banks come from User status → Bank accounts (None / One / Two).


## Source — this flow

### `src/flows/deposit/copy.json`

```json
{
  "addMoney.title": "Add money",
  "addMoney.cta": "Add {amount}",
  "addMoney.tooLow": "Minimum {min}",
  "addMoney.tooHigh": "Maximum {max} via UPI. Use net banking for more",
  "addMoney.range": "Min {min} · Max {max} via UPI",
  "addMoney.quickLabel": "Add to amount",
  "addMoney.upi": "UPI · {app}",
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
  "failed.description": "If money left your bank, it comes back in 3–5 working days. Nothing was added to Lemonn.",
  "addMoney.available": "{amount} available",
  "addMoney.change": "Change",
  "success.done": "Done",
  "bank.method": "UPI",
  "bank.addTitle": "Add a bank account",
  "bank.addDescription": "Only from an account in your name",
  "bank.sheetTitle": "Pay from",
  "bank.addAnother": "Add another bank account",
  "addMoney.addBankCta": "Add bank account",
  "addBank.screenTitle": "Add bank account",
  "addBank.title": "Add a bank account",
  "addBank.description": "Money you add or withdraw only moves between your own bank accounts and Lemonn",
  "addBank.accountNumber": "Account number",
  "addBank.confirmNumber": "Confirm account number",
  "addBank.ifsc": "IFSC",
  "addBank.ifscFound": "{bank} · {branch}",
  "addBank.note": "We send ₹1 to check the account is in your name. It comes back to you.",
  "addBank.cta": "Verify account",
  "addBank.actionsLabel": "Verify bank account"
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
/** Net banking limit per deposit (not drawn: the method picker isn't part of this flow). */
export const MAX_DEPOSIT = 50_00_000
/** UPI limit per deposit: the Max shown while UPI is the method. */
export const UPI_LIMIT = 5_00_000
export const quickAmounts = [500, 1000, 5000, 10000]
export const defaultAmount = 1000
/** Lemonn balance (₹) before the first deposit, and the INR wallet's balance when add-money is opened from it. */
export const firstBalance = 0
export const walletBalance = 1100

/** Welcome offer shown on the first deposit (live app copy, reworded). */
export const firstDepositPerks = ['No account maintenance charges for a year', 'Lifetime free demat AMC on your first deposit']

export type PaymentMethod = { id: string; name: string; detail: string }
export const upiApp: PaymentMethod = { id: 'phonepe', name: 'PhonePe', detail: 'HDFC Bank ••7821' }

export const receipt = { reference: 'LMN2410161146', time: '16 Oct 2026, 11:46 AM' }

/** The account typed on Add bank account (deposit-12): a second bank, shown filled in. */
export const newBank = { bank: 'State Bank of India', accountNumber: '38291045526', ifsc: 'SBIN0001537', branch: 'Bandra West, Mumbai' }
```

### `src/flows/deposit/index.tsx`

```tsx
import type { Flow, Go } from '../types'
import { AddBank } from './screens/AddBank'
import { AddMoney } from './screens/AddMoney'
import { usePreview } from '../../shared/prototype'
import { Failed, Processing, Success, UpiHandoff } from './screens/Payment'
import { defaultAmount, firstBalance, walletBalance } from './data'
import { t } from './copy'

/** The INR wallet (Wallet · Indian tab) in the US Stocks flow: where "Deposit" there comes from and returns to. */
const WALLET = 'us-stocks-53'

/** Where the add-money being paid was opened from, and how much: the prototype's memory for the screens after it. */
let origin: 'first' | 'wallet' = 'first'
let paying = defaultAmount

/** The Add money screen in one state: `from` decides the perks, the balance, where back goes and where the receipt ends. */
const addMoney = (go: Go, from: 'first' | 'wallet', initial?: string, state: { banksOpen?: boolean; noBank?: boolean } = {}) => (
  <AddMoney
    {...state}
    initial={initial}
    onAddBank={() => go('deposit-12')}
    first={from === 'first'}
    balance={from === 'first' ? firstBalance : walletBalance}
    onBack={() => go(from === 'first' ? 'kyc-20' : WALLET)}
    onPay={(amount) => { origin = from; paying = amount; go('deposit-02') }}
  />
)

/** First deposit — after Account setup: add money over UPI, confirm, receipt → the app. Also the "Add money" flow (from the INR wallet). */
export const deposit: Flow = {
  id: 'deposit',
  title: 'First deposit',
  description: 'Add money over UPI after account setup: amount, UPI app, confirmation, receipt or failure.',
  figmaFile: 'sG24GPizTdwbMBxLm0IpTA',
  screens: [
    { id: 'deposit-01', name: 'Add money', figma: '5436:7952', note: 'First deposit, ₹1,000 typed. One big amount on the app keypad (L3 has none, drawn locally); "+" chips add to it. Perks only on the first deposit. Groww-style layout, not the busy live screen.', render: (go) => addMoney(go, 'first', String(defaultAmount)) },
    { id: 'deposit-06', name: 'Add money · empty', figma: '', note: 'Nothing typed: amount in grey, limits under it, the button is off.', render: (go) => addMoney(go, 'first') },
    { id: 'deposit-07', name: 'Add money · below minimum', figma: '', note: '₹50: the line under the amount turns red ("Minimum ₹100"), the button is off.', render: (go) => addMoney(go, 'first', '50') },
    { id: 'deposit-08', name: 'Add money · above maximum', figma: '', note: '₹6,00,000: red "Maximum ₹5,00,000 via UPI. Use net banking for more", the button is off.', render: (go) => addMoney(go, 'first', '600000') },
    { id: 'deposit-09', name: 'Add money · from the wallet', figma: '', note: 'Opened by Deposit on the INR wallet: no first-deposit perks, ₹1,100.00 available; after the receipt, Done goes back to the wallet.', render: (go) => addMoney(go, 'wallet', String(defaultAmount)) },
    { id: 'deposit-10', name: 'Add money · no bank account', figma: '', note: 'No bank linked (User status → Bank accounts: None): the bank row and the button ask to add one first → Add bank account.', render: (go) => addMoney(go, 'wallet', '', { noBank: true }) },
    { id: 'deposit-11', name: 'Add money · change bank', figma: '', note: 'The bank row (chevron) opens "Pay from": the linked banks as radio rows, picking one closes it; "Add another bank account" → Add bank account.', render: (go) => addMoney(go, 'wallet', String(defaultAmount), { banksOpen: true }) },
    { id: 'deposit-12', name: 'Add bank account', figma: '', note: 'From the bank row or "Pay from" — the ₹ and the US add money both come here. Verify (₹1 name check) goes back to the add money it came from.', render: (go) => <AddBankBack fallback={() => go('deposit-09')} /> },
    { id: 'deposit-02', name: 'Approve in UPI app (external)', figma: '5436:7954', note: 'Handoff placeholder: the UPI app’s own payment sheet is not built by Lemonn.', render: (go) => <UpiHandoff amount={paying} next="deposit-03" onCancel={() => go('deposit-05')} /> },
    { id: 'deposit-03', name: 'Confirming payment', figma: '5436:7953', render: () => <Processing next="deposit-04" /> },
    { id: 'deposit-04', name: 'Money added', figma: '5436:7955', note: 'First deposit: Start investing → the Stocks home. Opened from the wallet: Done → the wallet. (The prototype remembers the entry; a screen opened straight from the list assumes the first deposit.)', render: (go) => (
      <Success amount={paying} cta={origin === 'wallet' ? t('success.done') : undefined} onStart={() => go(origin === 'wallet' ? WALLET : 'stocks-01')} />
    ) },
    { id: 'deposit-05', name: 'Payment failed', figma: '', note: 'Not in the live screenshots — the failure state the flow needs. Change payment method returns to the Add money screen it came from.', render: (go) => <Failed onRetry={() => go('deposit-02')} onChange={() => go(origin === 'wallet' ? 'deposit-09' : 'deposit-01')} /> },
  ],
}

/** Add bank account, going back (both ways) to the screen it was opened from — the ₹ or the US add money. */
function AddBankBack({ fallback }: { fallback: () => void }) {
  const { back } = usePreview()
  const leave = () => { if (!back?.()) fallback() }
  return <AddBank onBack={leave} onVerify={leave} />
}
```

### `src/flows/deposit/screens/AddBank.tsx`

```tsx
import { Actionbar } from '@l3/components/Actionbar'
import { Aerobar } from '@l3/components/Aerobar'
import { Icon } from '@l3/components/Icon'
import { msInfo } from '@l3/icons/material'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Section } from '@l3/components/Section'
import { TextField } from '@l3/components/TextField'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { newBank } from '../data'
import { t } from '../copy'

/**
 * deposit-12 · Add bank account (from an add-money screen's bank row or its "Pay from" sheet): account number twice
 * and the IFSC, which shows the bank and branch once valid. Verify sends ₹1 to check the name, then goes back.
 * Shown filled in (the prototype doesn't type into it).
 */
export function AddBank({ onBack, onVerify }: { onBack?: () => void; onVerify?: () => void }) {
  return (
    <Screen
      top={<Actionbar title={t('addBank.screenTitle')} onBack={onBack} />}
      bottom={<ButtonGroup aria-label={t('addBank.actionsLabel')}><Button variant="primary" size="lg" fullWidth onClick={onVerify}>{t('addBank.cta')}</Button></ButtonGroup>}
    >
      <Intro title={t('addBank.title')} description={t('addBank.description')} />
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <TextField label={t('addBank.accountNumber')} inputMode="numeric" readOnly value={newBank.accountNumber} />
        <TextField label={t('addBank.confirmNumber')} inputMode="numeric" readOnly value={newBank.accountNumber} />
        <TextField label={t('addBank.ifsc')} readOnly value={newBank.ifsc} status="success" helperText={t('addBank.ifscFound', { bank: newBank.bank, branch: newBank.branch })} />
        <Aerobar floating placement="inline" type="discover" icon={<Icon icon={msInfo} />} heading={t('addBank.note')} />
      </Section>
    </Screen>
  )
}
```

### `src/flows/deposit/screens/AddMoney.tsx`

```tsx
import { useState } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Aerobar } from '@l3/components/Aerobar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Grid } from '@l3/components/Grid'
import { Icon } from '@l3/components/Icon'
import { Section } from '@l3/components/Section'
import { msCelebration } from '@l3/icons/material'
import { inr } from '../../../shared/data/format'
import { AmountDock, AmountEntry, amountValue, typeAmount } from '../../../shared/ui/AmountEntry'
import { BankRow, BankSheet, type BankPickerCopy } from '../../../shared/ui/BankPicker'
import { Screen } from '../../../shared/ui/Screen'
import { useLinkedBanks } from '../../../shared/userStatus'
import { firstDepositPerks, MIN_DEPOSIT, quickAmounts, UPI_LIMIT } from '../data'
import { t } from '../copy'

/**
 * deposit-01 and its states · Add money: one big amount typed on the app's keypad, the limits (or the error) under it,
 * "+" chips that add to it, the UPI app it's paid from, and "Add ₹X". Empty, below ₹100 or above the UPI limit → the
 * button is off; outside the limits the line under the amount turns red.
 * The bank row (shared BankRow) opens "Pay from" to change the bank; with no bank linked (User status → Bank accounts)
 * the row and the button ask to add one first.
 */
export function AddMoney({ initial = '', first = true, balance = 0, banksOpen = false, noBank = false, onBack, onPay, onAddBank }: {
  /** The amount already typed, as typed ("1000"). */
  initial?: string
  /** First deposit: shows the perks. */
  first?: boolean
  /** The wallet balance shown as "available" in the top bar. */
  balance?: number
  onBack?: () => void
  onPay?: (amount: number) => void
  /** Opens with the "Pay from" sheet up. */
  banksOpen?: boolean
  /** Shows the no-bank state whatever the User status says (its own screen in the list). */
  noBank?: boolean
  onAddBank?: () => void
}) {
  const [text, setText] = useState(initial)
  const linked = useLinkedBanks()
  const banks = noBank ? [] : linked
  const [bankId, setBankId] = useState(banks[0]?.id)
  const [sheet, setSheet] = useState(banksOpen)
  const bank = banks.find((b) => b.id === bankId) ?? banks[0]
  const bankCopy: BankPickerCopy = { method: t('bank.method'), addTitle: t('bank.addTitle'), addDescription: t('bank.addDescription'), sheetTitle: t('bank.sheetTitle'), addAnother: t('bank.addAnother') }
  const amount = amountValue(text)
  const tooLow = text !== '' && amount < MIN_DEPOSIT
  const tooHigh = amount > UPI_LIMIT
  const error = tooLow || tooHigh
  const below = tooLow
    ? t('addMoney.tooLow', { min: inr(MIN_DEPOSIT, 0) })
    : tooHigh
      ? t('addMoney.tooHigh', { max: inr(UPI_LIMIT, 0) })
      : t('addMoney.range', { min: inr(MIN_DEPOSIT, 0), max: inr(UPI_LIMIT, 0) })
  return (
    <Screen
      top={<Actionbar title={t('addMoney.title')} description={t('addMoney.available', { amount: inr(balance) })} onBack={onBack} />}
      sheet={sheet && bank && (
        <BankSheet banks={banks} selected={bank.id} copy={bankCopy} onSelect={setBankId} onAdd={() => { setSheet(false); onAddBank?.() }} onClose={() => setSheet(false)} />
      )}
      bottom={
        <AmountDock
          method={<BankRow bank={bank} copy={bankCopy} onChange={() => setSheet(true)} onAdd={onAddBank} />}
          onKey={(k) => setText((v) => typeAmount(v, k, { decimals: 0, maxDigits: 7 }))}
          action={
            <ButtonGroup aria-label={t('addMoney.title')}>
              {bank ? (
                <Button variant="brand" size="lg" fullWidth disabled={amount === 0 || error} onClick={() => onPay?.(amount)}>
                  {amount > 0 && !error ? t('addMoney.cta', { amount: inr(amount, 0) }) : t('addMoney.title')}
                </Button>
              ) : (
                <Button variant="primary" size="lg" fullWidth onClick={onAddBank}>{t('addMoney.addBankCta')}</Button>
              )}
            </ButtonGroup>
          }
        />
      }
    >
      <AmountEntry
        amount={text}
        currency="₹"
        error={error}
        below={below}
        chips={
          <Grid columns={4} gap="08" role="group" aria-label={t('addMoney.quickLabel')}>
            {quickAmounts.map((q) => (
              <Button key={q} variant="tertiary" size="sm" fullWidth onClick={() => setText(String(amount + q))}>+{inr(q, 0)}</Button>
            ))}
          </Grid>
        }
      />
      {first && (
        <Section paddingBlock="16" paddingInline="16">
          <Aerobar floating placement="inline" type="success" icon={<Icon icon={msCelebration} />} heading={firstDepositPerks[0]} />
        </Section>
      )}
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
export function UpiHandoff({ amount = defaultAmount, next, onCancel }: { amount?: number; next?: string; onCancel?: () => void }) {
  useAutoAdvance(next, 2800)
  return (
    <Screen
      top={<Actionbar title={t('handoff.title')} />}
      bottom={<ButtonGroup aria-label={t('handoff.groupLabel')}><Button variant="secondary" onClick={onCancel}>{t('handoff.cancel')}</Button></ButtonGroup>}
    >
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Loader size="lg" label={null} />} title={t('handoff.heading', { amount: inr(amount, 0), app: upiApp.name })} description={t('handoff.description')} />
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
export function Success({ amount = defaultAmount, cta = t('success.cta'), onStart }: { amount?: number; cta?: string; onStart?: () => void }) {
  return (
    <Screen bottom={<ButtonGroup aria-label={t('success.groupLabel')}><Button onClick={onStart}>{cta}</Button></ButtonGroup>}>
      <Stack justify="center" className={styles.fill}>
        <Section style={{ width: '100%' }} paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Spot icon={msCheckCircle} tone="success" />} title={t('success.title', { amount: inr(amount, 0) })} description={t('success.description')} />
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
          <Button variant="brand" onClick={onRetry}>{t('failed.retry')}</Button>
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

### `src/shared/ui/AmountEntry.module.css`

```css
/*
 * Add-money amount entry (AmountEntry.tsx). FLAG: L3 has no big amount input and no in-app keypad — drawn here on L3
 * tokens. The amount is Heading 36, centred, with a brand caret (the field is always being typed into: L3's Typing
 * state has no big-number version).
 */
.entry {
  align-items: center;
  padding: var(--l3-spacing-48) var(--l3-spacing-16) var(--l3-spacing-24);
  text-align: center;
}

.amount {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--l3-content-primary);
  font: var(--l3-text-heading-36);
  font-variant-numeric: tabular-nums;
}

.amount[data-empty] {
  color: var(--l3-content-tertiary);
}

.currency {
  margin-right: var(--l3-spacing-02);
}

.amount[data-empty] .currency {
  color: var(--l3-content-primary);
}

.caret {
  width: 2px; /* the text caret */
  height: var(--l3-size-40);
  margin-left: var(--l3-spacing-04);
  background: var(--l3-content-accent-brand-default);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caret {
    animation: none;
  }
}

.below {
  color: var(--l3-content-secondary);
  font: var(--l3-text-description-12);
}

.below[data-error] {
  color: var(--l3-content-accent-indicator-down-default);
}

/* The bottom: method row on a hairline, the keypad, the button dock. */
.dock {
  display: flex;
  flex-direction: column;
  background: var(--l3-surface-default);
}

.method {
  padding: var(--l3-spacing-08) 0; /* the ListCell brings its own 16 sides */
  border-top: 1px solid var(--l3-border-light); /* 1px hairline */
  border-bottom: 1px solid var(--l3-border-light); /* 1px hairline */
}

/* FLAG: the app's own keypad — big digits straight on the page, as in Groww. */
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: var(--l3-spacing-08) var(--l3-spacing-16);
}

.key {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--l3-size-56);
  border: 0;
  border-radius: var(--l3-radius-12);
  background: none;
  color: var(--l3-content-primary);
  font: var(--l3-text-heading-24);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.key:active {
  background: var(--l3-surface-secondary);
}
```

### `src/shared/ui/AmountEntry.tsx`

```tsx
import type { PointerEvent, ReactNode } from 'react'
import { Icon } from '@l3/components/Icon'
import { Stack } from '@l3/components/Stack'
import { msBackspace } from '@l3/icons/material'
import styles from './AmountEntry.module.css'

/**
 * The add-money amount screen's body, shared by the Indian (₹) and the US ($) wallet — a clean, Groww-like entry:
 * one big amount with a caret, a line under it (the limits, an error, or the ≈ conversion), optional quick-add chips,
 * then, pinned at the bottom, the payment method row, the app's own number keypad and the dock button.
 *
 * Put the body in `<Screen>`'s children and the dock in its `bottom` (see `AmountDock`). The available balance goes in
 * the Actionbar's description, not here.
 *
 * L3 gap: L3 has no big amount input and no in-app number keypad — both are drawn here (FLAG), on L3 tokens only.
 */
export function AmountEntry({ amount, currency, error = false, below, chips }: {
  /** What's typed so far, as typed: digits and, for $, one "." with up to 2 decimals ("50", "50.", "50.5"). Empty → "0" in grey. */
  amount: string
  /** "₹" or "$". */
  currency: '₹' | '$'
  /** The amount is outside the limits: the line under it turns red. */
  error?: boolean
  /** The line under the amount: limits, the error, or the ≈ conversion (a button opening the breakdown, say). */
  below?: ReactNode
  /** Quick-add chips under the amount (L3 Button tertiary small, or Tabs pill actions). */
  chips?: ReactNode
}) {
  const empty = amount === ''
  return (
    <Stack gap="24" className={styles.entry}>
      <Stack gap="08">
        <p className={styles.amount} data-empty={empty || undefined} aria-live="polite">
          <span className={styles.currency}>{currency}</span>
          {empty ? '0' : groupDigits(amount, currency)}
          <span className={styles.caret} aria-hidden="true" />
        </p>
        {below && <div className={styles.below} data-error={error || undefined}>{below}</div>}
      </Stack>
      {chips}
    </Stack>
  )
}

/**
 * The bottom of the amount screen: the payment method row (a ListCell), the keypad and the button (a ButtonGroup).
 * `data-surface="primary"` so the OS navigation bar under it takes the same colour.
 */
export function AmountDock({ method, decimal = false, onKey, action }: {
  method?: ReactNode
  /** Show the "." key ($ amounts). */
  decimal?: boolean
  onKey: (key: string) => void
  action: ReactNode
}) {
  return (
    <div className={styles.dock} data-surface="primary">
      {method && <div className={styles.method}>{method}</div>}
      <AmountKeypad decimal={decimal} onKey={onKey} />
      {action}
    </div>
  )
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'Backspace']

/** The app's own number keypad (FLAG: L3 has none): big digits on the page, no key boxes, as in Groww. */
export function AmountKeypad({ decimal = false, onKey }: { decimal?: boolean; onKey: (key: string) => void }) {
  return (
    <div className={styles.keypad} role="group" aria-label="Number keypad">
      {KEYS.map((k) =>
        k === '.' && !decimal ? <span key="blank" /> : (
          <button key={k} type="button" className={styles.key} aria-label={k === 'Backspace' ? 'Delete' : k === '.' ? 'Decimal point' : undefined} onPointerDown={keepFocus} onClick={() => onKey(k)}>
            {k === 'Backspace' ? <Icon icon={msBackspace} /> : k}
          </button>
        ),
      )}
    </div>
  )
}

const keepFocus = (e: PointerEvent) => e.preventDefault()

/**
 * Apply a keypad key to the typed amount. `decimals` 0 for ₹ (whole rupees), 2 for $. `maxDigits` caps the whole part.
 * No leading zeros ("0" then "5" → "5"); "." on an empty amount → "0.".
 */
export function typeAmount(value: string, key: string, { decimals = 0, maxDigits = 9 }: { decimals?: number; maxDigits?: number } = {}) {
  if (key === 'Backspace') return value.slice(0, -1)
  const [whole, fraction] = value.split('.')
  if (key === '.') return decimals > 0 && fraction === undefined ? (value === '' ? '0.' : value + '.') : value
  if (!/^\d$/.test(key)) return value
  if (fraction !== undefined) return fraction.length < decimals ? value + key : value
  if (whole === '0') return key
  return whole.length < maxDigits ? value + key : value
}

/** The typed amount as a number (NaN-safe). */
export const amountValue = (value: string) => Number(value) || 0

/** Group the whole part as typed: Indian grouping for ₹ (1,00,000), thousands for $ (100,000). Keeps a trailing "." / decimals. */
function groupDigits(value: string, currency: '₹' | '$') {
  const [whole, fraction] = value.split('.')
  const grouped = Number(whole || 0).toLocaleString(currency === '₹' ? 'en-IN' : 'en-US')
  return fraction === undefined ? grouped : `${grouped}.${fraction}`
}
```

### `src/shared/ui/BankPicker.tsx`

```tsx
import { useId } from 'react'
import { Avatar } from '@l3/components/Avatar'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Radio } from '@l3/components/Checkbox'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { msAccountBalance, msAdd, msChevronRight } from '@l3/icons/material'
import { getCompany } from '../data/companies'
import type { LinkedBank } from '../data/user'
import { Sheet } from './Sheet'

export type BankPickerCopy = {
  /** The payment method, the row's label: “UPI”, “Net Banking (Remittance)”. */
  method: string
  /** No bank linked: the row's label, “Add a bank account”. */
  addTitle: string
  /** …and its description, “Money can only come from your own bank account”. */
  addDescription: string
  /** The sheet's heading, “Pay from”. */
  sheetTitle: string
  /** The sheet's button, “Add another bank account”. */
  addAnother: string
}

const bankLogo = (bank: LinkedBank) => getCompany(bank.logoSymbol)?.logoUrl
export const bankLine = (bank: LinkedBank) => `${bank.bank} ••${bank.last4}`

/**
 * The bank row of the add-money screens (₹ and US), sitting on the dock above the keypad: the method over the bank,
 * a chevron — tapping it opens `BankSheet` to change the bank. With no bank linked it asks to add one instead.
 * Each flow passes its own words (its copy.json).
 */
export function BankRow({ bank, copy, note, onChange, onAdd }: {
  /** The bank money comes from; undefined = none linked. */
  bank?: LinkedBank
  copy: BankPickerCopy
  /** Extra after the bank, e.g. “lands by Thu 8 PM”. */
  note?: string
  onChange?: () => void
  onAdd?: () => void
}) {
  if (!bank) {
    return (
      <ListCell
        as="button"
        iconLeft={<Avatar icon={<Icon icon={msAccountBalance} />} size={32} label={copy.addTitle} />}
        label={copy.addTitle}
        description={copy.addDescription}
        iconRight={<Icon icon={msChevronRight} />}
        onClick={onAdd}
      />
    )
  }
  return (
    <ListCell
      as="button"
      iconLeft={<Avatar src={bankLogo(bank)} initials={bank.bank.slice(0, 2)} shape="rounded" size={32} label={bank.bank} />}
      label={copy.method}
      description={note ? `${bankLine(bank)} · ${note}` : bankLine(bank)}
      iconRight={<Icon icon={msChevronRight} />}
      onClick={onChange}
    />
  )
}

/** “Pay from”: the linked banks as radio rows (picking one closes the sheet), then “Add another bank account”. */
export function BankSheet({ banks, selected, copy, onSelect, onAdd, onClose }: {
  banks: LinkedBank[]
  selected: string
  copy: BankPickerCopy
  onSelect: (id: string) => void
  onAdd: () => void
  onClose: () => void
}) {
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={<BottomSheetHeader heading={copy.sheetTitle} headingId={id} />}
      footer={
        <ButtonGroup aria-label={copy.sheetTitle}>
          <Button variant="tertiary" size="lg" fullWidth iconLeft={<Icon icon={msAdd} />} onClick={onAdd}>{copy.addAnother}</Button>
        </ButtonGroup>
      }
    >
      <BankOptions banks={banks} selected={selected} name={id} onPick={(bankId) => { onSelect(bankId); onClose() }} />
    </Sheet>
  )
}

/** The sheet's body alone — the linked banks as radio rows — for a screen that hosts its own L3 BottomSheet (US Stocks). */
export function BankOptions({ banks, selected, name, onPick }: { banks: LinkedBank[]; selected: string; name: string; onPick: (id: string) => void }) {
  return (
    <>
      {banks.map((bank) => (
        <ListCell
          key={bank.id}
          as="label"
          selected={bank.id === selected}
          iconLeft={<Avatar src={bankLogo(bank)} initials={bank.bank.slice(0, 2)} shape="rounded" size={32} label={bank.bank} />}
          label={bankLine(bank)}
          description={`${bank.type} · ${bank.branch}`}
          trailing={<Radio name={name} checked={bank.id === selected} onChange={() => onPick(bank.id)} />}
        />
      ))}
    </>
  )
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

### `src/shared/userStatus.ts`

```ts
// Where the user is in the app — the prototype's app-level settings ("User status" in the preview panel, the phone's
// settings sheet and a floating card beside the phone). Every screen that depends on it reads it here, so they all stay
// in sync: pick "US Stocks: activated · money on the way" once and the Home's US tab, a US stock page and the wallet all
// show that state. Picking never moves on by itself; taps in the prototype don't change it.
// In a real app these come from the user's account (KYC status, US Stocks activation, wallet, holdings).
import type { FlowOption } from '../flows/types'
import { setFlowOption, useFlowOption } from './prototype'
import { linkedBanks, type LinkedBank } from './data/user'

/** The settings' owner in the preview (as a flow id: where the picks are remembered). */
export const USER_STATUS = 'app'

export type KycStatus = 'done' | 'pending'
export type UsActivation = 'kyc' | 'off' | 'review' | 'support' | 'failed' | 'active'
export type UsWallet = 'empty' | 'onTheWay' | 'funded'
export type UsHoldings = 'none' | 'some'
export type BankLinks = 'none' | 'one' | 'two'

/**
 * Screens that change with the user status: the settings float beside the phone on these (desktop preview). The Home,
 * its US tab screens (each one sets the status to its own state on arrival, then follows a pick), a US stock page and
 * the wallet's US tab.
 */
/** The add-money screens and the wallet: the bank row and its sheet change with the user's linked banks. */
const BANK_SCREENS = ['deposit-01', 'deposit-06', 'deposit-07', 'deposit-08', 'deposit-09', 'us-stocks-21', 'us-stocks-22', 'us-stocks-23', 'us-stocks-24', 'us-stocks-53', 'us-stocks-54']

const STATUS_SCREENS = ['stocks-01', 'stocks-09', 'stocks-10', 'stocks-13', 'stocks-14', 'stocks-15', 'stocks-16', 'stocks-17', 'stocks-19', 'stocks-20', 'stocks-21', 'us-stocks-13', 'us-stocks-54']

/** The settings, parent first: each one below only matters (and shows) while the one above has the listed values. */
export const userStatusOptions: FlowOption[] = [
  {
    // One list for the whole way in, in order: Lemonn KYC first (US Stocks can't be activated until it's done), then
    // the activation steps.
    id: 'us',
    group: 'User status',
    label: 'US Stocks activation',
    picker: 'dropdown',
    values: [
      { value: 'kyc', label: 'Lemonn KYC pending' },
      { value: 'off', label: 'KYC done · not activated' },
      { value: 'review', label: 'Activation under review' },
      { value: 'support', label: 'Under review · contact support' },
      { value: 'failed', label: 'Activation failed' },
      { value: 'active', label: 'Activated' },
    ],
    default: 'off',
    floatOn: STATUS_SCREENS,
  },
  {
    id: 'usWallet',
    group: 'User status',
    label: 'USD wallet',
    values: [{ value: 'empty', label: '$0' }, { value: 'onTheWay', label: 'Money on the way' }, { value: 'funded', label: 'Has money' }],
    default: 'empty',
    showIf: { us: ['active'] },
    floatOn: STATUS_SCREENS,
  },
  {
    id: 'usHoldings',
    group: 'User status',
    label: 'US holdings',
    picker: 'toggle',
    values: [{ value: 'none', label: 'None' }, { value: 'some', label: 'Holds NVDA' }],
    default: 'none',
    showIf: { usWallet: ['funded'] },
    floatOn: STATUS_SCREENS,
  },
  {
    // Bank accounts linked to Lemonn (KYC adds the first). None = the add-money screens ask for one first.
    id: 'banks',
    group: 'User status',
    label: 'Bank accounts',
    values: [{ value: 'none', label: 'None' }, { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }],
    default: 'two',
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

/** The bank accounts the user has linked, as picked in "User status → Bank accounts" (primary first). */
export function useLinkedBanks(): LinkedBank[] {
  const banks = useStatus('banks') as BankLinks
  return banks === 'none' ? [] : banks === 'one' ? linkedBanks.slice(0, 1) : linkedBanks
}

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
