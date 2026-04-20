import { DeviceIcon } from "@/components/DeviceIcon";
import { GlassCard } from "@/components/GlassCard";
import { AddDeviceModal } from "@/components/devices/AddDeviceModal";
import { DeviceFilters } from "@/components/devices/DeviceFilters";
import {
  DeviceTable,
  TYPE_BADGE_COLORS,
} from "@/components/devices/DeviceTable";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceStatus, DeviceType } from "@/types/network";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Plus, ServerCrash } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

const ALL_TYPES: DeviceType[] = ["OLT", "ONT", "Splitter", "JJB", "Switch"];
const ALL_STATUSES: DeviceStatus[] = ["active", "faulty", "warning"];

function parseArrayParam(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val as string[];
  if (typeof val === "string") return val.split(",").filter(Boolean);
  return [];
}

interface CountBadgeProps {
  type: DeviceType;
  count: number;
  delay: number;
}

function CountBadge({ type, count, delay }: CountBadgeProps) {
  const colors = TYPE_BADGE_COLORS[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.22 }}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl",
        colors.bg,
        colors.glow,
      )}
      data-ocid={`count-badge-${type.toLowerCase()}`}
    >
      <DeviceIcon type={type} status="active" size="sm" />
      <div>
        <p
          className={cn(
            "text-lg font-mono font-bold leading-none tabular-nums",
            colors.text,
          )}
        >
          {count}
        </p>
        <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
          {type}s
        </p>
      </div>
    </motion.div>
  );
}

export default function Devices() {
  const { devices } = useNetworkStore();
  const navigate = useNavigate();

  const rawSearch = useSearch({ strict: false }) as Record<string, unknown>;
  const selectedTypes = useMemo(
    () =>
      parseArrayParam(rawSearch.types).filter((t): t is DeviceType =>
        ALL_TYPES.includes(t as DeviceType),
      ),
    [rawSearch.types],
  );
  const selectedStatuses = useMemo(
    () =>
      parseArrayParam(rawSearch.statuses).filter((s): s is DeviceStatus =>
        ALL_STATUSES.includes(s as DeviceStatus),
      ),
    [rawSearch.statuses],
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editDevice, setEditDevice] = useState<Device | null>(null);

  const updateSearch = useCallback(
    (types: DeviceType[], statuses: DeviceStatus[]) => {
      navigate({
        search: {
          ...(types.length ? { types: types.join(",") } : {}),
          ...(statuses.length ? { statuses: statuses.join(",") } : {}),
        },
        replace: true,
      } as Parameters<typeof navigate>[0]);
    },
    [navigate],
  );

  const handleTypeToggle = (type: DeviceType) => {
    const next = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    updateSearch(next, selectedStatuses);
  };

  const handleStatusToggle = (status: DeviceStatus) => {
    const next = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    updateSearch(selectedTypes, next);
  };

  const handleClearAll = () => updateSearch([], []);

  const filteredDevices = useMemo(() => {
    return devices.filter((d) => {
      const typeOk =
        selectedTypes.length === 0 || selectedTypes.includes(d.type);
      const statusOk =
        selectedStatuses.length === 0 || selectedStatuses.includes(d.status);
      return typeOk && statusOk;
    });
  }, [devices, selectedTypes, selectedStatuses]);

  const typeCounts = useMemo(() => {
    const counts: Record<DeviceType, number> = {
      OLT: 0,
      ONT: 0,
      Splitter: 0,
      JJB: 0,
      Switch: 0,
    };
    for (const d of devices) counts[d.type]++;
    return counts;
  }, [devices]);

  const openAdd = () => {
    setEditDevice(null);
    setModalOpen(true);
  };

  const openEdit = (device: Device) => {
    setEditDevice(device);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditDevice(null);
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-auto p-4 md:p-6 space-y-4 md:space-y-5">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="font-mono font-bold text-xl text-foreground tracking-tight">
            DEVICE MANAGEMENT
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {devices.length} total registered network nodes
          </p>
        </motion.div>

        {/* Count badges */}
        <div className="flex flex-wrap items-center gap-2">
          {ALL_TYPES.map((type, i) => (
            <CountBadge
              key={type}
              type={type}
              count={typeCounts[type]}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>

      {/* Main table card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="flex-1"
      >
        <GlassCard elevated className="flex flex-col min-h-0 overflow-hidden">
          {/* Card header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Network Devices
              </span>
              <span className="font-mono text-xs text-primary tabular-nums">
                [{filteredDevices.length}/{devices.length}]
              </span>
            </div>
            <button
              type="button"
              onClick={openAdd}
              data-ocid="add-device-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-medium hover:opacity-90 transition-smooth noc-glow"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Device
            </button>
          </div>

          {/* Filters */}
          <DeviceFilters
            selectedTypes={selectedTypes}
            selectedStatuses={selectedStatuses}
            onTypeToggle={handleTypeToggle}
            onStatusToggle={handleStatusToggle}
            onClearAll={handleClearAll}
          />

          {/* Table or empty state */}
          {filteredDevices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
              data-ocid="empty-state"
            >
              <div className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center">
                <ServerCrash className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-mono text-sm text-foreground">
                  No devices found
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  No devices match the current filter criteria
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                data-ocid="empty-state-clear"
                className="px-4 py-1.5 rounded-lg border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-border transition-smooth"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <DeviceTable devices={filteredDevices} onEdit={openEdit} />
          )}
        </GlassCard>
      </motion.div>

      {/* Modal */}
      <AddDeviceModal
        open={modalOpen}
        editDevice={editDevice}
        onClose={closeModal}
      />
    </div>
  );
}
