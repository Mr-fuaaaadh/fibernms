import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLAN_CONFIGS } from "@/config/features";
import { useDeviceQuota, useSubscription } from "@/hooks/useFeature";
import { cn } from "@/lib/utils";
import { Plan } from "@/types/subscription";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  CheckCircle2,
  Database,
  Download,
  FileText,
  Server,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Seeded pseudo-random (deterministic) ─────────────────────────────────────
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ─── Mock data generation (90 days) ───────────────────────────────────────────
function buildTimeSeriesData(deviceLimit: number, apiQuota: number) {
  const rand = seededRand(42);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: {
    date: string;
    label: string;
    devices: number;
    apiCalls: number;
    criticalAlerts: number;
    warningAlerts: number;
    infoAlerts: number;
    workflows: number;
  }[] = [];

  let deviceBase = Math.floor(deviceLimit * 0.35);

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dow = d.getDay(); // 0=Sun,6=Sat
    const isWeekend = dow === 0 || dow === 6;
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const date = d.toISOString().slice(0, 10);

    // Device growth: gradual +0.15% per day with small noise
    const growthNoise = 1 + (rand() - 0.45) * 0.006;
    deviceBase = Math.min(
      Math.floor(deviceBase * 1.0015 * growthNoise),
      deviceLimit,
    );

    // API: weekday peak with ±15% noise
    const apiBase = isWeekend
      ? apiQuota * 0.0095
      : apiQuota * 0.028 + apiQuota * 0.009 * (rand() - 0.5);
    const apiCalls = Math.max(
      1000,
      Math.floor(apiBase * (0.85 + rand() * 0.3)),
    );

    // Alert volumes scale with device count
    const deviceScale = deviceBase / deviceLimit;
    const criticalAlerts = Math.floor(rand() * 18 * deviceScale + 2);
    const warningAlerts = Math.floor(rand() * 55 * deviceScale + 8);
    const infoAlerts = Math.floor(rand() * 120 * deviceScale + 20);
    const workflows = isWeekend
      ? Math.floor(rand() * 8 + 1)
      : Math.floor(rand() * 40 + 12);

    days.push({
      date,
      label,
      devices: deviceBase,
      apiCalls,
      criticalAlerts,
      warningAlerts,
      infoAlerts,
      workflows,
    });
  }
  return days;
}

// ─── Plan color map ────────────────────────────────────────────────────────────
const PLAN_COLOR_MAP: Record<Plan, string> = {
  [Plan.BASIC]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  [Plan.PROFESSIONAL]: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  [Plan.ENTERPRISE]: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  [Plan.ULTRA]: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

// ─── Summary card ──────────────────────────────────────────────────────────────
interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  trendPct: number;
  progress?: number; // 0-100
  progressColor?: string;
  "data-ocid"?: string;
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  trendPct,
  progress,
  progressColor = "bg-primary",
  "data-ocid": ocid,
}: SummaryCardProps) {
  const up = trendPct >= 0;
  return (
    <Card className="glass-card border-border" data-ocid={ocid}>
      <CardContent className="pt-5 pb-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon}
            <span className="text-xs font-medium uppercase tracking-wide">
              {label}
            </span>
          </div>
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-semibold",
              up ? "text-emerald-400" : "text-rose-400",
            )}
          >
            {up ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(trendPct).toFixed(1)}%
          </span>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground font-display leading-none">
            {value}
          </p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  progressColor,
                )}
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm p-2.5 shadow-lg text-xs space-y-1 min-w-[130px]">
      <p className="text-muted-foreground font-medium mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-4">
          <span style={{ color: entry.color }} className="font-medium">
            {entry.name}
          </span>
          <span className="text-foreground font-mono">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Export Modal ──────────────────────────────────────────────────────────────
function ExportModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<"csv" | "pdf">("csv");
  const [downloading, setDownloading] = useState(false);

  function handleDownload() {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onClose();
    }, 1200);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
      data-ocid="usage-export-modal"
    >
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5 mx-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Download className="size-4 text-primary" />
            Export Usage Report
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close export modal"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Download a full usage analytics report for the selected period.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(["csv", "pdf"] as const).map((fmt) => (
            <button
              type="button"
              key={fmt}
              onClick={() => setSelected(fmt)}
              data-ocid={`usage-export-${fmt}`}
              className={cn(
                "rounded-xl border p-4 flex flex-col items-center gap-2 transition-all",
                selected === fmt
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-border/80 hover:bg-muted/30",
              )}
            >
              <FileText className="size-5" />
              <span className="text-xs font-semibold uppercase">{fmt}</span>
              <span className="text-xs opacity-70">
                {fmt === "csv" ? "Spreadsheet data" : "Formatted report"}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-3 pt-1">
          <Button
            variant="outline"
            className="flex-1 text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 text-xs"
            onClick={handleDownload}
            disabled={downloading}
            data-ocid="usage-export-confirm"
          >
            {downloading ? "Preparing…" : `Download ${selected.toUpperCase()}`}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Time-range tabs ───────────────────────────────────────────────────────────
const TIME_RANGES = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
] as const;

type TimeRange = (typeof TIME_RANGES)[number]["days"];

