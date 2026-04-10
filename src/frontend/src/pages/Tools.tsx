import { FaultDetectionPanel } from "@/components/tools/FaultDetectionPanel";
import { PowerCalculator } from "@/components/tools/PowerCalculator";
import { Wrench } from "lucide-react";

export default function Tools() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 noc-glow">
          <Wrench className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground font-display">
            Network Tools
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Power budget analysis · Active fault detection
          </p>
        </div>
      </div>

      {/* Two-panel grid */}
      <div
        data-ocid="tools-panel-grid"
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1"
      >
        <PowerCalculator />
        <FaultDetectionPanel />
      </div>
    </div>
  );
}
