import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type AlertSeverity,
  MOCK_SYSTEM_ALERTS,
  type SystemAlert,
} from "@/data/superAdminMockData";
import {
  Activity,
  AlertTriangle,
  Bell,
  BellOff,
  CheckCircle2,
  ChevronRight,
  Clock,
  RefreshCcw,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type LocalAlertStatus = "active" | "resolved" | "acknowledged";

interface LocalAlert extends SystemAlert {
  localStatus: LocalAlertStatus;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  localResolvedAt?: string;
}

interface ServiceStatus {
  name: string;
  status: "Operational" | "Degraded" | "Outage";
  uptime: number;
  responseTime: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SEV_COLORS: Record<
  AlertSeverity,
  { badge: string; band: string; text: string }
> = {
  critical: {
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    band: "bg-red-500",
    text: "text-red-400",
  },
  high: {
    badge: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    band: "bg-orange-500",
    text: "text-orange-400",
  },
  medium: {
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    band: "bg-amber-500",
    text: "text-amber-400",
  },
  low: {
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    band: "bg-blue-400",
    text: "text-blue-400",
  },
};

const PLATFORM_SERVICES: ServiceStatus[] = [
  {
    name: "API Gateway",
    status: "Operational",
    uptime: 99.97,
    responseTime: 42,
  },
  {
    name: "Auth Service",
    status: "Degraded",
    uptime: 98.12,
    responseTime: 380,
  },
  {
    name: "Billing Service",
    status: "Operational",
    uptime: 99.91,
    responseTime: 88,
  },
  {
    name: "NOC Data Pipeline",
    status: "Operational",
    uptime: 99.85,
    responseTime: 120,
  },
  {
    name: "WebSocket Service",
    status: "Operational",
    uptime: 99.72,
    responseTime: 18,
  },
  {
    name: "Database (Primary)",
    status: "Operational",
    uptime: 99.999,
    responseTime: 9,
  },
  {
    name: "Search Index",
    status: "Degraded",
    uptime: 97.44,
    responseTime: 620,
  },
  { name: "AI Inference", status: "Outage", uptime: 91.2, responseTime: 0 },
];

const SERVICE_STATUS_COLORS: Record<string, string> = {
  Operational: "text-emerald-400",
  Degraded: "text-amber-400",
  Outage: "text-red-400",
};

const SERVICE_STATUS_BG: Record<string, string> = {
  Operational: "bg-emerald-500/15 border-emerald-500/30",
  Degraded: "bg-amber-500/15 border-amber-500/30",
  Outage: "bg-red-500/15 border-red-500/30",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function fmtDuration(start: string, end: string): string {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function buildTrendData(alerts: LocalAlert[]) {
  const days: Record<string, Record<AlertSeverity, number>> = {};
  const now = Date.now();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 86_400_000);
    const key = d.toLocaleDateString("en-US", { weekday: "short" });
    days[key] = { critical: 0, high: 0, medium: 0, low: 0 };
  }
  for (const alert of alerts) {
    const d = new Date(alert.startedAt);
    const key = d.toLocaleDateString("en-US", { weekday: "short" });
    if (days[key] && alert.severity in days[key]) {
      days[key][alert.severity]++;
    }
  }
  return Object.entries(days).map(([day, sev]) => ({ day, ...sev }));
}

// ─── Alert Card ────────────────────────────────────────────────────────────────

function AlertCard({
  alert,
  onAcknowledge,
  onResolve,
}: {
  alert: LocalAlert;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
}) {
  const sc = SEV_COLORS[alert.severity];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      className="relative"
    >
      <GlassCard className="flex overflow-hidden p-0">
        <div className={`w-1 flex-shrink-0 rounded-l-xl ${sc.band}`} />
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge
                  className={`text-xs px-2 py-0 border ${sc.badge} uppercase`}
                >
                  {alert.severity}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0 border-border font-mono"
                >
                  {alert.affectedService}
                </Badge>
                {alert.localStatus === "acknowledged" && (
                  <Badge className="text-xs px-2 py-0 bg-violet-500/15 text-violet-400 border-violet-500/30">
                    Acknowledged
                  </Badge>
                )}
              </div>
              <h3 className="text-sm font-semibold text-foreground font-display">
                {alert.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {alert.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">
                {fmtRelative(alert.startedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            {alert.localStatus !== "acknowledged" && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-border gap-1"
                onClick={() => onAcknowledge(alert.id)}
                data-ocid={`ack-alert-${alert.id}`}
              >
                <BellOff className="w-3.5 h-3.5" />
                Acknowledge
              </Button>
            )}
            <Button
              size="sm"
              className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white gap-1"
              onClick={() => onResolve(alert.id)}
              data-ocid={`resolve-alert-${alert.id}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Resolve
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-muted-foreground gap-1 ml-auto"
            >
              View Details <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SystemAlerts() {
  const [alerts, setAlerts] = useState<LocalAlert[]>(() =>
    MOCK_SYSTEM_ALERTS.map((a) => ({
      ...a,
      localStatus: a.status as LocalAlertStatus,
    })),
  );

  const activeAlerts = useMemo(
    () =>
      alerts.filter(
        (a) => a.localStatus === "active" || a.localStatus === "acknowledged",
      ),
    [alerts],
  );
  const resolvedAlerts = useMemo(
    () => alerts.filter((a) => a.localStatus === "resolved"),
    [alerts],
  );
  const trendData = useMemo(() => buildTrendData(alerts), [alerts]);

  const criticalCount = activeAlerts.filter(
    (a) => a.severity === "critical",
  ).length;
  const highCount = activeAlerts.filter((a) => a.severity === "high").length;
  const mediumCount = activeAlerts.filter(
    (a) => a.severity === "medium",
  ).length;
  const lowCount = activeAlerts.filter((a) => a.severity === "low").length;

  const resolvedToday = useMemo(() => {
    const today = new Date().toDateString();
    return resolvedAlerts.filter(
      (a) =>
        a.localResolvedAt &&
        new Date(a.localResolvedAt).toDateString() === today,
    ).length;
  }, [resolvedAlerts]);

  const avgMttr = useMemo(() => {
    const timed = resolvedAlerts.filter((a) => a.localResolvedAt);
    if (!timed.length) return "—";
    const avg =
      timed.reduce(
        (sum, a) =>
          sum +
          (new Date(a.localResolvedAt!).getTime() -
            new Date(a.startedAt).getTime()),
        0,
      ) / timed.length;
    return `${Math.round(avg / 60_000)}m`;
  }, [resolvedAlerts]);

  const acknowledge = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              localStatus: "acknowledged" as LocalAlertStatus,
              acknowledgedAt: new Date().toISOString(),
              acknowledgedBy: "Super Admin",
            }
          : a,
      ),
    );
    toast.success("Alert acknowledged");
  }, []);

  const resolve = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              localStatus: "resolved" as LocalAlertStatus,
              localResolvedAt: new Date().toISOString(),
            }
          : a,
      ),
    );
    toast.success("Alert resolved");
  }, []);

  function acknowledgeAll() {
    const count = activeAlerts.filter((a) => a.localStatus === "active").length;
    setAlerts((prev) =>
      prev.map((a) =>
        a.localStatus === "active"
          ? {
              ...a,
              localStatus: "acknowledged" as LocalAlertStatus,
              acknowledgedAt: new Date().toISOString(),
              acknowledgedBy: "Super Admin",
            }
          : a,
      ),
    );
    toast.success(`${count} alerts acknowledged`);
  }

  return (
    <div className="p-4 md:p-6 space-y-5 md:space-y-8 max-w-[1600px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
            <Bell className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold text-foreground">
                System Alerts
              </h1>
              {activeAlerts.length > 0 && (
                <Badge className="bg-red-500/15 text-red-400 border-red-500/30">
                  {activeAlerts.length} active
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground font-mono tracking-wider">
              Platform-wide alert monitoring
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-border gap-2 h-8 text-xs"
          onClick={acknowledgeAll}
          data-ocid="acknowledge-all-alerts"
        >
          <BellOff className="w-3.5 h-3.5" />
          Acknowledge All
        </Button>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Alerts",
            value: activeAlerts.length,
            icon: AlertTriangle,
            color: "bg-red-500/15 border-red-500/30 text-red-400",
          },
          {
            label: "Critical Alerts",
            value: criticalCount,
            icon: ShieldAlert,
            color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
          },
          {
            label: "Resolved Today",
            value: resolvedToday,
            icon: CheckCircle2,
            color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
          },
          {
            label: "Mean Time to Resolve",
            value: avgMttr,
            icon: Clock,
            color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
          },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <GlassCard className="p-5 flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-2xl font-display font-bold text-foreground mt-0.5">
                  {value}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Severity Breakdown + Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Severity breakdown */}
        <GlassCard className="p-5">
          <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Severity Breakdown
          </h3>
          <div className="space-y-3">
            {(
              [
                {
                  label: "Critical",
                  count: criticalCount,
                  color: "bg-red-500",
                  textColor: "text-red-400",
                },
                {
                  label: "High",
                  count: highCount,
                  color: "bg-orange-500",
                  textColor: "text-orange-400",
                },
                {
                  label: "Medium",
                  count: mediumCount,
                  color: "bg-amber-500",
                  textColor: "text-amber-400",
                },
                {
                  label: "Low",
                  count: lowCount,
                  color: "bg-blue-400",
                  textColor: "text-blue-400",
                },
              ] as const
            ).map(({ label, count, color, textColor }) => {
              const total = activeAlerts.length || 1;
              return (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={`font-semibold ${textColor}`}>
                      {label}
                    </span>
                    <span className="text-muted-foreground">
                      {count} / {activeAlerts.length}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${(count / total) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-xs">
            <span className="text-muted-foreground">Total Active</span>
            <span className="font-semibold text-foreground">
              {activeAlerts.length}
            </span>
          </div>
        </GlassCard>

        {/* Trend Chart */}
        <GlassCard className="p-5 col-span-1 lg:col-span-2">
          <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Alert Trends — Last 7 Days
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trendData} barSize={8}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="critical"
                name="Critical"
                fill="#ef4444"
                stackId="s"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="high"
                name="High"
                fill="#f97316"
                stackId="s"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="medium"
                name="Medium"
                fill="#f59e0b"
                stackId="s"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="low"
                name="Low"
                fill="#60a5fa"
                stackId="s"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Service Health Grid */}
      <section>
        <h2 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Service Health
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PLATFORM_SERVICES.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard
                className={`p-4 border ${SERVICE_STATUS_BG[svc.status]}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Activity
                    className={`w-4 h-4 ${SERVICE_STATUS_COLORS[svc.status]}`}
                  />
                  <Badge
                    className={`text-xs px-2 py-0 border ${SERVICE_STATUS_BG[svc.status]} ${SERVICE_STATUS_COLORS[svc.status]}`}
                  >
                    {svc.status}
                  </Badge>
                </div>
                <p className="text-xs font-semibold text-foreground font-display">
                  {svc.name}
                </p>
                <div className="mt-2 space-y-0.5">
                  <p className="text-xs text-muted-foreground">
                    Uptime:{" "}
                    <span className="text-foreground font-mono">
                      {svc.uptime}%
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Latency:{" "}
                    <span
                      className={`font-mono ${svc.status === "Outage" ? "text-red-400" : "text-foreground"}`}
                    >
                      {svc.status === "Outage"
                        ? "N/A"
                        : `${svc.responseTime}ms`}
                    </span>
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Active Alerts Panel */}
      <section>
        <h2 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Active Alerts ({activeAlerts.length})
        </h2>
        <div className="space-y-3" data-ocid="active-alerts-list">
          {activeAlerts.length === 0 ? (
            <GlassCard className="p-10 text-center">
              <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">
                All Systems Operational
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                No active alerts detected
              </p>
            </GlassCard>
          ) : (
            activeAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={acknowledge}
                onResolve={resolve}
              />
            ))
          )}
        </div>
      </section>

      {/* Alert History Table */}
      <section>
        <h2 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Resolved Alert History ({resolvedAlerts.length})
        </h2>
        <GlassCard className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
                  Severity
                </th>
                <th className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
                  Started
                </th>
                <th className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
                  Resolved
                </th>
                <th className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {resolvedAlerts.slice(0, 15).map((alert, i) => {
                const sc = SEV_COLORS[alert.severity];
                const resolvedAt =
                  alert.localResolvedAt ?? alert.resolvedAt ?? "";
                return (
                  <tr
                    key={alert.id}
                    className={`border-b border-border/30 last:border-0 ${i % 2 === 0 ? "bg-muted/10" : ""}`}
                  >
                    <td className="px-4 py-2.5 text-xs text-foreground max-w-[220px] truncate">
                      {alert.title}
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-xs font-mono text-muted-foreground">
                        {alert.affectedService}
                      </code>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge
                        className={`text-xs px-2 py-0 border ${sc.badge} uppercase`}
                      >
                        {alert.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground font-mono">
                      {fmtRelative(alert.startedAt)}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground font-mono">
                      {resolvedAt ? fmtRelative(resolvedAt) : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-mono">
                      {resolvedAt ? (
                        <span className="text-emerald-400">
                          {fmtDuration(alert.startedAt, resolvedAt)}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      </section>

      {/* Refresh hint */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <RefreshCcw className="w-3.5 h-3.5" />
        <span>
          Alert states are local to this session — refresh to reset to mock data
        </span>
      </div>
    </div>
  );
}
