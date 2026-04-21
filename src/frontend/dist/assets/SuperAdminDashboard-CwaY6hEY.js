import { k as useNavigate, f as useIsMobile, ax as Plan, j as jsxRuntimeExports, m as motion, aj as Shield, af as Badge, T as TriangleAlert, aA as Building2, az as CreditCard, p as Activity, aL as Users, Z as Zap, ah as TrendingUp, aR as Info, ai as CircleAlert, M as MapPin } from "./index-YFsEtCvH.js";
import { B as Button } from "./button-5YJ30JG-.js";
import { S as ScrollArea } from "./scroll-area-BFqXrDL-.js";
import { M as MOCK_COMPANIES, d as MOCK_SYSTEM_ALERTS, e as MOCK_AUDIT_EVENTS, R as REVENUE_METRICS } from "./superAdminMockData-SJ6Z2k0y.js";
import { C as CircleCheck } from "./circle-check-B-pv3TgE.js";
import { T as TrendingDown } from "./trending-down-Ba5lnz7T.js";
import { R as ResponsiveContainer, T as Tooltip, C as Cell, B as Bar } from "./generateCategoricalChart-CMocnl4v.js";
import { A as AreaChart } from "./AreaChart-6KblZeR2.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DZFqdayo.js";
import { A as Area } from "./Area-DLulRWBB.js";
import { P as PieChart, a as Pie } from "./PieChart-B7QwUpYA.js";
import { B as BarChart } from "./BarChart-B2CsW8rE.js";
import { A as ArrowUpRight } from "./arrow-up-right-CuuOTN6R.js";
import { G as Globe } from "./globe-Ayhrg4Wt.js";
import "./index-D8ax-Kw0.js";
import "./index-IXOTxK3N.js";
import "./PolarAngleAxis-LTAAbnNm.js";
const MRR_TREND = (() => {
  const base = REVENUE_METRICS.totalMRR;
  const months = [
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr"
  ];
  const noise = [0, 2, -1, 3, -2, 4, 1, 5, -1, 3, 2, 0];
  return months.map((month, i) => ({
    month,
    revenue: Math.round(base * (0.72 + i * 0.026 + noise[i] * 4e-3))
  }));
})();
function fmtMoney(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n}`;
}
function fmtNum(n, compact = false) {
  if (compact && n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (compact && n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
}
function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
const PLAN_CFG = {
  [Plan.BASIC]: {
    bar: "bg-emerald-500/60",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    fill: "#34d399"
  },
  [Plan.PROFESSIONAL]: {
    bar: "bg-blue-500/60",
    text: "text-blue-400",
    border: "border-blue-500/30",
    fill: "#60a5fa"
  },
  [Plan.ENTERPRISE]: {
    bar: "bg-violet-500/60",
    text: "text-violet-400",
    border: "border-violet-500/30",
    fill: "#a78bfa"
  },
  [Plan.ULTRA]: {
    bar: "bg-amber-500/60",
    text: "text-amber-400",
    border: "border-amber-500/30",
    fill: "#fbbf24"
  }
};
const STATUS_CFG = {
  active: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  trial: {
    dot: "bg-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  suspended: {
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  expired: {
    dot: "bg-rose-400",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  }
};
const SEVERITY_CFG = {
  critical: {
    cls: "bg-red-500/10 text-red-400 border-red-500/30",
    Icon: CircleAlert
  },
  high: {
    cls: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    Icon: TriangleAlert
  },
  medium: {
    cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Icon: TriangleAlert
  },
  low: { cls: "bg-blue-500/10 text-blue-400 border-blue-500/30", Icon: Info }
};
const AUDIT_CAT_COLORS = {
  device: "text-blue-400",
  user: "text-violet-400",
  billing: "text-emerald-400",
  auth: "text-amber-400",
  workflow: "text-cyan-400",
  company: "text-rose-400",
  system: "text-muted-foreground"
};
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconCls,
  trend,
  delay = 0
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.32 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-stat-card rounded-xl h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconCls}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4.5 h-4.5" })
            }
          ),
          TrendIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendIcon,
            {
              className: `w-4 h-4 mt-1 ${trend === "up" ? "text-emerald-400" : "text-rose-400"}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "admin-stat-value", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "admin-stat-label mt-1 truncate", children: label }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5 truncate", children: sub })
      ] })
    }
  );
}
function ChartTooltip({
  active,
  payload,
  label
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated px-3 py-2 rounded-lg text-xs border border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-foreground", children: fmtMoney(payload[0].value) })
  ] });
}
function SuperAdminDashboard() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const totalDevices = MOCK_COMPANIES.reduce((s, c) => s + c.devicesUsed, 0);
  const totalUsers = MOCK_COMPANIES.reduce((s, c) => s + c.activeUsers, 0);
  const activeAlerts = MOCK_SYSTEM_ALERTS.filter(
    (a) => a.status === "active"
  ).length;
  const criticalAlerts = MOCK_SYSTEM_ALERTS.filter(
    (a) => a.status === "active" && a.severity === "critical"
  ).length;
  const healthStatus = criticalAlerts === 0 ? {
    label: "Healthy",
    cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  } : criticalAlerts <= 4 ? {
    label: "Warning",
    cls: "bg-amber-500/15 text-amber-400 border-amber-500/30"
  } : {
    label: "Critical",
    cls: "bg-red-500/15 text-red-400 border-red-500/30"
  };
  const planCounts = Object.values(Plan).map((p) => ({
    plan: p,
    count: MOCK_COMPANIES.filter((c) => c.plan === p).length
  }));
  const statusCounts = ["active", "trial", "suspended", "expired"].map((s) => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    value: MOCK_COMPANIES.filter((c) => c.status === s).length
  }));
  const top5ByRevenue = [...MOCK_COMPANIES].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).slice(0, 5);
  const recentAlerts = [...MOCK_SYSTEM_ALERTS].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  ).slice(0, 5);
  const recentAudit = [...MOCK_AUDIT_EVENTS].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 5);
  const regions = ["India", "US", "EU", "APAC", "MENA"];
  const regionCounts = regions.map((r) => ({
    region: r,
    count: MOCK_COMPANIES.filter((c) => c.region === r).length
  }));
  const maxRegionCount = Math.max(...regionCounts.map((r) => r.count));
  const mrrGrowthPct = (() => {
    const last = MRR_TREND[MRR_TREND.length - 1].revenue;
    const prev = MRR_TREND[MRR_TREND.length - 2].revenue;
    return ((last - prev) / prev * 100).toFixed(1);
  })();
  const newCompaniesThisMonth = [...MOCK_COMPANIES].filter((c) => {
    const ms = new Date(c.onboardedAt).getTime();
    const monthAgo = Date.now() - 30 * 864e5;
    return ms >= monthAgo;
  }).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-wrap items-center gap-3",
        "data-ocid": "super-admin-header",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Super Admin Control Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              fmtNum(MOCK_COMPANIES.length),
              " tenants · ",
              fmtNum(totalUsers, true),
              " ",
              "users · ",
              fmtNum(totalDevices, true),
              " devices · MRR",
              " ",
              fmtMoney(REVENUE_METRICS.totalMRR)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `font-mono text-[10px] border ${healthStatus.cls}`, children: [
              "SYSTEM ",
              healthStatus.label.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/15 text-amber-400 border-amber-500/30 font-mono text-[10px]", children: "SUPER ADMIN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-xs border-border/50 gap-1.5 h-8",
                "data-ocid": "view-all-alerts-btn",
                onClick: () => navigate({ to: "/super-admin/alerts" }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "View All Alerts" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Alerts" }),
                  activeAlerts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500/20 text-red-400 font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-red-500/20", children: activeAlerts })
                ]
              }
            )
          ] })
        ]
      }
    ),
    isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", "data-ocid": "mobile-stat-summary", children: [
      {
        label: "MRR",
        value: fmtMoney(REVENUE_METRICS.totalMRR),
        color: "text-emerald-400"
      },
      {
        label: "Companies",
        value: fmtNum(MOCK_COMPANIES.length),
        color: "text-blue-400"
      },
      {
        label: "Devices",
        value: fmtNum(totalDevices, true),
        color: "text-violet-400"
      },
      {
        label: "Health",
        value: healthStatus.label,
        color: criticalAlerts === 0 ? "text-emerald-400" : "text-amber-400"
      }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border/30 bg-card/60 backdrop-blur-sm px-4 py-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-base font-display font-bold ${color}`, children: value })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4",
        "data-ocid": "kpi-row-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Total Companies",
              value: fmtNum(MOCK_COMPANIES.length),
              sub: `${REVENUE_METRICS.activeSubscriptions} active · ${REVENUE_METRICS.trialSubscriptions} trial`,
              icon: Building2,
              iconCls: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
              trend: "up",
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Monthly Revenue",
              value: fmtMoney(REVENUE_METRICS.totalMRR),
              sub: `ARR ${fmtMoney(REVENUE_METRICS.totalARR)}`,
              icon: CreditCard,
              iconCls: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
              trend: "up",
              delay: 0.05
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Total Devices",
              value: fmtNum(totalDevices, true),
              sub: "across all tenants",
              icon: Activity,
              iconCls: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
              trend: "up",
              delay: 0.1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Total Users",
              value: fmtNum(totalUsers, true),
              sub: "registered platform users",
              icon: Users,
              iconCls: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
              delay: 0.15
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "System Health",
              value: healthStatus.label,
              sub: `${criticalAlerts} critical · ${activeAlerts} total active`,
              icon: Zap,
              iconCls: criticalAlerts === 0 ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : criticalAlerts <= 4 ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30",
              trend: criticalAlerts === 0 ? "up" : "down",
              delay: 0.2
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4",
        "data-ocid": "kpi-row-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "New This Month",
              value: fmtNum(newCompaniesThisMonth),
              sub: "companies onboarded",
              icon: Building2,
              iconCls: "bg-teal-500/15 text-teal-400 border border-teal-500/30",
              trend: "up",
              delay: 0.22
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Active Subscriptions",
              value: fmtNum(REVENUE_METRICS.activeSubscriptions),
              sub: `${REVENUE_METRICS.trialSubscriptions} on trial`,
              icon: CircleCheck,
              iconCls: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
              delay: 0.25
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "MRR Growth",
              value: `+${mrrGrowthPct}%`,
              sub: "month-over-month",
              icon: TrendingUp,
              iconCls: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
              trend: "up",
              delay: 0.28
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Churn Rate",
              value: `${REVENUE_METRICS.churnRate.toFixed(1)}%`,
              sub: "suspended + expired",
              icon: TrendingDown,
              iconCls: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
              trend: "down",
              delay: 0.3
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-w-[600px] md:min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "lg:col-span-2",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.35 },
          "data-ocid": "mrr-chart",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Monthly Recurring Revenue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "12-month trend" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: fmtMoney(REVENUE_METRICS.totalMRR) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-400", children: [
                  "+",
                  mrrGrowthPct,
                  "% this month"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AreaChart,
              {
                data: MRR_TREND,
                margin: { top: 4, right: 4, left: 0, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mrrGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#a78bfa", stopOpacity: 0.4 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "stop",
                      {
                        offset: "95%",
                        stopColor: "#a78bfa",
                        stopOpacity: 0.02
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "month",
                      tick: { fontSize: 10, fill: "currentColor", opacity: 0.5 },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tickFormatter: (v) => fmtMoney(v),
                      tick: { fontSize: 9, fill: "currentColor", opacity: 0.5 },
                      axisLine: false,
                      tickLine: false,
                      width: 52
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Area,
                    {
                      type: "monotone",
                      dataKey: "revenue",
                      stroke: "#a78bfa",
                      strokeWidth: 2,
                      fill: "url(#mrrGrad)",
                      dot: false,
                      activeDot: { r: 4, fill: "#a78bfa" }
                    }
                  )
                ]
              }
            ) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.38 },
          "data-ocid": "status-pie",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground mb-1", children: "Company Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-3", children: [
              MOCK_COMPANIES.length,
              " total tenants"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: statusCounts,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 44,
                  outerRadius: 70,
                  paddingAngle: 3,
                  dataKey: "value",
                  stroke: "none",
                  children: statusCounts.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cell,
                    {
                      fill: entry.name === "Active" ? "#34d399" : entry.name === "Trial" ? "#60a5fa" : entry.name === "Suspended" ? "#fbbf24" : "#fb7185",
                      fillOpacity: 0.85
                    },
                    entry.name
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  content: ({ active, payload }) => active && (payload == null ? void 0 : payload.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated px-2.5 py-1.5 rounded-lg text-xs border border-border/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: payload[0].name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-muted-foreground", children: [
                      payload[0].value,
                      " companies"
                    ] })
                  ] }) : null
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5 mt-1", children: statusCounts.map((s) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-2 h-2 rounded-full flex-shrink-0 ${((_a = STATUS_CFG[s.name.toLowerCase()]) == null ? void 0 : _a.dot) ?? "bg-muted"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground ml-auto", children: s.value })
              ] }, s.name);
            }) })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 min-w-[560px] md:min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.42 },
          "data-ocid": "plan-distribution",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground mb-1", children: "Plan Distribution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Revenue by plan tier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              BarChart,
              {
                data: planCounts,
                layout: "vertical",
                margin: { top: 0, right: 8, left: 0, bottom: 0 },
                barSize: 14,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      type: "number",
                      tick: { fontSize: 9, fill: "currentColor", opacity: 0.5 },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      dataKey: "plan",
                      type: "category",
                      tick: { fontSize: 10, fill: "currentColor", opacity: 0.7 },
                      axisLine: false,
                      tickLine: false,
                      width: 90
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      content: ({ active, payload, label }) => active && (payload == null ? void 0 : payload.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated px-2.5 py-1.5 rounded-lg text-xs border border-border/40", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-semibold text-foreground", children: [
                          payload[0].value,
                          " companies"
                        ] })
                      ] }) : null
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [0, 4, 4, 0], children: planCounts.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cell,
                    {
                      fill: PLAN_CFG[entry.plan].fill,
                      fillOpacity: 0.8
                    },
                    entry.plan
                  )) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mt-3", children: planCounts.map(({ plan, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between px-3 py-1.5 rounded-lg border ${PLAN_CFG[plan].border} bg-muted/10`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] font-mono font-medium ${PLAN_CFG[plan].text}`,
                      children: plan
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground", children: count })
                ]
              },
              plan
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.42 },
          "data-ocid": "top-revenue-table",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Top Companies by Revenue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Highest MRR tenants" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: top5ByRevenue.map((c, i) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.5 + i * 0.06 },
                  className: "flex items-center gap-3 p-2.5 rounded-lg bg-muted/15 border border-border/20 hover:bg-muted/25 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-5 text-[10px] font-mono text-muted-foreground text-center flex-shrink-0", children: [
                      "#",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: c.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                        c.region,
                        " · ",
                        c.activeUsers,
                        " users"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono font-semibold text-foreground", children: fmtMoney(c.monthlyRevenue) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "/mo" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[9px] font-mono border ${PLAN_CFG[c.plan].border} ${PLAN_CFG[c.plan].text} bg-transparent`,
                        children: c.plan
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[9px] border ${((_a = STATUS_CFG[c.status]) == null ? void 0 : _a.badge) ?? ""}`,
                        children: c.status
                      }
                    )
                  ]
                },
                c.id
              );
            }) })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-w-[560px] md:min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.48 },
          "data-ocid": "system-alerts-panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Platform Alerts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: `text-[9px] border ${criticalAlerts > 0 ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`,
                  children: [
                    activeAlerts,
                    " active"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[260px] noc-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pr-2", children: recentAlerts.map((alert) => {
              const sev = SEVERITY_CFG[alert.severity] ?? SEVERITY_CFG.low;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-2.5 rounded-lg bg-muted/15 border border-border/20 space-y-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        sev.Icon,
                        {
                          className: `w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${sev.cls.split(" ")[1]}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground leading-tight flex-1 min-w-0", children: alert.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pl-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-[8px] font-mono border ${sev.cls}`,
                          children: alert.severity
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground truncate", children: alert.affectedService }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground ml-auto flex-shrink-0", children: relativeTime(alert.startedAt) })
                    ] })
                  ]
                },
                alert.id
              );
            }) }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.52 },
          "data-ocid": "audit-events-panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground mb-3", children: "Recent Audit Events" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: recentAudit.map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.55 + i * 0.05 },
                className: "audit-timeline-item border-l border-border/30 last:border-transparent",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[-5px] top-3 w-2.5 h-2.5 rounded-full border-2 border-background bg-border" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-[10px] font-mono font-semibold uppercase ${AUDIT_CAT_COLORS[ev.severity] ?? "text-muted-foreground"}`,
                          children: ev.severity
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "·" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: relativeTime(ev.timestamp) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground mt-0.5 leading-tight", children: ev.action }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 truncate", children: [
                      ev.userName,
                      " · ",
                      ev.companyName
                    ] })
                  ] })
                ]
              },
              ev.id
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.56 },
          "data-ocid": "regional-distribution",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-card rounded-xl p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Regional Distribution" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: regionCounts.map(({ region, count }, i) => {
              const pct = Math.round(count / maxRegionCount * 100);
              const rev = REVENUE_METRICS.revenueByRegion[region] ?? 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 12 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.6 + i * 0.06 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground flex-1", children: region }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: count })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-full rounded-full bg-gradient-to-r from-violet-500/70 to-violet-400/50",
                        initial: { width: 0 },
                        animate: { width: `${pct}%` },
                        transition: {
                          delay: 0.65 + i * 0.06,
                          duration: 0.55
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                      fmtMoney(rev),
                      "/mo"
                    ] })
                  ]
                },
                region
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-3", children: "Revenue by Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Object.values(Plan).map((plan) => {
                const rev = REVENUE_METRICS.revenueByPlan[plan] ?? 0;
                const maxRev = Math.max(
                  ...Object.values(REVENUE_METRICS.revenueByPlan)
                );
                const pct = Math.round(rev / maxRev * 100);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[9px] font-mono w-24 ${PLAN_CFG[plan].text}`,
                      children: plan
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: `h-full rounded-full ${PLAN_CFG[plan].bar}`,
                      initial: { width: 0 },
                      animate: { width: `${pct}%` },
                      transition: { delay: 0.7, duration: 0.5 }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground w-14 text-right", children: fmtMoney(rev) })
                ] }, plan);
              }) })
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  SuperAdminDashboard as default
};
