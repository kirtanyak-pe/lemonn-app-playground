# Flow: Account setup (`kyc`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

KYC after login: PAN, details and declarations, nominee, bank account and F&O activation.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/kyc · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/kyc.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `kyc-01` | Start | [5436:7920](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7920) | `kyc-02` | Arrives with the "Email verified" toast from Login. |
| `kyc-02` | PAN found | [5436:7921](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7921) | `kyc-04`, `kyc-03`, `kyc-01` | The PAN linked to the mobile number, masked, for confirmation. |
| `kyc-03` | PAN · typed | [5436:7922](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7922) | `kyc-01`, `kyc-04` |  |
| `kyc-04` | Getting your details | [5436:7923](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7923) | — | Moves on by itself when the three come back. |
| `kyc-05` | Getting your details · slow network | [5436:7924](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7924) | — |  |
| `kyc-06` | Confirm details | [5436:7925](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7925) | `kyc-03`, `kyc-07`, `kyc-08`, `kyc-13` | Confirm turns on when the declarations are agreed. |
| `kyc-07` | F&O risk disclosure | [5436:7932](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7932) | `kyc-06` | Shown when F&O is ticked. |
| `kyc-08` | Add a nominee | [5436:7926](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7926) | `kyc-06`, `kyc-09` |  |
| `kyc-09` | Nominee · date of birth | [5436:7927](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7927) | `kyc-10`, `kyc-08` |  |
| `kyc-10` | Nominees | [5436:7928](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7928) | `kyc-08`, `kyc-11` |  |
| `kyc-11` | Confirm details · nominee added | [5436:7933](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7933) | `kyc-03`, `kyc-07`, `kyc-12`, `kyc-13` |  |
| `kyc-12` | Nominee details | [5436:7931](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7931) | `kyc-11`, `kyc-08` |  |
| `kyc-13` | Bank account found | [5436:7934](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7934) | `kyc-15`, `kyc-14` |  |
| `kyc-14` | Bank account · typed | [5436:7934](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7934) | `kyc-11`, `kyc-15` |  |
| `kyc-15` | Verifying bank (₹1) | [5436:7935](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7935) | — | Penny drop. Moves on by itself. |
| `kyc-16` | Bank verified | [5436:7936](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7936) | `kyc-17`, `kyc-20` |  |
| `kyc-17` | Share bank statement | [5436:7937](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7937) | `kyc-16`, `kyc-18`, `kyc-20` |  |
| `kyc-18` | CAMSfinserv (external) | [5436:7938](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7938) | `kyc-17` | Handoff placeholder: CAMSfinserv’s own OTP, account and consent pages (frames 5436:7939, 5436:7913, 5436:7940) are not built by Lemonn. |
| `kyc-19` | Statement received | [5436:7941](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7941) | `kyc-20` |  |
| `kyc-20` | You’re all set | [5436:7951](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=5436-7951) | `deposit-01`, `stocks-01` | Replaces the live "KYC already completed" web page. Add money → First deposit. |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the Figma links and the screens in this folder — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/kyc · one screen: `#/kyc-01`
- **Figma:** [User flow – auth, account setup](https://www.figma.com/design/sG24GPizTdwbMBxLm0IpTA/?node-id=2103-86)
  (screenshots of the live app, old design system — this flow redesigns them in L3)
- **Status:** ✅ · last updated 2026-10-16
- **Entry:** Login, after the email step (`login-09`), arriving with an "Email verified" toast
- **Exit:** "Add money" → First deposit (`deposit-01`); "Explore stocks first" → the app

Three stages, shown up front and tracked in a progress bar under the top bar: **1 Verify your identity** →
**2 Add your bank account** → **3 Activate F&O (optional)**.

### Screens

| Id | Screen | Figma | What it shows / when |
|---|---|---|---|
| `kyc-01` | Start | 5436:7920 | "Let's open your account": the 3 stages with times, a trust line, Start. "Email verified" toast. |
| `kyc-02` | PAN found | 5436:7921 | Sheet over the PAN screen: name + masked PAN linked to the mobile. Use it / Enter a different PAN. |
| `kyc-03` | PAN · typed | 5436:7922 | PAN field (format hint, error if the pattern is wrong). Continue turns on when it's valid. |
| `kyc-04` | Getting your details | 5436:7923 | Fetch from the government database: PAN ✓, Personal (loading), Bank (to do). Moves on by itself. |
| `kyc-05` | Getting your details · slow network | 5436:7924 | Same, with a "Slow connection" warning toast. |
| `kyc-06` | Confirm details | 5436:7925 | Read-only personal details, segments, nominee, unused-funds setting, declarations + one agree tick. |
| `kyc-07` | F&O risk disclosure | 5436:7932 | Sheet when F&O is ticked: SEBI's 4-point risk summary + source. "I understand". |
| `kyc-08` | Add a nominee | 5436:7926 | Relationship (pills), name, date of birth, last 4 of Aadhaar, "Same contact details as mine". |
| `kyc-09` | Nominee · date of birth | 5436:7927 | Date picker sheet over the filled form. |
| `kyc-10` | Nominees | 5436:7928 | Saved nominee(s) with their share. Add another / Done. |
| `kyc-11` | Confirm details · nominee added | 5436:7933 | kyc-06 with the nominee row (100%), declarations agreed, "Nominee added" toast. |
| `kyc-12` | Nominee details | 5436:7931 | Sheet from the nominee row: their details. Edit / Done. |
| `kyc-13` | Bank account found | 5436:7934 | Sheet over the bank screen: bank, masked account, IFSC, type. Use it / Add a different account. |
| `kyc-14` | Bank account · typed | 5436:7934 | Account number twice + IFSC; a valid IFSC shows the bank and branch. |
| `kyc-15` | Verifying bank (₹1) | 5436:7935 | Penny-drop sheet (can't be dismissed). Moves on by itself. |
| `kyc-16` | Bank verified | 5436:7936 | Sheet: verified + progress (identity ✓, bank ✓, F&O next). Activate F&O / Skip for now. |
| `kyc-17` | Share bank statement | 5436:7937 | Why F&O needs income proof and how it's fetched (CAMSfinserv, read-only, ~2 min). |
| `kyc-18` | CAMSfinserv (external) | 5436:7938 | **Handoff placeholder** — CAMSfinserv's own pages (5436:7939, 5436:7913, 5436:7940) are not Lemonn's. |
| `kyc-19` | Statement received | 5436:7941 | F&O under review, 24–48 hours, we'll notify you. |
| `kyc-20` | You're all set | 5436:7951 | "You're all set, Rohan": identity ✓, bank ✓, F&O under review. Add money / Explore stocks first. |

### Navigation

```
kyc-01 ─Start─▶ kyc-02 (PAN found sheet) ─Use this PAN─▶ kyc-04 ─auto─▶ kyc-06
                  └Enter a different PAN─▶ kyc-03 ─Continue─▶ kyc-04          (slow network: kyc-05)
kyc-06 ─tick F&O─▶ kyc-07 (risk sheet) ─I understand─▶ kyc-06
       ─Add a nominee─▶ kyc-08 ─date field─▶ kyc-09 (date sheet) ─Confirm─▶ kyc-10 ─Done─▶ kyc-11
                         └Skip─▶ kyc-06                                     └Add another─▶ kyc-08
kyc-11 ─nominee row─▶ kyc-12 (sheet) ─Edit─▶ kyc-08 · Done─▶ kyc-11
kyc-06 / kyc-11 ─Confirm and continue─▶ kyc-13 (bank found sheet) ─Use this account─▶ kyc-15
                                           └Add a different account─▶ kyc-14 ─Verify account─▶ kyc-15
kyc-15 ─auto (₹1 sent)─▶ kyc-16 ─Activate F&O─▶ kyc-17 ─Continue to CAMSfinserv─▶ kyc-18 ─approved─▶ kyc-19 ─▶ kyc-20
                           └Skip for now────────────▶ kyc-20         └Do this later─▶ kyc-20
kyc-20 ─Add money─▶ deposit-01 · Explore stocks first─▶ the app
```

### Data

From `src/shared/data/user.ts` (fictional sample user — never real customer data) and `data.ts`:
- `user`: name, father's name, date of birth, occupation, marital status, PAN (`ABCPM1234K`, shown masked
  `ABCPM••••K`).
- `bankAccount` / `foundBank`: bank, account number (shown `••••••••••7821`), IFSC, type, branch.
- `stages[]`, `fetchSteps[]`, `segments[]` (`cash` always on; `fno` optional), `declarations[]` (8 regulatory
  statements), `settlementOptions` (30 / 90 days), `relationships[]`, `nominee`, `PENNY_DROP` (₹1),
  `riskDisclosure[]`.
- API: PAN lookup by mobile → fetch PAN / personal / bank details from the KRA (three results, each can be slow) →
  save segments, settlement, declarations (one consent with timestamp) and nominees → bank lookup by PAN, or IFSC
  lookup + penny drop → account-aggregator consent (CAMSfinserv) → F&O review status.

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar | title + `onBack`. kyc-01 has none — nothing to put in it, so the content starts 24 below the status bar |
| Stage progress under the bar | L3 StageBar (via `components/StageBar`) | "Step 1 of 3 · Verify your identity", one segment per stage |
| Headlines | `Intro` (src/shared/ui) | Heading/24 title + Description/14 secondary; `align="center"` on result screens |
| Stage list, fetch list, progress | L3 `Steps` | done ✓ / current / loading / to do, with a connector line |
| Illustration | **Illustration slot** (`Spot`, src/shared/ui) | md 64 in sheet headers and kyc-17, lg 96 + halo on result screens |
| Sheets | BottomSheet + BottomSheetHeader | `size="lg"` + `icon` for confirmations; small header for details / date |
| Sheet and screen buttons | ButtonGroup ("L3: Button Dock") | vertical: primary over secondary; horizontal for Edit / Done, Skip / Save, Add another / Done |
| Facts (PAN, bank, personal, nominee) | KeyValueList + KeyValueRow | `variant="card"` |
| Segments, agree tick, same-contact tick | ListCell | `variant="card"`, `as="label"`, `multiline`, Checkbox in `trailing` |
| Nominee row, Add a nominee | ListCell | `variant="card"`, `as="button"`, chevron `iconRight`, share in a neutral Tag |
| Unused-funds setting | ListCell + Select | Select `size="sm"` (opens a 30 / 90 days picker) |
| Declarations | Card | bulleted Description/12 list |
| Relationship | Tabs | `appearance="pill"`, `emphasis="secondary"`, `behavior="toggle"` |
| Fields | TextField | PAN, name, Aadhaar last 4, account number ×2, IFSC (`status="success"` + bank/branch helper) |
| Date of birth | TextField (read-only, calendar icon) → DatePicker in a sheet | `max` = today |
| Toasts | Aerobar | `floating`, `emphasis="primary"`: success (Email verified, Nominee added), warning (Slow connection) |
| Loaders | Loader | `size="lg"` in the penny-drop sheet and the handoff screen |
| CAMSfinserv handoff | `External` (src/shared/ui) | filled Card + "External" Tag + the provider's steps |
| Layout | Section · Stack (Figma auto-layout frames) | Forms: Section `paddingBlock="24" paddingInline="16" gap="24"` under the Intro → Stack `as="section" gap="16"` per block; segment rows Stack `gap="08"`. Status screens (fetching, F&O handoff / received, done): Stack `justify="center"` filling the body → Section 24 / 16, `gap="24"`. Sheet bodies: Stack `gap="16"`. Step bar: Section `paddingBlock="12" paddingInline="16" gap="08"` |

### Rules & behaviour

- **PAN:** 5 letters, 4 digits, 1 letter (`/^[A-Z]{5}\d{4}[A-Z]$/`), auto-capitalised. If a PAN is linked to the
  mobile, it's offered first (masked); otherwise the field.
- **Fetching:** three calls (PAN, personal, bank); each row turns ✓ as it returns; after ~5 s without a result show
  the "Slow connection" toast; moves on when all three are back. Personal details are read-only — corrections go
  through support.
- **Segments:** Stocks & mutual funds always on (disabled tick). Ticking F&O shows the risk disclosure sheet
  (SEBI-mandated) every time; un-ticking needs no confirmation.
- **Declarations:** listed in full, agreed with one tick; "Confirm and continue" stays off until it's ticked. Store
  the consent with a timestamp.
- **Nominee:** optional ("Recommended · you can skip this"). Relationship, full name, date of birth (not in the
  future), last 4 of Aadhaar (not verified). One nominee = 100%; with several, shares must add up to 100% (up to 10).
- **Unused funds:** running-account settlement every 30 or 90 days (default 90).
- **Bank:** account number typed twice and must match; IFSC is 11 characters and looked up to show the bank and
  branch. Penny drop sends ₹1 shown as "Lemonn" on the statement; the name at the bank must match the PAN name (on a
  mismatch: an error sheet and "Add a different account" — not drawn).
- **F&O:** optional; "Skip for now" / "Do this later" both go to kyc-20 with F&O not started. Approved on CAMSfinserv
  → review, usually 24–48 hours, with a notification.
- **You're all set** shows what's done and what's pending (F&O under review only if it was started).

### Differences from Figma

- **One flow for everything after login.** The live app jumps between native screens and a web page ("KYC already
  completed"); kyc-20 replaces that page with a native "You're all set" that leads into the first deposit.
- **Stage progress** (`Step x of 3`) under every top bar, so people always know how far they are.
- **PAN found** became a confirmation sheet with the PAN masked, instead of a plain screen.
- **Declarations:** the separate toggles became one readable list + one "I agree" tick.
- **F&O risk disclosure** opens as a sheet when F&O is ticked, instead of a separate page.
- **Nominee:** relationship as pill choices, the address/email/phone question as one tick, a nominee summary sheet
  from Confirm details.
- **Bank:** the penny drop and the verified state are sheets over the bank screen; the verified sheet shows the
  overall progress and offers F&O.
- **CAMSfinserv** (third party) is a handoff placeholder (kyc-18), not a redraw of their pages.
- **Artwork:** old illustrations became illustration slots; all customer data in the screenshots was replaced with the
  fictional sample user.

### L3 gaps

- **Illustrations:** L3 has none for onboarding / results; `Spot` slots stand in (marked `data-illustration-slot`).
- **Stage progress:** L3 StageBar; `components/StageBar` only passes this flow's stage names and copy.

### Changelog

- 2026-10-16 — first version (20 screens).
- 2026-10-19 — the step lists use L3 `Steps` (1.0.0); the local `shared/ui/Steps` is gone. Current is now a green dot
  with a light halo, to do a 16 ring, and done / current / loading rows have 24 below them.
- 2026-10-21 — layout moved from CSS-module classes to the L3 layout blocks (Section, Stack); nothing moved (measured at 392).


## Source — this flow

### `src/flows/kyc/components/StageBar.tsx`

```tsx
import { StageBar as L3StageBar } from '@l3/components/StageBar'
import { t } from '../copy'
import { stages } from '../data'

/** Where the user is in account setup (stage 1–3): L3 Stage bar with this flow's stage names. */
export function StageBar({ stage }: { stage: 1 | 2 | 3 }) {
  return (
    <L3StageBar
      stages={stages.length as 3}
      current={stage}
      stepText={t('stageBar.step', { stage, count: stages.length })}
      stage={t(`stage.${stages[stage - 1]}.label`)}
    />
  )
}
```

### `src/flows/kyc/copy.json`

```json
{
  "stage.identity.label": "Verify your identity",
  "stage.identity.description": "PAN and personal details · about 2 min",
  "stage.bank.label": "Add your bank account",
  "stage.bank.description": "To add money and withdraw · about 1 min",
  "stage.fno.label": "Activate F&O (optional)",
  "stage.fno.description": "Needs a bank statement · about 2 min",
  "stageBar.step": "Step {stage} of {count}",
  "start.emailVerified": "Email verified",
  "start.actionsLabel": "Start",
  "start.cta": "Start",
  "start.title": "Let’s open your account",
  "start.description": "3 quick steps, about 5 minutes. Keep your PAN card handy.",
  "start.stepsLabel": "Account setup",
  "start.trust": "Your details are verified with SEBI-registered KRAs and stay encrypted.",
  "pan.screenTitle": "Verify identity",
  "pan.actionsLabel": "Continue",
  "pan.cta": "Continue",
  "pan.title": "Enter your PAN",
  "pan.description": "It links your trading account to your tax records",
  "pan.label": "PAN",
  "pan.placeholder": "ABCDE1234F",
  "pan.error": "A PAN has 5 letters, 4 digits and a letter",
  "pan.helper": "10 characters, as printed on your PAN card",
  "panFound.title": "Is this your PAN?",
  "panFound.description": "We found a PAN linked to your mobile number",
  "panFound.actionsLabel": "Confirm PAN",
  "panFound.use": "Yes, use this PAN",
  "panFound.other": "Enter a different PAN",
  "panFound.listLabel": "PAN found",
  "panFound.name": "Name",
  "panFound.pan": "PAN",
  "fetching.slowTitle": "Slow connection",
  "fetching.slowText": "This may take a little longer. Please keep the app open.",
  "fetching.title": "Getting your details",
  "fetching.description": "From the government database, so you don’t have to type them",
  "fetching.stepsLabel": "Fetching details",
  "fetching.step.pan": "PAN details",
  "fetching.step.personal": "Personal details",
  "fetching.step.bank": "Bank details",
  "details.screenTitle": "Confirm your details",
  "details.actionsLabel": "Confirm",
  "details.cta": "Confirm and continue",
  "details.personal.title": "Personal details",
  "details.personal.description": "From the government database. Something wrong? Contact support.",
  "details.personal.listLabel": "Personal details",
  "details.personal.name": "Full name",
  "details.personal.father": "Father’s name",
  "details.personal.dob": "Date of birth",
  "details.personal.occupation": "Occupation",
  "details.personal.marital": "Marital status",
  "details.segments.title": "What you’ll trade",
  "segment.cash.label": "Stocks & mutual funds",
  "segment.cash.description": "Always included",
  "segment.fno.label": "Futures & options (F&O)",
  "segment.fno.description": "Needs a bank statement — you’ll add it after the bank",
  "details.nominee.title": "Nominee",
  "details.nominee.description": "Who receives your holdings if something happens to you",
  "details.nominee.summary": "{relationship} · born {dob}",
  "details.nominee.add": "Add a nominee",
  "details.nominee.addDescription": "Recommended · you can skip this",
  "details.funds.title": "Unused funds",
  "details.funds.label": "Return unused funds to my bank every",
  "details.funds.value": "90 days",
  "details.declarations.title": "Declarations",
  "declaration.pep": "I am not a politically exposed person.",
  "declaration.resident": "I am an Indian resident — not a US person, US citizen / green card holder or tax resident of any other country.",
  "declaration.ddpi": "I accept the DDPI (Demat Debit and Pledge Instruction).",
  "declaration.mf": "I accept the BSE StAR MF terms.",
  "declaration.ecn": "Send contract notes (ECN) and other communications to my email.",
  "declaration.capable": "I am capable of operating my account on my own.",
  "declaration.sebi": "I have no past actions from SEBI or an exchange in the last 3 years.",
  "declaration.nominee": "Print my nominee details in my statements of holdings.",
  "details.declarations.agree": "I agree to all the declarations above",
  "risk.title": "Before you trade F&O",
  "risk.description": "Risk disclosure on derivatives (SEBI)",
  "risk.point.losses": "9 out of 10 individual traders in equity F&O made net losses.",
  "risk.point.average": "On average, loss makers lost close to ₹50,000.",
  "risk.point.lossCosts": "Loss makers spent an extra 28% of their net trading losses on transaction costs.",
  "risk.point.profitCosts": "Traders who made a profit spent 15% to 50% of it on transaction costs.",
  "risk.source": "Source: SEBI study, FY 2022–24.",
  "risk.actionsLabel": "Acknowledge",
  "risk.accept": "I understand",
  "nomineeForm.screenTitle": "Add a nominee",
  "nomineeForm.actionsLabel": "Nominee",
  "nomineeForm.skip": "Skip",
  "nomineeForm.save": "Save nominee",
  "nomineeForm.who": "Who is your nominee?",
  "nomineeForm.relationshipLabel": "Relationship",
  "relationship.Father": "Father",
  "relationship.Mother": "Mother",
  "relationship.Spouse": "Spouse",
  "relationship.Son": "Son",
  "relationship.Daughter": "Daughter",
  "relationship.Other": "Other",
  "nomineeForm.name": "Full name",
  "nomineeForm.namePlaceholder": "As on their ID",
  "nomineeForm.dob": "Date of birth",
  "nomineeForm.dobPlaceholder": "DD MMM YYYY",
  "nomineeForm.aadhaar": "Last 4 digits of Aadhaar",
  "nomineeForm.aadhaarPlaceholder": "1234",
  "nomineeForm.aadhaarHelper": "Only for identification — we don’t verify it",
  "nomineeForm.sameContact": "Same contact details as mine",
  "nomineeForm.sameContactDescription": "Address, email and phone number",
  "nomineeList.screenTitle": "Nominees",
  "nomineeList.actionsLabel": "Nominees",
  "nomineeList.addAnother": "Add another",
  "nomineeList.done": "Done",
  "nomineeList.summary": "{relationship} · born {dob}",
  "nomineeList.fine": "You can add up to 10 nominees and split your holdings between them. Change this anytime in Profile.",
  "nomineeAdded.title": "Nominee added",
  "dob.title": "Nominee’s date of birth",
  "dob.actionsLabel": "Date of birth",
  "dob.confirm": "Confirm",
  "dob.label": "Date of birth",
  "nomineeSheet.title": "Nominee details",
  "nomineeSheet.actionsLabel": "Nominee",
  "nomineeSheet.edit": "Edit",
  "nomineeSheet.done": "Done",
  "nomineeSheet.listLabel": "Nominee",
  "nomineeSheet.name": "Name",
  "nomineeSheet.relationship": "Relationship",
  "nomineeSheet.dob": "Date of birth",
  "nomineeSheet.aadhaar": "Aadhaar (last 4)",
  "nomineeSheet.share": "Share",
  "nomineeSheet.shareValue": "{share}%",
  "bank.screenTitle": "Add bank account",
  "bank.actionsLabel": "Verify",
  "bank.cta": "Verify account",
  "bank.title": "Add your bank account",
  "bank.description": "Money you add or withdraw only moves between this account and Lemonn",
  "bank.accountNumber": "Account number",
  "bank.accountNumberPlaceholder": "Your account number",
  "bank.confirmNumber": "Confirm account number",
  "bank.confirmNumberPlaceholder": "Type it again",
  "bank.ifsc": "IFSC",
  "bank.ifscPlaceholder": "e.g. HDFC0001234",
  "bank.ifscFound": "{bank} · {branch}",
  "bank.ifscHelper": "11 characters, on your cheque or passbook",
  "bankFound.title": "Use this bank account?",
  "bankFound.description": "We found it linked to your PAN",
  "bankFound.actionsLabel": "Bank account",
  "bankFound.use": "Use this account",
  "bankFound.other": "Add a different account",
  "bankFound.listLabel": "Bank account found",
  "bankFound.bank": "Bank",
  "bankFound.accountNumber": "Account number",
  "bankFound.ifsc": "IFSC",
  "bankFound.type": "Type",
  "bankVerifying.title": "Verifying your bank account",
  "bankVerifying.description": "We’re sending {amount} to it. It shows as “Lemonn” in your statement.",
  "bankVerifying.fine": "Takes a few seconds — please keep the app open",
  "bankVerified.title": "Bank account verified",
  "bankVerified.description": "{bank} {account}",
  "bankVerified.actionsLabel": "Next",
  "bankVerified.fno": "Activate F&O",
  "bankVerified.skip": "Skip for now",
  "bankVerified.stepsLabel": "Account setup",
  "bankVerified.step.identity": "Identity verified",
  "bankVerified.step.bank": "Bank account verified",
  "bankVerified.step.fno": "Activate F&O",
  "bankVerified.step.fnoDescription": "Share a bank statement · about 2 min",
  "fno.screenTitle": "Activate F&O",
  "fno.actionsLabel": "Bank statement",
  "fno.continue": "Continue to CAMSfinserv",
  "fno.later": "Do this later",
  "fno.title": "Share your bank statement",
  "fno.description": "SEBI needs proof of income before you can trade futures and options",
  "fno.why.aggregator.label": "Through CAMSfinserv",
  "fno.why.aggregator.description": "An RBI-regulated account aggregator — Lemonn never sees your bank login",
  "fno.why.readonly.label": "Read-only, one time",
  "fno.why.readonly.description": "The last 6 months of statements, only to check your income",
  "fno.why.time.label": "About 2 minutes",
  "fno.why.time.description": "Approve it with an OTP on CAMSfinserv",
  "fnoHandoff.title": "Opening CAMSfinserv",
  "fnoHandoff.description": "You’ll come back here once you approve",
  "fnoHandoff.provider": "CAMSfinserv · account aggregator",
  "fnoHandoff.step1": "Verify the mobile number with a 6-digit OTP",
  "fnoHandoff.step2": "Pick the bank account to share",
  "fnoHandoff.step3": "Approve sharing the statement",
  "fnoReceived.actionsLabel": "Continue",
  "fnoReceived.cta": "Continue",
  "fnoReceived.title": "Bank statement received",
  "fnoReceived.description": "We’re reviewing it. F&O usually activates within 24–48 hours — we’ll notify you.",
  "done.actionsLabel": "What next",
  "done.addMoney": "Add money",
  "done.explore": "Explore stocks first",
  "done.title": "You’re all set, {name}",
  "done.description": "Start investing in stocks and mutual funds today",
  "done.stepsLabel": "Account status",
  "done.step.identity": "Identity verified",
  "done.step.bank": "Bank account added",
  "done.step.fnoReview": "F&O under review",
  "done.step.fnoReviewDescription": "Usually 24–48 hours",
  "done.step.fnoOff": "F&O not activated",
  "done.step.fnoOffDescription": "Activate it anytime from Profile"
}
```

### `src/flows/kyc/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of Account setup (KYC) is in copy.json: t('pan.title'), t('done.title', { name }). */
export const t = makeCopy('kyc', copy)
```

### `src/flows/kyc/data.ts`

```ts
import { bankAccount } from '../../shared/data/user'

/** The three stages shown at the start and the end of account setup (texts: copy.json stage.<id>.label / .description). */
export const stages = ['identity', 'bank', 'fno'] as const

/** What's fetched from the government (NSDL / KRA) database after PAN confirmation (texts: copy.json fetching.step.<id>). */
export const fetchSteps = ['pan', 'personal', 'bank'] as const

/** Segments the user can trade. Stocks & mutual funds are always on; F&O needs income proof. */
export type Segment = { id: 'cash' | 'fno'; required?: boolean }
export const segments: Segment[] = [{ id: 'cash', required: true }, { id: 'fno' }]

/** Regulatory declarations (the live app's list, reworded; texts: copy.json declaration.<id>). The user agrees to all of them once. */
export const declarations = ['pep', 'resident', 'ddpi', 'mf', 'ecn', 'capable', 'sebi', 'nominee'] as const

/** Running-account settlement: how often unused funds go back to the bank. */
export const settlementOptions = ['30 days', '90 days']

export type Relationship = 'Mother' | 'Father' | 'Spouse' | 'Son' | 'Daughter' | 'Other'
export const relationships: Relationship[] = ['Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Other']

export type Nominee = { name: string; relationship: Relationship; dob: string; aadhaarLast4: string; share: number }
export const nominee: Nominee = { name: 'Suresh Mehta', relationship: 'Father', dob: '27 Apr 1967', aadhaarLast4: '2390', share: 100 }

/** Bank found through the PAN / mobile (shown for confirmation) and the ₹1 penny-drop check. */
export const foundBank = bankAccount
export const PENNY_DROP = 1

/** SEBI's mandated F&O risk disclosure (summary; texts: copy.json risk.point.<id>). */
export const riskDisclosure = ['losses', 'average', 'lossCosts', 'profitCosts'] as const
```

### `src/flows/kyc/index.tsx`

```tsx
import { Aerobar } from '@l3/components/Aerobar'
import { Icon } from '@l3/components/Icon'
import { msCheckCircle } from '@l3/icons/material'
import { user } from '../../shared/data/user'
import type { Flow } from '../types'
import { t } from './copy'
import { Bank } from './screens/Bank'
import { Details } from './screens/Details'
import { Done } from './screens/Done'
import { Fetching } from './screens/Fetching'
import { FnoConsent, FnoHandoff, FnoReceived } from './screens/Fno'
import { NomineeForm, NomineeList } from './screens/Nominee'
import { Pan } from './screens/Pan'
import { Start } from './screens/Start'
import { BankFoundSheet, BankVerifiedSheet, VerifyingBankSheet } from './sheets/BankSheets'
import { DobSheet } from './sheets/DobSheet'
import { NomineeSheet } from './sheets/NomineeSheet'
import { PanFoundSheet } from './sheets/PanFoundSheet'
import { RiskSheet } from './sheets/RiskSheet'

const nomineeAdded = () => <Aerobar floating type="success" emphasis="primary" icon={<Icon icon={msCheckCircle} />} heading={t('nomineeAdded.title')} />

/**
 * Account setup (KYC) — after Login: identity (PAN + government fetch), details & declarations, nominee, bank
 * (penny drop), F&O activation via the CAMSfinserv account aggregator, then "You're all set" → First deposit.
 */
export const kyc: Flow = {
  id: 'kyc',
  title: 'Account setup',
  description: 'KYC after login: PAN, details and declarations, nominee, bank account and F&O activation.',
  figmaFile: 'sG24GPizTdwbMBxLm0IpTA',
  sections: [
    { id: 'identity', title: 'Identity' },
    { id: 'details', title: 'Details & nominee' },
    { id: 'bank', title: 'Bank account' },
    { id: 'fno', title: 'Activate F&O' },
    { id: 'done', title: 'Done' },
  ],
  screens: [
    { id: 'kyc-01', section: 'identity', name: 'Start', figma: '5436:7920', note: 'Arrives with the "Email verified" toast from Login.', render: (go) => <Start onStart={() => go('kyc-02')} /> },
    {
      id: 'kyc-02', section: 'identity', name: 'PAN found', figma: '5436:7921',
      note: 'The PAN linked to the mobile number, masked, for confirmation.',
      render: (go) => <Pan sheet={<PanFoundSheet onUse={() => go('kyc-04')} onOther={() => go('kyc-03')} />} onBack={() => go('kyc-01')} />,
    },
    { id: 'kyc-03', section: 'identity', name: 'PAN · typed', figma: '5436:7922', render: (go) => <Pan value={user.pan} onBack={() => go('kyc-01')} onSubmit={() => go('kyc-04')} /> },
    { id: 'kyc-04', section: 'identity', name: 'Getting your details', figma: '5436:7923', note: 'Moves on by itself when the three come back.', render: () => <Fetching done={1} next="kyc-06" /> },
    { id: 'kyc-05', section: 'identity', name: 'Getting your details · slow network', figma: '5436:7924', render: () => <Fetching done={3} slow next="kyc-06" /> },

    { id: 'kyc-06', section: 'details', name: 'Confirm details', figma: '5436:7925', note: 'Confirm turns on when the declarations are agreed.', render: (go) => <Details onBack={() => go('kyc-03')} onFno={() => go('kyc-07')} onAddNominee={() => go('kyc-08')} onConfirm={() => go('kyc-13')} /> },
    { id: 'kyc-07', section: 'details', name: 'F&O risk disclosure', figma: '5436:7932', note: 'Shown when F&O is ticked.', render: (go) => <Details sheet={<RiskSheet onAccept={() => go('kyc-06')} onClose={() => go('kyc-06')} />} /> },
    { id: 'kyc-08', section: 'details', name: 'Add a nominee', figma: '5436:7926', render: (go) => <NomineeForm onBack={() => go('kyc-06')} onDob={() => go('kyc-09')} onSkip={() => go('kyc-06')} /> },
    { id: 'kyc-09', section: 'details', name: 'Nominee · date of birth', figma: '5436:7927', render: (go) => <NomineeForm filled sheet={<DobSheet onConfirm={() => go('kyc-10')} onClose={() => go('kyc-08')} />} /> },
    { id: 'kyc-10', section: 'details', name: 'Nominees', figma: '5436:7928', render: (go) => <NomineeList onBack={() => go('kyc-08')} onAdd={() => go('kyc-08')} onDone={() => go('kyc-11')} /> },
    { id: 'kyc-11', section: 'details', name: 'Confirm details · nominee added', figma: '5436:7933', render: (go) => <Details withNominee agreed toast={nomineeAdded()} onBack={() => go('kyc-03')} onFno={() => go('kyc-07')} onNominee={() => go('kyc-12')} onConfirm={() => go('kyc-13')} /> },
    { id: 'kyc-12', section: 'details', name: 'Nominee details', figma: '5436:7931', render: (go) => <Details withNominee agreed sheet={<NomineeSheet onClose={() => go('kyc-11')} onEdit={() => go('kyc-08')} />} /> },

    { id: 'kyc-13', section: 'bank', name: 'Bank account found', figma: '5436:7934', render: (go) => <Bank sheet={<BankFoundSheet onUse={() => go('kyc-15')} onOther={() => go('kyc-14')} />} /> },
    { id: 'kyc-14', section: 'bank', name: 'Bank account · typed', figma: '5436:7934', render: (go) => <Bank filled onBack={() => go('kyc-11')} onVerify={() => go('kyc-15')} /> },
    { id: 'kyc-15', section: 'bank', name: 'Verifying bank (₹1)', figma: '5436:7935', note: 'Penny drop. Moves on by itself.', render: () => <Bank filled sheet={<VerifyingBankSheet next="kyc-16" />} /> },
    { id: 'kyc-16', section: 'bank', name: 'Bank verified', figma: '5436:7936', render: (go) => <Bank filled sheet={<BankVerifiedSheet onFno={() => go('kyc-17')} onSkip={() => go('kyc-20')} />} /> },

    { id: 'kyc-17', section: 'fno', name: 'Share bank statement', figma: '5436:7937', render: (go) => <FnoConsent onBack={() => go('kyc-16')} onContinue={() => go('kyc-18')} onLater={() => go('kyc-20')} /> },
    { id: 'kyc-18', section: 'fno', name: 'CAMSfinserv (external)', figma: '5436:7938', note: 'Handoff placeholder: CAMSfinserv’s own OTP, account and consent pages (frames 5436:7939, 5436:7913, 5436:7940) are not built by Lemonn.', render: (go) => <FnoHandoff next="kyc-19" onBack={() => go('kyc-17')} /> },
    { id: 'kyc-19', section: 'fno', name: 'Statement received', figma: '5436:7941', render: (go) => <FnoReceived onContinue={() => go('kyc-20')} /> },

    { id: 'kyc-20', section: 'done', name: 'You’re all set', figma: '5436:7951', note: 'Replaces the live "KYC already completed" web page. Add money → First deposit.', render: (go) => <Done onAddMoney={() => go('deposit-01')} onExplore={() => go('stocks-01')} /> },
  ],
}
```

### `src/flows/kyc/screens/Bank.tsx`

```tsx
import type { ReactNode } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Section } from '@l3/components/Section'
import { TextField } from '@l3/components/TextField'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { StageBar } from '../components/StageBar'
import { t } from '../copy'
import { foundBank } from '../data'
import styles from './Kyc.module.css'

/**
 * kyc-13 / 14 · Bank account: number twice + IFSC (the IFSC shows the bank and branch once valid). The account found
 * for the PAN opens as a sheet first (kyc-13).
 */
export function Bank({ filled = false, sheet, onBack, onVerify }: { filled?: boolean; sheet?: ReactNode; onBack?: () => void; onVerify?: () => void }) {
  return (
    <Screen
      top={<Actionbar title={t('bank.screenTitle')} onBack={onBack} bottom={<StageBar stage={2} />} />}
      sheet={sheet}
      bottom={<ButtonGroup aria-label={t('bank.actionsLabel')}><Button disabled={!filled} onClick={onVerify}>{t('bank.cta')}</Button></ButtonGroup>}
    >
      <Intro title={t('bank.title')} description={t('bank.description')} />
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <TextField label={t('bank.accountNumber')} inputMode="numeric" readOnly value={filled ? foundBank.accountNumber : ''} placeholder={t('bank.accountNumberPlaceholder')} />
        <TextField label={t('bank.confirmNumber')} inputMode="numeric" readOnly value={filled ? foundBank.accountNumber : ''} placeholder={t('bank.confirmNumberPlaceholder')} />
        <TextField
          label={t('bank.ifsc')}
          readOnly
          value={filled ? foundBank.ifsc : ''}
          placeholder={t('bank.ifscPlaceholder')}
          status={filled ? 'success' : undefined}
          helperText={filled ? t('bank.ifscFound', { bank: foundBank.bank, branch: foundBank.branch }) : t('bank.ifscHelper')}
        />
      </Section>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Details.tsx`

```tsx
import { useState, type ReactNode } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Checkbox } from '@l3/components/Checkbox'
import { Icon } from '@l3/components/Icon'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { ListCell } from '@l3/components/ListCell'
import { Section } from '@l3/components/Section'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Select } from '@l3/components/Select'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msChevronRight, msPersonAdd } from '@l3/icons/material'
import { user } from '../../../shared/data/user'
import { Screen } from '../../../shared/ui/Screen'
import { StageBar } from '../components/StageBar'
import { t } from '../copy'
import { declarations, nominee, segments } from '../data'
import styles from './Kyc.module.css'

