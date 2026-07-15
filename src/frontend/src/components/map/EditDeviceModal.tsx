import { DeviceIcon } from "@/components/DeviceIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { TYPE_ACCENT } from "@/components/map/DeviceMarker";
import { DEVICE_TYPE_META } from "@/components/map/PlaceDeviceToolbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import { Hash, Save, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface EditDeviceModalProps {
  device: Device;
  onClose: () => void;
}

const STATUSES: { value: DeviceStatus; label: string; color: string }[] = [
  { value: "active", label: "Active", color: "#10b981" },
  { value: "warning", label: "Warning", color: "#f59e0b" },
  { value: "faulty", label: "Faulty", color: "#ef4444" },
];

export function EditDeviceModal({ device, onClose }: EditDeviceModalProps) {
  const { updateDevice } = useNetworkStore();
  const [name, setName] = useState(device.name);
  const [type, setType] = useState<DeviceType>(device.type);
  const [status, setStatus] = useState<DeviceStatus>(device.status);
  const [ports, setPorts] = useState(String(device.ports));
  const [nameError, setNameError] = useState("");

  const accent = TYPE_ACCENT[type];

  function handleSave() {
    if (!name.trim()) {
      setNameError("Device name is required");
      return;
    }
    updateDevice(device.id, {
      name: name.trim(),
      type,
      status,
      ports: Number(ports) || device.ports,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-hidden="true"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.section
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl glass-elevated shadow-noc-elevated p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label="Edit device"
        data-ocid="edit-device-modal"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Colored top accent bar */}
        <div className="h-0.5 w-full" style={{ background: accent }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <DeviceIcon type={device.type} status={device.status} size="md" />
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-base font-semibold text-foreground">
                Edit Device
              </h2>
              <StatusBadge status={device.status} size="sm" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Device ID (readonly) */}
          <div className="flex items-center gap-2 mb-5 rounded-lg bg-muted/15 border border-border/25 px-3 py-2">
            <Hash className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="font-mono text-[11px] text-muted-foreground truncate">
              {device.id}
            </span>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-device-name"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Device Name *
              </Label>
              <Input
                id="edit-device-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                className="font-mono text-sm bg-muted/20 border-border/50 focus:border-primary/60"
                placeholder="e.g. OLT-CORE-01"
                data-ocid="edit-device-name-input"
              />
              {nameError && (
                <p
                  className="text-xs text-red-400 font-mono"
                  data-ocid="edit-device-name.field_error"
                >
                  {nameError}
                </p>
              )}
            </div>

            {/* Type — button grid */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Device Type
              </Label>
              <div
                className="grid grid-cols-4 gap-1.5"
                data-ocid="edit-device-type-select"
              >
                {DEVICE_TYPE_META.map(({ type: t, label, accent: a, icon }) => {
                  const isActive = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      data-ocid={`edit-device-type-${t.toLowerCase()}`}
                      style={
                        isActive
                          ? {
                              background: `${a}20`,
                              border: `1.5px solid ${a}`,
                              color: a,
                              boxShadow: `0 0 8px ${a}33`,
                            }
                          : {
                              background: "oklch(var(--muted) / 0.12)",
                              border: "1.5px solid oklch(var(--border) / 0.4)",
                              color: "oklch(var(--muted-foreground))",
                            }
                      }
                      className="flex flex-col items-center gap-1 rounded-xl py-2.5 transition-all duration-150 hover:scale-105 active:scale-95 min-h-[56px]"
                    >
                      {icon}
                      <span className="text-[10px] font-mono font-medium">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status — radio pills */}
            <div className="space-y-2">
              <Label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </Label>
              <div className="flex gap-2" data-ocid="edit-device-status-select">
                {STATUSES.map(({ value: v, label, color }) => {
                  const isActive = status === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setStatus(v)}
                      data-ocid={`edit-device-status-${v}`}
                      style={
                        isActive
                          ? {
                              background: `${color}18`,
                              border: `1.5px solid ${color}70`,
                              color,
                            }
                          : {
                              background: "oklch(var(--muted) / 0.12)",
                              border: "1.5px solid oklch(var(--border) / 0.4)",
                              color: "oklch(var(--muted-foreground))",
                            }
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-mono font-medium transition-all duration-150 hover:scale-102 active:scale-98 min-h-[44px]"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: isActive ? color : "currentColor",
                        }}
                      />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ports */}
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-device-ports"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Ports
              </Label>
              <Input
                id="edit-device-ports"
                type="number"
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
                className="font-mono text-sm bg-muted/20 border-border/50"
                min="1"
                max="128"
                data-ocid="edit-device-ports-input"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-2.5 text-sm font-mono bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 transition-smooth"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono font-semibold transition-smooth"
              style={{
                background: `${accent}20`,
                border: `1.5px solid ${accent}60`,
                color: accent,
              }}
              data-ocid="edit-device-save-btn"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>

          {/* Live preview */}
          <div className="mt-4 pt-3 border-t border-border/25 flex items-center gap-2">
            <DeviceIcon type={type} status={status} size="sm" />
            <span className="font-mono text-[11px] text-muted-foreground truncate">
              {name || device.name} · {type} · {ports} ports
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
