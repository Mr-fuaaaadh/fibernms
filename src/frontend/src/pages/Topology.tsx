import { TopologyGraph } from "@/components/topology/TopologyGraph";
import { TopologyNodePanel } from "@/components/topology/TopologyNodePanel";
import { useNetworkStore } from "@/store/networkStore";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Download,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  Radio,
  RefreshCw,
  Router,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface LayerConfig {
  type: "L1" | "L2" | "L3";
  label: string;
  description: string;
  color: string;
  glowColor: string;
  textClass: string;
  borderClass: string;
  bgClass: string;
}

const LAYER_CONFIGS: LayerConfig[] = [
  {
    type: "L1",
    label: "L1 Backbone",
    description: "Physical fiber routes",
    color: "#06b6d4",
    glowColor: "rgba(6,182,212,0.4)",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/40",
    bgClass: "bg-cyan-500/10",
  },
  {
    type: "L2",
    label: "L2 Distribution",
    description: "VLAN switching paths",
    color: "#f97316",
    glowColor: "rgba(249,115,22,0.4)",
    textClass: "text-orange-400",
    borderClass: "border-orange-500/40",
    bgClass: "bg-orange-500/10",
  },
  {
    type: "L3",
    label: "L3 IP Access",
    description: "IP topology overlay",
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.4)",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/40",
    bgClass: "bg-purple-500/10",
  },
];

const REGIONS = [
  "All",
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "South America",
];

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  delay?: number;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accentColor,
  glowColor,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex-1 min-w-[110px] flex flex-col gap-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
      style={{ borderLeftColor: accentColor, borderLeftWidth: 3 }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon className="w-3 h-3" style={{ color: accentColor }} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
          {label}
        </span>
      </div>
      <span
        className="text-2xl font-display font-bold leading-none"
        style={{ color: accentColor, textShadow: `0 0 20px ${glowColor}` }}
      >
        {value}
      </span>
    </motion.div>
  );
}

