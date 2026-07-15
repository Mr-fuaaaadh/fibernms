import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, b9 as Sheet, ba as SheetContent, bb as SheetHeader, bc as SheetTitle, ae as Badge, S as Server, X, ai as Zap, l as Clock, t as Search, aP as Info, T as TriangleAlert, s as CircleAlert, b8 as ShieldAlert } from "./index-BhX-NLFL.js";
import { B as Button } from "./button-BH__aUd2.js";
import { I as Input } from "./input-C1nieiBM.js";
import { L as Label } from "./label-BMe5E3hn.js";
import { S as Switch } from "./switch-7IgBXOfi.js";
import { u as ue } from "./index-wIYsNRKm.js";
import { C as CircleCheck } from "./circle-check-k6E8EYPA.js";
import { R as RefreshCw } from "./refresh-cw-CSaOG_fq.js";
import { C as Check } from "./check-gNBXC45_.js";
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
const MOCK_HOSTS = [
  {
    id: "h1",
    name: "OLT-Core-01",
    ip: "10.10.1.1",
    hostGroup: "OLT Devices",
    status: "enabled",
    problems: 2
  },
  {
    id: "h2",
    name: "OLT-Core-02",
    ip: "10.10.1.2",
    hostGroup: "OLT Devices",
    status: "enabled",
    problems: 0
  },
  {
    id: "h3",
    name: "Switch-Dist-03",
    ip: "10.10.2.3",
    hostGroup: "Distribution",
    status: "enabled",
    problems: 1
  },
  {
    id: "h4",
    name: "Switch-Access-07",
    ip: "10.10.2.7",
    hostGroup: "Access Layer",
    status: "enabled",
    problems: 0
  },
  {
    id: "h5",
    name: "Router-WAN-02",
    ip: "10.10.3.2",
    hostGroup: "WAN Routers",
    status: "enabled",
    problems: 3
  },
  {
    id: "h6",
    name: "Router-Core-01",
    ip: "10.10.3.1",
    hostGroup: "Core Routers",
    status: "disabled",
    problems: 0
  },
  {
    id: "h7",
    name: "Splitter-Node-14",
    ip: "10.10.4.14",
    hostGroup: "Passive Devices",
    status: "enabled",
    problems: 0
  },
  {
    id: "h8",
    name: "NMS-Server-01",
    ip: "10.10.5.1",
    hostGroup: "Management",
    status: "enabled",
    problems: 0
  },
  {
    id: "h9",
    name: "OLT-Edge-05",
    ip: "10.10.1.5",
    hostGroup: "OLT Devices",
    status: "enabled",
    problems: 1
  },
  {
    id: "h10",
    name: "Firewall-DC-01",
    ip: "10.10.6.1",
    hostGroup: "Security",
    status: "enabled",
    problems: 0
  }
];
const MOCK_TRIGGERS = [
  {
    id: "t1",
    name: "Interface down on OLT-Core-01",
    host: "OLT-Core-01",
    severity: "disaster",
    lastChange: Date.now() - 4 * 6e4,
    acknowledged: false
  },
  {
    id: "t2",
    name: "High CPU usage on Router-WAN-02",
    host: "Router-WAN-02",
    severity: "high",
    lastChange: Date.now() - 12 * 6e4,
    acknowledged: false
  },
  {
    id: "t3",
    name: "ICMP ping failed — OLT-Edge-05",
    host: "OLT-Edge-05",
    severity: "average",
    lastChange: Date.now() - 28 * 6e4,
    acknowledged: true
  },
  {
    id: "t4",
    name: "Low available memory on Router-WAN-02",
    host: "Router-WAN-02",
    severity: "high",
    lastChange: Date.now() - 35 * 6e4,
    acknowledged: false
  },
  {
    id: "t5",
    name: "Fiber port signal low — OLT-Core-01",
    host: "OLT-Core-01",
    severity: "average",
    lastChange: Date.now() - 47 * 6e4,
    acknowledged: false
  },
  {
    id: "t6",
    name: "Switch-Dist-03 port flapping",
    host: "Switch-Dist-03",
    severity: "warning",
    lastChange: Date.now() - 60 * 6e4,
    acknowledged: true
  },
  {
    id: "t7",
    name: "Router-WAN-02 BGP session down",
    host: "Router-WAN-02",
    severity: "disaster",
    lastChange: Date.now() - 72 * 6e4,
    acknowledged: false
  },
  {
    id: "t8",
    name: "Scheduled backup missed on NMS-Server-01",
    host: "NMS-Server-01",
    severity: "information",
    lastChange: Date.now() - 120 * 6e4,
    acknowledged: true
  }
];
function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return `${Math.floor(diff / 1e3)}s ago`;
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
const SEVERITY_CFG = {
  disaster: {
    label: "Disaster",
    color: "text-red-400 bg-red-500/15 border-red-500/30",
    icon: ShieldAlert
  },
  high: {
    label: "High",
    color: "text-orange-400 bg-orange-500/15 border-orange-500/30",
    icon: CircleAlert
  },
  average: {
    label: "Average",
    color: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
    icon: TriangleAlert
  },
  warning: {
    label: "Warning",
    color: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    icon: Zap
  },
  information: {
    label: "Info",
    color: "text-muted-foreground bg-muted border-border",
    icon: Info
  }
};
function ZabbixConfigSheet({
  open,
  onOpenChange,
  onConnectionChange,
  connectionState
}) {
  const [authMethod, setAuthMethod] = reactExports.useState(
    "token"
  );
  const [serverUrl, setServerUrl] = reactExports.useState(
    "https://zabbix.fibernms.internal"
  );
  const [apiToken, setApiToken] = reactExports.useState("");
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [testState, setTestState] = reactExports.useState("idle");
  const [testMessage, setTestMessage] = reactExports.useState("");
  const [syncInterval, setSyncInterval] = reactExports.useState("5");
  const [autoSyncHosts, setAutoSyncHosts] = reactExports.useState(true);
  const [autoSyncTriggers, setAutoSyncTriggers] = reactExports.useState(true);
  const [importHostGroups, setImportHostGroups] = reactExports.useState(false);
  const [syncing, setSyncing] = reactExports.useState(false);
  const [hostSearch, setHostSearch] = reactExports.useState("");
  const [severityFilter, setSeverityFilter] = reactExports.useState("all");
  const filteredHosts = MOCK_HOSTS.filter(
    (h) => h.name.toLowerCase().includes(hostSearch.toLowerCase()) || h.ip.includes(hostSearch) || h.hostGroup.toLowerCase().includes(hostSearch.toLowerCase())
  );
  const filteredTriggers = MOCK_TRIGGERS.filter(
    (t) => severityFilter === "all" ? true : t.severity === severityFilter
  );
  async function handleTestConnection() {
    if (!serverUrl.trim()) {
      ue.error("Server URL is required");
      return;
    }
    setTestState("loading");
    await new Promise((r) => setTimeout(r, 1600));
    setTestState("success");
    setTestMessage("Connected to Zabbix 6.4.2");
    setTimeout(() => setTestState("idle"), 4e3);
  }
  async function handleSaveConnect() {
    if (!serverUrl.trim()) {
      ue.error("Server URL is required");
      return;
    }
    setTestState("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setTestState("idle");
    onConnectionChange({
      connected: true,
      lastSync: Date.now(),
      hostCount: MOCK_HOSTS.length,
      activeAlerts: MOCK_TRIGGERS.filter((t) => !t.acknowledged).length
    });
    ue.success("Zabbix connected — 10 hosts imported");
  }
  function handleDisconnect() {
    onConnectionChange({ connected: false, hostCount: 0, activeAlerts: 0 });
    setTestState("idle");
    setApiToken("");
    setPassword("");
    ue.success("Zabbix disconnected");
  }
  async function handleSyncNow() {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSyncing(false);
    onConnectionChange({ ...connectionState, lastSync: Date.now() });
    ue.success("Zabbix sync completed — 10 hosts, 8 triggers");
  }
  const activeTriggerCount = MOCK_TRIGGERS.filter(
    (t) => !t.acknowledged
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-2xl overflow-y-auto border-border bg-card p-0 flex flex-col",
      "data-ocid": "zabbix-config-sheet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-6 py-5 border-b border-border shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold font-mono shrink-0", children: "ZX" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-base font-semibold text-foreground", children: "Zabbix Integration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Open-source enterprise network monitoring & alerting platform" })
          ] }),
          connectionState.connected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs shrink-0",
              children: "Connected"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-5 space-y-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "size-4 text-red-400" }),
              "Connection Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "zbx-url", className: "text-xs", children: "Zabbix Server URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "zbx-url",
                    value: serverUrl,
                    onChange: (e) => setServerUrl(e.target.value),
                    placeholder: "https://zabbix.company.com",
                    className: "h-9 text-sm",
                    "data-ocid": "zabbix.server_url-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Authentication Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-lg border border-border overflow-hidden", children: ["token", "credentials"].map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAuthMethod(method),
                    className: cn(
                      "flex-1 px-4 py-2 text-xs font-medium transition-colors",
                      authMethod === method ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    ),
                    "data-ocid": `zabbix.auth-${method}-toggle`,
                    children: method === "token" ? "API Token" : "Username / Password"
                  },
                  method
                )) })
              ] }),
              authMethod === "token" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "zbx-token", className: "text-xs", children: "API Token" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "zbx-token",
                    type: "password",
                    value: apiToken,
                    onChange: (e) => setApiToken(e.target.value),
                    placeholder: "Paste your Zabbix API token…",
                    className: "h-9 text-sm font-mono",
                    "data-ocid": "zabbix.api-token-input"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "zbx-user", className: "text-xs", children: "Username" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "zbx-user",
                      value: username,
                      onChange: (e) => setUsername(e.target.value),
                      placeholder: "admin",
                      className: "h-9 text-sm",
                      "data-ocid": "zabbix.username-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "zbx-pass", className: "text-xs", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "zbx-pass",
                      type: "password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      placeholder: "••••••••",
                      className: "h-9 text-sm",
                      "data-ocid": "zabbix.password-input"
                    }
                  )
                ] })
              ] }),
              testState === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-emerald-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-400 font-medium", children: testMessage })
              ] }),
              testState === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-rose-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-rose-400 font-medium", children: "Connection failed — check URL and credentials" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-2 h-8 text-xs",
                    onClick: handleTestConnection,
                    disabled: testState === "loading",
                    "data-ocid": "zabbix.test-connection-button",
                    children: [
                      testState === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5 animate-spin" }) : testState === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3.5" }),
                      testState === "loading" ? "Testing…" : testState === "success" ? "Connected" : "Test Connection"
                    ]
                  }
                ),
                !connectionState.connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    className: "gap-2 h-8 text-xs bg-red-600 hover:bg-red-500 text-white border-0",
                    onClick: handleSaveConnect,
                    disabled: testState === "loading",
                    "data-ocid": "zabbix.save-connect-button",
                    children: [
                      testState === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }),
                      "Save & Connect"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "gap-2 h-8 text-xs text-rose-400 hover:bg-rose-500/10",
                    onClick: handleDisconnect,
                    "data-ocid": "zabbix.disconnect-button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Unplug, { className: "size-3.5" }),
                      "Disconnect"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          connectionState.connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4 text-red-400" }),
              "Sync Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "zbx-interval", className: "text-xs", children: "Sync Interval" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "zbx-interval",
                    value: syncInterval,
                    onChange: (e) => setSyncInterval(e.target.value),
                    className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
                    "data-ocid": "zabbix.sync-interval-select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "Every 1 minute" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "Every 5 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "15", children: "Every 15 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "Every 30 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "60", children: "Every 1 hour" })
                    ]
                  }
                )
              ] }),
              [
                {
                  id: "hosts",
                  label: "Auto-sync hosts",
                  desc: "Automatically import new hosts from Zabbix",
                  value: autoSyncHosts,
                  set: setAutoSyncHosts,
                  ocid: "zabbix.auto-sync-hosts-switch"
                },
                {
                  id: "triggers",
                  label: "Auto-sync triggers / alerts",
                  desc: "Pull active triggers and alert states on each sync",
                  value: autoSyncTriggers,
                  set: setAutoSyncTriggers,
                  ocid: "zabbix.auto-sync-triggers-switch"
                },
                {
                  id: "groups",
                  label: "Import host groups as device groups",
                  desc: "Map Zabbix host groups to FiberNMS device groups",
                  value: importHostGroups,
                  set: setImportHostGroups,
                  ocid: "zabbix.import-groups-switch"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: item.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.desc })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: item.value,
                        onCheckedChange: item.set,
                        "data-ocid": item.ocid,
                        "aria-label": item.label
                      }
                    )
                  ]
                },
                item.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-2 h-8 text-xs",
                    onClick: handleSyncNow,
                    disabled: syncing,
                    "data-ocid": "zabbix.sync-now-button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RefreshCw,
                        {
                          className: cn("size-3.5", syncing && "animate-spin")
                        }
                      ),
                      syncing ? "Syncing…" : "Sync Now"
                    ]
                  }
                ),
                connectionState.lastSync && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
                  "Last synced ",
                  formatRelativeTime(connectionState.lastSync)
                ] })
              ] })
            ] })
          ] }),
          connectionState.connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Zabbix Hosts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-border text-muted-foreground",
                    children: MOCK_HOSTS.length
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: hostSearch,
                    onChange: (e) => setHostSearch(e.target.value),
                    placeholder: "Search hosts…",
                    className: "h-8 text-xs pl-9",
                    "data-ocid": "zabbix.hosts-search-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Host" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground hidden sm:table-cell", children: "IP / DNS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Group" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Problems" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredHosts.map((host, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TableRow,
                  {
                    className: "hover:bg-muted/30 transition-colors",
                    "data-ocid": `zabbix.host.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-medium text-foreground py-2", children: host.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-mono text-muted-foreground py-2 hidden sm:table-cell", children: host.ip }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground py-2 hidden md:table-cell", children: host.hostGroup }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: cn(
                            "text-xs border",
                            host.status === "enabled" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted text-muted-foreground border-border"
                          ),
                          children: host.status === "enabled" ? "Enabled" : "Disabled"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right py-2", children: host.problems > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs bg-rose-500/15 text-rose-400 border-rose-500/30",
                          children: host.problems
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "0" }) })
                    ]
                  },
                  host.id
                )) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Active Triggers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "text-xs border",
                      activeTriggerCount > 0 ? "bg-rose-500/15 text-rose-400 border-rose-500/30" : "border-border text-muted-foreground"
                    ),
                    children: activeTriggerCount
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: [
                "all",
                "disaster",
                "high",
                "average",
                "warning",
                "information"
              ].map((sev) => {
                var _a;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSeverityFilter(sev),
                    className: cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
                      severityFilter === sev ? sev === "all" ? "bg-primary text-primary-foreground border-primary" : cn((_a = SEVERITY_CFG[sev]) == null ? void 0 : _a.color, "border") : "border-border text-muted-foreground hover:border-border/80 bg-transparent"
                    ),
                    "data-ocid": `zabbix.severity-filter-${sev}`,
                    children: sev === "all" ? "All" : SEVERITY_CFG[sev].label
                  },
                  sev
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filteredTriggers.map((trigger, i) => {
                const cfg = SEVERITY_CFG[trigger.severity];
                const Icon = cfg.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2.5 hover:bg-muted/40 transition-colors",
                    "data-ocid": `zabbix.trigger.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "outline",
                          className: cn(
                            "text-xs border shrink-0 mt-0.5 gap-1 flex items-center",
                            cfg.color
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3" }),
                            cfg.label
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: trigger.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: trigger.host }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatRelativeTime(trigger.lastChange) })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: trigger.acknowledged ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 mr-1" }),
                            "Ack"
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs bg-muted text-muted-foreground border-border",
                          children: "Unack"
                        }
                      ) })
                    ]
                  },
                  trigger.id
                );
              }) })
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
export {
  Table as T,
  Unplug as U,
  ZabbixConfigSheet as Z,
  TableHeader as a,
  TableRow as b,
  TableHead as c,
  TableBody as d,
  TableCell as e
};
