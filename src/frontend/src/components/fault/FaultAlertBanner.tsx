/**
 * FaultAlertBanner.tsx
 * Glassmorphism fixed top bar with severity-coded alert cards, stagger animation,
 * click-to-jump, max-3 visible + "+N more" badge, fade-in-down on new alerts.
 */
import { cn } from "@/lib/utils";
import type { Alert } from "@/types/network";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface FaultAlertBannerProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
  onJump?: (alert: Alert) => void;
}

type Severity = Alert["severity"];

const SEVERITY_CONFIG: Record<
  Severity,
  {
    borderColor: string;
    bgColor: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    Icon: React.ElementType;
    label: string;
  }
> = {
  critical: {
    borderColor: "border-l-red-500",
    bgColor: "bg-red-500/5",
    iconColor: "text-red-400",
    badgeBg: "bg-red-500/20",
    badgeText: "text-red-400",
    Icon: AlertCircle,
    label: "CRITICAL",
  },
  warning: {
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-500/5",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-400",
    Icon: AlertTriangle,
    label: "WARNING",
  },
  info: {
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-400",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-blue-400",
    Icon: Info,
    label: "INFO",
  },
};

function alertTitle(alert: Alert): string {
  const issue = alert.issueType.toLowerCase();
  if (
    issue.includes("fiber") ||
    issue.includes("break") ||
    issue.includes("cut")
  )
    return "Cable Cut Detected";
  if (issue.includes("offline") || issue.includes("no response"))
    return "Device Offline";
  if (issue.includes("signal")) return "Signal Loss";
  if (issue.includes("latency") || issue.includes("packet"))
    return "Performance Degraded";
  return alert.issueType;
}

function affectedCount(alert: Alert): number | null {
  const m = alert.issueType.match(/(\d+)\s*customer/i);
  return m ? Number.parseInt(m[1], 10) : null;
}

export function FaultAlertBanner({
  alerts,
  onDismiss,
  onJump,
}: FaultAlertBannerProps) {
  if (alerts.length === 0) return null;

  const MAX_VISIBLE = 3;
  const visible = alerts.slice(0, MAX_VISIBLE);
  const overflow = alerts.length - MAX_VISIBLE;

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[500] pointer-events-none"
      data-ocid="fault-alert-banner"
    >
      {/* Glassmorphism backdrop bar */}
      <div className="pointer-events-auto bg-black/60 backdrop-blur-md border-b border-border/30">
        <AnimatePresence mode="popLayout">
          {visible.map((alert, idx) => {
            const cfg =
              SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.warning;
            const { Icon } = cfg;
            const count = affectedCount(alert);
            const title = alertTitle(alert);
            const time = new Date(alert.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={alert.id}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0, height: 0, marginBottom: 0 }}
                transition={{
                  duration: 0.28,
                  delay: idx * 0.05,
                }}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2.5 border-b border-border/20 border-l-4",
                  cfg.borderColor,
                  cfg.bgColor,
                  "animate-fade-in-down",
                )}
                data-ocid={`fault-alert-banner.item.${idx + 1}`}
              >
                {/* Severity Icon */}
                <Icon className={cn("w-4 h-4 flex-shrink-0", cfg.iconColor)} />

                {/* Severity badge */}
                <span
                  className={cn(
                    "hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest flex-shrink-0",
                    cfg.badgeBg,
                    cfg.badgeText,
                  )}
                >
                  {cfg.label}
                </span>

                {/* Title + device */}
                <div className="flex-1 min-w-0 flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold text-foreground truncate">
                    {title}
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate hidden sm:inline">
                    — {alert.deviceName}
                  </span>
                </div>

                {/* Affected count */}
                {count !== null && (
                  <span className="flex items-center gap-1 text-[11px] flex-shrink-0">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className={cfg.iconColor}>{count}</span>
                  </span>
                )}

                {/* Time */}
                <span className="text-[10px] text-muted-foreground/70 font-mono flex-shrink-0 hidden sm:inline">
                  {time}
                </span>

                {/* Jump button */}
                {onJump && (
                  <button
                    type="button"
                    onClick={() => onJump(alert)}
                    className={cn(
                      "flex-shrink-0 p-1 rounded transition-smooth",
                      "hover:bg-muted/30",
                      cfg.iconColor,
                    )}
                    aria-label="Jump to device"
                    data-ocid={`fault-alert-banner.link.${idx + 1}`}
                  >
                    <MapPin className="w-3 h-3" />
                  </button>
                )}

                {/* Dismiss */}
                {onDismiss && (
                  <button
                    type="button"
                    onClick={() => onDismiss(alert.id)}
                    className="flex-shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
                    aria-label="Dismiss alert"
                    data-ocid={`fault-alert-banner.close_button.${idx + 1}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* "+N more" overflow badge */}
        {overflow > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-1.5 py-1.5 px-4 text-[11px] text-muted-foreground bg-muted/20"
            data-ocid="fault-alert-banner.overflow_badge"
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>
              +{overflow} more alert{overflow !== 1 ? "s" : ""}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
