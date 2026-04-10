import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { TopologyGraph } from "@/components/topology/TopologyGraph";
import { TopologyNodePanel } from "@/components/topology/TopologyNodePanel";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import {
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  Layers,
  Radio,
} from "lucide-react";
import { motion } from "motion/react";

function StatPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/60 border border-border/40">
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-xs text-muted-foreground font-mono">{label}</span>
      <span className={`text-xs font-bold font-mono ${color}`}>{value}</span>
    </div>
  );
}

// ── Layer Toggle Bar ──────────────────────────────────────────────────────────

interface LayerConfig {
  type: "L1" | "L2" | "L3";
  label: string;
  sublabel: string;
  color: string;
  activeClass: string;
  borderActive: string;
}

const LAYER_CONFIGS: LayerConfig[] = [
  {
    type: "L1",
    label: "L1 Fiber",
    sublabel: "Physical Routes",
    color: "oklch(0.72 0.22 210)",
    activeClass: "bg-primary/15 text-primary border-primary/40",
    borderActive: "border-primary/40",
  },
  {
    type: "L2",
    label: "L2 VLAN",
    sublabel: "Switching Paths",
    color: "oklch(0.68 0.22 42)",
    activeClass: "bg-orange-500/15 text-orange-400 border-orange-500/40",
    borderActive: "border-orange-500/40",
  },
  {
    type: "L3",
    label: "L3 IP",
    sublabel: "IP Topology",
    color: "oklch(0.65 0.22 290)",
    activeClass: "bg-purple-500/15 text-purple-400 border-purple-500/40",
    borderActive: "border-purple-500/40",
  },
];

function LayerToggleBar() {
  const networkLayers = useNetworkStore((s) => s.networkLayers);
  const toggleNetworkLayer = useNetworkStore((s) => s.toggleNetworkLayer);

  return (
    <div className="flex items-center gap-2" data-ocid="layer-toggle-toolbar">
      <div className="flex items-center gap-1.5 mr-1">
        <Layers className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">
          Layers
        </span>
      </div>
      {LAYER_CONFIGS.map((cfg) => {
        const layer = networkLayers.find((l) => l.type === cfg.type);
        const isVisible = layer?.visible ?? false;
        return (
          <button
            key={cfg.type}
            type="button"
            onClick={() => toggleNetworkLayer(cfg.type)}
            data-ocid={`layer-toggle-${cfg.type.toLowerCase()}`}
            aria-pressed={isVisible}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono transition-smooth select-none",
              isVisible
                ? cfg.activeClass
                : "text-muted-foreground/50 border-border/30 hover:border-border/60 hover:text-muted-foreground",
            )}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                background: isVisible ? cfg.color : "currentColor",
                opacity: isVisible ? 1 : 0.35,
                boxShadow: isVisible ? `0 0 6px ${cfg.color}` : "none",
              }}
            />
            {cfg.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Layer Legend ──────────────────────────────────────────────────────────────

function LayerLegend() {
  const networkLayers = useNetworkStore((s) => s.networkLayers);

  const visibleLayers = LAYER_CONFIGS.filter(
    (cfg) => networkLayers.find((l) => l.type === cfg.type)?.visible,
  );

  if (visibleLayers.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 glass-card rounded-xl px-3 py-2.5">
      <p className="text-[9px] font-display tracking-widest text-muted-foreground/60 uppercase mb-1">
        Active Layers
      </p>
      {visibleLayers.map((cfg) => (
        <div key={cfg.type} className="flex items-center gap-2">
          {cfg.type === "L1" ? (
            <span
              className="w-5 h-0.5 rounded"
              style={{
                background: cfg.color,
                boxShadow: `0 0 4px ${cfg.color}`,
              }}
            />
          ) : cfg.type === "L2" ? (
            <svg width={20} height={4} aria-hidden="true">
              <line
                x1={0}
                y1={2}
                x2={20}
                y2={2}
                stroke={cfg.color}
                strokeWidth={1.5}
                strokeDasharray="4 2"
              />
            </svg>
          ) : (
            <svg width={20} height={4} aria-hidden="true">
              <line
                x1={0}
                y1={2}
                x2={20}
                y2={2}
                stroke={cfg.color}
                strokeWidth={1.5}
                strokeDasharray="2 2"
              />
            </svg>
          )}
          <span className="text-[10px] font-mono text-muted-foreground">
            {cfg.sublabel}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Topology() {
  const devices = useNetworkStore((s) => s.devices);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full gap-4 p-4"
      data-ocid="topology-page"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground tracking-tight">
              Network Topology
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              OLT → Splitter → ONT hierarchy — {devices.length} nodes
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 flex-wrap">
          <StatPill
            icon={CheckCircle2}
            label="Active"
            value={activeCount}
            color="text-emerald-400"
          />
          <StatPill
            icon={AlertTriangle}
            label="Fault"
            value={faultyCount}
            color="text-red-400"
          />
          <StatPill
            icon={Radio}
            label="Warn"
            value={warnCount}
            color="text-amber-400"
          />
          <span className="w-px h-5 bg-border/50 mx-1" />
          <StatPill
            icon={GitBranch}
            label="OLT"
            value={oltCount}
            color="text-primary"
          />
          <StatPill
            icon={GitBranch}
            label="SPL"
            value={splCount}
            color="text-chart-2"
          />
          <StatPill
            icon={Radio}
            label="ONT"
            value={ontCount}
            color="text-chart-3"
          />
        </div>
      </div>

      {/* Layer toggle toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <LayerToggleBar />
      </div>

      {/* Graph + Panel */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Main graph canvas */}
        <GlassCard
          elevated
          className="flex-1 min-w-0 overflow-hidden relative p-0"
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Live Topology View
              </span>
            </div>
            <StatusBadge status="active" label="SYNC" />
          </div>

          {/* Graph */}
          <div className="relative" style={{ height: "calc(100% - 44px)" }}>
            <TopologyGraph />
            <LayerLegend />
          </div>
        </GlassCard>

        {/* Detail panel */}
        <TopologyNodePanel device={selectedDevice} />
      </div>
    </motion.div>
  );
}
