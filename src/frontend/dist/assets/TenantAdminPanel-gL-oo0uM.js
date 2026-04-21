import { c as createLucideIcon, aQ as useParams, as as useAuthStore, r as reactExports, j as jsxRuntimeExports, m as motion, aA as Building2, aP as ArrowLeft, aL as Users, az as CreditCard, am as Workflow, aG as Settings, A as AnimatePresence, af as Badge, ac as Server, Z as Zap, p as Activity, B as Bell, aH as Palette, aF as Key, n as ChevronRight, al as Map, T as TriangleAlert } from "./index-iFuWQqSU.js";
import { G as GlassCard } from "./GlassCard-D9su5mrt.js";
import { B as Button } from "./button-ChfDbElx.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CJtLg0Pk.js";
import { I as Input } from "./input-bJavJW7u.js";
import { L as Label } from "./label-DnWKNMjL.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BmN8obgD.js";
import { S as Switch } from "./switch-CezfuvYK.js";
import { m as mockCompanies, g as getCompanyById, a as getUsersByCompany, b as getInvoicesByCompany, c as getUsageByCompany } from "./superAdminMockData-SJ6Z2k0y.js";
import { u as ue } from "./index-Dn5KkDgn.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-BBo0ANfF.js";
import { P as Pen } from "./pen-X0eq0UUq.js";
import { U as UserPlus, a as UserMinus, b as UserCheck } from "./user-plus-DXyOjfcA.js";
import { P as Plus } from "./plus-C2QLaOJP.js";
import { E as ExternalLink } from "./external-link-Cdbk5ZUu.js";
import { W as Webhook } from "./webhook-BlX2P9Tx.js";
import { G as Globe } from "./globe-BUf4BFEU.js";
import { M as Monitor } from "./monitor-BZifqgSa.js";
import "./index-VHZcaeB2.js";
import "./index-IXOTxK3N.js";
import "./index-DwV7JGiz.js";
import "./index-BWs8SA4K.js";
import "./check-BoirFqbD.js";
import "./chevron-up-CVJK9q_e.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$1);
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
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
];
const PenTool = createLucideIcon("pen-tool", __iconNode);
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function fmtCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
}
function fmtRelative(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 36e5);
  if (h < 1) return `${Math.floor(diff / 6e4)}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function initials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function usageColor(pct) {
  if (pct >= 90)
    return {
      bar: "bg-red-500",
      text: "text-red-400",
      badge: "bg-red-500/15 text-red-400 border-red-500/30"
    };
  if (pct >= 70)
    return {
      bar: "bg-amber-500",
      text: "text-amber-400",
      badge: "bg-amber-500/15 text-amber-400 border-amber-500/30"
    };
  return {
    bar: "bg-emerald-500",
    text: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  };
}
const PLAN_COLORS = {
  BASIC: "bg-muted/40 text-muted-foreground border-border",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const PLAN_PRICE = {
  BASIC: "$200/mo",
  PROFESSIONAL: "$500/mo",
  ENTERPRISE: "$2,000/mo",
  ULTRA: "$5,000/mo"
};
const MOCK_WORKFLOWS = [
  {
    id: "wf1",
    name: "Alert Response Automation",
    status: true,
    lastRun: "2026-04-09T14:22:00Z",
    triggers: 42
  },
  {
    id: "wf2",
    name: "Daily SLA Report",
    status: true,
    lastRun: "2026-04-10T06:00:00Z",
    triggers: 18
  },
  {
    id: "wf3",
    name: "Fiber Cut Escalation",
    status: false,
    lastRun: "2026-04-07T11:15:00Z",
    triggers: 7
  },
  {
    id: "wf4",
    name: "NOC Shift Handover",
    status: true,
    lastRun: "2026-04-10T08:00:00Z",
    triggers: 30
  },
  {
    id: "wf5",
    name: "Capacity Threshold Alert",
    status: false,
    lastRun: "2026-04-05T09:45:00Z",
    triggers: 5
  }
];
const TIMEZONES = [
  "UTC",
  "UTC+05:30 (IST)",
  "UTC-05:00 (EST)",
  "UTC-08:00 (PST)",
  "UTC+01:00 (CET)",
  "UTC+09:00 (JST)",
  "UTC+08:00 (SGT)",
  "UTC+11:00 (AEST)"
];
function CompanySelector({
  current,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: current.id, onValueChange: onChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectTrigger,
      {
        className: "bg-background border-input w-56 text-sm",
        "data-ocid": "company-selector",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border max-h-72 overflow-y-auto", children: mockCompanies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, className: "text-xs", children: c.name }, c.id)) })
  ] });
}
function InviteUserModal({
  open,
  onClose
}) {
  const [email, setEmail] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("NOC Operator");
  function handleSubmit(e) {
    e.preventDefault();
    ue.success("Invitation sent", {
      description: `Invite sent to ${email} as ${role}`
    });
    setEmail("");
    setRole("NOC Operator");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-primary" }),
      "Invite User"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Email Address *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: email,
            onChange: (e) => setEmail(e.target.value),
            type: "email",
            placeholder: "engineer@company.com",
            className: "bg-background border-input",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Assign Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: setRole, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: ["Admin", "Network Engineer", "NOC Operator", "Viewer"].map(
            (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            className: "flex-1 border-border",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "flex-1 bg-primary text-primary-foreground",
            "data-ocid": "invite-user-submit",
            children: "Send Invite"
          }
        )
      ] })
    ] })
  ] }) });
}
const ROLE_BADGE = {
  Admin: "bg-red-500/15 text-red-400 border-red-500/30",
  "Network Engineer": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "NOC Operator": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Viewer: "bg-muted/40 text-muted-foreground border-border"
};
function UsersTab({ users }) {
  const [inviteOpen, setInviteOpen] = reactExports.useState(false);
  const [localUsers, setLocalUsers] = reactExports.useState(users.slice(0, 20));
  function disableUser(id) {
    setLocalUsers(
      (prev) => prev.map(
        (u) => u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u
      )
    );
    ue.success("User status updated");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        users.length,
        " users in this organization"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setInviteOpen(true),
          className: "bg-primary text-primary-foreground gap-1.5",
          "data-ocid": "invite-user-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
            "Invite User"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/50", children: ["User", "Email", "Role", "Status", "Last Login", "Actions"].map(
        (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest",
            children: h
          },
          h
        )
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: localUsers.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: `border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors ${i % 2 === 0 ? "bg-muted/5" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: initials(user.name) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground truncate max-w-[140px]", children: user.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground truncate max-w-[160px]", children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs px-2 py-0.5 border ${ROLE_BADGE[user.role] ?? "bg-muted text-foreground border-border"}`,
                children: user.role
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs px-2 py-0.5 border ${user.status === "active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted/40 text-muted-foreground border-border"}`,
                children: user.status
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground font-mono", children: fmtRelative(user.lastLogin) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => disableUser(user.id),
                className: "text-xs text-muted-foreground hover:text-foreground transition-colors",
                "data-ocid": `user-toggle-${user.id}`,
                title: user.status === "active" ? "Disable user" : "Enable user",
                children: user.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" })
              }
            ) }) })
          ]
        },
        user.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InviteUserModal, { open: inviteOpen, onClose: () => setInviteOpen(false) })
  ] });
}
function UsageCard({
  label,
  used,
  limit,
  icon: Icon
}) {
  const pct = Math.min(100, Math.round(used / limit * 100));
  const { bar, text, badge } = usageColor(pct);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `text-xs px-2 border ${badge}`, children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1.5 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-bold font-display ${text}`, children: used.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground pb-1", children: [
        "/ ",
        limit.toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${bar}`,
        style: { width: `${pct}%` }
      }
    ) }),
    pct >= 80 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-400 mt-2 flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
      pct >= 90 ? "Critical — approaching limit" : "Warning — consider upgrading"
    ] })
  ] });
}
function UsageTab({ usage }) {
  const cards = [
    {
      label: "Devices",
      used: usage.devices.used,
      limit: usage.devices.limit,
      icon: Server
    },
    {
      label: "API Calls",
      used: usage.api.used,
      limit: usage.api.limit,
      icon: Zap
    },
    {
      label: "Data (GB)",
      used: usage.data.used,
      limit: usage.data.limit,
      icon: Activity
    },
    {
      label: "Alerts",
      used: usage.alerts.used,
      limit: usage.alerts.limit,
      icon: Bell
    }
  ];
  const trend = reactExports.useMemo(() => {
    const base = Math.max(1, usage.devices.used - 500);
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      devices: Math.round(
        base + (usage.devices.used - base) * (i / 29) + Math.sin(i * 0.5) * 50
      )
    }));
  }, [usage]);
  const maxDevices = Math.max(...trend.map((t) => t.devices));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(UsageCard, { ...c }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4", children: "Device Growth — Last 30 Days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-0.5 h-20", children: trend.map(({ day, devices }) => {
        const h = Math.round(devices / maxDevices * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 bg-primary/30 hover:bg-primary/60 rounded-t transition-colors cursor-default",
            style: { height: `${h}%` },
            title: `Day ${day}: ${devices.toLocaleString()} devices`
          },
          day
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1.5 text-[10px] text-muted-foreground font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "30d ago" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Today" })
      ] })
    ] })
  ] });
}
const STATUS_BADGE = {
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  overdue: "bg-red-500/15 text-red-400 border-red-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30"
};
function BillingTab({
  company,
  invoices
}) {
  const recent = invoices.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4", children: "Current Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-foreground", children: company.plan }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs px-2 border ${PLAN_COLORS[company.plan]}`,
                  children: company.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              PLAN_PRICE[company.plan],
              " · Renews",
              " ",
              fmtDate(company.lastActiveAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "border-border text-xs",
              "data-ocid": "downgrade-plan-btn",
              children: "Downgrade"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "bg-primary text-primary-foreground text-xs",
              "data-ocid": "upgrade-plan-btn",
              children: "Upgrade Plan"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Billing Contact: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: company.contactEmail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Region: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: company.region })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "MRR: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: fmtCurrency(company.mrr) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Plan Limit: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            company.devicesLimit.toLocaleString(),
            " devices"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border/50 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest", children: "Recent Invoices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-xs text-primary hover:underline",
            "data-ocid": "view-all-invoices-btn",
            children: "View All"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/40", children: ["Invoice #", "Date", "Amount", "Status"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-2.5 text-left text-xs font-display text-muted-foreground uppercase tracking-widest",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border/20 last:border-0 hover:bg-muted/10 ${i % 2 === 0 ? "bg-muted/5" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs font-mono text-primary", children: inv.invoiceNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground", children: fmtDate(inv.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs font-semibold text-foreground", children: fmtCurrency(inv.total) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs px-2 border ${STATUS_BADGE[inv.status] ?? "bg-muted text-foreground border-border"}`,
                  children: inv.status
                }
              ) })
            ]
          },
          inv.id
        )) })
      ] })
    ] })
  ] });
}
function WorkflowsTab() {
  const [wfs, setWfs] = reactExports.useState(MOCK_WORKFLOWS);
  function toggleWf(id) {
    setWfs(
      (prev) => prev.map((w) => w.id === id ? { ...w, status: !w.status } : w)
    );
    ue.success("Workflow status updated");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        wfs.filter((w) => w.status).length,
        " of ",
        wfs.length,
        " workflows active"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/workflows", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "bg-primary text-primary-foreground gap-1.5",
          "data-ocid": "create-workflow-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Create New Workflow"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: wfs.map((wf, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${wf.status ? "bg-primary/15 border-primary/30" : "bg-muted/40 border-border"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Workflow,
                {
                  className: `w-4 h-4 ${wf.status ? "text-primary" : "text-muted-foreground"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: wf.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs px-2 border flex-shrink-0 ${wf.status ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted/40 text-muted-foreground border-border"}`,
                  children: wf.status ? "Active" : "Inactive"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Last run ",
              fmtRelative(wf.lastRun),
              " · ",
              wf.triggers,
              " triggers"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: wf.status,
                onCheckedChange: () => toggleWf(wf.id),
                "data-ocid": `wf-toggle-${wf.id}`,
                className: "scale-75 data-[state=checked]:bg-emerald-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/workflows", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-muted-foreground hover:text-foreground transition-colors",
                title: "Open in Workflow Builder",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] })
        ] })
      },
      wf.id
    )) })
  ] });
}
function SettingsTab() {
  const [notifs, setNotifs] = reactExports.useState({
    billing: true,
    alerts: true,
    usage: false
  });
  const [tz, setTz] = reactExports.useState("UTC+05:30 (IST)");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-3.5 h-3.5" }),
        " Branding"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/20 hover:border-primary/50 transition-colors cursor-pointer",
            "data-ocid": "logo-upload-area",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "w-5 h-5 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Upload Company Logo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "PNG or SVG, max 2MB. White background recommended." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-2 border-border text-xs",
              "data-ocid": "upload-logo-btn",
              children: "Choose File"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground w-28 flex-shrink-0", children: "Primary Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"].map(
          (c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-6 h-6 rounded-full border-2 border-transparent hover:border-foreground transition-all",
              style: { backgroundColor: c },
              "aria-label": `Set color ${c}`
            },
            c
          )
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5" }),
        " Notifications"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
        {
          key: "billing",
          label: "Billing Alerts",
          desc: "Invoice reminders, payment failures, plan renewals"
        },
        {
          key: "alerts",
          label: "Network Alerts",
          desc: "Critical device failures, fiber cuts, outages"
        },
        {
          key: "usage",
          label: "Usage Warnings",
          desc: "Notify when device/API usage exceeds 80%"
        }
      ].map(({ key, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: notifs[key],
            onCheckedChange: (v) => {
              setNotifs((prev) => ({ ...prev, [key]: v }));
              ue.success(`${label} ${v ? "enabled" : "disabled"}`);
            },
            "data-ocid": `notif-${key}`
          }
        )
      ] }, key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-3.5 h-3.5" }),
        " Integrations"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/integrations", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer",
            "data-ocid": "goto-api-keys",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: "API Keys" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Manage REST API credentials" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground ml-auto" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/integrations", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer",
            "data-ocid": "goto-webhooks",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Webhook, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: "Webhooks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Configure event callbacks" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground ml-auto" })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
        " Timezone"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground w-24 flex-shrink-0", children: "Platform Timezone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tz, onValueChange: setTz, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "bg-background border-input w-64",
              "data-ocid": "timezone-selector",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: TIMEZONES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
        ] })
      ] })
    ] })
  ] });
}
function CompanyProfileCard({ company }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 flex items-start gap-5 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 text-xl font-bold font-display text-primary", children: initials(company.name) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-bold text-foreground", children: company.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs px-2 border ${PLAN_COLORS[company.plan]}`, children: company.plan }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `text-xs px-2 border ${company.status === "active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"}`,
            children: company.status
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 mt-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Domain: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: company.domain })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Region: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: company.region })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Contact: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: company.contactEmail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Renewal: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: fmtDate(company.lastActiveAt) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "border-border gap-1.5 flex-shrink-0",
        "data-ocid": "edit-company-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
          "Edit Profile"
        ]
      }
    )
  ] });
}
function QuickLinks() {
  const links = [
    { label: "NOC Map", to: "/", icon: Map },
    { label: "Devices", to: "/devices", icon: Server },
    { label: "Monitoring", to: "/monitoring", icon: Monitor }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap pt-2 border-t border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-display uppercase tracking-widest", children: "Quick Links:" }),
    links.map(({ label, to, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: to, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 text-xs text-primary hover:underline cursor-pointer",
        "data-ocid": `quick-link-${label.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
          label
        ]
      }
    ) }, to))
  ] });
}
function TenantAdminPanel() {
  var _a;
  const params = useParams({ strict: false });
  const isSuperAdmin = useAuthStore((s) => s.isSuperAdmin);
  const [selectedCompanyId, setSelectedCompanyId] = reactExports.useState(
    params.companyId ?? ((_a = mockCompanies[0]) == null ? void 0 : _a.id) ?? "company-0001"
  );
  const [activeTab, setActiveTab] = reactExports.useState("users");
  const company = reactExports.useMemo(
    () => getCompanyById(selectedCompanyId) ?? mockCompanies[0],
    [selectedCompanyId]
  );
  const users = reactExports.useMemo(
    () => getUsersByCompany(selectedCompanyId),
    [selectedCompanyId]
  );
  const invoices = reactExports.useMemo(
    () => getInvoicesByCompany(selectedCompanyId),
    [selectedCompanyId]
  );
  const usage = reactExports.useMemo(
    () => getUsageByCompany(selectedCompanyId) ?? {
      companyId: selectedCompanyId,
      companyName: company.name,
      plan: company.plan,
      devices: { used: company.devicesUsed, limit: company.devicesLimit },
      api: { used: company.apiUsed, limit: company.apiLimit },
      data: { used: company.dataUsedGB, limit: company.dataLimitGB },
      alerts: { used: company.alertsUsed, limit: company.alertsLimit }
    },
    [selectedCompanyId, company]
  );
  const TABS = [
    { id: "users", label: "Users", icon: Users },
    { id: "usage", label: "Usage", icon: ChartNoAxesColumn },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "workflows", label: "Workflows", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5 md:space-y-6 max-w-[1600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
                "Tenant Admin —",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: company.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider", children: "Company Administration Panel" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompanySelector,
              {
                current: company,
                onChange: setSelectedCompanyId
              }
            ),
            isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/super-admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "border-border gap-1.5",
                "data-ocid": "back-to-platform-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                  "Platform Admin"
                ]
              }
            ) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyProfileCard, { company })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-muted/30 p-1 rounded-xl w-fit border border-border/40 flex-wrap", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setActiveTab(id),
        "data-ocid": `tenant-tab-${id}`,
        className: `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-display font-medium transition-smooth ${activeTab === id ? "bg-card text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
          label
        ]
      },
      id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.2 },
        children: [
          activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, { users }),
          activeTab === "usage" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsageTab, { usage }),
          activeTab === "billing" && /* @__PURE__ */ jsxRuntimeExports.jsx(BillingTab, { company, invoices }),
          activeTab === "workflows" && /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowsTab, {}),
          activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsTab, {})
        ]
      },
      `${selectedCompanyId}-${activeTab}`
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QuickLinks, {})
  ] });
}
export {
  TenantAdminPanel as default
};
