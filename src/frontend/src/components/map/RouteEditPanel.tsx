import { StatusBadge } from "@/components/StatusBadge";
import { useNetworkStore } from "@/store/networkStore";
import type { FiberRoute } from "@/types/network";
import { AlertTriangle, MapPin, Route, Ruler, Trash2, X } from "lucide-react";
import { useState } from "react";

interface RouteEditPanelProps {
  route: FiberRoute;
  onClose: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  backbone: "#00e5ff",
  distribution: "#448aff",
  drop: "#69ff47",
};

export function RouteEditPanel({ route, onClose }: RouteEditPanelProps) {
  const { updateRoute, deleteRoute, setSelectedRoute } = useNetworkStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDeleteWaypoint(idx: number) {
    if (route.waypoints.length <= 2) return;
    const newWaypoints = route.waypoints.filter((_, i) => i !== idx);
    // Recalculate distance
    let d = 0;
    for (let i = 1; i < newWaypoints.length; i++) {
      const prev = newWaypoints[i - 1];
      const curr = newWaypoints[i];
      const R = 6371;
      const dLat = ((curr.lat - prev.lat) * Math.PI) / 180;
      const dLng = ((curr.lng - prev.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((prev.lat * Math.PI) / 180) *
          Math.cos((curr.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2;
      d += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
    updateRoute(route.id, {
      waypoints: newWaypoints,
      distanceKm: Math.round(d * 100) / 100,
    });
  }

  function handleDelete() {
    deleteRoute(route.id);
    setSelectedRoute(null);
    onClose();
  }

  const routeColor = TYPE_COLORS[route.type] ?? "#fff";

  return (
    <div className="flex flex-col h-full" data-ocid="route-edit-panel">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/40">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0"
          style={{
            background: `${routeColor}18`,
            border: `1.5px solid ${routeColor}50`,
          }}
        >
          <Route className="w-4 h-4" style={{ color: routeColor }} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm font-semibold text-foreground truncate">
            {route.name}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {route.type} fiber
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
          aria-label="Close panel"
          data-ocid="route-edit-close-btn"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto noc-scrollbar">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Ruler className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Length
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-foreground">
              {route.distanceKm}
              <span className="text-xs ml-0.5">km</span>
            </p>
          </div>
          <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                Waypoints
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-foreground">
              {route.waypoints.length}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            Status
          </span>
          <StatusBadge
            status={route.status}
            pulse={route.status === "faulty"}
          />
        </div>

        {/* Waypoints list */}
        <div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-2">
            Waypoints
          </p>
          <div className="space-y-1.5">
            {route.waypoints.map((wp, idx) => (
              <div
                key={`${wp.lat}-${wp.lng}-${idx}`}
                className="flex items-center gap-2 rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5 group"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold font-mono flex-shrink-0"
                  style={{ background: `${routeColor}22`, color: routeColor }}
                >
                  {idx + 1}
                </span>
                <span className="flex-1 font-mono text-xs text-foreground/80">
                  {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
                </span>
                {route.waypoints.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteWaypoint(idx)}
                    className="opacity-0 group-hover:opacity-100 rounded p-0.5 text-red-400/60 hover:text-red-400 transition-smooth"
                    aria-label={`Delete waypoint ${idx + 1}`}
                    data-ocid={`delete-waypoint-${idx}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {route.waypoints.length <= 2 && (
            <p className="text-[10px] text-muted-foreground/50 font-mono mt-1.5">
              Minimum 2 waypoints required
            </p>
          )}
        </div>
      </div>

      {/* Delete action */}
      <div className="p-4 border-t border-border/40">
        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-mono bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-smooth"
            data-ocid="route-delete-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Route
          </button>
        ) : (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-xs font-mono">Delete {route.name}?</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30 transition-smooth"
                data-ocid="route-delete-confirm-btn"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-lg py-1.5 text-xs font-mono bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 transition-smooth"
                data-ocid="route-delete-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
