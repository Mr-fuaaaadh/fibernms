import { r as reactExports, az as Building2, ab as Server, Z as Zap, j as jsxRuntimeExports, m as motion, t as ChartColumn, ag as TrendingUp, ae as Badge } from "./index-X_EKDj9u.js";
import { G as GlassCard } from "./GlassCard-CANNf_pm.js";
import { B as Button } from "./button-BWMGcdf6.js";
import { m as mockCompanies, R as REVENUE_METRICS } from "./superAdminMockData-SJ6Z2k0y.js";
import { D as DollarSign } from "./dollar-sign-w8O-ws1T.js";
import { T as TrendingDown } from "./trending-down-DpPdOB67.js";
import { R as ResponsiveContainer, T as Tooltip, B as Bar, C as Cell, L as Legend } from "./generateCategoricalChart-Dbg3OBa5.js";
import { B as BarChart } from "./BarChart-bkfT6220.js";
import { C as CartesianGrid } from "./CartesianGrid-BgoIxd_C.js";
import { X as XAxis, Y as YAxis } from "./YAxis-O4q-6Bm5.js";
import { L as LineChart } from "./LineChart-CCY8j5RM.js";
import { L as Line } from "./Line-4fHmBZVJ.js";
import { P as PieChart, a as Pie } from "./PieChart-BQlxOtd-.js";
import "./PolarAngleAxis-CwEcXGyO.js";
const DATE_RANGES = [
  "Last 30 Days",
  "Last 60 Days",
  "Last 90 Days",
  "Last 12 Months"
];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const PLAN_COLORS = {
  BASIC: "#60a5fa",
  PROFESSIONAL: "#a78bfa",
  ENTERPRISE: "#34d399",
  ULTRA: "#f59e0b"
};
const REGION_COLORS = {
  India: "#3b82f6",
  US: "#10b981",
  EU: "#8b5cf6",
  APAC: "#f59e0b",
  MENA: "#ef4444"
};
const TOOLTIP_STYLE = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: 12,
  color: "hsl(var(--foreground))"
};
function fmtK(v) {
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return `${v}`;
}
function fmtCurrency(v) {
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v}`;
}
function buildDeviceGrowthData() {
  const totalDevices = mockCompanies.reduce((s, c) => s + c.devicesUsed, 0);
  return MONTH_LABELS.map((month, i) => {
    const factor = 0.6 + i / 12 * 0.4 + Math.sin(i) * 0.02;
    return {
      month,
      BASIC: Math.round(
        mockCompanies.filter((c) => c.plan === "BASIC").reduce((s, c) => s + c.devicesUsed, 0) * factor
      ),
      PROFESSIONAL: Math.round(
        mockCompanies.filter((c) => c.plan === "PROFESSIONAL").reduce((s, c) => s + c.devicesUsed, 0) * factor
      ),
      ENTERPRISE: Math.round(
        mockCompanies.filter((c) => c.plan === "ENTERPRISE").reduce((s, c) => s + c.devicesUsed, 0) * factor
      ),
      ULTRA: Math.round(
        mockCompanies.filter((c) => c.plan === "ULTRA").reduce((s, c) => s + c.devicesUsed, 0) * factor
      ),
      total: Math.round(totalDevices * factor)
    };
  });
}
function buildAlertStackData() {
  return Array.from({ length: 13 }, (_, i) => {
    const weekLabel = i === 0 ? "W-12" : i === 12 ? "Now" : `W-${12 - i}`;
    const base = 800 + Math.sin(i * 0.5) * 200;
    return {
      week: weekLabel,
      Critical: Math.round(base * 0.15 + Math.random() * 50),
      Warning: Math.round(base * 0.35 + Math.random() * 100),
      Info: Math.round(base * 0.5 + Math.random() * 150)
    };
  });
}
function buildHeatmapData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(
    (day, di) => Array.from({ length: 24 }, (_, hi) => {
      const isWeekday = di < 5;
      const isPeak = hi >= 9 && hi <= 17;
      const isMorning = hi >= 7 && hi <= 8;
      const isEvening = hi >= 18 && hi <= 20;
      let base = 0;
      if (isWeekday && isPeak) base = 800 + Math.sin(di * 3 + hi) * 200;
      else if (isWeekday && (isMorning || isEvening))
        base = 400 + Math.sin(di * 2 + hi) * 100;
      else if (isWeekday) base = 100 + Math.sin(di + hi) * 40;
      else if (isPeak) base = 300 + Math.sin(di * 5 + hi) * 80;
      else base = 50 + Math.sin(di * 4 + hi * 2) * 20;
      return {
        day,
        hour: hi,
        value: Math.max(0, Math.round(base + Math.sin(di * 7 + hi * 3) * 30))
      };
    })
  );
}
function buildRevenueTrendData() {
  const mrr = REVENUE_METRICS.totalMRR;
  return MONTH_LABELS.map((month, i) => ({
    month,
    mrr: Math.round(mrr * (0.65 + i / 12 * 0.35 + Math.sin(i) * 0.02)),
    arr: Math.round(mrr * 12 * (0.65 + i / 12 * 0.35 + Math.sin(i) * 0.02))
  }));
}
function buildRegionalRevenueData() {
  const regions = ["India", "US", "EU", "APAC", "MENA"];
  return regions.map((region) => {
    const cos = mockCompanies.filter((c) => c.region === region);
    return {
      region,
      mrr: cos.reduce((s, c) => s + c.mrr, 0),
      companies: cos.length
    };
  });
}
function buildTopCustomers() {
  return [...mockCompanies].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).slice(0, 10).map((c) => ({
    name: c.name.length > 22 ? `${c.name.slice(0, 22)}…` : c.name,
    revenue: c.monthlyRevenue,
    plan: c.plan
  }));
}
function buildRevenuePieData() {
  return ["ULTRA", "ENTERPRISE", "PROFESSIONAL", "BASIC"].map((plan) => ({
    name: plan.charAt(0) + plan.slice(1).toLowerCase(),
    value: REVENUE_METRICS.revenueByPlan[plan],
    plan,
    color: PLAN_COLORS[plan]
  }));
}
function UsageHeatmap() {
  const data = reactExports.useMemo(() => buildHeatmapData(), []);
  const maxVal = 1200;
  const hourLabels = [0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
    const period = h < 12 ? "AM" : "PM";
    const display = h === 0 ? "12" : h > 12 ? `${h - 12}` : `${h}`;
    return `${display}${period}`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-violet-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "API Call Volume Heatmap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "— by day of week & hour" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[600px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex ml-10 mb-1.5", children: Array.from({ length: 24 }, (_, i) => i).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center",
          style: {
            width: `${100 / 24}%`,
            fontSize: 9,
            color: "hsl(var(--muted-foreground))"
          },
          children: h % 3 === 0 ? hourLabels[Math.floor(h / 3)] : ""
        },
        `hour-${h}`
      )) }),
      data.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-muted-foreground w-9 flex-shrink-0 text-right pr-1.5",
            style: { fontSize: 10 },
            children: row[0].day
          }
        ),
        row.map((cell) => {
          const intensity = Math.min(cell.value / maxVal, 1);
          const r = Math.round(100 + intensity * 55);
          const g = Math.round(30 + intensity * 20);
          const b = Math.round(200 + intensity * 55);
          const alpha = 0.08 + intensity * 0.88;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-sm flex-1 cursor-default transition-transform hover:scale-125 hover:z-10 relative",
              style: {
                height: 16,
                backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`
              },
              title: `${cell.day} ${cell.hour}:00 — ${cell.value.toLocaleString()} API calls`
            },
            `${cell.day}-${cell.hour}`
          );
        })
      ] }, row[0].day)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Low" }),
        [0.05, 0.2, 0.4, 0.65, 0.85].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-5 h-3.5 rounded-sm",
            style: {
              backgroundColor: `rgba(${Math.round(100 + v * 55)}, ${Math.round(30 + v * 20)}, ${Math.round(200 + v * 55)}, ${0.08 + v * 0.88})`
            }
          },
          v
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "High" })
      ] })
    ] }) })
  ] });
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4", children });
}
function GlobalAnalytics() {
  const [dateRange, setDateRange] = reactExports.useState("Last 12 Months");
  const deviceGrowthData = reactExports.useMemo(() => buildDeviceGrowthData(), []);
  const alertStackData = reactExports.useMemo(() => buildAlertStackData(), []);
  const revenueTrendData = reactExports.useMemo(() => buildRevenueTrendData(), []);
  const regionalData = reactExports.useMemo(() => buildRegionalRevenueData(), []);
  const topCustomers = reactExports.useMemo(() => buildTopCustomers(), []);
  const revenuePie = reactExports.useMemo(() => buildRevenuePieData(), []);
  const totalDevices = mockCompanies.reduce((s, c) => s + c.devicesUsed, 0);
  const totalCompanies = mockCompanies.length;
  const kpis = [
    {
      label: "Total Companies",
      value: totalCompanies,
      sub: "+3 this month",
      icon: Building2,
      color: "blue",
      trend: "+5.6%",
      up: true
    },
    {
      label: "Total MRR",
      value: fmtCurrency(REVENUE_METRICS.totalMRR),
      sub: `ARR: ${fmtCurrency(REVENUE_METRICS.totalARR)}`,
      icon: DollarSign,
      color: "emerald",
      trend: "+8.2%",
      up: true
    },
    {
      label: "Total Devices",
      value: fmtK(totalDevices),
      sub: "across all tenants",
      icon: Server,
      color: "violet",
      trend: "+12%",
      up: true
    },
    {
      label: "System Uptime",
      value: "99.97%",
      sub: "30-day rolling avg",
      icon: Zap,
      color: "amber",
      trend: "stable",
      up: true
    }
  ];
  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      ring: "ring-blue-500/20"
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      ring: "ring-emerald-500/20"
    },
    violet: {
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      ring: "ring-violet-500/20"
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      ring: "ring-amber-500/20"
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 md:space-y-8 max-w-[1600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between gap-4 flex-wrap",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Platform Analytics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Global platform metrics, revenue & growth trends" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: DATE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: dateRange === r ? "default" : "outline",
              className: "h-7 text-xs",
              onClick: () => setDateRange(r),
              "data-ocid": `date-range-${r.replace(/\s+/g, "-").toLowerCase()}`,
              children: r
            },
            r
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: kpis.map(({ label, value, sub, icon: Icon, color, trend, up }, i) => {
      const cfg = colorMap[color];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-9 h-9 rounded-xl ring-1 flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.ring}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4.5 h-4.5 ${cfg.text}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-1 text-[10px] font-medium ${up ? "text-emerald-400" : "text-red-400"}`,
                  children: [
                    trend !== "stable" ? up ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }) : null,
                    trend
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-0.5", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: sub })
          ] })
        },
        label
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Top 10 Companies by Monthly Revenue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: topCustomers, layout: "vertical", barSize: 14, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border) / 0.3)",
            horizontal: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            type: "number",
            tickFormatter: (v) => `$${fmtK(v)}`,
            tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            type: "category",
            dataKey: "name",
            tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false,
            width: 160
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: TOOLTIP_STYLE,
            formatter: (v) => [
              `$${Number(v).toLocaleString()}`,
              "Monthly Revenue"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", radius: [0, 4, 4, 0], children: topCustomers.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Cell,
          {
            fill: PLAN_COLORS[entry.plan]
          },
          entry.name
        )) })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: Object.entries(PLAN_COLORS).map(
        ([plan, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-3 h-2.5 rounded-sm",
                  style: { background: color }
                }
              ),
              plan.charAt(0) + plan.slice(1).toLowerCase()
            ]
          },
          plan
        )
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Device Growth Trends — By Plan Tier (12 Months)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: deviceGrowthData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border) / 0.3)",
            vertical: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "month",
            tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            tickFormatter: fmtK,
            tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: TOOLTIP_STYLE,
            formatter: (v, name) => [fmtK(Number(v)), name]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
        [
          "BASIC",
          "PROFESSIONAL",
          "ENTERPRISE",
          "ULTRA"
        ].map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: plan,
            name: plan.charAt(0) + plan.slice(1).toLowerCase(),
            stroke: PLAN_COLORS[plan],
            strokeWidth: 2,
            dot: false,
            activeDot: { r: 4 }
          },
          plan
        ))
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Alert Trends — Last 13 Weeks (Quarterly View)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: alertStackData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border) / 0.3)",
            vertical: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "week",
            tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            tickFormatter: fmtK,
            tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: TOOLTIP_STYLE,
            formatter: (v, name) => [Number(v).toLocaleString(), name]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Critical", stackId: "a", fill: "#ef4444" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Warning", stackId: "a", fill: "#f59e0b" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            dataKey: "Info",
            stackId: "a",
            fill: "#3b82f6",
            radius: [3, 3, 0, 0]
          }
        )
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UsageHeatmap, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Subscription Distribution by Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 180, height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: revenuePie,
                cx: "50%",
                cy: "50%",
                innerRadius: 52,
                outerRadius: 82,
                dataKey: "value",
                paddingAngle: 3,
                children: revenuePie.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: TOOLTIP_STYLE,
                formatter: (v) => [fmtCurrency(Number(v)), "MRR"]
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2.5", children: [
            revenuePie.map((entry) => {
              const total = revenuePie.reduce((s, e) => s + e.value, 0) || 1;
              const pct = (entry.value / total * 100).toFixed(1);
              const count = mockCompanies.filter(
                (c) => c.plan === entry.plan
              ).length;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-2.5 h-2.5 rounded-sm flex-shrink-0",
                          style: { background: entry.color }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: entry.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-[10px]", children: [
                        count,
                        " cos"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: fmtCurrency(entry.value) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-[9px] px-1.5 py-0 border-border font-mono",
                          children: [
                            pct,
                            "%"
                          ]
                        }
                      )
                    ] })
                  ]
                },
                entry.name
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border/40 flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total MRR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: fmtCurrency(REVENUE_METRICS.totalMRR) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Churn Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mb-5", children: [
          {
            label: "Active",
            value: REVENUE_METRICS.activeSubscriptions,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
          },
          {
            label: "Trial",
            value: REVENUE_METRICS.trialSubscriptions,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
          },
          {
            label: "Suspended",
            value: REVENUE_METRICS.suspendedSubscriptions,
            color: "text-orange-400",
            bg: "bg-orange-500/10"
          },
          {
            label: "Expired",
            value: REVENUE_METRICS.expiredSubscriptions,
            color: "text-red-400",
            bg: "bg-red-500/10"
          }
        ].map(({ label, value, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg p-2 text-center ${bg}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-display font-bold ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground mt-0.5", children: label })
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Current Churn Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground", children: [
              REVENUE_METRICS.churnRate,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-emerald-400 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Below 3.5% benchmark" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          LineChart,
          {
            data: MONTH_LABELS.map((month, i) => ({
              month,
              churn: +(2.8 + Math.sin(i * 0.8) * 0.8 + i * 0.05).toFixed(
                2
              ),
              benchmark: 3.5
            })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "hsl(var(--border) / 0.3)",
                  vertical: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "month",
                  tick: { fontSize: 9, fill: "hsl(var(--muted-foreground))" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: [0, 5],
                  tick: { fontSize: 9, fill: "hsl(var(--muted-foreground))" },
                  axisLine: false,
                  tickLine: false,
                  tickFormatter: (v) => `${v}%`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: TOOLTIP_STYLE,
                  formatter: (v) => [`${v}%`, ""]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "churn",
                  stroke: "#ef4444",
                  strokeWidth: 2,
                  dot: false,
                  name: "Churn Rate"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "benchmark",
                  stroke: "hsl(var(--border))",
                  strokeWidth: 1.5,
                  strokeDasharray: "4 4",
                  dot: false,
                  name: "Benchmark"
                }
              )
            ]
          }
        ) }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Revenue by Region" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: regionalData, barSize: 40, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "hsl(var(--border) / 0.3)",
              vertical: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "region",
              tick: {
                fontSize: 12,
                fill: "hsl(var(--muted-foreground))"
              },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tickFormatter: (v) => `$${fmtK(v)}`,
              tick: {
                fontSize: 11,
                fill: "hsl(var(--muted-foreground))"
              },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: TOOLTIP_STYLE,
              formatter: (v) => [fmtCurrency(Number(v)), "MRR"]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "mrr", name: "MRR", radius: [4, 4, 0, 0], children: regionalData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: REGION_COLORS[entry.region] ?? "#8b5cf6"
            },
            entry.region
          )) })
        ] }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: regionalData.sort((a, b) => b.mrr - a.mrr).map((row) => {
          const totalMrr = regionalData.reduce((s, r) => s + r.mrr, 0) || 1;
          const pct = (row.mrr / totalMrr * 100).toFixed(1);
          const color = REGION_COLORS[row.region] ?? "#8b5cf6";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-2 h-2 rounded-full flex-shrink-0",
                style: { background: color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground w-12", children: row.region }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all",
                style: { width: `${pct}%`, background: color }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground w-16 text-right", children: fmtCurrency(row.mrr) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono w-10 text-right", children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground w-16 text-right", children: [
              row.companies,
              " cos"
            ] })
          ] }, row.region);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "MRR & ARR Trend — 12 Month View" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: revenueTrendData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "3 3",
            stroke: "hsl(var(--border) / 0.3)",
            vertical: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "month",
            tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            tickFormatter: (v) => `$${fmtK(v)}`,
            tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: TOOLTIP_STYLE,
            formatter: (v, name) => [
              fmtCurrency(Number(v)),
              name === "mrr" ? "MRR" : "ARR"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Legend,
          {
            wrapperStyle: { fontSize: 11 },
            formatter: (v) => v === "mrr" ? "MRR" : "ARR"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "mrr",
            stroke: "#10b981",
            strokeWidth: 2.5,
            dot: false,
            activeDot: { r: 5 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "arr",
            stroke: "#8b5cf6",
            strokeWidth: 2,
            strokeDasharray: "6 3",
            dot: false,
            activeDot: { r: 4 }
          }
        )
      ] }) }) }) })
    ] })
  ] });
}
export {
  GlobalAnalytics as default
};
