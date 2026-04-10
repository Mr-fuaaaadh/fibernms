import { j as jsxRuntimeExports, b as cn, ar as PLAN_CONFIGS, aE as FeatureFlag } from "./index-Bz87mU_A.js";
import { b as useFeature } from "./useFeature-DvuTyGvk.js";
import { B as Button } from "./button-B8BV977f.js";
import { P as PlanBadge } from "./PlanBadge-Dypcn2AC.js";
import { L as LockKeyhole } from "./lock-keyhole-CM752Mkt.js";
function LockedFeatureOverlay({
  featureName,
  requiredPlan,
  description,
  compact = false,
  className
}) {
  const handleUpgrade = () => {
    window.location.href = `/billing?upgrade_to=${requiredPlan}`;
  };
  const handleComparePlans = () => {
    window.location.href = "/plans";
  };
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "glass-card rounded-xl border border-border p-4 flex items-center gap-4",
          className
        ),
        "data-ocid": "locked-feature-compact",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LockKeyhole,
            {
              className: "size-4 text-muted-foreground",
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: featureName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Requires",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PlanBadge,
                {
                  plan: requiredPlan,
                  size: "sm",
                  showIcon: false,
                  className: "ml-1"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "default",
              onClick: handleUpgrade,
              "data-ocid": "locked-feature-upgrade-btn",
              className: "shrink-0",
              children: "Upgrade"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex min-h-[320px] items-center justify-center p-8",
        className
      ),
      "data-ocid": "locked-feature-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl border border-border p-8 text-center max-w-md w-full shadow-noc-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/70 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          LockKeyhole,
          {
            className: "size-8 text-muted-foreground",
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: featureName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Available on" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: requiredPlan, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "and above" })
        ] }),
        description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-sm text-muted-foreground leading-relaxed", children: description }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-6 text-sm text-muted-foreground leading-relaxed", children: [
          "Upgrade your subscription to access ",
          featureName,
          " and unlock enterprise-grade telecom capabilities."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "default",
              onClick: handleUpgrade,
              "data-ocid": "locked-overlay-upgrade-cta",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "size-4", "aria-hidden": "true" }),
                "Upgrade to",
                " ",
                requiredPlan.charAt(0) + requiredPlan.slice(1).toLowerCase()
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: handleComparePlans,
              "data-ocid": "locked-overlay-compare-plans",
              children: "Compare Plans"
            }
          )
        ] })
      ] })
    }
  );
}
function FeatureGate({
  feature,
  mode = "replace",
  children,
  featureLabel,
  description,
  compact = false
}) {
  const { hasAccess, requiredPlan } = useFeature(feature);
  if (hasAccess) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  if (mode === "hide") return null;
  const displayName = featureLabel ?? feature.split("_").map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LockedFeatureOverlay,
    {
      featureName: displayName,
      requiredPlan,
      description: description ?? (requiredPlan ? `This feature is included in the ${PLAN_CONFIGS[requiredPlan].label} plan and above.` : void 0),
      compact
    }
  );
}
[
  { flag: FeatureFlag.DEVICE_CLUSTERING, label: "Device Clustering" },
  { flag: FeatureFlag.GIS_ADVANCED, label: "Advanced GIS / Map Tools" },
  {
    flag: FeatureFlag.HISTORICAL_METRICS,
    label: "Historical Metrics (30 days)"
  },
  { flag: FeatureFlag.ADVANCED_ALERTING, label: "Advanced Alerting" },
  { flag: FeatureFlag.TOPOLOGY_VISUALIZATION, label: "Full Topology View" },
  { flag: FeatureFlag.REAL_TIME_MONITORING, label: "Real-Time Monitoring" },
  { flag: FeatureFlag.SLA_DASHBOARD, label: "SLA Dashboards" },
  {
    flag: FeatureFlag.PREDICTIVE_FAULTS,
    label: "Predictive Fault Intelligence"
  },
  { flag: FeatureFlag.AI_INSIGHTS, label: "AI Assistant & Insights" },
  { flag: FeatureFlag.WORKFLOW_AUTOMATION, label: "Workflow Automation" },
  { flag: FeatureFlag.AUDIT_LOGS, label: "Audit Logs & Compliance" },
  { flag: FeatureFlag.CAPACITY_PLANNING, label: "Capacity Planning" },
  { flag: FeatureFlag.API_ACCESS, label: "API Access & Integrations" },
  { flag: FeatureFlag.DIGITAL_TWIN, label: "Digital Twin Simulation" },
  { flag: FeatureFlag.WHITE_LABELING, label: "White-Labeling" },
  { flag: FeatureFlag.MULTI_TENANT, label: "Multi-Tenant Management" }
];
export {
  FeatureGate as F
};
