import type { Device } from "@/types/network";
/**
 * CustomerMarker.tsx
 * Small circle marker for customer ONT nodes with status coloring.
 */
import { CircleMarker, Popup } from "react-leaflet";

type CustomerDisplayStatus = "active" | "affected" | "faulty";

interface CustomerMarkerProps {
  customer: Device;
  displayStatus: CustomerDisplayStatus;
  isHighlighted: boolean;
  upstreamFaultSource: string | null;
  onClick: () => void;
}

const CUSTOMER_COLORS: Record<CustomerDisplayStatus, string> = {
  active: "#22c55e",
  affected: "#f97316",
  faulty: "#ef4444",
};

export function CustomerMarker({
  customer,
  displayStatus,
  isHighlighted,
  upstreamFaultSource,
  onClick,
}: CustomerMarkerProps) {
  const color = CUSTOMER_COLORS[displayStatus];
  const radius = isHighlighted ? 7 : 5;

  return (
    <CircleMarker
      center={[customer.lat, customer.lng]}
      radius={radius}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: isHighlighted ? 1 : 0.75,
        weight: isHighlighted ? 2 : 1,
      }}
      eventHandlers={{ click: onClick }}
    >
      <Popup maxWidth={200}>
        <div className="p-1 min-w-[140px]">
          <p className="text-xs font-mono font-bold text-foreground mb-1">
            {customer.name}
          </p>
          <div className="space-y-0.5 text-[11px] text-muted-foreground">
            <p>
              <span className="text-foreground/60">Status:</span>{" "}
              <span style={{ color }}>
                {displayStatus === "affected"
                  ? "Affected"
                  : displayStatus === "faulty"
                    ? "Down"
                    : "Active"}
              </span>
            </p>
            <p>
              <span className="text-foreground/60">Location:</span>{" "}
              {customer.location ?? "N/A"}
            </p>
            {customer.signalStrength && (
              <p>
                <span className="text-foreground/60">Signal:</span>{" "}
                {customer.signalStrength} dBm
              </p>
            )}
            {upstreamFaultSource && (
              <p className="text-amber-500 font-semibold mt-1">
                ⚠ Fault source: {upstreamFaultSource}
              </p>
            )}
            {displayStatus === "active" && (
              <p className="text-emerald-500 mt-1">✓ Connected</p>
            )}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}
