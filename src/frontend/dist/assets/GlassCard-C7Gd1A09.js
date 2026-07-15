import { r as reactExports, j as jsxRuntimeExports, a as cn } from "./index-BhX-NLFL.js";
const VARIANT_CLASS = {
  standard: "glass-card shadow-noc-soft",
  elevated: "glass-elevated shadow-noc-elevated",
  subtle: [
    "backdrop-blur-[3px]",
    "bg-card/55",
    "border border-border/25",
    "shadow-xs"
  ].join(" ")
};
const GlassCard = reactExports.forwardRef(
  ({ variant, elevated = false, glow = false, className, children, ...props }, ref) => {
    const resolvedVariant = variant ?? (elevated ? "elevated" : "standard");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "rounded-2xl transition-shadow duration-200",
          VARIANT_CLASS[resolvedVariant],
          // Hover lift — slightly deeper shadow on mouse over
          "hover:shadow-noc-elevated",
          glow && "noc-glow",
          className
        ),
        ...props,
        children
      }
    );
  }
);
GlassCard.displayName = "GlassCard";
export {
  GlassCard as G
};
