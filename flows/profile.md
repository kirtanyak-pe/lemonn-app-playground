# Flow: Profile & settings (`profile`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

Your account, app settings (biometric, dark mode, accessibility), help, and logout.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/profile · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/profile.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `profile-01` | Profile | — | `stocks-01`, `profile-02`, `login-01` | The live page 1:1 (scrolls: account, app settings, help, Logout). From the profile icon on Stocks home. |
| `profile-02` | Settings | — | `profile-01` | Three setting cards: Biometric, Theme (Light / Dark / Auto, live), Accessibility (off). |
| `profile-03` | Settings · accessibility on | — | `profile-01` | Accessibility on: darker colours (♿ Accessible theme) and a bigger font together; the illustration shows it. |
| `profile-04` | Settings · couldn’t save | — | `profile-01` | A change didn’t save: error toast with Retry at the bottom; the controls show what’s stored. |
| `profile-05` | Settings B · Appearance row | — | `profile-06`, `profile-01` | A/B version B (Zomato-style): Appearance shows the current theme; tapping it opens the Appearance sheet. |
| `profile-06` | Settings B · Appearance sheet | — | `profile-05`, `profile-01` | Light theme / Dark theme / Use device theme as radio rows; Save preference applies it. |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the screens in this folder and the live app — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/profile · one screen: `#/profile-01`
- **Source:** screenshots of the live app's Profile and Settings pages (dark theme, shared 2026-10-22) and the PM's
  Accessibility proposal (frames 9, 5a, 5b, 7a, 7b). No Figma yet. Redesigned in L3.
- **Status:** ✅ · last updated 2026-10-22
- **Entry:** the profile icon in the Stocks home's top bar (`stocks-01 … 07`). **Exit:** back to Stocks; Logout →
  the welcome screen (`login-01`).

### Screens

| Id | Screen | What it shows / when |
|---|---|---|
| `profile-01` | Profile | The live page 1:1. Grey header (back, name, View Details ›, avatar) that stays put; the list scrolls under its rounded top: **Account Information** (Bank Details · Verified, Balance, Get ₹149 instant balance, Tax and P&L Reports) · **App Settings** (Settings, Kill Switch, Auto TP/SL) · **How can we help?** (Help & Support, Follow us on X, Subscribe on YouTube, Follow us on Instagram, Rate Us, About 7.2.38 (3)) · Logout · the broker's line with Read More |
| `profile-02` | Settings | Three matching setting cards: **Biometric** (switch) · **Theme** (small icon toggle on the right: Light / Dark / Auto) · **Accessibility** (switch, off) |
| `profile-03` | Settings · accessibility on | Accessibility on: darker colours and bigger text together (the screen shows the darker colours) |
| `profile-05` | Settings B · Appearance row | A/B version B (Zomato-style): the Theme card becomes "Appearance" with the current theme (Light / Dark / Automatic) + chevron |
| `profile-06` | Settings B · Appearance sheet | Sheet: Light theme / Dark theme / Use device theme (radio rows) + Save preference; nothing changes until Save |
| `profile-04` | Settings · couldn't save | A change didn't save: error toast "Couldn't save your settings" + Retry |

### Navigation

```
stocks-0x ─profile icon─▶ profile-01 ─Settings─▶ profile-02 ─back─▶ profile-01
                          profile-01 ─Logout─▶ login-01 (welcome) · back ─▶ stocks-01
Every other row (Bank Details, Balance, instant balance, reports, Kill Switch, Auto TP/SL, Help & Support, the social
links, Rate Us, About, View Details) is tappable but goes nowhere in the prototype yet.
```

### Data

From `data.ts` (fictional) and `src/shared/data/user.ts` (the sample user):
- `user.name` (header; avatar initials), `balance` (₹, may be negative: shown `Balance : −₹245.30`),
  `INSTANT_BALANCE` (₹149), `APP_VERSION` (`7.2.38 (3)`).
- Settings: `ThemeChoice` (`light` / `dark` / `auto`), Accessibility on / off, large text = every text style +2px.
- API: get profile (name, avatar, bank verified, balance); save preferences (biometric, theme, text size, darker colours) —
  the save can fail (profile-04).
- The broker's regulatory line: `src/shared/data/broker.ts` (also on the Stocks home).

### Copy

