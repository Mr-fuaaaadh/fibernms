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
import { MapPin, Plus, X } from "lucide-react";
import { useState } from "react";

interface AddDeviceDialogProps {
  lat: number;
  lng: number;
  onClose: () => void;
}

const DEVICE_TYPES: DeviceType[] = [
  "OLT",
  "ONT",
  "Splitter",
  "JJB",
  "Switch",
  "Coupler",
  "Router",
];
const STATUSES: DeviceStatus[] = ["active", "warning", "faulty"];

export function AddDeviceDialog({ lat, lng, onClose }: AddDeviceDialogProps) {
  const { addDevice } = useNetworkStore();
  const [name, setName] = useState("");
  const [type, setType] = useState<DeviceType>("ONT");
  const [status, setStatus] = useState<DeviceStatus>("active");
  const [ports, setPorts] = useState("4");
  const [nameError, setNameError] = useState("");

  function handleAdd() {
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    const device: Device = {
      id: `dev-${Date.now()}`,
      name: name.trim(),
      type,
      lat,
      lng,
      ports: Number(ports) || 4,
      status,
      connectedTo: [],
      location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    };
    addDevice(device);
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
        aria-label="Add device"
        data-ocid="add-device-dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-base font-semibold text-foreground">
            Add Device
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
            aria-label="Close dialog"
            data-ocid="add-device-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Coords */}
        <div className="flex items-center gap-1.5 mb-5 text-xs font-mono text-muted-foreground">
          <MapPin className="w-3 h-3 text-primary" />
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="add-device-name"
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Device Name *
            </Label>
            <Input
              id="add-device-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className="font-mono text-sm bg-muted/20 border-border/50"
              placeholder="e.g. ONT-RES-009"
              autoFocus
              data-ocid="add-device-name-input"
            />
            {nameError && (
              <p className="text-xs text-red-400 font-mono">{nameError}</p>
            )}
          </div>

          {/* Type + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="add-device-type"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Type
              </Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as DeviceType)}
              >
                <SelectTrigger
                  id="add-device-type"
                  className="font-mono text-sm bg-muted/20 border-border/50"
                  data-ocid="add-device-type-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[2100]">
                  {DEVICE_TYPES.map((t) => (
                    <SelectItem key={t} value={t} className="font-mono text-sm">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="add-device-status"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Status
              </Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as DeviceStatus)}
              >
                <SelectTrigger
                  id="add-device-status"
                  className="font-mono text-sm bg-muted/20 border-border/50"
                  data-ocid="add-device-status-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[2100]">
                  {STATUSES.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="font-mono text-sm capitalize"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Ports */}
          <div className="space-y-1.5">
            <Label
              htmlFor="add-device-ports"
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              Ports
            </Label>
            <Input
              id="add-device-ports"
              type="number"
              value={ports}
              onChange={(e) => setPorts(e.target.value)}
              className="font-mono text-sm bg-muted/20 border-border/50"
              min="1"
              max="128"
              data-ocid="add-device-ports-input"
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
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30 transition-smooth"
            data-ocid="add-device-submit-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Device
          </button>
        </div>
      </section>
    </div>
  );
}
