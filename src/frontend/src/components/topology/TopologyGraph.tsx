// TopologyGraph — SVG-based interactive hierarchical network graph
// Primary view: OLT → Splitter → ONT tree, all 3 OLTs displayed simultaneously
// Light theme, enterprise-grade, pannable & zoomable

import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import type { SelectedNode } from "./OLTSectionCard";
import type {
  NodeStatus,
  TopoOLT,
  TopoONT,
  TopoSplitter,
} from "./topologyData";
import { TOPOLOGY_DATA } from "./topologyData";

// ─── Layout constants ────────────────────────────────────────────────────────
const OLT_Y = 80;
const SPLITTER_Y = 240;
const ONT_Y = 400;
const NODE_W = 120;
const NODE_H = 52;
const OLT_GAP = 380;
const _SPL_GAP = 130;
const ONT_GAP = 100;
const CANVAS_PAD = 60;

// ─── Status color map (light theme) ─────────────────────────────────────────
const STATUS_COLORS: Record<
  NodeStatus,
  { fill: string; stroke: string; text: string; dot: string }
> = {
  online: {
    fill: "#f0fdf4",
    stroke: "#86efac",
    text: "#166534",
    dot: "#22c55e",
  },
  warning: {
    fill: "#fffbeb",
    stroke: "#fcd34d",
    text: "#92400e",
    dot: "#f59e0b",
  },
  critical: {
    fill: "#fef2f2",
    stroke: "#fca5a5",
    text: "#991b1b",
    dot: "#ef4444",
  },
  offline: {
    fill: "#f8fafc",
    stroke: "#cbd5e1",
    text: "#475569",
    dot: "#94a3b8",
  },
};
const TYPE_COLORS = {
  OLT: { icon: "#4f46e5", bg: "#eef2ff", stroke: "#c7d2fe" },
  Splitter: { icon: "#ea580c", bg: "#fff7ed", stroke: "#fed7aa" },
  ONT: { icon: "#0891b2", bg: "#ecfeff", stroke: "#a5f3fc" },
};

// ─── Graph layout algorithm ──────────────────────────────────────────────────
interface LayoutNode {
  id: string;
  type: "OLT" | "Splitter" | "ONT";
  label: string;
  sublabel: string;
  status: NodeStatus;
  x: number;
  y: number;
  raw: TopoOLT | TopoSplitter | TopoONT;
  kind: "olt" | "splitter" | "ont";
}
interface LayoutEdge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  status: NodeStatus;
}

function buildLayout(): {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  canvasW: number;
  canvasH: number;
} {
  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];

  // Pre-calculate total ONT count per OLT to compute group widths
  const oltGroups = TOPOLOGY_DATA.map((olt) => {
    const splGroups = olt.splitters.map((spl) => ({
      spl,
      ontCount: spl.onts.length,
      width: Math.max(NODE_W, spl.onts.length * ONT_GAP + (NODE_W - ONT_GAP)),
    }));
    const groupW =
      splGroups.reduce((sum, g) => sum + g.width, 0) +
      (splGroups.length - 1) * 20;
    return { olt, splGroups, groupW: Math.max(groupW, NODE_W) };
  });

  let currentX = CANVAS_PAD;
  for (const { olt, splGroups, groupW } of oltGroups) {
    const oltCX = currentX + groupW / 2;

    nodes.push({
      id: olt.id,
      type: "OLT",
      kind: "olt",
      label: olt.name,
      sublabel: olt.ip,
      status: olt.status,
      x: oltCX - NODE_W / 2,
      y: OLT_Y,
      raw: olt,
    });

    let splX = currentX;
    for (const { spl, width } of splGroups) {
      const splCX = splX + width / 2;

      nodes.push({
        id: spl.id,
        type: "Splitter",
        kind: "splitter",
        label: spl.name,
        sublabel: spl.ip,
        status: spl.status,
        x: splCX - NODE_W / 2,
        y: SPLITTER_Y,
        raw: spl,
      });

      // Edge OLT → Splitter
      edges.push({
        id: `e-${olt.id}-${spl.id}`,
        x1: oltCX,
        y1: OLT_Y + NODE_H,
        x2: splCX,
        y2: SPLITTER_Y,
        status: spl.status,
      });

      // ONTs
      const ontStartX = splCX - ((spl.onts.length - 1) * ONT_GAP) / 2;
      spl.onts.forEach((ont, oi) => {
        const ontCX = ontStartX + oi * ONT_GAP;
        nodes.push({
          id: ont.id,
          type: "ONT",
          kind: "ont",
          label: ont.name.length > 14 ? ont.name.slice(0, 14) : ont.name,
          sublabel:
            ont.customerName.length > 14
              ? `${ont.customerName.slice(0, 14)}…`
              : ont.customerName,
          status: ont.status,
          x: ontCX - NODE_W / 2,
          y: ONT_Y,
          raw: ont,
        });
        edges.push({
          id: `e-${spl.id}-${ont.id}`,
          x1: splCX,
          y1: SPLITTER_Y + NODE_H,
          x2: ontCX,
          y2: ONT_Y,
          status: ont.status,
        });
      });

      splX += width + 20;
    }

    currentX += groupW + OLT_GAP;
  }

  const maxX = Math.max(...nodes.map((n) => n.x + NODE_W)) + CANVAS_PAD;
  const canvasH = ONT_Y + NODE_H + CANVAS_PAD;
  return { nodes, edges, canvasW: maxX, canvasH };
}

