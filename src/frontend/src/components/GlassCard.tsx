import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type GlassVariant = "standard" | "elevated" | "subtle";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual depth variant. Default = "standard" */
  variant?: GlassVariant;
  /** @deprecated use variant="elevated" instead */
  elevated?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASS: Record<GlassVariant, string> = {
  standard: "glass-card shadow-noc-soft",
  elevated: "glass-elevated shadow-noc-elevated",
  subtle: [
    "backdrop-blur-[3px]",
    "bg-card/55",
    "border border-border/25",
    "shadow-xs",
  ].join(" "),
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { variant, elevated = false, glow = false, className, children, ...props },
    ref,
  ) => {
    // Resolve variant — support legacy `elevated` prop
    const resolvedVariant: GlassVariant =
      variant ?? (elevated ? "elevated" : "standard");

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-shadow duration-200",
          VARIANT_CLASS[resolvedVariant],
          // Hover lift — slightly deeper shadow on mouse over
          "hover:shadow-noc-elevated",
          glow && "noc-glow",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
