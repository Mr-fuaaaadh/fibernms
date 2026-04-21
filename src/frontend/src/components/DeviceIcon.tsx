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

interface DeviceIconProps {
  type: DeviceType;
  status?: DeviceStatus;
  size?: "sm" | "md" | "lg";
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

const STATUS_COLOR: Record<DeviceStatus, string> = {
  active: "text-emerald-400",
  faulty: "text-red-400",
  warning: "text-amber-400",
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
  className,
}: DeviceIconProps) {
  const Icon = ICONS[type] ?? Monitor;
  const s = SIZE_CLASS[size];
  const color = STATUS_COLOR[status];

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
