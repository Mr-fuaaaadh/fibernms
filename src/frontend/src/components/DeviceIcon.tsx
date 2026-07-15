import { cn } from "@/lib/utils";
import type { DeviceStatus, DeviceType } from "@/types/network";
import {
  Box,
  GitFork,
  Globe,
  Link2,
  Monitor,
  Network,
  Wifi,
} from "lucide-react";

type IconVariant = "filled" | "outline";

interface DeviceIconProps {
  type: DeviceType;
  status?: DeviceStatus;
  size?: "sm" | "md" | "lg";
  /** "filled" = colored bg square/rounded; "outline" = icon inside a circle outline */
  variant?: IconVariant;
  className?: string;
}

const ICONS: Record<DeviceType, React.ElementType> = {
  OLT: Monitor,
  ONT: Wifi,
  Splitter: GitFork,
  JJB: Box,
  Switch: Network,
  Coupler: Link2,
  Router: Globe,
};

// STATUS_COLOR: tint the icon itself
const STATUS_COLOR: Record<DeviceStatus, string> = {
  active: "text-emerald-400",
  faulty: "text-red-400",
  warning: "text-amber-400",
};

// TYPE_ACCENT_CLASS for outline variant — bg of the circle ring
const TYPE_ACCENT_HEX: Record<DeviceType, string> = {
  OLT: "#3b82f6",
  ONT: "#10b981",
  Splitter: "#f97316",
  JJB: "#eab308",
  Switch: "#14b8a6",
  Coupler: "#a855f7",
  Router: "#ef4444",
};

const SIZE_CLASS: Record<string, { icon: string; wrap: string }> = {
  sm: { icon: "w-3 h-3", wrap: "w-6 h-6 rounded" },
  md: { icon: "w-4 h-4", wrap: "w-8 h-8 rounded-md" },
  lg: { icon: "w-5 h-5", wrap: "w-10 h-10 rounded-lg" },
};

export function DeviceIcon({
  type,
  status = "active",
  size = "md",
  variant = "filled",
  className,
}: DeviceIconProps) {
  const Icon = ICONS[type] ?? Monitor;
  const s = SIZE_CLASS[size];
  const color = STATUS_COLOR[status];
  const accent = TYPE_ACCENT_HEX[type];

  if (variant === "outline") {
    // Circle outline ring with accent border, transparent fill, status-tinted icon
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center flex-shrink-0 rounded-full",
          s.wrap,
          className,
        )}
        style={{
          border: `1.5px solid ${accent}70`,
          background: `${accent}12`,
        }}
      >
        <Icon className={cn(s.icon, color)} />
      </span>
    );
  }

  // Default "filled" variant — card bg with border
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center bg-card border border-border/60 flex-shrink-0",
        s.wrap,
        className,
      )}
    >
      <Icon className={cn(s.icon, color)} />
    </span>
  );
}
