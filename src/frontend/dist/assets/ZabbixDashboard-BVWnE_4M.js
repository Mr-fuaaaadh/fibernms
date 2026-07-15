import { c as createLucideIcon, j as jsxRuntimeExports, h as Root, r as reactExports, a_ as Trigger, a$ as useComposedRefs, b0 as WarningProvider, i as Content, b1 as composeEventHandlers, f as Title, b2 as Description, b3 as Close, b4 as createDialogScope, P as Portal, O as Overlay, b5 as createSlottable, b6 as createContextScope, a as cn, m as motion, b7 as ChevronLeft, aC as Database, aF as Settings, A as AnimatePresence, ae as Badge, l as Clock, S as Server, d as Activity, s as CircleAlert, b8 as ShieldAlert, t as Search, aP as Info, ai as Zap, T as TriangleAlert, q as ChevronRight } from "./index-BhX-NLFL.js";
import { U as Unplug, T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, Z as ZabbixConfigSheet } from "./ZabbixConfigSheet-2JJKnFdZ.js";
import { b as buttonVariants, B as Button } from "./button-BH__aUd2.js";
import { C as Card, c as CardContent } from "./card-CwUeXz8q.js";
import { I as Input } from "./input-C1nieiBM.js";
import { L as Label } from "./label-BMe5E3hn.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DNof5wyz.js";
import { S as Switch } from "./switch-7IgBXOfi.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D0UucJaP.js";
import { u as ue } from "./index-wIYsNRKm.js";
import { R as RefreshCw } from "./refresh-cw-CSaOG_fq.js";
import { W as WifiOff } from "./wifi-off-BI_26hxd.js";
import "./circle-check-k6E8EYPA.js";
import "./check-gNBXC45_.js";
import "./index-DQIBdMh9.js";
import "./index-IXOTxK3N.js";
import "./index-JzkI5PaR.js";
import "./index-D4_OH3HG.js";
import "./index-DGmTsTau.js";
import "./chevron-up-Crhg0lxx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }],
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }]
];
const MonitorCheck = createLucideIcon("monitor-check", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger2, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const M = 6e4;
const MOCK_HOSTS = [
  {
    id: "h1",
    name: "OLT-Core-01",
    ip: "192.168.1.10",
    group: "Network/OLT",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M
  },
  {
    id: "h2",
    name: "OLT-Core-02",
    ip: "192.168.1.11",
    group: "Network/OLT",
    status: "Problem",
    problems: 3,
    lastCheck: Date.now() - 2 * M
  },
  {
    id: "h3",
    name: "OLT-Edge-05",
    ip: "10.10.5.1",
    group: "Edge/OLT",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 3 * M
  },
  {
    id: "h4",
    name: "OLT-Edge-06",
    ip: "10.10.5.2",
    group: "Edge/OLT",
    status: "Unavailable",
    problems: 1,
    lastCheck: Date.now() - 15 * M
  },
  {
    id: "h5",
    name: "Switch-Dist-03",
    ip: "192.168.2.10",
    group: "Network/Switch",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M
  },
  {
    id: "h6",
    name: "Switch-Dist-04",
    ip: "192.168.2.11",
    group: "Network/Switch",
    status: "Problem",
    problems: 2,
    lastCheck: Date.now() - 5 * M
  },
  {
    id: "h7",
    name: "Router-WAN-02",
    ip: "10.0.0.2",
    group: "WAN/Router",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M
  },
  {
    id: "h8",
    name: "Router-Core-01",
    ip: "10.0.0.1",
    group: "Core/Router",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M
  },
  {
    id: "h9",
    name: "Router-Core-02",
    ip: "10.0.0.3",
    group: "Core/Router",
    status: "Problem",
    problems: 1,
    lastCheck: Date.now() - 8 * M
  },
  {
    id: "h10",
    name: "Splitter-Node-14",
    ip: "192.168.5.14",
    group: "Field/Splitter",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 3 * M
  },
  {
    id: "h11",
    name: "Splitter-Node-15",
    ip: "192.168.5.15",
    group: "Field/Splitter",
    status: "Unavailable",
    problems: 2,
    lastCheck: Date.now() - 20 * M
  },
  {
    id: "h12",
    name: "Splitter-Node-16",
    ip: "192.168.5.16",
    group: "Field/Splitter",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 4 * M
  },
  {
    id: "h13",
    name: "NMS-Server-01",
    ip: "10.1.1.100",
    group: "Infrastructure/Server",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M
  },
  {
    id: "h14",
    name: "Firewall-DC-01",
    ip: "10.1.1.1",
    group: "Security/Firewall",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M
  },
  {
    id: "h15",
    name: "Firewall-DC-02",
    ip: "10.1.1.2",
    group: "Security/Firewall",
    status: "Problem",
    problems: 1,
    lastCheck: Date.now() - 6 * M
  },
  {
    id: "h16",
    name: "DNS-Server-01",
    ip: "10.1.2.10",
    group: "Infrastructure/DNS",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M
  },
  {
    id: "h17",
    name: "DHCP-Server-01",
    ip: "10.1.2.11",
    group: "Infrastructure/DHCP",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 3 * M
  },
  {
    id: "h18",
    name: "Monitoring-Probe-01",
    ip: "10.20.1.1",
    group: "Monitoring/Probe",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M
  },
  {
    id: "h19",
    name: "ONT-Cluster-01",
    ip: "192.168.10.1",
    group: "Field/ONT",
    status: "Problem",
    problems: 4,
    lastCheck: Date.now() - 10 * M
  },
  {
    id: "h20",
    name: "ONT-Cluster-02",
    ip: "192.168.10.2",
    group: "Field/ONT",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M
  }
];
const MOCK_TRIGGERS = [
  // ── Disaster (3) — all Problem
  {
    id: "t1",
    name: "Interface critically down — GigabitEthernet0/0",
    host: "OLT-Core-02",
    severity: "disaster",
    state: "Problem",
    lastEvent: Date.now() - 4 * M
  },
  {
    id: "t2",
    name: "Fiber link failure — trunk port 1/0/1",
    host: "OLT-Edge-06",
    severity: "disaster",
    state: "Problem",
    lastEvent: Date.now() - 12 * M
  },
  {
    id: "t3",
    name: "BGP session down — peer AS65001",
    host: "Router-Core-02",
    severity: "disaster",
    state: "Problem",
    lastEvent: Date.now() - 30 * M
  },
  // ── High (5) — all Problem
  {
    id: "t4",
    name: "High CPU load > 95% — sustained 10 min",
    host: "OLT-Core-02",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 6 * M
  },
  {
    id: "t5",
    name: "Ping failed — host unreachable",
    host: "Router-Core-02",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 8 * M
  },
  {
    id: "t6",
    name: "Port flapping detected — Gi0/24",
    host: "Switch-Dist-04",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 5 * M
  },
  {
    id: "t7",
    name: "Memory usage critical > 92%",
    host: "Firewall-DC-02",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 20 * M
  },
  {
    id: "t8",
    name: "ONT cluster connection failure — 12 ONTs offline",
    host: "ONT-Cluster-01",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 15 * M
  },
  // ── Average (8) — 4 Problem, 4 Resolved
  {
    id: "t9",
    name: "Disk space low < 10% on /var/lib/zabbix",
    host: "NMS-Server-01",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 45 * M
  },
  {
    id: "t10",
    name: "Interface error rate > 1% on eth2",
    host: "Switch-Dist-04",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 60 * M
  },
  {
    id: "t11",
    name: "SNMP timeout — host not responding",
    host: "Splitter-Node-15",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 35 * M
  },
  {
    id: "t12",
    name: "Link down — port Gi1/0/8",
    host: "OLT-Edge-06",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 22 * M
  },
  {
    id: "t13",
    name: "Packet loss > 5% — upstream link",
    host: "Router-WAN-02",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 90 * M
  },
  {
    id: "t14",
    name: "Interface utilization > 85%",
    host: "Router-Core-01",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 120 * M
  },
  {
    id: "t15",
    name: "ARP cache overflow detected",
    host: "Switch-Dist-03",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 180 * M
  },
  {
    id: "t16",
    name: "Fan speed abnormal — chassis fan 2",
    host: "OLT-Core-01",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 200 * M
  },
  // ── Warning (8) — 4 Problem, 4 Resolved
  {
    id: "t17",
    name: "High bandwidth utilization > 75% on uplink",
    host: "Router-Core-01",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 25 * M
  },
  {
    id: "t18",
    name: "Temperature warning — chassis temp 72°C",
    host: "OLT-Core-02",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 40 * M
  },
  {
    id: "t19",
    name: "TLS certificate expiring in 14 days",
    host: "Firewall-DC-01",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 55 * M
  },
  {
    id: "t20",
    name: "Config backup missed — scheduled task failed",
    host: "NMS-Server-01",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 70 * M
  },
  {
    id: "t21",
    name: "Optical Rx power near threshold",
    host: "Splitter-Node-14",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 150 * M
  },
  {
    id: "t22",
    name: "NTP sync drift > 100ms",
    host: "DHCP-Server-01",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 160 * M
  },
  {
    id: "t23",
    name: "DNS query latency elevated > 200ms",
    host: "DNS-Server-01",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 170 * M
  },
  {
    id: "t24",
    name: "Interface duplex mismatch detected",
    host: "Monitoring-Probe-01",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 240 * M
  },
  // ── Info (6) — 3 Problem, 3 Resolved
  {
    id: "t25",
    name: "Scheduled maintenance window started",
    host: "NMS-Server-01",
    severity: "info",
    state: "Problem",
    lastEvent: Date.now() - 10 * M
  },
  {
    id: "t26",
    name: "Firmware update available — version 7.2.1",
    host: "OLT-Core-01",
    severity: "info",
    state: "Problem",
    lastEvent: Date.now() - 80 * M
  },
  {
    id: "t27",
    name: "Configuration change detected via SNMP trap",
    host: "Firewall-DC-01",
    severity: "info",
    state: "Problem",
    lastEvent: Date.now() - 100 * M
  },
  {
    id: "t28",
    name: "Scheduled maintenance window ended",
    host: "NMS-Server-01",
    severity: "info",
    state: "Resolved",
    lastEvent: Date.now() - 130 * M
  },
  {
    id: "t29",
    name: "Agent auto-update completed successfully",
    host: "Monitoring-Probe-01",
    severity: "info",
    state: "Resolved",
    lastEvent: Date.now() - 250 * M
  },
  {
    id: "t30",
    name: "Host added to monitoring — Splitter-Node-16",
    host: "Splitter-Node-16",
    severity: "info",
    state: "Resolved",
    lastEvent: Date.now() - 300 * M
  }
];
function fmtRelative(ts) {
  const d = Date.now() - ts;
  if (d < 6e4) return `${Math.floor(d / 1e3)}s ago`;
  if (d < 36e5) return `${Math.floor(d / 6e4)}m ago`;
  if (d < 864e5) return `${Math.floor(d / 36e5)}h ago`;
  return `${Math.floor(d / 864e5)}d ago`;
}
const HOST_STATUS_CFG = {
  Available: {
    label: "Available",
    cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
  },
  Problem: {
    label: "Problem",
    cls: "bg-orange-500/15 text-orange-400 border-orange-500/30"
  },
  Unavailable: {
    label: "Unavailable",
    cls: "bg-rose-500/15 text-rose-400 border-rose-500/30"
  }
};
const SEVERITY_CFG = {
  disaster: {
    label: "Disaster",
    cls: "bg-red-500/15 text-red-400 border-red-500/30",
    chipCls: "bg-red-500 text-white border-red-500",
    icon: ShieldAlert
  },
  high: {
    label: "High",
    cls: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    chipCls: "bg-orange-500 text-white border-orange-500",
    icon: CircleAlert
  },
  average: {
    label: "Average",
    cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    chipCls: "bg-yellow-500 text-black border-yellow-500",
    icon: TriangleAlert
  },
  warning: {
    label: "Warning",
    cls: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    chipCls: "bg-blue-500 text-white border-blue-500",
    icon: Zap
  },
  info: {
    label: "Info",
    cls: "bg-muted text-muted-foreground border-border",
    chipCls: "bg-secondary text-foreground border-border",
    icon: Info
  }
};
const PAGE_SIZE = 10;
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconCls,
  ocid,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1 tabular-nums", children: value }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "size-10 rounded-xl flex items-center justify-center shrink-0",
              iconCls
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" })
          }
        )
      ] }) }) })
    }
  );
}
function Pagination({
  page,
  total,
  pageSize,
  onChange,
  ocidPrefix
}) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Showing ",
      (page - 1) * pageSize + 1,
      "–",
      Math.min(page * pageSize, total),
      " ",
      "of ",
      total
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "h-7 w-7 p-0",
          disabled: page === 1,
          onClick: () => onChange(page - 1),
          "data-ocid": `${ocidPrefix}.pagination_prev`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-3.5" })
        }
      ),
      Array.from({ length: pages }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: p === page ? "default" : "ghost",
          size: "sm",
          className: "h-7 w-7 p-0 text-xs",
          onClick: () => onChange(p),
          "data-ocid": `${ocidPrefix}.page-${p}`,
          children: p
        },
        p
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "h-7 w-7 p-0",
          disabled: page === pages,
          onClick: () => onChange(page + 1),
          "data-ocid": `${ocidPrefix}.pagination_next`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3.5" })
        }
      )
    ] })
  ] });
}
function ZabbixDashboard() {
  const [configOpen, setConfigOpen] = reactExports.useState(false);
  const [connection, setConnection] = reactExports.useState({
    connected: true,
    lastSync: Date.now() - 5 * M,
    hostCount: MOCK_HOSTS.length,
    activeAlerts: MOCK_TRIGGERS.filter(
      (t) => t.state === "Problem" && (t.severity === "disaster" || t.severity === "high")
    ).length
  });
  const [syncing, setSyncing] = reactExports.useState(false);
  const [autoSync, setAutoSync] = reactExports.useState(true);
  const [syncInterval, setSyncInterval] = reactExports.useState("5");
  const [hostSearch, setHostSearch] = reactExports.useState("");
  const [hostPage, setHostPage] = reactExports.useState(1);
  const [severityFilter, setSeverityFilter] = reactExports.useState(
    "all"
  );
  const [triggerPage, setTriggerPage] = reactExports.useState(1);
  const hostsOnline = reactExports.useMemo(
    () => MOCK_HOSTS.filter((h) => h.status === "Available").length,
    []
  );
  const hostsOffline = reactExports.useMemo(
    () => MOCK_HOSTS.filter((h) => h.status === "Unavailable").length,
    []
  );
  const activeTriggers = reactExports.useMemo(
    () => MOCK_TRIGGERS.filter((t) => t.state === "Problem").length,
    []
  );
  const filteredHosts = reactExports.useMemo(() => {
    const q = hostSearch.toLowerCase();
    return q ? MOCK_HOSTS.filter(
      (h) => h.name.toLowerCase().includes(q) || h.ip.includes(q) || h.group.toLowerCase().includes(q)
    ) : MOCK_HOSTS;
  }, [hostSearch]);
  const pagedHosts = filteredHosts.slice(
    (hostPage - 1) * PAGE_SIZE,
    hostPage * PAGE_SIZE
  );
  const filteredTriggers = reactExports.useMemo(
    () => severityFilter === "all" ? MOCK_TRIGGERS : MOCK_TRIGGERS.filter((t) => t.severity === severityFilter),
    [severityFilter]
  );
  const pagedTriggers = filteredTriggers.slice(
    (triggerPage - 1) * PAGE_SIZE,
    triggerPage * PAGE_SIZE
  );
  function handleHostSearchChange(v) {
    setHostSearch(v);
    setHostPage(1);
  }
  function handleSeverityFilter(sev) {
    setSeverityFilter(sev);
    setTriggerPage(1);
  }
  async function handleSyncNow() {
    if (!connection.connected) return;
    setSyncing(true);
    ue.info("Zabbix sync started…");
    await new Promise((r) => setTimeout(r, 1500));
    setSyncing(false);
    setConnection((prev) => ({ ...prev, lastSync: Date.now() }));
    ue.success("Sync complete — 20 hosts, 30 triggers updated");
  }
  function handleDisconnect() {
    setConnection({ connected: false, hostCount: 0, activeAlerts: 0 });
    ue.success("Zabbix disconnected");
  }
  function handleConnectionChange(state) {
    setConnection(state);
    if (state.connected) ue.success("Zabbix settings saved");
  }
  const severityChips = [
    "all",
    "disaster",
    "high",
    "average",
    "warning",
    "info"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "min-h-full bg-background",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      "data-ocid": "zabbix-dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 sm:px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3",
              "aria-label": "Breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/integrations",
                    className: "hover:text-foreground transition-colors",
                    "data-ocid": "zabbix-dashboard.breadcrumb-integrations",
                    children: "Integrations"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-3 rotate-180" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Zabbix" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "size-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground leading-tight", children: "Zabbix Integration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Network monitoring & alert management via Zabbix API" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:ml-auto shrink-0 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "gap-2 h-8 text-xs",
                  onClick: handleSyncNow,
                  disabled: syncing || !connection.connected,
                  "data-ocid": "zabbix-dashboard.sync_button",
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "gap-2 h-8 text-xs",
                  onClick: () => setConfigOpen(true),
                  "data-ocid": "zabbix-dashboard.settings_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-3.5" }),
                    "Settings"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !connection.connected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3",
                  "data-ocid": "zabbix-dashboard.disconnected_banner",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Unplug, { className: "size-4 text-amber-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-amber-400", children: "Zabbix server not configured" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-400/70 mt-0.5", children: "Click Configure to get started and connect your Zabbix instance." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "gap-2 h-8 text-xs shrink-0",
                        onClick: () => setConfigOpen(true),
                        "data-ocid": "zabbix-dashboard.configure_button",
                        children: "Configure"
                      }
                    )
                  ]
                }
              )
            },
            "disconnected"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3",
                  "data-ocid": "zabbix-dashboard.connected_banner",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorCheck, { className: "size-4 text-emerald-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-emerald-400", children: "Connected" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                            children: "zabbix.fibernms.internal"
                          }
                        )
                      ] }),
                      connection.lastSync && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-400/70 mt-0.5 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
                        "Last synced ",
                        fmtRelative(connection.lastSync)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          className: "gap-1.5 h-8 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10",
                          onClick: handleSyncNow,
                          disabled: syncing,
                          "data-ocid": "zabbix-dashboard.banner_sync_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              RefreshCw,
                              {
                                className: cn("size-3", syncing && "animate-spin")
                              }
                            ),
                            "Sync Now"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          className: "gap-1.5 h-8 text-xs",
                          onClick: () => setConfigOpen(true),
                          "data-ocid": "zabbix-dashboard.banner_settings_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-3" }),
                            "Settings"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              )
            },
            "connected"
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Total Hosts",
                value: MOCK_HOSTS.length,
                sub: "monitored by Zabbix",
                icon: Server,
                iconCls: "bg-sky-500/20 text-sky-400",
                ocid: "zabbix-dashboard.kpi-total-hosts",
                delay: 0.05
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Hosts Online",
                value: hostsOnline,
                sub: `${Math.round(hostsOnline / MOCK_HOSTS.length * 100)}% availability`,
                icon: Activity,
                iconCls: "bg-emerald-500/20 text-emerald-400",
                ocid: "zabbix-dashboard.kpi-hosts-online",
                delay: 0.1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Hosts Offline",
                value: hostsOffline,
                sub: `${MOCK_HOSTS.filter((h) => h.status === "Problem").length} with problems`,
                icon: WifiOff,
                iconCls: hostsOffline > 0 ? "bg-rose-500/20 text-rose-400" : "bg-muted text-muted-foreground",
                ocid: "zabbix-dashboard.kpi-hosts-offline",
                delay: 0.15
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Active Triggers",
                value: activeTriggers,
                sub: `${MOCK_TRIGGERS.filter((t) => t.severity === "disaster" && t.state === "Problem").length} disaster severity`,
                icon: CircleAlert,
                iconCls: activeTriggers > 0 ? "bg-amber-500/20 text-amber-400" : "bg-muted text-muted-foreground",
                ocid: "zabbix-dashboard.kpi-active-triggers",
                delay: 0.2
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Tabs,
            {
              defaultValue: "hosts",
              className: "space-y-4",
              "data-ocid": "zabbix-dashboard.tabs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto bg-muted/50 border border-border h-auto p-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    TabsTrigger,
                    {
                      value: "hosts",
                      className: "flex-1 sm:flex-none text-xs gap-1.5",
                      "data-ocid": "zabbix-dashboard.hosts_tab",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "size-3.5" }),
                        "Hosts",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "ml-1 text-xs border-border text-muted-foreground px-1.5 py-0",
                            children: MOCK_HOSTS.length
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    TabsTrigger,
                    {
                      value: "triggers",
                      className: "flex-1 sm:flex-none text-xs gap-1.5",
                      "data-ocid": "zabbix-dashboard.triggers_tab",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-3.5" }),
                        "Triggers",
                        activeTriggers > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "ml-1 text-xs bg-rose-500/15 text-rose-400 border-rose-500/30 px-1.5 py-0",
                            children: activeTriggers
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "hosts", className: "mt-0 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: hostSearch,
                        onChange: (e) => handleHostSearchChange(e.target.value),
                        placeholder: "Search by hostname, IP, or group…",
                        className: "h-9 text-sm pl-9",
                        "data-ocid": "zabbix-dashboard.hosts_search_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filteredHosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-16 text-center",
                      "data-ocid": "zabbix-dashboard.hosts_empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-8 text-muted-foreground mx-auto mb-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No hosts found" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Try a different search term" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { style: { minWidth: 600 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground pl-4", children: "Host Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "IP Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground hidden md:table-cell", children: "Group" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Status" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Problems" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right pr-4 hidden lg:table-cell", children: "Last Check" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: pagedHosts.map((host, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        TableRow,
                        {
                          className: "hover:bg-muted/30 transition-colors",
                          "data-ocid": `zabbix-dashboard.host.${(hostPage - 1) * PAGE_SIZE + i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium text-foreground py-3 pl-4", children: host.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-mono text-muted-foreground py-3", children: host.ip }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground py-3 hidden md:table-cell", children: host.group }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: cn(
                                  "text-xs border",
                                  HOST_STATUS_CFG[host.status].cls
                                ),
                                children: HOST_STATUS_CFG[host.status].label
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right py-3", children: host.problems > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: "text-xs bg-rose-500/15 text-rose-400 border-rose-500/30",
                                children: host.problems
                              }
                            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "0" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-xs text-muted-foreground py-3 pr-4 hidden lg:table-cell", children: fmtRelative(host.lastCheck) })
                          ]
                        },
                        host.id
                      )) })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Pagination,
                      {
                        page: hostPage,
                        total: filteredHosts.length,
                        pageSize: PAGE_SIZE,
                        onChange: setHostPage,
                        ocidPrefix: "zabbix-dashboard.hosts"
                      }
                    )
                  ] }) }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "triggers", className: "mt-0 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex gap-1.5 overflow-x-auto pb-1",
                      style: { scrollbarWidth: "none" },
                      children: severityChips.map((sev) => {
                        const active = severityFilter === sev;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.button,
                          {
                            type: "button",
                            whileTap: { scale: 0.93 },
                            onClick: () => handleSeverityFilter(sev),
                            className: cn(
                              "px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0",
                              active ? sev === "all" ? "bg-primary text-primary-foreground border-primary" : SEVERITY_CFG[sev].chipCls : "border-border text-muted-foreground bg-transparent hover:bg-muted/50"
                            ),
                            "data-ocid": `zabbix-dashboard.severity_filter.${sev}`,
                            children: sev === "all" ? "All" : SEVERITY_CFG[sev].label
                          },
                          sev
                        );
                      })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filteredTriggers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "py-16 text-center",
                      "data-ocid": "zabbix-dashboard.triggers_empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-8 text-muted-foreground mx-auto mb-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No triggers for selected severity" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Try selecting a different severity filter" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { style: { minWidth: 640 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground pl-4", children: "Trigger Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Host" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Severity" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "State" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right pr-4", children: "Last Event" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: pagedTriggers.map((t, i) => {
                        const scfg = SEVERITY_CFG[t.severity];
                        const Icon = scfg.icon;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          TableRow,
                          {
                            className: "hover:bg-muted/30 transition-colors",
                            "data-ocid": `zabbix-dashboard.trigger.${(triggerPage - 1) * PAGE_SIZE + i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm font-medium text-foreground py-3 pl-4 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 leading-snug", children: t.name }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground py-3 font-mono whitespace-nowrap", children: t.host }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                Badge,
                                {
                                  variant: "outline",
                                  className: cn(
                                    "text-xs border gap-1",
                                    scfg.cls
                                  ),
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-3" }),
                                    scfg.label
                                  ]
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Badge,
                                {
                                  variant: "outline",
                                  className: cn(
                                    "text-xs border",
                                    t.state === "Problem" ? "bg-rose-500/15 text-rose-400 border-rose-500/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  ),
                                  children: t.state
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-xs text-muted-foreground py-3 pr-4 whitespace-nowrap", children: fmtRelative(t.lastEvent) })
                            ]
                          },
                          t.id
                        );
                      }) })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Pagination,
                      {
                        page: triggerPage,
                        total: filteredTriggers.length,
                        pageSize: PAGE_SIZE,
                        onChange: setTriggerPage,
                        ocidPrefix: "zabbix-dashboard.triggers"
                      }
                    )
                  ] }) }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4 text-red-400" }),
              "Sync Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sync-interval", className: "text-xs", children: "Sync Interval" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: syncInterval, onValueChange: setSyncInterval, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        id: "sync-interval",
                        className: "h-9 text-sm",
                        "data-ocid": "zabbix-dashboard.sync_interval_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "5", children: "Every 5 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "15", children: "Every 15 minutes" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "Every 30 minutes" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: "Auto-sync" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Automatically pull hosts and triggers" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: autoSync,
                      onCheckedChange: setAutoSync,
                      "data-ocid": "zabbix-dashboard.auto_sync_switch",
                      "aria-label": "Auto sync"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/20 px-4 py-3 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: "Last Sync" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
                    connection.lastSync ? fmtRelative(connection.lastSync) : "Never"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "gap-2 h-8 text-xs",
                      onClick: handleSyncNow,
                      disabled: syncing || !connection.connected,
                      "data-ocid": "zabbix-dashboard.sync_now_button",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "gap-2 h-8 text-xs text-rose-400 hover:bg-rose-500/10",
                        disabled: !connection.connected,
                        "data-ocid": "zabbix-dashboard.disconnect_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Unplug, { className: "size-3.5" }),
                          "Disconnect"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "zabbix-dashboard.disconnect_dialog", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Disconnect Zabbix?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will remove the Zabbix connection from FiberNMS. Host and trigger data will no longer be synced. You can reconnect at any time." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "zabbix-dashboard.disconnect_cancel_button", children: "Cancel" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          AlertDialogAction,
                          {
                            onClick: handleDisconnect,
                            className: "bg-rose-600 hover:bg-rose-500 text-white border-0",
                            "data-ocid": "zabbix-dashboard.disconnect_confirm_button",
                            children: "Disconnect"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ZabbixConfigSheet,
          {
            open: configOpen,
            onOpenChange: setConfigOpen,
            connectionState: connection,
            onConnectionChange: handleConnectionChange
          }
        )
      ]
    }
  );
}
export {
  ZabbixDashboard as default
};
