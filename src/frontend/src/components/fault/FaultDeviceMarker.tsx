/**
 * FaultDeviceMarker.tsx
 * Leaflet marker for OLT, Splitter, Router, JJB, Switch, ONT with advanced fault styling.
 * Affected: orange concentric ring pulse (0.8s infinite).
 * Faulty: red sharp glow pulse. Selected: 1.2x scale.
 */
import type { Device } from "@/types/network";
import L from "leaflet";
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

function buildPulseRings(status: DisplayStatus, color: string): string {
  if (status === "affected") {
    // Concentric orange rings pulsing outward
    return `
      <circle cx="20" cy="20" r="16" fill="${color}" opacity="0" style="animation: fault-pulse-ring 0.8s cubic-bezier(0,0,0.2,1) infinite 0s"/>
      <circle cx="20" cy="20" r="16" fill="${color}" opacity="0" style="animation: fault-pulse-ring 0.8s cubic-bezier(0,0,0.2,1) infinite 0.4s"/>
    `;
  }
  if (status === "faulty") {
    // Sharp red glow pulse
    return `
      <circle cx="20" cy="20" r="18" fill="none" stroke="${color}" stroke-width="2" opacity="0" style="animation: fault-glow-ring 0.7s cubic-bezier(0,0,0.2,1) infinite"/>
    `;
  }
  return "";
}

function deviceIconSvg(
  status: DisplayStatus,
  type: string,
  isHighlighted: boolean,
): string {
  const color = STATUS_COLORS[status];
  const symbol = TYPE_SYMBOLS[type] ?? "●";
  const baseSize = type === "OLT" ? 13 : 10;
  const scale = isHighlighted ? 1.2 : 1;
  const outerSize = Math.round(baseSize * scale);

  // Selection ring — dashed
  const selectionRing = isHighlighted
    ? `<circle cx="20" cy="20" r="18" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="4 2.5" opacity="0.9"/>`
    : "";

  // Inner fill with subtle gradient shine
  const gradId = `g_${type}_${status}`;
  const gradient = `
    <defs>
      <radialGradient id="${gradId}" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stop-color="white" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
  `;

  const pulseRings = buildPulseRings(status, color);
  const shadowOpacity = status === "faulty" ? 0.25 : 0.12;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" style="overflow:visible">
    <style>
      @keyframes fault-pulse-ring {
        0% { r: ${outerSize}; opacity: 0.85; }
        100% { r: ${outerSize * 2.4}; opacity: 0; }
      }
      @keyframes fault-glow-ring {
        0% { r: ${outerSize + 2}; opacity: 0.9; stroke-width: 2; }
        100% { r: ${outerSize * 1.9}; opacity: 0; stroke-width: 1; }
      }
    </style>
    ${gradient}
    ${pulseRings}
    <circle cx="20" cy="20" r="${outerSize + 3}" fill="${color}" opacity="${shadowOpacity}"/>
    <circle cx="20" cy="20" r="${outerSize}" fill="${color}" opacity="${status === "affected" ? 0.88 : 1}"/>
    <circle cx="20" cy="20" r="${outerSize}" fill="url(#${gradId})"/>
    <circle cx="20" cy="20" r="${outerSize}" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1.2"/>
    ${selectionRing}
    <text x="20" y="25" text-anchor="middle" font-size="${type === "OLT" ? 11 : 9}" fill="white" font-weight="bold" font-family="system-ui">${symbol}</text>
  </svg>`;
}

function createDeviceIcon(
  status: DisplayStatus,
  type: string,
  isHighlighted: boolean,
): L.DivIcon {
  const svgHtml = deviceIconSvg(status, type, isHighlighted);
  const extraClass = status === "faulty" ? "animate-blink-fault" : "";
  return L.divIcon({
    html: svgHtml,
    className: extraClass,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
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
  const color = STATUS_COLORS[displayStatus];

  return (
    <Marker
      position={[device.lat, device.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup className="fault-device-popup" maxWidth={230}>
        <div className="p-1.5 min-w-[170px]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-mono font-bold text-foreground flex-1 min-w-0 truncate">
              {device.name}
            </span>
            <span
              className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${color}22`,
                color,
                border: `1px solid ${color}44`,
              }}
            >
              {STATUS_LABELS[displayStatus]}
            </span>
          </div>
          <div className="space-y-1 text-[11px] text-muted-foreground">
            <div className="flex justify-between">
              <span className="text-foreground/50">Type</span>
              <span className="text-foreground font-medium">{device.type}</span>
            </div>
            {device.location && (
              <div className="flex justify-between">
                <span className="text-foreground/50">Location</span>
                <span className="text-foreground truncate max-w-[100px]">
                  {device.location}
                </span>
              </div>
            )}
            {device.signalStrength && (
              <div className="flex justify-between">
                <span className="text-foreground/50">Signal</span>
                <span className="text-foreground">
                  {device.signalStrength} dBm
                </span>
              </div>
            )}
            {affectedCount > 0 && (
              <div
                className="mt-1.5 flex items-center gap-1.5 px-2 py-1 rounded-md"
                style={{ background: "#f9731620", color: "#f97316" }}
              >
                <span>⚠</span>
                <span className="font-semibold">
                  {affectedCount} customer{affectedCount !== 1 ? "s" : ""}{" "}
                  affected
                </span>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
