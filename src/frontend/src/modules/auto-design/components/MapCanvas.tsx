/**
 * MapCanvas — Core full-screen map component for Network Auto Design.
 *
 * Handles:
 *  1. React Leaflet map with OSM / CARTO Voyager tiles
 *  2. Custom polygon drawing via useMapEvents (no leaflet-draw)
 *  3. Rendering existing polygon with vertex editing
 *  4. Rendering network result nodes + edges
 *  5. Node click / hover interactions
 *  6. Sequential polyline animation on new result
 *  7. fitBounds when result changes
 */

import "leaflet/dist/leaflet.css";

import * as L from "leaflet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useAutoDesignStore } from "../store";
import type {
  NetworkEdge,
  NetworkNode,
  NodeType,
  PolygonGeoJSON,
} from "../types";

// ─── Leaflet icon fix ────────────────────────────────────────────────────────

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

// ─── Edge color map ──────────────────────────────────────────────────────────

const EDGE_COLORS: Record<string, string> = {
  FIBER: "#22c55e",
  COAXIAL: "#eab308",
  LAN: "#3b82f6",
};

// ─── Node icon factory ───────────────────────────────────────────────────────

function createNodeIcon(
  type: NodeType,
  isHovered: boolean,
  isSelected: boolean,
): L.DivIcon {
  const glow = isHovered || isSelected;

  if (type === "OLT") {
    const glowStyle = glow
      ? "filter: drop-shadow(0 0 8px #ef4444); transform: scale(1.15);"
      : "";
    return L.divIcon({
      className: "",
      iconAnchor: [16, 16],
      iconSize: [32, 32],
      html: `
        <div style="width:32px;height:32px;${glowStyle}transition:all 0.2s;">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <circle cx="16" cy="16" r="14" fill="${isSelected ? "#dc2626" : "#ef4444"}" stroke="#fff" stroke-width="2"/>
            ${isSelected ? '<circle cx="16" cy="16" r="14" fill="none" stroke="#fca5a5" stroke-width="3" opacity="0.6"/>' : ""}
            <text x="16" y="21" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">T</text>
          </svg>
        </div>`,
    });
  }

  if (type === "SPLITTER") {
    const glowStyle = glow
      ? "filter: drop-shadow(0 0 8px #22c55e); transform: scale(1.15);"
      : "";
    return L.divIcon({
      className: "",
      iconAnchor: [14, 14],
      iconSize: [28, 28],
      html: `
        <div style="width:28px;height:28px;${glowStyle}transition:all 0.2s;">
          <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
            <polygon points="14,2 26,14 14,26 2,14" fill="${isSelected ? "#16a34a" : "#22c55e"}" stroke="#fff" stroke-width="2"/>
            ${isSelected ? '<polygon points="14,2 26,14 14,26 2,14" fill="none" stroke="#86efac" stroke-width="3" opacity="0.6"/>' : ""}
            <text x="14" y="18" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="monospace">S</text>
          </svg>
        </div>`,
    });
  }

  // SUBSCRIBER
  const glowStyle = glow
    ? "filter: drop-shadow(0 0 6px #3b82f6); transform: scale(1.2);"
    : "";
  return L.divIcon({
    className: "",
    iconAnchor: [10, 10],
    iconSize: [20, 20],
    html: `
      <div style="width:20px;height:20px;${glowStyle}transition:all 0.2s;">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <circle cx="10" cy="10" r="8" fill="${isSelected ? "#1d4ed8" : "#3b82f6"}" stroke="#fff" stroke-width="1.5"/>
          ${isSelected ? '<circle cx="10" cy="10" r="8" fill="none" stroke="#93c5fd" stroke-width="2.5" opacity="0.6"/>' : ""}
        </svg>
      </div>`,
  });
}

// ─── Polygon to GeoJSON conversion ───────────────────────────────────────────

function latlngsToGeoJSON(latlngs: L.LatLng[]): PolygonGeoJSON {
  const coords = latlngs.map((ll) => [ll.lng, ll.lat]);
  // Close the ring
  if (coords.length > 0) {
    coords.push([...coords[0]]);
  }
  return { type: "Polygon", coordinates: [coords] };
}

function geoJSONtoLatLngs(polygon: PolygonGeoJSON): L.LatLng[] {
  const ring = polygon.coordinates[0];
  // Drop the closing point
  const pts = ring.length > 1 ? ring.slice(0, -1) : ring;
  return pts.map(([lng, lat]) => L.latLng(lat, lng));
}

