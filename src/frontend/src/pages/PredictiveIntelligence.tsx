import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import type { PredictiveAlert } from "@/types/network";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertOctagon,
  Brain,
  ChevronRight,
  Cpu,
  FlaskConical,
  Radio,
  Scissors,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Helpers ────────────────────────────────────────────────────────────────────

function riskClass(score: number) {
  if (score >= 80) return "text-red-400";
  if (score >= 60) return "text-orange-400";
  if (score >= 40) return "text-amber-400";
  return "text-emerald-400";
}

function riskBarClass(score: number) {
  if (score >= 80) return "bg-red-500";
  if (score >= 60) return "bg-orange-500";
  if (score >= 40) return "bg-amber-400";
  return "bg-emerald-400";
}

function riskLabel(score: number) {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

function riskBadgeClass(score: number) {
  if (score >= 80) return "bg-red-500/15 border-red-500/30 text-red-400";
  if (score >= 60)
    return "bg-orange-500/15 border-orange-500/30 text-orange-400";
  if (score >= 40) return "bg-amber-400/15 border-amber-400/30 text-amber-400";
  return "bg-emerald-400/15 border-emerald-400/30 text-emerald-400";
}

const FAILURE_ICONS: Record<PredictiveAlert["failureType"], React.ElementType> =
  {
    "fiber-cut": Scissors,
    "signal-degradation": Radio,
    "device-failure": Cpu,
  };

const FAILURE_COLORS: Record<PredictiveAlert["failureType"], string> = {
  "fiber-cut": "text-red-400",
  "signal-degradation": "text-amber-400",
  "device-failure": "text-orange-400",
};

// ── Risk Distribution Chart ───────────────────────────────────────────────────

const BUCKETS = ["0–20", "20–40", "40–60", "60–80", "80–100"] as const;
const BUCKET_COLORS = [
  "oklch(0.62 0.22 142)",
  "oklch(0.72 0.22 90)",
  "oklch(0.70 0.25 55)",
  "oklch(0.65 0.25 40)",
  "oklch(0.62 0.28 22)",
];

function RiskDistributionChart({ alerts }: { alerts: PredictiveAlert[] }) {
  const data = BUCKETS.map((label, i) => {
    const min = i * 20;
    const max = min + 20;
    return {
      label,
      count: alerts.filter((a) => a.riskScore >= min && a.riskScore < max)
        .length,
    };
  });

  return (
    <GlassCard elevated className="p-5 h-full">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <Activity size={11} className="text-primary" />
        Risk Score Distribution
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.26 0.01 265 / 0.5)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "oklch(0.52 0.008 260)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.52 0.008 260)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.18 0.008 265 / 0.95)",
                  border: "1px solid oklch(0.26 0.01 265)",
                  borderRadius: 8,
                  fontSize: 11,
                  color: "oklch(0.92 0.005 260)",
                }}
                cursor={{ fill: "oklch(0.92 0.005 260 / 0.04)" }}
              />
              <Bar dataKey="count" name="Devices" radius={[4, 4, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell
                    key={`cell-${entry.label}-${i}`}
                    fill={BUCKET_COLORS[i]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}

// ── Anomaly Trend Chart ───────────────────────────────────────────────────────

function deterministicAnomalyTrend() {
  const base = new Date();
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() - (13 - i));
    const seed = (i * 13 + 7) % 100;
    return {
      day: `${d.getMonth() + 1}/${d.getDate()}`,
      anomalies: 4 + ((seed * 3) % 18),
    };
  });
}

const ANOMALY_DATA = deterministicAnomalyTrend();

function AnomalyTrendChart() {
  return (
    <GlassCard elevated className="p-5 h-full">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <TrendingUp size={11} className="text-accent" />
        Anomaly Detection (14 days)
      </p>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart
              data={ANOMALY_DATA}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="anomalyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.68 0.25 55)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.68 0.25 55)"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.26 0.01 265 / 0.5)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "oklch(0.52 0.008 260)" }}
                tickLine={false}
                axisLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.52 0.008 260)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.18 0.008 265 / 0.95)",
                  border: "1px solid oklch(0.26 0.01 265)",
                  borderRadius: 8,
                  fontSize: 11,
                  color: "oklch(0.92 0.005 260)",
                }}
              />
              <Area
                type="monotone"
                dataKey="anomalies"
                name="Anomalies"
                stroke="oklch(0.68 0.25 55)"
                strokeWidth={2}
                fill="url(#anomalyGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
}

