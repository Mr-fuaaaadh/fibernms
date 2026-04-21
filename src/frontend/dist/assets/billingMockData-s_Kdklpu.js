import { ax as Plan } from "./index-WMTkA9vU.js";
const MS_PER_DAY = 864e5;
const MOCK_BILLING_RECORDS = [
  {
    id: "bill-001",
    date: Date.now() - 0 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — April 2026",
    amount: 199,
    currency: "USD",
    status: "pending"
  },
  {
    id: "bill-002",
    date: Date.now() - 1 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — March 2026",
    amount: 199,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-003",
    date: Date.now() - 2 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — February 2026",
    amount: 199,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-004",
    date: Date.now() - 3 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — January 2026",
    amount: 199,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-005",
    date: Date.now() - 4 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — December 2025",
    amount: 199,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-006",
    date: Date.now() - 5 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — November 2025",
    amount: 199,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-007",
    date: Date.now() - 6 * 30 * MS_PER_DAY,
    description: "Enterprise Plan — October 2025",
    amount: 199,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-008",
    date: Date.now() - 7 * 30 * MS_PER_DAY,
    description: "Professional Plan — September 2025",
    amount: 49,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-009",
    date: Date.now() - 8 * 30 * MS_PER_DAY,
    description: "Professional Plan — August 2025",
    amount: 49,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-010",
    date: Date.now() - 9 * 30 * MS_PER_DAY,
    description: "Professional Plan — July 2025",
    amount: 49,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-011",
    date: Date.now() - 10 * 30 * MS_PER_DAY,
    description: "Professional Plan — June 2025",
    amount: 49,
    currency: "USD",
    status: "paid"
  },
  {
    id: "bill-012",
    date: Date.now() - 11 * 30 * MS_PER_DAY,
    description: "Add-On: Extended API Quota (1M calls)",
    amount: 29,
    currency: "USD",
    status: "failed"
  }
];
const MOCK_TENANTS = [
  {
    id: "t-001",
    name: "TeleCorp Global",
    plan: Plan.ULTRA,
    adminEmail: "noc@telecorp.com",
    deviceCount: 874320,
    deviceLimit: 1e7,
    status: "active",
    createdAt: Date.now() - 720 * MS_PER_DAY
  },
  {
    id: "t-002",
    name: "NetStream Asia",
    plan: Plan.ENTERPRISE,
    adminEmail: "ops@netstream.asia",
    deviceCount: 67452,
    deviceLimit: 1e5,
    status: "active",
    createdAt: Date.now() - 540 * MS_PER_DAY
  },
  {
    id: "t-003",
    name: "FiberLink EU",
    plan: Plan.ENTERPRISE,
    adminEmail: "admin@fiberlink.eu",
    deviceCount: 43119,
    deviceLimit: 1e5,
    status: "active",
    createdAt: Date.now() - 365 * MS_PER_DAY
  },
  {
    id: "t-004",
    name: "OptiComm ME",
    plan: Plan.PROFESSIONAL,
    adminEmail: "tech@opticomm.ae",
    deviceCount: 8240,
    deviceLimit: 1e4,
    status: "active",
    createdAt: Date.now() - 270 * MS_PER_DAY
  },
  {
    id: "t-005",
    name: "SkyNet Brasil",
    plan: Plan.PROFESSIONAL,
    adminEmail: "suporte@skynet.br",
    deviceCount: 9871,
    deviceLimit: 1e4,
    status: "active",
    createdAt: Date.now() - 200 * MS_PER_DAY
  },
  {
    id: "t-006",
    name: "AlphaISP Ltd",
    plan: Plan.BASIC,
    adminEmail: "it@alphaisp.co.uk",
    deviceCount: 412,
    deviceLimit: 1e3,
    status: "active",
    createdAt: Date.now() - 120 * MS_PER_DAY
  },
  {
    id: "t-007",
    name: "ClearPath ISP",
    plan: Plan.BASIC,
    adminEmail: "admin@clearpath.net",
    deviceCount: 788,
    deviceLimit: 1e3,
    status: "active",
    createdAt: Date.now() - 90 * MS_PER_DAY
  },
  {
    id: "t-008",
    name: "DataBridge LLC",
    plan: Plan.ENTERPRISE,
    adminEmail: "noc@databridge.io",
    deviceCount: 52003,
    deviceLimit: 1e5,
    status: "paused",
    createdAt: Date.now() - 450 * MS_PER_DAY
  },
  {
    id: "t-009",
    name: "SpeedWave Corp",
    plan: Plan.PROFESSIONAL,
    adminEmail: "ops@speedwave.com",
    deviceCount: 7150,
    deviceLimit: 1e4,
    status: "active",
    createdAt: Date.now() - 160 * MS_PER_DAY
  },
  {
    id: "t-010",
    name: "ZenithTel",
    plan: Plan.ULTRA,
    adminEmail: "noc@zenithtel.global",
    deviceCount: 421760,
    deviceLimit: 1e7,
    status: "expired",
    createdAt: Date.now() - 900 * MS_PER_DAY
  }
];
const MOCK_API_KEYS = [
  {
    id: "key-001",
    name: "NOC Monitoring Agent",
    key: "sk-****...k9f2",
    created: Date.now() - 180 * MS_PER_DAY,
    lastUsed: Date.now() - 5 * 60 * 1e3,
    permissions: ["devices:read", "alerts:read", "metrics:read"]
  },
  {
    id: "key-002",
    name: "Automation Orchestrator",
    key: "sk-****...m3t7",
    created: Date.now() - 90 * MS_PER_DAY,
    lastUsed: Date.now() - 2 * MS_PER_DAY,
    permissions: ["devices:write", "workflows:execute", "alerts:write"]
  },
  {
    id: "key-003",
    name: "Grafana Integration",
    key: "sk-****...p0r4",
    created: Date.now() - 60 * MS_PER_DAY,
    lastUsed: Date.now() - 15 * 60 * 1e3,
    permissions: ["metrics:read", "sla:read"]
  },
  {
    id: "key-004",
    name: "Ticketing System Bridge",
    key: "sk-****...d8s1",
    created: Date.now() - 30 * MS_PER_DAY,
    lastUsed: Date.now() - 3 * MS_PER_DAY,
    permissions: ["alerts:read", "audit:read"]
  },
  {
    id: "key-005",
    name: "Field Engineer Mobile",
    key: "sk-****...x2n9",
    created: Date.now() - 10 * MS_PER_DAY,
    lastUsed: Date.now() - 6 * MS_PER_DAY,
    permissions: ["devices:read", "alerts:read"]
  }
];
const MOCK_WEBHOOKS = [
  {
    id: "wh-001",
    url: "https://hooks.pagerduty.com/services/NRMFNMS01",
    events: ["fault.detected", "alert.critical", "sla.breach"],
    status: "active",
    lastTriggered: Date.now() - 12 * 60 * 1e3
  },
  {
    id: "wh-002",
    url: "https://hooks.slack.com/services/T0/B0/XXXXXXXX",
    events: ["device.offline", "workflow.executed", "alert.resolved"],
    status: "active",
    lastTriggered: Date.now() - 45 * 60 * 1e3
  },
  {
    id: "wh-003",
    url: "https://jira.fibernms.internal/webhook/nms-alerts",
    events: ["fault.detected", "predictive.risk_high"],
    status: "error",
    lastTriggered: Date.now() - 2 * MS_PER_DAY
  },
  {
    id: "wh-004",
    url: "https://grafana.fibernms.internal/api/webhooks/nms-metrics",
    events: ["capacity.threshold", "signal.degradation", "sla.breach"],
    status: "inactive",
    lastTriggered: Date.now() - 7 * MS_PER_DAY
  }
];
function getMonthLabel(monthsAgo) {
  const d = /* @__PURE__ */ new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  return d.toLocaleString("default", { month: "short", year: "2-digit" });
}
const monthlyRevenue = Array.from({ length: 24 }, (_, i) => {
  const monthsAgo = 23 - i;
  const baseRevenue = 8e4 + i * 4200 + Math.round(Math.sin(i * 0.5) * 3e3);
  return {
    month: getMonthLabel(monthsAgo),
    revenue: baseRevenue,
    mrr: baseRevenue,
    arr: baseRevenue * 12
  };
});
const planDistribution = [
  { plan: "BASIC", count: 12, color: "#22c55e", revenue: 200 * 12 },
  { plan: "PROFESSIONAL", count: 18, color: "#3b82f6", revenue: 500 * 18 },
  { plan: "ENTERPRISE", count: 15, color: "#a855f7", revenue: 2e3 * 15 },
  { plan: "ULTRA", count: 9, color: "#ef4444", revenue: 5e3 * 9 }
];
export {
  MOCK_BILLING_RECORDS as M,
  MOCK_API_KEYS as a,
  MOCK_WEBHOOKS as b,
  MOCK_TENANTS as c,
  monthlyRevenue as m,
  planDistribution as p
};
