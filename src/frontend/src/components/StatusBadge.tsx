import { cn } from "@/lib/utils";
import type { AlertSeverity, DeviceStatus } from "@/types/network";

type StatusVariant = DeviceStatus | AlertSeverity;
type SizeVariant = "sm" | "md" | "lg";

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  /** @deprecated — pulse is now auto-derived from status */
  pulse?: boolean;
  size?: SizeVariant;
  className?: string;
}

const CONFIG: Record<
  StatusVariant,
  { label: string; dot: string; text: string; bg: string; pulseClass: string }
> = {
  active: {
    label: "ACTIVE",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/30",
    pulseClass: "animate-pulse-soft", // gentle pulse for active
  },
  faulty: {
    label: "FAULT",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
    pulseClass: "", // static red — no pulse
  },
  warning: {
    label: "WARN",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10 border border-amber-400/30",
    pulseClass: "animate-[pulse-soft_3s_ease-in-out_infinite]", // slow amber pulse
  },
  critical: {
    label: "CRIT",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
    pulseClass: "",
  },
  info: {
    label: "INFO",
    dot: "bg-primary",
    text: "text-primary",
    bg: "bg-primary/10 border border-primary/30",
    pulseClass: "",
  },
};

// Size variants — sm for compact headers, md (default) for panels, lg for spotlight
const SIZE_CLASS: Record<SizeVariant, string> = {
  sm: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium",
  md: "status-badge font-mono uppercase tracking-widest",
  lg: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-widest",
};

const DOT_SIZE: Record<SizeVariant, string> = {
  sm: "w-1 h-1",
  md: "w-1.5 h-1.5",
  lg: "w-2 h-2",
};

export function StatusBadge({
  status,
  label,
  size = "md",
  className,
}: StatusBadgeProps) {
  const cfg = CONFIG[status];
  const sizeClass = SIZE_CLASS[size];
  const dotSize = DOT_SIZE[size];

  return (
    <span
      className={cn(sizeClass, cfg.bg, cfg.text, className)}
      data-ocid={`status-badge-${status}`}
    >
      <span
        className={cn(
          "rounded-full flex-shrink-0",
          dotSize,
          cfg.dot,
          cfg.pulseClass,
        )}
      />
      {label ?? cfg.label}
    </span>
  );
}
