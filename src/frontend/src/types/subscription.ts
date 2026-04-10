// ─── Plan Tiers ───────────────────────────────────────────────────────────────
export enum Plan {
  BASIC = "BASIC",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
  ULTRA = "ULTRA",
}

// ─── Feature Flags ────────────────────────────────────────────────────────────
export enum FeatureFlag {
  AI_INSIGHTS = "AI_INSIGHTS",
  WORKFLOW_AUTOMATION = "WORKFLOW_AUTOMATION",
  DIGITAL_TWIN = "DIGITAL_TWIN",
  TOPOLOGY_VISUALIZATION = "TOPOLOGY_VISUALIZATION",
  REAL_TIME_MONITORING = "REAL_TIME_MONITORING",
  PREDICTIVE_FAULTS = "PREDICTIVE_FAULTS",
  SLA_DASHBOARD = "SLA_DASHBOARD",
  CAPACITY_PLANNING = "CAPACITY_PLANNING",
  AUDIT_LOGS = "AUDIT_LOGS",
  ADVANCED_ALERTING = "ADVANCED_ALERTING",
  API_ACCESS = "API_ACCESS",
  INTEGRATIONS = "INTEGRATIONS",
  WHITE_LABELING = "WHITE_LABELING",
  MULTI_TENANT = "MULTI_TENANT",
  PLUGIN_SYSTEM = "PLUGIN_SYSTEM",
  GIS_ADVANCED = "GIS_ADVANCED",
  DEVICE_CLUSTERING = "DEVICE_CLUSTERING",
  HISTORICAL_METRICS = "HISTORICAL_METRICS",
}

// ─── Plan Configuration ───────────────────────────────────────────────────────
export interface PlanConfig {
  name: Plan;
  label: string;
  color: string; // Tailwind color class segment, e.g. "emerald"
  maxDevices: number; // -1 = unlimited
  monthlyPrice: number; // USD
  annualPrice: number; // USD per month (billed annually)
  features: FeatureFlag[];
  description: string;
  badge?: string; // optional "Most Popular", "Best Value", etc.
}

// ─── Subscription State ───────────────────────────────────────────────────────
export interface SubscriptionState {
  currentPlan: Plan;
  tenantId: string;
  organizationName: string;
  deviceLimit: number;
  deviceUsed: number;
  apiQuota: number; // calls / month
  apiUsed: number;
  expiryDate: number; // unix timestamp (ms)
  trialDaysLeft: number;
  isLicenseValid: boolean;
  licenseKey: string;
}

// ─── Billing Record ───────────────────────────────────────────────────────────
export interface BillingRecord {
  id: string;
  date: number; // unix timestamp (ms)
  description: string;
  amount: number; // USD
  currency: string;
  status: "paid" | "pending" | "failed";
}

// ─── Tenant Info ──────────────────────────────────────────────────────────────
export interface TenantInfo {
  id: string;
  name: string;
  plan: Plan;
  adminEmail: string;
  deviceCount: number;
  deviceLimit: number;
  status: "active" | "paused" | "expired";
  createdAt: number; // unix timestamp (ms)
}
