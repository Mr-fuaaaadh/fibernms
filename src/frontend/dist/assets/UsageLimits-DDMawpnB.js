import { ae as useRouter, r as reactExports, j as jsxRuntimeExports, ah as TrendingUp, T as TriangleAlert, ac as Server, Z as Zap, aq as Search, af as Badge, aD as Database, B as Bell } from "./index-BuH20gNs.js";
import { G as GlassCard } from "./GlassCard-ArFOmrcF.js";
import { B as Button } from "./button-CVW8T4d4.js";
import { I as Input } from "./input-Du4HeuXq.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-YG2XtTvM.js";
import { j as mockUsageMetrics, m as mockCompanies } from "./superAdminMockData-SJ6Z2k0y.js";
import { A as ArrowUpDown } from "./arrow-up-down-_M5PszSt.js";
import "./index-IXOTxK3N.js";
import "./index-BaDfGKHn.js";
import "./index-DVyIkmw6.js";
import "./check-pSdlcahC.js";
import "./chevron-up-D3ytfDGQ.js";
function pct(used, limit) {
  return Math.min(Math.round(used / Math.max(limit, 1) * 100), 100);
}
function fmtNum(n, compact = false) {
  if (compact && n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (compact && n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
}
function maxPct(m) {
  return Math.max(
    pct(m.devices.used, m.devices.limit),
    pct(m.api.used, m.api.limit),
    pct(m.data.used, m.data.limit),
    pct(m.alerts.used, m.alerts.limit)
  );
}
const REGION_FLAGS = {
  India: "🇮🇳",
  US: "🇺🇸",
  EU: "🇪🇺",
  APAC: "🌏",
  MENA: "🌍"
};
const PLAN_COLORS = {
  BASIC: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
function MiniBar({
  label,
  used,
  limit,
  icon: Icon,
  unit = ""
}) {
  const p = pct(used, limit);
  const barColor = p >= 90 ? "capacity-fill-critical" : p >= 70 ? "capacity-fill-warning" : "capacity-fill-healthy";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
        label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `font-mono font-semibold ${p >= 90 ? "text-red-400" : p >= 70 ? "text-amber-400" : "text-muted-foreground"}`,
          children: [
            p,
            "%"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full ${barColor}`,
        style: { width: `${p}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-mono text-muted-foreground", children: [
      fmtNum(used, true),
      unit,
      " / ",
      fmtNum(limit, true),
      unit
    ] })
  ] });
}
function UsageCard({
  metric,
  region,
  onClick
}) {
  const highest = maxPct(metric);
  const isWarning = highest >= 70 && highest < 90;
  const isCritical = highest >= 90;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "p-4 space-y-3 hover:shadow-noc-elevated transition-smooth cursor-pointer group",
      onClick,
      "data-ocid": `usage-card-${metric.companyId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors", children: metric.companyName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground", children: [
                REGION_FLAGS[region],
                " ",
                region
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[9px] border px-1.5 ${PLAN_COLORS[metric.plan]}`,
                  children: metric.plan
                }
              )
            ] })
          ] }),
          isCritical && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[9px] bg-red-500/15 text-red-400 border border-red-500/30 shrink-0 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-2.5 h-2.5" }),
            "Exceeded"
          ] }),
          isWarning && !isCritical && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-2.5 h-2.5" }),
            "Near Limit"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniBar,
            {
              label: "Devices",
              used: metric.devices.used,
              limit: metric.devices.limit,
              icon: Server
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniBar,
            {
              label: "API Calls",
              used: metric.api.used,
              limit: metric.api.limit,
              icon: Zap
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniBar,
            {
              label: "Data",
              used: metric.data.used,
              limit: metric.data.limit,
              unit: " GB",
              icon: Database
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MiniBar,
            {
              label: "Alerts",
              used: metric.alerts.used,
              limit: metric.alerts.limit,
              icon: Bell
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 border-t border-border/20 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: "Peak usage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-xs font-mono font-bold ${isCritical ? "text-red-400" : isWarning ? "text-amber-400" : "text-emerald-400"}`,
              children: [
                highest,
                "%"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function UsageLimits() {
  const router = useRouter();
  const nav = (path) => router.navigate({ to: path });
  const [search, setSearch] = reactExports.useState("");
  const [regionFilter, setRegionFilter] = reactExports.useState("all");
  const [planFilter, setPlanFilter] = reactExports.useState("all");
  const [threshold, setThreshold] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("highest");
  const enriched = reactExports.useMemo(() => {
    return mockUsageMetrics.map((m) => {
      const company = mockCompanies.find((c) => c.id === m.companyId);
      return { ...m, region: (company == null ? void 0 : company.region) ?? "Unknown" };
    });
  }, []);
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return enriched.filter((m) => {
      if (q && !m.companyName.toLowerCase().includes(q)) return false;
      if (regionFilter !== "all" && m.region !== regionFilter) return false;
      if (planFilter !== "all" && m.plan !== planFilter) return false;
      const highest = maxPct(m);
      if (threshold === "warning" && (highest < 70 || highest >= 90))
        return false;
      if (threshold === "critical" && highest < 90) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "highest") return maxPct(b) - maxPct(a);
      if (sortBy === "name")
        return a.companyName.localeCompare(b.companyName);
      const planOrder = {
        BASIC: 0,
        PROFESSIONAL: 1,
        ENTERPRISE: 2,
        ULTRA: 3
      };
      return (planOrder[b.plan] ?? 0) - (planOrder[a.plan] ?? 0);
    });
  }, [enriched, search, regionFilter, planFilter, threshold, sortBy]);
  const summary = reactExports.useMemo(() => {
    const all = enriched.map((m) => maxPct(m));
    return {
      nearLimit: all.filter((p) => p >= 70 && p < 90).length,
      exceeded: all.filter((p) => p >= 90).length,
      totalDevices: enriched.reduce((s, m) => s + m.devices.used, 0),
      avgApiPct: Math.round(
        enriched.reduce((s, m) => s + pct(m.api.used, m.api.limit), 0) / Math.max(enriched.length, 1)
      )
    };
  }, [enriched]);
  const REGIONS = ["all", "India", "US", "EU", "APAC", "MENA"];
  const PLANS = [
    "all",
    "BASIC",
    "PROFESSIONAL",
    "ENTERPRISE",
    "ULTRA"
  ];
  const THRESHOLDS = [
    { val: "all", label: "All Levels" },
    { val: "warning", label: "Near Limit (70–90%)" },
    { val: "critical", label: "Exceeded (>90%)" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-4 md:space-y-5 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-amber-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Usage & Limit Tracking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Monitor resource consumption across all tenants" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      {
        label: "Near Limit",
        val: summary.nearLimit,
        sub: "70–90% usage",
        icon: TriangleAlert,
        cls: "text-amber-400",
        bg: "bg-amber-500/15"
      },
      {
        label: "Exceeded",
        val: summary.exceeded,
        sub: ">90% usage",
        icon: TriangleAlert,
        cls: "text-red-400",
        bg: "bg-red-500/15"
      },
      {
        label: "Total Devices",
        val: fmtNum(summary.totalDevices, true),
        sub: "across all tenants",
        icon: Server,
        cls: "text-blue-400",
        bg: "bg-blue-500/15"
      },
      {
        label: "Avg API Usage",
        val: `${summary.avgApiPct}%`,
        sub: "platform average",
        icon: Zap,
        cls: "text-primary",
        bg: "bg-primary/15"
      }
    ].map(({ label, val, sub, icon: Icon, cls, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-9 h-9 rounded-lg flex items-center justify-center ${bg}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${cls}` })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-display font-bold ${cls}`, children: val }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground leading-snug", children: [
          label,
          " · ",
          sub
        ] })
      ] })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search companies…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 h-8 text-xs bg-background/50",
            "data-ocid": "input-usage-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: regionFilter, onValueChange: setRegionFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-8 text-xs w-36 bg-background/50",
            "data-ocid": "filter-usage-region",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Regions" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Regions" }),
          REGIONS.filter((r) => r !== "all").map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r, children: [
            REGION_FLAGS[r],
            " ",
            r
          ] }, r))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: planFilter, onValueChange: setPlanFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-8 text-xs w-36 bg-background/50",
            "data-ocid": "filter-usage-plan",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Plans" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p === "all" ? "All Plans" : p }, p)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: threshold,
          onValueChange: (v) => setThreshold(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-44 bg-background/50",
                "data-ocid": "filter-usage-threshold",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Levels" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: THRESHOLDS.map(({ val, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: label }, val)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-8 text-xs gap-1.5 ml-auto",
          onClick: () => setSortBy(
            (prev) => prev === "highest" ? "name" : prev === "name" ? "plan" : "highest"
          ),
          "data-ocid": "btn-usage-sort",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3.5 h-3.5" }),
            "Sort:",
            " ",
            sortBy === "highest" ? "Highest Usage" : sortBy === "name" ? "Name" : "Plan"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono whitespace-nowrap", children: [
        filtered.length,
        " of ",
        enriched.length
      ] })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlassCard,
      {
        className: "p-12 flex flex-col items-center gap-3 text-center",
        "data-ocid": "usage-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-muted-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No companies match your filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "text-xs",
              onClick: () => {
                setSearch("");
                setRegionFilter("all");
                setPlanFilter("all");
                setThreshold("all");
              },
              children: "Clear filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: filtered.map((metric) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      UsageCard,
      {
        metric,
        region: metric.region,
        onClick: () => nav(`/super-admin/companies/${metric.companyId}`)
      },
      metric.companyId
    )) })
  ] });
}
export {
  UsageLimits as default
};
