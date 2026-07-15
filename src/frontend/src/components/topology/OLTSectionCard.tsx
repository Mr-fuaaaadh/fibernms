import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Diamond,
  Server,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type {
  NodeStatus,
  TopoOLT,
  TopoONT,
  TopoSplitter,
} from "./topologyData";

// ─── Status config (light theme) ─────────────────────────────────────────────
export const STATUS_CFG: Record<
  NodeStatus,
  { label: string; dot: string; bg: string; border: string; text: string }
> = {
  online: {
    label: "Online",
    dot: "#22c55e",
    bg: "#f0fdf4",
    border: "#86efac",
    text: "#166534",
  },
  warning: {
    label: "Warning",
    dot: "#f59e0b",
    bg: "#fffbeb",
    border: "#fcd34d",
    text: "#92400e",
  },
  critical: {
    label: "Critical",
    dot: "#ef4444",
    bg: "#fef2f2",
    border: "#fca5a5",
    text: "#991b1b",
  },
  offline: {
    label: "Offline",
    dot: "#94a3b8",
    bg: "#f8fafc",
    border: "#cbd5e1",
    text: "#475569",
  },
};

// ─── Selected node discriminated union ───────────────────────────────────────
export type SelectedNode =
  | { kind: "olt"; data: TopoOLT }
  | { kind: "splitter"; data: TopoSplitter }
  | { kind: "ont"; data: TopoONT };

// ─── Status badge ─────────────────────────────────────────────────────────────
export function StatusBadge({
  status,
  pulse,
}: { status: NodeStatus; pulse?: boolean }) {
  const cfg = STATUS_CFG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold flex-shrink-0 border"
      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${pulse && status === "critical" ? "animate-pulse" : ""}`}
        style={{
          background: cfg.dot,
          boxShadow:
            pulse && status === "critical" ? `0 0 5px ${cfg.dot}` : undefined,
        }}
      />
      {cfg.label}
    </span>
  );
}

// ─── Alarm badge ──────────────────────────────────────────────────────────────
export function AlarmBadge({
  count,
  pulse,
}: { count: number; pulse?: boolean }) {
  if (count === 0) return null;
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold font-mono flex-shrink-0 border ${pulse ? "animate-pulse" : ""}`}
      style={{
        background: "#fef2f2",
        borderColor: "#fca5a5",
        color: "#dc2626",
      }}
    >
      {count}
    </span>
  );
}

// ─── Port utilization bar ─────────────────────────────────────────────────────
function PortBar({ used, total }: { used: number; total: number }) {
  const pct = total > 0 ? (used / total) * 100 : 0;
  const color = pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#22c55e";
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: "#e2e8f0" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-[10px] font-mono flex-shrink-0"
        style={{ color: "#64748b" }}
      >
        {used}/{total}
      </span>
    </div>
  );
}

// ─── ONT row ─────────────────────────────────────────────────────────────────
interface ONTRowProps {
  ont: TopoONT;
  index: number;
  isSelected: boolean;
  onSelect: (node: SelectedNode) => void;
  lineStatus: NodeStatus;
}
function ONTRow({ ont, index, isSelected, onSelect, lineStatus }: ONTRowProps) {
  const lineColor =
    lineStatus === "critical"
      ? "#fca5a5"
      : lineStatus === "warning"
        ? "#fcd34d"
        : "#bbf7d0";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="relative pl-5"
    >
      <div
        className="absolute left-0 top-1/2 w-4 h-px"
        style={{ background: lineColor }}
      />
      <button
        type="button"
        onClick={() => onSelect({ kind: "ont", data: ont })}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ")
            onSelect({ kind: "ont", data: ont });
        }}
        data-ocid={`ont-row.item.${index + 1}`}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150 group min-h-[44px] border"
        style={{
          background: isSelected ? "#eef2ff" : "#f8fafc",
          borderColor: isSelected ? "#c7d2fe" : "#e2e8f0",
        }}
      >
        <div
          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "#ecfeff", border: "1px solid #a5f3fc" }}
        >
          <Wifi className="w-3 h-3" style={{ color: "#0891b2" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-xs font-mono font-medium truncate group-hover:text-indigo-700 transition-colors"
              style={{ color: "#334155" }}
            >
              {ont.name}
            </span>
            {ont.alarms.length > 0 && (
              <AlarmBadge
                count={ont.alarms.length}
                pulse={ont.status === "critical"}
              />
            )}
          </div>
          <span
            className="text-[10px] font-mono truncate block"
            style={{ color: "#94a3b8" }}
          >
            {ont.customerName}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          <span
            className="text-[10px] font-mono"
            style={{
              color:
                ont.signalLevel >= -20
                  ? "#16a34a"
                  : ont.signalLevel >= -26
                    ? "#d97706"
                    : "#dc2626",
            }}
          >
            {ont.signalLevel} dBm
          </span>
        </div>
        <StatusBadge status={ont.status} />
        <span
          className="text-[10px] font-mono hidden lg:block flex-shrink-0 w-16 text-right"
          style={{ color: "#94a3b8" }}
        >
          {ont.lastSeen}
        </span>
      </button>
    </motion.div>
  );
}

