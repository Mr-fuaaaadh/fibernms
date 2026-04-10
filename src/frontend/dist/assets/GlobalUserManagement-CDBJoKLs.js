import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, aF as Users, X, aR as Skeleton, a3 as Badge, aQ as ChevronLeft, a4 as ChevronRight, aj as FileText, M as MapPin, b as cn, ab as Shield, aS as LogOut, T as TriangleAlert } from "./index-RpWpgnOS.js";
import { G as GlassCard } from "./GlassCard-Cz0FNzkM.js";
import { B as Button } from "./button-DXjJimMA.js";
import { C as Checkbox } from "./checkbox-Dh4aUobn.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-HikcifXq.js";
import { I as Input } from "./input-CqfnR8DO.js";
import { L as Label } from "./label-CeZeXege.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, P as Progress } from "./tabs-BGEq1xEz.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Df2HFKB1.js";
import { S as Separator } from "./separator-BM_bV0pW.js";
import { T as Textarea } from "./textarea-B4mLewwW.js";
import { k as MOCK_ADMIN_USERS, M as MOCK_COMPANIES } from "./superAdminMockData-SJ6Z2k0y.js";
import { D as Download } from "./download-CImP21r-.js";
import { U as Upload } from "./upload-BuTSjxGb.js";
import { U as UserPlus, b as UserCheck, a as UserMinus } from "./user-plus-DsCUC0rv.js";
import { W as Wifi } from "./wifi-CyE30izI.js";
import { F as Funnel } from "./funnel-Djx5sUOS.js";
import { K as KeyRound, S as ShieldOff } from "./shield-off-DswLaJDK.js";
import { W as WifiOff } from "./wifi-off-BIYFXY_n.js";
import { C as CircleCheck } from "./circle-check-EFKi-VnU.js";
import { P as Plus } from "./plus-BfNtpc12.js";
import { M as Mail } from "./mail-C1awGIzV.js";
import { C as CircleX } from "./circle-x-D0fO4oFr.js";
import "./index-CjGNRvdY.js";
import "./check-PKAZlQGn.js";
import "./index-CU4_MUTn.js";
import "./index-CNOVgg0s.js";
import "./index-IXOTxK3N.js";
import "./chevron-up-B5gDgmjS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const PAGE_SIZE = 50;
const PLAN_BADGE = {
  BASIC: "bg-muted/30 text-muted-foreground border-border/40",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const ROLE_COLORS = {
  Admin: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Network Engineer": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "NOC Operator": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Viewer: "bg-muted/30 text-muted-foreground border-border/40"
};
const STATUS_COLORS = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  disabled: "bg-red-500/15 text-red-400 border-red-500/30"
};
const REGION_LIST = ["India", "US", "EU", "APAC", "MENA"];
const ALL_ROLES = [
  "Admin",
  "Network Engineer",
  "NOC Operator",
  "Viewer"
];
function relativeTime(iso) {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 6e4);
  if (min < 2) return "Just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function userInitials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}
