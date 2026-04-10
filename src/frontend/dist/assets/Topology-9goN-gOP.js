import { c as createLucideIcon, u as useNetworkStore, r as reactExports, j as jsxRuntimeExports, m as motion, G as GitFork, A as AnimatePresence, X, T as TriangleAlert, f as Activity, R as Radio } from "./index-BwSs_aWH.js";
import { G as GlassCard } from "./GlassCard-CLBOZOiN.js";
import { N as Network, B as Box, R as Router, D as DeviceIcon, S as StatusBadge } from "./StatusBadge-B44PUdkO.js";
import { W as Wifi } from "./wifi-BvV6kFKc.js";
import { C as CircleCheck, S as Signal, M as MapPin } from "./signal-eMrhBffk.js";
import { C as CircleX } from "./circle-x-CiTK5a2S.js";
import { C as Cpu } from "./cpu-FQ0KFUma.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
];
const GitBranch = createLucideIcon("git-branch", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomOut = createLucideIcon("zoom-out", __iconNode);
const LEVEL_Y = { 0: 80, 1: 240, 2: 400 };
const NODE_R = 28;
const H_PAD = 90;
const MIN_W = 1200;
const MIN_H = 500;
const STATUS_FILL = {
  active: "oklch(0.62 0.22 142 / 0.22)",
  faulty: "oklch(0.62 0.28 22 / 0.22)",
  warning: "oklch(0.7 0.25 55 / 0.22)"
};
const STATUS_STROKE = {
  active: "oklch(0.62 0.22 142)",
  faulty: "oklch(0.62 0.28 22)",
  warning: "oklch(0.7 0.25 55)"
};
const STATUS_GLOW = {
  active: "oklch(0.62 0.22 142 / 0.7)",
  faulty: "oklch(0.62 0.28 22 / 0.7)",
  warning: "oklch(0.7 0.25 55 / 0.7)"
};
const LEVEL_EDGE_STROKE = {
  0: "oklch(0.72 0.22 210)",
  // backbone – cyan
  1: "oklch(0.60 0.22 264)",
  // distribution – blue
  2: "oklch(0.62 0.22 142)"
  // drop – green
};
const ICON_MAP = {
  OLT: Router,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network
};
function buildTree(devices) {
  const olts = devices.filter((d) => d.type === "OLT");
  const splitters = devices.filter((d) => d.type === "Splitter");
  const onts = devices.filter((d) => d.type === "ONT");
  const roots = olts.map((olt) => ({
    device: olt,
    level: 0,
    x: 0,
    y: LEVEL_Y[0],
    children: olt.connectedTo.map((sid) => {
      const spl = splitters.find((s) => s.id === sid);
      if (!spl) return null;
      return {
        device: spl,
        level: 1,
        x: 0,
        y: LEVEL_Y[1],
        children: spl.connectedTo.map((oid) => {
          const ont = onts.find((o) => o.id === oid);
          if (!ont) return null;
          return {
            device: ont,
            level: 2,
            x: 0,
            y: LEVEL_Y[2],
            children: []
          };
        }).filter(Boolean)
      };
    }).filter(Boolean)
  }));
  const parentedSplIds = new Set(
    roots.flatMap((r) => r.children.map((c) => c.device.id))
  );
  const orphanSplitters = splitters.filter((s) => !parentedSplIds.has(s.id));
  if (orphanSplitters.length > 0 && roots.length > 0) {
    for (const s of orphanSplitters) {
      roots[0].children.push({
        device: s,
        level: 1,
        x: 0,
        y: LEVEL_Y[1],
        children: s.connectedTo.map((oid) => {
          const ont = onts.find((o) => o.id === oid);
          if (!ont) return null;
          return {
            device: ont,
            level: 2,
            x: 0,
            y: LEVEL_Y[2],
            children: []
          };
        }).filter(Boolean)
      });
    }
  }
  return roots;
}
function flattenNodes(roots) {
  const out = [];
  function walk(n) {
    out.push(n);
    for (const c of n.children) walk(c);
  }
  for (const r of roots) walk(r);
  return out;
}
function assignPositions(roots) {
  const all = flattenNodes(roots);
  const byLevel = {};
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
function TopologyNode({ node, isSelected, onClick, index }) {
  const { device } = node;
  const Icon = ICON_MAP[device.type] ?? Router;
  const fill = STATUS_FILL[device.status];
  const stroke = STATUS_STROKE[device.status];
  const glowColor = STATUS_GLOW[device.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.g,
    {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1]
      },
      style: { transformOrigin: `${node.x}px ${node.y}px` },
      "data-ocid": `topology-node-${device.id}`,
      children: [
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "circle",
          {
            cx: node.x,
            cy: node.y,
            r: NODE_R + 8,
            fill: "none",
            stroke: glowColor,
            strokeWidth: 2,
            opacity: 0.6,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "animate",
                {
                  attributeName: "r",
                  values: `${NODE_R + 6};${NODE_R + 12};${NODE_R + 6}`,
                  dur: "2s",
                  repeatCount: "indefinite"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "animate",
                {
                  attributeName: "opacity",
                  values: "0.6;0.2;0.6",
                  dur: "2s",
                  repeatCount: "indefinite"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: node.x,
            cy: node.y,
            r: NODE_R + 4,
            fill: "none",
            stroke,
            strokeWidth: isSelected ? 2 : 1,
            opacity: isSelected ? 0.7 : 0.25
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: node.x,
            cy: node.y,
            r: NODE_R,
            fill,
            stroke,
            strokeWidth: isSelected ? 2.5 : 1.5,
            filter: isSelected ? `drop-shadow(0 0 8px ${glowColor})` : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "foreignObject",
          {
            x: node.x - 12,
            y: node.y - 12,
            width: 24,
            height: 24,
            style: { overflow: "visible", pointerEvents: "none" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    style: {
                      width: 16,
                      height: 16,
                      color: stroke,
                      flexShrink: 0
                    }
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: node.x,
            y: node.y + NODE_R + 16,
            textAnchor: "middle",
            fill: "oklch(0.85 0.005 260)",
            fontSize: 10,
            fontFamily: "var(--font-mono, monospace)",
            fontWeight: isSelected ? 700 : 400,
            children: device.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: node.x,
            y: node.y + NODE_R + 27,
            textAnchor: "middle",
            fill: "oklch(0.52 0.008 260)",
            fontSize: 9,
            fontFamily: "var(--font-mono, monospace)",
            children: device.type
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: node.x,
            cy: node.y,
            r: NODE_R + 14,
            fill: "transparent",
            style: { cursor: "pointer" },
            onClick: () => onClick(device.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") onClick(device.id);
            },
            tabIndex: 0,
            "aria-label": `Select node ${device.name}`,
            role: "button"
          }
        )
      ]
    }
  );
}
function TopologyEdge({ from, to, index }) {
  const my = (from.y + to.y) / 2;
  const edgeColor = LEVEL_EDGE_STROKE[from.level] ?? LEVEL_EDGE_STROKE[0];
  const d = `M ${from.x} ${from.y + NODE_R}
             C ${from.x} ${my},
               ${to.x} ${my},
               ${to.x} ${to.y - NODE_R}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.path,
    {
      d,
      fill: "none",
      stroke: edgeColor,
      strokeWidth: 2,
      opacity: 0.55,
      strokeDasharray: "4 3",
      initial: { pathLength: 0, opacity: 0 },
      animate: { pathLength: 1, opacity: 0.55 },
      transition: { duration: 0.5, delay: index * 0.03, ease: "easeOut" }
    }
  );
}
const LEVEL_LABELS = {
  0: "OLT — Core Nodes",
  1: "Splitters — Distribution",
  2: "ONT — Endpoints"
};
function TopologyGraph() {
  const devices = useNetworkStore((s) => s.devices);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const roots = buildTree(devices);
  const dims = assignPositions(roots);
  const allNodes = flattenNodes(roots);
  const edges = [];
  function collectEdges(n) {
    for (const c of n.children) {
      edges.push({ from: n, to: c });
      collectEdges(c);
    }
  }
  for (const r of roots) collectEdges(r);
  const [zoom, setZoom] = reactExports.useState(1);
  const containerRef = reactExports.useRef(null);
  const zoomIn = reactExports.useCallback(() => setZoom((z) => Math.min(z + 0.2, 2.5)), []);
  const zoomOut = reactExports.useCallback(() => setZoom((z) => Math.max(z - 0.2, 0.3)), []);
  const fitView = reactExports.useCallback(() => setZoom(1), []);
  const handleNodeClick = reactExports.useCallback(
    (id) => {
      setSelectedDevice(selectedDeviceId === id ? null : id);
    },
    [selectedDeviceId, setSelectedDevice]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-10 flex flex-col gap-1", children: [
      {
        icon: ZoomIn,
        fn: zoomIn,
        ocid: "topology-zoom-in",
        label: "Zoom in"
      },
      {
        icon: ZoomOut,
        fn: zoomOut,
        ocid: "topology-zoom-out",
        label: "Zoom out"
      },
      {
        icon: Maximize2,
        fn: fitView,
        ocid: "topology-fit-view",
        label: "Fit to view"
      }
    ].map(({ icon: Icon, fn, ocid, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: fn,
        "aria-label": label,
        "data-ocid": ocid,
        className: "w-8 h-8 rounded-lg glass-elevated flex items-center justify-center text-muted-foreground hover:text-primary transition-smooth hover:noc-glow",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
      },
      ocid
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 z-10 flex flex-col gap-1.5", children: Object.entries(LEVEL_LABELS).map(([lvl, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-6 h-0.5 rounded-full",
          style: {
            background: LEVEL_EDGE_STROKE[Number(lvl)],
            boxShadow: `0 0 6px ${LEVEL_EDGE_STROKE[Number(lvl)]}`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: label })
    ] }, lvl)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: containerRef,
        className: "flex-1 overflow-auto noc-scrollbar",
        style: { scrollbarGutter: "stable" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: dims.w,
                height: dims.h,
                viewBox: `0 0 ${String(dims.w)} ${String(dims.h)}`,
                "aria-label": "Network topology graph",
                style: { display: "block", margin: "0 auto" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Network Topology Graph" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "pattern",
                    {
                      id: "topo-grid",
                      width: 60,
                      height: 60,
                      patternUnits: "userSpaceOnUse",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M 60 0 L 0 0 0 60",
                          fill: "none",
                          stroke: "oklch(0.26 0.01 265 / 0.35)",
                          strokeWidth: 0.5
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: dims.w, height: dims.h, fill: "url(#topo-grid)" }),
                  Object.entries(LEVEL_Y).map(([lvl, y]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: 40,
                      y1: y,
                      x2: dims.w - 40,
                      y2: y,
                      stroke: LEVEL_EDGE_STROKE[Number(lvl)],
                      strokeWidth: 0.5,
                      strokeDasharray: "8 8",
                      opacity: 0.18
                    },
                    lvl
                  )),
                  edges.map(({ from, to }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TopologyEdge,
                    {
                      from,
                      to,
                      index: i
                    },
                    `${from.device.id}-${to.device.id}`
                  )),
                  allNodes.map((node, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TopologyNode,
                    {
                      node,
                      isSelected: selectedDeviceId === node.device.id,
                      onClick: handleNodeClick,
                      index: i
                    },
                    node.device.id
                  ))
                ]
              }
            )
          }
        )
      }
    )
  ] });
}
function MetricRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border/30 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-metric text-foreground", children: value })
  ] });
}
function TopologyNodePanel({ device }) {
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const devices = useNetworkStore((s) => s.devices);
  const connectedDevices = device ? device.connectedTo.map((cid) => devices.find((d) => d.id === cid)).filter(Boolean) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: device ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { x: 40, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 40, opacity: 0 },
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      className: "w-72 flex-shrink-0",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between p-4 border-b border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DeviceIcon,
              {
                type: device.type,
                status: device.status,
                size: "lg"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono mb-0.5", children: device.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display text-sm font-semibold text-foreground truncate",
                  title: device.name,
                  children: device.name
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedDevice(null),
              className: "p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth flex-shrink-0 ml-2",
              "aria-label": "Close panel",
              "data-ocid": "topology-panel-close",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center gap-2 border-b border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBadge,
            {
              status: device.status,
              pulse: device.status !== "active"
            }
          ),
          device.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400" }),
          device.status === "faulty" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-red-400" }),
          device.status === "warning" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricRow,
            {
              icon: Signal,
              label: "Signal",
              value: device.signalStrength != null ? `${device.signalStrength} dBm` : "N/A"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricRow,
            {
              icon: Activity,
              label: "Uptime",
              value: device.uptime != null ? `${device.uptime.toFixed(1)}%` : "N/A"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { icon: Cpu, label: "Ports", value: device.ports }),
          device.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricRow,
            {
              icon: MapPin,
              label: "Location",
              value: device.location
            }
          )
        ] }),
        connectedDevices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2", children: [
            "Connected Devices (",
            connectedDevices.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: connectedDevices.map((cd) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedDevice(cd.id),
              className: "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted/50 transition-smooth text-left group",
              "data-ocid": `topology-conn-${cd.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceIcon, { type: cd.type, status: cd.status, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80 group-hover:text-foreground truncate font-mono", children: cd.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusBadge,
                  {
                    status: cd.status,
                    className: "ml-auto text-[9px] py-0.5 px-1.5"
                  }
                )
              ]
            },
            cd.id
          )) })
        ] })
      ] })
    },
    device.id
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "w-72 flex-shrink-0",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-5 h-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click a node to inspect device details" })
      ] })
    },
    "empty"
  ) });
}
function StatPill({
  icon: Icon,
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/60 border border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-3.5 h-3.5 ${color}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold font-mono ${color}`, children: value })
  ] });
}
function Topology() {
  const devices = useNetworkStore((s) => s.devices);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);
  const selectedDevice = selectedDeviceId ? devices.find((d) => d.id === selectedDeviceId) ?? null : null;
  const activeCount = devices.filter((d) => d.status === "active").length;
  const faultyCount = devices.filter((d) => d.status === "faulty").length;
  const warnCount = devices.filter((d) => d.status === "warning").length;
  const oltCount = devices.filter((d) => d.type === "OLT").length;
  const splCount = devices.filter((d) => d.type === "Splitter").length;
  const ontCount = devices.filter((d) => d.type === "ONT").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      className: "flex flex-col h-full gap-4 p-4",
      "data-ocid": "topology-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground tracking-tight", children: "Network Topology" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                "OLT → Splitter → ONT hierarchy — ",
                devices.length,
                " nodes"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                icon: CircleCheck,
                label: "Active",
                value: activeCount,
                color: "text-emerald-400"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                icon: TriangleAlert,
                label: "Fault",
                value: faultyCount,
                color: "text-red-400"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                icon: Radio,
                label: "Warn",
                value: warnCount,
                color: "text-amber-400"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-5 bg-border/50 mx-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                icon: GitBranch,
                label: "OLT",
                value: oltCount,
                color: "text-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                icon: GitBranch,
                label: "SPL",
                value: splCount,
                color: "text-chart-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                icon: Radio,
                label: "ONT",
                value: ontCount,
                color: "text-chart-3"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 flex-1 min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              elevated: true,
              className: "flex-1 min-w-0 overflow-hidden relative p-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-border/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: "Live Topology View" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "active", label: "SYNC" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", style: { height: "calc(100% - 44px)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TopologyGraph, {}) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TopologyNodePanel, { device: selectedDevice })
        ] })
      ]
    }
  );
}
export {
  Topology as default
};
