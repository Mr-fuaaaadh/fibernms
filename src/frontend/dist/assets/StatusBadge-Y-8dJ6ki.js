import { c as createLucideIcon, j as jsxRuntimeExports, N as Network, G as GitFork, b as cn } from "./index-CZ0VXYC-.js";
import { W as Wifi } from "./wifi-C9evVs35.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
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
const Box = createLucideIcon("box", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", key: "w68u3i" }],
  ["path", { d: "M6.01 18H6", key: "19vcac" }],
  ["path", { d: "M10.01 18H10", key: "uamcmx" }],
  ["path", { d: "M15 10v4", key: "qjz1xs" }],
  ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0", key: "1rif40" }],
  ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0", key: "6a5xfq" }]
];
const Router = createLucideIcon("router", __iconNode);
const ICONS = {
  OLT: Router,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network
};
const STATUS_COLOR = {
  active: "text-emerald-400",
  faulty: "text-red-400",
  warning: "text-amber-400"
};
const SIZE_CLASS = {
  sm: { icon: "w-3 h-3", wrap: "w-6 h-6 rounded" },
  md: { icon: "w-4 h-4", wrap: "w-8 h-8 rounded-md" },
  lg: { icon: "w-5 h-5", wrap: "w-10 h-10 rounded-lg" }
};
function DeviceIcon({
  type,
  status = "active",
  size = "md",
  className
}) {
  const Icon = ICONS[type];
  const s = SIZE_CLASS[size];
  const color = STATUS_COLOR[status];
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
    bg: "bg-emerald-400/10 border border-emerald-400/30"
  },
  faulty: {
    label: "FAULT",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30"
  },
  warning: {
    label: "WARN",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10 border border-amber-400/30"
  },
  critical: {
    label: "CRITICAL",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30"
  },
  info: {
    label: "INFO",
    dot: "bg-primary",
    text: "text-primary",
    bg: "bg-primary/10 border border-primary/30"
  }
};
function StatusBadge({
  status,
  label,
  pulse = false,
  className
}) {
  const cfg = CONFIG[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "status-badge font-mono uppercase tracking-widest",
        cfg.bg,
        cfg.text,
        className
      ),
      "data-ocid": `status-badge-${status}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "w-1.5 h-1.5 rounded-full flex-shrink-0",
              cfg.dot,
              pulse && "animate-pulse-soft"
            )
          }
        ),
        label ?? cfg.label
      ]
    }
  );
}
export {
  Box as B,
  DeviceIcon as D,
  Router as R,
  StatusBadge as S
};
