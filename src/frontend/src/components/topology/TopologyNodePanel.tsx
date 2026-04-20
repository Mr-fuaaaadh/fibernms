import { DeviceIcon } from "@/components/DeviceIcon";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus } from "@/types/network";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Cpu,
  GitFork,
  Link2,
  MapPin,
  RefreshCw,
  Settings2,
  Signal,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

interface TopologyNodePanelProps {
  device: Device | null;
}

// ─── Color map ────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<
  DeviceStatus,
  { text: string; bg: string; border: string; glow: string; dot: string }
> = {
  active: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "rgba(34,197,94,0.4)",
    dot: "#22c55e",
  },
  warning: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    glow: "rgba(234,179,8,0.4)",
    dot: "#eab308",
  },
  faulty: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "rgba(239,68,68,0.4)",
    dot: "#ef4444",
  },
};

// ─── Simulated 24h sparkline data ────────────────────────────────────────────
function useSpark(base: number, variance: number, len = 24): number[] {
  return useMemo(() => {
    let v = base;
    return Array.from({ length: len }, () => {
      v = Math.max(
        base - variance,
        Math.min(base + variance, v + (Math.random() - 0.5) * variance * 0.8),
      );
      return Math.round(v * 10) / 10;
    });
  }, [base, variance, len]);
}

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({
  values,
  color,
  label,
}: { values: number[]; color: string; label: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 200;
  const H = 48;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          {label}
        </span>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {values[values.length - 1]}
        </span>
      </div>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        aria-label={`${label} trend chart`}
      >
        <title>{label} trend</title>
        <defs>
          <linearGradient
            id={`spark-grad-${label.replace(/\s/g, "")}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* Fill area */}
        <polyline
          points={`0,${H} ${pts} ${W},${H}`}
          fill={`url(#spark-grad-${label.replace(/\s/g, "")})`}
          stroke="none"
        />
        {/* Line */}
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          style={{ filter: `drop-shadow(0 0 3px ${color})` }}
        />
        {/* Last point dot */}
        <circle
          cx={((values.length - 1) / (values.length - 1)) * W}
          cy={H - ((values[values.length - 1] - min) / range) * (H - 8) - 4}
          r={3}
          fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
    </div>
  );
}

// ─── Signal bars ──────────────────────────────────────────────────────────────
function SignalBars({ dbm }: { dbm: number }) {
  // dBm range typically -100 (bad) to -40 (excellent)
  const normalized = Math.max(0, Math.min(1, (dbm + 100) / 60));
  const bars = Math.round(normalized * 5);
  const color = bars >= 4 ? "#22c55e" : bars >= 2 ? "#eab308" : "#ef4444";
  return (
    <div
      className="flex items-end gap-0.5"
      aria-label={`Signal strength: ${bars} of 5 bars`}
    >
      {(["b1", "b2", "b3", "b4", "b5"] as const).map((id, i) => (
        <div
          key={id}
          className="rounded-sm"
          style={{
            width: 4,
            height: 4 + i * 3,
            background: i < bars ? color : "rgba(255,255,255,0.15)",
            boxShadow: i < bars ? `0 0 4px ${color}` : "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Circular uptime ring ─────────────────────────────────────────────────────
function UptimeRing({ uptime }: { uptime: number }) {
  const R = 22;
  const circ = 2 * Math.PI * R;
  const color = uptime >= 99 ? "#22c55e" : uptime >= 95 ? "#eab308" : "#ef4444";
  const dash = (uptime / 100) * circ;
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg
        width={56}
        height={56}
        viewBox="0 0 56 56"
        aria-label={`Uptime ${uptime.toFixed(1)}%`}
      >
        <title>Uptime ring</title>
        <circle
          cx={28}
          cy={28}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={4}
        />
        <circle
          cx={28}
          cy={28}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <span
        className="absolute text-[11px] font-mono font-bold"
        style={{ color }}
      >
        {uptime.toFixed(0)}%
      </span>
    </div>
  );
}

// ─── Tab ──────────────────────────────────────────────────────────────────────
type Tab = "overview" | "metrics" | "connections";

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: Cpu },
  { key: "metrics", label: "Metrics", icon: BarChart3 },
  { key: "connections", label: "Connections", icon: GitFork },
];

// ─── Panel content (device selected) ─────────────────────────────────────────
function DevicePanel({ device }: { device: Device }) {
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const devices = useNetworkStore((s) => s.devices);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const connectedDevices = device.connectedTo
    .map((cid) => devices.find((d) => d.id === cid))
    .filter(Boolean) as Device[];

  const colors = STATUS_COLORS[device.status];
  const signalBase = device.signalStrength ?? -60;
  const uptimeBase = device.uptime ?? 98.5;

  const signalSpark = useSpark(signalBase, 8);
  const latencySpark = useSpark(12, 6);
  const lossSpark = useSpark(0.3, 0.3);

  return (
    <div className="flex flex-col h-full" style={{ width: 340 }}>
      {/* ── Panel header ───────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-4 pt-4 pb-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${colors.glow.replace("0.4", "0.12")}`,
                border: `1px solid ${colors.dot}30`,
                boxShadow: `0 0 20px ${colors.glow}`,
              }}
            >
              <DeviceIcon type={device.type} status={device.status} size="lg" />
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
                style={{ color: colors.dot }}
              >
                {device.type}
              </p>
              <h3
                className="font-display text-sm font-bold text-white truncate"
                title={device.name}
              >
                {device.name}
              </h3>
              {device.location && (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-white/30 flex-shrink-0" />
                  <span className="text-[10px] font-mono text-white/40 truncate">
                    {device.location}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedDevice(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-label="Close panel"
            data-ocid="topology-panel-close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status chip */}
        <div className="flex items-center gap-2 mt-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: colors.bg.replace("bg-", ""),
              border: `1px solid ${colors.dot}30`,
            }}
          >
            {device.status === "active" && (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            )}
            {device.status === "faulty" && (
              <XCircle className="w-3 h-3 text-red-400" />
            )}
            {device.status === "warning" && (
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
            )}
            <span
              className="text-[10px] font-mono font-semibold capitalize"
              style={{ color: colors.dot }}
            >
              {device.status}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse ml-0.5"
              style={{
                background: colors.dot,
                boxShadow: `0 0 6px ${colors.dot}`,
              }}
            />
          </div>
          {device.region && (
            <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded-full bg-white/5">
              {device.region}
            </span>
          )}
        </div>

        {/* View in map ghost link */}
        <button
          type="button"
          className="flex items-center gap-1 mt-2 text-[10px] font-mono text-white/25 hover:text-cyan-400 transition-colors"
          data-ocid="topology-view-in-map"
        >
          <Link2 className="w-2.5 h-2.5" />
          View in Map
        </button>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 flex gap-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              data-ocid={`topology-tab-${tab.key}`}
              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-[10px] font-mono transition-all duration-200"
              style={{
                color: isActive ? "#06b6d4" : "rgba(255,255,255,0.3)",
                borderBottom: isActive
                  ? "2px solid #06b6d4"
                  : "2px solid transparent",
                background: isActive ? "rgba(6,182,212,0.06)" : "transparent",
              }}
            >
              <Icon className="w-3 h-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ────────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarColor: "rgba(6,182,212,0.2) transparent" }}
      >
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4 flex flex-col gap-3"
            >
              {/* Signal + Uptime side by side */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="rounded-xl p-3 flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      Signal
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-display font-bold text-cyan-400">
                      {device.signalStrength != null
                        ? `${device.signalStrength}`
                        : "N/A"}
                    </span>
                    <span className="text-[10px] font-mono text-white/30 mb-0.5">
                      dBm
                    </span>
                  </div>
                  {device.signalStrength != null && (
                    <SignalBars dbm={device.signalStrength} />
                  )}
                </div>

                <div
                  className="rounded-xl p-3 flex flex-col items-center justify-center gap-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest self-start">
                    Uptime
                  </span>
                  <UptimeRing uptime={device.uptime ?? 99.0} />
                </div>
              </div>

              {/* Ports */}
              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      Port Usage
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {Math.ceil(device.ports * 0.72)}/{device.ports}
                  </span>
                </div>
                <div className="flex gap-0.5 h-2">
                  {Array.from(
                    { length: device.ports > 24 ? 24 : device.ports },
                    (_, i) => {
                      const usedCount = Math.ceil(device.ports * 0.72);
                      const isUsed =
                        i <
                        Math.round(
                          usedCount *
                            (device.ports > 24 ? 24 / device.ports : 1),
                        );
                      return (
                        <div
                          key={`port-${device.id}-${i}`}
                          className="flex-1 rounded-sm"
                          style={{
                            background: isUsed
                              ? "#a855f7"
                              : "rgba(255,255,255,0.1)",
                            boxShadow: isUsed
                              ? "0 0 3px rgba(168,85,247,0.6)"
                              : "none",
                          }}
                        />
                      );
                    },
                  )}
                </div>
              </div>

              {/* Key info */}
              <div
                className="rounded-xl divide-y"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {[
                  {
                    icon: MapPin,
                    label: "Location",
                    value: device.location ?? "Unknown",
                  },
                  {
                    icon: Activity,
                    label: "Ports Total",
                    value: String(device.ports),
                  },
                  {
                    icon: Signal,
                    label: "Device ID",
                    value: device.id.slice(0, 12),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-white/35">
                      <Icon className="w-3 h-3" />
                      <span className="text-[10px] font-mono uppercase tracking-wide">
                        {label}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-white/70 max-w-[120px] truncate text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "metrics" && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4 flex flex-col gap-3"
            >
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Last 24 hours
              </p>
              <Sparkline
                values={signalSpark}
                color="#06b6d4"
                label={`Signal (dBm) · now: ${signalBase}`}
              />
              <Sparkline
                values={latencySpark}
                color="#f97316"
                label="Latency (ms)"
              />
              <Sparkline
                values={lossSpark.map((v) => Math.max(0, v))}
                color="#ef4444"
                label="Packet Loss (%)"
              />
              <div
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(6,182,212,0.06)",
                  border: "1px solid rgba(6,182,212,0.15)",
                }}
              >
                <p className="text-[10px] font-mono text-cyan-400/60 mb-1">
                  Uptime (Last 30 days)
                </p>
                <p className="text-2xl font-display font-bold text-cyan-400">
                  {uptimeBase.toFixed(2)}%
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "connections" && (
            <motion.div
              key="connections"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4 flex flex-col gap-2"
            >
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
                {connectedDevices.length} Connected Device
                {connectedDevices.length !== 1 ? "s" : ""}
              </p>
              {connectedDevices.length === 0 ? (
                <div className="text-center py-8 text-white/20">
                  <GitFork className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-mono">No connections</p>
                </div>
              ) : (
                connectedDevices.map((cd) => {
                  const cdColors = STATUS_COLORS[cd.status];
                  return (
                    <button
                      key={cd.id}
                      type="button"
                      onClick={() =>
                        useNetworkStore.getState().setSelectedDevice(cd.id)
                      }
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      data-ocid={`topology-conn-${cd.id}`}
                    >
                      <DeviceIcon type={cd.type} status={cd.status} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-white/70 group-hover:text-white truncate transition-colors">
                          {cd.name}
                        </p>
                        <p className="text-[10px] font-mono text-white/30">
                          {cd.type}
                        </p>
                      </div>
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: cdColors.dot,
                          boxShadow: `0 0 6px ${cdColors.dot}`,
                        }}
                      />
                    </button>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Actions footer ─────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 p-3 flex flex-col gap-1.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-[9px] font-mono text-white/25 uppercase tracking-widest px-1 mb-0.5">
          Actions
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Reboot", icon: RefreshCw, color: "text-cyan-400" },
            { label: "Diagnose", icon: Settings2, color: "text-orange-400" },
            { label: "Alert Rule", icon: Zap, color: "text-purple-400" },
          ].map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all duration-200 text-center ${color}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              data-ocid={`topology-action-${label.toLowerCase().replace(/\s/g, "-")}`}
              aria-label={label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[9px] font-mono opacity-70">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 text-center h-full"
      style={{ width: 340, padding: "32px 24px" }}
    >
      {/* Animated network SVG placeholder */}
      <div className="relative w-24 h-24">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(6,182,212,0.06)",
            border: "1px solid rgba(6,182,212,0.15)",
          }}
        >
          <GitFork
            className="w-10 h-10"
            style={{ color: "rgba(6,182,212,0.4)" }}
          />
        </div>
        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 8px #06b6d4",
            }}
            animate={{
              x: Math.cos((i * 2 * Math.PI) / 3) * 44 - 4,
              y: Math.sin((i * 2 * Math.PI) / 3) * 44 - 4,
              rotate: 360,
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
      <div>
        <h3 className="text-sm font-display font-semibold text-white/60 mb-1">
          No Node Selected
        </h3>
        <p className="text-xs font-mono text-white/30 leading-relaxed max-w-[200px] mx-auto">
          Select a node on the topology map to view device details and metrics
        </p>
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl w-full justify-center"
        style={{
          background: "rgba(6,182,212,0.06)",
          border: "1px solid rgba(6,182,212,0.15)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
          style={{ boxShadow: "0 0 6px #06b6d4" }}
        />
        <span className="text-[10px] font-mono text-cyan-400/70">
          Topology ready · click any node
        </span>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function TopologyNodePanel({ device }: TopologyNodePanelProps) {
  return (
    <div
      className="h-full overflow-hidden"
      style={{
        background: "rgba(2,8,23,0.6)",
        backdropFilter: "blur(12px)",
      }}
    >
      <AnimatePresence mode="wait">
        {device ? (
          <motion.div
            key={device.id}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="h-full overflow-hidden"
          >
            <DevicePanel device={device} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full flex items-start"
          >
            <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