// ─── Edge path (bezier) ──────────────────────────────────────────────────────
function edgePath(x1: number, y1: number, x2: number, y2: number): string {
  const cy = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
}

// ─── Status indicator stroke ─────────────────────────────────────────────────
function edgeColor(status: NodeStatus): string {
  if (status === "critical") return "#fca5a5";
  if (status === "warning") return "#fcd34d";
  if (status === "offline") return "#cbd5e1";
  return "#bbf7d0";
}

// ─── Node SVG element ────────────────────────────────────────────────────────
function GraphNode({
  node,
  isSelected,
  onSelect,
  index,
}: {
  node: LayoutNode;
  isSelected: boolean;
  onSelect: (n: SelectedNode) => void;
  index: number;
}) {
  const sc = STATUS_COLORS[node.status];
  const tc = TYPE_COLORS[node.type];

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (node.kind === "olt")
      onSelect({ kind: "olt", data: node.raw as TopoOLT });
    else if (node.kind === "splitter")
      onSelect({ kind: "splitter", data: node.raw as TopoSplitter });
    else onSelect({ kind: "ont", data: node.raw as TopoONT });
  }

  const rx = node.type === "OLT" ? 12 : node.type === "Splitter" ? 10 : 8;
  const selectedStroke = isSelected ? "#4f46e5" : sc.stroke;
  const selectedSW = isSelected ? 2.5 : 1.5;

  return (
    <motion.g
      key={node.id}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.012,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      data-ocid={`graph-node-${node.type.toLowerCase()}`}
    >
      {/* Drop shadow */}
      <filter
        id={`shadow-${node.id}`}
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
      >
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="3"
          floodColor={isSelected ? "#4f46e5" : "#94a3b8"}
          floodOpacity={isSelected ? "0.3" : "0.12"}
        />
      </filter>
      {/* Card background */}
      <rect
        x={node.x}
        y={node.y}
        width={NODE_W}
        height={NODE_H}
        rx={rx}
        fill={isSelected ? "#eef2ff" : sc.fill}
        stroke={selectedStroke}
        strokeWidth={selectedSW}
        filter={`url(#shadow-${node.id})`}
      />
      {/* Type color stripe top */}
      <rect
        x={node.x + 1}
        y={node.y + 1}
        width={NODE_W - 2}
        height={4}
        rx={rx - 1}
        fill={tc.bg}
      />
      {/* Top-left type icon circle */}
      <circle
        cx={node.x + 14}
        cy={node.y + NODE_H / 2}
        r={9}
        fill={tc.bg}
        stroke={tc.stroke}
        strokeWidth={1}
      />
      {/* Status dot */}
      <circle
        cx={node.x + NODE_W - 10}
        cy={node.y + 10}
        r={4}
        fill={sc.dot}
        style={
          node.status === "critical"
            ? { filter: "drop-shadow(0 0 4px #ef4444)" }
            : undefined
        }
      />
      {/* Label */}
      <text
        x={node.x + 28}
        y={node.y + NODE_H / 2 - 5}
        fontSize="9.5"
        fontWeight="700"
        fill={sc.text}
        fontFamily="ui-monospace,monospace"
        dominantBaseline="middle"
      >
        {node.label}
      </text>
      {/* Sub-label */}
      <text
        x={node.x + 28}
        y={node.y + NODE_H / 2 + 9}
        fontSize="8"
        fill="#94a3b8"
        fontFamily="ui-monospace,monospace"
        dominantBaseline="middle"
      >
        {node.sublabel}
      </text>
      {/* Type initial */}
      <text
        x={node.x + 14}
        y={node.y + NODE_H / 2}
        fontSize="8"
        fontWeight="800"
        fill={tc.icon}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="ui-monospace,monospace"
      >
        {node.type === "OLT" ? "O" : node.type === "Splitter" ? "S" : "N"}
      </text>
    </motion.g>
  );
}

