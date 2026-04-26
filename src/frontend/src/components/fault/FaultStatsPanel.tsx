import type { FaultStats } from "@/hooks/useFaultVisualization";
/**
 * FaultStatsPanel.tsx
 * Right-side stats panel / mobile bottom sheet showing network fault KPIs and alerts.
 */
import { cn } from "@/lib/utils";
import type { Alert } from "@/types/network";
import {
  AlertTriangle,
  ChevronUp,
  Server,
  TrendingDown,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FaultStatsPanelProps {
  stats: FaultStats;
  alerts: Alert[];
  onResolveAlert: (id: string) => void;
  isMobile?: boolean;
}

interface KpiCardProps {
  label: string;
  value: number | string;
  sub?: string;
  colorClass: string;
  Icon: React.ElementType;
  ocid: string;
}

function KpiCard({ label, value, sub, colorClass, Icon, ocid }: KpiCardProps) {
  return (
    <div className="fault-stat-row" data-ocid={ocid}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-6 h-6 rounded flex items-center justify-center flex-shrink-0",
            colorClass,
            "bg-current/10",
          )}
        >
          <Icon
            className={cn("w-3.5 h-3.5", colorClass)}
            style={{ color: "currentColor" }}
          />
        </div>
        <span className="fault-stat-label text-xs">{label}</span>
      </div>
      <div className="text-right">
        <span className={cn("fault-stat-value text-base", colorClass)}>
          {value}
        </span>
        {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

function AlertRow({
  alert,
  onResolve,
  idx,
}: { alert: Alert; onResolve: () => void; idx: number }) {
  const isCritical = alert.severity === "critical";
  return (
    <div
      className={cn(
        "flex items-start gap-2 p-2 rounded-md border text-xs",
        isCritical
          ? "border-red-500/20 bg-red-500/5"
          : "border-amber-500/20 bg-amber-500/5",
      )}
      data-ocid={`fault.alert.item.${idx + 1}`}
    >
      <AlertTriangle
        className={cn(
          "w-3 h-3 mt-0.5 flex-shrink-0",
          isCritical ? "text-red-400" : "text-amber-400",
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-mono truncate text-[11px]">
          {alert.deviceName}
        </p>
        <p className="text-muted-foreground truncate">
          {alert.issueType.slice(0, 40)}
        </p>
        <p className="text-muted-foreground/60 text-[10px]">
          {new Date(alert.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <button
        type="button"
        onClick={onResolve}
        className="p-0.5 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-smooth flex-shrink-0"
        aria-label="Resolve alert"
        data-ocid={`fault.alert.resolve_button.${idx + 1}`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

export function FaultStatsPanel({
  stats,
  alerts,
  onResolveAlert,
  isMobile,
}: FaultStatsPanelProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const affectedPct =
    stats.totalCustomers > 0
      ? Math.round((stats.affectedCustomers / stats.totalCustomers) * 100)
      : 0;

  const panelContent = (
    <div className="fault-stats-panel" data-ocid="fault-stats-panel">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase">
          Network Status
        </h2>
        {isMobile && (
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="p-1 rounded hover:bg-muted/40 text-muted-foreground"
            aria-label="Close panel"
            data-ocid="fault.stats.close_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* KPIs */}
      <div className="space-y-0" data-ocid="fault.stats.kpi.section">
        <KpiCard
          label="Total Customers"
          value={stats.totalCustomers}
          colorClass="text-foreground"
          Icon={Users}
          ocid="fault.stats.total_customers"
        />
        <KpiCard
          label="Active Customers"
          value={stats.activeCustomers}
          colorClass="text-emerald-400"
          Icon={Users}
          ocid="fault.stats.active_customers"
        />
        <KpiCard
          label="Affected Customers"
          value={stats.affectedCustomers}
          sub={`${affectedPct}% of total`}
          colorClass="text-amber-400"
          Icon={TrendingDown}
          ocid="fault.stats.affected_customers"
        />
        <KpiCard
          label="Down Devices"
          value={stats.downDevices}
          colorClass="text-red-400"
          Icon={Server}
          ocid="fault.stats.down_devices"
        />
      </div>

      {/* Active alerts */}
      {alerts.length > 0 && (
        <div
          className="mt-3 space-y-1.5"
          data-ocid="fault.stats.alerts.section"
        >
          <h3 className="text-[10px] font-display tracking-widest uppercase text-muted-foreground/60">
            Active Faults
          </h3>
          <div className="space-y-1.5 max-h-40 overflow-y-auto noc-scrollbar">
            {alerts.slice(0, 6).map((alert, idx) => (
              <AlertRow
                key={alert.id}
                alert={alert}
                onResolve={() => onResolveAlert(alert.id)}
                idx={idx}
              />
            ))}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div
          className="mt-2 py-3 text-center text-xs text-muted-foreground"
          data-ocid="fault.stats.empty_state"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-1">
            <span className="text-emerald-400 text-sm">✓</span>
          </div>
          All systems operational
        </div>
      )}
    </div>
  );

  // Mobile: bottom sheet
  if (isMobile) {
    return (
      <>
        {/* Pull tab */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          data-ocid="fault.stats.open_modal_button"
          className="absolute bottom-16 right-3 z-[490] glass-elevated border border-border/50 rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-mono text-foreground shadow-noc-soft"
          aria-label="Open network status"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          Network Status
          {stats.affectedCustomers > 0 && (
            <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {stats.affectedCustomers}
            </span>
          )}
        </button>

        <AnimatePresence>
          {sheetOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[600] bg-background/50 backdrop-blur-sm"
                onClick={() => setSheetOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                className="absolute bottom-0 left-0 right-0 z-[610] max-h-[70%] overflow-y-auto rounded-t-xl bg-card border-t border-border/50 p-4"
                data-ocid="fault.stats.dialog"
              >
                {panelContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop: side panel
  return (
    <div
      className="absolute top-[var(--fault-controls-height,80px)] right-3 z-[490] w-64"
      data-ocid="fault.stats.panel"
    >
      {panelContent}
    </div>
  );
}
