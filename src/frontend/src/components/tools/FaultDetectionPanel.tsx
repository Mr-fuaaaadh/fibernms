import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { mockAlerts } from "@/data/mockData";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, DeviceType } from "@/types/network";
import { useRouter } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Cpu,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ISSUE_TYPE_MAP: Record<DeviceType, string> = {
  OLT: "No Response",
  ONT: "Signal Loss",
  Splitter: "Port Fault",
  JJB: "Junction Error",
  Switch: "Link Down",
};

function relativeTime(ts: number): string {
  const diffMs = Date.now() - ts;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
  return `${Math.floor(diffHr / 24)} day${Math.floor(diffHr / 24) !== 1 ? "s" : ""} ago`;
}

function getAlertTimestampForDevice(deviceId: string): number {
  const alert = mockAlerts.find((a) => a.deviceId === deviceId);
  return alert ? alert.timestamp : Date.now() - 1000 * 60 * 120;
}

interface FaultCardProps {
  device: Device;
  index: number;
  onSelect: () => void;
}

function FaultCard({ device, index, onSelect }: FaultCardProps) {
  const issueType = ISSUE_TYPE_MAP[device.type] ?? "Unknown Fault";
  const timestamp = getAlertTimestampForDevice(device.id);

  return (
    <motion.button
      type="button"
      data-ocid={`fault-card-${device.id}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ delay: index * 0.05, duration: 0.28, ease: "easeOut" }}
      onClick={onSelect}
      className="w-full text-left rounded-xl border p-4 flex flex-col gap-2.5 cursor-pointer transition-smooth group"
      style={{
        background: "oklch(0.62 0.28 22 / 0.06)",
        borderColor: "oklch(0.62 0.28 22 / 0.35)",
        borderLeft: "3px solid oklch(0.62 0.28 22 / 0.8)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "oklch(0.62 0.28 22 / 0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "oklch(0.62 0.28 22 / 0.06)";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <Cpu
              className="w-3 h-3 shrink-0"
              style={{ color: "oklch(0.72 0.28 22)" }}
            />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {device.id}
            </span>
          </div>
          <span className="text-sm font-semibold text-foreground truncate">
            {device.name}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border"
            style={{
              background: "oklch(0.62 0.28 22 / 0.15)",
              borderColor: "oklch(0.62 0.28 22 / 0.5)",
              color: "oklch(0.72 0.28 22)",
            }}
          >
            CRITICAL
          </Badge>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </div>
      </div>

      {/* Issue type */}
      <div className="flex items-center gap-1.5">
        <AlertTriangle
          className="w-3 h-3 shrink-0"
          style={{ color: "oklch(0.72 0.28 22)" }}
        />
        <span className="text-xs text-foreground/70">{issueType}</span>
      </div>

      {/* Bottom row — timestamps */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/60">
        <div className="flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          <span>{relativeTime(timestamp)}</span>
        </div>
        <span>Last active: {relativeTime(timestamp + 1000 * 60 * 8)}</span>
        {device.signalStrength !== undefined && (
          <span
            className="ml-auto"
            style={{ color: "oklch(0.72 0.28 22 / 0.9)" }}
          >
            {device.signalStrength} dBm
          </span>
        )}
      </div>
    </motion.button>
  );
}

export function FaultDetectionPanel() {
  const devices = useNetworkStore((s) => s.devices);
  const setSelectedDevice = useNetworkStore((s) => s.setSelectedDevice);
  const router = useRouter();

  const [faultDevices, setFaultDevices] = useState<Device[]>([]);

  // Refresh every 5s — devices from store subscription triggers re-derive too
  useEffect(() => {
    setFaultDevices(devices.filter((d) => d.status === "faulty"));
  }, [devices]);

  useEffect(() => {
    const id = setInterval(() => {
      setFaultDevices(
        useNetworkStore.getState().devices.filter((d) => d.status === "faulty"),
      );
    }, 5_000);
    return () => clearInterval(id);
  }, []);

  function handleSelectFault(deviceId: string) {
    setSelectedDevice(deviceId);
    router.navigate({ to: "/" });
  }

  return (
    <GlassCard elevated className="p-6 flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl noc-glow-fault"
            style={{ background: "oklch(0.62 0.28 22 / 0.12)" }}
          >
            <AlertTriangle
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.28 22)" }}
            />
          </div>
          <h2 className="text-sm font-semibold tracking-widest uppercase text-foreground/80 font-display">
            Active Faults
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {faultDevices.length > 0 ? (
            <Badge
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border"
              style={{
                background: "oklch(0.62 0.28 22 / 0.15)",
                borderColor: "oklch(0.62 0.28 22 / 0.5)",
                color: "oklch(0.72 0.28 22)",
                boxShadow: "0 0 10px oklch(0.62 0.28 22 / 0.25)",
              }}
            >
              {faultDevices.length} FAULT{faultDevices.length !== 1 ? "S" : ""}
            </Badge>
          ) : (
            <Badge
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border"
              style={{
                background: "oklch(0.62 0.22 142 / 0.12)",
                borderColor: "oklch(0.62 0.22 142 / 0.45)",
                color: "oklch(0.72 0.22 142)",
              }}
            >
              ALL CLEAR
            </Badge>
          )}
        </div>
      </div>

      {/* Fault list */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto noc-scrollbar min-h-0">
        <AnimatePresence mode="popLayout">
          {faultDevices.length === 0 ? (
            <motion.div
              key="no-faults"
              data-ocid="fault-panel-empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 py-12 rounded-xl border"
              style={{
                background: "oklch(0.62 0.22 142 / 0.05)",
                borderColor: "oklch(0.62 0.22 142 / 0.25)",
              }}
            >
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: "oklch(0.62 0.22 142 / 0.12)",
                  boxShadow: "0 0 20px oklch(0.62 0.22 142 / 0.2)",
                }}
              >
                <CheckCircle
                  className="w-8 h-8"
                  style={{ color: "oklch(0.72 0.22 142)" }}
                />
              </div>
              <div className="text-center space-y-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.72 0.22 142)" }}
                >
                  All systems operational
                </p>
                <p className="text-xs text-muted-foreground">
                  No active faults detected
                </p>
              </div>
            </motion.div>
          ) : (
            faultDevices.map((device, i) => (
              <FaultCard
                key={device.id}
                device={device}
                index={i}
                onSelect={() => handleSelectFault(device.id)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      {faultDevices.length > 0 && (
        <p className="text-[10px] text-muted-foreground/50 text-center font-mono">
          Click a fault card to view on map · Auto-refreshes every 5s
        </p>
      )}
    </GlassCard>
  );
}
