import { Plan } from "../types/subscription";
import type { BillingRecord, TenantInfo } from "../types/subscription";

// ─── Billing Records (12 months) ─────────────────────────────────────────────
const MS_PER_DAY = 86_400_000;

export const MOCK_BILLING_RECORDS: BillingRecord[] = [
  {
    id: "bill-001",
    date: Date.now() - 0 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — April 2026",
    amount: 199,
    currency: "USD",
    status: "pending",
  },
  {
    id: "bill-002",
    date: Date.now() - 1 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — March 2026",
    amount: 199,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-003",
    date: Date.now() - 2 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — February 2026",
    amount: 199,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-004",
    date: Date.now() - 3 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — January 2026",
    amount: 199,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-005",
    date: Date.now() - 4 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — December 2025",
    amount: 199,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-006",
    date: Date.now() - 5 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — November 2025",
    amount: 199,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-007",
    date: Date.now() - 6 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — October 2025",
    amount: 199,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-008",
    date: Date.now() - 7 * 30 * MS_PER_DAY,
    description: "Professional Plan — September 2025",
    amount: 49,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-009",
    date: Date.now() - 8 * 30 * MS_PER_DAY,
    description: "Professional Plan — August 2025",
    amount: 49,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-010",
    date: Date.now() - 9 * 30 * MS_PER_DAY,
    description: "Professional Plan — July 2025",
    amount: 49,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-011",
    date: Date.now() - 10 * 30 * MS_PER_DAY,
    description: "Professional Plan — June 2025",
    amount: 49,
    currency: "USD",
    status: "paid",
  },
  {
    id: "bill-012",
    date: Date.now() - 11 * 30 * MS_PER_DAY,
    description: "Add-On: Extended API Quota (1M calls)",
    amount: 29,
    currency: "USD",
    status: "failed",
  },
];

// ─── Tenants (10 mock tenants) ────────────────────────────────────────────────
export const MOCK_TENANTS: TenantInfo[] = [
  {
    id: "t-001",
    name: "TeleCorp Global",
    plan: Plan.ULTRA,
    adminEmail: "noc@telecorp.com",
    deviceCount: 874_320,
    deviceLimit: 10_000_000,
    status: "active",
    createdAt: Date.now() - 720 * MS_PER_DAY,
  },
  {
    id: "t-002",
    name: "NetStream Asia",
    plan: Plan.ENTERPRISE,
    adminEmail: "ops@netstream.asia",
    deviceCount: 67_452,
    deviceLimit: 100_000,
    status: "active",
    createdAt: Date.now() - 540 * MS_PER_DAY,
  },
  {
    id: "t-003",
    name: "FiberLink EU",
    plan: Plan.ENTERPRISE,
    adminEmail: "admin@fiberlink.eu",
    deviceCount: 43_119,
    deviceLimit: 100_000,
    status: "active",
    createdAt: Date.now() - 365 * MS_PER_DAY,
  },
  {
    id: "t-004",
    name: "OptiComm ME",
    plan: Plan.PROFESSIONAL,
    adminEmail: "tech@opticomm.ae",
    deviceCount: 8_240,
    deviceLimit: 10_000,
    status: "active",
    createdAt: Date.now() - 270 * MS_PER_DAY,
  },
  {
    id: "t-005",
    name: "SkyNet Brasil",
    plan: Plan.PROFESSIONAL,
    adminEmail: "suporte@skynet.br",
    deviceCount: 9_871,
    deviceLimit: 10_000,
    status: "active",
    createdAt: Date.now() - 200 * MS_PER_DAY,
  },
  {
    id: "t-006",
    name: "AlphaISP Ltd",
    plan: Plan.BASIC,
    adminEmail: "it@alphaisp.co.uk",
    deviceCount: 412,
    deviceLimit: 1_000,
    status: "active",
    createdAt: Date.now() - 120 * MS_PER_DAY,
  },
  {
    id: "t-007",
    name: "ClearPath ISP",
    plan: Plan.BASIC,
    adminEmail: "admin@clearpath.net",
    deviceCount: 788,
    deviceLimit: 1_000,
    status: "active",
    createdAt: Date.now() - 90 * MS_PER_DAY,
  },
  {
    id: "t-008",
    name: "DataBridge LLC",
    plan: Plan.ENTERPRISE,
    adminEmail: "noc@databridge.io",
    deviceCount: 52_003,
    deviceLimit: 100_000,
    status: "paused",
    createdAt: Date.now() - 450 * MS_PER_DAY,
  },
  {
    id: "t-009",
    name: "SpeedWave Corp",
    plan: Plan.PROFESSIONAL,
    adminEmail: "ops@speedwave.com",
    deviceCount: 7_150,
    deviceLimit: 10_000,
    status: "active",
    createdAt: Date.now() - 160 * MS_PER_DAY,
  },
  {
    id: "t-010",
    name: "ZenithTel",
    plan: Plan.ULTRA,
    adminEmail: "noc@zenithtel.global",
    deviceCount: 421_760,
    deviceLimit: 10_000_000,
    status: "expired",
    createdAt: Date.now() - 900 * MS_PER_DAY,
  },
];

