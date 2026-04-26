# FiberNMS — Optical Fiber Network Management System

> **Carrier-grade, SaaS-based OFNMS frontend** for telecom operators, ISPs, and large infrastructure providers.  
> Built on **Next.js (App Router) · TypeScript · Tailwind CSS · Shadcn UI · React Query · Zustand · Recharts · Mapbox GL JS · Leaflet.js**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Quick Start](#3-quick-start)
4. [Seed Credentials](#4-seed-credentials)
5. [Project Structure](#5-project-structure)
6. [Architecture](#6-architecture)
7. [Modules](#7-modules)
   - [7.1 Authentication & RBAC](#71-authentication--rbac)
   - [7.2 Layout & Navigation System](#72-layout--navigation-system)
   - [7.3 NOC Core](#73-noc-core)
     - [7.3.1 Map Dashboard](#731-map-dashboard)
     - [7.3.2 Devices](#732-devices)
     - [7.3.3 Topology](#733-topology)
     - [7.3.4 Monitoring](#734-monitoring)
     - [7.3.5 Tools](#735-tools)
     - [7.3.6 Analytics](#736-analytics)
     - [7.3.7 Workflows](#737-workflows)
     - [7.3.8 AI Assistant](#738-ai-assistant)
   - [7.4 Enterprise Features](#74-enterprise-features)
     - [7.4.1 SLA Dashboard](#741-sla-dashboard)
     - [7.4.2 Predictive Intelligence](#742-predictive-intelligence)
     - [7.4.3 Capacity Planning](#743-capacity-planning)
     - [7.4.4 Audit Logs](#744-audit-logs)
   - [7.5 Fault Visualization Module](#75-fault-visualization-module)
   - [7.6 SaaS & Billing](#76-saas--billing)
     - [7.6.1 Billing Dashboard](#761-billing-dashboard)
     - [7.6.2 Plans & Subscription](#762-plans--subscription)
     - [7.6.3 Usage Analytics](#763-usage-analytics)
     - [7.6.4 Integrations](#764-integrations)
     - [7.6.5 Branding](#765-branding)
     - [7.6.6 License Management](#766-license-management)
     - [7.6.7 Multi-Tenant Manager](#767-multi-tenant-manager)
   - [7.7 Super Admin System](#77-super-admin-system)
     - [7.7.1 Super Admin Dashboard](#771-super-admin-dashboard)
     - [7.7.2 Company Management](#772-company-management)
     - [7.7.3 Global User Management](#773-global-user-management)
     - [7.7.4 Global Billing](#774-global-billing)
     - [7.7.5 Orders & Invoices](#775-orders--invoices)
     - [7.7.6 Platform Audit](#776-platform-audit)
     - [7.7.7 Access Control](#777-access-control)
     - [7.7.8 System Alerts](#778-system-alerts)
     - [7.7.9 Security Dashboard](#779-security-dashboard)
     - [7.7.10 Global Analytics](#7710-global-analytics)
     - [7.7.11 Tenant Admin Panel](#7711-tenant-admin-panel)
   - [7.8 In-App Documentation](#78-in-app-documentation)
   - [7.9 PWA & Mobile](#79-pwa--mobile)
8. [Data Models & Fields](#8-data-models--fields)
9. [State Management (Zustand)](#9-state-management-zustand)
10. [Mock Data Layer](#10-mock-data-layer)
11. [Route Table](#11-route-table)
12. [Subscription Tiers & Feature Gating](#12-subscription-tiers--feature-gating)
13. [Role-Based Navigation](#13-role-based-navigation)
14. [Design System](#14-design-system)
15. [Performance & Optimization](#15-performance--optimization)
16. [Roadmap](#16-roadmap)

---

## 1. Project Overview

**FiberNMS** is a production-ready, multi-tenant SaaS frontend for optical fiber network operations. It provides a comprehensive NOC (Network Operations Center) platform with:

- **Real-time monitoring** of fiber devices, routes, and SLAs
- **AI-powered predictive fault intelligence** with risk scoring and anomaly detection
- **Interactive GIS map** for network visualization, device placement, and route drawing
- **Dedicated fault visualization engine** using Leaflet.js for real-time outage detection and customer impact mapping
- **Enterprise administration** covering 54+ tenants, 1000+ users, and full SaaS lifecycle management
- **4-tier subscription system** (BASIC → PROFESSIONAL → ENTERPRISE → ULTRA) with plan-based feature gating
- **Mobile-first design** with PWA support for home screen installation
- **Role-based access control** supporting 5 distinct user roles

The platform is optimized for global-scale telecom operations (100K–1M+ devices), multi-region deployments, and mission-critical 24/7 NOC operations.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite (App Router pattern via TanStack Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 + OKLCH design tokens |
| **Component Library** | Shadcn UI (Radix UI primitives) |
| **State Management** | Zustand (with localStorage persistence) |
| **Data Fetching** | TanStack React Query v5 |
| **Routing** | TanStack Router v1 |
| **Charts** | Recharts v2 |
| **GIS Map (NOC)** | Mapbox GL JS / React-Leaflet (CARTO Voyager tiles) |
| **Fault Map** | Leaflet.js |
| **Animations** | Framer Motion / Motion |
| **Icons** | Lucide React |
| **Tables** | TanStack React Table v8 |
| **Forms** | React Hook Form + Zod |
| **Backend** | Motoko canister (Internet Computer) |
| **Package Manager** | pnpm |
| **Build Tool** | Vite |

---

## 3. Quick Start

### Prerequisites

- Node.js >= 18
- pnpm >= 8
- DFX (Internet Computer SDK) — for backend development

### Installation

```bash
# Install all dependencies (frontend + backend)
pnpm install

# Start frontend development server
cd src/frontend
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Frontend Commands

```bash
# From src/frontend/
pnpm dev          # Start dev server (hot reload)
pnpm build        # Production build
pnpm typecheck    # TypeScript type checking
pnpm check        # ESLint checks
pnpm fix          # ESLint auto-fix
```

### Backend Commands

```bash
# From src/backend/
mops install      # Install Motoko packages
mops check --fix  # Type check Motoko code
mops build        # Build backend canister
```

### Full Stack (root)

```bash
pnpm install      # Install all workspace packages
pnpm bindgen      # Generate TypeScript bindings from Motoko backend
```

---

## 4. Seed Credentials

Use these accounts to explore the platform. Accounts are seeded into localStorage on first load.

| Email | Password | Role | Access Level |
|---|---|---|---|
| `superadmin@fibernms.com` | `SuperAdmin@123` | Super Admin | Full platform access — all admin pages, all companies, global settings |
| `admin@fibernms.com` | `Admin@123` | Admin (Tenant Admin) | NOC + Enterprise + Billing + Admin (no Super Admin panel) |
| `operator@fibernms.com` | `Operator@123` | NOC Operator | Core NOC pages only |

> **Tip:** Log in as `superadmin@fibernms.com` to access the Super Admin control panel at `/super-admin`. Log in as `operator@fibernms.com` to see the restricted NOC-only view.

---

## 5. Project Structure

```
fibernms/
├── README.md                    # This file (also rendered at /docs in-app)
├── DESIGN.md                    # Design system tokens and guidelines
├── AGENTS.md                    # Agent/build configuration
├── package.json                 # Root workspace configuration
├── mops.toml                    # Motoko package manager config
├── caffeine.toml                # Caffeine platform config
│
├── src/
│   ├── backend/
│   │   ├── main.mo              # Motoko backend canister scaffold
│   │   └── caffeine.toml        # Backend canister config
│   │
│   └── frontend/
│       ├── index.html           # HTML entry with PWA meta tags
│       ├── public/
│       │   ├── manifest.json    # PWA manifest (icons, theme, display)
│       │   └── sw.js            # Service worker (offline caching)
│       ├── vite.config.js       # Vite build config (path aliases, proxy)
│       ├── tailwind.config.js   # Tailwind config (OKLCH tokens, keyframes)
│       ├── tsconfig.json        # TypeScript config (strict, path aliases)
│       ├── package.json         # Frontend deps (React 19, Recharts, Leaflet...)
│       └── src/
│           ├── main.tsx         # React entry (ThemeProvider, QueryClient)
│           ├── App.tsx          # Router, auth guards, 37 lazy-loaded pages
│           ├── index.css        # OKLCH design tokens, theme vars, animations
│           │
│           ├── pages/
│           │   ├── Login.tsx
│           │   ├── Register.tsx
│           │   ├── MapDashboard.tsx
│           │   ├── Devices.tsx
│           │   ├── Topology.tsx
│           │   ├── Monitoring.tsx
│           │   ├── Tools.tsx
│           │   ├── Analytics.tsx
│           │   ├── Workflows.tsx
│           │   ├── AIAssistant.tsx
│           │   ├── SLADashboard.tsx
│           │   ├── PredictiveIntelligence.tsx
│           │   ├── CapacityPlanning.tsx
│           │   ├── AuditLogs.tsx
│           │   ├── FaultVisualizationPage.tsx
│           │   ├── Billing.tsx
│           │   ├── UsageAnalytics.tsx
│           │   ├── Plans.tsx
│           │   ├── Integrations.tsx
│           │   ├── Branding.tsx
│           │   ├── License.tsx
│           │   ├── Tenants.tsx
│           │   ├── Docs.tsx
│           │   └── admin/
│           │       ├── SuperAdminDashboard.tsx
│           │       ├── CompanyManagement.tsx
│           │       ├── CompanyDetail.tsx
│           │       ├── UsageLimits.tsx
│           │       ├── GlobalUserManagement.tsx
│           │       ├── GlobalBilling.tsx
│           │       ├── OrdersInvoices.tsx
│           │       ├── PlatformAudit.tsx
│           │       ├── AccessControl.tsx
│           │       ├── SystemAlerts.tsx
│           │       ├── SecurityDashboard.tsx
│           │       ├── GlobalAnalytics.tsx
│           │       └── TenantAdminPanel.tsx
│           │
│           ├── components/
│           │   ├── Layout.tsx            # App shell (desktop + mobile)
│           │   ├── Sidebar.tsx           # Desktop sidebar nav
│           │   ├── Navbar.tsx            # Top navbar (desktop)
│           │   ├── MobileHeader.tsx      # Sticky mobile header
│           │   ├── MobileBottomNav.tsx   # Bottom navigation bar
│           │   ├── MobileNavDrawer.tsx   # Hamburger full-page drawer
│           │   ├── CommandPalette.tsx    # CMD+K global search
│           │   ├── GlassCard.tsx         # Glassmorphism card wrapper
│           │   ├── DeviceIcon.tsx        # Device type SVG icons
│           │   ├── StatusBadge.tsx       # Colored status badge pill
│           │   ├── map/
│           │   │   ├── MapDashboard.tsx        # Main map component
│           │   │   ├── DeviceMarker.tsx         # Device map marker
│           │   │   ├── DeviceDetailPanel.tsx    # Slide-up device details
│           │   │   ├── PlaceDeviceToolbar.tsx   # Add device toolbar
│           │   │   ├── DrawToolbar.tsx          # Fiber draw controls
│           │   │   ├── EditDeviceModal.tsx      # Edit device form
│           │   │   ├── RouteEditPanel.tsx       # Route properties panel
│           │   │   ├── LayerTogglePanel.tsx     # Layer visibility toggles
│           │   │   └── AddDeviceDialog.tsx      # Device placement dialog
│           │   ├── topology/
│           │   │   ├── TopologyGraph.tsx        # Deep-space canvas graph
│           │   │   ├── OLTSectionCard.tsx       # OLT glassmorphism card
│           │   │   ├── OLTSectionMiniTree.tsx   # SVG mini-tree
│           │   │   └── TopologyNodePanel.tsx    # Device detail panel
│           │   ├── monitoring/
│           │   │   ├── StatCard.tsx             # KPI metric card
│           │   │   ├── StatusPieChart.tsx       # Active/warn/fault pie
│           │   │   ├── SignalLineChart.tsx       # 24h signal line chart
│           │   │   └── AlertsPanel.tsx          # Live alert feed
│           │   ├── devices/
│           │   │   ├── DeviceTable.tsx          # Virtualized table
│           │   │   ├── DeviceFilters.tsx        # Filter panel
│           │   │   └── AddDeviceModal.tsx       # Add device form
│           │   ├── tools/
│           │   │   ├── PowerCalculator.tsx      # Optical power budget tool
│           │   │   └── FaultDetectionPanel.tsx  # OTDR fault detector
│           │   ├── fault/
│           │   │   ├── FaultDeviceMarker.tsx    # Status-colored marker
│           │   │   ├── FaultFiberPolyline.tsx   # Blinking fault polyline
│           │   │   ├── FaultAlertBanner.tsx     # Top alert banner
│           │   │   ├── FaultStatsPanel.tsx      # Customer stats sidebar
│           │   │   ├── CustomerMarker.tsx       # Customer location marker
│           │   │   └── FaultLayerControls.tsx   # Layer toggles
│           │   └── subscription/
│           │       ├── FeatureGate.tsx          # Feature access wrapper
│           │       ├── LockedFeatureOverlay.tsx # Blur + upgrade CTA
│           │       ├── PlanBadge.tsx            # Plan name badge
│           │       ├── PlanComparisonModal.tsx  # 4-tier comparison modal
│           │       ├── UpgradeCTA.tsx           # Upgrade prompt button
│           │       └── UsageProgressBar.tsx     # Usage meter bar
│           │
│           ├── store/
│           │   ├── authStore.ts          # Auth state + RBAC
│           │   ├── subscriptionStore.ts  # Plan, quota, license state
│           │   └── networkStore.ts       # Devices, routes, alerts, undo
│           │
│           ├── types/
│           │   ├── network.ts            # Device, Route, Alert, SLA types
│           │   ├── subscription.ts       # Plan, FeatureFlag, Billing types
│           │   └── superAdmin.ts         # Company, AdminUser, Order types
│           │
│           ├── config/
│           │   └── features.ts           # Plan configs, feature flag mappings
│           │
│           ├── data/
│           │   ├── mockData.ts           # 1000+ devices, routes, alerts
│           │   ├── superAdminMockData.ts # 54 companies, 1000+ users
│           │   ├── billingMockData.ts    # MRR/ARR, invoices, revenue
│           │   └── faultMockData.ts      # Fault visualization mock topology
│           │
│           ├── hooks/
│           │   ├── useAuth.ts            # Auth selectors + helpers
│           │   ├── useFeature.ts         # Feature access + subscription
│           │   ├── useRoleNav.ts         # Role-filtered navigation
│           │   ├── useFaultVisualization.ts  # BFS fault cascade logic
│           │   └── use-mobile.tsx        # Responsive breakpoint hook
│           │
│           └── lib/
│               ├── utils.ts              # cn(), formatBytes(), formatDate()
│               └── eventBus.ts           # WebSocket simulation event emitter
```

---

## 6. Architecture

### How the System Works (End-to-End)

```
Browser
  └─► React App (Vite + TanStack Router)
        ├─► Auth Guard  ──► Login / Register
        ├─► Layout Shell  ──► Desktop (Sidebar + Navbar)
        │                 └─► Mobile (Header + BottomNav)
        │
        ├─► NOC Pages (protected, role-filtered)
        │     ├─► Map  ──► React-Leaflet ──► CARTO Voyager tiles
        │     ├─► Devices  ──► networkStore (Zustand)
        │     ├─► Topology  ──► SVG canvas + OLT cards
        │     ├─► Monitoring  ──► eventBus (simulated WebSocket)
        │     └─► ... (8 total NOC pages)
        │
        ├─► Enterprise Pages (plan-gated via FeatureGate)
        │     ├─► SLA Dashboard
        │     ├─► Predictive Intelligence
        │     ├─► Capacity Planning
        │     └─► Audit Logs
        │
        ├─► Fault Map  ──► Leaflet.js ──► useFaultVisualization (BFS cascade)
        │
        ├─► SaaS/Billing Pages
        │     ├─► Billing  ──► subscriptionStore
        │     ├─► Plans  ──► PLAN_CONFIGS feature matrix
        │     └─► ...
        │
        └─► Super Admin Pages (superAdmin role only)
              ├─► SuperAdminDashboard  ──► superAdminMockData
              ├─► CompanyManagement  ──► 54 mock companies
              └─► ... (11 total admin pages)

Zustand Stores (localStorage-persisted):
  authStore  ──► current user, role, session
  subscriptionStore  ──► plan, quota, license key
  networkStore  ──► devices[], routes[], alerts[], undo history[]

Mock API Layer:
  mockData.ts  ──► Mulberry32 PRNG (seed 42) ──► deterministic data
  eventBus.ts  ──► emit/on pattern ──► simulates real-time WebSocket

Backend (Motoko canister — ready for integration):
  main.mo  ──► Scaffold, awaiting CRUD actor methods
```

### Data Flow

1. **Authentication:** User logs in → `authStore.login()` validates against seed users → sets `currentUser` and `role` in Zustand → Router auth guard checks role → redirects to appropriate landing page
2. **Feature Access:** Any page/component wrapped in `<FeatureGate feature="...">` calls `useFeature()` → checks `subscriptionStore.plan` against `FEATURE_PLAN_MAP` → renders children or `LockedFeatureOverlay`
3. **Network Data:** `networkStore` holds all devices, routes, alerts, and audit logs → components subscribe via Zustand selectors → `eventBus` emits `device-status-change` and `route-update` events to simulate live updates
4. **Fault Cascade:** `useFaultVisualization` runs BFS from the failed node/segment → marks all reachable downstream nodes as `affected` → computes `affectedCustomers` count → updates display state in the fault map
5. **Undo System:** Every destructive action in `networkStore` saves a snapshot (max 20) → `undo()` pops the last snapshot and restores the previous state

---

## 7. Modules

### 7.1 Authentication & RBAC

**Files:**
- `src/pages/Login.tsx` — Login form
- `src/pages/Register.tsx` — 5-step enterprise registration
- `src/store/authStore.ts` — Auth state store
- `src/hooks/useAuth.ts` — Auth selectors

**How it works:**

The login form validates credentials against the three seed users stored in the auth store. On success, `currentUser` and `role` are persisted to localStorage. The TanStack Router's `beforeLoad` guard checks `authStore.isAuthenticated` before rendering any protected route. Role-based redirects send Super Admins to `/super-admin`, NOC operators to `/`, and unauthenticated users to `/login`.

**Registration Flow:**

A 5-step wizard collects:
1. Account type (Individual / Company)
2. Personal details (name, email, phone)
3. Company info (name, size, country, telecom type)
4. Plan selection (BASIC -> ULTRA)
5. Review and confirmation

**Roles:**

| Role | Key | Description |
|---|---|---|
| Super Admin | `superAdmin` | Full platform access, global admin panel |
| Admin (Tenant Admin) | `admin` | All NOC + enterprise + billing + tenant admin |
| Network Engineer | `engineer` | NOC + SLA + Capacity + Audit |
| NOC Operator | `operator` | Core NOC pages only |
| Viewer | `viewer` | Read-only: Map, Devices, Topology, Monitoring, Analytics |

**RBAC + ABAC:**

The `AccessControl` admin page provides a granular permission matrix. Beyond role-level access, ABAC rules allow device-level and region-level permission overrides (e.g., "Engineer A can only see devices in Region North").

---

### 7.2 Layout & Navigation System

**Files:**
- `src/components/Layout.tsx` — App shell
- `src/components/Sidebar.tsx` — Desktop sidebar
- `src/components/Navbar.tsx` — Desktop top bar
- `src/components/MobileHeader.tsx` — Mobile sticky header
- `src/components/MobileBottomNav.tsx` — Mobile bottom tabs
- `src/components/MobileNavDrawer.tsx` — Hamburger drawer
- `src/components/CommandPalette.tsx` — Global search
- `src/hooks/useRoleNav.ts` — Role-filtered nav sections

**How it works:**

`Layout.tsx` detects screen size via `useIsMobile()` and renders the appropriate shell:
- **Desktop (>=768px):** Fixed left `Sidebar` + top `Navbar` + main content area
- **Mobile (<768px):** Sticky `MobileHeader` + scrollable content + fixed 64px `MobileBottomNav`

The hamburger button in `MobileHeader` opens `MobileNavDrawer`, a full-page overlay with spring-animated slide-in that lists all navigation sections. Both the sidebar and drawer filter items based on the current user's role via `useRoleNav()`.

**Command Palette:**

`CMD+K` (or `Ctrl+K`) opens a fullscreen search modal. Users can search by device name, alert message, or page name. Results are shown in categorized groups with keyboard navigation.

**Bottom Navigation Tabs (role-based):**

| Role | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Tab 5 |
|---|---|---|---|---|---|
| Super Admin | Dashboard | Companies | Users | Billing | Alerts |
| Admin | Dashboard | Map | Alerts | Billing | Users |
| Engineer | Dashboard | Map | Devices | Topology | Alerts |
| Operator | Dashboard | Map | Monitoring | Alerts | Tools |
| Viewer | Dashboard | Map | Monitoring | — | — |

---

### 7.3 NOC Core

#### 7.3.1 Map Dashboard

**Route:** `/`  
**Files:** `src/pages/MapDashboard.tsx`, `src/components/map/*`

The primary network operations map. Uses React-Leaflet with CARTO Voyager light tiles for a non-dark, colorful, and legible basemap.

**Features:**
- **Device markers:** Each device type has a unique icon and color (OLT = blue hexagon, ONT = green square, Splitter = orange diamond, Coupler = purple circle, Router = red star, JJB = yellow cross, Switch = teal triangle)
- **Fiber polylines:** Drawn routes connecting devices, color-coded by route type (backbone = blue, distribution = orange, drop = green)
- **Device placement:** Click "Add Device" -> choose device type -> click map -> fill in name/status -> save instantly. Right-click on map also triggers placement mode.
- **Route drawing:** Desktop toolbar provides draw mode, route type selector, snap-to-device toggle
- **Root delete:** Right-click an OLT -> "Delete with Children" -> confirmation modal shows count of all connected Splitters, ONTs, and routes -> cascade delete
- **Undo:** Toolbar "Undo" button and `Ctrl+Z` / `Cmd+Z` keyboard shortcut reverses the last placement, deletion, or route draw
- **Layer toggles:** Show/hide Devices, Routes, Labels, Coverage layers
- **Device detail panel:** Click any device marker -> slide-up panel shows device name, type, status, signal levels, coordinates, uptime
- **Mobile layout:** Map constrained between sticky header and bottom nav — never overlaps navigation

**Supported Device Types:**

| Type | Color | Icon |
|---|---|---|
| OLT | Blue (#3B82F6) | Hexagon |
| ONT | Green (#22C55E) | Square |
| Splitter | Orange (#F97316) | Diamond |
| Coupler | Purple (#A855F7) | Circle |
| Router | Red (#EF4444) | Star |
| JJB | Yellow (#EAB308) | Cross |
| Switch | Teal (#14B8A6) | Triangle |

---

#### 7.3.2 Devices

**Route:** `/devices`  
**Files:** `src/pages/Devices.tsx`, `src/components/devices/*`

Virtualized device management table for bulk operations.

**Features:**
- TanStack React Table with virtualized row rendering (handles 1000+ devices without lag)
- Columns: Name, Type, Status, Uptime %, Tx/Rx Signal (dBm), Region, Last Seen, Actions
- Filter panel: Device type checkboxes, status radio group, region dropdown
- Sort by any column
- Bulk actions: Select multiple devices -> Update Status, Export, Delete
- Add Device modal: Form with type, name, coordinates, status, region, description
- Mobile: Card-based list view (name, type, status badge, quick action icons); tap to expand full details

---

#### 7.3.3 Topology

**Route:** `/topology`  
**Files:** `src/pages/Topology.tsx`, `src/components/topology/*`

Multi-layer fiber network visualization with two view modes.

**View 1: OLT Sections (default)**

Grid of glassmorphism cards, one per OLT. Each card shows:
- OLT name and status badge
- SVG mini-tree of connected Splitters (diamond nodes) and ONTs (square nodes)
- Summary bar: Total devices | Online | Faulty
- Color-coded status (green = healthy, orange = degraded, red = fault)

**View 2: Network Graph**

Deep-space canvas visualization:
- Neon hexagon OLT nodes with glow effect
- Diamond Splitter nodes connected by animated fiber edges
- Square ONT leaf nodes
- Animated data-flow dots traveling along edges (direction: OLT -> Splitter -> ONT)
- Minimap in bottom-right corner for navigation on large topologies
- Hover tooltips showing device name, status, uptime
- Tabbed device detail panel (Overview | Signal | History | Actions)
- Overview tab: Uptime ring chart, sparkline signal history
- Actions tab: Reboot, Mark Maintenance, Set Alert

**Mobile responsiveness:**
- OLT Section cards: responsive grid (1 col on mobile, 2 on tablet, 3+ on desktop)
- Mini-trees: fluid SVG sizing, scales to container width
- Network graph: scrollable canvas, zoom controls remain accessible
- Device detail: bottom sheet drawer instead of sidebar panel
- Toolbars: horizontally scrollable, no wrapping

---

#### 7.3.4 Monitoring

**Route:** `/monitoring`  
**Files:** `src/pages/Monitoring.tsx`, `src/components/monitoring/*`

Real-time network health monitoring with live alert feed.

**Features:**
- 4 KPI stat cards: Total Devices, Online, Warning, Faulty (with trend arrows)
- Status pie chart: Active / Warning / Faulty breakdown (Recharts)
- 24-hour signal strength line chart (Recharts LineChart with 5-minute intervals)
- Live alert feed: Severity badge (Critical/High/Medium/Low), timestamp, device name, message
- Alert resolution: Click "Resolve" to mark an alert as cleared
- `eventBus` simulates incoming WebSocket events every 30 seconds, updating device statuses and triggering new alerts
- Mobile: stat cards in 2x2 grid, charts in scrollable containers, alert feed in card list

---

#### 7.3.5 Tools

**Route:** `/tools`  
**Files:** `src/pages/Tools.tsx`, `src/components/tools/*`

Engineering diagnostic tools for field and NOC engineers.

**Tools included:**

1. **Optical Power Budget Calculator**
   - Inputs: Transmit power (dBm), fiber length (km), splitter ratio, connector loss
   - Output: Received power, link margin, pass/fail verdict

2. **OTDR Fault Location Simulator**
   - Inputs: Fiber length, fault distance, loss threshold
   - Output: Simulated OTDR trace (Recharts area chart), estimated fault location, reflectance values

3. **Wavelength Conversion Table** — Common DWDM channel frequencies and wavelengths

4. **dB/dBm Reference Calculator** — Convert between dB and linear power ratios

---

#### 7.3.6 Analytics

**Route:** `/analytics`  
**Files:** `src/pages/Analytics.tsx`

Network performance analytics and historical trend analysis.

**Charts:**
- Device health trend (last 30 days, area chart)
- Alert volume by severity over time (stacked bar chart)
- Average signal levels by region (grouped bar chart)
- Network uptime by region (line chart with 99.9% SLA threshold line)
- Top 10 most-alerted devices (horizontal bar chart)
- Traffic throughput trends (area chart, Gbps)

All charts use Recharts and are responsive (ResponsiveContainer). Mobile view shows charts in single-column scrollable layout.

---

#### 7.3.7 Workflows

**Route:** `/workflows`  
**Files:** `src/pages/Workflows.tsx`  
**Plan gate:** PROFESSIONAL+

Visual workflow automation builder (n8n-inspired).

**Features:**
- Drag-and-drop node-based builder
- Node types: Trigger (Alert, Schedule, API), Action (Send Email, Create Ticket, Reboot Device, Call Webhook), Condition (If/Else, Wait)
- Pre-built templates: Auto-resolve critical alerts, Nightly device health report, Escalation workflow
- AI-generated workflows: Describe in natural language -> workflow is generated automatically
- Workflow list: Name, status (Active/Paused/Draft), last run, success rate
- Run history with execution logs per node

---

#### 7.3.8 AI Assistant

**Route:** `/ai`  
**Files:** `src/pages/AIAssistant.tsx`

Natural language copilot for NOC operations.

**Features:**
- Chat interface with markdown rendering
- Network-aware context: AI responses reference actual device names, alert counts, and signal data from `networkStore`
- Session history: Left panel shows previous chat sessions (slide-in drawer on mobile)
- Network status panel: Right panel shows live device health summary (slide-in drawer on mobile)
- Suggested prompts: "What devices have critical alerts?", "Show me OLTs with low signal", "Generate a fault report for today"
- Mobile: Three-column layout (sessions | chat | status) collapses to single chat view with two drawer buttons at top

---

### 7.4 Enterprise Features

> All enterprise pages are gated by `PROFESSIONAL` plan or above. Users on `BASIC` see a `LockedFeatureOverlay` with an upgrade CTA.

#### 7.4.1 SLA Dashboard

**Route:** `/sla`  
**Files:** `src/pages/SLADashboard.tsx`  
**Plan gate:** PROFESSIONAL+

Service Level Agreement monitoring per customer circuit.

**Metrics tracked:**
- Uptime % (target: 99.9%)
- Mean Time to Repair (MTTR)
- Mean Time Between Failures (MTBF)
- SLA breach count (current period)
- Penalty exposure (currency)

**UI:**
- Summary cards at top (total circuits, SLA met, breached, at-risk)
- SLA table with sorting and filtering by customer/region/status
- Per-circuit SLA detail: uptime history sparkline, incident log
- Monthly SLA compliance chart (line chart)
- Export to PDF/CSV

---

#### 7.4.2 Predictive Intelligence

**Route:** `/predictive`  
**Files:** `src/pages/PredictiveIntelligence.tsx`  
**Plan gate:** ENTERPRISE+

AI-powered predictive fault detection and risk scoring.

**Features:**
- Risk score cards per device (0-100, color-coded: green < 30, yellow 30-70, red > 70)
- Anomaly detection alerts: Unusual signal drop, temperature spike, BER increase
- Predicted failure timeline: "OLT-Core-03 likely to fail within 48h based on signal degradation trend"
- Maintenance recommendation engine: Suggests preventive actions ranked by urgency
- Model confidence scores per prediction
- Historical accuracy: How many past predictions were accurate (false positive rate)

---

#### 7.4.3 Capacity Planning

**Route:** `/capacity`  
**Files:** `src/pages/CapacityPlanning.tsx`  
**Plan gate:** ENTERPRISE+

Network capacity utilization tracking and growth forecasting.

**Features:**
- Current utilization by region (progress bars, color-coded thresholds)
- Capacity forecast charts: 6-month and 12-month projections (area charts)
- OLT port utilization table: Used ports / total ports per OLT
- Growth rate analysis by region
- "When will I run out?" — Days to capacity exhaustion per OLT
- Expansion recommendations with cost estimates
- Export report

---

#### 7.4.4 Audit Logs

**Route:** `/audit`  
**Files:** `src/pages/AuditLogs.tsx`

Complete audit trail for all system actions.

**Fields logged per event:**
- Timestamp
- Actor (user email + role)
- Action type (CREATE, UPDATE, DELETE, LOGIN, EXPORT, CONFIG_CHANGE)
- Resource type (Device, Route, User, Alert, Workflow, Subscription)
- Resource ID
- Before / After state snapshot (JSON diff)
- IP address
- Session ID

**UI:**
- Vertical timeline view (mobile) / table view (desktop)
- Filters: Date range, actor, action type, resource type
- Dropdown filters on mobile for compact layout
- Export as CSV

---

### 7.5 Fault Visualization Module

**Route:** `/fault-map`  
**Files:** `src/pages/FaultVisualizationPage.tsx`, `src/components/fault/*`, `src/hooks/useFaultVisualization.ts`, `src/data/faultMockData.ts`

A dedicated fullscreen Leaflet.js map for real-time outage detection and customer impact visualization. Separate from the main NOC map — focused entirely on fault states and downstream impact.

**Status Color System:**

| Color | Meaning |
|---|---|
| Green | Active — device/cable operating normally |
| Red | Down — device failed or cable cut |
| Orange | Affected — downstream from a fault |

**Fault Logic (BFS Cascade Algorithm):**

```
useFaultVisualization (BFS cascade):
  1. Build adjacency list from network links
  2. On "Device Down" event for node N:
     a. Mark N as RED (status = "down")
     b. BFS from N following directed edges (downstream only)
     c. Mark all reachable nodes as ORANGE (status = "affected")
     d. Highlight all fiber segments in the affected subgraph RED/ORANGE
  3. On "Cable Cut" event for link L:
     a. Mark segment L as RED with blinking animation
     b. Find all nodes reachable from L's destination
     c. Mark them ORANGE
  4. Compute affected customer count (leaf nodes with type = "customer")
  5. Update FaultStatsPanel with new counts
```

**Components:**

| Component | Purpose |
|---|---|
| `FaultDeviceMarker` | Leaflet marker with status-based color (green/orange/red), click handler |
| `FaultFiberPolyline` | Leaflet polyline with blinking CSS animation for cut segments |
| `FaultAlertBanner` | Top sticky banner: "Cable cut detected - 24 customers affected" |
| `FaultStatsPanel` | Right sidebar: Total / Active / Affected customers, Down Devices |
| `CustomerMarker` | Customer location pin with status color, click for customer details |
| `FaultLayerControls` | Toggle visibility of Customers, Fiber, and Devices layers |

**Simulation Controls:**

- "Simulate Device Down" button — marks a random OLT or Splitter as down, triggers cascade
- "Simulate Cable Cut" button — marks a random fiber segment as cut, triggers cascade
- "Clear Faults" button — resets all devices and cables to Active status

**API Integration Points** (ready for real backend):

```
GET  /network/nodes       -> returns Node[]  (id, type, lat, lng, status)
GET  /network/links       -> returns Link[]  (from_node, to_node, status)
POST /mark-device-down    -> { node_id }     -> triggers cascade
POST /mark-cable-cut      -> { link_id }     -> triggers cascade
```

---

### 7.6 SaaS & Billing

#### 7.6.1 Billing Dashboard

**Route:** `/billing`  
**Files:** `src/pages/Billing.tsx`

Tenant-facing billing overview.

**Sections:**
- Current plan badge + expiry date
- Device usage bar: Used / Total (e.g., 2,456 / 5,000)
- API call quota bar
- Next invoice amount and due date
- Invoice history table (date, amount, status: Paid/Pending/Overdue, download PDF)
- Payment method management (card on file, update button)
- Upgrade / Downgrade plan button -> `PlanComparisonModal`

---

#### 7.6.2 Plans & Subscription

**Route:** `/plans`  
**Files:** `src/pages/Plans.tsx`, `src/components/subscription/PlanComparisonModal.tsx`, `src/config/features.ts`

4-tier plan comparison and upgrade flow.

**Plan Tiers:**

| Plan | Price | Max Devices | Target |
|---|---|---|---|
| BASIC | $9/mo | 100 | Small ISPs, trials |
| PROFESSIONAL | $49/mo | 1,000 | Growing ISPs |
| ENTERPRISE | $299/mo | 10,000 | Mid-size carriers |
| ULTRA | $999/mo | Unlimited | Tier-1 carriers, multi-tenant |

**Feature Flags per Plan:**

| Feature | BASIC | PROFESSIONAL | ENTERPRISE | ULTRA |
|---|---|---|---|---|
| Advanced Monitoring | Yes | Yes | Yes | Yes |
| SLA Dashboard | No | Yes | Yes | Yes |
| Predictive Intelligence | No | No | Yes | Yes |
| Capacity Planning | No | No | Yes | Yes |
| Workflow Automation | No | Yes | Yes | Yes |
| AI Assistant | No | Yes | Yes | Yes |
| Custom Branding | No | No | Yes | Yes |
| API Access | No | No | Yes | Yes |
| Multi-Tenant | No | No | No | Yes |
| White Labeling | No | No | No | Yes |
| Digital Twin | No | No | No | Yes |
| Audit Logs | No | Yes | Yes | Yes |
| Advanced Analytics | No | No | Yes | Yes |
| Plugin Marketplace | No | No | No | Yes |
| Priority Support | No | No | Yes | Yes |
| Export Tools | No | Yes | Yes | Yes |
| Integrations | No | Yes | Yes | Yes |
| Dashboard Builder | No | No | Yes | Yes |
| Advanced Security | No | No | Yes | Yes |

---

#### 7.6.3 Usage Analytics

**Route:** `/usage`  
**Files:** `src/pages/UsageAnalytics.tsx`

Tenant-level usage tracking over time.

**Charts:**
- Device count growth trend (line chart, 12 months)
- Alert volume trend (bar chart)
- API call usage vs quota (area chart)
- Data throughput (Gbps/day, area chart)
- Storage usage over time

---

#### 7.6.4 Integrations

**Route:** `/integrations`  
**Files:** `src/pages/Integrations.tsx`  
**Plan gate:** ENTERPRISE+

API keys and webhook management.

**Sections:**
- API key list: Key name, created date, last used, permissions (read/write/admin), revoke button
- Generate new API key: name + permission scopes
- Webhook endpoints: URL, events subscribed (device.down, alert.created, sla.breach), status (Active/Inactive), test button
- Integration catalog: Slack, PagerDuty, Jira, ServiceNow, Grafana, Prometheus — each with connect/disconnect status

---

#### 7.6.5 Branding

**Route:** `/settings/branding`  
**Files:** `src/pages/Branding.tsx`  
**Plan gate:** ENTERPRISE+

White-label customization for tenant deployment.

**Configurable:**
- Platform name (replaces "FiberNMS" in UI)
- Logo upload (light + dark variants)
- Primary color (hex picker)
- Accent color
- Favicon upload
- Custom domain configuration
- Email footer branding
- Login page background image

---

#### 7.6.6 License Management

**Route:** `/settings/license`  
**Files:** `src/pages/License.tsx`

License key validation and plan activation.

**Features:**
- License key input field
- Validation against 4 valid demo keys in `subscriptionStore`
- On valid key: updates plan, resets quota, shows success animation
- Shows current plan, expiry, licensed device limit, feature list
- License history log

---

#### 7.6.7 Multi-Tenant Manager

**Route:** `/tenants`  
**Files:** `src/pages/Tenants.tsx`  
**Plan gate:** ULTRA only

Manage multiple sub-tenants from a single ULTRA account.

**Features:**
- Tenant list: Name, plan, device count, status, last active
- Add new tenant: Name, contact email, plan assignment
- Tenant switcher dropdown (also in Navbar for quick context switching)
- Per-tenant branding customization
- Usage isolation: each tenant has its own quota counters

---

### 7.7 Super Admin System

> Accessible only to users with `role = "superAdmin"`. Login with `superadmin@fibernms.com / SuperAdmin@123`.

#### 7.7.1 Super Admin Dashboard

**Route:** `/super-admin`  
**Files:** `src/pages/admin/SuperAdminDashboard.tsx`

Global platform overview for the SaaS operator.

**KPI Cards:**
- Total Companies (54 demo companies)
- Total Users (1,000+)
- Monthly Recurring Revenue (MRR)
- Active Subscriptions
- Platform Uptime %
- New signups (last 30 days)

**Charts:**
- Revenue trend (last 12 months, area chart)
- Signups vs Churn (grouped bar chart)
- Plan distribution (pie chart: BASIC/PRO/ENTERPRISE/ULTRA)
- Geographic distribution (companies by region)

**Mobile:** KPI cards stacked 2x2, charts in scrollable containers

---

#### 7.7.2 Company Management

**Route:** `/super-admin/companies`  
**Files:** `src/pages/admin/CompanyManagement.tsx`, `src/pages/admin/CompanyDetail.tsx`

Full CRUD management for all tenant companies.

**Company Table Columns:**
- Company name + logo
- Plan badge
- Status (Active / Suspended / Trial)
- Device count
- Monthly Revenue
- Region
- Created date
- Actions: View, Edit Plan, Suspend, Delete

**Mobile:** Card-based view with company name, plan badge, status pill, and quick action icons.

**Company Detail Page** (`/super-admin/companies/:companyId`):
- Profile header: name, logo, contact, industry, region
- Tabs: Overview | Users | Devices | Billing | Audit Logs | Settings
- Overview: KPI cards (device count, active users, MRR, SLA score), usage progress bars, activity timeline
- Users tab: list of all users in this company
- Billing tab: invoice history, next payment, plan change history
- Audit tab: all events from this company's users

---

#### 7.7.3 Global User Management

**Route:** `/super-admin/users`  
**Files:** `src/pages/admin/GlobalUserManagement.tsx`

Platform-wide user management across all companies.

**Features:**
- 1000+ user table with virtual scrolling
- Filter by company, role, status (Active/Suspended/Pending)
- Columns: Name, Email, Role, Company, Last Login, MFA Status, Session count, Actions
- Session tracking: View active sessions, force logout
- Bulk import: CSV upload with column mapping
- Invite by email: single or bulk invite with role assignment
- User status management: Activate, Suspend, Delete

---

#### 7.7.4 Global Billing

**Route:** `/super-admin/billing`  
**Files:** `src/pages/admin/GlobalBilling.tsx`

Platform revenue overview and financial management.

**Metrics:**
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- Churn rate % (monthly)
- Average Revenue Per User (ARPU)
- Lifetime Value (LTV) estimate
- Revenue by plan tier

**Charts:**
- MRR growth trend (12 months, area chart)
- Churn analysis (bar chart)
- Revenue breakdown by plan (stacked bar)
- New vs Expansion vs Churned MRR (waterfall concept)

---

#### 7.7.5 Orders & Invoices

**Route:** `/super-admin/orders`  
**Files:** `src/pages/admin/OrdersInvoices.tsx`

Complete order and invoice management.

**Order fields:**
- Order ID, Company, Plan, Quantity, Amount, Status (Active/Cancelled/Expired), Start/End date, Proration details

**Invoice fields:**
- Invoice number, Company, Issue date, Due date, Amount, Tax, Total, Status (Paid/Pending/Overdue)
- Line items: Plan subscription, setup fee, overage charges, credits
- PDF export per invoice
- Bulk export: all invoices as ZIP

**Filters:** Date range, company, status, plan

---

#### 7.7.6 Platform Audit

**Route:** `/super-admin/audit`  
**Files:** `src/pages/admin/PlatformAudit.tsx`

Global audit trail across all tenants and admin actions.

Identical fields to the tenant-level Audit Logs but shows events from ALL companies plus super admin actions (plan changes, user suspensions, system config updates).

---

#### 7.7.7 Access Control

**Route:** `/super-admin/access`  
**Files:** `src/pages/admin/AccessControl.tsx`

RBAC + ABAC permission matrix management.

**Features:**
- Permission matrix: Rows = roles, Columns = resources/actions — toggle individual cells
- Custom role creation: Name, description, inherit from existing role
- ABAC rule builder: "Allow [role] to [action] [resource] WHERE [attribute] = [value]"
- Region-level device access scoping
- Permission export/import as JSON

---

#### 7.7.8 System Alerts

**Route:** `/super-admin/alerts`  
**Files:** `src/pages/admin/SystemAlerts.tsx`

Platform-level infrastructure and system health alerts.

**Alert types:**
- High API latency
- Canister memory approaching limit
- Failed payment processing
- Unusual login patterns detected
- Certificate expiry warnings
- Backup job failures

**Features:**
- Alert feed with severity, timestamp, affected component, description
- Acknowledge / Resolve / Escalate actions
- Alert history with resolution notes

---

#### 7.7.9 Security Dashboard

**Route:** `/super-admin/security`  
**Files:** `src/pages/admin/SecurityDashboard.tsx`

Platform security monitoring and threat detection.

**Sections:**
- Login attempt heatmap (by hour of day x day of week)
- Failed login trend chart
- IP geolocation map of login origins
- Suspicious activity feed: multiple failed logins, unusual access times, new device logins
- MFA status overview: % of users with MFA enabled per company
- Active session count trend
- Force logout all sessions (emergency button)

---

#### 7.7.10 Global Analytics

**Route:** `/super-admin/analytics`  
**Files:** `src/pages/admin/GlobalAnalytics.tsx`

Advanced platform-wide analytics for business intelligence.

**Charts:**
- Usage heatmap by company (device count x time)
- Churn prediction analysis (risk score per company)
- Device count growth projections (12 months)
- Feature adoption rates by plan tier
- Geographic expansion map (companies by country/region)
- Support ticket volume trend

---

#### 7.7.11 Tenant Admin Panel

**Route:** `/tenant-admin/:companyId`  
**Files:** `src/pages/admin/TenantAdminPanel.tsx`

Per-company admin view accessible by Tenant Admins (within their own company) and Super Admins (for any company).

**Tabs:**
- Overview: company KPIs, usage gauges
- Users: company user list with invite/manage
- Billing: plan, invoices, usage
- Workflows: company-level automations
- Network Links: fiber assets in this company
- Settings: contact info, notification preferences

---

### 7.8 In-App Documentation

**Route:** `/docs`  
**Files:** `src/pages/Docs.tsx`

Renders this README.md directly inside the application.

**Features:**
- Fetches README.md from the project root at runtime
- Markdown renderer with syntax-highlighted code blocks
- Clickable table of contents (auto-generated from headings)
- Styled tables, badges, and callout blocks matching the app theme
- Dark/light mode aware (inherits app theme)
- Smooth scroll to anchor links

---

### 7.9 PWA & Mobile

**Files:** `src/frontend/index.html`, `src/frontend/public/manifest.json`, `src/frontend/public/sw.js`

FiberNMS is installable as a Progressive Web App on any device.

**PWA Manifest fields:**
- `name`: FiberNMS
- `short_name`: FiberNMS
- `display`: `standalone` (fullscreen app, no browser chrome)
- `start_url`: `/`
- `theme_color`: matches dark theme primary color
- `background_color`: dark background
- `icons`: multiple sizes (192x192, 512x512) for home screen and splash screen

**Service Worker capabilities:**
- Offline caching of app shell (HTML, JS, CSS, fonts)
- Background sync for queued actions
- Cache-first strategy for static assets
- Network-first strategy for API calls

**Install Banner:**
- Appears automatically on supported mobile browsers after 2 visits
- "Add FiberNMS to Home Screen" prompt
- Custom install button in the mobile header for manual install

---

## 8. Data Models & Fields

### Device

```typescript
interface Device {
  id: string;                    // Unique identifier (e.g., "olt-001")
  name: string;                  // Display name (e.g., "OLT-Core-North-01")
  type: DeviceType;              // "OLT" | "ONT" | "Splitter" | "Coupler" | "Router" | "JJB" | "Switch"
  status: DeviceStatus;          // "active" | "warning" | "faulty" | "offline" | "maintenance"
  lat: number;                   // GPS latitude
  lng: number;                   // GPS longitude
  region: string;                // e.g., "North", "South", "East", "West", "Central"
  txPower: number;               // Transmit power in dBm
  rxPower: number;               // Receive power in dBm
  uptime: number;                // Uptime percentage (0-100)
  lastSeen: string;              // ISO timestamp of last heartbeat
  parentId?: string;             // Parent device ID (for tree structure)
  description?: string;          // Free-text description
  createdAt: string;             // ISO creation timestamp
}
```

### FiberRoute

```typescript
interface FiberRoute {
  id: string;                    // Unique route identifier
  name: string;                  // Route name (e.g., "Backbone-North-01")
  type: RouteType;               // "backbone" | "distribution" | "drop" | "feeder"
  status: "active" | "degraded" | "cut" | "maintenance";
  fromDeviceId: string;          // Source device ID
  toDeviceId: string;            // Destination device ID
  coordinates: [number, number][]; // Array of [lat, lng] waypoints
  lengthKm: number;              // Total route length in kilometers
  fiberCount: number;            // Number of fiber strands
  attenuation: number;           // Signal attenuation in dB/km
  installedDate: string;         // ISO date
  lastInspected: string;         // ISO date of last inspection
}
```

### Alert

```typescript
interface Alert {
  id: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  title: string;                 // Short summary (e.g., "OLT Signal Degraded")
  message: string;               // Detailed description
  deviceId: string;              // Related device ID
  deviceName: string;            // Denormalized device name
  region: string;
  timestamp: string;             // ISO timestamp
  resolved: boolean;             // Whether alert has been acknowledged
  resolvedAt?: string;           // ISO timestamp of resolution
  resolvedBy?: string;           // User email who resolved it
}
```

### SLARecord

```typescript
interface SLARecord {
  id: string;
  customerId: string;
  customerName: string;
  circuitId: string;
  region: string;
  targetUptime: number;          // e.g., 99.9 (percentage)
  actualUptime: number;          // Measured uptime this period (percentage)
  mttr: number;                  // Mean Time to Repair (minutes)
  mtbf: number;                  // Mean Time Between Failures (hours)
  breachCount: number;           // Number of SLA breaches this period
  penaltyAmount: number;         // Penalty exposure in USD
  period: string;                // e.g., "2026-04" (YYYY-MM)
  status: "met" | "at_risk" | "breached";
}
```

### PredictiveAlert

```typescript
interface PredictiveAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  riskScore: number;             // 0-100 (higher = more likely to fail)
  predictedFailureHours: number; // Hours until predicted failure
  anomalyType: string;           // e.g., "signal_degradation" | "temperature_spike" | "ber_increase"
  confidence: number;            // Model confidence 0-1
  recommendedAction: string;     // e.g., "Schedule preventive maintenance within 48h"
  createdAt: string;
}
```

### AuditLog

```typescript
interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;                 // User email
  actorRole: string;             // Role at time of action
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "EXPORT" | "CONFIG_CHANGE";
  resourceType: string;          // "Device" | "Route" | "User" | "Alert" | "Workflow" | "Subscription"
  resourceId: string;
  resourceName: string;
  before?: Record<string, unknown>; // State before change
  after?: Record<string, unknown>;  // State after change
  ipAddress: string;
  sessionId: string;
  description: string;           // Human-readable summary
}
```

### CapacityRecord

```typescript
interface CapacityRecord {
  id: string;
  region: string;
  oltId: string;
  oltName: string;
  totalPorts: number;
  usedPorts: number;
  utilizationPercent: number;    // usedPorts / totalPorts * 100
  forecastedUtilization30d: number;   // Projected 30-day utilization
  forecastedUtilization90d: number;   // Projected 90-day utilization
  daysToExhaustion: number;      // Estimated days until 100% utilization
  recordedAt: string;
}
```

### Company (Super Admin)

```typescript
interface Company {
  id: string;
  name: string;
  logo?: string;                 // URL to logo image
  domain: string;                // e.g., "acme-isp.com"
  industry: string;              // e.g., "ISP", "Carrier", "Enterprise"
  country: string;
  region: string;
  contactName: string;
  contactEmail: string;
  plan: Plan;                    // "BASIC" | "PROFESSIONAL" | "ENTERPRISE" | "ULTRA"
  status: "active" | "suspended" | "trial" | "cancelled";
  deviceCount: number;
  userCount: number;
  mrr: number;                   // Monthly Recurring Revenue (USD)
  createdAt: string;
  trialEndsAt?: string;
  subscriptionStart: string;
  subscriptionEnd: string;
  notes?: string;
}
```

### AdminUser (Super Admin)

```typescript
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;                // "superAdmin" | "admin" | "engineer" | "operator" | "viewer"
  companyId: string;
  companyName: string;
  status: "active" | "suspended" | "pending" | "invited";
  mfaEnabled: boolean;
  lastLogin: string;
  loginCount: number;
  sessionCount: number;          // Active sessions
  createdAt: string;
  invitedBy?: string;
}
```

### Order

```typescript
interface Order {
  id: string;
  companyId: string;
  companyName: string;
  plan: Plan;
  quantity: number;              // Number of seats/licenses
  unitPrice: number;
  totalAmount: number;
  status: "active" | "cancelled" | "expired" | "pending";
  startDate: string;
  endDate: string;
  prorationAmount?: number;      // Credit/debit from mid-cycle changes
  createdAt: string;
  updatedAt: string;
}
```

### Invoice

```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;         // e.g., "INV-2026-001234"
  companyId: string;
  companyName: string;
  orderId: string;
  issueDate: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;               // e.g., 0.20 (20%)
  taxAmount: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "draft";
  paidAt?: string;
  paymentMethod?: string;
}

interface InvoiceLineItem {
  description: string;           // e.g., "ENTERPRISE Plan - April 2026"
  quantity: number;
  unitPrice: number;
  amount: number;
  type: "subscription" | "setup" | "overage" | "credit" | "tax";
}
```

### Fault Visualization Nodes

```typescript
// Used exclusively by the Fault Map module
interface FaultNode {
  id: string;
  type: "OLT" | "Splitter" | "Joint" | "customer";
  name: string;
  lat: number;
  lng: number;
  status: "active" | "down" | "affected";
  customerCount?: number;        // Only for customer-type nodes
}

interface FaultLink {
  id: string;
  from_node: string;             // Source node ID
  to_node: string;               // Destination node ID
  status: "active" | "cut" | "degraded";
}
```

---

## 9. State Management (Zustand)

### `authStore` — Authentication & Session

```typescript
// src/store/authStore.ts
{
  currentUser: User | null;
  isAuthenticated: boolean;

  // Actions
  login(email: string, password: string): boolean;
  register(userData: RegisterPayload): void;
  logout(): void;
  updateUser(updates: Partial<User>): void;
}
```

Persisted to `localStorage` under key `fibernms-auth`. Contains 3 seed users inline. Role determines which navigation sections are visible.

---

### `subscriptionStore` — Plan & Quota

```typescript
// src/store/subscriptionStore.ts
{
  plan: Plan;                    // "BASIC" | "PROFESSIONAL" | "ENTERPRISE" | "ULTRA"
  deviceUsed: number;
  deviceLimit: number;           // -1 = unlimited (ULTRA)
  apiCallsUsed: number;
  apiCallsQuota: number;
  expiryDate: string;
  licenseKey: string | null;
  isLicenseValid: boolean;

  // Actions
  setPlan(plan: Plan): void;
  validateLicenseKey(key: string): boolean;
  incrementDeviceUsage(): void;
  resetQuota(): void;
}
```

Demo plan: `ENTERPRISE`. Valid license keys are stored in the store for demo activation.

---

### `networkStore` — Devices, Routes, Alerts

```typescript
// src/store/networkStore.ts
{
  devices: Device[];
  routes: FiberRoute[];
  alerts: Alert[];
  slaRecords: SLARecord[];
  predictiveAlerts: PredictiveAlert[];
  auditLogs: AuditLog[];
  capacityRecords: CapacityRecord[];
  layerVisibility: LayerVisibility;
  undoHistory: NetworkSnapshot[];  // Max 20 snapshots

  // Device actions
  addDevice(device: Device): void;
  updateDevice(id: string, updates: Partial<Device>): void;
  deleteDevice(id: string): void;
  deleteDeviceWithChildren(id: string): void;  // Cascade BFS delete

  // Route actions
  addRoute(route: FiberRoute): void;
  updateRoute(id: string, updates: Partial<FiberRoute>): void;
  deleteRoute(id: string): void;

  // Alert actions
  resolveAlert(id: string, resolvedBy: string): void;

  // Undo
  undo(): void;

  // Layer visibility
  toggleLayer(layer: keyof LayerVisibility): void;
}
```

Not persisted to localStorage (reloads from `mockData.ts` on every page load to ensure a clean demo state). The undo history stores full deep clones of `{ devices, routes }` as snapshots.

---

## 10. Mock Data Layer

All data is deterministic — generated from a Mulberry32 PRNG seeded with `42`, ensuring consistent device names, coordinates, and signal values across reloads.

### `mockData.ts`

| Dataset | Count | Generation method |
|---|---|---|
| Devices | 1,000+ | PRNG-distributed across 5 regions, 7 types |
| FiberRoutes | 100+ | Connecting adjacent devices in topology tree |
| Alerts | 500+ | Mixed severities, some resolved |
| SLARecords | 200+ | Per customer circuit, realistic uptime values |
| PredictiveAlerts | 150+ | Risk scores 0-100, anomaly types |
| AuditLogs | 300+ | Mixed action types, all roles |
| CapacityRecords | 50+ | Per OLT, utilization trends |

### `superAdminMockData.ts`

| Dataset | Count |
|---|---|
| Companies | 54 (across 5 regions, all 4 plan tiers) |
| Users | 1,000+ (2-50 users per company) |
| Orders | 500+ (active, cancelled, expired) |
| Invoices | 300+ (paid, pending, overdue) |
| Audit Events | 500+ (platform-wide, all action types) |
| Security Events | 200+ (login attempts, suspicious activity) |
| System Alerts | 30+ (infra alerts, certificate warnings) |
| Revenue Metrics | 12 months of MRR/ARR/churn data |

### `faultMockData.ts`

Smaller dataset representing a realistic ISP topology for the fault visualization module:
- 1 OLT (root)
- 5 Splitters (second level)
- 20 Joint nodes (distribution)
- 200 Customer nodes (leaf)
- 230 fiber links connecting the tree

### `billingMockData.ts`

- Monthly MRR/ARR figures (12 months)
- Churn rates, expansion MRR, new MRR
- Revenue by plan tier breakdown
- Tax details by jurisdiction
- Invoice templates

---

## 11. Route Table

### Public Routes

| Path | Page | Description |
|---|---|---|
| `/login` | Login | Username/password login |
| `/register` | Register | 5-step enterprise registration |

### Core NOC Routes (all roles)

| Path | Page | Description |
|---|---|---|
| `/` | MapDashboard | GIS fiber network map |
| `/fault-map` | FaultVisualizationPage | Leaflet fault visualization |
| `/devices` | Devices | Device CRUD table |
| `/topology` | Topology | Multi-layer network graph |
| `/monitoring` | Monitoring | Real-time alerts and metrics |
| `/tools` | Tools | Power calculator, OTDR |
| `/analytics` | Analytics | Network performance charts |
| `/workflows` | Workflows | Visual automation builder |
| `/ai` | AIAssistant | Natural language NOC copilot |

### Enterprise Routes (PROFESSIONAL+ plan)

| Path | Page | Plan gate |
|---|---|---|
| `/sla` | SLADashboard | PROFESSIONAL+ |
| `/predictive` | PredictiveIntelligence | ENTERPRISE+ |
| `/capacity` | CapacityPlanning | ENTERPRISE+ |
| `/audit` | AuditLogs | PROFESSIONAL+ |

### SaaS & Billing Routes

| Path | Page | Plan gate |
|---|---|---|
| `/billing` | Billing | All plans |
| `/plans` | Plans | All plans |
| `/usage` | UsageAnalytics | All plans |
| `/integrations` | Integrations | ENTERPRISE+ |
| `/settings/branding` | Branding | ENTERPRISE+ |
| `/settings/license` | License | All plans |
| `/tenants` | MultiTenantManager | ULTRA |
| `/docs` | InAppDocs | All plans |

### Super Admin Routes (superAdmin role only)

| Path | Page | Description |
|---|---|---|
| `/super-admin` | SuperAdminDashboard | Global overview |
| `/super-admin/companies` | CompanyManagement | 54 companies CRUD |
| `/super-admin/companies/:id` | CompanyDetail | Company profile + tabs |
| `/super-admin/usage` | UsageLimits | Per-company usage bars |
| `/super-admin/users` | GlobalUserManagement | 1000+ users |
| `/super-admin/billing` | GlobalBilling | MRR/ARR/churn |
| `/super-admin/orders` | OrdersInvoices | Orders + PDF invoices |
| `/super-admin/audit` | PlatformAudit | Global audit trail |
| `/super-admin/access` | AccessControl | RBAC+ABAC matrix |
| `/super-admin/alerts` | SystemAlerts | Platform infra alerts |
| `/super-admin/security` | SecurityDashboard | Login threats, MFA |
| `/super-admin/analytics` | GlobalAnalytics | Business intelligence |
| `/tenant-admin/:id` | TenantAdminPanel | Per-company admin view |

---

## 12. Subscription Tiers & Feature Gating

### How Feature Gating Works

Every feature-gated page or component is wrapped with `<FeatureGate feature={FeatureFlag.XYZ}>`. The gate checks:

```typescript
// src/hooks/useFeature.ts
function useFeature(feature: FeatureFlag): { hasAccess: boolean; requiredPlan: Plan } {
  const { plan } = useSubscriptionStore();
  const requiredPlan = FEATURE_PLAN_MAP[feature];
  const hasAccess = PLAN_ORDER.indexOf(plan) >= PLAN_ORDER.indexOf(requiredPlan);
  return { hasAccess, requiredPlan };
}
```

If `hasAccess` is `false`, `FeatureGate` renders `LockedFeatureOverlay` over the child component:
- Blurred preview of the underlying content
- Lock icon + "Available on [PLAN_NAME]" text
- "Upgrade Now" button opens `PlanComparisonModal`

### Plan Hierarchy

```
BASIC < PROFESSIONAL < ENTERPRISE < ULTRA
```

A user on ENTERPRISE has access to all BASIC and PROFESSIONAL features automatically.

### Changing Plans (Demo)

1. Navigate to `/settings/license`
2. Enter a valid demo license key
3. The store updates the plan immediately, unlocking all gated features

---

## 13. Role-Based Navigation

Navigation sections visible per role are controlled by `useRoleNav()` in `src/hooks/useRoleNav.ts`.

### Desktop Sidebar Sections

| Section | Super Admin | Admin | Engineer | Operator | Viewer |
|---|---|---|---|---|---|
| **Core NOC** (Map, Devices, Topology, Monitoring, Tools, Analytics, Workflows, AI) | Yes | Yes | Yes | Yes | Partial |
| **Enterprise** (SLA, Predictive, Capacity, Audit) | Yes | Yes | Yes | No | No |
| **Billing & Plans** (Billing, Plans, Usage, Integrations) | Yes | Yes | No | No | No |
| **Admin** (Branding, License, Tenants) | Yes | Yes | No | No | No |
| **Super Admin Panel** (all 11 pages) | Yes | No | No | No | No |

**Viewer** sees only: Map, Devices, Topology, Monitoring, Analytics (read-only)

### Mobile Bottom Navigation

Bottom tabs adapt per role. See section 7.2 for the full tab mapping per role.

---

## 14. Design System

FiberNMS uses an OKLCH-based design token system for perceptually uniform colors.

### Themes

- **Dark** (default): Deep navy backgrounds, neon accents, glassmorphism cards
- **Light**: Clean white backgrounds, muted accents, subtle shadows

Theme toggle is in the top-right corner of the Navbar.

### Core Color Tokens (CSS Variables)

```css
/* OKLCH primary palette */
--color-primary:     oklch(0.65 0.2 250);   /* Brand blue */
--color-accent:      oklch(0.70 0.25 140);  /* Neon green */
--color-warning:     oklch(0.75 0.20 60);   /* Amber */
--color-danger:      oklch(0.60 0.25 20);   /* Red */
--color-success:     oklch(0.68 0.20 145);  /* Green */

/* Surfaces (dark theme) */
--color-bg:          oklch(0.10 0.02 250);  /* Deep navy */
--color-surface:     oklch(0.15 0.03 250);  /* Card background */
--color-border:      oklch(0.25 0.04 250);  /* Subtle border */
```

### Typography

- **Font:** System font stack (Inter / SF Pro / Segoe UI)
- **Scale:** 12px (caption) to 14px (body) to 16px (medium) to 20px (heading) to 32px (display)
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Component Patterns

- **GlassCard:** `backdrop-blur-md bg-white/5 border border-white/10 rounded-xl`
- **StatusBadge:** Colored pill with status dot (green/yellow/red/gray)
- **Stat cards:** Icon + value + label + trend percentage

### Custom Animations (Tailwind keyframes)

| Name | Usage |
|---|---|
| `topology-glow` | Neon glow pulse on OLT nodes in the deep-space canvas |
| `blink-fault` | Red blink on cut fiber segments in fault visualization |
| `slide-in` | Drawer slide-in animation |
| `data-flow` | Moving dots along topology graph edges |
| `accordion-down/up` | Shadcn UI accordion expand/collapse |

### Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| `sm` | 640px | Stack charts vertically, hide secondary columns |
| `md` | 768px | Switch from bottom nav to sidebar |
| `lg` | 1024px | Full 3-column layouts |
| `xl` | 1280px | Extended sidebars, wider tables |
| `2xl` | 1536px | Max content width, centred layout |

---

## 15. Performance & Optimization

| Technique | Applied To |
|---|---|
| **Virtualized tables** (TanStack Table + windowing) | Devices table (1000+ rows), User management, Company list |
| **Lazy loading** (React.lazy + Suspense) | All 37 pages (code-split per route) |
| **Dynamic imports** | Map components (Leaflet, Mapbox) |
| **Seeded PRNG** (no random() calls at render) | All mock data generators |
| **Memoization** (useMemo, useCallback) | Chart data transforms, filter functions |
| **CSS animations** (no JS for transitions) | Status pulses, data-flow dots, fault blinks |
| **Responsive images** | Logo, icons use SVG |
| **Web Workers** (planned) | OTDR simulation, BFS fault computation |
| **Offscreen canvas** (planned) | Topology graph for very large networks |
| **PWA offline caching** | App shell and static assets |

---

## 16. Roadmap

### Near-term
- [ ] Forgot password / email recovery flow
- [ ] Two-factor authentication (TOTP)
- [ ] SSO / SAML integration
- [ ] User profile panel (avatar, notification settings)
- [ ] Tenant onboarding wizard
- [ ] Usage-based billing alerts
- [ ] Redo/history panel for map actions (undo is live; redo planned)

### Mid-term
- [ ] Real Motoko backend integration (replace mock data)
- [ ] Real-time WebSocket feed (replace eventBus simulation)
- [ ] Plugin marketplace (dynamic module injection)
- [ ] Dashboard builder (drag-and-drop KPI widget layout)
- [ ] Satellite and weather map overlays
- [ ] PDF fault report export from fault visualization
- [ ] Enhanced drag-and-drop workflow builder

### Long-term
- [ ] Digital twin simulation (side-by-side before/after view)
- [ ] AI alert correlation and root cause analysis
- [ ] Multi-region failover monitoring
- [ ] Mobile field engineer app (camera + QR scanner for device tagging)
- [ ] OTDR trace import and analysis
- [ ] Hardware integration APIs (SNMP, NETCONF, OpenConfig)

---

*Last updated: April 2026*  
*GitHub: https://github.com/Mr-fuaaaadh/fibernms*  
*Support: Caffeine support channels at https://caffeine.ai*
