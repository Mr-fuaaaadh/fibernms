# FiberNMS — Optical Fiber Network Management System

> **Carrier-grade, SaaS-based OFNMS frontend** for telecom operators, ISPs, and large infrastructure providers. Built with React + TypeScript + Tailwind CSS + Leaflet.js, it delivers Zabbix-level monitoring, AI intelligence, and premium enterprise features engineered for global scale (100K–1M+ devices).

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Features](#2-key-features)
   - [NOC Core](#21-noc-core)
   - [Enterprise Features](#22-enterprise-features)
   - [Super Admin System](#23-super-admin-system)
   - [SaaS & Billing](#24-saas--billing)
   - [Map & Fault Visualization](#25-map--fault-visualization)
   - [Mobile-First & Responsive Design](#26-mobile-first--responsive-design)
   - [Authentication & RBAC](#27-authentication--rbac)
   - [PWA Support](#28-pwa-support)
   - [Performance](#29-performance)
   - [Design System](#210-design-system)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
   - [Directory Tree](#41-directory-tree)
   - [Zustand Stores](#42-zustand-stores)
   - [Router Setup](#43-router-setup)
   - [Mock Data Layer](#44-mock-data-layer)
5. [All Pages & Routes](#5-all-pages--routes)
6. [Data Models / TypeScript Types](#6-data-models--typescript-types)
7. [Subscription Tiers](#7-subscription-tiers)
8. [Role-Based Access Control](#8-role-based-access-control)
9. [Seed Credentials](#9-seed-credentials)
10. [Getting Started](#10-getting-started)
11. [Connecting a Python FastAPI Backend](#11-connecting-a-python-fastapi-backend)
    - [11a. Overview](#11a-overview)
    - [11b. FastAPI Project Setup](#11b-fastapi-project-setup)
    - [11c. Required API Endpoints](#11c-required-api-endpoints)
    - [11d. CORS Configuration](#11d-cors-configuration)
    - [11e. Connecting the Frontend to FastAPI](#11e-connecting-the-frontend-to-fastapi)
    - [11f. Real-Time Updates (Polling)](#11f-real-time-updates-polling)
    - [11g. Complete FastAPI Implementation](#11g-complete-fastapi-implementation)
    - [11h. Database Integration](#11h-database-integration)
    - [11i. Network Device SNMP/SSH Integration](#11i-network-device-snmpssh-integration)
    - [11j. Deployment](#11j-deployment)
12. [Design System](#12-design-system)
13. [Mock Data Reference](#13-mock-data-reference)
14. [Roadmap / Deferred Features](#14-roadmap--deferred-features)

---

## 1. Project Overview

**FiberNMS** is a full-featured, production-grade, mobile-first SaaS-based Optical Fiber Network Management System frontend. It is purpose-built for:

- **Telecom operators** managing city-scale and national fiber networks
- **ISPs** overseeing OLT → Splitter → ONT/customer topologies
- **NOC teams** needing real-time monitoring, alerting, and fault cascade visualization
- **SaaS providers** operating multi-tenant platforms with subscription billing, usage enforcement, and white-labeling

### What makes FiberNMS different

| Capability | FiberNMS |
|---|---|
| Map + Fault Visualization | Unified Leaflet.js map with device placement, fiber drawing, cascade fault detection, and customer impact highlighting — all on one map |
| Multi-tenant SaaS | 4-tier subscription system (BASIC → ULTRA), per-company usage quotas, plan-based feature gating |
| Super Admin | 10+ dedicated pages: company CRUD, global user management, revenue analytics, security dashboard, audit logs |
| RBAC | 5 roles (superAdmin, admin, engineer, operator, viewer) with role-filtered navigation on both sidebar and mobile drawer |
| Predictive AI | Risk scoring 0–100, anomaly detection, failure ETAs, fiber-cut/signal-degradation/device-failure classification |
| Topology Visualization | Deep-space canvas with OLT section cards, animated data-flow, minimap, sparklines, tabbed device detail panel |
| PWA | Installable as a home-screen app on iOS/Android with service worker and offline caching |
| Mobile-first | Bottom nav bar, hamburger drawer, card views, fullscreen map with floating action buttons, 44px touch targets |

---

## 2. Key Features

### 2.1 NOC Core

- **Network Map** — Leaflet.js interactive map (Voyager/light theme), fiber route drawing, device placement (OLT, ONT, Splitter, Coupler, Router, JJB, Switch), layer toggles, undo history (20 snapshots), root-delete with cascade
- **Devices** — Virtualized table supporting 1000+ devices with virtual scroll, column sort, status filter, quick-edit
- **Topology** — Dual view: OLT Section Cards (each OLT with a mini fiber tree, status summary, color-coded indicators) + Deep-Space Network Graph (WebGL canvas, animated data-flow along fiber edges, minimap, tooltips)
- **Monitoring** — Real-time health dashboard, KPI cards (total devices, uptime %, active alerts, avg latency), pie/line charts, per-device status panel
- **Tools** — Optical power calculator, OTDR simulator, wavelength reference table, fiber loss budget calculator
- **Analytics** — 30-day historical performance trends, throughput/latency/packet-loss charts, regional comparisons

### 2.2 Enterprise Features

- **Workflows** — n8n-style visual automation builder with drag-and-drop node editor, trigger/action/condition nodes, AI-generated workflow suggestions (plan-gated: PROFESSIONAL+)
- **AI Assistant** — Contextual chat assistant with network topology awareness, mobile-responsive three-column layout (sessions sidebar, chat panel, network status panel), streaming responses simulation
- **SLA Dashboard** — SLA compliance per circuit, uptime %, MTTR/MTBF metrics, breach count, penalty exposure calculator (plan-gated: PROFESSIONAL+)
- **Predictive Intelligence** — Risk scoring 0–100, anomaly detection with probability estimates, failure timeline, fiber-cut/signal-degradation/device-failure classification, recommended remediation actions (plan-gated: ENTERPRISE+)
- **Capacity Planning** — Utilization forecast at 6-month and 12-month horizons, port utilization heatmap, capacity exhaustion timeline, region-level bandwidth projections (plan-gated: ENTERPRISE+)

### 2.3 Super Admin System

- **Super Admin Dashboard** — Global KPIs: total companies, total users, MRR, ARR, platform uptime, active incidents
- **Company Management** — Full CRUD for 54+ companies, plan badge, status management (active/suspended/trial/churned), mobile card view + desktop virtualized table
- **Company Detail** — Per-company usage bars, invoice history, audit log tabs, user roster
- **Usage & Limits** — Per-company device quota, API call limits, color-coded progress bars, threshold alerts
- **Global User Management** — Virtual scroll for 1000+ users, filter by company/role/status, session tracking, force logout, bulk CSV import
- **Global Billing** — MRR/ARR/churn%, ARPU, LTV, revenue by plan, cohort analysis
- **Orders & Invoices** — Proration, tax details, PDF/ZIP export, subscription lifecycle events
- **Platform Audit** — Global audit log across all companies, action type filter, timeline view
- **Access Control** — RBAC permission matrix, ABAC rules builder
- **System Alerts** — Platform infrastructure alerts (CPU, memory, disk, network), incident timeline
- **Security Dashboard** — Login heatmap, IP geolocation, MFA adoption %, suspicious activity detection, login trend charts
- **Global Analytics** — Usage heatmap, churn prediction model, device growth forecast

### 2.4 SaaS & Billing

- **Plans** — 4-tier plan comparison table (BASIC / PROFESSIONAL / ENTERPRISE / ULTRA) with feature matrix
- **Billing** — Tenant plan overview, current period charges, invoice history, payment method management
- **Usage Analytics** — Device/alert/API usage trends, quota consumption vs. limit charts
- **Integrations** — API keys management, webhook configuration, third-party integrations panel (plan-gated: ENTERPRISE+)
- **Branding** — White-label customization: logo, color theme, custom domain, email templates (plan-gated: ENTERPRISE+)
- **License** — License key validation, deployment type selection (SaaS/on-prem/hybrid)
- **Tenants** — Multi-tenant management panel for ULTRA plan subscribers
- **Tenant Admin Panel** — Per-company admin view for internal company administrators

### 2.5 Map & Fault Visualization

- **Unified Map** — Single Leaflet.js map combining all map features (no duplicate maps)
- **Device Placement** — Right-click or toolbar button to enter placement mode; choose OLT, ONT, Splitter, Coupler, Router, JJB, or Switch; click to drop; popup form for name + status
- **Device Icons** — Each device type has a unique icon and color: OLT=blue hexagon, ONT=green square, Splitter=orange diamond, Coupler=purple circle, Router=red star, JJB=yellow cross, Switch=teal triangle
- **Fiber Drawing** — Polyline drawing tool with waypoint snapping and automatic route creation
- **Layer Toggles** — Show/hide Backbone, Distribution, Drop layers; Customers/Fiber/Devices layer toggles
- **Undo System** — 20-snapshot undo history; Undo button in toolbar + Ctrl+Z / Cmd+Z keyboard shortcut
- **Root Delete** — Right-click an OLT → "Delete with Children" → cascades to all connected Splitters, ONTs, and fiber routes; confirmation dialog shows affected child count
- **Fault Cascade Logic** — When a device is marked DOWN: device turns red, all downstream nodes turn orange, fiber path highlights red. When a cable is CUT: segment pulses/blinks red, all downstream nodes turn orange
- **Smart Highlight** — Click any device or fiber → entire downstream path highlighted, affected customers identified
- **Side Panel Stats** — Total Customers, Active Customers, Affected Customers, Down Devices (live updated)
- **Alert Banner** — Top banner shows live fault messages: "⚠️ Cable cut detected – N customers affected", "🔴 Splitter down – Area outage"
- **Mobile Map** — Fullscreen with floating action buttons, bottom sheet for device details, constrained between sticky header and bottom nav bar

### 2.6 Mobile-First & Responsive Design

- **Bottom Navigation Bar** — Visible only on mobile/phone screens (Dashboard, Companies, Users, Billing, Alerts); auto-switches to desktop sidebar on larger screens
- **Sticky Mobile Header** — Fixed header with app logo and hamburger menu button
- **Full-Screen Drawer** — Hamburger button opens animated full-page drawer showing all sections filtered by user role; smooth spring transitions, active page highlighting
- **Card Views** — Company list → card view on mobile (name, plan badge, status, quick actions). User list → tappable card feed (tap to expand details)
- **Touch UX** — All interactive elements ≥44px touch targets, horizontal scroll/swipe on charts, smooth scrolling throughout
- **Responsive Pages** — All 37 pages audited and optimized for phone, tablet, and desktop breakpoints
- **Topology Mobile** — Bottom sheet for device details, horizontally scrollable toolbars, fluid SVG mini-trees that scale to any screen width
- **AI Assistant Mobile** — Two toolbar buttons to slide open sessions history (left drawer) and network status panel (right drawer); full three-column layout preserved on desktop

### 2.7 Authentication & RBAC

- **Login** — Professional username/password login, touch-friendly, mobile-optimized
- **Register** — 5-step enterprise registration: personal info → company info → network details → integrations → plan selection
- **Session Management** — Zustand + localStorage persistence; session tracking; force-logout from Super Admin panel
- **RBAC** — 5 roles (superAdmin, admin, engineer, operator, viewer) with role-filtered sidebar, mobile drawer, and bottom navigation
- **Route Guards** — TanStack Router `beforeLoad` guards: unauthenticated users → `/login`, non-super-admins → `/` when accessing `/super-admin/*`
- **ABAC** — Attribute-based access control rules for region-level and device-level permission masking

### 2.8 PWA Support

- **Web App Manifest** — `manifest.json` with app name, icons, display mode, theme color
- **Service Worker** — Offline caching of static assets and last-fetched API responses
- **Install Banner** — Prompt shown on supported browsers for home screen installation
- **Native-like Experience** — Standalone display mode, splash screen, status bar color

### 2.9 Performance

- **Virtual Scroll** — `react-virtualized` / windowing for device tables (1000+ rows) and user lists
- **Lazy Loading** — All 37 pages dynamically imported with `React.lazy()` + `Suspense` skeleton fallbacks
- **Dynamic Imports** — Map component, Topology canvas, and charting libraries loaded on demand
- **PRNG Mock Data** — Mulberry32 PRNG seeded at 42 generates 1000+ deterministic devices in <10ms (no network round-trip, no heavy JSON file)
- **Optimized Re-renders** — Zustand selectors with shallow equality, `useMemo` / `useCallback` on expensive computations
- **React Query** — `staleTime: 30_000` to prevent redundant refetches; `retry: 1` for resilience

### 2.10 Design System

- **Dark Mode Default** — OKLCH-based color tokens with dark/light theme toggle
- **Glassmorphism** — `backdrop-blur`, semi-transparent card backgrounds, frosted glass panels
- **Gradients** — Primary gradient CTA buttons, hero backgrounds, data-flow animations
- **Typography** — Clean, hierarchical font scale with `font-display`, `font-body`, `font-mono` semantic classes
- **Semantic Tokens** — `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border` — never raw Tailwind color classes
- **shadcn/ui** — Full component library: Button, Card, Badge, Avatar, Table, Sheet, Dialog, Select, Input, Tabs, Popover, Drawer, Skeleton, Sonner, ScrollArea, Switch, Textarea

---

## 3. Tech Stack

### Frontend Framework

| Package | Version | Purpose |
|---|---|---|
| `react` | ~19.1.0 | UI framework |
| `react-dom` | ~19.1.0 | DOM rendering |
| `typescript` | ^5.8.3 | Type safety |
| `vite` | ^5.4.1 | Build tool + dev server |

### Routing & State

| Package | Version | Purpose |
|---|---|---|
| `@tanstack/react-router` | ~1.131.8 | Type-safe file router |
| `@tanstack/react-query` | ^5.24.0 | Server state, caching, refetch |
| `zustand` | ~5.0.5 | Client state management |

### UI & Styling

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^3.4.17 | Utility CSS |
| `@tailwindcss/typography` | 0.5.10 | Markdown/prose styling |
| `@tailwindcss/container-queries` | ^0.1.1 | Container query utilities |
| `tailwindcss-animate` | ^1.0.7 | Animation utilities |
| `class-variance-authority` | ^0.7.0 | Variant-based component styles |
| `clsx` | ^2.1.1 | Conditional classNames |
| `tailwind-merge` | ^2.5.2 | Tailwind class deduplication |
| `next-themes` | ~0.4.6 | Dark/light theme toggle |
| `motion` | ^12.34.3 | Framer Motion animations |
| `lucide-react` | 0.511.0 | Icon library |
| `react-icons` | ^5.4.0 | Brand + SI icons |
| `sonner` | ^1.7.4 | Toast notifications |

### shadcn/ui Radix Primitives

| Package | Purpose |
|---|---|
| `@radix-ui/react-dialog` | Modal dialogs |
| `@radix-ui/react-dropdown-menu` | Dropdown menus |
| `@radix-ui/react-select` | Select dropdowns |
| `@radix-ui/react-tabs` | Tab navigation |
| `@radix-ui/react-tooltip` | Tooltips |
| `@radix-ui/react-popover` | Popovers |
| `@radix-ui/react-switch` | Toggle switches |
| `@radix-ui/react-scroll-area` | Custom scroll areas |
| `@radix-ui/react-progress` | Progress bars |
| `@radix-ui/react-accordion` | Accordion panels |
| `@radix-ui/react-slider` | Range sliders |
| `@radix-ui/react-avatar` | Avatar components |
| `@radix-ui/react-badge` | (via CVA) |
| `@radix-ui/react-separator` | Dividers |
| `@radix-ui/react-checkbox` | Checkboxes |
| `@radix-ui/react-radio-group` | Radio buttons |
| `@radix-ui/react-label` | Form labels |
| `@radix-ui/react-alert-dialog` | Confirmation dialogs |
| `@radix-ui/react-collapsible` | Collapsible sections |
| `@radix-ui/react-navigation-menu` | Nav menus |
| `@radix-ui/react-context-menu` | Right-click menus |
| `@radix-ui/react-hover-card` | Hover cards |
| `@radix-ui/react-menubar` | Menu bars |
| `@radix-ui/react-toggle` | Toggle buttons |
| `@radix-ui/react-toggle-group` | Toggle groups |
| `@radix-ui/react-aspect-ratio` | Aspect ratio boxes |
| `vaul` | ^1.1.2 | Drawer/bottom sheet |

### Map & Visualization

| Package | Version | Purpose |
|---|---|---|
| `leaflet` | ^1.9.4 | Interactive map |
| `react-leaflet` | ^5.0.0 | React bindings for Leaflet |
| `recharts` | ^2.15.1 | Charts (line, bar, pie, area, radar) |
| `three` | ^0.176.0 | 3D canvas (topology graph) |
| `@react-three/fiber` | ~9.1.2 | React renderer for Three.js |
| `@react-three/drei` | ~10.0.8 | Three.js helpers |

### Forms & Data

| Package | Version | Purpose |
|---|---|---|
| `react-hook-form` | ^7.53.0 | Form state management |
| `react-markdown` | ^10.1.0 | Markdown renderer (docs page) |
| `remark-gfm` | ^4.0.1 | GitHub Flavored Markdown |
| `react-quill-new` | 3.4.6 | Rich text editor |
| `date-fns` | ^3.6.0 | Date formatting/arithmetic |
| `react-day-picker` | ^9.5.0 | Date picker UI |
| `cmdk` | ^1.0.0 | Command palette |
| `input-otp` | ^1.4.1 | OTP input fields |
| `embla-carousel-react` | ^8.2.1 | Carousel/slider |
| `react-resizable-panels` | ^2.1.7 | Resizable panel layouts |
| `react-use` | ~17.6.0 | Utility hooks |

---

## 4. Architecture Overview

### 4.1 Directory Tree

```
app/src/frontend/
├── env.json                    # Runtime config: backend_host URL
├── index.html                  # App shell, <title>, PWA meta
├── vite.config.js              # Build config, dev server proxy
├── tailwind.config.js          # Design tokens, custom keyframes
├── package.json                # Dependencies
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   └── assets/
│       └── images/             # Static images
└── src/
    ├── main.tsx                # React root mount
    ├── App.tsx                 # Router + providers ONLY
    ├── index.css               # OKLCH design tokens, global styles
    ├── backend.ts              # ICP actor (empty shell for mock mode)
    ├── backend.d.ts            # ICP bindings type definitions
    │
    ├── components/
    │   ├── Layout.tsx          # Root layout: sidebar + header + mobile nav
    │   ├── MobileBottomNav.tsx # Bottom nav bar (mobile only)
    │   ├── MobileDrawer.tsx    # Hamburger full-screen drawer
    │   ├── Sidebar.tsx         # Desktop sidebar (role-filtered menu items)
    │   ├── TopNavbar.tsx       # Desktop top navbar
    │   └── ui/                 # shadcn/ui components (READ-ONLY)
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── badge.tsx
    │       ├── dialog.tsx
    │       ├── input.tsx
    │       ├── select.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── skeleton.tsx
    │       ├── sonner.tsx
    │       └── ... (all 30+ shadcn components)
    │
    ├── config/
    │   └── navigation.ts       # Role-based nav items config
    │
    ├── data/
    │   ├── mockData.ts         # PRNG-seeded mock devices, routes, alerts, SLA, capacity
    │   ├── faultMockData.ts    # Fault visualization nodes and links
    │   ├── superAdminMockData.ts # 54 companies, 1000+ users
    │   └── billingMockData.ts  # Orders, invoices, billing metrics
    │
    ├── hooks/
    │   ├── useAuth.ts          # Auth initialization hook
    │   ├── useQueries.ts       # React Query hooks (backend integration point)
    │   └── useFaultVisualization.ts  # BFS cascade fault logic
    │
    ├── lib/
    │   └── utils.ts            # cn() classname utility (READ-ONLY)
    │
    ├── pages/
    │   ├── Login.tsx
    │   ├── Register.tsx        # 5-step enterprise registration
    │   ├── MapDashboard.tsx    # Primary NOC map (Leaflet + fault viz + device mgmt)
    │   ├── Devices.tsx
    │   ├── Topology.tsx
    │   ├── Monitoring.tsx
    │   ├── Tools.tsx
    │   ├── Analytics.tsx
    │   ├── Workflows.tsx
    │   ├── AIAssistant.tsx
    │   ├── SLADashboard.tsx
    │   ├── PredictiveIntelligence.tsx
    │   ├── CapacityPlanning.tsx
    │   ├── AuditLogs.tsx
    │   ├── FaultVisualizationPage.tsx
    │   ├── Billing.tsx
    │   ├── UsageAnalytics.tsx
    │   ├── Plans.tsx
    │   ├── Integrations.tsx
    │   ├── Branding.tsx
    │   ├── License.tsx
    │   ├── Tenants.tsx
    │   ├── Docs.tsx            # In-app README renderer
    │   └── admin/
    │       ├── SuperAdminDashboard.tsx
    │       ├── CompanyManagement.tsx
    │       ├── CompanyDetail.tsx
    │       ├── UsageLimits.tsx
    │       ├── GlobalUserManagement.tsx
    │       ├── GlobalBilling.tsx
    │       ├── OrdersInvoices.tsx
    │       ├── PlatformAudit.tsx
    │       ├── AccessControl.tsx
    │       ├── SystemAlerts.tsx
    │       ├── SecurityDashboard.tsx
    │       ├── GlobalAnalytics.tsx
    │       └── TenantAdminPanel.tsx
    │
    ├── store/
    │   ├── authStore.ts        # Auth state: currentUser, role, isAuthenticated
    │   ├── networkStore.ts     # Devices, routes, alerts, SLA, undo history
    │   └── subscriptionStore.ts # Plan, device quota, feature flags
    │
    └── types/
        ├── network.ts          # Device, FiberRoute, Alert, SLARecord, etc.
        ├── subscription.ts     # Plan enum, SubscriptionState
        └── superAdmin.ts       # Company, Order, GlobalUser, BillingMetric
```

### 4.2 Zustand Stores

#### `authStore.ts`

```typescript
interface AuthState {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  isSuperAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login(email: string, password: string): Promise<boolean>;
  register(data: RegisterData): Promise<boolean>;
  logout(): void;
  clearError(): void;
}
```

Persisted to `localStorage` key `fibernms:auth` via `zustand/middleware/persist`.

#### `networkStore.ts`

```typescript
interface NetworkState {
  // Core data
  devices: Device[];
  routes: FiberRoute[];
  alerts: Alert[];
  selectedDeviceId: string | null;
  selectedRouteId: string | null;
  layerVisibility: LayerVisibility;

  // Undo system
  history: NetworkSnapshot[];  // max 20 snapshots

  // Enterprise data
  slaRecords: SLARecord[];
  predictiveAlerts: PredictiveAlert[];
  auditLogs: AuditLog[];
  capacityRecords: CapacityRecord[];
  networkLayers: NetworkLayer[];
  simulationMode: boolean;
  activeLayer: "L1" | "L2" | "L3";

  // Actions
  addDevice(device: Device): void;
  updateDevice(id: string, updates: Partial<Device>): void;
  deleteDevice(id: string): void;
  deleteDeviceWithChildren(id: string): void;  // cascade delete
  addRoute(route: FiberRoute): void;
  updateRoute(id: string, updates: Partial<FiberRoute>): void;
  deleteRoute(id: string): void;
  undo(): void;  // restores last snapshot from history
  resolveAlert(id: string): void;
  toggleLayer(layer: keyof LayerVisibility): void;
}
```

All initial data is loaded from `data/mockData.ts` (PRNG-generated). Replace with real API fetches for production.

#### `subscriptionStore.ts`

```typescript
interface SubscriptionState {
  plan: Plan;                    // BASIC | PROFESSIONAL | ENTERPRISE | ULTRA
  deviceQuota: number;           // max devices for current plan
  apiCallQuota: number;          // max API calls/month
  licenseKey: string | null;
  featureFlags: FeatureFlags;    // per-feature boolean gates
  setPlan(plan: Plan): void;
  setLicenseKey(key: string): void;
  isFeatureEnabled(feature: keyof FeatureFlags): boolean;
}
```

### 4.3 Router Setup

TanStack Router with three route groups:

```
rootRoute
├── publicRoute (Outlet — no Layout)
│   ├── /login          — Login page
│   └── /register       — Register page
├── protectedRoute (Layout component — requires isAuthenticated)
│   ├── /               — MapDashboard
│   ├── /devices
│   ├── /topology
│   └── ... (all 22 tenant pages)
└── superAdminRoute (Layout — requires isAuthenticated + isSuperAdmin)
    ├── /super-admin
    ├── /super-admin/companies
    └── ... (all 11 super admin pages)
```

`beforeLoad` guards redirect unauthenticated users to `/login` and non-super-admins away from `/super-admin/*`.

### 4.4 Mock Data Layer

**Location:** `src/data/mockData.ts`, `faultMockData.ts`, `superAdminMockData.ts`, `billingMockData.ts`

**PRNG:** Mulberry32 seeded at `42` — generates 1000+ deterministic devices in milliseconds, no heavy JSON file needed.

```typescript
// Mulberry32 PRNG — deterministic, fast, no dependencies
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
```

All mock data flows into Zustand stores on app initialization. To connect a real backend, replace the mock import in `networkStore.ts` with API fetch calls (see [Section 11e](#11e-connecting-the-frontend-to-fastapi)).

---

## 5. All Pages & Routes

### NOC Core Routes

| Route | Page Component | Description |
|---|---|---|
| `/` | `MapDashboard` | Primary NOC map: Leaflet, device placement, fiber drawing, fault visualization, undo, root delete, layer toggles, side panel stats, alert banner |
| `/devices` | `Devices` | Virtualized device table with virtual scrolling for 1000+ devices; column sort; status filter; inline edit |
| `/topology` | `Topology` | Two views: OLT Section Cards (each OLT with mini fiber tree, status bars) + Deep-Space Network Graph (WebGL canvas, animated data-flow, minimap, device detail panel) |
| `/monitoring` | `Monitoring` | Real-time health dashboard, KPI cards (total devices, uptime %, active alerts, avg latency), pie/line charts, per-device status panel |
| `/tools` | `Tools` | Optical power calculator, OTDR simulator, wavelength reference table, fiber loss budget calculator |
| `/analytics` | `Analytics` | 30-day performance trends, throughput/latency/packet-loss charts, regional comparison |

### Enterprise Routes

| Route | Page Component | Description |
|---|---|---|
| `/workflows` | `Workflows` | n8n-style visual automation builder, drag-and-drop nodes, AI-generated workflow suggestions (PROFESSIONAL+) |
| `/ai` | `AIAssistant` | Contextual AI chat with network awareness, mobile three-column layout with drawer panels |
| `/sla` | `SLADashboard` | SLA compliance per circuit, uptime %, MTTR/MTBF, breach count, penalty exposure (PROFESSIONAL+) |
| `/predictive` | `PredictiveIntelligence` | Risk scoring 0–100, anomaly detection, failure timeline, recommendations (ENTERPRISE+) |
| `/capacity` | `CapacityPlanning` | Utilization forecast 6/12-month, port utilization, exhaustion timeline (ENTERPRISE+) |
| `/audit` | `AuditLogs` | Action history, vertical timeline on mobile, table on desktop, filter by action type |

### SaaS & Administration Routes

| Route | Page Component | Description |
|---|---|---|
| `/billing` | `Billing` | Tenant plan overview, current charges, invoice history, payment method |
| `/usage` | `UsageAnalytics` | Device/alert/API usage trends, quota consumption charts |
| `/plans` | `Plans` | 4-tier plan comparison table with feature matrix and upgrade CTAs |
| `/integrations` | `Integrations` | API keys, webhooks, third-party integrations (ENTERPRISE+) |
| `/settings/branding` | `Branding` | White-label: logo, colors, custom domain, email templates (ENTERPRISE+) |
| `/settings/license` | `License` | License key validation, deployment mode selection |
| `/tenants` | `Tenants` | Multi-tenant management panel (ULTRA only) |
| `/docs` | `Docs` | In-app README.md renderer with navigation, formatted tables, code blocks |

### Authentication Routes

| Route | Page Component | Description |
|---|---|---|
| `/login` | `Login` | Username/password login, mobile-optimized, touch-friendly |
| `/register` | `Register` | 5-step enterprise registration: personal → company → network → integrations → plan |

### Super Admin Routes (requires `superAdmin` role)

| Route | Page Component | Description |
|---|---|---|
| `/super-admin` | `SuperAdminDashboard` | Global KPIs: 54 companies, 1000+ users, MRR, ARR, uptime |
| `/super-admin/companies` | `CompanyManagement` | Company CRUD, plan badges, mobile card view, desktop virtualized table |
| `/super-admin/companies/:companyId` | `CompanyDetail` | Per-company usage bars, invoice history, audit log, user roster |
| `/super-admin/usage` | `UsageLimits` | Per-company device quota and API limits with progress bars |
| `/super-admin/users` | `GlobalUserManagement` | 1000+ user virtual scroll, filter, bulk CSV import, force logout |
| `/super-admin/billing` | `GlobalBilling` | MRR/ARR/churn%, ARPU, LTV, revenue by plan |
| `/super-admin/orders` | `OrdersInvoices` | Proration, tax, PDF/ZIP export, subscription lifecycle |
| `/super-admin/audit` | `PlatformAudit` | Global audit log across all companies |
| `/super-admin/access` | `AccessControl` | RBAC permission matrix, ABAC rules |
| `/super-admin/alerts` | `SystemAlerts` | Platform infrastructure alerts, incident timeline |
| `/super-admin/security` | `SecurityDashboard` | Login heatmap, IP geolocation, MFA %, suspicious activity |
| `/super-admin/analytics` | `GlobalAnalytics` | Usage heatmap, churn prediction, device growth forecast |
| `/tenant-admin/:companyId` | `TenantAdminPanel` | Per-company admin view: users, billing, workflows, settings |

---

## 6. Data Models / TypeScript Types

### Device

```typescript
// src/types/network.ts
export type DeviceType = "OLT" | "ONT" | "Splitter" | "JJB" | "Switch" | "Coupler" | "Router";
export type DeviceStatus = "active" | "faulty" | "warning";

export interface Device {
  id: string;          // Unique identifier (e.g., "dev-001")
  name: string;        // Human-readable name (e.g., "OLT-NORTH-01")
  type: DeviceType;    // Device category
  lat: number;         // Latitude (WGS84)
  lng: number;         // Longitude (WGS84)
  ports: number;       // Number of ports
  status: DeviceStatus;
  connectedTo: string[];  // IDs of connected devices
  location?: string;   // Physical location description
  signalStrength?: number; // Signal level in dBm
  uptime?: number;     // Uptime percentage (0–100)
  region?: string;     // Geographic region label
}
```

### FiberRoute

```typescript
export type RouteType = "backbone" | "distribution" | "drop";

export interface FiberRoute {
  id: string;          // Unique identifier
  name: string;        // Route name (e.g., "BACKBONE-NORTH-1")
  type: RouteType;     // Fiber route classification
  waypoints: { lat: number; lng: number }[];  // GeoJSON-style path
  distanceKm: number;  // Total route length in kilometers
  status: DeviceStatus; // active | faulty | warning
}
```

### Alert

```typescript
export type AlertSeverity = "critical" | "warning" | "info";

export interface Alert {
  id: string;
  deviceId: string;    // Reference to Device.id
  deviceName: string;  // Denormalized for display
  issueType: string;   // e.g., "signal-degradation", "link-down", "port-failure"
  timestamp: number;   // Unix epoch (ms)
  severity: AlertSeverity;
  resolved?: boolean;
}
```

### SLARecord

```typescript
export type SLAStatus = "compliant" | "warning" | "breach";

export interface SLARecord {
  id: string;
  customerId: string;
  customerName: string;
  region: string;
  latency: number;     // Average latency in ms
  packetLoss: number;  // Packet loss percentage
  uptime: number;      // Uptime percentage (0–100)
  status: SLAStatus;
  lastChecked: number; // Unix epoch (ms)
}
```

### PredictiveAlert

```typescript
export interface PredictiveAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  riskScore: number;   // 0–100 (100 = imminent failure)
  failureType: "fiber-cut" | "signal-degradation" | "device-failure";
  predictedETA: number; // Hours until predicted failure
  status: "active" | "resolved";
}
```

### AuditLog

```typescript
export interface AuditLog {
  id: string;
  timestamp: number;   // Unix epoch (ms)
  userId: string;
  userName: string;
  action: string;      // e.g., "Device status changed to faulty"
  actionType: "device-change" | "user-action" | "workflow-execution" | "system";
  targetId: string;    // ID of the affected resource
  targetName: string;  // Denormalized name
  details: string;     // Full human-readable description
  status: "success" | "failure";
}
```

### CapacityRecord

```typescript
export interface CapacityRecord {
  id: string;
  routeId: string;
  routeName: string;
  region: string;
  currentUtilization: number;  // Percentage (0–100)
  maxCapacity: number;          // Maximum capacity in Gbps
  forecastData: { month: string; utilization: number }[];
  exhaustionMonths: number;    // Months until capacity exhaustion
}
```

### Company (Super Admin)

```typescript
// src/types/superAdmin.ts
export type CompanyStatus = "active" | "suspended" | "trial" | "churned";
export type PlanTier = "BASIC" | "PROFESSIONAL" | "ENTERPRISE" | "ULTRA";

export interface Company {
  id: string;
  name: string;
  plan: PlanTier;
  status: CompanyStatus;
  deviceCount: number;
  userCount: number;
  mrr: number;         // Monthly Recurring Revenue in USD
  created: string;     // ISO date string
  country?: string;
  industry?: string;
  contactEmail?: string;
}
```

### Order / Invoice

```typescript
export type OrderStatus = "paid" | "pending" | "overdue";

export interface Order {
  id: string;
  companyId: string;
  companyName: string;
  plan: PlanTier;
  amount: number;       // USD
  status: OrderStatus;
  period: string;       // e.g., "2024-01"
  invoiceUrl?: string;
  taxAmount?: number;
  subtotal?: number;
}
```

### NetworkLayer

```typescript
export interface NetworkLayer {
  type: "L1" | "L2" | "L3";
  visible: boolean;
  name: string;
}
```

---

## 7. Subscription Tiers

| Feature | BASIC | PROFESSIONAL | ENTERPRISE | ULTRA |
|---|---|---|---|---|
| **Price** | $49/mo | $149/mo | $499/mo | $1,499/mo |
| **Device Quota** | 100 | 1,000 | 10,000 | Unlimited |
| **API Calls/mo** | 10,000 | 100,000 | 1,000,000 | Unlimited |
| Map (Leaflet) | ✅ | ✅ | ✅ | ✅ |
| Devices | ✅ | ✅ | ✅ | ✅ |
| Topology | ✅ | ✅ | ✅ | ✅ |
| Monitoring | ✅ | ✅ | ✅ | ✅ |
| Tools | ✅ | ✅ | ✅ | ✅ |
| Analytics | ✅ | ✅ | ✅ | ✅ |
| Audit Logs | ✅ | ✅ | ✅ | ✅ |
| Workflows | ❌ | ✅ | ✅ | ✅ |
| AI Assistant | ❌ | ✅ | ✅ | ✅ |
| SLA Dashboard | ❌ | ✅ | ✅ | ✅ |
| Predictive Intelligence | ❌ | ❌ | ✅ | ✅ |
| Capacity Planning | ❌ | ❌ | ✅ | ✅ |
| Integrations / API Keys | ❌ | ❌ | ✅ | ✅ |
| Branding / White-label | ❌ | ❌ | ✅ | ✅ |
| Multi-tenant Management | ❌ | ❌ | ❌ | ✅ |
| Dedicated Support | ❌ | ❌ | ❌ | ✅ |

Feature gating is implemented in `subscriptionStore.ts` → `featureFlags` object. Pages check `isFeatureEnabled('predictiveIntelligence')` before rendering premium content and show upgrade prompts for locked features.

---

## 8. Role-Based Access Control

### Role Definitions

| Role | Description |
|---|---|
| `superAdmin` | Platform-level administrator; sees all pages including all Super Admin controls |
| `admin` | Tenant administrator; sees NOC, Enterprise, Billing, and Admin sections; no Super Admin panel |
| `engineer` | Network engineer; sees NOC Core, Enterprise (SLA, Predictive AI, Capacity Planning), Audit Logs |
| `operator` | NOC operator; sees Core NOC only (Map, Devices, Topology, Monitoring, Tools, Analytics) |
| `viewer` | Read-only access; sees Map, Devices, Topology, Monitoring, and Analytics only |

### Navigation Matrix

| Section | superAdmin | admin | engineer | operator | viewer |
|---|---|---|---|---|---|
| Map | ✅ | ✅ | ✅ | ✅ | ✅ |
| Devices | ✅ | ✅ | ✅ | ✅ | ✅ |
| Topology | ✅ | ✅ | ✅ | ✅ | ✅ |
| Monitoring | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tools | ✅ | ✅ | ✅ | ✅ | ❌ |
| Analytics | ✅ | ✅ | ✅ | ✅ | ✅ |
| Workflows | ✅ | ✅ | ✅ | ❌ | ❌ |
| AI Assistant | ✅ | ✅ | ✅ | ✅ | ❌ |
| SLA Dashboard | ✅ | ✅ | ✅ | ❌ | ❌ |
| Predictive AI | ✅ | ✅ | ✅ | ❌ | ❌ |
| Capacity Planning | ✅ | ✅ | ✅ | ❌ | ❌ |
| Audit Logs | ✅ | ✅ | ✅ | ❌ | ❌ |
| Billing | ✅ | ✅ | ❌ | ❌ | ❌ |
| Usage Analytics | ✅ | ✅ | ❌ | ❌ | ❌ |
| Plans | ✅ | ✅ | ❌ | ❌ | ❌ |
| Integrations | ✅ | ✅ | ❌ | ❌ | ❌ |
| Branding | ✅ | ✅ | ❌ | ❌ | ❌ |
| License | ✅ | ✅ | ❌ | ❌ | ❌ |
| Tenants | ✅ | ❌ | ❌ | ❌ | ❌ |
| Super Admin | ✅ | ❌ | ❌ | ❌ | ❌ |

Role filtering is applied in `config/navigation.ts` — the same config drives the desktop sidebar, mobile hamburger drawer, and mobile bottom nav bar.

---

## 9. Seed Credentials

Use these accounts to log in and explore different role perspectives:

| Email | Password | Role | Access |
|---|---|---|---|
| `superadmin@fibernms.com` | `SuperAdmin@123` | Super Admin | All pages + all Super Admin controls |
| `admin@fibernms.com` | `Admin@123` | Admin (Tenant Admin) | NOC + Enterprise + Billing + Admin; no Super Admin panel |
| `operator@fibernms.com` | `Operator@123` | NOC Operator | Core NOC only: Map, Devices, Topology, Monitoring, Tools, Analytics, AI |

To create additional accounts, use the Register page (`/register`) with the 5-step enterprise form. New accounts default to the BASIC plan.

---

## 10. Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 8 (`npm install -g pnpm`)
- **Git**

### Installation & Local Dev

```bash
# Clone the repository
git clone https://github.com/Mr-fuaaaadh/fibernms.git
cd fibernms

# Install frontend dependencies
cd src/frontend
pnpm install --prefer-offline

# Start the development server
pnpm dev
```

The app will be available at **http://localhost:5173**

### First Login

1. Open http://localhost:5173
2. You will be redirected to `/login`
3. Log in with any seed credential (see [Section 9](#9-seed-credentials))
4. The Super Admin account (`superadmin@fibernms.com`) shows the full platform

### Available Scripts

```bash
# Run from src/frontend/
pnpm dev          # Start Vite dev server (hot reload)
pnpm build        # Production build → dist/
pnpm typecheck    # TypeScript type checking (no emit)
pnpm check        # Biome linter check
pnpm fix          # Biome linter auto-fix
```

---

## 11. Connecting a Python FastAPI Backend

### 11a. Overview

FiberNMS ships with a complete mock data layer (`mockData.ts`, `faultMockData.ts`, etc.) powered by a deterministic PRNG. This lets the frontend run fully standalone without any backend. When you are ready to manage **real network devices**, you connect a Python FastAPI backend that replaces the mock data with live device state from your actual network infrastructure.

**What a FastAPI backend gives you:**

- Real device data from your OLTs, ONTs, splitters, and routers
- Persistent storage: device configurations and topology survive restarts
- SNMP/SSH polling to pull live metrics (tx/rx power, uptime, port status)
- Centralized fault propagation logic running server-side
- Multi-user: many FiberNMS frontends connect to the same backend
- REST API that FiberNMS frontend calls via HTTP fetch

**Integration approach:**
1. Build a FastAPI app with the required endpoints (see [Section 11c](#11c-required-api-endpoints))
2. Configure CORS so the frontend can call it (see [Section 11d](#11d-cors-configuration))
3. Update `env.json` and `vite.config.js` to point to your FastAPI server
4. Replace mock data imports in `networkStore.ts` with real API calls
5. Replace the in-memory BFS in `useFaultVisualization.ts` with real `/network/nodes` + `/network/links` fetches

---

### 11b. FastAPI Project Setup

#### Install dependencies

```bash
pip install fastapi uvicorn pydantic

# Recommended additions:
pip install sqlalchemy asyncpg python-multipart  # for PostgreSQL
pip install alembic                                # for DB migrations
pip install pysnmp                                 # for SNMP polling
pip install netmiko                                # for SSH device access
pip install python-nmap                            # for device discovery
pip install httpx                                  # for async HTTP
```

#### Recommended project structure

```
fibernms-api/
├── main.py               # FastAPI app, CORS, startup
├── routers/
│   ├── nodes.py          # /network/nodes endpoints
│   ├── links.py          # /network/links endpoints
│   ├── faults.py         # /mark-device-down, /mark-cable-cut, /restore-*
│   ├── alerts.py         # /alerts endpoints
│   └── sla.py            # /sla-records endpoints
├── models.py             # Pydantic schemas (request/response models)
├── database.py           # SQLAlchemy engine + session
├── crud.py               # Database operations
├── polling/
│   ├── snmp_poller.py    # SNMP background polling task
│   └── ssh_collector.py  # SSH-based config retrieval
└── requirements.txt
```

---

### 11c. Required API Endpoints

The FiberNMS frontend expects the following REST endpoints. All endpoints return JSON. All IDs are strings.

#### Network Nodes

```
GET /network/nodes
Response: List[NodeSchema]
```

**NodeSchema:**

| Field | Type | Description |
|---|---|---|
| `id` | `str` | Unique device identifier |
| `name` | `str` | Human-readable name (e.g., "OLT-NORTH-01") |
| `type` | `str` | `"OLT"` \| `"ONT"` \| `"Splitter"` \| `"Coupler"` \| `"Router"` \| `"JJB"` \| `"Switch"` \| `"customer"` |
| `lat` | `float` | Latitude (WGS84) |
| `lng` | `float` | Longitude (WGS84) |
| `status` | `str` | `"active"` \| `"faulty"` \| `"warning"` \| `"affected"` |
| `parent_id` | `str \| None` | Parent node ID (e.g., Splitter's OLT) |
| `region` | `str \| None` | Geographic region label |
| `uptime` | `float \| None` | Uptime percentage (0–100) |
| `tx_power` | `float \| None` | Transmit power in dBm |
| `rx_power` | `float \| None` | Receive power in dBm |
| `ports` | `int \| None` | Number of ports |
| `location` | `str \| None` | Physical location description |

#### Network Links

```
GET /network/links
Response: List[LinkSchema]
```

**LinkSchema:**

| Field | Type | Description |
|---|---|---|
| `id` | `str` | Unique link identifier |
| `from_node` | `str` | Source node ID |
| `to_node` | `str` | Destination node ID |
| `status` | `str` | `"active"` \| `"cut"` \| `"affected"` |
| `route_type` | `str` | `"backbone"` \| `"distribution"` \| `"drop"` |
| `distance_km` | `float \| None` | Route length in kilometers |

#### Device Management

```
POST /network/nodes
Body: NodeSchema (without id — id is auto-generated server-side)
Response: NodeSchema (with id assigned)

PUT /network/nodes/{node_id}
Body: Partial NodeSchema
Response: NodeSchema (updated)

DELETE /network/nodes/{node_id}
Response: { "deleted": true }

DELETE /network/nodes/{node_id}/cascade
Description: Delete device AND all children (downstream devices connected via links)
Response: { "deleted": true, "affected_count": int }
```

#### Route Management

```
POST /network/links
Body: LinkSchema (without id)
Response: LinkSchema (with id assigned)

PUT /network/links/{link_id}
Body: Partial LinkSchema
Response: LinkSchema (updated)

DELETE /network/links/{link_id}
Response: { "deleted": true }
```

#### Fault Management

```
POST /mark-device-down
Body: { "node_id": str }
Response: {
  "updated_nodes": List[str],      // all node IDs now marked as faulty/affected
  "updated_links": List[str],      // all link IDs now marked as affected
  "affected_customers": int        // count of downstream customer nodes
}

POST /mark-cable-cut
Body: { "link_id": str }
Response: {
  "updated_nodes": List[str],
  "updated_links": List[str],
  "affected_customers": int
}

POST /restore-device
Body: { "node_id": str }
Response: { "restored_nodes": List[str], "restored_links": List[str] }

POST /restore-link
Body: { "link_id": str }
Response: { "restored_nodes": List[str], "restored_links": List[str] }
```

#### Alerts

```
GET /alerts
Query params: status=active|resolved, severity=critical|warning|info
Response: List[AlertSchema]

AlertSchema {
  id: str
  device_id: str
  device_name: str
  issue_type: str
  timestamp: int        // Unix epoch ms
  severity: str         // "critical" | "warning" | "info"
  resolved: bool
}

POST /alerts/{alert_id}/acknowledge
Response: AlertSchema (with resolved=true)
```

#### SLA Records

```
GET /sla-records
Query params: circuit_id=..., region=...
Response: List[SLARecordSchema]

SLARecordSchema {
  id: str
  customer_id: str
  customer_name: str
  region: str
  latency: float        // ms
  packet_loss: float    // percent
  uptime: float         // percent
  status: str           // "compliant" | "warning" | "breach"
  last_checked: int     // Unix epoch ms
}
```

---

### 11d. CORS Configuration

FiberNMS dev server runs on `http://localhost:5173` (Vite default). Your FastAPI server must allow this origin.

```python
# In main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FiberNMS API", version="1.0.0")

# ─── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # Alternative dev port
        "https://fibernms.yourdomain.com",  # Production domain
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)
```

For development, you can also allow all origins (not recommended for production):

```python
allow_origins=["*"],  # Only for local development!
```

---

### 11e. Connecting the Frontend to FastAPI

Follow these steps in order to replace mock data with real API calls.

#### Step 1 — Set the backend host in `env.json`

```json
// src/frontend/env.json
{
  "backend_host": "http://localhost:8000"
}
```

At runtime, the frontend loads this file to know where the FastAPI server is.

#### Step 2 — Update `vite.config.js` proxy (optional for dev)

For local development, you can proxy `/api` calls to avoid CORS issues entirely:

```javascript
// src/frontend/vite.config.js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8000",  // Point to your FastAPI server
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),  // Strip /api prefix
    },
  },
},
```

With this proxy, frontend calls to `/api/network/nodes` are forwarded to `http://localhost:8000/network/nodes`.

#### Step 3 — Create `src/lib/api.ts`

Create a centralized API utility that reads `backend_host` from `env.json` and provides typed fetch helpers:

```typescript
// src/frontend/src/lib/api.ts

interface EnvConfig {
  backend_host: string;
}

let _baseUrl: string | null = null;

async function getBaseUrl(): Promise<string> {
  if (_baseUrl) return _baseUrl;
  try {
    const response = await fetch("/env.json");
    const config: EnvConfig = await response.json();
    _baseUrl = config.backend_host ?? "";
  } catch {
    _baseUrl = "";
  }
  return _baseUrl;
}

export async function apiGet<T>(path: string): Promise<T> {
  const base = await getBaseUrl();
  const response = await fetch(`${base}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`GET ${path} failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const base = await getBaseUrl();
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`POST ${path} failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const base = await getBaseUrl();
  const response = await fetch(`${base}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`PUT ${path} failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function apiDelete<T>(path: string): Promise<T> {
  const base = await getBaseUrl();
  const response = await fetch(`${base}${path}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`DELETE ${path} failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
```

#### Step 4 — Replace mock data in `networkStore.ts`

Open `src/store/networkStore.ts`. Find the mock data import at the top:

```typescript
// BEFORE: mock data import
import {
  mockDevices,
  mockRoutes,
  mockAlerts,
  mockSLARecords,
  mockPredictiveAlerts,
  mockAuditLogs,
  mockCapacityRecords,
} from "../data/mockData";
```

Replace with a `fetchDevices()` pattern using `api.ts`:

```typescript
// AFTER: real API calls
import { apiGet } from "../lib/api";
import type { Device, FiberRoute, Alert } from "../types/network";

// Add a new async action to the store
interface NetworkState {
  // ... existing state fields ...
  fetchFromApi(): Promise<void>;  // Add this action
}

// In the store implementation:
fetchFromApi: async () => {
  try {
    const [devices, routes, alerts] = await Promise.all([
      apiGet<Device[]>("/network/nodes"),
      apiGet<FiberRoute[]>("/network/links"),
      apiGet<Alert[]>("/alerts?status=active"),
    ]);
    set({ devices, routes, alerts });
  } catch (error) {
    console.error("Failed to fetch network data:", error);
  }
},
```

Then call `fetchFromApi()` in `App.tsx` or your root component on mount:

```typescript
// In App.tsx or a top-level component
import { useNetworkStore } from "@/store/networkStore";
import { useEffect } from "react";

function NetworkDataLoader() {
  const fetchFromApi = useNetworkStore((s) => s.fetchFromApi);
  useEffect(() => {
    fetchFromApi();
  }, [fetchFromApi]);
  return null;
}
```

#### Step 5 — Replace fault visualization mock in `useFaultVisualization.ts`

Open `src/hooks/useFaultVisualization.ts`. The current implementation uses in-memory BFS on the mock `faultMockData.ts`. Replace with real API fetches:

```typescript
// src/hooks/useFaultVisualization.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api";

// Types matching the API schemas
interface FaultNode {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  status: "active" | "faulty" | "warning" | "affected";
  parent_id: string | null;
}

interface FaultLink {
  id: string;
  from_node: string;
  to_node: string;
  status: "active" | "cut" | "affected";
  route_type: string;
}

export function useFaultVisualization() {
  const queryClient = useQueryClient();

  const nodesQuery = useQuery({
    queryKey: ["fault-nodes"],
    queryFn: () => apiGet<FaultNode[]>("/network/nodes"),
  });

  const linksQuery = useQuery({
    queryKey: ["fault-links"],
    queryFn: () => apiGet<FaultLink[]>("/network/links"),
  });

  const markDeviceDown = useMutation({
    mutationFn: (nodeId: string) =>
      apiPost("/mark-device-down", { node_id: nodeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fault-nodes"] });
      queryClient.invalidateQueries({ queryKey: ["fault-links"] });
    },
  });

  const markCableCut = useMutation({
    mutationFn: (linkId: string) =>
      apiPost("/mark-cable-cut", { link_id: linkId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fault-nodes"] });
      queryClient.invalidateQueries({ queryKey: ["fault-links"] });
    },
  });

  return {
    nodes: nodesQuery.data ?? [],
    links: linksQuery.data ?? [],
    isLoading: nodesQuery.isLoading || linksQuery.isLoading,
    markDeviceDown: markDeviceDown.mutate,
    markCableCut: markCableCut.mutate,
  };
}
```

#### Step 6 — Wire fault simulation buttons

In `MapDashboard.tsx`, replace the current in-memory fault simulation handlers with the mutations from `useFaultVisualization`:

```typescript
// MapDashboard.tsx
import { useFaultVisualization } from "@/hooks/useFaultVisualization";

function MapDashboard() {
  const { nodes, links, markDeviceDown, markCableCut } = useFaultVisualization();

  // These now call the real FastAPI endpoints:
  function handleSimulateDeviceDown(nodeId: string) {
    markDeviceDown(nodeId);
  }

  function handleSimulateCableCut(linkId: string) {
    markCableCut(linkId);
  }

  // ... rest of component
}
```

---

### 11f. Real-Time Updates (Polling)

FiberNMS uses an EventBus pattern internally for simulated real-time updates. When connected to a real FastAPI backend, implement polling to keep the UI in sync with live network state.

#### React Query polling

```typescript
// In a component or useQueries.ts hook
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type { Device } from "@/types/network";

export function useLiveDevices() {
  return useQuery({
    queryKey: ["live-devices"],
    queryFn: () => apiGet<Device[]>("/network/nodes"),
    refetchInterval: 10_000,    // Refetch every 10 seconds
    refetchIntervalInBackground: false,  // Pause when tab is hidden
    staleTime: 5_000,
  });
}

export function useLiveAlerts() {
  return useQuery({
    queryKey: ["live-alerts"],
    queryFn: () => apiGet("/alerts?status=active"),
    refetchInterval: 5_000,    // Poll every 5 seconds for alerts
    refetchIntervalInBackground: false,
  });
}
```

#### Polling with visual indicator

Show a "live" badge that pulses green when polling is active:

```typescript
const { dataUpdatedAt, isFetching } = useLiveDevices();

return (
  <div className="flex items-center gap-2">
    <span className={`w-2 h-2 rounded-full ${isFetching ? "bg-green-500 animate-pulse" : "bg-muted"}`} />
    <span className="text-xs text-muted-foreground">
      Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
    </span>
  </div>
);
```

#### Polling intervals recommendation

| Data type | Interval | Reason |
|---|---|---|
| Network nodes / topology | 30s | Topology changes rarely |
| Active alerts | 5s | Faults need fast detection |
| SLA metrics | 60s | SLA is computed periodically |
| Capacity data | 300s | Capacity changes slowly |
| Predictive alerts | 60s | ML inference runs periodically |

---

### 11g. Complete FastAPI Implementation

Below is a full, working `main.py` that implements all required endpoints. Use this as your starting point.

```python
# fibernms-api/main.py

from __future__ import annotations
import uuid
from collections import deque
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ─── App + CORS ────────────────────────────────────────────────────────────────

app = FastAPI(
    title="FiberNMS API",
    description="Backend API for FiberNMS Optical Fiber Network Management System",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://fibernms.yourdomain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Pydantic Models ───────────────────────────────────────────────────────────

class NodeBase(BaseModel):
    name: str
    type: str  # OLT | ONT | Splitter | Coupler | Router | JJB | Switch | customer
    lat: float
    lng: float
    status: str = "active"  # active | faulty | warning | affected
    parent_id: Optional[str] = None
    region: Optional[str] = None
    uptime: Optional[float] = None
    tx_power: Optional[float] = None
    rx_power: Optional[float] = None
    ports: Optional[int] = None
    location: Optional[str] = None

class NodeSchema(NodeBase):
    id: str

class NodeCreate(NodeBase):
    pass

class LinkBase(BaseModel):
    from_node: str
    to_node: str
    status: str = "active"  # active | cut | affected
    route_type: str = "distribution"  # backbone | distribution | drop
    distance_km: Optional[float] = None

class LinkSchema(LinkBase):
    id: str

class LinkCreate(LinkBase):
    pass

class AlertSchema(BaseModel):
    id: str
    device_id: str
    device_name: str
    issue_type: str
    timestamp: int
    severity: str
    resolved: bool = False

class SLARecordSchema(BaseModel):
    id: str
    customer_id: str
    customer_name: str
    region: str
    latency: float
    packet_loss: float
    uptime: float
    status: str
    last_checked: int

# ─── In-Memory Store (replace with SQLAlchemy for production) ─────────────────

nodes: dict[str, dict] = {}
links: dict[str, dict] = {}
alerts: dict[str, dict] = {}
sla_records: dict[str, dict] = {}

# ─── Seed Data ────────────────────────────────────────────────────────────────

def seed_data():
    import time
    now_ms = int(time.time() * 1000)

    # 5 OLTs
    olt_ids = []
    for i, (lat, lng, region) in enumerate([
        (40.7128, -74.0060, "North"),
        (40.7580, -73.9855, "South"),
        (40.6892, -74.0445, "East"),
        (40.7282, -73.7949, "West"),
        (40.7489, -73.9680, "Central"),
    ], 1):
        olt_id = f"olt-{i:03d}"
        nodes[olt_id] = {
            "id": olt_id, "name": f"OLT-{region.upper()}-{i:02d}",
            "type": "OLT", "lat": lat, "lng": lng, "status": "active",
            "parent_id": None, "region": region, "uptime": 99.8,
            "tx_power": 2.5, "rx_power": -8.3, "ports": 16,
        }
        olt_ids.append(olt_id)

    # 15 Splitters (3 per OLT)
    splitter_ids = []
    for j, olt_id in enumerate(olt_ids):
        olt = nodes[olt_id]
        for k in range(3):
            sp_id = f"sp-{j*3+k+1:03d}"
            nodes[sp_id] = {
                "id": sp_id, "name": f"SPLIT-{olt['region']}-{k+1:02d}",
                "type": "Splitter", "lat": olt["lat"] + (k-1)*0.005,
                "lng": olt["lng"] + (k-1)*0.005, "status": "active",
                "parent_id": olt_id, "region": olt["region"], "uptime": 99.5,
                "tx_power": -3.5, "rx_power": -12.0, "ports": 8,
            }
            splitter_ids.append(sp_id)
            links[f"link-olt-sp-{sp_id}"] = {
                "id": f"link-olt-sp-{sp_id}", "from_node": olt_id,
                "to_node": sp_id, "status": "active",
                "route_type": "distribution", "distance_km": 1.2,
            }

    # 50 ONTs (3-4 per splitter)
    ont_count = 0
    for sp_id in splitter_ids:
        sp = nodes[sp_id]
        for m in range(3):
            ont_count += 1
            ont_id = f"ont-{ont_count:04d}"
            nodes[ont_id] = {
                "id": ont_id, "name": f"ONT-{ont_count:04d}",
                "type": "ONT", "lat": sp["lat"] + (m-1)*0.002,
                "lng": sp["lng"] + (m-1)*0.002, "status": "active",
                "parent_id": sp_id, "region": sp["region"], "uptime": 99.1,
                "tx_power": -5.0, "rx_power": -18.0, "ports": 1,
            }
            links[f"link-sp-ont-{ont_id}"] = {
                "id": f"link-sp-ont-{ont_id}", "from_node": sp_id,
                "to_node": ont_id, "status": "active",
                "route_type": "drop", "distance_km": 0.3,
            }

    # 30 customer nodes
    for c in range(1, 31):
        cust_id = f"cust-{c:03d}"
        nearest_ont = f"ont-{((c-1) % ont_count)+1:04d}"
        ont_node = nodes.get(nearest_ont, list(nodes.values())[-1])
        nodes[cust_id] = {
            "id": cust_id, "name": f"Customer-{c:03d}",
            "type": "customer", "lat": ont_node["lat"] + (c%5)*0.001,
            "lng": ont_node["lng"] + (c%5)*0.001, "status": "active",
            "parent_id": nearest_ont, "region": ont_node["region"],
            "uptime": 98.5, "tx_power": None, "rx_power": -22.0, "ports": 1,
        }
        links[f"link-ont-cust-{cust_id}"] = {
            "id": f"link-ont-cust-{cust_id}", "from_node": nearest_ont,
            "to_node": cust_id, "status": "active",
            "route_type": "drop", "distance_km": 0.1,
        }

    # Sample alerts
    alerts["alert-001"] = {
        "id": "alert-001", "device_id": "olt-001", "device_name": "OLT-NORTH-01",
        "issue_type": "signal-degradation", "timestamp": now_ms - 300_000,
        "severity": "warning", "resolved": False,
    }
    alerts["alert-002"] = {
        "id": "alert-002", "device_id": "sp-001", "device_name": "SPLIT-North-01",
        "issue_type": "high-packet-loss", "timestamp": now_ms - 120_000,
        "severity": "critical", "resolved": False,
    }

    # Sample SLA records
    sla_records["sla-001"] = {
        "id": "sla-001", "customer_id": "cust-001", "customer_name": "Customer-001",
        "region": "North", "latency": 4.2, "packet_loss": 0.1, "uptime": 99.9,
        "status": "compliant", "last_checked": now_ms - 60_000,
    }
    sla_records["sla-002"] = {
        "id": "sla-002", "customer_id": "cust-015", "customer_name": "Customer-015",
        "region": "South", "latency": 12.8, "packet_loss": 2.3, "uptime": 97.1,
        "status": "breach", "last_checked": now_ms - 60_000,
    }


seed_data()

# ─── BFS Fault Cascade ────────────────────────────────────────────────────────

def get_children(node_id: str) -> list[str]:
    """Return all direct children of node_id based on links."""
    return [
        link["to_node"] for link in links.values()
        if link["from_node"] == node_id
    ]

def cascade_fault_from_node(node_id: str) -> tuple[list[str], list[str], int]:
    """BFS from node_id, marking all downstream nodes as 'affected' and links as 'affected'."""
    visited_nodes: list[str] = []
    visited_links: list[str] = []
    customer_count = 0
    queue: deque[str] = deque([node_id])
    seen: set[str] = {node_id}

    nodes[node_id]["status"] = "faulty"
    visited_nodes.append(node_id)

    while queue:
        current = queue.popleft()
        for link in links.values():
            if link["from_node"] == current:
                child_id = link["to_node"]
                link["status"] = "affected"
                visited_links.append(link["id"])
                if child_id not in seen:
                    seen.add(child_id)
                    if child_id in nodes:
                        nodes[child_id]["status"] = "affected"
                        visited_nodes.append(child_id)
                        if nodes[child_id]["type"] == "customer":
                            customer_count += 1
                    queue.append(child_id)

    return visited_nodes, visited_links, customer_count


def cascade_fault_from_link(link_id: str) -> tuple[list[str], list[str], int]:
    """Mark the link as 'cut' and cascade fault to all downstream nodes."""
    if link_id not in links:
        raise HTTPException(status_code=404, detail=f"Link {link_id} not found")
    links[link_id]["status"] = "cut"
    downstream_node = links[link_id]["to_node"]
    visited_nodes, visited_links, customer_count = cascade_fault_from_node(downstream_node)
    nodes[downstream_node]["status"] = "affected"  # Downstream starts as affected, not faulty
    return visited_nodes, [link_id] + visited_links, customer_count


def cascade_restore(node_id: str) -> tuple[list[str], list[str]]:
    """Recursively restore a node and all its downstream nodes to 'active'."""
    visited_nodes: list[str] = [node_id]
    visited_links: list[str] = []
    queue: deque[str] = deque([node_id])
    seen: set[str] = {node_id}

    nodes[node_id]["status"] = "active"

    while queue:
        current = queue.popleft()
        for link in links.values():
            if link["from_node"] == current:
                link["status"] = "active"
                visited_links.append(link["id"])
                child_id = link["to_node"]
                if child_id not in seen:
                    seen.add(child_id)
                    if child_id in nodes:
                        nodes[child_id]["status"] = "active"
                        visited_nodes.append(child_id)
                    queue.append(child_id)

    return visited_nodes, visited_links


# ─── Node Endpoints ───────────────────────────────────────────────────────────

@app.get("/network/nodes", response_model=list[NodeSchema])
def get_nodes():
    return list(nodes.values())


@app.post("/network/nodes", response_model=NodeSchema, status_code=201)
def create_node(body: NodeCreate):
    node_id = f"node-{uuid.uuid4().hex[:8]}"
    new_node = {"id": node_id, **body.model_dump()}
    nodes[node_id] = new_node
    return new_node


@app.put("/network/nodes/{node_id}", response_model=NodeSchema)
def update_node(node_id: str, body: NodeCreate):
    if node_id not in nodes:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")
    nodes[node_id].update(body.model_dump(exclude_none=True))
    return nodes[node_id]


@app.delete("/network/nodes/{node_id}")
def delete_node(node_id: str):
    if node_id not in nodes:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")
    del nodes[node_id]
    # Remove all links connected to this node
    to_delete = [k for k, v in links.items() if v["from_node"] == node_id or v["to_node"] == node_id]
    for k in to_delete:
        del links[k]
    return {"deleted": True}


@app.delete("/network/nodes/{node_id}/cascade")
def cascade_delete_node(node_id: str):
    """Delete node and all descendants (BFS)."""
    if node_id not in nodes:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")
    to_remove: set[str] = {node_id}
    queue: deque[str] = deque([node_id])
    while queue:
        current = queue.popleft()
        for link in links.values():
            if link["from_node"] == current:
                child = link["to_node"]
                if child not in to_remove:
                    to_remove.add(child)
                    queue.append(child)

    affected_count = len(to_remove) - 1
    for nid in to_remove:
        nodes.pop(nid, None)
    links_to_delete = [k for k, v in links.items() if v["from_node"] in to_remove or v["to_node"] in to_remove]
    for k in links_to_delete:
        links.pop(k, None)
    return {"deleted": True, "affected_count": affected_count}


# ─── Link Endpoints ───────────────────────────────────────────────────────────

@app.get("/network/links", response_model=list[LinkSchema])
def get_links():
    return list(links.values())


@app.post("/network/links", response_model=LinkSchema, status_code=201)
def create_link(body: LinkCreate):
    link_id = f"link-{uuid.uuid4().hex[:8]}"
    new_link = {"id": link_id, **body.model_dump()}
    links[link_id] = new_link
    return new_link


@app.put("/network/links/{link_id}", response_model=LinkSchema)
def update_link(link_id: str, body: LinkCreate):
    if link_id not in links:
        raise HTTPException(status_code=404, detail=f"Link {link_id} not found")
    links[link_id].update(body.model_dump(exclude_none=True))
    return links[link_id]


@app.delete("/network/links/{link_id}")
def delete_link(link_id: str):
    if link_id not in links:
        raise HTTPException(status_code=404, detail=f"Link {link_id} not found")
    del links[link_id]
    return {"deleted": True}


# ─── Fault Management Endpoints ───────────────────────────────────────────────

@app.post("/mark-device-down")
def mark_device_down(body: dict):
    node_id = body.get("node_id")
    if not node_id or node_id not in nodes:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")
    updated_nodes, updated_links, affected_customers = cascade_fault_from_node(node_id)
    return {
        "updated_nodes": updated_nodes,
        "updated_links": updated_links,
        "affected_customers": affected_customers,
    }


@app.post("/mark-cable-cut")
def mark_cable_cut(body: dict):
    link_id = body.get("link_id")
    if not link_id or link_id not in links:
        raise HTTPException(status_code=404, detail=f"Link {link_id} not found")
    updated_nodes, updated_links, affected_customers = cascade_fault_from_link(link_id)
    return {
        "updated_nodes": updated_nodes,
        "updated_links": updated_links,
        "affected_customers": affected_customers,
    }


@app.post("/restore-device")
def restore_device(body: dict):
    node_id = body.get("node_id")
    if not node_id or node_id not in nodes:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")
    restored_nodes, restored_links = cascade_restore(node_id)
    return {"restored_nodes": restored_nodes, "restored_links": restored_links}


@app.post("/restore-link")
def restore_link(body: dict):
    link_id = body.get("link_id")
    if not link_id or link_id not in links:
        raise HTTPException(status_code=404, detail=f"Link {link_id} not found")
    links[link_id]["status"] = "active"
    downstream = links[link_id]["to_node"]
    restored_nodes, restored_links = cascade_restore(downstream)
    return {"restored_nodes": restored_nodes, "restored_links": [link_id] + restored_links}


# ─── Alert Endpoints ──────────────────────────────────────────────────────────

@app.get("/alerts", response_model=list[AlertSchema])
def get_alerts(status: Optional[str] = None, severity: Optional[str] = None):
    result = list(alerts.values())
    if status == "active":
        result = [a for a in result if not a["resolved"]]
    elif status == "resolved":
        result = [a for a in result if a["resolved"]]
    if severity:
        result = [a for a in result if a["severity"] == severity]
    return result


@app.post("/alerts/{alert_id}/acknowledge", response_model=AlertSchema)
def acknowledge_alert(alert_id: str):
    if alert_id not in alerts:
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")
    alerts[alert_id]["resolved"] = True
    return alerts[alert_id]


# ─── SLA Records ──────────────────────────────────────────────────────────────

@app.get("/sla-records", response_model=list[SLARecordSchema])
def get_sla_records(circuit_id: Optional[str] = None, region: Optional[str] = None):
    result = list(sla_records.values())
    if circuit_id:
        result = [r for r in result if r["customer_id"] == circuit_id]
    if region:
        result = [r for r in result if r["region"] == region]
    return result


# ─── Health Check ─────────────────────────────────────────────────────────────

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "nodes": len(nodes),
        "links": len(links),
        "alerts": len([a for a in alerts.values() if not a["resolved"]]),
    }


# ─── Run ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

#### Run the API

```bash
cd fibernms-api
python main.py
# or:
uvicorn main:app --reload --port 8000
```

Open the interactive API docs at: **http://localhost:8000/docs**

---

### 11h. Database Integration

The sample `main.py` uses an in-memory dict store. For persistence, replace it with SQLAlchemy.

#### SQLite (development — zero setup)

```python
# database.py
from sqlalchemy import create_engine, Column, String, Float, Boolean, Integer, Text
from sqlalchemy.orm import declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./fibernms.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DeviceModel(Base):
    __tablename__ = "devices"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    status = Column(String, default="active")
    parent_id = Column(String, nullable=True)
    region = Column(String, nullable=True)
    uptime = Column(Float, nullable=True)
    tx_power = Column(Float, nullable=True)
    rx_power = Column(Float, nullable=True)
    ports = Column(Integer, nullable=True)
    location = Column(Text, nullable=True)

class LinkModel(Base):
    __tablename__ = "links"
    id = Column(String, primary_key=True, index=True)
    from_node = Column(String, nullable=False)
    to_node = Column(String, nullable=False)
    status = Column(String, default="active")
    route_type = Column(String, default="distribution")
    distance_km = Column(Float, nullable=True)

Base.metadata.create_all(bind=engine)
```

#### PostgreSQL (production)

```bash
pip install asyncpg sqlalchemy[asyncio] alembic
```

```python
# database.py (async PostgreSQL)
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/fibernms"

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with async_session() as session:
        yield session
```

Run migrations with Alembic:

```bash
alembic init alembic
alembic revision --autogenerate -m "initial schema"
alembic upgrade head
```

---

### 11i. Network Device SNMP/SSH Integration

Once you have the FastAPI backend running, extend it to pull **real live data from actual network hardware** using SNMP or SSH.

#### SNMP Polling with `pysnmp`

SNMP (Simple Network Management Protocol) is the industry standard for polling network device metrics — uptime, port status, tx/rx power on OLTs, etc.

```python
# polling/snmp_poller.py
from pysnmp.hlapi import (
    SnmpEngine, CommunityData, UdpTransportTarget,
    ContextData, ObjectType, ObjectIdentity, getCmd
)

# Standard OIDs (works on most OLTs and switches)
OID_UPTIME     = "1.3.6.1.2.1.1.3.0"       # sysUpTime
OID_SYS_NAME   = "1.3.6.1.2.1.1.5.0"       # sysName
OID_IF_IN_OCTETS  = "1.3.6.1.2.1.2.2.1.10" # ifInOctets (per port)
OID_IF_OUT_OCTETS = "1.3.6.1.2.1.2.2.1.16" # ifOutOctets (per port)

def snmp_poll_device(host: str, community: str = "public") -> dict:
    """Poll a network device via SNMP and return key metrics."""
    result = {"host": host, "uptime": None, "sys_name": None, "error": None}
    
    for oid_name, oid in [("uptime", OID_UPTIME), ("sys_name", OID_SYS_NAME)]:
        error_indication, error_status, error_index, var_binds = next(
            getCmd(
                SnmpEngine(),
                CommunityData(community, mpModel=1),
                UdpTransportTarget((host, 161), timeout=2, retries=1),
                ContextData(),
                ObjectType(ObjectIdentity(oid)),
            )
        )
        if error_indication:
            result["error"] = str(error_indication)
            return result
        for var_bind in var_binds:
            result[oid_name] = var_bind[1].prettyPrint()
    
    return result

# Example usage:
# metrics = snmp_poll_device("192.168.1.100", "public")
# print(metrics)
# → {"host": "192.168.1.100", "uptime": "3 days, 4:22:15", "sys_name": "OLT-NORTH-01"}
```

#### SSH-Based Config Retrieval with `netmiko`

For devices that don't support SNMP, use SSH to retrieve running configurations:

```python
# polling/ssh_collector.py
from netmiko import ConnectHandler

def ssh_get_device_info(host: str, username: str, password: str, device_type: str = "cisco_ios") -> dict:
    """Connect to a device via SSH and pull interface status."""
    device = {
        "device_type": device_type,
        "host": host,
        "username": username,
        "password": password,
        "timeout": 10,
    }
    
    with ConnectHandler(**device) as conn:
        show_interfaces = conn.send_command("show interfaces status")
        show_version = conn.send_command("show version")
    
    return {
        "host": host,
        "interfaces": show_interfaces,
        "version": show_version,
    }

# Supported device types: cisco_ios, cisco_nxos, juniper, huawei, zte, nokia_sros, etc.
# Full list: https://ktbyers.github.io/netmiko/PLATFORMS.html
```

#### Device Discovery with `nmap`

Discover live devices in a network range:

```python
# polling/discovery.py
import nmap

def discover_devices(network_range: str = "192.168.1.0/24") -> list[dict]:
    """Scan a network range and return live hosts with open ports."""
    nm = nmap.PortScanner()
    nm.scan(hosts=network_range, arguments="-sP")  # Ping scan
    
    devices = []
    for host in nm.all_hosts():
        if nm[host].state() == "up":
            devices.append({
                "ip": host,
                "hostname": nm[host].hostname(),
                "status": "active",
            })
    
    return devices

# Example: discover_devices("10.0.0.0/24")
```

#### Background Polling Loop in FastAPI

Use FastAPI's startup event + `asyncio` to run periodic polling in the background:

```python
# main.py additions

import asyncio
from contextlib import asynccontextmanager

async def polling_loop():
    """Background task: poll all OLTs via SNMP every 60 seconds."""
    while True:
        await asyncio.sleep(60)
        for node_id, node in nodes.items():
            if node["type"] == "OLT" and node.get("ip_address"):
                try:
                    # Run SNMP in a thread pool (pysnmp is synchronous)
                    metrics = await asyncio.get_event_loop().run_in_executor(
                        None, snmp_poll_device, node["ip_address"], "public"
                    )
                    if not metrics.get("error"):
                        # Update node in the store
                        nodes[node_id]["uptime"] = float(metrics.get("uptime", "0").split()[0]) if metrics.get("uptime") else None
                        nodes[node_id]["name"] = metrics.get("sys_name") or node["name"]
                except Exception as e:
                    print(f"SNMP poll failed for {node_id}: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start background polling task
    task = asyncio.create_task(polling_loop())
    yield
    # Cancel polling task on shutdown
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass

app = FastAPI(title="FiberNMS API", lifespan=lifespan)
```

Add `ip_address` field to `NodeSchema` (and the in-memory store) so the poller knows which IP to poll:

```python
class NodeBase(BaseModel):
    # ... existing fields ...
    ip_address: Optional[str] = None  # Device management IP for SNMP/SSH
```

---

### 11j. Deployment

#### Development

Run both services locally:

```bash
# Terminal 1: FiberNMS frontend (http://localhost:5173)
cd app/src/frontend
pnpm dev

# Terminal 2: FastAPI backend (http://localhost:8000)
cd fibernms-api
uvicorn main:app --reload --port 8000
```

Update `src/frontend/env.json`:

```json
{ "backend_host": "http://localhost:8000" }
```

#### Production Build

```bash
# Build the frontend
cd app/src/frontend
pnpm build
# Output: app/src/frontend/dist/
```

The `dist/` folder is a static site. Serve it with Nginx, Apache, or any static host.

#### Nginx Configuration

```nginx
# /etc/nginx/sites-available/fibernms

server {
    listen 80;
    server_name fibernms.yourdomain.com;
    
    # Serve frontend static files
    root /var/www/fibernms/dist;
    index index.html;
    
    # SPA routing — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy /api/* to FastAPI backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
}
```

#### Docker Compose

```yaml
# docker-compose.yml

version: "3.9"

services:
  fibernms-frontend:
    build:
      context: ./app/src/frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - fibernms-api
    environment:
      - BACKEND_HOST=http://fibernms-api:8000

  fibernms-api:
    build:
      context: ./fibernms-api
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    depends_on:
      - postgres
    environment:
      - DATABASE_URL=postgresql+asyncpg://fibernms:password@postgres:5432/fibernms
    command: uvicorn main:app --host 0.0.0.0 --port 8000

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: fibernms
      POSTGRES_PASSWORD: password
      POSTGRES_DB: fibernms
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:
```

```dockerfile
# fibernms-api/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```dockerfile
# app/src/frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```bash
# Deploy
docker-compose up -d

# Check logs
docker-compose logs -f fibernms-api
```

---

## 12. Design System

### OKLCH Color Tokens (Dark Theme Default)

| Token | CSS Variable | Value | Usage |
|---|---|---|---|
| Background | `--background` | `oklch(12% 0.01 240)` | Page background |
| Card | `--card` | `oklch(16% 0.015 240)` | Card surfaces |
| Primary | `--primary` | `oklch(65% 0.18 230)` | CTAs, active states |
| Secondary | `--secondary` | `oklch(25% 0.02 240)` | Secondary actions |
| Muted | `--muted` | `oklch(20% 0.01 240)` | Subtle backgrounds |
| Accent | `--accent` | `oklch(70% 0.15 190)` | Highlights, links |
| Destructive | `--destructive` | `oklch(55% 0.22 27)` | Delete, danger |
| Foreground | `--foreground` | `oklch(95% 0.01 240)` | Primary text |
| Muted FG | `--muted-foreground` | `oklch(60% 0.02 240)` | Secondary text |
| Border | `--border` | `oklch(25% 0.015 240)` | Card borders |
| Input | `--input` | `oklch(22% 0.015 240)` | Form inputs |

### Typography

```css
--font-display: 'Space Grotesk', system-ui, sans-serif;   /* Headings, hero text */
--font-body:    'Inter', system-ui, sans-serif;            /* Body, UI text */
--font-mono:    'JetBrains Mono', monospace;               /* Code, IDs, values */
```

### Spacing & Radius

```css
--radius: 0.75rem;     /* Base border radius */
--radius-sm: 0.5rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
```

### Custom Utilities

| Class | Effect |
|---|---|
| `noc-glow` | Primary color box-shadow glow |
| `glass-card` | Glassmorphism: backdrop-blur + semi-transparent bg |
| `gradient-primary` | Brand gradient background |
| `animate-flow` | Infinite flow animation for data indicators |
| `transition-smooth` | 200ms ease transition on all properties |

### Using Design Tokens

```tsx
// ✅ Correct — semantic token classes
<div className="bg-card border border-border text-foreground">
  <p className="text-muted-foreground">Secondary info</p>
  <button className="bg-primary text-primary-foreground">Action</button>
</div>

// ❌ Wrong — raw Tailwind colors (banned)
<div className="bg-gray-900 border border-gray-700 text-white">
  <p className="text-gray-400">Secondary info</p>
  <button className="bg-blue-600 text-white">Action</button>
</div>
```

---

## 13. Mock Data Reference

### What exists in mock data

| Dataset | File | Count |
|---|---|---|
| Network devices | `mockData.ts` | 1000+ (PRNG) |
| Fiber routes | `mockData.ts` | ~200 |
| Alerts | `mockData.ts` | ~50 |
| SLA records | `mockData.ts` | ~100 |
| Predictive alerts | `mockData.ts` | ~30 |
| Audit logs | `mockData.ts` | ~200 |
| Capacity records | `mockData.ts` | ~20 |
| Companies | `superAdminMockData.ts` | 54 |
| Global users | `superAdminMockData.ts` | 1000+ |
| Orders / Invoices | `billingMockData.ts` | ~300 |
| Fault nodes | `faultMockData.ts` | ~80 |
| Fault links | `faultMockData.ts` | ~100 |

### PRNG Seeding

The device mock uses Mulberry32 seeded at `42`. This guarantees:
- Identical data on every app load (no randomness)
- Fast generation (<10ms for 1000 devices)
- No large JSON file to ship with the build

To change the volume or seed, edit the constants at the top of `mockData.ts`:

```typescript
const PRNG_SEED = 42;           // Change seed for different data
const DEVICE_COUNT = 1000;      // Increase for larger test datasets
const ROUTE_COUNT = 200;
```

### Adding custom mock data

Append to the mock arrays directly or add new seed companies/users:

```typescript
// superAdminMockData.ts — add a company
mockCompanies.push({
  id: "comp-055",
  name: "My Telecom Ltd",
  plan: "ENTERPRISE",
  status: "active",
  deviceCount: 4500,
  userCount: 23,
  mrr: 499,
  created: "2024-06-01",
  country: "Germany",
  industry: "Telecommunications",
  contactEmail: "admin@mytelecom.de",
});
```

---

## 14. Roadmap / Deferred Features

The following features were identified as valuable but are not yet implemented:

### Authentication
- [ ] Forgot password / password reset email flow
- [ ] Two-factor authentication (TOTP / SMS)
- [ ] SSO / SAML 2.0 integration (Okta, Azure AD, Google Workspace)
- [ ] User profile panel (avatar, preferences, notification settings)

### Operations
- [ ] Tenant onboarding wizard (step-by-step guided setup)
- [ ] Usage-based billing alerts (email + in-app notification when approaching quota)
- [ ] Enhanced drag-and-drop workflow builder with conditional branching
- [ ] Enhanced dashboard builder with drag-and-drop widget grid
- [ ] Plugin marketplace panel with dynamic module injection

### Map & Visualization
- [ ] Satellite / aerial imagery layer overlay
- [ ] Weather layer overlay (rain, wind — affects fiber performance)
- [ ] Redo / history panel for map actions (currently only undo is implemented)
- [ ] Fiber route auto-routing between two clicked points (smart pathfinding)
- [ ] Export map view as PNG/SVG

### Monitoring
- [ ] Real-time alert feed in AI chat panel
- [ ] WebSocket support for live device status push (currently polling)
- [ ] Prometheus metrics endpoint (`/metrics`)
- [ ] Grafana dashboard export integration
- [ ] ELK / OpenSearch log shipping

### Mobile
- [ ] Push notifications (PWA `PushManager` API)
- [ ] Offline mode with background sync (service worker + IndexedDB queue)
- [ ] Swipe-to-dismiss alert cards
- [ ] Voice input in AI Assistant chat

---

## License

© 2025 FiberNMS. Built with ❤️ using [caffeine.ai](https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral).

---

*This README is rendered in-app at the `/docs` page. Navigate to Documentation in the sidebar to read it without leaving FiberNMS.*