function exportCsv(users) {
  const headers = [
    "Name",
    "Email",
    "Company",
    "Role",
    "Status",
    "Region",
    "Last Login",
    "MFA",
    "Sessions"
  ];
  const rows = users.map((u) => [
    u.name,
    u.email,
    u.company,
    u.role,
    u.status,
    u.region,
    u.lastLogin ?? "Never",
    u.mfaEnabled ? "Yes" : "No",
    String(u.activeSessions.length)
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `users-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function csvTemplate() {
  const headers = "Name,Email,Role,Company,Region\n";
  const sample = "John Smith,john@company.com,Network Engineer,Acme Telecom,US\n";
  const blob = new Blob([headers + sample], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "user-import-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}
function StatCard({
  label,
  value,
  sub,
  color,
  icon: Icon
}) {
  const bgColor = color.replace("text-", "bg-").replace("-400", "-500/15");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2.5 rounded-xl", bgColor), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", color) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: cn(
            "text-2xl font-display font-bold tabular-nums mt-0.5",
            color
          ),
          children: value.toLocaleString()
        }
      ),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 mt-0.5", children: sub })
    ] })
  ] });
}
function UserAvatar({
  name,
  sessionActive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-bold text-primary font-display", children: userInitials(name) }),
    sessionActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" })
  ] });
}
function SessionTrackingModal({
  user,
  sessions,
  onClose,
  onForceLogoutSession,
  onForceLogoutAll
}) {
  const [confirmSessionId, setConfirmSessionId] = reactExports.useState(null);
  const [localSessions, setLocalSessions] = reactExports.useState(sessions);
  const handleLogoutOne = (id) => {
    onForceLogoutSession(id);
    setLocalSessions((prev) => prev.filter((s) => s.id !== id));
    setConfirmSessionId(null);
  };
  const handleLogoutAll = () => {
    onForceLogoutAll();
    setLocalSessions([]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl glass-elevated border-border/40 p-0 overflow-hidden max-h-[85vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-6 pt-5 pb-4 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: user.name, sessionActive: user.sessionActive }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-base font-display font-bold leading-tight", children: [
            "Active Sessions — ",
            user.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[9px] border bg-emerald-500/15 text-emerald-400 border-emerald-500/30", children: [
          localSessions.filter((s) => s.isActive).length,
          " active"
        ] }),
        localSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 text-xs gap-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/10",
            onClick: handleLogoutAll,
            "data-ocid": "sessions-force-logout-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3" }),
              " Force Logout All"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto noc-scrollbar", children: localSessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-muted-foreground gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-8 h-8 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No active sessions" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/30 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-medium", children: "Session ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-medium", children: "Login Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-medium", children: "Last Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-medium", children: "Device" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-medium", children: "IP Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 w-16" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: localSessions.map((sess) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/15 hover:bg-muted/10 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: sess.id }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-foreground", children: relativeTime(sess.loginTime) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: relativeTime(sess.lastActivity) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-foreground truncate max-w-[120px] block", children: sess.deviceInfo }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: sess.ipAddress }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: cn(
                  "text-[9px] border",
                  sess.isActive ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted/30 text-muted-foreground border-border/40"
                ),
                children: sess.isActive ? "Active" : "Expired"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: confirmSessionId === sess.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-5 w-5 text-emerald-400 hover:text-emerald-300",
                  onClick: () => handleLogoutOne(sess.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-5 w-5 text-muted-foreground",
                  onClick: () => setConfirmSessionId(null),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6 text-muted-foreground hover:text-orange-400",
                title: "Force logout this session",
                onClick: () => setConfirmSessionId(sess.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3" })
              }
            ) })
          ]
        },
        sess.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-3 border-t border-border/30 flex items-center justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "h-7 text-xs",
        onClick: onClose,
        children: "Close"
      }
    ) })
  ] }) });
}
function InviteUserModal({
  onClose,
  onInvite
}) {
  var _a, _b;
  const [entries, setEntries] = reactExports.useState([
    { id: "e-0", email: "", role: "Viewer" }
  ]);
  const [companyId, setCompanyId] = reactExports.useState(((_a = MOCK_COMPANIES[0]) == null ? void 0 : _a.id) ?? "");
  const [region, setRegion] = reactExports.useState("India");
  const [message, setMessage] = reactExports.useState("");
  const companyName = ((_b = MOCK_COMPANIES.find((c) => c.id === companyId)) == null ? void 0 : _b.name) ?? "";
  const allValid = entries.every((e) => e.email.includes("@")) && companyId;
  const addEntry = () => setEntries((prev) => [
    ...prev,
    { id: `e-${Date.now()}`, email: "", role: "Viewer" }
  ]);
  const removeEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));
  const updateEntry = (id, field, val) => setEntries(
    (prev) => prev.map((e) => e.id === id ? { ...e, [field]: val } : e)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg glass-elevated border-border/40 p-0 overflow-hidden max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-6 pt-5 pb-4 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-primary" }),
      " Invite Users"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto noc-scrollbar px-6 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Email Addresses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-6 text-[10px] gap-1 text-primary",
              onClick: addEntry,
              "data-ocid": "invite-add-email",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                " Add another"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: entries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "email",
              placeholder: "user@company.com",
              value: entry.email,
              onChange: (e) => updateEntry(entry.id, "email", e.target.value),
              className: "h-8 text-xs bg-background/50 flex-1",
              "data-ocid": `invite-email-${entry.id}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: entry.role,
              onValueChange: (v) => updateEntry(entry.id, "role", v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-8 text-xs bg-background/50 w-40",
                    "data-ocid": `invite-role-${entry.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: r }, r)) })
              ]
            }
          ),
          entries.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 text-muted-foreground hover:text-red-400",
              onClick: () => removeEntry(entry.id),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }, entry.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Assign to Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: companyId, onValueChange: setCompanyId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs bg-background/50",
                "data-ocid": "invite-company",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select company" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "max-h-60", children: MOCK_COMPANIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, className: "text-xs", children: c.name }, c.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Region" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: region, onValueChange: setRegion, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs bg-background/50",
                "data-ocid": "invite-region",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REGION_LIST.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: r }, r)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Personal Message (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Welcome to FiberNMS! You've been invited to join our network operations team...",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            className: "text-xs bg-background/50 resize-none",
            rows: 2,
            "data-ocid": "invite-message"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/30 bg-muted/10 p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-muted-foreground/60 font-mono", children: "Email Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] leading-relaxed space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "To:" }),
            " ",
            entries.map((e) => e.email || "user@example.com").join(", ")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Company:" }),
            " ",
            companyName || "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-20 my-1.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "You've been invited to join",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: companyName || "—" }),
            " ",
            "on FiberNMS. Click the secure link in the email to set up your account.",
            message && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-foreground/80", children: message })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 border-t border-border/30 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "flex-1 h-8 text-xs gap-1.5",
          disabled: !allValid,
          onClick: () => {
            for (const entry of entries) {
              if (entry.email.includes("@"))
                onInvite(entry.email, entry.role, companyId);
            }
            onClose();
          },
          "data-ocid": "invite-submit",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
            " Send ",
            entries.length,
            " Invitation",
            entries.length > 1 ? "s" : ""
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "h-8 text-xs",
          onClick: onClose,
          children: "Cancel"
        }
      )
    ] })
  ] }) });
}
const SAMPLE_CSV = [
  {
    name: "Alice Nakamura",
    email: "alice@telco.jp",
    role: "Network Engineer",
    company: "NTT FiberJapan",
    region: "APAC"
  },
  {
    name: "Bruno Martinez",
    email: "bruno@telco.es",
    role: "NOC Operator",
    company: "Telefonica FiberCo",
    region: "EU"
  },
  {
    name: "Chidi Okonkwo",
    email: "chidi@ispdemo.ng",
    role: "Viewer",
    company: "Airtel Fiber Networks",
    region: "MENA"
  },
  {
    name: "Dana Patel",
    email: "dana@jiofiber.in",
    role: "Admin",
    company: "Jio FiberCo",
    region: "India"
  },
  {
    name: "Eva Schmidt",
    email: "eva@dttelekom.de",
    role: "Network Engineer",
    company: "Deutsche Telekom Fiber",
    region: "EU"
  }
];
function validateRow(row, idx) {
  var _a, _b, _c;
  const errors = [];
  if (!((_a = row.email) == null ? void 0 : _a.includes("@"))) errors.push("Invalid email");
  if (!((_b = row.name) == null ? void 0 : _b.trim())) errors.push("Missing name");
  if (!ALL_ROLES.includes(row.role)) errors.push("Invalid role");
  if (!((_c = row.company) == null ? void 0 : _c.trim())) errors.push("Missing company");
  return {
    rowKey: `${row.email ?? "row"}-${idx}`,
    name: row.name ?? "",
    email: row.email ?? "",
    role: row.role ?? "",
    company: row.company ?? "",
    region: row.region ?? "",
    valid: errors.length === 0,
    errors
  };
}
function BulkImportModal({ onClose }) {
  const fileRef = reactExports.useRef(null);
  const [fileName, setFileName] = reactExports.useState(null);
  const [pasteContent, setPasteContent] = reactExports.useState("");
  const [parsedRows, setParsedRows] = reactExports.useState(
    () => SAMPLE_CSV.map((r, i) => validateRow(r, i))
  );
  const [importing, setImporting] = reactExports.useState(false);
  const [importDone, setImportDone] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("upload");
  const validCount = parsedRows.filter((r) => r.valid).length;
  const errorCount = parsedRows.filter((r) => !r.valid).length;
  const parseCSV = (text) => {
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length < 2) return;
    const headers = lines[0].toLowerCase().split(",").map((h) => h.trim().replace(/"/g, ""));
    const rows = lines.slice(1).map((line, idx) => {
      const vals = line.split(",").map((v) => v.trim().replace(/"/g, ""));
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = vals[i] ?? "";
      });
      return validateRow(obj, idx);
    });
    setParsedRows(rows);
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      if (typeof ((_a2 = ev.target) == null ? void 0 : _a2.result) === "string") parseCSV(ev.target.result);
    };
    reader.readAsText(file);
  };
  const handlePasteChange = (val) => {
    setPasteContent(val);
    if (val.trim()) parseCSV(val);
  };
  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportDone(true);
    }, 1800);
  };
  if (importDone) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-sm glass-elevated border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-emerald-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-bold text-foreground", children: "Import Complete" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 font-medium", children: [
            validCount,
            " users imported"
          ] }),
          errorCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            ",",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400 font-medium", children: [
              errorCount,
              " skipped"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 text-xs", onClick: onClose, children: "Done" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl glass-elevated border-border/40 p-0 overflow-hidden max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "px-6 pt-5 pb-4 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 text-primary" }),
      " Bulk Import Users"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto noc-scrollbar px-6 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8 text-xs gap-1 bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "upload", className: "h-6 text-xs px-3", children: "Upload CSV" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "paste", className: "h-6 text-xs px-3", children: "Paste Data" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "upload", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full border-2 border-dashed border-border/40 rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-smooth",
            onClick: () => {
              var _a;
              return (_a = fileRef.current) == null ? void 0 : _a.click();
            },
            "data-ocid": "import-dropzone",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileRef,
                  type: "file",
                  accept: ".csv",
                  className: "hidden",
                  onChange: handleFileChange
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-7 h-7 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: fileName ?? "Drop your CSV file here or click to browse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Columns: name, email, role, company, region" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "mt-2 h-6 text-[10px] gap-1 text-primary",
                  onClick: (e) => {
                    e.stopPropagation();
                    csvTemplate();
                  },
                  "data-ocid": "download-template",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                    " Download template"
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "paste", className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "name,email,role,company,region\nJohn Smith,john@acme.com,Network Engineer,Acme Telecom,US",
            value: pasteContent,
            onChange: (e) => handlePasteChange(e.target.value),
            className: "text-xs bg-background/50 font-mono resize-none h-36",
            "data-ocid": "import-paste"
          }
        ) })
      ] }),
      parsedRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-foreground", children: [
            "Preview — ",
            parsedRows.length,
            " rows"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400", children: [
              validCount,
              " valid"
            ] }),
            errorCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-red-400", children: [
              errorCount,
              " errors"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border/30 max-h-52 overflow-y-auto noc-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/30 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["", "Name", "Email", "Role", "Company", "Region"].map(
            (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left py-2 px-3 text-muted-foreground font-normal",
                children: h
              },
              h
            )
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: parsedRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: cn(
                "border-t border-border/15",
                row.valid ? "hover:bg-muted/10" : "bg-red-500/5"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3", children: row.valid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleX,
                  {
                    className: "w-3 h-3 text-red-400",
                    "aria-label": row.errors.join(", ")
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-foreground", children: row.name || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-muted-foreground", children: row.email || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3", children: row.role ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: cn(
                      "text-[8px] border",
                      ROLE_COLORS[row.role] ?? "bg-muted/30 text-muted-foreground border-border/40"
                    ),
                    children: row.role
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-muted-foreground", children: row.company || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 px-3 text-muted-foreground", children: row.region || "—" })
              ]
            },
            row.rowKey
          )) })
        ] }) })
      ] }),
      importing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Importing users…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
            validCount,
            " / ",
            validCount
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: 75, className: "h-1.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 border-t border-border/30 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "flex-1 h-8 text-xs gap-1.5",
          disabled: validCount === 0 || importing,
          onClick: handleImport,
          "data-ocid": "import-submit",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
            importing ? "Importing…" : `Import ${validCount} Users`
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "h-8 text-xs",
          onClick: onClose,
          children: "Cancel"
        }
      )
    ] })
  ] }) });
}
function EditRoleModal({
  user,
  onClose,
  onSave
}) {
  const [role, setRole] = reactExports.useState(user.role);
  const changed = role !== user.role;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm glass-elevated border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-base flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
      " Change Role"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: user.name, sessionActive: user.sessionActive }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: user.email })
        ] })
      ] }),
      changed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 flex-shrink-0" }),
        "Change ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: user.role }),
        " →",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: role }),
        "? An audit log entry will be created."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "New Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-9 text-xs bg-background/50",
              "data-ocid": "edit-role-select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn("text-xs", ROLE_COLORS[r].split(" ")[1]),
              children: r
            }
          ) }, r)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "flex-1 h-8 text-xs",
            disabled: !changed,
            onClick: () => {
              onSave(user.id, role);
              onClose();
            },
            "data-ocid": "edit-role-save",
            children: "Confirm Change"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-8 text-xs",
            onClick: onClose,
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function ToggleStatusModal({
  user,
  onClose,
  onConfirm
}) {
  const isDisabling = user.status === "active";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm glass-elevated border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogTitle,
      {
        className: cn(
          "font-display text-base flex items-center gap-2",
          isDisabling ? "text-red-400" : "text-emerald-400"
        ),
        children: [
          isDisabling ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
          isDisabling ? "Disable User" : "Enable User"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isDisabling ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Disable ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: user.name }),
        "? They will lose access immediately and all active sessions will be terminated."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Re-enable",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: user.name }),
        "? They will regain access with their existing role and permissions."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: cn(
              "flex-1 h-8 text-xs gap-1",
              isDisabling ? "border-red-500/30 text-red-400 hover:bg-red-500/10" : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            ),
            onClick: () => {
              onConfirm(user.id);
              onClose();
            },
            "data-ocid": "toggle-status-confirm",
            children: isDisabling ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3 h-3" }),
              " Disable"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3" }),
              " Enable"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-8 text-xs",
            onClick: onClose,
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function ForceLogoutModal({
  user,
  onClose,
  onConfirm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm glass-elevated border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-base flex items-center gap-2 text-orange-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
      " Force Logout"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "This will immediately terminate all active sessions for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: user.name }),
        ". They will need to log in again."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
        "Any unsaved work in their session will be lost."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "flex-1 h-8 text-xs border-orange-500/30 text-orange-400 hover:bg-orange-500/10",
            onClick: () => {
              onConfirm(user.id);
              onClose();
            },
            "data-ocid": "force-logout-confirm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3 mr-1" }),
              " Force Logout"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-8 text-xs",
            onClick: onClose,
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function RowActions({
  user,
  onSessions,
  onEditRole,
  onToggleStatus,
  onForceLogout
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "h-6 w-6",
        "aria-label": "More actions",
        onClick: () => setOpen((o) => !o),
        "data-ocid": `row-more-${user.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "w-3.5 h-3.5 text-muted-foreground" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => setOpen(false),
          onKeyDown: (e) => e.key === "Escape" && setOpen(false),
          role: "presentation"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-7 z-50 w-48 glass-elevated rounded-lg border border-border/40 shadow-lg overflow-hidden", children: [
        { label: "View Sessions", icon: Wifi, action: onSessions },
        { label: "Change Role", icon: Shield, action: onEditRole },
        {
          label: user.status === "active" ? "Disable Account" : "Enable Account",
          icon: user.status === "active" ? UserMinus : UserCheck,
          action: onToggleStatus
        },
        { label: "Force Logout", icon: LogOut, action: onForceLogout }
      ].map(({ label, icon: Icon, action }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-primary/10 transition-smooth",
          onClick: () => {
            setOpen(false);
            action();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            label
          ]
        },
        label
      )) })
    ] })
  ] });
}
function UserTableRow({
  user,
  companyPlan,
  selected,
  onSelect,
  onSessions,
  onEditRole,
  onToggleStatus,
  onForceLogout
}) {
  const sessionCount = user.activeSessions.length;
  const activeSessionCount = user.activeSessions.filter(
    (s) => s.isActive
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: cn(
        "border-b border-border/15 transition-colors group",
        selected ? "bg-primary/5" : "hover:bg-muted/10"
      ),
      "data-ocid": `user-row-${user.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pl-4 pr-2 w-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            checked: selected,
            onCheckedChange: onSelect,
            className: "w-3.5 h-3.5",
            "data-ocid": `select-${user.id}`
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: user.name, sessionActive: user.sessionActive }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate max-w-[140px]", children: user.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate max-w-[140px]", children: user.email })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground truncate max-w-[130px]", children: user.company }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: cn(
                "text-[8px] border mt-0.5 px-1.5 py-0",
                PLAN_BADGE[companyPlan] ?? PLAN_BADGE.BASIC
              ),
              children: companyPlan
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: cn(
              "text-[9px] border",
              ROLE_COLORS[user.role] ?? "bg-muted/30 text-muted-foreground border-border/40"
            ),
            children: user.role
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border transition-smooth hover:opacity-80",
              STATUS_COLORS[user.status]
            ),
            onClick: onToggleStatus,
            "aria-label": user.status === "active" ? "Disable user" : "Enable user",
            "data-ocid": `toggle-status-${user.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "w-1.5 h-1.5 rounded-full",
                    user.status === "active" ? "bg-emerald-400" : "bg-red-400"
                  )
                }
              ),
              user.status
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-[10px] text-muted-foreground whitespace-nowrap", children: relativeTime(user.lastLogin) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border transition-smooth",
              sessionCount > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer" : "bg-muted/20 text-muted-foreground border-border/30 cursor-default"
            ),
            onClick: sessionCount > 0 ? onSessions : void 0,
            "data-ocid": `sessions-count-${user.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-2.5 h-2.5" }),
              activeSessionCount,
              "/",
              sessionCount
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: user.mfaEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Shield,
          {
            className: "w-3.5 h-3.5 text-emerald-400",
            "aria-label": "MFA enabled"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShieldOff,
          {
            className: "w-3.5 h-3.5 text-muted-foreground/30",
            "aria-label": "MFA disabled"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] border bg-muted/20 text-muted-foreground border-border/30", children: user.region }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              "aria-label": "Force logout",
              onClick: onForceLogout,
              "data-ocid": `btn-force-logout-${user.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3 text-muted-foreground hover:text-orange-400 transition-colors" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              "aria-label": user.status === "active" ? "Disable user" : "Enable user",
              onClick: onToggleStatus,
              "data-ocid": `btn-toggle-${user.id}`,
              children: user.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3 h-3 text-muted-foreground hover:text-red-400 transition-colors" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3 text-muted-foreground hover:text-emerald-400 transition-colors" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RowActions,
            {
              user,
              onSessions,
              onEditRole,
              onToggleStatus,
              onForceLogout
            }
          )
        ] }) })
      ]
    }
  );
}
function BulkActionBar({
  count,
  onClear,
  onBulkRole,
  onBulkDisable,
  onBulkExport,
  onBulkForceLogout
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5 bg-primary/10 border-b border-primary/20 rounded-t-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: true, onCheckedChange: onClear, className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-primary", children: [
        count,
        " user",
        count > 1 ? "s" : "",
        " selected"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-6 text-[10px] gap-1 border-primary/30 text-primary hover:bg-primary/10",
          onClick: onBulkRole,
          "data-ocid": "bulk-change-role",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-2.5 h-2.5" }),
            " Change Role"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-6 text-[10px] gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10",
          onClick: onBulkDisable,
          "data-ocid": "bulk-disable",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-2.5 h-2.5" }),
            " Disable Selected"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-6 text-[10px] gap-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/10",
          onClick: onBulkForceLogout,
          "data-ocid": "bulk-force-logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-2.5 h-2.5" }),
            " Force Logout All"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-6 text-[10px] gap-1 border-border/40 text-muted-foreground hover:bg-muted/20",
          onClick: onBulkExport,
          "data-ocid": "bulk-export",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-2.5 h-2.5" }),
            " Export Selected"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "h-6 w-6 ml-auto text-muted-foreground",
        onClick: onClear,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
      }
    )
  ] });
}
function BulkRoleModal({
  count,
  onClose,
  onSave
}) {
  const [role, setRole] = reactExports.useState("NOC Operator");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm glass-elevated border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-base flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
      " Change Role for ",
      count,
      " ",
      "Users"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-9 text-xs bg-background/50",
            "data-ocid": "bulk-role-select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: r }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "flex-1 h-8 text-xs",
            onClick: () => {
              onSave(role);
              onClose();
            },
            "data-ocid": "bulk-role-save",
            children: [
              "Apply to ",
              count,
              " users"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "h-8 text-xs",
            onClick: onClose,
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function GlobalUserManagement() {
  const [users, setUsers] = reactExports.useState(() => [...MOCK_ADMIN_USERS]);
  const [search, setSearch] = reactExports.useState("");
  const [companyFilter, setCompanyFilter] = reactExports.useState("all");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [regionFilter, setRegionFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const [modal, setModal] = reactExports.useState({ type: "none" });
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const searchRef = reactExports.useRef(null);
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const handleSearchChange = (val) => {
    setSearch(val);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 250);
  };
  const companyPlanMap = reactExports.useMemo(() => {
    const map = {};
    for (const c of MOCK_COMPANIES) map[c.id] = c.plan;
    return map;
  }, []);
  const allCompanies = reactExports.useMemo(
    () => MOCK_COMPANIES.map((c) => ({ id: c.id, name: c.name })),
    []
  );
  const filtered = reactExports.useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return users.filter((u) => {
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q))
        return false;
      if (companyFilter !== "all" && u.companyId !== companyFilter)
        return false;
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter !== "all" && u.status !== statusFilter) return false;
      if (regionFilter !== "all" && u.region !== regionFilter) return false;
      return true;
    });
  }, [
    users,
    debouncedSearch,
    companyFilter,
    roleFilter,
    statusFilter,
    regionFilter
  ]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const pageUsers = filtered.slice(pageStart, pageEnd);
  const stats = reactExports.useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      disabled: users.filter((u) => u.status === "disabled").length,
      sessions: users.reduce(
        (sum, u) => sum + u.activeSessions.filter((s) => s.isActive).length,
        0
      )
    }),
    [users]
  );
  const hasFilters = companyFilter !== "all" || roleFilter !== "all" || statusFilter !== "all" || regionFilter !== "all" || debouncedSearch !== "";
  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCompanyFilter("all");
    setRoleFilter("all");
    setStatusFilter("all");
    setRegionFilter("all");
    setPage(1);
  };
  const pageUserIds = reactExports.useMemo(
    () => new Set(pageUsers.map((u) => u.id)),
    [pageUsers]
  );
  const allPageSelected = pageUsers.length > 0 && pageUsers.every((u) => selectedIds.has(u.id));
  const toggleSelectAll = (checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        for (const id of pageUserIds) next.add(id);
      } else {
        for (const id of pageUserIds) next.delete(id);
      }
      return next;
    });
  };
  const toggleSelect = (id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };
  const selectedUsers = reactExports.useMemo(
    () => users.filter((u) => selectedIds.has(u.id)),
    [users, selectedIds]
  );
  const handleToggleStatus = reactExports.useCallback((id) => {
    setUsers(
      (prev) => prev.map(
        (u) => u.id === id ? {
          ...u,
          status: u.status === "active" ? "disabled" : "active",
          sessionActive: u.status === "active" ? false : u.sessionActive,
          activeSessions: u.status === "active" ? [] : u.activeSessions
        } : u
      )
    );
  }, []);
  const handleForceLogout = reactExports.useCallback((id) => {
    setUsers(
      (prev) => prev.map(
        (u) => u.id === id ? { ...u, sessionActive: false, activeSessions: [] } : u
      )
    );
  }, []);
  const handleEditRole = reactExports.useCallback((id, role) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
  }, []);
  const handleForceLogoutSession = reactExports.useCallback(
    (userId, sessionId) => {
      setUsers(
        (prev) => prev.map(
          (u) => u.id === userId ? {
            ...u,
            activeSessions: u.activeSessions.filter(
              (s) => s.id !== sessionId
            )
          } : u
        )
      );
    },
    []
  );
  const handleInvite = reactExports.useCallback(
    (email, role, companyId) => {
      const company = MOCK_COMPANIES.find((c) => c.id === companyId);
      const newUser = {
        id: `usr-inv-${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role,
        status: "active",
        lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
        company: (company == null ? void 0 : company.name) ?? "Unknown",
        companyId,
        companyName: (company == null ? void 0 : company.name) ?? "Unknown",
        region: (company == null ? void 0 : company.region) ?? "Unknown",
        assignedRegion: (company == null ? void 0 : company.region) ?? "Unknown",
        mfaEnabled: false,
        sessionActive: false,
        activeSessions: []
      };
      setUsers((prev) => [newUser, ...prev]);
    },
    []
  );
  const handleBulkDisable = () => {
    for (const id of selectedIds) handleToggleStatus(id);
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const handleBulkForceLogout = () => {
    for (const id of selectedIds) handleForceLogout(id);
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const handleBulkRole = (role) => {
    for (const id of selectedIds) handleEditRole(id, role);
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const getUser = (id) => users.find((u) => u.id === id);
  const sessionsUser = modal.type === "sessions" ? getUser(modal.userId) : void 0;
  const editRoleUser = modal.type === "editRole" ? getUser(modal.userId) : void 0;
  const forceLogoutUser = modal.type === "forceLogout" ? getUser(modal.userId) : void 0;
  const toggleStatusUser = modal.type === "toggleStatus" ? getUser(modal.userId) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground leading-tight", children: "Global User Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Manage ",
            users.length.toLocaleString(),
            "+ users across all tenants"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs gap-1.5",
            onClick: () => exportCsv(filtered),
            "data-ocid": "btn-export-csv",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              " Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-8 text-xs gap-1.5",
            onClick: () => setModal({ type: "import" }),
            "data-ocid": "btn-bulk-import",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
              " Bulk Import"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "h-8 text-xs gap-1.5",
            onClick: () => setModal({ type: "invite" }),
            "data-ocid": "btn-invite-user",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
              " Invite User"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Users",
          value: stats.total,
          sub: `${allCompanies.length} companies`,
          color: "text-blue-400",
          icon: Users
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Users",
          value: stats.active,
          sub: `${Math.round(stats.active / stats.total * 100)}% of total`,
          color: "text-emerald-400",
          icon: UserCheck
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Disabled Users",
          value: stats.disabled,
          sub: "Access revoked",
          color: "text-red-400",
          icon: UserX
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active Sessions",
          value: stats.sessions,
          sub: "Live right now",
          color: "text-amber-400",
          icon: Wifi
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[220px] flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search name or email…",
            value: search,
            onChange: (e) => handleSearchChange(e.target.value),
            className: "pl-8 h-8 text-xs bg-background/50",
            "data-ocid": "input-user-search"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            onClick: () => handleSearchChange(""),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: companyFilter,
          onValueChange: (v) => {
            setCompanyFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-48 bg-background/50",
                "data-ocid": "filter-company",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Companies" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "max-h-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Companies" }),
              allCompanies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, className: "text-xs", children: c.name }, c.id))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: roleFilter,
          onValueChange: (v) => {
            setRoleFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-44 bg-background/50",
                "data-ocid": "filter-role",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Roles" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Roles" }),
              ALL_ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: r }, r))
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: statusFilter,
          onValueChange: (v) => {
            setStatusFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-36 bg-background/50",
                "data-ocid": "filter-user-status",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Statuses" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "disabled", children: "Disabled" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: regionFilter,
          onValueChange: (v) => {
            setRegionFilter(v);
            setPage(1);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "h-8 text-xs w-32 bg-background/50",
                "data-ocid": "filter-region",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Regions" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Regions" }),
              REGION_LIST.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, className: "text-xs", children: r }, r))
            ] })
          ]
        }
      ),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 text-xs gap-1 text-muted-foreground hover:text-foreground",
          onClick: clearFilters,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
            " Clear"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3 h-3 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
          "Showing",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: filtered.length.toLocaleString() }),
          " ",
          "of",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: users.length.toLocaleString() }),
          " ",
          "users"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
      selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        BulkActionBar,
        {
          count: selectedIds.size,
          onClear: () => setSelectedIds(/* @__PURE__ */ new Set()),
          onBulkRole: () => setModal({ type: "bulkRole" }),
          onBulkDisable: handleBulkDisable,
          onBulkExport: () => exportCsv(selectedUsers),
          onBulkForceLogout: handleBulkForceLogout
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto noc-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground text-[10px] uppercase tracking-wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pl-4 pr-2 w-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: allPageSelected,
              onCheckedChange: (v) => toggleSelectAll(!!v),
              className: "w-3.5 h-3.5",
              "data-ocid": "select-all"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "Company" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "Last Login" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "MFA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-3 font-medium", children: "Region" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 w-24" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          pageUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            UserTableRow,
            {
              user,
              companyPlan: companyPlanMap[user.companyId] ?? "BASIC",
              selected: selectedIds.has(user.id),
              onSelect: (checked) => toggleSelect(user.id, !!checked),
              onSessions: () => setModal({ type: "sessions", userId: user.id }),
              onEditRole: () => setModal({ type: "editRole", userId: user.id }),
              onToggleStatus: () => setModal({ type: "toggleStatus", userId: user.id }),
              onForceLogout: () => setModal({ type: "forceLogout", userId: user.id })
            },
            user.id
          )),
          pageUsers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 10, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-16 text-muted-foreground gap-3",
              "data-ocid": "empty-state-users",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No users match your filters" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-xs",
                    onClick: clearFilters,
                    children: "Clear filters"
                  }
                )
              ]
            }
          ) }) }),
          pageUsers.length === 0 && !hasFilters && ["sk-1", "sk-2", "sk-3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 10, className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }) }, k))
        ] })
      ] }) }),
      filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border/30 bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Showing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              pageStart + 1,
              "–",
              pageEnd
            ] }),
            " ",
            "of",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: filtered.length.toLocaleString() }),
            " ",
            "users"
          ] }),
          filtered.length < users.length && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[9px] border bg-primary/10 text-primary border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-2.5 h-2.5 mr-1" }),
            "Filtered"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
              disabled: safePage === 1,
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              "data-ocid": "pagination-prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
            }
          ),
          Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const offset = Math.max(
              0,
              Math.min(safePage - 3, totalPages - 5)
            );
            const p = offset + i + 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: p === safePage ? "default" : "ghost",
                size: "icon",
                className: "h-7 w-7 text-xs",
                onClick: () => setPage(p),
                "data-ocid": `pagination-page-${p}`,
                children: p
              },
              p
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
              "data-ocid": "pagination-next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ] })
    ] }),
    modal.type === "sessions" && sessionsUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SessionTrackingModal,
      {
        user: sessionsUser,
        sessions: sessionsUser.activeSessions,
        onClose: () => setModal({ type: "none" }),
        onForceLogoutSession: (sessionId) => handleForceLogoutSession(sessionsUser.id, sessionId),
        onForceLogoutAll: () => handleForceLogout(sessionsUser.id)
      }
    ),
    modal.type === "editRole" && editRoleUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditRoleModal,
      {
        user: editRoleUser,
        onClose: () => setModal({ type: "none" }),
        onSave: handleEditRole
      }
    ),
    modal.type === "toggleStatus" && toggleStatusUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToggleStatusModal,
      {
        user: toggleStatusUser,
        onClose: () => setModal({ type: "none" }),
        onConfirm: handleToggleStatus
      }
    ),
    modal.type === "forceLogout" && forceLogoutUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ForceLogoutModal,
      {
        user: forceLogoutUser,
        onClose: () => setModal({ type: "none" }),
        onConfirm: handleForceLogout
      }
    ),
    modal.type === "invite" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InviteUserModal,
      {
        onClose: () => setModal({ type: "none" }),
        onInvite: handleInvite
      }
    ),
    modal.type === "import" && /* @__PURE__ */ jsxRuntimeExports.jsx(BulkImportModal, { onClose: () => setModal({ type: "none" }) }),
    modal.type === "bulkRole" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BulkRoleModal,
      {
        count: selectedIds.size,
        onClose: () => setModal({ type: "none" }),
        onSave: handleBulkRole
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "hidden" })
    ] })
  ] });
}
export {
  GlobalUserManagement as default
};
