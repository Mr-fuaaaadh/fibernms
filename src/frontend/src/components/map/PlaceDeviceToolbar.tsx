/**
 * PlaceDeviceToolbar — floating toolbar for placing new devices on the map.
 *
 * Shows a row of icon buttons (one per DeviceType) plus a cancel button.
 * The selected type is highlighted with its accent color.
 * Parent controls isPlacing and selectedType state.
 */
import { GlassCard } from "@/components/GlassCard";
import type { DeviceType } from "@/types/network";
import {
  Circle,
  Diamond,
  Globe,
  Link2,
  Monitor,
  Star,
  ToggleLeft,
  X,
} from "lucide-react";

// ── Device type metadata ──────────────────────────────────────────────────────
export const DEVICE_TYPE_META: {
  type: DeviceType;
  label: string;
  accent: string;
  icon: React.ReactNode;
  defaultName: (count: number) => string;
  defaultPorts: number;
}[] = [
  {
    type: "OLT",
    label: "OLT",
    accent: "#3b82f6",
    icon: <Monitor className="w-4 h-4" />,
    defaultName: (n) => `OLT-${String(n).padStart(3, "0")}`,
    defaultPorts: 16,
  },
  {
    type: "ONT",
    label: "ONT",
    accent: "#10b981",
    icon: <ToggleLeft className="w-4 h-4" />,
    defaultName: (n) => `ONT-${String(n).padStart(3, "0")}`,
    defaultPorts: 4,
  },
  {
    type: "Splitter",
    label: "SPL",
    accent: "#f97316",
    icon: <Diamond className="w-4 h-4" />,
    defaultName: (n) => `SPL-${String(n).padStart(3, "0")}`,
    defaultPorts: 8,
  },
  {
    type: "Coupler",
    label: "CPL",
    accent: "#a855f7",
    icon: <Link2 className="w-4 h-4" />,
    defaultName: (n) => `CPL-${String(n).padStart(3, "0")}`,
    defaultPorts: 2,
  },
  {
    type: "Router",
    label: "RTR",
    accent: "#ef4444",
    icon: <Globe className="w-4 h-4" />,
    defaultName: (n) => `RTR-${String(n).padStart(3, "0")}`,
    defaultPorts: 8,
  },
  {
    type: "JJB",
    label: "JJB",
    accent: "#eab308",
    icon: <Star className="w-4 h-4" />,
    defaultName: (n) => `JJB-${String(n).padStart(3, "0")}`,
    defaultPorts: 24,
  },
  {
    type: "Switch",
    label: "SW",
    accent: "#14b8a6",
    icon: <Circle className="w-4 h-4" />,
    defaultName: (n) => `SW-${String(n).padStart(3, "0")}`,
    defaultPorts: 24,
  },
];

interface PlaceDeviceToolbarProps {
  isPlacing: boolean;
  selectedType: DeviceType;
  onTogglePlacing: () => void;
  onSelectType: (type: DeviceType) => void;
  onCancel: () => void;
}

export function PlaceDeviceToolbar({
  isPlacing,
  selectedType,
  onTogglePlacing,
  onSelectType,
  onCancel,
}: PlaceDeviceToolbarProps) {
  if (!isPlacing) {
    return (
      <GlassCard
        className="flex items-center gap-2 px-3 py-2 pointer-events-auto"
        data-ocid="place-device-toolbar"
      >
        <button
          type="button"
          onClick={onTogglePlacing}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 transition-smooth"
          data-ocid="place-device-start-btn"
        >
          <Monitor className="w-3.5 h-3.5" />
          Add Device
        </button>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      className="flex items-center gap-1.5 px-3 py-2 pointer-events-auto flex-wrap"
      data-ocid="place-device-toolbar.active"
    >
      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mr-1 whitespace-nowrap">
        Place:
      </span>

      {DEVICE_TYPE_META.map(({ type, label, accent, icon }) => {
        const isActive = selectedType === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelectType(type)}
            title={type}
            aria-label={`Place ${type}`}
            data-ocid={`place-device-type-${type.toLowerCase()}`}
            style={
              isActive
                ? {
                    background: `${accent}22`,
                    border: `1.5px solid ${accent}`,
                    color: accent,
                    boxShadow: `0 0 8px ${accent}55`,
                  }
                : {
                    background: "transparent",
                    border: "1.5px solid transparent",
                    color: "var(--muted-foreground)",
                  }
            }
            className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[44px] min-h-[44px] transition-all duration-150 hover:scale-105 active:scale-95"
          >
            {icon}
            <span className="text-[9px] font-mono leading-none">{label}</span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-mono bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25 transition-smooth ml-1"
        aria-label="Cancel placement"
        data-ocid="place-device-cancel-btn"
      >
        <X className="w-3 h-3" />
        Cancel
      </button>
    </GlassCard>
  );
}
