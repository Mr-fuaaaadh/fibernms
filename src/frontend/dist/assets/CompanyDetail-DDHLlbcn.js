import { c as createLucideIcon, aQ as useParams, ae as useRouter, r as reactExports, j as jsxRuntimeExports, aj as Shield, n as ChevronRight, aP as ArrowLeft, af as Badge, M as MapPin, ac as Server, aL as Users, B as Bell, F as FileText, Z as Zap, ah as TrendingUp, az as CreditCard, p as Activity, ax as Plan, aD as Database } from "./index-BuH20gNs.js";
import { G as GlassCard } from "./GlassCard-ArFOmrcF.js";
import { B as Button } from "./button-CVW8T4d4.js";
import { S as Separator } from "./separator--weetXFO.js";
import { g as getCompanyById, a as getUsersByCompany, f as getOrdersByCompany, b as getInvoicesByCompany, h as getAuditByCompany, i as getActivitiesByCompany, c as getUsageByCompany } from "./superAdminMockData-SJ6Z2k0y.js";
import { u as ue } from "./index-Cg9tkAvc.js";
import { P as Pen } from "./pen-CTRQS_Qg.js";
import { a as CirclePlay, C as CirclePause } from "./circle-play-Gxh8xwaz.js";
import { T as Trash2 } from "./trash-2-BdR1KnJk.js";
import { M as Mail } from "./mail-ZOmHmTAZ.js";
import { G as Globe } from "./globe-Bv69OvCQ.js";
import "./index-1XG5E_Xb.js";
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function fmtNum(n, compact = false) {
  if (compact && n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (compact && n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
}
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function fmtDateTime(iso) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function getInitials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
const REGION_FLAGS = {
  India: "🇮🇳",
  US: "🇺🇸",
  EU: "🇪🇺",
  APAC: "🌏",
  MENA: "🌍"
};
const STATUS_COLORS = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  trial: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  suspended: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  expired: "bg-red-500/15 text-red-400 border-red-500/30"
};
const PLAN_COLORS = {
  BASIC: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const PLAN_PRICES = {
  [Plan.BASIC]: 99,
  [Plan.PROFESSIONAL]: 499,
  [Plan.ENTERPRISE]: 1499,
  [Plan.ULTRA]: 4999
};
const ROLE_COLORS = {
  Admin: "bg-amber-500/15 text-amber-400",
  "Network Engineer": "bg-blue-500/15 text-blue-400",
  "NOC Operator": "bg-violet-500/15 text-violet-400",
  Viewer: "bg-muted/40 text-muted-foreground"
};
const AUDIT_CATEGORY_ICONS = {
  user: Users,
  company: Globe,
  billing: CreditCard,
  device: Server,
  auth: Shield
};
function UsageBar({
  label,
  used,
  limit,
  unit = "",
  icon: Icon
}) {
  const pct = Math.min(Math.round(used / Math.max(limit, 1) * 100), 100);
  const barColor = pct >= 90 ? "capacity-fill-critical" : pct >= 70 ? "capacity-fill-warning" : "capacity-fill-healthy";
  const textColor = pct >= 90 ? "text-red-400" : pct >= 70 ? "text-amber-400" : "text-emerald-400";
  const warning = pct >= 90 ? "Exceeded" : pct >= 70 ? "Nearing limit" : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
        warning && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `text-[9px] px-1.5 py-0 ml-1 ${pct >= 90 ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"}`,
            children: warning
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs font-mono font-semibold ${textColor}`, children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${barColor}`,
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono", children: [
      fmtNum(used, true),
      unit,
      " / ",
      fmtNum(limit, true),
      unit
    ] })
  ] });
}
const TABS = [
  { id: "overview", label: "Overview", icon: Zap },
  { id: "usage", label: "Usage", icon: TrendingUp },
  { id: "billing", label: "Billing History", icon: CreditCard },
  { id: "activity", label: "Activity Logs", icon: Activity },
  { id: "users", label: "Users", icon: Users }
];
function OverviewTab({
  company,
  usage
}) {
  const devPct = usage ? Math.round(usage.devices.used / Math.max(usage.devices.limit, 1) * 100) : 0;
  const apiPct = usage ? Math.round(usage.api.used / Math.max(usage.api.limit, 1) * 100) : 0;
  const dataPct = usage ? Math.round(usage.data.used / Math.max(usage.data.limit, 1) * 100) : 0;
  const alertsPct = usage ? Math.round(usage.alerts.used / Math.max(usage.alerts.limit, 1) * 100) : 0;
  const stats = [
    {
      label: "Devices Used",
      value: fmtNum(company.devicesUsed, true),
      sub: `of ${fmtNum(company.devicesLimit, true)}`,
      pct: devPct,
      icon: Server,
      color: "text-blue-400"
    },
    {
      label: "Active Users",
      value: fmtNum(company.activeUsers),
      sub: "registered",
      pct: null,
      icon: Users,
      color: "text-violet-400"
    },
    {
      label: "Alerts",
      value: fmtNum(company.totalAlerts, true),
      sub: "generated",
      pct: alertsPct,
      icon: Bell,
      color: "text-amber-400"
    },
    {
      label: "MRR",
      value: `$${fmtNum(company.mrr, true)}`,
      sub: `${company.plan} plan`,
      pct: null,
      icon: TrendingUp,
      color: "text-emerald-400"
    },
    {
      label: "API Calls",
      value: fmtNum(company.apiUsed, true),
      sub: `of ${fmtNum(company.apiLimit, true)}`,
      pct: apiPct,
      icon: Zap,
      color: "text-primary"
    },
    {
      label: "Data Usage",
      value: `${fmtNum(company.dataUsedGB, true)} GB`,
      sub: `of ${fmtNum(company.dataLimitGB, true)} GB`,
      pct: dataPct,
      icon: Database,
      color: "text-cyan-400"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-3", children: stats.map(({ label, value, sub, pct, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-7 h-7 rounded-lg flex items-center justify-center ${color.replace("text-", "bg-").replace(/400$/, "500/15")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-3.5 h-3.5 ${color}` })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-display font-bold ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: sub }),
    pct !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full rounded-full ${pct >= 90 ? "capacity-fill-critical" : pct >= 70 ? "capacity-fill-warning" : "capacity-fill-healthy"}`,
          style: { width: `${pct}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-mono text-muted-foreground", children: [
        pct,
        "% utilized"
      ] })
    ] })
  ] }, label)) }) });
}
function UsageTab({ company }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "Resource Utilization" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UsageBar,
        {
          label: "Devices",
          used: company.devicesUsed,
          limit: company.devicesLimit,
          icon: Server
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UsageBar,
        {
          label: "API Calls",
          used: company.apiUsed,
          limit: company.apiLimit,
          icon: Zap
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UsageBar,
        {
          label: "Data Storage",
          used: company.dataUsedGB,
          limit: company.dataLimitGB,
          unit: " GB",
          icon: Database
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UsageBar,
        {
          label: "Alerts",
          used: company.alertsUsed,
          limit: company.alertsLimit,
          icon: Bell
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 grid grid-cols-3 gap-3 text-center border-t border-border/30", children: [
      {
        label: "Plan Limit Devices",
        val: fmtNum(company.devicesLimit, true)
      },
      { label: "API Limit", val: fmtNum(company.apiLimit, true) },
      {
        label: "Data Limit",
        val: `${fmtNum(company.dataLimitGB, true)} GB`
      }
    ].map(({ label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 rounded-lg bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-bold text-foreground", children: val }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground mt-0.5", children: label })
    ] }, label)) })
  ] });
}
function BillingTab({ invoices }) {
  const displayed = invoices.slice(0, 6);
  const INV_STATUS_COLORS = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    overdue: "bg-red-500/15 text-red-400 border-red-500/30",
    failed: "bg-red-500/15 text-red-400 border-red-500/30"
  };
  if (displayed.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No invoices found" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-muted-foreground", children: ["Invoice #", "Date", "Amount", "Tax", "Total", "Status"].map(
      (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider",
          children: h
        },
        h
      )
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: displayed.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/20 hover:bg-muted/10 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-primary/80", children: inv.invoiceNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground whitespace-nowrap", children: fmtDate(inv.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono", children: [
            "$",
            inv.amount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground font-mono", children: inv.taxType !== "NONE" ? `$${inv.taxAmount.toLocaleString()} (${inv.taxType})` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono font-semibold text-foreground", children: [
            "$",
            inv.total.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-[9px] border ${INV_STATUS_COLORS[inv.status] ?? "bg-muted/30 text-muted-foreground"}`,
              children: inv.status
            }
          ) })
        ]
      },
      inv.id
    )) })
  ] }) }) });
}
function ActivityTab({
  auditEvents,
  activities
}) {
  const sorted = reactExports.useMemo(
    () => [...auditEvents].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 50),
    [auditEvents]
  );
  const SEVERITY_COLORS = {
    info: "bg-blue-500/15 text-blue-400",
    warning: "bg-amber-500/15 text-amber-400",
    critical: "bg-red-500/15 text-red-400"
  };
  if (sorted.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No activity logged" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: sorted.map((event, idx) => {
      const CatIcon = AUDIT_CATEGORY_ICONS[event.category] ?? Activity;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative pl-8 pb-4",
          "data-ocid": `activity-item-${event.id}`,
          children: [
            idx < sorted.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[13px] top-6 bottom-0 w-px bg-border/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2 top-1.5 w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "w-2.5 h-2.5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-primary/80 leading-snug", children: event.action }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-foreground mt-0.5 leading-relaxed", children: event.details }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                  fmtDateTime(event.timestamp),
                  " · ",
                  event.userName
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[9px] shrink-0 ${SEVERITY_COLORS[event.severity] ?? "bg-muted/30"}`,
                  children: event.severity
                }
              )
            ] })
          ]
        },
        event.id
      );
    }) }),
    activities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center", children: [
      activities.length,
      " additional company-level activity records available"
    ] }) })
  ] });
}
function UsersTab({ users }) {
  const displayed = users.slice(0, 20);
  if (displayed.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No users found" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "text-muted-foreground", children: ["Name", "Email", "Role", "Status", "Last Login"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: displayed.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/20 hover:bg-muted/10 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-[9px] font-bold text-primary", children: getInitials(user.name) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[120px]", children: user.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground truncate max-w-[160px]", children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[9px] ${ROLE_COLORS[user.role] ?? "bg-muted/30 text-muted-foreground"}`,
                children: user.role
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[9px] ${user.status === "active" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`,
                children: user.status
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground whitespace-nowrap", children: fmtDate(user.lastLogin) })
          ]
        },
        user.id
      )) })
    ] }) }),
    users.length > 20 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "text-xs text-primary hover:text-primary/80 transition-colors",
          onClick: () => ue.info(
            `${users.length} total users. Navigate to Global Users for full list.`
          ),
          "data-ocid": "btn-view-all-users",
          children: [
            "View all ",
            users.length,
            " users →"
          ]
        }
      ) })
    ] })
  ] });
}
function CompanyDetail() {
  const params = useParams({ strict: false });
  const router = useRouter();
  const nav = (path) => router.navigate({ to: path });
  const companyId = params.companyId ?? "";
  const company = reactExports.useMemo(() => getCompanyById(companyId), [companyId]);
  const users = reactExports.useMemo(() => getUsersByCompany(companyId), [companyId]);
  const orders = reactExports.useMemo(() => getOrdersByCompany(companyId), [companyId]);
  const invoices = reactExports.useMemo(() => getInvoicesByCompany(companyId), [companyId]);
  const auditEvents = reactExports.useMemo(() => getAuditByCompany(companyId), [companyId]);
  const activities = reactExports.useMemo(
    () => getActivitiesByCompany(companyId),
    [companyId]
  );
  const usage = reactExports.useMemo(() => getUsageByCompany(companyId), [companyId]);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  if (!company) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-6 max-w-[1200px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-10 flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Company not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "text-xs",
          onClick: () => nav("/super-admin/companies"),
          children: "Back to Companies"
        }
      )
    ] }) });
  }
  const mrr = company.mrr ?? PLAN_PRICES[company.plan] ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-4 md:space-y-5 max-w-[1200px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "hover:text-foreground transition-colors",
          onClick: () => nav("/super-admin"),
          children: "Super Admin"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "hover:text-foreground transition-colors",
          onClick: () => nav("/super-admin/companies"),
          children: "Companies"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: company.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-lg",
            onClick: () => nav("/super-admin/companies"),
            "data-ocid": "btn-back-companies",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-display font-bold text-primary text-base", children: getInitials(company.name) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground leading-tight", children: company.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: company.domain })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs gap-1.5",
            onClick: () => ue.info("Edit form opened"),
            "data-ocid": "btn-edit-company",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3" }),
              "Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: `h-8 text-xs gap-1.5 ${company.status === "suspended" ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" : "border-orange-500/30 text-orange-400 hover:bg-orange-500/10"}`,
            onClick: () => ue.success(
              company.status === "suspended" ? `${company.name} activated` : `${company.name} suspended`
            ),
            "data-ocid": "btn-toggle-company-status",
            children: company.status === "suspended" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3 h-3" }),
              " Activate"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "w-3 h-3" }),
              " Suspend"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs gap-1.5 border-red-500/30 text-red-400 hover:bg-red-500/10",
            onClick: () => ue.warning(`Delete confirmation required for ${company.name}`),
            "data-ocid": "btn-delete-company",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
              "Delete"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: `text-xs border gap-1.5 ${STATUS_COLORS[company.status]}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-1.5 h-1.5 rounded-full ${company.status === "active" ? "bg-emerald-400" : company.status === "trial" ? "bg-blue-400" : company.status === "suspended" ? "bg-orange-400" : "bg-red-400"}`
                }
              ),
              company.status.toUpperCase()
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `text-xs border ${PLAN_COLORS[company.plan]}`, children: [
          company.plan,
          " PLAN"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-muted/30 text-muted-foreground border-border/30", children: [
          REGION_FLAGS[company.region],
          " ",
          company.region,
          " ·",
          " ",
          company.country
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-display uppercase tracking-wider text-muted-foreground/60", children: "Contact" }),
        [
          { icon: Mail, val: company.contactEmail },
          { icon: Phone, val: company.contactPhone },
          { icon: MapPin, val: company.address ?? company.country },
          { icon: Globe, val: company.domain }
        ].map(({ icon: Icon, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: val })
        ] }, val))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-display uppercase tracking-wider text-muted-foreground/60", children: "Subscription" }),
        [
          { label: "Plan", val: `${company.plan}` },
          { label: "MRR", val: `$${mrr.toLocaleString()}/mo` },
          { label: "Onboarded", val: fmtDate(company.onboardedAt) },
          { label: "Last Active", val: fmtDate(company.lastActiveAt) }
        ].map(({ label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-24", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: val })
        ] }, label))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-display uppercase tracking-wider text-muted-foreground/60", children: "Quick Stats" }),
        [
          {
            icon: Server,
            label: "Devices",
            val: fmtNum(company.devicesUsed, true)
          },
          { icon: Users, label: "Users", val: fmtNum(company.activeUsers) },
          {
            icon: Bell,
            label: "Alerts",
            val: fmtNum(company.totalAlerts, true)
          },
          { icon: FileText, label: "Orders", val: fmtNum(orders.length) }
        ].map(({ icon: Icon, label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-16", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium font-mono", children: val })
        ] }, label))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 overflow-x-auto noc-scrollbar pb-0.5", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(id),
        className: `flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-smooth ${activeTab === id ? "bg-primary/15 text-primary border border-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
        "data-ocid": `tab-${id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
          label
        ]
      },
      id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { company, usage }),
      activeTab === "usage" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsageTab, { company }),
      activeTab === "billing" && /* @__PURE__ */ jsxRuntimeExports.jsx(BillingTab, { invoices }),
      activeTab === "activity" && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTab, { auditEvents, activities }),
      activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, { users })
    ] })
  ] });
}
export {
  CompanyDetail as default
};
