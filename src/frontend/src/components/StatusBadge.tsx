import { cn } from "@/lib/utils";
import type { AlertSeverity, DeviceStatus } from "@/types/network";

type StatusVariant = DeviceStatus | AlertSeverity;

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  pulse?: boolean;
  className?: string;
}

const CONFIG: Record<
  StatusVariant,
  { label: string; dot: string; text: string; bg: string }
> = {
  active: {
    label: "ACTIVE",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/30",
  },
  faulty: {
    label: "FAULT",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
  },
  warning: {
    label: "WARN",
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10 border border-amber-400/30",
  },
  critical: {
    label: "CRITICAL",
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
  },
  info: {
    label: "INFO",
    dot: "bg-primary",
    text: "text-primary",
    bg: "bg-primary/10 border border-primary/30",
  },
};

export function StatusBadge({
  status,
  label,
  pulse = false,
  className,
}: StatusBadgeProps) {
  const cfg = CONFIG[status];
  return (
    <span
      className={cn(
        "status-badge font-mono uppercase tracking-widest",
        cfg.bg,
        cfg.text,
        className,
      )}
      data-ocid={`status-badge-${status}`}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0",
          cfg.dot,
          pulse && "animate-pulse-soft",
        )}
      />
      {label ?? cfg.label}
    </span>
  );
}