// ─── Drawing event handler (inner component, uses useMapEvents) ───────────────

interface DrawHandlerProps {
  drawingMode: string;
  tempPoints: L.LatLng[];
  onAddPoint: (ll: L.LatLng) => void;
  onComplete: () => void;
  setCursorPos: (ll: L.LatLng | null) => void;
}

function DrawHandler({
  drawingMode,
  tempPoints,
  onAddPoint,
  onComplete,
  setCursorPos,
}: DrawHandlerProps) {
  useMapEvents({
    click(e) {
      if (drawingMode !== "drawing") return;
      onAddPoint(e.latlng);
    },
    dblclick(e) {
      if (drawingMode !== "drawing") return;
      e.originalEvent.preventDefault();
      if (tempPoints.length >= 3) {
        onComplete();
      }
    },
    mousemove(e) {
      if (drawingMode !== "drawing") return;
      setCursorPos(e.latlng);
    },
    mouseout() {
      setCursorPos(null);
    },
  });
  return null;
}

// ─── FitBounds effect ────────────────────────────────────────────────────────

interface FitBoundsProps {
  nodes: NetworkNode[];
}

function FitBoundsEffect({ nodes }: FitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    if (nodes.length < 2) return;
    const bounds = L.latLngBounds(nodes.map((n) => L.latLng(n.lat, n.lng)));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
  }, [map, nodes]);

  return null;
}

// ─── Cursor class updater ─────────────────────────────────────────────────────

