# FiberNMS

> **Carrier-grade, SaaS-based Optical Fiber Network Management System (OFNMS)**

FiberNMS is a production-ready frontend for telecom operators, ISPs, and large infrastructure providers — built to handle **100K–1M+ devices** with multi-tenant SaaS architecture, a 4-tier subscription model, real-time monitoring, predictive AI, and a full enterprise Super Admin control panel.

**GitHub:** https://github.com/Mr-fuaaaadh/fibernms

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Pages Overview](#pages-overview)
5. [Feature & Subscription System](#feature--subscription-system)
6. [Authentication & State](#authentication--state)
7. [Design System](#design-system)
8. [Mock Data](#mock-data)
9. [Getting Started](#getting-started)
10. [Architecture Patterns](#architecture-patterns)
11. [Deployment](#deployment)
12. [Customization](#customization)
13. [Roadmap](#roadmap)
14. [Contributing](#contributing)
15. [License](#license)

---

## Overview

FiberNMS delivers the full operational stack of a telecom Network Operations Center (NOC) in a modern web application. It competes with enterprise platforms such as **Nokia NetAct**, **Huawei U2000**, **Cisco DNA Center**, and **Zabbix** in scalability, observability, automation, intelligence, and monetization.

### Core Capabilities

| Category | Capability |
|---|---|
| **Network Operations** | GIS map, device management, multi-layer topology (L1/L2/L3), live monitoring |
| **AI & Intelligence** | Predictive fault detection, anomaly scoring, AI assistant, route optimization |
| **Automation** | Visual workflow builder (n8n-style), pre-built and AI-generated workflows |
| **SaaS Monetization** | 4-tier plans, feature gating, billing, usage analytics, white-labeling |
| **Enterprise Admin** | Super Admin panel, 50+ company management, 1000+ user management, global audit |
| **Security** | RBAC + ABAC, session monitoring, suspicious activity detection, MFA status |
| **Observability** | SLA dashboards, capacity planning, audit logs, metrics explorer |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (with App Router patterns) |
| **Language** | TypeScript (strict) |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 + OKLCH design tokens |
| **Routing** | TanStack Router |
| **Data Fetching** | TanStack React Query |
| **State Management** | Zustand (with localStorage persistence) |
| **UI Components** | Radix UI + shadcn/ui |
| **Icons** | Lucide React, React Icons |
| **Charts** | Recharts |
| **Maps** | React Leaflet |
| **Forms** | React Hook Form + Zod |
| **Animation** | Motion (Framer Motion v11+) |
| **Theme** | next-themes (dark/light toggle) |
| **Linting/Formatting** | Biome |
| **Backend (scaffold)** | Motoko (Internet Computer) |

---

## Project Structure

```
app/
├── src/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── features.ts            # Feature flags + plan tiers config
│   │   │   │
│   │   │   ├── store/
│   │   │   │   ├── authStore.ts           # Authentication state (Zustand + localStorage)
│   │   │   │   ├── subscriptionStore.ts   # Current plan, usage quotas, expiry
│   │   │   │   └── networkStore.ts        # Active devices, alert counts, WebSocket sim
│   │   │   │
│   │   │   ├── types/
│   │   │   │   ├── subscription.ts        # Plan, Feature, BillingRecord types
│   │   │   │   ├── superAdmin.ts          # Company, GlobalUser, Order, Invoice types
│   │   │   │   └── network.ts             # Device, Alert, FiberRoute, SLARecord types
│   │   │   │
│   │   │   ├── data/
│   │   │   │   ├── mockData.ts            # 1000+ devices, 500+ alerts, fiber routes
│   │   │   │   ├── superAdminMockData.ts  # 54 companies, 1000+ users, orders, invoices
│   │   │   │   └── billingMockData.ts     # MRR, ARR, churn metrics, tax breakdowns
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useFeature.ts          # Plan-aware feature gate hook
│   │   │   │   ├── useAuth.ts             # Auth helpers (isAuthenticated, isSuperAdmin)
│   │   │   │   └── use-mobile.tsx         # Responsive breakpoint hook
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── utils.ts               # cn(), formatBytes(), formatCurrency()
│   │   │   │   └── eventBus.ts            # Real-time simulation event emitter
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── Layout.tsx             # Shell: Sidebar + Navbar + main content
│   │   │   │   ├── Navbar.tsx             # Top bar, theme toggle, user menu, alerts
│   │   │   │   ├── Sidebar.tsx            # Nav links, plan badge, Super Admin section
│   │   │   │   ├── GlassCard.tsx          # Glassmorphism card primitive
│   │   │   │   ├── CommandPalette.tsx     # Global CMD+K search palette
│   │   │   │   │
│   │   │   │   ├── subscription/
│   │   │   │   │   ├── FeatureGate.tsx           # Render children or locked overlay
│   │   │   │   │   ├── LockedFeatureOverlay.tsx  # Blur + lock icon + upgrade CTA
│   │   │   │   │   ├── UpgradeCTA.tsx            # Inline upgrade prompt banner
│   │   │   │   │   ├── PlanBadge.tsx             # Colored badge for plan tier
│   │   │   │   │   ├── PlanComparisonModal.tsx   # Full 4-tier feature comparison modal
│   │   │   │   │   └── UsageProgressBar.tsx      # Device/API usage bar with thresholds
│   │   │   │   │
│   │   │   │   ├── monitoring/
│   │   │   │   │   ├── StatCard.tsx        # KPI stat card with trend indicator
│   │   │   │   │   ├── StatusPieChart.tsx  # Device status donut chart
│   │   │   │   │   ├── SignalLineChart.tsx # Real-time signal strength over time
│   │   │   │   │   └── AlertsPanel.tsx     # Scrollable alert feed with severity colors
│   │   │   │   │
│   │   │   │   ├── devices/
│   │   │   │   │   ├── DeviceTable.tsx     # Virtualized device data table
│   │   │   │   │   ├── DeviceFilters.tsx   # Filter bar (type, status, region, search)
│   │   │   │   │   └── AddDeviceModal.tsx  # Add/edit device form modal
│   │   │   │   │
│   │   │   │   ├── map/
│   │   │   │   │   ├── DeviceMarker.tsx       # Custom map marker with severity ring
│   │   │   │   │   ├── DeviceDetailPanel.tsx  # Side panel for selected device
│   │   │   │   │   ├── DrawToolbar.tsx        # GIS draw/edit fiber routes toolbar
│   │   │   │   │   ├── LayerTogglePanel.tsx   # Toggle map layers (devices, routes, heatmap)
│   │   │   │   │   └── RouteEditPanel.tsx     # Fiber route property editor
│   │   │   │   │
│   │   │   │   ├── topology/
│   │   │   │   │   ├── TopologyGraph.tsx      # Multi-layer L1/L2/L3 graph canvas
│   │   │   │   │   └── TopologyNodePanel.tsx  # Node detail drawer
│   │   │   │   │
│   │   │   │   └── tools/
│   │   │   │       ├── PowerCalculator.tsx    # Optical power budget calculator
│   │   │   │       └── FaultDetectionPanel.tsx # Manual fault trace + OTDR sim
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Login.tsx               # Username/password NOC login
│   │   │   │   ├── Register.tsx            # 5-step enterprise registration
│   │   │   │   ├── MapDashboard.tsx        # GIS fiber map (home)
│   │   │   │   ├── Devices.tsx             # Device management (CRUD)
│   │   │   │   ├── Topology.tsx            # Multi-layer topology viewer
│   │   │   │   ├── Monitoring.tsx          # Real-time metrics + alerts
│   │   │   │   ├── Tools.tsx               # Power calculator, fault tools
│   │   │   │   ├── Analytics.tsx           # Network performance analytics
│   │   │   │   ├── Workflows.tsx           # Visual automation builder
│   │   │   │   ├── AIAssistant.tsx         # AI copilot + NL automation
│   │   │   │   ├── SLADashboard.tsx        # SLA & service assurance
│   │   │   │   ├── PredictiveIntelligence.tsx # AI risk scores + fault prediction
│   │   │   │   ├── CapacityPlanning.tsx    # Utilization trends + growth forecasts
│   │   │   │   ├── AuditLogs.tsx           # Timeline audit log viewer
│   │   │   │   ├── Billing.tsx             # Subscription plan + billing history
│   │   │   │   ├── UsageAnalytics.tsx      # Per-tenant usage charts
│   │   │   │   ├── Plans.tsx               # Plan comparison dashboard
│   │   │   │   ├── Integrations.tsx        # API keys + webhooks + connectors
│   │   │   │   ├── Branding.tsx            # White-label settings (ULTRA)
│   │   │   │   ├── License.tsx             # License key validation UI
│   │   │   │   └── Tenants.tsx             # Multi-tenant management (ULTRA)
│   │   │   │
│   │   │   └── pages/admin/
│   │   │       ├── SuperAdminDashboard.tsx  # Global overview (MRR, companies, devices)
│   │   │       ├── CompanyManagement.tsx    # 54-company registry CRUD
│   │   │       ├── CompanyDetail.tsx        # Per-company profile + usage + billing
│   │   │       ├── UsageLimits.tsx          # Per-company usage progress bars
│   │   │       ├── GlobalUserManagement.tsx # 1000+ users table, invite, bulk import
│   │   │       ├── GlobalBilling.tsx        # MRR, ARR, churn, invoices, tax details
│   │   │       ├── OrdersInvoices.tsx       # Orders table + invoice PDF export
│   │   │       ├── PlatformAudit.tsx        # Global audit timeline + CSV export
│   │   │       ├── AccessControl.tsx        # RBAC + ABAC permission matrix
│   │   │       ├── SystemAlerts.tsx         # Platform-level outage / API alerts
│   │   │       ├── SecurityDashboard.tsx    # Login attempts, IP tracking, MFA status
│   │   │       ├── GlobalAnalytics.tsx      # Revenue, device growth, usage heatmaps
│   │   │       └── TenantAdminPanel.tsx     # Per-company operator admin view
│   │   │
│   │   ├── index.css            # OKLCH design tokens + custom utilities
│   │   ├── tailwind.config.js   # Tailwind theme extensions + animation keyframes
│   │   └── index.html           # App entry point
│   │
│   └── backend/
│       └── main.mo              # Motoko backend scaffold (Internet Computer)
│
├── DESIGN.md                    # Design system brief (palette, zones, typography)
├── caffeine.toml                # Caffeine platform config
├── package.json
└── README.md
```

---

## Pages Overview

### Core NOC Pages (14 pages)

| Route | Page | Description |
|---|---|---|
| `/` | Map Dashboard | GIS fiber map with device markers, clustering, layer toggles, fiber route drawing |
| `/devices` | Devices | Full CRUD device management, virtualized table, bulk actions, filters |
| `/topology` | Topology | Multi-layer L1 (Fiber) / L2 (VLAN) / L3 (IP) graph visualization |
| `/monitoring` | Monitoring | Real-time signal metrics, status charts, alert feed, WebSocket simulation |
| `/tools` | Tools | Optical power budget calculator, fault detection panel, OTDR simulation |
| `/analytics` | Analytics | Network performance charts, trend analysis, export |
| `/workflows` | Workflows | Visual drag-and-drop automation builder (n8n-style) |
| `/ai` | AI Assistant | NL copilot with real-time context, predictive suggestions |
| `/sla` | SLA Dashboard | Per-customer SLA metrics, breach alerts, service assurance |
| `/predictive` | Predictive Intelligence | AI risk scores, fault heatmap overlay, at-risk device panel |
| `/capacity` | Capacity Planning | Utilization trends, growth projections, exhaustion warnings |
| `/audit` | Audit Logs | Timeline audit log, filters by user/action/company, CSV export |
| `/login` | Login | Username/password NOC login with theme toggle |
| `/register` | Register | 5-step enterprise registration (personal → org → network → plan → password) |

### SaaS & Monetization Pages (7 pages)

| Route | Page | Description |
|---|---|---|
| `/billing` | Billing | Current plan overview, device usage, API usage, billing history |
| `/plans` | Plan Comparison | Side-by-side 4-tier feature matrix, upgrade CTAs |
| `/usage` | Usage Analytics | Device growth, alert volume, data usage, API call charts |
| `/integrations` | Integrations | API key management, webhook config, OSS/BSS/CRM/ticketing connectors |
| `/settings/branding` | Branding | White-label logo, colors, domain config (ULTRA only) |
| `/settings/license` | License | License key validation UI, expiry warnings, feature disable on expiry |
| `/tenants` | Tenants | Multi-tenant switcher, isolation, create/assign plan (ULTRA only) |

### Super Admin Pages (13 pages)

| Route | Page | Description |
|---|---|---|
| `/super-admin` | Global Dashboard | MRR/ARR, total companies, active subscriptions, devices, system health |
| `/super-admin/companies` | Company Registry | Manage 54+ telecom companies — create, edit, suspend, activate, delete |
| `/super-admin/companies/:id` | Company Detail | Company profile, usage stats, billing history, activity logs |
| `/super-admin/usage` | Usage & Limits | Per-company progress bars for devices, API, data, alerts |
| `/super-admin/users` | Global Users | 1000+ users table, filter by company/role/status, invite, force logout |
| `/super-admin/billing` | Global Billing | MRR, ARR, churn rate, revenue overview, invoice management |
| `/super-admin/orders` | Orders & Invoices | Full orders table, invoice PDF export, GST/VAT tax details |
| `/super-admin/audit` | Platform Audit | Global audit timeline across all tenants, CSV export |
| `/super-admin/access` | Access Control | RBAC + ABAC permission matrix with toggleable role/attribute rules |
| `/super-admin/alerts` | System Alerts | Platform-level outage, API failure, error rate notifications |
| `/super-admin/security` | Security Dashboard | Login attempts, suspicious activity, IP tracking, MFA status |
| `/super-admin/analytics` | Global Analytics | Top customers by revenue, device growth trends, usage heatmaps |
| `/tenant-admin/:companyId` | Tenant Admin Panel | Per-company admin view: users, usage, billing, workflows, network |

---

## Feature & Subscription System

### Plan Tiers

| Plan | Devices | Price | Target |
|---|---|---|---|
| **BASIC** | 1,000 | $9/mo | Starter ISP |
| **PROFESSIONAL** | 10,000 | $49/mo | Growing ISP |
| **ENTERPRISE** *(demo default)* | 100,000 | $199/mo | Tier-2 Telecom |
| **ULTRA** | Unlimited (1M+) | $999/mo | Tier-1 Global Operator |

### Feature Flags

```typescript
// src/frontend/src/config/features.ts

export enum FeatureFlag {
  AI_INSIGHTS         = "AI_INSIGHTS",
  AI_PREDICTIVE       = "AI_PREDICTIVE",
  WORKFLOW_AUTOMATION = "WORKFLOW_AUTOMATION",
  WORKFLOW_ADVANCED   = "WORKFLOW_ADVANCED",
  DIGITAL_TWIN        = "DIGITAL_TWIN",
  ADVANCED_MONITORING = "ADVANCED_MONITORING",
  HISTORICAL_DATA     = "HISTORICAL_DATA",
  ALERT_CORRELATION   = "ALERT_CORRELATION",
  SLA_DASHBOARD       = "SLA_DASHBOARD",
  TOPOLOGY_ADVANCED   = "TOPOLOGY_ADVANCED",
  MAP_ADVANCED        = "MAP_ADVANCED",
  CAPACITY_PLANNING   = "CAPACITY_PLANNING",
  MULTI_REGION        = "MULTI_REGION",
  MULTI_TENANT        = "MULTI_TENANT",
  WHITE_LABELING      = "WHITE_LABELING",
  API_ACCESS          = "API_ACCESS",
  RBAC_ABAC           = "RBAC_ABAC",
  CUSTOM_PLUGINS      = "CUSTOM_PLUGINS",
}

export const FEATURES: Record<FeatureFlag, PlanTier[]> = {
  [FeatureFlag.AI_INSIGHTS]:         ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.AI_PREDICTIVE]:       ["ULTRA"],
  [FeatureFlag.WORKFLOW_AUTOMATION]: ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.WORKFLOW_ADVANCED]:   ["ULTRA"],
  [FeatureFlag.DIGITAL_TWIN]:        ["ULTRA"],
  [FeatureFlag.ADVANCED_MONITORING]: ["PROFESSIONAL", "ENTERPRISE", "ULTRA"],
  [FeatureFlag.HISTORICAL_DATA]:     ["PROFESSIONAL", "ENTERPRISE", "ULTRA"],
  [FeatureFlag.ALERT_CORRELATION]:   ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.SLA_DASHBOARD]:       ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.TOPOLOGY_ADVANCED]:   ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.MAP_ADVANCED]:        ["PROFESSIONAL", "ENTERPRISE", "ULTRA"],
  [FeatureFlag.CAPACITY_PLANNING]:   ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.MULTI_REGION]:        ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.MULTI_TENANT]:        ["ULTRA"],
  [FeatureFlag.WHITE_LABELING]:      ["ULTRA"],
  [FeatureFlag.API_ACCESS]:          ["PROFESSIONAL", "ENTERPRISE", "ULTRA"],
  [FeatureFlag.RBAC_ABAC]:           ["ENTERPRISE", "ULTRA"],
  [FeatureFlag.CUSTOM_PLUGINS]:      ["ULTRA"],
};
```

### Feature Gating Components

| Component | Description |
|---|---|
| `FeatureGate` | Wraps a UI section — renders children if plan allows, `LockedFeatureOverlay` if not |
| `LockedFeatureOverlay` | Blur overlay + lock icon + "Upgrade to X" CTA button |
| `UpgradeCTA` | Inline banner with plan comparison link and upgrade button |
| `PlanBadge` | Colored badge chip showing plan tier (green/blue/purple/red) |
| `PlanComparisonModal` | Full 4-tier feature matrix modal with upgrade flow |
| `UsageProgressBar` | Animated progress bar with color thresholds (green → yellow → red at 80%/95%) |

### `useFeature` Hook

```typescript
// src/frontend/src/hooks/useFeature.ts

import { useSubscriptionStore } from "@/store/subscriptionStore";
import { FEATURES, FeatureFlag } from "@/config/features";

export function useFeature(flag: FeatureFlag): boolean {
  const { currentPlan } = useSubscriptionStore();
  return FEATURES[flag]?.includes(currentPlan) ?? false;
}

// Usage example:
const hasAI = useFeature(FeatureFlag.AI_INSIGHTS);
```

---

## Authentication & State

### Seed Users

| Email | Password | Plan | Role |
|---|---|---|---|
| `superadmin@fibernms.com` | `SuperAdmin@123` | ULTRA | Super Admin (platform owner) |
| `admin@fibernms.com` | `Admin@123` | ENTERPRISE | Company Admin |
| `operator@fibernms.com` | `Operator@123` | PROFESSIONAL | NOC Operator |

### Auth Store (`authStore.ts`)

Zustand store with localStorage persistence. Stores:
- `user` — `{ id, name, email, role, companyId, plan }`
- `isAuthenticated` — boolean
- `loginHistory` — last 5 login timestamps
- `sessionToken` — mock JWT-like token

All 14+ NOC pages check `isAuthenticated` on mount and redirect to `/login` if false. Super Admin pages also check `user.role === "SUPER_ADMIN"`.

### Subscription Store (`subscriptionStore.ts`)

| State Field | Type | Description |
|---|---|---|
| `currentPlan` | `PlanTier` | Active plan: `BASIC \| PROFESSIONAL \| ENTERPRISE \| ULTRA` |
| `deviceUsed` | `number` | Current device count for this tenant |
| `deviceLimit` | `number` | Max devices allowed on current plan |
| `apiUsed` | `number` | API calls used this billing cycle |
| `apiQuota` | `number` | Max API calls on current plan |
| `expiryDate` | `string` | ISO date of plan/license expiry |
| `billingCycle` | `"monthly" \| "yearly"` | Current billing cycle |

### Demo License Keys

| Key | Plan |
|---|---|
| `FNMS-BASIC-2026-DEMO` | BASIC |
| `FNMS-PRO-2026-DEMO` | PROFESSIONAL |
| `FNMS-ENT-2026-DEMO-XXXXXX` | ENTERPRISE |
| `FNMS-ULTRA-2026-DEMO` | ULTRA |

---

## Design System

### Color Tokens (OKLCH)

| Token | OKLCH Value | Usage |
|---|---|---|
| `--primary` | `oklch(0.72 0.2 200)` | Neon cyan — primary actions, active nav |
| `--accent` | `oklch(0.75 0.18 55)` | Neon orange — warnings, highlights |
| `--destructive` | `oklch(0.65 0.22 25)` | Neon red — errors, critical alerts |
| `--admin-primary` | `oklch(0.68 0.18 280)` | Violet — Super Admin accents |
| `--background` | `oklch(0.08 0.01 220)` | Near-black NOC background (dark) |
| `--card` | `oklch(0.13 0.02 220)` | Elevated card surface |
| `--muted` | `oklch(0.18 0.02 220)` | Muted section backgrounds |
| `--border` | `oklch(0.22 0.03 220)` | Subtle borders |

### Typography

| Role | Font | Variable |
|---|---|---|
| **Display/Headings** | Geist Mono | `--font-display` |
| **Body/UI** | General Sans | `--font-body` |
| **Code/Metrics** | JetBrains Mono | `--font-mono` |

### Animations

| Class | Effect |
|---|---|
| `animate-pulse-soft` | Gentle opacity pulse for status indicators |
| `animate-slide-in` | Slide-in from left for sidebar panels |
| `transition-smooth` | 300ms ease-in-out for all interactive elements |
| `noc-glow` | Box-shadow neon glow effect on active elements |

---

## Mock Data

### Network Data (`mockData.ts`)

| Dataset | Volume | Description |
|---|---|---|
| Devices | 1,000+ | OLTs, ONTs, splitters, amplifiers, patch panels across 20 regions |
| Alerts | 500+ | CRITICAL/WARNING/INFO with timestamps, affected devices, MTTR |
| Fiber Routes | 100+ | GeoJSON polylines with signal loss, length, cable type |
| SLA Records | 200+ | Per-customer uptime %, breach count, penalty amounts |
| Predictive Alerts | 150+ | AI risk scores (0–100), predicted failure window, confidence % |
| Audit Events | 300+ | User action logs with timestamp, actor, target, diff |

### Super Admin Data (`superAdminMockData.ts`)

| Dataset | Volume | Description |
|---|---|---|
| Companies | 54 | Telecom operators across India, US, EU, APAC, MENA — mixed plans/statuses |
| Users | 1,000+ | Network Engineers, NOC Operators, Admins, Viewers across all companies |
| Orders | 500+ | Monthly/yearly subscriptions — Paid/Pending/Failed |
| Invoices | 300+ | With GST/VAT tax breakdowns, PDF-ready structure |
| Security Events | 200+ | Failed logins, suspicious IPs, MFA bypass attempts |
| Audit Events | 500+ | Billing updates, plan changes, user invites, device changes |

### Billing Data (`billingMockData.ts`)

| Metric | Description |
|---|---|
| MRR | Monthly Recurring Revenue with 12-month trend |
| ARR | Annual Recurring Revenue |
| Churn Rate | Monthly churn % with cohort breakdown |
| Revenue by Plan | Breakdown across BASIC / PROFESSIONAL / ENTERPRISE / ULTRA |
| Tax Breakdowns | GST (India), VAT (EU), Sales Tax (US) per invoice |

---

## Getting Started

### Prerequisites

- **Node.js** >= 16
- **pnpm** >= 7

```bash
# Install pnpm if not already installed
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Mr-fuaaaadh/fibernms.git
cd fibernms

# Install all dependencies
pnpm install
```

### Development

```bash
# Start the Vite dev server (frontend only)
cd src/frontend
pnpm dev
# → http://localhost:5173
```

### Build

```bash
cd src/frontend
pnpm build
# → dist/ folder ready for deployment
```

### Type Checking & Linting

```bash
cd src/frontend

# TypeScript type check
pnpm typecheck

# Biome lint check
pnpm check

# Biome auto-fix
pnpm fix
```

### Test Login Accounts

| Account | Credentials | Access Level |
|---|---|---|
| **Super Admin** | `superadmin@fibernms.com` / `SuperAdmin@123` | Full platform — all 34+ pages including Super Admin |
| **Company Admin** | `admin@fibernms.com` / `Admin@123` | All NOC pages + SaaS pages (ENTERPRISE plan) |
| **NOC Operator** | `operator@fibernms.com` / `Operator@123` | NOC pages (PROFESSIONAL plan, some features locked) |

---

## Architecture Patterns

### 1. Protected Routes

```typescript
// App.tsx — TanStack Router with auth guards
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/devices",
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
  },
  component: Devices,
});

const superAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/super-admin",
  beforeLoad: () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (user?.role !== "SUPER_ADMIN") throw redirect({ to: "/" });
  },
  component: SuperAdminDashboard,
});
```

### 2. Feature Gating

```tsx
// Wrapping a premium section with FeatureGate
import { FeatureGate } from "@/components/subscription/FeatureGate";
import { FeatureFlag } from "@/config/features";

function MonitoringPage() {
  return (
    <div>
      <BasicMetrics /> {/* always visible */}

      <FeatureGate
        feature={FeatureFlag.ALERT_CORRELATION}
        requiredPlan="ENTERPRISE"
      >
        <AlertCorrelationPanel /> {/* blurred + locked below ENTERPRISE */}
      </FeatureGate>
    </div>
  );
}
```

### 3. Plan-Aware Mock Data

```typescript
// data/mockData.ts — data volume scales with plan
import { useSubscriptionStore } from "@/store/subscriptionStore";

export function getDevices() {
  const { currentPlan } = useSubscriptionStore.getState();
  const limits = { BASIC: 100, PROFESSIONAL: 500, ENTERPRISE: 2000, ULTRA: 10000 };
  return ALL_DEVICES.slice(0, limits[currentPlan]);
}
```

### 4. Event Bus (Real-Time Simulation)

```typescript
// lib/eventBus.ts — simulates WebSocket events
import { eventBus } from "@/lib/eventBus";

// Emit a device alert event
eventBus.emit("device:alert", {
  deviceId: "OLT-001",
  severity: "CRITICAL",
  message: "Signal loss detected on port 4",
});

// Subscribe in a component
useEffect(() => {
  const unsub = eventBus.on("device:alert", (event) => {
    setAlerts((prev) => [event, ...prev]);
  });
  return unsub;
}, []);
```

### 5. GlassCard UI Pattern

```tsx
// components/GlassCard.tsx
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm",
        glow && "noc-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

---

## Deployment

### Frontend (Vite Static Build)

```bash
cd src/frontend
pnpm build
# Outputs to src/frontend/dist/
```

Deploy the `dist/` folder to any static hosting:

| Platform | Command |
|---|---|
| **Vercel** | `vercel --prod` or connect GitHub repo |
| **Netlify** | `netlify deploy --prod --dir=dist` |
| **AWS S3 + CloudFront** | `aws s3 sync dist/ s3://your-bucket --delete` |
| **Docker** | Serve `dist/` with nginx (see below) |

```dockerfile
# Dockerfile (frontend only)
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install
RUN cd src/frontend && pnpm build

FROM nginx:alpine
COPY --from=builder /app/src/frontend/dist /usr/share/nginx/html
EXPOSE 80
```

### Backend (Motoko — Internet Computer)

The Motoko backend (`src/backend/main.mo`) is currently a scaffold. To activate real backend persistence:

1. Implement data models and query/update methods in `main.mo`
2. Run `pnpm bindgen` to regenerate `src/frontend/src/backend.d.ts`
3. Replace mock data imports in `hooks/useQueries.ts` with `useActor()` calls
4. Deploy to the Internet Computer:

```bash
# Install dfx CLI
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Deploy
dfx start --background
dfx deploy
```

---

## Customization

### Change the Default Demo Plan

```typescript
// src/frontend/src/store/subscriptionStore.ts
const useSubscriptionStore = create<SubscriptionState>(() => ({
  currentPlan: "ENTERPRISE", // ← change to "BASIC" | "PROFESSIONAL" | "ULTRA"
  deviceUsed: 45230,
  deviceLimit: 100000,
  // ...
}));
```

### Customize Design Tokens

```css
/* src/frontend/src/index.css */
:root {
  /* Change primary color to neon green */
  --primary: oklch(0.75 0.22 145);

  /* Change background to a warmer dark */
  --background: oklch(0.09 0.02 30);
}
```

```javascript
// src/frontend/tailwind.config.js
// Add custom animation keyframes
theme: {
  extend: {
    keyframes: {
      "radar-sweep": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "radar-sweep": "radar-sweep 4s linear infinite",
    },
  },
},
```

### Add a New Feature Flag

```typescript
// 1. Add to enum in src/frontend/src/config/features.ts
export enum FeatureFlag {
  // ... existing flags
  SATELLITE_OVERLAY = "SATELLITE_OVERLAY",
}

// 2. Add to FEATURES map
export const FEATURES: Record<FeatureFlag, PlanTier[]> = {
  // ... existing entries
  [FeatureFlag.SATELLITE_OVERLAY]: ["ENTERPRISE", "ULTRA"],
};

// 3. Use in your component
const hasSatellite = useFeature(FeatureFlag.SATELLITE_OVERLAY);

// 4. Or wrap with FeatureGate
<FeatureGate feature={FeatureFlag.SATELLITE_OVERLAY} requiredPlan="ENTERPRISE">
  <SatelliteLayerToggle />
</FeatureGate>
```

### Add a New Admin User

```typescript
// src/frontend/src/store/authStore.ts
const SEED_USERS = [
  // ... existing users
  {
    id: "user-4",
    name: "Jane Smith",
    email: "jane@acmetelecom.com",
    password: "Jane@2026",
    role: "NETWORK_ENGINEER",
    companyId: "company-12",
    plan: "PROFESSIONAL" as PlanTier,
  },
];
```

---

## Roadmap

The following features are scoped but not yet implemented:

- [ ] **Forgot password / email recovery** — password reset flow with email link
- [ ] **Two-factor authentication (MFA)** — TOTP/authenticator app support
- [ ] **SSO / SAML integration** — enterprise identity provider (Okta, Azure AD)
- [ ] **User profile settings panel** — edit name, email, password, notification prefs
- [ ] **Tenant onboarding wizard** — guided ISP onboarding (plan → config → first device)
- [ ] **Usage-based billing alerts** — notify admins approaching device/API quotas
- [ ] **Enhanced drag-and-drop workflow builder** — richer node library, conditional branching
- [ ] **Plugin marketplace UI** — install/manage community-built NOC extensions
- [ ] **Satellite & weather overlays** — integrate satellite imagery and weather APIs on map
- [ ] **Real-time alert feeds in AI chat** — AI assistant receives live alert context
- [ ] **Mobile companion app** — responsive offline-capable mobile NOC interface
- [ ] **Offline/edge operations mode** — local data caching with upstream sync on reconnect

---

## Contributing

1. **Fork** the repository: https://github.com/Mr-fuaaaadh/fibernms
2. **Create a branch:** `git checkout -b feature/my-feature`
3. **Commit your changes:** `git commit -m "feat: add satellite map overlay"`
4. **Push to your branch:** `git push origin feature/my-feature`
5. **Open a Pull Request** targeting `main`

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring (no behavior change) |
| `docs:` | Documentation only |
| `style:` | Formatting, whitespace (no logic change) |
| `perf:` | Performance improvement |
| `test:` | Tests |
| `chore:` | Build tooling, deps, config |

---

## License

**Proprietary.** All rights reserved.

For support, billing inquiries, or account help, contact Caffeine at [https://caffeine.ai](https://caffeine.ai).

---

*Last updated: April 10, 2026*
