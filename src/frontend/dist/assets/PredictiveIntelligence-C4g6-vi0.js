import { c as createLucideIcon, u as useNetworkStore, d as useNavigate, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, af as Brain, b as cn, f as Activity, a7 as Zap, h as Cpu, k as Radio, a4 as ChevronRight } from "./index-Bz87mU_A.js";
import { G as GlassCard } from "./GlassCard-BqcuZ-3H.js";
import { R as ResponsiveContainer, T as Tooltip, B as Bar, C as Cell, a as ReferenceDot } from "./generateCategoricalChart-B-dNyQaS.js";
import { B as BarChart, A as Area } from "./BarChart-Bb80d4Qn.js";
import { C as CartesianGrid, X as XAxis, Y as YAxis, L as Line } from "./YAxis-Bd4LICyo.js";
import { T as TrendingUp } from "./trending-up-BQfvkv_t.js";
import { A as AreaChart } from "./AreaChart-DnZtPAhC.js";
import { L as LineChart } from "./LineChart-0INB9Reb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
];
const OctagonAlert = createLucideIcon("octagon-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
const Scissors = createLucideIcon("scissors", __iconNode);
function riskClass(score) {
  if (score >= 80) return "text-red-400";
  if (score >= 60) return "text-orange-400";
  if (score >= 40) return "text-amber-400";
  return "text-emerald-400";
}
function riskBarClass(score) {
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 40) return "bg-amber-400";
  return "bg-emerald-400";
}
function riskLabel(score) {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}
function riskBadgeClass(score) {
  if (score >= 80) return "bg-red-500/15 border-red-500/30 text-red-400";
  if (score >= 60)
    return "bg-orange-500/15 border-orange-500/30 text-orange-400";
  if (score >= 40) return "bg-amber-400/15 border-amber-400/30 text-amber-400";
  return "bg-emerald-400/15 border-emerald-400/30 text-emerald-400";
}
const FAILURE_ICONS = {
  "fiber-cut": Scissors,
  "signal-degradation": Radio,
  "device-failure": Cpu
};
const FAILURE_COLORS = {
  "fiber-cut": "text-red-400",
  "signal-degradation": "text-amber-400",
  "device-failure": "text-orange-400"
};
const BUCKETS = ["0–20", "20–40", "40–60", "60–80", "80–100"];
const BUCKET_COLORS = [
  "oklch(0.62 0.22 142)",
  "oklch(0.72 0.22 90)",
  "oklch(0.70 0.25 55)",
  "oklch(0.65 0.25 40)",
  "oklch(0.62 0.28 22)"
];
function RiskDistributionChart({ alerts }) {
  const data = BUCKETS.map((label, i) => {
    const min = i * 20;
    const max = min + 20;
    return {
      label,
      count: alerts.filter((a) => a.riskScore >= min && a.riskScore < max).length
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 11, className: "text-primary" }),
      "Risk Score Distribution"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data,
        margin: { top: 4, right: 4, left: -20, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(0.26 0.01 265 / 0.5)",
              vertical: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "label",
              tick: { fontSize: 10, fill: "oklch(0.52 0.008 260)" },
              tickLine: false,
              axisLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 10, fill: "oklch(0.52 0.008 260)" },
              tickLine: false,
              axisLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(0.18 0.008 265 / 0.95)",
                border: "1px solid oklch(0.26 0.01 265)",
                borderRadius: 8,
                fontSize: 11,
                color: "oklch(0.92 0.005 260)"
              },
              cursor: { fill: "oklch(0.92 0.005 260 / 0.04)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", name: "Devices", radius: [4, 4, 0, 0], children: data.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: BUCKET_COLORS[i] }, `cell-${entry.label}-${i}`)) })
        ]
      }
    ) })
  ] });
}
function deterministicAnomalyTrend() {
  const base = /* @__PURE__ */ new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() - (13 - i));
    const seed = (i * 13 + 7) % 100;
    return {
      day: `${d.getMonth() + 1}/${d.getDate()}`,
      anomalies: 4 + seed * 3 % 18
    };
  });
}
const ANOMALY_DATA = deterministicAnomalyTrend();
function AnomalyTrendChart() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 11, className: "text-accent" }),
      "Anomaly Detection (14 days)"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      AreaChart,
      {
        data: ANOMALY_DATA,
        margin: { top: 4, right: 4, left: -20, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "anomalyGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "5%",
                stopColor: "oklch(0.68 0.25 55)",
                stopOpacity: 0.35
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "stop",
              {
                offset: "95%",
                stopColor: "oklch(0.68 0.25 55)",
                stopOpacity: 0.03
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(0.26 0.01 265 / 0.5)",
              vertical: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "day",
              tick: { fontSize: 10, fill: "oklch(0.52 0.008 260)" },
              tickLine: false,
              axisLine: false,
              interval: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 10, fill: "oklch(0.52 0.008 260)" },
              tickLine: false,
              axisLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(0.18 0.008 265 / 0.95)",
                border: "1px solid oklch(0.26 0.01 265)",
                borderRadius: 8,
                fontSize: 11,
                color: "oklch(0.92 0.005 260)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "anomalies",
              name: "Anomalies",
              stroke: "oklch(0.68 0.25 55)",
              strokeWidth: 2,
              fill: "url(#anomalyGrad)"
            }
          )
        ]
      }
    ) })
  ] });
}
function deterministicSignalTrend(seed) {
  return Array.from({ length: 7 }, (_, i) => {
    const v = -22 + Math.sin((i + seed) * 1.5) * 6 + seed * i % 5 - 2;
    const anomaly = (seed + i) % 7 === 3;
    return { day: `D${i + 1}`, signal: Math.round(v * 10) / 10, anomaly };
  });
}
function SignalSparkline({
  alert,
  index
}) {
  const data = deterministicSignalTrend(index);
  const anomalyPoints = data.filter((d) => d.anomaly);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-foreground truncate", children: alert.deviceName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: cn("text-[10px] font-mono", riskClass(alert.riskScore)),
            children: [
              "Risk: ",
              alert.riskScore
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "text-[9px] font-mono px-1.5 py-0.5 rounded border",
            riskBadgeClass(alert.riskScore)
          ),
          children: riskLabel(alert.riskScore)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 48, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      LineChart,
      {
        data,
        margin: { top: 2, right: 2, left: -30, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "signal",
              stroke: "oklch(0.72 0.22 210)",
              strokeWidth: 1.5,
              dot: false
            }
          ),
          anomalyPoints.map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceDot,
            {
              x: pt.day,
              y: pt.signal,
              r: 3,
              fill: "oklch(0.62 0.28 22)",
              stroke: "none"
            },
            pt.day
          ))
        ]
      }
    ) })
  ] });
}
const REGIONS = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "South America"
];
function RegionHeatmap({ alerts }) {
  const REGION_PREFIX = {
    r0: "North America",
    r1: "Europe",
    r2: "Asia-Pacific",
    r3: "Middle East",
    r4: "South America"
  };
  const regionStats = REGIONS.map((name) => {
    const regionAlerts = alerts.filter((a) => {
      const match = a.deviceId.match(/r(\d)/);
      if (!match) return false;
      return REGION_PREFIX[`r${match[1]}`] === name;
    });
    const avgRisk = regionAlerts.length > 0 ? Math.round(
      regionAlerts.reduce((s, a) => s + a.riskScore, 0) / regionAlerts.length
    ) : 0;
    const faults = regionAlerts.filter((a) => a.riskScore >= 70).length;
    return { name, avgRisk, faults, count: regionAlerts.length };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11, className: "text-primary" }),
      "Fault Density by Region"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: regionStats.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.06 },
        className: cn(
          "rounded-xl p-3 border text-center",
          r.avgRisk >= 70 ? "bg-red-500/10 border-red-500/25" : r.avgRisk >= 50 ? "bg-orange-500/10 border-orange-500/25" : r.avgRisk >= 30 ? "bg-amber-400/10 border-amber-400/25" : "bg-emerald-400/10 border-emerald-400/25"
        ),
        "data-ocid": "region-heatmap-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-xl font-display font-bold tabular-nums",
                riskClass(r.avgRisk)
              ),
              children: r.avgRisk
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground mt-0.5", children: "avg risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-foreground font-medium mt-1.5 leading-tight", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground mt-0.5", children: [
            r.faults,
            " at-risk"
          ] })
        ]
      },
      r.name
    )) })
  ] });
}
function AtRiskPanel({
  alerts,
  simulationMode,
  onDeviceClick
}) {
  const top20 = reactExports.useMemo(
    () => [...alerts].filter((a) => a.status === "active").sort((a, b) => b.riskScore - a.riskScore).slice(0, 20),
    [alerts]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5 flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { size: 11, className: "text-destructive" }),
      "At-Risk Devices",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-mono bg-destructive/10 border border-destructive/25 text-destructive px-2 py-0.5 rounded-md", children: [
        top20.length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto flex-1 noc-scrollbar space-y-2 max-h-[480px]", children: top20.map((alert, i) => {
      const FailIcon = FAILURE_ICONS[alert.failureType];
      const isHighlighted = simulationMode && alert.riskScore > 70;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.025 },
          className: cn(
            "p-3 rounded-xl border transition-smooth cursor-pointer group",
            isHighlighted ? "border-orange-500/40 bg-orange-500/8" : "border-border/25 bg-card/40 hover:bg-card/70"
          ),
          onClick: () => onDeviceClick(alert.deviceId),
          "data-ocid": "at-risk-device-item",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate group-hover:text-primary transition-smooth", children: alert.deviceName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FailIcon,
                    {
                      size: 10,
                      className: FAILURE_COLORS[alert.failureType]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground capitalize", children: alert.failureType.replace("-", " ") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-sm font-display font-bold tabular-nums",
                      riskClass(alert.riskScore)
                    ),
                    children: alert.riskScore
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[9px] font-mono px-1.5 py-0.5 rounded border",
                      riskBadgeClass(alert.riskScore)
                    ),
                    children: riskLabel(alert.riskScore)
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-muted/40 overflow-hidden mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${alert.riskScore}%` },
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                  delay: i * 0.02
                },
                className: cn(
                  "h-full rounded-full",
                  riskBarClass(alert.riskScore)
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                "ETA: In ",
                alert.predictedETA.toFixed(1),
                "h"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  size: 10,
                  className: "text-muted-foreground/40 group-hover:text-primary transition-smooth"
                }
              )
            ] })
          ]
        },
        alert.id
      );
    }) })
  ] });
}
function SignalTrendsPanel({ alerts }) {
  const top5 = reactExports.useMemo(
    () => [...alerts].filter((a) => a.status === "active").sort((a, b) => b.riskScore - a.riskScore).slice(0, 5),
    [alerts]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 11, className: "text-primary" }),
      "Signal Trend Analysis — Top 5 At-Risk"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3", children: top5.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SignalSparkline, { alert, index: i }, alert.id)) })
  ] });
}
function PredictiveIntelligence() {
  const { predictiveAlerts, simulationMode, toggleSimulationMode } = useNetworkStore();
  const navigate = useNavigate();
  const [alerts, setAlerts] = reactExports.useState(predictiveAlerts);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setAlerts(
        (prev) => prev.map((a) => ({
          ...a,
          riskScore: Math.max(
            5,
            Math.min(99, a.riskScore + Math.round((Math.random() - 0.48) * 5))
          ),
          predictedETA: Math.max(
            0.5,
            a.predictedETA - 5 / 3600
            // 5 seconds in hours
          )
        }))
      );
    }, 5e3);
    return () => clearInterval(id);
  }, []);
  const activeAlerts = alerts.filter((a) => a.status === "active");
  const highRisk = activeAlerts.filter((a) => a.riskScore >= 70).length;
  const mediumRisk = activeAlerts.filter(
    (a) => a.riskScore >= 40 && a.riskScore < 70
  ).length;
  const avgRisk = activeAlerts.length > 0 ? Math.round(
    activeAlerts.reduce((s, a) => s + a.riskScore, 0) / activeAlerts.length
  ) : 0;
  function handleDeviceClick(deviceId) {
    useNetworkStore.getState().setSelectedDevice(deviceId);
    void navigate({ to: "/devices" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full overflow-y-auto noc-scrollbar",
      "data-ocid": "predictive-intelligence-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: simulationMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "bg-orange-500/15 border-b border-orange-500/35 overflow-hidden flex-shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FlaskConical,
                {
                  size: 13,
                  className: "text-orange-400 flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-orange-400 font-semibold uppercase tracking-widest font-mono", children: "⚠ SIMULATION MODE ACTIVE — Virtual fault injection enabled. Data reflects predicted failure scenarios, not live conditions." })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-base font-semibold text-foreground tracking-wide flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 18, className: "text-primary" }),
                "Predictive Intelligence"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "AI-driven fault prediction · Auto-refreshes every 5s" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: toggleSimulationMode,
                className: cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-smooth",
                  simulationMode ? "bg-orange-500/20 border-orange-500/40 text-orange-400 noc-glow-active" : "bg-card border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60"
                ),
                "data-ocid": "simulation-toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { size: 13 }),
                  simulationMode ? "Exit Simulation" : "Simulation Mode"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0", children: [
            {
              label: "High Risk Devices",
              value: highRisk,
              icon: OctagonAlert,
              acc: "text-red-400",
              bg: "bg-red-400/15 border border-red-400/25",
              delay: 0
            },
            {
              label: "Medium Risk Devices",
              value: mediumRisk,
              icon: Activity,
              acc: "text-amber-400",
              bg: "bg-amber-400/15 border border-amber-400/25",
              delay: 0.06
            },
            {
              label: "Anomalies Detected",
              value: activeAlerts.length,
              icon: Zap,
              acc: "text-primary",
              bg: "bg-primary/15 border border-primary/25",
              delay: 0.12
            },
            {
              label: "Avg Risk Score",
              value: avgRisk,
              icon: Brain,
              acc: riskClass(avgRisk),
              bg: "bg-card border-border/30",
              delay: 0.18
            }
          ].map(({ label, value, icon: Icon, acc, bg, delay }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.35, delay },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center",
                      bg
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: acc })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: cn(
                      "text-2xl font-display font-bold tabular-nums",
                      acc
                    ),
                    children: value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: label })
              ] })
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -14 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.22 },
                className: "lg:col-span-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AtRiskPanel,
                  {
                    alerts,
                    simulationMode,
                    onDeviceClick: handleDeviceClick
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 14 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.26 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskDistributionChart, { alerts: activeAlerts })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 14 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnomalyTrendChart, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.34 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalTrendsPanel, { alerts })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.38 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RegionHeatmap, { alerts: activeAlerts })
            }
          )
        ] })
      ]
    }
  );
}
export {
  PredictiveIntelligence as default
};
