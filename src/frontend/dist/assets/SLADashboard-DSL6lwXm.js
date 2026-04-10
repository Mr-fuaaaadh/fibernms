import { u as useNetworkStore, r as reactExports, j as jsxRuntimeExports, aa as Shield, b as cn, T as TriangleAlert, m as motion, f as Activity, _ as Clock } from "./index-DluTrB5k.js";
import { G as GlassCard } from "./GlassCard-EmBwVYrn.js";
import { R as RefreshCw } from "./refresh-cw-BwaY61hM.js";
import { C as CircleCheck } from "./circle-check-CDCUwaRH.js";
import { C as CircleX } from "./circle-x-B1IaoPDF.js";
import { R as ResponsiveContainer, T as Tooltip, L as Legend } from "./generateCategoricalChart-C5KGvJvM.js";
import { L as LineChart } from "./LineChart-CVxg0ilf.js";
import { C as CartesianGrid, X as XAxis, Y as YAxis, L as Line } from "./YAxis-CPwdNa_W.js";
function SLABadge({ status }) {
  const cfg = {
    compliant: {
      label: "COMPLIANT",
      cls: "bg-emerald-500/15 border border-emerald-500/35 text-emerald-400",
      dot: "bg-emerald-400"
    },
    warning: {
      label: "WARNING",
      cls: "bg-amber-400/15 border border-amber-400/35 text-amber-400",
      dot: "bg-amber-400"
    },
    breach: {
      label: "BREACH",
      cls: "bg-red-500/15 border border-red-500/35 text-red-400",
      dot: "bg-red-400"
    }
  }[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-widest font-mono",
        cfg.cls
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot) }),
        cfg.label
      ]
    }
  );
}
function KPICard({
  label,
  value,
  unit,
  icon: Icon,
  accentClass,
  bgClass,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-4 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-9 h-9 rounded-xl flex items-center justify-center",
              bgClass
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: accentClass })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold tabular-nums text-foreground", children: [
          value,
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: unit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: label })
      ] })
    }
  );
}
function deterministic30DayTrend() {
  const base = /* @__PURE__ */ new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() - (29 - i));
    const seed = (i * 17 + 42) % 100;
    const compliance = 78 + seed * 3 % 20;
    const warnings = 4 + seed * 2 % 8;
    const breaches = seed % 5;
    return {
      day: `${d.getMonth() + 1}/${d.getDate()}`,
      compliance,
      warnings,
      breaches
    };
  });
}
const TREND_DATA = deterministic30DayTrend();
function SLATrendChart({ timeRange }) {
  const sliceMap = { "24h": 1, "7d": 7, "30d": 30 };
  const data = TREND_DATA.slice(-sliceMap[timeRange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 11, className: "text-primary" }),
      "SLA Compliance Trend"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      LineChart,
      {
        data,
        margin: { top: 4, right: 4, left: -16, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(0.26 0.01 265 / 0.5)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "day",
              tick: { fontSize: 10, fill: "oklch(0.52 0.008 260)" },
              tickLine: false,
              axisLine: false,
              interval: timeRange === "30d" ? 6 : 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 10, fill: "oklch(0.52 0.008 260)" },
              tickLine: false,
              axisLine: false,
              domain: [0, 100]
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "compliance",
              name: "Compliance %",
              stroke: "oklch(0.72 0.22 210)",
              strokeWidth: 2,
              dot: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "warnings",
              name: "Warnings",
              stroke: "oklch(0.70 0.25 55)",
              strokeWidth: 1.5,
              dot: false,
              strokeDasharray: "4 2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "breaches",
              name: "Breaches",
              stroke: "oklch(0.62 0.28 22)",
              strokeWidth: 1.5,
              dot: false,
              strokeDasharray: "4 2"
            }
          )
        ]
      }
    ) })
  ] });
}
function BreachAlertsPanel({ records }) {
  const critical = records.filter((r) => r.status === "breach" || r.status === "warning").sort((a, b) => {
    if (a.status === "breach" && b.status !== "breach") return -1;
    if (b.status === "breach" && a.status !== "breach") return 1;
    return b.latency - a.latency;
  });
  function relTime(ts) {
    const m = Math.floor((Date.now() - ts) / 6e4);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5 flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5 flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11, className: "text-destructive" }),
      "Active Breach & Warnings",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-[10px] text-destructive bg-destructive/10 border border-destructive/25 px-2 py-0.5 rounded-md", children: [
        critical.length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 overflow-y-auto flex-1 noc-scrollbar max-h-[380px]", children: [
      critical.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.04 },
          className: cn(
            "p-3 rounded-xl border transition-smooth cursor-default",
            r.status === "breach" ? "sla-breach bg-red-500/5 border-red-500/20 hover:bg-red-500/10" : "sla-warning bg-amber-400/5 border-amber-400/20 hover:bg-amber-400/10"
          ),
          "data-ocid": "breach-alert-item",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: r.customerName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: r.region })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SLABadge, { status: r.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 9 }),
                  relTime(r.lastChecked)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-[10px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block", children: "Latency" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "font-mono font-medium",
                      r.latency > 50 ? "text-red-400" : "text-foreground"
                    ),
                    children: [
                      r.latency.toFixed(1),
                      "ms"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block", children: "Pkt Loss" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "font-mono font-medium",
                      r.packetLoss > 1.5 ? "text-amber-400" : "text-foreground"
                    ),
                    children: [
                      r.packetLoss.toFixed(2),
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground block", children: "Uptime" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "font-mono font-medium",
                      r.uptime < 99 ? "text-red-400" : "text-foreground"
                    ),
                    children: [
                      r.uptime.toFixed(2),
                      "%"
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        r.id
      )),
      critical.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 28, className: "text-emerald-400 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All SLAs compliant" })
      ] })
    ] })
  ] });
}
function SLATable({ records }) {
  const [sortKey, setSortKey] = reactExports.useState("status");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const STATUS_ORDER = {
    breach: 0,
    warning: 1,
    compliant: 2
  };
  const sorted = reactExports.useMemo(() => {
    return [...records].sort((a, b) => {
      let va;
      let vb;
      if (sortKey === "status") {
        va = STATUS_ORDER[a.status];
        vb = STATUS_ORDER[b.status];
      } else {
        va = a[sortKey];
        vb = b[sortKey];
      }
      if (typeof va === "string" && typeof vb === "string") {
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }, [records, sortKey, sortDir]);
  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }
  function relTime(ts) {
    const m = Math.floor((Date.now() - ts) / 6e4);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
  const cols = [
    { key: "customerName", label: "Customer" },
    { key: "region", label: "Region" },
    { key: "status", label: "Status" },
    { key: "uptime", label: "Uptime", align: "text-right" },
    { key: "latency", label: "Latency", align: "text-right" },
    { key: "packetLoss", label: "Pkt Loss", align: "text-right" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/30 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 13, className: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[10px] tracking-widest text-muted-foreground uppercase", children: [
        "SLA Records — ",
        records.length,
        " customers"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto noc-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", "data-ocid": "sla-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/20", children: [
        cols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: cn(
              "px-4 py-2.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider select-none",
              c.align
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex items-center gap-1 hover:text-foreground transition-smooth w-full",
                onClick: () => handleSort(c.key),
                "data-ocid": `sort-col-${c.key}`,
                children: [
                  c.label,
                  sortKey === c.key && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-[8px]", children: sortDir === "asc" ? "▲" : "▼" })
                ]
              }
            )
          },
          c.key
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-right", children: "Last Checked" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.tr,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: i * 0.02 },
          className: cn(
            "border-b border-border/10 transition-smooth hover:bg-card/60 group",
            r.status === "breach" && "hover:bg-red-500/5",
            r.status === "warning" && "hover:bg-amber-400/5"
          ),
          "data-ocid": "sla-table-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: r.customerName }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: r.region }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SLABadge, { status: r.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  r.uptime >= 99.5 ? "text-emerald-400" : r.uptime >= 99 ? "text-primary" : r.uptime >= 97 ? "text-amber-400" : "text-red-400"
                ),
                children: [
                  r.uptime.toFixed(2),
                  "%"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  r.latency <= 20 ? "text-emerald-400" : r.latency <= 50 ? "text-foreground" : r.latency <= 70 ? "text-amber-400" : "text-red-400"
                ),
                children: [
                  r.latency.toFixed(1),
                  "ms"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  r.packetLoss < 0.5 ? "text-emerald-400" : r.packetLoss < 1.5 ? "text-foreground" : r.packetLoss < 2.5 ? "text-amber-400" : "text-red-400"
                ),
                children: [
                  r.packetLoss.toFixed(2),
                  "%"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right text-muted-foreground flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
              relTime(r.lastChecked)
            ] })
          ]
        },
        r.id
      )) })
    ] }) })
  ] });
}
const TIME_RANGES = ["24h", "7d", "30d"];
function SLADashboard() {
  const { slaRecords } = useNetworkStore();
  const [timeRange, setTimeRange] = reactExports.useState("30d");
  const [records, setRecords] = reactExports.useState(slaRecords);
  const [lastRefresh, setLastRefresh] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setRecords(
        (prev) => prev.map((r) => ({
          ...r,
          latency: Math.max(1, r.latency + (Math.random() - 0.5) * 4),
          packetLoss: Math.max(
            0,
            Math.min(3, r.packetLoss + (Math.random() - 0.5) * 0.3)
          ),
          uptime: Math.max(
            90,
            Math.min(100, r.uptime + (Math.random() - 0.5) * 0.1)
          ),
          lastChecked: Date.now() - Math.floor(Math.random() * 6e4)
        }))
      );
      setLastRefresh(/* @__PURE__ */ new Date());
    }, 5e3);
    return () => clearInterval(id);
  }, []);
  const total = records.length;
  const compliantCount = records.filter((r) => r.status === "compliant").length;
  const warningCount = records.filter((r) => r.status === "warning").length;
  const breachCount = records.filter((r) => r.status === "breach").length;
  const compliancePct = total > 0 ? Math.round(compliantCount / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full p-4 gap-4 overflow-y-auto noc-scrollbar",
      "data-ocid": "sla-dashboard",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-base font-semibold text-foreground tracking-wide flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18, className: "text-primary" }),
              "SLA & Service Assurance"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 9, className: "text-primary/60 animate-spin-slow" }),
              "Auto-refreshes every 5s · Last:",
              " ",
              lastRefresh.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 glass-card rounded-xl p-1", children: TIME_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setTimeRange(r),
              className: cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth",
                timeRange === r ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
              ),
              "data-ocid": "time-range-btn",
              children: r
            },
            r
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Total SLA Records",
              value: total,
              icon: Shield,
              accentClass: "text-primary",
              bgClass: "bg-primary/15 border border-primary/25",
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Compliance Rate",
              value: compliancePct,
              unit: "%",
              icon: CircleCheck,
              accentClass: "text-emerald-400",
              bgClass: "bg-emerald-400/15 border border-emerald-400/25",
              delay: 0.06
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "SLA Warnings",
              value: warningCount,
              icon: TriangleAlert,
              accentClass: "text-amber-400",
              bgClass: "bg-amber-400/15 border border-amber-400/25",
              delay: 0.12
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              label: "Active Breaches",
              value: breachCount,
              icon: CircleX,
              accentClass: "text-red-400",
              bgClass: "bg-red-400/15 border border-red-400/25",
              delay: 0.18
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "lg:col-span-2",
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.22 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SLATrendChart, { timeRange })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.28 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreachAlertsPanel, { records })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.34 },
            className: "flex-shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SLATable, { records })
          }
        )
      ]
    }
  );
}
export {
  SLADashboard as default
};
