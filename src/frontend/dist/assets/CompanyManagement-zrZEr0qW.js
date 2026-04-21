import { ae as useRouter, f as useIsMobile, r as reactExports, j as jsxRuntimeExports, aA as Building2, af as Badge, T as TriangleAlert, aq as Search, ax as Plan, aZ as ChevronLeft, n as ChevronRight, a_ as Skeleton, M as MapPin, az as CreditCard } from "./index-WMTkA9vU.js";
import { G as GlassCard } from "./GlassCard-C9SzWUJB.js";
import { B as Button } from "./button-Dag5mFLZ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-C4t-pVVa.js";
import { I as Input } from "./input-DnM8vr7C.js";
import { L as Label } from "./label-Da7mO3fc.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-JYQPMMWP.js";
import { S as Separator } from "./separator-CN8pQDsN.js";
import { M as MOCK_COMPANIES } from "./superAdminMockData-SJ6Z2k0y.js";
import { u as ue } from "./index-Sv7tHWaP.js";
import { D as Download } from "./download-BS2eeNqh.js";
import { P as Plus } from "./plus-B3byTnvG.js";
import { C as CircleCheck } from "./circle-check-mz2eb2S1.js";
import { C as CirclePause, a as CirclePlay } from "./circle-play-CZ04w3FH.js";
import { C as CircleX } from "./circle-x-DGCWIOzj.js";
import { P as Pen } from "./pen-Cu1AdkNr.js";
import { E as ExternalLink } from "./external-link-yCfDGu2k.js";
import { T as Trash2 } from "./trash-2-BFikOAxE.js";
import "./index-DL2W489r.js";
import "./index-IXOTxK3N.js";
import "./index-CJt-S02L.js";
import "./index-DfX1YDeV.js";
import "./check-CdzZhum6.js";
import "./chevron-up-85Kc7JlN.js";
const PAGE_SIZE = 20;
const REGIONS = ["All Regions", "India", "US", "EU", "APAC", "MENA"];
const PLANS = [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA];
const STATUSES = ["active", "trial", "suspended", "expired"];
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
  [Plan.BASIC]: "bg-muted/30 text-muted-foreground border-border/40",
  [Plan.PROFESSIONAL]: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  [Plan.ENTERPRISE]: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  [Plan.ULTRA]: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const PLAN_PRICES = {
  [Plan.BASIC]: 99,
  [Plan.PROFESSIONAL]: 499,
  [Plan.ENTERPRISE]: 1499,
  [Plan.ULTRA]: 4999
};
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
function getInitials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function exportToCSV(companies) {
  const headers = [
    "ID",
    "Name",
    "Domain",
    "Region",
    "Country",
    "Plan",
    "Status",
    "Devices Used",
    "Device Limit",
    "Active Users",
    "Monthly Revenue",
    "Onboarded At",
    "Contact"
  ].join(",");
  const rows = companies.map(
    (c) => [
      c.id,
      `"${c.name}"`,
      c.domain,
      c.region,
      c.country,
      c.plan,
      c.status,
      c.devicesUsed,
      c.deviceLimit,
      c.activeUsers,
      c.monthlyRevenue,
      fmtDate(c.onboardedAt),
      c.contactEmail
    ].join(",")
  );
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "companies-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function StatusDot({ status }) {
  const color = status === "active" ? "bg-emerald-400" : status === "trial" ? "bg-blue-400" : status === "suspended" ? "bg-orange-400" : "bg-red-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block w-1.5 h-1.5 rounded-full ${color}` });
}
function UsageBar({
  used,
  limit
}) {
  const pct = Math.round(used / limit * 100);
  const barColor = pct >= 90 ? "capacity-fill-critical" : pct >= 70 ? "capacity-fill-warning" : "capacity-fill-healthy";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden min-w-[60px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full ${barColor}`,
        style: { width: `${Math.min(pct, 100)}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground whitespace-nowrap", children: [
      fmtNum(used, true),
      "/",
      fmtNum(limit, true)
    ] })
  ] });
}
const EMPTY_FORM = {
  name: "",
  domain: "",
  subdomain: "",
  region: "India",
  country: "India",
  contactName: "",
  contactEmail: "",
  plan: Plan.PROFESSIONAL,
  status: "trial"
};
function toForm(c) {
  return {
    name: c.name,
    domain: c.domain,
    subdomain: c.subdomain,
    region: c.region,
    country: c.country,
    contactName: c.contactName ?? "",
    contactEmail: c.contactEmail,
    plan: c.plan,
    status: c.status
  };
}
function CompanyFormModal({
  mode,
  initialValues,
  onSave,
  onClose
}) {
  const [form, setForm] = reactExports.useState(initialValues);
  function field(key) {
    return {
      value: form[key],
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg glass-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-sm", children: mode === "create" ? "Create New Company" : "Edit Company" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Company Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            placeholder: "Acme Fiber Co.",
            ...field("name"),
            "data-ocid": "input-company-name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Domain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            placeholder: "acme.com",
            ...field("domain"),
            "data-ocid": "input-domain"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Subdomain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            placeholder: "noc.acme.com",
            ...field("subdomain"),
            "data-ocid": "input-subdomain"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Region" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.region,
            onValueChange: (v) => setForm((f) => ({ ...f, region: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs",
                  "data-ocid": "select-region",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["India", "US", "EU", "APAC", "MENA"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r, children: [
                REGION_FLAGS[r],
                " ",
                r
              ] }, r)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Country" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            placeholder: "India",
            ...field("country"),
            "data-ocid": "input-country"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Contact Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            placeholder: "John Doe",
            ...field("contactName"),
            "data-ocid": "input-contact-name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Contact Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            type: "email",
            placeholder: "admin@acme.com",
            ...field("contactEmail"),
            "data-ocid": "input-contact-email"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Initial Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.plan,
            onValueChange: (v) => setForm((f) => ({ ...f, plan: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", "data-ocid": "select-plan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.status,
            onValueChange: (v) => setForm((f) => ({ ...f, status: v })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs",
                  "data-ocid": "select-status",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onClose,
          className: "text-xs",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          className: "text-xs",
          disabled: !form.name.trim(),
          onClick: () => onSave(form),
          "data-ocid": "btn-save-company",
          children: mode === "create" ? "Create Company" : "Save Changes"
        }
      )
    ] })
  ] }) });
}
function ChangePlanModal({
  company,
  onSave,
  onClose
}) {
  const [selected, setSelected] = reactExports.useState(company.plan);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm glass-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-sm", children: "Change Subscription Plan" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Current plan:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: company.plan })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSelected(p),
          className: `w-full flex items-center justify-between p-3 rounded-lg border text-left transition-smooth ${selected === p ? "border-primary bg-primary/10" : "border-border/30 bg-muted/10 hover:bg-muted/20"}`,
          "data-ocid": `plan-option-${p.toLowerCase()}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: p }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                "$",
                PLAN_PRICES[p],
                "/month"
              ] })
            ] }),
            p === company.plan && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] bg-muted/40 text-muted-foreground", children: "Current" }),
            selected === p && p !== company.plan && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] bg-primary/20 text-primary", children: "Selected" })
          ]
        },
        p
      )) }),
      selected !== company.plan && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground bg-muted/20 p-2 rounded-md border border-border/20", children: "⚠ Proration: The difference between plans will be charged or credited on the next billing cycle." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onClose,
          className: "text-xs",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          className: "text-xs",
          disabled: selected === company.plan,
          onClick: () => onSave(selected),
          "data-ocid": "btn-confirm-plan",
          children: "Confirm Change"
        }
      )
    ] })
  ] }) });
}
function DeleteConfirmModal({
  company,
  onConfirm,
  onClose
}) {
  const [typed, setTyped] = reactExports.useState("");
  const match = typed.trim() === company.name.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm glass-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-sm text-destructive", children: "Delete Company" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
        "This will soft-delete",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: company.name }),
        " ",
        "and mark all associated data as expired. This action cannot be undone easily."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
          "Type",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: company.name }),
          " ",
          "to confirm"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "h-8 text-xs",
            placeholder: company.name,
            value: typed,
            onChange: (e) => setTyped(e.target.value),
            "data-ocid": "input-delete-confirm"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onClose,
          className: "text-xs",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "destructive",
          className: "text-xs",
          disabled: !match,
          onClick: onConfirm,
          "data-ocid": "btn-confirm-delete",
          children: "Delete Company"
        }
      )
    ] })
  ] }) });
}
function CompanyCard({
  company,
  index,
  onViewDetailPage,
  onEdit,
  onToggleStatus,
  onDelete
}) {
  const usagePct = Math.round(
    company.devicesUsed / Math.max(company.deviceLimit, 1) * 100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border/30 bg-card/60 backdrop-blur-sm p-4 space-y-3",
      "data-ocid": `company-card-${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 font-mono text-[11px] font-bold text-primary", children: getInitials(company.name) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onViewDetailPage,
                className: "text-sm font-semibold text-foreground hover:text-primary transition-colors text-left block truncate w-full",
                "data-ocid": `company-card-name-${index}`,
                children: company.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                REGION_FLAGS[company.region],
                " ",
                company.region
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[9px] font-mono border ${PLAN_COLORS[company.plan]}`,
                children: company.plan
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: `text-[9px] font-mono border gap-1 ${STATUS_COLORS[company.status]}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: company.status }),
                  company.status
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Device usage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
              usagePct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(UsageBar, { used: company.devicesUsed, limit: company.deviceLimit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 py-1.5 px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: fmtNum(company.activeUsers) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "users" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 py-1.5 px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: fmtNum(company.devicesUsed, true) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "devices" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/20 py-1.5 px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-400", children: company.monthlyRevenue > 0 ? `$${fmtNum(company.monthlyRevenue, true)}` : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "MRR" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1 border-t border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-9 flex-1 text-xs gap-1.5 min-w-0",
              onClick: onEdit,
              "data-ocid": `company-card-edit-${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3 flex-shrink-0" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-9 flex-1 text-xs gap-1.5 min-w-0",
              onClick: onToggleStatus,
              "data-ocid": `company-card-toggle-${index}`,
              children: company.status === "suspended" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3 h-3 flex-shrink-0 text-emerald-400" }),
                "Activate"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "w-3 h-3 flex-shrink-0 text-orange-400" }),
                "Suspend"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-9 flex-1 text-xs gap-1.5 min-w-0",
              onClick: onViewDetailPage,
              "data-ocid": `company-card-detail-${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 flex-shrink-0" }),
                "Details"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-9 w-9 text-muted-foreground hover:text-red-400 flex-shrink-0",
              onClick: onDelete,
              "aria-label": "Delete company",
              "data-ocid": `company-card-delete-${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function CompanyRow({
  company,
  onViewDetailPage,
  onEdit,
  onChangePlan,
  onToggleStatus,
  onDelete
}) {
  const highestPct = Math.round(
    company.devicesUsed / Math.max(company.deviceLimit, 1) * 100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border/20 hover:bg-muted/15 transition-colors group",
      "data-ocid": `company-row-${company.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-bold text-primary", children: getInitials(company.name) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onViewDetailPage,
                className: "text-xs font-medium text-foreground hover:text-primary transition-colors truncate max-w-[160px] block text-left",
                "data-ocid": `btn-view-company-${company.id}`,
                children: company.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate max-w-[160px]", children: company.domain })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: company.subdomain }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-xs text-muted-foreground whitespace-nowrap", children: [
          REGION_FLAGS[company.region],
          " ",
          company.region
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `text-[9px] font-mono border ${PLAN_COLORS[company.plan]}`,
            children: company.plan
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: `text-[9px] font-mono border gap-1 ${STATUS_COLORS[company.status]}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: company.status }),
              company.status
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 min-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsageBar, { used: company.devicesUsed, limit: company.deviceLimit }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            className: `text-[9px] font-mono ${highestPct >= 90 ? "bg-red-500/15 text-red-400 border-red-500/30" : highestPct >= 70 ? "bg-amber-500/15 text-amber-400 border-amber-500/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"}`,
            children: [
              highestPct,
              "%"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs font-mono text-right text-emerald-400 whitespace-nowrap", children: company.monthlyRevenue > 0 ? `$${fmtNum(company.monthlyRevenue)}` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground whitespace-nowrap", children: fmtDate(company.onboardedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-muted-foreground hover:text-primary",
              "aria-label": "View company details",
              onClick: onViewDetailPage,
              "data-ocid": `btn-detail-${company.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-muted-foreground hover:text-foreground",
              "aria-label": "Edit company",
              onClick: onEdit,
              "data-ocid": `btn-edit-${company.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-muted-foreground hover:text-blue-400",
              "aria-label": "Change plan",
              onClick: onChangePlan,
              "data-ocid": `btn-plan-${company.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-muted-foreground hover:text-amber-400",
              "aria-label": company.status === "suspended" ? "Activate company" : "Suspend company",
              onClick: onToggleStatus,
              "data-ocid": `btn-toggle-${company.id}`,
              children: company.status === "suspended" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-muted-foreground hover:text-red-400",
              "aria-label": "Delete company",
              onClick: onDelete,
              "data-ocid": `btn-delete-${company.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] }) })
      ]
    }
  );
}
function CompanyManagement() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const nav = (path) => router.navigate({ to: path });
  const [search, setSearch] = reactExports.useState("");
  const [planFilter, setPlanFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [regionFilter, setRegionFilter] = reactExports.useState("All Regions");
  const [page, setPage] = reactExports.useState(1);
  const [companies, setCompanies] = reactExports.useState(() => [
    ...MOCK_COMPANIES
  ]);
  const [modal, setModal] = reactExports.useState({ type: "none" });
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return companies.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q) && !c.domain.toLowerCase().includes(q) && !c.subdomain.toLowerCase().includes(q))
        return false;
      if (planFilter !== "all" && c.plan !== planFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (regionFilter !== "All Regions" && c.region !== regionFilter)
        return false;
      return true;
    });
  }, [companies, search, planFilter, statusFilter, regionFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const applySearch = (v) => {
    setSearch(v);
    setPage(1);
  };
  const applyPlan = (v) => {
    setPlanFilter(v);
    setPage(1);
  };
  const applyStatus = (v) => {
    setStatusFilter(v);
    setPage(1);
  };
  const applyRegion = (v) => {
    setRegionFilter(v);
    setPage(1);
  };
  const stats = reactExports.useMemo(
    () => ({
      total: companies.length,
      active: companies.filter((c) => c.status === "active").length,
      trial: companies.filter((c) => c.status === "trial").length,
      suspended: companies.filter((c) => c.status === "suspended").length,
      expired: companies.filter((c) => c.status === "expired").length
    }),
    [companies]
  );
  function handleCreate(form) {
    const newId = `co-${String(companies.length + 1).padStart(3, "0")}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newCompany = {
      id: newId,
      name: form.name.trim(),
      domain: form.domain.trim() || `${form.name.toLowerCase().replace(/\s+/g, "")}.com`,
      subdomain: form.subdomain.trim() || `noc.${form.name.toLowerCase().replace(/\s+/g, "")}.com`,
      region: form.region,
      country: form.country,
      plan: form.plan,
      status: form.status,
      createdAt: now,
      contactEmail: form.contactEmail.trim(),
      contactPhone: "",
      contactName: form.contactName.trim(),
      devicesUsed: 0,
      devicesLimit: {
        [Plan.BASIC]: 1e3,
        [Plan.PROFESSIONAL]: 1e4,
        [Plan.ENTERPRISE]: 1e5,
        [Plan.ULTRA]: 1e7
      }[form.plan],
      apiUsed: 0,
      apiLimit: {
        [Plan.BASIC]: 1e5,
        [Plan.PROFESSIONAL]: 1e6,
        [Plan.ENTERPRISE]: 1e7,
        [Plan.ULTRA]: 1e8
      }[form.plan],
      dataUsedGB: 0,
      dataLimitGB: {
        [Plan.BASIC]: 50,
        [Plan.PROFESSIONAL]: 500,
        [Plan.ENTERPRISE]: 5e3,
        [Plan.ULTRA]: 5e4
      }[form.plan],
      alertsUsed: 0,
      alertsLimit: {
        [Plan.BASIC]: 1e4,
        [Plan.PROFESSIONAL]: 1e5,
        [Plan.ENTERPRISE]: 1e6,
        [Plan.ULTRA]: 1e7
      }[form.plan],
      activeUsers: 1,
      totalAlerts: 0,
      mrr: form.status === "active" || form.status === "trial" ? PLAN_PRICES[form.plan] : 0,
      lastActiveAt: now,
      isSoftDeleted: false,
      // compat aliases
      deviceLimit: {
        [Plan.BASIC]: 1e3,
        [Plan.PROFESSIONAL]: 1e4,
        [Plan.ENTERPRISE]: 1e5,
        [Plan.ULTRA]: 1e7
      }[form.plan],
      alertsGenerated: 0,
      monthlyRevenue: form.status === "active" || form.status === "trial" ? PLAN_PRICES[form.plan] : 0,
      onboardedAt: now,
      lastActivity: now
    };
    setCompanies((prev) => [newCompany, ...prev]);
    setModal({ type: "none" });
    ue.success(`Company "${newCompany.name}" created successfully`);
  }
  function handleEdit(form) {
    if (modal.type !== "edit") return;
    const target = modal.company;
    setCompanies(
      (prev) => prev.map(
        (c) => c.id === target.id ? {
          ...c,
          name: form.name.trim(),
          domain: form.domain.trim(),
          subdomain: form.subdomain.trim(),
          region: form.region,
          country: form.country,
          contactEmail: form.contactEmail.trim(),
          contactName: form.contactName.trim(),
          plan: form.plan,
          status: form.status
        } : c
      )
    );
    setModal({ type: "none" });
    ue.success("Company updated successfully");
  }
  function handleChangePlan(plan) {
    if (modal.type !== "plan") return;
    const target = modal.company;
    setCompanies(
      (prev) => prev.map(
        (c) => c.id === target.id ? {
          ...c,
          plan,
          deviceLimit: {
            [Plan.BASIC]: 1e3,
            [Plan.PROFESSIONAL]: 1e4,
            [Plan.ENTERPRISE]: 1e5,
            [Plan.ULTRA]: 1e7
          }[plan],
          monthlyRevenue: c.status === "active" || c.status === "trial" ? PLAN_PRICES[plan] : 0
        } : c
      )
    );
    setModal({ type: "none" });
    ue.success(`Plan changed to ${plan}`);
  }
  function handleToggleStatus(company) {
    const next = company.status === "suspended" ? "active" : "suspended";
    const action = next === "suspended" ? "Suspended" : "Activated";
    setCompanies(
      (prev) => prev.map(
        (c) => c.id === company.id ? {
          ...c,
          status: next,
          monthlyRevenue: next === "active" ? PLAN_PRICES[c.plan] : 0
        } : c
      )
    );
    ue.success(`${action} company "${company.name}"`);
  }
  function handleDelete() {
    if (modal.type !== "delete") return;
    const target = modal.company;
    setCompanies(
      (prev) => prev.map(
        (c) => c.id === target.id ? { ...c, status: "expired", monthlyRevenue: 0 } : c
      )
    );
    setModal({ type: "none" });
    ue.success(`"${target.name}" has been removed`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-4 md:space-y-5 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-amber-400 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Company Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono text-xs", children: [
        stats.total,
        " tenants"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-9 text-xs gap-1.5",
            onClick: () => exportToCSV(filtered),
            "data-ocid": "btn-export-csv",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Export CSV" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "h-9 text-xs gap-1.5",
            onClick: () => setModal({ type: "create" }),
            "data-ocid": "btn-add-company",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add Company" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Add" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-3", children: [
      {
        label: "Total",
        val: stats.total,
        icon: Building2,
        cls: "text-blue-400",
        sub: "registered"
      },
      {
        label: "Active",
        val: stats.active,
        icon: CircleCheck,
        cls: "text-emerald-400",
        sub: "paying"
      },
      {
        label: "Trial",
        val: stats.trial,
        icon: TriangleAlert,
        cls: "text-blue-400",
        sub: "evaluating"
      },
      {
        label: "Suspended",
        val: stats.suspended,
        icon: CirclePause,
        cls: "text-orange-400",
        sub: "on hold"
      },
      {
        label: "Expired",
        val: stats.expired,
        icon: CircleX,
        cls: "text-red-400",
        sub: "churned"
      }
    ].map(({ label, val, icon: Icon, cls, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-lg flex items-center justify-center ${cls.replace("text-", "bg-").replace(/400|500/, "500/15")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${cls}` })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-display font-bold ${cls}`, children: val }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground leading-none", children: [
          label,
          " · ",
          sub
        ] })
      ] })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-3 md:p-4 space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-3 md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0 md:min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name, domain…",
            value: search,
            onChange: (e) => applySearch(e.target.value),
            className: "pl-9 h-10 md:h-8 text-xs bg-background/50",
            "data-ocid": "input-company-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: regionFilter, onValueChange: applyRegion, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-10 md:h-8 text-xs w-full sm:w-36 bg-background/50",
              "data-ocid": "filter-region",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Regions" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r, children: [
            r !== "All Regions" ? `${REGION_FLAGS[r]} ` : "",
            r
          ] }, r)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: planFilter, onValueChange: applyPlan, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-10 md:h-8 text-xs w-full sm:w-36 bg-background/50",
              "data-ocid": "filter-plan",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Plans" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Plans" }),
            PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: applyStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-10 md:h-8 text-xs w-full sm:w-36 bg-background/50",
              "data-ocid": "filter-status",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
            STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "capitalize", children: s }, s))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono md:ml-auto whitespace-nowrap", children: [
        filtered.length,
        " of ",
        companies.length
      ] })
    ] }),
    isMobile ? (
      /* ── Mobile Card List ── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "company-card-list", children: [
        paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-16 text-muted-foreground gap-3",
            "data-ocid": "empty-state-companies",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No companies match your filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs",
                  onClick: () => {
                    setSearch("");
                    setPlanFilter("all");
                    setStatusFilter("all");
                    setRegionFilter("All Regions");
                  },
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : paginated.map((company, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CompanyCard,
          {
            company,
            index: idx + 1,
            onViewDetailPage: () => nav(`/super-admin/companies/${company.id}`),
            onEdit: () => setModal({ type: "edit", company }),
            onToggleStatus: () => handleToggleStatus(company),
            onDelete: () => setModal({ type: "delete", company })
          },
          company.id
        )),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Page ",
            safePage,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "h-9 w-9",
                disabled: safePage === 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                "aria-label": "Previous page",
                "data-ocid": "btn-prev-page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "h-9 w-9",
                disabled: safePage === totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                "aria-label": "Next page",
                "data-ocid": "btn-next-page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ] })
    ) : (
      /* ── Desktop Table ── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Subdomain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Region" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider min-w-[140px]", children: "Devices" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Usage %" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "MRR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider", children: "Onboarded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-[140px]" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 10, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-16 text-muted-foreground gap-3",
              "data-ocid": "empty-state-companies",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No companies match your filters" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "text-xs",
                    onClick: () => {
                      setSearch("");
                      setPlanFilter("all");
                      setStatusFilter("all");
                      setRegionFilter("All Regions");
                    },
                    children: "Clear filters"
                  }
                )
              ]
            }
          ) }) }) : paginated.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CompanyRow,
            {
              company,
              onViewDetailPage: () => nav(`/super-admin/companies/${company.id}`),
              onEdit: () => setModal({ type: "edit", company }),
              onChangePlan: () => setModal({ type: "plan", company }),
              onToggleStatus: () => handleToggleStatus(company),
              onDelete: () => setModal({ type: "delete", company })
            },
            company.id
          )) })
        ] }) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Page ",
              safePage,
              " of ",
              totalPages,
              " · ",
              filtered.length,
              " companies"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-7 w-7",
                  disabled: safePage === 1,
                  onClick: () => setPage((p) => Math.max(1, p - 1)),
                  "aria-label": "Previous page",
                  "data-ocid": "btn-prev-page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
                }
              ),
              Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = totalPages <= 5 ? i + 1 : safePage <= 3 ? i + 1 : safePage >= totalPages - 2 ? totalPages - 4 + i : safePage - 2 + i;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPage(pg),
                    className: `h-7 w-7 rounded-md text-xs font-mono transition-smooth ${pg === safePage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/40"}`,
                    "data-ocid": `btn-page-${pg}`,
                    children: pg
                  },
                  pg
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  className: "h-7 w-7",
                  disabled: safePage === totalPages,
                  onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                  "aria-label": "Next page",
                  "data-ocid": "btn-next-page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] })
        ] })
      ] })
    ),
    modal.type === "create" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompanyFormModal,
      {
        mode: "create",
        initialValues: EMPTY_FORM,
        onSave: handleCreate,
        onClose: () => setModal({ type: "none" })
      }
    ),
    modal.type === "edit" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompanyFormModal,
      {
        mode: "edit",
        initialValues: toForm(modal.company),
        onSave: handleEdit,
        onClose: () => setModal({ type: "none" })
      }
    ),
    modal.type === "plan" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangePlanModal,
      {
        company: modal.company,
        onSave: handleChangePlan,
        onClose: () => setModal({ type: "none" })
      }
    ),
    modal.type === "delete" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmModal,
      {
        company: modal.company,
        onConfirm: handleDelete,
        onClose: () => setModal({ type: "none" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden" }) })
  ] });
}
export {
  CompanyManagement as default
};
