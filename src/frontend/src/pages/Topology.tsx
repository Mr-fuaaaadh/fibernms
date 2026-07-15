import { OLTSectionCard } from "@/components/topology/OLTSectionCard";
import type { SelectedNode } from "@/components/topology/OLTSectionCard";
import { TopologyGraph } from "@/components/topology/TopologyGraph";
import { TopologyNodePanel } from "@/components/topology/TopologyNodePanel";
import {
  TOPOLOGY_DATA,
  getStatusCounts,
} from "@/components/topology/topologyData";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  GitBranch,
  Home,
  Layers3,
  LayoutGrid,
  Network,
  RefreshCw,
  Search,
  WifiOff,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "graph" | "sections";
type FilterStatus = "all" | "online" | "warning" | "critical" | "offline";
type FilterType = "all" | "olt" | "splitter" | "ont" | "alarms";

// ─── KPI card (light theme) ──────────────────────────────────────────────────
interface KPICardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  delay: number;
}
function KPICard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  borderColor,
  delay,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0 sm:flex-1"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p
          className="text-[10px] font-mono uppercase tracking-widest leading-none mb-1"
          style={{ color: "#94a3b8" }}
        >
          {label}
        </p>
        <p
          className="text-xl font-mono font-bold leading-none"
          style={{ color }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Filter pill (light theme) ────────────────────────────────────────────────
function FilterPill<T extends string>({
  label,
  value,
  active,
  onClick,
  ocid,
}: {
  label: string;
  value: T;
  active: boolean;
  onClick: (v: T) => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      data-ocid={ocid}
      className="px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-150 whitespace-nowrap flex-shrink-0 min-h-[32px] border"
      style={{
        background: active ? "#eef2ff" : "#f8fafc",
        borderColor: active ? "#c7d2fe" : "#e2e8f0",
        color: active ? "#4338ca" : "#64748b",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Topology() {
  const isMobile = useIsMobile(768);
  const [viewMode, setViewMode] = useState<ViewMode>("graph");
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [syncSeconds, setSyncSeconds] = useState(0);
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
  const counts = useMemo(() => getStatusCounts(), []);

  const filteredOLTs = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return TOPOLOGY_DATA.filter((olt) => {
      if (filterStatus !== "all") {
        const hasStatus = (st: string) => {
          if (olt.status === st) return true;
          return olt.splitters.some(
            (s) => s.status === st || s.onts.some((o) => o.status === st),
          );
        };
        if (!hasStatus(filterStatus)) return false;
      }
      if (filterType === "olt") {
        if (q && !olt.name.toLowerCase().includes(q) && !olt.ip.includes(q))
          return false;
      } else if (filterType === "splitter") {
        const hasSpl = olt.splitters.some(
          (s) => !q || s.name.toLowerCase().includes(q) || s.ip.includes(q),
        );
        if (!hasSpl) return false;
      } else if (filterType === "ont") {
        const hasOnt = olt.splitters.some((s) =>
          s.onts.some(
            (o) => !q || o.name.toLowerCase().includes(q) || o.ip.includes(q),
          ),
        );
        if (!hasOnt) return false;
      } else if (filterType === "alarms") {
        const hasAlarm =
          olt.alarms.length > 0 ||
          olt.splitters.some(
            (s) =>
              s.alarms.length > 0 || s.onts.some((o) => o.alarms.length > 0),
          );
        if (!hasAlarm) return false;
        if (q && !olt.name.toLowerCase().includes(q)) return false;
      } else {
        if (
          q &&
          !olt.name.toLowerCase().includes(q) &&
          !olt.ip.includes(q) &&
          !olt.splitters.some(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.ip.includes(q) ||
              s.onts.some(
                (o) => o.name.toLowerCase().includes(q) || o.ip.includes(q),
              ),
          )
        )
          return false;
      }
      return true;
    });
  }, [searchQuery, filterStatus, filterType]);

  const selectedId = selectedNode?.data.id ?? null;
  const showPanel = selectedNode !== null;
  const showBottomSheet = isMobile && showPanel;

  function handleExport() {
    toast.success("Export queued — PNG/PDF ready in a few seconds");
  }
  function handleRefresh() {
    setSyncSeconds(0);
    toast.info("Topology data refreshed");
  }

  const STATUS_FILTERS: { label: string; value: FilterStatus; ocid: string }[] =
    [
      { label: "All Devices", value: "all", ocid: "filter-status-all" },
      { label: "Online", value: "online", ocid: "filter-status-online" },
      { label: "Warning", value: "warning", ocid: "filter-status-warning" },
      { label: "Critical", value: "critical", ocid: "filter-status-critical" },
      { label: "Offline", value: "offline", ocid: "filter-status-offline" },
    ];
  const TYPE_FILTERS: { label: string; value: FilterType; ocid: string }[] = [
    { label: "All Types", value: "all", ocid: "filter-type-all" },
    { label: "OLT Only", value: "olt", ocid: "filter-type-olt" },
    { label: "Splitters", value: "splitter", ocid: "filter-type-splitter" },
    { label: "ONT Only", value: "ont", ocid: "filter-type-ont" },
    { label: "With Alarms", value: "alarms", ocid: "filter-type-alarms" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="topology-light flex flex-col h-full overflow-hidden"
      data-ocid="topology-page"
    >
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 pt-4 pb-3 border-b"
        style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
      >
        {/* Breadcrumb + title */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div
              className="flex items-center gap-1 mb-1.5 text-[10px] font-mono"
              style={{ color: "#94a3b8" }}
            >
              <Home className="w-3 h-3" />
              <ChevronRight className="w-3 h-3" />
              <span>NOC</span>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "#64748b" }}>Network Topology</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}
              >
                <Layers3 className="w-4 h-4" style={{ color: "#4f46e5" }} />
              </div>
              <div>
                <h1
                  className="text-xl font-bold leading-tight"
                  style={{
                    color: "#0f172a",
                    fontFamily: "ui-monospace,monospace",
                  }}
                >
                  Network Topology
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                    style={{ boxShadow: "0 0 6px #22c55e" }}
                  />
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "#94a3b8" }}
                  >
                    Live · updated {syncLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop search */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border"
              style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
            >
              <Search
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: "#94a3b8" }}
              />
              <input
                type="text"
                placeholder="Search nodes, IPs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs font-mono outline-none w-36 lg:w-48"
                style={{ color: "#334155" }}
                data-ocid="topology-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="transition-colors"
                  style={{ color: "#94a3b8" }}
                >
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all border hover:bg-slate-50"
              style={{
                background: "#f8fafc",
                borderColor: "#e2e8f0",
                color: "#64748b",
              }}
              aria-label="Refresh topology"
              data-ocid="topology-refresh-button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-mono transition-all border hover:bg-slate-50"
              style={{
                background: "#f8fafc",
                borderColor: "#e2e8f0",
                color: "#64748b",
              }}
              data-ocid="topology-export-button"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* KPI bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
          <KPICard
            label="Total Nodes"
            value={counts.total}
            icon={Network}
            color="#4f46e5"
            bgColor="#f5f3ff"
            borderColor="#ddd6fe"
            delay={0}
          />
          <KPICard
            label="Online"
            value={counts.online}
            icon={CheckCircle2}
            color="#16a34a"
            bgColor="#f0fdf4"
            borderColor="#bbf7d0"
            delay={0.04}
          />
          <KPICard
            label="Warning"
            value={counts.warning}
            icon={AlertTriangle}
            color="#d97706"
            bgColor="#fffbeb"
            borderColor="#fde68a"
            delay={0.08}
          />
          <KPICard
            label="Critical"
            value={counts.critical}
            icon={XCircle}
            color="#dc2626"
            bgColor="#fef2f2"
            borderColor="#fecaca"
            delay={0.12}
          />
          <KPICard
            label="Offline"
            value={counts.offline}
            icon={WifiOff}
            color="#64748b"
            bgColor="#f8fafc"
            borderColor="#e2e8f0"
            delay={0.16}
          />
        </div>
      </div>

      {/* ── View tabs + Filters ───────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 py-2.5 border-b"
        style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
      >
        {/* Tab strip + search */}
        <div className="flex items-center gap-3 mb-2.5">
          {/* View tabs */}
          <div
            className="flex items-center gap-0.5 p-0.5 rounded-lg border"
            style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
          >
            <button
              type="button"
              onClick={() => setViewMode("graph")}
              data-ocid="topology-view-graph"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono transition-all duration-150 min-h-[32px] border"
              style={{
                background: viewMode === "graph" ? "#eef2ff" : "transparent",
                color: viewMode === "graph" ? "#4338ca" : "#64748b",
                borderColor: viewMode === "graph" ? "#c7d2fe" : "transparent",
                fontWeight: viewMode === "graph" ? 600 : 400,
              }}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Network Graph</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("sections")}
              data-ocid="topology-view-sections"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono transition-all duration-150 min-h-[32px] border"
              style={{
                background: viewMode === "sections" ? "#eef2ff" : "transparent",
                color: viewMode === "sections" ? "#4338ca" : "#64748b",
                borderColor:
                  viewMode === "sections" ? "#c7d2fe" : "transparent",
                fontWeight: viewMode === "sections" ? 600 : 400,
              }}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">OLT Sections</span>
            </button>
          </div>

          {/* Mobile search */}
          <div
            className="flex sm:hidden flex-1 items-center gap-2 px-3 py-1.5 rounded-lg border"
            style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
          >
            <Search
              className="w-3 h-3 flex-shrink-0"
              style={{ color: "#94a3b8" }}
            />
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-mono outline-none flex-1 min-w-0"
              style={{ color: "#334155" }}
              data-ocid="topology-search-input-mobile"
            />
          </div>

          <Filter
            className="w-3.5 h-3.5 flex-shrink-0 hidden sm:block"
            style={{ color: "#94a3b8" }}
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {STATUS_FILTERS.map((f) => (
            <FilterPill
              key={f.value}
              label={f.label}
              value={f.value}
              active={filterStatus === f.value}
              onClick={setFilterStatus}
              ocid={f.ocid}
            />
          ))}
          <div
            className="w-px h-6 self-center flex-shrink-0"
            style={{ background: "#e2e8f0" }}
          />
          {TYPE_FILTERS.map((f) => (
            <FilterPill
              key={f.value}
              label={f.label}
              value={f.value}
              active={filterType === f.value}
              onClick={setFilterType}
              ocid={f.ocid}
            />
          ))}
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div
        className="flex flex-1 min-h-0 overflow-hidden"
        style={{ background: "#f8fafc" }}
      >
        <AnimatePresence mode="wait">
          {viewMode === "graph" ? (
            <motion.div
              key="graph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-w-0 overflow-hidden flex flex-col"
              data-ocid="topology-graph-view"
            >
              <TopologyGraph
                searchQuery={searchQuery}
                filterStatus={filterStatus}
                filterType={filterType}
                selectedId={selectedId}
                onSelect={(node) =>
                  setSelectedNode(
                    selectedNode?.data.id === node.data.id ? null : node,
                  )
                }
              />
            </motion.div>
          ) : (
            <motion.div
              key="sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-w-0 overflow-y-auto"
              style={{
                paddingBottom: isMobile ? 80 : 0,
                scrollbarColor: "#cbd5e1 transparent",
              }}
              data-ocid="topology-sections-view"
            >
              <div className="px-4 sm:px-6 py-4">
                {filteredOLTs.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-24 gap-4"
                    data-ocid="topology-sections.empty_state"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                      style={{ background: "#eef2ff", borderColor: "#c7d2fe" }}
                    >
                      <Network
                        className="w-7 h-7"
                        style={{ color: "#6366f1" }}
                      />
                    </div>
                    <div className="text-center">
                      <p
                        className="text-sm font-mono"
                        style={{ color: "#64748b" }}
                      >
                        No nodes match current filters
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setFilterStatus("all");
                          setFilterType("all");
                        }}
                        className="mt-2 text-xs font-mono transition-colors hover:underline"
                        style={{ color: "#4f46e5" }}
                        data-ocid="topology-clear-filters"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredOLTs.map((olt, i) => (
                      <OLTSectionCard
                        key={olt.id}
                        olt={olt}
                        index={i}
                        selectedId={selectedId}
                        onSelect={(node) =>
                          setSelectedNode(
                            selectedNode?.data.id === node.data.id
                              ? null
                              : node,
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop side panel */}
        {!isMobile && (
          <AnimatePresence>
            {showPanel && (
              <motion.div
                key="side-panel"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="flex-shrink-0 overflow-hidden"
              >
                <TopologyNodePanel
                  node={selectedNode}
                  onClose={() => setSelectedNode(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ── Mobile bottom sheet ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBottomSheet && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setSelectedNode(null)}
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden border-t"
              style={{
                background: "#ffffff",
                borderColor: "#e2e8f0",
                maxHeight: "75vh",
              }}
              data-ocid="topology-mobile-sheet"
            >
              <div className="flex justify-center pt-3 pb-1">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "#cbd5e1" }}
                />
              </div>
              <div
                className="overflow-y-auto"
                style={{
                  maxHeight: "calc(75vh - 24px)",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                <TopologyNodePanel
                  node={selectedNode}
                  onClose={() => setSelectedNode(null)}
                  isMobileSheet
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
