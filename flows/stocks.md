# Flow: Stocks (`stocks`)

> One self-contained file for converting this flow to another platform. Read https://kirtanyak-pe.github.io/lemonn-app-prototype/CONVERT.md first. Design system: Lemonnade V3 @ `cdf73c6` (components, tokens and rules: https://kirtanyak-pe.github.io/lemonnade-v3-docs/llms.txt).

The Stocks tab — the home after login: indices, holdings, products, movers, watchlists, ideas.

Prototype: https://kirtanyak-pe.github.io/lemonn-app-prototype/#/stocks · machine-readable: https://kirtanyak-pe.github.io/lemonn-app-prototype/flows/stocks.json

## Screens

| Id | Screen | Figma | Taps go to | Note |
|---|---|---|---|---|
| `stocks-01` | Home | — | `search-01`, `profile-01`, `dash-02` | Top of the page: search, indices, holdings, products, shortcuts. |
| `stocks-02` | Home · top movers & watchlists | — | `search-01`, `profile-01`, `dash-02` | Same page, scrolled. |
| `stocks-03` | Home · top losers | — | `search-01`, `profile-01`, `dash-02` | The "Top losers" chip picked. |
| `stocks-04` | Home · Smart Invest | — | `search-01`, `profile-01`, `dash-02` | Same page, scrolled: managed strategies, then the announcement. |
| `stocks-05` | Home · sectors & highlights | — | `search-01`, `profile-01`, `dash-02` | Same page, scrolled. |
| `stocks-06` | Home · highlights & idea baskets | — | `search-01`, `profile-01`, `dash-02` | Same page, scrolled. (The live app no longer has Trade ideas here — removed 2026-10-22.) |
| `stocks-07` | Home · idea baskets & disclosure | — | `search-01`, `profile-01`, `dash-02` | The end of the page: the disclosure, four lines and Read More. |
| `stocks-08` | Home · DASH coach mark | [5612:44075]() | `search-01`, `profile-01`, `dash-02` | First visit after DASH launches: an L3 coach mark on the DASH pill (Figma "Intro" in DASH AI main flow). Got it! or the pill opens DASH. |

## Spec (README.md)


> The spec for this flow. A developer should be able to build it on any platform (Flutter, iOS, web) from this file,
> the screens in this folder and the live app — without reading the rest of the repo.

- **Prototype:** https://kirtanyak-pe.github.io/lemonn-app-prototype/#/stocks · one screen: `#/stocks-01`
- **Source:** screenshots of the live app's Stocks tab (dark theme), shared 2026-10-17 — there's no Figma for it yet.
  Rebuilt in L3.
- **Status:** 🟨 Home done (re-matched to the live app over ADB, 2026-10-22); search is its own flow (`search`), opened from the top bar (stock page and lists come next) · 2026-10-19
- **Entry:** the app's home: after login (returning user), after account setup ("Explore stocks first"), after the
  first deposit ("Start investing"); the Stocks tab of the main navbar. **Exit:** everything on the page opens its
  own screen (not built yet).

### Screens

One long, scrolling L1 page. The board shows it as frames scrolled to each part, like the screenshots.

| Id | Screen | What it shows / when |
|---|---|---|
| `stocks-01` | Home | Top bar (search, wallet, profile) · index strip · current holdings · product cards · Do more with Lemonn |
| `stocks-02` | Home · top movers & watchlists | Top movers (chips + two rows of stock cards) · watchlists |
| `stocks-03` | Home · top losers | The "Top losers" chip picked |
| `stocks-04` | Home · Smart Invest | Strategies on the brand tint · the announcement · sectors |
| `stocks-05` | Home · sectors & highlights | Sectors · Highlights (Mutual funds, F&O) |
| `stocks-06` | Home · highlights & idea baskets | Highlights (Mutual Funds, F&O) · Invest in Ideas |
| `stocks-08` | Home · DASH coach mark | First visit after DASH launches: "DASH AI" coach mark on the DASH pill (Figma 5612:44075) |
| `stocks-07` | Home · idea baskets & disclosure | Invest in ideas (baskets) · the broker's regulatory line |

### Page structure (top to bottom)

