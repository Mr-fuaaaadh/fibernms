/**
 * MapDashboard.tsx — Unified Network Map (Redesigned)
 * Single map with full device management + fault visualization.
 * Desktop: unified sticky toolbar (top-left) + right panels.
 * Mobile: primary FAB (bottom-right) + stats FAB (bottom-left).
 */
import "leaflet/dist/leaflet.css";
import { DeviceIcon } from "@/components/DeviceIcon";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { CustomerMarker } from "@/components/fault/CustomerMarker";
import { FaultDeviceMarker } from "@/components/fault/FaultDeviceMarker";
import { FaultFiberPolyline } from "@/components/fault/FaultFiberPolyline";
import { FaultStatsPanel } from "@/components/fault/FaultStatsPanel";
import { DeviceDetailPanel } from "@/components/map/DeviceDetailPanel";
import { DeviceMarker } from "@/components/map/DeviceMarker";
import { LayerTogglePanel } from "@/components/map/LayerTogglePanel";
import { DEVICE_TYPE_META } from "@/components/map/PlaceDeviceToolbar";
import { RouteEditPanel } from "@/components/map/RouteEditPanel";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFaultVisualization } from "@/hooks/useFaultVisualization";
import { useNetworkStore } from "@/store/networkStore";
import type {
  Device,
  DeviceStatus,
  DeviceType,
  FiberRoute,
} from "@/types/network";
import L from "leaflet";
import {
  AlertTriangle,
  BarChart2,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  Locate,
  MapPin,
  Minus,
  PenLine,
  Plus,
  RotateCcw,
  Signal,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

// Fix leaflet default icon
(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl =
  undefined;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ROUTE_COLORS: Record<string, string> = {
  backbone: "#00e5ff",
  distribution: "#448aff",
  drop: "#69ff47",
};

const TILE_URL =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// ── Map event handler ─────────────────────────────────────────────────────────
interface MapEventHandlerProps {
  drawMode: boolean;
  isPlacing: boolean;
  onMapClick: (lat: number, lng: number) => void;
  onMapDblClick: (lat: number, lng: number) => void;
  onRightClick: (lat: number, lng: number) => void;
  onClearSelection: () => void;
}

function MapEventHandler({
  drawMode,
  isPlacing,
  onMapClick,
  onMapDblClick,
  onRightClick,
  onClearSelection,
}: MapEventHandlerProps) {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.cursor = drawMode
      ? "crosshair"
      : isPlacing
        ? "crosshair"
        : "";
  }, [drawMode, isPlacing, map]);

  useMapEvents({
    click(e) {
      if (drawMode) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      } else if (isPlacing) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      } else {
        onClearSelection();
      }
    },
    dblclick(e) {
      if (drawMode) {
        e.originalEvent.preventDefault();
        onMapDblClick(e.latlng.lat, e.latlng.lng);
      }
    },
    contextmenu(e) {
      onRightClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// ── Re-center controller ──────────────────────────────────────────────────────
function RecenterController({
  trigger,
  center,
}: {
  trigger: number;
  center: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) map.flyTo(center, 13, { duration: 1.2 });
  }, [trigger, map, center]);
  return null;
}

// ── Auto-zoom to affected area ────────────────────────────────────────────────
function AutoZoom({
  affectedNodes,
  allDevices,
  cutPoint,
}: {
  affectedNodes: Set<string>;
  allDevices: { id: string; lat: number; lng: number }[];
  cutPoint: { lat: number; lng: number } | null;
}) {
  const map = useMapEvents({});
  useEffect(() => {
    const points: [number, number][] = [];
    if (cutPoint) points.push([cutPoint.lat, cutPoint.lng]);
    for (const d of allDevices) {
      if (affectedNodes.has(d.id)) points.push([d.lat, d.lng]);
    }
    if (points.length > 0) {
      map.flyToBounds(L.latLngBounds(points), {
        padding: [60, 60],
        maxZoom: 10,
        duration: 1.2,
      });
    }
  }, [affectedNodes, allDevices, cutPoint, map]);
  return null;
}

// ── Zoom controls (inside map) ────────────────────────────────────────────────
function ZoomController({
  trigger,
}: {
  trigger: { action: "in" | "out" | "fit" | null; seq: number };
}) {
  const map = useMap();
  useEffect(() => {
    if (!trigger.action) return;
    if (trigger.action === "in") map.zoomIn();
    else if (trigger.action === "out") map.zoomOut();
    else if (trigger.action === "fit") map.setView([51.505, -0.09], 11);
  }, [trigger, map]);
  return null;
}

// ── Distance helpers ──────────────────────────────────────────────────────────
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function totalDistance(pts: { lat: number; lng: number }[]) {
  let d = 0;
  for (let i = 1; i < pts.length; i++) {
    d += haversineKm(pts[i - 1].lat, pts[i - 1].lng, pts[i].lat, pts[i].lng);
  }
  return Math.round(d * 100) / 100;
}

