/**
 * DrawControls — Floating glassmorphism control panel that overlays the map.
 *
 * States:
 *  1. idle     — no polygon drawn yet → "Draw Area" button
 *  2. drawing  — actively clicking to place vertices → cancel + vertex count
 *  3. done     — polygon complete, no result yet → edit / clear + area display
 *  4. results  — result from API is available → quick stats + new design
 */

import { Edit3, MapPin, RefreshCcw, Trash2, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useMemo } from "react";

import { calculatePolygonArea } from "../hooks/useAutoDesign";
import { useAutoDesignStore } from "../store";

// ─── SVG polygon thumbnail ────────────────────────────────────────────────────

function PolygonThumbnail({
  coordinates,
}: {
  coordinates: number[][][];
}) {
  const size = 52;
  const ring = coordinates[0];
  if (!ring || ring.length < 2) return null;

  const lngs = ring.map(([lng]) => lng);
  const lats = ring.map(([, lat]) => lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const pad = 4;

  const toX = (lng: number) =>
    pad + ((lng - minLng) / (maxLng - minLng || 1)) * (size - pad * 2);
  const toY = (lat: number) =>
    size - pad - ((lat - minLat) / (maxLat - minLat || 1)) * (size - pad * 2);

  const pts = ring
    .slice(0, -1)
    .map(([lng, lat]) => `${toX(lng)},${toY(lat)}`)
    .join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Polygon area preview"
    >
      <title>Polygon area preview</title>
      <polygon
        points={pts}
        fill="rgba(59,130,246,0.25)"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Panel animations ─────────────────────────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 32 },
  },
  exit: { opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.15 } },
};

// ─── Shared button styles ─────────────────────────────────────────────────────

const btnBase =
  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60";

// ─── Main component ───────────────────────────────────────────────────────────

export interface DrawControlsProps {
  onDrawStart?: () => void;
  onCancel?: () => void;
  onClear?: () => void;
  onEditArea?: () => void;
  onNewDesign?: () => void;
}