1. **Top bar (sticky, this screen's own — not the L3 Actionbar):** profile initials (34, opens Profile) · search pill
   (38, opens Search) · **DASH pill** (opens DASH AI, `dash-02`; Figma "Dash entry point" 11492:7740) · Wallet (38).
   16 at the sides, 12 between (Figma home with DASH). First visit after DASH launches: an L3 coach mark on the pill
   (`stocks-08`). Tapping the search field opens Search
   (`search-01`, the Search flow: Stocks tab, keyboard up); nothing is typed on Home. Back on Search returns here.
2. **Summary area** (grey, `surface/secondary`):
   - **Index strip** (scrolls sideways): NIFTY 50 / SENSEX / NIFTY BANK — value, day change; each opens its chart.
   - **Current holdings:** the value (the page's biggest number) and the overall return; the block opens Portfolio.
   - **Products:** Mutual funds (240+ funds) · Equity F&O (0 slippage) · Commodities (0 brokerage, "New").
3. **Feed** on a rounded sheet over the summary area (radius 32 at the top), sections 32 apart:
   - **Do more with Lemonn:** Trade ideas · IPO ("8 new") · Watchlist (count) · Refer & earn ("New").
   - **Top movers:** chips Top gainers / Top losers / Under ₹100 → two rows of stock cards (logo, symbol, price,
     change). View all.
   - **Watchlist:** the user's watchlists (name, stock count). New watchlist.
   - **Smart Invest** (brand tint): strategy cards — name, min. deposit, last week's daily results, AUM, slots left;
     footer: monthly charges (₹0, was ₹300) and Invest now. Tag "NSE/BSE approved".
   - **Announcements:** the campaign's artwork (one banner, the whole banner opens it — live: Jio Platforms IPO).
   - **Invest in sectors:** sector cards — stock count and the day's change. View all.
   - **Highlights:** Mutual funds (tax saving: up to ₹46,800 a year) · F&O (Nifty 50 today).
   - **Invest in ideas:** baskets — their stocks' logos, name, count.
   - **Disclosure:** the broker's registration line, four lines, then "Read More" opens it in place.
4. **Main navbar:** Stocks (selected) · Market · Portfolio · Mutual Fund · F&O.

### Data

- `src/shared/data/companies.ts` — the company catalogue (56 NSE stocks: profile, design-system logo, market data from
  a real Yahoo Finance snapshot). **Top movers come from it:** `topMovers(list)` in `data.ts` — Top gainers = the
  biggest risers today (up only), Top losers = the biggest fallers (down only), Under ₹100 = the cheapest stocks,
  cheapest first (the catalogue carries IDEA, YESBANK, SOUTHBANK, SUZLON, NHPC, IRFC for it); six cards each. The
  movers section calls `useMarketSnapshot()`, so prices re-render when the app re-reads `./market-snapshot.json`
  (on load and every 5 minutes; the site refreshes that file every 15 minutes in NSE hours). Near-live, not live.
- `src/shared/data/market.ts` — `indices[]` and `stocks` (symbol, name, price, day change %, initials, `logoUrl`).
  Shared with Market / F&O. Values are samples from the live app — still used by the index strip, the idea baskets'
  logos and the F&O highlight (Nifty 50 change).
- `src/shared/data/portfolio.ts` — `holdings` (current value, return %) and `watchlists[]`. **Fictional** (the
  screenshots are a real account).
- `data.ts` — `products`, `shortcuts` (with badge count / text), `topMovers(list)` (three lists, from the catalogue), `strategies`,
  `announcement`, `sectors`, `highlights`, `tradeIdeas`, `ideaBaskets`, `disclosure`. Each is one API section.
- API: one home call (sections in order, each optional) + live prices for the index strip and the stock cards.

### Components (L3 → any platform)

| Where | L3 component (Figma name) | Props / variant |
|---|---|---|
| Top bar | Actionbar | `search` (placeholder "Search stocks") + 2 `ActionbarAction`s (Wallet, Profile) |
| Index strip, holdings, shortcuts | Card | `variant="flat"`, `padding="none"`, `onClick` (tap targets with no card look) |
| Changes (indices, holdings, stocks, sectors, ideas) | PriceChange | `sm` in cards, `lg` + `arrow` next to big numbers |
| Products, movers, sectors, baskets, highlights, ideas, strategies | Card | clickable (`onClick`); strategies `padding="none"` + `footerFilled`; highlights / ideas `footer` |
| Section titles | SectionHeader | View all / New watchlist = `action: view-all`; Smart Invest / Trade ideas = `tag` |
| Movers chips | Tabs | `appearance="pill"` (filter: hug + scroll), icon left |
| Stock / basket logos | Avatar | `src` = logo URL, falls back to `initials`; 40 (48 in ideas); baskets `shape="rounded"` |
| Watchlists | ListCell | `variant="card"`, `as="button"`, Avatar left, chevron right |
| Shortcut / highlight art | **Illustration slot** (`Spot`, src/shared/ui) | md 64, success / discover / brand tone |
| Counts / "New" | Badge (`count`) · Tag (`error`, `sm`) | over the shortcut's icon |
| Rows that scroll sideways | **Rail** (src/shared/ui) | `visible` = how many show (a fraction lets the next peek); `rows={2}` for movers |
| Buttons | Button | Invest now / Explore = tertiary · Details = secondary · Buy = `buy` · Explore now = `brand` |
| Main navbar | BottomNavbar (`MainNav`, src/shared/ui) | `value="stocks"` |
| Layout | Stack · Section · Inset · Grid (Figma auto-layout frames) | Page: Stack → summary Stack `gap="24"` on surface/secondary, feed Stack `gap="32"` on the rounded sheet; tinted bands Section `paddingBlock="24"`. Each block: Stack `as="section" gap="16"`, heading in an Inset `paddingInline="16"`; index strip a horizontal Stack `gap="16"`; shortcuts Inset 16 → Grid `columns={4} gap="00"`; strategy card body Section `padding="12" gap="12"`; trade-idea buttons Grid `columns={2} gap="12"`; disclosure Section `paddingInline="16" gap="04" align="start"`. Content inside clickable cards stays CSS (spans inside a button) |

### Rules & behaviour

- The top bar stays; everything else scrolls. Rails scroll sideways and snap; trade ideas snap to the centre.
- Index values and stock prices update live (prices tick; the change colour follows the sign — never by hand).
- Movers chips switch the list in place; the chip row and both card rows keep their scroll position per list.
- Badges: "8 new" (new IPOs), a count (watchlist stocks), "New" (referral offer) — from the API; hidden when empty.
- Smart Invest slots: show "x/y"; when 0 left, the CTA becomes "Join waitlist" (not drawn).
- Holdings: a user with no holdings sees "Start investing" instead of the value (not drawn).

### Differences from the live app

- **Top bar:** the live app puts the profile avatar on the left of the search field. The L3 Actionbar has no leading
  avatar, so Profile is the second action on the right, and the search field is L3's search mode.
- **Sections:** same order and content, rebuilt with L3 cards, tags and buttons; the grey summary area and the
  rounded feed sheet are kept (they read well in light and dark).
- **Smart Invest / Trade ideas tints** use the L3 brand and discover light surfaces (olive and navy in dark mode).
- **Shortcuts** use illustration slots (green) instead of the live app's icon artwork.
- **Announcement** is an L3 card with an illustration slot instead of the campaign image.
- **Sample data:** holdings and watchlists are fictional; top movers are real (catalogue snapshot); indices, sectors
  and baskets are samples.

### L3 gaps

- **Rail / carousel:** no sideways-scrolling row in L3 — `Rail` (src/shared/ui) stands in.
- **Actionbar leading avatar** (profile on the left of the search field).
- **Illustrations** for shortcuts, highlights and campaigns — `Spot` slots stand in.

### Changelog

- 2026-10-23 — the six Under ₹100 stocks (IDEA, YESBANK, SOUTHBANK, SUZLON, NHPC, IRFC) show their real logos — added
  to the design system (`@l3/assets/company-logos`, now 56), so no movers fall back to initials.
- 2026-10-23 — Top movers show real Indian stock data: gainers / losers / under ₹100 come from the company catalogue
  (real Yahoo Finance snapshot, DS logos) instead of hand-typed prices, and update when the snapshot refreshes. Six
  cheap stocks (IDEA, YESBANK, SOUTHBANK, SUZLON, NHPC, IRFC) joined the catalogue for Under ₹100 — they show
  initials until their logos are in the design system. Layout unchanged (same cards, six per list).
- 2026-10-21 — layout moved from CSS-module classes to the L3 layout blocks (Stack, Section, Inset, Grid); nothing moved (measured at 392). The home shortcuts sit edge to edge (gap 0).
- 2026-10-19 — the search field opens the Search flow (`search-01`).
- 2026-10-17 — first version: Home (7 frames of one page).

### Changelog (live-app match, 2026-10-22)

- Re-matched to the live app (Pixel 8 over ADB, dark theme): profile initials moved to the left of the search; Title Case
  labels as live ("Do More With Lemonn", "Top Movers", "Invest in Sectors" …); shortcuts Trade Ideas · IPO (5 New) ·
  Watchlist (3) · Referral (New); today's indices, top gainers (with the real company logos), Smart Invest numbers
  (92L, 356/500, last four days), sectors, highlights, the "Oil Price Dependents" basket; the announcement is the
  campaign's artwork; the disclosure has Read More; the Smart Invest tag alternates NSE/BSE Approved ↔ Auto Buy & Sell.
- Removed **Trade ideas** — the live app no longer shows it on the home (`stocks-06` now shows highlights & baskets).
- Kept fictional: holdings value, profile initials, watchlist names (the phone is a real account).
- Still L3, not live: the Actionbar's search field (live: a filled pill with a magnifier), PriceChange (live: ▲18.56%
  without "+"), logo sizes (L3 Avatar max 48; live ~60 / ~80), Spot discs on the shortcuts (live: outlined circles),
  the Mutual Funds highlight's badge artwork and the baskets' dark-blue card fill.
- The second idea basket only peeks in on the live app; its name ("High Growth Media") and stocks are a guess.
- Same day, second pass (designer's calls): the top bar is plain elements (no L3 Actionbar), with the DASH pill copied
  from Figma; **no card shadows on this screen** (a one-off, not a rule — `screens/Home.module.css` flatCards); sizes
  re-measured at 360 dp from the live capture: section titles 16, card / summary text 12, shortcut circles 40, card
  widths (products 2.55 visible, movers 2.39, watchlists 1.6, sectors 2.07, highlights 1.67, baskets 1.19).



## Source — this flow

### `src/flows/stocks/assets/announcement-jio-ipo.jpg`

```tsx
���� JFIF   H H  �� LExif  MM *    �i            �       �      ؠ      q    �� q�" ��           	
�� �   } !1AQa"q2���#B��R��$3br�	
%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������        	
�� �  w !1AQaq"2�B����	#3R�br�
$4�%�&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz�������������������������������������������������������������������������� C 						�� C��  >��   ? ���o�u��˥h�g3N���?4��pp:��u����~���`m���v(�ny�@'� ����4��<`* �JG�<�a�s�{�`~��Ǉ�8���b��ky=�c���^l���U5e���
���B�jp���7Mt�Ĥu	ʎ����p@$W���(D *� 8 ����2<WEa�U8�-_�ݿ6�<�Ԕ��(�T���( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ���C�ε��I<[|�Rȷl�vJ@V>�9�\V�4�8Ƥ�����oc�袊�AEPEPEPEPEPEPEPEPEPElxF��:ͦ�o"E%��W�8'�ˁ�֏�|%��?U:f��܂H�PvH����+����^�W����s�������QRm��@�EK�R�b��sb�i�qK��d.b��mK�������e*m�m4s��m2Hc�6�U�
���`x ���X�h�i7}s%�o�~�b�wc�5��T,N����y����I��|g��{���iZ�8�L3�L3���3���������/�� ��6�e�5���� 4R���H۱�A�~M�>`3zS�e�T��iyI-.� �+�{��|d��-Q�eEt�.���~�@�P�m��i4G�J��?#��������:��8��{��G��j���������_���m�!n�B�۹��h�z� �)=9NH#H�;�2=��N�����3Ӗ��㌖�5�W��	d������9=d���?Z|�r
(����(�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (�� (��oxf�ź���lv	2�Ɍ��A�c��EgZ�)BU*;$�ƕ�=�G�m�x�t�5f���dt<�� a0s�~���7ǒx�U6�22�V�,)�;����Wy�o��z6����1"��'@�V/�?3���J�2�3�����-��=�Ysv\�(���30�������N�v��<�>��JI��(��zS(���j�v���[���AN9�������d�vf��6���/�F־Ԗ!�I[kT�؎���"��B Z��6����BHU$���m-�r8-LѺ1GR�����-%4�й�	%��. s��du��A������'��[H�
ŮY!e| ۆ1"���oʾ^	[���|7�[��� nGgC�!�#��s\��N��Hk����*,����t�*�}:�3��c�Ob?�q�T���|?a�[�@���U��_���;��8����
��m^Y��]v�%��f��fW
i�*p��mz �e(J�m.)sJ]�.�]��`!�K���h�J�C�R�6�6Qp��F�Sl�e�����F�.�_���"Լ1o�x�ڴ�r����� q�G�����+��źJk^���m������/��_?��?���_j�y��a/4W7����]=,.-B�?����UQB T`� v�Q_���aEPEP�Y�"�x u��^ʻ�+{O�[Z��@�r�� ���oκ*����L��7�i����G�"���� �&�r���.��nmt�����s�f��mKI��y�ͪZ�k'a"��:��={W�`x�*�⥁���V��Ԅ����j�t�|���-7��/��h� �Zo��_���qomqy<v��<�J�#�5.���UU�$��U��L��-��]9��0��n��D�!�#����f3���_pr�s� �����ɣ�i����^��6����kcr`��ɶ�D�&�;vF�öx��犷��P�SI�����Ā���:�����ԕ�}���)���M� ?� |�?���~��5�ɦj1XŪKk:Y��"�h�B�ʬ�m$`�����uXt�yl��w1�t�8��dY�O������)� :��7��.S����~��4�-7��/��k����>����i���y?i����q���1�v9ۜ���k�Zm�j��{kk&6�5���wtò��ny��9&���Ӧ��<��i����G�"���� �&��7Q�n>ɥ��y>��]�m+�N��w5MU���$��$�W���k�_��N3�i����G�"���� �&�RҵM�Z��s�LT8��'�ʒ@`�� ��Z^�U��^��څ���4��$j=K2��k?�Wd���m��)���M� ?� |�?���~��5��^��k�<Z5���ǂ�m�T�v�q�f�h��Կ������q�O%���ݏ+����9��9&�段{h����E�� ��� �M��M� ?� |���GÞ ����m2���b�}��H���B�'���S��4X�X�/,c���	"V<��<)G5n֨��m}���O�E�� ��� �M��M� ?� |����?���j��	$�N �'e`�X�jwIe�[�uq&vC4�6�X�E� I��3DsW$�����)�� �-7��/��h� �Zo��_��קX�cĺ�rM�i7�q�!��ieU�@%��2<�p�����h���{����m���6l�����Y��iM]o���p?��M� =���5�y�^�)}�b�{~�z�������Ӯ�<߹��d�w�w���dV��)�)))/발O#��=M[i����`��z�+٥QN*H���+@
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
����v�|7��$� P�LH���`� � v�^�o���iH������!a������܊��^"7���`-��꧃4�@���L������E,�/G�O�+e�f��9+{ys��Ox�I�$idcݜ�Ϊ�E}
I+#0���Լ}�K}O������}�(�H�1�`�3 $��_���t�_�u�aP�R!��e�]@��Xs�@]ƿ����0b8#"���)�\�?a���s���n��4tz9J)��QW9?����� �����R^�$~J�y���5̌9� ��O�k�*��?��?�Z��'�sv���QG
�;*� +d�U�%.�B��$�<  �M{�x]��^X�,F2��_RRrN�E~[��d��ɧ'k�&�1P��a��^��߅�6�x�s��K�N�F[3!H��A#Њ���_��0�Z��BjQ{4�Mט�Zveh����v�z(*�Bp�������0��w>�O�|]r-<5�]j2��F̠��6������~/��jZiQ�Qq6��Z��ˊ2�� k�F�j� v� ��iJ[#��{Tmo_���>+t��)����-�o�p��S���mm3YӯXtV��!�FC)r�Z���Z���T�~=�T��ھ�����s�����ۦwOg�������Z<R4r�GBC+GPA�k���i��������֍|�����ܩ�-�=��WX�R��*���'� �M{�q]ٓG2�� �Z��i���Og��z��ĊS� �L�隽㏅^:�{o����J��IK[���W����� �=�<�
�3��ę.+,�S��&����Vv�q�,��]��d���>�����]�O�O	*H�$��8 �<� �ʸϪ���Q_[~�?�n<�K�rt�~p�%��rTz�w�8�����#{��F��3I��^/ê�}+�3�./��/�k�1�U�I�\�
�� ��}mN��A'e��g��I]s#Ă�]�(JpJ��l����*�jsx^���ԁ��W��P+��׆¾%��@?gc��X���T�+��Im�K��$lx*��}���m㟇�~2�\]Y e
9 �I���`}k�q�Y�+����/�}����>h۱�&��[�����Z��&��LG=�>d�z2D>b=�+s�M�_�x��Z��
����9�2�\��@wQ�������0��� �}�\���~^��I9I�k�]���jt�p��[�~�����qϓAs� �%��sR���:�]H���?,��8�~���]�3&#ד�V�~����� ��a�yJ�;�sy8ů����6�?~��^:�?�g�|Uk.�a�mk˖Pw��b�z1`	�@:�W觃��.�U�p��Ӡ�n�M3�ܳg�n��h�-j )�s�?Z����� u��\|A�Va�I*�t���������=����6�����;S��_�DF
�x�~ Wɟ� d?��}ε��/��N%.,� G��L��#�ힵ� �������R���9�P}�W���7.���k�n����غ�x�ZH�s�-'�����6�h]��a��ᔎ��Ql��j?��'�� �x�"e�/&��.�M�oh#3�+�{�9�X�_�6kK0�R�Q�jqOG{6�i����� �'C�ڍ�ߥM��mzwdl��(���T�i6�vv�]J:�V ���U���� ������Z[iqR�{�?�����(��p����( ��(֐EU� �OV*���G�Y:=��Y�?��qߎ��Z���i����mg\��U��垡�ua�{H�	��&ޣ� ��S�G�"�Mե��Z�KCR�ߙ����@v��X��.��Z��q���Q������@�L;u�\�ܰ�u,��"wfH�-�I�ry8����q��l��}M��q��mճ��Yn�O�/v��Q��ρ��X�� a������|K�xF����<Kh/���\V���u��qk1�}�)`;��ϥ�z����j�T�k{g*Oo<g����{FElK�O�m�YK�\4#�n�h����$�u�a�L$%ǽ~��5<ΫniE�'�v�U7f��e�kN�*���<c�O	|�ޓv��|^7����ND��w�s�r#�A=��u��x�\���o	x�)n�)M���x���Z��G �������7�� �$Ӵ�%�����f[�2!+k*���H==+g_���?�:t�G�|M��Y�Đ�1(�s���o�q��-J������|�΢�<R_�uf����#�v��w�-�Χ�(|8�t��{��^�k��I%�DP=I W־9�j/�j���g2x{��7:a�Tk�u[3,�y����u������Ǟ1�Ӵ�&�V���D��v�
��ms������ϩ�m>!x��Ē���[��Z���^���s(����+����ҋ�^1�R�toޔ��}�et���ɍx��D��O����xo¿�� ��H�N���P��@g�v�W1��75�W�����>:���P�R���]Wú�mo���# 9۸�?{ ���29�˸�'v���s�ﵯ�� �G�/������}�YK!��G|c�ש�p��b���"�y$���q��N�o&��$��B��L���˟���o���_�z�k�/��&���Mik�gZ�[��/�{C�,�e`�OL�^1�x��ژ�|/�O�_h�����?�\�s]%�ů�7��z�爯����:]��'�%�fc63��c�S[�>:x�eL,�Z�aw{�ǟ[%g���t(�)F���{���xGB��$v�����H�r�­��I-�y�U��Ը��|q�G���Ϩ\�V�W�`>UV����n�<�FGES�_�x�����������5՞�b�Hʲ3)�
)A]�-����k��_B��i��d�Ih�q���E|�~ �T�a�\h�����)B\�\mi+�t�l�F��ݷ>��s>��� ������ƥ�^��5-"�]j0yo(�Q�a�F� �5�Z���~ѿ	u{�@^꺕���	-c��HV��p�� �s��E~u�S���f>�n������W�#�}�L� ����'�N�vu��)~d&u%
1��?]x�	�T�b+F�R��goy�T�Rv��},�Q��Z�����o����n�� �¯e?��U�/�"�zպ����r� �w\0T�D�����>"�¿x��Q�M.�Z�_����%͜�$J�aq�Ĭ�|�����|;�O��?�{Y�����E��L֭4��d8ˡ �9������/XG���_���"q"�<��8�r�Z��Lj`*'��]n����R��Z}d'YZK��^��O�~ʚW�_�:�ߊ����?{%����Y����j�/�7�N]C� M�5�Rx��xr/�3h�\���~�n
�2����#>���kº������t�B��sm�<�h�i�V*}�z��eS˱�**1u���VIM5��� ȏkyFO����kV~�#��N� �W��?܃}`�I�� >PS��s�Qx#�>�����<�����OAq����?��/�X ��繯�ž%�C����3�.�����ԗd30�� f��cT�uum�[+�f��GC��2|������*�/��|��h��%��ɻZ쿬l��>ڷ�<o�� �n�7��&�-��7Z�^]ȿi|P��� �R �Vo||']���$����o��r�T���.$,���@�z�+���5�NX�Isr�����e{ok��c*�R��m|��OPP���+�+��-��[$99����?�q��x�K^�(���QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE����8�Ok~4�UFH�#��|���́�����ƥ}q�]1y�eydcݜ�?ξ���_|%��7Vk���9?��=�����+�?�T�c�ە��c���'�Q
(�����/�s�?�$>*o^G��F�.z5�}�� 1b�~�^9:�¶2f�Eți������(�m���~|}fDE����0||�W@,}v���c����.&��K��i&��I�Y��Y��I���Ǆxg�O��׈��ς���x5�\�~Ҫ�I�����QoEb 2q_�?����i�|^�|Q��j��0�C�a��p�����oJ���?��%x�H�u�d�bY���L���@O>��ҏڣ�v?��
�$�]J�m���o�[���p�0
��+���3\Ej�8w/���>'�������5�����Kd|��L�f�⧊bѴp?��	���Ps���y�}��c�����ዥCu��>��jv�6���^J��c,�� ��^�	���P�a��߫�dJNr�G��j�+H������qC
�wc� �ھ�����/�?�h�f�O��D�by�D�	#�G� a�׭nj7�a/���~4j�8�"+kj����`�܅	d�� !_���h_�_������'�v��+ii9T�>���y=k�z��a�%O-���NΧڟ~N�����8�e,�������:��� 9������� �����z��b��4p''�rr;W�~3��� i�K+j^4���RI�N�k�	|��施��r����.���'�w�7�ͱU����;�����7�'�呎K���]G�?h?���f�� �u�FC���F�^?E{�ДyeM5�5^�wSy�;���
k�����m�?���MWK�����O@�W����'~��.�s�K�R�Ԋb���cʔb9��'�����R�<��%Ŵ���d��+A9z���g`�?�`[�Um(i��f���;�S�j>x�� ����y����^����+��P�N��0�ǯ��|��J���$��#e9{�^�� �ނ�-�~��&��߁ge�� � �bAxOތ�Y+ߊ�� i_���jq���;��)�>`�� e��a0�T�cn㎽}���T�K)�RU_�5��_����#:u��jN��>��G��-�P|)��ω�Q�ZƑ�/G���]��FO�T�_��9�^����S\�mՄ�2��/T�3�]pEzo��7��sa�h7=�o&�����@�c�(����+�/�������|]���co�$|��t�2?��g���sҖSQ��v�I� �b_���������������~f�M=���[;G,LNYNA�W�m�5�#��N���� �;�q��H?F����}�9x���*���;uXI�?�π�@�ߊ���q�X�oR�<���ri�M)��$ub� �ʹ���m�8��[>���[���RHأ�*�pA��B׳�r���#�<���7��U�j8�Tf�W�����p�U�y��M8�ݛ^�}c+���9+;���=N;��?	^�%��fuF��_��	]�5s���N��1(�_O._�����{y��:�㽮�V��r��>���<Ue���f��]vU�u���L� *�͛��9�$Io�z�w���� �l|�ܚ� �ϥ����uX2�m�$ܹ͇�$� �+��� ����}���)$�Qۨ�R!�]�0�u�#����5���<��������)Es�n�V�ﵚ�MK	��6���~�Q^uῊ��m�\�{W��tX�K���8oҺY�A
�ܡc�x�-\"��:��Z�տ3�S�WLܚ�+8��/�jdW0N��p���K���|͜t����yRGҵX˫Ԟsҋ*�� ����^u+I�ָ�$���U�.m�"3�J�ƽ^F
��N]<
�����u�Q_G$W��G6D� �PA���o�_�@��7U��-���čh�v��7��Ā��}����Cᯁ��8�W���D>X|�r�:�3_�?�&k�|L� ֱq��il��9�ў��X�&�r�#ͨ�~�(�t,�ie����[��c�Sq�ݞ_���6�]���2<�b�m���m��3!�Fڛi���qG2c�����(��p����( ��(ͭ��r��l�ЏC]e����@������WEcW
�g� 	��� ���i��� |�Ea�
^c�g� 	��� ���i��� |�EP����� �"�}_����-7�� ��(���Ù�� �$Zo�� �4�E�����\}B��s3�� ��M����H��W� �k����R�fw� �i��� |�� 	��� ��pQ�
^a��� �-7�� �?�"�}_����>�K�9��� �E�����G�$Zo�� �5�QG�)y�3;� �H��W� �h� ��M���
(��/0�g� 	��� ���i��� |�EP����� �"�}_����-7�� ��(���Ù���$zw�� �5�y�R�R�
��M�rtUGJ.�����v���,�rI�i�Q]b
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
��������^2.�����Y�b}��5�^�����ť�^|����� ���L}gGV��1o�C��H�?j"msM�ղ-m�V�L�����
�/��ѹ����ۖ&%��
n��5�ɑQT��_ʟ߯�UGy0���)���mn����9^�d$z�-^� �5��1.X��cqr3؝�d{���?��)��Fu�Sv�=YG�|�C� 'h���_�>�m4m����n��d^>H H��,�w�_W���Z��|M�͛+�Z[[��޾y�O�����
����p�<(�)%�ק��?�u۩��#�9=O�_�;���>���1��&�ʵ��	h�����т��=k䏋^:����X�LϺ	gh,��ZBvB�{z�޾���|$��c��;��n w}�Za��C�?=G�_j���\_W����q�g3���P}�w����󮯻��_�+�O�m�>|4�i?�%m�m-&���r[��d��k;��1߷ޯ�~xJ��^4�|!g�&�y�a���d� � f�+տ�?`Ь<'�8�QŶ�ik�������6��� ����5�T�W��ѕ�����N;� �OOé��*e^]6�?4>>�p�W�� ����O+*N��d������N,z�d��`(��;S�W�a�S�J4hǖ1VIvG�թ*�s��b����g� �w���	�V�qe�h�4�������;d؋��l�l�v������s���x����0��mX�."e*�I���͆}���0��Uw���S��k�j����|ڨ�*1�"����?���O�K���2��l�_>X#�K��3,�K3��s�k������/��!�xo�p�k��oiz֐� �����|�(�:8�b�{�x��c'��I�ɴ�T�^۝���xZJ��w>>��+�+��� ���~1�3P��>-��눬��Ÿ�m�\Y����|�o�����~!�[�/�|g����s5-��w �L	F�WVԑ^'d��p��{Mk	u�������,5U>�W��?�C������ڧ��L��K��H����h��.	�9��_��6>?�M�|5�Aq��-����Z���	�Y��]���S�'��hO(ho-m�켟��'�r?��F�b;W��ɞ#:/�d�\�e=��H��U��(�j񱘹g�-,DիQ��N������>�)S����L��ž���'�|9rKI�^Oh�F7y.Sv;d��g�u�jۙln#�GM��ه���� ��~/K}n�WZ���p�$�[�=ϒ��{���+�,���%�֣�
��4�jQ���wh��.I��>���t�uOi~!�P� e� 8��r}9eJ��(��#o�Ig�{��4zS��~k;O>�P�|S��������>�xC+�*�נ�������@��O��pG�	N	_؎F7g���k�:��c��#�E�A�?�$�x_G0���H�ۀ{ywx� �k琵����R��NQ�^� ��mZ}��K���S����1F�Ԋ���O�M	-?ė��o!u�ٳ^f��,N�V�S���O�3������O��B�V1�[h����?�c��߷ُqg?ʾq�K�W�.�[���� �Q��*� 3=�� ���Ǩ_���U�����X񟋼@���b��d�A�3�綊\
��e83��E/ЉT��e}��*�(�^�1�_ej��6� �Q�+��eX��qF��9�tW�K���K���a\�����(��p����( ��( ��r#��jY؅UQ�I� Ri6���V��>�kOscsK��$N�2p2H s^���m���F��v�zF�ˍ�L��*�S��OL{��qG�\=��x�6��Z	9�{�]��hݶ�(����;QE{ŏ��法n�����M�]<�:rA���|ƙ7d�3���a�_�I5�qi��MI4�[�j�EWԈ(�� (�a��.�vAA&� �iB�w>�v�w0H��^o��_~_��� �����)H*J� ��Pk��gßx�n�Ð�(�1���Ly���#��k� ����S4�10�B����U��^M%ݴ8Z+���u��q� �"���P��ٙ��r��Q�`s\,�-��j+�qjQ��Ѡ
(�� 
(�Mez�]��
I(��8��V�)�+�`U���o��<Q�Z��e���ck����!r��8����0�xc-��g��a���svW{%���M��i\�+�>(|��g�i���_=�	@�6y'ּ^��'�2N.�i�=���i�(�)F�2q��Qz4֨
(���AEPEPEPEPEPEPE���\D��������.�G����x�W���V���͢�Eiu=��`�I'�Z�g��@�犿� ��� @����'� YW̰�$�Z�bھ�KN���Ȣ��iZ��y�Vs£����~d
�[��үz3R]�M~ QW���SQ��;����Ƀ�1�4 �ך�WV�_{��y��Zz/���t^�,.�? VUF����a�)ǼZk�@QEt�QE QE QE QE QE QE QE QE QE QE QE W��	�M�Yd?���iԼi� �W�W��� ������� ��k���Yu{v.�ď=����ƺ䇌_���r��W%]/�� �p��'y� �޹��������"e�
���R�W�u��� �s�$,p}>A��>�����/�H��fs�xiƿ���էO�� ������)'�68nx�+�y�;�R�N��#�y*�� �לF�p+����~"��d��wG�y	� �W'����m<�1�,n��U�<w�]�Ҕ0��Ҥ���h%�A"[��e���#���?�)����Á�-�6=��ǽ~c�1��-��a�O�z,��q�q��ki��?3�5������ �
�YNM�������ׇSV��u�̡�D��3��\2�����������|@��� ����b�Ņ�g#��qP�ؤ@�M~��>�G������ǥF����_�f�{.��j��̷WS���-$���5��߶�|}IoN�$���y��p�ຶ��2�(5�������Ud?`��Rq�� k]s_1�\��le��t3����W�� �O_�4/�5_�;]��� �V�'��?� �� IZ��2��,_�}�� �}�W����G�o������N���-�=6��%���O�uoo*� ����m~M�h���	|P���Fin|Omt�.&���;�u�9���Aҿ���X�0�@���� �_!��� )���іҚ>� U��v�|RH�tm�g��^�qk�����ӄb�)���ֺ������rԨӍ6ۺZ��|[�C�8�����k>���E/�jZ�a��g�np=@ǽ}c/�s��Y��x�F���<��g����~�x�]�g�� �k���H��쌎��T��#Aܜ*�����૿o�M��xoU�Ҟo+�I��¡8��܌汇�.g*���)S�d�����o*���G/y�������1|_�q��˧��!�mO�j�?��+s�lg�k��k��O���w��:�:����� 2<S&RX۱ �V�_�ş]|0���o�ׄ�4N��Y��Q��� ��U��>
����LTj�Wm��n�{�No�,+S����߱V��?a?x����jmR��$.��-��;�J�����g�O
ݫ�Ωm7�3����!�5��H���A���M͸�E}��nc��� 1�#��&���m��e�l�u�c5ӑ(�����Ծu ���f�ܰ�y��o��S~ۚtb� �Z�_�{{�g8����+c񯅕x���m����㗓Q�>��c��_����ڤ�a���� ��X��K��}��{�&	n��~�7��� vE��3_�����n��e7w$�Rg�|q��p�7K����=|+N^\���_6֦U~�� ZpZ��r0�=� �K�τZ�ȃ��#�%�O�_>����/�Z������|���V�b��� CJ�݉)B��%(Q^�1���]�>�]����6R����ъ.��eO�1E�l��Sm��J�r�l���m4\.�6
]�6.(�\�����(��p����( ��( �����������|%r�|=� ���_��� Ҕ���w� �g� ^*� ����|*��EEa� ?��|G�]X��t���<1��pB���F��0Af�}����IO�?�?�Q|��)� �˭� ׌�4W�]�i��������N�zUy�%���,�%gi'&������G'����:׮t�|Y���1+Z�Hc#|�Gb	�p��k�4�/Q�.��K���w�JY��<t�<W�ߵj4���c@Y�;� �Ih�{��/��GÏD�$b��jm��۹�q��L���$�Kd�x)�ٶ*�F3�F�����+N3����o���R��ee�g����?�������g@����u��� ���^���^�U�8뵺��ڷߵ���v����l���ePGvX���<ױ�Z_�~)xI<Зv�;���2��� ��=Fx�~�(�v+��;��C�i)�R��u~�&�����Bm'���S�����<K�]xc����y����-�n
~W̸a�k��̿��ah�p�S�V1�d��d��^M4љ��n��z$Ws����Y�*G��
�[?�
�	�������}O?ʽF�	n�)5�
^It�DQԳB@���;�?�n��1 �;���rA?ʿÏ�υ�qv<�q�s�)М}����]K����7;5�����[b�L�G��h����������H�nT}�2�L��k�� d�D>(`��~�ӺtV�𕥾�p6�S\7[h�������_�����[r�,�o�M�h8�G�8�:���y&'<F	S�';�ϊ��c�v��!>O���a=��ߵ/����� ��~�|Srm<?a5�����W��8�5�/��\�_�M�f{�>��<��-���ɯ�|=�xs῅����k;L�7 .Qr��GRy?���/�B>x9�L��9�.��g)(���j1�������-�??o��K��7rh�H���D�̣�g�V���Ǟ �7�F�sq��W�2��A��}jj?	k}�i�b߷�y\��������4����(�!����	�H��M�|�w=��������.	��O��Z�
��t�.u�����jz���d��{�����Ɵ��x��isI�X�%Ͱۺ4��y��~��K�];� �u�r]\i������xQT�rX�+�-C��Ï��)�nl��n�-B#�*Y`}Đx�q_d��VMAԵ�#2��i=�F�#i
�z�W�K>;��5��ή
�R�*�wҫZ�p�*��6�a>H����~��N)j~f]|)��e=��։q�Ҙm��̒*4�F�#{
��q��������m��#q�Vy|���l��z��%�j������<k�^Ir�fRd[Ko�q�3?�}���Y5�M�#�ĺ��k9('�d
H�Fq\�L^1�;4Ἇ�E<9JS|���'R*6��4T�f�y�~��]��5�_�WI�e�5���`�Pcp;Ae$�ع�kC�޽�[���63^��DK�3�st�"����� |h�����Y�ڢ�6G98P8Pŏ���4�+¿
�"�PK[>2�r�Xc�LǠ�8�	��@�~�M����T3�K�����8ß�5%�*�����.iϙ��\�g�r|�����wl� ����k̵=+RѮ��U���t��T��Fz�:�+�ڃ�WZ��]X]Zٳ�l����02������ �5$Ac7����pH|nA�uG�c�\�/�ψ<!�`p.��p�\S�jӺpWI���#%�x�3�w��5ʞ���|'�/�-��,d��H��ʩ8�#�j�|7�Λ�ZiW�5�ww���X����$ 7���{�����^�U*�f��x �� �+�o���^�� ����G�cr��b~o- �gӎk���u�\�=nɲ�x�rC٨����R��R�M)4�P��j�d(��~jj�<e��z~��iΗڦ~� *]�8#�3�z�V�_������s�7��H�@RI%��� X���� �?�s��8�g1�C2yd��FOk�}U��-"�Z֙R��<��8�~]��b���x��u�K��y�CM�Թ��q��N�Jq�Ms�9B1�4f����j)��v� >&�[}�tY�������k@ּ;xt�r�[+���2=A�G���7�7�=O[�L������A]���2p�� *s�+����> ��}f�+���n i����9��31�ex����,?��1k�R��ڞ�ZN�HJͥ4�(�7�3�=�����!���Z�톏0��Q��{���J�|E�xL��$:l�K'�2�� \��g5�v��L�KJ�dҬ�./m���k��Uӵ�!���#"��H�9��jYV�Kխ�@q���Z�� K� �O��x�c��1R\����-_�s���>�$�+;(��ʞ����E�~�@��^i�D���Ye�j�M�?�+��e��3/�u��iww���f��#в�#���į��?��j�\��2�>\@��v�o}�!F�q�_�x����x{����\<N3Nc*���Q�A/z��m�I$����(�g�ǈ>���6�y�i��4��;���܌W����~5xSƚ<�j��q�R��H�]H�e�U<�J��⮗�i>9�`�̱K�JRx<�܈$@΀��_p��}/��9�w����̑౸h��K�M'�v乽��.3��n���4�G�������?<<J)&��}���O�� �/���z��_��ѹ5��M��ů�3T�gɿ��eR��_�q�'���e��L�W�䷚u�S{Ϙ��8�!���� ���� a_� @������/�x���Zw�l���-N)�4�"5�e-��ƿ�E�Y>w�� �<C��8:�4jϝC�<��y���[j����g�Wï]'M�9nYK{�B�����r'������O��q���ph^e�����ɝ���Xz�}j��<o���O��m��k��JC��$b����	?1�O�{/����|7�L��q�\��1ȳ1Ǡ	�}H��N��xw�E��]�O��:Q�QU�S��R2p�%�M*���}Cu��?�C�臊�P�����k~�id8fn�X#������⯇��⳽��LG�o��G�*3��܂�@E
b�D����R�"�~�i$����׵�KĚ�ֵ�Jf����v=NB�죠�{�ù��k�3l�?�jP��rQ�J���r�I;�K�<�f��mF)+r��?K4�� <u'�e��3H8��L3eq��׃�k�a�q��A佸2]�G�j2�D;���$s_[�Oi<wV�4SD��А�áW�oï����뗀4���.28i#f�S�Fe'�>*�q���L���#1�SZ��V�V�ݜ�%ʔe�3�*�n���>m�YEt�2Ңм[�h��V+��"������;����`ʳ*9�
�?�U�gI%%�30��+��(��(��(��(��(��(��(��(��(��(��s�����u_��m<]} �����u�|3�M;�z=ć
Әs�:4#�z��j~�Z�_�T���J��'�����re���$� ٫��k�>6X�����#��x&u|���'FSW�`�����	�& Z�w�[��|e����\�A��M�s_3^��'Y'Ľ(���{'������"�G�U3�x�J<�xy�.���/;�O2#/y|p���-v00������#��x�^W���ߴވ�~/�֐au+M�}d�m�� �,��l��G� �u���� �Ԡ���G�O� '��g�ǧ>0����1���F���N#��9������̸��c��|P��n|v�����i9 2�b1�ő � s5����k4��c�d�a�����8!<7��oJ�� �e��������5���O�N8�C�������G��I"�y���߈�����o\.�4�b�Ŕ�op�� ����#x�?	|pі��v��K��I����fH��_$� �D������׵�f���]�`8g�l���.Fǣ/�y�m��M9����K��_v�����		��� 3���e/~Ӛ���w��h����K/�(o"Q�Km%�a��O~�_�'��I/�/|��L�����#4��]$^6�l�޾�� �n����=�����p�e��%���Q��Lw�!�R>�pF����_��O�|�[-揮�װ�xn�q��8c�ƾ[���6�s:��*V\�O�����D`2�.'sZ]O#����?�g�x�@.����-�|��.$�x���e�Or+��+f�i�~����U���DPCd��Ҍ}~�x����/��d����S�Z%�1,�$�@�U�	bOA�6���s�G|Z��1C%���D�:E���Khرw�ı���8,�c���U�QNRn�M��/���K8�ҡ��z�/��1�Nh� �	�� �x��_��״��
��{�T�X�VV���u����=�p��+��?��� �G�6��.nl��⸻��,�Dv2��Q�~��?`�T���PY·wa�+��b�[x����e>��xC$�b18�,���Nq�M$�V���4�:U�����������/�_�_��)�H�}Nk{{�`���,x�w.��s�0zo��k�x[LЯ�դ�B-�O7�' 2�6���{�������9�@���U������/�m��drО�9�k�3��:�-�����{^o�C��ˑ��"�\wS����m�u{�mn��E�ܾ�>P��X��9�}O�
<#�a��h�5��������{�A��~�����Oڟ���0{u���r�2Y�Ek)� ���~�~�߷�ï����� �mJ��>.��Hmͱ��3�t����*�9#�:� :7��Z��Χ+Osw3�4�r�$�Y؟RI5�dظV��b��ά�V��۷m4<� �Rtㆦ��� #���	ad��?�S�� $u!�LivR�?>��W��ӛT���CnZ�2 ������F�+�χ�� � �zY�_�ٵ���Fxc&��
G]�`�v*Ep���׈uL�[t�������9�SF�W�P�gy�I˒>|��M|�z)8�� ~�l�HO��HI�����A������>د��k׾<����ⶽt��K��C�F�O�=�՛=�^N�_�p~XL�B[���^��8�U9�ɣ쿇��� f�#�6���	�*d
?�󯎂W�4Q��q�������D�o�9����忢�ԩ��]i�
�� ܢח�,����Ȍ-(Z�-(J�ȹ�s�4��:����G�Ϯ�X�+� ����G��5瓀}e��!^ �,�\�X�ޤ��cZ�ܫȀ-.ڲ#��o���`�ԡ*�J]��0\����m��S�"��_,U��l��
�]]Z�h�h���G�V�6J9���_,U�����G0�?�����(��p����( ��(Դ��_5�2�W�t� 6��1,O�F�n��|iqg�'@��B���Y�"��t���5�����'G�����#������H�|��vq��7)b���+�a�c��7�#��u6s.���F� N��'w���{��ϸS<�^�ܯ��a��5���9M�m8N-�	��Ӎ�Z(�F7�B?���(��v��� �e�� ��?�+����#i������㺻����m��a RG��� 9�7�S� ��[�����߇�%��E�&��ѕ?�U��ԕ��|4��JR��}դ�i�������A�|	5�<��f�=6	�-�½��E��׀<Co`��M��2���� w# W̟��� O��:�7�U��/��0�-��f�;}j�5�U�����(�	���r��N+��$��^pe8g^�]*�n��r�$һ�n3v��գ�E� g;{����Inn$�� <Kc?B���/~|4�՛X�M+#���G#,�����W�u�#¿4C
�-uf+M>3�Pʿq�n���?�#p�5�wp>S^�*�XT��c��K�<�����R\��S���cmY�/ǧ�O�:�BA�����ko�אU�WR��u;�Z��˛ɞy[��b��d�T+�I�� �*p� �9i�K��E��t���W����n����������	ǻ��|�'�[k��:��n�c����G�!�G��\�� �����C?�3���8���V���RR��_�{��i6�ǲ�A����6�&�9�^�y���1䎇3^��&� ��?��?�z�ξ����x����=Y�)�!�?3���0p�ЋþX+]�M�M��N��oE���ݗ>%I_�g�Z��k5��\�*��W��s����Y�E��4�22�Ss����a_4~�WS��Lүm\�5��m,n:����{�3_Q|9����D�#u�(�,%ݓ��91U?y8����p�s�����'�p��*^�+�.�m{'hԼ��k&��j��h�¯ү���֟4x�Ց��F��DO;�p{r=����3�|z�k�i�=��fR������.���6�>�4s�C#[���^�e\pB�8�Һ���J<����e<;�֍*UaV�J�IB|��i���>ny;��tO[������Jֹ� _P� ����/���� �� � I��>�7>*x����������|;���A,S-忕wj��:m�7^���W��'�x�7�aİ�ʦ	F�����,$��̩�&��wg�u~�|:� �}����2Wɟ�x?����<;�Oq| s$�"�1;��ʊ���������� I���?����w�28�4'���EFW�,�R����"�ς��4������F���*��b����-�n>^0�"���p���>9�T��|�w���X�ˋ;�>&�x�ܿ���/�D���D^s4^U�1�ˇP����;u���_�y�q�x���<FQ���UeU9oʦ�5�h�*������%~�|6������� V�=:�:���T���\���+ᮛ�.��ZD1c�FxU��Dg�OJ����G���q��1��W1�q��2ۆ�L�G¾�x��|z�HVK���֔�Q�s��\�.����8��9ɫ�$��K�Vy��9`�⏍��Ǔ#����v�q�U?��i<� [��	z��X�FH�����|M���lP� �QZ?����l���
*��['��/�ߙRè��|�	F���'��!� ����������?�3��)�B���q�����7�>&xs?������ h��%Z��v�� ҄�C�A��� >� R�G�g�~���� �P��>g�~���y9��_�����M?�� ��V���̯�����O��3_��۳|'��9��`}>�!����_������'��]� �L����I'���i�@���/�5]o@�ѭk^Gk�-JyTF��Rv�e �������/��7�������F��m:kv �1�=5�I�[o|}�5{��,�����������ʧ�+�?�W�4Q���7�ū �u2:��ž�����q�AU��è�yڬ?v�O���\���&�i9CV����E�~|K��P������"E=�����
��໏ ���óI�G� ��!�e	��>���w�<�o�ZE�Y�b�w�\]H %Ԁ0	�u��~4x����;���þ��(� ��,�� B����{_B�*�qu���&;���tۄ�	�Y^��J2w��JP\�)�"{Q_�� ��w��?�v��
�>�3��� ��}?�v������Ce?����P�|����N.o��� ������P�6�m�����Ov��Z�BG$��A��?�'���R�����={?�M� "�� a����"�r�$�r,⟴���ac8����x����8�� ڲCf�Lpg�+���_6���>"�Ϊ5mv໧ƿ,p�s�^��5��_��G� �|T��7�F�f����sI)8�ז��܆�?Y���ƾ������2:����>�qz��v��j>ծ�]Z#դ���pxe=�����~�i��Q
x���-�6�~�\啇_,��:��պׄ>�K�K��-�!���ǘ��7���� >x+��o�/f�G��+���)R�M_H�rI7h�r˖��$�qn6涹��{oo=�������+DA�f<  �M~��:���;�zF�vBKgm��'��V3J3��3�Y~�e���Lu[8m䋑ut��?���3�_�;	��x69����>���<q����>+���}$s\��8.�OF���Z�IE�Þ\�Q��%;G��nVI[Q.]Y�ǌ�X���Zͻ����x��弬�� �⹪(��*�h��*?�J�}"�W��(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
(��
�eq-����$$���0a���j@)I&��ݏ��:Z�{g�x��f9��.gU�!���+�p��݈_|�؍�zJ�d�����Bv����*��='<�ޔ�~W��u�O�*֎�{6����v�ZO��q�&��ES S��|Eu�N�X�FI���=~����㖟k�O���-�� ��7�e��pȾ�ܬ��W��y��>kv�)�� �u)�h�C��~�p���a�_$x���~��t���9Z=��t�=�H#�_şD�\�c�^c���]^U(_ya����t�R��T��$}I�x��� ]x>��˲�B����?�h����*��M�Y�)�*�\��f�� .�e\*�,��,<���|��j�F�m�i�476���ȼ�6�>�
�Vw�� i��H�bM]w�.����I2q��z��㊩��;���~�T�y>����S�����>�T~bY�\�]A}g#Eqm"K��#�C+������	�o�-i?�' ��^�K�����T.�js��g�u!@z�����P��u8^�I)cq�VS�����9��� e����/��F��xg]d��V�o��!}1������mj���`��|���_����܈r�2�Sih~-��}_V�]���0)�� ����*��� c���:��Ə��k�N�'ڮ��L�o���� �i	܄p��+�޻2���a����N��O�!��T�Tt��Z����2�i'�J���bj��Q^�Ih�W���؎�= S{b�)����%H�A���i>��I�&�t�������YtT���&�`�c�־����^��?4���LtԵـ�V���f����-�&�/�~�_���x+�V�Z�� �c=]�EE� �ߍB����</����� �����K��L�u��������x�8�B�p8=qt���O�[���W*�{i�Y������[�L%��m�i�]��<�_J� � �ŅzF� ~M������3�P��Ƈ�c�T�����߳�������{� n-,�L�dĖ��ȓv�c͞	4� �_�'�$~$��T����J���m��A�T\(� kux���u��8k�N��U�{����� #��^X�-ވ��If����ጒ�����fc�'ܓ]�í�i�{)1	D�v��_;~x��\DI_X���zf�u��Av5ʴp3�o̏� a�/�O�+�J|�9�a	Z�H�4�ը�c��y�A�](��#;����L��d�����NR0G��k�����[x�� Wc��R���>X� ��ֹ�����O�8*�j�U�9��ʍ�k��r�^QFu��6�U�KG����!��"Ƽwr �^��F:�� ��b�F�o��P}w
�c�T(N��)�!i$u_%KkmD���#�G���?�j���O�ݺ6�qmF#����c\0A\Y5GN2ݫ���V�sl�ӂU��ྕ�s��zӼ���a��.b�J]���yt��쭰Q��yt�)sʻh�V�Q��0���(�V�Q��`�Se.�󊵲�������s�����(��p����( ��(���#b��!���;�+c�Oye�Һ򳝾s�?�b�\x���qx�1�[sE;z]h��ػ���$��I�MMmywf��'�a�cvBG�*EW��*Q�8{9�8�kO�77���M���W�2;>3���@��xث)� ���i�R�B�8{(E(�J���Ox�8>̚�؈� ���u�4�\He���v��K1���EEr`�R�� 廌T[��W ��+�H��O,�\�#n�9��zVmV0�(���Q��I_� �V�׶[��q,��vL�v��d�Z*�ѧV�X�'ѫ��	�.���Kw4�8CH��q�O�[��ZH&���thث�sP�R���?cȹv������u��B-��;�bZV#�k>OR��ɶ��;c��rz�F�㡒��i:pЌ��b���+_�	&�k�iݤ���9,��O5%��ݡ-i<������DUz+�T)J���S�ֶ���Σ�^ ���i���Fp�O52k�H�E}r��*��� 8  x�h�]�pT��*��X$���5$�m ��G�Aё���G5�8Fqp��} �d�g��[ɪݴc��g��fv.�1�$��i�W+���XJ�}�b�[$�k˻6/i<�3�=	R)noo/
��圯
dv|g�7��Eo�Z���5���� ~�>)d�E�dt9VRA�ȫsꚝ�f������We8��8�4QSB��RtӒٴ�^��il�<��\��1�>1��m��(V����m����W��5;h�6�s��%uQ�O ��U_J�y+AIvi?��,�H�����,�I$��y5�a���YΝy=��r��~@�(��`���}^�8���k�z��sT]������ vI��N+"�)`�8|%5GJ0�����dZjڬ�0^\G𪒺�� p+>���j5�Z
K�'��<wW0����t�$���>[��9�<Է��x�;���@w�FpL�皧E)a(Jq�*i�l쮽@
(�� *�����������9F}pP���a�W��^
Q}M}�K�oY�oo�'0C����ˢ��.��MB=��_r ��+��(��(��(��(��(��(��(��(��(��(��h5 	� "�
�2�Cd��;\KMj�÷#tZ�y@z	!V$c��-���<���5���I!x2:�� 2}p	��4���*��R�m�[H���S�}�C_D|M�`���i@_�P2�[�'��>GГ_5]�S3�g�V\��Ko�hj��[��hZ�V�Z�V���;���,��^-��r~ϻɺQ�PI��w+�p+�� ���ZL>�q;�¾�7	��̲�uٞ�>������O�M�� `����K�s��Q�_ƿI^����	���e�M��+o����o�_?��E�i���+m{_��	�P�O�m��Z�����D�L�z���ſ��x'Yk�>2tk��c>SL,}��{�q^<R��8g��.;�9�[5W�����/�8=�%��R�9]n��?jMc�׈��'^�}�7���,/M�; ��H>	뎽+�:��jpr+����O�(h���e�\���ɟl��_��G�/��j�N�M�rL�i��N9��yW���5��� ��j�K�7�c��UүC\����+��?b��^�6
�����ׯ|-������}A���3XO�-����>�_���'��a�MBr���	��~k�˟��g�W]T~b���Nm�Vm�����&�E �`=Cڲ+�?�~&� ��4��~.x.�;�uT��X��@~h�P$\m�9"���� �L���Ť�|;�ee`3Gv��'���y��8z��Е���~��G�W ��	)/����W�E��3��.t߈vWo:�Vl}U���C� �L�^��3��?{�pE�sn"����U�"�����#�7nK|���_K����0�ԢOiRYh��O�_#EiIB@2�g3��E~��`���A}�L�.�m�r������J���d�G��5�B��7�L��b��g
�h���j�$~�"�|C�c� w�aZO�^T\�^inκ9,!�bg�_�z?�<=�+����hA<E��F,O;�7��2?�[��-�9��|g��O�'�W������A��H���^��>�J���U��P����v/$��wv<�I昫^� ��pr�&��J�����K����}Z˕S��V���ǿ�#��Ꮖr�$���8��i���8�9���k�$V�˹,I$�ԓ�4���ElY�Ms4v��d�V��%�� {�&I��������'��o�_�a��J������.�S����_0�Lgˉq��Ӡ�"�����_xj��:O�么Dq��x�����j�|?��/�流z�a����=y�}O=|��j�Ě�ֱvN�ܔS����A죊�<��?|J��A9d9$��g���.�%���a'�n���T�*P�����qs�{�y��'�5/�ҥ��3"�� D��	?�s��+ɼ=�ϯ���U�g���9v�5����J����|#Цht}Z�48]�a�[V8�@�-���.͡��/[���|��w`h9ɲ���A�>��D�Y�'�K�
�I�!���I�~�^�`�kshǻ u�H� 
��~��G�}��Þ6�y �6�'���pbW�`A�j/~�� �ׄ�� ��0��E.?Em���|/�D,g�k��� �s��̥n��i�����]f�q�%�� ~��[]�^ ֗N9���� ��8n��O�H�2�����)��B�]@#�z-��#em;T��aʀ츯s������;�O*�ّ�V�%~C��v�s����"�gˑ���9��M���mh_Aiz]��� |^�.8��J��~W���<���Zg�{E(Z��B���k��{L��X�f����U<������i�����%ͬ�rH� �{��q��_���N�s8�P�K㍋;h�V�R��9�s2��]�k`�`��+�v�m�{�r���]��k`�`��w?�����(��p����( ��(ꯃ��?xY|O�����T�[hU��e���`x��^_��.�@�sqnbK���˓#���?Z�?�-�xxf�O���X��?*��R`��S��Cl׊�N� ��|m���9RmZ3�b9�CD������s�k��e�cĔ18(F��R�I)�B��S��r�\ϙ�o{Ɲ�p4W��_�/��Og�����J#]6�e=&3��+G\���!��]�G������ z}p��Z���������a�]>WR6R����},�������)`���9#b��0��pA��G_�FJIJ.�(�]��?x�D��*ڛI��|ٶ6cb���{���������+m	e1�I�|F�O�q�#���n?� ���a���0���u"���Ԗ�R���|��Z+ܼC�=�B�m&�H!����������c���VF(�) �0AA�|�qfx��)�i:rR�oT�������]�����<=d�$��X����������1x���`���� �~a�����_?Ş5������
�^��Wۙ+�� ���PQl��Y�_x&�[x���Ò#�|�I����85�x?�ǌ�q�.��}���G����p���q��k�̼M�<MK����`�4�[�>�M��I6���ɠ���V�|;�xO\������vl� Fܿ:RpU��G����x�C������Vh��>�d��ԮG�*��x[%ʰ��m�ң�����JiB|�s�+��E9+n�7Et)�Ω��v���ʢ������"DY�`g��^��hV�!�R�Z]�1��lr�2J�=��ږw�Wd�F?�3:Tp��}�YM(O�.p�Ϛ	�[t�g�֖���z��z^�n�Wsn)y�)f�} &���&ҵ+�.�Mg<����/b��dp{������Jƍ������S��[,���N'�(�x|5Z�N���)����vW���%��k��g�mR�^�'��II$� \��x'�
�k�oڛ�D;��� �5�|_���Y����t��2�IT�Xsr���ͻ��������?����#�5����iDBv��),��X���W�|J�`���<9���rC# �"���9��_���E��iFyV(����F'8�RMy���ψ�?���a5��嗕%���&�U��|���Q�8��^6�r����|Y����U��S���|��^�٩*sm�i�^����ZEz�~x���Y���%�bh$� 1�$1��;��������P������ʐă�<�G�H��쇊�l�+�u�b�[.f�BI�����m���b,V���S��� ��m֫}����I�o�g	�c�����A����mA4�
�K˗�dc8�c�s^'���Y��d���(�gHizZ(鮯a٘�Wі��'���̸��#!��А8�<��ox/�k[�2��>d@����~#��p� �g���r���Z��ATW���I�E��g���\j�XZ!�{��ug����Ԑ+�u/��4�>�T��d���&�gܧj �7^�f�/	K���F��y���L��K>*��|7�#z�� }!_�_�}"<��Ȳ�5*��	r��Rr_��w�q[O�z���TQE_�QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE �) �J(�
�V�EL�P٘�� R*�m�*׿|���W��R��1�_��eđ� ����=Mx:�[��kY㹶s�0tu�)� ��^~e��/*��>ϣ���I�\�O\�K�-w�&8x����:z�@��&� |� E�����/������_6�m5��mp�9bb��0U���\�V>U��WҤ4��}T����J�j�Y�g����)b`���+)� ��V��
����5t�i��c&�|��X�O���kU�3j�G�$yy��,�c;�#�=�xL�ʵ J�.�߇�/����cJ�YV�y��;'ʛj1�IF6I!Jn[�y���]�L��_i8���@�!7��L�íy�p��53�o��SYxM�]��]H~��x� ��U������!�_xj���?�dڠ���#�7#،W�x'BM���o8	�X$���ZE�?BƼG�/�,<s�����ZbI�,���dt� ���~-n�3��)����ں�I\�R�P��i�>,���f��O%�̋h	��w�_jh֚�i�Ū�Kwq*N�؆�h-�x����xo��'�x5���T� e��b�	�$Q�!!W�f�������0��#S}�/w�^�fSU�
#Q�V\I��Z�\F_N*�+^I/yɭ�W�eћRQ�՟x� F��񶵦�ڱ�H�1�%>b�+�T��i]����*�5(���q��U:����/!���(W�����<���D�r(I�X��~8E{�G4�C8��#Z��ψ�5��>�%�/� �Wr��k�H���ڼ�� $�g9f+(��ʍxJ��m7��I5�����wGw��x��UU����T�OwoS��+�T��<
�-qp�	e<1����J
���b���ɽ[wm��9�>i��T�k��x=��Ioo##O�;���y=�}���b���J�G�S��;O���3~,�����7]����c϶+�٫�v?�/�o�#�[j���}|�,;�'�TiHú�+���:I,�	,��F��ee��:G���F� �\7�W����w�<i${���A���d,��ȗ��V�����8�JxE^���w�Q_�=̶��Ge�3�~8�5�TDP�� UP0 � �)��x�W�H�I����rz/��\�:�\[�{� ������X{H+�ҕh�ٝ����j�n�cmx�'�%�����W��=��u����X��)�IVLb�:�`M�g�ձ��k��A�l�O����^��
U �g�+� �d~���i4h�M
G�M��H����\��|���$��J���BLi�Zd������څeu�2�A �u\3LT4S=J�?��������,�*�� �����2pNM�s�����g��,O�HZ�W���©ee� T��W�m��~����:��wvw�<3�2��H�mde<A���6��֞��uh��Y�*�,��;�Ӯ&Ul�T��ۄ3�����e%�Tݚ9�t��IK���K�ՠ��k�/���b��G�j��6��̩�<�����s3)�ty^�om.��9��������(��p����( ��(���{�I������ �W�����S��Ŗ�����,��Y��&D>�����\������ �Z�|��z�Z�~8����Yu{I`X���ܾ���Y�s��׏�"�~�������nʟ5L:���e�^��4
>����]�7��[�B=�!=��3ܨ������|M���P�0�bt������|j񟄴�s�3÷)���񀻘�F���=1�W�h>%�w�n��;h����่	Q[ c�������7�qx.5�u��:���Z2�,���S�v�%H�w�O��q��c�/������k�2��^[#ܕR��!�X���R}�^A^������<X��Qo��B���rc;��y� �c��� b��d��&��b*V�{�s�oiʴQ��\з#���]̞������ $�M� ��_�=������Ox��5�X�wqj�n���"��"�B�I>��]O��� $�M� ��_�=���D���s����P���Süs�� ḛ��a�b�*m�7�PN\�6�����}�Q�_�o����i�����;�T�_�QԞv�`����>6x$��i�h�!>#ҁ�"�q3B��Wy����d�|� ��,���|W���㟁n.1�z%ˠ'�H5��9l|4�@qG�1q�%iܕ��Lc��SH��GK�sx�{�0xo���Qm�i�܀7������ܚ��?j�ë~�D�i��H�h	럻�½��f��|0��t��Y�p�#^K,�� �v� w#��'h�q�������\�>C��Sx�d���%(�O�{�O���?zW�4�B�kc�cQӼ9�3��)��ӵ[u�)07&�u�u?��|��5��h����j<���Tt�����l��^��{G�о�Zn��.R���d��*�ت�v"�C�� �!�h{�V��Y�����^;�Z%r}7����+�:��I�W�Yeg��a��a��L=i{9C�u�V�Ĭ7њ_�ށ%��,u;h��׳E���� �b�����t/AV����OM�`=I�X�5��C�R��Y������Z��S�@#i�>�$1��\wƟ�'�x.�d؇T�DE�c�pG�,���|�e��)��q����5\��֒��O��Y�E��m�1�R�f��ZV��uC`re�~I�+"����̱�7�Z��ChzB��G ���MW����$��_�;Y���#9�����*��{�?��
��blK�����$o��c�S#�W�nS�ǆ|�΍j����&�]�r�O����-��v�F,�K1<�O$��o���Jƍ������^-^��>�Xѿܻ� �Yk�c��%�$���+� LL�n}�Sȁ��b�&���k�oڛ�D;��� �5�|_������ ���)=���٫�I���s� �׎^x��/�^��W�kws��N�<($�+�s��c������ _�?�-|��đ�[_#�{C� ����� ��1��?�E�q���41t��^�n���F��f||���$_��%�q��"�C�/�Bg?P+�����_�|F���7[����q�p����`���_j|6�>;�{�jx��6����0b�p� o��¸߁�f�5��׈D�:��D���m�'��K��+�^�{�� ��m��e>Lm��%}o]�5�|��ʢk������W�_ؾM
�q��# u�<8yO�v)��O�?�V^�5�Љ�5XR��\|ؔo�<��z��ȿ����$��uk���Xǎ�Г1ǯ�J�Q_}�B�� 	�׶����@�D��J��w�s.���X^���Y�q6��p���^J�����/k��>i�/��u���ׇ$�O�B�$�M�`��(=@���������������=�ݝ���`2�A�����Ǉ,.����.�h�Fd���ƺ�7�-�e��x;U��q�9`V22u��,�g�`a�p*ʪS�yqOM���v���J_�Zj�ﻠ��>2�#�7�˝|�;�e���!�lтOR���+�_���_�B޶���|'��Rx��ך��K�J�Mo9Dh�{s^��C�N������e��>���3O	HNْC��9U8�Qx���_�8�
sz�IU�I�x�'(�l$�)4�ԭRW�j��BJ��4QE��Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@(��P���E 2�Cd6*�H T�3P؅U��ijeZ��lUZ�
 �j��G���ՓR�;���DxY���=z���#E�4[hҢ����2}�(�� }O��W�*��IL~N���;s��^N'/S���ӗ,���˳�^��Ō�U�V�U���AV�
)@�<Զ6ӂTʵ Jɻ��S������v�%�������Z������5�:N���/6��� �Q����Z�sLJ�a+b?�-��pW�G�?��@�}��Bb;'�,q��)��a��g�� �5O��N���[IR���80�H?�'
���5���3|��
��b�ԯ�@��d�8�m���E�=� ߐ�.�8�Z���"F� ���*����d�4U�b&��򎭝�u.�F��]?�^�����[�W�}��#��5� ��c+؍��?����>%6����,'�)��m��Q�:����������`�/Cr1!&9��?7�$���_<?�،hz����/*���9����rW�H�����TwS��M�v�������NiF���:���á�_T���[Ga�:	��q��� ;W�_���[�f��fK/&�8� �R� ��j��H��Ü_��7�$���~�y��[�+$=*�ES�`T���8"X�S�T��*�C��AjUJ�-H�ȓKA�F����`�\>��� 2���3��������2"�<��Un�#�ے}3^&���)*á��v�ı=I��q8%^�*U��y|���4�^X��g�|q�����r�Z���"������	?�F�>x�Ų�W�<@`��Zh¶}<ɤ����_ړR6��4�l�֘��m� ��J����|*����hSd���ڬ��:�ė1�� �N�{_�x��殩.�+��A���y����X��y��J����,����T'�o����@w��J�}?圄}E~YF�b��L�e�O���?e��� ��u�?�nͽʰ�`A���L����a};��t<ʼ�R�̏c�3��&Ӵ�l������'���(�6sr��ݚ�ec?V��t]*�Y�m�����ޑ��@����?��|]�|_z3+Gy}!� ����a޿�����m�ٟ�6��#��W1��l��,P�p�{���왤�ӼA��� [<�}<�i~>b��~a}�:2}� $��c�2�ˇ����J���	_м��ܭ�����b�ˣ�.U�(�*חI�9��]��=�J�����`������(��p����( ��(�٧ZѴ�  �A�_�[HuY�$�$m����5��b|7�����4��-�֬l%Cgr�e��K.{�|� E3��ѣ+˸�?�L^-׆iJ��%��ZTܗ2�oHr촓�W6�?M���7����iuqk4���wl�"8�p�r �M�i�>Z]\��i�(<�2����R�� +�Y��BT���Ӥ�iq�>?�I�u�f+�B*�U�qF&�YZ|��[�;4��:�����M������]�������L4�~�n�0d��<����`+Ǩ����'���Ȱ|;�EƆ
���V��)6�ޚ��!�������1���uKy�k���4h�31V`y��ś�{�� ���&������� �y���� G�/��y�T��<��n��������II�Y�j�r���}e�-�f�?��w���[<�=�3g��23�����;��]�W;o�Ep�&r9Rp{���Q��=aix�_�O��ԩOcȹW�cF����<�[y�6�?A>|v�<M���~(���X�Dnҝ�\1�[�'���=+��
��?� []!nw>Ѻ/��9�_�u)�r�Y��� wq��_�qG�C+��b��k崱����=\b���5��Ke����>�����D��ۍ�7+{�̦?>#����m���}�8�|�:H%V!�� �s�Ze����<;�OS+��:�J�Y�ΣI�{$�cw���z�ۖ�~�x[Ǿ��7�j�:���Z�,�<�$�G��K0�����8|E��ZJ��i���E$l�d�F��4W�}�_���x<t�s¤)ӔU%9��%&��ȴWM��]X�@��4-c�z6�}�ZGu%�K:�<h�tcː�fe���J�����L!���Xγ�iV�­�����2�$T��xxK�C�8�1<i��J�����t�U/k+�%&�,/���zlWV
���v�?���٣��V�t��D���O��W��p�8��s.�Uӎ.�Z.I]�T��̕��{����Gꇈ��ߊ�O��{o�e�K��$Ue����k�u|�J��� J�����`��|�sҿ<h����9)����J�e���E����k�B����?g]sD��r��څ�������d��v��W�n��~'�6r��m�6��#2#��W����-�u�,|�O�'I�%iR4�3n��n'+�Y~�~5��&�|-�]Go�o��gX�H��U�2�a��_Nx���|?�KY�Q�������xݤ��B���5�cE~e�Л��Ӎ�q�#0�(Օ9U�i�n
*^�2q�����ٷ-[�Jĳ�5��\�9�Y]�ݎK3�O�5�w�ύzv��G�������l��%cV%�Rc�d���q�_&Q_�^+xK�x�ó����WR��e*s�j2��I�ڳM8���%;�����x���r�*�f�b�ñ|7�|b�g�����g���"kgl��q��� �<b�7�y�R��ʧ��*������Nx�*�n#�c�xw���b������k5���u�f���=s�L&��T��P,26�4��sǧ��Z�#�U�e͌��c(�#xؗd"!�!�c���N.�B�%GA�~��ѻ�y�E��1���\�,)���%W���Q�I�m4���E�,HQE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE(�(� ��QR��U��R(� ���Tʴ�Z�V��[V��
�ECd��S*�*ԠVm���U�U��j j`��E<�m�R�ЫSY�Cb� � f�U�l��U��� d�����y��{h����dl}C?Z�1V�C� e��|<{��I�_� b:�X��^�'�q��'���ڏ�w�&m�W���[𭖹�}?Ğ!u�D𕬗�d��Vʖ�D�o#ԯ�|�SǷ��au�I�m�0����C��,r��}����w�*X����D�	&6��y	�8N;����޾"^We�Xxc�[r�v��߬�o��b��#�!���wƏ�7_���u�]6���V1�X�'��� d�_��[���>�����"kYe�$g�#of\�־�>�e����ڤ4i/���j5ye��s�B��O�*K+��.��43��$��u>�ă���ַxdh�R��U��8"�`|=�i�(�,��%��^D%LuR�y[��l��+��~�4O�Z�����Yc�L|���
���Z�����v�f���ݙ/v3G��Tʔ�Z�-~��y�
*@��J�R��["T�U*@� Z�Ȗ��ԁjUJ� �r%��?�~�]G�z/��A�H,�*/$�u)P�z������<����<=�(�4�-9B��- HF=�Z�j�'�O���H<�c�].�D���d��p?�������������E�e��-/ ��+Ꮀ��( ��;������~xR:æ.���Q�k����E������[��oi��g��6��������[��؁,Sm�)�nǎ��g���9�G�Γ���\��'+�r�_�9��srkn�^�<ܧ��R<V4?ٺ��_k�V���e����<1�$W�� �٤� g|+��+������'��J��X��^�� s�W���:�DO�"�Q�gO_=ⷀ�T��c|=ѿ���iDa���e~?塌3�ŉ�ۼ3�YJ��� �H�3ʖ��gQ��mY��.��w�1�U�F�j���e.`�*����V�Rl��.ʻh�=*ז(��>d������(��p����( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( ��( �TSTT�P�ت*u�Z�Ed��R��T�*c�je�U� �l�@�L�MQS�ͱ6("�"��ʵ�dU��R*ԀT6�R��*��+6�n��<���V��[V�U�V�U�� k���&����Lp��B�:a�_5����5�c�!���*Z��n?鬊�������r_	xW����<ֶ�]�/$���+�,���G�����z�M����݂Ӛo��>;�w���f�'�5��mVy�{��Yr����q�;W&<%�5����=� ��ekq��O¢��ŧx�L��� �u w�����8����T�֫q��6�mwl�]~L��=A�]9.�d�uiէ����}�b�v���i���	���8xS�m����{�)�¿�o]���_.*��� >��>1�^�̤�v}�g'��1���+�2�,^�>����}\��eN�<�c}��G��m���}*�g�&��Ԁ�Svӌ�g&�D���|@�RA�j6Q�8��� �Bײ�3�,~)����t[_��ŵ�[B�$�	�v�P�^��������;Hѵ�Nm�e�f��q��3��|>IN�i�n�֋z��;��Mo3����ϓ��j�jeJz�J�ar<Fƪԁi�2�f�Kdj�(ZxZ�R�r!�0���$��T�K�����MUz�N�)� ]eS� "��YB��8G�J+��?�N�!�w�a��$�ʺU�����n?������j��+�7�	�M�� |q*�ʇNҠlu�Z[��}��:����\�����}?�� S� �����O��<�gA���<��&ȴ���qr��v�3�ǁ��.��W�;�����m[˴�H.c#�~>p:�^2=*�p�g[<ΖN�w��������'R*\��}Y\į�^�U�k�x��E@�0�mĸ�b�{������+�W��xZ��^*�A+*G�q.>X�^� 95���?	�@��> 7��f���e)HHM�� ǽ�z�� ����9��p��	�Y�����.����5*[ݎ��m/�W�?�/Q������[sakq4FHHŒ�S�7Ť|�7�O�~|��O�n<u�M`k�#���C$Qy6ֶ���!�$�b>b�{���h���t�;+(�( �B�*�S޵�����̞?	��JJ�2P��T��u-�g�^�6(��՟�w�#To~���F�U�-�]@�/�ہ�7G>����0�(�j���U?�m���%�x�V���$[ٙ#�� �R1_u���x�.]��� ��������� U�K�ՠ��k��������omh�A�T�Fʷ�Q��d�?,Ѱս���(�f�����(��p����( ��(����~Ҽ#��->���6�g6�}
�,2I%�f'nX�7>��\|=���:xw���h�O��I��F�h��,�[J�"6���v���Q'�k>�ki��������j�;I$�*���ɱ���k/T���S���CI����dXX��!ԯ���7x����q��y&�¬�J��9^�MTj� X�+j~��/���&��K�O���f����#�4�
��4Y4�;��-�n��R[���^�������ό��u�;[;��u��� 	"��縐�n�*�ՉQ���E��/���n����=[@ҭ�R��2;c̖��\��0@#�L��=�,��ޟ���f��Z����ww���,��Ys&@l����vy�z،�<�&8�)ʬ#Z��mFE���Һ�ݭ-{�N��S����nkV�#Ѽcim�N�Ql�}��	$m�L�Gïqּ�P�y�xK����m*�?ū-��6̳���v7L�	��s�k��i� 
O��㈡��k�^x�D���X��8�?,�qɕ�i��1��;�xW⇀l_�7zռc©�g!� ��� ���� sY}c3��lUz�m�R����ֵ�d�;Ge}�Դl����#T��58b�,ti:׈4��F�W[�pđ�Î�8&�� ���#������.���k�wk�F(�B�R��='�>|H�o�� i�x�[�!��5)u�"�M�9���I0	èdT��x#���oxwź��n��)�ර����/���1��\4���!��x�*f���8���n�u;�*q��QJ�ҌV��KT�O%7�]���>�,<;�j֚�x�n�قQc�1}��E�Xc��G������<5}�kZ���f�Q��-� ��>f N?�ǻ~�ֺ5�����ӭ��F+[�FמKI��Y ܾ�W%�o�����x�_����� ji����mp���� ݸy�� ��k�	�fU��f�*���yF
��̠��$���v�v%ӊ����~��"��υ�-o��^�~0����{i<�̒���}��� uR����_�[N�{�(�h��M"�J�!;C2��y+ߡ�d�?�|o�o��<�oZxn����U�Q%�����B�W�{mA5�~|>��|b����.��ꓶ������	�M	|m(�fM��f�*�K�������9J	R���I���Þ)]im�4T���s�?��گ�|9y�k6~�-/OZ��n�b�F���v��O�>��8?eoK�'I�j�f�^��Q�5������ö�y^3с�^��� ���|S����7:ޛ��r=v� T�]Z�o��Q���!S�F��F
9�"��><x0|r��j�,�P�|7��I�}�--��1�GB��)@�8�:t���N�⢩ەT�y[�Q�_%�r��n�k�XJ�+-{9���`�4�
k�"�� �t���]w�6{����ZS��`��+����!��|]Ѵ/� �c$�m:��E��v�c��<aMo|���#�|$Ԗ�M{�Z����X���Q�h0\�8'׭y��_i����j�6��:�R�;�[�_S/�W�̰�j9�1���T[r�쭦��5��s/s�2H�������߈�7��OB�aM_�����IM�ŏ�`6?}*��xk��?��%ӭ�jI�5�cS��FP��ʹ�3ҹ��_���'��񕎣���ú���G�������n^d*	� qI�_������V�
��5��� C7�3�dm�|F.�>�y�����Zm�Z��E����۫7\���G�^>��m�4x�O�ͦ��/���Q��V�����eS;G�+�_x��W�� ��ᦑ�o �z�ê�Wv�FY����y�ɻ���gѼQ�{^��P�'V�%��h����ȸۍ�B6�c8��u��	i� �����V�cz�of��[�A�g�TC�Go�q^��R���5Sڸ��T�i�-�\��5kEy��]�Kymc�>���xZ��|m�K4��֢�aK31�0�NUB�����&����m����|5���"����9c����?!&�#h-0%�)�+����z���Z�e�?���ɣ�������	KE$��B8<n�A⽀�j�e{���*��#�Ӯ|w��}"�}�QBU�('s�����k�<e���!QK����{�o��mf�g�㍜R���u<?M��o5=o^�iCÞ���	��5�T`@Y�88=H�r+�|I�D�?죯��_�"k�~���W�NM��x�7΄:�
���p<a�M[��>��V�׼�T���&��T�A8�+�p[ W_�[�W�?f][�w�<_�5���/���H�G-�n�8�Qrs�5tc����p��M�V�������n��VW��e���*��ϯ�yG���þ:�<A��"x[��y�u$��I��ĸ���NIP;״�;T���8�᝿���ԒUҵ;Y�Me�e�3����o���w�<?���x�>�ӯ燙m�Y9��J��# ���?i?�	���Lo������M#K��H�i�C38
1��8�V�EC���GW��?W�|������ߟ��Ӗ�Nܪ��<�D���ilu�sƺ���4mV�E�u�y���V�E�� 2�c�Mz?����H�~>h�񶣦�Z=�q�ؘ�$:��i���3�a> x'��w�7��Ao�r�ė��S�F�Z�.�=�Ċs�k�=�8&�� ���'¯���<=��j�&��j:�ی&{�Im�@�ebB�O��9�q��z�=I�5T*���H���Ko'���Qj�Q�qkm:����X��� ^i֭u�M�I�Z���1�D6�$�aFH��W�W��]Ҽ;�x��_����v:��~.mQ�X�y�>C� %�B�@��1^e_�e3s�є���V�Vo�YY���?��Q^�!EPEPEPEPEPEPEPEPEPEPEPEPEPEPEPJ))�(�T�)�T�*3$QRM*�Ͱ��QMQS(�Cd1�T�)�3S(�lC�T�RR(��!��2�5V���
J�M�U��%�TT�RR��6Cb�ՅZDZ�Eg&KEN�H�S�Y6Cg���Z0��)�L�1ج׏� l�!O��ҿ��-<k�����z�
���=��/�/F/�k��/[�f�L�d|}<��֩~�����]EVȳ�{��\>�}����s��ҥҒ_�r��;��a[�|բ�ڎ��[��L�mwl��#���w���o������i�pz	@�Ll>��R�}�������I�_K�4��d�g�S���8��8���8�����?��O�[� +]T��ˇ�r�v�{� �k�����R�S��gM��i\	��9��7���u�*��ߋGŮ�����,����~�: ��M}�]cE���mWþ�����b��t��Lnz����e�{6����\۹I#q�V��ȧ,�,Vc�Z=�_����^"Ԡ�Og׿���;�� ��q�ꇅ����v�� ��5�G�/�S�֨ ��DwK� l�� �7W�z�08#�}���c��ᑈu����>�Æ��5�q��>7�/���M5��`=:��̵Z�V�x�F*�� �ӂ��]O!��BԡsNU��+7"*T�i�jEZ���������������6�Ԯ��:���a��Dj�R�4���Q��4%<�5�ۏO)V4��{~U��������}�~�V_|L����� ����\��G�|G��]�#��X����OĚ�������~YˣiO��W�Fw,����>c���?d�
��tO.A���J���u7��c�z����?�ߊ��MC�յB�mB;{ͯomq<�id\|�[;7gh8?����V���Ҍn���}"�E��9�Z�>]�I�9���~�>-~�772Au�KM:Bc�dJ_�eр�{ש�u����K� 	��F���5�YR���pШٳ��@8=��@��0 �R�}�yc㌡?gik�Q�^]�}z�iiT#�f~D�C�W�/�k�S�`���C�Qm���3?��C��d#��5����h��,�;�[%��a
�1�D�'�'�y��+�����:t�*0�i�H��Ͳ��P�
�~ x�<�?x��"�E��X���Kw�8<u��� �����㻀�fԭm���౾��	��4��
��=>z��v��O�L�Q����ֶ"6v���s�O�7�_�a+��ط?�5�}��_j~Bdgr[D�?M�0�}c5���п�_O�W����'���� #�3i�bd�hQ	N	V6҄�s��y�[�yb�l4l4s2*�b�,U�����`�E]�lge�(�d�����(��p����( ��( ��( ��( ��( ���~о �/�O�5#M�&���kMN2��Vb�ce��bN:d���ϴWa��Խ�.
Q��٦�O�8����)�X�7ŝj�U��� ��[X�[.�{hF>X��'���Q[a0�p�c���F�%�m����y�[� �^3��k�C�Ε+KSg�}�ѐ�y�ǥdx�]��G�5o]��>�}s}*&v+��Ҳ�y�,@�:(XJ*��r��(��6����X(���QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE QE ������&Lr��EF���d��QLQS���%�E(�*E�QS���֜���3��FOҧ�?���ѯ1�T��n,��:�z�sK���F�j����\��V���s�H֦�R����84rj*@)��Q]-���Z�
E ��V�"�j­g&@�:-1�(��%��Tȴ�Z��Y6A��2h�N�huL>�}<����@�ߝ|��U:���n@r�ҭ��<�To�|1���	�E�o��%��ȶ�dSO�Fd�� Ǚ��χ_�?��%��/�Z�i�����]��hOV9����7��������Z���z%��)�&�t�Gr��O�׾?��}�kM
�o�~�LhO>�tQ�]o�ϊVW��������"w�m8�� �c� <���c⥂؏�?B�h�cɞhx���U?��SՏ�|�_Y��V�֎c�������/�?��n:��8�:7�z^�uOj��֏1��݃)�;��E}a�i���E�,v~*���|������O�7c���k��u�kZ,�)�<��u�;��]Y�Y*�8�,�+C�}�YwO��ƍu�j��̋���l�bh'��I�2����>�gR�o���/c$֭� }�?u�^д��>*�¥��m�\�d�������?g���H��ޣC=��Ncq�V`c�z�k㸗�)��yjҒ��t��{�u�`�WV�2Z3�� �z_�O���%T]��=oޯ��Ȫ׹�{�>��(o�|���I�x��� �v׊*��dدo��W������'���-Y/1jUZUZ�V��9��R���U+7"F*�����0�Ӣ�.Ϳx����8��bs�H��~�*W�?%��_�w�i�Sn�1�U/���s���!P=s_�X�g���� $���Ij�]��1�}���ZiVK�����_��Q� +O�V����0�pO%s�+sX���I���m�Mo*Fza��|uueye#Ew��v��G"��O�U�8>xE�a#8��r�ԜU��V����ө��j8���
�Z�/m�!��8��ִ�d�_+2�J�PqZ���e� ����s�k�,��d�Y�Y�� I/���b{��+��?�>+� 5�Σ��A'�����`_�� �cb��y�FU����U�"u(��B�������
���~�S�0V��@n\g��O�}ˏO2x���P��R�YӠ���1N��8 ����+7�_R����@�'�^�% K��4x���گ�EFp�z8ʔq8y)BIJ-j�j�'t�[��y�/�CC�!��ė�M|���fwC� |������ � �EkxKDOx[G�B.�amh �<��?�TuE� O��� �����#ȔE�G�b��)K�2BR�8Z]���3��h�V6Ѷ�a\���⍕cmh���
6
���eat�����(��p����( ��( ��( ���/�&�:�ד�F�?�n��5���/���mr��O��+��# ο1���'���5�B{�7�Q�S�����o1�����?�����#[�-��F�*o�eO�j� ����+�	�9�!���j?J��3�+�O�eO�j� ����(� �T����� §�'���T� ���3�+�O�eO�j� ����(� �T����� ����aS� U� �C���_r�*xc��W� ��_�G�2��?�5� |E����C� C
��"�� "��n����S���� �"� 
?�<1� A�� ��/��'���T� ���g�tWܟ�ʞ� ��� ���Q� ���_� ���=>� �§��� ȇ#>���� �T����� �eO�j� ����(� ������?�E_�D9���'�2��?�5� |E��*xc��W� ��_�G�OO�?�0�� �*� �!�φ诹?�<1� A�� ��/��S���� �"� 
?�z|!� ��O�W� �F|7E}�� ���_� ���ʞ� ��� ���Q� ���*�����r3�+�O�eO�j� ����(� �T����� ����aS� U� �C���_r�*xc��W� ��_�G�2��?�5� |E����C� C
��"�� "��n����S���� �"� 
?�<1� A�� ��/��'���T� ���g�tWܟ�ʞ� ��� ���Q� ���_� ���=>� �§��� ȇ#>���� �T����� ±5/�M6�k������W^��"����(_���K��b�g��W������|&�s=��mS�5�� ��x~F�����0G���^4�x���?�������o'mb������(��QE QE QE QE QE QE QE QE QE QE QE R�Jr��T�)��QS""��
h�VLD�*�EN��l��
�E1EN��LG�R(��S(��lБEe��%S� �?�5�`+/]� �T� ��j�>��3�T�)�*e���p*�5EN�P��"��)�*tZɲX�Z�Fi�v��k)2$E��º;k�%ҴD������H�O�k�Q^��9��� t�n�O�{�����C�;�yY�/�*��匟ܴ*�y��g臈4��tk���4WP=�ȸ#u��sЅ'����*�R�l�������]"�y7�f#�"�����#�_lkz\Z���P>��)���S=?�WϾ>�u������{y������N@~_���~�-Ƭy躟j1��mi}~&�v��q��i[��-XU����o�� �I���� ����~?�%Z� ��M~��|���e� �G��ҧ� ?�Ϛj­}(>4�$� ̗k� ��H>4x+��-����y�?��e� �G��ti���3��)�c��:΍)�X�Oܑ;����ܞ	��ώ� ���[�]Jی��e,;�W�~��k�m�4xn�t���d2�)
��Y��� ����iZ����4�_��ay�?uN�d�N��<W��V*S�:u���[���k�g~
1�iN�^['�A�]+L��op�1�˻��:�eV����j�ǃu"���D�퓆c� |�U�w��<�j��-��_����j��
�*�*�juZ���8j�N�J�R��nD7qk�G��ۿ~2�z��#��:f�ڝ���C�}��E��T�F+��H���H�-�I���/�� �͏Ż8�}"H�|Ce��1�Yϕ.=	;[�}+�x���R��/��z�UuB���g�??�|_��+��-�oF��4L�2�C,N�**G��k��o��� ���-Cp+\ČA�ae*���������/
�,Z��oJ����6�c���^s5���̾|S�J>��h�c�85�7��T�f�O�W_s>�5c%����?�<��.b������!��z��?�f�ٞ{rza�c�������'xM��s�:���&�P=b+�
� �@�j?4�U���0WS�;��ܰ�}����n�.�9}�בE���F��?�+���*3c~��̊A?��vO��)IDj����Ĝ~<q_�~� ��|J�/�OK�׼��%����OҾ���s���"_xsWј�HИ��q�vg�k����µ��KR��*6��s~:0g闅�_�G�Km,���]�rX�ۜ
�x�jMK����u��|�[kJ� 8��8��8��Lq_f�f� ����÷?���CZ�����Q�A�e#���1���@�^+��E����p���Kx�dwz��ܤ����4J]�Ws#������7��|���0���~	u܌UEN��d~�m�OS_��?�?���mrz�� N��� ����/}�Y�f�jM��kҹ�G���.�6�̀�m&ڛmh�@C��o��I���o��@�����(��p����( ��( �v�K�[Q���_T/g���2cpA�c�nſ.k��U�	�!x�(�K�{*� @�������_��z]�u�K��,qF�
�� 
��c}(�F<)���kG�u4~��oi=��>���ˌnf��Z��MЬ㴁0��c��ԓ�5�E�1f�+����U�J�m�RnR�{���~��EWQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@@ �2��� t?E&��$zv�2۔m�s� 	����ۀ|D�ͩ�<9������/�v�_Tך��M\���4�GAԧ�5h����I�Gpz��Vm~��}�c��'�6��M��˰Q����!�e+�����_�������-�U<M7�^�K^���M{�~�m��+0��+�QQ@Q@Q@Q@Q@Q@Q@Q@Q@Q@J��jP(�2��EN�� x��V燴�}JI��%b��%����iC���5�WN��e{���y⊔W������7��je�ޗ��� ��s�Ɨ�<���2������� ��q����_Kl�*�`�B��T�p�ډVG�(��Tj*`+�[4fk��%S� �?�5�QY��� �T� ��j��G�����*@)�*E�9"����AVVRdQVTb�AS����lz
��Q�Յ�dQ_f���){�����`�����G����|l��Hf�7�x�0������x��ߝ|�x�c�T��n1�n� ά�<���x��S��Y���9� @�k���^�L~x�Me�?�֫b<#��m`#H7�����~c�p��c��Q�f)m:� ��ca� }5��1Z�Y�K��W��N�8��������%�{�Fx���f�,�y0�ti~&#�I���Ө���l�U�pA ���^"��}:S-��3��I�A��[�W��~�O�{	<A��#�5�w\Y�B�=�(���>��q����Y��ҧU�5� �}�J�++��]���)Eu��~��J=7E�i���#�u˶08��Ҽ�7�:������t�)J\�!�'����?�<s]w��*h�ӛ�� !G-���P�I� h��3;u*}[-J����6��$g:K����f�/�~ك�k>(a��?�� �ƾ{�?���j'Q֮F��G���ri����ndie��;��1=I&��Z�2�a����*��� $�/$e_��GH����ҧ�|%�r5+ߟY���$�x^)Z�B��>�������Y�-��z��XW;6�� ��]�[�~��(������a��8[�����z|�_�:���*uNUV�U�QS*���G��*ՅZjUZɲ[;!�"� ��F�Uj�������#Z�k��?�K՝1z!�s�\�6��O��M.��OQ$߮3] Zx�+=������?�w��^�i��彴�����[$�O�޼Z��'���+S�ӝ(2�/9�����!��'�� BOC��֓���FR�5{� �q�W��Sg����	x�݋� ��^�<m~,	�x���&�n��l�WP��d�>�v�������4�Gt3�����n�o��{ķ�ūخ�i�y��2�U�XН��"�P~�(���?��t.�-�ӏ��͌olt���W�����p�T�9�Y�Z�Z.Ȉ-r��� �I� � �EvAErz�� N��� ����r�ߡ�U��K���.��y��tE��mI��mb�"�I����I����"�F��m��wG�����(��p����( ��(�?�t�z�b��L]kNn]�Q
���� ��
���4=4�Nң[;H �8�� Jׯ���S�k�_�C���"�伡{B>���W�7J�(����Q@Q@V^��Xx{E���IVzm��w�(P��� �ҧ:��:j��$�����&��Z��L���_Xū\�&��ھYmێF2kr��}cW��5}S���Ik�X�\�$C{1������0= �;����[c�h�2ӱ�}b��\�a�xϺ6T��_�����?����Kƥ���U��F�t�[=65�K��YE~`��
�j�����^C�ֶ-,�a;̦A�6�Q��{W_���㻿񭿂�,�lxjKɒ��A�v���0RH��e���0��T��_�\�)����n1R���[�n����Wş�'�[{�7�^�����ӯt�]B�����-��H#U ���Rq^1���^:��o������w7>z<�NT��d�1���rd�
�fi����ᓧZ<�n�#�䓒|�m��)5t~����~�F�u�^ǧiv^_�s.���,I�����Tq��~񇆼w���_	_ǩi�"Eq���9Gp�t��~?�I��ş���~5�˱����I"��M�h$�L��{׏|5��⏁� �W��[������ڮ�i{糩��u+B�a+e$�+�^�Y�.'��Y��q�\x_g'�J\���\�/z�D���;�;���W�x�Ɖ��V?n-l�M���Aȷ{eo�&O?#����Z�/ٛ���O�˝v��A�Ҵ�$Es��;�q),#��>X�[�}k�WgU�1����*��哓��M���e{n��z��������[�R�8
e��b@OA��=��X���v�{���wo&vM���Ӄ�RA���/��̿���RA�Ұ�� ]k�؏�}�5�x�G�I�:4��,W2�T��g9Ra �s_k��I���/�8��)NIҶ������v�w��O��q�xs#�v]{B�Q]mF�;��[V�1;n����⵫��;�� ���yCy�_��=+�Ϗߵ���^OxgKo���Ku-�@e�6	�;W���q�����{ש��ƻVQPO{ɻr�=�m�k��z[��%���_۟Z�|Mm��f���r�P�1,��+	9�d�^��+ּw�Lj�����M���Ξֺ���������@���qc<�6/�u0˙ӝX�8���7,�jM]{���)^��4W����ay�3źo��}"�U���_\�u���ƣa�-�ϵv?i>������F_5��m�vU�嘕 ��B�H�?�<EZ�[Z���6����k����Q{9i�}MEr^�5_x+C��h�ڥ���֨IXZxĞ_��T{�[_��OZt*|Pm;;��gf�~�0��+ 
(��
(���Ad5�{�s©�� j�T	���6ð�q�(�S��+��"��t�]�uP>k�I�'�A a� �Ms~��1��x��E/�c��.=9�'V2�Q�D��Ț��B�(����(�� (�� (�� (�� (�� (�� (�� (�� (�� (�� rԢ��*�dȑEN*%0��I��;�^� ���]�q>�w� l��j�����Ǘ��-l=EL*5(��k���� i� ��ף^w��Z����ٗ����=5EJ)�R
�!³��� �� ��֚���� �?�� Ct��cꈖǞ��E^�4�u'uF�$���n������� �M{5q4��d�0�l�PT�+�_L?�� �&�O�� =���5�,m�'��9�2
���2� �u� �MJ|5:�d�X����k'�����`���ST�*�e&J��[����?��-��ȶ:\R��F1��� �ū���3x��:>���������$��O��_�� ua�|2��kCk8��>��_�x�7���ˣ�����͞�Z�cR��˝F�MOR���� Yw<����9s���E1Ew�'�|s�-ܲ)t��Q)����9���֥���RJ1����$�+-Y���]_��ge�<�#E��O@ ��|��L�[k�� ^�k�N�k(��'��}�>�z�=��>�Ic��<Q"��0DH�G� � ����|I�o�ڛ���O+��z"ʋ�_+:���8Q�<;�O��]"��΋C���n����⏃�+[�x?�m ]K��(�h`>�����5�;�e���}�}�O����1�#��?�����^�����v��G����1� �$Jx���z}+/��[u2��O�So�������mG�g�"��+�|!���� �����QӦ�#[���:������^�1GYN#�^�3���=������C���v��O����mWKc�Z+��������6>G���^�V�?�2T��j�����-���[�; ���|e��t�@`��'�U��J�I� ���T_��4v�x/O��>yU�
���2���!�UjuZDZ�Ee&fvJ� ��� � Ѝj��g�#�/���kL
�+?~^��� �(��lw��~�?�d� �� �B��k����kCR_�?�?���� �� �Z�� g���I���i�i�R�f��)�S����[Q_��?�?���-s�� ��� � �Et�%�C�CI4�P�0$�9�O�ȴ����k���\�O�,{� ��?���ȳ��~f��������`�{��ڕ!A��s[}���\6+�RR�31�eb��6� �T�b���������(��p����( ��(���.�a���&�dR=?�X�1�9��'Ý�6�m�Sz�-�wϹP��קW��q���3�~G�V��Jo�q�mu�(����
(��
(��
������� ����ͤ�/�Wr�@���[��	�z�R�h���3x㏊4x�Z������a�ape�%f, ڍ��F+�<3��%���ڡF\��rnQW�����},]6��g�n���_����7��5֣3�6��I����$2���3�#>��?���	��j��d�φ���uc���I|���&}7���,l�E�;x�TPp ��|����a���ωڷğ���[�k.���X�ԁ��9�+�L��^�.Ͳ�N�ը��<�V����/uZ�W�cIT���������Z��Px�kkK�7��'�eD	L��»(�d;�O��]���<s�M;�R�����G~�ed'Β/�DY3�I���¼��G����'��=��tz|�WvͶX�p���{�{W�?
� b��_<O���n�Cg ��^E*���T|�:��5��qGp�8�"�b��]
j*���7*^��{(�Z������z�Q��������0X�o�1�*����Α�����_����@j���� �~�~� )�i�vZ��$ZDI1��,ZyQ/̦7*ǁ��W�?�f�g�~�?��F15��O��K��#���"����	���}]na׵XtŐ���l��!�G����1<4�.�g�ʔ%F�T!̧i�㣼et��k6K�\�����]F�O�}��e���t�m�����V_l�}A��g���M����B��.�.�";������ �J�߅}⟁~����SL�4]X��W�
ҧ��c�����������C��M�=�;/iW�_Z��q"�rdc<�3d �����Y��2ɱs����K0X�q���FM�<��WW�ȉTM;w?t������x��5�sE{�G���H�!>���o1����h�f>|��=q��]G���q��U����ؿ�5����
h_�l�cV�m���?S}Z��s-�H��ur��Y��B�Ϥ'Ч����J>ʦ'���j��c�4��]�c�-��>9��?��o� �%�� ������\��d_x����Y\�	��.mV�g�G%������'3�7�&�>�{>�o=�{`� 06� pFz��e�+�>�|���ym���$�8y^RX.W#���<9�l2�����q����+��84��J��^�w&59b����߅���� ��|Q����&�����g����ظPXz�_�7�?�?o~��;G �Sԍ��x��Z��7 *���Ҿ�����	��a��^YK����di�VR>u�����q]W��ً���눵mc��u�c.�g�Hѩʤ��k��y�Nͼ_�Vc=:XJ�'���_5	96�_j1NϗG��F��on�>R� ���������3�i�V���W�NZ��G�������<�� ~���7�wL��w��$:χ,4��#�������<���� y�蟇߰��ox�����%��E�ov��gU>88l���k�Ýⷁ5?kR=����:�H^VTt�e{q_;��? ���U�֝|>��V���xռg�WeI��ҷr}����~O�:_�5?�?��=�G��E����Tg+so^Lk� ]<��ū��|Cq������/�M�ս�3ͼ�A�� �V��=��[�W��Ꮑ:V��h׷�֥�K���0�"B� Tns���p��c�| ����J�/��!��+{{��G���P%P���k�#�_���᜽�0����%��ͧ�������k|�>��4�(�* 
�8  �E�t��g(QE QE QE W�?���5׆mA���B=�0�� ��:�:� h����{HtZL�t�d���O����������\u5��)V�'�)StW����3��z(�����( ��( ��( ��( ��( ��( ��( ��( ��( ��Qր$Z�j1S(��rU*��EJ������� ��� l� �j�Z�!����� ���-|�?���~E�bU�SEH���
D�W�k��&�� �?��DQ�y�� !i� ���n]�G��FS���R
`�y�{�(��pĦ����������O�  � �֪��cꈖ������?���D��T����� ٫�AO�y|�"b��E8��T�+Γ*�*t��zVr&G�(�VPT(*+��'�￳V�5�:l���Ӣ��a��FcB~��k�OڻW�'���!P���;tf?��%p� ���׉<I.���1�њI}�'�^� ���:��k�mj�]Lh�H,�w��F�oBN�<f��ʚ�T�����Wg%��_��a�?�����ÿ���"��A�y?�4[}��7���6��j��#�W[���V�a'��@�V@l��!��c��|�j��+���<��:ݎ��� \�~c���������� �G���Q�<eE��k��X�R\������NN��_��� �q�$��ӻI#���I$�䚕���y�a�E�� �f�/��������'�����G�?�g&�� ��|�O�]� ߳V�>2��� �f��?� ?c��)� +���ֻ��u��Z?��rLRq���k�.t_�d����]4�$e�� #��ч>������k����i�����\�{a��[��H�k��{0���?���ƝU��Z�I_TtR�H�I��=�����[�^.�]f�����6`� �[��}	�����P2�*�=������_��N]�6�47�߅����[����\�'�O{Y�ΎHLM&:�]���_%�������������~�����mNj?�ש��������q�BT�ppjdZ��|���QMQS(���#�҇�_�/�֘�����_��0+����z�Qz!@�iT�+�(jK��'�� BOC��֯�C�O���*��?���tE��^��d�4n�N4� Z�lѱ�j@��)�T�KcB�-���l���W[\Ơ����[���k|'M�K�xZpZ�lԋ�5(Z]�����������mw`������o��M�1]��G�����(��p����( ��(�o���^ץ�&�-]����c�Q�נ�|�P���~:�20t%YNAGB}��_�u�����ϊ�X5h@��8[�������Z� ,~��F�n'?�j��̒�S���*���ծT�R�YOg6���LQE�X�Q@Q@Q@Q@�s�{�7��R���tϫ�1����)���׻QEz��u�ͱs�fU�Z���'v�_rI����??g�|G����Hך�j�Z�l"��x��{��/�C�j�j(��c��(a�U��Er�7�Sե�\op��gMMgH���H��[f��*,�P�0����֕�S�*sS��Z����=��SS�o3V1}�[����I�bq�^�Eߛg��<vcZUj�ה�۲I]�$��m݅Q^h��(��(��(��(��(��(��+Ğ'�<'�I��+mo8���� u�1�ۗe���O��*�j5�)�Rod�շ�7�O�x��z��S2���"y�vE�[�����������̓�H���;��OԚ�_�_u����$>�)gm����7��s�W�����F�~p���_�8�YU����I>��nmh�ڻQ�1��QEZQE QE QE QE QE QE QE QE QE ��ր$2��T�P�3%*�b�ZɃ;��� ��5v�\O������ ��ۨ���� _/ȨlH*U�GJ���d�^}��Z�����K^��Z����ۗ�~��{�*E�
�Ey�	�Vn��  �� ��֢���?�?�� CZt?�TL�fg��|� �?���U�3�>���]�я�4�_��~L��QQ(��W��*��z�H*u�Y��{�d��
�G5�28��� �{A[��y,xm^���Ԣ������~%|k���oJ�/R+���<�l@G��r�}���>|2�m.>UӴ���ل^l���-_���캞�u�O̗s�;� �#?��ƸCG4ͳmx)ǚ���V��(����ѣNvg��Ǐ�g�����¦~$������Z�2���Yw��� _�x�W���{*�r��z�+� ~��*a���7�W��/�W� ��VO$�� ��
� "^*������� �A��� �L>5�C?�_����^D��A�c,�/� �x� �+����o�y����~���¦_�������_�&QS���`?��~��D<]o�y������� ߵ� 
��x�V�G�Ě��IVg�B�!����J���ן��t��c�G�*��k����F���OD�?S�����M�y� �����;�@��@=����U�?m<�n+��xF�BA�1\��r���J}�<�L9j�y�(��Tj*`+�L�l������� B5��������� B5�����Y��� ��+������I� � ЅU��w����@�I� � ЅV���������K���d� x�е N��@8
 �J����E�$� �� �"��+���2O���+|+�ߡ���BӱKJq��n Z]���tE�\^��v��]�)|G=w�[m&�󊱶�����`�����(��p����( ��( �+20t%YNAGB6�M&���+�_�O�|3zv����)���}�ǽ}?�|w�q����~�+�;�(s��?Z�֢��|M�xq�����BX,D�r��c'��jP�w����?Za�.<ZŉS�q�l*o�J|1� A{�	�� ���
+�9�͌���qT����>�~E{O#�����^�� b� �� ������ ����������)��� �GS� G� ��}��� �J|1� A{�	�� �����^�� b� ��B�?�O�u?�D�`{G��o� ������ �����?�)����?�&/�*�$(��)��� �GS� G� ��}��� �J|1� A{�	�� �����^�� b� ��B�?�O�u?�D�`{G��o� ������ �����?�)����?�&/�*�$(��)��� �GS� G� ��}��� �J|1� A{�	�� �����^�� b� ��B�?�O�u?�D�`{G��o� ������ �����?�)����?�&/�*�$(��)��� �GS� G� ��}��� �J|1� A{�	�� �����^�� b� ��B�?�O�u?�D�`{G��o� ������ �����?�)����?�&/�*�$(��)��� �GS� G� ��}��� �J|1� A{�	�� �����^�� b� ��B�?�O�u?�D�`{G��o� ������ �����?�)����?�&/�*�$(��)��� �GS� G� ��}��� �J|1� A{�	�� �����^�� b� ��B�?�O�u?�D�`{G��o� ������ �����?�)����?�&/�*�$(��)��� �GS� G� ��}����J|1� A{�	�� ��MK�_���/}�Y��A!?@����+��6�~S�����4���M/���>��o�;������{��i��>����/�|m�?_�� ]�����8��8��_��}����d+�-gZ����OH'�AE>�!ɰ��+�1Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@H�H�"Յ��Z͙���qP��k6'��xG�^����]����z� ��5v�_7��<�_�qؑjQQ-J+�d�-y��?�m?�� @Z��?�?�-?�� @Z�˿��?ȉ�zP��2ך�e��o�AS� �?�1Zb�5��M�  � ��:?ď�&[3?�>���]���A� ?��� f��{Q��4���q���ED*a^xɖ�J�zV������mgM+�U5���m�=�+J�|����]��J���o�^EO�\�S���� �*o�w�k�?g/�>!_��n��i�Cm�EqrY��x��Cٜ��s����ׯ��c&�[�O�΍	J�b���7㞰4��!�F��Z}�1�7L ���¿'��I?j{}j� ���j�w~�J�#�6=�����1t����������R�R�NroV�VK�L�͹�Z�l�]EN�����1�  �������^/� �\������2����~�x����aEN�ԯ��_� @ɿ�����.� �d�����/�� ����2�?�q̯J�t��_� �6o�w�j�xş��� � �X�7���޿̏e?�g6��A]*����� � �<�� 0���񬥎��������U?���:����ټH��s�~ o�d/�|U� @����¾)�����(L�������f��~#WR�����EҍHԌ�^��~%���6�`s�	��Q^>�����u�����(uQ����xj�3�� ��� � ��{0��NITJ��^�FeB~יE�qEJ+b��z�	����(�V >��d^�*�k�5�yR�N�Ga����_��U�����_��Q^%w�����Zp���ʚ�� B��� �
������V���'�� BWD� ����[E��^��s�����i*E��*ԀRO�`�r�����B�P3\��� L��� ���
���a]��H�NN�r6Xд�i�iv��=��m��mq�����z�
�h�NV�oֻ�s���C�Z�z��t�N���`�7ƭ��t�:
ۯ��<T�߃�D��=΍/��~�ٜn��\�=������|��S��A�qW�ZI|�h���囈QE��Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@J�J�	�H�:�+S�f�$:�+S-f'��xG�^����]����z� ��5v�_5��<�_�qؕjQ֢Z�u�I���\� ��� ��kЖ��\� ��� ��k�.�+�� "'��"�Z�T�^l�qY������ ��b��fk���� ��)��l�� ���g� �Wf���S�^���]�u��y|�#(�L�ju�P�Z�k��N��	.��5ȮYR�X�@[�;���*��V�fB	R:��vb(J�v��.Y)W��_�>$��7��6���+z��;�r=9���Ե�����7������7��o��~ޔ�N����	�sW̢~��C�E��u�����
�a��� z`\ ��Q�?��o����VQ�?��o����Ya����F�m��*f\��'�R-|4���� ?S��� ���� �S��� �\/����2��_�}��"��k�_� ������XMB� �~f� ���k)p|����� �����}��jq_��� ?3�m�5e/���_���?�B_���� �L�����z��Z��o����_����__�Ŀ���e.����?�������>�*E������~%� ���j�_^� �Ŀ���f�N_���� �C̗��'��Z�bU�����r1�ҹ!_!�����K� }����{{� ?� �m\��7�_���_�K��������U�����]@��c�C �M|�)�qq(�,��ј���V��,��d�����>٭-c�҇�_�/�֠��+�<b� ��F�+���%��
*U�TV+j?��'�� BSD� ����W5���� �
������ke�	z� ���4o��TTj*a\25)�RS�Vm���_���?�?���Es���2O���+|/��j�	���
 ��\F�K�R�`T�q�k���4�va%�͈{ĝr��� <O�K����]�a��m��	$� I�s_������ �I���}'� ���~����lj�1��tR3�j�$��H�ˍG�|���i_ļR�xϫ�W�W�n�}�>�'ɾ������������1���|	�K}z�L���qv��9�88�+��� �|Q���h���g:�Q�Ue<k���čo��� \��G�l�b� Ĥgc��lpG�φ~#<����n��w��� �.����Z��1Xoh����SEy߃>(xK���ݤ {K�T�3���;w/�ϢW��_�aq�c���S�٧ty���AEWi!EPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPEPR�ER�{�N���Y�	V�Z�ju�����?��� l� �j�ָ�� ����� ٫�Z��w������īR��ԣ�pN�������� ��^��������� ��]�w��ꈞǤ��jS-y�0��o�As�?�1Zb�5����  � ��:_ć��e
� ����� ٫�N��xW�^���]�u���<�_��v'^�2�+֦Z����XZ�;U��ٙ悬%WZ����,�XN�]j�V23,-YJ��a+�V�%WZ����{��ZJ��j�V��aj�Ue�	XȂ�Ք�U���e"��S�@�:�/bY(�V�*�r ������� ����ǌ_�/�֘���%�u�d8T�P��k�ڏ�yI� � ЅU�zM� ��kQ� �)?�?���/I��?ֶ_������ЭJ*��p��}H�H������\���}��� A�-s����'�� Aх�ߡ�_�:�ҤZ�t�����0���Fi�⡒�+ƾ �� <)}�?�%��`��ۗ��܊$��9�TrO�Mq� �k/�#�������~]L�s|[	T��3�G�ҿ?h�?�_�&���=�U�F��[3{}�4�[�&a�H@�
8�4�j}9BJ�E������`rJ���R\���������o�ĭK�Z�c�Bm��S��M:'co��qy8i�� �����y֩*��'v��iS�8(AY#���袊 +�/��.i� ��3_�����?�4� ��?��� �������?0�'CEW���Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@H;Tu �@2U�U֬-ffH:���j֦_�P��;_	���'�5ݯJ�<%������v�+�� �"�"� Z�u�W��íy�/��<�?�)q��� �Ez� Z��c�B���Wn]�Iz~�������}N�_q>��Z�"qҲ�����O�V��YZ��������(��X��'�(xW���O�]���'¿~�Z헭� �?�b�����^�2מ2qҥ?���D:T��S}�����XJ�;U���gej�Uu�	X�̜v�I�UQڭ'QYH�X^�a?«�Z���X��E��VS���֬�AX��{�Յ��]�X_�XH��� Z��Y�YJ�Dȝ�L�
� Z�k�,�T�Q
�k7����?��V�u�+'I� �5���a^o�^���p�R�D:ԫXH�u/��o�� 1U4O�/�Z��Ǔ}W����}�~�����9_�ЭL;T+S��#bAҜ��Ҝ���D�ڹ������?���{W9{� r}G�Ӆ���[�:����
�u�����*Qָ���ڼ���� �'�O��� �룵y�� $OƟ��� �+��
���6�� ��W(����8(�� ��
```

### `src/flows/stocks/components/Discover.tsx`

```tsx
import { useState } from 'react'
import { Avatar } from '@l3/components/Avatar'
import { Badge } from '@l3/components/Badge'
import { Card } from '@l3/components/Card'
import { Grid } from '@l3/components/Grid'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { ListCell } from '@l3/components/ListCell'
import { PriceChange } from '@l3/components/PriceChange'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { Tabs } from '@l3/components/Tabs'
import { Tag } from '@l3/components/Tag'
import { msChevronRight, msCurrencyRupee, msTrendingDown, msTrendingUp } from '@l3/icons/material'
import { inr } from '../../../shared/data/format'
import { watchlists } from '../../../shared/data/portfolio'
import { Rail } from '../../../shared/ui/Rail'
import { useMarketSnapshot } from '../../../shared/data/companies'
import { shortcuts, topMovers, type MoverList } from '../data'
import { t } from '../copy'
import styles from './Home.module.css'

/** "Do more with Lemonn": four feature shortcuts, with a count or "New" where there's something to see. */
export function Shortcuts({ onOpen }: { onOpen?: (id: string) => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('shortcuts.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('shortcuts.title')} /></Inset>
      <Inset paddingInline="16" paddingBlock="00">
        <Grid columns={4} gap="00">
          {shortcuts.map((s) => (
            <Card key={s.id} variant="flat" padding="none" onClick={() => onOpen?.(s.id)}>
              <span className={styles.shortcut}>
                <span className={styles.shortcutIcon}>
                  <span className={styles.shortcutCircle} aria-hidden="true"><Icon icon={s.icon} size={24} /></span>
                  {s.badge?.count !== undefined && (
                    <span className={styles.overIcon}><Badge count={s.badge.count} color="neutral" label={t('shortcuts.watchlistBadge', { count: s.badge.count })} /></span>
                  )}
                  {s.badge?.text && <span className={styles.overIcon}><Tag color="error" variant="primary" size="sm">{s.badge.text}</Tag></span>}
                </span>
                <span className={styles.shortcutLabel}>{s.label}</span>
              </span>
            </Card>
          ))}
        </Grid>
      </Inset>
    </Stack>
  )
}

const moverTabs: { value: MoverList; label: 'movers.gainers' | 'movers.losers' | 'movers.under100'; icon: string }[] = [
  { value: 'gainers', label: 'movers.gainers', icon: msTrendingUp },
  { value: 'losers', label: 'movers.losers', icon: msTrendingDown },
  { value: 'under-100', label: 'movers.under100', icon: msCurrencyRupee },
]

/** Top movers: gainers / losers / under ₹100 (chips), as two rows of stock cards that scroll together. Prices update with the market snapshot. */
export function TopMovers({ initial = 'gainers', onStock, onViewAll }: { initial?: MoverList; onStock?: (symbol: string) => void; onViewAll?: () => void }) {
  const [list, setList] = useState<MoverList>(initial)
  useMarketSnapshot() // re-render when fresher prices arrive
  return (
    <Stack as="section" gap="16" aria-label={t('movers.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('movers.title')} action={{ type: 'view-all', onClick: () => onViewAll?.() }} /></Inset>
      <Inset paddingInline="16" paddingBlock="00">
        <Tabs
          aria-label={t('movers.tabsLabel')}
          appearance="pill"
          items={moverTabs.map((tab) => ({ value: tab.value, label: t(tab.label), iconLeft: <Icon icon={tab.icon} size={16} /> }))}
          value={list}
          onChange={(v) => setList(v as MoverList)}
        />
      </Inset>
      <Rail label={t(moverTabs.find((m) => m.value === list)!.label)} visible={2.39} rows={2}>
        {topMovers(list).map((stock) => (
          <Card key={stock.symbol} onClick={() => onStock?.(stock.symbol)}>
            <span className={styles.cardStack}>
              <Avatar initials={stock.initials} src={stock.logoUrl} size={48} label={stock.name} />
              <span className={styles.cardSymbol}>{stock.symbol}</span>
              <span className={styles.cardPrice}>{inr(stock.price)}</span>
              <PriceChange value={stock.changePct} size="sm" arrow />
            </span>
          </Card>
        ))}
      </Rail>
    </Stack>
  )
}

/** The user's watchlists, each opening its list. "New watchlist" creates one. */
export function Watchlists({ onOpen, onCreate }: { onOpen?: (id: string) => void; onCreate?: () => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('watchlists.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('watchlists.title')} action={{ type: 'view-all', label: t('watchlists.new'), onClick: () => onCreate?.() }} /></Inset>
      <Rail label={t('watchlists.railLabel')} visible={1.6}>
        {watchlists.map((w) => (
          <ListCell
            key={w.id}
            variant="card"
            as="button"
            iconLeft={<Avatar initials={w.name.slice(0, 1)} size={40} />}
            label={w.name}
            description={t(w.count === 1 ? 'watchlists.one' : 'watchlists.many', { count: w.count })}
            iconRight={<Icon icon={msChevronRight} />}
            onClick={() => onOpen?.(w.id)}
          />
        ))}
      </Rail>
    </Stack>
  )
}
```

### `src/flows/stocks/components/Home.module.css`

```css
/*
 * Stocks home — the insides of each section (the page layout is screens/Home.module.css). Tokens only. A section is
 * a Stack (heading → content 16, DESIGN_SYSTEM 2.3) with the heading in an Inset (the 16 page margin). Most of what
 * is left here sits inside clickable Cards, which are buttons: only spans go there, and the layout blocks render
 * block elements only.
 */

/* ---- Index strip: NIFTY 50 23,146.15 +0.65% › | SENSEX … — scrolls sideways (padding inside the scroller) ---- */
.indexStrip {
  position: relative; /* keeps absolutely placed bits inside the scrolling strip (see Rail) */
  overflow-x: auto;
  padding-inline: var(--l3-spacing-16);
  scrollbar-width: none;
}

.indexStrip::-webkit-scrollbar {
  display: none;
}

/* One index (divider + card): a horizontal Stack. It keeps its full width in the scrolling strip — a Stack sets
   min-width: 0, which would let it shrink. */
.indexItem {
  flex: none;
}

.index {
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-08);
  white-space: nowrap;
}

.indexName {
  font: var(--l3-text-label-12); /* live app at 360 dp: 12 */
  color: var(--l3-content-secondary);
}

.indexValue {
  font: var(--l3-text-label-12);
}

.divider {
  flex: none;
  align-self: stretch;
  border-left: 1px solid var(--l3-border-light);
}

/* ---- Holdings: the biggest number on the page ---- */
.holdings {
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-12);
  padding-inline: var(--l3-spacing-16);
}

.holdingsText {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--l3-spacing-04);
  min-width: 0;
}

.holdingsLabel {
  font: var(--l3-text-description-12); /* live app at 360 dp: 12 */
  color: var(--l3-content-secondary);
}

.holdingsValue {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--l3-spacing-08);
  font: var(--l3-text-heading-28);
}

/* The round "→" that says the whole block opens Portfolio. */
.roundArrow {
  display: grid;
  flex: none;
  place-items: center;
  width: var(--l3-size-40);
  height: var(--l3-size-40);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-primary);
  box-shadow: inset 0 0 0 1px var(--l3-border-light), var(--l3-shadow-elevation-low);
}

/* ---- Small cards (products, movers, sectors) ---- */
.cardStack {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-08);
}

.cardRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--l3-spacing-08);
}

.cardTitle {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* live app: long sector names wrap to two lines */
  font: var(--l3-text-label-14);
}

.productTitle {
  overflow: hidden;
  font: var(--l3-text-label-12); /* live app at 360 dp: 12 */
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cardSymbol {
  overflow: hidden;
  font: var(--l3-text-label-12); /* live app at 360 dp: 12 */
  color: var(--l3-content-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cardPrice {
  font: var(--l3-text-label-12);
}

.cardMeta {
  font: var(--l3-text-description-12);
  color: var(--l3-content-secondary);
}

/* Product cards (live app): the chevron right after the name, 4 apart. */
.cardRow:has(> .productTitle) {
  justify-content: flex-start;
  gap: var(--l3-spacing-04);
}

.cardRow > .cardMeta {
  white-space: nowrap;
}

.highlight {
  font: var(--l3-text-label-12);
  color: var(--l3-content-accent-success-default);
}

.chevron {
  display: inline-flex;
  flex: none;
  color: var(--l3-content-secondary);
}

/* "New" sits on the card's top edge, at the content's left (the products row leaves room above for it). */
.onEdge {
  position: absolute;
  top: calc(-1 * (var(--l3-spacing-12) + var(--l3-spacing-10)));
  left: 0;
}

.onEdgeRoom {
  padding-top: var(--l3-spacing-12);
}

/* ---- Do more with Lemonn: four shortcuts (an Inset around a 4-column Grid) ---- */
.shortcut {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--l3-spacing-08);
  padding-top: var(--l3-spacing-12); /* room for the count / "New" that sits 8 over the icon (the card clips) */
  text-align: center;
}

.shortcutIcon {
  position: relative;
  display: inline-flex;
}

/* The count / "New" over the icon's top edge. */
.overIcon {
  position: absolute;
  top: calc(-1 * var(--l3-spacing-08));
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.shortcutLabel {
  font: var(--l3-text-label-12);
}

/* ---- Smart Invest strategy card: a Section (12 padding, 12 gap); the head is a horizontal Stack ---- */

/* The head's 12 below and its hairline: Section pads both sides alike and has no one-side border. */
.strategyHead {
  padding-bottom: var(--l3-spacing-12);
  border-bottom: 1px solid var(--l3-border-light);
}

.strategyName {
  flex: 1;
  min-width: 0;
  font: var(--l3-text-heading-14); /* live app at 360 dp: one line */
}

.strategyDeposit {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--l3-spacing-02);
}

/* Three stats: left, centre and right-aligned in auto · 1fr · auto columns (Grid has equal columns only). */
.stats {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--l3-spacing-16);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-04);
}

.stat:nth-child(2) {
  align-items: center;
}

.stat:last-child {
  align-items: flex-end;
}

.statValue {
  font: var(--l3-text-label-16);
  white-space: nowrap;
}

/* Last week: one small ring per trading day, profit or loss. */
.days {
  display: flex;
  gap: var(--l3-spacing-04);
}

.day {
  display: grid;
  place-items: center;
  width: var(--l3-size-20);
  height: var(--l3-size-20);
  border-radius: var(--l3-radius-full);
  font: var(--l3-text-label-10);
}

.day[data-result='profit'] {
  background: var(--l3-surface-accent-success-light);
  color: var(--l3-content-accent-success-default);
  box-shadow: inset 0 0 0 1px var(--l3-border-accent-success-default);
}

.day[data-result='loss'] {
  background: var(--l3-surface-accent-error-light);
  color: var(--l3-content-accent-error-default);
  box-shadow: inset 0 0 0 1px var(--l3-border-accent-error-default);
}

/* The footer's charges + Invest now: a horizontal Stack that fills the footer. */
.charges {
  flex: 1;
}

.chargesText {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-02);
}

.price {
  display: flex;
  align-items: baseline;
  gap: var(--l3-spacing-04);
  font: var(--l3-text-label-16);
}

.was {
  font: var(--l3-text-label-12);
  color: var(--l3-content-tertiary);
  text-decoration: line-through;
}

/* ---- Highlights ---- */
.highlightCard {
  display: flex;
  flex-direction: column;
  gap: var(--l3-spacing-08);
}

.highlightTitle {
  font: var(--l3-text-heading-20);
}

.highlightValue {
  font: var(--l3-text-heading-24);
  color: var(--l3-content-accent-success-default);
}

/* ---- Invest in ideas: a basket's logos, 3 across (live app; L3 Avatar tops out at 48 — live tiles are ~80) ---- */
.logos {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: var(--l3-spacing-12);
}

.basketName {
  font: var(--l3-text-heading-18);
}

/* ---- Disclosure ---- */
.disclosureText {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* live app: four lines, then … Read More */
  font: var(--l3-text-description-12);
  color: var(--l3-content-tertiary);
}

.disclosureText[data-open] {
  -webkit-line-clamp: unset;
}

/* "Read More": a text link (live app: blue, underlined), not a button. */
.readMore {
  padding: 0;
  border: 0;
  background: none;
  color: var(--l3-content-accent-discover-default);
  font: var(--l3-text-label-12);
  text-decoration: underline;
  cursor: pointer;
}

/* ---- Announcements: the campaign's artwork, full width, radius 12 ---- */
.announcementImage {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--l3-radius-12);
}

/* Shortcut icon, live app at 360 dp: a 40 circle with a 1px edge and the icon in the success green. */
.shortcutCircle {
  display: grid;
  place-items: center;
  width: var(--l3-size-40);
  height: var(--l3-size-40);
  border-radius: var(--l3-radius-full);
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px edge */
  color: var(--l3-content-accent-success-default);
}
```

### `src/flows/stocks/components/Ideas.tsx`

```tsx
import { useState } from 'react'
import { Avatar } from '@l3/components/Avatar'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { Section } from '@l3/components/Section'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { msChevronRight } from '@l3/icons/material'
import { Rail } from '../../../shared/ui/Rail'
import { disclosure, ideaBaskets } from '../data'
import { t } from '../copy'
import styles from './Home.module.css'

/** Invest in ideas: curated baskets — their stocks' logos, the name and the count. */
export function IdeaBaskets({ onOpen }: { onOpen?: (id: string) => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('baskets.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('baskets.title')} description={t('baskets.description')} /></Inset>
      <Rail label={t('baskets.railLabel')} visible={1.19}>
        {ideaBaskets.map((b) => (
          <Card key={b.id} onClick={() => onOpen?.(b.id)}>
            <span className={styles.cardStack}>
              <span className={styles.logos} aria-hidden="true">
                {b.stocks.slice(0, 6).map((s) => <Avatar key={s.symbol} initials={s.initials} src={s.logoUrl} size={48} shape="rounded" />)}
              </span>
              <span className={styles.basketName}>{b.name}</span>
              <span className={styles.cardRow}>
                <span className={styles.cardMeta}>{t('baskets.count', { count: b.stocks.length })}</span>
                <span className={styles.chevron}><Icon icon={msChevronRight} /></span>
              </span>
            </span>
          </Card>
        ))}
      </Rail>
    </Stack>
  )
}

/** The broker's regulatory line: three lines, then "Read More" (live app) — it opens the full text in place. */
export function Disclosure() {
  const [open, setOpen] = useState(false)
  return (
    <Section paddingInline="16" gap="04" align="start">
      <p className={styles.disclosureText} data-open={open || undefined}>{disclosure}</p>
      <button type="button" className={styles.readMore} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {t(open ? 'disclosure.readLess' : 'disclosure.readMore')}
      </button>
    </Section>
  )
}
```

### `src/flows/stocks/components/Invest.tsx`

```tsx
import { useEffect, useState } from 'react'
import { Avatar } from '@l3/components/Avatar'
import { BrandLogo } from '@l3/components/BrandLogo'
import { Button } from '@l3/components/Button'
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { Inset } from '@l3/components/Inset'
import { PriceChange } from '@l3/components/PriceChange'
import { Section } from '@l3/components/Section'
import { SectionHeader } from '@l3/components/SectionHeader'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msAutorenew, msChevronRight, msVerified } from '@l3/icons/material'
import { usePreview } from '../../../shared/prototype'
import { inr } from '../../../shared/data/format'
import { Rail } from '../../../shared/ui/Rail'
import { announcement, highlights, sectors, strategies } from '../data'
import { t } from '../copy'
import styles from './Home.module.css'

const TAG_SWAP_MS = 3000

/** Smart Invest's tag: "NSE/BSE Approved" and "Auto Buy & Sell" take turns, every 3 s (live app). */
function SmartInvestTag() {
  const { interactive } = usePreview()
  const [auto, setAuto] = useState(false)
  useEffect(() => {
    if (!interactive) return
    const timer = window.setInterval(() => setAuto((a) => !a), TAG_SWAP_MS)
    return () => window.clearInterval(timer)
  }, [interactive])
  return (
    <Tag color="success" iconLeft={<Icon icon={auto ? msAutorenew : msVerified} size={16} />} aria-live="polite">
      {t(auto ? 'smartInvest.tagAuto' : 'smartInvest.tag')}
    </Tag>
  )
}

/** Smart Invest: managed strategies that buy and sell for you. Sits on the brand tint (screens/Home: tinted). */
export function SmartInvest({ onInvest, onOpen }: { onInvest?: (id: string) => void; onOpen?: (id: string) => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('smartInvest.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('smartInvest.title')} tag={<SmartInvestTag />} /></Inset>
      <Rail label={t('smartInvest.railLabel')} visible={1.07}>
        {strategies.map((s) => (
          <Card
            key={s.id}
            padding="none"
            onClick={() => onOpen?.(s.id)}
            footerFilled
            footer={
              <Stack direction="horizontal" align="center" justify="between" gap="12" className={styles.charges}>
                <span className={styles.chargesText}>
                  <span className={styles.cardMeta}>{t('smartInvest.monthlyCharges')}</span>
                  <span className={styles.price}>{inr(s.monthlyCharge, 0)} <span className={styles.was}>{inr(s.monthlyChargeWas, 0)}</span></span>
                </span>
                <Button variant="tertiary" onClick={() => onInvest?.(s.id)}>{t('smartInvest.investNow')}</Button>
              </Stack>
            }
          >
            <Section padding="12" gap="12">
              <Stack direction="horizontal" align="center" gap="12" className={styles.strategyHead}>
                <Avatar icon={<BrandLogo brand="lemonn" variant="icon" size={24} decorative />} size={40} />
                <span className={styles.strategyName}>{s.name}</span>
                <span className={styles.strategyDeposit}>
                  <span className={styles.statValue}>{inr(s.minDeposit, 0)}</span>
                  <span className={styles.cardMeta}>{t('smartInvest.minDeposit')}</span>
                </span>
              </Stack>
              <div className={styles.stats}>
                <span className={styles.stat}>
                  <span className={styles.cardMeta}>{t('smartInvest.lastWeek')}</span>
                  <span className={styles.days} aria-label={t('smartInvest.lastWeekLabel', { profit: s.lastWeek.filter((d) => d.result === 'profit').length, total: s.lastWeek.length })}>
                    {s.lastWeek.map((d) => <span key={d.day} className={styles.day} data-result={d.result} aria-hidden="true">{d.day}</span>)}
                  </span>
                </span>
                <span className={styles.stat}>
                  <span className={styles.cardMeta}>{t('smartInvest.aum')}</span>
                  <span className={styles.statValue}>{s.aum}</span>
                </span>
                <span className={styles.stat}>
                  <span className={styles.cardMeta}>{t('smartInvest.slotsLeft')}</span>
                  <span className={styles.statValue}>{t('smartInvest.slots', { left: s.slotsLeft, total: s.slots })}</span>
                </span>
              </div>
            </Section>
          </Card>
        ))}
      </Rail>
    </Stack>
  )
}

/** One announcement — the campaign's own artwork (live app: the Jio Platforms IPO banner); the whole banner opens it. */
export function Announcement({ onOpen }: { onOpen?: () => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('announcements.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('announcements.title')} /></Inset>
      <Inset paddingInline="16" paddingBlock="00">
        <Card variant="flat" padding="none" onClick={onOpen} aria-label={announcement.alt}>
          <img src={announcement.image} alt="" className={styles.announcementImage} />
        </Card>
      </Inset>
    </Stack>
  )
}

/** Sectors: how many stocks each has and how it moved today. */
export function Sectors({ onOpen, onViewAll }: { onOpen?: (id: string) => void; onViewAll?: () => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('sectors.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('sectors.title')} action={{ type: 'view-all', onClick: () => onViewAll?.() }} /></Inset>
      <Rail label={t('sectors.railLabel')} visible={2.07}>
        {sectors.map((s) => (
          <Card key={s.id} onClick={() => onOpen?.(s.id)}>
            <span className={styles.cardStack}>
              <span className={styles.cardRow}>
                <span className={styles.cardTitle}>{s.name}</span>
                <span className={styles.chevron}><Icon icon={msChevronRight} size={16} /></span>
              </span>
              <span className={styles.cardRow}>
                <span className={styles.cardMeta}>{t('sectors.count', { count: s.count })}</span>
                <PriceChange value={s.changePct} size="sm" arrow />
              </span>
            </span>
          </Card>
        ))}
      </Rail>
    </Stack>
  )
}

/** Highlights: product spotlights — mutual funds (tax saving) and F&O (the index today). */
export function Highlights({ onExplore }: { onExplore?: (id: string) => void }) {
  return (
    <Stack as="section" gap="16" aria-label={t('highlights.title')}>
      <Inset paddingInline="16" paddingBlock="00"><SectionHeader title={t('highlights.title')} /></Inset>
      <Rail label={t('highlights.railLabel')} visible={1.67}>
        {highlights.map((h) => (
          <Card key={h.id} onClick={() => onExplore?.(h.id)} footer={<Button variant="tertiary" onClick={() => onExplore?.(h.id)}>{h.cta}</Button>}>
            <span className={styles.highlightCard}>
              <span className={styles.highlightTitle}>{h.title}</span>
              <span className={styles.cardMeta}>{h.description}</span>
              {h.id === 'mutual-funds' ? <span className={styles.highlightValue}>{h.value}</span> : <PriceChange value={h.changePct} size="lg" arrow />}
              <span className={styles.cardMeta}>{h.caption}</span>
            </span>
          </Card>
        ))}
      </Rail>
    </Stack>
  )
}
```

### `src/flows/stocks/components/Overview.tsx`

```tsx
import { Card } from '@l3/components/Card'
import { Icon } from '@l3/components/Icon'
import { PriceChange } from '@l3/components/PriceChange'
import { Stack } from '@l3/components/Stack'
import { Tag } from '@l3/components/Tag'
import { msArrowForward, msChevronRight } from '@l3/icons/material'
import { indices } from '../../../shared/data/market'
import { holdings } from '../../../shared/data/portfolio'
import { inr } from '../../../shared/data/format'
import { Rail } from '../../../shared/ui/Rail'
import { products } from '../data'
import { t } from '../copy'
import styles from './Home.module.css'

/** NIFTY 50 · SENSEX · … — today's index moves; each opens its chart. Scrolls sideways. */
export function IndexStrip({ onIndex }: { onIndex?: (id: string) => void }) {
  return (
    <Stack direction="horizontal" align="center" gap="16" className={styles.indexStrip} role="region" aria-label={t('indices.label')}>
      {indices.map((index, i) => (
        <Stack key={index.id} direction="horizontal" align="center" gap="08" className={styles.indexItem}>
          {i > 0 && <span className={styles.divider} aria-hidden="true" />}
          <Card variant="flat" padding="none" onClick={() => onIndex?.(index.id)}>
            <span className={styles.index}>
              <span className={styles.indexName}>{index.name}</span>
              <span className={styles.indexValue}>{index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              <PriceChange value={index.changePct} size="sm" />
              <span className={styles.chevron}><Icon icon={msChevronRight} size={16} /></span>
            </span>
          </Card>
        </Stack>
      ))}
    </Stack>
  )
}

/** Current value of the holdings and the overall return — the page's headline number. The block opens Portfolio. */
export function HoldingsSummary({ onOpen }: { onOpen?: () => void }) {
  return (
    <Card variant="flat" padding="none" onClick={onOpen}>
      <span className={styles.holdings}>
        <span className={styles.holdingsText}>
          <span className={styles.holdingsLabel}>{t('holdings.label')}</span>
          <span className={styles.holdingsValue}>
            {inr(holdings.current)}
            <PriceChange value={holdings.returnPct} size="lg" arrow />
          </span>
        </span>
        <span className={styles.roundArrow} aria-hidden="true"><Icon icon={msArrowForward} /></span>
      </span>
    </Card>
  )
}

/** Mutual funds · Equity F&O · Commodities — each product's one-line promise. */
export function ProductCards({ onProduct }: { onProduct?: (id: string) => void }) {
  return (
    <Rail label={t('products.label')} visible={2.55} className={styles.onEdgeRoom}>
      {products.map((p) => (
        <Card key={p.id} onClick={() => onProduct?.(p.id)}>
          <span className={styles.cardStack}>
            {p.isNew && <span className={styles.onEdge}><Tag color="success" size="sm">{t('products.new')}</Tag></span>}
            <span className={styles.cardRow}>
              <span className={styles.productTitle}>{p.name}</span>
              <span className={styles.chevron}><Icon icon={msChevronRight} size={16} /></span>
            </span>
            <span className={styles.cardMeta}>
              <span className={styles.highlight}>{p.highlight}</span> {p.detail}
            </span>
          </span>
        </Card>
      ))}
    </Rail>
  )
}
```

### `src/flows/stocks/components/TopBar.module.css`

```css
/*
 * Stocks home top bar. Sizes measured on the live app at 360 dp (2026-10-22): avatar 34, search pill and wallet 38 with
 * a 1px edge, 16 above, 6 below (the summary's own 16 makes the 22 down to the index strip). With the DASH pill the
 * spacing follows Figma's home (DASH AI main flow): 16 at the sides, 12 between; the DASH pill keeps its own Figma
 * size (≈ 32, centred).
 * The bar takes the summary area's surface/secondary, the pill and the wallet surface/default.
 */
.bar {
  display: flex;
  align-items: center;
  gap: var(--l3-spacing-12);
  padding-right: var(--l3-spacing-16);
  padding-left: var(--l3-spacing-16);
  background: var(--l3-surface-secondary);
  position: sticky;
  height: 64px;
  transition: background-color var(--l3-motion-duration-short) var(--l3-motion-easing-standard);
}

/* Scrolled: the bar leaves the summary's grey for surface/primary. */
.bar[data-scrolled] {
  background: var(--l3-surface-primary);
}

.bar > :is(.profile, .search, .wallet) {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: var(--app-stocks-topbar-control);
  padding: 0;
  border: 0;
  color: var(--l3-content-primary);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--l3-motion-duration-short) var(--l3-motion-easing-standard);
}

.bar > :is(.profile, .search, .wallet):active {
  transform: scale(var(--l3-motion-scale-press-default));
}

.bar > :is(.profile, .search, .wallet):focus-visible {
  outline: 2px solid var(--l3-content-primary);
  outline-offset: 2px;
}

/* Initials on an indigo disc with a 1px indigo ring. */
.bar .profile {
  width: var(--app-stocks-topbar-avatar);
  height: var(--app-stocks-topbar-avatar);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-accent-indigo-light);
  box-shadow: inset 0 0 0 1px var(--l3-border-accent-indigo-default); /* 1px ring */
  font: var(--l3-text-label-14);
}

.bar .profile {
  color: var(--l3-content-accent-indigo-default);
}

/* The search pill fills the space between the two circles. */
.bar .search {
  flex: 1;
  min-width: 0;
  justify-content: flex-start;
  gap: var(--l3-spacing-08);
  padding-inline: var(--l3-spacing-12);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-default);
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px edge */
}

.placeholder {
  overflow: hidden;
  color: var(--l3-content-secondary);
  font: var(--l3-text-label-14);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wallet {
  width: var(--app-stocks-topbar-control);
  border-radius: var(--l3-radius-full);
  background: var(--l3-surface-default);
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px edge */
}
```

### `src/flows/stocks/components/TopBar.tsx`

```tsx
import { Icon } from '@l3/components/Icon'
import { CoachMark } from '@l3/components/Tooltip'
import { msAccountBalanceWallet, msSearch } from '@l3/icons/material'
import { DashEntry } from '../../../shared/ui/dash/DashEntry'
import { t } from '../copy'
import styles from './TopBar.module.css'

type TopBarProps = {
  /** The profile's initials ("RM"). */
  initials: string
  onProfile?: () => void
  /** The search pill is a button: it opens the Search screen, where the typing happens. */
  onSearch?: () => void
  onWallet?: () => void
  /** The DASH pill opens DASH AI (dash-02). */
  onDash?: () => void
  /** First visit after DASH launches: an L3 coach mark points at the pill (Figma "Intro" 5612:44075). */
  dashIntro?: boolean
  onDashIntroDone?: () => void
  /** The page is scrolled: the bar turns surface/primary. */
  scrolled?: boolean
}

/**
 * Stocks home's own top bar, as in the live app (a one-off for this screen — not the L3 Actionbar):
 * profile initials (indigo circle) · a search pill ("Search stocks", opens Search) · the DASH pill (opens DASH AI —
 * Figma "Home page", DASH AI main flow) · the wallet.
 * The bar sits on the summary area's grey; the pill and the wallet are on surface/default.
 */
export function TopBar({ initials, onProfile, onSearch, onWallet, onDash, dashIntro = false, onDashIntroDone, scrolled = false }: TopBarProps) {
  const dash = <DashEntry label={t('top.dash')} ariaLabel={t('top.dashLabel')} onClick={onDash} />
  return (
    <header className={styles.bar} data-scrolled={scrolled || undefined}>
      <button type="button" className={styles.profile} aria-label={t('top.profile')} onClick={onProfile}>
        {initials}
      </button>
      <button type="button" className={styles.search} onClick={onSearch}>
        <Icon icon={msSearch} size={20} />
        <span className={styles.placeholder}>{t('search.placeholder')}</span>
      </button>
      {dashIntro ? (
        <CoachMark open heading={t('dashIntro.heading')} body={t('dashIntro.body')} nextLabel={t('dashIntro.gotIt')} onNext={() => onDashIntroDone?.()} autoFocus={false}>
          {dash}
        </CoachMark>
      ) : (
        dash
      )}
      <button type="button" className={styles.wallet} aria-label={t('top.wallet')} onClick={onWallet}>
        <Icon icon={msAccountBalanceWallet} size={20} />
      </button>
    </header>
  )
}
```

### `src/flows/stocks/copy.json`

```json
{
  "search.placeholder": "Search stocks",
  "search.label": "Search stocks",
  "top.wallet": "Wallet",
  "top.profile": "Profile and settings",
  "indices.label": "Market indices",
  "holdings.label": "Current holdings",
  "products.label": "Products",
  "products.new": "New",
  "shortcuts.title": "Do More With Lemonn",
  "shortcuts.watchlistBadge": "{count} in your watchlist",
  "movers.title": "Top Movers",
  "movers.tabsLabel": "Movers",
  "movers.gainers": "Top Gainers",
  "movers.losers": "Top Losers",
  "movers.under100": "Under ₹100",
  "watchlists.title": "Watchlist",
  "watchlists.new": "Add Watchlist",
  "watchlists.railLabel": "Your watchlists",
  "watchlists.one": "{count} stock",
  "watchlists.many": "{count} stocks",
  "smartInvest.title": "Smart Invest",
  "smartInvest.tag": "NSE/BSE Approved",
  "smartInvest.railLabel": "Strategies",
  "smartInvest.monthlyCharges": "Monthly charges",
  "smartInvest.investNow": "Invest Now",
  "smartInvest.minDeposit": "Min. Deposit",
  "smartInvest.lastWeek": "Last week",
  "smartInvest.lastWeekLabel": "Last week: {profit} profit days of {total}",
  "smartInvest.aum": "AUM",
  "smartInvest.slotsLeft": "Slots left",
  "smartInvest.slots": "{left}/{total}",
  "announcements.title": "Announcements",
  "announcements.new": "New",
  "sectors.title": "Invest in Sectors",
  "sectors.railLabel": "Sectors",
  "sectors.count": "{count} Stocks",
  "highlights.title": "Highlights",
  "highlights.railLabel": "Highlights",
  "baskets.title": "Invest in Ideas",
  "baskets.description": "Curated industry-based stock offerings",
  "baskets.railLabel": "Idea baskets",
  "baskets.count": "{count} Stocks",
  "smartInvest.tagAuto": "Auto Buy & Sell",
  "disclosure.readMore": "Read More",
  "disclosure.readLess": "Read Less",
  "top.dash": "DASH",
  "top.dashLabel": "Open DASH Ai",
  "dashIntro.heading": "DASH Ai",
  "dashIntro.body": "DASH helps you build your rules and strategies.",
  "dashIntro.gotIt": "Got it!"
}
```

### `src/flows/stocks/copy.ts`

```ts
import { makeCopy } from '../../shared/copy'
import copy from './copy.json'

/** Every user-facing string of Stocks is in copy.json: t('movers.title'), t('watchlists.count', { count }). */
export const t = makeCopy('stocks', copy)
```

### `src/flows/stocks/data.ts`

```ts
import { msAddChart, msCampaign, msEditNote, msRedeem } from '@l3/icons/material'
import jioIpoBanner from './assets/announcement-jio-ipo.jpg'
import { stocks, type Stock } from '../../shared/data/market'
import { companies, companiesByChange, type Company } from '../../shared/data/companies'

/** Stocks home — what the API sends for each section, in page order. Sample values; market data from the live app. */

/** Product shortcuts under the holdings: one line on what's special about each. */
export type Product = { id: 'mutual-funds' | 'fno' | 'commodities'; name: string; highlight: string; detail: string; isNew?: boolean }
export const products: Product[] = [
  { id: 'mutual-funds', name: 'Mutual funds', highlight: '240+', detail: 'funds' },
  { id: 'fno', name: 'Equity F&O', highlight: '0', detail: 'slippage' },
  { id: 'commodities', name: 'Commodities', highlight: '0', detail: 'brokerage', isNew: true },
]

/** "Do more with Lemonn": feature shortcuts, each with an optional count or "New" flag. */
export type Shortcut = { id: string; label: string; icon: string; badge?: { count?: number; text?: string } }
export const shortcuts: Shortcut[] = [
  { id: 'trade-ideas', label: 'Trade Ideas', icon: msAddChart },
  { id: 'ipo', label: 'IPO', icon: msCampaign, badge: { text: '5 New' } },
  { id: 'watchlist', label: 'Watchlist', icon: msEditNote, badge: { count: 3 } },
  { id: 'referral', label: 'Referral', icon: msRedeem, badge: { text: 'New' } },
]

/**
 * Top movers: three lists, picked with the chips.
 * All three come from the company catalogue (src/shared/data/companies.ts — a real Yahoo Finance snapshot, refreshed
 * at runtime), so they're read at render time: call `topMovers(list)` inside a component that calls `useMarketSnapshot()`.
 */
export type MoverList = 'gainers' | 'losers' | 'under-100'
/** How many cards a list shows (two rows of three). */
export const MOVERS_COUNT = 6

/** A catalogue company as a mover card shows it (same shape as the shared `Stock`). */
function asStock(c: Company): Stock {
  return { symbol: c.symbol, name: c.name, price: c.market!.price, changePct: c.market!.changePct, initials: c.initials, logoUrl: c.logoUrl }
}

/**
 * The stocks a list shows now. A gainer is up today and a loser down — a flat or falling stock never shows as a gainer.
 * Under ₹100 = the catalogue's cheapest stocks, cheapest first (the catalogue carries a few for it: IDEA, YESBANK,
 * SOUTHBANK, SUZLON, NHPC, IRFC); if a price climbs past ₹100 the card stays — fine for the prototype.
 */
export function topMovers(list: MoverList): Stock[] {
  const priced = Object.values(companies).filter((c) => c.market)
  const picked =
    list === 'under-100'
      ? priced.sort((a, b) => a.market!.price - b.market!.price)
      : companiesByChange(list).filter((c) => (list === 'gainers' ? c.market!.changePct > 0 : c.market!.changePct < 0))
  return picked.slice(0, MOVERS_COUNT).map(asStock)
}

/** Smart Invest: managed strategies (auto buy & sell). Last week = one result per trading day. */
export type Strategy = {
  id: string
  name: string
  minDeposit: number
  lastWeek: { day: 'M' | 'T' | 'W' | 'Th' | 'F'; result: 'profit' | 'loss' }[]
  aum: string
  slotsLeft: number
  slots: number
  monthlyCharge: number
  monthlyChargeWas: number
}
export const strategies: Strategy[] = [
  {
    id: 'credit-spread-alpha', name: 'Credit Spread Alpha', minDeposit: 80000, aum: '92L', slotsLeft: 356, slots: 500, monthlyCharge: 0, monthlyChargeWas: 300,
    // the live app lists the last four trading days, oldest first
    lastWeek: [{ day: 'Th', result: 'loss' }, { day: 'F', result: 'profit' }, { day: 'M', result: 'profit' }, { day: 'W', result: 'loss' }],
  },
  {
    id: 'momentum-swing', name: 'Momentum Swing', minDeposit: 50000, aum: '₹86.4 L', slotsLeft: 112, slots: 300, monthlyCharge: 0, monthlyChargeWas: 250,
    lastWeek: [{ day: 'M', result: 'profit' }, { day: 'T', result: 'profit' }, { day: 'W', result: 'loss' }, { day: 'Th', result: 'profit' }, { day: 'F', result: 'profit' }],
  },
]

/** One announcement: a campaign's artwork (from the API) and where it leads. */
export const announcement = {
  image: jioIpoBanner,
  alt: 'Jio Platforms IPO is now live — bidding open till 23rd Oct. Apply now',
}

/** Sectors: how many stocks and how the sector moved today. */
export type Sector = { id: string; name: string; count: number; changePct: number }
export const sectors: Sector[] = [
  { id: 'building-materials', name: 'Building Materials', count: 18, changePct: -0.05 },
  { id: 'consumer-discretionary', name: 'Consumer Discretionary', count: 22, changePct: -0.25 },
  { id: 'financials', name: 'Financials', count: 41, changePct: 0.31 },
]

/** Highlights: product spotlights with one number each. */
export type Highlight =
  | { id: 'mutual-funds'; title: string; description: string; value: string; caption: string; cta: string }
  | { id: 'fno'; title: string; description: string; changePct: number; caption: string; cta: string }
export const highlights: Highlight[] = [
  { id: 'mutual-funds', title: 'Mutual Funds', description: 'Invest in Mutual Funds and save taxes upto', value: 'Rs 46,800', caption: 'Every year', cta: 'Explore' },
  { id: 'fno', title: 'F&O', description: 'Trade in Futures and Options', changePct: -0.54, caption: 'Nifty 50', cta: 'Explore' },
]

/** Invest in ideas: curated baskets of stocks. */
export type IdeaBasket = { id: string; name: string; stocks: Stock[] }
export const ideaBaskets: IdeaBasket[] = [
  { id: 'oil-price-dependents', name: 'Oil Price Dependents', stocks: [stocks.JINDRILL, stocks.HINDOILEXP, stocks.OIL, stocks.ONGC, stocks.RELIANCE] },
  // the second basket only peeks in at the screen edge on the live app; its full name isn't visible there
  { id: 'high-growth', name: 'High Growth Media', stocks: [stocks.TVTODAY, stocks.NTPC, stocks.IRFC, stocks.COALINDIA, stocks.HAL, stocks.SBIN, stocks.NHPC] },
]

/** The broker's regulatory line (shared with Profile). */
export { disclosure } from '../../shared/data/broker'
```

### `src/flows/stocks/index.tsx`

```tsx
import type { Flow } from '../types'
import { goToTab } from '../../shared/ui/MainNav'
import { Home } from './screens/Home'

/**
 * Stocks — the Stocks tab, the app's home after login. Built from the live app's screenshots (shared 2026-10-17,
 * re-matched to the live app over ADB on 2026-10-22; there's no Figma for it yet). One long page; the board shows it as frames scrolled to each part.
 */
export const stocks: Flow = {
  id: 'stocks',
  title: 'Stocks',
  description: 'The Stocks tab — the home after login: indices, holdings, products, movers, watchlists, ideas.',
  figmaFile: '',
  screens: [
    { id: 'stocks-01', name: 'Home', figma: '', note: 'Top of the page: search, indices, holdings, products, shortcuts.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} /> },
    { id: 'stocks-02', name: 'Home · top movers & watchlists', figma: '', note: 'Same page, scrolled.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} scrollTo="movers" /> },
    { id: 'stocks-03', name: 'Home · top losers', figma: '', note: 'The "Top losers" chip picked.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} scrollTo="movers" movers="losers" /> },
    { id: 'stocks-04', name: 'Home · Smart Invest', figma: '', note: 'Same page, scrolled: managed strategies, then the announcement.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} scrollTo="invest" /> },
    { id: 'stocks-05', name: 'Home · sectors & highlights', figma: '', note: 'Same page, scrolled.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} scrollTo="sectors" /> },
    { id: 'stocks-06', name: 'Home · highlights & idea baskets', figma: '', note: 'Same page, scrolled. (The live app no longer has Trade ideas here — removed 2026-10-22.)', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} scrollTo="highlights" /> },
    { id: 'stocks-07', name: 'Home · idea baskets & disclosure', figma: '', note: 'The end of the page: the disclosure, four lines and Read More.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} scrollTo="more" /> },
    { id: 'stocks-08', name: 'Home · DASH coach mark', figma: '5612:44075', note: 'First visit after DASH launches: an L3 coach mark on the DASH pill (Figma "Intro" in DASH AI main flow). Got it! or the pill opens DASH.', tab: true, render: (go) => <Home onTab={(t) => goToTab(go, t)} onSearch={() => go('search-01')} onProfile={() => go('profile-01')} onDash={() => go('dash-02')} dashIntro onDashIntroDone={() => go('dash-02')} /> },
  ],
}
```

### `src/flows/stocks/screens/Home.module.css`

```css
/*
 * Stocks home — page layout. A grey summary area (indices, holdings, products) and, over its bottom edge, the feed on
 * a rounded sheet (radius 32 at the top), like the live app. The grey area is intentional and high-emphasis (the
 * account summary), so a large surface/secondary block is allowed here (DESIGN_SYSTEM 7.2). The layout is L3 Stack /
 * Section; what those blocks don't cover lives here: uneven padding (16 / 48, 32 / 24), the feed's overlap and
 * top-only radius, the default surface and the accent tints.
 */
.summary {
  padding: var(--l3-spacing-16) 0 var(--l3-spacing-48);
  background: var(--l3-surface-secondary);
}

.feed {
  position: relative;
  margin-top: calc(-1 * var(--l3-spacing-24));
  padding: var(--l3-spacing-32) 0 var(--l3-spacing-24);
  border-radius: var(--l3-radius-32) var(--l3-radius-32) 0 0;
  background: var(--l3-surface-default);
}

/* Smart Invest sits on the brand tint, edge to edge. */
.tinted[data-tint='brand'] {
  background: var(--l3-surface-accent-brand-light);
}

/*
 * Designer's one-off call for this screen (2026-10-22), not a rule: cards have no shadow — only their 1px edge.
 * Clickable L3 Cards and card-style ListCells normally add elevation-low.
 */
.flatCards.flatCards [data-interactive][data-variant='default'] {
  box-shadow: var(--card-border);
}

.flatCards.flatCards [data-interactive][data-variant='card'] {
  box-shadow: inset 0 0 0 1px var(--l3-border-light); /* 1px: Figma stroke weight has no variable */
}


/* Live app at 360 dp: section titles are 16 (L3 SectionHeader is 14) — part of the same one-off for this screen. */
.flatCards.flatCards h2 {
  font: var(--l3-text-label-16);
}
```

### `src/flows/stocks/screens/Home.tsx`

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Section } from '@l3/components/Section'
import { Stack } from '@l3/components/Stack'
import { user } from '../../../shared/data/user'
import { MainNav, type Section as NavSection } from '../../../shared/ui/MainNav'
import { Screen } from '../../../shared/ui/Screen'
import { Disclosure, IdeaBaskets } from '../components/Ideas'
import { Announcement, Highlights, Sectors, SmartInvest } from '../components/Invest'
import { HoldingsSummary, IndexStrip, ProductCards } from '../components/Overview'
import { TopBar } from '../components/TopBar'
import { Shortcuts, TopMovers, Watchlists } from '../components/Discover'
import type { MoverList } from '../data'
import { t } from '../copy'
import styles from './Home.module.css'

/** Where the page is scrolled to — the board shows the long page as several frames, like the live app's screenshots. */
export type HomePart = 'top' | 'movers' | 'invest' | 'sectors' | 'highlights' | 'more'

type Props = {
  scrollTo?: HomePart
  /** Which Top movers list is picked (board state). */
  movers?: MoverList
  /** The main navbar: go to another tab. */
  onTab?: (section: NavSection) => void
  /** Tapping the search field opens the Search screen (search-01), where the typing happens. */
  onSearch?: () => void
  /** The profile icon opens Profile & settings (profile-01). */
  onProfile?: () => void
  /** The DASH pill in the top bar opens DASH AI. */
  onDash?: () => void
  /** First visit after DASH launches: the coach mark on the DASH pill. */
  dashIntro?: boolean
  onDashIntroDone?: () => void
}

/**
 * stocks-01 … 07 · Stocks home — the app's first L1 screen (the Stocks tab).
 * Top bar: the screen's own (components/TopBar) — profile initials, a search pill, the wallet — as in the live app.
 * Cards on this screen have no shadow (designer's one-off call, 2026-10-22: screens/Home.module.css flatCards). The search field is the way into Search: tapping it opens the Search
 * screen (stocks tab, keyboard up) — nothing is typed here. Then, on a grey summary area: today's indices, the holdings and the
 * products; and on the rounded sheet over it, the feed: shortcuts, top movers, watchlists, Smart Invest (brand tint),
 * an announcement (the campaign's artwork), sectors, highlights, idea baskets and the broker's disclosure.
 */
export function Home({ scrollTo = 'top', movers, onTab, onSearch, onProfile, onDash, dashIntro, onDashIntroDone }: Props) {
  const page = useRef<HTMLDivElement>(null)

  // Scrolled past the top: the top bar turns surface/primary (TopBar `scrolled`).
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const body = page.current?.parentElement
    if (!body) return
    const onScroll = () => setScrolled(body.scrollTop > 0)
    onScroll()
    body.addEventListener('scroll', onScroll, { passive: true })
    return () => body.removeEventListener('scroll', onScroll)
  }, [])

  // Board frames: open the page scrolled to a part (the screen's body is this page's scroll container).
  useLayoutEffect(() => {
    const root = page.current
    const body = root?.parentElement
    const target = root?.querySelector(`[data-home="${scrollTo}"]`)
    if (!body || !target || scrollTo === 'top') return
    body.scrollTop += target.getBoundingClientRect().top - body.getBoundingClientRect().top
  }, [scrollTo])

  return (
    <Screen
      top={<TopBar scrolled={scrolled} initials={initials(user.name)} onProfile={onProfile} onSearch={onSearch} onDash={onDash} dashIntro={dashIntro} onDashIntroDone={onDashIntroDone} />}
      bottom={<MainNav value="stocks" onChange={onTab} />}
    >
      <Stack ref={page} className={styles.flatCards}>
        <Stack style={{ paddingTop: '0' }} gap="24" className={styles.summary} data-home="top">
          <IndexStrip />
          <HoldingsSummary />
          <ProductCards />
        </Stack>
        <Stack gap="32" className={styles.feed}>
          <Shortcuts />
          <div data-home="movers"><TopMovers initial={movers} /></div>
          <Watchlists />
          <Section paddingBlock="24" className={styles.tinted} data-tint="brand" data-home="invest"><SmartInvest /></Section>
          <Announcement />
          <div data-home="sectors"><Sectors /></div>
          <div data-home="highlights"><Highlights /></div>
          <div data-home="more"><IdeaBaskets /></div>
          <Disclosure />
        </Stack>
      </Stack>
    </Screen>
  )
}

/** "Rohan Mehta" → "RM": the profile's initials. */
function initials(name: string) {
  return name.split(' ').map((part) => part.charAt(0)).join('').slice(0, 2).toUpperCase()
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

### `src/shared/data/broker.ts`

```ts
// The broker behind the Lemonn app — shown wherever the app needs its regulatory line (Stocks home, Profile).

/** The broker's regulatory line, in full. */
export const disclosure =
  'The online broking and mutual fund execution services are provided by NU Investors Technologies Pvt. Ltd. | CIN U67200MH2021PTC364704 | SEBI Registration No. INZ000304837 | SEBI DP Registration No. IN-DP-712-2022 | SEBI Research Analyst Registration No. INH000016764 | NSE member code 90251.'
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

### `src/shared/data/portfolio.ts`

```ts
// The sample user's portfolio, shared by the Stocks home and Portfolio. FICTIONAL — never a real customer's holdings.

export type HoldingsSummary = {
  /** Current value of everything held, ₹. */
  current: number
  /** Overall return on what was invested, %. */
  returnPct: number
}

export const holdings: HoldingsSummary = { current: 24860.75, returnPct: -1.92 }

/** The user's watchlists (names are the user's own). */
export type Watchlist = { id: string; name: string; count: number }

export const watchlists: Watchlist[] = [
  { id: 'long-term', name: 'Long term', count: 12 },
  { id: 'banks', name: 'Banks', count: 6 },
  { id: 'to-research', name: 'To research', count: 0 },
]
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

export type DashOrbSize = 'sm' | 'md' | 'lg'

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
