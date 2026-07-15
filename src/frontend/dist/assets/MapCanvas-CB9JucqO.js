import { g as React, r as reactExports, j as jsxRuntimeExports } from "./index-BhX-NLFL.js";
import "./leaflet-BTRAWF_c.js";
import { d as createPathComponent, l as leafletSrcExports, e as createElementObject, f as extendContext, M as Marker, P as Popup, a as Polyline, C as CircleMarker, b as MapContainer, T as TileLayer, c as useMapEvents, u as useMap } from "./TileLayer-Clb5XZyt.js";
import { u as useAutoDesignStore } from "./index-Cvnwsh00.js";
import "./index-wIYsNRKm.js";
import "./trash-2-B7HpulIY.js";
import "./refresh-ccw-Czogp52C.js";
import "./index.esm-DGQtOVR-.js";
import "./rotate-ccw-BB7z6NLd.js";
import "./loader-circle-BmHEGPnb.js";
import "./chevron-up-Crhg0lxx.js";
import "./cable-Cpe5c1Yk.js";
import "./dollar-sign-DssDwdn4.js";
import "./eye-DZId2ECu.js";
import "./eye-off-BHEebMee.js";
import "./play-B9Fj6SyH.js";
import "./download-D7u75BDX.js";
import "./refresh-cw-CSaOG_fq.js";
import "./sparkles-_ErhwPIU.js";
const Polygon = createPathComponent(function createPolygon({ positions, ...options }, ctx) {
  const polygon = new leafletSrcExports.Polygon(positions, options);
  return createElementObject(polygon, extendContext(ctx, {
    overlayContainer: polygon
  }));
}, function updatePolygon(layer, props, prevProps) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions);
  }
});
const iconRetinaUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcY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";
const iconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=";
const shadowUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC";
leafletSrcExports.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
const EDGE_COLORS = {
  FIBER: "#22c55e",
  COAXIAL: "#eab308",
  LAN: "#3b82f6"
};
function createNodeIcon(type, isHovered, isSelected) {
  const glow = isHovered || isSelected;
  if (type === "OLT") {
    const glowStyle2 = glow ? "filter: drop-shadow(0 0 8px #ef4444); transform: scale(1.15);" : "";
    return leafletSrcExports.divIcon({
      className: "",
      iconAnchor: [16, 16],
      iconSize: [32, 32],
      html: `
        <div style="width:32px;height:32px;${glowStyle2}transition:all 0.2s;">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <circle cx="16" cy="16" r="14" fill="${isSelected ? "#dc2626" : "#ef4444"}" stroke="#fff" stroke-width="2"/>
            ${isSelected ? '<circle cx="16" cy="16" r="14" fill="none" stroke="#fca5a5" stroke-width="3" opacity="0.6"/>' : ""}
            <text x="16" y="21" text-anchor="middle" fill="#fff" font-size="13" font-weight="bold" font-family="monospace">T</text>
          </svg>
        </div>`
    });
  }
  if (type === "SPLITTER") {
    const glowStyle2 = glow ? "filter: drop-shadow(0 0 8px #22c55e); transform: scale(1.15);" : "";
    return leafletSrcExports.divIcon({
      className: "",
      iconAnchor: [14, 14],
      iconSize: [28, 28],
      html: `
        <div style="width:28px;height:28px;${glowStyle2}transition:all 0.2s;">
          <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
            <polygon points="14,2 26,14 14,26 2,14" fill="${isSelected ? "#16a34a" : "#22c55e"}" stroke="#fff" stroke-width="2"/>
            ${isSelected ? '<polygon points="14,2 26,14 14,26 2,14" fill="none" stroke="#86efac" stroke-width="3" opacity="0.6"/>' : ""}
            <text x="14" y="18" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold" font-family="monospace">S</text>
          </svg>
        </div>`
    });
  }
  const glowStyle = glow ? "filter: drop-shadow(0 0 6px #3b82f6); transform: scale(1.2);" : "";
  return leafletSrcExports.divIcon({
    className: "",
    iconAnchor: [10, 10],
    iconSize: [20, 20],
    html: `
      <div style="width:20px;height:20px;${glowStyle}transition:all 0.2s;">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <circle cx="10" cy="10" r="8" fill="${isSelected ? "#1d4ed8" : "#3b82f6"}" stroke="#fff" stroke-width="1.5"/>
          ${isSelected ? '<circle cx="10" cy="10" r="8" fill="none" stroke="#93c5fd" stroke-width="2.5" opacity="0.6"/>' : ""}
        </svg>
      </div>`
  });
}
function latlngsToGeoJSON(latlngs) {
  const coords = latlngs.map((ll) => [ll.lng, ll.lat]);
  if (coords.length > 0) {
    coords.push([...coords[0]]);
  }
  return { type: "Polygon", coordinates: [coords] };
}
function geoJSONtoLatLngs(polygon) {
  const ring = polygon.coordinates[0];
  const pts = ring.length > 1 ? ring.slice(0, -1) : ring;
  return pts.map(([lng, lat]) => leafletSrcExports.latLng(lat, lng));
}
function DrawHandler({
  drawingMode,
  tempPoints,
  onAddPoint,
  onComplete,
  setCursorPos
}) {
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
    }
  });
  return null;
}
function FitBoundsEffect({ nodes }) {
  const map = useMap();
  reactExports.useEffect(() => {
    if (nodes.length < 2) return;
    const bounds = leafletSrcExports.latLngBounds(nodes.map((n) => leafletSrcExports.latLng(n.lat, n.lng)));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
  }, [map, nodes]);
  return null;
}
function MapCursorClass({ drawingMode }) {
  const map = useMap();
  reactExports.useEffect(() => {
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
const MapCanvas = React.memo(function MapCanvas2({
  onPolygonDrawn,
  onNodeClick,
  onNodeHover,
  className = ""
}) {
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
    setAnimationPlayed
  } = useAutoDesignStore();
  const [tempPoints, setTempPoints] = reactExports.useState([]);
  const [cursorPos, setCursorPos] = reactExports.useState(null);
  const [hoveredNodeId, setHoveredNodeId] = reactExports.useState(null);
  const [hoveredEdgeId, setHoveredEdgeId] = reactExports.useState(null);
  const [visibleEdgeIds, setVisibleEdgeIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const prevResultRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (drawingMode !== "drawing") {
      setTempPoints([]);
      setCursorPos(null);
    }
  }, [drawingMode]);
  reactExports.useEffect(() => {
    if (!result || animationPlayed) {
      if (result && animationPlayed) {
        setVisibleEdgeIds(new Set(result.edges.map((e) => e.id)));
      }
      return;
    }
    if (prevResultRef.current === result) return;
    prevResultRef.current = result;
    setVisibleEdgeIds(/* @__PURE__ */ new Set());
    const oltEdges = result.edges.filter(
      (e) => e.fromNodeId.startsWith("olt-")
    );
    const subEdges = result.edges.filter(
      (e) => !e.fromNodeId.startsWith("olt-")
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
      setVisibleEdgeIds((prev) => /* @__PURE__ */ new Set([...prev, edgeId]));
      i++;
    }, 80);
    return () => clearInterval(interval);
  }, [result, animationPlayed, setAnimationPlayed]);
  const handleAddPoint = reactExports.useCallback((ll) => {
    setTempPoints((prev) => [...prev, ll]);
  }, []);
  const handleCompletePolygon = reactExports.useCallback(() => {
    if (tempPoints.length < 3) return;
    const geo = latlngsToGeoJSON(tempPoints);
    setPolygon(geo);
    setDrawingMode("done");
    onPolygonDrawn == null ? void 0 : onPolygonDrawn(geo);
    setTempPoints([]);
  }, [tempPoints, setPolygon, setDrawingMode, onPolygonDrawn]);
  const existingVertices = reactExports.useMemo(() => {
    if (!polygon || drawingMode !== "editing") return [];
    return geoJSONtoLatLngs(polygon);
  }, [polygon, drawingMode]);
  const handleVertexDrag = reactExports.useCallback(
    (index, newLatLng) => {
      if (!polygon) return;
      const pts = geoJSONtoLatLngs(polygon);
      pts[index] = newLatLng;
      const updated = latlngsToGeoJSON(pts);
      setPolygon(updated);
    },
    [polygon, setPolygon]
  );
  const handleNodeClick = reactExports.useCallback(
    (node) => {
      setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
      onNodeClick == null ? void 0 : onNodeClick(node);
    },
    [selectedNodeId, setSelectedNodeId, onNodeClick]
  );
  const handleNodeMouseOver = reactExports.useCallback(
    (nodeId) => {
      setHoveredNodeId(nodeId);
      onNodeHover == null ? void 0 : onNodeHover(nodeId);
    },
    [onNodeHover]
  );
  const handleNodeMouseOut = reactExports.useCallback(() => {
    setHoveredNodeId(null);
    onNodeHover == null ? void 0 : onNodeHover(null);
  }, [onNodeHover]);
  const nodeMarkers = reactExports.useMemo(() => {
    if (!result || !showNodes) return [];
    return result.nodes.map((node) => {
      const isHovered = hoveredNodeId === node.id;
      const isSelected = selectedNodeId === node.id;
      const icon = createNodeIcon(node.type, isHovered, isSelected);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Marker,
        {
          position: [node.lat, node.lng],
          icon,
          eventHandlers: {
            click: () => handleNodeClick(node),
            mouseover: () => handleNodeMouseOver(node.id),
            mouseout: handleNodeMouseOut
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popup, { className: "auto-design-popup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[140px] p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block w-2.5 h-2.5 rounded-full",
                  style: {
                    background: node.type === "OLT" ? "#ef4444" : node.type === "SPLITTER" ? "#22c55e" : "#3b82f6"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: node.type })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600 mb-0.5", children: node.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Connected:" }),
              " ",
              node.connectedCount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 mt-0.5", children: [
              node.lat.toFixed(5),
              ", ",
              node.lng.toFixed(5)
            ] })
          ] }) })
        },
        node.id
      );
    });
  }, [
    result,
    showNodes,
    hoveredNodeId,
    selectedNodeId,
    handleNodeClick,
    handleNodeMouseOver,
    handleNodeMouseOut
  ]);
  const connectedEdgeIds = reactExports.useMemo(() => {
    if (!result || !hoveredNodeId) return /* @__PURE__ */ new Set();
    return new Set(
      result.edges.filter(
        (e) => e.fromNodeId === hoveredNodeId || e.toNodeId === hoveredNodeId
      ).map((e) => e.id)
    );
  }, [result, hoveredNodeId]);
  const edgePolylines = reactExports.useMemo(() => {
    if (!result || !showEdges) return [];
    const hasHoveredNode = !!hoveredNodeId;
    return result.edges.filter((e) => visibleEdgeIds.has(e.id)).map((edge) => {
      const fromNode = result.nodes.find((n) => n.id === edge.fromNodeId);
      const toNode = result.nodes.find((n) => n.id === edge.toNodeId);
      if (!fromNode || !toNode) return null;
      const color = EDGE_COLORS[edge.networkType] ?? "#94a3b8";
      const isHoveredEdge = hoveredEdgeId === edge.id;
      const isConnected = connectedEdgeIds.has(edge.id);
      const isOltEdge = edge.fromNodeId.startsWith("olt-");
      const opacity = hasHoveredNode ? isConnected ? 1 : 0.2 : 0.75;
      const weight = isHoveredEdge ? 5 : isConnected ? 4 : isOltEdge ? 3 : 2;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Polyline,
        {
          positions: [
            [fromNode.lat, fromNode.lng],
            [toNode.lat, toNode.lng]
          ],
          pathOptions: {
            color,
            weight,
            opacity,
            dashArray: isOltEdge ? void 0 : "4 3"
          },
          eventHandlers: {
            mouseover: () => setHoveredEdgeId(edge.id),
            mouseout: () => setHoveredEdgeId(null)
          }
        },
        edge.id
      );
    }).filter(Boolean);
  }, [
    result,
    showEdges,
    visibleEdgeIds,
    hoveredEdgeId,
    hoveredNodeId,
    connectedEdgeIds
  ]);
  const drawingPreview = reactExports.useMemo(() => {
    if (drawingMode !== "drawing" || tempPoints.length < 1) return null;
    const pts = tempPoints.map((ll) => [ll.lat, ll.lng]);
    if (cursorPos) pts.push([cursorPos.lat, cursorPos.lng]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Polyline,
      {
        positions: pts,
        pathOptions: {
          color: "#3b82f6",
          weight: 2,
          dashArray: "6 4",
          opacity: 0.8
        }
      }
    );
  }, [drawingMode, tempPoints, cursorPos]);
  const tempDots = reactExports.useMemo(() => {
    if (drawingMode !== "drawing") return [];
    return tempPoints.map((ll) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CircleMarker,
      {
        center: [ll.lat, ll.lng],
        radius: 5,
        pathOptions: {
          color: "#3b82f6",
          fillColor: "#fff",
          fillOpacity: 1,
          weight: 2
        }
      },
      `tmp-${ll.lat.toFixed(6)}-${ll.lng.toFixed(6)}`
    ));
  }, [drawingMode, tempPoints]);
  const vertexIcon = reactExports.useMemo(
    () => leafletSrcExports.divIcon({
      className: "",
      iconAnchor: [8, 8],
      iconSize: [16, 16],
      html: `<div style="width:16px;height:16px;">
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <circle cx="8" cy="8" r="6" fill="#fff" stroke="#f59e0b" stroke-width="2.5"/>
          </svg>
        </div>`
    }),
    []
  );
  const editVertices = reactExports.useMemo(() => {
    if (drawingMode !== "editing") return [];
    return existingVertices.map((ll, vertexIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Marker,
      {
        position: [ll.lat, ll.lng],
        icon: vertexIcon,
        draggable: true,
        eventHandlers: {
          dragend(e) {
            const marker = e.target;
            handleVertexDrag(vertexIndex, marker.getLatLng());
          }
        }
      },
      `vertex-${ll.lat.toFixed(6)}-${ll.lng.toFixed(6)}`
    ));
  }, [drawingMode, existingVertices, handleVertexDrag, vertexIcon]);
  const polygonPositions = reactExports.useMemo(() => {
    if (!polygon) return null;
    const ring = polygon.coordinates[0];
    const pts = ring.length > 1 ? ring.slice(0, -1) : ring;
    return pts.map(([lng, lat]) => [lat, lng]);
  }, [polygon]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MapContainer,
    {
      center: [20, 0],
      zoom: 2,
      style: { height: "100%", width: "100%" },
      className,
      zoomControl: true,
      doubleClickZoom: false,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TileLayer,
          {
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DrawHandler,
          {
            drawingMode,
            tempPoints,
            onAddPoint: handleAddPoint,
            onComplete: handleCompletePolygon,
            setCursorPos
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapCursorClass, { drawingMode }),
        result && /* @__PURE__ */ jsxRuntimeExports.jsx(FitBoundsEffect, { nodes: result.nodes }),
        polygonPositions && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Polygon,
          {
            positions: polygonPositions,
            pathOptions: {
              color: "#3b82f6",
              weight: 2,
              fillColor: "#3b82f6",
              fillOpacity: 0.12
            }
          }
        ),
        drawingPreview,
        tempDots,
        editVertices,
        edgePolylines,
        nodeMarkers
      ]
    }
  );
});
export {
  MapCanvas as default
};
