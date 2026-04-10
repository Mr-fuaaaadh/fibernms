import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { useNetworkStore } from "@/store/networkStore";
import type { Alert, Device } from "@/types/network";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Wifi,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Mini sparkline bar chart ──────────────────────────────────────────────────

function SparkBars({
  values,
  color = "bg-primary",
}: { values: number[]; color?: string }) {
  const max = Math.max(...values, 1);
  const labeled = values.map((v, i) => ({ v, k: `${i}-${v}` }));
  return (
    <div className="flex items-end gap-0.5 h-8">
      {labeled.map(({ v, k }) => (
        <div
          key={k}
          className={`flex-1 rounded-sm ${color} opacity-70 transition-smooth`}
          style={{ height: `${(v / max) * 100}%`, minHeight: 2 }}
        />
      ))}
    </div>
  );
}

// ── Gauge bar ─────────────────────────────────────────────────────────────────

function GaugeBar({
  value,
  max = 100,
  color = "bg-primary",
}: {
  value: number;
  max?: number;
  color?: string;
}) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  unit,
  trend,
  trendVal,
  icon: Icon,
  sparkValues,
  sparkColor,
  delay = 0,
}: {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down";
  trendVal?: string;
  icon: React.ElementType;
  sparkValues: number[];
  sparkColor?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <GlassCard elevated className="p-4 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
            <Icon size={15} className="text-primary" />
          </div>
          {trend && trendVal && (
            <div
              className={`flex items-center gap-1 text-[11px] font-medium ${
                trend === "up" ? "text-emerald-400" : "text-destructive"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp size={11} />
              ) : (
                <TrendingDown size={11} />
              )}
              {trendVal}
            </div>
          )}
        </div>
        <p className="text-2xl font-display font-bold tabular-nums text-foreground">
          {value}
          {unit && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {unit}
            </span>
          )}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">{label}</p>
        <SparkBars values={sparkValues} color={sparkColor} />
      </GlassCard>
    </motion.div>
  );
}

// ── Signal quality distribution ───────────────────────────────────────────────

function SignalDistribution({ devices }: { devices: Device[] }) {
  const bands = [
    {
      label: "Excellent (−8 to −20 dBm)",
      min: -20,
      max: -8,
      color: "bg-emerald-400",
    },
    { label: "Good (−20 to −27 dBm)", min: -27, max: -20, color: "bg-primary" },
    {
      label: "Marginal (−27 to −30 dBm)",
      min: -30,
      max: -27,
      color: "bg-yellow-400",
    },
    {
      label: "Fault (below −30 dBm)",
      min: -999,
      max: -30,
      color: "bg-destructive",
    },
  ];

  const total =
    devices.filter((d) => d.signalStrength !== undefined).length || 1;

  return (
    <GlassCard elevated className="p-5">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <Zap size={11} className="text-primary" />
        Signal Quality Distribution
      </p>
      <div className="space-y-3">
        {bands.map(({ label, min, max, color }) => {
          const count = devices.filter(
            (d) =>
              d.signalStrength !== undefined &&
              d.signalStrength > min &&
              d.signalStrength <= max,
          ).length;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={label}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground tabular-nums">
                  {count} / {total}
                </span>
              </div>
              <GaugeBar value={count} max={total} color={color} />
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                {pct}% of devices
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

// ── Device type breakdown ─────────────────────────────────────────────────────

function DeviceBreakdown({ devices }: { devices: Device[] }) {
  const types = ["OLT", "Splitter", "ONT", "JJB", "Switch"] as const;
  const colors: Record<string, string> = {
    OLT: "bg-primary",
    Splitter: "bg-accent",
    ONT: "bg-emerald-400",
    JJB: "bg-yellow-400",
    Switch: "bg-purple-400",
  };

  return (
    <GlassCard elevated className="p-5">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <BarChart3 size={11} className="text-primary" />
        Device Type Breakdown
      </p>
      <div className="space-y-2.5">
        {types.map((type) => {
          const all = devices.filter((d) => d.type === type);
          const active = all.filter((d) => d.status === "active").length;
          const faulty = all.filter((d) => d.status === "faulty").length;
          const warn = all.filter((d) => d.status === "warning").length;
          return (
            <div key={type} className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${colors[type]} flex-shrink-0`}
              />
              <span className="text-xs font-medium text-foreground w-16 flex-shrink-0">
                {type}
              </span>
              <div className="flex-1">
                <GaugeBar
                  value={all.length}
                  max={devices.length}
                  color={colors[type]}
                />
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums w-6 text-right">
                {all.length}
              </span>
              <div className="flex gap-1">
                {active > 0 && (
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1.5 py-0 border-emerald-500/40 text-emerald-400"
                  >
                    {active} ok
                  </Badge>
                )}
                {faulty > 0 && (
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1.5 py-0 border-destructive/40 text-destructive"
                  >
                    {faulty} fault
                  </Badge>
                )}
                {warn > 0 && (
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1.5 py-0 border-yellow-500/40 text-yellow-400"
                  >
                    {warn} warn
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

// ── Alert timeline ────────────────────────────────────────────────────────────

function AlertTimeline({ alerts }: { alerts: Alert[] }) {
  const sorted = [...alerts].sort((a, b) => b.timestamp - a.timestamp);

  function relTime(ts: number) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ${m % 60}m ago`;
  }

  return (
    <GlassCard elevated className="p-5">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <AlertTriangle size={11} className="text-destructive" />
        Alert Timeline
      </p>
      <div className="space-y-3 max-h-[260px] overflow-y-auto noc-scrollbar">
        {sorted.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  alert.severity === "critical"
                    ? "bg-destructive"
                    : alert.severity === "warning"
                      ? "bg-yellow-400"
                      : "bg-primary"
                }`}
              />
              {i < sorted.length - 1 && (
                <div className="w-px flex-1 bg-border/30 mt-1 min-h-[20px]" />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-foreground truncate">
                  {alert.deviceName}
                </span>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">
                  {relTime(alert.timestamp)}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                {alert.issueType}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

// ── Uptime ranking ────────────────────────────────────────────────────────────

function UptimeRanking({ devices }: { devices: Device[] }) {
  const sorted = [...devices]
    .filter((d) => d.uptime !== undefined)
    .sort((a, b) => (b.uptime ?? 0) - (a.uptime ?? 0))
    .slice(0, 8);

  return (
    <GlassCard elevated className="p-5">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <Activity size={11} className="text-primary" />
        Device Uptime Ranking
      </p>
      <div className="space-y-2">
        {sorted.map((d, i) => {
          const pct = d.uptime ?? 0;
          const color =
            pct >= 99.5
              ? "bg-emerald-400"
              : pct >= 90
                ? "bg-primary"
                : pct >= 50
                  ? "bg-yellow-400"
                  : "bg-destructive";
          return (
            <div key={d.id} className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-4 text-right tabular-nums">
                {i + 1}
              </span>
              <span className="text-[11px] text-foreground flex-1 truncate min-w-0">
                {d.name}
              </span>
              <div className="w-20">
                <GaugeBar value={pct} max={100} color={color} />
              </div>
              <span className="text-[11px] font-medium text-foreground tabular-nums w-14 text-right">
                {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

const FILTERS = ["24h", "7d", "30d", "All"] as const;
type Filter = (typeof FILTERS)[number];

// Deterministic mock spark values seeded by type
function sparkFor(seed: number, len = 12) {
  return Array.from({ length: len }, (_, i) => {
    const val = 60 + ((seed * (i + 1) * 7) % 40);
    return val;
  });
}

export default function Analytics() {
  const { devices, alerts } = useNetworkStore();
  const [filter, setFilter] = useState<Filter>("24h");

  const total = devices.length;
  const online = devices.filter((d) => d.status === "active").length;
  const faulty = devices.filter((d) => d.status === "faulty").length;
  const warn = devices.filter((d) => d.status === "warning").length;
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const avgSignal =
    devices
      .filter((d) => d.signalStrength !== undefined)
      .reduce((s, d) => s + (d.signalStrength ?? 0), 0) /
    (devices.filter((d) => d.signalStrength !== undefined).length || 1);
  const avgUptime =
    devices
      .filter((d) => d.uptime !== undefined)
      .reduce((s, d) => s + (d.uptime ?? 0), 0) /
    (devices.filter((d) => d.uptime !== undefined).length || 1);

  return (
    <div
      className="flex flex-col h-full p-4 gap-4 overflow-y-auto noc-scrollbar"
      data-ocid="analytics-page"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="font-display text-base font-semibold text-foreground tracking-wide flex items-center gap-2">
            <BarChart3 size={18} className="text-primary" />
            Network Analytics
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Performance metrics and health overview
          </p>
        </div>
        <div className="flex gap-1 glass-card rounded-xl p-1">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth ${
                filter === f
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="time-filter-btn"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
        <StatCard
          label="Total Devices"
          value={total}
          icon={Wifi}
          trend="up"
          trendVal="+2 this week"
          sparkValues={sparkFor(1)}
          delay={0}
        />
        <StatCard
          label="Network Availability"
          value={avgUptime.toFixed(1)}
          unit="%"
          icon={CheckCircle}
          trend="up"
          trendVal="+0.3%"
          sparkValues={sparkFor(2)}
          sparkColor="bg-emerald-400"
          delay={0.06}
        />
        <StatCard
          label="Active Alerts"
          value={activeAlerts.length}
          icon={AlertTriangle}
          trend="down"
          trendVal="-1 resolved"
          sparkValues={sparkFor(3)}
          sparkColor="bg-destructive"
          delay={0.12}
        />
        <StatCard
          label="Avg Signal Level"
          value={avgSignal.toFixed(1)}
          unit="dBm"
          icon={Activity}
          trend={avgSignal >= -27 ? "up" : "down"}
          trendVal={avgSignal >= -27 ? "PASS" : "WARN"}
          sparkValues={sparkFor(4)}
          sparkColor="bg-accent"
          delay={0.18}
        />
      </div>

      {/* Status overview row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="flex-shrink-0"
      >
        <GlassCard elevated className="p-4">
          <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
            Device Health Overview
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="text-sm font-medium text-foreground">
                {online} Online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                {warn} Warning
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle size={14} className="text-destructive" />
              <span className="text-sm font-medium text-foreground">
                {faulty} Faulty
              </span>
            </div>
            <div className="flex-1 ml-4">
              <div className="h-3 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(online / total) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-emerald-400"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(warn / total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-yellow-400"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(faulty / total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  className="h-full bg-destructive"
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>{Math.round((online / total) * 100)}% healthy</span>
                <span>{total} total</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <SignalDistribution devices={devices} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
        >
          <DeviceBreakdown devices={devices} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
        >
          <AlertTimeline alerts={alerts} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <UptimeRanking devices={devices} />
        </motion.div>
      </div>
    </div>
  );
}