const DrawControls = React.memo(function DrawControls({
  onDrawStart,
  onCancel,
  onClear,
  onEditArea,
  onNewDesign,
}: DrawControlsProps) {
  const {
    polygon,
    result,
    drawingMode,
    setDrawingMode,
    setPolygon,
    setResult,
    reset,
  } = useAutoDesignStore();

  const vertexCount = useMemo(() => {
    if (!polygon) return 0;
    const ring = polygon.coordinates[0];
    return ring.length > 0 ? ring.length - 1 : 0;
  }, [polygon]);

  const areaKm2 = useMemo(() => {
    if (!polygon) return 0;
    return calculatePolygonArea(polygon);
  }, [polygon]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function startDrawing() {
    setDrawingMode("drawing");
    onDrawStart?.();
  }

  function cancelDrawing() {
    setDrawingMode(polygon ? "done" : "idle");
    onCancel?.();
  }

  function clearArea() {
    setPolygon(null);
    setResult(null);
    setDrawingMode("idle");
    onClear?.();
  }

  function editArea() {
    setDrawingMode("editing");
    onEditArea?.();
  }

  function newDesign() {
    reset();
    onNewDesign?.();
  }

  // ── Determine current panel variant ──────────────────────────────────────────

  type PanelKey = "idle" | "drawing" | "done" | "results";
  let panelKey: PanelKey = "idle";
  if (result) panelKey = "results";
  else if (drawingMode === "drawing") panelKey = "drawing";
  else if (drawingMode === "done" || drawingMode === "editing")
    panelKey = "done";

  // ── Glass panel wrapper ───────────────────────────────────────────────────────

  const glass =
    "bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-3 min-w-[200px] max-w-[240px]";

  return (
    <div className="absolute bottom-6 left-4 z-[1000] pointer-events-auto">
      <AnimatePresence mode="wait">
        {/* ── IDLE ───────────────────────────────────────────────────── */}
        {panelKey === "idle" && (
          <motion.div
            key="idle"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={glass}
            data-ocid="draw-controls.panel"
          >
            <p className="text-[11px] text-white/50 mb-2 leading-snug">
              Click <span className="text-white/70 font-medium">Draw Area</span>{" "}
              then click on the map to define your planning zone.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startDrawing}
              className={`${btnBase} w-full justify-center bg-blue-500 hover:bg-blue-400 text-white`}
              data-ocid="draw-controls.draw_button"
            >
              <MapPin size={13} />
              Draw Area
            </motion.button>
          </motion.div>
        )}

        {/* ── DRAWING ────────────────────────────────────────────────── */}
        {panelKey === "drawing" && (
          <motion.div
            key="drawing"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={glass}
            data-ocid="draw-controls.drawing_panel"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] text-white/70 font-medium">
                Drawing…
              </span>
            </div>
            <p className="text-[11px] text-white/50 mb-2 leading-snug">
              Click to add points.{" "}
              <span className="text-white/60">Double-click to complete</span>{" "}
              (min 3 points).
            </p>

            {/* Live vertex count */}
            <AnimatePresence>
              {polygon && vertexCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-2"
                >
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 border border-blue-400/30 rounded-lg text-[11px] text-blue-300">
                    {vertexCount} {vertexCount === 1 ? "point" : "points"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={cancelDrawing}
              className={`${btnBase} w-full justify-center bg-white/10 hover:bg-white/20 text-white/80`}
              data-ocid="draw-controls.cancel_button"
            >
              <X size={13} />
              Cancel
            </motion.button>
          </motion.div>
        )}

        {/* ── DONE (polygon ready, no result yet) ─────────────────────── */}
        {panelKey === "done" && (
          <motion.div
            key="done"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={glass}
            data-ocid="draw-controls.done_panel"
          >
            {/* Polygon preview thumbnail */}
            {polygon && (
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-white/5 border border-white/10 p-0.5 shrink-0">
                  <PolygonThumbnail coordinates={polygon.coordinates} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white/80">
                    Area defined
                  </p>
                  <p className="text-[11px] text-white/40">
                    ~{areaKm2 < 1 ? areaKm2.toFixed(3) : areaKm2.toFixed(1)} km²
                  </p>
                  <p className="text-[11px] text-white/40">
                    {vertexCount} vertices
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-1.5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={editArea}
                className={`${btnBase} flex-1 justify-center bg-white/10 hover:bg-white/20 text-white/70`}
                data-ocid="draw-controls.edit_button"
              >
                <Edit3 size={12} />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={clearArea}
                className={`${btnBase} flex-1 justify-center bg-red-500/20 hover:bg-red-500/30 text-red-300`}
                data-ocid="draw-controls.clear_button"
              >
                <Trash2 size={12} />
                Clear
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── RESULTS ─────────────────────────────────────────────────── */}
        {panelKey === "results" && result && (
          <motion.div
            key="results"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={glass}
            data-ocid="draw-controls.results_panel"
          >
            {/* Stats row */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[11px] font-semibold text-white/80">
                Design Generated
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-2.5">
              <StatChip
                label="Nodes"
                value={result.nodes.length}
                color="text-blue-300"
              />
              <StatChip
                label="Edges"
                value={result.edges.length}
                color="text-emerald-300"
              />
              <StatChip
                label="OLTs"
                value={result.summary.totalOLTs}
                color="text-red-300"
              />
              <StatChip
                label="Splitters"
                value={result.summary.totalSplitters}
                color="text-green-300"
              />
            </div>

            <div className="flex gap-1.5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={editArea}
                className={`${btnBase} flex-1 justify-center bg-white/10 hover:bg-white/20 text-white/70`}
                data-ocid="draw-controls.edit_area_button"
              >
                <Edit3 size={12} />
                Edit Area
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={newDesign}
                className={`${btnBase} flex-1 justify-center bg-blue-500/30 hover:bg-blue-500/50 text-blue-200`}
                data-ocid="draw-controls.new_design_button"
              >
                <RefreshCcw size={12} />
                New
              </motion.button>
            </div>

            {/* Area hint */}
            {polygon && (
              <p className="text-[10px] text-white/30 mt-2 text-center">
                ~{areaKm2 < 1 ? areaKm2.toFixed(3) : areaKm2.toFixed(1)} km²
                coverage zone
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawing mode badge — visible outside the main panel while editing vertices */}
      <AnimatePresence>
        {drawingMode === "editing" && (
          <motion.div
            key="edit-badge"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-400/30 rounded-xl backdrop-blur-md"
            data-ocid="draw-controls.edit_badge"
          >
            <Zap size={11} className="text-amber-300" />
            <span className="text-[11px] text-amber-200 font-medium">
              Drag vertices to adjust area
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDrawingMode("done")}
              className="ml-1 text-amber-300/60 hover:text-amber-200"
              aria-label="Finish editing"
              data-ocid="draw-controls.finish_edit_button"
            >
              <X size={11} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── Stat chip sub-component ──────────────────────────────────────────────────

function StatChip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex flex-col bg-white/5 rounded-xl px-2 py-1.5 border border-white/5">
      <span className={`text-sm font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-white/40">{label}</span>
    </div>
  );
}

export default DrawControls;
