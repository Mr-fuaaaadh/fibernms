import { u as useNetworkStore, r as reactExports, j as jsxRuntimeExports, m as motion, aq as Search, F as FileText, h as Clock, an as User, af as Badge, aj as Shield } from "./index-WMTkA9vU.js";
import { G as GlassCard } from "./GlassCard-C9SzWUJB.js";
import { B as Button } from "./button-Dag5mFLZ.js";
import { I as Input } from "./input-DnM8vr7C.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-CRKUP0FF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-JYQPMMWP.js";
import { R as RefreshCw } from "./refresh-cw-DyIJ60lF.js";
import { D as Download } from "./download-BS2eeNqh.js";
import { F as Funnel } from "./funnel-SB5hNdUR.js";
import { C as CircleCheck } from "./circle-check-mz2eb2S1.js";
import { C as CircleX } from "./circle-x-DGCWIOzj.js";
import { R as ResponsiveContainer, C as Cell, T as Tooltip } from "./generateCategoricalChart-C5i7De_H.js";
import { P as PieChart, a as Pie } from "./PieChart-DIaTX-_4.js";
import "./index-IXOTxK3N.js";
import "./index-CJt-S02L.js";
import "./index-DfX1YDeV.js";
import "./check-CdzZhum6.js";
import "./chevron-up-85Kc7JlN.js";
import "./PolarAngleAxis-Dc7ywHK-.js";
const ACTION_TYPE_LABELS = {
  "device-change": "Device Change",
  "user-action": "User Action",
  "workflow-execution": "Workflow",
  system: "System"
};
const ACTION_TYPE_COLORS = {
  "device-change": "#22d3ee",
  "user-action": "#fb923c",
  "workflow-execution": "#a78bfa",
  system: "#6b7280"
};
const ACTION_TYPE_BORDER = {
  "device-change": "border-l-cyan-400",
  "user-action": "border-l-orange-400",
  "workflow-execution": "border-l-violet-400",
  system: "border-l-zinc-500"
};
const ACTION_TYPE_BG = {
  "device-change": "bg-cyan-500/10 text-cyan-300",
  "user-action": "bg-orange-500/10 text-orange-300",
  "workflow-execution": "bg-violet-500/10 text-violet-300",
  system: "bg-zinc-500/10 text-zinc-400"
};
const ACTION_TYPE_DOT = {
  "device-change": "bg-cyan-400",
  "user-action": "bg-orange-400",
  "workflow-execution": "bg-violet-400",
  system: "bg-zinc-500"
};
const DATE_RANGES = ["Last hour", "Last 24h", "Last 7 days", "Last 30 days"];
function relativeTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return `${Math.floor(diff / 1e3)}s ago`;
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function absoluteTime(ts) {
  return new Date(ts).toLocaleString(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function userInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function dateRangeMs(range) {
  switch (range) {
    case "Last hour":
      return 36e5;
    case "Last 24h":
      return 864e5;
    case "Last 7 days":
      return 7 * 864e5;
    default:
      return 30 * 864e5;
  }
}
function exportCSV(logs) {
  const headers = [
    "Timestamp",
    "User",
    "Action",
    "Type",
    "Target",
    "Status",
    "Details"
  ];
  const rows = logs.map((l) => [
    absoluteTime(l.timestamp),
    l.userName,
    l.action,
    ACTION_TYPE_LABELS[l.actionType],
    l.targetName,
    l.status,
    l.details
  ]);
  const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-logs-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function AuditEntry({ log, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.25, delay: Math.min(index * 0.03, 0.5) },
      className: `flex gap-3 p-3 rounded-lg bg-card/60 border border-border/30 border-l-2 ${ACTION_TYPE_BORDER[log.actionType]} hover:bg-card/80 transition-colors`,
      "data-ocid": `audit-entry-${log.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center", children: log.actionType === "system" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-muted-foreground", children: userInitials(log.userName) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] px-1.5 py-0.5 rounded font-medium ${ACTION_TYPE_BG[log.actionType]}`,
                children: ACTION_TYPE_LABELS[log.actionType]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground/90 truncate", children: log.action }),
            log.status === "failure" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-medium ml-auto", children: "FAILED" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: log.userName }),
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80", children: log.targetName }),
            " · ",
            log.details
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground whitespace-nowrap", children: relativeTime(log.timestamp) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground/60 whitespace-nowrap mt-0.5", children: absoluteTime(log.timestamp) })
        ] })
      ]
    }
  );
}
function MobileTimelineItem({ log, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.2, delay: Math.min(index * 0.02, 0.4) },
      className: "relative pl-8",
      "data-ocid": `audit-mobile-${log.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-0 bottom-0 w-px bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute left-[9px] top-4 w-2.5 h-2.5 rounded-full border-2 border-card z-10 ${ACTION_TYPE_DOT[log.actionType]}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-lg border border-border/30 bg-card/60 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] px-1.5 py-0.5 rounded font-medium ${ACTION_TYPE_BG[log.actionType]}`,
                children: ACTION_TYPE_LABELS[log.actionType]
              }
            ),
            log.status === "failure" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] bg-red-500/15 text-red-400 border border-red-500/30 border-transparent", children: "FAILED" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground/90 leading-snug", children: log.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: log.userName }),
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80", children: log.targetName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70 mt-0.5 line-clamp-2", children: log.details }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground/60 mt-1.5 font-mono", children: [
            relativeTime(log.timestamp),
            " · ",
            absoluteTime(log.timestamp)
          ] })
        ] })
      ]
    }
  );
}
const PAGE_SIZE = 50;
function AuditLogs() {
  const auditLogs = useNetworkStore((s) => s.auditLogs);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [actionTypeFilter, setActionTypeFilter] = reactExports.useState("all");
  const [dateRange, setDateRange] = reactExports.useState("Last 30 days");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(0);
  const [refreshKey, setRefreshKey] = reactExports.useState(0);
  const [filterOpen, setFilterOpen] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    const cutoff = Date.now() - dateRangeMs(dateRange);
    return auditLogs.filter((l) => {
      if (l.timestamp < cutoff) return false;
      if (actionTypeFilter !== "all" && l.actionType !== actionTypeFilter)
        return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return l.userName.toLowerCase().includes(q) || l.targetName.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.details.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [
    auditLogs,
    actionTypeFilter,
    dateRange,
    statusFilter,
    searchQuery,
    refreshKey
  ]);
  const paginated = reactExports.useMemo(
    () => filtered.slice(0, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );
  const hasMore = paginated.length < filtered.length;
  const today = reactExports.useMemo(() => {
    const cutoff = Date.now() - 864e5;
    return filtered.filter((l) => l.timestamp > cutoff).length;
  }, [filtered]);
  const successRate = reactExports.useMemo(() => {
    if (!filtered.length) return 100;
    const success = filtered.filter(
      (l) => l.status === "success"
    ).length;
    return Math.round(success / filtered.length * 100);
  }, [filtered]);
  const typeCounts = reactExports.useMemo(() => {
    const counts = {
      "device-change": 0,
      "user-action": 0,
      "workflow-execution": 0,
      system: 0
    };
    for (const l of filtered) {
      counts[l.actionType] = (counts[l.actionType] ?? 0) + 1;
    }
    return Object.entries(counts).map(([type, value]) => ({
      name: ACTION_TYPE_LABELS[type],
      value,
      color: ACTION_TYPE_COLORS[type]
    }));
  }, [filtered]);
  const topUsers = reactExports.useMemo(() => {
    const counts = {};
    for (const l of filtered) {
      counts[l.userName] = (counts[l.userName] ?? 0) + 1;
    }
    return Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 5);
  }, [filtered]);
  const failureCount = reactExports.useMemo(
    () => filtered.filter((l) => l.status === "failure").length,
    [filtered]
  );
  const handleRefresh = reactExports.useCallback(() => {
    setRefreshKey((k) => k + 1);
    setPage(0);
  }, []);
  const activeFilterCount = [
    searchQuery,
    actionTypeFilter !== "all" ? actionTypeFilter : "",
    dateRange !== "Last 30 days" ? dateRange : "",
    statusFilter !== "all" ? statusFilter : ""
  ].filter(Boolean).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 overflow-y-auto bg-background p-4 md:p-6 space-y-5",
      "data-ocid": "audit-logs-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35 },
            className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-wide", children: "Audit Logs & Compliance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Track device changes, user actions, and workflow executions" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleRefresh,
                    className: "border-border/60 text-muted-foreground hover:text-foreground gap-1.5 min-h-[44px]",
                    "data-ocid": "refresh-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                      "Refresh"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => exportCSV(filtered),
                    className: "border-primary/40 text-primary hover:bg-primary/10 gap-1.5 min-h-[44px]",
                    "data-ocid": "export-csv-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      "Export CSV"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            className: "md:hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search user, device, action…",
                    value: searchQuery,
                    onChange: (e) => {
                      setSearchQuery(e.target.value);
                      setPage(0);
                    },
                    className: "pl-8 bg-muted/30 border-border/50 text-sm h-11",
                    "data-ocid": "audit-search-mobile"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: filterOpen, onOpenChange: setFilterOpen, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "gap-1.5 h-11 px-3 relative",
                    "data-ocid": "audit-filter-btn-mobile",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
                      "Filters",
                      activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold", children: activeFilterCount })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  PopoverContent,
                  {
                    className: "w-72 p-4 space-y-4",
                    "data-ocid": "audit-filter-popover",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Filters" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Action Type" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Select,
                            {
                              value: actionTypeFilter,
                              onValueChange: (v) => {
                                setActionTypeFilter(v);
                                setPage(0);
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectTrigger,
                                  {
                                    className: "h-9 text-xs",
                                    "data-ocid": "type-filter-mobile",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Action Type" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "device-change", children: "Device Change" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "user-action", children: "User Action" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "workflow-execution", children: "Workflow" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "system", children: "System" })
                                ] })
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Date Range" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Select,
                            {
                              value: dateRange,
                              onValueChange: (v) => {
                                setDateRange(v);
                                setPage(0);
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectTrigger,
                                  {
                                    className: "h-9 text-xs",
                                    "data-ocid": "date-range-filter-mobile",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Date Range" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DATE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Status" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Select,
                            {
                              value: statusFilter,
                              onValueChange: (v) => {
                                setStatusFilter(v);
                                setPage(0);
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectTrigger,
                                  {
                                    className: "h-9 text-xs",
                                    "data-ocid": "status-filter-mobile",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "success", children: "Success" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "failure", children: "Failure" })
                                ] })
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            variant: "ghost",
                            className: "w-full text-xs text-muted-foreground",
                            onClick: () => {
                              setSearchQuery("");
                              setActionTypeFilter("all");
                              setStatusFilter("all");
                              setDateRange("Last 30 days");
                              setPage(0);
                              setFilterOpen(false);
                            },
                            children: "Clear All Filters"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: 0.1 },
            className: "hidden md:block",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search user, device, action…",
                    value: searchQuery,
                    onChange: (e) => {
                      setSearchQuery(e.target.value);
                      setPage(0);
                    },
                    className: "pl-8 bg-muted/30 border-border/50 text-sm h-8",
                    "data-ocid": "audit-search"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: actionTypeFilter,
                  onValueChange: (v) => {
                    setActionTypeFilter(v);
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-40 bg-muted/30 border-border/50 text-sm h-8",
                        "data-ocid": "type-filter",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Action Type" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "device-change", children: "Device Change" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "user-action", children: "User Action" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "workflow-execution", children: "Workflow" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "system", children: "System" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: dateRange,
                  onValueChange: (v) => {
                    setDateRange(v);
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-36 bg-muted/30 border-border/50 text-sm h-8",
                        "data-ocid": "date-range-filter",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Date Range" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DATE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: statusFilter,
                  onValueChange: (v) => {
                    setStatusFilter(v);
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "w-32 bg-muted/30 border-border/50 text-sm h-8",
                        "data-ocid": "status-filter",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "success", children: "Success" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "failure", children: "Failure" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto whitespace-nowrap", children: [
                filtered.length,
                " entries"
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto pb-1 md:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display", children: today }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Today" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-emerald-400 font-display", children: [
              successRate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Success" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-red-400 font-display", children: failureCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Failures" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display", children: filtered.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Total" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "md:hidden",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.3, delay: 0.15 },
            children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-16 text-center",
                "data-ocid": "audit-empty-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No audit logs match your filters" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "mt-2 text-xs text-primary",
                      onClick: () => {
                        setSearchQuery("");
                        setActionTypeFilter("all");
                        setStatusFilter("all");
                        setDateRange("Last 30 days");
                        setPage(0);
                      },
                      "data-ocid": "clear-filters-btn-mobile",
                      children: "Clear filters"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "audit-timeline-mobile", children: [
              paginated.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTimelineItem, { log, index: i }, log.id)),
              hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setPage((p) => p + 1),
                  className: "text-xs text-primary hover:bg-primary/10 min-h-[44px]",
                  "data-ocid": "load-more-btn-mobile",
                  children: [
                    "Load more (",
                    filtered.length - paginated.length,
                    " remaining)"
                  ]
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-1 xl:grid-cols-4 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4, delay: 0.15 },
              className: "xl:col-span-3",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wider flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
                    "Event Timeline"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: Object.entries(ACTION_TYPE_COLORS).map(([type, color]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1 text-[10px] text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2 h-2 rounded-full",
                            style: { background: color }
                          }
                        ),
                        ACTION_TYPE_LABELS[type]
                      ]
                    },
                    type
                  )) })
                ] }),
                filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center justify-center py-16 text-center",
                    "data-ocid": "audit-empty-state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No audit logs match your filters" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "mt-2 text-xs text-primary",
                          onClick: () => {
                            setSearchQuery("");
                            setActionTypeFilter("all");
                            setStatusFilter("all");
                            setDateRange("Last 30 days");
                            setPage(0);
                          },
                          "data-ocid": "clear-filters-btn",
                          children: "Clear filters"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-1.5 max-h-[560px] overflow-y-auto pr-1",
                    "data-ocid": "audit-timeline",
                    children: [
                      paginated.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AuditEntry, { log, index: i }, log.id)),
                      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: () => setPage((p) => p + 1),
                          className: "text-xs text-primary hover:bg-primary/10",
                          "data-ocid": "load-more-btn",
                          children: [
                            "Load more (",
                            filtered.length - paginated.length,
                            " remaining)"
                          ]
                        }
                      ) })
                    ]
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4, delay: 0.2 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Summary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        " Today's Events"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-foreground", children: today })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-green-400" }),
                        " Success Rate"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-semibold text-green-400", children: [
                        successRate,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 text-red-400" }),
                        " Failures"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-red-400", children: failureCount })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/40 rounded-full overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full bg-green-500/70 transition-all",
                        style: { width: `${successRate}%` }
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Events by Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Pie,
                      {
                        data: typeCounts,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 38,
                        outerRadius: 58,
                        paddingAngle: 3,
                        dataKey: "value",
                        children: typeCounts.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        formatter: (v, name) => [v, name],
                        contentStyle: {
                          background: "rgba(20,22,30,0.95)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8,
                          fontSize: 11
                        }
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mt-1", children: typeCounts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[10px] text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-2 h-2 rounded-full",
                          style: { background: t.color }
                        }
                      ),
                      t.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground/70", children: t.value })
                  ] }, t.name)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
                    " Top Users"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topUsers.map(([name, count], i) => {
                    var _a;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2",
                        "data-ocid": `top-user-${i}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-bold text-primary", children: userInitials(name) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-foreground/80 truncate", children: name }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground ml-1", children: count })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "h-full rounded-full bg-primary/60",
                                style: {
                                  width: `${count / (((_a = topUsers[0]) == null ? void 0 : _a[1]) ?? 1) * 100}%`
                                }
                              }
                            ) })
                          ] })
                        ]
                      },
                      name
                    );
                  }) })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  AuditLogs as default
};
