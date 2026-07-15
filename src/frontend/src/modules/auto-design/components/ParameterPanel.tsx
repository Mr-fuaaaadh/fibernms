/**
 * ParameterPanel — Floating glassmorphism form panel for network auto-design parameters.
 * Desktop: absolute top-4 right-4, 320px wide
 * Mobile: bottom sheet, slides up from bottom
 */

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  MapPin,
  PenLine,
  RotateCcw,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAutoDesign } from "../hooks/useAutoDesign";
import { calculatePolygonArea } from "../hooks/useAutoDesign";
import { useAutoDesignStore } from "../store";
import type {
  AutoDesignFormValues,
  NetworkType,
  SplitterCapacity,
} from "../types";

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const autoDesignSchema = z.object({
  subscriber_count: z.coerce
    .number()
    .min(1, "At least 1 subscriber required")
    .max(100_000, "Maximum 100,000 subscribers"),
  network_type: z.enum(["FIBER", "COAXIAL", "LAN"], {
    errorMap: () => ({ message: "Please select a network type" }),
  }),
  splitter_capacity: z.coerce
    .number()
    .refine((v) => [8, 16, 32].includes(v), "Invalid splitter capacity"),
  max_distance: z.coerce
    .number()
    .min(100, "Minimum distance is 100 meters")
    .max(50_000, "Maximum distance is 50,000 meters"),
  manual_olt_placement: z.boolean().optional(),
});

type FormSchema = z.infer<typeof autoDesignSchema>;

// ─── Network type config ──────────────────────────────────────────────────────

const NETWORK_TYPE_CONFIG: Record<
  NetworkType,
  { label: string; color: string }
> = {
  FIBER: { label: "Fiber", color: "bg-emerald-500" },
  COAXIAL: { label: "Coaxial", color: "bg-yellow-400" },
  LAN: { label: "LAN", color: "bg-blue-400" },
};

const SPLITTER_OPTIONS: SplitterCapacity[] = [8, 16, 32];

// ─── LoadingOverlay ───────────────────────────────────────────────────────────

interface LoadingOverlayProps {
  onCancel: () => void;
}

