import { r as reactExports, j as jsxRuntimeExports, b as cn } from "./index-BwSs_aWH.js";
const GlassCard = reactExports.forwardRef(
  ({ elevated = false, glow = false, className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "rounded-2xl",
          elevated ? "glass-elevated shadow-noc-elevated" : "glass-card shadow-noc-soft",
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
