// Enterprise-grade node detail panel — light theme edition.
// Cisco DNA Center / SolarWinds inspired. Clean white panel, minimal borders.

import {
  Activity,
  AlertCircle,
  BarChart2,
  Cpu,
  Diamond,
  Eye,
  MapPin,
  Network,
  Pencil,
  RefreshCw,
  Server,
  Terminal,
  Wifi,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import type { SelectedNode } from "./OLTSectionCard";
import { AlarmBadge, StatusBadge } from "./OLTSectionCard";
import type { TopoOLT, TopoONT, TopoSplitter } from "./topologyData";

// ─── Micro sparkline ─────────────────────────────────────────────────────────
function makeSparkData(base: number, variance: number, len = 24) {
  let v = base;
  return Array.from({ length: len }, (_, i) => {
    v = Math.max(
      base - variance,
      Math.min(base + variance, v + (Math.random() - 0.5) * variance * 0.7),
    );
    return { t: i, v: Math.round(v * 10) / 10 };
  });
}

function Sparkline({
  base,
  variance,
  color,
  unit,
  label,
}: {
  base: number;
  variance: number;
  color: string;
  unit: string;
  label: string;
}) {
  const data = useMemo(() => makeSparkData(base, variance), [base, variance]);
  const last = data[data.length - 1].v;
  return (
    <div
      className="rounded-lg px-3 py-2.5 border"
      style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-[10px] font-mono uppercase tracking-widest"
          style={{ color: "#94a3b8" }}
        >
          {label}
        </span>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {last} {unit}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={36}>
        <LineChart
          data={data}
          margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
        >
          <YAxis domain={["auto", "auto"]} hide />
          <ReTooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 10,
              fontFamily: "monospace",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            itemStyle={{ color }}
            labelStyle={{ display: "none" }}
            formatter={(v: number) => [`${v} ${unit}`, label]}
          />
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Metric row ───────────────────────────────────────────────────────────────
function MetricRow({
  label,
  value,
  color,
}: { label: string; value: string; color?: string }) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 border-b last:border-b-0"
      style={{ borderColor: "#f1f5f9" }}
    >
      <span
        className="text-[10px] font-mono uppercase tracking-wide"
        style={{ color: "#94a3b8" }}
      >
        {label}
      </span>
      <span
        className="text-xs font-mono text-right"
        style={{ color: color ?? "#334155" }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────
function ActionBtn({
  icon: Icon,
  label,
  ocid,
  color,
}: {
  icon: React.ElementType;
  label: string;
  ocid: string;
  color?: string;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      aria-label={label}
      className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-lg transition-all duration-150 min-h-[52px] flex-1 group border hover:bg-slate-50"
      style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
    >
      <Icon
        className="w-3.5 h-3.5 transition-colors"
        style={{ color: color ?? "#64748b" }}
      />
      <span
        className="text-[9px] font-mono group-hover:text-slate-700 transition-colors"
        style={{ color: "#94a3b8" }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── OLT detail panel ────────────────────────────────────────────────────────
function OLTPanel({ data, onClose }: { data: TopoOLT; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "metrics" | "alarms">("overview");
  const totalAlarms =
    data.alarms.length +
    data.splitters.reduce(
      (a, s) =>
        a + s.alarms.length + s.onts.reduce((b, o) => b + o.alarms.length, 0),
      0,
    );

  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        name={data.name}
        type="OLT"
        ip={data.ip}
        location={data.location}
        firmware={data.firmware}
        status={data.status}
        alarmCount={totalAlarms}
        onClose={onClose}
      />
      <PanelTabs tab={tab} setTab={setTab} alarmCount={totalAlarms} />
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarColor: "#cbd5e1 transparent" }}
      >
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="ov"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2"
            >
              <div
                className="rounded-lg overflow-hidden border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <MetricRow label="IP Address" value={data.ip} />
                <MetricRow label="MAC" value={data.mac} />
                <MetricRow label="Firmware" value={data.firmware} />
                <MetricRow label="Region" value={data.region} />
                <MetricRow
                  label="Uptime"
                  value={`${data.uptime.toFixed(2)}%`}
                  color={
                    data.uptime >= 99
                      ? "#16a34a"
                      : data.uptime >= 95
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Ports Used"
                  value={`${data.portUsed} / ${data.portTotal}`}
                />
                <MetricRow
                  label="Downstream"
                  value={`${data.downstreamGbps} Gbps`}
                  color="#0891b2"
                />
                <MetricRow
                  label="Upstream"
                  value={`${data.upstreamGbps} Gbps`}
                  color="#4f46e5"
                />
                <MetricRow
                  label="Latency"
                  value={`${data.latency} ms`}
                  color={
                    data.latency < 10
                      ? "#16a34a"
                      : data.latency < 30
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Packet Loss"
                  value={`${data.packetLoss.toFixed(2)}%`}
                  color={
                    data.packetLoss < 0.1
                      ? "#16a34a"
                      : data.packetLoss < 1
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Splitters"
                  value={String(data.splitters.length)}
                />
                <div className="flex items-center justify-between px-3 py-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-wide"
                    style={{ color: "#94a3b8" }}
                  >
                    Location
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" style={{ color: "#94a3b8" }} />
                    <span
                      className="text-[10px] font-mono text-right max-w-[160px] truncate"
                      style={{ color: "#475569" }}
                    >
                      {data.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {tab === "metrics" && (
            <motion.div
              key="mt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2"
            >
              <Sparkline
                base={data.downstreamGbps}
                variance={data.downstreamGbps * 0.15}
                color="#0891b2"
                unit="Gbps"
                label="Downstream BW"
              />
              <Sparkline
                base={data.upstreamGbps}
                variance={data.upstreamGbps * 0.15}
                color="#4f46e5"
                unit="Gbps"
                label="Upstream BW"
              />
              <Sparkline
                base={data.latency}
                variance={data.latency * 0.5}
                color="#16a34a"
                unit="ms"
                label="Latency"
              />
              <Sparkline
                base={data.packetLoss}
                variance={0.05}
                color="#d97706"
                unit="%"
                label="Packet Loss"
              />
            </motion.div>
          )}
          {tab === "alarms" && (
            <motion.div
              key="al"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-1.5"
            >
              <AlarmList alarms={data.alarms} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PanelActions type="OLT" />
    </div>
  );
}

// ─── Splitter detail panel ────────────────────────────────────────────────────
function SplitterPanel({
  data,
  onClose,
}: { data: TopoSplitter; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "metrics" | "alarms">("overview");
  const totalAlarms =
    data.alarms.length + data.onts.reduce((a, o) => a + o.alarms.length, 0);

  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        name={data.name}
        type="Splitter"
        ip={data.ip}
        location={data.location}
        firmware={data.firmware}
        status={data.status}
        alarmCount={totalAlarms}
        onClose={onClose}
      />
      <PanelTabs tab={tab} setTab={setTab} alarmCount={totalAlarms} />
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarColor: "#cbd5e1 transparent" }}
      >
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="ov"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2"
            >
              <div
                className="rounded-lg overflow-hidden border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <MetricRow label="IP Address" value={data.ip} />
                <MetricRow label="MAC" value={data.mac} />
                <MetricRow label="Firmware" value={data.firmware} />
                <MetricRow
                  label="Uptime"
                  value={`${data.uptime.toFixed(2)}%`}
                  color={
                    data.uptime >= 99
                      ? "#16a34a"
                      : data.uptime >= 95
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Ports"
                  value={`${data.portsUsed} / ${data.portCount} used`}
                />
                <MetricRow
                  label="Connected ONTs"
                  value={String(data.onts.length)}
                />
                <MetricRow
                  label="Latency"
                  value={`${data.latency} ms`}
                  color={
                    data.latency < 10
                      ? "#16a34a"
                      : data.latency < 30
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Packet Loss"
                  value={`${data.packetLoss.toFixed(2)}%`}
                  color={
                    data.packetLoss < 0.1
                      ? "#16a34a"
                      : data.packetLoss < 1
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <div className="flex items-center justify-between px-3 py-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-wide"
                    style={{ color: "#94a3b8" }}
                  >
                    Location
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" style={{ color: "#94a3b8" }} />
                    <span
                      className="text-[10px] font-mono text-right max-w-[160px] truncate"
                      style={{ color: "#475569" }}
                    >
                      {data.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {tab === "metrics" && (
            <motion.div
              key="mt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2"
            >
              <Sparkline
                base={data.latency}
                variance={data.latency * 0.6}
                color="#0891b2"
                unit="ms"
                label="Latency"
              />
              <Sparkline
                base={data.packetLoss}
                variance={0.05}
                color="#d97706"
                unit="%"
                label="Packet Loss"
              />
              <Sparkline
                base={data.uptime}
                variance={0.5}
                color="#16a34a"
                unit="%"
                label="Uptime (rolling)"
              />
            </motion.div>
          )}
          {tab === "alarms" && (
            <motion.div
              key="al"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-1.5"
            >
              <AlarmList alarms={data.alarms} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PanelActions type="Splitter" />
    </div>
  );
}

// ─── ONT detail panel ─────────────────────────────────────────────────────────
function ONTPanel({ data, onClose }: { data: TopoONT; onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "metrics" | "alarms">("overview");

  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        name={data.name}
        type="ONT"
        ip={data.ip}
        location={data.customerName}
        firmware={data.firmware}
        status={data.status}
        alarmCount={data.alarms.length}
        onClose={onClose}
      />
      <PanelTabs tab={tab} setTab={setTab} alarmCount={data.alarms.length} />
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarColor: "#cbd5e1 transparent" }}
      >
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div
              key="ov"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2"
            >
              <div
                className="rounded-lg overflow-hidden border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <MetricRow
                  label="Customer"
                  value={data.customerName}
                  color="#0f172a"
                />
                <MetricRow label="IP Address" value={data.ip} />
                <MetricRow label="MAC" value={data.mac} />
                <MetricRow label="Firmware" value={data.firmware} />
                <MetricRow
                  label="Signal Level"
                  value={`${data.signalLevel} dBm`}
                  color={
                    data.signalLevel >= -20
                      ? "#16a34a"
                      : data.signalLevel >= -26
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Uptime"
                  value={`${data.uptime.toFixed(2)}%`}
                  color={
                    data.uptime >= 99
                      ? "#16a34a"
                      : data.uptime >= 95
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Latency"
                  value={`${data.latency} ms`}
                  color={
                    data.latency < 10
                      ? "#16a34a"
                      : data.latency < 30
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow
                  label="Packet Loss"
                  value={`${data.packetLoss.toFixed(2)}%`}
                  color={
                    data.packetLoss < 0.1
                      ? "#16a34a"
                      : data.packetLoss < 1
                        ? "#d97706"
                        : "#dc2626"
                  }
                />
                <MetricRow label="Last Seen" value={data.lastSeen} />
              </div>
              {/* Signal quality bar */}
              <div
                className="rounded-lg px-3 py-2.5 border"
                style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: "#94a3b8" }}
                  >
                    Signal Quality
                  </span>
                  <span
                    className="text-[10px] font-mono font-semibold"
                    style={{
                      color:
                        data.signalLevel >= -20
                          ? "#16a34a"
                          : data.signalLevel >= -26
                            ? "#d97706"
                            : "#dc2626",
                    }}
                  >
                    {data.signalLevel >= -20
                      ? "Excellent"
                      : data.signalLevel >= -26
                        ? "Fair"
                        : "Poor"}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "#e2e8f0" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(0, Math.min(100, ((data.signalLevel + 35) / 20) * 100))}%`,
                      background:
                        data.signalLevel >= -20
                          ? "#22c55e"
                          : data.signalLevel >= -26
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: "#cbd5e1" }}
                  >
                    -35 dBm
                  </span>
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: "#cbd5e1" }}
                  >
                    -15 dBm
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          {tab === "metrics" && (
            <motion.div
              key="mt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-2"
            >
              <Sparkline
                base={data.signalLevel}
                variance={2}
                color="#0891b2"
                unit="dBm"
                label="Signal Level"
              />
              <Sparkline
                base={data.latency}
                variance={data.latency * 0.5}
                color="#16a34a"
                unit="ms"
                label="Latency"
              />
              <Sparkline
                base={data.packetLoss}
                variance={0.05}
                color="#d97706"
                unit="%"
                label="Packet Loss"
              />
            </motion.div>
          )}
          {tab === "alarms" && (
            <motion.div
              key="al"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-3 flex flex-col gap-1.5"
            >
              <AlarmList alarms={data.alarms} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PanelActions type="ONT" />
    </div>
  );
}

// ─── Shared panel sub-components ──────────────────────────────────────────────
const DEVICE_ICON: Record<string, React.ElementType> = {
  OLT: Server,
  Splitter: Diamond,
  ONT: Wifi,
};
const DEVICE_COLOR: Record<string, string> = {
  OLT: "#4f46e5",
  Splitter: "#ea580c",
  ONT: "#0891b2",
};
const DEVICE_BG: Record<string, string> = {
  OLT: "#eef2ff",
  Splitter: "#fff7ed",
  ONT: "#ecfeff",
};
const DEVICE_BORDER: Record<string, string> = {
  OLT: "#c7d2fe",
  Splitter: "#fed7aa",
  ONT: "#a5f3fc",
};

function PanelHeader({
  name,
  type,
  ip,
  location,
  firmware,
  status,
  alarmCount,
  onClose,
}: {
  name: string;
  type: string;
  ip: string;
  location: string;
  firmware: string;
  status: import("./topologyData").NodeStatus;
  alarmCount: number;
  onClose: () => void;
}) {
  const Icon = DEVICE_ICON[type] ?? Server;
  const color = DEVICE_COLOR[type] ?? "#4f46e5";
  const bg = DEVICE_BG[type] ?? "#eef2ff";
  const border = DEVICE_BORDER[type] ?? "#c7d2fe";

  return (
    <div
      className="flex-shrink-0 px-4 py-3 border-b"
      style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
          style={{ background: bg, borderColor: border }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border"
              style={{ background: bg, color, borderColor: border }}
            >
              {type}
            </span>
            {alarmCount > 0 && (
              <AlarmBadge count={alarmCount} pulse={status === "critical"} />
            )}
          </div>
          <h3
            className="text-sm font-mono font-bold truncate mt-0.5"
            style={{ color: "#0f172a" }}
          >
            {name}
          </h3>
          <p
            className="text-[10px] font-mono truncate"
            style={{ color: "#94a3b8" }}
          >
            {ip} · {firmware}
          </p>
          {location && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin
                className="w-2.5 h-2.5 flex-shrink-0"
                style={{ color: "#94a3b8" }}
              />
              <span
                className="text-[10px] font-mono truncate"
                style={{ color: "#64748b" }}
              >
                {location}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0 hover:bg-slate-100"
          style={{ color: "#94a3b8" }}
          aria-label="Close panel"
          data-ocid="topology-panel-close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="mt-2.5">
        <StatusBadge status={status} pulse />
      </div>
    </div>
  );
}

type PanelTab = "overview" | "metrics" | "alarms";

function PanelTabs({
  tab,
  setTab,
  alarmCount,
}: {
  tab: PanelTab;
  setTab: (t: PanelTab) => void;
  alarmCount: number;
}) {
  const tabs: { key: PanelTab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: Cpu },
    { key: "metrics", label: "Metrics", icon: BarChart2 },
    {
      key: "alarms",
      label: `Alarms${alarmCount > 0 ? ` (${alarmCount})` : ""}`,
      icon: AlertCircle,
    },
  ];
  return (
    <div
      className="flex-shrink-0 flex border-b"
      style={{ borderColor: "#e2e8f0", background: "#ffffff" }}
    >
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            data-ocid={`panel-tab-${t.key}`}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-[10px] font-mono transition-all duration-150"
            style={{
              color: active ? "#4338ca" : "#94a3b8",
              borderBottom: active
                ? "2px solid #4338ca"
                : "2px solid transparent",
              background: active ? "#f5f3ff" : "transparent",
              fontWeight: active ? 600 : 400,
            }}
          >
            <Icon className="w-3 h-3" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function AlarmList({
  alarms,
}: {
  alarms: { severity: "critical" | "major" | "minor"; message: string }[];
}) {
  if (alarms.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-2 py-8 text-center"
        data-ocid="panel-alarms.empty_state"
      >
        <Activity className="w-8 h-8" style={{ color: "#cbd5e1" }} />
        <p className="text-xs font-mono" style={{ color: "#94a3b8" }}>
          No active alarms
        </p>
      </div>
    );
  }
  const SEV: Record<string, { text: string; bg: string; border: string }> = {
    critical: { text: "#dc2626", bg: "#fef2f2", border: "#fca5a5" },
    major: { text: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
    minor: { text: "#64748b", bg: "#f8fafc", border: "#e2e8f0" },
  };
  return (
    <>
      {alarms.map((alarm, i) => {
        const s = SEV[alarm.severity] ?? SEV.minor;
        return (
          <div
            key={`alarm-${alarm.severity}-${alarm.message.slice(0, 20)}-${i}`}
            className="flex items-start gap-2.5 px-3 py-2 rounded-lg border"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <AlertCircle
              className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
              style={{ color: s.text }}
            />
            <div className="flex-1 min-w-0">
              <span
                className="text-[9px] font-mono uppercase tracking-widest mb-0.5 block font-bold"
                style={{ color: s.text }}
              >
                {alarm.severity}
              </span>
              <p
                className="text-[11px] font-mono leading-tight"
                style={{ color: "#475569" }}
              >
                {alarm.message}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

function PanelActions({ type: _type }: { type: string }) {
  return (
    <div
      className="flex-shrink-0 p-3 border-t"
      style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}
    >
      <p
        className="text-[9px] font-mono uppercase tracking-widest mb-2 px-1"
        style={{ color: "#94a3b8" }}
      >
        Actions
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        <ActionBtn
          icon={RefreshCw}
          label="Ping"
          ocid="panel-action-ping"
          color="#16a34a"
        />
        <ActionBtn
          icon={Terminal}
          label="SSH"
          ocid="panel-action-ssh"
          color="#0891b2"
        />
        <ActionBtn
          icon={Eye}
          label="Map"
          ocid="panel-action-map"
          color="#4f46e5"
        />
        <ActionBtn
          icon={Pencil}
          label="Edit"
          ocid="panel-action-edit"
          color="#ea580c"
        />
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyPanel() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center border"
        style={{ background: "#eef2ff", borderColor: "#c7d2fe" }}
      >
        <Network className="w-7 h-7" style={{ color: "#6366f1" }} />
      </div>
      <div>
        <h3
          className="text-sm font-mono font-semibold mb-1.5"
          style={{ color: "#334155" }}
        >
          No Device Selected
        </h3>
        <p
          className="text-xs font-mono leading-relaxed max-w-[180px] mx-auto"
          style={{ color: "#94a3b8" }}
        >
          Click any node in the topology to view device details
        </p>
      </div>
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg border"
        style={{ background: "#eef2ff", borderColor: "#c7d2fe" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-[10px] font-mono" style={{ color: "#4338ca" }}>
          Topology ready · select a node
        </span>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
interface TopologyNodePanelProps {
  node: SelectedNode | null;
  onClose: () => void;
  isMobileSheet?: boolean;
}

export function TopologyNodePanel({
  node,
  onClose,
  isMobileSheet = false,
}: TopologyNodePanelProps) {
  return (
    <div
      className={
        isMobileSheet ? "w-full" : "h-full overflow-hidden flex flex-col"
      }
      style={{
        background: "#ffffff",
        borderLeft: isMobileSheet ? "none" : "1px solid #e2e8f0",
        width: isMobileSheet ? undefined : 320,
        minWidth: isMobileSheet ? undefined : 320,
      }}
    >
      <AnimatePresence mode="wait">
        {node ? (
          <motion.div
            key={`${node.kind}-${node.data.id}`}
            initial={{
              opacity: 0,
              x: isMobileSheet ? 0 : 20,
              y: isMobileSheet ? 20 : 0,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: isMobileSheet ? 0 : 20,
              y: isMobileSheet ? 20 : 0,
            }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className={
              isMobileSheet ? "" : "h-full flex flex-col overflow-hidden"
            }
          >
            {node.kind === "olt" && (
              <OLTPanel data={node.data} onClose={onClose} />
            )}
            {node.kind === "splitter" && (
              <SplitterPanel data={node.data} onClose={onClose} />
            )}
            {node.kind === "ont" && (
              <ONTPanel data={node.data} onClose={onClose} />
            )}
          </motion.div>
        ) : (
          !isMobileSheet && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <EmptyPanel />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
