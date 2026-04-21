import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, B as Bell, af as Badge, T as TriangleAlert, b3 as ShieldAlert, h as Clock, p as Activity, aj as Shield, n as ChevronRight } from "./index-WMTkA9vU.js";
import { G as GlassCard } from "./GlassCard-C9SzWUJB.js";
import { B as Button } from "./button-Dag5mFLZ.js";
import { d as MOCK_SYSTEM_ALERTS } from "./superAdminMockData-SJ6Z2k0y.js";
import { u as ue } from "./index-Sv7tHWaP.js";
import { C as CircleCheck } from "./circle-check-mz2eb2S1.js";
import { R as ResponsiveContainer, T as Tooltip, B as Bar } from "./generateCategoricalChart-C5i7De_H.js";
import { B as BarChart } from "./BarChart-3i4s9rEH.js";
import { C as CartesianGrid } from "./CartesianGrid-B8KZ9bPr.js";
import { X as XAxis, Y as YAxis } from "./YAxis-Dl760pcE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode);
const SEV_COLORS = {
  critical: {
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    band: "bg-red-500",
    text: "text-red-400"
  },
  high: {
    badge: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    band: "bg-orange-500",
    text: "text-orange-400"
  },
  medium: {
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    band: "bg-amber-500",
    text: "text-amber-400"
  },
  low: {
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    band: "bg-blue-400",
    text: "text-blue-400"
  }
};
const PLATFORM_SERVICES = [
  {
    name: "API Gateway",
    status: "Operational",
    uptime: 99.97,
    responseTime: 42
  },
  {
    name: "Auth Service",
    status: "Degraded",
    uptime: 98.12,
    responseTime: 380
  },
  {
    name: "Billing Service",
    status: "Operational",
    uptime: 99.91,
    responseTime: 88
  },
  {
    name: "NOC Data Pipeline",
    status: "Operational",
    uptime: 99.85,
    responseTime: 120
  },
  {
    name: "WebSocket Service",
    status: "Operational",
    uptime: 99.72,
    responseTime: 18
  },
  {
    name: "Database (Primary)",
    status: "Operational",
    uptime: 99.999,
    responseTime: 9
  },
  {
    name: "Search Index",
    status: "Degraded",
    uptime: 97.44,
    responseTime: 620
  },
  { name: "AI Inference", status: "Outage", uptime: 91.2, responseTime: 0 }
];
const SERVICE_STATUS_COLORS = {
  Operational: "text-emerald-400",
  Degraded: "text-amber-400",
  Outage: "text-red-400"
};
const SERVICE_STATUS_BG = {
  Operational: "bg-emerald-500/15 border-emerald-500/30",
  Degraded: "bg-amber-500/15 border-amber-500/30",
  Outage: "bg-red-500/15 border-red-500/30"
};
function fmtRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function fmtDuration(start, end) {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}
function buildTrendData(alerts) {
  const days = {};
  const now = Date.now();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 864e5);
    const key = d.toLocaleDateString("en-US", { weekday: "short" });
    days[key] = { critical: 0, high: 0, medium: 0, low: 0 };
  }
  for (const alert of alerts) {
    const d = new Date(alert.startedAt);
    const key = d.toLocaleDateString("en-US", { weekday: "short" });
    if (days[key] && alert.severity in days[key]) {
      days[key][alert.severity]++;
    }
  }
  return Object.entries(days).map(([day, sev]) => ({ day, ...sev }));
}
function AlertCard({
  alert,
  onAcknowledge,
  onResolve
}) {
  const sc = SEV_COLORS[alert.severity];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 8 },
      className: "relative",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex overflow-hidden p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1 flex-shrink-0 rounded-l-xl ${sc.band}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs px-2 py-0 border ${sc.badge} uppercase`,
                    children: alert.severity
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs px-2 py-0 border-border font-mono",
                    children: alert.affectedService
                  }
                ),
                alert.localStatus === "acknowledged" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs px-2 py-0 bg-violet-500/15 text-violet-400 border-violet-500/30", children: "Acknowledged" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground font-display", children: alert.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: alert.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: fmtRelative(alert.startedAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
            alert.localStatus !== "acknowledged" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs border-border gap-1",
                onClick: () => onAcknowledge(alert.id),
                "data-ocid": `ack-alert-${alert.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-3.5 h-3.5" }),
                  "Acknowledge"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white gap-1",
                onClick: () => onResolve(alert.id),
                "data-ocid": `resolve-alert-${alert.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "Resolve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs text-muted-foreground gap-1 ml-auto",
                children: [
                  "View Details ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function SystemAlerts() {
  const [alerts, setAlerts] = reactExports.useState(
    () => MOCK_SYSTEM_ALERTS.map((a) => ({
      ...a,
      localStatus: a.status
    }))
  );
  const activeAlerts = reactExports.useMemo(
    () => alerts.filter(
      (a) => a.localStatus === "active" || a.localStatus === "acknowledged"
    ),
    [alerts]
  );
  const resolvedAlerts = reactExports.useMemo(
    () => alerts.filter((a) => a.localStatus === "resolved"),
    [alerts]
  );
  const trendData = reactExports.useMemo(() => buildTrendData(alerts), [alerts]);
  const criticalCount = activeAlerts.filter(
    (a) => a.severity === "critical"
  ).length;
  const highCount = activeAlerts.filter((a) => a.severity === "high").length;
  const mediumCount = activeAlerts.filter(
    (a) => a.severity === "medium"
  ).length;
  const lowCount = activeAlerts.filter((a) => a.severity === "low").length;
  const resolvedToday = reactExports.useMemo(() => {
    const today = (/* @__PURE__ */ new Date()).toDateString();
    return resolvedAlerts.filter(
      (a) => a.localResolvedAt && new Date(a.localResolvedAt).toDateString() === today
    ).length;
  }, [resolvedAlerts]);
  const avgMttr = reactExports.useMemo(() => {
    const timed = resolvedAlerts.filter((a) => a.localResolvedAt);
    if (!timed.length) return "—";
    const avg = timed.reduce(
      (sum, a) => sum + (new Date(a.localResolvedAt).getTime() - new Date(a.startedAt).getTime()),
      0
    ) / timed.length;
    return `${Math.round(avg / 6e4)}m`;
  }, [resolvedAlerts]);
  const acknowledge = reactExports.useCallback((id) => {
    setAlerts(
      (prev) => prev.map(
        (a) => a.id === id ? {
          ...a,
          localStatus: "acknowledged",
          acknowledgedAt: (/* @__PURE__ */ new Date()).toISOString(),
          acknowledgedBy: "Super Admin"
        } : a
      )
    );
    ue.success("Alert acknowledged");
  }, []);
  const resolve = reactExports.useCallback((id) => {
    setAlerts(
      (prev) => prev.map(
        (a) => a.id === id ? {
          ...a,
          localStatus: "resolved",
          localResolvedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : a
      )
    );
    ue.success("Alert resolved");
  }, []);
  function acknowledgeAll() {
    const count = activeAlerts.filter((a) => a.localStatus === "active").length;
    setAlerts(
      (prev) => prev.map(
        (a) => a.localStatus === "active" ? {
          ...a,
          localStatus: "acknowledged",
          acknowledgedAt: (/* @__PURE__ */ new Date()).toISOString(),
          acknowledgedBy: "Super Admin"
        } : a
      )
    );
    ue.success(`${count} alerts acknowledged`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5 md:space-y-8 max-w-[1600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between gap-4 flex-wrap",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-red-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "System Alerts" }),
                activeAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500/15 text-red-400 border-red-500/30", children: [
                  activeAlerts.length,
                  " active"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider", children: "Platform-wide alert monitoring" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "border-border gap-2 h-8 text-xs",
              onClick: acknowledgeAll,
              "data-ocid": "acknowledge-all-alerts",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-3.5 h-3.5" }),
                "Acknowledge All"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      {
        label: "Active Alerts",
        value: activeAlerts.length,
        icon: TriangleAlert,
        color: "bg-red-500/15 border-red-500/30 text-red-400"
      },
      {
        label: "Critical Alerts",
        value: criticalCount,
        icon: ShieldAlert,
        color: "bg-orange-500/15 border-orange-500/30 text-orange-400"
      },
      {
        label: "Resolved Today",
        value: resolvedToday,
        icon: CircleCheck,
        color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
      },
      {
        label: "Mean Time to Resolve",
        value: avgMttr,
        icon: Clock,
        color: "bg-blue-500/15 border-blue-500/30 text-blue-400"
      }
    ].map(({ label, value, icon: Icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${color}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-0.5", children: value })
          ] })
        ] })
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4", children: "Severity Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            label: "Critical",
            count: criticalCount,
            color: "bg-red-500",
            textColor: "text-red-400"
          },
          {
            label: "High",
            count: highCount,
            color: "bg-orange-500",
            textColor: "text-orange-400"
          },
          {
            label: "Medium",
            count: mediumCount,
            color: "bg-amber-500",
            textColor: "text-amber-400"
          },
          {
            label: "Low",
            count: lowCount,
            color: "bg-blue-400",
            textColor: "text-blue-400"
          }
        ].map(({ label, count, color, textColor }) => {
          const total = activeAlerts.length || 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-semibold ${textColor}`, children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                count,
                " / ",
                activeAlerts.length
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full rounded-full ${color} transition-all duration-700`,
                style: { width: `${count / total * 100}%` }
              }
            ) })
          ] }, label);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border/50 flex justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: activeAlerts.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 col-span-1 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4", children: "Alert Trends — Last 7 Days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: trendData, barSize: 8, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(var(--border))",
              vertical: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "day",
              tick: { fontSize: 11, fill: "oklch(var(--muted-foreground))" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 11, fill: "oklch(var(--muted-foreground))" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
                borderRadius: 8,
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "critical",
              name: "Critical",
              fill: "#ef4444",
              stackId: "s",
              radius: [0, 0, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "high",
              name: "High",
              fill: "#f97316",
              stackId: "s",
              radius: [0, 0, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "medium",
              name: "Medium",
              fill: "#f59e0b",
              stackId: "s",
              radius: [0, 0, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "low",
              name: "Low",
              fill: "#60a5fa",
              stackId: "s",
              radius: [2, 2, 0, 0]
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Service Health" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: PLATFORM_SERVICES.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: `p-4 border ${SERVICE_STATUS_BG[svc.status]}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Activity,
                    {
                      className: `w-4 h-4 ${SERVICE_STATUS_COLORS[svc.status]}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs px-2 py-0 border ${SERVICE_STATUS_BG[svc.status]} ${SERVICE_STATUS_COLORS[svc.status]}`,
                      children: svc.status
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground font-display", children: svc.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Uptime:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                      svc.uptime,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Latency:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `font-mono ${svc.status === "Outage" ? "text-red-400" : "text-foreground"}`,
                        children: svc.status === "Outage" ? "N/A" : `${svc.responseTime}ms`
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        },
        svc.name
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: [
        "Active Alerts (",
        activeAlerts.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "active-alerts-list", children: activeAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-emerald-400 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "All Systems Operational" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "No active alerts detected" })
      ] }) : activeAlerts.map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertCard,
        {
          alert,
          onAcknowledge: acknowledge,
          onResolve: resolve
        },
        alert.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: [
        "Resolved Alert History (",
        resolvedAlerts.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Severity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Resolved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Duration" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: resolvedAlerts.slice(0, 15).map((alert, i) => {
          const sc = SEV_COLORS[alert.severity];
          const resolvedAt = alert.localResolvedAt ?? alert.resolvedAt ?? "";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-border/30 last:border-0 ${i % 2 === 0 ? "bg-muted/10" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-foreground max-w-[220px] truncate", children: alert.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground", children: alert.affectedService }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs px-2 py-0 border ${sc.badge} uppercase`,
                    children: alert.severity
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground font-mono", children: fmtRelative(alert.startedAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground font-mono", children: resolvedAt ? fmtRelative(resolvedAt) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs font-mono", children: resolvedAt ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: fmtDuration(alert.startedAt, resolvedAt) }) : "—" })
              ]
            },
            alert.id
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Alert states are local to this session — refresh to reset to mock data" })
    ] })
  ] });
}
export {
  SystemAlerts as default
};
