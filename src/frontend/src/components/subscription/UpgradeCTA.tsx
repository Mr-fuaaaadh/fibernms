import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLAN_CONFIGS } from "@/config/features";
import { cn } from "@/lib/utils";
import type { Plan } from "@/types/subscription";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { PlanBadge } from "./PlanBadge";

interface UpgradeCTAProps {
  featureName: string;
  currentPlan: Plan;
  requiredPlan: Plan;
  compact?: boolean;
  /** Show as tooltip on hover instead of inline card */
  tooltipMode?: boolean;
  /** When in tooltip mode, wrap this child with the tooltip trigger */
  children?: React.ReactNode;
  className?: string;
}

export function UpgradeCTA({
  featureName,
  currentPlan: _currentPlan,
  requiredPlan,
  compact = false,
  tooltipMode = false,
  children,
  className,
}: UpgradeCTAProps) {
  const config = PLAN_CONFIGS[requiredPlan];

  const handleUpgrade = () => {
    window.location.href = `/billing?upgrade_to=${requiredPlan}`;
  };

  if (tooltipMode) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children ?? <span>{featureName}</span>}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[220px] text-center p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-1.5 text-xs">
              <LockKeyhole className="size-3" aria-hidden="true" />
              <span>Locked feature</span>
            </div>
            <p className="text-xs">
              Upgrade to <strong>{config.label}</strong> to unlock{" "}
              <strong>{featureName}</strong>
            </p>
            <button
              onClick={handleUpgrade}
              type="button"
              className="mt-1 text-xs underline underline-offset-2 hover:no-underline transition-smooth"
              data-ocid="upgrade-cta-tooltip-btn"
            >
              Upgrade now →
            </button>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3",
          className,
        )}
        data-ocid="upgrade-cta-compact"
      >
        <LockKeyhole
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground truncate">
            Upgrade to{" "}
            <PlanBadge
              plan={requiredPlan}
              size="sm"
              showIcon={false}
              className="mx-1"
            />
            to unlock{" "}
            <span className="text-foreground font-medium">{featureName}</span>
          </p>
        </div>
        <Button
          size="sm"
          variant="default"
          onClick={handleUpgrade}
          data-ocid="upgrade-cta-compact-btn"
          className="shrink-0 gap-1.5"
        >
          Upgrade <ArrowRight className="size-3" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  // Full card
  return (
    <div
      className={cn(
        "glass-card rounded-2xl border border-border p-6",
        className,
      )}
      data-ocid="upgrade-cta-card"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
          <LockKeyhole className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground mb-0.5">
            Upgrade to unlock {featureName}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <PlanBadge plan={requiredPlan} size="sm" />
            <span className="text-xs text-muted-foreground">
              from ${config.monthlyPrice}
              <span className="text-muted-foreground/60">/mo</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            {config.description}
          </p>
          <Button
            size="sm"
            variant="default"
            onClick={handleUpgrade}
            data-ocid="upgrade-cta-full-btn"
            className="gap-2"
          >
            Start Upgrade
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