// ─── API Keys ─────────────────────────────────────────────────────────────────
export interface ApiKey {
  id: string;
  name: string;
  key: string; // masked, e.g. "sk-****...abc1"
  created: number;
  lastUsed: number;
  permissions: string[];
}

export const MOCK_API_KEYS: ApiKey[] = [
  {
    id: "key-001",
    name: "NOC Monitoring Agent",
    key: "sk-****...k9f2",
    created: Date.now() - 180 * MS_PER_DAY,
    lastUsed: Date.now() - 5 * 60 * 1000,
    permissions: ["devices:read", "alerts:read", "metrics:read"],
  },
  {
    id: "key-002",
    name: "Automation Orchestrator",
    key: "sk-****...m3t7",
    created: Date.now() - 90 * MS_PER_DAY,
    lastUsed: Date.now() - 2 * MS_PER_DAY,
    permissions: ["devices:write", "workflows:execute", "alerts:write"],
  },
  {
    id: "key-003",
    name: "Grafana Integration",
    key: "sk-****...p0r4",
    created: Date.now() - 60 * MS_PER_DAY,
    lastUsed: Date.now() - 15 * 60 * 1000,
    permissions: ["metrics:read", "sla:read"],
  },
  {
    id: "key-004",
    name: "Ticketing System Bridge",
    key: "sk-****...d8s1",
    created: Date.now() - 30 * MS_PER_DAY,
    lastUsed: Date.now() - 3 * MS_PER_DAY,
    permissions: ["alerts:read", "audit:read"],
  },
  {
    id: "key-005",
    name: "Field Engineer Mobile",
    key: "sk-****...x2n9",
    created: Date.now() - 10 * MS_PER_DAY,
    lastUsed: Date.now() - 6 * MS_PER_DAY,
    permissions: ["devices:read", "alerts:read"],
  },
];

// ─── Webhooks ─────────────────────────────────────────────────────────────────
export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: "active" | "inactive" | "error";
  lastTriggered: number;
}

export const MOCK_WEBHOOKS: Webhook[] = [
  {
    id: "wh-001",
    url: "https://hooks.pagerduty.com/services/NRMFNMS01",
    events: ["fault.detected", "alert.critical", "sla.breach"],
    status: "active",
    lastTriggered: Date.now() - 12 * 60 * 1000,
  },
  {
    id: "wh-002",
    url: "https://hooks.slack.com/services/T0/B0/XXXXXXXX",
    events: ["device.offline", "workflow.executed", "alert.resolved"],
    status: "active",
    lastTriggered: Date.now() - 45 * 60 * 1000,
  },
  {
    id: "wh-003",
    url: "https://jira.fibernms.internal/webhook/nms-alerts",
    events: ["fault.detected", "predictive.risk_high"],
    status: "error",
    lastTriggered: Date.now() - 2 * MS_PER_DAY,
  },
  {
    id: "wh-004",
    url: "https://grafana.fibernms.internal/api/webhooks/nms-metrics",
    events: ["capacity.threshold", "signal.degradation", "sla.breach"],
    status: "inactive",
    lastTriggered: Date.now() - 7 * MS_PER_DAY,
  },
];
