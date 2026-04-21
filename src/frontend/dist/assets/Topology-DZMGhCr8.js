import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, T as TriangleAlert, n as ChevronRight, p as Activity, G as GitBranch, u as useNetworkStore, N as Network, q as GitFork, A as AnimatePresence, M as MapPin, X, s as Cpu, t as ChartColumn, Z as Zap, v as Radio } from "./index-YFsEtCvH.js";
import { C as CircleCheck } from "./circle-check-B-pv3TgE.js";
import { S as Signal, L as Layers } from "./signal-DrR59u3_.js";
import { W as Wifi } from "./wifi-D-N8F-4F.js";
import { C as CircleMinus, a as CirclePlus } from "./circle-plus-BrZaAhEO.js";
import { G as Globe } from "./globe-Ayhrg4Wt.js";
import { L as Link2 } from "./link-2-Yx_uYYeJ.js";
import { B as Box, D as DeviceIcon } from "./DeviceIcon-BL2s0sui.js";
import { M as Monitor } from "./monitor-BZYhAAho.js";
import { C as CircleX } from "./circle-x-CTePVagv.js";
import { R as RefreshCw } from "./refresh-cw-CquEYYb_.js";
import { E as Earth } from "./earth-BL7rJm3A.js";
import { D as Download } from "./download-Cv9nJdpJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6.01 18H6", key: "19vcac" }],
  ["path", { d: "M10.01 18H10", key: "uamcmx" }],
  ["path", { d: "M15 10v4", key: "qjz1xs" }],
  ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0", key: "1rif40" }],
  ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0", key: "6a5xfq" }]
];
const Router = createLucideIcon("router", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const STATUS_COLOR$1 = {
  active: {
    stroke: "#22c55e",
    fill: "rgba(34,197,94,0.2)",
    glow: "rgba(34,197,94,0.7)"
  },
  faulty: {
    stroke: "#ef4444",
    fill: "rgba(239,68,68,0.2)",
    glow: "rgba(239,68,68,0.7)"
  },
  warning: {
    stroke: "#eab308",
    fill: "rgba(234,179,8,0.2)",
    glow: "rgba(234,179,8,0.7)"
  }
};
const MAX_SPLITTERS = 5;
const MAX_ONTS_PER_SPL = 3;
function OLTSectionMiniTree({
  olt,
  splitters,
  onts
}) {
  const CANVAS_W = 320;
  const CANVAS_H = 180;
  const displaySplitters = splitters.slice(0, MAX_SPLITTERS);
  const extraSplitters = splitters.length - displaySplitters.length;
  const { oltNode, splitterNodes, ontNodes, edges } = reactExports.useMemo(() => {
    const oltCx = CANVAS_W / 2;
    const oltCy = 30;
    const splCount = displaySplitters.length;
    const splStep = splCount > 1 ? (CANVAS_W - 40) / (splCount - 1) : 0;
    const splStart = splCount > 1 ? 20 : CANVAS_W / 2;
    const splCy = 90;
    const splNodes = displaySplitters.map((s, i) => ({
      device: s,
      cx: splCount === 1 ? splStart : splStart + i * splStep,
      cy: splCy
    }));
    const ontNodesArr = [];
    const edgePairs = [];
    for (const sn of splNodes) {
      edgePairs.push({
        x1: oltCx,
        y1: oltCy + 14,
        x2: sn.cx,
        y2: sn.cy - 10,
        color: "#06b6d4"
      });
    }
    for (const sn of splNodes) {
      const connONTs = onts.filter((o) => sn.device.connectedTo.includes(o.id)).slice(0, MAX_ONTS_PER_SPL);
      const ontCount = connONTs.length;
      const ontStep = ontCount > 1 ? 36 : 0;
      const ontStartCx = sn.cx - (ontCount - 1) * ontStep / 2;
      connONTs.forEach((o, j) => {
        const oCx = ontStartCx + j * ontStep;
        const oCy = 152;
        ontNodesArr.push({ device: o, cx: oCx, cy: oCy });
        edgePairs.push({
          x1: sn.cx,
          y1: sn.cy + 10,
          x2: oCx,
          y2: oCy - 6,
          color: "#a855f7"
        });
      });
    }
    return {
      oltNode: { device: olt, cx: oltCx, cy: oltCy },
      splitterNodes: splNodes,
      ontNodes: ontNodesArr,
      edges: edgePairs
    };
  }, [olt, displaySplitters, onts]);
  function hexPath(cx, cy, r) {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = Math.PI / 3 * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  }
  function diamondPath(cx, cy, r) {
    return `M ${cx},${cy - r} L ${cx + r},${cy} L ${cx},${cy + r} L ${cx - r},${cy} Z`;
  }
  const oltColors = STATUS_COLOR$1[olt.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "100%",
      viewBox: `0 0 ${CANVAS_W} ${CANVAS_H}`,
      "aria-label": `Mini tree for ${olt.name}`,
      style: { display: "block" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          olt.name,
          " network tree"
        ] }),
        edges.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.line,
          {
            x1: e.x1,
            y1: e.y1,
            x2: e.x2,
            y2: e.y2,
            stroke: e.color,
            strokeWidth: 1,
            strokeOpacity: 0.5,
            strokeDasharray: "4 3",
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 0.5 },
            transition: { duration: 0.4, ease: "easeOut" }
          },
          `${e.x1}-${e.y1}-${e.x2}-${e.y2}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.g,
          {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            style: { transformOrigin: `${oltNode.cx}px ${oltNode.cy}px` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: hexPath(oltNode.cx, oltNode.cy, 13),
                  fill: "#06b6d425",
                  stroke: "#06b6d4",
                  strokeWidth: 1.5,
                  style: { filter: "drop-shadow(0 0 6px rgba(6,182,212,0.6))" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: hexPath(oltNode.cx, oltNode.cy, 8),
                  fill: "none",
                  stroke: "#06b6d440",
                  strokeWidth: 0.8
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: oltNode.cx + 9,
                  cy: oltNode.cy - 9,
                  r: 3,
                  fill: oltColors.stroke,
                  style: { filter: `drop-shadow(0 0 3px ${oltColors.glow})` }
                }
              )
            ]
          }
        ),
        splitterNodes.map((sn, i) => {
          const sc = STATUS_COLOR$1[sn.device.status];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.g,
            {
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
              transition: {
                duration: 0.3,
                delay: 0.1 + i * 0.04,
                ease: [0.4, 0, 0.2, 1]
              },
              style: { transformOrigin: `${sn.cx}px ${sn.cy}px` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: diamondPath(sn.cx, sn.cy, 9),
                  fill: "#f9731620",
                  stroke: sc.stroke,
                  strokeWidth: 1.2,
                  style: { filter: `drop-shadow(0 0 4px ${sc.glow})` }
                }
              )
            },
            sn.device.id
          );
        }),
        extraSplitters > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: CANVAS_W - 6,
            y: 90,
            textAnchor: "end",
            fill: "rgba(249,115,22,0.6)",
            fontSize: 8,
            fontFamily: "var(--font-mono, monospace)",
            children: [
              "+",
              extraSplitters,
              " more"
            ]
          }
        ),
        ontNodes.map((on, i) => {
          const oc = STATUS_COLOR$1[on.device.status];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.g,
            {
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1 },
              transition: {
                duration: 0.25,
                delay: 0.2 + i * 0.025,
                ease: [0.4, 0, 0.2, 1]
              },
              style: { transformOrigin: `${on.cx}px ${on.cy}px` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: on.cx - 5,
                  y: on.cy - 5,
                  width: 10,
                  height: 10,
                  rx: 2,
                  fill: "#a855f715",
                  stroke: oc.stroke,
                  strokeWidth: 1,
                  style: { filter: `drop-shadow(0 0 3px ${oc.glow})` }
                }
              )
            },
            on.device.id
          );
        })
      ]
    }
  ) });
}
const STATUS_BADGE = {
  active: {
    label: "Online",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    icon: CircleCheck
  },
  faulty: {
    label: "Fault",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.3)",
    icon: TriangleAlert
  },
  warning: {
    label: "Warning",
    color: "#eab308",
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.3)",
    icon: TriangleAlert
  }
};
function signalBars(dbm) {
  if (dbm == null) return 0;
  if (dbm >= -15) return 5;
  if (dbm >= -20) return 4;
  if (dbm >= -25) return 3;
  if (dbm >= -30) return 2;
  return 1;
}
function StatPill({
  icon: Icon,
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg flex-1",
      style: {
        background: `${color}10`,
        border: `1px solid ${color}25`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 flex-shrink-0", style: { color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[9px] font-mono uppercase tracking-wider",
              style: { color: `${color}90` },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-bold font-mono leading-none",
              style: { color },
              children: value
            }
          )
        ] })
      ]
    }
  );
}
function SignalStrength({ dbm }) {
  const bars = signalBars(dbm);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-0.5", children: [
    [1, 2, 3, 4, 5].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-1 rounded-sm transition-all",
        style: {
          height: `${4 + b * 2}px`,
          background: b <= bars ? "#06b6d4" : "rgba(255,255,255,0.12)",
          boxShadow: b <= bars ? "0 0 4px rgba(6,182,212,0.6)" : "none"
        }
      },
      b
    )),
    dbm != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-[9px] font-mono ml-1",
        style: { color: "rgba(255,255,255,0.4)" },
        children: [
          dbm,
          "dBm"
        ]
      }
    )
  ] });
}
function OLTSectionCard({
  olt,
  splitters,
  onts,
  isSelected,
  onSelect,
  index
}) {
  const badge = STATUS_BADGE[olt.status];
  const StatusIcon = badge.icon;
  const activeONTs = onts.filter((o) => o.status === "active").length;
  const faultyONTs = onts.filter((o) => o.status === "faulty").length;
  const warnONTs = onts.filter((o) => o.status === "warning").length;
  const uptimePct = olt.uptime ?? 99.2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1]
      },
      whileHover: { y: -2, transition: { duration: 0.2 } },
      className: "relative flex flex-col rounded-2xl cursor-pointer overflow-hidden group",
      style: {
        background: isSelected ? "rgba(6,182,212,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${isSelected ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.09)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: isSelected ? "0 0 0 1px rgba(6,182,212,0.2), 0 8px 32px rgba(6,182,212,0.15)" : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s"
      },
      onClick: () => onSelect(olt.id),
      "data-ocid": `olt-section-card.item.${index + 1}`,
      tabIndex: 0,
      "aria-label": `OLT ${olt.name} — ${badge.label}`,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(olt.id);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-px",
            style: {
              background: isSelected ? "linear-gradient(90deg, transparent, #06b6d4, transparent)" : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
            }
          }
        ),
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-32 h-32 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at top right, rgba(6,182,212,0.12), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                style: {
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.25)",
                  boxShadow: isSelected ? "0 0 14px rgba(6,182,212,0.3)" : "none"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Router,
                  {
                    className: "w-4.5 h-4.5",
                    style: { color: "#06b6d4", width: 18, height: 18 }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "text-sm font-display font-semibold truncate",
                  style: {
                    color: isSelected ? "#06b6d4" : "rgba(255,255,255,0.9)",
                    textShadow: isSelected ? "0 0 12px rgba(6,182,212,0.5)" : "none"
                  },
                  children: olt.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-[10px] font-mono truncate mt-0.5",
                  style: { color: "rgba(255,255,255,0.35)" },
                  children: [
                    olt.region ?? "—",
                    " · Port ",
                    olt.ports
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1 px-2 py-1 rounded-full",
                style: {
                  background: badge.bg,
                  border: `1px solid ${badge.border}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatusIcon,
                    {
                      className: "w-2.5 h-2.5",
                      style: { color: badge.color }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-mono font-semibold",
                      style: { color: badge.color },
                      children: badge.label
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronRight,
              {
                className: "w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5",
                style: { color: isSelected ? "#06b6d4" : "rgba(255,255,255,0.2)" }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Signal,
              {
                className: "w-3 h-3",
                style: { color: "rgba(255,255,255,0.3)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SignalStrength, { dbm: olt.signalStrength })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3 h-3", style: { color: "#22c55e" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono",
                style: { color: "rgba(255,255,255,0.4)" },
                children: "Uptime"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[10px] font-mono font-bold",
                style: {
                  color: uptimePct >= 99 ? "#22c55e" : uptimePct >= 95 ? "#eab308" : "#ef4444"
                },
                children: [
                  uptimePct.toFixed(1),
                  "%"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mx-3 mb-3 rounded-xl overflow-hidden",
            style: {
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.06)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(OLTSectionMiniTree, { olt, splitters, onts })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              icon: GitBranch,
              label: "Splitters",
              value: splitters.length,
              color: "#f97316"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              icon: Wifi,
              label: "ONTs",
              value: onts.length,
              color: "#a855f7"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              icon: CircleCheck,
              label: "Active",
              value: activeONTs,
              color: "#22c55e"
            }
          ),
          faultyONTs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              icon: TriangleAlert,
              label: "Fault",
              value: faultyONTs,
              color: "#ef4444"
            }
          ),
          faultyONTs === 0 && warnONTs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              icon: TriangleAlert,
              label: "Warn",
              value: warnONTs,
              color: "#eab308"
            }
          )
        ] })
      ]
    }
  );
}
const LEVEL_Y = { 0: 100, 1: 280, 2: 460 };
const H_PAD = 80;
const MIN_W = 1400;
const MIN_H = 600;
const NODE_SIZE = {
  OLT: 22,
  Splitter: 16,
  ONT: 11,
  JJB: 12,
  Switch: 15,
  Coupler: 13,
  Router: 14
};
const STATUS_COLOR = {
  active: {
    fill: "rgba(34,197,94,0.18)",
    stroke: "#22c55e",
    glow: "rgba(34,197,94,0.7)"
  },
  faulty: {
    fill: "rgba(239,68,68,0.18)",
    stroke: "#ef4444",
    glow: "rgba(239,68,68,0.7)"
  },
  warning: {
    fill: "rgba(234,179,8,0.18)",
    stroke: "#eab308",
    glow: "rgba(234,179,8,0.7)"
  }
};
const TYPE_ACCENT = {
  OLT: "#06b6d4",
  Splitter: "#f97316",
  ONT: "#a855f7"
};
const EDGE_COLOR = {
  0: "#06b6d4",
  1: "#f97316",
  2: "#a855f7"
};
const ICON_MAP = {
  OLT: Monitor,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network,
  Coupler: Link2,
  Router: Globe
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
    const nr = NODE_SIZE[nodes[0].device.type] ?? 18;
    const totalW = Math.max(MIN_W, nodes.length * (nr * 2 + H_PAD));
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
function NodeTooltip({ data }) {
  const { device } = data.node;
  const colors = STATUS_COLOR[device.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 6, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 4, scale: 0.95 },
      transition: { duration: 0.15 },
      className: "absolute z-30 pointer-events-none",
      style: { left: data.x + 16, top: data.y - 60 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl px-3 py-2 min-w-[140px]",
          style: {
            background: "rgba(2,8,23,0.95)",
            border: `1px solid ${colors.stroke}40`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${colors.stroke}20`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded",
                  style: { background: `${colors.stroke}20`, color: colors.stroke },
                  children: device.type
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full",
                  style: {
                    background: colors.stroke,
                    boxShadow: `0 0 6px ${colors.glow}`
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white font-semibold truncate max-w-[120px]", children: device.name }),
            device.signalStrength != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-[10px] font-mono mt-1",
                style: { color: colors.stroke },
                children: [
                  device.signalStrength,
                  " dBm"
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function TopologyNode({
  node,
  isSelected,
  onClick,
  onHover,
  index
}) {
  const { device, x, y } = node;
  const Icon = ICON_MAP[device.type] ?? Monitor;
  const r = NODE_SIZE[device.type] ?? 14;
  const colors = STATUS_COLOR[device.status];
  const typeAccent = TYPE_ACCENT[device.type];
  const mainColor = typeAccent ?? colors.stroke;
  function hexPath(cx, cy, size) {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = Math.PI / 3 * i - Math.PI / 6;
      return `${cx + size * Math.cos(a)},${cy + size * Math.sin(a)}`;
    });
    return `M ${pts.join(" L ")} Z`;
  }
  function diamondPath(cx, cy, size) {
    return `M ${cx},${cy - size} L ${cx + size},${cy} L ${cx},${cy + size} L ${cx - size},${cy} Z`;
  }
  const isOLT = device.type === "OLT";
  const isSplitter = device.type === "Splitter";
  const labelY = y + r + (isOLT ? 20 : 14);
  const truncName = device.name.length > 12 ? `${device.name.slice(0, 12)}…` : device.name;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.g,
    {
      initial: { opacity: 0, scale: 0.4 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1]
      },
      style: { transformOrigin: `${x}px ${y}px` },
      "data-ocid": `topology-node-${device.id}`,
      children: [
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.circle,
            {
              cx: x,
              cy: y,
              r: r + 12,
              fill: "none",
              stroke: mainColor,
              strokeWidth: 1,
              opacity: 0.3,
              animate: { r: [r + 10, r + 18, r + 10], opacity: [0.3, 0.05, 0.3] },
              transition: {
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: x,
              cy: y,
              r: r + 6,
              fill: "none",
              stroke: mainColor,
              strokeWidth: 1.5,
              opacity: 0.5
            }
          )
        ] }),
        !isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: r + 8,
            fill: `${mainColor}08`,
            stroke: `${mainColor}20`,
            strokeWidth: 1
          }
        ),
        isOLT ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: hexPath(x, y, r),
              fill: `${mainColor}25`,
              stroke: isSelected ? mainColor : `${mainColor}90`,
              strokeWidth: isSelected ? 2.5 : 1.5,
              filter: isSelected ? `drop-shadow(0 0 10px ${mainColor})` : `drop-shadow(0 0 4px ${mainColor}60)`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: hexPath(x, y, r * 0.65),
              fill: "none",
              stroke: `${mainColor}40`,
              strokeWidth: 0.8
            }
          )
        ] }) : isSplitter ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: diamondPath(x, y, r),
            fill: `${mainColor}20`,
            stroke: isSelected ? mainColor : `${mainColor}80`,
            strokeWidth: isSelected ? 2.5 : 1.5,
            filter: isSelected ? `drop-shadow(0 0 8px ${mainColor})` : `drop-shadow(0 0 3px ${mainColor}50)`
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: x - r,
            y: y - r,
            width: r * 2,
            height: r * 2,
            rx: r * 0.4,
            fill: `${mainColor}18`,
            stroke: isSelected ? mainColor : `${mainColor}70`,
            strokeWidth: isSelected ? 2 : 1.2,
            filter: isSelected ? `drop-shadow(0 0 6px ${mainColor})` : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x + r * 0.68,
            cy: y - r * 0.68,
            r: r * 0.28,
            fill: colors.stroke,
            style: { filter: `drop-shadow(0 0 4px ${colors.glow})` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "foreignObject",
          {
            x: x - r * 0.65,
            y: y - r * 0.65,
            width: r * 1.3,
            height: r * 1.3,
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
                      width: r * 0.85,
                      height: r * 0.85,
                      color: mainColor,
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
            x,
            y: labelY,
            textAnchor: "middle",
            fill: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
            fontSize: isOLT ? 11 : isSplitter ? 10 : 9,
            fontFamily: "var(--font-mono, monospace)",
            fontWeight: isSelected ? 700 : 400,
            style: {
              filter: isSelected ? `drop-shadow(0 0 8px ${mainColor})` : void 0
            },
            children: truncName
          }
        ),
        isOLT && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x,
            y: labelY + 12,
            textAnchor: "middle",
            fill: `${mainColor}60`,
            fontSize: 8,
            fontFamily: "var(--font-mono, monospace)",
            children: device.type
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: r + 16,
            fill: "transparent",
            style: { cursor: "pointer" },
            onClick: () => onClick(device.id),
            onMouseEnter: (e) => {
              var _a, _b;
              const rect = (_a = e.target.closest("svg")) == null ? void 0 : _a.getBoundingClientRect();
              const svgEl = e.target.closest(
                "svg"
              );
              if (!svgEl || !rect) return;
              const pt = svgEl.createSVGPoint();
              pt.x = e.clientX;
              pt.y = e.clientY;
              const sp = pt.matrixTransform((_b = svgEl.getScreenCTM()) == null ? void 0 : _b.inverse());
              onHover({ node, x: sp.x, y: sp.y });
            },
            onMouseLeave: () => onHover(null),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") onClick(device.id);
            },
            tabIndex: 0,
            "aria-label": `Select node ${device.name} (${device.type}, ${device.status})`,
            role: "button"
          }
        )
      ]
    }
  );
}
function TopologyEdge({ from, to, index, animated = true }) {
  const my = (from.y + to.y) / 2;
  const edgeColor = EDGE_COLOR[from.level] ?? EDGE_COLOR[0];
  const d = `M ${from.x} ${from.y} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${to.y}`;
  const edgeLen = Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
  const dotOffset = index * 137 % edgeLen;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.path,
      {
        d,
        fill: "none",
        stroke: edgeColor,
        strokeWidth: 3,
        opacity: 0.08,
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 0.7, delay: index * 0.02, ease: "easeOut" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.path,
      {
        d,
        fill: "none",
        stroke: edgeColor,
        strokeWidth: 1.5,
        opacity: 0.5,
        strokeDasharray: "6 4",
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 0.5 },
        transition: { duration: 0.6, delay: index * 0.025, ease: "easeOut" }
      }
    ),
    animated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        r: 2.5,
        fill: edgeColor,
        opacity: 0.9,
        style: { filter: `drop-shadow(0 0 4px ${edgeColor})` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "animateMotion",
          {
            dur: `${2.5 + dotOffset % 2}s`,
            repeatCount: "indefinite",
            begin: `${index * 0.3 % 3}s`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("mpath", { href: `#edge-path-${index}` })
          }
        )
      }
    ),
    animated && /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { id: `edge-path-${index}`, d }) })
  ] });
}
function Minimap({ allNodes, totalW, totalH }) {
  const W = 160;
  const H = 100;
  const scaleX = W / totalW;
  const scaleY = H / totalH;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute bottom-4 right-4 z-20 rounded-xl overflow-hidden",
      style: {
        background: "rgba(2,8,23,0.85)",
        border: "1px solid rgba(6,182,212,0.2)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-white/30 uppercase tracking-widest", children: "Minimap" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: W,
            height: H,
            viewBox: `0 0 ${W} ${H}`,
            "aria-label": "Network topology minimap",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Minimap overview" }),
              allNodes.map((n) => {
                const mainColor = TYPE_ACCENT[n.device.type] ?? STATUS_COLOR[n.device.status].stroke;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: n.x * scaleX,
                    cy: n.y * scaleY,
                    r: n.device.type === "OLT" ? 3.5 : n.device.type === "Splitter" ? 2 : 1.5,
                    fill: mainColor,
                    opacity: 0.8,
                    style: { filter: `drop-shadow(0 0 2px ${mainColor})` }
                  },
                  n.device.id
                );
              })
            ]
          }
        )
      ]
    }
  );
}
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
  const [showMinimap, setShowMinimap] = reactExports.useState(true);
  const [tooltip, setTooltip] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const zoomIn = reactExports.useCallback(() => setZoom((z) => Math.min(z + 0.2, 3)), []);
  const zoomOut = reactExports.useCallback(
    () => setZoom((z) => Math.max(z - 0.2, 0.25)),
    []
  );
  const fitView = reactExports.useCallback(() => setZoom(1), []);
  const handleNodeClick = reactExports.useCallback(
    (id) => {
      setSelectedDevice(selectedDeviceId === id ? null : id);
    },
    [selectedDeviceId, setSelectedDevice]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full flex flex-col overflow-hidden",
      style: {
        background: "radial-gradient(ellipse at 40% 30%, #0d1729 0%, #020817 70%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              backgroundImage: "radial-gradient(circle, rgba(6,182,212,0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-4 right-4 z-20 flex items-center gap-1 px-2 py-1.5 rounded-xl",
            style: {
              background: "rgba(2,8,23,0.85)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: zoomOut,
                  "aria-label": "Zoom out",
                  "data-ocid": "topology-zoom-out",
                  className: "w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleMinus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-white/40 w-8 text-center", children: [
                Math.round(zoom * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: zoomIn,
                  "aria-label": "Zoom in",
                  "data-ocid": "topology-zoom-in",
                  className: "w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-white/10 mx-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: fitView,
                  "aria-label": "Fit to view",
                  "data-ocid": "topology-fit-view",
                  className: "w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-white/10 mx-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowMinimap((v) => !v),
                  "aria-label": "Toggle minimap",
                  "data-ocid": "topology-toggle-minimap",
                  className: `w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-[9px] font-mono font-bold ${showMinimap ? "text-cyan-400" : "text-white/30"}`,
                  children: "MAP"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-4 left-4 z-20 flex flex-col gap-1.5 rounded-xl px-3 py-2.5",
            style: {
              background: "rgba(2,8,23,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono text-white/30 uppercase tracking-widest mb-0.5", children: "Hierarchy" }),
              [
                { label: "OLT — Core", color: "#06b6d4" },
                { label: "Splitter — Dist.", color: "#f97316" },
                { label: "ONT — Endpoint", color: "#a855f7" }
              ].map(({ label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-5 h-0.5 rounded-full",
                    style: { background: color, boxShadow: `0 0 6px ${color}` }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono",
                    style: { color: "rgba(255,255,255,0.5)" },
                    children: label
                  }
                )
              ] }, label))
            ]
          }
        ),
        tooltip && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NodeTooltip, { data: tooltip }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: containerRef,
            className: "flex-1 overflow-auto",
            style: { scrollbarColor: "rgba(6,182,212,0.2) transparent" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  transform: `scale(${zoom})`,
                  transformOrigin: "top center",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    width: dims.w,
                    height: dims.h,
                    viewBox: `0 0 ${dims.w} ${dims.h}`,
                    "aria-label": "Network topology graph",
                    style: { display: "block", margin: "0 auto" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Network Topology Graph" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "linearGradient",
                          {
                            id: "level-line-l1",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "0%",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#06b6d4", stopOpacity: "0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#06b6d4", stopOpacity: "0.15" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#06b6d4", stopOpacity: "0" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "linearGradient",
                          {
                            id: "level-line-l2",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "0%",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f97316", stopOpacity: "0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#f97316", stopOpacity: "0.15" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#f97316", stopOpacity: "0" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "linearGradient",
                          {
                            id: "level-line-l3",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "0%",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#a855f7", stopOpacity: "0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#a855f7", stopOpacity: "0.15" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#a855f7", stopOpacity: "0" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: 0,
                          y: LEVEL_Y[0] - 40,
                          width: dims.w,
                          height: 80,
                          fill: "url(#level-line-l1)",
                          opacity: 0.5
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: 0,
                          y: LEVEL_Y[1] - 40,
                          width: dims.w,
                          height: 80,
                          fill: "url(#level-line-l2)",
                          opacity: 0.5
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "rect",
                        {
                          x: 0,
                          y: LEVEL_Y[2] - 40,
                          width: dims.w,
                          height: 80,
                          fill: "url(#level-line-l3)",
                          opacity: 0.5
                        }
                      ),
                      [
                        { y: LEVEL_Y[0], label: "LAYER 1 — BACKBONE", color: "#06b6d4" },
                        {
                          y: LEVEL_Y[1],
                          label: "LAYER 2 — DISTRIBUTION",
                          color: "#f97316"
                        },
                        { y: LEVEL_Y[2], label: "LAYER 3 — ACCESS", color: "#a855f7" }
                      ].map(({ y, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "text",
                        {
                          x: dims.w - 20,
                          y: y + 5,
                          textAnchor: "end",
                          fill: color,
                          fontSize: 9,
                          fontFamily: "var(--font-mono, monospace)",
                          opacity: 0.4,
                          letterSpacing: 1,
                          children: label
                        },
                        label
                      )),
                      edges.map(({ from, to }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TopologyEdge,
                        {
                          from,
                          to,
                          index: i,
                          animated: i < 40
                        },
                        `${from.device.id}-${to.device.id}`
                      )),
                      allNodes.map((node, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TopologyNode,
                        {
                          node,
                          isSelected: selectedDeviceId === node.device.id,
                          onClick: handleNodeClick,
                          onHover: setTooltip,
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
        ),
        showMinimap && /* @__PURE__ */ jsxRuntimeExports.jsx(Minimap, { allNodes, totalW: dims.w, totalH: dims.h })
      ]
    }
  );
}
const STATUS_COLORS = {
  active: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "rgba(34,197,94,0.4)",
    dot: "#22c55e"
  },
  warning: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    glow: "rgba(234,179,8,0.4)",
    dot: "#eab308"
  },
  faulty: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "rgba(239,68,68,0.4)",
    dot: "#ef4444"
  }
};
function useSpark(base, variance, len = 24) {
  return reactExports.useMemo(() => {
    let v = base;
    return Array.from({ length: len }, () => {
      v = Math.max(
        base - variance,
        Math.min(base + variance, v + (Math.random() - 0.5) * variance * 0.8)
      );
      return Math.round(v * 10) / 10;
    });
  }, [base, variance, len]);
}
function Sparkline({
  values,
  color,
  label
}) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const W = 200;
  const H = 48;
  const pts = values.map((v, i) => {
    const x = i / (values.length - 1) * W;
    const y = H - (v - min) / range * (H - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-3",
      style: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold", style: { color }, children: values[values.length - 1] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: W,
            height: H,
            viewBox: `0 0 ${W} ${H}`,
            "aria-label": `${label} trend chart`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
                label,
                " trend"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "linearGradient",
                {
                  id: `spark-grad-${label.replace(/\s/g, "")}`,
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: 0.25 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: 0 })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "polyline",
                {
                  points: `0,${H} ${pts} ${W},${H}`,
                  fill: `url(#spark-grad-${label.replace(/\s/g, "")})`,
                  stroke: "none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "polyline",
                {
                  points: pts,
                  fill: "none",
                  stroke: color,
                  strokeWidth: 1.5,
                  style: { filter: `drop-shadow(0 0 3px ${color})` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: (values.length - 1) / (values.length - 1) * W,
                  cy: H - (values[values.length - 1] - min) / range * (H - 8) - 4,
                  r: 3,
                  fill: color,
                  style: { filter: `drop-shadow(0 0 6px ${color})` }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function SignalBars({ dbm }) {
  const normalized = Math.max(0, Math.min(1, (dbm + 100) / 60));
  const bars = Math.round(normalized * 5);
  const color = bars >= 4 ? "#22c55e" : bars >= 2 ? "#eab308" : "#ef4444";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-end gap-0.5",
      "aria-label": `Signal strength: ${bars} of 5 bars`,
      children: ["b1", "b2", "b3", "b4", "b5"].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-sm",
          style: {
            width: 4,
            height: 4 + i * 3,
            background: i < bars ? color : "rgba(255,255,255,0.15)",
            boxShadow: i < bars ? `0 0 4px ${color}` : "none"
          }
        },
        id
      ))
    }
  );
}
function UptimeRing({ uptime }) {
  const R = 22;
  const circ = 2 * Math.PI * R;
  const color = uptime >= 99 ? "#22c55e" : uptime >= 95 ? "#eab308" : "#ef4444";
  const dash = uptime / 100 * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: 56,
        height: 56,
        viewBox: "0 0 56 56",
        "aria-label": `Uptime ${uptime.toFixed(1)}%`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Uptime ring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: 28,
              cy: 28,
              r: R,
              fill: "none",
              stroke: "rgba(255,255,255,0.1)",
              strokeWidth: 4
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: 28,
              cy: 28,
              r: R,
              fill: "none",
              stroke: color,
              strokeWidth: 4,
              strokeLinecap: "round",
              strokeDasharray: `${dash} ${circ - dash}`,
              strokeDashoffset: circ / 4,
              style: { filter: `drop-shadow(0 0 6px ${color})` }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "absolute text-[11px] font-mono font-bold",
        style: { color },
        children: [
          uptime.toFixed(0),
          "%"
        ]
      }
    )
  ] });
}
const TABS = [
  { key: "overview", label: "Overview", icon: Cpu },
  { key: "metrics", label: "Metrics", icon: ChartColumn },
  { key: "connections", label: "Connections", icon: GitFork }
];
function DevicePanel({ device }) {
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const devices = useNetworkStore((s) => s.devices);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const connectedDevices = device.connectedTo.map((cid) => devices.find((d) => d.id === cid)).filter(Boolean);
  const colors = STATUS_COLORS[device.status];
  const signalBase = device.signalStrength ?? -60;
  const uptimeBase = device.uptime ?? 98.5;
  const signalSpark = useSpark(signalBase, 8);
  const latencySpark = useSpark(12, 6);
  const lossSpark = useSpark(0.3, 0.3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", style: { width: 340 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-shrink-0 px-4 pt-4 pb-3",
        style: { borderBottom: "1px solid rgba(255,255,255,0.08)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  style: {
                    background: `${colors.glow.replace("0.4", "0.12")}`,
                    border: `1px solid ${colors.dot}30`,
                    boxShadow: `0 0 20px ${colors.glow}`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceIcon, { type: device.type, status: device.status, size: "lg" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] font-mono uppercase tracking-widest mb-0.5",
                    style: { color: colors.dot },
                    children: device.type
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-sm font-bold text-white truncate",
                    title: device.name,
                    children: device.name
                  }
                ),
                device.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5 text-white/30 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 truncate", children: device.location })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedDevice(null),
                className: "w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 transition-colors flex-shrink-0",
                style: { background: "rgba(255,255,255,0.06)" },
                "aria-label": "Close panel",
                "data-ocid": "topology-panel-close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                style: {
                  background: colors.bg.replace("bg-", ""),
                  border: `1px solid ${colors.dot}30`
                },
                children: [
                  device.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-emerald-400" }),
                  device.status === "faulty" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 text-red-400" }),
                  device.status === "warning" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-yellow-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-mono font-semibold capitalize",
                      style: { color: colors.dot },
                      children: device.status
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-1.5 h-1.5 rounded-full animate-pulse ml-0.5",
                      style: {
                        background: colors.dot,
                        boxShadow: `0 0 6px ${colors.dot}`
                      }
                    }
                  )
                ]
              }
            ),
            device.region && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/30 px-2 py-0.5 rounded-full bg-white/5", children: device.region })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-1 mt-2 text-[10px] font-mono text-white/25 hover:text-cyan-400 transition-colors",
              "data-ocid": "topology-view-in-map",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-2.5 h-2.5" }),
                "View in Map"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-shrink-0 flex gap-0",
        style: { borderBottom: "1px solid rgba(255,255,255,0.08)" },
        children: TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(tab.key),
              "data-ocid": `topology-tab-${tab.key}`,
              className: "flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-[10px] font-mono transition-all duration-200",
              style: {
                color: isActive ? "#06b6d4" : "rgba(255,255,255,0.3)",
                borderBottom: isActive ? "2px solid #06b6d4" : "2px solid transparent",
                background: isActive ? "rgba(6,182,212,0.06)" : "transparent"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                tab.label
              ]
            },
            tab.key
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 overflow-y-auto",
        style: { scrollbarColor: "rgba(6,182,212,0.2) transparent" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.2 },
              className: "p-4 flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-3 flex flex-col gap-2",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "w-3 h-3 text-cyan-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest", children: "Signal" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-cyan-400", children: device.signalStrength != null ? `${device.signalStrength}` : "N/A" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/30 mb-0.5", children: "dBm" })
                        ] }),
                        device.signalStrength != null && /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBars, { dbm: device.signalStrength })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-3 flex flex-col items-center justify-center gap-1",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest self-start", children: "Uptime" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UptimeRing, { uptime: device.uptime ?? 99 })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-3",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-3 h-3 text-purple-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest", children: "Port Usage" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-purple-400", children: [
                          Math.ceil(device.ports * 0.72),
                          "/",
                          device.ports
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 h-2", children: Array.from(
                        { length: device.ports > 24 ? 24 : device.ports },
                        (_, i) => {
                          const usedCount = Math.ceil(device.ports * 0.72);
                          const isUsed = i < Math.round(
                            usedCount * (device.ports > 24 ? 24 / device.ports : 1)
                          );
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "flex-1 rounded-sm",
                              style: {
                                background: isUsed ? "#a855f7" : "rgba(255,255,255,0.1)",
                                boxShadow: isUsed ? "0 0 3px rgba(168,85,247,0.6)" : "none"
                              }
                            },
                            `port-${device.id}-${i}`
                          );
                        }
                      ) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-xl divide-y",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    children: [
                      {
                        icon: MapPin,
                        label: "Location",
                        value: device.location ?? "Unknown"
                      },
                      {
                        icon: Activity,
                        label: "Ports Total",
                        value: String(device.ports)
                      },
                      {
                        icon: Signal,
                        label: "Device ID",
                        value: device.id.slice(0, 12)
                      }
                    ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-3 py-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/35", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wide", children: label })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-white/70 max-w-[120px] truncate text-right", children: value })
                        ]
                      },
                      label
                    ))
                  }
                )
              ]
            },
            "overview"
          ),
          activeTab === "metrics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.2 },
              className: "p-4 flex flex-col gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-white/30 uppercase tracking-widest", children: "Last 24 hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    values: signalSpark,
                    color: "#06b6d4",
                    label: `Signal (dBm) · now: ${signalBase}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    values: latencySpark,
                    color: "#f97316",
                    label: "Latency (ms)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    values: lossSpark.map((v) => Math.max(0, v)),
                    color: "#ef4444",
                    label: "Packet Loss (%)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl p-3 text-center",
                    style: {
                      background: "rgba(6,182,212,0.06)",
                      border: "1px solid rgba(6,182,212,0.15)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-cyan-400/60 mb-1", children: "Uptime (Last 30 days)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-cyan-400", children: [
                        uptimeBase.toFixed(2),
                        "%"
                      ] })
                    ]
                  }
                )
              ]
            },
            "metrics"
          ),
          activeTab === "connections" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.2 },
              className: "p-4 flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1", children: [
                  connectedDevices.length,
                  " Connected Device",
                  connectedDevices.length !== 1 ? "s" : ""
                ] }),
                connectedDevices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-white/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GitFork, { className: "w-8 h-8 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", children: "No connections" })
                ] }) : connectedDevices.map((cd) => {
                  const cdColors = STATUS_COLORS[cd.status];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => useNetworkStore.getState().setSelectedDevice(cd.id),
                      className: "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group",
                      style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)"
                      },
                      "data-ocid": `topology-conn-${cd.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceIcon, { type: cd.type, status: cd.status, size: "sm" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white/70 group-hover:text-white truncate transition-colors", children: cd.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-white/30", children: cd.type })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2 h-2 rounded-full flex-shrink-0",
                            style: {
                              background: cdColors.dot,
                              boxShadow: `0 0 6px ${cdColors.dot}`
                            }
                          }
                        )
                      ]
                    },
                    cd.id
                  );
                })
              ]
            },
            "connections"
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-shrink-0 p-3 flex flex-col gap-1.5",
        style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono text-white/25 uppercase tracking-widest px-1 mb-0.5", children: "Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [
            { label: "Reboot", icon: RefreshCw, color: "text-cyan-400" },
            { label: "Diagnose", icon: Settings2, color: "text-orange-400" },
            { label: "Alert Rule", icon: Zap, color: "text-purple-400" }
          ].map(({ label, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `flex flex-col items-center gap-1 py-2 rounded-lg transition-all duration-200 text-center ${color}`,
              style: {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)"
              },
              "data-ocid": `topology-action-${label.toLowerCase().replace(/\s/g, "-")}`,
              "aria-label": label,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono opacity-70", children: label })
              ]
            },
            label
          )) })
        ]
      }
    )
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-4 text-center h-full",
      style: { width: 340, padding: "32px 24px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-24 h-24 rounded-full flex items-center justify-center",
              style: {
                background: "rgba(6,182,212,0.06)",
                border: "1px solid rgba(6,182,212,0.15)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                GitFork,
                {
                  className: "w-10 h-10",
                  style: { color: "rgba(6,182,212,0.4)" }
                }
              )
            }
          ),
          [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute w-2 h-2 rounded-full",
              style: {
                top: "50%",
                left: "50%",
                background: "#06b6d4",
                boxShadow: "0 0 8px #06b6d4"
              },
              animate: {
                x: Math.cos(i * 2 * Math.PI / 3) * 44 - 4,
                y: Math.sin(i * 2 * Math.PI / 3) * 44 - 4,
                rotate: 360
              },
              transition: {
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.8
              }
            },
            i
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-white/60 mb-1", children: "No Node Selected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white/30 leading-relaxed max-w-[200px] mx-auto", children: "Select a node on the topology map to view device details and metrics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-2 rounded-xl w-full justify-center",
            style: {
              background: "rgba(6,182,212,0.06)",
              border: "1px solid rgba(6,182,212,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse",
                  style: { boxShadow: "0 0 6px #06b6d4" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-cyan-400/70", children: "Topology ready · click any node" })
            ]
          }
        )
      ]
    }
  );
}
function TopologyNodePanel({ device }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-full overflow-hidden",
      style: {
        background: "rgba(2,8,23,0.6)",
        backdropFilter: "blur(12px)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: device ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { x: 30, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 30, opacity: 0 },
          transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
          className: "h-full overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(DevicePanel, { device })
        },
        device.id
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          className: "h-full flex items-start",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {})
        },
        "empty"
      ) })
    }
  );
}
const LAYER_CONFIGS = [
  {
    type: "L1",
    label: "L1 Backbone",
    description: "Physical fiber routes",
    color: "#06b6d4",
    glowColor: "rgba(6,182,212,0.4)",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/40",
    bgClass: "bg-cyan-500/10"
  },
  {
    type: "L2",
    label: "L2 Distribution",
    description: "VLAN switching paths",
    color: "#f97316",
    glowColor: "rgba(249,115,22,0.4)",
    textClass: "text-orange-400",
    borderClass: "border-orange-500/40",
    bgClass: "bg-orange-500/10"
  },
  {
    type: "L3",
    label: "L3 IP Access",
    description: "IP topology overlay",
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.4)",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/40",
    bgClass: "bg-purple-500/10"
  }
];
const REGIONS = [
  "All",
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "South America"
];
function StatCard({
  label,
  value,
  icon: Icon,
  accentColor,
  glowColor,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] },
      className: "relative flex-1 min-w-[110px] flex flex-col gap-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden",
      style: { borderLeftColor: accentColor, borderLeftWidth: 3 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none",
            style: {
              background: `radial-gradient(ellipse at top left, ${accentColor}, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3", style: { color: accentColor } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-white/40", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-2xl font-display font-bold leading-none",
            style: { color: accentColor, textShadow: `0 0 20px ${glowColor}` },
            children: value
          }
        )
      ]
    }
  );
}
function LayerToggle({ cfg }) {
  const networkLayers = useNetworkStore((s) => s.networkLayers);
  const toggleNetworkLayer = useNetworkStore((s) => s.toggleNetworkLayer);
  const layer = networkLayers.find((l) => l.type === cfg.type);
  const isOn = (layer == null ? void 0 : layer.visible) ?? false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: `flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer select-none ${isOn ? `${cfg.bgClass} ${cfg.borderClass}` : "bg-white/5 border-white/10"}`,
      onClick: () => toggleNetworkLayer(cfg.type),
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      "data-ocid": `layer-toggle-${cfg.type.toLowerCase()}`,
      role: "switch",
      "aria-checked": isOn,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-3 h-3 rounded-sm flex-shrink-0",
            style: {
              background: isOn ? cfg.color : "rgba(255,255,255,0.15)",
              boxShadow: isOn ? `0 0 8px ${cfg.glowColor}` : "none",
              transition: "all 0.3s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-xs font-semibold font-mono transition-colors ${isOn ? cfg.textClass : "text-white/40"}`,
              children: cfg.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 truncate", children: cfg.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative w-9 h-5 rounded-full transition-all duration-300 flex-shrink-0",
            style: {
              background: isOn ? `${cfg.color}33` : "rgba(255,255,255,0.1)",
              border: `1px solid ${isOn ? cfg.color : "rgba(255,255,255,0.15)"}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute top-0.5 w-4 h-4 rounded-full",
                animate: { left: isOn ? "calc(100% - 18px)" : "2px" },
                transition: { type: "spring", stiffness: 500, damping: 30 },
                style: {
                  background: isOn ? cfg.color : "rgba(255,255,255,0.3)",
                  boxShadow: isOn ? `0 0 8px ${cfg.glowColor}` : "none"
                }
              }
            )
          }
        )
      ]
    }
  );
}
function NetworkHealthBadge({ faultyCount }) {
  const healthy = faultyCount === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-1.5 rounded-full border",
      style: {
        background: healthy ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
        borderColor: healthy ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full animate-pulse",
            style: {
              background: healthy ? "#22c55e" : "#ef4444",
              boxShadow: `0 0 6px ${healthy ? "#22c55e" : "#ef4444"}`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-mono font-semibold",
            style: { color: healthy ? "#22c55e" : "#ef4444" },
            children: healthy ? "Network Healthy" : `${faultyCount} Fault${faultyCount > 1 ? "s" : ""} Active`
          }
        )
      ]
    }
  );
}
function ViewToggle({
  mode,
  onChange
}) {
  const tabs = [
    { value: "sections", label: "OLT Sections", icon: LayoutGrid },
    { value: "graph", label: "Network Graph", icon: Share2 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1 p-1 rounded-xl",
      style: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)"
      },
      children: tabs.map((tab) => {
        const Icon = tab.icon;
        const active = mode === tab.value;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onChange(tab.value),
            "data-ocid": `topology-view-toggle-${tab.value}`,
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200",
            style: {
              background: active ? "rgba(6,182,212,0.15)" : "transparent",
              color: active ? "#06b6d4" : "rgba(255,255,255,0.4)",
              border: active ? "1px solid rgba(6,182,212,0.3)" : "1px solid transparent",
              boxShadow: active ? "0 0 12px rgba(6,182,212,0.2)" : "none"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
              tab.label
            ]
          },
          tab.value
        );
      })
    }
  );
}
function OLTSummaryBar({
  olts,
  filteredOlts
}) {
  const online = olts.filter((o) => o.status === "active").length;
  const fault = olts.filter((o) => o.status === "faulty").length;
  const warning = olts.filter((o) => o.status === "warning").length;
  const items = [
    { label: "Total OLTs", value: olts.length, color: "#06b6d4", icon: Router },
    { label: "Online", value: online, color: "#22c55e", icon: CircleCheck },
    { label: "Fault", value: fault, color: "#ef4444", icon: TriangleAlert },
    { label: "Warning", value: warning, color: "#eab308", icon: TriangleAlert },
    {
      label: "Showing",
      value: filteredOlts.length,
      color: "#a855f7",
      icon: LayoutGrid
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: items.map((item) => {
    const Icon = item.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 rounded-xl",
        style: {
          background: `${item.color}0d`,
          border: `1px solid ${item.color}25`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5", style: { color: item.color } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-mono",
              style: { color: "rgba(255,255,255,0.4)" },
              children: item.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-sm font-bold font-mono",
              style: { color: item.color },
              children: item.value
            }
          )
        ]
      },
      item.label
    );
  }) });
}
function Topology() {
  const devices = useNetworkStore((s) => s.devices);
  const alerts = useNetworkStore((s) => s.alerts);
  const selectedDeviceId = useNetworkStore((s) => s.selectedDeviceId);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const selectedDevice = selectedDeviceId ? devices.find((d) => d.id === selectedDeviceId) ?? null : null;
  const activeCount = devices.filter((d) => d.status === "active").length;
  const faultyCount = devices.filter((d) => d.status === "faulty").length;
  const warnCount = devices.filter((d) => d.status === "warning").length;
  const oltCount = devices.filter((d) => d.type === "OLT").length;
  const splCount = devices.filter((d) => d.type === "Splitter").length;
  const ontCount = devices.filter((d) => d.type === "ONT").length;
  const unresolvedAlerts = alerts.filter((a) => !a.resolved).length;
  const [syncSeconds, setSyncSeconds] = reactExports.useState(0);
  const [activeRegion, setActiveRegion] = reactExports.useState("All");
  const [viewMode, setViewMode] = reactExports.useState("sections");
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    intervalRef.current = setInterval(() => setSyncSeconds((s) => s + 1), 1e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  const syncLabel = syncSeconds < 60 ? `${syncSeconds}s ago` : `${Math.floor(syncSeconds / 60)}m ago`;
  const statCards = [
    {
      label: "Total Nodes",
      value: devices.length,
      icon: Network,
      accentColor: "#06b6d4",
      glowColor: "rgba(6,182,212,0.5)"
    },
    {
      label: "Active Nodes",
      value: activeCount,
      icon: CircleCheck,
      accentColor: "#22c55e",
      glowColor: "rgba(34,197,94,0.5)"
    },
    {
      label: "Fault Nodes",
      value: faultyCount,
      icon: TriangleAlert,
      accentColor: "#ef4444",
      glowColor: "rgba(239,68,68,0.5)"
    },
    {
      label: "OLTs Online",
      value: oltCount,
      icon: Router,
      accentColor: "#06b6d4",
      glowColor: "rgba(6,182,212,0.5)"
    },
    {
      label: "Splitters",
      value: splCount,
      icon: GitBranch,
      accentColor: "#f97316",
      glowColor: "rgba(249,115,22,0.5)"
    },
    {
      label: "ONTs",
      value: ontCount,
      icon: Wifi,
      accentColor: "#a855f7",
      glowColor: "rgba(168,85,247,0.5)"
    }
  ];
  const olts = reactExports.useMemo(
    () => devices.filter((d) => d.type === "OLT"),
    [devices]
  );
  const splitters = reactExports.useMemo(
    () => devices.filter((d) => d.type === "Splitter"),
    [devices]
  );
  const ontsAll = reactExports.useMemo(
    () => devices.filter((d) => d.type === "ONT"),
    [devices]
  );
  const filteredOlts = reactExports.useMemo(
    () => activeRegion === "All" ? olts : olts.filter((o) => o.region === activeRegion),
    [olts, activeRegion]
  );
  const oltSplittersMap = reactExports.useMemo(() => {
    const map = {};
    for (const olt of olts) {
      map[olt.id] = olt.connectedTo.map((sid) => splitters.find((s) => s.id === sid)).filter(Boolean);
    }
    return map;
  }, [olts, splitters]);
  const oltONTsMap = reactExports.useMemo(() => {
    const map = {};
    for (const olt of olts) {
      const spls = oltSplittersMap[olt.id] ?? [];
      const ontIds = new Set(spls.flatMap((s) => s.connectedTo));
      map[olt.id] = ontsAll.filter((o) => ontIds.has(o.id));
    }
    return map;
  }, [olts, oltSplittersMap, ontsAll]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4 },
      className: "flex flex-col h-full gap-0 overflow-hidden",
      "data-ocid": "topology-page",
      style: {
        background: "linear-gradient(180deg, #020817 0%, #0a1628 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 px-4 sm:px-6 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-white/8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  style: {
                    background: "rgba(6,182,212,0.15)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    boxShadow: "0 0 20px rgba(6,182,212,0.2)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5", style: { color: "#06b6d4" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-2xl font-display font-bold tracking-tight",
                    style: {
                      background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 60%, #a855f7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    },
                    children: "Network Topology"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-white/40", children: [
                    "OLT → Splitter → ONT · ",
                    devices.length.toLocaleString(),
                    " nodes indexed"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] font-mono text-white/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2.5 h-2.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Last sync: ",
                      syncLabel
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkHealthBadge, { faultyCount }),
              warnCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-yellow-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-yellow-400", children: [
                  warnCount,
                  " Warnings"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 mt-4 flex-wrap", children: statCards.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s, delay: i * 0.06 }, s.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 px-6 py-3 border-b border-white/8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mr-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-white/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-white/30", children: "Network Layers" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: LAYER_CONFIGS.map((cfg) => /* @__PURE__ */ jsxRuntimeExports.jsx(LayerToggle, { cfg }, cfg.type)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ViewToggle, { mode: viewMode, onChange: setViewMode })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: viewMode === "sections" ? (
            /* ── OLT SECTIONS VIEW ─────────────────────────────────────────── */
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -10 },
                transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                className: "flex-1 min-w-0 overflow-hidden flex flex-col",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex-shrink-0 flex items-center justify-between gap-4 px-5 py-2.5 border-b flex-wrap",
                      style: {
                        background: "rgba(255,255,255,0.02)",
                        borderColor: "rgba(255,255,255,0.08)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-2 h-2 rounded-full animate-pulse",
                              style: {
                                background: "#22c55e",
                                boxShadow: "0 0 8px #22c55e"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest", children: [
                            "OLT Section View · ",
                            filteredOlts.length,
                            " OLTs shown"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(OLTSummaryBar, { olts, filteredOlts })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex-1 overflow-y-auto px-4 sm:px-6 py-5",
                      style: { scrollbarColor: "rgba(6,182,212,0.2) transparent" },
                      "data-ocid": "olt-sections-grid",
                      children: filteredOlts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex flex-col items-center justify-center h-64 gap-4",
                          "data-ocid": "olt-sections.empty_state",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                                style: {
                                  background: "rgba(6,182,212,0.1)",
                                  border: "1px solid rgba(6,182,212,0.2)"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Router,
                                  {
                                    className: "w-7 h-7",
                                    style: { color: "#06b6d4" }
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-white/40", children: "No OLTs in this region" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white/25 mt-1", children: 'Select "All" or a different region' })
                            ] })
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4", children: filteredOlts.map((olt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        OLTSectionCard,
                        {
                          olt,
                          splitters: oltSplittersMap[olt.id] ?? [],
                          onts: oltONTsMap[olt.id] ?? [],
                          isSelected: selectedDeviceId === olt.id,
                          onSelect: (id) => setSelectedDevice(selectedDeviceId === id ? null : id),
                          index: i
                        },
                        olt.id
                      )) })
                    }
                  )
                ]
              },
              "sections"
            )
          ) : (
            /* ── NETWORK GRAPH VIEW ─────────────────────────────────────────── */
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 10 },
                transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                className: "flex-1 min-w-0 flex",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 relative overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-5 py-2.5 border-b",
                        style: {
                          background: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(255,255,255,0.08)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-2 h-2 rounded-full animate-pulse",
                                style: {
                                  background: "#22c55e",
                                  boxShadow: "0 0 8px #22c55e"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest", children: "Live Topology View · Real-time" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3 h-3 text-cyan-400" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-cyan-400", children: "LIVE SYNC" })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 top-[41px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TopologyGraph, {}) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex-shrink-0 border-l",
                      style: { borderColor: "rgba(255,255,255,0.08)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TopologyNodePanel, { device: selectedDevice })
                    }
                  )
                ]
              },
              "graph"
            )
          ) }),
          viewMode === "sections" && selectedDevice && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.25 },
              className: "flex-shrink-0 border-l",
              style: { borderColor: "rgba(255,255,255,0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TopologyNodePanel, { device: selectedDevice })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 flex items-center justify-between gap-4 px-6 py-2.5 border-t flex-wrap",
            style: {
              background: "rgba(6,182,212,0.03)",
              borderColor: "rgba(255,255,255,0.08)"
            },
            "data-ocid": "topology-bottom-strip",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "w-3.5 h-3.5 text-white/30 mr-1" }),
                REGIONS.map((region) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setActiveRegion(region),
                    "data-ocid": `region-filter-${region.toLowerCase().replace(/\s+/g, "-")}`,
                    className: "px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all duration-200",
                    style: {
                      background: activeRegion === region ? "rgba(6,182,212,0.15)" : "transparent",
                      color: activeRegion === region ? "#06b6d4" : "rgba(255,255,255,0.35)",
                      border: `1px solid ${activeRegion === region ? "rgba(6,182,212,0.3)" : "transparent"}`
                    },
                    children: region
                  },
                  region
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                unresolvedAlerts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 text-red-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-red-400", children: [
                    unresolvedAlerts,
                    " Active Alerts"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all duration-200 border",
                    style: {
                      color: "rgba(255,255,255,0.5)",
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)"
                    },
                    "data-ocid": "topology-export-svg",
                    "aria-label": "Export topology as SVG",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                      "Export SVG"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  Topology as default
};
