import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import {
  Box,
  GitFork,
  Maximize2,
  Network,
  Router,
  Wifi,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

// ─── Layout constants ────────────────────────────────────────────────────────
const LEVEL_Y: Record<number, number> = { 0: 80, 1: 240, 2: 400 };
const NODE_R = 28;
const H_PAD = 90;
const MIN_W = 1200;
const MIN_H = 500;

// ─── Status colors ────────────────────────────────────────────────────────────
const STATUS_FILL: Record<DeviceStatus, string> = {
  active: "oklch(0.62 0.22 142 / 0.22)",
  faulty: "oklch(0.62 0.28 22 / 0.22)",
  warning: "oklch(0.7 0.25 55 / 0.22)",
};
const STATUS_STROKE: Record<DeviceStatus, string> = {
  active: "oklch(0.62 0.22 142)",
  faulty: "oklch(0.62 0.28 22)",
  warning: "oklch(0.7 0.25 55)",
};
const STATUS_GLOW: Record<DeviceStatus, string> = {
  active: "oklch(0.62 0.22 142 / 0.7)",
  faulty: "oklch(0.62 0.28 22 / 0.7)",
  warning: "oklch(0.7 0.25 55 / 0.7)",
};

// ─── Edge colors by route type ────────────────────────────────────────────────
const LEVEL_EDGE_STROKE: Record<number, string> = {
  0: "oklch(0.72 0.22 210)", // backbone – cyan
  1: "oklch(0.60 0.22 264)", // distribution – blue
  2: "oklch(0.62 0.22 142)", // drop – green
};

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<DeviceType, React.ElementType> = {
  OLT: Router,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network,
};

// ─── Tree node ────────────────────────────────────────────────────────────────
interface TreeNode {
  device: Device;
  level: number;
  x: number;
  y: number;
  children: TreeNode[];
}

function buildTree(devices: Device[]): TreeNode[] {
  const olts = devices.filter((d) => d.type === "OLT");
  const splitters = devices.filter((d) => d.type === "Splitter");
  const onts = devices.filter((d) => d.type === "ONT");

  const roots: TreeNode[] = olts.map((olt) => ({
    device: olt,
    level: 0,
    x: 0,
    y: LEVEL_Y[0],
    children: olt.connectedTo
      .map((sid) => {
        const spl = splitters.find((s) => s.id === sid);
        if (!spl) return null;
        return {
          device: spl,
          level: 1,
          x: 0,
          y: LEVEL_Y[1],
          children: spl.connectedTo
            .map((oid) => {
              const ont = onts.find((o) => o.id === oid);
              if (!ont) return null;
              return {
                device: ont,
                level: 2,
                x: 0,
                y: LEVEL_Y[2],
                children: [],
              } as TreeNode;
            })
            .filter(Boolean) as TreeNode[],
        } as TreeNode;
      })
      .filter(Boolean) as TreeNode[],
  }));

  // Fallback: splitters not parented by any OLT
  const parentedSplIds = new Set(
    roots.flatMap((r) => r.children.map((c) => c.device.id)),
  );
  const orphanSplitters = splitters.filter((s) => !parentedSplIds.has(s.id));
  if (orphanSplitters.length > 0 && roots.length > 0) {
    for (const s of orphanSplitters) {
      roots[0].children.push({
        device: s,
        level: 1,
        x: 0,
        y: LEVEL_Y[1],
        children: s.connectedTo
          .map((oid) => {
            const ont = onts.find((o) => o.id === oid);
            if (!ont) return null;
            return {
              device: ont,
              level: 2,
              x: 0,
              y: LEVEL_Y[2],
              children: [],
            } as TreeNode;
          })
          .filter(Boolean) as TreeNode[],
      });
    }
  }

  return roots;
}

function flattenNodes(roots: TreeNode[]): TreeNode[] {
  const out: TreeNode[] = [];
  function walk(n: TreeNode) {
    out.push(n);
    for (const c of n.children) walk(c);
  }
  for (const r of roots) walk(r);
  return out;
}

function assignPositions(roots: TreeNode[]): { w: number; h: number } {
  const all = flattenNodes(roots);
  const byLevel: Record<number, TreeNode[]> = {};
  for (const n of all) {
    byLevel[n.level] = byLevel[n.level] ?? [];
    byLevel[n.level].push(n);
  }

  let maxW = 0;
  for (const [lvl, nodes] of Object.entries(byLevel)) {
    const count = nodes.length;
    const totalW = Math.max(MIN_W, count * (NODE_R * 2 + H_PAD));
    const step = totalW / (count + 1);
    nodes.forEach((n, i) => {
      n.x = step * (i + 1);
      n.y = LEVEL_Y[Number(lvl)];
    });
    maxW = Math.max(maxW, totalW);
  }

  // Re-pass: set all nodes to the same total width
  for (const nodes of Object.values(byLevel)) {
    const step = maxW / (nodes.length + 1);
    nodes.forEach((n, i) => {
      n.x = step * (i + 1);
    });
  }

  const maxLevel = Math.max(...Object.keys(byLevel).map(Number));
  const h = Math.max(MIN_H, LEVEL_Y[maxLevel] + 140);
  return { w: maxW, h };
}

// ─── SVG Node ─────────────────────────────────────────────────────────────────
interface NodeProps {
  node: TreeNode;
  isSelected: boolean;
  onClick: (id: string) => void;
  index: number;
}

function TopologyNode({ node, isSelected, onClick, index }: NodeProps) {
  const { device } = node;
  const Icon = ICON_MAP[device.type] ?? Router;
  const fill = STATUS_FILL[device.status];
  const stroke = STATUS_STROKE[device.status];
  const glowColor = STATUS_GLOW[device.status];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
      data-ocid={`topology-node-${device.id}`}
    >
      {/* Selected ring glow */}
      {isSelected && (
        <circle
          cx={node.x}
          cy={node.y}
          r={NODE_R + 8}
          fill="none"
          stroke={glowColor}
          strokeWidth={2}
          opacity={0.6}
        >
          <animate
            attributeName="r"
            values={`${NODE_R + 6};${NODE_R + 12};${NODE_R + 6}`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Outer ring */}
      <circle
        cx={node.x}
        cy={node.y}
        r={NODE_R + 4}
        fill="none"
        stroke={stroke}
        strokeWidth={isSelected ? 2 : 1}
        opacity={isSelected ? 0.7 : 0.25}
      />

      {/* Main circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={NODE_R}
        fill={fill}
        stroke={stroke}
        strokeWidth={isSelected ? 2.5 : 1.5}
        filter={isSelected ? `drop-shadow(0 0 8px ${glowColor})` : undefined}
      />

      {/* Icon via foreignObject */}
      <foreignObject
        x={node.x - 12}
        y={node.y - 12}
        width={24}
        height={24}
        style={{ overflow: "visible", pointerEvents: "none" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Icon
            style={{
              width: 16,
              height: 16,
              color: stroke,
              flexShrink: 0,
            }}
          />
        </div>
      </foreignObject>

      {/* Label */}
      <text
        x={node.x}
        y={node.y + NODE_R + 16}
        textAnchor="middle"
        fill="oklch(0.85 0.005 260)"
        fontSize={10}
        fontFamily="var(--font-mono, monospace)"
        fontWeight={isSelected ? 700 : 400}
      >
        {device.name}
      </text>

      {/* Type label */}
      <text
        x={node.x}
        y={node.y + NODE_R + 27}
        textAnchor="middle"
        fill="oklch(0.52 0.008 260)"
        fontSize={9}
        fontFamily="var(--font-mono, monospace)"
      >
        {device.type}
      </text>

      {/* Transparent click overlay */}
      <circle
        cx={node.x}
        cy={node.y}
        r={NODE_R + 14}
        fill="transparent"
        style={{ cursor: "pointer" }}
        onClick={() => onClick(device.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick(device.id);
        }}
        tabIndex={0}
        aria-label={`Select node ${device.name}`}
        role="button"
      />
    </motion.g>
  );
}

// ─── SVG Edge ─────────────────────────────────────────────────────────────────
interface EdgeProps {
  from: TreeNode;
  to: TreeNode;
  index: number;
}

function TopologyEdge({ from, to, index }: EdgeProps) {
  const my = (from.y + to.y) / 2;
  const edgeColor = LEVEL_EDGE_STROKE[from.level] ?? LEVEL_EDGE_STROKE[0];

  const d = `M ${from.x} ${from.y + NODE_R}
             C ${from.x} ${my},
               ${to.x} ${my},
               ${to.x} ${to.y - NODE_R}`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={edgeColor}
      strokeWidth={2}
      opacity={0.55}
      strokeDasharray="4 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.55 }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: "easeOut" }}
    />
  );
}

// ─── Level legend ─────────────────────────────────────────────────────────────
const LEVEL_LABELS: Record<number, string> = {
  0: "OLT — Core Nodes",
  1: "Splitters — Distribution",
  2: "ONT — Endpoints",
};

// ─── Main graph ───────────────────────────────────────────────────────────────
export function TopologyGraph() {
  const devices = useNetworkStore((s) => s.devices);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);

  const roots = buildTree(devices);
  const dims = assignPositions(roots);
  const allNodes = flattenNodes(roots);

  // Build edge list
  const edges: { from: TreeNode; to: TreeNode }[] = [];
  function collectEdges(n: TreeNode) {
    for (const c of n.children) {
      edges.push({ from: n, to: c });
      collectEdges(c);
    }
  }
  for (const r of roots) collectEdges(r);

  // Zoom / pan
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.2, 2.5)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.2, 0.3)), []);
  const fitView = useCallback(() => setZoom(1), []);

  const handleNodeClick = useCallback(
    (id: string) => {
      setSelectedDevice(selectedDeviceId === id ? null : id);
    },
    [selectedDeviceId, setSelectedDevice],
  );

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
        {[
          {
            icon: ZoomIn,
            fn: zoomIn,
            ocid: "topology-zoom-in",
            label: "Zoom in",
          },
          {
            icon: ZoomOut,
            fn: zoomOut,
            ocid: "topology-zoom-out",
            label: "Zoom out",
          },
          {
            icon: Maximize2,
            fn: fitView,
            ocid: "topology-fit-view",
            label: "Fit to view",
          },
        ].map(({ icon: Icon, fn, ocid, label }) => (
          <button
            key={ocid}
            type="button"
            onClick={fn}
            aria-label={label}
            data-ocid={ocid}
            className="w-8 h-8 rounded-lg glass-elevated flex items-center justify-center text-muted-foreground hover:text-primary transition-smooth hover:noc-glow"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Level legend */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {Object.entries(LEVEL_LABELS).map(([lvl, label]) => (
          <div key={lvl} className="flex items-center gap-2">
            <span
              className="w-6 h-0.5 rounded-full"
              style={{
                background: LEVEL_EDGE_STROKE[Number(lvl)],
                boxShadow: `0 0 6px ${LEVEL_EDGE_STROKE[Number(lvl)]}`,
              }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* SVG canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto noc-scrollbar"
        style={{ scrollbarGutter: "stable" }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <svg
            width={dims.w}
            height={dims.h}
            viewBox={`0 0 ${String(dims.w)} ${String(dims.h)}`}
            aria-label="Network topology graph"
            style={{ display: "block", margin: "0 auto" }}
          >
            <title>Network Topology Graph</title>
            {/* Grid lines */}
            <defs>
              <pattern
                id="topo-grid"
                width={60}
                height={60}
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="oklch(0.26 0.01 265 / 0.35)"
                  strokeWidth={0.5}
                />
              </pattern>
            </defs>
            <rect width={dims.w} height={dims.h} fill="url(#topo-grid)" />

            {/* Level separator lines */}
            {Object.entries(LEVEL_Y).map(([lvl, y]) => (
              <line
                key={lvl}
                x1={40}
                y1={y}
                x2={dims.w - 40}
                y2={y}
                stroke={LEVEL_EDGE_STROKE[Number(lvl)]}
                strokeWidth={0.5}
                strokeDasharray="8 8"
                opacity={0.18}
              />
            ))}

            {/* Edges */}
            {edges.map(({ from, to }, i) => (
              <TopologyEdge
                key={`${from.device.id}-${to.device.id}`}
                from={from}
                to={to}
                index={i}
              />
            ))}

            {/* Nodes */}
            {allNodes.map((node, i) => (
              <TopologyNode
                key={node.device.id}
                node={node}
                isSelected={selectedDeviceId === node.device.id}
                onClick={handleNodeClick}
                index={i}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
