/**
 * AutoDesignPage — Main orchestrator for the Network Auto Design module.
 *
 * Layout:
 *   - Fills the remaining viewport height after the Layout header (flex-1)
 *   - MapCanvas renders full-screen (absolute inset-0)
 *   - DrawControls floats bottom-left (handled internally)
 *   - ParameterPanel floats top-right on desktop / bottom sheet on mobile (handled internally)
 *   - ResultPanel (NodeDetailPanel + SummaryPanel) floats as absolute panels (handled internally)
 *   - Welcome banner shown only in 'idle' state — AnimatePresence fades it out
 *
 * Notes:
 *   - MapCanvas is lazy-imported (avoids SSR/top-level Leaflet issues)
 *   - ParameterPanel already includes its own LoadingOverlay — no duplication here
 *   - leaflet/dist/leaflet.css is imported here as the lazy boundary entry point
 */

import "leaflet/dist/leaflet.css";

import { ArrowDown, Network, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy } from "react";

import DrawControls from "./components/DrawControls";
import { ParameterPanel } from "./components/ParameterPanel";
import ResultPanel from "./components/ResultPanel";
import { useAutoDesignStore } from "./store";

// ─── Lazy MapCanvas ───────────────────────────────────────────────────────────

const LazyMapCanvas = lazy(() => import("./components/MapCanvas"));

// ─── Map fallback ─────────────────────────────────────────────────────────────

function MapFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-white/40 text-sm">Loading map…</p>
      </div>
    </div>
  );
}

// ─── Welcome Banner ───────────────────────────────────────────────────────────

function WelcomeBanner() {
  return (
    <motion.div
      key="welcome-banner"
      data-ocid="auto-design.welcome_banner"
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 360, damping: 30 }}
    >
      <div className="bg-gray-900/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-8 max-w-sm mx-4 flex flex-col items-center gap-4 text-center">
        {/* Icon ring with pulse */}
        <div className="relative">
          {/* Pulsing circles */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{
              duration: 2.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{
              duration: 2.4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
          <div className="relative w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Network className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Sparkles
              className="w-3.5 h-3.5 text-primary/70"
              aria-hidden="true"
            />
            <span className="text-[11px] font-medium text-primary/80 uppercase tracking-widest">
              AI-Assisted Planning
            </span>
          </div>
          <h1 className="text-white font-semibold text-xl leading-tight">
            Network Auto Design
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Draw a geographic area on the map to begin AI-assisted network
            planning
          </p>
        </div>

        {/* Arrow pointing to DrawControls below */}
        <motion.div
          className="flex flex-col items-center gap-1 text-white/30"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <span className="text-[11px] tracking-wide">Start below</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── AutoDesignPage ───────────────────────────────────────────────────────────

export default function AutoDesignPage() {
  const drawingMode = useAutoDesignStore((s) => s.drawingMode);

  const showBanner = drawingMode === "idle";

  return (
    <div
      data-ocid="auto-design.page"
      className="relative flex-1 overflow-hidden w-full h-full min-h-0"
      style={{ height: "100%" }}
    >
      {/* ── Full-screen map ─────────────────────────────────────────────── */}
      <Suspense fallback={<MapFallback />}>
        <LazyMapCanvas />
      </Suspense>

      {/* ── Welcome banner (idle only) ──────────────────────────────────── */}
      <AnimatePresence>{showBanner && <WelcomeBanner />}</AnimatePresence>

      {/* ── Draw controls (bottom-left, self-positioned) ────────────────── */}
      <DrawControls />

      {/* ── Parameter form panel (top-right desktop / bottom sheet mobile) */}
      <ParameterPanel />

      {/* ── Result panels (node detail + summary KPIs) ─────────────────── */}
      <ResultPanel />
    </div>
  );
}
