import "leaflet/dist/leaflet.css";
import { DeviceIcon } from "@/components/DeviceIcon";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { AddDeviceDialog } from "@/components/map/AddDeviceDialog";
import { DeviceDetailPanel } from "@/components/map/DeviceDetailPanel";
import { DeviceMarker } from "@/components/map/DeviceMarker";
import { DrawToolbar } from "@/components/map/DrawToolbar";
import { LayerTogglePanel } from "@/components/map/LayerTogglePanel";
import {
  DEVICE_TYPE_META,
  PlaceDeviceToolbar,
} from "@/components/map/PlaceDeviceToolbar";
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
import { useNetworkStore } from "@/store/networkStore";
import type {
  Device,
  DeviceStatus,
  DeviceType,
  FiberRoute,
} from "@/types/network";
import L from "leaflet";
import {
  Bell,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Layers,
  Locate,
  MapPin,
  Plus,
  Signal,
  X,
} from "lucide-react";
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

// ── Map event handler (inside MapContainer) ───────────────────────────────────
interface MapEventHandlerProps {
  drawMode: boolean;
  isPlacing: boolean;
  onMapClick: (lat: number, lng: number) => void;
  onMapDblClick: (lat: number, lng: number) => void;
  onRightClick: (lat: number, lng: number) => void;
}

function MapEventHandler({
  drawMode,
  isPlacing,
  onMapClick,
  onMapDblClick,
  onRightClick,
}: MapEventHandlerProps) {
  const map = useMap();

  useEffect(() => {
    const cursor = drawMode || isPlacing ? "crosshair" : "";
    map.getContainer().style.cursor = cursor;
  }, [drawMode, isPlacing, map]);

  useMapEvents({
    click(e) {
      if (drawMode) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      } else if (isPlacing) {
        onMapClick(e.latlng.lat, e.latlng.lng);
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
interface RecenterControllerProps {
  trigger: number;
  center: [number, number];
}

function RecenterController({ trigger, center }: RecenterControllerProps) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) {
      map.flyTo(center, 13, { duration: 1.2 });
    }
  }, [trigger, map, center]);
  return null;
}

// ── Distance helpers ──────────────────────────────────────────────────────────
function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
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

function totalDistance(pts: { lat: number; lng: number }[]): number {
  let d = 0;
  for (let i = 1; i < pts.length; i++) {
    d += haversineKm(pts[i - 1].lat, pts[i - 1].lng, pts[i].lat, pts[i].lng);
  }
  return Math.round(d * 100) / 100;
}

// ── Mobile FAB button ─────────────────────────────────────────────────────────
interface FabButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  "data-ocid"?: string;
}

function FabButton({
  onClick,
  icon,
  label,
  badge,
  "data-ocid": ocid,
}: FabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-ocid={ocid}
      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-card/90 border border-border/60 shadow-lg backdrop-blur-sm text-foreground hover:bg-card hover:border-primary/50 hover:text-primary active:scale-95 transition-all duration-150"
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

// ── Mobile layer overlay ──────────────────────────────────────────────────────
interface MobileLayerOverlayProps {
  open: boolean;
  onClose: () => void;
}

function MobileLayerOverlay({ open, onClose }: MobileLayerOverlayProps) {
  if (!open) return null;
  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 1100 }}
      data-ocid="map.layer-overlay"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />
      <div className="absolute bottom-24 left-4 right-4 rounded-2xl bg-card/95 border border-border/60 backdrop-blur-md p-4 shadow-xl pointer-events-auto">
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
      </div>
    </div>
  );
}

// ── Mobile device drawer ──────────────────────────────────────────────────────
interface MobileDeviceDrawerProps {
  open: boolean;
  onClose: () => void;
  deviceId: string | null;
}

