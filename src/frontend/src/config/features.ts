import { FeatureFlag, Plan, type PlanConfig } from "../types/subscription";

// ─── Upgrade Path Order ───────────────────────────────────────────────────────
export const PLAN_ORDER: Plan[] = [
  Plan.BASIC,
  Plan.PROFESSIONAL,
  Plan.ENTERPRISE,
  Plan.ULTRA,
];

// ─── Plan Configurations ──────────────────────────────────────────────────────
export const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
  [Plan.BASIC]: {
    name: Plan.BASIC,
    label: "Basic",
    color: "emerald",
    maxDevices: 1_000,
    monthlyPrice: 9,
    annualPrice: 7,
    description: "Essential monitoring for starter ISPs and small networks.",
    features: [FeatureFlag.DEVICE_CLUSTERING],
  },
  [Plan.PROFESSIONAL]: {
    name: Plan.PROFESSIONAL,
    label: "Professional",
    color: "blue",
    maxDevices: 10_000,
    monthlyPrice: 49,
    annualPrice: 39,
    description:
      "Full GIS tools, historical metrics, and advanced alerting for growing ISPs.",
    badge: "Most Popular",
    features: [
      FeatureFlag.DEVICE_CLUSTERING,
      FeatureFlag.GIS_ADVANCED,
      FeatureFlag.HISTORICAL_METRICS,
      FeatureFlag.ADVANCED_ALERTING,
      FeatureFlag.TOPOLOGY_VISUALIZATION,
    ],
  },
  [Plan.ENTERPRISE]: {
    name: Plan.ENTERPRISE,
    label: "Enterprise",
    color: "violet",
    maxDevices: 100_000,
    monthlyPrice: 199,
    annualPrice: 159,
    description:
      "Real-time monitoring, SLA dashboards, AI insights, and multi-region support.",
    badge: "Best Value",
    features: [
      FeatureFlag.DEVICE_CLUSTERING,
      FeatureFlag.GIS_ADVANCED,
      FeatureFlag.HISTORICAL_METRICS,
      FeatureFlag.ADVANCED_ALERTING,
      FeatureFlag.TOPOLOGY_VISUALIZATION,
      FeatureFlag.REAL_TIME_MONITORING,
      FeatureFlag.SLA_DASHBOARD,
      FeatureFlag.PREDICTIVE_FAULTS,
      FeatureFlag.AUDIT_LOGS,
      FeatureFlag.CAPACITY_PLANNING,
      FeatureFlag.WORKFLOW_AUTOMATION,
      FeatureFlag.AI_INSIGHTS,
      FeatureFlag.API_ACCESS,
    ],
  },
  [Plan.ULTRA]: {
    name: Plan.ULTRA,
    label: "Ultra / Carrier",
    color: "rose",
    maxDevices: -1, // unlimited
    monthlyPrice: 999,
    annualPrice: 799,
    description:
      "Carrier-grade platform with unlimited scale, AI, digital twin, and white-labeling.",
    features: [
      FeatureFlag.DEVICE_CLUSTERING,
      FeatureFlag.GIS_ADVANCED,
      FeatureFlag.HISTORICAL_METRICS,
      FeatureFlag.ADVANCED_ALERTING,
      FeatureFlag.TOPOLOGY_VISUALIZATION,
      FeatureFlag.REAL_TIME_MONITORING,
      FeatureFlag.SLA_DASHBOARD,
      FeatureFlag.PREDICTIVE_FAULTS,
      FeatureFlag.AUDIT_LOGS,
      FeatureFlag.CAPACITY_PLANNING,
      FeatureFlag.WORKFLOW_AUTOMATION,
      FeatureFlag.AI_INSIGHTS,
      FeatureFlag.API_ACCESS,
      FeatureFlag.INTEGRATIONS,
      FeatureFlag.WHITE_LABELING,
      FeatureFlag.MULTI_TENANT,
      FeatureFlag.PLUGIN_SYSTEM,
      FeatureFlag.DIGITAL_TWIN,
    ],
  },
};

// ─── Feature → Minimum Plan Map ───────────────────────────────────────────────
// Maps each feature to the array of Plans that include it.
export const FEATURE_PLAN_MAP: Record<FeatureFlag, Plan[]> = {
  [FeatureFlag.DEVICE_CLUSTERING]: [
    Plan.BASIC,
    Plan.PROFESSIONAL,
    Plan.ENTERPRISE,
    Plan.ULTRA,
  ],
  [FeatureFlag.GIS_ADVANCED]: [Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.HISTORICAL_METRICS]: [
    Plan.PROFESSIONAL,
    Plan.ENTERPRISE,
    Plan.ULTRA,
  ],
  [FeatureFlag.ADVANCED_ALERTING]: [
    Plan.PROFESSIONAL,
    Plan.ENTERPRISE,
    Plan.ULTRA,
  ],
  [FeatureFlag.TOPOLOGY_VISUALIZATION]: [
    Plan.PROFESSIONAL,
    Plan.ENTERPRISE,
    Plan.ULTRA,
  ],
  [FeatureFlag.REAL_TIME_MONITORING]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.SLA_DASHBOARD]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.PREDICTIVE_FAULTS]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.AUDIT_LOGS]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.CAPACITY_PLANNING]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.WORKFLOW_AUTOMATION]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.AI_INSIGHTS]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.API_ACCESS]: [Plan.ENTERPRISE, Plan.ULTRA],
  [FeatureFlag.INTEGRATIONS]: [Plan.ULTRA],
  [FeatureFlag.WHITE_LABELING]: [Plan.ULTRA],
  [FeatureFlag.MULTI_TENANT]: [Plan.ULTRA],
  [FeatureFlag.PLUGIN_SYSTEM]: [Plan.ULTRA],
  [FeatureFlag.DIGITAL_TWIN]: [Plan.ULTRA],
};

// ─── Helper: get minimum plan required for a feature ─────────────────────────
export function getMinimumPlan(feature: FeatureFlag): Plan | null {
  const plans = FEATURE_PLAN_MAP[feature];
  if (!plans || plans.length === 0) return null;
  // Return the lowest-tier plan that has this feature
  for (const plan of PLAN_ORDER) {
    if (plans.includes(plan)) return plan;
  }
  return null;
}
