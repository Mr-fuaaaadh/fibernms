import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a8 as Zap, a3 as Badge, au as PLAN_CONFIGS, b as cn, av as PLAN_ORDER, aq as Plan, ax as Star, C as ChevronDown, X } from "./index-RpWpgnOS.js";
import { B as Button } from "./button-DXjJimMA.js";
import { C as Card, c as CardContent } from "./card-D9MRRrE7.js";
import { S as Separator } from "./separator-BM_bV0pW.js";
import { u as useSubscription } from "./useFeature-ILdIXM1e.js";
import { C as Check } from "./check-PKAZlQGn.js";
import { C as ChevronUp } from "./chevron-up-B5gDgmjS.js";
import "./index-CU4_MUTn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
const PLAN_COLORS = {
  [Plan.BASIC]: {
    ring: "border-emerald-500/40",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bg: "from-emerald-500/5 to-transparent",
    text: "text-emerald-400",
    glow: "shadow-[0_0_24px_oklch(0.62_0.22_142/0.15)]"
  },
  [Plan.PROFESSIONAL]: {
    ring: "border-blue-500/40",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    bg: "from-blue-500/5 to-transparent",
    text: "text-blue-400",
    glow: "shadow-[0_0_24px_oklch(0.62_0.18_210/0.18)]"
  },
  [Plan.ENTERPRISE]: {
    ring: "border-violet-500/40",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    bg: "from-violet-500/5 to-transparent",
    text: "text-violet-400",
    glow: "shadow-[0_0_24px_oklch(0.65_0.22_290/0.2)]"
  },
  [Plan.ULTRA]: {
    ring: "border-rose-500/40",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    bg: "from-rose-500/8 via-violet-500/4 to-transparent",
    text: "text-rose-400",
    glow: "shadow-[0_0_32px_oklch(0.62_0.28_22/0.25)]"
  }
};
const FEATURE_MATRIX = [
  {
    category: "Capacity & Scale",
    rows: [
      {
        label: "Device Limit",
        values: ["1,000", "10,000", "100,000", "Unlimited"]
      },
      {
        label: "API Rate Limit",
        values: ["1K/day", "50K/day", "1M/mo", "Unlimited"]
      },
      {
        label: "Data Retention",
        values: ["None", "30 days", "1 year", "Unlimited"]
      }
    ]
  },
  {
    category: "Map Features",
    rows: [
      { label: "Map Dashboard", values: ["✅", "✅", "✅", "✅"] },
      { label: "GIS Draw Tools", values: ["❌", "✅", "✅", "✅"] },
      { label: "Device Clustering", values: ["✅", "✅", "✅", "✅"] },
      { label: "Satellite Overlay", values: ["❌", "⚠️", "✅", "✅"] },
      { label: "Weather Overlay", values: ["❌", "❌", "✅", "✅"] }
    ]
  },
  {
    category: "Monitoring",
    rows: [
      {
        label: "Real-time Monitoring",
        values: ["❌", "⚠️ Limited", "✅", "✅"]
      },
      {
        label: "Historical Metrics",
        values: ["❌", "7 days", "365 days", "Unlimited"]
      },
      { label: "Alert Correlation", values: ["❌", "❌", "✅", "✅"] },
      { label: "WebSocket Streams", values: ["❌", "❌", "✅", "✅"] }
    ]
  },
  {
    category: "Topology & Visualization",
    rows: [
      { label: "Topology Visualization", values: ["❌", "✅", "✅", "✅"] },
      { label: "Multi-layer L1/L2/L3", values: ["❌", "❌", "✅", "✅"] },
      { label: "Digital Twin Simulation", values: ["❌", "❌", "❌", "✅"] }
    ]
  },
  {
    category: "AI & Analytics",
    rows: [
      { label: "AI Anomaly Detection", values: ["❌", "❌", "⚠️ Basic", "✅"] },
      { label: "Predictive Intelligence", values: ["❌", "❌", "✅", "✅"] },
      { label: "AI Copilot Assistant", values: ["❌", "❌", "⚠️ Basic", "✅"] },
      {
        label: "Natural Language Automation",
        values: ["❌", "❌", "❌", "✅"]
      },
      { label: "Capacity Forecasting", values: ["❌", "❌", "✅", "✅"] }
    ]
  },
  {
    category: "Automation",
    rows: [
      {
        label: "Workflow Automation",
        values: ["❌", "❌", "⚠️ 5 workflows", "✅ Unlimited"]
      },
      { label: "Event Triggers", values: ["❌", "❌", "✅", "✅"] },
      { label: "Custom Workflow Builder", values: ["❌", "❌", "❌", "✅"] }
    ]
  },
  {
    category: "Compliance & Security",
    rows: [
      { label: "Audit Logs", values: ["❌", "❌", "✅", "✅"] },
      { label: "SLA Dashboard", values: ["❌", "❌", "✅", "✅"] },
      { label: "RBAC / Role-based Access", values: ["❌", "✅", "✅", "✅"] },
      {
        label: "ABAC / Attribute-based Access",
        values: ["❌", "❌", "❌", "✅"]
      },
      { label: "SSO (OAuth / SAML)", values: ["❌", "❌", "✅", "✅"] },
      { label: "Session Monitoring", values: ["❌", "❌", "✅", "✅"] }
    ]
  },
  {
    category: "Integrations & API",
    rows: [
      { label: "API Access", values: ["❌", "❌", "✅", "✅"] },
      { label: "Webhook Support", values: ["❌", "❌", "✅", "✅"] },
      { label: "OSS/BSS Integrations", values: ["❌", "❌", "❌", "✅"] },
      { label: "Custom Plugins", values: ["❌", "❌", "❌", "✅"] },
      { label: "Plugin Marketplace", values: ["❌", "❌", "❌", "✅"] }
    ]
  },
  {
    category: "Enterprise",
    rows: [
      { label: "Multi-region Support", values: ["❌", "❌", "✅", "✅"] },
      { label: "Multi-tenant Management", values: ["❌", "❌", "❌", "✅"] },
      { label: "White-labeling", values: ["❌", "❌", "❌", "✅"] },
      { label: "Custom Domain", values: ["❌", "❌", "❌", "✅"] },
      { label: "Dedicated NOC Mode", values: ["❌", "❌", "❌", "✅"] }
    ]
  },
  {
    category: "Support",
    rows: [
      {
        label: "Support Type",
        values: ["Community", "Email", "Priority", "Dedicated SRE"]
      },
      { label: "SLA Response Time", values: ["—", "48h", "8h", "1h"] },
      { label: "Onboarding Assistance", values: ["❌", "❌", "✅", "✅"] },
      { label: "Custom Training", values: ["❌", "❌", "❌", "✅"] }
    ]
  }
];
const KEY_ROWS = /* @__PURE__ */ new Set([
  "Device Limit",
  "Map Dashboard",
  "GIS Draw Tools",
  "Real-time Monitoring",
  "Historical Metrics",
  "Alert Correlation",
  "AI Anomaly Detection",
  "SLA Dashboard",
  "Topology Visualization",
  "Workflow Automation",
  "Predictive Intelligence",
  "Capacity Forecasting",
  "Audit Logs",
  "API Access",
  "OSS/BSS Integrations",
  "Multi-tenant Management",
  "White-labeling",
  "Custom Plugins",
  "Support Type"
]);
const FAQS = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes. Upgrades take effect immediately and are prorated for the remainder of your billing cycle. Downgrades take effect at the end of the current billing period so you keep access to all features until then."
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your historical data is preserved for 90 days after a downgrade. If you re-upgrade within that window, everything is restored instantly. After 90 days, historical metrics beyond the lower plan's retention limit are archived."
  },
  {
    q: "Is there a free trial available?",
    a: "New accounts receive a 14-day Enterprise trial with no credit card required. At the end of the trial you can choose any plan, or your account automatically moves to the Basic plan."
  },
  {
    q: "How does annual billing work?",
    a: "Annual billing locks in a 20% discount versus monthly pricing, billed as a single upfront payment. You can still upgrade mid-year and pay only the prorated difference for the remainder of the term."
  },
  {
    q: "Can I run FiberNMS on-premise instead of SaaS?",
    a: "On-premise and hybrid deployment options are available on the Ultra / Carrier plan. Contact our enterprise sales team for custom licensing and deployment support."
  }
];
function MatrixCell({ value }) {
  if (value === "✅")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 text-emerald-400" }) });
  if (value === "❌")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-muted-foreground/40" }) });
  if (value === "⚠️" || value.startsWith("⚠️"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-amber-400 font-medium text-center leading-tight", children: value.replace("⚠️ ", "") }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground text-center leading-tight", children: value }) });
}
function PlanCard({
  plan,
  annual,
  currentPlan
}) {
  const config = PLAN_CONFIGS[plan];
  const colors = PLAN_COLORS[plan];
  const isCurrent = plan === currentPlan;
  const currentIdx = PLAN_ORDER.indexOf(currentPlan);
  const planIdx = PLAN_ORDER.indexOf(plan);
  const isUpgrade = planIdx > currentIdx;
  const isDowngrade = planIdx < currentIdx;
  const isUltra = plan === Plan.ULTRA;
  const price = annual ? config.annualPrice : config.monthlyPrice;
  const PLAN_KEY_FEATURES = {
    [Plan.BASIC]: [
      "Map dashboard & basic routing",
      "Device clustering (1,000 limit)",
      "Community support",
      "Core alert notifications"
    ],
    [Plan.PROFESSIONAL]: [
      "Full GIS map tools & draw routes",
      "Historical metrics (7 days)",
      "Topology visualization",
      "Advanced alerting & email support"
    ],
    [Plan.ENTERPRISE]: [
      "Real-time WebSocket monitoring",
      "SLA dashboards & breach alerts",
      "AI anomaly detection (basic)",
      "Workflow automation (5 flows)",
      "Audit logs & compliance",
      "API access & SSO"
    ],
    [Plan.ULTRA]: [
      "Unlimited devices & scale",
      "Full AI predictive intelligence",
      "Digital twin simulation",
      "Multi-tenant + white-labeling",
      "Custom plugins & marketplace",
      "Dedicated SRE support (1h SLA)"
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "relative flex flex-col border glass-card overflow-hidden transition-smooth",
        isCurrent ? cn(colors.ring, colors.glow) : "border-border",
        isUltra && !isCurrent && "border-rose-500/30 shadow-[0_0_40px_oklch(0.62_0.28_22/0.12)]"
      ),
      "data-ocid": `plan-card-${plan.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "absolute inset-x-0 top-0 h-24 bg-gradient-to-b pointer-events-none",
              colors.bg
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 inset-x-0 flex justify-between px-4 pt-3 z-10", children: [
          config.badge && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: cn(
                "text-[10px] font-semibold border",
                plan === Plan.ENTERPRISE ? "bg-violet-500/20 text-violet-300 border-violet-500/40" : plan === Plan.PROFESSIONAL ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : "bg-rose-500/20 text-rose-300 border-rose-500/40"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-2.5 mr-1" }),
                config.badge
              ]
            }
          ),
          isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] bg-primary/20 text-primary border border-primary/40 ml-auto", children: "Current Plan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-5 flex-1 flex flex-col gap-5 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-sm font-bold uppercase tracking-wider font-mono",
                  colors.text
                ),
                children: config.label
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-bold text-foreground font-display", children: [
                "$",
                price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mb-1", children: "/mo" }),
              annual && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-emerald-400 mb-1 ml-1 font-medium", children: "billed annually" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Up to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: config.maxDevices === -1 ? "1M+ devices" : `${config.maxDevices.toLocaleString()} devices` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: config.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 flex-1", children: PLAN_KEY_FEATURES[plan].map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("size-3.5 shrink-0 mt-0.5", colors.text) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: feat })
          ] }, feat)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full text-xs border-border",
              disabled: true,
              "data-ocid": `plan-cta-current-${plan.toLowerCase()}`,
              children: "Current Plan"
            }
          ) : isUpgrade ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: cn(
                "w-full text-xs font-semibold",
                isUltra ? "bg-rose-500 hover:bg-rose-600 text-white border-0" : ""
              ),
              variant: "default",
              onClick: () => {
                window.location.href = `/billing?upgrade_to=${plan}`;
              },
              "data-ocid": `plan-cta-upgrade-${plan.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3 mr-1.5" }),
                "Upgrade to ",
                config.label
              ]
            }
          ) : isDowngrade ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-smooth py-2",
              onClick: () => {
                window.location.href = `/billing?upgrade_to=${plan}`;
              },
              "data-ocid": `plan-cta-downgrade-${plan.toLowerCase()}`,
              children: [
                "Downgrade to ",
                config.label
              ]
            }
          ) : null })
        ] }),
        isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-lg pointer-events-none border border-rose-500/20 bg-gradient-to-b from-rose-500/5 via-transparent to-violet-500/5" })
      ]
    }
  );
}
function FaqItem({ q, a }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-lg overflow-hidden glass-card",
      "data-ocid": "plan-faq-item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/20 transition-smooth",
            onClick: () => setOpen((v) => !v),
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: q }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4 text-muted-foreground shrink-0 ml-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 text-muted-foreground shrink-0 ml-2" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-3", children: a })
      ]
    }
  );
}
function Plans() {
  const { currentPlan } = useSubscription();
  const [annual, setAnnual] = reactExports.useState(false);
  const [showAllFeatures, setShowAllFeatures] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0 opacity-[0.03]",
          style: {
            backgroundImage: "linear-gradient(oklch(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-medium mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3" }),
          "Carrier-Grade Network Management"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-foreground font-display tracking-tight mb-4", children: "Choose Your Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-4", children: "Scale your network operations from startup ISP to global carrier. Transparent pricing, no hidden fees." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs text-muted-foreground mt-2 bg-muted/40 border border-border rounded-full px-4 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Currently on" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: cn(
                "text-[10px] border",
                PLAN_COLORS[currentPlan].badge
              ),
              children: PLAN_CONFIGS[currentPlan].label
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-12 space-y-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", "data-ocid": "plan-billing-toggle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setAnnual(false),
            className: cn(
              "px-5 py-2 rounded-md text-sm font-medium transition-smooth",
              !annual ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
            ),
            children: "Monthly"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setAnnual(true),
            className: cn(
              "px-5 py-2 rounded-md text-sm font-medium transition-smooth flex items-center gap-2",
              annual ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              "Annual",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2 py-0.5", children: "Save 20%" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Plan comparison cards", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5", children: PLAN_ORDER.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlanCard,
        {
          plan,
          annual,
          currentPlan
        },
        plan
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Feature comparison matrix", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground font-display", children: "Feature Matrix" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Detailed capability comparison across all plans" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "text-xs border-border",
              onClick: () => setShowAllFeatures((v) => !v),
              "data-ocid": "plan-matrix-toggle",
              children: showAllFeatures ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3 mr-1.5" }),
                " Show Key Features"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "size-3 mr-1.5" }),
                " Show All Features"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto noc-scrollbar rounded-lg border border-border glass-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[680px] text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3.5 text-left text-xs font-medium text-muted-foreground w-48 sm:w-56 sticky left-0 bg-card/95 backdrop-blur-sm z-10", children: "Feature" }),
            PLAN_ORDER.map((plan) => {
              const colors = PLAN_COLORS[plan];
              const isCurrent = plan === currentPlan;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "th",
                {
                  className: cn(
                    "px-4 py-3.5 text-center w-28",
                    isCurrent && "bg-primary/5"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "text-xs font-semibold uppercase tracking-wider font-mono",
                          colors.text
                        ),
                        children: PLAN_CONFIGS[plan].label
                      }
                    ),
                    isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-primary mt-0.5", children: "← Current" })
                  ]
                },
                plan
              );
            })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: FEATURE_MATRIX.map((section) => {
            const visibleRows = showAllFeatures ? section.rows : section.rows.filter((r) => KEY_ROWS.has(r.label));
            if (visibleRows.length === 0) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              MatrixSection,
              {
                section: { ...section, rows: visibleRows },
                currentPlan
              },
              section.category
            );
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Frequently asked questions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground font-display mb-2", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Everything you need to know about plans, billing, and upgrades." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-w-2xl", "data-ocid": "plan-faq-section", children: FAQS.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsx(FaqItem, { q: faq.q, a: faq.a }, faq.q)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center py-10 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground font-display mb-2", children: "Need a custom quote for your carrier network?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-md mx-auto", children: "Our enterprise sales team can tailor a contract for Tier-1 operators with multi-million device fleets, SLA guarantees, and white-glove onboarding." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "border-primary/40 text-primary hover:bg-primary/10",
            "data-ocid": "plan-contact-sales",
            children: "Contact Enterprise Sales"
          }
        )
      ] })
    ] })
  ] });
}
function MatrixSection({
  section,
  currentPlan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/20 border-y border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "td",
      {
        colSpan: 5,
        className: "px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest sticky left-0 bg-muted/20",
        children: section.category
      }
    ) }),
    section.rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: cn(
          "border-b border-border/40 hover:bg-muted/10 transition-colors",
          i % 2 === 0 ? "" : "bg-muted/5"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground sticky left-0 bg-card/95 backdrop-blur-sm", children: row.label }),
          row.values.map((val, colIdx) => {
            const plan = PLAN_ORDER[colIdx];
            const isCurrent = plan === currentPlan;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: cn(
                  "px-4 py-3 text-center",
                  isCurrent && "bg-primary/5"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixCell, { value: val })
              },
              plan
            );
          })
        ]
      },
      row.label
    ))
  ] });
}
export {
  Plans as default
};
