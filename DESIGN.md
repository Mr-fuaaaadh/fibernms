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

## Signature Details

1. **NOC Heatmap:** Predictive intelligence gradient overlay on global fiber map (green healthy → red critical), real-time risk zones.
2. **Admin Data Dashboard:** Dense, refined glassmorphic panels with purple accent left borders, elevated KPI cards with monospace metrics, compact table rows with status badges — enterprise SaaS aesthetic distinct from NOC's terminal style.


