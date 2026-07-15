# FiberNMS — Optical Fiber Network Management System

> Carrier-grade, SaaS-based OFNMS frontend for telecom operators, ISPs, and large infrastructure providers.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Table of Contents](#2-table-of-contents)
3. [Feature Highlights](#3-feature-highlights)
4. [Tech Stack](#4-tech-stack)
5. [Quick Start](#5-quick-start)
6. [Project Directory Structure](#6-project-directory-structure)
7. [All Pages & Routes](#7-all-pages--routes)
8. [Component Architecture](#8-component-architecture)
9. [TypeScript Data Models](#9-typescript-data-models)
10. [Zustand State Stores](#10-zustand-state-stores)
11. [Feature Gating System](#11-feature-gating-system)
12. [Role-Based Access Control Matrix](#12-role-based-access-control-matrix)
13. [Subscription Tiers](#13-subscription-tiers)
14. [Seed Credentials](#14-seed-credentials)
15. [Network Map — Unified Architecture](#15-network-map--unified-architecture)
16. [Fault Visualization Module](#16-fault-visualization-module)
17. [Topology Section](#17-topology-section)
18. [Network Auto Design Module](#18-network-auto-design-module)
19. [Super Admin System](#19-super-admin-system)
20. [Mobile-First & PWA](#20-mobile-first--pwa)
21. [Alerts & Notifications Page](#21-alerts--notifications-page)
22. [AI Assistant](#22-ai-assistant)
23. [Workflow Automation](#23-workflow-automation)
24. [SaaS & Billing Architecture](#24-saas--billing-architecture)
25. [Mock Data Layer](#25-mock-data-layer)
26. [Connecting a Python FastAPI Backend](#26-connecting-a-python-fastapi-backend)
27. [Deployment & Environment](#27-deployment--environment)

---

## 1. Project Overview

FiberNMS is a full-featured, production-grade, mobile-first SaaS Optical Fiber Network Management System (OFNMS) frontend. Built for telecom operators, ISPs, and infrastructure providers, it delivers Zabbix-level monitoring, AI-powered intelligence, multi-tenant SaaS with 4-tier subscriptions, and global scale supporting 100K–1M+ devices.

Key design decisions:

- **Single unified map** (CARTO Voyager tiles via Leaflet.js) — all device management, fiber route drawing, and real-time fault visualization live on one map. No duplicate or forked map pages.
- **Mobile-first PWA** — fully responsive across all 37 pages, installable to the home screen, with a bottom navigation bar on mobile and a collapsible sidebar on desktop.
- **Role-based architecture** — 5 roles (Super Admin, Admin, Engineer, Operator, Viewer) govern every sidebar section, mobile tab, and route.
- **Feature gating** — 18 feature flags mapped to 4 subscription tiers (BASIC / PROFESSIONAL / ENTERPRISE / ULTRA) with runtime enforcement via `useFeature` hook.
- **Mock-data first** — ships with 54 companies, 1000+ users, 1000+ devices, full billing/audit/SLA records so every page is immediately explorable.
- **FastAPI-ready** — all data calls route through a centralized `api.ts` layer. Swap mock adapters for real FastAPI endpoints with one environment variable.

---

## 2. Table of Contents

*(See numbered list above.)*

---

## 3. Feature Highlights

### Core NOC

- **Unified Network Map** — CARTO Voyager light tiles (non-black), 7 device types (OLT/ONT/Splitter/Coupler/Router/JJB/Switch), right-click or toolbar placement, fiber route drawing, fault simulation (device-down / cable-cut cascade), layer toggles (Customers / Fiber / Devices), undo with 20-snapshot history, root-delete cascade, mobile fullscreen with FAB + swipe-up bottom sheet.
- **Device Management** — 1000+ devices in a virtualized TanStack Table; filter by type/status/region; add-device modal; mobile card view.
- **Topology Section** — two views: (1) OLT Sections (glassmorphism cards per OLT with mini SVG tree + summary bar), (2) Network Graph (deep-space canvas, neon nodes, animated data-flow dots, minimap). Fully responsive with mobile bottom sheet.
- **Monitoring** — 4 KPI stat cards, status distribution pie, 24 h signal line chart, live alert feed driven by EventBus.
- **Tools** — power budget calculator, OTDR simulator, wavelength reference table, dB/dBm reference card.
- **Analytics** — 30-day health trend, alert volume stacked bar, regional signal averages, uptime-by-region with SLA line, top alerted devices, traffic throughput. All Recharts `ResponsiveContainer`.
- **Workflow Automation** — n8n-style visual node builder (PROFESSIONAL+), AI-generated workflows, run history.
- **AI Assistant** — multi-column chat copilot with pre-built NOC queries, session history, network status panel.

### Enterprise

- **SLA Dashboard** (PROFESSIONAL+) — per-circuit uptime %, MTTR, MTBF, SLA compliance trend, PDF/CSV export.
- **Predictive Intelligence** (ENTERPRISE+) — risk score cards (0–100), anomaly confidence %, failure timeline, maintenance recommendations.
- **Capacity Planning** (ENTERPRISE+) — regional utilization bars, 6/12-month projection charts, OLT port exhaustion table.
- **Audit Logs** — full timeline + table view with actor/action/before-after diff, CSV export.
- **Alerts & Notifications** — dedicated enterprise page (banners removed from map); severity KPI bar, filter tabs, bulk actions, real-time simulation, slide-out detail panel.

### Network Auto Design

- Polygon drawing on Leaflet map (draw / edit / delete).
- Parameter form: subscriber count, network type (FIBER / COAXIAL / LAN), splitter capacity (1:8/1:16/1:32), max distance.
- POST to `/api/network/auto-design/` via React Query mutation.
- Animated OLT → Splitter → Subscriber result rendered on map with color-coded edges.
- Summary panel: total subscribers, splitter count, total cable length, estimated cost.
- JSON export.

### SaaS & Billing

- 4-tier subscriptions (BASIC → PROFESSIONAL → ENTERPRISE → ULTRA).
- 18 feature flags with runtime gating via `useFeature` hook.
- Multi-tenant management, white-labeling, license key validation.
- Integrations catalog (Slack / PagerDuty / Jira / ServiceNow / Grafana / Prometheus).

### Super Admin

- Global KPI dashboard (companies / users / MRR / devices).
- 54-company CRUD with virtualized table and mobile card view.
- 1000+ user management with CSV import, invite, session tracking, force-logout.
- MRR / ARR / churn / ARPU / LTV analytics.
- RBAC + ABAC matrix (toggle cells, custom roles, WHERE-clause ABAC builder).
- Security dashboard (login heatmap, failed-login trend, suspicious activity feed, MFA %).
- System alerts (API latency / memory / payments / certs / backups).

### Auth & Roles

- Login form with 3 seed accounts; 5-step enterprise registration wizard.
- 5 roles: Super Admin, Admin (Tenant), Engineer, NOC Operator, Viewer.
- Session persisted to localStorage via Zustand persist middleware.

### Mobile & PWA

- Auto-switching layout: bottom nav + hamburger drawer on mobile, collapsible sidebar on desktop.
- Bottom navigation 5 tabs adapt per role.
- PWA: `manifest.json` + service worker → installable to home screen.
- All 37 pages fully responsive; 44 px minimum touch targets throughout.

---

## 4. Tech Stack

| Category        | Library                        | Version  |
|-----------------|--------------------------------|----------|
| UI Framework    | React                          | 19       |
| Build Tool      | Vite                           | 5.4      |
| Language        | TypeScript (strict mode)       | 5.8      |
| Styling         | Tailwind CSS                   | 3.4      |
| Routing         | TanStack Router                | v1       |
| Data Fetching   | TanStack Query                 | v8       |
| Global State    | Zustand                        | v5       |
| Map             | Leaflet + React-Leaflet        | 1.9      |
| Charts          | Recharts                       | v2       |
| Animation       | Framer Motion                  | latest   |
| Icons           | Lucide React                   | latest   |
| UI Primitives   | Radix UI                       | latest   |
| Forms           | React Hook Form + Zod          | latest   |
| HTTP            | Axios                          | latest   |
| Table           | TanStack Table                 | v8       |

---

## 5. Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install

```bash
cd src/frontend
pnpm install --prefer-offline
```

### Development

```bash
pnpm dev
# → http://localhost:5173
```

### Build

```bash
pnpm build
```

### Typecheck

```bash
pnpm typecheck
```

### Lint & Fix

```bash
pnpm fix
```

### Environment Variables (`.env.local`)

| Variable              | Description                                          | Default                                      |
|-----------------------|------------------------------------------------------|----------------------------------------------|
| `VITE_API_BASE_URL`   | FastAPI backend base URL                             | (mock adapter used when absent)              |
| `VITE_TILE_URL`       | Custom map tile URL                                  | CARTO Voyager (`https://{s}.basemaps...`)    |
| `VITE_FORCE_PLAN`     | Override subscription plan for testing (`ENTERPRISE`) | (uses authStore plan)                       |

---

## 6. Project Directory Structure

```
fibernms/
├── README.md
└── src/frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── package.json
    ├── public/
    │   ├── manifest.json          # PWA manifest
    │   ├── sw.js                  # Service worker (offline caching)
    │   └── icons/                 # PWA icons (192px, 512px)
    └── src/
        ├── main.tsx               # React root + QueryClient + Router
        ├── App.tsx                # Route definitions
        ├── index.css              # Tailwind base + design tokens
        ├── components/
        │   ├── Layout.tsx         # Root layout, mobile/desktop switching
        │   ├── Sidebar.tsx        # Collapsible desktop sidebar (role-filtered)
        │   ├── Navbar.tsx         # Top navbar with tenant switcher
        │   ├── MobileHeader.tsx   # Sticky mobile header with hamburger
        │   ├── MobileBottomNav.tsx # Bottom 5-tab navigation (role-based)
        │   ├── MobileNavDrawer.tsx # Full-page spring-animated drawer
        │   ├── CommandPalette.tsx  # Cmd+K global search
        │   ├── GlassCard.tsx       # Reusable glassmorphism card
        │   ├── DeviceIcon.tsx      # 7-type device icon renderer
        │   ├── StatusBadge.tsx     # Active/Warning/Faulty/Offline pill
        │   ├── map/               # Map sub-components
        │   │   ├── MapToolbar.tsx
        │   │   ├── DeviceMarker.tsx
        │   │   ├── FiberRoute.tsx
        │   │   ├── StatsPanel.tsx
        │   │   ├── LayerToggle.tsx
        │   │   └── MobileMapSheet.tsx
        │   ├── topology/
        │   │   ├── OltSectionsView.tsx
        │   │   ├── NetworkGraph.tsx
        │   │   ├── TopologyNodePanel.tsx
        │   │   └── MiniMap.tsx
        │   ├── monitoring/
        │   │   ├── KPICard.tsx
        │   │   └── AlertFeed.tsx
        │   ├── devices/
        │   │   ├── DeviceTable.tsx
        │   │   └── DeviceCard.tsx
        │   ├── tools/
        │   │   ├── PowerCalculator.tsx
        │   │   └── OTDRSimulator.tsx
        │   ├── fault/
        │   │   ├── FaultControls.tsx
        │   │   └── CustomerImpactPanel.tsx
        │   └── alerts/
        │       ├── AlertCard.tsx
        │       └── AlertDetailPanel.tsx
        ├── pages/
        │   ├── Login.tsx
        │   ├── Register.tsx
        │   ├── MapDashboard.tsx
        │   ├── Devices.tsx
        │   ├── Topology.tsx
        │   ├── Monitoring.tsx
        │   ├── Tools.tsx
        │   ├── Analytics.tsx
        │   ├── Workflows.tsx
        │   ├── AIAssistant.tsx
        │   ├── AlertsPage.tsx
        │   ├── SLADashboard.tsx
        │   ├── PredictiveIntelligence.tsx
        │   ├── CapacityPlanning.tsx
        │   ├── AuditLogs.tsx
        │   ├── Billing.tsx
        │   ├── Plans.tsx
        │   ├── UsageAnalytics.tsx
        │   ├── Integrations.tsx
        │   ├── Branding.tsx
        │   ├── License.tsx
        │   ├── Tenants.tsx
        │   ├── Docs.tsx
        │   ├── AutoDesignPage.tsx
        │   └── admin/
        │       ├── SuperAdminDashboard.tsx
        │       ├── CompanyManagement.tsx
        │       ├── CompanyDetail.tsx
        │       ├── GlobalUserManagement.tsx
        │       ├── GlobalBilling.tsx
        │       ├── OrdersInvoices.tsx
        │       ├── PlatformAudit.tsx
        │       ├── AccessControl.tsx
        │       ├── SystemAlerts.tsx
        │       ├── SecurityDashboard.tsx
        │       ├── GlobalAnalytics.tsx
        │       └── TenantAdminPanel.tsx
        ├── modules/
        │   └── auto-design/
        │       ├── index.tsx
        │       ├── types.ts
        │       ├── store/
        │       │   └── autoDesignStore.ts
        │       ├── hooks/
        │       │   └── useAutoDesign.ts
        │       └── components/
        │           ├── MapCanvas.tsx
        │           ├── DrawControls.tsx
        │           ├── ParameterPanel.tsx
        │           └── ResultPanel.tsx
        ├── store/
        │   ├── authStore.ts
        │   ├── subscriptionStore.ts
        │   └── networkStore.ts
        ├── types/
        │   ├── network.ts
        │   ├── subscription.ts
        │   └── superAdmin.ts
        ├── config/
        │   └── features.ts
        ├── hooks/
        │   ├── useAuth.ts
        │   ├── useFeature.ts
        │   ├── useRoleNav.ts
        │   ├── use-mobile.tsx
        │   └── useFaultVisualization.ts
        ├── data/
        │   ├── mockData.ts
        │   ├── superAdminMockData.ts
        │   ├── billingMockData.ts
        │   └── faultMockData.ts
        └── lib/
            ├── utils.ts
            └── eventBus.ts
```

---

## 7. All Pages & Routes

### Authentication

| Route       | Component     | Description                                                                                               | Mobile Behavior                    |
|-------------|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------|
| `/login`    | `Login.tsx`   | Email/password form. Shows 3 seed accounts as quick-fill buttons. Remember-me checkbox.                   | Fullscreen, no nav                 |
| `/register` | `Register.tsx`| 5-step wizard: Company info → Contact details → Plan selection → Admin user → Review & confirm.           | Step cards stack vertically        |

### Core NOC

| Route         | Component          | Key Features                                                                                                                                                                  | Mobile Behavior                                  |
|---------------|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `/`           | `MapDashboard.tsx` | CARTO Voyager tiles. 7 device types (OLT/ONT/Splitter/Coupler/Router/JJB/Switch). Fiber route drawing. Fault simulation (device-down / cable-cut cascade). Undo (20 snapshots). Root-delete cascade. Layer toggles. Stats panel. Alert banners → moved to `/alerts`. | Fullscreen map, FAB menu, swipe-up bottom sheet for device details |
| `/devices`    | `Devices.tsx`      | Virtualized TanStack Table: Name/Type/Status/Uptime/TxPower/RxPower/Region/LastSeen. Filter panel (type/status/region). Add-device modal. CSV export.                         | Card list view, tap to expand details            |
| `/topology`   | `Topology.tsx`     | **OLT Sections view**: glassmorphism card per OLT with mini SVG tree + summary bar (total/online/fault). **Network Graph view**: deep-space canvas, neon hex OLT/diamond Splitter/square ONT nodes, animated data-flow dots, minimap. TopologyNodePanel: Overview/Signal/History/Actions tabs. | Bottom sheet for node detail, scrollable toolbars, fluid SVG trees |
| `/monitoring` | `Monitoring.tsx`   | 4 KPI stat cards. Status distribution pie chart. 24 h signal line chart (288 datapoints). Live alert feed. EventBus-driven simulation every 30 s.                             | Cards stacked vertically, charts scroll horizontally |
| `/tools`      | `Tools.tsx`        | Power budget calculator (Tx/fiber length/splitter ratio/connector loss → Rx/margin/pass-fail). OTDR simulator (length/fault distance → trace chart). Wavelength reference table. dB/dBm reference. | Tabbed layout, full-width inputs                 |
| `/analytics`  | `Analytics.tsx`    | 30-day device health trend. Alert volume stacked bar. Regional signal averages. Uptime by region with SLA reference line. Top alerted devices. Traffic throughput. All `ResponsiveContainer`. | Horizontal scroll on charts                      |
| `/workflows`  | `Workflows.tsx`    | **PROFESSIONAL+**. n8n-style drag-drop builder. Node types: Triggers/Actions/Conditions. Pre-built templates. AI generation. Run history table.                               | Collapsible node palette, scrollable canvas      |
| `/ai`         | `AIAssistant.tsx`  | Desktop: 3-column (sessions / chat / network status). Mobile: single chat + 2 drawer buttons (Sessions, Network Status). Multi-turn NOC context. Pre-built queries. Session history. | Chat panel only; drawers slide in from sides     |
| `/alerts`     | `AlertsPage.tsx`   | KPI bar (Total/Critical/High/Medium/Low/Unresolved). Severity filter tabs. Alert cards with severity badge/device/message/timestamp. Bulk acknowledge/resolve/delete. Real-time simulation button. Slide-out detail panel. | Bottom sheet for alert detail                    |

### Enterprise Modules

| Route          | Component                  | Plan        | Key Features                                                                                                           |
|----------------|----------------------------|-------------|------------------------------------------------------------------------------------------------------------------------|
| `/sla`         | `SLADashboard.tsx`         | PROFESSIONAL+ | Per-circuit table: circuitId/region/customer/uptime%/MTTR/MTBF/slaTarget/compliant. Monthly compliance trend chart. PDF/CSV export. |
| `/predictive`  | `PredictiveIntelligence.tsx`| ENTERPRISE+ | Risk score cards (0–100, color-coded). Anomaly alerts with confidence %. Failure timeline. Maintenance recommendations with prevention value. |
| `/capacity`    | `CapacityPlanning.tsx`     | ENTERPRISE+ | Regional utilization bars. 6/12-month projection area charts. OLT port utilization table with days-to-exhaustion. Expansion recommendations. |
| `/audit`       | `AuditLogs.tsx`            | All roles   | Timeline + table views. Columns: Timestamp/Actor/Role/Action/ResourceType/ResourceId/ResourceName/BeforeValue/AfterValue/IpAddress/SessionId. Filters: date/actor/action/resource. CSV export. |

### Billing & SaaS

| Route               | Component          | Plan         | Key Features                                                                                      |
|---------------------|--------------------|--------------|---------------------------------------------------------------------------------------------------|
| `/billing`          | `Billing.tsx`      | All          | Current plan badge + expiry. Device usage bar. API quota bar. Invoice history. Payment method. Upgrade CTA. |
| `/plans`            | `Plans.tsx`        | All          | 4-tier comparison table. Monthly/annual toggle. Upgrade modal with proration preview.             |
| `/usage`            | `UsageAnalytics.tsx`| All         | Device count trend. API call volume bar. Storage gauge. Alert volume. Usage-vs-limit indicators.  |
| `/integrations`     | `Integrations.tsx` | ENTERPRISE+  | API key management (generate/copy/revoke + scopes). Webhook endpoints (add/edit/delete + event subscriptions). Integration catalog. |
| `/settings/branding`| `Branding.tsx`     | ENTERPRISE+  | Platform name, logo upload (light/dark), color pickers, favicon, custom domain, email footer.    |
| `/settings/license` | `License.tsx`      | All          | License key input + validation. Shows plan/expiry/features. 4 demo keys. Activation history.      |
| `/tenants`          | `Tenants.tsx`      | ULTRA        | Company list with add-tenant form. Tenant switcher dropdown. Per-tenant branding preview.         |
| `/docs`             | `Docs.tsx`         | All          | Renders `README.md` with markdown (headings/tables/code blocks). Auto-generated TOC. Sticky sidebar (desktop), dropdown TOC (mobile). |
| `/auto-design`      | `AutoDesignPage`   | All          | Full Network Auto Design module. See [Section 18](#18-network-auto-design-module).                |

### Super Admin (requires `superAdmin` role)

| Route                       | Component                  | Key Features                                                                                         |
|-----------------------------|----------------------------|------------------------------------------------------------------------------------------------------|
| `/super-admin`              | `SuperAdminDashboard.tsx`  | Global KPIs (companies/users/MRR/devices). Revenue trend. Signups vs churn. Plan distribution pie. Activity feed. |
| `/super-admin/companies`    | `CompanyManagement.tsx`    | Virtualized table: 54 companies (logo/name/plan/status/devices/users/MRR/date). Filters, CRUD, bulk ops, mobile card view. |
| `/super-admin/companies/:id`| `CompanyDetail.tsx`        | Tabs: Overview / Users / Devices / Billing / Audit / Settings.                                       |
| `/super-admin/users`        | `GlobalUserManagement.tsx` | 1000+ user table (avatar/name/email/role/company/plan/status/lastLogin). CSV import. Invite by email. Force logout. |
| `/super-admin/billing`      | `GlobalBilling.tsx`        | MRR/ARR/churn/ARPU/LTV KPIs. Revenue trend. Churn analysis. Revenue by plan. MRR waterfall chart.    |
| `/super-admin/orders`       | `OrdersInvoices.tsx`       | Order table + invoice line items (subscription/setup/overage/credits). PDF export. Bulk ZIP.         |
| `/super-admin/audit`        | `PlatformAudit.tsx`        | Cross-tenant audit trail. Same columns as tenant audit + Company column.                             |
| `/super-admin/access`       | `AccessControl.tsx`        | RBAC matrix (roles × resources × actions toggle cells). Custom role creation. ABAC WHERE-clause builder. Region scoping. |
| `/super-admin/alerts`       | `SystemAlerts.tsx`         | Infrastructure alerts: API latency / memory / payments / logins / certs / backups. Acknowledge/resolve/escalate. |
| `/super-admin/security`     | `SecurityDashboard.tsx`    | Login heatmap (hour × day-of-week). Failed login trend. IP geolocation. Suspicious activity feed. MFA compliance %. Active session trend. |
| `/super-admin/analytics`    | `GlobalAnalytics.tsx`      | Usage heatmap. Churn prediction risk scores. 12-month growth projection. Feature adoption by plan. Geographic expansion map. |
| `/tenant-admin/:id`         | `TenantAdminPanel.tsx`     | Admin role only, own company. Tabs: Overview / Users / Billing / Workflows / Network Links / Settings. |

---

## 8. Component Architecture

### Layout System

`Layout.tsx` uses the `useIsMobile` hook (breakpoint `< 768 px`) to auto-switch between two rendering modes:

- **Desktop**: collapsible `Sidebar` (220 px expanded / 64 px collapsed) + `Navbar` + scrollable main content.
- **Mobile**: `MobileHeader` (sticky, 56 px, hamburger button) + bottom-padded scrollable content + `MobileBottomNav` (fixed, 60 px). The hamburger opens `MobileNavDrawer`.

All protected pages are wrapped in `Layout`. `/login` and `/register` render without it.

### Sidebar

- Width: 220 px (expanded) / 64 px (collapsed, icon-only). Toggle persisted to localStorage.
- Sections are generated by `useRoleNav(currentRole)` — returns only the sections and items the current role may see.
- Active route item has a left-border glow `border-l-2 border-primary`.
- Bottom: user avatar, name, role badge, logout button.

### MobileBottomNav

- 5 tabs. Tab items per role are defined in `config/roleNav.ts`.
- Active tab: icon + label with `text-primary`, inactive: `text-muted-foreground`.
- 60 px fixed height; sits above iOS safe-area-inset.

### MobileNavDrawer

- Spring-animated full-page drawer (Framer Motion `x: "-100%"` → `0`).
- Lists all sections visible for current role, identical filtering logic to `Sidebar`.
- Closes on route change and on backdrop tap.

### CommandPalette

- Triggered by `Cmd+K` / `Ctrl+K` or the search icon in `Navbar`.
- Fullscreen overlay. Input filters across all pages and devices.
- Grouped results: Pages / Devices / Users / Actions. Keyboard nav with `↑↓` arrows + `Enter`.

### GlassCard

```tsx
// Usage
<GlassCard className="p-6">...</GlassCard>
// Renders: rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg
```

### DeviceIcon

| Type     | Icon        | Color  |
|----------|-------------|--------|
| OLT      | Hexagon     | Blue   |
| ONT      | Square      | Green  |
| Splitter | Diamond     | Orange |
| Coupler  | Circle      | Purple |
| Router   | Star        | Red    |
| JJB      | Cross       | Yellow |
| Switch   | Triangle    | Teal   |

### StatusBadge

| Status   | Style                                    |
|----------|------------------------------------------|
| active   | `bg-green-500/20 text-green-400`         |
| warning  | `bg-yellow-500/20 text-yellow-400`       |
| faulty   | `bg-red-500/20 text-red-400`             |
| offline  | `bg-gray-500/20 text-gray-400`           |

---

## 9. TypeScript Data Models

### Network Types (`src/types/network.ts`)

```typescript
export type DeviceType = 'OLT' | 'ONT' | 'Splitter' | 'Coupler' | 'Router' | 'JJB' | 'Switch';
export type DeviceStatus = 'active' | 'warning' | 'faulty' | 'offline';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  lat: number;
  lng: number;
  region: string;
  uptime: number;           // percentage 0–100
  txPower: number;          // dBm
  rxPower: number;          // dBm
  lastSeen: string;         // ISO 8601
  parentId?: string;        // parent device id (for cascade delete)
  children: string[];       // child device ids
  customerId?: string;
  customerCount?: number;   // customers served downstream
  metadata?: Record<string, string>;
}

export type RouteType = 'fiber' | 'copper' | 'wireless';
export type RouteStatus = 'active' | 'degraded' | 'cut' | 'planned';

export interface FiberRoute {
  id: string;
  name: string;
  type: RouteType;
  status: RouteStatus;
  waypoints: [number, number][];  // [lat, lng] array
  fromDeviceId: string;
  toDeviceId: string;
  length: number;                  // meters
  attenuation: number;             // dB/km
  capacity: number;                // Gbps
  installedAt: string;             // ISO 8601
}

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type AlertType = 'device_down' | 'cable_cut' | 'signal_degraded' | 'threshold_breach' |
                        'maintenance_due' | 'capacity_warning' | 'security' | 'system';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  type: AlertType;
  deviceId?: string;
  deviceName?: string;
  routeId?: string;
  message: string;
  details?: string;
  affectedCustomers: number;
  timestamp: string;         // ISO 8601
  acknowledgedAt?: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
  status: 'open' | 'acknowledged' | 'resolved';
}

export interface SLARecord {
  circuitId: string;
  circuitName: string;
  region: string;
  customer: string;
  uptime: number;          // percentage
  mttr: number;            // mean time to repair, minutes
  mtbf: number;            // mean time between failures, hours
  slaTarget: number;       // percentage target e.g. 99.9
  compliant: boolean;
  month: string;           // YYYY-MM
}

export interface PredictiveAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  riskScore: number;       // 0–100
  anomalyType: string;
  confidence: number;      // percentage
  predictedFailureAt: string;  // ISO 8601
  recommendation: string;
  preventionValue: number;     // estimated cost saved (USD)
}

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' |
                          'EXPORT' | 'BULK_DELETE' | 'PLAN_CHANGE' | 'LICENSE_ACTIVATE' |
                          'INVITE' | 'FORCE_LOGOUT' | 'PERMISSION_CHANGE';

export type AuditResourceType = 'Device' | 'FiberRoute' | 'User' | 'Company' |
                                 'Plan' | 'Alert' | 'Workflow' | 'License' |
                                 'Integration' | 'Session';

export interface AuditLog {
  id: string;
  timestamp: string;         // ISO 8601
  actor: string;             // user email
  actorId: string;
  role: string;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId: string;
  resourceName: string;
  beforeValue?: string;      // JSON snapshot
  afterValue?: string;       // JSON snapshot
  ipAddress: string;
  sessionId: string;
  companyId?: string;        // present in platform-level audit
  companyName?: string;
}

export interface CapacityRecord {
  regionId: string;
  regionName: string;
  currentUtilization: number;   // percentage
  projectedUtilization6m: number;
  projectedUtilization12m: number;
  totalOltPorts: number;
  usedOltPorts: number;
  daysToExhaustion: number;
  expansionRecommendation: string;
  estimatedCapexUsd: number;
}
```

### Subscription Types (`src/types/subscription.ts`)

```typescript
export enum Plan {
  BASIC        = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE   = 'ENTERPRISE',
  ULTRA        = 'ULTRA',
}

export enum FeatureFlag {
  // Core (all plans)
  UNIFIED_MAP          = 'UNIFIED_MAP',
  DEVICE_MANAGEMENT    = 'DEVICE_MANAGEMENT',
  TOPOLOGY             = 'TOPOLOGY',
  MONITORING           = 'MONITORING',
  TOOLS                = 'TOOLS',
  AUDIT_LOGS           = 'AUDIT_LOGS',
  ALERTS_PAGE          = 'ALERTS_PAGE',
  // Professional+
  SLA_DASHBOARD        = 'SLA_DASHBOARD',
  WORKFLOW_AUTOMATION  = 'WORKFLOW_AUTOMATION',
  ANALYTICS_ADVANCED   = 'ANALYTICS_ADVANCED',
  // Enterprise+
  PREDICTIVE_AI        = 'PREDICTIVE_AI',
  CAPACITY_PLANNING    = 'CAPACITY_PLANNING',
  INTEGRATIONS         = 'INTEGRATIONS',
  WHITE_LABELING       = 'WHITE_LABELING',
  // Ultra only
  MULTI_TENANT         = 'MULTI_TENANT',
  // Cross-cutting
  API_ACCESS           = 'API_ACCESS',
  CSV_EXPORT           = 'CSV_EXPORT',
  PDF_EXPORT           = 'PDF_EXPORT',
}

export interface PlanConfig {
  plan: Plan;
  priceMonthly: number;     // USD
  priceAnnual: number;      // USD/year
  maxDevices: number;       // -1 = unlimited
  maxUsers: number;
  apiQuotaPerDay: number;
  features: FeatureFlag[];
  support: string;
  targetAudience: string;
}

export interface BillingRecord {
  invoiceId: string;
  date: string;              // ISO 8601
  amount: number;            // USD
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  description: string;
  downloadUrl?: string;
}

export interface TenantInfo {
  tenantId: string;
  companyName: string;
  plan: Plan;
  primaryColor?: string;
  logoUrl?: string;
  customDomain?: string;
}
```

### Super Admin Types (`src/types/superAdmin.ts`)

```typescript
export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  plan: Plan;
  status: 'active' | 'suspended' | 'trial' | 'churned';
  deviceCount: number;
  userCount: number;
  mrr: number;              // USD/month
  createdAt: string;        // ISO 8601
  region: string;
  contactEmail: string;
  licenseKey?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superAdmin' | 'admin' | 'engineer' | 'operator' | 'viewer';
  companyId: string;
  companyName: string;
  plan: Plan;
  status: 'active' | 'suspended' | 'invited';
  lastLogin: string;        // ISO 8601
  mfaEnabled: boolean;
  avatarUrl?: string;
  sessionId?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;        // USD
  total: number;            // USD
  type: 'subscription' | 'setup' | 'overage' | 'credit';
}

export interface Invoice {
  id: string;
  companyId: string;
  companyName: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  issuedAt: string;
  dueAt: string;
  pdfUrl?: string;
}

export interface Order {
  id: string;
  companyId: string;
  companyName: string;
  plan: Plan;
  type: 'new' | 'upgrade' | 'downgrade' | 'renewal' | 'cancellation';
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
  invoice?: Invoice;
}
```

### Auto Design Types (`src/modules/auto-design/types.ts`)

```typescript
export interface PolygonData {
  type: 'Polygon';
  coordinates: [number, number][][];  // GeoJSON
}

export interface AutoDesignParams {
  polygon: PolygonData;
  subscriber_count: number;
  network_type: 'FIBER' | 'COAXIAL' | 'LAN';
  splitter_capacity: 8 | 16 | 32;
  max_distance: number;              // meters
  manual_olt_placement?: boolean;
}

export type NetworkNodeType = 'OLT' | 'Splitter' | 'Subscriber';

export interface NetworkNode {
  id: string;
  type: NetworkNodeType;
  lat: number;
  lng: number;
  label: string;
  connectedCount: number;
}

export interface NetworkEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  length: number;            // meters
  networkType: 'FIBER' | 'COAXIAL' | 'LAN';
}

export interface NetworkResult {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  totalSubscribers: number;
  splitterCount: number;
  totalCableLength: number;  // meters
  estimatedCostUsd: number;
}

export interface AutoDesignState {
  polygon: PolygonData | null;
  params: Partial<AutoDesignParams>;
  result: NetworkResult | null;
  isLoading: boolean;
  error: string | null;
  setPolygon: (polygon: PolygonData | null) => void;
  setParams: (params: Partial<AutoDesignParams>) => void;
  setResult: (result: NetworkResult | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
```

---

## 10. Zustand State Stores

### `authStore.ts`

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'superAdmin' | 'admin' | 'engineer' | 'operator' | 'viewer';
  companyId: string;
  companyName: string;
  plan: Plan;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}
```

> **Persistence**: `persist` middleware saves `user` and `isAuthenticated` to `localStorage` under key `fibernms-auth`.

---

### `subscriptionStore.ts`

```typescript
interface SubscriptionState {
  currentPlan: Plan;
  deviceUsed: number;
  deviceLimit: number;          // from PlanConfig.maxDevices
  apiUsed: number;
  apiQuota: number;             // from PlanConfig.apiQuotaPerDay
  expiryDate: string;           // ISO 8601
  licenseKey: string | null;
  tenantId: string | null;
}

interface SubscriptionActions {
  setPlan: (plan: Plan) => void;
  validateLicense: (key: string) => Promise<{ valid: boolean; plan: Plan; expiresAt: string }>;
  incrementDeviceUsage: (by?: number) => void;
  incrementApiUsage: (by?: number) => void;
}
```

---

### `networkStore.ts`

```typescript
interface NetworkSnapshot {
  devices: Device[];
  routes: FiberRoute[];
  timestamp: number;
}

interface LayerVisibility {
  customers: boolean;
  fiber: boolean;
  devices: boolean;
}

interface NetworkState {
  devices: Device[];
  routes: FiberRoute[];
  alerts: Alert[];
  selectedDeviceId: string | null;
  layerVisibility: LayerVisibility;
  undoHistory: NetworkSnapshot[];   // max 20 entries
  historyIndex: number;
}

interface NetworkActions {
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  deleteDeviceWithChildren: (id: string) => void;   // DFS cascade
  addRoute: (route: FiberRoute) => void;
  updateRoute: (id: string, updates: Partial<FiberRoute>) => void;
  deleteRoute: (id: string) => void;
  selectDevice: (id: string | null) => void;
  toggleLayer: (layer: keyof LayerVisibility) => void;
  undo: () => void;
  pushSnapshot: () => void;         // called before every mutating action
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (id: string, by: string) => void;
  resolveAlert: (id: string) => void;
}
```

> **Cascade delete logic**: `deleteDeviceWithChildren` performs a depth-first traversal of `device.children[]`, collecting all descendant IDs, then filters them out of `state.devices` and removes any routes where `fromDeviceId` or `toDeviceId` is in the deleted set.

---

## 11. Feature Gating System

### Plan Configurations (`src/config/features.ts`)

```typescript
export const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
  [Plan.BASIC]: {
    plan: Plan.BASIC,
    priceMonthly: 49,
    priceAnnual: 470,
    maxDevices: 100,
    maxUsers: 5,
    apiQuotaPerDay: 1000,
    support: 'Community',
    targetAudience: 'Small ISPs / labs',
    features: [
      FeatureFlag.UNIFIED_MAP,
      FeatureFlag.DEVICE_MANAGEMENT,
      FeatureFlag.TOPOLOGY,
      FeatureFlag.MONITORING,
      FeatureFlag.TOOLS,
      FeatureFlag.AUDIT_LOGS,
      FeatureFlag.ALERTS_PAGE,
      FeatureFlag.CSV_EXPORT,
    ],
  },
  [Plan.PROFESSIONAL]: {
    plan: Plan.PROFESSIONAL,
    priceMonthly: 199,
    priceAnnual: 1910,
    maxDevices: 1000,
    maxUsers: 25,
    apiQuotaPerDay: 10000,
    support: 'Email 24 h SLA',
    targetAudience: 'Regional ISPs / SMB telcos',
    features: [
      /* all BASIC features, plus: */
      FeatureFlag.SLA_DASHBOARD,
      FeatureFlag.WORKFLOW_AUTOMATION,
      FeatureFlag.ANALYTICS_ADVANCED,
      FeatureFlag.API_ACCESS,
      FeatureFlag.PDF_EXPORT,
    ],
  },
  [Plan.ENTERPRISE]: {
    plan: Plan.ENTERPRISE,
    priceMonthly: 799,
    priceAnnual: 7670,
    maxDevices: 10000,
    maxUsers: 100,
    apiQuotaPerDay: 100000,
    support: 'Dedicated CSM + 4 h SLA',
    targetAudience: 'National carriers / large ISPs',
    features: [
      /* all PROFESSIONAL features, plus: */
      FeatureFlag.PREDICTIVE_AI,
      FeatureFlag.CAPACITY_PLANNING,
      FeatureFlag.INTEGRATIONS,
      FeatureFlag.WHITE_LABELING,
    ],
  },
  [Plan.ULTRA]: {
    plan: Plan.ULTRA,
    priceMonthly: 2499,
    priceAnnual: 23990,
    maxDevices: -1,           // unlimited
    maxUsers: -1,
    apiQuotaPerDay: -1,
    support: 'White-glove + SLA 1 h',
    targetAudience: 'Tier-1 carriers / global infrastructure',
    features: [
      /* all ENTERPRISE features, plus: */
      FeatureFlag.MULTI_TENANT,
    ],
  },
};
```

### Feature-Plan Map

```typescript
export const FEATURE_PLAN_MAP: Record<FeatureFlag, Plan[]> = {
  [FeatureFlag.UNIFIED_MAP]:         [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.DEVICE_MANAGEMENT]:   [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.TOPOLOGY]:            [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.MONITORING]:          [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.TOOLS]:               [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.AUDIT_LOGS]:          [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.ALERTS_PAGE]:         [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.CSV_EXPORT]:          [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.SLA_DASHBOARD]:       [Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.WORKFLOW_AUTOMATION]: [Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.ANALYTICS_ADVANCED]:  [Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.API_ACCESS]:          [Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.PDF_EXPORT]:          [Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.PREDICTIVE_AI]:       [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.CAPACITY_PLANNING]:   [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.INTEGRATIONS]:        [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.WHITE_LABELING]:      [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.MULTI_TENANT]:        [Plan.ULTRA],
};
```

### `getMinimumPlan` Helper

```typescript
export function getMinimumPlan(flag: FeatureFlag): Plan {
  const order = [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA];
  const eligible = FEATURE_PLAN_MAP[flag];
  return order.find(p => eligible.includes(p)) ?? Plan.ULTRA;
}
```

### `useFeature` Hook

```typescript
// src/hooks/useFeature.ts
import { useAuthStore } from '@/store/authStore';
import { FEATURE_PLAN_MAP } from '@/config/features';

export function useFeature(flag: FeatureFlag): boolean {
  const plan = useAuthStore(s => s.user?.plan ?? Plan.BASIC);
  return FEATURE_PLAN_MAP[flag].includes(plan);
}

// Usage in a page component:
const hasWorkflows = useFeature(FeatureFlag.WORKFLOW_AUTOMATION);
if (!hasWorkflows) return <UpgradePrompt requiredPlan={Plan.PROFESSIONAL} />;
```

---

## 12. Role-Based Access Control Matrix

### Route Access

| Route                       | Super Admin | Admin | Engineer | Operator | Viewer      |
|-----------------------------|:-----------:|:-----:|:--------:|:--------:|:-----------:|
| `/login`                    | ✅          | ✅    | ✅       | ✅       | ✅          |
| `/register`                 | ✅          | ✅    | ✅       | ✅       | ✅          |
| `/` (Map Dashboard)         | ✅          | ✅    | ✅       | ✅       | ✅ (read)   |
| `/devices`                  | ✅          | ✅    | ✅       | ✅       | ✅ (read)   |
| `/topology`                 | ✅          | ✅    | ✅       | ✅       | ✅ (read)   |
| `/monitoring`               | ✅          | ✅    | ✅       | ✅       | ✅ (read)   |
| `/tools`                    | ✅          | ✅    | ✅       | ✅       | ❌          |
| `/analytics`                | ✅          | ✅    | ✅       | ✅       | ✅ (read)   |
| `/workflows`                | ✅          | ✅    | ✅       | ❌       | ❌          |
| `/ai`                       | ✅          | ✅    | ✅       | ✅       | ❌          |
| `/alerts`                   | ✅          | ✅    | ✅       | ✅       | ✅ (read)   |
| `/sla`                      | ✅          | ✅    | ✅       | ❌       | ❌          |
| `/predictive`               | ✅          | ✅    | ✅       | ❌       | ❌          |
| `/capacity`                 | ✅          | ✅    | ✅       | ❌       | ❌          |
| `/audit`                    | ✅          | ✅    | ✅       | ❌       | ❌          |
| `/billing`                  | ✅          | ✅    | ❌       | ❌       | ❌          |
| `/plans`                    | ✅          | ✅    | ❌       | ❌       | ❌          |
| `/usage`                    | ✅          | ✅    | ❌       | ❌       | ❌          |
| `/integrations`             | ✅          | ✅    | ❌       | ❌       | ❌          |
| `/settings/branding`        | ✅          | ✅    | ❌       | ❌       | ❌          |
| `/settings/license`         | ✅          | ✅    | ❌       | ❌       | ❌          |
| `/tenants`                  | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/docs`                     | ✅          | ✅    | ✅       | ✅       | ✅          |
| `/auto-design`              | ✅          | ✅    | ✅       | ✅       | ❌          |
| `/super-admin`              | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/companies`    | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/companies/:id`| ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/users`        | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/billing`      | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/orders`       | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/audit`        | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/access`       | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/alerts`       | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/security`     | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/super-admin/analytics`    | ✅          | ❌    | ❌       | ❌       | ❌          |
| `/tenant-admin/:id`         | ✅          | ✅    | ❌       | ❌       | ❌          |

### Sidebar Navigation Sections per Role

| Sidebar Section              | Super Admin | Admin | Engineer | Operator | Viewer |
|------------------------------|:-----------:|:-----:|:--------:|:--------:|:------:|
| Core NOC (Map, Devices, Topology, Monitoring, Alerts, AI) | ✅ | ✅ | ✅ | ✅ | ✅ (map/devices/topology/monitoring only) |
| Tools & Analytics            | ✅          | ✅    | ✅       | ✅       | ❌     |
| Workflows                    | ✅          | ✅    | ✅       | ❌       | ❌     |
| Enterprise (SLA, Predictive, Capacity, Audit) | ✅ | ✅ | ✅ | ❌ | ❌ |
| Billing & Plans              | ✅          | ✅    | ❌       | ❌       | ❌     |
| Settings (Branding, License) | ✅          | ✅    | ❌       | ❌       | ❌     |
| Tenants                      | ✅          | ❌    | ❌       | ❌       | ❌     |
| Super Admin                  | ✅          | ❌    | ❌       | ❌       | ❌     |
| Docs                         | ✅          | ✅    | ✅       | ✅       | ✅     |
| Auto Design                  | ✅          | ✅    | ✅       | ✅       | ❌     |

### Mobile Bottom Navigation Tabs per Role

| Role         | Tab 1       | Tab 2      | Tab 3    | Tab 4   | Tab 5       |
|--------------|-------------|------------|----------|---------|-------------|
| Super Admin  | Dashboard   | Companies  | Users    | Billing | Alerts      |
| Admin        | Dashboard   | Map        | Devices  | Billing | Alerts      |
| Engineer     | Map         | Devices    | Topology | Tools   | Analytics   |
| Operator     | Dashboard   | Map        | Alerts   | AI      | Monitoring  |
| Viewer       | Map         | Devices    | Topology | Monitoring | —        |

---

## 13. Subscription Tiers

| Feature / Limit                  | BASIC ($49/mo)     | PROFESSIONAL ($199/mo) | ENTERPRISE ($799/mo)  | ULTRA ($2,499/mo)  |
|----------------------------------|--------------------|------------------------|-----------------------|--------------------|
| **Annual Price**                 | $470/yr            | $1,910/yr              | $7,670/yr             | $23,990/yr         |
| **Max Devices**                  | 100                | 1,000                  | 10,000                | Unlimited          |
| **Max Users**                    | 5                  | 25                     | 100                   | Unlimited          |
| **API Quota / Day**              | 1,000              | 10,000                 | 100,000               | Unlimited          |
| **Support**                      | Community          | Email 24 h SLA         | Dedicated CSM + 4 h   | White-glove + 1 h  |
| **Target Audience**              | Small ISPs / labs  | Regional ISPs / SMB    | National carriers     | Tier-1 / Global    |
| Unified Map                      | ✅                 | ✅                     | ✅                    | ✅                 |
| Device Management                | ✅                 | ✅                     | ✅                    | ✅                 |
| Topology Section                 | ✅                 | ✅                     | ✅                    | ✅                 |
| Monitoring                       | ✅                 | ✅                     | ✅                    | ✅                 |
| Tools                            | ✅                 | ✅                     | ✅                    | ✅                 |
| Audit Logs                       | ✅                 | ✅                     | ✅                    | ✅                 |
| Alerts & Notifications Page      | ✅                 | ✅                     | ✅                    | ✅                 |
| CSV Export                       | ✅                 | ✅                     | ✅                    | ✅                 |
| SLA Dashboard                    | ❌                 | ✅                     | ✅                    | ✅                 |
| Workflow Automation              | ❌                 | ✅                     | ✅                    | ✅                 |
| Advanced Analytics               | ❌                 | ✅                     | ✅                    | ✅                 |
| API Access                       | ❌                 | ✅                     | ✅                    | ✅                 |
| PDF Export                       | ❌                 | ✅                     | ✅                    | ✅                 |
| Predictive AI                    | ❌                 | ❌                     | ✅                    | ✅                 |
| Capacity Planning                | ❌                 | ❌                     | ✅                    | ✅                 |
| Integrations Catalog             | ❌                 | ❌                     | ✅                    | ✅                 |
| White-Labeling                   | ❌                 | ❌                     | ✅                    | ✅                 |
| Multi-Tenant Management          | ❌                 | ❌                     | ❌                    | ✅                 |

---

## 14. Seed Credentials

| Email                          | Password          | Role        | Company         | Plan         |
|--------------------------------|-------------------|-------------|-----------------|--------------|
| `superadmin@fibernms.com`      | `SuperAdmin@123`  | Super Admin | FiberNMS HQ     | ULTRA        |
| `admin@fibernms.com`           | `Admin@123`       | Admin (NOC) | Acme Telecom    | ENTERPRISE   |
| `operator@fibernms.com`        | `Operator@123`    | NOC Operator| Acme Telecom    | PROFESSIONAL |

**Notes:**

- `superadmin@fibernms.com` — full access to all 37 routes including the entire Super Admin control panel (`/super-admin/*`), all company and user management, MRR/ARR analytics, RBAC matrix, security dashboard, and system alerts.
- `admin@fibernms.com` — access to all Core NOC, Enterprise (SLA/Predictive/Capacity), Billing & Plans, and Admin sections for Acme Telecom. Cannot access `/super-admin/*` routes.
- `operator@fibernms.com` — access to Core NOC only: Map, Devices, Topology, Monitoring, Alerts, and AI Assistant. No billing, no enterprise modules, no admin controls.

---

*— End of Part 1 (Sections 1–14). Part 2 continues from Section 15 onwards. —*

---

## 15. Network Map — Unified Operations Centre

> **Note:** The Network Map at `/` is the **SINGLE, UNIFIED map** for all network operations. There is **NO** separate Fault Map page — all device management, fiber route drawing, and fault visualization are on one map.

### Map Technology

- **Leaflet.js v1.9** with React-Leaflet
- **Tile layer:** CARTO Voyager tiles (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`) — light background, colorful roads, terrain, labels. **Never black.**
- **Coordinate system:** WGS84 (standard GPS lat/lng)

### Device Placement Workflow

Step-by-step: click **Add Device** in toolbar → choose type → click map → `AddDeviceDialog` pops up → fill name/status → confirm → marker appears. Alternative: **right-click** map.

| Type | Icon Shape | Color | Typical use |
|---|---|---|---|
| OLT | Hexagon | Blue `#3b82f6` | Central office, headend |
| ONT | Square | Green `#22c55e` | Customer premises |
| Splitter | Diamond | Orange `#f97316` | Distribution points |
| Coupler | Circle | Purple `#a855f7` | Fiber junction boxes |
| Router | Star | Red `#ef4444` | Aggregation points |
| JJB | Cross | Yellow `#eab308` | Joint/splice boxes |
| Switch | Triangle | Teal `#14b8a6` | Access switches |

### Device Editing

Click marker → `DeviceDetailPanel` (slide-up mobile / side panel desktop). Shows: name, type, status, tx/rx power, uptime, region, last seen, coordinates.

**Edit button** → `EditDeviceModal`. **Delete button** → confirmation dialog. **Delete with Children** (OLTs/Splitters) → shows count of descendants → DFS cascade deletes all children + their routes.

### Fiber Route Drawing

Draw mode via toolbar → choose route type (**Backbone** thick blue / **Distribution** medium green / **Drop** thin cyan) → snap-to-device toggle → click to set waypoints → double-click to finish → colored Leaflet Polyline. Click route → `RouteEditPanel` (name/type/waypoints/delete).

### Undo / History

Every map action pushes snapshot to `networkStore.undoHistory` (max 20). Toolbar button or `Ctrl+Z` / `Cmd+Z` → restores previous snapshot. History cleared on refresh.

### Fault Visualization (Integrated)

`useFaultVisualization.ts` implements BFS cascade:

- **Device Down:** device turns red (pulsing), BFS through `children[]` → downstream devices turn orange, connecting routes turn red, stats panel updates
- **Cable Cut:** route segment turns red with pulsing/blinking animation at midpoint, downstream devices turn orange

Simulation buttons in toolbar: **"Simulate Device Down"** and **"Simulate Cable Cut"**

### Layer Toggles

`LayerTogglePanel`: color legend with clickable toggles for **Customers**, **Fiber**, **Devices**. Each toggle shows/hides the corresponding Leaflet layer.

### Mobile Map UX

- Fullscreen map constrained between `MobileHeader` and `MobileBottomNav` (CSS: `height: calc(100vh - 56px - 64px)`)
- Map **NEVER** overlaps header or bottom nav
- **FAB menu** bottom-right for toolbar actions
- Device details = swipe-dismissible bottom sheet (not side panel)
- Side drawers for Layer Legend and Stats Panel via FAB sub-buttons

---

## 16. Topology Section — Enterprise Redesign

Completely rebuilt to **Cisco DNA Center / SolarWinds-grade** enterprise level.

### Two Views (switchable via tabs)

#### OLT Sections View (default)

Responsive grid of glassmorphism cards, one per OLT:

- **Header:** OLT name + status badge (`online`=green, `warning`=orange, `faulty`=red)
- **Mini SVG tree:** OLT → Splitter → ONT hierarchy, color-coded, fluid/responsive
- **Summary bar:** Total | Online | Faulty with color highlights
- **Click card** → `TopologyNodePanel`

Grid: 1 col mobile → 2 col tablet → 3 col desktop → 4 col wide desktop

#### Network Graph View

Deep-space dark canvas:

- **OLT nodes:** Hexagon, neon blue glow
- **Splitter nodes:** Diamond, neon orange glow
- **ONT nodes:** Square, neon green glow
- **Edges:** animated data-flow dots travelling along fiber connections
- **Minimap:** bottom-right corner thumbnail + viewport rectangle
- **Hover tooltip:** name, type, uptime%, signal level
- **Click node** → `TopologyNodePanel`

### TopologyNodePanel (4 Tabs)

| Tab | Contents |
|---|---|
| Overview | Uptime ring chart, 7-day sparkline, signal summary KPIs |
| Signal | Tx power (dBm), Rx power (dBm), OSNR (dB), BER trend mini-chart |
| History | Event timeline: reboots, alarm triggers, config changes, maintenance windows |
| Actions | Reboot button, Schedule Maintenance, Create Alert |

Mobile: bottom sheet replaces side panel; spring-animated slide-up.

### Responsive Behavior

- **Mobile:** bottom sheet for device detail, horizontally scrollable toolbars, fluid SVG trees scale to screen width, canvas has scroll/pan gestures
- **Tablet:** 2-column card grid, bottom sheet
- **Desktop:** 3-4 column grid, full canvas with minimap, side panel for details

---

## 17. Alerts & Notifications Page

> Alert banners were **REMOVED** from the Network Map. All alerts live exclusively at `/alerts`.

### Layout

**KPI Summary Bar** (sticky top):
Total Alerts | Critical | High | Medium | Low | Unresolved (all color-coded count badges)

**Severity Filter Tabs:**
All | Critical | High | Medium | Low | Acknowledged | Resolved

**Alert List** (one card per alert):
- Severity badge: `red`=critical, `orange`=high, `yellow`=medium, `blue`=low
- Alert ID + device name
- Alert message / description
- Timestamp (relative "2 min ago", absolute on hover)
- Status: new / acknowledged / resolved
- Quick actions: Acknowledge, Resolve

**Bulk Actions** (when rows selected):
- Acknowledge All Selected
- Resolve All Selected
- Delete Selected

**Real-Time Simulation:**
"Simulate Fault" button → generates new critical/high alert every 5 seconds when active. KPI bar counts update live.

### Slide-Out Detail Panel (click any alert)

Desktop: slides in from right. Mobile: bottom sheet.

Contains: full device info (name/type/region/coordinates), affected customers count, fault type, cascade description, escalation history, resolution notes text input, related alerts.

---

## 18. Network Auto Design Module

AI-assisted network planning at `/auto-design`.

### Module File Structure

```
modules/auto-design/
├── index.tsx              ← AutoDesignPage (module root)
├── types.ts               ← TypeScript interfaces
├── store/index.ts         ← Zustand state store
├── hooks/useAutoDesign.ts ← React Query mutation
└── components/
    ├── MapCanvas.tsx      ← Full-screen Leaflet map + polygon drawing
    ├── DrawControls.tsx   ← Draw/edit/delete floating toolbar
    ├── ParameterPanel.tsx ← Planning form + loading overlay
    └── ResultPanel.tsx    ← Markers + polylines + summary panel
```

### User Workflow

1. Page loads: fullscreen Leaflet map with welcome banner
2. Click **"Draw Area"**: polygon drawing mode — draw boundary on map
3. Parameter form appears (floating top-right / bottom sheet mobile):
   - Subscriber count (number, required, min 1)
   - Network type (FIBER / COAXIAL / LAN)
   - Splitter capacity (1:8 / 1:16 / 1:32)
   - Max distance (meters, required)
   - Manual OLT placement toggle (optional)
4. Click **"Generate Network"**: full-screen loading overlay *"Generating optimized network..."*
5. Result renders on map:
   - **Red OLT markers** at optimal positions
   - **Green Splitter markers** at distribution points
   - **Blue Subscriber markers** at subscriber locations
   - Color-coded connections: `green`=FIBER, `yellow`=COAXIAL, `blue`=LAN
   - Lines animate in sequentially (Framer Motion staggered)
6. Interactions: click marker → popup (type/ID/connected_count), hover → highlight connections
7. Summary panel: total subscribers, splitter count, total cable length (km), estimated cost (USD)
8. **"Export JSON"** → downloads full `NetworkResult` as `.json`
9. **"Reset"** → clears all, returns to idle
10. **"Edit Area"** → back to polygon editing mode

### API Integration

```typescript
// POST /api/network/auto-design/
const payload: AutoDesignParams = {
  polygon: { type: 'Polygon', coordinates: [...] },
  subscriber_count: 500,
  network_type: 'FIBER',
  splitter_capacity: 16,
  max_distance: 2000,
};

// Response: NetworkResult
{
  nodes: [
    { id: 'olt-1', type: 'OLT', lat: 51.5, lng: -0.1, connected_count: 4 },
    { id: 'sp-1', type: 'Splitter', lat: 51.51, lng: -0.09, connected_count: 16 },
  ],
  edges: [
    { from_node: 'olt-1', to_node: 'sp-1', length_m: 450 },
  ],
  summary: {
    total_subscribers: 500,
    splitter_count: 32,
    olt_count: 2,
    total_cable_length_m: 45600,
    estimated_cost_usd: 92000,
  }
}
```

### Zustand Store

```typescript
interface AutoDesignState {
  drawingMode: 'idle' | 'drawing' | 'editing' | 'done';
  polygon: PolygonData | null;
  formValues: Omit<AutoDesignParams, 'polygon'> | null;
  generatedNetwork: NetworkResult | null;
  loading: boolean;
  error: string | null;
}
```

### React Query Mutation

```typescript
export function useAutoDesign() {
  return useMutation({
    mutationFn: (params: AutoDesignParams) =>
      axios.post('/api/network/auto-design/', params).then(r => r.data),
    onSuccess: (data) => useAutoDesignStore.getState().setGeneratedNetwork(data),
    onError: (error) => toast.error('Failed to generate: ' + error.message),
  });
}
```

---

## 19. PWA Support

FiberNMS is installable as a **Progressive Web App** — operators can add it to their home screen and launch it like a native app.

### Web App Manifest (`public/manifest.json`)

```json
{
  "name": "FiberNMS",
  "short_name": "FiberNMS",
  "description": "Optical Fiber Network Management System",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#3b82f6",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Service Worker Strategies (`public/sw.js`)

- **Cache-first:** static assets (JS, CSS, icons, fonts) — check cache → return. If not found → fetch → cache → return.
- **Network-first:** API calls — fetch from network → cache successful responses. Fallback to cache if network fails.
- **Offline app shell:** HTML + core JS/CSS always cached for instant load.

### Installing FiberNMS

| Platform | Steps |
|---|---|
| **iOS (Safari)** | Share → Add to Home Screen → Add |
| **Android (Chrome)** | Three-dot menu → Add to Home Screen → Install (or accept install banner) |
| **Desktop (Chrome/Edge)** | Click install icon in address bar → Install |

---

## 20. Mobile-First Design System

### Layout Switching

`Layout.tsx` uses `useIsMobile()` (`window.innerWidth < 768px`):

```tsx
return isMobile ? (
  <>
    <MobileHeader />          // 56px sticky top
    <main style={{ height: 'calc(100vh - 56px - 64px)', overflowY: 'auto' }}>
      {children}
    </main>
    <MobileBottomNav />        // 64px fixed bottom
  </>
) : (
  <>
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  </>
);
```

### Responsive Breakpoints

| Prefix | Min-width | Target |
|---|---|---|
| (none) | 0px | Mobile (primary design target) |
| `sm:` | 640px | Large phones, small tablets |
| `md:` | 768px | Tablets (triggers layout switch) |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop |
| `2xl:` | 1536px | Ultra-wide |

### Touch Target Standards

All interactive elements: minimum **44×44px** (WCAG 2.1 AAA). Enforced via: `h-11` minimum on buttons, padding on icon buttons, card tap areas extend to full width.

### Bottom Sheet Pattern

```tsx
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 rounded-t-2xl"
>
  <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-4" />
  {content}
</motion.div>
```

### Responsive Chart Containers

All Recharts charts use `ResponsiveContainer`. Charts on mobile are horizontally scrollable via `overflow-x-auto` with `-webkit-overflow-scrolling: touch`.

---

## 21. Real-Time Event Bus

### `lib/eventBus.ts`

```typescript
class EventBus {
  private listeners: Map<string, ((data: unknown) => void)[]> = new Map();
  emit(event: string, data?: unknown) {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }
  on(event: string, handler: (data: unknown) => void) {
    this.listeners.set(event, [...(this.listeners.get(event) ?? []), handler]);
  }
  off(event: string, handler: (data: unknown) => void) {
    this.listeners.set(event, (this.listeners.get(event) ?? []).filter(h => h !== handler));
  }
}
export const eventBus = new EventBus();
```

### Simulated Events (every 30 seconds)

| Event | Payload | Consumers |
|---|---|---|
| `device.status_changed` | `{ deviceId, newStatus }` | Map markers, stats panel |
| `alert.new` | `{ alert: AlertRecord }` | Alerts page KPI bar |
| `network.metric_update` | `{ deviceId, txPower, rxPower }` | Topology node panel |

### Replacing with Real WebSockets

```typescript
const ws = new WebSocket('ws://your-backend/ws/events');
ws.onmessage = (event) => {
  const { type, data } = JSON.parse(event.data);
  eventBus.emit(type, data);  // All component subscriptions receive real events automatically
};
```

---

## 22. Performance Optimizations

| Technique | Implementation | Impact |
|---|---|---|
| **Code splitting** | All 37 pages via `React.lazy()` + `Suspense` (Skeleton loader fallback) | Initial bundle ~60% smaller |
| **React Query caching** | `staleTime: 30s`, `gcTime: 5min`, `retry: 2`, `refetchOnWindowFocus: false` | Eliminates duplicate API calls |
| **Virtualized tables** | TanStack Virtual for 1000+ row device and user tables (`estimateSize: 48px`, `overscan: 5`) | 1000 rows render in <16ms |
| **Map rendering** | `L.DivIcon` SVG markers (no image load latency), layer groups prevent unnecessary re-renders, `useMemo` on device/route collections | Smooth 60fps map pan/zoom |
| **Dynamic imports** | Leaflet and auto-design module excluded from initial bundle | Map-free pages load faster |
| **Zustand selectors** | Minimize re-renders by selecting only needed state slices | Fewer component re-renders |

---

## 23. Connecting to Python FastAPI Backend

### Prerequisites

```bash
pip install fastapi uvicorn sqlalchemy psycopg2 pysnmp netmiko
```

### FastAPI Application Structure

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="FiberNMS API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DeviceBase(BaseModel):
    name: str
    type: str           # OLT | ONT | Splitter | Coupler | Router | JJB | Switch
    status: str         # active | warning | faulty | offline
    lat: float
    lng: float
    region: str
    tx_power: Optional[float] = None
    rx_power: Optional[float] = None
    uptime: Optional[float] = None

class Device(DeviceBase):
    id: str
    last_seen: str

class AutoDesignRequest(BaseModel):
    polygon: dict
    subscriber_count: int
    network_type: str   # FIBER | COAXIAL | LAN
    splitter_capacity: int
    max_distance: int
    manual_olt_placement: bool = False

@app.get("/network/nodes", response_model=List[Device])
async def get_devices(region: Optional[str] = None, status: Optional[str] = None,
                      type: Optional[str] = None, limit: int = 1000, offset: int = 0):
    return db.query_devices(region=region, status=status, type=type, limit=limit, offset=offset)

@app.post("/network/nodes", response_model=Device)
async def create_device(device: DeviceBase):
    return db.create_device(device)

@app.put("/network/nodes/{device_id}", response_model=Device)
async def update_device(device_id: str, updates: DeviceBase):
    return db.update_device(device_id, updates)

@app.delete("/network/nodes/{device_id}")
async def delete_device(device_id: str):
    db.delete_device(device_id)
    return {"message": "Device deleted"}

@app.get("/network/links")
async def get_routes():
    return db.query_routes()

@app.get("/alerts")
async def get_alerts(severity: Optional[str] = None, acknowledged: Optional[bool] = None,
                     resolved: Optional[bool] = None, limit: int = 100):
    return db.query_alerts(severity=severity, acknowledged=acknowledged, resolved=resolved, limit=limit)

@app.post("/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: str, user_id: str):
    return db.acknowledge_alert(alert_id, user_id)

@app.post("/mark-device-down")
async def mark_device_down(request: dict):
    device_id = request["device_id"]
    db.update_device_status(device_id, "faulty")
    affected = db.get_downstream_devices(device_id)
    for d in affected:
        db.update_device_status(d["id"], "warning")
    return {"device_id": device_id, "affected_devices": len(affected)}

@app.post("/mark-cable-cut")
async def mark_cable_cut(request: dict):
    route_id = request["route_id"]
    db.update_route_status(route_id, "cut")
    affected = db.get_downstream_from_route(route_id)
    return {"route_id": route_id, "affected_devices": len(affected["devices"]), "affected_customers": affected["customer_count"]}

@app.get("/topology")
async def get_topology():
    return db.get_topology_tree()

@app.post("/api/network/auto-design/")
async def auto_design_network(request: AutoDesignRequest):
    result = planning_engine.generate(
        polygon=request.polygon,
        subscriber_count=request.subscriber_count,
        network_type=request.network_type,
        splitter_capacity=request.splitter_capacity,
        max_distance=request.max_distance,
    )
    return result

@app.post("/auth/login")
async def login(email: str, password: str):
    user = db.authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_jwt_token(user), "user": user}
```

### SNMP Device Polling

```python
# snmp_poller.py
from pysnmp.hlapi import *
import asyncio

async def poll_device_snmp(host: str, community: str = 'public'):
    results = {}
    for (errorIndication, errorStatus, errorIndex, varBinds) in getCmd(
        SnmpEngine(),
        CommunityData(community),
        UdpTransportTarget((host, 161), timeout=2, retries=1),
        ContextData(),
        ObjectType(ObjectIdentity('1.3.6.1.2.1.1.3.0')),  # sysUpTime
    ):
        if not errorIndication and not errorStatus:
            results['uptime_ticks'] = int(varBinds[0][1])
    return results

async def polling_loop(devices: list, interval: int = 60):
    while True:
        for device in devices:
            metrics = await poll_device_snmp(device['ip'])
            db.update_device_metrics(device['id'], metrics)
        await asyncio.sleep(interval)
```

### SSH Device Management

```python
# ssh_manager.py
from netmiko import ConnectHandler

def get_interface_status(host: str, username: str, password: str, device_type: str = 'cisco_ios'):
    device = {'device_type': device_type, 'host': host, 'username': username, 'password': password, 'timeout': 10}
    with ConnectHandler(**device) as conn:
        output = conn.send_command('show interfaces status')
        return parse_interface_status(output)

def reboot_device(host: str, username: str, password: str):
    device = {'device_type': 'cisco_ios', 'host': host, 'username': username, 'password': password}
    with ConnectHandler(**device) as conn:
        conn.send_command('reload in 1', expect_string='Reload scheduled')
        return {'status': 'reboot_scheduled', 'host': host}
```

### Docker Compose

```yaml
version: '3.9'
services:
  api:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://fibernms:secret@db:5432/fibernms
      - SECRET_KEY=your-secret-key
    depends_on: [db]
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=fibernms
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=fibernms
    volumes: [pgdata:/var/lib/postgresql/data]
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
  frontend:
    build: ./src/frontend
    ports: ["3000:3000"]
    environment:
      - VITE_API_BASE_URL=http://localhost:8000
    depends_on: [api]
volumes:
  pgdata:
```

### Wiring the Frontend

**Step 1:** Set `VITE_API_BASE_URL=http://localhost:8000` in `.env.local`

**Step 2:** Create `src/frontend/src/lib/api.ts` with axios instance + JWT interceptor + 401 → logout redirect

**Step 3:** Replace mock data fetches with React Query queries:
```typescript
useQuery({ queryKey: ['devices'], queryFn: () => api.get('/network/nodes').then(r => r.data), staleTime: 30_000 })
```

**Step 4:** Connect fault simulation buttons to real endpoints:
```typescript
api.post('/mark-device-down', { device_id: selectedDeviceId })
```

**Step 5:** Replace eventBus simulation with real WebSocket:
```typescript
ws.onmessage = ({ data }) => { const { type, d } = JSON.parse(data); eventBus.emit(type, d); }
```

### Full API Endpoint Reference

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/login` | Login, returns JWT | No |
| POST | `/auth/register` | Register company | No |
| POST | `/auth/validate-license` | Validate license key | Yes |
| GET | `/network/nodes` | List devices (filterable) | Yes |
| POST | `/network/nodes` | Create device | Yes (admin+) |
| GET | `/network/nodes/{id}` | Get device | Yes |
| PUT | `/network/nodes/{id}` | Update device | Yes (admin+) |
| DELETE | `/network/nodes/{id}` | Delete device | Yes (admin+) |
| GET | `/network/links` | List fiber routes | Yes |
| POST | `/network/links` | Create route | Yes (admin+) |
| DELETE | `/network/links/{id}` | Delete route | Yes (admin+) |
| GET | `/alerts` | List alerts | Yes |
| POST | `/alerts/{id}/acknowledge` | Acknowledge alert | Yes |
| POST | `/alerts/{id}/resolve` | Resolve alert | Yes |
| POST | `/mark-device-down` | Device down simulation | Yes |
| POST | `/mark-cable-cut` | Cable cut simulation | Yes |
| GET | `/topology` | Full OLT→Splitter→ONT tree | Yes |
| GET | `/sla/records` | SLA records by period | Yes (professional+) |
| GET | `/capacity/records` | Capacity records | Yes (enterprise+) |
| GET | `/analytics/device-health` | 30-day health trend | Yes |
| GET | `/analytics/alert-volume` | Alert volume by day | Yes |
| POST | `/api/network/auto-design/` | Generate network layout | Yes (engineer+) |
| GET | `/admin/companies` | All companies | Yes (superAdmin) |
| GET | `/admin/users` | All users | Yes (superAdmin) |
| GET | `/admin/billing/revenue` | Revenue metrics | Yes (superAdmin) |
| GET | `/audit/logs` | Audit trail | Yes (enterprise+) |

---

## 24. Deployment Guide

### Production Build

```bash
cd src/frontend
pnpm build
# Output: src/frontend/dist/
```

### Vercel

```bash
npm install -g vercel
cd src/frontend
vercel --prod
```

`vercel.json`:
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify

`netlify.toml`:
```toml
[build]
  base = "src/frontend"
  command = "pnpm build"
  publish = "dist"
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker

`Dockerfile` (in `src/frontend/`):
```dockerfile
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

`nginx.conf`:
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

Run:
```bash
docker build -t fibernms-frontend .
docker run -p 3000:80 fibernms-frontend
```

### Production Environment Variables

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
VITE_TILE_URL=https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png
```

---

## 25. Roadmap

### Near-term (Next Release)

- [ ] Forgot password / email recovery
- [ ] Two-factor authentication (TOTP)
- [ ] SSO / SAML integration (UI ready, backend pending)
- [ ] User profile panel (avatar, preferences)
- [ ] Tenant onboarding wizard
- [ ] Redo / history panel for map actions (undo already implemented)

### Medium-term

- [ ] Usage-based billing alerts (threshold notifications)
- [ ] Enhanced drag-and-drop workflow builder
- [ ] Dashboard builder (drag-and-drop widget layout)
- [ ] Plugin marketplace panel
- [ ] Satellite / weather map overlays
- [ ] Real-time alert feed in AI chat context
- [ ] Improved affected customer display on map during faults

### Long-term

- [ ] Digital twin simulation (live network state sync)
- [ ] Network health scoring algorithm
- [ ] Full SNMP/SSH backend integration with real devices
- [ ] Mobile companion app (offline field engineer mode)
- [ ] Changelog page in Documentation section
- [ ] Search bar within in-app Documentation
- [ ] PDF fault report export with customer impact timeline

---

## 26. Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make changes in `src/frontend/src/`
4. Type-check: `pnpm typecheck`
5. Lint: `pnpm fix`
6. Build: `pnpm build`
7. Commit: `git commit -m "feat: describe your change"`
8. Push and open a Pull Request

### Commit Conventions

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `refactor:` | Code changes without behavior change |
| `docs:` | Documentation updates |
| `style:` | UI/CSS changes |
| `test:` | Adding or updating tests |
| `chore:` | Build, config, dependency updates |

### Adding a New Page

1. Create `src/frontend/src/pages/MyPage.tsx`
2. Lazy-import in `App.tsx`: `const MyPage = lazy(() => import('./pages/MyPage'))`
3. Add route to TanStack Router route tree
4. Add navigation entry in `useRoleNav.ts` with role visibility
5. Add feature flag check if plan-gated

---

## 27. License

MIT License

Copyright (c) 2026 FiberNMS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

*Last updated: April 2026 | FiberNMS v2.0 | 37 pages | 4-tier SaaS | 18 feature flags | Unified map | Enterprise topology | Network Auto Design | Python FastAPI integration guide*
