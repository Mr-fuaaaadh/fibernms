import { DeviceIcon } from "@/components/DeviceIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { EditDeviceModal } from "@/components/map/EditDeviceModal";
import { useNetworkStore } from "@/store/networkStore";
import type { Device } from "@/types/network";
import {
  AlertTriangle,
  Edit3,
  MapPin,
  Network,
  Signal,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

interface DeviceDetailPanelProps {
  device: Device;
  onClose: () => void;
  onDelete: () => void;
}

export function DeviceDetailPanel({
  device,
  onClose,
  onDelete,
}: DeviceDetailPanelProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const signalColor =
    device.status === "active"
      ? "text-emerald-400"
      : device.status === "faulty"
        ? "text-red-400"
        : "text-amber-400";

  return (
    <div className="flex flex-col h-full" data-ocid="device-detail-panel">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/40">
        <DeviceIcon type={device.type} status={device.status} size="lg" />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm font-semibold text-foreground truncate">
            {device.name}
          </p>
          <p className="text-xs text-muted-foreground">{device.type}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
          aria-label="Close panel"
          data-ocid="device-detail-close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto noc-scrollbar">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            Status
          </span>
          <StatusBadge
            status={device.status}
            pulse={device.status !== "active"}
          />
        </div>

        {/* Location */}
        {device.location && (
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-0.5">
                Location
              </p>
              <p className="text-xs text-foreground">{device.location}</p>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                {device.lat.toFixed(5)}, {device.lng.toFixed(5)}
              </p>
            </div>
          </div>
        )}

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Signal className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Signal
              </span>
            </div>
            <p className={`font-mono text-lg font-bold ${signalColor}`}>
              {device.signalStrength ?? "—"}
              <span className="text-xs ml-0.5">dBm</span>
            </p>
          </div>
          <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Network className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Ports
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-foreground">
              {device.ports}
            </p>
          </div>
        </div>

        {/* Uptime */}
        {device.uptime !== undefined && (
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Uptime
              </span>
              <span className={`text-xs font-mono font-bold ${signalColor}`}>
                {device.uptime.toFixed(1)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  device.uptime > 95
                    ? "bg-emerald-400"
                    : device.uptime > 50
                      ? "bg-amber-400"
                      : "bg-red-400"
                }`}
                style={{ width: `${device.uptime}%` }}
              />
            </div>
          </div>
        )}

        {/* Connected devices */}
        {device.connectedTo.length > 0 && (
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
              Connected To ({device.connectedTo.length})
            </p>
            <div className="space-y-1">
              {device.connectedTo.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-xs text-foreground/80">
                    {id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border/40 space-y-2">
        {!confirmDelete ? (
          <>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 transition-smooth"
              data-ocid="device-edit-btn"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Device
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-smooth"
              data-ocid="device-delete-btn"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Device
            </button>
          </>
        ) : (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-xs font-mono">Confirm deletion?</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onDelete}
                className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30 transition-smooth"
                data-ocid="device-delete-confirm-btn"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 transition-smooth"
                data-ocid="device-delete-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {editOpen && (
        <EditDeviceModal device={device} onClose={() => setEditOpen(false)} />
      )}
    </div>
  );
}
