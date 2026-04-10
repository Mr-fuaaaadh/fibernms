# Design Brief

**Purpose:** Telecom-grade optical fiber network operations center dashboard — mission-critical infrastructure monitoring tool for 24/7 network engineers.

**Tone:** Professional, utilitarian, authentic NOC aesthetic. Zero ornamentation. Precision typography. High information density. Color is semantic (green = healthy, red = critical, yellow = warning), never decorative.

**Aesthetic:** Dark terminal-inspired interface with neon accents. Glassmorphism applied functionally (layer separation via backdrop blur), not decoratively. Authentic network operations center UI — real engineers will recognize the visual language.

## Palette

| Token              | Light (L C H)      | Dark (L C H)        | Purpose                         |
| :----------------- | :----------------- | :------------------ | :------------------------------ |
| **background**     | 0.99 0 0           | 0.12 0 0            | Page background, lowest layer   |
| **card**           | 0.97 0 0           | 0.16 0.01 280       | Card/panel surfaces, glass base |
| **foreground**     | 0.15 0 0           | 0.92 0 0            | Primary text, high contrast     |
| **primary**        | 0.65 0.15 180      | 0.72 0.22 260       | Neon cyan — active state        |
| **accent**         | 0.58 0.22 55       | 0.68 0.25 55        | Neon orange — warnings/alert    |
| **destructive**    | 0.52 0.25 25       | 0.62 0.28 22        | Neon red — critical faults      |
| **muted**          | 0.92 0 0           | 0.22 0 0            | Secondary UI, disabled state    |
| **border**         | 0.88 0.02 0        | 0.24 0.01 280       | Subtle dividers, glass borders  |
| **chart-1/2/3/4/5**| Various spectral   | Neon-tuned hues     | Data visualization palette      |

## Structural Zones

| Zone             | Treatment                                                      | Palette Token   |
| :--------------- | :------------------------------------------------------------- | :-------------- |
| **Header/Nav**   | Solid bg-sidebar, border-b, glassmorphic hover states          | sidebar/border  |
| **Sidebar**      | Solid bg-sidebar, high contrast text, icon-badge indicators   | sidebar/*       |
| **Main Content** | bg-background, card-based layout with glass-card utility       | background/card |
| **Data Panels**  | glass-card (backdrop-blur + bg-card/80), noc-soft shadow       | card/border     |
| **Alerts/Status**| Colored badges (green/yellow/red), noc-glow-active for active  | status tokens   |
| **Footer**       | bg-muted/10, border-t, meta information in text-muted          | muted/border    |

## Typography

| Tier     | Font              | Size  | Weight | Usage                             |
| :------- | :---------------- | :---- | :----- | :-------------------------------- |
| **H1**   | Geist Mono        | 28px  | 600    | Page titles, major headings       |
| **H2**   | Geist Mono        | 20px  | 600    | Section headers, panel titles     |
| **Body** | General Sans      | 14px  | 400    | Labels, list items, descriptions |
| **Small**| General Sans      | 12px  | 500    | Badge text, metadata              |
| **Mono**| JetBrains Mono    | 12px  | 400    | Metrics, IPs, signal values       |

## Elevation & Depth

- **L0 (background):** 0.12 (dark) — base surface
- **L1 (card):** 0.16 — raised panels, glass effect via backdrop blur + border
- **L2 (popover):** 0.20 — modals, dropdowns, elevated overlays
- **Shadow:** Soft (noc-soft), Elevated (noc-elevated) — never harsh, supports glassmorphism

## Component Patterns

- **Status badges:** `status-badge` + `bg-green-500/20 text-green-700` (active), `bg-red-500/20 text-red-700` (fault), `bg-yellow-500/20 text-yellow-700` (warning)
- **Device cards:** `glass-card` + flex grid, metric data in `text-metric` (mono)
- **Alert indicators:** `noc-glow-active` on critical, `pulse-soft` animation on warning
- **Interactive:**  `transition-smooth` on all hover/active states

## Motion & Animation

- **Entrance:** `animate-slide-in` (300ms ease-out) for modals, panels
- **State change:** `transition-smooth` (300ms) on color/opacity shifts
- **Alerts:** `animate-pulse-soft` (2s) on warning state, steady on critical
- **Focus/Hover:** Subtle `noc-glow` effect, color shift to `primary` or `accent`

## Constraints

- **Color in dark mode only** — neon cyan/orange/red meaningless in light mode, disable for light variant
- **Density over decoration** — info-rich layout, minimal whitespace
- **Contrast AA+ at all times** — monitor WCAG scores, especially on dark backgrounds
- **Glyphs/icons:** Lucide-react, size 16–20px, color via semantic tokens
- **Form inputs:** High contrast border, `bg-input`, clear focus ring with `ring-primary`

## Signature Detail

Neon accent colors appear **only as semantic signals** (active = cyan, warning = orange, critical = red). These colors justify their presence through meaning, not trend. Every neon glow is earned by function. The overall visual is refined, professional — NOC tool, not gaming interface.

## Font Loading

- GeistMono: Display/title font, geometric and technical
- GeneralSans: Body font, excellent readability at 12–14px density
- JetBrainsMono: Metrics, code-like precision for network data

Fonts loaded via `@font-face` from `/assets/fonts/` with `font-display: swap`.
