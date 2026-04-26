import type { Device } from "@/types/network";
import L from "leaflet";
/**
 * FaultDeviceMarker.tsx
 * Leaflet marker for OLT, Splitter, Router, JJB, Switch devices with fault status styling.
 */
import { Marker, Popup } from "react-leaflet";

type DisplayStatus = "active" | "faulty" | "warning" | "affected";

interface FaultDeviceMarkerProps {
  device: Device;
  displayStatus: DisplayStatus;
  isHighlighted: boolean;
  affectedCount: number;
  onClick: () => void;
}

const STATUS_COLORS: Record<DisplayStatus, string> = {
  active: "#22c55e",
  faulty: "#ef4444",
  warning: "#eab308",
  affected: "#f97316",
};

const TYPE_SYMBOLS: Record<string, string> = {
  OLT: "⬡",
  Splitter: "◆",
  Router: "★",
  JJB: "✚",
  Switch: "▣",
  Coupler: "◎",
  ONT: "■",
};

function deviceIconSvg(
  status: DisplayStatus,
  type: string,
  isHighlighted: boolean,
): string {
  const color = STATUS_COLORS[status];
  const symbol = TYPE_SYMBOLS[type] ?? "●";
  const size = type === "OLT" ? 18 : 14;
  const ring = isHighlighted
    ? `<circle cx="16" cy="16" r="14" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="4 2" opacity="0.8"/>`
    : "";
  const glow =
    status === "faulty" || status === "affected"
      ? `<circle cx="16" cy="16" r="${size + 2}" fill="${color}" opacity="0.15"/>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    ${glow}
    ${ring}
    <circle cx="16" cy="16" r="${size}" fill="${color}" opacity="${status === "affected" ? 0.85 : 1}"/>
    <circle cx="16" cy="16" r="${size}" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    <text x="16" y="21" text-anchor="middle" font-size="12" fill="white" font-weight="bold">${symbol}</text>
  </svg>`;
}

function createDeviceIcon(
  status: DisplayStatus,
  type: string,
  isHighlighted: boolean,
): L.DivIcon {
  const svgHtml = deviceIconSvg(status, type, isHighlighted);
  return L.divIcon({
    html: svgHtml,
    className: status === "faulty" ? "animate-blink-fault" : "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

const STATUS_LABELS: Record<DisplayStatus, string> = {
  active: "Active",
  faulty: "Down",
  warning: "Warning",
  affected: "Affected",
};

export function FaultDeviceMarker({
  device,
  displayStatus,
  isHighlighted,
  affectedCount,
  onClick,
}: FaultDeviceMarkerProps) {
  const icon = createDeviceIcon(displayStatus, device.type, isHighlighted);

  return (
    <Marker
      position={[device.lat, device.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup className="fault-device-popup" maxWidth={220}>
        <div className="p-1 min-w-[160px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-foreground">
              {device.name}
            </span>
            <span
              className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: `${STATUS_COLORS[displayStatus]}22`,
                color: STATUS_COLORS[displayStatus],
              }}
            >
              {STATUS_LABELS[displayStatus]}
            </span>
          </div>
          <div className="space-y-0.5 text-[11px] text-muted-foreground">
            <p>
              <span className="text-foreground/60">Type:</span> {device.type}
            </p>
            <p>
              <span className="text-foreground/60">Location:</span>{" "}
              {device.location ?? "N/A"}
            </p>
            {device.signalStrength && (
              <p>
                <span className="text-foreground/60">Signal:</span>{" "}
                {device.signalStrength} dBm
              </p>
            )}
            {affectedCount > 0 && (
              <p className="text-amber-500 font-semibold mt-1">
                ⚠ {affectedCount} customer{affectedCount !== 1 ? "s" : ""}{" "}
                affected
              </p>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