// ─── Data retention by plan ────────────────────────────────────────────────────
const DATA_RETENTION: Record<Plan, string> = {
  [Plan.BASIC]: "7 days",
  [Plan.PROFESSIONAL]: "30 days",
  [Plan.ENTERPRISE]: "90 days",
  [Plan.ULTRA]: "Unlimited",
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function UsageAnalytics() {
  const sub = useSubscription();
  const quota = useDeviceQuota();
  const config = PLAN_CONFIGS[sub.currentPlan];

  const [timeRange, setTimeRange] = useState<TimeRange>(30);
  const [showExport, setShowExport] = useState(false);

  const allData = buildTimeSeriesData(sub.deviceLimit, sub.apiQuota);
  const data = allData.slice(90 - timeRange);

  // ─── Summary metrics ────────────────────────────────────────────────────────
  const totalWorkflows = data.reduce((s, d) => s + d.workflows, 0);
  const totalAlerts = data.reduce(
    (s, d) => s + d.criticalAlerts + d.warningAlerts + d.infoAlerts,
    0,
  );

  // Trend: compare last half to first half of selected range
  const halfIdx = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, halfIdx);
  const secondHalf = data.slice(halfIdx);
  const avgDevicesFirst =
    firstHalf.reduce((s, d) => s + d.devices, 0) /
    Math.max(1, firstHalf.length);
  const avgDevicesSecond =
    secondHalf.reduce((s, d) => s + d.devices, 0) /
    Math.max(1, secondHalf.length);
  const deviceTrend =
    avgDevicesFirst > 0
      ? ((avgDevicesSecond - avgDevicesFirst) / avgDevicesFirst) * 100
      : 0;

  const avgApiFirst =
    firstHalf.reduce((s, d) => s + d.apiCalls, 0) /
    Math.max(1, firstHalf.length);
  const avgApiSecond =
    secondHalf.reduce((s, d) => s + d.apiCalls, 0) /
    Math.max(1, secondHalf.length);
  const apiTrend =
    avgApiFirst > 0 ? ((avgApiSecond - avgApiFirst) / avgApiFirst) * 100 : 0;

  const alertsFirst = firstHalf.reduce(
    (s, d) => s + d.criticalAlerts + d.warningAlerts + d.infoAlerts,
    0,
  );
  const alertsSecond = secondHalf.reduce(
    (s, d) => s + d.criticalAlerts + d.warningAlerts + d.infoAlerts,
    0,
  );
  const alertTrend =
    alertsFirst > 0 ? ((alertsSecond - alertsFirst) / alertsFirst) * 100 : 0;

  const wfFirst = firstHalf.reduce((s, d) => s + d.workflows, 0);
  const wfSecond = secondHalf.reduce((s, d) => s + d.workflows, 0);
  const wfTrend = wfFirst > 0 ? ((wfSecond - wfFirst) / wfFirst) * 100 : 0;

  // ─── Tick sampling for x-axis readability ──────────────────────────────────
  const tickInterval = timeRange === 7 ? 1 : timeRange === 30 ? 4 : 14;

  // ─── API bar colors ─────────────────────────────────────────────────────────
  function apiBarColor(apiCalls: number) {
    const pct = (apiCalls / (sub.apiQuota * 0.028)) * 100;
    if (pct > 90) return "#f43f5e";
    if (pct > 70) return "#f59e0b";
    return "#22c55e";
  }

  // ─── Storage breakdown (mock) ───────────────────────────────────────────────
  const storageItems = [
    {
      label: "Audit Logs",
      gb: 4.2,
      icon: <FileText className="size-3.5" />,
      color: "bg-violet-500/70",
    },
    {
      label: "Metrics Snapshots",
      gb: 12.8,
      icon: <Activity className="size-3.5" />,
      color: "bg-blue-500/70",
    },
    {
      label: "Topology Data",
      gb: 3.1,
      icon: <Server className="size-3.5" />,
      color: "bg-emerald-500/70",
    },
  ];
  const totalGb = storageItems.reduce((s, i) => s + i.gb, 0);

  // ─── Cost breakdown ─────────────────────────────────────────────────────────
  const baseCost = config.monthlyPrice;
  const apiOverage =
    sub.apiUsed > sub.apiQuota
      ? Math.ceil((sub.apiUsed - sub.apiQuota) / 10000) * 2.5
      : 0;
  const deviceOverage = quota.atLimit ? 150 : 0;
  const totalMonthly = baseCost + apiOverage + deviceOverage;

  const costItems = [
    { label: `${config.label} Plan (base)`, amount: baseCost },
    ...(apiOverage > 0
      ? [{ label: "API Overage (+calls)", amount: apiOverage }]
      : []),
    ...(deviceOverage > 0
      ? [{ label: "Device Overage", amount: deviceOverage }]
      : []),
  ];

  return (
    <div
      className="p-4 md:p-6 space-y-6 md:space-y-8 max-w-7xl mx-auto"
      data-ocid="usage-analytics-page"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display flex items-center gap-2">
            <BarChart2 className="size-6 text-primary" />
            Usage Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Resource consumption and cost overview for{" "}
            <span className="text-foreground font-medium">
              {sub.organizationName}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge
            className={cn(
              "border text-xs font-semibold",
              PLAN_COLOR_MAP[sub.currentPlan],
            )}
            data-ocid="usage-plan-badge"
          >
            {config.label} Plan
          </Badge>
          {/* Time range tabs */}
          <div
            className="flex rounded-lg border border-border overflow-hidden"
            data-ocid="usage-time-range"
          >
            {TIME_RANGES.map(({ label, days }) => (
              <button
                type="button"
                key={days}
                onClick={() => setTimeRange(days)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  timeRange === days
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40",
                )}
                data-ocid={`usage-range-${label}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          icon={<Server className="size-3.5" />}
          label="Total Devices"
          value={quota.used.toLocaleString()}
          sub={`of ${quota.limit.toLocaleString()} device limit`}
          trendPct={deviceTrend}
          progress={quota.percentUsed}
          progressColor={
            quota.nearLimit
              ? "bg-amber-500"
              : quota.atLimit
                ? "bg-rose-500"
                : "bg-primary"
          }
          data-ocid="usage-card-devices"
        />
        <SummaryCard
          icon={<Zap className="size-3.5" />}
          label="API Calls This Period"
          value={sub.apiUsed.toLocaleString()}
          sub={`of ${sub.apiQuota.toLocaleString()} quota`}
          trendPct={apiTrend}
          progress={(sub.apiUsed / sub.apiQuota) * 100}
          progressColor={
            sub.apiUsed / sub.apiQuota > 0.9
              ? "bg-rose-500"
              : sub.apiUsed / sub.apiQuota > 0.7
                ? "bg-amber-500"
                : "bg-emerald-500"
          }
          data-ocid="usage-card-api"
        />
        <SummaryCard
          icon={<Activity className="size-3.5" />}
          label="Workflows Executed"
          value={totalWorkflows.toLocaleString()}
          sub={`over last ${timeRange} days`}
          trendPct={wfTrend}
          data-ocid="usage-card-workflows"
        />
        <SummaryCard
          icon={<AlertTriangle className="size-3.5" />}
          label="Alerts Generated"
          value={totalAlerts.toLocaleString()}
          sub="across all severities"
          trendPct={alertTrend}
          data-ocid="usage-card-alerts"
        />
      </div>

      {/* ── Device Growth chart ────────────────────────────────────────────── */}
      <Card
        className="glass-card border-border"
        data-ocid="usage-chart-devices"
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            Device Growth
            <span className="ml-auto text-xs text-muted-foreground font-normal">
              Limit: {sub.deviceLimit.toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[500px] w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="deviceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                    <linearGradient id="warnGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#f59e0b"
                        stopOpacity={0.18}
                      />
                      <stop
                        offset="95%"
                        stopColor="#f59e0b"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    strokeOpacity={0.4}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    interval={tickInterval}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) =>
                      v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                    }
                    width={38}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  {/* Warning zone above 85% */}
                  <ReferenceLine
                    y={sub.deviceLimit * 0.85}
                    stroke="#f59e0b"
                    strokeDasharray="4 3"
                    strokeWidth={1.5}
                    label={{
                      value: "85% limit",
                      fontSize: 9,
                      fill: "#f59e0b",
                      position: "insideTopRight",
                    }}
                  />
                  <ReferenceLine
                    y={sub.deviceLimit}
                    stroke="#f43f5e"
                    strokeDasharray="4 3"
                    strokeWidth={1.5}
                    label={{
                      value: "Max",
                      fontSize: 9,
                      fill: "#f43f5e",
                      position: "insideTopRight",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="devices"
                    name="Devices"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#deviceGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#6366f1" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── API Usage + Alert Volume ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* API Usage BarChart */}
        <Card className="glass-card border-border" data-ocid="usage-chart-api">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              Daily API Calls
              <span className="ml-auto text-xs text-muted-foreground font-normal">
                Quota:{" "}
                {(sub.apiQuota * 0.028).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                /day
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[500px] w-full h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      strokeOpacity={0.4}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      interval={tickInterval}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: number) =>
                        v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                      }
                      width={38}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <ReferenceLine
                      y={sub.apiQuota * 0.028}
                      stroke="#f43f5e"
                      strokeDasharray="4 3"
                      strokeWidth={1.5}
                      label={{
                        value: "Daily quota",
                        fontSize: 9,
                        fill: "#f43f5e",
                        position: "insideTopRight",
                      }}
                    />
                    <Bar
                      dataKey="apiCalls"
                      name="API Calls"
                      radius={[2, 2, 0, 0]}
                      maxBarSize={14}
                    >
                      {data.map((entry) => (
                        <Cell
                          key={entry.date}
                          fill={apiBarColor(entry.apiCalls)}
                          fillOpacity={0.85}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground justify-end">
              {[
                { color: "#22c55e", label: "< 70%" },
                { color: "#f59e0b", label: "70–90%" },
                { color: "#f43f5e", label: "> 90%" },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1">
                  <span
                    className="size-2 rounded-sm inline-block"
                    style={{ background: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Volume LineChart */}
        <Card
          className="glass-card border-border"
          data-ocid="usage-chart-alerts"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-400" />
              Alert Volume by Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[500px] w-full h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      strokeOpacity={0.4}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      interval={tickInterval}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      width={30}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: 10, paddingTop: 6 }} />
                    <Line
                      type="monotone"
                      dataKey="criticalAlerts"
                      name="Critical"
                      stroke="#f43f5e"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="warningAlerts"
                      name="Warning"
                      stroke="#f59e0b"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="infoAlerts"
                      name="Info"
                      stroke="#6366f1"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Resource Breakdown ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Database className="size-4 text-primary" />
          Resource Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Storage */}
          <Card
            className="glass-card border-border"
            data-ocid="usage-resource-storage"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-bold text-foreground font-display">
                {totalGb.toFixed(1)} GB
              </p>
              <div className="space-y-2">
                {storageItems.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        {item.icon}
                        {item.label}
                      </span>
                      <span className="text-foreground font-mono">
                        {item.gb} GB
                      </span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-muted/50 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", item.color)}
                        style={{ width: `${(item.gb / totalGb) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card
            className="glass-card border-border"
            data-ocid="usage-resource-retention"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-bold text-foreground font-display">
                {DATA_RETENTION[sub.currentPlan]}
              </p>
              <p className="text-xs text-muted-foreground">
                Current plan retention window
              </p>
              <div className="space-y-1.5 pt-1">
                {(
                  [
                    Plan.BASIC,
                    Plan.PROFESSIONAL,
                    Plan.ENTERPRISE,
                    Plan.ULTRA,
                  ] as Plan[]
                ).map((p) => (
                  <div
                    key={p}
                    className="flex justify-between items-center text-xs"
                  >
                    <span
                      className={cn(
                        "font-medium",
                        p === sub.currentPlan
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {PLAN_CONFIGS[p].label}
                    </span>
                    <span
                      className={cn(
                        p === sub.currentPlan
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground",
                      )}
                    >
                      {DATA_RETENTION[p]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estimated billing */}
          <Card
            className="glass-card border-border"
            data-ocid="usage-resource-billing"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Est. This Billing Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-bold text-foreground font-display">
                ${totalMonthly.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Based on current usage
              </p>
              <div className="space-y-1.5 pt-1">
                {costItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between text-xs"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-mono">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Cost Breakdown card ─────────────────────────────────────────────── */}
      <Card
        className="glass-card border-border"
        data-ocid="usage-cost-breakdown"
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              Cost Breakdown
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-1.5 w-full sm:w-auto"
              onClick={() => setShowExport(true)}
              data-ocid="usage-export-btn"
            >
              <Download className="size-3.5" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Monthly cost */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Monthly Plan Cost
              </p>
              <p className="text-3xl font-bold text-foreground font-display">
                ${baseCost.toLocaleString()}
              </p>
              <div className="space-y-2">
                {costItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-muted-foreground text-xs">
                      {item.label}
                    </span>
                    <span className="text-foreground font-mono text-xs">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-semibold text-foreground">
                    Total / month
                  </span>
                  <span className="font-mono font-bold text-foreground">
                    ${totalMonthly.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Annual projection */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Projected Annual Spend
              </p>
              <p className="text-3xl font-bold text-foreground font-display">
                ${(totalMonthly * 12).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Based on current monthly cost × 12 months
              </p>
              <div className="rounded-lg bg-muted/30 border border-border p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Annual plan (billed monthly)
                  </span>
                  <span className="text-foreground font-mono">
                    ${(baseCost * 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Annual discount available
                  </span>
                  <span className="text-emerald-400 font-mono">
                    -${Math.floor(baseCost * 12 * 0.15).toLocaleString()}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-border flex justify-between text-xs font-semibold">
                  <span className="text-foreground">If billed annually</span>
                  <span className="text-emerald-400 font-mono">
                    ${Math.floor(baseCost * 12 * 0.85).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Overage breakdown */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Overage Summary
              </p>
              {apiOverage === 0 && deviceOverage === 0 ? (
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="size-4" />
                    <span className="text-sm font-medium">
                      No overages this period
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You are within all quota limits. No additional charges
                    apply.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {apiOverage > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-amber-400">API Overage</span>
                      <span className="font-mono text-foreground">
                        ${apiOverage.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {deviceOverage > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-rose-400">Device Overage</span>
                      <span className="font-mono text-foreground">
                        ${deviceOverage.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="rounded-lg bg-muted/30 border border-border p-3">
                <p className="text-xs text-muted-foreground mb-1">
                  Overage rate
                </p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p>API: $2.50 per 10,000 extra calls</p>
                  <p>Devices: $150/mo above plan limit</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Export Modal ────────────────────────────────────────────────────── */}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
    </div>
  );
}
