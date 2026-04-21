import { OLTSectionCard } from "@/components/topology/OLTSectionCard";
import { TopologyGraph } from "@/components/topology/TopologyGraph";
import { TopologyNodePanel } from "@/components/topology/TopologyNodePanel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNetworkStore } from "@/store/networkStore";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Download,
  GitBranch,
  Globe2,
  Layers3,
  LayoutGrid,
  Network,
  Radio,
  RefreshCw,
  Router,
  Share2,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

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

type ViewMode = "sections" | "graph";

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  delay?: number;
  compact?: boolean;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accentColor,
  glowColor,
  delay = 0,
  compact = false,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`relative flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden ${
        compact ? "px-3 py-2" : "px-4 py-3"
      }`}
      style={{ borderLeftColor: accentColor, borderLeftWidth: 3 }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accentColor}, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon
          className={compact ? "w-2.5 h-2.5" : "w-3 h-3"}
          style={{ color: accentColor }}
        />
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 truncate">
          {label}
        </span>
      </div>
      <span
        className={`font-display font-bold leading-none ${compact ? "text-xl" : "text-2xl"}`}
        style={{ color: accentColor, textShadow: `0 0 20px ${glowColor}` }}
      >
        {value}
      </span>
    </motion.div>
  );
}

// ── Layer Toggle Switch ────────────────────────────────────────────────────────
function LayerToggle({
  cfg,
  compact,
}: { cfg: LayerConfig; compact?: boolean }) {
  const networkLayers = useNetworkStore((s) => s.networkLayers);
  const toggleNetworkLayer = useNetworkStore((s) => s.toggleNetworkLayer);
  const layer = networkLayers.find((l) => l.type === cfg.type);
  const isOn = layer?.visible ?? false;

  return (
    <motion.button
      type="button"
      className={`flex items-center gap-2 rounded-xl border transition-all duration-300 cursor-pointer select-none flex-shrink-0 ${
        compact ? "px-2.5 py-1.5" : "px-4 py-3"
      } ${isOn ? `${cfg.bgClass} ${cfg.borderClass}` : "bg-white/5 border-white/10"}`}
      onClick={() => toggleNetworkLayer(cfg.type)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-ocid={`layer-toggle-${cfg.type.toLowerCase()}`}
      role="switch"
      aria-checked={isOn}
    >
      <div
        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
        style={{
          background: isOn ? cfg.color : "rgba(255,255,255,0.15)",
          boxShadow: isOn ? `0 0 8px ${cfg.glowColor}` : "none",
          transition: "all 0.3s",
        }}
      />
      <span
        className={`font-semibold font-mono transition-colors whitespace-nowrap ${
          compact ? "text-[10px]" : "text-xs"
        } ${isOn ? cfg.textClass : "text-white/40"}`}
      >
        {cfg.label}
      </span>
      <div
        className="relative w-8 h-4 rounded-full transition-all duration-300 flex-shrink-0"
        style={{
          background: isOn ? `${cfg.color}33` : "rgba(255,255,255,0.1)",
          border: `1px solid ${isOn ? cfg.color : "rgba(255,255,255,0.15)"}`,
        }}
      >
        <motion.div
          className="absolute top-0.5 w-3 h-3 rounded-full"
          animate={{ left: isOn ? "calc(100% - 14px)" : "2px" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            background: isOn ? cfg.color : "rgba(255,255,255,0.3)",
            boxShadow: isOn ? `0 0 8px ${cfg.glowColor}` : "none",
          }}
        />
      </div>
    </motion.button>
  );
}

// ── Health Badge ───────────────────────────────────────────────────────────────
function NetworkHealthBadge({ faultyCount }: { faultyCount: number }) {
  const healthy = faultyCount === 0;
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border flex-shrink-0"
      style={{
        background: healthy ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
        borderColor: healthy ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
      }}
    >
      <span
        className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
        style={{
          background: healthy ? "#22c55e" : "#ef4444",
          boxShadow: `0 0 6px ${healthy ? "#22c55e" : "#ef4444"}`,
        }}
      />
      <span
        className="text-xs font-mono font-semibold whitespace-nowrap"
        style={{ color: healthy ? "#22c55e" : "#ef4444" }}
      >
        {healthy
          ? "Healthy"
          : `${faultyCount} Fault${faultyCount > 1 ? "s" : ""}`}
      </span>
    </div>
  );
}

