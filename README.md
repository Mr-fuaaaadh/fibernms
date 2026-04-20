# FiberNMS

> **Carrier-grade, SaaS-based Optical Fiber Network Management System (OFNMS)**

FiberNMS is a production-ready frontend for telecom operators, ISPs, and large infrastructure providers — engineered for **100K–1M+ devices**, multi-tenant SaaS, a 4-tier subscription model, real-time monitoring, predictive AI, and a full enterprise Super Admin control panel.

**GitHub:** https://github.com/Mr-fuaaaadh/fibernms

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Features](#2-key-features)
3. [Tech Stack](#3-tech-stack)
4. [Prerequisites](#4-prerequisites)
5. [Getting Started](#5-getting-started)
6. [Seed Credentials](#6-seed-credentials)
7. [Project Directory Tree](#7-project-directory-tree)
8. [Environment Variables](#8-environment-variables)
9. [All Pages and Routes](#9-all-pages-and-routes)
10. [Data Structures and Fields](#10-data-structures-and-fields)
11. [Zustand Stores](#11-zustand-stores)
12. [Mock Data Layer](#12-mock-data-layer)
13. [Feature Gating System](#13-feature-gating-system)
14. [Authentication and Auth Flow](#14-authentication-and-auth-flow)
15. [Map Module](#15-map-module)
16. [Topology Module](#16-topology-module)
17. [Monitoring Module](#17-monitoring-module)
18. [Subscription Tiers](#18-subscription-tiers)
19. [Super Admin System](#19-super-admin-system)
20. [Design System](#20-design-system)
21. [Component Architecture](#21-component-architecture)
22. [Architecture Patterns](#22-architecture-patterns)
23. [Build and Deployment](#23-build-and-deployment)
24. [Customization Guide](#24-customization-guide)
25. [Roadmap](#25-roadmap)
26. [Contributing](#26-contributing)
27. [License](#27-license)

---

## 1. Project Overview

FiberNMS delivers the complete operational stack of a telecom Network Operations Center (NOC) in a modern web application. It is designed to compete with enterprise platforms such as **Nokia NetAct**, **Huawei U2000**, **Cisco DNA Center**, and **Zabbix** in scalability, observability, automation, intelligence, and monetization.

### Capabilities at a Glance

| Category | Capability |
|---|---|
| **Network Operations** | GIS fiber map, device CRUD, multi-layer topology (L1/L2/L3), route drawing |
| **AI and Intelligence** | Predictive fault detection, anomaly risk scoring, AI copilot assistant |
| **Automation** | Visual workflow builder (n8n-style), AI-generated automation |
| **SaaS Monetization** | 4-tier plans, feature gating, billing dashboard, white-labeling, API keys |
| **Enterprise Admin** | Super Admin panel, 54-company management, 1000+ user management |
| **Security** | RBAC + ABAC, session monitoring, suspicious activity detection, MFA tracking |
| **Observability** | SLA dashboards, capacity planning, audit logs, predictive intelligence |
| **Mobile-First** | Bottom nav, swipeable charts, fullscreen map, touch-optimized 44px+ targets |

---

## 2. Key Features

### NOC Operations

- **GIS Fiber Map** — Interactive map with device markers, fiber route drawing, layer toggles (backbone/distribution/drop), and real-time status overlays. Uses CARTO Voyager light tile layer (no API key needed).
- **Device Management** — Full CRUD for OLTs, ONTs, Splitters, JJBs, and Switches with virtualized table, bulk actions, and status filtering.
- **Multi-Layer Topology** — L1 Physical, L2 VLAN switching, and L3 IP topology visualizations with animated data-flow canvas.
- **Real-Time Monitoring** — Signal strength charts, alert feed, KPI cards, WebSocket-simulated live updates.
- **SLA Dashboard** — Per-customer service level tracking with breach detection, MTTR, and MTBF metrics.
- **Predictive Intelligence** — AI risk scores (0–100), failure-type classification, predicted ETA, confidence percentages.
- **Capacity Planning** — Route utilization trends, 90-day growth forecasts, exhaustion warnings.
- **Audit Logs** — Full timeline of user/system/workflow actions with severity classification and CSV export.
- **Tools** — Optical power budget calculator, manual fault trace, OTDR simulation.
- **Workflows** — Visual drag-and-drop n8n-style automation builder.
- **AI Assistant** — NL copilot with real-time network context and predictive suggestions.

### SaaS and Monetization

- **4-Tier Plans** — BASIC ($9/mo), PROFESSIONAL ($49/mo), ENTERPRISE ($199/mo), ULTRA ($999/mo).
- **Feature Gating** — Every premium feature wrapped in `FeatureGate` with blur/lock overlay + upgrade CTA.
- **Billing Dashboard** — Current plan, device/API usage, billing history, upgrade/downgrade flows.
- **License Validation** — License key input with plan activation and expiry warnings.
- **Multi-Tenant Management** — Tenant switcher, data isolation, per-tenant branding (ULTRA).
- **White-Labeling** — Custom logo, theme colors, and domain configuration (ULTRA).
- **API and Integrations** — API key management, webhook configuration, OSS/BSS/CRM connectors.

### Enterprise Super Admin

- **Global Dashboard** — MRR, ARR, total companies, active subscriptions, total devices, system health.
- **Company Registry** — Full CRUD for 54+ telecom companies across 5 regions.
- **Global User Management** — 1000+ users across all tenants with invite, bulk import, session tracking.
- **Billing and Orders** — MRR/ARR/churn metrics, orders table, invoice PDF export, GST/VAT tax details.
- **Access Control** — RBAC + ABAC permission matrix with toggleable role/attribute rules.
- **Platform Audit** — Global timeline across all tenants with CSV export.
- **Security Dashboard** — Login attempts, IP tracking, suspicious activity detection, MFA status.
- **System Alerts** — Platform-level outage and API failure notifications.
- **Global Analytics** — Revenue trends, device growth, usage heatmaps, top customers.

### Mobile-First Responsive Design

- **Bottom Navigation** — Dashboard, Companies, Users, Billing, Alerts tabs on mobile.
- **Adaptive Layouts** — Card views on mobile, virtualized tables on desktop.
- **Fullscreen Map** — Floating action buttons, bottom sheet device details on mobile.
- **Touch UX** — All interactive elements ≥44px, smooth scrolling, swipeable charts.
- **Map Overlap Fix** — Map constrained between header (56px) and bottom nav (64px) on mobile.

---

## 3. Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | React | 19 | UI rendering |
| **Language** | TypeScript | 5 (strict) | Type safety |
| **Build Tool** | Vite | 6 | Fast dev server + build |
| **Routing** | TanStack Router | v1 | Type-safe routing + auth guards |
| **Data Fetching** | TanStack React Query | v5 | Server state + caching |
| **State Management** | Zustand | v5 | Global client state + localStorage persistence |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS |
| **Color System** | OKLCH Design Tokens | — | Perceptually uniform color tokens |
| **UI Components** | Radix UI + shadcn/ui | — | Accessible headless components |
| **Icons** | Lucide React + React Icons | — | SVG icon sets |
| **Charts** | Recharts | v2 | SVG-based responsive charts |
| **Maps** | React Leaflet + Leaflet | v4/1.9 | Interactive GIS map |
| **Map Tiles** | CARTO Voyager | — | Light colorful tile layer (no API key) |
| **Animation** | Motion (Framer Motion v11+) | v11 | Entrance animations and transitions |
| **Forms** | React Hook Form + Zod | — | Performant form validation |
| **Theme** | next-themes | — | Dark/light theme switching |
| **Linting** | Biome | v1 | Fast lint + format |
| **Backend** | Motoko (Internet Computer) | — | Scaffold (extendable) |

---

## 4. Prerequisites

| Tool | Minimum Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime |
| **pnpm** | 8+ | Package manager |
| **Git** | 2.x | Version control |

Install pnpm if needed:

```bash
npm install -g pnpm
```

---

## 5. Getting Started

### Clone and Install

```bash
git clone https://github.com/Mr-fuaaaadh/fibernms.git
cd fibernms
pnpm install
```

### Start Development Server

```bash
cd src/frontend
pnpm dev
# App available at http://localhost:5173
```

### Build for Production

```bash
cd src/frontend
pnpm build
# Output: src/frontend/dist/
```

### Type Check

```bash
cd src/frontend
pnpm typecheck
```

### Lint and Auto-Fix

```bash
cd src/frontend
pnpm check    # lint check
pnpm fix      # auto-fix
```

### Install Dependencies (Offline)

```bash
cd src/frontend
pnpm install --prefer-offline
```

---

## 6. Seed Credentials

Use these accounts to explore the platform without registering:

| Account | Email | Password | Plan | Role | Access |
|---|---|---|---|---|---|
| **Super Admin** | `superadmin@fibernms.com` | `SuperAdmin@123` | ULTRA | `superAdmin` | All 37+ pages including Super Admin control panel |
| **Company Admin** | `admin@fibernms.com` | `Admin@123` | ENTERPRISE | `admin` | All 23 NOC + SaaS pages |
| **NOC Operator** | `operator@fibernms.com` | `Operator@123` | PROFESSIONAL | `operator` | NOC pages; ENTERPRISE+ features gated |

### Demo License Keys

Enter these on the `/settings/license` page to switch plan tiers:

| Key | Activates Plan |
|---|---|
| `FNMS-BASIC-2026-DEMO` | BASIC (1K devices, $9/mo) |
| `FNMS-PRO-2026-DEMO` | PROFESSIONAL (10K devices, $49/mo) |
| `FNMS-ENT-2026-DEMO-XXXXXX` | ENTERPRISE (100K devices, $199/mo) |
| `FNMS-ULTRA-2026-DEMO` | ULTRA (unlimited, $999/mo) |

---

## 7. Project Directory Tree

```
app/
├── src/
│   ├── frontend/                         # React + TypeScript + Vite frontend
│   │   ├── public/
│   │   │   └── assets/
│   │   │       ├── fonts/                # Self-hosted WOFF2 fonts
│   │   │       │   ├── GeistMono.woff2
│   │   │       │   ├── GeneralSans.woff2
│   │   │       │   └── JetBrainsMono.woff2
│   │   │       └── images/               # Generated images and placeholders
│   │   │
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── features.ts           # Feature flags, plan configs, plan-feature map
│   │   │   │
│   │   │   ├── store/                    # Zustand global state stores
│   │   │   │   ├── authStore.ts          # Auth state: login/register/logout, localStorage
│   │   │   │   ├── subscriptionStore.ts  # Plan, usage quotas, license key, expiry
│   │   │   │   └── networkStore.ts       # Devices, routes, alerts, SLA, predictive, audit
│   │   │   │
│   │   │   ├── types/                    # Shared TypeScript interfaces
│   │   │   │   ├── network.ts            # Device, FiberRoute, Alert, SLARecord, etc.
│   │   │   │   ├── superAdmin.ts         # Company, AdminUser, Order, Invoice, etc.
│   │   │   │   └── subscription.ts       # Plan, FeatureFlag, PlanConfig, BillingRecord
│   │   │   │
│   │   │   ├── data/                     # Mock data generators
│   │   │   │   ├── mockData.ts           # 1000+ devices, 500+ alerts, routes, SLA, audit
│   │   │   │   ├── superAdminMockData.ts # 54 companies, 1000+ users, orders, invoices
│   │   │   │   └── billingMockData.ts    # MRR/ARR, churn, revenue trends, tax data
│   │   │   │
│   │   │   ├── hooks/                    # Custom React hooks
│   │   │   │   ├── useFeature.ts         # Feature flag + subscription hooks
│   │   │   │   ├── useAuth.ts            # Auth helpers (isAuthenticated, isSuperAdmin)
│   │   │   │   └── use-mobile.tsx        # Responsive breakpoint detection (<=768px)
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts              # cn(), formatBytes(), formatCurrency()
│   │   │   │   └── eventBus.ts           # Real-time event emitter (WebSocket simulation)
│   │   │   │
│   │   │   ├── components/               # Shared UI components
│   │   │   │   ├── Layout.tsx            # Shell: Sidebar+Navbar (desktop) or Header+BottomNav (mobile)
│   │   │   │   ├── Navbar.tsx            # Top bar: theme toggle, user menu, alert bell
│   │   │   │   ├── Sidebar.tsx           # Nav links, plan badge, Super Admin section
│   │   │   │   ├── MobileHeader.tsx      # Sticky 56px mobile header + hamburger
│   │   │   │   ├── MobileBottomNav.tsx   # Fixed 64px bottom navigation bar
│   │   │   │   ├── MobileNavDrawer.tsx   # Full-page drawer with all 37+ nav links
│   │   │   │   ├── CommandPalette.tsx    # Global CMD+K search (devices, alerts, pages)
│   │   │   │   ├── GlassCard.tsx         # Glassmorphism card primitive
│   │   │   │   ├── DeviceIcon.tsx        # Device type icon resolver
│   │   │   │   ├── StatusBadge.tsx       # Colored status badge component
│   │   │   │   │
│   │   │   │   ├── subscription/         # Feature gating components
│   │   │   │   │   ├── FeatureGate.tsx
│   │   │   │   │   ├── LockedFeatureOverlay.tsx
│   │   │   │   │   ├── PlanBadge.tsx
│   │   │   │   │   ├── PlanComparisonModal.tsx
│   │   │   │   │   ├── UpgradeCTA.tsx
│   │   │   │   │   └── UsageProgressBar.tsx
│   │   │   │   │
│   │   │   │   ├── map/                  # Map-specific components
│   │   │   │   │   ├── AddDeviceDialog.tsx
│   │   │   │   │   ├── DeviceDetailPanel.tsx
│   │   │   │   │   ├── DeviceMarker.tsx
│   │   │   │   │   ├── DrawToolbar.tsx
│   │   │   │   │   ├── EditDeviceModal.tsx
│   │   │   │   │   ├── LayerTogglePanel.tsx
│   │   │   │   │   └── RouteEditPanel.tsx
│   │   │   │   │
│   │   │   │   ├── topology/             # Topology canvas components
│   │   │   │   │   ├── OLTSectionCard.tsx
│   │   │   │   │   ├── OLTSectionMiniTree.tsx
│   │   │   │   │   ├── TopologyGraph.tsx
│   │   │   │   │   └── TopologyNodePanel.tsx
│   │   │   │   │
│   │   │   │   ├── monitoring/           # Monitoring chart components
│   │   │   │   │   ├── StatCard.tsx
│   │   │   │   │   ├── StatusPieChart.tsx
│   │   │   │   │   ├── SignalLineChart.tsx
│   │   │   │   │   └── AlertsPanel.tsx
│   │   │   │   │
│   │   │   │   ├── devices/              # Device management components
│   │   │   │   │   ├── DeviceTable.tsx
│   │   │   │   │   ├── DeviceFilters.tsx
│   │   │   │   │   └── AddDeviceModal.tsx
│   │   │   │   │
│   │   │   │   ├── tools/               # NOC tools components
│   │   │   │   │   ├── PowerCalculator.tsx
│   │   │   │   │   └── FaultDetectionPanel.tsx
│   │   │   │   │
│   │   │   │   └── ui/                  # shadcn/ui base components (do not modify)
│   │   │   │
│   │   │   ├── pages/                    # One file per route (all lazy-loaded)
│   │   │   │   ├── Login.tsx             # /login
│   │   │   │   ├── Register.tsx          # /register
│   │   │   │   ├── MapDashboard.tsx      # /
│   │   │   │   ├── Devices.tsx           # /devices
│   │   │   │   ├── Topology.tsx          # /topology
│   │   │   │   ├── Monitoring.tsx        # /monitoring
│   │   │   │   ├── Tools.tsx             # /tools
│   │   │   │   ├── Analytics.tsx         # /analytics
│   │   │   │   ├── Workflows.tsx         # /workflows
│   │   │   │   ├── AIAssistant.tsx       # /ai
│   │   │   │   ├── SLADashboard.tsx      # /sla
│   │   │   │   ├── PredictiveIntelligence.tsx  # /predictive
│   │   │   │   ├── CapacityPlanning.tsx  # /capacity
│   │   │   │   ├── AuditLogs.tsx         # /audit
│   │   │   │   ├── Billing.tsx           # /billing
│   │   │   │   ├── UsageAnalytics.tsx    # /usage
│   │   │   │   ├── Plans.tsx             # /plans
│   │   │   │   ├── Integrations.tsx      # /integrations
│   │   │   │   ├── Branding.tsx          # /settings/branding
│   │   │   │   ├── License.tsx           # /settings/license
│   │   │   │   ├── Tenants.tsx           # /tenants
│   │   │   │   └── Docs.tsx              # /docs (renders this README)
│   │   │   │
│   │   │   └── pages/admin/              # Super Admin only (role: superAdmin)
│   │   │       ├── SuperAdminDashboard.tsx   # /super-admin
│   │   │       ├── CompanyManagement.tsx     # /super-admin/companies
│   │   │       ├── CompanyDetail.tsx         # /super-admin/companies/:companyId
│   │   │       ├── UsageLimits.tsx           # /super-admin/usage
│   │   │       ├── GlobalUserManagement.tsx  # /super-admin/users
│   │   │       ├── GlobalBilling.tsx         # /super-admin/billing
│   │   │       ├── OrdersInvoices.tsx        # /super-admin/orders
│   │   │       ├── PlatformAudit.tsx         # /super-admin/audit
│   │   │       ├── AccessControl.tsx         # /super-admin/access
│   │   │       ├── SystemAlerts.tsx          # /super-admin/alerts
│   │   │       ├── SecurityDashboard.tsx     # /super-admin/security
│   │   │       ├── GlobalAnalytics.tsx       # /super-admin/analytics
│   │   │       └── TenantAdminPanel.tsx      # /tenant-admin/:companyId
│   │   │
│   │   ├── index.css                     # OKLCH tokens, dark/light themes, utilities
│   │   ├── tailwind.config.js            # Theme extensions, keyframes, animations
│   │   └── index.html                    # App entry point
│   │
│   └── backend/
│       └── main.mo                       # Motoko backend scaffold (Internet Computer)
│
├── DESIGN.md                             # Design system brief
├── caffeine.toml                         # Caffeine platform config
├── package.json                          # Workspace root
├── pnpm-workspace.yaml                   # pnpm workspace config
├── README.md                             # This file
└── tsconfig.json                         # TypeScript project references
```

---

## 8. Environment Variables

FiberNMS runs entirely client-side with mock data — no `.env` file is required for development.

For production integration with a real backend:

```bash
# src/frontend/.env.local (not committed)
VITE_API_BASE_URL=https://api.your-nms.com
VITE_TENANT_ID=your-default-tenant-id
```

> The current implementation uses **CARTO Voyager** open tile layers which require no API key.

---

## 9. All Pages and Routes

### Public Routes

| Route | Page | File | Description |
|---|---|---|---|
| `/login` | Login | `pages/Login.tsx` | Username/password login with dark/light theme toggle |
| `/register` | Register | `pages/Register.tsx` | 5-step enterprise registration form |

### Protected NOC Routes

| Route | Page | File | Min Plan | Description |
|---|---|---|---|---|
| `/` | Map Dashboard | `pages/MapDashboard.tsx` | BASIC | GIS fiber map — device markers, route drawing, layer toggles |
| `/devices` | Devices | `pages/Devices.tsx` | BASIC | Full device CRUD with virtualized table and bulk actions |
| `/topology` | Topology | `pages/Topology.tsx` | PROFESSIONAL | Multi-layer L1/L2/L3 graph canvas with OLT section view |
| `/monitoring` | Monitoring | `pages/Monitoring.tsx` | BASIC | Real-time signal metrics, alert feed, KPI charts |
| `/tools` | Tools | `pages/Tools.tsx` | BASIC | Optical power calculator, OTDR simulation, fault trace |
| `/analytics` | Analytics | `pages/Analytics.tsx` | PROFESSIONAL | Network performance charts, trend analysis |
| `/workflows` | Workflows | `pages/Workflows.tsx` | ENTERPRISE | Visual n8n-style automation builder |
| `/ai` | AI Assistant | `pages/AIAssistant.tsx` | ENTERPRISE | NL copilot with network context |
| `/sla` | SLA Dashboard | `pages/SLADashboard.tsx` | ENTERPRISE | Per-customer SLA metrics, breach alerts, MTTR/MTBF |
| `/predictive` | Predictive Intelligence | `pages/PredictiveIntelligence.tsx` | ENTERPRISE | AI risk scores, failure prediction, confidence % |
| `/capacity` | Capacity Planning | `pages/CapacityPlanning.tsx` | ENTERPRISE | Route utilization, growth forecasts, exhaustion warnings |
| `/audit` | Audit Logs | `pages/AuditLogs.tsx` | ENTERPRISE | Timeline audit log with filters and CSV export |

### Protected SaaS Routes

| Route | Page | File | Min Plan | Description |
|---|---|---|---|---|
| `/billing` | Billing | `pages/Billing.tsx` | BASIC | Current plan, device/API usage bars, billing history |
| `/plans` | Plans | `pages/Plans.tsx` | BASIC | Side-by-side 4-tier feature comparison with upgrade flow |
| `/usage` | Usage Analytics | `pages/UsageAnalytics.tsx` | BASIC | Device growth, alert volume, data usage, API call charts |
| `/integrations` | Integrations | `pages/Integrations.tsx` | ENTERPRISE | API key management, webhook config, OSS/BSS connectors |
| `/settings/branding` | Branding | `pages/Branding.tsx` | ULTRA | White-label logo, colors, domain |
| `/settings/license` | License | `pages/License.tsx` | BASIC | License key input, plan activation, expiry warnings |
| `/tenants` | Tenants | `pages/Tenants.tsx` | ULTRA | Multi-tenant switcher, create tenants, data isolation |
| `/docs` | Documentation | `pages/Docs.tsx` | BASIC | In-app markdown README renderer |
| `/tenant-admin/:companyId` | Tenant Admin | `pages/admin/TenantAdminPanel.tsx` | Admin | Per-company operator view: users, usage, billing |

### Super Admin Routes

Requires `role: "superAdmin"`. Non-super-admin users are redirected to `/`.

| Route | Page | File | Description |
|---|---|---|---|
| `/super-admin` | Global Dashboard | `admin/SuperAdminDashboard.tsx` | MRR, ARR, companies, subscriptions, devices, system health |
| `/super-admin/companies` | Company Registry | `admin/CompanyManagement.tsx` | Manage 54+ telecom companies — create, edit, suspend, activate, delete |
| `/super-admin/companies/:companyId` | Company Detail | `admin/CompanyDetail.tsx` | Company profile, usage stats, billing history, activity timeline |
| `/super-admin/usage` | Usage and Limits | `admin/UsageLimits.tsx` | Per-company progress bars for devices, API, data, alerts |
| `/super-admin/users` | Global Users | `admin/GlobalUserManagement.tsx` | 1000+ users, filter, invite, session tracking, force logout |
| `/super-admin/billing` | Global Billing | `admin/GlobalBilling.tsx` | MRR, ARR, churn rate, revenue by plan and region |
| `/super-admin/orders` | Orders and Invoices | `admin/OrdersInvoices.tsx` | Full orders table, invoice PDF export, GST/VAT breakdowns |
| `/super-admin/audit` | Platform Audit | `admin/PlatformAudit.tsx` | Global audit timeline across all tenants, CSV export |
| `/super-admin/access` | Access Control | `admin/AccessControl.tsx` | RBAC + ABAC permission matrix — toggle per role and attribute |
| `/super-admin/alerts` | System Alerts | `admin/SystemAlerts.tsx` | Platform-level outage, API failure, error rate notifications |
| `/super-admin/security` | Security Dashboard | `admin/SecurityDashboard.tsx` | Login attempts, suspicious activity, IP tracking, MFA status |
| `/super-admin/analytics` | Global Analytics | `admin/GlobalAnalytics.tsx` | Revenue trends, device growth, usage heatmaps, top customers |

---

## 10. Data Structures and Fields

### 10.1 Network Types (network.ts)

#### Device

Represents a physical network device in the fiber infrastructure.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique device identifier (e.g., `OLT-IND-001`) |
| `name` | `string` | Yes | Human-readable device name |
| `type` | `DeviceType` | Yes | `"OLT" or "ONT" or "Splitter" or "JJB" or "Switch"` |
| `lat` | `number` | Yes | Latitude coordinate (WGS84) |
| `lng` | `number` | Yes | Longitude coordinate (WGS84) |
| `ports` | `number` | Yes | Number of physical ports |
| `status` | `DeviceStatus` | Yes | `"active" or "faulty" or "warning"` |
| `connectedTo` | `string[]` | Yes | Array of connected device IDs |
| `location` | `string` | No | Human-readable location (e.g., "Mumbai, India") |
| `signalStrength` | `number` | No | Signal strength in dBm (e.g., -14.2) |
| `uptime` | `number` | No | Uptime percentage (0–100) |
| `region` | `string` | No | Geographic region label (e.g., "India") |

Device types:
- `OLT` — Optical Line Terminal: head-end aggregation device
- `ONT` — Optical Network Terminal: subscriber-side termination
- `Splitter` — Passive optical splitter (1:2, 1:4, 1:8, 1:16, 1:32)
- `JJB` — Joint Junction Box: fiber splice point
- `Switch` — Active Ethernet/MPLS switching node

#### FiberRoute

Represents a fiber cable segment on the map.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique route identifier |
| `name` | `string` | Yes | Human-readable route name |
| `type` | `RouteType` | Yes | `"backbone" or "distribution" or "drop"` |
| `waypoints` | `{ lat: number; lng: number }[]` | Yes | Ordered array of GeoJSON-compatible coordinates |
| `distanceKm` | `number` | Yes | Total cable length in kilometers |
| `status` | `DeviceStatus` | Yes | `"active" or "faulty" or "warning"` |

Route type colors on map: backbone = `#00e5ff` (cyan), distribution = `#448aff` (blue), drop = `#69ff47` (green).

#### Alert

Represents a network fault or event notification.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique alert ID |
| `deviceId` | `string` | Yes | ID of the device that triggered the alert |
| `deviceName` | `string` | Yes | Name of the affected device |
| `issueType` | `string` | Yes | Issue category (e.g., "Signal Loss", "Port Failure") |
| `timestamp` | `number` | Yes | Unix timestamp (ms) when alert was generated |
| `severity` | `AlertSeverity` | Yes | `"critical" or "warning" or "info"` |
| `resolved` | `boolean` | No | Whether the alert has been acknowledged |

#### LayerVisibility

Controls which fiber route layers are visible on the map.

| Field | Type | Description |
|---|---|---|
| `backbone` | `boolean` | Show/hide backbone routes |
| `distribution` | `boolean` | Show/hide distribution routes |
| `drop` | `boolean` | Show/hide drop routes |

#### SLARecord

Per-customer service level agreement tracking.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique SLA record ID |
| `customerId` | `string` | Customer company ID |
| `customerName` | `string` | Customer company name |
| `region` | `string` | Geographic service region |
| `latency` | `number` | Current latency in ms |
| `packetLoss` | `number` | Current packet loss percentage |
| `uptime` | `number` | Measured uptime percentage (0–100) |
| `status` | `SLAStatus` | `"compliant" or "warning" or "breach"` |
| `lastChecked` | `number` | Unix timestamp of last SLA evaluation |

#### PredictiveAlert

AI-generated predictive fault intelligence record.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique predictive alert ID |
| `deviceId` | `string` | Device at risk |
| `deviceName` | `string` | Human-readable device name |
| `riskScore` | `number` | Risk score 0–100 (100 = imminent failure) |
| `failureType` | `string` | `"fiber-cut" or "signal-degradation" or "device-failure"` |
| `predictedETA` | `number` | Hours until predicted failure |
| `status` | `string` | `"active" or "resolved"` |

#### AuditLog

Records every action performed in the NOC system.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique audit log ID |
| `timestamp` | `number` | Unix timestamp (ms) |
| `userId` | `string` | Actor user ID |
| `userName` | `string` | Actor display name |
| `action` | `string` | Action description |
| `actionType` | `string` | `"device-change" or "user-action" or "workflow-execution" or "system"` |
| `targetId` | `string` | ID of the affected entity |
| `targetName` | `string` | Name of the affected entity |
| `details` | `string` | Additional context or diff |
| `status` | `string` | `"success" or "failure"` |

#### CapacityRecord

Capacity utilization and forecasting for fiber routes.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique capacity record ID |
| `routeId` | `string` | Associated fiber route ID |
| `routeName` | `string` | Human-readable route name |
| `region` | `string` | Geographic region |
| `currentUtilization` | `number` | Current utilization percentage (0–100) |
| `maxCapacity` | `number` | Maximum capacity in Gbps |
| `forecastData` | `{ month: string; utilization: number }[]` | Monthly utilization forecast |
| `exhaustionMonths` | `number` | Estimated months until capacity exhaustion |

#### NetworkLayer

Controls multi-layer topology visualization state.

| Field | Type | Description |
|---|---|---|
| `type` | `"L1" or "L2" or "L3"` | OSI layer type |
| `visible` | `boolean` | Whether this layer is rendered |
| `name` | `string` | Display name (e.g., "Physical (Fiber)") |

#### CommandPaletteItem

Search result item for the global CMD+K command palette.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique item ID |
| `type` | `string` | `"device" or "alert" or "workflow" or "route" or "sla" or "page"` |
| `title` | `string` | Primary display label |
| `subtitle` | `string` | Secondary description |
| `href` | `string` | Navigation target URL |
| `icon` | `string` | Icon name identifier |

---

### 10.2 Super Admin Types (superAdmin.ts)

#### Company

A telecom company (tenant) registered on the FiberNMS platform.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique company ID |
| `name` | `string` | Yes | Company display name |
| `domain` | `string` | Yes | Primary domain (e.g., `acmetelecom.com`) |
| `subdomain` | `string` | Yes | Platform subdomain (e.g., `acme.fibernms.com`) |
| `region` | `CompanyRegion` | Yes | `"India" or "US" or "EU" or "APAC" or "MENA"` |
| `plan` | `CompanyPlan` | Yes | `"BASIC" or "PROFESSIONAL" or "ENTERPRISE" or "ULTRA"` |
| `status` | `CompanyStatus` | Yes | `"active" or "suspended" or "trial" or "expired"` |
| `createdAt` | `string` | Yes | ISO date string of account creation |
| `logoUrl` | `string` | No | Company logo URL |
| `contactEmail` | `string` | Yes | Primary contact email address |
| `contactPhone` | `string` | Yes | Primary contact phone number |
| `address` | `string` | No | Physical address |
| `country` | `string` | Yes | Country name |
| `devicesUsed` | `number` | Yes | Current device count |
| `devicesLimit` | `number` | Yes | Maximum allowed devices for current plan |
| `apiUsed` | `number` | Yes | API calls consumed this billing cycle |
| `apiLimit` | `number` | Yes | Maximum API calls for current plan |
| `dataUsedGB` | `number` | Yes | Data storage used in GB |
| `dataLimitGB` | `number` | Yes | Data storage limit in GB |
| `alertsUsed` | `number` | Yes | Alerts generated this period |
| `alertsLimit` | `number` | Yes | Maximum alerts for current plan |
| `activeUsers` | `number` | Yes | Count of active user accounts |
| `totalAlerts` | `number` | Yes | All-time alert count |
| `mrr` | `number` | Yes | Monthly recurring revenue from this company (USD) |
| `isSoftDeleted` | `boolean` | No | Soft-delete flag |
| `deletedAt` | `string` | No | Soft-delete timestamp |
| `lastActiveAt` | `string` | Yes | Last platform activity timestamp |
| `trialEndsAt` | `string` | No | Trial expiry date |

#### AdminUser

A user account within any company on the platform.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique user ID |
| `companyId` | `string` | ID of the company this user belongs to |
| `companyName` | `string` | Company display name |
| `name` | `string` | Full display name |
| `email` | `string` | Login email address |
| `role` | `AdminUserRole` | `"Admin" or "Network Engineer" or "NOC Operator" or "Viewer"` |
| `status` | `AdminUserStatus` | `"active" or "disabled"` |
| `lastLogin` | `string` | ISO timestamp of most recent login |
| `assignedRegion` | `string` | Geographic region this user manages |
| `mfaEnabled` | `boolean` | Whether MFA is configured for this user |
| `activeSessions` | `Session[]` | Array of currently active sessions |

#### Session

An active login session for a user.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique session ID |
| `userId` | `string` | Owner user ID |
| `loginTime` | `string` | Session start ISO timestamp |
| `lastActivity` | `string` | Last request ISO timestamp |
| `deviceInfo` | `string` | User agent / device description |
| `ipAddress` | `string` | Client IP address |
| `isActive` | `boolean` | Whether session is currently alive |

#### Order

A subscription order (purchase or renewal).

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique order ID |
| `companyId` | `string` | Ordering company ID |
| `companyName` | `string` | Company display name |
| `plan` | `CompanyPlan` | Plan purchased |
| `price` | `number` | Order price in USD |
| `billingCycle` | `BillingCycle` | `"monthly" or "yearly"` |
| `status` | `OrderStatus` | `"paid" or "pending" or "failed"` |
| `createdAt` | `string` | Order creation ISO timestamp |
| `dueDate` | `string` | Payment due date |
| `nextRenewal` | `string` | Next renewal date |
| `paidAt` | `string` | Payment confirmation timestamp |

#### InvoiceLineItem

A single line on an invoice.

| Field | Type | Description |
|---|---|---|
| `description` | `string` | Service description |
| `quantity` | `number` | Quantity |
| `unitPrice` | `number` | Price per unit in USD |
| `total` | `number` | Line total (quantity times unitPrice) |

#### Invoice

A tax invoice issued to a company.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique invoice ID |
| `orderId` | `string` | Associated order ID |
| `companyId` | `string` | Recipient company ID |
| `companyName` | `string` | Company display name |
| `invoiceNumber` | `string` | Sequential invoice number (e.g., `INV-2026-00142`) |
| `amount` | `number` | Subtotal before tax (USD) |
| `tax` | `number` | Tax amount (USD) |
| `taxType` | `string` | `"GST" or "VAT" or "NONE"` |
| `taxRate` | `number` | Tax rate percentage (e.g., 18 for 18% GST) |
| `subtotal` | `number` | Pre-tax subtotal |
| `total` | `number` | Final invoice total |
| `status` | `string` | `"paid" or "pending" or "overdue" or "failed"` |
| `createdAt` | `string` | Invoice issue ISO timestamp |
| `dueDate` | `string` | Payment due date |
| `paidAt` | `string` | Payment confirmation timestamp |
| `lineItems` | `InvoiceLineItem[]` | Array of invoice line items |
| `region` | `CompanyRegion` | Company region (determines tax type) |

Tax rules by region: India = GST 18%, EU = VAT 20%, US/APAC/MENA = No tax.

#### AuditEvent

A Super Admin-level audit trail entry.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique audit event ID |
| `userId` | `string` | Actor user ID |
| `userEmail` | `string` | Actor email |
| `companyId` | `string` | Associated company ID |
| `companyName` | `string` | Company display name |
| `action` | `string` | Action description |
| `targetType` | `string` | Entity type (e.g., "User", "Company", "Invoice") |
| `targetId` | `string` | Affected entity ID |
| `targetName` | `string` | Affected entity name |
| `details` | `string` | Additional context |
| `timestamp` | `string` | ISO timestamp |
| `severity` | `AuditSeverity` | `"info" or "warning" or "critical"` |
| `category` | `AuditCategory` | `"user" or "company" or "billing" or "device" or "auth"` |
| `ipAddress` | `string` | Actor IP address |

#### SecurityEvent

A security-relevant event (login attempt, suspicious activity).

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique security event ID |
| `userId` | `string` | Associated user ID (if authenticated) |
| `userEmail` | `string` | Associated email |
| `companyId` | `string` | Associated company |
| `ipAddress` | `string` | Source IP address |
| `geoLocation` | `string` | Geo-resolved location (e.g., "Mumbai, India") |
| `eventType` | `string` | Type (e.g., "failed_login", "suspicious_ip") |
| `success` | `boolean` | Whether authentication succeeded |
| `timestamp` | `string` | ISO timestamp |
| `failedAttempts` | `number` | Consecutive failed attempts from this IP |
| `isBlocked` | `boolean` | Whether this IP is currently blocked |
| `severity` | `AlertSeverity` | `"critical" or "high" or "medium" or "low"` |

#### SystemAlert

A platform-level alert visible only to Super Admins.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique system alert ID |
| `type` | `string` | Alert type string |
| `severity` | `AlertSeverity` | `"critical" or "high" or "medium" or "low"` |
| `title` | `string` | Short alert headline |
| `message` | `string` | Detailed alert message |
| `affectedCompanies` | `number` | Count of impacted tenants |
| `timestamp` | `string` | ISO timestamp when alert triggered |
| `isResolved` | `boolean` | Whether the issue is resolved |
| `resolvedAt` | `string` | Resolution ISO timestamp |
| `category` | `SystemAlertCategory` | `"outage" or "error_rate" or "api" or "resource"` |
| `affectedService` | `string` | Impacted service name |
| `status` | `SystemAlertStatus` | `"active" or "resolved"` |

#### UsageMetric

Per-company quota utilization snapshot.

| Field | Type | Description |
|---|---|---|
| `companyId` | `string` | Company ID |
| `companyName` | `string` | Company display name |
| `plan` | `CompanyPlan` | Current plan |
| `devices` | `{ used: number; limit: number }` | Device quota usage |
| `api` | `{ used: number; limit: number }` | API call quota usage |
| `data` | `{ used: number; limit: number }` | Data quota usage |
| `alerts` | `{ used: number; limit: number }` | Alert quota usage |

#### RevenueMetrics

Global platform revenue summary.

| Field | Type | Description |
|---|---|---|
| `mrr` | `number` | Monthly Recurring Revenue (USD) |
| `arr` | `number` | Annual Recurring Revenue (USD) |
| `totalRevenue` | `number` | All-time total revenue |
| `revenueGrowthPct` | `number` | Month-over-month growth percentage |
| `churnRate` | `number` | Monthly churn rate percentage |
| `avgRevenuePerUser` | `number` | Average revenue per paying company |
| `newMRR` | `number` | New MRR added this period |
| `expansionMRR` | `number` | MRR from upgrades |
| `churnedMRR` | `number` | MRR lost to churn |
| `netNewMRR` | `number` | Net MRR change |
| `revenueByPlan` | `Record<CompanyPlan, number>` | Revenue split per plan tier |
| `revenueByRegion` | `Record<string, number>` | Revenue split per region |
| `monthlyRevenueTrend` | `{ month: string; revenue: number }[]` | 12-month revenue history |

#### PlatformStats

Top-level platform health snapshot for the Super Admin dashboard.

| Field | Type | Description |
|---|---|---|
| `totalCompanies` | `number` | Total onboarded companies |
| `activeCompanies` | `number` | Currently active companies |
| `trialCompanies` | `number` | Companies in trial period |
| `suspendedCompanies` | `number` | Suspended companies |
| `totalUsers` | `number` | Total user accounts across all tenants |
| `activeSubscriptions` | `number` | Count of paid active subscriptions |
| `mrr` | `number` | Current MRR (USD) |
| `arr` | `number` | Current ARR (USD) |
| `churnRate` | `number` | Current monthly churn rate |
| `totalDevices` | `number` | Aggregate device count across all tenants |
| `systemUptime` | `number` | Platform uptime percentage |

---

### 10.3 Subscription Types (subscription.ts)

#### Plan (enum)

```typescript
enum Plan {
  BASIC        = "BASIC",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE   = "ENTERPRISE",
  ULTRA        = "ULTRA",
}
```

#### FeatureFlag (enum)

```typescript
enum FeatureFlag {
  AI_INSIGHTS            = "AI_INSIGHTS",
  WORKFLOW_AUTOMATION    = "WORKFLOW_AUTOMATION",
  DIGITAL_TWIN           = "DIGITAL_TWIN",
  TOPOLOGY_VISUALIZATION = "TOPOLOGY_VISUALIZATION",
  REAL_TIME_MONITORING   = "REAL_TIME_MONITORING",
  PREDICTIVE_FAULTS      = "PREDICTIVE_FAULTS",
  SLA_DASHBOARD          = "SLA_DASHBOARD",
  CAPACITY_PLANNING      = "CAPACITY_PLANNING",
  AUDIT_LOGS             = "AUDIT_LOGS",
  ADVANCED_ALERTING      = "ADVANCED_ALERTING",
  API_ACCESS             = "API_ACCESS",
  INTEGRATIONS           = "INTEGRATIONS",
  WHITE_LABELING         = "WHITE_LABELING",
  MULTI_TENANT           = "MULTI_TENANT",
  PLUGIN_SYSTEM          = "PLUGIN_SYSTEM",
  GIS_ADVANCED           = "GIS_ADVANCED",
  DEVICE_CLUSTERING      = "DEVICE_CLUSTERING",
  HISTORICAL_METRICS     = "HISTORICAL_METRICS",
}
```

#### PlanConfig

Configuration record for a subscription tier.

| Field | Type | Description |
|---|---|---|
| `name` | `Plan` | Plan enum value |
| `label` | `string` | Display label (e.g., "Professional") |
| `color` | `string` | Tailwind color segment (e.g., "blue", "violet") |
| `maxDevices` | `number` | Maximum devices (-1 = unlimited) |
| `monthlyPrice` | `number` | Monthly price in USD |
| `annualPrice` | `number` | Annual price per month in USD (discounted) |
| `features` | `FeatureFlag[]` | Array of feature flags included |
| `description` | `string` | Marketing copy for the plan |
| `badge` | `string` | Optional badge (e.g., "Most Popular") |

#### SubscriptionState

The active subscription state for the logged-in tenant.

| Field | Type | Default | Description |
|---|---|---|---|
| `currentPlan` | `Plan` | `ENTERPRISE` | Active plan tier |
| `tenantId` | `string` | `"tenant-fibernms-demo"` | Tenant/organization identifier |
| `organizationName` | `string` | Demo org name | Organization display name |
| `deviceLimit` | `number` | `100,000` | Maximum devices on current plan |
| `deviceUsed` | `number` | `47,823` | Current device count |
| `apiQuota` | `number` | `1,000,000` | API calls per month allowed |
| `apiUsed` | `number` | `284,750` | API calls consumed this cycle |
| `expiryDate` | `number` | Now + 30 days | Unix timestamp (ms) of plan expiry |
| `trialDaysLeft` | `number` | `0` | Days remaining in trial |
| `isLicenseValid` | `boolean` | `true` | Whether the current license key is valid |
| `licenseKey` | `string` | Enterprise demo key | Current license key string |

#### BillingRecord

A single entry in the billing history.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique billing record ID |
| `date` | `number` | Unix timestamp (ms) |
| `description` | `string` | Invoice/charge description |
| `amount` | `number` | Amount in USD |
| `currency` | `string` | ISO currency code (e.g., "USD") |
| `status` | `string` | `"paid" or "pending" or "failed"` |

#### TenantInfo

A tenant entry in the multi-tenant management view.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Tenant ID |
| `name` | `string` | Organization name |
| `plan` | `Plan` | Tenant's subscription plan |
| `adminEmail` | `string` | Tenant administrator email |
| `deviceCount` | `number` | Current device count |
| `deviceLimit` | `number` | Device limit for current plan |
| `status` | `string` | `"active" or "paused" or "expired"` |
| `createdAt` | `number` | Creation unix timestamp (ms) |

---

## 11. Zustand Stores

### 11.1 authStore.ts

Manages authentication state with localStorage persistence via Zustand's `persist` middleware.

**State fields:**

| Field | Type | Default | Description |
|---|---|---|---|
| `isAuthenticated` | `boolean` | `false` | Whether a user is currently logged in |
| `currentUser` | `AuthUser or null` | `null` | The logged-in user profile |
| `isSuperAdmin` | `boolean` | `false` | True when role is "superAdmin" |
| `isLoading` | `boolean` | `false` | True during async login/register |
| `error` | `string or null` | `null` | Last authentication error message |

**AuthUser shape:**

| Field | Type | Description |
|---|---|---|
| `id` | `string` | User ID |
| `email` | `string` | Login email |
| `firstName` | `string` | First name |
| `lastName` | `string` | Last name |
| `company` | `string` | Company name |
| `plan` | `Plan` | Subscription plan |
| `role` | `UserRole` | `"admin" or "operator" or "viewer" or "engineer" or "superAdmin"` |
| `department` | `string` | Department name |
| `country` | `string` | Country |

**Actions:**

| Action | Signature | Description |
|---|---|---|
| `login` | `(email, password) => Promise<boolean>` | Validates credentials, sets auth state, 800ms simulated delay |
| `register` | `(data: RegisterData) => Promise<boolean>` | Creates new user in localStorage, logs in immediately |
| `logout` | `() => void` | Clears all auth state |
| `clearError` | `() => void` | Resets error field to null |

**Persistence:** Fields persisted under key `"fibernms:auth"`: `isAuthenticated`, `currentUser`, `isSuperAdmin`.

User accounts created via `register()` are stored under `"fibernms:users"` and survive page refreshes. Seed users always win on email conflict.

### 11.2 networkStore.ts

Manages all real-time network state — devices, routes, alerts, SLA, predictive intelligence, audit, and topology layers. **Not persisted** — initializes from mock data on every page load.

**State fields:**

| Field | Type | Default | Description |
|---|---|---|---|
| `devices` | `Device[]` | `mockDevices` | All network devices |
| `routes` | `FiberRoute[]` | `mockRoutes` | All fiber routes |
| `alerts` | `Alert[]` | `mockAlerts` | All generated alerts |
| `selectedDeviceId` | `string or null` | `null` | Currently selected device on map |
| `selectedRouteId` | `string or null` | `null` | Currently selected route |
| `layerVisibility` | `LayerVisibility` | all true | Map layer toggle state |
| `sidebarCollapsed` | `boolean` | `false` | Desktop sidebar collapse state |
| `searchQuery` | `string` | `""` | Global search input value |
| `slaRecords` | `SLARecord[]` | `mockSLARecords` | SLA data records |
| `predictiveAlerts` | `PredictiveAlert[]` | `mockPredictiveAlerts` | AI predictive alerts |
| `auditLogs` | `AuditLog[]` | `mockAuditLogs` | Network audit logs |
| `capacityRecords` | `CapacityRecord[]` | `mockCapacityRecords` | Capacity utilization records |
| `networkLayers` | `NetworkLayer[]` | L1 visible | Multi-layer topology config |
| `commandPaletteOpen` | `boolean` | `false` | Global search palette state |
| `simulationMode` | `boolean` | `false` | Live simulation toggle |
| `activeLayer` | `"L1" or "L2" or "L3"` | `"L1"` | Active topology layer |
| `mobileSearchOpen` | `boolean` | `false` | Mobile fullscreen search state |

**Device actions:** `addDevice`, `updateDevice`, `deleteDevice`, `setSelectedDevice`

**Route actions:** `addRoute`, `updateRoute`, `deleteRoute`, `setSelectedRoute`

**Alert/Layer actions:** `resolveAlert`, `toggleLayer`, `toggleNetworkLayer`, `setActiveLayer`

**Enterprise actions:** `setSLARecords`, `setPredictiveAlerts`, `resolvePredictiveAlert`, `setAuditLogs`, `setCapacityRecords`, `toggleCommandPalette`, `toggleSimulationMode`, `setMobileSearchOpen`

### 11.3 subscriptionStore.ts

Manages the current tenant's plan, quotas, license key, and expiry state. **Not persisted** — initializes to ENTERPRISE demo on every page load.

**Initial state (ENTERPRISE demo):**

```typescript
{
  currentPlan:      Plan.ENTERPRISE,
  tenantId:         "tenant-fibernms-demo",
  organizationName: "FiberNMS Demo — Tier-2 Telecom",
  deviceLimit:      100_000,
  deviceUsed:       47_823,
  apiQuota:         1_000_000,
  apiUsed:          284_750,
  expiryDate:       Date.now() + 30_days_ms,
  trialDaysLeft:    0,
  isLicenseValid:   true,
  licenseKey:       "FNMS-ENT-2026-DEMO-XXXXXX",
}
```

**Actions:**

| Action | Signature | Description |
|---|---|---|
| `setCurrentPlan(plan)` | `(Plan) => void` | Switches plan and updates device limit |
| `updateUsage(deviceUsed, apiUsed)` | `(number, number) => void` | Updates usage counters |
| `validateLicense(key)` | `(string) => boolean` | Validates key, activates matching plan if valid |
| `setTenantId(id)` | `(string) => void` | Sets the active tenant ID |

---

## 12. Mock Data Layer

All data is generated in three modules under `src/frontend/src/data/`. Data is deterministic and scales per plan tier.

### mockData.ts (Network Data)

Powers all 14 NOC pages.

| Dataset | Volume | Description |
|---|---|---|
| `mockDevices` | 1,000+ | OLTs, ONTs, Splitters, JJBs, Switches distributed across 20+ regions. ~70% active, ~15% warning, ~15% faulty |
| `mockRoutes` | 100+ | GeoJSON polylines for backbone, distribution, and drop cables with distance and status |
| `mockAlerts` | 500+ | CRITICAL/WARNING/INFO alerts with timestamps and device references |
| `mockSLARecords` | 200+ | Per-customer SLA snapshots with latency, packet loss, uptime, and breach status |
| `mockPredictiveAlerts` | 150+ | AI risk scores (0–100), failure type classifications, ETA estimates |
| `mockAuditLogs` | 300+ | User action logs across device changes, workflow executions, system events |
| `mockCapacityRecords` | 50+ | Per-route utilization with 12-month forecast arrays |

Data volume slicing per plan:

```typescript
const planLimits = {
  BASIC:        { devices: 100,  routes: 10,  alerts: 50  },
  PROFESSIONAL: { devices: 500,  routes: 50,  alerts: 200 },
  ENTERPRISE:   { devices: 2000, routes: 100, alerts: 500 },
  ULTRA:        { devices: 10000, routes: 100, alerts: 500 },
};
```

### superAdminMockData.ts (Super Admin Data)

Only loaded when `role === "superAdmin"`.

| Dataset | Volume | Description |
|---|---|---|
| `mockCompanies` | 54 | India (20), US (12), EU (10), APAC (8), MENA (4). Mixed plans and statuses |
| `mockAdminUsers` | 1,000+ | Users distributed across all 54 companies with roles, login history, MFA flag, sessions |
| `mockOrders` | 500+ | Monthly and yearly subscription orders. ~80% paid, ~12% pending, ~8% failed |
| `mockInvoices` | 300+ | Tax invoices with GST/VAT/none tax breakdowns and line items |
| `mockAuditEvents` | 500+ | Platform-level audit events across all tenants |
| `mockSecurityEvents` | 200+ | Failed logins, suspicious IP activity, MFA bypass attempts |
| `mockSystemAlerts` | 30+ | Platform-level outages, API degradations, error rate spikes |
| `platformStats` | 1 | Aggregated PlatformStats object |
| `revenueMetrics` | 1 | Full RevenueMetrics with 12-month trend |

### billingMockData.ts (Financial Metrics)

| Metric | Value | Description |
|---|---|---|
| MRR | $284,750 | Monthly Recurring Revenue |
| ARR | $3,417,000 | Annual Recurring Revenue |
| Churn Rate | 2.3% | Monthly churn |
| Revenue by Plan | BASIC $8,100 / PRO $94,600 / ENT $138,050 / ULTRA $44,000 | Plan split |
| Revenue by Region | India 42% / US 28% / EU 18% / APAC 8% / MENA 4% | Region split |

---

## 13. Feature Gating System

### How It Works

Every premium feature is wrapped in either a `FeatureGate` component or evaluated via the `useFeature` hook. When the user's current plan does not include the required feature, the content is replaced with a blur/lock overlay and an upgrade CTA.

### useFeature Hook

```typescript
import { useFeature } from "@/hooks/useFeature";
import { FeatureFlag } from "@/types/subscription";

// Returns: { hasAccess, requiredPlan, currentPlan, isHigherPlan }
const { hasAccess, requiredPlan } = useFeature(FeatureFlag.SLA_DASHBOARD);

if (!hasAccess) {
  console.log(`Requires: ${requiredPlan}`); // "ENTERPRISE"
}
```

### useSubscription Hook

```typescript
import { useSubscription } from "@/hooks/useFeature";

const {
  currentPlan,
  planLabel,         // "Enterprise"
  deviceUsed,
  deviceLimit,
  daysUntilExpiry,
  isExpiringSoon,    // true if < 14 days left
  isExpired,
} = useSubscription();
```

### useDeviceQuota Hook

```typescript
import { useDeviceQuota } from "@/hooks/useFeature";

const {
  used,          // 47823
  limit,         // 100000
  percentUsed,   // 47.8
  nearLimit,     // true if > 85%
  atLimit,       // true if >= 100%
} = useDeviceQuota();
```

### FeatureGate Component

```tsx
import { FeatureGate } from "@/components/subscription/FeatureGate";
import { FeatureFlag } from "@/types/subscription";

<FeatureGate feature={FeatureFlag.AI_INSIGHTS}>
  {/* Blurred + locked on BASIC and PROFESSIONAL */}
  <AIInsightsPanel />
</FeatureGate>
```

When locked, renders `LockedFeatureOverlay` with: blurred content, lock icon, "Upgrade to [RequiredPlan]" button.

### Feature to Plan Matrix

| Feature Flag | BASIC | PRO | ENT | ULTRA |
|---|---|---|---|---|
| `DEVICE_CLUSTERING` | Yes | Yes | Yes | Yes |
| `GIS_ADVANCED` | No | Yes | Yes | Yes |
| `HISTORICAL_METRICS` | No | Yes | Yes | Yes |
| `ADVANCED_ALERTING` | No | Yes | Yes | Yes |
| `TOPOLOGY_VISUALIZATION` | No | Yes | Yes | Yes |
| `REAL_TIME_MONITORING` | No | No | Yes | Yes |
| `SLA_DASHBOARD` | No | No | Yes | Yes |
| `PREDICTIVE_FAULTS` | No | No | Yes | Yes |
| `AUDIT_LOGS` | No | No | Yes | Yes |
| `CAPACITY_PLANNING` | No | No | Yes | Yes |
| `WORKFLOW_AUTOMATION` | No | No | Yes | Yes |
| `AI_INSIGHTS` | No | No | Yes | Yes |
| `API_ACCESS` | No | No | Yes | Yes |
| `INTEGRATIONS` | No | No | No | Yes |
| `WHITE_LABELING` | No | No | No | Yes |
| `MULTI_TENANT` | No | No | No | Yes |
| `PLUGIN_SYSTEM` | No | No | No | Yes |
| `DIGITAL_TWIN` | No | No | No | Yes |

### Gating Components Reference

| Component | File | Purpose |
|---|---|---|
| `FeatureGate` | `subscription/FeatureGate.tsx` | Wrapper rendering children or locked overlay |
| `LockedFeatureOverlay` | `subscription/LockedFeatureOverlay.tsx` | Blur + lock icon + upgrade CTA |
| `UpgradeCTA` | `subscription/UpgradeCTA.tsx` | Inline banner with upgrade button |
| `PlanBadge` | `subscription/PlanBadge.tsx` | Color-coded plan tier chip |
| `PlanComparisonModal` | `subscription/PlanComparisonModal.tsx` | Full 4-tier feature matrix modal |
| `UsageProgressBar` | `subscription/UsageProgressBar.tsx` | Animated bar: green 0-80%, yellow 80-95%, red 95-100% |

---

## 14. Authentication and Auth Flow

### Login Flow

```
User visits any protected route
        |
        v
TanStack Router beforeLoad
checks context.isAuthenticated
        |
   NOT authenticated
        |
        v
Redirect to /login

User enters email + password
        |
        v
useAuthStore.login(email, password)
  - Sets isLoading: true
  - Waits 800ms (simulated network delay)
  - Reads stored users from localStorage ("fibernms:users")
  - Merges with SEED_USERS (seed users win on conflict)
  - Finds matching user (case-insensitive email + exact password)
        |
   No match found                 Match found
        |                              |
        v                              v
  Sets error message          Sets isAuthenticated: true
  "Invalid credentials"       Sets currentUser: profile
                              Sets isSuperAdmin: role === "superAdmin"
                              Persists to localStorage "fibernms:auth"
                                        |
                                        v
                              Router rebuilds with new context
                                        |
                          ┌─────────────┴─────────────┐
                    isSuperAdmin: false         isSuperAdmin: true
                          |                            |
                   Redirect to /               Redirect to /super-admin
```

### Registration Flow (5 Steps)

1. **Personal Info** — First name, last name, email, phone
2. **Organization** — Company name, industry, company size, job title, department, country
3. **Network Planning** — Coverage area, estimated device count, current NMS, planned integrations
4. **Plan Selection** — Choose BASIC / PROFESSIONAL / ENTERPRISE / ULTRA
5. **Security** — Password (with strength indicator) + Terms acceptance

On submit: checks for duplicate email, creates new StoredUser in localStorage, logs user in immediately (no email verification in mock mode).

### Session Persistence

```typescript
persist(storeDefinition, {
  name: "fibernms:auth",
  partialize: (s) => ({
    isAuthenticated: s.isAuthenticated,
    currentUser:     s.currentUser,
    isSuperAdmin:    s.isSuperAdmin,
  }),
})
```

Store hydrates synchronously from localStorage on page load. `useAuth().isInitializing` is always `false` — no loading flash.

### Route Guards

```typescript
// Any authenticated user
const protectedRoute = createRoute({
  id: "protected",
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) throw redirect({ to: "/login" });
  },
  component: Layout,
});

// Must be authenticated AND isSuperAdmin
const superAdminRoute = createRoute({
  id: "super-admin",
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) throw redirect({ to: "/login" });
    if (!context.isSuperAdmin) throw redirect({ to: "/" });
  },
  component: Layout,
});

// Redirect away if already logged in
const loginRoute = createRoute({
  path: "/login",
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" });
  },
});
```

---

## 15. Map Module

Built on React Leaflet (v4) with Leaflet.js (v1.9) and CARTO Voyager open tiles.

### Map Tile Configuration

```typescript
const CARTO_VOYAGER_URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

<TileLayer
  url={CARTO_VOYAGER_URL}
  attribution="© OpenStreetMap contributors © CARTO"
  maxZoom={19}
/>
```

CARTO Voyager = light, colorful, readable background. No API key required. Previous dark/black theme was replaced with Voyager to avoid visual clashing with neon device markers.

### Device Markers

Each device renders as a `DeviceMarker` with a custom Leaflet `DivIcon`:
- Color-coded circle: green (active), orange (warning), red (faulty)
- Pulsing animation ring for faulty/warning devices
- DeviceIcon SVG inside the circle
- Click sets `selectedDeviceId` in networkStore

### Fiber Route Rendering

Routes render as Leaflet `Polyline` components:

```typescript
const ROUTE_COLORS = {
  backbone:     "#00e5ff", // cyan
  distribution: "#448aff", // blue
  drop:         "#69ff47", // green
};
```

Route visibility controlled by `layerVisibility` in networkStore. Hidden routes are not rendered (not just CSS-hidden).

### Draw Mode Workflow

1. User clicks "Draw Route" in `DrawToolbar`
2. `drawMode` state = `true`, cursor changes to crosshair
3. Each map click appends a `{ lat, lng }` to `currentWaypoints`
4. A preview Polyline follows the cursor
5. User clicks "Finish" or presses Escape
6. `RouteEditPanel` opens to name and categorize the route
7. `networkStore.addRoute()` saves it
8. New route appears on map immediately

### Layer Toggle Panel

`LayerTogglePanel` shows three toggles (backbone / distribution / drop) that update `layerVisibility` in networkStore.

### Device Detail Panel

- **Desktop:** Slides in as right sidebar panel
- **Mobile:** Bottom `<Drawer>` (shadcn/ui Drawer component)

Panel sections: device name, type, status badge; signal dBm, uptime %, ports; connected devices list; recent alerts; quick actions (Edit, Resolve, Open in Devices page).

### Mobile Map Layout

Map is constrained between sticky 56px header and 64px bottom nav:

```typescript
// Layout.tsx
<main style={{
  position: "fixed",
  top:    "56px",
  bottom: "64px",
  left: 0,
  right: 0,
  height: "calc(100dvh - 56px - 64px)",
}}>
  <Outlet />
</main>
```

`MapDashboard` passes `style={{ height: "100%" }}` to `<MapContainer>`. Map cannot overflow onto navigation elements.

---

## 16. Topology Module

The Topology page (`/topology`) provides two views toggled via tabs.

### View 1: OLT Sections (Default)

A card-based grid showing every OLT as its own section card (`OLTSectionCard`):
- OLT name, region, status badge
- Mini-tree visualization (`OLTSectionMiniTree`) showing connected Splitters and ONTs
- Port count, active/faulty/warning stats
- Signal strength and uptime metrics

Each OLT card is independently rendered, allowing operators to scan all OLTs without navigating a complex graph.

### View 2: Network Graph (Canvas)

An SVG canvas in `TopologyGraph.tsx` with:

**Node Types:**
- OLT — Hexagon, neon cyan (#00e5ff), radius 24px
- Splitter — Diamond, neon orange (#ff8c00), radius 16px
- ONT — Circle, green (#69ff47), radius 12px

**Animated Data-Flow:**
- Dots travel along edges OLT → Splitter → ONT
- Speed reflects simulated traffic load
- Faulty paths show red dashed edges, no flow dots

**Interaction:**
- Hover → tooltip (name, status, signal, uptime)
- Click → `TopologyNodePanel` drawer opens
- `TopologyNodePanel` tabs: Overview, Alerts, Signal Chart, Uptime Ring

**Layer Switching:**
- L1 Physical — Fiber cable topology (OLT-Splitter-ONT hierarchy)
- L2 Switching — VLAN topology (Switch nodes, trunk/access links)
- L3 IP — Router/IP layer topology (BGP/OSPF adjacencies)

**Minimap:** Inset corner minimap shows full canvas at reduced scale with viewport rectangle.

---

## 17. Monitoring Module

The Monitoring page (`/monitoring`) simulates real-time network telemetry using an event bus pattern.

### Real-Time Simulation

```typescript
// lib/eventBus.ts
import { eventBus } from "@/lib/eventBus";

// Emit a new alert
eventBus.emit("alert:new", {
  deviceId: "OLT-IND-007",
  severity: "critical",
  message: "Signal loss on port 8",
});

// Subscribe in a component
useEffect(() => {
  const unsub = eventBus.on("alert:new", (event) => {
    setAlerts(prev => [event, ...prev.slice(0, 99)]);
  });
  return unsub;
}, []);
```

Every 5–15 seconds (randomized), the simulation emits: `alert:new`, `device:status`, `signal:update`.

### Chart Components

| Component | Chart Type | Description |
|---|---|---|
| `StatCard` | KPI card | Trend indicator (up/down arrow + delta %) |
| `StatusPieChart` | Donut | Active/Warning/Faulty/Offline breakdown |
| `SignalLineChart` | Line | Last 60 data points, rolling window |
| `AlertsPanel` | List | Severity-colored scrollable alert feed |

### Alert Severity Colors

| Severity | Token | Color |
|---|---|---|
| `critical` | `--destructive` | Red ~#ff4040 |
| `warning` | `--accent` | Orange ~#ff9a00 |
| `info` | `--muted-foreground` | Grey |

---

## 18. Subscription Tiers

### Plan Comparison Table

| Feature | BASIC | PROFESSIONAL | ENTERPRISE | ULTRA |
|---|---|---|---|---|
| **Monthly Price** | $9/mo | $49/mo | $199/mo | $999/mo |
| **Annual (per mo)** | $7/mo | $39/mo | $159/mo | $799/mo |
| **Max Devices** | 1,000 | 10,000 | 100,000 | Unlimited |
| **API Calls/mo** | 10,000 | 100,000 | 1,000,000 | Unlimited |
| Device Clustering | Yes | Yes | Yes | Yes |
| GIS Advanced Map | No | Yes | Yes | Yes |
| Historical Metrics | No | Yes | Yes | Yes |
| Advanced Alerting | No | Yes | Yes | Yes |
| Topology Visualization | No | Yes | Yes | Yes |
| Real-Time Monitoring | No | No | Yes | Yes |
| SLA Dashboard | No | No | Yes | Yes |
| Predictive Fault AI | No | No | Yes | Yes |
| Audit Logs | No | No | Yes | Yes |
| Capacity Planning | No | No | Yes | Yes |
| Workflow Automation | No | No | Yes | Yes |
| AI Insights | No | No | Yes | Yes |
| API Access | No | No | Yes | Yes |
| Integrations | No | No | No | Yes |
| White-Labeling | No | No | No | Yes |
| Multi-Tenant | No | No | No | Yes |
| Plugin System | No | No | No | Yes |
| Digital Twin | No | No | No | Yes |
| **Target** | Starter ISP | Growing ISP | Tier-2 Telecom | Tier-1 Global |
| **Badge** | — | Most Popular | Best Value | Carrier Grade |

### Switching the Demo Plan

```typescript
// Method 1: License key via the UI (/settings/license)
// Enter a demo key from the table in Section 6

// Method 2: Store action (developer console)
import { useSubscriptionStore } from "@/store/subscriptionStore";
useSubscriptionStore.getState().setCurrentPlan("ULTRA");

// Method 3: Change the initial state (code change)
// src/frontend/src/store/subscriptionStore.ts
const initialState = { currentPlan: Plan.PROFESSIONAL, ... };
```

---

## 19. Super Admin System

The Super Admin system is a second tier of the platform, accessible only to users with `role: "superAdmin"`. All routes use the `/super-admin` path prefix and are protected by a separate `beforeLoad` guard.

### Access Flow

```
Login: superadmin@fibernms.com / SuperAdmin@123
    |
    v
authStore sets isSuperAdmin: true
    |
    v
Router context: { isSuperAdmin: true }
    |
    v
superAdminRoute.beforeLoad passes (not rejected)
    |
    v
Redirect to /super-admin
    |
    v
Sidebar shows "SUPER ADMIN" section with 12 admin pages
```

### Company Lifecycle

```
NEW SIGNUP
    |
    v
  TRIAL  <------- (re-trial or re-activate) ------+
    |                                              |
    | (trial expires or manual upgrade)            |
    v                                              |
  ACTIVE <---- (re-activation after payment) -----+
    |                                              |
    | (payment failure / admin suspension)         |
    v                                              |
SUSPENDED ---- (re-activate) ------------------->+
    |
    | (non-renewal / admin action)
    v
  EXPIRED ---- (plan purchase) ------------------>+
    |
    | (soft delete by super admin)
    v
  DELETED (isSoftDeleted: true, data retained in DB)
```

### Per-Page Feature Summary

**`/super-admin` — Global Dashboard**
- KPI cards: Total Companies, Active Subscriptions, MRR, ARR, Total Devices, System Uptime %
- Revenue trend chart (12 months, Recharts AreaChart)
- Plan distribution donut chart
- Recent company signups timeline

**`/super-admin/companies` — Company Registry**
- Table/card list of all 54 companies
- Columns: Name, Domain, Region, Plan badge, Status badge, Devices Used/Limit, MRR
- Filters: Region, Plan, Status, Search
- Actions: Edit, Suspend/Activate, View Detail, Soft Delete
- Create New Company modal

**`/super-admin/companies/:companyId` — Company Detail**
- Company header: logo, name, domain, region, plan, status
- Usage cards with progress bars: Devices, API calls, Data, Alerts
- Active Users list
- Billing History table (last 12 invoices)
- Company Activity timeline
- Admin actions: Change Plan, Suspend, Force Logout All, Delete

**`/super-admin/usage` — Usage and Limits**
- Per-company usage progress bars in 2-column grid
- Color-coded: green < 80%, yellow 80–95%, red > 95%
- Summary: companies at >90% usage, companies at limit

**`/super-admin/users` — Global User Management**
- Virtualized table of 1000+ users
- Filters: Company, Role, Status; Search by name or email
- Actions: Invite user, Bulk import CSV, View sessions, Force logout, Disable user

**`/super-admin/billing` — Global Billing**
- Revenue metrics: MRR, ARR, Churn Rate, ARPU
- Monthly revenue area chart (12 months)
- Revenue by plan donut, revenue by region bar chart
- Recent invoices with download links

**`/super-admin/orders` — Orders and Invoices**
- Full orders table with status filters
- Invoice viewer with PDF download
- Tax breakdown: GST/VAT/None by region
- Subscription lifecycle timeline

**`/super-admin/audit` — Platform Audit**
- Chronological timeline of all cross-tenant events
- Color-coded by category (user/billing/device/company/auth)
- Filters: Company, User, Action type, Severity, Date range
- CSV export

**`/super-admin/access` — Access Control**
- RBAC matrix: Roles x Permissions with toggle checkboxes
- ABAC section: Attribute rules (region-based, device-level)
- Permission groups: Read, Write, Delete, Admin, Super

**`/super-admin/alerts` — System Alerts**
- Platform-level alert cards with severity, affected companies, status
- Categories: Outage, Error Rate, API, Resource
- Resolve/Acknowledge actions, alert history timeline

**`/super-admin/security` — Security Dashboard**
- Login attempts chart (24h, success vs failed)
- IP Tracking table: IP, User/Company, Success/Fail counts, Geo, Blocked status
- Suspicious Activity list with severity
- MFA Status table per user
- Block IP action

**`/super-admin/analytics` — Global Analytics**
- Top customers by MRR with growth indicators
- Device growth trend chart (90-day per region)
- Alert volume heatmap (hour x day of week grid)
- Churn analysis chart

**`/tenant-admin/:companyId` — Tenant Admin Panel**
- Accessible to both Super Admins and Company Admins (for their own company)
- Internal user management, company usage overview, billing history
- Workflow configuration, quick links to network dashboards

---

## 20. Design System

### OKLCH Color Tokens

All colors defined as OKLCH values in `src/frontend/src/index.css`. Both light and dark themes are supported.

#### Dark Theme Tokens

| Token | OKLCH | Usage |
|---|---|---|
| `--background` | `0.11 0.005 260` | Page background (~#191a21) |
| `--foreground` | `0.92 0.005 260` | Body text (~#e8e9f0) |
| `--card` | `0.155 0.008 265` | Card surfaces (~#22232d) |
| `--muted` | `0.22 0.005 260` | Muted backgrounds (~#30313d) |
| `--muted-foreground` | `0.52 0.008 260` | Subtle text (~#7f8099) |
| `--primary` | `0.72 0.22 210` | Neon cyan CTAs, active nav (~#00d4ff) |
| `--accent` | `0.68 0.25 55` | Neon orange warnings, highlights (~#ff9a00) |
| `--destructive` | `0.62 0.28 22` | Neon red errors, critical alerts (~#ff4040) |
| `--border` | `0.26 0.01 265` | Borders and dividers (~#383a47) |
| `--admin-primary` | `0.65 0.2 280` | Violet Super Admin accents (~#9b6bff) |

#### Risk Scale Tokens

| Token | OKLCH | Threshold | Usage |
|---|---|---|---|
| `--risk-ok` / `--risk-low` | `0.62 0.22 142` | 0–30 | Green — healthy |
| `--risk-medium` | `0.7 0.25 55` | 31–60 | Yellow-orange |
| `--risk-high` | `0.65 0.25 40` | 61–80 | Orange |
| `--risk-critical` | `0.62 0.28 22` | 81–100 | Red |

#### Capacity Utilization Tokens

| Token | Threshold | Color |
|---|---|---|
| `--capacity-healthy` | 0–79% | Green |
| `--capacity-warning` | 80–94% | Yellow |
| `--capacity-critical` | 95–100% | Red |

### Typography

| Role | Font | Variable | Fallback |
|---|---|---|---|
| Display / Headings | Geist Mono | `--font-display` | monospace |
| Body / UI Text | General Sans | `--font-body` | sans-serif |
| Code / Metrics | JetBrains Mono | `--font-mono` | monospace |

All fonts self-hosted as WOFF2 in `public/assets/fonts/`.

### Utility Classes

| Class | Effect |
|---|---|
| `transition-smooth` | `transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1)` |
| `noc-glow` | Cyan neon box-shadow (primary) |
| `noc-glow-active` | Orange neon glow (accent) |
| `noc-glow-fault` | Red neon glow (destructive) |
| `noc-glow-warn` | Orange neon glow (warning) |
| `noc-glow-ok` | Green neon glow (healthy) |
| `text-metric` | `font-mono text-sm tracking-tight tabular-nums` |
| `glass-card` | `backdrop-blur(4px) + bg-card/75 + border/40` |

### Glassmorphism Pattern

```tsx
// GlassCard.tsx
<div className={cn(
  "rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm",
  glow && "noc-glow",
  className
)}>
  {children}
</div>
```

### Theme Toggle

Dark/light theme managed by `next-themes`. Toggle available in: Desktop Navbar, Mobile Header, Login page, Register page. Default: **dark** (NOC operators work in low-light environments).

---

## 21. Component Architecture

### Layout System

```
Layout.tsx
 |-- useIsMobile() → decides layout
 |
 |-- MOBILE (<=768px)
 |   |-- MobileHeader (56px sticky top)
 |   |   |-- Logo, Page title, Hamburger
 |   |-- <main> (fixed: top=56px, bottom=64px)
 |   |   |-- <Outlet /> (current page)
 |   |-- MobileBottomNav (64px fixed bottom)
 |   |   |-- Dashboard, Companies, Users, Billing, Alerts
 |   |-- CommandPalette
 |
 |-- DESKTOP (>768px)
     |-- Sidebar (collapsible)
     |   |-- Logo + version
     |   |-- NOC navigation links
     |   |-- SaaS navigation links
     |   |-- Super Admin section (if isSuperAdmin)
     |   |-- PlanBadge at bottom
     |-- <div flex flex-col flex-1>
     |   |-- Navbar (top bar: search, notifications, theme, user menu)
     |   |-- <main> (overflow-auto)
     |       |-- <Outlet />
     |-- CommandPalette
```

### Adding a New Page

```typescript
// 1. Create src/frontend/src/pages/MyPage.tsx
// 2. Lazy-import in App.tsx
const MyPage = lazy(() => import("@/pages/MyPage"));

// 3. Create a route
const myRoute = makeProtectedPage("/my-page", MyPage);

// 4. Add to routeTree in protectedRoute.addChildren([...])

// 5. Add nav link in Sidebar.tsx and MobileNavDrawer.tsx
```

---

## 22. Architecture Patterns

### Lazy Loading with Suspense

```typescript
const MapDashboard = lazy(() => import("@/pages/MapDashboard"));

function withSuspense(Page) {
  return function SuspensePage() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Page />
      </Suspense>
    );
  };
}
```

`PageLoader` shows a skeleton grid while the bundle chunk loads.

### Plan-Aware Mock Data

```typescript
export function getDevices(): Device[] {
  const { currentPlan } = useSubscriptionStore.getState();
  const limits = {
    BASIC: 100, PROFESSIONAL: 500, ENTERPRISE: 2000, ULTRA: 10000
  };
  return ALL_DEVICES.slice(0, limits[currentPlan]);
}
```

### Event Bus Real-Time Simulation

```typescript
// Typed pub/sub event emitter
type EventMap = {
  "alert:new": Alert;
  "device:status": { id: string; status: DeviceStatus };
  "signal:update": { deviceId: string; value: number };
};

// Subscribe (returns unsubscribe function)
const unsub = eventBus.on("alert:new", (data) => { ... });
return unsub; // cleanup in useEffect

// Emit
eventBus.emit("alert:new", alertData);
```

### Feature Gate Pattern

```tsx
function PredictiveFaultPanel() {
  return (
    <FeatureGate feature={FeatureFlag.PREDICTIVE_FAULTS}>
      <div className="grid grid-cols-3 gap-4">
        {alerts.map(a => <RiskCard key={a.id} alert={a} />)}
      </div>
    </FeatureGate>
  );
}
```

### TanStack Router with Context

```typescript
// Router context carries auth state for synchronous route guards
type RouterContext = { isAuthenticated: boolean; isSuperAdmin: boolean };

// Router recreated on auth state change
const router = useMemo(
  () => createRouter({ routeTree, context: { isAuthenticated, isSuperAdmin } }),
  [isAuthenticated, isSuperAdmin]
);
```

### Virtualized Tables

Heavy tables (devices, users, orders) use windowing — only 10–20 rows in DOM regardless of dataset size. Implemented via `@tanstack/react-virtual` internally.

---

## 23. Build and Deployment

### Command Reference

| Command | Directory | Output |
|---|---|---|
| `pnpm install` | `/app` | Installs all workspace dependencies |
| `pnpm dev` | `/app/src/frontend` | Dev server at http://localhost:5173 |
| `pnpm build` | `/app/src/frontend` | Production build in `dist/` |
| `pnpm typecheck` | `/app/src/frontend` | TypeScript type check (no emit) |
| `pnpm check` | `/app/src/frontend` | Biome lint check |
| `pnpm fix` | `/app/src/frontend` | Biome auto-fix |

### Static Hosting

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=src/frontend/dist

# AWS S3
aws s3 sync src/frontend/dist/ s3://your-bucket --delete

# GitHub Pages
gh-pages -d src/frontend/dist
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY src/frontend/package.json ./src/frontend/
RUN pnpm install --prefer-offline
COPY . .
RUN cd src/frontend && pnpm build

FROM nginx:1.25-alpine
COPY --from=builder /app/src/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf — SPA routing
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  gzip on;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|woff2|png|jpg|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### Backend Activation (Motoko / Internet Computer)

```bash
# 1. Implement methods in src/backend/main.mo
# 2. Regenerate TypeScript bindings
pnpm bindgen

# 3. Replace mock data in pages with useActor() hooks
# 4. Deploy to Internet Computer
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
dfx start --background
dfx deploy
```

---

## 24. Customization Guide

### Change the Default Demo Plan

```typescript
// src/frontend/src/store/subscriptionStore.ts
const initialState: SubscriptionState = {
  currentPlan: Plan.PROFESSIONAL, // change here
  deviceUsed: 4_500,
  deviceLimit: 10_000,
  ...
};
```

### Add a New Feature Flag

```typescript
// 1. Add to FeatureFlag enum (types/subscription.ts)
SATELLITE_OVERLAY = "SATELLITE_OVERLAY",

// 2. Add to FEATURE_PLAN_MAP (config/features.ts)
[FeatureFlag.SATELLITE_OVERLAY]: [Plan.ENTERPRISE, Plan.ULTRA],

// 3. Add to PLAN_CONFIGS features arrays (config/features.ts)
[Plan.ENTERPRISE]: { features: [...existing, FeatureFlag.SATELLITE_OVERLAY] }

// 4. Use in a component
const { hasAccess } = useFeature(FeatureFlag.SATELLITE_OVERLAY);

// Or wrap with FeatureGate
<FeatureGate feature={FeatureFlag.SATELLITE_OVERLAY}>
  <SatelliteLayerToggle />
</FeatureGate>
```

### Add a New Seed User

```typescript
// src/frontend/src/store/authStore.ts
const SEED_USERS: StoredUser[] = [
  ...existingSeedUsers,
  {
    email: "engineer@acmetelecom.com",
    passwordHash: "Engineer@2026",
    profile: {
      id: "eng-001",
      email: "engineer@acmetelecom.com",
      firstName: "Jane",
      lastName: "Smith",
      company: "Acme Telecom",
      plan: Plan.PROFESSIONAL,
      role: "engineer",
      department: "Network Engineering",
      country: "India",
    },
  },
];
```

### Customize OKLCH Color Palette

```css
/* src/frontend/src/index.css */
.dark {
  /* Change primary from cyan to green */
  --primary: 0.72 0.22 142;

  /* Change accent from orange to pink */
  --accent: 0.7 0.25 320;

  /* Change background to a warmer dark */
  --background: 0.10 0.01 30;
}
```

### Swap Map Tile Provider

```typescript
// pages/MapDashboard.tsx
<TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution="© OpenStreetMap contributors © CARTO"
  maxZoom={19}
/>
```

Available CARTO styles (no API key): `voyager` (default), `dark_all`, `light_all`, `rastertiles/voyager_labels_under`.

---

## 25. Roadmap

### Authentication and Security
- [ ] Forgot Password — email-based password reset flow
- [ ] Two-Factor Authentication (MFA) — TOTP app support
- [ ] SSO / SAML Integration — Okta, Azure AD, Google Workspace
- [ ] Session Expiry Warnings — notify users before auto-logout

### SaaS and Billing
- [ ] Usage-Based Billing Alerts — notify when approaching device/API quotas
- [ ] Stripe Payment Integration — real payment processing
- [ ] Proration Calculator — show cost delta before plan upgrade
- [ ] Trial-to-Paid Conversion Flow — guided upgrade wizard

### NOC Features
- [ ] Satellite and Weather Map Overlays — real satellite imagery and weather layers
- [ ] Real-Time Alert Feeds in AI Chat — AI assistant receives live alert context
- [ ] Digital Twin Simulation — full L1–L3 digital twin with scenario modeling
- [ ] OTDR Integration — real OTDR trace file parsing and visualization
- [ ] Network Health Score — composite health index per region/company

### Platform
- [ ] Tenant Onboarding Wizard — guided ISP setup (plan → devices → first alert)
- [ ] Plugin Marketplace UI — install/manage community-built NOC extensions
- [ ] Mobile Companion App — PWA manifest + offline support
- [ ] Dashboard Builder — drag-and-drop custom KPI dashboard designer
- [ ] Report Scheduler — automated PDF report delivery

### Developer Experience
- [ ] Storybook Component Library — isolated component documentation
- [ ] E2E Testing (Playwright) — critical path test coverage
- [ ] CI/CD Pipeline — GitHub Actions for type check + lint + build

---

## 26. Contributing

### Setup

```bash
git clone https://github.com/Mr-fuaaaadh/fibernms.git
cd fibernms
pnpm install
cd src/frontend && pnpm dev
```

### Workflow

```bash
# Type check before committing
pnpm typecheck

# Auto-fix lint issues
pnpm fix
```

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use For |
|---|---|
| `feat:` | New feature or page |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring (no behavior change) |
| `docs:` | Documentation changes |
| `style:` | Formatting, whitespace |
| `perf:` | Performance improvement |
| `test:` | Tests added or updated |
| `chore:` | Build tooling, deps, config |

### Pull Request Guidelines

- One feature or fix per PR
- Run `pnpm typecheck` and `pnpm fix` before opening PR
- Add a screenshot for UI changes
- Target the `main` branch
- Reference related issues: `Closes #42`

### Code Style

- TypeScript strict mode — no `any`, no `@ts-ignore`
- Functional components only — no class components
- Global state via Zustand, local UI state via `useState`
- Tailwind utility classes only — no raw hex colors, use design tokens
- Absolute imports via `@/` alias

---

## 27. License

**Proprietary.** All rights reserved. Copyright FiberNMS 2026.

For support, billing inquiries, or account help, contact [Caffeine](https://caffeine.ai).

---

*Last updated: April 2026 — FiberNMS v2.0*
