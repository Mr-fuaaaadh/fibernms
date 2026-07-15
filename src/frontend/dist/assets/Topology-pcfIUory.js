import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, S as Server, C as ChevronDown, q as ChevronRight, s as CircleAlert, A as AnimatePresence, M as MapPin, N as Network, X, e as Cpu, d as Activity, k as useIsMobile, t as Search, T as TriangleAlert, G as GitBranch } from "./index-BhX-NLFL.js";
import { D as Diamond } from "./diamond-D6PDW6H8.js";
import { W as Wifi } from "./wifi-CikS0v4P.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-BnrvD9Ya.js";
import { R as ResponsiveContainer, T as Tooltip } from "./generateCategoricalChart-Cd_4XozO.js";
import { L as LineChart } from "./LineChart-106iD8FV.js";
import { Y as YAxis } from "./YAxis-DJ3E17W6.js";
import { L as Line } from "./Line-DFln6Xuk.js";
import { R as RefreshCw } from "./refresh-cw-CSaOG_fq.js";
import { T as Terminal } from "./terminal-ChWmpmJZ.js";
import { E as Eye } from "./eye-DZId2ECu.js";
import { P as Pencil } from "./pencil-Bca_uC_H.js";
import { u as ue } from "./index-wIYsNRKm.js";
import { L as Layers } from "./layers-DxFdloZB.js";
import { C as CircleX } from "./circle-x-DD8BlJOG.js";
import { D as Download } from "./download-D7u75BDX.js";
import { C as CircleCheck } from "./circle-check-k6E8EYPA.js";
import { W as WifiOff } from "./wifi-off-BI_26hxd.js";
import { F as Funnel } from "./funnel-Dq0Ua2ft.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode);
const STATUS_CFG = {
  online: {
    label: "Online",
    dot: "#22c55e",
    bg: "#f0fdf4",
    border: "#86efac",
    text: "#166534"
  },
  warning: {
    label: "Warning",
    dot: "#f59e0b",
    bg: "#fffbeb",
    border: "#fcd34d",
    text: "#92400e"
  },
  critical: {
    label: "Critical",
    dot: "#ef4444",
    bg: "#fef2f2",
    border: "#fca5a5",
    text: "#991b1b"
  },
  offline: {
    label: "Offline",
    dot: "#94a3b8",
    bg: "#f8fafc",
    border: "#cbd5e1",
    text: "#475569"
  }
};
function StatusBadge({
  status,
  pulse
}) {
  const cfg = STATUS_CFG[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold flex-shrink-0 border",
      style: { background: cfg.bg, borderColor: cfg.border, color: cfg.text },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${pulse && status === "critical" ? "animate-pulse" : ""}`,
            style: {
              background: cfg.dot,
              boxShadow: pulse && status === "critical" ? `0 0 5px ${cfg.dot}` : void 0
            }
          }
        ),
        cfg.label
      ]
    }
  );
}
function AlarmBadge({
  count,
  pulse
}) {
  if (count === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold font-mono flex-shrink-0 border ${pulse ? "animate-pulse" : ""}`,
      style: {
        background: "#fef2f2",
        borderColor: "#fca5a5",
        color: "#dc2626"
      },
      children: count
    }
  );
}
function PortBar({ used, total }) {
  const pct = total > 0 ? used / total * 100 : 0;
  const color = pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#22c55e";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 h-1.5 rounded-full overflow-hidden",
        style: { background: "#e2e8f0" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full transition-all duration-500",
            style: { width: `${pct}%`, background: color }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "text-[10px] font-mono flex-shrink-0",
        style: { color: "#64748b" },
        children: [
          used,
          "/",
          total
        ]
      }
    )
  ] });
}
function ONTRow({ ont, index, isSelected, onSelect, lineStatus }) {
  const lineColor = lineStatus === "critical" ? "#fca5a5" : lineStatus === "warning" ? "#fcd34d" : "#bbf7d0";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.2, delay: index * 0.03 },
      className: "relative pl-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 top-1/2 w-4 h-px",
            style: { background: lineColor }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect({ kind: "ont", data: ont }),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                onSelect({ kind: "ont", data: ont });
            },
            "data-ocid": `ont-row.item.${index + 1}`,
            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150 group min-h-[44px] border",
            style: {
              background: isSelected ? "#eef2ff" : "#f8fafc",
              borderColor: isSelected ? "#c7d2fe" : "#e2e8f0"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded flex items-center justify-center flex-shrink-0",
                  style: { background: "#ecfeff", border: "1px solid #a5f3fc" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3", style: { color: "#0891b2" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono font-medium truncate group-hover:text-indigo-700 transition-colors",
                      style: { color: "#334155" },
                      children: ont.name
                    }
                  ),
                  ont.alarms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlarmBadge,
                    {
                      count: ont.alarms.length,
                      pulse: ont.status === "critical"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono truncate block",
                    style: { color: "#94a3b8" },
                    children: ont.customerName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex items-center gap-1 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-[10px] font-mono",
                  style: {
                    color: ont.signalLevel >= -20 ? "#16a34a" : ont.signalLevel >= -26 ? "#d97706" : "#dc2626"
                  },
                  children: [
                    ont.signalLevel,
                    " dBm"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ont.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-mono hidden lg:block flex-shrink-0 w-16 text-right",
                  style: { color: "#94a3b8" },
                  children: ont.lastSeen
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function SplitterRow({
  splitter,
  index,
  isSelected,
  onSelect,
  selectedId,
  oltStatus
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const alarmCount = splitter.alarms.length + splitter.onts.reduce((a, o) => a + o.alarms.length, 0);
  const hasCritical = splitter.status === "critical" || splitter.onts.some((o) => o.status === "critical");
  const lineColor = oltStatus === "critical" ? "#fca5a5" : oltStatus === "warning" ? "#fcd34d" : "#bbf7d0";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-0 top-5 w-3 h-px",
        style: { background: lineColor }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25, delay: index * 0.05 },
        className: "mb-0.5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer group transition-all duration-150 min-h-[44px] border",
            style: {
              background: isSelected ? "#fff7ed" : "#fafafa",
              borderColor: isSelected ? "#fed7aa" : "#e2e8f0"
            },
            onClick: () => onSelect({ kind: "splitter", data: splitter }),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                onSelect({ kind: "splitter", data: splitter });
            },
            "data-ocid": `splitter-row.item.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors",
                  style: { color: "#94a3b8" },
                  onClick: (e) => {
                    e.stopPropagation();
                    setExpanded((v) => !v);
                  },
                  "aria-label": expanded ? "Collapse ONTs" : "Expand ONTs",
                  "data-ocid": `splitter-expand.${index + 1}`,
                  children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-6 h-6 rounded flex items-center justify-center flex-shrink-0",
                  style: { background: "#fff7ed", border: "1px solid #fed7aa" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Diamond, { className: "w-3 h-3", style: { color: "#ea580c" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono font-semibold truncate group-hover:text-orange-700 transition-colors",
                      style: { color: "#334155" },
                      children: splitter.name
                    }
                  ),
                  alarmCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmBadge, { count: alarmCount, pulse: hasCritical })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-mono",
                      style: { color: "#94a3b8" },
                      children: splitter.ip
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[10px] font-mono",
                      style: { color: "#cbd5e1" },
                      children: "·"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] font-mono",
                      style: { color: "#94a3b8" },
                      children: [
                        splitter.onts.length,
                        " ONTs"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-24 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortBar, { used: splitter.portsUsed, total: splitter.portCount }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: splitter.status, pulse: true })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
        className: "overflow-hidden pl-4 flex flex-col gap-0.5 mb-1",
        children: splitter.onts.map((ont, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ONTRow,
          {
            ont,
            index: i,
            isSelected: selectedId === ont.id,
            onSelect,
            lineStatus: splitter.status
          },
          ont.id
        ))
      }
    ) })
  ] });
}
function OLTSectionCard({
  olt,
  index,
  selectedId,
  onSelect
}) {
  const [expanded, setExpanded] = reactExports.useState(true);
  const isSelected = selectedId === olt.id;
  const alarmCount = olt.alarms.length + olt.splitters.reduce(
    (a, s) => a + s.alarms.length + s.onts.reduce((b, o) => b + o.alarms.length, 0),
    0
  );
  const hasCritical = olt.status === "critical" || olt.splitters.some(
    (s) => s.status === "critical" || s.onts.some((o) => o.status === "critical")
  );
  const portPct = olt.portTotal > 0 ? olt.portUsed / olt.portTotal * 100 : 0;
  const portColor = portPct > 90 ? "#ef4444" : portPct > 70 ? "#f59e0b" : "#22c55e";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.35,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1]
      },
      className: "rounded-xl overflow-hidden flex flex-col border",
      style: {
        background: "#ffffff",
        borderColor: isSelected ? "#c7d2fe" : "#e2e8f0",
        boxShadow: isSelected ? "0 0 0 2px #c7d2fe, 0 4px 16px rgba(79,70,229,0.08)" : "0 1px 6px rgba(0,0,0,0.06)"
      },
      "data-ocid": `olt-section-card.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "px-4 py-3 flex flex-col gap-3 cursor-pointer select-none text-left w-full",
            style: { background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
            onClick: () => onSelect({ kind: "olt", data: olt }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                    style: { background: "#eef2ff", border: "1px solid #c7d2fe" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4", style: { color: "#4f46e5" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-sm font-mono font-bold truncate",
                        style: { color: "#0f172a" },
                        children: olt.name
                      }
                    ),
                    alarmCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmBadge, { count: alarmCount, pulse: hasCritical })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[11px] font-mono",
                      style: { color: "#64748b" },
                      children: [
                        olt.ip,
                        " · ",
                        olt.firmware
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: olt.status, pulse: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 hover:bg-slate-100",
                    style: { color: "#94a3b8" },
                    onClick: (e) => {
                      e.stopPropagation();
                      setExpanded((v) => !v);
                    },
                    "aria-label": expanded ? "Collapse OLT" : "Expand OLT",
                    "data-ocid": `olt-expand.${index + 1}`,
                    children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
                {
                  label: "Uptime",
                  value: `${olt.uptime.toFixed(2)}%`,
                  color: olt.uptime >= 99 ? "#16a34a" : olt.uptime >= 95 ? "#d97706" : "#dc2626"
                },
                {
                  label: "Ports",
                  value: `${olt.portUsed}/${olt.portTotal}`,
                  color: portColor
                },
                {
                  label: "↓ DS",
                  value: `${olt.downstreamGbps} Gbps`,
                  color: "#0891b2"
                },
                {
                  label: "↑ US",
                  value: `${olt.upstreamGbps} Gbps`,
                  color: "#4f46e5"
                }
              ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col gap-0.5 px-2 py-1.5 rounded-lg border",
                  style: { background: "#ffffff", borderColor: "#e2e8f0" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[9px] font-mono uppercase tracking-widest",
                        style: { color: "#94a3b8" },
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono font-bold", style: { color }, children: value })
                  ]
                },
                label
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PortBar, { used: olt.portUsed, total: olt.portTotal }),
              olt.alarms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: olt.alarms.slice(0, 2).map((alarm, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-2 px-2 py-1.5 rounded-lg border",
                  style: {
                    background: alarm.severity === "critical" ? "#fef2f2" : alarm.severity === "major" ? "#fffbeb" : "#f8fafc",
                    borderColor: alarm.severity === "critical" ? "#fca5a5" : alarm.severity === "major" ? "#fcd34d" : "#e2e8f0"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleAlert,
                      {
                        className: "w-3 h-3 flex-shrink-0 mt-0.5",
                        style: {
                          color: alarm.severity === "critical" ? "#dc2626" : alarm.severity === "major" ? "#d97706" : "#94a3b8"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] font-mono leading-tight",
                        style: { color: "#475569" },
                        children: alarm.message
                      }
                    )
                  ]
                },
                `olt-alarm-${olt.id}-${i}`
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-3 py-3 flex flex-col gap-1",
                style: { background: "#ffffff" },
                children: olt.splitters.map((spl, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SplitterRow,
                  {
                    splitter: spl,
                    index: i,
                    isSelected: selectedId === spl.id,
                    onSelect,
                    selectedId,
                    oltStatus: olt.status
                  },
                  spl.id
                ))
              }
            )
          }
        ) })
      ]
    }
  );
}
function makeONT(id, idx, splPrefix, status, signal) {
  const alarms = [];
  if (status === "critical") {
    alarms.push({
      severity: "critical",
      message: "Signal below threshold (-28 dBm)"
    });
    alarms.push({ severity: "major", message: "Packet loss > 5% detected" });
  } else if (status === "warning") {
    alarms.push({
      severity: "minor",
      message: "Signal degradation trend detected"
    });
  }
  return {
    id,
    name: `ONT-${splPrefix}-${String(idx).padStart(3, "0")}`,
    customerName: [
      "Acme Corp",
      "BlueStar ISP",
      "Horizon Net",
      "CityFiber",
      "DataPeak Ltd",
      "GlobalLink",
      "FastNet Co",
      "Apex Telecom",
      "TowerBridge ISP",
      "Zenith Net",
      "OmniConnect",
      "SpeedFiber",
      "Pulse Networks",
      "AtlasTech",
      "Vertex ISP"
    ][idx % 15],
    ip: `192.168.${10 + idx % 20}.${100 + idx}`,
    mac: `00:1A:2B:${String(idx * 3).padStart(2, "0")}:${String(idx * 7 % 99).padStart(2, "0")}:${String(idx * 11 % 99).padStart(2, "0")}`,
    firmware: `v4.${idx % 3}.${idx % 7}`,
    signalLevel: signal,
    status,
    lastSeen: status === "offline" ? "3h ago" : status === "critical" ? "2m ago" : "Just now",
    uptime: status === "critical" ? 91.2 : status === "warning" ? 97.4 : 99.8,
    latency: status === "critical" ? 45 : status === "warning" ? 18 : 3 + idx % 8,
    packetLoss: status === "critical" ? 6.2 : status === "warning" ? 1.1 : 0.01,
    alarms
  };
}
const TOPOLOGY_DATA = [
  {
    id: "olt-core-01",
    name: "OLT-CORE-01",
    ip: "192.168.1.1",
    mac: "00:1B:21:AA:01:01",
    firmware: "v9.4.2",
    location: "Data Center Alpha, Rack A-12",
    region: "North",
    status: "online",
    uptime: 99.97,
    portTotal: 16,
    portUsed: 14,
    downstreamGbps: 18.4,
    upstreamGbps: 4.2,
    latency: 2,
    packetLoss: 0,
    alarms: [],
    splitters: [
      {
        id: "spl-zone-a1",
        name: "SPL-ZONE-A1",
        ip: "192.168.2.1",
        mac: "00:1B:21:BB:02:01",
        firmware: "v3.2.1",
        location: "Distribution Hub A, Port 1",
        status: "online",
        portCount: 8,
        portsUsed: 6,
        uptime: 99.9,
        latency: 3,
        packetLoss: 0,
        alarms: [],
        onts: [
          makeONT("ont-a1-001", 1, "A1", "online", -16),
          makeONT("ont-a1-002", 2, "A1", "online", -18),
          makeONT("ont-a1-003", 3, "A1", "warning", -22),
          makeONT("ont-a1-004", 4, "A1", "online", -15),
          makeONT("ont-a1-005", 5, "A1", "online", -17),
          makeONT("ont-a1-006", 6, "A1", "online", -19)
        ]
      },
      {
        id: "spl-zone-a2",
        name: "SPL-ZONE-A2",
        ip: "192.168.2.2",
        mac: "00:1B:21:BB:02:02",
        firmware: "v3.2.1",
        location: "Distribution Hub A, Port 2",
        status: "online",
        portCount: 8,
        portsUsed: 8,
        uptime: 99.8,
        latency: 4,
        packetLoss: 0.01,
        alarms: [],
        onts: [
          makeONT("ont-a2-001", 7, "A2", "online", -16),
          makeONT("ont-a2-002", 8, "A2", "online", -17),
          makeONT("ont-a2-003", 9, "A2", "online", -20),
          makeONT("ont-a2-004", 10, "A2", "critical", -29),
          makeONT("ont-a2-005", 11, "A2", "online", -15)
        ]
      },
      {
        id: "spl-zone-a3",
        name: "SPL-ZONE-A3",
        ip: "192.168.2.3",
        mac: "00:1B:21:BB:02:03",
        firmware: "v3.1.8",
        location: "Distribution Hub A, Port 3",
        status: "warning",
        portCount: 8,
        portsUsed: 5,
        uptime: 97.6,
        latency: 12,
        packetLoss: 0.8,
        alarms: [
          { severity: "minor", message: "High latency on ports 3-5" },
          { severity: "minor", message: "Optical power fluctuation" }
        ],
        onts: [
          makeONT("ont-a3-001", 12, "A3", "online", -18),
          makeONT("ont-a3-002", 13, "A3", "warning", -24),
          makeONT("ont-a3-003", 14, "A3", "online", -16),
          makeONT("ont-a3-004", 15, "A3", "warning", -23)
        ]
      },
      {
        id: "spl-zone-a4",
        name: "SPL-ZONE-A4",
        ip: "192.168.2.4",
        mac: "00:1B:21:BB:02:04",
        firmware: "v3.2.1",
        location: "Distribution Hub B, Port 1",
        status: "online",
        portCount: 8,
        portsUsed: 7,
        uptime: 99.9,
        latency: 3,
        packetLoss: 0,
        alarms: [],
        onts: [
          makeONT("ont-a4-001", 16, "A4", "online", -15),
          makeONT("ont-a4-002", 17, "A4", "online", -17),
          makeONT("ont-a4-003", 18, "A4", "online", -16),
          makeONT("ont-a4-004", 19, "A4", "online", -19),
          makeONT("ont-a4-005", 20, "A4", "online", -18),
          makeONT("ont-a4-006", 21, "A4", "online", -15),
          makeONT("ont-a4-007", 22, "A4", "online", -20)
        ]
      }
    ]
  },
  {
    id: "olt-dist-02",
    name: "OLT-DIST-02",
    ip: "192.168.1.2",
    mac: "00:1B:21:AA:01:02",
    firmware: "v9.3.7",
    location: "Data Center Beta, Rack B-04",
    region: "South",
    status: "warning",
    uptime: 97.82,
    portTotal: 16,
    portUsed: 11,
    downstreamGbps: 12.1,
    upstreamGbps: 2.8,
    latency: 8,
    packetLoss: 0.12,
    alarms: [
      {
        severity: "major",
        message: "Port 7 signal degradation — 3h sustained"
      },
      { severity: "minor", message: "Firmware upgrade available (v9.4.2)" }
    ],
    splitters: [
      {
        id: "spl-zone-b1",
        name: "SPL-ZONE-B1",
        ip: "192.168.3.1",
        mac: "00:1B:21:CC:03:01",
        firmware: "v3.2.1",
        location: "Cabinet B1, Street Level",
        status: "online",
        portCount: 8,
        portsUsed: 6,
        uptime: 99.7,
        latency: 5,
        packetLoss: 0.02,
        alarms: [],
        onts: [
          makeONT("ont-b1-001", 23, "B1", "online", -17),
          makeONT("ont-b1-002", 24, "B1", "online", -16),
          makeONT("ont-b1-003", 25, "B1", "online", -19),
          makeONT("ont-b1-004", 26, "B1", "online", -15),
          makeONT("ont-b1-005", 27, "B1", "online", -18)
        ]
      },
      {
        id: "spl-zone-b2",
        name: "SPL-ZONE-B2",
        ip: "192.168.3.2",
        mac: "00:1B:21:CC:03:02",
        firmware: "v3.1.8",
        location: "Cabinet B2, Street Level",
        status: "critical",
        portCount: 8,
        portsUsed: 8,
        uptime: 88.3,
        latency: 38,
        packetLoss: 4.5,
        alarms: [
          { severity: "critical", message: "Optical link failure on port 4" },
          { severity: "critical", message: "3 ONTs unreachable downstream" },
          {
            severity: "major",
            message: "Splitter receive power below -27 dBm"
          }
        ],
        onts: [
          makeONT("ont-b2-001", 28, "B2", "critical", -30),
          makeONT("ont-b2-002", 29, "B2", "offline", -35),
          makeONT("ont-b2-003", 30, "B2", "critical", -29),
          makeONT("ont-b2-004", 31, "B2", "warning", -25),
          makeONT("ont-b2-005", 32, "B2", "online", -17),
          makeONT("ont-b2-006", 33, "B2", "offline", -40)
        ]
      },
      {
        id: "spl-zone-b3",
        name: "SPL-ZONE-B3",
        ip: "192.168.3.3",
        mac: "00:1B:21:CC:03:03",
        firmware: "v3.2.1",
        location: "Cabinet B3, Rooftop",
        status: "online",
        portCount: 8,
        portsUsed: 4,
        uptime: 99.9,
        latency: 4,
        packetLoss: 0,
        alarms: [],
        onts: [
          makeONT("ont-b3-001", 34, "B3", "online", -15),
          makeONT("ont-b3-002", 35, "B3", "online", -18),
          makeONT("ont-b3-003", 36, "B3", "online", -16),
          makeONT("ont-b3-004", 37, "B3", "online", -20)
        ]
      },
      {
        id: "spl-zone-b4",
        name: "SPL-ZONE-B4",
        ip: "192.168.3.4",
        mac: "00:1B:21:CC:03:04",
        firmware: "v3.2.0",
        location: "Cabinet B4, Underground",
        status: "warning",
        portCount: 8,
        portsUsed: 5,
        uptime: 96.1,
        latency: 16,
        packetLoss: 0.9,
        alarms: [
          { severity: "minor", message: "Intermittent TX power variation" }
        ],
        onts: [
          makeONT("ont-b4-001", 38, "B4", "online", -18),
          makeONT("ont-b4-002", 39, "B4", "warning", -23),
          makeONT("ont-b4-003", 40, "B4", "online", -19),
          makeONT("ont-b4-004", 41, "B4", "online", -17),
          makeONT("ont-b4-005", 42, "B4", "warning", -24)
        ]
      },
      {
        id: "spl-zone-b5",
        name: "SPL-ZONE-B5",
        ip: "192.168.3.5",
        mac: "00:1B:21:CC:03:05",
        firmware: "v3.2.1",
        location: "Cabinet B5, Street Level",
        status: "online",
        portCount: 8,
        portsUsed: 6,
        uptime: 99.8,
        latency: 3,
        packetLoss: 0.01,
        alarms: [],
        onts: [
          makeONT("ont-b5-001", 43, "B5", "online", -16),
          makeONT("ont-b5-002", 44, "B5", "online", -15),
          makeONT("ont-b5-003", 45, "B5", "online", -17),
          makeONT("ont-b5-004", 46, "B5", "online", -18),
          makeONT("ont-b5-005", 47, "B5", "online", -16),
          makeONT("ont-b5-006", 48, "B5", "online", -19)
        ]
      }
    ]
  },
  {
    id: "olt-edge-03",
    name: "OLT-EDGE-03",
    ip: "192.168.1.3",
    mac: "00:1B:21:AA:01:03",
    firmware: "v9.4.2",
    location: "Edge PoP Site C, Rack C-01",
    region: "East",
    status: "online",
    uptime: 99.91,
    portTotal: 8,
    portUsed: 7,
    downstreamGbps: 9.6,
    upstreamGbps: 2.1,
    latency: 3,
    packetLoss: 0,
    alarms: [],
    splitters: [
      {
        id: "spl-zone-c1",
        name: "SPL-ZONE-C1",
        ip: "192.168.4.1",
        mac: "00:1B:21:DD:04:01",
        firmware: "v3.2.1",
        location: "Node C1, Industrial Zone",
        status: "online",
        portCount: 8,
        portsUsed: 8,
        uptime: 99.9,
        latency: 4,
        packetLoss: 0,
        alarms: [],
        onts: [
          makeONT("ont-c1-001", 49, "C1", "online", -16),
          makeONT("ont-c1-002", 50, "C1", "online", -15),
          makeONT("ont-c1-003", 51, "C1", "online", -17),
          makeONT("ont-c1-004", 52, "C1", "online", -18),
          makeONT("ont-c1-005", 53, "C1", "online", -16),
          makeONT("ont-c1-006", 54, "C1", "online", -20),
          makeONT("ont-c1-007", 55, "C1", "online", -15),
          makeONT("ont-c1-008", 56, "C1", "online", -17)
        ]
      },
      {
        id: "spl-zone-c2",
        name: "SPL-ZONE-C2",
        ip: "192.168.4.2",
        mac: "00:1B:21:DD:04:02",
        firmware: "v3.2.1",
        location: "Node C2, Residential Zone",
        status: "online",
        portCount: 8,
        portsUsed: 5,
        uptime: 99.7,
        latency: 5,
        packetLoss: 0.01,
        alarms: [],
        onts: [
          makeONT("ont-c2-001", 57, "C2", "online", -17),
          makeONT("ont-c2-002", 58, "C2", "online", -16),
          makeONT("ont-c2-003", 59, "C2", "online", -19),
          makeONT("ont-c2-004", 60, "C2", "online", -15),
          makeONT("ont-c2-005", 61, "C2", "online", -18)
        ]
      },
      {
        id: "spl-zone-c3",
        name: "SPL-ZONE-C3",
        ip: "192.168.4.3",
        mac: "00:1B:21:DD:04:03",
        firmware: "v3.2.0",
        location: "Node C3, Business Park",
        status: "warning",
        portCount: 8,
        portsUsed: 6,
        uptime: 95.4,
        latency: 21,
        packetLoss: 1.4,
        alarms: [
          { severity: "minor", message: "Downstream power loss on ports 5-6" }
        ],
        onts: [
          makeONT("ont-c3-001", 62, "C3", "online", -18),
          makeONT("ont-c3-002", 63, "C3", "warning", -25),
          makeONT("ont-c3-003", 64, "C3", "online", -16),
          makeONT("ont-c3-004", 65, "C3", "warning", -24),
          makeONT("ont-c3-005", 66, "C3", "online", -17),
          makeONT("ont-c3-006", 67, "C3", "online", -19)
        ]
      },
      {
        id: "spl-zone-c4",
        name: "SPL-ZONE-C4",
        ip: "192.168.4.4",
        mac: "00:1B:21:DD:04:04",
        firmware: "v3.2.1",
        location: "Node C4, Suburban",
        status: "online",
        portCount: 8,
        portsUsed: 4,
        uptime: 99.9,
        latency: 3,
        packetLoss: 0,
        alarms: [],
        onts: [
          makeONT("ont-c4-001", 68, "C4", "online", -15),
          makeONT("ont-c4-002", 69, "C4", "online", -17),
          makeONT("ont-c4-003", 70, "C4", "online", -16),
          makeONT("ont-c4-004", 71, "C4", "online", -18)
        ]
      }
    ]
  }
];
function getAllNodes() {
  const result = [];
  for (const olt of TOPOLOGY_DATA) {
    result.push({ kind: "olt", data: olt });
    for (const spl of olt.splitters) {
      result.push({ kind: "splitter", data: spl, oltId: olt.id });
      for (const ont of spl.onts) {
        result.push({
          kind: "ont",
          data: ont,
          splitterId: spl.id,
          oltId: olt.id
        });
      }
    }
  }
  return result;
}
function getStatusCounts() {
  const allNodes = getAllNodes();
  return {
    total: allNodes.length,
    online: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "online"
    ).length,
    warning: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "warning"
    ).length,
    critical: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "critical"
    ).length,
    offline: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "offline"
    ).length
  };
}
const OLT_Y = 80;
const SPLITTER_Y = 240;
const ONT_Y = 400;
const NODE_W = 120;
const NODE_H = 52;
const OLT_GAP = 380;
const ONT_GAP = 100;
const CANVAS_PAD = 60;
const STATUS_COLORS = {
  online: {
    fill: "#f0fdf4",
    stroke: "#86efac",
    text: "#166534",
    dot: "#22c55e"
  },
  warning: {
    fill: "#fffbeb",
    stroke: "#fcd34d",
    text: "#92400e",
    dot: "#f59e0b"
  },
  critical: {
    fill: "#fef2f2",
    stroke: "#fca5a5",
    text: "#991b1b",
    dot: "#ef4444"
  },
  offline: {
    fill: "#f8fafc",
    stroke: "#cbd5e1",
    text: "#475569",
    dot: "#94a3b8"
  }
};
const TYPE_COLORS = {
  OLT: { icon: "#4f46e5", bg: "#eef2ff", stroke: "#c7d2fe" },
  Splitter: { icon: "#ea580c", bg: "#fff7ed", stroke: "#fed7aa" },
  ONT: { icon: "#0891b2", bg: "#ecfeff", stroke: "#a5f3fc" }
};
function buildLayout() {
  const nodes = [];
  const edges = [];
  const oltGroups = TOPOLOGY_DATA.map((olt) => {
    const splGroups = olt.splitters.map((spl) => ({
      spl,
      ontCount: spl.onts.length,
      width: Math.max(NODE_W, spl.onts.length * ONT_GAP + (NODE_W - ONT_GAP))
    }));
    const groupW = splGroups.reduce((sum, g) => sum + g.width, 0) + (splGroups.length - 1) * 20;
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
      raw: olt
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
        raw: spl
      });
      edges.push({
        id: `e-${olt.id}-${spl.id}`,
        x1: oltCX,
        y1: OLT_Y + NODE_H,
        x2: splCX,
        y2: SPLITTER_Y,
        status: spl.status
      });
      const ontStartX = splCX - (spl.onts.length - 1) * ONT_GAP / 2;
      spl.onts.forEach((ont, oi) => {
        const ontCX = ontStartX + oi * ONT_GAP;
        nodes.push({
          id: ont.id,
          type: "ONT",
          kind: "ont",
          label: ont.name.length > 14 ? ont.name.slice(0, 14) : ont.name,
          sublabel: ont.customerName.length > 14 ? `${ont.customerName.slice(0, 14)}…` : ont.customerName,
          status: ont.status,
          x: ontCX - NODE_W / 2,
          y: ONT_Y,
          raw: ont
        });
        edges.push({
          id: `e-${spl.id}-${ont.id}`,
          x1: splCX,
          y1: SPLITTER_Y + NODE_H,
          x2: ontCX,
          y2: ONT_Y,
          status: ont.status
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
function edgePath(x1, y1, x2, y2) {
  const cy = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
}
function edgeColor(status) {
  if (status === "critical") return "#fca5a5";
  if (status === "warning") return "#fcd34d";
  if (status === "offline") return "#cbd5e1";
  return "#bbf7d0";
}
function GraphNode({
  node,
  isSelected,
  onSelect,
  index
}) {
  const sc = STATUS_COLORS[node.status];
  const tc = TYPE_COLORS[node.type];
  function handleClick(e) {
    e.stopPropagation();
    if (node.kind === "olt")
      onSelect({ kind: "olt", data: node.raw });
    else if (node.kind === "splitter")
      onSelect({ kind: "splitter", data: node.raw });
    else onSelect({ kind: "ont", data: node.raw });
  }
  const rx = node.type === "OLT" ? 12 : node.type === "Splitter" ? 10 : 8;
  const selectedStroke = isSelected ? "#4f46e5" : sc.stroke;
  const selectedSW = isSelected ? 2.5 : 1.5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.g,
    {
      initial: { opacity: 0, scale: 0.7 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.3,
        delay: index * 0.012,
        ease: [0.34, 1.56, 0.64, 1]
      },
      style: { cursor: "pointer" },
      onClick: handleClick,
      "data-ocid": `graph-node-${node.type.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "filter",
          {
            id: `shadow-${node.id}`,
            x: "-20%",
            y: "-20%",
            width: "140%",
            height: "140%",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "feDropShadow",
              {
                dx: "0",
                dy: "2",
                stdDeviation: "3",
                floodColor: isSelected ? "#4f46e5" : "#94a3b8",
                floodOpacity: isSelected ? "0.3" : "0.12"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: node.x,
            y: node.y,
            width: NODE_W,
            height: NODE_H,
            rx,
            fill: isSelected ? "#eef2ff" : sc.fill,
            stroke: selectedStroke,
            strokeWidth: selectedSW,
            filter: `url(#shadow-${node.id})`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: node.x + 1,
            y: node.y + 1,
            width: NODE_W - 2,
            height: 4,
            rx: rx - 1,
            fill: tc.bg
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: node.x + 14,
            cy: node.y + NODE_H / 2,
            r: 9,
            fill: tc.bg,
            stroke: tc.stroke,
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: node.x + NODE_W - 10,
            cy: node.y + 10,
            r: 4,
            fill: sc.dot,
            style: node.status === "critical" ? { filter: "drop-shadow(0 0 4px #ef4444)" } : void 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: node.x + 28,
            y: node.y + NODE_H / 2 - 5,
            fontSize: "9.5",
            fontWeight: "700",
            fill: sc.text,
            fontFamily: "ui-monospace,monospace",
            dominantBaseline: "middle",
            children: node.label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: node.x + 28,
            y: node.y + NODE_H / 2 + 9,
            fontSize: "8",
            fill: "#94a3b8",
            fontFamily: "ui-monospace,monospace",
            dominantBaseline: "middle",
            children: node.sublabel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: node.x + 14,
            y: node.y + NODE_H / 2,
            fontSize: "8",
            fontWeight: "800",
            fill: tc.icon,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fontFamily: "ui-monospace,monospace",
            children: node.type === "OLT" ? "O" : node.type === "Splitter" ? "S" : "N"
          }
        )
      ]
    },
    node.id
  );
}
function GraphLegend() {
  const items = [
    { label: "OLT", color: "#4f46e5", bg: "#eef2ff" },
    { label: "Splitter", color: "#ea580c", bg: "#fff7ed" },
    { label: "ONT", color: "#0891b2", bg: "#ecfeff" },
    { label: "Online", color: "#16a34a", bg: "#dcfce7" },
    { label: "Warning", color: "#d97706", bg: "#fef3c7" },
    { label: "Critical", color: "#dc2626", bg: "#fee2e2" },
    { label: "Offline", color: "#64748b", bg: "#f1f5f9" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono font-semibold border",
      style: {
        background: it.bg,
        color: it.color,
        borderColor: `${it.color}44`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full flex-shrink-0",
            style: { background: it.color }
          }
        ),
        it.label
      ]
    },
    it.label
  )) });
}
function TopologyGraph({
  searchQuery,
  filterStatus,
  filterType,
  selectedId,
  onSelect
}) {
  const { nodes, edges, canvasW, canvasH } = buildLayout();
  const [zoom, setZoom] = reactExports.useState(1);
  const [pan, setPan] = reactExports.useState({ x: 0, y: 0 });
  const isPanning = reactExports.useRef(false);
  const lastPos = reactExports.useRef({ x: 0, y: 0 });
  const svgRef = reactExports.useRef(null);
  const q = searchQuery.toLowerCase();
  const visibleIds = new Set(
    nodes.filter((n) => {
      if (q && !n.label.toLowerCase().includes(q) && !n.sublabel.toLowerCase().includes(q))
        return false;
      if (filterStatus !== "all" && n.status !== filterStatus) return false;
      if (filterType === "alarms") {
        const alarms = n.kind === "olt" ? n.raw.alarms.length : n.kind === "splitter" ? n.raw.alarms.length : n.raw.alarms.length;
        if (alarms === 0) return false;
      } else if (filterType !== "all" && n.type.toLowerCase() !== filterType.toLowerCase()) {
        return false;
      }
      return true;
    }).map((n) => n.id)
  );
  const filteredNodes = nodes.filter((n) => visibleIds.has(n.id));
  const filteredEdges = edges.filter((_e) => {
    if (visibleIds.size === nodes.length) return true;
    return true;
  });
  const onMouseDown = reactExports.useCallback((e) => {
    if (e.target.closest("[data-ocid]")) return;
    isPanning.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseMove = reactExports.useCallback((e) => {
    if (!isPanning.current) return;
    setPan((p) => ({
      x: p.x + e.clientX - lastPos.current.x,
      y: p.y + e.clientY - lastPos.current.y
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);
  const onMouseUp = reactExports.useCallback(() => {
    isPanning.current = false;
  }, []);
  const onWheel = reactExports.useCallback((e) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.3, Math.min(2.5, z - e.deltaY * 1e-3)));
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full min-h-0 topology-light",
      style: { background: "#f8fafc" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b",
            style: { background: "#ffffff", borderColor: "#e2e8f0" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-500", children: [
                  filteredNodes.length,
                  " nodes · ",
                  filteredEdges.length,
                  " edges"
                ] }),
                (q || filterStatus !== "all" || filterType !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200", children: "filtered" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: zoomOut,
                    "aria-label": "Zoom out",
                    className: "w-7 h-7 rounded-lg border flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-mono",
                    style: { borderColor: "#e2e8f0" },
                    "data-ocid": "graph-zoom-out",
                    children: "−"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: resetView,
                    className: "px-2 h-7 rounded-lg border flex items-center justify-center text-[10px] font-mono text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all min-w-[48px]",
                    style: { borderColor: "#e2e8f0" },
                    "data-ocid": "graph-zoom-reset",
                    children: [
                      Math.round(zoom * 100),
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: zoomIn,
                    "aria-label": "Zoom in",
                    className: "w-7 h-7 rounded-lg border flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-sm font-mono",
                    style: { borderColor: "#e2e8f0" },
                    "data-ocid": "graph-zoom-in",
                    children: "+"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 overflow-hidden relative select-none",
            style: { cursor: isPanning.current ? "grabbing" : "grab" },
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave: onMouseUp,
            onWheel,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "absolute inset-0 w-full h-full pointer-events-none",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "pattern",
                      {
                        id: "dots",
                        x: "0",
                        y: "0",
                        width: "24",
                        height: "24",
                        patternUnits: "userSpaceOnUse",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "1", cy: "1", r: "1", fill: "#cbd5e1", opacity: "0.5" })
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#dots)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  ref: svgRef,
                  style: {
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
                    marginTop: -canvasH / 2
                  },
                  viewBox: `0 0 ${canvasW} ${canvasH}`,
                  overflow: "visible",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Network Topology Graph" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: nodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "filter",
                      {
                        id: `shadow-${n.id}`,
                        x: "-20%",
                        y: "-20%",
                        width: "140%",
                        height: "140%",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "feDropShadow",
                          {
                            dx: "0",
                            dy: "2",
                            stdDeviation: selectedId === n.id ? 5 : 2.5,
                            floodColor: selectedId === n.id ? "#4f46e5" : "#94a3b8",
                            floodOpacity: selectedId === n.id ? "0.35" : "0.12"
                          }
                        )
                      },
                      `f-${n.id}`
                    )) }),
                    [
                      { y: OLT_Y - 18, label: "Layer 1 — OLT" },
                      { y: SPLITTER_Y - 18, label: "Layer 2 — Splitters" },
                      { y: ONT_Y - 18, label: "Layer 3 — ONTs" }
                    ].map(({ y, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: CANVAS_PAD,
                        y,
                        fontSize: "9",
                        fontWeight: "600",
                        fill: "#94a3b8",
                        fontFamily: "ui-monospace,monospace",
                        letterSpacing: "0.08em",
                        children: label.toUpperCase()
                      },
                      label
                    )),
                    [OLT_Y - 10, SPLITTER_Y - 10, ONT_Y - 10].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: CANVAS_PAD,
                        y1: y,
                        x2: canvasW - CANVAS_PAD,
                        y2: y,
                        stroke: "#e2e8f0",
                        strokeWidth: "1",
                        strokeDasharray: "4 4"
                      },
                      y
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.g,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { duration: 0.4 },
                        children: filteredEdges.map((e, i) => {
                          const dimmed = visibleIds.size < nodes.length && !visibleIds.has(e.id.split("-").slice(1, 3).join("-")) && !visibleIds.has(e.id.split("-").slice(-2).join("-"));
                          return /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.path,
                            {
                              d: edgePath(e.x1, e.y1, e.x2, e.y2),
                              fill: "none",
                              stroke: edgeColor(e.status),
                              strokeWidth: 1.8,
                              strokeDasharray: e.status === "offline" ? "5 3" : void 0,
                              opacity: dimmed ? 0.2 : 0.85,
                              initial: { pathLength: 0, opacity: 0 },
                              animate: { pathLength: 1, opacity: dimmed ? 0.2 : 0.85 },
                              transition: { duration: 0.5, delay: i * 4e-3 }
                            },
                            e.id
                          );
                        })
                      }
                    ),
                    nodes.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      GraphNode,
                      {
                        node: n,
                        isSelected: selectedId === n.id,
                        onSelect,
                        index: i
                      },
                      n.id
                    )),
                    visibleIds.size < nodes.length && nodes.filter((n) => !visibleIds.has(n.id)).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: n.x,
                        y: n.y,
                        width: NODE_W,
                        height: NODE_H,
                        rx: n.type === "OLT" ? 12 : 8,
                        fill: "#f8fafc",
                        opacity: "0.6",
                        pointerEvents: "none"
                      },
                      `dim-${n.id}`
                    ))
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 px-4 py-2 border-t flex items-center gap-3 overflow-x-auto scrollbar-none",
            style: { background: "#ffffff", borderColor: "#e2e8f0" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-slate-400 flex-shrink-0", children: "Legend:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraphLegend, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex-shrink-0 text-[10px] font-mono text-slate-400 hidden sm:block", children: "Scroll to zoom · Drag to pan · Click node for details" })
            ]
          }
        )
      ]
    }
  );
}
function makeSparkData(base, variance, len = 24) {
  let v = base;
  return Array.from({ length: len }, (_, i) => {
    v = Math.max(
      base - variance,
      Math.min(base + variance, v + (Math.random() - 0.5) * variance * 0.7)
    );
    return { t: i, v: Math.round(v * 10) / 10 };
  });
}
function Sparkline({
  base,
  variance,
  color,
  unit,
  label
}) {
  const data = reactExports.useMemo(() => makeSparkData(base, variance), [base, variance]);
  const last = data[data.length - 1].v;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg px-3 py-2.5 border",
      style: { background: "#f8fafc", borderColor: "#e2e8f0" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-mono uppercase tracking-widest",
              style: { color: "#94a3b8" },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold", style: { color }, children: [
            last,
            " ",
            unit
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 36, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          LineChart,
          {
            data,
            margin: { top: 2, right: 0, left: 0, bottom: 2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: ["auto", "auto"], hide: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 10,
                    fontFamily: "monospace",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                  },
                  itemStyle: { color },
                  labelStyle: { display: "none" },
                  formatter: (v) => [`${v} ${unit}`, label]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "v",
                  stroke: color,
                  strokeWidth: 1.5,
                  dot: false,
                  activeDot: { r: 3, fill: color, strokeWidth: 0 }
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function MetricRow({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between px-3 py-2 border-b last:border-b-0",
      style: { borderColor: "#f1f5f9" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] font-mono uppercase tracking-wide",
            style: { color: "#94a3b8" },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-mono text-right",
            style: { color: color ?? "#334155" },
            children: value
          }
        )
      ]
    }
  );
}
function ActionBtn({
  icon: Icon,
  label,
  ocid,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": ocid,
      "aria-label": label,
      className: "flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg transition-all duration-150 min-h-[52px] flex-1 group border hover:bg-slate-50",
      style: { background: "#f8fafc", borderColor: "#e2e8f0" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            className: "w-3.5 h-3.5 transition-colors",
            style: { color: color ?? "#64748b" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[9px] font-mono group-hover:text-slate-700 transition-colors",
            style: { color: "#94a3b8" },
            children: label
          }
        )
      ]
    }
  );
}
function OLTPanel({ data, onClose }) {
  const [tab, setTab] = reactExports.useState("overview");
  const totalAlarms = data.alarms.length + data.splitters.reduce(
    (a, s) => a + s.alarms.length + s.onts.reduce((b, o) => b + o.alarms.length, 0),
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PanelHeader,
      {
        name: data.name,
        type: "OLT",
        ip: data.ip,
        location: data.location,
        firmware: data.firmware,
        status: data.status,
        alarmCount: totalAlarms,
        onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTabs, { tab, setTab, alarmCount: totalAlarms }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 overflow-y-auto",
        style: { scrollbarColor: "#cbd5e1 transparent" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg overflow-hidden border",
                  style: { borderColor: "#e2e8f0" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "IP Address", value: data.ip }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "MAC", value: data.mac }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "Firmware", value: data.firmware }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "Region", value: data.region }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Uptime",
                        value: `${data.uptime.toFixed(2)}%`,
                        color: data.uptime >= 99 ? "#16a34a" : data.uptime >= 95 ? "#d97706" : "#dc2626"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Ports Used",
                        value: `${data.portUsed} / ${data.portTotal}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Downstream",
                        value: `${data.downstreamGbps} Gbps`,
                        color: "#0891b2"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Upstream",
                        value: `${data.upstreamGbps} Gbps`,
                        color: "#4f46e5"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Latency",
                        value: `${data.latency} ms`,
                        color: data.latency < 10 ? "#16a34a" : data.latency < 30 ? "#d97706" : "#dc2626"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Packet Loss",
                        value: `${data.packetLoss.toFixed(2)}%`,
                        color: data.packetLoss < 0.1 ? "#16a34a" : data.packetLoss < 1 ? "#d97706" : "#dc2626"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Splitters",
                        value: String(data.splitters.length)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-mono uppercase tracking-wide",
                          style: { color: "#94a3b8" },
                          children: "Location"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3", style: { color: "#94a3b8" } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-mono text-right max-w-[160px] truncate",
                            style: { color: "#475569" },
                            children: data.location
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              )
            },
            "ov"
          ),
          tab === "metrics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.downstreamGbps,
                    variance: data.downstreamGbps * 0.15,
                    color: "#0891b2",
                    unit: "Gbps",
                    label: "Downstream BW"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.upstreamGbps,
                    variance: data.upstreamGbps * 0.15,
                    color: "#4f46e5",
                    unit: "Gbps",
                    label: "Upstream BW"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.latency,
                    variance: data.latency * 0.5,
                    color: "#16a34a",
                    unit: "ms",
                    label: "Latency"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.packetLoss,
                    variance: 0.05,
                    color: "#d97706",
                    unit: "%",
                    label: "Packet Loss"
                  }
                )
              ]
            },
            "mt"
          ),
          tab === "alarms" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-1.5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmList, { alarms: data.alarms })
            },
            "al"
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelActions, { type: "OLT" })
  ] });
}
function SplitterPanel({
  data,
  onClose
}) {
  const [tab, setTab] = reactExports.useState("overview");
  const totalAlarms = data.alarms.length + data.onts.reduce((a, o) => a + o.alarms.length, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PanelHeader,
      {
        name: data.name,
        type: "Splitter",
        ip: data.ip,
        location: data.location,
        firmware: data.firmware,
        status: data.status,
        alarmCount: totalAlarms,
        onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTabs, { tab, setTab, alarmCount: totalAlarms }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 overflow-y-auto",
        style: { scrollbarColor: "#cbd5e1 transparent" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg overflow-hidden border",
                  style: { borderColor: "#e2e8f0" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "IP Address", value: data.ip }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "MAC", value: data.mac }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "Firmware", value: data.firmware }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Uptime",
                        value: `${data.uptime.toFixed(2)}%`,
                        color: data.uptime >= 99 ? "#16a34a" : data.uptime >= 95 ? "#d97706" : "#dc2626"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Ports",
                        value: `${data.portsUsed} / ${data.portCount} used`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Connected ONTs",
                        value: String(data.onts.length)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Latency",
                        value: `${data.latency} ms`,
                        color: data.latency < 10 ? "#16a34a" : data.latency < 30 ? "#d97706" : "#dc2626"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MetricRow,
                      {
                        label: "Packet Loss",
                        value: `${data.packetLoss.toFixed(2)}%`,
                        color: data.packetLoss < 0.1 ? "#16a34a" : data.packetLoss < 1 ? "#d97706" : "#dc2626"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-mono uppercase tracking-wide",
                          style: { color: "#94a3b8" },
                          children: "Location"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3", style: { color: "#94a3b8" } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-mono text-right max-w-[160px] truncate",
                            style: { color: "#475569" },
                            children: data.location
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              )
            },
            "ov"
          ),
          tab === "metrics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.latency,
                    variance: data.latency * 0.6,
                    color: "#0891b2",
                    unit: "ms",
                    label: "Latency"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.packetLoss,
                    variance: 0.05,
                    color: "#d97706",
                    unit: "%",
                    label: "Packet Loss"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.uptime,
                    variance: 0.5,
                    color: "#16a34a",
                    unit: "%",
                    label: "Uptime (rolling)"
                  }
                )
              ]
            },
            "mt"
          ),
          tab === "alarms" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-1.5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmList, { alarms: data.alarms })
            },
            "al"
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelActions, { type: "Splitter" })
  ] });
}
function ONTPanel({ data, onClose }) {
  const [tab, setTab] = reactExports.useState("overview");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PanelHeader,
      {
        name: data.name,
        type: "ONT",
        ip: data.ip,
        location: data.customerName,
        firmware: data.firmware,
        status: data.status,
        alarmCount: data.alarms.length,
        onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTabs, { tab, setTab, alarmCount: data.alarms.length }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 overflow-y-auto",
        style: { scrollbarColor: "#cbd5e1 transparent" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg overflow-hidden border",
                    style: { borderColor: "#e2e8f0" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MetricRow,
                        {
                          label: "Customer",
                          value: data.customerName,
                          color: "#0f172a"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "IP Address", value: data.ip }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "MAC", value: data.mac }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "Firmware", value: data.firmware }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MetricRow,
                        {
                          label: "Signal Level",
                          value: `${data.signalLevel} dBm`,
                          color: data.signalLevel >= -20 ? "#16a34a" : data.signalLevel >= -26 ? "#d97706" : "#dc2626"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MetricRow,
                        {
                          label: "Uptime",
                          value: `${data.uptime.toFixed(2)}%`,
                          color: data.uptime >= 99 ? "#16a34a" : data.uptime >= 95 ? "#d97706" : "#dc2626"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MetricRow,
                        {
                          label: "Latency",
                          value: `${data.latency} ms`,
                          color: data.latency < 10 ? "#16a34a" : data.latency < 30 ? "#d97706" : "#dc2626"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MetricRow,
                        {
                          label: "Packet Loss",
                          value: `${data.packetLoss.toFixed(2)}%`,
                          color: data.packetLoss < 0.1 ? "#16a34a" : data.packetLoss < 1 ? "#d97706" : "#dc2626"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricRow, { label: "Last Seen", value: data.lastSeen })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg px-3 py-2.5 border",
                    style: { background: "#f8fafc", borderColor: "#e2e8f0" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-mono uppercase tracking-widest",
                            style: { color: "#94a3b8" },
                            children: "Signal Quality"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-mono font-semibold",
                            style: {
                              color: data.signalLevel >= -20 ? "#16a34a" : data.signalLevel >= -26 ? "#d97706" : "#dc2626"
                            },
                            children: data.signalLevel >= -20 ? "Excellent" : data.signalLevel >= -26 ? "Fair" : "Poor"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-2 rounded-full overflow-hidden",
                          style: { background: "#e2e8f0" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full rounded-full transition-all duration-500",
                              style: {
                                width: `${Math.max(0, Math.min(100, (data.signalLevel + 35) / 20 * 100))}%`,
                                background: data.signalLevel >= -20 ? "#22c55e" : data.signalLevel >= -26 ? "#f59e0b" : "#ef4444"
                              }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[9px] font-mono",
                            style: { color: "#cbd5e1" },
                            children: "-35 dBm"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[9px] font-mono",
                            style: { color: "#cbd5e1" },
                            children: "-15 dBm"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ]
            },
            "ov"
          ),
          tab === "metrics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.signalLevel,
                    variance: 2,
                    color: "#0891b2",
                    unit: "dBm",
                    label: "Signal Level"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.latency,
                    variance: data.latency * 0.5,
                    color: "#16a34a",
                    unit: "ms",
                    label: "Latency"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkline,
                  {
                    base: data.packetLoss,
                    variance: 0.05,
                    color: "#d97706",
                    unit: "%",
                    label: "Packet Loss"
                  }
                )
              ]
            },
            "mt"
          ),
          tab === "alarms" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.15 },
              className: "p-3 flex flex-col gap-1.5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmList, { alarms: data.alarms })
            },
            "al"
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelActions, { type: "ONT" })
  ] });
}
const DEVICE_ICON = {
  OLT: Server,
  Splitter: Diamond,
  ONT: Wifi
};
const DEVICE_COLOR = {
  OLT: "#4f46e5",
  Splitter: "#ea580c",
  ONT: "#0891b2"
};
const DEVICE_BG = {
  OLT: "#eef2ff",
  Splitter: "#fff7ed",
  ONT: "#ecfeff"
};
const DEVICE_BORDER = {
  OLT: "#c7d2fe",
  Splitter: "#fed7aa",
  ONT: "#a5f3fc"
};
function PanelHeader({
  name,
  type,
  ip,
  location,
  firmware,
  status,
  alarmCount,
  onClose
}) {
  const Icon = DEVICE_ICON[type] ?? Server;
  const color = DEVICE_COLOR[type] ?? "#4f46e5";
  const bg = DEVICE_BG[type] ?? "#eef2ff";
  const border = DEVICE_BORDER[type] ?? "#c7d2fe";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-shrink-0 px-4 py-3 border-b",
      style: { borderColor: "#e2e8f0", background: "#f8fafc" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
              style: { background: bg, borderColor: border },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4.5 h-4.5", style: { color } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border",
                  style: { background: bg, color, borderColor: border },
                  children: type
                }
              ),
              alarmCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AlarmBadge, { count: alarmCount, pulse: status === "critical" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "text-sm font-mono font-bold truncate mt-0.5",
                style: { color: "#0f172a" },
                children: name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-[10px] font-mono truncate",
                style: { color: "#94a3b8" },
                children: [
                  ip,
                  " · ",
                  firmware
                ]
              }
            ),
            location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  className: "w-2.5 h-2.5 flex-shrink-0",
                  style: { color: "#94a3b8" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-mono truncate",
                  style: { color: "#64748b" },
                  children: location
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 hover:bg-slate-100",
              style: { color: "#94a3b8" },
              "aria-label": "Close panel",
              "data-ocid": "topology-panel-close",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status, pulse: true }) })
      ]
    }
  );
}
function PanelTabs({
  tab,
  setTab,
  alarmCount
}) {
  const tabs = [
    { key: "overview", label: "Overview", icon: Cpu },
    { key: "metrics", label: "Metrics", icon: ChartNoAxesColumn },
    {
      key: "alarms",
      label: `Alarms${alarmCount > 0 ? ` (${alarmCount})` : ""}`,
      icon: CircleAlert
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-shrink-0 flex border-b",
      style: { borderColor: "#e2e8f0", background: "#ffffff" },
      children: tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setTab(t.key),
            "data-ocid": `panel-tab-${t.key}`,
            className: "flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-mono transition-all duration-150",
            style: {
              color: active ? "#4338ca" : "#94a3b8",
              borderBottom: active ? "2px solid #4338ca" : "2px solid transparent",
              background: active ? "#f5f3ff" : "transparent",
              fontWeight: active ? 600 : 400
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
              t.label
            ]
          },
          t.key
        );
      })
    }
  );
}
function AlarmList({
  alarms
}) {
  if (alarms.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 py-8 text-center",
        "data-ocid": "panel-alarms.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8", style: { color: "#cbd5e1" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", style: { color: "#94a3b8" }, children: "No active alarms" })
        ]
      }
    );
  }
  const SEV = {
    critical: { text: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
    major: { text: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
    minor: { text: "#64748b", bg: "#f8fafc", border: "#e2e8f0" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: alarms.map((alarm, i) => {
    const s = SEV[alarm.severity] ?? SEV.minor;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-2.5 px-3 py-2 rounded-lg border",
        style: { background: s.bg, borderColor: s.border },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "w-3.5 h-3.5 flex-shrink-0 mt-0.5",
              style: { color: s.text }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[9px] font-mono uppercase tracking-widest mb-0.5 block font-bold",
                style: { color: s.text },
                children: alarm.severity
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-[11px] font-mono leading-tight",
                style: { color: "#475569" },
                children: alarm.message
              }
            )
          ] })
        ]
      },
      `alarm-${alarm.severity}-${alarm.message.slice(0, 20)}-${i}`
    );
  }) });
}
function PanelActions({ type: _type }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-shrink-0 p-3 border-t",
      style: { borderColor: "#e2e8f0", background: "#f8fafc" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-[9px] font-mono uppercase tracking-widest mb-2 px-1",
            style: { color: "#94a3b8" },
            children: "Actions"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionBtn,
            {
              icon: RefreshCw,
              label: "Ping",
              ocid: "panel-action-ping",
              color: "#16a34a"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionBtn,
            {
              icon: Terminal,
              label: "SSH",
              ocid: "panel-action-ssh",
              color: "#0891b2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionBtn,
            {
              icon: Eye,
              label: "Map",
              ocid: "panel-action-map",
              color: "#4f46e5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionBtn,
            {
              icon: Pencil,
              label: "Edit",
              ocid: "panel-action-edit",
              color: "#ea580c"
            }
          )
        ] })
      ]
    }
  );
}
function EmptyPanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center gap-4 px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 h-16 rounded-2xl flex items-center justify-center border",
        style: { background: "#eef2ff", borderColor: "#c7d2fe" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-7 h-7", style: { color: "#6366f1" } })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-sm font-mono font-semibold mb-1.5",
          style: { color: "#334155" },
          children: "No Device Selected"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs font-mono leading-relaxed max-w-[180px] mx-auto",
          style: { color: "#94a3b8" },
          children: "Click any node in the topology to view device details"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 px-3 py-2 rounded-lg border",
        style: { background: "#eef2ff", borderColor: "#c7d2fe" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono", style: { color: "#4338ca" }, children: "Topology ready · select a node" })
        ]
      }
    )
  ] });
}
function TopologyNodePanel({
  node,
  onClose,
  isMobileSheet = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: isMobileSheet ? "w-full" : "h-full overflow-hidden flex flex-col",
      style: {
        background: "#ffffff",
        borderLeft: isMobileSheet ? "none" : "1px solid #e2e8f0",
        width: isMobileSheet ? void 0 : 320,
        minWidth: isMobileSheet ? void 0 : 320
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: node ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: {
            opacity: 0,
            x: isMobileSheet ? 0 : 20,
            y: isMobileSheet ? 20 : 0
          },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: {
            opacity: 0,
            x: isMobileSheet ? 0 : 20,
            y: isMobileSheet ? 20 : 0
          },
          transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
          className: isMobileSheet ? "" : "h-full flex flex-col overflow-hidden",
          children: [
            node.kind === "olt" && /* @__PURE__ */ jsxRuntimeExports.jsx(OLTPanel, { data: node.data, onClose }),
            node.kind === "splitter" && /* @__PURE__ */ jsxRuntimeExports.jsx(SplitterPanel, { data: node.data, onClose }),
            node.kind === "ont" && /* @__PURE__ */ jsxRuntimeExports.jsx(ONTPanel, { data: node.data, onClose })
          ]
        },
        `${node.kind}-${node.data.id}`
      ) : !isMobileSheet && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          className: "h-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, {})
        },
        "empty"
      ) })
    }
  );
}
function KPICard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  borderColor,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay, ease: [0.4, 0, 0.2, 1] },
      className: "flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0 sm:flex-1",
      style: {
        background: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            style: { background: `${color}18`, border: `1px solid ${color}30` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", style: { color } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[10px] font-mono uppercase tracking-widest leading-none mb-1",
              style: { color: "#94a3b8" },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xl font-mono font-bold leading-none",
              style: { color },
              children: value
            }
          )
        ] })
      ]
    }
  );
}
function FilterPill({
  label,
  value,
  active,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onClick(value),
      "data-ocid": ocid,
      className: "px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-150 whitespace-nowrap flex-shrink-0 min-h-[32px] border",
      style: {
        background: active ? "#eef2ff" : "#f8fafc",
        borderColor: active ? "#c7d2fe" : "#e2e8f0",
        color: active ? "#4338ca" : "#64748b",
        fontWeight: active ? 600 : 400
      },
      children: label
    }
  );
}
function Topology() {
  const isMobile = useIsMobile(768);
  const [viewMode, setViewMode] = reactExports.useState("graph");
  const [selectedNode, setSelectedNode] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const [filterType, setFilterType] = reactExports.useState("all");
  const [syncSeconds, setSyncSeconds] = reactExports.useState(0);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    intervalRef.current = setInterval(() => setSyncSeconds((s) => s + 1), 1e3);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  const syncLabel = syncSeconds < 60 ? `${syncSeconds}s ago` : `${Math.floor(syncSeconds / 60)}m ago`;
  const counts = reactExports.useMemo(() => getStatusCounts(), []);
  const filteredOLTs = reactExports.useMemo(() => {
    const q = searchQuery.toLowerCase();
    return TOPOLOGY_DATA.filter((olt) => {
      if (filterStatus !== "all") {
        const hasStatus = (st) => {
          if (olt.status === st) return true;
          return olt.splitters.some(
            (s) => s.status === st || s.onts.some((o) => o.status === st)
          );
        };
        if (!hasStatus(filterStatus)) return false;
      }
      if (filterType === "olt") {
        if (q && !olt.name.toLowerCase().includes(q) && !olt.ip.includes(q))
          return false;
      } else if (filterType === "splitter") {
        const hasSpl = olt.splitters.some(
          (s) => !q || s.name.toLowerCase().includes(q) || s.ip.includes(q)
        );
        if (!hasSpl) return false;
      } else if (filterType === "ont") {
        const hasOnt = olt.splitters.some(
          (s) => s.onts.some(
            (o) => !q || o.name.toLowerCase().includes(q) || o.ip.includes(q)
          )
        );
        if (!hasOnt) return false;
      } else if (filterType === "alarms") {
        const hasAlarm = olt.alarms.length > 0 || olt.splitters.some(
          (s) => s.alarms.length > 0 || s.onts.some((o) => o.alarms.length > 0)
        );
        if (!hasAlarm) return false;
        if (q && !olt.name.toLowerCase().includes(q)) return false;
      } else {
        if (q && !olt.name.toLowerCase().includes(q) && !olt.ip.includes(q) && !olt.splitters.some(
          (s) => s.name.toLowerCase().includes(q) || s.ip.includes(q) || s.onts.some(
            (o) => o.name.toLowerCase().includes(q) || o.ip.includes(q)
          )
        ))
          return false;
      }
      return true;
    });
  }, [searchQuery, filterStatus, filterType]);
  const selectedId = (selectedNode == null ? void 0 : selectedNode.data.id) ?? null;
  const showPanel = selectedNode !== null;
  const showBottomSheet = isMobile && showPanel;
  function handleExport() {
    ue.success("Export queued — PNG/PDF ready in a few seconds");
  }
  function handleRefresh() {
    setSyncSeconds(0);
    ue.info("Topology data refreshed");
  }
  const STATUS_FILTERS = [
    { label: "All Devices", value: "all", ocid: "filter-status-all" },
    { label: "Online", value: "online", ocid: "filter-status-online" },
    { label: "Warning", value: "warning", ocid: "filter-status-warning" },
    { label: "Critical", value: "critical", ocid: "filter-status-critical" },
    { label: "Offline", value: "offline", ocid: "filter-status-offline" }
  ];
  const TYPE_FILTERS = [
    { label: "All Types", value: "all", ocid: "filter-type-all" },
    { label: "OLT Only", value: "olt", ocid: "filter-type-olt" },
    { label: "Splitters", value: "splitter", ocid: "filter-type-splitter" },
    { label: "ONT Only", value: "ont", ocid: "filter-type-ont" },
    { label: "With Alarms", value: "alarms", ocid: "filter-type-alarms" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3 },
      className: "topology-light flex flex-col h-full overflow-hidden",
      "data-ocid": "topology-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 px-4 sm:px-6 pt-4 pb-3 border-b",
            style: { background: "#ffffff", borderColor: "#e2e8f0" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1 mb-1.5 text-[10px] font-mono",
                      style: { color: "#94a3b8" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "NOC" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#64748b" }, children: "Network Topology" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                        style: { background: "#eef2ff", border: "1px solid #c7d2fe" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4", style: { color: "#4f46e5" } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h1",
                        {
                          className: "text-xl font-bold leading-tight",
                          style: {
                            color: "#0f172a",
                            fontFamily: "ui-monospace,monospace"
                          },
                          children: "Network Topology"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse",
                            style: { boxShadow: "0 0 6px #22c55e" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-[10px] font-mono",
                            style: { color: "#94a3b8" },
                            children: [
                              "Live · updated ",
                              syncLabel
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border",
                      style: { background: "#f8fafc", borderColor: "#e2e8f0" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Search,
                          {
                            className: "w-3.5 h-3.5 flex-shrink-0",
                            style: { color: "#94a3b8" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Search nodes, IPs…",
                            value: searchQuery,
                            onChange: (e) => setSearchQuery(e.target.value),
                            className: "bg-transparent text-xs font-mono outline-none w-36 lg:w-48",
                            style: { color: "#334155" },
                            "data-ocid": "topology-search-input"
                          }
                        ),
                        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSearchQuery(""),
                            "aria-label": "Clear search",
                            className: "transition-colors",
                            style: { color: "#94a3b8" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleRefresh,
                      className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all border hover:bg-slate-50",
                      style: {
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        color: "#64748b"
                      },
                      "aria-label": "Refresh topology",
                      "data-ocid": "topology-refresh-button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleExport,
                      className: "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-mono transition-all border hover:bg-slate-50",
                      style: {
                        background: "#f8fafc",
                        borderColor: "#e2e8f0",
                        color: "#64748b"
                      },
                      "data-ocid": "topology-export-button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                        "Export"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 overflow-x-auto scrollbar-none pb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KPICard,
                  {
                    label: "Total Nodes",
                    value: counts.total,
                    icon: Network,
                    color: "#4f46e5",
                    bgColor: "#f5f3ff",
                    borderColor: "#ddd6fe",
                    delay: 0
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KPICard,
                  {
                    label: "Online",
                    value: counts.online,
                    icon: CircleCheck,
                    color: "#16a34a",
                    bgColor: "#f0fdf4",
                    borderColor: "#bbf7d0",
                    delay: 0.04
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KPICard,
                  {
                    label: "Warning",
                    value: counts.warning,
                    icon: TriangleAlert,
                    color: "#d97706",
                    bgColor: "#fffbeb",
                    borderColor: "#fde68a",
                    delay: 0.08
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KPICard,
                  {
                    label: "Critical",
                    value: counts.critical,
                    icon: CircleX,
                    color: "#dc2626",
                    bgColor: "#fef2f2",
                    borderColor: "#fecaca",
                    delay: 0.12
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  KPICard,
                  {
                    label: "Offline",
                    value: counts.offline,
                    icon: WifiOff,
                    color: "#64748b",
                    bgColor: "#f8fafc",
                    borderColor: "#e2e8f0",
                    delay: 0.16
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 px-4 sm:px-6 py-2.5 border-b",
            style: { background: "#f8fafc", borderColor: "#e2e8f0" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-0.5 p-0.5 rounded-lg border",
                    style: { background: "#ffffff", borderColor: "#e2e8f0" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setViewMode("graph"),
                          "data-ocid": "topology-view-graph",
                          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono transition-all duration-150 min-h-[32px] border",
                          style: {
                            background: viewMode === "graph" ? "#eef2ff" : "transparent",
                            color: viewMode === "graph" ? "#4338ca" : "#64748b",
                            borderColor: viewMode === "graph" ? "#c7d2fe" : "transparent",
                            fontWeight: viewMode === "graph" ? 600 : 400
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-3.5 h-3.5" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Network Graph" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setViewMode("sections"),
                          "data-ocid": "topology-view-sections",
                          className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono transition-all duration-150 min-h-[32px] border",
                          style: {
                            background: viewMode === "sections" ? "#eef2ff" : "transparent",
                            color: viewMode === "sections" ? "#4338ca" : "#64748b",
                            borderColor: viewMode === "sections" ? "#c7d2fe" : "transparent",
                            fontWeight: viewMode === "sections" ? 600 : 400
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3.5 h-3.5" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "OLT Sections" })
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex sm:hidden flex-1 items-center gap-2 px-3 py-1.5 rounded-lg border",
                    style: { background: "#ffffff", borderColor: "#e2e8f0" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Search,
                        {
                          className: "w-3 h-3 flex-shrink-0",
                          style: { color: "#94a3b8" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "Search…",
                          value: searchQuery,
                          onChange: (e) => setSearchQuery(e.target.value),
                          className: "bg-transparent text-xs font-mono outline-none flex-1 min-w-0",
                          style: { color: "#334155" },
                          "data-ocid": "topology-search-input-mobile"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Funnel,
                  {
                    className: "w-3.5 h-3.5 flex-shrink-0 hidden sm:block",
                    style: { color: "#94a3b8" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-none", children: [
                STATUS_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FilterPill,
                  {
                    label: f.label,
                    value: f.value,
                    active: filterStatus === f.value,
                    onClick: setFilterStatus,
                    ocid: f.ocid
                  },
                  f.value
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-px h-6 self-center flex-shrink-0",
                    style: { background: "#e2e8f0" }
                  }
                ),
                TYPE_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FilterPill,
                  {
                    label: f.label,
                    value: f.value,
                    active: filterType === f.value,
                    onClick: setFilterType,
                    ocid: f.ocid
                  },
                  f.value
                ))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-1 min-h-0 overflow-hidden",
            style: { background: "#f8fafc" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: viewMode === "graph" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.2 },
                  className: "flex-1 min-w-0 overflow-hidden flex flex-col",
                  "data-ocid": "topology-graph-view",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TopologyGraph,
                    {
                      searchQuery,
                      filterStatus,
                      filterType,
                      selectedId,
                      onSelect: (node) => setSelectedNode(
                        (selectedNode == null ? void 0 : selectedNode.data.id) === node.data.id ? null : node
                      )
                    }
                  )
                },
                "graph"
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.2 },
                  className: "flex-1 min-w-0 overflow-y-auto",
                  style: {
                    paddingBottom: isMobile ? 80 : 0,
                    scrollbarColor: "#cbd5e1 transparent"
                  },
                  "data-ocid": "topology-sections-view",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 py-4", children: filteredOLTs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex flex-col items-center justify-center py-24 gap-4",
                      "data-ocid": "topology-sections.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-16 h-16 rounded-2xl flex items-center justify-center border",
                            style: { background: "#eef2ff", borderColor: "#c7d2fe" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Network,
                              {
                                className: "w-7 h-7",
                                style: { color: "#6366f1" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm font-mono",
                              style: { color: "#64748b" },
                              children: "No nodes match current filters"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setSearchQuery("");
                                setFilterStatus("all");
                                setFilterType("all");
                              },
                              className: "mt-2 text-xs font-mono transition-colors hover:underline",
                              style: { color: "#4f46e5" },
                              "data-ocid": "topology-clear-filters",
                              children: "Clear all filters"
                            }
                          )
                        ] })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: filteredOLTs.map((olt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    OLTSectionCard,
                    {
                      olt,
                      index: i,
                      selectedId,
                      onSelect: (node) => setSelectedNode(
                        (selectedNode == null ? void 0 : selectedNode.data.id) === node.data.id ? null : node
                      )
                    },
                    olt.id
                  )) }) })
                },
                "sections"
              ) }),
              !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showPanel && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { width: 0, opacity: 0 },
                  animate: { width: 320, opacity: 1 },
                  exit: { width: 0, opacity: 0 },
                  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                  className: "flex-shrink-0 overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TopologyNodePanel,
                    {
                      node: selectedNode,
                      onClose: () => setSelectedNode(null)
                    }
                  )
                },
                "side-panel"
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showBottomSheet && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.2 },
              className: "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm",
              onClick: () => setSelectedNode(null)
            },
            "overlay"
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { y: "100%" },
              animate: { y: 0 },
              exit: { y: "100%" },
              transition: { type: "spring", damping: 26, stiffness: 280 },
              className: "fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden border-t",
              style: {
                background: "#ffffff",
                borderColor: "#e2e8f0",
                maxHeight: "75vh"
              },
              "data-ocid": "topology-mobile-sheet",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-1 rounded-full",
                    style: { background: "#cbd5e1" }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "overflow-y-auto",
                    style: {
                      maxHeight: "calc(75vh - 24px)",
                      scrollbarColor: "#cbd5e1 transparent"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TopologyNodePanel,
                      {
                        node: selectedNode,
                        onClose: () => setSelectedNode(null),
                        isMobileSheet: true
                      }
                    )
                  }
                )
              ]
            },
            "sheet"
          )
        ] }) })
      ]
    }
  );
}
export {
  Topology as default
};
