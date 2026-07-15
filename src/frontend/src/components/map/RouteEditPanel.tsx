import { useNetworkStore } from "@/store/networkStore";
import type { FiberRoute } from "@/types/network";
import {
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Route,
  Ruler,
  Trash2,
  X,
  ZapOff,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface RouteEditPanelProps {
  route: FiberRoute;
  onClose: () => void;
}

const ROUTE_TYPES = [
  { key: "backbone" as const, label: "Backbone", color: "#00e5ff" },
  { key: "distribution" as const, label: "Distribution", color: "#448aff" },
  { key: "drop" as const, label: "Drop", color: "#69ff47" },
] as const;

export function RouteEditPanel({ route, onClose }: RouteEditPanelProps) {
  const { updateRoute, deleteRoute, setSelectedRoute } = useNetworkStore();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [name, setName] = useState(route.name);
  const [editType, setEditType] = useState<
    "backbone" | "distribution" | "drop"
  >(route.type);
  const [editStatus, setEditStatus] = useState<"active" | "faulty">(
    route.status === "active" ? "active" : "faulty",
  );
  const [distanceKm, setDistanceKm] = useState(String(route.distanceKm));

  const routeColor =
    ROUTE_TYPES.find((t) => t.key === editType)?.color ?? "#00e5ff";
  const isDirty =
    name !== route.name ||
    editType !== route.type ||
    editStatus !== route.status ||
    distanceKm !== String(route.distanceKm);

  function handleSave() {
    updateRoute(route.id, {
      name,
      type: editType,
      status: editStatus,
      distanceKm: Number.parseFloat(distanceKm) || route.distanceKm,
    });
  }

  function handleDelete() {
    deleteRoute(route.id);
    setSelectedRoute(null);
    onClose();
  }

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
      className="flex flex-col h-full"
      style={{
        background: "rgba(8,14,24,0.88)",
        backdropFilter: "blur(20px)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
      }}
      data-ocid="route-edit-panel"
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0"
          style={{
            background: `${routeColor}14`,
            border: `1.5px solid ${routeColor}40`,
          }}
        >
          <Route
            className="w-4 h-4"
            style={{ color: routeColor }}
            aria-hidden="true"
          />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm font-semibold text-foreground truncate">
            {route.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            {/* Route ID badge */}
            <span
              className="font-mono text-[9px] rounded px-1.5 py-0.5 uppercase tracking-wider"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {route.id.slice(0, 8)}
            </span>
            {/* Status badge */}
            <span
              className="font-mono text-[9px] rounded px-1.5 py-0.5 uppercase tracking-wider flex items-center gap-1"
              style={
                route.status === "active"
                  ? {
                      background: "rgba(52,211,153,0.12)",
                      color: "#34d399",
                      border: "1px solid rgba(52,211,153,0.25)",
                    }
                  : {
                      background: "rgba(248,113,113,0.12)",
                      color: "#f87171",
                      border: "1px solid rgba(248,113,113,0.25)",
                    }
              }
            >
              {route.status === "active" ? (
                <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" />
              ) : (
                <ZapOff className="w-2.5 h-2.5" aria-hidden="true" />
              )}
              {route.status}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 transition-colors duration-150 hover:bg-white/8"
          style={{ color: "rgba(255,255,255,0.4)" }}
          aria-label="Close panel"
          data-ocid="route-edit-close-btn"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Body */}
      <div
        className="flex-1 px-4 py-4 space-y-5 overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Name input */}
        <div className="space-y-1.5">
          <label
            htmlFor="route-name"
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Route Name
          </label>
          <input
            id="route-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl px-3 py-2 text-sm font-mono text-foreground transition-colors duration-150 outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            data-ocid="route-name-input"
          />
        </div>

        {/* Route type selector */}
        <div className="space-y-1.5">
          <p
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Route Type
          </p>
          <div className="flex gap-1.5">
            {ROUTE_TYPES.map(({ key, label, color }) => (
              <button
                key={key}
                type="button"
                onClick={() => setEditType(key)}
                aria-pressed={editType === key}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-mono font-medium transition-all duration-150"
                style={{
                  background:
                    editType === key ? `${color}15` : "rgba(255,255,255,0.04)",
                  border:
                    editType === key
                      ? `1.5px solid ${color}45`
                      : "1.5px solid rgba(255,255,255,0.07)",
                  color: editType === key ? color : "rgba(255,255,255,0.35)",
                }}
                data-ocid={`route-type-btn-${key}`}
              >
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{
                    background: color,
                    boxShadow: editType === key ? `0 0 5px ${color}` : "none",
                    opacity: editType === key ? 1 : 0.35,
                  }}
                  aria-hidden="true"
                />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Status toggle */}
        <div className="space-y-1.5">
          <p
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Status
          </p>
          <div className="flex gap-1.5">
            {(["active", "faulty"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setEditStatus(s)}
                aria-pressed={editStatus === s}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-mono font-medium transition-all duration-150 capitalize"
                style={
                  editStatus === s
                    ? s === "active"
                      ? {
                          background: "rgba(52,211,153,0.13)",
                          border: "1.5px solid rgba(52,211,153,0.4)",
                          color: "#34d399",
                        }
                      : {
                          background: "rgba(248,113,113,0.13)",
                          border: "1.5px solid rgba(248,113,113,0.4)",
                          color: "#f87171",
                        }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1.5px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.3)",
                      }
                }
                data-ocid={`route-status-${s}`}
              >
                {s === "active" ? (
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                ) : (
                  <ZapOff className="w-3 h-3" aria-hidden="true" />
                )}
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPin
                className="w-3 h-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Waypoints
              </span>
            </div>
            <p className="font-mono text-xl font-bold text-foreground">
              {route.waypoints.length}
            </p>
          </div>

          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Ruler
                className="w-3 h-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Distance
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                step="0.01"
                min="0"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                className="font-mono text-xl font-bold text-foreground bg-transparent w-full outline-none"
                data-ocid="route-distance-input"
                aria-label="Distance in km"
              />
              <span
                className="font-mono text-xs"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                km
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3.5 space-y-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Save + Cancel row */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className="flex-1 rounded-xl py-2.5 text-sm font-mono font-semibold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: isDirty
                ? "rgba(0,229,255,0.15)"
                : "rgba(0,229,255,0.06)",
              border: isDirty
                ? "1.5px solid rgba(0,229,255,0.45)"
                : "1.5px solid rgba(0,229,255,0.15)",
              color: isDirty ? "#00e5ff" : "rgba(0,229,255,0.3)",
            }}
            data-ocid="route-save-btn"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-mono transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.45)",
            }}
            data-ocid="route-edit-cancel-btn"
          >
            Cancel
          </button>
        </div>

        {/* Delete */}
        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono transition-all duration-150"
            style={{
              background: "rgba(248,113,113,0.08)",
              border: "1.5px solid rgba(248,113,113,0.25)",
              color: "#f87171",
            }}
            data-ocid="route-delete-btn"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            Delete Route
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-3 space-y-2.5"
            style={{
              background: "rgba(248,113,113,0.1)",
              border: "1.5px solid rgba(248,113,113,0.3)",
            }}
          >
            <div
              className="flex items-center gap-2"
              style={{ color: "#f87171" }}
            >
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-mono">
                Delete &quot;{route.name}&quot; permanently?
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-lg py-2 text-xs font-mono font-semibold transition-all duration-150"
                style={{
                  background: "rgba(248,113,113,0.2)",
                  border: "1px solid rgba(248,113,113,0.5)",
                  color: "#fca5a5",
                }}
                data-ocid="route-delete-confirm-btn"
              >
                Yes, Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-lg py-2 text-xs font-mono transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                }}
                data-ocid="route-delete-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
