/**
 * FaultStatsPanel.tsx
 * Glassmorphism KPI panel with 2x2 grid, trend sparklines, collapse to icon strip,
 * and unresolved critical alerts list. Mobile = bottom sheet, Desktop = side panel.
 */
import type { FaultStats } from "@/hooks/useFaultVisualization";
import { cn } from "@/lib/utils";
import type { Alert } from "@/types/network";
import {
  ActivitySquare,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Server,
  TrendingDown,
  Users,
  Wifi,
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
  value: number;
  sub?: string;
  colorClass: string;
  bgClass: string;
  Icon: React.ElementType;
  ocid: string;
  pulsing?: boolean;
  trend?: number[];
}

function TrendBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-px h-6 mt-1">
      {data.map((v, i) => {
        const key = `trend-${i}`;
        return (
          <div
            key={key}
            className="w-1.5 rounded-sm transition-all duration-300"
            style={{
              height: `${Math.max(10, (v / max) * 100)}%`,
              backgroundColor: color,
              opacity: i === data.length - 1 ? 1 : 0.4 + i * 0.12,
            }}
          />
        );
      })}
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  colorClass,
  bgClass,
  Icon,
  ocid,
  pulsing,
  trend,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-lg p-3 flex flex-col gap-1 border border-border/30",
        pulsing && value > 0 && "border-orange-500/30",
      )}
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0",
            bgClass,
          )}
        >
          <Icon className={cn("w-4 h-4", colorClass)} />
        </div>
        {pulsing && value > 0 && (
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse-soft" />
        )}
      </div>
      <div>
        <div
          className={cn(
            "font-mono text-2xl font-bold leading-none",
            colorClass,
          )}
        >
          {value.toLocaleString()}
        </div>
        <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
        {sub && (
          <div className="text-[10px] text-muted-foreground/60 mt-0.5">
            {sub}
          </div>
        )}
      </div>
      {trend && (
        <TrendBar
          data={trend}
          color={
            colorClass.replace("text-", "").includes("emerald")
              ? "#22c55e"
              : colorClass.includes("amber") || colorClass.includes("orange")
                ? "#f97316"
                : colorClass.includes("red")
                  ? "#ef4444"
                  : "#60a5fa"
          }
        />
      )}
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
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-start gap-2 p-2.5 rounded-lg border text-xs",
        isCritical
          ? "border-red-500/25 bg-red-500/8"
          : "border-amber-500/25 bg-amber-500/8",
      )}
      data-ocid={`fault.alert.item.${idx + 1}`}
    >
      <AlertTriangle
        className={cn(
          "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
          isCritical ? "text-red-400" : "text-amber-400",
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-mono font-semibold truncate text-[11px]">
          {alert.deviceName}
        </p>
        <p className="text-muted-foreground truncate text-[10px]">
          {alert.issueType.slice(0, 38)}
        </p>
        <p className="text-muted-foreground/50 text-[9px] mt-0.5">
          {new Date(alert.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <button
        type="button"
        onClick={onResolve}
        className={cn(
          "flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-smooth",
          isCritical
            ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
            : "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25",
        )}
        aria-label="Resolve alert"
        data-ocid={`fault.alert.resolve_button.${idx + 1}`}
      >
        Resolve
      </button>
    </motion.div>
  );
}

// Synthetic trend data based on current value (last 5 points leading up to now)
function makeTrend(current: number, variance: number): number[] {
  return [
    Math.max(0, current - variance * 3),
    Math.max(0, current - variance * 2),
    Math.max(0, current - variance),
    Math.max(0, current - Math.floor(variance / 2)),
    current,
  ];
}

export function FaultStatsPanel({
  stats,
  alerts,
  onResolveAlert,
  isMobile,
}: FaultStatsPanelProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const affectedPct =
    stats.totalCustomers > 0
      ? Math.round((stats.affectedCustomers / stats.totalCustomers) * 100)
      : 0;

  const criticalAlerts = alerts.filter((a) => a.severity === "critical");

  const iconStrip = (
    <div
      className="flex items-center gap-3 p-2"
      data-ocid="fault.stats.icon_strip"
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="w-3.5 h-3.5" />
        <span className="font-mono">{stats.totalCustomers}</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
        <Wifi className="w-3.5 h-3.5" />
        <span className="font-mono">{stats.activeCustomers}</span>
      </div>
      {stats.affectedCustomers > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-orange-400 animate-pulse-soft">
          <TrendingDown className="w-3.5 h-3.5" />
          <span className="font-mono">{stats.affectedCustomers}</span>
        </div>
      )}
      {stats.downDevices > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <Server className="w-3.5 h-3.5" />
          <span className="font-mono">{stats.downDevices}</span>
        </div>
      )}
    </div>
  );

  const panelContent = (
    <div className="fault-stats-panel" data-ocid="fault-stats-panel">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ActivitySquare className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-display font-semibold text-foreground tracking-wider uppercase">
            Network Status
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
            aria-label={collapsed ? "Expand panel" : "Collapse panel"}
            data-ocid="fault.stats.toggle"
          >
            {collapsed ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
          {isMobile && (
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
              aria-label="Close panel"
              data-ocid="fault.stats.close_button"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {collapsed ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {iconStrip}
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {/* 2×2 KPI Grid */}
            <div
              className="grid grid-cols-2 gap-2"
              data-ocid="fault.stats.kpi.section"
            >
              <KpiCard
                label="Total Customers"
                value={stats.totalCustomers}
                colorClass="text-blue-400"
                bgClass="bg-blue-500/15"
                Icon={Users}
                ocid="fault.stats.total_customers"
                trend={makeTrend(stats.totalCustomers, 2)}
              />
              <KpiCard
                label="Active"
                value={stats.activeCustomers}
                colorClass="text-emerald-400"
                bgClass="bg-emerald-500/15"
                Icon={Wifi}
                ocid="fault.stats.active_customers"
                trend={makeTrend(stats.activeCustomers, 3)}
              />
              <KpiCard
                label="Affected"
                value={stats.affectedCustomers}
                sub={affectedPct > 0 ? `${affectedPct}% of total` : undefined}
                colorClass={
                  stats.affectedCustomers > 0
                    ? "text-orange-400"
                    : "text-muted-foreground"
                }
                bgClass={
                  stats.affectedCustomers > 0
                    ? "bg-orange-500/15"
                    : "bg-muted/20"
                }
                Icon={TrendingDown}
                ocid="fault.stats.affected_customers"
                pulsing={stats.affectedCustomers > 0}
                trend={makeTrend(stats.affectedCustomers, 1)}
              />
              <KpiCard
                label="Down Devices"
                value={stats.downDevices}
                colorClass={
                  stats.downDevices > 0
                    ? "text-red-400"
                    : "text-muted-foreground"
                }
                bgClass={
                  stats.downDevices > 0 ? "bg-red-500/15" : "bg-muted/20"
                }
                Icon={Server}
                ocid="fault.stats.down_devices"
                pulsing={stats.downDevices > 0}
                trend={makeTrend(stats.downDevices, 0)}
              />
            </div>

            {/* Critical alerts list */}
            {criticalAlerts.length > 0 && (
              <div
                className="space-y-1.5"
                data-ocid="fault.stats.alerts.section"
              >
                <h3 className="text-[10px] font-display tracking-widest uppercase text-muted-foreground/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-soft" />
                  Unresolved Critical Faults
                </h3>
                <div className="space-y-1.5 max-h-36 overflow-y-auto noc-scrollbar">
                  <AnimatePresence>
                    {criticalAlerts.slice(0, 6).map((alert, idx) => (
                      <AlertRow
                        key={alert.id}
                        alert={alert}
                        onResolve={() => onResolveAlert(alert.id)}
                        idx={idx}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* All-clear state */}
            {alerts.length === 0 && (
              <div
                className="py-4 text-center"
                data-ocid="fault.stats.empty_state"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Mobile: bottom sheet
  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          data-ocid="fault.stats.open_modal_button"
          className="absolute bottom-16 right-3 z-[490] glass-elevated border border-border/50 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-mono text-foreground shadow-noc-soft"
          aria-label="Open network status"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          Network Status
          {stats.affectedCustomers > 0 && (
            <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse-soft">
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
                className="absolute bottom-0 left-0 right-0 z-[610] max-h-[72%] overflow-y-auto rounded-t-2xl bg-card border-t border-border/50 p-4"
                data-ocid="fault.stats.dialog"
              >
                {/* Pull handle */}
                <div className="w-10 h-1 rounded-full bg-border/60 mx-auto mb-4" />
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
