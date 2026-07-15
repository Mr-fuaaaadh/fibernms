import { DeviceIcon } from "@/components/DeviceIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { TYPE_ACCENT } from "@/components/map/DeviceMarker";
import { EditDeviceModal } from "@/components/map/EditDeviceModal";
import { useNetworkStore } from "@/store/networkStore";
import type { Device } from "@/types/network";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Edit3,
  GitBranch,
  MapPin,
  Signal,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

interface DeviceDetailPanelProps {
  device: Device;
  onClose: () => void;
  onDelete: () => void;
}

type ConfirmMode = "none" | "single" | "cascade";

function useDescendantSummary(device: Device) {
  const { devices } = useNetworkStore();
  return useMemo(() => {
    if (device.connectedTo.length === 0 && device.type !== "OLT") return null;
    const visited = new Set<string>();
    const stack = [...device.connectedTo];
    while (stack.length > 0) {
      const id = stack.pop()!;
      if (visited.has(id)) continue;
      visited.add(id);
      const d = devices.find((x) => x.id === id);
      if (d) {
        for (const child of d.connectedTo) {
          if (!visited.has(child)) stack.push(child);
        }
      }
    }
    if (visited.size === 0) return null;
    const counts: Partial<Record<string, number>> = {};
    for (const id of visited) {
      const d = devices.find((x) => x.id === id);
      if (d) counts[d.type] = (counts[d.type] ?? 0) + 1;
    }
    const parts = Object.entries(counts).map(
      ([type, n]) => `${n} ${type}${n! > 1 ? "s" : ""}`,
    );
    return { total: visited.size, summary: parts.join(", ") };
  }, [device, devices]);
}