function MapCursorClass({ drawingMode }: { drawingMode: string }) {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    if (drawingMode === "drawing") {
      container.style.cursor = "crosshair";
    } else {
      container.style.cursor = "";
    }
    return () => {
      container.style.cursor = "";
    };
  }, [map, drawingMode]);

  return null;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MapCanvasProps {
  onPolygonDrawn?: (polygon: PolygonGeoJSON) => void;
  onNodeClick?: (node: NetworkNode) => void;
  onNodeHover?: (nodeId: string | null) => void;
  className?: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

const MapCanvas = React.memo(function MapCanvas({
  onPolygonDrawn,
  onNodeClick,
  onNodeHover,
  className = "",
}: MapCanvasProps) {
  const {
    polygon,
    result,
    drawingMode,
    showNodes,
    showEdges,
    selectedNodeId,
    animationPlayed,
    setPolygon,
    setDrawingMode,
    setSelectedNodeId,
    setAnimationPlayed,
  } = useAutoDesignStore();

  // Drawing state
  const [tempPoints, setTempPoints] = useState<L.LatLng[]>([]);
  const [cursorPos, setCursorPos] = useState<L.LatLng | null>(null);

  // Interaction state
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Animation state
  const [visibleEdgeIds, setVisibleEdgeIds] = useState<Set<string>>(new Set());
  const prevResultRef = useRef<typeof result>(null);

  // Reset temp drawing when mode changes away from drawing
  useEffect(() => {
    if (drawingMode !== "drawing") {
      setTempPoints([]);
      setCursorPos(null);
    }
  }, [drawingMode]);

  // ── Animation: reveal edges sequentially when result first arrives ──────────
  useEffect(() => {
    if (!result || animationPlayed) {
      if (result && animationPlayed) {
        // Already played — show all edges immediately
        setVisibleEdgeIds(new Set(result.edges.map((e) => e.id)));
      }
      return;
    }

    if (prevResultRef.current === result) return;
    prevResultRef.current = result;

    setVisibleEdgeIds(new Set());

    // OLT→Splitter edges first, then Splitter→Subscriber
    const oltEdges = result.edges.filter((e) =>
      e.fromNodeId.startsWith("olt-"),
    );
    const subEdges = result.edges.filter(
      (e) => !e.fromNodeId.startsWith("olt-"),
    );
    const ordered = [...oltEdges, ...subEdges];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= ordered.length) {
        clearInterval(interval);
        setAnimationPlayed(true);
        return;
      }
      const edgeId = ordered[i].id;
      setVisibleEdgeIds((prev) => new Set([...prev, edgeId]));
      i++;
    }, 80);

    return () => clearInterval(interval);
  }, [result, animationPlayed, setAnimationPlayed]);

  // ── Polygon drawing handlers ─────────────────────────────────────────────────

  const handleAddPoint = useCallback((ll: L.LatLng) => {
    setTempPoints((prev) => [...prev, ll]);
  }, []);

  const handleCompletePolygon = useCallback(() => {
    if (tempPoints.length < 3) return;
    const geo = latlngsToGeoJSON(tempPoints);
    setPolygon(geo);
    setDrawingMode("done");
    onPolygonDrawn?.(geo);
    setTempPoints([]);
  }, [tempPoints, setPolygon, setDrawingMode, onPolygonDrawn]);

  // ── Polygon vertex editing ────────────────────────────────────────────────────

  const existingVertices = useMemo(() => {
    if (!polygon || drawingMode !== "editing") return [];
    return geoJSONtoLatLngs(polygon);
  }, [polygon, drawingMode]);

  const handleVertexDrag = useCallback(
    (index: number, newLatLng: L.LatLng) => {
      if (!polygon) return;
      const pts = geoJSONtoLatLngs(polygon);
      pts[index] = newLatLng;
      const updated = latlngsToGeoJSON(pts);
      setPolygon(updated);
    },
    [polygon, setPolygon],
  );

  // ── Node interaction ─────────────────────────────────────────────────────────

  const handleNodeClick = useCallback(
    (node: NetworkNode) => {
      setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
      onNodeClick?.(node);
    },
    [selectedNodeId, setSelectedNodeId, onNodeClick],
  );

  const handleNodeMouseOver = useCallback(
    (nodeId: string) => {
      setHoveredNodeId(nodeId);
      onNodeHover?.(nodeId);
    },
    [onNodeHover],
  );

  const handleNodeMouseOut = useCallback(() => {
    setHoveredNodeId(null);
    onNodeHover?.(null);
  }, [onNodeHover]);

  // ── Node markers (memoized) ──────────────────────────────────────────────────

  const nodeMarkers = useMemo(() => {
    if (!result || !showNodes) return [];
    return result.nodes.map((node) => {
      const isHovered = hoveredNodeId === node.id;
      const isSelected = selectedNodeId === node.id;
      const icon = createNodeIcon(node.type, isHovered, isSelected);

      return (
        <Marker
          key={node.id}
          position={[node.lat, node.lng]}
          icon={icon}
          eventHandlers={{
            click: () => handleNodeClick(node),
            mouseover: () => handleNodeMouseOver(node.id),
            mouseout: handleNodeMouseOut,
          }}
        >
          <Popup className="auto-design-popup">
            <div className="min-w-[140px] p-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{
                    background:
                      node.type === "OLT"
                        ? "#ef4444"
                        : node.type === "SPLITTER"
                          ? "#22c55e"
                          : "#3b82f6",
                  }}
                />
                <span className="font-semibold text-sm">{node.type}</span>
              </div>
              <p className="text-xs text-gray-600 mb-0.5">{node.name}</p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Connected:</span>{" "}
                {node.connectedCount}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {node.lat.toFixed(5)}, {node.lng.toFixed(5)}
              </p>
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [
    result,
    showNodes,
    hoveredNodeId,
    selectedNodeId,
    handleNodeClick,
    handleNodeMouseOver,
    handleNodeMouseOut,
  ]);

  // ── Edge polylines (memoized) ────────────────────────────────────────────────

  // Get node ids connected to hoveredNodeId
  const connectedEdgeIds = useMemo(() => {
    if (!result || !hoveredNodeId) return new Set<string>();
    return new Set(
      result.edges
        .filter(
          (e) => e.fromNodeId === hoveredNodeId || e.toNodeId === hoveredNodeId,
        )
        .map((e) => e.id),
    );
  }, [result, hoveredNodeId]);

  const edgePolylines = useMemo(() => {
    if (!result || !showEdges) return [];

    const hasHoveredNode = !!hoveredNodeId;

    return result.edges
      .filter((e) => visibleEdgeIds.has(e.id))
      .map((edge) => {
        const fromNode = result.nodes.find((n) => n.id === edge.fromNodeId);
        const toNode = result.nodes.find((n) => n.id === edge.toNodeId);
        if (!fromNode || !toNode) return null;

        const color = EDGE_COLORS[edge.networkType] ?? "#94a3b8";
        const isHoveredEdge = hoveredEdgeId === edge.id;
        const isConnected = connectedEdgeIds.has(edge.id);
        const isOltEdge = edge.fromNodeId.startsWith("olt-");

        const opacity = hasHoveredNode ? (isConnected ? 1 : 0.2) : 0.75;
        const weight = isHoveredEdge ? 5 : isConnected ? 4 : isOltEdge ? 3 : 2;

        return (
          <Polyline
            key={edge.id}
            positions={[
              [fromNode.lat, fromNode.lng],
              [toNode.lat, toNode.lng],
            ]}
            pathOptions={{
              color,
              weight,
              opacity,
              dashArray: isOltEdge ? undefined : "4 3",
            }}
            eventHandlers={{
              mouseover: () => setHoveredEdgeId(edge.id),
              mouseout: () => setHoveredEdgeId(null),
            }}
          />
        );
      })
      .filter(Boolean);
  }, [
    result,
    showEdges,
    visibleEdgeIds,
    hoveredEdgeId,
    hoveredNodeId,
    connectedEdgeIds,
  ]);

  // ── Preview polyline while drawing ──────────────────────────────────────────

  const drawingPreview = useMemo(() => {
    if (drawingMode !== "drawing" || tempPoints.length < 1) return null;
    const pts: [number, number][] = tempPoints.map((ll) => [ll.lat, ll.lng]);
    if (cursorPos) pts.push([cursorPos.lat, cursorPos.lng]);
    return (
      <Polyline
        positions={pts}
        pathOptions={{
          color: "#3b82f6",
          weight: 2,
          dashArray: "6 4",
          opacity: 0.8,
        }}
      />
    );
  }, [drawingMode, tempPoints, cursorPos]);

  // ── Temp dots while drawing ──────────────────────────────────────────────────

  const tempDots = useMemo(() => {
    if (drawingMode !== "drawing") return [];
    return tempPoints.map((ll) => (
      <CircleMarker
        key={`tmp-${ll.lat.toFixed(6)}-${ll.lng.toFixed(6)}`}
        center={[ll.lat, ll.lng]}
        radius={5}
        pathOptions={{
          color: "#3b82f6",
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 2,
        }}
      />
    ));
  }, [drawingMode, tempPoints]);

  // ── Existing polygon vertices (edit mode) ─────────────────────────────────────
  // Use Marker (draggable) with a circle divIcon instead of CircleMarker (not draggable)

  const vertexIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        iconAnchor: [8, 8],
        iconSize: [16, 16],
        html: `<div style="width:16px;height:16px;">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <circle cx="8" cy="8" r="6" fill="#fff" stroke="#f59e0b" stroke-width="2.5"/>
          </svg>
        </div>`,
      }),
    [],
  );

  const editVertices = useMemo(() => {
    if (drawingMode !== "editing") return [];
    return existingVertices.map((ll, vertexIndex) => (
      <Marker
        key={`vertex-${ll.lat.toFixed(6)}-${ll.lng.toFixed(6)}`}
        position={[ll.lat, ll.lng]}
        icon={vertexIcon}
        draggable
        eventHandlers={{
          dragend(e) {
            const marker = e.target as L.Marker;
            handleVertexDrag(vertexIndex, marker.getLatLng());
          },
        }}
      />
    ));
  }, [drawingMode, existingVertices, handleVertexDrag, vertexIcon]);

  // ── Existing polygon ─────────────────────────────────────────────────────────

  const polygonPositions = useMemo((): [number, number][] | null => {
    if (!polygon) return null;
    const ring = polygon.coordinates[0];
    const pts = ring.length > 1 ? ring.slice(0, -1) : ring;
    return pts.map(([lng, lat]) => [lat, lng]);
  }, [polygon]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      className={className}
      zoomControl={true}
      doubleClickZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {/* Draw event handler */}
      <DrawHandler
        drawingMode={drawingMode}
        tempPoints={tempPoints}
        onAddPoint={handleAddPoint}
        onComplete={handleCompletePolygon}
        setCursorPos={setCursorPos}
      />

      {/* Cursor style */}
      <MapCursorClass drawingMode={drawingMode} />

      {/* FitBounds when result changes */}
      {result && <FitBoundsEffect nodes={result.nodes} />}

      {/* Existing polygon */}
      {polygonPositions && (
        <Polygon
          positions={polygonPositions}
          pathOptions={{
            color: "#3b82f6",
            weight: 2,
            fillColor: "#3b82f6",
            fillOpacity: 0.12,
          }}
        />
      )}

      {/* Preview while drawing */}
      {drawingPreview}
      {tempDots}

      {/* Vertex edit handles */}
      {editVertices}

      {/* Network edges */}
      {edgePolylines}

      {/* Network nodes */}
      {nodeMarkers}
    </MapContainer>
  );
});

export default MapCanvas;
