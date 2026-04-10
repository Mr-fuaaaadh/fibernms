import { j as jsxRuntimeExports, ay as FeatureFlag, r as reactExports, aq as Plan, at as Building2, aE as Crown, f as Activity, T as TriangleAlert, h as Cpu, ai as Search, aF as Users, b as cn, a7 as TrendingUp, X, _ as Clock, a4 as ChevronRight } from "./index-DMP4-mtx.js";
import { F as FeatureGate } from "./PlanComparisonModal-CZLqIdr2.js";
import { B as Button } from "./button-UHhb8Ywf.js";
import { P as PlanBadge } from "./PlanBadge-DczuQpNB.js";
import { C as Checkbox } from "./checkbox-CBn5iX7M.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-ByzkkF_i.js";
import { I as Input } from "./input-C_CA5Phm.js";
import { L as Label } from "./label-DwgwfxAM.js";
import { S as ScrollArea } from "./scroll-area-oI9YyVZa.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bm9uRnH9.js";
import { S as Separator } from "./separator-Cj9LDgnR.js";
import { T as Textarea } from "./textarea-gKno9vAt.js";
import { c as MOCK_TENANTS } from "./billingMockData-BWOE6p-K.js";
import { P as Plus } from "./plus-DCb2oS-8.js";
import { E as Eye } from "./eye-CfRQfzVE.js";
import { P as Pencil } from "./pencil-LUI4mNir.js";
import { a as Pause, P as Play } from "./play-CYYWxWzB.js";
import { T as Trash2 } from "./trash-2-DuuGPW0x.js";
import "./useFeature-C3vRndnl.js";
import "./lock-keyhole-C_b0UBtu.js";
import "./check-Dyj5XuZ4.js";
import "./index-CTRQgjF2.js";
import "./index-Dgj74BqG.js";
import "./index-Bz5V_vz8.js";
import "./index-IXOTxK3N.js";
import "./chevron-up-DkQp1a8O.js";
const MOCK_USERS = [
  {
    id: "u1",
    name: "Sarah Kim",
    email: "s.kim@telecorp.com",
    role: "Admin",
    lastLogin: "2 min ago"
  },
  {
    id: "u2",
    name: "Marcus Reyes",
    email: "m.reyes@telecorp.com",
    role: "NOC Engineer",
    lastLogin: "1 hr ago"
  },
  {
    id: "u3",
    name: "Priya Nair",
    email: "p.nair@telecorp.com",
    role: "Analyst",
    lastLogin: "3 hrs ago"
  },
  {
    id: "u4",
    name: "David Chen",
    email: "d.chen@telecorp.com",
    role: "Viewer",
    lastLogin: "Yesterday"
  },
  {
    id: "u5",
    name: "Elena Vasquez",
    email: "e.vasquez@telecorp.com",
    role: "NOC Engineer",
    lastLogin: "2 days ago"
  }
];
const MOCK_PLAN_HISTORY = [
  { plan: Plan.ULTRA, date: "Jan 2025", event: "Upgraded to Ultra" },
  { plan: Plan.ENTERPRISE, date: "Jun 2024", event: "Upgraded to Enterprise" },
  {
    plan: Plan.PROFESSIONAL,
    date: "Dec 2023",
    event: "Started on Professional"
  }
];
function formatDeviceCount(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const STATUS_META = {
  active: {
    label: "Active",
    classes: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
  },
  paused: {
    label: "Paused",
    classes: "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400"
  },
  expired: {
    label: "Expired",
    classes: "bg-rose-500/15 text-rose-600 border-rose-500/30 dark:text-rose-400"
  }
};
function StatusBadge({ status }) {
  const meta = STATUS_META[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center border text-[11px] font-medium px-2 py-0.5 rounded-full gap-1",
        meta.classes
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn("w-1.5 h-1.5 rounded-full", {
              "bg-emerald-500": status === "active",
              "bg-amber-500": status === "paused",
              "bg-rose-500": status === "expired"
            })
          }
        ),
        meta.label
      ]
    }
  );
}
function DeviceProgress({ used, limit }) {
  const pct = limit > 0 ? Math.min(100, used / limit * 100) : 0;
  const color = pct >= 90 ? "bg-rose-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-[96px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-mono text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDeviceCount(used) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: limit >= 1e7 ? "∞" : formatDeviceCount(limit) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn("h-full rounded-full transition-all", color),
        style: { width: `${pct}%` }
      }
    ) })
  ] });
}
function StatCard({
  label,
  value,
  icon: Icon,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("p-2 rounded-lg", accent ?? "bg-primary/10"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Icon,
      {
        className: cn("w-4 h-4", accent ? "text-foreground" : "text-primary")
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium uppercase tracking-wider", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground font-mono leading-tight", children: value })
    ] })
  ] });
}
function CreateTenantModal({
  open,
  onClose,
  onCreate
}) {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [plan, setPlan] = reactExports.useState(Plan.PROFESSIONAL);
  const [deviceLimit, setDeviceLimit] = reactExports.useState("10000");
  const [trialDays, setTrialDays] = reactExports.useState("30");
  const [notes, setNotes] = reactExports.useState("");
  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;
    onCreate({
      name: name.trim(),
      adminEmail: email.trim(),
      plan,
      deviceLimit: Number.parseInt(deviceLimit, 10) || 1e4,
      status: "active"
    });
    setName("");
    setEmail("");
    setPlan(Plan.PROFESSIONAL);
    setDeviceLimit("10000");
    setTrialDays("30");
    setNotes("");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-primary" }),
      "Create New Tenant"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "tenant-name",
              className: "text-muted-foreground text-xs",
              children: "Tenant Name *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tenant-name",
              placeholder: "Acme ISP Ltd.",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "bg-background border-input",
              "data-ocid": "create-tenant-name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "admin-email",
              className: "text-muted-foreground text-xs",
              children: "Admin Email *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "admin-email",
              type: "email",
              placeholder: "admin@acme.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "bg-background border-input",
              "data-ocid": "create-tenant-email"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-muted-foreground text-xs", children: "Initial Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: plan, onValueChange: (v) => setPlan(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "bg-background border-input",
                "data-ocid": "create-tenant-plan",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(Plan).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p.charAt(0) + p.slice(1).toLowerCase() }, p)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "device-limit",
              className: "text-muted-foreground text-xs",
              children: "Device Limit Override"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "device-limit",
              type: "number",
              value: deviceLimit,
              onChange: (e) => setDeviceLimit(e.target.value),
              className: "bg-background border-input font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "trial-days",
              className: "text-muted-foreground text-xs",
              children: "Trial Duration (days)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "trial-days",
              type: "number",
              value: trialDays,
              onChange: (e) => setTrialDays(e.target.value),
              className: "bg-background border-input font-mono"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", className: "text-muted-foreground text-xs", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "notes",
            placeholder: "Optional onboarding notes...",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            className: "bg-background border-input text-sm resize-none h-20"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, className: "border-border", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSubmit,
          disabled: !name.trim() || !email.trim(),
          "data-ocid": "create-tenant-submit",
          children: "Create Tenant"
        }
      )
    ] })
  ] }) });
}
function DeleteConfirmDialog({
  tenant,
  onClose,
  onConfirm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!tenant, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-rose-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
      "Delete Tenant"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground py-2", children: [
      "Permanently delete",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: tenant == null ? void 0 : tenant.name }),
      "? All associated data, devices, and configurations will be lost. This action cannot be undone."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, className: "border-border", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          onClick: onConfirm,
          "data-ocid": "delete-tenant-confirm",
          children: "Delete"
        }
      )
    ] })
  ] }) });
}
function TenantDetailDrawer({
  tenant,
  onClose,
  onChangePlan,
  onToggleSuspend
}) {
  const [changePlanOpen, setChangePlanOpen] = reactExports.useState(false);
  const [selectedPlan, setSelectedPlan] = reactExports.useState(
    (tenant == null ? void 0 : tenant.plan) ?? Plan.PROFESSIONAL
  );
  const apiUsage = tenant ? Math.floor(tenant.deviceCount / tenant.deviceLimit * 85e4) : 0;
  const workflowCount = tenant ? Math.floor(tenant.deviceCount / 5e3) + 3 : 0;
  const alertCount = tenant ? Math.floor(tenant.deviceCount / 1e4) * 14 + 7 : 0;
  if (!tenant) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "fixed inset-y-0 right-0 z-50 w-[420px] max-w-full bg-card border-l border-border shadow-2xl flex flex-col transition-transform duration-300"
      ),
      "aria-label": `Tenant details: ${tenant.name}`,
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-card/80 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-sm truncate", children: tenant.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: tenant.adminEmail })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "p-1.5 rounded-lg hover:bg-muted transition-colors",
              "aria-label": "Close panel",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: tenant.plan, size: "lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tenant.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground ml-auto", children: [
              "ID: ",
              tenant.id
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Usage Statistics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: [
              {
                label: "Devices",
                value: `${formatDeviceCount(tenant.deviceCount)} / ${tenant.deviceLimit >= 1e7 ? "∞" : formatDeviceCount(tenant.deviceLimit)}`,
                icon: Cpu,
                pct: tenant.deviceCount / tenant.deviceLimit * 100
              },
              {
                label: "API Calls",
                value: `${formatDeviceCount(apiUsage)} / 1M`,
                icon: Activity,
                pct: apiUsage / 1e6 * 100
              },
              {
                label: "Workflows",
                value: String(workflowCount),
                icon: TrendingUp,
                pct: null
              },
              {
                label: "Active Alerts",
                value: String(alertCount),
                icon: TriangleAlert,
                pct: null
              }
            ].map(({ label, value, icon: Icon, pct }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-muted/40 border border-border rounded-lg p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold text-foreground", children: value }),
                  pct !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 mt-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "h-full rounded-full",
                        pct >= 90 ? "bg-rose-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500"
                      ),
                      style: { width: `${Math.min(100, pct)}%` }
                    }
                  ) })
                ]
              },
              label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Tenant Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-sm", children: [
              { label: "Created", value: formatDate(tenant.createdAt) },
              {
                label: "Device Limit",
                value: tenant.deviceLimit >= 1e7 ? "Unlimited" : formatDeviceCount(tenant.deviceLimit)
              },
              {
                label: "Status",
                value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tenant.status })
              }
            ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between py-1.5 border-b border-border/50 last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground text-xs font-medium", children: value })
                ]
              },
              label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Plan History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1.5 top-1 bottom-1 w-px bg-border" }),
              MOCK_PLAN_HISTORY.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative flex items-start gap-2.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-3 top-1 w-2 h-2 rounded-full bg-primary border-2 border-card" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: entry.plan, size: "sm" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
                          entry.date
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: entry.event })
                    ] })
                  ]
                },
                entry.date
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: [
              "Users",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-mono", children: [
                "(",
                MOCK_USERS.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: MOCK_USERS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/30 border border-border/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: u.name.charAt(0) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: u.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: u.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded", children: u.role }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: u.lastLogin })
                  ] })
                ]
              },
              u.id
            )) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t border-border bg-card/80 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2", children: "Quick Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "border-border text-xs",
                onClick: () => setChangePlanOpen(true),
                "data-ocid": "drawer-change-plan",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 mr-1" }),
                  "Change Plan"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "border-border text-xs",
                onClick: () => onToggleSuspend(tenant),
                "data-ocid": "drawer-suspend",
                children: [
                  tenant.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3 mr-1" }),
                  tenant.status === "active" ? "Suspend" : "Resume"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "border-border text-xs",
                "data-ocid": "drawer-view-billing",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 mr-1" }),
                  "View Billing"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: changePlanOpen,
            onOpenChange: (o) => !o && setChangePlanOpen(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-foreground text-sm", children: [
                "Change Plan — ",
                tenant.name
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Select New Plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: selectedPlan,
                    onValueChange: (v) => setSelectedPlan(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(Plan).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p.charAt(0) + p.slice(1).toLowerCase() }, p)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setChangePlanOpen(false),
                    className: "border-border",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => {
                      onChangePlan(tenant, selectedPlan);
                      setChangePlanOpen(false);
                    },
                    "data-ocid": "confirm-change-plan",
                    children: "Apply"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function BulkActionsBar({
  count,
  onSuspend,
  onChangePlan,
  onClear
}) {
  if (count === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5 bg-primary/10 border border-primary/30 rounded-xl text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-primary", children: [
      count,
      " tenant",
      count > 1 ? "s" : "",
      " selected"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4 bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "border-border h-7 text-xs",
        onClick: onSuspend,
        "data-ocid": "bulk-suspend",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3 mr-1" }),
          "Bulk Suspend"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "border-border h-7 text-xs",
        onClick: onChangePlan,
        "data-ocid": "bulk-change-plan",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 mr-1" }),
          "Change Plan"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onClear,
        className: "ml-auto p-1 hover:bg-muted rounded",
        "aria-label": "Clear selection",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
      }
    )
  ] });
}
function TenantsContent() {
  const [tenants, setTenants] = reactExports.useState(MOCK_TENANTS);
  const [search, setSearch] = reactExports.useState("");
  const [planFilter, setPlanFilter] = reactExports.useState("ALL");
  const [statusFilter, setStatusFilter] = reactExports.useState("ALL");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [detailTenant, setDetailTenant] = reactExports.useState(null);
  const [bulkChangePlanOpen, setBulkChangePlanOpen] = reactExports.useState(false);
  const [bulkPlan, setBulkPlan] = reactExports.useState(Plan.PROFESSIONAL);
  const stats = reactExports.useMemo(
    () => ({
      total: tenants.length,
      active: tenants.filter((t) => t.status === "active").length,
      paused: tenants.filter(
        (t) => t.status === "paused" || t.status === "expired"
      ).length,
      devices: tenants.reduce((s, t) => s + t.deviceCount, 0)
    }),
    [tenants]
  );
  const filtered = reactExports.useMemo(
    () => tenants.filter((t) => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.adminEmail.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (planFilter !== "ALL" && t.plan !== planFilter) return false;
      if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
      return true;
    }),
    [tenants, search, planFilter, statusFilter]
  );
  const allSelected = filtered.length > 0 && filtered.every((t) => selected.has(t.id));
  const someSelected = filtered.some((t) => selected.has(t.id));
  const toggleAll = reactExports.useCallback(() => {
    if (allSelected) {
      setSelected((prev) => {
        const n = new Set(prev);
        for (const t of filtered) n.delete(t.id);
        return n;
      });
    } else {
      setSelected((prev) => {
        const n = new Set(prev);
        for (const t of filtered) n.add(t.id);
        return n;
      });
    }
  }, [allSelected, filtered]);
  const toggleOne = reactExports.useCallback((id) => {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);
  const handleCreate = (data) => {
    const newTenant = {
      ...data,
      id: `t-${Date.now()}`,
      createdAt: Date.now(),
      deviceCount: 0
    };
    setTenants((prev) => [newTenant, ...prev]);
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    setTenants((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(deleteTarget.id);
      return n;
    });
    if ((detailTenant == null ? void 0 : detailTenant.id) === deleteTarget.id) setDetailTenant(null);
    setDeleteTarget(null);
  };
  const handleToggleSuspend = reactExports.useCallback((tenant) => {
    setTenants(
      (prev) => prev.map(
        (t) => t.id === tenant.id ? { ...t, status: t.status === "active" ? "paused" : "active" } : t
      )
    );
    setDetailTenant(
      (prev) => (prev == null ? void 0 : prev.id) === tenant.id ? { ...prev, status: prev.status === "active" ? "paused" : "active" } : prev
    );
  }, []);
  const handleChangePlan = reactExports.useCallback((tenant, plan) => {
    setTenants(
      (prev) => prev.map((t) => t.id === tenant.id ? { ...t, plan } : t)
    );
    setDetailTenant(
      (prev) => (prev == null ? void 0 : prev.id) === tenant.id ? { ...prev, plan } : prev
    );
  }, []);
  const handleBulkSuspend = () => {
    setTenants(
      (prev) => prev.map(
        (t) => selected.has(t.id) ? { ...t, status: "paused" } : t
      )
    );
    setSelected(/* @__PURE__ */ new Set());
  };
  const handleBulkChangePlan = () => {
    setTenants(
      (prev) => prev.map((t) => selected.has(t.id) ? { ...t, plan: bulkPlan } : t)
    );
    setSelected(/* @__PURE__ */ new Set());
    setBulkChangePlanOpen(false);
  };
  const selectedCount = selected.size;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-rose-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground tracking-tight", children: "Tenant Management" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 text-[10px] font-bold uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-2.5 h-2.5" }),
                "Powered by ULTRA"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage all tenants, plans, and device quotas across the platform." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setCreateOpen(true),
            className: "gap-1.5",
            "data-ocid": "open-create-tenant",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Create Tenant"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Tenants",
            value: stats.total,
            icon: Building2,
            accent: "bg-primary/10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Active",
            value: stats.active,
            icon: Activity,
            accent: "bg-emerald-500/10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Paused / Expired",
            value: stats.paused,
            icon: TriangleAlert,
            accent: "bg-amber-500/10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Devices",
            value: formatDeviceCount(stats.devices),
            icon: Cpu,
            accent: "bg-violet-500/10"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-background border-b border-border flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search tenants or email…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-8 bg-card border-input h-9 text-sm",
            "data-ocid": "tenant-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: planFilter,
          onValueChange: (v) => setPlanFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-[140px] bg-card border-input h-9 text-sm",
                "data-ocid": "plan-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Plans" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ALL", children: "All Plans" }),
              Object.values(Plan).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p.charAt(0) + p.slice(1).toLowerCase() }, p))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => setStatusFilter(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-[130px] bg-card border-input h-9 text-sm",
                "data-ocid": "status-filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Status" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ALL", children: "All Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paused", children: "Paused" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "expired", children: "Expired" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
        filtered.length,
        " tenant",
        filtered.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 py-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BulkActionsBar,
        {
          count: selectedCount,
          onSuspend: handleBulkSuspend,
          onChangePlan: () => setBulkChangePlanOpen(true),
          onClear: () => setSelected(/* @__PURE__ */ new Set())
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[860px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: allSelected,
              "data-state": someSelected && !allSelected ? "indeterminate" : void 0,
              onCheckedChange: toggleAll,
              "aria-label": "Select all",
              "data-ocid": "select-all-tenants"
            }
          ) }),
          [
            "Tenant Name",
            "Plan",
            "Devices Used / Limit",
            "Admin Email",
            "Status",
            "Created",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
              children: h
            },
            h
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "td",
            {
              colSpan: 8,
              className: "py-16 text-center text-muted-foreground text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                "No tenants match your filters"
              ]
            }
          ) }),
          filtered.map((tenant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: cn(
                "border-b border-border/50 last:border-0 transition-colors hover:bg-muted/20",
                selected.has(tenant.id) && "bg-primary/5"
              ),
              "data-ocid": `tenant-row-${tenant.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    checked: selected.has(tenant.id),
                    onCheckedChange: () => toggleOne(tenant.id),
                    "aria-label": `Select ${tenant.name}`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground whitespace-nowrap", children: tenant.name })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: tenant.plan, size: "sm" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DeviceProgress,
                  {
                    used: tenant.deviceCount,
                    limit: tenant.deviceLimit
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground max-w-[160px] truncate", children: tenant.adminEmail }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tenant.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground font-mono whitespace-nowrap", children: formatDate(tenant.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDetailTenant(tenant),
                      className: "p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": `View ${tenant.name}`,
                      title: "View Details",
                      "data-ocid": `view-tenant-${idx}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors",
                      "aria-label": `Edit ${tenant.name}`,
                      title: "Edit",
                      "data-ocid": `edit-tenant-${idx}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleToggleSuspend(tenant),
                      className: cn(
                        "p-1.5 rounded transition-colors",
                        tenant.status === "active" ? "hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500" : "hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500"
                      ),
                      "aria-label": tenant.status === "active" ? `Suspend ${tenant.name}` : `Resume ${tenant.name}`,
                      title: tenant.status === "active" ? "Suspend" : "Resume",
                      "data-ocid": `toggle-suspend-${idx}`,
                      children: tenant.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(tenant),
                      className: "p-1.5 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors",
                      "aria-label": `Delete ${tenant.name}`,
                      title: "Delete",
                      "data-ocid": `delete-tenant-${idx}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }) })
              ]
            },
            tenant.id
          ))
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateTenantModal,
      {
        open: createOpen,
        onClose: () => setCreateOpen(false),
        onCreate: handleCreate
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmDialog,
      {
        tenant: deleteTarget,
        onClose: () => setDeleteTarget(null),
        onConfirm: handleDelete
      }
    ),
    detailTenant && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          role: "button",
          tabIndex: 0,
          className: "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm",
          onClick: () => setDetailTenant(null),
          onKeyDown: (e) => e.key === "Escape" && setDetailTenant(null),
          "aria-label": "Close tenant detail panel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TenantDetailDrawer,
        {
          tenant: detailTenant,
          onClose: () => setDetailTenant(null),
          onChangePlan: handleChangePlan,
          onToggleSuspend: handleToggleSuspend
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: bulkChangePlanOpen,
        onOpenChange: (o) => !o && setBulkChangePlanOpen(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-foreground text-sm", children: [
            "Bulk Change Plan — ",
            selectedCount,
            " tenant",
            selectedCount > 1 ? "s" : ""
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Select New Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: bulkPlan,
                onValueChange: (v) => setBulkPlan(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(Plan).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p.charAt(0) + p.slice(1).toLowerCase() }, p)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setBulkChangePlanOpen(false),
                className: "border-border",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleBulkChangePlan,
                "data-ocid": "bulk-change-plan-confirm",
                children: "Apply to All"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function Tenants() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FeatureGate,
    {
      feature: FeatureFlag.MULTI_TENANT,
      mode: "replace",
      featureLabel: "Multi-Tenant Management",
      description: "Multi-tenant management is an exclusive ULTRA plan feature. Upgrade to provision, configure, and monitor all your tenants from a single control plane.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TenantsContent, {})
    }
  );
}
export {
  Tenants as default
};