type Props = {
  /** A nominee has been added (shows their row instead of "Add a nominee"). */
  withNominee?: boolean
  /** Declarations already agreed (board states). */
  agreed?: boolean
  toast?: ReactNode
  sheet?: ReactNode
  onBack?: () => void
  onFno?: () => void
  onAddNominee?: () => void
  onNominee?: () => void
  onConfirm?: () => void
}

/**
 * kyc-06 / 07 / 11 / 12 · Confirm details: what came back from the government database (read-only), trading
 * segments, nominee, settlement and the declarations — agreed once with one checkbox. Confirm needs that tick.
 */
export function Details({ withNominee = false, agreed: initialAgreed = false, toast, sheet, onBack, onFno, onAddNominee, onNominee, onConfirm }: Props) {
  const [agreed, setAgreed] = useState(initialAgreed)
  return (
    <Screen
      top={<Actionbar title={t('details.screenTitle')} onBack={onBack} bottom={<StageBar stage={1} />} />}
      toast={toast}
      sheet={sheet}
      bottom={<ButtonGroup aria-label={t('details.actionsLabel')}><Button variant="secondary" disabled={!agreed} onClick={onConfirm}>{t('details.cta')}</Button></ButtonGroup>}
    >
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <Stack as="section" gap="16">
          <SectionHeader title={t('details.personal.title')} description={t('details.personal.description')} />
          <KeyValueList variant="card" aria-label={t('details.personal.listLabel')}>
            <KeyValueRow label={t('details.personal.name')} value={user.name} />
            <KeyValueRow label={t('details.personal.father')} value={user.fatherName} />
            <KeyValueRow label={t('details.personal.dob')} value={user.dob} />
            <KeyValueRow label={t('details.personal.occupation')} value={user.occupation} />
            <KeyValueRow label={t('details.personal.marital')} value={user.maritalStatus} />
          </KeyValueList>
        </Stack>

        <Stack as="section" gap="16">
          <SectionHeader title={t('details.segments.title')} />
          <Stack gap="08">
            {segments.map((s) => (
              <ListCell
                key={s.id}
                variant="card"
                as="label"
                label={t(`segment.${s.id}.label`)}
                description={t(`segment.${s.id}.description`)}
                multiline
                trailing={<Checkbox defaultChecked disabled={s.required} onChange={s.id === 'fno' ? (e) => e.target.checked && onFno?.() : undefined} />}
              />
            ))}
          </Stack>
        </Stack>

        <Stack as="section" gap="16">
          <SectionHeader title={t('details.nominee.title')} description={t('details.nominee.description')} />
          {withNominee ? (
            <ListCell variant="card" as="button" label={nominee.name} description={t('details.nominee.summary', { relationship: nominee.relationship, dob: nominee.dob })} trailing={<Tag color="neutral">{nominee.share}%</Tag>} iconRight={<Icon icon={msChevronRight} />} onClick={onNominee} />
          ) : (
            <ListCell variant="card" as="button" iconLeft={<Icon icon={msPersonAdd} />} label={t('details.nominee.add')} description={t('details.nominee.addDescription')} iconRight={<Icon icon={msChevronRight} />} onClick={onAddNominee} />
          )}
        </Stack>

        <Stack as="section" gap="16">
          <SectionHeader title={t('details.funds.title')} />
          <ListCell variant="card" label={t('details.funds.label')} multiline trailing={<Select size="sm" onClick={() => {}}>{t('details.funds.value')}</Select>} />
        </Stack>

        <Stack as="section" gap="16">
          <SectionHeader title={t('details.declarations.title')} />
          <Card>
            <ul className={styles.bullets}>{declarations.map((d) => <li key={d} className={styles.fine}>{t(`declaration.${d}`)}</li>)}</ul>
          </Card>
          <ListCell variant="card" as="label" label={t('details.declarations.agree')} multiline trailing={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />} />
        </Stack>
      </Section>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Done.tsx`

```tsx
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { Steps } from '@l3/components/Steps'
import { msCelebration } from '@l3/icons/material'
import { user } from '../../../shared/data/user'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { Spot } from '../../../shared/ui/Spot'
import { t } from '../copy'
import styles from './Kyc.module.css'

/** kyc-20 · Account ready. Stocks and mutual funds work now; F&O follows its review. Next: add money (or look around). */
export function Done({ fnoUnderReview = true, onAddMoney, onExplore }: { fnoUnderReview?: boolean; onAddMoney?: () => void; onExplore?: () => void }) {
  return (
    <Screen
      bottom={
        <ButtonGroup aria-label={t('done.actionsLabel')}>
          <Button onClick={onAddMoney}>{t('done.addMoney')}</Button>
          <Button variant="secondary" onClick={onExplore}>{t('done.explore')}</Button>
        </ButtonGroup>
      }
    >
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Spot icon={msCelebration} tone="brand" />} title={t('done.title', { name: user.name.split(' ')[0] })} description={t('done.description')} />
          <Card>
            <Steps
              label={t('done.stepsLabel')}
              steps={[
                { label: t('done.step.identity'), state: 'done' },
                { label: t('done.step.bank'), state: 'done' },
                fnoUnderReview
                  ? { label: t('done.step.fnoReview'), description: t('done.step.fnoReviewDescription'), state: 'loading' }
                  : { label: t('done.step.fnoOff'), description: t('done.step.fnoOffDescription'), state: 'todo' },
              ]}
            />
          </Card>
        </Section>
      </Stack>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Fetching.tsx`

```tsx
import { Aerobar } from '@l3/components/Aerobar'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { Steps, type StepState } from '@l3/components/Steps'
import { msDatabase, msWifiOff } from '@l3/icons/material'
import { useAutoAdvance } from '../../../shared/prototype'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { Spot } from '../../../shared/ui/Spot'
import { t } from '../copy'
import { fetchSteps } from '../data'
import styles from './Kyc.module.css'

/**
 * kyc-04 / 05 · Fetching PAN, personal and bank details from the government (KRA / NSDL) database.
 * `done` = how many of the three are back. A slow connection shows a warning toast (kyc-05) — the wait continues.
 */
export function Fetching({ done = 1, slow = false, next }: { done?: number; slow?: boolean; next?: string }) {
  useAutoAdvance(next, 2600)
  const state = (i: number): StepState => (i < done ? 'done' : i === done ? 'loading' : 'todo')
  return (
    <Screen
      toast={slow && <Aerobar floating type="warning" icon={<Icon icon={msWifiOff} />} heading={t('fetching.slowTitle')} paragraph={t('fetching.slowText')} />}
    >
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro
            align="center"
            art={<Spot icon={msDatabase} tone="discover" />}
            title={t('fetching.title')}
            description={t('fetching.description')}
          />
          <Card variant="filled">
            <Steps label={t('fetching.stepsLabel')} steps={fetchSteps.map((id, i) => ({ label: t(`fetching.step.${id}`), state: state(i) }))} />
          </Card>
        </Section>
      </Stack>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Fno.tsx`

```tsx
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { Loader } from '@l3/components/Loader'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { msCheckCircle, msLock, msReceiptLong, msSchedule, msVerifiedUser } from '@l3/icons/material'
import { useAutoAdvance } from '../../../shared/prototype'
import { External } from '../../../shared/ui/External'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { Spot } from '../../../shared/ui/Spot'
import { StageBar } from '../components/StageBar'
import { t } from '../copy'
import styles from './Kyc.module.css'

const why = [
  { icon: msVerifiedUser, id: 'aggregator' },
  { icon: msLock, id: 'readonly' },
  { icon: msSchedule, id: 'time' },
] as const

/** kyc-17 · Why a bank statement is needed for F&O and how it's fetched, before handing off to CAMSfinserv. */
export function FnoConsent({ onBack, onContinue, onLater }: { onBack?: () => void; onContinue?: () => void; onLater?: () => void }) {
  return (
    <Screen
      top={<Actionbar title={t('fno.screenTitle')} onBack={onBack} bottom={<StageBar stage={3} />} />}
      bottom={
        <ButtonGroup aria-label={t('fno.actionsLabel')}>
          <Button onClick={onContinue}>{t('fno.continue')}</Button>
          <Button variant="secondary" onClick={onLater}>{t('fno.later')}</Button>
        </ButtonGroup>
      }
    >
      <Intro art={<Spot icon={msReceiptLong} tone="discover" size="md" />} title={t('fno.title')} description={t('fno.description')} />
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <Card variant="filled">
          {why.map((w) => <ListCell key={w.id} iconLeft={<Icon icon={w.icon} />} label={t(`fno.why.${w.id}.label`)} description={t(`fno.why.${w.id}.description`)} multiline />)}
        </Card>
      </Section>
    </Screen>
  )
}

/** kyc-18 · HANDOFF: the account aggregator's own pages (not built by Lemonn). Returns to kyc-19 when approved. */
export function FnoHandoff({ next, onBack }: { next?: string; onBack?: () => void }) {
  useAutoAdvance(next, 3000)
  return (
    <Screen top={<Actionbar title={t('fno.screenTitle')} onBack={onBack} />}>
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro align="center" art={<Loader size="lg" label={null} />} title={t('fnoHandoff.title')} description={t('fnoHandoff.description')} />
          <External provider={t('fnoHandoff.provider')} steps={[t('fnoHandoff.step1'), t('fnoHandoff.step2'), t('fnoHandoff.step3')]} />
        </Section>
      </Stack>
    </Screen>
  )
}

/** kyc-19 · Back from CAMSfinserv: statement received, F&O under review. */
export function FnoReceived({ onContinue }: { onContinue?: () => void }) {
  return (
    <Screen bottom={<ButtonGroup aria-label={t('fnoReceived.actionsLabel')}><Button onClick={onContinue}>{t('fnoReceived.cta')}</Button></ButtonGroup>}>
      <Stack justify="center" className={styles.fill}>
        <Section paddingBlock="24" paddingInline="16" gap="24">
          <Intro
            align="center"
            art={<Spot icon={msCheckCircle} tone="success" />}
            title={t('fnoReceived.title')}
            description={t('fnoReceived.description')}
          />
        </Section>
      </Stack>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Kyc.module.css`

```css
/* Account-setup screens: layout is L3 Section / Stack; only text styles and what those blocks don't cover live here. */

/* The centred status screens: the Stack fills the body so justify="center" centres the Section vertically. */
.fill {
  flex: 1;
}

.fine {
  margin: 0;
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}

.fineCentre {
  text-align: center;
}

/* A bulleted list: a Stack would drop the bullets (it sets list-style: none) and has no left indent for them. */
.bullets {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-08);
  margin: 0;
  padding-left: var(--l3-spacing-24);
  font: var(--l3-text-description-14);
  color: var(--l3-content-primary);
}
```

### `src/flows/kyc/screens/Nominee.tsx`

```tsx
import { useState, type ReactNode } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Checkbox } from '@l3/components/Checkbox'
import { Icon } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { Section } from '@l3/components/Section'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { Tabs } from '@l3/components/Tabs'
import { Tag } from '@l3/components/Tag'
import { TextField } from '@l3/components/TextField'
import { msCalendarMonth } from '@l3/icons/material'
import { Screen } from '../../../shared/ui/Screen'
import { t } from '../copy'
import { nominee, relationships, type Relationship } from '../data'
import styles from './Kyc.module.css'

type FormProps = {
  filled?: boolean
  sheet?: ReactNode
  onBack?: () => void
  onDob?: () => void
  onSave?: () => void
  onSkip?: () => void
}

/**
 * kyc-08 / 09 · Add a nominee: relationship (one choice), name, date of birth (sheet), last 4 of Aadhaar (not
 * validated), and "same address, email and phone as mine". Save turns on when everything's filled.
 */
export function NomineeForm({ filled = false, sheet, onBack, onDob, onSave, onSkip }: FormProps) {
  const [relationship, setRelationship] = useState<Relationship | ''>(filled ? nominee.relationship : '')
  const ready = filled && relationship !== ''
  return (
    <Screen
      top={<Actionbar title={t('nomineeForm.screenTitle')} onBack={onBack} />}
      sheet={sheet}
      bottom={
        <ButtonGroup aria-label={t('nomineeForm.actionsLabel')} direction="horizontal">
          <Button variant="secondary" onClick={onSkip}>{t('nomineeForm.skip')}</Button>
          <Button disabled={!ready} onClick={onSave}>{t('nomineeForm.save')}</Button>
        </ButtonGroup>
      }
    >
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <Stack as="section" gap="16">
          <SectionHeader title={t('nomineeForm.who')} />
          <Tabs
            aria-label={t('nomineeForm.relationshipLabel')}
            appearance="pill"
            emphasis="secondary"
            behavior="toggle"
            items={relationships.map((r) => ({ value: r, label: t(`relationship.${r}`) }))}
            value={relationship}
            onChange={(v) => setRelationship(v as Relationship)}
          />
        </Stack>
        <Stack as="section" gap="16">
          <TextField label={t('nomineeForm.name')} placeholder={t('nomineeForm.namePlaceholder')} defaultValue={filled ? nominee.name : ''} />
          <TextField label={t('nomineeForm.dob')} placeholder={t('nomineeForm.dobPlaceholder')} value={filled ? nominee.dob : ''} readOnly iconRight={<Icon icon={msCalendarMonth} />} onClick={onDob} />
          <TextField label={t('nomineeForm.aadhaar')} placeholder={t('nomineeForm.aadhaarPlaceholder')} inputMode="numeric" maxLength={4} defaultValue={filled ? nominee.aadhaarLast4 : ''} helperText={t('nomineeForm.aadhaarHelper')} />
          <ListCell variant="card" as="label" multiline label={t('nomineeForm.sameContact')} description={t('nomineeForm.sameContactDescription')} trailing={<Checkbox defaultChecked />} />
        </Stack>
      </Section>
    </Screen>
  )
}

/** kyc-10 · Nominees saved: each with their share (100% for one). Add another or finish. */
export function NomineeList({ onBack, onAdd, onDone }: { onBack?: () => void; onAdd?: () => void; onDone?: () => void }) {
  return (
    <Screen
      top={<Actionbar title={t('nomineeList.screenTitle')} onBack={onBack} />}
      bottom={
        <ButtonGroup aria-label={t('nomineeList.actionsLabel')} direction="horizontal">
          <Button variant="secondary" onClick={onAdd}>{t('nomineeList.addAnother')}</Button>
          <Button onClick={onDone}>{t('nomineeList.done')}</Button>
        </ButtonGroup>
      }
    >
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <ListCell variant="card" label={nominee.name} description={t('nomineeList.summary', { relationship: nominee.relationship, dob: nominee.dob })} trailing={<Tag color="neutral">{nominee.share}%</Tag>} />
        <p className={styles.fine}>{t('nomineeList.fine')}</p>
      </Section>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Pan.tsx`

```tsx
import type { ReactNode } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Section } from '@l3/components/Section'
import { TextField } from '@l3/components/TextField'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { StageBar } from '../components/StageBar'
import { t } from '../copy'
import styles from './Kyc.module.css'

/** kyc-02 / 03 · PAN. A PAN found for the mobile number opens as a sheet first (kyc-02); otherwise type it (kyc-03). */
export function Pan({ value = '', sheet, onBack, onSubmit }: { value?: string; sheet?: ReactNode; onBack?: () => void; onSubmit?: () => void }) {
  const valid = /^[A-Z]{5}\d{4}[A-Z]$/.test(value)
  return (
    <Screen
      top={<Actionbar title={t('pan.screenTitle')} onBack={onBack} bottom={<StageBar stage={1} />} />}
      bottom={<ButtonGroup aria-label={t('pan.actionsLabel')}><Button fullWidth variant="buy" disabled={!valid} onClick={onSubmit}>{t('pan.cta')}</Button></ButtonGroup>}
      sheet={sheet}
    >
      <Intro title={t('pan.title')} description={t('pan.description')} />
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <TextField
          label={t('pan.label')}
          value={value}
          placeholder={t('pan.placeholder')}
          readOnly
          autoCapitalize="characters"
          helperText={value && !valid ? t('pan.error') : t('pan.helper')}
          status={value && !valid ? 'error' : undefined}
        />
      </Section>
    </Screen>
  )
}
```

### `src/flows/kyc/screens/Start.tsx`

```tsx
import { Aerobar } from '@l3/components/Aerobar'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { Section } from '@l3/components/Section'
import { Steps } from '@l3/components/Steps'
import { msCheckCircle } from '@l3/icons/material'
import { Intro } from '../../../shared/ui/Intro'
import { Screen } from '../../../shared/ui/Screen'
import { t } from '../copy'
import { stages } from '../data'
import styles from './Kyc.module.css'

/**
 * kyc-01 · Account setup overview: three stages and how long they take. Arrives with an "Email verified" toast.
 * No top bar: there's nothing to put in it (no back, title or action), so the content starts 24 below the status bar.
 */
export function Start({ emailVerified = true, onStart }: { emailVerified?: boolean; onStart?: () => void }) {
  return (
    <Screen
      toast={emailVerified && <Aerobar floating type="success" emphasis="primary" icon={<Icon icon={msCheckCircle} />} heading={t('start.emailVerified')} />}
      bottom={<ButtonGroup aria-label={t('start.actionsLabel')}><Button onClick={onStart}>{t('start.cta')}</Button></ButtonGroup>}
    >
      <Intro title={t('start.title')} description={t('start.description')} />
      <Section paddingBlock="24" paddingInline="16" gap="24">
        <Card>
          <Steps label={t('start.stepsLabel')} steps={stages.map((s, i) => ({ label: t(`stage.${s}.label`), description: t(`stage.${s}.description`), state: i === 0 ? 'current' : 'todo' }))} />
        </Card>
        <p className={styles.fine}>{t('start.trust')}</p>
      </Section>
    </Screen>
  )
}
```

### `src/flows/kyc/sheets/BankSheets.tsx`

```tsx
import { useId } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { Loader } from '@l3/components/Loader'
import { Stack } from '@l3/components/Stack'
import { Steps } from '@l3/components/Steps'
import { msAccountBalance, msCheckCircle } from '@l3/icons/material'
import { useAutoAdvance } from '../../../shared/prototype'
import { inr, mask } from '../../../shared/data/format'
import { Sheet } from '../../../shared/ui/Sheet'
import { Spot } from '../../../shared/ui/Spot'
import { t } from '../copy'
import { foundBank, PENNY_DROP } from '../data'
import styles from '../screens/Kyc.module.css'

/** kyc-13 · A bank account linked to the PAN was found: use it, or add another. */
export function BankFoundSheet({ onUse, onOther }: { onUse?: () => void; onOther?: () => void }) {
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      onClose={onOther}
      header={<BottomSheetHeader size="lg" headingId={id} icon={<Spot icon={msAccountBalance} tone="discover" size="md" />} heading={t('bankFound.title')} description={t('bankFound.description')} />}
      footer={
        <ButtonGroup aria-label={t('bankFound.actionsLabel')}>
          <Button onClick={onUse}>{t('bankFound.use')}</Button>
          <Button variant="secondary" onClick={onOther}>{t('bankFound.other')}</Button>
        </ButtonGroup>
      }
    >
      <Stack gap="16">
        <KeyValueList variant="card" aria-label={t('bankFound.listLabel')}>
          <KeyValueRow label={t('bankFound.bank')} value={foundBank.bank} />
          <KeyValueRow label={t('bankFound.accountNumber')} value={mask(foundBank.accountNumber, 0, 4)} />
          <KeyValueRow label={t('bankFound.ifsc')} value={foundBank.ifsc} />
          <KeyValueRow label={t('bankFound.type')} value={foundBank.type} />
        </KeyValueList>
      </Stack>
    </Sheet>
  )
}

/** kyc-15 · Penny drop: ₹1 is sent to the account to prove it's the user's. Can't be dismissed. */
export function VerifyingBankSheet({ next }: { next?: string }) {
  useAutoAdvance(next, 2200)
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      header={<BottomSheetHeader size="lg" headingId={id} icon={<Loader size="lg" label={null} />} heading={t('bankVerifying.title')} description={t('bankVerifying.description', { amount: inr(PENNY_DROP, 0) })} />}
    >
      <p className={`${styles.fine} ${styles.fineCentre}`}>{t('bankVerifying.fine')}</p>
    </Sheet>
  )
}

/** kyc-16 · Bank verified. F&O is the last (optional) step — it needs a bank statement. */
export function BankVerifiedSheet({ onFno, onSkip }: { onFno?: () => void; onSkip?: () => void }) {
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      header={<BottomSheetHeader size="lg" headingId={id} icon={<Spot icon={msCheckCircle} tone="success" size="md" />} heading={t('bankVerified.title')} description={t('bankVerified.description', { bank: foundBank.bank, account: mask(foundBank.accountNumber, 0, 4) })} />}
      footer={
        <ButtonGroup aria-label={t('bankVerified.actionsLabel')}>
          <Button onClick={onFno}>{t('bankVerified.fno')}</Button>
          <Button variant="secondary" onClick={onSkip}>{t('bankVerified.skip')}</Button>
        </ButtonGroup>
      }
    >
      <Stack gap="16">
        <Steps
          label={t('bankVerified.stepsLabel')}
          steps={[
            { label: t('bankVerified.step.identity'), state: 'done' },
            { label: t('bankVerified.step.bank'), state: 'done' },
            { label: t('bankVerified.step.fno'), description: t('bankVerified.step.fnoDescription'), state: 'current' },
          ]}
        />
      </Stack>
    </Sheet>
  )
}
```

### `src/flows/kyc/sheets/DobSheet.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { DatePicker } from '@l3/components/DatePicker'
import { Stack } from '@l3/components/Stack'
import { Sheet } from '../../../shared/ui/Sheet'
import { t } from '../copy'
import styles from '../screens/Kyc.module.css'

/** kyc-09 · Nominee's date of birth (L3 DatePicker in a sheet; no future dates). */
export function DobSheet({ onConfirm, onClose }: { onConfirm?: () => void; onClose?: () => void }) {
  const id = useId()
  const [date, setDate] = useState<Date | null>(new Date(1967, 3, 27))
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={<BottomSheetHeader headingId={id} heading={t('dob.title')} />}
      footer={<ButtonGroup aria-label={t('dob.actionsLabel')}><Button disabled={!date} onClick={onConfirm}>{t('dob.confirm')}</Button></ButtonGroup>}
    >
      <Stack gap="16">
        <DatePicker label={t('dob.label')} value={date} onChange={setDate} max={new Date()} initialMonth={new Date(1967, 3, 1)} />
      </Stack>
    </Sheet>
  )
}
```

### `src/flows/kyc/sheets/NomineeSheet.tsx`

```tsx
import { useId } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { Stack } from '@l3/components/Stack'
import { Sheet } from '../../../shared/ui/Sheet'
import { t } from '../copy'
import { nominee } from '../data'
import styles from '../screens/Kyc.module.css'

/** kyc-12 · Tapping the nominee on Confirm details: their details, to check before confirming. */
export function NomineeSheet({ onClose, onEdit }: { onClose?: () => void; onEdit?: () => void }) {
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={<BottomSheetHeader headingId={id} heading={t('nomineeSheet.title')} />}
      footer={
        <ButtonGroup aria-label={t('nomineeSheet.actionsLabel')} direction="horizontal">
          <Button variant="secondary" onClick={onEdit}>{t('nomineeSheet.edit')}</Button>
          <Button onClick={onClose}>{t('nomineeSheet.done')}</Button>
        </ButtonGroup>
      }
    >
      <Stack gap="16">
        <KeyValueList variant="card" aria-label={t('nomineeSheet.listLabel')}>
          <KeyValueRow label={t('nomineeSheet.name')} value={nominee.name} />
          <KeyValueRow label={t('nomineeSheet.relationship')} value={nominee.relationship} />
          <KeyValueRow label={t('nomineeSheet.dob')} value={nominee.dob} />
          <KeyValueRow label={t('nomineeSheet.aadhaar')} value={nominee.aadhaarLast4} />
          <KeyValueRow label={t('nomineeSheet.share')} value={t('nomineeSheet.shareValue', { share: nominee.share })} />
        </KeyValueList>
      </Stack>
    </Sheet>
  )
}
```

### `src/flows/kyc/sheets/PanFoundSheet.tsx`

```tsx
import { useId } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { KeyValueList, KeyValueRow } from '@l3/components/KeyValueList'
import { Stack } from '@l3/components/Stack'
import { msBadge } from '@l3/icons/material'
import { mask } from '../../../shared/data/format'
import { user } from '../../../shared/data/user'
import { Sheet } from '../../../shared/ui/Sheet'
import { Spot } from '../../../shared/ui/Spot'
import { t } from '../copy'
import styles from '../screens/Kyc.module.css'

/** kyc-02 · A PAN is linked to this mobile number: confirm it (masked) or type another. */
export function PanFoundSheet({ onUse, onOther }: { onUse?: () => void; onOther?: () => void }) {
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      onClose={onOther}
      header={<BottomSheetHeader size="lg" headingId={id} icon={<Spot icon={msBadge} tone="discover" size="md" />} heading={t('panFound.title')} description={t('panFound.description')} />}
      footer={
        <ButtonGroup aria-label={t('panFound.actionsLabel')}>
          <Button onClick={onUse}>{t('panFound.use')}</Button>
          <Button variant="secondary" onClick={onOther}>{t('panFound.other')}</Button>
        </ButtonGroup>
      }
    >
      <Stack gap="16">
        <KeyValueList variant="card" aria-label={t('panFound.listLabel')}>
          <KeyValueRow label={t('panFound.name')} value={user.name} />
          <KeyValueRow label={t('panFound.pan')} value={mask(user.pan, 5, 1)} />
        </KeyValueList>
      </Stack>
    </Sheet>
  )
}
```

### `src/flows/kyc/sheets/RiskSheet.tsx`

```tsx
import { useId } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Stack } from '@l3/components/Stack'
import { msWarning } from '@l3/icons/material'
import { Sheet } from '../../../shared/ui/Sheet'
import { Spot } from '../../../shared/ui/Spot'
import { t } from '../copy'
import { riskDisclosure } from '../data'
import styles from '../screens/Kyc.module.css'

/** kyc-07 · SEBI's risk disclosure, shown when F&O is switched on. Must be acknowledged; the source links to SEBI. */
export function RiskSheet({ onAccept, onClose }: { onAccept?: () => void; onClose?: () => void }) {
  const id = useId()
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={<BottomSheetHeader size="lg" headingId={id} icon={<Spot icon={msWarning} tone="warning" size="md" />} heading={t('risk.title')} description={t('risk.description')} />}
      footer={<ButtonGroup aria-label={t('risk.actionsLabel')}><Button fullWidth onClick={onAccept}>{t('risk.accept')}</Button></ButtonGroup>}
    >
      <Stack gap="16">
        <ul className={styles.bullets}>{riskDisclosure.map((r) => <li key={r}>{t(`risk.point.${r}`)}</li>)}</ul>
        <p className={styles.fine}>{t('risk.source')}</p>
      </Stack>
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
