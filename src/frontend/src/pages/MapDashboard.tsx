import "leaflet/dist/leaflet.css";
import { GlassCard } from "@/components/GlassCard";
import { AddDeviceDialog } from "@/components/map/AddDeviceDialog";
import { DeviceDetailPanel } from "@/components/map/DeviceDetailPanel";
import { DeviceMarker } from "@/components/map/DeviceMarker";
import { DrawToolbar } from "@/components/map/DrawToolbar";
import { LayerTogglePanel } from "@/components/map/LayerTogglePanel";
import { RouteEditPanel } from "@/components/map/RouteEditPanel";
import { useNetworkStore } from "@/store/networkStore";
import type { DeviceStatus, DeviceType, FiberRoute } from "@/types/network";
import L from "leaflet";
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

interface MapEventHandlerProps {
  drawMode: boolean;
  onMapClick: (lat: number, lng: number) => void;
  onMapDblClick: (lat: number, lng: number) => void;
  onRightClick: (lat: number, lng: number) => void;
}

function MapEventHandler({
  drawMode,
  onMapClick,
  onMapDblClick,
  onRightClick,
}: MapEventHandlerProps) {
  const map = useMap();

  useEffect(() => {
    map.getContainer().style.cursor = drawMode ? "crosshair" : "";
  }, [drawMode, map]);

  useMapEvents({
    click(e) {
      if (drawMode) {
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
    deleteDevice,
    updateDevice,
  } = useNetworkStore();

  const [drawMode, setDrawMode] = useState(false);
  const [drawWaypoints, setDrawWaypoints] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [drawRouteType, setDrawRouteType] = useState<
    "backbone" | "distribution" | "drop"
  >("distribution");
  const [contextMenu, setContextMenu] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [addDeviceCoords, setAddDeviceCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const routeIdCounter = useRef(Date.now());

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setDrawWaypoints((prev) => [...prev, { lat, lng }]);
  }, []);

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
    [drawRouteType, addRoute],
  );

  const handleRightClick = useCallback((lat: number, lng: number) => {
    setContextMenu({ lat, lng });
    setAddDeviceCoords({ lat, lng });
  }, []);

  const selectedDevice = devices.find((d) => d.id === selectedDeviceId) ?? null;
  const selectedRoute = routes.find((r) => r.id === selectedRouteId) ?? null;

  const rightPanelOpen = !!selectedDevice || !!selectedRoute;

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      {/* Map container */}
      <div
        className={`relative flex-1 transition-all duration-300 ${rightPanelOpen ? "mr-[360px]" : ""}`}
      >
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={13}
          className="h-full w-full"
          zoomControl={false}
          doubleClickZoom={false}
          data-ocid="map-container"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <MapEventHandler
            drawMode={drawMode}
            onMapClick={handleMapClick}
            onMapDblClick={handleMapDblClick}
            onRightClick={handleRightClick}
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
                setSelectedDevice(device.id);
                setSelectedRoute(null);
              }}
              onPositionChange={(lat, lng) =>
                updateDevice(device.id, { lat, lng })
              }
            />
          ))}
        </MapContainer>

        {/* Layer toggle */}
        <div className="absolute left-4 top-4 z-[1000]">
          <LayerTogglePanel />
        </div>

        {/* Draw toolbar */}
        <div className="absolute left-1/2 top-4 z-[1000] -translate-x-1/2">
          <DrawToolbar
            drawMode={drawMode}
            routeType={drawRouteType}
            waypointCount={drawWaypoints.length}
            onToggleDrawMode={() => {
              setDrawMode((v) => !v);
              setDrawWaypoints([]);
            }}
            onRouteTypeChange={setDrawRouteType}
            onFinish={finishDraw}
            onCancel={() => {
              setDrawMode(false);
              setDrawWaypoints([]);
            }}
          />
        </div>

        {/* Draw instruction */}
        {drawMode && (
          <div className="absolute bottom-6 left-1/2 z-[1000] -translate-x-1/2">
            <GlassCard className="px-4 py-2">
              <p className="font-mono text-xs text-primary">
                {drawWaypoints.length === 0
                  ? "Click to place waypoints · Double-click or Finish to complete"
                  : `${drawWaypoints.length} waypoints · ${totalDistance(drawWaypoints).toFixed(2)} km · Double-click or Finish`}
              </p>
            </GlassCard>
          </div>
        )}

        {/* Dismiss overlay for context menu */}
        {contextMenu && (
          <div
            className="absolute inset-0 z-[999]"
            onClick={() => setContextMenu(null)}
            onKeyDown={(e) => e.key === "Escape" && setContextMenu(null)}
            role="presentation"
          />
        )}
      </div>

      {/* Right panel */}
      {rightPanelOpen && (
        <div className="absolute right-0 top-0 h-full w-[360px] z-[1000] border-l border-border/40 bg-card/95 backdrop-blur-sm overflow-y-auto noc-scrollbar">
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

      {/* Add Device Dialog */}
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

      <style>{`
        .fault-route-anim {
          animation: faultBlink 1.2s ease-in-out infinite;
        }
        @keyframes faultBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .leaflet-container {
          background: #0a0c14;
        }
      `}</style>
    </div>
  );
}
