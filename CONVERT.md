# Converting a Lemonn flow (for AI agents and developers)

You were given a link to a flow of the Lemonn app (e.g. `…/flows/market.md`, `…/#/market`, or the GitHub folder
`src/flows/market`). This repo is the **design reference**: React + the Lemonnade V3 (L3) design system, built to
match the Figma designs. Your job is to reproduce the flow in the target codebase (Flutter for Android, or iOS / web),
using that codebase's own architecture, state management and API layer.

## 1. Read, in this order
1. `flows/<id>.md` — one file with everything for the flow: spec, screen list, navigation, all source code, and the
   shared parts it uses. (Machine-readable screen list and navigation: `flows/<id>.json`.)
2. The **spec** section first (what each screen shows, data, rules, edge cases), then the **Build checklist** if the
   flow has one (`src/flows/<id>/CHECKLIST.md`: the small design details that are easy to miss — background, motion,
   exact shapes, which prototype version to build), then the source. Go through the checklist line by line before you
   start and again before you call the flow done; every line is required.
3. For every L3 component used, look it up in the design system:
   https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt (component pages, props, tokens, rules). The component
   name in code = the component name in Figma (`Button` = "L3: Button").
4. If you can open web pages: `#/<screen-id>` plays one screen in a 392 × 872 mockup (the design size), clickable. Figma links are in the screen table.

## 2. What to carry over, and how
| In this repo | In the target app |
|---|---|
| `src/flows/<id>/screens/*` | one screen/route per file; keep the screen ids in comments for traceability |
| `src/flows/<id>/sheets/*` | bottom sheets (modal) |
| `src/flows/<id>/components/*` | widgets used only by this flow |
| `src/shared/ui/*` (Screen, MainNav …) | the app's existing shell / bottom navigation — reuse, don't duplicate |
| `src/flows/<id>/data.ts` types | the data the screens need = the API contract; sample values are examples only |
| `go('<screen-id>')` calls | navigation between screens (push, sheet, replace) as the spec's Navigation section says |
| `@l3/components/*` | the target app's L3 widget with the same name; if it doesn't exist yet, build it once from the L3 docs, as a shared widget |
| `--l3-*` CSS variables | the design tokens (theme) — same names; values per theme in the L3 docs ("Color tokens", "Spacing & radius") |

## 3. Rules
- **Never hard-code** colours, sizes, spacing or radii: use the tokens / theme, so light, dark and the products'
  themes keep working.
- **Same structure, platform idioms:** keep the screen hierarchy, order, copy and states; use the platform's native
  scrolling, keyboard, back behaviour and accessibility.
- **Every state:** empty, loading, error and disabled states listed in the spec are part of the flow.
- **Indian formatting:** amounts ₹1,23,456.78; percent with sign and 2 decimals.
- **System bars are the OS's:** the status bar and the 24px navigation bar (gesture handle) aren't app UI. Draw
  edge-to-edge and inset the content by the system bars, so nothing sits under the gesture handle; colour the
  navigation bar like what sits right above it (the button dock, keypad, bottom navbar or an open sheet).
- **Moving between screens** pushes: forward, the new screen comes in from the right; back, from the left (the
  platform's default page transition). Sheet → sheet over the same page swaps the sheet's content; the page stays.
- **Raised is part of L3:** buttons and pill tabs have the raised look (sheen, bevel, small drop shadow) from the
  design system itself (L3 `components/Raised`, Button 1.9 / Tabs 1.12). Build it as the L3 docs describe it.
- **Don't copy the preview code** (`src/preview/`, `src/main.tsx`, the phone mockup, the list of flows) — it only exists to show
  the flow here.
- When the spec and the code disagree, the spec wins; when both are unclear, the Figma frame decides — ask before
  inventing.

## 4. Updates
Each flow's README has a **Changelog** with dates. When you're given a flow again, compare its changelog (and the git
history of `src/flows/<id>/`) with what was converted before, and change only what changed.
