import { c as createLucideIcon, j as jsxRuntimeExports, aj as Shield, aI as ShieldCheck, aF as Key, T as TriangleAlert, aB as PLAN_CONFIGS, e as cn, r as reactExports, aE as FeatureFlag, aJ as FEATURE_PLAN_MAP, at as Lock, ax as Plan, i as ChevronDown } from "./index-BuH20gNs.js";
import { P as PlanBadge } from "./PlanBadge-BGe-nJQn.js";
import { B as Button } from "./button-CVW8T4d4.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-CIHIzfID.js";
import { S as Separator } from "./separator--weetXFO.js";
import { T as Textarea } from "./textarea-BBKnlMRD.js";
import { u as useSubscription } from "./useFeature-fPL1Qlxm.js";
import { C as CircleCheck } from "./circle-check-CkO1g3Ux.js";
import { C as CircleX } from "./circle-x-Be5NGsgu.js";
import { R as RefreshCw } from "./refresh-cw-Bx1q4zim.js";
import { L as LoaderCircle } from "./loader-circle-_XjoRtYa.js";
import { W as WifiOff } from "./wifi-off-B96GV3Xu.js";
import { C as ChevronUp } from "./chevron-up-D3ytfDGQ.js";
import "./diamond-Cbb-3UjR.js";
import "./check-pSdlcahC.js";
import "./index-1XG5E_Xb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2", key: "1qhy41" }],
  ["line", { x1: "2", x2: "22", y1: "20", y2: "20", key: "ni3hll" }]
];
const LaptopMinimal = createLucideIcon("laptop-minimal", __iconNode);
const MOCK_HISTORY = [
  {
    id: "FNMS-ENT-2024-XPRD-779ACB",
    activatedAt: "Jan 12, 2024",
    plan: Plan.ENTERPRISE,
    expiryDate: "Jan 11, 2025",
    status: "Expired"
  },
  {
    id: "FNMS-PRO-2023-DEMO-449ACB",
    activatedAt: "Jun 02, 2023",
    plan: Plan.PROFESSIONAL,
    expiryDate: "Jun 01, 2024",
    status: "Revoked"
  },
  {
    id: "FNMS-ENT-2025-XXXX-XXXXXX",
    activatedAt: "Jan 14, 2025",
    plan: Plan.ENTERPRISE,
    expiryDate: "Jan 13, 2026",
    status: "Expired"
  }
];
const FEATURE_LABELS = {
  [FeatureFlag.DEVICE_CLUSTERING]: "Device Clustering",
  [FeatureFlag.GIS_ADVANCED]: "Advanced GIS Map Tools",
  [FeatureFlag.HISTORICAL_METRICS]: "Historical Metrics (30 days)",
  [FeatureFlag.ADVANCED_ALERTING]: "Advanced Alerting",
  [FeatureFlag.TOPOLOGY_VISUALIZATION]: "Full Topology Visualization",
  [FeatureFlag.REAL_TIME_MONITORING]: "Real-Time Monitoring (WebSockets)",
  [FeatureFlag.SLA_DASHBOARD]: "SLA & Service Assurance Dashboard",
  [FeatureFlag.PREDICTIVE_FAULTS]: "Predictive Fault Intelligence",
  [FeatureFlag.AUDIT_LOGS]: "Audit Logs & Compliance",
  [FeatureFlag.CAPACITY_PLANNING]: "Capacity Planning & Forecasting",
  [FeatureFlag.WORKFLOW_AUTOMATION]: "Workflow Automation Engine",
  [FeatureFlag.AI_INSIGHTS]: "AI Copilot & Insights",
  [FeatureFlag.API_ACCESS]: "REST/GraphQL API Access",
  [FeatureFlag.INTEGRATIONS]: "OSS/BSS Integrations",
  [FeatureFlag.WHITE_LABELING]: "White-Labeling & Custom Domain",
  [FeatureFlag.MULTI_TENANT]: "Multi-Tenant Management",
  [FeatureFlag.PLUGIN_SYSTEM]: "Plugin Marketplace",
  [FeatureFlag.DIGITAL_TWIN]: "Digital Twin Simulation"
};
function mockValidate(key) {
  const trimmed = key.trim().toUpperCase();
  if (trimmed.startsWith("ULTRA-") || trimmed === "FNMS-ULTRA-2026-DEMO") {
    return {
      valid: true,
      plan: Plan.ULTRA,
      orgName: "Global Carrier Corp — Tier-1",
      expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1e3
    };
  }
  if (trimmed.startsWith("ENT-") || trimmed === "FNMS-ENT-2026-DEMO-XXXXXX") {
    return {
      valid: true,
      plan: Plan.ENTERPRISE,
      orgName: "FiberNMS Demo — Tier-2 Telecom",
      expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1e3
    };
  }
  if (trimmed.startsWith("PRO-") || trimmed === "FNMS-PRO-2026-DEMO") {
    return {
      valid: true,
      plan: Plan.PROFESSIONAL,
      orgName: "RegionalNet ISP",
      expiryDate: Date.now() + 90 * 24 * 60 * 60 * 1e3
    };
  }
  if (trimmed.startsWith("BASIC-") || trimmed === "FNMS-BASIC-2026-DEMO") {
    return {
      valid: true,
      plan: Plan.BASIC,
      orgName: "StarterISP LLC",
      expiryDate: Date.now() + 180 * 24 * 60 * 60 * 1e3
    };
  }
  return {
    valid: false,
    reason: "License key not recognized or has been revoked."
  };
}
function LicenseExpiryBanner() {
  const { isLicenseValid, daysUntilExpiry, isExpired } = useSubscription();
  if (!isLicenseValid || isExpired) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-2.5 bg-destructive/10 border border-destructive/30 rounded-lg text-sm",
        role: "alert",
        "data-ocid": "license-expiry-banner-expired",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleX,
            {
              className: "size-4 shrink-0 text-destructive",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: "Your FiberNMS license has expired or is invalid. Some features may be restricted." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "ml-auto shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10",
              onClick: () => {
                window.location.href = "/settings/license";
              },
              children: "Activate License"
            }
          )
        ]
      }
    );
  }
  if (daysUntilExpiry <= 30) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm",
        role: "alert",
        "data-ocid": "license-expiry-banner-warning",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "size-4 shrink-0 text-amber-500",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-600 dark:text-amber-400 font-medium", children: [
            "Your license expires in",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              daysUntilExpiry,
              " day",
              daysUntilExpiry !== 1 ? "s" : ""
            ] }),
            ". Renew now to avoid service interruption."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "ml-auto shrink-0 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3 mr-1.5", "aria-hidden": "true" }),
                "Renew License"
              ]
            }
          )
        ]
      }
    );
  }
  return null;
}
function LicenseStatusCard() {
  const {
    isLicenseValid,
    licenseKey,
    currentPlan,
    organizationName,
    expiryDate,
    daysUntilExpiry,
    isExpired
  } = useSubscription();
  const totalDays = 365;
  const progressPct = Math.min(
    100,
    Math.max(0, daysUntilExpiry / totalDays * 100)
  );
  const progressColor = daysUntilExpiry <= 7 ? "bg-destructive" : daysUntilExpiry <= 30 ? "bg-amber-500" : "bg-emerald-500";
  if (!isLicenseValid || isExpired) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-4 p-5 rounded-xl border border-destructive/30 bg-destructive/5",
        "data-ocid": "license-status-invalid",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-destructive/15 border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-5 text-destructive", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive text-sm", children: "License Expired or Invalid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Enter a valid license key below to restore full access to FiberNMS features." })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-5 p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5",
      "data-ocid": "license-status-valid",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ShieldCheck,
            {
              className: "size-5 text-emerald-600 dark:text-emerald-400",
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-emerald-700 dark:text-emerald-300 text-sm", children: "License Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: organizationName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: currentPlan, size: "md" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-6 gap-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "License ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground truncate", children: licenseKey })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Plan Tier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-xs", children: PLAN_CONFIGS[currentPlan].label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Expiry Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-xs", children: new Date(expiryDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Max Devices" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-xs", children: PLAN_CONFIGS[currentPlan].maxDevices === -1 ? "Unlimited" : PLAN_CONFIGS[currentPlan].maxDevices.toLocaleString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Days remaining" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  daysUntilExpiry <= 30 ? "text-amber-500 font-semibold" : ""
                ),
                children: [
                  daysUntilExpiry,
                  "d"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-1.5 rounded-full bg-muted overflow-hidden",
              role: "progressbar",
              tabIndex: -1,
              "aria-valuenow": daysUntilExpiry,
              "aria-valuemin": 0,
              "aria-valuemax": totalDays,
              "aria-label": `${daysUntilExpiry} days remaining`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "h-full rounded-full transition-all duration-500",
                    progressColor
                  ),
                  style: { width: `${progressPct}%` }
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function LicenseKeyForm() {
  const { validateLicense } = useSubscription();
  const [keyInput, setKeyInput] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const handleValidate = reactExports.useCallback(async () => {
    if (!keyInput.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    await new Promise((r) => setTimeout(r, 500));
    const result = mockValidate(keyInput);
    if (result.valid) {
      validateLicense(keyInput.trim());
      setStatus("success");
      setKeyInput("");
    } else {
      setStatus("error");
      setErrorMsg(result.reason);
    }
  }, [keyInput, validateLicense]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "license-key-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        value: keyInput,
        onChange: (e) => {
          setKeyInput(e.target.value);
          if (status !== "idle") setStatus("idle");
        },
        placeholder: "Enter your license key, e.g.\nENT-FIBERNMS-2026-XXXXXXXXXX-XXXX",
        rows: 3,
        className: "font-mono text-xs resize-none bg-background border-input placeholder:text-muted-foreground/50 focus-visible:ring-primary",
        "aria-label": "License key input",
        "data-ocid": "license-key-input"
      }
    ),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3.5 shrink-0", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
    ] }),
    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3.5 shrink-0", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "License activated successfully." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleValidate,
        disabled: !keyInput.trim() || status === "loading",
        className: "w-full",
        "data-ocid": "license-validate-btn",
        children: status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin", "aria-hidden": "true" }),
          "Validating…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-4 mr-2", "aria-hidden": "true" }),
          "Validate & Activate License"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "Try demo keys:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "text-primary underline underline-offset-2 hover:no-underline",
          onClick: () => setKeyInput("ENT-FIBERNMS-2026-DEMO"),
          children: "ENT-…"
        }
      ),
      ",",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "text-primary underline underline-offset-2 hover:no-underline",
          onClick: () => setKeyInput("ULTRA-FIBERNMS-2026-GLOBAL"),
          children: "ULTRA-…"
        }
      ),
      ",",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "text-primary underline underline-offset-2 hover:no-underline",
          onClick: () => setKeyInput("PRO-FIBERNMS-2026-REGIONAL"),
          children: "PRO-…"
        }
      )
    ] })
  ] });
}
function LicenseFeaturesTable() {
  const { currentPlan } = useSubscription();
  const enabledFeatures = new Set(PLAN_CONFIGS[currentPlan].features);
  const allFeatures = Object.values(FeatureFlag);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "overflow-x-auto rounded-lg border border-border",
      "data-ocid": "license-features-table",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-xs text-muted-foreground tracking-wide uppercase", children: "Feature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-3 font-semibold text-xs text-muted-foreground tracking-wide uppercase", children: "Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-xs text-muted-foreground tracking-wide uppercase hidden sm:table-cell", children: "Min. Plan" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: allFeatures.map((flag) => {
          const enabled = enabledFeatures.has(flag);
          const minPlan = FEATURE_PLAN_MAP[flag][0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: cn(
                "transition-colors",
                enabled ? "hover:bg-emerald-500/3" : "opacity-60 hover:bg-muted/30"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      className: "size-3.5 text-emerald-500 shrink-0",
                      "aria-hidden": "true"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      className: "size-3.5 text-muted-foreground/60 shrink-0",
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-xs",
                        enabled ? "text-foreground" : "text-muted-foreground"
                      ),
                      children: FEATURE_LABELS[flag]
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center", children: enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3", "aria-hidden": "true" }),
                  "Enabled"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3", "aria-hidden": "true" }),
                  "Locked"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: minPlan, size: "sm", showIcon: false }) })
              ]
            },
            flag
          );
        }) })
      ] })
    }
  );
}
const STATUS_STYLES = {
  Active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  Expired: "bg-muted text-muted-foreground border-border",
  Revoked: "bg-destructive/10 text-destructive border-destructive/25"
};
function LicenseHistory() {
  const { isLicenseValid, licenseKey, currentPlan, expiryDate } = useSubscription();
  const currentEntry = {
    id: licenseKey || "—",
    activatedAt: "Today",
    plan: currentPlan,
    expiryDate: new Date(expiryDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }),
    status: isLicenseValid ? "Active" : "Expired"
  };
  const rows = [currentEntry, ...MOCK_HISTORY];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-lg border border-border overflow-hidden",
      "data-ocid": "license-history-list",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide", children: "License ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell", children: "Activated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide", children: "Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell", children: "Expires" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: rows.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-foreground truncate max-w-[140px]", children: entry.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: entry.activatedAt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: entry.plan, size: "sm", showIcon: false }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: entry.expiryDate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide",
                STATUS_STYLES[entry.status]
              ),
              children: entry.status
            }
          ) })
        ] }, entry.id)) })
      ] })
    }
  );
}
const MACHINE_ID = "FNMS-MACH-A3F7-9B2C-XK7Q";
function OfflineActivationPanel() {
  const [open, setOpen] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(MACHINE_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card",
      "data-ocid": "offline-activation-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-5 py-4 text-left group",
            onClick: () => setOpen((o) => !o),
            "aria-expanded": open,
            "aria-controls": "offline-panel-content",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-muted border border-border group-hover:bg-muted/80 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WifiOff,
                  {
                    className: "size-4 text-muted-foreground",
                    "aria-hidden": "true"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Offline / Air-Gap Activation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Activate FiberNMS on isolated networks without internet access" })
                ] })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronUp,
                {
                  className: "size-4 text-muted-foreground shrink-0",
                  "aria-hidden": "true"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: "size-4 text-muted-foreground shrink-0",
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: "offline-panel-content",
            className: "px-5 pb-5 space-y-4 border-t border-border pt-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "For air-gapped or on-premise deployments, follow these steps to activate without an internet connection:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-4", children: [
                {
                  step: 1,
                  title: "Copy your Machine ID",
                  desc: "This uniquely identifies your FiberNMS installation.",
                  action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 font-mono text-xs px-3 py-2 rounded-lg bg-muted border border-border text-foreground", children: MACHINE_ID }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: handleCopy,
                        "data-ocid": "copy-machine-id-btn",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ClipboardCopy,
                            {
                              className: "size-3.5 mr-1.5",
                              "aria-hidden": "true"
                            }
                          ),
                          copied ? "Copied!" : "Copy"
                        ]
                      }
                    )
                  ] })
                },
                {
                  step: 2,
                  title: "Generate an Offline Key",
                  desc: "Visit the FiberNMS License Portal on a connected machine, provide your Machine ID and order reference to generate an offline activation key.",
                  action: null
                },
                {
                  step: 3,
                  title: "Paste the Response Key",
                  desc: "Enter the generated offline activation key in the License Key field above and click Validate & Activate.",
                  action: null
                }
              ].map(({ step, title, desc, action }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: step }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc }),
                  action
                ] })
              ] }, step)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 px-3 py-3 rounded-lg bg-muted/50 border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LaptopMinimal,
                  {
                    className: "size-4 text-muted-foreground shrink-0 mt-0.5",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Offline licenses are bound to your machine fingerprint and cannot be transferred. Contact",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://caffeine.ai?utm_source=fibernms-license",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-primary underline underline-offset-2 hover:no-underline",
                      children: "FiberNMS Support"
                    }
                  ),
                  " ",
                  "for hardware migration assistance."
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function License() {
  const { daysUntilExpiry, isExpired } = useSubscription();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8",
      "data-ocid": "license-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-5 text-primary", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground tracking-tight", children: "License Management" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground ml-[52px]", children: "Activate and manage your FiberNMS enterprise license" })
        ] }),
        (isExpired || !isExpired && daysUntilExpiry <= 30) && /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseExpiryBanner, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-primary", "aria-hidden": "true" }),
            "Current License Status"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseStatusCard, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-4 text-primary", "aria-hidden": "true" }),
              "Activate License Key"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Paste your license key below. Supports single-line and multi-line enterprise keys." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseKeyForm, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-primary", "aria-hidden": "true" }),
              "Features Included in Your License"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Features enabled by your current license tier. Upgrade to unlock more capabilities." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseFeaturesTable, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-4 text-primary", "aria-hidden": "true" }),
            "License History"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseHistory, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OfflineActivationPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center pb-4", children: [
          "Need help with licensing?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://caffeine.ai?utm_source=fibernms-license&utm_medium=referral&utm_content=license-page",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary underline underline-offset-2 hover:no-underline",
              children: "Contact FiberNMS Support"
            }
          )
        ] })
      ]
    }
  );
}
export {
  LicenseExpiryBanner,
  License as default
};