Every user-facing string is in `copy.json` (flat keys → text; `{name}` is filled in by the code). Port it as the
platform's string table (Flutter ARB, iOS Localizable.strings).

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Profile top | Actionbar | `onBack`, no title; the header (name, View Details, avatar, rounded lip) is its `bottom` slot so it doesn't scroll; bar + header on `surface-secondary`, no divider |
| Name | text | Heading/24 |
| View Details › | Button | `variant="ghost"`, `iconRight` chevron |
| Avatar | Avatar | `initials`, 48, filled `surface-accent-discover-default` (live app's blue) |
| Section headings | SectionHeader | `title` + `description`; cards 16 below, 12 apart; sections 32 apart |
| Rows | ListCell `variant="card"`, tappable | `iconLeft` (24), `label`, `description` (`multiline`), `iconRight` chevron |
| Verified | Tag | `size="sm" variant="secondary" color="success"`, in the row's `trailing` |
| About | BrandLogo | `lemonn`, `variant="icon"`, 24, decorative |
| Kill Switch / Auto TP/SL icons | Lemonnade custom icons | `lmKillSwitch`, `lmAutoTpSl` |
| Logout | Button | `variant="tertiary"`, `lg`, full width |
| Disclosure | text + Button | Description/12 tertiary, 5 lines; `ghost` `sm` Read More / Read less |
| Setting cards | Card (static) — `components/SettingCard` | header: icon 24 · Label/16 (+ Description/12, not on Theme) · Switch (the header is a label: tap anywhere toggles); cards 12 apart |
| Theme | Tabs (the card's control, on the right) | `appearance="pill-group"`, `behavior="toggle"`, `size="sm"`, icon-only (`hideLabel`): light_mode / dark_mode / brightness_auto; the description names the choice |
| Failed save | Aerobar (toast) | `floating`, `type="danger"`, `emphasis="primary"`, icon error, `action` Retry |

### Rules & behaviour

- **Profile and Settings copy the live app** (layout, order, copy) — only the parts are L3. No redesign yet.
- **Logout** goes straight to the welcome screen, as in the live app.
- **Settings apply at once** (no Save).
- **Theme:** Light, Dark, or Auto (follows the phone's light / dark setting). CS PRO has only a dark theme → the
  toggle does nothing there.
- **Accessibility:** ONE switch ("Darker colours and bigger text"). On, both apply together:
  - **Darker colours:** L3's ♿ Accessible theme (`data-contrast="accessible"`: stronger secondary / tertiary text,
    borders and accents). Every screen uses semantic tokens, so nothing else changes.
  - **Bigger font:** every text style 2px bigger across the app, line heights too (L3 base sizes 10 → 12 … 36 → 38;
    prototype: `html[data-text-size="large"]` in src/local-tokens.css, src/shared/textSize.ts). Layouts must reflow
    (rows grow, nothing clipped).
- **Motion:** a theme or Accessibility change cross-fades the page, and the chosen theme pill slides to its new place (View Transitions;
  Flutter: `AnimatedSize` + `AnimatedTheme`). None with reduced motion.
- **Saving fails:** the controls show what's stored, and an error toast offers Retry.
- Prototype only: Theme and Darker colours change the prototype's real theme (and stay in this browser).

### Differences from the live app and the PM proposal

- **Profile / Settings:** same layout and copy; parts swapped to L3. The Verified tag sits in the card's trailing slot
  (right side, before the chevron) instead of next to the title — L3's list cell has no tag-after-label slot. The
  avatar is 48 (L3's largest) with initials instead of the large smiley picture. Settings' rounded sticky header
  became the L3 Actionbar.
- **Settings (redesigned, 2026-10-22, at the user's request):** three matching cards. The live Dark Mode switch
  became a Light / Dark / Auto toggle; the PM's "low vision" option became one Accessibility switch that turns on
  darker colours and bigger text together.

### L3 gaps

- **Social brand marks:** no X / YouTube / Instagram logos in L3 (BrandLogo has Lemonn, Zing, CoinSwitch); Material
  stand-ins (campaign, smart display, camera) are used.
- **Avatar colour / size:** no colour option (its default fill disappears on `surface-secondary`, so the profile
  sets the discover fill locally) and nothing above 48.
- **Tag next to a list cell's label:** no slot; the Verified tag goes in `trailing`.
- **Text scale:** L3 has no text-scale tokens; large text is a local override of the base sizes (src/local-tokens.css).
- **Setting card with options:** no L3 component for a card with a switch header and content below
  (`components/SettingCard`).

### Changelog

- 2026-10-22 — first version (6 screens): Profile and Settings replicated from the live app with L3 parts;
  Accessibility (4 states) from the PM proposal.
- 2026-10-22 — Settings redesigned: Theme picker (Light / Dark / Auto), Accessibility with Text size and Darker
  colours; the separate Accessibility screen is gone (4 screens total).
- 2026-10-22 — Settings compacted: three matching setting cards; Theme as a pill toggle; Accessibility = a switch.
- 2026-10-22 — Accessibility: both options ticked when switched on; an example row shows their effect.
- 2026-10-22 — the example became an illustration (phone screen + card + badge), after the user's Android reference.
- 2026-10-22 — motion: accessibility options slide open; theme / darker-colour changes cross-fade, the theme pill slides.
- 2026-10-22 — Accessibility: one switch for darker colours + bigger text (checkboxes removed).
- 2026-10-22 — Accessibility illustration removed (user's call).
- 2026-10-22 — Accessibility on makes every text style 2px bigger across the whole app.
- 2026-10-23 — Theme: a small icon-only Light / Dark / Auto toggle on the right of its card, like the other cards' switches.
- 2026-10-23 — A/B: version B of the theme control — an Appearance card that opens a sheet (radio rows + Save preference).
- 2026-10-23 — the Theme card is called Appearance (both A/B versions).
- 2026-10-23 — version A: tapping anywhere on the Appearance card moves the toggle to the next option (Light → Dark → Auto).


## Source — this flow

### `src/flows/profile/components/CardRow.tsx`

```tsx
import type { ReactNode } from 'react'
import { Icon, type IconSource } from '@l3/components/Icon'
import { ListCell } from '@l3/components/ListCell'
import { msChevronRight } from '@l3/icons/material'

type Props = {
  icon?: IconSource
  /** Anything that isn't a Material / Lemonnade icon (the Lemonn mark). */
  leading?: ReactNode
  label: string
  description?: string
  /** A Tag, or a control (then the row is a label: tapping it toggles the control). */
  trailing?: ReactNode
  /** The row holds a Switch: `as="label"`, no chevron. */
  toggle?: boolean
  onClick?: () => void
}

/**
 * One row of the live app's profile / settings lists, as an L3 card row (ListCell `variant="card"`): icon · label +
 * description (wraps) · tag / switch · chevron. Tappable rows are clickable cards; switch rows toggle on a tap anywhere.
 */
export function CardRow({ icon, leading, label, description, trailing, toggle = false, onClick }: Props) {
  const iconLeft = leading ?? (icon && <Icon icon={icon} />)
  if (toggle) return <ListCell variant="card" as="label" iconLeft={iconLeft} label={label} description={description} multiline trailing={trailing} />
  return (
    <ListCell
      variant="card"
      onClick={onClick ?? (() => {})}
      iconLeft={iconLeft}
      label={label}
      description={description}
      multiline
      trailing={trailing}
      iconRight={<Icon icon={msChevronRight} />}
    />
  )
}
```

### `src/flows/profile/components/SettingCard.module.css`

```css
/* Header row of a setting card: icon · text · control (same rhythm as an L3 list cell). */
.head {
  display: flex;
  gap: var(--l3-spacing-12);
  align-items: center;
  color: var(--l3-content-primary);
  cursor: default;
}

label.head,
.head[data-cycle] {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.text {
  flex: 1;
  min-width: 0;
}

.label {
  font: var(--l3-text-label-16);
  color: var(--l3-content-primary);
}

.description {
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}

/* Content under the header, 12 below it. */
.more {
  padding-top: var(--l3-spacing-12);
}
```

### `src/flows/profile/components/SettingCard.tsx`

```tsx
import type { ReactNode } from 'react'
import { Card } from '@l3/components/Card'
import { Icon, type IconSource } from '@l3/components/Icon'
import { Stack } from '@l3/components/Stack'
import styles from './SettingCard.module.css'

type Props = {
  icon: IconSource
  label: string
  description?: string
  /** The control on the right: a Switch (default — the header is then a <label>, a tap anywhere toggles it) or a
   *  small segmented toggle (`controlType="choice"` — the header stays a plain row). */
  control?: ReactNode
  controlType?: 'switch' | 'choice'
  /** `choice` cards: a tap anywhere on the card (outside the toggle) moves the toggle to its next option. */
  onCycle?: () => void
  /** The whole card opens something (a sheet): a clickable L3 Card; `control` then shows the current value + chevron. */
  onClick?: () => void
  /** What the setting opens up underneath (theme choices, accessibility options), 12 below the header. */
  children?: ReactNode
}

/**
 * One setting on the Settings page, all built the same so the page reads as one set: a static L3 Card (12 padding)
 * with a header row — icon · label (Label/16) + description (Description/12) · control (switch or small toggle) —
 * and optional content below
 */
export function SettingCard({ icon, label, description, control, controlType = 'switch', onClick, onCycle, children }: Props) {
  const Head = control && controlType === 'switch' && !onClick ? 'label' : 'div'
  return (
    <Card onClick={onClick}>
      <Stack>
        <Head className={styles.head} data-cycle={onCycle ? '' : undefined} onClick={onCycle}>
          <Icon size={20} icon={icon} />
          <Stack gap="04" className={styles.text}>
            <span className={styles.label}>{label}</span>
            {description && <span className={styles.description}>{description}</span>}
          </Stack>
          {onCycle ? <span onClick={(e) => e.stopPropagation()}>{control}</span> : control}
        </Head>
        {children && <div className={styles.more}>{children}</div>}
      </Stack>
    </Card>
  )
}
```

### `src/flows/profile/copy.json`

```json
{
  "profile.viewDetails": "View Details",
  "profile.avatarLabel": "Profile picture",
  "account.title": "Account Information",
  "account.description": "Find all your profile-related information",
  "account.bank": "Bank Details",
  "account.bankVerified": "Verified",
  "account.bankHint": "This account is used to facilitate all your deposits and withdrawal",
  "account.balance": "Balance : {amount}",
  "account.balanceHint": "Check your account balance",
  "account.instant": "Get {amount} instant balance",
  "account.instantHint": "For intraday, MTF, F&O",
  "account.reports": "Tax and P&L Reports",
  "account.reportsHint": "For Stocks and F&O",
  "appSettings.title": "App Settings",
  "appSettings.description": "Get the best out of your Lemonn profile",
  "appSettings.settings": "Settings",
  "appSettings.settingsHint": "Edit security or display settings",
  "appSettings.killSwitch": "Kill Switch",
  "appSettings.killSwitchHint": "Pause new trading for today",
  "appSettings.autoTpSl": "Auto TP/SL",
  "appSettings.autoTpSlHint": "Automate TP/SL limits",
  "help.title": "How can we help?",
  "help.description": "We're here for you 24x7",
  "help.support": "Help & Support",
  "help.supportHint": "Contact Us",
  "help.x": "Follow us on X",
  "help.xHint": "Stay updated with the latest news",
  "help.youtube": "Subscribe on YouTube",
  "help.youtubeHint": "Check out our latest videos",
  "help.instagram": "Follow us on Instagram",
  "help.instagramHint": "Get to know our Insta community",
  "help.rate": "Rate Us",
  "help.rateHint": "Tell us what you think",
  "help.about": "About",
  "logout.button": "Logout",
  "disclosure.more": "Read More",
  "disclosure.less": "Read less",
  "settings.title": "Settings",
  "settings.biometric": "Biometric",
  "settings.biometricHint": "Login with your fingerprint",
  "settings.theme": "Theme",
  "settings.themeLight": "Light",
  "settings.themeDark": "Dark",
  "settings.themeAuto": "Auto",
  "settings.accessibility": "Accessibility",
  "settings.accessibilityHint": "Darker colours and bigger text",
  "settings.saveFailed": "Couldn’t save your settings",
  "settings.retry": "Retry",
  "settings.themeLabel": "Appearance",
  "settings.theme.light": "Light",
  "settings.theme.dark": "Dark",
  "settings.theme.auto": "Auto · follows your phone",
  "appearance.title": "Appearance",
  "appearance.light": "Light theme",
  "appearance.dark": "Dark theme",
  "appearance.auto": "Use device theme",
  "appearance.save": "Save preference",
  "appearance.value.light": "Light",
  "appearance.value.dark": "Dark",
  "appearance.value.auto": "Automatic"
}
```

### `src/flows/profile/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of Profile & settings is in copy.json: t('settings.title'), t('profile.clientId', { id }). */
export const t = makeCopy('profile', copy)
```

### `src/flows/profile/data.ts`

```ts
// Sample data for Profile & settings. FICTIONAL — the live screenshots show a real customer's name and balance; never
// copy them. The person is the app's sample user (src/shared/data/user.ts).
import { bankAccount, user } from '../../shared/data/user'

export { bankAccount, user }

/** The trading balance (₹). Can be negative when charges are due — shown as "−₹…". */
export const balance = -245.3

/** The instant-balance offer (₹, for intraday, MTF and F&O). */
export const INSTANT_BALANCE = 149

/** The app version shown under About. */
export const APP_VERSION = '7.2.38 (3)'


/** Theme choices: Auto follows the phone's light / dark setting. */
export type ThemeChoice = 'light' | 'dark' | 'auto'

/** Initials for the avatar: "Rohan Mehta" → "RM". */
export const initials = (name = user.name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('')
```

### `src/flows/profile/index.tsx`

```tsx
import type { Flow } from '../types'
import { Profile } from './screens/Profile'
import { Settings } from './screens/Settings'

/**
 * Profile & settings — opened from the profile icon on the Stocks home. The live app's Profile and Settings pages
 * (screenshots, 2026-10-22) rebuilt 1:1 with L3 parts, plus the PM's Accessibility screens (redrawn in L3). No Figma yet.
 */
export const profile: Flow = {
  id: 'profile',
  title: 'Profile & settings',
  description: 'Your account, app settings (biometric, dark mode, accessibility), help, and logout.',
  figmaFile: '',
  sections: [
    { id: 'profile', title: 'Profile' },
    { id: 'settings', title: 'Settings' },
    { id: 'settings-b', title: 'Settings · version B (A/B test)' },
  ],
  screens: [
    {
      id: 'profile-01', section: 'profile', name: 'Profile', figma: '',
      note: 'The live page 1:1 (scrolls: account, app settings, help, Logout). From the profile icon on Stocks home.',
      render: (go) => <Profile onBack={() => go('stocks-01')} onSettings={() => go('profile-02')} onLogout={() => go('login-01')} />,
    },
    {
      id: 'profile-02', section: 'settings', name: 'Settings', figma: '',
      note: 'Three setting cards: Biometric, Theme (Light / Dark / Auto, live), Accessibility (off).',
      render: (go) => <Settings onBack={() => go('profile-01')} />,
    },
    {
      id: 'profile-03', section: 'settings', name: 'Settings · accessibility on', figma: '',
      note: 'Accessibility on: darker colours (♿ Accessible theme) and a bigger font together; the illustration shows it.',
      render: (go) => <Settings lowVision onBack={() => go('profile-01')} />,
    },
    {
      id: 'profile-04', section: 'settings', name: 'Settings · couldn’t save', figma: '',
      note: 'A change didn’t save: error toast with Retry at the bottom; the controls show what’s stored.',
      render: (go) => <Settings saveFailed onBack={() => go('profile-01')} />,
    },
    {
      id: 'profile-05', section: 'settings-b', name: 'Settings B · Appearance row', figma: '',
      note: 'A/B version B (Zomato-style): Appearance shows the current theme; tapping it opens the Appearance sheet.',
      render: (go) => <Settings themeUI="sheet" onAppearance={() => go('profile-06')} onBack={() => go('profile-01')} />,
    },
    {
      id: 'profile-06', section: 'settings-b', name: 'Settings B · Appearance sheet', figma: '',
      note: 'Light theme / Dark theme / Use device theme as radio rows; Save preference applies it.',
      render: (go) => <Settings themeUI="sheet" appearanceOpen onAppearanceClose={() => go('profile-05')} onBack={() => go('profile-01')} />,
    },
  ],
}
```

### `src/flows/profile/screens/Profile.module.css`

```css
/* Profile & settings — text styles and the profile's grey header; layout comes from the L3 layout blocks. */

.grow {
  flex: 1;
  min-width: 0;
}

/* Live app: the profile's top bar sits on the same grey as its header, with no divider (the lip separates them).
   Doubled class: wins over the Actionbar's own surface + border. */
.headerBar.headerBar {
  background: var(--l3-surface-secondary);
  border-bottom-color: transparent;
  box-shadow: none;
}

.header {
  padding-top: var(--l3-spacing-08);
  background: var(--l3-surface-secondary);
}

/* The rounded top of the list: the page scrolls under it, so it stays put like the live app's sheet. */
.lip {
  height: var(--l3-spacing-24);
  margin-top: var(--l3-spacing-32);
  border-radius: var(--l3-radius-32) var(--l3-radius-32) 0 0;
  background: var(--l3-surface-default);
}

.sheet {
  padding-bottom: var(--l3-spacing-32);
}

.name {
  font: var(--l3-text-heading-24);
  color: var(--l3-content-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text {
  margin: 0;
  font: var(--l3-text-description-14);
  color: var(--l3-content-secondary);
}

.fine {
  margin: 0;
  font: var(--l3-text-description-12);
  color: var(--l3-content-tertiary);
}

/* Disclosure: 5 lines, then "Read More". */
.clamp {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
}

/* Accessibility: the screen carries its own theme attributes (data-product / data-mode / data-contrast), so low
   vision mode shows in ♿ Accessible colours on the screen itself. The wrapper adds no box. */
.scope {
  display: contents;
}

/* Live app: a blue avatar on the grey header (L3 Avatar has no colour option and its default fill disappears on the
   grey — L3 gap). Doubled class: wins over the Avatar's own fill. */
.avatar.avatar {
  background: var(--l3-surface-accent-discover-default);
  color: var(--l3-content-inverted);
}

.rowHint {
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}

/* Theme change (view transition): the chosen pill slides to its new place while the page's colours cross-fade. */
.themeTabs [aria-selected='true'] {
  view-transition-name: theme-pill;
}

:global(::view-transition-group(theme-pill)),
:global(::view-transition-old(root)),
:global(::view-transition-new(root)) {
  animation-duration: var(--l3-motion-duration-medium);
  animation-timing-function: var(--l3-motion-easing-standard);
}

/* Settings B: the Appearance card's current value + chevron, where the other cards have their switch. */
.value {
  display: inline-flex;
  flex: none;
  gap: var(--l3-spacing-04);
  align-items: center;
  font: var(--l3-text-description-14);
  color: var(--l3-content-secondary);
}
```

### `src/flows/profile/screens/Profile.tsx`

```tsx
import { useState, type ReactNode } from 'react'
import { Actionbar } from '@l3/components/Actionbar'
import { Avatar } from '@l3/components/Avatar'
import { BrandLogo } from '@l3/components/BrandLogo'
import { Button } from '@l3/components/Button'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { lmAutoTpSl, lmKillSwitch } from '@l3/icons/lemonnade'
import {
  msAccountBalance, msAccountBalanceWallet, msBolt, msCampaign, msChevronRight, msPhotoCamera, msReceiptLong, msReviews,
  msSettings, msSmartDisplay, msSupportAgent,
} from '@l3/icons/material'
import { disclosure } from '../../../shared/data/broker'
import { inr } from '../../../shared/data/format'
import { Screen } from '../../../shared/ui/Screen'
import { CardRow } from '../components/CardRow'
import { t } from '../copy'
import { APP_VERSION, INSTANT_BALANCE, balance, initials, user } from '../data'
import styles from './Profile.module.css'

type Props = {
  onBack?: () => void
  onSettings?: () => void
  onLogout?: () => void
}

/** "−₹245.30" for a negative amount (a real minus sign, before the ₹). */
const signedInr = (n: number) => (n < 0 ? `−${inr(-n)}` : inr(n))

/** A section of the list: heading + description, then its card rows 12 apart. */
function Group({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <Stack gap="16" as="section" aria-label={title}>
      <SectionHeader title={title} description={description} />
      <Stack gap="12">{children}</Stack>
    </Stack>
  )
}

/**
 * profile-01 · Profile — the live app's page, rebuilt 1:1 with L3 parts. Opened from the profile icon on the Stocks
 * home. A grey header (back, name, View Details ›, avatar) with the list on a rounded sheet over it: Account
 * Information, App Settings, How can we help? — every row a card — then Logout and the broker's line (Read More).
 */
export function Profile({ onBack, onSettings, onLogout }: Props) {
  const [more, setMore] = useState(false)
  return (
    <Screen
      top={
        // The header doesn't scroll (live app): it's the Actionbar's content-bottom slot, ending in the rounded lip
        // the list scrolls under.
        <Actionbar
          onBack={onBack}
          className={styles.headerBar}
          bottom={
            <div className={styles.header}>
              <Inset paddingInline="16" paddingBlock="00">
                <Stack direction="horizontal" gap="16" align="center" justify="between">
                  <Stack gap="04" align="start" className={styles.grow}>
                    <span className={styles.name}>{user.name}</span>
                    <Button variant="ghost" iconRight={<Icon icon={msChevronRight} />} onClick={() => {}}>{t('profile.viewDetails')}</Button>
                  </Stack>
                  <Avatar initials={initials()} size={48} label={t('profile.avatarLabel')} className={styles.avatar} />
                </Stack>
              </Inset>
              <div className={styles.lip} aria-hidden="true" />
            </div>
          }
        />
      }
    >
      <div className={styles.sheet}>
        <Inset paddingInline="16" paddingBlock="00">
          <Stack gap="32">
            <Group title={t('account.title')} description={t('account.description')}>
              <CardRow
                icon={msAccountBalance}
                label={t('account.bank')}
                description={t('account.bankHint')}
                trailing={<Tag size="sm" variant="secondary" color="success">{t('account.bankVerified')}</Tag>}
              />
              <CardRow icon={msAccountBalanceWallet} label={t('account.balance', { amount: signedInr(balance) })} description={t('account.balanceHint')} />
              <CardRow icon={msBolt} label={t('account.instant', { amount: inr(INSTANT_BALANCE, 0) })} description={t('account.instantHint')} />
              <CardRow icon={msReceiptLong} label={t('account.reports')} description={t('account.reportsHint')} />
            </Group>

            <Group title={t('appSettings.title')} description={t('appSettings.description')}>
              <CardRow icon={msSettings} label={t('appSettings.settings')} description={t('appSettings.settingsHint')} onClick={onSettings} />
              <CardRow icon={lmKillSwitch} label={t('appSettings.killSwitch')} description={t('appSettings.killSwitchHint')} />
              <CardRow icon={lmAutoTpSl} label={t('appSettings.autoTpSl')} description={t('appSettings.autoTpSlHint')} />
            </Group>

            <Group title={t('help.title')} description={t('help.description')}>
              <CardRow icon={msSupportAgent} label={t('help.support')} description={t('help.supportHint')} />
              <CardRow icon={msCampaign} label={t('help.x')} description={t('help.xHint')} />
              <CardRow icon={msSmartDisplay} label={t('help.youtube')} description={t('help.youtubeHint')} />
              <CardRow icon={msPhotoCamera} label={t('help.instagram')} description={t('help.instagramHint')} />
              <CardRow icon={msReviews} label={t('help.rate')} description={t('help.rateHint')} />
              <CardRow leading={<BrandLogo brand="lemonn" variant="icon" size={24} decorative />} label={t('help.about')} description={APP_VERSION} />
            </Group>

            <Button variant="tertiary" fullWidth onClick={onLogout}>{t('logout.button')}</Button>

            <Stack gap="04" align="start">
              <p className={more ? styles.fine : `${styles.fine} ${styles.clamp}`}>{disclosure}</p>
              <Button variant="ghost" size="sm" onClick={() => setMore((m) => !m)}>{more ? t('disclosure.less') : t('disclosure.more')}</Button>
            </Stack>
          </Stack>
        </Inset>
      </div>
    </Screen>
  )
}
```

### `src/flows/profile/screens/Settings.tsx`

```tsx
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Actionbar } from '@l3/components/Actionbar'
import { Aerobar } from '@l3/components/Aerobar'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { Stack } from '@l3/components/Stack'
import { Switch } from '@l3/components/Switch'
import { Tabs } from '@l3/components/Tabs'
import { msAccessibilityNew, msBrightnessAuto, msChevronRight, msDarkMode, msError, msFingerprint, msLightMode, msPalette } from '@l3/icons/material'
import { useTheme } from '@l3/theme'
import { usePreview } from '../../../shared/prototype'
import { largeText } from '../../../shared/textSize'
import { Screen } from '../../../shared/ui/Screen'
import { SettingCard } from '../components/SettingCard'
import { AppearanceSheet } from '../sheets/AppearanceSheet'
import { t } from '../copy'
import { type ThemeChoice } from '../data'
import styles from './Profile.module.css'

type Props = {
  /** Board states: Accessibility on / off; the prototype otherwise starts from the app's real theme. */
  lowVision?: boolean
  /** A save that just failed: the error toast with Retry. */
  saveFailed?: boolean
  /**
   * A/B test of the theme control. 'toggle' (A): a small Light / Dark / Auto icon toggle on the card. 'sheet' (B,
   * Zomato-style): an Appearance card showing the current theme; tapping it opens the Appearance sheet.
   */
  themeUI?: 'toggle' | 'sheet'
  /** B: the Appearance sheet is open. */
  appearanceOpen?: boolean
  onAppearance?: () => void
  onAppearanceClose?: () => void
  onBack?: () => void
}

/**
 * Theme change, animated: the browser's View Transition cross-fades the old colours into the new ones, and the chosen
 * pill (view-transition-name in Profile.module.css) slides to its new place. Plain change where it isn't supported or
 * motion is reduced.
 */
const withTransition = (change: () => void) => {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return change()
  doc.startViewTransition(() => flushSync(change))
}

const themeChoices: { value: ThemeChoice; label: string; icon: typeof msLightMode }[] = [
  { value: 'light', label: t('settings.themeLight'), icon: msLightMode },
  { value: 'dark', label: t('settings.themeDark'), icon: msDarkMode },
  { value: 'auto', label: t('settings.themeAuto'), icon: msBrightnessAuto },
]

/**
 * profile-02 … 04 · Settings — three setting cards built the same way (icon · label + description · control):
 *  - Biometric: a switch.
 *  - Theme, A/B (`themeUI`): A = a small icon-only Light / Dark / Auto toggle on the right (the description names
 *    the choice); B = an Appearance card with the current theme + chevron that opens the Appearance sheet (radio
 *    rows + Save preference, Zomato-style).
 *  - Accessibility: one switch that turns on darker colours (L3's ♿ Accessible theme) and a bigger font (every text
 *    style 2px bigger, app-wide) together.
 * Everything applies at once. Prototype: Theme and darker colours set the app's real theme (L3 ThemeProvider); the
 * screen also carries the contrast it shows; the bigger text applies to the whole prototype (src/shared/textSize).
 */
export function Settings({ lowVision, saveFailed = false, themeUI = 'toggle', appearanceOpen = false, onAppearance, onAppearanceClose, onBack }: Props) {
  const theme = useTheme()
  const { interactive } = usePreview()
  const [biometric, setBiometric] = useState(true)
  // One switch: on = darker colours and the bigger font together.
  const [on, setOn] = useState(lowVision ?? (theme.contrast === 'accessible' || largeText.get()))
  const [failed, setFailed] = useState(saveFailed)
  const themeChoice: ThemeChoice = theme.modePreference === 'system' ? 'auto' : theme.modePreference

  const pickTheme = (v: ThemeChoice) => {
    if (theme.availableModes.length > 1) withTransition(() => theme.setModePreference(v === 'auto' ? 'system' : v))
  }

  const toggle = (next: boolean) => {
    const apply = () => {
      setOn(next)
      setFailed(false)
      if (interactive) {
        theme.setContrast(next ? 'accessible' : 'default')
        largeText.set(next)
      }
    }
    // The colours of the whole page change: cross-fade them like a theme change.
    withTransition(apply)
  }

  return (
    <div className={styles.scope} data-product={theme.product} data-mode={theme.mode} data-contrast={on ? 'accessible' : undefined}>
      <Screen
        top={<Actionbar title={t('settings.title')} onBack={onBack} />}
        sheet={
          themeUI === 'sheet' && appearanceOpen && (
            <AppearanceSheet
              current={themeChoice}
              onClose={onAppearanceClose}
              onSave={(c) => { if (theme.availableModes.length > 1) withTransition(() => theme.setModePreference(c === 'auto' ? 'system' : c)); onAppearanceClose?.() }}
            />
          )
        }
        toast={
          failed && (
            <Aerobar
              floating
              type="danger"
              emphasis="primary"
              icon={<Icon icon={msError} />}
              heading={t('settings.saveFailed')}
              action={{ label: t('settings.retry'), onClick: () => setFailed(false) }}
              onDismiss={() => setFailed(false)}
            />
          )
        }
      >
        <div>
          <Inset padding="16">
            <Stack gap="12">
              <SettingCard
                icon={msFingerprint}
                label={t('settings.biometric')}
                description={t('settings.biometricHint')}
                control={<Switch checked={biometric} onChange={(e) => setBiometric(e.target.checked)} />}
              />

              {themeUI === 'sheet' ? (
                <SettingCard
                  icon={msPalette}
                  label={t('appearance.title')}
                  onClick={onAppearance}
                  control={
                    <span className={styles.value}>
                      {t(`appearance.value.${themeChoice}`)}
                      <Icon icon={msChevronRight} size={20} />
                    </span>
                  }
                />
              ) : (
                <SettingCard
                  icon={msPalette}
                  label={t('settings.theme')}
                  description={t(`settings.theme.${themeChoice}`)}
                  controlType="choice"
                  // A tap on the card (outside the toggle) moves to the next option: Light → Dark → Auto → Light.
                  onCycle={() => pickTheme(themeChoices[(themeChoices.findIndex((c) => c.value === themeChoice) + 1) % themeChoices.length].value)}
                  control={
                    <Tabs
                      appearance="pill-group"
                      behavior="toggle"
                      size="sm"
                      aria-label={t('settings.themeLabel')}
                      items={themeChoices.map((c) => ({ value: c.value, label: c.label, hideLabel: true, iconLeft: <Icon icon={c.icon} size={16} /> }))}
                      value={themeChoice}
                      className={styles.themeTabs}
                      onChange={pickTheme}
                    />
                  }
                />
              )}

              <SettingCard
                icon={msAccessibilityNew}
                label={t('settings.accessibility')}
                description={t('settings.accessibilityHint')}
                control={<Switch checked={on} onChange={(e) => toggle(e.target.checked)} />}
              />
            </Stack>
          </Inset>
        </div>
      </Screen>
    </div>
  )
}
```

### `src/flows/profile/sheets/AppearanceSheet.tsx`

```tsx
import { useId, useState } from 'react'
import { BottomSheetHeader } from '@l3/components/BottomSheet'
import { Button } from '@l3/components/Button'
import { ButtonGroup } from '@l3/components/ButtonGroup'
import { Radio } from '@l3/components/Checkbox'
import { ListCell } from '@l3/components/ListCell'
import { Sheet } from '../../../shared/ui/Sheet'
import { t } from '../copy'
import type { ThemeChoice } from '../data'

const choices: ThemeChoice[] = ['light', 'dark', 'auto']

/**
 * profile-06 · Appearance (version B, Zomato-style): a sheet with the three themes as radio rows — Light theme, Dark
 * theme, Use device theme — and Save preference. Nothing changes until Save; a backdrop tap or drag down cancels.
 */
export function AppearanceSheet({ current, onSave, onClose }: { current: ThemeChoice; onSave?: (choice: ThemeChoice) => void; onClose?: () => void }) {
  const id = useId()
  const [picked, setPicked] = useState<ThemeChoice>(current)
  return (
    <Sheet
      labelledBy={id}
      onClose={onClose}
      header={<BottomSheetHeader headingId={id} heading={t('appearance.title')} />}
      footer={
        <ButtonGroup aria-label={t('appearance.title')}>
          <Button fullWidth onClick={() => onSave?.(picked)}>{t('appearance.save')}</Button>
        </ButtonGroup>
      }
    >
      <div role="radiogroup" aria-labelledby={id}>
        {choices.map((c) => (
          <ListCell
            key={c}
            as="label"
            label={t(`appearance.${c}`)}
            trailing={<Radio name={`${id}-theme`} checked={picked === c} onChange={() => setPicked(c)} />}
          />
        ))}
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

### `src/shared/data/broker.ts`

```ts
// The broker behind the Lemonn app — shown wherever the app needs its regulatory line (Stocks home, Profile).

/** The broker's regulatory line, in full. */
export const disclosure =
  'The online broking and mutual fund execution services are provided by NU Investors Technologies Pvt. Ltd. | CIN U67200MH2021PTC364704 | SEBI Registration No. INZ000304837 | SEBI DP Registration No. IN-DP-712-2022 | SEBI Research Analyst Registration No. INH000016764 | NSE member code 90251.'
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

### `src/shared/textSize.ts`

```ts
// Large text (Settings → Accessibility): every text style 2px bigger across the app (src/local-tokens.css,
// html[data-text-size="large"]). Saved on this phone. In a real app: the app-wide text scale setting.
const KEY = 'lemonn-app-large-text'

const apply = (on: boolean) => {
  if (on) document.documentElement.dataset.textSize = 'large'
  else delete document.documentElement.dataset.textSize
}

export const largeText = {
  get: () => {
    try { return localStorage.getItem(KEY) === '1' } catch { return false }
  },
  set: (on: boolean) => {
    apply(on)
    try { if (on) localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY) } catch { /* storage off: this visit only */ }
  },
}

/** On app start: put back the saved choice. */
export const applySavedTextSize = () => apply(largeText.get())
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
