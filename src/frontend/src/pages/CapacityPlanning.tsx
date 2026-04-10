import { GlassCard } from "@/components/GlassCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNetworkStore } from "@/store/networkStore";
import type { CapacityRecord } from "@/types/network";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Clock,
  HardDrive,
  Lightbulb,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const REGIONS = [
  "All Regions",
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "South America",
];

function utilColor(pct: number): string {
  if (pct >= 90) return "#ef4444";
  if (pct >= 75) return "#f97316";
  if (pct >= 60) return "#eab308";
  return "#22c55e";
}

function priorityLevel(months: number): "Critical" | "High" | "Medium" | "Low" {
  if (months <= 3) return "Critical";
  if (months <= 6) return "High";
  if (months <= 12) return "Medium";
  return "Low";
}

const PRIORITY_COLORS: Record<string, string> = {
  Critical: "text-red-400 bg-red-500/15 border-red-500/30",
  High: "text-orange-400 bg-orange-500/15 border-orange-500/30",
  Medium: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  Low: "text-green-400 bg-green-500/15 border-green-500/30",
};

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  delay,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <GlassCard className="p-5 flex gap-4 items-start">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
            {label}
          </p>
          <p className="font-display text-2xl font-bold text-foreground">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

type SortKey = "routeName" | "currentUtilization" | "exhaustionMonths";

