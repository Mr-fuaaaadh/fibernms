# Design Brief

**Purpose:** Enterprise telecom-grade Optical Fiber Network Operations Center with predictive intelligence, SLA assurance, capacity forecasting, and audit compliance.

**Tone:** Professional, mission-critical, authentic NOC aesthetic. Semantic color signals (green = healthy, yellow = warning, orange = risk, red = critical). High information density with glassmorphism for layer separation.

**Aesthetic:** Dark terminal-inspired interface with neon cyan/orange/red accents. Enterprise-grade precision typography. WebGL-optimized map visualization. Real-time alerting with pulsing state indicators.

## Core Palette

| Token              | Dark (L C H)        | Purpose                         |
| :----------------- | :------------------ | :------------------------------ |
| **background**     | 0.11 0 0            | Base surface                    |
| **card**           | 0.155 0.008 265     | Raised panels, glass base       |
| **foreground**     | 0.92 0 0            | Primary text                    |
| **primary**        | 0.72 0.22 210       | Neon cyan — active state        |
| **accent**         | 0.68 0.25 55        | Neon orange — warnings          |
| **destructive**    | 0.62 0.28 22        | Neon red — critical faults      |
| **border**         | 0.26 0.01 265       | Subtle dividers                 |
| **muted**          | 0.22 0 0            | Secondary UI, disabled          |

## Enterprise Tokens

| Token Class | Values | Purpose |
| :---------- | :----- | :------ |
| **Risk (0-100 scale)** | ok (0.62 L), low (0.62 L), medium (0.7 L), high (0.65 L), critical (0.62 L) | Predictive fault intelligence severity |
| **SLA Status** | pass (green), warning (orange), breach (red) | SLA performance tracking |
| **Layer Visualization** | L1 (cyan), L2 (orange), L3 (purple) | Multi-layer topology (fiber, VLAN, IP) |
| **Audit Events** | device (cyan), user (orange), workflow (purple), system (gray) | Compliance timeline |
| **Capacity** | healthy (green), warning (yellow), critical (red) | Utilization forecasting |

## Structural Zones

| Zone | Treatment | Tokens |
| :--- | :-------- | :----- |
| **Map Container** | WebGL canvas, overlay risk heatmap, layer toggles | background, layer-* |
| **Metrics Panels** | glass-card grid, risk/SLA/capacity gauges | card, risk-*, sla-*, capacity-* |
| **Predictive Heatmap** | Gradient overlay on map (green → red), responsive to risk scale | risk-ok/medium/critical |
| **SLA Dashboard** | Card-based, bordered left by status color, metric rows | sla-pass/warning/breach |
| **Capacity Planner** | Stacked bar charts, gradient fills, trend lines | capacity-healthy/warning/critical |
| **Audit Timeline** | Vertical timeline, color-coded event badges, expandable details | audit-device/user/workflow/system |
| **Layer Toggles** | Button group, active state glows, L1/L2/L3 color-coded | layer-l1/l2/l3, noc-glow |
| **Command Palette** | CMD+K overlay, glass-elevated backdrop, search results list | glass-elevated, command-palette-* |

## Component Variants

- **RiskBadge:** `risk-badge` with `.risk-ok`, `.risk-low`, `.risk-medium`, `.risk-high`, `.risk-critical`
- **SLAStatusCard:** `sla-status` base + `.sla-pass`, `.sla-warning`, `.sla-breach` for left border accent
- **AuditTimelineItem:** `audit-timeline-item` + `.audit-device`, `.audit-user`, `.audit-workflow`, `.audit-system`
- **LayerToggleButton:** `layer-button` with `.layer-l1`, `.layer-l2`, `.layer-l3` for color context
- **CommandPaletteOverlay:** `command-palette` glass-elevated container, `.command-palette-input`, `.command-palette-item`

## Typography

| Tier | Font | Size | Weight | Usage |
| :--- | :--- | :--- | :----- | :---- |
| **H1** | Geist Mono | 28px | 600 | Page titles, KPI headers |
| **H2** | Geist Mono | 20px | 600 | Section headers, metric titles |
| **Body** | General Sans | 14px | 400 | Labels, list items, descriptions |
| **Small** | General Sans | 12px | 500 | Badge text, metadata, timestamps |
| **Mono** | JetBrains Mono | 12px | 400 | Metrics, IPs, signal values, risk scores |

## Elevation & Depth

- **L0 (background):** 0.11 — base surface, map container
- **L1 (card):** 0.155 — raised panels, metrics cards, glass effect via backdrop blur + border
- **L2 (popover):** 0.18 — modals, dropdowns, command palette, elevated overlays
- **Shadow:** noc-soft (panels), noc-elevated (modals) — soft, never harsh

## Motion & Animation

- **Entrance:** animate-slide-in (300ms) for modals, panels, timeline items
- **State change:** transition-smooth (220ms) on all interactive elements
- **Alerts:** animate-pulse-soft (2s) on warning states, steady on critical
- **Risk heatmap:** fade-in on data load, smooth gradient transitions
- **Layer toggle:** noc-glow effect on active layer button

## Constraints

- **Color semantic only** — every neon accent serves function (risk signal, status indicator, layer differentiation)
- **High contrast AA+** — WCAG compliance on dark backgrounds, minimum 7:1 text ratio
- **Density over decoration** — information-rich layouts, minimal whitespace
- **Forms:** High-contrast borders, bg-input, clear focus ring with ring-primary
- **Icons:** Lucide React, 16–20px, semantic color via tokens
- **Glassmorphism:** Backdrop blur (4–8px) + semi-transparent background + subtle border = layer separation

## Signature Detail

Predictive intelligence heatmap on the global fiber network map — a gradient overlay showing risk zones (green healthy → red critical) that updates in real-time based on anomaly detection. The heatmap is the visual centerpiece of the NOC, earning every neon color through data significance, never decoration.
