import { c as createLucideIcon, j as jsxRuntimeExports, N as Network, q as GitFork, e as cn } from "./index-YFsEtCvH.js";
import { G as Globe } from "./globe-Ayhrg4Wt.js";
import { L as Link2 } from "./link-2-Yx_uYYeJ.js";
import { W as Wifi } from "./wifi-D-N8F-4F.js";
import { M as Monitor } from "./monitor-BZYhAAho.js";
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
  const Icon = ICONS[type] ?? Monitor;
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
export {
  Box as B,
  DeviceIcon as D
};
