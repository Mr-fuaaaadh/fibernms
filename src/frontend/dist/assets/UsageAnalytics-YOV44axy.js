import { r as reactExports, au as PLAN_CONFIGS, j as jsxRuntimeExports, a3 as Badge, b as cn, a0 as Server, a8 as Zap, f as Activity, T as TriangleAlert, a7 as TrendingUp, aw as Database, aq as Plan, aj as FileText, X } from "./index-DMP4-mtx.js";
import { B as Button } from "./button-UHhb8Ywf.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-GQpJWv-F.js";
import { u as useSubscription, a as useDeviceQuota } from "./useFeature-C3vRndnl.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-m9MiePe5.js";
import { R as ResponsiveContainer, T as Tooltip, v as ReferenceLine, B as Bar, C as Cell, L as Legend } from "./generateCategoricalChart-CynI4SrN.js";
import { A as AreaChart } from "./AreaChart-DItMTFMN.js";
import { C as CartesianGrid } from "./CartesianGrid-B9wHJAQc.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BIFnknc_.js";
import { A as Area } from "./Area-D9Xpx8hZ.js";
import { B as BarChart } from "./BarChart-CwoGX_Q7.js";
import { L as LineChart } from "./LineChart-OIAPceDH.js";
import { L as Line } from "./Line-BR9WKa1M.js";
import { D as Download } from "./download-1bgTig3K.js";
import { C as CircleCheck } from "./circle-check-C4EdDAJs.js";
import { A as ArrowUpRight } from "./arrow-up-right-DaKc7dqe.js";
import { A as ArrowDownRight } from "./arrow-down-right-DLZ-Hnyh.js";
function seededRand(seed) {
  let s = seed;
  return () => {
    s = s * 1664525 + 1013904223 & 4294967295;
    return (s >>> 0) / 4294967295;
  };
}
function buildTimeSeriesData(deviceLimit, apiQuota) {
  const rand = seededRand(42);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const days = [];
  let deviceBase = Math.floor(deviceLimit * 0.35);
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    const date = d.toISOString().slice(0, 10);
    const growthNoise = 1 + (rand() - 0.45) * 6e-3;
    deviceBase = Math.min(
      Math.floor(deviceBase * 1.0015 * growthNoise),
      deviceLimit
    );
    const apiBase = isWeekend ? apiQuota * 95e-4 : apiQuota * 0.028 + apiQuota * 9e-3 * (rand() - 0.5);
    const apiCalls = Math.max(
      1e3,
      Math.floor(apiBase * (0.85 + rand() * 0.3))
    );
    const deviceScale = deviceBase / deviceLimit;
    const criticalAlerts = Math.floor(rand() * 18 * deviceScale + 2);
    const warningAlerts = Math.floor(rand() * 55 * deviceScale + 8);
    const infoAlerts = Math.floor(rand() * 120 * deviceScale + 20);
    const workflows = isWeekend ? Math.floor(rand() * 8 + 1) : Math.floor(rand() * 40 + 12);
    days.push({
      date,
      label,
      devices: deviceBase,
      apiCalls,
      criticalAlerts,
      warningAlerts,
      infoAlerts,
      workflows
    });
  }
  return days;
}
const PLAN_COLOR_MAP = {
  [Plan.BASIC]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  [Plan.PROFESSIONAL]: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  [Plan.ENTERPRISE]: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  [Plan.ULTRA]: "bg-rose-500/15 text-rose-400 border-rose-500/30"
};
function SummaryCard({
  icon,
  label,
  value,
  sub,
  trendPct,
  progress,
  progressColor = "bg-primary",
  "data-ocid": ocid
}) {
  const up = trendPct >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass-card border-border", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
        icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wide", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "flex items-center gap-0.5 text-xs font-semibold",
            up ? "text-emerald-400" : "text-rose-400"
          ),
          children: [
            up ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "size-3" }),
            Math.abs(trendPct).toFixed(1),
            "%"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display leading-none", children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
    ] }),
    progress !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-full rounded-full transition-all",
          progressColor
        ),
        style: { width: `${Math.min(100, progress)}%` }
      }
    ) }) })
  ] }) });
}
function ChartTooltipContent({
  active,
  payload,
  label
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/95 backdrop-blur-sm p-2.5 shadow-lg text-xs space-y-1 min-w-[130px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium mb-1.5", children: label }),
    payload.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: entry.color }, className: "font-medium", children: entry.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: entry.value.toLocaleString() })
    ] }, entry.name))
  ] });
}
function ExportModal({ onClose }) {
  const [selected, setSelected] = reactExports.useState("csv");
  const [downloading, setDownloading] = reactExports.useState(false);
  function handleDownload() {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onClose();
    }, 1200);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm",
      "data-ocid": "usage-export-modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5 mx-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4 text-primary" }),
            "Export Usage Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Close export modal",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Download a full usage analytics report for the selected period." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["csv", "pdf"].map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelected(fmt),
            "data-ocid": `usage-export-${fmt}`,
            className: cn(
              "rounded-xl border p-4 flex flex-col items-center gap-2 transition-all",
              selected === fmt ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-border/80 hover:bg-muted/30"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase", children: fmt }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: fmt === "csv" ? "Spreadsheet data" : "Formatted report" })
            ]
          },
          fmt
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1 text-xs",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "flex-1 text-xs",
              onClick: handleDownload,
              disabled: downloading,
              "data-ocid": "usage-export-confirm",
              children: downloading ? "Preparing…" : `Download ${selected.toUpperCase()}`
            }
          )
        ] })
      ] })
    }
  );
}
const TIME_RANGES = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 }
];
const DATA_RETENTION = {
  [Plan.BASIC]: "7 days",
  [Plan.PROFESSIONAL]: "30 days",
  [Plan.ENTERPRISE]: "90 days",
  [Plan.ULTRA]: "Unlimited"
};
function UsageAnalytics() {
  const sub = useSubscription();
  const quota = useDeviceQuota();
  const config = PLAN_CONFIGS[sub.currentPlan];
  const [timeRange, setTimeRange] = reactExports.useState(30);
  const [showExport, setShowExport] = reactExports.useState(false);
  const allData = buildTimeSeriesData(sub.deviceLimit, sub.apiQuota);
  const data = allData.slice(90 - timeRange);
  const totalWorkflows = data.reduce((s, d) => s + d.workflows, 0);
  const totalAlerts = data.reduce(
    (s, d) => s + d.criticalAlerts + d.warningAlerts + d.infoAlerts,
    0
  );
  const halfIdx = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, halfIdx);
  const secondHalf = data.slice(halfIdx);
  const avgDevicesFirst = firstHalf.reduce((s, d) => s + d.devices, 0) / Math.max(1, firstHalf.length);
  const avgDevicesSecond = secondHalf.reduce((s, d) => s + d.devices, 0) / Math.max(1, secondHalf.length);
  const deviceTrend = avgDevicesFirst > 0 ? (avgDevicesSecond - avgDevicesFirst) / avgDevicesFirst * 100 : 0;
  const avgApiFirst = firstHalf.reduce((s, d) => s + d.apiCalls, 0) / Math.max(1, firstHalf.length);
  const avgApiSecond = secondHalf.reduce((s, d) => s + d.apiCalls, 0) / Math.max(1, secondHalf.length);
  const apiTrend = avgApiFirst > 0 ? (avgApiSecond - avgApiFirst) / avgApiFirst * 100 : 0;
  const alertsFirst = firstHalf.reduce(
    (s, d) => s + d.criticalAlerts + d.warningAlerts + d.infoAlerts,
    0
  );
  const alertsSecond = secondHalf.reduce(
    (s, d) => s + d.criticalAlerts + d.warningAlerts + d.infoAlerts,
    0
  );
  const alertTrend = alertsFirst > 0 ? (alertsSecond - alertsFirst) / alertsFirst * 100 : 0;
  const wfFirst = firstHalf.reduce((s, d) => s + d.workflows, 0);
  const wfSecond = secondHalf.reduce((s, d) => s + d.workflows, 0);
  const wfTrend = wfFirst > 0 ? (wfSecond - wfFirst) / wfFirst * 100 : 0;
  const tickInterval = timeRange === 7 ? 1 : timeRange === 30 ? 4 : 14;
  function apiBarColor(apiCalls) {
    const pct = apiCalls / (sub.apiQuota * 0.028) * 100;
    if (pct > 90) return "#f43f5e";
    if (pct > 70) return "#f59e0b";
    return "#22c55e";
  }
  const storageItems = [
    {
      label: "Audit Logs",
      gb: 4.2,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5" }),
      color: "bg-violet-500/70"
    },
    {
      label: "Metrics Snapshots",
      gb: 12.8,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5" }),
      color: "bg-blue-500/70"
    },
    {
      label: "Topology Data",
      gb: 3.1,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "size-3.5" }),
      color: "bg-emerald-500/70"
    }
  ];
  const totalGb = storageItems.reduce((s, i) => s + i.gb, 0);
  const baseCost = config.monthlyPrice;
  const apiOverage = sub.apiUsed > sub.apiQuota ? Math.ceil((sub.apiUsed - sub.apiQuota) / 1e4) * 2.5 : 0;
  const deviceOverage = quota.atLimit ? 150 : 0;
  const totalMonthly = baseCost + apiOverage + deviceOverage;
  const costItems = [
    { label: `${config.label} Plan (base)`, amount: baseCost },
    ...apiOverage > 0 ? [{ label: "API Overage (+calls)", amount: apiOverage }] : [],
    ...deviceOverage > 0 ? [{ label: "Device Overage", amount: deviceOverage }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 space-y-8 max-w-7xl mx-auto",
      "data-ocid": "usage-analytics-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "size-6 text-primary" }),
              "Usage Analytics"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Resource consumption and cost overview for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: sub.organizationName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: cn(
                  "border text-xs font-semibold",
                  PLAN_COLOR_MAP[sub.currentPlan]
                ),
                "data-ocid": "usage-plan-badge",
                children: [
                  config.label,
                  " Plan"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex rounded-lg border border-border overflow-hidden",
                "data-ocid": "usage-time-range",
                children: TIME_RANGES.map(({ label, days }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTimeRange(days),
                    className: cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors",
                      timeRange === days ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    ),
                    "data-ocid": `usage-range-${label}`,
                    children: label
                  },
                  days
                ))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "size-3.5" }),
              label: "Total Devices",
              value: quota.used.toLocaleString(),
              sub: `of ${quota.limit.toLocaleString()} device limit`,
              trendPct: deviceTrend,
              progress: quota.percentUsed,
              progressColor: quota.nearLimit ? "bg-amber-500" : quota.atLimit ? "bg-rose-500" : "bg-primary",
              "data-ocid": "usage-card-devices"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3.5" }),
              label: "API Calls This Period",
              value: sub.apiUsed.toLocaleString(),
              sub: `of ${sub.apiQuota.toLocaleString()} quota`,
              trendPct: apiTrend,
              progress: sub.apiUsed / sub.apiQuota * 100,
              progressColor: sub.apiUsed / sub.apiQuota > 0.9 ? "bg-rose-500" : sub.apiUsed / sub.apiQuota > 0.7 ? "bg-amber-500" : "bg-emerald-500",
              "data-ocid": "usage-card-api"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5" }),
              label: "Workflows Executed",
              value: totalWorkflows.toLocaleString(),
              sub: `over last ${timeRange} days`,
              trendPct: wfTrend,
              "data-ocid": "usage-card-workflows"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-3.5" }),
              label: "Alerts Generated",
              value: totalAlerts.toLocaleString(),
              sub: "across all severities",
              trendPct: alertTrend,
              "data-ocid": "usage-card-alerts"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "glass-card border-border",
            "data-ocid": "usage-chart-devices",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4 text-primary" }),
                "Device Growth",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-normal", children: [
                  "Limit: ",
                  sub.deviceLimit.toLocaleString()
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AreaChart,
                {
                  data,
                  margin: { top: 8, right: 4, left: 0, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "deviceGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#6366f1", stopOpacity: 0.3 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#6366f1", stopOpacity: 0.02 })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "warnGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#f59e0b", stopOpacity: 0.18 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#f59e0b", stopOpacity: 0.02 })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "var(--border)",
                        strokeOpacity: 0.4
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "label",
                        tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                        interval: tickInterval,
                        tickLine: false,
                        axisLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                        tickLine: false,
                        axisLine: false,
                        tickFormatter: (v) => v >= 1e3 ? `${(v / 1e3).toFixed(0)}k` : String(v),
                        width: 38
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ReferenceLine,
                      {
                        y: sub.deviceLimit * 0.85,
                        stroke: "#f59e0b",
                        strokeDasharray: "4 3",
                        strokeWidth: 1.5,
                        label: {
                          value: "85% limit",
                          fontSize: 9,
                          fill: "#f59e0b",
                          position: "insideTopRight"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ReferenceLine,
                      {
                        y: sub.deviceLimit,
                        stroke: "#f43f5e",
                        strokeDasharray: "4 3",
                        strokeWidth: 1.5,
                        label: {
                          value: "Max",
                          fontSize: 9,
                          fill: "#f43f5e",
                          position: "insideTopRight"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Area,
                      {
                        type: "monotone",
                        dataKey: "devices",
                        name: "Devices",
                        stroke: "#6366f1",
                        strokeWidth: 2,
                        fill: "url(#deviceGrad)",
                        dot: false,
                        activeDot: { r: 4, fill: "#6366f1" }
                      }
                    )
                  ]
                }
              ) }) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "glass-card border-border", "data-ocid": "usage-chart-api", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-primary" }),
              "Daily API Calls",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-normal", children: [
                "Quota:",
                " ",
                (sub.apiQuota * 0.028).toLocaleString(void 0, {
                  maximumFractionDigits: 0
                }),
                "/day"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                BarChart,
                {
                  data,
                  margin: { top: 4, right: 4, left: 0, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "var(--border)",
                        strokeOpacity: 0.4,
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "label",
                        tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                        interval: tickInterval,
                        tickLine: false,
                        axisLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                        tickLine: false,
                        axisLine: false,
                        tickFormatter: (v) => v >= 1e3 ? `${(v / 1e3).toFixed(0)}k` : String(v),
                        width: 38
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ReferenceLine,
                      {
                        y: sub.apiQuota * 0.028,
                        stroke: "#f43f5e",
                        strokeDasharray: "4 3",
                        strokeWidth: 1.5,
                        label: {
                          value: "Daily quota",
                          fontSize: 9,
                          fill: "#f43f5e",
                          position: "insideTopRight"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "apiCalls",
                        name: "API Calls",
                        radius: [2, 2, 0, 0],
                        maxBarSize: 14,
                        children: data.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Cell,
                          {
                            fill: apiBarColor(entry.apiCalls),
                            fillOpacity: 0.85
                          },
                          entry.date
                        ))
                      }
                    )
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-2 text-xs text-muted-foreground justify-end", children: [
                { color: "#22c55e", label: "< 70%" },
                { color: "#f59e0b", label: "70–90%" },
                { color: "#f43f5e", label: "> 90%" }
              ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "size-2 rounded-sm inline-block",
                    style: { background: color }
                  }
                ),
                label
              ] }, label)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "glass-card border-border",
              "data-ocid": "usage-chart-alerts",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 text-amber-400" }),
                  "Alert Volume by Severity"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  LineChart,
                  {
                    data,
                    margin: { top: 4, right: 4, left: 0, bottom: 0 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CartesianGrid,
                        {
                          strokeDasharray: "3 3",
                          stroke: "var(--border)",
                          strokeOpacity: 0.4
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        XAxis,
                        {
                          dataKey: "label",
                          tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                          interval: tickInterval,
                          tickLine: false,
                          axisLine: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          tick: { fontSize: 10, fill: "var(--muted-foreground)" },
                          tickLine: false,
                          axisLine: false,
                          width: 30
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10, paddingTop: 6 } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Line,
                        {
                          type: "monotone",
                          dataKey: "criticalAlerts",
                          name: "Critical",
                          stroke: "#f43f5e",
                          strokeWidth: 1.5,
                          dot: false,
                          activeDot: { r: 3 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Line,
                        {
                          type: "monotone",
                          dataKey: "warningAlerts",
                          name: "Warning",
                          stroke: "#f59e0b",
                          strokeWidth: 1.5,
                          dot: false,
                          activeDot: { r: 3 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Line,
                        {
                          type: "monotone",
                          dataKey: "infoAlerts",
                          name: "Info",
                          stroke: "#6366f1",
                          strokeWidth: 1.5,
                          dot: false,
                          activeDot: { r: 3 }
                        }
                      )
                    ]
                  }
                ) }) }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "size-4 text-primary" }),
            "Resource Breakdown"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "glass-card border-border",
                "data-ocid": "usage-resource-storage",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Storage Used" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground font-display", children: [
                      totalGb.toFixed(1),
                      " GB"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: storageItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                          item.icon,
                          item.label
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                          item.gb,
                          " GB"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn("h-full rounded-full", item.color),
                          style: { width: `${item.gb / totalGb * 100}%` }
                        }
                      ) })
                    ] }, item.label)) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "glass-card border-border",
                "data-ocid": "usage-resource-retention",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Data Retention" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: DATA_RETENTION[sub.currentPlan] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current plan retention window" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 pt-1", children: [
                      Plan.BASIC,
                      Plan.PROFESSIONAL,
                      Plan.ENTERPRISE,
                      Plan.ULTRA
                    ].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between items-center text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: cn(
                                "font-medium",
                                p === sub.currentPlan ? "text-primary" : "text-muted-foreground"
                              ),
                              children: PLAN_CONFIGS[p].label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: cn(
                                p === sub.currentPlan ? "text-foreground font-semibold" : "text-muted-foreground"
                              ),
                              children: DATA_RETENTION[p]
                            }
                          )
                        ]
                      },
                      p
                    )) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "glass-card border-border",
                "data-ocid": "usage-resource-billing",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Est. This Billing Period" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground font-display", children: [
                      "$",
                      totalMonthly.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Based on current usage" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 pt-1", children: costItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between text-xs",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                            "$",
                            item.amount.toLocaleString()
                          ] })
                        ]
                      },
                      item.label
                    )) })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "glass-card border-border",
            "data-ocid": "usage-cost-breakdown",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4 text-primary" }),
                  "Cost Breakdown"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "text-xs gap-1.5 w-full sm:w-auto",
                    onClick: () => setShowExport(true),
                    "data-ocid": "usage-export-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
                      "Export Report"
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Monthly Plan Cost" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-foreground font-display", children: [
                    "$",
                    baseCost.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    costItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex justify-between items-center text-sm",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: item.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono text-xs", children: [
                            "$",
                            item.amount.toLocaleString()
                          ] })
                        ]
                      },
                      item.label
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Total / month" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-foreground", children: [
                        "$",
                        totalMonthly.toLocaleString()
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Projected Annual Spend" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-foreground font-display", children: [
                    "$",
                    (totalMonthly * 12).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Based on current monthly cost × 12 months" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Annual plan (billed monthly)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                        "$",
                        (baseCost * 12).toLocaleString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Annual discount available" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-mono", children: [
                        "-$",
                        Math.floor(baseCost * 12 * 0.15).toLocaleString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1.5 border-t border-border flex justify-between text-xs font-semibold", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "If billed annually" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-mono", children: [
                        "$",
                        Math.floor(baseCost * 12 * 0.85).toLocaleString()
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium", children: "Overage Summary" }),
                  apiOverage === 0 && deviceOverage === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-emerald-400", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "No overages this period" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You are within all quota limits. No additional charges apply." })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    apiOverage > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400", children: "API Overage" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                        "$",
                        apiOverage.toFixed(2)
                      ] })
                    ] }),
                    deviceOverage > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400", children: "Device Overage" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                        "$",
                        deviceOverage.toFixed(2)
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Overage rate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "API: $2.50 per 10,000 extra calls" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Devices: $150/mo above plan limit" })
                    ] })
                  ] })
                ] })
              ] }) })
            ]
          }
        ),
        showExport && /* @__PURE__ */ jsxRuntimeExports.jsx(ExportModal, { onClose: () => setShowExport(false) })
      ]
    }
  );
}
export {
  UsageAnalytics as default
};
