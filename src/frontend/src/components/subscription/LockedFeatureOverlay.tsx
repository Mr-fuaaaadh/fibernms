import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Plan } from "@/types/subscription";
import { LockKeyhole } from "lucide-react";
import { PlanBadge } from "./PlanBadge";

interface LockedFeatureOverlayProps {
  featureName: string;
  requiredPlan: Plan;
  description?: string;
  compact?: boolean;
  className?: string;
}

export function LockedFeatureOverlay({
  featureName,
  requiredPlan,
  description,
  compact = false,
  className,
}: LockedFeatureOverlayProps) {
  const handleUpgrade = () => {
    window.location.href = `/billing?upgrade_to=${requiredPlan}`;
  };

  const handleComparePlans = () => {
    window.location.href = "/plans";
  };

  if (compact) {
    return (
      <div
        className={cn(
          "glass-card rounded-xl border border-border p-4 flex items-center gap-4",
          className,
        )}
        data-ocid="locked-feature-compact"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <LockKeyhole
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">
            {featureName}
          </p>
          <p className="text-xs text-muted-foreground">
            Requires{" "}
            <PlanBadge
              plan={requiredPlan}
              size="sm"
              showIcon={false}
              className="ml-1"
            />
          </p>
        </div>
        <Button
          size="sm"
          variant="default"
          onClick={handleUpgrade}
          data-ocid="locked-feature-upgrade-btn"
          className="shrink-0"
        >
          Upgrade
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[320px] items-center justify-center p-8",
        className,
      )}
      data-ocid="locked-feature-overlay"
    >
      <div className="glass-card rounded-2xl border border-border p-8 text-center max-w-md w-full shadow-noc-elevated">
        {/* Lock icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/70 border border-border">
          <LockKeyhole
            className="size-8 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        {/* Feature name */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {featureName}
        </h3>

        {/* Plan badge */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Available on</span>
          <PlanBadge plan={requiredPlan} size="md" />
          <span className="text-sm text-muted-foreground">and above</span>
        </div>

        {/* Description */}
        {description ? (
          <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        ) : (
          <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
            Upgrade your subscription to access {featureName} and unlock
            enterprise-grade telecom capabilities.
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="default"
            onClick={handleUpgrade}
            data-ocid="locked-overlay-upgrade-cta"
            className="gap-2"
          >
            <LockKeyhole className="size-4" aria-hidden="true" />
            Upgrade to{" "}
            {requiredPlan.charAt(0) + requiredPlan.slice(1).toLowerCase()}
          </Button>
          <Button
            variant="outline"
            onClick={handleComparePlans}
            data-ocid="locked-overlay-compare-plans"
          >
            Compare Plans
          </Button>
        </div>
      </div>
    </div>
  );
}
