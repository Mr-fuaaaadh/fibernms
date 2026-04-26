import type {
  FaultStatusFilter,
  LayerVisibilityFault,
} from "@/hooks/useFaultVisualization";
/**
 * FaultLayerControls.tsx
 * Map control toolbar: layer toggles, status filter, and simulate fault buttons.
 */
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  RotateCcw,
  Scissors,
  Server,
  Users,
  Waypoints,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface FaultLayerControlsProps {
  layers: LayerVisibilityFault;
  onToggleLayer: (layer: keyof LayerVisibilityFault) => void;
  statusFilter: FaultStatusFilter;
  onStatusFilterChange: (filter: FaultStatusFilter) => void;
  onSimulateDeviceDown: () => void;
  onSimulateCableCut: () => void;
  onClearFaults: () => void;
  hasFault: boolean;
}

const FILTERS: { value: FaultStatusFilter; label: string; color: string }[] = [
  { value: "all", label: "All", color: "text-foreground" },
  { value: "down", label: "Down", color: "text-red-400" },
  { value: "affected", label: "Affected", color: "text-amber-400" },
  { value: "active", label: "Active", color: "text-emerald-400" },
];

export function FaultLayerControls({
  layers,
  onToggleLayer,
  statusFilter,
  onStatusFilterChange,
  onSimulateDeviceDown,
  onSimulateCableCut,
  onClearFaults,
  hasFault,
}: FaultLayerControlsProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const activeFilter =
    FILTERS.find((f) => f.value === statusFilter) ?? FILTERS[0];

  return (
    <div
      className="absolute top-0 left-0 right-0 z-[490] flex flex-wrap items-center gap-1.5 px-3 py-2 glass-elevated border-b border-border/30"
      data-ocid="fault-layer-controls"
      style={{ marginTop: "var(--fault-banner-height, 0px)" }}
    >
      {/* Layer toggles */}
      <fieldset className="flex items-center gap-1 border-0 p-0 m-0">
        <legend className="sr-only">Layer visibility</legend>
        <button
          type="button"
          onClick={() => onToggleLayer("customers")}
          data-ocid="fault.toggle.customers"
          className={cn(
            "layer-button flex items-center gap-1.5 transition-smooth border",
            layers.customers
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : "bg-muted/40 text-muted-foreground border-border/40",
          )}
          aria-pressed={layers.customers}
        >
          <Users className="w-3 h-3" />
          <span className="hidden sm:inline">Customers</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleLayer("fiber")}
          data-ocid="fault.toggle.fiber"
          className={cn(
            "layer-button flex items-center gap-1.5 transition-smooth border",
            layers.fiber
              ? "bg-primary/15 text-primary border-primary/30"
              : "bg-muted/40 text-muted-foreground border-border/40",
          )}
          aria-pressed={layers.fiber}
        >
          <Waypoints className="w-3 h-3" />
          <span className="hidden sm:inline">Fiber</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleLayer("devices")}
          data-ocid="fault.toggle.devices"
          className={cn(
            "layer-button flex items-center gap-1.5 transition-smooth border",
            layers.devices
              ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
              : "bg-muted/40 text-muted-foreground border-border/40",
          )}
          aria-pressed={layers.devices}
        >
          <Server className="w-3 h-3" />
          <span className="hidden sm:inline">Devices</span>
        </button>
      </fieldset>

      <div className="w-px h-4 bg-border/40 hidden sm:block" />

      {/* Filter dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          data-ocid="fault.filter.select"
          className="layer-button flex items-center gap-1 bg-muted/40 border border-border/40 text-muted-foreground hover:text-foreground"
        >
          <span className={cn("text-xs font-mono", activeFilter.color)}>
            {activeFilter.label}
          </span>
          <ChevronDown className="w-3 h-3" />
        </button>
        {filterOpen && (
          <div
            className="absolute top-full left-0 mt-1 z-50 glass-elevated rounded-md border border-border/50 shadow-noc-elevated min-w-[100px]"
            data-ocid="fault.filter.dropdown_menu"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => {
                  onStatusFilterChange(f.value);
                  setFilterOpen(false);
                }}
                data-ocid={`fault.filter.${f.value}`}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs font-mono hover:bg-muted/40 transition-smooth",
                  statusFilter === f.value ? "bg-muted/50" : "",
                  f.color,
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Simulate buttons */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onSimulateDeviceDown}
          data-ocid="fault.simulate.device_down_button"
          className="layer-button flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-smooth"
        >
          <Zap className="w-3 h-3" />
          <span className="hidden sm:inline text-[11px]">Device Down</span>
        </button>
        <button
          type="button"
          onClick={onSimulateCableCut}
          data-ocid="fault.simulate.cable_cut_button"
          className="layer-button flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-smooth"
        >
          <Scissors className="w-3 h-3" />
          <span className="hidden sm:inline text-[11px]">Cable Cut</span>
        </button>
        {hasFault && (
          <button
            type="button"
            onClick={onClearFaults}
            data-ocid="fault.simulate.clear_button"
            className="layer-button flex items-center gap-1.5 bg-muted/40 text-muted-foreground border border-border/40 hover:text-foreground transition-smooth"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px]">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
