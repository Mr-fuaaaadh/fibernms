import { useIsMobile } from "@/hooks/use-mobile";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import {
  Box,
  GitFork,
  Globe,
  Link2,
  Maximize2,
  MinusCircle,
  Monitor,
  Network,
  PlusCircle,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

// ─── Layout constants ────────────────────────────────────────────────────────
const LEVEL_Y: Record<number, number> = { 0: 100, 1: 280, 2: 460 };
const H_PAD = 80;
const MIN_W_DESKTOP = 1400;
const MIN_W_MOBILE = 800;
const MIN_H = 520;

// ─── Node radius by device type ──────────────────────────────────────────────
const NODE_SIZE: Record<DeviceType, number> = {
  OLT: 22,
  Splitter: 16,
  ONT: 11,
  JJB: 12,
  Switch: 15,
  Coupler: 13,
  Router: 14,
};

// ─── Status palette ──────────────────────────────────────────────────────────
const STATUS_COLOR: Record<
  DeviceStatus,
  { fill: string; stroke: string; glow: string }
> = {
  active: {
    fill: "rgba(34,197,94,0.18)",
    stroke: "#22c55e",
    glow: "rgba(34,197,94,0.7)",
  },
  faulty: {
    fill: "rgba(239,68,68,0.18)",
    stroke: "#ef4444",
    glow: "rgba(239,68,68,0.7)",
  },
  warning: {
    fill: "rgba(234,179,8,0.18)",
    stroke: "#eab308",
    glow: "rgba(234,179,8,0.7)",
  },
};

const TYPE_ACCENT: Partial<Record<DeviceType, string>> = {
  OLT: "#06b6d4",
  Splitter: "#f97316",
  ONT: "#a855f7",
};

const EDGE_COLOR: Record<number, string> = {
  0: "#06b6d4",
  1: "#f97316",
  2: "#a855f7",
};

const ICON_MAP: Record<DeviceType, React.ElementType> = {
  OLT: Monitor,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network,
  Coupler: Link2,
  Router: Globe,
};

// ─── Tree types ───────────────────────────────────────────────────────────────
interface TreeNode {
  device: Device;
  level: number;
  x: number;
  y: number;
  children: TreeNode[];
}

// ─── Tree builder ─────────────────────────────────────────────────────────────
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

function assignPositions(
  roots: TreeNode[],
  isMobile: boolean,
): { w: number; h: number } {
  const minW = isMobile ? MIN_W_MOBILE : MIN_W_DESKTOP;
  const all = flattenNodes(roots);
  const byLevel: Record<number, TreeNode[]> = {};
  for (const n of all) {
    byLevel[n.level] = byLevel[n.level] ?? [];
    byLevel[n.level].push(n);
  }

  let maxW = 0;
  for (const [lvl, nodes] of Object.entries(byLevel)) {
    const nr = NODE_SIZE[nodes[0].device.type] ?? 18;
    const totalW = Math.max(minW, nodes.length * (nr * 2 + H_PAD));
    const step = totalW / (nodes.length + 1);
    nodes.forEach((n, i) => {
      n.x = step * (i + 1);
      n.y = LEVEL_Y[Number(lvl)];
    });
    maxW = Math.max(maxW, totalW);
  }
  for (const nodes of Object.values(byLevel)) {
    const step = maxW / (nodes.length + 1);
    nodes.forEach((n, i) => {
      n.x = step * (i + 1);
    });
  }
  const maxLevel = Math.max(...Object.keys(byLevel).map(Number));
  return { w: maxW, h: Math.max(MIN_H, LEVEL_Y[maxLevel] + 160) };
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
interface TooltipData {
  node: TreeNode;
  x: number;
  y: number;
}

function NodeTooltip({ data }: { data: TooltipData }) {
  const { device } = data.node;
  const colors = STATUS_COLOR[device.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute z-30 pointer-events-none"
      style={{ left: data.x + 16, top: data.y - 60 }}
    >
      <div
        className="rounded-xl px-3 py-2 min-w-[120px]"
        style={{
          background: "rgba(2,8,23,0.95)",
          border: `1px solid ${colors.stroke}40`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${colors.stroke}20`,
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
            style={{ background: `${colors.stroke}20`, color: colors.stroke }}
          >
            {device.type}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: colors.stroke,
              boxShadow: `0 0 6px ${colors.glow}`,
            }}
          />
        </div>
        <p className="text-xs font-mono text-white font-semibold truncate max-w-[120px]">
          {device.name}
        </p>
        {device.signalStrength != null && (
          <p
            className="text-[10px] font-mono mt-1"
            style={{ color: colors.stroke }}
          >
            {device.signalStrength} dBm
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── SVG Node ─────────────────────────────────────────────────────────────────
interface NodeProps {
  node: TreeNode;
  isSelected: boolean;
  onClick: (id: string) => void;
  onHover: (data: TooltipData | null) => void;
  index: number;
  compact?: boolean;
}

function TopologyNode({
  node,
  isSelected,
  onClick,
  onHover,
  index,
  compact,
}: NodeProps) {
  const { device, x, y } = node;
  const Icon = ICON_MAP[device.type] ?? Monitor;
  const baseR = NODE_SIZE[device.type] ?? 14;
  const r = compact ? Math.round(baseR * 0.8) : baseR;
  const colors = STATUS_COLOR[device.status];
  const typeAccent = TYPE_ACCENT[device.type];
  const mainColor = typeAccent ?? colors.stroke;

  function hexPath(cx: number, cy: number, size: number) {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + size * Math.cos(a)},${cy + size * Math.sin(a)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  }

  function diamondPath(cx: number, cy: number, size: number) {
    return `M ${cx},${cy - size} L ${cx + size},${cy} L ${cx},${cy + size} L ${cx - size},${cy} Z`;
  }

  const isOLT = device.type === "OLT";
  const isSplitter = device.type === "Splitter";
  const labelY = y + r + (isOLT ? 18 : 12);
  const fontSize = compact
    ? isOLT
      ? 9
      : isSplitter
        ? 8
        : 7
    : isOLT
      ? 11
      : isSplitter
        ? 10
        : 9;
  const truncName =
    device.name.length > 10 ? `${device.name.slice(0, 10)}…` : device.name;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ transformOrigin: `${x}px ${y}px` }}
      data-ocid={`topology-node-${device.id}`}
    >
      {isSelected && (
        <>
          <motion.circle
            cx={x}
            cy={y}
            r={r + 12}
            fill="none"
            stroke={mainColor}
            strokeWidth={1}
            opacity={0.3}
            animate={{ r: [r + 10, r + 18, r + 10], opacity: [0.3, 0.05, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <circle
            cx={x}
            cy={y}
            r={r + 6}
            fill="none"
            stroke={mainColor}
            strokeWidth={1.5}
            opacity={0.5}
          />
        </>
      )}
      {!isSelected && (
        <circle
          cx={x}
          cy={y}
          r={r + 8}
          fill={`${mainColor}08`}
          stroke={`${mainColor}20`}
          strokeWidth={1}
        />
      )}

      {isOLT ? (
        <>
          <path
            d={hexPath(x, y, r)}
            fill={`${mainColor}25`}
            stroke={isSelected ? mainColor : `${mainColor}90`}
            strokeWidth={isSelected ? 2.5 : 1.5}
            filter={
              isSelected
                ? `drop-shadow(0 0 10px ${mainColor})`
                : `drop-shadow(0 0 4px ${mainColor}60)`
            }
          />
          <path
            d={hexPath(x, y, r * 0.65)}
            fill="none"
            stroke={`${mainColor}40`}
            strokeWidth={0.8}
          />
        </>
      ) : isSplitter ? (
        <path
          d={diamondPath(x, y, r)}
          fill={`${mainColor}20`}
          stroke={isSelected ? mainColor : `${mainColor}80`}
          strokeWidth={isSelected ? 2.5 : 1.5}
          filter={
            isSelected
              ? `drop-shadow(0 0 8px ${mainColor})`
              : `drop-shadow(0 0 3px ${mainColor}50)`
          }
        />
      ) : (
        <rect
          x={x - r}
          y={y - r}
          width={r * 2}
          height={r * 2}
          rx={r * 0.4}
          fill={`${mainColor}18`}
          stroke={isSelected ? mainColor : `${mainColor}70`}
          strokeWidth={isSelected ? 2 : 1.2}
          filter={isSelected ? `drop-shadow(0 0 6px ${mainColor})` : undefined}
        />
      )}

      <circle
        cx={x + r * 0.68}
        cy={y - r * 0.68}
        r={r * 0.28}
        fill={colors.stroke}
        style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}
      />

      <foreignObject
        x={x - r * 0.65}
        y={y - r * 0.65}
        width={r * 1.3}
        height={r * 1.3}
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
              width: r * 0.85,
              height: r * 0.85,
              color: mainColor,
              flexShrink: 0,
            }}
          />
        </div>
      </foreignObject>

      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        fill={isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)"}
        fontSize={fontSize}
        fontFamily="var(--font-mono, monospace)"
        fontWeight={isSelected ? 700 : 400}
        style={{
          filter: isSelected ? `drop-shadow(0 0 8px ${mainColor})` : undefined,
        }}
      >
        {truncName}
      </text>

      {isOLT && !compact && (
        <text
          x={x}
          y={labelY + 12}
          textAnchor="middle"
          fill={`${mainColor}60`}
          fontSize={8}
          fontFamily="var(--font-mono, monospace)"
        >
          {device.type}
        </text>
      )}

      <circle
        cx={x}
        cy={y}
        r={r + 16}
        fill="transparent"
        style={{ cursor: "pointer" }}
        onClick={() => onClick(device.id)}
        onMouseEnter={(e) => {
          const svgEl = (e.target as Element).closest(
            "svg",
          ) as SVGSVGElement | null;
          if (!svgEl) return;
          const pt = svgEl.createSVGPoint();
          pt.x = e.clientX;
          pt.y = e.clientY;
          const sp = pt.matrixTransform(svgEl.getScreenCTM()?.inverse());
          onHover({ node, x: sp.x, y: sp.y });
        }}
        onMouseLeave={() => onHover(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick(device.id);
        }}
        tabIndex={0}
        aria-label={`Select node ${device.name} (${device.type}, ${device.status})`}
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
  animated?: boolean;
}

function TopologyEdge({ from, to, index, animated = true }: EdgeProps) {
  const my = (from.y + to.y) / 2;
  const edgeColor = EDGE_COLOR[from.level] ?? EDGE_COLOR[0];
  const d = `M ${from.x} ${from.y} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${to.y}`;
  const edgeLen = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
  const dotOffset = (index * 137) % edgeLen;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={edgeColor}
        strokeWidth={3}
        opacity={0.08}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: index * 0.02, ease: "easeOut" }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={edgeColor}
        strokeWidth={1.5}
        opacity={0.5}
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: index * 0.025, ease: "easeOut" }}
      />
      {animated && (
        <>
          <circle
            r={2.5}
            fill={edgeColor}
            opacity={0.9}
            style={{ filter: `drop-shadow(0 0 4px ${edgeColor})` }}
          >
            <animateMotion
              dur={`${2.5 + (dotOffset % 2)}s`}
              repeatCount="indefinite"
              begin={`${(index * 0.3) % 3}s`}
            >
              <mpath href={`#edge-path-${index}`} />
            </animateMotion>
          </circle>
          <defs>
            <path id={`edge-path-${index}`} d={d} />
          </defs>
        </>
      )}
    </g>
  );
}

// ─── Minimap ──────────────────────────────────────────────────────────────────
interface MinimapProps {
  allNodes: TreeNode[];
  totalW: number;
  totalH: number;
  small?: boolean;
}

function Minimap({ allNodes, totalW, totalH, small }: MinimapProps) {
  const W = small ? 100 : 160;
  const H = small ? 60 : 100;
  const scaleX = W / totalW;
  const scaleY = H / totalH;
  return (
    <div
      className="absolute z-20 rounded-xl overflow-hidden"
      style={{
        bottom: 16,
        right: 16,
        background: "rgba(2,8,23,0.85)",
        border: "1px solid rgba(6,182,212,0.2)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      {!small && (
        <div className="px-2 py-1 border-b border-white/10">
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
            Minimap
          </span>
        </div>
      )}
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        aria-label="Network topology minimap"
      >
        <title>Minimap overview</title>
        {allNodes.map((n) => {
          const mainColor =
            TYPE_ACCENT[n.device.type] ?? STATUS_COLOR[n.device.status].stroke;
          return (
            <circle
              key={n.device.id}
              cx={n.x * scaleX}
              cy={n.y * scaleY}
              r={
                n.device.type === "OLT"
                  ? 3
                  : n.device.type === "Splitter"
                    ? 2
                    : 1.5
              }
              fill={mainColor}
              opacity={0.8}
              style={{ filter: `drop-shadow(0 0 2px ${mainColor})` }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ─── Main graph ───────────────────────────────────────────────────────────────
export function TopologyGraph() {
  const isMobile = useIsMobile(768);
  const devices = useNetworkStore((s) => s.devices);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);

  const roots = buildTree(devices);
  const dims = assignPositions(roots, isMobile);
  const allNodes = flattenNodes(roots);

  const edges: { from: TreeNode; to: TreeNode }[] = [];
  function collectEdges(n: TreeNode) {
    for (const c of n.children) {
      edges.push({ from: n, to: c });
      collectEdges(c);
    }
  }
  for (const r of roots) collectEdges(r);

  const [zoom, setZoom] = useState(1);
  const [showMinimap, setShowMinimap] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.2, 3)), []);
  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(z - 0.2, 0.25)),
    [],
  );
  const fitView = useCallback(() => setZoom(1), []);

  const handleNodeClick = useCallback(
    (id: string) => {
      setSelectedDevice(selectedDeviceId === id ? null : id);
    },
    [selectedDeviceId, setSelectedDevice],
  );

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 40% 30%, #0d1729 0%, #020817 70%)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mobile scroll hint */}
      {isMobile && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono text-white/40"
            style={{
              background: "rgba(2,8,23,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ← Scroll to pan →
          </div>
        </div>
      )}

      {/* Zoom controls */}
      <div
        className={`absolute z-20 flex items-center gap-1 px-2 py-1.5 rounded-xl ${
          isMobile ? "bottom-4 right-4" : "top-4 right-4"
        }`}
        style={{
          background: "rgba(2,8,23,0.85)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          data-ocid="topology-zoom-out"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors"
        >
          <MinusCircle className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono text-white/40 w-8 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          data-ocid="topology-zoom-in"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-white/10 mx-0.5" />
        <button
          type="button"
          onClick={fitView}
          aria-label="Fit to view"
          data-ocid="topology-fit-view"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        {!isMobile && (
          <>
            <div className="w-px h-4 bg-white/10 mx-0.5" />
            <button
              type="button"
              onClick={() => setShowMinimap((v) => !v)}
              aria-label="Toggle minimap"
              data-ocid="topology-toggle-minimap"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-[9px] font-mono font-bold ${showMinimap ? "text-cyan-400" : "text-white/30"}`}
            >
              MAP
            </button>
          </>
        )}
      </div>

      {/* Level legend — hidden on mobile */}
      {!isMobile && (
        <div
          className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 rounded-xl px-3 py-2.5"
          style={{
            background: "rgba(2,8,23,0.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-0.5">
            Hierarchy
          </p>
          {[
            { label: "OLT — Core", color: "#06b6d4" },
            { label: "Splitter — Dist.", color: "#f97316" },
            { label: "ONT — Endpoint", color: "#a855f7" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-5 h-0.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
              />
              <span
                className="text-[10px] font-mono"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <NodeTooltip data={tooltip} />
        </div>
      )}

      {/* SVG canvas — horizontally scrollable on mobile */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto"
        style={{
          scrollbarColor: "rgba(6,182,212,0.2) transparent",
          minHeight: isMobile ? "400px" : undefined,
        }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <svg
            width={dims.w}
            height={dims.h}
            viewBox={`0 0 ${dims.w} ${dims.h}`}
            aria-label="Network topology graph"
            style={{ display: "block", margin: "0 auto" }}
          >
            <title>Network Topology Graph</title>
            <defs>
              <linearGradient
                id="level-line-l1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="level-line-l2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="level-line-l3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect
              x={0}
              y={LEVEL_Y[0] - 40}
              width={dims.w}
              height={80}
              fill="url(#level-line-l1)"
              opacity={0.5}
            />
            <rect
              x={0}
              y={LEVEL_Y[1] - 40}
              width={dims.w}
              height={80}
              fill="url(#level-line-l2)"
              opacity={0.5}
            />
            <rect
              x={0}
              y={LEVEL_Y[2] - 40}
              width={dims.w}
              height={80}
              fill="url(#level-line-l3)"
              opacity={0.5}
            />

            {[
              { y: LEVEL_Y[0], label: "L1 — BACKBONE", color: "#06b6d4" },
              { y: LEVEL_Y[1], label: "L2 — DISTRIBUTION", color: "#f97316" },
              { y: LEVEL_Y[2], label: "L3 — ACCESS", color: "#a855f7" },
            ].map(({ y, label, color }) => (
              <text
                key={label}
                x={dims.w - 20}
                y={y + 5}
                textAnchor="end"
                fill={color}
                fontSize={isMobile ? 8 : 9}
                fontFamily="var(--font-mono, monospace)"
                opacity={0.4}
                letterSpacing={1}
              >
                {label}
              </text>
            ))}

            {edges.map(({ from, to }, i) => (
              <TopologyEdge
                key={`${from.device.id}-${to.device.id}`}
                from={from}
                to={to}
                index={i}
                animated={i < 40}
              />
            ))}

            {allNodes.map((node, i) => (
              <TopologyNode
                key={node.device.id}
                node={node}
                isSelected={selectedDeviceId === node.device.id}
                onClick={handleNodeClick}
                onHover={setTooltip}
                index={i}
                compact={isMobile}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Minimap */}
      {showMinimap && (
        <Minimap
          allNodes={allNodes}
          totalW={dims.w}
          totalH={dims.h}
          small={isMobile}
        />
      )}
    </div>
  );
}
