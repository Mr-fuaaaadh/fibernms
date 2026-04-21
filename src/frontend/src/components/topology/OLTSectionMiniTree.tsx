import type { Device, DeviceStatus } from "@/types/network";
import { motion } from "motion/react";
import { useMemo } from "react";

// ─── Status palette ───────────────────────────────────────────────────────────
const STATUS_COLOR: Record<
  DeviceStatus,
  { stroke: string; fill: string; glow: string }
> = {
  active: {
    stroke: "#22c55e",
    fill: "rgba(34,197,94,0.2)",
    glow: "rgba(34,197,94,0.7)",
  },
  faulty: {
    stroke: "#ef4444",
    fill: "rgba(239,68,68,0.2)",
    glow: "rgba(239,68,68,0.7)",
  },
  warning: {
    stroke: "#eab308",
    fill: "rgba(234,179,8,0.2)",
    glow: "rgba(234,179,8,0.7)",
  },
};

const MAX_SPLITTERS = 5;
const MAX_ONTS_PER_SPL = 3;

// ViewBox dimensions — fixed coordinate space, SVG scales to fit container
const VB_W = 320;
const VB_H = 180;

interface OLTSectionMiniTreeProps {
  olt: Device;
  splitters: Device[];
  onts: Device[];
}

interface LayoutNode {
  device: Device;
  cx: number;
  cy: number;
}

export function OLTSectionMiniTree({
  olt,
  splitters,
  onts,
}: OLTSectionMiniTreeProps) {
  const displaySplitters = splitters.slice(0, MAX_SPLITTERS);
  const extraSplitters = splitters.length - displaySplitters.length;

  const { oltNode, splitterNodes, ontNodes, edges } = useMemo(() => {
    const oltCx = VB_W / 2;
    const oltCy = 30;

    const splCount = displaySplitters.length;
    const splStep = splCount > 1 ? (VB_W - 40) / (splCount - 1) : 0;
    const splStart = splCount > 1 ? 20 : VB_W / 2;
    const splCy = 90;

    const splNodes: LayoutNode[] = displaySplitters.map((s, i) => ({
      device: s,
      cx: splCount === 1 ? splStart : splStart + i * splStep,
      cy: splCy,
    }));

    const ontNodesArr: LayoutNode[] = [];
    const edgePairs: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }[] = [];

    // OLT → Splitter edges
    for (const sn of splNodes) {
      edgePairs.push({
        x1: oltCx,
        y1: oltCy + 14,
        x2: sn.cx,
        y2: sn.cy - 10,
        color: "#06b6d4",
      });
    }

    // Splitter → ONT edges + nodes
    for (const sn of splNodes) {
      const connONTs = onts
        .filter((o) => sn.device.connectedTo.includes(o.id))
        .slice(0, MAX_ONTS_PER_SPL);

      const ontCount = connONTs.length;
      const ontStep = ontCount > 1 ? 36 : 0;
      const ontStartCx = sn.cx - ((ontCount - 1) * ontStep) / 2;

      connONTs.forEach((o, j) => {
        const oCx = ontStartCx + j * ontStep;
        const oCy = 152;
        ontNodesArr.push({ device: o, cx: oCx, cy: oCy });
        edgePairs.push({
          x1: sn.cx,
          y1: sn.cy + 10,
          x2: oCx,
          y2: oCy - 6,
          color: "#a855f7",
        });
      });
    }

    return {
      oltNode: { device: olt, cx: oltCx, cy: oltCy } as LayoutNode,
      splitterNodes: splNodes,
      ontNodes: ontNodesArr,
      edges: edgePairs,
    };
  }, [olt, displaySplitters, onts]);

  function hexPath(cx: number, cy: number, r: number) {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  }

  function diamondPath(cx: number, cy: number, r: number) {
    return `M ${cx},${cy - r} L ${cx + r},${cy} L ${cx},${cy + r} L ${cx - r},${cy} Z`;
  }

  const oltColors = STATUS_COLOR[olt.status];

  return (
    // width="100%" + viewBox = fully responsive, no fixed size
    <div className="w-full">
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label={`Mini tree for ${olt.name}`}
        style={{ display: "block" }}
      >
        <title>{olt.name} network tree</title>

        {/* Edges */}
        {edges.map((e) => (
          <motion.line
            key={`${e.x1}-${e.y1}-${e.x2}-${e.y2}`}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke={e.color}
            strokeWidth={1}
            strokeOpacity={0.5}
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}

        {/* OLT — hexagon */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: `${oltNode.cx}px ${oltNode.cy}px` }}
        >
          <path
            d={hexPath(oltNode.cx, oltNode.cy, 13)}
            fill="#06b6d425"
            stroke="#06b6d4"
            strokeWidth={1.5}
            style={{ filter: "drop-shadow(0 0 6px rgba(6,182,212,0.6))" }}
          />
          <path
            d={hexPath(oltNode.cx, oltNode.cy, 8)}
            fill="none"
            stroke="#06b6d440"
            strokeWidth={0.8}
          />
          {/* Status dot */}
          <circle
            cx={oltNode.cx + 9}
            cy={oltNode.cy - 9}
            r={3}
            fill={oltColors.stroke}
            style={{ filter: `drop-shadow(0 0 3px ${oltColors.glow})` }}
          />
        </motion.g>

        {/* Splitter nodes — diamond */}
        {splitterNodes.map((sn, i) => {
          const sc = STATUS_COLOR[sn.device.status];
          return (
            <motion.g
              key={sn.device.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.1 + i * 0.04,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ transformOrigin: `${sn.cx}px ${sn.cy}px` }}
            >
              <path
                d={diamondPath(sn.cx, sn.cy, 9)}
                fill="#f9731620"
                stroke={sc.stroke}
                strokeWidth={1.2}
                style={{ filter: `drop-shadow(0 0 4px ${sc.glow})` }}
              />
            </motion.g>
          );
        })}

        {/* Extra splitters badge */}
        {extraSplitters > 0 && (
          <text
            x={VB_W - 6}
            y={90}
            textAnchor="end"
            fill="rgba(249,115,22,0.6)"
            fontSize={8}
            fontFamily="var(--font-mono, monospace)"
          >
            +{extraSplitters} more
          </text>
        )}

        {/* ONT nodes — rounded squares */}
        {ontNodes.map((on, i) => {
          const oc = STATUS_COLOR[on.device.status];
          return (
            <motion.g
              key={on.device.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.25,
                delay: 0.2 + i * 0.025,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ transformOrigin: `${on.cx}px ${on.cy}px` }}
            >
              <rect
                x={on.cx - 5}
                y={on.cy - 5}
                width={10}
                height={10}
                rx={2}
                fill="#a855f715"
                stroke={oc.stroke}
                strokeWidth={1}
                style={{ filter: `drop-shadow(0 0 3px ${oc.glow})` }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
