import type { Device, DeviceType } from "@/types/network";
import L from "leaflet";
import { Marker } from "react-leaflet";

// ── Crisp 24px-viewport SVGs per device type (2px stroke) ────────────────────
const DEVICE_SVG: Record<DeviceType, string> = {
  OLT: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/><line x1="10" y1="6" x2="16" y2="6"/><line x1="10" y1="18" x2="16" y2="18"/></svg>`,
  ONT: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1.5" fill="currentColor"/></svg>`,
  Splitter: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  JJB: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
  Switch: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="10" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/><circle cx="10" cy="18" r="1" fill="currentColor"/></svg>`,
  Coupler: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  Router: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
};

// ── Per-type accent colors ────────────────────────────────────────────────────
const TYPE_ACCENT: Record<DeviceType, string> = {
  OLT: "#3b82f6",
  ONT: "#10b981",
  Splitter: "#f97316",
  JJB: "#eab308",
  Switch: "#14b8a6",
  Coupler: "#a855f7",
  Router: "#ef4444",
};

const STATUS_COLOR: Record<
  string,
  { fill: string; ring: string; glow: string }
> = {
  active: {
    fill: "rgba(16,185,129,0.12)",
    ring: "#10b981",
    glow: "0 0 10px rgba(16,185,129,0.6)",
  },
  faulty: {
    fill: "rgba(239,68,68,0.12)",
    ring: "#ef4444",
    glow: "0 0 10px rgba(239,68,68,0.6)",
  },
  warning: {
    fill: "rgba(245,158,11,0.12)",
    ring: "#f59e0b",
    glow: "0 0 10px rgba(245,158,11,0.6)",
  },
};

// ── Shape geometry per type ───────────────────────────────────────────────────
function getShapeClip(type: DeviceType): string {
  switch (type) {
    case "OLT":
      return "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)";
    case "Splitter":
      return "polygon(50% 0%,100% 50%,50% 100%,0% 50%)";
    case "Switch":
      return "polygon(50% 0%,100% 100%,0% 100%)";
    case "Router":
      return "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)";
    default:
      return "";
  }
}

function getShapeRadius(type: DeviceType): string {
  switch (type) {
    case "Coupler":
      return "50%";
    case "ONT":
      return "4px";
    default:
      return "3px";
  }
}

function buildIcon(
  type: DeviceType,
  status: string,
  isSelected: boolean,
): L.DivIcon {
  const colors = STATUS_COLOR[status] ?? STATUS_COLOR.active;
  const accent = TYPE_ACCENT[type];
  const svg = DEVICE_SVG[type];
  const size = type === "OLT" ? 44 : 36;

  const clip = getShapeClip(type);
  const radius = getShapeRadius(type);

  // Selection ring: 3px colored animated ring around the shape
  const selRing = isSelected
    ? `0 0 0 3px ${accent}99, 0 0 16px ${accent}66`
    : "";

  // Faulty: red pulsing ring via CSS animation on the outer wrapper
  const isFaulty = status === "faulty";

  // Build box-shadow
  const baseGlow = colors.glow;
  const shadow = isSelected ? `${baseGlow}, ${selRing}` : baseGlow;

  const shapeShape = clip ? `clip-path:${clip}` : `border-radius:${radius}`;
  const shapeStyle = [
    `width:${size}px`,
    `height:${size}px`,
    `background:${accent}20`,
    `border:2px solid ${accent}`,
    `box-shadow:${shadow}`,
    "display:flex",
    "align-items:center",
    "justify-content:center",
    `color:${accent}`,
    "cursor:pointer",
    "transition:transform 0.15s ease, box-shadow 0.15s ease",
    "backdrop-filter:blur(6px)",
    shapeShape,
  ].join(";");

  // Faulty outer pulsing ring — absolutely positioned pseudo element via extra div
  const clipAttr = clip ? `clip-path:${clip}` : "";
  const faultyRing = isFaulty
    ? `<div style="position:absolute;inset:-5px;border-radius:${radius};border:2px solid #ef4444;animation:pulse-ring-red 0.7s cubic-bezier(0,0,0.2,1) infinite;opacity:0.7;pointer-events:none;${clipAttr}"></div>`
    : "";

  // Status tooltip title injected as a data attribute
  const statusLabel = `${status.toUpperCase()} · Last seen just now`;

  const html = `
    <div style="position:relative;width:${size}px;height:${size}px;" title="${statusLabel}">
      ${faultyRing}
      <div style="${shapeStyle}">${svg}</div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

interface DeviceMarkerProps {
  device: Device;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (lat: number, lng: number) => void;
}

export function DeviceMarker({
  device,
  isSelected,
  onSelect,
  onPositionChange,
}: DeviceMarkerProps) {
  const icon = buildIcon(device.type, device.status, isSelected);

  return (
    <Marker
      position={[device.lat, device.lng]}
      icon={icon}
      draggable
      zIndexOffset={isSelected ? 1000 : 0}
      eventHandlers={{
        click: onSelect,
        dragend(e) {
          const { lat, lng } = (e.target as L.Marker).getLatLng();
          onPositionChange(lat, lng);
        },
      }}
    />
  );
}

export { TYPE_ACCENT };
