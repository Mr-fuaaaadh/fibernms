/**
 * FaultFiberPolyline.tsx
 * Leaflet polyline for fiber routes with advanced fault status styling.
 * Faulty: red with marching-ants dasharray animation + pulsing glow overlay.
 * Affected: orange dashed. Active: green solid.
 * Cut: red with X marker and blinking circle at midpoint.
 */
import type { FiberRoute } from "@/types/network";
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
  const color = ROUTE_COLORS[displayStatus];
  const weight = ROUTE_WEIGHTS[route.type] ?? 2;
  const positions = route.waypoints.map(
    (wp) => [wp.lat, wp.lng] as [number, number],
  );

  const midpoint = route.waypoints[Math.floor(route.waypoints.length / 2)];
  const isActive = displayStatus === "active";
  const isFaulty = displayStatus === "faulty";
  const isWarning = displayStatus === "warning";

  return (
    <>
      {/* === FAULTY / CUT fiber === */}
      {isFaulty && (
        <>
          {/* Wide soft glow halo layer */}
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#ef4444",
              weight: weight + 10,
              opacity: isHighlighted ? 0.18 : 0.09,
            }}
          />
          {/* Pulsing glow outline */}
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#ef4444",
              weight: weight + 4,
              opacity: 0.28,
              dashArray: "1 0",
            }}
            className="fault-blink"
          />
          {/* Core red line — marching ants animation via SVG dashArray */}
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#ef4444",
              weight: isHighlighted ? weight + 2 : weight,
              opacity: 0.95,
              dashArray: "12 6",
              dashOffset: "0",
            }}
            className="fault-fiber-marching"
            eventHandlers={{ click: onClick }}
          >
            <Popup maxWidth={200}>
              <FiberPopup
                route={route}
                color={color}
                isCut={isCut}
                displayStatus={displayStatus}
                affectedCount={affectedCount}
              />
            </Popup>
          </Polyline>
        </>
      )}

      {/* === AFFECTED / WARNING fiber (orange dashed) === */}
      {isWarning && (
        <>
          {/* Soft orange glow */}
          {isHighlighted && (
            <Polyline
              positions={positions}
              pathOptions={{
                color: "#f97316",
                weight: weight + 8,
                opacity: 0.12,
              }}
            />
          )}
          {/* Orange dashed main line */}
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#f97316",
              weight: isHighlighted ? weight + 2 : weight,
              opacity: isHighlighted ? 0.9 : 0.65,
              dashArray: "8 5",
            }}
            eventHandlers={{ click: onClick }}
          >
            <Popup maxWidth={200}>
              <FiberPopup
                route={route}
                color={color}
                isCut={isCut}
                displayStatus={displayStatus}
                affectedCount={affectedCount}
              />
            </Popup>
          </Polyline>
        </>
      )}

      {/* === ACTIVE fiber (green solid) === */}
      {isActive && (
        <Polyline
          positions={positions}
          pathOptions={{
            color: "#22c55e",
            weight: isHighlighted ? weight + 2 : weight,
            opacity: isHighlighted ? 0.9 : 0.45,
          }}
          eventHandlers={{ click: onClick }}
        >
          <Popup maxWidth={200}>
            <FiberPopup
              route={route}
              color={color}
              isCut={isCut}
              displayStatus={displayStatus}
              affectedCount={affectedCount}
            />
          </Popup>
        </Polyline>
      )}

      {/* === Cut point marker at midpoint === */}
      {isCut && midpoint && (
        <>
          {/* Outer pulse ring */}
          <CircleMarker
            center={[midpoint.lat, midpoint.lng]}
            radius={14}
            pathOptions={{
              color: "#ef4444",
              fillColor: "#ef4444",
              fillOpacity: 0,
              weight: 2,
              opacity: 0.5,
            }}
            className="fault-blink"
          />
          {/* Inner solid dot */}
          <CircleMarker
            center={[midpoint.lat, midpoint.lng]}
            radius={7}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#ef4444",
              fillOpacity: 1,
              weight: 2,
            }}
            className="fault-blink"
            eventHandlers={{ click: onClick }}
          />
        </>
      )}
    </>
  );
}

/** Shared popup content for all fiber states */
function FiberPopup({
  route,
  color,
  isCut,
  displayStatus,
  affectedCount,
}: {
  route: FiberRoute;
  color: string;
  isCut: boolean;
  displayStatus: RouteDisplayStatus;
  affectedCount: number;
}) {
  const statusLabel = isCut
    ? "CUT ✂"
    : displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1);
  return (
    <div className="p-1.5 min-w-[150px]">
      <p className="text-xs font-mono font-bold text-foreground mb-2">
        {route.name}
      </p>
      <div className="space-y-1 text-[11px] text-muted-foreground">
        <div className="flex justify-between">
          <span className="text-foreground/50">Type</span>
          <span className="text-foreground capitalize">{route.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/50">Status</span>
          <span style={{ color }}>{statusLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/50">Length</span>
          <span className="text-foreground">{route.distanceKm} km</span>
        </div>
        {affectedCount > 0 && (
          <div
            className="mt-1.5 flex items-center gap-1 px-2 py-1 rounded-md"
            style={{ background: "#f9731620", color: "#f97316" }}
          >
            <span>⚠</span>
            <span className="font-semibold">
              {affectedCount} customer{affectedCount !== 1 ? "s" : ""} affected
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
