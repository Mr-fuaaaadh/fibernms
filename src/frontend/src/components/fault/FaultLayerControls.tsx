/**
 * FaultLayerControls.tsx
 * Pill toggle switches for layer visibility (Customers / Fiber / Devices),
 * each with live count badge and icon. Status filter dropdown and simulate buttons.
 */
import type {
  FaultStatusFilter,
  LayerVisibilityFault,
} from "@/hooks/useFaultVisualization";
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
  customerCount?: number;
  fiberCount?: number;
  deviceCount?: number;
}

const FILTERS: {
  value: FaultStatusFilter;
  label: string;
  color: string;
  dot: string;
}[] = [
  {
    value: "all",
    label: "All",
    color: "text-foreground",
    dot: "bg-foreground/40",
  },
  { value: "down", label: "Down", color: "text-red-400", dot: "bg-red-400" },
  {
    value: "affected",
    label: "Affected",
    color: "text-amber-400",
    dot: "bg-amber-400",
  },
  {
    value: "active",
    label: "Active",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
  },
];

interface PillToggleProps {
  active: boolean;
  onToggle: () => void;
  label: string;
  count?: number;
  Icon: React.ElementType;
  activeColor: string;
  activeTextColor: string;
  activeBg: string;
  ocid: string;
}

function PillToggle({
  active,
  onToggle,
  label,
  count,
  Icon,
  activeColor,
  activeTextColor,
  activeBg,
  ocid,
}: PillToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      data-ocid={ocid}
      className={cn(
        "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full text-xs font-medium transition-smooth border",
        active
          ? `${activeBg} ${activeTextColor} border-transparent`
          : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50 hover:text-foreground",
      )}
    >
      {/* Pill switch indicator */}
      <div
        className={cn(
          "relative flex-shrink-0 h-4 w-8 rounded-full transition-all duration-200",
          active ? activeColor : "bg-muted-foreground/20",
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-card shadow-xs transition-transform duration-200",
            active ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </div>
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span className="hidden sm:inline">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "hidden sm:inline text-[10px] px-1.5 py-0.5 rounded-full font-bold",
            active ? "bg-card/30" : "bg-muted/40",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function FaultLayerControls({
  layers,
  onToggleLayer,
  statusFilter,
  onStatusFilterChange,
  onSimulateDeviceDown,
  onSimulateCableCut,
  onClearFaults,
  hasFault,
  customerCount,
  fiberCount,
  deviceCount,
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
      {/* Layer pill toggles */}
      <fieldset className="flex items-center gap-1.5 border-0 p-0 m-0">
        <legend className="sr-only">Layer visibility</legend>
        <PillToggle
          active={layers.customers}
          onToggle={() => onToggleLayer("customers")}
          label="Customers"
          count={customerCount}
          Icon={Users}
          activeColor="bg-emerald-500"
          activeTextColor="text-emerald-400"
          activeBg="bg-emerald-500/15"
          ocid="fault.toggle.customers"
        />
        <PillToggle
          active={layers.fiber}
          onToggle={() => onToggleLayer("fiber")}
          label="Fiber"
          count={fiberCount}
          Icon={Waypoints}
          activeColor="bg-primary"
          activeTextColor="text-primary"
          activeBg="bg-primary/15"
          ocid="fault.toggle.fiber"
        />
        <PillToggle
          active={layers.devices}
          onToggle={() => onToggleLayer("devices")}
          label="Devices"
          count={deviceCount}
          Icon={Server}
          activeColor="bg-blue-500"
          activeTextColor="text-blue-400"
          activeBg="bg-blue-500/15"
          ocid="fault.toggle.devices"
        />
      </fieldset>

      <div className="w-px h-5 bg-border/40 hidden sm:block" />

      {/* Filter dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          data-ocid="fault.filter.select"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-muted/30 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full flex-shrink-0",
              activeFilter.dot,
            )}
          />
          <span className={cn("font-mono", activeFilter.color)}>
            {activeFilter.label}
          </span>
          <ChevronDown
            className={cn(
              "w-3 h-3 transition-transform duration-200",
              filterOpen && "rotate-180",
            )}
          />
        </button>
        {filterOpen && (
          <div
            className="absolute top-full left-0 mt-1.5 z-50 glass-elevated rounded-lg border border-border/50 shadow-noc-elevated min-w-[120px] py-1 overflow-hidden"
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
                  "w-full text-left px-3 py-2 text-xs font-mono flex items-center gap-2 hover:bg-muted/40 transition-smooth",
                  statusFilter === f.value ? "bg-muted/50" : "",
                  f.color,
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    f.dot,
                  )}
                />
                {f.label}
                {statusFilter === f.value && (
                  <span className="ml-auto text-[10px] opacity-60">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Simulate & control buttons */}
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
            className="layer-button flex items-center gap-1.5 bg-muted/40 text-muted-foreground border border-border/40 hover:text-foreground hover:bg-muted/60 transition-smooth"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px]">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
