import { c as createLucideIcon, j as jsxRuntimeExports, N as Network, p as GitFork, a as cn } from "./index-BhX-NLFL.js";
import { G as Globe } from "./globe-o8wpjV0G.js";
import { L as Link2 } from "./link-2-Cc-LQSqz.js";
import { W as Wifi } from "./wifi-CikS0v4P.js";
import { M as Monitor } from "./monitor-DzBn587y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
      key: "hh9hay"
    }
  ],
  ["path", { d: "m3.3 7 8.7 5 8.7-5", key: "g66t2b" }],
  ["path", { d: "M12 22V12", key: "d0xqtd" }]
];
const Box = createLucideIcon("box", __iconNode);
const ICONS = {
  OLT: Monitor,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network,
  Coupler: Link2,
  Router: Globe
};
const STATUS_COLOR = {
  active: "text-emerald-400",
  faulty: "text-red-400",
  warning: "text-amber-400"
};
const TYPE_ACCENT_HEX = {
  OLT: "#3b82f6",
  ONT: "#10b981",
  Splitter: "#f97316",
  JJB: "#eab308",
  Switch: "#14b8a6",
  Coupler: "#a855f7",
  Router: "#ef4444"
};
const SIZE_CLASS$1 = {
  sm: { icon: "w-3 h-3", wrap: "w-6 h-6 rounded" },
  md: { icon: "w-4 h-4", wrap: "w-8 h-8 rounded-md" },
  lg: { icon: "w-5 h-5", wrap: "w-10 h-10 rounded-lg" }
};
function DeviceIcon({
  type,
  status = "active",
  size = "md",
  variant = "filled",
  className
}) {
  const Icon = ICONS[type] ?? Monitor;
  const s = SIZE_CLASS$1[size];
  const color = STATUS_COLOR[status];
  const accent = TYPE_ACCENT_HEX[type];
  if (variant === "outline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "inline-flex items-center justify-center flex-shrink-0 rounded-full",
          s.wrap,
          className
        ),
        style: {
          border: `1.5px solid ${accent}70`,
          background: `${accent}12`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(s.icon, color) })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center justify-center bg-card border border-border/60 flex-shrink-0",
        s.wrap,
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(s.icon, color) })
    }
  );
}
const CONFIG = {
  active: {
    label: "ACTIVE",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/30",
    pulseClass: "animate-pulse-soft"
    // gentle pulse for active
  },
  faulty: {
    label: "FAULT",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
    pulseClass: ""
    // static red — no pulse
  },
  warning: {
    label: "WARN",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10 border border-amber-400/30",
    pulseClass: "animate-[pulse-soft_3s_ease-in-out_infinite]"
    // slow amber pulse
  },
  critical: {
    label: "CRIT",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
    pulseClass: ""
  },
  info: {
    label: "INFO",
    dot: "bg-primary",
    text: "text-primary",
    bg: "bg-primary/10 border border-primary/30",
    pulseClass: ""
  }
};
const SIZE_CLASS = {
  sm: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium",
  md: "status-badge font-mono uppercase tracking-widest",
  lg: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-widest"
};
const DOT_SIZE = {
  sm: "w-1 h-1",
  md: "w-1.5 h-1.5",
  lg: "w-2 h-2"
};
function StatusBadge({
  status,
  label,
  size = "md",
  className
}) {
  const cfg = CONFIG[status];
  const sizeClass = SIZE_CLASS[size];
  const dotSize = DOT_SIZE[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(sizeClass, cfg.bg, cfg.text, className),
      "data-ocid": `status-badge-${status}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "rounded-full flex-shrink-0",
              dotSize,
              cfg.dot,
              cfg.pulseClass
            )
          }
        ),
        label ?? cfg.label
      ]
    }
  );
}
export {
  DeviceIcon as D,
  StatusBadge as S
};
