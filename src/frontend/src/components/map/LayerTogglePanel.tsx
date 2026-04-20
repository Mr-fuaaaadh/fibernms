import { GlassCard } from "@/components/GlassCard";
import { useNetworkStore } from "@/store/networkStore";
import { Layers } from "lucide-react";

const LAYERS = [
  { key: "backbone" as const, label: "Backbone", color: "#00e5ff" },
  { key: "distribution" as const, label: "Distribution", color: "#448aff" },
  { key: "drop" as const, label: "Drop", color: "#69ff47" },
];

export function LayerTogglePanel() {
  const { layerVisibility, toggleLayer } = useNetworkStore();

  return (
    <GlassCard
      className="p-3 min-w-[180px] pointer-events-auto"
      data-ocid="layer-toggle-panel"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <Layers className="w-3.5 h-3.5 text-primary" />
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          Layers
        </span>
      </div>
      <div className="space-y-1.5">
        {LAYERS.map(({ key, label, color }) => {
          const active = layerVisibility[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleLayer(key)}
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-smooth hover:bg-muted/30"
              data-ocid={`layer-toggle-${key}`}
            >
              <span
                className="h-2.5 w-2.5 rounded-sm flex-shrink-0 transition-opacity"
                style={{
                  background: color,
                  boxShadow: active ? `0 0 6px ${color}` : "none",
                  opacity: active ? 1 : 0.2,
                }}
              />
              <span
                className={`font-mono text-xs transition-smooth ${
                  active ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                {label}
              </span>
              <span
                className={`ml-auto h-3.5 w-6 rounded-full border transition-smooth ${
                  active
                    ? "border-primary/60 bg-primary/20"
                    : "border-border/40 bg-muted/20"
                }`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                    active
                      ? "translate-x-3 bg-primary"
                      : "translate-x-0 bg-muted-foreground/40"
                  }`}
                  style={{ marginTop: "1px", marginLeft: "1px" }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
