import { GlassCard } from "@/components/GlassCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, PenLine, Route, X } from "lucide-react";

interface DrawToolbarProps {
  drawMode: boolean;
  routeType: "backbone" | "distribution" | "drop";
  waypointCount: number;
  onToggleDrawMode: () => void;
  onRouteTypeChange: (type: "backbone" | "distribution" | "drop") => void;
  onFinish: () => void;
  onCancel: () => void;
}

const ROUTE_TYPE_LABELS = {
  backbone: "Backbone",
  distribution: "Distribution",
  drop: "Drop",
};

export function DrawToolbar({
  drawMode,
  routeType,
  waypointCount,
  onToggleDrawMode,
  onRouteTypeChange,
  onFinish,
  onCancel,
}: DrawToolbarProps) {
  return (
    <GlassCard
      className="flex items-center gap-2 px-3 py-2 pointer-events-auto"
      data-ocid="draw-toolbar"
    >
      <Route className="w-4 h-4 text-primary" />
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mr-1">
        Routes
      </span>

      {drawMode ? (
        <>
          <Select
            value={routeType}
            onValueChange={(v) =>
              onRouteTypeChange(v as "backbone" | "distribution" | "drop")
            }
          >
            <SelectTrigger
              className="h-7 w-32 text-xs border-border/60 bg-card/50"
              data-ocid="route-type-select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(["backbone", "distribution", "drop"] as const).map((t) => (
                <SelectItem key={t} value={t} className="text-xs">
                  {ROUTE_TYPE_LABELS[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={onFinish}
            disabled={waypointCount < 2}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-mono bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
            data-ocid="draw-finish-btn"
          >
            <CheckCircle2 className="w-3 h-3" />
            Finish ({waypointCount}pts)
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-mono bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25 transition-smooth"
            data-ocid="draw-cancel-btn"
          >
            <X className="w-3 h-3" />
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onToggleDrawMode}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 transition-smooth"
          data-ocid="draw-route-btn"
        >
          <PenLine className="w-3.5 h-3.5" />
          Draw Route
        </button>
      )}
    </GlassCard>
  );
}
