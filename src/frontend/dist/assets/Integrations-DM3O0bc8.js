import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, aE as FeatureFlag, aF as Key, p as Activity, r as reactExports, T as TriangleAlert, af as Badge, h as Clock, Z as Zap, aG as Settings, ai as CircleAlert } from "./index-WMTkA9vU.js";
import { F as FeatureGate } from "./PlanComparisonModal-BSlekMIo.js";
import { B as Button } from "./button-Dag5mFLZ.js";
import "./PlanBadge-CeUhWH5s.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-D1ucYUI2.js";
import { C as Checkbox } from "./checkbox-uXVFTBgh.js";
import { I as Input } from "./input-DnM8vr7C.js";
import { L as Label } from "./label-Da7mO3fc.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, P as Progress } from "./tabs-BfwttQ8c.js";
import { S as Switch } from "./switch-DJTUkgyR.js";
import { a as MOCK_API_KEYS, b as MOCK_WEBHOOKS } from "./billingMockData-s_Kdklpu.js";
import { u as useSubscription } from "./useFeature-CKQ2GP4b.js";
import { u as ue } from "./index-Sv7tHWaP.js";
import { W as Webhook } from "./webhook-ClYqgKrv.js";
import { L as Link2 } from "./link-2-CdrzsKK3.js";
import { P as Plus } from "./plus-B3byTnvG.js";
import { C as Check } from "./check-CdzZhum6.js";
import { C as Copy } from "./copy-x3Q6a-P9.js";
import { E as EyeOff } from "./eye-off-CgBU5lrk.js";
import { E as Eye } from "./eye-etdloX7s.js";
import { T as Trash2 } from "./trash-2-BFikOAxE.js";
import { G as Globe } from "./globe-CaE9hfJb.js";
import { R as RefreshCw } from "./refresh-cw-DyIJ60lF.js";
import { C as ChevronUp } from "./chevron-up-85Kc7JlN.js";
import { C as CircleCheck } from "./circle-check-mz2eb2S1.js";
import "./lock-keyhole-CFxeucp5.js";
import "./diamond-xcNgg2g5.js";
import "./index-CJt-S02L.js";
import "./index-DL2W489r.js";
import "./index-DfX1YDeV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
const Terminal = createLucideIcon("terminal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 5 3-3", key: "yk6iyv" }],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  [
    "path",
    { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z", key: "goz73y" }
  ],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  [
    "path",
    { d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z", key: "1snsnr" }
  ]
];
const Unplug = createLucideIcon("unplug", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
const MS = 6e4;
const INTEGRATIONS = [
  // OSS/BSS
  {
    id: "opennms",
    name: "OpenNMS",
    category: "OSS/BSS",
    status: "connected",
    lastSync: Date.now() - 8 * MS,
    icon: "ON",
    iconBg: "bg-sky-500/20 text-sky-400",
    description: "Open-source network management platform for SNMP polling and event correlation."
  },
  {
    id: "netcracker",
    name: "Netcracker",
    category: "OSS/BSS",
    status: "not_connected",
    icon: "NC",
    iconBg: "bg-violet-500/20 text-violet-400",
    description: "BSS/OSS transformation suite for telecom digital operations."
  },
  {
    id: "amdocs",
    name: "Amdocs",
    category: "OSS/BSS",
    status: "beta",
    icon: "AM",
    iconBg: "bg-orange-500/20 text-orange-400",
    description: "Telecom BSS stack — billing, mediation, and order management."
  },
  // CRM
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    status: "connected",
    lastSync: Date.now() - 30 * MS,
    icon: "SF",
    iconBg: "bg-blue-500/20 text-blue-400",
    description: "Sync SLA incidents and customer accounts to Salesforce Service Cloud."
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "CRM",
    status: "not_connected",
    icon: "SN",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    description: "ITSM platform for incident, problem, and change management workflows."
  },
  // Ticketing
  {
    id: "jira",
    name: "Jira Service Desk",
    category: "Ticketing",
    status: "connected",
    lastSync: Date.now() - 15 * MS,
    icon: "JS",
    iconBg: "bg-blue-600/20 text-blue-300",
    description: "Create and sync tickets for fault events and NOC escalations."
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    category: "Ticketing",
    status: "connected",
    lastSync: Date.now() - 3 * MS,
    icon: "PD",
    iconBg: "bg-rose-500/20 text-rose-400",
    description: "On-call alerting and incident response for critical network faults."
  },
  {
    id: "opsgenie",
    name: "OpsGenie",
    category: "Ticketing",
    status: "beta",
    icon: "OG",
    iconBg: "bg-amber-500/20 text-amber-400",
    description: "Alert management and on-call scheduling for NOC teams."
  },
  // Monitoring
  {
    id: "prometheus",
    name: "Prometheus",
    category: "Monitoring",
    status: "connected",
    lastSync: Date.now() - 2 * MS,
    icon: "PR",
    iconBg: "bg-orange-500/20 text-orange-400",
    description: "Metrics scraping and time-series storage for device telemetry."
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "Monitoring",
    status: "connected",
    lastSync: Date.now() - 5 * MS,
    icon: "GF",
    iconBg: "bg-amber-500/20 text-amber-400",
    description: "Visualization dashboards for network metrics and SLA reporting."
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Monitoring",
    status: "not_connected",
    icon: "DD",
    iconBg: "bg-violet-500/20 text-violet-400",
    description: "APM and infrastructure monitoring with full-stack correlation."
  }
];
const API_ACTIVITY = [
  {
    endpoint: "/api/v2/devices",
    timestamp: Date.now() - 1 * MS,
    responseTime: 48,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/alerts",
    timestamp: Date.now() - 3 * MS,
    responseTime: 122,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/devices/ont-4821/metrics",
    timestamp: Date.now() - 7 * MS,
    responseTime: 65,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/workflows/wf-003/execute",
    timestamp: Date.now() - 12 * MS,
    responseTime: 340,
    status: 202,
    method: "POST"
  },
  {
    endpoint: "/api/v2/sla/customers",
    timestamp: Date.now() - 18 * MS,
    responseTime: 89,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/predictive/risks",
    timestamp: Date.now() - 22 * MS,
    responseTime: 210,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/devices/olt-0017",
    timestamp: Date.now() - 31 * MS,
    responseTime: 55,
    status: 404,
    method: "GET"
  },
  {
    endpoint: "/api/v2/audit/logs",
    timestamp: Date.now() - 45 * MS,
    responseTime: 178,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/capacity/forecast",
    timestamp: Date.now() - 60 * MS,
    responseTime: 412,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/topology/graph",
    timestamp: Date.now() - 75 * MS,
    responseTime: 284,
    status: 200,
    method: "GET"
  }
];
const WEBHOOK_EVENTS = [
  "device.updated",
  "fault.detected",
  "signal.changed",
  "sla.breach",
  "workflow.executed"
];
const KEY_PERMISSIONS = [
  "devices:read",
  "devices:write",
  "alerts:read",
  "alerts:write",
  "metrics:read",
  "workflows:execute",
  "audit:read",
  "admin"
];
function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return `${Math.floor(diff / 1e3)}s ago`;
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function generateFakeKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const suffix = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const body = Array.from(
    { length: 32 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `sk-${body}${suffix}`;
}
function StatusBadge({ status }) {
  const cfg = {
    connected: {
      label: "Connected",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    },
    not_connected: {
      label: "Not Connected",
      className: "bg-muted text-muted-foreground border-border"
    },
    beta: {
      label: "Beta",
      className: "bg-amber-500/15 text-amber-400 border-amber-500/30"
    }
  }[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: cn("text-xs font-medium border", cfg.className),
      children: cfg.label
    }
  );
}
function WebhookStatusBadge({ status }) {
  if (status === "active")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs",
        children: "Active"
      }
    );
  if (status === "error")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-rose-500/15 text-rose-400 border-rose-500/30 text-xs",
        children: "Error"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "bg-muted text-muted-foreground border-border text-xs",
      children: "Inactive"
    }
  );
}
function HttpStatusBadge({ code }) {
  const ok = code >= 200 && code < 300;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 text-xs font-mono font-medium",
        ok ? "text-emerald-400" : "text-rose-400"
      ),
      children: [
        ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-3" }),
        code
      ]
    }
  );
}
function ApiKeysTab() {
  const [keys, setKeys] = reactExports.useState(MOCK_API_KEYS);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newKeyName, setNewKeyName] = reactExports.useState("");
  const [newKeyExpiry, setNewKeyExpiry] = reactExports.useState("never");
  const [newKeyPerms, setNewKeyPerms] = reactExports.useState([
    "devices:read",
    "alerts:read"
  ]);
  const [generatedKey, setGeneratedKey] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [revealId, setRevealId] = reactExports.useState(null);
  function togglePerm(perm) {
    setNewKeyPerms(
      (p) => p.includes(perm) ? p.filter((x) => x !== perm) : [...p, perm]
    );
  }
  function handleGenerate() {
    if (!newKeyName.trim()) {
      ue.error("Key name is required");
      return;
    }
    const fullKey = generateFakeKey();
    const masked = `sk-****...${fullKey.slice(-4)}`;
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: masked,
      created: Date.now(),
      lastUsed: Date.now(),
      permissions: newKeyPerms
    };
    setKeys((k) => [newKey, ...k]);
    setGeneratedKey(fullKey);
  }
  function handleCopy() {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
      ue.success("API key copied to clipboard");
    });
  }
  function handleRevoke(id) {
    setKeys((k) => k.filter((key) => key.id !== id));
    ue.success("API key revoked");
  }
  function handleDone() {
    setShowForm(false);
    setGeneratedKey(null);
    setNewKeyName("");
    setNewKeyPerms(["devices:read", "alerts:read"]);
    setNewKeyExpiry("never");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage API keys for programmatic access to the FiberNMS API. Keys inherit your organization's plan limits." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2 shrink-0",
          onClick: () => {
            setShowForm(true);
            setGeneratedKey(null);
          },
          "data-ocid": "api-keys-generate-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
            "Generate New Key"
          ]
        }
      )
    ] }),
    showForm && !generatedKey && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-4 text-primary" }),
        "New API Key"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "key-name", className: "text-xs", children: "Key Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "key-name",
                placeholder: "e.g. Grafana Integration",
                value: newKeyName,
                onChange: (e) => setNewKeyName(e.target.value),
                "data-ocid": "api-key-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "key-expiry", className: "text-xs", children: "Expiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "key-expiry",
                value: newKeyExpiry,
                onChange: (e) => setNewKeyExpiry(e.target.value),
                className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "api-key-expiry-select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "never", children: "Never expires" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "30 days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "90d", children: "90 days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1y", children: "1 year" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Permissions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: KEY_PERMISSIONS.map((perm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `perm-${perm}`,
                checked: newKeyPerms.includes(perm),
                onCheckedChange: () => togglePerm(perm),
                "data-ocid": `perm-checkbox-${perm}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: `perm-${perm}`,
                className: "text-xs font-mono cursor-pointer",
                children: perm
              }
            )
          ] }, perm)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleGenerate,
              "data-ocid": "api-key-confirm-btn",
              children: "Generate Key"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: handleDone, children: "Cancel" })
        ] })
      ] })
    ] }),
    generatedKey && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-500/40 bg-amber-500/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-5 text-amber-400 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Copy your API key now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This key will only be shown once. Store it securely." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-mono text-foreground break-all border border-border", children: generatedKey }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 shrink-0",
            onClick: handleCopy,
            "data-ocid": "api-key-copy-btn",
            children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3.5" }),
              copied ? "Copied" : "Copy"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "default",
          onClick: handleDone,
          "data-ocid": "api-key-done-btn",
          children: "Done"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Key Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Key" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Last Used" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Permissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          className: "hover:bg-muted/30 transition-colors",
          "data-ocid": `api-key-row-${k.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-3.5 text-primary shrink-0" }),
              k.name
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground", children: revealId === k.id ? k.key : k.key }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "size-6 hover:bg-muted",
                  onClick: () => setRevealId(revealId === k.id ? null : k.id),
                  "aria-label": revealId === k.id ? "Hide key" : "Show key info",
                  children: revealId === k.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatRelativeTime(k.created) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatRelativeTime(k.lastUsed) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              k.permissions.slice(0, 2).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs font-mono px-1.5 py-0 border-border text-muted-foreground",
                  children: p
                },
                p
              )),
              k.permissions.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-border text-muted-foreground",
                  children: [
                    "+",
                    k.permissions.length - 2
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h-7 gap-1.5",
                onClick: () => handleRevoke(k.id),
                "data-ocid": `api-key-revoke-${k.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }),
                  "Revoke"
                ]
              }
            ) })
          ]
        },
        k.id
      )) })
    ] }) })
  ] });
}
function WebhooksTab() {
  const [webhooks, setWebhooks] = reactExports.useState(MOCK_WEBHOOKS);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newUrl, setNewUrl] = reactExports.useState("");
  const [newDescription, setNewDescription] = reactExports.useState("");
  const [newEvents, setNewEvents] = reactExports.useState(["fault.detected"]);
  const [testingId, setTestingId] = reactExports.useState(null);
  const [testSuccess, setTestSuccess] = reactExports.useState(null);
  function toggleEvent(event) {
    setNewEvents(
      (e) => e.includes(event) ? e.filter((x) => x !== event) : [...e, event]
    );
  }
  function handleToggleStatus(id) {
    setWebhooks(
      (wh) => wh.map(
        (w) => w.id === id ? { ...w, status: w.status === "active" ? "inactive" : "active" } : w
      )
    );
  }
  function handleDelete(id) {
    setWebhooks((wh) => wh.filter((w) => w.id !== id));
    ue.success("Webhook deleted");
  }
  async function handleTest(id) {
    setTestingId(id);
    setTestSuccess(null);
    await new Promise((r) => setTimeout(r, 1200));
    setTestingId(null);
    setTestSuccess(id);
    ue.success("Test payload delivered — HTTP 200 OK");
    setTimeout(() => setTestSuccess(null), 3e3);
  }
  function handleAdd() {
    if (!newUrl.trim()) {
      ue.error("Endpoint URL is required");
      return;
    }
    if (newEvents.length === 0) {
      ue.error("Select at least one event");
      return;
    }
    const newWh = {
      id: `wh-${Date.now()}`,
      url: newUrl.trim(),
      events: newEvents,
      status: "active",
      lastTriggered: Date.now()
    };
    setWebhooks((wh) => [newWh, ...wh]);
    setShowForm(false);
    setNewUrl("");
    setNewEvents(["fault.detected"]);
    ue.success("Webhook added");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive real-time HTTP callbacks when network events occur. FiberNMS sends POST requests with JSON payloads." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2 shrink-0",
          onClick: () => setShowForm(true),
          "data-ocid": "add-webhook-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
            "Add Webhook"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Webhook, { className: "size-4 text-primary" }),
        "New Webhook Endpoint"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wh-url", className: "text-xs", children: "Endpoint URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "wh-url",
                placeholder: "https://hooks.example.com/nms-events",
                value: newUrl,
                onChange: (e) => setNewUrl(e.target.value),
                "data-ocid": "webhook-url-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wh-desc", className: "text-xs", children: "Description (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "wh-desc",
                placeholder: "e.g. PagerDuty fault escalation",
                value: newDescription,
                onChange: (e) => setNewDescription(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Events to subscribe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: WEBHOOK_EVENTS.map((evt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `evt-${evt}`,
                checked: newEvents.includes(evt),
                onCheckedChange: () => toggleEvent(evt),
                "data-ocid": `webhook-event-${evt}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: `evt-${evt}`,
                className: "text-xs font-mono cursor-pointer",
                children: evt
              }
            )
          ] }, evt)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleAdd,
              "data-ocid": "webhook-save-btn",
              children: "Save Webhook"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => setShowForm(false),
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: webhooks.map((wh) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border",
        "data-ocid": `webhook-row-${wh.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-3.5 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-foreground break-all", children: wh.url }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WebhookStatusBadge, { status: wh.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: wh.events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-mono border-border text-muted-foreground",
                children: ev
              },
              ev
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
              "Last triggered ",
              formatRelativeTime(wh.lastTriggered)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: wh.status === "active" ? "On" : "Off" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: wh.status === "active",
                  onCheckedChange: () => handleToggleStatus(wh.id),
                  "data-ocid": `webhook-toggle-${wh.id}`,
                  "aria-label": `Toggle ${wh.url}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 h-7 text-xs",
                onClick: () => handleTest(wh.id),
                disabled: testingId === wh.id,
                "data-ocid": `webhook-test-${wh.id}`,
                children: [
                  testingId === wh.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3 animate-spin" }) : testSuccess === wh.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3" }),
                  testingId === wh.id ? "Testing…" : testSuccess === wh.id ? "Success" : "Test"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-rose-400 hover:bg-rose-500/10 h-7 gap-1 text-xs",
                onClick: () => handleDelete(wh.id),
                "data-ocid": `webhook-delete-${wh.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" })
              }
            )
          ] })
        ] }) })
      },
      wh.id
    )) })
  ] });
}
const CATEGORIES = ["OSS/BSS", "CRM", "Ticketing", "Monitoring"];
function IntegrationCard({ integration }) {
  const [configOpen, setConfigOpen] = reactExports.useState(false);
  const [connected, setConnected] = reactExports.useState(
    integration.status === "connected"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border hover:border-primary/30 transition-colors",
      "data-ocid": `integration-card-${integration.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "size-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono shrink-0",
                  integration.iconBg
                ),
                children: integration.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: integration.name }),
              connected && integration.lastSync && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Synced ",
                formatRelativeTime(integration.lastSync)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: connected ? "connected" : "not_connected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: integration.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 h-7 text-xs flex-1",
              onClick: () => setConfigOpen(!configOpen),
              "data-ocid": `integration-configure-${integration.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-3" }),
                "Configure"
              ]
            }
          ),
          connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-rose-400 hover:bg-rose-500/10 h-7 text-xs gap-1.5",
              onClick: () => {
                setConnected(false);
                ue.success(`${integration.name} disconnected`);
              },
              "data-ocid": `integration-disconnect-${integration.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Unplug, { className: "size-3.5" }),
                "Disconnect"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-7 text-xs gap-1.5 flex-1",
              onClick: () => {
                setConnected(true);
                setConfigOpen(false);
                ue.success(`${integration.name} connected`);
              },
              "data-ocid": `integration-connect-${integration.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "size-3" }),
                "Connect"
              ]
            }
          )
        ] }),
        configOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Endpoint / API Base URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                defaultValue: connected ? `https://${integration.id}.fibernms.internal` : "",
                placeholder: "https://…",
                className: "h-8 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "API Token / Secret" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                placeholder: "Enter integration secret…",
                className: "h-8 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-7 text-xs",
                onClick: () => {
                  setConfigOpen(false);
                  ue.success("Settings saved");
                },
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs",
                onClick: () => setConfigOpen(false),
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function IntegrationsTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: CATEGORIES.map((cat) => {
    const items = INTEGRATIONS.filter((i) => i.category === cat);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: cat }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-border text-muted-foreground",
            children: items.length
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: items.map((int) => /* @__PURE__ */ jsxRuntimeExports.jsx(IntegrationCard, { integration: int }, int.id)) })
    ] }, cat);
  }) });
}
const PLAN_RATE_LIMITS = {
  BASIC: { monthly: 5e4, perMinute: 20, burst: 50 },
  PROFESSIONAL: { monthly: 5e5, perMinute: 100, burst: 200 },
  ENTERPRISE: { monthly: 5e6, perMinute: 1e3, burst: 2e3 },
  ULTRA: { monthly: 5e7, perMinute: 1e4, burst: 25e3 }
};
function formatNum(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}
function RateLimitsTab() {
  const sub = useSubscription();
  const limits = PLAN_RATE_LIMITS[sub.currentPlan] ?? PLAN_RATE_LIMITS.ENTERPRISE;
  const apiPct = sub.apiQuota > 0 ? Math.min(100, sub.apiUsed / sub.apiQuota * 100) : 0;
  const resetDate = new Date(Date.now() + 14 * 864e5).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      {
        label: "Monthly Quota",
        value: formatNum(limits.monthly),
        icon: Activity,
        sub: "calls / month"
      },
      {
        label: "Rate Limit",
        value: `${formatNum(limits.perMinute)}/min`,
        icon: Zap,
        sub: "sustained rate"
      },
      {
        label: "Burst Limit",
        value: formatNum(limits.burst),
        icon: ChevronUp,
        sub: "short bursts"
      }
    ].map(({ label, value, icon: Icon, sub: subLabel }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subLabel })
      ] })
    ] }) }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Monthly Usage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Resets on ",
            resetDate
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono font-semibold text-foreground", children: [
            formatNum(sub.apiUsed),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
              "/ ",
              formatNum(sub.apiQuota)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            apiPct.toFixed(1),
            "% used"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          value: apiPct,
          className: cn(
            "h-2",
            apiPct > 85 ? "[&>div]:bg-rose-500" : apiPct > 60 ? "[&>div]:bg-amber-500" : "[&>div]:bg-primary"
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "size-4 text-primary" }),
        "Recent API Activity",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-border text-muted-foreground",
            children: "Last 10 calls"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground w-16", children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Endpoint" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Response" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: API_ACTIVITY.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "hover:bg-muted/30 transition-colors",
            "data-ocid": `api-activity-row-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-xs font-mono border",
                    entry.method === "POST" ? "border-primary/40 text-primary" : "border-border text-muted-foreground"
                  ),
                  children: entry.method
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-foreground", children: entry.endpoint }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatRelativeTime(entry.timestamp) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-xs font-mono text-muted-foreground", children: [
                entry.responseTime,
                "ms"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HttpStatusBadge, { code: entry.status }) })
            ]
          },
          `${entry.endpoint}-${entry.timestamp}`
        )) })
      ] }) })
    ] })
  ] });
}
function Integrations() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5 md:space-y-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "API & Integrations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage API keys, webhook endpoints, and third-party integrations for your FiberNMS organization." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeatureGate,
      {
        feature: FeatureFlag.API_ACCESS,
        mode: "replace",
        featureLabel: "API & Integrations",
        description: "Access the API management panel, webhook configuration, and OSS/BSS integration connectors. Available on Enterprise plan and above.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "api-keys", className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsList,
            {
              className: "bg-muted/60 gap-1 h-9",
              "data-ocid": "integrations-tabs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "api-keys",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-api-keys",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-3.5" }),
                      "API Keys"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "webhooks",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-webhooks",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Webhook, { className: "size-3.5" }),
                      "Webhooks"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "integrations",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-integrations",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "size-3.5" }),
                      "Integrations"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "rate-limits",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-rate-limits",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5" }),
                      "Rate Limits"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "api-keys", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeysTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "webhooks", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebhooksTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "integrations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IntegrationsTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rate-limits", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RateLimitsTab, {}) })
        ] })
      }
    )
  ] });
}
export {
  Integrations as default
};
