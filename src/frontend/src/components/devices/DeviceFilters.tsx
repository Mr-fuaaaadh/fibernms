import { cn } from "@/lib/utils";
import type { DeviceStatus, DeviceType } from "@/types/network";
import { Filter, X } from "lucide-react";

const DEVICE_TYPES: DeviceType[] = ["OLT", "ONT", "Splitter", "JJB", "Switch"];
const DEVICE_STATUSES: DeviceStatus[] = ["active", "faulty", "warning"];

const TYPE_COLORS: Record<DeviceType, string> = {
  OLT: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
  ONT: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  Splitter: "text-violet-400 border-violet-400/40 bg-violet-400/10",
  JJB: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  Switch: "text-blue-400 border-blue-400/40 bg-blue-400/10",
};

const STATUS_COLORS: Record<DeviceStatus, string> = {
  active: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  faulty: "text-red-400 border-red-400/40 bg-red-400/10",
  warning: "text-amber-400 border-amber-400/40 bg-amber-400/10",
};

interface DeviceFiltersProps {
  selectedTypes: DeviceType[];
  selectedStatuses: DeviceStatus[];
  onTypeToggle: (type: DeviceType) => void;
  onStatusToggle: (status: DeviceStatus) => void;
  onClearAll: () => void;
}

export function DeviceFilters({
  selectedTypes,
  selectedStatuses,
  onTypeToggle,
  onStatusToggle,
  onClearAll,
}: DeviceFiltersProps) {
  const hasFilters = selectedTypes.length > 0 || selectedStatuses.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border/40">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono uppercase tracking-widest shrink-0">
        <Filter className="w-3 h-3" />
        Filter
      </span>

      {/* Type filters */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-muted-foreground/60 font-mono">
          TYPE:
        </span>
        {DEVICE_TYPES.map((type) => {
          const active = selectedTypes.includes(type);
          return (
            <button
              key={type}
              type="button"
              onClick={() => onTypeToggle(type)}
              data-ocid={`filter-type-${type.toLowerCase()}`}
              className={cn(
                "px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wide border transition-smooth",
                active
                  ? TYPE_COLORS[type]
                  : "text-muted-foreground border-border/40 bg-transparent hover:border-border",
              )}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div className="w-px h-4 bg-border/40 shrink-0" />

      {/* Status filters */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-muted-foreground/60 font-mono">
          STATUS:
        </span>
        {DEVICE_STATUSES.map((status) => {
          const active = selectedStatuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => onStatusToggle(status)}
              data-ocid={`filter-status-${status}`}
              className={cn(
                "px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wide border transition-smooth",
                active
                  ? STATUS_COLORS[status]
                  : "text-muted-foreground border-border/40 bg-transparent hover:border-border",
              )}
            >
              {status}
            </button>
          );
        })}
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={onClearAll}
          data-ocid="filter-clear-all"
          className="ml-auto flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-smooth"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}
