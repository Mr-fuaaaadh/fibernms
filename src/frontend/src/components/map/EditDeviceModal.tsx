import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import { X } from "lucide-react";
import { useState } from "react";

interface EditDeviceModalProps {
  device: Device;
  onClose: () => void;
}

const DEVICE_TYPES: DeviceType[] = ["OLT", "ONT", "Splitter", "JJB", "Switch"];
const STATUSES: DeviceStatus[] = ["active", "warning", "faulty"];

export function EditDeviceModal({ device, onClose }: EditDeviceModalProps) {
  const { updateDevice } = useNetworkStore();
  const [name, setName] = useState(device.name);
  const [type, setType] = useState<DeviceType>(device.type);
  const [status, setStatus] = useState<DeviceStatus>(device.status);
  const [ports, setPorts] = useState(String(device.ports));
  const [nameError, setNameError] = useState("");

  function handleSave() {
    if (!name.trim()) {
      setNameError("Name is required");
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <section
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl glass-elevated shadow-noc-elevated p-6"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        aria-label="Edit device"
        data-ocid="edit-device-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-base font-semibold text-foreground">
            Edit Device
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
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
              className="font-mono text-sm bg-muted/20 border-border/50"
              placeholder="e.g. OLT-CORE-01"
              data-ocid="edit-device-name-input"
            />
            {nameError && (
              <p className="text-xs text-red-400 font-mono">{nameError}</p>
            )}
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-device-type"
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as DeviceType)}
            >
              <SelectTrigger
                id="edit-device-type"
                className="font-mono text-sm bg-muted/20 border-border/50"
                data-ocid="edit-device-type-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEVICE_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="font-mono text-sm">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label
              htmlFor="edit-device-status"
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as DeviceStatus)}
            >
              <SelectTrigger
                id="edit-device-status"
                className="font-mono text-sm bg-muted/20 border-border/50"
                data-ocid="edit-device-status-select"
              >
                <SelectValue>
                  <StatusBadge status={status} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    <StatusBadge status={s} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            className="flex-1 rounded-xl py-2.5 text-sm font-mono bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-smooth"
            data-ocid="edit-device-save-btn"
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