// ─── Splitter row ─────────────────────────────────────────────────────────────
interface SplitterRowProps {
  splitter: TopoSplitter;
  index: number;
  isSelected: boolean;
  onSelect: (node: SelectedNode) => void;
  selectedId: string | null;
  oltStatus: NodeStatus;
}
export function SplitterRow({
  splitter,
  index,
  isSelected,
  onSelect,
  selectedId,
  oltStatus,
}: SplitterRowProps) {
  const [expanded, setExpanded] = useState(false);
  const alarmCount =
    splitter.alarms.length +
    splitter.onts.reduce((a, o) => a + o.alarms.length, 0);
  const hasCritical =
    splitter.status === "critical" ||
    splitter.onts.some((o) => o.status === "critical");
  const lineColor =
    oltStatus === "critical"
      ? "#fca5a5"
      : oltStatus === "warning"
        ? "#fcd34d"
        : "#bbf7d0";

  return (
    <div className="relative pl-4">
      <div
        className="absolute left-0 top-5 w-3 h-px"
        style={{ background: lineColor }}
      />
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.05 }}
        className="mb-0.5"
      >
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer group transition-all duration-150 min-h-[44px] border"
          style={{
            background: isSelected ? "#fff7ed" : "#fafafa",
            borderColor: isSelected ? "#fed7aa" : "#e2e8f0",
          }}
          onClick={() => onSelect({ kind: "splitter", data: splitter })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              onSelect({ kind: "splitter", data: splitter });
          }}
          data-ocid={`splitter-row.item.${index + 1}`}
        >
          <button
            type="button"
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ color: "#94a3b8" }}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            aria-label={expanded ? "Collapse ONTs" : "Expand ONTs"}
            data-ocid={`splitter-expand.${index + 1}`}
          >
            {expanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
          <div
            className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
            style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
          >
            <Diamond className="w-3 h-3" style={{ color: "#ea580c" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-xs font-mono font-semibold truncate group-hover:text-orange-700 transition-colors"
                style={{ color: "#334155" }}
              >
                {splitter.name}
              </span>
              {alarmCount > 0 && (
                <AlarmBadge count={alarmCount} pulse={hasCritical} />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="text-[10px] font-mono"
                style={{ color: "#94a3b8" }}
              >
                {splitter.ip}
              </span>
              <span
                className="text-[10px] font-mono"
                style={{ color: "#cbd5e1" }}
              >
                ·
              </span>
              <span
                className="text-[10px] font-mono"
                style={{ color: "#94a3b8" }}
              >
                {splitter.onts.length} ONTs
              </span>
            </div>
          </div>
          <div className="hidden md:block w-24 flex-shrink-0">
            <PortBar used={splitter.portsUsed} total={splitter.portCount} />
          </div>
          <StatusBadge status={splitter.status} pulse />
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden pl-4 flex flex-col gap-0.5 mb-1"
          >
            {splitter.onts.map((ont, i) => (
              <ONTRow
                key={ont.id}
                ont={ont}
                index={i}
                isSelected={selectedId === ont.id}
                onSelect={onSelect}
                lineStatus={splitter.status}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── OLT Section Card ─────────────────────────────────────────────────────────
interface OLTSectionCardProps {
  olt: TopoOLT;
  index: number;
  selectedId: string | null;
  onSelect: (node: SelectedNode) => void;
}

export function OLTSectionCard({
  olt,
  index,
  selectedId,
  onSelect,
}: OLTSectionCardProps) {
  const [expanded, setExpanded] = useState(true);
  const isSelected = selectedId === olt.id;
  const alarmCount =
    olt.alarms.length +
    olt.splitters.reduce(
      (a, s) =>
        a + s.alarms.length + s.onts.reduce((b, o) => b + o.alarms.length, 0),
      0,
    );
  const hasCritical =
    olt.status === "critical" ||
    olt.splitters.some(
      (s) =>
        s.status === "critical" || s.onts.some((o) => o.status === "critical"),
    );
  const portPct = olt.portTotal > 0 ? (olt.portUsed / olt.portTotal) * 100 : 0;
  const portColor =
    portPct > 90 ? "#ef4444" : portPct > 70 ? "#f59e0b" : "#22c55e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="rounded-xl overflow-hidden flex flex-col border"
      style={{
        background: "#ffffff",
        borderColor: isSelected ? "#c7d2fe" : "#e2e8f0",
        boxShadow: isSelected
          ? "0 0 0 2px #c7d2fe, 0 4px 16px rgba(79,70,229,0.08)"
          : "0 1px 6px rgba(0,0,0,0.06)",
      }}
      data-ocid={`olt-section-card.item.${index + 1}`}
    >
      {/* OLT Header */}
      <button
        type="button"
        className="px-4 py-3 flex flex-col gap-3 cursor-pointer select-none text-left w-full"
        style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
        onClick={() => onSelect({ kind: "olt", data: olt })}
      >
        {/* Row 1: icon + name + status + alarm + expand */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#eef2ff", border: "1px solid #c7d2fe" }}
          >
            <Server className="w-4 h-4" style={{ color: "#4f46e5" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-sm font-mono font-bold truncate"
                style={{ color: "#0f172a" }}
              >
                {olt.name}
              </span>
              {alarmCount > 0 && (
                <AlarmBadge count={alarmCount} pulse={hasCritical} />
              )}
            </div>
            <span
              className="text-[11px] font-mono"
              style={{ color: "#64748b" }}
            >
              {olt.ip} · {olt.firmware}
            </span>
          </div>
          <StatusBadge status={olt.status} pulse />
          <button
            type="button"
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 hover:bg-slate-100"
            style={{ color: "#94a3b8" }}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            aria-label={expanded ? "Collapse OLT" : "Expand OLT"}
            data-ocid={`olt-expand.${index + 1}`}
          >
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            {
              label: "Uptime",
              value: `${olt.uptime.toFixed(2)}%`,
              color:
                olt.uptime >= 99
                  ? "#16a34a"
                  : olt.uptime >= 95
                    ? "#d97706"
                    : "#dc2626",
            },
            {
              label: "Ports",
              value: `${olt.portUsed}/${olt.portTotal}`,
              color: portColor,
            },
            {
              label: "↓ DS",
              value: `${olt.downstreamGbps} Gbps`,
              color: "#0891b2",
            },
            {
              label: "↑ US",
              value: `${olt.upstreamGbps} Gbps`,
              color: "#4f46e5",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 px-2 py-1.5 rounded-lg border"
              style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
            >
              <span
                className="text-[9px] font-mono uppercase tracking-widest"
                style={{ color: "#94a3b8" }}
              >
                {label}
              </span>
              <span className="text-sm font-mono font-bold" style={{ color }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <PortBar used={olt.portUsed} total={olt.portTotal} />

        {olt.alarms.length > 0 && (
          <div className="flex flex-col gap-1">
            {olt.alarms.slice(0, 2).map((alarm, i) => (
              <div
                key={`olt-alarm-${olt.id}-${i}`}
                className="flex items-start gap-2 px-2 py-1.5 rounded-lg border"
                style={{
                  background:
                    alarm.severity === "critical"
                      ? "#fef2f2"
                      : alarm.severity === "major"
                        ? "#fffbeb"
                        : "#f8fafc",
                  borderColor:
                    alarm.severity === "critical"
                      ? "#fca5a5"
                      : alarm.severity === "major"
                        ? "#fcd34d"
                        : "#e2e8f0",
                }}
              >
                <AlertCircle
                  className="w-3 h-3 flex-shrink-0 mt-0.5"
                  style={{
                    color:
                      alarm.severity === "critical"
                        ? "#dc2626"
                        : alarm.severity === "major"
                          ? "#d97706"
                          : "#94a3b8",
                  }}
                />
                <span
                  className="text-[10px] font-mono leading-tight"
                  style={{ color: "#475569" }}
                >
                  {alarm.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </button>

      {/* Splitter tree */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-3 py-3 flex flex-col gap-1"
              style={{ background: "#ffffff" }}
            >
              {olt.splitters.map((spl, i) => (
                <SplitterRow
                  key={spl.id}
                  splitter={spl}
                  index={i}
                  isSelected={selectedId === spl.id}
                  onSelect={onSelect}
                  selectedId={selectedId}
                  oltStatus={olt.status}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