function MobileDeviceDrawer({
  open,
  onClose,
  deviceId,
}: MobileDeviceDrawerProps) {
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
                  <Signal className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                  <p className={`font-mono text-sm font-bold ${signalColor}`}>
                    {device.signalStrength ?? "—"}
                    <span className="text-[10px] ml-0.5">dBm</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Signal
                  </p>
                </div>
                <div className="rounded-xl bg-muted/20 border border-border/30 p-2.5 text-center">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                  <p className="font-mono text-[10px] font-bold text-foreground truncate">
                    {device.lat.toFixed(3)}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Lat
                  </p>
                </div>
                <div className="rounded-xl bg-muted/20 border border-border/30 p-2.5 text-center">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-1" />
                  <p className="font-mono text-[10px] font-bold text-foreground truncate">
                    {device.lng.toFixed(3)}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Lng
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 px-0.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
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
                      className={`h-full rounded-full transition-all duration-700 ${
                        device.uptime > 95
                          ? "bg-emerald-400"
                          : device.uptime > 50
                            ? "bg-amber-400"
                            : "bg-red-400"
                      }`}
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

// ── Inline placement form (shown after clicking map in place mode) ─────────────
interface PlaceDevicePopupProps {
  lat: number;
  lng: number;
  initialType: DeviceType;
  deviceCount: number;
  onConfirm: (device: Device) => void;
  onCancel: () => void;
}

function PlaceDevicePopup({
  lat,
  lng,
  initialType,
  deviceCount,
  onConfirm,
  onCancel,
}: PlaceDevicePopupProps) {
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <section
        className="relative w-full max-w-sm mx-4 rounded-2xl glass-elevated shadow-noc-elevated p-5"
        style={{ zIndex: 10001 }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="place-device-popup"
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
          <MapPin className="w-3 h-3 text-primary" />
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>

        <div className="space-y-3">
          {/* Name */}
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

          {/* Type + Status */}
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

          {/* Ports */}
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
            <Plus className="w-3 h-3" />
            Place Device
          </button>
        </div>
      </section>
    </div>
  );
}

// ── Main MapDashboard component ───────────────────────────────────────────────
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
  } = useNetworkStore();

  const isMobile = useIsMobile();

  // ── Draw route state ──────────────────────────────────────────────────────
  const [drawMode, setDrawMode] = useState(false);
  const [drawWaypoints, setDrawWaypoints] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [drawRouteType, setDrawRouteType] = useState<
    "backbone" | "distribution" | "drop"
  >("distribution");

  // ── Place device state ────────────────────────────────────────────────────
  const [isPlacing, setIsPlacing] = useState(false);
  const [placingType, setPlacingType] = useState<DeviceType>("ONT");
  const [pendingPlacement, setPendingPlacement] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // ── Right-click / context menu ────────────────────────────────────────────
  const [contextMenu, setContextMenu] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [addDeviceCoords, setAddDeviceCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [layerOverlayOpen, setLayerOverlayOpen] = useState(false);
  const [recenterTrigger, setRecenterTrigger] = useState(0);

  const mobileDrawerOpen = isMobile && !!selectedDeviceId;
  const alertCount = devices.filter((d) => d.status === "faulty").length;
  const routeIdCounter = useRef(Date.now());

  // ── Draw handlers ─────────────────────────────────────────────────────────
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (isPlacing) {
        // Only open popup if not already showing one
        if (!pendingPlacement) {
          setPendingPlacement({ lat, lng });
        }
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

  const handleRightClick = useCallback((lat: number, lng: number) => {
    setContextMenu({ lat, lng });
    setAddDeviceCoords({ lat, lng });
  }, []);

  // ── Placement handlers ────────────────────────────────────────────────────
  const handlePlacementConfirm = useCallback(
    (device: Device) => {
      addDevice(device);
      setPendingPlacement(null);
      // Keep placement mode active so user can place more
    },
    [addDevice],
  );

  const handlePlacementCancel = useCallback(() => {
    setPendingPlacement(null);
    // Keep placement mode active, just remove the pending popup
  }, []);

  const handleExitPlacing = useCallback(() => {
    setIsPlacing(false);
    setPendingPlacement(null);
  }, []);

  const selectedDevice = devices.find((d) => d.id === selectedDeviceId) ?? null;
  const selectedRoute = routes.find((r) => r.id === selectedRouteId) ?? null;
  const desktopRightPanelOpen =
    !isMobile && (!!selectedDevice || !!selectedRoute);

  return (
    <div
      className="relative flex w-full overflow-hidden"
      style={{ height: "100%" }}
    >
      {/* ── Map area ───────────────────────────────────────────────────────── */}
      <div
        className={`relative flex-1 transition-all duration-300 ${desktopRightPanelOpen ? "mr-[360px]" : ""}`}
      >
        {/* Leaflet MapContainer */}
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
          doubleClickZoom={false}
          data-ocid="map.canvas_target"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <MapEventHandler
            drawMode={drawMode}
            isPlacing={isPlacing && !pendingPlacement}
            onMapClick={handleMapClick}
            onMapDblClick={handleMapDblClick}
            onRightClick={handleRightClick}
          />

          <RecenterController
            trigger={recenterTrigger}
            center={[40.7128, -74.006]}
          />

          {/* Fiber routes */}
          {routes.map((route) => {
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
                  className:
                    route.status === "faulty" ? "fault-route-anim" : undefined,
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

          {/* Draw preview line */}
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

          {/* Device markers */}
          {devices.map((device) => (
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
        </MapContainer>

        {/* ═══════════════════════════════════════════════════════════════════
            OVERLAY PANELS — all outside MapContainer, z-index >= 1000
            CRITICAL: Never nest these inside MapContainer, or Leaflet will
            capture pointer events before they reach our UI.
        ════════════════════════════════════════════════════════════════════ */}

        {/* Layer toggle panel — desktop only, top-left */}
        {!isMobile && (
          <div
            className="absolute left-4 top-4 pointer-events-auto"
            style={{ zIndex: 1000 }}
            data-ocid="map.layer-panel"
          >
            <LayerTogglePanel />
          </div>
        )}

        {/* Draw toolbar — centered top */}
        <div
          className="absolute top-4 pointer-events-auto"
          style={{
            zIndex: 1000,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          data-ocid="map.draw-toolbar-wrapper"
        >
          <DrawToolbar
            drawMode={drawMode}
            routeType={drawRouteType}
            waypointCount={drawWaypoints.length}
            onToggleDrawMode={() => {
              setDrawMode((v) => !v);
              setDrawWaypoints([]);
              // Exit place mode if entering draw mode
              if (isPlacing) handleExitPlacing();
            }}
            onRouteTypeChange={setDrawRouteType}
            onFinish={finishDraw}
            onCancel={() => {
              setDrawMode(false);
              setDrawWaypoints([]);
            }}
          />
        </div>

        {/* Place Device toolbar — right of draw toolbar, or below on mobile */}
        <div
          className={`absolute pointer-events-auto ${
            isMobile ? "top-20 right-4" : "top-4 right-4"
          }`}
          style={{ zIndex: 1000 }}
          data-ocid="map.place-toolbar-wrapper"
        >
          <PlaceDeviceToolbar
            isPlacing={isPlacing}
            selectedType={placingType}
            onTogglePlacing={() => {
              setIsPlacing(true);
              // Exit draw mode if entering place mode
              if (drawMode) {
                setDrawMode(false);
                setDrawWaypoints([]);
              }
            }}
            onSelectType={(t) => setPlacingType(t)}
            onCancel={handleExitPlacing}
          />
        </div>

        {/* Draw instruction hint */}
        {drawMode && (
          <div
            className="absolute bottom-6 pointer-events-none"
            style={{ zIndex: 1000, left: "50%", transform: "translateX(-50%)" }}
          >
            <GlassCard className="px-4 py-2">
              <p className="font-mono text-xs text-primary whitespace-nowrap">
                {drawWaypoints.length === 0
                  ? "Click to place waypoints · Double-click or Finish to complete"
                  : `${drawWaypoints.length} waypoints · ${totalDistance(drawWaypoints).toFixed(2)} km · Double-click or Finish`}
              </p>
            </GlassCard>
          </div>
        )}

        {/* Placement hint */}
        {isPlacing && !pendingPlacement && (
          <div
            className="absolute bottom-6 pointer-events-none"
            style={{ zIndex: 1000, left: "50%", transform: "translateX(-50%)" }}
          >
            <GlassCard className="px-4 py-2">
              <p
                className="font-mono text-xs whitespace-nowrap"
                style={{ color: "#10b981" }}
              >
                Click on the map to place a {placingType}
              </p>
            </GlassCard>
          </div>
        )}

        {/* Dismiss overlay for context menu */}
        {contextMenu && (
          <div
            className="absolute inset-0"
            style={{ zIndex: 1050 }}
            onClick={() => setContextMenu(null)}
            onKeyDown={(e) => e.key === "Escape" && setContextMenu(null)}
            role="presentation"
          />
        )}

        {/* Mobile FABs */}
        {isMobile && (
          <div
            className="absolute right-4 bottom-4 flex flex-col gap-3 pointer-events-auto"
            style={{ zIndex: 1000 }}
            data-ocid="map.fab-stack"
          >
            <FabButton
              onClick={() => setLayerOverlayOpen((v) => !v)}
              icon={<Layers className="w-5 h-5" />}
              label="Toggle layer selector"
              data-ocid="map.fab.layers_toggle"
            />
            <FabButton
              onClick={() => setRecenterTrigger((n) => n + 1)}
              icon={<Locate className="w-5 h-5" />}
              label="Re-center map"
              data-ocid="map.fab.recenter_button"
            />
            <FabButton
              onClick={() => {}}
              icon={<Bell className="w-5 h-5" />}
              label="View alerts"
              badge={alertCount}
              data-ocid="map.fab.alerts_button"
            />
          </div>
        )}

        {/* Mobile layer overlay */}
        {isMobile && (
          <MobileLayerOverlay
            open={layerOverlayOpen}
            onClose={() => setLayerOverlayOpen(false)}
          />
        )}
      </div>

      {/* ── Desktop right panel ─────────────────────────────────────────────── */}
      {desktopRightPanelOpen && (
        <div
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
        </div>
      )}

      {/* ── Mobile device bottom drawer ──────────────────────────────────────── */}
      {isMobile && (
        <MobileDeviceDrawer
          open={mobileDrawerOpen}
          onClose={() => setSelectedDevice(null)}
          deviceId={selectedDeviceId}
        />
      )}

      {/* ── Right-click Add Device Dialog — portal, always on top ──────────── */}
      {addDeviceCoords && (
        <AddDeviceDialog
          lat={addDeviceCoords.lat}
          lng={addDeviceCoords.lng}
          onClose={() => {
            setAddDeviceCoords(null);
            setContextMenu(null);
          }}
        />
      )}

      {/* ── Placement popup — rendered as portal above everything ──────────── */}
      {pendingPlacement && (
        <PlaceDevicePopup
          lat={pendingPlacement.lat}
          lng={pendingPlacement.lng}
          initialType={placingType}
          deviceCount={devices.length}
          onConfirm={handlePlacementConfirm}
          onCancel={handlePlacementCancel}
        />
      )}

      <style>{`
        .fault-route-anim {
          animation: faultBlink 1.2s ease-in-out infinite;
        }
        @keyframes faultBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .leaflet-container {
          background: #e8e0d8;
        }
        /* Leaflet pane z-indexes must stay below our overlays */
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
