import { DeviceIcon } from "@/components/DeviceIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

type SortField = "name" | "type" | "status";
type SortDir = "asc" | "desc";

const ITEM_HEIGHT = 52;
const OVERSCAN = 5;

interface DeleteDialogProps {
  device: Device;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteDialog({ device, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        role="button"
        tabIndex={-1}
        aria-label="Close dialog"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative glass-elevated rounded-2xl p-5 w-80 shadow-2xl"
        data-ocid="delete-dialog"
      >
        <h3 className="font-mono text-sm font-semibold text-foreground mb-1">
          Confirm Delete
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          Remove{" "}
          <span className="font-mono text-foreground">{device.name}</span> from
          the network? This cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            data-ocid="delete-cancel"
            className="flex-1 py-2 rounded-lg border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground transition-smooth"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            data-ocid="delete-confirm"
            className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-mono font-medium hover:opacity-90 transition-smooth"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface DeviceTableProps {
  devices: Device[];
  onEdit: (device: Device) => void;
}

export function DeviceTable({ devices, onEdit }: DeviceTableProps) {
  const { deleteDevice } = useNetworkStore();
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deleteTarget, setDeleteTarget] = useState<Device | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...devices].sort((a, b) => {
    let cmp = 0;
    if (sortField === "name") cmp = a.name.localeCompare(b.name);
    else if (sortField === "type") cmp = a.type.localeCompare(b.type);
    else if (sortField === "status") cmp = a.status.localeCompare(b.status);
    return sortDir === "asc" ? cmp : -cmp;
  });

  // Virtualization
  const containerHeight = 480;
  const totalHeight = sorted.length * ITEM_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
  const endIdx = Math.min(
    sorted.length - 1,
    Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + OVERSCAN,
  );
  const visibleItems = sorted.slice(startIdx, endIdx + 1);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-primary" />
    ) : (
      <ChevronDown className="w-3 h-3 text-primary" />
    );
  };

  const colHeader = (label: string, field: SortField) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      data-ocid={`sort-${field}`}
      className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth group"
    >
      {label}
      <SortIcon field={field} />
    </button>
  );

  return (
    <>
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_2fr_80px_120px_88px] gap-0 px-4 py-2.5 border-b border-border/40 bg-muted/10">
        {colHeader("Device Name", "name")}
        {colHeader("Type", "type")}
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Location
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Ports
        </span>
        {colHeader("Status", "status")}
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right">
          Actions
        </span>
      </div>

      {/* Virtualized rows */}
      <div
        ref={scrollRef}
        className="noc-scrollbar overflow-y-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
        data-ocid="device-table-scroll"
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {visibleItems.map((device, i) => {
            const absoluteIdx = startIdx + i;
            const top = absoluteIdx * ITEM_HEIGHT;
            const isEven = absoluteIdx % 2 === 0;

            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: Math.min(absoluteIdx * 0.02, 0.4),
                  duration: 0.18,
                }}
                style={{
                  position: "absolute",
                  top,
                  left: 0,
                  right: 0,
                  height: ITEM_HEIGHT,
                }}
                className={cn(
                  "grid grid-cols-[2fr_1fr_2fr_80px_120px_88px] gap-0 px-4 items-center transition-smooth border-b border-border/20 cursor-pointer",
                  isEven
                    ? "bg-transparent hover:bg-muted/10"
                    : "bg-muted/5 hover:bg-muted/15",
                )}
                onClick={() => onEdit(device)}
                data-ocid={`device-row-${device.id}`}
              >
                {/* Name */}
                <span className="font-mono text-xs text-foreground truncate pr-2 min-w-0">
                  {device.name}
                </span>

                {/* Type */}
                <span className="flex items-center gap-1.5 min-w-0">
                  <DeviceIcon
                    type={device.type}
                    status={device.status}
                    size="sm"
                  />
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    {device.type}
                  </span>
                </span>

                {/* Location */}
                <span className="text-xs text-muted-foreground truncate pr-2 min-w-0 font-mono">
                  {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
                </span>

                {/* Ports */}
                <span className="text-xs font-mono text-metric text-muted-foreground">
                  {device.ports}
                </span>

                {/* Status */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <StatusBadge status={device.status} />
                </div>

                {/* Actions */}
                <div
                  className="flex items-center justify-end gap-1"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onEdit(device)}
                    data-ocid={`edit-device-${device.id}`}
                    aria-label={`Edit ${device.name}`}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(device)}
                    data-ocid={`delete-device-${device.id}`}
                    aria-label={`Delete ${device.name}`}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteDialog
            device={deleteTarget}
            onConfirm={() => {
              deleteDevice(deleteTarget.id);
              setDeleteTarget(null);
            }}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Type color pill for badge in header
export const TYPE_BADGE_COLORS: Record<
  DeviceType,
  { text: string; bg: string; glow: string }
> = {
  OLT: {
    text: "text-cyan-400",
    bg: "bg-cyan-400/10 border border-cyan-400/30",
    glow: "shadow-[0_0_12px_oklch(0.75_0.22_210/0.3)]",
  },
  ONT: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/30",
    glow: "shadow-[0_0_12px_oklch(0.62_0.22_142/0.3)]",
  },
  Splitter: {
    text: "text-violet-400",
    bg: "bg-violet-400/10 border border-violet-400/30",
    glow: "shadow-[0_0_12px_oklch(0.65_0.22_290/0.3)]",
  },
  JJB: {
    text: "text-amber-400",
    bg: "bg-amber-400/10 border border-amber-400/30",
    glow: "shadow-[0_0_12px_oklch(0.7_0.25_55/0.3)]",
  },
  Switch: {
    text: "text-blue-400",
    bg: "bg-blue-400/10 border border-blue-400/30",
    glow: "shadow-[0_0_12px_oklch(0.65_0.22_240/0.3)]",
  },
};

export const STATUS_FILTER_EMPTY: DeviceStatus[] = [];
export const TYPE_FILTER_EMPTY: DeviceType[] = [];