// ─── Legend ──────────────────────────────────────────────────────────────────
function GraphLegend() {
  const items = [
    { label: "OLT", color: "#4f46e5", bg: "#eef2ff" },
    { label: "Splitter", color: "#ea580c", bg: "#fff7ed" },
    { label: "ONT", color: "#0891b2", bg: "#ecfeff" },
    { label: "Online", color: "#16a34a", bg: "#dcfce7" },
    { label: "Warning", color: "#d97706", bg: "#fef3c7" },
    { label: "Critical", color: "#dc2626", bg: "#fee2e2" },
    { label: "Offline", color: "#64748b", bg: "#f1f5f9" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it.label}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono font-semibold border"
          style={{
            background: it.bg,
            color: it.color,
            borderColor: `${it.color}44`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: it.color }}
          />
          {it.label}
        </span>
      ))}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
interface TopologyGraphProps {
  searchQuery: string;
  filterStatus: string;
  filterType: string;
  selectedId: string | null;
  onSelect: (node: SelectedNode) => void;
}

export function TopologyGraph({
  searchQuery,
  filterStatus,
  filterType,
  selectedId,
  onSelect,
}: TopologyGraphProps) {
  const { nodes, edges, canvasW, canvasH } = buildLayout();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Filter nodes
  const q = searchQuery.toLowerCase();
  const visibleIds = new Set(
    nodes
      .filter((n) => {
        if (
          q &&
          !n.label.toLowerCase().includes(q) &&
          !n.sublabel.toLowerCase().includes(q)
        )
          return false;
        if (filterStatus !== "all" && n.status !== filterStatus) return false;
        if (filterType === "alarms") {
          const alarms =
            n.kind === "olt"
              ? (n.raw as TopoOLT).alarms.length
              : n.kind === "splitter"
                ? (n.raw as TopoSplitter).alarms.length
                : (n.raw as TopoONT).alarms.length;
          if (alarms === 0) return false;
        } else if (
          filterType !== "all" &&
          n.type.toLowerCase() !== filterType.toLowerCase()
        ) {
          return false;
        }
        return true;
      })
      .map((n) => n.id),
  );
  const filteredNodes = nodes.filter((n) => visibleIds.has(n.id));
  const filteredEdges = edges.filter((_e) => {
    if (visibleIds.size === nodes.length) return true;
    return true; // always show all edges but dim irrelevant ones
  });

  // Pan events
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest("[data-ocid]")) return;
    isPanning.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    setPan((p) => ({
      x: p.x + e.clientX - lastPos.current.x,
      y: p.y + e.clientY - lastPos.current.y,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.3, Math.min(2.5, z - e.deltaY * 0.001)));
  }, []);

  function zoomIn() {
    setZoom((z) => Math.min(2.5, z + 0.15));
  }
  function zoomOut() {
    setZoom((z) => Math.max(0.3, z - 0.15));
  }
  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  return (
    <div
      className="flex flex-col h-full min-h-0 topology-light"
      style={{ background: "#f8fafc" }}
    >
      {/* Toolbar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b"
        style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">
            {filteredNodes.length} nodes · {filteredEdges.length} edges
          </span>
          {(q || filterStatus !== "all" || filterType !== "all") && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200">
              filtered
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="w-7 h-7 rounded-lg border flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-mono"
            style={{ borderColor: "#e2e8f0" }}
            data-ocid="graph-zoom-out"
          >
            −
          </button>
          <button
            type="button"
            onClick={resetView}
            className="px-2 h-7 rounded-lg border flex items-center justify-center text-[10px] font-mono text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all min-w-[48px]"
            style={{ borderColor: "#e2e8f0" }}
            data-ocid="graph-zoom-reset"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="w-7 h-7 rounded-lg border flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-mono"
            style={{ borderColor: "#e2e8f0" }}
            data-ocid="graph-zoom-in"
          >
            +
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 overflow-hidden relative select-none"
        style={{ cursor: isPanning.current ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        {/* Dot grid background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#cbd5e1" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        <svg
          ref={svgRef}
          style={{
            display: "block",
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isPanning.current ? "none" : "transform 0.1s",
            width: canvasW,
            height: canvasH,
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -canvasW / 2,
            marginTop: -canvasH / 2,
          }}
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          overflow="visible"
        >
          <title>Network Topology Graph</title>
          {/* Defs for shadows */}
          <defs>
            {nodes.map((n) => (
              <filter
                key={`f-${n.id}`}
                id={`shadow-${n.id}`}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation={selectedId === n.id ? 5 : 2.5}
                  floodColor={selectedId === n.id ? "#4f46e5" : "#94a3b8"}
                  floodOpacity={selectedId === n.id ? "0.35" : "0.12"}
                />
              </filter>
            ))}
          </defs>

          {/* Layer labels */}
          {[
            { y: OLT_Y - 18, label: "Layer 1 — OLT" },
            { y: SPLITTER_Y - 18, label: "Layer 2 — Splitters" },
            { y: ONT_Y - 18, label: "Layer 3 — ONTs" },
          ].map(({ y, label }) => (
            <text
              key={label}
              x={CANVAS_PAD}
              y={y}
              fontSize="9"
              fontWeight="600"
              fill="#94a3b8"
              fontFamily="ui-monospace,monospace"
              letterSpacing="0.08em"
            >
              {label.toUpperCase()}
            </text>
          ))}

          {/* Horizontal tier guide lines */}
          {[OLT_Y - 10, SPLITTER_Y - 10, ONT_Y - 10].map((y) => (
            <line
              key={y}
              x1={CANVAS_PAD}
              y1={y}
              x2={canvasW - CANVAS_PAD}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Edges */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filteredEdges.map((e, i) => {
              const dimmed =
                visibleIds.size < nodes.length &&
                !visibleIds.has(e.id.split("-").slice(1, 3).join("-")) &&
                !visibleIds.has(e.id.split("-").slice(-2).join("-"));
              return (
                <motion.path
                  key={e.id}
                  d={edgePath(e.x1, e.y1, e.x2, e.y2)}
                  fill="none"
                  stroke={edgeColor(e.status)}
                  strokeWidth={1.8}
                  strokeDasharray={e.status === "offline" ? "5 3" : undefined}
                  opacity={dimmed ? 0.2 : 0.85}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: dimmed ? 0.2 : 0.85 }}
                  transition={{ duration: 0.5, delay: i * 0.004 }}
                />
              );
            })}
          </motion.g>

          {/* Nodes */}
          {nodes.map((n, i) => (
            <GraphNode
              key={n.id}
              node={n}
              isSelected={selectedId === n.id}
              onSelect={onSelect}
              index={i}
            />
          ))}

          {/* Dimmed overlay for non-matching nodes */}
          {visibleIds.size < nodes.length &&
            nodes
              .filter((n) => !visibleIds.has(n.id))
              .map((n) => (
                <rect
                  key={`dim-${n.id}`}
                  x={n.x}
                  y={n.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={n.type === "OLT" ? 12 : 8}
                  fill="#f8fafc"
                  opacity="0.6"
                  pointerEvents="none"
                />
              ))}
        </svg>
      </div>

      {/* Legend bar */}
      <div
        className="flex-shrink-0 px-4 py-2 border-t flex items-center gap-3 overflow-x-auto scrollbar-none"
        style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
      >
        <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
          Legend:
        </span>
        <GraphLegend />
        <div className="ml-auto flex-shrink-0 text-[10px] font-mono text-slate-400 hidden sm:block">
          Scroll to zoom · Drag to pan · Click node for details
        </div>
      </div>
    </div>
  );
}