// ── Signal Sparkline ──────────────────────────────────────────────────────────

function deterministicSignalTrend(seed: number) {
  return Array.from({ length: 7 }, (_, i) => {
    const v = -22 + Math.sin((i + seed) * 1.5) * 6 + ((seed * i) % 5) - 2;
    const anomaly = (seed + i) % 7 === 3;
    return { day: `D${i + 1}`, signal: Math.round(v * 10) / 10, anomaly };
  });
}

function SignalSparkline({
  alert,
  index,
}: {
  alert: PredictiveAlert;
  index: number;
}) {
  const data = deterministicSignalTrend(index);
  const anomalyPoints = data.filter((d) => d.anomaly);

  return (
    <GlassCard className="p-3">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-foreground truncate">
            {alert.deviceName}
          </p>
          <p
            className={cn("text-[10px] font-mono", riskClass(alert.riskScore))}
          >
            Risk: {alert.riskScore}
          </p>
        </div>
        <span
          className={cn(
            "text-[9px] font-mono px-1.5 py-0.5 rounded border",
            riskBadgeClass(alert.riskScore),
          )}
        >
          {riskLabel(alert.riskScore)}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={48}>
        <LineChart
          data={data}
          margin={{ top: 2, right: 2, left: -30, bottom: 0 }}
        >
          <Line
            type="monotone"
            dataKey="signal"
            stroke="oklch(0.72 0.22 210)"
            strokeWidth={1.5}
            dot={false}
          />
          {anomalyPoints.map((pt) => (
            <ReferenceDot
              key={pt.day}
              x={pt.day}
              y={pt.signal}
              r={3}
              fill="oklch(0.62 0.28 22)"
              stroke="none"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

// ── Region Heatmap ────────────────────────────────────────────────────────────

const REGIONS = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "South America",
] as const;

function RegionHeatmap({ alerts }: { alerts: PredictiveAlert[] }) {
  // Map device regions via name prefix heuristic (uses device IDs: r0=NA, r1=EU, etc.)
  const REGION_PREFIX: Record<string, string> = {
    r0: "North America",
    r1: "Europe",
    r2: "Asia-Pacific",
    r3: "Middle East",
    r4: "South America",
  };

  const regionStats = REGIONS.map((name) => {
    const regionAlerts = alerts.filter((a) => {
      const match = a.deviceId.match(/r(\d)/);
      if (!match) return false;
      return REGION_PREFIX[`r${match[1]}`] === name;
    });
    const avgRisk =
      regionAlerts.length > 0
        ? Math.round(
            regionAlerts.reduce((s, a) => s + a.riskScore, 0) /
              regionAlerts.length,
          )
        : 0;
    const faults = regionAlerts.filter((a) => a.riskScore >= 70).length;
    return { name, avgRisk, faults, count: regionAlerts.length };
  });

  return (
    <GlassCard elevated className="p-5">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <Zap size={11} className="text-primary" />
        Fault Density by Region
      </p>
      <div className="grid grid-cols-5 gap-2">
        {regionStats.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={cn(
              "rounded-xl p-3 border text-center",
              r.avgRisk >= 70
                ? "bg-red-500/10 border-red-500/25"
                : r.avgRisk >= 50
                  ? "bg-orange-500/10 border-orange-500/25"
                  : r.avgRisk >= 30
                    ? "bg-amber-400/10 border-amber-400/25"
                    : "bg-emerald-400/10 border-emerald-400/25",
            )}
            data-ocid="region-heatmap-card"
          >
            <p
              className={cn(
                "text-xl font-display font-bold tabular-nums",
                riskClass(r.avgRisk),
              )}
            >
              {r.avgRisk}
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">avg risk</p>
            <p className="text-[10px] text-foreground font-medium mt-1.5 leading-tight">
              {r.name}
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              {r.faults} at-risk
            </p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

// ── At-Risk Devices Panel ─────────────────────────────────────────────────────

function AtRiskPanel({
  alerts,
  simulationMode,
  onDeviceClick,
}: {
  alerts: PredictiveAlert[];
  simulationMode: boolean;
  onDeviceClick: (deviceId: string) => void;
}) {
  const top20 = useMemo(
    () =>
      [...alerts]
        .filter((a) => a.status === "active")
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 20),
    [alerts],
  );

  return (
    <GlassCard elevated className="p-5 flex flex-col h-full">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5 flex-shrink-0">
        <AlertOctagon size={11} className="text-destructive" />
        At-Risk Devices
        <span className="ml-auto text-[10px] font-mono bg-destructive/10 border border-destructive/25 text-destructive px-2 py-0.5 rounded-md">
          {top20.length} active
        </span>
      </p>
      <div className="overflow-y-auto flex-1 noc-scrollbar space-y-2 max-h-[480px]">
        {top20.map((alert, i) => {
          const FailIcon = FAILURE_ICONS[alert.failureType];
          const isHighlighted = simulationMode && alert.riskScore > 70;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025 }}
              className={cn(
                "p-3 rounded-xl border transition-smooth cursor-pointer group",
                isHighlighted
                  ? "border-orange-500/40 bg-orange-500/8"
                  : "border-border/25 bg-card/40 hover:bg-card/70",
              )}
              onClick={() => onDeviceClick(alert.deviceId)}
              data-ocid="at-risk-device-item"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-smooth">
                    {alert.deviceName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <FailIcon
                      size={10}
                      className={FAILURE_COLORS[alert.failureType]}
                    />
                    <span className="text-[10px] text-muted-foreground capitalize">
                      {alert.failureType.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className={cn(
                      "text-sm font-display font-bold tabular-nums",
                      riskClass(alert.riskScore),
                    )}
                  >
                    {alert.riskScore}
                  </span>
                  <span
                    className={cn(
                      "text-[9px] font-mono px-1.5 py-0.5 rounded border",
                      riskBadgeClass(alert.riskScore),
                    )}
                  >
                    {riskLabel(alert.riskScore)}
                  </span>
                </div>
              </div>
              {/* Risk progress bar */}
              <div className="h-1 rounded-full bg-muted/40 overflow-hidden mb-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${alert.riskScore}%` }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                    delay: i * 0.02,
                  }}
                  className={cn(
                    "h-full rounded-full",
                    riskBarClass(alert.riskScore),
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">
                  ETA: In {alert.predictedETA.toFixed(1)}h
                </span>
                <ChevronRight
                  size={10}
                  className="text-muted-foreground/40 group-hover:text-primary transition-smooth"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}

// ── Signal Trends (top 5) ─────────────────────────────────────────────────────

function SignalTrendsPanel({ alerts }: { alerts: PredictiveAlert[] }) {
  const top5 = useMemo(
    () =>
      [...alerts]
        .filter((a) => a.status === "active")
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 5),
    [alerts],
  );

  return (
    <GlassCard elevated className="p-5">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <Radio size={11} className="text-primary" />
        Signal Trend Analysis — Top 5 At-Risk
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {top5.map((alert, i) => (
          <SignalSparkline key={alert.id} alert={alert} index={i} />
        ))}
      </div>
    </GlassCard>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PredictiveIntelligence() {
  const { predictiveAlerts, simulationMode, toggleSimulationMode } =
    useNetworkStore();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<PredictiveAlert[]>(predictiveAlerts);

  // Auto-refresh every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setAlerts((prev) =>
        prev.map((a) => ({
          ...a,
          riskScore: Math.max(
            5,
            Math.min(99, a.riskScore + Math.round((Math.random() - 0.48) * 5)),
          ),
          predictedETA: Math.max(
            0.5,
            a.predictedETA - 5 / 3600, // 5 seconds in hours
          ),
        })),
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const activeAlerts = alerts.filter((a) => a.status === "active");
  const highRisk = activeAlerts.filter((a) => a.riskScore >= 70).length;
  const mediumRisk = activeAlerts.filter(
    (a) => a.riskScore >= 40 && a.riskScore < 70,
  ).length;
  const avgRisk =
    activeAlerts.length > 0
      ? Math.round(
          activeAlerts.reduce((s, a) => s + a.riskScore, 0) /
            activeAlerts.length,
        )
      : 0;

  function handleDeviceClick(deviceId: string) {
    useNetworkStore.getState().setSelectedDevice(deviceId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    void navigate({ to: "/devices" as any });
  }

  return (
    <div
      className="flex flex-col h-full overflow-y-auto noc-scrollbar"
      data-ocid="predictive-intelligence-page"
    >
      {/* Simulation Banner */}
      <AnimatePresence>
        {simulationMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-orange-500/15 border-b border-orange-500/35 overflow-hidden flex-shrink-0"
          >
            <div className="px-4 py-2 flex items-center gap-2">
              <FlaskConical
                size={13}
                className="text-orange-400 flex-shrink-0"
              />
              <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-widest font-mono">
                ⚠ SIMULATION MODE ACTIVE — Virtual fault injection enabled. Data
                reflects predicted failure scenarios, not live conditions.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="font-display text-base font-semibold text-foreground tracking-wide flex items-center gap-2">
              <Brain size={18} className="text-primary" />
              Predictive Intelligence
            </h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              AI-driven fault prediction · Auto-refreshes every 5s
            </p>
          </div>
          <button
            type="button"
            onClick={toggleSimulationMode}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-smooth",
              simulationMode
                ? "bg-orange-500/20 border-orange-500/40 text-orange-400 noc-glow-active"
                : "bg-card border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60",
            )}
            data-ocid="simulation-toggle"
          >
            <FlaskConical size={13} />
            {simulationMode ? "Exit Simulation" : "Simulation Mode"}
          </button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
          {[
            {
              label: "High Risk Devices",
              value: highRisk,
              icon: AlertOctagon,
              acc: "text-red-400",
              bg: "bg-red-400/15 border border-red-400/25",
              delay: 0,
            },
            {
              label: "Medium Risk Devices",
              value: mediumRisk,
              icon: Activity,
              acc: "text-amber-400",
              bg: "bg-amber-400/15 border border-amber-400/25",
              delay: 0.06,
            },
            {
              label: "Anomalies Detected",
              value: activeAlerts.length,
              icon: Zap,
              acc: "text-primary",
              bg: "bg-primary/15 border border-primary/25",
              delay: 0.12,
            },
            {
              label: "Avg Risk Score",
              value: avgRisk,
              icon: Brain,
              acc: riskClass(avgRisk),
              bg: "bg-card border-border/30",
              delay: 0.18,
            },
          ].map(({ label, value, icon: Icon, acc, bg, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay }}
            >
              <GlassCard elevated className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center",
                      bg,
                    )}
                  >
                    <Icon size={16} className={acc} />
                  </div>
                </div>
                <p
                  className={cn(
                    "text-2xl font-display font-bold tabular-nums",
                    acc,
                  )}
                >
                  {value}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Main Grid: At-Risk Panel + Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* At-Risk Devices (left column) */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 }}
            className="lg:col-span-1"
          >
            <AtRiskPanel
              alerts={alerts}
              simulationMode={simulationMode}
              onDeviceClick={handleDeviceClick}
            />
          </motion.div>

          {/* Charts (right 2 columns) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
            >
              <RiskDistributionChart alerts={activeAlerts} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnomalyTrendChart />
            </motion.div>
          </div>
        </div>

        {/* Signal Trend Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
        >
          <SignalTrendsPanel alerts={alerts} />
        </motion.div>

        {/* Region Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <RegionHeatmap alerts={activeAlerts} />
        </motion.div>
      </div>
    </div>
  );
}
