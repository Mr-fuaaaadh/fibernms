import { cn } from "@/lib/utils";
import type { Alert } from "@/types/network";
import { AlertTriangle, RadioTower, X } from "lucide-react";
/**
 * FaultAlertBanner.tsx
 * Fixed top banner showing active fault alerts with animated entry.
 */
import { AnimatePresence, motion } from "motion/react";

interface FaultAlertBannerProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
}

function severityIcon(severity: Alert["severity"]) {
  if (severity === "critical")
    return <RadioTower className="w-3.5 h-3.5 flex-shrink-0 text-red-400" />;
  return <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />;
}

function alertMessage(alert: Alert): string {
  const issue = alert.issueType.toLowerCase();
  if (
    issue.includes("fiber") ||
    issue.includes("break") ||
    issue.includes("cut")
  )
    return `⚠️ Cable cut detected – ${alert.deviceName}`;
  if (issue.includes("offline") || issue.includes("no response"))
    return `🔴 Device down – ${alert.deviceName} – Area outage`;
  if (issue.includes("signal")) return `⚠️ Signal loss – ${alert.deviceName}`;
  return `🔴 ${alert.issueType} – ${alert.deviceName}`;
}

export function FaultAlertBanner({ alerts, onDismiss }: FaultAlertBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[500] max-h-24 overflow-y-auto"
      data-ocid="fault-alert-banner"
    >
      <AnimatePresence>
        {alerts.slice(0, 4).map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.28, delay: idx * 0.05 }}
            className={cn(
              "fault-alert-banner flex items-center gap-2 mx-0 rounded-none border-0 border-b border-b-border/30 px-4 py-2.5",
              alert.severity === "critical"
                ? "border-l-4 border-l-red-500"
                : "border-l-4 border-l-amber-500 fault-alert-banner-warning",
            )}
            data-ocid={`fault-alert-banner.item.${idx + 1}`}
          >
            {severityIcon(alert.severity)}
            <span className="flex-1 text-xs font-mono text-foreground truncate">
              {alertMessage(alert)}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0">
              {new Date(alert.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {onDismiss && (
              <button
                type="button"
                onClick={() => onDismiss(alert.id)}
                className="ml-1 p-0.5 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Dismiss alert"
                data-ocid={`fault-alert-banner.close_button.${idx + 1}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
