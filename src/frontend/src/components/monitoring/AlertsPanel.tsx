import type { Alert } from "@/types/network";
import { format } from "date-fns";
import { AlertTriangle, Clock, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface AlertsPanelProps {
  alerts: Alert[];
  onAlertClick: (deviceId: string) => void;
}

function formatTs(ts: number): string {
  return format(new Date(ts), "MMM dd HH:mm");
}

export function AlertsPanel({ alerts, onAlertClick }: AlertsPanelProps) {
  const active = alerts.filter((a) => !a.resolved);

  return (
    <div data-ocid="alerts-panel">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
        </span>
        <h3 className="text-sm font-semibold text-foreground tracking-wide">
          Active Alerts
        </h3>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground bg-muted/50 rounded px-2 py-0.5">
          {active.length} UNRESOLVED
        </span>
      </div>

      <div
        className="max-h-64 overflow-y-auto noc-scrollbar space-y-2 pr-1"
        data-ocid="alerts-list"
      >
        <AnimatePresence initial={false}>
          {active.map((alert, i) => {
            const isCritical = alert.severity === "critical";
            return (
              <motion.button
                key={alert.id}
                type="button"
                className={`w-full text-left rounded-xl px-4 py-3 border transition-smooth cursor-pointer flex items-start gap-3 ${
                  isCritical
                    ? "bg-destructive/10 border-destructive/30 hover:bg-destructive/15"
                    : "bg-accent/10 border-accent/30 hover:bg-accent/15"
                }`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onAlertClick(alert.deviceId)}
                data-ocid="alert-row"
              >
                {/* Severity icon */}
                <span className="mt-0.5 shrink-0">
                  {isCritical ? (
                    <XCircle
                      size={14}
                      className="text-destructive"
                      aria-label="Critical"
                    />
                  ) : (
                    <AlertTriangle
                      size={14}
                      className="text-accent"
                      aria-label="Warning"
                    />
                  )}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs font-semibold text-foreground truncate">
                      {alert.deviceName}
                    </span>
                    <span
                      className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                        isCritical
                          ? "bg-destructive/25 text-destructive"
                          : "bg-accent/25 text-accent"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1">
                    {alert.issueType}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="shrink-0 flex items-center gap-1 text-[10px] text-muted-foreground font-mono whitespace-nowrap mt-0.5">
                  <Clock size={10} />
                  {formatTs(alert.timestamp)}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {active.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            <p className="font-mono text-xs">NO ACTIVE ALERTS</p>
          </div>
        )}
      </div>
    </div>
  );
}
