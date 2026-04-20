import { AlertsPanel } from "@/components/monitoring/AlertsPanel";
import {
  type SignalDataPoint,
  SignalLineChart,
} from "@/components/monitoring/SignalLineChart";
import { StatCard } from "@/components/monitoring/StatCard";
import { StatusPieChart } from "@/components/monitoring/StatusPieChart";
import { mockAlerts, mockDevices } from "@/data/mockData";
import { useNetworkStore } from "@/store/networkStore";
import { useNavigate } from "@tanstack/react-router";
import { MonitorDot, Radio, Server, Wifi, WifiOff } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

// ── Helpers ────────────────────────────────────────────────────────────────

function buildSignalHistory(): SignalDataPoint[] {
  const NAMES = ["OLT-CORE-01", "OLT-EDGE-02", "OLT-METRO-03"];
  const BASE_SIGNALS = [-18, -22, -20];

  return Array.from({ length: 24 }, (_, i) => {
    const h = i.toString().padStart(2, "0");
    const point: SignalDataPoint = { time: `${h}:00` };
    for (let idx = 0; idx < NAMES.length; idx++) {
      point[NAMES[idx]] = +(
        BASE_SIGNALS[idx] +
        (Math.random() * 4 - 2)
      ).toFixed(1);
    }
    return point;
  });
}

function addSignalNoise(
  data: SignalDataPoint[],
  oltNames: string[],
): SignalDataPoint[] {
  return data.map((point) => {
    const next: SignalDataPoint = { time: point.time };
    for (const name of oltNames) {
      const prev = point[name] as number;
      next[name] = +(prev + (Math.random() * 1.2 - 0.6)).toFixed(1);
    }
    return next;
  });
}

const OLT_NAMES = ["OLT-CORE-01", "OLT-EDGE-02", "OLT-METRO-03"];

const PIE_COLORS = {
  Online: "oklch(0.68 0.22 142)",
  Offline: "oklch(0.62 0.28 22)",
  Warning: "oklch(0.70 0.25 55)",
};

// ── Component ──────────────────────────────────────────────────────────────

export default function Monitoring() {
  const navigate = useNavigate();
  const { setSelectedDevice } = useNetworkStore();

  // Base counts from mock data
  const baseOnline = mockDevices.filter((d) => d.status === "active").length;
  const baseOffline = mockDevices.filter((d) => d.status === "faulty").length;
  const baseWarning = mockDevices.filter((d) => d.status === "warning").length;
  const baseOlts = mockDevices.filter((d) => d.type === "OLT").length;
  const baseOnts = mockDevices.filter((d) => d.type === "ONT").length;

  // Live state — slightly randomized each tick
  const [stats, setStats] = useState({
    olts: baseOlts,
    onts: baseOnts,
    online: baseOnline,
    offline: baseOffline,
    warning: baseWarning,
  });

  const [signalData, setSignalData] = useState(buildSignalHistory);

  const tickLive = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      online: Math.max(1, prev.online + Math.round(Math.random() * 2 - 1)),
      offline: Math.max(0, prev.offline + Math.round(Math.random() * 2 - 1)),
    }));
    setSignalData((prev) => addSignalNoise(prev, OLT_NAMES));
  }, []);

  useEffect(() => {
    const id = setInterval(tickLive, 5000);
    return () => clearInterval(id);
  }, [tickLive]);

  const handleAlertClick = useCallback(
    (deviceId: string) => {
      setSelectedDevice(deviceId);
      navigate({ to: "/" });
    },
    [navigate, setSelectedDevice],
  );

  const pieData = [
    { name: "Online", value: stats.online, color: PIE_COLORS.Online },
    { name: "Offline", value: stats.offline, color: PIE_COLORS.Offline },
    { name: "Warning", value: stats.warning, color: PIE_COLORS.Warning },
  ];

  const totalDevices = stats.online + stats.offline + stats.warning;

  return (
    <div
      className="p-4 md:p-6 space-y-4 md:space-y-6"
      data-ocid="monitoring-page"
    >
      {/* Page header */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MonitorDot size={20} className="text-primary" />
        <h1 className="text-xl font-display font-bold text-foreground tracking-tight">
          Network Monitoring
        </h1>
        <div className="flex items-center gap-2 ml-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.68_0.22_142)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.68_0.22_142)]" />
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Live
          </span>
        </div>
      </motion.div>

      {/* Stat cards — 2x2 grid */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="stat-cards-grid"
      >
        <StatCard
          icon={Server}
          label="Total OLTs"
          value={stats.olts}
          index={0}
        />
        <StatCard
          icon={Radio}
          label="Total ONTs"
          value={stats.onts}
          index={1}
        />
        <StatCard
          icon={Wifi}
          label="Online Devices"
          value={stats.online}
          accentClass="text-[oklch(0.68_0.22_142)]"
          glowClass="noc-glow-ok"
          index={2}
        />
        <StatCard
          icon={WifiOff}
          label="Offline Devices"
          value={stats.offline}
          accentClass="text-destructive"
          glowClass="noc-glow-fault"
          index={3}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Signal line chart — wider */}
        <motion.div
          className="glass-card rounded-2xl p-5 lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          data-ocid="signal-chart-card"
        >
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Signal Strength — 24h
            </h2>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
              RX POWER (dBm) · TOP 3 OLTs
            </p>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[500px] h-52">
              <SignalLineChart data={signalData} oltNames={OLT_NAMES} />
            </div>
          </div>
        </motion.div>

        {/* Status pie chart */}
        <motion.div
          className="glass-card rounded-2xl p-5 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          data-ocid="pie-chart-card"
        >
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-foreground">
              Device Status
            </h2>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
              DISTRIBUTION · ALL DEVICES
            </p>
          </div>
          <div className="h-56">
            <StatusPieChart data={pieData} total={totalDevices} />
          </div>
        </motion.div>
      </div>

      {/* Alerts panel */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        data-ocid="alerts-section"
      >
        <AlertsPanel alerts={mockAlerts} onAlertClick={handleAlertClick} />
      </motion.div>
    </div>
  );
}
