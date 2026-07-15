import {
  FEATURE_PLAN_MAP,
  PLAN_ORDER,
  getMinimumPlan,
} from "../config/features";
import { useSubscriptionStore } from "../store/subscriptionStore";
import type { FeatureFlag, Plan } from "../types/subscription";

// ─── useFeature ───────────────────────────────────────────────────────────────
export interface UseFeatureResult {
  hasAccess: boolean;
  requiredPlan: Plan | null;
  currentPlan: Plan;
  isHigherPlan: (plan: Plan) => boolean;
}

export function useFeature(feature: FeatureFlag): UseFeatureResult {
  const currentPlan = useSubscriptionStore((s) => s.currentPlan);
  const plansWithAccess = FEATURE_PLAN_MAP[feature] ?? [];
  const hasAccess = plansWithAccess.includes(currentPlan);
  const requiredPlan = hasAccess ? null : getMinimumPlan(feature);

  const isHigherPlan = (plan: Plan): boolean => {
    return PLAN_ORDER.indexOf(currentPlan) >= PLAN_ORDER.indexOf(plan);
  };

  return { hasAccess, requiredPlan, currentPlan, isHigherPlan };
}

// ─── useSubscription ──────────────────────────────────────────────────────────
export interface UseSubscriptionResult {
  currentPlan: Plan;
  tenantId: string;
  organizationName: string;
  deviceLimit: number;
  deviceUsed: number;
  apiQuota: number;
  apiUsed: number;
  expiryDate: number;
  trialDaysLeft: number;
  isLicenseValid: boolean;
  licenseKey: string;
  // Helpers
  planLabel: string;
  daysUntilExpiry: number;
  isExpiringSoon: boolean; // < 14 days
  isExpired: boolean;
  setCurrentPlan: (plan: Plan) => void;
  updateUsage: (deviceUsed: number, apiUsed: number) => void;
  validateLicense: (key: string) => boolean;
  setTenantId: (id: string) => void;
}

export function useSubscription(): UseSubscriptionResult {
  const store = useSubscriptionStore();

  const daysUntilExpiry = Math.max(
    0,
    Math.floor((store.expiryDate - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  return {
    ...store,
    planLabel:
      store.currentPlan.charAt(0) + store.currentPlan.slice(1).toLowerCase(),
    daysUntilExpiry,
    isExpiringSoon: daysUntilExpiry > 0 && daysUntilExpiry <= 14,
    isExpired: Date.now() > store.expiryDate,
  };
}

// ─── useDeviceQuota ───────────────────────────────────────────────────────────
export interface UseDeviceQuotaResult {
  used: number;
  limit: number;
  percentUsed: number;
  nearLimit: boolean; // > 85 %
  atLimit: boolean; // >= 100 %
}

export function useDeviceQuota(): UseDeviceQuotaResult {
  const { deviceUsed, deviceLimit } = useSubscriptionStore();

  const percentUsed =
    deviceLimit > 0 ? Math.min(100, (deviceUsed / deviceLimit) * 100) : 0;

  return {
    used: deviceUsed,
    limit: deviceLimit,
    percentUsed,
    nearLimit: percentUsed > 85,
    atLimit: percentUsed >= 100,
  };
}