export default function CapacityPlanning() {
  const capacityRecords = useNetworkStore((s) => s.capacityRecords);
  const [region, setRegion] = useState("All Regions");
  const [sortKey, setSortKey] = useState<SortKey>("exhaustionMonths");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(
    () =>
      region === "All Regions"
        ? capacityRecords
        : capacityRecords.filter((r: CapacityRecord) => r.region === region),
    [capacityRecords, region],
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp =
          typeof av === "string"
            ? av.localeCompare(bv as string)
            : (av as number) - (bv as number);
        return sortAsc ? cmp : -cmp;
      }),
    [filtered, sortKey, sortAsc],
  );

  const criticalCount = filtered.filter(
    (r: CapacityRecord) => r.currentUtilization >= 90,
  ).length;
  const avgUtil = filtered.length
    ? Math.round(
        filtered.reduce(
          (s: number, r: CapacityRecord) => s + r.currentUtilization,
          0,
        ) / filtered.length,
      )
    : 0;
  const earliest = filtered.length
    ? Math.min(...filtered.map((r: CapacityRecord) => r.exhaustionMonths))
    : 0;

  const barData = filtered.map((r: CapacityRecord) => ({
    name:
      r.routeName.length > 18 ? `${r.routeName.slice(0, 18)}…` : r.routeName,
    utilization: r.currentUtilization,
    fill: utilColor(r.currentUtilization),
  }));

  const forecastData = useMemo(() => {
    if (!filtered.length) return [];
    const months = filtered[0].forecastData.map(
      (d: { month: string; utilization: number }) => d.month,
    );
    return months.map((month: string, mi: number) => {
      const avgActual =
        filtered.reduce(
          (s: number, r: CapacityRecord) => s + r.forecastData[mi].utilization,
          0,
        ) / filtered.length;
      const projected = Math.min(100, avgActual * 1.08);
      return {
        month,
        actual: Math.round(avgActual),
        projected: Math.round(projected),
      };
    });
  }, [filtered]);

  const exhaustionIdx = useMemo(() => {
    const firstOver = forecastData.findIndex(
      (d: { month: string; actual: number; projected: number }) =>
        d.projected >= 95,
    );
    return firstOver >= 0 ? forecastData[firstOver]?.month : null;
  }, [forecastData]);

  const regionData = useMemo(() => {
    const groups: Record<string, number[]> = {};
    for (const r of capacityRecords) {
      if (!groups[r.region]) groups[r.region] = [];
      groups[r.region].push(r.currentUtilization);
    }
    return Object.entries(groups).map(([reg, utils]) => ({
      region: reg.replace(" America", " Am.").replace("-Pacific", "-Pac"),
      headroom: Math.round(
        100 - utils.reduce((s, v) => s + v, 0) / utils.length,
      ),
    }));
  }, [capacityRecords]);

  const recommendations = useMemo(
    () =>
      sorted
        .filter((r) => r.exhaustionMonths <= 9)
        .slice(0, 4)
        .map((r) => ({
          text: `${r.routeName}: Plan capacity upgrade in ${r.exhaustionMonths} months to avoid exhaustion. Current utilization ${r.currentUtilization.toFixed(1)}%.`,
          severity: priorityLevel(r.exhaustionMonths),
        })),
    [sorted],
  );

  function handleSortKeyboard(e: React.KeyboardEvent, key: SortKey) {
    if (e.key === "Enter" || e.key === " ") toggleSort(key);
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div
      className="flex-1 overflow-y-auto bg-background p-6 space-y-6"
      data-ocid="capacity-planning-page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-wide">
            Capacity Planning &amp; Forecasting
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fiber utilization trends, demand forecasts, and upgrade scheduling
          </p>
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger
            className="w-48 bg-card border-border/60 text-sm"
            data-ocid="region-filter"
          >
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Routes"
          value={filtered.length}
          sub="Monitored in selection"
          icon={HardDrive}
          accent="bg-primary/15 text-primary border border-primary/30"
          delay={0}
        />
        <KpiCard
          label="Critical Utilization"
          value={criticalCount}
          sub="Routes above 90%"
          icon={AlertTriangle}
          accent="bg-red-500/15 text-red-400 border border-red-500/30"
          delay={0.07}
        />
        <KpiCard
          label="Avg Utilization"
          value={`${avgUtil}%`}
          sub="Across filtered routes"
          icon={TrendingUp}
          accent="bg-accent/15 text-accent border border-accent/30"
          delay={0.14}
        />
        <KpiCard
          label="Earliest Exhaustion"
          value={`${earliest} mo`}
          sub="Months until first route maxes"
          icon={Clock}
          accent={
            earliest <= 3
              ? "bg-red-500/15 text-red-400 border border-red-500/30"
              : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
          }
          delay={0.21}
        />
      </div>

      {/* Main charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Utilization bar overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="xl:col-span-2"
        >
          <GlassCard className="p-5 h-full">
            <h2 className="font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Utilization Overview
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                layout="vertical"
                data={barData}
                margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={96}
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 9 }}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, "Utilization"]}
                  contentStyle={{
                    background: "rgba(20,22,30,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="utilization"
                  radius={[0, 4, 4, 0]}
                  isAnimationActive
                >
                  {barData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Forecast chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="xl:col-span-3"
        >
          <GlassCard className="p-5 h-full">
            <h2 className="font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Demand vs Capacity Forecast (12-Month)
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart
                data={forecastData}
                margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(v, name) => [
                    `${v}%`,
                    name === "actual"
                      ? "Actual Utilization"
                      : "Projected Demand",
                  ]}
                  contentStyle={{
                    background: "rgba(20,22,30,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend
                  formatter={(v) =>
                    v === "actual" ? "Actual Utilization" : "Projected Demand"
                  }
                  wrapperStyle={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                  }}
                />
                {exhaustionIdx && (
                  <ReferenceLine
                    x={exhaustionIdx}
                    stroke="#ef4444"
                    strokeDasharray="5 3"
                    label={{
                      value: "Exhaustion",
                      fill: "#ef4444",
                      fontSize: 10,
                      position: "insideTopRight",
                    }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#fb923c"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* Upgrade timeline + Radar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="xl:col-span-2"
        >
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm font-semibold text-foreground tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Upgrade Timeline
              </h2>
              <span className="text-xs text-muted-foreground">
                {sorted.length} routes
              </span>
            </div>
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                data-ocid="upgrade-timeline-table"
              >
                <thead>
                  <tr className="border-b border-border/40">
                    {(
                      [
                        ["routeName", "Route Name"],
                        ["currentUtilization", "Current %"],
                        ["exhaustionMonths", "Exhaustion In"],
                      ] as [SortKey, string][]
                    ).map(([key, label]) => (
                      <th
                        key={key}
                        className="text-left text-xs text-muted-foreground font-medium tracking-wider py-2 px-2 cursor-pointer hover:text-foreground transition-colors select-none"
                        onClick={() => toggleSort(key)}
                        onKeyDown={(e) => handleSortKeyboard(e, key)}
                        data-ocid={`sort-${key}`}
                      >
                        {label} {sortKey === key ? (sortAsc ? "↑" : "↓") : ""}
                      </th>
                    ))}
                    <th className="text-left text-xs text-muted-foreground font-medium tracking-wider py-2 px-2">
                      Region
                    </th>
                    <th className="text-left text-xs text-muted-foreground font-medium tracking-wider py-2 px-2">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r, i) => {
                    const priority = priorityLevel(r.exhaustionMonths);
                    return (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                        data-ocid={`capacity-row-${r.id}`}
                      >
                        <td className="py-2.5 px-2 font-medium text-foreground/90 text-xs">
                          {r.routeName}
                        </td>
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-muted/60 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${r.currentUtilization}%`,
                                  background: utilColor(r.currentUtilization),
                                }}
                              />
                            </div>
                            <span
                              className="text-xs font-mono"
                              style={{
                                color: utilColor(r.currentUtilization),
                              }}
                            >
                              {r.currentUtilization.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-xs text-muted-foreground font-mono">
                          {r.exhaustionMonths} mo
                        </td>
                        <td className="py-2.5 px-2 text-xs text-muted-foreground">
                          {r.region}
                        </td>
                        <td className="py-2.5 px-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_COLORS[priority]}`}
                          >
                            {priority}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Capacity by Region radar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
        >
          <GlassCard className="p-5 h-full flex flex-col">
            <h2 className="font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-primary" />
              Capacity Headroom by Region
            </h2>
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={regionData}
                >
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="region"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 9 }}
                  />
                  <Radar
                    name="Headroom %"
                    dataKey="headroom"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.18}
                    strokeWidth={1.5}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, "Available Headroom"]}
                    contentStyle={{
                      background: "rgba(20,22,30,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Higher = more available capacity
            </p>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <GlassCard className="p-5">
            <h2 className="font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              AI Capacity Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={rec.text}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/30"
                  data-ocid={`recommendation-${i}`}
                >
                  {rec.severity === "Critical" || rec.severity === "High" ? (
                    <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded border mr-2 ${PRIORITY_COLORS[rec.severity]}`}
                    >
                      {rec.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {rec.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
