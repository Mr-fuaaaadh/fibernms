import { aM as Crown, e as Star, j as jsxRuntimeExports, d as cn, az as Plan } from "./index-CBnSp17V.js";
import { D as Diamond } from "./diamond-mUMM5oAX.js";
import { C as Check } from "./check-ow6agwNW.js";
const PLAN_META = {
  [Plan.BASIC]: {
    label: "Basic",
    colorClasses: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400 dark:border-emerald-500/40",
    Icon: Check
  },
  [Plan.PROFESSIONAL]: {
    label: "Professional",
    colorClasses: "bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400 dark:border-blue-500/40",
    Icon: Star
  },
  [Plan.ENTERPRISE]: {
    label: "Enterprise",
    colorClasses: "bg-violet-500/15 text-violet-600 border-violet-500/30 dark:text-violet-400 dark:border-violet-500/40",
    Icon: Diamond
  },
  [Plan.ULTRA]: {
    label: "Ultra",
    colorClasses: "bg-rose-500/15 text-rose-600 border-rose-500/30 dark:text-rose-400 dark:border-rose-500/40",
    Icon: Crown
  }
};
const SIZE_CLASSES = {
  sm: "text-[10px] px-1.5 py-0.5 gap-1 rounded [&_svg]:size-2.5",
  md: "text-xs px-2 py-1 gap-1 rounded-md [&_svg]:size-3",
  lg: "text-sm px-3 py-1.5 gap-1.5 rounded-lg font-semibold [&_svg]:size-3.5"
};
function PlanBadge({
  plan,
  size = "md",
  showIcon = true,
  className
}) {
  const { label, colorClasses, Icon } = PLAN_META[plan];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center border font-medium tracking-wide transition-smooth",
        colorClasses,
        SIZE_CLASSES[size],
        className
      ),
      "data-ocid": `plan-badge-${plan.toLowerCase()}`,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { "aria-hidden": "true" }),
        label
      ]
    }
  );
}
export {
  PlanBadge as P
};
