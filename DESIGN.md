# Design Brief

**Purpose:** Dual-layer enterprise platform: carrier-grade Optical Fiber Network Operations Center (mission-critical, cyan/orange/red neon) with layered Super Admin Control Panel (premium SaaS, refined violet accent, glassmorphic data dashboards).

**Tone:** NOC: Professional, mission-critical, authentic terminal aesthetic. Admin: Enterprise SaaS (Stripe/Vercel/Linear-inspired), refined, data-first, elevated glassmorphism.

**Differentiation:** Clear visual hierarchy between NOC and Admin layers — NOC uses neon cyan/orange for real-time alerting; Admin uses violet/indigo for governance and monetization control, with refined glassomorphism and dense data tables distinct from the NOC's high-alert terminal style.

## Core NOC Palette

| Token              | Dark (L C H)        | Purpose                         |
| :----------------- | :------------------ | :------------------------------ |
| **background**     | 0.11 0 0            | Base surface                    |
| **card**           | 0.155 0.008 265     | Raised panels, glass base       |
| **foreground**     | 0.92 0 0            | Primary text                    |
| **primary**        | 0.72 0.22 210       | Neon cyan — active state        |
| **accent**         | 0.68 0.25 55        | Neon orange — warnings          |
| **destructive**    | 0.62 0.28 22        | Neon red — critical faults      |
| **border**         | 0.26 0.01 265       | Subtle dividers                 |

## Super Admin Palette

| Token                  | Dark (L C H)        | Purpose                                |
| :--------------------- | :------------------ | :------------------------------------- |
| **admin-primary**      | 0.65 0.2 280        | Violet accent — admin primary action   |
| **admin-accent**       | 0.72 0.18 280       | Soft purple — secondary UI, interactive |
| **admin-surface**      | 0.2 0.008 280       | Base surface for admin panels          |
| **admin-surface-alt**  | 0.24 0.006 280      | Elevated admin panel background        |
| **admin-table-alt**    | 0.175 0.01 265      | Alternating row for table density      |
| **admin-status-active** | 0.65 0.2 280       | Active company/user status             |
| **admin-status-pending** | 0.7 0.25 55        | Pending/trial status                   |

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
| **NOC Map Container** | WebGL canvas, overlay risk heatmap, layer toggles | background, layer-* |
| **NOC Metrics Panels** | glass-card grid, risk/SLA/capacity gauges | card, risk-*, sla-* |
| **Admin Dashboard** | admin-card grid, KPI stats, compact metric tiles | admin-surface, admin-primary |
| **Admin Company Registry** | admin-table with alternating rows, status badges, dense columns | admin-table-row-alt, admin-badge-* |
| **Admin User Management** | admin-card per-company, role pills, session tracking | admin-surface, admin-badge |
| **Admin Billing** | admin-stat-card for revenue, usage progress bars, invoice list | admin-stat-card, capacity-* |
| **SLA Dashboard** | Card-based, bordered left by status color, metric rows | sla-pass/warning/breach |
| **Audit Timeline** | Vertical timeline, color-coded event badges, expandable details | audit-device/user/workflow/system |

## Component Variants

| Component | CSS Class | Usage |
| :--------- | :---------- | :---- |
| **RiskBadge** | `risk-badge` + `.risk-ok/low/medium/high/critical` | NOC predictive severity |
| **SLAStatusCard** | `sla-status` + `.sla-pass/warning/breach` | NOC SLA tracking |
| **AdminCard** | `admin-card` or `.admin-card-elevated` | Admin panels with purple accent border |
| **AdminStatCard** | `admin-stat-card` + `.admin-stat-value`, `.admin-stat-label` | KPI metrics (companies, users, revenue) |
| **AdminTable** | `admin-table` + `.admin-table-header`, `.admin-table-row`, `.admin-table-row-alt` | Company registry, user management |
| **AdminBadge** | `admin-badge` + `.admin-badge-active/pending/inactive` | Status indicators (Active, Trial, Suspended) |
| **AuditTimelineItem** | `audit-timeline-item` + `.audit-device/user/workflow/system` | Compliance event coloring |
| **AdminSwitch** | `admin-switch` + `.admin-switch-on/off` | Toggle controls in admin |

## Typography

| Tier | Font | Size | Weight | Usage |
| :--- | :--- | :--- | :----- | :---- |
| **H1** | Geist Mono | 28px | 600 | Page titles, KPI headers (NOC & Admin) |
| **H2** | Geist Mono | 20px | 600 | Section headers, metric titles |
| **Body** | General Sans | 14px | 400 | Labels, list items, descriptions |
| **Small** | General Sans | 12px | 500 | Badge text, metadata, timestamps |
| **Mono** | JetBrains Mono | 12px | 400 | Metrics, IPs, signal values, risk scores, currency |

## Elevation & Depth

- **L0 (background):** 0.11 (NOC base), 0.2 (Admin surface) — distinct visual separation
- **L1 (card):** 0.155 (NOC), 0.2 (Admin) — raised panels, glass effect via backdrop blur + border
- **L2 (popover):** 0.18 (NOC), 0.24 (Admin elevated) — modals, dropdowns, command palette, elevated overlays
- **Shadow:** noc-soft (NOC panels), subtle admin shadows — soft, never harsh

