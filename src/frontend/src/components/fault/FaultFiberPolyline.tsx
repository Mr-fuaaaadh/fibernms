import type { FiberRoute } from "@/types/network";
/**
 * FaultFiberPolyline.tsx
 * Leaflet polyline for fiber routes with status-based coloring and blink on cut.
 */
import { CircleMarker, Polyline, Popup } from "react-leaflet";

type RouteDisplayStatus = "active" | "faulty" | "warning";

interface FaultFiberPolylineProps {
  route: FiberRoute;
  displayStatus: RouteDisplayStatus;
  isHighlighted: boolean;
  isCut: boolean;
  affectedCount: number;
  onClick: () => void;
}

const ROUTE_COLORS: Record<RouteDisplayStatus, string> = {
  active: "#22c55e",
  faulty: "#ef4444",
  warning: "#f97316",
};

const ROUTE_WEIGHTS: Record<string, number> = {
  backbone: 4,
  distribution: 3,
  drop: 2,
};

export function FaultFiberPolyline({
  route,
  displayStatus,
  isHighlighted,
  isCut,
  affectedCount,
  onClick,
}: FaultFiberPolylineProps) {
  const color = isHighlighted
    ? ROUTE_COLORS[displayStatus]
    : displayStatus === "active"
      ? "#22c55e"
      : ROUTE_COLORS[displayStatus];

  const weight = ROUTE_WEIGHTS[route.type] ?? 2;
  const positions = route.waypoints.map(
    (wp) => [wp.lat, wp.lng] as [number, number],
  );

  const midpoint = route.waypoints[Math.floor(route.waypoints.length / 2)];

  return (
    <>
      {/* Outer glow for highlighted/faulty */}
      {(isHighlighted || displayStatus === "faulty") && (
        <Polyline
          positions={positions}
          pathOptions={{
            color,
            weight: weight + 6,
            opacity: 0.18,
          }}
        />
      )}

      {/* Main polyline */}
      <Polyline
        positions={positions}
        pathOptions={{
          color,
          weight: isHighlighted ? weight + 2 : weight,
          opacity: displayStatus === "active" && !isHighlighted ? 0.55 : 0.9,
          dashArray: displayStatus === "warning" ? "6 4" : undefined,
        }}
        eventHandlers={{ click: onClick }}
      >
        <Popup maxWidth={200}>
          <div className="p-1 min-w-[140px]">
            <p className="text-xs font-mono font-bold text-foreground mb-1">
              {route.name}
            </p>
            <div className="space-y-0.5 text-[11px] text-muted-foreground">
              <p>
                <span className="text-foreground/60">Type:</span> {route.type}
              </p>
              <p>
                <span className="text-foreground/60">Status:</span>{" "}
                <span style={{ color }}>{isCut ? "Cut" : displayStatus}</span>
              </p>
              <p>
                <span className="text-foreground/60">Length:</span>{" "}
                {route.distanceKm} km
              </p>
              {affectedCount > 0 && (
                <p className="text-amber-500 font-semibold mt-1">
                  ⚠ {affectedCount} customer{affectedCount !== 1 ? "s" : ""}{" "}
                  affected
                </p>
              )}
            </div>
          </div>
        </Popup>
      </Polyline>

      {/* Blinking cut marker at midpoint */}
      {isCut && midpoint && (
        <CircleMarker
          center={[midpoint.lat, midpoint.lng]}
          radius={8}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.9,
            weight: 2,
          }}
          className="fault-blink"
          eventHandlers={{ click: onClick }}
        />
      )}
    </>
  );
}
