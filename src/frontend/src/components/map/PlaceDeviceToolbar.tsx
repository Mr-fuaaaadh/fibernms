/**
 * PlaceDeviceToolbar — floating pill toolbar for placing new devices on the map.
 * Inactive: single "Add Device" pill button, slides up on mount.
 * Active: device type selector row + cancel button on right.
 */
import { GlassCard } from "@/components/GlassCard";
import type { DeviceType } from "@/types/network";
import {
  Circle,
  Diamond,
  Globe,
  Link2,
  Monitor,
  Plus,
  Star,
  ToggleLeft,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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
  return (
    <AnimatePresence mode="wait">
      {!isPlacing ? (
        <motion.div
          key="idle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          <GlassCard
            className="flex items-center gap-2 px-3 py-2 pointer-events-auto"
            data-ocid="place-device-toolbar"
          >
            <button
              type="button"
              onClick={onTogglePlacing}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-smooth"
              data-ocid="place-device-start-btn"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Device
            </button>
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div
          key="active"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          <GlassCard
            className="flex items-center gap-2 px-3 py-2 pointer-events-auto"
            data-ocid="place-device-toolbar.active"
          >
            {/* Label */}
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              Place:
            </span>

            {/* Device type buttons */}
            <div className="flex items-center gap-1">
              {DEVICE_TYPE_META.map(({ type, label, accent, icon }) => {
                const isActive = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onSelectType(type)}
                    title={type}
                    aria-label={`Place ${type}`}
                    aria-pressed={isActive}
                    data-ocid={`place-device-type-${type.toLowerCase()}`}
                    style={
                      isActive
                        ? {
                            background: `${accent}22`,
                            border: `1.5px solid ${accent}`,
                            color: accent,
                            boxShadow: `0 0 10px ${accent}44, inset 0 0 6px ${accent}11`,
                          }
                        : {
                            background: "transparent",
                            border: "1.5px solid oklch(var(--border) / 0.4)",
                            color: "oklch(var(--muted-foreground))",
                          }
                    }
                    className="flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[44px] min-h-[44px] transition-all duration-150 hover:scale-105 active:scale-95"
                  >
                    {icon}
                    <span className="text-[9px] font-mono leading-none font-medium">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-border/40 mx-0.5" />

            {/* Cancel */}
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono border border-red-500/40 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60 transition-smooth whitespace-nowrap"
              aria-label="Cancel placement"
              data-ocid="place-device-cancel-btn"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