## Motion & Animation

- **Entrance:** animate-slide-in (300ms) for modals, panels, timeline items
- **State change:** transition-smooth (220ms) on all interactive elements
- **Alerts:** animate-pulse-soft (2s) on NOC warning states, steady on critical
- **Admin transitions:** fade-in on table rows, smooth highlight on row hover
- **Layer toggle:** noc-glow effect on active layer button

## Constraints

- **Dual-layer color semantics** — NOC: neon cyan/orange/red for real-time alerts; Admin: violet/indigo for governance
- **High contrast AA+** — WCAG compliance on dark backgrounds, minimum 7:1 text ratio
- **Density over decoration** — NOC: high-alert real-time display; Admin: data-dense tables, compact metrics
- **Forms:** High-contrast borders, bg-input, clear focus ring with ring-primary
- **Icons:** Lucide React, 16–20px, semantic color via tokens
- **Glassmorphism:** NOC: sharp neon glows for alerts; Admin: refined backdrop blur + semi-transparent bg + subtle borders
- **Tables:** Alternating row backgrounds (admin-table-row-alt), monospace for numeric data, hover state on rows

## Topology Section Redesign (Light Theme)

**Visual Direction:** Premium SaaS topology visualization (Stripe/Linear-grade) with light theme isolated to Topology section only. Crispwhite backgrounds (0.98 L), deep charcoal text (0.14 L), strong indigo primary (0.50 L), warm orange accent (0.65 L). Enterprise-grade minimalism with refined glassmorphism.

**Primary View:** Network graph/canvas view (default). Hierarchical OLT→Splitter→ONT visualization with bezier edges, clean node circles, layer-specific line colors. Optional toggle to OLT cards (secondary). Space Grotesk display + Figtree body typography.

**Spatial Composition:** Header (bold title + stat pills) → Toolbar (layer toggles, view switcher, controls) → Main canvas (elevated glass card, minimal backdrop blur 6px) → Right panel (device detail slide-out). Clean, spacious layout with generous padding and subtle borders.

**Node Visualization:** Nodes rendered as 24-28px circles with minimal glow (indigo 0.4 opacity for primary, orange 0.4 for warning, red 0.5 for critical). Soft box-shadows instead of aggressive neon. Smooth entrance stagger (80ms per node). Hover state: shadow lift, slight scale +10%, text label appears inline.

**Edges & Layer Colors:** Bezier curves with layer-specific colors (indigo/orange/purple). Stroke width 1.5–2px. Smooth fade-in transitions on draw (300ms). No marching ants — clean, static lines except on fault visualization.

**Interactive Elements:** Buttons with light-card bg (0.99), subtle border (0.85 border), hover transitions to muted secondary bg. Active state: indigo tint + underline. Layer toggles as light icon buttons with border. No aggressive neon glows — refined and restrained.

**Elevation & Depth:** Canvas in light glass card (blur 6px, semi-transparent bg 0.85, subtle border). Panel drawer over canvas with glass effect (blur 8px). Stat pills as light cards with fine borders. All shadows soft (2-4px blur, 0.08 opacity).

**Typography:** Space Grotesk 20px 600 for header, Figtree 14px 400 for labels, mono 12px for metrics. Clean hierarchy without visual noise. High contrast (0.14 fg on 0.98 bg = AA+ compliant).

**Motion:** Entrance stagger 80ms, smooth state transitions (220ms), light fade-in on overlays, slide-in panel (300ms spring). No aggressive pulsing — subtle and professional.

**Color Tokens:** topology-bg (0.98), topology-card (0.99), topology-foreground (0.14), topology-primary (0.50 L 0.18 C 210 H), topology-accent (0.65 L 0.20 C 50 H), topology-border (0.85). All status colors with 12% tinted backgrounds + 30% borders for badge styling.

**Anti-Pattern:** Flat design feels cheap. Instead: subtle depth via glass, soft shadows, clean borders, high contrast text, refined glow (not neon). Enterprise, not generic AI pastel.

## Fault Visualization Page

**Purpose:** Real-time network fault cascade detection — show affected customers, fiber routes, and fault locations with high-alert visual language.

**Tone:** Mission-critical operational dashboard. Urgent but not panicked. Green = healthy, Orange = affected, Red = critical fault.

**Visual Structure:** Fullscreen Leaflet map (center), top alert banner (red/orange), right collapsible stats panel (glassmorphic), layer toggles (top-left), device markers with status glows, fiber polylines color-coded by status.

**Status Colors:** Green (0.62 L fault-active), Orange (0.68 L fault-affected), Red (0.62 L fault-down).

**Motion:** Blinking/pulsing effect (`blink-fault` 1.2s) on cut cable indicators, smooth state transitions (220ms) on device/fiber status changes, fade-in on alert banner.

**Key Interactions:** Click device → show popup with name, status, affected customers. Click fiber → highlight downstream impact. Layer toggles to show/hide Customers/Fiber/Devices. Zoom to affected area on fault detection.

**Density:** High-information right panel with live stats (Total Customers, Active, Affected, Down Devices, Cut Routes).