export function LoadingOverlay({ onCancel }: LoadingOverlayProps) {
  return (
    <motion.div
      data-ocid="auto-design.loading_state"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative z-10 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-5 text-center"
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Animated SVG spinner */}
        <div className="relative w-16 h-16">
          <svg
            aria-hidden="true"
            className="w-16 h-16 -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="oklch(0.62 0.18 210)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="163.36"
              animate={{ strokeDashoffset: [163, 0, 163] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap
              aria-hidden="true"
              className="w-5 h-5 text-primary animate-pulse"
            />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-white font-semibold text-lg leading-tight">
            Generating optimized network...
          </h3>
          <p className="text-white/50 text-sm">
            AI is analyzing your coverage area
          </p>
        </div>

        {/* Pulsing dots */}
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          data-ocid="auto-design.cancel_button"
          onClick={onCancel}
          className="mt-1 text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── ParameterPanel ───────────────────────────────────────────────────────────

export function ParameterPanel() {
  const store = useAutoDesignStore();
  const { generateNetwork, isGenerating, reset } = useAutoDesign();
  const [collapsed, setCollapsed] = useState(false);

  const isVisible =
    store.drawingMode === "done" || store.drawingMode === "editing";

  const polygonArea = store.polygon
    ? calculatePolygonArea(store.polygon).toFixed(2)
    : "0.00";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(autoDesignSchema),
    defaultValues: {
      subscriber_count: 500,
      network_type: "FIBER",
      splitter_capacity: 16,
      max_distance: 2000,
      manual_olt_placement: false,
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const selectedNetworkType = watch("network_type") as NetworkType;
  const selectedSplitter = watch("splitter_capacity");
  const manualOlt = watch("manual_olt_placement");

  // Sync form values to store
  const setFormValues = store.setFormValues;
  useEffect(() => {
    const values: AutoDesignFormValues = {
      subscriberCount: watchedValues.subscriber_count ?? 500,
      networkType: (watchedValues.network_type as NetworkType) ?? "FIBER",
      splitterCapacity:
        (watchedValues.splitter_capacity as SplitterCapacity) ?? 16,
      maxDistance: watchedValues.max_distance ?? 2000,
      manualOltPlacement: watchedValues.manual_olt_placement ?? false,
    };
    setFormValues(values);
  }, [
    watchedValues.subscriber_count,
    watchedValues.network_type,
    watchedValues.splitter_capacity,
    watchedValues.max_distance,
    watchedValues.manual_olt_placement,
    setFormValues,
  ]);

  const onSubmit = (data: FormSchema) => {
    if (!store.polygon) return;
    generateNetwork({
      polygon: store.polygon,
      subscriber_count: data.subscriber_count,
      network_type: data.network_type as NetworkType,
      splitter_capacity: data.splitter_capacity as SplitterCapacity,
      max_distance: data.max_distance,
      manual_olt_placement: data.manual_olt_placement ?? false,
    });
  };

  const handleReset = () => {
    resetForm();
    reset();
  };

  const handleEditArea = () => {
    store.setDrawingMode("editing");
  };

  // ── Panel inner content ───────────────────────────────────────────────────

  const panelContent = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Subscriber Count */}
      <div className="space-y-1.5">
        <label
          htmlFor="ad-subscriber-count"
          className="block text-xs font-medium text-white/70 uppercase tracking-wider"
        >
          Subscriber Count
        </label>
        <div className="relative">
          <input
            id="ad-subscriber-count"
            data-ocid="auto-design.subscriber_count.input"
            type="number"
            placeholder="e.g. 500"
            {...register("subscriber_count")}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all"
          />
        </div>
        <p className="text-white/30 text-xs">1 – 100,000</p>
        <AnimatePresence>
          {errors.subscriber_count && (
            <motion.p
              data-ocid="auto-design.subscriber_count.field_error"
              className="text-red-400 text-xs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {errors.subscriber_count.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Network Type */}
      <div className="space-y-1.5">
        <label
          htmlFor="ad-network-type"
          className="block text-xs font-medium text-white/70 uppercase tracking-wider"
        >
          Network Type
        </label>
        <div className="relative">
          <select
            id="ad-network-type"
            data-ocid="auto-design.network_type.select"
            {...register("network_type")}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-8 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all cursor-pointer"
          >
            {(Object.keys(NETWORK_TYPE_CONFIG) as NetworkType[]).map((type) => (
              <option
                key={type}
                value={type}
                className="bg-gray-900 text-white"
              >
                {NETWORK_TYPE_CONFIG[type].label}
              </option>
            ))}
          </select>
          {/* Color indicator + custom arrow */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                NETWORK_TYPE_CONFIG[selectedNetworkType]?.color ?? "bg-white/30"
              }`}
            />
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </div>
        </div>
        <AnimatePresence>
          {errors.network_type && (
            <motion.p
              data-ocid="auto-design.network_type.field_error"
              className="text-red-400 text-xs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {errors.network_type.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Splitter Capacity */}
      <fieldset className="space-y-1.5">
        <legend className="block text-xs font-medium text-white/70 uppercase tracking-wider mb-1.5">
          Splitter Capacity
        </legend>
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-lg">
          {SPLITTER_OPTIONS.map((cap) => (
            <button
              key={cap}
              type="button"
              data-ocid={`auto-design.splitter_capacity.${cap}`}
              onClick={() =>
                setValue("splitter_capacity", cap, { shouldValidate: true })
              }
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${
                Number(selectedSplitter) === cap
                  ? "bg-primary text-white shadow-sm"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              1:{cap}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {errors.splitter_capacity && (
            <motion.p
              data-ocid="auto-design.splitter_capacity.field_error"
              className="text-red-400 text-xs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {errors.splitter_capacity.message}
            </motion.p>
          )}
        </AnimatePresence>
      </fieldset>

      {/* Max Distance */}
      <div className="space-y-1.5">
        <label
          htmlFor="ad-max-distance"
          className="block text-xs font-medium text-white/70 uppercase tracking-wider"
        >
          Max Distance (m)
        </label>
        <div className="relative">
          <input
            id="ad-max-distance"
            data-ocid="auto-design.max_distance.input"
            type="number"
            placeholder="e.g. 2000"
            {...register("max_distance")}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-medium">
            m
          </span>
        </div>
        <p className="text-white/30 text-xs">100 – 50,000 meters</p>
        <AnimatePresence>
          {errors.max_distance && (
            <motion.p
              data-ocid="auto-design.max_distance.field_error"
              className="text-red-400 text-xs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {errors.max_distance.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Manual OLT Placement */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          data-ocid="auto-design.manual_olt.toggle"
          role="switch"
          aria-checked={manualOlt ?? false}
          onClick={() =>
            setValue("manual_olt_placement", !(manualOlt ?? false), {
              shouldValidate: true,
            })
          }
          className={`relative mt-0.5 flex-shrink-0 h-5 w-9 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${
            manualOlt ? "bg-primary" : "bg-white/10"
          }`}
        >
          <motion.span
            layout
            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
            animate={{ x: manualOlt ? 16 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <div>
          <p className="text-sm text-white/80 font-medium leading-tight">
            Manual OLT Placement
          </p>
          <p className="text-xs text-white/40 mt-0.5">
            Place OLT manually after generation
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-1 space-y-2">
        {/* Secondary row */}
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid="auto-design.reset_button"
            onClick={handleReset}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 hover:bg-white/8 border border-white/10 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            type="button"
            data-ocid="auto-design.edit_area_button"
            onClick={handleEditArea}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 hover:bg-white/8 border border-white/10 transition-all"
          >
            <PenLine className="w-3.5 h-3.5" />
            Edit Area
          </button>
        </div>

        {/* Primary CTA */}
        <motion.button
          type="submit"
          data-ocid="auto-design.generate_button"
          disabled={!isValid || isGenerating}
          whileHover={!isGenerating && isValid ? { scale: 1.02 } : {}}
          whileTap={!isGenerating && isValid ? { scale: 0.98 } : {}}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate Network
            </>
          )}
        </motion.button>
      </div>
    </form>
  );

  // ── Panel Header ─────────────────────────────────────────────────────────

  const panelHeader = (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="min-w-0">
        <h2 className="text-white font-semibold text-base leading-tight truncate">
          Network Parameters
        </h2>
        <p className="text-white/40 text-xs mt-0.5">
          Configure your auto design
        </p>
        {store.polygon && (
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
            <span className="text-xs text-primary/80 font-medium">
              Area: {polygonArea} km²
            </span>
          </div>
        )}
      </div>
      {/* Mobile collapse toggle */}
      <button
        type="button"
        data-ocid="auto-design.panel_collapse_toggle"
        aria-label={collapsed ? "Expand panel" : "Collapse panel"}
        onClick={() => setCollapsed((c) => !c)}
        className="md:hidden flex-shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/8 transition-colors"
      >
        {collapsed ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
    </div>
  );

  // ── Glassmorphism panel classes ───────────────────────────────────────────

  const glassClasses =
    "bg-gray-900/85 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40";

  return (
    <>
      {/* ── Desktop Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            data-ocid="auto-design.parameter_panel"
            className={`hidden md:block absolute top-4 right-4 w-80 rounded-2xl ${glassClasses} p-5 z-[1000]`}
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            {panelHeader}
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Bottom Sheet ───────────────────────────────────────── */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            data-ocid="auto-design.parameter_panel_mobile"
            className={`md:hidden fixed bottom-0 left-0 right-0 z-[1000] rounded-t-2xl ${glassClasses} pb-safe`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <div className="px-4 pt-2 pb-5 max-h-[85dvh] overflow-y-auto overscroll-contain">
              {panelHeader}

              {/* Collapsible body on mobile */}
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.div
                    key="mobile-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: "hidden" }}
                  >
                    {panelContent}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Loading Overlay ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isGenerating && (
          <LoadingOverlay
            onCancel={() => {
              reset();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
