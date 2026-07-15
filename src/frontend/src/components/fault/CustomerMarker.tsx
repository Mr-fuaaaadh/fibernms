/**
 * CustomerMarker.tsx
 * 12px circle markers with status rings for customer ONT nodes.
 * Affected: orange ring + scale-pulse every 2s.
 * Active: green solid ring.
 * Tooltip with customer name + status.
 */
import type { Device } from "@/types/network";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

type CustomerDisplayStatus = "active" | "affected" | "faulty";

interface CustomerMarkerProps {
  customer: Device;
  displayStatus: CustomerDisplayStatus;
  isHighlighted: boolean;
  upstreamFaultSource: string | null;
  onClick: () => void;
}

const CUSTOMER_COLORS: Record<
  CustomerDisplayStatus,
  { fill: string; ring: string }
> = {
  active: { fill: "#22c55e", ring: "#22c55e" },
  affected: { fill: "#f97316", ring: "#f97316" },
  faulty: { fill: "#ef4444", ring: "#ef4444" },
};

const STATUS_LABELS: Record<CustomerDisplayStatus, string> = {
  active: "Connected",
  affected: "Affected",
  faulty: "Down",
};

function buildCustomerSvg(
  status: CustomerDisplayStatus,
  isHighlighted: boolean,
): string {
  const { fill, ring } = CUSTOMER_COLORS[status];
  const r = isHighlighted ? 8 : 6;
  const ringW = 2;
  const ringR = r + ringW + 1;
  const size = (ringR + 4) * 2;
  const cx = size / 2;

  // Pulse animation for affected
  const pulseStyle =
    status === "affected"
      ? `style="animation: customer-dot-pulse 2s ease-in-out infinite"`
      : "";

  const ringStyle =
    status === "affected"
      ? `style="animation: customer-ring-pulse 2s ease-in-out infinite"`
      : "";

  // Inner glow for highlighted
  const glowLayer = isHighlighted
    ? `<circle cx="${cx}" cy="${cx}" r="${r + 5}" fill="${fill}" opacity="0.15"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow:visible">
  <style>
    @keyframes customer-dot-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.9; }
    }
    @keyframes customer-ring-pulse {
      0%, 100% { opacity: 0.8; r: ${ringR}; }
      50% { opacity: 0.4; r: ${ringR + 2}; }
    }
  </style>
  ${glowLayer}
  <circle cx="${cx}" cy="${cx}" r="${ringR}" fill="none" stroke="${ring}" stroke-width="${ringW}" ${ringStyle}/>
  <circle cx="${cx}" cy="${cx}" r="${r}" fill="${fill}" ${pulseStyle}/>
  <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.8"/>
</svg>`;
}

function createCustomerIcon(
  status: CustomerDisplayStatus,
  isHighlighted: boolean,
): L.DivIcon {
  const svgHtml = buildCustomerSvg(status, isHighlighted);
  const size = isHighlighted ? 30 : 26;
  return L.divIcon({
    html: svgHtml,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

export function CustomerMarker({
  customer,
  displayStatus,
  isHighlighted,
  upstreamFaultSource,
  onClick,
}: CustomerMarkerProps) {
  const icon = createCustomerIcon(displayStatus, isHighlighted);
  const { fill } = CUSTOMER_COLORS[displayStatus];

  return (
    <Marker
      position={[customer.lat, customer.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup maxWidth={210}>
        <div className="p-1.5 min-w-[150px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-foreground flex-1 min-w-0 truncate">
              {customer.name}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${fill}22`,
                color: fill,
                border: `1px solid ${fill}44`,
              }}
            >
              {STATUS_LABELS[displayStatus]}
            </span>
          </div>
          <div className="space-y-1 text-[11px] text-muted-foreground">
            {customer.location && (
              <div className="flex justify-between">
                <span className="text-foreground/50">Location</span>
                <span className="text-foreground truncate max-w-[110px]">
                  {customer.location}
                </span>
              </div>
            )}
            {customer.signalStrength && (
              <div className="flex justify-between">
                <span className="text-foreground/50">Signal</span>
                <span
                  className="font-medium"
                  style={{
                    color: customer.signalStrength < -28 ? "#ef4444" : fill,
                  }}
                >
                  {customer.signalStrength} dBm
                </span>
              </div>
            )}
            {upstreamFaultSource && (
              <div
                className="mt-1.5 flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ background: "#f9731620", color: "#f97316" }}
              >
                <span>⚠</span>
                <span className="font-semibold text-[10px]">
                  Fault: {upstreamFaultSource}
                </span>
              </div>
            )}
            {displayStatus === "active" && (
              <div
                className="mt-1.5 flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ background: "#22c55e20", color: "#22c55e" }}
              >
                <span>✓</span>
                <span className="font-medium text-[10px]">Connected</span>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