// ── Layer Toggle Switch ────────────────────────────────────────────────────────
function LayerToggle({ cfg }: { cfg: LayerConfig }) {
  const networkLayers = useNetworkStore((s) => s.networkLayers);
  const toggleNetworkLayer = useNetworkStore((s) => s.toggleNetworkLayer);
  const layer = networkLayers.find((l) => l.type === cfg.type);
  const isOn = layer?.visible ?? false;

  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
        isOn
          ? `${cfg.bgClass} ${cfg.borderClass}`
          : "bg-white/5 border-white/10"
      }`}
      onClick={() => toggleNetworkLayer(cfg.type)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-ocid={`layer-toggle-${cfg.type.toLowerCase()}`}
      role="switch"
      aria-checked={isOn}
    >
      {/* Color swatch */}
      <div
        className="w-3 h-3 rounded-sm flex-shrink-0"
        style={{
          background: isOn ? cfg.color : "rgba(255,255,255,0.15)",
          boxShadow: isOn ? `0 0 8px ${cfg.glowColor}` : "none",
          transition: "all 0.3s",
        }}
      />
      {/* Labels */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-semibold font-mono transition-colors ${isOn ? cfg.textClass : "text-white/40"}`}
        >
          {cfg.label}
        </p>
        <p className="text-[10px] text-white/30 truncate">{cfg.description}</p>
      </div>
      {/* Toggle switch */}
      <div
        className={`relative w-9 h-5 rounded-full transition-all duration-300 flex-shrink-0 ${isOn ? "" : "bg-white/10"}`}
        style={{
          background: isOn ? `${cfg.color}33` : undefined,
          border: `1px solid ${isOn ? cfg.color : "rgba(255,255,255,0.15)"}`,
        }}
      >
        <motion.div
          className="absolute top-0.5 w-4 h-4 rounded-full"
          animate={{ left: isOn ? "calc(100% - 18px)" : "2px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            background: isOn ? cfg.color : "rgba(255,255,255,0.3)",
            boxShadow: isOn ? `0 0 8px ${cfg.glowColor}` : "none",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Health Badge ───────────────────────────────────────────────────────────────
function NetworkHealthBadge({ faultyCount }: { faultyCount: number }) {
  const healthy = faultyCount === 0;
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
      style={{
        background: healthy ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
        borderColor: healthy ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
      }}
    >
      <span
        className="w-2 h-2 rounded-full animate-pulse"
        style={{
          background: healthy ? "#22c55e" : "#ef4444",
          boxShadow: `0 0 6px ${healthy ? "#22c55e" : "#ef4444"}`,
        }}
      />
      <span
        className="text-xs font-mono font-semibold"
        style={{ color: healthy ? "#22c55e" : "#ef4444" }}
      >
        {healthy
          ? "Network Healthy"
          : `${faultyCount} Fault${faultyCount > 1 ? "s" : ""} Active`}
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Topology() {
  const devices = useNetworkStore((s) => s.devices);
  const alerts = useNetworkStore((s) => s.alerts);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);

  const selectedDevice = selectedDeviceId
    ? (devices.find((d) => d.id === selectedDeviceId) ?? null)
    : null;

  const activeCount = devices.filter((d) => d.status === "active").length;
  const faultyCount = devices.filter((d) => d.status === "faulty").length;
  const warnCount = devices.filter((d) => d.status === "warning").length;
  const oltCount = devices.filter((d) => d.type === "OLT").length;
  const splCount = devices.filter((d) => d.type === "Splitter").length;
  const ontCount = devices.filter((d) => d.type === "ONT").length;
  const unresolvedAlerts = alerts.filter((a) => !a.resolved).length;

  const [syncSeconds, setSyncSeconds] = useState(0);
  const [activeRegion, setActiveRegion] = useState("All");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSyncSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const syncLabel =
    syncSeconds < 60
      ? `${syncSeconds}s ago`
      : `${Math.floor(syncSeconds / 60)}m ago`;

  const statCards = [
    {
      label: "Total Nodes",
      value: devices.length,
      icon: Network,
      accentColor: "#06b6d4",
      glowColor: "rgba(6,182,212,0.5)",
    },
    {
      label: "Active Nodes",
      value: activeCount,
      icon: CheckCircle2,
      accentColor: "#22c55e",
      glowColor: "rgba(34,197,94,0.5)",
    },
    {
      label: "Fault Nodes",
      value: faultyCount,
      icon: AlertTriangle,
      accentColor: "#ef4444",
      glowColor: "rgba(239,68,68,0.5)",
    },
    {
      label: "OLTs Online",
      value: oltCount,
      icon: Router,
      accentColor: "#06b6d4",
      glowColor: "rgba(6,182,212,0.5)",
    },
    {
      label: "Splitters",
      value: splCount,
      icon: GitBranch,
      accentColor: "#f97316",
      glowColor: "rgba(249,115,22,0.5)",
    },
    {
      label: "ONTs",
      value: ontCount,
      icon: Wifi,
      accentColor: "#a855f7",
      glowColor: "rgba(168,85,247,0.5)",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full gap-0 overflow-hidden"
      data-ocid="topology-page"
      style={{
        background: "linear-gradient(180deg, #020817 0%, #0a1628 100%)",
      }}
    >
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-4 sm:px-6 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(6,182,212,0.15)",
                border: "1px solid rgba(6,182,212,0.3)",
                boxShadow: "0 0 20px rgba(6,182,212,0.2)",
              }}
            >
              <Layers3 className="w-5 h-5" style={{ color: "#06b6d4" }} />
            </div>
            <div>
              <h1
                className="text-2xl font-display font-bold tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #06b6d4 60%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Network Topology
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-xs font-mono text-white/40">
                  OLT → Splitter → ONT · {devices.length.toLocaleString()} nodes
                  indexed
                </p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Last sync: {syncLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <NetworkHealthBadge faultyCount={faultyCount} />
            {warnCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10">
                <AlertTriangle className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-mono text-yellow-400">
                  {warnCount} Warnings
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Stat Bar ──────────────────────────────────────────────────────── */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {statCards.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.06} />
          ))}
        </div>
      </div>

      {/* ── Layer Controls ─────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2 flex-shrink-0">
            <Activity className="w-3.5 h-3.5 text-white/30" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
              Network Layers
            </span>
          </div>
          <div className="flex gap-2 flex-wrap flex-1">
            {LAYER_CONFIGS.map((cfg) => (
              <LayerToggle key={cfg.type} cfg={cfg} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Canvas + Panel ────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 gap-0">
        {/* Graph canvas */}
        <div className="flex-1 min-w-0 relative overflow-hidden">
          {/* Canvas header bar */}
          <div
            className="flex items-center justify-between px-5 py-2.5 border-b"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
              />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                Live Topology View · Real-time
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-mono text-cyan-400">
                LIVE SYNC
              </span>
            </div>
          </div>

          {/* Graph fills remaining space */}
          <div className="absolute inset-0 top-[41px]">
            <TopologyGraph />
          </div>
        </div>

        {/* Detail panel */}
        <div
          className="flex-shrink-0 border-l"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <TopologyNodePanel device={selectedDevice} />
        </div>
      </div>

      {/* ── Bottom Summary Strip ───────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 flex items-center justify-between gap-4 px-6 py-2.5 border-t flex-wrap"
        style={{
          background: "rgba(6,182,212,0.03)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
        data-ocid="topology-bottom-strip"
      >
        {/* Region filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Globe2 className="w-3.5 h-3.5 text-white/30 mr-1" />
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              data-ocid={`region-filter-${region.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all duration-200"
              style={{
                background:
                  activeRegion === region
                    ? "rgba(6,182,212,0.15)"
                    : "transparent",
                color:
                  activeRegion === region
                    ? "#06b6d4"
                    : "rgba(255,255,255,0.35)",
                border: `1px solid ${activeRegion === region ? "rgba(6,182,212,0.3)" : "transparent"}`,
              }}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Alerts + Export */}
        <div className="flex items-center gap-3">
          {unresolvedAlerts > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span className="text-[10px] font-mono text-red-400">
                {unresolvedAlerts} Active Alerts
              </span>
            </div>
          )}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all duration-200 border"
            style={{
              color: "rgba(255,255,255,0.5)",
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
            }}
            data-ocid="topology-export-svg"
            aria-label="Export topology as SVG"
          >
            <Download className="w-3 h-3" />
            Export SVG
          </button>
        </div>
      </div>
    </motion.div>
  );
}
