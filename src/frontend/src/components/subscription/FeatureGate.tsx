import { PLAN_CONFIGS } from "@/config/features";
import { useFeature } from "@/hooks/useFeature";
import type { FeatureFlag } from "@/types/subscription";
import { LockedFeatureOverlay } from "./LockedFeatureOverlay";

interface FeatureGateProps {
  feature: FeatureFlag;
  /** "hide" → renders nothing if locked. "replace" → renders upgrade overlay if locked. */
  mode?: "hide" | "replace";
  children: React.ReactNode;
  /** Optional override for the displayed feature name in locked state */
  featureLabel?: string;
  /** Optional override for description shown in locked overlay */
  description?: string;
  /** Use compact overlay style */
  compact?: boolean;
}

/**
 * Composable gate wrapper. Wrap any premium section with FeatureGate to
 * conditionally show or replace content based on the user's subscription plan.
 *
 * @example
 * <FeatureGate feature={FeatureFlag.AI_INSIGHTS}>
 *   <AIInsightsPanel />
 * </FeatureGate>
 */
export function FeatureGate({
  feature,
  mode = "replace",
  children,
  featureLabel,
  description,
  compact = false,
}: FeatureGateProps) {
  const { hasAccess, requiredPlan } = useFeature(feature);

  if (hasAccess) return <>{children}</>;

  if (mode === "hide") return null;

  // mode === "replace"
  const displayName =
    featureLabel ??
    feature
      .split("_")
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(" ");

  return (
    <LockedFeatureOverlay
      featureName={displayName}
      requiredPlan={requiredPlan!}
      description={
        description ??
        (requiredPlan
          ? `This feature is included in the ${PLAN_CONFIGS[requiredPlan].label} plan and above.`
          : undefined)
      }
      compact={compact}
    />
  );
}

// ─── LockedFeatureCard ────────────────────────────────────────────────────────
// Convenience alias for the compact inline locked card
interface LockedFeatureCardProps {
  feature: FeatureFlag;
  featureLabel?: string;
}

export function LockedFeatureCard({
  feature,
  featureLabel,
}: LockedFeatureCardProps) {
  return (
    <FeatureGate
      feature={feature}
      mode="replace"
      featureLabel={featureLabel}
      compact
    >
      {/* Children are never rendered — this component is always locked */}
      <span />
    </FeatureGate>
  );
}
