import { DeviceIcon } from "@/components/DeviceIcon";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useNetworkStore } from "@/store/networkStore";
import type { Device } from "@/types/network";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  MapPin,
  Signal,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface TopologyNodePanelProps {
  device: Device | null;
}

function MetricRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <span className="text-metric text-foreground">{value}</span>
    </div>
  );
}

export function TopologyNodePanel({ device }: TopologyNodePanelProps) {
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const devices = useNetworkStore((s) => s.devices);

  const connectedDevices = device
    ? device.connectedTo
        .map((cid) => devices.find((d) => d.id === cid))
        .filter(Boolean)
    : [];

  return (
    <AnimatePresence mode="wait">
      {device ? (
        <motion.div
          key={device.id}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="w-72 flex-shrink-0"
        >
          <GlassCard elevated className="overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between p-4 border-b border-border/30">
              <div className="flex items-center gap-3 min-w-0">
                <DeviceIcon
                  type={device.type}
                  status={device.status}
                  size="lg"
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-0.5">
                    {device.type}
                  </p>
                  <h3
                    className="font-display text-sm font-semibold text-foreground truncate"
                    title={device.name}
                  >
                    {device.name}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDevice(null)}
                className="p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-smooth flex-shrink-0 ml-2"
                aria-label="Close panel"
                data-ocid="topology-panel-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status */}
            <div className="px-4 py-3 flex items-center gap-2 border-b border-border/30">
              <StatusBadge
                status={device.status}
                pulse={device.status !== "active"}
              />
              {device.status === "active" && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {device.status === "faulty" && (
                <XCircle className="w-3.5 h-3.5 text-red-400" />
              )}
              {device.status === "warning" && (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              )}
            </div>

            {/* Metrics */}
            <div className="px-4 py-3 border-b border-border/30">
              <MetricRow
                icon={Signal}
                label="Signal"
                value={
                  device.signalStrength != null
                    ? `${device.signalStrength} dBm`
                    : "N/A"
                }
              />
              <MetricRow
                icon={Activity}
                label="Uptime"
                value={
                  device.uptime != null ? `${device.uptime.toFixed(1)}%` : "N/A"
                }
              />
              <MetricRow icon={Cpu} label="Ports" value={device.ports} />
              {device.location && (
                <MetricRow
                  icon={MapPin}
                  label="Location"
                  value={device.location}
                />
              )}
            </div>

            {/* Connections */}
            {connectedDevices.length > 0 && (
              <div className="p-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Connected Devices ({connectedDevices.length})
                </p>
                <div className="space-y-1.5">
                  {(connectedDevices as Device[]).map((cd) => (
                    <button
                      key={cd.id}
                      type="button"
                      onClick={() => setSelectedDevice(cd.id)}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted/50 transition-smooth text-left group"
                      data-ocid={`topology-conn-${cd.id}`}
                    >
                      <DeviceIcon type={cd.type} status={cd.status} size="sm" />
                      <span className="text-xs text-foreground/80 group-hover:text-foreground truncate font-mono">
                        {cd.name}
                      </span>
                      <StatusBadge
                        status={cd.status}
                        className="ml-auto text-[9px] py-0.5 px-1.5"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-72 flex-shrink-0"
        >
          <GlassCard className="p-6 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Click a node to inspect device details
            </p>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
