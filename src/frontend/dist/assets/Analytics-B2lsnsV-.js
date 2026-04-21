import { u as useNetworkStore, r as reactExports, j as jsxRuntimeExports, t as ChartColumn, T as TriangleAlert, p as Activity, m as motion, ah as TrendingUp, Z as Zap, af as Badge } from "./index-iFuWQqSU.js";
import { G as GlassCard } from "./GlassCard-D9su5mrt.js";
import { W as Wifi } from "./wifi-CKYWnZcC.js";
import { C as CircleCheckBig } from "./circle-check-big-BsOiKQUB.js";
import { C as CircleX } from "./circle-x-sUpzDEP5.js";
import { T as TrendingDown } from "./trending-down-DOlS6nsa.js";
function SparkBars({
  values,
  color = "bg-primary"
}) {
  const max = Math.max(...values, 1);
  const labeled = values.map((v, i) => ({ v, k: `${i}-${v}` }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-0.5 h-8", children: labeled.map(({ v, k }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex-1 rounded-sm ${color} opacity-70 transition-smooth`,
      style: { height: `${v / max * 100}%`, minHeight: 2 }
    },
    k
  )) });
}
function GaugeBar({
  value,
  max = 100,
  color = "bg-primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted/60 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { width: 0 },
      animate: { width: `${value / max * 100}%` },
      transition: { duration: 0.9, ease: "easeOut" },
      className: `h-full rounded-full ${color}`
    }
  ) });
}
function StatCard({
  label,
  value,
  unit,
  trend,
  trendVal,
  icon: Icon,
  sparkValues,
  sparkColor,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-4 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, className: "text-primary" }) }),
          trend && trendVal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center gap-1 text-[11px] font-medium ${trend === "up" ? "text-emerald-400" : "text-destructive"}`,
              children: [
                trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 11 }),
                trendVal
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold tabular-nums text-foreground", children: [
          value,
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: unit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 mb-3", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SparkBars, { values: sparkValues, color: sparkColor })
      ] })
    }
  );
}
function SignalDistribution({ devices }) {
  const bands = [
    {
      label: "Excellent (−8 to −20 dBm)",
      min: -20,
      max: -8,
      color: "bg-emerald-400"
    },
    { label: "Good (−20 to −27 dBm)", min: -27, max: -20, color: "bg-primary" },
    {
      label: "Marginal (−27 to −30 dBm)",
      min: -30,
      max: -27,
      color: "bg-yellow-400"
    },
    {
      label: "Fault (below −30 dBm)",
      min: -999,
      max: -30,
      color: "bg-destructive"
    }
  ];
  const total = devices.filter((d) => d.signalStrength !== void 0).length || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11, className: "text-primary" }),
      "Signal Quality Distribution"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bands.map(({ label, min, max, color }) => {
      const count = devices.filter(
        (d) => d.signalStrength !== void 0 && d.signalStrength > min && d.signalStrength <= max
      ).length;
      const pct = Math.round(count / total * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground tabular-nums", children: [
            count,
            " / ",
            total
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GaugeBar, { value: count, max: total, color }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/60 mt-0.5", children: [
          pct,
          "% of devices"
        ] })
      ] }, label);
    }) })
  ] });
}
function DeviceBreakdown({ devices }) {
  const types = ["OLT", "Splitter", "ONT", "JJB", "Switch"];
  const colors = {
    OLT: "bg-primary",
    Splitter: "bg-accent",
    ONT: "bg-emerald-400",
    JJB: "bg-yellow-400",
    Switch: "bg-purple-400"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 11, className: "text-primary" }),
      "Device Type Breakdown"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: types.map((type) => {
      const all = devices.filter((d) => d.type === type);
      const active = all.filter((d) => d.status === "active").length;
      const faulty = all.filter((d) => d.status === "faulty").length;
      const warn = all.filter((d) => d.status === "warning").length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-2 h-2 rounded-full ${colors[type]} flex-shrink-0`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground w-16 flex-shrink-0", children: type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GaugeBar,
          {
            value: all.length,
            max: devices.length,
            color: colors[type]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground tabular-nums w-6 text-right", children: all.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          active > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[9px] px-1.5 py-0 border-emerald-500/40 text-emerald-400",
              children: [
                active,
                " ok"
              ]
            }
          ),
          faulty > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[9px] px-1.5 py-0 border-destructive/40 text-destructive",
              children: [
                faulty,
                " fault"
              ]
            }
          ),
          warn > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[9px] px-1.5 py-0 border-yellow-500/40 text-yellow-400",
              children: [
                warn,
                " warn"
              ]
            }
          )
        ] })
      ] }, type);
    }) })
  ] });
}
function AlertTimeline({ alerts }) {
  const sorted = [...alerts].sort((a, b) => b.timestamp - a.timestamp);
  function relTime(ts) {
    const m = Math.floor((Date.now() - ts) / 6e4);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ${m % 60}m ago`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11, className: "text-destructive" }),
      "Alert Timeline"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[260px] overflow-y-auto noc-scrollbar", children: sorted.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: i * 0.05 },
        className: "flex items-start gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-2 h-2 rounded-full mt-1 flex-shrink-0 ${alert.severity === "critical" ? "bg-destructive" : alert.severity === "warning" ? "bg-yellow-400" : "bg-primary"}`
              }
            ),
            i < sorted.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px flex-1 bg-border/30 mt-1 min-h-[20px]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-foreground truncate", children: alert.deviceName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground flex-shrink-0", children: relTime(alert.timestamp) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2", children: alert.issueType })
          ] })
        ]
      },
      alert.id
    )) })
  ] });
}
function UptimeRanking({ devices }) {
  const sorted = [...devices].filter((d) => d.uptime !== void 0).sort((a, b) => (b.uptime ?? 0) - (a.uptime ?? 0)).slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 11, className: "text-primary" }),
      "Device Uptime Ranking"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sorted.map((d, i) => {
      const pct = d.uptime ?? 0;
      const color = pct >= 99.5 ? "bg-emerald-400" : pct >= 90 ? "bg-primary" : pct >= 50 ? "bg-yellow-400" : "bg-destructive";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground w-4 text-right tabular-nums", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-foreground flex-1 truncate min-w-0", children: d.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GaugeBar, { value: pct, max: 100, color }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-medium text-foreground tabular-nums w-14 text-right", children: [
          pct.toFixed(1),
          "%"
        ] })
      ] }, d.id);
    }) })
  ] });
}
const FILTERS = ["24h", "7d", "30d", "All"];
function sparkFor(seed, len = 12) {
  return Array.from({ length: len }, (_, i) => {
    const val = 60 + seed * (i + 1) * 7 % 40;
    return val;
  });
}
function Analytics() {
  const { devices, alerts } = useNetworkStore();
  const [filter, setFilter] = reactExports.useState("24h");
  const total = devices.length;
  const online = devices.filter((d) => d.status === "active").length;
  const faulty = devices.filter((d) => d.status === "faulty").length;
  const warn = devices.filter((d) => d.status === "warning").length;
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const avgSignal = devices.filter((d) => d.signalStrength !== void 0).reduce((s, d) => s + (d.signalStrength ?? 0), 0) / (devices.filter((d) => d.signalStrength !== void 0).length || 1);
  const avgUptime = devices.filter((d) => d.uptime !== void 0).reduce((s, d) => s + (d.uptime ?? 0), 0) / (devices.filter((d) => d.uptime !== void 0).length || 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full p-4 gap-4 overflow-y-auto noc-scrollbar",
      "data-ocid": "analytics-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-base font-semibold text-foreground tracking-wide flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 18, className: "text-primary" }),
              "Network Analytics"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Performance metrics and health overview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 glass-card rounded-xl p-1", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFilter(f),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${filter === f ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "time-filter-btn",
              children: f
            },
            f
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Devices",
              value: total,
              icon: Wifi,
              trend: "up",
              trendVal: "+2 this week",
              sparkValues: sparkFor(1),
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Network Availability",
              value: avgUptime.toFixed(1),
              unit: "%",
              icon: CircleCheckBig,
              trend: "up",
              trendVal: "+0.3%",
              sparkValues: sparkFor(2),
              sparkColor: "bg-emerald-400",
              delay: 0.06
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Active Alerts",
              value: activeAlerts.length,
              icon: TriangleAlert,
              trend: "down",
              trendVal: "-1 resolved",
              sparkValues: sparkFor(3),
              sparkColor: "bg-destructive",
              delay: 0.12
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Avg Signal Level",
              value: avgSignal.toFixed(1),
              unit: "dBm",
              icon: Activity,
              trend: avgSignal >= -27 ? "up" : "down",
              trendVal: avgSignal >= -27 ? "PASS" : "WARN",
              sparkValues: sparkFor(4),
              sparkColor: "bg-accent",
              delay: 0.18
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.22 },
            className: "flex-shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-3", children: "Device Health Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, className: "text-emerald-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                    online,
                    " Online"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 14, className: "text-yellow-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                    warn,
                    " Warning"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14, className: "text-destructive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                    faulty,
                    " Faulty"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 ml-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-3 rounded-full overflow-hidden flex", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${online / total * 100}%` },
                        transition: { duration: 1, ease: "easeOut" },
                        className: "h-full bg-emerald-400"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${warn / total * 100}%` },
                        transition: { duration: 1, delay: 0.2, ease: "easeOut" },
                        className: "h-full bg-yellow-400"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${faulty / total * 100}%` },
                        transition: { duration: 1, delay: 0.4, ease: "easeOut" },
                        className: "h-full bg-destructive"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      Math.round(online / total * 100),
                      "% healthy"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      total,
                      " total"
                    ] })
                  ] })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.28 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDistribution, { devices })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.32 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceBreakdown, { devices })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.36 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTimeline, { alerts })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(UptimeRanking, { devices })
            }
          )
        ] })
      ]
    }
  );
}
export {
  Analytics as default
};
