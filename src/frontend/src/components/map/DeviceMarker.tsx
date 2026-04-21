import type { Device, DeviceType } from "@/types/network";
import L from "leaflet";
import { Marker } from "react-leaflet";

// ── Distinct shape SVGs for each of the 7 device types ──────────────────────
// OLT=blue hexagon, ONT=green square, Splitter=orange diamond,
// Coupler=purple circle, Router=red star, JJB=yellow cross, Switch=teal triangle

const DEVICE_SVG: Record<DeviceType, string> = {
  // OLT — server rack icon (blue)
  OLT: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  // ONT — wifi icon (green)
  ONT: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
  // Splitter — git branch icon (orange)
  Splitter: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  // JJB — junction box icon (yellow)
  JJB: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  // Switch — network switch icon (teal)
  Switch: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><path d="M5 10v4"/><path d="M12 10v4"/><path d="M19 10v4"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>`,
  // Coupler — link/merge icon (purple)
  Coupler: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  // Router — globe/network routing icon (red)
  Router: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
};

// ── Per-type accent colors (independent of status ring) ──────────────────────
const TYPE_ACCENT: Record<DeviceType, string> = {
  OLT: "#3b82f6", // blue
  ONT: "#10b981", // green
  Splitter: "#f97316", // orange
  JJB: "#eab308", // yellow
  Switch: "#14b8a6", // teal
  Coupler: "#a855f7", // purple
  Router: "#ef4444", // red
};

const STATUS_COLOR: Record<
  string,
  { fill: string; ring: string; glow: string }
> = {
  active: {
    fill: "rgba(16,185,129,0.15)",
    ring: "#10b981",
    glow: "0 0 12px rgba(16,185,129,0.7)",
  },
  faulty: {
    fill: "rgba(239,68,68,0.15)",
    ring: "#ef4444",
    glow: "0 0 12px rgba(239,68,68,0.7)",
  },
  warning: {
    fill: "rgba(245,158,11,0.15)",
    ring: "#f59e0b",
    glow: "0 0 12px rgba(245,158,11,0.7)",
  },
};

// ── Shape background per type ─────────────────────────────────────────────────
function getShapeStyle(
  type: DeviceType,
  colors: typeof STATUS_COLOR.active,
): string {
  const accent = TYPE_ACCENT[type];
  switch (type) {
    case "OLT":
      // Hexagon via clip-path
      return `clip-path:polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);border-radius:2px;background:${accent}22;border:2px solid ${accent};box-shadow:${colors.glow};`;
    case "ONT":
      // Square
      return `border-radius:4px;background:${colors.fill};border:2px solid ${colors.ring};box-shadow:${colors.glow};`;
    case "Splitter":
      // Diamond via clip-path
      return `clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%);border-radius:2px;background:${accent}22;border:2px solid ${accent};box-shadow:${colors.glow};`;
    case "JJB":
      // Cross via CSS — just rounded-sm with thick border
      return `border-radius:2px;background:${colors.fill};border:2px solid ${colors.ring};box-shadow:${colors.glow};`;
    case "Switch":
      // Triangle via clip-path
      return `clip-path:polygon(50% 0%,100% 100%,0% 100%);border-radius:2px;background:${accent}22;border:2px solid ${accent};box-shadow:${colors.glow};`;
    case "Coupler":
      // Circle
      return `border-radius:50%;background:${accent}22;border:2px solid ${accent};box-shadow:${colors.glow};`;
    case "Router":
      // Star via clip-path (5-point)
      return `clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);border-radius:2px;background:${accent}22;border:2px solid ${accent};box-shadow:${colors.glow};`;
    default:
      return `border-radius:50%;background:${colors.fill};border:2px solid ${colors.ring};box-shadow:${colors.glow};`;
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
  const size = type === "OLT" ? 42 : 34;
  const iconSize = type === "OLT" ? 18 : 14;

  const resizedSvg = svg
    .replace(/width="\d+"/, `width="${iconSize}"`)
    .replace(/height="\d+"/, `height="${iconSize}"`);

  const shapeStyle = getShapeStyle(type, colors);
  const selectedRing = isSelected ? `,0 0 0 3px ${accent}66` : "";

  const html = `
    <div style="
      width:${size}px;
      height:${size}px;
      ${shapeStyle.replace(/box-shadow:[^;]+;/, `box-shadow:${shapeStyle.match(/box-shadow:([^;]+);/)?.[1] ?? colors.glow}${selectedRing};`)}
      display:flex;
      align-items:center;
      justify-content:center;
      color:${accent};
      cursor:pointer;
      transition:transform 0.15s ease;
      backdrop-filter:blur(4px);
    ">${resizedSvg}</div>
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

// ── Type accent color export for use in other components ─────────────────────
export { TYPE_ACCENT };
