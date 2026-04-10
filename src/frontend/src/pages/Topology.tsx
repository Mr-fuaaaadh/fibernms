import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { TopologyGraph } from "@/components/topology/TopologyGraph";
import { TopologyNodePanel } from "@/components/topology/TopologyNodePanel";
import { useNetworkStore } from "@/store/networkStore";
import { AlertTriangle, CheckCircle2, GitBranch, Radio } from "lucide-react";
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
          </div>
        </GlassCard>

        {/* Detail panel */}
        <TopologyNodePanel device={selectedDevice} />
      </div>
    </motion.div>
  );
}
