import { CheckCircle2, PenLine, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface DrawToolbarProps {
  drawMode: boolean;
  routeType: "backbone" | "distribution" | "drop";
  waypointCount: number;
  onToggleDrawMode: () => void;
  onRouteTypeChange: (type: "backbone" | "distribution" | "drop") => void;
  onFinish: () => void;
  onCancel: () => void;
}

const ROUTE_TYPES = [
  { key: "backbone" as const, label: "Backbone", color: "#00e5ff" },
  { key: "distribution" as const, label: "Distribution", color: "#448aff" },
  { key: "drop" as const, label: "Drop", color: "#69ff47" },
] as const;

export function DrawToolbar({
  drawMode,
  routeType,
  waypointCount,
  onToggleDrawMode,
  onRouteTypeChange,
  onFinish,
  onCancel,
}: DrawToolbarProps) {
  const canFinish = waypointCount >= 2;

  return (
    <motion.div
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="pointer-events-auto"
      data-ocid="draw-toolbar"
    >
      <div
        className="flex items-center h-10 rounded-full px-1.5 gap-0.5"
        style={{
          background: "rgba(10,16,26,0.82)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Start button (idle mode) */}
        <AnimatePresence mode="wait">
          {!drawMode ? (
            <motion.button
              key="idle"
              type="button"
              onClick={onToggleDrawMode}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-semibold transition-colors duration-150"
              style={{
                background: "rgba(0,229,255,0.12)",
                border: "1px solid rgba(0,229,255,0.3)",
                color: "#00e5ff",
              }}
              data-ocid="draw-route-btn"
            >
              <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
              Draw Route
            </motion.button>
          ) : (
            <motion.div
              key="drawing"
              className="flex items-center gap-0.5"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.15 }}
            >
              {/* Mode badge */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 h-7 mr-1"
                style={{ background: "rgba(0,229,255,0.08)" }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "#00e5ff" }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "#00e5ff" }}
                >
                  Drawing...
                </span>
              </div>

              {/* Divider */}
              <div
                className="h-5 w-px mx-1"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-hidden="true"
              />

              {/* Route type selectors */}
              <div className="flex items-center gap-0.5">
                {ROUTE_TYPES.map(({ key, label, color }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onRouteTypeChange(key)}
                    className="flex items-center gap-1.5 rounded-full px-3 h-7 text-xs font-mono transition-all duration-150"
                    style={{
                      background:
                        routeType === key ? `${color}18` : "transparent",
                      border:
                        routeType === key
                          ? `1px solid ${color}50`
                          : "1px solid transparent",
                      color:
                        routeType === key ? color : "rgba(255,255,255,0.45)",
                    }}
                    data-ocid={`route-type-${key}`}
                    aria-pressed={routeType === key}
                  >
                    <span
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{
                        background: color,
                        boxShadow:
                          routeType === key ? `0 0 6px ${color}` : "none",
                      }}
                      aria-hidden="true"
                    />
                    {label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div
                className="h-5 w-px mx-1"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-hidden="true"
              />

              {/* Waypoint badge */}
              <div
                className="flex items-center rounded-full px-3 h-7"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <span
                  className="font-mono text-[11px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {waypointCount} {waypointCount === 1 ? "point" : "points"}
                </span>
              </div>

              {/* Divider */}
              <div
                className="h-5 w-px mx-1"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-hidden="true"
              />

              {/* Finish button */}
              <button
                type="button"
                onClick={onFinish}
                disabled={!canFinish}
                className="flex items-center gap-1.5 rounded-full px-3 h-7 text-xs font-mono font-semibold transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed"
                style={{
                  background: canFinish
                    ? "rgba(52,211,153,0.18)"
                    : "rgba(52,211,153,0.06)",
                  border: canFinish
                    ? "1px solid rgba(52,211,153,0.5)"
                    : "1px solid rgba(52,211,153,0.2)",
                  color: canFinish ? "#34d399" : "rgba(52,211,153,0.4)",
                }}
                data-ocid="draw-finish-btn"
                title={
                  !canFinish
                    ? "Add at least 2 waypoints to finish"
                    : "Finish drawing route"
                }
              >
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                Finish
              </button>

              {/* Cancel button */}
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-1.5 rounded-full px-3 h-7 text-xs font-mono font-semibold transition-all duration-150"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(248,113,113,0.4)",
                  color: "#f87171",
                }}
                data-ocid="draw-cancel-btn"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
