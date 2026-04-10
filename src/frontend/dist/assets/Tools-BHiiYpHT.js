import { c as createLucideIcon, u as useNetworkStore, a2 as useRouter, r as reactExports, j as jsxRuntimeExports, T as TriangleAlert, a3 as Badge, A as AnimatePresence, m as motion, h as Cpu, a4 as ChevronRight, _ as Clock, a1 as mockAlerts, a5 as Wrench } from "./index-DMP4-mtx.js";
import { G as GlassCard } from "./GlassCard-DQgnb4pJ.js";
import { C as CircleCheckBig } from "./circle-check-big-D38wuU5Q.js";
import { B as Button } from "./button-UHhb8Ywf.js";
import { I as Input } from "./input-C_CA5Phm.js";
import { L as Label } from "./label-DwgwfxAM.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bm9uRnH9.js";
import { u as useForm, C as Controller } from "./index.esm-BT4dynpF.js";
import { R as RotateCcw } from "./rotate-ccw-CyasNc1P.js";
import { C as CircleX } from "./circle-x-BFNVnrBg.js";
import "./index-Dgj74BqG.js";
import "./index-IXOTxK3N.js";
import "./index-CTRQgjF2.js";
import "./index-Bz5V_vz8.js";
import "./check-Dyj5XuZ4.js";
import "./chevron-up-DkQp1a8O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode);
const ISSUE_TYPE_MAP = {
  OLT: "No Response",
  ONT: "Signal Loss",
  Splitter: "Port Fault",
  JJB: "Junction Error",
  Switch: "Link Down"
};
function relativeTime(ts) {
  const diffMs = Date.now() - ts;
  const diffMin = Math.floor(diffMs / 6e4);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
  return `${Math.floor(diffHr / 24)} day${Math.floor(diffHr / 24) !== 1 ? "s" : ""} ago`;
}
function getAlertTimestampForDevice(deviceId) {
  const alert = mockAlerts.find((a) => a.deviceId === deviceId);
  return alert ? alert.timestamp : Date.now() - 1e3 * 60 * 120;
}
function FaultCard({ device, index, onSelect }) {
  const issueType = ISSUE_TYPE_MAP[device.type] ?? "Unknown Fault";
  const timestamp = getAlertTimestampForDevice(device.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      "data-ocid": `fault-card-${device.id}`,
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 16 },
      transition: { delay: index * 0.05, duration: 0.28, ease: "easeOut" },
      onClick: onSelect,
      className: "w-full text-left rounded-xl border p-4 flex flex-col gap-2.5 cursor-pointer transition-smooth group",
      style: {
        background: "oklch(0.62 0.28 22 / 0.06)",
        borderColor: "oklch(0.62 0.28 22 / 0.35)",
        borderLeft: "3px solid oklch(0.62 0.28 22 / 0.8)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.background = "oklch(0.62 0.28 22 / 0.12)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.background = "oklch(0.62 0.28 22 / 0.06)";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cpu,
                {
                  className: "w-3 h-3 shrink-0",
                  style: { color: "oklch(0.72 0.28 22)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-widest text-muted-foreground uppercase", children: device.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: device.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border",
                style: {
                  background: "oklch(0.62 0.28 22 / 0.15)",
                  borderColor: "oklch(0.62 0.28 22 / 0.5)",
                  color: "oklch(0.72 0.28 22)"
                },
                children: "CRITICAL"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "w-3 h-3 shrink-0",
              style: { color: "oklch(0.72 0.28 22)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/70", children: issueType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-[10px] font-mono text-muted-foreground/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: relativeTime(timestamp) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Last active: ",
            relativeTime(timestamp + 1e3 * 60 * 8)
          ] }),
          device.signalStrength !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "ml-auto",
              style: { color: "oklch(0.72 0.28 22 / 0.9)" },
              children: [
                device.signalStrength,
                " dBm"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function FaultDetectionPanel() {
  const devices = useNetworkStore((s) => s.devices);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const router = useRouter();
  const [faultDevices, setFaultDevices] = reactExports.useState([]);
  reactExports.useEffect(() => {
    setFaultDevices(devices.filter((d) => d.status === "faulty"));
  }, [devices]);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setFaultDevices(
        useNetworkStore.getState().devices.filter((d) => d.status === "faulty")
      );
    }, 5e3);
    return () => clearInterval(id);
  }, []);
  function handleSelectFault(deviceId) {
    setSelectedDevice(deviceId);
    router.navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-6 flex flex-col gap-5 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-2 rounded-xl noc-glow-fault",
            style: { background: "oklch(0.62 0.28 22 / 0.12)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TriangleAlert,
              {
                className: "w-4 h-4",
                style: { color: "oklch(0.72 0.28 22)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-widest uppercase text-foreground/80 font-display", children: "Active Faults" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: faultDevices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          className: "text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border",
          style: {
            background: "oklch(0.62 0.28 22 / 0.15)",
            borderColor: "oklch(0.62 0.28 22 / 0.5)",
            color: "oklch(0.72 0.28 22)",
            boxShadow: "0 0 10px oklch(0.62 0.28 22 / 0.25)"
          },
          children: [
            faultDevices.length,
            " FAULT",
            faultDevices.length !== 1 ? "S" : ""
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          className: "text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border",
          style: {
            background: "oklch(0.62 0.22 142 / 0.12)",
            borderColor: "oklch(0.62 0.22 142 / 0.45)",
            color: "oklch(0.72 0.22 142)"
          },
          children: "ALL CLEAR"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col gap-2.5 overflow-y-auto noc-scrollbar min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: faultDevices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "fault-panel-empty",
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        className: "flex flex-col items-center justify-center gap-4 py-12 rounded-xl border",
        style: {
          background: "oklch(0.62 0.22 142 / 0.05)",
          borderColor: "oklch(0.62 0.22 142 / 0.25)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-4 rounded-2xl",
              style: {
                background: "oklch(0.62 0.22 142 / 0.12)",
                boxShadow: "0 0 20px oklch(0.62 0.22 142 / 0.2)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheckBig,
                {
                  className: "w-8 h-8",
                  style: { color: "oklch(0.72 0.22 142)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-semibold",
                style: { color: "oklch(0.72 0.22 142)" },
                children: "All systems operational"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No active faults detected" })
          ] })
        ]
      },
      "no-faults"
    ) : faultDevices.map((device, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      FaultCard,
      {
        device,
        index: i,
        onSelect: () => handleSelectFault(device.id)
      },
      device.id
    )) }) }),
    faultDevices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 text-center font-mono", children: "Click a fault card to view on map · Auto-refreshes every 5s" })
  ] });
}
const SPLITTER_OPTIONS = [
  { label: "1×2 (3.5 dB)", value: "3.5" },
  { label: "1×4 (7 dB)", value: "7" },
  { label: "1×8 (10.5 dB)", value: "10.5" }
];
const TX_POWER = -27;
const THRESHOLD = -28;
function PowerCalculator() {
  const [result, setResult] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fiberLength: 1,
      splitterType: "3.5",
      splitterCount: 1,
      connectorCount: 2,
      spliceCount: 4
    }
  });
  function onSubmit(values) {
    const splitterLoss = Number.parseFloat(values.splitterType);
    const totalLoss = values.fiberLength * 0.25 + splitterLoss * values.splitterCount + values.connectorCount * 0.5 + values.spliceCount * 0.1;
    const signalAtONT = TX_POWER - totalLoss;
    const pass = signalAtONT >= THRESHOLD;
    const margin = signalAtONT - THRESHOLD;
    const nearThreshold = signalAtONT >= THRESHOLD && signalAtONT < THRESHOLD + 3;
    setResult({ totalLoss, signalAtONT, pass, margin, nearThreshold });
  }
  function onReset() {
    reset();
    setResult(null);
  }
  const barPercent = result ? Math.min(100, Math.max(0, (result.margin + 6) / 12 * 100)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-6 flex flex-col gap-5 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-4 h-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-widest uppercase text-foreground/80 font-display", children: "Power Budget Calculator" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "fiberLength",
            className: "text-xs text-muted-foreground uppercase tracking-wider",
            children: "Fiber Length (km)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "fiberLength",
            type: "number",
            step: "0.1",
            min: "0.1",
            "data-ocid": "calc-fiber-length",
            className: "bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40",
            ...register("fiberLength", {
              required: "Required",
              min: { value: 0.1, message: "Min 0.1 km" },
              valueAsNumber: true
            })
          }
        ),
        errors.fiberLength && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-destructive", children: errors.fiberLength.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Splitter Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Controller,
          {
            control,
            name: "splitterType",
            render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "calc-splitter-type",
                  className: "bg-muted/30 border-border/40 font-mono text-sm focus:ring-primary/40",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-card border-border/50", children: SPLITTER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectItem,
                {
                  value: opt.value,
                  className: "font-mono text-sm",
                  children: opt.label
                },
                opt.value
              )) })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "splitterCount",
              className: "text-xs text-muted-foreground uppercase tracking-wider",
              children: "Splitters"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "splitterCount",
              type: "number",
              min: "0",
              "data-ocid": "calc-splitter-count",
              className: "bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40",
              ...register("splitterCount", {
                required: "Required",
                min: { value: 0, message: "≥ 0" },
                valueAsNumber: true
              })
            }
          ),
          errors.splitterCount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-destructive", children: errors.splitterCount.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "connectorCount",
              className: "text-xs text-muted-foreground uppercase tracking-wider",
              children: "Connectors"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "connectorCount",
              type: "number",
              min: "0",
              "data-ocid": "calc-connector-count",
              className: "bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40",
              ...register("connectorCount", {
                required: "Required",
                min: { value: 0, message: "≥ 0" },
                valueAsNumber: true
              })
            }
          ),
          errors.connectorCount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-destructive", children: errors.connectorCount.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "spliceCount",
              className: "text-xs text-muted-foreground uppercase tracking-wider",
              children: "Splices"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "spliceCount",
              type: "number",
              min: "0",
              "data-ocid": "calc-splice-count",
              className: "bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40",
              ...register("spliceCount", {
                required: "Required",
                min: { value: 0, message: "≥ 0" },
                valueAsNumber: true
              })
            }
          ),
          errors.spliceCount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-destructive", children: errors.spliceCount.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "calc-submit",
            className: "flex-1 bg-primary/20 hover:bg-primary/35 text-primary border border-primary/40 noc-glow font-display text-xs tracking-widest uppercase transition-smooth",
            children: "Calculate"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            "data-ocid": "calc-reset",
            onClick: onReset,
            className: "border-border/40 bg-muted/20 hover:bg-muted/40 text-muted-foreground text-xs transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3, ease: "easeOut" },
        className: "flex flex-col gap-4 pt-2 border-t border-border/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Total Loss" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-2xl font-bold text-foreground tabular-nums", children: [
                result.totalLoss.toFixed(2),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: "dB" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Signal at ONT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-mono text-2xl font-bold tabular-nums",
                    style: {
                      color: result.pass ? "oklch(0.62 0.22 142)" : "oklch(0.62 0.28 22)"
                    },
                    children: [
                      result.signalAtONT.toFixed(1),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: "dBm" })
                    ]
                  }
                ),
                result.nearThreshold && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TriangleAlert,
                  {
                    className: "w-4 h-4 shrink-0",
                    style: { color: "oklch(0.7 0.25 55)" }
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            result.pass ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                "data-ocid": "calc-result-pass",
                className: "gap-1.5 px-3 py-1 text-xs font-bold tracking-widest uppercase font-display border",
                style: {
                  background: "oklch(0.62 0.22 142 / 0.15)",
                  borderColor: "oklch(0.62 0.22 142 / 0.5)",
                  color: "oklch(0.72 0.22 142)",
                  boxShadow: "0 0 12px oklch(0.62 0.22 142 / 0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                  "PASS"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                "data-ocid": "calc-result-fail",
                className: "gap-1.5 px-3 py-1 text-xs font-bold tracking-widest uppercase font-display border",
                style: {
                  background: "oklch(0.62 0.28 22 / 0.15)",
                  borderColor: "oklch(0.62 0.28 22 / 0.5)",
                  color: "oklch(0.72 0.28 22)",
                  boxShadow: "0 0 12px oklch(0.62 0.28 22 / 0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
                  "FAIL"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
              "TX ",
              TX_POWER,
              " dBm → threshold ",
              THRESHOLD,
              " dBm"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Signal Margin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono font-semibold",
                  style: {
                    color: result.pass ? "oklch(0.62 0.22 142)" : "oklch(0.62 0.28 22)"
                  },
                  children: [
                    result.margin >= 0 ? "+" : "",
                    result.margin.toFixed(1),
                    " dB headroom"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full bg-muted/40 overflow-hidden border border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${barPercent}%` },
                transition: { duration: 0.5, ease: "easeOut" },
                className: "h-full rounded-full",
                style: {
                  background: result.pass ? "linear-gradient(90deg, oklch(0.5 0.2 142), oklch(0.72 0.22 142))" : "linear-gradient(90deg, oklch(0.5 0.24 22), oklch(0.72 0.28 22))",
                  boxShadow: result.pass ? "0 0 8px oklch(0.62 0.22 142 / 0.5)" : "0 0 8px oklch(0.62 0.28 22 / 0.5)"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[9px] text-muted-foreground/60 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "−6 dB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0 dB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+6 dB" })
            ] })
          ] }),
          result.nearThreshold && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              className: "flex items-start gap-2 p-3 rounded-xl border",
              style: {
                background: "oklch(0.7 0.25 55 / 0.08)",
                borderColor: "oklch(0.7 0.25 55 / 0.35)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TriangleAlert,
                  {
                    className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                    style: { color: "oklch(0.7 0.25 55)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[11px] leading-relaxed",
                    style: { color: "oklch(0.75 0.2 55)" },
                    children: "Signal is within 3 dB of failure threshold. Consider adding a booster or reducing span length."
                  }
                )
              ]
            }
          )
        ]
      },
      "results"
    ) })
  ] });
}
function Tools() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 p-6 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-primary/10 noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold tracking-tight text-foreground font-display", children: "Network Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: "Power budget analysis · Active fault detection" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "tools-panel-grid",
        className: "grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PowerCalculator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaultDetectionPanel, {})
        ]
      }
    )
  ] });
}
export {
  Tools as default
};
