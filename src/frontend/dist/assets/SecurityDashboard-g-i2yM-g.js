import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, ai as Shield, p as Activity, b3 as ShieldAlert, aI as ShieldCheck, ae as Badge, X, ap as Search, aZ as ChevronLeft, n as ChevronRight } from "./index-X_EKDj9u.js";
import { G as GlassCard } from "./GlassCard-CANNf_pm.js";
import { B as Button } from "./button-BWMGcdf6.js";
import { I as Input } from "./input-jUSTCimG.js";
import { o as mockIPTracking, p as mockSuspiciousActivity, q as mockUsers, r as mockSecurityEvents, s as mockMFAStatus, t as mockLoginAttempts } from "./superAdminMockData-SJ6Z2k0y.js";
import { R as RefreshCw } from "./refresh-cw-BxlXyXiN.js";
import { S as ShieldOff, K as KeyRound } from "./shield-off-Bs_DTklE.js";
import { G as Globe } from "./globe-DpexI42G.js";
import { R as ResponsiveContainer, T as Tooltip, L as Legend } from "./generateCategoricalChart-Dbg3OBa5.js";
import { L as LineChart } from "./LineChart-CCY8j5RM.js";
import { C as CartesianGrid } from "./CartesianGrid-BgoIxd_C.js";
import { X as XAxis, Y as YAxis } from "./YAxis-O4q-6Bm5.js";
import { L as Line } from "./Line-4fHmBZVJ.js";
import { C as Check } from "./check-v0Xde9xE.js";
import { F as Funnel } from "./funnel-CJnqAa0d.js";
import { C as CircleCheck } from "./circle-check-C2U3Fopg.js";
import { C as CircleX } from "./circle-x-ClTqjswb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode);
function fmtRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
const SEV_COLORS = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30"
};
const TOOLTIP_STYLE = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "6px",
  fontSize: 11,
  color: "hsl(var(--foreground))"
};
function buildLoginChartData() {
  const days = {};
  for (let d = 29; d >= 0; d--) {
    const dt = new Date(Date.now() - d * 864e5);
    const key = dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    days[key] = { date: key, success: 0, failed: 0 };
  }
  for (const attempt of mockLoginAttempts) {
    const key = new Date(attempt.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    if (!days[key]) continue;
    if (attempt.success) {
      days[key].success += attempt.count;
    } else {
      days[key].failed += attempt.count;
    }
  }
  return Object.values(days);
}
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color
}) {
  const cfg = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      ring: "ring-blue-500/20"
    },
    red: { bg: "bg-red-500/10", text: "text-red-400", ring: "ring-red-500/20" },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      ring: "ring-orange-500/20"
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
    }
  }[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ${cfg.bg} ${cfg.ring}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${cfg.text}` })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-display font-bold mt-0.5 ${cfg.text}`, children: value }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: sub })
    ] })
  ] });
}
function SuspiciousPanel({
  items,
  blockedIps,
  dismissedIds,
  onBlock,
  onDismiss
}) {
  const visible = items.filter((i) => !dismissedIds.has(i.id));
  if (visible.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-12 gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-emerald-400 opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No suspicious activity detected" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/20", children: visible.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "p-4 hover:bg-muted/10 transition-colors",
      "data-ocid": `suspicious-item-${item.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[11px] bg-muted/30 px-1.5 py-0.5 rounded font-mono text-foreground", children: item.ipAddress }),
            item.userEmail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground truncate max-w-[200px]", children: item.userEmail }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[9px] border capitalize ${SEV_COLORS[item.severity]}`,
                children: item.severity
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 mb-1", children: item.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            "Detected ",
            fmtRelative(item.detectedAt),
            " · ",
            item.actionsCount,
            " ",
            "actions"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: `h-7 px-2.5 text-[10px] gap-1.5 ${blockedIps.has(item.ipAddress) ? "text-red-400 bg-red-500/10" : "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"}`,
              onClick: () => onBlock(item.ipAddress),
              "data-ocid": `btn-block-${item.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3 h-3" }),
                blockedIps.has(item.ipAddress) ? "Blocked" : "Block IP"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 px-2.5 text-[10px] gap-1.5 text-muted-foreground hover:text-foreground",
              onClick: () => onDismiss(item.id),
              "data-ocid": `btn-dismiss-${item.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                "Dismiss"
              ]
            }
          )
        ] })
      ] })
    },
    item.id
  )) });
}
const IP_PAGE_SIZE = 20;
function IPTrackingTable({
  entries,
  blockedIps,
  onToggleBlock
}) {
  const [search, setSearch] = reactExports.useState("");
  const [filterBlocked, setFilterBlocked] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(0);
  const filtered = reactExports.useMemo(() => {
    let result = entries;
    if (filterBlocked === "blocked")
      result = result.filter((e) => e.isBlocked || blockedIps.has(e.ipAddress));
    if (filterBlocked === "active")
      result = result.filter(
        (e) => !e.isBlocked && !blockedIps.has(e.ipAddress)
      );
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) => {
          var _a, _b;
          return e.ipAddress.includes(q) || ((_a = e.userEmail) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_b = e.companyName) == null ? void 0 : _b.toLowerCase().includes(q));
        }
      );
    }
    return result;
  }, [entries, search, filterBlocked, blockedIps]);
  const totalPages = Math.ceil(filtered.length / IP_PAGE_SIZE);
  const page_items = filtered.slice(
    page * IP_PAGE_SIZE,
    (page + 1) * IP_PAGE_SIZE
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b border-border/30 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search IP, email, company...",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(0);
            },
            className: "pl-8 h-8 text-xs bg-background/50 w-52",
            "data-ocid": "input-ip-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-muted-foreground" }),
        ["all", "blocked", "active"].map((val) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setFilterBlocked(val);
              setPage(0);
            },
            className: `px-2.5 py-1 text-[10px] font-medium rounded-md capitalize transition-colors ${filterBlocked === val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`,
            "data-ocid": `filter-ip-${val}`,
            children: val
          },
          val
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-muted-foreground", children: [
        filtered.length,
        " entries"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "IP Address",
        "User Email",
        "Company",
        "Successful",
        "Failed",
        "Last Seen",
        "Location",
        "Status",
        ""
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-2.5 px-3 font-medium text-[10px] uppercase tracking-wide text-muted-foreground whitespace-nowrap",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: page_items.map((entry) => {
        const isBlocked = entry.isBlocked || blockedIps.has(entry.ipAddress);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border/15 transition-colors ${isBlocked ? "bg-red-500/5 hover:bg-red-500/10" : "hover:bg-muted/10"}`,
            "data-ocid": `ip-row-${entry.ipAddress.replace(/\./g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-[10px] text-foreground", children: entry.ipAddress }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground truncate max-w-[140px]", children: entry.userEmail ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground truncate max-w-[120px]", children: entry.companyName ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[11px] font-mono text-emerald-400 text-right", children: entry.successCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[11px] font-mono text-red-400 text-right", children: entry.failedAttempts }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground whitespace-nowrap", children: fmtRelative(entry.lastSeen) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground whitespace-nowrap", children: entry.geoLocation }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[9px] border capitalize ${isBlocked ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"}`,
                  children: isBlocked ? "Blocked" : "Active"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: `h-6 px-2 text-[10px] gap-1 whitespace-nowrap ${isBlocked ? "text-emerald-400 hover:bg-emerald-500/10" : "text-red-400 hover:bg-red-500/10"}`,
                  onClick: () => onToggleBlock(entry.ipAddress),
                  "data-ocid": `toggle-ip-${entry.ipAddress.replace(/\./g, "-")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3 h-3" }),
                    isBlocked ? "Unblock" : "Block"
                  ]
                }
              ) })
            ]
          },
          entry.ipAddress
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border/20", children: page_items.map((entry) => {
      const isBlocked = entry.isBlocked || blockedIps.has(entry.ipAddress);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `p-3 ${isBlocked ? "bg-red-500/5" : ""}`,
          "data-ocid": `ip-card-${entry.ipAddress.replace(/\./g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-foreground", children: entry.ipAddress }),
                entry.geoLocation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: entry.geoLocation })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[9px] border capitalize shrink-0 ${isBlocked ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"}`,
                  children: isBlocked ? "Blocked" : "Active"
                }
              )
            ] }),
            entry.userEmail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate mb-1", children: entry.userEmail }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-mono", children: [
                  "✓ ",
                  entry.successCount
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-mono", children: [
                  "✗ ",
                  entry.failedAttempts
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: fmtRelative(entry.lastSeen) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: `h-9 px-3 text-[10px] gap-1 ${isBlocked ? "text-emerald-400 hover:bg-emerald-500/10" : "text-red-400 hover:bg-red-500/10"}`,
                  onClick: () => onToggleBlock(entry.ipAddress),
                  "data-ocid": `toggle-ip-mobile-${entry.ipAddress.replace(/\./g, "-")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3 h-3" }),
                    isBlocked ? "Unblock" : "Block"
                  ]
                }
              )
            ] })
          ]
        },
        entry.ipAddress
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border/30 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
        "Page ",
        page + 1,
        " of ",
        Math.max(totalPages, 1),
        " · ",
        filtered.length,
        " ",
        "results"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2",
            disabled: page === 0,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": "btn-ip-prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2",
            disabled: page >= totalPages - 1,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": "btn-ip-next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] })
  ] });
}
const MFA_PAGE_SIZE = 25;
function MFAPanel({ mfaStatuses }) {
  const [companyFilter, setCompanyFilter] = reactExports.useState("all");
  const [mfaFilter, setMfaFilter] = reactExports.useState(
    "all"
  );
  const [page, setPage] = reactExports.useState(0);
  const companies = reactExports.useMemo(() => {
    const set = new Set(mfaStatuses.map((m) => m.companyName));
    return ["all", ...Array.from(set).sort().slice(0, 15)];
  }, [mfaStatuses]);
  const filtered = reactExports.useMemo(() => {
    let result = mfaStatuses;
    if (companyFilter !== "all")
      result = result.filter((m) => m.companyName === companyFilter);
    if (mfaFilter === "enabled") result = result.filter((m) => m.mfaEnabled);
    if (mfaFilter === "disabled") result = result.filter((m) => !m.mfaEnabled);
    return result;
  }, [mfaStatuses, companyFilter, mfaFilter]);
  const totalPages = Math.ceil(filtered.length / MFA_PAGE_SIZE);
  const page_items = filtered.slice(
    page * MFA_PAGE_SIZE,
    (page + 1) * MFA_PAGE_SIZE
  );
  const enabledCount = mfaStatuses.filter((m) => m.mfaEnabled).length;
  const enrollmentRate = (enabledCount / Math.max(mfaStatuses.length, 1) * 100).toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border/30 grid grid-cols-3 gap-4", children: [
      {
        label: "MFA Enabled",
        value: enabledCount,
        color: "text-emerald-400"
      },
      {
        label: "MFA Disabled",
        value: mfaStatuses.length - enabledCount,
        color: "text-red-400"
      },
      {
        label: "Enrollment Rate",
        value: `${enrollmentRate}%`,
        color: "text-blue-400"
      }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-display font-bold ${color}`, children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: label })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b border-border/20 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: companyFilter,
          onChange: (e) => {
            setCompanyFilter(e.target.value);
            setPage(0);
          },
          className: "h-7 text-[11px] bg-background/50 border border-border/50 rounded-md px-2 text-foreground",
          "data-ocid": "select-mfa-company",
          children: companies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c === "all" ? "All Companies" : c }, c))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: ["all", "enabled", "disabled"].map((val) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setMfaFilter(val);
            setPage(0);
          },
          className: `px-2.5 py-1 text-[10px] font-medium rounded-md capitalize transition-colors ${mfaFilter === val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`,
          "data-ocid": `filter-mfa-${val}`,
          children: val
        },
        val
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-muted-foreground", children: [
        filtered.length,
        " users"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "User Email",
        "Company",
        "MFA Enabled",
        "Last MFA Event",
        "Backup Codes"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-2.5 px-3 font-medium text-[10px] uppercase tracking-wide text-muted-foreground",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: page_items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/15 hover:bg-muted/10 transition-colors",
          "data-ocid": `mfa-row-${item.userId}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[11px] text-foreground truncate max-w-[200px]", children: item.userEmail }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground truncate max-w-[140px]", children: item.companyName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: `text-[9px] border gap-1 ${item.mfaEnabled ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-red-500/15 text-red-400 border-red-500/30"}`,
                children: [
                  item.mfaEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-2.5 h-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-2.5 h-2.5" }),
                  item.mfaEnabled ? "Enabled" : "Disabled"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground", children: item.lastMFAEvent ? fmtRelative(item.lastMFAEvent) : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[9px] border ${item.backupCodesAvailable ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-muted/20 text-muted-foreground border-border/40"}`,
                children: item.backupCodesAvailable ? "Available" : "None"
              }
            ) })
          ]
        },
        item.userId
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border/30 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
        "Page ",
        page + 1,
        " of ",
        Math.max(totalPages, 1),
        " · ",
        filtered.length,
        " users"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2",
            disabled: page === 0,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": "btn-mfa-prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2",
            disabled: page >= totalPages - 1,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": "btn-mfa-next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] })
  ] });
}
function SecurityTimeline({ events }) {
  const recent = reactExports.useMemo(
    () => [...events].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 20),
    [events]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/20", children: recent.map((e) => {
    var _a;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 py-3 px-4 hover:bg-muted/10 transition-colors",
        "data-ocid": `timeline-event-${e.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${e.success ? "bg-emerald-500/15" : "bg-red-500/15"}`,
              children: e.success ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-red-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-foreground truncate", children: e.userName ?? e.userEmail ?? "Unknown User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[9px] text-muted-foreground font-mono bg-muted/20 px-1 rounded", children: e.ipAddress }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[8px] border capitalize ${SEV_COLORS[e.severity]}`,
                  children: (_a = e.type) == null ? void 0 : _a.replace(/_/g, " ")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: e.description ?? e.companyName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0", children: fmtRelative(e.timestamp) })
        ]
      },
      e.id
    );
  }) });
}
function SecurityDashboard() {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [lastRefreshed] = reactExports.useState(/* @__PURE__ */ new Date());
  const [blockedIps, setBlockedIps] = reactExports.useState(/* @__PURE__ */ new Set());
  const [dismissedIds, setDismissedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const loginChartData = reactExports.useMemo(() => buildLoginChartData(), []);
  const stats = reactExports.useMemo(() => {
    const total = loginChartData.reduce((s, d) => s + d.success + d.failed, 0);
    const failed = loginChartData.reduce((s, d) => s + d.failed, 0);
    const failurePct = total > 0 ? Math.round(failed / total * 100) : 0;
    const blockedCount = mockIPTracking.filter(
      (e) => e.isBlocked || blockedIps.has(e.ipAddress)
    ).length;
    return { total, failed, failurePct, blockedCount };
  }, [loginChartData, blockedIps]);
  const tabs = [
    { key: "overview", label: "Overview", icon: Activity },
    { key: "suspicious", label: "Suspicious Activity", icon: ShieldAlert },
    { key: "ips", label: "IP Tracking", icon: Globe },
    { key: "mfa", label: "MFA Status", icon: KeyRound },
    { key: "events", label: "Security Events", icon: Shield }
  ];
  const handleBlock = (ip) => setBlockedIps((prev) => {
    const next = new Set(prev);
    next.has(ip) ? next.delete(ip) : next.add(ip);
    return next;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-4 md:space-y-5 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Security Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            "Last refreshed: ",
            lastRefreshed.toLocaleTimeString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "ml-auto h-8 gap-1.5 text-xs",
          "data-ocid": "btn-refresh-security",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Login Attempts Today",
          value: (stats.total / 30).toFixed(0),
          sub: "avg daily logins",
          icon: Activity,
          color: "blue"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Failed Logins",
          value: `${stats.failed.toLocaleString()}`,
          sub: `${stats.failurePct}% failure rate`,
          icon: ShieldOff,
          color: "red"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Suspicious Activities",
          value: mockSuspiciousActivity.length,
          sub: `${mockSuspiciousActivity.filter((s) => s.severity === "critical").length} critical`,
          icon: ShieldAlert,
          color: "orange"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Blocked IPs",
          value: stats.blockedCount + blockedIps.size,
          sub: "total blocked addresses",
          icon: Ban,
          color: "violet"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 border-b border-border/40 overflow-x-auto", children: tabs.map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(key),
        className: `flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${activeTab === key ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
        "data-ocid": `tab-${key}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
          label
        ]
      },
      key
    )) }),
    activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Login Attempts — Last 30 Days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          LineChart,
          {
            data: loginChartData,
            margin: { top: 4, right: 12, bottom: 0, left: -8 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "hsl(var(--border) / 0.3)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "date",
                  tick: {
                    fontSize: 9,
                    fill: "hsl(var(--muted-foreground))"
                  },
                  interval: 4
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: {
                    fontSize: 9,
                    fill: "hsl(var(--muted-foreground))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: TOOLTIP_STYLE,
                  labelStyle: {
                    color: "hsl(var(--foreground))",
                    fontWeight: 600,
                    marginBottom: 4
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "success",
                  name: "Successful Logins",
                  stroke: "#34d399",
                  strokeWidth: 2,
                  dot: false,
                  activeDot: { r: 4 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "failed",
                  name: "Failed Logins",
                  stroke: "#f87171",
                  strokeWidth: 2,
                  dot: false,
                  activeDot: { r: 4 }
                }
              )
            ]
          }
        ) }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        {
          label: "MFA Enabled Users",
          value: mockUsers.filter((u) => u.mfaEnabled).length,
          icon: ShieldCheck,
          color: "text-emerald-400"
        },
        {
          label: "Active Sessions",
          value: mockUsers.filter((u) => u.sessionActive).length,
          icon: Activity,
          color: "text-violet-400"
        },
        {
          label: "High Severity Events",
          value: mockSecurityEvents.filter(
            (e) => e.severity === "critical" || e.severity === "high"
          ).length,
          icon: ShieldAlert,
          color: "text-orange-400"
        },
        {
          label: "Resolved Events",
          value: mockSecurityEvents.filter((e) => e.resolved).length,
          icon: Check,
          color: "text-blue-400"
        }
      ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-3 flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 flex-shrink-0 ${color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-display font-bold ${color}`, children: value.toLocaleString() })
        ] })
      ] }, label)) })
    ] }),
    activeTab === "suspicious" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border/30 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-orange-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Suspicious Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-orange-500/15 text-orange-400 border-orange-500/30 text-[9px]", children: [
          mockSuspiciousActivity.filter((i) => !dismissedIds.has(i.id)).length,
          " ",
          "active"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SuspiciousPanel,
        {
          items: mockSuspiciousActivity,
          blockedIps,
          dismissedIds,
          onBlock: handleBlock,
          onDismiss: (id) => setDismissedIds((prev) => /* @__PURE__ */ new Set([...prev, id]))
        }
      )
    ] }),
    activeTab === "ips" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/30 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-cyan-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "IP Address Tracking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted/40 text-muted-foreground border-border text-[9px] ml-auto", children: [
          mockIPTracking.length,
          " tracked IPs"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IPTrackingTable,
        {
          entries: mockIPTracking,
          blockedIps,
          onToggleBlock: handleBlock
        }
      )
    ] }),
    activeTab === "mfa" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/30 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "MFA Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted/40 text-muted-foreground border-border text-[9px] ml-auto", children: [
          mockMFAStatus.length,
          " users"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MFAPanel, { mfaStatuses: mockMFAStatus })
    ] }),
    activeTab === "events" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/30 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-blue-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Recent Security Events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-muted/40 text-muted-foreground border-border text-[9px] ml-auto", children: "Last 20 events" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityTimeline, { events: mockSecurityEvents })
    ] })
  ] });
}
export {
  SecurityDashboard as default
};
