import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b3 as ClipboardList, ah as Badge, b4 as ShieldAlert, ap as User, aB as CreditCard, as as Search, X, T as TriangleAlert, aS as Info, N as Network, al as Shield, C as ChevronDown, q as ChevronRight } from "./index-CBnSp17V.js";
import { G as GlassCard } from "./GlassCard-Dc3khF0M.js";
import { B as Button } from "./button-DJDK6jFi.js";
import { I as Input } from "./input-C4biyYD9.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-CXXzdsrJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DgM9IYdD.js";
import { M as MOCK_COMPANIES, e as MOCK_AUDIT_EVENTS } from "./superAdminMockData-SJ6Z2k0y.js";
import { D as Download } from "./download-B8uKz_a3.js";
import { F as Funnel } from "./funnel-Dpsc9yGD.js";
import { M as Monitor } from "./monitor-52Q67PUW.js";
import "./index-IXOTxK3N.js";
import "./index-BalHobZ-.js";
import "./index-Ch1uvbOx.js";
import "./check-ow6agwNW.js";
import "./chevron-up-DjlMizU_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
      key: "gugj83"
    }
  ]
];
const Table2 = createLucideIcon("table-2", __iconNode);
function fmtAbsolute(iso) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
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
const SEV_DOT = {
  info: "bg-blue-500",
  warning: "bg-amber-500",
  critical: "bg-red-500"
};
const SEV_BADGE = {
  info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30"
};
const SEV_ICONS = {
  info: Info,
  warning: TriangleAlert,
  critical: ShieldAlert
};
const CAT_COLORS = {
  user: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  device: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  billing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  auth: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  workflow: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  company: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  system: "bg-muted/30 text-muted-foreground border-border",
  api_key: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  config: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  alert: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  bulk: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  session: "bg-red-500/10 text-red-400 border-red-500/20"
};
const CAT_ICONS = {
  user: User,
  device: Monitor,
  billing: CreditCard,
  auth: Shield,
  workflow: Network,
  company: ClipboardList,
  system: ShieldAlert
};
function getCat(action) {
  return (action == null ? void 0 : action.split(".")[0]) ?? "system";
}
function getColor(action) {
  const cat = getCat(action);
  return CAT_COLORS[cat] ?? "bg-muted/30 text-muted-foreground border-border";
}
function truncate(s, n) {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}
function StatCard({
  label,
  value,
  colorClass,
  bgClass,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-9 h-9 rounded-lg flex items-center justify-center ${bgClass}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${colorClass}` })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-display font-bold mt-0.5 ${colorClass}`, children: value.toLocaleString() })
    ] })
  ] });
}
function TimelineEvent({
  event,
  expanded,
  onToggle,
  relatedEvents
}) {
  const SevIcon = SEV_ICONS[event.severity];
  const cat = getCat(event.action);
  const CatIcon = CAT_ICONS[cat] ?? ClipboardList;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-8", "data-ocid": `timeline-event-${event.id}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-0 bottom-0 w-px bg-border/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `absolute left-[9px] top-4 w-2.5 h-2.5 rounded-full border-2 border-card z-10 ${SEV_DOT[event.severity]}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "mb-3 w-full text-left rounded-lg border border-border/30 bg-card/50 hover:bg-card/80 transition-colors",
        onClick: onToggle,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 min-w-[72px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground leading-none", children: fmtRelative(event.timestamp) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 leading-none", children: new Date(event.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border ${getColor(event.action)}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground font-medium", children: event.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: `text-[9px] border ${SEV_BADGE[event.severity]}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SevIcon, { className: "w-2.5 h-2.5 mr-0.5" }),
                        event.severity
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-foreground font-medium leading-tight truncate", children: [
                  event.userName,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                    " ",
                    "· ",
                    event.userEmail
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 line-clamp-1", children: event.details })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[9px] border capitalize hidden sm:flex ${getColor(event.action)}`,
                  children: truncate(event.companyName, 18)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }) })
            ] })
          ] }),
          expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/30 p-3 bg-background/40 rounded-b-lg space-y-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Timestamp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: fmtAbsolute(event.timestamp) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "IP Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: event.ipAddress })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "User ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground/70", children: event.userId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Company" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: event.companyName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Full Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground bg-muted/30 rounded p-2 border border-border/30", children: event.details })
              ] })
            ] }),
            relatedEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium mb-1.5", children: "Related events from same user" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: relatedEvents.slice(0, 3).map((rel) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-[10px] py-1 px-2 rounded bg-muted/20 border border-border/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-1.5 h-1.5 rounded-full ${SEV_DOT[rel.severity]}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/70", children: rel.action }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-auto", children: fmtRelative(rel.timestamp) })
                  ]
                },
                rel.id
              )) })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function AuditTableRow({
  event,
  expanded,
  onToggle
}) {
  const SevIcon = SEV_ICONS[event.severity];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/20 hover:bg-muted/10 transition-colors cursor-pointer",
        onClick: onToggle,
        onKeyDown: (e) => e.key === "Enter" && onToggle(),
        tabIndex: 0,
        "data-ocid": `audit-row-${event.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap", children: [
            fmtRelative(event.timestamp),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[9px] opacity-60", children: new Date(event.timestamp).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SevIcon,
              {
                className: `w-3 h-3 flex-shrink-0 ${SEV_BADGE[event.severity].split(" ")[1]}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-[9px] border ${SEV_BADGE[event.severity]}`, children: event.severity })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-[9px] border capitalize ${getColor(event.action)}`,
              children: getCat(event.action)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-[10px] text-foreground", children: event.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-foreground font-medium leading-tight", children: event.userName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate max-w-[140px]", children: event.userEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[11px] text-muted-foreground truncate max-w-[120px]", children: event.companyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: event.details }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap", children: event.ipAddress }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              className: `w-3 h-3 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`
            }
          ) })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 bg-muted/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Full Timestamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: fmtAbsolute(event.timestamp) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "User ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground/70", children: event.userId })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "IP Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: event.ipAddress })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-0.5", children: "Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: event.details })
      ] })
    ] }) }) })
  ] });
}
const ACTION_OPTIONS = [
  "all",
  "user.created",
  "user.login",
  "user.disabled",
  "user.role_changed",
  "company.suspended",
  "company.created",
  "plan.changed",
  "billing.paid",
  "billing.failed",
  "device.added",
  "device.removed",
  "workflow.executed",
  "session.force_logout"
];
const PAGE_SIZE = 50;
function MobileTimelineEvent({ event }) {
  const SevIcon = SEV_ICONS[event.severity];
  const cat = getCat(event.action);
  const CatIcon = CAT_ICONS[cat] ?? ClipboardList;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative pl-8 mb-2",
      "data-ocid": `timeline-event-mobile-${event.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-0 bottom-0 w-px bg-border/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute left-[9px] top-4 w-2.5 h-2.5 rounded-full border-2 border-card z-10 ${SEV_DOT[event.severity]}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/30 bg-card/50 p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border ${getColor(event.action)}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground font-medium", children: event.action }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: `text-[9px] border ${SEV_BADGE[event.severity]}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SevIcon, { className: "w-2.5 h-2.5 mr-0.5" }),
                      event.severity
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-foreground font-medium leading-tight", children: [
                event.userName,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                  " · ",
                  event.companyName
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground line-clamp-2", children: event.details }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: event.ipAddress }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmtRelative(event.timestamp) })
          ] })
        ] })
      ]
    }
  );
}
function PlatformAudit() {
  const [search, setSearch] = reactExports.useState("");
  const [companyFilter, setCompanyFilter] = reactExports.useState("all");
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  const [severityFilter, setSeverityFilter] = reactExports.useState("all");
  const [viewMode, setViewMode] = reactExports.useState("timeline");
  const [page, setPage] = reactExports.useState(0);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const companyOptions = reactExports.useMemo(
    () => MOCK_COMPANIES.map((c) => ({ id: c.id, name: c.name })).slice(0, 30),
    []
  );
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_AUDIT_EVENTS.filter((e) => {
      if (q && !e.userName.toLowerCase().includes(q) && !e.action.toLowerCase().includes(q) && !e.companyName.toLowerCase().includes(q) && !e.userEmail.toLowerCase().includes(q) && !e.details.toLowerCase().includes(q))
        return false;
      if (companyFilter !== "all" && e.companyId !== companyFilter)
        return false;
      if (actionFilter !== "all" && e.action !== actionFilter) return false;
      if (severityFilter !== "all" && e.severity !== severityFilter)
        return false;
      return true;
    });
  }, [search, companyFilter, actionFilter, severityFilter]);
  const stats = reactExports.useMemo(
    () => ({
      total: MOCK_AUDIT_EVENTS.length,
      critical: MOCK_AUDIT_EVENTS.filter((e) => e.severity === "critical").length,
      userActions: MOCK_AUDIT_EVENTS.filter((e) => e.action.startsWith("user.")).length,
      billingEvents: MOCK_AUDIT_EVENTS.filter(
        (e) => e.action.startsWith("billing.")
      ).length
    }),
    []
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  function handleExport() {
    const header = [
      "Timestamp",
      "Severity",
      "Category",
      "Action",
      "User",
      "Email",
      "Company",
      "IP",
      "Details"
    ];
    const rows = filtered.map((e) => [
      e.timestamp,
      e.severity,
      getCat(e.action),
      e.action,
      e.userName,
      e.userEmail,
      e.companyName,
      e.ipAddress,
      `"${e.details.replace(/"/g, '""')}"`
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `platform-audit-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function toggleExpand(id) {
    setExpandedId((prev) => prev === id ? null : id);
  }
  function getRelatedEvents(event) {
    return MOCK_AUDIT_EVENTS.filter(
      (e) => e.id !== event.id && e.userId === event.userId
    ).slice(0, 4);
  }
  const hasFilters = search !== "" || companyFilter !== "all" || actionFilter !== "all" || severityFilter !== "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-5 h-5 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Platform Audit Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-muted/50 text-muted-foreground border-border text-[10px] font-mono", children: [
          filtered.length.toLocaleString(),
          " records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex rounded-md border border-border/50 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setViewMode("timeline"),
              className: `flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${viewMode === "timeline" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "btn-view-timeline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-3 h-3" }),
                "Timeline"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setViewMode("table"),
              className: `flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${viewMode === "table" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
              "data-ocid": "btn-view-table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Table2, { className: "w-3 h-3" }),
                "Table"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5 text-xs h-8",
            onClick: handleExport,
            "data-ocid": "btn-export-audit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
              "Export CSV"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Events",
          value: stats.total,
          colorClass: "text-blue-400",
          bgClass: "bg-blue-500/10",
          icon: ClipboardList
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Critical Events",
          value: stats.critical,
          colorClass: "text-red-400",
          bgClass: "bg-red-500/10",
          icon: ShieldAlert
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "User Actions",
          value: stats.userActions,
          colorClass: "text-violet-400",
          bgClass: "bg-violet-500/10",
          icon: User
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Billing Events",
          value: stats.billingEvents,
          colorClass: "text-emerald-400",
          bgClass: "bg-emerald-500/10",
          icon: CreditCard
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search user, action, company...",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(0);
            },
            className: "pl-8 h-11 text-xs bg-background/50",
            "data-ocid": "input-audit-search-mobile"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-11 px-3 gap-1.5 relative",
            "data-ocid": "btn-audit-filter-mobile",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4" }),
              "Filters",
              hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold", children: "!" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          PopoverContent,
          {
            className: "w-72 p-4 space-y-4",
            "data-ocid": "audit-filter-popover-mobile",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: companyFilter,
                  onValueChange: (v) => {
                    setCompanyFilter(v);
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-9 text-xs",
                        "data-ocid": "filter-audit-company-mobile",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Companies" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-60", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Companies" }),
                      companyOptions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, className: "text-xs", children: truncate(c.name, 28) }, c.id))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: actionFilter,
                  onValueChange: (v) => {
                    setActionFilter(v);
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-9 text-xs",
                        "data-ocid": "filter-audit-action-mobile",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Actions" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ACTION_OPTIONS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, className: "text-xs font-mono", children: a === "all" ? "All Actions" : a }, a)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: severityFilter,
                  onValueChange: (v) => {
                    setSeverityFilter(v);
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-9 text-xs",
                        "data-ocid": "filter-audit-severity-mobile",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Severities" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "critical", children: "Critical" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "warning", children: "Warning" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "info", children: "Info" })
                    ] })
                  ]
                }
              ),
              hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "w-full text-xs text-muted-foreground",
                  onClick: () => {
                    setSearch("");
                    setCompanyFilter("all");
                    setActionFilter("all");
                    setSeverityFilter("all");
                    setPage(0);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 mr-1" }),
                    " Clear Filters"
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "hidden md:flex p-3 flex-wrap gap-2.5 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search user, action, company, IP...",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(0);
            },
            className: "pl-8 h-8 text-xs bg-background/50",
            "data-ocid": "input-audit-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: companyFilter,
          onValueChange: (v) => {
            setCompanyFilter(v);
            setPage(0);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-44 bg-background/50",
                "data-ocid": "filter-audit-company",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Companies" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Companies" }),
              companyOptions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, className: "text-xs", children: truncate(c.name, 28) }, c.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: actionFilter,
          onValueChange: (v) => {
            setActionFilter(v);
            setPage(0);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-44 bg-background/50",
                "data-ocid": "filter-audit-action",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Actions" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ACTION_OPTIONS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: a, className: "text-xs font-mono", children: a === "all" ? "All Actions" : a }, a)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: severityFilter,
          onValueChange: (v) => {
            setSeverityFilter(v);
            setPage(0);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-32 bg-background/50",
                "data-ocid": "filter-audit-severity",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Severities" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "critical", children: "Critical" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "warning", children: "Warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "info", children: "Info" })
            ] })
          ]
        }
      ),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 text-xs gap-1 text-muted-foreground",
          onClick: () => {
            setSearch("");
            setCompanyFilter("all");
            setActionFilter("all");
            setSeverityFilter("all");
            setPage(0);
          },
          "data-ocid": "btn-clear-filters",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
            "Clear"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground ml-auto", children: [
        filtered.length.toLocaleString(),
        " events"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: paged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-16 gap-3 text-center",
        "data-ocid": "audit-empty-mobile",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-8 h-8 opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No audit events match your filters" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "audit-timeline-mobile", children: paged.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(MobileTimelineEvent, { event }, event.id)) }) }),
    viewMode === "timeline" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: paged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col items-center py-16 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-8 h-8 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No audit events match your filters" })
    ] }) : paged.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TimelineEvent,
      {
        event,
        expanded: expandedId === event.id,
        onToggle: () => toggleExpand(event.id),
        relatedEvents: expandedId === event.id ? getRelatedEvents(event) : []
      },
      event.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-hidden hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-muted-foreground", children: [
        "Time",
        "Severity",
        "Category",
        "Action",
        "User",
        "Company",
        "Details",
        "IP",
        ""
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-2.5 px-3 font-medium text-[10px] uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 9,
          className: "py-16 text-center text-muted-foreground text-sm",
          children: "No audit events match your filters"
        }
      ) }) : paged.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AuditTableRow,
        {
          event,
          expanded: expandedId === event.id,
          onToggle: () => toggleExpand(event.id)
        },
        event.id
      )) })
    ] }) }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: `Showing ${(page * PAGE_SIZE + 1).toLocaleString()}–${Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of ${filtered.length.toLocaleString()} events` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2 text-xs",
            disabled: page === 0,
            onClick: () => setPage((p) => p - 1),
            "data-ocid": "btn-audit-prev",
            children: "Prev"
          }
        ),
        Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          const pg = totalPages <= 7 ? i : page < 4 ? i : page + i - 3;
          if (pg >= totalPages) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setPage(pg),
              className: `w-7 h-7 rounded text-xs transition-colors ${pg === page ? "bg-primary text-primary-foreground" : "hover:bg-muted/50 text-muted-foreground"}`,
              children: pg + 1
            },
            pg
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 px-2 text-xs",
            disabled: page >= totalPages - 1,
            onClick: () => setPage((p) => p + 1),
            "data-ocid": "btn-audit-next",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
export {
  PlatformAudit as default
};
