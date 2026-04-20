import { ax as useSubscriptionStore, aJ as FEATURE_PLAN_MAP, aM as getMinimumPlan, aB as PLAN_ORDER } from "./index-X_EKDj9u.js";
function useFeature(feature) {
  const currentPlan = useSubscriptionStore((s) => s.currentPlan);
  const plansWithAccess = FEATURE_PLAN_MAP[feature] ?? [];
  const hasAccess = plansWithAccess.includes(currentPlan);
  const requiredPlan = hasAccess ? null : getMinimumPlan(feature);
  const isHigherPlan = (plan) => {
    return PLAN_ORDER.indexOf(currentPlan) >= PLAN_ORDER.indexOf(plan);
  };
  return { hasAccess, requiredPlan, currentPlan, isHigherPlan };
}
function useSubscription() {
  const store = useSubscriptionStore();
  const daysUntilExpiry = Math.max(
    0,
    Math.floor((store.expiryDate - Date.now()) / (1e3 * 60 * 60 * 24))
  );
  return {
    ...store,
    planLabel: store.currentPlan.charAt(0) + store.currentPlan.slice(1).toLowerCase(),
    daysUntilExpiry,
    isExpiringSoon: daysUntilExpiry > 0 && daysUntilExpiry <= 14,
    isExpired: Date.now() > store.expiryDate
  };
}
function useDeviceQuota() {
  const { deviceUsed, deviceLimit } = useSubscriptionStore();
  const percentUsed = deviceLimit > 0 ? Math.min(100, deviceUsed / deviceLimit * 100) : 0;
  return {
    used: deviceUsed,
    limit: deviceLimit,
    percentUsed,
    nearLimit: percentUsed > 85,
    atLimit: percentUsed >= 100
  };
}
export {
  useDeviceQuota as a,
  useFeature as b,
  useSubscription as u
};