// ── Toolbar button ────────────────────────────────────────────────────────────
function ToolBtn({
  onClick,
  icon,
  label,
  active,
  activeColor,
  disabled,
  title,
  badge,
  "data-ocid": ocid,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
  activeColor?: string;
  disabled?: boolean;
  title?: string;
  badge?: number;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={label ?? title}
      aria-pressed={active}
      data-ocid={ocid}
      className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition-all duration-150 min-h-[32px] select-none
        ${
          active
            ? "text-foreground"
            : disabled
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-muted-foreground hover:text-foreground hover:bg-white/8 active:scale-95"
        }`}
      style={
        active && activeColor
          ? {
              background: `${activeColor}18`,
              border: `1px solid ${activeColor}50`,
              color: activeColor,
              boxShadow: `0 0 10px ${activeColor}28`,
            }
          : active
            ? {
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }
            : {}
      }
    >
      {icon}
      {label && (
        <span className="hidden sm:inline whitespace-nowrap">{label}</span>
      )}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-destructive text-[9px] font-mono font-bold text-destructive-foreground border border-background">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}

// ── Toolbar divider ───────────────────────────────────────────────────────────
function ToolDivider() {
  return (
    <div
      aria-hidden="true"
      className="w-px h-5 bg-white/10 mx-0.5 flex-shrink-0"
    />
  );
}

// ── Simulation dropdown ───────────────────────────────────────────────────────
function SimulateDropdown({
  label,
  icon,
  items,
  onSelect,
  disabled,
  "data-ocid": ocid,
}: {
  label: string;
  icon: React.ReactNode;
  items: { id: string; name: string }[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  "data-ocid"?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative" data-ocid={ocid}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-mono transition-all duration-150 min-h-[32px] select-none
          ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : "text-red-400 hover:bg-red-500/10 hover:text-red-300 active:scale-95"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {icon}
        <span className="hidden sm:inline whitespace-nowrap">{label}</span>
        <ChevronDown
          className="w-3 h-3 opacity-60 flex-shrink-0"
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full mt-1.5 left-0 min-w-[180px] rounded-xl overflow-hidden shadow-xl"
            style={{
              background: "rgba(10,16,26,0.96)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              zIndex: 2000,
            }}
            role="menu"
          >
            {items.length === 0 ? (
              <p className="px-3 py-2 text-[11px] font-mono text-muted-foreground">
                No items available
              </p>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onSelect(item.id);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-mono text-left hover:bg-white/8 transition-colors truncate"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Unified desktop toolbar ───────────────────────────────────────────────────
interface UnifiedToolbarProps {
  // View
  onFitBounds: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  // Device
  isPlacing: boolean;
  placingType: DeviceType;
  onTogglePlacing: () => void;
  onSelectPlacingType: (t: DeviceType) => void;
  onCancelPlacing: () => void;
  // Route
  drawMode: boolean;
  drawRouteType: "backbone" | "distribution" | "drop";
  waypointCount: number;
  onToggleDrawMode: () => void;
  onRouteTypeChange: (t: "backbone" | "distribution" | "drop") => void;
  onFinishDraw: () => void;
  onCancelDraw: () => void;
  // History
  canUndo: boolean;
  historyCount: number;
  lastActionLabel: string;
  onUndo: () => void;
  // Simulation
  devices: Device[];
  routes: FiberRoute[];
  hasFault: boolean;
  onSimulateDeviceDown: (id: string) => void;
  onSimulateCableCut: (id: string) => void;
  onClearFaults: () => void;
}

function UnifiedToolbar({
  onFitBounds,
  onZoomIn,
  onZoomOut,
  isPlacing,
  placingType,
  onTogglePlacing,
  onSelectPlacingType,
  onCancelPlacing,
  drawMode,
  drawRouteType,
  waypointCount,
  onToggleDrawMode,
  onRouteTypeChange,
  onFinishDraw,
  onCancelDraw,
  canUndo,
  historyCount,
  lastActionLabel,
  onUndo,
  devices,
  routes,
  hasFault,
  onSimulateDeviceDown,
  onSimulateCableCut,
  onClearFaults,
}: UnifiedToolbarProps) {
  const activeMeta = DEVICE_TYPE_META.find((m) => m.type === placingType);
  const ROUTE_TYPES = [
    { key: "backbone" as const, label: "BB", color: "#00e5ff" },
    { key: "distribution" as const, label: "Dist", color: "#448aff" },
    { key: "drop" as const, label: "Drop", color: "#69ff47" },
  ];

  return (
    <motion.div
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="flex items-center gap-0.5 rounded-xl px-2 py-1.5 pointer-events-auto flex-wrap"
      style={{
        background: "rgba(10,16,26,0.82)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
      data-ocid="map.unified-toolbar"
    >
      {/* ── Group 1: View ── */}
      <ToolBtn
        onClick={onFitBounds}
        icon={<Locate className="w-3.5 h-3.5" aria-hidden="true" />}
        label="Fit"
        title="Fit bounds (reset view)"
        data-ocid="map.toolbar.fit_button"
      />
      <ToolBtn
        onClick={onZoomIn}
        icon={<ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />}
        title="Zoom in"
        data-ocid="map.toolbar.zoom-in_button"
      />
      <ToolBtn
        onClick={onZoomOut}
        icon={<ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />}
        title="Zoom out"
        data-ocid="map.toolbar.zoom-out_button"
      />

      <ToolDivider />

      {/* ── Group 2: Device ── */}
      <AnimatePresence mode="wait">
        {!isPlacing ? (
          <motion.div
            key="device-idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <ToolBtn
              onClick={onTogglePlacing}
              icon={<Plus className="w-3.5 h-3.5" aria-hidden="true" />}
              label="Add Device"
              title="Enter device placement mode"
              active={false}
              data-ocid="map.toolbar.add-device_button"
            />
          </motion.div>
        ) : (
          <motion.div
            key="device-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-0.5"
          >
            {/* Pulse indicator */}
            <motion.div
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-mono font-bold"
              style={{
                background: activeMeta
                  ? `${activeMeta.accent}15`
                  : "rgba(16,185,129,0.15)",
                border: `1px solid ${activeMeta?.accent ?? "#10b981"}40`,
                color: activeMeta?.accent ?? "#10b981",
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: activeMeta?.accent ?? "#10b981" }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
              {placingType}
            </motion.div>
            {/* Type pills */}
            {DEVICE_TYPE_META.map(({ type, label, accent }) => (
              <button
                key={type}
                type="button"
                onClick={() => onSelectPlacingType(type)}
                title={type}
                aria-label={`Select ${type}`}
                aria-pressed={placingType === type}
                data-ocid={`map.toolbar.device-type-${type.toLowerCase()}`}
                className="rounded-md px-1.5 py-1 text-[9px] font-mono font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
                style={
                  placingType === type
                    ? {
                        background: `${accent}20`,
                        border: `1px solid ${accent}60`,
                        color: accent,
                      }
                    : {
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.45)",
                      }
                }
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={onCancelPlacing}
              aria-label="Cancel placement"
              title="Cancel placement (Esc)"
              data-ocid="map.toolbar.cancel-device_button"
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-mono text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all duration-150 active:scale-95"
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ToolDivider />

      {/* ── Group 3: Route ── */}
      <AnimatePresence mode="wait">
        {!drawMode ? (
          <motion.div
            key="route-idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <ToolBtn
              onClick={onToggleDrawMode}
              icon={<PenLine className="w-3.5 h-3.5" aria-hidden="true" />}
              label="Draw Route"
              title="Draw fiber route"
              data-ocid="map.toolbar.draw-route_button"
            />
          </motion.div>
        ) : (
          <motion.div
            key="route-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-0.5"
          >
            {/* Drawing indicator */}
            <div
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-mono font-bold"
              style={{
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.25)",
                color: "#00e5ff",
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
              Drawing
            </div>
            {/* Route type pills */}
            {ROUTE_TYPES.map(({ key, label, color }) => (
              <button
                key={key}
                type="button"
                onClick={() => onRouteTypeChange(key)}
                aria-pressed={drawRouteType === key}
                data-ocid={`map.toolbar.route-type-${key}`}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-mono transition-all duration-150 hover:scale-105 active:scale-95"
                style={
                  drawRouteType === key
                    ? {
                        background: `${color}18`,
                        border: `1px solid ${color}50`,
                        color,
                      }
                    : {
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.45)",
                      }
                }
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                  aria-hidden="true"
                />
                {label}
              </button>
            ))}
            {/* Waypoint badge */}
            <div
              className="rounded-md px-2 py-1 text-[10px] font-mono"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {waypointCount}pt
            </div>
            <button
              type="button"
              onClick={onFinishDraw}
              disabled={waypointCount < 2}
              data-ocid="map.toolbar.finish-draw_button"
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-mono font-semibold transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
              style={{
                background: "rgba(52,211,153,0.15)",
                border: "1px solid rgba(52,211,153,0.45)",
                color: "#34d399",
              }}
            >
              Finish
            </button>
            <button
              type="button"
              onClick={onCancelDraw}
              aria-label="Cancel drawing"
              title="Cancel drawing (Esc)"
              data-ocid="map.toolbar.cancel-draw_button"
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-mono text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all duration-150 active:scale-95"
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ToolDivider />

      {/* ── Group 4: History ── */}
      <ToolBtn
        onClick={onUndo}
        disabled={!canUndo}
        icon={<RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />}
        label={lastActionLabel || "Undo"}
        title="Undo last action (Ctrl+Z)"
        badge={historyCount > 0 ? historyCount : undefined}
        data-ocid="map.toolbar.undo_button"
      />

      <ToolDivider />

      {/* ── Group 5: Simulation ── */}
      <SimulateDropdown
        label="Dev Down"
        icon={<AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />}
        items={devices
          .filter((d) => d.type !== "ONT")
          .map((d) => ({ id: d.id, name: `${d.type}: ${d.name}` }))}
        onSelect={onSimulateDeviceDown}
        disabled={devices.length === 0}
        data-ocid="map.toolbar.simulate-device-down_select"
      />
      <SimulateDropdown
        label="Cable Cut"
        icon={<Minus className="w-3.5 h-3.5" aria-hidden="true" />}
        items={routes.map((r) => ({ id: r.id, name: r.name }))}
        onSelect={onSimulateCableCut}
        disabled={routes.length === 0}
        data-ocid="map.toolbar.simulate-cable-cut_select"
      />
      {hasFault && (
        <ToolBtn
          onClick={onClearFaults}
          icon={<CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />}
          label="Clear"
          title="Clear all fault simulations"
          active
          activeColor="#34d399"
          data-ocid="map.toolbar.clear-faults_button"
        />
      )}
    </motion.div>
  );
}

// ── Mobile FAB ────────────────────────────────────────────────────────────────
function FabButton({
  onClick,
  icon,
  label,
  badge,
  primary,
  "data-ocid": ocid,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  primary?: boolean;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-ocid={ocid}
      className={`relative flex items-center justify-center rounded-full shadow-lg backdrop-blur-sm transition-all duration-150 active:scale-95
        ${
          primary
            ? "w-14 h-14 bg-primary text-primary-foreground border border-primary/80 hover:bg-primary/90 shadow-xl"
            : "w-12 h-12 bg-card/90 border border-border/60 text-foreground hover:bg-card hover:border-primary/50 hover:text-primary"
        }`}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-[10px] font-mono font-bold text-destructive-foreground border border-background">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}

// ── Mobile FAB menu ───────────────────────────────────────────────────────────
function MobileFabMenu({
  open,
  onClose,
  onAddDevice,
  onDrawRoute,
  onLayers,
  alertCount,
}: {
  open: boolean;
  onClose: () => void;
  onAddDevice: () => void;
  onDrawRoute: () => void;
  onLayers: () => void;
  alertCount: number;
}) {
  const items = [
    {
      label: "Add Device",
      icon: <Plus className="w-4 h-4" />,
      onClick: onAddDevice,
      color: "#10b981",
    },
    {
      label: "Draw Route",
      icon: <PenLine className="w-4 h-4" />,
      onClick: onDrawRoute,
      color: "#00e5ff",
    },
    {
      label: "Layers",
      icon: <Layers className="w-4 h-4" />,
      onClick: onLayers,
      color: "#a855f7",
    },
    {
      label: "Alerts",
      icon: <Bell className="w-4 h-4" />,
      onClick: onClose,
      color: "#f59e0b",
      badge: alertCount,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 bg-black/30"
            style={{ zIndex: 1200 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-20 right-4 flex flex-col-reverse gap-3 items-end"
            style={{ zIndex: 1300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            data-ocid="map.fab-menu"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.18 }}
              >
                <span
                  className="rounded-xl px-3 py-1.5 text-xs font-mono font-semibold shadow-md"
                  style={{
                    background: "rgba(10,16,26,0.88)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: item.color,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {item.label}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
                  style={{
                    background: `${item.color}20`,
                    border: `1.5px solid ${item.color}50`,
                    color: item.color,
                  }}
                  aria-label={item.label}
                  data-ocid={`map.fab-menu.${item.label.toLowerCase().replace(" ", "-")}_button`}
                >
                  {item.icon}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-[10px] font-mono font-bold text-destructive-foreground border border-background">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Mobile layer overlay ──────────────────────────────────────────────────────
function MobileLayerOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 1100 }}
          data-ocid="map.layer-overlay"
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-24 left-4 right-4 rounded-2xl bg-card/95 border border-border/60 backdrop-blur-md p-4 shadow-xl pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-semibold text-foreground">
                Map Layers
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close layer panel"
                data-ocid="map.layer-overlay.close_button"
                className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <LayerTogglePanel />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ── Mobile device drawer ──────────────────────────────────────────────────────
function MobileDeviceDrawer({
  open,
  onClose,
  deviceId,
}: {
  open: boolean;
  onClose: () => void;
  deviceId: string | null;
}) {
  const { devices } = useNetworkStore();
  const device = devices.find((d) => d.id === deviceId) ?? null;

  const signalColor =
    device?.status === "active"
      ? "text-emerald-400"
      : device?.status === "faulty"
        ? "text-red-400"
        : "text-amber-400";

  const lastSeen =
    device?.status === "active"
      ? "Just now"
      : device?.status === "faulty"
        ? "3 min ago"
        : "12 min ago";

  return (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent
        className="bg-card/95 backdrop-blur-md border-t border-border/50 max-h-[75dvh]"
        data-ocid="map.device-drawer.dialog"
      >
        {device ? (
          <>
            <DrawerHeader className="pb-2 border-b border-border/30">
              <div className="flex items-center gap-3">
                <DeviceIcon
                  type={device.type}
                  status={device.status}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <DrawerTitle className="font-mono text-sm text-left">
                    {device.name}
                  </DrawerTitle>
                  <p className="text-xs text-muted-foreground text-left">
                    {device.type}
                  </p>
                </div>
                <StatusBadge
                  status={device.status}
                  pulse={device.status !== "active"}
                />
              </div>
            </DrawerHeader>

            <div className="px-4 py-3 overflow-y-auto noc-scrollbar">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="rounded-xl bg-muted/20 border border-border/30 p-2.5 text-center">
                  <Signal
                    className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1"
                    aria-hidden="true"
                  />
                  <p className={`font-mono text-sm font-bold ${signalColor}`}>
                    {device.signalStrength ?? "—"}
                    <span className="text-[10px] ml-0.5">dBm</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Signal
                  </p>
                </div>
                <div className="rounded-xl bg-muted/20 border border-border/30 p-2.5 text-center">
                  <MapPin
                    className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[10px] font-bold text-foreground truncate">
                    {device.lat.toFixed(3)}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Lat
                  </p>
                </div>
                <div className="rounded-xl bg-muted/20 border border-border/30 p-2.5 text-center">
                  <MapPin
                    className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[10px] font-bold text-foreground truncate">
                    {device.lng.toFixed(3)}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Lng
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 px-0.5">
                <Clock
                  className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs text-muted-foreground font-mono">
                  Last seen: <span className="text-foreground">{lastSeen}</span>
                </span>
              </div>

              {device.uptime !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                      Uptime
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${signalColor}`}
                    >
                      {device.uptime.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${device.uptime > 95 ? "bg-emerald-400" : device.uptime > 50 ? "bg-amber-400" : "bg-red-400"}`}
                      style={{ width: `${device.uptime}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <DrawerFooter className="pt-0 pb-4 gap-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl py-3 px-2 bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 active:scale-95 transition-all duration-150 min-h-[56px]"
                  data-ocid="map.device-drawer.view-details_button"
                  onClick={onClose}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-[10px] font-mono leading-none">
                    View Details
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl py-3 px-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 active:scale-95 transition-all duration-150 min-h-[56px]"
                  data-ocid="map.device-drawer.resolve-alert_button"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-[10px] font-mono leading-none">
                    Resolve Alert
                  </span>
                </button>
                <button
                  type="button"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl py-3 px-2 bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 active:scale-95 transition-all duration-150 min-h-[56px]"
                  data-ocid="map.device-drawer.add-note_button"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] font-mono leading-none">
                    Add Note
                  </span>
                </button>
              </div>
            </DrawerFooter>
          </>
        ) : (
          <div className="p-6 text-center text-muted-foreground text-sm font-mono">
            No device selected
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

// ── Inline placement popup ────────────────────────────────────────────────────
function PlaceDevicePopup({
  lat,
  lng,
  initialType,
  deviceCount,
  onConfirm,
  onCancel,
}: {
  lat: number;
  lng: number;
  initialType: DeviceType;
  deviceCount: number;
  onConfirm: (device: Device) => void;
  onCancel: () => void;
}) {
  const meta =
    DEVICE_TYPE_META.find((m) => m.type === initialType) ?? DEVICE_TYPE_META[0];
  const [name, setName] = useState(meta.defaultName(deviceCount + 1));
  const [type, setType] = useState<DeviceType>(initialType);
  const [status, setStatus] = useState<DeviceStatus>("active");
  const [ports, setPorts] = useState(String(meta.defaultPorts));
  const [nameError, setNameError] = useState("");

  function handleConfirm() {
    if (!name.trim()) {
      setNameError("Name required");
      return;
    }
    onConfirm({
      id: `dev-${Date.now()}`,
      name: name.trim(),
      type,
      lat,
      lng,
      ports: Number(ports) || meta.defaultPorts,
      status,
      connectedTo: [],
      location: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 10000 }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.section
        className="relative w-full max-w-sm mx-4 rounded-2xl glass-elevated shadow-noc-elevated p-5"
        style={{ zIndex: 10001 }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="place-device-popup"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-mono font-bold"
              style={{
                background: `${meta.accent}22`,
                color: meta.accent,
                border: `1px solid ${meta.accent}60`,
              }}
            >
              {meta.label}
            </span>
            <h3 className="font-display text-sm font-semibold text-foreground">
              New {type}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
            aria-label="Cancel placement"
            data-ocid="place-device-popup.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-4">
          <MapPin className="w-3 h-3 text-primary" aria-hidden="true" />
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Device Name *
            </Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              className="font-mono text-sm bg-muted/20 border-border/50 h-8"
              autoFocus
              data-ocid="place-device-popup.name_input"
            />
            {nameError && (
              <p className="text-[10px] text-red-400 font-mono">{nameError}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Type
              </Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as DeviceType)}
              >
                <SelectTrigger
                  className="h-8 font-mono text-xs bg-muted/20 border-border/50"
                  data-ocid="place-device-popup.type_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 10002 }}>
                  {DEVICE_TYPE_META.map((m) => (
                    <SelectItem
                      key={m.type}
                      value={m.type}
                      className="font-mono text-xs"
                    >
                      {m.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Status
              </Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as DeviceStatus)}
              >
                <SelectTrigger
                  className="h-8 font-mono text-xs bg-muted/20 border-border/50"
                  data-ocid="place-device-popup.status_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ zIndex: 10002 }}>
                  {(["active", "warning", "faulty"] as DeviceStatus[]).map(
                    (s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="font-mono text-xs capitalize"
                      >
                        {s}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Ports
            </Label>
            <Input
              type="number"
              value={ports}
              onChange={(e) => setPorts(e.target.value)}
              className="font-mono text-sm bg-muted/20 border-border/50 h-8"
              min="1"
              max="128"
              data-ocid="place-device-popup.ports_input"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl py-2 text-xs font-mono bg-muted/20 border border-border/40 text-muted-foreground hover:bg-muted/30 transition-smooth"
            data-ocid="place-device-popup.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-mono bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30 transition-smooth"
            data-ocid="place-device-popup.confirm_button"
          >
            <Plus className="w-3 h-3" aria-hidden="true" />
            Place Device
          </button>
        </div>
      </motion.section>
    </div>
  );
}

// ── Map instruction toast ─────────────────────────────────────────────────────
function MapInstruction({
  message,
  color,
}: { message: string; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none"
    >
      <GlassCard className="px-4 py-2 shadow-lg">
        <p
          className="font-mono text-xs whitespace-nowrap"
          style={{ color: color ?? "oklch(var(--primary))" }}
        >
          {message}
        </p>
      </GlassCard>
    </motion.div>
  );
}

// ── Main unified map page ─────────────────────────────────────────────────────
export default function MapDashboard() {
  const {
    devices,
    routes,
    layerVisibility,
    selectedDeviceId,
    selectedRouteId,
    setSelectedDevice,
    setSelectedRoute,
    addRoute,
    addDevice,
    deleteDevice,
    updateDevice,
    undo,
    history,
  } = useNetworkStore();

  const resolveAlert = useNetworkStore((s) => s.resolveAlert);
  const isMobile = useIsMobile();

  const {
    allDevices: faultAllDevices,
    customerNodes,
    activeAlerts,
    stats,
    simulatedFault,
    deviceDisplayStatuses,
    routeDisplayStatuses,
    selection: faultSelection,
    setSelection: setFaultSelection,
    clearSelection: clearFaultSelection,
    highlightedNodeIds,
    highlightedRouteIds,
    selectedAffectedCount,
    layers: faultLayers,
    statusFilter,
    simulateDeviceDown,
    simulateCableCut,
    clearFaults,
    getCutPoint,
    getUpstreamFaultSource,
  } = useFaultVisualization();

  // ── Draw route state ────────────────────────────────────────────────────────
  const [drawMode, setDrawMode] = useState(false);
  const [drawWaypoints, setDrawWaypoints] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [drawRouteType, setDrawRouteType] = useState<
    "backbone" | "distribution" | "drop"
  >("distribution");

  // ── Place device state ──────────────────────────────────────────────────────
  const [isPlacing, setIsPlacing] = useState(false);
  const [placingType, setPlacingType] = useState<DeviceType>("ONT");
  const [pendingPlacement, setPendingPlacement] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // ── UI state ────────────────────────────────────────────────────────────────
  const [layerOverlayOpen, setLayerOverlayOpen] = useState(false);
  const [mobileFabOpen, setMobileFabOpen] = useState(false);
  const [mobileStatsOpen, setMobileStatsOpen] = useState(false);
  const [recenterTrigger, setRecenterTrigger] = useState(0);
  const [zoomTrigger, setZoomTrigger] = useState<{
    action: "in" | "out" | "fit" | null;
    seq: number;
  }>({ action: null, seq: 0 });

  const routeIdCounter = useRef(Date.now());
  const canUndo = history.length > 0;
  const historyCount = history.length;

  const hasFault =
    !!simulatedFault.deviceDownId || !!simulatedFault.cableCutRouteId;
  const cutPoint = simulatedFault.cableCutRouteId
    ? getCutPoint(simulatedFault.cableCutRouteId)
    : null;

  const affectedForZoom = new Set<string>();
  if (simulatedFault.deviceDownId) {
    deviceDisplayStatuses.forEach((status, id) => {
      if (status === "affected" || status === "faulty") affectedForZoom.add(id);
    });
  }

  const alertCount = devices.filter((d) => d.status === "faulty").length;
  const selectedDevice = devices.find((d) => d.id === selectedDeviceId) ?? null;
  const selectedRoute = routes.find((r) => r.id === selectedRouteId) ?? null;
  const desktopRightPanelOpen =
    !isMobile && (!!selectedDevice || !!selectedRoute);
  const mobileDrawerOpen = isMobile && !!selectedDeviceId;

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (history.length > 0) undo();
      }
      if (e.key === "Escape") {
        clearFaultSelection();
        if (isPlacing) handleExitPlacing();
        if (drawMode) {
          setDrawMode(false);
          setDrawWaypoints([]);
        }
        if (mobileFabOpen) setMobileFabOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    undo,
    history.length,
    clearFaultSelection,
    isPlacing,
    drawMode,
    mobileFabOpen,
  ]);

  // ── Draw handlers ───────────────────────────────────────────────────────────
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (isPlacing) {
        if (!pendingPlacement) setPendingPlacement({ lat, lng });
        return;
      }
      if (drawMode) {
        setDrawWaypoints((prev) => [...prev, { lat, lng }]);
      }
    },
    [isPlacing, drawMode, pendingPlacement],
  );

  const finishDraw = useCallback(() => {
    if (drawWaypoints.length < 2) {
      setDrawMode(false);
      setDrawWaypoints([]);
      return;
    }
    const newRoute: FiberRoute = {
      id: `route-${++routeIdCounter.current}`,
      name: `${drawRouteType.toUpperCase()}-${routeIdCounter.current}`,
      type: drawRouteType,
      waypoints: drawWaypoints,
      distanceKm: totalDistance(drawWaypoints),
      status: "active",
    };
    addRoute(newRoute);
    setDrawMode(false);
    setDrawWaypoints([]);
  }, [drawWaypoints, drawRouteType, addRoute]);

  const handleMapDblClick = useCallback(
    (lat: number, lng: number) => {
      if (!drawMode) return;
      setDrawWaypoints((prev) => {
        const updated = [...prev, { lat, lng }];
        if (updated.length >= 2) {
          const newRoute: FiberRoute = {
            id: `route-${++routeIdCounter.current}`,
            name: `${drawRouteType.toUpperCase()}-${routeIdCounter.current}`,
            type: drawRouteType,
            waypoints: updated,
            distanceKm: totalDistance(updated),
            status: "active",
          };
          addRoute(newRoute);
          setDrawMode(false);
          return [];
        }
        return updated;
      });
    },
    [drawMode, drawRouteType, addRoute],
  );

  const handleRightClick = useCallback((_lat: number, _lng: number) => {
    // right-click is handled by placement mode
  }, []);

  const handlePlacementConfirm = useCallback(
    (device: Device) => {
      addDevice(device);
      setPendingPlacement(null);
    },
    [addDevice],
  );

  const handlePlacementCancel = useCallback(() => {
    setPendingPlacement(null);
  }, []);

  const handleExitPlacing = useCallback(() => {
    setIsPlacing(false);
    setPendingPlacement(null);
  }, []);

  const handleClearSelection = useCallback(() => {
    clearFaultSelection();
    setSelectedDevice(null);
    setSelectedRoute(null);
  }, [clearFaultSelection, setSelectedDevice, setSelectedRoute]);

  // Filter fault devices (non-customer devices)
  const faultFilteredDevices = faultAllDevices.filter((d) => {
    if (d.type === "ONT") return false;
    const status = deviceDisplayStatuses.get(d.id) ?? "active";
    if (statusFilter === "all") return true;
    if (statusFilter === "down") return status === "faulty";
    if (statusFilter === "affected") return status === "affected";
    if (statusFilter === "active")
      return status === "active" || status === "warning";
    return true;
  });

  return (
    <div
      className="overflow-hidden"
      style={{ position: "absolute", inset: 0 }}
      data-ocid="network-map.page"
    >
      {/* ── Map fills full container ── */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={11}
        className="w-full h-full"
        zoomControl={false}
        doubleClickZoom={false}
        data-ocid="map.canvas_target"
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTR} />

        <MapEventHandler
          drawMode={drawMode}
          isPlacing={isPlacing && !pendingPlacement}
          onMapClick={handleMapClick}
          onMapDblClick={handleMapDblClick}
          onRightClick={handleRightClick}
          onClearSelection={handleClearSelection}
        />

        <RecenterController
          trigger={recenterTrigger}
          center={[51.505, -0.09]}
        />
        <ZoomController trigger={zoomTrigger} />

        {hasFault && (
          <AutoZoom
            affectedNodes={affectedForZoom}
            allDevices={faultAllDevices}
            cutPoint={cutPoint}
          />
        )}

        {/* Fault fiber routes */}
        {faultLayers.fiber &&
          routes.map((route) => {
            const displayStatus =
              routeDisplayStatuses.get(route.id) ?? "active";
            const isHighlighted =
              highlightedRouteIds.has(route.id) ||
              (hasFault && displayStatus !== "active");
            const isCut = route.id === simulatedFault.cableCutRouteId;

            if (statusFilter === "down" && displayStatus !== "faulty")
              return null;
            if (statusFilter === "affected" && displayStatus !== "warning")
              return null;
            if (statusFilter === "active" && displayStatus !== "active")
              return null;

            return (
              <FaultFiberPolyline
                key={`fault-${route.id}`}
                route={route}
                displayStatus={displayStatus}
                isHighlighted={isHighlighted}
                isCut={isCut}
                affectedCount={
                  isCut || isHighlighted ? stats.affectedCustomers : 0
                }
                onClick={() => {
                  setFaultSelection({ type: "route", id: route.id });
                  setSelectedRoute(route.id);
                }}
              />
            );
          })}

        {/* Standard fiber routes */}
        {!faultLayers.fiber &&
          routes.map((route) => {
            if (!layerVisibility[route.type]) return null;
            const color =
              route.status === "faulty"
                ? "#ff1744"
                : (ROUTE_COLORS[route.type] ?? "#fff");
            const positions = route.waypoints.map(
              (wp) => [wp.lat, wp.lng] as [number, number],
            );
            return (
              <Polyline
                key={route.id}
                positions={positions}
                pathOptions={{
                  color,
                  weight: route.type === "backbone" ? 4 : 2.5,
                  opacity: 0.9,
                  dashArray: route.status === "faulty" ? "8 4" : undefined,
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedRoute(route.id);
                    setSelectedDevice(null);
                  },
                }}
              />
            );
          })}

        {/* Draw preview */}
        {drawWaypoints.length >= 2 && (
          <Polyline
            positions={drawWaypoints.map(
              (wp) => [wp.lat, wp.lng] as [number, number],
            )}
            pathOptions={{
              color: ROUTE_COLORS[drawRouteType],
              weight: 2,
              opacity: 0.6,
              dashArray: "6 4",
            }}
          />
        )}

        {/* Fault device markers */}
        {faultLayers.devices &&
          faultFilteredDevices.map((device) => {
            const displayStatus =
              deviceDisplayStatuses.get(device.id) ?? "active";
            const isHighlighted =
              highlightedNodeIds.has(device.id) ||
              faultSelection.id === device.id;
            const affectedCount =
              faultSelection.id === device.id ? selectedAffectedCount : 0;

            return (
              <FaultDeviceMarker
                key={`fault-dev-${device.id}`}
                device={device}
                displayStatus={displayStatus}
                isHighlighted={isHighlighted}
                affectedCount={affectedCount}
                onClick={() => {
                  setFaultSelection({ type: "device", id: device.id });
                  const storeDevice = devices.find((d) => d.id === device.id);
                  if (storeDevice && !isPlacing) {
                    setSelectedDevice(device.id);
                    setSelectedRoute(null);
                  }
                }}
              />
            );
          })}

        {/* Standard device markers */}
        {!faultLayers.devices &&
          devices.map((device) => (
            <DeviceMarker
              key={device.id}
              device={device}
              isSelected={device.id === selectedDeviceId}
              onSelect={() => {
                if (!isPlacing) {
                  setSelectedDevice(device.id);
                  setSelectedRoute(null);
                }
              }}
              onPositionChange={(lat, lng) =>
                updateDevice(device.id, { lat, lng })
              }
            />
          ))}

        {/* Customer markers */}
        {faultLayers.customers &&
          customerNodes.map((customer) => {
            const rawStatus = deviceDisplayStatuses.get(customer.id);
            const displayStatus: "active" | "affected" | "faulty" =
              rawStatus === "faulty"
                ? "faulty"
                : rawStatus === "affected"
                  ? "affected"
                  : "active";

            if (statusFilter === "down" && displayStatus !== "faulty")
              return null;
            if (statusFilter === "affected" && displayStatus !== "affected")
              return null;
            if (statusFilter === "active" && displayStatus !== "active")
              return null;

            const isHighlighted = highlightedNodeIds.has(customer.id);
            const upstreamFaultSource =
              displayStatus !== "active"
                ? getUpstreamFaultSource(customer.id)
                : null;

            return (
              <CustomerMarker
                key={customer.id}
                customer={customer}
                displayStatus={displayStatus}
                isHighlighted={isHighlighted}
                upstreamFaultSource={upstreamFaultSource}
                onClick={() =>
                  setFaultSelection({ type: "customer", id: customer.id })
                }
              />
            );
          })}
      </MapContainer>

      {/* ════ OVERLAY PANELS (outside MapContainer) ════════════════════════════ */}

      {/* Desktop: Unified toolbar — top-left */}
      {!isMobile && (
        <div
          className="absolute top-4 left-4 pointer-events-auto"
          style={{ zIndex: 1000 }}
          data-ocid="map.toolbar-wrapper"
        >
          <UnifiedToolbar
            onFitBounds={() =>
              setZoomTrigger({ action: "fit", seq: Date.now() })
            }
            onZoomIn={() => setZoomTrigger({ action: "in", seq: Date.now() })}
            onZoomOut={() => setZoomTrigger({ action: "out", seq: Date.now() })}
            isPlacing={isPlacing}
            placingType={placingType}
            onTogglePlacing={() => {
              setIsPlacing(true);
              if (drawMode) {
                setDrawMode(false);
                setDrawWaypoints([]);
              }
            }}
            onSelectPlacingType={(t) => setPlacingType(t)}
            onCancelPlacing={handleExitPlacing}
            drawMode={drawMode}
            drawRouteType={drawRouteType}
            waypointCount={drawWaypoints.length}
            onToggleDrawMode={() => {
              setDrawMode((v) => !v);
              setDrawWaypoints([]);
              if (isPlacing) handleExitPlacing();
            }}
            onRouteTypeChange={setDrawRouteType}
            onFinishDraw={finishDraw}
            onCancelDraw={() => {
              setDrawMode(false);
              setDrawWaypoints([]);
            }}
            canUndo={canUndo}
            historyCount={historyCount}
            lastActionLabel={historyCount > 0 ? "Undo" : ""}
            onUndo={() => canUndo && undo()}
            devices={devices}
            routes={routes}
            hasFault={hasFault}
            onSimulateDeviceDown={simulateDeviceDown}
            onSimulateCableCut={simulateCableCut}
            onClearFaults={clearFaults}
          />
        </div>
      )}

      {/* Desktop: Layer toggle panel — top-right */}
      {!isMobile && (
        <div
          className="absolute top-4 right-4 pointer-events-auto"
          style={{ zIndex: 1000 }}
          data-ocid="map.layer-panel"
        >
          <LayerTogglePanel />
        </div>
      )}

      {/* Desktop: Fault stats panel — right side (below layer panel), only when fault active */}
      {!isMobile && hasFault && (
        <div
          className="absolute top-20 right-4 pointer-events-auto"
          style={{ zIndex: 999 }}
          data-ocid="map.fault-stats-wrapper"
        >
          <FaultStatsPanel
            stats={stats}
            alerts={activeAlerts}
            onResolveAlert={resolveAlert}
            isMobile={false}
          />
        </div>
      )}

      {/* Map instructions — bottom center */}
      <div
        className="absolute bottom-8 pointer-events-none flex flex-col items-center gap-2"
        style={{
          zIndex: 1000,
          left: "50%",
          transform: "translateX(-50%)",
          bottom: isMobile ? "80px" : "24px",
        }}
      >
        <AnimatePresence mode="wait">
          {drawMode && (
            <MapInstruction
              key="draw-hint"
              message={
                drawWaypoints.length === 0
                  ? "Click to add waypoints · Double-click or Finish to complete"
                  : `${drawWaypoints.length} waypoints · ${totalDistance(drawWaypoints).toFixed(2)} km · Double-click or Finish`
              }
              color="#00e5ff"
            />
          )}
          {isPlacing && !pendingPlacement && (
            <MapInstruction
              key="place-hint"
              message={`Click anywhere on the map to place a ${placingType}`}
              color={
                DEVICE_TYPE_META.find((m) => m.type === placingType)?.accent ??
                "#10b981"
              }
            />
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Right panel — device detail or route edit */}
      {desktopRightPanelOpen && (
        <motion.div
          initial={{ x: 360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 360, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="absolute right-0 top-0 h-full w-[360px] border-l border-border/40 bg-card/95 backdrop-blur-sm overflow-y-auto noc-scrollbar pointer-events-auto"
          style={{ zIndex: 1000 }}
          data-ocid="map.right-panel"
        >
          {selectedDevice && (
            <DeviceDetailPanel
              device={selectedDevice}
              onClose={() => setSelectedDevice(null)}
              onDelete={() => {
                deleteDevice(selectedDevice.id);
                setSelectedDevice(null);
              }}
            />
          )}
          {selectedRoute && !selectedDevice && (
            <RouteEditPanel
              route={selectedRoute}
              onClose={() => setSelectedRoute(null)}
            />
          )}
        </motion.div>
      )}

      {/* Mobile: Primary FAB (bottom-right) + sub-menu */}
      {isMobile && (
        <div
          className="absolute right-4 flex flex-col gap-3 items-end pointer-events-auto"
          style={{ zIndex: 1200, bottom: "80px" }}
          data-ocid="map.fab-stack"
        >
          <MobileFabMenu
            open={mobileFabOpen}
            onClose={() => setMobileFabOpen(false)}
            onAddDevice={() => {
              setIsPlacing(true);
              if (drawMode) {
                setDrawMode(false);
                setDrawWaypoints([]);
              }
            }}
            onDrawRoute={() => {
              setDrawMode(true);
              if (isPlacing) handleExitPlacing();
            }}
            onLayers={() => setLayerOverlayOpen(true)}
            alertCount={alertCount}
          />
          <FabButton
            onClick={() => setMobileFabOpen((v) => !v)}
            icon={
              mobileFabOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Plus className="w-6 h-6" />
              )
            }
            label="Open actions menu"
            primary
            data-ocid="map.fab.primary_button"
          />
        </div>
      )}

      {/* Mobile: Stats FAB (bottom-left) */}
      {isMobile && (
        <div
          className="absolute left-4 flex flex-col gap-3 items-start pointer-events-auto"
          style={{ zIndex: 1100, bottom: "80px" }}
          data-ocid="map.fab-stats-stack"
        >
          <FabButton
            onClick={() => setRecenterTrigger((n) => n + 1)}
            icon={<Locate className="w-5 h-5" />}
            label="Re-center map"
            data-ocid="map.fab.recenter_button"
          />
          {hasFault && (
            <FabButton
              onClick={() => setMobileStatsOpen(true)}
              icon={<BarChart2 className="w-5 h-5" />}
              label="View fault statistics"
              badge={stats.affectedCustomers}
              data-ocid="map.fab.stats_button"
            />
          )}
        </div>
      )}

      {/* Mobile: Stats bottom sheet */}
      {isMobile && (
        <Drawer
          open={mobileStatsOpen}
          onOpenChange={(v) => !v && setMobileStatsOpen(false)}
        >
          <DrawerContent
            className="bg-card/95 backdrop-blur-md border-t border-border/50 max-h-[80dvh]"
            data-ocid="map.stats-drawer.dialog"
          >
            <DrawerHeader className="pb-2 border-b border-border/30">
              <DrawerTitle className="font-mono text-sm text-left">
                Fault Statistics
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto noc-scrollbar p-4">
              <FaultStatsPanel
                stats={stats}
                alerts={activeAlerts}
                onResolveAlert={resolveAlert}
                isMobile
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {/* Mobile: Layer overlay */}
      {isMobile && (
        <MobileLayerOverlay
          open={layerOverlayOpen}
          onClose={() => setLayerOverlayOpen(false)}
        />
      )}

      {/* Mobile: Device bottom drawer */}
      {isMobile && (
        <MobileDeviceDrawer
          open={mobileDrawerOpen}
          onClose={() => setSelectedDevice(null)}
          deviceId={selectedDeviceId}
        />
      )}

      {/* Placement popup */}
      <AnimatePresence>
        {pendingPlacement && (
          <PlaceDevicePopup
            key="place-popup"
            lat={pendingPlacement.lat}
            lng={pendingPlacement.lng}
            initialType={placingType}
            deviceCount={devices.length}
            onConfirm={handlePlacementConfirm}
            onCancel={handlePlacementCancel}
          />
        )}
      </AnimatePresence>

      <style>{`
        .fault-route-anim {
          animation: faultBlink 1.2s ease-in-out infinite;
        }
        @keyframes faultBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .leaflet-container { background: #e8e0d8; }
        .leaflet-map-pane { z-index: 400 !important; }
        .leaflet-tile-pane { z-index: 200 !important; }
        .leaflet-overlay-pane { z-index: 400 !important; }
        .leaflet-shadow-pane { z-index: 500 !important; }
        .leaflet-marker-pane { z-index: 600 !important; }
        .leaflet-tooltip-pane { z-index: 650 !important; }
        .leaflet-popup-pane { z-index: 700 !important; }
        .leaflet-top, .leaflet-bottom { z-index: 800 !important; }
      `}</style>
    </div>
  );
}