// ── Signal strength gauge ─────────────────────────────────────────────────────
function SignalGauge({
  value,
  status,
}: { value: number | undefined; status: string }) {
  const normalized =
    value !== undefined ? Math.max(0, Math.min(100, (value + 40) * 2)) : 0;
  const color =
    status === "active"
      ? "#10b981"
      : status === "faulty"
        ? "#ef4444"
        : "#f59e0b";

  if (value === undefined) {
    return (
      <p className="font-mono text-lg font-bold text-muted-foreground">—</p>
    );
  }

  return (
    <div>
      <p className="font-mono text-lg font-bold" style={{ color }}>
        {value}
        <span className="text-xs ml-0.5 text-muted-foreground">dBm</span>
      </p>
      <div className="mt-1.5 h-1.5 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${normalized}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ── Uptime ring progress ──────────────────────────────────────────────────────
function UptimeRing({ uptime, status }: { uptime: number; status: string }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const progress = circ - (uptime / 100) * circ;
  const color = uptime > 95 ? "#10b981" : uptime > 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-10 h-10">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted/30"
          />
          <motion.circle
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold"
          style={{ color }}
        >
          {uptime.toFixed(0)}%
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground font-mono">
        {status === "active" ? "UP" : status === "faulty" ? "DOWN" : "WARN"}
      </span>
    </div>
  );
}

// ── Section divider ───────────────────────────────────────────────────────────
function SectionDivider() {
  return <div className="border-t border-border/30 my-0.5" />;
}

export function DeviceDetailPanel({
  device,
  onClose,
  onDelete,
}: DeviceDetailPanelProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>("none");
  const { deleteDeviceWithChildren } = useNetworkStore();
  const descendantInfo = useDescendantSummary(device);
  const showCascadeButton =
    device.type === "OLT" || device.connectedTo.length > 0;
  const accent = TYPE_ACCENT[device.type];

  function handleCascadeDelete() {
    deleteDeviceWithChildren(device.id);
    onClose();
  }

  return (
    <motion.div
      className="flex flex-col h-full"
      data-ocid="device-detail-panel"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* ── Sticky header ────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b border-border/40 sticky top-0 z-10"
        style={{
          background: "oklch(var(--card) / 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Accent bar on left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full"
          style={{ background: accent }}
        />
        <DeviceIcon
          type={device.type}
          status={device.status}
          size="lg"
          variant="outline"
        />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm font-semibold text-foreground truncate leading-tight">
            {device.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[10px] font-mono font-medium uppercase tracking-widest"
              style={{ color: accent }}
            >
              {device.type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={device.status} size="sm" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
            aria-label="Close panel"
            data-ocid="device-detail-close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Scrollable body ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto noc-scrollbar">
        {/* Location card */}
        <div className="px-4 py-3">
          <div className="rounded-xl bg-muted/15 border border-border/25 p-3">
            <div className="flex items-center gap-2 mb-2">
              <MapPin
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: accent }}
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Location
              </span>
            </div>
            {device.location && (
              <p className="text-xs text-foreground font-medium mb-0.5">
                {device.location}
              </p>
            )}
            <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {device.lat.toFixed(5)}, {device.lng.toFixed(5)}
            </p>
          </div>
        </div>

        <SectionDivider />

        {/* Metrics grid */}
        <div className="px-4 py-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
            Metrics
          </p>
          {device.signalStrength !== undefined ||
          device.uptime !== undefined ? (
            <div className="grid grid-cols-2 gap-3">
              {/* Signal */}
              <div className="rounded-xl bg-muted/15 border border-border/25 p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Signal className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Signal
                  </span>
                </div>
                <SignalGauge
                  value={device.signalStrength}
                  status={device.status}
                />
              </div>

              {/* Uptime */}
              <div className="rounded-xl bg-muted/15 border border-border/25 p-3 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1.5 mb-2 self-start">
                  <Activity className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Uptime
                  </span>
                </div>
                {device.uptime !== undefined ? (
                  <UptimeRing uptime={device.uptime} status={device.status} />
                ) : (
                  <p className="font-mono text-lg font-bold text-muted-foreground">
                    —
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-muted/10 border border-border/20 p-4 text-center">
              <Cpu className="w-6 h-6 text-muted-foreground/40 mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground font-mono">
                No metrics available
              </p>
            </div>
          )}
        </div>

        <SectionDivider />

        {/* Ports */}
        <div className="px-4 py-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Ports
          </p>
          <div className="flex flex-wrap gap-1.5">
            {Array.from(
              { length: Math.min(device.ports, 24) },
              (_, i) => i + 1,
            ).map((portNum) => (
              <div
                key={portNum}
                className="w-5 h-5 rounded border text-[8px] font-mono flex items-center justify-center transition-smooth"
                style={{
                  background:
                    portNum <= 4 ? `${accent}22` : "oklch(var(--muted) / 0.2)",
                  borderColor:
                    portNum <= 4 ? `${accent}60` : "oklch(var(--border) / 0.4)",
                  color:
                    portNum <= 4 ? accent : "oklch(var(--muted-foreground))",
                }}
              >
                {portNum}
              </div>
            ))}
            {device.ports > 24 && (
              <div className="w-5 h-5 rounded border border-border/30 text-[8px] font-mono flex items-center justify-center text-muted-foreground bg-muted/10">
                +{device.ports - 24}
              </div>
            )}
          </div>
        </div>

        {/* Connected devices */}
        {device.connectedTo.length > 0 && (
          <>
            <SectionDivider />
            <div className="px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                Connected To ({device.connectedTo.length})
              </p>
              <div className="space-y-1 max-h-32 overflow-y-auto noc-scrollbar">
                {device.connectedTo.map((id) => (
                  <div
                    key={id}
                    className="flex items-center gap-2 rounded-lg bg-muted/15 border border-border/20 px-2.5 py-1.5"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: accent }}
                    />
                    <span className="font-mono text-xs text-foreground/80 truncate">
                      {id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Actions footer ───────────────────────────────────────────────── */}
      <div className="px-4 py-3 border-t border-border/40 space-y-2">
        <AnimatePresence mode="wait">
          {confirmMode === "none" && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-2"
            >
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-primary/12 border border-primary/35 text-primary hover:bg-primary/20 transition-smooth"
                data-ocid="device-edit-btn"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Device
              </button>
              <button
                type="button"
                onClick={() => setConfirmMode("single")}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-smooth"
                data-ocid="device-delete-btn"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Device
              </button>
              {showCascadeButton && (
                <button
                  type="button"
                  onClick={() => setConfirmMode("cascade")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-smooth"
                  data-ocid="device-delete-cascade-btn"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  {device.type === "OLT"
                    ? "Delete Root + Children"
                    : "Delete with Children"}
                </button>
              )}
            </motion.div>
          )}

          {confirmMode === "single" && (
            <motion.div
              key="single-confirm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 space-y-2"
              data-ocid="device-delete-confirm-dialog"
            >
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
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
                  onClick={() => setConfirmMode("none")}
                  className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 transition-smooth"
                  data-ocid="device-delete-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {confirmMode === "cascade" && (
            <motion.div
              key="cascade-confirm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="rounded-xl bg-orange-500/10 border border-orange-500/30 p-3 space-y-2"
              data-ocid="device-cascade-delete-confirm-dialog"
            >
              <div className="flex items-center gap-2 text-orange-400">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs font-mono font-semibold">
                  Delete entire subtree?
                </span>
              </div>
              {descendantInfo ? (
                <p className="text-[11px] text-orange-300/80 font-mono leading-relaxed">
                  Deletes{" "}
                  <span className="font-bold text-orange-300">
                    1 {device.type}
                  </span>
                  {" + "}
                  <span className="font-bold text-orange-300">
                    {descendantInfo.summary}
                  </span>{" "}
                  ({descendantInfo.total + 1} total).
                </p>
              ) : (
                <p className="text-[11px] text-orange-300/80 font-mono">
                  Deletes this {device.type} and all connected devices.
                </p>
              )}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCascadeDelete}
                  className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-orange-500/20 border border-orange-500/50 text-orange-300 hover:bg-orange-500/30 transition-smooth"
                  data-ocid="device-cascade-delete-confirm-btn"
                >
                  Delete All
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmMode("none")}
                  className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 transition-smooth"
                  data-ocid="device-cascade-delete-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {editOpen && (
        <EditDeviceModal device={device} onClose={() => setEditOpen(false)} />
      )}
    </motion.div>
  );
}
