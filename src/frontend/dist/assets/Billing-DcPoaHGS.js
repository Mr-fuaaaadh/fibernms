import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, T as TriangleAlert, ar as useSubscriptionStore, r as reactExports, as as CreditCard, _ as Clock, aq as Plan, at as Building2, a3 as Badge, au as PLAN_CONFIGS, ab as Shield, a8 as Zap, av as PLAN_ORDER, a7 as TrendingUp, aj as FileText, X } from "./index-RpWpgnOS.js";
import { P as PlanBadge } from "./PlanBadge-DfDqzUR0.js";
import { B as Button } from "./button-DXjJimMA.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-D9MRRrE7.js";
import { S as Separator } from "./separator-BM_bV0pW.js";
import { M as MOCK_BILLING_RECORDS } from "./billingMockData-VI5lL7hx.js";
import { u as useSubscription, a as useDeviceQuota } from "./useFeature-ILdIXM1e.js";
import { C as Calendar } from "./calendar-D74Wj0YS.js";
import { C as CircleCheck } from "./circle-check-EFKi-VnU.js";
import { L as LockKeyhole } from "./lock-keyhole-Bil8Ee8P.js";
import { D as Download } from "./download-CImP21r-.js";
import { R as RefreshCw } from "./refresh-cw-BoM_IDqh.js";
import "./check-PKAZlQGn.js";
import "./index-CU4_MUTn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m16 12-4-4-4 4", key: "177agl" }],
  ["path", { d: "M12 16V8", key: "1sbj14" }]
];
const CircleArrowUp = createLucideIcon("circle-arrow-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }]
];
const CircleMinus = createLucideIcon("circle-minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode);
function formatNumber(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
}
function getProgressColor(pct) {
  if (pct >= 90) return "bg-rose-500 dark:bg-rose-500";
  if (pct >= 70) return "bg-amber-500 dark:bg-amber-400";
  return "bg-emerald-500 dark:bg-emerald-400";
}
function getTrackColor(pct) {
  if (pct >= 90) return "bg-rose-500/15";
  if (pct >= 70) return "bg-amber-500/15";
  return "bg-emerald-500/15";
}
function getLabelColor(pct) {
  if (pct >= 90) return "text-rose-600 dark:text-rose-400";
  if (pct >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}
function UsageProgressBar({
  used,
  limit,
  label,
  showWarning = true,
  compact = false,
  className
}) {
  const isUnlimited = limit <= 0;
  const pct = isUnlimited ? 0 : Math.min(100, used / limit * 100);
  const showWarn = showWarning && !isUnlimited && pct > 85;
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn("flex items-center gap-2", className),
        "data-ocid": "usage-bar-compact",
        role: "meter",
        "aria-label": `${label}: ${formatNumber(used)} of ${isUnlimited ? "unlimited" : formatNumber(limit)}`,
        "aria-valuenow": pct,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "h-1.5 flex-1 rounded-full overflow-hidden",
                getTrackColor(pct)
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "h-full rounded-full transition-all duration-500",
                    getProgressColor(pct)
                  ),
                  style: { width: isUnlimited ? "10%" : `${pct}%` }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-xs font-medium tabular-nums shrink-0",
                getLabelColor(pct)
              ),
              children: isUnlimited ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "∞" }) : `${formatNumber(used)} / ${formatNumber(limit)}`
            }
          ),
          showWarn && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "size-3 shrink-0 text-rose-500",
              "aria-label": "Near quota limit"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-2", className), "data-ocid": "usage-bar-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        showWarn && /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriangleAlert,
          {
            className: "size-3 text-rose-500",
            "aria-label": "Near quota limit"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-xs font-semibold tabular-nums",
              getLabelColor(pct)
            ),
            role: "meter",
            "aria-label": `${label}: ${formatNumber(used)} of ${isUnlimited ? "unlimited" : formatNumber(limit)}`,
            "aria-valuenow": pct,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            children: isUnlimited ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatNumber(used) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " / ∞" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              formatNumber(used),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                " ",
                "/ ",
                formatNumber(limit),
                " ",
                label
              ] })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-2 w-full overflow-hidden rounded-full",
          getTrackColor(pct)
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-full rounded-full transition-all duration-700",
              getProgressColor(pct)
            ),
            style: { width: isUnlimited ? "4%" : `${pct}%` }
          }
        )
      }
    ),
    showWarn && pct >= 90 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-rose-600 dark:text-rose-400", children: "Quota almost full — upgrade to increase your limit." })
  ] });
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return formatDate(ts);
}
const DATA_RETENTION = {
  [Plan.BASIC]: 7,
  [Plan.PROFESSIONAL]: 30,
  [Plan.ENTERPRISE]: 90,
  [Plan.ULTRA]: 365
};
const WORKFLOW_COUNTS = {
  [Plan.BASIC]: 0,
  [Plan.PROFESSIONAL]: 0,
  [Plan.ENTERPRISE]: 12,
  [Plan.ULTRA]: 47
};
const ALERT_LOG_COUNTS = {
  [Plan.BASIC]: 500,
  [Plan.PROFESSIONAL]: 5e3,
  [Plan.ENTERPRISE]: 5e4,
  [Plan.ULTRA]: 1e6
};
function Toast({
  toast,
  onDismiss
}) {
  reactExports.useEffect(() => {
    const t = setTimeout(onDismiss, 5e3);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg text-sm backdrop-blur",
        "animate-in slide-in-from-bottom-4 fade-in duration-300",
        toast.type === "success" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
        toast.type === "error" && "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300",
        toast.type === "info" && "bg-primary/10 border-primary/30 text-primary"
      ),
      children: [
        toast.type === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 shrink-0" }),
        toast.type === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 shrink-0" }),
        toast.type === "info" && /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: toast.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            className: "shrink-0 opacity-60 hover:opacity-100 transition-opacity",
            "aria-label": "Dismiss",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function ChangePlanModal({
  fromPlan,
  toPlan,
  onConfirm,
  onCancel
}) {
  const fromConfig = PLAN_CONFIGS[fromPlan];
  const toConfig = PLAN_CONFIGS[toPlan];
  const fromFeatures = new Set(fromConfig.features);
  const toFeatures = new Set(toConfig.features);
  const gained = toConfig.features.filter((f) => !fromFeatures.has(f));
  const lost = fromConfig.features.filter((f) => !toFeatures.has(f));
  const isUpgrade = PLAN_ORDER.indexOf(toPlan) > PLAN_ORDER.indexOf(fromPlan);
  const diff = toConfig.monthlyPrice - fromConfig.monthlyPrice;
  const prorated = Math.round(diff / 30 * 15);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0",
      "aria-labelledby": "modal-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Escape" && onCancel(),
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-5 pb-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "modal-title",
                className: "text-base font-semibold text-foreground",
                children: "Confirm Plan Change"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onCancel,
                className: "rounded-lg p-1 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl bg-muted/40 border border-border p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Current" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: fromPlan, size: "lg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground mt-1", children: [
                  formatCurrency(fromConfig.monthlyPrice),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "/mo" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleArrowUp,
                {
                  className: cn(
                    "size-6 shrink-0",
                    isUpgrade ? "text-primary" : "text-muted-foreground rotate-180"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "New" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: toPlan, size: "lg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground mt-1", children: [
                  formatCurrency(toConfig.monthlyPrice),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "/mo" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Billing Impact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Monthly cost change" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "font-semibold tabular-nums",
                      diff > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                    ),
                    children: [
                      diff > 0 ? "+" : "",
                      formatCurrency(diff),
                      " / mo"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Prorated charge today (~15 days)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums text-foreground", children: prorated > 0 ? formatCurrency(prorated) : "Credit applied" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground pt-1 border-t border-border", children: "Proration calculated on remaining billing cycle. Final charge may vary." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
              gained.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-3" }),
                  " Features Gained"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: gained.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "text-xs text-foreground flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3 text-emerald-500 shrink-0" }),
                      f.replace(/_/g, " ").toLowerCase()
                    ]
                  },
                  f
                )) })
              ] }),
              lost.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleMinus, { className: "size-3" }),
                  " Features Lost"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: lost.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "text-xs text-foreground flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3 text-rose-500 shrink-0" }),
                      f.replace(/_/g, " ").toLowerCase()
                    ]
                  },
                  f
                )) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 px-6 pb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: onCancel,
                "data-ocid": "modal-cancel-btn",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "default",
                size: "sm",
                onClick: onConfirm,
                "data-ocid": "modal-confirm-btn",
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }),
                  "Confirm ",
                  isUpgrade ? "Upgrade" : "Downgrade"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PaymentMethodModal({ onClose }) {
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0",
      "aria-labelledby": "payment-modal-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 pt-5 pb-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h2",
              {
                id: "payment-modal-title",
                className: "text-base font-semibold text-foreground flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4 text-primary" }),
                  "Update Payment Method"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "rounded-lg p-1 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
              }
            )
          ] }),
          saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Payment method updated" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your card ending in 4242 has been saved." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: onClose,
                className: "mt-2",
                children: "Close"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              className: "px-6 py-5 space-y-4",
              onSubmit: (e) => {
                e.preventDefault();
                setSaved(true);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "pm-card-number",
                      className: "text-xs font-medium text-muted-foreground",
                      children: "Card number"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "pm-card-number",
                      type: "text",
                      defaultValue: "4242 4242 4242 4242",
                      className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": "payment-card-number"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "pm-card-expiry",
                        className: "text-xs font-medium text-muted-foreground",
                        children: "Expiry"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "pm-card-expiry",
                        type: "text",
                        defaultValue: "12 / 28",
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                        "data-ocid": "payment-card-expiry"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "pm-card-cvc",
                        className: "text-xs font-medium text-muted-foreground",
                        children: "CVC"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "pm-card-cvc",
                        type: "text",
                        defaultValue: "•••",
                        className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                        "data-ocid": "payment-card-cvc"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "pm-card-name",
                      className: "text-xs font-medium text-muted-foreground",
                      children: "Cardholder name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "pm-card-name",
                      type: "text",
                      defaultValue: "FiberNMS Admin",
                      className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": "payment-card-name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-muted/40 border border-border px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3.5 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Secured by 256-bit TLS encryption. Card data handled by Stripe." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: onClose, children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      size: "sm",
                      className: "gap-2",
                      "data-ocid": "payment-save-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-3.5" }),
                        " Save Card"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function StatCard({
  icon: Icon,
  label,
  value,
  sublabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "glass-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display leading-tight", children: value }),
      sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: sublabel })
    ] })
  ] }) });
}
function Billing() {
  const sub = useSubscription();
  const quota = useDeviceQuota();
  const setCurrentPlan = useSubscriptionStore((s) => s.setCurrentPlan);
  const currentConfig = PLAN_CONFIGS[sub.currentPlan];
  const urlUpgradeTo = new URLSearchParams(window.location.search).get(
    "upgrade_to"
  );
  const validUpgradePlan = urlUpgradeTo && PLAN_ORDER.includes(urlUpgradeTo) ? urlUpgradeTo : null;
  const [selectedPlan, setSelectedPlan] = reactExports.useState(
    validUpgradePlan ?? sub.currentPlan
  );
  const [showChangePlanModal, setShowChangePlanModal] = reactExports.useState(false);
  const [showPaymentModal, setShowPaymentModal] = reactExports.useState(false);
  const [toasts, setToasts] = reactExports.useState([]);
  const toastIdRef = reactExports.useRef(0);
  const initUpgradePlanRef = reactExports.useRef(validUpgradePlan);
  const initCurrentPlanRef = reactExports.useRef(sub.currentPlan);
  reactExports.useEffect(() => {
    const initPlan = initUpgradePlanRef.current;
    const initCurrent = initCurrentPlanRef.current;
    if (initPlan && initPlan !== initCurrent) {
      setShowChangePlanModal(true);
    }
  }, []);
  const addToast = (message, type = "success") => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const apiPct = sub.apiQuota > 0 ? Math.min(100, sub.apiUsed / sub.apiQuota * 100) : 0;
  const isCurrentPlanSelected = selectedPlan === sub.currentPlan;
  const isUpgrade = PLAN_ORDER.indexOf(selectedPlan) > PLAN_ORDER.indexOf(sub.currentPlan);
  const handleConfirmPlanChange = () => {
    const prevPlan = sub.currentPlan;
    setCurrentPlan(selectedPlan);
    setShowChangePlanModal(false);
    const action = PLAN_ORDER.indexOf(selectedPlan) > PLAN_ORDER.indexOf(prevPlan) ? "upgraded" : "downgraded";
    addToast(
      `Plan ${action} to ${PLAN_CONFIGS[selectedPlan].label} successfully.`,
      "success"
    );
    if (window.history.replaceState) {
      window.history.replaceState({}, "", "/billing");
    }
  };
  const lastBillingRecord = MOCK_BILLING_RECORDS.find(
    (r) => r.status === "paid"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-80",
        "aria-live": "polite",
        "aria-atomic": "false",
        children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { toast: t, onDismiss: () => dismissToast(t.id) }, t.id))
      }
    ),
    showChangePlanModal && !isCurrentPlanSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangePlanModal,
      {
        fromPlan: sub.currentPlan,
        toPlan: selectedPlan,
        onConfirm: handleConfirmPlanChange,
        onCancel: () => setShowChangePlanModal(false)
      }
    ),
    showPaymentModal && /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentMethodModal, { onClose: () => setShowPaymentModal(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Billing & Subscription" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: sub.currentPlan, size: "lg" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "Manage your plan, usage, and billing history for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: sub.organizationName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "shrink-0 gap-2 self-start",
            onClick: () => setShowPaymentModal(true),
            "data-ocid": "billing-update-payment",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-3.5" }),
              "Update Payment Method"
            ]
          }
        )
      ] }),
      sub.trialDaysLeft > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/8 px-5 py-4",
          "data-ocid": "billing-trial-banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-5 text-amber-600 dark:text-amber-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                  "Free trial — ",
                  sub.trialDaysLeft,
                  " day",
                  sub.trialDaysLeft !== 1 ? "s" : "",
                  " remaining"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Your trial ends on ",
                  formatDate(sub.expiryDate),
                  ". Convert to a paid plan to retain all your data and configurations."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "shrink-0 gap-2",
                onClick: () => {
                  setSelectedPlan(Plan.PROFESSIONAL);
                  setShowChangePlanModal(true);
                },
                "data-ocid": "billing-convert-trial",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "size-3.5" }),
                  "Convert to Paid"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "glass-card border-border lg:col-span-2",
            "data-ocid": "billing-current-plan",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-4 text-primary" }),
                  "Current Subscription"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: sub.isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
                    children: "Expired"
                  }
                ) : sub.trialDaysLeft > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
                    children: "Trial"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    children: "Active"
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-foreground font-display", children: formatCurrency(currentConfig.monthlyPrice) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm mb-1", children: "/month" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: currentConfig.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-5 gap-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      sub.isExpired ? "Expired" : "Renews",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "font-medium",
                            sub.isExpiringSoon ? "text-amber-600 dark:text-amber-400" : sub.isExpired ? "text-rose-600 dark:text-rose-400" : "text-foreground"
                          ),
                          children: formatDate(sub.expiryDate)
                        }
                      )
                    ] })
                  ] }),
                  sub.isExpiringSoon && !sub.isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-3 shrink-0" }),
                    "Expires in ",
                    sub.daysUntilExpiry,
                    " days"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UsageProgressBar,
                    {
                      used: quota.used,
                      limit: quota.limit,
                      label: "Devices",
                      "data-ocid": "billing-device-quota"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UsageProgressBar,
                    {
                      used: sub.apiUsed,
                      limit: sub.apiQuota,
                      label: "API Calls / Month",
                      "data-ocid": "billing-api-quota"
                    }
                  ),
                  apiPct > 85 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-3 shrink-0" }),
                    "API quota nearing limit — consider upgrading your plan"
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "glass-card border-border",
            "data-ocid": "billing-license-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4 text-primary" }),
                "License"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "License Key" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-foreground truncate", children: sub.licenseKey })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                  sub.isLicenseValid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 text-rose-500 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: sub.isLicenseValid ? "License valid" : "License invalid" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tenant ID" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-mono", children: [
                      sub.tenantId.slice(0, 16),
                      "…"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Max Devices" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: currentConfig.maxDevices === -1 ? "Unlimited" : currentConfig.maxDevices.toLocaleString() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Max API Rate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold", children: [
                      sub.apiQuota.toLocaleString(),
                      " / mo"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SLA Tier" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: sub.currentPlan === Plan.ULTRA ? "99.999%" : sub.currentPlan === Plan.ENTERPRISE ? "99.99%" : sub.currentPlan === Plan.PROFESSIONAL ? "99.9%" : "99.5%" })
                  ] })
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
          "data-ocid": "billing-usage-stats",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Zap,
                label: "Workflows Deployed",
                value: WORKFLOW_COUNTS[sub.currentPlan].toLocaleString(),
                sublabel: "Active automations"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: TriangleAlert,
                label: "Alert Logs Retained",
                value: ALERT_LOG_COUNTS[sub.currentPlan].toLocaleString(),
                sublabel: "Events on record"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Clock,
                label: "Data Retention Period",
                value: `${DATA_RETENTION[sub.currentPlan]} days`,
                sublabel: "Historical data window"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Calendar,
                label: "Last Billing Date",
                value: lastBillingRecord ? formatDate(lastBillingRecord.date) : "—",
                sublabel: lastBillingRecord ? formatCurrency(lastBillingRecord.amount) : void 0
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "billing-plan-selector", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-foreground mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "size-5 text-primary" }),
          "Change Plan"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Select a target plan and review the cost impact before confirming." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", children: PLAN_ORDER.map((plan) => {
          const config = PLAN_CONFIGS[plan];
          const isCurrent = plan === sub.currentPlan;
          const isSelected = plan === selectedPlan;
          const isUpgradePlan = PLAN_ORDER.indexOf(plan) > PLAN_ORDER.indexOf(sub.currentPlan);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedPlan(plan),
              "aria-pressed": isSelected,
              "data-ocid": `billing-plan-option-${plan.toLowerCase()}`,
              className: cn(
                "glass-card relative flex flex-col rounded-xl border text-left transition-all duration-200",
                "hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isSelected ? "border-primary/60 shadow-noc-elevated ring-1 ring-primary/30" : isCurrent ? "border-primary/30" : "border-border"
              ),
              children: [
                config.badge && !isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-primary text-primary-foreground border-0 shadow-md px-2 py-0.5", children: config.badge }) }),
                isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] border-border bg-card",
                    children: "Current"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex-1 space-y-3 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan, size: "sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-foreground font-display", children: formatCurrency(config.monthlyPrice) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mb-0.5", children: "/mo" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: config.maxDevices === -1 ? "Unlimited devices" : `Up to ${config.maxDevices.toLocaleString()} devices` })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5", children: [
                    config.features.slice(0, 4).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-center gap-1.5 text-[10px] text-muted-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-2.5 text-emerald-500 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize truncate", children: f.replace(/_/g, " ").toLowerCase() })
                        ]
                      },
                      f
                    )),
                    config.features.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-[10px] text-muted-foreground/60 pl-4", children: [
                      "+",
                      config.features.length - 4,
                      " more features"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-full rounded-lg py-1.5 text-xs font-medium text-center flex items-center justify-center gap-1.5",
                      isCurrent ? "bg-muted text-muted-foreground" : "bg-primary/15 text-primary border border-primary/30"
                    ),
                    children: isCurrent ? "Current Plan" : isUpgradePlan ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "size-3" }),
                      " Selected for Upgrade"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "size-3" }),
                      " Selected for Downgrade"
                    ] })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-lg py-1.5 text-xs font-medium text-center text-muted-foreground border border-transparent hover:border-border transition-colors", children: isCurrent ? "Current Plan" : "Select" }) })
              ]
            },
            plan
          );
        }) }),
        !isCurrentPlanSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/30 p-5 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
              "Switching from",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PlanBadge,
                {
                  plan: sub.currentPlan,
                  size: "sm",
                  className: "mx-1"
                }
              ),
              "to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: selectedPlan, size: "sm", className: "mx-1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Current:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold tabular-nums", children: [
                  formatCurrency(currentConfig.monthlyPrice),
                  "/mo"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "New:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "font-semibold tabular-nums",
                      isUpgrade ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                    ),
                    children: [
                      formatCurrency(
                        PLAN_CONFIGS[selectedPlan].monthlyPrice
                      ),
                      "/mo"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Prorated charge for remaining billing cycle will apply. See exact amount in confirmation." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: isUpgrade ? "default" : "outline",
              className: "shrink-0 gap-2",
              onClick: () => setShowChangePlanModal(true),
              "data-ocid": "billing-change-plan-btn",
              children: isUpgrade ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "size-3.5" }),
                " Upgrade Plan"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-3.5 rotate-180" }),
                " Downgrade Plan"
              ] })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5 text-primary" }),
          "Billing History"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "glass-card border-border",
            "data-ocid": "billing-history-table",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-medium", children: "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center font-medium", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center font-medium", children: "Invoice" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_BILLING_RECORDS.map((record, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: cn(
                    "border-b border-border/60 hover:bg-muted/20 transition-colors",
                    i % 2 !== 0 ? "bg-muted/10" : ""
                  ),
                  "data-ocid": `billing-record-${record.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(record.date) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground max-w-[220px] truncate", children: record.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold text-foreground tabular-nums whitespace-nowrap", children: formatCurrency(record.amount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: cn(
                          "text-xs border capitalize",
                          record.status === "paid" && "text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
                          record.status === "pending" && "text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400",
                          record.status === "failed" && "text-rose-600 border-rose-500/30 bg-rose-500/10 dark:text-rose-400"
                        ),
                        children: record.status
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: record.status === "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "inline-flex items-center gap-1 text-xs text-primary hover:underline transition-smooth",
                        onClick: () => addToast(
                          `Invoice ${record.id}.pdf downloaded.`,
                          "info"
                        ),
                        "data-ocid": `billing-invoice-download-${record.id}`,
                        "aria-label": `Download invoice for ${record.description}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3" }),
                          "PDF"
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: "—" }) })
                  ]
                },
                record.id
              )) })
            ] }) }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-5 text-primary" }),
          "Payment Method"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "glass-card border-border",
            "data-ocid": "billing-payment-method",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col sm:flex-row sm:items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-16 items-center justify-center rounded-lg border border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground", children: "VISA" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Visa ending in 4242" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Expires 12/2028 · Added",
                    " ",
                    timeAgo(Date.now() - 60 * 864e5)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ml-auto sm:ml-0",
                    children: "Default"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "shrink-0 gap-2",
                  onClick: () => setShowPaymentModal(true),
                  "data-ocid": "billing-open-payment-modal",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }),
                    "Update Card"
                  ]
                }
              )
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  Billing as default
};
