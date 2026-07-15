import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface UsageProgressBarProps {
  used: number;
  limit: number;
  label: string;
  showWarning?: boolean;
  /** Render compact single-line variant */
  compact?: boolean;
  className?: string;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function getProgressColor(pct: number): string {
  if (pct >= 90) return "bg-rose-500 dark:bg-rose-500";
  if (pct >= 70) return "bg-amber-500 dark:bg-amber-400";
  return "bg-emerald-500 dark:bg-emerald-400";
}

function getTrackColor(pct: number): string {
  if (pct >= 90) return "bg-rose-500/15";
  if (pct >= 70) return "bg-amber-500/15";
  return "bg-emerald-500/15";
}

function getLabelColor(pct: number): string {
  if (pct >= 90) return "text-rose-600 dark:text-rose-400";
  if (pct >= 70) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

export function UsageProgressBar({
  used,
  limit,
  label,
  showWarning = true,
  compact = false,
  className,
}: UsageProgressBarProps) {
  const isUnlimited = limit <= 0;
  const pct = isUnlimited ? 0 : Math.min(100, (used / limit) * 100);
  const showWarn = showWarning && !isUnlimited && pct > 85;

  if (compact) {
    return (
      <div
        className={cn("flex items-center gap-2", className)}
        data-ocid="usage-bar-compact"
        role="meter"
        aria-label={`${label}: ${formatNumber(used)} of ${isUnlimited ? "unlimited" : formatNumber(limit)}`}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Mini bar */}
        <div
          className={cn(
            "h-1.5 flex-1 rounded-full overflow-hidden",
            getTrackColor(pct),
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              getProgressColor(pct),
            )}
            style={{ width: isUnlimited ? "10%" : `${pct}%` }}
          />
        </div>
        <span
          className={cn(
            "text-xs font-medium tabular-nums shrink-0",
            getLabelColor(pct),
          )}
        >
          {isUnlimited ? (
            <span className="text-muted-foreground">∞</span>
          ) : (
            `${formatNumber(used)} / ${formatNumber(limit)}`
          )}
        </span>
        {showWarn && (
          <AlertTriangle
            className="size-3 shrink-0 text-rose-500"
            aria-label="Near quota limit"
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)} data-ocid="usage-bar-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {showWarn && (
            <AlertTriangle
              className="size-3 text-rose-500"
              aria-label="Near quota limit"
            />
          )}
          <span
            className={cn(
              "text-xs font-semibold tabular-nums",
              getLabelColor(pct),
            )}
            role="meter"
            aria-label={`${label}: ${formatNumber(used)} of ${isUnlimited ? "unlimited" : formatNumber(limit)}`}
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {isUnlimited ? (
              <>
                <span>{formatNumber(used)}</span>
                <span className="text-muted-foreground"> / ∞</span>
              </>
            ) : (
              <>
                {formatNumber(used)}
                <span className="text-muted-foreground">
                  {" "}
                  / {formatNumber(limit)} {label}
                </span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Track */}
      <div
        className={cn(
          "h-2 w-full overflow-hidden rounded-full",
          getTrackColor(pct),
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            getProgressColor(pct),
          )}
          style={{ width: isUnlimited ? "4%" : `${pct}%` }}
        />
      </div>

      {/* Warning message */}
      {showWarn && pct >= 90 && (
        <p className="text-[10px] text-rose-600 dark:text-rose-400">
          Quota almost full — upgrade to increase your limit.
        </p>
      )}
    </div>
  );
}
