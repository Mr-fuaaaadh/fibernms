import type { Device, DeviceType } from "@/types/network";
import L from "leaflet";
import { Marker } from "react-leaflet";

const DEVICE_SVG: Record<DeviceType, string> = {
  OLT: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  ONT: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
  Splitter: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  JJB: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  Switch: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><path d="M5 10v4"/><path d="M12 10v4"/><path d="M19 10v4"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>`,
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

function buildIcon(
  type: DeviceType,
  status: string,
  isSelected: boolean,
): L.DivIcon {
  const colors = STATUS_COLOR[status] ?? STATUS_COLOR.active;
  const svg = DEVICE_SVG[type];
  const size = type === "OLT" ? 40 : 32;
  const iconSize = type === "OLT" ? 18 : 14;

  const resizedSvg = svg
    .replace(/width="\d+"/, `width="${iconSize}"`)
    .replace(/height="\d+"/, `height="${iconSize}"`);

  const html = `
    <div style="
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${colors.fill};
      border:2px solid ${colors.ring};
      box-shadow:${colors.glow}${isSelected ? `,0 0 0 3px ${colors.ring}55` : ""};
      display:flex;
      align-items:center;
      justify-content:center;
      color:${colors.ring};
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
