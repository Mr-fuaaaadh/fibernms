import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FEATURE_PLAN_MAP, PLAN_CONFIGS, PLAN_ORDER } from "@/config/features";
import { cn } from "@/lib/utils";
import { FeatureFlag, type Plan } from "@/types/subscription";
import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { PlanBadge } from "./PlanBadge";

interface PlanComparisonModalProps {
  currentPlan: Plan;
  targetPlan?: Plan;
  trigger?: React.ReactNode;
}

// Featured feature rows shown in the comparison table
const COMPARISON_FEATURES: Array<{ flag: FeatureFlag; label: string }> = [
  { flag: FeatureFlag.DEVICE_CLUSTERING, label: "Device Clustering" },
  { flag: FeatureFlag.GIS_ADVANCED, label: "Advanced GIS / Map Tools" },
  {
    flag: FeatureFlag.HISTORICAL_METRICS,
    label: "Historical Metrics (30 days)",
  },
  { flag: FeatureFlag.ADVANCED_ALERTING, label: "Advanced Alerting" },
  { flag: FeatureFlag.TOPOLOGY_VISUALIZATION, label: "Full Topology View" },
  { flag: FeatureFlag.REAL_TIME_MONITORING, label: "Real-Time Monitoring" },
  { flag: FeatureFlag.SLA_DASHBOARD, label: "SLA Dashboards" },
  {
    flag: FeatureFlag.PREDICTIVE_FAULTS,
    label: "Predictive Fault Intelligence",
  },
  { flag: FeatureFlag.AI_INSIGHTS, label: "AI Assistant & Insights" },
  { flag: FeatureFlag.WORKFLOW_AUTOMATION, label: "Workflow Automation" },
  { flag: FeatureFlag.AUDIT_LOGS, label: "Audit Logs & Compliance" },
  { flag: FeatureFlag.CAPACITY_PLANNING, label: "Capacity Planning" },
  { flag: FeatureFlag.API_ACCESS, label: "API Access & Integrations" },
  { flag: FeatureFlag.DIGITAL_TWIN, label: "Digital Twin Simulation" },
  { flag: FeatureFlag.WHITE_LABELING, label: "White-Labeling" },
  { flag: FeatureFlag.MULTI_TENANT, label: "Multi-Tenant Management" },
];

function hasFeature(plan: Plan, flag: FeatureFlag): boolean {
  return FEATURE_PLAN_MAP[flag]?.includes(plan) ?? false;
}

function DeviceLimitLabel(limit: number): string {
  if (limit === -1) return "Unlimited";
  return limit >= 1_000_000
    ? `${limit / 1_000_000}M`
    : limit >= 1_000
      ? `${limit / 1_000}K`
      : limit.toString();
}

export function PlanComparisonModal({
  currentPlan,
  targetPlan,
  trigger,
}: PlanComparisonModalProps) {
  const [open, setOpen] = useState(false);

  const handleUpgrade = (plan: Plan) => {
    setOpen(false);
    window.location.href = `/billing?upgrade_to=${plan}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" data-ocid="compare-plans-trigger">
            Compare Plans
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl w-[calc(100vw-2rem)] max-h-[80vh] overflow-hidden flex flex-col bg-card p-0"
        data-ocid="plan-comparison-modal"
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
          <DialogTitle className="text-lg font-semibold">
            Plan Comparison
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Compare features across all plans. Your current plan is highlighted.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-auto flex-1">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-card border-b border-border">
              <tr>
                <th className="py-4 px-4 text-left text-xs font-medium text-muted-foreground w-[35%]">
                  Feature
                </th>
                {PLAN_ORDER.map((plan) => {
                  const config = PLAN_CONFIGS[plan];
                  const isCurrent = plan === currentPlan;
                  const isTarget = plan === targetPlan;
                  return (
                    <th
                      key={plan}
                      className={cn(
                        "py-4 px-3 text-center",
                        (isCurrent || isTarget) && "bg-primary/5",
                      )}
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <PlanBadge plan={plan} size="sm" showIcon />
                        {isCurrent && (
                          <span className="text-[9px] font-semibold tracking-widest text-primary uppercase">
                            Current
                          </span>
                        )}
                        {isTarget && !isCurrent && (
                          <span className="text-[9px] font-semibold tracking-widest text-violet-500 uppercase">
                            Recommended
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground font-normal">
                          ${config.monthlyPrice}
                          <span className="text-muted-foreground/60">/mo</span>
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {/* Device limit row */}
              <tr className="bg-muted/20">
                <td className="py-3 px-4 text-xs text-muted-foreground font-medium">
                  Max Devices
                </td>
                {PLAN_ORDER.map((plan) => {
                  const isCurrent = plan === currentPlan;
                  const isTarget = plan === targetPlan;
                  return (
                    <td
                      key={plan}
                      className={cn(
                        "py-3 px-3 text-center text-xs font-semibold text-foreground",
                        (isCurrent || isTarget) && "bg-primary/5",
                      )}
                    >
                      {DeviceLimitLabel(PLAN_CONFIGS[plan].maxDevices)}
                    </td>
                  );
                })}
              </tr>

              {/* Feature rows */}
              {COMPARISON_FEATURES.map(({ flag, label }, idx) => (
                <tr
                  key={flag}
                  className={cn(
                    idx % 2 === 0 ? "bg-background" : "bg-muted/10",
                  )}
                >
                  <td className="py-2.5 px-4 text-xs text-foreground">
                    {label}
                  </td>
                  {PLAN_ORDER.map((plan) => {
                    const isCurrent = plan === currentPlan;
                    const isTarget = plan === targetPlan;
                    const included = hasFeature(plan, flag);
                    return (
                      <td
                        key={plan}
                        className={cn(
                          "py-2.5 px-3 text-center",
                          (isCurrent || isTarget) && "bg-primary/5",
                        )}
                      >
                        {included ? (
                          <Check
                            className="size-3.5 text-emerald-500 mx-auto"
                            aria-label="Included"
                          />
                        ) : (
                          <Minus
                            className="size-3 text-muted-foreground/40 mx-auto"
                            aria-label="Not included"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: upgrade CTAs */}
        <div className="px-6 py-4 border-t border-border shrink-0">
          <div className="grid grid-cols-4 gap-3">
            {PLAN_ORDER.map((plan) => {
              const isCurrent = plan === currentPlan;
              const isDowngrade =
                PLAN_ORDER.indexOf(plan) < PLAN_ORDER.indexOf(currentPlan);

              return (
                <Button
                  key={plan}
                  variant={isCurrent ? "secondary" : "default"}
                  size="sm"
                  disabled={isCurrent || isDowngrade}
                  onClick={() => handleUpgrade(plan)}
                  data-ocid={`compare-upgrade-${plan.toLowerCase()}`}
                  className="w-full text-xs"
                >
                  {isCurrent
                    ? "Current Plan"
                    : isDowngrade
                      ? "Lower Tier"
                      : `Upgrade to ${PLAN_CONFIGS[plan].label}`}
                </Button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