// ── View Mode Toggle ──────────────────────────────────────────────────────────
function ViewToggle({
  mode,
  onChange,
}: { mode: ViewMode; onChange: (m: ViewMode) => void }) {
  const tabs: { value: ViewMode; label: string; icon: React.ElementType }[] = [
    { value: "sections", label: "OLT Sections", icon: LayoutGrid },
    { value: "graph", label: "Graph", icon: Share2 },
  ];
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl flex-shrink-0"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = mode === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            data-ocid={`topology-view-toggle-${tab.value}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 whitespace-nowrap"
            style={{
              background: active ? "rgba(6,182,212,0.15)" : "transparent",
              color: active ? "#06b6d4" : "rgba(255,255,255,0.4)",
              border: active
                ? "1px solid rgba(6,182,212,0.3)"
                : "1px solid transparent",
              boxShadow: active ? "0 0 12px rgba(6,182,212,0.2)" : "none",
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── OLT Sections Summary Bar ──────────────────────────────────────────────────
function OLTSummaryBar({
  olts,
  filteredOlts,
}: {
  olts: import("@/types/network").Device[];
  filteredOlts: import("@/types/network").Device[];
}) {
  const online = olts.filter((o) => o.status === "active").length;
  const fault = olts.filter((o) => o.status === "faulty").length;

  const items = [
    { label: "Total", value: olts.length, color: "#06b6d4", icon: Router },
    { label: "Online", value: online, color: "#22c55e", icon: CheckCircle2 },
    { label: "Fault", value: fault, color: "#ef4444", icon: AlertTriangle },
    {
      label: "Shown",
      value: filteredOlts.length,
      color: "#a855f7",
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl flex-shrink-0"
            style={{
              background: `${item.color}0d`,
              border: `1px solid ${item.color}25`,
            }}
          >
            <Icon className="w-3 h-3" style={{ color: item.color }} />
            <span
              className="text-[10px] font-mono"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {item.label}
            </span>
            <span
              className="text-sm font-bold font-mono"
              style={{ color: item.color }}
            >
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Topology() {
  const isMobile = useIsMobile(768);

  const devices = useNetworkStore((s) => s.devices);
  const alerts = useNetworkStore((s) => s.alerts);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);

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
  const [viewMode, setViewMode] = useState<ViewMode>("sections");
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
      label: "Active",
      value: activeCount,
      icon: CheckCircle2,
      accentColor: "#22c55e",
      glowColor: "rgba(34,197,94,0.5)",
    },
    {
      label: "Faults",
      value: faultyCount,
      icon: AlertTriangle,
      accentColor: "#ef4444",
      glowColor: "rgba(239,68,68,0.5)",
    },
    {
      label: "OLTs",
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

  // ── Build OLT → Splitter → ONT maps ─────────────────────────────────────
  const olts = useMemo(
    () => devices.filter((d) => d.type === "OLT"),
    [devices],
  );
  const splitters = useMemo(
    () => devices.filter((d) => d.type === "Splitter"),
    [devices],
  );
  const ontsAll = useMemo(
    () => devices.filter((d) => d.type === "ONT"),
    [devices],
  );

  const filteredOlts = useMemo(
    () =>
      activeRegion === "All"
        ? olts
        : olts.filter((o) => o.region === activeRegion),
    [olts, activeRegion],
  );

  const oltSplittersMap = useMemo(() => {
    const map: Record<string, import("@/types/network").Device[]> = {};
    for (const olt of olts) {
      map[olt.id] = olt.connectedTo
        .map((sid) => splitters.find((s) => s.id === sid))
        .filter(Boolean) as import("@/types/network").Device[];
    }
    return map;
  }, [olts, splitters]);

  const oltONTsMap = useMemo(() => {
    const map: Record<string, import("@/types/network").Device[]> = {};
    for (const olt of olts) {
      const spls = oltSplittersMap[olt.id] ?? [];
      const ontIds = new Set(spls.flatMap((s) => s.connectedTo));
      map[olt.id] = ontsAll.filter((o) => ontIds.has(o.id));
    }
    return map;
  }, [olts, oltSplittersMap, ontsAll]);

  // Show bottom sheet on mobile when device selected
  const showBottomSheet = isMobile && selectedDevice !== null;

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
      <div className="flex-shrink-0 px-3 sm:px-6 pt-3 md:pt-5 pb-2 md:pb-4 border-b border-white/8">
        {/* Title row */}
        <div className="flex items-center justify-between gap-2 mb-2 md:mb-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(6,182,212,0.15)",
                border: "1px solid rgba(6,182,212,0.3)",
                boxShadow: "0 0 20px rgba(6,182,212,0.2)",
              }}
            >
              <Layers3
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: "#06b6d4" }}
              />
            </div>
            <div className="min-w-0">
              <h1
                className="text-lg sm:text-2xl font-display font-bold tracking-tight leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #06b6d4 60%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Network Topology
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <p className="text-[10px] font-mono text-white/40 truncate">
                  {devices.length.toLocaleString()} nodes
                </p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/30">
                  <RefreshCw className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">{syncLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <NetworkHealthBadge faultyCount={faultyCount} />
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Stat cards — 3-col on mobile, 6-col on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {statCards.map((s, i) => (
            <StatCard
              key={s.label}
              {...s}
              delay={i * 0.06}
              compact={isMobile}
            />
          ))}
        </div>
      </div>

      {/* ── Toolbar: layer toggles ────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-3 sm:px-6 py-2 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Activity className="w-3 h-3 text-white/30" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 hidden sm:block">
              Layers
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none flex-1 pb-0.5">
            {LAYER_CONFIGS.map((cfg) => (
              <LayerToggle key={cfg.type} cfg={cfg} compact={isMobile} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 relative">
        <AnimatePresence mode="wait">
          {viewMode === "sections" ? (
            /* ── OLT SECTIONS VIEW ─────────────────────────────────────────── */
            <motion.div
              key="sections"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 min-w-0 overflow-hidden flex flex-col"
            >
              {/* Sections sub-header */}
              <div
                className="flex-shrink-0 flex items-center justify-between gap-2 px-3 sm:px-5 py-2 border-b flex-wrap"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                    style={{
                      background: "#22c55e",
                      boxShadow: "0 0 8px #22c55e",
                    }}
                  />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    {filteredOlts.length} OLTs
                  </span>
                </div>
                <OLTSummaryBar olts={olts} filteredOlts={filteredOlts} />
              </div>

              {/* Scrollable grid */}
              <div
                className={`flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-5 ${
                  isMobile ? "pb-24" : "pb-4"
                }`}
                style={{ scrollbarColor: "rgba(6,182,212,0.2) transparent" }}
                data-ocid="olt-sections-grid"
              >
                {filteredOlts.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center h-64 gap-4"
                    data-ocid="olt-sections.empty_state"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "rgba(6,182,212,0.1)",
                        border: "1px solid rgba(6,182,212,0.2)",
                      }}
                    >
                      <Router
                        className="w-7 h-7"
                        style={{ color: "#06b6d4" }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-mono text-white/40">
                        No OLTs in this region
                      </p>
                      <p className="text-xs font-mono text-white/25 mt-1">
                        Select "All" or a different region
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                    {filteredOlts.map((olt, i) => (
                      <OLTSectionCard
                        key={olt.id}
                        olt={olt}
                        splitters={oltSplittersMap[olt.id] ?? []}
                        onts={oltONTsMap[olt.id] ?? []}
                        isSelected={selectedDeviceId === olt.id}
                        onSelect={(id) =>
                          setSelectedDevice(selectedDeviceId === id ? null : id)
                        }
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* ── NETWORK GRAPH VIEW ─────────────────────────────────────────── */
            <motion.div
              key="graph"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 min-w-0 flex flex-col md:flex-row min-h-0"
            >
              {/* Graph canvas */}
              <div className="flex-1 min-w-0 relative overflow-hidden flex flex-col min-h-0">
                <div
                  className="flex-shrink-0 flex items-center justify-between px-3 sm:px-5 py-2 border-b"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                      style={{
                        background: "#22c55e",
                        boxShadow: "0 0 8px #22c55e",
                      }}
                    />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      Live Topology
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-3 h-3 text-cyan-400" />
                    <span className="text-[10px] font-mono text-cyan-400">
                      LIVE SYNC
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-h-0 relative">
                  <TopologyGraph />
                </div>
              </div>

              {/* Detail panel — desktop/tablet: right sidebar */}
              {!isMobile && (
                <div
                  className="flex-shrink-0 border-t md:border-t-0 md:border-l"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <TopologyNodePanel device={selectedDevice} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar for sections view */}
        {viewMode === "sections" && selectedDevice && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 border-l hidden md:block"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <TopologyNodePanel device={selectedDevice} />
          </motion.div>
        )}
      </div>

      {/* ── Bottom Strip: region filters + export ────────────────────────────── */}
      <div
        className={`flex-shrink-0 border-t ${isMobile ? "pb-20" : ""}`}
        style={{
          background: "rgba(6,182,212,0.03)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
        data-ocid="topology-bottom-strip"
      >
        <div className="flex items-center gap-2 px-3 sm:px-6 py-2 overflow-x-auto scrollbar-none">
          <Globe2 className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
          <div className="flex items-center gap-1.5 flex-nowrap">
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                data-ocid={`region-filter-${region.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all duration-200 whitespace-nowrap flex-shrink-0"
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
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {unresolvedAlerts > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-[10px] font-mono text-red-400 whitespace-nowrap">
                  {unresolvedAlerts} Alerts
                </span>
              </div>
            )}
            {warnCount > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="w-3 h-3 text-yellow-400" />
                <span className="text-[10px] font-mono text-yellow-400 whitespace-nowrap">
                  {warnCount} Warn
                </span>
              </div>
            )}
            <button
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-all duration-200 border flex-shrink-0"
              style={{
                color: "rgba(255,255,255,0.5)",
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
              }}
              data-ocid="topology-export-svg"
              aria-label="Export topology as SVG"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export SVG</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Sheet (device detail) ──────────────────────────────── */}
      <AnimatePresence>
        {showBottomSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedDevice(null)}
            />
            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden"
              style={{
                background: "rgba(2,8,23,0.97)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderBottom: "none",
                backdropFilter: "blur(20px)",
                maxHeight: "72vh",
              }}
              data-ocid="topology-mobile-sheet"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <div
                className="overflow-y-auto"
                style={{
                  maxHeight: "calc(72vh - 20px)",
                  scrollbarColor: "rgba(6,182,212,0.2) transparent",
                }}
              >
                <TopologyNodePanel device={selectedDevice} isMobileSheet />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
