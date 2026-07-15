/**
 * ResultPanel — Dual-panel result display for Network Auto Design.
 *
 * Exports:
 *   NodeDetailPanel  – left-side floating panel showing selected node details + editable fields
 *   SummaryPanel     – right-side floating panel with KPI grid + toolbar
 *   ResultPanel      – default export, renders both
 *
 * Desktop layout:
 *   NodeDetailPanel  → absolute left-4 top-4  (z-1000)
 *   SummaryPanel     → absolute right-4 top-4 (z-1000), shifts down when ParameterPanel visible
 *
 * Mobile layout:
 *   Two FAB buttons at bottom-right open respective bottom drawers (70vh, slide-up)
 */

import {
  Activity,
  Cable,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Play,
  RefreshCw,
  Signal,
  SplitSquareHorizontal,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { exportResultAsJson } from "../hooks/useAutoDesign";
import { useAutoDesignStore } from "../store";
import type { NetworkNode, NetworkType, NodeType } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const GLASS =
  "bg-gray-900/85 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40";

const NODE_TYPE_CONFIG: Record<
  NodeType,
  { label: string; color: string; dotClass: string }
> = {
  OLT: { label: "OLT", color: "text-red-400", dotClass: "bg-red-500" },
  SPLITTER: {
    label: "Splitter",
    color: "text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  SUBSCRIBER: {
    label: "Subscriber",
    color: "text-blue-400",
    dotClass: "bg-blue-500",
  },
};

const NETWORK_TYPE_COLOR: Record<NetworkType, string> = {
  FIBER: "bg-emerald-500",
  COAXIAL: "bg-yellow-400",
  LAN: "bg-blue-400",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCoord(val: number): string {
  return val.toFixed(4);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ─── BarMeter ─────────────────────────────────────────────────────────────────

interface BarMeterProps {
  value: number; // 0-100
  colorClass: string;
  label: string;
}

function BarMeter({ value, colorClass, label }: BarMeterProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs text-white/70 font-medium">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── TooltipBtn ───────────────────────────────────────────────────────────────

interface TooltipBtnProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  "data-ocid"?: string;
}

function TooltipBtn({
  label,
  icon,
  onClick,
  active,
  "data-ocid": ocid,
}: TooltipBtnProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex-1">
      <motion.button
        type="button"
        data-ocid={ocid}
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`w-full p-2 rounded-lg flex items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${
          active
            ? "bg-primary/20 text-primary"
            : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90"
        }`}
      >
        {icon}
      </motion.button>
      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            data-ocid={ocid ? `${ocid}.tooltip` : undefined}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-gray-800 border border-white/10 text-xs text-white whitespace-nowrap z-[1100] pointer-events-none"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
          >
            {label}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── NodeDetailPanel ──────────────────────────────────────────────────────────

export function NodeDetailPanel() {
  const store = useAutoDesignStore();
  const { result, selectedNodeId } = store;

  const selectedNode: NetworkNode | null = useMemo(() => {
    if (!result || !selectedNodeId) return null;
    return result.nodes.find((n) => n.id === selectedNodeId) ?? null;
  }, [result, selectedNodeId]);

  // Local editable state
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");
  const [editSignal, setEditSignal] = useState(85);
  const [isDirty, setIsDirty] = useState(false);

  // Sync when node changes
  useEffect(() => {
    if (selectedNode) {
      setEditName(selectedNode.name);
      setEditStatus("Active");
      setEditSignal(selectedNode.type === "SUBSCRIBER" ? 72 : 85);
      setIsDirty(false);
    }
  }, [selectedNode]);

  const handleSave = () => {
    setIsDirty(false);
    // In a real app: persist via mutation. Here we just acknowledge.
  };

  const handleCancel = () => {
    if (selectedNode) {
      setEditName(selectedNode.name);
      setEditStatus("Active");
      setEditSignal(selectedNode.type === "SUBSCRIBER" ? 72 : 85);
    }
    setIsDirty(false);
  };

  const isVisible = selectedNode !== null;
  const cfg = selectedNode ? NODE_TYPE_CONFIG[selectedNode.type] : null;

  // Get connected info
  const splitterForSub = useMemo(() => {
    if (!result || !selectedNode || selectedNode.type !== "SUBSCRIBER")
      return null;
    const edge = result.edges.find((e) => e.toNodeId === selectedNode.id);
    if (!edge) return null;
    return result.nodes.find((n) => n.id === edge.fromNodeId) ?? null;
  }, [result, selectedNode]);

  const oltForSplitter = useMemo(() => {
    if (!result || !selectedNode || selectedNode.type !== "SPLITTER")
      return null;
    const edge = result.edges.find((e) => e.toNodeId === selectedNode.id);
    if (!edge) return null;
    return result.nodes.find((n) => n.id === edge.fromNodeId) ?? null;
  }, [result, selectedNode]);

  // ── Inner content ──────────────────────────────────────────────────────────

  const nameInputId = "nd-edit-name";
  const statusSelectId = "nd-edit-status";
  const signalSliderId = "nd-signal-slider";

  const panelContent =
    selectedNode && cfg ? (
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] pr-0.5">
        {/* Type badge + status */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 ${cfg.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
            {cfg.label}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              editStatus === "Active"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/15 text-red-400 border border-red-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${editStatus === "Active" ? "bg-emerald-400" : "bg-red-400"}`}
            />
            {editStatus}
          </span>
        </div>

        {/* ID + name */}
        <div>
          <p className="text-xs text-white/40 mb-0.5 uppercase tracking-wider">
            Node ID
          </p>
          <p className="text-sm font-mono text-white/80">{selectedNode.id}</p>
        </div>

        {/* Connected count */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8">
          <Signal className="w-4 h-4 text-white/40 flex-shrink-0" />
          <span className="text-sm text-white/70">
            Connected to{" "}
            <span className="text-white font-medium">
              {selectedNode.connectedCount}
            </span>{" "}
            node{selectedNode.connectedCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-2">
          <div className="px-2.5 py-2 rounded-lg bg-white/5 border border-white/8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
              Lat
            </p>
            <p className="text-sm font-mono text-white/80">
              {formatCoord(selectedNode.lat)}
            </p>
          </div>
          <div className="px-2.5 py-2 rounded-lg bg-white/5 border border-white/8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
              Lng
            </p>
            <p className="text-sm font-mono text-white/80">
              {formatCoord(selectedNode.lng)}
            </p>
          </div>
        </div>

        {/* Type-specific info */}
        {selectedNode.type === "OLT" && (
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-wider">
              OLT Info
            </p>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <SplitSquareHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Splitters:{" "}
                <span className="text-white font-medium">
                  {selectedNode.connectedCount}
                </span>
              </span>
            </div>
            <BarMeter
              value={editSignal}
              colorClass="bg-emerald-500"
              label="Signal Quality"
            />
          </div>
        )}

        {selectedNode.type === "SPLITTER" && (
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-wider">
              Splitter Info
            </p>
            {oltForSplitter && (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Activity className="w-3.5 h-3.5 text-red-400" />
                <span>
                  OLT:{" "}
                  <span className="text-white font-medium">
                    {oltForSplitter.name}
                  </span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>
                Subscribers:{" "}
                <span className="text-white font-medium">
                  {selectedNode.connectedCount}
                </span>
              </span>
            </div>
            <BarMeter
              value={Math.round((selectedNode.connectedCount / 32) * 100)}
              colorClass="bg-blue-500"
              label="Capacity Used"
            />
          </div>
        )}

        {selectedNode.type === "SUBSCRIBER" && (
          <div className="space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-wider">
              Subscriber Info
            </p>
            {splitterForSub && (
              <div className="flex items-center gap-2 text-sm text-white/70">
                <SplitSquareHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Splitter:{" "}
                  <span className="text-white font-medium">
                    {splitterForSub.name}
                  </span>
                </span>
              </div>
            )}
            <BarMeter
              value={editSignal}
              colorClass="bg-blue-500"
              label="Signal Strength"
            />
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/8" />

        {/* Editable fields */}
        <div className="space-y-3">
          <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
            Edit Node
          </p>

          {/* Name */}
          <div className="space-y-1">
            <label
              htmlFor={nameInputId}
              className="text-xs text-white/50 uppercase tracking-wider"
            >
              Name
            </label>
            <input
              id={nameInputId}
              data-ocid="auto-design.node_detail.name_input"
              type="text"
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
                setIsDirty(true);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label
              htmlFor={statusSelectId}
              className="text-xs text-white/50 uppercase tracking-wider"
            >
              Status
            </label>
            <select
              id={statusSelectId}
              data-ocid="auto-design.node_detail.status_select"
              value={editStatus}
              onChange={(e) => {
                setEditStatus(e.target.value as "Active" | "Inactive");
                setIsDirty(true);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all cursor-pointer"
            >
              <option value="Active" className="bg-gray-900">
                Active
              </option>
              <option value="Inactive" className="bg-gray-900">
                Inactive
              </option>
            </select>
          </div>

          {/* Signal strength (read-only for subscribers) */}
          <div className="space-y-1">
            <label
              htmlFor={signalSliderId}
              className="text-xs text-white/50 uppercase tracking-wider flex items-center justify-between"
            >
              <span>Signal Strength</span>
              <span className="text-white/70 font-medium">{editSignal}%</span>
            </label>
            <input
              id={signalSliderId}
              data-ocid="auto-design.node_detail.signal_slider"
              type="range"
              min={0}
              max={100}
              value={editSignal}
              readOnly={selectedNode.type === "SUBSCRIBER"}
              disabled={selectedNode.type === "SUBSCRIBER"}
              onChange={(e) => {
                if (selectedNode.type !== "SUBSCRIBER") {
                  setEditSignal(Number(e.target.value));
                  setIsDirty(true);
                }
              }}
              className="w-full accent-primary h-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-default"
            />
            {selectedNode.type === "SUBSCRIBER" && (
              <p className="text-xs text-white/30">Read-only for subscribers</p>
            )}
          </div>

          {/* Save / Cancel */}
          <AnimatePresence>
            {isDirty && (
              <motion.div
                className="flex gap-2 pt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  type="button"
                  data-ocid="auto-design.node_detail.save_button"
                  onClick={handleSave}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  type="button"
                  data-ocid="auto-design.node_detail.cancel_button"
                  onClick={handleCancel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Cancel
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* ── Desktop Panel ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            data-ocid="auto-design.node_detail_panel"
            className={`hidden md:flex flex-col absolute left-4 top-4 w-[280px] rounded-2xl ${GLASS} p-4 z-[1000]`}
            initial={{ opacity: 0, x: -20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-white font-semibold text-sm">Node Details</h2>
              <button
                type="button"
                data-ocid="auto-design.node_detail.close_button"
                aria-label="Close node detail"
                onClick={() => store.setSelectedNodeId(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile rendering is handled by ResultPanel FAB + drawer */}
    </>
  );
}

// ─── SummaryPanel ─────────────────────────────────────────────────────────────

interface SummaryPanelProps {
  /** When true (ParameterPanel visible), shift the panel down on desktop */
  parameterPanelVisible?: boolean;
  /** Mobile drawer mode — no absolute positioning, fills container */
  drawerMode?: boolean;
}

export function SummaryPanel({
  parameterPanelVisible = false,
  drawerMode = false,
}: SummaryPanelProps) {
  const store = useAutoDesignStore();
  const { result, formValues } = store;
  const [minimized, setMinimized] = useState(false);

  const isVisible = result !== null;

  // Generated-at timestamp (stored on first render)
  const generatedAt = useRef<string>("");
  useEffect(() => {
    if (result) {
      generatedAt.current = new Date().toISOString();
    }
  }, [result]);

  if (!isVisible || !result) return null;

  const { summary, nodes, edges } = result;
  const cableKm = (summary.totalCableLength / 1000).toFixed(2);

  const networkTypeLabel =
    formValues?.networkType ?? edges[0]?.networkType ?? "FIBER";

  const oltCount = nodes.filter((n) => n.type === "OLT").length;
  const splitterCount = nodes.filter((n) => n.type === "SPLITTER").length;
  const subscriberCount = nodes.filter((n) => n.type === "SUBSCRIBER").length;

  // KPI grid data
  const kpis = [
    {
      label: "Subscribers",
      value: summary.totalSubscribers.toLocaleString(),
      icon: <Users className="w-4 h-4" />,
      colorClass: "text-blue-400",
      bgClass: "bg-blue-500/10",
    },
    {
      label: "Splitters",
      value: summary.totalSplitters.toLocaleString(),
      icon: <SplitSquareHorizontal className="w-4 h-4" />,
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
    {
      label: "Cable",
      value: `${cableKm} km`,
      icon: <Cable className="w-4 h-4" />,
      colorClass: "text-purple-400",
      bgClass: "bg-purple-500/10",
    },
    {
      label: "Est. Cost",
      value: `$${summary.estimatedCost.toLocaleString()}`,
      icon: <DollarSign className="w-4 h-4" />,
      colorClass: "text-yellow-400",
      bgClass: "bg-yellow-500/10",
    },
  ];

  const content = (
    <div className="flex flex-col gap-4">
      {/* KPI 2×2 grid */}
      <div className="grid grid-cols-2 gap-2">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`rounded-xl p-3 ${kpi.bgClass} border border-white/8 flex flex-col gap-1.5`}
          >
            <div className={`flex items-center gap-1.5 ${kpi.colorClass}`}>
              {kpi.icon}
              <span className="text-xs font-medium text-white/50">
                {kpi.label}
              </span>
            </div>
            <p
              className={`text-base font-bold leading-tight ${kpi.colorClass}`}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Network breakdown */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
          Network Breakdown
        </p>
        <div className="space-y-1.5">
          {[
            {
              label: "OLT Nodes",
              count: oltCount,
              dotClass: "bg-red-500",
              textClass: "text-red-400",
            },
            {
              label: "Splitter Nodes",
              count: splitterCount,
              dotClass: "bg-emerald-500",
              textClass: "text-emerald-400",
            },
            {
              label: "Subscriber Nodes",
              count: subscriberCount,
              dotClass: "bg-blue-500",
              textClass: "text-blue-400",
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/8"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${row.dotClass}`} />
                <span className="text-xs text-white/70">{row.label}</span>
              </div>
              <span className={`text-xs font-semibold ${row.textClass}`}>
                {row.count}
              </span>
            </div>
          ))}

          {/* Network type row */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${NETWORK_TYPE_COLOR[networkTypeLabel as NetworkType] ?? "bg-white/40"}`}
              />
              <span className="text-xs text-white/70">Network Type</span>
            </div>
            <span className="text-xs font-semibold text-white/80">
              {networkTypeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-wider font-medium">
          Controls
        </p>
        <div className="flex gap-1">
          <TooltipBtn
            label={store.showNodes ? "Hide Nodes" : "Show Nodes"}
            icon={
              store.showNodes ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )
            }
            onClick={() => store.setShowNodes(!store.showNodes)}
            active={store.showNodes}
            data-ocid="auto-design.summary.toggle_nodes"
          />
          <TooltipBtn
            label={store.showEdges ? "Hide Connections" : "Show Connections"}
            icon={
              store.showEdges ? (
                <Cable className="w-4 h-4" />
              ) : (
                <Cable className="w-4 h-4 opacity-40" />
              )
            }
            onClick={() => store.setShowEdges(!store.showEdges)}
            active={store.showEdges}
            data-ocid="auto-design.summary.toggle_edges"
          />
          <TooltipBtn
            label="Fit Map"
            icon={<Maximize2 className="w-4 h-4" />}
            onClick={() => store.setShowNodes(store.showNodes)} // triggers re-render; MapCanvas listens for fitMapRequested
            data-ocid="auto-design.summary.fit_map"
          />
          <TooltipBtn
            label="Replay Animation"
            icon={<Play className="w-4 h-4" />}
            onClick={() => store.setAnimationPlayed(false)}
            data-ocid="auto-design.summary.replay_animation"
          />
          <TooltipBtn
            label="Export JSON"
            icon={<Download className="w-4 h-4" />}
            onClick={() => {
              if (formValues) exportResultAsJson(result, formValues);
            }}
            data-ocid="auto-design.summary.export_json"
          />
          <TooltipBtn
            label="Re-run Design"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => store.setDrawingMode("done")}
            data-ocid="auto-design.summary.rerun_design"
          />
        </div>
      </div>

      {/* Last generated */}
      {generatedAt.current && (
        <p className="text-xs text-white/25 text-right">
          Last generated: {formatDate(generatedAt.current)}
        </p>
      )}
    </div>
  );

  // ── Drawer mode (inside mobile bottom drawer) ───────────────────────────────

  if (drawerMode) {
    return content;
  }

  // ── Desktop Panel ──────────────────────────────────────────────────────────

  const topClass = parameterPanelVisible ? "top-[480px]" : "top-4";

  return (
    <motion.div
      data-ocid="auto-design.summary_panel"
      className={`hidden md:flex flex-col absolute right-4 ${topClass} w-[300px] rounded-2xl ${GLASS} p-4 z-[1000] transition-[top] duration-300`}
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-white font-semibold text-sm">Design Summary</h2>
        <button
          type="button"
          data-ocid="auto-design.summary.minimize_toggle"
          aria-label={minimized ? "Expand summary" : "Minimize summary"}
          onClick={() => setMinimized((m) => !m)}
          className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors"
        >
          {minimized ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: "hidden" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MobileDrawer ─────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ocid: string;
}

function MobileDrawer({
  title,
  isOpen,
  onClose,
  children,
  ocid,
}: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="md:hidden fixed inset-0 bg-black/50 z-[1050]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            data-ocid={ocid}
            className={`md:hidden fixed bottom-0 left-0 right-0 z-[1060] h-[70vh] rounded-t-2xl ${GLASS} flex flex-col`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0">
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              <button
                type="button"
                data-ocid={`${ocid}.close_button`}
                aria-label="Close drawer"
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── ResultPanel (default export) ────────────────────────────────────────────

export default function ResultPanel() {
  const store = useAutoDesignStore();
  const { result, selectedNodeId, drawingMode } = store;

  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [summaryDrawerOpen, setSummaryDrawerOpen] = useState(false);

  const hasResult = result !== null;
  const hasSelectedNode = selectedNodeId !== null;
  const parameterPanelVisible =
    drawingMode === "done" || drawingMode === "editing";

  // Auto-open detail drawer on mobile when node selected
  useEffect(() => {
    if (hasSelectedNode) setDetailDrawerOpen(true);
  }, [hasSelectedNode]);

  return (
    <>
      {/* ── Desktop Panels ─────────────────────────────────────────────── */}
      <NodeDetailPanel />
      <AnimatePresence>
        {hasResult && (
          <SummaryPanel parameterPanelVisible={parameterPanelVisible} />
        )}
      </AnimatePresence>

      {/* ── Mobile FABs ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {hasResult && (
          <motion.div
            className="md:hidden fixed bottom-24 right-4 z-[1040] flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Node Details FAB */}
            {hasSelectedNode && (
              <motion.button
                type="button"
                data-ocid="auto-design.fab.node_detail"
                aria-label="Open node details"
                onClick={() => setDetailDrawerOpen(true)}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${GLASS} border border-primary/40 text-primary`}
              >
                <Signal className="w-5 h-5" />
              </motion.button>
            )}

            {/* Summary FAB */}
            <motion.button
              type="button"
              data-ocid="auto-design.fab.summary"
              aria-label="Open design summary"
              onClick={() => setSummaryDrawerOpen(true)}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${GLASS} border border-emerald-500/40 text-emerald-400`}
            >
              <Activity className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawers ─────────────────────────────────────────────── */}
      <MobileDrawer
        title="Node Details"
        isOpen={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        ocid="auto-design.node_detail_drawer"
      >
        {hasSelectedNode && result ? (
          (() => {
            const node = result.nodes.find((n) => n.id === selectedNodeId);
            if (!node)
              return <p className="text-white/40 text-sm">No node selected.</p>;
            const cfg = NODE_TYPE_CONFIG[node.type];
            return (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 ${cfg.color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`}
                    />
                    {cfg.label}
                  </span>
                </div>
                <p className="text-white/80 font-medium">{node.name}</p>
                <p className="text-white/50 font-mono text-xs">{node.id}</p>
                <div className="flex items-center gap-2 text-white/70">
                  <Signal className="w-4 h-4 text-white/40" />
                  Connected to {node.connectedCount} node
                  {node.connectedCount !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="px-2.5 py-2 rounded-lg bg-white/5 border border-white/8">
                    <p className="text-xs text-white/40 mb-0.5">Lat</p>
                    <p className="text-sm font-mono text-white/80">
                      {formatCoord(node.lat)}
                    </p>
                  </div>
                  <div className="px-2.5 py-2 rounded-lg bg-white/5 border border-white/8">
                    <p className="text-xs text-white/40 mb-0.5">Lng</p>
                    <p className="text-sm font-mono text-white/80">
                      {formatCoord(node.lng)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid="auto-design.node_detail_drawer.close_button"
                  onClick={() => {
                    store.setSelectedNodeId(null);
                    setDetailDrawerOpen(false);
                  }}
                  className="mt-2 w-full py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  Deselect Node
                </button>
              </div>
            );
          })()
        ) : (
          <p className="text-white/40 text-sm">
            Select a node on the map to view details.
          </p>
        )}
      </MobileDrawer>

      <MobileDrawer
        title="Design Summary"
        isOpen={summaryDrawerOpen}
        onClose={() => setSummaryDrawerOpen(false)}
        ocid="auto-design.summary_drawer"
      >
        {hasResult && <SummaryPanel drawerMode parameterPanelVisible={false} />}
      </MobileDrawer>
    </>
  );
}
